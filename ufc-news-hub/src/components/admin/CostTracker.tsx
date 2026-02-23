'use client';

import { useState, useEffect, useMemo } from 'react';
import { DollarSign, Loader2, Zap, Cpu } from 'lucide-react';
import { AgentIcon } from './AgentIcon';
import { useAdminAuth } from './AdminAuthContext';

interface AgentCost {
  agentId: string;
  humanName: string;
  codename: string;
  icon: string;
  color: string;
  model: string;
  tasks: number;
  tokensInput: number;
  tokensOutput: number;
  costUsd: number;
}

interface CostData {
  period: string;
  totalCost: number;
  totalTokensInput: number;
  totalTokensOutput: number;
  totalTasks: number;
  byAgent: AgentCost[];
}

interface ModelGroup {
  model: string;
  displayName: string;
  colorClass: string;
  inputPrice: number;   // per MTok
  outputPrice: number;  // per MTok
  totalCost: number;
  tokensInput: number;
  tokensOutput: number;
  tasks: number;
  agentCount: number;
}

const MODEL_META: Record<string, { displayName: string; colorClass: string; inputPrice: number; outputPrice: number }> = {
  'opus-4.6':   { displayName: 'Claude Opus 4.6',   colorClass: 'text-red-400',   inputPrice: 15,   outputPrice: 75 },
  'sonnet-4.5': { displayName: 'Claude Sonnet 4.5', colorClass: 'text-blue-400',  inputPrice: 3,    outputPrice: 15 },
  'haiku-4.5':  { displayName: 'Claude Haiku 4.5',  colorClass: 'text-green-400', inputPrice: 0.25, outputPrice: 1.25 },
};

function getModelMeta(model: string) {
  // Try exact match first, then partial
  if (MODEL_META[model]) return MODEL_META[model];
  const lower = model.toLowerCase();
  if (lower.includes('opus'))   return MODEL_META['opus-4.6'];
  if (lower.includes('sonnet')) return MODEL_META['sonnet-4.5'];
  if (lower.includes('haiku'))  return MODEL_META['haiku-4.5'];
  return { displayName: model || 'Desconhecido', colorClass: 'text-dark-textMuted', inputPrice: 0, outputPrice: 0 };
}

export function CostTracker() {
  const { authFetch } = useAdminAuth();
  const [costs, setCosts] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(24);

  useEffect(() => {
    setLoading(true);
    authFetch(`/api/company/costs?hours=${hours}`)
      .then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then((data) => setCosts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [hours, authFetch]);

  // Group costs by model
  const modelGroups = useMemo<ModelGroup[]>(() => {
    if (!costs) return [];
    const map = new Map<string, ModelGroup>();

    for (const agent of costs.byAgent) {
      const meta = getModelMeta(agent.model);
      const key = meta.displayName; // group by display name to merge aliases

      if (!map.has(key)) {
        map.set(key, {
          model: agent.model,
          displayName: meta.displayName,
          colorClass: meta.colorClass,
          inputPrice: meta.inputPrice,
          outputPrice: meta.outputPrice,
          totalCost: 0,
          tokensInput: 0,
          tokensOutput: 0,
          tasks: 0,
          agentCount: 0,
        });
      }

      const group = map.get(key)!;
      group.totalCost += agent.costUsd;
      group.tokensInput += agent.tokensInput;
      group.tokensOutput += agent.tokensOutput;
      group.tasks += agent.tasks;
      group.agentCount += 1;
    }

    // Sort by cost descending
    return [...map.values()].sort((a, b) => b.totalCost - a.totalCost);
  }, [costs]);

  if (loading) {
    return (
      <div className="neu-card p-4">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-4 h-4 animate-spin text-ufc-red" />
        </div>
      </div>
    );
  }

  if (!costs) return null;

  const totalCost = costs.totalCost || 1; // avoid divide by zero

  return (
    <div className="neu-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-dark-text text-sm font-bold flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-400" />
          Custos
        </h3>
        <div className="flex gap-1">
          {[24, 168, 720].map((h) => (
            <button
              key={h}
              onClick={() => setHours(h)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                hours === h
                  ? 'neu-button text-dark-text'
                  : 'text-dark-textMuted hover:text-dark-text'
              }`}
            >
              {h === 24 ? '24h' : h === 168 ? '7d' : '30d'}
            </button>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="neu-inset rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-dark-textMuted text-xs">Total</span>
          <span className="text-green-400 text-lg font-bold">
            ${costs.totalCost.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-dark-textMuted text-[10px]">
            {costs.totalTasks} tasks
          </span>
          <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" />
            {((costs.totalTokensInput + costs.totalTokensOutput) / 1000).toFixed(0)}k tokens
          </span>
        </div>
        {/* Model distribution bar chart */}
        {modelGroups.length > 0 && (
          <>
            <div className="flex h-2 rounded-full overflow-hidden bg-dark-bg mt-2">
              {modelGroups.map((g) => (
                <div
                  key={g.displayName}
                  className={`${g.colorClass.replace('text-', 'bg-')} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                  style={{ width: `${(g.totalCost / totalCost) * 100}%` }}
                  title={`${g.displayName}: $${g.totalCost.toFixed(2)} (${((g.totalCost / totalCost) * 100).toFixed(0)}%)`}
                />
              ))}
            </div>
            <div className="mt-1.5 text-[10px] leading-relaxed">
              {modelGroups.map((g, i) => (
                <span key={g.displayName}>
                  {i > 0 && <span className="text-dark-textMuted"> · </span>}
                  <span className={g.colorClass}>{g.displayName.replace('Claude ', '')}:</span>{' '}
                  <span className="text-dark-textMuted">
                    {((g.totalCost / totalCost) * 100).toFixed(0)}%
                  </span>
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* By Model */}
      {modelGroups.length > 0 && (
        <div className="mb-3">
          <h4 className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Cpu className="w-3 h-3" />
            Por Modelo
          </h4>
          <div className="space-y-2">
            {modelGroups.map((group) => (
              <div
                key={group.displayName}
                className="neu-inset rounded-lg p-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${group.colorClass}`}>
                    {group.displayName}
                  </span>
                  <span className="text-green-400 text-xs font-bold">
                    ${group.totalCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-textMuted text-[10px]">
                    ${group.inputPrice}/{group.outputPrice} per MTok
                  </span>
                  <span className="text-dark-textMuted text-[10px]">
                    {group.agentCount} agente{group.agentCount !== 1 ? 's' : ''} · {group.tasks} task{group.tasks !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-dark-textMuted text-[10px] mt-0.5">
                  {(group.tokensInput / 1000).toFixed(0)}k in · {(group.tokensOutput / 1000).toFixed(0)}k out
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* By Agent */}
      <div>
        <h4 className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider mb-2">
          Por Agente
        </h4>
        <div className="space-y-1.5">
          {costs.byAgent.map((agent) => {
            const meta = getModelMeta(agent.model);
            return (
              <div
                key={agent.agentId}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-dark-cardHover/30 transition-colors"
              >
                <span style={{ color: agent.color }} className="shrink-0">
                  <AgentIcon name={agent.icon} className="w-3.5 h-3.5" />
                </span>
                <span className="text-dark-text text-xs flex-1 truncate">
                  {agent.humanName}
                </span>
                <span className={`text-[10px] ${meta.colorClass} opacity-70`}>
                  {meta.displayName.replace('Claude ', '')}
                </span>
                <span className="text-dark-textMuted text-[10px]">{agent.tasks}t</span>
                <span className="text-green-400 text-xs font-medium">
                  ${agent.costUsd.toFixed(2)}
                </span>
              </div>
            );
          })}
          {costs.byAgent.length === 0 && (
            <p className="text-dark-textMuted text-xs text-center py-4">
              Nenhum custo registrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
