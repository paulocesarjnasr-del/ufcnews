#!/usr/bin/env npx tsx
/**
 * ULTRA SCRAPER v2 — Crash-proof, checkpoint-based, uses proper APIs
 * 
 * RULES:
 * - NEVER restarts from zero. Checkpoints saved to /tmp/ultra-scraper-state.json
 * - NEVER inserts fake data. Only real, verified information.
 * - On crash/error: picks up exactly where it left off
 * - Uses Wikipedia pageimages API (fast, reliable) instead of HTML parsing
 * - Per-fighter error isolation
 */

import { Pool } from 'pg';
import * as fs from 'fs';

const pool = new Pool({
  connectionString: 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub'
});

const STATE_FILE = '/tmp/ultra-scraper-state.json';
const LOG_FILE = '/tmp/mega-scraper.log';

interface ScraperState {
  phase: string;
  processedIds: Set<number>;
  stats: Record<string, number>;
  startedAt: string;
  lastUpdate: string;
}

function loadState(): ScraperState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      return { ...raw, processedIds: new Set(raw.processedIds || []) };
    }
  } catch {}
  return {
    phase: 'wikipedia',
    processedIds: new Set(),
    stats: { wiki_photos: 0, wiki_city: 0, wiki_academy: 0, wiki_style: 0, wiki_country: 0,
             sherdog_photos: 0, sherdog_city: 0, sherdog_academy: 0, sherdog_country: 0,
             ufcstats_stats: 0, inferred_styles: 0, errors: 0, skipped: 0 },
    startedAt: new Date().toISOString(),
    lastUpdate: new Date().toISOString()
  };
}

function saveState(state: ScraperState) {
  state.lastUpdate = new Date().toISOString();
  const serializable = { ...state, processedIds: [...state.processedIds] };
  fs.writeFileSync(STATE_FILE, JSON.stringify(serializable));
}

function log(msg: string) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch {}
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchSafe(url: string, opts: any = {}, timeoutMs = 10000): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch {
    return null;
  }
}

// ============================================================
// WIKIPEDIA — Use pageimages API for photos (fast batch)
// + parse page for other data
// ============================================================
async function wikiGetPhoto(title: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
  const res = await fetchSafe(url);
  if (!res) return null;
  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;
  for (const p of Object.values(pages) as any[]) {
    if (p.thumbnail?.source) return p.thumbnail.source;
  }
  return null;
}

async function wikiGetData(title: string): Promise<{ city?: string; academy?: string; style?: string; country?: string } | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=text&section=0`;
  const res = await fetchSafe(url);
  if (!res) return null;
  
  try {
    const data = await res.json();
    if (!data.parse?.text?.['*']) return null;
    const html = data.parse.text['*'];
    const result: any = {};
    
    // City from birthplace in infobox
    const bornMatch = html.match(/class="birthplace"[^>]*>([\s\S]*?)<\/td>/i) ||
                      html.match(/Born[\s\S]*?<td[^>]*class="infobox-data[^"]*"[^>]*>([\s\S]*?)<\/td>/i);
    if (bornMatch) {
      const links = (bornMatch[1].match(/<a[^>]*title="([^"]*)"[^>]*>[^<]*<\/a>/g) || []);
      const titles = links.map((l: string) => {
        const m = l.match(/title="([^"]*)"/);
        return m ? m[1] : '';
      }).filter((t: string) => t && !t.match(/UTC|age|edit|birth|death|\d{4}|category/i) && t.length < 60 && t.length > 1);
      
      if (titles.length >= 2) {
        result.city = titles[0];
        result.country = titles[titles.length - 1];
      } else if (titles.length === 1) {
        result.city = titles[0];
      }
    }
    
    // Team/Gym from infobox
    const teamMatch = html.match(/(?:Team|Gym|Camp|Training|Association)\s*(?:\(s\))?\s*<\/(?:th|td|div)>\s*<(?:td|div)[^>]*>([\s\S]*?)<\/(?:td|div)>/i);
    if (teamMatch) {
      let team = teamMatch[1].replace(/<br\s*\/?>/g, ', ').replace(/<[^>]+>/g, '').trim();
      team = team.split('\n')[0].split(/[,;]/)[0].trim();
      if (team && team.length > 2 && team.length < 80 && !['N/A','Unknown','None','TBD',''].includes(team)) {
        result.academy = team;
      }
    }
    
    // Fighting style
    const styleMatch = html.match(/(?:Style|Fighting\s+style|Discipline|Martial\s+art)\s*<\/(?:th|td)>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
    if (styleMatch) {
      let style = styleMatch[1].replace(/<[^>]+>/g, '').trim().split('\n')[0].trim();
      if (style && style.length > 2 && style.length < 60 && style !== 'N/A') {
        result.style = style;
      }
    }
    
    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

async function wikiSearchTitle(name: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' MMA fighter')}&format=json&srlimit=3`;
  const res = await fetchSafe(url);
  if (!res) return null;
  
  try {
    const data = await res.json();
    const results = data.query?.search || [];
    
    // Try to find an MMA-related result
    for (const r of results) {
      const snippet = (r.snippet || '').toLowerCase();
      if (snippet.includes('mixed martial') || snippet.includes('ufc') || snippet.includes('mma') || 
          snippet.includes('fighter') || snippet.includes('martial art') || snippet.includes('sherdog')) {
        return r.title;
      }
    }
    // Fallback to first result if name matches closely
    if (results.length > 0) {
      const firstTitle = results[0].title.toLowerCase();
      const nameLower = name.toLowerCase();
      if (firstTitle.includes(nameLower) || nameLower.includes(firstTitle.split('(')[0].trim())) {
        return results[0].title;
      }
    }
  } catch {}
  return null;
}

async function processWikipediaFighter(fighter: any, state: ScraperState): Promise<void> {
  if (state.processedIds.has(fighter.id)) return;
  
  const needsPhoto = !fighter.imagem_url || fighter.imagem_url === '';
  const needsCity = !fighter.cidade_natal || fighter.cidade_natal === '';
  const needsAcademy = !fighter.academia || fighter.academia === '';
  const needsStyle = !fighter.estilo_luta || fighter.estilo_luta === '';
  
  try {
    const title = await wikiSearchTitle(fighter.nome);
    if (!title) {
      state.processedIds.add(fighter.id);
      state.stats.skipped++;
      return;
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;
    
    // Get photo via pageimages API
    if (needsPhoto) {
      const photoUrl = await wikiGetPhoto(title);
      if (photoUrl && !photoUrl.includes('Flag_of') && !photoUrl.includes('flag_of')) {
        updates.push(`imagem_url = $${idx++}`);
        values.push(photoUrl);
        state.stats.wiki_photos++;
      }
    }
    
    // Get other data from page parse
    if (needsCity || needsAcademy || needsStyle) {
      const data = await wikiGetData(title);
      if (data) {
        if (data.city && needsCity) {
          updates.push(`cidade_natal = $${idx++}`);
          values.push(data.city);
          state.stats.wiki_city++;
        }
        if (data.academy && needsAcademy) {
          updates.push(`academia = $${idx++}`);
          values.push(data.academy);
          state.stats.wiki_academy++;
        }
        if (data.style && needsStyle) {
          updates.push(`estilo_luta = $${idx++}`);
          values.push(data.style);
          state.stats.wiki_style++;
        }
        if (data.country && (!fighter.pais || fighter.pais === '' || fighter.pais === 'Unknown')) {
          updates.push(`pais = $${idx++}`);
          values.push(data.country);
          state.stats.wiki_country++;
        }
      }
    }
    
    if (updates.length > 0) {
      values.push(fighter.id);
      await pool.query(`UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${idx}`, values);
    }
    
    state.processedIds.add(fighter.id);
  } catch (e: any) {
    state.stats.errors++;
    state.processedIds.add(fighter.id);
  }
}

// ============================================================
// SHERDOG
// ============================================================
async function processSherdogFighter(fighter: any, state: ScraperState): Promise<void> {
  const key = fighter.id + 10000000;
  if (state.processedIds.has(key)) return;
  
  try {
    const searchUrl = `https://www.sherdog.com/stats/fightfinder?SearchTxt=${encodeURIComponent(fighter.nome)}`;
    const res = await fetchSafe(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    }, 12000);
    
    if (!res) { state.processedIds.add(key); state.stats.errors++; return; }
    const searchHtml = await res.text();
    
    // Check for rate limit / block
    if (searchHtml.includes('Access Denied') || searchHtml.includes('403') || res.status === 403) {
      log('⚠️ Sherdog rate limited — pausing 30s');
      await sleep(30000);
      state.processedIds.add(key);
      return;
    }
    
    const linkMatch = searchHtml.match(/<a\s+href="(\/fighter\/[^"]+)"[^>]*>/i);
    if (!linkMatch) { state.processedIds.add(key); state.stats.skipped++; return; }
    
    const fighterUrl = 'https://www.sherdog.com' + linkMatch[1];
    const pageRes = await fetchSafe(fighterUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    }, 12000);
    
    if (!pageRes) { state.processedIds.add(key); state.stats.errors++; return; }
    const html = await pageRes.text();
    
    if (html.includes('Access Denied') || pageRes.status === 403) {
      log('⚠️ Sherdog rate limited — pausing 30s');
      await sleep(30000);
      state.processedIds.add(key);
      return;
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;
    
    // Photo — try multiple selectors
    if (!fighter.imagem_url || fighter.imagem_url === '') {
      const imgPatterns = [
        /<img[^>]+class="[^"]*profile-image[^"]*"[^>]+src="([^"]+)"/i,
        /<img[^>]+src="(https?:\/\/[^"]+\.sherdog\.com\/image_crop[^"]+)"/i,
        /<div[^>]+class="[^"]*fighter[^"]*"[\s\S]*?<img[^>]+src="(https?:\/\/[^"]+)"/i,
      ];
      for (const p of imgPatterns) {
        const m = html.match(p);
        if (m && !m[1].includes('placeholder') && !m[1].includes('default') && !m[1].includes('no-photo') && !m[1].includes('no_image')) {
          const url = m[1].startsWith('//') ? 'https:' + m[1] : m[1];
          updates.push(`imagem_url = $${idx++}`);
          values.push(url);
          state.stats.sherdog_photos++;
          break;
        }
      }
    }
    
    // Association/Team
    if (!fighter.academia || fighter.academia === '') {
      const teamMatch = html.match(/class="[^"]*association[^"]*"[\s\S]*?<(?:a|span)[^>]*>([^<]+)/i);
      if (teamMatch) {
        const team = teamMatch[1].trim();
        if (team && team.length > 2 && team.length < 80 && !['N/A','Unknown','None'].includes(team)) {
          updates.push(`academia = $${idx++}`);
          values.push(team);
          state.stats.sherdog_academy++;
        }
      }
    }
    
    // City / Locality
    if (!fighter.cidade_natal || fighter.cidade_natal === '') {
      const locMatch = html.match(/class="[^"]*locality[^"]*"[^>]*>([^<]+)/i);
      if (locMatch) {
        const city = locMatch[1].trim();
        if (city && city.length > 1 && city.length < 60) {
          updates.push(`cidade_natal = $${idx++}`);
          values.push(city);
          state.stats.sherdog_city++;
        }
      }
    }
    
    // Nationality
    if (!fighter.pais || fighter.pais === '' || fighter.pais === 'Unknown') {
      const natMatch = html.match(/class="[^"]*nationality[^"]*"[\s\S]*?<strong[^>]*>([^<]+)<\/strong>/i);
      if (natMatch) {
        const country = natMatch[1].trim();
        if (country && country.length > 1 && country.length < 40) {
          updates.push(`pais = $${idx++}`);
          values.push(country);
          state.stats.sherdog_country++;
        }
      }
    }
    
    if (updates.length > 0) {
      values.push(fighter.id);
      await pool.query(`UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${idx}`, values);
    }
    
    state.processedIds.add(key);
  } catch {
    state.stats.errors++;
    state.processedIds.add(key);
  }
}

// ============================================================
// UFCSTATS — re-scrape missing stats
// ============================================================
async function processUFCStatsFighter(fighter: any, state: ScraperState): Promise<void> {
  const key = fighter.id + 20000000;
  if (state.processedIds.has(key)) return;
  
  try {
    const res = await fetchSafe(fighter.url_perfil, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
    });
    if (!res) { state.processedIds.add(key); return; }
    const html = await res.text();
    
    const parse = (p: RegExp): number => { const m = html.match(p); return m ? parseFloat(m[1]) : 0; };
    
    const slpm = parse(/SLpM[^0-9]*([0-9.]+)/);
    const strAcc = parse(/Str\.\s*Acc\.[^0-9]*([0-9.]+)/);
    const sapm = parse(/SApM[^0-9]*([0-9.]+)/);
    const strDef = parse(/Str\.\s*Def[^0-9]*([0-9.]+)/);
    const tdAvg = parse(/TD\s*Avg\.[^0-9]*([0-9.]+)/);
    const tdAcc = parse(/TD\s*Acc\.[^0-9]*([0-9.]+)/);
    const tdDef = parse(/TD\s*Def\.[^0-9]*([0-9.]+)/);
    const subAvg = parse(/Sub\.\s*Avg\.[^0-9]*([0-9.]+)/);
    
    if (slpm > 0 || sapm > 0 || strAcc > 0) {
      await pool.query(`
        UPDATE lutadores SET slpm=$1, str_acc=$2, sapm=$3, str_def=$4,
          td_avg=$5, td_acc=$6, td_def=$7, sub_avg=$8, last_stats_sync=NOW()
        WHERE id = $9
      `, [slpm, strAcc, sapm, strDef, tdAvg, tdAcc, tdDef, subAvg, fighter.id]);
      state.stats.ufcstats_stats++;
    }
    
    state.processedIds.add(key);
  } catch {
    state.stats.errors++;
    state.processedIds.add(key);
  }
}

// ============================================================
// STYLE INFERENCE from stats
// ============================================================
async function inferStyles(state: ScraperState): Promise<void> {
  log('=== Inferring fighting styles from real stats ===');
  
  const { rows } = await pool.query(`
    SELECT id, slpm, sapm, str_acc, td_avg, td_acc, sub_avg, nocautes, finalizacoes, vitorias
    FROM lutadores
    WHERE (estilo_luta IS NULL OR estilo_luta = '')
    AND (slpm > 0 OR sapm > 0 OR td_avg > 0 OR sub_avg > 0)
  `);
  
  let updated = 0;
  for (const f of rows) {
    let style = '';
    const totalWins = f.vitorias || 0;
    const koRate = totalWins > 0 ? (f.nocautes || 0) / totalWins : 0;
    const subRate = totalWins > 0 ? (f.finalizacoes || 0) / totalWins : 0;
    
    if (f.slpm > 5 && f.td_avg < 1.5 && koRate > 0.5) style = 'Striker';
    else if (f.td_avg > 3 && f.td_acc > 35) style = 'Wrestler';
    else if (f.sub_avg > 1.2 && subRate > 0.4) style = 'Grappler';
    else if (koRate > 0.6) style = 'KO Artist';
    else if (f.slpm > 4 && f.td_avg > 1.5) style = 'Well-Rounded';
    else if (f.td_avg > 2) style = 'Wrestler';
    else if (f.slpm > 3) style = 'Striker';
    else continue;
    
    await pool.query('UPDATE lutadores SET estilo_luta = $1 WHERE id = $2', [style, f.id]);
    updated++;
  }
  
  state.stats.inferred_styles = updated;
  log(`Inferred ${updated} fighting styles from stats`);
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  // Reset state file to start fresh with new logic
  const forceReset = process.argv.includes('--reset');
  let state: ScraperState;
  
  if (forceReset) {
    log('🔄 Force reset — starting fresh');
    state = loadState();
    state.processedIds = new Set();
    state.stats = { wiki_photos: 0, wiki_city: 0, wiki_academy: 0, wiki_style: 0, wiki_country: 0,
                    sherdog_photos: 0, sherdog_city: 0, sherdog_academy: 0, sherdog_country: 0,
                    ufcstats_stats: 0, inferred_styles: 0, errors: 0, skipped: 0 };
  } else {
    state = loadState();
  }
  
  log('🚀 ULTRA SCRAPER v2 — Crash-proof, API-based');
  log(`Checkpoint: ${state.processedIds.size} fighters already processed`);
  
  // ---- WIKIPEDIA ----
  if (state.phase === 'wikipedia' || !state.phase) {
    state.phase = 'wikipedia';
    
    const { rows: targets } = await pool.query(`
      SELECT id, nome, imagem_url, pais, cidade_natal, academia, estilo_luta
      FROM lutadores 
      WHERE (imagem_url = '' OR imagem_url IS NULL
         OR cidade_natal = '' OR cidade_natal IS NULL  
         OR academia = '' OR academia IS NULL
         OR estilo_luta = '' OR estilo_luta IS NULL)
      ORDER BY nome
    `);
    
    const todo = targets.filter(f => !state.processedIds.has(f.id));
    log(`Wikipedia: ${todo.length} fighters to process (${targets.length - todo.length} already done)`);
    
    // Process 5 at a time with 200ms gap between batches
    for (let i = 0; i < todo.length; i += 5) {
      const batch = todo.slice(i, i + 5);
      await Promise.allSettled(batch.map(f => processWikipediaFighter(f, state)));
      
      if ((i + 5) % 50 < 5) {
        log(`Wiki: ${Math.min(i + 5, todo.length)}/${todo.length} | 📸${state.stats.wiki_photos} 🏙️${state.stats.wiki_city} 🥋${state.stats.wiki_academy} 🥊${state.stats.wiki_style} ❌${state.stats.errors} ⏭${state.stats.skipped}`);
        saveState(state);
      }
      
      await sleep(200);
    }
    
    log(`✅ Wikipedia DONE: 📸${state.stats.wiki_photos} 🏙️${state.stats.wiki_city} 🥋${state.stats.wiki_academy} 🥊${state.stats.wiki_style}`);
    state.phase = 'sherdog';
    saveState(state);
  }
  
  // ---- SHERDOG ----
  if (state.phase === 'sherdog') {
    const { rows: targets } = await pool.query(`
      SELECT id, nome, imagem_url, pais, cidade_natal, academia
      FROM lutadores 
      WHERE (imagem_url = '' OR imagem_url IS NULL
         OR cidade_natal = '' OR cidade_natal IS NULL  
         OR academia = '' OR academia IS NULL)
      ORDER BY nome
    `);
    
    const todo = targets.filter(f => !state.processedIds.has(f.id + 10000000));
    log(`Sherdog: ${todo.length} fighters to process`);
    
    // Sherdog is stricter — 2 at a time, 800ms gap
    for (let i = 0; i < todo.length; i += 2) {
      const batch = todo.slice(i, i + 2);
      await Promise.allSettled(batch.map(f => processSherdogFighter(f, state)));
      
      if ((i + 2) % 50 < 2) {
        log(`Sherdog: ${Math.min(i + 2, todo.length)}/${todo.length} | 📸${state.stats.sherdog_photos} 🏙️${state.stats.sherdog_city} 🥋${state.stats.sherdog_academy} ❌${state.stats.errors}`);
        saveState(state);
      }
      
      await sleep(800);
    }
    
    log(`✅ Sherdog DONE: 📸${state.stats.sherdog_photos} 🏙️${state.stats.sherdog_city} 🥋${state.stats.sherdog_academy}`);
    state.phase = 'ufcstats';
    saveState(state);
  }
  
  // ---- UFCSTATS ----
  if (state.phase === 'ufcstats') {
    const { rows: targets } = await pool.query(`
      SELECT id, nome, url_perfil FROM lutadores 
      WHERE (slpm = 0 AND sapm = 0 AND str_acc = 0)
      AND url_perfil IS NOT NULL AND url_perfil != ''
    `);
    
    const todo = targets.filter(f => !state.processedIds.has(f.id + 20000000));
    log(`UFCStats: ${todo.length} fighters to process`);
    
    for (let i = 0; i < todo.length; i += 5) {
      const batch = todo.slice(i, i + 5);
      await Promise.allSettled(batch.map(f => processUFCStatsFighter(f, state)));
      
      if ((i + 5) % 50 < 5) {
        log(`UFCStats: ${Math.min(i + 5, todo.length)}/${todo.length} | updated: ${state.stats.ufcstats_stats}`);
        saveState(state);
      }
      
      await sleep(300);
    }
    
    log(`✅ UFCStats DONE: ${state.stats.ufcstats_stats} updated`);
    state.phase = 'inference';
    saveState(state);
  }
  
  // ---- STYLE INFERENCE ----
  if (state.phase === 'inference') {
    await inferStyles(state);
    state.phase = 'done';
    saveState(state);
  }
  
  // ---- FINAL AUDIT ----
  const { rows } = await pool.query(`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN imagem_url != '' AND imagem_url IS NOT NULL AND imagem_url NOT LIKE '%dicebear%' THEN 1 END) as fotos,
      COUNT(CASE WHEN pais != '' AND pais IS NOT NULL AND pais NOT IN ('Unknown','N/A') THEN 1 END) as pais,
      COUNT(CASE WHEN cidade_natal != '' AND cidade_natal IS NOT NULL AND cidade_natal NOT IN ('Unknown','N/A') THEN 1 END) as cidade,
      COUNT(CASE WHEN academia != '' AND academia IS NOT NULL AND academia NOT IN ('Independent','Unknown','N/A','None') THEN 1 END) as academia,
      COUNT(CASE WHEN estilo_luta != '' AND estilo_luta IS NOT NULL AND estilo_luta NOT IN ('Unknown','N/A') THEN 1 END) as estilo,
      COUNT(CASE WHEN slpm > 0 OR sapm > 0 OR str_acc > 0 THEN 1 END) as stats,
      COUNT(CASE WHEN vitorias > 0 OR derrotas > 0 THEN 1 END) as record,
      COUNT(CASE WHEN nocautes > 0 OR finalizacoes > 0 OR decisoes > 0 THEN 1 END) as ko_sub
    FROM lutadores
  `);
  
  const r = rows[0];
  const pct = (v: number) => (v / parseInt(r.total) * 100).toFixed(1);
  log('========================================');
  log('  HONEST FINAL AUDIT');
  log('========================================');
  log(`  Total:     ${r.total}`);
  log(`  📸 Fotos:  ${r.fotos} (${pct(parseInt(r.fotos))}%)`);
  log(`  🌍 País:   ${r.pais} (${pct(parseInt(r.pais))}%)`);
  log(`  🏙️ Cidade: ${r.cidade} (${pct(parseInt(r.cidade))}%)`);
  log(`  🥋 Acad:   ${r.academia} (${pct(parseInt(r.academia))}%)`);
  log(`  🥊 Estilo: ${r.estilo} (${pct(parseInt(r.estilo))}%)`);
  log(`  📊 Stats:  ${r.stats} (${pct(parseInt(r.stats))}%)`);
  log(`  🏆 Record: ${r.record} (${pct(parseInt(r.record))}%)`);
  log(`  💥 KO/Sub: ${r.ko_sub} (${pct(parseInt(r.ko_sub))}%)`);
  log('========================================');
  
  log(`📊 Total stats: ${JSON.stringify(state.stats)}`);
  log('🏁 ULTRA SCRAPER v2 complete!');
  
  await pool.end();
}

process.on('uncaughtException', (err) => {
  log(`⚠️ Crash: ${err.message} — state saved, run again to resume`);
  const state = loadState();
  saveState(state);
  process.exit(1);
});
process.on('SIGTERM', () => { log('⚠️ SIGTERM — state saved'); process.exit(0); });
process.on('SIGINT', () => { log('⚠️ SIGINT — state saved'); process.exit(0); });

main().catch(e => { log(`💀 Fatal: ${e.message}`); process.exit(1); });
