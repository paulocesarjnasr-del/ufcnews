import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

// Configurações do scraper
const SCRAPER_CONFIG = {
  baseUrl: 'https://www.ufc.com',
  eventsUrl: 'https://www.ufc.com/events',
  delayBetweenRequests: 3000, // 3 segundos entre requests
  maxEventsPerRun: 50,
  userAgent: 'UFCNewsHub-Bot/1.0 (News Aggregator; educational project)',
};

interface ScrapedEvent {
  nome: string;
  ufc_slug: string;
  data_evento: Date | null;
  local_evento: string;
  cidade: string;
  pais: string;
  tipo: 'PPV' | 'Fight Night' | 'Apex';
  status: 'agendado' | 'finalizado';
  poster_url: string;
  event_url: string;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeEventsList(page: Page): Promise<ScrapedEvent[]> {
  console.log('📋 Acessando lista de eventos do UFC.com...');

  await page.goto(SCRAPER_CONFIG.eventsUrl, { waitUntil: 'networkidle' });
  await delay(2000);

  // Scroll para carregar mais eventos
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await delay(1500);
  }

  const html = await page.content();
  const $ = cheerio.load(html);
  const events: ScrapedEvent[] = [];

  // Selecionar cards de eventos (upcoming e past)
  $('.c-card-event--result, .c-card-event--upcoming').each((_, element) => {
    try {
      const $el = $(element);

      // Link do evento
      const eventLink = $el.find('a').first().attr('href') || '';
      const ufc_slug = eventLink.split('/').pop() || '';

      // Headline (ex: "Gaethje vs Pimblett")
      const headline = (
        $el.find('.c-card-event--result__headline, .c-card-event--upcoming__headline').text() ||
        $el.find('h3').first().text() ||
        ''
      ).replace(/\s+/g, ' ').trim();

      if (!headline) return;

      // Construir nome completo no formato UFC oficial
      // Ex: "UFC 324", "UFC Fight Night: Bautista vs Oliveira"
      let nome = '';

      // Verificar se é um evento numerado (PPV) - slug tipo "ufc-324"
      const ppvMatch = ufc_slug.match(/^ufc-(\d+)$/i);
      if (ppvMatch) {
        nome = `UFC ${ppvMatch[1]}`;
      }
      // Verificar se é um Fight Night - slug tipo "ufc-fight-night-..."
      else if (ufc_slug.toLowerCase().includes('fight-night')) {
        nome = `UFC Fight Night: ${headline}`.toUpperCase();
      }
      // Outros eventos
      else {
        nome = headline;
      }

      if (!nome) return;

      // Data - tentar várias fontes
      const timestampAttr = $el.find('[data-main-card-timestamp]').attr('data-main-card-timestamp') ||
        $el.find('[data-timestamp]').attr('data-timestamp') ||
        $el.attr('data-main-card-timestamp') ||
        $el.attr('data-timestamp') || '';

      const dateText = $el.find('.c-card-event--result__date, .c-card-event--upcoming__date, .e-card-event__date').text().trim() ||
        $el.find('time').attr('datetime') ||
        $el.find('[datetime]').attr('datetime') || '';

      let data_evento: Date | null = null;

      // Primeiro, tentar timestamp Unix
      if (timestampAttr) {
        const timestamp = parseInt(timestampAttr);
        if (!isNaN(timestamp) && timestamp > 0) {
          const date = new Date(timestamp * 1000);
          if (!isNaN(date.getTime())) {
            data_evento = date;
          }
        }
      }

      // Segundo, tentar string de data
      if (!data_evento && dateText) {
        const date = new Date(dateText);
        if (!isNaN(date.getTime())) {
          data_evento = date;
        }
      }

      // Terceiro, tentar extrair data do slug da URL (ex: ufc-fight-night-february-07-2026)
      if (!data_evento && eventLink) {
        const dateMatch = eventLink.match(/(\w+)-(\d{1,2})-(\d{4})$/);
        if (dateMatch) {
          const [, month, day, year] = dateMatch;
          const monthMap: Record<string, number> = {
            'january': 0, 'february': 1, 'march': 2, 'april': 3,
            'may': 4, 'june': 5, 'july': 6, 'august': 7,
            'september': 8, 'october': 9, 'november': 10, 'december': 11
          };
          const monthNum = monthMap[month.toLowerCase()];
          if (monthNum !== undefined) {
            data_evento = new Date(parseInt(year), monthNum, parseInt(day));
          }
        }
      }

      // Local - limpar quebras de linha e extrair partes
      const local_raw =
        $el.find('.c-card-event--result__location, .c-card-event--upcoming__location').text() || '';

      // Limpar e normalizar o texto
      const local_clean = local_raw.replace(/\s+/g, ' ').trim();

      // Tentar extrair arena, cidade e país
      let local_evento = '';
      let cidade = '';
      let pais = '';

      // Padrão comum: "T-Mobile Arena, Las Vegas, NV, United States" ou "Arena, City Country"
      const parts = local_clean.split(/[,\n]/).map(p => p.trim()).filter(p => p);

      if (parts.length >= 3) {
        local_evento = parts[0].substring(0, 100);
        cidade = parts[1].substring(0, 100);
        pais = parts.slice(2).join(', ').substring(0, 100);
      } else if (parts.length === 2) {
        local_evento = parts[0].substring(0, 100);
        cidade = parts[1].substring(0, 100);
      } else if (parts.length === 1) {
        local_evento = parts[0].substring(0, 100);
      }

      // Tipo de evento
      let tipo: 'PPV' | 'Fight Night' | 'Apex' = 'Fight Night';
      if (nome.toLowerCase().includes('ufc ') && /ufc \d+/i.test(nome)) {
        tipo = 'PPV';
      } else if (nome.toLowerCase().includes('apex') || local_evento.toLowerCase().includes('apex')) {
        tipo = 'Apex';
      }

      // Status - determinar baseado na data do evento
      let status: 'agendado' | 'finalizado' = 'agendado';
      if (data_evento) {
        const now = new Date();
        status = data_evento < now ? 'finalizado' : 'agendado';
      } else {
        // Se não tem data, usar a classe CSS como fallback
        const isPast = $el.hasClass('c-card-event--result');
        status = isPast ? 'finalizado' : 'agendado';
      }

      // Poster/imagem
      const poster_url =
        $el.find('img').first().attr('src') ||
        $el.find('.c-card-event--result__image img, .c-card-event--upcoming__image img').attr('src') ||
        '';

      events.push({
        nome,
        ufc_slug,
        data_evento,
        local_evento: local_evento || '',
        cidade: cidade || '',
        pais: pais || '',
        tipo,
        status,
        poster_url,
        event_url: eventLink ? `${SCRAPER_CONFIG.baseUrl}${eventLink}` : '',
      });
    } catch (error) {
      console.error('Erro ao parsear evento:', error);
    }
  });

  console.log(`✅ Encontrados ${events.length} eventos`);
  return events;
}

async function scrapeEventDetails(page: Page, eventUrl: string): Promise<{
  data_evento: Date | null;
  poster_url: string | null;
  horario_main_card: string | null;
  horario_prelims: string | null;
  horario_early_prelims: string | null;
  fights: Array<{
    ordem: number;
    tipo: string;
    lutador1_nome: string;
    lutador1_imagem?: string;
    lutador1_record?: string;
    lutador2_imagem?: string;
    lutador2_record?: string;
    lutador2_nome: string;
    categoria_peso: string;
    rounds: number;
    is_titulo: boolean;
    vencedor_nome?: string;
    metodo?: string;
    round_final?: number;
    tempo_final?: string;
  }>;
}> {
  if (!eventUrl) return { data_evento: null, poster_url: null, horario_main_card: null, horario_prelims: null, horario_early_prelims: null, fights: [] };

  console.log(`  📖 Scraping detalhes: ${eventUrl}`);
  await page.goto(eventUrl, { waitUntil: 'networkidle' });
  await delay(SCRAPER_CONFIG.delayBetweenRequests);

  const html = await page.content();
  const $ = cheerio.load(html);

  const fights: Array<{
    ordem: number;
    tipo: string;
    lutador1_nome: string;
    lutador1_imagem?: string;
    lutador1_record?: string;
    lutador2_nome: string;
    lutador2_imagem?: string;
    lutador2_record?: string;
    categoria_peso: string;
    rounds: number;
    is_titulo: boolean;
    vencedor_nome?: string;
    metodo?: string;
    round_final?: number;
    tempo_final?: string;
  }> = [];

  // Data do evento - tentar várias fontes na página de detalhes
  let data_evento: Date | null = null;

  // Tentar timestamp
  const mainCardTimestamp = $('[data-main-card-timestamp]').attr('data-main-card-timestamp') || '';
  if (mainCardTimestamp) {
    const ts = parseInt(mainCardTimestamp);
    if (!isNaN(ts) && ts > 0) {
      const date = new Date(ts * 1000);
      if (!isNaN(date.getTime())) {
        data_evento = date;
      }
    }
  }

  // Tentar elementos de data
  if (!data_evento) {
    const dateSelectors = [
      '.c-hero--event__date',
      '.c-hero__headline-suffix',
      '.e-countdown__date',
      'time[datetime]',
      '[datetime]',
      '.event-details__date'
    ];
    for (const selector of dateSelectors) {
      const dateStr = $(selector).attr('datetime') || $(selector).text().trim();
      if (dateStr) {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          data_evento = date;
          break;
        }
      }
    }
  }

  // Tentar extrair da URL
  if (!data_evento) {
    const dateMatch = eventUrl.match(/(\w+)-(\d{1,2})-(\d{4})$/);
    if (dateMatch) {
      const [, month, day, year] = dateMatch;
      const monthMap: Record<string, number> = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3,
        'may': 4, 'june': 5, 'july': 6, 'august': 7,
        'september': 8, 'october': 9, 'november': 10, 'december': 11
      };
      const monthNum = monthMap[month.toLowerCase()];
      if (monthNum !== undefined) {
        data_evento = new Date(parseInt(year), monthNum, parseInt(day));
      }
    }
  }

  // Horários
  const horario_main_card = mainCardTimestamp;
  const horario_prelims = $('[data-prelims-card-timestamp]').attr('data-prelims-card-timestamp') || '';
  const horario_early_prelims = $('[data-early-prelims-card-timestamp]').attr('data-early-prelims-card-timestamp') || '';

  // Poster do evento - buscar a imagem principal do evento
  let poster_url: string | null = null;
  const posterSelectors = [
    '.c-hero__image img',
    '.c-hero--event img',
    '.hero-image img',
    '.c-event-fight-card-broadcaster__image img',
    'picture.c-hero__image source',
    '.l-main__hero img',
  ];
  for (const selector of posterSelectors) {
    const img = $(selector).first();
    const src = img.attr('src') || img.attr('srcset')?.split(' ')[0];
    if (src && !src.includes('athlete_headshot') && !src.includes('SILHOUETTE')) {
      poster_url = src.startsWith('http') ? src : `https://www.ufc.com${src}`;
      break;
    }
  }

  // Se não encontrou poster específico, tentar a meta tag og:image
  if (!poster_url) {
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      poster_url = ogImage;
    }
  }

  // Helper function para limpar nomes
  const cleanName = (name: string): string => {
    return name.replace(/\s+/g, ' ').trim().substring(0, 100);
  };

  // Função para converter URL de corpo inteiro para headshot
  const toHeadshot = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    if (url.includes('SILHOUETTE') || url.includes('no-profile-image')) return undefined;

    let newUrl = url
      .replace('event_fight_card_upper_body_of_standing_athlete', 'event_results_athlete_headshot')
      .replace('athlete_bio_full_body', 'event_results_athlete_headshot')
      .replace('teaser', 'event_results_athlete_headshot');

    // Remover sufixo _L ou _R (pose esquerda/direita)
    newUrl = newUrl.replace(/_[LR]_(\d{2}-\d{2}\.png)/, '_$1');

    return newUrl;
  };

  // Função para parsear uma luta individual
  const parseFight = (
    $fight: cheerio.Cheerio<cheerio.Element>,
    cardSection: 'main_card' | 'prelims' | 'early_prelims',
    indexInSection: number
  ) => {
    const lutador1_nome = cleanName(
      $fight.find('.c-listing-fight__corner-name--red').text() ||
      $fight.find('.c-listing-fight__corner--red .c-listing-fight__corner-name').text() ||
      ''
    );

    const lutador2_nome = cleanName(
      $fight.find('.c-listing-fight__corner-name--blue').text() ||
      $fight.find('.c-listing-fight__corner--blue .c-listing-fight__corner-name').text() ||
      ''
    );

    if (!lutador1_nome || !lutador2_nome) return null;

    const $cornerRed = $fight.find('.c-listing-fight__corner--red');
    const $cornerBlue = $fight.find('.c-listing-fight__corner--blue');

    const lutador1_imagem = toHeadshot(
      $cornerRed.find('img').attr('src') ||
      $cornerRed.find('.c-listing-fight__corner-image img').attr('src')
    );

    const lutador2_imagem = toHeadshot(
      $cornerBlue.find('img').attr('src') ||
      $cornerBlue.find('.c-listing-fight__corner-image img').attr('src')
    );

    const lutador1_record = cleanName(
      $cornerRed.find('.c-listing-fight__record').text() ||
      $cornerRed.find('.c-listing-fight__corner-body--record').text() ||
      ''
    ) || undefined;

    const lutador2_record = cleanName(
      $cornerBlue.find('.c-listing-fight__record').text() ||
      $cornerBlue.find('.c-listing-fight__corner-body--record').text() ||
      ''
    ) || undefined;

    const categoria_peso = cleanName(
      $fight.find('.c-listing-fight__class-text').text() ||
      $fight.find('.c-listing-fight__class').text() ||
      'TBD'
    ).substring(0, 50);

    const is_titulo =
      $fight.find('.c-listing-fight__belt-img, .c-listing-fight__belt').length > 0 ||
      $fight.text().toLowerCase().includes('title') ||
      $fight.text().toLowerCase().includes('championship');

    let rounds = 3;
    const roundsText = $fight.find('.c-listing-fight__rounds').text().trim();
    if (roundsText.includes('5') || is_titulo) {
      rounds = 5;
    }

    // Determinar tipo baseado na seção e posição
    let tipo: string;
    if (cardSection === 'main_card') {
      if (indexInSection === 0) tipo = 'main_event';
      else if (indexInSection === 1) tipo = 'co_main';
      else tipo = 'card_principal';
    } else if (cardSection === 'prelims') {
      tipo = 'preliminar';
    } else {
      tipo = 'early_prelim';
    }

    // Resultado
    let vencedor_nome: string | undefined;
    let metodo: string | undefined;
    let round_final: number | undefined;
    let tempo_final: string | undefined;

    const dataStatus = $fight.attr('data-status') || '';
    const isFinalizedFight = dataStatus.toLowerCase().startsWith('final');

    const redHasWin = $fight.find('.c-listing-fight__corner--red .c-listing-fight__outcome--win').length > 0;
    const blueHasWin = $fight.find('.c-listing-fight__corner--blue .c-listing-fight__outcome--win').length > 0;
    const redOutcomeText = $fight.find('.c-listing-fight__corner--red .c-listing-fight__outcome-wrapper').text().toLowerCase().trim();
    const blueOutcomeText = $fight.find('.c-listing-fight__corner--blue .c-listing-fight__outcome-wrapper').text().toLowerCase().trim();

    if (redHasWin || redOutcomeText.includes('win')) {
      vencedor_nome = lutador1_nome;
    } else if (blueHasWin || blueOutcomeText.includes('win')) {
      vencedor_nome = lutador2_nome;
    }

    const allFightText = $fight.text();

    if (allFightText.match(/\b(KO|TKO)\b/i)) metodo = 'KO/TKO';
    else if (allFightText.match(/\b(SUB|Submission)\b/i)) metodo = 'Submission';
    else if (allFightText.match(/\bU-DEC\b/i) || allFightText.match(/Unanimous/i)) metodo = 'Decision - Unanimous';
    else if (allFightText.match(/\bS-DEC\b/i) || allFightText.match(/Split/i)) metodo = 'Decision - Split';
    else if (allFightText.match(/\bM-DEC\b/i) || allFightText.match(/Majority/i)) metodo = 'Decision - Majority';
    else if (allFightText.match(/\bDEC\b/i) || allFightText.match(/Decision/i)) metodo = 'Decision - Unanimous';

    const roundMatch = allFightText.match(/R(\d)|Round\s*(\d)/i);
    if (roundMatch) round_final = parseInt(roundMatch[1] || roundMatch[2]);

    const timeMatch = allFightText.match(/(\d+:\d+)/);
    if (timeMatch) tempo_final = timeMatch[1];

    if (isFinalizedFight && !vencedor_nome) {
      if (allFightText.toLowerCase().includes('draw')) {
        metodo = 'Draw';
      } else if (allFightText.toLowerCase().includes('no contest') || allFightText.toLowerCase().includes(' nc ')) {
        metodo = 'No Contest';
      }
    }

    return {
      tipo,
      lutador1_nome,
      lutador1_imagem,
      lutador1_record,
      lutador2_nome,
      lutador2_imagem,
      lutador2_record,
      categoria_peso,
      rounds,
      is_titulo,
      vencedor_nome,
      metodo,
      round_final,
      tempo_final,
    };
  };

  // Processar lutas por seção do card
  // Usar Set para evitar duplicatas
  const processedFights = new Set<string>();
  let ordem = 1;

  const addFight = (fightData: ReturnType<typeof parseFight>, section: string) => {
    if (!fightData) return;
    // Chave única para evitar duplicatas
    const key = `${fightData.lutador1_nome}-${fightData.lutador2_nome}`.toLowerCase();
    if (processedFights.has(key)) return;
    processedFights.add(key);
    fights.push({ ordem: ordem++, ...fightData });
  };

  // 1. MAIN CARD - seção #main-card ou .main-card
  // Usar seletor mais específico: .c-listing-fight que contém os dados
  const mainCardSection = $('#main-card, .main-card').first();
  let mainCardIndex = 0;
  mainCardSection.find('.c-listing-fight').each((_, element) => {
    try {
      const $fight = $(element);
      const fightData = parseFight($fight, 'main_card', mainCardIndex);
      if (fightData) {
        addFight(fightData, 'Main Card');
        mainCardIndex++;
      }
    } catch (error) {
      console.error('    Erro ao parsear luta (Main Card):', error);
    }
  });

  // 2. PRELIMS - seção que tem "prelims" mas não "early"
  let prelimsIndex = 0;
  $('.fight-card-prelims').each((_, sectionEl) => {
    const $section = $(sectionEl);
    // Pular se for early prelims
    if ($section.hasClass('fight-card-prelims-early')) return;

    $section.find('.c-listing-fight').each((_, element) => {
      try {
        const $fight = $(element);
        const fightData = parseFight($fight, 'prelims', prelimsIndex);
        if (fightData) {
          addFight(fightData, 'Prelims');
          prelimsIndex++;
        }
      } catch (error) {
        console.error('    Erro ao parsear luta (Prelims):', error);
      }
    });
  });

  // 3. EARLY PRELIMS - seção .fight-card-prelims-early ou #early-prelims
  let earlyIndex = 0;
  $('#early-prelims, .fight-card-prelims-early').each((_, sectionEl) => {
    const $section = $(sectionEl);
    $section.find('.c-listing-fight').each((_, element) => {
      try {
        const $fight = $(element);
        const fightData = parseFight($fight, 'early_prelims', earlyIndex);
        if (fightData) {
          addFight(fightData, 'Early Prelims');
          earlyIndex++;
        }
      } catch (error) {
        console.error('    Erro ao parsear luta (Early Prelims):', error);
      }
    });
  });

  // Fallback: se não encontrou seções específicas, usar método antigo
  if (fights.length === 0) {
    let fallbackIndex = 0;
    $('.c-listing-fight').each((_, element) => {
      try {
        const $fight = $(element);
        const fightData = parseFight($fight, 'main_card', fallbackIndex);
        if (fightData) {
          addFight(fightData, 'Fallback');
          fallbackIndex++;
        }
      } catch (error) {
        console.error('    Erro ao parsear luta:', error);
      }
    });
  }

  return {
    data_evento,
    poster_url,
    horario_main_card: formatTimestamp(horario_main_card),
    horario_prelims: formatTimestamp(horario_prelims),
    horario_early_prelims: formatTimestamp(horario_early_prelims),
    fights,
  };
}

function formatTimestamp(timestamp: string): string | null {
  // Validar entrada
  if (!timestamp || timestamp.trim() === '') return null;

  const ts = parseInt(timestamp);

  // Verificar se é um número válido e positivo
  if (isNaN(ts) || ts <= 0) return null;

  const date = new Date(ts * 1000);

  // Verificar se a data resultante é válida
  if (isNaN(date.getTime())) return null;

  return date.toISOString();
}

// Parse record string like "25-3-0" into { vitorias, derrotas, empates }
function parseRecord(record?: string): { vitorias: number; derrotas: number; empates: number } | null {
  if (!record) return null;

  // Handle formats like "25-3-0", "25 - 3 - 0", "(25-3-0)"
  const cleaned = record.replace(/[()]/g, '').trim();
  const match = cleaned.match(/(\d+)\s*[-–]\s*(\d+)\s*[-–]\s*(\d+)/);

  if (!match) return null;

  return {
    vitorias: parseInt(match[1], 10),
    derrotas: parseInt(match[2], 10),
    empates: parseInt(match[3], 10),
  };
}

interface FighterData {
  nome: string;
  imagem_url?: string;
  record?: string;
}

async function findOrCreateFighter(data: FighterData): Promise<string | null> {
  const { nome, imagem_url, record } = data;
  if (!nome) return null;

  // Normalizar nome
  const normalizedName = nome.trim().toLowerCase();

  // Parse record if available
  const parsedRecord = parseRecord(record);

  // Buscar lutador existente
  const result = await pool.query(
    `SELECT id, imagem_url, vitorias FROM lutadores WHERE LOWER(nome) = $1 OR LOWER(nome) LIKE $2 LIMIT 1`,
    [normalizedName, `%${normalizedName}%`]
  );

  if (result.rows.length > 0) {
    const existingFighter = result.rows[0];

    // Update image and record if we have new data and the existing is missing/outdated
    const needsImageUpdate = imagem_url && !existingFighter.imagem_url;
    const needsRecordUpdate = parsedRecord && (!existingFighter.vitorias || existingFighter.vitorias === 0);

    if (needsImageUpdate || needsRecordUpdate) {
      await pool.query(
        `UPDATE lutadores SET
          imagem_url = COALESCE(NULLIF($1, ''), imagem_url),
          vitorias = COALESCE($2, vitorias),
          derrotas = COALESCE($3, derrotas),
          empates = COALESCE($4, empates)
        WHERE id = $5`,
        [
          imagem_url || null,
          parsedRecord?.vitorias ?? null,
          parsedRecord?.derrotas ?? null,
          parsedRecord?.empates ?? null,
          existingFighter.id,
        ]
      );
    }

    return existingFighter.id;
  }

  // Criar novo lutador se não encontrar
  const insertResult = await pool.query(
    `INSERT INTO lutadores (nome, imagem_url, vitorias, derrotas, empates, ativo)
     VALUES ($1, $2, $3, $4, $5, true)
     RETURNING id`,
    [
      nome.trim(),
      imagem_url || null,
      parsedRecord?.vitorias ?? 0,
      parsedRecord?.derrotas ?? 0,
      parsedRecord?.empates ?? 0,
    ]
  );

  console.log(`    ✨ Novo lutador criado: ${nome}${parsedRecord ? ` (${parsedRecord.vitorias}-${parsedRecord.derrotas}-${parsedRecord.empates})` : ''}`);
  return insertResult.rows[0].id;
}

async function saveEventToDatabase(event: ScrapedEvent, details: Awaited<ReturnType<typeof scrapeEventDetails>>) {
  try {
    // Usar a data do evento da listagem ou da página de detalhes
    const dataEvento = event.data_evento || details.data_evento;

    // Se ainda não temos data, não podemos salvar o evento
    if (!dataEvento) {
      console.log(`  ⚠️ Evento ${event.nome} ignorado: data não encontrada`);
      return;
    }

    // Verificar se evento já existe
    const existing = await pool.query(
      `SELECT id FROM eventos WHERE ufc_slug = $1 OR LOWER(nome) = LOWER($2)`,
      [event.ufc_slug, event.nome]
    );

    let eventoId: string;

    // Usar poster da página de detalhes (melhor qualidade) ou da listagem
    const posterUrl = details.poster_url || event.poster_url;

    if (existing.rows.length > 0) {
      // Atualizar evento existente
      eventoId = existing.rows[0].id;
      await pool.query(
        `UPDATE eventos SET
          nome = $1,
          ufc_slug = $2,
          data_evento = COALESCE($3, data_evento),
          local_evento = COALESCE(NULLIF($4, ''), local_evento),
          cidade = COALESCE(NULLIF($5, ''), cidade),
          pais = COALESCE(NULLIF($6, ''), pais),
          tipo = $7,
          status = $8,
          poster_url = COALESCE(NULLIF($9, ''), poster_url),
          horario_main_card = COALESCE($10, horario_main_card),
          horario_prelims = COALESCE($11, horario_prelims),
          horario_early_prelims = COALESCE($12, horario_early_prelims),
          last_scraped_at = NOW()
        WHERE id = $13`,
        [
          event.nome,
          event.ufc_slug,
          dataEvento,
          event.local_evento,
          event.cidade,
          event.pais,
          event.tipo,
          event.status,
          posterUrl,
          details.horario_main_card,
          details.horario_prelims,
          details.horario_early_prelims,
          eventoId,
        ]
      );
      console.log(`  ♻️ Evento atualizado: ${event.nome}`);
    } else {
      // Criar novo evento
      const slug = event.nome
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const insertResult = await pool.query(
        `INSERT INTO eventos (
          nome, slug, ufc_slug, data_evento, local_evento, cidade, pais,
          tipo, status, poster_url, horario_main_card, horario_prelims,
          horario_early_prelims, last_scraped_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
        RETURNING id`,
        [
          event.nome,
          slug,
          event.ufc_slug,
          dataEvento,
          event.local_evento,
          event.cidade,
          event.pais,
          event.tipo,
          event.status,
          posterUrl,
          details.horario_main_card,
          details.horario_prelims,
          details.horario_early_prelims,
        ]
      );
      eventoId = insertResult.rows[0].id;
      console.log(`  ✨ Novo evento criado: ${event.nome}`);
    }

    // Salvar lutas
    for (const fight of details.fights) {
      const lutador1Id = await findOrCreateFighter({
        nome: fight.lutador1_nome,
        imagem_url: fight.lutador1_imagem,
        record: fight.lutador1_record,
      });
      const lutador2Id = await findOrCreateFighter({
        nome: fight.lutador2_nome,
        imagem_url: fight.lutador2_imagem,
        record: fight.lutador2_record,
      });

      if (!lutador1Id || !lutador2Id) continue;

      // Verificar se luta já existe
      const existingFight = await pool.query(
        `SELECT id FROM lutas WHERE evento_id = $1 AND lutador1_id = $2 AND lutador2_id = $3`,
        [eventoId, lutador1Id, lutador2Id]
      );

      // Determinar vencedor
      let vencedorId: string | null = null;
      if (fight.vencedor_nome) {
        vencedorId = await findOrCreateFighter({ nome: fight.vencedor_nome });
      }

      // Mapear método para enum
      let metodo: string | null = null;
      if (fight.metodo) {
        const metodosMap: Record<string, string> = {
          'ko': 'KO/TKO',
          'tko': 'KO/TKO',
          'knockout': 'KO/TKO',
          'submission': 'Submission',
          'sub': 'Submission',
          'unanimous': 'Decision - Unanimous',
          'split': 'Decision - Split',
          'majority': 'Decision - Majority',
          'decision': 'Decision - Unanimous',
          'dq': 'DQ',
          'disqualification': 'DQ',
          'nc': 'No Contest',
          'no contest': 'No Contest',
          'draw': 'Draw',
        };

        const lowerMetodo = fight.metodo.toLowerCase();
        for (const [key, value] of Object.entries(metodosMap)) {
          if (lowerMetodo.includes(key)) {
            metodo = value;
            break;
          }
        }
      }

      const lutaStatus = vencedorId ? 'finalizada' : 'agendada';

      if (existingFight.rows.length > 0) {
        // Atualizar luta existente
        await pool.query(
          `UPDATE lutas SET
            ordem = $1, tipo = $2, categoria_peso = $3, rounds = $4, is_titulo = $5,
            vencedor_id = COALESCE($6, vencedor_id), metodo = COALESCE($7::metodo_vitoria, metodo),
            round_final = COALESCE($8, round_final), tempo_final = COALESCE($9, tempo_final),
            status = $10,
            lutador1_nome_display = $11, lutador2_nome_display = $12
          WHERE id = $13`,
          [
            fight.ordem,
            fight.tipo,
            fight.categoria_peso,
            fight.rounds,
            fight.is_titulo,
            vencedorId,
            metodo,
            fight.round_final,
            fight.tempo_final,
            lutaStatus,
            fight.lutador1_nome,
            fight.lutador2_nome,
            existingFight.rows[0].id,
          ]
        );
      } else {
        // Criar nova luta
        await pool.query(
          `INSERT INTO lutas (
            evento_id, lutador1_id, lutador2_id, categoria_peso, ordem, tipo, rounds,
            is_titulo, vencedor_id, metodo, round_final, tempo_final, status,
            lutador1_nome_display, lutador2_nome_display
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::metodo_vitoria, $11, $12, $13, $14, $15)`,
          [
            eventoId,
            lutador1Id,
            lutador2Id,
            fight.categoria_peso,
            fight.ordem,
            fight.tipo,
            fight.rounds,
            fight.is_titulo,
            vencedorId,
            metodo,
            fight.round_final,
            fight.tempo_final,
            lutaStatus,
            fight.lutador1_nome,
            fight.lutador2_nome,
          ]
        );
      }
    }

    console.log(`    ✅ ${details.fights.length} lutas processadas`);
  } catch (error) {
    console.error(`  ❌ Erro ao salvar evento ${event.nome}:`, error);
  }
}

async function scrapeAllEvents() {
  console.log('🥊 UFC Events Scraper - Iniciando...\n');
  console.log(`⚙️ Configurações:`);
  console.log(`   - Delay entre requests: ${SCRAPER_CONFIG.delayBetweenRequests}ms`);
  console.log(`   - Máximo de eventos: ${SCRAPER_CONFIG.maxEventsPerRun}`);
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

    // Scrape lista de eventos
    const events = await scrapeEventsList(page);

    // Limitar quantidade
    const eventsToProcess = events.slice(0, SCRAPER_CONFIG.maxEventsPerRun);

    console.log(`\n📊 Processando ${eventsToProcess.length} eventos...\n`);

    // Processar cada evento
    for (let i = 0; i < eventsToProcess.length; i++) {
      const event = eventsToProcess[i];
      console.log(`\n[${i + 1}/${eventsToProcess.length}] ${event.nome}`);

      // Scrape detalhes do evento
      const details = await scrapeEventDetails(page, event.event_url);

      // Salvar no banco
      await saveEventToDatabase(event, details);

      // Delay entre eventos
      if (i < eventsToProcess.length - 1) {
        await delay(SCRAPER_CONFIG.delayBetweenRequests);
      }
    }

    console.log('\n✅ Scraping concluído!');
    console.log(`📊 ${eventsToProcess.length} eventos processados`);
  } catch (error) {
    console.error('❌ Erro no scraper:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    await pool.end();
  }
}

// Executar
scrapeAllEvents();
