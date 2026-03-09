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

// ==========================================
// Full Single Analysis Types (15-section system)
// ==========================================

// --- Hero Section ---
export interface HeroFighterData {
  nome_completo: string;
  apelido: string;
  sobrenome: string;
  record: string;
  ranking: string;
  info_extra: string;
  imagem_fullbody_url: string | null;
}

export interface HeroSectionData {
  evento_nome: string;
  evento_data: string;
  evento_local: string;
  categoria_peso: string;
  num_rounds: number;
  titulo_em_jogo: string | null;
  tagline: string;
  tagline_sub: string;
  fighter1: HeroFighterData;
  fighter2: HeroFighterData;
}

// --- Narrativa Section ---
export interface StakeRow {
  dimensao: string;
  fighter1: string;
  fighter2: string;
}

export interface FuturoCenarioConsequencia {
  tag: string;
  texto: string;
}

export interface FuturoCenario {
  titulo: string;
  subtitulo: string;
  consequencias: FuturoCenarioConsequencia[];
  proxima_luta: string;
}

export interface NarrativaSectionData {
  html_content: string;
  stakes: StakeRow[];
  prognostico?: {
    fighter1_vence: FuturoCenario;
    fighter2_vence: FuturoCenario;
  };
}

// --- Momento Atual Section ---
export interface RecentFight {
  date: string;
  opponent: string;
  result: 'W' | 'L' | 'D' | 'NC';
  method: string;
  opponent_rank: string;
  quality_score: number;
  quality_label?: string;
  note: string;
}

export interface MomentoAtualFighter {
  nome: string;
  color: 'red' | 'blue';
  recent_fights: RecentFight[];
  full_fight_history?: RecentFight[];
  layoff_warning?: string | null;
  momentum_score: number;
  momentum_label: string;
  momentum_trend: 'ascending' | 'descending' | 'stable' | 'resilient';
  momentum_note: string;
}

export interface MomentoAtualSectionData {
  fighter1: MomentoAtualFighter;
  fighter2: MomentoAtualFighter;
}

// --- Nivel Competicao Section ---
export interface NivelCompeticaoFighter {
  nome: string;
  media_oponentes: number;
  media_oponentes_label?: string;
  aproveitamento: string;
  contra_top5: string;
}

export interface NivelCompeticaoSectionData {
  fighter1: NivelCompeticaoFighter;
  fighter2: NivelCompeticaoFighter;
  oponentes_em_comum_count: { fighter1: number; fighter2: number };
  oponentes_em_comum_note: string;
}

// --- Oponente Comum Section ---
export interface OponenteComumResult {
  resultado: string;
  metodo: string;
  duracao: string;
  contexto: string;
  performance: string;
  evento: string;
  data: string;
}

export interface OponenteComumSectionData {
  oponente_nome: string;
  fighter1_result: OponenteComumResult;
  fighter2_result: OponenteComumResult;
  insight: string;
}

// --- Comparacao Estatistica Section ---
export interface StatBarData {
  label: string;
  valueA: number;
  valueB: number;
  maxVal: number;
  format?: 'decimal' | 'percent' | 'integer';
  note?: string;
  reverseWinner?: boolean;
}

export interface TaleOfTapeRow {
  label: string;
  fighter1: string;
  fighter2: string;
  note?: string | null;
}

export interface ComparacaoEstatisticaSectionData {
  stats: StatBarData[];
  tale_of_tape: TaleOfTapeRow[];
}

// --- Perfil Habilidades Section ---
export interface SkillBarData {
  label: string;
  valueA: number;
  valueB: number;
  labelA?: string;
  labelB?: string;
  advantage?: 'fighter1' | 'fighter2' | 'even';
  advantage_note?: string;
}

export interface PerfilHabilidadesSectionData {
  skills: SkillBarData[];
  insight?: string;
}

// --- Distribuicao Vitorias Section ---
export interface WinMethodBreakdown {
  count: number;
  percent: number;
}

export interface DistribuicaoVitoriasFighter {
  nome: string;
  ko_tko: WinMethodBreakdown;
  submission: WinMethodBreakdown;
  decision: WinMethodBreakdown;
  total_wins: number;
}

export interface DistribuicaoVitoriasSectionData {
  fighter1: DistribuicaoVitoriasFighter;
  fighter2: DistribuicaoVitoriasFighter;
  insight: string;
}

// --- Danger Zones Section ---
export interface DangerZoneCard {
  rounds: string;
  danger_level: number;
  danger_label: string;
  color: 'red' | 'gold' | 'green';
  title: string;
  description: string;
}

export interface DangerZonesSectionData {
  zones: DangerZoneCard[];
}

// --- Intangiveis Section ---
export interface IntangivelItem {
  icon: string;
  title: string;
  fighter: string;
  risk_level: string;
  risk_color: 'red' | 'yellow' | 'green' | 'neutral';
  description: string;
}

export interface IntangiveisSectionData {
  items: IntangivelItem[];
}

// --- Caminhos Vitoria Section ---
export interface CaminhoVitoria {
  name: string;
  probability: number;
  method: string;
  description: string;
}

export interface CaminhosVitoriaFighter {
  nome: string;
  total_probability: number;
  scenarios: CaminhoVitoria[];
}

export interface CaminhosVitoriaSectionData {
  fighter1: CaminhosVitoriaFighter;
  fighter2: CaminhosVitoriaFighter;
}

// --- Previsao Final Section ---
export interface PrevisaoFinalValuePicks {
  moneyline: { pick: string; reasoning: string };
  method: { pick: string; reasoning: string };
  over_under: { pick: string; rounds: number; reasoning: string };
  best_value: string;
}

export interface PrevisaoFinalSectionData {
  winner_name: string;
  winner_side: 'fighter1' | 'fighter2';
  predicted_method: string;
  confidence_score: number;
  confidence_label: string;
  explanation: string;
  x_factor: { title: string; description: string };
  upset_alert: { title: string; description: string };
  probabilities: {
    fighter1: { nome: string; percent: number };
    fighter2: { nome: string; percent: number };
    draw: number;
  };
  value_picks?: PrevisaoFinalValuePicks;
}

// --- O Que Observar Section ---
export interface TalkingPoint {
  num: number;
  title: string;
  icon: string;
  description: string;
}

export interface OQueObservarSectionData {
  points: TalkingPoint[];
}

// --- Creator Kit Section ---
export interface InstagramSlide {
  slide_number: number;
  title: string;
  content: string;
  color: 'red' | 'blue' | 'gold';
}

export interface Tweet {
  num: string;
  text: string;
}

export interface VideoScriptSection {
  time: string;
  title: string;
  text: string;
}

export interface TikTokScript {
  hook: string;
  body: string;
  cta: string;
}

export interface CreatorKitSectionData {
  instagram: InstagramSlide[];
  twitter: Tweet[];
  video: VideoScriptSection[];
  tiktok?: TikTokScript[];
  headlines?: string[];
}

// --- Radar Apostador Section ---
export interface OddsData {
  fighter1_odds: string;
  fighter2_odds: string;
  fighter1_name: string;
  fighter2_name: string;
  source: string;
}

export interface EstatisticoEdge {
  icon: string;
  titulo: string;
  stat_headline: string;
  contexto: string;
  implicacao_aposta: string;
  edge_level: 'forte' | 'moderado' | 'leve';
  fighter_side?: 'fighter1' | 'fighter2' | 'neutral';
}

export interface ValuePick {
  tipo: string;
  pick: string;
  odds: string;
  confianca: 'baixa' | 'media' | 'alta';
  edge_vs_mercado?: string;
  raciocinio: string;
}

export interface RadarApostadorSectionData {
  odds: OddsData;
  edges: EstatisticoEdge[];
  value_picks: ValuePick[];
  armadilha: { titulo: string; descricao: string };
  disclaimer: string;
}

// --- Full Analysis Data (all 15 sections) ---
export interface FullAnalysisData {
  hero: HeroSectionData;
  narrativa: NarrativaSectionData;
  momento_atual: MomentoAtualSectionData;
  nivel_competicao: NivelCompeticaoSectionData;
  oponente_comum: OponenteComumSectionData | null;
  comparacao_estatistica: ComparacaoEstatisticaSectionData;
  perfil_habilidades: PerfilHabilidadesSectionData;
  distribuicao_vitorias: DistribuicaoVitoriasSectionData;
  danger_zones: DangerZonesSectionData;
  intangiveis: IntangiveisSectionData;
  caminhos_vitoria: CaminhosVitoriaSectionData;
  previsao_final: PrevisaoFinalSectionData;
  o_que_observar: OQueObservarSectionData;
  creator_kit: CreatorKitSectionData;
  betting_value: null;
  radar_apostador: RadarApostadorSectionData;
}

// --- Full Single Analise (extends base Analise) ---
export interface FullSingleAnalise extends Analise {
  analysis_type: 'full_single';
  full_analysis: FullAnalysisData;
}

export function isFullSingleAnalise(analise: Analise): analise is FullSingleAnalise {
  return analise.analysis_type === 'full_single'
    && 'full_analysis' in analise
    && (analise as FullSingleAnalise).full_analysis != null;
}
