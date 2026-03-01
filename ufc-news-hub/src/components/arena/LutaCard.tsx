'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import FighterImage from '@/components/ui/FighterImage';
import type { LutaComLutadores, Lutador, Previsao } from '@/types';
import { PrevisaoForm } from './PrevisaoForm';
import { ConsensoBar } from './ConsensoBar';

interface LutaCardProps {
  luta: LutaComLutadores;
  userPrevisao?: Previsao | null;
  fingerprint: string;
  userName: string;
  onPrevisaoSubmit?: (previsao: Previsao) => void;
  showForm?: boolean;
}

export function LutaCard({
  luta,
  userPrevisao,
  fingerprint,
  userName,
  onPrevisaoSubmit,
  showForm = true,
}: LutaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localPrevisao, setLocalPrevisao] = useState<Previsao | null>(
    userPrevisao || null
  );

  const isFinished = luta.status === 'finalizada';
  const canPredict = luta.status === 'agendada';
  const displayRounds = (luta.tipo === 'main_event' || luta.is_titulo) ? 5 : 3;

  const handlePrevisaoSuccess = (previsao: Previsao) => {
    setLocalPrevisao(previsao);
    onPrevisaoSubmit?.(previsao);
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      main_event: 'MAIN EVENT',
      co_main: 'CO-MAIN EVENT',
      card_principal: 'CARD PRINCIPAL',
      preliminar: 'PRELIMINAR',
      early_prelim: 'EARLY PRELIM',
    };
    return labels[tipo] || tipo.toUpperCase();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-dark-border bg-dark-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border bg-dark-bg/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${
              luta.tipo === 'main_event'
                ? 'bg-ufc-red text-white'
                : luta.tipo === 'co_main'
                ? 'bg-ufc-gold text-dark-bg'
                : 'bg-dark-border text-dark-textMuted'
            }`}
          >
            {getTipoLabel(luta.tipo)}
          </span>
          {luta.is_titulo && (
            <span className="rounded bg-ufc-gold px-2 py-0.5 text-xs font-bold uppercase text-dark-bg">
              TITULO
            </span>
          )}
        </div>
        <span className="text-xs text-dark-textMuted">
          {luta.categoria_peso} - {displayRounds} rounds
        </span>
      </div>

      {/* Lutadores */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-4">
        {/* Lutador 1 */}
        <LutadorDisplay
          lutador={luta.lutador1}
          isWinner={isFinished && luta.vencedor_id === luta.lutador1.id}
          isLoser={isFinished && luta.vencedor_id === luta.lutador2.id}
          isSelected={localPrevisao?.lutador_escolhido_id === luta.lutador1.id}
          align="left"
        />

        {/* VS */}
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl text-dark-textMuted">VS</span>
          {isFinished && luta.metodo && (
            <div className="mt-1 text-center">
              <span className="text-xs text-ufc-red">{luta.metodo}</span>
              {luta.round_final && (
                <span className="block text-xs text-dark-textMuted">
                  R{luta.round_final} {luta.tempo_final}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Lutador 2 */}
        <LutadorDisplay
          lutador={luta.lutador2}
          isWinner={isFinished && luta.vencedor_id === luta.lutador2.id}
          isLoser={isFinished && luta.vencedor_id === luta.lutador1.id}
          isSelected={localPrevisao?.lutador_escolhido_id === luta.lutador2.id}
          align="right"
        />
      </div>

      {/* Consenso */}
      {luta.consenso && luta.consenso.length > 0 && (
        <div className="border-t border-dark-border px-4 py-3">
          <ConsensoBar
            consenso={luta.consenso}
            lutador1Id={luta.lutador1.id}
            lutador2Id={luta.lutador2.id}
            totalPrevisoes={luta.total_previsoes || 0}
          />
        </div>
      )}

      {/* Previsao do usuario */}
      {localPrevisao && (
        <div className="border-t border-dark-border bg-dark-bg/30 px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-dark-textMuted">Sua previsao:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-dark-text">
                {localPrevisao.lutador_escolhido_id === luta.lutador1.id
                  ? luta.lutador1.nome
                  : luta.lutador2.nome}
              </span>
              {localPrevisao.metodo_previsto && (
                <span className="rounded bg-dark-border px-2 py-0.5 text-xs text-dark-textMuted">
                  {localPrevisao.metodo_previsto}
                </span>
              )}
              {localPrevisao.round_previsto && (
                <span className="rounded bg-dark-border px-2 py-0.5 text-xs text-dark-textMuted">
                  R{localPrevisao.round_previsto}
                </span>
              )}
              {isFinished && (
                <span
                  className={`rounded px-2 py-0.5 text-xs font-bold ${
                    localPrevisao.acertou_vencedor
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {localPrevisao.acertou_vencedor ? '+' : ''}
                  {localPrevisao.pontos_ganhos} pts
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form de previsao */}
      {canPredict && showForm && !localPrevisao && (
        <div className="border-t border-dark-border p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-center gap-2 rounded bg-ufc-red px-4 py-2 font-bold text-white transition-colors hover:bg-ufc-redLight"
          >
            Fazer Previsao
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}

      {isExpanded && canPredict && (
        <div className="border-t border-dark-border bg-dark-bg/30 p-4">
          <PrevisaoForm
            luta={luta}
            fingerprint={fingerprint}
            userName={userName}
            onSuccess={handlePrevisaoSuccess}
          />
        </div>
      )}
    </div>
  );
}

interface LutadorDisplayProps {
  lutador: Lutador;
  isWinner?: boolean;
  isLoser?: boolean;
  isSelected?: boolean;
  align: 'left' | 'right';
}

function LutadorDisplay({
  lutador,
  isWinner,
  isLoser,
  isSelected,
  align,
}: LutadorDisplayProps) {
  const record = `${lutador.vitorias ?? 0}-${lutador.derrotas ?? 0}-${lutador.empates ?? 0}`;

  return (
    <div
      className={`flex items-center gap-3 ${
        align === 'right' ? 'flex-row-reverse text-right' : ''
      } ${isLoser ? 'opacity-60' : ''}`}
    >
      <div
        className={`relative h-16 w-16 overflow-hidden rounded-full border-2 ${
          isWinner
            ? 'border-green-500'
            : isSelected
            ? 'border-ufc-red'
            : 'border-dark-border'
        }`}
      >
        {lutador.imagem_url ? (
          <FighterImage
            src={lutador.imagem_url}
            alt={lutador.nome}
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e] text-xl font-bold text-white/40 select-none">
            {lutador.nome.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()}
          </div>
        )}
        {isWinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/30">
            <Check className="h-8 w-8 text-green-400" strokeWidth={3} />
          </div>
        )}
      </div>
      <div>
        <h4 className="font-display text-lg uppercase text-dark-text">
          {lutador.nome}
        </h4>
        {lutador.apelido && (
          <p className="text-xs text-ufc-red">"{lutador.apelido}"</p>
        )}
        <p className="text-xs text-dark-textMuted">{record}</p>
        {lutador.pais && (
          <p className="text-xs text-dark-textMuted">{lutador.pais}</p>
        )}
      </div>
    </div>
  );
}
