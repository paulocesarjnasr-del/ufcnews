'use client';

import { ConsensoPrevisao } from '@/types';

interface ConsensoBarProps {
  consenso: ConsensoPrevisao[];
  lutador1Id: string;
  lutador2Id: string;
  totalPrevisoes: number;
}

export function ConsensoBar({
  consenso,
  lutador1Id,
  lutador2Id,
  totalPrevisoes,
}: ConsensoBarProps) {
  const lutador1Consenso = consenso.find(
    (c) => c.lutador_escolhido_id === lutador1Id
  );
  const lutador2Consenso = consenso.find(
    (c) => c.lutador_escolhido_id === lutador2Id
  );

  const percent1 = Number(lutador1Consenso?.percentual ?? 0);
  const percent2 = Number(lutador2Consenso?.percentual ?? 0);

  if (totalPrevisoes === 0) {
    return (
      <div className="text-center text-sm text-dark-textMuted">
        Seja o primeiro a fazer uma previsao!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-dark-textMuted">
        <span>Consenso da comunidade</span>
        <span>{totalPrevisoes} previsoes</span>
      </div>

      {/* Barra de progresso */}
      <div className="relative h-6 overflow-hidden rounded-full bg-dark-border">
        {/* Lado esquerdo (Lutador 1) */}
        <div
          className="absolute left-0 top-0 h-full bg-ufc-red transition-all duration-500"
          style={{ width: `${percent1}%` }}
        />

        {/* Lado direito (Lutador 2) */}
        <div
          className="absolute right-0 top-0 h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${percent2}%` }}
        />

        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <span className="text-xs font-bold text-white drop-shadow">
            {percent1.toFixed(0)}%
          </span>
          <span className="text-xs font-bold text-white drop-shadow">
            {percent2.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Nomes */}
      <div className="flex items-center justify-between text-xs">
        <span
          className={`font-medium ${
            percent1 >= percent2 ? 'text-ufc-red' : 'text-dark-textMuted'
          }`}
        >
          {lutador1Consenso?.lutador_nome || 'Lutador 1'}
          {percent1 >= percent2 && percent1 > 50 && (
            <span className="ml-1 text-ufc-gold">Favorito</span>
          )}
        </span>
        <span
          className={`font-medium ${
            percent2 > percent1 ? 'text-blue-400' : 'text-dark-textMuted'
          }`}
        >
          {percent2 > percent1 && percent2 > 50 && (
            <span className="mr-1 text-ufc-gold">Favorito</span>
          )}
          {lutador2Consenso?.lutador_nome || 'Lutador 2'}
        </span>
      </div>
    </div>
  );
}
