'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { NewsGrid } from '@/components/ui/NewsGrid';
import { NewsGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { useNoticias } from '@/hooks/useNoticias';

export default function HomePage() {
  const {
    noticias,
    contadores,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useNoticias();

  return (
    <MainLayout contadores={contadores}>
      <div className="mb-6">
        <h1 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
          Ultimas Noticias
        </h1>
        <p className="mt-1 text-dark-textMuted">
          Todas as noticias do mundo do UFC
        </p>
      </div>

      {isLoading ? (
        <NewsGridSkeleton count={6} />
      ) : (
        <NewsGrid
          noticias={noticias}
          hasMore={hasMore}
          onLoadMore={loadMore}
          isLoading={isLoadingMore}
          featureFirst={true}
        />
      )}
    </MainLayout>
  );
}
