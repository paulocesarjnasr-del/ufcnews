'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface HistoricoEvento {
  evento_id: string;
  evento_nome: string;
  acertos: number;
  total_lutas: number;
}

export function AccuracyHistory() {
  const t = useTranslations('arena');
  const { isAuthenticated } = useArenaAuth();
  const [historico, setHistorico] = useState<HistoricoEvento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchHistorico = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/arena/analytics/historico');
        if (!res.ok) throw new Error('Erro ao buscar historico');
        const data = await res.json();
        setHistorico(data.historico ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('error_unknown'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistorico();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="neu-card p-4">
        <div className="h-32 animate-pulse bg-dark-border rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="neu-card p-4 text-dark-text text-sm">
        {t('error_load_history_msg')}
      </div>
    );
  }

  if (historico.length === 0) {
    return (
      <div className="neu-card p-6 text-center text-dark-text text-sm">
        {t('participate_to_see_history')}
      </div>
    );
  }

  const MAX_BAR_HEIGHT = 120;

  return (
    <div className="neu-card p-4">
      <div className="flex items-end gap-3 overflow-x-auto pb-2" style={{ minHeight: `${MAX_BAR_HEIGHT + 40}px` }}>
        {historico.map((evento) => {
          const accuracy = evento.total_lutas > 0
            ? Math.round((evento.acertos / evento.total_lutas) * 100)
            : 0;
          const barHeight = Math.max(4, Math.round((accuracy / 100) * MAX_BAR_HEIGHT));
          const label = evento.evento_nome.split(' ')[0];

          return (
            <div
              key={evento.evento_id}
              className="flex flex-col items-center gap-1 flex-shrink-0"
              style={{ minWidth: '40px' }}
            >
              <span className="text-xs text-dark-text font-mono">{accuracy}%</span>
              <div
                className="w-8 bg-ufc-red rounded-t"
                style={{ height: `${barHeight}px` }}
                title={`${evento.evento_nome}: ${accuracy}%`}
              />
              <span className="text-xs text-dark-text truncate max-w-[48px] text-center" title={evento.evento_nome}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
