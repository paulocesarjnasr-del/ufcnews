'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../AdminAuthContext';
import {
  Users,
  Plus,
  Search,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { Cliente, ClienteComProgresso, ClienteEntrega, CreateClientePayload, UpdateClientePayload } from '@/lib/clientes-types';
import { ClienteDetailPanel } from './ClienteDetailPanel';
import { ClienteFormModal } from './ClienteFormModal';

const STATUS_DOT: Record<string, string> = {
  ativo: 'bg-emerald-400',
  pausado: 'bg-yellow-400',
  cancelado: 'bg-red-400',
  trial: 'bg-blue-400',
};

export function ClientesSection() {
  const { authFetch } = useAdminAuth();
  const [clientes, setClientes] = useState<ClienteComProgresso[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Selected client
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [selectedEntregas, setSelectedEntregas] = useState<ClienteEntrega[]>([]);

  // Modal
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | undefined>(undefined);

  const fetchClientes = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);

      const res = await authFetch(`/api/admin/clientes?${params.toString()}`);
      if (!res.ok) throw new Error('Falha ao buscar clientes');
      const data = await res.json() as { clientes: ClienteComProgresso[]; total: number };
      setClientes(data.clientes);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [authFetch, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetchClientes();
    }, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchClientes, search]);

  const fetchClienteDetail = useCallback(async (id: string) => {
    try {
      const res = await authFetch(`/api/admin/clientes/${id}`);
      if (!res.ok) throw new Error('Falha ao buscar cliente');
      const data = await res.json() as { cliente: Cliente; entregas_semana: ClienteEntrega[] };
      setSelectedCliente(data.cliente);
      setSelectedEntregas(data.entregas_semana);
    } catch (err) {
      console.error('Erro ao buscar detalhe:', err);
    }
  }, [authFetch]);

  useEffect(() => {
    if (selectedId) {
      fetchClienteDetail(selectedId);
    } else {
      setSelectedCliente(null);
      setSelectedEntregas([]);
    }
  }, [selectedId, fetchClienteDetail]);

  const handleCreate = async (data: CreateClientePayload | UpdateClientePayload) => {
    const res = await authFetch('/api/admin/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao criar');
    }
    await fetchClientes();
  };

  const handleUpdate = async (data: CreateClientePayload | UpdateClientePayload) => {
    if (!editingCliente) return;
    const res = await authFetch(`/api/admin/clientes/${editingCliente.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao atualizar');
    }
    await fetchClientes();
    if (selectedId === editingCliente.id) {
      await fetchClienteDetail(editingCliente.id);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!confirm('Tem certeza que deseja remover este cliente?')) return;

    try {
      await authFetch(`/api/admin/clientes/${selectedId}`, { method: 'DELETE' });
      setSelectedId(null);
      await fetchClientes();
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Users className="h-5 w-5 text-ufc-red" />
            <h2 className="font-display text-2xl text-white tracking-wide">Clientes</h2>
          </div>
          <p className="text-sm text-gray-500">{total} cliente{total !== 1 ? 's' : ''} cadastrado{total !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setLoading(true); fetchClientes(); }}
            className="neu-button p-2 text-gray-400 hover:text-white transition-colors"
            title="Atualizar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setEditingCliente(undefined); setShowForm(true); }}
            className="flex items-center gap-2 bg-ufc-red hover:bg-ufc-red/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, email ou contato..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
        />
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Client List */}
        <div className={`${selectedCliente ? 'flex-1' : 'w-full'} space-y-2 transition-all`}>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-ufc-red" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={() => { setLoading(true); fetchClientes(); }} className="neu-button px-4 py-2 text-sm text-ufc-red">
                Tentar novamente
              </button>
            </div>
          ) : clientes.length === 0 ? (
            <div className="neu-card p-12 text-center">
              <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">Nenhum cliente encontrado</p>
              <button
                onClick={() => { setEditingCliente(undefined); setShowForm(true); }}
                className="text-ufc-red text-sm hover:underline"
              >
                Criar primeiro cliente
              </button>
            </div>
          ) : (
            clientes.map((c) => {
              const isSelected = selectedId === c.id;
              const progressPercent = c.entregas_total > 0
                ? Math.round((c.entregas_concluidas / c.entregas_total) * 100)
                : 0;

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(isSelected ? null : c.id)}
                  className={`w-full text-left neu-card p-4 border transition-all hover:border-ufc-red/20 ${
                    isSelected ? 'border-ufc-red/30 bg-ufc-red/5' : 'border-[#1e1e2e]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[c.status] || 'bg-gray-400'}`} />
                      <span className="text-white font-medium truncate">{c.nome}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase text-gray-500 shrink-0 ml-2 capitalize">
                      {c.plano}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{c.email || c.contato_nome || 'Sem contato'}</span>
                    <span>{c.entregas_concluidas}/{c.entregas_total} ({progressPercent}%)</span>
                  </div>

                  {/* Mini progress bar */}
                  {c.entregas_total > 0 && (
                    <div className="w-full h-1 bg-[#1e1e2e] rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500/60 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        {selectedCliente && (
          <div className="w-[400px] shrink-0 sticky top-6 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <ClienteDetailPanel
              cliente={selectedCliente}
              entregas={selectedEntregas}
              onClose={() => setSelectedId(null)}
              onEdit={() => {
                setEditingCliente(selectedCliente);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ClienteFormModal
          cliente={editingCliente}
          onClose={() => { setShowForm(false); setEditingCliente(undefined); }}
          onSave={editingCliente ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
}
