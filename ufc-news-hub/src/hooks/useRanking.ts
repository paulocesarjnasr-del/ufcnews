'use client';

import useSWR from 'swr';
import { RankingPrevisor, PerfilPrevisor } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type OrderBy = 'pontos_total' | 'taxa_acerto' | 'total_previsoes' | 'melhor_sequencia';

export function useRanking(options?: {
  orderBy?: OrderBy;
  limit?: number;
  minPrevisoes?: number;
}) {
  const { orderBy = 'pontos_total', limit = 50, minPrevisoes = 0 } = options || {};

  const params = new URLSearchParams({
    orderBy,
    limit: limit.toString(),
    minPrevisoes: minPrevisoes.toString(),
  });

  const { data, error, isLoading, mutate } = useSWR<{
    ranking: (RankingPrevisor & { posicao: number })[];
    total: number;
    stats: {
      total_previsores: number;
      total_previsoes: number;
      media_taxa_acerto: number;
    };
  }>(`/api/ranking?${params.toString()}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    ranking: data?.ranking || [],
    total: data?.total || 0,
    stats: data?.stats || {
      total_previsores: 0,
      total_previsoes: 0,
      media_taxa_acerto: 0,
    },
    isLoading,
    error,
    mutate,
  };
}

export function usePerfilPrevisor(fingerprint: string) {
  const { data, error, isLoading, mutate } = useSWR<PerfilPrevisor>(
    fingerprint ? `/api/ranking/${fingerprint}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    perfil: data,
    isLoading,
    error,
    mutate,
  };
}
