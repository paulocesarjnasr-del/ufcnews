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
  created_at: string;
  updated_at: string;
}
