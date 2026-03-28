'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../AdminAuthContext';
import {
  Users,
  Calendar,
  CheckCircle2,
  Bot,
  Loader2,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

interface OverviewStats {
  clientes: { ativos: number; total: number };
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
  agentes: { total: number; ativos: number };
}

export function OverviewSection() {
  const { authFetch } = useAdminAuth();
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await authFetch('/api/admin/overview');
      if (!res.ok) throw new Error('Falha ao buscar overview');
      const data: OverviewStats = await res.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-ufc-red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => { setLoading(true); fetchStats(); }} className="neu-button px-4 py-2 text-sm text-ufc-red">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      label: 'Clientes Ativos',
      value: stats.clientes.ativos,
      sub: `${stats.clientes.total} total`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Proximo Evento',
      value: stats.proximo_evento ? stats.proximo_evento.dias_restantes : '-',
      sub: stats.proximo_evento
        ? `${stats.proximo_evento.nome}`
        : 'Nenhum agendado',
      icon: Calendar,
      color: 'text-ufc-red',
      bgColor: 'bg-ufc-red/10',
      borderColor: 'border-ufc-red/20',
      suffix: stats.proximo_evento ? ' dias' : '',
    },
    {
      label: 'Checklist Semanal',
      value: `${stats.checklist_semana.percentual}%`,
      sub: `${stats.checklist_semana.concluidos}/${stats.checklist_semana.total} entregas`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      label: 'AI Agentes',
      value: stats.agentes.ativos,
      sub: `${stats.agentes.total} total`,
      icon: Bot,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-white tracking-wide">Painel de Controle</h2>
          <p className="text-sm text-gray-500 mt-1">Visao geral do negocio</p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchStats(); }}
          className="neu-button px-3 py-2 text-sm text-gray-400 hover:text-ufc-red transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`neu-card p-5 border ${card.borderColor} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {card.value}{card.suffix || ''}
              </div>
              <div className="text-xs text-gray-500 mt-1">{card.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Event Detail */}
      {stats.proximo_evento && (
        <div className="neu-card p-6 border border-ufc-red/10">
          <h3 className="font-display text-lg text-white mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-ufc-red" />
            Proximo Evento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Evento</div>
              <div className="text-white font-semibold">{stats.proximo_evento.nome}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Data</div>
              <div className="text-white">{new Date(stats.proximo_evento.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Local</div>
              <div className="text-white">{stats.proximo_evento.local || 'TBD'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="neu-card p-6">
        <h3 className="font-display text-lg text-white mb-4">Acoes Rapidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Novo Cliente', section: 'clientes' as const },
            { label: 'Verificar Card', section: 'card-monitor' as const },
            { label: 'Status Pipeline', section: 'pipeline' as const },
          ].map((action) => (
            <a
              key={action.label}
              href={`/admin?section=${action.section}`}
              className="neu-button px-4 py-3 text-sm text-gray-300 hover:text-white flex items-center justify-between transition-colors"
            >
              {action.label}
              <ArrowRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
