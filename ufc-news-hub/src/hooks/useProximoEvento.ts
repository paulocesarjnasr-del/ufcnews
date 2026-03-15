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
      revalidateOnFocus: true,
      dedupingInterval: 15000,
      refreshInterval: (latestData) => {
        if (!latestData?.data_evento) return 300000; // 5min default

        const isLive = latestData.status === 'ao_vivo';
        if (isLive) return 30000; // 30s when live

        // When event is < 2h away, refresh every 60s to catch the transition
        const msUntil = new Date(latestData.data_evento).getTime() - Date.now();
        if (msUntil > 0 && msUntil < 2 * 60 * 60 * 1000) return 60000;

        return 300000; // 5min otherwise
      },
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
