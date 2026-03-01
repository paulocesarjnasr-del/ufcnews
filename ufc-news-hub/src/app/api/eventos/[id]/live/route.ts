import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

interface LiveFight {
  id: string;
  ordem: number;
  tipo: string;
  status: string;
  vencedor_id: string | null;
  metodo: string | null;
  round_final: number | null;
  tempo_final: string | null;
  lutador1_nome: string;
  lutador2_nome: string;
  lutador1_id: string;
  lutador2_id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lutas = await query<LiveFight>(
      `SELECT l.id, l.ordem, l.tipo, l.status, l.vencedor_id, l.metodo,
              l.round_final, l.tempo_final,
              l.lutador1_id, l.lutador2_id,
              l1.nome as lutador1_nome, l2.nome as lutador2_nome
       FROM lutas l
       LEFT JOIN lutadores l1 ON l.lutador1_id = l1.id
       LEFT JOIN lutadores l2 ON l.lutador2_id = l2.id
       WHERE l.evento_id = $1
       ORDER BY l.ordem ASC`,
      [id]
    );

    const evento = await queryOne<{ status: string }>(
      `SELECT status FROM eventos WHERE id = $1`,
      [id]
    );

    return NextResponse.json(
      { lutas, evento_status: evento?.status || null },
      { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } }
    );
  } catch (error) {
    console.error('[API /eventos/[id]/live] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
