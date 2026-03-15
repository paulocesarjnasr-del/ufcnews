'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap, Trophy, Target, Flame, ChevronRight,
  Newspaper, BarChart3, Users, Clock,
} from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

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
  status: string;
  is_titulo: boolean;
  lutador1: Lutador;
  lutador2: Lutador;
}

interface Evento {
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

const tipoOrder: Record<string, number> = {
  main_event: 0, co_main: 1, card_principal: 2, preliminar: 3, early_prelim: 4,
};

function sortLutas(lutas: Luta[]): Luta[] {
  return [...lutas].sort((a, b) => (tipoOrder[a.tipo] ?? 5) - (tipoOrder[b.tipo] ?? 5));
}

function sobrenome(nome: string): string {
  return nome.split(' ').pop() ?? nome;
}

// ═══════════════════════════════════════════════════════════
// OctagonTexture — Tailwind bg class + ambient glow
// ═══════════════════════════════════════════════════════════

function OctagonTexture({ children, className = '', posterUrl }: { children: React.ReactNode; className?: string; posterUrl?: string | null }) {
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

function Countdown({ targetDate }: { targetDate: string }) {
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

function EventoNome({ nome, size = 'lg' }: { nome: string; size?: 'lg' | 'sm' }) {
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
// Ticker — scrolling fight insights
// ═══════════════════════════════════════════════════════════

function generateTickerMessages(lutas: Luta[]): string[] {
  const msgs: string[] = [];
  const sorted = sortLutas(lutas);

  for (const luta of sorted.slice(0, 5)) {
    const f1 = luta.lutador1;
    const f2 = luta.lutador2;
    const s1 = sobrenome(f1.nome);
    const s2 = sobrenome(f2.nome);
    const r1 = `${f1.vitorias}-${f1.derrotas}-${f1.empates}`;
    const r2 = `${f2.vitorias}-${f2.derrotas}-${f2.empates}`;

    // Invicto
    if (f1.derrotas === 0 && f1.vitorias >= 5) {
      msgs.push(`${s1} esta INVICTO com ${f1.vitorias} vitorias consecutivas`);
    }
    if (f2.derrotas === 0 && f2.vitorias >= 5) {
      msgs.push(`${s2} esta INVICTO com ${f2.vitorias} vitorias consecutivas`);
    }

    // Grande record
    if (f1.vitorias >= 15) {
      msgs.push(`${s1} (${r1}) — um dos recordes mais impressionantes da divisao`);
    }
    if (f2.vitorias >= 15) {
      msgs.push(`${s2} (${r2}) — veterano com ${f2.vitorias} vitorias no cartel`);
    }

    // Titulo
    if (luta.is_titulo) {
      msgs.push(`TITULO EM JOGO: ${s1} vs ${s2} — ${luta.categoria_peso}`);
    }

    // Main event
    if (luta.tipo === 'main_event') {
      msgs.push(`MAIN EVENT: ${s1} vs ${s2} — quem leva?`);
    }

    // Matchup narratives
    if (f1.derrotas === 0 && f2.derrotas === 0) {
      msgs.push(`INVICTO vs INVICTO: ${s1} (${r1}) encara ${s2} (${r2})`);
    }

    // Win differential
    const diff = Math.abs(f1.vitorias - f2.vitorias);
    if (diff >= 5) {
      const more = f1.vitorias > f2.vitorias ? s1 : s2;
      msgs.push(`${more} tem ${diff} vitorias a mais que o oponente`);
    }
  }

  // Generic event-level
  msgs.push(`${lutas.length} lutas no card — faca seus palpites antes do deadline`);

  // Deduplicate and limit
  const unique = [...new Set(msgs)];
  return unique.slice(0, 10);
}

function FightTicker({ lutas }: { lutas: Luta[] }) {
  const messages = generateTickerMessages(lutas);
  if (messages.length === 0) return null;

  // Formula: velocidade de leitura humana ~13-15 chars/seg (leitura casual em movimento)
  // Cada mensagem precisa de: (chars / 13) segundos para ler + 1.5s de buffer entre mensagens
  // Total = soma do tempo de cada mensagem, aplicado ao conjunto duplicado (translateX -50%)
  const totalChars = messages.reduce((sum, msg) => sum + msg.length, 0);
  const avgCharsPerMsg = totalChars / messages.length;
  const secsPerMsg = (avgCharsPerMsg / 13) + 1.5;
  const duration = Math.round(secsPerMsg * messages.length);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `tickerScroll ${duration}s linear infinite`,
          width: 'max-content',
        }}
      >
        {/* Render messages twice for seamless loop */}
        {[0, 1].map(copy => (
          <div key={copy} className="flex shrink-0">
            {messages.map((msg, i) => (
              <span
                key={`${copy}-${i}`}
                className="inline-flex items-center px-5 py-3 text-sm text-white/80"
              >
                {msg}
                <span className="ml-5 text-ufc-red/30">|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FightPreview — read-only card for landing
// ═══════════════════════════════════════════════════════════

function FightPreview({ luta }: { luta: Luta }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-[10px] font-bold text-dark-textMuted overflow-hidden shrink-0">
          {luta.lutador1.imagem_url ? (
            <Image src={luta.lutador1.imagem_url} alt={luta.lutador1.nome} width={32} height={32} className="w-full h-full object-cover" />
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
            <Image src={luta.lutador2.imagem_url} alt={luta.lutador2.nome} width={32} height={32} className="w-full h-full object-cover" />
          ) : (
            sobrenome(luta.lutador2.nome).slice(0, 2).toUpperCase()
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LANDING (not logged in)
// ═══════════════════════════════════════════════════════════

function HomeLanding({ evento }: { evento: Evento | null }) {
  const topLutas = evento ? sortLutas(evento.lutas).slice(0, 4) : [];

  return (
    <OctagonTexture posterUrl={evento?.poster_url} className={evento?.poster_url ? 'min-h-[85vh] sm:min-h-screen' : ''}>
      <div className={`container mx-auto px-4 ${evento?.poster_url ? 'flex items-end pb-12 sm:pb-20 min-h-[85vh] sm:min-h-screen' : 'py-12 sm:py-20'}`}>
        <div className="max-w-lg mx-auto text-center space-y-8 w-full">

          {/* Event as protagonist */}
          {evento ? (
            <div className="space-y-5">
              <EventoNome nome={evento.nome} />
              <div className="text-xs text-dark-textMuted tracking-wide">
                {evento.local}
              </div>
              <div className="flex justify-center">
                <Countdown targetDate={evento.data_evento} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h1 className="font-display text-4xl uppercase text-white">
                Arena <span className="text-ufc-red">UFC</span>
              </h1>
              <p className="text-dark-textMuted">
                Nenhum evento agendado no momento.
              </p>
            </div>
          )}

          {/* Single CTA */}
          <div className="space-y-3">
            <Link
              href="/arena/registro"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-ufc-red hover:bg-ufc-redLight text-white font-display text-lg uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-ufc-red/20 hover:shadow-ufc-red/40"
            >
              <Zap className="w-5 h-5" />
              Fazer Meus Palpites
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="text-sm text-dark-textMuted">
              Ja tem conta?{' '}
              <Link href="/arena/login" className="text-ufc-red hover:underline">
                Entrar na Arena
              </Link>
            </div>
          </div>

          {/* How it works — 3 steps */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { num: '01', title: 'Preveja', desc: 'Quem vai vencer cada luta', color: 'text-ufc-red' },
              { num: '02', title: 'Pontue', desc: 'Acertos viram pontos e XP', color: 'text-ufc-gold' },
              { num: '03', title: 'Domine', desc: 'Suba no ranking e ganhe titulos', color: 'text-green-400' },
            ].map(step => (
              <div key={step.num} className="text-center space-y-1.5">
                <div className={`font-display text-2xl ${step.color}`}>{step.num}</div>
                <div className="font-display text-sm uppercase text-white">{step.title}</div>
                <div className="text-[11px] text-dark-textMuted leading-tight">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Fight preview */}
          {topLutas.length > 0 && (
            <div className="neu-card p-4 text-left">
              <div className="text-[10px] font-display uppercase tracking-widest text-dark-textMuted mb-3">
                Card Principal
              </div>
              {topLutas.map(luta => (
                <FightPreview key={luta.id} luta={luta} />
              ))}
              {evento && evento.lutas.length > 4 && (
                <div className="text-center mt-3">
                  <span className="text-xs text-dark-textMuted">
                    + {evento.lutas.length - 4} lutas no card
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </OctagonTexture>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME LOGADO
// ═══════════════════════════════════════════════════════════

function HomeLogado({ evento }: { evento: Evento | null }) {
  const { usuario } = useArenaAuth();
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [picksLoading, setPicksLoading] = useState(true);

  useEffect(() => {
    if (!evento) { setPicksLoading(false); return; }

    async function fetchPicks() {
      try {
        const res = await fetch(`/api/arena/previsoes?evento_id=${evento!.id}`);
        if (res.ok) {
          const data: unknown = await res.json();
          const arr = Array.isArray(data)
            ? (data as Array<Record<string, string>>)
            : ((data as { previsoes?: Array<Record<string, string>> }).previsoes ?? []);
          const map: Record<string, string> = {};
          for (const p of arr) {
            const lutaId = p.luta_id;
            const vencedorId = p.vencedor_previsto_id ?? p.lutador_escolhido_id;
            if (lutaId && vencedorId) map[lutaId] = vencedorId;
          }
          setPicks(map);
        }
      } catch { /* silent */ }
      setPicksLoading(false);
    }
    fetchPicks();
  }, [evento]);

  if (!usuario) return null;

  const accuracy = (usuario.total_previsoes ?? 0) > 0
    ? Math.round(((usuario.previsoes_corretas ?? 0) / (usuario.total_previsoes ?? 1)) * 100)
    : 0;

  const sortedLutas = evento ? sortLutas(evento.lutas) : [];
  const picksCount = Object.keys(picks).length;
  const totalLutas = sortedLutas.length;
  const remaining = totalLutas - picksCount;
  const allDone = totalLutas > 0 && remaining === 0;
  const progressPercent = totalLutas > 0 ? (picksCount / totalLutas) * 100 : 0;

  const pendingLutas = sortedLutas.filter(l => !picks[l.id]);
  const doneLutas = sortedLutas.filter(l => picks[l.id]);

  return (
    <OctagonTexture posterUrl={evento?.poster_url} className="min-h-screen">
      <div className="container mx-auto px-4 pt-6 pb-8">
        <div className="max-w-lg mx-auto space-y-5">

          {/* Event header — stacked: name on top, countdown below, readable backdrop */}
          {evento ? (
            <div className="rounded-xl bg-black/60 backdrop-blur-sm px-5 py-4 space-y-3">
              <EventoNome nome={evento.nome} size="sm" />
              {evento.local && (
                <div className="text-xs text-white/50">{evento.local}</div>
              )}
              {evento.status === 'ao_vivo' ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ufc-red w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="text-xs font-bold text-white uppercase">Ao Vivo</span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Countdown targetDate={evento.data_evento} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center pt-8">
              <h2 className="font-display text-2xl text-white uppercase">Nenhum evento agendado</h2>
              <p className="text-sm text-white/50 mt-2">Fique ligado para o proximo card!</p>
            </div>
          )}

          {/* Fight ticker — scrolling insights */}
          {evento && sortedLutas.length > 0 && (
            <FightTicker lutas={sortedLutas} />
          )}

          {/* Two paths: Solo vs Liga */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={evento ? `/arena/evento/${evento.id}` : '/arena'}
              className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 hover:border-ufc-red/30 transition-all group text-center"
            >
              <Zap className="w-6 h-6 text-ufc-red mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-display text-sm uppercase text-white">Solo</div>
              <div className="text-[10px] text-white/30 mt-1">Compete contra todos os usuarios</div>
            </Link>
            <Link
              href="/arena/ligas/criar"
              className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 hover:border-ufc-gold/30 transition-all group text-center"
            >
              <Users className="w-6 h-6 text-ufc-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-display text-sm uppercase text-white">Com Amigos</div>
              <div className="text-[10px] text-white/30 mt-1">Crie uma liga e desafie amigos</div>
            </Link>
          </div>

          {/* Picks progress card — glass, with inline stats */}
          {evento && !picksLoading && (
            <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-5 space-y-4">
              {/* Inline user stats */}
              <div className="flex items-center justify-around py-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-ufc-gold" />
                  <span className="text-sm font-bold text-ufc-gold">{(usuario.pontos_totais ?? 0).toLocaleString()}</span>
                  <span className="text-[10px] text-white/40">pts</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm font-bold text-green-400">{accuracy}%</span>
                  <span className="text-[10px] text-white/40">acc</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-sm font-bold text-orange-400">{usuario.streak_atual ?? 0}</span>
                  <span className="text-[10px] text-white/40">streak</span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">Seus Palpites</span>
                  <span className="text-xs text-white/50">{picksCount}/{totalLutas}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-ufc-gold' : 'bg-ufc-red'}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* CTA */}
              {!allDone && evento.status !== 'finalizado' && (
                <Link
                  href={`/arena/evento/${evento.id}`}
                  className="group flex items-center justify-center gap-2 w-full py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide rounded-xl transition-all text-sm animate-pulse-red"
                >
                  <Zap className="w-4 h-4" />
                  Completar {remaining} pick{remaining !== 1 ? 's' : ''} restante{remaining !== 1 ? 's' : ''}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {allDone && (
                <div className="flex items-center justify-center gap-2 py-3 bg-ufc-gold/10 border border-ufc-gold/20 rounded-xl">
                  <Trophy className="w-4 h-4 text-ufc-gold" />
                  <span className="text-sm font-semibold text-ufc-gold">Card completo!</span>
                </div>
              )}

              {/* Pending fights */}
              {pendingLutas.length > 0 && (
                <div>
                  <div className="text-[10px] font-display uppercase tracking-widest text-white/40 mb-2">
                    Lutas pendentes ({pendingLutas.length})
                  </div>
                  <div className="space-y-1">
                    {pendingLutas.slice(0, 4).map((luta, i) => (
                      <Link
                        key={luta.id}
                        href={`/arena/evento/${evento.id}#luta-${i}`}
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-sm text-white">
                          {sobrenome(luta.lutador1.nome)} <span className="text-white/40">vs</span> {sobrenome(luta.lutador2.nome)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-ufc-red transition-colors" />
                      </Link>
                    ))}
                    {pendingLutas.length > 4 && (
                      <Link
                        href={`/arena/evento/${evento.id}`}
                        className="block text-center py-1.5 text-xs text-ufc-red hover:underline"
                      >
                        + {pendingLutas.length - 4} lutas restantes
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Done fights (dimmed) */}
              {doneLutas.length > 0 && (
                <div>
                  <div className="text-[10px] font-display uppercase tracking-widest text-white/40 mb-2">
                    Picks feitos ({doneLutas.length})
                  </div>
                  <div className="space-y-1 opacity-50">
                    {doneLutas.slice(0, 3).map(luta => {
                      const pickedId = picks[luta.id];
                      const pickedName = pickedId === luta.lutador1.id
                        ? sobrenome(luta.lutador1.nome)
                        : sobrenome(luta.lutador2.nome);
                      return (
                        <div key={luta.id} className="flex items-center justify-between py-2 px-3 rounded-lg">
                          <span className="text-sm text-white/50">
                            {sobrenome(luta.lutador1.nome)} vs {sobrenome(luta.lutador2.nome)}
                          </span>
                          <span className="text-xs text-green-400 font-medium">✓ {pickedName}</span>
                        </div>
                      );
                    })}
                    {doneLutas.length > 3 && (
                      <div className="text-center py-1">
                        <span className="text-xs text-white/30">+ {doneLutas.length - 3} picks</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {picksLoading && evento && (
            <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-5">
              <div className="h-32 rounded-lg bg-white/5 animate-pulse" />
            </div>
          )}

          {/* Content bridge — glass cards */}
          {evento && (
            <div className="grid grid-cols-3 gap-3">
              <Link
                href={`/calendario/evento/${evento.id}`}
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-3 text-center hover:border-ufc-red/30 transition-colors group"
              >
                <Newspaper className="w-5 h-5 text-white/40 group-hover:text-ufc-red mx-auto mb-1.5 transition-colors" />
                <div className="text-[10px] font-display uppercase text-white/40 group-hover:text-white transition-colors">Evento</div>
              </Link>
              <Link
                href="/analises"
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-3 text-center hover:border-ufc-red/30 transition-colors group"
              >
                <BarChart3 className="w-5 h-5 text-white/40 group-hover:text-ufc-red mx-auto mb-1.5 transition-colors" />
                <div className="text-[10px] font-display uppercase text-white/40 group-hover:text-white transition-colors">Analises</div>
              </Link>
              <Link
                href="/arena/ligas"
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-3 text-center hover:border-ufc-red/30 transition-colors group"
              >
                <Users className="w-5 h-5 text-white/40 group-hover:text-ufc-red mx-auto mb-1.5 transition-colors" />
                <div className="text-[10px] font-display uppercase text-white/40 group-hover:text-white transition-colors">Ligas</div>
              </Link>
            </div>
          )}

          {/* Fallback bridge when no event */}
          {!evento && (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/analises"
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 text-center hover:border-ufc-red/30 transition-colors group"
              >
                <BarChart3 className="w-5 h-5 text-white/40 group-hover:text-ufc-red mx-auto mb-1.5 transition-colors" />
                <div className="text-xs font-display uppercase text-white/40 group-hover:text-white transition-colors">Analises</div>
              </Link>
              <Link
                href="/arena/ligas"
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 text-center hover:border-ufc-red/30 transition-colors group"
              >
                <Users className="w-5 h-5 text-white/40 group-hover:text-ufc-red mx-auto mb-1.5 transition-colors" />
                <div className="text-xs font-display uppercase text-white/40 group-hover:text-white transition-colors">Ligas</div>
              </Link>
            </div>
          )}

        </div>
      </div>
    </OctagonTexture>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function ArenaPage() {
  const { isAuthenticated, isLoading } = useArenaAuth();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [eventoLoading, setEventoLoading] = useState(true);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const res = await fetch('/api/eventos/proximo?include_live=true');
        if (res.ok) {
          const data: unknown = await res.json();
          setEvento(data as Evento);
        }
      } catch { /* silent */ }
      setEventoLoading(false);
    }
    fetchEvento();
  }, []);

  if (isLoading || eventoLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Clock className="w-6 h-6 text-ufc-red animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <HomeLanding evento={evento} />;
  }

  return <HomeLogado evento={evento} />;
}
