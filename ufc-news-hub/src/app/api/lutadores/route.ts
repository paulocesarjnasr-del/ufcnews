import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { LutadorExpandido } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const categoria = searchParams.get('categoria');
    const pais = searchParams.get('pais');
    const ativo = searchParams.get('ativo');

    let whereConditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 1;

    if (search) {
      whereConditions.push(`(nome ILIKE $${paramIndex} OR apelido ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (categoria) {
      whereConditions.push(`categoria_peso ILIKE $${paramIndex}`);
      params.push(`%${categoria}%`);
      paramIndex++;
    }

    if (pais) {
      whereConditions.push(`pais ILIKE $${paramIndex}`);
      params.push(`%${pais}%`);
      paramIndex++;
    }

    if (ativo !== null && ativo !== undefined) {
      whereConditions.push(`ativo = $${paramIndex}`);
      params.push(ativo === 'true');
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    const lutadores = await query<LutadorExpandido>(
      `SELECT *
      FROM lutadores
      ${whereClause}
      ORDER BY
        CASE WHEN ranking_divisao IS NOT NULL THEN ranking_divisao ELSE 999 END ASC,
        (COALESCE(vitorias, 0) - COALESCE(derrotas, 0)) DESC,
        nome ASC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const totalResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM lutadores ${whereClause}`,
      params
    );

    // Agrupar por categoria se solicitado
    const groupByParam = searchParams.get('groupBy');
    let porCategoria: Record<string, LutadorExpandido[]> | undefined;

    if (groupByParam === 'categoria') {
      porCategoria = {};
      lutadores.forEach(l => {
        const cat = l.categoria_peso || 'Sem categoria';
        if (!porCategoria![cat]) {
          porCategoria![cat] = [];
        }
        porCategoria![cat].push(l);
      });
    }

    return NextResponse.json({
      lutadores,
      ...(porCategoria && { por_categoria: porCategoria }),
      total: parseInt(totalResult[0]?.count || '0'),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar lutadores:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar lutadores' },
      { status: 500 }
    );
  }
}
