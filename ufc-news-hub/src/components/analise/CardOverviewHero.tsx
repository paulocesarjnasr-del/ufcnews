'use client';

import { Calendar, MapPin, Swords } from 'lucide-react';

interface FightSummary {
  fighter1Name: string;
  fighter2Name: string;
  tipo: string;
}

interface Props {
  eventoNome: string;
  eventoData: string | null;
  eventoLocal: string | null;
  totalFights: number;
  fights: FightSummary[];
}

function FightPill({ fight }: { fight: FightSummary }) {
  const isMain = fight.tipo === 'main_event';
  const isCoMain = fight.tipo === 'co_main';

  const pillColor = isMain
    ? 'border-ufc-red/40 bg-ufc-red/10'
    : isCoMain
    ? 'border-ufc-gold/30 bg-ufc-gold/5'
    : 'border-dark-border bg-dark-card/50';

  const f1Last = fight.fighter1Name.split(' ').pop() || fight.fighter1Name;
  const f2Last = fight.fighter2Name.split(' ').pop() || fight.fighter2Name;

  return (
    <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${pillColor}`}>
      <span className={`font-bold ${isMain ? 'text-ufc-red' : 'text-dark-text'}`}>{f1Last}</span>
      <span className="text-dark-textMuted">vs</span>
      <span className={`font-bold ${isMain ? 'text-blue-400' : 'text-dark-text'}`}>{f2Last}</span>
    </div>
  );
}

export function CardOverviewHero({ eventoNome, eventoData, eventoLocal, totalFights, fights }: Props) {
  const formattedDate = eventoData
    ? new Date(eventoData).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <section className="relative w-full overflow-hidden rounded-xl border border-dark-border bg-gradient-to-br from-dark-card via-dark-bg to-dark-card">
      {/* Background accent glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-ufc-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-10 h-32 w-64 rounded-full bg-blue-400/5 blur-3xl" />

      <div className="relative z-10 px-6 py-10 text-center md:px-12 md:py-14">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ufc-red/30 bg-ufc-red/10 px-4 py-1.5">
          <Swords className="h-4 w-4 text-ufc-red" />
          <span className="text-xs font-bold uppercase tracking-widest text-ufc-red">
            Preview Completo do Card
          </span>
        </div>

        {/* Event Name */}
        <h1 className="font-display text-3xl uppercase leading-tight text-dark-text md:text-5xl">
          {eventoNome}
        </h1>

        {/* Date & Location */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-dark-textMuted">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
          )}
          {eventoLocal && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {eventoLocal}
            </span>
          )}
        </div>

        {/* Total fights badge */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-dark-border bg-dark-bg px-4 py-1.5">
          <span className="font-display text-lg font-bold text-ufc-gold">{totalFights}</span>
          <span className="text-xs uppercase tracking-wider text-dark-textMuted">
            {totalFights === 1 ? 'Luta Analisada' : 'Lutas Analisadas'}
          </span>
        </div>

        {/* Fight matchup pills */}
        {fights.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {fights.map((fight, idx) => (
              <FightPill key={idx} fight={fight} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
