/**
 * BACKFILL FIGHTER STATS
 * Itera todos os lutadores no banco, scrapa UFCStats.com, e atualiza os dados.
 * Rate limit: 2 requests/segundo (1 search + 1 detail = ~1 fighter/sec)
 *
 * Usage: npx tsx scripts/backfill-fighter-stats.ts
 */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { getFighterStatsByName, type UFCFighterStats } from '../src/lib/ufcstats-scraper';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const DELAY_MS = 500; // 500ms between fighters = 2 req/s

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRecord(record: string): { wins: number; losses: number; draws: number } | null {
  const match = record.match(/(\d+)-(\d+)-(\d+)/);
  if (!match) return null;
  return { wins: parseInt(match[1]), losses: parseInt(match[2]), draws: parseInt(match[3]) };
}

function parseDob(dobStr: string | null): Date | null {
  if (!dobStr) return null;
  // UFCStats DOB format: "Mon DD, YYYY" e.g. "Jul 01, 1987"
  const date = new Date(dobStr);
  return isNaN(date.getTime()) ? null : date;
}

function calculateAge(dob: Date | null): number | null {
  if (!dob) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

async function backfillFighter(fighter: { id: string; nome: string }): Promise<{
  status: 'updated' | 'not_found' | 'error';
  fieldsUpdated: number;
}> {
  try {
    const stats: UFCFighterStats | null = await getFighterStatsByName(fighter.nome);

    if (!stats) {
      return { status: 'not_found', fieldsUpdated: 0 };
    }

    const dob = parseDob(stats.dob);
    const age = calculateAge(dob);
    const record = parseRecord(stats.record);

    // Build update object — only update non-null values
    const updateData: Record<string, unknown> = {};
    let fieldsUpdated = 0;

    if (stats.nickname) { updateData.apelido = stats.nickname; fieldsUpdated++; }
    if (stats.height) { updateData.altura = stats.height; fieldsUpdated++; }
    if (stats.reach) { updateData.envergadura = stats.reach; fieldsUpdated++; }
    if (stats.stance) { updateData.stance = stats.stance; fieldsUpdated++; }
    if (dob) { updateData.data_nascimento = dob; fieldsUpdated++; }
    if (age !== null) { updateData.idade = age; fieldsUpdated++; }

    // Record
    if (record) {
      updateData.vitorias = record.wins;
      updateData.derrotas = record.losses;
      updateData.empates = record.draws;
      fieldsUpdated += 3;
    }

    // Career stats
    if (stats.slpm !== null) { updateData.slpm = stats.slpm; fieldsUpdated++; }
    if (stats.strAcc !== null) { updateData.str_acc = stats.strAcc; fieldsUpdated++; }
    if (stats.sapm !== null) { updateData.sapm = stats.sapm; fieldsUpdated++; }
    if (stats.strDef !== null) { updateData.str_def = stats.strDef; fieldsUpdated++; }
    if (stats.tdAvg !== null) { updateData.td_avg = stats.tdAvg; fieldsUpdated++; }
    if (stats.tdAcc !== null) { updateData.td_acc = stats.tdAcc; fieldsUpdated++; }
    if (stats.tdDef !== null) { updateData.td_def = stats.tdDef; fieldsUpdated++; }
    if (stats.subAvg !== null) { updateData.sub_avg = stats.subAvg; fieldsUpdated++; }

    // Sync timestamp
    updateData.last_stats_sync = new Date();
    updateData.updated_at = new Date();

    if (fieldsUpdated > 0) {
      await prisma.lutadores.update({
        where: { id: fighter.id },
        data: updateData,
      });
    }

    return { status: 'updated', fieldsUpdated };
  } catch (error) {
    console.error(`  Error processing ${fighter.nome}:`, error instanceof Error ? error.message : error);
    return { status: 'error', fieldsUpdated: 0 };
  }
}

async function main() {
  console.log('=== BACKFILL FIGHTER STATS ===');
  console.log(`Source: UFCStats.com`);
  console.log(`Rate limit: 2 req/s (${DELAY_MS}ms delay)\n`);

  const fighters = await prisma.lutadores.findMany({
    where: { ativo: true },
    select: { id: true, nome: true },
    orderBy: { nome: 'asc' },
  });

  console.log(`Found ${fighters.length} active fighters to process.\n`);

  let updated = 0;
  let notFound = 0;
  let errors = 0;
  let totalFields = 0;

  for (let i = 0; i < fighters.length; i++) {
    const fighter = fighters[i];
    const progress = `[${i + 1}/${fighters.length}]`;

    const result = await backfillFighter(fighter);

    if (result.status === 'updated') {
      console.log(`  ${progress} ${fighter.nome} — ${result.fieldsUpdated} fields updated`);
      updated++;
      totalFields += result.fieldsUpdated;
    } else if (result.status === 'not_found') {
      console.log(`  ${progress} ${fighter.nome} — NOT FOUND on UFCStats`);
      notFound++;
    } else {
      console.log(`  ${progress} ${fighter.nome} — ERROR`);
      errors++;
    }

    // Rate limiting
    if (i < fighters.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log('\n=== BACKFILL COMPLETE ===');
  console.log(`Updated: ${updated}/${fighters.length}`);
  console.log(`Not found: ${notFound}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total fields updated: ${totalFields}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
