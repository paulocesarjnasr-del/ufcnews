'use client';

import { useArenaAuth } from '@/hooks/useArenaAuth';
import { BarChart3, PieChart, Trophy } from 'lucide-react';
import { AccuracyHistory } from '@/components/arena/AccuracyHistory';
import { MethodDistribution } from '@/components/arena/MethodDistribution';
import { GlobalRanking } from '@/components/arena/GlobalRanking';

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useArenaAuth();

  if (isLoading) return <div className="container mx-auto px-4 py-8"><div className="h-64 bg-dark-card animate-pulse rounded-xl" /></div>;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="font-display text-2xl uppercase text-white">
        Analytics & <span className="text-ufc-red">Stats</span>
      </h1>

      {isAuthenticated && (
        <>
          <section>
            <h2 className="font-display text-lg uppercase text-dark-text flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-ufc-red" /> Historico de Accuracy
            </h2>
            <AccuracyHistory />
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-dark-text flex items-center gap-2 mb-3">
              <PieChart className="w-5 h-5 text-ufc-red" /> Metodos Acertados
            </h2>
            <MethodDistribution />
          </section>
        </>
      )}

      <section>
        <h2 className="font-display text-lg uppercase text-dark-text flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-ufc-gold" /> Ranking Global
        </h2>
        <GlobalRanking />
      </section>
    </div>
  );
}
