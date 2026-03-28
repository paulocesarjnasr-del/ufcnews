// ═══════════════════════════════════════════════════════════
// Types for the Client Management System
// ═══════════════════════════════════════════════════════════

export type TipoCliente = 'creator' | 'empresa' | 'agencia';
export type PlanoCliente = 'basico' | 'pro' | 'enterprise';
export type StatusCliente = 'ativo' | 'pausado' | 'cancelado' | 'trial';
export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';
export type StatusEntrega = 'pendente' | 'em_progresso' | 'concluido' | 'pulado' | 'atrasado';

export interface RedesSociais {
  instagram?: string;
  youtube?: string;
  twitter?: string;
  tiktok?: string;
  website?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  tipo: TipoCliente;
  plano: PlanoCliente;
  status: StatusCliente;
  notas: string | null;
  arena_liga_id: string | null;
  contato_nome: string | null;
  redes_sociais: RedesSociais;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ClienteEntrega {
  id: string;
  cliente_id: string;
  semana_inicio: string;
  dia_semana: DiaSemana;
  tipo_entrega: string;
  titulo: string;
  status: StatusEntrega;
  concluido_em: string | null;
  concluido_por: string | null;
  notas: string | null;
  dados: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ChecklistTemplate {
  dia_semana: DiaSemana;
  tipo_entrega: string;
  titulo: string;
}

export interface ClienteComProgresso extends Cliente {
  entregas_total: number;
  entregas_concluidas: number;
}

export interface CreateClientePayload {
  nome: string;
  email?: string;
  telefone?: string;
  tipo?: TipoCliente;
  plano?: PlanoCliente;
  notas?: string;
  arena_liga_id?: string;
  contato_nome?: string;
  redes_sociais?: RedesSociais;
}

export interface UpdateClientePayload {
  nome?: string;
  email?: string;
  telefone?: string;
  tipo?: TipoCliente;
  plano?: PlanoCliente;
  status?: StatusCliente;
  notas?: string;
  arena_liga_id?: string;
  contato_nome?: string;
  redes_sociais?: RedesSociais;
}

export interface UpdateEntregaPayload {
  entrega_id: string;
  status: StatusEntrega;
  notas?: string;
}
