import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const SCRAPER_CONFIG = {
  baseUrl: 'https://www.ufc.com',
  delayBetweenRequests: 1500, // 1.5 segundos entre requests
  maxFightersPerRun: 5000, // Processar todos os lutadores
  userAgent: 'UFCNewsHub-Bot/1.0 (News Aggregator; educational project)',
};

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeNameForUrl(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

interface FighterData {
  vitorias: number;
  derrotas: number;
  empates: number;
  headshot_url?: string;
}

// Extrai o sobrenome do nome completo para buscar na URL da imagem
function extractLastName(fullName: string): string {
  // Remove caracteres especiais e pega a última palavra
  const parts = fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/['']/g, '') // Remove apóstrofos
    .toUpperCase()
    .split(/\s+/);

  // Retorna o último nome (sobrenome)
  return parts[parts.length - 1] || parts[0] || '';
}

async function scrapeFighterData(
  page: Page,
  fighterName: string
): Promise<FighterData | null> {
  const urlSlug = normalizeNameForUrl(fighterName);
  const url = `${SCRAPER_CONFIG.baseUrl}/athlete/${urlSlug}`;

  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Se página não existe, tentar variações comuns
    if (!response || response.status() === 404) {
      return null;
    }

    await delay(1000);

    const html = await page.content();
    const $ = cheerio.load(html);

    // Extrair sobrenome para buscar na URL da imagem
    const lastName = extractLastName(fighterName);

    // Buscar imagem de headshot que contenha o nome do lutador na URL
    let headshot_url: string | undefined;

    // Primeiro, tentar encontrar uma imagem com o nome do lutador
    $('img').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (
        src.includes('event_results_athlete_headshot') &&
        src.toUpperCase().includes(lastName) &&
        !headshot_url
      ) {
        headshot_url = src;
      }
    });

    // Se não encontrou com o nome, pegar qualquer headshot (fallback)
    if (!headshot_url) {
      $('img').each((_, el) => {
        const src = $(el).attr('src') || '';
        if (src.includes('event_results_athlete_headshot') && !headshot_url) {
          headshot_url = src;
        }
      });
    }

    // Procurar padrão de record no formato UFC: "28-1-0 (W-L-D)"
    const bodyText = $('body').text();

    // Padrão principal: "28-1-0 (W-L-D)" - formato oficial do UFC
    const ufcRecordMatch = bodyText.match(/(\d{1,3})\s*-\s*(\d{1,3})\s*-\s*(\d{1,3})\s*\(W-L-D\)/i);
    if (ufcRecordMatch) {
      return {
        vitorias: parseInt(ufcRecordMatch[1], 10),
        derrotas: parseInt(ufcRecordMatch[2], 10),
        empates: parseInt(ufcRecordMatch[3], 10),
        headshot_url,
      };
    }

    // Tentar buscar no elemento específico de stats do herói
    const heroStats = $('.c-hero--athlete__stats, .c-record, .hero-profile__division-body').text();
    const heroMatch = heroStats.match(/(\d{1,3})\s*-\s*(\d{1,3})\s*-\s*(\d{1,3})/);
    if (heroMatch) {
      return {
        vitorias: parseInt(heroMatch[1], 10),
        derrotas: parseInt(heroMatch[2], 10),
        empates: parseInt(heroMatch[3], 10),
        headshot_url,
      };
    }

    // Padrão alternativo: apenas "Wins: X, Losses: Y"
    const winsMatch = bodyText.match(/(\d{1,3})\s*Wins/i);
    const lossesMatch = bodyText.match(/(\d{1,3})\s*Losses/i);
    if (winsMatch && lossesMatch) {
      return {
        vitorias: parseInt(winsMatch[1], 10),
        derrotas: parseInt(lossesMatch[1], 10),
        empates: 0,
        headshot_url,
      };
    }

    // Último recurso: padrão genérico mas com 3 dígitos permitidos
    const genericMatch = bodyText.match(/(\d{1,3})-(\d{1,3})-(\d{1,3})/);
    if (genericMatch) {
      // Validar que parece um record real (não uma data ou outro número)
      const wins = parseInt(genericMatch[1], 10);
      const losses = parseInt(genericMatch[2], 10);
      const draws = parseInt(genericMatch[3], 10);

      // Records reais geralmente têm menos de 50 lutas totais
      if (wins + losses + draws < 100 && wins < 50 && losses < 50) {
        return {
          vitorias: wins,
          derrotas: losses,
          empates: draws,
          headshot_url,
        };
      }
    }

    return null;
  } catch (error) {
    // Silently fail for 404s or timeouts
    return null;
  }
}

async function updateFighterRecords() {
  console.log('🥊 UFC Fighter Records Scraper - Iniciando...\n');
  console.log(`⚙️ Configurações:`);
  console.log(`   - Delay entre requests: ${SCRAPER_CONFIG.delayBetweenRequests}ms`);
  console.log(`   - Máximo de lutadores: ${SCRAPER_CONFIG.maxFightersPerRun}`);
  console.log('');

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      userAgent: SCRAPER_CONFIG.userAgent,
    });

    const page = await context.newPage();

    // Buscar TODOS os lutadores para atualização completa
    const fighters = await pool.query(
      `SELECT id, nome FROM lutadores
       ORDER BY nome
       LIMIT $1`,
      [SCRAPER_CONFIG.maxFightersPerRun]
    );

    console.log(`📊 Encontrados ${fighters.rows.length} lutadores para atualizar\n`);

    let updated = 0;
    let failed = 0;

    for (let i = 0; i < fighters.rows.length; i++) {
      const fighter = fighters.rows[i];
      process.stdout.write(
        `[${i + 1}/${fighters.rows.length}] ${fighter.nome}... `
      );

      const data = await scrapeFighterData(page, fighter.nome);

      if (data) {
        await pool.query(
          `UPDATE lutadores
           SET vitorias = $1, derrotas = $2, empates = $3,
               imagem_url = COALESCE(NULLIF($4, ''), imagem_url)
           WHERE id = $5`,
          [data.vitorias, data.derrotas, data.empates, data.headshot_url || null, fighter.id]
        );
        const imgStatus = data.headshot_url ? ' +img' : '';
        console.log(`✅ ${data.vitorias}-${data.derrotas}-${data.empates}${imgStatus}`);
        updated++;
      } else {
        console.log('❌ não encontrado');
        failed++;
      }

      // Delay entre requests
      if (i < fighters.rows.length - 1) {
        await delay(SCRAPER_CONFIG.delayBetweenRequests);
      }
    }

    console.log('\n✅ Scraping de records concluído!');
    console.log(`📊 Resultados:`);
    console.log(`   - Atualizados: ${updated}`);
    console.log(`   - Não encontrados: ${failed}`);
  } catch (error) {
    console.error('❌ Erro no scraper:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    await pool.end();
  }
}

// Executar
updateFighterRecords();
