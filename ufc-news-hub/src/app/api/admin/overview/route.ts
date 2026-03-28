import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-sessions';
import { query } from '@/lib/db';
import { ensureClientesTables, getSegundaDaSemana } from '@/lib/clientes';

// ═══════════════════════════════════════════════════════════
// GET: Aggregated dashboard stats
// ═══════════════════════════════════════════════════════════

interface OverviewStats {
  clientes: {
    ativos: number;
    total: number;
  };
  proximo_evento: {
    nome: string;
    data: string;
    local: string;
    dias_restantes: number;
  } | null;
  checklist_semana: {
    total: number;
    concluidos: number;
    percentual: number;
  };
  agentes: {
    total: number;
    ativos: number;
  };
}

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await ensureClientesTables();
    const semanaAtual = getSegundaDaSemana();

    const [clienteStats, eventoProximo, checklistStats, agenteStats] = await Promise.all([
      // Client stats
      query<{ status: string; count: string }>(
        `SELECT status, COUNT(*)::text AS count FROM clientes GROUP BY status`
      ),
      // Next event
      query<{ nome: string; data_evento: string; local_evento: string }>(
        `SELECT nome, data_evento, local_evento FROM eventos
         WHERE status = 'agendado' AND data_evento >= NOW()
         ORDER BY data_evento ASC LIMIT 1`
      ).catch(() => []),
      // Checklist stats for current week (all clients)
      query<{ total: string; concluidos: string }>(
        `SELECT
          COUNT(*)::text AS total,
          COUNT(*) FILTER (WHERE status = 'concluido')::text AS concluidos
         FROM cliente_entregas
         WHERE semana_inicio = $1`,
        [semanaAtual]
      ),
      // Agent stats
      query<{ total: string; ativos: string }>(
        `SELECT
          COUNT(*)::text AS total,
          COUNT(*) FILTER (WHERE status = 'active')::text AS ativos
         FROM "Agent"`
      ).catch(() => [{ total: '0', ativos: '0' }]),
    ]);

    const totalClientes = clienteStats.reduce((sum, r) => sum + parseInt(r.count, 10), 0);
    const ativosClientes = clienteStats.find(r => r.status === 'ativo');

    const evento = eventoProximo[0] || null;
    let diasRestantes = 0;
    if (evento) {
      const diff = new Date(evento.data_evento).getTime() - Date.now();
      diasRestantes = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    const totalChecklist = parseInt(checklistStats[0]?.total || '0', 10);
    const concluidosChecklist = parseInt(checklistStats[0]?.concluidos || '0', 10);

    const stats: OverviewStats = {
      clientes: {
        ativos: parseInt(ativosClientes?.count || '0', 10),
        total: totalClientes,
      },
      proximo_evento: evento
        ? {
            nome: evento.nome,
            data: evento.data_evento,
            local: evento.local_evento,
            dias_restantes: diasRestantes,
          }
        : null,
      checklist_semana: {
        total: totalChecklist,
        concluidos: concluidosChecklist,
        percentual: totalChecklist > 0 ? Math.round((concluidosChecklist / totalChecklist) * 100) : 0,
      },
      agentes: {
        total: parseInt(agenteStats[0]?.total || '0', 10),
        ativos: parseInt(agenteStats[0]?.ativos || '0', 10),
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('[API /admin/overview] GET error:', error);
    return NextResponse.json({ error: 'Erro ao buscar overview' }, { status: 500 });
  }
}
