import * as cheerio from 'cheerio';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

export interface ScrapedResult {
  lutador1_nome: string;
  lutador2_nome: string;
  vencedor_nome: string;
  metodo: string;
  round: number | null;
  tempo: string | null;
}

interface UFCLiveFighter {
  FighterId: number;
  Name: { FirstName: string; LastName: string; NickName: string | null };
  Corner: string;
  Outcome: { OutcomeId: number | null; Outcome: string | null };
}

interface UFCLiveFight {
  FightId: number;
  FightOrder: number;
  Status: string;
  Fighters: UFCLiveFighter[];
  Result: {
    Method: string;
    EndingRound: number;
    EndingTime: string;
    EndingStrike: string | null;
    EndingTarget: string | null;
    EndingPosition: string | null;
    EndingSubmission: string | null;
  } | null;
}

interface UFCLiveEvent {
  LiveEventDetail: {
    EventId: number;
    Status: string;
    FightCard: UFCLiveFight[];
  };
}

// ═══════════════════════════════════════════════════════════════
// Primary: UFC Live Stats API (real-time, official source)
// ═══════════════════════════════════════════════════════════════

async function scrapeUFCLiveAPI(eventFmid: string): Promise<ScrapedResult[]> {
  const results: ScrapedResult[] = [];
  const url = `https://d29dxerjsp82wz.cloudfront.net/api/v3/event/live/${eventFmid}.json`;

  console.info(`[scrape-results] Fetching UFC Live API: ${url}`);

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    console.warn(`[scrape-results] UFC Live API returned ${response.status}`);
    return results;
  }

  const data = await response.json() as UFCLiveEvent;

  const fightCard = data.LiveEventDetail?.FightCard;
  if (!fightCard || fightCard.length === 0) {
    console.warn('[scrape-results] No FightCard in response');
    return results;
  }

  for (const fight of fightCard) {
    // Only process completed fights
    if (fight.Status !== 'Final' && fight.Status !== 'Completed') continue;
    if (!fight.Result || fight.Fighters.length < 2) continue;

    const winner = fight.Fighters.find(f => f.Outcome?.Outcome === 'Win');
    if (!winner) continue;

    const f1Name = `${fight.Fighters[0].Name.FirstName} ${fight.Fighters[0].Name.LastName}`.trim();
    const f2Name = `${fight.Fighters[1].Name.FirstName} ${fight.Fighters[1].Name.LastName}`.trim();
    const winnerName = `${winner.Name.FirstName} ${winner.Name.LastName}`.trim();

    results.push({
      lutador1_nome: f1Name,
      lutador2_nome: f2Name,
      vencedor_nome: winnerName,
      metodo: fight.Result.Method || 'Unknown',
      round: fight.Result.EndingRound || null,
      tempo: fight.Result.EndingTime || null,
    });
  }

  console.info(`[scrape-results] UFC Live API: ${results.length} results found`);
  return results;
}

// ═══════════════════════════════════════════════════════════════
// Get event_fmid from UFC.com event page
// ═══════════════════════════════════════════════════════════════

async function getEventFmid(eventSlug: string): Promise<string | null> {
  try {
    const url = `https://www.ufc.com/event/${eventSlug}`;
    console.info(`[scrape-results] Fetching event page: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;

    const html = await response.text();
    // Extract event_fmid from drupal-settings-json
    const match = html.match(/"event_fmid"\s*:\s*"(\d+)"/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('[scrape-results] Error getting event fmid:', error);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// Build UFC.com slug from event name
// ═══════════════════════════════════════════════════════════════

export function buildUFCSlug(eventName: string): string {
  // "UFC FIGHT NIGHT: EMMETT VS VALLEJOS" → try common patterns
  const name = eventName.toLowerCase();

  // Extract date-based slug if possible
  // UFC.com uses: ufc-fight-night-march-14-2026, ufc-312, etc.
  if (name.includes('fight night')) {
    // Try to build from fighters: "ufc-fight-night-march-DD-YYYY"
    // This needs the event date, so we fall back to search
    return '';
  }

  // For numbered events: "UFC 312" → "ufc-312"
  const numbered = name.match(/ufc\s+(\d+)/);
  if (numbered) {
    return `ufc-${numbered[1]}`;
  }

  return '';
}

// ═══════════════════════════════════════════════════════════════
// Fallback: Google Sports Card scraper
// ═══════════════════════════════════════════════════════════════

async function scrapeGoogleSportsCard(eventName: string): Promise<ScrapedResult[]> {
  const results: ScrapedResult[] = [];

  try {
    const searchQuery = encodeURIComponent(`${eventName} results`);
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;

    const response = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return results;

    const html = await response.text();
    const $ = cheerio.load(html);

    // Google Sports Card selectors (may change)
    $('[data-attrid="sport_event"] .imspo_sr__scr, .imspo_mt__mtl-sc').each((_, el) => {
      try {
        const fighters = $(el).find('.imspo_mt__t-sc, .imspo_mt__tm-nm');
        if (fighters.length >= 2) {
          const fighter1 = $(fighters[0]).text().trim();
          const fighter2 = $(fighters[1]).text().trim();

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
  } catch (error) {
    console.error('[scrape-results] Error scraping Google:', error);
  }

  return results;
}

// ═══════════════════════════════════════════════════════════════
// Main entry: tries UFC Live API first, falls back to Google
// ═══════════════════════════════════════════════════════════════

export async function scrapeUFCResults(
  eventName: string,
  options?: { eventFmid?: string; eventSlug?: string }
): Promise<ScrapedResult[]> {
  // 1. Try UFC Live API if we have the fmid
  let fmid = options?.eventFmid;

  if (!fmid && options?.eventSlug) {
    fmid = await getEventFmid(options.eventSlug) ?? undefined;
  }

  if (fmid) {
    try {
      const liveResults = await scrapeUFCLiveAPI(fmid);
      if (liveResults.length > 0) return liveResults;
    } catch (error) {
      console.error('[scrape-results] UFC Live API error:', error);
    }
  }

  // 2. Fallback: Google Sports Card
  console.info('[scrape-results] Falling back to Google Sports Card');
  return scrapeGoogleSportsCard(eventName);
}

// ═══════════════════════════════════════════════════════════════
// Utilities (kept for compatibility)
// ═══════════════════════════════════════════════════════════════

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
    return 'Decision - Unanimous';
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

  if (scrapedNorm === dbNorm) return true;

  const scrapedParts = scrapedNorm.split(/\s+/);
  const dbParts = dbNorm.split(/\s+/);
  const scrapedLast = scrapedParts[scrapedParts.length - 1];
  const dbLast = dbParts[dbParts.length - 1];

  if (scrapedLast === dbLast && scrapedLast.length > 3) return true;

  if (dbNorm.includes(scrapedNorm) || scrapedNorm.includes(dbNorm)) return true;

  return false;
}
