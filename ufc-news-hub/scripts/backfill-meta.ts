/**
 * BACKFILL META - Populate empty columns from UFC.com + UFCStats.com
 * 
 * Targets: pais, cidade_natal, categoria_peso, academia, estilo_luta, ranking_divisao
 * Also fills: apelido, envergadura, nocautes, finalizacoes, decisoes where missing
 * 
 * Sources:
 * - UFC.com athlete pages: Place of Birth, Trains at, Division, fighting style
 * - UFCStats.com listings: weight class (already scraped in Phase 1)
 * - UFCStats.com detail pages: reach, DOB (for missing)
 * 
 * Usage: npx tsx scripts/backfill-meta.ts
 */

import * as cheerio from 'cheerio';
import pg from 'pg';

const DATABASE_URL = 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub';
const RATE_LIMIT_MS = 250;
const BATCH_LOG = 50;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

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
        if (res.status === 404) return '';
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.text();
    } catch (err: any) {
      if (i < retries - 1) {
        await sleep(2000 * (i + 1));
      }
    }
  }
  return '';
}

function makeSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Weight class mapping from UFCStats format to Portuguese
const WEIGHT_MAP: Record<string, string> = {
  'strawweight': 'Strawweight',
  'flyweight': 'Flyweight',
  'bantamweight': 'Bantamweight',
  'featherweight': 'Featherweight',
  'lightweight': 'Lightweight',
  'welterweight': 'Welterweight',
  'middleweight': 'Middleweight',
  'light heavyweight': 'Light Heavyweight',
  'heavyweight': 'Heavyweight',
  "women's strawweight": "Women's Strawweight",
  "women's flyweight": "Women's Flyweight",
  "women's bantamweight": "Women's Bantamweight",
  "women's featherweight": "Women's Featherweight",
};

// ─── Phase A: Weight class from UFCStats listings ────────────────────────────

async function scrapeWeightClasses(pool: pg.Pool): Promise<number> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE A: Weight classes from UFCStats.com listings');
  console.log('═══════════════════════════════════════════════════════');

  // Load all DB fighters  
  const { rows: dbFighters } = await pool.query<{ id: string; nome: string }>(
    `SELECT id, nome FROM lutadores WHERE categoria_peso IS NULL OR categoria_peso = ''`
  );
  console.log(`  ${dbFighters.length} fighters missing weight class`);

  // Build name→id map
  const nameMap = new Map<string, string>();
  for (const f of dbFighters) {
    nameMap.set(f.nome.toLowerCase().trim(), f.id);
  }

  let updated = 0;
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  for (const letter of letters) {
    const url = `http://ufcstats.com/statistics/fighters?char=${letter}&page=all`;
    const html = await fetchWithRetry(url);
    if (!html) { await sleep(RATE_LIMIT_MS); continue; }

    const $ = cheerio.load(html);
    const rows = $('table.b-statistics__table tbody tr');

    rows.each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length < 11) return;

      const firstName = $(cols[0]).text().trim();
      const lastName = $(cols[1]).text().trim();
      const fullName = `${firstName} ${lastName}`.trim();
      const weight = $(cols[5]).text().trim(); // Weight column

      if (!fullName || !weight || weight === '--') return;

      const id = nameMap.get(fullName.toLowerCase());
      if (!id) return;

      // Determine weight class from weight
      // UFCStats gives weight in "155 lbs." format
      const lbs = parseInt(weight);
      let weightClass = '';
      if (lbs <= 115) weightClass = "Women's Strawweight";
      else if (lbs <= 125) weightClass = 'Flyweight';
      else if (lbs <= 135) weightClass = 'Bantamweight';
      else if (lbs <= 145) weightClass = 'Featherweight';
      else if (lbs <= 155) weightClass = 'Lightweight';
      else if (lbs <= 170) weightClass = 'Welterweight';
      else if (lbs <= 185) weightClass = 'Middleweight';
      else if (lbs <= 205) weightClass = 'Light Heavyweight';
      else weightClass = 'Heavyweight';

      // Queue for update (do it inline)
      pool.query(
        `UPDATE lutadores SET categoria_peso = $1 WHERE id = $2 AND (categoria_peso IS NULL OR categoria_peso = '')`,
        [weightClass, id]
      ).then(() => { updated++; }).catch(() => {});
    });

    process.stdout.write(`  [${letter.toUpperCase()}]`);
    await sleep(RATE_LIMIT_MS);
  }

  // Wait for all updates to settle
  await sleep(2000);
  console.log(`\n✅ Phase A complete: ${updated} weight classes updated\n`);
  return updated;
}

// ─── Phase B: UFC.com scraping for bio data ──────────────────────────────────

interface BioData {
  pais?: string;
  cidade_natal?: string;
  academia?: string;
  categoria_peso?: string;
  estilo_luta?: string;
}

function parseUFCBio(html: string): BioData {
  const $ = cheerio.load(html);
  const data: BioData = {};

  // Place of Birth → pais + cidade_natal
  const bioRows = $('.c-bio__row--3col, .c-bio__row--2col, [class*="c-bio__row"]');
  bioRows.each((_, el) => {
    const label = $(el).find('.c-bio__label').text().trim().toLowerCase();
    const text = $(el).find('.c-bio__text').text().trim();
    if (!text || text === '--') return;

    if (label.includes('place of birth')) {
      // Format: "City, Country" or "City, State, Country"
      const parts = text.split(',').map(s => s.trim());
      if (parts.length >= 2) {
        data.pais = parts[parts.length - 1];
        data.cidade_natal = parts.slice(0, -1).join(', ');
      } else if (parts.length === 1) {
        data.pais = parts[0];
      }
    }

    if (label.includes('trains at') || label.includes('team')) {
      data.academia = text;
    }
  });

  // Division → categoria_peso
  const divisionText = $('.hero-profile__division-title').first().text().trim();
  if (divisionText) {
    // Remove " Division" suffix
    const div = divisionText.replace(/\s*Division\s*$/i, '').trim();
    if (div && div.length > 2) {
      data.categoria_peso = div;
    }
  }

  // Fighting style from meta or bio
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  // Try to find fighting style in bio fields
  bioRows.each((_, el) => {
    const label = $(el).find('.c-bio__label').text().trim().toLowerCase();
    const text = $(el).find('.c-bio__text').text().trim();
    if (label.includes('fighting style') || label.includes('style')) {
      if (text && text !== '--') data.estilo_luta = text;
    }
  });

  return data;
}

async function scrapeUFCBios(pool: pg.Pool): Promise<{ pais: number; cidade: number; academia: number; categoria: number; estilo: number }> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE B: Bio data from UFC.com athlete pages');
  console.log('═══════════════════════════════════════════════════════');

  // Get fighters that still need data (skip fully-populated ones)
  const { rows: fighters } = await pool.query<{ 
    id: string; nome: string; pais: string | null; cidade_natal: string | null;
    academia: string | null; categoria_peso: string | null; estilo_luta: string | null;
  }>(
    `SELECT id, nome, pais, cidade_natal, academia, categoria_peso, estilo_luta 
     FROM lutadores 
     WHERE (pais IS NULL OR pais = '')
        OR (cidade_natal IS NULL OR cidade_natal = '')
        OR (academia IS NULL OR academia = '')
        OR (categoria_peso IS NULL OR categoria_peso = '')
        OR (estilo_luta IS NULL OR estilo_luta = '')
     ORDER BY nome`
  );

  console.log(`  ${fighters.length} total fighters to check`);

  const counts = { pais: 0, cidade: 0, academia: 0, categoria: 0, estilo: 0 };
  let checked = 0;
  let found = 0;
  let notFound = 0;

  for (const fighter of fighters) {
    checked++;
    if (checked % BATCH_LOG === 0) {
      console.log(`  📋 ${checked}/${fighters.length} checked | found: ${found} | 404: ${notFound} | país: ${counts.pais} | academia: ${counts.academia} | categoria: ${counts.categoria}`);
    }

    const slug = makeSlug(fighter.nome);
    const html = await fetchWithRetry(`https://www.ufc.com/athlete/${slug}`);
    
    if (!html) {
      notFound++;
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    found++;
    const bio = parseUFCBio(html);

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (bio.pais && (!fighter.pais || fighter.pais === '')) {
      updates.push(`pais = $${idx++}`);
      values.push(bio.pais);
      counts.pais++;
    }
    if (bio.cidade_natal && (!fighter.cidade_natal || fighter.cidade_natal === '')) {
      updates.push(`cidade_natal = $${idx++}`);
      values.push(bio.cidade_natal);
      counts.cidade++;
    }
    if (bio.academia && (!fighter.academia || fighter.academia === '')) {
      updates.push(`academia = $${idx++}`);
      values.push(bio.academia);
      counts.academia++;
    }
    if (bio.categoria_peso && (!fighter.categoria_peso || fighter.categoria_peso === '')) {
      updates.push(`categoria_peso = $${idx++}`);
      values.push(bio.categoria_peso);
      counts.categoria++;
    }
    if (bio.estilo_luta && (!fighter.estilo_luta || fighter.estilo_luta === '')) {
      updates.push(`estilo_luta = $${idx++}`);
      values.push(bio.estilo_luta);
      counts.estilo++;
    }

    if (updates.length > 0) {
      updates.push(`updated_at = NOW()`);
      values.push(fighter.id);
      await pool.query(
        `UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${idx}`,
        values
      );
    }

    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\n✅ Phase B complete:`);
  console.log(`  Pages found: ${found}/${fighters.length}`);
  console.log(`  País: ${counts.pais} | Cidade: ${counts.cidade} | Academia: ${counts.academia}`);
  console.log(`  Categoria: ${counts.categoria} | Estilo: ${counts.estilo}\n`);

  return counts;
}

// ─── Phase C: Infer estilo_luta from stats ───────────────────────────────────

async function inferFightingStyles(pool: pg.Pool): Promise<number> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE C: Inferring fighting styles from stats');
  console.log('═══════════════════════════════════════════════════════');

  // For fighters still missing estilo_luta, infer from their stats
  const { rows: fighters } = await pool.query<{
    id: string; slpm: number | null; td_avg: number | null; sub_avg: number | null;
    str_acc: number | null; nocautes: number | null; finalizacoes: number | null;
    vitorias: number | null;
  }>(
    `SELECT id, slpm, td_avg, sub_avg, str_acc, nocautes, finalizacoes, vitorias
     FROM lutadores 
     WHERE (estilo_luta IS NULL OR estilo_luta = '')
     AND (slpm > 0 OR td_avg > 0 OR sub_avg > 0)`
  );

  console.log(`  ${fighters.length} fighters to classify`);
  let updated = 0;

  for (const f of fighters) {
    const slpm = f.slpm || 0;
    const tdAvg = f.td_avg || 0;
    const subAvg = f.sub_avg || 0;
    const wins = f.vitorias || 1;
    const kos = f.nocautes || 0;
    const subs = f.finalizacoes || 0;
    const koRate = kos / wins;
    const subRate = subs / wins;

    let style = '';

    // Classification logic
    if (slpm > 5 && tdAvg < 1 && subAvg < 0.5) {
      style = 'Striker';
    } else if (tdAvg > 3 && slpm < 3) {
      style = 'Wrestler';
    } else if (subAvg > 1.5 || subRate > 0.5) {
      style = 'Grappler';
    } else if (koRate > 0.6 && slpm > 3) {
      style = 'Knockout Artist';
    } else if (tdAvg > 2 && slpm > 3) {
      style = 'MMA';
    } else if (slpm > 3) {
      style = 'Striker';
    } else if (tdAvg > 1.5) {
      style = 'Wrestler';
    } else {
      style = 'MMA';
    }

    if (style) {
      await pool.query(
        `UPDATE lutadores SET estilo_luta = $1, updated_at = NOW() WHERE id = $2`,
        [style, f.id]
      );
      updated++;
    }
  }

  console.log(`✅ Phase C complete: ${updated} fighting styles inferred\n`);
  return updated;
}

// ─── Phase D: UFC Rankings ───────────────────────────────────────────────────

async function scrapeRankings(pool: pg.Pool): Promise<number> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE D: UFC Rankings from UFC.com');
  console.log('═══════════════════════════════════════════════════════');

  const html = await fetchWithRetry('https://www.ufc.com/rankings');
  if (!html) {
    console.log('  ❌ Failed to fetch rankings page');
    return 0;
  }

  const $ = cheerio.load(html);
  let updated = 0;

  // Each division has a section
  $('[class*="view-grouping"]').each((_, section) => {
    const divisionTitle = $(section).find('[class*="view-grouping-header"]').text().trim();
    if (!divisionTitle) return;

    // Clean division name
    const division = divisionTitle
      .replace(/\s*Division\s*/i, '')
      .replace(/UFC\s*/i, '')
      .replace(/Pound-for-Pound.*/i, '')
      .trim();

    if (!division || division.toLowerCase().includes('pound')) return;

    // Champion
    const champion = $(section).find('[class*="champion"] [class*="name"]').text().trim();
    if (champion) {
      pool.query(
        `UPDATE lutadores SET ranking_divisao = 0 
         WHERE lower(nome) = lower($1) AND (ranking_divisao IS NULL OR ranking_divisao != 0)`,
        [champion]
      ).then(r => { if (r.rowCount && r.rowCount > 0) updated++; }).catch(() => {});
    }

    // Ranked fighters
    $(section).find('[class*="views-row"]').each((rank, row) => {
      const name = $(row).find('[class*="name"]').text().trim();
      if (!name) return;
      const ranking = rank + 1; // 1-indexed

      pool.query(
        `UPDATE lutadores SET ranking_divisao = $1 
         WHERE lower(nome) = lower($2) AND (ranking_divisao IS NULL)`,
        [ranking, name]
      ).then(r => { if (r.rowCount && r.rowCount > 0) updated++; }).catch(() => {});
    });
  });

  await sleep(3000); // wait for all async updates
  console.log(`✅ Phase D complete: ${updated} rankings updated\n`);
  return updated;
}

// ─── Phase E: Win method breakdown from UFCStats ─────────────────────────────

async function backfillWinMethods(pool: pg.Pool): Promise<number> {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PHASE E: Win methods from UFCStats detail pages');
  console.log('═══════════════════════════════════════════════════════');

  // Get fighters with url_perfil but missing win method breakdown
  const { rows: fighters } = await pool.query<{ id: string; url_perfil: string; nome: string }>(
    `SELECT id, url_perfil, nome FROM lutadores 
     WHERE url_perfil IS NOT NULL AND url_perfil != ''
     AND (nocautes = 0 OR nocautes IS NULL)
     AND (finalizacoes = 0 OR finalizacoes IS NULL)
     AND (decisoes = 0 OR decisoes IS NULL)
     AND vitorias > 0`
  );

  console.log(`  ${fighters.length} fighters need win method data`);
  let updated = 0;
  let checked = 0;

  for (const fighter of fighters) {
    checked++;
    if (checked % BATCH_LOG === 0) {
      console.log(`  🥊 ${checked}/${fighters.length} (updated: ${updated})`);
    }

    const html = await fetchWithRetry(fighter.url_perfil);
    if (!html) { await sleep(RATE_LIMIT_MS); continue; }

    const $ = cheerio.load(html);
    
    // Count wins by method from fight history
    let kos = 0, subs = 0, decs = 0;
    
    $('tr.b-fight-details__table-row').each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length < 10) return;
      
      const result = $(cols[0]).text().trim().toLowerCase();
      if (result !== 'win') return;
      
      const method = $(cols[7]).text().trim().toUpperCase();
      if (method.includes('KO') || method.includes('TKO')) kos++;
      else if (method.includes('SUB')) subs++;
      else if (method.includes('DEC') || method.includes('U-DEC') || method.includes('S-DEC') || method.includes('M-DEC')) decs++;
    });

    if (kos > 0 || subs > 0 || decs > 0) {
      await pool.query(
        `UPDATE lutadores SET nocautes = $1, finalizacoes = $2, decisoes = $3, updated_at = NOW() WHERE id = $4`,
        [kos, subs, decs, fighter.id]
      );
      updated++;
    }

    await sleep(RATE_LIMIT_MS);
  }

  console.log(`✅ Phase E complete: ${updated} win methods updated\n`);
  return updated;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║    UFC Fighter META Backfill Script                  ║');
  console.log('║    Targets: país, cidade, academia, categoria,       ║');
  console.log('║    estilo, ranking, win methods                      ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  const pool = new pg.Pool({ connectionString: DATABASE_URL });

  try {
    const { rows } = await pool.query('SELECT COUNT(*) as count FROM lutadores');
    console.log(`📊 Database connected. ${rows[0].count} fighters\n`);

    // Phase A: Weight classes — skip if already populated
    const { rows: catCheck } = await pool.query(`SELECT COUNT(*) as c FROM lutadores WHERE categoria_peso IS NOT NULL AND categoria_peso != ''`);
    let weightClassUpdated = 0;
    if (parseInt(catCheck[0].c) > 400) {
      console.log(`⏭️  Skipping Phase A (${catCheck[0].c} already have weight class)\n`);
    } else {
      weightClassUpdated = await scrapeWeightClasses(pool);
    }

    // Phase B: UFC.com bio data (país, cidade, academia, categoria, estilo)
    // This is the big one - 4444 requests
    const bioCounts = await scrapeUFCBios(pool);

    // Phase C: Infer fighting styles from stats (for those UFC.com didn't have)
    const stylesInferred = await inferFightingStyles(pool);

    // Phase D: Rankings
    const rankingsUpdated = await scrapeRankings(pool);

    // Phase E: Win methods from UFCStats detail pages
    const winMethodsUpdated = await backfillWinMethods(pool);

    // Final summary
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║                 FINAL SUMMARY                        ║');
    console.log('╠═══════════════════════════════════════════════════════╣');
    console.log(`║  Weight classes (Phase A):  ${String(weightClassUpdated).padStart(22)} ║`);
    console.log(`║  País (Phase B):           ${String(bioCounts.pais).padStart(22)} ║`);
    console.log(`║  Cidade (Phase B):         ${String(bioCounts.cidade).padStart(22)} ║`);
    console.log(`║  Academia (Phase B):       ${String(bioCounts.academia).padStart(22)} ║`);
    console.log(`║  Categoria (Phase B):      ${String(bioCounts.categoria).padStart(22)} ║`);
    console.log(`║  Estilo UFC.com (Phase B): ${String(bioCounts.estilo).padStart(22)} ║`);
    console.log(`║  Estilo inferred (Phase C):${String(stylesInferred).padStart(22)} ║`);
    console.log(`║  Rankings (Phase D):       ${String(rankingsUpdated).padStart(22)} ║`);
    console.log(`║  Win methods (Phase E):    ${String(winMethodsUpdated).padStart(22)} ║`);
    console.log('╚═══════════════════════════════════════════════════════╝');

    // Verify
    const { rows: verify } = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN pais IS NOT NULL AND pais != '' THEN 1 END) as has_pais,
        COUNT(CASE WHEN cidade_natal IS NOT NULL AND cidade_natal != '' THEN 1 END) as has_cidade,
        COUNT(CASE WHEN academia IS NOT NULL AND academia != '' THEN 1 END) as has_academia,
        COUNT(CASE WHEN categoria_peso IS NOT NULL AND categoria_peso != '' THEN 1 END) as has_categoria,
        COUNT(CASE WHEN estilo_luta IS NOT NULL AND estilo_luta != '' THEN 1 END) as has_estilo,
        COUNT(CASE WHEN ranking_divisao IS NOT NULL THEN 1 END) as has_ranking,
        COUNT(CASE WHEN nocautes > 0 OR finalizacoes > 0 OR decisoes > 0 THEN 1 END) as has_win_methods,
        COUNT(CASE WHEN imagem_url IS NOT NULL AND imagem_url != '' THEN 1 END) as has_photo
      FROM lutadores
    `);

    console.log('\n📊 Final DB state:');
    console.log(`  Total:        ${verify[0].total}`);
    console.log(`  País:         ${verify[0].has_pais}`);
    console.log(`  Cidade:       ${verify[0].has_cidade}`);
    console.log(`  Academia:     ${verify[0].has_academia}`);
    console.log(`  Categoria:    ${verify[0].has_categoria}`);
    console.log(`  Estilo:       ${verify[0].has_estilo}`);
    console.log(`  Ranking:      ${verify[0].has_ranking}`);
    console.log(`  Win methods:  ${verify[0].has_win_methods}`);
    console.log(`  Photos:       ${verify[0].has_photo}`);

  } catch (err) {
    console.error('Fatal error:', err);
  } finally {
    await pool.end();
  }
}

main();
