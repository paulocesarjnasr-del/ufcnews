import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const ranking = await query<{
      id: string; username: string; display_name: string | null;
      nivel: string; pontos_totais: number;
      previsoes_corretas: number; total_previsoes: number;
      taxa_acerto: number; posicao: number;
    }>(
      `SELECT u.id, u.username, u.display_name, u.nivel,
              u.pontos_totais, u.previsoes_corretas, u.total_previsoes,
              CASE WHEN u.total_previsoes > 0
                THEN ROUND(u.previsoes_corretas::numeric / u.total_previsoes * 100, 1)
                ELSE 0 END AS taxa_acerto,
              ROW_NUMBER() OVER (ORDER BY u.pontos_totais DESC)::int as posicao
       FROM usuarios_arena u
       WHERE u.total_previsoes > 0
       ORDER BY u.pontos_totais DESC
       LIMIT 50`
    );

    return NextResponse.json(ranking, {
      headers: { 'Cache-Control': 'public, s-maxage=120' },
    });
  } catch (error) {
    console.error('[API analytics/ranking] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
