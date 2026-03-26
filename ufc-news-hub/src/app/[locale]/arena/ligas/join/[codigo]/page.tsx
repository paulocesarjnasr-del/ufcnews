'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Trophy, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useArenaAuth } from '@/hooks/useArenaAuth';

interface PageProps {
  params: Promise<{ codigo: string }>;
}

type JoinState = 'loading' | 'success' | 'error';

interface JoinResult {
  liga_id?: string;
  liga_nome?: string;
  error?: string;
}

export default function JoinLigaPage({ params }: PageProps) {
  const t = useTranslations('arena');
  const { codigo } = use(params);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [state, setState] = useState<JoinState>('loading');
  const [result, setResult] = useState<JoinResult>({});

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.replace(`/arena/login?redirect=/arena/ligas/join/${codigo}`);
      return;
    }

    // Authenticated — attempt to join
    const joinLiga = async () => {
      try {
        const response = await fetch('/api/arena/ligas/entrar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigo_convite: codigo }),
        });

        const data = await response.json() as JoinResult & { success?: boolean };

        if (!response.ok) {
          setState('error');
          setResult({ error: data.error ?? t('league_join_error_generic') });
          return;
        }

        setState('success');
        setResult({ liga_id: data.liga_id, liga_nome: data.liga_nome });

        // Redirect to league page after 2s
        setTimeout(() => {
          if (data.liga_id) {
            router.push(`/arena/ligas/${data.liga_id}`);
          } else {
            router.push('/arena/ligas');
          }
        }, 2000);
      } catch {
        setState('error');
        setResult({ error: t('league_join_error_connection') });
      }
    };

    void joinLiga();
  }, [authLoading, isAuthenticated, codigo, router]);

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="neu-card max-w-md w-full p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {state === 'loading' && (
            <div className="w-20 h-20 rounded-full neu-inset flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-ufc-gold animate-spin" />
            </div>
          )}
          {state === 'success' && (
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          )}
          {state === 'error' && (
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-ufc-red" />
            </div>
          )}
        </div>

        {/* Content */}
        {state === 'loading' && (
          <>
            <Trophy className="w-6 h-6 text-ufc-gold mx-auto mb-3" />
            <h1 className="font-display text-2xl uppercase text-dark-text mb-2">
              {t('league_join_loading_title')}
            </h1>
            <p className="text-dark-text/60 text-sm">
              {t('league_join_verifying', { code: codigo })}
            </p>
          </>
        )}

        {state === 'success' && (
          <>
            <h1 className="font-display text-2xl uppercase text-green-400 mb-2">
              {t('league_join_welcome')}
            </h1>
            {result.liga_nome && (
              <p className="text-dark-text mb-1">
                {t('league_join_success', { name: result.liga_nome })}
              </p>
            )}
            <p className="text-dark-text/60 text-sm mt-3">
              {t('league_join_redirecting')}
            </p>
          </>
        )}

        {state === 'error' && (
          <>
            <h1 className="font-display text-2xl uppercase text-ufc-red mb-2">
              {t('league_join_error_title')}
            </h1>
            <p className="text-dark-text/70 text-sm mb-6">
              {result.error ?? t('error_unknown')}
            </p>
            <Link
              href="/arena/ligas"
              className="neu-button inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-dark-text"
            >
              <Trophy className="w-4 h-4 text-ufc-gold" />
              {t('league_view_leagues')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
