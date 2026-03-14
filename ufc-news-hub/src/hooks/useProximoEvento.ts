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
    '/api/eventos/proximo?include_live=true',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      refreshInterval: 300000,
      onError: () => {},
    }
  );

  const isAoVivo = data?.status === 'ao_vivo';

  return {
    evento: data ?? null,
    isLoading,
    error,
    isAoVivo,
  };
}
