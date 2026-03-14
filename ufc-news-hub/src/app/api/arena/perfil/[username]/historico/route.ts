import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const historico = await query<{
      evento_id: string;
      evento_nome: string;
      evento_data: string;
      pontos_totais: number;
      acertos: number;
      total_lutas: number;
      card_perfeito: boolean;
    }>(
      `SELECT
        ep.evento_id,
        e.nome as evento_nome,
        e.data_evento as evento_data,
        ep.pontos_totais,
        ep.acertos,
        ep.total_lutas,
        COALESCE(ep.card_perfeito, false) as card_perfeito
      FROM evento_pontuacao ep
      JOIN eventos e ON e.id = ep.evento_id
      JOIN usuarios_arena u ON u.id = ep.usuario_id
      WHERE u.username = $1
      ORDER BY e.data_evento DESC
      LIMIT 20`,
      [username]
    );

    return NextResponse.json(historico, {
      headers: { 'Cache-Control': 'public, s-maxage=60' },
    });
  } catch (error) {
    console.error('[API /arena/perfil/historico] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
