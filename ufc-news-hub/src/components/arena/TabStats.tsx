'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Target, Flame, TrendingUp } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

export function TabStats() {
  const { usuario, isAuthenticated } = useArenaAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { setIsLoading(false); }, [usuario]);

  if (!isAuthenticated || !usuario) {
    return (
      <div className="neu-card p-6 text-center">
        <Target className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Faca login para ver seus stats!</p>
        <Link href="/arena/login" className="text-ufc-red text-sm mt-2 inline-block hover:underline">Entrar</Link>
      </div>
    );
  }

  const accuracy = (usuario.total_previsoes ?? 0) > 0
    ? Math.round(((usuario.previsoes_corretas ?? 0) / (usuario.total_previsoes ?? 1)) * 100)
    : 0;

  if (isLoading) return <div className="h-40 rounded-xl bg-dark-card animate-pulse" />;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="neu-card p-4 text-center">
          <Trophy className="w-5 h-5 text-ufc-gold mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-ufc-gold">{(usuario.pontos_totais ?? 0).toLocaleString()}</p>
          <p className="text-xs text-dark-textMuted mt-0.5">Pontos</p>
        </div>
        <div className="neu-card p-4 text-center">
          <Target className="w-5 h-5 text-green-400 mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-green-400">{accuracy}%</p>
          <p className="text-xs text-dark-textMuted mt-0.5">Precisao</p>
        </div>
        <div className="neu-card p-4 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1.5" />
          <p className="text-2xl font-bold text-orange-400">{usuario.streak_atual ?? 0}</p>
          <p className="text-xs text-dark-textMuted mt-0.5">Streak</p>
        </div>
      </div>

      <div className="neu-card p-4 space-y-3">
        <h4 className="text-sm font-display uppercase text-dark-textMuted flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Especialidades
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-dark-bg/50 p-2.5">
            <p className="text-lg font-bold text-red-400">{usuario.kos_acertados ?? 0}</p>
            <p className="text-[10px] text-dark-textMuted">KOs</p>
          </div>
          <div className="rounded-lg bg-dark-bg/50 p-2.5">
            <p className="text-lg font-bold text-blue-400">{usuario.subs_acertados ?? 0}</p>
            <p className="text-[10px] text-dark-textMuted">Subs</p>
          </div>
          <div className="rounded-lg bg-dark-bg/50 p-2.5">
            <p className="text-lg font-bold text-yellow-400">{usuario.decisoes_acertadas ?? 0}</p>
            <p className="text-[10px] text-dark-textMuted">Decisoes</p>
          </div>
        </div>
      </div>

      <Link href={`/arena/perfil/${usuario.username}`} className="block text-center text-sm text-ufc-red hover:underline">
        Ver perfil completo →
      </Link>
    </div>
  );
}
