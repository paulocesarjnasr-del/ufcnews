import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function GET() {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });

    const metodos = await query<{ metodo_grupo: string; total: number }>(
      `SELECT
        CASE
          WHEN l.metodo::text IN ('KO/TKO') THEN 'KO/TKO'
          WHEN l.metodo::text = 'Submission' THEN 'Submission'
          WHEN l.metodo::text LIKE 'Decision%' THEN 'Decision'
          ELSE 'Outro'
        END as metodo_grupo,
        COUNT(*)::int as total
       FROM previsoes p
       JOIN lutas l ON l.id = p.luta_id
       WHERE p.usuario_id = $1 AND p.acertou_vencedor = true
       GROUP BY metodo_grupo
       ORDER BY total DESC`,
      [usuario.id]
    );

    return NextResponse.json(metodos, {
      headers: { 'Cache-Control': 'private, max-age=60' },
    });
  } catch (error) {
    console.error('[API analytics/metodos] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
