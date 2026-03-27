'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { type PickData, METODOS, tipoLabel, getMaxRounds } from '@/components/arena/picks-shared';
import { sobrenome } from '@/components/arena/shared';
import type { LutaComLutadores } from '@/types';

// ═══════════════════════════════════════════════════════════
// PickEditScreen — full edit with different layout
// ═══════════════════════════════════════════════════════════

export function PickEditScreen({
  lutas,
  picks,
  onUpdatePick,
  onDone,
}: {
  lutas: LutaComLutadores[];
  picks: Record<string, PickData>;
  onUpdatePick: (lutaId: string, pick: PickData) => void;
  onDone: () => void;
}) {
  const t = useTranslations('arena');
  return (
    <div className="w-full max-w-md mx-auto space-y-5 animate-fade-in pb-8">
      <div className="text-center space-y-1">
        <h2 className="font-display text-xl uppercase text-white">{t('edit_predictions_title')}</h2>
        <p className="text-xs text-white/30">{t('tap_to_change')}</p>
      </div>

      <div className="space-y-4">
        {lutas.map(luta => {
          const pick = picks[luta.id];
          const vencedorId = pick?.vencedor_id;
          const isMain = luta.tipo === 'main_event' || luta.tipo === 'co_main';
          const rounds = getMaxRounds(luta);
          const showRound = pick?.metodo === 'KO/TKO' || pick?.metodo === 'Submission';

          return (
            <div
              key={luta.id}
              className={`rounded-xl border p-4 space-y-3 ${isMain ? 'bg-ufc-red/5 border-ufc-red/20' : 'bg-black/40 backdrop-blur-sm border-white/10'}`}
            >
              {/* Fight header */}
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-display uppercase tracking-widest ${isMain ? 'text-ufc-red' : 'text-white/25'}`}>
                  {tipoLabel(luta.tipo)}
                </span>
                <span className="text-[9px] text-white/20">{luta.categoria_peso}</span>
              </div>

              {/* Fighter toggle — two buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[luta.lutador1, luta.lutador2].map(lutador => {
                  const isSelected = vencedorId === lutador.id;
                  return (
                    <button
                      key={lutador.id}
                      onClick={() => onUpdatePick(luta.id, { ...pick, vencedor_id: lutador.id })}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-ufc-red/15 border border-ufc-red/50'
                          : 'bg-white/5 border border-transparent hover:border-white/15'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full overflow-hidden shrink-0 border ${isSelected ? 'border-ufc-red' : 'border-white/10'}`}>
                        {lutador.imagem_url ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={lutador.imagem_url} alt={lutador.nome} width={32} height={32} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/5 text-[8px] font-display text-white/30">
                            {sobrenome(lutador.nome).slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-white/40'}`}>
                        {sobrenome(lutador.nome)}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-ufc-red ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Method pills */}
              {vencedorId && (
                <div className="flex flex-wrap gap-1.5">
                  {METODOS.map(m => (
                    <button
                      key={m.key}
                      onClick={() => {
                        const newMetodo = pick?.metodo === m.key ? undefined : m.key;
                        onUpdatePick(luta.id, {
                          ...pick,
                          vencedor_id: vencedorId,
                          metodo: newMetodo,
                          round: newMetodo ? pick?.round : undefined,
                        });
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                        pick?.metodo === m.key
                          ? 'bg-ufc-red text-white'
                          : 'bg-white/5 text-white/30 hover:text-white/50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Round buttons */}
              {vencedorId && showRound && (
                <div className="flex gap-1.5">
                  {Array.from({ length: rounds }, (_, i) => i + 1).map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        onUpdatePick(luta.id, {
                          ...pick,
                          vencedor_id: vencedorId,
                          round: pick?.round === r ? undefined : r,
                        });
                      }}
                      className={`w-8 h-8 rounded-full text-[10px] font-display transition-all ${
                        pick?.round === r
                          ? 'bg-ufc-red text-white'
                          : 'bg-white/5 text-white/30 hover:text-white/50'
                      }`}
                    >
                      R{r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Save */}
      <button
        onClick={onDone}
        className="w-full py-3 bg-ufc-gold/10 border border-ufc-gold/20 text-ufc-gold font-display uppercase tracking-wide rounded-xl transition-all hover:bg-ufc-gold/20 text-sm flex items-center justify-center gap-2"
      >
        <Check className="w-4 h-4" />
        {t('save_changes')}
      </button>
    </div>
  );
}
