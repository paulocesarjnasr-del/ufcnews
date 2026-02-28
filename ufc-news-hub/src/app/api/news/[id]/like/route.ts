import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { fingerprint } = body;

    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    }

    await query(
      `INSERT INTO news_likes (noticia_id, user_fingerprint)
       VALUES ($1, $2)
       ON CONFLICT (noticia_id, user_fingerprint) DO NOTHING`,
      [id, fingerprint]
    );

    const result = await queryOne<{ count: string }>(
      'SELECT COUNT(*) as count FROM news_likes WHERE noticia_id = $1',
      [id]
    );

    return NextResponse.json({
      liked: true,
      likes_count: parseInt(result?.count || '0', 10),
    });
  } catch (error) {
    console.error('Erro ao dar like:', error);
    return NextResponse.json({ error: 'Erro ao dar like' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { fingerprint } = body;

    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    }

    await query(
      'DELETE FROM news_likes WHERE noticia_id = $1 AND user_fingerprint = $2',
      [id, fingerprint]
    );

    const result = await queryOne<{ count: string }>(
      'SELECT COUNT(*) as count FROM news_likes WHERE noticia_id = $1',
      [id]
    );

    return NextResponse.json({
      liked: false,
      likes_count: parseInt(result?.count || '0', 10),
    });
  } catch (error) {
    console.error('Erro ao remover like:', error);
    return NextResponse.json({ error: 'Erro ao remover like' }, { status: 500 });
  }
}
