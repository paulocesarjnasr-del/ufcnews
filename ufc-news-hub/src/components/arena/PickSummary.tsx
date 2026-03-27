'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Trophy, Pencil } from 'lucide-react';
import { type PickData, maxPontos, metodoLabel } from '@/components/arena/picks-shared';
import { sobrenome } from '@/components/arena/shared';
import type { LutaComLutadores } from '@/types';

// ═══════════════════════════════════════════════════════════
// PickSummary — read-only recap of all picks
// ═══════════════════════════════════════════════════════════

export function PickSummary({
  lutas,
  picks,
  eventoNome,
  eventoId,
  onGoToEdit,
}: {
  lutas: LutaComLutadores[];
  picks: Record<string, PickData>;
  eventoNome: string;
  eventoId: string;
  onGoToEdit: () => void;
}) {
  const t = useTranslations('arena');
  const pontos = maxPontos(picks);
  const totalPicks = Object.values(picks).filter(p => p.vencedor_id).length;

  return (
    <div className="animate-fade-in space-y-6 w-full max-w-md mx-auto">
      <div className="text-center space-y-3">
        <Trophy className="w-12 h-12 text-ufc-gold mx-auto" />
        <h2 className="font-display text-2xl sm:text-3xl uppercase text-white">{t('your_picks')}</h2>
        <p className="text-sm text-white/40">{eventoNome}</p>
      </div>

      <div className="rounded-xl bg-ufc-gold/5 border border-ufc-gold/20 p-4 text-center">
        <div className="text-xs text-ufc-gold/60 font-display uppercase tracking-widest mb-1">
          {t('possible_points_if_all')}
        </div>
        <div className="font-display text-3xl text-ufc-gold">{pontos.toLocaleString()} pts</div>
        <div className="text-[10px] text-white/25 mt-1">
          {totalPicks} picks · base 100 + 50 metodo + 50 round
        </div>
      </div>

      <div className="space-y-2">
        {lutas.map(luta => {
          const pick = picks[luta.id];
          const vencedorId = pick?.vencedor_id;
          if (!vencedorId) {
            return (
              <div key={luta.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-white/30">
                  {sobrenome(luta.lutador1.nome)} vs {sobrenome(luta.lutador2.nome)} — <span className="text-ufc-red">{t('no_pick')}</span>
                </span>
              </div>
            );
          }
          const vencedor = vencedorId === luta.lutador1.id ? luta.lutador1 : luta.lutador2;
          const perdedor = vencedorId === luta.lutador1.id ? luta.lutador2 : luta.lutador1;
          const isMain = luta.tipo === 'main_event' || luta.tipo === 'co_main';

          return (
            <div key={luta.id} className={`rounded-xl border p-3 ${isMain ? 'bg-ufc-red/5 border-ufc-red/20' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-ufc-red/50 shrink-0">
                  {vencedor.imagem_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={vencedor.imagem_url} alt={vencedor.nome} width={36} height={36} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-[9px] font-display text-white/30">
                      {sobrenome(vencedor.nome).slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white font-semibold truncate">
                    {sobrenome(vencedor.nome)} <span className="text-white/25 font-normal">{t('wins_label')} {sobrenome(perdedor.nome)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {pick.metodo ? (
                      <span className="text-[10px] text-ufc-red/70 bg-ufc-red/10 px-1.5 py-0.5 rounded">{metodoLabel(pick.metodo)}</span>
                    ) : (
                      <span className="text-[10px] text-white/20">{t('no_method')}</span>
                    )}
                    {pick.round && <span className="text-[10px] text-white/30">R{pick.round}</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 pt-2">
        <button
          onClick={onGoToEdit}
          className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 border border-white/10 text-white font-display uppercase tracking-wide rounded-xl transition-all hover:bg-white/15 text-sm"
        >
          <Pencil className="w-4 h-4" />
          {t('edit_predictions')}
        </button>
        <Link
          href={`/arena/evento/${eventoId}/meus-picks`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-ufc-gold/10 border border-ufc-gold/20 text-ufc-gold font-display uppercase tracking-wide rounded-xl transition-all hover:bg-ufc-gold/20 text-sm"
        >
          <Trophy className="w-4 h-4" />
          {t('predictions_saved_luck')}
        </Link>
      </div>
    </div>
  );
}
