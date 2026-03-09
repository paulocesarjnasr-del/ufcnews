import { SectionHeader } from './SectionHeader';
import type { DangerZonesSectionData, DangerZoneCard } from '@/types/analise';

interface DangerZonesSectionProps {
  data: DangerZonesSectionData;
}

const colorMap = {
  red: {
    border: 'border-ufc-red',
    badge: 'bg-ufc-red/20 text-ufc-red',
    label: 'text-ufc-red',
    glow: 'from-ufc-red/5',
  },
  gold: {
    border: 'border-ufc-gold',
    badge: 'bg-ufc-gold/20 text-ufc-gold',
    label: 'text-ufc-gold',
    glow: 'from-ufc-gold/5',
  },
  green: {
    border: 'border-green-500',
    badge: 'bg-green-500/20 text-green-400',
    label: 'text-green-400',
    glow: 'from-green-500/5',
  },
} as const;

function ZoneCard({ zone }: { zone: DangerZoneCard }) {
  const colors = colorMap[zone.color];

  return (
    <div className={`neu-card p-5 relative overflow-hidden border-t-4 ${colors.border}`}>
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${colors.badge}`}>
        {zone.rounds}
      </span>

      <p className={`text-[10px] uppercase tracking-widest font-bold mt-2 ${colors.label}`}>
        {zone.danger_label}
      </p>

      <h3 className="font-display text-lg uppercase text-dark-text mt-3">
        {zone.title}
      </h3>

      <p className="text-sm text-dark-textMuted leading-relaxed mt-2">
        {zone.description}
      </p>

      <div className={`bg-gradient-to-t ${colors.glow} to-transparent absolute bottom-0 left-0 right-0 h-16 pointer-events-none`} />
    </div>
  );
}

export function DangerZonesSection({ data }: DangerZonesSectionProps) {
  return (
    <section>
      <SectionHeader number="08" title="Danger" accent="Zones" />

      <div className="grid md:grid-cols-3 gap-4">
        {data.zones.map((zone) => (
          <ZoneCard key={zone.rounds} zone={zone} />
        ))}
      </div>
    </section>
  );
}
