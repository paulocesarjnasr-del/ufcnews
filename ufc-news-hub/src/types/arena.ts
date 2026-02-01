// =============================================
// ARENA UFC - Tipos TypeScript
// =============================================

// Enums
export type NivelUsuario =
  | 'iniciante'
  | 'amateur'
  | 'contender'
  | 'challenger'
  | 'elite'
  | 'champion'
  | 'legend';

export type StatusLiga = 'ativa' | 'pausada' | 'encerrada';
export type TipoLiga = 'publica' | 'privada';
// Duelos removidos do sistema
export type StatusAmizade = 'pendente' | 'aceita' | 'bloqueada';

export type TipoConquista =
  | 'sniper'
  | 'on_fire'
  | 'dog_whisperer'
  | 'giant_slayer'
  | 'champion'
  | 'knockout_artist'
  | 'submission_specialist'
  | 'analyst'
  | 'globetrotter'
  | 'first_blood'
  | 'social_butterfly'
  | 'league_founder'
  | 'perfect_card'
  | 'underdog_hunter'
  | 'main_event_master'
  | 'streak_5'
  | 'streak_10'
  | 'streak_20';

export type MetodoVitoria =
  | 'KO/TKO'
  | 'Submission'
  | 'Decision - Unanimous'
  | 'Decision - Split'
  | 'Decision - Majority'
  | 'DQ'
  | 'No Contest'
  | 'Draw';

// =============================================
// Interfaces Principais
// =============================================

export interface UsuarioArena {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  email: string;

  // Estatísticas
  pontos_totais: number;
  xp_total: number;
  nivel: NivelUsuario;

  // Streaks
  streak_atual: number;
  melhor_streak: number;
  streak_main_event: number;
  melhor_streak_main_event: number;

  // Precisão
  total_previsoes: number;
  previsoes_corretas: number;
  previsoes_perfeitas: number;

  // Contadores
  underdogs_acertados: number;
  kos_acertados: number;
  subs_acertados: number;
  decisoes_acertadas: number;

  // Social
  total_amigos: number;
  total_ligas: number;
  total_conquistas: number;
  titulos_ganhos: number;

  // Config
  picks_publicos: boolean;
  notificacoes_ativas: boolean;

  created_at: string;
  last_login_at: string | null;
}

export interface UsuarioArenaPublico {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  nivel: NivelUsuario;
  pontos_totais: number;
  streak_atual: number;
  total_previsoes: number;
  previsoes_corretas: number;
  total_ligas: number;
  titulos_ganhos: number;
}

export interface UsuarioArenaRanking {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  nivel: NivelUsuario;
  pontos_totais: number;
  streak_atual: number;
  precisao: number; // Calculado: previsoes_corretas / total_previsoes * 100
  posicao: number;
}

// =============================================
// Ligas
// =============================================

export interface Liga {
  id: string;
  nome: string;
  descricao: string | null;
  imagem_url: string | null;
  criador_id: string;
  tipo: TipoLiga;
  codigo_convite: string | null;
  status: StatusLiga;
  temporada_atual: number;
  max_membros: number;
  apenas_main_card: boolean;
  mostrar_picks_antes: boolean;
  total_membros: number;
  total_eventos_disputados: number;
  campeao_id: string | null;
  campeao_desde: string | null;
  defesas_titulo: number;
  created_at: string;
}

export interface LigaComDetalhes extends Liga {
  criador: UsuarioArenaPublico;
  campeao: UsuarioArenaPublico | null;
  membros: LigaMembro[];
  minha_posicao?: number;
  meus_pontos?: number;
}

export interface LigaMembro {
  id: string;
  liga_id: string;
  usuario_id: string;
  pontos_temporada: number;
  posicao_atual: number;
  melhor_posicao: number | null;
  pior_posicao: number | null;
  eventos_participados: number;
  is_admin: boolean;
  joined_at: string;
  usuario: UsuarioArenaPublico;
}

export interface LigaTemporada {
  id: string;
  liga_id: string;
  numero_temporada: number;
  inicio: string;
  fim: string | null;
  campeao_id: string | null;
  campeao: UsuarioArenaPublico | null;
  pontos_campeao: number | null;
  total_participantes: number | null;
  total_previsoes: number | null;
}

// =============================================
// Previsões
// =============================================

export interface Previsao {
  id: string;
  usuario_id: string;
  luta_id: string;
  evento_id: string;
  vencedor_previsto_id: string | null;
  metodo_previsto: MetodoVitoria | null;
  round_previsto: number | null;
  pontos_confianca: number;
  processada: boolean;
  acertou_vencedor: boolean | null;
  acertou_metodo: boolean | null;
  acertou_round: boolean | null;
  pontos_base: number;
  multiplicador_metodo: number;
  multiplicador_round: number;
  multiplicador_underdog: number;
  multiplicador_confianca: number;
  pontos_ganhos: number;
  xp_ganho: number;
  odds_vencedor_previsto: number | null;
  created_at: string;
  updated_at: string;
}

export interface PrevisaoComDetalhes extends Previsao {
  luta: {
    id: string;
    lutador1_id: string;
    lutador2_id: string;
    lutador1_nome: string;
    lutador2_nome: string;
    lutador1_foto: string | null;
    lutador2_foto: string | null;
    categoria_peso: string;
    is_titulo: boolean;
    tipo: string;
    vencedor_id: string | null;
    metodo: MetodoVitoria | null;
  };
  vencedor_previsto: {
    id: string;
    nome: string;
  } | null;
}

export interface PrevisaoInput {
  luta_id: string;
  vencedor_previsto_id: string;
  metodo_previsto?: MetodoVitoria;
  round_previsto?: number;
  pontos_confianca?: number;
}

export interface PrevisaoEventoResumo {
  evento_id: string;
  evento_nome: string;
  evento_data: string;
  total_previsoes: number;
  acertos: number;
  pontos_ganhos: number;
  previsoes_perfeitas: number;
  card_perfeito: boolean;
}

// =============================================
// Duelos (REMOVIDOS DO SISTEMA)
// =============================================
// Os duelos foram removidos do sistema

// =============================================
// Conquistas
// =============================================

export interface Conquista {
  id: string;
  usuario_id: string;
  tipo: TipoConquista;
  detalhes: Record<string, unknown> | null;
  desbloqueada_em: string;
}

export interface ConquistaDefinicao {
  tipo: TipoConquista;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
}

export const CONQUISTAS_DEFINICOES: ConquistaDefinicao[] = [
  { tipo: 'sniper', nome: 'Sniper', descricao: '5 previsões perfeitas (vencedor + método + round)', icone: '🎯', cor: '#FFD700' },
  { tipo: 'on_fire', nome: 'On Fire', descricao: 'Streak de 10 main events corretos', icone: '🔥', cor: '#FF4500' },
  { tipo: 'dog_whisperer', nome: 'Dog Whisperer', descricao: '3 underdogs seguidos', icone: '🐕', cor: '#8B4513' },
  { tipo: 'giant_slayer', nome: 'Giant Slayer', descricao: 'Acertou underdog +500', icone: '💀', cor: '#4B0082' },
  { tipo: 'champion', nome: 'Champion', descricao: 'Ganhou uma temporada de liga', icone: '🏆', cor: '#FFD700' },
  { tipo: 'knockout_artist', nome: 'Knockout Artist', descricao: 'Acertou 10 KO/TKOs', icone: '👊', cor: '#DC143C' },
  { tipo: 'submission_specialist', nome: 'Submission Specialist', descricao: 'Acertou 10 finalizações', icone: '🐍', cor: '#228B22' },
  { tipo: 'analyst', nome: 'Analyst', descricao: 'Precisão acima de 70% em 50+ lutas', icone: '📊', cor: '#4169E1' },
  { tipo: 'globetrotter', nome: 'Globetrotter', descricao: 'Fez previsões em 20 eventos diferentes', icone: '🌍', cor: '#20B2AA' },
  { tipo: 'first_blood', nome: 'First Blood', descricao: 'Fez sua primeira previsão', icone: '🩸', cor: '#B22222' },
  { tipo: 'social_butterfly', nome: 'Social Butterfly', descricao: 'Tem 10 amigos', icone: '🦋', cor: '#FF69B4' },
  { tipo: 'league_founder', nome: 'League Founder', descricao: 'Criou uma liga', icone: '🏛️', cor: '#DAA520' },
  { tipo: 'perfect_card', nome: 'Perfect Card', descricao: 'Acertou todas as lutas de um card', icone: '✨', cor: '#FFD700' },
  { tipo: 'underdog_hunter', nome: 'Underdog Hunter', descricao: 'Acertou 10 underdogs', icone: '🎰', cor: '#9932CC' },
  { tipo: 'main_event_master', nome: 'Main Event Master', descricao: 'Acertou 20 main events', icone: '⭐', cor: '#FFA500' },
  { tipo: 'streak_5', nome: 'Hot Streak', descricao: 'Streak de 5 acertos seguidos', icone: '5️⃣', cor: '#32CD32' },
  { tipo: 'streak_10', nome: 'Fire Streak', descricao: 'Streak de 10 acertos seguidos', icone: '🔟', cor: '#FF6347' },
  { tipo: 'streak_20', nome: 'Legendary Streak', descricao: 'Streak de 20 acertos seguidos', icone: '💫', cor: '#FFD700' },
];

// =============================================
// Amizades
// =============================================

export interface Amizade {
  id: string;
  usuario_id: string;
  amigo_id: string;
  status: StatusAmizade;
  created_at: string;
  accepted_at: string | null;
}

export interface AmigoComDetalhes {
  amizade_id: string;
  amigo: UsuarioArenaPublico;
  status: StatusAmizade;
  desde: string;
}

// =============================================
// Atividades (Feed)
// =============================================

export interface Atividade {
  id: string;
  usuario_id: string;
  tipo: string;
  titulo: string;
  descricao: string | null;
  dados: Record<string, unknown> | null;
  publica: boolean;
  created_at: string;
  usuario?: UsuarioArenaPublico;
}

// =============================================
// Chat da Liga
// =============================================

export interface LigaChatMensagem {
  id: string;
  liga_id: string;
  usuario_id: string;
  mensagem: string;
  created_at: string;
  usuario: UsuarioArenaPublico;
}

// =============================================
// Notificações
// =============================================

export interface Notificacao {
  id: string;
  usuario_id: string;
  tipo: string;
  titulo: string;
  mensagem: string | null;
  dados: Record<string, unknown> | null;
  lida: boolean;
  created_at: string;
}

// =============================================
// Leaderboards
// =============================================

export interface LeaderboardGlobal {
  periodo: 'semanal' | 'mensal' | 'total';
  usuarios: UsuarioArenaRanking[];
  total: number;
}

export interface LeaderboardLiga {
  liga: Liga;
  temporada: number;
  membros: LigaMembro[];
}

export interface LeaderboardEvento {
  evento_id: string;
  evento_nome: string;
  rankings: {
    usuario: UsuarioArenaPublico;
    pontos: number;
    acertos: number;
    total_lutas: number;
    previsoes_perfeitas: number;
    posicao: number;
  }[];
}

// =============================================
// Pontuação
// =============================================

export interface CalculoPontuacao {
  pontos_base: number; // 100 por acerto de vencedor
  bonus_metodo: number; // +50 se acertou método
  bonus_round: number; // +50 se acertou round
  multiplicador_underdog: number; // 1.0 a 2.0 baseado nas odds
  multiplicador_confianca: number; // Baseado nos pontos apostados
  total: number;
  xp: number;
}

export const PONTUACAO_CONFIG = {
  PONTOS_BASE_VENCEDOR: 100,
  BONUS_METODO: 50,
  BONUS_ROUND: 50,
  BONUS_CARD_PERFEITO: 500,

  // XP
  XP_POR_PREVISAO: 10,
  XP_ACERTO: 25,
  XP_CARD_COMPLETO: 50,
  XP_CONQUISTA: 200,

  // Multiplicadores de confiança
  // pontos_confianca / 100 = multiplicador
  // Ex: 200 pontos = 2.0x, 50 pontos = 0.5x

  // Multiplicadores de underdog
  UNDERDOG_THRESHOLD: 150, // Odds +150 ou mais = underdog
  UNDERDOG_MULTIPLIER_BASE: 1.3, // +150 a +299
  UNDERDOG_MULTIPLIER_MID: 1.5, // +300 a +499
  UNDERDOG_MULTIPLIER_HIGH: 2.0, // +500+
};

// Configuracao dos niveis
export const NIVEL_CONFIG: Record<NivelUsuario, { icone: string; cor: string; xp_necessario: number }> = {
  iniciante: { icone: '🥊', cor: '#808080', xp_necessario: 100 },
  amateur: { icone: '🥋', cor: '#CD7F32', xp_necessario: 500 },
  contender: { icone: '💪', cor: '#C0C0C0', xp_necessario: 1500 },
  challenger: { icone: '⚔️', cor: '#FFD700', xp_necessario: 3500 },
  elite: { icone: '🔥', cor: '#E5C100', xp_necessario: 7000 },
  champion: { icone: '🏆', cor: '#FF4500', xp_necessario: 15000 },
  legend: { icone: '👑', cor: '#9400D3', xp_necessario: 999999 },
};

// =============================================
// Requests/Responses da API
// =============================================

export interface CriarLigaRequest {
  nome: string;
  descricao?: string;
  tipo: TipoLiga;
  max_membros?: number;
  apenas_main_card?: boolean;
  mostrar_picks_antes?: boolean;
}

export interface EntrarLigaRequest {
  codigo_convite: string;
}

export interface EnviarMensagemRequest {
  mensagem: string;
}

export interface FazerPrevisaoRequest {
  previsoes: PrevisaoInput[];
}

export interface RegistroArenaRequest {
  username: string;
  email: string;
  senha: string;
  display_name?: string;
}

export interface LoginArenaRequest {
  email: string;
  senha: string;
}

export interface AtualizarPerfilRequest {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  picks_publicos?: boolean;
  notificacoes_ativas?: boolean;
}
