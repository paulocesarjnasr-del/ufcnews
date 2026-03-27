'use client';

import { useTranslations } from 'next-intl';
import { Target } from 'lucide-react';
import type { EventoAtualLiga, MembroLiga } from '@/types/arena';

interface PicksPressureProps {
  eventoAtual: EventoAtualLiga;
  membros: MembroLiga[];
  mostrarNomesPendentes: boolean;
}

export function PicksPressure({ eventoAtual, membros, mostrarNomesPendentes }: PicksPressureProps) {
  const t = useTranslations('arena');
  const { total_membros, membros_com_picks } = eventoAtual;
  const percent = total_membros > 0 ? Math.round((membros_com_picks / total_membros) * 100) : 0;
  const todosProntos = membros_com_picks === total_membros;
  const isLive = eventoAtual.status === 'ao_vivo';

  const pendentes = membros
    .filter(m => m.picks_status === 'pending')
    .map(m => m.display_name || m.username);

  return (
    <div className={`neu-card rounded-xl p-4 mb-4 border-l-4 ${
      isLive ? 'border-l-ufc-red' : todosProntos ? 'border-l-green-500' : 'border-l-yellow-500'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {isLive ? (
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufc-red opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-ufc-red" />
          </span>
        ) : (
          <Target className={`w-4 h-4 ${todosProntos ? 'text-green-400' : 'text-yellow-400'}`} />
        )}
        <span className="text-sm font-medium text-white">
          {eventoAtual.nome}
        </span>
        {isLive ? (
          <span className="text-xs font-display uppercase tracking-widest text-ufc-red">{t('live_label')}</span>
        ) : (
          <span className="text-sm text-dark-textMuted">
            {todosProntos
              ? t('all_ready')
              : `${membros_com_picks}/${total_membros} ${t('made_picks')}`
            }
          </span>
        )}
      </div>

      <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            todosProntos ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {!todosProntos && mostrarNomesPendentes && pendentes.length > 0 && (
        <p className="text-xs text-dark-textMuted mt-2">
          {t('missing')} {pendentes.join(', ')}
        </p>
      )}
    </div>
  );
}
