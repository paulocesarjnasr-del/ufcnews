import { ClassificationResult, CategoriaNoticia } from '@/types';

// =============================================================================
// UFC RELEVANCE DETECTION
// =============================================================================

// Keywords that indicate UFC content
const UFC_KEYWORDS = [
  'ufc',
  'dana white',
  'octagon',
  'octógono',
  'ultimate fighting',
  'ufc fight night',
  'ufc apex',
  'espn mma',
  'ufc rankings',
  'ufc title',
  'ufc champion',
  'ufc belt',
  'cinturão ufc',
  'campeão ufc',
  // Removed 'zuffa' - too generic, catches Zuffa Boxing
  'performance of the night',
  'fight of the night',
];

// Keywords that indicate NOT UFC (other organizations)
const NON_UFC_KEYWORDS = [
  // Other MMA organizations
  'bellator',
  'one championship',
  'one fc',
  'pfl ',
  ' pfl',
  'pfl:',
  'professional fighters league',
  'rizin',
  'ksw',
  'cage warriors',
  'lfa',
  'invicta fc',
  'fury fc',
  'ares fc',
  'brave cf',
  'eagle fc',
  'senshi',

  // Boxing (including Zuffa Boxing)
  'boxing',
  'boxe',
  'zuffa boxing',
  'wbc',
  'wba',
  'ibf',
  'wbo',
  'heavyweight boxing',
  'boxing match',
  'boxing fight',
  'pugilismo',
  'boxing promoter',
  'eddie hearn',
  'oscar de la hoya',
  'shakur stevenson',
  'canelo',
  'tyson fury',

  // BJJ / Grappling competitions
  'ibjjf',
  'jiu jitsu world',
  'jiu-jitsu world',
  'bjj world',
  'ufc bjj',
  'musumeci',
  'adcc',
  'gordon ryan',
  'who\'s number one',
  'wno ',
  'grappling industries',
  'no-gi worlds',
  'gi worlds',
  'pan jiu jitsu',
  'european jiu jitsu',
  'mundial de jiu jitsu',
  'campeonato de jiu jitsu',
  'flograppling',

  // Kickboxing / Muay Thai
  'glory kickboxing',
  'glory ',
  'k-1',
  'one kickboxing',
  'muay thai',

  // Other combat sports
  'bare knuckle',
  'bkfc',
  'karate combat',
  'wrestling championship',
  'olympic wrestling',
  'collegiate wrestling',

  // UFC non-fight content (marketing, merchandise, etc.)
  'fragrance',
  'tattoo care',
  'name on canvas',
];

// =============================================================================
// CATEGORY KEYWORDS - Clearly separated by purpose
// =============================================================================

interface WeightedKeyword {
  word: string;
  weight: number;
}

// -----------------------------------------------------------------------------
// LUTAS (Fights) - News about specific fights, cards, events, results
// Only when talking about THE FIGHT itself, not the fighters
// -----------------------------------------------------------------------------
const LUTAS_KEYWORDS: WeightedKeyword[] = [
  // Fight announcements (HIGH PRIORITY)
  { word: ' vs ', weight: 5 },          // "Adesanya vs Pereira"
  { word: ' vs.', weight: 5 },
  { word: 'versus', weight: 5 },
  { word: 'fight announced', weight: 5 },
  { word: 'luta anunciada', weight: 5 },
  { word: 'booked', weight: 4 },        // "fight booked"
  { word: 'agendada', weight: 4 },
  { word: 'scheduled', weight: 4 },
  { word: 'official', weight: 2 },
  { word: 'confirmed', weight: 3 },
  { word: 'confirmada', weight: 3 },

  // Event/Card specific (HIGH PRIORITY)
  { word: 'main event', weight: 5 },
  { word: 'co-main', weight: 5 },
  { word: 'fight card', weight: 5 },
  { word: 'card completo', weight: 5 },
  { word: 'prelims', weight: 4 },
  { word: 'preliminares', weight: 4 },
  { word: 'early prelims', weight: 4 },
  { word: 'ppv', weight: 3 },
  { word: 'pay-per-view', weight: 3 },
  { word: 'ufc numbered', weight: 4 },

  // Pre-fight events (HIGH PRIORITY)
  { word: 'weigh-in', weight: 5 },
  { word: 'weigh in', weight: 5 },
  { word: 'pesagem', weight: 5 },
  { word: 'face off', weight: 4 },
  { word: 'face-off', weight: 4 },
  { word: 'encarada', weight: 4 },
  { word: 'staredown', weight: 4 },
  { word: 'press conference', weight: 3 },
  { word: 'coletiva', weight: 3 },

  // Fight results (HIGH PRIORITY)
  { word: 'knockout', weight: 4 },
  { word: 'nocaute', weight: 4 },
  { word: ' ko ', weight: 4 },
  { word: ' tko ', weight: 4 },
  { word: ' tko)', weight: 4 },
  { word: 'submission', weight: 4 },
  { word: 'finalização', weight: 4 },
  { word: 'finalizou', weight: 4 },
  { word: 'unanimous decision', weight: 4 },
  { word: 'split decision', weight: 4 },
  { word: 'majority decision', weight: 4 },
  { word: 'decisão unânime', weight: 4 },
  { word: 'decisão dividida', weight: 4 },
  { word: 'resultado', weight: 3 },
  { word: 'result', weight: 3 },
  { word: 'wins via', weight: 4 },
  { word: 'defeats', weight: 4 },
  { word: 'derrotou', weight: 4 },
  { word: 'venceu', weight: 4 },
  { word: 'perdeu para', weight: 4 },
  { word: 'winner', weight: 3 },
  { word: 'vencedor', weight: 3 },

  // Title fights
  { word: 'title fight', weight: 5 },
  { word: 'championship fight', weight: 5 },
  { word: 'luta pelo título', weight: 5 },
  { word: 'disputa de cinturão', weight: 5 },
  { word: 'defesa de título', weight: 5 },
  { word: 'title defense', weight: 5 },

  // Betting/predictions (about the fight)
  { word: 'odds', weight: 3 },
  { word: 'betting', weight: 3 },
  { word: 'apostas', weight: 3 },
  { word: 'prediction', weight: 3 },
  { word: 'previsão', weight: 3 },
  { word: 'favorito', weight: 2 },
  { word: 'underdog', weight: 3 },

  // Round specific
  { word: 'round 1', weight: 3 },
  { word: 'round 2', weight: 3 },
  { word: 'round 3', weight: 3 },
  { word: 'round 4', weight: 3 },
  { word: 'round 5', weight: 3 },
  { word: 'primeiro round', weight: 3 },
];

// -----------------------------------------------------------------------------
// LUTADORES (Fighters) - News about individual fighters' careers, status
// When the focus is on THE FIGHTER, not a specific fight
// -----------------------------------------------------------------------------
const LUTADORES_KEYWORDS: WeightedKeyword[] = [
  // Injuries (HIGH PRIORITY - fighter status)
  { word: 'injury', weight: 5 },
  { word: 'injured', weight: 5 },
  { word: 'lesão', weight: 5 },
  { word: 'lesionado', weight: 5 },
  { word: 'out of', weight: 4 },
  { word: 'fora de', weight: 4 },
  { word: 'pulled from', weight: 5 },
  { word: 'withdrawn', weight: 5 },
  { word: 'surgery', weight: 5 },
  { word: 'cirurgia', weight: 5 },
  { word: 'recovery', weight: 4 },
  { word: 'recuperação', weight: 4 },
  { word: 'medical', weight: 3 },
  { word: 'médico', weight: 3 },

  // Contract/Career (HIGH PRIORITY - fighter status)
  { word: 'contract', weight: 5 },
  { word: 'contrato', weight: 5 },
  { word: 'signed', weight: 4 },
  { word: 'assinou', weight: 4 },
  { word: 'released', weight: 5 },
  { word: 'demitido', weight: 5 },
  { word: 'cut from ufc', weight: 5 },
  { word: 'free agent', weight: 5 },
  { word: 'agente livre', weight: 5 },
  { word: 'new deal', weight: 4 },
  { word: 'novo contrato', weight: 4 },

  // Retirement (HIGH PRIORITY)
  { word: 'retire', weight: 5 },
  { word: 'retirement', weight: 5 },
  { word: 'aposentadoria', weight: 5 },
  { word: 'aposentou', weight: 5 },
  { word: 'hangs up gloves', weight: 5 },
  { word: 'final fight', weight: 4 },
  { word: 'última luta', weight: 4 },
  { word: 'last fight', weight: 4 },

  // Rankings/Status (MEDIUM PRIORITY)
  { word: 'ranking', weight: 4 },
  { word: 'ranked', weight: 3 },
  { word: 'moves up', weight: 3 },
  { word: 'moves down', weight: 3 },
  { word: 'title shot', weight: 4 },
  { word: 'chance pelo título', weight: 4 },
  { word: 'contender', weight: 3 },
  { word: 'next in line', weight: 3 },
  { word: 'número 1', weight: 3 },
  { word: 'number one', weight: 3 },

  // Weight class changes
  { word: 'weight class', weight: 4 },
  { word: 'categoria de peso', weight: 4 },
  { word: 'moving up', weight: 4 },
  { word: 'moving down', weight: 4 },
  { word: 'subir de peso', weight: 4 },
  { word: 'descer de peso', weight: 4 },
  { word: 'heavyweight', weight: 2 },
  { word: 'middleweight', weight: 2 },
  { word: 'welterweight', weight: 2 },
  { word: 'lightweight', weight: 2 },
  { word: 'featherweight', weight: 2 },
  { word: 'bantamweight', weight: 2 },
  { word: 'flyweight', weight: 2 },

  // Career milestones
  { word: 'debut', weight: 4 },
  { word: 'estreia', weight: 4 },
  { word: 'return', weight: 3 },
  { word: 'volta', weight: 3 },
  { word: 'comeback', weight: 4 },
  { word: 'retorno', weight: 3 },

  // Training/Preparation (focus on fighter)
  { word: 'training camp', weight: 3 },
  { word: 'camp', weight: 2 },
  { word: 'treino', weight: 2 },
  { word: 'sparring', weight: 2 },
  { word: 'new coach', weight: 3 },
  { word: 'novo treinador', weight: 3 },
  { word: 'gym', weight: 2 },
  { word: 'academia', weight: 2 },

  // Fighter specific terms
  { word: 'champion', weight: 3 },
  { word: 'campeão', weight: 3 },
  { word: 'former champion', weight: 3 },
  { word: 'ex-campeão', weight: 3 },
  { word: 'undefeated', weight: 3 },
  { word: 'invicto', weight: 3 },
];

// -----------------------------------------------------------------------------
// BACKSTAGE (Behind the scenes) - UFC business, drama, general news
// NOT directly about a specific fighter's career or a specific fight
// -----------------------------------------------------------------------------
const BACKSTAGE_KEYWORDS: WeightedKeyword[] = [
  // Legal/Criminal (HIGH PRIORITY)
  { word: 'arrest', weight: 5 },
  { word: 'arrested', weight: 5 },
  { word: 'preso', weight: 5 },
  { word: 'police', weight: 4 },
  { word: 'polícia', weight: 4 },
  { word: 'lawsuit', weight: 5 },
  { word: 'processo', weight: 4 },
  { word: 'sued', weight: 5 },
  { word: 'court', weight: 4 },
  { word: 'tribunal', weight: 4 },
  { word: 'criminal', weight: 5 },
  { word: 'charges', weight: 4 },
  { word: 'acusação', weight: 4 },
  { word: 'investigation', weight: 4 },
  { word: 'investigação', weight: 4 },

  // Drama/Controversy (HIGH PRIORITY)
  { word: 'beef', weight: 5 },
  { word: 'feud', weight: 5 },
  { word: 'drama', weight: 4 },
  { word: 'controversy', weight: 5 },
  { word: 'polêmica', weight: 5 },
  { word: 'scandal', weight: 5 },
  { word: 'escândalo', weight: 5 },
  { word: 'trash talk', weight: 4 },
  { word: 'provocação', weight: 3 },
  { word: 'brawl', weight: 5 },
  { word: 'altercation', weight: 5 },
  { word: 'confronto', weight: 4 },
  { word: 'backstage fight', weight: 5 },
  { word: 'incident', weight: 3 },
  { word: 'incidente', weight: 3 },

  // Social Media/Callouts (MEDIUM - often drama-related)
  { word: 'callout', weight: 3 },
  { word: 'calls out', weight: 3 },
  { word: 'desafia', weight: 3 },
  { word: 'responds to', weight: 2 },
  { word: 'responde', weight: 2 },
  { word: 'fires back', weight: 4 },
  { word: 'retruca', weight: 3 },
  { word: 'blasts', weight: 4 },
  { word: 'slams', weight: 4 },
  { word: 'rips', weight: 3 },
  { word: 'twitter', weight: 2 },
  { word: 'instagram', weight: 2 },
  { word: 'social media', weight: 2 },

  // Business/UFC Organization (MEDIUM)
  { word: 'dana white', weight: 3 },
  { word: 'ufc president', weight: 3 },
  { word: 'presidente do ufc', weight: 3 },
  { word: 'business', weight: 3 },
  { word: 'negócio', weight: 3 },
  { word: 'promotion', weight: 2 },
  { word: 'promoter', weight: 2 },
  { word: 'espn deal', weight: 3 },
  { word: 'tv deal', weight: 3 },
  { word: 'broadcast', weight: 2 },
  { word: 'transmissão', weight: 2 },
  { word: 'ratings', weight: 3 },
  { word: 'audiência', weight: 3 },
  { word: 'ppv buys', weight: 3 },

  // Interviews/Media (LOWER - generic content)
  { word: 'interview', weight: 2 },
  { word: 'entrevista', weight: 2 },
  { word: 'podcast', weight: 2 },
  { word: 'documentary', weight: 3 },
  { word: 'documentário', weight: 3 },

  // USADA/Doping
  { word: 'usada', weight: 5 },
  { word: 'doping', weight: 5 },
  { word: 'drug test', weight: 5 },
  { word: 'banned substance', weight: 5 },
  { word: 'substância proibida', weight: 5 },
  { word: 'suspension', weight: 4 },
  { word: 'suspensão', weight: 4 },
  { word: 'failed test', weight: 5 },
  { word: 'teste positivo', weight: 5 },

  // Money/Pay (when about business, not fighter contracts)
  { word: 'fighter pay', weight: 4 },
  { word: 'salário', weight: 3 },
  { word: 'purse', weight: 3 },
  { word: 'bonus', weight: 2 },
  { word: 'ppv points', weight: 3 },

  // Events/Venues (UFC business)
  { word: 'ufc coming to', weight: 3 },
  { word: 'new venue', weight: 3 },
  { word: 'international', weight: 2 },
  { word: 'expansion', weight: 3 },
  { word: 'cancelled event', weight: 4 },
  { word: 'evento cancelado', weight: 4 },
  { word: 'postponed', weight: 3 },
  { word: 'adiado', weight: 3 },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents
}

function textContainsKeyword(text: string, keywords: string[]): boolean {
  const normalizedText = normalizeText(text);
  return keywords.some((keyword) =>
    normalizedText.includes(normalizeText(keyword))
  );
}

function textContainsAnyKeyword(text: string, keywords: string[]): string | null {
  const normalizedText = normalizeText(text);
  for (const keyword of keywords) {
    if (normalizedText.includes(normalizeText(keyword))) {
      return keyword;
    }
  }
  return null;
}

function findMatchingFighters(
  text: string,
  lutadores: Array<{ nome: string; apelido: string | null }>
): string[] {
  const normalizedText = normalizeText(text);
  const matched: string[] = [];

  for (const lutador of lutadores) {
    // Check full name
    if (normalizedText.includes(normalizeText(lutador.nome))) {
      matched.push(lutador.nome);
      continue;
    }

    // Check nickname
    if (lutador.apelido && normalizedText.includes(normalizeText(lutador.apelido))) {
      matched.push(lutador.nome);
      continue;
    }

    // Check last name (only if > 4 chars to avoid false positives)
    const nameParts = lutador.nome.split(' ');
    if (nameParts.length > 1) {
      const lastName = nameParts[nameParts.length - 1];
      if (lastName.length > 4 && normalizedText.includes(normalizeText(lastName))) {
        // Skip common surnames to avoid false positives
        const commonWords = [
          'silva', 'santos', 'costa', 'jesus', 'junior', 'filho',
          'white', 'brown', 'green', 'king', 'price', 'lewis',
          'davis', 'allen', 'rosa', 'smith', 'jones', 'williams',
          'johnson', 'miller', 'wilson', 'taylor', 'anderson',
        ];
        if (!commonWords.includes(lastName.toLowerCase())) {
          matched.push(lutador.nome);
        }
      }
    }
  }

  return [...new Set(matched)];
}

function calculateCategoryScore(text: string, keywords: WeightedKeyword[]): number {
  const normalizedText = normalizeText(text);
  let score = 0;

  for (const { word, weight } of keywords) {
    if (normalizedText.includes(normalizeText(word))) {
      score += weight;
    }
  }

  return score;
}

// =============================================================================
// MAIN CLASSIFICATION FUNCTION
// =============================================================================

function determineCategory(
  text: string,
  fighterCount: number
): CategoriaNoticia {
  const scores = {
    lutas: calculateCategoryScore(text, LUTAS_KEYWORDS),
    lutadores: calculateCategoryScore(text, LUTADORES_KEYWORDS),
    backstage: calculateCategoryScore(text, BACKSTAGE_KEYWORDS),
  };

  // Log scores for debugging (can be removed in production)
  // console.log(`Scores - Lutas: ${scores.lutas}, Lutadores: ${scores.lutadores}, Backstage: ${scores.backstage}`);

  // ==========================================================================
  // PRIORITY RULES - These override the simple score comparison
  // ==========================================================================

  // Rule 1: If "vs" is present and score is high, it's definitely LUTAS
  const normalizedText = normalizeText(text);
  const hasVs = normalizedText.includes(' vs ') || normalizedText.includes(' vs.');
  if (hasVs && scores.lutas >= 5) {
    return 'lutas';
  }

  // Rule 2: Legal/Criminal content is BACKSTAGE regardless of fighters mentioned
  const legalKeywords = ['arrest', 'lawsuit', 'police', 'court', 'criminal', 'preso', 'processo'];
  if (legalKeywords.some(k => normalizedText.includes(k)) && scores.backstage >= 4) {
    return 'backstage';
  }

  // Rule 3: USADA/Doping is always BACKSTAGE
  if (normalizedText.includes('usada') || normalizedText.includes('doping')) {
    return 'backstage';
  }

  // Rule 4: Injury/contract news with ONE fighter is LUTADORES
  const injuryContractKeywords = ['injury', 'injured', 'contract', 'retire', 'lesão', 'contrato', 'aposentadoria'];
  if (injuryContractKeywords.some(k => normalizedText.includes(k)) && fighterCount === 1) {
    return 'lutadores';
  }

  // Rule 5: If exactly 2 fighters and "vs" present, it's LUTAS
  if (fighterCount === 2 && hasVs) {
    return 'lutas';
  }

  // Rule 6: Dana White news without specific fighters is BACKSTAGE
  if (normalizedText.includes('dana white') && fighterCount === 0) {
    return 'backstage';
  }

  // ==========================================================================
  // SCORE-BASED DECISION
  // ==========================================================================

  const maxScore = Math.max(scores.lutas, scores.lutadores, scores.backstage);

  // If no significant keywords matched
  if (maxScore < 3) {
    // Default based on fighter count
    if (fighterCount >= 2) return 'lutas';
    if (fighterCount === 1) return 'lutadores';
    return 'backstage';
  }

  // Tie-breaker rules
  if (scores.lutas === maxScore && scores.lutas >= 5) {
    return 'lutas';
  }

  if (scores.backstage === maxScore && scores.backstage >= 5) {
    return 'backstage';
  }

  if (scores.lutadores === maxScore && scores.lutadores >= 4) {
    return 'lutadores';
  }

  // Final decision: highest score wins
  if (scores.lutas >= scores.lutadores && scores.lutas >= scores.backstage) {
    return 'lutas';
  } else if (scores.lutadores >= scores.backstage) {
    return 'lutadores';
  } else {
    return 'backstage';
  }
}

function generateSubtitle(descricao: string): string {
  let subtitle = descricao
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (subtitle.length > 150) {
    const truncated = subtitle.slice(0, 150);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastExclamation = truncated.lastIndexOf('!');
    const lastQuestion = truncated.lastIndexOf('?');
    const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);

    if (lastSentenceEnd > 50) {
      subtitle = truncated.slice(0, lastSentenceEnd + 1);
    } else {
      subtitle = truncated + '...';
    }
  }

  return subtitle;
}

// =============================================================================
// EXPORTED FUNCTIONS
// =============================================================================

export function classifyNews(
  titulo: string,
  descricao: string,
  lutadores: Array<{ nome: string; apelido: string | null }>
): ClassificationResult {
  const fullText = `${titulo} ${descricao}`;

  // 1. Check for non-UFC organizations
  const nonUFCKeyword = textContainsAnyKeyword(fullText, NON_UFC_KEYWORDS);
  const isNonUFC = nonUFCKeyword !== null;

  // 2. Check for UFC keywords
  const hasUFCKeyword = textContainsKeyword(fullText, UFC_KEYWORDS);

  // 3. Find mentioned fighters
  const lutadoresMencionados = findMatchingFighters(fullText, lutadores);
  const hasFighters = lutadoresMencionados.length > 0;

  // 4. Determine if UFC-related
  let ehUFC = false;

  // Content that is NEVER UFC news regardless of keywords
  const ALWAYS_REJECT = [
    'zuffa boxing', 'ufc bjj', 'fragrance', 'tattoo care', 'name on canvas',
  ];
  const alwaysReject = ALWAYS_REJECT.some(k =>
    normalizeText(fullText).includes(normalizeText(k))
  );

  if (alwaysReject) {
    ehUFC = false;
  } else if (isNonUFC && !hasUFCKeyword && !hasFighters) {
    // Non-UFC keyword found, no UFC keyword, no UFC fighters → reject
    ehUFC = false;
  } else if (isNonUFC && !hasFighters) {
    // Non-UFC keyword found and no UFC fighters mentioned → likely not UFC
    // Even if "UFC" appears (e.g. "PFL rankings for UFC, Bellator and beyond")
    ehUFC = false;
  } else if (hasUFCKeyword || hasFighters) {
    // Has UFC keyword OR mentions UFC fighters → accept
    // This keeps articles like "Dana White mocks boxing promoters" (has UFC keyword + Dana White)
    // and "Shakur wants to fight UFC champion Topuria" (mentions UFC fighter)
    ehUFC = true;
  }

  // 5. Determine category (passing fighter count for context)
  const categoria = determineCategory(fullText, lutadoresMencionados.length);

  // 6. Generate subtitle
  const subtitulo = generateSubtitle(descricao);

  return {
    eh_ufc: ehUFC,
    lutadores_mencionados: lutadoresMencionados,
    categoria,
    subtitulo,
  };
}

export function classifyNewsBatch(
  noticias: Array<{ titulo: string; descricao: string }>,
  lutadores: Array<{ nome: string; apelido: string | null }>
): ClassificationResult[] {
  return noticias.map((n) => classifyNews(n.titulo, n.descricao, lutadores));
}
