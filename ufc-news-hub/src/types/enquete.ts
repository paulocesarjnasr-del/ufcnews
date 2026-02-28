// =============================================
// ENQUETES (Polls) - Tipos TypeScript
// =============================================

export interface Enquete {
  id: string;
  evento_id: string;
  luta_id: string;
  pergunta: string;
  opcao_a_id: string;
  opcao_a_nome: string;
  opcao_b_id: string;
  opcao_b_nome: string;
  ativa: boolean;
  created_at: string;
}

export interface EnqueteComDetalhes extends Enquete {
  opcao_a_foto: string | null;
  opcao_a_apelido: string | null;
  opcao_a_vitorias: number;
  opcao_a_derrotas: number;
  opcao_a_empates: number;
  opcao_b_foto: string | null;
  opcao_b_apelido: string | null;
  opcao_b_vitorias: number;
  opcao_b_derrotas: number;
  opcao_b_empates: number;
  evento_nome: string;
  total_votos: number;
  votos_a: number;
  votos_b: number;
}

export interface VotoEnquete {
  id: string;
  enquete_id: string;
  opcao: 'a' | 'b';
  usuario_id: string | null;
  guest_id: string | null;
  created_at: string;
}

export interface ComentarioEnquete {
  id: string;
  enquete_id: string;
  usuario_id: string | null;
  guest_nome: string | null;
  conteudo: string;
  created_at: string;
  autor_nome: string;
  autor_avatar: string | null;
}

export interface ResultadoEnquete {
  total_votos: number;
  votos_a: number;
  votos_b: number;
  percentual_a: number;
  percentual_b: number;
}
