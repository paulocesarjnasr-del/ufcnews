'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Crown,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Check,
  FileText,
  Sparkles,
  Search,
  ArrowUpDown,
  Users,
  Timer,
  Filter,
} from 'lucide-react';
import { MarkdownReport } from './MarkdownReport';
import { useAdminAuth } from './AdminAuthContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CompanyPrompt {
  id: string;
  userId: string;
  prompt: string;
  ceoAnalysis: string | null;
  status: string;
  tasks: string[];
  summary: string | null;
  createdAt: string;
  completedAt: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: 'text-green-400', label: 'Completo' },
  processing: { icon: Loader2, color: 'text-yellow-400', label: 'Processando' },
  delegated: { icon: Clock, color: 'text-blue-400', label: 'Delegado' },
  failed: { icon: XCircle, color: 'text-red-400', label: 'Falhou' },
};

function safeDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(iso: string): string {
  const d = safeDate(iso);
  if (!d) return '—';
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h atrás`;
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function durationStr(start: string, end: string | null): string {
  if (!end) return '—';
  const dStart = safeDate(start);
  const dEnd = safeDate(end);
  if (!dStart || !dEnd) return '—';
  const ms = dEnd.getTime() - dStart.getTime();
  if (ms < 1000) return `${ms}ms`;
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;
  return `${mins}m ${remSecs}s`;
}

function parseAgentsFromTasks(tasks: string[]): string[] {
  // tasks is an array of agent IDs or agent codenames
  const unique = [...new Set(tasks)];
  return unique;
}

type SortKey = 'newest' | 'oldest' | 'most_agents' | 'highest_cost';
type DateFilter = 'all' | 'today' | 'week' | 'month';
type StatusFilter = 'all' | 'completed' | 'failed' | 'processing';

function isInDateRange(iso: string, filter: DateFilter): boolean {
  if (filter === 'all') return true;
  const d = safeDate(iso);
  if (!d) return false;
  const now = new Date();
  if (filter === 'today') {
    return d.toDateString() === now.toDateString();
  }
  if (filter === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }
  if (filter === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return d >= monthAgo;
  }
  return true;
}

// ---------------------------------------------------------------------------
// PromptCard
// ---------------------------------------------------------------------------

function PromptCard({ prompt }: { prompt: CompanyPrompt }) {
  const { authFetch } = useAdminAuth();
  const [expanded, setExpanded] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [summary, setSummary] = useState(prompt.summary);
  const statusCfg = STATUS_CONFIG[prompt.status] || STATUS_CONFIG.processing;
  const StatusIcon = statusCfg.icon;
  const hasSummary = !!summary && summary.length > 50;
  const agents = parseAgentsFromTasks(prompt.tasks || []);
  const duration = durationStr(prompt.createdAt, prompt.completedAt);
  const isPromptLong = prompt.prompt.length > 120;

  const handleCopy = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const res = await authFetch('/api/company/consolidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId: prompt.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setSummary(data.summary);
        setExpanded(true);
      }
    } catch {
      // ignore
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="neu-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center gap-3 hover:bg-dark-cardHover/50 transition-colors"
      >
        <StatusIcon
          className={`w-5 h-5 ${statusCfg.color} shrink-0 ${prompt.status === 'processing' ? 'animate-spin' : ''}`}
        />
        <Crown className="w-4 h-4 text-ufc-red shrink-0" />
        <div className="flex-1 text-left min-w-0">
          <p className="text-dark-text text-sm font-medium truncate">{prompt.prompt}</p>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
              <Users className="w-2.5 h-2.5" />
              {agents.length} agentes
            </span>
            <span className="text-dark-textMuted text-[10px]">{statusCfg.label}</span>
            <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
              <Timer className="w-2.5 h-2.5" />
              {duration}
            </span>
            <span className="text-dark-textMuted text-[10px]">{formatDate(prompt.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Agent avatars */}
          {agents.length > 0 && (
            <div className="flex -space-x-1">
              {agents.slice(0, 5).map((agentId) => (
                <div
                  key={agentId}
                  className="w-5 h-5 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center"
                  title={agentId}
                >
                  <span className="text-[8px] text-dark-textMuted font-bold uppercase">
                    {agentId.slice(0, 2)}
                  </span>
                </div>
              ))}
              {agents.length > 5 && (
                <div className="w-5 h-5 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center">
                  <span className="text-[8px] text-dark-textMuted">+{agents.length - 5}</span>
                </div>
              )}
            </div>
          )}
          {hasSummary && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-ufc-red/10 text-ufc-red font-medium">
              Relatório
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-dark-textMuted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-dark-textMuted" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-dark-border pt-4 space-y-4">
          {/* Full prompt section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-dark-textMuted text-xs font-medium uppercase tracking-wider">Prompt enviada</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPrompt}
                  className="text-dark-textMuted text-xs hover:text-ufc-red transition-colors flex items-center gap-1"
                >
                  {promptCopied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {promptCopied ? 'Copiado!' : 'Copiar'}
                </button>
                {isPromptLong && (
                  <button
                    onClick={() => setPromptExpanded(!promptExpanded)}
                    className="text-dark-textMuted text-xs hover:text-ufc-red transition-colors flex items-center gap-1"
                  >
                    {promptExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        Ver menos
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        Ver mais
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="neu-inset rounded-lg p-3">
              <p className={`text-dark-text text-sm whitespace-pre-wrap ${!promptExpanded && isPromptLong ? 'line-clamp-3' : ''}`}>
                {prompt.prompt}
              </p>
            </div>
          </div>

          {hasSummary ? (
            <>
              <div className="neu-inset rounded-xl p-5 max-h-[70vh] overflow-y-auto">
                <MarkdownReport content={summary!} />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="text-dark-textMuted text-xs hover:text-ufc-red transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? 'Copiado!' : 'Copiar relatório'}
                </button>
                <button
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="text-dark-textMuted text-xs hover:text-ufc-red transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {regenerating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  Regenerar consolidação
                </button>
              </div>
            </>
          ) : prompt.status === 'completed' ? (
            <div className="text-center py-6 space-y-3">
              <FileText className="w-8 h-8 text-dark-textMuted mx-auto" />
              <p className="text-dark-textMuted text-sm">
                Esta prompt não tem relatório consolidado ainda.
              </p>
              <button
                onClick={handleRegenerate}
                disabled={regenerating}
                className="neu-button px-4 py-2 text-ufc-red text-sm font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                {regenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Gerar relatório consolidado
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-ufc-red mx-auto mb-2" />
              <p className="text-dark-textMuted text-sm">Processando...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function PromptHistory() {
  const { authFetch } = useAdminAuth();
  const [prompts, setPrompts] = useState<CompanyPrompt[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('newest');

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/company/prompts?limit=50');
      if (res.ok) {
        const data = await res.json();
        setPrompts(data.prompts);
        setTotal(data.total);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  // Filtered & sorted prompts
  const filteredPrompts = useMemo(() => {
    let result = [...prompts];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.prompt.toLowerCase().includes(q));
    }

    // Date filter
    result = result.filter(p => isInDateRange(p.createdAt, dateFilter));

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortKey) {
        case 'newest':
          return (safeDate(b.createdAt)?.getTime() ?? 0) - (safeDate(a.createdAt)?.getTime() ?? 0);
        case 'oldest':
          return (safeDate(a.createdAt)?.getTime() ?? 0) - (safeDate(b.createdAt)?.getTime() ?? 0);
        case 'most_agents':
          return (b.tasks?.length || 0) - (a.tasks?.length || 0);
        case 'highest_cost':
          // Proxy: more agents + longer duration = higher cost
          return (b.tasks?.length || 0) - (a.tasks?.length || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [prompts, searchQuery, dateFilter, statusFilter, sortKey]);

  const DATE_OPTIONS: { value: DateFilter; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
  ];

  const STATUS_OPTIONS: { value: StatusFilter; label: string; color: string }[] = [
    { value: 'all', label: 'Todos', color: 'text-dark-textMuted' },
    { value: 'completed', label: 'Completo', color: 'text-green-400' },
    { value: 'failed', label: 'Falhou', color: 'text-red-400' },
    { value: 'processing', label: 'Processando', color: 'text-yellow-400' },
  ];

  const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: 'newest', label: 'Mais recente' },
    { value: 'oldest', label: 'Mais antigo' },
    { value: 'most_agents', label: 'Mais agentes' },
    { value: 'highest_cost', label: 'Maior custo' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-ufc-red" />
          <h2 className="text-dark-text text-lg font-bold">Histórico de Prompts</h2>
          <span className="text-dark-textMuted text-xs">{total} prompts</span>
        </div>
        <button
          onClick={fetchPrompts}
          className="p-2 rounded-lg text-dark-textMuted hover:text-ufc-red transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-dark-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar prompts por texto..."
          className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-dark-text placeholder-dark-textMuted/50 focus:outline-none focus:ring-2 focus:ring-ufc-red/40 focus:border-ufc-red/40"
        />
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Date filter */}
        <div className="flex items-center gap-1 neu-inset p-0.5 rounded-lg">
          {DATE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setDateFilter(opt.value)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                dateFilter === opt.value
                  ? 'neu-button text-dark-text'
                  : 'text-dark-textMuted hover:text-dark-text'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors border ${
                statusFilter === opt.value
                  ? `${opt.color} border-current bg-current/10`
                  : 'text-dark-textMuted border-dark-border hover:text-dark-text'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 ml-auto">
          <ArrowUpDown className="w-3 h-3 text-dark-textMuted" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="bg-dark-bg border border-dark-border rounded-lg px-2 py-1 text-[11px] text-dark-text focus:outline-none focus:ring-1 focus:ring-ufc-red/40"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      {(searchQuery || dateFilter !== 'all' || statusFilter !== 'all') && (
        <p className="text-dark-textMuted text-xs">
          {filteredPrompts.length} de {prompts.length} prompts
        </p>
      )}

      {/* List */}
      {loading && prompts.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-ufc-red" />
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <FileText className="w-10 h-10 text-dark-textMuted/40 mx-auto" />
          <p className="text-dark-text text-sm font-medium">📋 Nenhum relatório ainda</p>
          <p className="text-dark-textMuted text-xs">
            Envie uma missão para os agentes e o CEO gerará um relatório consolidado.
          </p>
        </div>
      ) : filteredPrompts.length === 0 ? (
        <div className="text-center py-8 space-y-2">
          <Filter className="w-8 h-8 text-dark-textMuted/40 mx-auto" />
          <p className="text-dark-textMuted text-sm">Nenhum prompt encontrado com esses filtros.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPrompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}
    </div>
  );
}
