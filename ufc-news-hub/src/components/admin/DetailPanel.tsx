'use client';

import { useState, useEffect } from 'react';
import type { Agent, AgentModel, AgentStatus } from '@/lib/admin/types';
import { MODELS } from '@/lib/admin/agents';
import { CONNECTIONS, DATABASES, CONNECTION_STYLES } from '@/lib/admin/connections';
import { StatusBadge } from './StatusBadge';
import { ModelBadge } from './ModelBadge';
import { AgentIcon } from './AgentIcon';
import { MarkdownReport } from './MarkdownReport';
import { useAdminAuth } from './AdminAuthContext';
import {
  X,
  Play,
  Pause,
  Power,
  Settings,
  UserMinus,
  Pencil,
  Check,
  RotateCcw,
  ScrollText,
  Send,
  Loader2,
  AlertTriangle,
  Trophy,
  Timer,
  Zap,
} from 'lucide-react';
import { formatLastRun } from '@/lib/admin/utils';
import { TaskHistory } from './TaskHistory';

interface DetailPanelProps {
  agent: Agent;
  agents: Record<string, Agent>;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onUpdateAgent: (agentId: string, updates: Partial<Agent>) => void;
}

// ============================
// INLINE EDIT COMPONENT
// ============================
function InlineEdit({
  value,
  onSave,
  type = 'text',
}: {
  value: string;
  onSave: (val: string) => void;
  type?: 'text' | 'textarea';
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="p-1 rounded-lg hover:bg-dark-cardHover text-dark-textMuted hover:text-ufc-red transition-colors"
        title="Editar"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
    );
  }

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (type === 'textarea') {
    return (
      <div className="space-y-2 w-full">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full bg-dark-bg border border-ufc-red/30 rounded-xl p-3 text-xs text-dark-text font-mono leading-relaxed resize-y min-h-[300px] focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="neu-button px-3 py-1.5 text-green-400 text-xs font-medium flex items-center gap-1.5 hover:bg-green-500/10"
          >
            <Check className="w-3.5 h-3.5" /> Salvar
          </button>
          <button
            onClick={handleCancel}
            className="neu-button px-3 py-1.5 text-dark-textMuted text-xs font-medium flex items-center gap-1.5 hover:bg-dark-cardHover"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="flex-1 bg-dark-bg border border-ufc-red/30 rounded-lg px-2 py-1 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') handleCancel();
        }}
      />
      <button onClick={handleSave} className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
        <Check className="w-3.5 h-3.5" />
      </button>
      <button onClick={handleCancel} className="p-1.5 text-dark-textMuted hover:bg-dark-cardHover rounded-lg transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ============================
// MAIN DETAIL PANEL
// ============================
export function DetailPanel({ agent, agents, onClose, activeTab, setActiveTab, onUpdateAgent }: DetailPanelProps) {
  const { authFetch } = useAdminAuth();
  const reportsTo = agent.reportsTo ? agents[agent.reportsTo] : null;
  const directReports = agent.reports.map((id) => agents[id]).filter(Boolean);
  const model = MODELS[agent.model];
  const incoming = CONNECTIONS.filter((c) => c.to === agent.id);
  const outgoing = CONNECTIONS.filter((c) => c.from === agent.id);
  const dbAccess = DATABASES.filter(
    (db) => db.readers.includes(agent.id) || db.writers.includes(agent.id)
  );

  // "Rodar Agora" state
  const [showRunInput, setShowRunInput] = useState(false);
  const [runInstruction, setRunInstruction] = useState('');
  const [runLoading, setRunLoading] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  // "Demitir" confirmation
  const [showFireConfirm, setShowFireConfirm] = useState(false);
  const [fireLoading, setFireLoading] = useState(false);

  // Check if agent is fired
  const isFired = !!(agent as Agent & { firedAt?: string | null }).firedAt;

  const update = (updates: Partial<Agent>) => {
    onUpdateAgent(agent.id, updates);
  };

  const statusOptions: AgentStatus[] = ['active', 'idle', 'warning', 'error', 'offline'];
  const modelOptions: AgentModel[] = ['opus-4.6', 'sonnet-4.5', 'haiku-4.5'];

  // "Rodar Agora" handler
  const handleRunAgent = async () => {
    if (!runInstruction.trim()) return;
    setRunLoading(true);
    setRunResult(null);
    setRunError(null);
    try {
      const res = await authFetch('/api/company/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `@${agent.codename}: ${runInstruction}`,
        }),
      });
      if (!res.ok) {
        throw new Error('Falha ao executar agente');
      }
      // The response is a stream — read it all
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      if (reader) {
        let done = false;
        while (!done) {
          const chunk = await reader.read();
          done = chunk.done;
          if (chunk.value) {
            const text = decoder.decode(chunk.value, { stream: true });
            fullText += text;
            // Try to parse SSE events and extract the last "done" summary
            const lines = fullText.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.type === 'done' && data.data?.summary) {
                    setRunResult(data.data.summary);
                  }
                  if (data.type === 'agent_done' && data.data?.output) {
                    setRunResult(data.data.output);
                  }
                  if (data.type === 'done' && data.data?.error) {
                    setRunError(data.data.error);
                  }
                } catch {
                  // not valid JSON, skip
                }
              }
            }
          }
        }
      }
      if (!runResult && !runError) {
        setRunResult('Tarefa enviada com sucesso. Verifique o feed de atividade.');
      }
    } catch (err) {
      setRunError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setRunLoading(false);
    }
  };

  // "Demitir" handler
  const handleFireAgent = async () => {
    setFireLoading(true);
    try {
      const res = await authFetch(`/api/company/agents/${agent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'offline',
          firedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Falha ao demitir agente');
      // Optimistic update
      update({ status: 'offline' });
      setShowFireConfirm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setFireLoading(false);
    }
  };

  // "Configurar" handler — just switch to prompt tab
  const handleConfigure = () => {
    setActiveTab('prompt');
  };

  // Compute success rate
  const tasksDone = agent._count?.tasks ?? agent.tasksCompleted;
  const successRate = agent.weeklySuccessRate != null
    ? Math.round(agent.weeklySuccessRate * 100)
    : tasksDone > 0 ? 100 : 0;

  // XP progress
  const xpProgress = agent.xpToNextLevel > 0
    ? Math.min(100, Math.round((agent.xp / agent.xpToNextLevel) * 100))
    : 0;

  return (
    <div className="neu-card p-5 space-y-4 max-h-[85vh] overflow-y-auto">
      {/* FIRED BADGE */}
      {isFired && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-xs font-bold uppercase tracking-wider">DEMITIDO</span>
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {agent.avatarUrl ? (
            <div className={`w-12 h-12 rounded-xl neu-inset overflow-hidden flex-shrink-0 ${isFired ? 'opacity-40 grayscale' : ''}`}>
              <img
                src={agent.avatarUrl}
                alt={agent.humanName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl neu-inset flex-shrink-0 ${isFired ? 'opacity-40 grayscale' : ''}`}
              style={{ color: agent.color }}
            >
              <AgentIcon name={agent.icon} className="w-6 h-6" />
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h2 className={`text-dark-text text-lg font-bold ${isFired ? 'line-through opacity-60' : ''}`}>{agent.humanName}</h2>
              {!isFired && <InlineEdit value={agent.humanName} onSave={(v) => update({ humanName: v })} />}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-dark-textMuted text-xs">{agent.codename}</span>
              {!isFired && <InlineEdit value={agent.codename} onSave={(v) => update({ codename: v })} />}
              <span className="text-dark-textMuted text-xs mx-0.5">—</span>
              <span className="text-dark-textMuted text-xs">{agent.title}</span>
              {!isFired && <InlineEdit value={agent.title} onSave={(v) => update({ title: v })} />}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5">
                <StatusBadge status={agent.status} />
                {!isFired && (
                  <select
                    value={agent.status}
                    onChange={(e) => update({ status: e.target.value as AgentStatus })}
                    className="bg-dark-bg border border-dark-border rounded-lg px-1.5 py-0.5 text-[10px] text-dark-text cursor-pointer focus:outline-none focus:ring-1 focus:ring-ufc-red/50"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <ModelBadge modelId={agent.model} />
                {!isFired && (
                  <select
                    value={agent.model}
                    onChange={(e) => update({ model: e.target.value as AgentModel })}
                    className="bg-dark-bg border border-dark-border rounded-lg px-1.5 py-0.5 text-[10px] text-dark-text cursor-pointer focus:outline-none focus:ring-1 focus:ring-ufc-red/50"
                  >
                    {modelOptions.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-dark-textMuted hover:text-dark-text transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-1 neu-inset p-0.5">
        {['info', 'logs', 'prompt', 'teia', 'memoria'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'neu-button text-dark-text'
                : 'text-dark-textMuted hover:text-dark-text'
            }`}
          >
            {tab === 'info' ? 'Info' : tab === 'logs' ? 'Logs' : tab === 'prompt' ? 'Prompt' : tab === 'teia' ? 'Teia' : 'Memoria'}
          </button>
        ))}
      </div>

      {/* ===== INFO TAB ===== */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider">Descricao</h3>
              {!isFired && <InlineEdit value={agent.desc} onSave={(v) => update({ desc: v })} type="textarea" />}
            </div>
            <p className="text-dark-textMuted text-sm leading-relaxed">{agent.desc}</p>
          </div>

          {/* Model Reason */}
          <div className={`rounded-xl p-3 ${model.bg} border ${model.border}`}>
            <span className={`text-sm font-bold ${model.textColor}`}>{model.name}</span>
            <div className="flex items-start gap-1 mt-1">
              <p className="text-dark-textMuted text-xs flex-1">{agent.modelReason}</p>
              {!isFired && <InlineEdit value={agent.modelReason} onSave={(v) => update({ modelReason: v })} type="textarea" />}
            </div>
          </div>

          {/* Stats — Row 1: 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            <div className="neu-inset rounded-xl p-2.5 text-center">
              <span className="text-dark-text text-base font-bold">
                {tasksDone.toLocaleString()}
              </span>
              <div className="text-dark-textMuted text-[10px]">Tarefas</div>
            </div>
            <div className="neu-inset rounded-xl p-2.5 text-center">
              <span className="text-dark-text text-base font-bold">
                {formatLastRun(agent.lastRunAt)}
              </span>
              <div className="text-dark-textMuted text-[10px]">Ultimo run</div>
            </div>
            <div className="neu-inset rounded-xl p-2.5 text-center">
              <span className={`text-base font-bold ${successRate >= 80 ? 'text-green-400' : successRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {successRate}%
              </span>
              <div className="text-dark-textMuted text-[10px]">Taxa Sucesso</div>
            </div>
          </div>

          {/* Stats — Row 2: Avg Response, XP, Level */}
          <div className="grid grid-cols-3 gap-3">
            <div className="neu-inset rounded-xl p-2.5 text-center">
              <span className="text-dark-text text-base font-bold flex items-center justify-center gap-1">
                <Timer className="w-3.5 h-3.5 text-blue-400" />
                {agent.avgResponseTime > 0
                  ? `${(agent.avgResponseTime / 1000).toFixed(1)}s`
                  : '—'}
              </span>
              <div className="text-dark-textMuted text-[10px]">Tempo Médio</div>
            </div>
            <div className="neu-inset rounded-xl p-2.5">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-dark-text text-xs font-bold">{agent.xp}/{agent.xpToNextLevel} XP</span>
              </div>
              <div className="w-full bg-dark-bg rounded-full h-1.5">
                <div
                  className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
            <div className="neu-inset rounded-xl p-2.5 text-center">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-purple-400 text-base font-bold">L{agent.agentLevel}</span>
              </div>
              <div className="text-dark-textMuted text-[10px]">{agent.levelTitle}</div>
            </div>
          </div>

          {/* Role - editable */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider">Role</h3>
              {!isFired && <InlineEdit value={agent.role} onSave={(v) => update({ role: v })} />}
            </div>
            <span className="text-dark-text text-sm">{agent.role}</span>
          </div>

          {reportsTo && (
            <div>
              <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider mb-1.5">
                Reporta para
              </h3>
              <div className="flex items-center gap-2 text-sm text-dark-textMuted neu-inset rounded-xl px-3 py-2">
                <span style={{ color: reportsTo.color }}>
                  <AgentIcon name={reportsTo.icon} className="w-4 h-4" />
                </span>
                <span className="font-medium text-dark-text">{reportsTo.humanName}</span>
                <span className="text-dark-textMuted text-xs">({reportsTo.codename})</span>
              </div>
            </div>
          )}

          {directReports.length > 0 && (
            <div>
              <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider mb-1.5">
                Subordinados ({directReports.length})
              </h3>
              <div className="space-y-1">
                {directReports.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between text-sm neu-inset rounded-xl px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-dark-textMuted">
                      <span style={{ color: sub.color }}>
                        <AgentIcon name={sub.icon} className="w-4 h-4" />
                      </span>
                      <span className="font-medium text-xs text-dark-text">{sub.humanName}</span>
                      <ModelBadge modelId={sub.model} />
                    </div>
                    <StatusBadge status={sub.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== LOGS TAB ===== */}
      {activeTab === 'logs' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <ScrollText className="w-4 h-4 text-dark-textMuted" />
            <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider">
              Historico de Tasks
            </h3>
          </div>
          <TaskHistory agentId={agent.id} compact />
        </div>
      )}

      {/* ===== PROMPT TAB ===== */}
      {activeTab === 'prompt' && (
        <PromptTab agent={agent} model={model} onUpdate={update} />
      )}

      {/* ===== TEIA TAB ===== */}
      {activeTab === 'teia' && (
        <div className="space-y-4">
          {outgoing.length > 0 && (
            <div>
              <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider mb-2">
                Envia para ({outgoing.length})
              </h3>
              <div className="space-y-1.5">
                {outgoing.map((conn, i) => {
                  const s = CONNECTION_STYLES[conn.type];
                  const t = agents[conn.to];
                  if (!t) return null;
                  return (
                    <div key={i} className={`${s.bg} rounded-xl px-3 py-2 flex items-center gap-2`}>
                      <span className={`${s.color} w-5 text-center`}>
                        <AgentIcon name={s.icon} className="w-3.5 h-3.5 inline" />
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${s.color} w-16`}>{s.label}</span>
                      <span style={{ color: t.color }}>
                        <AgentIcon name={t.icon} className="w-4 h-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-dark-text text-xs font-medium">{t.humanName}</span>
                        <p className="text-dark-textMuted text-[11px] truncate">{conn.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {incoming.length > 0 && (
            <div>
              <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider mb-2">
                Recebe de ({incoming.length})
              </h3>
              <div className="space-y-1.5">
                {incoming.map((conn, i) => {
                  const s = CONNECTION_STYLES[conn.type];
                  const f = agents[conn.from];
                  if (!f) return null;
                  return (
                    <div key={i} className={`${s.bg} rounded-xl px-3 py-2 flex items-center gap-2`}>
                      <span className={`${s.color} w-5 text-center`}>
                        <AgentIcon name={s.icon} className="w-3.5 h-3.5 inline" />
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${s.color} w-16`}>{s.label}</span>
                      <span style={{ color: f.color }}>
                        <AgentIcon name={f.icon} className="w-4 h-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-dark-text text-xs font-medium">{f.humanName}</span>
                        <p className="text-dark-textMuted text-[11px] truncate">{conn.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {outgoing.length === 0 && incoming.length === 0 && (
            <p className="text-dark-textMuted text-sm">Nenhuma conexao mapeada.</p>
          )}
        </div>
      )}

      {/* ===== MEMORIA TAB ===== */}
      {activeTab === 'memoria' && (
        <div className="space-y-3">
          <h3 className="text-dark-textMuted text-xs font-semibold uppercase tracking-wider">
            Bancos de Dados ({dbAccess.length})
          </h3>
          {dbAccess.map((db) => {
            const r = db.readers.includes(agent.id);
            const w = db.writers.includes(agent.id);
            return (
              <div key={db.id} className="neu-inset rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <AgentIcon name={db.icon} className="w-4 h-4 text-dark-textMuted" />
                    <span className="text-dark-text text-xs font-medium">{db.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {r && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">READ</span>}
                    {w && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 font-medium">WRITE</span>}
                  </div>
                </div>
                <p className="text-dark-textMuted text-[11px]">{db.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== "RODAR AGORA" INLINE PANEL ===== */}
      {showRunInput && !isFired && (
        <div className="neu-inset rounded-xl p-3 space-y-2">
          <h4 className="text-dark-text text-xs font-bold flex items-center gap-1.5">
            <Play className="w-3 h-3 text-blue-400" />
            Rodar {agent.humanName}
          </h4>
          <textarea
            value={runInstruction}
            onChange={(e) => setRunInstruction(e.target.value)}
            placeholder={`Instrução para ${agent.codename}...`}
            rows={3}
            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50 resize-y"
            disabled={runLoading}
          />
          <div className="flex gap-2">
            <button
              onClick={handleRunAgent}
              disabled={runLoading || !runInstruction.trim()}
              className="neu-button px-3 py-1.5 text-blue-400 text-xs font-medium flex items-center gap-1.5 hover:bg-blue-500/10 disabled:opacity-50"
            >
              {runLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
              {runLoading ? 'Executando...' : 'Enviar'}
            </button>
            <button
              onClick={() => { setShowRunInput(false); setRunResult(null); setRunError(null); }}
              className="neu-button px-3 py-1.5 text-dark-textMuted text-xs font-medium hover:bg-dark-cardHover"
            >
              Cancelar
            </button>
          </div>
          {runResult && (
            <div className="neu-inset rounded-xl p-3 max-h-[200px] overflow-y-auto border-l-4 border-green-500">
              <MarkdownReport content={runResult} />
            </div>
          )}
          {runError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-red-400 text-xs">
              {runError}
            </div>
          )}
        </div>
      )}

      {/* ===== FIRE CONFIRMATION ===== */}
      {showFireConfirm && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 text-sm font-bold">Confirmar Demissão</span>
          </div>
          <p className="text-dark-textMuted text-xs">
            Tem certeza que deseja demitir <strong className="text-dark-text">{agent.humanName}</strong>? Esta ação é irreversível.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleFireAgent}
              disabled={fireLoading}
              className="neu-button px-3 py-1.5 text-red-400 text-xs font-medium flex items-center gap-1.5 hover:bg-red-500/10 disabled:opacity-50"
            >
              {fireLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserMinus className="w-3 h-3" />}
              {fireLoading ? 'Demitindo...' : 'Sim, Demitir'}
            </button>
            <button
              onClick={() => setShowFireConfirm(false)}
              className="neu-button px-3 py-1.5 text-dark-textMuted text-xs font-medium hover:bg-dark-cardHover"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ===== ACTIONS ===== */}
      {!isFired && (
        <div className="flex gap-2 pt-2 border-t border-dark-border">
          {agent.status === 'active' && (
            <button
              onClick={() => update({ status: 'idle' })}
              className="neu-button px-3 py-1.5 text-yellow-400 text-xs font-medium flex items-center gap-1.5 hover:bg-yellow-500/10"
            >
              <Pause className="w-3 h-3" /> Pausar
            </button>
          )}
          {(agent.status === 'idle' || agent.status === 'offline') && (
            <button
              onClick={() => update({ status: 'active' })}
              className="neu-button px-3 py-1.5 text-green-400 text-xs font-medium flex items-center gap-1.5 hover:bg-green-500/10"
            >
              <Power className="w-3 h-3" /> Ativar
            </button>
          )}
          <button
            onClick={() => setShowRunInput(!showRunInput)}
            className={`neu-button px-3 py-1.5 text-blue-400 text-xs font-medium flex items-center gap-1.5 hover:bg-blue-500/10 ${showRunInput ? 'ring-1 ring-blue-400/50' : ''}`}
          >
            <Play className="w-3 h-3" /> Rodar Agora
          </button>
          <button
            onClick={handleConfigure}
            className="neu-button px-3 py-1.5 text-dark-textMuted text-xs font-medium flex items-center gap-1.5 hover:bg-dark-cardHover"
          >
            <Settings className="w-3 h-3" /> Configurar
          </button>
          {agent.level === 'agent' && (
            <button
              onClick={() => setShowFireConfirm(true)}
              className="neu-button px-3 py-1.5 text-red-400 text-xs font-medium flex items-center gap-1.5 hover:bg-red-500/10 ml-auto"
            >
              <UserMinus className="w-3 h-3" /> Demitir
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================
// PROMPT TAB - Full editor
// ============================
function PromptTab({
  agent,
  model,
  onUpdate,
}: {
  agent: Agent;
  model: { name: string; textColor: string; bg: string; border: string; desc: string };
  onUpdate: (updates: Partial<Agent>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(agent.systemPrompt);

  useEffect(() => {
    setDraft(agent.systemPrompt);
    setEditing(false);
  }, [agent.id, agent.systemPrompt]);

  const handleSave = () => {
    onUpdate({ systemPrompt: draft });
    setEditing(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-dark-textMuted text-sm font-semibold">System Prompt</h3>
        <div className="flex items-center gap-2">
          <span className="text-dark-textMuted text-xs">
            {(editing ? draft : agent.systemPrompt).length} chars
          </span>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="neu-button px-2.5 py-1 text-ufc-red text-xs font-medium flex items-center gap-1.5 hover:bg-ufc-red/10"
            >
              <Pencil className="w-3.5 h-3.5" /> Editar Prompt
            </button>
          ) : (
            <div className="flex gap-1.5">
              <button
                onClick={handleSave}
                className="neu-button px-2.5 py-1 text-green-400 text-xs font-medium flex items-center gap-1.5 hover:bg-green-500/10"
              >
                <Check className="w-3.5 h-3.5" /> Salvar
              </button>
              <button
                onClick={() => { setDraft(agent.systemPrompt); setEditing(false); }}
                className="neu-button px-2.5 py-1 text-dark-textMuted text-xs font-medium flex items-center gap-1.5 hover:bg-dark-cardHover"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full bg-dark-bg border-2 border-ufc-red/30 rounded-xl p-4 text-xs text-dark-text font-mono leading-relaxed resize-y min-h-[400px] focus:outline-none focus:ring-2 focus:ring-ufc-red/50 focus:border-ufc-red/50"
          autoFocus
        />
      ) : (
        <pre className="neu-inset rounded-xl p-3 text-xs text-dark-textMuted leading-relaxed whitespace-pre-wrap font-mono max-h-[60vh] overflow-y-auto">
          {agent.systemPrompt}
        </pre>
      )}

      <div className={`rounded-xl p-2.5 ${model.bg} border ${model.border}`}>
        <p className="text-xs text-dark-textMuted">
          <span className={`font-semibold ${model.textColor}`}>{model.name}</span> — {model.desc}
        </p>
      </div>
    </div>
  );
}
