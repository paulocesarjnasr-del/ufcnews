import Link from 'next/link';
import type { FullSingleAnalise } from '@/types/analise';
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

interface FullAnalysisViewProps {
  analise: FullSingleAnalise;
}

export function FullAnalysisView({ analise }: FullAnalysisViewProps) {
  const fa = analise.full_analysis;
  const f1Name = fa.hero.fighter1.sobrenome;
  const f2Name = fa.hero.fighter2.sobrenome;

  return (
    <main>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/analises" className="hover:text-ufc-red transition-colors">Analises</Link>
          <span>/</span>
          <span className="text-dark-text">{fa.hero.evento_nome}</span>
        </div>
      </div>

      {/* Hero (full-bleed, no section number) */}
      <div className="container mx-auto px-4">
        <HeroSection data={fa.hero} />
      </div>

      {/* Sections with consistent spacing */}
      <div className="container mx-auto px-4 space-y-16 py-12">
        {/* 01 - Narrativa */}
        <section>
          <NarrativaSection
            data={fa.narrativa}
            fighter1Name={f1Name}
            fighter2Name={f2Name}
          />
        </section>

        {/* 02 - Momento Atual */}
        <section>
          <MomentoAtualSection data={fa.momento_atual} />
        </section>

        {/* 03 - Nivel de Competicao */}
        <section>
          <NivelCompeticaoSection data={fa.nivel_competicao} />
        </section>

        {/* 04 - Oponente Comum (optional) */}
        {fa.oponente_comum && (
          <section>
            <OponenteComumSection
              data={fa.oponente_comum}
              fighter1Name={f1Name}
              fighter2Name={f2Name}
            />
          </section>
        )}

        {/* 05 - Comparacao Estatistica */}
        <section>
          <ComparacaoEstatisticaSection
            data={fa.comparacao_estatistica}
            fighter1Name={f1Name}
            fighter2Name={f2Name}
          />
        </section>

        {/* 06 - Perfil de Habilidades */}
        <section>
          <PerfilHabilidadesSection
            data={fa.perfil_habilidades}
            fighter1Name={f1Name}
            fighter2Name={f2Name}
          />
        </section>

        {/* 07 - Distribuicao de Vitorias */}
        <section>
          <DistribuicaoVitoriasSection data={fa.distribuicao_vitorias} />
        </section>

        {/* 08 - Danger Zones */}
        <section>
          <DangerZonesSection data={fa.danger_zones} />
        </section>

        {/* 09 - Intangiveis */}
        <section>
          <IntangiveisSection data={fa.intangiveis} />
        </section>

        {/* 10 - Caminhos Para Vitoria */}
        <section>
          <CaminhosVitoriaSection data={fa.caminhos_vitoria} />
        </section>

        {/* 11 - Previsao Final */}
        <section>
          <PrevisaoFinalSection data={fa.previsao_final} />
        </section>

        {/* 12 - O Que Observar */}
        <section>
          <OQueObservarSection data={fa.o_que_observar} />
        </section>

        {/* 13 - Creator Kit */}
        <section>
          <CreatorKitSection data={fa.creator_kit} />
        </section>

        {/* 15 - Radar do Apostador */}
        <section>
          {fa.radar_apostador && <RadarApostadorSection data={fa.radar_apostador} />}
        </section>
      </div>
    </main>
  );
}
