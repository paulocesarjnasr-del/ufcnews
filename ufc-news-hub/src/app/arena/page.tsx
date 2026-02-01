'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArenaMenu } from '@/components/arena/ArenaMenu';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { Countdown } from '@/components/calendario/Countdown';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { verificarStatusPrevisoes, PrevisoesStatus } from '@/lib/arena/previsoes-horario';
import { EventoComLutas } from '@/types';

export default function ArenaPage() {
  const { usuario, isAuthenticated, isLoading: authLoading, logout } = useArenaAuth();
  const [proximoEvento, setProximoEvento] = useState<EventoComLutas & { poster_url?: string; horario_main_card?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previsoesStatus, setPrevisoesStatus] = useState<PrevisoesStatus | null>(null);

  useEffect(() => {
    fetchProximoEvento();
  }, []);

  useEffect(() => {
    if (proximoEvento) {
      const status = verificarStatusPrevisoes(
        proximoEvento.data_evento,
        proximoEvento.horario_main_card
      );
      setPrevisoesStatus(status);

      // Atualiza o status a cada minuto
      const interval = setInterval(() => {
        const newStatus = verificarStatusPrevisoes(
          proximoEvento.data_evento,
          proximoEvento.horario_main_card
        );
        setPrevisoesStatus(newStatus);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [proximoEvento]);

  async function fetchProximoEvento() {
    try {
      const res = await fetch('/api/eventos/proximo');
      if (res.ok) {
        const data = await res.json();
        setProximoEvento(data);
      }
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Imagem de background (poster do evento ou fallback)
  const backgroundImage = proximoEvento?.poster_url || proximoEvento?.imagem_url;

  return (
    <div className="min-h-screen bg-dark-bg relative">
      {/* Background do evento */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
          {/* Overlay gradiente para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/85 to-dark-bg" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header fixo */}
        <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Menu hamburguer */}
              <ArenaMenu isLoggedIn={isAuthenticated} />

              {/* Logo central */}
              <Link href="/arena" className="font-display text-xl uppercase tracking-wider">
                <span className="text-white">Arena</span>
                <span className="text-ufc-red ml-1">UFC</span>
              </Link>

              {/* Avatar / Login */}
              {!authLoading && (
                <UserAvatar usuario={usuario} onLogout={logout} />
              )}
              {authLoading && (
                <div className="w-10 h-10 rounded-full bg-dark-card animate-pulse" />
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
            </div>
          ) : proximoEvento ? (
            <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
              {/* Nome do evento */}
              <div className="text-center mb-6">
                <p className="text-dark-textMuted uppercase tracking-widest text-sm mb-2">
                  Proximo Evento
                </p>
                <h1 className="font-display text-4xl md:text-6xl uppercase text-white">
                  {proximoEvento.nome}
                </h1>
                {proximoEvento.local_evento && (
                  <p className="text-dark-textMuted mt-2">
                    {proximoEvento.local_evento}
                    {proximoEvento.cidade && `, ${proximoEvento.cidade}`}
                  </p>
                )}
              </div>

              {/* Countdown */}
              <div className="mb-8">
                <Countdown targetDate={proximoEvento.data_evento} />
              </div>

              {/* Status das previsoes */}
              {previsoesStatus && (
                <div className={`mb-8 px-6 py-3 rounded-full border ${
                  previsoesStatus.isOpen
                    ? 'bg-green-500/10 border-green-500/50 text-green-400'
                    : 'bg-ufc-red/10 border-ufc-red/50 text-ufc-red'
                }`}>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      previsoesStatus.isOpen ? 'bg-green-400 animate-pulse' : 'bg-ufc-red'
                    }`} />
                    {previsoesStatus.message}
                  </p>
                </div>
              )}

              {/* Botoes de acao */}
              <div className="flex flex-col items-center gap-4 w-full max-w-md">
                {/* Botao principal - Fazer previsoes */}
                {previsoesStatus?.isOpen ? (
                  <Link
                    href={isAuthenticated ? `/arena/evento/${proximoEvento.id}` : '/arena/login'}
                    className="w-full py-4 px-8 bg-ufc-red hover:bg-ufc-redLight text-white font-display text-lg uppercase tracking-wider rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-ufc-red/30"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Faca suas Previsoes</span>
                  </Link>
                ) : (
                  <div className="w-full py-4 px-8 bg-dark-card border border-dark-border text-dark-textMuted font-display text-lg uppercase tracking-wider rounded-lg flex items-center justify-center gap-3 cursor-not-allowed">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Previsoes Fechadas</span>
                  </div>
                )}

                {/* Botao secundario - Ver Fight Card do nosso site */}
                <Link
                  href={`/calendario/evento/${proximoEvento.id}`}
                  className="w-full py-3 px-8 bg-dark-card/80 hover:bg-dark-card border border-dark-border hover:border-ufc-gold/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5 text-ufc-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Ver Fight Card Completo</span>
                </Link>
              </div>

              {/* Info cards - Main Event preview */}
              {proximoEvento.lutas && proximoEvento.lutas.length > 0 && (
                <div className="mt-12 w-full max-w-2xl">
                  <div className="bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-xl p-6">
                    <p className="text-center text-dark-textMuted text-sm uppercase tracking-wider mb-4">
                      Main Event
                    </p>

                    {/* Main event fighters */}
                    {(() => {
                      // Encontrar main event: primeiro por tipo, depois por titulo, depois por maior ordem
                      const mainEvent =
                        proximoEvento.lutas.find(l => l.tipo === 'main_event') ||
                        proximoEvento.lutas.find(l => l.is_titulo) ||
                        proximoEvento.lutas.reduce((max, l) => (l.ordem > (max?.ordem || 0) ? l : max), proximoEvento.lutas[0]);
                      if (!mainEvent) return null;

                      return (
                        <div className="flex items-center justify-between gap-4">
                          {/* Fighter 1 */}
                          <div className="flex-1 text-center">
                            <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-dark-border">
                              {mainEvent.lutador1?.imagem_url ? (
                                <Image
                                  src={mainEvent.lutador1.imagem_url}
                                  alt={mainEvent.lutador1.nome}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-dark-textMuted">
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <p className="font-bold text-white text-sm">{mainEvent.lutador1?.nome}</p>
                            <p className="text-xs text-dark-textMuted">
                              {mainEvent.lutador1?.vitorias || 0}-{mainEvent.lutador1?.derrotas || 0}
                            </p>
                          </div>

                          {/* VS */}
                          <div className="flex flex-col items-center">
                            <span className="font-display text-2xl text-ufc-red">VS</span>
                            {mainEvent.is_titulo && (
                              <span className="mt-1 px-2 py-0.5 bg-ufc-gold/20 border border-ufc-gold/40 rounded text-xs text-ufc-gold">
                                TITULO
                              </span>
                            )}
                          </div>

                          {/* Fighter 2 */}
                          <div className="flex-1 text-center">
                            <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-dark-border">
                              {mainEvent.lutador2?.imagem_url ? (
                                <Image
                                  src={mainEvent.lutador2.imagem_url}
                                  alt={mainEvent.lutador2.nome}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-dark-textMuted">
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <p className="font-bold text-white text-sm">{mainEvent.lutador2?.nome}</p>
                            <p className="text-xs text-dark-textMuted">
                              {mainEvent.lutador2?.vitorias || 0}-{mainEvent.lutador2?.derrotas || 0}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Card info */}
                    <div className="mt-4 pt-4 border-t border-dark-border flex items-center justify-center gap-6 text-sm">
                      <span className="text-dark-textMuted">
                        <span className="text-white font-medium">{proximoEvento.lutas.length}</span> lutas
                      </span>
                      {proximoEvento.total_lutas && proximoEvento.total_lutas > 0 && (
                        <span className="text-dark-textMuted">
                          Card completo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick links - nao logado */}
              {!isAuthenticated && (
                <div className="mt-8 flex items-center gap-4">
                  <p className="text-dark-textMuted text-sm">Novo por aqui?</p>
                  <Link
                    href="/arena/registro"
                    className="text-ufc-red hover:text-ufc-redLight text-sm font-medium"
                  >
                    Criar conta gratis →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="text-6xl mb-4">🥊</div>
              <h2 className="font-display text-2xl uppercase text-white mb-2">
                Nenhum evento agendado
              </h2>
              <p className="text-dark-textMuted">
                Volte em breve para fazer suas previsoes!
              </p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
