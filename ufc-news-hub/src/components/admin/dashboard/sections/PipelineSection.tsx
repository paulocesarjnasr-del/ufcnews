'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../AdminAuthContext';
import {
  GitBranch,
  CheckCircle2,
  Circle,
  Loader2,
  RefreshCw,
  AlertCircle,
  Search,
  Swords,
  ShieldCheck,
  FileText,
  type LucideIcon,
} from 'lucide-react';

interface PipelineStep {
  id: string;
  nome: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  detalhes: string;
}

interface PipelineData {
  evento: {
    id: string;
    nome: string;
    data: string;
    status: string;
  } | null;
  steps: PipelineStep[];
  message?: string;
}

const STEP_ICONS: Record<string, LucideIcon> = {
  'card-scraper': Search,
  'fight-analyst-main': Swords,
  'fight-analyst-prelims': Swords,
  'card-validator': ShieldCheck,
  'event-page': FileText,
};

function getStatusColor(status: PipelineStep['status']) {
  switch (status) {
    case 'completed': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5';
    case 'running': return 'text-blue-400 border-blue-400/30 bg-blue-400/5';
    case 'pending': return 'text-gray-500 border-[#1e1e2e] bg-transparent';
    case 'failed': return 'text-red-400 border-red-400/30 bg-red-400/5';
  }
}

function getStatusIcon(status: PipelineStep['status']) {
  switch (status) {
    case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    case 'running': return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
    case 'pending': return <Circle className="w-5 h-5 text-gray-600" />;
    case 'failed': return <AlertCircle className="w-5 h-5 text-red-400" />;
  }
}

export function PipelineSection() {
  const { authFetch } = useAdminAuth();
  const [data, setData] = useState<PipelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPipeline = useCallback(async () => {
    try {
      const res = await authFetch('/api/admin/pipeline');
      if (!res.ok) throw new Error('Falha ao buscar pipeline');
      const result: PipelineData = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

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
        <button onClick={() => { setLoading(true); fetchPipeline(); }} className="neu-button px-4 py-2 text-sm text-ufc-red">
          Tentar novamente
        </button>
      </div>
    );
  }

  const completedCount = data?.steps.filter(s => s.status === 'completed').length || 0;
  const totalSteps = data?.steps.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="h-5 w-5 text-ufc-red" />
            <h2 className="font-display text-2xl text-white tracking-wide">Pipeline Semanal</h2>
          </div>
          <p className="text-sm text-gray-500">
            Status do pipeline de analises para o proximo evento.
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchPipeline(); }}
          className="neu-button px-3 py-2 text-sm text-gray-400 hover:text-ufc-red transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Event Info */}
      {data?.evento ? (
        <div className="neu-card p-5 border border-ufc-red/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Evento Alvo</p>
              <p className="text-white font-semibold">{data.evento.nome}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(data.evento.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">{completedCount}/{totalSteps} etapas</p>
              <div className="w-32 h-2 bg-[#1e1e2e] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-ufc-red rounded-full transition-all duration-500"
                  style={{ width: totalSteps > 0 ? `${(completedCount / totalSteps) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="neu-card p-8 text-center">
          <p className="text-gray-500">{data?.message || 'Nenhum evento proximo encontrado'}</p>
        </div>
      )}

      {/* Pipeline Steps */}
      {data?.steps && data.steps.length > 0 && (
        <div className="space-y-3">
          {data.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.id] || Circle;
            const colorClasses = getStatusColor(step.status);

            return (
              <div key={step.id} className="flex items-start gap-4">
                {/* Connector line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${colorClasses}`}>
                    {step.status === 'completed' || step.status === 'failed'
                      ? getStatusIcon(step.status)
                      : step.status === 'running'
                      ? getStatusIcon(step.status)
                      : <Icon className="w-5 h-5" />
                    }
                  </div>
                  {index < data.steps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${
                      step.status === 'completed' ? 'bg-emerald-400/30' : 'bg-[#1e1e2e]'
                    }`} />
                  )}
                </div>

                {/* Step content */}
                <div className={`neu-card p-4 flex-1 border ${
                  step.status === 'completed' ? 'border-emerald-400/10' :
                  step.status === 'running' ? 'border-blue-400/20' :
                  step.status === 'failed' ? 'border-red-400/20' :
                  'border-[#1e1e2e]'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white">{step.nome}</h4>
                    <span className={`text-[10px] font-bold uppercase ${
                      step.status === 'completed' ? 'text-emerald-400' :
                      step.status === 'running' ? 'text-blue-400' :
                      step.status === 'failed' ? 'text-red-400' :
                      'text-gray-600'
                    }`}>
                      {step.status === 'completed' ? 'CONCLUIDO' :
                       step.status === 'running' ? 'EM ANDAMENTO' :
                       step.status === 'failed' ? 'FALHOU' :
                       'PENDENTE'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{step.detalhes}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
