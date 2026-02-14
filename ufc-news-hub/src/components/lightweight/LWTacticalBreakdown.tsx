'use client';

export function LWTacticalBreakdown() {
  const stats = [
    { label: 'Sig. Strikes/min', gamrot: 3.29, tsarukyan: 3.85, advantage: 'tsarukyan' },
    { label: 'Strike Accuracy', gamrot: 52, tsarukyan: 50, advantage: 'gamrot', suffix: '%' },
    { label: 'Str. Absorbed/min', gamrot: 2.96, tsarukyan: 1.80, advantage: 'tsarukyan' },
    { label: 'Strike Defense', gamrot: 60, tsarukyan: 55, advantage: 'gamrot', suffix: '%' },
    { label: 'TD Average/15min', gamrot: 5.15, tsarukyan: 3.26, advantage: 'gamrot' },
    { label: 'TD Accuracy', gamrot: 37, tsarukyan: 38, advantage: 'tsarukyan', suffix: '%' },
    { label: 'TD Defense', gamrot: 83, tsarukyan: 75, advantage: 'gamrot', suffix: '%' },
    { label: 'Knockdown Avg', gamrot: 0.10, tsarukyan: 0.31, advantage: 'tsarukyan' },
    { label: 'Sub Attempts/15min', gamrot: 0.10, tsarukyan: 0.10, advantage: 'even' },
    { label: 'Finish Rate', gamrot: 52, tsarukyan: 65, advantage: 'tsarukyan', suffix: '%' },
  ];

  const radarData = [
    { axis: 'Striking', gamrot: 72, tsarukyan: 82 },
    { axis: 'Wrestling', gamrot: 90, tsarukyan: 80 },
    { axis: 'Grappling', gamrot: 78, tsarukyan: 85 },
    { axis: 'Cardio', gamrot: 88, tsarukyan: 85 },
    { axis: 'Defense', gamrot: 82, tsarukyan: 70 },
    { axis: 'Power', gamrot: 65, tsarukyan: 88 },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Comparison Table */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="text-center">
              <p className="font-display text-lg text-green-400">GAMROT</p>
            </div>
            <div className="px-4 text-center text-xs text-dark-textMuted uppercase tracking-wider">
              Estatística
            </div>
            <div className="text-center">
              <p className="font-display text-lg text-orange-400">TSARUKYAN</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-dark-border">
          {stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center p-4">
              <div className={`text-center font-display text-xl ${
                stat.advantage === 'gamrot' ? 'text-green-400' : 'text-dark-text'
              }`}>
                {stat.gamrot}{stat.suffix || ''}
                {stat.advantage === 'gamrot' && <span className="ml-1 text-xs">✓</span>}
              </div>
              <div className="px-4 text-center text-sm text-dark-textMuted whitespace-nowrap">
                {stat.label}
              </div>
              <div className={`text-center font-display text-xl ${
                stat.advantage === 'tsarukyan' ? 'text-orange-400' : 'text-dark-text'
              }`}>
                {stat.tsarukyan}{stat.suffix || ''}
                {stat.advantage === 'tsarukyan' && <span className="ml-1 text-xs">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart Visual */}
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
                    <span className="text-green-400">GAM</span>
                    <span className="text-dark-text">{d.gamrot}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-green-400" style={{ width: `${d.gamrot}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-orange-400">TSA</span>
                    <span className="text-dark-text">{d.tsarukyan}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-orange-400" style={{ width: `${d.tsarukyan}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tale of the Tape */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <h3 className="mb-4 text-center font-display text-lg uppercase text-dark-text">
          Tale of the Tape
        </h3>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="text-center space-y-3">
            <p className="font-display text-3xl text-dark-text">5&apos;10&quot;</p>
            <p className="text-xs text-dark-textMuted">Altura</p>
            <p className="font-display text-3xl text-dark-text">70.5&quot;</p>
            <p className="text-xs text-dark-textMuted">Envergadura</p>
            <p className="font-display text-3xl text-dark-text">35</p>
            <p className="text-xs text-dark-textMuted">Idade</p>
            <p className="font-display text-xl text-dark-text">American Top Team</p>
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
            <p className="font-display text-3xl text-dark-text">5&apos;7&quot;</p>
            <p className="text-xs text-dark-textMuted">Altura</p>
            <p className="font-display text-3xl text-orange-400">72.5&quot;</p>
            <p className="text-xs text-dark-textMuted">Envergadura</p>
            <p className="font-display text-3xl text-orange-400">29</p>
            <p className="text-xs text-dark-textMuted">Idade</p>
            <p className="font-display text-xl text-dark-text">Syndicate MMA</p>
            <p className="text-xs text-dark-textMuted">Academia</p>
          </div>
        </div>
        <div className="mt-6 rounded bg-dark-bg p-4">
          <p className="text-center text-xs text-dark-textMuted mb-2">Vantagem de Envergadura</p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 rounded-full bg-green-400" style={{ width: '45%' }} />
            <span className="text-xs text-dark-textMuted">+2&quot;</span>
            <div className="h-3 rounded-full bg-orange-400" style={{ width: '55%' }} />
          </div>
          <p className="mt-2 text-center text-sm text-dark-textMuted">
            Tsarukyan tem 2&quot; de vantagem na envergadura apesar de ser 3&quot; mais baixo — reach excepcional para seu tamanho
          </p>
        </div>
      </div>

      {/* Common Opponent Analysis */}
      <div className="rounded-lg border border-ufc-gold/30 bg-dark-card p-6">
        <h3 className="mb-4 font-display text-lg uppercase text-ufc-gold">
          🔄 Oponentes em Comum
        </h3>
        <div className="space-y-4">
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-2">Dan Hooker</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-400 font-bold">Gamrot:</span>
                <span className="text-dark-textMuted"> L - Split Decision (UFC 305, Ago 2024)</span>
              </div>
              <div>
                <span className="text-orange-400 font-bold">Tsarukyan:</span>
                <span className="text-dark-textMuted"> W - Arm-Triangle Choke R2 (Nov 2025)</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-dark-textMuted">
              ⚡ Tsarukyan finalizou Hooker enquanto Gamrot perdeu por decisão dividida. Vantagem clara para Tsarukyan.
            </p>
          </div>
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-2">Charles Oliveira</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-400 font-bold">Gamrot:</span>
                <span className="text-dark-textMuted"> L - RNC R2 (Out 2025)</span>
              </div>
              <div>
                <span className="text-orange-400 font-bold">Tsarukyan:</span>
                <span className="text-dark-textMuted"> W - Split Decision (UFC 300, Abr 2024)</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-dark-textMuted">
              ⚡ Tsarukyan venceu Oliveira na decisão; Gamrot foi finalizado. Outro ponto para Tsarukyan.
            </p>
          </div>
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-2">Confronto Direto: Gamrot vs Tsarukyan 1</p>
            <p className="text-sm text-dark-textMuted">
              <span className="text-green-400 font-bold">Gamrot venceu por Decisão Unânime</span> — UFC on ESPN, Junho 2022. 
              Gamrot controlou com wrestling superior, completando múltiplos takedowns. 
              Porém, Tsarukyan era muito mais jovem (25 anos) e menos experiente.
            </p>
          </div>
        </div>
      </div>

      {/* Paths to Victory */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-green-400/30 bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-green-400">
            🤼 Caminho de Vitória: Gamrot
          </h3>
          <ul className="space-y-3 text-dark-text">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-green-400">▸</span>
              <span><strong>Dominância no wrestling:</strong> Com 5.15 TD/15min e 83% de defesa, Gamrot pode replicar o gameplan da primeira luta — grind wrestling por 3 ou 5 rounds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-green-400">▸</span>
              <span><strong>Controle de ritmo:</strong> Não deixar Tsarukyan soltar as mãos. Pressão constante com clinch e cage work para acumular minutos de controle.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-green-400">▸</span>
              <span><strong>Cardio war:</strong> Gamrot tem cardio elite com média de 12:09 de tempo de luta. Precisa fazer a luta ser feia e longa.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-green-400">▸</span>
              <span><strong>Leg kicks + shoots:</strong> Usar chutes baixos para setup de takedowns, estilo Khabib.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-orange-400/30 bg-dark-card p-6">
          <h3 className="mb-4 font-display text-lg uppercase text-orange-400">
            🥊 Caminho de Vitória: Tsarukyan
          </h3>
          <ul className="space-y-3 text-dark-text">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-orange-400">▸</span>
              <span><strong>Poder de nocaute:</strong> 0.31 KD avg vs 0.10 de Gamrot — Tsarukyan tem poder real para acabar a luta em pé. 9 KOs na carreira.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-orange-400">▸</span>
              <span><strong>Sprawl and brawl:</strong> Defesa de TD a 75% é sólida. Se mantiver a luta em pé, Gamrot absorve 2.96 golpes/min — vulnerável.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-orange-400">▸</span>
              <span><strong>Evolução desde 2022:</strong> 5 vitórias consecutivas incluindo Charles Oliveira e Dan Hooker. Tsarukyan de 2026 é um lutador completamente diferente.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-orange-400">▸</span>
              <span><strong>Reach advantage:</strong> +2&quot; de envergadura para manter distância e trabalhar jabs e power shots de fora.</span>
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
            <p className="font-bold text-dark-text mb-1">Round 1</p>
            <p className="text-sm text-dark-textMuted">
              Zona de perigo para Gamrot. Tsarukyan tem 8 finalizações no R1 na carreira. 
              Se Gamrot não estabelecer o wrestling cedo, pode ser pego por uma bomba.
            </p>
          </div>
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-1">Round 2-3</p>
            <p className="text-sm text-dark-textMuted">
              Rounds pivô. Se Gamrot estiver por cima no wrestling, a luta fica segura. 
              Se estiver perdendo trocação, precisa mudar o gameplan urgentemente.
            </p>
          </div>
          <div className="rounded bg-dark-bg p-4">
            <p className="font-bold text-dark-text mb-1">Championship Rounds</p>
            <p className="text-sm text-dark-textMuted">
              Se for 5 rounds, vantagem Gamrot na cardio. Mas Tsarukyan provou 
              que pode manter intensidade — finalizou Hooker no R2 e Silva no R3.
            </p>
          </div>
        </div>
      </div>

      {/* Round by Round */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <h3 className="mb-4 font-display text-lg uppercase text-dark-text">
          📊 Análise Round a Round
        </h3>
        <div className="space-y-3">
          {[
            { round: 'R1', gamrot: 45, tsarukyan: 55, note: 'Tsarukyan mais perigoso com poder de KO; Gamrot precisa sobreviver e estabelecer wrestling' },
            { round: 'R2', gamrot: 50, tsarukyan: 50, note: 'Round equilibrado — Gamrot ganha se estiver no chão, Tsarukyan se estiver em pé' },
            { round: 'R3', gamrot: 55, tsarukyan: 45, note: 'Gamrot começa a ganhar vantagem se estiver controlando com wrestling' },
            { round: 'R4', gamrot: 58, tsarukyan: 42, note: 'Cardio de Gamrot se torna fator; Tsarukyan precisa de um finish' },
            { round: 'R5', gamrot: 60, tsarukyan: 40, note: 'Se chegar aqui, Gamrot provavelmente está na frente nos scorecards' },
          ].map((r, i) => (
            <div key={i} className="rounded bg-dark-bg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-lg text-dark-text">{r.round}</span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">{r.gamrot}%</span>
                  <span className="text-dark-textMuted">—</span>
                  <span className="text-orange-400">{r.tsarukyan}%</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-dark-border overflow-hidden flex">
                <div className="h-2 bg-green-400" style={{ width: `${r.gamrot}%` }} />
                <div className="h-2 bg-orange-400" style={{ width: `${r.tsarukyan}%` }} />
              </div>
              <p className="mt-2 text-xs text-dark-textMuted">{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
