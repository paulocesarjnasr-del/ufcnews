#!/usr/bin/env npx tsx
/**
 * MEGA SCRAPER - Fill ALL missing data with REAL data only
 * Sources: Wikipedia, Sherdog, UFCStats, UFC.com
 * 
 * Rules:
 * - NEVER insert placeholder/fake data (no "Unknown", "Independent", "N/A")
 * - Only update fields that are currently empty/fake
 * - Log everything for transparency
 * 
 * Phases:
 * 1. Fix filler data → set to empty (honest baseline)
 * 2. Wikipedia scrape → photos, country, city, academy
 * 3. Sherdog scrape → missing stats, records, win methods
 * 4. UFCStats re-scrape → fill remaining stats gaps
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub'
});

const DELAY_MS = 600; // Be respectful to servers
const BATCH_SIZE = 50;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Stats tracking
const stats = {
  phase1: { cleaned: 0 },
  phase2: { checked: 0, photos: 0, country: 0, city: 0, academy: 0, style: 0 },
  phase3: { checked: 0, photos: 0, country: 0, city: 0, record: 0, academy: 0 },
  phase4: { checked: 0, stats: 0 },
};

function log(msg: string) {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${msg}`);
}

// ============================================================
// PHASE 1: Clean filler data → set to empty for honest baseline
// ============================================================
async function phase1_cleanFillers() {
  log('=== PHASE 1: Cleaning filler data ===');
  
  // Clean DiceBear placeholder photos
  let res = await pool.query(`
    UPDATE lutadores SET imagem_url = '' 
    WHERE imagem_url LIKE '%dicebear%'
  `);
  log(`Cleaned ${res.rowCount} DiceBear placeholder photos`);
  stats.phase1.cleaned += res.rowCount || 0;

  // Clean "Unknown" cities
  res = await pool.query(`
    UPDATE lutadores SET cidade_natal = '' 
    WHERE cidade_natal IN ('Unknown', 'N/A', 'unknown')
  `);
  log(`Cleaned ${res.rowCount} Unknown cities`);
  stats.phase1.cleaned += res.rowCount || 0;

  // Clean "Independent" academies (not real data)
  res = await pool.query(`
    UPDATE lutadores SET academia = '' 
    WHERE academia IN ('Independent', 'Unknown', 'N/A', 'unknown', 'None')
  `);
  log(`Cleaned ${res.rowCount} fake academies`);
  stats.phase1.cleaned += res.rowCount || 0;

  // Clean generic "MMA" style (not informative)
  res = await pool.query(`
    UPDATE lutadores SET estilo_luta = '' 
    WHERE estilo_luta IN ('MMA', 'Unknown', 'N/A', 'unknown')
  `);
  log(`Cleaned ${res.rowCount} generic styles`);
  stats.phase1.cleaned += res.rowCount || 0;

  // Clean fake stances (keep only real ones from UFCStats)
  // Orthodox 3609 is suspicious — but actually UFCStats does report this, it's real
  // Leave stances alone

  log(`Phase 1 complete: ${stats.phase1.cleaned} filler values cleaned`);
}

// ============================================================
// PHASE 2: Wikipedia scrape
// ============================================================
async function fetchWikipedia(fighterName: string): Promise<{
  photo?: string;
  country?: string;
  city?: string;
  academy?: string;
  style?: string;
  nickname?: string;
} | null> {
  try {
    // Search Wikipedia API
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(fighterName + ' MMA fighter')}&format=json&srlimit=1`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    if (!searchData.query?.search?.length) return null;
    
    const title = searchData.query.search[0].title;
    
    // Get page content with images
    const pageUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=text`;
    const pageRes = await fetch(pageUrl);
    const pageData = await pageRes.json();
    
    if (!pageData.parse?.text?.['*']) return null;
    
    const html = pageData.parse.text['*'];
    const result: any = {};
    
    // Verify this is actually an MMA fighter page
    const lowerHtml = html.toLowerCase();
    if (!lowerHtml.includes('mixed martial art') && !lowerHtml.includes('ultimate fighting') && 
        !lowerHtml.includes('ufc') && !lowerHtml.includes('mma')) {
      return null;
    }
    
    // Extract photo from infobox
    const imgMatch = html.match(/infobox[\s\S]*?<img[^>]+src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons[^"]+)"/i);
    if (imgMatch) {
      let imgUrl = 'https:' + imgMatch[1];
      // Get a reasonable size (not thumbnail)
      imgUrl = imgUrl.replace(/\/thumb\//, '/').replace(/\/\d+px-[^/]+$/, '');
      // Actually keep thumb but make it bigger
      if (imgMatch[1].includes('/thumb/')) {
        imgUrl = 'https:' + imgMatch[1].replace(/\/\d+px-/, '/400px-');
      }
      result.photo = imgUrl;
    }
    
    // Extract from infobox rows
    const birthplaceMatch = html.match(/born[\s\S]*?<td[^>]*>[\s\S]*?<a[^>]*>[^<]*<\/a>[\s\S]*?<a[^>]*title="([^"]*)"[^>]*>[^<]*<\/a>/i);
    
    // Try to get birth location from infobox
    const bornSection = html.match(/class="birthplace"[^>]*>([\s\S]*?)<\/td>/i) || 
                        html.match(/Born[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/i);
    if (bornSection) {
      const links = bornSection[1].match(/<a[^>]*title="([^"]*)"[^>]*>[^<]*<\/a>/g);
      if (links && links.length >= 1) {
        // Usually last link is country, previous ones are city/state
        const titles = links.map((l: string) => {
          const m = l.match(/title="([^"]*)"/);
          return m ? m[1] : '';
        }).filter((t: string) => t && !t.includes('UTC') && !t.includes('age'));
        
        if (titles.length >= 2) {
          result.city = titles[0];
          result.country = titles[titles.length - 1];
        } else if (titles.length === 1) {
          result.country = titles[0];
        }
      }
    }
    
    // Extract team/gym
    const teamMatch = html.match(/(?:Team|Gym|Camp|Training)\s*<\/(?:th|td)>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
    if (teamMatch) {
      const teamText = teamMatch[1].replace(/<[^>]+>/g, '').trim();
      if (teamText && teamText.length < 100 && teamText !== 'N/A') {
        result.academy = teamText.split('\n')[0].trim();
      }
    }
    
    // Extract fighting style
    const styleMatch = html.match(/(?:Style|Fighting\s+style|Discipline)\s*<\/(?:th|td)>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
    if (styleMatch) {
      const styleText = styleMatch[1].replace(/<[^>]+>/g, '').trim();
      if (styleText && styleText.length < 80) {
        result.style = styleText.split('\n')[0].trim();
      }
    }
    
    // Extract nickname
    const nickMatch = html.match(/(?:Nickname|Other\s+names?)\s*<\/(?:th|td)>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
    if (nickMatch) {
      let nick = nickMatch[1].replace(/<[^>]+>/g, '').replace(/"/g, '').trim();
      if (nick && nick.length < 50 && nick !== 'N/A') {
        result.nickname = nick;
      }
    }
    
    return Object.keys(result).length > 0 ? result : null;
  } catch (e) {
    return null;
  }
}

async function phase2_wikipedia() {
  log('=== PHASE 2: Wikipedia scraping ===');
  
  // Get fighters missing data (prioritize those missing photos)
  const { rows: fighters } = await pool.query(`
    SELECT id, nome, imagem_url, pais, cidade_natal, academia, estilo_luta
    FROM lutadores 
    WHERE imagem_url = '' OR imagem_url IS NULL
       OR cidade_natal = '' OR cidade_natal IS NULL  
       OR academia = '' OR academia IS NULL
       OR estilo_luta = '' OR estilo_luta IS NULL
    ORDER BY 
      CASE WHEN imagem_url = '' OR imagem_url IS NULL THEN 0 ELSE 1 END,
      nome
  `);
  
  log(`${fighters.length} fighters need data from Wikipedia`);
  
  for (let i = 0; i < fighters.length; i++) {
    const f = fighters[i];
    stats.phase2.checked++;
    
    if (i > 0 && i % 100 === 0) {
      log(`Wikipedia progress: ${i}/${fighters.length} | photos: ${stats.phase2.photos} | country: ${stats.phase2.country} | city: ${stats.phase2.city} | academy: ${stats.phase2.academy}`);
    }
    
    const data = await fetchWikipedia(f.nome);
    if (!data) {
      await sleep(DELAY_MS);
      continue;
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIdx = 1;
    
    if (data.photo && (!f.imagem_url || f.imagem_url === '')) {
      updates.push(`imagem_url = $${paramIdx++}`);
      values.push(data.photo);
      stats.phase2.photos++;
    }
    if (data.country && (!f.pais || f.pais === '' || f.pais === 'Unknown')) {
      updates.push(`pais = $${paramIdx++}`);
      values.push(data.country);
      stats.phase2.country++;
    }
    if (data.city && (!f.cidade_natal || f.cidade_natal === '')) {
      updates.push(`cidade_natal = $${paramIdx++}`);
      values.push(data.city);
      stats.phase2.city++;
    }
    if (data.academy && (!f.academia || f.academia === '')) {
      updates.push(`academia = $${paramIdx++}`);
      values.push(data.academy);
      stats.phase2.academy++;
    }
    if (data.style && (!f.estilo_luta || f.estilo_luta === '')) {
      updates.push(`estilo_luta = $${paramIdx++}`);
      values.push(data.style);
      stats.phase2.style++;
    }
    
    if (updates.length > 0) {
      values.push(f.id);
      await pool.query(
        `UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${paramIdx}`,
        values
      );
    }
    
    await sleep(DELAY_MS);
  }
  
  log(`Phase 2 complete: photos=${stats.phase2.photos} country=${stats.phase2.country} city=${stats.phase2.city} academy=${stats.phase2.academy} style=${stats.phase2.style}`);
}

// ============================================================
// PHASE 3: Sherdog scrape for missing data
// ============================================================
async function fetchSherdog(fighterName: string): Promise<{
  photo?: string;
  country?: string;
  city?: string;
  record?: { wins: number; losses: number; draws: number; nc: number };
  academy?: string;
  nickname?: string;
} | null> {
  try {
    // Search Sherdog
    const searchName = fighterName.replace(/\s+/g, '+');
    const searchUrl = `https://www.sherdog.com/stats/fightfinder?SearchTxt=${encodeURIComponent(fighterName)}`;
    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    });
    const searchHtml = await searchRes.text();
    
    // Find fighter link
    const linkMatch = searchHtml.match(/<a\s+href="(\/fighter\/[^"]+)"[^>]*>/i);
    if (!linkMatch) return null;
    
    const fighterUrl = 'https://www.sherdog.com' + linkMatch[1];
    const pageRes = await fetch(fighterUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    });
    const html = await pageRes.text();
    const result: any = {};
    
    // Photo
    const imgMatch = html.match(/<img[^>]+class="profile-image[^"]*"[^>]+src="([^"]+)"/i) ||
                     html.match(/<div[^>]+class="fighter-image[^"]*"[\s\S]*?<img[^>]+src="([^"]+)"/i);
    if (imgMatch && !imgMatch[1].includes('placeholder') && !imgMatch[1].includes('default')) {
      result.photo = imgMatch[1].startsWith('//') ? 'https:' + imgMatch[1] : imgMatch[1];
    }
    
    // Nationality
    const nationMatch = html.match(/class="nationality"[^>]*>[\s\S]*?<strong[^>]*>([^<]+)<\/strong>/i) ||
                        html.match(/nationality[\s\S]*?<span[^>]*>([^<]+)<\/span>/i);
    if (nationMatch) {
      result.country = nationMatch[1].trim();
    }
    
    // Birth location
    const locMatch = html.match(/class="locality"[^>]*>([^<]+)/i) ||
                     html.match(/Born:[\s\S]*?<span[^>]*>([^<]+)<\/span>/i);
    if (locMatch) {
      result.city = locMatch[1].trim();
    }
    
    // Association/Team
    const teamMatch = html.match(/class="association"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i) ||
                      html.match(/Association:[\s\S]*?<span[^>]*>([^<]+)<\/span>/i);
    if (teamMatch) {
      const team = teamMatch[1].trim();
      if (team && team !== 'N/A' && team.length < 100) {
        result.academy = team;
      }
    }
    
    // Record
    const recordMatch = html.match(/class="record"[^>]*>[\s\S]*?(\d+)\s*-\s*(\d+)\s*(?:-\s*(\d+))?/i) ||
                        html.match(/(\d+)\s+Wins[\s\S]*?(\d+)\s+Losses[\s\S]*?(\d+)\s+Draw/i);
    if (recordMatch) {
      result.record = {
        wins: parseInt(recordMatch[1]),
        losses: parseInt(recordMatch[2]),
        draws: parseInt(recordMatch[3] || '0'),
        nc: 0
      };
    }
    
    // Nickname  
    const nickMatch = html.match(/class="nickname"[^>]*>"?([^"<]+)"?<\//i);
    if (nickMatch) {
      result.nickname = nickMatch[1].replace(/"/g, '').trim();
    }
    
    return Object.keys(result).length > 0 ? result : null;
  } catch (e) {
    return null;
  }
}

async function phase3_sherdog() {
  log('=== PHASE 3: Sherdog scraping ===');
  
  // Get fighters still missing data after Wikipedia
  const { rows: fighters } = await pool.query(`
    SELECT id, nome, imagem_url, pais, cidade_natal, academia, vitorias, derrotas
    FROM lutadores 
    WHERE imagem_url = '' OR imagem_url IS NULL
       OR cidade_natal = '' OR cidade_natal IS NULL  
       OR academia = '' OR academia IS NULL
    ORDER BY 
      CASE WHEN imagem_url = '' OR imagem_url IS NULL THEN 0 ELSE 1 END,
      nome
  `);
  
  log(`${fighters.length} fighters still need data — trying Sherdog`);
  
  for (let i = 0; i < fighters.length; i++) {
    const f = fighters[i];
    stats.phase3.checked++;
    
    if (i > 0 && i % 100 === 0) {
      log(`Sherdog progress: ${i}/${fighters.length} | photos: ${stats.phase3.photos} | country: ${stats.phase3.country} | city: ${stats.phase3.city} | academy: ${stats.phase3.academy}`);
    }
    
    const data = await fetchSherdog(f.nome);
    if (!data) {
      await sleep(DELAY_MS * 2); // Be more careful with Sherdog
      continue;
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIdx = 1;
    
    if (data.photo && (!f.imagem_url || f.imagem_url === '')) {
      updates.push(`imagem_url = $${paramIdx++}`);
      values.push(data.photo);
      stats.phase3.photos++;
    }
    if (data.country && (!f.pais || f.pais === '' || f.pais === 'Unknown')) {
      updates.push(`pais = $${paramIdx++}`);
      values.push(data.country);
      stats.phase3.country++;
    }
    if (data.city && (!f.cidade_natal || f.cidade_natal === '')) {
      updates.push(`cidade_natal = $${paramIdx++}`);
      values.push(data.city);
      stats.phase3.city++;
    }
    if (data.academy && (!f.academia || f.academia === '')) {
      updates.push(`academia = $${paramIdx++}`);
      values.push(data.academy);
      stats.phase3.academy++;
    }
    if (data.record && (!f.vitorias || f.vitorias === 0)) {
      updates.push(`vitorias = $${paramIdx++}`);
      values.push(data.record.wins);
      updates.push(`derrotas = $${paramIdx++}`);
      values.push(data.record.losses);
      updates.push(`empates = $${paramIdx++}`);
      values.push(data.record.draws);
      stats.phase3.record++;
    }
    
    if (updates.length > 0) {
      values.push(f.id);
      await pool.query(
        `UPDATE lutadores SET ${updates.join(', ')} WHERE id = $${paramIdx}`,
        values
      );
    }
    
    await sleep(DELAY_MS * 2);
  }
  
  log(`Phase 3 complete: photos=${stats.phase3.photos} country=${stats.phase3.country} city=${stats.phase3.city} academy=${stats.phase3.academy} record=${stats.phase3.record}`);
}

// ============================================================
// PHASE 4: UFCStats re-scrape for missing advanced stats
// ============================================================
async function phase4_ufcstats() {
  log('=== PHASE 4: UFCStats re-scrape for missing stats ===');
  
  const { rows: fighters } = await pool.query(`
    SELECT id, nome, url_perfil
    FROM lutadores 
    WHERE (slpm = 0 AND sapm = 0 AND str_acc = 0)
    AND url_perfil IS NOT NULL AND url_perfil != ''
  `);
  
  log(`${fighters.length} fighters missing stats with UFCStats URL`);
  
  for (let i = 0; i < fighters.length; i++) {
    const f = fighters[i];
    stats.phase4.checked++;
    
    if (i > 0 && i % 100 === 0) {
      log(`UFCStats progress: ${i}/${fighters.length} | updated: ${stats.phase4.stats}`);
    }
    
    try {
      const res = await fetch(f.url_perfil, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
      });
      const html = await res.text();
      
      // Parse career stats
      const slpmMatch = html.match(/SLpM[^0-9]*([0-9.]+)/);
      const strAccMatch = html.match(/Str\.\s*Acc\.[^0-9]*([0-9.]+)/);
      const sapmMatch = html.match(/SApM[^0-9]*([0-9.]+)/);
      const strDefMatch = html.match(/Str\.\s*Def[^0-9]*([0-9.]+)/);
      const tdAvgMatch = html.match(/TD\s*Avg\.[^0-9]*([0-9.]+)/);
      const tdAccMatch = html.match(/TD\s*Acc\.[^0-9]*([0-9.]+)/);
      const tdDefMatch = html.match(/TD\s*Def\.[^0-9]*([0-9.]+)/);
      const subAvgMatch = html.match(/Sub\.\s*Avg\.[^0-9]*([0-9.]+)/);
      
      const slpm = slpmMatch ? parseFloat(slpmMatch[1]) : 0;
      const strAcc = strAccMatch ? parseFloat(strAccMatch[1]) : 0;
      const sapm = sapmMatch ? parseFloat(sapmMatch[1]) : 0;
      const strDef = strDefMatch ? parseFloat(strDefMatch[1]) : 0;
      const tdAvg = tdAvgMatch ? parseFloat(tdAvgMatch[1]) : 0;
      const tdAcc = tdAccMatch ? parseFloat(tdAccMatch[1]) : 0;
      const tdDef = tdDefMatch ? parseFloat(tdDefMatch[1]) : 0;
      const subAvg = subAvgMatch ? parseFloat(subAvgMatch[1]) : 0;
      
      if (slpm > 0 || sapm > 0 || strAcc > 0) {
        await pool.query(`
          UPDATE lutadores SET 
            slpm = $1, str_acc = $2, sapm = $3, str_def = $4,
            td_avg = $5, td_acc = $6, td_def = $7, sub_avg = $8,
            last_stats_sync = NOW()
          WHERE id = $9
        `, [slpm, strAcc, sapm, strDef, tdAvg, tdAcc, tdDef, subAvg, f.id]);
        stats.phase4.stats++;
      }
    } catch (e) {
      // skip
    }
    
    await sleep(DELAY_MS);
  }
  
  log(`Phase 4 complete: ${stats.phase4.stats} fighters updated with stats`);
}

// ============================================================
// FINAL AUDIT
// ============================================================
async function finalAudit() {
  log('=== FINAL AUDIT ===');
  const { rows } = await pool.query(`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN imagem_url != '' AND imagem_url IS NOT NULL AND imagem_url NOT LIKE '%dicebear%' THEN 1 END) as fotos_reais,
      COUNT(CASE WHEN pais != '' AND pais IS NOT NULL AND pais != 'Unknown' THEN 1 END) as pais_real,
      COUNT(CASE WHEN cidade_natal != '' AND cidade_natal IS NOT NULL AND cidade_natal != 'Unknown' THEN 1 END) as cidade_real,
      COUNT(CASE WHEN academia != '' AND academia IS NOT NULL AND academia != 'Independent' AND academia != 'Unknown' THEN 1 END) as academia_real,
      COUNT(CASE WHEN estilo_luta != '' AND estilo_luta IS NOT NULL AND estilo_luta != 'MMA' AND estilo_luta != 'Unknown' THEN 1 END) as estilo_real,
      COUNT(CASE WHEN categoria_peso != '' AND categoria_peso IS NOT NULL AND categoria_peso != 'Unknown' THEN 1 END) as categoria_real,
      COUNT(CASE WHEN stance != '' AND stance IS NOT NULL THEN 1 END) as stance_real,
      COUNT(CASE WHEN slpm > 0 OR sapm > 0 OR str_acc > 0 THEN 1 END) as stats_real,
      COUNT(CASE WHEN vitorias > 0 OR derrotas > 0 THEN 1 END) as record_real,
      COUNT(CASE WHEN nocautes > 0 OR finalizacoes > 0 OR decisoes > 0 THEN 1 END) as ko_sub_real
    FROM lutadores
  `);
  
  const r = rows[0];
  console.log('\n========================================');
  console.log('  HONEST DATA AUDIT — REAL VALUES ONLY');
  console.log('========================================');
  console.log(`  Total fighters:  ${r.total}`);
  console.log(`  📸 Fotos:        ${r.fotos_reais} (${(r.fotos_reais/r.total*100).toFixed(1)}%)`);
  console.log(`  🌍 País:         ${r.pais_real} (${(r.pais_real/r.total*100).toFixed(1)}%)`);
  console.log(`  🏙️ Cidade:       ${r.cidade_real} (${(r.cidade_real/r.total*100).toFixed(1)}%)`);
  console.log(`  🥋 Academia:     ${r.academia_real} (${(r.academia_real/r.total*100).toFixed(1)}%)`);
  console.log(`  🥊 Estilo:       ${r.estilo_real} (${(r.estilo_real/r.total*100).toFixed(1)}%)`);
  console.log(`  ⚖️ Categoria:    ${r.categoria_real} (${(r.categoria_real/r.total*100).toFixed(1)}%)`);
  console.log(`  🧍 Stance:       ${r.stance_real} (${(r.stance_real/r.total*100).toFixed(1)}%)`);
  console.log(`  📊 Stats:        ${r.stats_real} (${(r.stats_real/r.total*100).toFixed(1)}%)`);
  console.log(`  🏆 Record:       ${r.record_real} (${(r.record_real/r.total*100).toFixed(1)}%)`);
  console.log(`  💥 KO/Sub/Dec:   ${r.ko_sub_real} (${(r.ko_sub_real/r.total*100).toFixed(1)}%)`);
  console.log('========================================\n');
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  const startArg = process.argv[2];
  const startPhase = startArg ? parseInt(startArg) : 1;
  
  log(`🚀 MEGA SCRAPER starting from Phase ${startPhase}`);
  log('Rules: NO fake data. NO placeholders. ONLY real, verified information.');
  
  if (startPhase <= 1) await phase1_cleanFillers();
  if (startPhase <= 2) await phase2_wikipedia();
  if (startPhase <= 3) await phase3_sherdog();
  if (startPhase <= 4) await phase4_ufcstats();
  
  await finalAudit();
  
  log('🏁 MEGA SCRAPER complete!');
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
