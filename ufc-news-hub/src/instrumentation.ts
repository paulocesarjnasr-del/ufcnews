/**
 * Next.js Instrumentation - Auto-sync integrado
 *
 * Sincroniza automaticamente:
 * - Notícias: A cada 5 minutos (RSS Feed)
 * - Eventos: A cada 10 minutos (Scraping UFC.com)
 */

const NEWS_INTERVAL_MINUTES = parseInt(process.env.SYNC_INTERVAL_MINUTES || '5', 10);
const EVENTS_INTERVAL_MINUTES = parseInt(process.env.EVENTS_SYNC_INTERVAL_MINUTES || '10', 10);
const NEWS_INTERVAL_MS = NEWS_INTERVAL_MINUTES * 60 * 1000;
const EVENTS_INTERVAL_MS = EVENTS_INTERVAL_MINUTES * 60 * 1000;

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

async function runNewsSync(): Promise<void> {
  const now = new Date();
  console.info(`\n${'═'.repeat(50)}`);
  console.info(`📰 [${formatTime(now)}] Sync de NOTÍCIAS iniciando...`);
  console.info('═'.repeat(50));

  const port = process.env.PORT || '3010';
  const url = `http://localhost:${port}/api/sync`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      console.info(`✅ Notícias: +${result.adicionadas} novas | ${result.duplicadas} dup | ${result.rejeitadas} rej`);
      if (result.adicionadas > 0) {
        console.info(`🎉 ${result.adicionadas} notícia(s) nova(s)!`);
      }
    } else {
      console.info(`⚠️ Sync erro: ${result.error || 'Erro desconhecido'}`);
    }
  } catch (error) {
    console.error('❌ Erro no sync de notícias:', error instanceof Error ? error.message : error);
  }

  const nextSync = new Date(Date.now() + NEWS_INTERVAL_MS);
  console.info(`⏳ Próximo sync notícias: ${formatTime(nextSync)}`);
  console.info('─'.repeat(50));
}

async function runEventsSync(): Promise<void> {
  const now = new Date();
  console.info(`\n${'═'.repeat(50)}`);
  console.info(`🥊 [${formatTime(now)}] Sync de EVENTOS iniciando...`);
  console.info('═'.repeat(50));

  const port = process.env.PORT || '3010';
  const url = `http://localhost:${port}/api/sync-eventos`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      console.info(`✅ Eventos: ${result.eventosProcessados} processados`);
      if (result.eventosNovos > 0) {
        console.info(`🎉 ${result.eventosNovos} evento(s) novo(s)!`);
      }
      if (result.lutasNovas > 0) {
        console.info(`🥊 ${result.lutasNovas} luta(s) nova(s) adicionada(s)`);
      }
      if (result.lutasRemovidas > 0) {
        console.info(`❌ ${result.lutasRemovidas} luta(s) removida(s) (caíram do card)`);
      }
    } else {
      console.info(`⚠️ Sync erro: ${result.erro || 'Erro desconhecido'}`);
    }
  } catch (error) {
    console.error('❌ Erro no sync de eventos:', error instanceof Error ? error.message : error);
  }

  const nextSync = new Date(Date.now() + EVENTS_INTERVAL_MS);
  console.info(`⏳ Próximo sync eventos: ${formatTime(nextSync)}`);
  console.info('─'.repeat(50));
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const port = process.env.PORT || '3010';
    console.info('\n╔════════════════════════════════════════════════════════╗');
    console.info('║           🔄 AUTO-SYNC ATIVADO (REAL-TIME)             ║');
    console.info('╠════════════════════════════════════════════════════════╣');
    console.info(`║  📰 Notícias: a cada ${NEWS_INTERVAL_MINUTES} minutos                          ║`);
    console.info(`║  🥊 Eventos:  a cada ${EVENTS_INTERVAL_MINUTES} minutos                         ║`);
    console.info(`║  🔌 Porta:    ${port}                                       ║`);
    console.info('╚════════════════════════════════════════════════════════╝\n');

    // Sync de notícias após 8 segundos
    setTimeout(async () => {
      await runNewsSync();
      setInterval(runNewsSync, NEWS_INTERVAL_MS);
    }, 8000);

    // Sync de eventos após 15 segundos (dar tempo do servidor estabilizar)
    setTimeout(async () => {
      await runEventsSync();
      setInterval(runEventsSync, EVENTS_INTERVAL_MS);
    }, 15000);
  }
}
