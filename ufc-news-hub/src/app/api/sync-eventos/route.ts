import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import * as cheerio from 'cheerio';
import type { Element } from 'domhandler';
import { processarEventoFinalizado } from '@/lib/arena/pontuacao';

const UFC_EVENTS_URL = 'https://www.ufc.com/events';
const UFC_BASE_URL = 'https://www.ufc.com';

interface SyncResult {
  success: boolean;
  eventosProcessados: number;
  eventosNovos: number;
  eventosAtualizados: number;
  lutasNovas: number;
  lutasRemovidas: number;
  erro?: string;
}

// Timeout helper
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs)),
  ]);
}

// Função para fazer fetch com retry e timeout
async function fetchWithRetry(url: string, retries = 3, timeoutMs = 10000): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'UFCNewsHub-Bot/1.0 (News Aggregator; educational project)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        next: { revalidate: 0 },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error('Fetch failed after retries');
}

// Parsear lista de eventos da página principal
function parseEventsList(html: string): Array<{
  nome: string;
  ufc_slug: string;
  data_evento: Date | null;
  local_evento: string;
  cidade: string;
  pais: string;
  tipo: 'PPV' | 'Fight Night' | 'Apex';
  status: 'agendado' | 'finalizado';
  event_url: string;
}> {
  const $ = cheerio.load(html);
  const events: Array<{
    nome: string;
    ufc_slug: string;
    data_evento: Date | null;
    local_evento: string;
    cidade: string;
    pais: string;
    tipo: 'PPV' | 'Fight Night' | 'Apex';
    status: 'agendado' | 'finalizado';
    event_url: string;
  }> = [];

  $('.c-card-event--result, .c-card-event--upcoming').each((_, element) => {
    try {
      const $el = $(element);
      const eventLink = $el.find('a').first().attr('href') || '';
      const ufc_slug = eventLink.split('/').pop() || '';

      const headline = (
        $el.find('.c-card-event--result__headline, .c-card-event--upcoming__headline').text() ||
        $el.find('h3').first().text() || ''
      ).replace(/\s+/g, ' ').trim();

      if (!headline) return;

      let nome = '';
      const ppvMatch = ufc_slug.match(/^ufc-(\d+)$/i);
      if (ppvMatch) {
        nome = `UFC ${ppvMatch[1]}`;
      } else if (ufc_slug.toLowerCase().includes('fight-night')) {
        nome = `UFC Fight Night: ${headline}`.toUpperCase();
      } else {
        nome = headline;
      }

      // Data
      const timestampAttr = $el.find('[data-main-card-timestamp]').attr('data-main-card-timestamp') ||
        $el.find('[data-timestamp]').attr('data-timestamp') || '';

      let data_evento: Date | null = null;
      if (timestampAttr) {
        const timestamp = parseInt(timestampAttr);
        if (!isNaN(timestamp) && timestamp > 0) {
          data_evento = new Date(timestamp * 1000);
        }
      }

      // Local
      const local_raw = $el.find('.c-card-event--result__location, .c-card-event--upcoming__location').text() || '';
      const parts = local_raw.replace(/\s+/g, ' ').trim().split(/[,\n]/).map(p => p.trim()).filter(p => p);

      let local_evento = parts[0] || '';
      let cidade = parts[1] || '';
      let pais = parts.slice(2).join(', ') || '';

      // Tipo
      let tipo: 'PPV' | 'Fight Night' | 'Apex' = 'Fight Night';
      if (/ufc \d+/i.test(nome)) tipo = 'PPV';
      else if (local_evento.toLowerCase().includes('apex')) tipo = 'Apex';

      // Status - baseado na data do evento (mais confiável que CSS classes)
      // Evento é considerado "finalizado" se a data já passou
      const now = new Date();
      let status: 'agendado' | 'finalizado' = 'agendado';
      if (data_evento && data_evento < now) {
        status = 'finalizado';
      }

      events.push({
        nome,
        ufc_slug,
        data_evento,
        local_evento: local_evento.substring(0, 100),
        cidade: cidade.substring(0, 100),
        pais: pais.substring(0, 100),
        tipo,
        status,
        event_url: eventLink ? `${UFC_BASE_URL}${eventLink}` : '',
      });
    } catch {
      // Silently skip malformed events
    }
  });

  return events;
}

// Tipos para resultados de lutas
interface FightResult {
  lutador1_nome: string;
  lutador2_nome: string;
  categoria_peso: string;
  tipo: string;
  rounds: number;
  is_titulo: boolean;
  vencedor_nome?: string;
  metodo?: string;
  round_final?: number;
  tempo_final?: string;
}

// URL de fallback para poster genérico do UFC
const UFC_FALLBACK_POSTER = 'https://www.ufc.com/themes/custom/ufc/assets/img/ufc-logo-white.svg';

// Parsear detalhes de um evento (lutas + poster)
function parseEventDetails(html: string, eventName?: string): {
  fights: FightResult[];
  horario_main_card: string | null;
  horario_prelims: string | null;
  horario_early_prelims: string | null;
  poster_url: string | null;
  poster_debug: string;
} {
  const $ = cheerio.load(html);
  const fights: FightResult[] = [];

  // Extrair poster do evento (múltiplos seletores possíveis)
  let poster_url: string | null = null;
  let poster_debug = '';

  // Lista de seletores priorizados (do mais específico ao mais genérico)
  // Baseado na estrutura atual do UFC.com (Janeiro 2026)
  const posterSelectors = [
    // Seletores mais específicos para página de evento
    '.c-hero--full picture source[type="image/webp"]',
    '.c-hero--full picture img',
    '.c-hero--full img',
    '.c-hero__image picture source',
    '.c-hero__image img',
    // Seletores de evento
    '.c-hero--event picture source',
    '.c-hero--event img',
    '.hero-event-image img',
    // Seletores de broadcast/poster
    '.c-event-fight-card-broadcaster__image img',
    '.c-hero picture source',
    '.c-hero picture img',
    '.c-hero img',
    // Seletores genéricos
    '.event-hero img',
    '.l-page-hero__image img',
    // Atributos específicos
    'img[alt*="poster" i]',
    'img[alt*="event" i]',
    'img[data-src*="event"]',
  ];

  for (const selector of posterSelectors) {
    const imgEl = $(selector).first();

    // Tentar vários atributos de imagem
    let src = imgEl.attr('src') ||
              imgEl.attr('srcset')?.split(',')[0]?.trim().split(' ')[0] ||
              imgEl.attr('data-src') ||
              imgEl.attr('data-lazy-src');

    if (src && (src.startsWith('http') || src.startsWith('//'))) {
      poster_url = src.startsWith('//') ? `https:${src}` : src;
      poster_debug = `Encontrado via: ${selector}`;
      break;
    }
  }

  // Fallback: buscar qualquer imagem que pareça ser do evento
  if (!poster_url) {
    const allImages: string[] = [];

    $('img').each((_, el) => {
      const $img = $(el);
      const src = $img.attr('src') || $img.attr('data-src') || '';
      const alt = $img.attr('alt')?.toLowerCase() || '';
      const className = $img.attr('class')?.toLowerCase() || '';

      // Coletar para debug
      if (src.includes('ufc')) {
        allImages.push(`${src.substring(0, 80)}... (alt: ${alt.substring(0, 30)})`);
      }

      // Procurar imagens que parecem ser posters de eventos
      if (!poster_url && src && (src.startsWith('http') || src.startsWith('//'))) {
        const isEventImage =
          src.includes('/styles/event') ||
          src.includes('/event_') ||
          src.includes('event-hero') ||
          src.includes('poster') ||
          alt.includes('ufc ') ||
          alt.includes('fight night') ||
          className.includes('hero');

        if (isEventImage) {
          poster_url = src.startsWith('//') ? `https:${src}` : src;
          poster_debug = `Encontrado via fallback (alt: ${alt})`;
        }
      }
    });

    if (!poster_url && allImages.length > 0) {
      poster_debug = `Nenhum poster encontrado. Imagens UFC na página: ${allImages.length}`;
    }
  }

  // Log detalhado para debug
  if (poster_url) {
    console.log(`  [POSTER] ${eventName || 'Evento'}: ${poster_url.substring(0, 80)}... (${poster_debug})`);
  } else {
    console.log(`  [POSTER] ${eventName || 'Evento'}: NÃO ENCONTRADO. ${poster_debug}`);
  }

  const cleanName = (name: string): string => name.replace(/\s+/g, ' ').trim().substring(0, 100);

  // Parser para resultado (ex: "14:59KO/TKO" ou "35:00Decision - Unanimous")
  const parseResultText = (text: string): { metodo?: string; tempo?: string; round?: number } => {
    if (!text) return {};

    // Limpar texto duplicado e espaços
    const cleanText = text.replace(/\s+/g, ' ').trim();

    // Tentar extrair tempo (formato MM:SS)
    const tempoMatch = cleanText.match(/(\d{1,2}:\d{2})/);
    const tempo = tempoMatch ? tempoMatch[1] : undefined;

    // Mapear métodos
    let metodo: string | undefined;
    if (cleanText.includes('KO/TKO') || cleanText.includes('KO') || cleanText.includes('TKO')) {
      metodo = 'KO/TKO';
    } else if (cleanText.includes('Submission') || cleanText.includes('SUB')) {
      metodo = 'Submission';
    } else if (cleanText.includes('Decision - Unanimous') || cleanText.includes('UD')) {
      metodo = 'Decision - Unanimous';
    } else if (cleanText.includes('Decision - Split') || cleanText.includes('SD')) {
      metodo = 'Decision - Split';
    } else if (cleanText.includes('Decision - Majority') || cleanText.includes('MD')) {
      metodo = 'Decision - Majority';
    } else if (cleanText.includes('DQ') || cleanText.includes('Disqualification')) {
      metodo = 'DQ';
    } else if (cleanText.includes('No Contest') || cleanText.includes('NC')) {
      metodo = 'No Contest';
    } else if (cleanText.includes('Draw')) {
      metodo = 'Draw';
    }

    return { metodo, tempo };
  };

  const parseFight = (
    $fight: cheerio.Cheerio<Element>,
    section: 'main_card' | 'prelims' | 'early_prelims',
    index: number
  ): FightResult | null => {
    const lutador1_nome = cleanName(
      $fight.find('.c-listing-fight__corner-name--red').text() ||
      $fight.find('.c-listing-fight__corner--red .c-listing-fight__corner-name').text() || ''
    );
    const lutador2_nome = cleanName(
      $fight.find('.c-listing-fight__corner-name--blue').text() ||
      $fight.find('.c-listing-fight__corner--blue .c-listing-fight__corner-name').text() || ''
    );

    if (!lutador1_nome || !lutador2_nome) return null;

    const categoria_peso = cleanName(
      $fight.find('.c-listing-fight__class-text').text() ||
      $fight.find('.c-listing-fight__class').text() || 'TBD'
    ).substring(0, 50);

    const is_titulo = $fight.find('.c-listing-fight__belt-img, .c-listing-fight__belt').length > 0;

    let rounds = 3;
    if ($fight.find('.c-listing-fight__rounds').text().includes('5') || is_titulo) {
      rounds = 5;
    }

    let tipo: string;
    if (section === 'main_card') {
      if (index === 0) tipo = 'main_event';
      else if (index === 1) tipo = 'co_main';
      else tipo = 'card_principal';
    } else if (section === 'prelims') {
      tipo = 'preliminar';
    } else {
      tipo = 'early_prelim';
    }

    // Detectar vencedor (via --win ou --loss)
    let vencedor_nome: string | undefined;
    const redCorner = $fight.find('.c-listing-fight__corner--red');
    const blueCorner = $fight.find('.c-listing-fight__corner--blue');

    const redHasWin = redCorner.find('.c-listing-fight__outcome--win').length > 0;
    const blueHasWin = blueCorner.find('.c-listing-fight__outcome--win').length > 0;
    const redHasLoss = redCorner.find('.c-listing-fight__outcome--loss').length > 0;
    const blueHasLoss = blueCorner.find('.c-listing-fight__outcome--loss').length > 0;

    if (redHasWin || blueHasLoss) vencedor_nome = lutador1_nome;
    else if (blueHasWin || redHasLoss) vencedor_nome = lutador2_nome;

    // Extrair resultado (método, tempo)
    const resultText = $fight.find('.c-listing-fight__result-text').text();
    const { metodo, tempo } = parseResultText(resultText);

    // Tentar extrair round final
    let round_final: number | undefined;
    const roundText = $fight.find('.c-listing-fight__result-round').text();
    if (roundText) {
      const roundMatch = roundText.match(/R(\d+)/i) || roundText.match(/(\d+)/);
      if (roundMatch) round_final = parseInt(roundMatch[1]);
    }

    return {
      lutador1_nome,
      lutador2_nome,
      categoria_peso,
      tipo,
      rounds,
      is_titulo,
      vencedor_nome,
      metodo,
      round_final,
      tempo_final: tempo,
    };
  };

  // Main Card
  $('#main-card, .main-card').first().find('.l-listing__item, .c-listing-fight').each((index, el) => {
    const fight = parseFight($(el), 'main_card', index);
    if (fight) fights.push(fight);
  });

  // Prelims
  $('#prelims-card, .fight-card-prelims:not(.fight-card-prelims-early)').first()
    .find('.l-listing__item, .c-listing-fight').each((index, el) => {
      const fight = parseFight($(el), 'prelims', index);
      if (fight) fights.push(fight);
    });

  // Early Prelims
  $('#early-prelims, .fight-card-prelims-early').first()
    .find('.l-listing__item, .c-listing-fight').each((index, el) => {
      const fight = parseFight($(el), 'early_prelims', index);
      if (fight) fights.push(fight);
    });

  // Fallback
  if (fights.length === 0) {
    $('.c-listing-fight, .l-listing__item').each((index, el) => {
      const fight = parseFight($(el), 'main_card', index);
      if (fight) fights.push(fight);
    });
  }

  // Horários
  const mainCardTs = $('[data-main-card-timestamp]').attr('data-main-card-timestamp');
  const prelimsTs = $('[data-prelims-card-timestamp]').attr('data-prelims-card-timestamp');
  const earlyTs = $('[data-early-prelims-card-timestamp]').attr('data-early-prelims-card-timestamp');

  const formatTs = (ts?: string) => {
    if (!ts) return null;
    const num = parseInt(ts);
    if (isNaN(num) || num <= 0) return null;
    return new Date(num * 1000).toISOString();
  };

  return {
    fights,
    horario_main_card: formatTs(mainCardTs),
    horario_prelims: formatTs(prelimsTs),
    horario_early_prelims: formatTs(earlyTs),
    poster_url,
    poster_debug,
  };
}

// Try to fetch fighter image from UFC.com athlete page
// Uses short timeout to avoid blocking sync process
async function fetchFighterImage(nome: string): Promise<string | null> {
  return withTimeout(
    (async () => {
      try {
        // Convert name to URL slug format
        const slug = nome.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        const fighterUrl = `${UFC_BASE_URL}/athlete/${slug}`;
        const html = await fetchWithRetry(fighterUrl, 2, 5000).catch(() => null);

        if (!html) return null;

        const $ = cheerio.load(html);

        // Try multiple selectors for fighter image
        const imgSrc =
          $('.hero-profile__image img').attr('src') ||
          $('.c-hero--athlete img').attr('src') ||
          $('img[alt*="' + nome.split(' ')[0] + '"]').first().attr('src') ||
          $('.hero-profile-wrap img').attr('src');

        if (imgSrc && imgSrc.startsWith('http')) {
          return imgSrc;
        }

        return null;
      } catch {
        return null;
      }
    })(),
    5000, // 5 second timeout
    null
  );
}

// Parse fighter record from UFC.com athlete page
// Uses short timeout to avoid blocking sync process
async function fetchFighterRecord(nome: string): Promise<{ wins: number; losses: number; draws: number } | null> {
  return withTimeout(
    (async () => {
      try {
        const slug = nome.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        const fighterUrl = `${UFC_BASE_URL}/athlete/${slug}`;
        const html = await fetchWithRetry(fighterUrl, 2, 5000).catch(() => null);

        if (!html) return null;

        const $ = cheerio.load(html);

        // Try to find the record (format: "XX-XX-XX" for wins-losses-draws)
        const recordText = $('.hero-profile__division-body').text() ||
          $('.c-hero--athlete__record').text() ||
          $('[class*="record"]').first().text() || '';

        const recordMatch = recordText.match(/(\d+)-(\d+)-(\d+)/);
        if (recordMatch) {
          return {
            wins: parseInt(recordMatch[1]),
            losses: parseInt(recordMatch[2]),
            draws: parseInt(recordMatch[3]),
          };
        }

        return null;
      } catch {
        return null;
      }
    })(),
    5000, // 5 second timeout
    null
  );
}

async function findOrCreateFighter(nome: string): Promise<string | null> {
  if (!nome) return null;

  const normalizedName = nome.trim().toLowerCase();

  // Buscar existente
  const existing = await query<{ id: string; imagem_url: string | null }>(
    `SELECT id, imagem_url FROM lutadores WHERE LOWER(nome) = $1 OR LOWER(nome) LIKE $2 LIMIT 1`,
    [normalizedName, `%${normalizedName}%`]
  );

  if (existing.length > 0) {
    // If fighter exists but has no image, try to fetch it
    if (!existing[0].imagem_url) {
      const imageUrl = await fetchFighterImage(nome);
      if (imageUrl) {
        await query(
          `UPDATE lutadores SET imagem_url = $1 WHERE id = $2`,
          [imageUrl, existing[0].id]
        );
      }
    }
    return existing[0].id;
  }

  // Try to fetch fighter info from UFC.com before creating
  const [imageUrl, record] = await Promise.all([
    fetchFighterImage(nome),
    fetchFighterRecord(nome),
  ]);

  // Criar novo lutador with initialized records
  // Usamos as colunas corretas do schema: nocautes, finalizacoes, decisoes
  const result = await query<{ id: string }>(
    `INSERT INTO lutadores (
      nome, ativo, imagem_url,
      vitorias, derrotas, empates,
      nocautes, finalizacoes, decisoes
    ) VALUES ($1, true, $2, $3, $4, $5, 0, 0, 0)
    RETURNING id`,
    [
      nome.trim(),
      imageUrl,
      record?.wins || 0,
      record?.losses || 0,
      record?.draws || 0,
    ]
  );

  return result[0].id;
}

// Atualizar records dos lutadores após uma luta finalizada
// Returns true if records were updated (i.e., it was a new finalization)
// Note: This checks if vencedor_id was previously NULL to avoid double-counting
async function updateFighterRecords(
  lutaId: string | null,
  vencedorId: string | null,
  lutador1Id: string,
  lutador2Id: string,
  metodo?: string
): Promise<boolean> {
  if (!vencedorId) return false;

  // Check if this fight previously had no winner (to avoid double-counting)
  if (lutaId) {
    try {
      const luta = await queryOne<{ vencedor_id: string | null; records_atualizados?: boolean }>(
        `SELECT vencedor_id, records_atualizados FROM lutas WHERE id = $1`,
        [lutaId]
      );

      // If fight already had a winner set, records were already updated
      // Also check the records_atualizados flag if it exists
      if (luta?.vencedor_id || luta?.records_atualizados) {
        return false;
      }
    } catch {
      // Column might not exist, try simpler query
      const luta = await queryOne<{ vencedor_id: string | null }>(
        `SELECT vencedor_id FROM lutas WHERE id = $1`,
        [lutaId]
      );
      if (luta?.vencedor_id) {
        return false;
      }
    }
  }

  // Determinar o perdedor
  const perdedorId = vencedorId === lutador1Id ? lutador2Id : lutador1Id;

  try {
    // Incrementar vitória do vencedor
    await query(
      `UPDATE lutadores SET vitorias = COALESCE(vitorias, 0) + 1 WHERE id = $1`,
      [vencedorId]
    );

    // Incrementar derrota do perdedor
    await query(
      `UPDATE lutadores SET derrotas = COALESCE(derrotas, 0) + 1 WHERE id = $1`,
      [perdedorId]
    );

    // Atualizar stats específicos por método de vitória
    // Usando as colunas corretas do schema: nocautes, finalizacoes, decisoes
    if (metodo === 'KO/TKO') {
      await query(
        `UPDATE lutadores SET nocautes = COALESCE(nocautes, 0) + 1 WHERE id = $1`,
        [vencedorId]
      ).catch((err) => console.log('Erro ao atualizar nocautes:', err.message));
    } else if (metodo === 'Submission') {
      await query(
        `UPDATE lutadores SET finalizacoes = COALESCE(finalizacoes, 0) + 1 WHERE id = $1`,
        [vencedorId]
      ).catch((err) => console.log('Erro ao atualizar finalizacoes:', err.message));
    } else if (metodo?.includes('Decision')) {
      await query(
        `UPDATE lutadores SET decisoes = COALESCE(decisoes, 0) + 1 WHERE id = $1`,
        [vencedorId]
      ).catch((err) => console.log('Erro ao atualizar decisoes:', err.message));
    }

    // Try to mark this fight as having records updated (if column exists)
    if (lutaId) {
      await query(
        `UPDATE lutas SET records_atualizados = true WHERE id = $1`,
        [lutaId]
      ).catch(() => {}); // Ignore if column doesn't exist
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar records dos lutadores:', error);
    return false;
  }
}

// Verificar se todas as lutas de um evento estão finalizadas
async function checkAndUpdateEventStatus(eventoId: string): Promise<boolean> {
  // Contar lutas agendadas (não finalizadas)
  const result = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM lutas WHERE evento_id = $1 AND status != 'finalizada'`,
    [eventoId]
  );

  const lutasNaoFinalizadas = parseInt(result[0]?.count || '0');

  // Se todas finalizadas, atualizar evento
  if (lutasNaoFinalizadas === 0) {
    await query(
      `UPDATE eventos SET status = 'finalizado' WHERE id = $1`,
      [eventoId]
    );
    return true;
  }

  return false;
}

async function syncEvents(): Promise<SyncResult> {
  let eventosProcessados = 0;
  let eventosNovos = 0;
  let eventosAtualizados = 0;
  let lutasNovas = 0;
  let lutasRemovidas = 0;

  try {
    // 1. Buscar lista de eventos
    const eventsListHtml = await fetchWithRetry(UFC_EVENTS_URL);
    const events = parseEventsList(eventsListHtml);

    // Limitar a 20 eventos por sync
    const eventsToProcess = events.slice(0, 20);

    for (const event of eventsToProcess) {
      try {
        console.log(`\n[SYNC] Processando evento: ${event.nome} (${event.ufc_slug})`);

        // Buscar detalhes do evento
        const eventHtml = await fetchWithRetry(event.event_url);
        const details = parseEventDetails(eventHtml, event.nome);

        // Verificar se evento existe
        const existing = await query<{ id: string }>(
          `SELECT id FROM eventos WHERE ufc_slug = $1`,
          [event.ufc_slug]
        );

        let eventoId: string;

        if (existing.length > 0) {
          eventoId = existing[0].id;

          // Atualizar evento (incluindo poster_url se disponível)
          await query(
            `UPDATE eventos SET
              nome = $1, status = $2,
              horario_main_card = COALESCE($3, horario_main_card),
              horario_prelims = COALESCE($4, horario_prelims),
              horario_early_prelims = COALESCE($5, horario_early_prelims),
              poster_url = COALESCE($6, poster_url),
              last_scraped_at = NOW()
            WHERE id = $7`,
            [
              event.nome, event.status,
              details.horario_main_card, details.horario_prelims, details.horario_early_prelims,
              details.poster_url,
              eventoId
            ]
          );
          console.log(`  -> Evento atualizado: ${event.nome}${details.poster_url ? ' (poster atualizado)' : ''}`);
          eventosAtualizados++;
        } else {
          // Criar evento - gerar slug único incluindo data para evitar duplicatas
          let baseSlug = event.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

          // Adicionar data ao slug para garantir unicidade (especialmente para eventos "TBD vs TBD")
          if (event.data_evento) {
            const dateStr = event.data_evento.toISOString().split('T')[0]; // YYYY-MM-DD
            baseSlug = `${baseSlug}-${dateStr}`;
          }

          // Usar UPSERT para evitar erros de duplicação
          const insertResult = await query<{ id: string }>(
            `INSERT INTO eventos (
              nome, slug, ufc_slug, data_evento, local_evento, cidade, pais,
              tipo, status, horario_main_card, horario_prelims, horario_early_prelims, poster_url, last_scraped_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
            ON CONFLICT (slug) DO UPDATE SET
              nome = EXCLUDED.nome,
              data_evento = COALESCE(EXCLUDED.data_evento, eventos.data_evento),
              local_evento = COALESCE(EXCLUDED.local_evento, eventos.local_evento),
              cidade = COALESCE(EXCLUDED.cidade, eventos.cidade),
              pais = COALESCE(EXCLUDED.pais, eventos.pais),
              horario_main_card = COALESCE(EXCLUDED.horario_main_card, eventos.horario_main_card),
              horario_prelims = COALESCE(EXCLUDED.horario_prelims, eventos.horario_prelims),
              horario_early_prelims = COALESCE(EXCLUDED.horario_early_prelims, eventos.horario_early_prelims),
              poster_url = COALESCE(EXCLUDED.poster_url, eventos.poster_url),
              last_scraped_at = NOW()
            RETURNING id`,
            [
              event.nome, baseSlug, event.ufc_slug, event.data_evento,
              event.local_evento, event.cidade, event.pais, event.tipo, event.status,
              details.horario_main_card, details.horario_prelims, details.horario_early_prelims,
              details.poster_url
            ]
          );
          eventoId = insertResult[0].id;
          console.log(`  -> Novo evento criado: ${event.nome}${details.poster_url ? ' (com poster)' : ''}`);
          eventosNovos++;
        }

        // Obter lutas existentes
        const existingFights = await query<{ id: string; lut1_nome: string; lut2_nome: string }>(
          `SELECT l.id, lut1.nome as lut1_nome, lut2.nome as lut2_nome
           FROM lutas l
           JOIN lutadores lut1 ON l.lutador1_id = lut1.id
           JOIN lutadores lut2 ON l.lutador2_id = lut2.id
           WHERE l.evento_id = $1`,
          [eventoId]
        );

        // Create a map of existing fights with both orderings for proper detection
        const existingFightsMap = new Map<string, { id: string; lut1_id?: string; lut2_id?: string }>();
        for (const f of existingFights) {
          const key1 = `${f.lut1_nome.toLowerCase().trim()}-${f.lut2_nome.toLowerCase().trim()}`;
          const key2 = `${f.lut2_nome.toLowerCase().trim()}-${f.lut1_nome.toLowerCase().trim()}`;
          existingFightsMap.set(key1, { id: f.id });
          existingFightsMap.set(key2, { id: f.id });
        }

        // Helper to check if fight exists and get its ID (in either order)
        const getExistingFightId = (nome1: string, nome2: string): string | null => {
          const key1 = `${nome1.toLowerCase().trim()}-${nome2.toLowerCase().trim()}`;
          const key2 = `${nome2.toLowerCase().trim()}-${nome1.toLowerCase().trim()}`;
          return existingFightsMap.get(key1)?.id || existingFightsMap.get(key2)?.id || null;
        };

        // Create set of new fight keys (both orderings) for removal detection
        const newFightKeys = new Set<string>();
        for (const f of details.fights) {
          const key1 = `${f.lutador1_nome.toLowerCase().trim()}-${f.lutador2_nome.toLowerCase().trim()}`;
          const key2 = `${f.lutador2_nome.toLowerCase().trim()}-${f.lutador1_nome.toLowerCase().trim()}`;
          newFightKeys.add(key1);
          newFightKeys.add(key2);
        }

        // Remover lutas que não existem mais (luta caiu)
        // Use a Set to track which fights we've already checked (avoid double-deletion)
        const deletedFightIds = new Set<string>();
        for (const existingFight of existingFights) {
          if (deletedFightIds.has(existingFight.id)) continue;

          const key1 = `${existingFight.lut1_nome.toLowerCase().trim()}-${existingFight.lut2_nome.toLowerCase().trim()}`;
          const key2 = `${existingFight.lut2_nome.toLowerCase().trim()}-${existingFight.lut1_nome.toLowerCase().trim()}`;

          // Check if this fight exists in the new data (in either order)
          if (!newFightKeys.has(key1) && !newFightKeys.has(key2)) {
            await query(`DELETE FROM lutas WHERE id = $1`, [existingFight.id]);
            deletedFightIds.add(existingFight.id);
            lutasRemovidas++;
          }
        }

        // Adicionar/atualizar lutas
        // Track processed fights to avoid duplicates within same sync
        const processedFightsInThisSync = new Set<string>();
        let ordem = 1;
        for (const fight of details.fights) {
          const fightKey = `${fight.lutador1_nome.toLowerCase().trim()}-${fight.lutador2_nome.toLowerCase().trim()}`;
          const fightKeyReversed = `${fight.lutador2_nome.toLowerCase().trim()}-${fight.lutador1_nome.toLowerCase().trim()}`;

          // Skip if we already processed this fight in this sync (avoids duplicates from same event page)
          if (processedFightsInThisSync.has(fightKey) || processedFightsInThisSync.has(fightKeyReversed)) {
            continue;
          }
          processedFightsInThisSync.add(fightKey);
          processedFightsInThisSync.add(fightKeyReversed);

          const lutador1Id = await findOrCreateFighter(fight.lutador1_nome);
          const lutador2Id = await findOrCreateFighter(fight.lutador2_nome);

          if (!lutador1Id || !lutador2Id) continue;

          let vencedorId: string | null = null;
          if (fight.vencedor_nome) {
            vencedorId = await findOrCreateFighter(fight.vencedor_nome);
          }

          // Check if fight exists in database (in either fighter order)
          const existingFightId = getExistingFightId(fight.lutador1_nome, fight.lutador2_nome);

          if (existingFightId) {
            // Atualizar luta existente - try both orderings
            await query(
              `UPDATE lutas SET
                ordem = $1, tipo = $2, categoria_peso = $3, rounds = $4, is_titulo = $5,
                vencedor_id = COALESCE($6, vencedor_id),
                metodo = COALESCE($7, metodo),
                round_final = COALESCE($8, round_final),
                tempo_final = COALESCE($9, tempo_final),
                status = $10
              WHERE evento_id = $11 AND (
                (lutador1_id = $12 AND lutador2_id = $13) OR
                (lutador1_id = $13 AND lutador2_id = $12)
              )`,
              [
                ordem, fight.tipo, fight.categoria_peso, fight.rounds, fight.is_titulo,
                vencedorId,
                fight.metodo || null,
                fight.round_final || null,
                fight.tempo_final || null,
                vencedorId ? 'finalizada' : 'agendada',
                eventoId, lutador1Id, lutador2Id
              ]
            );

            // If fight was just finalized, update fighter records (only once)
            if (vencedorId) {
              await updateFighterRecords(existingFightId, vencedorId, lutador1Id, lutador2Id, fight.metodo);
            }
          } else {
            // Nova luta - insert and get the ID
            const insertResult = await query<{ id: string }>(
              `INSERT INTO lutas (
                evento_id, lutador1_id, lutador2_id, categoria_peso, ordem, tipo, rounds,
                is_titulo, vencedor_id, metodo, round_final, tempo_final, status,
                lutador1_nome_display, lutador2_nome_display
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
              RETURNING id`,
              [
                eventoId, lutador1Id, lutador2Id, fight.categoria_peso, ordem, fight.tipo,
                fight.rounds, fight.is_titulo, vencedorId,
                fight.metodo || null,
                fight.round_final || null,
                fight.tempo_final || null,
                vencedorId ? 'finalizada' : 'agendada',
                fight.lutador1_nome, fight.lutador2_nome
              ]
            );
            lutasNovas++;

            // If fight has a winner, update fighter records (only once)
            if (vencedorId && insertResult[0]?.id) {
              await updateFighterRecords(insertResult[0].id, vencedorId, lutador1Id, lutador2Id, fight.metodo);
            }
          }

          ordem++;
        }

        // Verificar se evento deve ser marcado como finalizado
        // (baseado em: 1. status do UFC.com ou 2. todas as lutas finalizadas)

        // Verificar status anterior do evento
        const statusAnterior = await queryOne<{ status: string }>(
          `SELECT status FROM eventos WHERE id = $1`,
          [eventoId]
        );
        const eraFinalizado = statusAnterior?.status === 'finalizado';

        let eventoFoiFinalizado = false;

        if (event.status === 'finalizado') {
          await query(
            `UPDATE eventos SET status = 'finalizado' WHERE id = $1`,
            [eventoId]
          );
          eventoFoiFinalizado = true;
        } else {
          // Verificar se todas as lutas estão finalizadas
          eventoFoiFinalizado = await checkAndUpdateEventStatus(eventoId);
        }

        // Se o evento acabou de ser finalizado, processar pontuação da Arena
        if (eventoFoiFinalizado && !eraFinalizado) {
          try {
            const resultadoPontuacao = await processarEventoFinalizado(eventoId);
            console.log(`Arena: Evento ${event.nome} processado - ${resultadoPontuacao.previsoesProcessadas} previsões, ${resultadoPontuacao.pontosDistribuidos} pontos, ${resultadoPontuacao.duelosFinalizados} duelos`);
          } catch (error) {
            console.error(`Erro ao processar pontuação Arena para evento ${event.nome}:`, error);
          }
        }

        eventosProcessados++;

        // Pequeno delay entre eventos
        await new Promise(r => setTimeout(r, 500));

      } catch (error) {
        console.error(`Erro ao processar evento ${event.nome}:`, error);
      }
    }

    return {
      success: true,
      eventosProcessados,
      eventosNovos,
      eventosAtualizados,
      lutasNovas,
      lutasRemovidas,
    };

  } catch (error) {
    return {
      success: false,
      eventosProcessados,
      eventosNovos,
      eventosAtualizados,
      lutasNovas,
      lutasRemovidas,
      erro: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

export async function POST() {
  try {
    const result = await syncEvents();
    console.log('Sync de eventos concluído:', JSON.stringify(result, null, 2));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro no sync de eventos:', error);
    return NextResponse.json(
      { success: false, erro: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST para sincronizar eventos',
    endpoint: '/api/sync-eventos',
  });
}
