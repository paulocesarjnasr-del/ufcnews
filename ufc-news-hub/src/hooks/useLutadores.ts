'use client';

import useSWR from 'swr';
import { LutadorExpandido, LutadorComHistorico, ComparadorLutadores } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLutadores(options?: {
  divisao?: string;
  pais?: string;
  limit?: number;
}) {
  const { divisao, pais, limit = 50 } = options || {};

  let url = '/api/lutadores';
  const params = new URLSearchParams();

  if (divisao) {
    url = `/api/lutadores/divisao/${encodeURIComponent(divisao)}`;
  } else if (pais === 'brasil') {
    url = '/api/lutadores/brasileiros';
  }

  params.set('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<{
    lutadores: LutadorExpandido[];
    total: number;
  }>(`${url}?${params.toString()}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    lutadores: data?.lutadores || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate,
  };
}

export function useLutador(id: string) {
  const { data, error, isLoading, mutate } = useSWR<LutadorComHistorico>(
    id ? `/api/lutadores/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    lutador: data,
    isLoading,
    error,
    mutate,
  };
}

export function useComparador(id1: string, id2: string) {
  const { data, error, isLoading, mutate } = useSWR<ComparadorLutadores & {
    lutador1: LutadorExpandido & { stats: any };
    lutador2: LutadorExpandido & { stats: any };
    confrontos_diretos: any[];
  }>(
    id1 && id2 ? `/api/lutadores/comparar?ids=${id1},${id2}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    comparison: data,
    isLoading,
    error,
    mutate,
  };
}
