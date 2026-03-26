import { query, queryOne } from '@/lib/db';

// ═══════════════════════════════════════════════════════════
// Card Monitor: Detects changes in UFC event cards
// ═══════════════════════════════════════════════════════════

export interface ScrapedFight {
  fighter1: string;
  fighter2: string;
  weight_class: string;
  is_main_event?: boolean;
}

export interface CardSnapshot {
  evento_nome: string;
  evento_data: string;
  fights: ScrapedFight[];
  scraped_at: string;
}

export interface CardChange {
  type: 'fight_removed' | 'fight_added' | 'opponent_changed' | 'card_cancelled';
  description: string;
  fighter1?: string;
  fighter2?: string;
  old_value?: string;
  new_value?: string;
}

export interface MonitorLog {
  id: string;
  evento_nome: string;
  checked_at: string;
  changes_detected: boolean;
  changes: CardChange[];
  status: 'ok' | 'changes_detected' | 'error';
  error_message?: string;
}

// ═══════════════════════════════════════════════════════════
// DB Operations
// ═══════════════════════════════════════════════════════════

export async function ensureMonitorTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS card_monitor_logs (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      evento_nome TEXT NOT NULL,
      checked_at TIMESTAMPTZ DEFAULT NOW(),
      changes_detected BOOLEAN DEFAULT FALSE,
      changes JSONB DEFAULT '[]'::jsonb,
      status TEXT DEFAULT 'ok',
      error_message TEXT,
      snapshot JSONB
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS card_snapshots (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      evento_nome TEXT NOT NULL,
      evento_data TEXT,
      fights JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      is_latest BOOLEAN DEFAULT TRUE
    )
  `);
}

export async function saveSnapshot(snapshot: CardSnapshot): Promise<void> {
  // Mark previous snapshots as not latest
  await query(
    'UPDATE card_snapshots SET is_latest = FALSE WHERE evento_nome = $1',
    [snapshot.evento_nome]
  );

  await query(
    `INSERT INTO card_snapshots (evento_nome, evento_data, fights, is_latest)
     VALUES ($1, $2, $3, TRUE)`,
    [snapshot.evento_nome, snapshot.evento_data, JSON.stringify(snapshot.fights)]
  );
}

export async function getLatestSnapshot(eventoNome: string): Promise<CardSnapshot | null> {
  const row = await queryOne<{
    evento_nome: string;
    evento_data: string;
    fights: ScrapedFight[];
    created_at: string;
  }>(
    'SELECT evento_nome, evento_data, fights, created_at FROM card_snapshots WHERE evento_nome = $1 AND is_latest = TRUE',
    [eventoNome]
  );

  if (!row) return null;

  return {
    evento_nome: row.evento_nome,
    evento_data: row.evento_data,
    fights: row.fights,
    scraped_at: row.created_at,
  };
}

export async function saveMonitorLog(log: Omit<MonitorLog, 'id'>): Promise<void> {
  await query(
    `INSERT INTO card_monitor_logs (evento_nome, checked_at, changes_detected, changes, status, error_message)
     VALUES ($1, NOW(), $2, $3, $4, $5)`,
    [
      log.evento_nome,
      log.changes_detected,
      JSON.stringify(log.changes),
      log.status,
      log.error_message || null,
    ]
  );
}

export async function getMonitorLogs(limit = 20): Promise<MonitorLog[]> {
  return query<MonitorLog>(
    'SELECT id, evento_nome, checked_at, changes_detected, changes, status, error_message FROM card_monitor_logs ORDER BY checked_at DESC LIMIT $1',
    [limit]
  );
}

// ═══════════════════════════════════════════════════════════
// Card Comparison
// ═══════════════════════════════════════════════════════════

function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z\s]/g, '');
}

function fightsMatch(a: ScrapedFight, b: ScrapedFight): boolean {
  const a1 = normalizeName(a.fighter1);
  const a2 = normalizeName(a.fighter2);
  const b1 = normalizeName(b.fighter1);
  const b2 = normalizeName(b.fighter2);

  return (a1 === b1 && a2 === b2) || (a1 === b2 && a2 === b1);
}

function findFightByFighter(fights: ScrapedFight[], fighterName: string): ScrapedFight | undefined {
  const normalized = normalizeName(fighterName);
  return fights.find(
    (f) => normalizeName(f.fighter1) === normalized || normalizeName(f.fighter2) === normalized
  );
}

export function compareCards(previous: ScrapedFight[], current: ScrapedFight[]): CardChange[] {
  const changes: CardChange[] = [];

  // Check for removed fights
  for (const prevFight of previous) {
    const stillExists = current.some((f) => fightsMatch(f, prevFight));
    if (!stillExists) {
      // Check if one fighter got a new opponent
      const f1InNew = findFightByFighter(current, prevFight.fighter1);
      const f2InNew = findFightByFighter(current, prevFight.fighter2);

      if (f1InNew && !fightsMatch(f1InNew, prevFight)) {
        const newOpponent = normalizeName(f1InNew.fighter1) === normalizeName(prevFight.fighter1)
          ? f1InNew.fighter2
          : f1InNew.fighter1;
        changes.push({
          type: 'opponent_changed',
          description: `${prevFight.fighter1} agora enfrenta ${newOpponent} (antes: ${prevFight.fighter2})`,
          fighter1: prevFight.fighter1,
          old_value: prevFight.fighter2,
          new_value: newOpponent,
        });
      } else if (f2InNew && !fightsMatch(f2InNew, prevFight)) {
        const newOpponent = normalizeName(f2InNew.fighter1) === normalizeName(prevFight.fighter2)
          ? f2InNew.fighter2
          : f2InNew.fighter1;
        changes.push({
          type: 'opponent_changed',
          description: `${prevFight.fighter2} agora enfrenta ${newOpponent} (antes: ${prevFight.fighter1})`,
          fighter1: prevFight.fighter2,
          old_value: prevFight.fighter1,
          new_value: newOpponent,
        });
      } else {
        changes.push({
          type: 'fight_removed',
          description: `${prevFight.fighter1} vs ${prevFight.fighter2} foi removida do card`,
          fighter1: prevFight.fighter1,
          fighter2: prevFight.fighter2,
        });
      }
    }
  }

  // Check for added fights (that aren't opponent changes already detected)
  for (const currFight of current) {
    const existedBefore = previous.some((f) => fightsMatch(f, currFight));
    if (!existedBefore) {
      const alreadyHandled = changes.some(
        (c) =>
          c.type === 'opponent_changed' &&
          (c.new_value === currFight.fighter1 ||
            c.new_value === currFight.fighter2 ||
            c.fighter1 === currFight.fighter1 ||
            c.fighter1 === currFight.fighter2)
      );
      if (!alreadyHandled) {
        changes.push({
          type: 'fight_added',
          description: `${currFight.fighter1} vs ${currFight.fighter2} foi adicionada ao card`,
          fighter1: currFight.fighter1,
          fighter2: currFight.fighter2,
        });
      }
    }
  }

  return changes;
}

// ═══════════════════════════════════════════════════════════
// Weight Class Translation
// ═══════════════════════════════════════════════════════════

const WEIGHT_CLASS_MAP: Record<string, string> = {
  'flyweight': 'Peso Mosca',
  'bantamweight': 'Peso Galo',
  'featherweight': 'Peso Pena',
  'lightweight': 'Peso Leve',
  'welterweight': 'Peso Meio-Medio',
  'middleweight': 'Peso Medio',
  'light heavyweight': 'Peso Meio-Pesado',
  'heavyweight': 'Peso Pesado',
  "women's strawweight": 'Peso Palha Feminino',
  "women's flyweight": 'Peso Mosca Feminino',
  "women's bantamweight": 'Peso Galo Feminino',
  "women's featherweight": 'Peso Pena Feminino',
};

function translateWeightClass(raw: string): string {
  const cleaned = raw.toLowerCase().replace(/\s*bout.*$/i, '').trim();
  return WEIGHT_CLASS_MAP[cleaned] || 'Peso Casado';
}

// ═══════════════════════════════════════════════════════════
// Fighter Matching
// ═══════════════════════════════════════════════════════════

async function matchLutador(nome: string): Promise<string | null> {
  const trimmed = nome.trim();
  if (!trimmed) return null;

  // Exact match (case-insensitive)
  const exact = await queryOne<{ id: string }>(
    'SELECT id FROM lutadores WHERE LOWER(nome) = LOWER($1)',
    [trimmed]
  );
  if (exact) return exact.id;

  // Fuzzy: match by last name
  const parts = trimmed.split(' ');
  const lastName = parts[parts.length - 1];
  if (lastName.length < 2) return null;

  const fuzzy = await queryOne<{ id: string; nome: string }>(
    `SELECT id, nome FROM lutadores
     WHERE LOWER(nome) LIKE '%' || LOWER($1)
     ORDER BY LENGTH(nome) ASC LIMIT 1`,
    [lastName]
  );
  if (fuzzy) return fuzzy.id;

  // Not found: auto-create fighter with basic data
  const created = await queryOne<{ id: string }>(
    `INSERT INTO lutadores (nome, vitorias, derrotas, empates)
     VALUES ($1, 0, 0, 0)
     RETURNING id`,
    [trimmed]
  );
  if (created) {
    console.info(`[Card Sync] Lutador criado automaticamente: ${trimmed}`);
    return created.id;
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
// Event Matching
// ═══════════════════════════════════════════════════════════

export async function matchEvento(): Promise<{ id: string; nome: string } | null> {
  // Get the next agendado or ao_vivo event
  const evento = await queryOne<{ id: string; nome: string }>(
    `SELECT id, nome FROM eventos
     WHERE status IN ('agendado', 'ao_vivo')
     ORDER BY data_evento ASC
     LIMIT 1`
  );
  return evento ?? null;
}

// ═══════════════════════════════════════════════════════════
// Sync Lutas — The Missing Piece
// ═══════════════════════════════════════════════════════════

export interface SyncResult {
  added: string[];
  removed: string[];
  updated: string[];
  reordered: boolean;
  picksInvalidated: number;
  errors: string[];
}

export async function sincronizarLutas(eventoId: string, eventoNome: string, scrapedFights: ScrapedFight[]): Promise<SyncResult> {
  const result: SyncResult = { added: [], removed: [], updated: [], reordered: false, picksInvalidated: 0, errors: [] };

  // 1. Get current lutas from DB
  const currentLutas = await query<{
    id: string; lutador1_id: string; lutador2_id: string;
    lutador1_nome: string; lutador2_nome: string; ordem: number; status: string;
  }>(
    `SELECT l.id, l.lutador1_id, l.lutador2_id,
            lut1.nome as lutador1_nome, lut2.nome as lutador2_nome,
            l.ordem, l.status::text as status
     FROM lutas l
     JOIN lutadores lut1 ON lut1.id = l.lutador1_id
     JOIN lutadores lut2 ON lut2.id = l.lutador2_id
     WHERE l.evento_id = $1 AND l.status != 'cancelada'
     ORDER BY l.ordem DESC`,
    [eventoId]
  );

  // 2. Build lookup for current DB fights
  const dbFightMap = new Map<string, typeof currentLutas[0]>();
  for (const luta of currentLutas) {
    const key = [luta.lutador1_nome, luta.lutador2_nome].map(n => n.toLowerCase()).sort().join('|');
    dbFightMap.set(key, luta);
  }

  // 3. Build set of scraped fight keys
  const scrapedKeys = new Set<string>();
  for (const fight of scrapedFights) {
    const key = [fight.fighter1, fight.fighter2].map(n => n.toLowerCase()).sort().join('|');
    scrapedKeys.add(key);
  }

  // 4. REMOVE / UPDATE: fights in DB but not in UFC.com
  for (const luta of currentLutas) {
    if (luta.status === 'finalizada') continue;
    const key = [luta.lutador1_nome, luta.lutador2_nome].map(n => n.toLowerCase()).sort().join('|');
    if (scrapedKeys.has(key)) continue;

    // Check if it's an opponent change (one fighter still in scraped)
    const f1Lower = luta.lutador1_nome.toLowerCase();
    const f2Lower = luta.lutador2_nome.toLowerCase();

    const f1InScraped = scrapedFights.find(f =>
      f.fighter1.toLowerCase() === f1Lower || f.fighter2.toLowerCase() === f1Lower
    );
    const f2InScraped = scrapedFights.find(f =>
      f.fighter1.toLowerCase() === f2Lower || f.fighter2.toLowerCase() === f2Lower
    );

    if (f1InScraped) {
      // Fighter1 stays, opponent changed
      const newOpponentName = f1InScraped.fighter1.toLowerCase() === f1Lower
        ? f1InScraped.fighter2 : f1InScraped.fighter1;
      const newOpponentId = await matchLutador(newOpponentName);
      if (newOpponentId) {
        await query('UPDATE lutas SET lutador2_id = $1, categoria_peso = $2 WHERE id = $3',
          [newOpponentId, translateWeightClass(f1InScraped.weight_class), luta.id]);
        result.updated.push(`${luta.lutador1_nome}: ${luta.lutador2_nome} → ${newOpponentName}`);
        // Invalidate picks
        const deleted = await query<{ usuario_id: string }>(
          'DELETE FROM previsoes WHERE luta_id = $1 RETURNING usuario_id', [luta.id]);
        result.picksInvalidated += deleted.length;
      } else {
        result.errors.push(`Lutador nao encontrado: ${newOpponentName}`);
      }
    } else if (f2InScraped) {
      // Fighter2 stays, opponent changed
      const newOpponentName = f2InScraped.fighter1.toLowerCase() === f2Lower
        ? f2InScraped.fighter2 : f2InScraped.fighter1;
      const newOpponentId = await matchLutador(newOpponentName);
      if (newOpponentId) {
        await query('UPDATE lutas SET lutador1_id = $1, categoria_peso = $2 WHERE id = $3',
          [newOpponentId, translateWeightClass(f2InScraped.weight_class), luta.id]);
        result.updated.push(`${luta.lutador2_nome}: ${luta.lutador1_nome} → ${newOpponentName}`);
        const deleted = await query<{ usuario_id: string }>(
          'DELETE FROM previsoes WHERE luta_id = $1 RETURNING usuario_id', [luta.id]);
        result.picksInvalidated += deleted.length;
      } else {
        result.errors.push(`Lutador nao encontrado: ${newOpponentName}`);
      }
    } else {
      // Fight completely removed
      await query("UPDATE lutas SET status = 'cancelada' WHERE id = $1", [luta.id]);
      const deleted = await query<{ usuario_id: string }>(
        'DELETE FROM previsoes WHERE luta_id = $1 RETURNING usuario_id', [luta.id]);
      result.picksInvalidated += deleted.length;
      result.removed.push(`${luta.lutador1_nome} vs ${luta.lutador2_nome}`);
    }
  }

  // 5. ADD: fights in UFC.com but not in DB
  for (const fight of scrapedFights) {
    const key = [fight.fighter1, fight.fighter2].map(n => n.toLowerCase()).sort().join('|');
    if (dbFightMap.has(key)) continue;

    // Skip if handled as opponent change
    const wasUpdated = result.updated.some(u =>
      u.toLowerCase().includes(fight.fighter1.toLowerCase()) ||
      u.toLowerCase().includes(fight.fighter2.toLowerCase())
    );
    if (wasUpdated) continue;

    const f1Id = await matchLutador(fight.fighter1);
    const f2Id = await matchLutador(fight.fighter2);

    if (!f1Id) { result.errors.push(`Lutador nao encontrado: ${fight.fighter1}`); continue; }
    if (!f2Id) { result.errors.push(`Lutador nao encontrado: ${fight.fighter2}`); continue; }

    const categoria = translateWeightClass(fight.weight_class);
    const isMainEvent = fight.is_main_event === true;

    await query(
      `INSERT INTO lutas (evento_id, lutador1_id, lutador2_id, categoria_peso, tipo, ordem, rounds, status)
       VALUES ($1, $2, $3, $4, $5, 0, $6, 'agendada')`,
      [eventoId, f1Id, f2Id, categoria, isMainEvent ? 'main_event' : 'preliminar', isMainEvent ? 5 : 3]
    );
    result.added.push(`${fight.fighter1} vs ${fight.fighter2}`);
  }

  // 6. REORDER: match UFC.com order
  // scrapedFights[0] = main event (ordem 1), last = first prelim (highest ordem)
  const totalFights = scrapedFights.length;
  for (let i = 0; i < totalFights; i++) {
    const fight = scrapedFights[i];
    const ordem = totalFights - i; // main event (i=0) gets highest... wait

    // UFC.com lists main event first. Our ordem: 1 = main event, highest = first prelim
    // So: scrapedFights[0] = main event = ordem 1
    //     scrapedFights[last] = first prelim = ordem totalFights
    const fightOrdem = totalFights - i;

    const f1Id = await matchLutador(fight.fighter1);
    const f2Id = await matchLutador(fight.fighter2);
    if (!f1Id || !f2Id) continue;

    // Determine tipo based on position
    let tipo: string;
    if (i === 0) {
      tipo = 'main_event';
    } else if (i <= 4) {
      tipo = 'card_principal';
    } else {
      tipo = 'preliminar';
    }

    await query(
      `UPDATE lutas SET ordem = $1, tipo = $2
       WHERE evento_id = $3 AND status != 'cancelada'
         AND ((lutador1_id = $4 AND lutador2_id = $5) OR (lutador1_id = $5 AND lutador2_id = $4))`,
      [fightOrdem, tipo, eventoId, f1Id, f2Id]
    );
  }
  result.reordered = true;

  console.info(`[Card Sync] ${eventoNome}: +${result.added.length} added, -${result.removed.length} removed, ~${result.updated.length} updated, ${result.picksInvalidated} picks invalidated`);
  return result;
}
