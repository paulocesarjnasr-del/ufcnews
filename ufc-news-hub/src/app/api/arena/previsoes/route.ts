import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { PrevisaoInput, PrevisaoComDetalhes } from '@/types/arena';

// GET - Listar previsões do usuário atual
export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const evento_id = searchParams.get('evento_id');
    const processada = searchParams.get('processada');

    let whereClause = 'WHERE p.usuario_id = $1';
    const params: unknown[] = [usuario.id];
    let paramIndex = 2;

    if (evento_id) {
      whereClause += ` AND p.evento_id = $${paramIndex++}`;
      params.push(evento_id);
    }

    if (processada !== null) {
      whereClause += ` AND p.processada = $${paramIndex++}`;
      params.push(processada === 'true');
    }

    const previsoes = await query<PrevisaoComDetalhes>(
      `SELECT
        p.*,
        json_build_object(
          'id', l.id,
          'lutador1_id', l.lutador1_id,
          'lutador2_id', l.lutador2_id,
          'lutador1_nome', COALESCE(l.lutador1_nome_display, lut1.nome),
          'lutador2_nome', COALESCE(l.lutador2_nome_display, lut2.nome),
          'lutador1_foto', lut1.imagem_url,
          'lutador2_foto', lut2.imagem_url,
          'categoria_peso', l.categoria_peso,
          'is_titulo', l.is_titulo,
          'tipo', l.tipo,
          'vencedor_id', l.vencedor_id,
          'metodo', l.metodo
        ) as luta,
        CASE WHEN p.vencedor_previsto_id IS NOT NULL THEN
          json_build_object('id', vp.id, 'nome', vp.nome)
        ELSE NULL END as vencedor_previsto
      FROM previsoes p
      JOIN lutas l ON l.id = p.luta_id
      JOIN lutadores lut1 ON lut1.id = l.lutador1_id
      JOIN lutadores lut2 ON lut2.id = l.lutador2_id
      LEFT JOIN lutadores vp ON vp.id = p.vencedor_previsto_id
      ${whereClause}
      ORDER BY l.ordem ASC`,
      params
    );

    return NextResponse.json({ previsoes });
  } catch (error) {
    console.error('Erro ao buscar previsões:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar ou atualizar previsões
export async function POST(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { previsoes }: { previsoes: PrevisaoInput[] } = body;

    if (!previsoes || !Array.isArray(previsoes) || previsoes.length === 0) {
      return NextResponse.json(
        { error: 'Previsões são obrigatórias' },
        { status: 400 }
      );
    }

    const resultados: PrevisaoComDetalhes[] = [];
    const erros: string[] = [];

    for (const previsao of previsoes) {
      try {
        // Verificar se a luta existe e ainda não começou
        const luta = await queryOne<{
          id: string;
          evento_id: string;
          lutador1_id: string;
          lutador2_id: string;
          status: string;
          data_evento: string;
        }>(
          `SELECT l.id, l.evento_id, l.lutador1_id, l.lutador2_id, l.status,
                  e.data_evento
           FROM lutas l
           JOIN eventos e ON e.id = l.evento_id
           WHERE l.id = $1`,
          [previsao.luta_id]
        );

        if (!luta) {
          erros.push(`Luta ${previsao.luta_id} não encontrada`);
          continue;
        }

        // Verificar se o evento já começou (1 hora antes do horário)
        const eventoData = new Date(luta.data_evento);
        const deadline = new Date(eventoData.getTime() - 60 * 60 * 1000); // 1 hora antes

        if (new Date() > deadline) {
          erros.push(`Deadline para previsões da luta ${previsao.luta_id} já passou`);
          continue;
        }

        // Verificar se a luta já está finalizada
        if (luta.status === 'finalizada') {
          erros.push(`Luta ${previsao.luta_id} já foi finalizada`);
          continue;
        }

        // Verificar se o vencedor previsto é um dos lutadores
        if (
          previsao.vencedor_previsto_id !== luta.lutador1_id &&
          previsao.vencedor_previsto_id !== luta.lutador2_id
        ) {
          erros.push(`Vencedor previsto inválido para luta ${previsao.luta_id}`);
          continue;
        }

        // Validar pontos de confiança
        const pontosConfianca = previsao.pontos_confianca || 100;
        if (pontosConfianca < 10 || pontosConfianca > 500) {
          erros.push(`Pontos de confiança devem estar entre 10 e 500`);
          continue;
        }

        // Validar round previsto
        if (previsao.round_previsto && (previsao.round_previsto < 1 || previsao.round_previsto > 5)) {
          erros.push(`Round previsto deve estar entre 1 e 5`);
          continue;
        }

        // Inserir ou atualizar previsão (upsert)
        const previsaoSalva = await queryOne<PrevisaoComDetalhes>(
          `INSERT INTO previsoes (
            usuario_id, luta_id, evento_id,
            vencedor_previsto_id, metodo_previsto, round_previsto,
            pontos_confianca
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (usuario_id, luta_id) DO UPDATE SET
            vencedor_previsto_id = EXCLUDED.vencedor_previsto_id,
            metodo_previsto = EXCLUDED.metodo_previsto,
            round_previsto = EXCLUDED.round_previsto,
            pontos_confianca = EXCLUDED.pontos_confianca,
            updated_at = NOW()
          RETURNING *`,
          [
            usuario.id,
            previsao.luta_id,
            luta.evento_id,
            previsao.vencedor_previsto_id,
            previsao.metodo_previsto || null,
            previsao.round_previsto || null,
            pontosConfianca,
          ]
        );

        if (previsaoSalva) {
          resultados.push(previsaoSalva);

          // Verificar se é a primeira previsão do usuário (conquista first_blood)
          if (usuario.total_previsoes === 0) {
            await query(
              `INSERT INTO conquistas (usuario_id, tipo, detalhes)
               VALUES ($1, 'first_blood', $2)
               ON CONFLICT (usuario_id, tipo) DO NOTHING`,
              [usuario.id, JSON.stringify({ luta_id: previsao.luta_id })]
            );
          }

          // Incrementar contador de previsões
          await query(
            `UPDATE usuarios_arena
             SET total_previsoes = total_previsoes + 1,
                 xp_total = xp_total + 10
             WHERE id = $1
             AND NOT EXISTS (
               SELECT 1 FROM previsoes
               WHERE usuario_id = $1 AND luta_id = $2 AND created_at < NOW() - INTERVAL '1 second'
             )`,
            [usuario.id, previsao.luta_id]
          );
        }
      } catch (error) {
        console.error(`Erro ao processar previsão:`, error);
        erros.push(`Erro ao processar previsão para luta ${previsao.luta_id}`);
      }
    }

    return NextResponse.json({
      success: true,
      previsoes_salvas: resultados.length,
      erros: erros.length > 0 ? erros : undefined,
    });
  } catch (error) {
    console.error('Erro ao salvar previsões:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
