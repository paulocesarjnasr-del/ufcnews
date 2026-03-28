import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { ensureClientesTables, buscarCliente, atualizarCliente, deletarCliente, buscarChecklist, getSegundaDaSemana } from '@/lib/clientes';
import type { UpdateClientePayload } from '@/lib/clientes-types';

// ═══════════════════════════════════════════════════════════
// GET: Single client with current week's checklist
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
    const cliente = await buscarCliente(id);

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente nao encontrado' }, { status: 404 });
    }

    const semanaAtual = getSegundaDaSemana();
    const entregas_semana = await buscarChecklist(id, semanaAtual);

    return NextResponse.json({ cliente, entregas_semana });
  } catch (error) {
    console.error('[API /admin/clientes/[id]] GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar cliente' }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// PATCH: Update client
// ═══════════════════════════════════════════════════════════

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();
    const { id } = await params;
    const body = await request.json() as UpdateClientePayload;
    const cliente = await atualizarCliente(id, body);

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente nao encontrado' }, { status: 404 });
    }

    return NextResponse.json({ cliente });
  } catch (error) {
    console.error('[API /admin/clientes/[id]] PATCH error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// DELETE: Soft-delete (set status to cancelado)
// ═══════════════════════════════════════════════════════════

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();
    const { id } = await params;
    const deleted = await deletarCliente(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Cliente nao encontrado' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[API /admin/clientes/[id]] DELETE error:', error);
    return NextResponse.json({ error: 'Erro ao deletar cliente' }, { status: 500 });
  }
}
