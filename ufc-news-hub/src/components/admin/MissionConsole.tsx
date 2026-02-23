'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Crown,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  Zap,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Radio,
  Terminal,
  X,
  Minimize2,
  RotateCcw,
  StopCircle,
  Shield,
  Wrench,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { MarkdownReport } from './MarkdownReport';
import type { Agent, AgentStatus } from '@/lib/admin/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeedEntry {
  type: string;
  data: Record<string, unknown>;
  ts: number;
}

interface MissionConsoleProps {
  events: FeedEntry[];
  processing: boolean;
  agents: Record<string, Agent>;
  onDismiss?: () => void;
  minimized?: boolean;
  onToggleMinimize?: () => void;
  promptId?: string;
  autoDismissCountdown?: boolean;
}

interface ApprovalData {
  approvalId: string;
  agentId: string;
  agentCodename: string;
  actionType: string;
  description: string;
  payload?: string;
  output?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(ts: number): string {
  const diff = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (diff < 5) return 'agora';
  if (diff < 60) return `h\u00e1 ${diff}s`;
  if (diff < 3600) return `h\u00e1 ${Math.floor(diff / 60)}min`;
  return `h\u00e1 ${Math.floor(diff / 3600)}h`;
}

const STATUS_DOT: Record<AgentStatus, string> = {
  active: 'bg-green-400',
  idle: 'bg-gray-400',
  warning: 'bg-yellow-400',
  error: 'bg-red-400',
  offline: 'bg-gray-600',
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  active: 'Ativo',
  idle: 'Inativo',
  warning: 'Alerta',
  error: 'Erro',
  offline: 'Offline',
};

function getPayloadPreview(payload: string | undefined): string | undefined {
  if (!payload) return undefined;
  try {
    const parsed = JSON.parse(payload);
    if (parsed.title) return `"${parsed.title as string}"`;
    if (parsed.question) return `"${parsed.question as string}"`;
    return undefined;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// AgentAvatar
// ---------------------------------------------------------------------------

function AgentAvatar({ agent, size = 28 }: { agent?: Agent; size?: number }) {
  const px = `${size}px`;
  if (!agent) {
    return <div className="rounded-lg bg-dark-bg flex-shrink-0" style={{ width: px, height: px }} />;
  }
  if (agent.avatarUrl) {
    return (
      <div className="rounded-lg overflow-hidden flex-shrink-0 neu-inset" style={{ width: px, height: px }}>
        <Image src={agent.avatarUrl} alt={agent.humanName} width={size} height={size} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="rounded-lg flex-shrink-0 neu-inset flex items-center justify-center text-xs"
      style={{ width: px, height: px, color: agent.color }}
    >
      {agent.humanName.charAt(0)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AgentDrawer — inline expandable detail card (Feature 4)
// ---------------------------------------------------------------------------

function AgentDrawer({
  agent,
  currentToolCall,
  pendingApproval,
  failedTaskId,
  onApproval,
  onRetry,
}: {
  agent: Agent;
  currentToolCall?: string;
  pendingApproval?: ApprovalData;
  failedTaskId?: string;
  onApproval?: (approvalId: string, action: 'approve' | 'reject') => void;
  onRetry?: (taskId: string) => void;
}) {
  const [outputExpanded, setOutputExpanded] = useState(false);

  return (
    <div className="slide-in-right ml-10 mr-2 mb-2 mt-1 neu-inset rounded-xl p-3 space-y-2 border border-dark-border/50">
      {/* Agent header */}
      <div className="flex items-center gap-3">
        <AgentAvatar agent={agent} size={36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-dark-text text-xs font-bold">{agent.humanName}</span>
            <span className="text-dark-textMuted text-[10px] font-mono">@{agent.codename}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[agent.status]} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
            <span className="text-dark-textMuted text-[10px]">{STATUS_LABEL[agent.status]}</span>
            <span className="text-dark-textMuted text-[10px]">Lv.{agent.agentLevel} {agent.levelTitle}</span>
          </div>
        </div>
      </div>

      {/* Current tool call */}
      {currentToolCall && (
        <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-500/5 rounded-lg px-2.5 py-1.5">
          <Wrench className="w-3 h-3 shrink-0" />
          <span className="font-mono text-[10px] truncate">{currentToolCall}</span>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-3 text-[10px] text-dark-textMuted">
        <span>{agent.tasksCompleted} tasks</span>
        <span>{agent.weeklySuccessRate}% sucesso</span>
        {agent.avgResponseTime > 0 && <span>{(agent.avgResponseTime / 1000).toFixed(1)}s avg</span>}
      </div>

      {/* Pending approval inline */}
      {pendingApproval && onApproval && (
        <div className="flex items-center gap-2 pt-1 border-t border-dark-border/30">
          <span className="text-orange-400 text-[10px] flex-1 truncate">{pendingApproval.description}</span>
          <button
            onClick={() => onApproval(pendingApproval.approvalId, 'approve')}
            className="neu-button px-2 py-1 text-[10px] font-semibold text-green-400 hover:bg-green-500/10 transition-colors rounded-lg"
          >
            Aprovar
          </button>
          <button
            onClick={() => onApproval(pendingApproval.approvalId, 'reject')}
            className="neu-button px-2 py-1 text-[10px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors rounded-lg"
          >
            Rejeitar
          </button>
        </div>
      )}

      {/* Failed task retry */}
      {failedTaskId && onRetry && (
        <div className="flex items-center gap-2 pt-1 border-t border-dark-border/30">
          <XCircle className="w-3 h-3 text-red-400 shrink-0" />
          <span className="text-red-400 text-[10px] flex-1">Task falhou</span>
          <button
            onClick={() => onRetry(failedTaskId)}
            className="neu-button px-2 py-1 text-[10px] font-semibold text-yellow-400 hover:bg-yellow-500/10 transition-colors rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Retry
          </button>
        </div>
      )}

      {/* Output preview */}
      {pendingApproval?.output && (
        <div className="pt-1 border-t border-dark-border/30">
          <button
            onClick={() => setOutputExpanded(!outputExpanded)}
            className="text-dark-textMuted text-[10px] hover:text-dark-text flex items-center gap-1 transition-colors"
          >
            {outputExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {outputExpanded ? 'Esconder output' : 'Ver output'}
          </button>
          {outputExpanded && (
            <p className="text-dark-textMuted text-[10px] mt-1 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
              {pendingApproval.output}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ClickableAgentName (Feature 4)
// ---------------------------------------------------------------------------

function ClickableAgentName({
  name,
  agentId,
  expandedAgent,
  onToggle,
}: {
  name: string;
  agentId?: string;
  expandedAgent: string | null;
  onToggle: (id: string) => void;
}) {
  if (!agentId) {
    return <span className="text-dark-text text-xs font-bold">{name}</span>;
  }
  const isExpanded = expandedAgent === agentId;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(agentId);
      }}
      className={`text-xs font-bold transition-colors cursor-pointer ${
        isExpanded ? 'text-ufc-red underline' : 'text-dark-text hover:text-ufc-red hover:underline'
      }`}
    >
      {name}
    </button>
  );
}

// ---------------------------------------------------------------------------
// ConsoleEntry — enhanced with clickable agents + tool calls
// ---------------------------------------------------------------------------

function ConsoleEntry({
  entry,
  agents,
  expandedAgent,
  onToggleAgent,
  agentToolCalls,
  pendingApprovals,
  failedTasks,
  onApproval,
  onRetry,
}: {
  entry: FeedEntry;
  agents: Record<string, Agent>;
  expandedAgent: string | null;
  onToggleAgent: (id: string) => void;
  agentToolCalls: Map<string, string>;
  pendingApprovals: Map<string, ApprovalData>;
  failedTasks: Map<string, string>;
  onApproval: (approvalId: string, action: 'approve' | 'reject') => void;
  onRetry: (taskId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { type, data, ts } = entry;

  // Helper to render agent drawer if this agent is expanded
  const renderDrawer = (id: string | undefined) => {
    if (!id || expandedAgent !== id) return null;
    const drawerAgent = agents[id];
    if (!drawerAgent) return null;
    const toolCall = agentToolCalls.get(id);
    // Find pending approval for this agent
    let agentPendingApproval: ApprovalData | undefined;
    pendingApprovals.forEach((ap) => {
      if (ap.agentId === id) agentPendingApproval = ap;
    });
    const failedTaskId = failedTasks.get(id);
    return (
      <AgentDrawer
        agent={drawerAgent}
        currentToolCall={toolCall}
        pendingApproval={agentPendingApproval}
        failedTaskId={failedTaskId}
        onApproval={onApproval}
        onRetry={onRetry}
      />
    );
  };

  // --- ceo_thinking ---
  if (type === 'ceo_thinking') {
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3">
          <AgentAvatar agent={agents.ceo} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClickableAgentName name="Ricardo Miura" agentId="ceo" expandedAgent={expandedAgent} onToggle={onToggleAgent} />
              <span className="text-dark-textMuted text-[10px]">{relativeTime(ts)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-ufc-red font-semibold uppercase tracking-wider">{'\ud83e\udde0'} Analisando</span>
              <Loader2 className="w-3 h-3 animate-spin text-ufc-red" />
            </div>
            <p className="text-dark-textMuted text-xs mt-1">Ricardo Miura est{'\u00e1'} analisando seu prompt...</p>
          </div>
        </div>
        {renderDrawer('ceo')}
      </div>
    );
  }

  // --- ceo_analysis ---
  if (type === 'ceo_analysis') {
    const delegations = (data.delegations ?? []) as Array<Record<string, unknown>>;
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3 border-l-2 border-ufc-red/40">
          <AgentAvatar agent={agents.ceo} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClickableAgentName name="Ricardo Miura" agentId="ceo" expandedAgent={expandedAgent} onToggle={onToggleAgent} />
              <span className="text-[10px] text-ufc-red font-semibold uppercase tracking-wider">{'\ud83d\udccb'} An{'\u00e1'}lise</span>
              <span className="text-dark-textMuted text-[10px] ml-auto">{relativeTime(ts)}</span>
            </div>
            <p className="text-dark-textMuted text-xs leading-relaxed mb-2">{data.analysis as string}</p>
            {delegations.length > 0 && (
              <div className="neu-inset rounded-lg p-2 space-y-1">
                <span className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">
                  Agentes ativados ({delegations.length})
                </span>
                {delegations.map((d, i) => {
                  const dAgentId = d.agentId as string;
                  const dAgent = agents[dAgentId];
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <Zap className={`w-3 h-3 ${d.priority === 'high' ? 'text-red-400' : d.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`} />
                      <ClickableAgentName
                        name={dAgent?.humanName || dAgentId}
                        agentId={dAgentId}
                        expandedAgent={expandedAgent}
                        onToggle={onToggleAgent}
                      />
                      {d.requiresApproval ? (
                        <span className="text-orange-400 text-[10px] bg-orange-500/10 px-1.5 py-0.5 rounded">
                          Aprova{'\u00e7\u00e3'}o necess{'\u00e1'}ria
                        </span>
                      ) : (
                        <span className="text-green-400/60 text-[10px]">Auto-aprovado {'\u2713'}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {(data.risks as string[] | undefined)?.length ? (
              <div className="flex items-start gap-2 text-xs text-orange-400 bg-orange-500/10 rounded-lg px-3 py-2 mt-2">
                <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                <span>{(data.risks as string[]).join('; ')}</span>
              </div>
            ) : null}
          </div>
        </div>
        {renderDrawer('ceo')}
      </div>
    );
  }

  // --- task_created ---
  if (type === 'task_created') {
    const taskAgent = agents[data.agentId as string];
    const taskAgentId = data.agentId as string;
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3">
          <AgentAvatar agent={taskAgent} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClickableAgentName
                name={data.agentCodename as string}
                agentId={taskAgentId}
                expandedAgent={expandedAgent}
                onToggle={onToggleAgent}
              />
              <span className="text-dark-textMuted text-[10px]">{relativeTime(ts)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">{'\u26a1'} Task enviada</span>
              <span className="text-dark-textMuted text-[10px]">{data.priority as string}</span>
            </div>
            {typeof data.instruction === 'string' && (
              <p className="text-dark-textMuted text-[10px] mt-1 line-clamp-2">{data.instruction}</p>
            )}
          </div>
        </div>
        {renderDrawer(taskAgentId)}
      </div>
    );
  }

  // --- agent_start (enhanced with live tool call — Feature 5) ---
  if (type === 'agent_start') {
    const startAgent = agents[data.agentId as string];
    const startAgentId = data.agentId as string;
    const liveToolCall = startAgentId ? agentToolCalls.get(startAgentId) : undefined;
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3 mission-active-pulse">
          <AgentAvatar agent={startAgent} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClickableAgentName
                name={data.agentCodename as string}
                agentId={startAgentId}
                expandedAgent={expandedAgent}
                onToggle={onToggleAgent}
              />
              <Loader2 className="w-3 h-3 animate-spin text-yellow-400" />
              <span className="text-dark-textMuted text-[10px] ml-auto">{relativeTime(ts)}</span>
            </div>
            <span className="text-[10px] text-yellow-400 font-semibold uppercase tracking-wider">
              {'\ud83d\udd04'} Executando{data.toolName ? ` ${data.toolName as string}...` : '...'}
            </span>
            {/* Live tool call display (Feature 5) */}
            {liveToolCall && (
              <div className="flex items-center gap-1.5 mt-1">
                <Wrench className="w-3 h-3 text-yellow-400/70" />
                <span className="text-[10px] text-yellow-400/70 font-mono truncate">{liveToolCall}</span>
              </div>
            )}
            {Array.isArray(data.tools) && (
              <div className="mt-1 flex flex-wrap gap-1">
                {(data.tools as string[]).map((tool, i) => (
                  <span key={i} className="text-[10px] bg-dark-bg px-1.5 py-0.5 rounded text-dark-textMuted font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {renderDrawer(startAgentId)}
      </div>
    );
  }

  // --- agent_done ---
  if (type === 'agent_done') {
    const doneAgent = agents[data.agentId as string];
    const doneAgentId = data.agentId as string;
    const output = data.output as string | undefined;
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3 border-l-2 border-green-500/40">
          <AgentAvatar agent={doneAgent} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <ClickableAgentName
                name={data.agentCodename as string}
                agentId={doneAgentId}
                expandedAgent={expandedAgent}
                onToggle={onToggleAgent}
              />
              <span className="text-dark-textMuted text-[10px] ml-auto">
                {data.durationMs ? `${((data.durationMs as number) / 1000).toFixed(1)}s` : ''}
                {' \u00b7 '}{relativeTime(ts)}
              </span>
            </div>
            <span className="text-[10px] text-green-400 font-semibold uppercase tracking-wider">{'\u2705'} Conclu{'\u00ed'}do</span>
            {typeof data.tokensInput === 'number' && (
              <span className="text-dark-textMuted text-[10px] ml-2">
                {data.tokensInput}{'\u2192'}{data.tokensOutput as number} tokens
              </span>
            )}
            {output && (
              <div className="mt-1">
                <p className="text-dark-textMuted text-xs leading-relaxed whitespace-pre-wrap">
                  {expanded ? output : output.slice(0, 150) + (output.length > 150 ? '...' : '')}
                </p>
                {output.length > 150 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-ufc-red text-[10px] font-medium flex items-center gap-1 hover:underline mt-1"
                  >
                    {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {expanded ? 'Menos' : 'Ver mais'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {renderDrawer(doneAgentId)}
      </div>
    );
  }

  // --- agent_error ---
  if (type === 'agent_error') {
    const errAgent = agents[data.agentId as string];
    const errAgentId = data.agentId as string;
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3 border-l-2 border-red-500/40">
          <AgentAvatar agent={errAgent} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <ClickableAgentName
                name={(data.agentName as string) || (data.agentCodename as string)}
                agentId={errAgentId}
                expandedAgent={expandedAgent}
                onToggle={onToggleAgent}
              />
              <span className="text-dark-textMuted text-[10px] ml-auto">{relativeTime(ts)}</span>
            </div>
            <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">{'\u274c'} Erro</span>
            <p className="text-red-400/80 text-xs mt-1">{data.error as string}</p>
          </div>
        </div>
        {renderDrawer(errAgentId)}
      </div>
    );
  }

  // --- approval_needed: handled by ApprovalEntry below, return null ---
  if (type === 'approval_needed') {
    return null;
  }

  // --- approval_resolved ---
  if (type === 'approval_resolved') {
    const resolvedResult = data.result as string;
    const isApproved = resolvedResult === 'approved';
    return (
      <div className="slide-in-right flex gap-3 p-3">
        <div className="w-7 h-7 flex-shrink-0" />
        <div className="flex items-center gap-2">
          {isApproved ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <XCircle className="w-3.5 h-3.5 text-red-400" />
          )}
          <span className={`text-xs font-semibold ${isApproved ? 'text-green-400' : 'text-red-400'}`}>
            {isApproved
              ? `${'\u2705'} Aprovado \u2014 pipeline continuando...`
              : resolvedResult === 'timeout'
                ? `${'\u23f0'} Timeout \u2014 aguardou 30min sem resposta`
                : `${'\u274c'} Rejeitado \u2014 agentes dependentes n\u00e3o executar\u00e3o`}
          </span>
        </div>
      </div>
    );
  }

  // --- consolidating ---
  if (type === 'consolidating') {
    return (
      <div>
        <div className="slide-in-right flex gap-3 p-3 mission-active-pulse">
          <AgentAvatar agent={agents.ceo} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClickableAgentName name="Ricardo Miura" agentId="ceo" expandedAgent={expandedAgent} onToggle={onToggleAgent} />
              <Loader2 className="w-3 h-3 animate-spin text-ufc-red" />
              <span className="text-dark-textMuted text-[10px] ml-auto">{relativeTime(ts)}</span>
            </div>
            <span className="text-[10px] text-ufc-red font-semibold uppercase tracking-wider">{'\ud83d\udc51'} Consolidando relat{'\u00f3'}rios...</span>
          </div>
        </div>
        {renderDrawer('ceo')}
      </div>
    );
  }

  // --- done ---
  if (type === 'done') {
    const hasError = !!data.error;
    const summaryText = data.summary as string | undefined;
    return (
      <div className="slide-in-right p-3 border-l-2 border-ufc-red/40">
        <div className="flex items-center gap-2 mb-2">
          {hasError ? (
            <XCircle className="w-4 h-4 text-red-400" />
          ) : (
            <Crown className="w-4 h-4 text-ufc-red" />
          )}
          <span className="text-dark-text text-sm font-bold">
            {hasError ? 'Erro no processamento' : `${'\ud83d\udcca'} Relat\u00f3rio Final`}
          </span>
          {!hasError && (
            <span className="text-dark-textMuted text-[10px] ml-auto">
              {data.tasksCompleted as number} agentes {'\u00b7'} {data.tasksFailed as number} falhas
            </span>
          )}
        </div>
        {hasError && (
          <p className="text-red-400 text-xs">{data.error as string}</p>
        )}
        {summaryText && (
          <div className="space-y-2">
            <div className="neu-inset rounded-xl p-4 max-h-[50vh] overflow-y-auto">
              <MarkdownReport content={summaryText} />
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(summaryText)}
              className="text-dark-textMuted text-[10px] hover:text-ufc-red transition-colors flex items-center gap-1"
            >
              <ClipboardList className="w-3 h-3" />
              Copiar relat{'\u00f3'}rio
            </button>
          </div>
        )}
      </div>
    );
  }

  // Fallback for unknown events
  return null;
}

// ---------------------------------------------------------------------------
// ApprovalEntry — enhanced with big buttons + transition states (Feature 2)
// ---------------------------------------------------------------------------

function ApprovalEntry({
  entry,
  agents,
  onApprovalResolved,
  expandedAgent,
  onToggleAgent,
}: {
  entry: FeedEntry;
  agents: Record<string, Agent>;
  onApprovalResolved: (approvalId: string, action: 'approve' | 'reject') => void;
  expandedAgent: string | null;
  onToggleAgent: (id: string) => void;
}) {
  const { authFetch } = useAdminAuth();
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [loading, setLoading] = useState(false);
  const [payloadExpanded, setPayloadExpanded] = useState(false);
  const { data, ts } = entry;

  const approvalId = data.approvalId as string | undefined;
  const agentId = data.agentId as string | undefined;
  const agent = agentId ? agents[agentId] : undefined;
  const actionType = data.actionType as string | undefined;
  const description = data.description as string | undefined;
  const output = data.output as string | undefined;
  const payload = data.payload as string | undefined;
  const payloadPreview = getPayloadPreview(payload);

  if (!approvalId) return null;

  const handleAction = async (action: 'approve' | 'reject') => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/company/approvals/${approvalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reviewedBy: 'gabriel' }),
      });
      if (res.ok) {
        setStatus(action === 'approve' ? 'approved' : 'rejected');
        onApprovalResolved(approvalId, action);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  // --- Approved compact state ---
  if (status === 'approved') {
    return (
      <div className="slide-in-right flex items-center gap-2 px-3 py-2.5 border-l-4 border-green-500/60 bg-green-500/5">
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-xs font-semibold">Aprovado</span>
        {agent && <span className="text-dark-textMuted text-[10px]">{'\u2014'} {agent.humanName}</span>}
        {actionType && <span className="text-dark-textMuted text-[10px] ml-auto bg-dark-bg px-1.5 py-0.5 rounded font-mono">{actionType}</span>}
      </div>
    );
  }

  // --- Rejected compact state ---
  if (status === 'rejected') {
    return (
      <div className="slide-in-right flex items-center gap-2 px-3 py-2.5 border-l-4 border-red-500/60 bg-red-500/5">
        <XCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs font-semibold">Rejeitado</span>
        {agent && <span className="text-dark-textMuted text-[10px]">{'\u2014'} {agent.humanName}</span>}
        {actionType && <span className="text-dark-textMuted text-[10px] ml-auto bg-dark-bg px-1.5 py-0.5 rounded font-mono">{actionType}</span>}
      </div>
    );
  }

  // --- Pending interactive state ---
  return (
    <div className="slide-in-right border-l-4 border-orange-400 bg-orange-500/5 p-3 space-y-2.5" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
      {/* Agent row */}
      <div className="flex items-center gap-3">
        <AgentAvatar agent={agent} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <ClickableAgentName
              name={agent?.humanName || (data.agentCodename as string) || 'Agente'}
              agentId={agentId}
              expandedAgent={expandedAgent}
              onToggle={onToggleAgent}
            />
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-dark-textMuted text-[10px] ml-auto">{relativeTime(ts)}</span>
          </div>
          <span className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">
            {'\u23f3'} Aguardando sua aprova{'\u00e7\u00e3'}o
          </span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-dark-textMuted text-xs leading-relaxed">{description}</p>
      )}

      {/* Action type badge + payload preview */}
      <div className="flex items-center gap-2 flex-wrap">
        {actionType && (
          <span className="text-orange-400 text-[10px] bg-orange-500/10 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            {actionType}
          </span>
        )}
        {payloadPreview && (
          <span className="text-dark-text text-[10px] truncate">{payloadPreview}</span>
        )}
      </div>

      {/* Collapsible payload/output preview */}
      {(payload || output) && (
        <div>
          <button
            onClick={() => setPayloadExpanded(!payloadExpanded)}
            className="text-orange-400/70 text-[10px] font-medium flex items-center gap-1 hover:text-orange-400 transition-colors"
          >
            {payloadExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {payloadExpanded ? 'Esconder detalhes' : 'Ver detalhes'}
          </button>
          {payloadExpanded && (
            <div className="mt-1.5 neu-inset rounded-lg p-2 max-h-40 overflow-y-auto">
              {output && (
                <p className="text-dark-textMuted text-[10px] whitespace-pre-wrap leading-relaxed mb-2">{output}</p>
              )}
              {payload && (
                <pre className="text-dark-textMuted text-[10px] font-mono whitespace-pre-wrap leading-relaxed">
                  {(() => {
                    try {
                      return JSON.stringify(JSON.parse(payload), null, 2);
                    } catch {
                      return payload;
                    }
                  })()}
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {/* Big action buttons — h-11 (44px) */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => handleAction('approve')}
          disabled={loading}
          className="flex-1 h-11 neu-button rounded-xl text-sm font-bold text-green-400 bg-green-600/10 hover:bg-green-500/20 border border-green-500/30 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Aprovar
        </button>
        <button
          onClick={() => handleAction('reject')}
          disabled={loading}
          className="flex-1 h-11 neu-button rounded-xl text-sm font-bold text-red-400 bg-red-600/10 hover:bg-red-500/20 border border-red-500/30 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
          Rejeitar
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BatchApprovalCard — approve all pending of same actionType (Feature 3)
// ---------------------------------------------------------------------------

function BatchApprovalCard({
  actionType,
  approvals,
  onBatchComplete,
}: {
  actionType: string;
  approvals: ApprovalData[];
  onBatchComplete: (ids: string[]) => void;
}) {
  const { authFetch } = useAdminAuth();
  const [state, setState] = useState<'idle' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  const handleBatchApprove = async () => {
    setState('processing');
    const ids: string[] = [];
    for (let i = 0; i < approvals.length; i++) {
      try {
        await authFetch(`/api/company/approvals/${approvals[i].approvalId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'approve', reviewedBy: 'gabriel' }),
        });
        ids.push(approvals[i].approvalId);
      } catch {
        // continue with others
      }
      setProgress(i + 1);
    }
    setState('done');
    onBatchComplete(ids);
  };

  if (state === 'done') {
    return (
      <div className="slide-in-right flex items-center gap-2 px-4 py-3 bg-green-500/5 border-l-4 border-green-500/60">
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-xs font-semibold">{progress} a{'\u00e7\u00f5'}es aprovadas</span>
        <span className="text-dark-textMuted text-[10px] ml-auto bg-dark-bg px-1.5 py-0.5 rounded font-mono">{actionType}</span>
      </div>
    );
  }

  return (
    <div className="slide-in-right border-l-4 border-orange-400 bg-orange-500/5 p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-orange-400" />
        <span className="text-orange-400 text-xs font-semibold">
          {approvals.length} aprova{'\u00e7\u00f5'}es pendentes do tipo
        </span>
        <span className="text-orange-400 text-[10px] bg-orange-500/10 px-2 py-0.5 rounded-full font-mono uppercase">
          {actionType}
        </span>
      </div>
      {state === 'processing' ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
          <span className="text-orange-400 text-xs">Aprovando {progress}/{approvals.length}...</span>
          <div className="flex-1 h-1.5 bg-dark-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 rounded-full transition-all duration-300"
              style={{ width: `${(progress / approvals.length) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={handleBatchApprove}
          className="w-full h-10 neu-button rounded-xl text-sm font-bold text-orange-400 bg-orange-600/10 hover:bg-orange-500/20 border border-orange-500/30 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Aprovar Todos ({approvals.length})
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MissionConsole — main component (all features integrated)
// ---------------------------------------------------------------------------

export function MissionConsole({
  events,
  processing,
  agents,
  onDismiss,
  minimized,
  onToggleMinimize,
  promptId,
  autoDismissCountdown = false,
}: MissionConsoleProps) {
  const { authFetch } = useAdminAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const approvalScrollRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss countdown timer
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!autoDismissCountdown) {
      setCountdown(30);
      return;
    }
    // Tick every second
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [autoDismissCountdown]);

  // Feature 4: Clickable agents — only one drawer open at a time
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  // Feature 5: Tool calls per agent
  const [agentToolCalls, setAgentToolCalls] = useState<Map<string, string>>(new Map());

  // Feature 2 & 3: Pending approvals tracking
  const [pendingApprovals, setPendingApprovals] = useState<Map<string, ApprovalData>>(new Map());

  // Track locally resolved approval IDs so the useEffect doesn't re-add them
  // before the SSE approval_resolved event arrives
  const locallyResolvedRef = useRef<Set<string>>(new Set());

  // Feature 7: Failed tasks tracking
  const [failedTasks, setFailedTasks] = useState<Map<string, string>>(new Map());

  // Cancel mission loading state
  const [cancelling, setCancelling] = useState(false);

  // Retry failures loading state
  const [retrying, setRetrying] = useState(false);

  const handleToggleAgent = useCallback((id: string) => {
    setExpandedAgent((prev) => (prev === id ? null : id));
  }, []);

  // Process events to extract pending approvals, tool calls, and failed tasks
  useEffect(() => {
    const newPending = new Map<string, ApprovalData>();
    const newToolCalls = new Map<string, string>();
    const newFailed = new Map<string, string>();
    const resolvedApprovalIds = new Set<string>();

    for (const event of events) {
      const { type, data } = event;

      if (type === 'approval_resolved') {
        const aId = data.approvalId as string | undefined;
        if (aId) resolvedApprovalIds.add(aId);
      }

      if (type === 'approval_needed') {
        const aId = data.approvalId as string | undefined;
        if (aId && !resolvedApprovalIds.has(aId) && !locallyResolvedRef.current.has(aId)) {
          newPending.set(aId, {
            approvalId: aId,
            agentId: data.agentId as string,
            agentCodename: (data.agentCodename as string) || (data.agentName as string) || '',
            actionType: (data.actionType as string) || 'unknown',
            description: (data.description as string) || '',
            payload: data.payload as string | undefined,
            output: data.output as string | undefined,
          });
        }
      }

      // Feature 5: agent_tool_call events update the live tool display
      if (type === 'agent_tool_call') {
        const toolAgentId = data.agentId as string;
        const toolName = data.toolName as string;
        const argsPreview = data.argsPreview as string | undefined;
        const display = argsPreview
          ? `${toolName}(${argsPreview})`
          : `${toolName}()`;
        newToolCalls.set(toolAgentId, display);
      }

      if (type === 'agent_error') {
        const errAgentId = data.agentId as string;
        const taskId = data.taskId as string | undefined;
        if (taskId) {
          newFailed.set(errAgentId, taskId);
        }
      }

      // Clear tool call and failed state when agent finishes successfully
      if (type === 'agent_done') {
        const doneAgentId = data.agentId as string;
        newToolCalls.delete(doneAgentId);
        newFailed.delete(doneAgentId);
      }
    }

    setPendingApprovals(newPending);
    setAgentToolCalls(newToolCalls);
    setFailedTasks(newFailed);
  }, [events]);

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events.length]);

  // Auto-scroll to approval card when a new one appears
  useEffect(() => {
    if (pendingApprovals.size > 0 && approvalScrollRef.current) {
      approvalScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [pendingApprovals.size]);

  // Handle approval resolution (remove from pending map + track locally)
  const handleApprovalResolved = useCallback((approvalId: string, _action: 'approve' | 'reject') => {
    locallyResolvedRef.current.add(approvalId);
    setPendingApprovals((prev) => {
      const next = new Map(prev);
      next.delete(approvalId);
      return next;
    });
  }, []);

  // Handle task retry
  const handleRetryTask = useCallback(async (taskId: string) => {
    try {
      await authFetch(`/api/company/tasks/${taskId}/retry`, { method: 'POST' });
      setFailedTasks((prev) => {
        const next = new Map(prev);
        for (const [agentId, tid] of next) {
          if (tid === taskId) {
            next.delete(agentId);
            break;
          }
        }
        return next;
      });
    } catch {
      // silently fail
    }
  }, [authFetch]);

  // Feature 6: Cancel mission
  const handleCancelMission = useCallback(async () => {
    if (!promptId) return;
    setCancelling(true);
    try {
      await authFetch(`/api/company/prompt/${promptId}/cancel`, { method: 'POST' });
    } catch {
      // silently fail
    } finally {
      setCancelling(false);
    }
  }, [authFetch, promptId]);

  // Feature 7: Retry all failures
  const handleRetryAllFailures = useCallback(async () => {
    setRetrying(true);
    const taskIds = Array.from(failedTasks.values());
    for (const taskId of taskIds) {
      try {
        await authFetch(`/api/company/tasks/${taskId}/retry`, { method: 'POST' });
      } catch {
        // continue
      }
    }
    setFailedTasks(new Map());
    setRetrying(false);
  }, [authFetch, failedTasks]);

  // Handle batch approval complete
  const handleBatchComplete = useCallback((ids: string[]) => {
    for (const id of ids) {
      locallyResolvedRef.current.add(id);
    }
    setPendingApprovals((prev) => {
      const next = new Map(prev);
      for (const id of ids) {
        next.delete(id);
      }
      return next;
    });
  }, []);

  // Feature 3: Compute batch approval groups (3+ of same actionType)
  const batchGroups = new Map<string, ApprovalData[]>();
  pendingApprovals.forEach((ap) => {
    const existing = batchGroups.get(ap.actionType) || [];
    existing.push(ap);
    batchGroups.set(ap.actionType, existing);
  });
  const batchApprovals: Array<{ actionType: string; approvals: ApprovalData[] }> = [];
  batchGroups.forEach((approvals, actionType) => {
    if (approvals.length >= 3) {
      batchApprovals.push({ actionType, approvals });
    }
  });

  // Determine state for footer
  const failureCount = failedTasks.size;
  const isDone = events.some((e) => e.type === 'done');

  // -----------------------------------------------------------------------
  // Feature 1: Minimized state — slim vertical bar
  // -----------------------------------------------------------------------
  if (minimized) {
    const pendingCount = pendingApprovals.size;
    return (
      <div
        className="fixed right-6 top-24 bottom-6 w-[60px] z-50 neu-card rounded-2xl border border-ufc-red/20 flex flex-col items-center justify-center cursor-pointer hover:border-ufc-red/40 transition-colors shadow-2xl shadow-black/40"
        onClick={onToggleMinimize}
        title="Expandir Mission Control"
      >
        {/* Pulsing red dot when processing */}
        <div className="relative mb-3">
          <Radio className="w-5 h-5 text-ufc-red" />
          {processing && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-ufc-red rounded-full animate-pulse" />
          )}
        </div>

        {/* Pending approvals badge */}
        {pendingCount > 0 && (
          <span className="absolute top-3 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            {pendingCount}
          </span>
        )}

        {/* Vertical rotated text */}
        <span
          className="text-dark-textMuted text-[10px] font-bold uppercase tracking-widest"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Mission Control
        </span>

        {events.length > 0 && (
          <span className="mt-3 text-[10px] text-ufc-red font-semibold">{events.length}</span>
        )}
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Full console — expanded state
  // -----------------------------------------------------------------------
  return (
    <div className={`fixed right-6 top-24 bottom-6 w-[420px] z-50 mission-panel-enter flex flex-col neu-card rounded-2xl border border-ufc-red/20 overflow-hidden ${processing ? 'mission-console-glow mission-scan-line' : 'shadow-2xl shadow-black/40'}`}>
      {/* Header — Feature 6: cancel mission + always-visible X */}
      <div className={`flex items-center gap-3 px-4 py-3 border-b border-dark-border ${processing ? 'bg-gradient-to-r from-dark-card via-ufc-red/5 to-dark-card' : 'bg-dark-card/80'}`}>
        <div className="relative">
          <Radio className="w-4 h-4 text-ufc-red" />
          {processing && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-dark-text text-sm font-bold">Mission Control</h3>
          <p className="text-dark-textMuted text-[10px]">
            {processing ? 'Processando em tempo real...' : '✅ Missão completa'}
          </p>
        </div>
        {processing && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">LIVE</span>
            </div>
            {/* Cancel Mission button */}
            {promptId && (
              <button
                onClick={handleCancelMission}
                disabled={cancelling}
                className="neu-button px-2.5 py-1 text-[10px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors rounded-lg flex items-center gap-1 disabled:opacity-40"
                title="Cancelar miss\u00e3o"
              >
                {cancelling ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <StopCircle className="w-3 h-3" />
                )}
                Cancelar
              </button>
            )}
          </div>
        )}
        {!processing && events.length > 0 && (
          <div className="flex items-center gap-1.5 mr-2">
            <Terminal className="w-3.5 h-3.5 text-dark-textMuted" />
            <span className="text-dark-textMuted text-[10px]">{events.length} eventos</span>
          </div>
        )}
        {/* Minimize + Dismiss — ALWAYS visible */}
        <div className="flex items-center gap-1">
          {onToggleMinimize && (
            <button
              onClick={onToggleMinimize}
              className="neu-button p-1.5 text-dark-textMuted hover:text-dark-text transition-colors rounded-lg"
              title="Minimizar Mission Control"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="neu-button p-1.5 text-dark-textMuted hover:text-ufc-red transition-colors rounded-lg"
              title="Fechar Mission Control"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="divide-y divide-dark-border/30">
          {events.map((entry, i) => {
            // For approval_needed events, render the interactive ApprovalEntry
            if (entry.type === 'approval_needed') {
              return (
                <div key={`approval-${entry.ts}-${i}`} ref={approvalScrollRef}>
                  <ApprovalEntry
                    entry={entry}
                    agents={agents}
                    onApprovalResolved={handleApprovalResolved}
                    expandedAgent={expandedAgent}
                    onToggleAgent={handleToggleAgent}
                  />
                </div>
              );
            }

            return (
              <div key={`${entry.type}-${entry.ts}-${i}`}>
                <ConsoleEntry
                  entry={entry}
                  agents={agents}
                  expandedAgent={expandedAgent}
                  onToggleAgent={handleToggleAgent}
                  agentToolCalls={agentToolCalls}
                  pendingApprovals={pendingApprovals}
                  failedTasks={failedTasks}
                  onApproval={handleApprovalResolved}
                  onRetry={handleRetryTask}
                />
                {/* Legacy: if entry has requiresApproval but is NOT approval_needed type */}
                {entry.type !== 'approval_needed' && entry.data.requiresApproval === true && typeof entry.data.approvalId === 'string' && (
                  <ApprovalEntry
                    entry={entry}
                    agents={agents}
                    onApprovalResolved={handleApprovalResolved}
                    expandedAgent={expandedAgent}
                    onToggleAgent={handleToggleAgent}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Feature 3: Batch approval cards */}
        {batchApprovals.length > 0 && (
          <div className="divide-y divide-dark-border/30 border-t border-dark-border/30">
            {batchApprovals.map(({ actionType, approvals }) => (
              <BatchApprovalCard
                key={`batch-${actionType}`}
                actionType={actionType}
                approvals={approvals}
                onBatchComplete={handleBatchComplete}
              />
            ))}
          </div>
        )}

        {events.length === 0 && processing && (
          <div className="flex flex-col items-center justify-center py-12 text-dark-textMuted">
            <Loader2 className="w-6 h-6 animate-spin text-ufc-red mb-3" />
            <p className="text-xs">Aguardando eventos...</p>
          </div>
        )}
      </div>

      {/* Footer — Feature 7: retry failures + pending count + close */}
      <div className="border-t border-dark-border px-4 py-2.5 bg-dark-card/80 space-y-2">
        {/* Retry failures button — shown when done and has failures */}
        {isDone && failureCount > 0 && (
          <button
            onClick={handleRetryAllFailures}
            disabled={retrying}
            className="w-full neu-button px-4 py-2.5 text-xs font-semibold text-yellow-400 hover:bg-yellow-500/10 border border-yellow-500/30 transition-all flex items-center justify-center gap-2 rounded-xl disabled:opacity-40"
          >
            {retrying ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Retentando...
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Falhas ({failureCount})
              </>
            )}
          </button>
        )}

        {/* Pending approvals indicator */}
        {pendingApprovals.size > 0 && (
          <div className="flex items-center justify-center gap-2 text-[10px] text-orange-400">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            {pendingApprovals.size} aprova{'\u00e7\u00e3'}o({'\u00f5'}es) pendente(s)
          </div>
        )}

        {/* Auto-dismiss countdown */}
        {autoDismissCountdown && countdown > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-dark-textMuted">
              <span>Voltando ao painel em {countdown}s...</span>
              <span>{Math.round((countdown / 30) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-dark-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-ufc-red/60 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 30) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Close button */}
        {!processing && events.length > 0 && onDismiss && (
          <button
            onClick={onDismiss}
            className="w-full neu-button px-4 py-2 text-xs font-semibold text-dark-textMuted hover:text-ufc-red transition-colors flex items-center justify-center gap-2 rounded-xl"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Fechar Mission Control
          </button>
        )}
      </div>
    </div>
  );
}
