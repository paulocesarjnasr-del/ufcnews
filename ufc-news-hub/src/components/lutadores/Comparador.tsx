'use client';

import FighterImage from '@/components/ui/FighterImage';
import { LutadorExpandido } from '@/types';

interface FighterStats {
  record: string;
  taxa_vitoria: number;
  taxa_finalizacao: number;
  ko_ratio: number;
  sub_ratio: number;
  dec_ratio: number;
}

interface ComparadorProps {
  lutador1: LutadorExpandido & { stats: FighterStats };
  lutador2: LutadorExpandido & { stats: FighterStats };
  confrontos?: { id: string; evento_nome: string; evento_data: string; vencedor_id: string | null; metodo: string | null }[];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
      label: 'Vitórias',
      v1: lutador1.vitorias || 0,
      v2: lutador2.vitorias || 0,
    },
    {
      label: 'Derrotas',
      v1: lutador1.derrotas || 0,
      v2: lutador2.derrotas || 0,
      invert: true,
    },
    {
      label: 'Taxa de Vitória',
      v1: lutador1.stats.taxa_vitoria,
      v2: lutador2.stats.taxa_vitoria,
      suffix: '%',
    },
    {
      label: 'Nocautes (KO/TKO)',
      v1: lutador1.nocautes || 0,
      v2: lutador2.nocautes || 0,
    },
    {
      label: 'Vitórias por KO',
      v1: lutador1.stats.ko_ratio,
      v2: lutador2.stats.ko_ratio,
      suffix: '%',
    },
    {
      label: 'Finalizações (SUB)',
      v1: lutador1.finalizacoes || 0,
      v2: lutador2.finalizacoes || 0,
    },
    {
      label: 'Vitórias por SUB',
      v1: lutador1.stats.sub_ratio,
      v2: lutador2.stats.sub_ratio,
      suffix: '%',
    },
    {
      label: 'Vitórias por Decisão',
      v1: lutador1.stats.dec_ratio,
      v2: lutador2.stats.dec_ratio,
      suffix: '%',
    },
    {
      label: 'Ranking',
      v1: lutador1.ranking_divisao ?? 999,
      v2: lutador2.ranking_divisao ?? 999,
      invert: true,
    },
  ];

  // Advanced striking & grappling stats
  const l1 = lutador1 as unknown as Record<string, unknown>;
  const l2 = lutador2 as unknown as Record<string, unknown>;

  const advancedStats = [
    {
      label: 'Strikes por Min',
      v1: l1.slpm as number | null,
      v2: l2.slpm as number | null,
      decimals: 2,
    },
    {
      label: 'Precisão de Strike',
      v1: l1.str_acc as number | null,
      v2: l2.str_acc as number | null,
      suffix: '%',
    },
    {
      label: 'Strikes Absorvidos/Min',
      v1: l1.sapm as number | null,
      v2: l2.sapm as number | null,
      decimals: 2,
      invert: true,
    },
    {
      label: 'Defesa de Strike',
      v1: l1.str_def as number | null,
      v2: l2.str_def as number | null,
      suffix: '%',
    },
    {
      label: 'Takedowns/15min',
      v1: l1.td_avg as number | null,
      v2: l2.td_avg as number | null,
      decimals: 2,
    },
    {
      label: 'Precisão de Takedown',
      v1: l1.td_acc as number | null,
      v2: l2.td_acc as number | null,
      suffix: '%',
    },
    {
      label: 'Defesa de Takedown',
      v1: l1.td_def as number | null,
      v2: l2.td_def as number | null,
      suffix: '%',
    },
    {
      label: 'Tentativas de SUB/15min',
      v1: l1.sub_avg as number | null,
      v2: l2.sub_avg as number | null,
      decimals: 1,
    },
  ];

  const hasAdvancedStats = advancedStats.some(s => s.v1 !== null || s.v2 !== null);

  return (
    <div className="space-y-6">
      {/* Headers */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        <LutadorHeader lutador={lutador1} />
        <div className="flex items-center justify-center">
          <div className="relative">
            <span className="font-display text-3xl text-dark-textMuted">VS</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-ufc-red rounded-full" />
          </div>
        </div>
        <LutadorHeader lutador={lutador2} align="right" />
      </div>

      {/* Tale of the Tape */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-gradient-to-r from-ufc-red/10 via-dark-bg/50 to-blue-500/10 p-3">
          <h3 className="text-center font-display text-lg uppercase text-dark-text">
            Tale of the <span className="text-ufc-red">Tape</span>
          </h3>
        </div>

        <div className="divide-y divide-dark-border">
          <TapeRow label="Idade" v1={lutador1.idade ? `${lutador1.idade} anos` : '-'} v2={lutador2.idade ? `${lutador2.idade} anos` : '-'} />
          <TapeRow label="Altura" v1={lutador1.altura || '-'} v2={lutador2.altura || '-'} />
          <TapeRow label="Envergadura" v1={lutador1.envergadura || '-'} v2={lutador2.envergadura || '-'} />
          <TapeRow
            label="Stance"
            v1={typeof l1.stance === 'string' && l1.stance ? l1.stance : '-'}
            v2={typeof l2.stance === 'string' && l2.stance ? l2.stance : '-'}
            highlight
          />
          <TapeRow
            label="Estilo"
            v1={lutador1.estilo_luta || '-'}
            v2={lutador2.estilo_luta || '-'}
            highlight
          />
          <TapeRow label="Academia" v1={lutador1.academia || '-'} v2={lutador2.academia || '-'} />
          <TapeRow label="Cidade" v1={lutador1.cidade_natal || '-'} v2={lutador2.cidade_natal || '-'} />
          <TapeRow label="País" v1={lutador1.pais || '-'} v2={lutador2.pais || '-'} />
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
        <div className="border-b border-dark-border bg-dark-bg/50 p-3">
          <h3 className="text-center font-display text-lg uppercase text-dark-text">
            Comparação de <span className="text-ufc-red">Stats</span>
          </h3>
        </div>

        <div className="divide-y divide-dark-border">
          {stats.map((stat, index) => {
            const winner = stat.invert
              ? compararValor(stat.v2, stat.v1)
              : compararValor(stat.v1, stat.v2);
            const winnerSwapped = stat.invert
              ? winner === 1 ? 2 : winner === 2 ? 1 : 0
              : winner;

            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_auto_1fr] items-center p-4"
              >
                <div className="text-left">
                  <span
                    className={`font-display text-xl inline-block px-2 py-0.5 rounded ${
                      winnerSwapped === 1
                        ? 'text-emerald-400 bg-emerald-400/10'
                        : winnerSwapped === 2
                        ? 'text-red-400 bg-red-400/5'
                        : 'text-dark-text'
                    }`}
                  >
                    {stat.v1}{stat.suffix || ''}
                  </span>
                </div>
                <div className="px-4 text-center text-sm text-dark-textMuted min-w-[140px]">
                  {stat.label}
                </div>
                <div className="text-right">
                  <span
                    className={`font-display text-xl inline-block px-2 py-0.5 rounded ${
                      winnerSwapped === 2
                        ? 'text-emerald-400 bg-emerald-400/10'
                        : winnerSwapped === 1
                        ? 'text-red-400 bg-red-400/5'
                        : 'text-dark-text'
                    }`}
                  >
                    {stat.v2}{stat.suffix || ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced Stats */}
      {hasAdvancedStats && (
        <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
          <div className="border-b border-dark-border bg-dark-bg/50 p-3">
            <h3 className="text-center font-display text-lg uppercase text-dark-text">
              Estatísticas <span className="text-ufc-red">Avançadas</span>
            </h3>
          </div>

          <div className="divide-y divide-dark-border">
            {advancedStats.map((stat, index) => {
              if (stat.v1 === null && stat.v2 === null) return null;
              const winner = stat.invert
                ? compararValor(stat.v2, stat.v1)
                : compararValor(stat.v1, stat.v2);
              const winnerSwapped = stat.invert
                ? winner === 1 ? 2 : winner === 2 ? 1 : 0
                : winner;

              const formatVal = (v: number | null) => {
                if (v === null || v === undefined) return '-';
                if (stat.decimals !== undefined) return v.toFixed(stat.decimals);
                return String(Math.round(v));
              };

              return (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto_1fr] items-center p-4"
                >
                  <div className="text-left">
                    <span
                      className={`font-display text-xl inline-block px-2 py-0.5 rounded ${
                        winnerSwapped === 1
                          ? 'text-emerald-400 bg-emerald-400/10'
                          : winnerSwapped === 2
                          ? 'text-red-400 bg-red-400/5'
                          : 'text-dark-text'
                      }`}
                    >
                      {formatVal(stat.v1)}{stat.suffix || ''}
                    </span>
                  </div>
                  <div className="px-4 text-center text-sm text-dark-textMuted min-w-[140px]">
                    {stat.label}
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-display text-xl inline-block px-2 py-0.5 rounded ${
                        winnerSwapped === 2
                          ? 'text-emerald-400 bg-emerald-400/10'
                          : winnerSwapped === 1
                          ? 'text-red-400 bg-red-400/5'
                          : 'text-dark-text'
                      }`}
                    >
                      {formatVal(stat.v2)}{stat.suffix || ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confrontos Diretos */}
      {confrontos.length > 0 && (
        <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
          <div className="border-b border-dark-border bg-dark-bg/50 p-3">
            <h3 className="text-center font-display text-lg uppercase text-dark-text">
              Confrontos <span className="text-ufc-red">Diretos</span> ({confrontos.length})
            </h3>
          </div>

          <div className="divide-y divide-dark-border">
            {confrontos.map((confronto) => (
              <div key={confronto.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {confronto.vencedor_id === lutador1.id && (
                      <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs font-bold text-emerald-400">
                        V
                      </span>
                    )}
                    {confronto.vencedor_id === lutador2.id && (
                      <span className="rounded bg-red-500/20 px-2 py-1 text-xs font-bold text-red-400">
                        D
                      </span>
                    )}
                    {!confronto.vencedor_id && (
                      <span className="rounded bg-dark-border px-2 py-1 text-xs font-bold text-dark-textMuted">
                        NC
                      </span>
                    )}
                    <span className="text-dark-text">{confronto.evento_nome}</span>
                  </div>
                  <div className="text-right text-sm text-dark-textMuted">
                    {confronto.metodo && <p>{confronto.metodo}</p>}
                    <p>
                      {confronto.evento_data && !isNaN(new Date(confronto.evento_data).getTime()) ? new Date(confronto.evento_data).toLocaleDateString('pt-BR') : '—'}
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
  const initials = getInitials(lutador.nome);

  return (
    <div className={`flex items-center gap-3 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="relative h-20 w-20 overflow-hidden rounded-full border-3 border-dark-border shadow-lg">
        {lutador.imagem_url ? (
          <FighterImage
            src={lutador.imagem_url}
            alt={lutador.nome}
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e]">
            <span className="text-2xl font-bold text-white/35 select-none">
              {initials}
            </span>
          </div>
        )}
      </div>
      <div className={align === 'right' ? 'text-right' : ''}>
        <h2 className="font-display text-lg uppercase text-dark-text leading-tight">
          {lutador.nome}
        </h2>
        <p className="text-sm text-dark-textMuted font-mono">{lutador.stats.record}</p>
        {lutador.ranking_divisao !== null && lutador.ranking_divisao !== undefined && (
          <span className="inline-block mt-0.5 rounded bg-ufc-red px-1.5 py-0.5 text-xs font-bold text-white">
            {lutador.ranking_divisao === 0 ? 'C' : `#${lutador.ranking_divisao}`}
          </span>
        )}
        {lutador.categoria_peso && (
          <p className="text-xs text-dark-textMuted mt-0.5">{lutador.categoria_peso}</p>
        )}
      </div>
    </div>
  );
}

function TapeRow({
  label,
  v1,
  v2,
  highlight,
}: {
  label: string;
  v1: string;
  v2: string;
  highlight?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center p-4 ${highlight ? 'bg-dark-bg/30' : ''}`}>
      <div className={`text-left ${highlight ? 'font-medium text-ufc-red' : 'text-dark-text'}`}>
        {v1}
      </div>
      <div className="px-4 text-center text-sm text-dark-textMuted min-w-[120px]">
        {label}
      </div>
      <div className={`text-right ${highlight ? 'font-medium text-blue-400' : 'text-dark-text'}`}>
        {v2}
      </div>
    </div>
  );
}
