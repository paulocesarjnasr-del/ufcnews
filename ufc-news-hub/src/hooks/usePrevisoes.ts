'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Previsao, NovaPrevisao, ConsensoPrevisao } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrevisao(lutaId: string, fingerprint: string) {
  const { data, error, isLoading, mutate } = useSWR<{ previsao: Previsao | null }>(
    lutaId && fingerprint
      ? `/api/previsoes?luta_id=${lutaId}&fingerprint=${fingerprint}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    previsao: data?.previsao || null,
    isLoading,
    error,
    mutate,
  };
}

export function usePrevisaoMutation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPrevisao = useCallback(async (data: NovaPrevisao): Promise<Previsao | null> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao salvar previsao');
      }

      return result.previsao;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submitPrevisao,
    isSubmitting,
    error,
  };
}

export function useLutaPrevisoes(lutaId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    previsoes: Previsao[];
    consenso: ConsensoPrevisao[];
    total: number;
  }>(lutaId ? `/api/lutas/${lutaId}/previsoes` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  });

  return {
    previsoes: data?.previsoes || [],
    consenso: data?.consenso || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate,
  };
}
