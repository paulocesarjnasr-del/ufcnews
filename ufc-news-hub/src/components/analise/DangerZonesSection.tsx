import type { DangerZonesSectionData } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

const colorMap = {
  red: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400',
    gradient: 'bg-gradient-to-r from-red-600 to-red-400',
  },
  gold: {
    border: 'border-ufc-gold/30',
    bg: 'bg-ufc-gold/5',
    text: 'text-ufc-gold',
    badge: 'bg-ufc-gold/20 text-ufc-gold',
    gradient: 'bg-gradient-to-r from-ufc-gold to-yellow-400',
  },
  green: {
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    text: 'text-green-400',
    badge: 'bg-green-500/20 text-green-400',
    gradient: 'bg-gradient-to-r from-green-600 to-green-400',
  },
};

export function DangerZonesSection({ data }: { data: DangerZonesSectionData }) {
  return (
    <section>
      <SectionHeader number="08" title="Danger" accent="Zones" />

      <div className="grid gap-6 md:grid-cols-3">
        {data.zones.map((zone, i) => {
          const colors = colorMap[zone.color] || colorMap.gold;
          return (
            <div key={i} className={`rounded-lg border ${colors.border} ${colors.bg} p-6`}>
              <div className="mb-4 flex items-center justify-between">
                <span className={`font-display text-2xl ${colors.text}`}>{zone.rounds}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}>{zone.danger_label}</span>
              </div>
              <h4 className={`mb-3 font-display text-sm uppercase tracking-wider ${colors.text}`}>
                {zone.title}
              </h4>
              <p className="text-sm text-dark-textMuted">{zone.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
