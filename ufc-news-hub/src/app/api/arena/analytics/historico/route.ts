import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

export async function GET() {
  try {
    const usuario = await getUsuarioAtual();
    if (!usuario) return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });

    const historico = await query<{
      evento_id: string; nome: string; data_evento: string;
      pontos_totais: number; acertos: number; total_lutas: number;
    }>(
      `SELECT ep.evento_id, e.nome, e.data_evento,
              ep.pontos_totais, ep.acertos, ep.total_lutas
       FROM evento_pontuacao ep
       JOIN eventos e ON e.id = ep.evento_id
       WHERE ep.usuario_id = $1
       ORDER BY e.data_evento ASC
       LIMIT 20`,
      [usuario.id]
    );

    return NextResponse.json(historico, {
      headers: { 'Cache-Control': 'private, max-age=60' },
    });
  } catch (error) {
    console.error('[API analytics/historico] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
