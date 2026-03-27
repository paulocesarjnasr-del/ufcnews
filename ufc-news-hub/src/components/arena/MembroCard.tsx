'use client';

import { Link } from '@/i18n/routing';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { NIVEL_CONFIG, type MembroLiga } from '@/types/arena';
import { formatUltimoAcesso } from '@/lib/arena/format';

import { useTranslations } from 'next-intl';
// ═══════════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════════

interface MembroCardProps {
  membro: MembroLiga;
  isCurrentUser: boolean;
  showPicksDetail: boolean;
  posicao: number;
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function MembroCard({ membro, isCurrentUser, showPicksDetail, posicao }: MembroCardProps) {
  const t = useTranslations('arena');
  const [expanded, setExpanded] = useState(false);

  const nivelKey = (membro.nivel ?? 'iniciante') as keyof typeof NIVEL_CONFIG;
  const nivelInfo = NIVEL_CONFIG[nivelKey] ?? NIVEL_CONFIG.iniciante;

  const { text: accessText, isOnline } = formatUltimoAcesso(membro.ultimo_acesso);

  const hasPicksDetail =
    showPicksDetail &&
    membro.picks_status === 'done' &&
    Array.isArray(membro.picks_data) &&
    membro.picks_data.length > 0;

  const displayName = membro.display_name ?? membro.username;
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div
      className={`neu-card p-3 rounded-xl transition-all ${
        isCurrentUser ? 'border border-ufc-red/40' : 'border border-dark-border'
      }`}
    >
      {/* ── Main row ── */}
      <div className="flex items-center gap-3">
        {/* Position */}
        <span className="text-dark-textMuted text-sm font-mono w-5 text-center shrink-0">
          {posicao}
        </span>

        {/* Avatar */}
        <Link
          href={`/arena/perfil/${membro.username}`}
          className="shrink-0"
          aria-label={`Perfil de ${displayName}`}
        >
          {membro.avatar_url ? (
            <img
              src={membro.avatar_url}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-ufc-red transition-all"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display text-lg hover:ring-2 hover:ring-ufc-red transition-all"
              style={{ backgroundColor: nivelInfo.cor }}
            >
              {avatarLetter}
            </div>
          )}
        </Link>

        {/* Name + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-white font-semibold text-sm truncate">
              {displayName}
            </span>
            {isCurrentUser && (
              <span className="text-xs bg-dark-card text-dark-textMuted px-1.5 py-0.5 rounded">
                {t('you_badge')}
              </span>
            )}
            {membro.is_admin && (
              <span className="text-xs bg-ufc-red text-white px-1.5 py-0.5 rounded font-semibold">
                {t('creator_badge')}
              </span>
            )}
          </div>

          {/* Level + online status */}
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs" title={nivelKey}>
              {nivelInfo.icone}{' '}
              <span style={{ color: nivelInfo.cor }} className="font-medium capitalize">
                {nivelKey}
              </span>
            </span>

            <span className="text-dark-textMuted text-xs">·</span>

            {/* Online status */}
            {isOnline ? (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                {t('online_label')}
              </span>
            ) : (
              <span className="text-xs text-dark-textMuted">{accessText}</span>
            )}
          </div>
        </div>

        {/* Picks chip */}
        {membro.picks_status !== null && (
          <div className="shrink-0">
            {membro.picks_status === 'done' ? (
              <span className="text-xs bg-green-900/50 text-green-400 border border-green-700 px-2 py-0.5 rounded-full">
                {t('picks_done')}
              </span>
            ) : (
              <span className="text-xs bg-yellow-900/50 text-yellow-400 border border-yellow-700 px-2 py-0.5 rounded-full">
                {t('pending')}
              </span>
            )}
          </div>
        )}

        {/* Points */}
        <div className="shrink-0 text-right">
          {membro.evento_pontos !== undefined ? (
            <>
              <span className="text-ufc-gold font-display text-lg leading-none">
                {membro.evento_pontos}
              </span>
              <span className="text-dark-textMuted text-xs ml-0.5">{t('pts_label')}</span>
              <div className="text-[10px] text-dark-textMuted">
                {membro.evento_acertos}/{membro.evento_total_lutas} {t('correct_count')}
              </div>
            </>
          ) : (
            <>
              <span className="text-ufc-gold font-display text-lg leading-none">
                {membro.pontos_temporada}
              </span>
              <span className="text-dark-textMuted text-xs ml-0.5">{t('pts_label')}</span>
            </>
          )}
        </div>

        {/* Expand chevron */}
        {hasPicksDetail && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 text-dark-textMuted hover:text-white transition-colors"
            aria-label={expanded ? 'Recolher picks' : 'Ver picks'}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {/* ── Picks detail (expandable) ── */}
      {hasPicksDetail && expanded && (
        <div className="mt-3 pt-3 border-t border-dark-border space-y-1.5">
          {membro.picks_data!.map((pick) => (
            <div
              key={pick.luta_id}
              className="flex items-center justify-between text-xs text-dark-textMuted"
            >
              <span className="text-white font-medium">{pick.vencedor_nome}</span>
              <div className="flex gap-2">
                {pick.metodo_previsto && (
                  <span className="bg-dark-card px-1.5 py-0.5 rounded">{pick.metodo_previsto}</span>
                )}
                {pick.round_previsto && (
                  <span className="bg-dark-card px-1.5 py-0.5 rounded">R{pick.round_previsto}</span>
                )}
                <span className="text-ufc-gold">{pick.pontos_confianca}pts conf.</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
