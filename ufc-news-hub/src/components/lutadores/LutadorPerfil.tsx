'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LutadorComHistorico } from '@/types';

interface LutadorPerfilProps {
  lutador: LutadorComHistorico;
}

export function LutadorPerfil({ lutador }: LutadorPerfilProps) {
  const paisBandeira: Record<string, string> = {
    'Brasil': '🇧🇷',
    'Brazil': '🇧🇷',
    'USA': '🇺🇸',
    'United States': '🇺🇸',
    'Russia': '🇷🇺',
    'Dagestan': '🇷🇺',
    'Ireland': '🇮🇪',
    'Nigeria': '🇳🇬',
    'Australia': '🇦🇺',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Mexico': '🇲🇽',
    'Jamaica': '🇯🇲',
    'Cameroon': '🇨🇲',
    'South Africa': '🇿🇦',
    'China': '🇨🇳',
    'Japan': '🇯🇵',
    'Poland': '🇵🇱',
    'New Zealand': '🇳🇿',
  };

  const bandeira = lutador.pais ? paisBandeira[lutador.pais] || '🏳️' : '';

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-dark-card to-dark-bg p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Foto */}
          <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-ufc-red">
            {lutador.imagem_url ? (
              <Image
                src={lutador.imagem_url}
                alt={lutador.nome}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-dark-border text-4xl font-bold text-dark-textMuted">
                {lutador.nome.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            {lutador.apelido && (
              <p className="text-ufc-red font-medium">"{lutador.apelido}"</p>
            )}
            <h1 className="font-display text-3xl uppercase text-dark-text md:text-4xl">
              {lutador.nome}
            </h1>
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
              {lutador.ranking_divisao && (
                <span className="rounded bg-ufc-red px-2 py-1 text-sm font-bold text-white">
                  #{lutador.ranking_divisao}
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

      {/* Estilo */}
      {lutador.estilo_luta && (
        <div className="px-6 pb-6">
          <p className="text-sm text-dark-textMuted">Estilo de Luta</p>
          <p className="text-dark-text">{lutador.estilo_luta}</p>
        </div>
      )}
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
