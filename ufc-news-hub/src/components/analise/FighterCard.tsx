'use client';

import { FighterInfo } from '@/types/analise';

interface Props {
  fighter: FighterInfo;
  accentColor?: string;
  initials: string;
}

function StatBar({ label, value, max, suffix = '', color }: { 
  label: string; value: number; max: number; suffix?: string; color: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs text-dark-textMuted mb-1">
        <span>{label}</span>
        <span className="text-dark-text font-medium">{value}{suffix}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-dark-border">
        <div className={`h-1.5 rounded-full bg-${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  );
}

export function FighterCard({ fighter, accentColor = 'ufc-red', initials }: Props) {
  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-6">
      <div className="mb-4 flex items-center gap-4">
        {fighter.imagem_url ? (
          <img 
            src={fighter.imagem_url} 
            alt={fighter.nome}
            className={`h-16 w-16 rounded-full border-2 border-${accentColor} object-cover`}
          />
        ) : (
          <div className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-${accentColor} bg-dark-border text-2xl font-bold text-dark-text`}>
            {initials}
          </div>
        )}
        <div>
          {fighter.apelido && (
            <p className={`text-xs uppercase tracking-wider text-${accentColor}`}>&quot;{fighter.apelido}&quot;</p>
          )}
          <h2 className="font-display text-2xl uppercase text-dark-text">{fighter.nome}</h2>
          {(fighter.pais || fighter.cidade) && (
            <p className="text-sm text-dark-textMuted">
              {fighter.pais && `${fighter.pais} `}{fighter.cidade || ''}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="font-display text-2xl text-dark-text">{fighter.record}</p>
          <p className="text-xs text-dark-textMuted">Record</p>
        </div>
        {fighter.ranking && (
          <div>
            <p className={`font-display text-2xl text-${accentColor}`}>{fighter.ranking}</p>
            <p className="text-xs text-dark-textMuted">Ranking</p>
          </div>
        )}
        <div>
          <p className="font-display text-2xl text-dark-text">
            {fighter.ultimasLutas.filter(l => l.result === 'W').length}/{fighter.ultimasLutas.length}
          </p>
          <p className="text-xs text-dark-textMuted">Últimas</p>
        </div>
      </div>
      
      {/* Stats */}
      {(fighter.sigStrikesPerMin || fighter.strikeAccuracy || fighter.strikeDefense || fighter.tdDefense) && (
        <div className="mt-4 space-y-2">
          {fighter.sigStrikesPerMin && <StatBar label="Sig. Strikes/min" value={fighter.sigStrikesPerMin} max={8} color={accentColor} />}
          {fighter.strikeAccuracy && <StatBar label="Strike Accuracy" value={fighter.strikeAccuracy} max={100} suffix="%" color={accentColor} />}
          {fighter.strikeDefense && <StatBar label="Strike Defense" value={fighter.strikeDefense} max={100} suffix="%" color={accentColor} />}
          {fighter.tdDefense && <StatBar label="TD Defense" value={fighter.tdDefense} max={100} suffix="%" color={accentColor} />}
        </div>
      )}

      {/* Last fights */}
      {fighter.ultimasLutas.length > 0 && (
        <div className="mt-4 rounded bg-dark-bg p-3">
          <p className="text-xs text-dark-textMuted mb-1">Últimas {fighter.ultimasLutas.length} Lutas</p>
          <div className="flex gap-1">
            {fighter.ultimasLutas.map((l, i) => (
              <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-xs font-bold ${
                l.result === 'W' ? 'bg-green-500/20 text-green-400' : 
                l.result === 'L' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>{l.result}</span>
            ))}
          </div>
          <div className="mt-2 text-xs text-dark-textMuted space-y-1">
            {fighter.ultimasLutas.map((l, i) => (
              <p key={i}>
                {l.result === 'W' ? '✅' : l.result === 'L' ? '❌' : '⬜'} {l.result} - {l.opponent} ({l.method}) {l.event}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
