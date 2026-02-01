import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { UsuarioArenaPublico, Conquista, PrevisaoEventoResumo } from '@/types/arena';

interface RouteParams {
  params: Promise<{ username: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { username } = await params;

    // Buscar usuário
    const usuario = await queryOne<UsuarioArenaPublico & { previsoes_corretas: number; total_previsoes: number }>(
      `SELECT
        id, username, display_name, avatar_url, bio,
        pontos_totais, xp_total, nivel,
        streak_atual, melhor_streak, streak_main_event, melhor_streak_main_event,
        total_previsoes, previsoes_corretas, previsoes_perfeitas,
        underdogs_acertados, kos_acertados, subs_acertados, decisoes_acertadas,
        total_amigos, total_ligas, titulos_ganhos,
        picks_publicos, created_at
      FROM usuarios_arena
      WHERE LOWER(username) = LOWER($1)`,
      [username]
    );

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Calcular precisão
    const precisao = usuario.total_previsoes > 0
      ? (usuario.previsoes_corretas / usuario.total_previsoes * 100).toFixed(1)
      : '0.0';

    // Buscar conquistas do usuário
    const conquistas = await query<Conquista>(
      `SELECT tipo, detalhes, desbloqueada_em
       FROM conquistas
       WHERE usuario_id = $1
       ORDER BY desbloqueada_em DESC`,
      [usuario.id]
    );

    // Buscar posição no ranking global
    const rankingResult = await queryOne<{ posicao: number }>(
      `SELECT COUNT(*) + 1 as posicao
       FROM usuarios_arena
       WHERE pontos_totais > (
         SELECT pontos_totais FROM usuarios_arena WHERE id = $1
       )`,
      [usuario.id]
    );

    // Buscar histórico de eventos recentes
    const historicoEventos = await query<PrevisaoEventoResumo>(
      `SELECT
        e.id as evento_id,
        e.nome as evento_nome,
        e.data_evento as evento_data,
        COUNT(p.id) as total_previsoes,
        COUNT(CASE WHEN p.acertou_vencedor = true THEN 1 END) as acertos,
        COALESCE(SUM(p.pontos_ganhos), 0) as pontos_ganhos,
        COUNT(CASE WHEN p.acertou_vencedor = true AND p.acertou_metodo = true AND p.acertou_round = true THEN 1 END) as previsoes_perfeitas
       FROM previsoes p
       JOIN eventos e ON e.id = p.evento_id
       WHERE p.usuario_id = $1 AND p.processada = true
       GROUP BY e.id, e.nome, e.data_evento
       ORDER BY e.data_evento DESC
       LIMIT 10`,
      [usuario.id]
    );

    // Buscar ligas do usuário
    const ligas = await query<{ id: string; nome: string; posicao_atual: number; total_membros: number }>(
      `SELECT l.id, l.nome, lm.posicao_atual, l.total_membros
       FROM ligas l
       JOIN liga_membros lm ON lm.liga_id = l.id
       WHERE lm.usuario_id = $1 AND l.status = 'ativa'
       ORDER BY lm.pontos_temporada DESC
       LIMIT 5`,
      [usuario.id]
    );

    return NextResponse.json({
      usuario: {
        ...usuario,
        precisao: parseFloat(precisao),
        posicao_global: rankingResult?.posicao || 0,
      },
      conquistas,
      historico_eventos: historicoEventos,
      ligas,
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
