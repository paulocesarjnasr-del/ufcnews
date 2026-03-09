import Image from 'next/image';

import type { HeroSectionData, HeroFighterData } from '@/types/analise';

// ═══════════════════════════════════════════════════════
// Hero Section — Full-bleed banner for analysis page
// ═══════════════════════════════════════════════════════

interface HeroSectionProps {
  data: HeroSectionData;
}

function getInitials(nome: string): string {
  const parts = nome.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function FighterImage({ fighter }: { fighter: HeroFighterData }) {
  if (fighter.imagem_fullbody_url) {
    return (
      <div className="relative h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 mx-auto">
        <Image
          src={fighter.imagem_fullbody_url}
          alt={fighter.nome_completo}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-dark-border bg-dark-bg">
      <span className="font-display text-3xl text-dark-textMuted">
        {getInitials(fighter.nome_completo)}
      </span>
    </div>
  );
}

function FighterInfo({
  fighter,
  side,
}: {
  fighter: HeroFighterData;
  side: 'left' | 'right';
}) {
  const nameColor = side === 'left' ? 'text-ufc-red' : 'text-blue-400';
  const textAlign = side === 'left' ? 'md:text-left' : 'md:text-right';

  return (
    <div className={`flex flex-col items-center ${side === 'left' ? 'md:items-start' : 'md:items-end'} gap-3`}>
      <FighterImage fighter={fighter} />

      <div className={`text-center ${textAlign} space-y-1`}>
        {fighter.apelido && (
          <p className="text-xs uppercase tracking-wider text-dark-textMuted">
            &ldquo;{fighter.apelido}&rdquo;
          </p>
        )}

        <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl uppercase ${nameColor}`}>
          {fighter.sobrenome}
        </h2>

        <p className="text-sm text-dark-textMuted">{fighter.record}</p>

        {fighter.ranking && (
          <span className="inline-block rounded-full bg-dark-bg px-3 py-0.5 text-xs font-medium text-dark-text border border-dark-border">
            {fighter.ranking}
          </span>
        )}

        {fighter.info_extra && (
          <p className="text-xs text-dark-textMuted">{fighter.info_extra}</p>
        )}
      </div>
    </div>
  );
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-dark-border bg-gradient-to-b from-dark-card via-dark-bg to-dark-bg p-6 md:p-10 lg:p-16"
    >
      {/* Radial red glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,10,10,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* ── Mobile: Event info first ── */}
        <div className="mb-6 text-center md:hidden">
          <EventInfo data={data} />
        </div>

        {/* ── Desktop 3-column layout ── */}
        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
          {/* Fighter 1 */}
          <FighterInfo fighter={data.fighter1} side="left" />

          {/* Center: VS + event info (desktop only) */}
          <div className="col-span-2 flex items-center justify-center md:col-span-1 md:flex-col md:gap-6">
            <span className="font-display text-3xl text-dark-border/50 md:order-2">
              VS
            </span>
            <div className="hidden md:block md:order-1">
              <EventInfo data={data} />
            </div>
          </div>

          {/* Fighter 2 */}
          <FighterInfo fighter={data.fighter2} side="right" />
        </div>

        {/* ── Taglines ── */}
        <div className="mt-8 space-y-2 text-center">
          <p className="font-display text-xl md:text-2xl uppercase text-ufc-gold">
            {data.tagline}
          </p>
          <p className="text-sm text-dark-textMuted">
            {data.tagline_sub}
          </p>
        </div>
      </div>
    </section>
  );
}

function EventInfo({ data }: { data: HeroSectionData }) {
  return (
    <div className="space-y-2">
      <p className="font-display text-sm uppercase tracking-widest text-ufc-red">
        {data.evento_nome}
      </p>
      <p className="text-xs text-dark-textMuted">
        {data.evento_data} &middot; {data.evento_local}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="inline-block rounded-full bg-dark-bg px-3 py-0.5 text-xs text-dark-text border border-dark-border">
          {data.categoria_peso}
        </span>
        <span className="inline-block rounded-full bg-dark-bg px-3 py-0.5 text-xs text-dark-text border border-dark-border">
          {data.num_rounds} Rounds
        </span>

        {data.titulo_em_jogo && (
          <span className="inline-block rounded-full bg-ufc-gold/20 px-3 py-0.5 text-xs font-medium text-ufc-gold border border-ufc-gold/30">
            {data.titulo_em_jogo}
          </span>
        )}
      </div>
    </div>
  );
}
