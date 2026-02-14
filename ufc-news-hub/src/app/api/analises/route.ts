import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

// GET /api/analises — list all analyses
// GET /api/analises?latest=true — get latest only
// GET /api/analises?slug=xxx — get by slug
export async function GET(request: Request) {
  const url = new URL(request.url);
  const latest = url.searchParams.get('latest');
  const slug = url.searchParams.get('slug');

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

    if (latest === 'true') {
      const analise = await queryOne(
        `SELECT * FROM analises WHERE status = 'publicado' ORDER BY created_at DESC LIMIT 1`
      );
      return NextResponse.json(analise);
    }

    const analises = await query(
      `SELECT id, slug, titulo, subtitulo, evento_nome, evento_data, evento_local, 
              categoria_peso, is_titulo, fighter1_info, fighter2_info, created_at
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
