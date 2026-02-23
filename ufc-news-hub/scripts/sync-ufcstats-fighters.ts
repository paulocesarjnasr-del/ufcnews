/**
 * SYNC UFC FIGHTERS FROM UFCSTATS
 *
 * Scrapes all fighters from UFCStats.com (A-Z alphabetical pages),
 * compares against our database, and inserts missing ones.
 * Then runs a stats backfill on the newly added fighters.
 *
 * Usage: npx tsx scripts/sync-ufcstats-fighters.ts
 */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import * as cheerio from 'cheerio';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
const DELAY_MS = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface UFCStatsFighter {
  firstName: string;
  lastName: string;
  fullName: string;
  nickname: string | null;
  height: string | null;
  weight: string | null;
  reach: string | null;
  stance: string | null;
  wins: number;
  losses: number;
  draws: number;
  detailUrl: string | null;
}

/**
 * Scrape all fighters from a single letter page
 */
async function scrapeLetter(letter: string): Promise<UFCStatsFighter[]> {
  const url = `http://www.ufcstats.com/statistics/fighters?char=${letter}&page=all`;
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const fighters: UFCStatsFighter[] = [];

  $('tr.b-statistics__table-row').each((_, row) => {
    const cols = $(row).find('td');
    if (cols.length < 11) return;

    const firstName = $(cols[0]).text().replace(/\s+/g, ' ').trim();
    const lastName = $(cols[1]).text().replace(/\s+/g, ' ').trim();

    // Skip header row
    if (!firstName || !lastName || firstName === 'First') return;

    const nickname = $(cols[2]).text().replace(/\s+/g, ' ').trim() || null;
    const height = $(cols[3]).text().replace(/\s+/g, ' ').trim() || null;
    const weight = $(cols[4]).text().replace(/\s+/g, ' ').trim() || null;
    const reach = $(cols[5]).text().replace(/\s+/g, ' ').trim() || null;
    const stance = $(cols[6]).text().replace(/\s+/g, ' ').trim() || null;
    const wins = parseInt($(cols[7]).text().trim()) || 0;
    const losses = parseInt($(cols[8]).text().trim()) || 0;
    const draws = parseInt($(cols[9]).text().trim()) || 0;

    const detailLink = $(cols[0]).find('a').attr('href') || null;

    fighters.push({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      nickname: nickname && nickname !== '--' ? nickname : null,
      height: height && height !== '--' ? height : null,
      weight: weight && weight !== '--' ? weight : null,
      reach: reach && reach !== '--' ? reach : null,
      stance: stance && stance !== '--' ? stance : null,
      wins,
      losses,
      draws,
      detailUrl: detailLink,
    });
  });

  return fighters;
}

/**
 * Scrape win methods from a fighter detail page
 */
async function scrapeWinMethods(detailUrl: string): Promise<{ ko: number; sub: number; dec: number }> {
  const res = await fetch(detailUrl, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const methods = { ko: 0, sub: 0, dec: 0 };

  $('.b-fight-details__table-body tr').each((_, row) => {
    const cols = $(row).find('td');
    if (cols.length < 8) return;
    const result = $(cols[0]).text().trim().replace(/\s+/g, ' ').toLowerCase();
    if (!result.startsWith('win')) return;
    const method = $(cols[7]).text().trim().replace(/\s+/g, ' ').toLowerCase();
    if (method.includes('ko') || method.includes('tko')) methods.ko++;
    else if (method.includes('sub')) methods.sub++;
    else if (method.includes('dec')) methods.dec++;
  });

  return methods;
}

/**
 * Scrape career stats from a fighter detail page
 */
async function scrapeCareerStats(detailUrl: string): Promise<Record<string, number | string | null>> {
  const res = await fetch(detailUrl, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const stats: Record<string, number | string | null> = {};

  // DOB
  const bioItems = $('.b-list__info-box_style_small-width .b-list__box-list-item');
  bioItems.each((_, item) => {
    const label = $(item).find('i').text().replace(/\s+/g, ' ').trim().toLowerCase();
    const value = $(item).clone().children().remove().end().text().replace(/\s+/g, ' ').trim();
    if (label.includes('dob') && value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        stats.dob = date.toISOString();
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
        stats.idade = age;
      }
    }
  });

  // Career stats
  const statItems = $('.b-list__info-box_style_middle-width .b-list__box-list-item');
  statItems.each((_, item) => {
    const label = $(item).find('i').text().replace(/\s+/g, ' ').trim().toLowerCase();
    const value = $(item).clone().children().remove().end().text().replace(/\s+/g, ' ').trim().replace('%', '');
    const num = parseFloat(value);
    if (isNaN(num)) return;

    if (label.includes('slpm')) stats.slpm = num;
    else if (label.includes('str. acc')) stats.str_acc = num;
    else if (label.includes('sapm')) stats.sapm = num;
    else if (label.includes('str. def')) stats.str_def = num;
    else if (label.includes('td avg')) stats.td_avg = num;
    else if (label.includes('td acc')) stats.td_acc = num;
    else if (label.includes('td def')) stats.td_def = num;
    else if (label.includes('sub. avg')) stats.sub_avg = num;
  });

  return stats;
}

async function main() {
  console.log('=== SYNC UFC FIGHTERS FROM UFCSTATS ===\n');

  // 1. Scrape all fighters from UFCStats A-Z
  console.log('Phase 1: Scraping all fighters from UFCStats.com...');
  const allFighters: UFCStatsFighter[] = [];
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  for (const letter of letters) {
    const fighters = await scrapeLetter(letter);
    allFighters.push(...fighters);
    process.stdout.write(`  ${letter.toUpperCase()}:${fighters.length} `);
    await sleep(DELAY_MS);
  }
  console.log(`\n  Total from UFCStats: ${allFighters.length}\n`);

  // 2. Get existing fighters from DB
  console.log('Phase 2: Comparing with database...');
  const existing = await prisma.lutadores.findMany({
    select: { nome: true },
  });
  const existingNames = new Set(existing.map((f) => f.nome.toLowerCase().trim()));
  console.log(`  Existing in DB: ${existingNames.size}`);

  // 3. Find missing fighters
  const missing = allFighters.filter((f) => !existingNames.has(f.fullName.toLowerCase().trim()));
  console.log(`  Missing from DB: ${missing.length}\n`);

  if (missing.length === 0) {
    console.log('No missing fighters! Database is up to date.');
    await prisma.$disconnect();
    return;
  }

  // 4. Insert missing fighters (basic data from the alphabetical table)
  console.log(`Phase 3: Inserting ${missing.length} fighters...`);
  let inserted = 0;
  let skipped = 0;

  for (const fighter of missing) {
    try {
      await prisma.lutadores.create({
        data: {
          nome: fighter.fullName,
          apelido: fighter.nickname,
          altura: fighter.height,
          envergadura: fighter.reach,
          stance: fighter.stance,
          vitorias: fighter.wins,
          derrotas: fighter.losses,
          empates: fighter.draws,
          ativo: true,
        },
      });
      inserted++;
    } catch {
      skipped++;
    }
  }
  console.log(`  Inserted: ${inserted} | Skipped: ${skipped}\n`);

  // 5. Backfill detailed stats + win methods for newly inserted fighters
  console.log(`Phase 4: Backfilling stats + win methods for ${inserted} new fighters...`);
  const newFighters = await prisma.lutadores.findMany({
    where: {
      last_stats_sync: null,
      ativo: true,
    },
    select: { id: true, nome: true },
    orderBy: { nome: 'asc' },
  });

  console.log(`  Found ${newFighters.length} fighters without stats sync.\n`);

  let statsUpdated = 0;
  let statsNotFound = 0;
  let statsErrors = 0;

  for (let i = 0; i < newFighters.length; i++) {
    const fighter = newFighters[i];
    const progress = `[${i + 1}/${newFighters.length}]`;

    try {
      // Search for fighter on UFCStats
      const parts = fighter.nome.trim().split(' ');
      const searchQuery = parts.length > 1 ? parts[parts.length - 1] : parts[0];
      const searchUrl = `http://www.ufcstats.com/statistics/fighters/search?query=${encodeURIComponent(searchQuery)}`;

      const searchRes = await fetch(searchUrl, {
        headers: { 'User-Agent': USER_AGENT },
      });
      const searchHtml = await searchRes.text();
      const $ = cheerio.load(searchHtml);

      const normalizedName = fighter.nome.toLowerCase().trim();
      let detailUrl: string | null = null;

      $('tr.b-statistics__table-row').each((_, row) => {
        const cols = $(row).find('td');
        if (cols.length >= 3) {
          const first = $(cols[0]).text().replace(/\s+/g, ' ').trim().toLowerCase();
          const last = $(cols[1]).text().replace(/\s+/g, ' ').trim().toLowerCase();
          if (`${first} ${last}` === normalizedName) {
            const link = $(cols[0]).find('a').attr('href');
            if (link) detailUrl = link;
          }
        }
      });

      if (!detailUrl) {
        console.log(`  ${progress} ${fighter.nome} — no detail URL`);
        statsNotFound++;
        await sleep(DELAY_MS);
        continue;
      }

      // Fetch detail page once
      const detailRes = await fetch(detailUrl, {
        headers: { 'User-Agent': USER_AGENT },
      });
      const detailHtml = await detailRes.text();
      const $d = cheerio.load(detailHtml);

      // Extract career stats
      const updateData: Record<string, unknown> = {};

      const bioItems = $d('.b-list__info-box_style_small-width .b-list__box-list-item');
      bioItems.each((_, item) => {
        const label = $d(item).find('i').text().replace(/\s+/g, ' ').trim().toLowerCase();
        const value = $d(item).clone().children().remove().end().text().replace(/\s+/g, ' ').trim();
        if (label.includes('dob') && value) {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            updateData.data_nascimento = date;
            const today = new Date();
            let age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
            updateData.idade = age;
          }
        }
      });

      const statItems = $d('.b-list__info-box_style_middle-width .b-list__box-list-item');
      statItems.each((_, item) => {
        const label = $d(item).find('i').text().replace(/\s+/g, ' ').trim().toLowerCase();
        const value = $d(item).clone().children().remove().end().text().replace(/\s+/g, ' ').trim().replace('%', '');
        const num = parseFloat(value);
        if (isNaN(num)) return;

        if (label.includes('slpm')) updateData.slpm = num;
        else if (label.includes('str. acc')) updateData.str_acc = num;
        else if (label.includes('sapm')) updateData.sapm = num;
        else if (label.includes('str. def')) updateData.str_def = num;
        else if (label.includes('td avg')) updateData.td_avg = num;
        else if (label.includes('td acc')) updateData.td_acc = num;
        else if (label.includes('td def')) updateData.td_def = num;
        else if (label.includes('sub. avg')) updateData.sub_avg = num;
      });

      // Extract win methods from fight table
      let ko = 0, sub = 0, dec = 0;
      $d('.b-fight-details__table-body tr').each((_, row) => {
        const cols = $d(row).find('td');
        if (cols.length < 8) return;
        const result = $d(cols[0]).text().trim().replace(/\s+/g, ' ').toLowerCase();
        if (!result.startsWith('win')) return;
        const method = $d(cols[7]).text().trim().replace(/\s+/g, ' ').toLowerCase();
        if (method.includes('ko') || method.includes('tko')) ko++;
        else if (method.includes('sub')) sub++;
        else if (method.includes('dec')) dec++;
      });

      updateData.nocautes = ko;
      updateData.finalizacoes = sub;
      updateData.decisoes = dec;
      updateData.last_stats_sync = new Date();
      updateData.updated_at = new Date();

      await prisma.lutadores.update({
        where: { id: fighter.id },
        data: updateData,
      });

      const statsCount = Object.keys(updateData).length - 2; // exclude timestamps
      console.log(`  ${progress} ${fighter.nome} — ${statsCount} fields, KO:${ko} SUB:${sub} DEC:${dec}`);
      statsUpdated++;
    } catch (error) {
      console.error(`  ${progress} ${fighter.nome} — ERROR: ${error instanceof Error ? error.message : error}`);
      statsErrors++;
    }

    if (i < newFighters.length - 1) await sleep(DELAY_MS);
  }

  console.log('\n=== SYNC COMPLETE ===');
  console.log(`New fighters inserted: ${inserted}`);
  console.log(`Stats backfilled: ${statsUpdated}`);
  console.log(`Not found: ${statsNotFound}`);
  console.log(`Errors: ${statsErrors}`);
  console.log(`Total in DB: ${existingNames.size + inserted}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
