import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FighterIntel {
  recent_narrative: string;
  training_camp: string;
  injuries_layoff: string;
  mental_state: string;
  momentum: string;
  red_flags: string[];
  positive_signals: string[];
}

export interface ResearchBriefing {
  fight_context: string;
  division_landscape: string;
  fighter1_intel: FighterIntel;
  fighter2_intel: FighterIntel;
  common_opponents: string;
  stylistic_narrative: string;
  event_details: string;
  sources_count: number;
  key_facts: string[];
}

export interface EventCorrections {
  num_rounds: number | null;
  titulo_em_jogo: string | null;
}

// ---------------------------------------------------------------------------
// Helper: extract JSON object from text that may contain prose around it
// ---------------------------------------------------------------------------

function extractJsonFromText<T>(text: string): T | null {
  // Try 1: direct parse (entire text is JSON)
  try {
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
    if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
    cleaned = cleaned.trim();
    return JSON.parse(cleaned) as T;
  } catch {
    // continue to next strategy
  }

  // Try 2: find the first { ... } JSON object in the text
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1)) as T;
    } catch {
      // continue
    }
  }

  // Try 3: find JSON inside ```json ... ``` code block
  const codeBlockMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim()) as T;
    } catch {
      // continue
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Research system prompt
// ---------------------------------------------------------------------------

const RESEARCH_SYSTEM = `Voce e um pesquisador especialista em MMA/UFC. Sua funcao e pesquisar informacoes REAIS e ATUALIZADAS sobre uma luta do UFC usando web search.

Voce deve pesquisar em ondas:
1. Contexto geral da luta (previa, importancia, titulo em jogo, BMF, etc)
2. Forma recente de cada lutador (ultimas 3-5 lutas, COMO venceu/perdeu, nao so o resultado)
3. Intangiveis (campo de treinamento, lesoes, declaracoes, mudancas de academia, motivacao)
4. Detalhes do evento (local, transmissao, titulo em jogo, numero de rounds)

REGRAS:
- Pesquise em ingles E portugues para maximizar cobertura
- Priorize fontes confiaveis: MMAFighting, MMAJunkie, Sherdog, ESPN MMA, UFC.com, Combate/Globo
- Foque em informacoes dos ultimos 6 meses
- Se uma informacao nao for encontrada, diga explicitamente que nao encontrou
- NUNCA invente ou adivinhe informacoes. Somente reporte o que encontrou nas buscas.

Ao final, compile TUDO em um JSON com a estrutura ResearchBriefing.`;

// ---------------------------------------------------------------------------
// conductFightResearch
// ---------------------------------------------------------------------------

export async function conductFightResearch(
  fighter1Name: string,
  fighter2Name: string,
  eventName: string,
  eventDate: string,
  categoryWeight: string,
  isTitleFight: boolean
): Promise<ResearchBriefing | null> {
  const titleContext = isTitleFight ? 'DISPUTA DE TITULO' : '';

  const userPrompt = `Pesquise informacoes REAIS sobre esta luta do UFC:

LUTA: ${fighter1Name} vs ${fighter2Name}
EVENTO: ${eventName}
DATA: ${eventDate}
CATEGORIA: ${categoryWeight}
${titleContext ? `TITULO: ${titleContext}` : ''}

Faca pesquisas em ondas:

ONDA 1 - CONTEXTO DA LUTA:
- Pesquise "${fighter1Name} vs ${fighter2Name}" para entender a previa
- Descubra: quantos rounds, se e titulo/BMF, importancia para a divisao
- Verifique se e revanche e o historico entre eles

ONDA 2 - FORMA RECENTE:
- Pesquise as ultimas 3-5 lutas de ${fighter1Name}: contra quem, como venceu/perdeu, detalhes da performance
- Pesquise as ultimas 3-5 lutas de ${fighter2Name}: mesma coisa
- Busque sequencias de vitorias/derrotas atuais

ONDA 3 - INTANGIVEIS:
- Pesquise ${fighter1Name}: mudancas de academia, lesoes recentes, declaracoes pre-luta, camp
- Pesquise ${fighter2Name}: mesma coisa
- Busque informacoes sobre motivacao, pressao, contrato

ONDA 4 - DETALHES DO EVENTO:
- Confirme local, cidade, arena do ${eventName}
- Verifique o card completo se possivel
- Confirme se e main event, co-main, etc

Apos todas as pesquisas, compile os resultados em JSON com esta estrutura EXATA:

{
  "fight_context": "Por que esta luta existe, significado para a divisao, se e revanche, contexto historico",
  "division_landscape": "Estado atual da divisao: quem e campeao, ranking, quem mais esta na disputa",
  "fighter1_intel": {
    "recent_narrative": "Como foram as ultimas lutas com DETALHES (nao so resultado, mas como venceu/perdeu)",
    "training_camp": "Informacoes sobre academia, treinador, mudancas recentes",
    "injuries_layoff": "Lesoes recentes, tempo de inatividade, cirurgias",
    "mental_state": "Declaracoes, motivacao, pressao, confianca",
    "momentum": "Sequencia atual, como esta chegando para esta luta",
    "red_flags": ["lista de preocupacoes reais encontradas na pesquisa"],
    "positive_signals": ["lista de sinais positivos encontrados"]
  },
  "fighter2_intel": {
    "recent_narrative": "...",
    "training_camp": "...",
    "injuries_layoff": "...",
    "mental_state": "...",
    "momentum": "...",
    "red_flags": ["..."],
    "positive_signals": ["..."]
  },
  "common_opponents": "Analise de oponentes em comum, se houver. Quem se saiu melhor contra os mesmos adversarios?",
  "stylistic_narrative": "Choque de estilos REAL baseado no que a pesquisa revelou, nao generico",
  "event_details": "Local confirmado, arena, transmissao, titulo em jogo, numero de rounds confirmado",
  "sources_count": 0,
  "key_facts": [
    "Fato verificado 1 encontrado na pesquisa",
    "Fato verificado 2",
    "..."
  ]
}

IMPORTANTE: Retorne APENAS o JSON ao final. Conte quantas fontes distintas voce consultou em sources_count.`;

  try {
    console.log(`[WEB-RESEARCH] Starting web research for ${fighter1Name} vs ${fighter2Name}...`);
    const startTime = Date.now();

    // Use web_search server-side tool - Claude executes searches on Anthropic's infra
    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: userPrompt },
    ];

    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: RESEARCH_SYSTEM,
      tools: [
        {
          type: 'web_search_20250305' as const,
          name: 'web_search',
          max_uses: 15,
        },
      ],
      messages,
    });

    // Handle pause_turn: server-side tool loop may need continuation
    while (response.stop_reason === 'pause_turn') {
      console.log(`[WEB-RESEARCH] Server paused, continuing...`);
      messages.push({ role: 'assistant', content: response.content });
      messages.push({ role: 'user', content: 'Continue pesquisando e compile o resultado final em JSON.' });

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8192,
        system: RESEARCH_SYSTEM,
        tools: [
          {
            type: 'web_search_20250305' as const,
            name: 'web_search',
            max_uses: 15,
          },
        ],
        messages,
      });
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[WEB-RESEARCH] Completed in ${elapsed}s (stop_reason: ${response.stop_reason})`);

    // Extract text from response content blocks (may have multiple text blocks)
    const textBlocks = response.content.filter(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    );

    if (textBlocks.length === 0) {
      console.warn('[WEB-RESEARCH] No text block in response, returning null');
      return null;
    }

    // Combine all text blocks and extract JSON
    const fullText = textBlocks.map(b => b.text).join('\n');
    const briefing = extractJsonFromText<ResearchBriefing>(fullText);

    if (!briefing) {
      console.warn('[WEB-RESEARCH] Could not extract JSON from response, returning null');
      console.warn('[WEB-RESEARCH] Response preview:', fullText.slice(0, 200));
      return null;
    }
    console.log(`[WEB-RESEARCH] Parsed briefing: ${briefing.key_facts?.length || 0} key facts, ${briefing.sources_count} sources`);

    return briefing;
  } catch (error) {
    console.error('[WEB-RESEARCH] Research failed (graceful degradation):', error instanceof Error ? error.message : error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// formatResearchBriefing — converts ResearchBriefing into prompt text
// ---------------------------------------------------------------------------

export function formatResearchBriefing(
  briefing: ResearchBriefing | null,
  fighter1Name: string,
  fighter2Name: string
): string {
  if (!briefing) {
    return `## INTELIGENCIA DE PESQUISA WEB
Pesquisa web indisponivel. Use apenas os dados do UFCStats fornecidos abaixo. Tenha CUIDADO EXTRA para nao inventar informacoes.`;
  }

  const f1Intel = briefing.fighter1_intel;
  const f2Intel = briefing.fighter2_intel;

  const sections = [
    `## INTELIGENCIA DE PESQUISA WEB (DADOS VERIFICADOS - USE COM PRIORIDADE)`,
    ``,
    `=== CONTEXTO DA LUTA (verificado via web) ===`,
    briefing.fight_context,
    ``,
    `=== ESTADO DA DIVISAO ===`,
    briefing.division_landscape,
    ``,
    `=== INTELIGENCIA: ${fighter1Name} ===`,
    `Narrativa recente: ${f1Intel.recent_narrative}`,
    `Campo de treinamento: ${f1Intel.training_camp}`,
    `Lesoes/Inatividade: ${f1Intel.injuries_layoff}`,
    `Estado mental: ${f1Intel.mental_state}`,
    `Momentum: ${f1Intel.momentum}`,
    `Red flags: ${f1Intel.red_flags.join('; ') || 'Nenhuma identificada'}`,
    `Sinais positivos: ${f1Intel.positive_signals.join('; ') || 'Nenhum identificado'}`,
    ``,
    `=== INTELIGENCIA: ${fighter2Name} ===`,
    `Narrativa recente: ${f2Intel.recent_narrative}`,
    `Campo de treinamento: ${f2Intel.training_camp}`,
    `Lesoes/Inatividade: ${f2Intel.injuries_layoff}`,
    `Estado mental: ${f2Intel.mental_state}`,
    `Momentum: ${f2Intel.momentum}`,
    `Red flags: ${f2Intel.red_flags.join('; ') || 'Nenhuma identificada'}`,
    `Sinais positivos: ${f2Intel.positive_signals.join('; ') || 'Nenhum identificado'}`,
    ``,
    `=== OPONENTES EM COMUM ===`,
    briefing.common_opponents,
    ``,
    `=== CHOQUE ESTILISTICO ===`,
    briefing.stylistic_narrative,
    ``,
    `=== DETALHES DO EVENTO ===`,
    briefing.event_details,
    ``,
    `=== FATOS-CHAVE VERIFICADOS ===`,
    ...(briefing.key_facts || []).map((fact, i) => `${i + 1}. ${fact}`),
    ``,
    `Fontes consultadas: ${briefing.sources_count}`,
    ``,
    `IMPORTANTE: Os dados acima vem de pesquisa web em tempo real. Use-os com PRIORIDADE sobre seu conhecimento interno. Se houver conflito entre sua memoria e os dados da pesquisa, USE OS DADOS DA PESQUISA.`,
  ];

  return sections.join('\n');
}

// ---------------------------------------------------------------------------
// extractEventCorrections — parse research to fix DB errors (rounds, title)
// ---------------------------------------------------------------------------

export function extractEventCorrections(briefing: ResearchBriefing | null): EventCorrections {
  if (!briefing) return { num_rounds: null, titulo_em_jogo: null };

  const combined = [
    briefing.fight_context,
    briefing.event_details,
    ...(briefing.key_facts || []),
  ].join(' ').toLowerCase();

  // Detect rounds (look for "5 round" or "five round" or "championship rounds")
  let num_rounds: number | null = null;
  if (/\b5[\s-]?rounds?\b/.test(combined) || /\bfive[\s-]?rounds?\b/.test(combined) || /championship rounds/.test(combined)) {
    num_rounds = 5;
  }

  // Detect title type
  let titulo_em_jogo: string | null = null;
  if (/\bbmf\b/.test(combined) || /baddest motherfucker/i.test(combined)) {
    titulo_em_jogo = 'Titulo BMF';
  } else if (/title\s*fight|titulo\s*em\s*jogo|disputa\s*de\s*titulo|championship\s*bout/i.test(combined)) {
    titulo_em_jogo = 'Disputa de Titulo';
  } else if (/interim\s*title|titulo\s*interino/i.test(combined)) {
    titulo_em_jogo = 'Titulo Interino';
  }

  if (num_rounds || titulo_em_jogo) {
    console.log(`[WEB-RESEARCH] Event corrections from research: rounds=${num_rounds}, titulo=${titulo_em_jogo}`);
  }

  return { num_rounds, titulo_em_jogo };
}
