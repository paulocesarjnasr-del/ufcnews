/**
 * Article Content Scraper
 * Fetches full article text from source URLs when RSS feeds don't include content.
 * Each source has a custom extraction strategy based on their HTML structure.
 */

// Timeout for fetch requests (ms)
const FETCH_TIMEOUT = 8000;

// User agent to avoid blocks
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Fetches and extracts article content from a URL.
 * Returns the extracted text, or empty string if extraction fails.
 */
export async function scrapeArticleContent(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.log(`  [scraper] HTTP ${response.status} for ${url}`);
      return '';
    }

    const html = await response.text();
    const content = extractContent(html, url);

    if (content && content.length > 50) {
      console.log(`  [scraper] Extracted ${content.length} chars from ${getDomain(url)}`);
      return content;
    }

    // Fallback: generic extraction
    const fallback = genericExtract(html);
    if (fallback && fallback.length > 50) {
      console.log(`  [scraper] Generic fallback: ${fallback.length} chars from ${getDomain(url)}`);
      return fallback;
    }

    console.log(`  [scraper] No content extracted from ${url}`);
    return '';
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('abort')) {
      console.log(`  [scraper] Timeout for ${url}`);
    } else {
      console.log(`  [scraper] Error: ${msg.slice(0, 100)}`);
    }
    return '';
  }
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Route to source-specific extractor based on URL domain.
 */
function extractContent(html: string, url: string): string {
  const domain = getDomain(url).toLowerCase();

  if (domain.includes('ufc.com')) return extractUFC(html);
  if (domain.includes('mmafighting.com')) return extractMMAFighting(html);
  if (domain.includes('mmamania.com')) return extractMMAMania(html);
  if (domain.includes('espn.com')) return extractESPN(html);
  if (domain.includes('lowkickmma.com')) return extractLowKick(html);
  if (domain.includes('themaclife.com')) return extractMacLife(html);
  if (domain.includes('mmanews.com')) return extractGenericArticle(html);
  if (domain.includes('bloodyelbow.com')) return extractGenericArticle(html);

  return genericExtract(html);
}

// ═══════════════════════════════════════
// SOURCE-SPECIFIC EXTRACTORS
// ═══════════════════════════════════════

/**
 * UFC.com — articles use <div class="c-article-body"> or similar
 */
function extractUFC(html: string): string {
  // Try main article body
  const patterns = [
    /<div[^>]*class="[^"]*c-article-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]*class="(?!c-article-body))/i,
    /<div[^>]*class="[^"]*field--name-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const text = stripHtml(match[1]);
      if (text.length > 100) return text;
    }
  }

  // UFC.com sometimes has content in script as JSON-LD
  const jsonLd = extractFromJsonLd(html);
  if (jsonLd) return jsonLd;

  return '';
}

/**
 * MMA Fighting (Vox Media) — uses <div class="c-entry-content">
 */
function extractMMAFighting(html: string): string {
  const patterns = [
    /<div[^>]*class="[^"]*c-entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<(?:footer|aside|div[^>]*class="[^"]*c-(?:entry-footer|recommended))/i,
    /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<(?:footer|aside)/i,
    /<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const text = stripHtml(match[1]);
      if (text.length > 100) return text;
    }
  }

  return extractFromJsonLd(html) || '';
}

/**
 * MMA Mania (Vox Media) — same structure as MMA Fighting
 */
function extractMMAMania(html: string): string {
  return extractMMAFighting(html);
}

/**
 * ESPN — uses <div class="article-body">
 */
function extractESPN(html: string): string {
  const patterns = [
    /<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<(?:footer|aside|div[^>]*class="[^"]*article-(?:footer|social))/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const text = stripHtml(match[1]);
      if (text.length > 100) return text;
    }
  }

  return extractFromJsonLd(html) || '';
}

/**
 * LowKick MMA — WordPress-based
 */
function extractLowKick(html: string): string {
  return extractGenericArticle(html);
}

/**
 * TheMacLife — WordPress-based
 */
function extractMacLife(html: string): string {
  return extractGenericArticle(html);
}

/**
 * Generic article extractor for WordPress and similar CMS
 */
function extractGenericArticle(html: string): string {
  const patterns = [
    /<div[^>]*class="[^"]*(?:entry-content|post-content|article-content|single-content|td-post-content)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<(?:footer|aside|div[^>]*class="[^"]*(?:related|share|comment|tag|author))/i,
    /<div[^>]*class="[^"]*(?:entry-content|post-content|article-content)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/(?:article|main|section)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const text = stripHtml(match[1]);
      if (text.length > 100) return text;
    }
  }

  return extractFromJsonLd(html) || '';
}

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════

/**
 * Extract article text from JSON-LD structured data (schema.org/Article).
 */
function extractFromJsonLd(html: string): string {
  const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

  for (const m of scriptMatches) {
    try {
      const data = JSON.parse(m[1]);
      // Can be an array or single object
      const items = Array.isArray(data) ? data : [data];

      for (const item of items) {
        // Check @graph array too
        const candidates = item['@graph'] ? [...items, ...item['@graph']] : items;

        for (const candidate of candidates) {
          if (
            candidate['@type'] === 'Article' ||
            candidate['@type'] === 'NewsArticle' ||
            candidate['@type'] === 'WebPage' ||
            (Array.isArray(candidate['@type']) &&
              candidate['@type'].some((t: string) => ['Article', 'NewsArticle'].includes(t)))
          ) {
            const body = candidate.articleBody || candidate.text || candidate.description;
            if (body && typeof body === 'string' && body.length > 100) {
              return body.trim();
            }
          }
        }
      }
    } catch {
      // Invalid JSON-LD, skip
    }
  }

  return '';
}

/**
 * Generic fallback: find the largest block of <p> tags.
 */
function genericExtract(html: string): string {
  // Collect all <p> tag contents
  const paragraphs: string[] = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;

  while ((match = pRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]).trim();
    // Filter out tiny paragraphs (nav items, buttons, etc.)
    if (text.length > 30) {
      paragraphs.push(text);
    }
  }

  if (paragraphs.length === 0) return '';

  // Find the densest cluster of consecutive paragraphs (likely the article body)
  // Simple heuristic: take all paragraphs, join them
  const combined = paragraphs.join('\n\n');

  // Only return if we got a reasonable amount of content
  return combined.length > 100 ? combined : '';
}

/**
 * Strip HTML tags, decode entities, clean whitespace.
 */
function stripHtml(html: string): string {
  let text = html;

  // Remove script/style tags and their content
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Convert <br> and block elements to newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/(?:p|div|h[1-6]|li|blockquote|tr)>/gi, '\n\n');
  text = text.replace(/<(?:hr)\s*\/?>/gi, '\n---\n');

  // Convert <a> to just text (keep link text)
  text = text.replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1');

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '...')
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D");

  // Decode numeric entities
  text = text.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  // Clean excessive whitespace
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}
