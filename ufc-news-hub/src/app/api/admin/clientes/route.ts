import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { ensureClientesTables, listarClientes, criarCliente } from '@/lib/clientes';
import type { CreateClientePayload } from '@/lib/clientes-types';

// ═══════════════════════════════════════════════════════════
// GET: List clients with optional filters
// Query: ?status=ativo&search=term&limit=50&offset=0
// ═══════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();

    const { searchParams } = new URL(request.url);
    const result = await listarClientes({
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API /admin/clientes] GET error:', error);
    return NextResponse.json({ error: 'Erro ao listar clientes' }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// POST: Create a new client
// Body: { nome, email?, telefone?, tipo?, plano?, notas?, contato_nome?, redes_sociais? }
// ═══════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();

    const body = await request.json() as CreateClientePayload;

    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json({ error: 'Nome e obrigatorio' }, { status: 400 });
    }

    const cliente = await criarCliente(body);
    return NextResponse.json({ cliente }, { status: 201 });
  } catch (error) {
    console.error('[API /admin/clientes] POST error:', error);
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 });
  }
}
