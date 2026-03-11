import { BarChart3 } from 'lucide-react';
import type { PerfilHabilidadesSectionData, SkillBarData } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

function valueToLabel(value: number): string {
  if (value >= 90) return 'Excelente';
  if (value >= 75) return 'Muito Bom';
  if (value >= 55) return 'Bom';
  if (value >= 35) return 'Medio';
  return 'Ruim';
}

function labelColor(label: string): string {
  switch (label) {
    case 'Excelente': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Muito Bom': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Bom': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Medio': return 'bg-yellow-600/20 text-yellow-600 border-yellow-600/30';
    case 'Ruim': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-dark-border text-dark-textMuted border-dark-border';
  }
}

function SkillRow({ skill, fighter1Name, fighter2Name }: { skill: SkillBarData; fighter1Name: string; fighter2Name: string }) {
  const lA = skill.labelA || valueToLabel(skill.valueA);
  const lB = skill.labelB || valueToLabel(skill.valueB);

  return (
    <div className="rounded-lg border border-dark-border/50 bg-dark-bg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-dark-text">{skill.label}</h4>
        {skill.advantage && skill.advantage !== 'even' && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            skill.advantage === 'fighter1' ? 'bg-ufc-red/20 text-ufc-red' : 'bg-blue-400/20 text-blue-400'
          }`}>
            Vantagem {skill.advantage === 'fighter1' ? fighter1Name : fighter2Name}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-dark-textMuted">{fighter1Name}</span>
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${labelColor(lA)}`}>{lA}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-dark-textMuted">{fighter2Name}</span>
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${labelColor(lB)}`}>{lB}</span>
        </div>
      </div>
      {skill.advantage_note && (
        <p className="mt-2 text-[11px] italic text-dark-textMuted">{skill.advantage_note}</p>
      )}
    </div>
  );
}

export function PerfilHabilidadesSection({
  data,
  fighter1Name,
  fighter2Name,
  sectionNumber,
}: {
  data: PerfilHabilidadesSectionData;
  fighter1Name: string;
  fighter2Name: string;
  sectionNumber?: string;
}) {
  return (
    <section>
      <SectionHeader number={sectionNumber ?? "06"} title="Perfil de" accent="Habilidades" />

      <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
        <div className="mb-6 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-ufc-red" />
            <span className="font-semibold text-dark-textMuted">{fighter1Name}</span>
          </div>
          <span className="text-dark-textMuted">vs</span>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            <span className="font-semibold text-dark-textMuted">{fighter2Name}</span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {data.skills.map((skill, i) => (
            <SkillRow key={i} skill={skill} fighter1Name={fighter1Name} fighter2Name={fighter2Name} />
          ))}
        </div>

        {data.insight && (
          <div className="mt-6 rounded-lg border border-dark-border bg-dark-bg p-4">
            <div className="flex items-start gap-3">
              <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-ufc-gold" />
              <p className="text-sm text-dark-textMuted">
                <span className="font-bold text-dark-text">Insight:</span> {data.insight}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
