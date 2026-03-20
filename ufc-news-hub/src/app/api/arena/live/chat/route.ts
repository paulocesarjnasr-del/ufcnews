import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface ChatMessage {
  id: string;
  usuario_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  mensagem: string;
  created_at: string;
}

export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventoId = searchParams.get('evento_id');
    const after = searchParams.get('after');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 100);

    if (!eventoId) {
      return NextResponse.json({ error: 'evento_id obrigatorio' }, { status: 400 });
    }

    const params: unknown[] = [eventoId, limit];
    let afterClause = '';
    if (after) {
      afterClause = 'AND c.created_at > $3';
      params.push(after);
    }

    const mensagens = await query<ChatMessage>(
      `SELECT * FROM (
        SELECT c.id, c.usuario_id, u.username, u.display_name, u.avatar_url,
               c.mensagem, c.created_at
        FROM chat_evento c
        JOIN usuarios_arena u ON u.id = c.usuario_id
        WHERE c.evento_id = $1 ${afterClause}
        ORDER BY c.created_at DESC
        LIMIT $2
      ) sub ORDER BY sub.created_at ASC`,
      params
    );

    const onlineResult = await queryOne<{ count: number }>(
      `SELECT COUNT(DISTINCT usuario_id)::int as count
       FROM chat_evento
       WHERE evento_id = $1 AND created_at > NOW() - interval '5 minutes'`,
      [eventoId]
    );

    return NextResponse.json(
      { mensagens, online_count: onlineResult?.count ?? 0 },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('[API /arena/live/chat GET] Error:', err.message);
    console.error('[API /arena/live/chat GET] Stack:', err.stack);
    return NextResponse.json({ error: 'Erro interno', detail: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const body = await request.json() as { evento_id?: string; mensagem?: string };
    const { evento_id, mensagem: rawMsg } = body;

    if (!evento_id || !rawMsg) {
      return NextResponse.json({ error: 'evento_id e mensagem obrigatorios' }, { status: 400 });
    }

    const mensagem = rawMsg.trim();
    if (mensagem.length < 1 || mensagem.length > 280) {
      return NextResponse.json({ error: 'Mensagem deve ter entre 1 e 280 caracteres' }, { status: 400 });
    }

    const evento = await queryOne<{ status: string }>(
      `SELECT status FROM eventos WHERE id = $1`,
      [evento_id]
    );
    if (!evento || (evento.status !== 'ao_vivo' && evento.status !== 'agendado')) {
      return NextResponse.json({ error: 'Evento nao encontrado ou finalizado' }, { status: 400 });
    }

    const lastMsg = await queryOne<{ created_at: string }>(
      `SELECT created_at FROM chat_evento WHERE usuario_id = $1 AND evento_id = $2 ORDER BY created_at DESC LIMIT 1`,
      [usuario.id, evento_id]
    );
    if (lastMsg) {
      const diff = Date.now() - new Date(lastMsg.created_at).getTime();
      if (diff < 2000) {
        return NextResponse.json({ error: 'Aguarde 2 segundos entre mensagens' }, { status: 429 });
      }
    }

    const novaMensagem = await queryOne<ChatMessage>(
      `WITH inserted AS (
        INSERT INTO chat_evento (evento_id, usuario_id, mensagem)
        VALUES ($1, $2, $3)
        RETURNING *
      )
      SELECT i.id, i.usuario_id, u.username, u.display_name, u.avatar_url,
             i.mensagem, i.created_at
      FROM inserted i
      JOIN usuarios_arena u ON u.id = i.usuario_id`,
      [evento_id, usuario.id, mensagem]
    );

    return NextResponse.json(novaMensagem, { status: 201 });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('[API /arena/live/chat POST] Error:', err.message);
    console.error('[API /arena/live/chat POST] Stack:', err.stack);
    return NextResponse.json({ error: 'Erro interno', detail: err.message }, { status: 500 });
  }
}
