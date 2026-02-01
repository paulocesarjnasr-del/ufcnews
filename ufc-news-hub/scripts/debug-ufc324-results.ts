/**
 * Debug script para verificar resultados do UFC 324 no UFC.com
 */

import * as cheerio from 'cheerio';

const UFC_BASE_URL = 'https://www.ufc.com';

async function debugUFC324Results() {
  console.log('🔍 Verificando resultados do UFC 324 no UFC.com...\n');

  try {
    // 1. Verificar a página principal de eventos
    console.log('=== Verificando lista de eventos ===\n');
    const eventsResponse = await fetch(`${UFC_BASE_URL}/events`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const eventsHtml = await eventsResponse.text();
    const $events = cheerio.load(eventsHtml);

    // Procurar UFC 324 na lista
    $events('.c-card-event--result, .c-card-event--upcoming').each((_, el) => {
      const $el = $events(el);
      const headline = $el.find('.c-card-event--result__headline, .c-card-event--upcoming__headline').text().trim();
      const link = $el.find('a').first().attr('href') || '';

      if (link.includes('ufc-324')) {
        const isResult = $el.hasClass('c-card-event--result');
        const isUpcoming = $el.hasClass('c-card-event--upcoming');
        console.log(`UFC 324 encontrado!`);
        console.log(`  Headline: ${headline}`);
        console.log(`  Link: ${link}`);
        console.log(`  Classes: result=${isResult}, upcoming=${isUpcoming}`);
        console.log(`  Status deveria ser: ${isResult ? 'finalizado' : 'agendado'}\n`);
      }
    });

    // 2. Verificar página do UFC 324 para resultados
    console.log('\n=== Verificando detalhes do UFC 324 ===\n');
    const eventResponse = await fetch(`${UFC_BASE_URL}/event/ufc-324`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const eventHtml = await eventResponse.text();
    const $ = cheerio.load(eventHtml);

    // Verificar cada luta
    console.log('=== Lutas e Vencedores ===\n');

    $('.c-listing-fight').each((index, el) => {
      const $fight = $(el);

      // Nomes
      const lutador1 = $fight.find('.c-listing-fight__corner-name--red').text().replace(/\s+/g, ' ').trim();
      const lutador2 = $fight.find('.c-listing-fight__corner-name--blue').text().replace(/\s+/g, ' ').trim();

      if (!lutador1 || !lutador2) return;

      // Verificar vencedor
      const redCorner = $fight.find('.c-listing-fight__corner--red');
      const blueCorner = $fight.find('.c-listing-fight__corner--blue');

      const redHasWin = redCorner.find('.c-listing-fight__outcome--win').length > 0;
      const blueHasWin = blueCorner.find('.c-listing-fight__outcome--win').length > 0;
      const redHasLoss = redCorner.find('.c-listing-fight__outcome--loss').length > 0;
      const blueHasLoss = blueCorner.find('.c-listing-fight__outcome--loss').length > 0;

      // Resultado (metodo, round, tempo)
      const result = $fight.find('.c-listing-fight__result-text').text().replace(/\s+/g, ' ').trim();

      let vencedor = 'Não detectado';
      if (redHasWin) vencedor = lutador1;
      else if (blueHasWin) vencedor = lutador2;
      else if (redHasLoss) vencedor = lutador2;
      else if (blueHasLoss) vencedor = lutador1;

      console.log(`[${index + 1}] ${lutador1} vs ${lutador2}`);
      console.log(`    Red win: ${redHasWin}, Blue win: ${blueHasWin}`);
      console.log(`    Red loss: ${redHasLoss}, Blue loss: ${blueHasLoss}`);
      console.log(`    Vencedor: ${vencedor}`);
      console.log(`    Resultado: ${result || 'N/A'}`);
      console.log('');
    });

    // Verificar HTML dos seletores de resultado
    console.log('\n=== Classes de resultado encontradas ===\n');
    const outcomeClasses: string[] = [];
    $('[class*="outcome"]').each((_, el) => {
      const classes = $(el).attr('class') || '';
      if (!outcomeClasses.includes(classes)) {
        outcomeClasses.push(classes);
        console.log(`  - ${classes}`);
      }
    });

  } catch (error) {
    console.error('Erro:', error);
  }
}

debugUFC324Results();
