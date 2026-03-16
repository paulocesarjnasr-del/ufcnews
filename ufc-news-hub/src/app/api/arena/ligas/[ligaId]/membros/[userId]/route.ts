import { NextRequest, NextResponse } from 'next/server';
import { queryOne, transaction } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

interface RouteParams {
  params: Promise<{ ligaId: string; userId: string }>;
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { ligaId, userId } = await params;
    const usuario = await getUsuarioAtual();

    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    // Check admin
    const admin = await queryOne<{ is_admin: boolean }>(
      `SELECT is_admin FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, usuario.id]
    );

    if (!admin?.is_admin) {
      return NextResponse.json({ error: 'Apenas o criador pode expulsar membros' }, { status: 403 });
    }

    // Cannot expel yourself
    if (userId === usuario.id) {
      return NextResponse.json({ error: 'Voce nao pode expulsar a si mesmo' }, { status: 403 });
    }

    // Check target is member
    const target = await queryOne<{ id: string }>(
      `SELECT id FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
      [ligaId, userId]
    );

    if (!target) {
      return NextResponse.json({ error: 'Membro nao encontrado nesta liga' }, { status: 404 });
    }

    // Remove member + decrement count in transaction
    await transaction(async (client) => {
      await client.query(
        `DELETE FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2`,
        [ligaId, userId]
      );
      await client.query(
        `UPDATE ligas SET total_membros = GREATEST(total_membros - 1, 0) WHERE id = $1`,
        [ligaId]
      );
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[DELETE /arena/ligas/membros] Erro:', msg);
    return NextResponse.json({ error: `Erro ao expulsar membro: ${msg}` }, { status: 500 });
  }
}
