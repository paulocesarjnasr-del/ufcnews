import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { classifyNews } from '@/lib/keyword-classifier';

interface NewsRow {
  id: string;
  titulo: string;
  conteudo_completo: string | null;
  categoria: string;
}

interface FighterRow {
  nome: string;
  apelido: string | null;
}

// Calculate similarity between two titles
function calculateSimilarity(title1: string, title2: string): number {
  const normalize = (t: string) => t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be',
    'o', 'e', 'de', 'da', 'do', 'em', 'para', 'com', 'por', 'que', 'se', 'no', 'na',
    'ufc', 'mma', 'fighter', 'fight', 'news', 'report', 'says', 'said',
  ]);

  const getWords = (t: string) => normalize(t)
    .split(' ')
    .filter(w => w.length > 2 && !stopWords.has(w));

  const words1 = new Set(getWords(title1));
  const words2 = new Set(getWords(title2));

  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'all';

    const results = {
      duplicatesRemoved: 0,
      nonUfcRemoved: 0,
      recategorized: 0,
      errors: [] as string[],
    };

    // Action 1: Remove duplicate news
    if (action === 'all' || action === 'duplicates') {
      // Get all news ordered by date
      const allNews = await query<{ id: string; titulo: string; created_at: string }>(
        `SELECT id, titulo, created_at FROM noticias ORDER BY created_at ASC`
      );

      const toDelete: string[] = [];
      const seen: { id: string; titulo: string }[] = [];

      for (const news of allNews) {
        // Check similarity with previously seen titles
        let isDuplicate = false;
        for (const seenNews of seen) {
          const similarity = calculateSimilarity(news.titulo, seenNews.titulo);
          if (similarity > 0.70) {
            console.log(`Duplicate found (${(similarity * 100).toFixed(0)}%): "${news.titulo.substring(0, 40)}..." ~ "${seenNews.titulo.substring(0, 40)}..."`);
            toDelete.push(news.id);
            isDuplicate = true;
            break;
          }
        }

        if (!isDuplicate) {
          seen.push({ id: news.id, titulo: news.titulo });
        }
      }

      // Delete duplicates
      if (toDelete.length > 0) {
        await query(
          `DELETE FROM noticias WHERE id = ANY($1::uuid[])`,
          [toDelete]
        );
        results.duplicatesRemoved = toDelete.length;
      }
    }

    // Action 2: Remove non-UFC news
    if (action === 'all' || action === 'non-ufc') {
      // Get all fighters for classification
      const fighters = await query<FighterRow>(
        `SELECT nome, apelido FROM lutadores WHERE ativo = true`
      );

      // Get all news
      const news = await query<{ id: string; titulo: string; conteudo_completo: string | null }>(
        `SELECT id, titulo, conteudo_completo FROM noticias`
      );

      const toRemove: string[] = [];

      for (const item of news) {
        const classification = classifyNews(
          item.titulo,
          item.conteudo_completo || '',
          fighters
        );

        // If not UFC related, mark for removal
        if (!classification.eh_ufc) {
          console.log(`Non-UFC news found: "${item.titulo.substring(0, 60)}..."`);
          toRemove.push(item.id);
        }
      }

      // Delete non-UFC news
      if (toRemove.length > 0) {
        await query(
          `DELETE FROM noticias WHERE id = ANY($1::uuid[])`,
          [toRemove]
        );
        results.nonUfcRemoved = toRemove.length;
      }
    }

    // Action 3: Recategorize all news with new classifier
    if (action === 'all' || action === 'recategorize') {
      // Get all fighters for classification
      const fighters = await query<FighterRow>(
        `SELECT nome, apelido FROM lutadores WHERE ativo = true`
      );

      // Get all news
      const news = await query<NewsRow>(
        `SELECT id, titulo, conteudo_completo, categoria FROM noticias`
      );

      for (const item of news) {
        try {
          const classification = classifyNews(
            item.titulo,
            item.conteudo_completo || '',
            fighters
          );

          // Only update if category changed
          if (classification.categoria !== item.categoria) {
            await query(
              `UPDATE noticias SET categoria = $1 WHERE id = $2`,
              [classification.categoria, item.id]
            );
            results.recategorized++;
            console.log(`Recategorized: "${item.titulo.substring(0, 40)}..." from ${item.categoria} to ${classification.categoria}`);
          }
        } catch (error) {
          results.errors.push(`Error recategorizing ${item.id}: ${error}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      ...results,
    });
  } catch (error) {
    console.error('Erro ao limpar notícias:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Preview: find potential duplicates
    const allNews = await query<{ id: string; titulo: string; categoria: string; created_at: string }>(
      `SELECT id, titulo, categoria, created_at FROM noticias ORDER BY created_at DESC LIMIT 100`
    );

    const potentialDuplicates: Array<{ news1: string; news2: string; similarity: number }> = [];

    for (let i = 0; i < allNews.length; i++) {
      for (let j = i + 1; j < allNews.length; j++) {
        const similarity = calculateSimilarity(allNews[i].titulo, allNews[j].titulo);
        if (similarity > 0.50) {
          potentialDuplicates.push({
            news1: allNews[i].titulo.substring(0, 60) + '...',
            news2: allNews[j].titulo.substring(0, 60) + '...',
            similarity: Math.round(similarity * 100),
          });
        }
      }
    }

    // Count by category
    const categoryCounts = await query<{ categoria: string; count: string }>(
      `SELECT categoria, COUNT(*) as count FROM noticias GROUP BY categoria`
    );

    return NextResponse.json({
      totalNews: allNews.length,
      potentialDuplicates,
      categoryCounts: categoryCounts.reduce((acc, c) => ({ ...acc, [c.categoria]: parseInt(c.count) }), {}),
      message: 'Use POST to cleanup. Add ?action=duplicates or ?action=recategorize for specific actions.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
