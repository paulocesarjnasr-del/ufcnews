'use client';

import {
  Crown,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  ClipboardList,
  Zap,
  ChevronDown,
  ChevronUp,
  Clock,
  History,
  RefreshCw,
  Rocket,
} from 'lucide-react';
import { AgentIcon } from './AgentIcon';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import { MarkdownReport } from './MarkdownReport';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeedEntry {
  type: string;
  data: Record<string, unknown>;
  ts: number;
}

interface PreviousTask {
  id: string;
  agentId: string;
  agent: { id: string; humanName: string; codename: string; icon: string; color: string };
  type: string;
  input: string;
  output: string | null;
  status: string;
  durationMs: number | null;
  tokensInput: number | null;
  tokensOutput: number | null;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
}

interface TaskFeedProps {
  events: FeedEntry[];
  processing: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeSeconds(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 5) return 'agora';
  if (diff < 60) return `${diff}s atrás`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins}min atrás`;
  return `${Math.floor(mins / 60)}h atrás`;
}

// ---------------------------------------------------------------------------
// EventCard (unchanged logic)
// ---------------------------------------------------------------------------

function EventCard({ entry }: { entry: FeedEntry }) {
  const [expanded, setExpanded] = useState(false);
  const { type, data } = entry;

  if (type === 'ceo_thinking') {
    return (
      <div className="flex items-center gap-3 px-4 py-3 neu-inset rounded-xl animate-pulse">
        <Crown className="w-5 h-5 text-ufc-red" />
        <span className="text-dark-text text-sm font-medium">CEO Ricardo Miura analisando prompt...</span>
        <Loader2 className="w-4 h-4 animate-spin text-dark-textMuted ml-auto" />
      </div>
    );
  }

  if (type === 'ceo_analysis') {
    const delegations = (data.delegations ?? []) as Array<Record<string, unknown>>;
    return (
      <div className="neu-card p-4 space-y-3 border-l-4 border-ufc-red">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-ufc-red" />
          <span className="text-dark-text text-sm font-bold">Analise do CEO</span>
          {typeof data.estimatedTime === 'string' && (
            <span className="text-dark-textMuted text-xs ml-auto">~{data.estimatedTime}</span>
          )}
        </div>
        <p className="text-dark-textMuted text-sm">{data.analysis as string}</p>
        {delegations.length > 0 && (
          <div className="space-y-1">
            <span className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider">
              Delegacoes ({delegations.length})
            </span>
            {delegations.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <Zap className={`w-3 h-3 ${d.priority === 'high' ? 'text-red-400' : d.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`} />
                <span className="text-dark-text font-medium">{d.agentId as string}</span>
                {d.requiresApproval ? (
                  <span className="text-orange-400 text-[10px] bg-orange-500/10 px-1.5 py-0.5 rounded">
                    aprovacao
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {(data.risks as string[] | undefined)?.length ? (
          <div className="flex items-start gap-2 text-xs text-orange-400 bg-orange-500/10 rounded-lg px-3 py-2">
            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
            <span>{(data.risks as string[]).join('; ')}</span>
          </div>
        ) : null}
      </div>
    );
  }

  if (type === 'task_created') {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 neu-inset rounded-xl">
        <ClipboardList className="w-4 h-4 text-blue-400" />
        <span className="text-dark-text text-xs font-medium">
          Task criada para{' '}
          <span className="text-blue-400">{data.agentCodename as string}</span>
        </span>
        <span className="text-dark-textMuted text-[10px] ml-auto">{data.priority as string}</span>
      </div>
    );
  }

  if (type === 'agent_start') {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 neu-inset rounded-xl animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
        <span className="text-dark-text text-xs font-medium">
          <span className="text-yellow-400">{data.agentCodename as string}</span> executando...
        </span>
      </div>
    );
  }

  if (type === 'agent_done') {
    const output = data.output as string | undefined;
    return (
      <div className="neu-card p-3 space-y-2 border-l-4 border-green-500">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-dark-text text-xs font-bold">
            {data.agentCodename as string}
          </span>
          <span className="text-dark-textMuted text-[10px] ml-auto">
            {data.durationMs ? `${((data.durationMs as number) / 1000).toFixed(1)}s` : ''}
            {data.tokensInput ? ` · ${data.tokensInput}→${data.tokensOutput} tokens` : ''}
          </span>
        </div>
        {output && (
          <>
            <p className="text-dark-textMuted text-xs leading-relaxed whitespace-pre-wrap">
              {expanded ? output : output.slice(0, 200) + (output.length > 200 ? '...' : '')}
            </p>
            {output.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-ufc-red text-[10px] font-medium flex items-center gap-1 hover:underline"
              >
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {expanded ? 'Menos' : 'Ver mais'}
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  if (type === 'agent_error') {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
        <XCircle className="w-4 h-4 text-red-400" />
        <div className="flex-1 min-w-0">
          <span className="text-dark-text text-xs font-medium">
            {data.agentName as string} falhou
          </span>
          <p className="text-red-400 text-[10px] truncate">{data.error as string}</p>
        </div>
      </div>
    );
  }

  if (type === 'consolidating') {
    return (
      <div className="flex items-center gap-3 px-4 py-3 neu-inset rounded-xl animate-pulse">
        <Crown className="w-5 h-5 text-ufc-red" />
        <span className="text-dark-text text-sm font-medium">
          CEO consolidando resultados de todos os agentes...
        </span>
        <Loader2 className="w-4 h-4 animate-spin text-dark-textMuted ml-auto" />
      </div>
    );
  }

  if (type === 'done') {
    const hasError = !!data.error;
    const summaryText = data.summary as string | undefined;
    return (
      <div className={`neu-card p-4 space-y-3 border-l-4 ${hasError ? 'border-red-500' : 'border-ufc-red'}`}>
        <div className="flex items-center gap-2">
          {hasError ? (
            <XCircle className="w-5 h-5 text-red-400" />
          ) : (
            <Crown className="w-5 h-5 text-ufc-red" />
          )}
          <span className="text-dark-text text-sm font-bold">
            {hasError ? 'Erro no processamento' : 'Relatorio Consolidado'}
          </span>
          {!hasError && (
            <span className="text-dark-textMuted text-xs ml-auto">
              {data.tasksCompleted as number} agentes · {data.tasksFailed as number} falhas
            </span>
          )}
        </div>
        {hasError && (
          <p className="text-red-400 text-xs">{data.error as string}</p>
        )}
        {summaryText && (
          <>
            <div className="neu-inset rounded-xl p-4 max-h-[60vh] overflow-y-auto">
              <MarkdownReport content={summaryText} />
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(summaryText)}
              className="text-dark-textMuted text-[10px] hover:text-ufc-red transition-colors flex items-center gap-1"
            >
              <ClipboardList className="w-3 h-3" />
              Copiar relatorio
            </button>
          </>
        )}
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// PreviousTaskCard (unchanged)
// ---------------------------------------------------------------------------

function PreviousTaskCard({ task }: { task: PreviousTask }) {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = task.status === 'completed';
  const isFailed = task.status === 'failed';
  const isAwaiting = task.status === 'awaiting_approval';

  return (
    <div className={`neu-card p-3 space-y-2 border-l-4 ${
      isCompleted ? 'border-green-500/50' : isFailed ? 'border-red-500/50' : isAwaiting ? 'border-orange-500/50' : 'border-gray-500/50'
    } opacity-70`}>
      <div className="flex items-center gap-2">
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-green-400/70" />
        ) : isFailed ? (
          <XCircle className="w-4 h-4 text-red-400/70" />
        ) : isAwaiting ? (
          <Clock className="w-4 h-4 text-orange-400/70" />
        ) : (
          <Loader2 className="w-4 h-4 text-yellow-400/70" />
        )}
        <span className="text-dark-text text-xs font-bold">{task.agent.codename}</span>
        <span className="text-dark-textMuted text-[10px] ml-auto">
          {task.durationMs ? `${(task.durationMs / 1000).toFixed(1)}s` : ''}
          {task.tokensInput ? ` · ${task.tokensInput}→${task.tokensOutput} tokens` : ''}
          {' · '}
          {task.createdAt && !isNaN(new Date(task.createdAt).getTime()) ? new Date(task.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—'}
        </span>
      </div>
      <p className="text-dark-textMuted text-[10px]">{task.input.slice(0, 120)}{task.input.length > 120 ? '...' : ''}</p>
      {task.output && (
        <>
          <p className="text-dark-textMuted text-xs leading-relaxed whitespace-pre-wrap">
            {expanded ? task.output : task.output.slice(0, 200) + (task.output.length > 200 ? '...' : '')}
          </p>
          {task.output.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-ufc-red text-[10px] font-medium flex items-center gap-1 hover:underline"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? 'Menos' : 'Ver mais'}
            </button>
          )}
        </>
      )}
      {task.error && <p className="text-red-400 text-[10px]">{task.error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function TaskFeed({ events, processing }: TaskFeedProps) {
  const { authFetch } = useAdminAuth();
  const [previousTasks, setPreviousTasks] = useState<PreviousTask[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [updatedLabel, setUpdatedLabel] = useState('agora');
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch tasks function
  const fetchTasks = useCallback(async () => {
    try {
      const res = await authFetch('/api/company/tasks?limit=30');
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      if (data.tasks) setPreviousTasks(data.tasks);
      setLastUpdated(Date.now());
    } catch {
      // silent
    }
  }, [authFetch]);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Polling: 3s when processing, 30s when idle
  useEffect(() => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    const interval = processing ? 3000 : 30000;
    pollIntervalRef.current = setInterval(fetchTasks, interval);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [processing, fetchTasks]);

  // Update the "updated X ago" label every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdatedLabel(relativeSeconds(lastUpdated));
    }, 5000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  // Empty state
  if (events.length === 0 && !processing && previousTasks.length === 0) {
    return (
      <div className="neu-card p-6 text-center space-y-3">
        <Rocket className="w-10 h-10 text-dark-textMuted/40 mx-auto" />
        <p className="text-dark-text text-sm font-medium">🚀 Nenhuma atividade ainda</p>
        <p className="text-dark-textMuted text-xs">
          Envie um prompt para o CEO Ricardo Miura para começar uma missão.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-dark-text text-sm font-bold">Feed de Atividade</h3>
        {processing && <Loader2 className="w-3 h-3 animate-spin text-ufc-red" />}

        {/* Updated indicator + manual refresh */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-dark-textMuted text-[10px] flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            Atualizado {updatedLabel}
          </span>
          <button
            onClick={fetchTasks}
            className="p-1 rounded text-dark-textMuted hover:text-ufc-red transition-colors"
            title="Atualizar agora"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Current stream events */}
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {events.map((entry, i) => (
          <EventCard key={`${entry.type}-${entry.ts}-${i}`} entry={entry} />
        ))}
      </div>

      {/* Previous tasks from DB */}
      {previousTasks.length > 0 && events.length === 0 && !processing && (
        <div className="space-y-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-dark-textMuted text-xs hover:text-dark-text transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            {showHistory ? 'Ocultar' : 'Mostrar'} historico ({previousTasks.length} tasks)
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {showHistory && (
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {[...new Map(previousTasks.map(t => [t.id, t])).values()].map((task, i) => (
                <PreviousTaskCard key={`${task.id}-${i}`} task={task} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
