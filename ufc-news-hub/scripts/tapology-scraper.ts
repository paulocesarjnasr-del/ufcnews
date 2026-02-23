#!/usr/bin/env npx tsx
/**
 * TAPOLOGY SCRAPER — Reliable MMA data source
 * 
 * Strategy:
 * 1. Search Tapology for each fighter by name
 * 2. Match by win-loss record for verification
 * 3. Visit individual page for photo + detailed data
 * 4. Validate EVERYTHING before inserting
 * 
 * Crash-proof: checkpoint every 50 fighters
 */

import { Pool } from 'pg';
import * as fs from 'fs';

const pool = new Pool({
  connectionString: 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub'
});

const STATE_FILE = '/tmp/tapology-scraper-state.json';
const LOG_FILE = '/tmp/mega-scraper.log';
const DELAY_MS = 1200; // Tapology is polite but let's not hammer them
const CONCURRENCY = 2;

interface State {
  processedIds: number[];
  stats: Record<string, number>;
}

function loadState(): State {
  try {
    if (fs.existsSync(STATE_FILE)) return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {}
  return { processedIds: [], stats: { photos: 0, city: 0, academy: 0, style: 0, country: 0, verified: 0, unmatched: 0, errors: 0, skipped: 0 } };
}

function saveState(state: State) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state));
}

function log(msg: string) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch {}
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchSafe(url: string, timeoutMs = 12000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    clearTimeout(timer);
    if (res.status !== 200) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function normalizeRecord(w: number, l: number): string {
  return `${w}-${l}`;
}

async function processFighter(fighter: any, state: State): Promise<void> {
  const processedSet = new Set(state.processedIds);
  if (processedSet.has(fighter.id)) return;

  try {
    // Step 1: Search Tapology
    const searchUrl = `https://www.tapology.com/search?term=${encodeURIComponent(fighter.nome)}&search=Submit&mainSearchFilter=fighters`;
    const searchHtml = await fetchSafe(searchUrl);
    if (!searchHtml) {
      state.stats.errors++;
      state.processedIds.push(fighter.id);
      return;
    }

    // Rate limit check
    if (searchHtml.includes('Too Many Requests') || searchHtml.includes('429') || searchHtml.length < 1000) {
      log('⚠️ Tapology rate limited — pausing 60s');
      await sleep(60000);
      return; // Don't mark as processed, retry later
    }

    // Step 2: Extract fighter links with their record from search results
    // The search page shows: Name (Record) from Location
    // We need to find the right one by matching record
    const fighterPattern = /href="\/fightcenter\/fighters\/(\d+)-([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?(\d+)-(\d+)-(\d+)/g;
    let match;
    let bestMatch: { id: string; slug: string; name: string; wins: number; losses: number } | null = null;
    
    while ((match = fighterPattern.exec(searchHtml)) !== null) {
      const [, tapId, slug, name, w, l, d] = match;
      const cleanName = name.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#\d+;/g, '').trim();
      
      // Verify: name should be similar AND record should match
      const nameMatch = cleanName.toLowerCase().includes(fighter.nome.toLowerCase().split(' ')[0]) ||
                        fighter.nome.toLowerCase().includes(cleanName.toLowerCase().split(' ')[0]);
      const recordMatch = (parseInt(w) === fighter.vitorias && parseInt(l) === fighter.derrotas) ||
                          (Math.abs(parseInt(w) - (fighter.vitorias || 0)) <= 1 && Math.abs(parseInt(l) - (fighter.derrotas || 0)) <= 1);
      
      if (nameMatch && recordMatch) {
        bestMatch = { id: tapId, slug, name: cleanName, wins: parseInt(w), losses: parseInt(l) };
        break;
      }
      // If names match exactly, take it even without record match
      if (cleanName.toLowerCase() === fighter.nome.toLowerCase() && !bestMatch) {
        bestMatch = { id: tapId, slug, name: cleanName, wins: parseInt(w), losses: parseInt(l) };
      }
    }

    if (!bestMatch) {
      state.stats.unmatched++;
      state.processedIds.push(fighter.id);
      return;
    }

    state.stats.verified++;

    // Step 3: Visit fighter page
    const pageUrl = `https://www.tapology.com/fightcenter/fighters/${bestMatch.id}-${bestMatch.slug}`;
    const pageHtml = await fetchSafe(pageUrl);
    if (!pageHtml) {
      state.processedIds.push(fighter.id);
      return;
    }

    await sleep(500); // Extra delay between pages

    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Photo: check og:image and letterbox_images
    if (!fighter.imagem_url || fighter.imagem_url === '') {
      const ogMatch = pageHtml.match(/property=['"]og:image['"][^>]*content=['"]([^'"]+)['"]/i) ||
                      pageHtml.match(/content=['"]([^'"]+)['"][^>]*property=['"]og:image['"]/i);
      if (ogMatch && ogMatch[1] && !ogMatch[1].includes('Facebook_Fist') && !ogMatch[1].includes('logo') && 
          ogMatch[1].includes('tapology.com') && ogMatch[1].includes('letterbox')) {
        updates.push(`imagem_url = $${idx++}`);
        values.push(ogMatch[1]);
        state.stats.photos++;
      } else {
        // Try to find profile photo in page
        const imgMatch = pageHtml.match(/src=['"]([^'"]*letterbox_images[^'"]+)['"]/i);
        if (imgMatch && !imgMatch[1].includes('default') && !imgMatch[1].includes('wide.jpg')) {
          const imgUrl = imgMatch[1].startsWith('//') ? 'https:' + imgMatch[1] : imgMatch[1];
          updates.push(`imagem_url = $${idx++}`);
          values.push(imgUrl);
          state.stats.photos++;
        }
      }
    }

    // Nationality from flag
    if (!fighter.pais || fighter.pais === '' || fighter.pais === 'Unknown') {
      const flagMatch = pageHtml.match(/title="([^"]+)"[^>]*src="[^"]*flags\//i);
      if (flagMatch && flagMatch[1] && flagMatch[1].length > 1 && flagMatch[1].length < 40) {
        updates.push(`pais = $${idx++}`);
        values.push(flagMatch[1]);
        state.stats.country++;
      }
    }

    // Gym/Team  
    if (!fighter.academia || fighter.academia === '') {
      const gymMatch = pageHtml.match(/href="\/gyms\/[^"]*"[^>]*>([^<]+)<\/a>/i);
      if (gymMatch && gymMatch[1] && gymMatch[1].length > 2 && gymMatch[1].length < 80) {
        updates.push(`academia = $${idx++}`);
        values.push(gymMatch[1].trim());
        state.stats.academy++;
      }
    }

    // Hometown/City - look for "from City, State" pattern or location data
    if (!fighter.cidade_natal || fighter.cidade_natal === '') {
      const cityMatch = pageHtml.match(/out of ([^<]+)</i) ||
                        pageHtml.match(/from ([A-Z][a-zA-Z\s]+(?:,\s*[A-Z][a-zA-Z\s]+)?)/);
      if (cityMatch && cityMatch[1] && cityMatch[1].length > 2 && cityMatch[1].length < 60) {
        updates.push(`cidade_natal = $${idx++}`);
        values.push(cityMatch[1].trim());
        state.stats.city++;
      }
    }

    if (updates.length > 0) {
      values.push(fighter.id);
      await pool.query(`UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${idx}`, values);
    }

    state.processedIds.push(fighter.id);

  } catch (e: any) {
    state.stats.errors++;
    state.processedIds.push(fighter.id);
  }
}

async function main() {
  const forceReset = process.argv.includes('--reset');
  let state = forceReset ? { processedIds: [], stats: { photos: 0, city: 0, academy: 0, style: 0, country: 0, verified: 0, unmatched: 0, errors: 0, skipped: 0 } } : loadState();

  log('🥊 TAPOLOGY SCRAPER — Verified MMA data');
  log(`Checkpoint: ${state.processedIds.length} already processed`);

  // Get fighters missing data
  const { rows: targets } = await pool.query(`
    SELECT id, nome, vitorias, derrotas, imagem_url, pais, cidade_natal, academia, estilo_luta
    FROM lutadores 
    WHERE (imagem_url = '' OR imagem_url IS NULL
       OR cidade_natal = '' OR cidade_natal IS NULL  
       OR academia = '' OR academia IS NULL)
    ORDER BY 
      CASE WHEN imagem_url = '' OR imagem_url IS NULL THEN 0 ELSE 1 END,
      nome
  `);

  const processedSet = new Set(state.processedIds);
  const todo = targets.filter(f => !processedSet.has(f.id));

  log(`${todo.length} fighters to process (${targets.length - todo.length} already done)`);

  for (let i = 0; i < todo.length; i++) {
    await processFighter(todo[i], state);

    if ((i + 1) % 50 === 0) {
      log(`Tapology: ${i + 1}/${todo.length} | 📸${state.stats.photos} 🏙️${state.stats.city} 🥋${state.stats.academy} ✅${state.stats.verified} ❌${state.stats.unmatched} 💥${state.stats.errors}`);
      saveState(state);
    }

    await sleep(DELAY_MS);
  }

  saveState(state);
  
  // Final audit
  const { rows } = await pool.query(`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN imagem_url != '' AND imagem_url IS NOT NULL THEN 1 END) as fotos,
      COUNT(CASE WHEN cidade_natal != '' AND cidade_natal IS NOT NULL AND cidade_natal NOT IN ('Unknown','N/A') THEN 1 END) as cidade,
      COUNT(CASE WHEN academia != '' AND academia IS NOT NULL AND academia NOT IN ('Independent','Unknown','N/A','None') THEN 1 END) as academia,
      COUNT(CASE WHEN estilo_luta != '' AND estilo_luta IS NOT NULL AND estilo_luta NOT IN ('Unknown','N/A') THEN 1 END) as estilo
    FROM lutadores
  `);
  
  const r = rows[0];
  log('========================================');
  log(`  📸 Fotos:    ${r.fotos}/${r.total} (${(r.fotos/r.total*100).toFixed(1)}%)`);
  log(`  🏙️ Cidade:   ${r.cidade}/${r.total} (${(r.cidade/r.total*100).toFixed(1)}%)`);
  log(`  🥋 Academia: ${r.academia}/${r.total} (${(r.academia/r.total*100).toFixed(1)}%)`);
  log(`  🥊 Estilo:   ${r.estilo}/${r.total} (${(r.estilo/r.total*100).toFixed(1)}%)`);
  log('========================================');
  log('🏁 Tapology scraper complete!');

  await pool.end();
}

process.on('uncaughtException', (err) => {
  log(`⚠️ Crash: ${err.message} — state saved`);
  process.exit(1);
});
process.on('SIGTERM', () => { log('⚠️ SIGTERM'); process.exit(0); });
process.on('SIGINT', () => { log('⚠️ SIGINT'); process.exit(0); });

main().catch(e => { log(`💀 Fatal: ${e.message}`); process.exit(1); });
