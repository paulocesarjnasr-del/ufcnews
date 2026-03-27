'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface RankingEntry {
  id: string;
  username: string;
  display_name: string | null;
  pontos_totais: number;
  taxa_acerto: number;
}

function positionColor(pos: number): string {
  if (pos === 1) return 'text-yellow-400';
  if (pos === 2) return 'text-gray-300';
  if (pos === 3) return 'text-amber-600';
  return 'text-dark-text';
}

export function GlobalRanking() {
  const t = useTranslations('arena');
  const { usuario } = useArenaAuth();
  const [data, setData] = useState<RankingEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/arena/analytics/ranking');
        if (!res.ok) throw new Error(t('error_load_ranking'));
        const json: unknown = await res.json();
        // API returns flat array (legacy) or { ranking: [...] } (new format)
        const entries = Array.isArray(json) ? json as RankingEntry[] : (json as { ranking: RankingEntry[] }).ranking;
        setData(entries);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('error_unknown'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (isLoading) {
    return (
      <div className="neu-card p-4">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 animate-pulse bg-dark-border rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="neu-card p-4 text-dark-text text-sm">
        {t('error_load_ranking_msg')}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="neu-card p-6 text-center text-dark-text text-sm">
        {t('no_ranking_data_yet')}
      </div>
    );
  }

  return (
    <div className="neu-card p-4">
      <ul className="space-y-1">
        {data.map((entry, index) => {
          const pos = index + 1;
          const isCurrentUser = usuario?.id === entry.id;
          return (
            <li
              key={entry.id}
              className={`flex items-center gap-3 px-2 py-1.5 rounded text-sm ${
                isCurrentUser ? 'bg-ufc-red/10 border border-ufc-red/30' : ''
              }`}
            >
              <span className={`font-mono font-bold w-6 text-right flex-shrink-0 ${positionColor(pos)}`}>
                #{pos}
              </span>
              <span className={`flex-1 truncate ${isCurrentUser ? 'text-white font-semibold' : 'text-dark-text'}`}>
                {entry.display_name ?? entry.username}
                {isCurrentUser && <span className="text-ufc-red text-xs ml-1">({t('you_label')})</span>}
              </span>
              <span className="text-white font-mono text-xs flex-shrink-0">
                {entry.pontos_totais.toLocaleString('pt-BR')} pts
              </span>
              <span className="text-dark-text font-mono text-xs flex-shrink-0 w-14 text-right">
                {Math.round(entry.taxa_acerto)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
