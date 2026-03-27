'use client';


import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, Trophy, HelpCircle } from 'lucide-react';
import { type PickData, METODOS, getMaxRounds, tipoLabel } from '@/components/arena/picks-shared';
import { sobrenome } from '@/components/arena/shared';
import type { LutaComLutadores } from '@/types';

// ═══════════════════════════════════════════════════════════
// STEP 1: SwipeCard — pick vencedor + metodo + round
// ═══════════════════════════════════════════════════════════

type SwipePhase = 'pick' | 'detail';

export function SwipeCard({
  luta,
  index,
  total,
  pick,
  onPickVencedor,
  onPickDetail,
  onNext,
  saveError,
}: {
  luta: LutaComLutadores;
  index: number;
  total: number;
  pick: PickData | undefined;
  onPickVencedor: (vencedorId: string) => void;
  onPickDetail: (metodo?: string, round?: number) => void;
  onNext: () => void;
  saveError?: string | null;
}) {
  const [phase, setPhase] = useState<SwipePhase>(pick?.vencedor_id ? 'detail' : 'pick');
  const [justPicked, setJustPicked] = useState<string | null>(null);
  const [selectedMetodo, setSelectedMetodo] = useState<string | undefined>(pick?.metodo);
  const [selectedRound, setSelectedRound] = useState<number | undefined>(pick?.round);

  const isMainEvent = luta.tipo === 'main_event' || luta.tipo === 'co_main';
  const rounds = getMaxRounds(luta);
  const showRound = selectedMetodo === 'KO/TKO' || selectedMetodo === 'Submission';

  // Reset when luta changes
  useEffect(() => {
    setPhase(pick?.vencedor_id ? 'detail' : 'pick');
    setSelectedMetodo(pick?.metodo);
    setSelectedRound(pick?.round);
    setJustPicked(null);
  }, [luta.id, pick?.vencedor_id, pick?.metodo, pick?.round]);

  const handlePickFighter = (vencedorId: string) => {
    setJustPicked(vencedorId);
    if (navigator.vibrate) navigator.vibrate(30);
    onPickVencedor(vencedorId);
    setTimeout(() => {
      setJustPicked(null);
      setPhase('detail');
    }, 400);
  };

  const handleNext = () => {
    onPickDetail(selectedMetodo, selectedRound);
    onNext();
  };

  const handleMetodoToggle = (key: string) => {
    const newVal = selectedMetodo === key ? undefined : key;
    setSelectedMetodo(newVal);
    if (!newVal) setSelectedRound(undefined);
    onPickDetail(newVal, newVal ? selectedRound : undefined);
  };

  const handleRoundToggle = (r: number) => {
    const newVal = selectedRound === r ? undefined : r;
    setSelectedRound(newVal);
    onPickDetail(selectedMetodo, newVal);
  };

  // Picked fighter name for detail phase
  const pickedFighter = pick?.vencedor_id === luta.lutador1.id
    ? luta.lutador1 : pick?.vencedor_id === luta.lutador2.id
    ? luta.lutador2 : null;

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {saveError && (
        <div className="w-full max-w-lg mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400 text-center">
          {saveError}
        </div>
      )}
      {/* Fight context */}
      <div className="text-center mb-6 space-y-2">
        <div className="flex items-center justify-center gap-3">
          <h1 className={`text-2xl sm:text-3xl font-display uppercase tracking-wide font-bold ${isMainEvent ? 'text-ufc-red' : 'text-white/60'}`}>
            {tipoLabel(luta.tipo)}
          </h1>
          {luta.is_titulo && (
            <span className="text-xs text-ufc-gold font-bold uppercase bg-ufc-gold/10 border border-ufc-gold/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> Titulo
            </span>
          )}
        </div>
        <div className="text-base sm:text-lg text-white/50 font-medium">{luta.categoria_peso} · {rounds} rounds</div>
        <div className="text-sm text-white/40 font-display tracking-wide">Luta {index + 1} de {total}</div>
      </div>

      {/* PHASE 1: Pick the winner */}
      {phase === 'pick' && (
        <>
          <h2 className="font-display text-xl sm:text-2xl uppercase text-white/70 mb-8">
            Quem vence?
          </h2>
          <div className="grid grid-cols-2 gap-5 w-full max-w-lg">
            {[luta.lutador1, luta.lutador2].map((lutador) => {
              const isJust = justPicked === lutador.id;
              return (
                <button
                  key={lutador.id}
                  onClick={() => handlePickFighter(lutador.id)}
                  className={[
                    'relative flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl transition-all',
                    'bg-white/5 border-2 border-white/10 hover:border-white/25',
                    isJust ? 'scale-[1.04] bg-ufc-red/15 border-ufc-red' : 'scale-100',
                  ].join(' ')}
                  style={{ transition: isJust ? 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1)' : 'all 0.2s' }}
                >
                  {isJust && <div className="absolute inset-0 bg-ufc-red/15 rounded-2xl animate-fade-in pointer-events-none" />}
                  <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 ${isJust ? 'border-ufc-red' : 'border-white/10'}`}>
                    {lutador.imagem_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={lutador.imagem_url} alt={lutador.nome} referrerPolicy="no-referrer" className="object-cover object-top" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5 text-2xl font-display text-white/30">
                        {sobrenome(lutador.nome).slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="font-display text-xl sm:text-2xl uppercase text-white text-center leading-tight">
                    {sobrenome(lutador.nome)}
                  </span>
                  <span className="text-sm text-white/30">
                    {lutador.vitorias ?? 0}-{lutador.derrotas ?? 0}-{lutador.empates ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* PHASE 2: Method + Round (optional) */}
      {phase === 'detail' && pickedFighter && (
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Picked fighter recap */}
          <div className="flex items-center justify-center gap-4 py-4 px-5 rounded-2xl bg-ufc-red/10 border border-ufc-red/30">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-ufc-red shrink-0">
              {pickedFighter.imagem_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={pickedFighter.imagem_url} alt={pickedFighter.nome} width={56} height={56} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-sm font-display text-white/30">
                  {sobrenome(pickedFighter.nome).slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <span className="text-lg font-display uppercase font-bold text-white">{sobrenome(pickedFighter.nome)}</span>
              <span className="text-base text-white/40 ml-2">vence</span>
            </div>
            <button
              onClick={() => setPhase('pick')}
              className="ml-auto text-xs text-white/30 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              mudar
            </button>
          </div>

          {/* Method */}
          <div>
            <div className="text-sm font-display uppercase tracking-widest text-white/40 mb-3">
              Como? <span className="text-ufc-gold/50">(+50 pts)</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {METODOS.map(m => (
                <button
                  key={m.key}
                  onClick={() => handleMetodoToggle(m.key)}
                  className={`py-3.5 rounded-xl text-sm font-medium transition-all ${
                    selectedMetodo === m.key
                      ? 'bg-ufc-red text-white'
                      : 'bg-white/5 text-white/40 border border-white/10 hover:border-white/25'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Round — only for KO/TKO and Submission */}
          {showRound && (
            <div className="animate-fade-in">
              <div className="text-sm font-display uppercase tracking-widest text-white/40 mb-3">
                Em qual round? <span className="text-ufc-gold/50">(+50 pts)</span>
              </div>
              <div className="flex gap-3 justify-center">
                {Array.from({ length: rounds }, (_, i) => i + 1).map(r => (
                  <button
                    key={r}
                    onClick={() => handleRoundToggle(r)}
                    className={`w-12 h-12 rounded-full text-base font-display transition-all ${
                      selectedRound === r
                        ? 'bg-ufc-red text-white'
                        : 'bg-white/5 text-white/40 border border-white/10 hover:border-white/25'
                    }`}
                  >
                    R{r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl bg-white/10 border border-white/10 text-base font-display uppercase tracking-wide text-white hover:bg-white/15 transition-all flex items-center justify-center gap-2"
          >
            {index < total - 1 ? "Next fight" : 'Ver resumo'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Analysis link */}
      <Link
        href="/analises"
        className="flex items-center gap-1.5 mt-6 text-xs text-white/25 hover:text-ufc-red transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5" />
        Em duvida? Veja nossa analise
      </Link>
    </div>
  );
}
