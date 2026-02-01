import cron from 'node-cron';
import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

// Configurações do auto-sync
const SYNC_CONFIG = {
  // Rodar às 6h UTC (3h Brasília) - horário de baixo tráfego
  cronSchedule: '0 6 * * *',
  baseUrl: 'https://www.ufc.com',
  eventsUrl: 'https://www.ufc.com/events',
  delayBetweenRequests: 5000, // 5 segundos - mais conservador para auto-sync
  maxEventsPerSync: 20, // Menos eventos no auto-sync diário
  userAgent: 'UFCNewsHub-Bot/1.0 (News Aggregator; educational project; daily-sync)',
};

interface SyncResult {
  startedAt: Date;
  finishedAt: Date;
  eventsProcessed: number;
  eventsCreated: number;
  eventsUpdated: number;
  errors: string[];
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function logSync(result: SyncResult) {
  await pool.query(
    `INSERT INTO sync_logs (tipo, started_at, finished_at, noticias_processadas, status, detalhes)
     VALUES ('eventos', $1, $2, $3, $4, $5)`,
    [
      result.startedAt,
      result.finishedAt,
      result.eventsProcessed,
      result.errors.length === 0 ? 'sucesso' : 'parcial',
      JSON.stringify({
        created: result.eventsCreated,
        updated: result.eventsUpdated,
        errors: result.errors,
      }),
    ]
  );
}

async function syncUpcomingEvents(): Promise<SyncResult> {
  const result: SyncResult = {
    startedAt: new Date(),
    finishedAt: new Date(),
    eventsProcessed: 0,
    eventsCreated: 0,
    eventsUpdated: 0,
    errors: [],
  };

  console.log('\n🔄 Auto-Sync de Eventos UFC - Iniciando...');
  console.log(`⏰ ${result.startedAt.toISOString()}\n`);

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: SYNC_CONFIG.userAgent,
    });
    const page = await context.newPage();

    // Acessar página de eventos
    await page.goto(SYNC_CONFIG.eventsUrl, { waitUntil: 'networkidle' });
    await delay(2000);

    const html = await page.content();
    const $ = cheerio.load(html);

    // Focar apenas em eventos futuros/próximos
    const upcomingEvents: Array<{
      nome: string;
      ufc_slug: string;
      event_url: string;
    }> = [];

    $('.c-card-event--upcoming').each((_, element) => {
      const $el = $(element);
      const nome = $el.find('.c-card-event--upcoming__headline, h3').first().text().trim();
      const eventLink = $el.find('a').first().attr('href') || '';
      const ufc_slug = eventLink.split('/').pop() || '';

      if (nome && eventLink) {
        upcomingEvents.push({
          nome,
          ufc_slug,
          event_url: `${SYNC_CONFIG.baseUrl}${eventLink}`,
        });
      }
    });

    console.log(`📋 Encontrados ${upcomingEvents.length} eventos futuros`);

    // Processar eventos (limitado)
    const eventsToProcess = upcomingEvents.slice(0, SYNC_CONFIG.maxEventsPerSync);

    for (const event of eventsToProcess) {
      try {
        console.log(`\n📖 Processando: ${event.nome}`);

        // Verificar se evento existe
        const existing = await pool.query(
          `SELECT id, last_scraped_at FROM eventos WHERE ufc_slug = $1`,
          [event.ufc_slug]
        );

        // Se foi atualizado nas últimas 12 horas, pular
        if (existing.rows.length > 0 && existing.rows[0].last_scraped_at) {
          const lastScraped = new Date(existing.rows[0].last_scraped_at);
          const hoursSinceLastScrape = (Date.now() - lastScraped.getTime()) / (1000 * 60 * 60);

          if (hoursSinceLastScrape < 12) {
            console.log(`  ⏭️ Atualizado há ${hoursSinceLastScrape.toFixed(1)}h, pulando...`);
            continue;
          }
        }

        // Scrape detalhes do evento
        await page.goto(event.event_url, { waitUntil: 'networkidle' });
        await delay(SYNC_CONFIG.delayBetweenRequests);

        const eventHtml = await page.content();
        const $event = cheerio.load(eventHtml);

        // Extrair dados básicos
        const dataTimestamp = $event('[data-main-card-timestamp]').attr('data-main-card-timestamp');
        const data_evento = dataTimestamp ? new Date(parseInt(dataTimestamp) * 1000) : null;

        const local_info = $event('.c-hero__headline-suffix').text().trim();
        const [cidade, local] = local_info.split('•').map((s) => s.trim());

        // Determinar tipo
        let tipo = 'Fight Night';
        if (/ufc \d+/i.test(event.nome)) tipo = 'PPV';
        else if (event.nome.toLowerCase().includes('apex')) tipo = 'Apex';

        // Poster
        const poster_url =
          $event('.c-hero__image img').attr('src') ||
          $event('.c-hero .field--name-image img').attr('src') ||
          '';

        // Horários
        const horario_main_card = dataTimestamp || null;
        const horario_prelims = $event('[data-prelims-card-timestamp]').attr('data-prelims-card-timestamp') || null;
        const horario_early_prelims = $event('[data-early-prelims-card-timestamp]').attr('data-early-prelims-card-timestamp') || null;

        if (existing.rows.length > 0) {
          // Atualizar
          await pool.query(
            `UPDATE eventos SET
              data_evento = COALESCE($1, data_evento),
              local_evento = COALESCE(NULLIF($2, ''), local_evento),
              cidade = COALESCE(NULLIF($3, ''), cidade),
              tipo = $4,
              poster_url = COALESCE(NULLIF($5, ''), poster_url),
              horario_main_card = COALESCE($6, horario_main_card),
              horario_prelims = COALESCE($7, horario_prelims),
              horario_early_prelims = COALESCE($8, horario_early_prelims),
              last_scraped_at = NOW()
            WHERE id = $9`,
            [
              data_evento,
              local || '',
              cidade || '',
              tipo,
              poster_url,
              horario_main_card ? new Date(parseInt(horario_main_card) * 1000).toISOString() : null,
              horario_prelims ? new Date(parseInt(horario_prelims) * 1000).toISOString() : null,
              horario_early_prelims ? new Date(parseInt(horario_early_prelims) * 1000).toISOString() : null,
              existing.rows[0].id,
            ]
          );
          result.eventsUpdated++;
          console.log(`  ♻️ Atualizado`);
        } else {
          // Criar novo
          const slug = event.nome
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          await pool.query(
            `INSERT INTO eventos (
              nome, slug, ufc_slug, data_evento, local_evento, cidade, tipo, status,
              poster_url, horario_main_card, horario_prelims, horario_early_prelims, last_scraped_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'agendado', $8, $9, $10, $11, NOW())`,
            [
              event.nome,
              slug,
              event.ufc_slug,
              data_evento,
              local || '',
              cidade || '',
              tipo,
              poster_url,
              horario_main_card ? new Date(parseInt(horario_main_card) * 1000).toISOString() : null,
              horario_prelims ? new Date(parseInt(horario_prelims) * 1000).toISOString() : null,
              horario_early_prelims ? new Date(parseInt(horario_early_prelims) * 1000).toISOString() : null,
            ]
          );
          result.eventsCreated++;
          console.log(`  ✨ Criado`);
        }

        result.eventsProcessed++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        result.errors.push(`${event.nome}: ${errorMsg}`);
        console.error(`  ❌ Erro: ${errorMsg}`);
      }
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    result.errors.push(`Sync geral: ${errorMsg}`);
    console.error('❌ Erro no sync:', error);
  } finally {
    if (browser) await browser.close();
  }

  result.finishedAt = new Date();

  // Log no banco
  try {
    await logSync(result);
  } catch (error) {
    console.error('Erro ao salvar log:', error);
  }

  console.log('\n📊 Resumo do Sync:');
  console.log(`  - Processados: ${result.eventsProcessed}`);
  console.log(`  - Criados: ${result.eventsCreated}`);
  console.log(`  - Atualizados: ${result.eventsUpdated}`);
  console.log(`  - Erros: ${result.errors.length}`);
  console.log(`  - Duração: ${((result.finishedAt.getTime() - result.startedAt.getTime()) / 1000).toFixed(1)}s`);

  return result;
}

// Função para executar manualmente
export async function runManualSync(): Promise<SyncResult> {
  return syncUpcomingEvents();
}

// Cron job para execução automática
export function startAutoSync() {
  console.log('🕐 Auto-Sync de Eventos configurado');
  console.log(`  Schedule: ${SYNC_CONFIG.cronSchedule} (diário às 6h UTC)`);

  cron.schedule(SYNC_CONFIG.cronSchedule, async () => {
    console.log('\n⏰ Iniciando sync agendado...');
    await syncUpcomingEvents();
  });
}

// Se executado diretamente, rodar sync manual
if (require.main === module) {
  syncUpcomingEvents()
    .then(() => {
      console.log('\n✅ Sync manual concluído!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro:', error);
      process.exit(1);
    });
}
