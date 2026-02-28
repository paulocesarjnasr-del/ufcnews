import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import type { ResultadoEnquete } from '@/types/enquete';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/enquetes/[id]/resultado — Returns vote counts and percentages
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    // Verify enquete exists
    const enquete = await queryOne<{ id: string }>(
      'SELECT id FROM enquetes WHERE id = $1',
      [id]
    );

    if (!enquete) {
      return NextResponse.json(
        { error: 'Enquete nao encontrada' },
        { status: 404 }
      );
    }

    const counts = await queryOne<{
      total_votos: number;
      votos_a: number;
      votos_b: number;
    }>(
      `SELECT
        COUNT(*)::integer as total_votos,
        COUNT(*) FILTER (WHERE opcao = 'a')::integer as votos_a,
        COUNT(*) FILTER (WHERE opcao = 'b')::integer as votos_b
      FROM votos_enquete WHERE enquete_id = $1`,
      [id]
    );

    const total = counts?.total_votos ?? 0;
    const votosA = counts?.votos_a ?? 0;
    const votosB = counts?.votos_b ?? 0;

    const resultado: ResultadoEnquete = {
      total_votos: total,
      votos_a: votosA,
      votos_b: votosB,
      percentual_a: total > 0 ? Math.round((votosA / total) * 1000) / 10 : 0,
      percentual_b: total > 0 ? Math.round((votosB / total) * 1000) / 10 : 0,
    };

    const response = NextResponse.json({ resultado });
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=5'
    );
    return response;
  } catch (error) {
    console.error('[API /enquetes/resultado] Error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar resultado' },
      { status: 500 }
    );
  }
}
