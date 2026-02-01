'use client';

import Link from 'next/link';
import { LutaHistoricoItem } from '@/types';

interface LutadorHistoricoProps {
  lutas: LutaHistoricoItem[];
  lutadorId: string;
}

export function LutadorHistorico({ lutas, lutadorId }: LutadorHistoricoProps) {
  if (lutas.length === 0) {
    return (
      <div className="rounded-lg border border-dark-border bg-dark-card p-6 text-center text-dark-textMuted">
        Nenhuma luta registrada
      </div>
    );
  }

  const getResultadoStyle = (resultado: string) => {
    switch (resultado) {
      case 'Vitoria':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Derrota':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-dark-border text-dark-textMuted border-dark-border';
    }
  };

  return (
    <div className="space-y-3">
      {lutas.map((luta) => (
        <div
          key={luta.id}
          className="rounded-lg border border-dark-border bg-dark-card p-4 transition-colors hover:bg-dark-cardHover"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded border px-2 py-0.5 text-xs font-bold ${getResultadoStyle(
                    luta.resultado
                  )}`}
                >
                  {luta.resultado}
                </span>
                {luta.is_titulo && (
                  <span className="rounded bg-ufc-gold px-2 py-0.5 text-xs font-bold text-dark-bg">
                    TITULO
                  </span>
                )}
              </div>

              <p className="mt-2">
                <span className="text-dark-textMuted">vs </span>
                <Link
                  href={`/lutadores/${luta.oponente.id}`}
                  className="font-display text-lg uppercase text-dark-text hover:text-ufc-red"
                >
                  {luta.oponente.nome}
                </Link>
              </p>

              {luta.metodo && (
                <p className="mt-1 text-sm text-dark-textMuted">
                  {luta.metodo}
                  {luta.round && ` - R${luta.round}`}
                  {luta.tempo && ` ${luta.tempo}`}
                </p>
              )}
            </div>

            <div className="text-right text-sm text-dark-textMuted">
              <p>{luta.evento.nome}</p>
              <p>
                {new Date(luta.evento.data).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
