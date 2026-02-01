'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { ArenaMenu } from '@/components/arena/ArenaMenu';
import { UserAvatar } from '@/components/arena/UserAvatar';

interface Lutador {
  id: string;
  nome: string;
  apelido: string | null;
  imagem_url: string | null;
  categoria_peso: string | null;
}

type AvatarType = 'initials' | 'upload' | 'fighter';

export default function AvatarSelectionPage() {
  const router = useRouter();
  const { usuario, isAuthenticated, isLoading: authLoading, logout, refreshUsuario } = useArenaAuth();
  const [avatarType, setAvatarType] = useState<AvatarType>('initials');
  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);
  const [lutadores, setLutadores] = useState<Lutador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    fetchLutadores();
  }, []);

  async function fetchLutadores() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/lutadores?limit=100&ordenar=ranking');
      if (res.ok) {
        const data = await res.json();
        // Filtrar apenas lutadores com imagem
        const comImagem = (data.lutadores || data).filter((l: Lutador) => l.imagem_url);
        setLutadores(comImagem);
      }
    } catch (error) {
      console.error('Erro ao carregar lutadores:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!usuario) return;

    setIsSaving(true);
    try {
      let avatarUrl: string | null = null;

      if (avatarType === 'fighter' && selectedFighter) {
        const fighter = lutadores.find(l => l.id === selectedFighter);
        avatarUrl = fighter?.imagem_url || null;
      } else if (avatarType === 'initials') {
        avatarUrl = null; // Vai usar iniciais
      }

      const res = await fetch('/api/arena/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: avatarUrl }),
      });

      if (res.ok) {
        await refreshUsuario();
        router.push(`/arena/perfil/${usuario.username}`);
      }
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const filteredLutadores = lutadores.filter(l =>
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.apelido && l.apelido.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <ArenaMenu isLoggedIn={isAuthenticated} />
            <Link href="/arena" className="font-display text-xl uppercase tracking-wider">
              <span className="text-white">Arena</span>
              <span className="text-ufc-red ml-1">UFC</span>
            </Link>
            <UserAvatar usuario={usuario} onLogout={logout} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <Link href={`/arena/perfil/${usuario?.username}`} className="text-dark-textMuted hover:text-white text-sm">
            ← Voltar ao perfil
          </Link>
          <h1 className="font-display text-3xl uppercase text-white mt-4">
            Escolha seu Avatar
          </h1>
          <p className="text-dark-textMuted mt-2">
            Personalize seu perfil com uma imagem unica
          </p>
        </div>

        {/* Tipo de avatar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setAvatarType('initials')}
            className={`p-4 rounded-xl border-2 transition-all ${
              avatarType === 'initials'
                ? 'border-ufc-red bg-ufc-red/10'
                : 'border-dark-border bg-dark-card hover:border-dark-border/80'
            }`}
          >
            <div className="text-3xl mb-2">🔤</div>
            <p className={`text-sm font-medium ${avatarType === 'initials' ? 'text-ufc-red' : 'text-white'}`}>
              Iniciais
            </p>
            <p className="text-xs text-dark-textMuted mt-1">
              Suas iniciais do nome
            </p>
          </button>

          <button
            onClick={() => setAvatarType('fighter')}
            className={`p-4 rounded-xl border-2 transition-all ${
              avatarType === 'fighter'
                ? 'border-ufc-red bg-ufc-red/10'
                : 'border-dark-border bg-dark-card hover:border-dark-border/80'
            }`}
          >
            <div className="text-3xl mb-2">🥊</div>
            <p className={`text-sm font-medium ${avatarType === 'fighter' ? 'text-ufc-red' : 'text-white'}`}>
              Lutador
            </p>
            <p className="text-xs text-dark-textMuted mt-1">
              Seu lutador favorito
            </p>
          </button>

          <button
            onClick={() => setAvatarType('upload')}
            className={`p-4 rounded-xl border-2 transition-all opacity-50 cursor-not-allowed ${
              avatarType === 'upload'
                ? 'border-ufc-red bg-ufc-red/10'
                : 'border-dark-border bg-dark-card'
            }`}
            disabled
          >
            <div className="text-3xl mb-2">📷</div>
            <p className={`text-sm font-medium ${avatarType === 'upload' ? 'text-ufc-red' : 'text-white'}`}>
              Upload
            </p>
            <p className="text-xs text-dark-textMuted mt-1">
              Em breve
            </p>
          </button>
        </div>

        {/* Preview atual */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-8">
          <p className="text-dark-textMuted text-sm mb-4">Preview:</p>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-dark-border flex items-center justify-center border-2 border-ufc-red">
              {avatarType === 'initials' ? (
                <span className="text-2xl font-bold text-ufc-red">
                  {usuario?.display_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ||
                   usuario?.username?.slice(0, 2).toUpperCase()}
                </span>
              ) : avatarType === 'fighter' && selectedFighter ? (
                <Image
                  src={lutadores.find(l => l.id === selectedFighter)?.imagem_url || ''}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-dark-textMuted">?</span>
              )}
            </div>
            <div>
              <p className="font-bold text-white">{usuario?.display_name || usuario?.username}</p>
              <p className="text-sm text-dark-textMuted">@{usuario?.username}</p>
            </div>
          </div>
        </div>

        {/* Selecao de lutador */}
        {avatarType === 'fighter' && (
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar lutador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-textMuted focus:outline-none focus:border-ufc-red"
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ufc-red" />
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-96 overflow-y-auto">
                {filteredLutadores.map((lutador) => (
                  <button
                    key={lutador.id}
                    onClick={() => setSelectedFighter(lutador.id)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedFighter === lutador.id
                        ? 'border-ufc-red ring-2 ring-ufc-red/50'
                        : 'border-dark-border hover:border-dark-border/80'
                    }`}
                    title={lutador.nome}
                  >
                    {lutador.imagem_url ? (
                      <Image
                        src={lutador.imagem_url}
                        alt={lutador.nome}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-border flex items-center justify-center">
                        <span className="text-xs text-dark-textMuted">?</span>
                      </div>
                    )}
                    {selectedFighter === lutador.id && (
                      <div className="absolute inset-0 bg-ufc-red/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {selectedFighter && (
              <div className="mt-4 pt-4 border-t border-dark-border">
                <p className="text-sm text-dark-textMuted">
                  Selecionado: <span className="text-white font-medium">
                    {lutadores.find(l => l.id === selectedFighter)?.nome}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Botao salvar */}
        <div className="mt-8 flex gap-4">
          <Link
            href={`/arena/perfil/${usuario?.username}`}
            className="flex-1 py-3 px-6 bg-dark-card border border-dark-border text-white font-medium rounded-lg hover:bg-dark-border transition-colors text-center"
          >
            Cancelar
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving || (avatarType === 'fighter' && !selectedFighter)}
            className="flex-1 py-3 px-6 bg-ufc-red hover:bg-ufc-redLight disabled:bg-dark-border disabled:text-dark-textMuted text-white font-medium rounded-lg transition-colors"
          >
            {isSaving ? 'Salvando...' : 'Salvar Avatar'}
          </button>
        </div>
      </main>
    </div>
  );
}
