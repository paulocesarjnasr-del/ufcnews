import Anthropic from '@anthropic-ai/sdk';
import { getFighterStatsByName, getEnhancedFighterProfile, UFCFighterStats } from './ufcstats-scraper';
import {
  calculateDerivedMetrics,
  compareFighters,
  formatEnhancedDataPackage,
  formatHeadToHeadComparison,
} from './derived-metrics';
import { computeStatComparison, computeWinDistribution, computeCommonOpponent } from './compute-analysis-data';
import { getFighterImageUrls, buildUfcSlug } from './ufc-images';
import { conductFightResearch, formatResearchBriefing, extractEventCorrections } from './web-research';
import type { FullAnalysisData } from '@/types/analise';

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
  ordem?: number;
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
- NEVER INVENT OR GUESS fighter nationality, country, or city. USE EXACTLY the Country values provided above for each fighter. Do NOT assume nationality based on the fighter's name or surname.
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
  console.info(`[ANALYSIS] Scraping stats for ${f1.nome} and ${f2.nome}...`);
  const [f1Stats, f2Stats] = await Promise.all([
    getFighterStatsByName(f1.nome),
    getFighterStatsByName(f2.nome),
  ]);
  console.info(`[ANALYSIS] Stats scraped — F1: ${f1Stats ? 'OK' : 'NOT FOUND'}, F2: ${f2Stats ? 'OK' : 'NOT FOUND'}`);

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

// ---------------------------------------------------------------------------
// CARD FIGHT PROMPT — Extended prompt for main event fights (5-7 paragraphs)
// Includes betting_value section
// ---------------------------------------------------------------------------

const CARD_FIGHT_PROMPT = `Você é um analista profissional de MMA e handicapper de apostas. Gere uma análise completa da luta com picks de valor para apostas. Seja confiante nos picks. Tom profissional.

## INFORMAÇÕES DO EVENTO
Evento: {evento_nome}
Data: {evento_data}
Local: {evento_local}
Transmissão: {broadcast}

## LUTA PRINCIPAL
{categoria_peso} • {num_rounds} Rounds {is_titulo_text}

### LUTADOR 1
Nome: {f1_nome}
Apelido: {f1_apelido}
País: {f1_pais}
Cartel: {f1_vitorias}-{f1_derrotas}-{f1_empates}
KOs: {f1_nocautes} | Finalizações: {f1_finalizacoes} | Decisões: {f1_decisoes}
Altura: {f1_altura}
Envergadura: {f1_envergadura}
Idade: {f1_idade}
Ranking: {f1_ranking}
Academia: {f1_academia}
Estilo: {f1_estilo}

### LUTADOR 2
Nome: {f2_nome}
Apelido: {f2_apelido}
País: {f2_pais}
Cartel: {f2_vitorias}-{f2_derrotas}-{f2_empates}
KOs: {f2_nocautes} | Finalizações: {f2_finalizacoes} | Decisões: {f2_decisoes}
Altura: {f2_altura}
Envergadura: {f2_envergadura}
Idade: {f2_idade}
Ranking: {f2_ranking}
Academia: {f2_academia}
Estilo: {f2_estilo}

## GERE A SEGUINTE ESTRUTURA JSON

Retorne APENAS JSON válido com esta estrutura exata:

{
  "titulo": "Título chamativo para a análise em PT-BR (max 100 chars)",
  "subtitulo": "Subtítulo complementar (max 200 chars)",
  "artigo_conteudo": "Artigo completo em Português (5-7 parágrafos, HTML com tags <p>). Cubra: significado do confronto, forma recente, contraste de estilos, implicações de título, importância do local.",
  "tactical_breakdown": {
    "stats": [
      {"label": "Sig. Strikes/min", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"|"even", "suffix": ""},
      {"label": "Strike Accuracy", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "Strike Defense", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "TD Average/15min", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"},
      {"label": "TD Accuracy", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "TD Defense", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "Sub Attempts/15min", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"},
      {"label": "Win Streak", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"},
      {"label": "Finish Rate", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"}
    ],
    "radarData": [
      {"axis": "Striking", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Volume", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Grappling", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Cardio", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Defense", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Finishing", "fighter1": "<0-100>", "fighter2": "<0-100>"}
    ],
    "taleOfTape": {
      "fighter1": {"altura": "<height>", "envergadura": "<reach>", "idade": "<age>", "academia": "<gym>"},
      "fighter2": {"altura": "<height>", "envergadura": "<reach>", "idade": "<age>", "academia": "<gym>"}
    },
    "pathsToVictory": {
      "fighter1": [{"title": "<nome da estratégia>", "description": "<explicação detalhada>"}],
      "fighter2": [{"title": "<nome da estratégia>", "description": "<explicação detalhada>"}]
    },
    "dangerZones": [
      {"round": "Round 1-2", "description": "<análise de perigo>"},
      {"round": "Round 3", "description": "<análise do round pivô>"},
      {"round": "Round 4-5", "description": "<análise dos rounds de campeonato>"}
    ],
    "reachAdvantage": {"fighter": "fighter1"|"fighter2", "inches": "<number>", "description": "<análise do impacto da vantagem de alcance>"}
  },
  "fight_prediction": {
    "predictedWinner": "fighter1"|"fighter2",
    "predictedMethod": "<método em Português ex: Decisão, Finalização, TKO>",
    "confidence": "Alta"|"Média"|"Baixa",
    "fighter1Scenarios": [
      {"method": "<Português>", "probability": "<percent>", "description": "<explicação>"}
    ],
    "fighter2Scenarios": [
      {"method": "<Português>", "probability": "<percent>", "description": "<explicação>"}
    ],
    "keyFactors": [
      {"factor": "<nome do fator>", "edge": "fighter1"|"fighter2", "impact": "<1-10>", "description": "<explicação>"}
    ],
    "xFactor": {
      "title": "<título dramático>",
      "description": "<análise detalhada do x-factor>",
      "details": "<previsão de round/timing>",
      "smartBet": "<insight de aposta>"
    }
  },
  "fighter1_info": {
    "nome": "{f1_nome}",
    "apelido": "{f1_apelido}",
    "pais": "<emoji bandeira + país>",
    "cidade": "{f1_cidade}",
    "record": "{f1_vitorias}-{f1_derrotas}-{f1_empates}",
    "ranking": "<#N divisão>",
    "sigStrikesPerMin": "<number>",
    "strikeAccuracy": "<number>",
    "strikeDefense": "<number>",
    "tdDefense": "<number>",
    "ultimasLutas": [
      {"result": "W"|"L", "opponent": "<nome>", "method": "<método>", "event": "<nome do evento>"}
    ]
  },
  "fighter2_info": {
    "nome": "{f2_nome}",
    "apelido": "{f2_apelido}",
    "pais": "<emoji bandeira + país>",
    "cidade": "{f2_cidade}",
    "record": "{f2_vitorias}-{f2_derrotas}-{f2_empates}",
    "ranking": "<#N divisão>",
    "sigStrikesPerMin": "<number>",
    "strikeAccuracy": "<number>",
    "strikeDefense": "<number>",
    "tdDefense": "<number>",
    "ultimasLutas": [
      {"result": "W"|"L", "opponent": "<nome>", "method": "<método>", "event": "<nome do evento>"}
    ]
  },
  "betting_value": {
    "moneyline": { "pick": "fighter1"|"fighter2", "fighter_name": "<nome>", "confidence": "<1-10>", "reasoning": "<explicação>" },
    "method": { "pick": "<método ex: KO/TKO, Finalização, Decisão>", "value_rating": "<1-10>", "reasoning": "<explicação>" },
    "over_under": { "pick": "over"|"under", "rounds": "<number>", "reasoning": "<explicação>" },
    "bestBet": "<recomendação de melhor aposta em uma linha>",
    "avoidBet": "<recomendação de aposta a evitar em uma linha>"
  }
}

## DADOS COMPLETOS DO UFCSTATS.COM (USE ESTES DADOS — NUNCA INVENTE)
{real_stats_block}

IMPORTANTE:
- Todas as probabilidades dos cenários fighter1 + fighter2 devem somar ~97% (deixe 3% para empate/NC)
- USE AS ESTATÍSTICAS REAIS FORNECIDAS ACIMA para sigStrikesPerMin, strikeAccuracy, strikeDefense, tdDefense, tdAvg, tdAcc, subAvg — NÃO INVENTE OU ESTIME
- NUNCA INVENTE OU ADIVINHE a nacionalidade, país ou cidade dos lutadores. USE EXATAMENTE os valores de Country fornecidos acima. NÃO assuma nacionalidade baseado no nome ou sobrenome do lutador.
- Gere pelo menos 3-4 cenários por lutador e 5-7 fatores-chave
- Gere 3-4 caminhos para vitória por lutador
- Escreva o artigo e todo texto em Português Brasileiro
- USE os dados de fight history, trending, distribuição de golpes, grappling, round-by-round patterns e head-to-head comparison para fundamentar sua análise
- Mencione dados específicos de lutas anteriores no artigo (ex: "Na luta contra X, Y conectou Z golpes significativos...")
- Os valores do radar chart (radarData) são classificações subjetivas 0-100 que você gera com base nas stats reais
- Para betting_value: seja CONFIANTE nos picks, justifique com dados concretos dos fight history, avalie valor real
- Se houver oponentes em comum na comparação, use isso na análise

RESPONDA APENAS COM O JSON, SEM TEXTO ADICIONAL.`;

// ---------------------------------------------------------------------------
// COMPACT FIGHT PROMPT — Shorter version for co-main/card fights (2-3 paragraphs)
// Same JSON structure including betting_value
// ---------------------------------------------------------------------------

const COMPACT_FIGHT_PROMPT = `Você é um analista profissional de MMA e handicapper de apostas. Gere uma análise concisa da luta com picks de valor para apostas. Seja confiante nos picks. Tom profissional.

## INFORMAÇÕES DO EVENTO
Evento: {evento_nome}
Data: {evento_data}
Local: {evento_local}
Transmissão: {broadcast}

## LUTA
{categoria_peso} • {num_rounds} Rounds {is_titulo_text}

### LUTADOR 1
Nome: {f1_nome}
Apelido: {f1_apelido}
País: {f1_pais}
Cartel: {f1_vitorias}-{f1_derrotas}-{f1_empates}
KOs: {f1_nocautes} | Finalizações: {f1_finalizacoes} | Decisões: {f1_decisoes}
Altura: {f1_altura}
Envergadura: {f1_envergadura}
Idade: {f1_idade}
Ranking: {f1_ranking}
Academia: {f1_academia}
Estilo: {f1_estilo}

### LUTADOR 2
Nome: {f2_nome}
Apelido: {f2_apelido}
País: {f2_pais}
Cartel: {f2_vitorias}-{f2_derrotas}-{f2_empates}
KOs: {f2_nocautes} | Finalizações: {f2_finalizacoes} | Decisões: {f2_decisoes}
Altura: {f2_altura}
Envergadura: {f2_envergadura}
Idade: {f2_idade}
Ranking: {f2_ranking}
Academia: {f2_academia}
Estilo: {f2_estilo}

## GERE A SEGUINTE ESTRUTURA JSON

Retorne APENAS JSON válido com esta estrutura exata (versão compacta — artigo de 2-3 parágrafos):

{
  "titulo": "Título chamativo para a análise em PT-BR (max 100 chars)",
  "subtitulo": "Subtítulo complementar (max 200 chars)",
  "artigo_conteudo": "Artigo conciso em Português (2-3 parágrafos, HTML com tags <p>). Cubra: significado do confronto, forma recente, contraste de estilos.",
  "tactical_breakdown": {
    "stats": [
      {"label": "Sig. Strikes/min", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"|"even", "suffix": ""},
      {"label": "Strike Accuracy", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "Strike Defense", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "TD Average/15min", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"},
      {"label": "TD Accuracy", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "TD Defense", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"},
      {"label": "Sub Attempts/15min", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"},
      {"label": "Win Streak", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2"},
      {"label": "Finish Rate", "fighter1Value": "<number>", "fighter2Value": "<number>", "advantage": "fighter1"|"fighter2", "suffix": "%"}
    ],
    "radarData": [
      {"axis": "Striking", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Volume", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Grappling", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Cardio", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Defense", "fighter1": "<0-100>", "fighter2": "<0-100>"},
      {"axis": "Finishing", "fighter1": "<0-100>", "fighter2": "<0-100>"}
    ],
    "taleOfTape": {
      "fighter1": {"altura": "<height>", "envergadura": "<reach>", "idade": "<age>", "academia": "<gym>"},
      "fighter2": {"altura": "<height>", "envergadura": "<reach>", "idade": "<age>", "academia": "<gym>"}
    },
    "pathsToVictory": {
      "fighter1": [{"title": "<nome da estratégia>", "description": "<explicação detalhada>"}],
      "fighter2": [{"title": "<nome da estratégia>", "description": "<explicação detalhada>"}]
    },
    "dangerZones": [
      {"round": "Round 1", "description": "<análise de perigo>"},
      {"round": "Round 2-3", "description": "<análise dos rounds finais>"}
    ],
    "reachAdvantage": {"fighter": "fighter1"|"fighter2", "inches": "<number>", "description": "<análise do impacto da vantagem de alcance>"}
  },
  "fight_prediction": {
    "predictedWinner": "fighter1"|"fighter2",
    "predictedMethod": "<método em Português ex: Decisão, Finalização, TKO>",
    "confidence": "Alta"|"Média"|"Baixa",
    "fighter1Scenarios": [
      {"method": "<Português>", "probability": "<percent>", "description": "<explicação>"}
    ],
    "fighter2Scenarios": [
      {"method": "<Português>", "probability": "<percent>", "description": "<explicação>"}
    ],
    "keyFactors": [
      {"factor": "<nome do fator>", "edge": "fighter1"|"fighter2", "impact": "<1-10>", "description": "<explicação>"}
    ],
    "xFactor": {
      "title": "<título dramático>",
      "description": "<análise detalhada do x-factor>",
      "details": "<previsão de round/timing>",
      "smartBet": "<insight de aposta>"
    }
  },
  "fighter1_info": {
    "nome": "{f1_nome}",
    "apelido": "{f1_apelido}",
    "pais": "<emoji bandeira + país>",
    "cidade": "{f1_cidade}",
    "record": "{f1_vitorias}-{f1_derrotas}-{f1_empates}",
    "ranking": "<#N divisão>",
    "sigStrikesPerMin": "<number>",
    "strikeAccuracy": "<number>",
    "strikeDefense": "<number>",
    "tdDefense": "<number>",
    "ultimasLutas": [
      {"result": "W"|"L", "opponent": "<nome>", "method": "<método>", "event": "<nome do evento>"}
    ]
  },
  "fighter2_info": {
    "nome": "{f2_nome}",
    "apelido": "{f2_apelido}",
    "pais": "<emoji bandeira + país>",
    "cidade": "{f2_cidade}",
    "record": "{f2_vitorias}-{f2_derrotas}-{f2_empates}",
    "ranking": "<#N divisão>",
    "sigStrikesPerMin": "<number>",
    "strikeAccuracy": "<number>",
    "strikeDefense": "<number>",
    "tdDefense": "<number>",
    "ultimasLutas": [
      {"result": "W"|"L", "opponent": "<nome>", "method": "<método>", "event": "<nome do evento>"}
    ]
  },
  "betting_value": {
    "moneyline": { "pick": "fighter1"|"fighter2", "fighter_name": "<nome>", "confidence": "<1-10>", "reasoning": "<explicação>" },
    "method": { "pick": "<método ex: KO/TKO, Finalização, Decisão>", "value_rating": "<1-10>", "reasoning": "<explicação>" },
    "over_under": { "pick": "over"|"under", "rounds": "<number>", "reasoning": "<explicação>" },
    "bestBet": "<recomendação de melhor aposta em uma linha>",
    "avoidBet": "<recomendação de aposta a evitar em uma linha>"
  }
}

## DADOS COMPLETOS DO UFCSTATS.COM (USE ESTES DADOS — NUNCA INVENTE)
{real_stats_block}

IMPORTANTE:
- Todas as probabilidades dos cenários fighter1 + fighter2 devem somar ~97% (deixe 3% para empate/NC)
- USE AS ESTATÍSTICAS REAIS FORNECIDAS ACIMA para sigStrikesPerMin, strikeAccuracy, strikeDefense, tdDefense, tdAvg, tdAcc, subAvg — NÃO INVENTE OU ESTIME
- NUNCA INVENTE OU ADIVINHE a nacionalidade, país ou cidade dos lutadores. USE EXATAMENTE os valores de Country fornecidos acima. NÃO assuma nacionalidade baseado no nome ou sobrenome do lutador.
- Gere pelo menos 2-3 cenários por lutador e 3-5 fatores-chave
- Gere 2-3 caminhos para vitória por lutador
- Escreva o artigo e todo texto em Português Brasileiro
- USE os dados de fight history, trending e head-to-head comparison para fundamentar sua análise
- Os valores do radar chart (radarData) são classificações subjetivas 0-100 que você gera com base nas stats reais
- Para betting_value: seja CONFIANTE nos picks, justifique com dados concretos, avalie valor real
- ARTIGO CONCISO: apenas 2-3 parágrafos (esta é uma luta do card, não o main event)

RESPONDA APENAS COM O JSON, SEM TEXTO ADICIONAL.`;

// ---------------------------------------------------------------------------
// Helper: fill prompt template with fight/event data
// ---------------------------------------------------------------------------

function fillFightPromptTemplate(
  template: string,
  event: EventData,
  fight: FightData,
  realStatsBlock: string
): string {
  const f1 = fight.lutador1;
  const f2 = fight.lutador2;

  return template
    .replace('{real_stats_block}', realStatsBlock)
    .replace('{evento_nome}', event.nome)
    .replace('{evento_data}', event.data_evento)
    .replace('{evento_local}', `${event.local_evento || ''}, ${event.cidade || ''}, ${event.pais || ''}`)
    .replace('{broadcast}', event.onde_assistir || 'UFC Fight Pass')
    .replace('{categoria_peso}', fight.categoria_peso)
    .replace('{num_rounds}', String(fight.rounds))
    .replace('{is_titulo_text}', fight.is_titulo ? '• Disputa de Título' : '')
    .replace(/{f1_nome}/g, f1.nome)
    .replace(/{f1_apelido}/g, f1.apelido || 'N/A')
    .replace('{f1_pais}', f1.pais || 'Desconhecido')
    .replace(/{f1_vitorias}/g, String(f1.vitorias))
    .replace(/{f1_derrotas}/g, String(f1.derrotas))
    .replace(/{f1_empates}/g, String(f1.empates))
    .replace('{f1_nocautes}', String(f1.nocautes))
    .replace('{f1_finalizacoes}', String(f1.finalizacoes))
    .replace('{f1_decisoes}', String(f1.decisoes))
    .replace('{f1_altura}', f1.altura || 'Desconhecido')
    .replace('{f1_envergadura}', f1.envergadura || 'Desconhecido')
    .replace('{f1_idade}', String(f1.idade || 'Desconhecido'))
    .replace('{f1_ranking}', f1.ranking_divisao ? `#${f1.ranking_divisao}` : 'Sem ranking')
    .replace('{f1_academia}', f1.academia || 'Desconhecido')
    .replace('{f1_estilo}', f1.estilo_luta || 'MMA')
    .replace(/{f1_cidade}/g, f1.cidade_natal || '')
    .replace(/{f2_nome}/g, f2.nome)
    .replace(/{f2_apelido}/g, f2.apelido || 'N/A')
    .replace('{f2_pais}', f2.pais || 'Desconhecido')
    .replace(/{f2_vitorias}/g, String(f2.vitorias))
    .replace(/{f2_derrotas}/g, String(f2.derrotas))
    .replace(/{f2_empates}/g, String(f2.empates))
    .replace('{f2_nocautes}', String(f2.nocautes))
    .replace('{f2_finalizacoes}', String(f2.finalizacoes))
    .replace('{f2_decisoes}', String(f2.decisoes))
    .replace('{f2_altura}', f2.altura || 'Desconhecido')
    .replace('{f2_envergadura}', f2.envergadura || 'Desconhecido')
    .replace('{f2_idade}', String(f2.idade || 'Desconhecido'))
    .replace('{f2_ranking}', f2.ranking_divisao ? `#${f2.ranking_divisao}` : 'Sem ranking')
    .replace('{f2_academia}', f2.academia || 'Desconhecido')
    .replace('{f2_estilo}', f2.estilo_luta || 'MMA')
    .replace(/{f2_cidade}/g, f2.cidade_natal || '');
}

// ---------------------------------------------------------------------------
// Helper: parse Claude JSON response
// ---------------------------------------------------------------------------

function parseClaudeJsonResponse(text: string): Record<string, unknown> {
  let jsonText = text.trim();
  if (jsonText.startsWith('```json')) jsonText = jsonText.slice(7);
  if (jsonText.startsWith('```')) jsonText = jsonText.slice(3);
  if (jsonText.endsWith('```')) jsonText = jsonText.slice(0, -3);
  jsonText = jsonText.trim();
  return JSON.parse(jsonText);
}

// ---------------------------------------------------------------------------
// generateFightWithBetting
// ---------------------------------------------------------------------------

export async function generateFightWithBetting(
  event: EventData,
  fight: FightData,
  isMainEvent: boolean
): Promise<Record<string, unknown>> {
  const f1 = fight.lutador1;
  const f2 = fight.lutador2;

  // Scrape ENHANCED profiles with fight-by-fight history
  const maxFights = isMainEvent ? 8 : 5;
  console.info(`[CARD-ANALYSIS] Scraping enhanced profiles for ${f1.nome} and ${f2.nome} (last ${maxFights} fights)...`);
  const [f1Profile, f2Profile] = await Promise.all([
    getEnhancedFighterProfile(f1.nome, maxFights),
    getEnhancedFighterProfile(f2.nome, maxFights),
  ]);
  console.info(`[CARD-ANALYSIS] Profiles scraped — F1: ${f1Profile ? `OK (${f1Profile.fightHistory.length} fights)` : 'NOT FOUND'}, F2: ${f2Profile ? `OK (${f2Profile.fightHistory.length} fights)` : 'NOT FOUND'}`);

  // Build the data block for the prompt
  let realStatsBlock: string;

  if (f1Profile && f2Profile) {
    // Full enhanced data packages with derived metrics and comparison
    const metrics1 = calculateDerivedMetrics(f1Profile, { academia: f1.academia, stance: null });
    const metrics2 = calculateDerivedMetrics(f2Profile, { academia: f2.academia, stance: null });
    const comparison = compareFighters(f1Profile, metrics1, f2Profile, metrics2);

    realStatsBlock = [
      formatEnhancedDataPackage('FIGHTER 1', f1Profile, metrics1),
      '',
      formatEnhancedDataPackage('FIGHTER 2', f2Profile, metrics2),
      '',
      formatHeadToHeadComparison(f1Profile, metrics1, f2Profile, metrics2, comparison),
    ].join('\n');
  } else {
    // Fallback to basic career stats if enhanced scraping fails
    console.warn(`[CARD-ANALYSIS] Falling back to basic stats for one or both fighters`);
    realStatsBlock = [
      formatRealStats(f1.nome, 'FIGHTER 1 REAL STATS', f1Profile),
      '',
      formatRealStats(f2.nome, 'FIGHTER 2 REAL STATS', f2Profile),
    ].join('\n');
  }

  const template = isMainEvent ? CARD_FIGHT_PROMPT : COMPACT_FIGHT_PROMPT;
  const prompt = fillFightPromptTemplate(template, event, fight, realStatsBlock);

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Formato de resposta inesperado do Claude');
  }

  return parseClaudeJsonResponse(content.text);
}

// ---------------------------------------------------------------------------
// generateCardOverview
// ---------------------------------------------------------------------------

interface FightAnalysisResult {
  fight_label: string;
  fighter1_name: string;
  fighter2_name: string;
  predicted_winner: string;
  predicted_method: string;
  confidence: string;
  betting_value?: {
    moneyline?: { pick: string; fighter_name: string; confidence: number; reasoning: string };
    method?: { pick: string; value_rating: number; reasoning: string };
    over_under?: { pick: string; rounds: number; reasoning: string };
    bestBet?: string;
    avoidBet?: string;
  };
}

export async function generateCardOverview(
  event: EventData,
  fightResults: FightAnalysisResult[]
): Promise<Record<string, unknown>> {
  const fightsSummary = fightResults
    .map((fr, idx) => {
      const bv = fr.betting_value;
      return `Luta ${idx + 1}: ${fr.fight_label}
  - ${fr.fighter1_name} vs ${fr.fighter2_name}
  - Vencedor previsto: ${fr.predicted_winner} via ${fr.predicted_method} (Confiança: ${fr.confidence})
  - Moneyline pick: ${bv?.moneyline?.fighter_name || 'N/A'} (confiança ${bv?.moneyline?.confidence || 'N/A'}/10)
  - Método pick: ${bv?.method?.pick || 'N/A'} (valor ${bv?.method?.value_rating || 'N/A'}/10)
  - Over/Under: ${bv?.over_under?.pick || 'N/A'} ${bv?.over_under?.rounds || ''} rounds
  - Melhor aposta: ${bv?.bestBet || 'N/A'}
  - Aposta a evitar: ${bv?.avoidBet || 'N/A'}`;
    })
    .join('\n\n');

  const prompt = `Você é um analista profissional de MMA e handicapper de apostas. Com base nas análises individuais de cada luta do card, gere uma visão geral completa do card com recomendações de apostas.

## INFORMAÇÕES DO EVENTO
Evento: ${event.nome}
Data: ${event.data_evento}
Local: ${event.local_evento || ''}, ${event.cidade || ''}, ${event.pais || ''}
Total de lutas: ${fightResults.length}

## RESULTADOS DAS ANÁLISES INDIVIDUAIS
${fightsSummary}

## GERE A SEGUINTE ESTRUTURA JSON

Retorne APENAS JSON válido com esta estrutura exata:

{
  "card_summary": "<Resumo HTML do card inteiro em 3-4 parágrafos com tags <p>. Analise o card como um todo, destaque as lutas mais importantes, tendências gerais e o que esperar da noite de lutas.>",
  "best_bets": [
    {
      "fight_label": "<label da luta>",
      "bet_type": "<tipo: moneyline, method, over_under>",
      "pick": "<o pick específico>",
      "reasoning": "<justificativa detalhada>",
      "confidence": "<1-10>",
      "value_rating": "<1-10>"
    }
  ],
  "parlay": {
    "legs": ["<leg 1 descrição>", "<leg 2 descrição>", "<leg 3 descrição>"],
    "reasoning": "<justificativa do parlay>",
    "risk_level": "low"|"medium"|"high"
  },
  "total_fights": ${fightResults.length}
}

IMPORTANTE:
- best_bets deve conter os TOP 3 picks de maior valor do card inteiro
- O parlay deve ser realista e combinar legs de confiança variada
- Escreva TUDO em Português Brasileiro
- Seja confiante e direto nas recomendações
- O card_summary deve ser envolvente e informativo para o leitor
- NUNCA INVENTE nacionalidades. Use apenas os dados fornecidos nos nomes e resultados das análises.

RESPONDA APENAS COM O JSON, SEM TEXTO ADICIONAL.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Formato de resposta inesperado do Claude');
  }

  return parseClaudeJsonResponse(content.text);
}

// ---------------------------------------------------------------------------
// withConcurrency — run async tasks with a concurrency limit
// ---------------------------------------------------------------------------

export async function withConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<(T | null)[]> {
  const results: (T | null)[] = new Array(tasks.length).fill(null);
  let nextIndex = 0;

  async function runNext(): Promise<void> {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex++;
      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (error) {
        console.error(`[withConcurrency] Tarefa ${currentIndex} falhou:`, error);
        results[currentIndex] = null;
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => runNext());
  await Promise.all(workers);

  return results;
}

// ---------------------------------------------------------------------------
// FightAnalysisItem — individual fight result with metadata
// ---------------------------------------------------------------------------

interface FightAnalysisItem {
  fight_id: string;
  fight_label: string;
  fight_type: string;
  categoria_peso: string;
  num_rounds: number;
  is_titulo: boolean;
  ordem?: number;
  fighter1_name: string;
  fighter2_name: string;
  // Flattened from Claude response
  artigo_conteudo: string;
  tactical_breakdown: Record<string, unknown>;
  fight_prediction: Record<string, unknown>;
  fighter1_info: Record<string, unknown>;
  fighter2_info: Record<string, unknown>;
  betting_value: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// generateFullCardAnalysis — orchestrates full card analysis
// ---------------------------------------------------------------------------

export async function generateFullCardAnalysis(
  event: EventData,
  fights: FightData[]
): Promise<{
  fights_analysis: FightAnalysisItem[];
  card_overview: Record<string, unknown>;
  titulo: string;
  subtitulo: string;
}> {
  // Sort: main_event first, then by ordem DESC
  const tipoOrder: Record<string, number> = { main_event: 0, co_main: 1, card_principal: 2 };
  const sortedFights = [...fights].sort((a, b) => {
    const aOrder = tipoOrder[a.tipo] ?? 3;
    const bOrder = tipoOrder[b.tipo] ?? 3;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return (b.ordem ?? 0) - (a.ordem ?? 0);
  });

  console.info(`[FULL-CARD] Gerando análise para ${sortedFights.length} lutas do ${event.nome}...`);

  // Build tasks: main_event fight gets the full prompt, others get compact
  const tasks = sortedFights.map((fight) => {
    const isMainEvent = fight.tipo === 'main_event';
    return () => generateFightWithBetting(event, fight, isMainEvent);
  });

  // Run with concurrency limit of 3
  const rawResults = await withConcurrency(tasks, 3);

  // Build FightAnalysisItem array
  const fightsAnalysis: FightAnalysisItem[] = [];
  const fightResultsForOverview: FightAnalysisResult[] = [];

  for (let i = 0; i < sortedFights.length; i++) {
    const fight = sortedFights[i];
    const result = rawResults[i];
    if (!result) {
      console.warn(`[FULL-CARD] Luta ${fight.lutador1.nome} vs ${fight.lutador2.nome} falhou, pulando...`);
      continue;
    }

    const tipoLabels: Record<string, string> = {
      main_event: 'Main Event',
      co_main: 'Co-Main Event',
      card_principal: 'Card Principal',
    };
    const fightLabel = tipoLabels[fight.tipo] || fight.tipo;

    fightsAnalysis.push({
      fight_id: fight.id,
      fight_label: fightLabel,
      fight_type: fight.tipo,
      categoria_peso: fight.categoria_peso,
      num_rounds: fight.rounds,
      is_titulo: fight.is_titulo,
      ordem: fight.ordem,
      fighter1_name: fight.lutador1.nome,
      fighter2_name: fight.lutador2.nome,
      artigo_conteudo: (result.artigo_conteudo as string) || '',
      tactical_breakdown: (result.tactical_breakdown as Record<string, unknown>) || {},
      fight_prediction: (result.fight_prediction as Record<string, unknown>) || {},
      fighter1_info: (result.fighter1_info as Record<string, unknown>) || {},
      fighter2_info: (result.fighter2_info as Record<string, unknown>) || {},
      betting_value: (result.betting_value as Record<string, unknown>) || {},
    });

    // Extract data for card overview
    const prediction = result.fight_prediction as Record<string, unknown> | undefined;
    const bettingVal = result.betting_value as Record<string, unknown> | undefined;

    fightResultsForOverview.push({
      fight_label: fightLabel,
      fighter1_name: fight.lutador1.nome,
      fighter2_name: fight.lutador2.nome,
      predicted_winner:
        (prediction?.predictedWinner as string) === 'fighter1'
          ? fight.lutador1.nome
          : fight.lutador2.nome,
      predicted_method: (prediction?.predictedMethod as string) || 'N/A',
      confidence: (prediction?.confidence as string) || 'N/A',
      betting_value: bettingVal as FightAnalysisResult['betting_value'],
    });
  }

  console.info(`[FULL-CARD] ${fightsAnalysis.length} lutas analisadas. Gerando visão geral do card...`);

  // Generate card overview
  const cardOverview = await generateCardOverview(event, fightResultsForOverview);

  // titulo and subtitulo come from the main event result (first successful fight)
  const mainEventResult = rawResults[0];
  const titulo = (mainEventResult?.titulo as string) || `Análise Completa: ${event.nome}`;
  const subtitulo =
    (mainEventResult?.subtitulo as string) ||
    `Prévia completa com análise de apostas para todas as lutas do card`;

  console.info(`[FULL-CARD] Análise completa do card finalizada.`);

  return {
    fights_analysis: fightsAnalysis,
    card_overview: cardOverview,
    titulo,
    subtitulo,
  };
}

// ===========================================================================
// FULL SINGLE ANALYSIS (14 Sections) — Premium product format
// ===========================================================================

// ---------------------------------------------------------------------------
// FIGHT ANALYST AGENT SYSTEM PROMPT — defines the AI persona
// ---------------------------------------------------------------------------
const FIGHT_ANALYST_SYSTEM = `Voce e o Fight Analyst, o melhor analista de MMA em lingua portuguesa do mundo. Voce pensa como um fa hardcore de MMA, um analista especialista e um criador de conteudo ao mesmo tempo.

Voce NAO e uma maquina de extracao de dados. Voce INTERPRETA, CONTEXTUALIZA e ENTREGA analises que fazem criadores de conteudo dizerem "nao preciso pesquisar mais nada".

## SUA PERSONALIDADE
- Voce tem opiniao. Nao fica em cima do muro. Se um lutador tem vantagem clara, diz isso com confianca.
- Voce entende as dinamicas da divisao: quem e o proximo desafiante, quem esta em declinio, quem esta subindo.
- Voce sabe o que uma vitoria ou derrota SIGNIFICA para a carreira de cada lutador, para a divisao e para o esporte.
- Voce identifica padroes que a maioria ignora: um lutador que e perigoso apos ser derrubado, outro que perde o gas mental apos sofrer um knockdown.
- Voce nao repete cliches como "ambos sao perigosos" ou "tudo pode acontecer no MMA". Voce diz EXATAMENTE por que um cenario e mais provavel que outro.
- Voce escreve como se estivesse explicando para um amigo inteligente que acompanha UFC, nao como uma enciclopedia.

## REGRAS ABSOLUTAS
1. NUNCA invente estatisticas. Use EXATAMENTE os numeros do UFCStats fornecidos. Se um dado nao existe, diga que nao existe.
2. NUNCA use travessoes (em dashes — ou en dashes –) no texto escrito. Use virgulas, pontos, dois pontos, ou reestruture a frase. Hifens em dados (records 27-8-0) sao OK.
3. Tudo em Portugues Brasileiro natural e conversacional.
4. Se uma frase poderia se aplicar a qualquer luta, delete. Tudo deve ser ESPECIFICO para ESTE confronto.
5. NUNCA invente ou adivinhe a nacionalidade, pais ou cidade dos lutadores. Use EXATAMENTE os dados fornecidos.
6. Use SEMPRE o nome real do lutador. NUNCA escreva "Lutador 1", "Lutador 2", "o primeiro", "o segundo". Use o nome ou apelido.
7. REGRA CRITICA ANTI-ALUCINACAO: Se voce nao tem CERTEZA de um fato (nome de evento, numero do UFC, data de luta), NAO inclua. E melhor ser vago do que errar. Diga "enfrentou Topuria" em vez de "enfrentou Topuria no UFC 305" se nao tiver certeza do numero.

## VOCABULARIO
PROIBIDO: contendor, contender, penas (para featherweight), leves (para lightweight), pesos-pesados.
USE EM VEZ DISSO: desafiante, categoria peso-pena, categoria peso-leve, categoria peso-pesado.
Escreva como se estivesse conversando com um amigo que acompanha UFC, nao como uma enciclopedia.

## O QUE TE DIFERENCIA DE UMA ANALISE GENERICA
- Na narrativa: voce conta a HISTORIA, nao resume o cartel. Por que essa luta existe? O que levou esses dois a se encontrarem?
- Nos intangiveis: voce identifica coisas que os numeros nao mostram. Mudanca de treinador, divorcio, pressao da torcida, padrao de comportamento apos derrota.
- Na previsao: voce explica O QUE ACONTECE DEPOIS. Se X vencer, quem e o proximo? Se Y perder, o que acontece com a carreira dele?
- No creator kit: voce escreve conteudo que o criador copia e cola direto. Nada generico.
- Nos caminhos de vitoria: voce nao so diz "KO" ou "decisao", voce descreve o CENARIO ESPECIFICO. "Oliveira puxa para guarda apos um clinch no segundo round e pega as costas, como fez contra Chandler."

## DADOS DE PESQUISA WEB
Quando receber dados de pesquisa web (secao "INTELIGENCIA DE PESQUISA WEB"), use-os como fonte PRIMARIA. Esses dados foram verificados em tempo real e sao mais confiaveis que seu conhecimento interno. Nunca contradiga fatos verificados pela pesquisa. Use os dados de pesquisa para enriquecer TODAS as secoes, especialmente narrativa, intangiveis, e detalhes do evento.`;

// ---------------------------------------------------------------------------
// FULL_ANALYSIS_PROMPT — 14-section premium analysis (user message)
// ---------------------------------------------------------------------------
const FULL_ANALYSIS_PROMPT = `Analise a luta abaixo e gere uma analise PREMIUM com 14 secoes.

## INFORMACOES DO EVENTO
Evento: {evento_nome}
Data: {evento_data}
Local: {evento_local}
Peso: {categoria_peso}
Rounds: {num_rounds}
Titulo: {titulo_luta}

## LUTADOR 1 (corner vermelho)
Nome: {f1_nome}
Apelido: {f1_apelido}
Pais: {f1_pais}
Cidade: {f1_cidade}
Record: {f1_vitorias}-{f1_derrotas}-{f1_empates}
KOs: {f1_nocautes} | Subs: {f1_finalizacoes} | Dec: {f1_decisoes}
Altura: {f1_altura} | Alcance: {f1_envergadura} | Idade: {f1_idade}
Ranking: {f1_ranking} | Academia: {f1_academia} | Estilo: {f1_estilo}

## LUTADOR 2 (corner azul)
Nome: {f2_nome}
Apelido: {f2_apelido}
Pais: {f2_pais}
Cidade: {f2_cidade}
Record: {f2_vitorias}-{f2_derrotas}-{f2_empates}
KOs: {f2_nocautes} | Subs: {f2_finalizacoes} | Dec: {f2_decisoes}
Altura: {f2_altura} | Alcance: {f2_envergadura} | Idade: {f2_idade}
Ranking: {f2_ranking} | Academia: {f2_academia} | Estilo: {f2_estilo}

{research_block}

## DADOS COMPLETOS DO UFCSTATS.COM (USE ESTES DADOS, NUNCA INVENTE)
{real_stats_block}

## INSTRUCOES ESPECIFICAS POR SECAO

### NARRATIVA (secao 2)
Nao resuma o cartel. Conte a HISTORIA da luta. Por que o UFC montou esse confronto? Qual e o arco de cada lutador? Use detalhes de lutas anteriores para construir a narrativa. Mencione nomes, eventos, metodos especificos. Se for revanche, explore o que mudou desde a primeira luta.

### MOMENTO ATUAL (secao 3)
Para cada luta recente, nao diga apenas "venceu por decisao". Diga COMO venceu e o que isso revela. "Dominou no wrestling mas nao conseguiu finalizar, mostrando que o jiu-jitsu ofensivo ainda e limitado." O quality_score e uma escala de 1-5 (1=Ruim, 2=Medio, 3=Bom, 4=Muito Bom, 5=Excelente) que reflete a qualidade do oponente na epoca da luta. Inclua tambem quality_label com o texto correspondente.

### FATORES INVISIVEIS (secao 10)
Aqui e onde voce mostra que entende MMA de verdade. Identifique: mudancas de academia, relacao com treinador, historico em lutas de 5 rounds, como reage apos sofrer knockdown, se muda o gameplan quando esta perdendo, fator altitude/viagem, pressao de contrato. Minimo 5 itens, maximo 8.

### CAMINHOS DE VITORIA (secao 11)
Descreva CENARIOS ESPECIFICOS, nao categorias genericas. Nao escreva "Vence por KO". Escreva "Pressiona contra a grade nos rounds iniciais, encurta a distancia com jabs ao corpo, e encontra o overhand direito quando o oponente sai da grade. Similar ao que fez contra [Nome]."
REGRA MATEMATICA: A soma de TODOS os cenarios de fighter1 + fighter2 + draw DEVE somar ~100%. Os cenarios de cada lutador devem somar o total_probability daquele lutador. Ex: fighter1 total=55%, seus cenarios somam 55%. fighter2 total=42%, cenarios somam 42%. draw=3%.

### PREVISAO FINAL (secao 12)
Alem da previsao, responda: O que essa vitoria significa para o vencedor? Quem seria o proximo adversario? E para o perdedor, qual e o caminho de volta? O X-Factor deve ser algo especifico que pode virar a luta, nao algo generico como "quem conectar primeiro".
CONFIANCA: Use "ALTA" APENAS se o favorito tem >65% de chance. TKO em round especifico NUNCA e alta confianca. Seja realista.
VALUE PICKS: Inclua value_picks com moneyline, method, over_under, e best_value. Justifique cada pick com dados concretos.

### O QUE OBSERVAR (secao 13)
5 pontos que um comentarista inteligente mencionaria durante a transmissao. Coisas como "observe se Holloway muda o stance para southpaw no terceiro round, algo que ele fez nas ultimas 3 lutas quando sente que esta atras nos cartoes." Especifico, observavel, util.

### CREATOR KIT (secao 14)
Instagram: slides que o criador copia e posta. Com gancho, dados, opiniao forte.
Twitter: thread que gera engajamento. Primeiro tweet e o gancho controverso. Ultimo e a previsao com emoji de fogo.
Video: script de 60 segundos com hook nos primeiros 3 segundos. Nao comece com "Fala galera". Comece com dado chocante ou pergunta provocativa.
TikTok: 3 scripts de 15-30 segundos com hook que prende nos primeiros 2 segundos. Cada script tem hook, body, e cta.
Headlines: 5-6 titulos prontos para thumbnail de video, capa de carousel, titulo de artigo. Curtos, impactantes, com opiniao.

## FORMATO JSON (14 secoes)

Retorne APENAS JSON valido. As secoes 6 (comparacao estatistica) e 8 (distribuicao de vitorias) serao pre-computadas com dados reais e mescladas separadamente. Gere as demais:

{
  "hero": {
    "tagline": "<frase epica de 3-8 palavras que captura a ESSENCIA da luta, nao um resumo generico>",
    "tagline_sub": "<complemento de 1 linha que adiciona contexto>"
  },
  "narrativa": {
    "html_content": "<HTML rico (4-6 paragrafos com h3 e p tags). Conte a historia REAL por tras desta luta. Use class='font-display text-xl uppercase text-ufc-red mb-4' nos h3 e class='font-display text-xl uppercase text-ufc-red mb-4 mt-8' nos h3 subsequentes. Referencie lutas anteriores com nomes, eventos, metodos e rounds especificos. Explique POR QUE esta luta importa para a divisao.>",
    "stakes": [
      {"dimensao": "Objetivo", "fighter1": "<objetivo concreto, nao generico>", "fighter2": "<objetivo concreto>"},
      {"dimensao": "Narrativa", "fighter1": "<qual historia esta contando>", "fighter2": "<qual historia esta contando>"},
      {"dimensao": "Risco", "fighter1": "<o que perde se perder>", "fighter2": "<o que perde se perder>"},
      {"dimensao": "Recompensa", "fighter1": "<o que ganha se vencer>", "fighter2": "<o que ganha se vencer>"}
    ]
  },
  "momento_atual": {
    "fighter1": {
      "nome": "{f1_nome}",
      "color": "red",
      "recent_fights": [
        {"date": "<Mes Ano>", "opponent": "<nome>", "result": "W"|"L", "method": "<metodo curto>", "opponent_rank": "<rank na epoca>", "quality_score": <1-5>, "quality_label": "<Ruim|Medio|Bom|Muito Bom|Excelente>", "note": "<observacao que REVELA algo sobre o lutador, nao so o resultado>"}
      ],
      "layoff_warning": "<aviso de inatividade se >12 meses, null se nao>",
      "momentum_score": <0-10 com 1 decimal>,
      "momentum_label": "<label tipo Ascendente, Resiliente, Em Queda, Irregular>",
      "momentum_trend": "ascending"|"descending"|"stable"|"resilient",
      "momentum_note": "<explicacao de 1-2 linhas com OPINIAO sobre o que o momentum indica para esta luta>"
    },
    "fighter2": {
      "nome": "{f2_nome}",
      "color": "blue",
      "recent_fights": [<mesma estrutura, ate 5 lutas dos dados fornecidos>],
      "layoff_warning": null,
      "momentum_score": <0-10>,
      "momentum_label": "<label>",
      "momentum_trend": "ascending"|"descending"|"stable"|"resilient",
      "momentum_note": "<explicacao com opiniao>"
    }
  },
  "nivel_competicao": {
    "fighter1": {"nome": "{f1_nome}", "media_oponentes": <1-5>, "media_oponentes_label": "<Ruim|Medio|Bom|Muito Bom|Excelente>", "aproveitamento": "<ex: 4W-1L (80%)>", "contra_top5": "<ex: 2W-1L>"},
    "fighter2": {"nome": "{f2_nome}", "media_oponentes": <1-5>, "media_oponentes_label": "<Ruim|Medio|Bom|Muito Bom|Excelente>", "aproveitamento": "<ex: 3W-2L (60%)>", "contra_top5": "<ex: 0W-2L>"},
    "oponentes_em_comum_count": {"fighter1": <num vitorias>, "fighter2": <num vitorias>},
    "oponentes_em_comum_note": "<analise comparativa: nao so quem lidera, mas o que as diferencas de performance revelam>"
  },
  "oponente_comum": {
    "oponente_nome": "<nome do oponente em comum mais relevante, ou null se nao houver>",
    "fighter1_result": {"resultado": "<ex: Vitoria>", "metodo": "<KO R3>", "duracao": "<2 rounds + 1:34>", "contexto": "<contexto da luta na epoca>", "performance": "<analise da performance, nao resumo>", "evento": "<nome evento>", "data": "<Mes Ano>"},
    "fighter2_result": {"resultado": "<ex: Derrota>", "metodo": "<Dec UD>", "duracao": "<5 rounds>", "contexto": "<contexto>", "performance": "<analise>", "evento": "<nome evento>", "data": "<Mes Ano>"},
    "insight": "<insight comparativo de 2-3 linhas. Nao basta listar. Explique POR QUE a comparacao e relevante. Ex: MMA Math nao funciona, mas esta comparacao revela tendencias de estilo: enquanto X venceu usando grappling, Y perdeu justamente no grappling, sugerindo que... Se a comparacao nao revelar nada util, retorne oponente_comum: null>"
  },
  "perfil_habilidades": {
    "skills": [
      {"label": "Striking", "valueA": <0-100>, "valueB": <0-100>, "advantage": "fighter1"|"fighter2"|"even", "advantage_note": "<1 linha explicando POR QUE esse lutador tem vantagem nessa area>"},
      {"label": "Volume", "valueA": <0-100>, "valueB": <0-100>, "advantage": "fighter1"|"fighter2"|"even", "advantage_note": "<1 linha>"},
      {"label": "Grappling", "valueA": <0-100>, "valueB": <0-100>, "advantage": "fighter1"|"fighter2"|"even", "advantage_note": "<1 linha>"},
      {"label": "Cardio", "valueA": <0-100>, "valueB": <0-100>, "advantage": "fighter1"|"fighter2"|"even", "advantage_note": "<1 linha>"},
      {"label": "Defense", "valueA": <0-100>, "valueB": <0-100>, "advantage": "fighter1"|"fighter2"|"even", "advantage_note": "<1 linha>"},
      {"label": "Finishing", "valueA": <0-100>, "valueB": <0-100>, "advantage": "fighter1"|"fighter2"|"even", "advantage_note": "<1 linha>"}
    ]
  },
  "danger_zones": {
    "zones": [
      {"rounds": "R1-R2", "danger_level": <1-10>, "danger_label": "<PERIGO 9/10>", "color": "red"|"gold"|"green", "title": "<titulo especifico para esta luta>", "description": "<2-3 linhas explicando POR QUE esses rounds sao perigosos/seguros, com referencias a lutas anteriores>"},
      {"rounds": "R3", "danger_level": <1-10>, "danger_label": "<PIVO 7/10>", "color": "gold", "title": "<titulo>", "description": "<2-3 linhas>"},
      {"rounds": "R4-R5", "danger_level": <1-10>, "danger_label": "<label>", "color": "red"|"gold"|"green", "title": "<titulo>", "description": "<2-3 linhas>"}
    ]
  },
  "intangiveis": {
    "items": [
      {"icon": "<AlertTriangle|Clock|TrendingUp|Zap|Brain|MapPin|Shield|Target|Eye|Activity|Heart|Flame|Star|Award|Users>", "title": "<titulo curto e especifico>", "fighter": "<nome lutador ou 'Ambos'>", "risk_level": "<RISCO ALTO|RISCO MEDIO|RISCO BAIXO|POSITIVO|ENORME POSITIVO|NEUTRO>", "risk_color": "red"|"yellow"|"green"|"neutral", "description": "<2-3 linhas com INFORMACAO REAL, nao especulacao vazia>"}
    ]
  },
  "caminhos_vitoria": {
    "fighter1": {
      "nome": "{f1_nome}",
      "total_probability": <soma dos cenarios>,
      "scenarios": [
        {"name": "<nome epico do cenario ESPECIFICO>", "probability": <percent>, "method": "<metodo ex: TKO R4-5 ou UD>", "description": "<2-3 linhas descrevendo COMO acontece passo a passo, referenciando lutas anteriores como evidencia>"}
      ]
    },
    "fighter2": {
      "nome": "{f2_nome}",
      "total_probability": <soma>,
      "scenarios": [<mesma estrutura, 3-4 cenarios>]
    }
  },
  "previsao_final": {
    "winner_name": "<nome completo do vencedor previsto>",
    "winner_side": "fighter1"|"fighter2",
    "predicted_method": "<metodo previsto>",
    "confidence_score": <1-10>,
    "confidence_label": "<BAIXA|MEDIA|MEDIA-ALTA|ALTA|MUITO ALTA>",
    "explanation": "<4-6 linhas explicando a previsao com dados concretos E o que esta vitoria/derrota significa para a carreira de cada um e para a divisao>",
    "x_factor": {"title": "<titulo especifico>", "description": "<algo concreto que pode virar a luta, nao generico>"},
    "upset_alert": {"title": "<titulo>", "description": "<cenario especifico de como o underdog vence>"},
    "probabilities": {
      "fighter1": {"nome": "{f1_nome}", "percent": <0-100>},
      "fighter2": {"nome": "{f2_nome}", "percent": <0-100>},
      "draw": <0-5>
    },
    "value_picks": {
      "moneyline": {"pick": "<nome do lutador>", "reasoning": "<justificativa com dados>"},
      "method": {"pick": "<metodo especifico ex: KO/TKO, Finalizacao, Decisao>", "reasoning": "<justificativa>"},
      "over_under": {"pick": "<Over ou Under>", "rounds": <numero>, "reasoning": "<justificativa baseada em historico>"},
      "best_value": "<melhor aposta de valor em 1-2 linhas com justificativa concreta>"
    }
  },
  "o_que_observar": {
    "points": [
      {"num": 1, "title": "<titulo>", "icon": "<nome icone Lucide>", "description": "<2-3 linhas com algo ESPECIFICO e OBSERVAVEL durante a luta>"},
      {"num": 2, "title": "<titulo>", "icon": "<nome icone Lucide>", "description": "<2-3 linhas>"},
      {"num": 3, "title": "<titulo>", "icon": "<nome icone Lucide>", "description": "<2-3 linhas>"},
      {"num": 4, "title": "<titulo>", "icon": "<nome icone Lucide>", "description": "<2-3 linhas>"},
      {"num": 5, "title": "<titulo>", "icon": "<nome icone Lucide>", "description": "<2-3 linhas>"}
    ]
  },
  "creator_kit": {
    "instagram": [
      {"slide_number": 1, "title": "<titulo slide com gancho>", "content": "<conteudo PRONTO para postar, com dado impactante>", "color": "red"},
      {"slide_number": 2, "title": "<titulo>", "content": "<conteudo com analise comparativa>", "color": "blue"},
      {"slide_number": 3, "title": "<titulo>", "content": "<previsao com opiniao forte>", "color": "gold"}
    ],
    "twitter": [
      {"num": "1/6", "text": "<tweet gancho controverso ou dado surpreendente>"},
      {"num": "2/6", "text": "<tweet com stats comparativos>"},
      {"num": "3/6", "text": "<tweet sobre o caminho de vitoria de F1>"},
      {"num": "4/6", "text": "<tweet sobre o caminho de vitoria de F2>"},
      {"num": "5/6", "text": "<tweet red flag ou intangivel que ninguem esta falando>"},
      {"num": "6/6", "text": "<tweet previsao final com confianca>"}
    ],
    "video": [
      {"time": "0-10s", "title": "Hook", "text": "<comece com dado chocante ou pergunta provocativa, NUNCA com 'fala galera'>"},
      {"time": "10-25s", "title": "Os Numeros", "text": "<2-3 stats que contam uma historia>"},
      {"time": "25-40s", "title": "A Dinamica", "text": "<o que torna esta luta unica>"},
      {"time": "40-50s", "title": "Red Flags", "text": "<o que pode dar errado para cada um>"},
      {"time": "50-60s", "title": "Previsao + CTA", "text": "<previsao confiante + call to action>"}
    ],
    "tiktok": [
      {"hook": "<frase que prende em 2 segundos, dado chocante ou pergunta>", "body": "<conteudo principal 10-20 segundos>", "cta": "<call to action final>"},
      {"hook": "<gancho diferente>", "body": "<conteudo>", "cta": "<cta>"},
      {"hook": "<gancho diferente>", "body": "<conteudo>", "cta": "<cta>"}
    ],
    "headlines": [
      "<titulo impactante para thumbnail 1>",
      "<titulo para capa de carousel 2>",
      "<titulo para artigo 3>",
      "<titulo provocativo 4>",
      "<titulo com dado surpreendente 5>"
    ]
  },
  "betting_value": {
    "moneyline": {"pick": "fighter1"|"fighter2", "fighter_name": "<nome>", "confidence": <1-10>, "reasoning": "<justificativa com dados>"},
    "method": {"pick": "<metodo especifico>", "value_rating": <1-10>, "reasoning": "<justificativa>"},
    "over_under": {"pick": "over"|"under", "rounds": <numero>, "reasoning": "<justificativa baseada em historico>"},
    "bestBet": "<melhor aposta em 1 linha com justificativa>",
    "avoidBet": "<aposta a evitar em 1 linha com justificativa>"
  },
  "distribuicao_vitorias_insight": "<insight de 2-3 linhas sobre a distribuicao de vitorias comparada, tirando uma CONCLUSAO sobre o que isso significa para esta luta>"
}

LEMBRETES FINAIS:
- Probabilidades fighter1 + fighter2 + draw devem somar ~100%.
- Em caminhos_vitoria, os cenarios de cada lutador devem somar o total_probability daquele lutador.
- quality_score e media_oponentes usam escala 1-5 com label obrigatorio.
- perfil_habilidades NAO tem fighter1_total/fighter2_total. Cada skill tem advantage e advantage_note.
- previsao_final inclui value_picks com moneyline, method, over_under, best_value.
- creator_kit inclui tiktok (3 scripts) e headlines (5 titulos).
- Gere ate 5 lutas recentes por lutador no momento_atual (use os dados de fight history fornecidos).
- Gere 5-8 itens em intangiveis (nenhum generico).
- Gere 3-4 cenarios por lutador em caminhos_vitoria.
- Se nao houver oponente em comum relevante nos dados, retorne "oponente_comum": null.
- Cada secao deve funcionar SOZINHA. Um criador de conteudo deve poder usar qualquer secao isoladamente.
- NUNCA use "Lutador 1" ou "Lutador 2" no texto. Use o nome real SEMPRE.

RESPONDA APENAS COM O JSON, SEM TEXTO ADICIONAL.`;

// ---------------------------------------------------------------------------
// generateFullAnalysis — Premium 14-section single fight analysis
// ---------------------------------------------------------------------------

export async function generateFullAnalysis(
  event: EventData,
  fight: FightData
): Promise<FullAnalysisData> {
  const f1 = fight.lutador1;
  const f2 = fight.lutador2;

  console.info(`[FULL-ANALYSIS] Starting premium analysis: ${f1.nome} vs ${f2.nome}`);

  // 1. Scrape enhanced profiles + web research (parallel)
  console.info(`[FULL-ANALYSIS] Scraping enhanced profiles + web research...`);
  const [f1Profile, f2Profile, f1Images, f2Images, researchBriefing] = await Promise.all([
    getEnhancedFighterProfile(f1.nome, 10),
    getEnhancedFighterProfile(f2.nome, 10),
    getFighterImageUrls((f1 as FighterData & { ufc_slug?: string }).ufc_slug || buildUfcSlug(f1.nome)),
    getFighterImageUrls((f2 as FighterData & { ufc_slug?: string }).ufc_slug || buildUfcSlug(f2.nome)),
    conductFightResearch(f1.nome, f2.nome, event.nome, event.data_evento, fight.categoria_peso, fight.is_titulo),
  ]);

  if (researchBriefing) {
    console.info(`[FULL-ANALYSIS] Web research: ${researchBriefing.sources_count} sources, ${researchBriefing.key_facts?.length || 0} key facts`);
  } else {
    console.warn(`[FULL-ANALYSIS] Web research unavailable, proceeding with UFCStats only`);
  }

  if (!f1Profile || !f2Profile) {
    throw new Error(`Could not scrape enhanced profiles for ${!f1Profile ? f1.nome : f2.nome}`);
  }

  console.info(`[FULL-ANALYSIS] Profiles: F1 ${f1Profile.fightHistory.length} fights, F2 ${f2Profile.fightHistory.length} fights`);

  // 2. Compute derived metrics
  const metrics1 = calculateDerivedMetrics(f1Profile, { academia: f1.academia, stance: null });
  const metrics2 = calculateDerivedMetrics(f2Profile, { academia: f2.academia, stance: null });
  const comparison = compareFighters(f1Profile, metrics1, f2Profile, metrics2);

  // 3. Pre-compute data sections
  const precomputedStats = computeStatComparison(f1Profile, f2Profile);
  const precomputedWins = computeWinDistribution(f1, f2);
  const precomputedCommon = computeCommonOpponent(comparison, f1.nome, f2.nome);

  // Add tale of tape enrichment from DB data
  precomputedStats.tale_of_tape.push(
    { label: 'Idade', fighter1: f1.idade ? `${f1.idade} anos` : 'N/A', fighter2: f2.idade ? `${f2.idade} anos` : 'N/A' },
    { label: 'Gym', fighter1: f1.academia || 'N/A', fighter2: f2.academia || 'N/A' },
  );

  // 4. Build enhanced stats block for prompt
  const realStatsBlock = [
    formatEnhancedDataPackage('FIGHTER 1', f1Profile, metrics1),
    '',
    formatEnhancedDataPackage('FIGHTER 2', f2Profile, metrics2),
    '',
    formatHeadToHeadComparison(f1Profile, metrics1, f2Profile, metrics2, comparison),
  ].join('\n');

  // 5. Build research block and call Claude with full analysis prompt
  const researchBlock = formatResearchBriefing(researchBriefing, f1.nome, f2.nome);
  const corrections = extractEventCorrections(researchBriefing);

  // Override fight data with corrections from web research before building prompt
  const correctedFight = {
    ...fight,
    rounds: corrections.num_rounds || fight.rounds,
    is_titulo: corrections.titulo_em_jogo ? true : fight.is_titulo,
  };

  const tituloText = corrections.titulo_em_jogo || (fight.is_titulo ? 'Disputa de Titulo' : 'Sem titulo em jogo');

  const prompt = fillFightPromptTemplate(FULL_ANALYSIS_PROMPT, event, correctedFight, realStatsBlock)
    .replace('{titulo_luta}', tituloText)
    .replace('{research_block}', researchBlock);

  console.info(`[FULL-ANALYSIS] Calling Claude (Sonnet 4.6 + Fight Analyst persona) for 14-section analysis...`);

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16384,
    temperature: 0.4,
    system: FIGHT_ANALYST_SYSTEM,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response format from Claude');
  }

  const aiResult = parseClaudeJsonResponse(content.text) as Record<string, unknown>;
  console.info(`[FULL-ANALYSIS] Claude response parsed. Merging pre-computed data...`);

  // 6. Merge pre-computed data + AI output into FullAnalysisData
  const f1Sobrenome = f1.nome.split(' ').pop() || f1.nome;
  const f2Sobrenome = f2.nome.split(' ').pop() || f2.nome;

  const heroAI = aiResult.hero as Record<string, unknown> || {};
  const narrativaAI = aiResult.narrativa as Record<string, unknown> || {};
  const momentoAI = aiResult.momento_atual as Record<string, unknown> || {};
  const nivelAI = aiResult.nivel_competicao as Record<string, unknown> || {};
  const oponenteAI = aiResult.oponente_comum as Record<string, unknown> | null;
  const habilidadesAI = aiResult.perfil_habilidades as Record<string, unknown> || {};
  const dangerAI = aiResult.danger_zones as Record<string, unknown> || {};
  const intangiveisAI = aiResult.intangiveis as Record<string, unknown> || {};
  const caminhosAI = aiResult.caminhos_vitoria as Record<string, unknown> || {};
  const previsaoAI = aiResult.previsao_final as Record<string, unknown> || {};
  const observarAI = aiResult.o_que_observar as Record<string, unknown> || {};
  const creatorAI = aiResult.creator_kit as Record<string, unknown> || {};
  const bettingAI = aiResult.betting_value as Record<string, unknown> | undefined;

  const eventoData = new Date(event.data_evento);
  const eventoDataStr = eventoData.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  // 6b. Apply event corrections from web research (fix DB errors like wrong rounds/title)
  const eventCorrections = extractEventCorrections(researchBriefing);

  const fullAnalysis: FullAnalysisData = {
    hero: {
      evento_nome: event.nome,
      evento_data: eventoDataStr,
      evento_local: [event.local_evento, event.cidade, event.pais].filter(Boolean).join(', '),
      categoria_peso: fight.categoria_peso,
      num_rounds: eventCorrections.num_rounds || fight.rounds,
      titulo_em_jogo: eventCorrections.titulo_em_jogo || (fight.is_titulo ? 'Disputa de Titulo' : null),
      tagline: (heroAI.tagline as string) || '',
      tagline_sub: (heroAI.tagline_sub as string) || '',
      fighter1: {
        nome_completo: f1.nome,
        apelido: f1.apelido || '',
        sobrenome: f1Sobrenome,
        record: `${f1.vitorias}-${f1.derrotas}-${f1.empates}`,
        ranking: f1.ranking_divisao ? `#${f1.ranking_divisao} ${fight.categoria_peso}` : fight.categoria_peso,
        info_extra: [f1.cidade_natal, f1.idade ? `${f1.idade} anos` : null].filter(Boolean).join(' | '),
        imagem_fullbody_url: f1Images.fullBodyUrl || (f1 as FighterData & { imagem_fullbody_url?: string }).imagem_fullbody_url || null,
      },
      fighter2: {
        nome_completo: f2.nome,
        apelido: f2.apelido || '',
        sobrenome: f2Sobrenome,
        record: `${f2.vitorias}-${f2.derrotas}-${f2.empates}`,
        ranking: f2.ranking_divisao ? `#${f2.ranking_divisao} ${fight.categoria_peso}` : fight.categoria_peso,
        info_extra: [f2.cidade_natal, f2.idade ? `${f2.idade} anos` : null].filter(Boolean).join(' | '),
        imagem_fullbody_url: f2Images.fullBodyUrl || (f2 as FighterData & { imagem_fullbody_url?: string }).imagem_fullbody_url || null,
      },
    },
    narrativa: narrativaAI as unknown as FullAnalysisData['narrativa'],
    momento_atual: momentoAI as unknown as FullAnalysisData['momento_atual'],
    nivel_competicao: nivelAI as unknown as FullAnalysisData['nivel_competicao'],
    oponente_comum: oponenteAI ? (oponenteAI as unknown as FullAnalysisData['oponente_comum']) : (precomputedCommon || null),
    comparacao_estatistica: precomputedStats,
    perfil_habilidades: habilidadesAI as unknown as FullAnalysisData['perfil_habilidades'],
    distribuicao_vitorias: {
      ...precomputedWins,
      insight: (aiResult.distribuicao_vitorias_insight as string) || precomputedWins.insight,
    },
    danger_zones: dangerAI as unknown as FullAnalysisData['danger_zones'],
    intangiveis: intangiveisAI as unknown as FullAnalysisData['intangiveis'],
    caminhos_vitoria: caminhosAI as unknown as FullAnalysisData['caminhos_vitoria'],
    previsao_final: previsaoAI as unknown as FullAnalysisData['previsao_final'],
    o_que_observar: observarAI as unknown as FullAnalysisData['o_que_observar'],
    creator_kit: creatorAI as unknown as FullAnalysisData['creator_kit'],
    betting_value: bettingAI ? (bettingAI as unknown as FullAnalysisData['betting_value']) : null,
  };

  console.info(`[FULL-ANALYSIS] Premium analysis complete: ${f1.nome} vs ${f2.nome}`);
  return fullAnalysis;
}
