import crypto from 'crypto';
import { Pool } from 'pg';
import { DeduplicationResult } from '@/types';

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractKeyWords(title: string): string[] {
  const normalized = normalizeTitle(title);
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
    'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used',
    'o', 'e', 'de', 'da', 'do', 'em', 'para', 'com', 'por', 'que', 'se', 'no', 'na',
    'um', 'uma', 'os', 'as', 'dos', 'das', 'ao', 'aos', 'sobre', 'como', 'mais',
    'ufc', 'mma', 'fighter', 'fight', 'news', 'report', 'says', 'said', 'after',
  ]);

  return normalized
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.has(word));
}

function calculateSimilarity(title1: string, title2: string): number {
  const words1 = new Set(extractKeyWords(title1));
  const words2 = new Set(extractKeyWords(title2));

  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

// Detect the "angle" of the article to distinguish different stories about same fighters
type ArticleAngle = 'result' | 'preview' | 'weigh-in' | 'profile' | 'odds' | 'announcement' | 'general';

function detectAngle(title: string): ArticleAngle {
  const t = title.toLowerCase();

  // Weigh-in (check BEFORE results — "weigh in results" is a weigh-in, not a fight result)
  if (/\b(weigh.?in|weigh.?ins|weight.cut|scale|ceremonial)\b/.test(t)) {
    return 'weigh-in';
  }
  // Odds / betting (check BEFORE preview — "odds, preview and prediction" is mainly about odds)
  if (/\b(odds|favorite|underdog|betting|line|moneyline)\b/.test(t)) {
    return 'odds';
  }
  // Result / recap
  if (/\b(knockout|ko|tko|submission|finishes?|stops?|defeats?|wins?\b|beats?|decision|results?|recap|highlights?|ground.and.pound)\b/.test(t)) {
    return 'result';
  }
  // Preview
  if (/\b(preview|burning.questions|what.to.watch|gameplan|breakdown|how.to.watch)\b/.test(t)) {
    return 'preview';
  }
  // Odds / betting
  if (/\b(odds|favorite|underdog|betting|line|moneyline)\b/.test(t)) {
    return 'odds';
  }
  // Fight announcement
  if (/\b(set.to|headlines?|added.to|books?|booked|official|confirmed|vs\.?)\b/.test(t) && /\b(card|event|headline)\b/.test(t)) {
    return 'announcement';
  }
  // Profile / interview
  if (/\b(profile|interview|ready|unbroken|mindset|road.to|exclusive|story)\b/.test(t)) {
    return 'profile';
  }

  return 'general';
}

export function generateHash(title: string): string {
  const normalized = normalizeTitle(title);
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

// Source quality ranking — higher = better
const SOURCE_QUALITY: Record<string, number> = {
  'UFC.com': 100,
  'UFC Official': 100,
  'UFC': 100,
  'MMA Fighting': 80,
  'ESPN': 70,
  'MMA Mania': 60,
  'MMAMania': 60,
  'LowKick MMA': 50,
  'TheMacLife': 50,
};

function getSourceScore(fonteName: string): number {
  for (const [key, score] of Object.entries(SOURCE_QUALITY)) {
    if (fonteName.toLowerCase().includes(key.toLowerCase())) return score;
  }
  return 30;
}

export async function checkDuplicate(
  titulo: string,
  lutadoresMencionados: string[],
  pool: Pool,
  newArticle?: { conteudo: string; fonteName: string }
): Promise<DeduplicationResult> {
  const hash = generateHash(titulo);
  const newAngle = detectAngle(titulo);

  // 1. Hash exato — título praticamente idêntico
  const hashCheck = await pool.query(
    'SELECT id FROM noticias WHERE hash_deduplicacao = $1',
    [hash]
  );

  if (hashCheck.rows.length > 0) {
    return { isDuplicate: true, reason: 'hash_exato', hash };
  }

  // 2. Similaridade alta de título (>70%) — mesma notícia de fonte diferente
  const recentTitles = await pool.query<{ id: string; titulo: string; conteudo_completo: string | null; fonte_nome: string | null }>(
    `SELECT id, titulo, conteudo_completo, fonte_nome FROM noticias
     WHERE created_at > NOW() - INTERVAL '24 hours'
     ORDER BY created_at DESC
     LIMIT 100`
  );

  for (const row of recentTitles.rows) {
    const similarity = calculateSimilarity(titulo, row.titulo);
    if (similarity > 0.70) {
      console.log(`Notícia similar encontrada (${(similarity * 100).toFixed(0)}%): "${row.titulo.substring(0, 60)}..."`);

      if (newArticle && shouldReplace(row, newArticle)) {
        return { isDuplicate: true, reason: 'titulo_similar', hash, replaceId: row.id };
      }
      return { isDuplicate: true, reason: 'titulo_similar', hash };
    }
  }

  // 3. Mesmos 2+ lutadores + MESMO ângulo = mesma história
  // Diferentes ângulos (preview vs result vs profile) NÃO são duplicatas
  if (lutadoresMencionados.length >= 2) {
    const recentCheck = await pool.query<{ id: string; titulo: string; conteudo_completo: string | null; fonte_nome: string | null }>(
      `SELECT DISTINCT n.id, n.titulo, n.conteudo_completo, n.fonte_nome
       FROM noticias n
       JOIN noticia_entidades ne ON n.id = ne.noticia_id
       JOIN lutadores l ON ne.lutador_id = l.id
       WHERE LOWER(l.nome) = ANY($1::text[])
       AND n.created_at > NOW() - INTERVAL '24 hours'
       GROUP BY n.id, n.titulo, n.conteudo_completo, n.fonte_nome
       HAVING COUNT(DISTINCT l.id) >= 2`,
      [lutadoresMencionados.map((n) => n.toLowerCase())]
    );

    for (const row of recentCheck.rows) {
      const existingAngle = detectAngle(row.titulo);

      // Only duplicate if SAME angle (result vs result, preview vs preview, etc.)
      if (newAngle !== existingAngle) {
        console.log(`  Mesmos lutadores mas ângulo diferente (${newAngle} vs ${existingAngle}) — NÃO é duplicata`);
        continue;
      }

      // Same fighters + same angle = duplicate. Check if new one is better.
      console.log(`Duplicata: mesmos lutadores + mesmo ângulo (${newAngle}): "${row.titulo.substring(0, 60)}..."`);

      if (newArticle && shouldReplace(row, newArticle)) {
        return { isDuplicate: true, reason: 'mesmo_evento', hash, replaceId: row.id };
      }
      return { isDuplicate: true, reason: 'mesmo_evento', hash };
    }
  }

  return { isDuplicate: false, hash };
}

// Decide if the new article should replace the existing one
function shouldReplace(
  existing: { conteudo_completo: string | null; fonte_nome: string | null },
  newArticle: { conteudo: string; fonteName: string }
): boolean {
  // NEVER replace our own articles
  if (existing.fonte_nome === 'UFC AI Company') return false;

  const existingLen = existing.conteudo_completo?.length || 0;
  const newLen = newArticle.conteudo.length;
  const existingScore = getSourceScore(existing.fonte_nome || '');
  const newScore = getSourceScore(newArticle.fonteName);

  // New article is significantly longer (50%+ more content)
  if (newLen > existingLen * 1.5) {
    console.log(`  -> Nova versão é mais completa (${newLen} vs ${existingLen} chars)`);
    return true;
  }

  // New article is from a better source AND at least as long
  if (newScore > existingScore && newLen >= existingLen * 0.8) {
    console.log(`  -> Nova versão é de fonte melhor (${newArticle.fonteName} vs ${existing.fonte_nome})`);
    return true;
  }

  return false;
}

// Verificação simplificada apenas por URL
export async function checkDuplicateByUrl(
  url: string,
  pool: Pool
): Promise<boolean> {
  const result = await pool.query(
    'SELECT id FROM noticias WHERE fonte_url = $1',
    [url]
  );
  return result.rows.length > 0;
}

// Limpar notícias antigas (mais de 30 dias)
export async function cleanOldNews(pool: Pool): Promise<number> {
  const result = await pool.query(`
    DELETE FROM noticias
    WHERE created_at < NOW() - INTERVAL '30 days'
    RETURNING id
  `);

  return result.rowCount || 0;
}
