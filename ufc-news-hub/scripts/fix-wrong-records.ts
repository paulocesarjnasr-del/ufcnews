import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

// Mapeamento de nomes para slugs corretos no UFC.com
const fighterSlugs: Record<string, string> = {
  'Ian Machado Garry': 'ian-garry',
  'Jan Błachowicz': 'jan-blachowicz',
  'King Green': 'bobby-green',
  'Asu Almabayev': 'asu-almabayev',
  'Mairon Santos': 'mairon-santos',
  'ChangHo Lee': 'changho-lee',
  'JooSang Yoo': 'joosang-yoo',
  'Klaudia Syguła': 'klaudia-sygula',
  'Montserrat Conejo Ruiz': 'montserrat-ruiz',
  'Stephanie Luciano': 'stephanie-luciano',
  'Billy Ray Goff': 'billy-goff',
  'Cam Rowston': 'cam-rowston',
  'Jose Miguel Delgado': 'jose-delgado',
  'Timmy Cuamba': 'timmy-cuamba',
  'Yizha': 'yizha',
  'Sulangrangbo': 'sulangrangbo',
  'Abdul Rakhman Yakhyaev': 'abdul-rakhman-yakhyaev',
  'Bia Mesquita': 'bia-mesquita',
  'Patchy Mix': 'patchy-mix',
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeFighterRecord(
  page: Page,
  slug: string
): Promise<{ wins: number; losses: number; draws: number } | null> {
  try {
    const url = `https://www.ufc.com/athlete/${slug}`;
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    if (!response || response.status() === 404) {
      return null;
    }

    await delay(1000);
    const html = await page.content();
    const $ = cheerio.load(html);

    const bodyText = $('body').text();

    // Pattern: "28-1-0 (W-L-D)"
    const match = bodyText.match(
      /(\d{1,3})\s*-\s*(\d{1,3})\s*-\s*(\d{1,3})\s*\(W-L-D\)/i
    );
    if (match) {
      return {
        wins: parseInt(match[1], 10),
        losses: parseInt(match[2], 10),
        draws: parseInt(match[3], 10),
      };
    }

    // Fallback pattern
    const genericMatch = bodyText.match(/(\d{1,3})-(\d{1,3})-(\d{1,3})/);
    if (genericMatch) {
      const wins = parseInt(genericMatch[1], 10);
      const losses = parseInt(genericMatch[2], 10);
      const draws = parseInt(genericMatch[3], 10);
      if (wins + losses + draws < 100) {
        return { wins, losses, draws };
      }
    }

    return null;
  } catch {
    return null;
  }
}

async function main() {
  console.log('🔧 Corrigindo lutadores com records incorretos...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'UFCNewsHub-Bot/1.0 (News Aggregator; educational project)',
  });
  const page = await context.newPage();

  // Get fighters with wrong records
  const fighters = await pool.query(
    `SELECT id, nome FROM lutadores WHERE vitorias = 4 AND derrotas = 46`
  );

  console.log(`📊 ${fighters.rows.length} lutadores para corrigir\n`);

  let fixed = 0;
  let notFound = 0;

  for (const fighter of fighters.rows) {
    const nome = fighter.nome.trim();
    let slug = fighterSlugs[nome];

    // Try auto-generated slug if not mapped
    if (!slug) {
      slug = nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    process.stdout.write(`[${nome}] tentando slug "${slug}"... `);

    const record = await scrapeFighterRecord(page, slug);
    if (record) {
      await pool.query(
        `UPDATE lutadores SET vitorias = $1, derrotas = $2, empates = $3 WHERE id = $4`,
        [record.wins, record.losses, record.draws, fighter.id]
      );
      console.log(`✅ ${record.wins}-${record.losses}-${record.draws}`);
      fixed++;
    } else {
      console.log(`❌ não encontrado`);
      notFound++;
    }

    await delay(1500);
  }

  console.log('\n📊 Resultados:');
  console.log(`   - Corrigidos: ${fixed}`);
  console.log(`   - Não encontrados: ${notFound}`);

  await browser.close();
  await pool.end();
}

main().catch(console.error);
