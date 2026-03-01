'use client';

import useSWR from 'swr';
import { useCallback } from 'react';
import { ReelNoticia } from '@/types';
import { AUTO_REFRESH_INTERVAL } from '@/lib/constants';
import { useFingerprint } from './useFingerprint';

interface ReelsResponse {
  noticias: ReelNoticia[];
}

export function useReels() {
  const fingerprint = useFingerprint();

  const { data, error, isLoading, mutate } = useSWR<ReelsResponse>(
    fingerprint ? '/api/news/reels' : null,
    (url: string) =>
      fetch(url, {
        headers: { 'x-user-fingerprint': fingerprint },
      }).then((res) => res.json()),
    {
      refreshInterval: AUTO_REFRESH_INTERVAL,
      revalidateOnFocus: false,
    }
  );

  const toggleLike = useCallback(
    async (noticiaId: string) => {
      if (!data || !fingerprint) return;

      const noticia = data.noticias.find((n) => n.id === noticiaId);
      if (!noticia) return;

      const wasLiked = noticia.user_liked;

      // Optimistic update
      mutate(
        {
          noticias: data.noticias.map((n) =>
            n.id === noticiaId
              ? {
                  ...n,
                  user_liked: !wasLiked,
                  likes_count: wasLiked ? n.likes_count - 1 : n.likes_count + 1,
                }
              : n
          ),
        },
        false
      );

      try {
        await fetch(`/api/news/${noticiaId}/like`, {
          method: wasLiked ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint }),
        });
      } catch {
        // Revert on error
        mutate();
      }
    },
    [data, fingerprint, mutate]
  );

  return {
    noticias: data?.noticias || [],
    isLoading,
    error,
    fingerprint,
    toggleLike,
    refresh: () => mutate(),
  };
}
