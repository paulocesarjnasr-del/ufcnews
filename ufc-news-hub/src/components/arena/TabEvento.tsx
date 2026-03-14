'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Swords, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface Lutador {
  id: string;
  nome: string;
  apelido: string | null;
  imagem_url: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
}

interface Luta {
  id: string;
  tipo: string;
  categoria_peso: string;
  rounds: number;
  is_titulo: boolean;
  status: string;
  lutador1: Lutador;
  lutador2: Lutador;
}

interface EventoComLutas {
  id: string;
  nome: string;
  data_evento: string;
  local: string;
  status: string;
  lutas: Luta[];
}

const tipoOrder: Record<string, number> = {
  main_event: 0,
  co_main: 1,
  card_principal: 2,
  preliminar: 3,
  early_prelim: 4,
};

export function TabEvento() {
  const { isAuthenticated } = useArenaAuth();
  const [evento, setEvento] = useState<EventoComLutas | null>(null);
  const [picks, setPicks] = useState<Record<string, string>>({}); // luta_id -> vencedor_id
  const [savingLuta, setSavingLuta] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/eventos/proximo');
        if (!res.ok) { setIsLoading(false); return; }
        const data = await res.json() as EventoComLutas;
        setEvento(data);

        // Fetch existing picks
        if (isAuthenticated) {
          const picksRes = await fetch(`/api/arena/previsoes?evento_id=${data.id}`);
          if (picksRes.ok) {
            const picksData = await picksRes.json() as unknown;
            const picksArray: Array<Record<string, string>> = Array.isArray(picksData)
              ? (picksData as Array<Record<string, string>>)
              : ((picksData as { previsoes?: Array<Record<string, string>> }).previsoes ?? []);
            const picksMap: Record<string, string> = {};
            for (const p of picksArray) {
              const lutaId = p.luta_id;
              const vencedorId = p.vencedor_previsto_id ?? p.lutador_escolhido_id;
              if (lutaId && vencedorId) picksMap[lutaId] = vencedorId;
            }
            setPicks(picksMap);
          }
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchData();
  }, [isAuthenticated]);

  // Track scroll position for dots
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const width = container.offsetWidth;
      if (width === 0) return;
      const index = Math.round(container.scrollLeft / width);
      setActiveIndex(index);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [evento]);

  const scrollToFight = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: 'smooth',
    });
  };

  const handlePick = async (lutaId: string, vencedorId: string) => {
    if (!isAuthenticated || savingLuta) return;

    // Optimistic update
    setPicks(prev => ({ ...prev, [lutaId]: vencedorId }));
    setSavingLuta(lutaId);

    try {
      const res = await fetch('/api/arena/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previsoes: [{
            luta_id: lutaId,
            vencedor_previsto_id: vencedorId,
            pontos_confianca: 100,
          }],
        }),
      });

      if (!res.ok) {
        // Revert on error
        setPicks(prev => {
          const next = { ...prev };
          delete next[lutaId];
          return next;
        });
      }
    } catch {
      setPicks(prev => {
        const next = { ...prev };
        delete next[lutaId];
        return next;
      });
    }
    setSavingLuta(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 rounded-xl bg-dark-card" />
      </div>
    );
  }

  if (!evento || evento.lutas.length === 0) {
    return (
      <div className="neu-card p-6 text-center">
        <Swords className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Nenhum evento agendado.</p>
        <p className="text-sm text-dark-textMuted mt-1">Fique ligado para o proximo card!</p>
      </div>
    );
  }

  const eventDate = new Date(evento.data_evento);
  const diffMs = eventDate.getTime() - Date.now();
  const diffDays = Math.max(0, Math.floor(diffMs / 86400000));
  const diffHours = Math.max(0, Math.floor((diffMs % 86400000) / 3600000));
  const picksCount = Object.keys(picks).length;
  const totalLutas = evento.lutas.length;

  const sortedLutas = [...evento.lutas].sort(
    (a, b) => (tipoOrder[a.tipo] ?? 5) - (tipoOrder[b.tipo] ?? 5)
  );

  return (
    <div className="space-y-3">
      {/* Event header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg uppercase text-white leading-tight">{evento.nome}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-dark-textMuted">
            <Calendar className="w-3 h-3" />
            <span>
              {eventDate.toLocaleDateString('pt-BR', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ufc-red/10 border border-ufc-red/20">
          <Clock className="w-3 h-3 text-ufc-red" />
          <span className="text-xs font-semibold text-ufc-red">
            {diffDays > 0 ? `${diffDays}d ${diffHours}h` : `${diffHours}h`}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-dark-bg overflow-hidden">
          <div
            className="h-full rounded-full bg-ufc-red transition-all duration-300"
            style={{ width: `${totalLutas > 0 ? (picksCount / totalLutas) * 100 : 0}%` }}
          />
        </div>
        <span className="text-xs text-dark-textMuted font-medium">{picksCount}/{totalLutas}</span>
      </div>

      {/* Fight carousel */}
      <div className="relative">
        {/* Arrow buttons (desktop only) */}
        {activeIndex > 0 && (
          <button
            onClick={() => scrollToFight(activeIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-dark-card/90 border border-dark-border items-center justify-center text-dark-textMuted hover:text-white transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {activeIndex < sortedLutas.length - 1 && (
          <button
            onClick={() => scrollToFight(activeIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-dark-card/90 border border-dark-border items-center justify-center text-dark-textMuted hover:text-white transition-colors hidden md:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {sortedLutas.map((luta) => {
            const picked = picks[luta.id];
            const isSaving = savingLuta === luta.id;
            const f1 = luta.lutador1;
            const f2 = luta.lutador2;

            return (
              <div key={luta.id} className="min-w-[85%] sm:min-w-[70%] flex-shrink-0 snap-center">
                <div className="neu-card p-3 space-y-2">
                  {/* Fight type badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        luta.tipo === 'main_event'
                          ? 'bg-ufc-red/20 text-ufc-red'
                          : luta.tipo === 'co_main'
                            ? 'bg-ufc-gold/20 text-ufc-gold'
                            : 'bg-dark-bg text-dark-textMuted'
                      }`}
                    >
                      {luta.tipo === 'main_event'
                        ? 'Main Event'
                        : luta.tipo === 'co_main'
                          ? 'Co-Main'
                          : luta.tipo === 'card_principal'
                            ? 'Main Card'
                            : luta.tipo === 'preliminar'
                              ? 'Prelim'
                              : 'Early Prelim'}
                    </span>
                    <span className="text-[10px] text-dark-textMuted">{luta.categoria_peso}</span>
                  </div>

                  {/* Fighters */}
                  <div className="grid grid-cols-2 gap-3">
                    {([f1, f2] as Lutador[]).map((fighter, fi) => {
                      const isSelected = picked === fighter.id;
                      return (
                        <button
                          key={fighter.id}
                          onClick={() => handlePick(luta.id, fighter.id)}
                          disabled={!isAuthenticated || isSaving || luta.status !== 'agendada'}
                          className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-ufc-red/10 border-2 border-ufc-red ring-1 ring-ufc-red/30'
                              : 'bg-dark-bg/50 border-2 border-transparent hover:border-dark-border'
                          } ${
                            !isAuthenticated || luta.status !== 'agendada'
                              ? 'opacity-60 cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5">
                              <Check className="w-4 h-4 text-ufc-red" />
                            </div>
                          )}

                          {/* Fighter image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-card border-2 border-dark-border">
                            {fighter.imagem_url ? (
                              <Image
                                src={fighter.imagem_url}
                                alt={fighter.nome}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-dark-textMuted">
                                {fighter.nome.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </div>
                            )}
                          </div>

                          {/* Name */}
                          <span className="text-sm font-semibold text-white text-center leading-tight">
                            {fighter.nome.split(' ').pop()}
                          </span>

                          {/* Record */}
                          <span className="text-[10px] text-dark-textMuted">
                            {fighter.vitorias}-{fighter.derrotas}-{fighter.empates}
                          </span>

                          {/* VS label — only on first fighter card */}
                          {fi === 0 && (
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[10px] font-bold text-dark-textMuted">
                              VS
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Saving indicator */}
                  {isSaving && (
                    <div className="text-center text-xs text-dark-textMuted animate-pulse">
                      Salvando...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {sortedLutas.map((luta, i) => {
          const hasPick = !!picks[luta.id];
          return (
            <button
              key={luta.id}
              onClick={() => scrollToFight(i)}
              className={`rounded-full transition-all ${
                i === activeIndex
                  ? 'w-6 h-2 bg-ufc-red'
                  : hasPick
                    ? 'w-2 h-2 bg-ufc-red/50'
                    : 'w-2 h-2 bg-dark-border'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
