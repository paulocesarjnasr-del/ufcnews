/**
 * Reclassify all existing news articles with the fixed fighter matching algorithm.
 *
 * This script:
 * 1. Loads all active fighters from the database
 * 2. For each article, re-runs findMatchingFighters with the fixed algorithm
 * 3. Deletes old (wrong) fighter associations
 * 4. Inserts new (correct) fighter associations
 *
 * Usage:
 *   npx tsx scripts/reclassify-fighters.ts           # dry-run (shows what would change)
 *   npx tsx scripts/reclassify-fighters.ts --execute  # actually update the database
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

// ============ COPIED FROM keyword-classifier.ts ============

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const COMMON_WORDS = new Set([
  'abc', 'ace', 'air', 'animal', 'baby', 'bad', 'bang', 'bear', 'beast', 'big',
  'boom', 'boy', 'champion', 'crazy', 'dc', 'don', 'duke', 'evil', 'fire',
  'flash', 'fly', 'fury', 'gun', 'guns', 'heavy', 'hulk', 'ice',
  'iron', 'kid', 'killer', 'king', 'little', 'mad', 'mean', 'mini', 'monster',
  'no', 'old', 'pain', 'red', 'rock', 'rush', 'soldier', 'star', 'storm',
  'striker', 'sugar', 'suga', 'tank', 'the', 'the best', 'thug', 'war', 'young',
  'gato', 'leao', 'lobo', 'nego', 'sapo', 'grim',
]);

function isWordBoundaryMatch(text: string, term: string): boolean {
  const idx = text.indexOf(term);
  if (idx === -1) return false;
  if (idx > 0 && text[idx - 1] !== ' ') return false;
  const afterIdx = idx + term.length;
  if (afterIdx < text.length && text[afterIdx] !== ' ') return false;
  return true;
}

function findMatchingFighters(
  text: string,
  lutadores: Array<{ id: string; nome: string; apelido: string | null }>
): Array<{ id: string; nome: string }> {
  const normalizedText = normalizeText(text);
  const matched = new Map<string, { id: string; nome: string }>();

  const lastNameToFighters = new Map<string, Array<{ id: string; nome: string }>>();
  const nicknameToFighters = new Map<string, Array<{ id: string; nome: string }>>();

  for (const lutador of lutadores) {
    if (normalizedText.includes(normalizeText(lutador.nome))) {
      matched.set(lutador.id, { id: lutador.id, nome: lutador.nome });
      continue;
    }

    if (lutador.apelido && lutador.apelido.length > 2) {
      const normNick = normalizeText(lutador.apelido);
      if (normNick.length <= 2 || COMMON_WORDS.has(normNick)) continue;
      const nickMatches = normNick.length < 6
        ? isWordBoundaryMatch(normalizedText, normNick)
        : normalizedText.includes(normNick);
      if (nickMatches) {
        const existing = nicknameToFighters.get(normNick) || [];
        existing.push({ id: lutador.id, nome: lutador.nome });
        nicknameToFighters.set(normNick, existing);
      }
    }

    const parts = lutador.nome.split(' ');
    if (parts.length > 1) {
      const lastName = normalizeText(parts[parts.length - 1]);
      if (lastName.length > 4 && isWordBoundaryMatch(normalizedText, lastName)) {
        const existing = lastNameToFighters.get(lastName) || [];
        existing.push({ id: lutador.id, nome: lutador.nome });
        lastNameToFighters.set(lastName, existing);
      }
    }
  }

  for (const [, fighters] of nicknameToFighters) {
    if (fighters.length === 1) matched.set(fighters[0].id, fighters[0]);
  }
  for (const [, fighters] of lastNameToFighters) {
    if (fighters.length === 1) matched.set(fighters[0].id, fighters[0]);
  }

  return [...matched.values()];
}

// ============ MAIN SCRIPT ============

async function main() {
  const execute = process.argv.includes('--execute');

  console.log(`\n${'='.repeat(60)}`);
  console.log(execute ? '🔥 EXECUTING — will update the database' : '👀 DRY RUN — showing what would change');
  console.log(`${'='.repeat(60)}\n`);

  // 1. Load all active fighters
  const lutadoresResult = await pool.query<{ id: string; nome: string; apelido: string | null }>(
    'SELECT id, nome, apelido FROM lutadores WHERE ativo = true'
  );
  const lutadores = lutadoresResult.rows;
  console.log(`Loaded ${lutadores.length} active fighters\n`);

  // 2. Load all UFC news with their current fighter associations
  const noticiasResult = await pool.query<{ id: string; titulo: string; subtitulo: string | null }>(
    "SELECT id, titulo, subtitulo FROM noticias WHERE eh_sobre_ufc = true ORDER BY created_at DESC"
  );
  console.log(`Processing ${noticiasResult.rows.length} articles...\n`);

  let changed = 0;
  let unchanged = 0;
  let totalOldAssociations = 0;
  let totalNewAssociations = 0;

  for (const noticia of noticiasResult.rows) {
    const fullText = `${noticia.titulo} ${noticia.subtitulo || ''}`;

    // Get current associations
    const currentResult = await pool.query<{ lutador_id: string }>(
      'SELECT lutador_id FROM noticia_entidades WHERE noticia_id = $1',
      [noticia.id]
    );
    const currentIds = new Set(currentResult.rows.map(r => r.lutador_id));

    // Run new matching
    const newMatches = findMatchingFighters(fullText, lutadores);
    const newIds = new Set(newMatches.map(m => m.id));

    totalOldAssociations += currentIds.size;
    totalNewAssociations += newIds.size;

    // Check if anything changed
    const sameSize = currentIds.size === newIds.size;
    const sameContent = sameSize && [...currentIds].every(id => newIds.has(id));

    if (!sameContent) {
      changed++;

      const removed = [...currentIds].filter(id => !newIds.has(id));
      const added = [...newIds].filter(id => !currentIds.has(id));

      if (changed <= 20) { // Show first 20 changes
        const removedNames = removed.map(id => lutadores.find(l => l.id === id)?.nome || id);
        const addedNames = added.map(id => lutadores.find(l => l.id === id)?.nome || id);
        const keptNames = newMatches.filter(m => currentIds.has(m.id)).map(m => m.nome);

        console.log(`📝 ${noticia.titulo.substring(0, 70)}...`);
        if (removedNames.length > 0) console.log(`   ❌ Removed: ${removedNames.join(', ')}`);
        if (addedNames.length > 0) console.log(`   ✅ Added: ${addedNames.join(', ')}`);
        if (keptNames.length > 0) console.log(`   ⏸️  Kept: ${keptNames.join(', ')}`);
        console.log();
      }

      if (execute) {
        // Delete old associations
        await pool.query('DELETE FROM noticia_entidades WHERE noticia_id = $1', [noticia.id]);

        // Insert new associations
        for (const match of newMatches) {
          await pool.query(
            'INSERT INTO noticia_entidades (noticia_id, lutador_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [noticia.id, match.id]
          );
        }
      }
    } else {
      unchanged++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('RESULTS');
  console.log(`${'='.repeat(60)}`);
  console.log(`Total articles: ${noticiasResult.rows.length}`);
  console.log(`Changed: ${changed}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Old associations: ${totalOldAssociations}`);
  console.log(`New associations: ${totalNewAssociations}`);
  console.log(`Reduction: ${totalOldAssociations - totalNewAssociations} fewer associations`);

  if (!execute && changed > 0) {
    console.log(`\n⚠️  Run with --execute to apply changes`);
  }

  await pool.end();
}

main().catch(console.error);
