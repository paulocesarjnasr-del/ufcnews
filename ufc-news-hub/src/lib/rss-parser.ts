import Parser from 'rss-parser';
import { RSSItem } from '@/types';
import { RSS_FEED_URL, NEWS_MAX_AGE_HOURS } from './constants';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
    ],
  },
});

interface RSSFeedItem {
  title?: string;
  contentSnippet?: string;
  content?: string;
  link?: string;
  pubDate?: string;
  enclosure?: {
    url: string;
    type?: string;
    length?: string;
  };
  mediaContent?: {
    $?: {
      url: string;
    };
  };
  mediaThumbnail?: {
    $?: {
      url: string;
    };
  };
}

function extractImageUrl(item: RSSFeedItem): string | undefined {
  // Tentar várias fontes de imagem
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }
  if (item.mediaContent?.$?.url) {
    return item.mediaContent.$.url;
  }
  if (item.mediaThumbnail?.$?.url) {
    return item.mediaThumbnail.$.url;
  }

  // Tentar extrair do content HTML
  if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  return undefined;
}

function decodeHtmlEntities(text: string | undefined): string {
  if (!text) return '';

  let decoded = text;

  // Decodificar entidades numéricas (ex: &#8211; &#124;)
  decoded = decoded.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));

  // Decodificar entidades hexadecimais (ex: &#x2013;)
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  // Decodificar entidades nomeadas comuns
  decoded = decoded
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&hellip;/g, '...');

  return decoded;
}

function cleanDescription(description: string | undefined): string {
  if (!description) return '';

  // Remover tags HTML
  let cleaned = description.replace(/<[^>]*>/g, '');

  // Decodificar entidades HTML
  cleaned = decodeHtmlEntities(cleaned);

  // Remover espaços extras
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

function isWithinMaxAge(pubDate: string): boolean {
  const publishedDate = new Date(pubDate);
  const maxAgeMs = NEWS_MAX_AGE_HOURS * 60 * 60 * 1000;
  const cutoffDate = new Date(Date.now() - maxAgeMs);

  return publishedDate >= cutoffDate;
}

export async function fetchRSSFeed(): Promise<RSSItem[]> {
  try {
    console.log(`Buscando RSS feed: ${RSS_FEED_URL}`);

    const feed = await parser.parseURL(RSS_FEED_URL);

    if (!feed.items || feed.items.length === 0) {
      console.log('Feed RSS vazio');
      return [];
    }

    console.log(`${feed.items.length} itens encontrados no feed`);

    const items: RSSItem[] = [];

    for (const item of feed.items as RSSFeedItem[]) {
      // Pular itens sem informações básicas
      if (!item.title || !item.link || !item.pubDate) {
        continue;
      }

      // Filtrar por idade máxima (opcional - pode remover se quiser todas)
      // if (!isWithinMaxAge(item.pubDate)) {
      //   continue;
      // }

      const imageUrl = extractImageUrl(item);

      items.push({
        title: decodeHtmlEntities(item.title.trim()),
        description: cleanDescription(item.contentSnippet || item.content),
        link: item.link,
        pubDate: item.pubDate,
        enclosure: imageUrl
          ? {
              url: imageUrl,
              type: item.enclosure?.type,
              length: item.enclosure?.length,
            }
          : undefined,
        content: item.content,
        contentSnippet: item.contentSnippet,
      });
    }

    console.log(`${items.length} itens válidos após filtragem`);

    return items;
  } catch (error) {
    console.error('Erro ao buscar RSS feed:', error);
    throw error;
  }
}

export async function testRSSFeed(): Promise<void> {
  try {
    const items = await fetchRSSFeed();
    console.log('\n=== TEST RSS FEED ===\n');
    console.log(`Total de itens: ${items.length}\n`);

    for (const item of items.slice(0, 5)) {
      console.log('---');
      console.log(`Título: ${item.title}`);
      console.log(`Link: ${item.link}`);
      console.log(`Data: ${item.pubDate}`);
      console.log(`Imagem: ${item.enclosure?.url || 'N/A'}`);
      console.log(`Descrição: ${item.description.slice(0, 100)}...`);
    }
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}
