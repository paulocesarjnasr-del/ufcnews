import { BarChart3 } from 'lucide-react';
import type { DistribuicaoVitoriasSectionData, WinMethodBreakdown } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

function WinBreakdownCard({ nome, data, accentClass }: { nome: string; data: { nome: string } & WinMethodBreakdown; accentClass: string }) {
  const isRed = accentClass === 'text-ufc-red';
  const barColors = {
    ko: isRed ? 'bg-ufc-red' : 'bg-blue-400',
    sub: isRed ? 'bg-ufc-red/70' : 'bg-blue-400/70',
    dec: isRed ? 'bg-ufc-red/40' : 'bg-blue-400/40',
  };
  const textColors = {
    ko: isRed ? 'text-ufc-red' : 'text-blue-400',
    sub: isRed ? 'text-ufc-red/80' : 'text-blue-400/80',
    dec: isRed ? 'text-ufc-red/60' : 'text-blue-400/60',
  };

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-6">
      <h3 className={`mb-4 font-display text-lg uppercase ${accentClass}`}>{nome} ({data.total_wins}W)</h3>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-dark-textMuted">KO/TKO</span>
            <span className={`font-bold ${textColors.ko}`}>{data.ko_tko.count} ({data.ko_tko.percent}%)</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
            <div className={`h-full rounded-full ${barColors.ko}`} style={{ width: `${data.ko_tko.percent}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-dark-textMuted">Submissao</span>
            <span className={`font-bold ${textColors.sub}`}>{data.submission.count} ({data.submission.percent}%)</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
            <div className={`h-full rounded-full ${barColors.sub}`} style={{ width: `${data.submission.percent}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-dark-textMuted">Decisao</span>
            <span className={`font-bold ${textColors.dec}`}>{data.decision.count} ({data.decision.percent}%)</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-dark-bg">
            <div className={`h-full rounded-full ${barColors.dec}`} style={{ width: `${data.decision.percent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DistribuicaoVitoriasSection({ data, sectionNumber }: { data: DistribuicaoVitoriasSectionData; sectionNumber?: string }) {
  return (
    <section>
      <SectionHeader number={sectionNumber ?? "07"} title="Distribuicao de" accent="Vitorias" />

      <div className="grid gap-6 md:grid-cols-2">
        <WinBreakdownCard nome={data.fighter1.nome} data={data.fighter1} accentClass="text-ufc-red" />
        <WinBreakdownCard nome={data.fighter2.nome} data={data.fighter2} accentClass="text-blue-400" />
      </div>

      {data.insight && (
        <div className="mt-6 rounded-lg border border-dark-border bg-dark-card p-5">
          <div className="flex items-start gap-3">
            <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-ufc-gold" />
            <p className="text-sm text-dark-textMuted">
              <span className="font-bold text-dark-text">Insight:</span> {data.insight}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
