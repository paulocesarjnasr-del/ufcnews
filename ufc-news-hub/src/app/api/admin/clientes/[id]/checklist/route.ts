import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { ensureClientesTables, buscarChecklist, atualizarEntrega, getSegundaDaSemana } from '@/lib/clientes';
import type { UpdateEntregaPayload } from '@/lib/clientes-types';

// ═══════════════════════════════════════════════════════════
// GET: Checklist for a specific week (auto-generates if empty)
// Query: ?semana=2026-03-23
// ═══════════════════════════════════════════════════════════

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const semana = searchParams.get('semana') || getSegundaDaSemana();

    const entregas = await buscarChecklist(id, semana);

    return NextResponse.json({ entregas, semana_inicio: semana });
  } catch (error) {
    console.error('[API /admin/clientes/[id]/checklist] GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar checklist' }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// POST: Toggle/update a checklist item
// Body: { entrega_id, status, notas? }
// ═══════════════════════════════════════════════════════════

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();
    // params.id validates client ownership if needed
    await params;

    const body = await request.json() as UpdateEntregaPayload;

    if (!body.entrega_id || !body.status) {
      return NextResponse.json(
        { error: 'entrega_id e status sao obrigatorios' },
        { status: 400 }
      );
    }

    const entrega = await atualizarEntrega(body.entrega_id, body.status, body.notas);

    if (!entrega) {
      return NextResponse.json({ error: 'Entrega nao encontrada' }, { status: 404 });
    }

    return NextResponse.json({ entrega });
  } catch (error) {
    console.error('[API /admin/clientes/[id]/checklist] POST error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar entrega' }, { status: 500 });
  }
}
