'use client';

import { useState, useEffect, useCallback } from 'react';
import { MODELS } from '@/lib/admin/agents';
import { ModelBadge } from './ModelBadge';
import { useAdminAuth } from './AdminAuthContext';
import { Plus, LogOut, DollarSign, ClipboardList, CheckCircle2, X, Loader2 } from 'lucide-react';
import { AgentIcon } from './AgentIcon';
import type { Agent, AgentModel } from '@/lib/admin/types';

interface TopBarProps {
  agents: Record<string, Agent>;
  onRefreshAgents?: () => void;
}

// =============================
// HIRE AGENT MODAL
// =============================
function HireAgentModal({
  agents,
  onClose,
  onHired,
}: {
  agents: Record<string, Agent>;
  onClose: () => void;
  onHired: () => void;
}) {
  const { authFetch } = useAdminAuth();
  const [form, setForm] = useState({
    humanName: '',
    codename: '',
    role: '',
    title: '',
    model: 'sonnet-4.5' as AgentModel,
    systemPrompt: '',
    reportsTo: '',
    icon: 'bot',
    color: '#6B7280',
    desc: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agentList = Object.values(agents);
  const modelOptions: AgentModel[] = ['opus-4.6', 'sonnet-4.5', 'haiku-4.5'];

  const handleSubmit = async () => {
    if (!form.humanName || !form.codename || !form.role || !form.title || !form.systemPrompt) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await authFetch('/api/company/agents/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          reportsTo: form.reportsTo || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Falha ao contratar agente');
      }
      onHired();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="neu-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-dark-text text-lg font-bold flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-400" />
            Contratar Novo Agente
          </h2>
          <button onClick={onClose} className="text-dark-textMuted hover:text-dark-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-red-400 text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Nome Humano *</label>
            <input
              value={form.humanName}
              onChange={(e) => setForm({ ...form, humanName: e.target.value })}
              placeholder="Ex: Carlos Silva"
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            />
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Codinome *</label>
            <input
              value={form.codename}
              onChange={(e) => setForm({ ...form, codename: e.target.value })}
              placeholder="Ex: Thunder"
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            />
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Role *</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Ex: content-writer"
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            />
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Título *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ex: Redator de Conteúdo"
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            />
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Modelo</label>
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value as AgentModel })}
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            >
              {modelOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Reporta para</label>
            <select
              value={form.reportsTo}
              onChange={(e) => setForm({ ...form, reportsTo: e.target.value })}
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            >
              <option value="">Nenhum</option>
              {agentList.map((a) => (
                <option key={a.id} value={a.id}>{a.humanName} ({a.codename})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Ícone</label>
            <input
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="bot"
              className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
            />
          </div>
          <div>
            <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Cor</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <input
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">Descrição</label>
          <textarea
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            placeholder="Descrição do agente..."
            rows={2}
            className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text focus:outline-none focus:ring-2 focus:ring-ufc-red/50 resize-y"
          />
        </div>

        <div>
          <label className="text-dark-textMuted text-[10px] font-semibold uppercase tracking-wider">System Prompt *</label>
          <textarea
            value={form.systemPrompt}
            onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
            placeholder="Você é um agente especializado em..."
            rows={6}
            className="w-full mt-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-dark-text font-mono focus:outline-none focus:ring-2 focus:ring-ufc-red/50 resize-y"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="neu-button px-4 py-2 text-dark-textMuted text-xs font-semibold hover:bg-dark-cardHover transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="neu-button px-4 py-2 text-green-400 text-xs font-semibold flex items-center gap-2 hover:bg-green-500/10 transition-colors disabled:opacity-50"
          >
            {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
            Contratar
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================
// TOPBAR COMPONENT
// =============================
export function TopBar({ agents, onRefreshAgents }: TopBarProps) {
  const { authFetch, logout } = useAdminAuth();
  const agentList = Object.values(agents);
  const total = agentList.length;
  const active = agentList.filter((a) => a.status === 'active').length;
  const alerts = agentList.reduce((s, a) => s + (a._count?.approvals || 0), 0);

  // Today's stats
  const [todayTasks, setTodayTasks] = useState<number | null>(null);
  const [todayCost, setTodayCost] = useState<number | null>(null);
  const [todaySuccess, setTodaySuccess] = useState<number | null>(null);

  // Hire modal
  const [showHireModal, setShowHireModal] = useState(false);

  useEffect(() => {
    // Fetch today's task count
    authFetch('/api/company/tasks?limit=1')
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => {
        setTodayTasks(data.total ?? 0);
        // Calculate success rate from tasks
        if (data.tasks && data.total > 0) {
          // We need more tasks to calculate rate — fetch a batch
          authFetch('/api/company/tasks?limit=200')
            .then((r) => r.json())
            .then((allData) => {
              const tasks = allData.tasks || [];
              const completed = tasks.filter((t: { status: string }) => t.status === 'completed').length;
              const failed = tasks.filter((t: { status: string }) => t.status === 'failed').length;
              const total = completed + failed;
              setTodaySuccess(total > 0 ? Math.round((completed / total) * 100) : 100);
            })
            .catch(() => {});
        }
      })
      .catch(() => {});

    // Fetch today's cost
    authFetch('/api/company/costs?hours=24')
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setTodayCost(data.totalCost ?? 0))
      .catch(() => {});
  }, [authFetch]);

  const modelCounts: Record<string, number> = {};
  agentList.forEach((ag) => {
    modelCounts[ag.model] = (modelCounts[ag.model] || 0) + 1;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ufc-red flex items-center justify-center text-white font-black text-sm">
            UFC
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-dark-text via-ufc-red to-dark-text bg-clip-text text-transparent">AI Company</h1>
            <p className="text-dark-textMuted text-sm">UFC News Hub — Painel de Agentes</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {Object.entries(modelCounts).map(([mid, count]) => (
              <div key={mid} className="flex items-center gap-1.5 neu-inset rounded-lg px-2.5 py-1.5">
                <ModelBadge modelId={mid as AgentModel} />
                <span className="text-dark-textMuted text-xs">x{count}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="text-dark-text font-bold text-lg">
              <span key={`active-${active}-${total}`} className="animate-count-up inline-block">{active}/{total}</span>
            </div>
            <div className="text-dark-textMuted text-xs">Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-dark-text font-bold text-lg">
              <span key={`tasks-${todayTasks}`} className="animate-count-up inline-block">{todayTasks !== null ? todayTasks.toLocaleString() : '—'}</span>
            </div>
            <div className="text-dark-textMuted text-xs">Tarefas Hoje</div>
          </div>
          <div className="text-center">
            <div className={`font-bold text-lg ${alerts > 0 ? 'text-orange-400' : 'text-green-400'}`}>
              <span key={`alerts-${alerts}`} className="animate-count-up inline-block">{alerts}</span>
            </div>
            <div className="text-dark-textMuted text-xs">Alertas</div>
          </div>

          <button
            onClick={() => setShowHireModal(true)}
            className="neu-button px-4 py-2 text-green-400 text-sm font-semibold flex items-center gap-2 hover:bg-green-500/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Contratar Agente
          </button>

          <button
            onClick={logout}
            className="neu-button px-4 py-2 text-dark-textMuted text-sm font-semibold flex items-center gap-2 hover:bg-red-600/20 hover:text-red-400 transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Mini stat cards for today */}
      <div className="flex gap-3 mb-4">
        <div className="neu-inset rounded-xl px-4 py-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-400" />
          <div>
            <div className="text-green-400 font-bold text-sm">
              <span key={`cost-${todayCost}`} className="animate-count-up inline-block">
                {todayCost !== null ? `$${todayCost.toFixed(2)}` : '—'}
              </span>
            </div>
            <div className="text-dark-textMuted text-[10px]">Custo Hoje</div>
          </div>
        </div>
        <div className="neu-inset rounded-xl px-4 py-2 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-blue-400" />
          <div>
            <div className="text-blue-400 font-bold text-sm">
              <span key={`tasks-mini-${todayTasks}`} className="animate-count-up inline-block">
                {todayTasks !== null ? todayTasks : '—'}
              </span>
            </div>
            <div className="text-dark-textMuted text-[10px]">Tasks Hoje</div>
          </div>
        </div>
        <div className="neu-inset rounded-xl px-4 py-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-emerald-400 font-bold text-sm">
              <span key={`success-${todaySuccess}`} className="animate-count-up inline-block">
                {todaySuccess !== null ? `${todaySuccess}%` : '—'}
              </span>
            </div>
            <div className="text-dark-textMuted text-[10px]">Taxa Sucesso</div>
          </div>
        </div>
      </div>

      {/* Hire Modal */}
      {showHireModal && (
        <HireAgentModal
          agents={agents}
          onClose={() => setShowHireModal(false)}
          onHired={() => onRefreshAgents?.()}
        />
      )}
    </>
  );
}
