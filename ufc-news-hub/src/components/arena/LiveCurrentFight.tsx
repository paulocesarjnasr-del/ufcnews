'use client';

import { Zap } from 'lucide-react';
import { sobrenome } from '@/components/arena/shared';

interface UserPick {
  vencedor_previsto_id: string;
  acertou_vencedor: boolean | null;
  pontos_ganhos: number;
}

interface LiveLuta {
  luta_id: string;
  ordem: number;
  tipo: string;
  status: string;
  vencedor_id: string | null;
  metodo: string | null;
  round_final: number | null;
  lutador1_id: string;
  lutador1_nome: string;
  lutador2_id: string;
  lutador2_nome: string;
  userPick: UserPick | null;
}

interface LiveCurrentFightProps {
  luta: LiveLuta;
}

function tipoLabel(tipo: string): string {
  const map: Record<string, string> = {
    main_event: 'MAIN EVENT', co_main: 'CO-MAIN', card_principal: 'MAIN CARD',
    preliminar: 'PRELIMINAR', early_prelim: 'EARLY PRELIM',
  };
  return map[tipo] ?? tipo.toUpperCase();
}

export function LiveCurrentFight({ luta }: LiveCurrentFightProps) {
  const isLive = luta.status === 'ao_vivo';
  const isFinished = luta.status === 'finalizada';
  const isNext = !isLive && !isFinished;
  const pick = luta.userPick;

  const winnerIs1 = luta.vencedor_id === luta.lutador1_id;
  const winnerIs2 = luta.vencedor_id === luta.lutador2_id;

  return (
    <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-display uppercase tracking-widest text-white/40">
          {tipoLabel(luta.tipo)}
        </span>
        {isLive && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ufc-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-[10px] font-bold text-white uppercase">Em Andamento</span>
          </div>
        )}
        {isFinished && (
          <span className="text-[10px] font-bold text-green-400 uppercase bg-green-400/10 px-2.5 py-1 rounded-full">
            Finalizada
          </span>
        )}
        {isNext && (
          <span className="text-[10px] font-bold text-white/30 uppercase bg-white/5 px-2.5 py-1 rounded-full">
            Proxima
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className={`flex-1 text-center space-y-2 ${isFinished && winnerIs1 ? '' : isFinished ? 'opacity-40' : ''}`}>
          <div className="font-display text-xl uppercase text-white">
            {sobrenome(luta.lutador1_nome)}
          </div>
          {isFinished && winnerIs1 && (
            <div className="text-xs text-green-400 font-semibold">VENCEDOR</div>
          )}
        </div>
        <div className="text-white/20 font-display text-lg">VS</div>
        <div className={`flex-1 text-center space-y-2 ${isFinished && winnerIs2 ? '' : isFinished ? 'opacity-40' : ''}`}>
          <div className="font-display text-xl uppercase text-white">
            {sobrenome(luta.lutador2_nome)}
          </div>
          {isFinished && winnerIs2 && (
            <div className="text-xs text-green-400 font-semibold">VENCEDOR</div>
          )}
        </div>
      </div>

      {isFinished && luta.metodo && (
        <div className="text-center text-sm text-white/50">
          {luta.metodo}{luta.round_final ? ` · R${luta.round_final}` : ''}
        </div>
      )}

      {pick && (
        <div className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border ${
          pick.acertou_vencedor === true ? 'bg-green-500/10 border-green-500/30 text-green-400' :
          pick.acertou_vencedor === false ? 'bg-red-500/10 border-red-500/30 text-red-400' :
          'bg-white/5 border-white/10 text-white/50'
        }`}>
          <Zap className="w-3.5 h-3.5" />
          <span className="text-sm">
            Seu pick: <span className="font-semibold">
              {pick.vencedor_previsto_id === luta.lutador1_id ? sobrenome(luta.lutador1_nome) : sobrenome(luta.lutador2_nome)}
            </span>
          </span>
          {pick.acertou_vencedor !== null && (
            <span className="text-xs font-bold ml-1">
              {pick.acertou_vencedor ? `+${pick.pontos_ganhos} pts` : '0 pts'}
            </span>
          )}
          {pick.acertou_vencedor === null && (
            <span className="text-xs text-white/30 ml-1">Em andamento</span>
          )}
        </div>
      )}
    </div>
  );
}
