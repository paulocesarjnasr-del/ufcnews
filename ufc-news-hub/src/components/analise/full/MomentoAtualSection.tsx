'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import type { MomentoAtualSectionData, MomentoAtualFighter, RecentFight } from '@/types/analise';

interface MomentoAtualSectionProps {
  data: MomentoAtualSectionData;
}

const trendStyles: Record<MomentoAtualFighter['momentum_trend'], string> = {
  ascending: 'bg-green-500/20 text-green-400 border-green-500/30',
  descending: 'bg-red-500/20 text-red-400 border-red-500/30',
  stable: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  resilient: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const resultStyles: Record<RecentFight['result'], string> = {
  W: 'bg-green-500/20 text-green-400',
  L: 'bg-red-500/20 text-red-400',
  D: 'bg-yellow-500/20 text-yellow-400',
  NC: 'bg-gray-500/20 text-gray-400',
};

function QualityDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < score ? 'bg-ufc-gold' : 'bg-dark-border'
          }`}
        />
      ))}
    </div>
  );
}

function FightRow({ fight }: { fight: RecentFight }) {
  return (
    <div className="border-b border-dark-border/50 py-3 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            resultStyles[fight.result]
          }`}
        >
          {fight.result}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-bold text-dark-text">
              {fight.opponent}
            </span>
            <span className="shrink-0 text-xs text-dark-textMuted">
              {fight.opponent_rank}
            </span>
          </div>
          <QualityDots score={fight.quality_score} />
        </div>

        <div className="shrink-0 text-right">
          <div className="text-sm text-dark-text">{fight.method}</div>
          <div className="text-xs text-dark-textMuted">{fight.date}</div>
        </div>
      </div>

      {fight.note && (
        <p className="mt-1.5 pl-11 text-xs italic text-dark-textMuted">
          {fight.note}
        </p>
      )}
    </div>
  );
}

function FighterColumn({
  fighter,
  onOpenHistory,
}: {
  fighter: MomentoAtualFighter;
  onOpenHistory: () => void;
}) {
  const nameColor =
    fighter.color === 'red' ? 'text-ufc-red' : 'text-blue-400';

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <h3 className={`font-display text-xl uppercase ${nameColor}`}>
          {fighter.nome}
        </h3>
        <span
          className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${
            trendStyles[fighter.momentum_trend]
          }`}
        >
          {fighter.momentum_label}
        </span>
      </div>

      {/* Layoff warning */}
      {fighter.layoff_warning && (
        <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-400">
          {fighter.layoff_warning}
        </div>
      )}

      {/* Recent fights */}
      <div className="neu-inset p-4">
        {fighter.recent_fights.map((fight, i) => (
          <FightRow key={i} fight={fight} />
        ))}
      </div>

      {/* Momentum note */}
      <div className="mt-4 rounded-lg bg-dark-bg/50 p-3 text-sm leading-relaxed text-dark-textMuted">
        {fighter.momentum_note}
      </div>

      {/* Full history button */}
      {fighter.full_fight_history && fighter.full_fight_history.length > 0 && (
        <button
          onClick={onOpenHistory}
          className="neu-button mt-3 w-full px-4 py-2 text-center text-sm text-dark-textMuted hover:text-dark-text"
        >
          Ver historico completo
        </button>
      )}
    </div>
  );
}

function HistoryModal({
  fighter,
  onClose,
}: {
  fighter: MomentoAtualFighter;
  onClose: () => void;
}) {
  const fights = fighter.full_fight_history ?? [];
  const nameColor =
    fighter.color === 'red' ? 'text-ufc-red' : 'text-blue-400';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-border p-4">
          <h3 className={`font-display text-xl uppercase ${nameColor}`}>
            {fighter.nome} &mdash; Historico Completo
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-textMuted hover:bg-dark-border/50 hover:text-dark-text"
          >
            <X size={20} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(80vh - 64px)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border text-left text-xs uppercase text-dark-textMuted">
                <th className="pb-2 pr-3">Data</th>
                <th className="pb-2 pr-3">Oponente</th>
                <th className="pb-2 pr-3">Resultado</th>
                <th className="pb-2 pr-3">Metodo</th>
                <th className="pb-2">Rank</th>
              </tr>
            </thead>
            <tbody>
              {fights.map((fight, i) => (
                <tr
                  key={i}
                  className={`border-b border-dark-border/30 ${
                    i % 2 === 0 ? 'bg-dark-bg/30' : ''
                  }`}
                >
                  <td className="py-2 pr-3 text-dark-textMuted">
                    {fight.date}
                  </td>
                  <td className="py-2 pr-3 font-medium text-dark-text">
                    {fight.opponent}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        resultStyles[fight.result]
                      }`}
                    >
                      {fight.result}
                    </span>
                  </td>
                  <td className="py-2 pr-3 text-dark-textMuted">
                    {fight.method}
                  </td>
                  <td className="py-2 text-dark-textMuted">
                    {fight.opponent_rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function MomentoAtualSection({ data }: MomentoAtualSectionProps) {
  const [modalFighter, setModalFighter] = useState<MomentoAtualFighter | null>(
    null
  );

  return (
    <section>
      <SectionHeader number="02" title="Momento" accent="Atual" />

      <div className="grid gap-6 md:grid-cols-2">
        <FighterColumn
          fighter={data.fighter1}
          onOpenHistory={() => setModalFighter(data.fighter1)}
        />
        <FighterColumn
          fighter={data.fighter2}
          onOpenHistory={() => setModalFighter(data.fighter2)}
        />
      </div>

      {modalFighter && (
        <HistoryModal
          fighter={modalFighter}
          onClose={() => setModalFighter(null)}
        />
      )}
    </section>
  );
}
