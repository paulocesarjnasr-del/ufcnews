import type { IntangiveisSectionData } from '@/types/analise';
import { useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';
import { resolveIcon } from './icon-resolver';

const riskColorMap = {
  red: 'text-red-400 bg-red-500/10 border-red-500/30',
  yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  green: 'text-green-400 bg-green-500/10 border-green-500/30',
  neutral: 'text-dark-textMuted bg-dark-bg border-dark-border',
};

export function IntangiveisSection({ data}: { data: IntangiveisSectionData }) {
  const t = useTranslations('analise');
  return (
    <section>
      <SectionHeader number="09" title={t('intangiveis_title')} accent={t('intangiveis_accent')} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.items.map((item, i) => {
          const Icon = resolveIcon(item.icon);
          const colorClass = riskColorMap[item.risk_color] || riskColorMap.neutral;
          return (
            <div key={i} className={`rounded-lg border p-5 ${colorClass}`}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">{item.risk_level}</span>
              </div>
              <h4 className="mb-1 font-display text-sm uppercase text-dark-text">{item.title}</h4>
              <p className="mb-2 text-[10px] uppercase tracking-wider text-dark-textMuted">{item.fighter}</p>
              <p className="text-xs text-dark-textMuted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
