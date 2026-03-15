'use client';

import { useState, useEffect, useCallback, useMemo, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, ChevronLeft, Trophy, Clock, HelpCircle, Pencil } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import type { EventoComLutas, LutaComLutadores } from '@/types';

// ═══════════════════════════════════════════════════════════
// Types & Helpers
// ═══════════════════════════════════════════════════════════

interface PageProps { params: Promise<{ id: string }> }

interface PickData {
  vencedor_id: string;
  metodo?: string;
  round?: number;
}

const tipoOrder: Record<string, number> = {
  main_event: 0, co_main: 1, card_principal: 2, preliminar: 3, early_prelim: 4,
};

const METODOS = [
  { key: 'KO/TKO', label: 'KO/TKO' },
  { key: 'Submission', label: 'Finalizacao' },
  { key: 'Decision - Unanimous', label: 'Decisao' },
];

function sortLutas(lutas: LutaComLutadores[]): LutaComLutadores[] {
  return [...lutas].sort((a, b) => (tipoOrder[a.tipo] ?? 5) - (tipoOrder[b.tipo] ?? 5));
}

function sobrenome(nome: string): string {
  return nome.split(' ').pop() ?? nome;
}

function tipoLabel(tipo: string): string {
  const map: Record<string, string> = {
    main_event: 'MAIN EVENT', co_main: 'CO-MAIN', card_principal: 'MAIN CARD',
    preliminar: 'PRELIMINAR', early_prelim: 'EARLY PRELIM',
  };
  return map[tipo] ?? tipo.toUpperCase();
}

function metodoLabel(m: string): string {
  if (m === 'Decision - Unanimous') return 'Decisao';
  if (m === 'Decision - Split') return 'Dividida';
  return m;
}

function getMaxRounds(luta: LutaComLutadores): number {
  return luta.tipo === 'main_event' || luta.tipo === 'co_main' || luta.is_titulo ? 5 : 3;
}

function maxPontos(picks: Record<string, PickData>): number {
  let total = 0;
  for (const p of Object.values(picks)) {
    if (!p.vencedor_id) continue;
    total += 100;
    if (p.metodo) total += 50;
    if (p.round) total += 50;
  }
  return total;
}

// ═══════════════════════════════════════════════════════════
// STEP 1: SwipeCard — pick vencedor + metodo + round
// ═══════════════════════════════════════════════════════════

type SwipePhase = 'pick' | 'detail';

function SwipeCard({
  luta,
  index,
  total,
  pick,
  onPickVencedor,
  onPickDetail,
  onNext,
}: {
  luta: LutaComLutadores;
  index: number;
  total: number;
  pick: PickData | undefined;
  onPickVencedor: (vencedorId: string) => void;
  onPickDetail: (metodo?: string, round?: number) => void;
  onNext: () => void;
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

  const consenso1 = luta.consenso?.find(c => c.lutador_escolhido_id === luta.lutador1.id);
  const consenso2 = luta.consenso?.find(c => c.lutador_escolhido_id === luta.lutador2.id);

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
      {/* Fight context */}
      <div className="text-center mb-4 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className={`text-[10px] font-display uppercase tracking-[0.2em] ${isMainEvent ? 'text-ufc-red' : 'text-white/30'}`}>
            {tipoLabel(luta.tipo)}
          </span>
          {luta.is_titulo && (
            <span className="text-[9px] text-ufc-gold font-bold uppercase bg-ufc-gold/10 border border-ufc-gold/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <Trophy className="w-2.5 h-2.5" /> Titulo
            </span>
          )}
        </div>
        <div className="text-[10px] text-white/25">{luta.categoria_peso} · {rounds} rounds</div>
        <div className="text-xs text-white/20">Luta {index + 1} de {total}</div>
      </div>

      {/* PHASE 1: Pick the winner */}
      {phase === 'pick' && (
        <>
          <h2 className="font-display text-lg sm:text-xl uppercase text-white/70 mb-6">
            Quem vence?
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {[luta.lutador1, luta.lutador2].map((lutador, i) => {
              const isJust = justPicked === lutador.id;
              const consensoPct = (i === 0 ? consenso1 : consenso2)?.percentual;
              return (
                <button
                  key={lutador.id}
                  onClick={() => handlePickFighter(lutador.id)}
                  className={[
                    'relative flex flex-col items-center gap-3 p-5 rounded-2xl transition-all',
                    'bg-white/5 border-2 border-white/10 hover:border-white/25',
                    isJust ? 'scale-[1.04] bg-ufc-red/15 border-ufc-red' : 'scale-100',
                  ].join(' ')}
                  style={{ transition: isJust ? 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1)' : 'all 0.2s' }}
                >
                  {isJust && <div className="absolute inset-0 bg-ufc-red/15 rounded-2xl animate-fade-in pointer-events-none" />}
                  <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 ${isJust ? 'border-ufc-red' : 'border-white/10'}`}>
                    {lutador.imagem_url ? (
                      <Image src={lutador.imagem_url} alt={lutador.nome} fill className="object-cover object-top" sizes="96px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5 text-lg font-display text-white/30">
                        {sobrenome(lutador.nome).slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="font-display text-base sm:text-lg uppercase text-white text-center leading-tight">
                    {sobrenome(lutador.nome)}
                  </span>
                  <span className="text-[11px] text-white/30">
                    {lutador.vitorias ?? 0}-{lutador.derrotas ?? 0}-{lutador.empates ?? 0}
                  </span>
                  {consensoPct && (
                    <span className="text-[10px] text-white/20">{Math.round(consensoPct)}% escolheram</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* PHASE 2: Method + Round (optional) */}
      {phase === 'detail' && pickedFighter && (
        <div className="w-full max-w-sm space-y-5 animate-fade-in">
          {/* Picked fighter recap */}
          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-ufc-red/10 border border-ufc-red/30">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-ufc-red shrink-0">
              {pickedFighter.imagem_url ? (
                <Image src={pickedFighter.imagem_url} alt={pickedFighter.nome} width={40} height={40} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-[10px] font-display text-white/30">
                  {sobrenome(pickedFighter.nome).slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <span className="text-sm font-semibold text-white">{sobrenome(pickedFighter.nome)}</span>
              <span className="text-sm text-white/40 ml-1.5">vence</span>
            </div>
            <button
              onClick={() => setPhase('pick')}
              className="ml-auto text-[10px] text-white/30 hover:text-white transition-colors"
            >
              mudar
            </button>
          </div>

          {/* Method */}
          <div>
            <div className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-2.5">
              Como? <span className="text-ufc-gold/50">(+50 pts)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {METODOS.map(m => (
                <button
                  key={m.key}
                  onClick={() => handleMetodoToggle(m.key)}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
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
              <div className="text-[10px] font-display uppercase tracking-widest text-white/30 mb-2.5">
                Em qual round? <span className="text-ufc-gold/50">(+50 pts)</span>
              </div>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: rounds }, (_, i) => i + 1).map(r => (
                  <button
                    key={r}
                    onClick={() => handleRoundToggle(r)}
                    className={`w-10 h-10 rounded-full text-sm font-display transition-all ${
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
            className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-sm font-display uppercase tracking-wide text-white hover:bg-white/15 transition-all flex items-center justify-center gap-2"
          >
            {index < total - 1 ? 'Proxima luta' : 'Ver resumo'}
            <ChevronRight className="w-4 h-4" />
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

// ═══════════════════════════════════════════════════════════
// STEP 2: Summary — read-only recap
// ═══════════════════════════════════════════════════════════

function Summary({
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
  const pontos = maxPontos(picks);
  const totalPicks = Object.values(picks).filter(p => p.vencedor_id).length;

  return (
    <div className="animate-fade-in space-y-6 w-full max-w-md mx-auto">
      <div className="text-center space-y-3">
        <Trophy className="w-12 h-12 text-ufc-gold mx-auto" />
        <h2 className="font-display text-2xl sm:text-3xl uppercase text-white">Suas Previsoes</h2>
        <p className="text-sm text-white/40">{eventoNome}</p>
      </div>

      <div className="rounded-xl bg-ufc-gold/5 border border-ufc-gold/20 p-4 text-center">
        <div className="text-xs text-ufc-gold/60 font-display uppercase tracking-widest mb-1">
          Pontos possiveis se acertar tudo
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
                  {sobrenome(luta.lutador1.nome)} vs {sobrenome(luta.lutador2.nome)} — <span className="text-ufc-red">sem pick</span>
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
                    <Image src={vencedor.imagem_url} alt={vencedor.nome} width={36} height={36} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-[9px] font-display text-white/30">
                      {sobrenome(vencedor.nome).slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white font-semibold truncate">
                    {sobrenome(vencedor.nome)} <span className="text-white/25 font-normal">vence {sobrenome(perdedor.nome)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {pick.metodo ? (
                      <span className="text-[10px] text-ufc-red/70 bg-ufc-red/10 px-1.5 py-0.5 rounded">{metodoLabel(pick.metodo)}</span>
                    ) : (
                      <span className="text-[10px] text-white/20">sem metodo</span>
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
          Editar previsoes
        </button>
        <Link
          href={`/arena/evento/${eventoId}/meus-picks`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-ufc-gold/10 border border-ufc-gold/20 text-ufc-gold font-display uppercase tracking-wide rounded-xl transition-all hover:bg-ufc-gold/20 text-sm"
        >
          <Trophy className="w-4 h-4" />
          Previsoes salvas — Boa sorte!
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STEP 3: EditScreen — full edit with different layout
// ═══════════════════════════════════════════════════════════

function EditScreen({
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
  return (
    <div className="w-full max-w-md mx-auto space-y-5 animate-fade-in pb-8">
      <div className="text-center space-y-1">
        <h2 className="font-display text-xl uppercase text-white">Editar Previsoes</h2>
        <p className="text-xs text-white/30">Toque para alterar vencedor, metodo ou round</p>
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
                          <Image src={lutador.imagem_url} alt={lutador.nome} width={32} height={32} className="w-full h-full object-cover object-top" />
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
        Salvar alteracoes
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE — 3 steps: Swipe → Summary → Edit
// ═══════════════════════════════════════════════════════════

type PageStep = 'swipe' | 'summary' | 'edit';

export default function EventoArenaPage({ params }: PageProps) {
  const { id } = use(params);
  const { isAuthenticated } = useArenaAuth();

  const [evento, setEvento] = useState<EventoComLutas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [picks, setPicks] = useState<Record<string, PickData>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<PageStep>('swipe');
  const [initialPicksLoaded, setInitialPicksLoaded] = useState(false);

  // Load evento
  useEffect(() => {
    async function fetchEvento() {
      try {
        const res = await fetch(`/api/eventos/${id}`);
        if (res.ok) setEvento(await res.json() as EventoComLutas);
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchEvento();
  }, [id]);

  // Load existing picks
  useEffect(() => {
    if (!isAuthenticated || !evento) return;
    async function fetchPicks() {
      try {
        const res = await fetch(`/api/arena/previsoes?evento_id=${id}`);
        if (!res.ok) return;
        const data: unknown = await res.json();
        const arr = Array.isArray(data)
          ? (data as Array<Record<string, unknown>>)
          : ((data as { previsoes?: Array<Record<string, unknown>> }).previsoes ?? []);
        const p: Record<string, PickData> = {};
        for (const item of arr) {
          const lutaId = typeof item.luta_id === 'string' ? item.luta_id : null;
          const vencedorId = typeof item.vencedor_previsto_id === 'string' ? item.vencedor_previsto_id : null;
          if (!lutaId || !vencedorId) continue;
          p[lutaId] = {
            vencedor_id: vencedorId,
            metodo: typeof item.metodo_previsto === 'string' ? item.metodo_previsto : undefined,
            round: typeof item.round_previsto === 'number' ? item.round_previsto : undefined,
          };
        }
        setPicks(p);
        if (evento && Object.keys(p).length === evento.lutas.length) {
          setStep('summary');
        }
      } catch { /* silent */ }
      setInitialPicksLoaded(true);
    }
    fetchPicks();
  }, [isAuthenticated, evento, id]);

  // Save pick to API
  const savePick = useCallback(async (lutaId: string, pick: PickData) => {
    try {
      await fetch('/api/arena/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previsoes: [{
            luta_id: lutaId,
            vencedor_previsto_id: pick.vencedor_id,
            pontos_confianca: 100,
            ...(pick.metodo ? { metodo_previsto: pick.metodo } : {}),
            ...(pick.round ? { round_previsto: pick.round } : {}),
          }],
        }),
      });
    } catch { /* silent */ }
  }, []);

  const sortedLutas = useMemo(() => evento ? sortLutas(evento.lutas) : [], [evento]);
  const totalLutas = sortedLutas.length;

  // Swipe handlers
  const handlePickVencedor = useCallback((vencedorId: string) => {
    if (!sortedLutas[currentIndex]) return;
    const lutaId = sortedLutas[currentIndex].id;
    setPicks(prev => ({
      ...prev,
      [lutaId]: { ...prev[lutaId], vencedor_id: vencedorId },
    }));
    void savePick(lutaId, { vencedor_id: vencedorId });
  }, [currentIndex, sortedLutas, savePick]);

  const handlePickDetail = useCallback((metodo?: string, round?: number) => {
    if (!sortedLutas[currentIndex]) return;
    const lutaId = sortedLutas[currentIndex].id;
    setPicks(prev => {
      const existing = prev[lutaId];
      if (!existing?.vencedor_id) return prev;
      const updated = { ...existing, metodo, round };
      void savePick(lutaId, updated);
      return { ...prev, [lutaId]: updated };
    });
  }, [currentIndex, sortedLutas, savePick]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalLutas - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('summary');
    }
  }, [currentIndex, totalLutas]);

  // Edit screen handler
  const handleEditPick = useCallback((lutaId: string, pick: PickData) => {
    setPicks(prev => ({ ...prev, [lutaId]: pick }));
    void savePick(lutaId, pick);
  }, [savePick]);

  // Loading
  if (isLoading || (isAuthenticated && !initialPicksLoaded)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Clock className="w-6 h-6 text-ufc-red animate-spin" />
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <p className="font-display text-2xl text-white/40 uppercase">Evento nao encontrado</p>
        <Link href="/arena" className="text-ufc-red hover:underline text-sm">← Voltar</Link>
      </div>
    );
  }

  const posterUrl = (evento as EventoComLutas & { poster_url?: string }).poster_url ?? evento.imagem_url;
  const picksCount = Object.values(picks).filter(p => p.vencedor_id).length;
  const progressPct = totalLutas > 0 ? (picksCount / totalLutas) * 100 : 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Poster background */}
      {posterUrl && (
        <>
          <Image src={posterUrl} alt="" fill className="object-cover object-top" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        </>
      )}
      {!posterUrl && <div className="absolute inset-0 bg-octagon-grid" />}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              if (step === 'edit') setStep('summary');
              else if (step === 'summary') { setStep('swipe'); setCurrentIndex(totalLutas - 1); }
              else if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
              else window.history.back();
            }}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 'edit' ? 'Resumo' : step === 'summary' ? 'Voltar' : currentIndex > 0 ? 'Anterior' : 'Arena'}
          </button>

          {step === 'swipe' && (
            <button
              onClick={() => setStep('summary')}
              className="text-xs text-white/30 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
            >
              {picksCount > 0 ? `Resumo (${picksCount}/${totalLutas})` : 'Pular'}
              <ChevronRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          )}
        </div>

        {/* Progress bar (swipe only) */}
        {step === 'swipe' && (
          <div className="px-4 mb-2">
            <div className="max-w-sm mx-auto h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-ufc-red transition-all duration-500"
                style={{ width: `${Math.max(progressPct, ((currentIndex + 1) / totalLutas) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className={`flex-1 flex items-center justify-center px-4 py-4 ${step === 'edit' ? 'items-start pt-2 overflow-y-auto' : ''}`}>
          {step === 'swipe' && sortedLutas[currentIndex] && (
            <SwipeCard
              luta={sortedLutas[currentIndex]}
              index={currentIndex}
              total={totalLutas}
              pick={picks[sortedLutas[currentIndex].id]}
              onPickVencedor={handlePickVencedor}
              onPickDetail={handlePickDetail}
              onNext={handleNext}
            />
          )}
          {step === 'summary' && (
            <Summary
              lutas={sortedLutas}
              picks={picks}
              eventoNome={evento.nome}
              eventoId={evento.id}
              onGoToEdit={() => setStep('edit')}
            />
          )}
          {step === 'edit' && (
            <EditScreen
              lutas={sortedLutas}
              picks={picks}
              onUpdatePick={handleEditPick}
              onDone={() => setStep('summary')}
            />
          )}
        </div>

        {/* Bottom dots (swipe only) */}
        {step === 'swipe' && totalLutas > 0 && (
          <div className="px-4 pb-6">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {sortedLutas.map((luta, i) => (
                <button
                  key={luta.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${
                    i === currentIndex
                      ? 'w-6 h-2 bg-ufc-red'
                      : picks[luta.id]?.vencedor_id
                        ? 'w-2 h-2 bg-ufc-red/40'
                        : 'w-2 h-2 bg-white/15'
                  }`}
                />
              ))}
            </div>
            {!picks[sortedLutas[currentIndex]?.id]?.vencedor_id && currentIndex < totalLutas - 1 && (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="block mx-auto text-[11px] text-white/20 hover:text-white/40 transition-colors"
              >
                Pular esta luta →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
