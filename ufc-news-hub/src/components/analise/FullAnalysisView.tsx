'use client';

import Link from 'next/link';
import type { FullSingleAnalise } from '@/types/analise';
import { getLabels, type Lang } from '@/lib/i18n-labels';
import { HeroSection } from './HeroSection';
import { NarrativaSection } from './NarrativaSection';
import { MomentoAtualSection } from './MomentoAtualSection';
import { NivelCompeticaoSection } from './NivelCompeticaoSection';
import { OponenteComumSection } from './OponenteComumSection';
import { ComparacaoEstatisticaSection } from './ComparacaoEstatisticaSection';
import { PerfilHabilidadesSection } from './PerfilHabilidadesSection';
import { DistribuicaoVitoriasSection } from './DistribuicaoVitoriasSection';
import { DangerZonesSection } from './DangerZonesSection';
import { IntangiveisSection } from './IntangiveisSection';
import { CaminhosVitoriaSection } from './CaminhosVitoriaSection';
import { PrevisaoFinalSection } from './PrevisaoFinalSection';
import { OQueObservarSection } from './OQueObservarSection';
import { CreatorKitSection } from './CreatorKitSection';
import { RadarApostadorSection } from './RadarApostadorSection';


export function FullAnalysisView({ analise, lang = 'pt' }: { analise: FullSingleAnalise; lang?: Lang }) {
  const d = analise.full_analysis;
  const f1Name = d.hero.fighter1.sobrenome;
  const f2Name = d.hero.fighter2.sobrenome;
  const t = getLabels(lang);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <div className="mb-6 flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-ufc-red transition-colors">Home</Link>
          <span className="text-white/10">/</span>
          <span className="text-white/50">{f1Name} vs {f2Name}</span>
        </div>
      </div>

      {/* Section 1: Hero */}
      <div className="mx-auto max-w-5xl px-4">
        <HeroSection data={d.hero} lang={lang} />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16 space-y-20">
        {/* Section 2: Narrativa */}
        <NarrativaSection data={d.narrativa} fighter1Name={f1Name} fighter2Name={f2Name} />

        {/* Section 3: Momento Atual */}
        <MomentoAtualSection data={d.momento_atual} lang={lang} />

        {/* Section 4: Nivel de Competicao */}
        <NivelCompeticaoSection data={d.nivel_competicao} lang={lang} />

        {/* Section 5: Oponente em Comum (optional) */}
        {d.oponente_comum && <OponenteComumSection data={d.oponente_comum} />}

        {/* Section 6: Comparacao Estatistica */}
        <ComparacaoEstatisticaSection data={d.comparacao_estatistica} fighter1Name={f1Name} fighter2Name={f2Name} lang={lang} />

        {/* Section 7: Perfil de Habilidades */}
        <PerfilHabilidadesSection data={d.perfil_habilidades} fighter1Name={f1Name} fighter2Name={f2Name} lang={lang} />

        {/* Section 8: Distribuicao de Vitorias */}
        <DistribuicaoVitoriasSection data={d.distribuicao_vitorias} lang={lang} />

        {/* Section 9: Danger Zones */}
        <DangerZonesSection data={d.danger_zones} />

        {/* Section 10: Fatores Invisiveis & Red Flags */}
        <IntangiveisSection data={d.intangiveis} lang={lang} />

        {/* Section 11: Caminhos para Vitoria */}
        <CaminhosVitoriaSection data={d.caminhos_vitoria} lang={lang} />

        {/* Section 12: Previsao Final */}
        <PrevisaoFinalSection data={d.previsao_final} lang={lang} />

        {/* Section 13: O Que Observar */}
        <OQueObservarSection data={d.o_que_observar} />

        {/* Section 14: Creator Kit */}
        <CreatorKitSection data={d.creator_kit} lang={lang} />

        {/* Section 15: Radar do Apostador */}
        {d.radar_apostador && <RadarApostadorSection data={d.radar_apostador} lang={lang} />}

        {/* Footer Disclaimer */}
        <div className="rounded-lg border border-dark-border bg-dark-bg p-6 text-center">
          <p className="text-xs text-dark-textMuted">
            <span className="font-bold text-ufc-gold">UFC NEWS HUB</span> - {t.analise_estatistica}
            {' '}{t.dados_baseados}
          </p>
          <p className="mt-2 text-[10px] text-dark-textMuted">
            {d.hero.fighter1.nome_completo} vs {d.hero.fighter2.nome_completo} | {d.hero.evento_nome} | {d.hero.evento_data} | {d.hero.evento_local}
          </p>
        </div>
      </div>
    </main>
  );
}
