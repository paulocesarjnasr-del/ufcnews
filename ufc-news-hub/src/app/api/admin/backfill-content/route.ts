import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { scrapeArticleContent } from '@/lib/article-scraper';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * POST /api/admin/backfill-content
 * Finds articles with empty content and scrapes their source URLs.
 * Optional query param: ?limit=10 (default 20)
 */
export async function POST(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20', 10);

  try {
    // Find articles with empty or very short content
    const result = await pool.query(
      `SELECT id, titulo, fonte_url, fonte_nome 
       FROM noticias 
       WHERE (conteudo_completo IS NULL OR length(conteudo_completo) < 50)
         AND fonte_url IS NOT NULL
       ORDER BY publicado_em DESC
       LIMIT $1`,
      [limit]
    );

    const articles = result.rows;
    console.log(`[backfill] Found ${articles.length} articles with empty content`);

    let updated = 0;
    let failed = 0;
    const results: Array<{ titulo: string; status: string; chars?: number }> = [];

    for (const article of articles) {
      console.log(`[backfill] Scraping: ${article.titulo}`);

      const content = await scrapeArticleContent(article.fonte_url);

      if (content && content.length > 50) {
        await pool.query(
          `UPDATE noticias SET conteudo_completo = $1 WHERE id = $2`,
          [content, article.id]
        );
        updated++;
        results.push({ titulo: article.titulo, status: 'updated', chars: content.length });
        console.log(`[backfill] ✅ ${article.titulo} — ${content.length} chars`);
      } else {
        failed++;
        results.push({ titulo: article.titulo, status: 'no_content' });
        console.log(`[backfill] ❌ ${article.titulo} — no content extracted`);
      }

      // Small delay between requests to be polite
      await new Promise((r) => setTimeout(r, 500));
    }

    return NextResponse.json({
      success: true,
      total: articles.length,
      updated,
      failed,
      results,
    });
  } catch (error) {
    console.error('[backfill] Error:', error);
    return NextResponse.json(
      { error: 'Backfill failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/backfill-content
 * Returns count of articles with empty content.
 */
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT count(*) as total FROM noticias WHERE (conteudo_completo IS NULL OR length(conteudo_completo) < 50)`
    );

    const bySource = await pool.query(
      `SELECT fonte_nome, count(*) as count 
       FROM noticias 
       WHERE (conteudo_completo IS NULL OR length(conteudo_completo) < 50)
       GROUP BY fonte_nome
       ORDER BY count DESC`
    );

    return NextResponse.json({
      emptyArticles: parseInt(result.rows[0].total, 10),
      bySource: bySource.rows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
