'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Activity } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface Liga {
  id: string;
  nome: string;
  total_membros: number;
}

interface Atividade {
  id: string;
  tipo: string;
  titulo: string;
  descricao: string | null;
  created_at: string;
}

export function TabSocial() {
  const { isAuthenticated } = useArenaAuth();
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setIsLoading(false); return; }

    async function fetchData() {
      try {
        const [ligasRes, atividadesRes] = await Promise.all([
          fetch('/api/arena/ligas?tipo=minhas&limit=3'),
          fetch('/api/arena/atividades?limit=5'),
        ]);

        if (ligasRes.ok) {
          const data = await ligasRes.json();
          setLigas(Array.isArray(data) ? data : data.ligas || []);
        }
        if (atividadesRes.ok) {
          const data = await atividadesRes.json();
          setAtividades(Array.isArray(data) ? data : []);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="neu-card p-6 text-center">
        <Users className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Entre numa liga para competir com amigos!</p>
        <Link href="/arena/login" className="text-ufc-red text-sm mt-2 inline-block hover:underline">Entrar</Link>
      </div>
    );
  }

  if (isLoading) return <div className="h-40 rounded-xl bg-dark-card animate-pulse" />;

  return (
    <div className="space-y-4">
      <div className="neu-card p-4 space-y-3">
        <h4 className="text-sm font-display uppercase text-dark-textMuted flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Minhas Ligas
        </h4>
        {ligas.length === 0 ? (
          <p className="text-sm text-dark-textMuted">Nenhuma liga ainda.</p>
        ) : (
          <div className="space-y-2">
            {ligas.map(liga => (
              <Link
                key={liga.id}
                href={`/arena/ligas/${liga.id}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/50 hover:bg-dark-bg transition-colors"
              >
                <span className="text-sm text-dark-text font-medium">{liga.nome}</span>
                <span className="text-xs text-dark-textMuted">{liga.total_membros} membros</span>
              </Link>
            ))}
          </div>
        )}
        <Link href="/arena/ligas" className="block text-center text-sm text-ufc-red hover:underline">
          Ver todas →
        </Link>
      </div>

      <div className="neu-card p-4 space-y-3">
        <h4 className="text-sm font-display uppercase text-dark-textMuted flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Atividade Recente
        </h4>
        {atividades.length === 0 ? (
          <p className="text-sm text-dark-textMuted">Faca sua primeira previsao para ver atividade aqui!</p>
        ) : (
          <div className="space-y-2">
            {atividades.map(a => (
              <div key={a.id} className="flex items-start gap-2.5 text-sm">
                <span className="text-dark-textMuted shrink-0 mt-0.5">
                  {a.tipo === 'card_perfeito' ? '\u{1F3C6}' : a.tipo === 'conquista' ? '\u{1F3AF}' : '\u{1F4CA}'}
                </span>
                <div>
                  <p className="text-dark-text">{a.titulo}</p>
                  {a.descricao && <p className="text-xs text-dark-textMuted">{a.descricao}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
