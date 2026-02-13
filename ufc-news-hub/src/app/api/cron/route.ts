import { NextResponse } from 'next/server';

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

  console.log(`[CRON] Sincronização completa finalizada - ${new Date().toISOString()}`);

  return results;
}

// GET — Called by Vercel Cron
export async function GET(request: Request) {
  // Vercel Cron sends user-agent "vercel-cron/1.0" — optionally verify
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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
