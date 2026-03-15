import * as cheerio from 'cheerio';
import type { Element } from 'domhandler';

// ═══════════════════════════════════════════════════════════════════════════════
// INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export interface UFCFighterStats {
  name: string;
  nickname: string | null;
  record: string;
  height: string | null;
  weight: string | null;
  reach: string | null;
  stance: string | null;
  dob: string | null;
  slpm: number | null;       // Sig. Strikes Landed per Min
  strAcc: number | null;     // Striking Accuracy %
  sapm: number | null;       // Sig. Strikes Absorbed per Min
  strDef: number | null;     // Strike Defense %
  tdAvg: number | null;      // TD Average per 15min
  tdAcc: number | null;      // TD Accuracy %
  tdDef: number | null;      // TD Defense %
  subAvg: number | null;     // Sub Attempts per 15min
  ufcstatsUrl: string;
}

/** "X of Y" stat pair — landed and attempted */
export interface StrikePair {
  landed: number;
  attempted: number;
}

/** Stats for a single round (or aggregated totals) */
export interface FightRoundStats {
  round: number;              // 0 = totals, 1-5 = per round
  kd: number;
  sigStr: StrikePair;
  sigStrPct: number;
  totalStr: StrikePair;
  td: StrikePair;
  tdPct: number;
  subAtt: number;
  rev: number;
  ctrlTimeSec: number;        // Control time in seconds
  // Sig strikes by target
  head: StrikePair;
  body: StrikePair;
  leg: StrikePair;
  // Sig strikes by position
  distance: StrikePair;
  clinch: StrikePair;
  ground: StrikePair;
}

/** Complete stats from one fight detail page */
export interface FightDetailStats {
  fightUrl: string;
  eventName: string;
  eventDate: string;
  opponent: string;
  opponentUrl: string;
  result: 'W' | 'L' | 'D' | 'NC';
  method: string;             // "KO/TKO", "SUB", "U-DEC", "S-DEC", "M-DEC"
  roundFinished: number;
  timeFinished: string;       // "5:00", "2:30", etc.
  weightClass: string;
  totals: FightRoundStats;
  rounds: FightRoundStats[];
}

/** Full fighter profile with career stats + fight-by-fight history */
export interface EnhancedFighterProfile extends UFCFighterStats {
  fightHistory: FightDetailStats[];
  totalUfcFights: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARSING HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function parseNumber(text: string): number | null {
  const cleaned = text.replace('%', '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/** Parse "52 of 100" → { landed: 52, attempted: 100 } */
function parseStrikePair(text: string): StrikePair {
  const cleaned = cleanText(text);
  const match = cleaned.match(/(\d+)\s+of\s+(\d+)/);
  if (match) return { landed: parseInt(match[1]), attempted: parseInt(match[2]) };
  // Fallback for plain number
  const num = parseInt(cleaned);
  return { landed: isNaN(num) ? 0 : num, attempted: isNaN(num) ? 0 : num };
}

/** Parse "2:30" or "7:20" → seconds */
function parseCtrlTime(text: string): number {
  const cleaned = cleanText(text);
  if (cleaned === '---' || cleaned === '--' || !cleaned) return 0;
  const match = cleaned.match(/(\d+):(\d+)/);
  if (match) return parseInt(match[1]) * 60 + parseInt(match[2]);
  return 0;
}

/** Parse percentage "47%" → 47 */
function parsePct(text: string): number {
  const cleaned = cleanText(text).replace('%', '');
  if (cleaned === '---' || cleaned === '--' || !cleaned) return 0;
  const num = parseInt(cleaned);
  return isNaN(num) ? 0 : num;
}

/** Parse result text from flag element */
function parseResult(text: string): 'W' | 'L' | 'D' | 'NC' {
  const lower = cleanText(text).toLowerCase();
  if (lower.includes('win')) return 'W';
  if (lower.includes('loss')) return 'L';
  if (lower.includes('draw')) return 'D';
  if (lower.includes('nc') || lower.includes('no contest')) return 'NC';
  return 'L';
}

/** Small delay to avoid hammering UFCStats */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Create empty round stats (used as default/fallback) */
function emptyRoundStats(round: number): FightRoundStats {
  const zero: StrikePair = { landed: 0, attempted: 0 };
  return {
    round,
    kd: 0,
    sigStr: { ...zero },
    sigStrPct: 0,
    totalStr: { ...zero },
    td: { ...zero },
    tdPct: 0,
    subAtt: 0,
    rev: 0,
    ctrlTimeSec: 0,
    head: { ...zero },
    body: { ...zero },
    leg: { ...zero },
    distance: { ...zero },
    clinch: { ...zero },
    ground: { ...zero },
  };
}

/**
 * Search for a fighter on ufcstats.com and return their detail page URL
 */
export async function searchFighter(name: string): Promise<string | null> {
  // Search by last name for better results
  const parts = name.trim().split(' ');
  const searchQuery = parts.length > 1 ? parts[parts.length - 1] : parts[0];

  const url = `http://www.ufcstats.com/statistics/fighters/search?query=${encodeURIComponent(searchQuery)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Find all fighter links and match by full name
    const normalizedName = name.toLowerCase().trim();
    let matchUrl: string | null = null;

    // Parse the table — fighters are in rows with 3 columns: First, Last, Nickname
    const rows = $('tr.b-statistics__table-row');
    rows.each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length >= 3) {
        const firstName = cleanText($(cols[0]).text()).toLowerCase();
        const lastName = cleanText($(cols[1]).text()).toLowerCase();
        const fullName = `${firstName} ${lastName}`;

        if (fullName === normalizedName) {
          const link = $(cols[0]).find('a').attr('href');
          if (link) matchUrl = link;
        }
      }
    });

    return matchUrl;
  } catch (error) {
    console.error(`Error searching fighter "${name}":`, error);
    return null;
  }
}

/**
 * Scrape fighter stats from their ufcstats.com detail page
 */
export async function scrapeFighterStats(detailUrl: string): Promise<UFCFighterStats | null> {
  try {
    const res = await fetch(detailUrl, { next: { revalidate: 86400 } });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Name
    const name = cleanText($('.b-content__title-highlight').text());

    // Nickname
    const nicknameEl = $('.b-content__Nickname');
    const nickname = nicknameEl.length ? cleanText(nicknameEl.text()).replace(/"/g, '') : null;

    // Record
    const recordEl = $('.b-content__title-record');
    const recordText = cleanText(recordEl.text());
    const record = recordText.replace('Record:', '').trim();

    // Bio info box (height, weight, reach, stance, DOB)
    const bioItems = $('.b-list__info-box_style_small-width .b-list__box-list-item');
    let height: string | null = null;
    let weight: string | null = null;
    let reach: string | null = null;
    let stance: string | null = null;
    let dob: string | null = null;

    bioItems.each((_, item) => {
      const label = cleanText($(item).find('i').text()).toLowerCase();
      // Get text content excluding the <i> element
      const value = cleanText($(item).clone().children().remove().end().text());

      if (label.includes('height')) height = value || null;
      else if (label.includes('weight')) weight = value || null;
      else if (label.includes('reach')) reach = value || null;
      else if (label.includes('stance')) stance = value || null;
      else if (label.includes('dob')) dob = value || null;
    });

    // Career statistics
    const statItems = $('.b-list__info-box_style_middle-width .b-list__box-list-item');
    let slpm: number | null = null;
    let strAcc: number | null = null;
    let sapm: number | null = null;
    let strDef: number | null = null;
    let tdAvg: number | null = null;
    let tdAcc: number | null = null;
    let tdDef: number | null = null;
    let subAvg: number | null = null;

    statItems.each((_, item) => {
      const label = cleanText($(item).find('i').text()).toLowerCase();
      const value = cleanText($(item).clone().children().remove().end().text());

      if (label.includes('slpm')) slpm = parseNumber(value);
      else if (label.includes('str. acc')) strAcc = parseNumber(value);
      else if (label.includes('sapm')) sapm = parseNumber(value);
      else if (label.includes('str. def')) strDef = parseNumber(value);
      else if (label.includes('td avg')) tdAvg = parseNumber(value);
      else if (label.includes('td acc')) tdAcc = parseNumber(value);
      else if (label.includes('td def')) tdDef = parseNumber(value);
      else if (label.includes('sub. avg')) subAvg = parseNumber(value);
    });

    return {
      name: name || 'Unknown',
      nickname: nickname || null,
      record,
      height,
      weight,
      reach,
      stance,
      dob,
      slpm,
      strAcc,
      sapm,
      strDef,
      tdAvg,
      tdAcc,
      tdDef,
      subAvg,
      ufcstatsUrl: detailUrl,
    };
  } catch (error) {
    console.error(`Error scraping fighter stats from ${detailUrl}:`, error);
    return null;
  }
}

/**
 * Search and scrape a fighter by name in one call
 */
export async function getFighterStatsByName(name: string): Promise<UFCFighterStats | null> {
  const url = await searchFighter(name);
  if (!url) {
    console.error(`Fighter not found: "${name}"`);
    return null;
  }
  return scrapeFighterStats(url);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENHANCED SCRAPER — Fight-by-fight history with round-by-round detail
// ═══════════════════════════════════════════════════════════════════════════════

interface FightHistoryRow {
  fightUrl: string;
  result: 'W' | 'L' | 'D' | 'NC';
  opponent: string;
  opponentUrl: string;
  eventName: string;
  eventDate: string;
  method: string;
  roundFinished: number;
  timeFinished: string;
  // Basic stats from the fighter page table (not detailed)
  kd: number;
  str: number;
  td: number;
  sub: number;
}

/**
 * Extract fight history rows from a fighter's page HTML.
 * Each row contains a link to the fight detail page.
 */
function parseFightHistoryFromFighterPage(
  $: cheerio.CheerioAPI,
  fighterName: string
): FightHistoryRow[] {
  const rows: FightHistoryRow[] = [];

  $('tr.b-fight-details__table-row.js-fight-details-click').each((_, row) => {
    try {
      const fightUrl = $(row).attr('data-link') || '';
      if (!fightUrl) return;

      const cols = $(row).find('td.b-fight-details__table-col');
      if (cols.length < 10) return;

      // Col 0: W/L flag
      const flagText = $(cols[0]).find('.b-flag__text').text();
      const result = parseResult(flagText);

      // Col 1: Fighter names (2 <p> elements — our fighter + opponent)
      const fighterLinks = $(cols[1]).find('a.b-link');
      let opponent = '';
      let opponentUrl = '';
      const normalizedName = fighterName.toLowerCase().trim();
      fighterLinks.each((_, link) => {
        const name = cleanText($(link).text()).toLowerCase();
        if (name !== normalizedName) {
          opponent = cleanText($(link).text());
          opponentUrl = $(link).attr('href') || '';
        }
      });

      // Col 2: KD (2 values — ours is the first <p> that matches our fighter position)
      // Since our fighter is always listed first in these rows, first <p> = ours
      const kdTexts = $(cols[2]).find('p').map((_, p) => cleanText($(p).text())).get();
      const kd = parseInt(kdTexts[0]) || 0;

      // Col 3: Str
      const strTexts = $(cols[3]).find('p').map((_, p) => cleanText($(p).text())).get();
      const str = parseInt(strTexts[0]) || 0;

      // Col 4: TD
      const tdTexts = $(cols[4]).find('p').map((_, p) => cleanText($(p).text())).get();
      const td = parseInt(tdTexts[0]) || 0;

      // Col 5: Sub
      const subTexts = $(cols[5]).find('p').map((_, p) => cleanText($(p).text())).get();
      const sub = parseInt(subTexts[0]) || 0;

      // Col 6: Event (name + date in 2 <p> elements)
      const eventPs = $(cols[6]).find('p');
      const eventName = cleanText($(eventPs[0]).text());
      const eventDate = cleanText($(eventPs[1]).text());

      // Col 7: Method
      const method = cleanText($(cols[7]).find('p').first().text());

      // Col 8: Round
      const roundFinished = parseInt(cleanText($(cols[8]).text())) || 0;

      // Col 9: Time
      const timeFinished = cleanText($(cols[9]).text());

      rows.push({
        fightUrl,
        result,
        opponent,
        opponentUrl,
        eventName,
        eventDate,
        method,
        roundFinished,
        timeFinished,
        kd,
        str,
        td,
        sub,
      });
    } catch (err) {
      console.warn(`[SCRAPER] Failed to parse fight row:`, err);
    }
  });

  return rows;
}

/**
 * Scrape a single fight detail page and extract stats for a specific fighter.
 *
 * The page has 4 data sections:
 *   1. Totals (1 row: both fighters' total stats)
 *   2. Per-round Totals (1 row per round)
 *   3. Significant Strikes totals (1 row: head/body/leg/distance/clinch/ground)
 *   4. Per-round Significant Strikes (1 row per round)
 *
 * In each row, each <td> has 2 <p> elements:
 *   - First <p> = fighter listed first (check name)
 *   - Second <p> = fighter listed second
 */
export async function scrapeFightDetailPage(
  fightUrl: string,
  fighterName: string
): Promise<{ totals: FightRoundStats; rounds: FightRoundStats[] } | null> {
  try {
    const res = await fetch(fightUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);

    // Determine which position our fighter is in (0 = first <p>, 1 = second <p>)
    let fighterIdx = 0;

    // Find the Totals table (it's the first <table> after the "Totals" label)
    const allTables = $('table');
    if (allTables.length === 0) return null;

    // Detect fighter position from first table's fighter column
    const firstRow = $(allTables[0]).find('tbody tr.b-fight-details__table-row').first();
    const firstColLinks = firstRow.find('td').first().find('a');
    const normalizedName = fighterName.toLowerCase().trim();
    firstColLinks.each((idx, link) => {
      if (cleanText($(link).text()).toLowerCase().includes(normalizedName) ||
          normalizedName.includes(cleanText($(link).text()).toLowerCase())) {
        fighterIdx = idx;
      }
    });

    // Helper: extract <p> values from a row of <td> elements at our fighter's position
    const extractRowValues = (row: cheerio.Cheerio<Element>): string[] => {
      const values: string[] = [];
      row.find('td.b-fight-details__table-col').each((_, td) => {
        const ps = $(td).find('p.b-fight-details__table-text');
        values.push(cleanText($(ps[fighterIdx]).text()));
      });
      return values;
    };

    // ─── Parse Totals table (table 0) ───
    // Columns: Fighter, KD, Sig.str., Sig.str.%, Total str., Td, Td%, Sub.att, Rev., Ctrl
    const totalsTable = allTables[0];
    const totalsRow = $(totalsTable).find('tbody tr.b-fight-details__table-row').first();
    const tVals = extractRowValues(totalsRow);
    // tVals: [FighterName, KD, SigStr("X of Y"), SigStr%, TotalStr, TD, TD%, SubAtt, Rev, Ctrl]

    // ─── Parse Sig Strikes totals table (table after "Significant Strikes" label) ───
    // This is typically the 3rd table (index 2) but we find it by proximity to the label
    // The sig strikes table is the 3rd <table> on the page (index 2):
    // [0] = Totals, [1] = Per-round Totals, [2] = Sig Strikes Totals, [3] = Per-round Sig Strikes
    const sigStrikeTable = allTables.length >= 3 ? allTables[2] : null;

    let sigTotalsVals: string[] = [];
    if (sigStrikeTable) {
      const sigRow = $(sigStrikeTable).find('tbody tr.b-fight-details__table-row').first();
      sigTotalsVals = extractRowValues(sigRow);
      // sigTotalsVals: [FighterName, SigStr, SigStr%, Head, Body, Leg, Distance, Clinch, Ground]
    }

    // Build totals FightRoundStats
    const totals: FightRoundStats = {
      round: 0,
      kd: parseInt(tVals[1]) || 0,
      sigStr: parseStrikePair(tVals[2] || '0 of 0'),
      sigStrPct: parsePct(tVals[3] || '0'),
      totalStr: parseStrikePair(tVals[4] || '0 of 0'),
      td: parseStrikePair(tVals[5] || '0 of 0'),
      tdPct: parsePct(tVals[6] || '0'),
      subAtt: parseInt(tVals[7]) || 0,
      rev: parseInt(tVals[8]) || 0,
      ctrlTimeSec: parseCtrlTime(tVals[9] || '0:00'),
      head: parseStrikePair(sigTotalsVals[3] || '0 of 0'),
      body: parseStrikePair(sigTotalsVals[4] || '0 of 0'),
      leg: parseStrikePair(sigTotalsVals[5] || '0 of 0'),
      distance: parseStrikePair(sigTotalsVals[6] || '0 of 0'),
      clinch: parseStrikePair(sigTotalsVals[7] || '0 of 0'),
      ground: parseStrikePair(sigTotalsVals[8] || '0 of 0'),
    };

    // ─── Parse Per-round Totals ───
    // The per-round section has round headers like "Round 1" followed by data rows
    // Find the per-round totals table (first one with class js-fight-table)
    const rounds: FightRoundStats[] = [];

    const perRoundTotalsTable = $('table.b-fight-details__table.js-fight-table').first();
    if (perRoundTotalsTable.length) {
      const roundDataRows = perRoundTotalsTable.find('tbody tr.b-fight-details__table-row');
      const _roundHeaders = perRoundTotalsTable.find('thead.b-fight-details__table-row_type_head th');

      // Per-round sig strikes table (typically the last js-fight-table)
      const allJsFightTables = $('table.b-fight-details__table.js-fight-table');
      const perRoundSigTable = allJsFightTables.length >= 2 ? $(allJsFightTables[1]) : null;
      const perRoundSigRows = perRoundSigTable
        ? perRoundSigTable.find('tbody tr.b-fight-details__table-row')
        : null;

      roundDataRows.each((idx, row) => {
        const rVals = extractRowValues($(row));
        // rVals: [Fighter, KD, SigStr, SigStr%, TotalStr, TD, TD%, SubAtt, Rev, Ctrl]

        // Get corresponding sig strike per-round data
        let sigRVals: string[] = [];
        if (perRoundSigRows && perRoundSigRows[idx]) {
          sigRVals = extractRowValues($(perRoundSigRows[idx]));
          // sigRVals: [Fighter, SigStr, SigStr%, Head, Body, Leg, Distance, Clinch, Ground]
        }

        const roundNum = idx + 1;
        rounds.push({
          round: roundNum,
          kd: parseInt(rVals[1]) || 0,
          sigStr: parseStrikePair(rVals[2] || '0 of 0'),
          sigStrPct: parsePct(rVals[3] || '0'),
          totalStr: parseStrikePair(rVals[4] || '0 of 0'),
          td: parseStrikePair(rVals[5] || '0 of 0'),
          tdPct: parsePct(rVals[6] || '0'),
          subAtt: parseInt(rVals[7]) || 0,
          rev: parseInt(rVals[8]) || 0,
          ctrlTimeSec: parseCtrlTime(rVals[9] || '0:00'),
          head: parseStrikePair(sigRVals[3] || '0 of 0'),
          body: parseStrikePair(sigRVals[4] || '0 of 0'),
          leg: parseStrikePair(sigRVals[5] || '0 of 0'),
          distance: parseStrikePair(sigRVals[6] || '0 of 0'),
          clinch: parseStrikePair(sigRVals[7] || '0 of 0'),
          ground: parseStrikePair(sigRVals[8] || '0 of 0'),
        });
      });
    }

    return { totals, rounds };
  } catch (err) {
    console.warn(`[SCRAPER] Failed to scrape fight detail ${fightUrl}:`, err);
    return null;
  }
}

/**
 * Get full enhanced profile: career stats + fight-by-fight history with round-by-round data.
 *
 * @param name    Fighter name (e.g., "Brandon Moreno")
 * @param maxFights  Maximum number of recent fights to scrape detail pages for (default: 10)
 */
export async function getEnhancedFighterProfile(
  name: string,
  maxFights: number = 10
): Promise<EnhancedFighterProfile | null> {
  // 1. Search for fighter URL
  const fighterUrl = await searchFighter(name);
  if (!fighterUrl) {
    console.error(`[ENHANCED] Fighter not found: "${name}"`);
    return null;
  }

  // 2. Fetch fighter page (career stats + fight history links)
  console.info(`[ENHANCED] Fetching profile for ${name}...`);
  const res = await fetch(fighterUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    console.error(`[ENHANCED] Failed to fetch fighter page: ${res.status}`);
    return null;
  }
  const html = await res.text();
  const $ = cheerio.load(html);

  // 3. Parse career stats (reuse existing logic inline)
  const careerName = cleanText($('.b-content__title-highlight').text());
  const nicknameEl = $('.b-content__Nickname');
  const nickname = nicknameEl.length ? cleanText(nicknameEl.text()).replace(/"/g, '') : null;
  const recordText = cleanText($('.b-content__title-record').text());
  const record = recordText.replace('Record:', '').trim();

  const bioItems = $('.b-list__info-box_style_small-width .b-list__box-list-item');
  let height: string | null = null;
  let weight: string | null = null;
  let reach: string | null = null;
  let stance: string | null = null;
  let dob: string | null = null;

  bioItems.each((_, item) => {
    const label = cleanText($(item).find('i').text()).toLowerCase();
    const value = cleanText($(item).clone().children().remove().end().text());
    if (label.includes('height')) height = value || null;
    else if (label.includes('weight')) weight = value || null;
    else if (label.includes('reach')) reach = value || null;
    else if (label.includes('stance')) stance = value || null;
    else if (label.includes('dob')) dob = value || null;
  });

  const statItems = $('.b-list__info-box_style_middle-width .b-list__box-list-item');
  let slpm: number | null = null;
  let strAcc: number | null = null;
  let sapm: number | null = null;
  let strDef: number | null = null;
  let tdAvg: number | null = null;
  let tdAcc: number | null = null;
  let tdDef: number | null = null;
  let subAvg: number | null = null;

  statItems.each((_, item) => {
    const label = cleanText($(item).find('i').text()).toLowerCase();
    const value = cleanText($(item).clone().children().remove().end().text());
    if (label.includes('slpm')) slpm = parseNumber(value);
    else if (label.includes('str. acc')) strAcc = parseNumber(value);
    else if (label.includes('sapm')) sapm = parseNumber(value);
    else if (label.includes('str. def')) strDef = parseNumber(value);
    else if (label.includes('td avg')) tdAvg = parseNumber(value);
    else if (label.includes('td acc')) tdAcc = parseNumber(value);
    else if (label.includes('td def')) tdDef = parseNumber(value);
    else if (label.includes('sub. avg')) subAvg = parseNumber(value);
  });

  // 4. Parse fight history table
  const historyRows = parseFightHistoryFromFighterPage($, name);
  console.info(`[ENHANCED] Found ${historyRows.length} fights in history, scraping last ${Math.min(maxFights, historyRows.length)} detail pages...`);

  // 5. Scrape fight detail pages for the most recent N fights
  const recentFights = historyRows.slice(0, maxFights);
  const fightHistory: FightDetailStats[] = [];

  for (const fight of recentFights) {
    await delay(400); // Rate limit
    try {
      const detail = await scrapeFightDetailPage(fight.fightUrl, name);
      if (detail) {
        fightHistory.push({
          fightUrl: fight.fightUrl,
          eventName: fight.eventName,
          eventDate: fight.eventDate,
          opponent: fight.opponent,
          opponentUrl: fight.opponentUrl,
          result: fight.result,
          method: fight.method,
          roundFinished: fight.roundFinished,
          timeFinished: fight.timeFinished,
          weightClass: '', // Not available from the fighter page table directly
          totals: detail.totals,
          rounds: detail.rounds,
        });
        console.info(`[ENHANCED]   ✓ ${fight.result} vs ${fight.opponent} (${fight.method} R${fight.roundFinished})`);
      } else {
        // Fallback: create a minimal entry from the fight history row
        fightHistory.push({
          fightUrl: fight.fightUrl,
          eventName: fight.eventName,
          eventDate: fight.eventDate,
          opponent: fight.opponent,
          opponentUrl: fight.opponentUrl,
          result: fight.result,
          method: fight.method,
          roundFinished: fight.roundFinished,
          timeFinished: fight.timeFinished,
          weightClass: '',
          totals: emptyRoundStats(0),
          rounds: [],
        });
        console.warn(`[ENHANCED]   ✗ ${fight.opponent} — detail page failed, using basic data`);
      }
    } catch (err) {
      console.warn(`[ENHANCED]   ✗ ${fight.opponent} — error:`, err);
      // Still push basic info so we don't lose the fight from history
      fightHistory.push({
        fightUrl: fight.fightUrl,
        eventName: fight.eventName,
        eventDate: fight.eventDate,
        opponent: fight.opponent,
        opponentUrl: fight.opponentUrl,
        result: fight.result,
        method: fight.method,
        roundFinished: fight.roundFinished,
        timeFinished: fight.timeFinished,
        weightClass: '',
        totals: emptyRoundStats(0),
        rounds: [],
      });
    }
  }

  console.info(`[ENHANCED] Profile complete for ${name}: ${fightHistory.length} fights with detail data`);

  return {
    name: careerName || name,
    nickname,
    record,
    height,
    weight,
    reach,
    stance,
    dob,
    slpm,
    strAcc,
    sapm,
    strDef,
    tdAvg,
    tdAcc,
    tdDef,
    subAvg,
    ufcstatsUrl: fighterUrl,
    fightHistory,
    totalUfcFights: historyRows.length,
  };
}
