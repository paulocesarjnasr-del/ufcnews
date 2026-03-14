'use client';

import { useEffect, useState } from 'react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface RankingEntry {
  id: string;
  username: string;
  display_name: string | null;
  pontos: number;
  taxa_acerto: number;
}

interface RankingData {
  ranking: RankingEntry[];
}

function positionColor(pos: number): string {
  if (pos === 1) return 'text-yellow-400';
  if (pos === 2) return 'text-gray-300';
  if (pos === 3) return 'text-amber-600';
  return 'text-dark-text';
}

export function GlobalRanking() {
  const { usuario } = useArenaAuth();
  const [data, setData] = useState<RankingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/arena/analytics/ranking');
        if (!res.ok) throw new Error('Erro ao buscar ranking');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
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
        Erro ao carregar ranking.
      </div>
    );
  }

  if (!data || data.ranking.length === 0) {
    return (
      <div className="neu-card p-6 text-center text-dark-text text-sm">
        Nenhum dado de ranking disponivel ainda.
      </div>
    );
  }

  return (
    <div className="neu-card p-4">
      <ul className="space-y-1">
        {data.ranking.map((entry, index) => {
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
                {isCurrentUser && <span className="text-ufc-red text-xs ml-1">(voce)</span>}
              </span>
              <span className="text-white font-mono text-xs flex-shrink-0">
                {entry.pontos.toLocaleString('pt-BR')} pts
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
