import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';
import { UsuarioArenaRanking } from '@/types/arena';

// GET - Ranking global
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo') || 'total'; // 'semanal', 'mensal', 'total'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const usuario = await getUsuarioAtual();

    let orderBy = 'pontos_totais';
    let whereClause = '';

    // Para rankings semanais/mensais, usamos a tabela evento_pontuacao
    if (periodo === 'semanal' || periodo === 'mensal') {
      const dias = periodo === 'semanal' ? 7 : 30;

      const rankings = await query<UsuarioArenaRanking>(
        `SELECT
          u.id,
          u.username,
          u.display_name,
          u.avatar_url,
          u.nivel,
          COALESCE(SUM(ep.pontos_totais), 0)::integer as pontos_totais,
          u.streak_atual,
          CASE WHEN u.total_previsoes > 0
            THEN ROUND(u.previsoes_corretas::numeric / u.total_previsoes * 100, 1)
            ELSE 0
          END as precisao,
          ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(ep.pontos_totais), 0) DESC) as posicao
        FROM usuarios_arena u
        LEFT JOIN evento_pontuacao ep ON ep.usuario_id = u.id
        LEFT JOIN eventos e ON e.id = ep.evento_id AND e.data_evento >= NOW() - INTERVAL '${dias} days'
        GROUP BY u.id
        HAVING COALESCE(SUM(ep.pontos_totais), 0) > 0 OR u.pontos_totais > 0
        ORDER BY pontos_totais DESC
        LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      // Buscar posição do usuário atual
      let minhaPosicao: UsuarioArenaRanking | null = null;
      if (usuario) {
        const minhaPos = await query<UsuarioArenaRanking>(
          `SELECT * FROM (
            SELECT
              u.id,
              u.username,
              u.display_name,
              u.avatar_url,
              u.nivel,
              COALESCE(SUM(ep.pontos_totais), 0)::integer as pontos_totais,
              u.streak_atual,
              CASE WHEN u.total_previsoes > 0
                THEN ROUND(u.previsoes_corretas::numeric / u.total_previsoes * 100, 1)
                ELSE 0
              END as precisao,
              ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(ep.pontos_totais), 0) DESC) as posicao
            FROM usuarios_arena u
            LEFT JOIN evento_pontuacao ep ON ep.usuario_id = u.id
            LEFT JOIN eventos e ON e.id = ep.evento_id AND e.data_evento >= NOW() - INTERVAL '${dias} days'
            GROUP BY u.id
          ) ranked WHERE id = $1`,
          [usuario.id]
        );
        minhaPosicao = minhaPos[0] || null;
      }

      return NextResponse.json({
        periodo,
        rankings,
        minha_posicao: minhaPosicao,
        total: rankings.length,
        limit,
        offset,
      });
    }

    // Ranking total
    const rankings = await query<UsuarioArenaRanking>(
      `SELECT
        u.id,
        u.username,
        u.display_name,
        u.avatar_url,
        u.nivel,
        u.pontos_totais,
        u.streak_atual,
        CASE WHEN u.total_previsoes > 0
          THEN ROUND(u.previsoes_corretas::numeric / u.total_previsoes * 100, 1)
          ELSE 0
        END as precisao,
        ROW_NUMBER() OVER (ORDER BY u.pontos_totais DESC) as posicao
      FROM usuarios_arena u
      WHERE u.total_previsoes > 0
      ORDER BY u.pontos_totais DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Buscar posição do usuário atual
    let minhaPosicao: UsuarioArenaRanking | null = null;
    if (usuario) {
      const minhaPos = await query<UsuarioArenaRanking>(
        `SELECT * FROM (
          SELECT
            u.id,
            u.username,
            u.display_name,
            u.avatar_url,
            u.nivel,
            u.pontos_totais,
            u.streak_atual,
            CASE WHEN u.total_previsoes > 0
              THEN ROUND(u.previsoes_corretas::numeric / u.total_previsoes * 100, 1)
              ELSE 0
            END as precisao,
            ROW_NUMBER() OVER (ORDER BY u.pontos_totais DESC) as posicao
          FROM usuarios_arena u
        ) ranked WHERE id = $1`,
        [usuario.id]
      );
      minhaPosicao = minhaPos[0] || null;
    }

    // Contar total de usuários com previsões
    const totalResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM usuarios_arena WHERE total_previsoes > 0`
    );

    return NextResponse.json({
      periodo: 'total',
      rankings,
      minha_posicao: minhaPosicao,
      total: parseInt(totalResult[0]?.count || '0'),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
