import { query, queryOne } from '@/lib/db';
import type {
  Cliente,
  ClienteEntrega,
  ClienteComProgresso,
  CreateClientePayload,
  UpdateClientePayload,
  ChecklistTemplate,
  DiaSemana,
} from '@/lib/clientes-types';

// ═══════════════════════════════════════════════════════════
// Checklist Template - Ciclo semanal padrao
// ═══════════════════════════════════════════════════════════

const CHECKLIST_TEMPLATE: ChecklistTemplate[] = [
  // Segunda
  { dia_semana: 'segunda', tipo_entrega: 'analise_pre_fight', titulo: 'Enviar analise pre-fight ao cliente' },
  { dia_semana: 'segunda', tipo_entrega: 'arena_abertura', titulo: 'Abrir Arena / Liga para espectadores' },
  // Terca
  { dia_semana: 'terca', tipo_entrega: 'email_picks', titulo: 'Enviar email para membros completarem picks' },
  { dia_semana: 'terca', tipo_entrega: 'conteudo_sugestoes', titulo: 'Enviar sugestoes de conteudo ao cliente' },
  // Quarta
  { dia_semana: 'quarta', tipo_entrega: 'email_polls', titulo: 'Enviar email com enquetes para membros da liga' },
  { dia_semana: 'quarta', tipo_entrega: 'conteudo_atualizacao', titulo: 'Atualizar sugestoes de conteudo' },
  // Quinta
  { dia_semana: 'quinta', tipo_entrega: 'email_lembrete', titulo: 'Enviar lembrete final de picks' },
  // Sexta
  { dia_semana: 'sexta', tipo_entrega: 'analise_pos_weighin', titulo: 'Enviar analise pos weigh-in ao cliente' },
  // Sabado
  { dia_semana: 'sabado', tipo_entrega: 'alerta_ao_vivo', titulo: 'Enviar alerta para acompanhar Arena ao vivo' },
  { dia_semana: 'sabado', tipo_entrega: 'arena_live', titulo: 'Ativar modo ao vivo na Arena' },
  // Domingo
  { dia_semana: 'domingo', tipo_entrega: 'analise_pos_fight', titulo: 'Enviar analise pos-fight ao cliente' },
  { dia_semana: 'domingo', tipo_entrega: 'creator_kit', titulo: 'Enviar creator kit ao cliente' },
];

// ═══════════════════════════════════════════════════════════
// Date Helpers
// ═══════════════════════════════════════════════════════════

const DIA_INDEX: Record<DiaSemana, number> = {
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6,
  domingo: 0,
};

const DIA_LABELS: Record<DiaSemana, string> = {
  segunda: 'Segunda',
  terca: 'Terca',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
  sabado: 'Sabado',
  domingo: 'Domingo',
};

export { DIA_LABELS, CHECKLIST_TEMPLATE };

/** Returns the Monday (YYYY-MM-DD) of the week containing the given date */
export function getSegundaDaSemana(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

/** Check if a dia_semana has passed relative to today */
export function diaJaPassou(diaSemana: DiaSemana, semanaInicio: string): boolean {
  const hoje = new Date();
  const segunda = new Date(semanaInicio);
  const diaIndex = DIA_INDEX[diaSemana];
  const offset = diaIndex === 0 ? 6 : diaIndex - 1;
  const targetDate = new Date(segunda);
  targetDate.setDate(segunda.getDate() + offset);
  return hoje > targetDate;
}

// ═══════════════════════════════════════════════════════════
// DB Setup
// ═══════════════════════════════════════════════════════════

export async function ensureClientesTables(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      telefone VARCHAR(50),
      tipo VARCHAR(50) DEFAULT 'creator',
      plano VARCHAR(50) DEFAULT 'basico',
      status VARCHAR(30) DEFAULT 'ativo',
      notas TEXT,
      arena_liga_id UUID,
      contato_nome VARCHAR(255),
      redes_sociais JSONB DEFAULT '{}',
      config JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS cliente_entregas (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
      semana_inicio DATE NOT NULL,
      dia_semana VARCHAR(20) NOT NULL,
      tipo_entrega VARCHAR(100) NOT NULL,
      titulo VARCHAR(500) NOT NULL,
      status VARCHAR(30) DEFAULT 'pendente',
      concluido_em TIMESTAMPTZ,
      concluido_por VARCHAR(255),
      notas TEXT,
      dados JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_clientes_status ON clientes (status)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_clientes_created ON clientes (created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_entregas_cliente ON cliente_entregas (cliente_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_entregas_semana ON cliente_entregas (semana_inicio)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_entregas_cliente_semana ON cliente_entregas (cliente_id, semana_inicio)`);
}

// ═══════════════════════════════════════════════════════════
// CRUD - Clientes
// ═══════════════════════════════════════════════════════════

export async function listarClientes(filtros?: {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ clientes: ClienteComProgresso[]; total: number }> {
  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIdx = 1;

  if (filtros?.status) {
    conditions.push(`c.status = $${paramIdx++}`);
    params.push(filtros.status);
  }

  if (filtros?.search) {
    conditions.push(`(c.nome ILIKE $${paramIdx} OR c.email ILIKE $${paramIdx} OR c.contato_nome ILIKE $${paramIdx})`);
    params.push(`%${filtros.search}%`);
    paramIdx++;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const limit = filtros?.limit || 50;
  const offset = filtros?.offset || 0;

  const semanaAtual = getSegundaDaSemana();

  const [clientes, countResult] = await Promise.all([
    query<ClienteComProgresso>(
      `SELECT c.*,
        COALESCE(e.total, 0)::int AS entregas_total,
        COALESCE(e.concluidas, 0)::int AS entregas_concluidas
      FROM clientes c
      LEFT JOIN (
        SELECT cliente_id,
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE status = 'concluido')::int AS concluidas
        FROM cliente_entregas
        WHERE semana_inicio = $${paramIdx}
        GROUP BY cliente_id
      ) e ON e.cliente_id = c.id
      ${where}
      ORDER BY c.created_at DESC
      LIMIT $${paramIdx + 1} OFFSET $${paramIdx + 2}`,
      [...params, semanaAtual, limit, offset]
    ),
    query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM clientes c ${where}`,
      params
    ),
  ]);

  return {
    clientes,
    total: parseInt(countResult[0]?.count || '0', 10),
  };
}

export async function buscarCliente(id: string): Promise<Cliente | null> {
  return queryOne<Cliente>(
    'SELECT * FROM clientes WHERE id = $1',
    [id]
  );
}

export async function criarCliente(payload: CreateClientePayload): Promise<Cliente> {
  const result = await queryOne<Cliente>(
    `INSERT INTO clientes (nome, email, telefone, tipo, plano, notas, arena_liga_id, contato_nome, redes_sociais)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      payload.nome,
      payload.email || null,
      payload.telefone || null,
      payload.tipo || 'creator',
      payload.plano || 'basico',
      payload.notas || null,
      payload.arena_liga_id || null,
      payload.contato_nome || null,
      JSON.stringify(payload.redes_sociais || {}),
    ]
  );

  if (!result) throw new Error('Falha ao criar cliente');
  return result;
}

export async function atualizarCliente(id: string, payload: UpdateClientePayload): Promise<Cliente | null> {
  const sets: string[] = [];
  const params: unknown[] = [];
  let idx = 1;

  if (payload.nome !== undefined) { sets.push(`nome = $${idx++}`); params.push(payload.nome); }
  if (payload.email !== undefined) { sets.push(`email = $${idx++}`); params.push(payload.email); }
  if (payload.telefone !== undefined) { sets.push(`telefone = $${idx++}`); params.push(payload.telefone); }
  if (payload.tipo !== undefined) { sets.push(`tipo = $${idx++}`); params.push(payload.tipo); }
  if (payload.plano !== undefined) { sets.push(`plano = $${idx++}`); params.push(payload.plano); }
  if (payload.status !== undefined) { sets.push(`status = $${idx++}`); params.push(payload.status); }
  if (payload.notas !== undefined) { sets.push(`notas = $${idx++}`); params.push(payload.notas); }
  if (payload.arena_liga_id !== undefined) { sets.push(`arena_liga_id = $${idx++}`); params.push(payload.arena_liga_id); }
  if (payload.contato_nome !== undefined) { sets.push(`contato_nome = $${idx++}`); params.push(payload.contato_nome); }
  if (payload.redes_sociais !== undefined) { sets.push(`redes_sociais = $${idx++}`); params.push(JSON.stringify(payload.redes_sociais)); }

  if (sets.length === 0) return buscarCliente(id);

  sets.push(`updated_at = NOW()`);
  params.push(id);

  return queryOne<Cliente>(
    `UPDATE clientes SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`,
    params
  );
}

export async function deletarCliente(id: string): Promise<boolean> {
  const result = await queryOne<Cliente>(
    `UPDATE clientes SET status = 'cancelado', updated_at = NOW() WHERE id = $1 RETURNING id`,
    [id]
  );
  return result !== null;
}

// ═══════════════════════════════════════════════════════════
// Checklist - Entregas Semanais
// ═══════════════════════════════════════════════════════════

export async function buscarChecklist(
  clienteId: string,
  semanaInicio: string
): Promise<ClienteEntrega[]> {
  const existing = await query<ClienteEntrega>(
    `SELECT * FROM cliente_entregas
     WHERE cliente_id = $1 AND semana_inicio = $2
     ORDER BY CASE dia_semana
       WHEN 'segunda' THEN 1
       WHEN 'terca' THEN 2
       WHEN 'quarta' THEN 3
       WHEN 'quinta' THEN 4
       WHEN 'sexta' THEN 5
       WHEN 'sabado' THEN 6
       WHEN 'domingo' THEN 7
     END, tipo_entrega`,
    [clienteId, semanaInicio]
  );

  if (existing.length > 0) return existing;

  // Auto-generate from template
  return gerarChecklistSemana(clienteId, semanaInicio);
}

async function gerarChecklistSemana(
  clienteId: string,
  semanaInicio: string
): Promise<ClienteEntrega[]> {
  const entregas: ClienteEntrega[] = [];

  for (const item of CHECKLIST_TEMPLATE) {
    const row = await queryOne<ClienteEntrega>(
      `INSERT INTO cliente_entregas (cliente_id, semana_inicio, dia_semana, tipo_entrega, titulo, status)
       VALUES ($1, $2, $3, $4, $5, 'pendente')
       RETURNING *`,
      [clienteId, semanaInicio, item.dia_semana, item.tipo_entrega, item.titulo]
    );
    if (row) entregas.push(row);
  }

  return entregas;
}

export async function atualizarEntrega(
  entregaId: string,
  status: string,
  notas?: string
): Promise<ClienteEntrega | null> {
  const concluido = status === 'concluido' ? 'NOW()' : 'NULL';

  return queryOne<ClienteEntrega>(
    `UPDATE cliente_entregas
     SET status = $1,
         concluido_em = ${concluido},
         notas = COALESCE($2, notas),
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [status, notas || null, entregaId]
  );
}
