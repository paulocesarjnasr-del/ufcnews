'use client';

import Link from 'next/link';
import { Target, Swords, UserPlus } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { DashboardTabs } from '@/components/arena/DashboardTabs';
import { TabEvento } from '@/components/arena/TabEvento';
import { TabStats } from '@/components/arena/TabStats';
import { TabSocial } from '@/components/arena/TabSocial';

function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-lg mx-auto space-y-8">
        <div>
          <Target className="w-16 h-16 text-ufc-red mx-auto mb-4" />
          <h1 className="font-display text-4xl uppercase text-white">
            Arena <span className="text-ufc-red">UFC</span>
          </h1>
          <p className="text-dark-textMuted mt-3 text-lg">
            Faca suas previsoes, compita com amigos e prove que voce entende de UFC.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="neu-card p-4">
            <Swords className="w-6 h-6 text-ufc-red mb-2" />
            <h3 className="font-display text-sm uppercase text-white">Preveja</h3>
            <p className="text-xs text-dark-textMuted mt-1">Escolha os vencedores de cada luta</p>
          </div>
          <div className="neu-card p-4">
            <Target className="w-6 h-6 text-ufc-gold mb-2" />
            <h3 className="font-display text-sm uppercase text-white">Pontue</h3>
            <p className="text-xs text-dark-textMuted mt-1">Ganhe pontos por acertos</p>
          </div>
          <div className="neu-card p-4">
            <UserPlus className="w-6 h-6 text-green-400 mb-2" />
            <h3 className="font-display text-sm uppercase text-white">Compita</h3>
            <p className="text-xs text-dark-textMuted mt-1">Crie ligas e desafie amigos</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/arena/registro"
            className="neu-button px-8 py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide rounded-xl transition-colors"
          >
            Criar Conta
          </Link>
          <Link
            href="/arena/login"
            className="neu-button px-8 py-3 bg-dark-card hover:bg-dark-border text-dark-text font-display uppercase tracking-wide rounded-xl transition-colors border border-dark-border"
          >
            Ja tenho conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ArenaPage() {
  const { isAuthenticated, isLoading } = useArenaAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-64 rounded-xl bg-dark-card animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="container mx-auto py-4">
      <DashboardTabs
        tabs={[
          { label: 'Evento', content: <TabEvento /> },
          { label: 'Stats', content: <TabStats /> },
          { label: 'Social', content: <TabSocial /> },
        ]}
      />
    </div>
  );
}
