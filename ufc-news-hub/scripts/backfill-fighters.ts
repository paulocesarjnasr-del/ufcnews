/**
 * BACKFILL FIGHTERS - Comprehensive fighter data population
 * 
 * Phase 1: Scrape all fighters from UFCStats.com listings (quick - names + URLs only)
 * Phase 2: Match to DB, fetch detail pages ONLY for fighters needing updates, update stats
 * Phase 3: Find photos from UFC.com for fighters missing images
 * 
 * Usage: npx tsx scripts/backfill-fighters.ts [--phase=1,2,3] [--skip-photos]
 */

import * as cheerio from 'cheerio';
import pg from 'pg';

const DATABASE_URL = 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub';
const RATE_LIMIT_MS = 200;
const PHOTO_RATE_LIMIT_MS = 300;
const BATCH_SIZE = 50; // commit logging every N

// ─── Types ───────────────────────────────────────────────────────────────────

interface ListingFighter {
  firstName: string;
  lastName: string;
  nickname: string;
  height: string;
  weight: string;
  reach: string;
  stance: string;
  wins: number;
  losses: number;
  draws: number;
  detailUrl: string;
}

interface DetailStats {
  slpm?: number;
  strAcc?: number;
  sapm?: number;
  strDef?: number;
  tdAvg?: number;
  tdAcc?: number;
  tdDef?: number;
  subAvg?: number;
  dob?: string;
  height?: string;
  reach?: string;
  stance?: string;
}

interface DBFighter {
  id: string;
  nome: string;
  apelido: string | null;
  imagem_url: string | null;
  slpm: number | null;
  str_acc: number | null;
  stance: string | null;
  altura: string | null;
  envergadura: string | null;
  data_nascimento: string | null;
  url_perfil: string | null;
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        if (res.status === 429) {
          console.log(`  ⏳ Rate limited, waiting 5s...`);
          await sleep(5000);
          continue;
        }
        if (res.status === 404) return ''; // not found
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.text();
    } catch (err: any) {
      if (i < retries - 1) {
        await sleep(2000 * (i + 1));
      } else {
        throw err;
      }
    }
  }
  throw new Error('Exhausted retries');
}

function normalizeNameForMatch(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Phase 1: Scrape UFCStats.com Listings ───────────────────────────────────

async function scrapeListingPage(letter: string): Promise<ListingFighter[]> {
  const url = `http://ufcstats.com/statistics/fighters?char=${letter}&page=all`;
  const html = await fetchWithRetry(url);
  const $ = cheerio.load(html);
  const fighters: ListingFighter[] = [];

  $('tr.b-statistics__table-row').each((_, row) => {
    const cols = $(row).find('td.b-statistics__table-col');
    if (cols.length < 10) return;

    const firstNameEl = $(cols[0]).find('a');
    const lastNameEl = $(cols[1]).find('a');
    if (!firstNameEl.length || !lastNameEl.length) return;

    const firstName = firstNameEl.text().trim();
    const lastName = lastNameEl.text().trim();
    const detailUrl = firstNameEl.attr('href') || '';
    if (!firstName && !lastName) return;

    fighters.push({
      firstName,
      lastName,
      nickname: $(cols[2]).find('a').text().trim(),
      height: $(cols[3]).text().trim(),
      weight: $(cols[4]).text().trim(),
      reach: $(cols[5]).text().trim(),
      stance: $(cols[6]).text().trim(),
      wins: parseInt($(cols[7]).text().trim()) || 0,
      losses: parseInt($(cols[8]).text().trim()) || 0,
      draws: parseInt($(cols[9]).text().trim()) || 0,
      detailUrl,
    });
  });

  return fighters;
}

async function scrapeAllListings(): Promise<ListingFighter[]> {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const allFighters: ListingFighter[] = [];

  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE 1: Scraping UFCStats.com fighter listings');
  console.log('═══════════════════════════════════════════════════════');

  for (const letter of letters) {
    try {
      const fighters = await scrapeListingPage(letter);
      allFighters.push(...fighters);
      process.stdout.write(`  [${letter.toUpperCase()}] ${fighters.length} fighters (total: ${allFighters.length})\n`);
      await sleep(RATE_LIMIT_MS);
    } catch (err: any) {
      console.log(`  ❌ Failed letter ${letter}: ${err.message}`);
    }
  }

  console.log(`\n✅ Phase 1 complete: ${allFighters.length} fighters from listings\n`);
  return allFighters;
}

// ─── Phase 2: Match, Fetch Details, Update ───────────────────────────────────

function scrapeDetailHtml(html: string): DetailStats {
  const $ = cheerio.load(html);
  const stats: DetailStats = {};

  const getVal = (label: string): string => {
    let value = '';
    $('li.b-list__box-list-item').each((_, el) => {
      const titleEl = $(el).find('i.b-list__box-item-title');
      const title = titleEl.text().replace(/:/g, '').trim().toLowerCase();
      if (title === label.toLowerCase()) {
        value = $(el).text().replace(titleEl.text(), '').trim();
        return false;
      }
    });
    return value;
  };

  const pn = (v: string): number | undefined => {
    const n = parseFloat(v.replace('%', '').trim());
    return isNaN(n) ? undefined : n;
  };

  stats.slpm = pn(getVal('SLpM'));
  stats.strAcc = pn(getVal('Str. Acc.'));
  stats.sapm = pn(getVal('SApM'));
  stats.strDef = pn(getVal('Str. Def'));
  stats.tdAvg = pn(getVal('TD Avg.'));
  stats.tdAcc = pn(getVal('TD Acc.'));
  stats.tdDef = pn(getVal('TD Def.'));
  stats.subAvg = pn(getVal('Sub. Avg.'));

  const h = getVal('Height');
  if (h && h !== '--') stats.height = h;
  const r = getVal('Reach');
  if (r && r !== '--') stats.reach = r;
  const s = getVal('STANCE');
  if (s && s !== '--') stats.stance = s;

  const dobRaw = getVal('DOB');
  if (dobRaw && dobRaw !== '--') {
    const d = new Date(dobRaw);
    if (!isNaN(d.getTime())) {
      stats.dob = d.toISOString().split('T')[0];
    }
  }

  return stats;
}

async function matchAndUpdate(pool: pg.Pool, listings: ListingFighter[]): Promise<number> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE 2: Matching to DB + fetching details + updating');
  console.log('═══════════════════════════════════════════════════════');

  // Load fighters needing work (missing stats OR missing metadata)
  const { rows: dbFighters } = await pool.query<DBFighter>(
    `SELECT id, nome, apelido, imagem_url, slpm, str_acc, stance, altura, 
            envergadura, data_nascimento, url_perfil
     FROM lutadores`
  );
  console.log(`  Loaded ${dbFighters.length} fighters from DB`);

  // Build lookup: normalized name → DB fighter
  const dbMap = new Map<string, DBFighter>();
  for (const f of dbFighters) {
    dbMap.set(normalizeNameForMatch(f.nome), f);
  }

  // Match listings to DB and identify who needs detail scraping
  interface MatchedFighter {
    listing: ListingFighter;
    db: DBFighter;
    needsDetailScrape: boolean;
  }

  const matched: MatchedFighter[] = [];

  for (const listing of listings) {
    const fullName = normalizeNameForMatch(`${listing.firstName} ${listing.lastName}`);
    let db = dbMap.get(fullName);

    if (!db) {
      // Try reversed: "LastName FirstName"
      const rev = normalizeNameForMatch(`${listing.lastName} ${listing.firstName}`);
      db = dbMap.get(rev);
    }

    if (!db) continue;

    const needsStats = db.slpm === null || db.slpm === 0;

    matched.push({
      listing,
      db,
      needsDetailScrape: needsStats,
    });
  }

  console.log(`  Matched ${matched.length} fighters to DB`);
  const needDetail = matched.filter(m => m.needsDetailScrape);
  console.log(`  ${needDetail.length} need detail page scraping`);

  // For fighters that don't need detail scraping, just update url_perfil
  let updatedCount = 0;
  let urlProfileUpdated = 0;

  // Update url_perfil for all matched fighters that don't have it
  for (const m of matched) {
    if (!m.db.url_perfil && m.listing.detailUrl) {
      await pool.query(
        `UPDATE lutadores SET url_perfil = $1, last_stats_sync = NOW() WHERE id = $2`,
        [m.listing.detailUrl, m.db.id]
      );
      urlProfileUpdated++;
    }
  }
  console.log(`  Updated url_perfil for ${urlProfileUpdated} fighters`);

  // Now fetch detail pages for fighters that need stats/metadata
  let processed = 0;
  for (const m of needDetail) {
    processed++;
    if (processed % BATCH_SIZE === 0 || processed === needDetail.length) {
      console.log(`  📄 Detail scraping: ${processed}/${needDetail.length} (updated: ${updatedCount})`);
    }

    try {
      const html = await fetchWithRetry(m.listing.detailUrl);
      if (!html) continue;

      const stats = scrapeDetailHtml(html);

      const updates: string[] = [];
      const values: any[] = [];
      let pi = 1;

      const needsStats = m.db.slpm === null || m.db.slpm === 0;
      if (needsStats) {
        if (stats.slpm !== undefined) { updates.push(`slpm = $${pi++}`); values.push(stats.slpm); }
        if (stats.strAcc !== undefined) { updates.push(`str_acc = $${pi++}`); values.push(stats.strAcc); }
        if (stats.sapm !== undefined) { updates.push(`sapm = $${pi++}`); values.push(stats.sapm); }
        if (stats.strDef !== undefined) { updates.push(`str_def = $${pi++}`); values.push(stats.strDef); }
        if (stats.tdAvg !== undefined) { updates.push(`td_avg = $${pi++}`); values.push(stats.tdAvg); }
        if (stats.tdAcc !== undefined) { updates.push(`td_acc = $${pi++}`); values.push(stats.tdAcc); }
        if (stats.tdDef !== undefined) { updates.push(`td_def = $${pi++}`); values.push(stats.tdDef); }
        if (stats.subAvg !== undefined) { updates.push(`sub_avg = $${pi++}`); values.push(stats.subAvg); }
      }

      if (!m.db.stance && (stats.stance || m.listing.stance) && (stats.stance || m.listing.stance) !== '--') {
        updates.push(`stance = $${pi++}`); values.push(stats.stance || m.listing.stance);
      }
      if (!m.db.altura && (stats.height || m.listing.height) && (stats.height || m.listing.height) !== '--') {
        updates.push(`altura = $${pi++}`); values.push(stats.height || m.listing.height);
      }
      if (!m.db.envergadura && (stats.reach || m.listing.reach) && (stats.reach || m.listing.reach) !== '--') {
        updates.push(`envergadura = $${pi++}`); values.push(stats.reach || m.listing.reach);
      }
      if (!m.db.data_nascimento && stats.dob) {
        updates.push(`data_nascimento = $${pi++}`); values.push(stats.dob);
      }
      if (!m.db.url_perfil && m.listing.detailUrl) {
        updates.push(`url_perfil = $${pi++}`); values.push(m.listing.detailUrl);
      }

      if (updates.length === 0) continue;

      updates.push(`last_stats_sync = NOW()`);
      values.push(m.db.id);

      await pool.query(
        `UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${pi}`,
        values
      );
      updatedCount++;
    } catch (err: any) {
      // silently continue
    }

    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\n✅ Phase 2 complete: ${updatedCount} fighters updated with stats/metadata\n`);
  return updatedCount;
}

// ─── Phase 3: Photos from UFC.com ────────────────────────────────────────────

async function backfillPhotos(pool: pg.Pool): Promise<number> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE 3: Finding photos from UFC.com');
  console.log('═══════════════════════════════════════════════════════');

  const { rows: fighters } = await pool.query<{ id: string; nome: string }>(
    `SELECT id, nome FROM lutadores 
     WHERE (imagem_url IS NULL OR imagem_url = '')
     ORDER BY nome`
  );

  console.log(`  ${fighters.length} fighters missing photos`);

  let updatedCount = 0;
  let checkedCount = 0;

  for (const fighter of fighters) {
    checkedCount++;
    if (checkedCount % 100 === 0) {
      console.log(`  📷 ${checkedCount}/${fighters.length} checked (${updatedCount} found)`);
    }

    const parts = fighter.nome.split(' ');
    const firstName = parts[0];
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';

    // Build slug
    const slug = `${firstName}${lastName ? '-' + lastName : ''}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    try {
      const html = await fetchWithRetry(`https://www.ufc.com/athlete/${slug}`);
      if (!html) { await sleep(PHOTO_RATE_LIMIT_MS); continue; }

      // Look for athlete_bio_full_body image
      const match = html.match(/https:\/\/ufc\.com\/images\/styles\/athlete_bio_full_body\/s3\/[^"'\s)]+/);
      if (match) {
        await pool.query(
          `UPDATE lutadores SET imagem_url = $1, last_stats_sync = NOW() WHERE id = $2`,
          [match[0], fighter.id]
        );
        updatedCount++;
      }
    } catch {
      // continue
    }

    await sleep(PHOTO_RATE_LIMIT_MS);
  }

  console.log(`\n✅ Phase 3 complete: ${updatedCount} photos found out of ${fighters.length} checked\n`);
  return updatedCount;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const skipPhotos = args.includes('--skip-photos');
  const phaseArg = args.find(a => a.startsWith('--phase='));
  const phases = phaseArg ? phaseArg.split('=')[1].split(',').map(Number) : [1, 2, 3];

  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║       UFC Fighter Data Backfill Script               ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log(`  Phases: ${phases.join(', ')}${skipPhotos ? ' (skipping photos)' : ''}\n`);

  const pool = new pg.Pool({ connectionString: DATABASE_URL });

  try {
    const { rows } = await pool.query('SELECT COUNT(*) as count FROM lutadores');
    console.log(`📊 Database connected. ${rows[0].count} fighters in DB\n`);

    let scrapedCount = 0;
    let statsUpdated = 0;
    let photosFound = 0;
    let listings: ListingFighter[] = [];

    if (phases.includes(1) || phases.includes(2)) {
      listings = await scrapeAllListings();
      scrapedCount = listings.length;
    }

    if (phases.includes(2)) {
      statsUpdated = await matchAndUpdate(pool, listings);
    }

    if (phases.includes(3) && !skipPhotos) {
      photosFound = await backfillPhotos(pool);
    }

    // Final summary
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║                    FINAL SUMMARY                     ║');
    console.log('╠═══════════════════════════════════════════════════════╣');
    if (scrapedCount) console.log(`║  Scraped from UFCStats:   ${String(scrapedCount).padStart(24)} ║`);
    if (statsUpdated) console.log(`║  Stats updated in DB:     ${String(statsUpdated).padStart(24)} ║`);
    if (photosFound)  console.log(`║  Photos found:            ${String(photosFound).padStart(24)} ║`);
    console.log('╚═══════════════════════════════════════════════════════╝');

    const { rows: verify } = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN imagem_url IS NULL OR imagem_url = '' THEN 1 END) as missing_photo,
        COUNT(CASE WHEN slpm IS NULL OR slpm = 0 THEN 1 END) as missing_stats,
        COUNT(CASE WHEN url_perfil IS NOT NULL AND url_perfil != '' THEN 1 END) as has_profile
      FROM lutadores
    `);
    console.log(`\n📊 Post-run DB state:`);
    console.log(`  Total fighters:      ${verify[0].total}`);
    console.log(`  Missing photos:      ${verify[0].missing_photo}`);
    console.log(`  Missing stats:       ${verify[0].missing_stats}`);
    console.log(`  Have url_perfil:     ${verify[0].has_profile}`);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
