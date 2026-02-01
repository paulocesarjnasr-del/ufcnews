import crypto from 'crypto';
import { Pool } from 'pg';
import { DeduplicationResult } from '@/types';

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, '') // Remove pontuação
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
}

// Extract key words from title (nouns, names, etc.)
function extractKeyWords(title: string): string[] {
  const normalized = normalizeTitle(title);
  // Remove common stop words
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

// Calculate similarity between two titles (0-1)
function calculateSimilarity(title1: string, title2: string): number {
  const words1 = new Set(extractKeyWords(title1));
  const words2 = new Set(extractKeyWords(title2));

  if (words1.size === 0 || words2.size === 0) return 0;

  // Jaccard similarity
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

export function generateHash(title: string): string {
  const normalized = normalizeTitle(title);
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

export async function checkDuplicate(
  titulo: string,
  lutadoresMencionados: string[],
  pool: Pool
): Promise<DeduplicationResult> {
  const hash = generateHash(titulo);

  // 1. Verificar hash exato
  const hashCheck = await pool.query(
    'SELECT id FROM noticias WHERE hash_deduplicacao = $1',
    [hash]
  );

  if (hashCheck.rows.length > 0) {
    return { isDuplicate: true, reason: 'hash_exato', hash };
  }

  // 2. Verificar similaridade de título nas últimas 24h
  // Busca títulos recentes e compara similaridade
  const recentTitles = await pool.query<{ id: string; titulo: string }>(
    `SELECT id, titulo FROM noticias
     WHERE created_at > NOW() - INTERVAL '24 hours'
     ORDER BY created_at DESC
     LIMIT 100`
  );

  for (const row of recentTitles.rows) {
    const similarity = calculateSimilarity(titulo, row.titulo);
    // Se similaridade > 70%, é provavelmente a mesma notícia
    if (similarity > 0.70) {
      console.log(`Notícia similar encontrada (${(similarity * 100).toFixed(0)}%): "${row.titulo.substring(0, 50)}..."`);
      return { isDuplicate: true, reason: 'titulo_similar', hash };
    }
  }

  // 3. Verificar mesmo evento (mesmos lutadores nas últimas 24h com título similar)
  if (lutadoresMencionados.length >= 2) {
    const recentCheck = await pool.query<{ id: string; titulo: string }>(
      `SELECT DISTINCT n.id, n.titulo
       FROM noticias n
       JOIN noticia_entidades ne ON n.id = ne.noticia_id
       JOIN lutadores l ON ne.lutador_id = l.id
       WHERE LOWER(l.nome) = ANY($1::text[])
       AND n.created_at > NOW() - INTERVAL '24 hours'
       GROUP BY n.id, n.titulo
       HAVING COUNT(DISTINCT l.id) >= 2`,
      [lutadoresMencionados.map((n) => n.toLowerCase())]
    );

    // Se encontrou notícia com mesmos 2+ lutadores, verificar similaridade
    for (const row of recentCheck.rows) {
      const similarity = calculateSimilarity(titulo, row.titulo);
      // Para mesmos lutadores, threshold menor (50%)
      if (similarity > 0.50) {
        console.log(`Notícia sobre mesmos lutadores encontrada (${(similarity * 100).toFixed(0)}%): "${row.titulo.substring(0, 50)}..."`);
        return { isDuplicate: true, reason: 'mesmo_evento', hash };
      }
    }
  }

  return { isDuplicate: false, hash };
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
