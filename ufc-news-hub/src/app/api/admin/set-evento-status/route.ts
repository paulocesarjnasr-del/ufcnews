import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-sessions';

export async function POST(request: NextRequest) {
  try {
    const unauthorized = requireAdmin(request);
    if (unauthorized) return unauthorized;

    const body = await request.json() as { evento_id?: string; status?: string };
    const { evento_id, status } = body;

    if (!evento_id || !status) {
      return NextResponse.json({ error: 'evento_id e status obrigatorios' }, { status: 400 });
    }

    const validStatuses = ['agendado', 'ao_vivo', 'finalizado', 'cancelado'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: `Status invalido. Use: ${validStatuses.join(', ')}` }, { status: 400 });
    }

    const result = await query<{ id: string; nome: string; status: string }>(
      `UPDATE eventos SET status = $1 WHERE id = $2 RETURNING id, nome, status`,
      [status, evento_id]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: 'Evento nao encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      evento: result[0],
      message: `Evento "${result[0].nome}" atualizado para ${status}`,
    });
  } catch (error) {
    console.error('[API admin/set-evento-status] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
