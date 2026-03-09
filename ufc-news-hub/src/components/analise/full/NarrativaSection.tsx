import { SectionHeader } from './SectionHeader';
import type { NarrativaSectionData } from '@/types/analise';

interface NarrativaSectionProps {
  data: NarrativaSectionData;
  fighter1Name: string;
  fighter2Name: string;
}

export function NarrativaSection({ data, fighter1Name, fighter2Name }: NarrativaSectionProps) {
  const { html_content, stakes, prognostico } = data;

  return (
    <section>
      <SectionHeader number="01" title="O Contexto Que Ninguem" accent="Te Conta" />

      {/* HTML Content */}
      <div className="neu-card p-6 md:p-8">
        <div
          className="prose prose-invert max-w-none text-dark-text prose-headings:font-display prose-headings:uppercase prose-headings:text-dark-text prose-p:text-dark-textMuted prose-p:leading-relaxed prose-strong:text-dark-text prose-a:text-ufc-red"
          dangerouslySetInnerHTML={{ __html: html_content }}
        />

        {/* Stakes Table */}
        {stakes.length > 0 && (
          <div className="neu-inset p-4 mt-6">
            <div className="grid grid-cols-3 gap-2">
              {/* Header Row */}
              <div className="text-dark-textMuted uppercase text-xs tracking-wider font-semibold pb-2 border-b border-dark-border">
                Dimensao
              </div>
              <div className="text-ufc-red uppercase text-xs tracking-wider font-semibold pb-2 border-b border-dark-border">
                {fighter1Name}
              </div>
              <div className="text-blue-400 uppercase text-xs tracking-wider font-semibold pb-2 border-b border-dark-border">
                {fighter2Name}
              </div>

              {/* Data Rows */}
              {stakes.map((stake) => (
                <>
                  <div
                    key={`dim-${stake.dimensao}`}
                    className="text-dark-textMuted uppercase text-xs tracking-wider py-2 border-b border-dark-border/30"
                  >
                    {stake.dimensao}
                  </div>
                  <div
                    key={`f1-${stake.dimensao}`}
                    className="text-ufc-red text-sm py-2 border-b border-dark-border/30"
                  >
                    {stake.fighter1}
                  </div>
                  <div
                    key={`f2-${stake.dimensao}`}
                    className="text-blue-400 text-sm py-2 border-b border-dark-border/30"
                  >
                    {stake.fighter2}
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prognostico Cards */}
      {prognostico && (
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {/* Fighter 1 Card */}
          <div className="border-l-4 border-ufc-red bg-dark-card rounded-lg p-5">
            <h3 className="font-display text-lg uppercase text-ufc-red">
              {prognostico.fighter1_vence.titulo}
            </h3>
            <p className="text-sm text-dark-textMuted mt-1">
              {prognostico.fighter1_vence.subtitulo}
            </p>
            <ul className="mt-3 space-y-2">
              {prognostico.fighter1_vence.consequencias.map((c) => (
                <li key={c.tag} className="flex items-start gap-2">
                  <span className="bg-ufc-red/20 text-ufc-red text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    {c.tag}
                  </span>
                  <span className="text-sm text-dark-textMuted">{c.texto}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-dark-textMuted mt-3">
              <span className="font-semibold">Proxima luta:</span>{' '}
              {prognostico.fighter1_vence.proxima_luta}
            </p>
          </div>

          {/* Fighter 2 Card */}
          <div className="border-l-4 border-blue-400 bg-dark-card rounded-lg p-5">
            <h3 className="font-display text-lg uppercase text-blue-400">
              {prognostico.fighter2_vence.titulo}
            </h3>
            <p className="text-sm text-dark-textMuted mt-1">
              {prognostico.fighter2_vence.subtitulo}
            </p>
            <ul className="mt-3 space-y-2">
              {prognostico.fighter2_vence.consequencias.map((c) => (
                <li key={c.tag} className="flex items-start gap-2">
                  <span className="bg-blue-400/20 text-blue-400 text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    {c.tag}
                  </span>
                  <span className="text-sm text-dark-textMuted">{c.texto}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-dark-textMuted mt-3">
              <span className="font-semibold">Proxima luta:</span>{' '}
              {prognostico.fighter2_vence.proxima_luta}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
