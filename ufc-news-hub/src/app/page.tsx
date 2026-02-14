'use client';

import Link from 'next/link';
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
      {/* Lightweight Contenders Featured Banner */}
      <Link href="/lightweight-contenders" className="group mb-4 block">
        <div className="relative overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-r from-dark-card via-orange-400/5 to-dark-card p-6 transition-all duration-300 hover:border-orange-400/60 hover:shadow-lg hover:shadow-orange-400/10 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(251,146,60,0.1),transparent_60%)]" />
          <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <div className="mb-1 flex items-center gap-2 justify-center md:justify-start">
                <span className="rounded bg-ufc-gold/20 px-2 py-0.5 text-xs font-bold text-ufc-gold">NOVO</span>
                <span className="text-xs font-medium uppercase tracking-widest text-orange-400">
                  YouTube Analysis • Revanche a Caminho
                </span>
              </div>
              <h2 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
                <span className="text-green-400">Gamrot</span> vs{' '}
                <span className="text-orange-400">Tsarukyan</span>
              </h2>
              <p className="mt-1 text-sm text-dark-textMuted">
                Lightweight Contenders • 403k views em 4 dias • Análise completa + previsão
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="font-display text-xl text-dark-text">25-4</p>
                <p className="text-xs text-dark-textMuted">#4 LW</p>
              </div>
              <span className="font-display text-lg text-dark-textMuted">VS</span>
              <div className="text-center">
                <p className="font-display text-xl text-dark-text">23-3</p>
                <p className="text-xs text-dark-textMuted">#1 LW</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-orange-400/20 px-4 py-2 text-sm font-bold text-orange-400 transition-colors group-hover:bg-orange-400 group-hover:text-white">
              Ver Análise Completa →
            </span>
          </div>
        </div>
      </Link>

      {/* UFC Houston Featured Banner */}
      <Link href="/houston" className="group mb-8 block">
        <div className="relative overflow-hidden rounded-xl border border-ufc-red/30 bg-gradient-to-r from-dark-card via-ufc-red/5 to-dark-card p-6 transition-all duration-300 hover:border-ufc-red/60 hover:shadow-lg hover:shadow-ufc-red/10 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(210,10,10,0.1),transparent_60%)]" />
          <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <div className="mb-1 flex items-center gap-2 justify-center md:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufc-red opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ufc-red"></span>
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-ufc-red">
                  Próximo Evento • 21 de Fevereiro
                </span>
              </div>
              <h2 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
                <span className="text-ufc-red">Strickland</span> vs{' '}
                <span className="text-blue-400">Hernandez</span>
              </h2>
              <p className="mt-1 text-sm text-dark-textMuted">
                UFC Houston • Toyota Center • Análise completa + previsão
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="font-display text-xl text-dark-text">29-7</p>
                <p className="text-xs text-dark-textMuted">#2 MW</p>
              </div>
              <span className="font-display text-lg text-dark-textMuted">VS</span>
              <div className="text-center">
                <p className="font-display text-xl text-dark-text">12-2</p>
                <p className="text-xs text-dark-textMuted">#5 MW</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-ufc-red/20 px-4 py-2 text-sm font-bold text-ufc-red transition-colors group-hover:bg-ufc-red group-hover:text-white">
              Ver Análise Completa →
            </span>
          </div>
        </div>
      </Link>

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
