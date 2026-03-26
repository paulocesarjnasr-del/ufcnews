'use client';

import { Link } from '@/i18n/routing';
import { Zap, ChevronRight } from 'lucide-react';
import { LiveRanking } from '@/components/arena/LiveRanking';
import { OctagonTexture, type Evento } from '@/components/arena/shared';
import { EventHeader } from '@/components/arena/EventHeader';
import { useTranslations } from 'next-intl';

interface HomeNewProps {
  evento: Evento | null;
}

export function HomeNew({ evento }: HomeNewProps) {
  const t = useTranslations('arena');
  const totalLutas = evento?.lutas?.length ?? 0;

  return (
    <OctagonTexture posterUrl={evento?.poster_url} className="min-h-screen">
      <div className="container mx-auto px-4 pt-6 pb-8">
        <div className="max-w-lg mx-auto space-y-6">

          {evento ? (
            <EventHeader evento={evento} size="sm" />
          ) : (
            <div className="text-center pt-8">
              <h2 className="font-display text-3xl text-white uppercase">
                Arena <span className="text-ufc-red">UFC</span>
              </h2>
              <p className="text-sm text-white/50 mt-2">{t('stay_tuned')}</p>
            </div>
          )}

          {evento && (
            <>
              <div className="text-center space-y-3">
                <h2 className="font-display text-2xl uppercase text-white">
                  {t('welcome')}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed">
                  {t('description')}
                </p>
              </div>

              <div className="text-center">
                <Link
                  href={`/arena/evento/${evento.id}`}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-ufc-red hover:bg-ufc-redLight text-white font-display text-lg uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-ufc-red/20 hover:shadow-ufc-red/40"
                >
                  <Zap className="w-5 h-5" />
                  {t('start_now')}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="text-xs text-white/30 mt-2">{totalLutas} {t('fights_in_card')}</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '+100', label: t('correct'), color: 'text-ufc-red' },
                  { value: '+50', label: t('method_of_victory'), color: 'text-ufc-gold' },
                  { value: '+50', label: 'round', color: 'text-green-400' },
                ].map(pill => (
                  <div key={pill.label} className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
                    <div className={`font-display text-xl ${pill.color}`}>{pill.value}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{pill.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <LiveRanking limit={3} />

        </div>
      </div>
    </OctagonTexture>
  );
}
