import * as cheerio from 'cheerio';

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

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function parseNumber(text: string): number | null {
  const cleaned = text.replace('%', '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
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
