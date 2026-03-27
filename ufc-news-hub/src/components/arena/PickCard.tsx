'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Trophy, Pencil, Check, X, ExternalLink } from 'lucide-react';
import { type PickData, METODOS, metodoLabel, getMaxRounds, tipoLabel } from '@/components/arena/picks-shared';
import { sobrenome } from '@/components/arena/shared';
import type { LutaComLutadores } from '@/types';

import { useTranslations } from 'next-intl';
// ═══════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════

interface PickCardProps {
  luta: LutaComLutadores;
  pick: PickData | undefined;
  locked?: boolean;
  onUpdate: (lutaId: string, pick: PickData) => void;
}

// ═══════════════════════════════════════════════════════════
// PickCard
// ═══════════════════════════════════════════════════════════

export function PickCard({
  luta,
  pick,
  onUpdate,
  locked = false,
}: PickCardProps) {
  const t = useTranslations('arena');
  const [editing, setEditing] = useState(false);
  const vencedorId = pick?.vencedor_id;
  const isMain = luta.tipo === 'main_event' || luta.tipo === 'co_main';
  const isFinished = luta.status === 'finalizada';
  const realVencedorId = (luta as unknown as { vencedor_id?: string }).vencedor_id;

  if (!vencedorId) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-4">
        <div className="text-sm text-white/30 text-center">
          {sobrenome(luta.lutador1.nome)} vs {sobrenome(luta.lutador2.nome)} — sem pick
        </div>
      </div>
    );
  }

  const vencedor = vencedorId === luta.lutador1.id ? luta.lutador1 : luta.lutador2;
  const perdedor = vencedorId === luta.lutador1.id ? luta.lutador2 : luta.lutador1;

  // Consensus comparison
  const consenso = luta.consenso?.find(c => c.lutador_escolhido_id === vencedorId);
  const consensoPct = consenso?.percentual ? Math.round(consenso.percentual) : null;
  const isFavorite = consensoPct !== null && consensoPct >= 50;
  const isUnderdog = consensoPct !== null && consensoPct < 50;

  // Live/finished result
  const acertou = isFinished && realVencedorId === vencedorId;
  const errou = isFinished && realVencedorId && realVencedorId !== vencedorId;

  return (
    <div className={`rounded-xl border backdrop-blur-sm p-4 transition-all ${
      acertou ? 'bg-green-500/10 border-green-500/30' :
      errou ? 'bg-red-500/10 border-red-500/30' :
      isMain ? 'bg-ufc-red/5 border-ufc-red/20' :
      'bg-black/30 border-white/10'
    }`}>
      {/* Type badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[9px] font-display uppercase tracking-widest ${isMain ? 'text-ufc-red' : 'text-white/25'}`}>
          {tipoLabel(luta.tipo)}
        </span>
        {luta.is_titulo && (
          <span className="text-[9px] text-ufc-gold font-bold uppercase bg-ufc-gold/10 border border-ufc-gold/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Trophy className="w-2.5 h-2.5" /> Titulo
          </span>
        )}
        {acertou && (
          <span className="flex items-center gap-1 text-[9px] text-green-400 font-bold uppercase">
            <Check className="w-3 h-3" /> Acertou
          </span>
        )}
        {errou && (
          <span className="flex items-center gap-1 text-[9px] text-red-400 font-bold uppercase">
            <X className="w-3 h-3" /> Errou
          </span>
        )}
      </div>

      {/* Fighters */}
      <div className="flex items-center gap-3">
        {/* Winner (picked) — larger */}
        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 ${
          acertou ? 'border-green-500' : errou ? 'border-red-500/50' : 'border-ufc-red/60'
        }`}>
          {vencedor.imagem_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={vencedor.imagem_url} alt={vencedor.nome} width={48} height={48} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-[10px] font-display text-white/30">
              {sobrenome(vencedor.nome).slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">
            {sobrenome(vencedor.nome)} <span className="text-white/25 font-normal">vence {sobrenome(perdedor.nome)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {pick.metodo ? (
              <span className="text-[10px] text-ufc-red/80 bg-ufc-red/10 px-2 py-0.5 rounded-full">
                {metodoLabel(pick.metodo)}
              </span>
            ) : (
              <span className="text-[10px] text-white/20">vitoria simples</span>
            )}
            {pick.round && (
              <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                Round {pick.round}
              </span>
            )}
            {/* Points this pick is worth */}
            <span className="text-[10px] text-ufc-gold/60">
              {100 + (pick.metodo ? 50 : 0) + (pick.round ? 50 : 0)} pts
            </span>
          </div>
        </div>

        {/* Loser photo — smaller, dimmed */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 opacity-30">
          {perdedor.imagem_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={perdedor.imagem_url} alt={perdedor.nome} width={32} height={32} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-[8px] font-display text-white/30">
              {sobrenome(perdedor.nome).slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Consensus bar */}
      {consensoPct !== null && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className={isUnderdog ? 'text-ufc-gold/70' : 'text-white/30'}>
              {isUnderdog ? t('bold_bet') : isFavorite ? t('with_majority') : ''}
            </span>
            <span className="text-white/25">{consensoPct}% da comunidade</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${isUnderdog ? 'bg-ufc-gold/50' : 'bg-ufc-red/40'}`}
              style={{ width: `${consensoPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Edit button + inline editor */}
      {!isFinished && !locked && (
        <div className="mt-3 pt-3 border-t border-white/5">
          {!editing ? (
            <div className="flex items-center justify-between">
              <Link
                href="/analises"
                className="flex items-center gap-1 text-[10px] text-white/20 hover:text-ufc-red transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Ver analise
              </Link>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 text-[10px] text-white/30 hover:text-ufc-red transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              >
                <Pencil className="w-3 h-3" />
                Editar
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              {/* Swap vencedor */}
              <div>
                <div className="text-[9px] text-white/30 font-display uppercase tracking-widest mb-2">Vencedor</div>
                <div className="grid grid-cols-2 gap-2">
                  {[luta.lutador1, luta.lutador2].map(lutador => {
                    const isSelected = vencedorId === lutador.id;
                    return (
                      <button
                        key={lutador.id}
                        onClick={() => onUpdate(luta.id, { ...pick, vencedor_id: lutador.id })}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all text-left ${
                          isSelected
                            ? 'bg-ufc-red/15 border border-ufc-red/50'
                            : 'bg-white/5 border border-transparent hover:border-white/15'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full overflow-hidden shrink-0 border ${isSelected ? 'border-ufc-red' : 'border-white/10'}`}>
                          {lutador.imagem_url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={lutador.imagem_url} alt={lutador.nome} width={28} height={28} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-[8px] font-display text-white/30">
                              {sobrenome(lutador.nome).slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-white/40'}`}>
                          {sobrenome(lutador.nome)}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-ufc-red ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Metodo */}
              <div>
                <div className="text-[9px] text-white/30 font-display uppercase tracking-widest mb-2">
                  Como? <span className="text-ufc-gold/50">(+50 pts)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {METODOS.map(m => (
                    <button
                      key={m.key}
                      onClick={() => onUpdate(luta.id, {
                        ...pick,
                        metodo: pick?.metodo === m.key ? undefined : m.key,
                        round: pick?.metodo === m.key ? undefined : pick?.round,
                      })}
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
              </div>

              {/* Round — only for KO/TKO and Submission */}
              {(pick?.metodo === 'KO/TKO' || pick?.metodo === 'Submission') && (
                <div>
                  <div className="text-[9px] text-white/30 font-display uppercase tracking-widest mb-2">
                    Round <span className="text-ufc-gold/50">(+50 pts)</span>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: getMaxRounds(luta) }, (_, i) => i + 1).map(r => (
                      <button
                        key={r}
                        onClick={() => onUpdate(luta.id, { ...pick, round: pick?.round === r ? undefined : r })}
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
                </div>
              )}

              <button
                onClick={() => setEditing(false)}
                className="w-full py-2 rounded-lg bg-white/5 text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Fechar edição
              </button>
            </div>
          )}
        </div>
      )}

      {/* Analysis link for finished fights */}
      {isFinished && (
        <Link
          href="/analises"
          className="flex items-center gap-1 mt-3 text-[10px] text-white/20 hover:text-ufc-red transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Ver analise desta luta
        </Link>
      )}
    </div>
  );
}
