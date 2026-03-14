'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Swords, Check, ChevronLeft, ChevronRight, Radio, Trophy } from 'lucide-react';
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
  vencedor_id?: string | null;
  metodo?: string | null;
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
  main_event: 0, co_main: 1, card_principal: 2, preliminar: 3, early_prelim: 4,
};

export function TabEvento() {
  const { isAuthenticated } = useArenaAuth();
  const [evento, setEvento] = useState<EventoComLutas | null>(null);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [savingLuta, setSavingLuta] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/eventos/proximo?include_live=true');
        if (!res.ok) { setIsLoading(false); return; }
        const data = await res.json() as EventoComLutas;
        setEvento(data);

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

  const sortedLutas = evento
    ? [...evento.lutas].sort((a, b) => (tipoOrder[a.tipo] ?? 5) - (tipoOrder[b.tipo] ?? 5))
    : [];

  const goToNext = useCallback(() => {
    if (currentIndex < sortedLutas.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setAllDone(true);
    }
  }, [currentIndex, sortedLutas.length]);

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    setAllDone(false);
  };

  const handlePick = async (lutaId: string, vencedorId: string) => {
    if (!isAuthenticated || savingLuta) return;

    setPicks(prev => ({ ...prev, [lutaId]: vencedorId }));
    setSavingLuta(lutaId);

    try {
      const res = await fetch('/api/arena/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previsoes: [{ luta_id: lutaId, vencedor_previsto_id: vencedorId, pontos_confianca: 100 }],
        }),
      });

      if (!res.ok) {
        setPicks(prev => { const next = { ...prev }; delete next[lutaId]; return next; });
      } else {
        // Auto-advance after 800ms
        setTimeout(goToNext, 800);
      }
    } catch {
      setPicks(prev => { const next = { ...prev }; delete next[lutaId]; return next; });
    }
    setSavingLuta(null);
  };

  // Loading
  if (isLoading) {
    return <div className="h-64 rounded-xl bg-dark-card animate-pulse" />;
  }

  // No event
  if (!evento || sortedLutas.length === 0) {
    return (
      <div className="neu-card p-6 text-center">
        <Swords className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Nenhum evento agendado.</p>
      </div>
    );
  }

  const eventDate = new Date(evento.data_evento);
  const isLive = evento.status === 'ao_vivo';
  const diffMs = eventDate.getTime() - Date.now();
  const diffDays = Math.max(0, Math.floor(diffMs / 86400000));
  const diffHours = Math.max(0, Math.floor((diffMs % 86400000) / 3600000));
  const picksCount = Object.keys(picks).length;
  const totalLutas = sortedLutas.length;

  // All done screen
  if (allDone) {
    return (
      <div className="space-y-4">
        <div className="neu-card p-8 text-center space-y-4">
          <Trophy className="w-16 h-16 text-ufc-gold mx-auto" />
          <h3 className="font-display text-2xl uppercase text-white">Previsoes Completas!</h3>
          <p className="text-dark-textMuted">
            Voce fez {picksCount} de {totalLutas} previsoes para {evento.nome}.
          </p>
          <button
            onClick={() => { setAllDone(false); setCurrentIndex(0); }}
            className="px-6 py-2 rounded-xl bg-dark-card border border-dark-border text-sm text-dark-textMuted hover:text-white transition-colors"
          >
            Revisar previsoes
          </button>
        </div>
      </div>
    );
  }

  const currentLuta = sortedLutas[currentIndex];
  const currentPick = picks[currentLuta.id];
  const isSaving = savingLuta === currentLuta.id;

  return (
    <div className="space-y-3">
      {/* Event header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg uppercase text-white leading-tight">{evento.nome}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-dark-textMuted">
            <Calendar className="w-3 h-3" />
            <span>{eventDate.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
        {isLive ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ufc-red border border-ufc-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-xs font-bold text-white uppercase">Ao Vivo</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ufc-red/10 border border-ufc-red/20">
            <Clock className="w-3 h-3 text-ufc-red" />
            <span className="text-xs font-semibold text-ufc-red">
              {diffDays > 0 ? `${diffDays}d ${diffHours}h` : `${diffHours}h`}
            </span>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-dark-text">
          Luta {currentIndex + 1} de {totalLutas}
        </span>
        <span className="text-xs text-dark-textMuted">{picksCount}/{totalLutas} picks</span>
      </div>
      <div className="h-1.5 rounded-full bg-dark-bg overflow-hidden">
        <div
          className="h-full rounded-full bg-ufc-red transition-all duration-300"
          style={{ width: `${(picksCount / totalLutas) * 100}%` }}
        />
      </div>

      {/* Current fight card */}
      <div className="relative">
        {/* Left arrow */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-dark-card border border-dark-border text-dark-textMuted hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {/* Right arrow */}
        {currentIndex < sortedLutas.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-dark-card border border-dark-border text-dark-textMuted hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      <div className="neu-card p-4 space-y-4">
        {/* Fight type + category */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              currentLuta.tipo === 'main_event' ? 'bg-ufc-red/20 text-ufc-red'
                : currentLuta.tipo === 'co_main' ? 'bg-ufc-gold/20 text-ufc-gold'
                : 'bg-dark-bg text-dark-textMuted'
            }`}>
              {currentLuta.tipo === 'main_event' ? 'Main Event'
                : currentLuta.tipo === 'co_main' ? 'Co-Main'
                : currentLuta.tipo === 'card_principal' ? 'Main Card'
                : currentLuta.tipo === 'preliminar' ? 'Prelim' : 'Early Prelim'}
            </span>
            {isLive && currentLuta.status === 'em_andamento' && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-ufc-red">
                <Radio className="w-3 h-3 animate-pulse" /> LIVE
              </span>
            )}
            {currentLuta.status === 'finalizada' && (
              <span className="text-[10px] font-bold text-green-400 px-1.5 py-0.5 rounded bg-green-400/10">
                RESULT
              </span>
            )}
          </div>
          <span className="text-[10px] text-dark-textMuted">{currentLuta.categoria_peso}</span>
        </div>

        {/* Fighters - two buttons side by side */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Fighter 1 */}
          <button
            onClick={() => handlePick(currentLuta.id, currentLuta.lutador1.id)}
            disabled={!isAuthenticated || isSaving || currentLuta.status !== 'agendada'}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              currentPick === currentLuta.lutador1.id
                ? 'bg-ufc-red/10 border-2 border-ufc-red'
                : 'bg-dark-bg/50 border-2 border-transparent hover:border-dark-border'
            } ${(!isAuthenticated || currentLuta.status !== 'agendada') ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {currentPick === currentLuta.lutador1.id && (
              <Check className="w-4 h-4 text-ufc-red absolute top-1 right-1" />
            )}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-dark-card border-2 border-dark-border">
              {currentLuta.lutador1.imagem_url ? (
                <Image src={currentLuta.lutador1.imagem_url} alt={currentLuta.lutador1.nome} width={56} height={56} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-dark-textMuted">
                  {currentLuta.lutador1.nome.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-white text-center leading-tight">
              {currentLuta.lutador1.nome.split(' ').pop()}
            </span>
            <span className="text-[10px] text-dark-textMuted">
              {currentLuta.lutador1.vitorias}-{currentLuta.lutador1.derrotas}-{currentLuta.lutador1.empates}
            </span>
          </button>

          {/* VS */}
          <span className="font-display text-xl text-dark-textMuted">VS</span>

          {/* Fighter 2 */}
          <button
            onClick={() => handlePick(currentLuta.id, currentLuta.lutador2.id)}
            disabled={!isAuthenticated || isSaving || currentLuta.status !== 'agendada'}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              currentPick === currentLuta.lutador2.id
                ? 'bg-ufc-red/10 border-2 border-ufc-red'
                : 'bg-dark-bg/50 border-2 border-transparent hover:border-dark-border'
            } ${(!isAuthenticated || currentLuta.status !== 'agendada') ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {currentPick === currentLuta.lutador2.id && (
              <Check className="w-4 h-4 text-ufc-red absolute top-1 right-1" />
            )}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-dark-card border-2 border-dark-border">
              {currentLuta.lutador2.imagem_url ? (
                <Image src={currentLuta.lutador2.imagem_url} alt={currentLuta.lutador2.nome} width={56} height={56} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-dark-textMuted">
                  {currentLuta.lutador2.nome.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-white text-center leading-tight">
              {currentLuta.lutador2.nome.split(' ').pop()}
            </span>
            <span className="text-[10px] text-dark-textMuted">
              {currentLuta.lutador2.vitorias}-{currentLuta.lutador2.derrotas}-{currentLuta.lutador2.empates}
            </span>
          </button>
        </div>

        {/* Saving indicator */}
        {isSaving && (
          <div className="text-center text-xs text-dark-textMuted animate-pulse">Salvando...</div>
        )}

        {/* Result display for finished fights */}
        {currentLuta.status === 'finalizada' && currentLuta.metodo && (
          <div className="text-center text-sm text-dark-textMuted border-t border-dark-border/30 pt-3">
            <span className="text-green-400 font-medium">
              {currentLuta.vencedor_id === currentLuta.lutador1.id ? currentLuta.lutador1.nome : currentLuta.lutador2.nome}
            </span>
            {' '}venceu por {currentLuta.metodo}
          </div>
        )}
      </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {sortedLutas.map((luta, i) => (
          <button
            key={luta.id}
            onClick={() => { setCurrentIndex(i); setAllDone(false); }}
            className={`rounded-full transition-all ${
              i === currentIndex ? 'w-5 h-2 bg-ufc-red'
                : picks[luta.id] ? 'w-2 h-2 bg-ufc-red/50'
                : 'w-2 h-2 bg-dark-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
