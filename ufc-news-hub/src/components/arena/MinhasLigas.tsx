'use client';

import useSWR from 'swr';
import { Link } from '@/i18n/routing';
import { Users, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Liga {
  id: string;
  nome: string;
  total_membros: number;
  minha_posicao?: number;
}

interface LigasResponse {
  ligas: Liga[];
}

interface MinhasLigasProps {
  showCtaIfEmpty?: boolean;
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
});

export function MinhasLigas({ showCtaIfEmpty = false }: MinhasLigasProps) {
  const t = useTranslations('arena');
  const { data, isLoading, error } = useSWR<LigasResponse>(
    '/api/arena/ligas?tipo=minhas',
    fetcher,
    { revalidateOnFocus: true, dedupingInterval: 30000 }
  );

  if (error) return null;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
        <div className="h-16 rounded-lg bg-white/5 animate-pulse" />
      </div>
    );
  }

  const ligas = data?.ligas ?? [];

  if (ligas.length === 0 && !showCtaIfEmpty) return null;

  if (ligas.length === 0 && showCtaIfEmpty) {
    return (
      <Link
        href="/arena/ligas/criar"
        className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-5 hover:border-ufc-gold/30 transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-ufc-gold/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-ufc-gold" />
        </div>
        <div>
          <div className="text-sm font-medium text-white group-hover:text-ufc-gold transition-colors">
            {t('challenge_friends')}
          </div>
          <div className="text-xs text-white/30">{t('league_subtitle')}</div>
        </div>
      </Link>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-display uppercase tracking-widest text-white/40">
        {t('my_leagues')}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
        {ligas.map(liga => (
          <Link
            key={liga.id}
            href={`/arena/ligas/${liga.id}`}
            className="shrink-0 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 min-w-[140px] hover:border-ufc-gold/30 transition-colors"
          >
            <div className="text-sm font-medium text-white truncate">{liga.nome}</div>
            {liga.minha_posicao != null && liga.minha_posicao > 0 && (
              <div className="text-xs text-ufc-gold mt-1">
                #{liga.minha_posicao} / {liga.total_membros}
              </div>
            )}
          </Link>
        ))}
        <Link
          href="/arena/ligas/criar"
          className="shrink-0 rounded-xl border border-dashed border-white/10 bg-black/20 p-4 min-w-[100px] flex flex-col items-center justify-center gap-1 hover:border-ufc-gold/30 transition-colors"
        >
          <Plus className="w-4 h-4 text-white/30" />
          <span className="text-xs text-white/30">{t('create_league')}</span>
        </Link>
      </div>
    </div>
  );
}
