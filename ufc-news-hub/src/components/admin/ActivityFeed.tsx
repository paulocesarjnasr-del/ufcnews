'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Radio,
  AlertCircle,
  ShieldAlert,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Users,
  Timer,
  Crown,
} from 'lucide-react';
import { AgentIcon } from './AgentIcon';
import { useAdminAuth } from './AdminAuthContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LogEntry {
  id: string;
  agentId: string;
  agent: { humanName: string; icon: string; color: string; codename: string };
  level: string;
  message: string;
  metadata: string | null;
  createdAt: string;
}

interface MissionPrompt {
  id: string;
  prompt: string;
  status: string;
  tasks: string[];
  createdAt: string;
  completedAt: string | null;
  ceoAnalysis: string | null;
  summary: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function relativeTime(iso: string): string {
  const d = safeDate(iso);
  if (!d) return '—';
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h atrás`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}d atrás`;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
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

const STATUS_CFG: Record<string, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  completed: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Completo' },
  processing: { icon: Loader2, color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Processando' },
  delegated: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Delegado' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Falhou' },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ActivityFeedProps {
  processing?: boolean;
}

function LogRow({ log }: { log: LogEntry }) {
  return (
    <div className="flex items-start gap-2 text-xs hover:bg-dark-cardHover/30 px-1.5 py-0.5 rounded">
      <span className="text-dark-textMuted font-mono whitespace-nowrap text-[10px]">
        {safeDate(log.createdAt)?.toLocaleTimeString('pt-BR') ?? '—'}
      </span>
      <span style={{ color: log.agent?.color }} className="shrink-0">
        <AgentIcon name={log.agent?.icon || 'bot'} className="w-3 h-3" />
      </span>
      <span className="text-dark-textMuted leading-relaxed">
        <span className="text-dark-text font-medium">
          {log.agent?.humanName || 'Sistema'}
        </span>{' '}
        <span className={log.level === 'error' ? 'text-red-400' : log.level === 'warn' ? 'text-yellow-400' : ''}>
          {log.message}
        </span>
      </span>
    </div>
  );
}

function MissionCard({ mission, authFetch }: { mission: MissionPrompt; authFetch: (url: string, init?: RequestInit) => Promise<Response> }) {
  const [expanded, setExpanded] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const cfg = STATUS_CFG[mission.status] || STATUS_CFG.processing;
  const StatusIcon = cfg.icon;
  const agentCount = mission.tasks?.length || 0;
  const duration = durationStr(mission.createdAt, mission.completedAt);

  const fetchLogs = useCallback(async () => {
    setLoadingLogs(true);
    try {
      const createdDate = safeDate(mission.createdAt);
      if (!createdDate) { setLoadingLogs(false); return; }
      const since = new Date(createdDate.getTime() - 5000).toISOString();
      let url = `/api/company/logs?limit=100&since=${since}`;
      const res = await authFetch(url);
      if (res.ok) {
        let data: LogEntry[] = await res.json();
        if (mission.completedAt) {
          const endDate = safeDate(mission.completedAt);
          if (endDate) {
            const endTs = endDate.getTime() + 5000;
            data = data.filter(l => { const t = safeDate(l.createdAt); return t ? t.getTime() <= endTs : false; });
          }
        }
        // Sort oldest first
        data.sort((a, b) => { const ta = safeDate(a.createdAt); const tb = safeDate(b.createdAt); return (ta?.getTime() ?? 0) - (tb?.getTime() ?? 0); });
        setLogs(data);
      }
    } catch {
      // silent
    } finally {
      setLoadingLogs(false);
    }
  }, [authFetch, mission.createdAt, mission.completedAt]);

  const handleToggle = () => {
    if (!expanded && logs.length === 0) {
      fetchLogs();
    }
    setExpanded(!expanded);
  };

  return (
    <div className="neu-card overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-cardHover/50 transition-colors text-left"
      >
        {/* Status icon */}
        <StatusIcon
          className={`w-4 h-4 ${cfg.color} shrink-0 ${mission.status === 'processing' ? 'animate-spin' : ''}`}
        />

        {/* Prompt text */}
        <div className="flex-1 min-w-0">
          <p className="text-dark-text text-xs font-medium truncate">
            {mission.prompt}
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium`}>
              {cfg.label}
            </span>
            <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
              <Users className="w-2.5 h-2.5" />
              {agentCount} agentes
            </span>
            <span className="text-dark-textMuted text-[10px] flex items-center gap-0.5">
              <Timer className="w-2.5 h-2.5" />
              {duration}
            </span>
            <span className="text-dark-textMuted text-[10px]">
              {relativeTime(mission.createdAt)}
            </span>
          </div>
        </div>

        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-dark-textMuted shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-dark-textMuted shrink-0" />
        )}
      </button>

      {/* Expanded: agent activity timeline */}
      {expanded && (
        <div className="border-t border-dark-border">
          {loadingLogs ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-dark-textMuted" />
            </div>
          ) : logs.length === 0 ? (
            <p className="text-dark-textMuted text-[10px] text-center py-4">
              Nenhum log encontrado para esta missão.
            </p>
          ) : (
            <div className="max-h-60 overflow-y-auto p-3 space-y-0.5">
              {logs.map((log, i) => (
                <LogRow key={`${log.id}-${i}`} log={log} />
              ))}
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

export function ActivityFeed({ processing = false }: ActivityFeedProps) {
  const { authFetch } = useAdminAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);
  const lastTimestamp = useRef<string | null>(null);

  // Mission timeline state
  const [missions, setMissions] = useState<MissionPrompt[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load of logs (for live mode)
  useEffect(() => {
    authFetch('/api/company/logs?limit=100')
      .then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then((data: LogEntry[]) => {
        if (!Array.isArray(data)) return;
        const sorted = [...data].reverse(); // oldest first
        setLogs(sorted);
        if (sorted.length > 0) {
          lastTimestamp.current = sorted[sorted.length - 1].createdAt;
        }
      })
      .catch(() => {});
  }, [authFetch]);

  // Fetch missions for idle timeline
  const fetchMissions = useCallback(async () => {
    setMissionsLoading(true);
    try {
      const res = await authFetch('/api/company/prompts?limit=20');
      if (res.ok) {
        const data = await res.json();
        setMissions(data.prompts || []);
      }
    } catch {
      // silent
    } finally {
      setMissionsLoading(false);
    }
  }, [authFetch]);

  // Fetch missions when idle
  useEffect(() => {
    if (!processing) {
      fetchMissions();
    }
  }, [processing, fetchMissions]);

  // Poll for new logs every 2 seconds (only when processing)
  useEffect(() => {
    if (!processing) return;

    const interval = setInterval(async () => {
      try {
        const since =
          lastTimestamp.current || new Date(Date.now() - 60000).toISOString();
        const res = await authFetch(`/api/company/logs?limit=20&since=${since}`);
        if (!res.ok) return;
        const newLogs: LogEntry[] = await res.json();

        if (Array.isArray(newLogs) && newLogs.length > 0) {
          const sorted = [...newLogs].reverse();
          setLogs((prev) => [...prev, ...sorted].slice(-200));
          lastTimestamp.current = sorted[sorted.length - 1].createdAt;

          if (autoScroll && feedRef.current) {
            feedRef.current.scrollTo({
              top: feedRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }
        }
      } catch {
        // silent fail
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [autoScroll, authFetch, processing]);

  // When processing starts, auto-scroll
  useEffect(() => {
    if (processing) {
      setAutoScroll(true);
    }
  }, [processing]);

  // Filter missions by search
  const filteredMissions = searchQuery.trim()
    ? missions.filter(m => m.prompt.toLowerCase().includes(searchQuery.toLowerCase()))
    : missions;

  // --- IDLE STATE: Mission Timeline ---
  if (!processing) {
    return (
      <div className="neu-card overflow-hidden">
        <div className="px-4 py-3 border-b border-dark-border flex items-center justify-between">
          <h3 className="text-dark-text text-sm font-bold flex items-center gap-2">
            <Crown className="w-4 h-4 text-ufc-red" />
            Linha do Tempo
          </h3>
          <span className="text-dark-textMuted text-[10px]">{missions.length} missões</span>
        </div>

        {/* Search */}
        <div className="px-4 pt-3">
          <div className="relative">
            <Search className="w-3 h-3 text-dark-textMuted absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar missões..."
              className="w-full bg-dark-bg border border-dark-border rounded-lg pl-7 pr-3 py-1.5 text-[11px] text-dark-text placeholder-dark-textMuted/50 focus:outline-none focus:ring-1 focus:ring-ufc-red/40 focus:border-ufc-red/40"
            />
          </div>
        </div>

        {/* Mission list */}
        <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
          {missionsLoading && missions.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-4 h-4 animate-spin text-dark-textMuted" />
            </div>
          ) : filteredMissions.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <Radio className="w-8 h-8 text-dark-textMuted/40 mx-auto" />
              <p className="text-dark-text text-sm font-medium">📡 Feed silencioso</p>
              <p className="text-dark-textMuted text-xs">
                Os agentes estão em standby. Envie uma missão para ver atividade em tempo real.
              </p>
            </div>
          ) : (
            filteredMissions.map((m) => (
              <MissionCard key={m.id} mission={m} authFetch={authFetch} />
            ))
          )}
        </div>
      </div>
    );
  }

  // --- LIVE STATE: full feed ---
  return (
    <div className="neu-card overflow-hidden">
      <div className="px-4 py-3 border-b border-dark-border flex items-center justify-between">
        <h3 className="text-dark-text text-sm font-bold flex items-center gap-2">
          <Radio className="w-4 h-4 text-green-500" />
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Activity Feed
        </h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-dark-textMuted text-[10px] cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded w-3 h-3"
            />
            Auto-scroll
          </label>
          <span className="text-dark-textMuted text-[10px]">{logs.length} eventos</span>
        </div>
      </div>
      <div ref={feedRef} className="h-80 overflow-y-auto p-3 space-y-0.5">
        {logs.map((log, i) => (
          <LogRow key={`${log.id}-${i}`} log={log} />
        ))}
        {logs.length === 0 && (
          <div className="text-center py-8 space-y-2">
            <Radio className="w-8 h-8 text-dark-textMuted/40 mx-auto" />
            <p className="text-dark-text text-sm font-medium">📡 Feed silencioso</p>
            <p className="text-dark-textMuted text-xs">
              Os agentes estão em standby. Envie uma missão para ver atividade em tempo real.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
