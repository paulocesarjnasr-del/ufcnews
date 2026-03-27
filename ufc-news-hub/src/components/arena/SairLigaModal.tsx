'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, X } from 'lucide-react';

import { useTranslations } from 'next-intl';
interface SairLigaModalProps {
  ligaId: string;
  ligaNome: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SairLigaModal({ ligaId, ligaNome, isOpen, onClose }: SairLigaModalProps) {
  const t = useTranslations('arena');
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleSair() {
    setIsLeaving(true);
    setError('');

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/arena/ligas');
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error || t('error_leave_league'));
      }
    } catch {
      setError(t('error_connection'));
    } finally {
      setIsLeaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="neu-card rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-white uppercase">{t('leave_league')}</h3>
          <button onClick={onClose} className="text-dark-textMuted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-dark-textMuted mb-6">
          {t('leave_league_confirm')} <strong className="text-white">{ligaNome}</strong>?
          {' '}{t('leave_league_note')}
        </p>

        {error && (
          <p className="text-sm text-red-400 mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="neu-button flex-1 rounded-lg px-4 py-2.5 text-sm text-dark-textMuted hover:text-white"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSair}
            disabled={isLeaving}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {isLeaving ? t('leaving') : t('leave')}
          </button>
        </div>
      </div>
    </div>
  );
}
