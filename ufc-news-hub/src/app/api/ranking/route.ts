import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface RankingUsuario {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  nivel: string;
  pontos_totais: number;
  total_previsoes: number;
  previsoes_corretas: number;
  streak_atual: number;
  melhor_streak: number;
  taxa_acerto: number;
  posicao: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const orderBy = searchParams.get('orderBy') || 'pontos_totais';
    const minPrevisoes = parseInt(searchParams.get('minPrevisoes') || '0');

    const validOrderFields = ['pontos_totais', 'taxa_acerto', 'total_previsoes', 'melhor_streak'];
    const order = validOrderFields.includes(orderBy) ? orderBy : 'pontos_totais';

    // Use usuarios_arena table from Arena system
    const ranking = await query<RankingUsuario>(
      `SELECT
        id,
        username,
        display_name,
        avatar_url,
        nivel,
        pontos_totais,
        total_previsoes,
        previsoes_corretas,
        streak_atual,
        melhor_streak,
        CASE WHEN total_previsoes > 0
          THEN ROUND((previsoes_corretas::numeric / total_previsoes) * 100, 1)
          ELSE 0
        END as taxa_acerto,
        RANK() OVER (ORDER BY ${order} DESC)::integer as posicao
      FROM usuarios_arena
      WHERE total_previsoes >= $1
      ORDER BY ${order} DESC
      LIMIT $2 OFFSET $3`,
      [minPrevisoes, limit, offset]
    );

    const totalResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM usuarios_arena WHERE total_previsoes >= $1`,
      [minPrevisoes]
    );

    // Estatisticas gerais
    const stats = await query<{
      total_previsores: number;
      total_previsoes: number;
      media_taxa_acerto: number;
    }>(
      `SELECT
        COUNT(*)::integer as total_previsores,
        COALESCE(SUM(total_previsoes), 0)::integer as total_previsoes,
        COALESCE(ROUND(AVG(
          CASE WHEN total_previsoes > 0
            THEN (previsoes_corretas::numeric / total_previsoes) * 100
            ELSE 0
          END
        ), 2), 0)::float as media_taxa_acerto
      FROM usuarios_arena
      WHERE total_previsoes >= $1`,
      [minPrevisoes]
    );

    return NextResponse.json({
      ranking,
      total: parseInt(totalResult[0]?.count || '0'),
      limit,
      offset,
      stats: stats[0] || {
        total_previsores: 0,
        total_previsoes: 0,
        media_taxa_acerto: 0,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar ranking' },
      { status: 500 }
    );
  }
}
