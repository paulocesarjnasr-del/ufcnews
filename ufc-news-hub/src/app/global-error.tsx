'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[GlobalError] Erro critico capturado:', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#1a1a2e',
          color: '#e0e0e0',
          fontFamily: 'Inter, system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '32rem',
            width: '100%',
            padding: '3rem 2rem',
            textAlign: 'center',
            background: '#16213e',
            borderRadius: '1rem',
            boxShadow: '8px 8px 16px #0d1527, -8px -8px 16px #1f2d55',
          }}
        >
          <h1
            style={{
              fontFamily: '"Bebas Neue", system-ui, sans-serif',
              fontSize: '2.5rem',
              textTransform: 'uppercase',
              color: '#D20A0A',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em',
            }}
          >
            Erro Critico
          </h1>
          <p
            style={{
              color: '#a0a0b8',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            A aplicacao encontrou um erro grave e nao conseguiu se recuperar.
            Recarregue a pagina para tentar novamente.
          </p>
          {error.digest && (
            <p
              style={{
                color: '#6a6a80',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
              }}
            >
              Codigo: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: '#D20A0A',
              color: '#ffffff',
              border: 'none',
              padding: '0.875rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.opacity = '0.85';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.opacity = '1';
            }}
          >
            Recarregar Pagina
          </button>
        </div>
      </body>
    </html>
  );
}
