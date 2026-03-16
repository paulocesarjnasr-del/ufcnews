'use client';

import { useState } from 'react';
import { UserMinus, X } from 'lucide-react';

interface ConfirmarExpulsaoModalProps {
  ligaId: string;
  userId: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
  onExpulso: () => void;
}

export function ConfirmarExpulsaoModal({
  ligaId, userId, username, isOpen, onClose, onExpulso,
}: ConfirmarExpulsaoModalProps) {
  const [isExpelling, setIsExpelling] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleExpulsar() {
    setIsExpelling(true);
    setError('');

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/membros/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onExpulso();
        onClose();
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error || 'Erro ao expulsar membro');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsExpelling(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="neu-card rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-white uppercase">Expulsar membro?</h3>
          <button onClick={onClose} className="text-dark-textMuted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-dark-textMuted mb-6">
          Tem certeza que quer expulsar <strong className="text-white">{username}</strong>?
          Ele podera entrar novamente se tiver o link de convite.
        </p>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="neu-button flex-1 rounded-lg px-4 py-2.5 text-sm text-dark-textMuted hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleExpulsar}
            disabled={isExpelling}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 transition-colors"
          >
            <UserMinus className="w-4 h-4" />
            {isExpelling ? 'Expulsando...' : 'Expulsar'}
          </button>
        </div>
      </div>
    </div>
  );
}
