import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ReelNoticia } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const fingerprint = request.headers.get('x-user-fingerprint') || '';

    const noticias = await query<ReelNoticia>(
      `SELECT
        n.id,
        n.titulo,
        n.reel_caption,
        n.imagem_url,
        n.fonte_url,
        n.fonte_nome,
        n.categoria,
        n.publicado_em,
        COALESCE(l.likes_count, 0)::int AS likes_count,
        CASE WHEN ul.id IS NOT NULL THEN true ELSE false END AS user_liked,
        COALESCE(c.comments_count, 0)::int AS comments_count
      FROM noticias n
      LEFT JOIN (
        SELECT noticia_id, COUNT(*) AS likes_count
        FROM news_likes
        GROUP BY noticia_id
      ) l ON l.noticia_id = n.id
      LEFT JOIN news_likes ul ON ul.noticia_id = n.id AND ul.user_fingerprint = $1
      LEFT JOIN (
        SELECT noticia_id, COUNT(*) AS comments_count
        FROM comentarios
        WHERE status = 'aprovado'
        GROUP BY noticia_id
      ) c ON c.noticia_id = n.id
      WHERE n.eh_sobre_ufc = true
        AND n.imagem_url IS NOT NULL
        AND n.publicado_em >= NOW() - INTERVAL '72 hours'
      ORDER BY n.publicado_em DESC`,
      [fingerprint]
    );

    return NextResponse.json({ noticias }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar reels:', error);
    return NextResponse.json({ error: 'Erro ao buscar reels' }, { status: 500 });
  }
}
