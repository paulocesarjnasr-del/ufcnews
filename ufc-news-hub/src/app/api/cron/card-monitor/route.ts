import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from '@/lib/admin-sessions';
import * as cheerio from 'cheerio';
import {
  ensureMonitorTable,
  getLatestSnapshot,
  saveSnapshot,
  saveMonitorLog,
  compareCards,
  matchEvento,
  sincronizarLutas,
  type ScrapedFight,
  type CardSnapshot,
} from '@/lib/card-monitor';
import { sendCardChangeAlert } from '@/lib/card-monitor-email';

// ═══════════════════════════════════════════════════════════
// Cron: Automated card check (runs 2x/day via Vercel Cron)
// Protected by CRON_SECRET
// ═══════════════════════════════════════════════════════════

const UFC_EVENTS_URL = 'https://www.ufc.com/events';

async function scrapeNextEvent(): Promise<{ evento_nome: string; evento_data: string; fights: ScrapedFight[] } | null> {
  try {
    const response = await fetch(UFC_EVENTS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('[Card Monitor Cron] UFC events page returned:', response.status);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Find the first upcoming event link
    const eventLink = $('a[href*="/event/ufc-fight-night"], a[href*="/event/ufc-"]')
      .filter(function () {
        const href = $(this).attr('href') || '';
        return !href.includes('past') && !href.includes('completed');
      })
      .first()
      .attr('href');

    if (!eventLink) {
      console.error('[Card Monitor Cron] No upcoming event found');
      return null;
    }

    const eventUrl = eventLink.startsWith('http') ? eventLink : `https://www.ufc.com${eventLink}`;

    // Fetch event page
    const eventResponse = await fetch(eventUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    if (!eventResponse.ok) {
      console.error('[Card Monitor Cron] Event page returned:', eventResponse.status);
      return null;
    }

    const eventHtml = await eventResponse.text();
    const $event = cheerio.load(eventHtml);

    // Extract event name
    const eventoNome = $event('h1').first().text().trim() || 'Unknown Event';

    // Extract event date
    const eventoData = $event('.c-hero__headline-suffix, .field--name-node-title')
      .first()
      .text()
      .trim() || '';

    // Extract fights — multi-strategy approach for resilience
    const fights: ScrapedFight[] = [];

    // Strategy 1: Classic UFC selectors (works for most events)
    $event('.c-listing-fight, .l-listing__item').each(function () {
      const fighters = $(this).find('.c-listing-fight__corner-name, .c-listing-fight__corner');
      if (fighters.length >= 2) {
        const f1Parts: string[] = [];
        const f2Parts: string[] = [];

        fighters.eq(0).find('.c-listing-fight__corner-given-name, .c-listing-fight__corner-family-name').each(function () {
          f1Parts.push($(this).text().trim());
        });
        fighters.eq(1).find('.c-listing-fight__corner-given-name, .c-listing-fight__corner-family-name').each(function () {
          f2Parts.push($(this).text().trim());
        });

        const fighter1 = f1Parts.join(' ').trim();
        const fighter2 = f2Parts.join(' ').trim();

        if (fighter1 && fighter2) {
          const weightClass = $(this).find('.c-listing-fight__class-text').first().text().trim().replace(/Bout.*$/i, '').trim() || '';
          fights.push({ fighter1, fighter2, weight_class: weightClass });
        }
      }
    });

    // Strategy 2: Extract from athlete links if Strategy 1 missed fights
    // Collect all /athlete/ links in order, then pair them
    const athleteLinks: { name: string; href: string }[] = [];
    $event('a[href*="/athlete/"]').each(function () {
      const href = $(this).attr('href') || '';
      const name = $(this).text().trim();
      if (name && name.length > 1 && name.length < 50 && !href.includes('#')) {
        athleteLinks.push({ name, href });
      }
    });

    // Deduplicate consecutive athlete links (same fighter appears multiple times)
    const dedupedAthletes: { name: string; href: string }[] = [];
    for (const link of athleteLinks) {
      const last = dedupedAthletes[dedupedAthletes.length - 1];
      if (!last || last.href !== link.href) {
        dedupedAthletes.push(link);
      }
    }

    // Pair consecutive unique athletes as fights
    for (let i = 0; i < dedupedAthletes.length - 1; i += 2) {
      const f1 = dedupedAthletes[i].name;
      const f2 = dedupedAthletes[i + 1].name;
      if (f1 && f2) {
        // Check if this fight already exists from Strategy 1
        const alreadyFound = fights.some(f => {
          const key1 = [f.fighter1, f.fighter2].sort().join('|').toLowerCase();
          const key2 = [f1, f2].sort().join('|').toLowerCase();
          return key1 === key2;
        });
        if (!alreadyFound) {
          fights.push({ fighter1: f1, fighter2: f2, weight_class: '' });
        }
      }
    }

    // Deduplicate all fights
    const seen = new Set<string>();
    const uniqueFights: ScrapedFight[] = [];
    for (const fight of fights) {
      const key = [fight.fighter1, fight.fighter2].sort().join('|').toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueFights.push(fight);
      }
    }

    if (uniqueFights.length === 0) {
      console.warn('[Card Monitor Cron] No fights found on event page');
      return null;
    }

    return { evento_nome: eventoNome, evento_data: eventoData, fights: uniqueFights };
  } catch (error) {
    console.error('[Card Monitor Cron] Scrape error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  // Verify auth: accept either CRON_SECRET or admin token
  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.replace('Bearer ', '') || '';
  const cronSecret = process.env.CRON_SECRET;

  const isCronAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const isAdminAuth = validateToken(bearerToken);

  if (!isCronAuth && !isAdminAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureMonitorTable();

    const scrapedData = await scrapeNextEvent();

    if (!scrapedData) {
      await saveMonitorLog({
        evento_nome: 'Unknown',
        checked_at: new Date().toISOString(),
        changes_detected: false,
        changes: [],
        status: 'error',
        error_message: 'Nao foi possivel scrape do proximo evento',
      });

      return NextResponse.json({
        message: 'Nao foi possivel obter dados do proximo evento',
        status: 'error',
      });
    }

    const { evento_nome, evento_data, fights } = scrapedData;
    const previousSnapshot = await getLatestSnapshot(evento_nome);

    const newSnapshot: CardSnapshot = {
      evento_nome,
      evento_data,
      fights,
      scraped_at: new Date().toISOString(),
    };

    if (!previousSnapshot) {
      await saveSnapshot(newSnapshot);
      await saveMonitorLog({
        evento_nome,
        checked_at: new Date().toISOString(),
        changes_detected: false,
        changes: [],
        status: 'ok',
      });

      // Sync on first snapshot too
      let syncResult = null;
      const eventoFirst = await matchEvento();
      if (eventoFirst && fights.length > 0) {
        try {
          syncResult = await sincronizarLutas(eventoFirst.id, eventoFirst.nome, fights);
        } catch (syncError) {
          console.error('[Card Monitor] Sync error on first snapshot:', syncError);
        }
      }

      return NextResponse.json({
        message: 'Primeiro snapshot salvo e lutas sincronizadas',
        evento_nome,
        fights_count: fights.length,
        sync: syncResult,
      });
    }

    const changes = compareCards(previousSnapshot.fights, fights);
    await saveSnapshot(newSnapshot);

    await saveMonitorLog({
      evento_nome,
      checked_at: new Date().toISOString(),
      changes_detected: changes.length > 0,
      changes,
      status: changes.length > 0 ? 'changes_detected' : 'ok',
    });

    if (changes.length > 0) {
      await sendCardChangeAlert(evento_nome, changes);
    }

    // Always sync lutas table with scraped data
    let syncResult = null;
    const evento = await matchEvento();
    if (evento && fights.length > 0) {
      try {
        syncResult = await sincronizarLutas(evento.id, evento.nome, fights);
      } catch (syncError) {
        console.error('[Card Monitor] Sync error:', syncError);
      }
    }

    return NextResponse.json({
      message: changes.length > 0
        ? `${changes.length} mudanca(s) detectada(s) e sincronizada(s)`
        : 'Nenhuma mudanca detectada. Lutas sincronizadas.',
      evento_nome,
      fights_count: fights.length,
      changes,
      sync: syncResult,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Card Monitor Cron] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
