'use client';

import { useState } from 'react';

interface PredictionScenario {
  method: string;
  probability: number;
  description: string;
}

export function LWFightPrediction() {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const gamrotWin: PredictionScenario[] = [
    { method: 'Decisão Unânime', probability: 18, description: 'Gamrot replica a primeira luta com controle de wrestling por 3-5 rounds' },
    { method: 'Decisão Dividida', probability: 8, description: 'Luta competitiva com rounds apertados; wrestling marginal faz a diferença' },
    { method: 'Finalização', probability: 5, description: 'Heel hook ou guilhotina após scramble no chão' },
    { method: 'TKO/KO', probability: 3, description: 'Ground and pound após domínio no wrestling' },
  ];

  const tsarukyanWin: PredictionScenario[] = [
    { method: 'TKO/KO', probability: 25, description: 'Poder superior em pé; catch shot ou acúmulo de dano' },
    { method: 'Decisão Unânime', probability: 18, description: 'Out-striking com volume e poder, defende takedowns' },
    { method: 'Finalização', probability: 12, description: 'RNC ou arm-triangle após scramble; 6 subs na carreira' },
    { method: 'Decisão Dividida', probability: 8, description: 'Luta competitiva com Tsarukyan ganhando em striking' },
  ];

  const totalGamrot = gamrotWin.reduce((a, b) => a + b.probability, 0);
  const totalTsarukyan = tsarukyanWin.reduce((a, b) => a + b.probability, 0);

  const keyFactors = [
    { factor: 'Poder de nocaute', edge: 'Tsarukyan', impact: 9, description: '0.31 KD avg vs 0.10 — Tsarukyan tem poder real para acabar lutas' },
    { factor: 'Wrestling ofensivo', edge: 'Gamrot', impact: 9, description: '5.15 TD/15min é elite; 83% TD defense fecha o wrestling' },
    { factor: 'Evolução desde 2022', edge: 'Tsarukyan', impact: 8, description: '5 vitórias seguidas vs 2 derrotas recentes para Gamrot' },
    { factor: 'Oponentes em comum', edge: 'Tsarukyan', impact: 8, description: 'Venceu Oliveira e Hooker; Gamrot perdeu para ambos' },
    { factor: 'Defesa de takedown', edge: 'Gamrot', impact: 7, description: '83% vs 75% — mas Tsarukyan melhorou dramaticamente' },
    { factor: 'Absorção de golpes', edge: 'Tsarukyan', impact: 7, description: '1.80 SA/min vs 2.96 — Gamrot absorve significativamente mais' },
    { factor: 'Envergadura', edge: 'Tsarukyan', impact: 5, description: '+2" de reach ajuda a manter distância e conectar de fora' },
    { factor: 'Experiência 5 rounds', edge: 'Even', impact: 4, description: 'Ambos mostraram cardio elite em lutas longas' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Prediction */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="bg-gradient-to-r from-green-400/10 via-dark-bg/50 to-orange-400/10 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-2">Previsão do Modelo — Revanche</p>
          <h3 className="font-display text-3xl uppercase text-dark-text md:text-4xl">
            <span className="text-orange-400">Tsarukyan</span> por TKO
          </h3>
          <p className="mt-2 text-dark-textMuted">Confiança: Moderada-Alta</p>
        </div>

        {/* Probability Bars */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-lg text-green-400">GAMROT</span>
              <span className="font-display text-2xl text-dark-text">{totalGamrot}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-dark-border overflow-hidden">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                style={{ width: `${totalGamrot}%` }}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-lg text-orange-400">TSARUKYAN</span>
              <span className="font-display text-2xl text-dark-text">{totalTsarukyan}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-dark-border overflow-hidden">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-1000"
                style={{ width: `${totalTsarukyan}%` }}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-sm text-ufc-red hover:text-ufc-redLight transition-colors"
            >
              {showBreakdown ? '▲ Esconder detalhes' : '▼ Ver breakdown completo'}
            </button>
          </div>
        </div>

        {/* Detailed Breakdown */}
        {showBreakdown && (
          <div className="border-t border-dark-border p-6 space-y-6 animate-fade-in">
            <div>
              <h4 className="font-display text-sm uppercase text-green-400 mb-3">Cenários Gamrot</h4>
              {gamrotWin.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-text">{s.method}</span>
                    <span className="text-green-400 font-bold">{s.probability}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-green-400/60" style={{ width: `${s.probability * 2}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-dark-textMuted">{s.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-display text-sm uppercase text-orange-400 mb-3">Cenários Tsarukyan</h4>
              {tsarukyanWin.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-text">{s.method}</span>
                    <span className="text-orange-400 font-bold">{s.probability}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-orange-400/60" style={{ width: `${s.probability * 2}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-dark-textMuted">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Factors Table */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-4">
          <h3 className="text-center font-display text-lg uppercase text-dark-text">
            Fatores Decisivos
          </h3>
        </div>
        <div className="divide-y divide-dark-border">
          {keyFactors.map((kf, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-dark-text">{kf.factor}</span>
                <span className={`text-sm font-bold ${
                  kf.edge === 'Gamrot' ? 'text-green-400' : kf.edge === 'Tsarukyan' ? 'text-orange-400' : 'text-dark-textMuted'
                }`}>
                  {kf.edge}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-dark-textMuted">Impacto:</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <div
                      key={j}
                      className={`h-2 w-3 rounded-sm ${
                        j < kf.impact
                          ? kf.edge === 'Gamrot' ? 'bg-green-400' : kf.edge === 'Tsarukyan' ? 'bg-orange-400' : 'bg-dark-textMuted'
                          : 'bg-dark-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-dark-textMuted">{kf.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* X-Factor */}
      <div className="rounded-lg border border-ufc-gold/50 bg-gradient-to-r from-dark-card to-dark-bg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">⚡</span>
          <h3 className="font-display text-xl uppercase text-ufc-gold">X-Factor</h3>
        </div>
        <p className="text-dark-text leading-relaxed">
          <strong className="text-ufc-gold">A evolução de Tsarukyan desde a primeira luta.</strong> Em junho de 2022, 
          Tsarukyan tinha 25 anos e era promissor mas incompleto. Desde então, nocauteou Beneil Dariush no R1, 
          venceu Charles Oliveira por decisão no UFC 300, e finalizou Dan Hooker com um arm-triangle no R2. 
          São vitórias que Gamrot não tem — aliás, Gamrot PERDEU para Hooker e foi FINALIZADO por Oliveira. 
          A questão central: o wrestling de Gamrot ainda é suficiente contra um Tsarukyan 2.0 que se tornou 
          um dos lutadores mais completos do planeta?
        </p>
        <div className="mt-4 rounded bg-dark-bg p-4">
          <p className="text-sm text-dark-textMuted">
            <strong className="text-dark-text">Por que Tsarukyan é favorito agora:</strong> Os oponentes em comum 
            contam a história completa. Tsarukyan venceu Oliveira e Hooker; Gamrot perdeu para ambos. A trajetória 
            de Tsarukyan é ascendente enquanto Gamrot tem 2 derrotas nas últimas 4 lutas. O único argumento pró-Gamrot 
            é que wrestling specialists historicamente dão trabalho para Tsarukyan — e Gamrot já provou isso uma vez.
          </p>
        </div>
        <div className="mt-4 rounded bg-dark-bg p-4">
          <p className="text-sm text-dark-textMuted">
            <strong className="text-dark-text">Aposta inteligente:</strong> Tsarukyan por finish a odds razoáveis. 
            Se as odds de Gamrot estiverem acima de +200, há valor no upset por decisão wrestling-heavy — 
            o estilo de luta que ninguém quer assistir mas que ganha lutas.
          </p>
        </div>
      </div>
    </div>
  );
}
