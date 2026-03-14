import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function GET(request: NextRequest) {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const limit = parseInt(searchParams.get('limit') || '10');

    const atividades = await query<{
      id: string;
      tipo: string;
      titulo: string;
      descricao: string | null;
      created_at: string;
    }>(
      `SELECT id, tipo, titulo, descricao, created_at
       FROM atividades
       WHERE usuario_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [usuario.id, Math.min(limit, 50)]
    );

    return NextResponse.json(atividades, {
      headers: { 'Cache-Control': 'private, max-age=30' },
    });
  } catch (error) {
    console.error('[API /arena/atividades] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
