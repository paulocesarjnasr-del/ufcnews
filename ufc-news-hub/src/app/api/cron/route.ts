import { NextResponse } from 'next/server';
import { emitEvent, processEvents } from '@/lib/ai-company/event-bus';

// Endpoint para ser chamado por um cron job externo
// Exemplo: curl -X POST http://localhost:3000/api/cron?secret=YOUR_SECRET
//
// Este endpoint sincroniza TANTO notícias QUANTO eventos (incluindo posters)
// Recomendado rodar a cada 15-30 minutos

// Shared sync logic used by both GET (Vercel Cron) and POST (manual trigger)
async function runSync(baseUrl: string) {
  const results: {
    noticias?: unknown;
    eventos?: unknown;
    errors: string[];
  } = { errors: [] };

  console.log(`[CRON] Iniciando sincronização completa - ${new Date().toISOString()}`);

  // 1. Sincronizar NOTÍCIAS
  console.log('[CRON] Sincronizando notícias...');
  try {
    const noticiasResponse = await fetch(`${baseUrl}/api/sync`, {
      method: 'POST',
    });
    results.noticias = await noticiasResponse.json();
    console.log('[CRON] Notícias sincronizadas:', results.noticias);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[CRON] Erro ao sincronizar notícias:', errorMsg);
    results.errors.push(`Notícias: ${errorMsg}`);
  }

  // 2. Sincronizar EVENTOS (incluindo posters!)
  console.log('[CRON] Sincronizando eventos (incluindo posters)...');
  try {
    const eventosResponse = await fetch(`${baseUrl}/api/sync-eventos`, {
      method: 'POST',
    });
    results.eventos = await eventosResponse.json();
    console.log('[CRON] Eventos sincronizados:', results.eventos);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[CRON] Erro ao sincronizar eventos:', errorMsg);
    results.errors.push(`Eventos: ${errorMsg}`);
  }

  // 2.5. Cleanup old news (>24h)
  console.log('[CRON] Limpando notícias > 24h...');
  try {
    const deleteResult = await fetch(`${baseUrl}/api/news/cleanup`, {
      method: 'POST',
    });
    const cleanupData = await deleteResult.json();
    (results as Record<string, unknown>).cleanup = cleanupData;
    console.log('[CRON] Cleanup:', cleanupData);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[CRON] Erro no cleanup:', errorMsg);
    results.errors.push(`Cleanup: ${errorMsg}`);
  }

  // 3. Analysis generation — 2 days before next event
  console.log('[CRON] Checking if analysis generation needed (2 days before event)...');
  try {
    const { queryOne: cronQueryOne } = await import('@/lib/db');
    const nextEvent = await cronQueryOne<{ id: string; nome: string; data_evento: string }>(
      `SELECT id, nome, data_evento FROM eventos
       WHERE status = 'agendado' AND data_evento > NOW()
       ORDER BY data_evento ASC LIMIT 1`
    );
    if (nextEvent) {
      const daysUntil = (new Date(nextEvent.data_evento).getTime() - Date.now()) / 86400000;
      const alreadyExists = await cronQueryOne<{ id: string }>(
        `SELECT id FROM analises WHERE evento_id = $1`, [nextEvent.id]
      );
      if (daysUntil <= 2 && daysUntil >= 0 && !alreadyExists) {
        console.log(`[CRON] Event "${nextEvent.nome}" is ${daysUntil.toFixed(1)} days away — generating analysis...`);
        const analysisResponse = await fetch(`${baseUrl}/api/analises/generate?secret=${process.env.CRON_SECRET || 'ufc-news-cron-secret'}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ evento_id: nextEvent.id }),
        });
        const analysisResult = await analysisResponse.json();
        (results as Record<string, unknown>).analise = analysisResult;
        console.log('[CRON] Analysis result:', analysisResult);
      } else if (alreadyExists) {
        console.log(`[CRON] Analysis already exists for "${nextEvent.nome}"`);
      } else {
        console.log(`[CRON] Next event "${nextEvent.nome}" is ${daysUntil.toFixed(1)} days away — too early`);
      }
    } else {
      console.log('[CRON] No upcoming events found');
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[CRON] Erro ao gerar análise:', errorMsg);
    results.errors.push(`Análise: ${errorMsg}`);
  }

  // 4. Emit daily event for AI Company agents
  const today = new Date();
  console.log('[CRON] Emitting cron.daily event for AI agents...');
  try {
    await emitEvent('cron.daily', { timestamp: new Date().toISOString() });

    // Weekly event on Mondays
    if (today.getUTCDay() === 1) {
      await emitEvent('cron.weekly', { timestamp: new Date().toISOString() });
    }

    // Process pending events (including the ones just emitted)
    const eventResults = await processEvents();
    (results as Record<string, unknown>).eventBus = eventResults;
    console.log('[CRON] Event bus processed:', eventResults);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[CRON] Erro no event bus:', errorMsg);
    results.errors.push(`EventBus: ${errorMsg}`);
  }

  console.log(`[CRON] Sincronização completa finalizada - ${new Date().toISOString()}`);

  return results;
}

// GET — Called by Vercel Cron
export async function GET(request: Request) {
  // Vercel Cron sends user-agent "vercel-cron/1.0" — optionally verify
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || '3010'}`;

  try {
    const results = await runSync(baseUrl);
    return NextResponse.json({
      success: results.errors.length === 0,
      noticias: results.noticias,
      eventos: results.eventos,
      errors: results.errors.length > 0 ? results.errors : undefined,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[CRON] Erro fatal no cron:', error);
    return NextResponse.json(
      { error: 'Erro na sincronização', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}

// POST — Manual trigger with secret
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expectedSecret = process.env.CRON_SECRET || 'ufc-news-cron-secret';

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || '3010'}`;

  try {
    const results = await runSync(baseUrl);
    return NextResponse.json({
      success: results.errors.length === 0,
      noticias: results.noticias,
      eventos: results.eventos,
      errors: results.errors.length > 0 ? results.errors : undefined,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[CRON] Erro fatal no cron:', error);
    return NextResponse.json(
      { error: 'Erro na sincronização', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
