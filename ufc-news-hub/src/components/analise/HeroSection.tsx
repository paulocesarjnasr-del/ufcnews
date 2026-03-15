import type { HeroSectionData } from '@/types/analise';

export function HeroSection({ data }: { data: HeroSectionData }) {
  const f1 = data.fighter1;
  const f2 = data.fighter2;

  return (
    <section className="relative overflow-hidden border-b border-dark-border">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ufc-red/20 via-ufc-red/5 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-400/20 via-blue-400/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,10,10,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Event Info */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm uppercase tracking-widest text-dark-textMuted">
          <span className="rounded-full bg-ufc-red/20 px-3 py-1 text-xs font-bold text-ufc-red">{data.evento_nome}</span>
          <span>{data.evento_data}</span>
          <span className="hidden sm:inline">|</span>
          <span>{data.evento_local}</span>
        </div>

        <div className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-dark-textMuted">
          <span className="rounded border border-dark-border px-2 py-0.5">{data.categoria_peso}</span>
          <span className="rounded border border-dark-border px-2 py-0.5">{data.num_rounds} Rounds</span>
          {data.titulo_em_jogo && (
            <span className="rounded border border-ufc-gold/50 bg-ufc-gold/10 px-2 py-0.5 text-ufc-gold font-bold">
              {data.titulo_em_jogo}
            </span>
          )}
        </div>

        {/* Fighters */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
          {/* Fighter 1 */}
          <div className="flex items-center justify-end gap-3 md:gap-6">
            {f1.imagem_fullbody_url && (
              <div className="relative h-[260px] w-[160px] flex-shrink-0 md:h-[400px] md:w-[240px] lg:h-[460px] lg:w-[280px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f1.imagem_fullbody_url}
                  alt={f1.nome_completo}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
            )}
            <div className="hidden md:block text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-ufc-red md:text-sm">
                {f1.nome_completo} {f1.apelido && `"${f1.apelido}"`}
              </p>
              <p className="font-display text-4xl uppercase text-dark-text lg:text-6xl xl:text-7xl">{f1.sobrenome}</p>
              <p className="mt-1 text-xs text-dark-textMuted md:text-sm">{f1.record} | {f1.ranking} | {f1.info_extra}</p>
            </div>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dark-border bg-dark-card font-display text-2xl text-ufc-gold shadow-[0_0_40px_rgba(201,176,55,0.3)] md:h-20 md:w-20 md:text-3xl">
              VS
            </div>
          </div>

          {/* Fighter 2 */}
          <div className="flex items-center justify-start gap-3 md:gap-6">
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 md:text-sm">
                {f2.nome_completo} {f2.apelido && `"${f2.apelido}"`}
              </p>
              <p className="font-display text-4xl uppercase text-dark-text lg:text-6xl xl:text-7xl">{f2.sobrenome}</p>
              <p className="mt-1 text-xs text-dark-textMuted md:text-sm">{f2.record} | {f2.ranking} | {f2.info_extra}</p>
            </div>
            {f2.imagem_fullbody_url && (
              <div className="relative h-[260px] w-[160px] flex-shrink-0 md:h-[400px] md:w-[240px] lg:h-[460px] lg:w-[280px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f2.imagem_fullbody_url}
                  alt={f2.nome_completo}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
            )}
          </div>

          {/* Mobile names */}
          <div className="col-span-3 mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:hidden">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-ufc-red">{f1.sobrenome}</p>
              <p className="text-[10px] text-dark-textMuted">{f1.record} | {f1.ranking}</p>
            </div>
            <div />
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{f2.sobrenome}</p>
              <p className="text-[10px] text-dark-textMuted">{f2.record} | {f2.ranking}</p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-10 text-center">
          <p className="font-display text-xl uppercase tracking-wider text-ufc-gold md:text-2xl">
            &quot;{data.tagline}&quot;
          </p>
          <p className="mt-2 text-sm text-dark-textMuted">{data.tagline_sub}</p>
        </div>
      </div>
    </section>
  );
}
