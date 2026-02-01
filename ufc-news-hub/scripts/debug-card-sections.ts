import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

async function debugCardSections() {
  console.log('🔍 Investigando estrutura de seções do card UFC.com...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });
  const page = await context.newPage();

  try {
    // Investigar UFC 324 (evento futuro)
    console.log('=== UFC 324 (Evento Futuro) ===\n');
    await page.goto('https://www.ufc.com/event/ufc-324', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const html = await page.content();
    const $ = cheerio.load(html);

    // Procurar por seções de card
    console.log('--- Procurando headers de seção ---');

    const sectionSelectors = [
      '.c-listing-fight__group',
      '.fight-card-section',
      '.card-section',
      '[class*="main-card"]',
      '[class*="prelim"]',
      '[class*="early"]',
      '.c-listing-fight__header',
      '.l-listing__group-header'
    ];

    for (const selector of sectionSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log('\n' + selector + ': ' + elements.length + ' elementos encontrados');
        elements.each((i, el) => {
          const text = $(el).text().trim().substring(0, 100);
          const classes = $(el).attr('class') || '';
          if (text) console.log('  [' + i + '] "' + text + '" (class: ' + classes + ')');
        });
      }
    }

    // Procurar por data-* attributes relacionados a card type
    console.log('\n--- Procurando data attributes ---');
    $('[data-card-type], [data-section], [data-fight-type]').each((i, el) => {
      console.log('  data-card-type: ' + $(el).attr('data-card-type'));
      console.log('  data-section: ' + $(el).attr('data-section'));
    });

    // Analisar estrutura do container de lutas
    console.log('\n--- Estrutura do container de lutas ---');
    const fightContainers = $('.l-listing__item, .c-listing-fight');
    console.log('Total de containers de luta: ' + fightContainers.length);

    // Verificar se há grupos
    const groups = $('.l-listing__group');
    console.log('Grupos encontrados: ' + groups.length);

    groups.each((i, group) => {
      const header = $(group).find('.l-listing__group-header, h3, h4').first().text().trim();
      const fights = $(group).find('.l-listing__item, .c-listing-fight').length;
      console.log('  Grupo ' + (i + 1) + ': "' + header + '" - ' + fights + ' lutas');
    });

    // Verificar timestamps
    console.log('\n--- Timestamps das seções ---');
    $('[data-main-card-timestamp], [data-prelims-timestamp], [data-early-prelims-timestamp]').each((i, el) => {
      console.log('  main-card: ' + $(el).attr('data-main-card-timestamp'));
      console.log('  prelims: ' + $(el).attr('data-prelims-timestamp'));
      console.log('  early-prelims: ' + $(el).attr('data-early-prelims-timestamp'));
    });

    // Procurar por h2, h3 que indicam seções
    console.log('\n--- Headers h2/h3/h4 ---');
    $('h2, h3, h4').each((i, el) => {
      const text = $(el).text().trim();
      if (text.toLowerCase().includes('card') ||
          text.toLowerCase().includes('prelim') ||
          text.toLowerCase().includes('main') ||
          text.toLowerCase().includes('early')) {
        console.log('  ' + el.tagName + ': "' + text + '"');
      }
    });

    // Imprimir HTML da área de lutas para análise
    console.log('\n--- HTML da área de lutas (primeiros 3000 chars) ---');
    const fightSection = $('.l-listing, .fight-card, [class*="fight-listing"]').first();
    console.log(fightSection.html()?.substring(0, 3000));

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await browser.close();
  }
}

debugCardSections();
