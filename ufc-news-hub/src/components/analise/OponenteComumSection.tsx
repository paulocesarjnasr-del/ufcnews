import { Eye } from 'lucide-react';
import type { OponenteComumSectionData } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

export function OponenteComumSection({ data }: { data: OponenteComumSectionData }) {
  return (
    <section>
      <SectionHeader number="04" title="Spotlight:" accent={data.oponente_nome} />
      <p className="mb-6 -mt-4 text-sm text-dark-textMuted">Oponente em comum mais recente e relevante</p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Fighter 1 result */}
        <div className="rounded-lg border border-ufc-red/30 bg-dark-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
              <span className="font-display text-sm text-ufc-red">F1</span>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase text-ufc-red">vs {data.oponente_nome}</h4>
              <p className="text-xs text-dark-textMuted">{data.fighter1_result.evento} | {data.fighter1_result.data}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-dark-textMuted">
            <p><span className="font-bold text-dark-text">Resultado:</span> {data.fighter1_result.resultado} ({data.fighter1_result.metodo})</p>
            <p><span className="font-bold text-dark-text">Durou:</span> {data.fighter1_result.duracao}</p>
            <p><span className="font-bold text-dark-text">Contexto:</span> {data.fighter1_result.contexto}</p>
            <p><span className="font-bold text-dark-text">Performance:</span> {data.fighter1_result.performance}</p>
          </div>
        </div>

        {/* Fighter 2 result */}
        <div className="rounded-lg border border-blue-400/30 bg-dark-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-400/20 flex items-center justify-center">
              <span className="font-display text-sm text-blue-400">F2</span>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase text-blue-400">vs {data.oponente_nome}</h4>
              <p className="text-xs text-dark-textMuted">{data.fighter2_result.evento} | {data.fighter2_result.data}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-dark-textMuted">
            <p><span className="font-bold text-dark-text">Resultado:</span> {data.fighter2_result.resultado} ({data.fighter2_result.metodo})</p>
            <p><span className="font-bold text-dark-text">Durou:</span> {data.fighter2_result.duracao}</p>
            <p><span className="font-bold text-dark-text">Contexto:</span> {data.fighter2_result.contexto}</p>
            <p><span className="font-bold text-dark-text">Performance:</span> {data.fighter2_result.performance}</p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-6 rounded-lg border border-ufc-gold/30 bg-ufc-gold/5 p-5">
        <div className="flex items-start gap-3">
          <Eye className="mt-0.5 h-5 w-5 flex-shrink-0 text-ufc-gold" />
          <div>
            <h4 className="font-display text-sm uppercase text-ufc-gold mb-1">Insight Chave</h4>
            <p className="text-sm text-dark-textMuted">{data.insight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
