'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { NewsGrid } from '@/components/ui/NewsGrid';
import { NewsGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { useNoticias } from '@/hooks/useNoticias';
import { useTranslations } from 'next-intl';

export default function BackstagePage() {
  const t = useTranslations('pages');
  const {
    noticias,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useNoticias({ categoria: 'backstage' });

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
          <span className="text-category-backstage">{t('backstage_title')}</span>
        </h1>
        <p className="mt-1 text-dark-textMuted">
          {t('backstage_subtitle')}
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
