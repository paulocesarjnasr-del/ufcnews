/**
 * BACKFILL WIN METHODS (nocautes, finalizacoes, decisoes)
 *
 * Itera lutadores com vitorias > 0 mas sem breakdown de método,
 * scrapa a tabela de lutas do UFCStats, e conta KO/TKO, SUB, DEC.
 *
 * NOTA: UFCStats só mostra lutas UFC, não carreira total.
 * Os valores representam vitórias UFC por método.
 *
 * Rate limit: ~1 fighter/sec (search + detail = 2 requests)
 * Usage: npx tsx scripts/backfill-win-methods.ts
 */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import * as cheerio from 'cheerio';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const DELAY_MS = 600;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface WinMethods {
  nocautes: number;
  finalizacoes: number;
  decisoes: number;
}

/**
 * Search UFCStats for a fighter by name and return their detail URL
 */
async function searchFighter(name: string): Promise<string | null> {
  const parts = name.trim().split(' ');
  const searchQuery = parts.length > 1 ? parts[parts.length - 1] : parts[0];

  const url = `http://www.ufcstats.com/statistics/fighters/search?query=${encodeURIComponent(searchQuery)}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const normalizedName = name.toLowerCase().trim();
  let matchUrl: string | null = null;

  $('tr.b-statistics__table-row').each((_, row) => {
    const cols = $(row).find('td');
    if (cols.length >= 3) {
      const firstName = $(cols[0]).text().replace(/\s+/g, ' ').trim().toLowerCase();
      const lastName = $(cols[1]).text().replace(/\s+/g, ' ').trim().toLowerCase();
      const fullName = `${firstName} ${lastName}`;

      if (fullName === normalizedName) {
        const link = $(cols[0]).find('a').attr('href');
        if (link) matchUrl = link;
      }
    }
  });

  return matchUrl;
}

/**
 * Scrape win method breakdown from a fighter's detail page
 */
async function scrapeWinMethods(detailUrl: string): Promise<WinMethods> {
  const res = await fetch(detailUrl, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const methods: WinMethods = { nocautes: 0, finalizacoes: 0, decisoes: 0 };

  $('.b-fight-details__table-body tr').each((_, row) => {
    const cols = $(row).find('td');
    if (cols.length < 8) return;

    const result = $(cols[0]).text().trim().replace(/\s+/g, ' ').toLowerCase();
    if (!result.startsWith('win')) return;

    const method = $(cols[7]).text().trim().replace(/\s+/g, ' ').toLowerCase();

    if (method.includes('ko') || method.includes('tko')) {
      methods.nocautes++;
    } else if (method.includes('sub')) {
      methods.finalizacoes++;
    } else if (method.includes('dec')) {
      methods.decisoes++;
    }
    // Other methods (overturned, DQ, etc.) are not counted
  });

  return methods;
}

/**
 * Remove accents for name matching (handles Benoît → Benoit, etc.)
 */
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

async function searchFighterWithFallback(name: string): Promise<string | null> {
  let url = await searchFighter(name);
  if (url) return url;

  // Try without accents
  const deaccented = removeAccents(name);
  if (deaccented !== name) {
    url = await searchFighter(deaccented);
    if (url) return url;
  }

  return null;
}

async function main() {
  console.log('=== BACKFILL WIN METHODS ===');
  console.log('Source: UFCStats.com (UFC fights only)');
  console.log(`Rate limit: ~${Math.round(1000 / DELAY_MS)} fighters/sec\n`);

  // Find fighters with wins but no method breakdown
  const fighters = await prisma.lutadores.findMany({
    where: {
      ativo: true,
      vitorias: { gt: 0 },
      OR: [
        { nocautes: 0 },
        { nocautes: null },
      ],
      AND: [
        { OR: [{ finalizacoes: 0 }, { finalizacoes: null }] },
        { OR: [{ decisoes: 0 }, { decisoes: null }] },
      ],
    },
    select: { id: true, nome: true, vitorias: true },
    orderBy: { nome: 'asc' },
  });

  console.log(`Found ${fighters.length} fighters needing win method backfill.\n`);

  let updated = 0;
  let notFound = 0;
  let noWins = 0;
  let errors = 0;

  for (let i = 0; i < fighters.length; i++) {
    const fighter = fighters[i];
    const progress = `[${i + 1}/${fighters.length}]`;

    try {
      const detailUrl = await searchFighterWithFallback(fighter.nome);

      if (!detailUrl) {
        console.log(`  ${progress} ${fighter.nome} — NOT FOUND`);
        notFound++;
        if (i < fighters.length - 1) await sleep(DELAY_MS);
        continue;
      }

      const methods = await scrapeWinMethods(detailUrl);
      const total = methods.nocautes + methods.finalizacoes + methods.decisoes;

      if (total === 0) {
        console.log(`  ${progress} ${fighter.nome} — 0 UFC wins found (maybe pre-UFC only)`);
        noWins++;
        if (i < fighters.length - 1) await sleep(DELAY_MS);
        continue;
      }

      await prisma.lutadores.update({
        where: { id: fighter.id },
        data: {
          nocautes: methods.nocautes,
          finalizacoes: methods.finalizacoes,
          decisoes: methods.decisoes,
          updated_at: new Date(),
        },
      });

      console.log(`  ${progress} ${fighter.nome} — KO:${methods.nocautes} SUB:${methods.finalizacoes} DEC:${methods.decisoes} (total:${total}/${fighter.vitorias} career)`);
      updated++;
    } catch (error) {
      console.error(`  ${progress} ${fighter.nome} — ERROR: ${error instanceof Error ? error.message : error}`);
      errors++;
    }

    if (i < fighters.length - 1) await sleep(DELAY_MS);
  }

  console.log('\n=== BACKFILL COMPLETE ===');
  console.log(`Updated: ${updated}/${fighters.length}`);
  console.log(`Not found: ${notFound}`);
  console.log(`No UFC wins: ${noWins}`);
  console.log(`Errors: ${errors}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
