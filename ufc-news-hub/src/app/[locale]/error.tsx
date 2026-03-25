'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error('[ErrorBoundary] Erro capturado:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="neu-card max-w-lg w-full p-8 text-center">
        <h2 className="font-display text-3xl uppercase text-ufc-red mb-2">
          {t('something_wrong')}
        </h2>
        <p className="text-dark-text/70 mb-6">
          {t('unexpected_error')}
        </p>
        {error.digest && (
          <p className="text-dark-text/40 text-sm mb-4">
            {t('error_code', { digest: error.digest })}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="neu-button px-6 py-3 text-sm uppercase font-bold tracking-wider">
            {t('try_again')}
          </button>
          <Link href="/" className="neu-button px-6 py-3 text-sm uppercase font-bold tracking-wider">
            {t('home_page')}
          </Link>
        </div>
      </div>
    </div>
  );
}
