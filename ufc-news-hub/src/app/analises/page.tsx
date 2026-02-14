'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { FighterInfo } from '@/types/analise';

interface AnaliseListItem {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string | null;
  evento_nome: string | null;
  evento_data: string | null;
  evento_local: string | null;
  categoria_peso: string | null;
  is_titulo: boolean;
  fighter1_info: FighterInfo;
  fighter2_info: FighterInfo;
  created_at: string;
}

export default function AnalisesPage() {
  const [analises, setAnalises] = useState<AnaliseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalises() {
      try {
        const res = await fetch('/api/analises');
        if (res.ok) {
          const data = await res.json();
          setAnalises(data);
        }
      } catch (err) {
        console.error('Error fetching analyses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalises();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <span className="text-dark-text">Análises</span>
        </div>

        <h1 className="mb-2 font-display text-3xl uppercase text-dark-text md:text-4xl">
          📊 Análises <span className="text-ufc-red">Semanais</span>
        </h1>
        <p className="mb-8 text-dark-textMuted">
          Análises táticas completas com previsões data-driven para os maiores eventos do UFC
        </p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 animate-pulse rounded-lg bg-dark-card" />
            ))}
          </div>
        ) : analises.length === 0 ? (
          <div className="rounded-lg border border-dark-border bg-dark-card p-12 text-center">
            <p className="text-xl text-dark-textMuted">Nenhuma análise disponível ainda</p>
            <p className="mt-2 text-sm text-dark-textMuted">As análises semanais serão geradas automaticamente antes de cada evento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {analises.map((a) => {
              const f1Last = a.fighter1_info?.nome?.split(' ').pop() || '?';
              const f2Last = a.fighter2_info?.nome?.split(' ').pop() || '?';
              const eventoDate = a.evento_data ? new Date(a.evento_data) : null;

              return (
                <Link key={a.id} href={`/analise/${a.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg border border-dark-border bg-dark-card p-6 transition-all duration-300 hover:border-ufc-red/40 hover:shadow-lg hover:shadow-ufc-red/5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          {a.is_titulo && (
                            <span className="rounded bg-ufc-gold/20 px-2 py-0.5 text-xs font-bold text-ufc-gold">TÍTULO</span>
                          )}
                          <span className="text-xs font-medium uppercase tracking-widest text-ufc-red">
                            {a.evento_nome}
                          </span>
                          {eventoDate && (
                            <span className="text-xs text-dark-textMuted">
                              • {eventoDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <h2 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
                          <span className="text-ufc-red">{f1Last}</span> vs{' '}
                          <span className="text-blue-400">{f2Last}</span>
                        </h2>
                        {a.categoria_peso && (
                          <p className="mt-1 text-sm text-dark-textMuted">{a.categoria_peso}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="font-display text-xl text-dark-text">{a.fighter1_info?.record || '?'}</p>
                          <p className="text-xs text-dark-textMuted">{f1Last}</p>
                        </div>
                        <span className="font-display text-lg text-dark-textMuted">VS</span>
                        <div className="text-center">
                          <p className="font-display text-xl text-dark-text">{a.fighter2_info?.record || '?'}</p>
                          <p className="text-xs text-dark-textMuted">{f2Last}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-ufc-red/20 px-4 py-2 text-sm font-bold text-ufc-red transition-colors group-hover:bg-ufc-red group-hover:text-white">
                        Ver Análise →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Static analyses links */}
        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl uppercase text-dark-textMuted">Análises Anteriores (Estáticas)</h2>
          <div className="space-y-3">
            <Link href="/houston" className="block rounded-lg border border-dark-border bg-dark-card p-4 transition-colors hover:border-dark-textMuted">
              <span className="font-display text-lg text-dark-text">UFC Houston — Strickland vs Hernandez</span>
              <span className="ml-2 text-sm text-dark-textMuted">Fevereiro 2026</span>
            </Link>
            <Link href="/lightweight-contenders" className="block rounded-lg border border-dark-border bg-dark-card p-4 transition-colors hover:border-dark-textMuted">
              <span className="font-display text-lg text-dark-text">Lightweight Contenders — Gamrot vs Tsarukyan</span>
              <span className="ml-2 text-sm text-dark-textMuted">2026</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
