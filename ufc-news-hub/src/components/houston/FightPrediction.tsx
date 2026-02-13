'use client';

import { useState } from 'react';

interface PredictionScenario {
  method: string;
  probability: number;
  description: string;
}

export function FightPrediction() {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const stricklandWin: PredictionScenario[] = [
    { method: 'Decisão Unânime', probability: 35, description: 'Strickland outstrikes por 5 rounds com volume superior' },
    { method: 'Decisão Dividida', probability: 10, description: 'Luta competitiva com rounds apertados' },
    { method: 'TKO/KO', probability: 7, description: 'Acumula dano no striking e para Hernandez' },
  ];

  const hernandezWin: PredictionScenario[] = [
    { method: 'Finalização', probability: 22, description: 'Guilhotina ou RNC após scramble no chão' },
    { method: 'Decisão Unânime', probability: 10, description: 'Controle de grappling e top position' },
    { method: 'TKO/KO', probability: 8, description: 'Catch shot ou ground and pound após takedown' },
    { method: 'Decisão Dividida', probability: 5, description: 'Mix de striking e grappling competitivo' },
  ];

  const otherOutcomes = [
    { method: 'Draw/NC', probability: 3, description: 'Empate ou no contest' },
  ];

  const totalStrickland = stricklandWin.reduce((a, b) => a + b.probability, 0);
  const totalHernandez = hernandezWin.reduce((a, b) => a + b.probability, 0);

  const keyFactors = [
    { factor: 'Volume de striking', edge: 'Strickland', impact: 9, description: 'Strickland lança 44% mais golpes significativos por minuto' },
    { factor: 'Grappling ofensivo', edge: 'Hernandez', impact: 8, description: '9 finalizações na carreira, guilhotina letal' },
    { factor: 'Defesa de takedown', edge: 'Strickland', impact: 8, description: '76% TD defense é elite; difícil de derrubar' },
    { factor: 'Sequência/Momentum', edge: 'Hernandez', impact: 7, description: '8 vitórias seguidas vs derrota recente' },
    { factor: 'Experiência em 5 rounds', edge: 'Strickland', impact: 7, description: 'Ex-campeão com múltiplas lutas de 5 rounds' },
    { factor: 'Finish ability', edge: 'Hernandez', impact: 6, description: '75% finish rate vs 38% de Strickland' },
    { factor: 'Reach advantage', edge: 'Strickland', impact: 4, description: '+1" não é massivo mas ajuda no jab game' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Prediction */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="bg-gradient-to-r from-ufc-red/10 via-dark-bg/50 to-blue-400/10 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-2">Previsão do Modelo</p>
          <h3 className="font-display text-3xl uppercase text-dark-text md:text-4xl">
            <span className="text-ufc-red">Strickland</span> por Decisão
          </h3>
          <p className="mt-2 text-dark-textMuted">Confiança: Alta</p>
        </div>

        {/* Probability Bars */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-lg text-ufc-red">STRICKLAND</span>
              <span className="font-display text-2xl text-dark-text">{totalStrickland}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-dark-border overflow-hidden">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-ufc-red to-ufc-redLight transition-all duration-1000"
                style={{ width: `${totalStrickland}%` }}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-lg text-blue-400">HERNANDEZ</span>
              <span className="font-display text-2xl text-dark-text">{totalHernandez}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-dark-border overflow-hidden">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
                style={{ width: `${totalHernandez}%` }}
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
              <h4 className="font-display text-sm uppercase text-ufc-red mb-3">Cenários Strickland</h4>
              {stricklandWin.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-text">{s.method}</span>
                    <span className="text-ufc-red font-bold">{s.probability}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-ufc-red/60" style={{ width: `${s.probability * 2}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-dark-textMuted">{s.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-display text-sm uppercase text-blue-400 mb-3">Cenários Hernandez</h4>
              {hernandezWin.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-text">{s.method}</span>
                    <span className="text-blue-400 font-bold">{s.probability}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className="h-2 rounded-full bg-blue-400/60" style={{ width: `${s.probability * 2}%` }} />
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
                  kf.edge === 'Strickland' ? 'text-ufc-red' : 'text-blue-400'
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
                          ? kf.edge === 'Strickland' ? 'bg-ufc-red' : 'bg-blue-400'
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
          <strong className="text-ufc-gold">A guilhotina de Hernandez.</strong> Com 5 vitórias por guilhotina na 
          carreira, Hernandez possui uma das guilhotinas mais perigosas do middleweight. Strickland tem o hábito 
          de avançar com a cabeça baixa quando pressiona — exatamente o tipo de entrada que Hernandez precisa. 
          Se Strickland cometer esse erro uma vez no momento errado, a luta pode acabar instantaneamente. 
          Este é o único fator que impede a probabilidade de Strickland de ultrapassar 60%.
        </p>
        <div className="mt-4 rounded bg-dark-bg p-4">
          <p className="text-sm text-dark-textMuted">
            <strong className="text-dark-text">Round mais provável para finalização:</strong> Round 3 (se Hernandez 
            estiver perdendo nos scorecards e forçar o grappling com urgência) ou Round 4 (fadiga acumulada de Strickland 
            após absorver takedown attempts).
          </p>
        </div>
        <div className="mt-4 rounded bg-dark-bg p-4">
          <p className="text-sm text-dark-textMuted">
            <strong className="text-dark-text">Aposta inteligente:</strong> Strickland por decisão a odds favoráveis, 
            com uma small stake em Hernandez por finalização como hedge. O value está em Hernandez se as odds 
            estiverem muito desfavoráveis (+250 ou mais).
          </p>
        </div>
      </div>
    </div>
  );
}
