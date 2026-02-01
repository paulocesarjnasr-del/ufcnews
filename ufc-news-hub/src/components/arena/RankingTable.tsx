'use client';

import Link from 'next/link';
import { RankingPrevisor } from '@/types';

interface RankingTableProps {
  ranking: (RankingPrevisor & { posicao: number })[];
  currentUserFingerprint?: string;
  compact?: boolean;
}

export function RankingTable({
  ranking,
  currentUserFingerprint,
  compact = false,
}: RankingTableProps) {
  const getNivelColor = (nivel: string) => {
    const colors: Record<string, string> = {
      Novato: 'text-dark-textMuted',
      Amador: 'text-green-400',
      Profissional: 'text-blue-400',
      Expert: 'text-purple-400',
      Mestre: 'text-ufc-gold',
      Oraculo: 'text-ufc-red',
    };
    return colors[nivel] || 'text-dark-textMuted';
  };

  const getPosicaoStyle = (posicao: number) => {
    if (posicao === 1) return 'text-ufc-gold font-bold';
    if (posicao === 2) return 'text-gray-400 font-bold';
    if (posicao === 3) return 'text-amber-600 font-bold';
    return 'text-dark-textMuted';
  };

  const getMedal = (posicao: number) => {
    if (posicao === 1) return '🥇';
    if (posicao === 2) return '🥈';
    if (posicao === 3) return '🥉';
    return posicao.toString();
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {ranking.slice(0, 5).map((previsor) => (
          <Link
            key={previsor.id}
            href={`/arena/ranking?user=${previsor.usuario_fingerprint}`}
            className="flex items-center gap-3 rounded-lg border border-dark-border bg-dark-card p-3 transition-colors hover:bg-dark-cardHover"
          >
            <span className={`w-6 text-center ${getPosicaoStyle(previsor.posicao)}`}>
              {getMedal(previsor.posicao)}
            </span>
            <div className="flex-1">
              <p className="font-medium text-dark-text">{previsor.usuario_nome}</p>
              <p className="text-xs text-dark-textMuted">
                {previsor.acertos_vencedor ?? 0}/{previsor.total_previsoes ?? 0} acertos
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-ufc-red">{previsor.pontos_total}</p>
              <p className="text-xs text-dark-textMuted">pts</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-border text-left text-sm text-dark-textMuted">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Previsor</th>
            <th className="px-4 py-3 text-center">Previsoes</th>
            <th className="px-4 py-3 text-center">Acertos</th>
            <th className="px-4 py-3 text-center">Taxa</th>
            <th className="px-4 py-3 text-center">Sequencia</th>
            <th className="px-4 py-3 text-right">Pontos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((previsor) => (
            <tr
              key={previsor.id}
              className={`border-b border-dark-border transition-colors hover:bg-dark-cardHover ${
                currentUserFingerprint === previsor.usuario_fingerprint
                  ? 'bg-ufc-red/10'
                  : ''
              }`}
            >
              <td className={`px-4 py-3 ${getPosicaoStyle(previsor.posicao)}`}>
                {getMedal(previsor.posicao)}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/arena/ranking?user=${previsor.usuario_fingerprint}`}
                  className="group"
                >
                  <p className="font-medium text-dark-text transition-colors group-hover:text-ufc-red">
                    {previsor.usuario_nome}
                    {currentUserFingerprint === previsor.usuario_fingerprint && (
                      <span className="ml-2 text-xs text-ufc-red">(Voce)</span>
                    )}
                  </p>
                  <p className={`text-xs ${getNivelColor(previsor.nivel)}`}>
                    {previsor.nivel}
                  </p>
                </Link>
              </td>
              <td className="px-4 py-3 text-center text-dark-textMuted">
                {previsor.total_previsoes ?? 0}
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-green-400">{previsor.acertos_vencedor ?? 0}</span>
                <span className="text-dark-textMuted">
                  /{previsor.total_previsoes ?? 0}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded px-2 py-0.5 text-sm font-medium ${
                    Number(previsor.taxa_acerto ?? 0) >= 70
                      ? 'bg-green-500/20 text-green-400'
                      : Number(previsor.taxa_acerto ?? 0) >= 50
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {Number(previsor.taxa_acerto ?? 0).toFixed(0)}%
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                {(previsor.sequencia_atual ?? 0) > 0 && (
                  <span className="text-green-400">
                    {previsor.sequencia_atual}🔥
                  </span>
                )}
                {(previsor.melhor_sequencia ?? 0) > 0 && (
                  <span className="ml-1 text-xs text-dark-textMuted">
                    (max: {previsor.melhor_sequencia})
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <span className="font-display text-xl text-ufc-red">
                  {previsor.pontos_total}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
