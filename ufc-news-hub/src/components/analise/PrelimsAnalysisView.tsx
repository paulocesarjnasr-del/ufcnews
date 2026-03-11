'use client';

import type { PrelimsAnalise, RecentFight } from '@/types/analise';
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

        {/* Fighter names */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <div className="text-center">
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

/* ── Fight Card (single fight row) ── */
function FightCard({ fight }: { fight: RecentFight }) {
  return (
    <div className="rounded-lg border border-dark-border/50 bg-dark-bg p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
              fight.result === 'W'
                ? 'bg-green-500/20 text-green-400'
                : fight.result === 'L'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {fight.result}
          </span>
          <span className="text-sm font-semibold text-dark-text">{fight.opponent}</span>
          <span className="text-xs text-dark-textMuted">{fight.opponent_rank}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-dark-textMuted">{fight.date}</span>
          <p className="text-xs font-semibold text-dark-text">{fight.method}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Historico de Lutas Section ── */
function HistoricoLutasSection({ data }: { data: PrelimsAnalise['prelims_analysis']['historico_lutas'] }) {
  return (
    <section>
      <SectionHeader number="02" title="Historico de" accent="Lutas" />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fighter 1 */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-ufc-red" />
            <h3 className="font-display text-lg uppercase text-ufc-red">{data.fighter1.nome}</h3>
            <span className="text-xs text-dark-textMuted">Ultimas {data.fighter1.recent_fights.length} lutas</span>
          </div>
          <div className="space-y-2">
            {data.fighter1.recent_fights.map((fight, i) => (
              <FightCard key={i} fight={fight} />
            ))}
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-blue-400" />
            <h3 className="font-display text-lg uppercase text-blue-400">{data.fighter2.nome}</h3>
            <span className="text-xs text-dark-textMuted">Ultimas {data.fighter2.recent_fights.length} lutas</span>
          </div>
          <div className="space-y-2">
            {data.fighter2.recent_fights.map((fight, i) => (
              <FightCard key={i} fight={fight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main View ── */
export function PrelimsAnalysisView({ analise }: { analise: PrelimsAnalise }) {
  const d = analise.prelims_analysis;
  const f1Name = d.hero.fighter1.nome;
  const f2Name = d.hero.fighter2.nome;

  return (
    <main>
      {/* Section 1: Simple Hero */}
      <SimpleHero data={d.hero} />

      <div className="container mx-auto px-4 py-10 space-y-14">
        {/* Section 2: Comparacao Estatistica + Tale of Tape */}
        <ComparacaoEstatisticaSection
          data={d.comparacao_estatistica}
          fighter1Name={f1Name}
          fighter2Name={f2Name}
          sectionNumber="01"
        />

        {/* Section 3: Historico de Lutas */}
        <HistoricoLutasSection data={d.historico_lutas} />

        {/* Section 4: Perfil de Habilidades */}
        <PerfilHabilidadesSection
          data={d.perfil_habilidades}
          fighter1Name={f1Name}
          fighter2Name={f2Name}
          sectionNumber="03"
        />

        {/* Section 5: Distribuicao de Vitorias */}
        <DistribuicaoVitoriasSection data={d.distribuicao_vitorias} sectionNumber="04" />

        {/* Section 6: Previsao Final */}
        <PrevisaoFinalSection data={d.previsao_final} sectionNumber="05" />
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 pb-10">
        <div className="rounded-lg border border-dark-border bg-dark-bg p-5 text-center">
          <p className="text-xs text-dark-textMuted">
            <span className="font-bold text-ufc-gold">UFC NEWS HUB</span> - Analise Preliminar
          </p>
          <p className="mt-1 text-[10px] text-dark-textMuted">
            {d.hero.fighter1.nome} vs {d.hero.fighter2.nome} | {d.hero.evento_nome} | {d.hero.categoria_peso}
          </p>
        </div>
      </div>
    </main>
  );
}
