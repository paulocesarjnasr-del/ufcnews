'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Note: Image from next/image is still used for OctagonTexture poster.
// Fighter photos use <img> with referrerPolicy="no-referrer" to bypass UFC.com hotlink protection.

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export interface Lutador {
  id: string;
  nome: string;
  apelido: string | null;
  imagem_url: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
}

export interface Luta {
  id: string;
  tipo: string;
  categoria_peso: string;
  status: string;
  is_titulo: boolean;
  lutador1: Lutador;
  lutador2: Lutador;
}

export interface Evento {
  id: string;
  nome: string;
  data_evento: string;
  local: string;
  status: string;
  poster_url: string | null;
  lutas: Luta[];
}

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

export const tipoOrder: Record<string, number> = {
  main_event: 0, co_main: 1, card_principal: 2, preliminar: 3, early_prelim: 4,
};

export function sortLutas(lutas: Luta[]): Luta[] {
  return [...lutas].sort((a, b) => (tipoOrder[a.tipo] ?? 5) - (tipoOrder[b.tipo] ?? 5));
}

export function sobrenome(nome: string): string {
  return nome.split(' ').pop() ?? nome;
}

// ═══════════════════════════════════════════════════════════
// OctagonTexture — Tailwind bg class + ambient glow
// ═══════════════════════════════════════════════════════════

export function OctagonTexture({ children, className = '', posterUrl }: { children: React.ReactNode; className?: string; posterUrl?: string | null }) {
  return (
    <div className={`relative overflow-hidden ${posterUrl ? '' : 'bg-octagon-grid'} ${className}`}>
      {/* Event poster as background */}
      {posterUrl && (
        <>
          <Image
            src={posterUrl}
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          {/* Dark overlay: enough to read text on any poster */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-black/85" />
          {/* Grid texture on top of poster for consistency */}
          <div className="absolute inset-0 bg-octagon-grid opacity-40" />
        </>
      )}
      {/* Red ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(210,10,10,0.06) 0%, transparent 70%)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Countdown — pauses when tab hidden, caches timestamp
// ═══════════════════════════════════════════════════════════

export function Countdown({ targetDate }: { targetDate: string }) {
  const targetMs = useRef(new Date(targetDate).getTime());
  const [diff, setDiff] = useState(() => Math.max(0, targetMs.current - Date.now()));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setDiff(Math.max(0, targetMs.current - Date.now()));
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    targetMs.current = new Date(targetDate).getTime();
    setDiff(Math.max(0, targetMs.current - Date.now()));
  }, [targetDate]);

  useEffect(() => {
    start();

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        setDiff(Math.max(0, targetMs.current - Date.now()));
        start();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [start, stop]);

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const isUrgent = days === 0;

  const units = [
    { value: days, label: 'DIAS' },
    { value: hours, label: 'HRS' },
    { value: mins, label: 'MIN' },
    { value: secs, label: 'SEG' },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-4">
          <div className="text-center min-w-[36px] sm:min-w-[44px]">
            <div className={`font-display text-3xl sm:text-4xl leading-none tabular-nums ${isUrgent ? 'text-ufc-red' : 'text-white'}`}>
              {String(u.value).padStart(2, '0')}
            </div>
            <div className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.15em] mt-1">{u.label}</div>
          </div>
          {i < units.length - 1 && (
            <span className={`font-display text-xl sm:text-2xl ${isUrgent ? 'text-ufc-red/40' : 'text-white/15'} -mt-3`}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EventoNome — split on ":" for visual hierarchy
// ═══════════════════════════════════════════════════════════

export function EventoNome({ nome, size = 'lg' }: { nome: string; size?: 'lg' | 'sm' }) {
  const parts = nome.split(':');
  const headlineSize = size === 'lg' ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-5xl';

  // Try to split the fight name on " VS " to highlight it
  function renderFightName(fightName: string) {
    const vsParts = fightName.split(/\s+(VS)\s+/i);
    if (vsParts.length === 3) {
      return (
        <>
          {vsParts[0]} <span className="text-ufc-red">VS</span> {vsParts[2]}
        </>
      );
    }
    return fightName;
  }

  if (parts.length >= 2) {
    const prefix = parts[0].trim();
    const headline = parts.slice(1).join(':').trim();
    return (
      <div className="text-center">
        <div className="text-sm sm:text-lg text-ufc-red font-display uppercase tracking-[0.3em]">
          {prefix}
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-ufc-red/50" />
          <div className="text-ufc-red/60 text-xs">✦</div>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-ufc-red/50" />
        </div>
        <h1 className={`font-display ${headlineSize} uppercase text-white leading-[0.95]`} style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          {renderFightName(headline)}
        </h1>
      </div>
    );
  }
  return (
    <h1 className={`font-display ${headlineSize} uppercase text-white leading-[0.95] text-center`} style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
      {renderFightName(nome)}
    </h1>
  );
}

// ═══════════════════════════════════════════════════════════
// FightPreview — read-only card for landing
// ═══════════════════════════════════════════════════════════

export function FightPreview({ luta, showDetails = false }: { luta: Luta; showDetails?: boolean }) {
  if (showDetails) {
    return (
      <div className="flex flex-col py-3 px-2 -mx-2 rounded-lg border-b border-white/5 last:border-0 hover:bg-white/5 hover:border-ufc-red/30 transition-colors cursor-pointer gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-xs font-bold text-dark-textMuted overflow-hidden shrink-0">
              {luta.lutador1.imagem_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={luta.lutador1.imagem_url} alt={luta.lutador1.nome} width={40} height={40} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                sobrenome(luta.lutador1.nome).slice(0, 2).toUpperCase()
              )}
            </div>
            <span className="text-base font-semibold text-white truncate">{sobrenome(luta.lutador1.nome)}</span>
          </div>
          <span className="text-[10px] text-dark-textMuted font-display mx-2">VS</span>
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
            <span className="text-base font-semibold text-white truncate text-right">{sobrenome(luta.lutador2.nome)}</span>
            <div className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-xs font-bold text-dark-textMuted overflow-hidden shrink-0">
              {luta.lutador2.imagem_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={luta.lutador2.imagem_url} alt={luta.lutador2.nome} width={40} height={40} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                sobrenome(luta.lutador2.nome).slice(0, 2).toUpperCase()
              )}
            </div>
          </div>
        </div>
        <div className="text-center text-[11px] text-dark-textMuted">{luta.categoria_peso}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3 px-2 -mx-2 rounded-lg border-b border-white/5 last:border-0 hover:bg-white/5 hover:border-ufc-red/30 transition-colors cursor-pointer">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-[10px] font-bold text-dark-textMuted overflow-hidden shrink-0">
          {luta.lutador1.imagem_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={luta.lutador1.imagem_url} alt={luta.lutador1.nome} width={32} height={32} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            sobrenome(luta.lutador1.nome).slice(0, 2).toUpperCase()
          )}
        </div>
        <span className="text-sm font-semibold text-white truncate">{sobrenome(luta.lutador1.nome)}</span>
      </div>
      <span className="text-[10px] text-dark-textMuted font-display mx-2">VS</span>
      <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
        <span className="text-sm font-semibold text-white truncate text-right">{sobrenome(luta.lutador2.nome)}</span>
        <div className="w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-[10px] font-bold text-dark-textMuted overflow-hidden shrink-0">
          {luta.lutador2.imagem_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={luta.lutador2.imagem_url} alt={luta.lutador2.nome} width={32} height={32} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            sobrenome(luta.lutador2.nome).slice(0, 2).toUpperCase()
          )}
        </div>
      </div>
    </div>
  );
}
