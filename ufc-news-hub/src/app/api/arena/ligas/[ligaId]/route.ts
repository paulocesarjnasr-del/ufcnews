import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne, transaction } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { Liga, LigaMembro } from '@/types/arena';

interface RouteParams {
  params: Promise<{ ligaId: string }>;
}

// GET - Detalhes de uma liga
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    // Buscar liga
    const liga = await queryOne<Liga & {
      criador_username: string;
      criador_display_name: string | null;
      criador_avatar: string | null;
      campeao_username: string | null;
      campeao_display_name: string | null;
      campeao_avatar: string | null;
    }>(
      `SELECT
        l.*,
        u.username as criador_username,
        u.display_name as criador_display_name,
        u.avatar_url as criador_avatar,
        c.username as campeao_username,
        c.display_name as campeao_display_name,
        c.avatar_url as campeao_avatar
      FROM ligas l
      JOIN usuarios_arena u ON u.id = l.criador_id
      LEFT JOIN usuarios_arena c ON c.id = l.campeao_id
      WHERE l.id = $1`,
      [ligaId]
    );

    if (!liga) {
      return NextResponse.json(
        { error: 'Liga não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se usuário é membro (se liga for privada)
    let isMembro = false;
    let minhasPosicao: number | null = null;

    if (usuario) {
      const membroInfo = await queryOne<{ posicao_atual: number }>(
        `SELECT posicao_atual FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
        [ligaId, usuario.id]
      );
      isMembro = !!membroInfo;
      minhasPosicao = membroInfo?.posicao_atual || null;
    }

    // Se liga privada e não é membro, não mostrar detalhes completos
    if (liga.tipo === 'privada' && !isMembro) {
      return NextResponse.json({
        liga: {
          id: liga.id,
          nome: liga.nome,
          descricao: liga.descricao,
          tipo: liga.tipo,
          total_membros: liga.total_membros,
          status: liga.status,
          criador: {
            username: liga.criador_username,
            display_name: liga.criador_display_name,
            avatar_url: liga.criador_avatar,
          },
        },
        is_membro: false,
        pode_entrar: liga.max_membros === 0 || liga.total_membros < liga.max_membros,
        requer_convite: true,
      });
    }

    // Buscar membros com ranking
    const membros = await query<LigaMembro & {
      usuario_username: string;
      usuario_display_name: string | null;
      usuario_avatar: string | null;
      usuario_nivel: string;
      usuario_ultimo_acesso: string | null;
    }>(
      `SELECT
        lm.*,
        u.username as usuario_username,
        u.display_name as usuario_display_name,
        u.avatar_url as usuario_avatar,
        u.nivel as usuario_nivel,
        u.ultimo_acesso as usuario_ultimo_acesso
      FROM liga_membros lm
      JOIN usuarios_arena u ON u.id = lm.usuario_id
      WHERE lm.liga_id = $1
      ORDER BY lm.pontos_temporada DESC, lm.eventos_participados DESC`,
      [ligaId]
    );

    // Buscar evento atual (próximo agendado)
    const eventoAtual = await queryOne<{ id: string; nome: string; data_evento: string }>(
      `SELECT id, nome, data_evento FROM eventos
       WHERE status = 'agendado' AND data_evento > NOW()
       ORDER BY data_evento ASC LIMIT 1`
    );

    // Calcular status de picks por membro para o evento atual
    const memberPickStatus: Record<string, boolean> = {};
    let membrosComPicks = 0;

    if (eventoAtual) {
      const membroIds = membros.map(m => m.usuario_id);
      const picksFeitos = await query<{ usuario_id: string }>(
        `SELECT DISTINCT usuario_id FROM previsoes
         WHERE evento_id = $1 AND usuario_id = ANY($2::uuid[])`,
        [eventoAtual.id, membroIds]
      );
      for (const p of picksFeitos) {
        memberPickStatus[p.usuario_id] = true;
      }
      membrosComPicks = picksFeitos.length;
    }

    // Buscar dados de picks (somente se liga.mostrar_picks_antes estiver ativo)
    const memberPicksData: Record<string, Array<{
      luta_id: string;
      vencedor_nome: string;
      metodo_previsto: string | null;
      round_previsto: number | null;
      pontos_confianca: number;
    }>> = {};

    if (eventoAtual && liga.mostrar_picks_antes) {
      const membrosComPickIds = Object.keys(memberPickStatus);
      if (membrosComPickIds.length > 0) {
        const allPicks = await query<{
          usuario_id: string;
          luta_id: string;
          vencedor_nome: string;
          metodo_previsto: string | null;
          round_previsto: number | null;
          pontos_confianca: number;
        }>(
          `SELECT p.usuario_id, p.luta_id, l.nome as vencedor_nome,
                  p.metodo_previsto, p.round_previsto, p.pontos_confianca
           FROM previsoes p
           LEFT JOIN lutadores l ON l.id = p.vencedor_previsto_id
           WHERE p.evento_id = $1 AND p.usuario_id = ANY($2::uuid[])`,
          [eventoAtual.id, membrosComPickIds]
        );

        for (const pick of allPicks) {
          if (!memberPicksData[pick.usuario_id]) {
            memberPicksData[pick.usuario_id] = [];
          }
          memberPicksData[pick.usuario_id].push({
            luta_id: pick.luta_id,
            vencedor_nome: pick.vencedor_nome,
            metodo_previsto: pick.metodo_previsto,
            round_previsto: pick.round_previsto,
            pontos_confianca: pick.pontos_confianca,
          });
        }
      }
    }

    // Buscar pontuacao do ultimo evento finalizado para cada membro
    let eventoFinalizadoNome: string | null = null;
    let eventoFinalizadoData: string | null = null;
    const membroEventoPontos: Record<string, { pontos: number; acertos: number; total_lutas: number }> = {};

    // So mostra ranking se pelo menos 2 membros da liga participaram
    const ultimoEventoFinalizado = await queryOne<{ id: string; nome: string; data_evento: string }>(
      `SELECT e.id, e.nome, e.data_evento FROM eventos e
       WHERE e.status = 'finalizado'
       AND (
         SELECT COUNT(DISTINCT ep.usuario_id) FROM evento_pontuacao ep
         WHERE ep.evento_id = e.id
         AND ep.usuario_id = ANY($1::uuid[])
       ) >= 2
       ORDER BY e.data_evento DESC LIMIT 1`,
      [membros.map(m => m.usuario_id)]
    );

    if (ultimoEventoFinalizado) {
      eventoFinalizadoNome = ultimoEventoFinalizado.nome;
      eventoFinalizadoData = ultimoEventoFinalizado.data_evento;

      const pontuacoes = await query<{
        usuario_id: string;
        pontos_totais: number;
        acertos: number;
        total_lutas: number;
      }>(
        `SELECT usuario_id, pontos_totais, acertos, total_lutas
         FROM evento_pontuacao
         WHERE evento_id = $1 AND usuario_id = ANY($2::uuid[])`,
        [ultimoEventoFinalizado.id, membros.map(m => m.usuario_id)]
      );

      for (const p of pontuacoes) {
        membroEventoPontos[p.usuario_id] = {
          pontos: p.pontos_totais,
          acertos: p.acertos,
          total_lutas: p.total_lutas,
        };
      }
    }

    const membrosFormatados = membros.map((m, index) => ({
      id: m.usuario_id,
      username: m.usuario_username,
      display_name: m.usuario_display_name,
      avatar_url: m.usuario_avatar,
      nivel: m.usuario_nivel,
      is_admin: m.is_admin,
      ultimo_acesso: m.usuario_ultimo_acesso,
      picks_status: eventoAtual
        ? (memberPickStatus[m.usuario_id] ? 'done' as const : 'pending' as const)
        : null,
      picks_data: liga.mostrar_picks_antes ? memberPicksData[m.usuario_id] : undefined,
      pontos_temporada: m.pontos_temporada || 0,
      posicao_atual: index + 1,
      evento_pontos: membroEventoPontos[m.usuario_id]?.pontos,
      evento_acertos: membroEventoPontos[m.usuario_id]?.acertos,
      evento_total_lutas: membroEventoPontos[m.usuario_id]?.total_lutas,
    }));

    return NextResponse.json({
      liga: {
        ...liga,
        criador: {
          id: liga.criador_id,
          username: liga.criador_username,
          display_name: liga.criador_display_name,
          avatar_url: liga.criador_avatar,
        },
        campeao: liga.campeao_id ? {
          id: liga.campeao_id,
          username: liga.campeao_username,
          display_name: liga.campeao_display_name,
          avatar_url: liga.campeao_avatar,
        } : null,
      },
      membros: membrosFormatados,
      is_membro: isMembro,
      minha_posicao: minhasPosicao,
      pode_entrar: !isMembro && (liga.max_membros === 0 || liga.total_membros < liga.max_membros),
      evento_atual: eventoAtual ? {
        id: eventoAtual.id,
        nome: eventoAtual.nome,
        data: eventoAtual.data_evento,
        total_membros: membros.length,
        membros_com_picks: membrosComPicks,
      } : null,
      ultimo_evento: ultimoEventoFinalizado ? {
        nome: eventoFinalizadoNome,
        data: eventoFinalizadoData,
      } : null,
    });
  } catch (error) {
    console.error('Erro ao buscar liga:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PATCH - Editar configs da liga
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check admin
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro?.is_admin) {
      return NextResponse.json({ error: 'Apenas o criador pode editar a liga' }, { status: 403 });
    }

    const body = await request.json() as Record<string, unknown>;

    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    // nome
    if (body.nome !== undefined) {
      const nome = String(body.nome).trim();
      if (!nome || nome.length > 50) {
        return NextResponse.json({ error: 'Nome deve ter entre 1 e 50 caracteres' }, { status: 400 });
      }
      updates.push(`nome = $${paramIndex++}`);
      values.push(nome);
    }

    // descricao
    if (body.descricao !== undefined) {
      const desc = body.descricao ? String(body.descricao).trim() : null;
      if (desc && desc.length > 200) {
        return NextResponse.json({ error: 'Descricao deve ter no maximo 200 caracteres' }, { status: 400 });
      }
      updates.push(`descricao = $${paramIndex++}`);
      values.push(desc);
    }

    // tipo
    if (body.tipo !== undefined) {
      if (body.tipo !== 'publica' && body.tipo !== 'privada') {
        return NextResponse.json({ error: 'Tipo deve ser publica ou privada' }, { status: 400 });
      }
      updates.push(`tipo = $${paramIndex++}`);
      values.push(body.tipo);
    }

    // max_membros
    if (body.max_membros !== undefined) {
      const max = Number(body.max_membros);
      if (isNaN(max) || max < 0) {
        return NextResponse.json({ error: 'max_membros deve ser >= 0 (0 = ilimitado)' }, { status: 400 });
      }
      if (max > 0) {
        const liga = await queryOne<{ total_membros: number }>(
          `SELECT total_membros FROM ligas WHERE id = $1`, [ligaId]
        );
        if (liga && max < liga.total_membros) {
          return NextResponse.json(
            { error: `max_membros (${max}) nao pode ser menor que membros atuais (${liga.total_membros})` },
            { status: 400 }
          );
        }
      }
      updates.push(`max_membros = $${paramIndex++}`);
      values.push(max);
    }

    // booleans
    for (const field of ['mostrar_picks_antes', 'apenas_main_card', 'chat_ativo', 'revelar_picks_ao_vivo'] as const) {
      if (body[field] !== undefined) {
        updates.push(`${field} = $${paramIndex++}`);
        values.push(Boolean(body[field]));
      }
    }

    // ranking_tipo
    if (body.ranking_tipo !== undefined) {
      if (body.ranking_tipo !== 'pontos' && body.ranking_tipo !== 'percentual') {
        return NextResponse.json({ error: 'ranking_tipo deve ser pontos ou percentual' }, { status: 400 });
      }
      updates.push(`ranking_tipo = $${paramIndex++}`);
      values.push(body.ranking_tipo);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Nenhum campo para atualizar' }, { status: 400 });
    }

    values.push(ligaId);
    const sql = `UPDATE ligas SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;
    const updated = await queryOne<Liga>(sql, values);

    return NextResponse.json({ success: true, liga: updated });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[PATCH /arena/ligas] Erro:', msg);
    return NextResponse.json({ error: `Erro ao atualizar liga: ${msg}` }, { status: 500 });
  }
}

// DELETE - Sair da liga
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar se é membro
    const membro = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!membro) {
      return NextResponse.json(
        { error: 'Você não é membro desta liga' },
        { status: 400 }
      );
    }

    // Verificar se é o criador
    const liga = await queryOne<{ criador_id: string; total_membros: number }>(
      `SELECT criador_id, total_membros FROM ligas WHERE id = $1`,
      [ligaId]
    );

    if (liga?.criador_id === usuario.id) {
      // Se é o único membro, pode sair (e a liga é deletada)
      if (liga.total_membros === 1) {
        await query(`DELETE FROM ligas WHERE id = $1`, [ligaId]);
        return NextResponse.json({ success: true, liga_deletada: true });
      }

      return NextResponse.json(
        { error: 'Você é o criador da liga. Transfira a propriedade antes de sair.' },
        { status: 400 }
      );
    }

    // Remover membro e decrementar total_membros (em transaction)
    await transaction(async (client) => {
      await client.query(
        `DELETE FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
        [ligaId, usuario.id]
      );
      await client.query(
        `UPDATE ligas SET total_membros = GREATEST(total_membros - 1, 0) WHERE id = $1`,
        [ligaId]
      );
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao sair da liga:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
