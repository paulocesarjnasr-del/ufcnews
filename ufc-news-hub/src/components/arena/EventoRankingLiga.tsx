'use client';

import Image from 'next/image';
import { Trophy, Crown } from 'lucide-react';
import type { EventoRankingLiga as EventoRankingLigaType } from '@/types/arena';

interface EventoRankingLigaProps {
  ranking: EventoRankingLigaType;
  currentUserId: string | undefined;
}

export function EventoRankingLiga({ ranking, currentUserId }: EventoRankingLigaProps) {
  const formattedDate = new Date(ranking.evento_data).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="neu-card rounded-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="px-5 py-4 border-b border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-ufc-gold" />
          <h2 className="font-display text-lg uppercase text-white">Resultado</h2>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-white">{ranking.evento_nome}</p>
          <p className="text-xs text-dark-textMuted">{formattedDate}</p>
        </div>
      </div>

      {/* Ranking list */}
      {ranking.ranking.length === 0 ? (
        <div className="p-8 text-center text-dark-textMuted">
          Nenhum membro participou deste evento
        </div>
      ) : (
        <div className="divide-y divide-dark-border/50">
          {ranking.ranking.map((membro) => {
            const isCurrentUser = membro.usuario_id === currentUserId;
            const participated = membro.pontos > 0 || membro.acertos > 0;

            // Medal colors for top 3
            let medalColor: string | null = null;
            if (membro.posicao === 1) medalColor = 'text-yellow-400';
            else if (membro.posicao === 2) medalColor = 'text-gray-300';
            else if (membro.posicao === 3) medalColor = 'text-amber-600';

            return (
              <div
                key={membro.usuario_id}
                className={`flex items-center gap-3 px-5 py-3 ${isCurrentUser ? 'bg-ufc-red/5' : ''}`}
              >
                {/* Position */}
                <div className="w-8 text-center">
                  {medalColor ? (
                    <Crown className={`w-5 h-5 mx-auto ${medalColor}`} />
                  ) : (
                    <span className="text-sm text-dark-textMuted font-display">{membro.posicao}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0">
                  {membro.avatar_url ? (
                    <Image
                      src={membro.avatar_url}
                      alt={membro.username}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-dark-textMuted text-xs font-bold">
                      {membro.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium truncate block ${isCurrentUser ? 'text-ufc-red' : 'text-white'}`}>
                    {membro.display_name || membro.username}
                  </span>
                </div>

                {/* Stats */}
                <div className="text-right">
                  {participated ? (
                    <>
                      <p className="text-sm font-bold text-ufc-gold">{membro.pontos}pts</p>
                      <p className="text-[10px] text-dark-textMuted">{membro.acertos}/{membro.total_lutas} acertos</p>
                    </>
                  ) : (
                    <p className="text-xs text-dark-textMuted italic">nao participou</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
