/**
 * Backfill KO/Sub/Dec from UFCStats detail pages
 * For fighters with wins but missing win method breakdown
 */

import * as cheerio from 'cheerio';
import pg from 'pg';

const DATABASE_URL = 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub';
const RATE_LIMIT_MS = 200;

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithRetry(url: string, retries = 2): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return null;
      return await res.text();
    } catch {
      if (i < retries - 1) await sleep(500);
    }
  }
  return null;
}

async function main() {
  console.log('\n💥 Win Methods Backfill (KO/Sub/Dec)\n');

  const pool = new pg.Pool({ connectionString: DATABASE_URL });

  const { rows: fighters } = await pool.query<{ id: string; url_perfil: string; nome: string; vitorias: number }>(
    `SELECT id, url_perfil, nome, vitorias FROM lutadores 
     WHERE url_perfil IS NOT NULL AND url_perfil != ''
     AND (nocautes = 0 OR nocautes IS NULL)
     AND (finalizacoes = 0 OR finalizacoes IS NULL)
     AND (decisoes = 0 OR decisoes IS NULL)
     AND vitorias > 0
     ORDER BY nome`
  );

  console.log(`  ${fighters.length} fighters need win method data\n`);
  let updated = 0, checked = 0, errors = 0;

  for (const fighter of fighters) {
    checked++;
    if (checked % 100 === 0) {
      console.log(`  📊 ${checked}/${fighters.length} checked | updated: ${updated} | errors: ${errors}`);
    }

    const html = await fetchWithRetry(fighter.url_perfil);
    if (!html) { errors++; await sleep(RATE_LIMIT_MS); continue; }

    const $ = cheerio.load(html);
    
    // Method 1: Parse from career stats section
    // UFCStats shows "Win by KO/TKO", "Win by Submission", "Win by Decision"
    let kos = 0, subs = 0, decs = 0;
    let found = false;

    // Look for the career statistics section with win methods
    $('i.b-flag__text').each((_, el) => {
      const label = $(el).text().trim().toUpperCase();
      const parent = $(el).parent();
      const value = parent.find('i.b-flag__text').first().text().trim();
      
      // Look for sibling/nearby number
      const numText = parent.text().replace(label, '').trim();
      const num = parseInt(numText);
      
      if (!isNaN(num)) {
        if (label.includes('KO') || label.includes('TKO')) { kos = num; found = true; }
        else if (label.includes('SUB')) { subs = num; found = true; }
        else if (label.includes('DEC')) { decs = num; found = true; }
      }
    });

    // Method 2: Count from fight history table if method 1 failed
    if (!found) {
      $('tr.b-fight-details__table-row').each((_, row) => {
        const cells = $(row).find('td');
        if (cells.length < 8) return;
        
        const result = $(cells.eq(0)).text().trim().toLowerCase();
        if (result !== 'win') return;
        
        const method = $(cells.eq(7)).text().trim().toUpperCase();
        if (method.includes('KO') || method.includes('TKO')) kos++;
        else if (method.includes('SUB')) subs++;
        else if (method.includes('DEC') || method.includes('U-DEC') || method.includes('S-DEC') || method.includes('M-DEC')) decs++;
      });
    }

    // Method 3: Parse from the "Win by Method" donut chart section
    if (kos === 0 && subs === 0 && decs === 0) {
      // Look for text patterns like "KO/TKO (3)" or similar
      const bodyText = $('body').text();
      const koMatch = bodyText.match(/KO\/TKO\s*\(?\s*(\d+)/i);
      const subMatch = bodyText.match(/SUB\s*\(?\s*(\d+)/i);
      const decMatch = bodyText.match(/DEC\s*\(?\s*(\d+)/i);
      
      if (koMatch) kos = parseInt(koMatch[1]);
      if (subMatch) subs = parseInt(subMatch[1]);
      if (decMatch) decs = parseInt(decMatch[1]);
    }

    if (kos > 0 || subs > 0 || decs > 0) {
      await pool.query(
        `UPDATE lutadores SET nocautes = $1, finalizacoes = $2, decisoes = $3, updated_at = NOW() WHERE id = $4`,
        [kos, subs, decs, fighter.id]
      );
      updated++;
    }

    await sleep(RATE_LIMIT_MS);
  }

  // Verify
  const { rows: [result] } = await pool.query(`
    SELECT 
      COUNT(*) FILTER (WHERE nocautes > 0 OR finalizacoes > 0 OR decisoes > 0) as has_win_methods,
      COUNT(*) FILTER (WHERE vitorias > 0) as has_wins
    FROM lutadores
  `);

  console.log(`\n\n✅ Win Methods Backfill Complete!`);
  console.log(`  Checked: ${checked}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  DB: ${result.has_win_methods}/${result.has_wins} fighters with wins have KO/Sub/Dec data\n`);

  await pool.end();
}

main().catch(console.error);
