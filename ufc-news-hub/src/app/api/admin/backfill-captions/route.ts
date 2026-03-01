import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query, queryOne } from '@/lib/db';
import { generateReelCaption } from '@/lib/reel-caption';

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    // Get all noticias without captions that have images (last 24h)
    const noticias = await query<{ id: string; titulo: string; subtitulo: string | null }>(
      `SELECT id, titulo, subtitulo FROM noticias
       WHERE reel_caption IS NULL
         AND imagem_url IS NOT NULL
         AND publicado_em >= NOW() - INTERVAL '72 hours'
       ORDER BY publicado_em DESC`
    );

    let generated = 0;
    let failed = 0;

    for (const n of noticias) {
      try {
        const caption = await generateReelCaption(n.titulo, n.subtitulo);
        await queryOne(
          `UPDATE noticias SET reel_caption = $1 WHERE id = $2`,
          [caption, n.id]
        );
        generated++;
      } catch {
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      total: noticias.length,
      generated,
      failed,
    });
  } catch (error) {
    console.error('Error backfilling captions:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
