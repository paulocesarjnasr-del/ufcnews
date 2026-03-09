import { SectionHeader } from './SectionHeader';
import type { DistribuicaoVitoriasSectionData, DistribuicaoVitoriasFighter, WinMethodBreakdown } from '@/types/analise';

interface DistribuicaoVitoriasSectionProps {
  data: DistribuicaoVitoriasSectionData;
}

interface BarProps {
  label: string;
  method: WinMethodBreakdown;
  colorClass: string;
}

function WinBar({ label, method, colorClass }: BarProps) {
  return (
    <div className="mb-3">
      <p className="text-xs uppercase tracking-wider text-dark-textMuted mb-1">{label}</p>
      <div className="flex items-center gap-3">
        <div className="h-4 w-full rounded-full bg-dark-border">
          <div
            className={`h-4 rounded-full ${colorClass}`}
            style={{ width: `${method.percent}%` }}
          />
        </div>
        <span className="text-sm text-dark-text whitespace-nowrap">
          {method.count} ({method.percent}%)
        </span>
      </div>
    </div>
  );
}

function FighterCard({ fighter, nameColor }: { fighter: DistribuicaoVitoriasFighter; nameColor: string }) {
  return (
    <div className="neu-card p-6">
      <h3 className={`font-display text-xl uppercase ${nameColor}`}>{fighter.nome}</h3>

      <div className="mt-4 mb-5">
        <p className="font-display text-4xl text-dark-text">{fighter.total_wins}</p>
        <p className="text-xs uppercase tracking-wider text-dark-textMuted mb-1">vitorias</p>
      </div>

      <WinBar label="KO/TKO" method={fighter.ko_tko} colorClass="bg-red-500" />
      <WinBar label="Finalizacao" method={fighter.submission} colorClass="bg-blue-500" />
      <WinBar label="Decisao" method={fighter.decision} colorClass="bg-yellow-500" />
    </div>
  );
}

export function DistribuicaoVitoriasSection({ data }: DistribuicaoVitoriasSectionProps) {
  return (
    <section>
      <SectionHeader number="07" title="Distribuicao de" accent="Vitorias" />

      <div className="grid md:grid-cols-2 gap-6">
        <FighterCard fighter={data.fighter1} nameColor="text-ufc-red" />
        <FighterCard fighter={data.fighter2} nameColor="text-blue-400" />
      </div>

      <div className="neu-inset p-4 mt-6 text-sm text-dark-textMuted leading-relaxed">
        {data.insight}
      </div>
    </section>
  );
}
