#!/usr/bin/env node
/**
 * SCRIPT DE TESTE - UFC.com JSON:API
 * Nao modifica nada no banco nem no codigo.
 * Apenas testa a API e mostra os resultados no terminal.
 *
 * Uso: node scripts/test-ufc-api.mjs
 */

const BASE = 'https://www.ufc.com/jsonapi';
const HEADERS = { 'Accept': 'application/vnd.api+json' };

// ─── Cores no terminal ──────────────────────────────────────────
const R = '\x1b[31m', G = '\x1b[32m', Y = '\x1b[33m', C = '\x1b[36m', B = '\x1b[1m', D = '\x1b[2m', X = '\x1b[0m';

function hr(label) {
  console.log(`\n${R}${'━'.repeat(60)}${X}`);
  console.log(`${B}${R}  ${label}${X}`);
  console.log(`${R}${'━'.repeat(60)}${X}\n`);
}

async function fetchJson(url) {
  const start = Date.now();
  const res = await fetch(url, { headers: HEADERS });
  const ms = Date.now() - start;
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.log(`  ${R}HTTP ${res.status}${X} ${D}${body.substring(0, 200)}${X}`);
    throw new Error(`HTTP ${res.status} em ${ms}ms`);
  }
  const data = await res.json();
  return { data, ms };
}

// ════════════════════════════════════════════════════════════════
// TESTE 1: Buscar lutadores com stats e imagens
// ════════════════════════════════════════════════════════════════
async function testFighters() {
  hr('TESTE 1: Lutadores (athlete + stats + imagem)');

  const url = `${BASE}/node/athlete?sort=-changed&include=athlete_stat,stats_weight_class,image.field_media_image`;
  console.log(`${D}GET ${url}${X}\n`);

  const { data: json, ms } = await fetchJson(url);
  const athletes = json.data || [];
  const included = json.included || [];

  // Mapear stats e imagens do included
  const statsMap = {};
  const imageMap = {};
  const wcMap = {};

  for (const inc of included) {
    if (inc.type === 'athlete_stat--athlete_stat') {
      statsMap[inc.id] = inc.attributes;
    } else if (inc.type === 'file--file') {
      imageMap[inc.id] = inc.attributes?.uri?.url;
    } else if (inc.type === 'media--image') {
      const fileId = inc.relationships?.field_media_image?.data?.id;
      if (fileId) imageMap[`media:${inc.id}`] = fileId;
    } else if (inc.type === 'taxonomy_term--stats_weight_class') {
      wcMap[inc.id] = inc.attributes?.name;
    }
  }

  console.log(`${G}✓${X} ${athletes.length} lutadores em ${G}${ms}ms${X}\n`);

  for (const a of athletes.slice(0, 5)) {
    const attr = a.attributes;
    const statId = a.relationships?.athlete_stat?.data?.id;
    const stats = statsMap[statId] || {};
    const wcId = a.relationships?.stats_weight_class?.data?.id;
    const weightClass = wcMap[wcId] || '?';

    // Resolver imagem
    const mediaId = a.relationships?.image?.data?.id;
    const mediaFileRef = imageMap[`media:${mediaId}`];
    const imgUrl = imageMap[mediaFileRef] || null;

    console.log(`  ${B}${attr.title}${X} ${attr.nickname ? `"${attr.nickname}"` : ''}`);
    console.log(`    ${C}Peso:${X} ${weightClass}`);
    console.log(`    ${C}Record:${X} ${stats.career_wins ?? '?'}-${stats.career_losses ?? '?'}-${stats.career_draws ?? '?'} (${stats.win_ko ?? '?'} KO, ${stats.win_sub ?? '?'} Sub, ${stats.win_dec ?? '?'} Dec)`);
    console.log(`    ${C}Altura:${X} ${attr.stats_height || '?'}" | ${C}Envergadura:${X} ${attr.stats_reach_arm || '?'}"`);
    console.log(`    ${C}Nascimento:${X} ${attr.dob || '?'} | ${C}Idade:${X} ${attr.age || '?'}`);
    console.log(`    ${C}Origem:${X} ${attr.origin?.locality || '?'}, ${attr.origin?.administrative_area || ''} ${attr.origin?.country_code || '?'}`);
    console.log(`    ${C}Ranking:${X} #${attr.rank ?? 'NR'} | ${C}P4P:${X} #${attr.pfp_rank ?? 'NR'}`);
    console.log(`    ${C}Strikes:${X} ${stats.sig_str_land_min ?? '?'} SLpM, ${stats.sig_strikes_accuracy ?? '?'}% acc`);
    console.log(`    ${C}Takedowns:${X} ${stats.takedown_acuracy ?? '?'}% acc, ${stats.takedown_defense ?? '?'}% def`);
    console.log(`    ${C}Imagem:${X} ${imgUrl ? `${G}SIM${X} ${D}${imgUrl.substring(0, 80)}...${X}` : `${R}NAO${X}`}`);
    console.log('');
  }

  return athletes.length;
}

// ════════════════════════════════════════════════════════════════
// TESTE 2: Paginacao completa - quantos lutadores tem?
// ════════════════════════════════════════════════════════════════
async function testPagination() {
  hr('TESTE 2: Paginacao (contando todos os lutadores)');

  let total = 0;
  let lastNid = 0;
  let pages = 0;
  const startAll = Date.now();

  while (true) {
    const filterPart = lastNid === 0
      ? ''
      : `&filter[nid_filter][condition][path]=drupal_internal__nid&filter[nid_filter][condition][operator]=%3E&filter[nid_filter][condition][value]=${lastNid}`;

    const url = `${BASE}/node/athlete?sort=drupal_internal__nid${filterPart}`;
    const { data: json, ms } = await fetchJson(url);
    const batch = json.data || [];

    if (batch.length === 0) break;

    total += batch.length;
    lastNid = batch[batch.length - 1].attributes.drupal_internal__nid;
    pages++;

    process.stdout.write(`  ${D}Pagina ${pages}: +${batch.length} lutadores (${ms}ms) | Total: ${total}${X}\r`);

    if (batch.length < 50) break;
  }

  const totalMs = Date.now() - startAll;
  console.log(`\n\n  ${G}✓${X} ${B}${total}${X} lutadores no UFC.com em ${pages} paginas | ${G}${totalMs}ms (${(totalMs / 1000).toFixed(1)}s)${X}`);
  return total;
}

// ════════════════════════════════════════════════════════════════
// TESTE 3: Eventos
// ════════════════════════════════════════════════════════════════
async function testEvents() {
  hr('TESTE 3: Eventos (proximos + recentes)');

  const url = `${BASE}/node/event?sort=-fight_card_time_main&filter[status]=1`;
  console.log(`${D}GET ${url}${X}\n`);

  const { data: json, ms } = await fetchJson(url);
  const events = json.data || [];

  console.log(`${G}✓${X} ${events.length} eventos em ${G}${ms}ms${X}\n`);

  for (const e of events) {
    const attr = e.attributes;
    const mainTime = attr.fight_card_time_main;
    const date = mainTime ? new Date(mainTime).toLocaleDateString('pt-BR') : '?';

    console.log(`  ${B}${attr.title}${X} ${attr.subtitle ? `- ${attr.subtitle}` : ''}`);
    console.log(`    ${C}Data:${X} ${date} | ${C}Hashtag:${X} ${attr.hashtag || '-'}`);
    console.log(`    ${C}Path:${X} ${attr.path?.alias || '-'}`);
    console.log('');
  }

  return events.length;
}

// ════════════════════════════════════════════════════════════════
// TESTE 4: Card de um evento com lutadores
// ════════════════════════════════════════════════════════════════
async function testFightCard() {
  hr('TESTE 4: Card completo de um evento');

  // Pegar o evento mais recente primeiro
  const evUrl = `${BASE}/node/event?sort=-fight_card_time_main&filter[status]=1`;
  const { data: evJson } = await fetchJson(evUrl);
  const event = evJson.data?.[0];

  if (!event) {
    console.log(`  ${R}Nenhum evento encontrado${X}`);
    return 0;
  }

  const hubId = event.attributes.hub_id;
  const title = event.attributes.title + (event.attributes.subtitle ? ` - ${event.attributes.subtitle}` : '');

  console.log(`  Buscando card de: ${B}${title}${X} (hub_id: ${hubId})\n`);

  const url = `${BASE}/node/event?filter[hub_id]=${hubId}&include=fights,fights.red_corner,fights.blue_corner,fights.weight_class`;
  console.log(`${D}GET ${url}${X}\n`);

  const { data: json, ms } = await fetchJson(url);
  const included = json.included || [];

  // Mapear lutadores e categorias
  const fighterMap = {};
  const wcMap = {};
  const fights = [];

  for (const inc of included) {
    if (inc.type === 'node--athlete') {
      fighterMap[inc.id] = inc.attributes.title;
    } else if (inc.type === 'taxonomy_term--stats_weight_class') {
      wcMap[inc.id] = inc.attributes.name;
    } else if (inc.type === 'node--fight') {
      fights.push(inc);
    }
  }

  console.log(`${G}✓${X} ${fights.length} lutas em ${G}${ms}ms${X}\n`);

  for (const f of fights) {
    const attr = f.attributes;
    const redId = f.relationships?.red_corner?.data?.id;
    const blueId = f.relationships?.blue_corner?.data?.id;
    const wcId = f.relationships?.weight_class?.data?.id;
    const winnerId = f.relationships?.fight_final_winner?.data?.id;

    const red = fighterMap[redId] || '?';
    const blue = fighterMap[blueId] || '?';
    const wc = wcMap[wcId] || '?';

    const result = attr.fight_outcome
      ? ` → ${Y}${fighterMap[winnerId] || '?'} via ${attr.fight_final_method || '?'} R${attr.fight_final_round || '?'} ${attr.fight_final_time || ''}${X}`
      : '';

    const rounds = attr.rounds ? `(${attr.rounds}R)` : '';
    const isTitle = attr.title_fight ? ` ${R}[TITULO]${X}` : '';

    console.log(`  ${B}${red}${X} vs ${B}${blue}${X} - ${C}${wc}${X} ${rounds}${isTitle}${result}`);
  }

  return fights.length;
}

// ════════════════════════════════════════════════════════════════
// TESTE 5: Buscar lutador especifico
// ════════════════════════════════════════════════════════════════
async function testSearchFighter() {
  hr('TESTE 5: Busca por nome (ex: "Alex Pereira")');

  const name = 'Alex Pereira';
  const url = `${BASE}/node/athlete?filter[title]=${encodeURIComponent(name)}&include=athlete_stat,stats_weight_class`;
  console.log(`${D}GET ${url}${X}\n`);

  const { data: json, ms } = await fetchJson(url);
  const athletes = json.data || [];
  const included = json.included || [];

  const statsMap = {};
  const wcMap = {};
  for (const inc of included) {
    if (inc.type === 'athlete_stat--athlete_stat') statsMap[inc.id] = inc.attributes;
    if (inc.type === 'taxonomy_term--stats_weight_class') wcMap[inc.id] = inc.attributes?.name;
  }

  console.log(`${G}✓${X} ${athletes.length} resultado(s) em ${G}${ms}ms${X}\n`);

  for (const a of athletes) {
    const attr = a.attributes;
    const statId = a.relationships?.athlete_stat?.data?.id;
    const stats = statsMap[statId] || {};
    const wcId = a.relationships?.stats_weight_class?.data?.id;

    console.log(`  ${B}${attr.title}${X} "${attr.nickname || ''}"`);
    console.log(`    ${C}Peso:${X} ${wcMap[wcId] || '?'} | ${C}Record:${X} ${stats.career_wins}-${stats.career_losses}-${stats.career_draws}`);
    console.log(`    ${C}KOs:${X} ${stats.win_ko} | ${C}Subs:${X} ${stats.win_sub} | ${C}Dec:${X} ${stats.win_dec}`);
    console.log(`    ${C}Sig Strikes:${X} ${stats.sig_str_land_min} SLpM, ${stats.sig_strikes_accuracy}% acc`);
    console.log(`    ${C}Sig Absorbed:${X} ${stats.sig_str_abs_min} SApM`);
    console.log(`    ${C}TD:${X} ${stats.takedown_acuracy}% acc, ${stats.takedown_defense}% def`);
    console.log(`    ${C}Bonuses:${X} ${stats.total_bonuses} | ${C}Win Streak:${X} ${stats.win_streak}`);
    console.log(`    ${C}Debut:${X} ${attr.octagon_debut || '?'} | ${C}Nascimento:${X} ${attr.dob}`);
    console.log(`    ${C}Altura:${X} ${attr.stats_height}" | ${C}Envergadura:${X} ${attr.stats_reach_arm}"`);
    console.log('');
  }
}

// ════════════════════════════════════════════════════════════════
// TESTE 6: Rankings
// ════════════════════════════════════════════════════════════════
async function testRankings() {
  hr('TESTE 6: Rankings atuais');

  const url = `${BASE}/athlete_ranking/athlete_ranking`;
  console.log(`${D}GET ${url}${X}\n`);

  const { data: json, ms } = await fetchJson(url);
  const rankings = json.data || [];

  console.log(`${G}✓${X} ${rankings.length} rankings em ${G}${ms}ms${X}\n`);

  for (const r of rankings.slice(0, 10)) {
    const attr = r.attributes;
    console.log(`  #${attr.weight_class_rank ?? '?'} ${D}(antes: #${attr.weight_class_rank_previous ?? '?'})${X} - Category: ${attr.category || '?'}`);
  }
}

// ════════════════════════════════════════════════════════════════
// RUN ALL
// ════════════════════════════════════════════════════════════════
async function main() {
  console.log(`\n${B}${R}  ╔══════════════════════════════════════════════════╗${X}`);
  console.log(`${B}${R}  ║   UFC.com JSON:API - TESTE DE VIABILIDADE        ║${X}`);
  console.log(`${B}${R}  ║   Nenhum dado sera gravado no banco              ║${X}`);
  console.log(`${B}${R}  ╚══════════════════════════════════════════════════╝${X}`);

  const startTotal = Date.now();

  const tests = [testFighters, testPagination, testEvents, testFightCard, testSearchFighter, testRankings];
  for (const test of tests) {
    try {
      await test();
    } catch (err) {
      console.error(`  ${R}ERRO: ${err.message}${X}\n`);
    }
  }

  const totalSec = ((Date.now() - startTotal) / 1000).toFixed(1);

  hr('RESULTADO FINAL');
  console.log(`  Tempo total de todos os testes: ${G}${B}${totalSec}s${X}`);
  console.log(`  ${D}Nenhum dado foi gravado no banco. Tudo read-only.${X}\n`);
}

main();
