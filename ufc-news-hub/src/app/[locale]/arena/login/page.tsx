'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Octagon } from 'lucide-react';
import { OctagonPortalLayout } from '@/components/arena/OctagonPortalLayout';
import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function ArenaLoginPage() {
  return (
    <Suspense fallback={
      <OctagonPortalLayout>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
        </div>
      </OctagonPortalLayout>
    }>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('arena');
  const { login, isAuthenticated, isLoading: authLoading } = useArenaAuth();

  const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
    google_nao_configurado: t('login_google_not_configured'),
    google_sem_codigo: t('login_google_auth_error'),
    google_token_falhou: t('login_google_token_error'),
    google_perfil_falhou: t('login_google_profile_error'),
    google_erro_interno: t('login_google_internal_error'),
  };
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Captura erros do Google OAuth via query string
  useEffect(() => {
    const googleError = searchParams.get('error');
    if (googleError) {
      setError(GOOGLE_ERROR_MESSAGES[googleError] || googleError);
    }
  }, [searchParams]);

  const redirectTo = searchParams.get('redirect') || '/arena';

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, authLoading, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, senha);

    if (result.success) {
      router.push(redirectTo);
    } else {
      setError(result.error || t('login_error'));
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <OctagonPortalLayout>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
        </div>
      </OctagonPortalLayout>
    );
  }

  return (
    <OctagonPortalLayout>
      <div className="neu-card p-8 animate-glow-pulse-border">
        {/* Form Header */}
        <div className="flex flex-col items-center mb-8 slide-up-fade">
          <div className="text-ufc-red mb-4">
            <Octagon className="h-10 w-10" />
          </div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-dark-text">
            {t('login_title')}
          </h2>
          <p className="mt-1 text-sm text-dark-textMuted">
            {t('login_subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400 slide-up-fade">
              {error}
            </div>
          )}

          <div className="slide-up-fade" style={{ animationDelay: '50ms' }}>
            <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-2">
              {t('login_email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="seu@email.com"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '100ms' }}>
            <label htmlFor="senha" className="block text-sm font-medium text-dark-textMuted mb-2">
              {t('login_password')}
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="********"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '150ms' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-ufc-red py-3 font-display uppercase text-white hover:bg-ufc-redLight transition-all hover:shadow-[0_0_20px_rgba(210,10,10,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('login_loading') : t('login_title')}
            </button>
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 my-2 slide-up-fade" style={{ animationDelay: '200ms' }}>
            <div className="flex-1 border-t border-dark-border" />
            <span className="text-xs text-dark-textMuted">{t('login_or')}</span>
            <div className="flex-1 border-t border-dark-border" />
          </div>

          {/* Botao Google */}
          <div className="slide-up-fade" style={{ animationDelay: '250ms' }}>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/api/arena/auth/google"
              className="flex items-center justify-center gap-3 w-full rounded-xl
                         border border-dark-border bg-dark-card py-3 text-sm
                         text-dark-text hover:border-ufc-red transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {t('login_continue_google')}
            </a>
          </div>

          <div className="text-center text-sm text-dark-textMuted slide-up-fade" style={{ animationDelay: '300ms' }}>
            {t('login_no_account')}{' '}
            <Link href={`/arena/registro${redirectTo !== '/arena' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="text-ufc-red hover:text-ufc-redLight font-medium">
              {t('login_create_account')}
            </Link>
          </div>
        </form>
      </div>
    </OctagonPortalLayout>
  );
}
