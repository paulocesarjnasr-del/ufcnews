'use client';

import Image from 'next/image';
import { LutadorExpandido } from '@/types';

interface ComparadorProps {
  lutador1: LutadorExpandido & { stats: { record: string; taxa_vitoria: number; taxa_finalizacao: number } };
  lutador2: LutadorExpandido & { stats: { record: string; taxa_vitoria: number; taxa_finalizacao: number } };
  confrontos?: { id: string; evento_nome: string; evento_data: string; vencedor_id: string | null; metodo: string | null }[];
}

export function Comparador({ lutador1, lutador2, confrontos = [] }: ComparadorProps) {
  const compararValor = (v1: number | null | undefined, v2: number | null | undefined): 1 | 2 | 0 => {
    if (!v1 && !v2) return 0;
    if (!v1) return 2;
    if (!v2) return 1;
    if (v1 > v2) return 1;
    if (v2 > v1) return 2;
    return 0;
  };

  const stats = [
    {
      label: 'Vitorias',
      v1: lutador1.vitorias || 0,
      v2: lutador2.vitorias || 0,
    },
    {
      label: 'Taxa de Vitoria',
      v1: lutador1.stats.taxa_vitoria,
      v2: lutador2.stats.taxa_vitoria,
      suffix: '%',
    },
    {
      label: 'Nocautes',
      v1: lutador1.nocautes || 0,
      v2: lutador2.nocautes || 0,
    },
    {
      label: 'Finalizacoes',
      v1: lutador1.finalizacoes || 0,
      v2: lutador2.finalizacoes || 0,
    },
    {
      label: 'Taxa de Finalizacao',
      v1: lutador1.stats.taxa_finalizacao,
      v2: lutador2.stats.taxa_finalizacao,
      suffix: '%',
    },
    {
      label: 'Ranking',
      v1: lutador1.ranking_divisao || 999,
      v2: lutador2.ranking_divisao || 999,
      invert: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Headers */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        <LutadorHeader lutador={lutador1} />
        <div className="flex items-center justify-center">
          <span className="font-display text-2xl text-dark-textMuted">VS</span>
        </div>
        <LutadorHeader lutador={lutador2} align="right" />
      </div>

      {/* Stats Comparison */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-3">
          <h3 className="text-center font-display text-lg uppercase text-dark-text">
            Comparacao de Stats
          </h3>
        </div>

        <div className="divide-y divide-dark-border">
          {stats.map((stat, index) => {
            const winner = stat.invert
              ? compararValor(stat.v2, stat.v1)
              : compararValor(stat.v1, stat.v2);
            const winnerSwapped = stat.invert
              ? winner === 1
                ? 2
                : winner === 2
                ? 1
                : 0
              : winner;

            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_auto_1fr] items-center p-4"
              >
                <div
                  className={`text-left font-display text-xl ${
                    winnerSwapped === 1 ? 'text-ufc-red' : 'text-dark-text'
                  }`}
                >
                  {stat.v1}
                  {stat.suffix || ''}
                </div>
                <div className="px-4 text-center text-sm text-dark-textMuted">
                  {stat.label}
                </div>
                <div
                  className={`text-right font-display text-xl ${
                    winnerSwapped === 2 ? 'text-blue-400' : 'text-dark-text'
                  }`}
                >
                  {stat.v2}
                  {stat.suffix || ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tale of the Tape */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-3">
          <h3 className="text-center font-display text-lg uppercase text-dark-text">
            Tale of the Tape
          </h3>
        </div>

        <div className="divide-y divide-dark-border">
          <TapeRow label="Idade" v1={lutador1.idade ? `${lutador1.idade}` : '-'} v2={lutador2.idade ? `${lutador2.idade}` : '-'} />
          <TapeRow label="Altura" v1={lutador1.altura || '-'} v2={lutador2.altura || '-'} />
          <TapeRow label="Envergadura" v1={lutador1.envergadura || '-'} v2={lutador2.envergadura || '-'} />
          <TapeRow label="Pais" v1={lutador1.pais || '-'} v2={lutador2.pais || '-'} />
          <TapeRow label="Academia" v1={lutador1.academia || '-'} v2={lutador2.academia || '-'} />
        </div>
      </div>

      {/* Confrontos Diretos */}
      {confrontos.length > 0 && (
        <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
          <div className="border-b border-dark-border bg-dark-bg/50 p-3">
            <h3 className="text-center font-display text-lg uppercase text-dark-text">
              Confrontos Diretos ({confrontos.length})
            </h3>
          </div>

          <div className="divide-y divide-dark-border">
            {confrontos.map((confronto) => (
              <div key={confronto.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {confronto.vencedor_id === lutador1.id && (
                      <span className="rounded bg-ufc-red/20 px-2 py-1 text-xs font-bold text-ufc-red">
                        V
                      </span>
                    )}
                    {confronto.vencedor_id === lutador2.id && (
                      <span className="rounded bg-red-500/20 px-2 py-1 text-xs font-bold text-red-400">
                        D
                      </span>
                    )}
                    <span className="text-dark-text">{confronto.evento_nome}</span>
                  </div>
                  <div className="text-right text-sm text-dark-textMuted">
                    {confronto.metodo && <p>{confronto.metodo}</p>}
                    <p>
                      {new Date(confronto.evento_data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LutadorHeader({
  lutador,
  align = 'left',
}: {
  lutador: LutadorExpandido & { stats: { record: string } };
  align?: 'left' | 'right';
}) {
  return (
    <div className={`flex items-center gap-3 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-dark-border">
        {lutador.imagem_url ? (
          <Image
            src={lutador.imagem_url}
            alt={lutador.nome}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-dark-border text-xl font-bold text-dark-textMuted">
            {lutador.nome.charAt(0)}
          </div>
        )}
      </div>
      <div className={align === 'right' ? 'text-right' : ''}>
        <h2 className="font-display text-lg uppercase text-dark-text">
          {lutador.nome}
        </h2>
        <p className="text-sm text-dark-textMuted">{lutador.stats.record}</p>
        {lutador.ranking_divisao && (
          <p className="text-xs text-ufc-red">#{lutador.ranking_divisao}</p>
        )}
      </div>
    </div>
  );
}

function TapeRow({ label, v1, v2 }: { label: string; v1: string; v2: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center p-4">
      <div className="text-left text-dark-text">{v1}</div>
      <div className="px-4 text-center text-sm text-dark-textMuted">{label}</div>
      <div className="text-right text-dark-text">{v2}</div>
    </div>
  );
}
