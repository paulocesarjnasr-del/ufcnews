import * as cheerio from 'cheerio';

interface ScrapedResult {
  lutador1_nome: string;
  lutador2_nome: string;
  vencedor_nome: string;
  metodo: string;
  round: number | null;
  tempo: string | null;
}

export async function scrapeUFCResults(eventName: string): Promise<ScrapedResult[]> {
  const results: ScrapedResult[] = [];

  try {
    // Try Google Sports Card first
    const searchQuery = encodeURIComponent(`${eventName} results`);
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;

    const response = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      console.warn('[scrape-results] Google fetch failed:', response.status);
      return await scrapeESPNResults(eventName);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Parse Google sports card results
    // Google shows UFC results in structured cards
    $('[data-attrid="sport_event"] .imspo_sr__scr, .imspo_mt__mtl-sc').each((_, el) => {
      try {
        const fighters = $(el).find('.imspo_mt__t-sc, .imspo_mt__tm-nm');
        if (fighters.length >= 2) {
          const fighter1 = $(fighters[0]).text().trim();
          const fighter2 = $(fighters[1]).text().trim();

          // Check for winner indicator
          const winIndicator = $(el).find('.imspo_mt__t-sc--w, .imspo_mt__wn-i');
          let vencedor = '';
          if (winIndicator.length > 0) {
            vencedor = winIndicator.closest('.imspo_mt__t-sc, .imspo_mt__tm').find('.imspo_mt__tm-nm').text().trim() || fighter1;
          }

          const methodText = $(el).find('.imspo_mt__rsl-sm, .imspo_mt__mtd').text().trim();
          const roundText = $(el).find('.imspo_mt__rnd').text().trim();

          if (fighter1 && fighter2 && vencedor) {
            results.push({
              lutador1_nome: fighter1,
              lutador2_nome: fighter2,
              vencedor_nome: vencedor,
              metodo: methodText || 'Unknown',
              round: roundText ? parseInt(roundText.replace(/\D/g, ''), 10) || null : null,
              tempo: null,
            });
          }
        }
      } catch {
        // Skip malformed entries
      }
    });

    if (results.length === 0) {
      return await scrapeESPNResults(eventName);
    }
  } catch (error) {
    console.error('[scrape-results] Error scraping Google:', error);
    return await scrapeESPNResults(eventName);
  }

  return results;
}

async function scrapeESPNResults(eventName: string): Promise<ScrapedResult[]> {
  const results: ScrapedResult[] = [];

  try {
    const searchQuery = encodeURIComponent(`${eventName} site:espn.com UFC results`);
    const response = await fetch(`https://www.google.com/search?q=${searchQuery}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    if (!response.ok) return results;

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract ESPN URL from Google results
    const espnLink = $('a[href*="espn.com/mma"]').first().attr('href');
    if (!espnLink) return results;

    // Clean Google redirect URL
    const espnUrl = espnLink.startsWith('/url?')
      ? new URL(`https://google.com${espnLink}`).searchParams.get('q') || espnLink
      : espnLink;

    if (!espnUrl.startsWith('http')) return results;

    const espnResponse = await fetch(espnUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    if (!espnResponse.ok) return results;

    const espnHtml = await espnResponse.text();
    const espn$ = cheerio.load(espnHtml);

    // Parse ESPN fight results table
    espn$('.Table__TBODY tr, .fight-result').each((_, el) => {
      try {
        const cells = espn$(el).find('td');
        if (cells.length >= 4) {
          const winner = espn$(cells[0]).text().trim();
          const loser = espn$(cells[1]).text().trim();
          const method = espn$(cells[2]).text().trim();
          const round = espn$(cells[3]).text().trim();

          if (winner && loser) {
            results.push({
              lutador1_nome: winner,
              lutador2_nome: loser,
              vencedor_nome: winner,
              metodo: method || 'Unknown',
              round: parseInt(round, 10) || null,
              tempo: null,
            });
          }
        }
      } catch {
        // Skip
      }
    });
  } catch (error) {
    console.error('[scrape-results] Error scraping ESPN:', error);
  }

  return results;
}

/**
 * Maps a scraped method string to the DB enum value
 */
export function mapMethodToDB(method: string): string | null {
  const lower = method.toLowerCase();

  if (lower.includes('ko') || lower.includes('tko') || lower.includes('knockout')) {
    return 'KO/TKO';
  }
  if (lower.includes('sub') || lower.includes('submission') || lower.includes('choke') || lower.includes('lock') || lower.includes('bar')) {
    return 'Submission';
  }
  if (lower.includes('unanimous') || lower.includes('unan')) {
    return 'Decision - Unanimous';
  }
  if (lower.includes('split')) {
    return 'Decision - Split';
  }
  if (lower.includes('majority')) {
    return 'Decision - Majority';
  }
  if (lower.includes('decision') || lower.includes('dec')) {
    return 'Decision - Unanimous'; // Default decision type
  }
  if (lower.includes('dq') || lower.includes('disqualification')) {
    return 'DQ';
  }
  if (lower.includes('no contest') || lower.includes('nc')) {
    return 'No Contest';
  }
  if (lower.includes('draw')) {
    return 'Draw';
  }

  return null;
}

/**
 * Fuzzy name matching - handles "Adesanya" matching "Israel Adesanya"
 */
export function matchFighterName(scraped: string, dbName: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const scrapedNorm = normalize(scraped);
  const dbNorm = normalize(dbName);

  // Exact match
  if (scrapedNorm === dbNorm) return true;

  // Last name match
  const scrapedParts = scrapedNorm.split(/\s+/);
  const dbParts = dbNorm.split(/\s+/);
  const scrapedLast = scrapedParts[scrapedParts.length - 1];
  const dbLast = dbParts[dbParts.length - 1];

  if (scrapedLast === dbLast && scrapedLast.length > 3) return true;

  // Contains match
  if (dbNorm.includes(scrapedNorm) || scrapedNorm.includes(dbNorm)) return true;

  return false;
}
