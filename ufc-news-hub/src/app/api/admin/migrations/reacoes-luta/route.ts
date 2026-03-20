import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS reacoes_luta (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        luta_id UUID NOT NULL REFERENCES lutas(id) ON DELETE CASCADE,
        lutador_id UUID NOT NULL REFERENCES lutadores(id) ON DELETE CASCADE,
        usuario_id UUID NOT NULL REFERENCES usuarios_arena(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await query(`CREATE INDEX IF NOT EXISTS idx_reacoes_luta_luta_id ON reacoes_luta(luta_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_reacoes_luta_created ON reacoes_luta(created_at)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_reacoes_luta_usuario ON reacoes_luta(usuario_id, created_at)`);

    return NextResponse.json({ ok: true, message: 'Tabela reacoes_luta criada' });
  } catch (error) {
    console.error('[Migration reacoes_luta]', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
