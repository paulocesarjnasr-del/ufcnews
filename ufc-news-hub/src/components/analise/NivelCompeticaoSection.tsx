import type { NivelCompeticaoSectionData } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

export function NivelCompeticaoSection({ data }: { data: NivelCompeticaoSectionData }) {
  return (
    <section>
      <SectionHeader number="03" title="Nivel de" accent="Competicao" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Fighter 1 */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-ufc-red">{data.fighter1.nome}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textMuted">Media oponentes</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                data.fighter1.media_oponentes >= 5 ? 'bg-yellow-500/20 text-yellow-400' :
                data.fighter1.media_oponentes >= 4 ? 'bg-emerald-500/20 text-emerald-400' :
                data.fighter1.media_oponentes >= 3 ? 'bg-green-500/20 text-green-400' :
                data.fighter1.media_oponentes >= 2 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {data.fighter1.media_oponentes_label || (['', 'Ruim', 'Medio', 'Bom', 'Muito Bom', 'Excelente'][data.fighter1.media_oponentes] || `${data.fighter1.media_oponentes}/5`)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textMuted">Aproveitamento</span>
              <span className="font-bold text-green-400">{data.fighter1.aproveitamento}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textMuted">Contra top 5</span>
              <span className="font-bold text-dark-text">{data.fighter1.contra_top5}</span>
            </div>
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-blue-400">{data.fighter2.nome}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textMuted">Media oponentes</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                data.fighter2.media_oponentes >= 5 ? 'bg-yellow-500/20 text-yellow-400' :
                data.fighter2.media_oponentes >= 4 ? 'bg-emerald-500/20 text-emerald-400' :
                data.fighter2.media_oponentes >= 3 ? 'bg-green-500/20 text-green-400' :
                data.fighter2.media_oponentes >= 2 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {data.fighter2.media_oponentes_label || (['', 'Ruim', 'Medio', 'Bom', 'Muito Bom', 'Excelente'][data.fighter2.media_oponentes] || `${data.fighter2.media_oponentes}/5`)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textMuted">Aproveitamento</span>
              <span className="font-bold text-dark-text">{data.fighter2.aproveitamento}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textMuted">Contra top 5</span>
              <span className="font-bold text-dark-text">{data.fighter2.contra_top5}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
