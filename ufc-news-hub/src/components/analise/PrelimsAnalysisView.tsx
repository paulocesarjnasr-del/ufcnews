'use client';

import Image from 'next/image';
import type { PrelimsAnalise, RecentFight } from '@/types/analise';
import { getLabels, type Lang } from '@/lib/i18n-labels';
import { SectionHeader } from './SectionHeader';
import { ComparacaoEstatisticaSection } from './ComparacaoEstatisticaSection';
import { PerfilHabilidadesSection } from './PerfilHabilidadesSection';
import { DistribuicaoVitoriasSection } from './DistribuicaoVitoriasSection';
import { PrevisaoFinalSection } from './PrevisaoFinalSection';

/* ── Simple Hero ── */
function SimpleHero({ data }: { data: PrelimsAnalise['prelims_analysis']['hero'] }) {
  return (
    <section className="relative overflow-hidden border-b border-dark-border bg-dark-card">
      <div className="absolute inset-0 bg-gradient-to-b from-ufc-red/5 via-transparent to-transparent" />
      <div className="container relative mx-auto px-4 py-10 md:py-14">
        {/* Event info */}
        <div className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-dark-textMuted">
            {data.evento_nome} &bull; {data.categoria_peso} &bull; {data.num_rounds} Rounds
            {data.is_titulo && <span className="ml-2 text-ufc-gold font-bold">TITULO EM JOGO</span>}
          </p>
          {data.evento_data && (
            <p className="mt-1 text-[10px] text-dark-textMuted">{data.evento_data}</p>
          )}
        </div>

        {/* Fighter names + photos */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <div className="text-center">
            {data.fighter1.imagem_url && (
              <div className="relative w-32 h-44 md:w-40 md:h-52 mx-auto mb-3">
                <Image src={data.fighter1.imagem_url} alt={data.fighter1.nome} fill className="object-contain object-top" sizes="(max-width: 768px) 128px, 160px" unoptimized />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-dark-card to-transparent" />
              </div>
            )}
            <h1 className="font-display text-3xl uppercase text-ufc-red md:text-5xl">
              {data.fighter1.nome}
            </h1>
            <p className="mt-1 text-sm text-dark-textMuted">{data.fighter1.record}</p>
            {data.fighter1.ranking && (
              <span className="mt-1 inline-block rounded-full border border-ufc-gold/30 bg-ufc-gold/10 px-3 py-0.5 text-[10px] font-bold text-ufc-gold">
                {data.fighter1.ranking}
              </span>
            )}
          </div>

          <span className="font-display text-2xl text-dark-textMuted md:text-3xl">VS</span>

          <div className="text-center">
            {data.fighter2.imagem_url && (
              <div className="relative w-32 h-44 md:w-40 md:h-52 mx-auto mb-3">
                <Image src={data.fighter2.imagem_url} alt={data.fighter2.nome} fill className="object-contain object-top" sizes="(max-width: 768px) 128px, 160px" unoptimized />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-dark-card to-transparent" />
              </div>
            )}
            <h1 className="font-display text-3xl uppercase text-blue-400 md:text-5xl">
              {data.fighter2.nome}
            </h1>
            <p className="mt-1 text-sm text-dark-textMuted">{data.fighter2.record}</p>
            {data.fighter2.ranking && (
              <span className="mt-1 inline-block rounded-full border border-ufc-gold/30 bg-ufc-gold/10 px-3 py-0.5 text-[10px] font-bold text-ufc-gold">
                {data.fighter2.ranking}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Fight Row (clean, editorial style) ── */
function FightRow({ fight }: { fight: RecentFight }) {
  const isWin = fight.result === 'W';
  const isLoss = fight.result === 'L';
  return (
    <div className="py-3 border-b border-white/[0.04] last:border-b-0">
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-baseline gap-2.5">
          <span className={`font-display text-sm font-bold ${isWin ? 'text-emerald-400' : isLoss ? 'text-red-400' : 'text-white/40'}`}>{fight.result}</span>
          <span className="text-sm text-white/80">{fight.opponent}</span>
          {fight.opponent_rank && fight.opponent_rank !== 'N/R' && (
            <span className="text-[10px] font-semibold text-white/50 bg-white/[0.05] rounded px-1.5 py-0.5">{fight.opponent_rank}</span>
          )}
        </div>
        <span className="text-[10px] text-white/25 tabular-nums">{fight.date}</span>
      </div>
      <div className="flex items-baseline justify-between">
        {fight.note ? (
          <p className="text-[11px] text-white/30 leading-relaxed max-w-[80%]">{fight.note}</p>
        ) : <span />}
        <span className="text-[10px] text-white/40 font-medium whitespace-nowrap">{fight.method}</span>
      </div>
    </div>
  );
}

/* ── Historico de Lutas Section (clean layout) ── */
function HistoricoLutasSection({ data, lang = 'pt' }: { data: PrelimsAnalise['prelims_analysis']['historico_lutas']; lang?: Lang }) {
  const t = getLabels(lang);
  return (
    <section>
      <SectionHeader number="02" title={t.historico_title} accent={t.historico_accent} />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Fighter 1 */}
        <div>
          <div className="flex items-center justify-between mb-2 pb-3 border-b-2 border-ufc-red/30">
            <span className="font-display text-sm uppercase tracking-wider text-ufc-red">{data.fighter1.nome}</span>
          </div>
          {data.fighter1.recent_fights.map((fight, i) => (
            <FightRow key={i} fight={fight} />
          ))}
        </div>

        {/* Fighter 2 */}
        <div>
          <div className="flex items-center justify-between mb-2 pb-3 border-b-2 border-blue-400/30">
            <span className="font-display text-sm uppercase tracking-wider text-blue-400">{data.fighter2.nome}</span>
          </div>
          {data.fighter2.recent_fights.map((fight, i) => (
            <FightRow key={i} fight={fight} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main View ── */
export function PrelimsAnalysisView({ analise, lang = 'pt' }: { analise: PrelimsAnalise; lang?: Lang }) {
  const d = analise.prelims_analysis;
  const t = getLabels(lang);
  const f1Name = d.hero.fighter1.nome;
  const f2Name = d.hero.fighter2.nome;

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Section 1: Simple Hero */}
      <SimpleHero data={d.hero} />

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-16">
        {/* Section 2: Comparacao Estatistica + Tale of Tape */}
        <ComparacaoEstatisticaSection
          data={d.comparacao_estatistica}
          fighter1Name={f1Name}
          fighter2Name={f2Name}
          sectionNumber="01"
          lang={lang}
        />

        {/* Section 3: Historico de Lutas */}
        <HistoricoLutasSection data={d.historico_lutas} lang={lang} />

        {/* Section 4: Perfil de Habilidades */}
        <PerfilHabilidadesSection
          data={d.perfil_habilidades}
          fighter1Name={f1Name}
          fighter2Name={f2Name}
          sectionNumber="03"
          lang={lang}
        />

        {/* Section 5: Distribuicao de Vitorias */}
        <DistribuicaoVitoriasSection data={d.distribuicao_vitorias} sectionNumber="04" lang={lang} />

        {/* Section 6: Previsao Final */}
        <PrevisaoFinalSection data={d.previsao_final} sectionNumber="05" lang={lang} />
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 pb-10">
        <div className="rounded-lg border border-dark-border bg-dark-bg p-5 text-center">
          <p className="text-xs text-dark-textMuted">
            <span className="font-bold text-ufc-gold">UFC NEWS HUB</span> - {t.analise_preliminar}
          </p>
          <p className="mt-1 text-[10px] text-dark-textMuted">
            {d.hero.fighter1.nome} vs {d.hero.fighter2.nome} | {d.hero.evento_nome} | {d.hero.categoria_peso}
          </p>
        </div>
      </div>
    </main>
  );
}
