import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

async function debugUFCStructure() {
  console.log('🔍 Investigando estrutura do UFC.com...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });
  const page = await context.newPage();

  try {
    // 1. Investigar página de evento finalizado (UFC 323)
    console.log('=== INVESTIGANDO EVENTO FINALIZADO (UFC 323) ===\n');
    await page.goto('https://www.ufc.com/event/ufc-323', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const eventHtml = await page.content();
    const $event = cheerio.load(eventHtml);

    // Encontrar todas as lutas
    const fights = $event('.c-listing-fight, .l-listing__item');
    console.log(`Encontradas ${fights.length} lutas\n`);

    // Analisar primeira luta (main event)
    const firstFight = fights.first();

    // Procurar indicadores de vencedor
    console.log('--- Analisando estrutura de vencedor ---');

    // Verificar classes no corner vermelho
    const redCorner = firstFight.find('.c-listing-fight__corner--red');
    const blueCorner = firstFight.find('.c-listing-fight__corner--blue');

    console.log('Classes corner vermelho:', redCorner.attr('class'));
    console.log('Classes corner azul:', blueCorner.attr('class'));

    // Procurar por qualquer elemento com "win", "winner", "won"
    const winElements = firstFight.find('[class*="win"], [class*="Win"], [data-winner], .winner');
    console.log('Elementos com "win":', winElements.length);

    // Procurar por outcome/result
    const outcomeEl = firstFight.find('.c-listing-fight__outcome, .c-listing-fight__result, [class*="outcome"], [class*="result"]');
    console.log('Elementos outcome/result:', outcomeEl.length);
    if (outcomeEl.length) {
      console.log('HTML do outcome:', outcomeEl.html()?.substring(0, 500));
    }

    // Procurar por indicador visual (checkmark, etc)
    const indicators = firstFight.find('svg, .icon, [class*="check"], [class*="indicator"]');
    console.log('Indicadores visuais:', indicators.length);

    // Imprimir HTML completo da primeira luta para análise
    console.log('\n--- HTML da primeira luta (primeiros 2000 chars) ---');
    console.log(firstFight.html()?.substring(0, 2000));

    // 2. Investigar página de lutador para record
    console.log('\n\n=== INVESTIGANDO PÁGINA DE LUTADOR (Jon Jones) ===\n');
    await page.goto('https://www.ufc.com/athlete/jon-jones', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const fighterHtml = await page.content();
    const $fighter = cheerio.load(fighterHtml);

    // Procurar elementos de record
    const recordSelectors = [
      '.c-hero__headline-suffix',
      '.c-bio__field--record',
      '.c-bio__row--record',
      '[class*="record"]',
      '.c-hero__text',
      '.c-bio__text'
    ];

    console.log('--- Procurando record ---');
    for (const selector of recordSelectors) {
      const el = $fighter(selector);
      if (el.length) {
        console.log(`${selector}: "${el.text().trim().substring(0, 100)}"`);
      }
    }

    // Procurar padrão de record no texto
    const bodyText = $fighter('body').text();
    const recordPatterns = [
      /Record:\s*(\d+)-(\d+)-(\d+)/i,
      /(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*\(W-L-D\)/i,
      /(\d+)\s*Wins.*?(\d+)\s*Losses/i,
    ];

    console.log('\n--- Procurando padrões de record ---');
    for (const pattern of recordPatterns) {
      const match = bodyText.match(pattern);
      if (match) {
        console.log(`Pattern ${pattern}: ${match[0]}`);
      }
    }

    // Encontrar o hero stats
    const heroStats = $fighter('.c-hero--athlete__stats, .c-record, .hero-profile__division-body');
    console.log('\nHero stats HTML:', heroStats.html()?.substring(0, 1000));

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await browser.close();
  }
}

debugUFCStructure();
