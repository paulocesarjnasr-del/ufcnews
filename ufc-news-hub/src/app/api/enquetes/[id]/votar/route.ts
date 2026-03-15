import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

interface VotarBody {
  opcao: string;
  guestId?: string;
  usuarioId?: string;
}

interface Params {
  params: Promise<{ id: string }>;
}

// POST /api/enquetes/[id]/votar — Cast a vote on a poll
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await request.json()) as VotarBody;

    // Validate opcao
    if (!body.opcao || (body.opcao !== 'a' && body.opcao !== 'b')) {
      return NextResponse.json(
        { error: 'Opcao deve ser "a" ou "b"' },
        { status: 400 }
      );
    }

    // Check enquete exists and is active
    const enquete = await queryOne<{ id: string; ativa: boolean }>(
      'SELECT id, ativa FROM enquetes WHERE id = $1',
      [id]
    );

    if (!enquete) {
      return NextResponse.json(
        { error: 'Enquete nao encontrada' },
        { status: 404 }
      );
    }

    if (!enquete.ativa) {
      return NextResponse.json(
        { error: 'Enquete nao esta mais ativa' },
        { status: 400 }
      );
    }

    // Check for duplicate votes
    if (body.usuarioId) {
      const existingVote = await queryOne<{ id: string }>(
        'SELECT id FROM votos_enquete WHERE enquete_id = $1 AND usuario_id = $2',
        [id, body.usuarioId]
      );
      if (existingVote) {
        return NextResponse.json(
          { error: 'Voce ja votou nesta enquete' },
          { status: 409 }
        );
      }
    } else if (body.guestId) {
      const existingVote = await queryOne<{ id: string }>(
        'SELECT id FROM votos_enquete WHERE enquete_id = $1 AND guest_id = $2',
        [id, body.guestId]
      );
      if (existingVote) {
        return NextResponse.json(
          { error: 'Voce ja votou nesta enquete' },
          { status: 409 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'guestId ou usuarioId e obrigatorio' },
        { status: 400 }
      );
    }

    // Get IP address
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || null;

    // Insert vote
    await queryOne<{ id: string }>(
      `INSERT INTO votos_enquete (enquete_id, opcao, usuario_id, guest_id, ip_address)
       VALUES ($1, $2, $3, $4, NULLIF($5, '')::inet)
       RETURNING id`,
      [
        id,
        body.opcao,
        body.usuarioId || null,
        body.guestId || null,
        ip || '',
      ]
    );

    // Return updated counts
    const resultado = await queryOne<{
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

    const total = resultado?.total_votos ?? 0;
    const votosA = resultado?.votos_a ?? 0;
    const votosB = resultado?.votos_b ?? 0;

    return NextResponse.json({
      success: true,
      resultado: {
        total_votos: total,
        votos_a: votosA,
        votos_b: votosB,
        percentual_a: total > 0 ? Math.round((votosA / total) * 1000) / 10 : 0,
        percentual_b: total > 0 ? Math.round((votosB / total) * 1000) / 10 : 0,
      },
    });
  } catch (error) {
    console.error('[API /enquetes/votar] Error:', error);

    // Handle unique constraint violation gracefully
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json(
        { error: 'Voce ja votou nesta enquete' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao registrar voto' },
      { status: 500 }
    );
  }
}
