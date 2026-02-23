/**
 * UFC Rankings Scraper — Fetches current rankings from UFC.com
 * Updates ranking_divisao: 0 = Champion, 1-15 = ranked position
 */

import * as cheerio from 'cheerio';
import pg from 'pg';

const DATABASE_URL = 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// Fuzzy name match: "Islam Makhachev" → tries exact, then ILIKE
async function updateRanking(pool: pg.Pool, name: string, rank: number): Promise<boolean> {
  // Clean name
  const clean = name.replace(/\s+/g, ' ').trim();
  if (!clean || clean.length < 3) return false;

  // Try exact match first
  let res = await pool.query(
    `UPDATE lutadores SET ranking_divisao = $1 WHERE lower(nome) = lower($2) AND ranking_divisao IS NULL`,
    [rank, clean]
  );
  if (res.rowCount && res.rowCount > 0) return true;

  // Try ILIKE fuzzy
  res = await pool.query(
    `UPDATE lutadores SET ranking_divisao = $1 WHERE lower(replace(nome, '.', '')) = lower(replace($2, '.', '')) AND ranking_divisao IS NULL`,
    [rank, clean]
  );
  if (res.rowCount && res.rowCount > 0) return true;

  return false;
}

async function main() {
  console.log('\n🏆 UFC Rankings Scraper\n');

  const pool = new pg.Pool({ connectionString: DATABASE_URL });

  // Clear existing rankings
  await pool.query(`UPDATE lutadores SET ranking_divisao = NULL`);
  console.log('  Cleared existing rankings\n');

  const html = await fetch('https://www.ufc.com/rankings', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
  }).then(r => r.text());

  const $ = cheerio.load(html);
  let totalUpdated = 0;
  let notFound: string[] = [];

  // Structure: each .view-grouping has:
  //   .view-grouping-header → division name  
  //   table > caption > .rankings--athlete--champion > h5 > a → champion
  //   table > tbody > tr > td.views-field-title > a → ranked fighters
  //   table > tbody > tr > td.views-field-weight-class-rank → rank number

  $('.view-grouping').each((_, groupEl) => {
    const header = $(groupEl).find('.view-grouping-header').first().text().trim();
    
    // Skip P4P
    if (header.toLowerCase().includes('pound-for-pound')) {
      console.log(`  ⏭️  Skipping: ${header}`);
      return;
    }

    const division = header.replace(/&#039;/g, "'").trim();
    console.log(`\n  📋 ${division}`);

    // Champion: inside caption > .rankings--athlete--champion > h5 > a
    const champEl = $(groupEl).find('.rankings--athlete--champion h5 a');
    if (champEl.length > 0) {
      const champName = champEl.text().trim();
      if (champName) {
        updateRanking(pool, champName, 0).then(found => {
          if (found) {
            console.log(`    👑 Champion: ${champName}`);
            totalUpdated++;
          } else {
            console.log(`    ⚠️  Champion NOT in DB: ${champName}`);
            notFound.push(`${champName} (Champion - ${division})`);
          }
        });
      }
    }

    // Ranked fighters: table > tbody > tr
    $(groupEl).find('table tbody tr').each((_, row) => {
      const rankTd = $(row).find('td.views-field-weight-class-rank');
      const nameTd = $(row).find('td.views-field-title a');
      
      const rankNum = parseInt(rankTd.text().trim());
      const fighterName = nameTd.text().trim();

      if (rankNum && rankNum >= 1 && rankNum <= 15 && fighterName) {
        updateRanking(pool, fighterName, rankNum).then(found => {
          if (found) {
            totalUpdated++;
          } else {
            notFound.push(`${fighterName} (#${rankNum} - ${division})`);
          }
        });
      }
    });
  });

  // Wait for all async updates
  await sleep(5000);

  // Verify
  const { rows: summary } = await pool.query(`
    SELECT ranking_divisao as rank, COUNT(*) as cnt 
    FROM lutadores WHERE ranking_divisao IS NOT NULL 
    GROUP BY ranking_divisao ORDER BY ranking_divisao
  `);

  const totalRanked = summary.reduce((s, r) => s + parseInt(r.cnt), 0);

  console.log(`\n\n📊 Results:`);
  for (const s of summary) {
    const label = s.rank === 0 ? 'Champions' : `#${s.rank}`;
    console.log(`  ${label}: ${s.cnt}`);
  }
  console.log(`\n  ✅ Total ranked: ${totalRanked}`);

  if (notFound.length > 0) {
    console.log(`\n  ⚠️  Not found in DB (${notFound.length}):`);
    for (const nf of notFound) {
      console.log(`    - ${nf}`);
    }
  }

  // Show ranked by division
  const { rows: ranked } = await pool.query(`
    SELECT nome, ranking_divisao, categoria_peso
    FROM lutadores WHERE ranking_divisao IS NOT NULL
    ORDER BY categoria_peso, ranking_divisao
  `);

  console.log('\n🏆 All ranked fighters:');
  let currentDiv = '';
  for (const r of ranked) {
    const div = r.categoria_peso || 'Unknown';
    if (div !== currentDiv) {
      currentDiv = div;
      console.log(`\n  📋 ${div}:`);
    }
    const label = r.ranking_divisao === 0 ? '👑' : `#${r.ranking_divisao}`;
    console.log(`    ${label} ${r.nome}`);
  }

  await pool.end();
  console.log('\n\n✅ Rankings complete!\n');
}

main().catch(console.error);
