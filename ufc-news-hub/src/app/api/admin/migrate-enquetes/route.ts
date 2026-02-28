import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expectedSecret = process.env.CRON_SECRET || 'ufc-news-cron-secret';

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ═══════════════════════════════════════
    // Table: enquetes (polls)
    // ═══════════════════════════════════════
    await client.query(`
      CREATE TABLE IF NOT EXISTS enquetes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        evento_id UUID REFERENCES eventos(id),
        luta_id UUID REFERENCES lutas(id),
        pergunta TEXT NOT NULL,
        opcao_a_id UUID REFERENCES lutadores(id),
        opcao_a_nome VARCHAR(100) NOT NULL,
        opcao_b_id UUID REFERENCES lutadores(id),
        opcao_b_nome VARCHAR(100) NOT NULL,
        ativa BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // ═══════════════════════════════════════
    // Table: votos_enquete (poll votes)
    // ═══════════════════════════════════════
    await client.query(`
      CREATE TABLE IF NOT EXISTS votos_enquete (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        enquete_id UUID NOT NULL REFERENCES enquetes(id) ON DELETE CASCADE,
        opcao CHAR(1) NOT NULL CHECK (opcao IN ('a', 'b')),
        usuario_id UUID REFERENCES usuarios_arena(id),
        guest_id VARCHAR(64),
        ip_address INET,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Partial unique indexes for duplicate vote prevention
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_votos_enquete_usuario
        ON votos_enquete(enquete_id, usuario_id)
        WHERE usuario_id IS NOT NULL;
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_votos_enquete_guest
        ON votos_enquete(enquete_id, guest_id)
        WHERE guest_id IS NOT NULL;
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_votos_enquete_enquete
        ON votos_enquete(enquete_id);
    `);

    // ═══════════════════════════════════════
    // Table: comentarios_enquete (poll comments)
    // ═══════════════════════════════════════
    await client.query(`
      CREATE TABLE IF NOT EXISTS comentarios_enquete (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        enquete_id UUID NOT NULL REFERENCES enquetes(id) ON DELETE CASCADE,
        usuario_id UUID REFERENCES usuarios_arena(id),
        guest_nome VARCHAR(50),
        conteudo TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comentarios_enquete_enquete
        ON comentarios_enquete(enquete_id, created_at DESC);
    `);

    await client.query('COMMIT');

    return NextResponse.json({
      success: true,
      message: 'Migration complete: enquetes, votos_enquete, comentarios_enquete tables created',
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[migrate-enquetes] Error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
