/* eslint-disable @next/next/no-img-element */
import type { HeroSectionData, HeroFighterData } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

// ═══════════════════════════════════════════════════════
// Hero Section — Photos pinned to edges, names centered
// ═══════════════════════════════════════════════════════

function FighterInfo({ fighter, side }: { fighter: HeroFighterData; side: 'left' | 'right' }) {
  const nameGradient = side === 'left'
    ? 'from-ufc-red via-red-400 to-red-300'
    : 'from-blue-400 via-blue-300 to-cyan-300';
  const accentColor = side === 'left' ? 'text-ufc-red' : 'text-blue-400';
  const accentBg = side === 'left' ? 'bg-ufc-red/10 border-ufc-red/20' : 'bg-blue-400/10 border-blue-400/20';
  const align = side === 'left' ? 'text-center md:text-right md:items-end items-center' : 'text-center md:text-left md:items-start items-center';

  return (
    <div className={`flex flex-col justify-center ${align} space-y-1.5`}>
      <h2 className={`font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.85] bg-gradient-to-r ${nameGradient} bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
        {fighter.sobrenome}
      </h2>
      <p className="font-display text-xs md:text-sm text-white/70 tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
        {fighter.record}
      </p>
      {fighter.ranking && (
        <span className={`inline-block rounded-full ${accentBg} border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accentColor}`}>
          {fighter.ranking}
        </span>
      )}
      {fighter.info_extra && (
        <p className="text-[9px] md:text-[10px] text-white/25 tracking-wide max-w-[200px]">{fighter.info_extra}</p>
      )}
    </div>
  );
}

export function HeroSection({ data, lang = 'pt' }: { data: HeroSectionData; lang?: Lang }) {
  const f1Img = data.fighter1.imagem_fullbody_url;
  const f2Img = data.fighter2.imagem_fullbody_url;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0c0c0c]">
      {/* Aurora gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-ufc-red/15 blur-[120px]" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-ufc-gold/5 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ufc-red/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      </div>

      {/* Fighter 1 photo — absolute, pinned bottom-left, sized to not overpower text */}
      {f1Img && (
        <img
          src={f1Img}
          alt={data.fighter1.sobrenome}
          className="absolute bottom-0 left-0 h-[50%] md:h-[60%] w-auto object-contain object-bottom pointer-events-none select-none opacity-90"
        />
      )}

      {/* Fighter 2 photo — absolute, pinned bottom-right */}
      {f2Img && (
        <img
          src={f2Img}
          alt={data.fighter2.sobrenome}
          className="absolute bottom-0 right-0 h-[50%] md:h-[60%] w-auto object-contain object-bottom pointer-events-none select-none opacity-90"
        />
      )}

      {/* Content layer on top of photos */}
      <div className="relative z-10">
        {/* Event Info */}
        <div className="text-center pt-6 pb-2 md:pt-8 md:pb-3 px-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] px-5 py-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-ufc-red animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
              {data.evento_nome}
            </span>
          </div>
          <p className="text-[11px] text-white/30">
            {data.evento_data} &middot; {data.evento_local}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[10px] text-white/40">
              {data.categoria_peso}
            </span>
            <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[10px] text-white/40">
              {data.num_rounds} Rounds
            </span>
            {data.titulo_em_jogo && (
              <span className="rounded-full bg-ufc-gold/10 border border-ufc-gold/20 px-3 py-1 text-[10px] font-bold uppercase text-ufc-gold">
                {data.titulo_em_jogo}
              </span>
            )}
          </div>
        </div>

        {/* Names + VS — centered, with dark backdrop for legibility over photos */}
        <div className="flex items-center justify-center gap-4 md:gap-8 pt-12 pb-4 md:pt-20 md:pb-6 lg:pt-24 lg:pb-8 px-4">
          <FighterInfo fighter={data.fighter1} side="left" />

          {/* VS circle */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-ufc-red/20 blur-xl scale-150" />
              <div className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.15]">
                <span className="font-display text-lg md:text-xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                  VS
                </span>
              </div>
            </div>
          </div>

          <FighterInfo fighter={data.fighter2} side="right" />
        </div>

        {/* Tagline — with gradient fade so it reads clearly over fighter photos */}
        <div className="relative pb-5 md:pb-7 text-center px-5">
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent pointer-events-none" />
          <div className="relative inline-block rounded-2xl bg-black/50 backdrop-blur-md border border-white/[0.06] px-6 py-3 md:px-8 md:py-4">
            <p className="font-display text-base md:text-xl lg:text-2xl uppercase tracking-wide bg-gradient-to-r from-ufc-gold via-amber-300 to-ufc-gold bg-clip-text text-transparent">
              {data.tagline}
            </p>
            <p className="mt-1.5 text-xs text-white/40 max-w-lg mx-auto leading-relaxed">
              {data.tagline_sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
