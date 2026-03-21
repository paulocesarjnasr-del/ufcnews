'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { AlertTriangle, CheckCircle2, Clock, RefreshCw, Shield, XCircle, Plus, Minus, ArrowLeftRight } from 'lucide-react';

interface CardChange {
  type: 'fight_removed' | 'fight_added' | 'opponent_changed' | 'card_cancelled';
  description: string;
  fighter1?: string;
  fighter2?: string;
  old_value?: string;
  new_value?: string;
}

interface MonitorLog {
  id: string;
  evento_nome: string;
  checked_at: string;
  changes_detected: boolean;
  changes: CardChange[];
  status: 'ok' | 'changes_detected' | 'error';
  error_message?: string;
}

function getChangeIcon(type: CardChange['type']) {
  switch (type) {
    case 'fight_removed': return <Minus className="h-4 w-4 text-red-400" />;
    case 'fight_added': return <Plus className="h-4 w-4 text-emerald-400" />;
    case 'opponent_changed': return <ArrowLeftRight className="h-4 w-4 text-yellow-400" />;
    case 'card_cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
  }
}

function getChangeLabel(type: CardChange['type']) {
  switch (type) {
    case 'fight_removed': return 'Removida';
    case 'fight_added': return 'Adicionada';
    case 'opponent_changed': return 'Oponente Alterado';
    case 'card_cancelled': return 'Cancelado';
  }
}

function getStatusBadge(status: MonitorLog['status']) {
  switch (status) {
    case 'ok':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-400">
          <CheckCircle2 className="h-3 w-3" /> OK
        </span>
      );
    case 'changes_detected':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/10 px-2.5 py-1 text-[10px] font-bold uppercase text-yellow-400">
          <AlertTriangle className="h-3 w-3" /> Mudancas
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-400/10 px-2.5 py-1 text-[10px] font-bold uppercase text-red-400">
          <XCircle className="h-3 w-3" /> Erro
        </span>
      );
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CardMonitorPage() {
  const { authFetch, isAuthenticated } = useAdminAuth();
  const [logs, setLogs] = useState<MonitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await authFetch('/api/admin/card-monitor');
      if (!res.ok) throw new Error('Erro ao buscar logs');
      const data = await res.json() as { logs: MonitorLog[] };
      setLogs(data.logs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (isAuthenticated) fetchLogs();
  }, [fetchLogs, isAuthenticated]);

  const runManualCheck = async () => {
    setChecking(true);
    try {
      const res = await authFetch('/api/cron/card-monitor');
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
        await fetchLogs();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no check');
    } finally {
      setChecking(false);
    }
  };

  const totalChecks = logs.length;
  const changesDetected = logs.filter((l) => l.status === 'changes_detected').length;
  const errors = logs.filter((l) => l.status === 'error').length;
  const lastCheck = logs[0];

  return (
    <main className="min-h-screen bg-[#0A0A0A] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-ufc-red" />
            <h1 className="font-display text-2xl uppercase tracking-wide text-white md:text-3xl">
              Card Monitor
            </h1>
          </div>
          <p className="text-sm text-neutral-500">
            Monitoramento automatico de mudancas nos cards do UFC. Alertas por email quando lutas sao removidas, adicionadas ou alteradas.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-xl bg-[#111] border border-[#1a1a1a] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Total Checks</p>
            <p className="font-display text-2xl text-white">{totalChecks}</p>
          </div>
          <div className="rounded-xl bg-[#111] border border-[#1a1a1a] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Mudancas</p>
            <p className="font-display text-2xl text-yellow-400">{changesDetected}</p>
          </div>
          <div className="rounded-xl bg-[#111] border border-[#1a1a1a] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Erros</p>
            <p className="font-display text-2xl text-red-400">{errors}</p>
          </div>
          <div className="rounded-xl bg-[#111] border border-[#1a1a1a] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Ultimo Check</p>
            <p className="text-xs text-white">
              {lastCheck ? formatDate(lastCheck.checked_at) : 'Nenhum'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={runManualCheck}
            disabled={checking}
            className="inline-flex items-center gap-2 rounded-lg bg-ufc-red px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-ufc-red/90 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Verificando...' : 'Verificar Agora'}
          </button>
          <button
            onClick={fetchLogs}
            className="inline-flex items-center gap-2 rounded-lg border border-[#262626] bg-[#111] px-4 py-2.5 text-sm text-neutral-400 transition-all hover:border-neutral-600 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar Logs
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-400/5 border border-red-400/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Logs */}
        <div className="space-y-3">
          <h2 className="font-display text-sm uppercase tracking-wider text-neutral-500">
            Historico de Verificacoes
          </h2>

          {loading ? (
            <div className="rounded-xl bg-[#111] border border-[#1a1a1a] p-8 text-center">
              <RefreshCw className="h-6 w-6 text-neutral-500 animate-spin mx-auto mb-2" />
              <p className="text-sm text-neutral-500">Carregando...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="rounded-xl bg-[#111] border border-[#1a1a1a] p-8 text-center">
              <Clock className="h-6 w-6 text-neutral-500 mx-auto mb-2" />
              <p className="text-sm text-neutral-500">Nenhuma verificacao realizada ainda.</p>
              <p className="text-xs text-neutral-600 mt-1">Clique em &ldquo;Verificar Agora&rdquo; para fazer o primeiro check.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className={`rounded-xl bg-[#111] border p-5 transition-colors ${
                  log.status === 'changes_detected'
                    ? 'border-yellow-400/30'
                    : log.status === 'error'
                    ? 'border-red-400/30'
                    : 'border-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(log.status)}
                    <span className="text-sm font-medium text-white">{log.evento_nome}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">
                    {formatDate(log.checked_at)}
                  </span>
                </div>

                {log.error_message && (
                  <p className="text-xs text-red-400 mb-2">{log.error_message}</p>
                )}

                {log.changes.length > 0 && (
                  <div className="space-y-2 mt-3 pt-3 border-t border-[#1a1a1a]">
                    {log.changes.map((change, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {getChangeIcon(change.type)}
                        <div>
                          <span className="text-[10px] font-bold uppercase text-neutral-500">
                            {getChangeLabel(change.type)}
                          </span>
                          <p className="text-xs text-neutral-300">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {log.status === 'ok' && log.changes.length === 0 && (
                  <p className="text-xs text-neutral-500">Nenhuma mudanca detectada no card.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
