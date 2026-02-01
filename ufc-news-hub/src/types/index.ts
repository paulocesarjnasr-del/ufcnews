export type CategoriaNoticia = 'lutadores' | 'lutas' | 'backstage';

export interface Lutador {
  id: string;
  nome: string;
  apelido: string | null;
  categoria_peso: string | null;
  url_perfil: string | null;
  imagem_url: string | null;
  ativo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Noticia {
  id: string;
  titulo: string;
  subtitulo: string | null;
  conteudo_completo: string | null;
  imagem_url: string | null;
  fonte_url: string;
  fonte_nome: string;
  categoria: CategoriaNoticia;
  hash_deduplicacao: string;
  eh_sobre_ufc: boolean;
  visualizacoes: number;
  publicado_em: Date;
  created_at: Date;
}

export interface NoticiaComLutadores extends Noticia {
  lutadores: Lutador[];
}

export interface NoticiaEntidade {
  id: string;
  noticia_id: string;
  lutador_id: string;
  tipo_mencao: string;
  created_at: Date;
}

export interface SyncLog {
  id: string;
  started_at: Date;
  finished_at: Date | null;
  noticias_processadas: number;
  noticias_adicionadas: number;
  noticias_duplicadas: number;
  noticias_rejeitadas: number;
  erro: string | null;
  status: 'running' | 'completed' | 'error';
}

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  enclosure?: {
    url: string;
    type?: string;
    length?: string;
  };
  content?: string;
  contentSnippet?: string;
}

export interface ClassificationResult {
  eh_ufc: boolean;
  lutadores_mencionados: string[];
  categoria: CategoriaNoticia;
  subtitulo: string;
}

export interface DeduplicationResult {
  isDuplicate: boolean;
  reason?: 'hash_exato' | 'mesmo_evento';
  hash: string;
}

export interface SyncResult {
  success: boolean;
  processadas: number;
  adicionadas: number;
  duplicadas: number;
  rejeitadas: number;
  error?: string;
}

export interface NoticiasPaginadas {
  noticias: Noticia[];
  total: number;
  pagina: number;
  porPagina: number;
  totalPaginas: number;
}

export interface ContadorCategorias {
  todas: number;
  lutadores: number;
  lutas: number;
  backstage: number;
}

// Tipos para Sistema de Comentários
export type StatusComentario = 'pendente' | 'aprovado' | 'rejeitado';

export interface Comentario {
  id: string;
  noticia_id: string;
  parent_id: string | null;
  autor_nome: string;
  autor_email: string | null;
  conteudo: string;
  status: StatusComentario;
  reportado_count: number;
  created_at: string;
  depth?: number;
}

export interface ComentarioComRespostas extends Comentario {
  respostas: ComentarioComRespostas[];
}

export interface NovoComentario {
  noticia_id: string;
  parent_id?: string;
  autor_nome: string;
  autor_email?: string;
  conteudo: string;
  fingerprint: string;
}

export interface ComentariosPaginados {
  comentarios: ComentarioComRespostas[];
  total: number;
}

// ============================================
// Tipos para Arena de Previsões
// ============================================

export type StatusEvento = 'agendado' | 'ao_vivo' | 'finalizado' | 'cancelado';
export type StatusLuta = 'agendada' | 'ao_vivo' | 'finalizada' | 'cancelada';
export type TipoLuta = 'main_event' | 'co_main' | 'card_principal' | 'preliminar' | 'early_prelim';
export type MetodoVitoria = 'KO/TKO' | 'Submission' | 'Decision - Unanimous' | 'Decision - Split' | 'Decision - Majority' | 'DQ' | 'No Contest' | 'Draw';

export interface Evento {
  id: string;
  nome: string;
  slug: string | null;
  data_evento: string;
  local_evento: string | null;
  cidade: string | null;
  pais: string | null;
  tipo: string;
  status: StatusEvento;
  imagem_url: string | null;
  descricao: string | null;
  onde_assistir: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventoComLutas extends Evento {
  lutas: LutaComLutadores[];
  total_lutas?: number;
}

export interface Luta {
  id: string;
  evento_id: string;
  lutador1_id: string;
  lutador2_id: string;
  categoria_peso: string;
  ordem: number;
  tipo: TipoLuta;
  rounds: number;
  vencedor_id: string | null;
  metodo: MetodoVitoria | null;
  round_final: number | null;
  tempo_final: string | null;
  status: StatusLuta;
  is_titulo: boolean;
  created_at: string;
  updated_at: string;
}

export interface LutaComLutadores extends Luta {
  lutador1: Lutador;
  lutador2: Lutador;
  vencedor?: Lutador | null;
  consenso?: ConsensoPrevisao[];
  total_previsoes?: number;
}

export interface Previsao {
  id: string;
  luta_id: string;
  usuario_fingerprint: string;
  usuario_nome: string;
  lutador_escolhido_id: string;
  metodo_previsto: MetodoVitoria | null;
  round_previsto: number | null;
  pontos_ganhos: number;
  acertou_vencedor: boolean | null;
  acertou_metodo: boolean | null;
  acertou_round: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface PrevisaoComDetalhes extends Previsao {
  lutador_escolhido: Lutador;
  luta?: LutaComLutadores;
}

export interface NovaPrevisao {
  luta_id: string;
  usuario_fingerprint: string;
  usuario_nome: string;
  lutador_escolhido_id: string;
  metodo_previsto?: MetodoVitoria;
  round_previsto?: number;
}

export interface ConsensoPrevisao {
  luta_id: string;
  lutador_escolhido_id: string;
  lutador_nome: string;
  total_votos: number;
  percentual: number;
}

export interface RankingPrevisor {
  id: string;
  usuario_fingerprint: string;
  usuario_nome: string;
  total_previsoes: number;
  acertos_vencedor: number;
  acertos_metodo: number;
  acertos_round: number;
  pontos_total: number;
  taxa_acerto: number;
  melhor_sequencia: number;
  sequencia_atual: number;
  nivel: string;
  badges: string[];
  posicao?: number;
  created_at: string;
  updated_at: string;
}

export interface PerfilPrevisor extends RankingPrevisor {
  previsoes_recentes: PrevisaoComDetalhes[];
  historico_eventos: {
    evento_id: string;
    evento_nome: string;
    total_previsoes: number;
    acertos: number;
    pontos: number;
  }[];
}

// Tipos expandidos para Lutadores
export interface LutadorExpandido extends Lutador {
  pais: string | null;
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
  cidade_natal: string | null;
  data_nascimento: string | null;
}

export interface LutaHistoricoItem {
  id: string;
  evento: {
    id: string;
    nome: string;
    data: string;
  };
  oponente: {
    id: string;
    nome: string;
    apelido: string | null;
    imagem_url: string | null;
  };
  categoria_peso: string;
  resultado: string;
  metodo: string | null;
  round: number | null;
  tempo: string | null;
  status: string;
  is_titulo: boolean;
}

export interface LutadorComHistorico extends LutadorExpandido {
  lutas_recentes: LutaHistoricoItem[];
  record: string;
}

export interface ComparadorLutadores {
  lutador1: LutadorExpandido;
  lutador2: LutadorExpandido;
  confrontos_diretos?: LutaComLutadores[];
}
