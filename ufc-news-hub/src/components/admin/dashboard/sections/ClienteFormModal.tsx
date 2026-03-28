'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Cliente, CreateClientePayload, UpdateClientePayload, TipoCliente, PlanoCliente } from '@/lib/clientes-types';

interface ClienteFormModalProps {
  cliente?: Cliente;
  onClose: () => void;
  onSave: (data: CreateClientePayload | UpdateClientePayload) => Promise<void>;
}

export function ClienteFormModal({ cliente, onClose, onSave }: ClienteFormModalProps) {
  const isEditing = !!cliente;

  const [nome, setNome] = useState(cliente?.nome || '');
  const [email, setEmail] = useState(cliente?.email || '');
  const [telefone, setTelefone] = useState(cliente?.telefone || '');
  const [tipo, setTipo] = useState<TipoCliente>(cliente?.tipo || 'creator');
  const [plano, setPlano] = useState<PlanoCliente>(cliente?.plano || 'basico');
  const [contato, setContato] = useState(cliente?.contato_nome || '');
  const [notas, setNotas] = useState(cliente?.notas || '');
  const [instagram, setInstagram] = useState(cliente?.redes_sociais?.instagram || '');
  const [youtube, setYoutube] = useState(cliente?.redes_sociais?.youtube || '');
  const [twitter, setTwitter] = useState(cliente?.redes_sociais?.twitter || '');
  const [tiktok, setTiktok] = useState(cliente?.redes_sociais?.tiktok || '');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('Nome e obrigatorio');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const data: CreateClientePayload = {
        nome: nome.trim(),
        email: email.trim() || undefined,
        telefone: telefone.trim() || undefined,
        tipo,
        plano,
        contato_nome: contato.trim() || undefined,
        notas: notas.trim() || undefined,
        redes_sociais: {
          instagram: instagram.trim() || undefined,
          youtube: youtube.trim() || undefined,
          twitter: twitter.trim() || undefined,
          tiktok: tiktok.trim() || undefined,
        },
      };

      await onSave(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto neu-card p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display text-white">
            {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="text-xs text-gray-500 uppercase mb-1 block">Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
              placeholder="Nome do cliente ou empresa"
              autoFocus
            />
          </div>

          {/* Email + Telefone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase mb-1 block">Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
                placeholder="+55 11 99999-9999"
              />
            </div>
          </div>

          {/* Tipo + Plano */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase mb-1 block">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoCliente)}
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
              >
                <option value="creator">Creator</option>
                <option value="empresa">Empresa</option>
                <option value="agencia">Agencia</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase mb-1 block">Plano</label>
              <select
                value={plano}
                onChange={(e) => setPlano(e.target.value as PlanoCliente)}
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
              >
                <option value="basico">Basico</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Contato */}
          <div>
            <label className="text-xs text-gray-500 uppercase mb-1 block">Pessoa de Contato</label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
              placeholder="Nome do contato"
            />
          </div>

          {/* Redes Sociais */}
          <div>
            <label className="text-xs text-gray-500 uppercase mb-2 block">Redes Sociais</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="px-3 py-2 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
                placeholder="Instagram"
              />
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="px-3 py-2 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
                placeholder="YouTube"
              />
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="px-3 py-2 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
                placeholder="Twitter/X"
              />
              <input
                type="text"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                className="px-3 py-2 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors"
                placeholder="TikTok"
              />
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="text-xs text-gray-500 uppercase mb-1 block">Notas Internas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg text-white text-sm focus:outline-none focus:border-ufc-red transition-colors resize-none"
              placeholder="Anotacoes internas sobre o cliente..."
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-ufc-red hover:bg-ufc-red/90 disabled:bg-ufc-red/50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                isEditing ? 'Salvar Alteracoes' : 'Criar Cliente'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
