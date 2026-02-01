import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { LutadorExpandido } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const lutadores = await query<LutadorExpandido>(
      `SELECT *
      FROM lutadores
      WHERE pais = 'Brasil' OR pais = 'Brazil' OR pais ILIKE '%bras%'
      ORDER BY
        CASE WHEN ranking_divisao IS NOT NULL THEN ranking_divisao ELSE 999 END ASC,
        (COALESCE(vitorias, 0) - COALESCE(derrotas, 0)) DESC,
        nome ASC
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count
      FROM lutadores
      WHERE pais = 'Brasil' OR pais = 'Brazil' OR pais ILIKE '%bras%'`
    );

    // Agrupar por categoria
    const porCategoria: Record<string, LutadorExpandido[]> = {};
    lutadores.forEach(l => {
      const cat = l.categoria_peso || 'Sem categoria';
      if (!porCategoria[cat]) {
        porCategoria[cat] = [];
      }
      porCategoria[cat].push(l);
    });

    return NextResponse.json({
      lutadores,
      por_categoria: porCategoria,
      total: parseInt(totalResult[0]?.count || '0'),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar lutadores brasileiros:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar lutadores brasileiros' },
      { status: 500 }
    );
  }
}
