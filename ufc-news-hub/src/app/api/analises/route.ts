import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

// GET /api/analises — list all analyses
// GET /api/analises?latest=true — get latest only
// GET /api/analises?slug=xxx — get by slug
// GET /api/analises?evento_id=xxx — get by event ID
export async function GET(request: Request) {
  const url = new URL(request.url);
  const latest = url.searchParams.get('latest');
  const slug = url.searchParams.get('slug');
  const eventoId = url.searchParams.get('evento_id');

  try {
    if (slug) {
      const analise = await queryOne(
        `SELECT * FROM analises WHERE slug = $1 AND status = 'publicado'`, [slug]
      );
      if (!analise) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(analise);
    }

    if (eventoId) {
      const analise = await queryOne<{ slug: string; titulo: string }>(
        `SELECT slug, titulo FROM analises WHERE evento_id = $1 AND status = 'publicado' ORDER BY created_at DESC LIMIT 1`,
        [eventoId]
      );
      return NextResponse.json(analise);
    }

    if (latest === 'true') {
      const analise = await queryOne(
        `SELECT * FROM analises WHERE status = 'publicado' ORDER BY created_at DESC LIMIT 1`
      );
      return NextResponse.json(analise);
    }

    const analises = await query(
      `SELECT id, slug, titulo, subtitulo, evento_nome, evento_data, evento_local,
              categoria_peso, is_titulo, fighter1_info, fighter2_info, created_at,
              analysis_type,
              COALESCE(jsonb_array_length(fights_analysis), 0) as total_fights
       FROM analises
       WHERE status = 'publicado'
       ORDER BY created_at DESC
       LIMIT 50`
    );
    return NextResponse.json(analises);

  } catch (error) {
    console.error('Error fetching analyses:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
