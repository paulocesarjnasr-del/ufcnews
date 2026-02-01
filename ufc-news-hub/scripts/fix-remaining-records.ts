import { chromium, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

// Mapeamento mais completo com variações
const fighterVariations: Record<string, string[]> = {
  'Asu Almabayev': ['asu-almabayev', 'almabayev'],
  'Mairon Santos': ['mairon-santos', 'mairon'],
  'ChangHo Lee': ['changho-lee', 'chang-ho-lee', 'lee-changho'],
  'JooSang Yoo': ['joosang-yoo', 'joo-sang-yoo', 'yoo-joosang'],
  'Stephanie Luciano': ['stephanie-luciano', 'luciano'],
  'Cam Rowston': ['cam-rowston', 'cameron-rowston'],
  'Timmy Cuamba': ['timmy-cuamba', 'cuamba'],
  'Yizha': ['yizha', 'yi-zha'],
  'Sulangrangbo': ['sulangrangbo', 'su-langrangbo'],
  'Abdul Rakhman Yakhyaev': ['abdul-rakhman-yakhyaev', 'yakhyaev', 'abdul-yakhyaev'],
  'Bia Mesquita': ['bia-mesquita', 'mesquita', 'beatriz-mesquita'],
  'Patchy Mix': ['patchy-mix', 'mix'], // Bellator fighter, won't be on UFC.com
};

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryScrapeFighter(page: Page, slugs: string[]): Promise<{wins: number, losses: number, draws: number} | null> {
  for (const slug of slugs) {
    try {
      const url = `https://www.ufc.com/athlete/${slug}`;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      
      if (!response || response.status() === 404) continue;
      
      await delay(500);
      const html = await page.content();
      const $ = cheerio.load(html);
      const bodyText = $('body').text();
      
      const match = bodyText.match(/(\d{1,3})\s*-\s*(\d{1,3})\s*-\s*(\d{1,3})\s*\(W-L-D\)/i);
      if (match) {
        return {
          wins: parseInt(match[1], 10),
          losses: parseInt(match[2], 10),
          draws: parseInt(match[3], 10),
        };
      }
    } catch {}
  }
  return null;
}

async function main() {
  console.log('🔧 Tentando variações para lutadores restantes...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });
  const page = await context.newPage();

  // Get fighters still with wrong records
  const fighters = await pool.query(
    `SELECT id, nome FROM lutadores WHERE vitorias = 4 AND derrotas = 46`
  );

  console.log(`📊 ${fighters.rows.length} lutadores restantes\n`);

  let fixed = 0;

  for (const fighter of fighters.rows) {
    const nome = fighter.nome.trim().replace(/\s+/g, ' ');
    const slugs = fighterVariations[nome] || [
      nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    ];

    process.stdout.write(`[${nome}] tentando ${slugs.length} variações... `);
    
    const record = await tryScrapeFighter(page, slugs);
    if (record) {
      await pool.query(
        `UPDATE lutadores SET vitorias = $1, derrotas = $2, empates = $3 WHERE id = $4`,
        [record.wins, record.losses, record.draws, fighter.id]
      );
      console.log(`✅ ${record.wins}-${record.losses}-${record.draws}`);
      fixed++;
    } else {
      // Se não encontrou, zera o record (melhor que 4-46 errado)
      await pool.query(
        `UPDATE lutadores SET vitorias = 0, derrotas = 0, empates = 0 WHERE id = $1`,
        [fighter.id]
      );
      console.log(`⚠️ não encontrado - zerado para 0-0-0`);
    }
    
    await delay(1000);
  }

  // Delete duplicate entries with corrupted names
  await pool.query(`
    DELETE FROM lutadores 
    WHERE nome LIKE '%\n%' 
    AND EXISTS (
      SELECT 1 FROM lutadores l2 
      WHERE REPLACE(REPLACE(lutadores.nome, E'\n', ''), ' ', '') = REPLACE(l2.nome, ' ', '')
      AND l2.id != lutadores.id
      AND l2.nome NOT LIKE '%\n%'
    )
  `);

  console.log('\n✅ Concluído! Corrigidos:', fixed);

  await browser.close();
  await pool.end();
}

main().catch(console.error);
