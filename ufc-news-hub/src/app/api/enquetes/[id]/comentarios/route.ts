import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import type { ComentarioEnquete } from '@/types/enquete';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/enquetes/[id]/comentarios — Paginated comments for a poll
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const pagina = Math.max(1, parseInt(searchParams.get('pagina') || '1', 10));
    const limite = Math.min(50, Math.max(1, parseInt(searchParams.get('limite') || '20', 10)));
    const offset = (pagina - 1) * limite;

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

    // Fetch comments with author info
    const [comentarios, countResult] = await Promise.all([
      query<ComentarioEnquete>(
        `SELECT
          ce.id,
          ce.enquete_id,
          ce.usuario_id,
          ce.guest_nome,
          ce.conteudo,
          ce.created_at,
          COALESCE(ua.display_name, ua.username, ce.guest_nome, 'Anonimo') as autor_nome,
          ua.avatar_url as autor_avatar
        FROM comentarios_enquete ce
        LEFT JOIN usuarios_arena ua ON ua.id = ce.usuario_id
        WHERE ce.enquete_id = $1
        ORDER BY ce.created_at DESC
        LIMIT $2 OFFSET $3`,
        [id, limite, offset]
      ),
      queryOne<{ total: number }>(
        'SELECT COUNT(*)::integer as total FROM comentarios_enquete WHERE enquete_id = $1',
        [id]
      ),
    ]);

    const total = countResult?.total ?? 0;
    const totalPaginas = Math.ceil(total / limite);

    return NextResponse.json({
      comentarios,
      total,
      pagina,
      totalPaginas,
    });
  } catch (error) {
    console.error('[API /enquetes/comentarios] GET Error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar comentarios' },
      { status: 500 }
    );
  }
}

// POST /api/enquetes/[id]/comentarios — Create a new comment on a poll
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await request.json()) as {
      conteudo?: string;
      guestNome?: string;
      usuarioId?: string;
    };

    // Validate content
    if (!body.conteudo || typeof body.conteudo !== 'string') {
      return NextResponse.json(
        { error: 'Conteudo e obrigatorio' },
        { status: 400 }
      );
    }

    const conteudo = body.conteudo.trim();

    if (conteudo.length < 3) {
      return NextResponse.json(
        { error: 'Comentario deve ter pelo menos 3 caracteres' },
        { status: 400 }
      );
    }

    if (conteudo.length > 500) {
      return NextResponse.json(
        { error: 'Comentario deve ter no maximo 500 caracteres' },
        { status: 400 }
      );
    }

    // Require guestNome if no usuarioId
    if (!body.usuarioId && (!body.guestNome || body.guestNome.trim().length === 0)) {
      return NextResponse.json(
        { error: 'Nome e obrigatorio para visitantes' },
        { status: 400 }
      );
    }

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

    // Insert comment
    const comentario = await queryOne<ComentarioEnquete>(
      `WITH inserted AS (
        INSERT INTO comentarios_enquete (enquete_id, usuario_id, guest_nome, conteudo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      )
      SELECT
        i.id,
        i.enquete_id,
        i.usuario_id,
        i.guest_nome,
        i.conteudo,
        i.created_at,
        COALESCE(ua.display_name, ua.username, i.guest_nome, 'Anonimo') as autor_nome,
        ua.avatar_url as autor_avatar
      FROM inserted i
      LEFT JOIN usuarios_arena ua ON ua.id = i.usuario_id`,
      [
        id,
        body.usuarioId || null,
        body.guestNome?.trim() || null,
        conteudo,
      ]
    );

    return NextResponse.json({ comentario }, { status: 201 });
  } catch (error) {
    console.error('[API /enquetes/comentarios] POST Error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar comentario', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
