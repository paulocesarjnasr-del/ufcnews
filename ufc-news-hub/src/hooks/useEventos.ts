'use client';

import useSWR from 'swr';
import { Evento, EventoComLutas } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useEventos(status?: 'agendado' | 'finalizado' | 'ao_vivo') {
  const params = status ? `?status=${status}` : '';

  const { data, error, isLoading, mutate } = useSWR<{
    eventos: Evento[];
    total: number;
  }>(`/api/eventos${params}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  return {
    eventos: data?.eventos || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate,
  };
}

export function useEvento(id: string) {
  const { data, error, isLoading, mutate } = useSWR<EventoComLutas>(
    id ? `/api/eventos/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    evento: data,
    isLoading,
    error,
    mutate,
  };
}

export function useProximoEvento() {
  const { data, error, isLoading, mutate } = useSWR<EventoComLutas>(
    '/api/eventos/proximo',
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }
  );

  return {
    evento: data,
    isLoading,
    error,
    mutate,
  };
}
