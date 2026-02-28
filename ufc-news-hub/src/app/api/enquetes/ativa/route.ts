import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import type { EnqueteComDetalhes } from '@/types/enquete';

// GET /api/enquetes/ativa — Returns the currently active poll with fighter details and vote counts
export async function GET() {
  try {
    const enquete = await queryOne<EnqueteComDetalhes>(
      `SELECT e.*,
        la.imagem_url as opcao_a_foto, la.apelido as opcao_a_apelido,
        COALESCE(la.vitorias, 0) as opcao_a_vitorias, COALESCE(la.derrotas, 0) as opcao_a_derrotas, COALESCE(la.empates, 0) as opcao_a_empates,
        lb.imagem_url as opcao_b_foto, lb.apelido as opcao_b_apelido,
        COALESCE(lb.vitorias, 0) as opcao_b_vitorias, COALESCE(lb.derrotas, 0) as opcao_b_derrotas, COALESCE(lb.empates, 0) as opcao_b_empates,
        ev.nome as evento_nome,
        COALESCE(v.total_votos, 0)::integer as total_votos,
        COALESCE(v.votos_a, 0)::integer as votos_a,
        COALESCE(v.votos_b, 0)::integer as votos_b
      FROM enquetes e
      JOIN lutadores la ON la.id = e.opcao_a_id
      JOIN lutadores lb ON lb.id = e.opcao_b_id
      JOIN eventos ev ON ev.id = e.evento_id
      LEFT JOIN LATERAL (
        SELECT COUNT(*)::integer as total_votos,
          COUNT(*) FILTER (WHERE opcao = 'a')::integer as votos_a,
          COUNT(*) FILTER (WHERE opcao = 'b')::integer as votos_b
        FROM votos_enquete WHERE enquete_id = e.id
      ) v ON true
      WHERE e.ativa = true
      ORDER BY e.created_at DESC LIMIT 1`
    );

    const response = NextResponse.json({ enquete: enquete || null });
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=30, stale-while-revalidate=15'
    );
    return response;
  } catch (error) {
    console.error('[API /enquetes/ativa] Error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar enquete ativa' },
      { status: 500 }
    );
  }
}
