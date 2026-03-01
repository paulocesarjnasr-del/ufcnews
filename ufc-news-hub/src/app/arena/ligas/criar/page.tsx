'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Globe, Lock } from 'lucide-react';

import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function CriarLigaPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [nome, setNome] = useState('');
  const [isPublica, setIsPublica] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (nome.trim().length < 3 || nome.trim().length > 50) {
      setError('Nome da liga deve ter entre 3 e 50 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/arena/ligas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          tipo: isPublica ? 'publica' : 'privada',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/arena/ligas/${data.liga.id}`);
      } else {
        setError(data.error || 'Erro ao criar liga');
      }
    } catch {
      setError('Erro de conexao');
    }

    setIsLoading(false);
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Link
          href="/arena/ligas"
          className="text-sm text-dark-textMuted hover:text-ufc-red inline-block mb-6"
        >
          &larr; Voltar
        </Link>

        <h1 className="font-display text-3xl uppercase text-dark-text mb-8 text-center">
          Criar <span className="text-ufc-gold">Liga</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Nome da Liga */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-dark-textMuted mb-2">
              Nome da Liga
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              minLength={3}
              maxLength={50}
              className="neu-inset w-full rounded-lg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-ufc-gold/50"
              placeholder="Ex: Os Melhores Previsores"
            />
          </div>

          {/* Liga Publica Toggle */}
          <div>
            <label className="block text-sm font-medium text-dark-textMuted mb-2">
              Liga Publica
            </label>
            <button
              type="button"
              onClick={() => setIsPublica(!isPublica)}
              className="neu-card w-full flex items-center justify-between rounded-lg px-4 py-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isPublica ? (
                  <Globe className="w-5 h-5 text-green-400" />
                ) : (
                  <Lock className="w-5 h-5 text-purple-400" />
                )}
                <span className="text-dark-text">
                  {isPublica ? 'Qualquer um pode entrar' : 'Somente com convite'}
                </span>
              </div>

              {/* Toggle switch */}
              <div
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  isPublica ? 'bg-green-500' : 'bg-dark-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    isPublica ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="neu-button w-full flex items-center justify-center gap-2 rounded-lg bg-ufc-red py-3 font-display uppercase text-white hover:bg-ufc-redLight transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            {isLoading ? 'Criando...' : 'Criar Liga'}
          </button>
        </form>
      </div>
    </div>
  );
}
