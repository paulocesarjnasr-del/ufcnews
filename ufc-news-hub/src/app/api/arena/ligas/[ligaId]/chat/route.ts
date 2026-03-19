import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

interface ChatMessage {
  id: string;
  liga_id: string;
  usuario_id: string;
  mensagem: string;
  created_at: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface RouteParams {
  params: Promise<{ ligaId: string }>;
}

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

async function verificarMembro(ligaId: string, usuarioId: string): Promise<boolean> {
  const membro = await queryOne<{ usuario_id: string }>(
    `SELECT usuario_id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
    [ligaId, usuarioId]
  );
  return membro !== null;
}

// ═══════════════════════════════════════════════════════════════
// GET /api/arena/ligas/[ligaId]/chat
// Retorna mensagens em ordem cronologica
// Query params: after (ISO timestamp), limit (max 100, default 50)
// ═══════════════════════════════════════════════════════════════

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      );
    }

    const { ligaId } = await params;

    const isMembro = await verificarMembro(ligaId, usuario.id);
    if (!isMembro) {
      return NextResponse.json(
        { error: 'Voce nao e membro desta liga' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const after = searchParams.get('after');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 100);

    // Busca as mais recentes (DESC) e reverte para ordem cronologica (ASC)
    // Se `after` for fornecido, retorna apenas mensagens posteriores ao timestamp
    const mensagens = await query<ChatMessage>(
      `SELECT
        lc.id,
        lc.liga_id,
        lc.usuario_id,
        lc.mensagem,
        lc.created_at,
        ua.username,
        ua.display_name,
        ua.avatar_url
       FROM (
         SELECT * FROM liga_chat
         WHERE liga_id = $1
           ${after ? 'AND created_at > $3' : ''}
         ORDER BY created_at DESC
         LIMIT $2
       ) lc
       JOIN usuarios_arena ua ON ua.id = lc.usuario_id
       ORDER BY lc.created_at ASC`,
      after ? [ligaId, limit, after] : [ligaId, limit]
    );

    return NextResponse.json(
      { mensagens },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('[API /arena/ligas/[ligaId]/chat GET] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// ═══════════════════════════════════════════════════════════════
// POST /api/arena/ligas/[ligaId]/chat
// Envia uma nova mensagem no chat da liga
// ═══════════════════════════════════════════════════════════════

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      );
    }

    const { ligaId } = await params;

    const isMembro = await verificarMembro(ligaId, usuario.id);
    if (!isMembro) {
      return NextResponse.json(
        { error: 'Voce nao e membro desta liga' },
        { status: 403 }
      );
    }

    const body: unknown = await request.json();
    if (
      typeof body !== 'object' ||
      body === null ||
      !('mensagem' in body) ||
      typeof (body as Record<string, unknown>).mensagem !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Campo mensagem e obrigatorio' },
        { status: 400 }
      );
    }

    const mensagem = ((body as Record<string, unknown>).mensagem as string).trim();

    if (mensagem.length < 1 || mensagem.length > 280) {
      return NextResponse.json(
        { error: 'Mensagem deve ter entre 1 e 280 caracteres' },
        { status: 400 }
      );
    }

    const novaMensagem = await queryOne<ChatMessage>(
      `WITH inserted AS (
         INSERT INTO liga_chat (liga_id, usuario_id, mensagem)
         VALUES ($1, $2, $3)
         RETURNING *
       )
       SELECT
         ins.id,
         ins.liga_id,
         ins.usuario_id,
         ins.mensagem,
         ins.created_at,
         ua.username,
         ua.display_name,
         ua.avatar_url
       FROM inserted ins
       JOIN usuarios_arena ua ON ua.id = ins.usuario_id`,
      [ligaId, usuario.id, mensagem]
    );

    return NextResponse.json(
      { mensagem: novaMensagem },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('[API /arena/ligas/[ligaId]/chat POST] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
