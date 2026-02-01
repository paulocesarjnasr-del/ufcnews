/**
 * Script de Seed para Notícias Históricas
 *
 * Este script popula o banco de dados com notícias de múltiplas fontes RSS.
 * Use antes de ir para produção para garantir que novos usuários tenham conteúdo.
 *
 * Como executar:
 *   npx tsx scripts/seed-noticias.ts
 *
 * Ou adicione ao package.json:
 *   "seed:noticias": "tsx scripts/seed-noticias.ts"
 */

import { Pool } from 'pg';
import Parser from 'rss-parser';
import * as crypto from 'crypto';

// Configuração
const DATABASE_URL = process.env.DATABASE_URL;
const RSS_FEED_URLS = [
  'https://www.mmamania.com/rss/current.xml',
  'https://www.mmafighting.com/rss/current.xml',
  'https://www.bloodyelbow.com/rss/current.xml',
];

// Palavras-chave para classificação
const UFC_KEYWORDS = [
  'ufc', 'dana white', 'octagon', 'mma', 'mixed martial arts',
  'bellator', 'pfl', 'one championship', 'fighter', 'bout',
  'knockout', 'submission', 'decision', 'title fight', 'championship',
  'weigh-in', 'fight night', 'ppv', 'pay-per-view',
];

const CATEGORIA_KEYWORDS: Record<string, string[]> = {
  lutas: ['fight', 'bout', 'vs', 'matchup', 'title', 'championship', 'weigh-in', 'card', 'event'],
  backstage: ['contract', 'signed', 'released', 'dana', 'manager', 'negotiation', 'drama', 'interview', 'podcast'],
  lutadores: ['fighter', 'champion', 'contender', 'ranked', 'injury', 'training', 'camp'],
};

if (!DATABASE_URL) {
  console.error('DATABASE_URL não configurada!');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
    ],
  },
});

interface RSSItem {
  title?: string;
  contentSnippet?: string;
  content?: string;
  link?: string;
  pubDate?: string;
  enclosure?: { url: string };
  mediaContent?: { $?: { url: string } };
  mediaThumbnail?: { $?: { url: string } };
}

function extractImageUrl(item: RSSItem): string | null {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.mediaContent?.$?.url) return item.mediaContent.$.url;
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;
  return null;
}

function isUFCRelated(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return UFC_KEYWORDS.some(keyword => text.includes(keyword));
}

function classifyNews(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  for (const [categoria, keywords] of Object.entries(CATEGORIA_KEYWORDS)) {
    const matches = keywords.filter(kw => text.includes(kw)).length;
    if (matches >= 2) return categoria;
  }

  // Fallback baseado em palavras-chave únicas
  if (text.includes('vs') || text.includes('fight') || text.includes('bout')) return 'lutas';
  if (text.includes('dana') || text.includes('contract') || text.includes('signed')) return 'backstage';

  return 'lutadores'; // Default
}

function generateHash(title: string): string {
  const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 32);
}

function cleanText(text: string | undefined): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function checkExists(fonteUrl: string): Promise<boolean> {
  const result = await pool.query(
    'SELECT 1 FROM noticias WHERE fonte_url = $1 LIMIT 1',
    [fonteUrl]
  );
  return result.rows.length > 0;
}

async function saveNoticia(data: {
  titulo: string;
  subtitulo: string;
  conteudo_completo: string;
  imagem_url: string | null;
  fonte_url: string;
  fonte_nome: string;
  categoria: string;
  hash_deduplicacao: string;
  publicado_em: Date;
}): Promise<boolean> {
  try {
    await pool.query(
      `INSERT INTO noticias (
        titulo, subtitulo, conteudo_completo, imagem_url,
        fonte_url, fonte_nome, categoria, hash_deduplicacao, publicado_em
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (fonte_url) DO NOTHING`,
      [
        data.titulo,
        data.subtitulo,
        data.conteudo_completo,
        data.imagem_url,
        data.fonte_url,
        data.fonte_nome,
        data.categoria,
        data.hash_deduplicacao,
        data.publicado_em,
      ]
    );
    return true;
  } catch (error) {
    // Ignorar erros de duplicação
    return false;
  }
}

function getFonteName(feedUrl: string): string {
  if (feedUrl.includes('mmamania')) return 'MMAMania';
  if (feedUrl.includes('mmafighting')) return 'MMA Fighting';
  if (feedUrl.includes('bloodyelbow')) return 'Bloody Elbow';
  if (feedUrl.includes('mmanews')) return 'MMA News';
  return 'Unknown';
}

async function seedFromFeed(feedUrl: string): Promise<{ added: number; skipped: number; rejected: number }> {
  let added = 0;
  let skipped = 0;
  let rejected = 0;

  try {
    console.log(`\n📡 Buscando: ${feedUrl}`);
    const feed = await parser.parseURL(feedUrl);
    const fonteName = getFonteName(feedUrl);

    console.log(`   ${feed.items?.length || 0} itens encontrados`);

    for (const item of (feed.items || []) as RSSItem[]) {
      if (!item.title || !item.link || !item.pubDate) {
        continue;
      }

      const title = cleanText(item.title);
      const description = cleanText(item.contentSnippet || item.content);

      // Verificar se já existe
      const exists = await checkExists(item.link);
      if (exists) {
        skipped++;
        continue;
      }

      // Verificar se é relacionado a UFC/MMA
      if (!isUFCRelated(title, description)) {
        rejected++;
        continue;
      }

      // Classificar e salvar
      const categoria = classifyNews(title, description);
      const hash = generateHash(title);
      const imageUrl = extractImageUrl(item);

      const saved = await saveNoticia({
        titulo: title.substring(0, 500),
        subtitulo: description.substring(0, 200),
        conteudo_completo: description,
        imagem_url: imageUrl,
        fonte_url: item.link,
        fonte_nome: fonteName,
        categoria,
        hash_deduplicacao: hash,
        publicado_em: new Date(item.pubDate),
      });

      if (saved) {
        added++;
        if (added % 10 === 0) {
          console.log(`   ✅ ${added} notícias adicionadas...`);
        }
      }
    }

    console.log(`   Resultado: +${added} novas, ${skipped} duplicadas, ${rejected} rejeitadas`);

  } catch (error) {
    console.error(`   ❌ Erro ao processar ${feedUrl}:`, error);
  }

  return { added, skipped, rejected };
}

async function main() {
  console.log('🚀 SEED DE NOTÍCIAS HISTÓRICAS');
  console.log('================================\n');

  // Verificar contagem atual
  const countResult = await pool.query('SELECT COUNT(*) FROM noticias');
  const currentCount = parseInt(countResult.rows[0].count);
  console.log(`📊 Notícias atuais no banco: ${currentCount}`);

  let totalAdded = 0;
  let totalSkipped = 0;
  let totalRejected = 0;

  for (const feedUrl of RSS_FEED_URLS) {
    const result = await seedFromFeed(feedUrl);
    totalAdded += result.added;
    totalSkipped += result.skipped;
    totalRejected += result.rejected;
  }

  // Contagem final
  const finalResult = await pool.query('SELECT COUNT(*) FROM noticias');
  const finalCount = parseInt(finalResult.rows[0].count);

  console.log('\n================================');
  console.log('📈 RESUMO DO SEED');
  console.log('================================');
  console.log(`✅ Notícias adicionadas: ${totalAdded}`);
  console.log(`⏭️  Duplicadas ignoradas: ${totalSkipped}`);
  console.log(`❌ Rejeitadas (não UFC): ${totalRejected}`);
  console.log(`📊 Total no banco agora: ${finalCount}`);
  console.log('================================\n');

  await pool.end();
  process.exit(0);
}

main().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
