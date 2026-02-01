'use client';

import Link from 'next/link';
import { ArenaMenu } from '@/components/arena/ArenaMenu';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { PONTUACAO_CONFIG, NIVEL_CONFIG, CONQUISTAS_DEFINICOES } from '@/types/arena';

export default function ComoFuncionaPage() {
  const { usuario, isAuthenticated, isLoading, logout } = useArenaAuth();

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
            {!isLoading && <UserAvatar usuario={usuario} onLogout={logout} />}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
            Como <span className="text-ufc-red">Funciona</span>
          </h1>
          <p className="text-dark-textMuted text-lg max-w-2xl mx-auto">
            Aprenda como funciona o sistema de previsoes, pontuacao e conquistas da Arena UFC
          </p>
        </div>

        {/* Secao 1 - Como fazer previsoes */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="font-display text-2xl uppercase text-white">
              Fazendo Previsoes
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="text-ufc-red font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Quando posso fazer previsoes?</h3>
                  <p className="text-dark-textMuted">
                    As previsoes abrem todo <span className="text-ufc-gold font-medium">domingo as 12h</span> e
                    fecham <span className="text-ufc-gold font-medium">1 hora antes</span> do evento no sabado.
                    Voce tem a semana inteira para analisar o card!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="text-ufc-red font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">O que posso prever?</h3>
                  <p className="text-dark-textMuted">
                    Para cada luta voce pode prever: o <span className="text-white font-medium">vencedor</span>,
                    o <span className="text-white font-medium">metodo</span> (KO, Submission, Decision) e
                    o <span className="text-white font-medium">round</span> da vitoria.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="text-ufc-red font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Preciso prever todas as lutas?</h3>
                  <p className="text-dark-textMuted">
                    Nao! Voce pode prever quantas lutas quiser. Porem, fazer previsoes em mais lutas
                    aumenta suas chances de subir no ranking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secao 2 - Sistema de Pontuacao */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="font-display text-2xl uppercase text-white">
              Sistema de Pontuacao
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pontos base */}
              <div>
                <h3 className="font-bold text-white mb-4">Pontos Base</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <span className="text-dark-textMuted">Acertar vencedor</span>
                    <span className="text-ufc-red font-bold">+{PONTUACAO_CONFIG.PONTOS_BASE_VENCEDOR} pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <span className="text-dark-textMuted">Acertar metodo</span>
                    <span className="text-ufc-gold font-bold">+{PONTUACAO_CONFIG.BONUS_METODO} pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <span className="text-dark-textMuted">Acertar round</span>
                    <span className="text-green-400 font-bold">+{PONTUACAO_CONFIG.BONUS_ROUND} pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-ufc-gold/30">
                    <span className="text-white font-medium">Card Perfeito</span>
                    <span className="text-ufc-gold font-bold">+{PONTUACAO_CONFIG.BONUS_CARD_PERFEITO} pts</span>
                  </div>
                </div>
              </div>

              {/* Multiplicadores */}
              <div>
                <h3 className="font-bold text-white mb-4">Multiplicadores</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-dark-bg rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-dark-textMuted">Underdog (+150 a +299)</span>
                      <span className="text-purple-400 font-bold">{PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_BASE}x</span>
                    </div>
                    <p className="text-xs text-dark-textMuted">Bonus por acertar o azarao</p>
                  </div>
                  <div className="p-3 bg-dark-bg rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-dark-textMuted">Underdog (+300 a +499)</span>
                      <span className="text-purple-400 font-bold">{PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_MID}x</span>
                    </div>
                  </div>
                  <div className="p-3 bg-dark-bg rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-dark-textMuted">Underdog (+500+)</span>
                      <span className="text-purple-400 font-bold">{PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_HIGH}x</span>
                    </div>
                    <p className="text-xs text-dark-textMuted">Grande azarao!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exemplo */}
            <div className="mt-6 p-4 bg-ufc-red/5 border border-ufc-red/20 rounded-lg">
              <h4 className="font-bold text-ufc-red mb-2">Exemplo de Calculo</h4>
              <p className="text-dark-textMuted text-sm">
                Voce previu que o underdog (+300) vai vencer por KO no Round 2, e acertou tudo!
              </p>
              <div className="mt-2 text-sm">
                <span className="text-white">100 (vencedor) + 50 (metodo) + 50 (round) = 200 pts</span>
                <br />
                <span className="text-ufc-gold">200 x 1.5 (underdog) = 300 pts totais!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Secao 3 - Niveis */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📈</span>
            <h2 className="font-display text-2xl uppercase text-white">
              Niveis e XP
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-dark-textMuted mb-6">
              Ganhe XP fazendo previsoes e acertando resultados. Quanto mais XP, maior seu nivel!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.entries(NIVEL_CONFIG) as [string, { icone: string; cor: string; xp_necessario: number }][]).map(([nivel, config]) => (
                <div
                  key={nivel}
                  className="p-4 bg-dark-bg rounded-lg text-center"
                  style={{ borderLeft: `3px solid ${config.cor}` }}
                >
                  <span className="text-2xl">{config.icone}</span>
                  <p className="font-medium text-white capitalize mt-2">{nivel}</p>
                  <p className="text-xs text-dark-textMuted mt-1">
                    {config.xp_necessario < 999999 ? `${config.xp_necessario} XP` : 'MAX'}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-ufc-red">{PONTUACAO_CONFIG.XP_POR_PREVISAO}</p>
                <p className="text-xs text-dark-textMuted">XP por previsao</p>
              </div>
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-green-400">{PONTUACAO_CONFIG.XP_ACERTO}</p>
                <p className="text-xs text-dark-textMuted">XP por acerto</p>
              </div>
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-ufc-gold">{PONTUACAO_CONFIG.XP_CARD_COMPLETO}</p>
                <p className="text-xs text-dark-textMuted">XP card completo</p>
              </div>
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-purple-400">{PONTUACAO_CONFIG.XP_CONQUISTA}</p>
                <p className="text-xs text-dark-textMuted">XP por conquista</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secao 4 - Conquistas */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏅</span>
            <h2 className="font-display text-2xl uppercase text-white">
              Conquistas
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-dark-textMuted mb-6">
              Desbloqueie conquistas especiais cumprindo objetivos. Cada conquista da XP bonus!
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              {CONQUISTAS_DEFINICOES.slice(0, 12).map((conquista) => (
                <div
                  key={conquista.tipo}
                  className="flex items-center gap-3 p-3 bg-dark-bg rounded-lg"
                >
                  <span className="text-2xl">{conquista.icone}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{conquista.nome}</p>
                    <p className="text-xs text-dark-textMuted truncate">{conquista.descricao}</p>
                  </div>
                </div>
              ))}
            </div>

            {CONQUISTAS_DEFINICOES.length > 12 && (
              <p className="text-center text-dark-textMuted text-sm mt-4">
                +{CONQUISTAS_DEFINICOES.length - 12} conquistas para descobrir...
              </p>
            )}
          </div>
        </section>

        {/* Secao 5 - Ligas */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="font-display text-2xl uppercase text-white">
              Ligas
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-ufc-gold/20 rounded-lg">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Crie sua liga</h3>
                  <p className="text-dark-textMuted text-sm">
                    Crie uma liga privada e convide seus amigos para competir. Defina as regras e
                    seja o dono da sua propria competicao!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <span className="text-xl">🌍</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Ligas publicas</h3>
                  <p className="text-dark-textMuted text-sm">
                    Entre em ligas publicas e compete com fas do UFC do mundo todo.
                    Suba no ranking e conquiste o titulo de campeao!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <span className="text-xl">👑</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Seja campeao</h3>
                  <p className="text-dark-textMuted text-sm">
                    O primeiro lugar ao final da temporada vira campeao da liga e ganha
                    o titulo para defender!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-ufc-red/20 to-ufc-gold/20 border border-ufc-red/30 rounded-xl p-8 text-center">
          <h2 className="font-display text-2xl uppercase text-white mb-4">
            Pronto para comecar?
          </h2>
          <p className="text-dark-textMuted mb-6 max-w-lg mx-auto">
            Crie sua conta gratis e comece a fazer previsoes agora mesmo!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/arena/registro"
              className="px-8 py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-bold rounded-lg transition-colors"
            >
              Criar Conta Gratis
            </Link>
            <Link
              href="/arena"
              className="px-8 py-3 bg-dark-card border border-dark-border hover:border-ufc-gold/50 text-white rounded-lg transition-colors"
            >
              Voltar para Arena
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
