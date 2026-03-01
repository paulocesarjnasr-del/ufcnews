import { chromium, Page } from 'playwright';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Carrega variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

interface Fighter {
  nome: string;
  apelido: string | null;
  categoria_peso: string | null;
  url_perfil: string | null;
  imagem_url: string | null;
}

async function scrapeFighters(): Promise<Fighter[]> {
  console.log('🥊 Iniciando scraping de TODOS os lutadores do UFC (~3100+)...\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const allFighters: Fighter[] = [];

  try {
    // Base URL SEM filtro de status — pega TODOS os lutadores (ativos, retirados, etc.)
    const baseUrl = 'https://www.ufc.com/athletes/all';

    let pageNum = 0;
    let emptyPages = 0;
    const maxEmptyPages = 5;  // UFC.com pode ter gaps entre páginas
    let timeoutErrors = 0;
    const maxTimeoutErrors = 8;

    while (emptyPages < maxEmptyPages && timeoutErrors < maxTimeoutErrors) {
      // Constrói URL com número da página — sem filtro de status
      const url = `${baseUrl}?page=${pageNum}`;
      console.log(`📄 Carregando página ${pageNum + 1}...`);

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(1500); // Aguarda JavaScript carregar

        // Aguarda os cards carregarem
        try {
          await page.waitForSelector('.c-listing-athlete-flipcard', { timeout: 5000 });
        } catch {
          console.log('   → Nenhum lutador encontrado nesta página');
          emptyPages++;
          pageNum++;
          continue;
        }

        // Extrai lutadores da página
        const fighters = await extractFightersFromPage(page);

        if (fighters.length === 0) {
          console.log('   → Página vazia');
          emptyPages++;
        } else {
          console.log(`   → Encontrados ${fighters.length} lutadores (Total: ${allFighters.length + fighters.length})`);
          allFighters.push(...fighters);
          emptyPages = 0;
          timeoutErrors = 0; // Reset timeout counter on success
        }

      } catch (error: any) {
        if (error.name === 'TimeoutError') {
          console.log(`   ⚠️  Timeout na página ${pageNum + 1}. Tentando próxima...`);
          timeoutErrors++;
        } else {
          console.error(`   ❌ Erro: ${error.message}`);
          emptyPages++;
        }
      }

      pageNum++;

      // Limite de segurança — 3118 lutadores / 11 por página ≈ 284 páginas
      if (pageNum > 350) {
        console.log('⚠️  Limite de segurança de páginas atingido');
        break;
      }
    }

    console.log(`\n✅ Scraping completo! Total de páginas processadas: ${pageNum}`);

  } catch (error) {
    console.error('Erro durante scraping:', error);
  } finally {
    await browser.close();
  }

  return allFighters;
}

async function extractFightersFromPage(page: Page): Promise<Fighter[]> {
  return await page.evaluate(() => {
    const fighters: Fighter[] = [];
    const cards = document.querySelectorAll('.c-listing-athlete-flipcard');

    cards.forEach((card) => {
      // Nome do lutador
      let nome = '';
      const nameElement = card.querySelector('.c-listing-athlete__name a') ||
                          card.querySelector('.c-listing-athlete__name');

      if (nameElement) {
        nome = nameElement.textContent?.trim() || '';
      }

      if (!nome) return;

      // Apelido (nickname)
      const nicknameElement = card.querySelector('.c-listing-athlete__nickname .field__item') ||
                              card.querySelector('.c-listing-athlete__nickname');
      let apelido = nicknameElement?.textContent?.trim()?.replace(/"/g, '') || null;
      if (apelido === '') apelido = null;

      // Categoria de peso
      const weightElement = card.querySelector('.c-listing-athlete__title');
      const categoria_peso = weightElement?.textContent?.trim() || null;

      // URL do perfil
      let url_perfil: string | null = null;
      const linkElement = card.querySelector('a.e-button--black') ||
                          card.querySelector('.c-listing-athlete__name a');

      if (linkElement) {
        const href = linkElement.getAttribute('href');
        if (href) {
          url_perfil = href.startsWith('http') ? href : `https://www.ufc.com${href}`;
        }
      }

      // Imagem
      const imgElement = card.querySelector('.c-listing-athlete__thumbnail img');
      const imagem_url = imgElement?.getAttribute('src') || null;

      fighters.push({
        nome,
        apelido,
        categoria_peso,
        url_perfil,
        imagem_url
      });
    });

    return fighters;
  });
}

async function saveFightersToDatabase(fighters: Fighter[]): Promise<void> {
  console.log('\n💾 Salvando lutadores no banco de dados...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('   → Preparando banco de dados (upsert — sem deletar)...');

    // NÃO deleta lutadores — apenas insere novos e atualiza existentes
    let inserted = 0;
    let updated = 0;

    for (const fighter of fighters) {
      try {
        // Verifica se já existe (case insensitive)
        const existing = await pool.query(
          'SELECT id FROM lutadores WHERE LOWER(nome) = LOWER($1)',
          [fighter.nome]
        );

        if (existing.rows.length === 0) {
          await pool.query(
            `INSERT INTO lutadores (nome, apelido, categoria_peso, url_perfil, imagem_url)
             VALUES ($1, $2, $3, $4, $5)`,
            [fighter.nome, fighter.apelido, fighter.categoria_peso, fighter.url_perfil, fighter.imagem_url]
          );
          inserted++;
        } else {
          // Atualiza informações do existente
          await pool.query(
            `UPDATE lutadores
             SET apelido = COALESCE($2, apelido),
                 categoria_peso = COALESCE($3, categoria_peso),
                 url_perfil = COALESCE($4, url_perfil),
                 imagem_url = COALESCE($5, imagem_url)
             WHERE LOWER(nome) = LOWER($1)`,
            [fighter.nome, fighter.apelido, fighter.categoria_peso, fighter.url_perfil, fighter.imagem_url]
          );
          updated++;
        }
      } catch (err) {
        console.error(`   Erro ao inserir ${fighter.nome}:`, err);
      }
    }

    // Conta total no banco
    const countResult = await pool.query('SELECT COUNT(*) FROM lutadores');
    const totalCount = parseInt(countResult.rows[0].count, 10);

    console.log(`\n📊 Resultado:`);
    console.log(`   → Novos lutadores inseridos: ${inserted}`);
    console.log(`   → Lutadores atualizados: ${updated}`);
    console.log(`   → Total no banco de dados: ${totalCount}`);

  } finally {
    await pool.end();
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('   UFC FIGHTER SCRAPER - Expand Database');
  console.log('═══════════════════════════════════════════════════════\n');

  try {
    // Scrape fighters do UFC.com
    const fighters = await scrapeFighters();

    if (fighters.length === 0) {
      console.log('❌ Nenhum lutador encontrado!');
      return;
    }

    // Remove duplicatas por nome
    const uniqueFighters = fighters.filter((fighter, index, self) =>
      index === self.findIndex((f) => f.nome.toLowerCase() === fighter.nome.toLowerCase())
    );

    console.log(`\n🥊 Total de lutadores extraídos: ${fighters.length}`);
    console.log(`   → Únicos (sem duplicatas): ${uniqueFighters.length}`);

    // Mostra alguns exemplos
    console.log('\n📋 Exemplos de lutadores encontrados:');
    uniqueFighters.slice(0, 10).forEach((f, i) => {
      console.log(`   ${i + 1}. ${f.nome} ${f.apelido ? `"${f.apelido}"` : ''} - ${f.categoria_peso || 'N/A'}`);
    });

    // Mostra últimos também
    console.log('\n📋 Últimos lutadores da lista:');
    uniqueFighters.slice(-5).forEach((f, i) => {
      console.log(`   ${uniqueFighters.length - 4 + i}. ${f.nome} ${f.apelido ? `"${f.apelido}"` : ''} - ${f.categoria_peso || 'N/A'}`);
    });

    // Salva no banco
    await saveFightersToDatabase(uniqueFighters);

    console.log('\n✅ Scraping concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  }
}

main();
