import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    // 1. Add reel_caption column to noticias (IF NOT EXISTS)
    await query(`
      ALTER TABLE noticias
      ADD COLUMN IF NOT EXISTS reel_caption VARCHAR(100)
    `);

    // 2. Ensure uuid-ossp extension is available
    await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // 3. Create news_likes table IF NOT EXISTS
    await query(`
      CREATE TABLE IF NOT EXISTS news_likes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        noticia_id UUID NOT NULL REFERENCES noticias(id) ON DELETE CASCADE,
        user_fingerprint VARCHAR(128) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(noticia_id, user_fingerprint)
      )
    `);

    // 4. Create index on news_likes(noticia_id) IF NOT EXISTS
    await query(`
      CREATE INDEX IF NOT EXISTS idx_news_likes_noticia
      ON news_likes(noticia_id)
    `);

    return NextResponse.json({
      success: true,
      message: 'Reels migration complete',
    });
  } catch (error) {
    console.error('Error running reels migration:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
