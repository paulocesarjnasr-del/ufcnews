import type { OQueObservarSectionData } from '@/types/analise';

import { SectionHeader } from './SectionHeader';
import { resolveIcon } from './icon-resolver';

interface OQueObservarSectionProps {
  data: OQueObservarSectionData;
}

export function OQueObservarSection({ data }: OQueObservarSectionProps) {
  return (
    <section>
      <SectionHeader number="12" title="O Que" accent="Observar" />

      <div className="space-y-4">
        {data.points.map((point) => {
          const Icon = resolveIcon(point.icon);

          return (
            <div key={point.num} className="neu-card flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ufc-red/20">
                <span className="font-display text-lg text-ufc-red">
                  {point.num}
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-dark-text">
                  <Icon className="mr-2 inline h-4 w-4 text-ufc-gold" />
                  {point.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-dark-textMuted">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
