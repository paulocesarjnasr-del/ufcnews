'use client';

import Link from 'next/link';
import FighterImage from '@/components/ui/FighterImage';
import { LutadorComHistorico } from '@/types';

interface LutadorPerfilProps {
  lutador: LutadorComHistorico;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const paisBandeira: Record<string, string> = {
  // Americas
  'United States': '🇺🇸',
  'USA': '🇺🇸',
  'Brazil': '🇧🇷',
  'Brasil': '🇧🇷',
  'Canada': '🇨🇦',
  'Mexico': '🇲🇽',
  'Argentina': '🇦🇷',
  'Colombia': '🇨🇴',
  'Peru': '🇵🇪',
  'Chile': '🇨🇱',
  'Ecuador': '🇪🇨',
  'Venezuela': '🇻🇪',
  'Cuba': '🇨🇺',
  'Jamaica': '🇯🇲',
  'Dominican Republic': '🇩🇴',
  'Costa Rica': '🇨🇷',
  'Panama': '🇵🇦',
  'Bolivia': '🇧🇴',
  'Paraguay': '🇵🇾',
  'El Salvador': '🇸🇻',
  'Guyana': '🇬🇾',
  'Suriname': '🇸🇷',
  'Bahamas': '🇧🇸',
  'American Samoa': '🇦🇸',
  'Guam': '🇬🇺',
  // Europe
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'United Kingdom': '🇬🇧',
  'Ireland': '🇮🇪',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'Poland': '🇵🇱',
  'Russia': '🇷🇺',
  'Dagestan': '🇷🇺',
  'Ukraine': '🇺🇦',
  'Sweden': '🇸🇪',
  'Netherlands': '🇳🇱',
  'Portugal': '🇵🇹',
  'Belgium': '🇧🇪',
  'Austria': '🇦🇹',
  'Switzerland': '🇨🇭',
  'Denmark': '🇩🇰',
  'Norway': '🇳🇴',
  'Finland': '🇫🇮',
  'Iceland': '🇮🇸',
  'Greece': '🇬🇷',
  'Czechia': '🇨🇿',
  'Romania': '🇷🇴',
  'Bulgaria': '🇧🇬',
  'Croatia': '🇭🇷',
  'Serbia': '🇷🇸',
  'Slovakia': '🇸🇰',
  'Lithuania': '🇱🇹',
  'Latvia': '🇱🇻',
  'Moldova': '🇲🇩',
  'Albania': '🇦🇱',
  'Montenegro': '🇲🇪',
  'North Macedonia': '🇲🇰',
  'Bosnia & Herzegovina': '🇧🇦',
  'Bosnia &amp; Herzegovina': '🇧🇦',
  'Georgia': '🇬🇪',
  'Armenia': '🇦🇲',
  'Belarus': '🇧🇾',
  // Asia
  'Japan': '🇯🇵',
  'China': '🇨🇳',
  'South Korea': '🇰🇷',
  'Thailand': '🇹🇭',
  'Philippines': '🇵🇭',
  'Indonesia': '🇮🇩',
  'India': '🇮🇳',
  'Kazakhstan': '🇰🇿',
  'Uzbekistan': '🇺🇿',
  'Kyrgyzstan': '🇰🇬',
  'Tajikistan': '🇹🇯',
  'Azerbaijan': '🇦🇿',
  'Iran': '🇮🇷',
  'Iraq': '🇮🇶',
  'Israel': '🇮🇱',
  'Türkiye': '🇹🇷',
  'Turkey': '🇹🇷',
  'Mongolia': '🇲🇳',
  'Singapore': '🇸🇬',
  'Hong Kong': '🇭🇰',
  'Vietnam': '🇻🇳',
  'Myanmar': '🇲🇲',
  'Syria': '🇸🇾',
  'Afghanistan': '🇦🇫',
  // Africa
  'Nigeria': '🇳🇬',
  'South Africa': '🇿🇦',
  'Cameroon': '🇨🇲',
  'Ghana': '🇬🇭',
  'Egypt': '🇪🇬',
  'Morocco': '🇲🇦',
  'Tunisia': '🇹🇳',
  'Democratic Republic of the Congo': '🇨🇩',
  'Angola': '🇦🇴',
  'Uganda': '🇺🇬',
  'Zimbabwe': '🇿🇼',
  // Oceania
  'Australia': '🇦🇺',
  'New Zealand': '🇳🇿',
  'Solomon Islands': '🇸🇧',
  // Special
  'Canary Islands': '🇮🇨',
};

export function LutadorPerfil({ lutador }: LutadorPerfilProps) {
  const bandeira = lutador.pais ? paisBandeira[lutador.pais] || '🏳️' : '';
  const initials = getInitials(lutador.nome);
  const l = lutador as unknown as Record<string, unknown>;
  const stance = typeof l.stance === 'string' ? l.stance : null;
  const dataNascimento = lutador.data_nascimento
    ? new Date(lutador.data_nascimento).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-dark-card to-dark-bg p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Foto */}
          <div className="relative h-36 w-36 md:h-44 md:w-44 overflow-hidden rounded-full border-4 border-ufc-red shadow-lg shadow-ufc-red/20">
            {lutador.imagem_url ? (
              <FighterImage
                src={lutador.imagem_url}
                alt={lutador.nome}
                fill
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e]">
                <span className="text-5xl md:text-6xl font-bold text-white/30 select-none">
                  {initials}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            {lutador.apelido && (
              <p className="text-ufc-red font-medium">&quot;{lutador.apelido}&quot;</p>
            )}
            <h1 className="font-display text-3xl uppercase text-dark-text md:text-4xl">
              {lutador.nome}
            </h1>

            {/* Badges row */}
            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              {lutador.pais && (
                <span className="inline-flex items-center gap-1 text-dark-textMuted">
                  {bandeira} {lutador.pais}
                </span>
              )}
              {lutador.categoria_peso && (
                <span className="rounded bg-dark-border px-2 py-1 text-sm text-dark-textMuted">
                  {lutador.categoria_peso}
                </span>
              )}
              {lutador.ranking_divisao !== null && lutador.ranking_divisao !== undefined && (
                <span className="rounded bg-ufc-red px-2 py-1 text-sm font-bold text-white">
                  {lutador.ranking_divisao === 0 ? 'Campeão' : `#${lutador.ranking_divisao}`}
                </span>
              )}
              {lutador.estilo_luta && (
                <span className="rounded-full bg-ufc-red/15 border border-ufc-red/30 px-3 py-1 text-sm font-medium text-ufc-red">
                  🥋 {lutador.estilo_luta}
                </span>
              )}
              {stance && (
                <span className="rounded bg-dark-border px-2 py-1 text-sm text-dark-textMuted">
                  🥊 {stance}
                </span>
              )}
            </div>

            {/* Record */}
            <div className="mt-4">
              <span className="font-display text-4xl text-dark-text">
                {lutador.record}
              </span>
              <span className="ml-2 text-dark-textMuted">
                ({lutador.nocautes || 0} KO, {lutador.finalizacoes || 0} SUB,{' '}
                {lutador.decisoes || 0} DEC)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-dark-border">
        <StatItem
          label="Idade"
          value={lutador.idade ? `${lutador.idade} anos` : '-'}
        />
        <StatItem label="Altura" value={lutador.altura || '-'} />
        <StatItem label="Envergadura" value={lutador.envergadura || '-'} />
        <StatItem label="Academia" value={lutador.academia || '-'} />
      </div>

      {/* Extra Info Row */}
      {(lutador.cidade_natal || dataNascimento) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-6">
          {lutador.cidade_natal && (
            <StatItem label="Cidade Natal" value={lutador.cidade_natal} />
          )}
          {dataNascimento && (
            <StatItem label="Data de Nascimento" value={dataNascimento} />
          )}
        </div>
      )}

      {/* Advanced Stats from UFCStats — always show if fighter has the fields */}
      <div className="border-t border-dark-border p-6">
        <h3 className="mb-4 font-display text-lg uppercase text-dark-text">
          Estatísticas <span className="text-ufc-red">Avançadas</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AdvancedStatItem
            label="Strikes/Min"
            value={typeof l.slpm === 'number' ? l.slpm.toFixed(2) : '-'}
          />
          <AdvancedStatItem
            label="Precisão de Strike"
            value={typeof l.str_acc === 'number' ? `${Math.round(l.str_acc)}%` : '-'}
            percent={typeof l.str_acc === 'number' ? l.str_acc : undefined}
          />
          <AdvancedStatItem
            label="Absorvidos/Min"
            value={typeof l.sapm === 'number' ? l.sapm.toFixed(2) : '-'}
          />
          <AdvancedStatItem
            label="Defesa de Strike"
            value={typeof l.str_def === 'number' ? `${Math.round(l.str_def)}%` : '-'}
            percent={typeof l.str_def === 'number' ? l.str_def : undefined}
          />
          <AdvancedStatItem
            label="Takedowns/15min"
            value={typeof l.td_avg === 'number' ? l.td_avg.toFixed(2) : '-'}
          />
          <AdvancedStatItem
            label="Precisão de TD"
            value={typeof l.td_acc === 'number' ? `${Math.round(l.td_acc)}%` : '-'}
            percent={typeof l.td_acc === 'number' ? l.td_acc : undefined}
          />
          <AdvancedStatItem
            label="Defesa de TD"
            value={typeof l.td_def === 'number' ? `${Math.round(l.td_def)}%` : '-'}
            percent={typeof l.td_def === 'number' ? l.td_def : undefined}
          />
          <AdvancedStatItem
            label="Tentativas SUB/15min"
            value={typeof l.sub_avg === 'number' ? l.sub_avg.toFixed(1) : '-'}
          />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xs text-dark-textMuted uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-1 font-medium text-dark-text">{value}</p>
    </div>
  );
}

function AdvancedStatItem({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent?: number;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-dark-textMuted uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-1 font-medium text-dark-text text-lg">{value}</p>
      {percent !== undefined && (
        <div className="mt-1.5 mx-auto h-1.5 w-16 rounded-full bg-dark-border overflow-hidden">
          <div
            className="h-full rounded-full bg-ufc-red transition-all"
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
