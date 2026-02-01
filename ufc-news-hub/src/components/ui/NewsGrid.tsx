'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Noticia } from '@/types';
import { NewsCard } from './NewsCard';
import { LoadingSpinner } from './LoadingSpinner';

interface NewsGridProps {
  noticias: Noticia[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  featureFirst?: boolean;
}

export function NewsGrid({
  noticias,
  hasMore = false,
  onLoadMore,
  isLoading = false,
  featureFirst = true,
}: NewsGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (noticias.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 h-16 w-16 text-dark-textMuted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <h3 className="mb-2 text-xl font-semibold text-dark-text">
          Nenhuma noticia encontrada
        </h3>
        <p className="text-dark-textMuted">
          Tente outra categoria ou aguarde novas atualizacoes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((noticia, index) => (
          <NewsCard
            key={noticia.id}
            noticia={noticia}
            featured={featureFirst && index === 0}
          />
        ))}
      </div>

      {/* Trigger para infinite scroll */}
      <div ref={loadMoreRef} className="h-1" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Fim da lista */}
      {!hasMore && noticias.length > 0 && (
        <div className="py-8 text-center">
          <p className="text-sm text-dark-textMuted">
            Voce viu todas as noticias
          </p>
        </div>
      )}
    </div>
  );
}
