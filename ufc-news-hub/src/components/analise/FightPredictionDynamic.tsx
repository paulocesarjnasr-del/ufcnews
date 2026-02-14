'use client';

import { useState } from 'react';
import { FightPredictionData, FighterInfo } from '@/types/analise';

interface Props {
  data: FightPredictionData;
  fighter1: FighterInfo;
  fighter2: FighterInfo;
  fighter1Color?: string;
  fighter2Color?: string;
}

export function FightPredictionDynamic({ 
  data, fighter1, fighter2, 
  fighter1Color = 'ufc-red', fighter2Color = 'blue-400' 
}: Props) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const f1Name = fighter1.nome.split(' ').pop() || 'Fighter 1';
  const f2Name = fighter2.nome.split(' ').pop() || 'Fighter 2';

  const totalFighter1 = data.fighter1Scenarios.reduce((a, b) => a + b.probability, 0);
  const totalFighter2 = data.fighter2Scenarios.reduce((a, b) => a + b.probability, 0);

  const winnerName = data.predictedWinner === 'fighter1' ? f1Name : f2Name;
  const winnerColor = data.predictedWinner === 'fighter1' ? fighter1Color : fighter2Color;

  return (
    <div className="space-y-6">
      {/* Main Prediction */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className={`bg-gradient-to-r from-${fighter1Color}/10 via-dark-bg/50 to-${fighter2Color}/10 p-6 text-center`}>
          <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-2">Previsão do Modelo</p>
          <h3 className="font-display text-3xl uppercase text-dark-text md:text-4xl">
            <span className={`text-${winnerColor}`}>{winnerName}</span> por {data.predictedMethod}
          </h3>
          <p className="mt-2 text-dark-textMuted">Confiança: {data.confidence}</p>
        </div>

        {/* Probability Bars */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`font-display text-lg text-${fighter1Color}`}>{f1Name.toUpperCase()}</span>
              <span className="font-display text-2xl text-dark-text">{totalFighter1}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-dark-border overflow-hidden">
              <div 
                className={`h-4 rounded-full bg-gradient-to-r from-${fighter1Color} to-${fighter1Color}/80 transition-all duration-1000`}
                style={{ width: `${totalFighter1}%` }}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`font-display text-lg text-${fighter2Color}`}>{f2Name.toUpperCase()}</span>
              <span className="font-display text-2xl text-dark-text">{totalFighter2}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-dark-border overflow-hidden">
              <div 
                className={`h-4 rounded-full bg-gradient-to-r from-${fighter2Color} to-${fighter2Color}/80 transition-all duration-1000`}
                style={{ width: `${totalFighter2}%` }}
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
              <h4 className={`font-display text-sm uppercase text-${fighter1Color} mb-3`}>Cenários {f1Name}</h4>
              {data.fighter1Scenarios.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-text">{s.method}</span>
                    <span className={`text-${fighter1Color} font-bold`}>{s.probability}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className={`h-2 rounded-full bg-${fighter1Color}/60`} style={{ width: `${s.probability * 2}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-dark-textMuted">{s.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className={`font-display text-sm uppercase text-${fighter2Color} mb-3`}>Cenários {f2Name}</h4>
              {data.fighter2Scenarios.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-text">{s.method}</span>
                    <span className={`text-${fighter2Color} font-bold`}>{s.probability}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-border">
                    <div className={`h-2 rounded-full bg-${fighter2Color}/60`} style={{ width: `${s.probability * 2}%` }} />
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
          {data.keyFactors.map((kf, i) => {
            const edgeName = kf.edge === 'fighter1' ? f1Name : f2Name;
            const edgeColor = kf.edge === 'fighter1' ? fighter1Color : fighter2Color;
            return (
              <div key={i} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-dark-text">{kf.factor}</span>
                  <span className={`text-sm font-bold text-${edgeColor}`}>
                    {edgeName}
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
                            ? `bg-${edgeColor}`
                            : 'bg-dark-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-dark-textMuted">{kf.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-Factor */}
      <div className="rounded-lg border border-ufc-gold/50 bg-gradient-to-r from-dark-card to-dark-bg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">⚡</span>
          <h3 className="font-display text-xl uppercase text-ufc-gold">X-Factor</h3>
        </div>
        <p className="text-dark-text leading-relaxed">
          <strong className="text-ufc-gold">{data.xFactor.title}</strong> {data.xFactor.description}
        </p>
        {data.xFactor.details && (
          <div className="mt-4 rounded bg-dark-bg p-4">
            <p className="text-sm text-dark-textMuted">
              <strong className="text-dark-text">{data.xFactor.details}</strong>
            </p>
          </div>
        )}
        {data.xFactor.smartBet && (
          <div className="mt-4 rounded bg-dark-bg p-4">
            <p className="text-sm text-dark-textMuted">
              <strong className="text-dark-text">Aposta inteligente:</strong> {data.xFactor.smartBet}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
