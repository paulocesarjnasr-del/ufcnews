/**
 * scrape-fight-history.ts
 *
 * Scrapes UFC fight records from ufc.com/athlete/{slug} for all ACTIVE roster fighters.
 * Stores results in historico_lutas_ufc table.
 *
 * Usage:
 *   npx tsx scripts/scrape-fight-history.ts              # Full scrape
 *   npx tsx scripts/scrape-fight-history.ts --dry-run     # Scrape without writing to DB
 *   npx tsx scripts/scrape-fight-history.ts --limit 10    # Only first 10 fighters (for testing)
 *   npx tsx scripts/scrape-fight-history.ts --resume      # Resume from checkpoint
 */

import { chromium, Browser, Page } from 'playwright';
import { Pool } from 'pg';

// ─── Config ──────────────────────────────────────────────────────────
const DB_URL = process.env.DATABASE_URL || 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub';
const BATCH_SIZE = 5;
const DELAY_BETWEEN_BATCHES_MS = 800;
const DELAY_BETWEEN_PAGES_MS = 400;
const MAX_RETRIES = 3;
const PAGE_TIMEOUT = 25000;
const CHECKPOINT_FILE = '/tmp/fight-history-checkpoint.json';

// ─── Types ───────────────────────────────────────────────────────────
interface FighterRow {
  id: string;
  nome: string;
  ufc_slug: string;
}

interface FightRecord {
  resultado: string;    // 'win', 'loss', 'draw', 'nc'
  oponente_nome: string;
  data_str: string;     // 'Oct. 4, 2025'
  metodo: string;       // 'KO/TKO', 'SUB', 'Decision - Unanimous'
  round: string;        // '1', '2', etc.
  tempo: string;        // '1:20', '5:00'
}

interface Checkpoint {
  processedSlugs: string[];
  timestamp: string;
}

// ─── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const RESUME = args.includes('--resume');
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : 0;

// ─── Helpers ─────────────────────────────────────────────────────────
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseDate(dateStr: string): string | null {
  if (!dateStr) return null;
  try {
    // Format: "Oct. 4, 2025" or "Mar. 8, 2025" or "Jun 29, 2025"
    const cleaned = dateStr.replace(/\./g, '').trim();
    const d = new Date(cleaned);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  } catch {
    return null;
  }
}

function normalizeResult(result: string): string {
  const r = result.toLowerCase().trim();
  if (r === 'win') return 'win';
  if (r === 'loss') return 'loss';
  if (r === 'draw') return 'draw';
  if (r.includes('no contest') || r === 'nc') return 'nc';
  return r;
}

async function loadCheckpoint(): Promise<Set<string>> {
  try {
    const fs = await import('fs');
    const data = fs.readFileSync(CHECKPOINT_FILE, 'utf-8');
    const cp: Checkpoint = JSON.parse(data);
    console.log(`📋 Checkpoint loaded: ${cp.processedSlugs.length} fighters already processed (from ${cp.timestamp})`);
    return new Set(cp.processedSlugs);
  } catch {
    return new Set();
  }
}

async function saveCheckpoint(processedSlugs: Set<string>): Promise<void> {
  const fs = await import('fs');
  const cp: Checkpoint = {
    processedSlugs: Array.from(processedSlugs),
    timestamp: new Date().toISOString()
  };
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(cp));
}

// ─── Phase 1: Get active fighters from UFC.com listing ────────────────
async function getActiveRosterSlugs(browser: Browser): Promise<string[]> {
  console.log('\n═══════════════════════════════════════════');
  console.log(' PHASE 1: Scraping active roster from UFC.com');
  console.log('═══════════════════════════════════════════\n');

  const page = await browser.newPage();
  const allSlugs: string[] = [];
  let pageNum = 0;
  let emptyPages = 0;

  while (emptyPages < 3) {
    const url = `https://www.ufc.com/athletes/all?filters%5B0%5D=status%3A23&page=${pageNum}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: PAGE_TIMEOUT });

      const slugs: string[] = await page.evaluate(() => {
        const cards = document.querySelectorAll('.c-listing-athlete-flipcard__back');
        const result: string[] = [];
        cards.forEach(card => {
          const link = card.querySelector('a.c-listing-athlete__button');
          if (link) {
            const href = link.getAttribute('href') || '';
            const slug = href.replace('/athlete/', '').replace('https://www.ufc.com/athlete/', '');
            if (slug) result.push(slug);
          }
        });
        // Fallback: try name links
        if (result.length === 0) {
          document.querySelectorAll('.c-listing-athlete-flipcard a.e-button--black').forEach(link => {
            const href = link.getAttribute('href') || '';
            const slug = href.replace('/athlete/', '').replace('https://www.ufc.com/athlete/', '');
            if (slug) result.push(slug);
          });
        }
        // Fallback 2: any link to /athlete/
        if (result.length === 0) {
          document.querySelectorAll('a[href*="/athlete/"]').forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.includes('/athletes/all') || href.includes('/athletes?')) return;
            const match = href.match(/\/athlete\/([^/?#]+)/);
            if (match && match[1]) result.push(match[1]);
          });
        }
        return [...new Set(result)];
      });

      if (slugs.length === 0) {
        emptyPages++;
      } else {
        emptyPages = 0;
        allSlugs.push(...slugs);
      }

      process.stdout.write(`\r  Page ${pageNum}: ${slugs.length} fighters (total: ${allSlugs.length})`);
      pageNum++;
      await sleep(DELAY_BETWEEN_PAGES_MS);
    } catch (err) {
      console.log(`\n  ⚠️ Error on page ${pageNum}: ${(err as Error).message}`);
      emptyPages++;
      pageNum++;
    }
  }

  await page.close();

  // Deduplicate
  const unique = [...new Set(allSlugs)];
  console.log(`\n\n  ✅ Found ${unique.length} active roster fighters\n`);
  return unique;
}

// ─── Phase 2: Scrape fight records for one fighter ─────────────────────
async function scrapeFighterRecord(page: Page, slug: string): Promise<FightRecord[]> {
  const allFights: FightRecord[] = [];
  let pageNum = 0;
  let hasMore = true;

  while (hasMore) {
    const url = pageNum === 0
      ? `https://www.ufc.com/athlete/${slug}`
      : `https://www.ufc.com/athlete/${slug}?page=${pageNum}`;

    await page.goto(url, { waitUntil: 'networkidle', timeout: PAGE_TIMEOUT });

    const fights: FightRecord[] = await page.evaluate((fighterSlug) => {
      const items = document.querySelectorAll('.l-listing__item');
      const results: FightRecord[] = [];

      items.forEach(item => {
        const article = item.querySelector('.c-card-event--athlete-results');
        if (!article) return;

        // Result: find which side (red/blue) belongs to this fighter by checking the link
        const redImage = article.querySelector('.c-card-event--athlete-results__red-image');
        const blueImage = article.querySelector('.c-card-event--athlete-results__blue-image');
        const redLink = redImage ? redImage.querySelector('a') : null;
        const blueLink = blueImage ? blueImage.querySelector('a') : null;
        const redHref = redLink ? (redLink.getAttribute('href') || '') : '';
        const blueHref = blueLink ? (blueLink.getAttribute('href') || '') : '';

        // Determine which side is "ours"
        let mySideClasses = '';
        if (redHref.includes(fighterSlug)) {
          mySideClasses = redImage ? redImage.className : '';
        } else if (blueHref.includes(fighterSlug)) {
          mySideClasses = blueImage ? blueImage.className : '';
        }

        let resultado = 'unknown';
        if (mySideClasses.includes(' win')) {
          resultado = 'win';
        } else if (mySideClasses.includes(' loss')) {
          resultado = 'loss';
        } else if (mySideClasses.includes(' draw')) {
          resultado = 'draw';
        } else if (mySideClasses.includes(' nc')) {
          resultado = 'nc';
        }

        // Fallback: if no class on our side, check if the OTHER side has 'win' (meaning we lost)
        // or if there's a plaque on our side
        if (resultado === 'unknown') {
          const otherSideClasses = redHref.includes(fighterSlug)
            ? (blueImage ? blueImage.className : '')
            : (redImage ? redImage.className : '');
          if (otherSideClasses.includes(' win')) {
            resultado = 'loss';
          } else if (otherSideClasses.includes(' loss')) {
            resultado = 'win';
          }
          // Last resort: check for plaque on our side
          if (resultado === 'unknown') {
            const mySide = redHref.includes(fighterSlug) ? redImage : blueImage;
            const myPlaque = mySide ? mySide.querySelector('.c-card-event--athlete-results__plaque') : null;
            if (myPlaque) {
              resultado = myPlaque.textContent!.trim().toLowerCase();
            }
          }
        }

        // Opponent: find the headline link that is NOT this fighter
        const headline = article.querySelector('.c-card-event--athlete-results__headline');
        const links = headline ? Array.from(headline.querySelectorAll('a')) : [];
        let opponentName = '';
        for (const link of links) {
          const href = link.getAttribute('href') || '';
          if (!href.includes(fighterSlug)) {
            opponentName = link.textContent!.trim();
            break;
          }
        }
        if (!opponentName && links.length > 0) {
          // If all links match slug (weird case), take the first one
          opponentName = links[0].textContent!.trim();
        }

        // Date
        const dateEl = article.querySelector('.c-card-event--athlete-results__date');
        const dateStr = dateEl ? dateEl.textContent!.trim() : '';

        // Round, Time, Method
        const meta: Record<string, string> = {};
        article.querySelectorAll('.c-card-event--athlete-results__result').forEach(r => {
          const label = r.querySelector('.c-card-event--athlete-results__result-label');
          const text = r.querySelector('.c-card-event--athlete-results__result-text');
          if (label && text) {
            meta[label.textContent!.trim().toLowerCase()] = text.textContent!.trim();
          }
        });

        results.push({
          resultado,
          oponente_nome: opponentName,
          data_str: dateStr,
          metodo: meta['method'] || '',
          round: meta['round'] || '',
          tempo: meta['time'] || ''
        });
      });

      return results;
    }, slug);

    allFights.push(...fights);

    // Check if there's a "Load More" / next page
    const hasNextPage = await page.evaluate((currentPage) => {
      const pagerLink = document.querySelector(`.pager__item a[href*="page=${currentPage + 1}"]`);
      return !!pagerLink;
    }, pageNum);

    if (hasNextPage && fights.length > 0) {
      pageNum++;
      await sleep(300);
    } else {
      hasMore = false;
    }
  }

  return allFights;
}

// ─── Phase 3: Save to database ────────────────────────────────────────
async function saveFightsToDb(pool: Pool, fighterId: string, fights: FightRecord[]): Promise<number> {
  let inserted = 0;

  for (const fight of fights) {
    const dateValue = parseDate(fight.data_str);
    const resultado = normalizeResult(fight.resultado);
    const roundNum = fight.round ? parseInt(fight.round) : null;

    try {
      await pool.query(
        `INSERT INTO historico_lutas_ufc
          (lutador_id, resultado, oponente_nome, data_luta, metodo, round, tempo)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (lutador_id, oponente_nome, data_luta)
         WHERE data_luta IS NOT NULL
         DO UPDATE SET
           resultado = EXCLUDED.resultado,
           metodo = EXCLUDED.metodo,
           round = EXCLUDED.round,
           tempo = EXCLUDED.tempo`,
        [fighterId, resultado, fight.oponente_nome, dateValue, fight.metodo, roundNum, fight.tempo]
      );
      inserted++;
    } catch (err) {
      // If date is null, there's no unique constraint, just insert
      if (dateValue === null) {
        try {
          await pool.query(
            `INSERT INTO historico_lutas_ufc
              (lutador_id, resultado, oponente_nome, data_luta, metodo, round, tempo)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [fighterId, resultado, fight.oponente_nome, null, fight.metodo, roundNum, fight.tempo]
          );
          inserted++;
        } catch {
          // Skip duplicates or errors
        }
      }
    }
  }

  return inserted;
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   UFC FIGHT HISTORY SCRAPER                     ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}${LIMIT ? ` | Limit: ${LIMIT}` : ''}${RESUME ? ' | RESUME' : ''}`);

  const pool = new Pool({ connectionString: DB_URL, max: 10 });
  const browser = await chromium.launch({ headless: true });

  try {
    // Phase 1: Get active roster slugs from UFC.com
    const rosterSlugs = await getActiveRosterSlugs(browser);

    // Match roster slugs to our database fighters
    const dbResult = await pool.query<FighterRow>(
      `SELECT id, nome, ufc_slug FROM lutadores WHERE ufc_slug IS NOT NULL AND ativo = true`
    );
    const dbFighters = dbResult.rows;
    const slugToFighter = new Map<string, FighterRow>();
    dbFighters.forEach(f => slugToFighter.set(f.ufc_slug, f));

    // Filter to only fighters in roster AND in our DB
    let matchedFighters: FighterRow[] = [];
    let unmatchedSlugs: string[] = [];
    for (const slug of rosterSlugs) {
      const fighter = slugToFighter.get(slug);
      if (fighter) {
        matchedFighters.push(fighter);
      } else {
        unmatchedSlugs.push(slug);
      }
    }

    console.log(`  📊 Roster: ${rosterSlugs.length} | In DB: ${matchedFighters.length} | Not in DB: ${unmatchedSlugs.length}`);

    if (LIMIT) {
      matchedFighters = matchedFighters.slice(0, LIMIT);
      console.log(`  🔒 Limited to ${LIMIT} fighters`);
    }

    // Load checkpoint if resuming
    let processedSlugs = new Set<string>();
    if (RESUME) {
      processedSlugs = await loadCheckpoint();
      const before = matchedFighters.length;
      matchedFighters = matchedFighters.filter(f => !processedSlugs.has(f.ufc_slug));
      console.log(`  ⏩ Skipping ${before - matchedFighters.length} already processed fighters`);
    }

    // Phase 2 & 3: Scrape fight records and save
    console.log('\n═══════════════════════════════════════════');
    console.log(' PHASE 2: Scraping fight records');
    console.log('═══════════════════════════════════════════\n');

    let totalFights = 0;
    let totalInserted = 0;
    let errors = 0;
    const startTime = Date.now();

    // Process in batches
    for (let i = 0; i < matchedFighters.length; i += BATCH_SIZE) {
      const batch = matchedFighters.slice(i, i + BATCH_SIZE);

      const results = await Promise.allSettled(
        batch.map(async (fighter) => {
          const page = await browser.newPage();
          try {
            let fights: FightRecord[] = [];
            let lastError: Error | null = null;

            for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
              try {
                fights = await scrapeFighterRecord(page, fighter.ufc_slug);
                lastError = null;
                break;
              } catch (err) {
                lastError = err as Error;
                if (attempt < MAX_RETRIES - 1) {
                  await sleep(1000 * (attempt + 1));
                }
              }
            }

            if (lastError) throw lastError;

            let inserted = 0;
            if (!DRY_RUN && fights.length > 0) {
              inserted = await saveFightsToDb(pool, fighter.id, fights);
            }

            return { fighter, fights: fights.length, inserted };
          } finally {
            await page.close();
          }
        })
      );

      for (const result of results) {
        if (result.status === 'fulfilled') {
          const { fighter, fights, inserted } = result.value;
          totalFights += fights;
          totalInserted += inserted;
          processedSlugs.add(fighter.ufc_slug);

          const fightStr = fights > 0 ? `${fights} fights` : 'no fights';
          process.stdout.write(`\r  [${i + batch.indexOf(matchedFighters.find(f => f.ufc_slug === fighter.ufc_slug)!) - i + 1 + i}/${matchedFighters.length}] ${fighter.nome.padEnd(30)} ${fightStr.padEnd(15)} ${DRY_RUN ? '(dry)' : `+${inserted}`}`);
          console.log();
        } else {
          errors++;
          console.log(`\n  ❌ Error: ${result.reason}`);
        }
      }

      // Save checkpoint every batch
      if (!DRY_RUN) {
        await saveCheckpoint(processedSlugs);
      }

      // Rate limit
      if (i + BATCH_SIZE < matchedFighters.length) {
        await sleep(DELAY_BETWEEN_BATCHES_MS);
      }
    }

    // Phase 4: Report
    const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    console.log('\n═══════════════════════════════════════════');
    console.log(' REPORT');
    console.log('═══════════════════════════════════════════');
    console.log(`  ⏱️  Duration: ${elapsed} min`);
    console.log(`  👊 Fighters processed: ${processedSlugs.size}`);
    console.log(`  🥊 Total fights scraped: ${totalFights}`);
    console.log(`  💾 Fights saved to DB: ${totalInserted}`);
    console.log(`  ❌ Errors: ${errors}`);
    console.log(`  📊 Avg fights/fighter: ${processedSlugs.size > 0 ? (totalFights / processedSlugs.size).toFixed(1) : 0}`);

    if (!DRY_RUN) {
      const dbCount = await pool.query('SELECT COUNT(*) as c FROM historico_lutas_ufc');
      console.log(`  🗃️  Total records in DB: ${dbCount.rows[0].c}`);
    }

    console.log('═══════════════════════════════════════════\n');

  } finally {
    await browser.close();
    await pool.end();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
