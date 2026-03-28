'use client';

import { useState } from 'react';
import { X, User, CheckSquare, Settings, Pencil, Trash2 } from 'lucide-react';
import type { Cliente, ClienteEntrega } from '@/lib/clientes-types';
import { ClienteChecklistWeek } from './ClienteChecklistWeek';

type DetailTab = 'checklist' | 'info' | 'config';

interface ClienteDetailPanelProps {
  cliente: Cliente;
  entregas: ClienteEntrega[];
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const STATUS_BADGE: Record<string, { label: string; color: string }> = {
  ativo: { label: 'Ativo', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  pausado: { label: 'Pausado', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  cancelado: { label: 'Cancelado', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  trial: { label: 'Trial', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

const PLANO_BADGE: Record<string, { label: string; color: string }> = {
  basico: { label: 'Basico', color: 'text-gray-400' },
  pro: { label: 'Pro', color: 'text-blue-400' },
  enterprise: { label: 'Enterprise', color: 'text-ufc-gold' },
};

export function ClienteDetailPanel({ cliente, onClose, onEdit, onDelete }: ClienteDetailPanelProps) {
  const [tab, setTab] = useState<DetailTab>('checklist');

  const statusInfo = STATUS_BADGE[cliente.status] || STATUS_BADGE.ativo;
  const planoInfo = PLANO_BADGE[cliente.plano] || PLANO_BADGE.basico;

  const tabs: { id: DetailTab; label: string; icon: typeof CheckSquare }[] = [
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'info', label: 'Info', icon: User },
    { id: 'config', label: 'Config', icon: Settings },
  ];

  return (
    <div className="neu-card border border-[#1e1e2e] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#1e1e2e]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg truncate">{cliente.nome}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              <span className={`text-xs font-bold ${planoInfo.color}`}>
                {planoInfo.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onEdit} className="p-1.5 text-gray-500 hover:text-white transition-colors" title="Editar">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={onDelete} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors" title="Remover">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 neu-inset p-0.5 rounded-lg">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  tab === t.id
                    ? 'neu-button text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tab === 'checklist' && (
          <ClienteChecklistWeek clienteId={cliente.id} />
        )}

        {tab === 'info' && (
          <div className="space-y-4">
            {cliente.email && (
              <div>
                <label className="text-[10px] text-gray-500 uppercase">Email</label>
                <p className="text-sm text-white">{cliente.email}</p>
              </div>
            )}
            {cliente.telefone && (
              <div>
                <label className="text-[10px] text-gray-500 uppercase">Telefone</label>
                <p className="text-sm text-white">{cliente.telefone}</p>
              </div>
            )}
            {cliente.contato_nome && (
              <div>
                <label className="text-[10px] text-gray-500 uppercase">Contato</label>
                <p className="text-sm text-white">{cliente.contato_nome}</p>
              </div>
            )}
            <div>
              <label className="text-[10px] text-gray-500 uppercase">Tipo</label>
              <p className="text-sm text-white capitalize">{cliente.tipo}</p>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase">Desde</label>
              <p className="text-sm text-white">
                {new Date(cliente.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
            {cliente.notas && (
              <div>
                <label className="text-[10px] text-gray-500 uppercase">Notas</label>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{cliente.notas}</p>
              </div>
            )}

            {/* Redes Sociais */}
            {(cliente.redes_sociais?.instagram || cliente.redes_sociais?.youtube || cliente.redes_sociais?.twitter || cliente.redes_sociais?.tiktok) && (
              <div>
                <label className="text-[10px] text-gray-500 uppercase mb-2 block">Redes Sociais</label>
                <div className="space-y-1">
                  {cliente.redes_sociais.instagram && (
                    <p className="text-xs text-gray-400">Instagram: <span className="text-white">{cliente.redes_sociais.instagram}</span></p>
                  )}
                  {cliente.redes_sociais.youtube && (
                    <p className="text-xs text-gray-400">YouTube: <span className="text-white">{cliente.redes_sociais.youtube}</span></p>
                  )}
                  {cliente.redes_sociais.twitter && (
                    <p className="text-xs text-gray-400">Twitter/X: <span className="text-white">{cliente.redes_sociais.twitter}</span></p>
                  )}
                  {cliente.redes_sociais.tiktok && (
                    <p className="text-xs text-gray-400">TikTok: <span className="text-white">{cliente.redes_sociais.tiktok}</span></p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'config' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase">Liga Arena</label>
              <p className="text-sm text-gray-400">
                {cliente.arena_liga_id || 'Nenhuma liga vinculada'}
              </p>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase">ID</label>
              <p className="text-xs text-gray-600 font-mono">{cliente.id}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
