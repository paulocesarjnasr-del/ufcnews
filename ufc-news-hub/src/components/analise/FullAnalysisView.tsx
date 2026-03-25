'use client';

import type { FullSingleAnalise } from '@/types/analise';
import { useTranslations } from 'next-intl';
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


export function FullAnalysisView({ analise}: { analise: FullSingleAnalise }) {
  const d = analise.full_analysis;
  const f1Name = d.hero.fighter1.sobrenome;
  const f2Name = d.hero.fighter2.sobrenome;
  const t = useTranslations('analise');

  return (
    <main>
      {/* Section 1: Hero */}
      <HeroSection data={d.hero} />

      <div className="container mx-auto px-4 py-12 space-y-20">
        {/* Section 2: Narrativa */}
        <NarrativaSection data={d.narrativa} fighter1Name={f1Name} fighter2Name={f2Name} />

        {/* Section 3: Momento Atual */}
        <MomentoAtualSection data={d.momento_atual} />

        {/* Section 4: Nivel de Competicao */}
        <NivelCompeticaoSection data={d.nivel_competicao} />

        {/* Section 5: Oponente em Comum (optional) */}
        {d.oponente_comum && <OponenteComumSection data={d.oponente_comum} />}

        {/* Section 6: Comparacao Estatistica */}
        <ComparacaoEstatisticaSection data={d.comparacao_estatistica} fighter1Name={f1Name} fighter2Name={f2Name} />

        {/* Section 7: Perfil de Habilidades */}
        <PerfilHabilidadesSection data={d.perfil_habilidades} fighter1Name={f1Name} fighter2Name={f2Name} />

        {/* Section 8: Distribuicao de Vitorias */}
        <DistribuicaoVitoriasSection data={d.distribuicao_vitorias} />

        {/* Section 9: Danger Zones */}
        <DangerZonesSection data={d.danger_zones} />

        {/* Section 10: Fatores Invisiveis & Red Flags */}
        <IntangiveisSection data={d.intangiveis} />

        {/* Section 11: Caminhos para Vitoria */}
        <CaminhosVitoriaSection data={d.caminhos_vitoria} />

        {/* Section 12: Previsao Final */}
        <PrevisaoFinalSection data={d.previsao_final} />

        {/* Section 13: O Que Observar */}
        <OQueObservarSection data={d.o_que_observar} />

        {/* Section 14: Creator Kit */}
        <CreatorKitSection data={d.creator_kit} />

        {/* Section 15: Radar do Apostador */}
        {d.radar_apostador && <RadarApostadorSection data={d.radar_apostador} />}

        {/* Footer Disclaimer */}
        <div className="rounded-lg border border-dark-border bg-dark-bg p-6 text-center">
          <p className="text-xs text-dark-textMuted">
            <span className="font-bold text-ufc-gold">UFC NEWS HUB</span> - {t('analise_estatistica')}
            {' '}{t('dados_baseados')}
          </p>
          <p className="mt-2 text-[10px] text-dark-textMuted">
            {d.hero.fighter1.nome_completo} vs {d.hero.fighter2.nome_completo} | {d.hero.evento_nome} | {d.hero.evento_data} | {d.hero.evento_local}
          </p>
        </div>
      </div>
    </main>
  );
}
