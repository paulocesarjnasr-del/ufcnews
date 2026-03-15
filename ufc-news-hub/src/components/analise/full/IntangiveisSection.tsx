import { SectionHeader } from './SectionHeader';
import { resolveIcon } from './icon-resolver';
import type { IntangiveisSectionData, IntangivelItem } from '@/types/analise';

const iconColorMap: Record<IntangivelItem['risk_color'], string> = {
  red: 'text-red-400',
  yellow: 'text-yellow-400',
  green: 'text-green-400',
  neutral: 'text-dark-textMuted',
};

const badgeColorMap: Record<IntangivelItem['risk_color'], string> = {
  red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  green: 'bg-green-500/20 text-green-400 border border-green-500/30',
  neutral: 'bg-dark-border text-dark-textMuted border border-dark-border',
};

const borderColorMap: Record<IntangivelItem['risk_color'], string> = {
  red: 'border-red-500',
  yellow: 'border-yellow-500',
  green: 'border-green-500',
  neutral: 'border-dark-border',
};

export function IntangiveisSection({ data }: { data: IntangiveisSectionData }) {
  return (
    <section>
      <SectionHeader number="09" title="Fatores Invisiveis &" accent="Red Flags" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, _i) => {
          const Icon = resolveIcon(item.icon);

          return (
            <div
              key={`${item.title}-${item.fighter}`}
              className={`neu-card p-5 border-l-2 ${borderColorMap[item.risk_color]}`}
            >
              <div className="flex items-center">
                <Icon className={`w-5 h-5 ${iconColorMap[item.risk_color]}`} />
                <span className="text-sm font-bold text-dark-text ml-2">
                  {item.title}
                </span>
              </div>

              <p className="text-xs text-dark-textMuted mt-1">{item.fighter}</p>

              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-2 ${badgeColorMap[item.risk_color]}`}
              >
                {item.risk_level}
              </span>

              <p className="text-sm text-dark-textMuted leading-relaxed mt-3">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
