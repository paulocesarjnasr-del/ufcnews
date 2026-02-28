'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import FighterImage from '@/components/ui/FighterImage';
import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

interface LutaAPI {
  id: string;
  lutador1_id: string;
  lutador2_id: string;
  categoria_peso: string;
  ordem: number;
  tipo: string;
  lutador1: {
    id: string;
    nome: string;
    apelido: string | null;
    imagem_url: string | null;
    vitorias: number;
    derrotas: number;
    empates: number;
  };
  lutador2: {
    id: string;
    nome: string;
    apelido: string | null;
    imagem_url: string | null;
    vitorias: number;
    derrotas: number;
    empates: number;
  };
}

interface EventoProximoAPI {
  id: string;
  nome: string;
  data_evento: string;
  local_evento: string | null;
  cidade: string | null;
  pais: string | null;
  status: string;
  lutas: LutaAPI[];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Fetch failed');
  return res.json();
});

function getMainEvent(lutas: LutaAPI[]): LutaAPI | null {
  if (!lutas || lutas.length === 0) return null;
  const mainEvent = lutas.find(l => l.tipo === 'main_event');
  if (mainEvent) return mainEvent;
  return lutas.reduce((max, l) => (l.ordem > max.ordem ? l : max), lutas[0]);
}

function calcTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function formatRecord(v: number, d: number, e: number): string {
  return `${v}-${d}-${e}`;
}

// ═══════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════

function HeroSkeleton() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d15 70%)' }}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
          {/* Fighter 1 skeleton */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-[120px] w-[120px] md:h-[200px] md:w-[200px] rounded-full bg-dark-border/30 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)' }} />
            <div className="h-6 w-32 rounded bg-dark-border/30 animate-pulse" />
            <div className="h-4 w-20 rounded bg-dark-border/20 animate-pulse" />
          </div>
          {/* VS skeleton */}
          <div className="h-12 w-16 rounded bg-dark-border/20 animate-pulse" />
          {/* Fighter 2 skeleton */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-[120px] w-[120px] md:h-[200px] md:w-[200px] rounded-full bg-dark-border/30 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)' }} />
            <div className="h-6 w-32 rounded bg-dark-border/30 animate-pulse" />
            <div className="h-4 w-20 rounded bg-dark-border/20 animate-pulse" />
          </div>
        </div>
        {/* Countdown skeleton */}
        <div className="mt-8 flex justify-center gap-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-16 w-14 rounded-xl bg-dark-border/20 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

function FighterPhoto({
  nome,
  apelido,
  imagemUrl,
  vitorias,
  derrotas,
  empates,
  side,
  mounted,
}: {
  nome: string;
  apelido: string | null;
  imagemUrl: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
  side: 'left' | 'right';
  mounted: boolean;
}) {
  const animClass = side === 'left' ? 'hero-slide-left' : 'hero-slide-right';

  return (
    <div
      className={cn(
        'flex flex-col items-center',
        mounted ? animClass : 'opacity-0'
      )}
    >
      {/* Photo circle */}
      <div
        className="relative h-[120px] w-[120px] md:h-[200px] md:w-[200px] rounded-full overflow-hidden border-2 border-ufc-gold transition-transform duration-300 hover:scale-105"
        style={{ boxShadow: '0 0 30px rgba(210, 10, 10, 0.3)' }}
      >
        {imagemUrl ? (
          <FighterImage
            src={imagemUrl}
            alt={nome}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 120px, 200px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e]">
            <svg className="h-16 w-16 text-dark-textMuted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="mt-4 text-center font-display text-2xl md:text-[28px] uppercase leading-tight text-white">
        {nome}
      </h3>

      {/* Alias */}
      {apelido && (
        <p className="mt-1 text-center text-sm italic text-ufc-gold">
          &quot;{apelido}&quot;
        </p>
      )}

      {/* Record */}
      <p className="mt-1 text-center text-sm tabular-nums text-dark-textMuted">
        {formatRecord(vitorias, derrotas, empates)}
      </p>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calcTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="text-center font-display text-xl text-ufc-red glow-red">
        EVENTO EM ANDAMENTO!
      </div>
    );
  }

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: 'DIAS' },
    { value: timeLeft.hours, label: 'HORAS' },
    { value: timeLeft.minutes, label: 'MIN' },
    { value: timeLeft.seconds, label: 'SEG' },
  ];

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 md:gap-3',
        'flex-wrap',
        'hero-fade-in-delayed'
      )}
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 md:gap-3">
          <div className="neu-inset flex flex-col items-center px-3 py-2 md:px-4 md:py-3">
            <span className="font-display text-2xl md:text-[32px] tabular-nums text-white leading-none">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[10px] tracking-wider text-dark-textMuted">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="hero-blink font-display text-xl text-ufc-red md:text-2xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════

export default function HeroCinematico() {
  const { data, error, isLoading } = useSWR<EventoProximoAPI>(
    '/api/eventos/proximo',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (isLoading) return <HeroSkeleton />;

  if (error || !data) {
    return (
      <div
        className="relative flex w-full items-center justify-center py-16"
        style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d15 70%)' }}
      >
        <p className="text-lg text-dark-textMuted">Nenhum evento agendado</p>
      </div>
    );
  }

  const mainEvent = getMainEvent(data.lutas);

  if (!mainEvent) {
    return (
      <div
        className="relative flex w-full items-center justify-center py-16"
        style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d15 70%)' }}
      >
        <p className="text-lg text-dark-textMuted">Card ainda nao definido</p>
      </div>
    );
  }

  const { lutador1, lutador2 } = mainEvent;
  const locationParts = [data.cidade, data.pais].filter(Boolean);
  const locationStr = locationParts.join(', ');

  return (
    <>
      {/* Global keyframes for hero animations (needs to reach child components) */}
      <style>{`
        @keyframes heroSlideLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroSlideRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroScaleIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPulseVs {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes heroBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-slide-left {
          animation: heroSlideLeft 0.5s ease-out forwards;
        }
        .hero-slide-right {
          animation: heroSlideRight 0.5s ease-out forwards;
        }
        .hero-scale-in {
          animation: heroScaleIn 0.4s ease-out 0.2s forwards;
          opacity: 0;
        }
        .hero-fade-in-delayed {
          animation: heroFadeIn 0.5s ease-out 0.4s forwards;
          opacity: 0;
        }
        .hero-fade-in-cta {
          animation: heroFadeIn 0.5s ease-out 0.6s forwards;
          opacity: 0;
        }
        .hero-pulse-vs {
          animation: heroPulseVs 3s ease-in-out infinite;
        }
        .hero-blink {
          animation: heroBlink 1s step-end infinite;
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d15 70%)',
        }}
      >
        {/* Octagon SVG pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0.05 }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="octagon-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <polygon
                  points="20,0 40,0 60,20 60,40 40,60 20,60 0,40 0,20"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#octagon-pattern)" />
          </svg>
        </div>

        {/* Bottom gradient border */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #D20A0A 50%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
          {/* Face-off row: vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12 lg:gap-20">
            {/* Lutador 1 */}
            <FighterPhoto
              nome={lutador1.nome}
              apelido={lutador1.apelido}
              imagemUrl={lutador1.imagem_url}
              vitorias={lutador1.vitorias}
              derrotas={lutador1.derrotas}
              empates={lutador1.empates}
              side="left"
              mounted={mounted}
            />

            {/* VS */}
            <div
              className={cn(
                'flex flex-col items-center',
                mounted ? 'hero-scale-in' : 'opacity-0'
              )}
            >
              <span
                className="hero-pulse-vs font-display text-[40px] md:text-[64px] leading-none text-ufc-red select-none"
                style={{ textShadow: '0 0 20px rgba(210, 10, 10, 0.5)' }}
              >
                VS
              </span>
            </div>

            {/* Lutador 2 */}
            <FighterPhoto
              nome={lutador2.nome}
              apelido={lutador2.apelido}
              imagemUrl={lutador2.imagem_url}
              vitorias={lutador2.vitorias}
              derrotas={lutador2.derrotas}
              empates={lutador2.empates}
              side="right"
              mounted={mounted}
            />
          </div>

          {/* Event title + location */}
          <div
            className={cn(
              'mt-8 text-center',
              mounted ? 'hero-fade-in-delayed' : 'opacity-0'
            )}
          >
            <h2 className="font-display text-xl md:text-2xl uppercase tracking-wide text-ufc-gold">
              {data.nome}
            </h2>
            {(data.local_evento || locationStr) && (
              <p className="mt-1 text-sm text-dark-textMuted">
                {data.local_evento && <span>{data.local_evento}</span>}
                {data.local_evento && locationStr && <span> &mdash; </span>}
                {locationStr && <span>{locationStr}</span>}
              </p>
            )}
          </div>

          {/* Countdown */}
          <div className="mt-8">
            <CountdownTimer targetDate={data.data_evento} />
          </div>

          {/* CTA Button */}
          <div
            className={cn(
              'mt-8 flex justify-center',
              mounted ? 'hero-fade-in-cta' : 'opacity-0'
            )}
          >
            <Link
              href={`/calendario/evento/${data.id}`}
              className="neu-button border border-ufc-red/60 px-6 py-3 font-display text-lg uppercase tracking-wider text-white transition-all duration-300 hover:text-ufc-gold hover:shadow-[0_0_20px_rgba(210,10,10,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ufc-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
            >
              Ver Card Completo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
