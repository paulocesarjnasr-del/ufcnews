import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Evento } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereClause = '';
    const params: unknown[] = [];
    let paramIndex = 1;

    if (status) {
      whereClause = `WHERE e.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    const eventos = await query<Evento & { total_lutas: number }>(
      `SELECT
        e.*,
        COUNT(l.id)::integer as total_lutas
      FROM eventos e
      LEFT JOIN lutas l ON l.evento_id = e.id
      ${whereClause}
      GROUP BY e.id
      ORDER BY e.data_evento DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const totalResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM eventos e ${whereClause}`,
      params
    );

    return NextResponse.json({
      eventos,
      total: parseInt(totalResult[0]?.count || '0'),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar eventos' },
      { status: 500 }
    );
  }
}
