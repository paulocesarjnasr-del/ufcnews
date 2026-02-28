import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    const deleted = await query<{ id: string }>(
      `DELETE FROM noticias
       WHERE publicado_em < NOW() - INTERVAL '24 hours'
         AND eh_sobre_ufc = true
       RETURNING id`
    );

    console.log(`[CLEANUP] ${deleted.length} notícias antigas deletadas`);

    return NextResponse.json({
      success: true,
      deleted: deleted.length,
    });
  } catch (error) {
    console.error('Erro no cleanup:', error);
    return NextResponse.json(
      { error: 'Erro no cleanup' },
      { status: 500 }
    );
  }
}
