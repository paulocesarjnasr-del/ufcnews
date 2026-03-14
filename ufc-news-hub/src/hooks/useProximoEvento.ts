'use client';

import useSWR from 'swr';

interface ProximoEvento {
  id: string;
  nome: string;
  status: string;
  data_evento: string;
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
});

export function useProximoEvento() {
  const { data, error, isLoading } = useSWR<ProximoEvento | null>(
    '/api/eventos/proximo',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      refreshInterval: 300000,
      onError: () => {},
    }
  );

  // TODO(M6): Add second SWR call to detect ao_vivo events.
  // Current API /api/eventos/proximo only returns 'agendado'.
  // When M6 is implemented, either:
  // 1. Modify /api/eventos/proximo to include ao_vivo, OR
  // 2. Add separate /api/arena/live/status endpoint
  const isAoVivo = data?.status === 'ao_vivo';

  return {
    evento: data ?? null,
    isLoading,
    error,
    isAoVivo,
  };
}
