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

## ESTATÍSTICAS REAIS DO UFCSTATS.COM (USE ESTES NÚMEROS EXATOS)
{real_stats_block}

IMPORTANTE:
- Todas as probabilidades dos cenários fighter1 + fighter2 devem somar ~97% (deixe 3% para empate/NC)
- USE AS ESTATÍSTICAS REAIS FORNECIDAS ACIMA para sigStrikesPerMin, strikeAccuracy, strikeDefense, tdDefense, tdAvg, tdAcc, subAvg — NÃO INVENTE OU ESTIME
- NUNCA INVENTE OU ADIVINHE a nacionalidade, país ou cidade dos lutadores. USE EXATAMENTE os valores de Country fornecidos acima. NÃO assuma nacionalidade baseado no nome ou sobrenome do lutador.
- Gere pelo menos 3-4 cenários por lutador e 5-7 fatores-chave
- Gere 3-4 caminhos para vitória por lutador
- Escreva o artigo e todo texto em Português Brasileiro
- Faça a análise perspicaz e baseada em dados
- Os valores do radar chart (radarData) são classificações subjetivas 0-100 que você gera com base nas stats reais
- Para betting_value: seja CONFIANTE nos picks, justifique com dados, avalie valor real

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

## ESTATÍSTICAS REAIS DO UFCSTATS.COM (USE ESTES NÚMEROS EXATOS)
{real_stats_block}

IMPORTANTE:
- Todas as probabilidades dos cenários fighter1 + fighter2 devem somar ~97% (deixe 3% para empate/NC)
- USE AS ESTATÍSTICAS REAIS FORNECIDAS ACIMA para sigStrikesPerMin, strikeAccuracy, strikeDefense, tdDefense, tdAvg, tdAcc, subAvg — NÃO INVENTE OU ESTIME
- NUNCA INVENTE OU ADIVINHE a nacionalidade, país ou cidade dos lutadores. USE EXATAMENTE os valores de Country fornecidos acima. NÃO assuma nacionalidade baseado no nome ou sobrenome do lutador.
- Gere pelo menos 2-3 cenários por lutador e 3-5 fatores-chave
- Gere 2-3 caminhos para vitória por lutador
- Escreva o artigo e todo texto em Português Brasileiro
- Faça a análise perspicaz e baseada em dados
- Os valores do radar chart (radarData) são classificações subjetivas 0-100 que você gera com base nas stats reais
- Para betting_value: seja CONFIANTE nos picks, justifique com dados, avalie valor real
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

  // Scrape real stats from ufcstats.com
  console.log(`[CARD-ANALYSIS] Scraping stats for ${f1.nome} and ${f2.nome}...`);
  const [f1Stats, f2Stats] = await Promise.all([
    getFighterStatsByName(f1.nome),
    getFighterStatsByName(f2.nome),
  ]);
  console.log(`[CARD-ANALYSIS] Stats scraped — F1: ${f1Stats ? 'OK' : 'NOT FOUND'}, F2: ${f2Stats ? 'OK' : 'NOT FOUND'}`);

  const realStatsBlock = [
    formatRealStats(f1.nome, 'FIGHTER 1 REAL STATS', f1Stats),
    '',
    formatRealStats(f2.nome, 'FIGHTER 2 REAL STATS', f2Stats),
  ].join('\n');

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

  console.log(`[FULL-CARD] Gerando análise para ${sortedFights.length} lutas do ${event.nome}...`);

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

  console.log(`[FULL-CARD] ${fightsAnalysis.length} lutas analisadas. Gerando visão geral do card...`);

  // Generate card overview
  const cardOverview = await generateCardOverview(event, fightResultsForOverview);

  // titulo and subtitulo come from the main event result (first successful fight)
  const mainEventResult = rawResults[0];
  const titulo = (mainEventResult?.titulo as string) || `Análise Completa: ${event.nome}`;
  const subtitulo =
    (mainEventResult?.subtitulo as string) ||
    `Prévia completa com análise de apostas para todas as lutas do card`;

  console.log(`[FULL-CARD] Análise completa do card finalizada.`);

  return {
    fights_analysis: fightsAnalysis,
    card_overview: cardOverview,
    titulo,
    subtitulo,
  };
}
