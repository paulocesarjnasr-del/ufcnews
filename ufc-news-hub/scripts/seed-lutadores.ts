import { Pool } from 'pg';
import * as cheerio from 'cheerio';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

interface Lutador {
  nome: string;
  apelido: string | null;
  categoria_peso: string | null;
  url_perfil: string | null;
  imagem_url: string | null;
}

const BASE_URL = 'https://www.ufc.com';
const ATHLETES_URL = `${BASE_URL}/athletes/all?filters%5B0%5D=status%3A23`;

async function fetchAthletesPage(page: number): Promise<string> {
  const url = page === 0 ? ATHLETES_URL : `${ATHLETES_URL}&page=${page}`;
  console.log(`Buscando página ${page}: ${url}`);

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.text();
}

function parseAthletesFromHTML(html: string): Lutador[] {
  const $ = cheerio.load(html);
  const athletes: Lutador[] = [];

  // O UFC usa um formato específico de cards para atletas
  $('.c-listing-athlete-flipcard, .c-listing-athlete').each((_, element) => {
    try {
      const $el = $(element);

      // Tentar diferentes seletores para o nome
      let nome =
        $el.find('.c-listing-athlete__name').text().trim() ||
        $el.find('.c-listing-athlete-flipcard__back-name').text().trim() ||
        $el.find('[class*="name"]').first().text().trim();

      if (!nome) return;

      // Limpar o nome (remover espaços extras, novas linhas)
      nome = nome.replace(/\s+/g, ' ').trim();

      // Apelido (nickname)
      const apelido =
        $el.find('.c-listing-athlete__nickname').text().trim() ||
        $el.find('.c-listing-athlete-flipcard__back-nickname').text().trim() ||
        null;

      // Categoria de peso
      const categoria_peso =
        $el.find('.c-listing-athlete__title').text().trim() ||
        $el.find('.c-listing-athlete-flipcard__back-title').text().trim() ||
        null;

      // URL do perfil
      const profileLink = $el.find('a[href*="/athlete/"]').attr('href');
      const url_perfil = profileLink ? `${BASE_URL}${profileLink}` : null;

      // Imagem
      const imagem_url =
        $el.find('img').attr('src') || $el.find('img').attr('data-src') || null;

      athletes.push({
        nome,
        apelido: apelido && apelido !== nome ? apelido : null,
        categoria_peso,
        url_perfil,
        imagem_url,
      });
    } catch (error) {
      console.error('Erro ao parsear atleta:', error);
    }
  });

  return athletes;
}

async function insertLutador(lutador: Lutador): Promise<void> {
  const query = `
    INSERT INTO lutadores (nome, apelido, categoria_peso, url_perfil, imagem_url)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (nome) DO UPDATE SET
      apelido = COALESCE(EXCLUDED.apelido, lutadores.apelido),
      categoria_peso = COALESCE(EXCLUDED.categoria_peso, lutadores.categoria_peso),
      url_perfil = COALESCE(EXCLUDED.url_perfil, lutadores.url_perfil),
      imagem_url = COALESCE(EXCLUDED.imagem_url, lutadores.imagem_url),
      updated_at = NOW()
  `;

  await pool.query(query, [
    lutador.nome,
    lutador.apelido,
    lutador.categoria_peso,
    lutador.url_perfil,
    lutador.imagem_url,
  ]);
}

// Lista de backup com lutadores conhecidos do UFC
// Caso o scraping falhe, usamos esta lista mínima
const LUTADORES_BACKUP: Lutador[] = [
  { nome: 'Jon Jones', apelido: 'Bones', categoria_peso: 'Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Islam Makhachev', apelido: null, categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Alex Pereira', apelido: 'Poatan', categoria_peso: 'Light Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Leon Edwards', apelido: 'Rocky', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Dricus Du Plessis', apelido: 'Stillknocks', categoria_peso: 'Middleweight', url_perfil: null, imagem_url: null },
  { nome: 'Ilia Topuria', apelido: 'El Matador', categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Merab Dvalishvili', apelido: 'The Machine', categoria_peso: 'Bantamweight', url_perfil: null, imagem_url: null },
  { nome: 'Alexandre Pantoja', apelido: null, categoria_peso: 'Flyweight', url_perfil: null, imagem_url: null },
  { nome: 'Zhang Weili', apelido: 'Magnum', categoria_peso: "Women's Strawweight", url_perfil: null, imagem_url: null },
  { nome: 'Raquel Pennington', apelido: 'Rocky', categoria_peso: "Women's Bantamweight", url_perfil: null, imagem_url: null },
  { nome: 'Valentina Shevchenko', apelido: 'Bullet', categoria_peso: "Women's Flyweight", url_perfil: null, imagem_url: null },
  { nome: 'Tom Aspinall', apelido: null, categoria_peso: 'Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Conor McGregor', apelido: 'Notorious', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Khabib Nurmagomedov', apelido: 'The Eagle', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Charles Oliveira', apelido: 'Do Bronx', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Dustin Poirier', apelido: 'The Diamond', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Justin Gaethje', apelido: 'The Highlight', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Max Holloway', apelido: 'Blessed', categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Alexander Volkanovski', apelido: 'The Great', categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Sean O\'Malley', apelido: 'Sugar', categoria_peso: 'Bantamweight', url_perfil: null, imagem_url: null },
  { nome: 'Stipe Miocic', apelido: null, categoria_peso: 'Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Francis Ngannou', apelido: 'The Predator', categoria_peso: 'Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Ciryl Gane', apelido: 'Bon Gamin', categoria_peso: 'Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Jiri Prochazka', apelido: 'Denisa', categoria_peso: 'Light Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Jamahal Hill', apelido: 'Sweet Dreams', categoria_peso: 'Light Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Magomed Ankalaev', apelido: null, categoria_peso: 'Light Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Glover Teixeira', apelido: null, categoria_peso: 'Light Heavyweight', url_perfil: null, imagem_url: null },
  { nome: 'Israel Adesanya', apelido: 'The Last Stylebender', categoria_peso: 'Middleweight', url_perfil: null, imagem_url: null },
  { nome: 'Sean Strickland', apelido: 'Tarzan', categoria_peso: 'Middleweight', url_perfil: null, imagem_url: null },
  { nome: 'Robert Whittaker', apelido: 'The Reaper', categoria_peso: 'Middleweight', url_perfil: null, imagem_url: null },
  { nome: 'Kamaru Usman', apelido: 'The Nigerian Nightmare', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Colby Covington', apelido: 'Chaos', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Belal Muhammad', apelido: 'Remember The Name', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Gilbert Burns', apelido: 'Durinho', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Jorge Masvidal', apelido: 'Gamebred', categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Nate Diaz', apelido: null, categoria_peso: 'Welterweight', url_perfil: null, imagem_url: null },
  { nome: 'Michael Chandler', apelido: 'Iron', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Arman Tsarukyan', apelido: 'Ahalkalakets', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Beneil Dariush', apelido: null, categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Rafael Fiziev', apelido: 'Ataman', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Brian Ortega', apelido: 'T-City', categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Yair Rodriguez', apelido: 'El Pantera', categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Josh Emmett', apelido: null, categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Arnold Allen', apelido: 'Almighty', categoria_peso: 'Featherweight', url_perfil: null, imagem_url: null },
  { nome: 'Cory Sandhagen', apelido: 'The Sandman', categoria_peso: 'Bantamweight', url_perfil: null, imagem_url: null },
  { nome: 'Marlon Vera', apelido: 'Chito', categoria_peso: 'Bantamweight', url_perfil: null, imagem_url: null },
  { nome: 'Petr Yan', apelido: 'No Mercy', categoria_peso: 'Bantamweight', url_perfil: null, imagem_url: null },
  { nome: 'Henry Cejudo', apelido: 'Triple C', categoria_peso: 'Bantamweight', url_perfil: null, imagem_url: null },
  { nome: 'Brandon Moreno', apelido: 'The Assassin Baby', categoria_peso: 'Flyweight', url_perfil: null, imagem_url: null },
  { nome: 'Deiveson Figueiredo', apelido: 'Deus da Guerra', categoria_peso: 'Flyweight', url_perfil: null, imagem_url: null },
  { nome: 'Amanda Nunes', apelido: 'The Lioness', categoria_peso: "Women's Bantamweight", url_perfil: null, imagem_url: null },
  { nome: 'Julianna Pena', apelido: 'The Venezuelan Vixen', categoria_peso: "Women's Bantamweight", url_perfil: null, imagem_url: null },
  { nome: 'Holly Holm', apelido: 'The Preacher\'s Daughter', categoria_peso: "Women's Bantamweight", url_perfil: null, imagem_url: null },
  { nome: 'Rose Namajunas', apelido: 'Thug Rose', categoria_peso: "Women's Strawweight", url_perfil: null, imagem_url: null },
  { nome: 'Carla Esparza', apelido: 'Cookie Monster', categoria_peso: "Women's Strawweight", url_perfil: null, imagem_url: null },
  { nome: 'Alexa Grasso', apelido: null, categoria_peso: "Women's Flyweight", url_perfil: null, imagem_url: null },
  { nome: 'Manon Fiorot', apelido: 'The Beast', categoria_peso: "Women's Flyweight", url_perfil: null, imagem_url: null },
  { nome: 'Dana White', apelido: null, categoria_peso: null, url_perfil: null, imagem_url: null },
  { nome: 'Paddy Pimblett', apelido: 'The Baddy', categoria_peso: 'Lightweight', url_perfil: null, imagem_url: null },
  { nome: 'Bo Nickal', apelido: null, categoria_peso: 'Middleweight', url_perfil: null, imagem_url: null },
];

async function seedLutadores() {
  console.log('Iniciando seed de lutadores...\n');

  let allAthletes: Lutador[] = [];
  let page = 0;
  let hasMore = true;

  try {
    // Tentar fazer scraping do site do UFC
    while (hasMore && page < 50) {
      // Limite de 50 páginas por segurança
      try {
        const html = await fetchAthletesPage(page);
        const athletes = parseAthletesFromHTML(html);

        if (athletes.length === 0) {
          hasMore = false;
          console.log(`Página ${page} sem atletas. Finalizando...`);
        } else {
          allAthletes = [...allAthletes, ...athletes];
          console.log(
            `Página ${page}: ${athletes.length} atletas encontrados (Total: ${allAthletes.length})`
          );
          page++;
        }

        // Delay entre requisições para não sobrecarregar o servidor
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Erro na página ${page}:`, error);
        hasMore = false;
      }
    }

    // Se não conseguiu nenhum atleta do scraping, usar backup
    if (allAthletes.length === 0) {
      console.log(
        '\nScraping não retornou atletas. Usando lista de backup...'
      );
      allAthletes = LUTADORES_BACKUP;
    } else {
      // Mesclar com backup para garantir lutadores importantes
      const existingNames = new Set(allAthletes.map((a) => a.nome.toLowerCase()));
      for (const backup of LUTADORES_BACKUP) {
        if (!existingNames.has(backup.nome.toLowerCase())) {
          allAthletes.push(backup);
        }
      }
    }

    // Remover duplicatas por nome
    const uniqueAthletes = Array.from(
      new Map(allAthletes.map((a) => [a.nome.toLowerCase(), a])).values()
    );

    console.log(`\nInserindo ${uniqueAthletes.length} lutadores no banco...`);

    let inserted = 0;
    for (const athlete of uniqueAthletes) {
      try {
        await insertLutador(athlete);
        inserted++;
        if (inserted % 50 === 0) {
          console.log(`  ${inserted}/${uniqueAthletes.length} inseridos...`);
        }
      } catch (error) {
        console.error(`Erro ao inserir ${athlete.nome}:`, error);
      }
    }

    console.log(`\n${inserted} lutadores inseridos com sucesso!`);

    // Mostrar contagem final
    const count = await pool.query('SELECT COUNT(*) FROM lutadores');
    console.log(`Total de lutadores no banco: ${count.rows[0].count}`);
  } catch (error) {
    console.error('Erro geral:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedLutadores();
