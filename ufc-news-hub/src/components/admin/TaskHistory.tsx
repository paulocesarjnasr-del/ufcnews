'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
  RefreshCw,
  Coins,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { AgentIcon } from './AgentIcon';

import { useAdminAuth } from './AdminAuthContext';
interface TaskAgent {
  id: string;
  humanName: string;
  codename: string;
  icon: string;
  color: string;
  avatarUrl?: string | null;
}

interface Task {
  id: string;
  agentId: string;
  agent: TaskAgent;
  type: string;
  input: string;
  output: string | null;
  status: string;
  parentTaskId: string | null;
  modelUsed: string | null;
  tokensInput: number | null;
  tokensOutput: number | null;
  durationMs: number | null;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
}

interface TaskHistoryProps {
  agentId?: string; // If provided, only show tasks for this agent
  compact?: boolean; // Compact mode for detail panel tab
}

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  completed: { icon: CheckCircle2, color: 'text-green-400', bg: 'border-green-500/30', label: 'Completo' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'border-red-500/30', label: 'Falhou' },
  running: { icon: Loader2, color: 'text-yellow-400', bg: 'border-yellow-500/30', label: 'Rodando' },
  pending: { icon: Clock, color: 'text-blue-400', bg: 'border-blue-500/30', label: 'Pendente' },
  awaiting_approval: { icon: Clock, color: 'text-orange-400', bg: 'border-orange-500/30', label: 'Aprovação' },
};

function formatDuration(ms: number | null): string {
  if (!ms) return '-';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}min`;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}min atras`;
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h atras`;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function formatTokenCost(input: number | null, output: number | null, model: string | null): string | null {
  if (!input && !output) return null;
  // Approximate costs per 1M tokens (Claude models)
  const costs: Record<string, { input: number; output: number }> = {
    'opus-4.6': { input: 15, output: 75 },
    'sonnet-4.5': { input: 3, output: 15 },
    'haiku-4.5': { input: 0.25, output: 1.25 },
  };
  const rate = costs[model || ''] || costs['sonnet-4.5'];
  const cost = ((input || 0) / 1_000_000) * rate.input + ((output || 0) / 1_000_000) * rate.output;
  if (cost < 0.01) return `<$0.01`;
  return `$${cost.toFixed(2)}`;
}

function TaskCard({ task, compact }: { task: Task; compact?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const statusCfg = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const isRunning = task.status === 'running';

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenTotal = (task.tokensInput || 0) + (task.tokensOutput || 0);
  const cost = formatTokenCost(task.tokensInput, task.tokensOutput, task.modelUsed);

  return (
    <div className={`neu-card border-l-4 ${statusCfg.bg} overflow-hidden`}>
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-cardHover/50 transition-colors"
      >
        <StatusIcon className={`w-4 h-4 ${statusCfg.color} shrink-0 ${isRunning ? 'animate-spin' : ''}`} />

        {!compact && (
          <>
            {task.agent.avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={task.agent.avatarUrl} alt="" className="w-6 h-6 rounded-lg object-cover shrink-0" />
            ) : (
              <span style={{ color: task.agent.color }} className="shrink-0">
                <AgentIcon name={task.agent.icon} className="w-4 h-4" />
              </span>
            )}
            <span className="text-dark-text text-xs font-medium shrink-0">
              {task.agent.humanName}
            </span>
          </>
        )}

        <span className="text-dark-textMuted text-xs truncate flex-1 text-left">
          {task.input.slice(0, 80)}{task.input.length > 80 ? '...' : ''}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {cost && (
            <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
              <Coins className="w-3 h-3" />
              {cost}
            </span>
          )}
          {task.durationMs && (
            <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
              <Zap className="w-3 h-3" />
              {formatDuration(task.durationMs)}
            </span>
          )}
          <span className="text-dark-textMuted text-[10px]">
            {formatDate(task.createdAt)}
          </span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-dark-textMuted" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-dark-textMuted" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-dark-border pt-3">
          {/* Meta row */}
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusCfg.color} bg-dark-bg font-medium`}>
              {statusCfg.label}
            </span>
            {task.modelUsed && (
              <span className="text-[10px] px-2 py-0.5 rounded-full text-purple-400 bg-purple-500/10 font-medium">
                {task.modelUsed}
              </span>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-full text-dark-textMuted bg-dark-bg font-medium">
              {task.type}
            </span>
            {tokenTotal > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full text-dark-textMuted bg-dark-bg font-medium">
                {task.tokensInput?.toLocaleString()}→{task.tokensOutput?.toLocaleString()} tokens
              </span>
            )}
          </div>

          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Input</span>
              <button
                onClick={() => handleCopy(task.input)}
                className="text-dark-textMuted hover:text-dark-text p-1 rounded transition-colors"
                title="Copiar input"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="neu-inset rounded-xl p-3 text-xs text-dark-textMuted leading-relaxed whitespace-pre-wrap font-mono max-h-40 overflow-y-auto">
              {task.input}
            </pre>
          </div>

          {/* Output */}
          {task.output && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Output</span>
                <button
                  onClick={() => handleCopy(task.output!)}
                  className="text-dark-textMuted hover:text-dark-text p-1 rounded transition-colors"
                  title="Copiar output"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <pre className="neu-inset rounded-xl p-3 text-xs text-dark-textMuted leading-relaxed whitespace-pre-wrap font-mono max-h-[50vh] overflow-y-auto">
                {task.output}
              </pre>
            </div>
          )}

          {/* Error */}
          {task.error && (
            <div>
              <span className="text-red-400 text-[10px] font-semibold uppercase tracking-wider">Erro</span>
              <pre className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400 leading-relaxed whitespace-pre-wrap font-mono mt-1">
                {task.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TaskHistory({ agentId, compact }: TaskHistoryProps) {
  const { authFetch } = useAdminAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [offset, setOffset] = useState(0);
  const limit = compact ? 20 : 50;

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (agentId) params.set('agentId', agentId);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      params.set('limit', limit.toString());
      params.set('offset', offset.toString());

      const res = await authFetch(`/api/company/tasks?${params}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data.tasks);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [agentId, statusFilter, offset, limit, authFetch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-dark-textMuted" />
          {['all', 'completed', 'failed', 'running', 'pending'].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setOffset(0); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                statusFilter === s
                  ? 'neu-button text-dark-text'
                  : 'text-dark-textMuted hover:text-dark-text'
              }`}
            >
              {s === 'all' ? 'Todos' : STATUS_CONFIG[s]?.label || s}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-dark-textMuted text-[10px]">
            {total} task{total !== 1 ? 's' : ''}
          </span>
          <button
            onClick={fetchTasks}
            className="p-1.5 rounded-lg text-dark-textMuted hover:text-ufc-red transition-colors"
            title="Atualizar"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Task list */}
      {loading && tasks.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-ufc-red" />
        </div>
      ) : error ? (
        <div className="text-red-400 text-sm text-center py-4">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="text-dark-textMuted text-sm text-center py-8">
          Nenhuma task encontrada.
        </div>
      ) : (
        <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
          {[...new Map(tasks.map(t => [t.id, t])).values()].map((task, i) => (
            <TaskCard key={`${task.id}-${i}`} task={task} compact={compact} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
            className="neu-button px-3 py-1.5 text-xs text-dark-textMuted disabled:opacity-30"
          >
            Anterior
          </button>
          <span className="text-dark-textMuted text-xs">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setOffset(offset + limit)}
            disabled={currentPage >= totalPages}
            className="neu-button px-3 py-1.5 text-xs text-dark-textMuted disabled:opacity-30"
          >
            Proximo
          </button>
        </div>
      )}
    </div>
  );
}
