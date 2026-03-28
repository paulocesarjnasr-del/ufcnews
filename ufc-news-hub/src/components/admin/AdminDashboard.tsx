'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { Agent } from '@/lib/admin/types';
import { useAdminAuth } from './AdminAuthContext';
import { TopBar } from './TopBar';
import { UnifiedOrgView } from './UnifiedOrgView';
import { DetailPanel } from './DetailPanel';
import { PromptInput, type PromptEvent } from './PromptInput';
import { TaskFeed } from './TaskFeed';
import { TaskHistory } from './TaskHistory';
import { PromptHistory } from './PromptHistory';
import { ApprovalQueue } from './ApprovalQueue';
import { ActivityFeed } from './ActivityFeed';
import { CostTracker } from './CostTracker';
import { PerformanceView } from './PerformanceView';
import { MissionConsole } from './MissionConsole';
import { GitBranch, ScrollText, Crown, RefreshCw, Loader2, Trophy, HelpCircle, X, Keyboard, Volume2 } from 'lucide-react';

type ViewType = 'org' | 'reports' | 'logs' | 'performance';

const VIEWS = [
  { id: 'org' as ViewType, label: 'Organização', icon: GitBranch },
  { id: 'performance' as ViewType, label: 'Performance', icon: Trophy },
  { id: 'reports' as ViewType, label: 'Relatórios', icon: Crown },
  { id: 'logs' as ViewType, label: 'Tasks', icon: ScrollText },
];

export function AICompanyContent() {
  const { authFetch } = useAdminAuth();
  const [agents, setAgents] = useState<Record<string, Agent>>({});
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [view, setView] = useState<ViewType>('org');
  const [detailTab, setDetailTab] = useState('info');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      const res = await authFetch('/api/company/agents');
      if (!res.ok) throw new Error('Failed to fetch agents');
      const data: Agent[] = await res.json();

      const agentsMap: Record<string, Agent> = {};
      for (const agent of data) {
        agentsMap[agent.id] = agent;
      }
      setAgents(agentsMap);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const detailPanelRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    if (selectedAgent === id) {
      setSelectedAgent(null);
    } else {
      setSelectedAgent(id);
      setDetailTab('info');
      // Scroll to bring the detail panel into view
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleUpdateAgent = useCallback((agentId: string, updates: Partial<Agent>) => {
    // Optimistic local update — instant UI feedback
    setAgents((prev) => ({
      ...prev,
      [agentId]: { ...prev[agentId], ...updates },
    }));

    // Persist to database
    authFetch(`/api/company/agents/${agentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    }).catch((err) => {
      console.error(`Failed to persist agent update for ${agentId}:`, err);
      // Revert on failure by re-fetching
      fetchAgents();
    });
  }, [authFetch, fetchAgents]);

  // Prompt + TaskFeed state
  const [feedEvents, setFeedEvents] = useState<Array<{ type: string; data: Record<string, unknown>; ts: number }>>([]);
  const [processing, setProcessing] = useState(false);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Sound & Notification System ---
  const originalTitleRef = useRef<string>('');
  const notifIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    originalTitleRef.current = document.title;
    return () => {
      document.title = originalTitleRef.current;
      if (notifIntervalRef.current) clearInterval(notifIntervalRef.current);
    };
  }, []);

  // Initialize AudioContext on first user interaction (browser policy)
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  // Restore title when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      document.title = originalTitleRef.current;
      if (notifIntervalRef.current) {
        clearInterval(notifIntervalRef.current);
        notifIntervalRef.current = null;
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const playSound = useCallback((type: 'approval' | 'done' | 'error' | 'start') => {
    try {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      // Resume if suspended (browser policy)
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = 0.25;

      if (type === 'approval') {
        // Urgent double beep
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'done') {
        // Success chime — ascending
        osc.frequency.value = 523;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'error') {
        // Low buzz
        osc.frequency.value = 220;
        osc.type = 'square';
        gain.gain.value = 0.12;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'start') {
        // Soft ping
        osc.frequency.value = 660;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // AudioContext not available — silent fail
    }
  }, []);

  const flashTabTitle = useCallback((message: string) => {
    if (document.hasFocus()) return;
    if (notifIntervalRef.current) clearInterval(notifIntervalRef.current);
    let show = true;
    notifIntervalRef.current = setInterval(() => {
      document.title = show ? `⚡ ${message}` : originalTitleRef.current;
      show = !show;
    }, 1000);
  }, []);

  const handlePromptEvent = useCallback((event: PromptEvent) => {
    setFeedEvents((prev) => [...prev, { ...event, ts: Date.now() }]);

    // Sound effects + tab notifications
    if (event.type === 'approval_needed') {
      playSound('approval');
      flashTabTitle('Aprovação pendente!');
    } else if (event.type === 'done') {
      playSound('done');
      flashTabTitle('Missão completa!');
    } else if (event.type === 'agent_error') {
      playSound('error');
    } else if (event.type === 'ceo_thinking') {
      playSound('start');
    }
  }, [playSound, flashTabTitle]);

  // Mission toast state
  const [missionToast, setMissionToast] = useState<string | null>(null);
  const missionDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePromptStart = useCallback(() => {
    setFeedEvents([]);
    setProcessing(true);
    setMissionDismissed(false);
    setMissionMinimized(false);
    // Clear any pending auto-dismiss timer from previous mission
    if (missionDismissTimerRef.current) {
      clearTimeout(missionDismissTimerRef.current);
      missionDismissTimerRef.current = null;
    }
    // Show "mission started" toast with agent count
    const agentCount = Object.keys(agents).length;
    setMissionToast(`🚀 Missão iniciada — ${agentCount} agentes mobilizados`);
    setTimeout(() => setMissionToast(null), 2500);
  }, [agents]);

  const handlePromptEnd = useCallback(() => {
    setProcessing(false);
    // Refresh agents multiple times to catch status updates
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(() => fetchAgents(), 1000);
    setTimeout(() => fetchAgents(), 5000);
    setTimeout(() => fetchAgents(), 10000);

    // Auto-dismiss mission after 30 seconds
    missionDismissTimerRef.current = setTimeout(() => {
      setMissionDismissed(true);
      setFeedEvents([]);
    }, 30000);
  }, [fetchAgents]);

  // Poll agents faster while processing (2s), slower when idle (10s)
  useEffect(() => {
    const interval = setInterval(fetchAgents, processing ? 2000 : 10000);
    return () => clearInterval(interval);
  }, [processing, fetchAgents]);

  // Extract active agent IDs from feed events for Mission Control mode
  const activeAgentIds = useMemo(() => {
    const ids = new Set<string>();
    // CEO is always active during processing
    if (processing || feedEvents.length > 0) {
      ids.add('ceo');
    }
    for (const e of feedEvents) {
      if (e.data.agentId) ids.add(e.data.agentId as string);
      // Also extract from delegations in ceo_analysis
      if (e.type === 'ceo_analysis' && e.data.delegations) {
        const delegations = e.data.delegations as Array<Record<string, unknown>>;
        for (const d of delegations) {
          if (d.agentId) ids.add(d.agentId as string);
        }
      }
    }
    return [...ids];
  }, [feedEvents, processing]);

  // Extract promptId from feed events (ceo_thinking is the first event with it)
  const currentPromptId = useMemo(() => {
    for (const e of feedEvents) {
      if (e.data.promptId) return e.data.promptId as string;
    }
    return undefined;
  }, [feedEvents]);

  const [missionDismissed, setMissionDismissed] = useState(false);
  const [missionMinimized, setMissionMinimized] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const isMissionMode = (processing || feedEvents.length > 0) && !missionDismissed;
  const missionExpanded = isMissionMode && !missionMinimized;

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      // Ctrl/Cmd + Enter: focus prompt input
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const input = document.getElementById('ceo-prompt-input') as HTMLTextAreaElement | null;
        input?.focus();
        return;
      }

      // Escape: close panels
      if (e.key === 'Escape') {
        if (showShortcuts) {
          setShowShortcuts(false);
          return;
        }
        if (selectedAgent) {
          setSelectedAgent(null);
          return;
        }
        if (isMissionMode && !missionMinimized) {
          setMissionMinimized(true);
          return;
        }
        return;
      }

      // Number keys for view switching (only when not in input)
      if (!isInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const viewMap: Record<string, ViewType> = { '1': 'org', '2': 'performance', '3': 'reports', '4': 'logs' };
        if (viewMap[e.key]) {
          e.preventDefault();
          setView(viewMap[e.key]);
          return;
        }

        // ? key for shortcuts help
        if (e.key === '?' || (e.shiftKey && e.key === '/')) {
          e.preventDefault();
          setShowShortcuts(prev => !prev);
          return;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAgent, showShortcuts, isMissionMode, missionMinimized]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-ufc-red" />
          <span className="text-dark-textMuted">Carregando agentes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-red-400">Erro ao carregar agentes: {error}</p>
          <button
            onClick={() => { setLoading(true); fetchAgents(); }}
            className="neu-button px-4 py-2 text-ufc-red text-sm font-semibold"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text p-6 dashboard-grid-bg">
      <div className="max-w-7xl mx-auto">
        <TopBar agents={agents} onRefreshAgents={fetchAgents} />

        {/* View Switcher + Refresh */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1 neu-inset p-1 flex-1">
            {VIEWS.map((v) => {
              const Icon = v.icon;
              return (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    view === v.id
                      ? 'neu-button text-dark-text'
                      : 'text-dark-textMuted hover:text-dark-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {v.label}
                  {view === v.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-ufc-red rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => { setLoading(true); fetchAgents(); }}
            className="neu-button px-4 py-2 text-sm font-semibold flex items-center gap-2 text-dark-textMuted hover:text-ufc-red transition-colors"
            title="Recarregar agentes do banco"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* CEO Prompt */}
        <div className="mb-6">
          <PromptInput
            onEvent={handlePromptEvent}
            onStart={handlePromptStart}
            onEnd={handlePromptEnd}
            disabled={processing}
            feedEvents={feedEvents}
          />
        </div>

        {/* Mission toast — full-width banner */}
        {missionToast && (
          <div className="fixed top-0 left-0 right-0 z-[60] animate-fade-in-down" style={{ transform: 'none' }}>
            <div className="bg-gradient-to-r from-ufc-red/20 via-ufc-red/10 to-transparent border-b border-ufc-red/20 px-6 py-3 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto">
                <span className="text-dark-text text-sm font-bold">{missionToast}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex gap-6 mb-6 transition-all duration-300 ease-out ${missionExpanded ? 'pr-[440px]' : isMissionMode ? 'pr-[80px]' : ''}`}>
          <div className={`${selectedAgent ? 'flex-1' : 'w-full'} transition-all duration-300 min-w-0`}>
            {view === 'org' && (
              <UnifiedOrgView
                agents={agents}
                selectedAgent={selectedAgent}
                onSelect={handleSelect}
                activeAgentIds={activeAgentIds}
                processing={processing}
              />
            )}
            {view === 'performance' && <PerformanceView />}
            {view === 'reports' && <PromptHistory />}
            {view === 'logs' && <TaskHistory />}
          </div>

          {/* Detail Panel — always visible when agent selected */}
          {selectedAgent && agents[selectedAgent] && (
            <div ref={detailPanelRef} className="w-96 shrink-0 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto scrollbar-thin">
              <DetailPanel
                agent={agents[selectedAgent]}
                agents={agents}
                onClose={() => setSelectedAgent(null)}
                activeTab={detailTab}
                setActiveTab={setDetailTab}
                onUpdateAgent={handleUpdateAgent}
              />
            </div>
          )}
        </div>

        {/* Approval Queue — always visible */}
        <div className={`transition-all duration-300 ${missionExpanded ? 'pr-[440px]' : isMissionMode ? 'pr-[80px]' : ''}`}>
          <ApprovalQueue processing={processing} currentPromptId={currentPromptId} />
        </div>

        {/* Bottom section — context-dependent with fade transition */}
        {isMissionMode ? (
          /* MISSION MODE: MissionConsole is the sole activity view (fixed overlay) */
          <MissionConsole
            events={feedEvents}
            processing={processing}
            agents={agents}
            onDismiss={() => {
              setMissionDismissed(true);
              setFeedEvents([]);
              if (missionDismissTimerRef.current) {
                clearTimeout(missionDismissTimerRef.current);
                missionDismissTimerRef.current = null;
              }
            }}
            minimized={missionMinimized}
            onToggleMinimize={() => setMissionMinimized(prev => !prev)}
            promptId={currentPromptId}
            autoDismissCountdown={!processing}
          />
        ) : (
          /* IDLE MODE: Normal grid with TaskFeed + ActivityFeed + CostTracker */
          <div className="slide-up-fade">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <TaskFeed events={[]} processing={false} />
              </div>
              <div className="space-y-4">
                <ActivityFeed processing={false} />
                <CostTracker />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Test sound + Keyboard shortcuts buttons */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 z-40">
        <button
          onClick={() => playSound('done')}
          className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-dark-textMuted hover:text-green-400 transition-colors"
          title="Testar som"
        >
          <Volume2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowShortcuts(true)}
          className="w-10 h-10 rounded-full neu-button flex items-center justify-center text-dark-textMuted hover:text-ufc-red transition-colors"
          title="Atalhos do teclado"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard shortcuts overlay */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowShortcuts(false)}>
          <div className="neu-card p-6 w-full max-w-md mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-dark-text text-lg font-bold flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-ufc-red" />
                Atalhos do Teclado
              </h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="p-1 rounded text-dark-textMuted hover:text-dark-text transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { keys: 'Ctrl/⌘ + Enter', desc: 'Focar no campo de prompt' },
                { keys: 'Escape', desc: 'Fechar painel / minimizar console' },
                { keys: '1', desc: 'Ir para Organização' },
                { keys: '2', desc: 'Ir para Performance' },
                { keys: '3', desc: 'Ir para Relatórios' },
                { keys: '4', desc: 'Ir para Tasks' },
                { keys: '?', desc: 'Mostrar/ocultar atalhos' },
              ].map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-dark-cardHover/30">
                  <span className="text-dark-textMuted text-sm">{shortcut.desc}</span>
                  <kbd className="text-dark-text text-xs font-mono bg-dark-bg border border-dark-border rounded px-2 py-0.5">
                    {shortcut.keys}
                  </kbd>
                </div>
              ))}
            </div>

            <p className="text-dark-textMuted text-[10px] text-center">
              Pressione Escape para fechar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Backward-compatible wrapper
export function AdminDashboard() {
  return <AICompanyContent />;
}
