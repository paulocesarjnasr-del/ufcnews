'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Analise } from '@/types/analise';

export function LatestAnalysisBanner() {
  const [analise, setAnalise] = useState<Analise | null>(null);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch('/api/analises?latest=true');
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) setAnalise(data);
        }
      } catch {
        // Silently fail — banner just won't show
      }
    }
    fetchLatest();
  }, []);

  if (!analise) return null;

  const f1 = analise.fighter1_info;
  const f2 = analise.fighter2_info;
  const f1Last = f1?.nome?.split(' ').pop() || '?';
  const f2Last = f2?.nome?.split(' ').pop() || '?';

  const eventoDate = analise.evento_data ? new Date(analise.evento_data) : null;
  const dateStr = eventoDate
    ? eventoDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
    : '';

  return (
    <Link href={`/analise/${analise.slug}`} className="group mb-4 block">
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
                {analise.evento_nome} • {dateStr}
              </span>
            </div>
            <h2 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
              <span className="text-ufc-red">{f1Last}</span> vs{' '}
              <span className="text-blue-400">{f2Last}</span>
            </h2>
            <p className="mt-1 text-sm text-dark-textMuted">
              {analise.categoria_peso} • Análise completa + previsão
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="font-display text-xl text-dark-text">{f1?.record || '?'}</p>
              <p className="text-xs text-dark-textMuted">{f1?.ranking || f1Last}</p>
            </div>
            <span className="font-display text-lg text-dark-textMuted">VS</span>
            <div className="text-center">
              <p className="font-display text-xl text-dark-text">{f2?.record || '?'}</p>
              <p className="text-xs text-dark-textMuted">{f2?.ranking || f2Last}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-ufc-red/20 px-4 py-2 text-sm font-bold text-ufc-red transition-colors group-hover:bg-ufc-red group-hover:text-white">
            Ver Análise Completa →
          </span>
        </div>
      </div>
    </Link>
  );
}
