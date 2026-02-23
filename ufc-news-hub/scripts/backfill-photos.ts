/**
 * Multi-source photo scraper for UFC fighters
 * Sources: 1) UFC.com  2) Wikipedia API  3) Tapology
 * Only updates fighters missing photos
 */

import * as cheerio from 'cheerio';
import pg from 'pg';

const DATABASE_URL = 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub';
const RATE_LIMIT_MS = 300;

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

function makeSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function fetchSafe(url: string, timeoutMs = 8000): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      signal: AbortSignal.timeout(timeoutMs),
      redirect: 'follow',
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// Source 1: UFC.com athlete page
async function tryUFC(name: string): Promise<string | null> {
  const slug = makeSlug(name);
  const html = await fetchSafe(`https://www.ufc.com/athlete/${slug}`);
  if (!html) return null;

  const $ = cheerio.load(html);
  
  // Main hero image
  const heroImg = $('img.hero-profile__image').attr('src');
  if (heroImg && heroImg.includes('ufc.com')) return heroImg;

  // Any athlete image
  const athleteImg = $('img[src*="athlete_bio"]').attr('src') 
    || $('img[src*="fighter_"]').attr('src')
    || $('img[class*="image-style-athlete"]').attr('src');
  if (athleteImg) return athleteImg.startsWith('http') ? athleteImg : `https://ufc.com${athleteImg}`;

  return null;
}

// Source 2: Wikipedia API (pageimages)
async function tryWikipedia(name: string): Promise<string | null> {
  // Format name for Wikipedia: "John Doe" → "John_Doe"
  const wikiTitle = name.replace(/\s+/g, '_');
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=400`;
  
  const text = await fetchSafe(url, 5000);
  if (!text) return null;

  try {
    const data = JSON.parse(text);
    const pages = data?.query?.pages;
    if (!pages) return null;

    for (const page of Object.values(pages) as any[]) {
      const thumb = page?.thumbnail?.source;
      if (thumb && !thumb.includes('question_mark') && !thumb.includes('no_image')) {
        return thumb;
      }
    }
  } catch {
    // JSON parse error
  }
  return null;
}

// Source 3: Wikipedia with "(fighter)" disambiguation
async function tryWikipediaFighter(name: string): Promise<string | null> {
  const wikiTitle = `${name.replace(/\s+/g, '_')}_(fighter)`;
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=400`;
  
  const text = await fetchSafe(url, 5000);
  if (!text) return null;

  try {
    const data = JSON.parse(text);
    const pages = data?.query?.pages;
    if (!pages) return null;

    for (const page of Object.values(pages) as any[]) {
      if (page?.missing) continue;
      const thumb = page?.thumbnail?.source;
      if (thumb && !thumb.includes('question_mark') && !thumb.includes('no_image')) {
        return thumb;
      }
    }
  } catch {}
  return null;
}

// Source 4: Wikipedia with "(mixed martial artist)" disambiguation
async function tryWikipediaMMA(name: string): Promise<string | null> {
  const wikiTitle = `${name.replace(/\s+/g, '_')}_(mixed_martial_artist)`;
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=400`;
  
  const text = await fetchSafe(url, 5000);
  if (!text) return null;

  try {
    const data = JSON.parse(text);
    const pages = data?.query?.pages;
    if (!pages) return null;

    for (const page of Object.values(pages) as any[]) {
      if (page?.missing) continue;
      const thumb = page?.thumbnail?.source;
      if (thumb && !thumb.includes('question_mark') && !thumb.includes('no_image')) {
        return thumb;
      }
    }
  } catch {}
  return null;
}

async function main() {
  console.log('\n📸 Multi-Source Photo Scraper\n');
  console.log('  Sources: UFC.com → Wikipedia → Wikipedia (fighter) → Wikipedia (MMA)\n');

  const pool = new pg.Pool({ connectionString: DATABASE_URL });

  const { rows: fighters } = await pool.query<{ id: string; nome: string }>(
    `SELECT id, nome FROM lutadores 
     WHERE imagem_url IS NULL OR imagem_url = ''
     ORDER BY vitorias DESC NULLS LAST, nome`
  );

  console.log(`  ${fighters.length} fighters without photos\n`);

  const stats = { ufc: 0, wiki: 0, wikiFighter: 0, wikiMMA: 0, notFound: 0 };
  let checked = 0;

  for (const fighter of fighters) {
    checked++;
    if (checked % 50 === 0) {
      const total = stats.ufc + stats.wiki + stats.wikiFighter + stats.wikiMMA;
      console.log(`  📊 ${checked}/${fighters.length} | found: ${total} (UFC: ${stats.ufc}, Wiki: ${stats.wiki + stats.wikiFighter + stats.wikiMMA}) | miss: ${stats.notFound}`);
    }

    let photoUrl: string | null = null;
    let source = '';

    // Try sources in order
    photoUrl = await tryUFC(fighter.nome);
    if (photoUrl) { source = 'ufc'; stats.ufc++; }

    if (!photoUrl) {
      await sleep(100);
      photoUrl = await tryWikipedia(fighter.nome);
      if (photoUrl) { source = 'wiki'; stats.wiki++; }
    }

    if (!photoUrl) {
      await sleep(100);
      photoUrl = await tryWikipediaFighter(fighter.nome);
      if (photoUrl) { source = 'wiki-fighter'; stats.wikiFighter++; }
    }

    if (!photoUrl) {
      await sleep(100);
      photoUrl = await tryWikipediaMMA(fighter.nome);
      if (photoUrl) { source = 'wiki-mma'; stats.wikiMMA++; }
    }

    if (photoUrl) {
      await pool.query(
        `UPDATE lutadores SET imagem_url = $1, updated_at = NOW() WHERE id = $2`,
        [photoUrl, fighter.id]
      );
    } else {
      stats.notFound++;
    }

    await sleep(RATE_LIMIT_MS);
  }

  // Final report
  const total = stats.ufc + stats.wiki + stats.wikiFighter + stats.wikiMMA;
  const { rows: [verify] } = await pool.query(`
    SELECT COUNT(*) FILTER (WHERE imagem_url IS NOT NULL AND imagem_url != '') as with_photo,
           COUNT(*) as total
    FROM lutadores
  `);

  console.log(`\n\n✅ Photo Scraper Complete!`);
  console.log(`  Checked: ${checked}`);
  console.log(`  Found: ${total}`);
  console.log(`    UFC.com: ${stats.ufc}`);
  console.log(`    Wikipedia: ${stats.wiki}`);
  console.log(`    Wikipedia (fighter): ${stats.wikiFighter}`);
  console.log(`    Wikipedia (MMA): ${stats.wikiMMA}`);
  console.log(`  Not found: ${stats.notFound}`);
  console.log(`\n  DB: ${verify.with_photo}/${verify.total} fighters now have photos (${((parseInt(verify.with_photo)/parseInt(verify.total))*100).toFixed(1)}%)\n`);

  await pool.end();
}

main().catch(console.error);
