'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { NewsGrid } from '@/components/ui/NewsGrid';
import { NewsGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { useNoticias } from '@/hooks/useNoticias';

export default function LutasPage() {
  const {
    noticias,
    contadores,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useNoticias({ categoria: 'lutas' });

  return (
    <MainLayout contadores={contadores}>
      <div className="mb-6">
        <h1 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
          <span className="text-ufc-red">Lutas</span>
        </h1>
        <p className="mt-1 text-dark-textMuted">
          Anuncios de lutas, cards de eventos e resultados
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
