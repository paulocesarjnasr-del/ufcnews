import { SectionHeader } from './SectionHeader';
import type { PerfilHabilidadesSectionData, SkillBarData } from '@/types/analise';

interface PerfilHabilidadesSectionProps {
  data: PerfilHabilidadesSectionData;
  fighter1Name: string;
  fighter2Name: string;
}

function SkillRow({ skill }: { skill: SkillBarData }) {
  return (
    <div className="border-b border-dark-border/20 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      {/* Skill label */}
      <p className="mb-3 text-center text-sm font-medium text-dark-text">
        {skill.label}
        {skill.advantage && skill.advantage !== 'even' && (
          <span
            className={`ml-2 ${
              skill.advantage === 'fighter1'
                ? 'text-ufc-red'
                : 'text-blue-400'
            }`}
          >
            {skill.advantage === 'fighter1' ? '◂' : '▸'}
          </span>
        )}
      </p>

      {/* Bars */}
      <div className="space-y-2">
        {/* Fighter 1 */}
        <div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-dark-border/20">
            <div
              className="h-3 rounded-full bg-ufc-red/80 transition-all"
              style={{ width: `${skill.valueA}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-dark-textMuted">
            <span className="text-ufc-red">{skill.valueA}</span>
            {skill.labelA && (
              <span className="text-dark-textMuted"> — {skill.labelA}</span>
            )}
          </p>
        </div>

        {/* Fighter 2 */}
        <div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-dark-border/20">
            <div
              className="h-3 rounded-full bg-blue-400/80 transition-all"
              style={{ width: `${skill.valueB}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-dark-textMuted">
            <span className="text-blue-400">{skill.valueB}</span>
            {skill.labelB && (
              <span className="text-dark-textMuted"> — {skill.labelB}</span>
            )}
          </p>
        </div>
      </div>

      {/* Advantage note */}
      {skill.advantage_note && (
        <p className="mt-2 text-center text-xs italic text-dark-textMuted">
          {skill.advantage_note}
        </p>
      )}
    </div>
  );
}

export function PerfilHabilidadesSection({
  data,
  fighter1Name,
  fighter2Name,
}: PerfilHabilidadesSectionProps) {
  return (
    <section>
      <SectionHeader number="06" title="Perfil de" accent="Habilidades" />

      <div className="neu-card p-6">
        {/* Header row */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-lg uppercase text-ufc-red">
            {fighter1Name}
          </span>
          <span className="font-display text-lg uppercase text-blue-400">
            {fighter2Name}
          </span>
        </div>

        {/* Skill rows */}
        {data.skills.map((skill) => (
          <SkillRow key={skill.label} skill={skill} />
        ))}

        {/* Insight */}
        {data.insight && (
          <div className="neu-inset mt-6 p-4 text-sm leading-relaxed text-dark-textMuted">
            {data.insight}
          </div>
        )}
      </div>
    </section>
  );
}
