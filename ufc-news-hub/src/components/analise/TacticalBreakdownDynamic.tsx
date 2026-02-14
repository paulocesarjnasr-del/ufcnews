'use client';

import { TacticalBreakdownData, FighterInfo } from '@/types/analise';

interface Props {
  data: TacticalBreakdownData;
  fighter1: FighterInfo;
  fighter2: FighterInfo;
  fighter1Color?: string;
  fighter2Color?: string;
}

export function TacticalBreakdownDynamic({ 
  data, fighter1, fighter2, 
  fighter1Color = 'ufc-red', fighter2Color = 'blue-400' 
}: Props) {
  const f1Short = fighter1.nome.split(' ').pop()?.toUpperCase() || 'F1';
  const f2Short = fighter2.nome.split(' ').pop()?.toUpperCase() || 'F2';
  const f1Name = fighter1.nome.split(' ').pop() || 'Fighter 1';
  const f2Name = fighter2.nome.split(' ').pop() || 'Fighter 2';

  return (
    <div className="space-y-6">
      {/* Stat Comparison Table */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="text-center">
              <p className={`font-display text-lg text-${fighter1Color}`}>{f1Name.toUpperCase()}</p>
            </div>
            <div className="px-4 text-center text-xs text-dark-textMuted uppercase tracking-wider">
              Estatistica
            </div>
            <div className="text-center">
              <p className={`font-display text-lg text-${fighter2Color}`}>{f2Name.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-dark-border">
          {data.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center p-4">
              <div className={`text-center font-display text-xl ${
                stat.advantage === 'fighter1' ? `text-${fighter1Color}` : 'text-dark-text'
              }`}>
                {stat.fighter1Value}{stat.suffix || ''}
                {stat.advantage === 'fighter1' && <span className="ml-1 text-xs">✓</span>}
              </div>
              <div className="px-4 text-center text-sm text-dark-textMuted whitespace-nowrap">
                {stat.label}
              </div>
              <div className={`text-center font-display text-xl ${
                stat.advantage === 'fighter2' ? `text-${fighter2Color}` : 'text-dark-text'
              }`}>
                {stat.fighter2Value}{stat.suffix || ''}
                {stat.advantage === 'fighter2' && <span className="ml-1 text-xs">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart Visual (CSS-based) */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <h3 className="mb-4 text-center font-display text-lg uppercase text-dark-text">
          Perfil de Habilidades
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.radarData.map((d, i) => (
            <div key={i} className="rounded bg-dark-bg p-4">
              <p className="mb-2 text-center text-xs text-dark-textMuted uppercase tracking-wider">{d.axis}</p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={`text-${fighter1Color}`}>{f1Short.slice(0, 3)}</span>
                    <span className="text-dark-text">{d.fighter1}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className={`h-2 rounded-full bg-${fighter1Color}`} style={{ width: `${d.fighter1}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={`text-${fighter2Color}`}>{f2Short.slice(0, 3)}</span>
                    <span className="text-dark-text">{d.fighter2}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className={`h-2 rounded-full bg-${fighter2Color}`} style={{ width: `${d.fighter2}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tale of the Tape */}
      {data.taleOfTape && (
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h3 className="mb-4 text-center font-display text-lg uppercase text-dark-text">
            Tale of the Tape
          </h3>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="text-center space-y-3">
              <p className="font-display text-3xl text-dark-text">{data.taleOfTape.fighter1.altura}</p>
              <p className="text-xs text-dark-textMuted">Altura</p>
              <p className="font-display text-3xl text-dark-text">{data.taleOfTape.fighter1.envergadura}</p>
              <p className="text-xs text-dark-textMuted">Envergadura</p>
              <p className="font-display text-3xl text-dark-text">{data.taleOfTape.fighter1.idade}</p>
              <p className="text-xs text-dark-textMuted">Idade</p>
              <p className="font-display text-xl text-dark-text">{data.taleOfTape.fighter1.academia}</p>
              <p className="text-xs text-dark-textMuted">Academia</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              {['VS', 'VS', 'VS', 'VS'].map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="h-px w-16 bg-dark-border" />
                  <span className="text-dark-textMuted text-xs">VS</span>
                </div>
              ))}
              <div className="h-px w-16 bg-dark-border" />
            </div>
            <div className="text-center space-y-3">
              <p className="font-display text-3xl text-dark-text">{data.taleOfTape.fighter2.altura}</p>
              <p className="text-xs text-dark-textMuted">Altura</p>
              <p className="font-display text-3xl text-dark-text">{data.taleOfTape.fighter2.envergadura}</p>
              <p className="text-xs text-dark-textMuted">Envergadura</p>
              <p className="font-display text-3xl text-dark-text">{data.taleOfTape.fighter2.idade}</p>
              <p className="text-xs text-dark-textMuted">Idade</p>
              <p className="font-display text-xl text-dark-text">{data.taleOfTape.fighter2.academia}</p>
              <p className="text-xs text-dark-textMuted">Academia</p>
            </div>
          </div>
          {data.reachAdvantage && (
            <div className="mt-6 rounded bg-dark-bg p-4">
              <p className="text-center text-xs text-dark-textMuted mb-2">Vantagem de Envergadura</p>
              <div className="flex items-center justify-center gap-2">
                <div className={`h-3 rounded-full bg-${fighter1Color}`} style={{ 
                  width: data.reachAdvantage.fighter === 'fighter1' ? '52%' : '48%' 
                }} />
                <span className="text-xs text-dark-textMuted">+{data.reachAdvantage.inches}&quot;</span>
                <div className={`h-3 rounded-full bg-${fighter2Color}`} style={{ 
                  width: data.reachAdvantage.fighter === 'fighter2' ? '52%' : '48%' 
                }} />
              </div>
              <p className="mt-2 text-center text-sm text-dark-textMuted">
                {data.reachAdvantage.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Paths to Victory */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className={`rounded-lg border border-${fighter1Color}/30 bg-dark-card p-6`}>
          <h3 className={`mb-4 font-display text-lg uppercase text-${fighter1Color}`}>
            🥊 Caminho de Vitória: {f1Name}
          </h3>
          <ul className="space-y-3 text-dark-text">
            {data.pathsToVictory.fighter1.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`mt-1 text-${fighter1Color}`}>▸</span>
                <span><strong>{p.title}:</strong> {p.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`rounded-lg border border-${fighter2Color}/30 bg-dark-card p-6`}>
          <h3 className={`mb-4 font-display text-lg uppercase text-${fighter2Color}`}>
            🤼 Caminho de Vitória: {f2Name}
          </h3>
          <ul className="space-y-3 text-dark-text">
            {data.pathsToVictory.fighter2.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`mt-1 text-${fighter2Color}`}>▸</span>
                <span><strong>{p.title}:</strong> {p.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Danger Zones */}
      {data.dangerZones.length > 0 && (
        <div className="rounded-lg border border-ufc-gold/30 bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-ufc-gold">
            ⚠️ Zonas de Perigo
          </h3>
          <div className={`grid gap-4 md:grid-cols-${Math.min(data.dangerZones.length, 3)}`}>
            {data.dangerZones.map((dz, i) => (
              <div key={i} className="rounded bg-dark-bg p-4">
                <p className="font-bold text-dark-text mb-1">{dz.round}</p>
                <p className="text-sm text-dark-textMuted">{dz.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
