import type { OQueObservarSectionData } from '@/types/analise';
import { useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';
import { resolveIcon } from './icon-resolver';

export function OQueObservarSection({ data}: { data: OQueObservarSectionData }) {
  const t = useTranslations('analise');
  return (
    <section>
      <SectionHeader number="12" title={t('observar_title')} accent={t('observar_accent')} />

      <div className="space-y-4">
        {data.points.map((item) => {
          const Icon = resolveIcon(item.icon);
          return (
            <div key={item.num} className="flex gap-4 rounded-lg border border-dark-border bg-dark-card p-5 md:p-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ufc-red/10">
                  <span className="font-display text-xl text-ufc-red">{item.num}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-ufc-gold" />
                  <h4 className="font-display text-sm uppercase text-dark-text">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
