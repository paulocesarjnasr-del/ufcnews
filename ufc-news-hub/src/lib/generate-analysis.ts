import Anthropic from '@anthropic-ai/sdk';
import { getFighterStatsByName, UFCFighterStats } from './ufcstats-scraper';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface FighterData {
  id: string;
  nome: string;
  apelido: string | null;
  pais: string | null;
  cidade_natal: string | null;
  idade: number | null;
  altura: string | null;
  envergadura: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
  nocautes: number;
  finalizacoes: number;
  decisoes: number;
  ranking_divisao: number | null;
  academia: string | null;
  estilo_luta: string | null;
  imagem_url: string | null;
  categoria_peso: string | null;
}

interface EventData {
  id: string;
  nome: string;
  slug: string;
  data_evento: string;
  local_evento: string | null;
  cidade: string | null;
  pais: string | null;
  tipo: string;
  onde_assistir: string | null;
}

interface FightData {
  id: string;
  categoria_peso: string;
  rounds: number;
  is_titulo: boolean;
  tipo: string;
  lutador1: FighterData;
  lutador2: FighterData;
}

const ANALYSIS_PROMPT = `You are an expert UFC/MMA analyst. Generate a comprehensive fight analysis in Portuguese (Brazilian).

## EVENT INFO
Event: {evento_nome}
Date: {evento_data}
Location: {evento_local}
Broadcast: {broadcast}

## MAIN EVENT
{categoria_peso} • {num_rounds} Rounds {is_titulo_text}

### FIGHTER 1
Name: {f1_nome}
Nickname: {f1_apelido}
Country: {f1_pais}
Record: {f1_vitorias}-{f1_derrotas}-{f1_empates}
KOs: {f1_nocautes} | Submissions: {f1_finalizacoes} | Decisions: {f1_decisoes}
Height: {f1_altura}
Reach: {f1_envergadura}
Age: {f1_idade}
Ranking: {f1_ranking}
Gym: {f1_academia}
Style: {f1_estilo}

### FIGHTER 2
Name: {f2_nome}
Nickname: {f2_apelido}
Country: {f2_pais}
Record: {f2_vitorias}-{f2_derrotas}-{f2_empates}
KOs: {f2_nocautes} | Submissions: {f2_finalizacoes} | Decisions: {f2_decisoes}
Height: {f2_altura}
Reach: {f2_envergadura}
Age: {f2_idade}
Ranking: {f2_ranking}
Gym: {f2_academia}
Style: {f2_estilo}

## GENERATE THE FOLLOWING JSON STRUCTURE

Return ONLY valid JSON with this exact structure:

{
  "titulo": "Título chamativo para a análise em PT-BR (max 100 chars)",
  "subtitulo": "Subtítulo complementar (max 200 chars)",
  "artigo_conteudo": "Full article in Portuguese (5-7 paragraphs, HTML with <p> tags). Cover: matchup significance, recent form, stylistic contrast, title implications, venue significance.",
  "tactical_breakdown": {
    "stats": [
      {"label": "Sig. Strikes/min", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2"|"even", "suffix": ""},
      {"label": "Strike Accuracy", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "Strike Defense", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "TD Average/15min", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2"},
      {"label": "TD Accuracy", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "TD Defense", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "Sub Attempts/15min", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2"},
      {"label": "Win Streak", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2"},
      {"label": "Finish Rate", "fighter1Value": <number>, "fighter2Value": <number>, "advantage": "fighter1"|"fighter2", "suffix": "%"}
    ],
    "radarData": [
      {"axis": "Striking", "fighter1": <0-100>, "fighter2": <0-100>},
      {"axis": "Volume", "fighter1": <0-100>, "fighter2": <0-100>},
      {"axis": "Grappling", "fighter1": <0-100>, "fighter2": <0-100>},
      {"axis": "Cardio", "fighter1": <0-100>, "fighter2": <0-100>},
      {"axis": "Defense", "fighter1": <0-100>, "fighter2": <0-100>},
      {"axis": "Finishing", "fighter1": <0-100>, "fighter2": <0-100>}
    ],
    "taleOfTape": {
      "fighter1": {"altura": "<height>", "envergadura": "<reach>", "idade": <age>, "academia": "<gym>"},
      "fighter2": {"altura": "<height>", "envergadura": "<reach>", "idade": <age>, "academia": "<gym>"}
    },
    "pathsToVictory": {
      "fighter1": [{"title": "<strategy name>", "description": "<detailed explanation>"}],
      "fighter2": [{"title": "<strategy name>", "description": "<detailed explanation>"}]
    },
    "dangerZones": [
      {"round": "Round 1-2", "description": "<danger analysis>"},
      {"round": "Round 3", "description": "<pivot round analysis>"},
      {"round": "Round 4-5", "description": "<championship round analysis>"}
    ],
    "reachAdvantage": {"fighter": "fighter1"|"fighter2", "inches": <number>, "description": "<analysis of reach advantage impact>"}
  },
  "fight_prediction": {
    "predictedWinner": "fighter1"|"fighter2",
    "predictedMethod": "<method in Portuguese e.g. Decisão, Finalização, TKO>",
    "confidence": "Alta"|"Média"|"Baixa",
    "fighter1Scenarios": [
      {"method": "<Portuguese>", "probability": <percent>, "description": "<explanation>"}
    ],
    "fighter2Scenarios": [
      {"method": "<Portuguese>", "probability": <percent>, "description": "<explanation>"}
    ],
    "keyFactors": [
      {"factor": "<factor name>", "edge": "fighter1"|"fighter2", "impact": <1-10>, "description": "<explanation>"}
    ],
    "xFactor": {
      "title": "<dramatic title>",
      "description": "<detailed x-factor analysis>",
      "details": "<round/timing prediction>",
      "smartBet": "<betting insight>"
    }
  },
  "fighter1_info": {
    "nome": "{f1_nome}",
    "apelido": "{f1_apelido}",
    "pais": "<flag emoji + country>",
    "cidade": "{f1_cidade}",
    "record": "{f1_vitorias}-{f1_derrotas}-{f1_empates}",
    "ranking": "<#N division>",
    "sigStrikesPerMin": <number>,
    "strikeAccuracy": <number>,
    "strikeDefense": <number>,
    "tdDefense": <number>,
    "ultimasLutas": [
      {"result": "W"|"L", "opponent": "<name>", "method": "<method>", "event": "<event name>"}
    ]
  },
  "fighter2_info": {
    "nome": "{f2_nome}",
    "apelido": "{f2_apelido}",
    "pais": "<flag emoji + country>",
    "cidade": "{f2_cidade}",
    "record": "{f2_vitorias}-{f2_derrotas}-{f2_empates}",
    "ranking": "<#N division>",
    "sigStrikesPerMin": <number>,
    "strikeAccuracy": <number>,
    "strikeDefense": <number>,
    "tdDefense": <number>,
    "ultimasLutas": [
      {"result": "W"|"L", "opponent": "<name>", "method": "<method>", "event": "<event name>"}
    ]
  }
}

## REAL STATS FROM UFCSTATS.COM (USE THESE EXACT NUMBERS)
{real_stats_block}

IMPORTANT:
- All probabilities for fighter1 + fighter2 scenarios should sum to ~97% (leave 3% for draw/NC)
- USE THE EXACT REAL STATS PROVIDED ABOVE for sigStrikesPerMin, strikeAccuracy, strikeDefense, tdDefense, tdAvg, tdAcc, subAvg — DO NOT INVENT OR ESTIMATE THESE
- Generate at least 3-4 scenarios per fighter and 5-7 key factors
- Generate 3-4 paths to victory per fighter
- Write the article and all text in Brazilian Portuguese
- Make the analysis insightful and data-driven
- The radar chart (radarData) values are subjective 0-100 ratings you generate based on the real stats

RESPOND WITH ONLY THE JSON, NO ADDITIONAL TEXT.`;

function formatRealStats(name: string, label: string, stats: UFCFighterStats | null): string {
  if (!stats) return `${label}: Stats not available for "${name}" — estimate based on known info.`;
  return `${label} (${stats.name} — ${stats.record}):
  - SLpM (Sig. Strikes/min): ${stats.slpm ?? 'N/A'}
  - Str. Accuracy: ${stats.strAcc ?? 'N/A'}%
  - SApM (Absorbed/min): ${stats.sapm ?? 'N/A'}
  - Str. Defense: ${stats.strDef ?? 'N/A'}%
  - TD Avg (per 15min): ${stats.tdAvg ?? 'N/A'}
  - TD Accuracy: ${stats.tdAcc ?? 'N/A'}%
  - TD Defense: ${stats.tdDef ?? 'N/A'}%
  - Sub. Avg (per 15min): ${stats.subAvg ?? 'N/A'}
  - Height: ${stats.height ?? 'N/A'}
  - Reach: ${stats.reach ?? 'N/A'}
  - Stance: ${stats.stance ?? 'N/A'}
  - DOB: ${stats.dob ?? 'N/A'}`;
}

export async function generateFightAnalysis(
  event: EventData,
  fight: FightData
): Promise<Record<string, unknown>> {
  const f1 = fight.lutador1;
  const f2 = fight.lutador2;

  // Scrape real stats from ufcstats.com
  console.log(`[ANALYSIS] Scraping stats for ${f1.nome} and ${f2.nome}...`);
  const [f1Stats, f2Stats] = await Promise.all([
    getFighterStatsByName(f1.nome),
    getFighterStatsByName(f2.nome),
  ]);
  console.log(`[ANALYSIS] Stats scraped — F1: ${f1Stats ? 'OK' : 'NOT FOUND'}, F2: ${f2Stats ? 'OK' : 'NOT FOUND'}`);

  const realStatsBlock = [
    formatRealStats(f1.nome, 'FIGHTER 1 REAL STATS', f1Stats),
    '',
    formatRealStats(f2.nome, 'FIGHTER 2 REAL STATS', f2Stats),
  ].join('\n');

  const prompt = ANALYSIS_PROMPT
    .replace('{real_stats_block}', realStatsBlock)
    .replace('{evento_nome}', event.nome)
    .replace('{evento_data}', event.data_evento)
    .replace('{evento_local}', `${event.local_evento || ''}, ${event.cidade || ''}, ${event.pais || ''}`)
    .replace('{broadcast}', event.onde_assistir || 'UFC Fight Pass')
    .replace('{categoria_peso}', fight.categoria_peso)
    .replace('{num_rounds}', String(fight.rounds))
    .replace('{is_titulo_text}', fight.is_titulo ? '• Title Fight' : '')
    .replace(/{f1_nome}/g, f1.nome)
    .replace(/{f1_apelido}/g, f1.apelido || 'N/A')
    .replace('{f1_pais}', f1.pais || 'Unknown')
    .replace(/{f1_vitorias}/g, String(f1.vitorias))
    .replace(/{f1_derrotas}/g, String(f1.derrotas))
    .replace(/{f1_empates}/g, String(f1.empates))
    .replace('{f1_nocautes}', String(f1.nocautes))
    .replace('{f1_finalizacoes}', String(f1.finalizacoes))
    .replace('{f1_decisoes}', String(f1.decisoes))
    .replace('{f1_altura}', f1.altura || 'Unknown')
    .replace('{f1_envergadura}', f1.envergadura || 'Unknown')
    .replace('{f1_idade}', String(f1.idade || 'Unknown'))
    .replace('{f1_ranking}', f1.ranking_divisao ? `#${f1.ranking_divisao}` : 'Unranked')
    .replace('{f1_academia}', f1.academia || 'Unknown')
    .replace('{f1_estilo}', f1.estilo_luta || 'MMA')
    .replace(/{f1_cidade}/g, f1.cidade_natal || '')
    .replace(/{f2_nome}/g, f2.nome)
    .replace(/{f2_apelido}/g, f2.apelido || 'N/A')
    .replace('{f2_pais}', f2.pais || 'Unknown')
    .replace(/{f2_vitorias}/g, String(f2.vitorias))
    .replace(/{f2_derrotas}/g, String(f2.derrotas))
    .replace(/{f2_empates}/g, String(f2.empates))
    .replace('{f2_nocautes}', String(f2.nocautes))
    .replace('{f2_finalizacoes}', String(f2.finalizacoes))
    .replace('{f2_decisoes}', String(f2.decisoes))
    .replace('{f2_altura}', f2.altura || 'Unknown')
    .replace('{f2_envergadura}', f2.envergadura || 'Unknown')
    .replace('{f2_idade}', String(f2.idade || 'Unknown'))
    .replace('{f2_ranking}', f2.ranking_divisao ? `#${f2.ranking_divisao}` : 'Unranked')
    .replace('{f2_academia}', f2.academia || 'Unknown')
    .replace('{f2_estilo}', f2.estilo_luta || 'MMA')
    .replace(/{f2_cidade}/g, f2.cidade_natal || '');

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response format from Claude');
  }

  let jsonText = content.text.trim();
  if (jsonText.startsWith('```json')) jsonText = jsonText.slice(7);
  if (jsonText.startsWith('```')) jsonText = jsonText.slice(3);
  if (jsonText.endsWith('```')) jsonText = jsonText.slice(0, -3);
  jsonText = jsonText.trim();

  return JSON.parse(jsonText);
}

export function generateSlug(eventName: string): string {
  return eventName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
