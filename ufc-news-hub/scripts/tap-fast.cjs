#!/usr/bin/env node
/**
 * TAPOLOGY FAST SCRAPER — Pure Node.js, no tsx needed
 * Crash-proof with checkpoints. Validates by name match.
 */
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({ connectionString: 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub' });
const STATE = '/tmp/tap-fast-state.json';
const LOG = '/tmp/mega-scraper.log';
const DELAY = 1500;

const stats = { photos: 0, city: 0, academy: 0, style: 0, verified: 0, unmatched: 0, errors: 0 };
let processed = new Set();

function loadState() {
  try {
    if (fs.existsSync(STATE)) {
      const d = JSON.parse(fs.readFileSync(STATE, 'utf8'));
      processed = new Set(d.processed || []);
      Object.assign(stats, d.stats || {});
    }
  } catch {}
}

function saveState() {
  fs.writeFileSync(STATE, JSON.stringify({ processed: [...processed], stats }));
}

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOG, line + '\n'); } catch {}
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchPage(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' }
    });
    clearTimeout(timer);
    if (res.status === 429) { log('⚠️ Rate limited — pausing 60s'); await sleep(60000); return null; }
    if (res.status !== 200) return null;
    return await res.text();
  } catch { return null; }
}

function normalizeForMatch(name) {
  return decodeEntities(name).toLowerCase()
    .replace(/["']/g, '').replace(/\s+/g, ' ').trim();
}

function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeFighter(f) {
  if (processed.has(f.id)) return;

  try {
    // Search
    const searchHtml = await fetchPage(`https://www.tapology.com/search?term=${encodeURIComponent(f.nome)}&search=Submit&mainSearchFilter=fighters`);
    if (!searchHtml) { processed.add(f.id); stats.errors++; return; }

    // Find matching fighter
    const pattern = /href="\/fightcenter\/fighters\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
    let match;
    let bestUrl = null;
    const fNameNorm = normalizeForMatch(f.nome);
    const fNameParts = fNameNorm.split(' ');
    const firstName = fNameParts[0];
    const lastName = fNameParts[fNameParts.length - 1];

    while ((match = pattern.exec(searchHtml)) !== null) {
      const slug = match[1];
      const resultName = normalizeForMatch(match[2]);
      // Must match first AND last name
      if (resultName.includes(firstName) && resultName.includes(lastName)) {
        bestUrl = `/fightcenter/fighters/${slug}`;
        stats.verified++;
        break;
      }
    }

    if (!bestUrl) { processed.add(f.id); stats.unmatched++; return; }

    // Visit fighter page
    await sleep(500);
    const pageHtml = await fetchPage(`https://www.tapology.com${bestUrl}`);
    if (!pageHtml) { processed.add(f.id); return; }

    const updates = [];
    const values = [];
    let idx = 1;

    // Photo from og:image (must be letterbox, not generic logo)
    if (!f.imagem_url || f.imagem_url === '') {
      const ogMatch = pageHtml.match(/content=['"]([^'"]+)['"][^>]*property=['"]og:image['"]/i) ||
                      pageHtml.match(/property=['"]og:image['"][^>]*content=['"]([^'"]+)['"]/i);
      if (ogMatch && ogMatch[1] && ogMatch[1].includes('letterbox_images') && !ogMatch[1].includes('wide.jpg')) {
        updates.push(`imagem_url = $${idx++}`);
        values.push(ogMatch[1]);
        stats.photos++;
      }
    }

    // Gym
    if (!f.academia || f.academia === '') {
      const gymMatch = pageHtml.match(/href="\/gyms\/[^"]*"[^>]*class="[^"]*link-primary[^"]*"[^>]*>([^<]+)/i) ||
                       pageHtml.match(/href="\/gyms\/[^"]*"[^>]*>([^<]+)<\/a>/i);
      if (gymMatch && gymMatch[1].trim().length > 2 && gymMatch[1].trim().length < 80) {
        updates.push(`academia = $${idx++}`);
        values.push(decodeEntities(gymMatch[1]));
        stats.academy++;
      }
    }

    // City from meta description ("out of City, State")
    if (!f.cidade_natal || f.cidade_natal === '') {
      const descMatch = pageHtml.match(/content=['"]([^'"]+out of ([^'"]+))['"]/i);
      if (descMatch && descMatch[2]) {
        let city = decodeEntities(descMatch[2].split('.')[0]);
        if (city.length > 2 && city.length < 60) {
          updates.push(`cidade_natal = $${idx++}`);
          values.push(city);
          stats.city++;
        }
      }
    }

    if (updates.length > 0) {
      values.push(f.id);
      await pool.query(`UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${idx}`, values);
    }

    processed.add(f.id);
  } catch (e) {
    stats.errors++;
    processed.add(f.id);
  }
}

async function main() {
  if (process.argv.includes('--reset')) {
    processed = new Set();
    Object.keys(stats).forEach(k => stats[k] = 0);
  } else {
    loadState();
  }

  log('🥊 TAPOLOGY FAST SCRAPER');
  log(`Checkpoint: ${processed.size} already done`);

  const { rows } = await pool.query(`
    SELECT id, nome, vitorias, derrotas, imagem_url, pais, cidade_natal, academia, estilo_luta
    FROM lutadores 
    WHERE (imagem_url = '' OR imagem_url IS NULL
       OR cidade_natal = '' OR cidade_natal IS NULL  
       OR academia = '' OR academia IS NULL)
    ORDER BY CASE WHEN imagem_url = '' OR imagem_url IS NULL THEN 0 ELSE 1 END, nome
  `);

  const todo = rows.filter(f => !processed.has(f.id));
  log(`${todo.length} fighters to process`);

  for (let i = 0; i < todo.length; i++) {
    await scrapeFighter(todo[i]);

    if ((i + 1) % 25 === 0) {
      log(`Tap: ${i + 1}/${todo.length} | 📸${stats.photos} 🏙️${stats.city} 🥋${stats.academy} ✅${stats.verified} ❌${stats.unmatched} 💥${stats.errors}`);
      saveState();
    }

    await sleep(DELAY);
  }

  saveState();

  // Audit
  const { rows: audit } = await pool.query(`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN imagem_url != '' AND imagem_url IS NOT NULL THEN 1 END) as fotos,
      COUNT(CASE WHEN cidade_natal != '' AND cidade_natal IS NOT NULL AND cidade_natal NOT IN ('Unknown','N/A') THEN 1 END) as cidade,
      COUNT(CASE WHEN academia != '' AND academia IS NOT NULL AND academia NOT IN ('Independent','Unknown','N/A','None') THEN 1 END) as academia,
      COUNT(CASE WHEN estilo_luta != '' AND estilo_luta IS NOT NULL AND estilo_luta NOT IN ('Unknown','N/A') THEN 1 END) as estilo
    FROM lutadores
  `);
  const r = audit[0];
  log(`FINAL: 📸${r.fotos}/${r.total} 🏙️${r.cidade} 🥋${r.academia} 🥊${r.estilo}`);
  log('🏁 Done!');
  await pool.end();
}

process.on('SIGTERM', () => { saveState(); process.exit(0); });
process.on('SIGINT', () => { saveState(); process.exit(0); });
process.on('uncaughtException', (e) => { log('⚠️ Crash: ' + e.message); saveState(); process.exit(1); });

main().catch(e => { log('💀 ' + e.message); process.exit(1); });
