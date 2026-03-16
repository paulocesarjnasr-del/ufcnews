/**
 * Central registry of all analyzed events.
 *
 * Each entry has an ISO datetime for the main card start.
 * The listing page uses this to auto-categorize:
 *   - "Analise Semanal" = now is between (evento - 48h) and (evento + 6h)
 *   - "Analises Anteriores" = now > (evento + 6h)
 *   - Hidden = now < (evento - 48h)
 *
 * AUTO-PUBLISH RULE: when the current event becomes "anterior" and no event
 * is "semanal", the next upcoming event is automatically promoted to "semanal"
 * so there is always a current analysis available for users.
 *
 * When a new event is analyzed, add an entry here.
 */

export interface EventRegistryEntry {
  /** URL slug for the event page: /analise/evento/[slug] */
  slug: string;
  /** Full event name */
  evento_nome: string;
  /** Display date string (Portuguese) */
  evento_data: string;
  /** Venue + city */
  evento_local: string;
  /** ISO 8601 datetime for main card start (UTC) */
  evento_datetime: string;
  /** Main event fighter names for display */
  main_event: { fighter1: string; fighter2: string };
  /** Total fights analyzed */
  total_fights: number;
}

export const EVENT_REGISTRY: EventRegistryEntry[] = [
  {
    slug: 'emmett-vs-vallejos',
    evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
    evento_data: '14 de Marco, 2026',
    evento_local: 'UFC APEX, Las Vegas, Nevada, EUA',
    evento_datetime: '2026-03-15T01:00:00Z', // 8pm ET = 1am UTC next day
    main_event: { fighter1: 'Josh Emmett', fighter2: 'Kevin Vallejos' },
    total_fights: 14,
  },
  {
    slug: 'evloev-vs-murphy',
    evento_nome: 'UFC Fight Night: Evloev vs Murphy',
    evento_data: '21 de Marco, 2026',
    evento_local: 'The O2 Arena, Londres, Reino Unido',
    evento_datetime: '2026-03-21T20:00:00Z', // 4pm ET = 8pm UTC
    main_event: { fighter1: 'Movsar Evloev', fighter2: 'Lerone Murphy' },
    total_fights: 14,
  },
];

/**
 * Categorize events based on current time.
 * - "semanal": between PUBLISH_HOURS before and ENDED_HOURS after main card start
 * - "anterior": more than ENDED_HOURS after main card start
 * - "oculto": more than PUBLISH_HOURS before main card start (not published yet)
 *
 * Defaults: publish 48h before, move to "anteriores" 6h after.
 */
export type EventCategory = 'semanal' | 'anterior' | 'oculto';

const PUBLISH_HOURS_BEFORE = 48;
const ENDED_HOURS_AFTER = 6;

export function categorizeEvent(
  evento_datetime: string,
  now: Date = new Date(),
): EventCategory {
  const eventTime = new Date(evento_datetime).getTime();
  const nowMs = now.getTime();

  const publishMs = PUBLISH_HOURS_BEFORE * 60 * 60 * 1000;
  const endedMs = ENDED_HOURS_AFTER * 60 * 60 * 1000;

  if (nowMs < eventTime - publishMs) return 'oculto';
  if (nowMs > eventTime + endedMs) return 'anterior';
  return 'semanal';
}

export function getCategorizedEvents(now: Date = new Date()) {
  const semanal: EventRegistryEntry[] = [];
  const anteriores: EventRegistryEntry[] = [];
  const ocultos: EventRegistryEntry[] = [];

  for (const event of EVENT_REGISTRY) {
    const cat = categorizeEvent(event.evento_datetime, now);
    if (cat === 'semanal') semanal.push(event);
    else if (cat === 'anterior') anteriores.push(event);
    else ocultos.push(event);
  }

  // AUTO-PUBLISH: when no event is currently 'semanal' and the most recent
  // event already moved to 'anterior', promote the next upcoming 'oculto'
  // event so users always have a current analysis to read.
  if (semanal.length === 0 && anteriores.length > 0 && ocultos.length > 0) {
    ocultos.sort(
      (a, b) => new Date(a.evento_datetime).getTime() - new Date(b.evento_datetime).getTime(),
    );
    semanal.push(ocultos[0]);
  }

  // Sort anteriores by date descending (most recent first)
  anteriores.sort(
    (a, b) => new Date(b.evento_datetime).getTime() - new Date(a.evento_datetime).getTime(),
  );

  return { semanal, anteriores };
}
