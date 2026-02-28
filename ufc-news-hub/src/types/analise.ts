export interface StatComparison {
  label: string;
  fighter1Value: number;
  fighter2Value: number;
  advantage: 'fighter1' | 'fighter2' | 'even';
  suffix?: string;
}

export interface RadarDataPoint {
  axis: string;
  fighter1: number;
  fighter2: number;
}

export interface TaleOfTapeFighter {
  altura: string;
  envergadura: string;
  idade: number;
  academia: string;
}

export interface PathToVictory {
  title: string;
  description: string;
}

export interface DangerZone {
  round: string;
  description: string;
}

export interface TacticalBreakdownData {
  stats: StatComparison[];
  radarData: RadarDataPoint[];
  taleOfTape: {
    fighter1: TaleOfTapeFighter;
    fighter2: TaleOfTapeFighter;
  };
  pathsToVictory: {
    fighter1: PathToVictory[];
    fighter2: PathToVictory[];
  };
  dangerZones: DangerZone[];
  reachAdvantage?: {
    fighter: 'fighter1' | 'fighter2';
    inches: number;
    description: string;
  };
}

export interface PredictionScenario {
  method: string;
  probability: number;
  description: string;
}

export interface KeyFactor {
  factor: string;
  edge: 'fighter1' | 'fighter2';
  impact: number;
  description: string;
}

export interface XFactor {
  title: string;
  description: string;
  details?: string;
  smartBet?: string;
}

export interface FightPredictionData {
  predictedWinner: 'fighter1' | 'fighter2';
  predictedMethod: string;
  confidence: string;
  fighter1Scenarios: PredictionScenario[];
  fighter2Scenarios: PredictionScenario[];
  keyFactors: KeyFactor[];
  xFactor: XFactor;
}

export interface FighterLastFight {
  result: 'W' | 'L' | 'D' | 'NC';
  opponent: string;
  method: string;
  event: string;
}

export interface FighterInfo {
  nome: string;
  apelido?: string;
  pais?: string;
  cidade?: string;
  record: string;
  ranking?: string;
  imagem_url?: string;
  ultimasLutas: FighterLastFight[];
  sigStrikesPerMin?: number;
  strikeAccuracy?: number;
  strikeDefense?: number;
  tdAccuracy?: number;
  tdDefense?: number;
  subAttemptsPer15?: number;
}

export interface Analise {
  id: string;
  evento_id: string | null;
  slug: string;
  titulo: string;
  subtitulo: string | null;
  lutador1_id: string | null;
  lutador2_id: string | null;
  artigo_conteudo: string;
  tactical_breakdown: TacticalBreakdownData;
  fight_prediction: FightPredictionData;
  fighter1_info: FighterInfo;
  fighter2_info: FighterInfo;
  evento_nome: string | null;
  evento_data: string | null;
  evento_local: string | null;
  categoria_peso: string | null;
  num_rounds: number;
  is_titulo: boolean;
  broadcast: string | null;
  status: string;
  analysis_type?: string;
  created_at: string;
  updated_at: string;
}

// ==========================================
// Full Card Analysis Types
// ==========================================

export interface BettingValue {
  moneyline: {
    pick: 'fighter1' | 'fighter2';
    fighter_name: string;
    confidence: number; // 1-10
    reasoning: string;
  };
  method: {
    pick: string;
    value_rating: number; // 1-10
    reasoning: string;
  };
  over_under: {
    pick: 'over' | 'under';
    rounds: number;
    reasoning: string;
  };
  bestBet: string;
  avoidBet: string;
}

export interface FightAnalysisItem {
  fight_id: string;
  fight_label: string; // e.g. "Main Event", "Co-Main Event"
  fight_type: string; // main_event, co_main, card_principal
  ordem: number;
  categoria_peso: string;
  num_rounds: number;
  is_titulo: boolean;
  fighter1_info: FighterInfo;
  fighter2_info: FighterInfo;
  artigo_conteudo: string;
  tactical_breakdown: TacticalBreakdownData;
  fight_prediction: FightPredictionData;
  betting_value: BettingValue;
}

export interface BestBet {
  fight_label: string;
  bet_type: string; // "Moneyline", "Method", "Over/Under"
  pick: string;
  reasoning: string;
  confidence: number; // 1-10
  value_rating: number; // 1-10
}

export interface ParlaySuggestion {
  legs: string[];
  reasoning: string;
  risk_level: 'low' | 'medium' | 'high';
}

export interface CardOverview {
  card_summary: string; // HTML
  best_bets: BestBet[];
  parlay: ParlaySuggestion;
  total_fights: number;
}

export interface CardAnalise extends Analise {
  fights_analysis: FightAnalysisItem[];
  card_overview: CardOverview;
  analysis_type: 'full_card';
}

export function isCardAnalise(analise: Analise): analise is CardAnalise {
  return analise.analysis_type === 'full_card'
    && 'fights_analysis' in analise
    && Array.isArray((analise as CardAnalise).fights_analysis);
}
