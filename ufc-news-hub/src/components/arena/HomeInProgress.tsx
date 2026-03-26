'use client';

import { Link } from '@/i18n/routing';
import { Zap, ChevronRight } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { LiveRanking } from '@/components/arena/LiveRanking';
import { MinhasLigas } from '@/components/arena/MinhasLigas';
import { UserStats } from '@/components/arena/UserStats';
import { OctagonTexture, FightPreview, sortLutas, type Evento } from '@/components/arena/shared';
import { EventHeader } from '@/components/arena/EventHeader';
import { useTranslations } from 'next-intl';

interface HomeInProgressProps {
  evento: Evento | null;
  picks: Record<string, string>;
  picksCount: number;
  totalLutas: number;
}

export function HomeInProgress({ evento, picks, picksCount, totalLutas }: HomeInProgressProps) {
  const t = useTranslations('arena');
  const { usuario } = useArenaAuth();
  const remaining = totalLutas - picksCount;
  const progressPercent = totalLutas > 0 ? (picksCount / totalLutas) * 100 : 0;

  const sortedLutas = evento ? sortLutas(evento.lutas) : [];
  const nextUnpicked = sortedLutas.find(l => !picks[l.id]);

  return (
    <OctagonTexture posterUrl={evento?.poster_url} className="min-h-screen">
      <div className="container mx-auto px-4 pt-6 pb-8">
        <div className="max-w-lg mx-auto space-y-5">

          {evento ? (
            <EventHeader evento={evento} size="sm" />
          ) : (
            <div className="text-center pt-8">
              <h2 className="font-display text-2xl text-white uppercase">{t('no_event_scheduled')}</h2>
              <p className="text-sm text-white/50 mt-2">{t('stay_tuned')}</p>
            </div>
          )}

          {evento && (
            <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{t('your_predictions')}</span>
                  <span className="text-xs text-white/50">{picksCount}/{totalLutas}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-ufc-red transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <Link
                href={`/arena/evento/${evento.id}`}
                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide rounded-xl transition-all text-sm animate-pulse-red"
              >
                <Zap className="w-4 h-4" />
                {t('complete_predictions')} — {remaining} {t('remaining')}
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {nextUnpicked && (
                <Link href={`/arena/evento/${evento.id}`} className="block">
                  <div className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-1">
                    {t('next_fight')}
                  </div>
                  <FightPreview luta={nextUnpicked} showDetails />
                </Link>
              )}
            </div>
          )}

          <LiveRanking limit={3} highlightUserId={usuario?.id} />

          <MinhasLigas showCtaIfEmpty={picksCount > 0} />

          <UserStats />

        </div>
      </div>
    </OctagonTexture>
  );
}
