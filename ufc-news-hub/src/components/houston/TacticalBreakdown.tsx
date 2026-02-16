'use client';

export function TacticalBreakdown() {
  // Real stats from ufcstats.com (scraped Feb 2026)
  const stats = [
    { label: 'Sig. Strikes/min', strickland: 5.95, hernandez: 4.59, advantage: 'strickland' },
    { label: 'Strike Accuracy', strickland: 42, hernandez: 62, advantage: 'hernandez', suffix: '%' },
    { label: 'Str. Absorbed/min', strickland: 4.57, hernandez: 2.53, advantage: 'hernandez' },
    { label: 'Strike Defense', strickland: 60, hernandez: 49, advantage: 'strickland', suffix: '%' },
    { label: 'TD Average/15min', strickland: 0.73, hernandez: 6.46, advantage: 'hernandez' },
    { label: 'TD Accuracy', strickland: 64, hernandez: 48, advantage: 'strickland', suffix: '%' },
    { label: 'TD Defense', strickland: 76, hernandez: 68, advantage: 'strickland', suffix: '%' },
    { label: 'Sub Attempts/15min', strickland: 0.2, hernandez: 1.8, advantage: 'hernandez' },
  ];

  const radarData = [
    { axis: 'Striking', strickland: 88, hernandez: 65 },
    { axis: 'Volume', strickland: 92, hernandez: 60 },
    { axis: 'Grappling', strickland: 55, hernandez: 85 },
    { axis: 'Cardio', strickland: 85, hernandez: 80 },
    { axis: 'Defense', strickland: 78, hernandez: 62 },
    { axis: 'Finishing', strickland: 40, hernandez: 88 },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Comparison Table */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="text-center">
              <p className="font-display text-lg text-ufc-red">STRICKLAND</p>
            </div>
            <div className="px-4 text-center text-xs text-dark-textMuted uppercase tracking-wider">
              Estatistica
            </div>
            <div className="text-center">
              <p className="font-display text-lg text-blue-400">HERNANDEZ</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-dark-border">
          {stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center p-4">
              <div className={`text-center font-display text-xl ${
                stat.advantage === 'strickland' ? 'text-ufc-red' : 'text-dark-text'
              }`}>
                {stat.strickland}{stat.suffix || ''}
                {stat.advantage === 'strickland' && <span className="ml-1 text-xs">✓</span>}
              </div>
              <div className="px-4 text-center text-sm text-dark-textMuted whitespace-nowrap">
                {stat.label}
              </div>
              <div className={`text-center font-display text-xl ${
                stat.advantage === 'hernandez' ? 'text-blue-400' : 'text-dark-text'
              }`}>
                {stat.hernandez}{stat.suffix || ''}
                {stat.advantage === 'hernandez' && <span className="ml-1 text-xs">✓</span>}
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
          {radarData.map((d, i) => (
            <div key={i} className="rounded bg-dark-bg p-4">
              <p className="mb-2 text-center text-xs text-dark-textMuted uppercase tracking-wider">{d.axis}</p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ufc-red">STR</span>
                    <span className="text-dark-text">{d.strickland}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-ufc-red" style={{ width: `${d.strickland}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400">HER</span>
                    <span className="text-dark-text">{d.hernandez}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-blue-400" style={{ width: `${d.hernandez}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reach/Height Visual */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <h3 className="mb-4 text-center font-display text-lg uppercase text-dark-text">
          Tale of the Tape
        </h3>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="text-center space-y-3">
            <p className="font-display text-3xl text-dark-text">6'1"</p>
            <p className="text-xs text-dark-textMuted">Altura</p>
            <p className="font-display text-3xl text-dark-text">76"</p>
            <p className="text-xs text-dark-textMuted">Envergadura</p>
            <p className="font-display text-3xl text-dark-text">33</p>
            <p className="text-xs text-dark-textMuted">Idade</p>
            <p className="font-display text-xl text-dark-text">Xtreme Couture</p>
            <p className="text-xs text-dark-textMuted">Academia</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-16 bg-dark-border" />
            <span className="text-dark-textMuted text-xs">VS</span>
            <div className="h-px w-16 bg-dark-border" />
            <span className="text-dark-textMuted text-xs">VS</span>
            <div className="h-px w-16 bg-dark-border" />
            <span className="text-dark-textMuted text-xs">VS</span>
            <div className="h-px w-16 bg-dark-border" />
            <span className="text-dark-textMuted text-xs">VS</span>
            <div className="h-px w-16 bg-dark-border" />
          </div>
          <div className="text-center space-y-3">
            <p className="font-display text-3xl text-dark-text">6'0"</p>
            <p className="text-xs text-dark-textMuted">Altura</p>
            <p className="font-display text-3xl text-dark-text">75"</p>
            <p className="text-xs text-dark-textMuted">Envergadura</p>
            <p className="font-display text-3xl text-dark-text">32</p>
            <p className="text-xs text-dark-textMuted">Idade</p>
            <p className="font-display text-xl text-dark-text">Team Fluffy</p>
            <p className="text-xs text-dark-textMuted">Academia</p>
          </div>
        </div>
        {/* Reach Advantage Visual */}
        <div className="mt-6 rounded bg-dark-bg p-4">
          <p className="text-center text-xs text-dark-textMuted mb-2">Vantagem de Envergadura</p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 rounded-full bg-ufc-red" style={{ width: '52%' }} />
            <span className="text-xs text-dark-textMuted">+1"</span>
            <div className="h-3 rounded-full bg-blue-400" style={{ width: '48%' }} />
          </div>
          <p className="mt-2 text-center text-sm text-dark-textMuted">
            Strickland tem vantagem marginal de 1" na envergadura — suficiente para manter distância com jabs
          </p>
        </div>
      </div>

      {/* Paths to Victory */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-ufc-red/30 bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-ufc-red">
            🥊 Caminho de Vitória: Strickland
          </h3>
          <ul className="space-y-3 text-dark-text">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-ufc-red">▸</span>
              <span><strong>Manter a luta em pé:</strong> Strickland é significativamente melhor no striking com 5.62 sig. strikes/min vs 3.89. Precisa usar seu volume para pontuar rounds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-ufc-red">▸</span>
              <span><strong>Sprawl & Brawl:</strong> Com 76% de TD defense, pode neutralizar as tentativas de Hernandez e punir nas transições.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-ufc-red">▸</span>
              <span><strong>Cardio war:</strong> Levar para 5 rounds e vencer na cardio e no volume. Strickland é um dos melhores lutadores de 5 rounds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-ufc-red">▸</span>
              <span><strong>Distância:</strong> Usar 1" de reach vantagem para jabs e manter Hernandez na ponta.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-blue-400/30 bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-blue-400">
            🤼 Caminho de Vitória: Hernandez
          </h3>
          <ul className="space-y-3 text-dark-text">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">▸</span>
              <span><strong>Levar ao chão:</strong> Hernandez tem 75% de finish rate — precisa de grappling exchanges. A guilhotina e o RNC são suas armas mortais.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">▸</span>
              <span><strong>Dirty boxing:</strong> Clinch contra a grade e trabalhar de perto, anulando a vantagem de distância de Strickland.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">▸</span>
              <span><strong>Pressão no round tardio:</strong> Se a luta ficar em pé, precisa aumentar pressão nos rounds 4-5 onde pode pegar Strickland cansado.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">▸</span>
              <span><strong>Cuidado com a guilhotina:</strong> Strickland às vezes abaixa a cabeça no avanço — oportunidade perfeita para Hernandez.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Danger Zones */}
      <div className="rounded-lg border border-ufc-gold/30 bg-dark-card p-6">
        <h3 className="mb-4 font-display text-lg uppercase text-ufc-gold">
          ⚠️ Zonas de Perigo
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-1">Round 1-2</p>
            <p className="text-sm text-dark-textMuted">
              Zona de perigo para Hernandez. Strickland começa forte e com volume alto. 
              Se Hernandez não conseguir levar ao chão cedo, pode ficar atrás no scorecard.
            </p>
          </div>
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-1">Round 3</p>
            <p className="text-sm text-dark-textMuted">
              Round pivô. Se Hernandez estiver perdendo, vai forçar o grappling com urgência. 
              Momento mais provável para uma finalização se ela acontecer.
            </p>
          </div>
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-1">Round 4-5</p>
            <p className="text-sm text-dark-textMuted">
              Se a luta chegar aqui em pé, vantagem Strickland. Mas cuidado — Hernandez 
              finalizou Pereira no R5 e Dolidze no R4. Ele é perigoso até o último segundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
