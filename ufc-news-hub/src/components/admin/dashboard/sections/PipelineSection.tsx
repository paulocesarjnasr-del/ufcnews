'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  GitBranch,
  CheckCircle2,
  Circle,
  FileText,
  Swords,
  Scale,
  Trophy,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';

interface PipelineItem {
  id: string;
  label: string;
  descricao: string;
  icon: LucideIcon;
  done: boolean;
}

const PIPELINE_STEPS: Omit<PipelineItem, 'done'>[] = [
  {
    id: 'analise',
    label: 'Analise Pre-Fight',
    descricao: 'Analise completa do card enviada ao cliente',
    icon: FileText,
  },
  {
    id: 'arena',
    label: 'Abertura do Arena',
    descricao: 'Liga aberta para espectadores do cliente',
    icon: Swords,
  },
  {
    id: 'weighins',
    label: 'Analise Weigh-Ins',
    descricao: 'Analise pos pesagem enviada ao cliente',
    icon: Scale,
  },
  {
    id: 'pos_card',
    label: 'Analise Pos Card',
    descricao: 'Analise pos evento + Creator Kit enviados',
    icon: Trophy,
  },
];

const STORAGE_KEY = 'pipeline-clientes-checklist';

function getSegundaDaSemana(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

function loadState(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { semana: string; checks: Record<string, boolean> };
    // Reset if it's a new week
    if (parsed.semana !== getSegundaDaSemana()) return {};
    return parsed.checks;
  } catch {
    return {};
  }
}

function saveState(checks: Record<string, boolean>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    semana: getSegundaDaSemana(),
    checks,
  }));
}

export function PipelineSection() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecks(loadState());
    setMounted(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveState(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const empty: Record<string, boolean> = {};
    saveState(empty);
    setChecks(empty);
  }, []);

  const items: PipelineItem[] = PIPELINE_STEPS.map((step) => ({
    ...step,
    done: checks[step.id] || false,
  }));

  const completedCount = items.filter((i) => i.done).length;
  const totalSteps = items.length;
  const percentual = Math.round((completedCount / totalSteps) * 100);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="h-5 w-5 text-ufc-red" />
            <h2 className="font-display text-2xl text-white tracking-wide">Pipeline Clientes</h2>
          </div>
          <p className="text-sm text-gray-500">
            Checklist semanal de entregas para clientes. Reseta automaticamente toda segunda.
          </p>
        </div>
        <button
          onClick={resetAll}
          className="neu-button px-3 py-2 text-sm text-gray-400 hover:text-ufc-red transition-colors flex items-center gap-2"
          title="Resetar checklist"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Progress */}
      <div className="neu-card p-5 border border-ufc-red/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Semana Atual</p>
            <p className="text-white font-semibold">
              {new Date(getSegundaDaSemana() + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              {' - '}
              {(() => {
                const d = new Date(getSegundaDaSemana() + 'T12:00:00');
                d.setDate(d.getDate() + 6);
                return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
              })()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{completedCount}/{totalSteps}</p>
            <p className="text-xs text-gray-500">concluidos</p>
          </div>
        </div>
        <div className="w-full h-3 bg-[#1e1e2e] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentual === 100 ? 'bg-emerald-500' : 'bg-ufc-red'
            }`}
            style={{ width: `${percentual}%` }}
          />
        </div>
        {percentual === 100 && (
          <p className="text-xs text-emerald-400 font-semibold mt-2 text-center">
            Todas as entregas da semana concluidas!
          </p>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isDone = item.done;

          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`w-full text-left flex items-start gap-4 transition-all ${
                isDone ? 'opacity-80' : ''
              }`}
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isDone
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-[#2a2a3a] bg-[#12121a] hover:border-ufc-red/30'
                }`}>
                  {isDone
                    ? <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    : <Icon className="w-5 h-5 text-gray-500" />
                  }
                </div>
                {index < items.length - 1 && (
                  <div className={`w-0.5 h-6 mt-1 transition-colors ${
                    isDone ? 'bg-emerald-500/30' : 'bg-[#1e1e2e]'
                  }`} />
                )}
              </div>

              {/* Content */}
              <div className={`neu-card p-4 flex-1 border transition-all duration-300 ${
                isDone
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-[#1e1e2e] hover:border-ufc-red/20'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-semibold transition-colors ${
                    isDone ? 'text-emerald-300' : 'text-white'
                  }`}>
                    {item.label}
                  </h4>
                  <span className={`text-[10px] font-bold uppercase ${
                    isDone ? 'text-emerald-400' : 'text-gray-600'
                  }`}>
                    {isDone ? 'CONCLUIDO' : 'PENDENTE'}
                  </span>
                </div>
                <p className={`text-xs ${isDone ? 'text-gray-500 line-through' : 'text-gray-400'}`}>
                  {item.descricao}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="neu-inset p-4 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">
          Clique em cada etapa para marcar como concluida. O checklist reseta automaticamente toda segunda-feira.
        </p>
      </div>
    </div>
  );
}
