'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldAlert, Check, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { AgentIcon } from './AgentIcon';
import { useAdminAuth } from './AdminAuthContext';

interface ApprovalAgent {
  humanName: string;
  codename: string;
  icon: string;
  color: string;
}

interface ApprovalItem {
  id: string;
  taskId: string;
  agentId: string;
  agent: ApprovalAgent;
  actionType: string;
  description: string;
  payload: string;
  status: string;
  createdAt: string;
}

interface ApprovalQueueProps {
  processing?: boolean;
  currentPromptId?: string;
}

export function ApprovalQueue({ processing = false, currentPromptId: _currentPromptId }: ApprovalQueueProps) {
  const { authFetch } = useAdminAuth();
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [autoApproved, setAutoApproved] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showAutoApproved, setShowAutoApproved] = useState(false);

  // Track when processing was last true — keep showing auto-approved for 5 min after mission ends
  const lastProcessingTime = useRef<number>(0);
  const [showAutoSection, setShowAutoSection] = useState(false);

  useEffect(() => {
    if (processing) {
      lastProcessingTime.current = Date.now();
      setShowAutoSection(true);
    }
  }, [processing]);

  // Timer to hide auto-approved section 5 min after mission ends
  useEffect(() => {
    if (processing) return; // don't run timer while processing

    const check = () => {
      const elapsed = Date.now() - lastProcessingTime.current;
      if (lastProcessingTime.current > 0 && elapsed < 5 * 60 * 1000) {
        setShowAutoSection(true);
      } else {
        setShowAutoSection(false);
      }
    };

    check();
    const interval = setInterval(check, 15000); // check every 15s
    return () => clearInterval(interval);
  }, [processing]);

  const fetchApprovals = useCallback(async () => {
    try {
      const shouldFetchAuto = processing || showAutoSection;
      const fetches: Promise<Response>[] = [
        authFetch('/api/company/approvals?status=pending'),
      ];

      if (shouldFetchAuto) {
        fetches.push(
          authFetch('/api/company/approvals?status=approved&reviewedBy=system:auto-approve&limit=10')
        );
      }

      const results = await Promise.all(fetches);
      if (results[0].ok) setApprovals(await results[0].json());
      if (shouldFetchAuto && results[1]?.ok) {
        const data = await results[1].json();
        setAutoApproved(Array.isArray(data) ? data : []);
      } else if (!shouldFetchAuto) {
        setAutoApproved([]);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, [authFetch, processing, showAutoSection]);

  useEffect(() => {
    fetchApprovals();
    const interval = setInterval(fetchApprovals, 5000);
    return () => clearInterval(interval);
  }, [fetchApprovals]);

  async function handleAction(approvalId: string, action: 'approve' | 'reject') {
    const reviewNote =
      action === 'reject' ? window.prompt('Motivo da rejeicao (opcional):') || '' : '';

    setProcessingId(approvalId);
    try {
      await authFetch(`/api/company/approvals/${approvalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reviewedBy: 'gabriel', reviewNote }),
      });
      fetchApprovals();
    } finally {
      setProcessingId(null);
    }
  }

  // Hide entire component when nothing to show
  const shouldShowAutoApproved = (processing || showAutoSection) && autoApproved.length > 0;
  if (loading || (approvals.length === 0 && !shouldShowAutoApproved)) return null;

  return (
    <div className="space-y-3 mb-4">
      {approvals.length > 0 && (
        <div className="neu-card border border-orange-500/30 p-4">
          <h3 className="text-orange-400 text-sm font-bold mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {approvals.length} aprovacao(oes) pendente(s)
          </h3>
          <div className="space-y-3">
            {approvals.map((a) => (
              <ApprovalCard
                key={a.id}
                approval={a}
                processing={processingId === a.id}
                onAction={handleAction}
              />
            ))}
          </div>
        </div>
      )}

      {shouldShowAutoApproved && (
        <div className="neu-card border border-green-500/20 p-4">
          <button
            onClick={() => setShowAutoApproved(!showAutoApproved)}
            className="w-full flex items-center justify-between text-green-400 text-sm font-bold"
          >
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              {autoApproved.length} acao(oes) auto-aprovada(s)
              {!processing && (
                <span className="text-dark-textMuted text-[10px] font-normal ml-1">(missão recente)</span>
              )}
            </span>
            {showAutoApproved ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showAutoApproved && (
            <div className="mt-3 space-y-2">
              {autoApproved.map((a) => (
                <div key={a.id} className="bg-dark-bg border border-dark-border rounded-lg p-3 flex items-center gap-3">
                  <span style={{ color: a.agent.color }}>
                    <AgentIcon name={a.agent.icon} className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-dark-textMuted text-xs truncate">
                      {a.agent.humanName} — {a.actionType}
                    </p>
                    <p className="text-dark-textMuted text-xs opacity-60 truncate">{a.description}</p>
                  </div>
                  <span className="text-green-500 text-xs whitespace-nowrap">auto</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ApprovalCard({
  approval,
  processing,
  onAction,
}: {
  approval: ApprovalItem;
  processing: boolean;
  onAction: (id: string, action: 'approve' | 'reject') => void;
}) {
  const [showPayload, setShowPayload] = useState(false);

  let parsedPayload: string;
  try {
    parsedPayload = JSON.stringify(JSON.parse(approval.payload), null, 2);
  } catch {
    parsedPayload = approval.payload;
  }

  return (
    <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ color: approval.agent.color }}>
            <AgentIcon name={approval.agent.icon} className="w-5 h-5" />
          </span>
          <div>
            <p className="text-dark-text text-sm font-bold">{approval.agent.humanName}</p>
            <p className="text-dark-textMuted text-xs">
              {approval.agent.codename} — {approval.actionType}
            </p>
          </div>
        </div>
        <span className="text-dark-textMuted text-xs">
          {approval.createdAt && !isNaN(new Date(approval.createdAt).getTime()) ? new Date(approval.createdAt).toLocaleString('pt-BR') : '—'}
        </span>
      </div>

      <p className="text-dark-textMuted text-sm mb-3">{approval.description}</p>

      <button
        onClick={() => setShowPayload(!showPayload)}
        className="flex items-center gap-1 text-dark-textMuted text-xs mb-3 hover:text-dark-text transition-colors"
      >
        {showPayload ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        Ver detalhes do conteudo
      </button>

      {showPayload && (
        <pre className="bg-dark-bg border border-dark-border rounded-xl p-3 text-xs text-dark-textMuted overflow-auto max-h-48 mb-3 font-mono">
          {parsedPayload}
        </pre>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onAction(approval.id, 'approve')}
          disabled={processing}
          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {processing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          Aprovar
        </button>
        <button
          onClick={() => onAction(approval.id, 'reject')}
          disabled={processing}
          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Rejeitar
        </button>
      </div>
    </div>
  );
}
