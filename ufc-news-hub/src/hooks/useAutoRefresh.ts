'use client';

import { useEffect, useState, useCallback } from 'react';
import { AUTO_REFRESH_INTERVAL } from '@/lib/constants';

interface UseAutoRefreshOptions {
  interval?: number;
  onRefresh?: () => void;
  enabled?: boolean;
}

interface UseAutoRefreshReturn {
  lastRefresh: Date | null;
  isRefreshing: boolean;
  refresh: () => Promise<void>;
  toggleEnabled: () => void;
  enabled: boolean;
}

export function useAutoRefresh(
  options: UseAutoRefreshOptions = {}
): UseAutoRefreshReturn {
  const {
    interval = AUTO_REFRESH_INTERVAL,
    onRefresh,
    enabled: initialEnabled = true,
  } = options;

  const [enabled, setEnabled] = useState(initialEnabled);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      setLastRefresh(new Date());
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh, isRefreshing]);

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      refresh();
    }, interval);

    return () => clearInterval(intervalId);
  }, [enabled, interval, refresh]);

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  return {
    lastRefresh,
    isRefreshing,
    refresh,
    toggleEnabled,
    enabled,
  };
}

// Hook para verificar se há novas notícias
export function useNewNoticiasIndicator(lastCheck: Date | null) {
  const [hasNew, setHasNew] = useState(false);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    async function checkNew() {
      if (!lastCheck) return;

      try {
        const res = await fetch('/api/noticias?pagina=1&porPagina=1');
        const data = await res.json();

        if (data.noticias && data.noticias.length > 0) {
          const latestDate = new Date(data.noticias[0].created_at);
          if (latestDate > lastCheck) {
            setHasNew(true);
            // Contar quantas notícias são mais novas
            const countRes = await fetch(
              `/api/noticias?pagina=1&porPagina=10`
            );
            const countData = await countRes.json();
            const newNoticias = countData.noticias.filter(
              (n: { created_at: string }) => new Date(n.created_at) > lastCheck
            );
            setNewCount(newNoticias.length);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar novas notícias:', error);
      }
    }

    const interval = setInterval(checkNew, 60000); // Verificar a cada minuto
    checkNew();

    return () => clearInterval(interval);
  }, [lastCheck]);

  const clearNew = useCallback(() => {
    setHasNew(false);
    setNewCount(0);
  }, []);

  return { hasNew, newCount, clearNew };
}
