/**
 * Debug script para verificar como UFC.com classifica eventos
 */

import * as cheerio from 'cheerio';

const UFC_BASE_URL = 'https://www.ufc.com';

async function debugEventsStatus() {
  console.log('🔍 Verificando classificação de eventos no UFC.com...\n');
  console.log(`Data atual: ${new Date().toISOString()}\n`);

  try {
    const response = await fetch(`${UFC_BASE_URL}/events`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Contar eventos por classe
    const results = $('.c-card-event--result');
    const upcoming = $('.c-card-event--upcoming');

    console.log(`Total de eventos "result": ${results.length}`);
    console.log(`Total de eventos "upcoming": ${upcoming.length}\n`);

    console.log('=== EVENTOS UPCOMING ===\n');
    upcoming.each((i, el) => {
      const $el = $(el);
      const headline = $el.find('.c-card-event--upcoming__headline, h3').first().text().replace(/\s+/g, ' ').trim();
      const link = $el.find('a').first().attr('href') || '';
      const slug = link.split('/').pop() || '';
      const timestamp = $el.find('[data-main-card-timestamp]').attr('data-main-card-timestamp') || '';

      let dateStr = 'N/A';
      if (timestamp) {
        const date = new Date(parseInt(timestamp) * 1000);
        dateStr = date.toISOString();
      }

      console.log(`[${i + 1}] ${slug}`);
      console.log(`    Headline: ${headline}`);
      console.log(`    Data: ${dateStr}`);
      console.log('');
    });

    console.log('\n=== EVENTOS RESULT (primeiros 5) ===\n');
    results.slice(0, 5).each((i, el) => {
      const $el = $(el);
      const headline = $el.find('.c-card-event--result__headline, h3').first().text().replace(/\s+/g, ' ').trim();
      const link = $el.find('a').first().attr('href') || '';
      const slug = link.split('/').pop() || '';
      const timestamp = $el.find('[data-main-card-timestamp]').attr('data-main-card-timestamp') || '';

      let dateStr = 'N/A';
      if (timestamp) {
        const date = new Date(parseInt(timestamp) * 1000);
        dateStr = date.toISOString();
      }

      console.log(`[${i + 1}] ${slug}`);
      console.log(`    Headline: ${headline}`);
      console.log(`    Data: ${dateStr}`);
      console.log('');
    });

  } catch (error) {
    console.error('Erro:', error);
  }
}

debugEventsStatus();
