'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { PONTUACAO_CONFIG, NIVEL_CONFIG, CONQUISTAS_DEFINICOES } from '@/types/arena';

export default function ComoFuncionaPage() {
  const t = useTranslations('arena');

  return (
    <div>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
            {t('howto_title_prefix')} <span className="text-ufc-red">{t('howto_title_accent')}</span>
          </h1>
          <p className="text-dark-textMuted text-lg max-w-2xl mx-auto">
            {t('howto_subtitle')}
          </p>
        </div>

        {/* Secao 1 - Como fazer previsoes */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="font-display text-2xl uppercase text-white">
              {t('howto_making_predictions')}
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="text-ufc-red font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{t('howto_when_predict')}</h3>
                  <p className="text-dark-textMuted">
                    {t('howto_when_predict_desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="text-ufc-red font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{t('howto_what_predict')}</h3>
                  <p className="text-dark-textMuted">
                    {t('howto_what_predict_desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                  <span className="text-ufc-red font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{t('howto_must_predict_all')}</h3>
                  <p className="text-dark-textMuted">
                    {t('howto_must_predict_all_desc')}
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
              {t('howto_scoring_system')}
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pontos base */}
              <div>
                <h3 className="font-bold text-white mb-4">{t('howto_base_points')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <span className="text-dark-textMuted">{t('howto_correct_winner')}</span>
                    <span className="text-ufc-red font-bold">+{PONTUACAO_CONFIG.PONTOS_BASE_VENCEDOR} pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <span className="text-dark-textMuted">{t('howto_correct_method')}</span>
                    <span className="text-ufc-gold font-bold">+{PONTUACAO_CONFIG.BONUS_METODO} pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <span className="text-dark-textMuted">{t('howto_correct_round')}</span>
                    <span className="text-green-400 font-bold">+{PONTUACAO_CONFIG.BONUS_ROUND} pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-ufc-gold/30">
                    <span className="text-white font-medium">{t('howto_perfect_card')}</span>
                    <span className="text-ufc-gold font-bold">+{PONTUACAO_CONFIG.BONUS_CARD_PERFEITO} pts</span>
                  </div>
                </div>
              </div>

              {/* Multiplicadores */}
              <div>
                <h3 className="font-bold text-white mb-4">{t('howto_multipliers')}</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-dark-bg rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-dark-textMuted">Underdog (+150 a +299)</span>
                      <span className="text-purple-400 font-bold">{PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_BASE}x</span>
                    </div>
                    <p className="text-xs text-dark-textMuted">{t('howto_underdog_bonus')}</p>
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
                    <p className="text-xs text-dark-textMuted">{t('howto_big_underdog')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exemplo */}
            <div className="mt-6 p-4 bg-ufc-red/5 border border-ufc-red/20 rounded-lg">
              <h4 className="font-bold text-ufc-red mb-2">{t('howto_example_title')}</h4>
              <p className="text-dark-textMuted text-sm">
                {t('howto_example_desc')}
              </p>
              <div className="mt-2 text-sm">
                <span className="text-white">{t('howto_example_calc')}</span>
                <br />
                <span className="text-ufc-gold">{t('howto_example_total')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Secao 3 - Niveis */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📈</span>
            <h2 className="font-display text-2xl uppercase text-white">
              {t('howto_levels_xp')}
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-dark-textMuted mb-6">
              {t('howto_levels_desc')}
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
                <p className="text-xs text-dark-textMuted">{t('howto_xp_per_prediction')}</p>
              </div>
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-green-400">{PONTUACAO_CONFIG.XP_ACERTO}</p>
                <p className="text-xs text-dark-textMuted">{t('howto_xp_per_correct')}</p>
              </div>
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-ufc-gold">{PONTUACAO_CONFIG.XP_CARD_COMPLETO}</p>
                <p className="text-xs text-dark-textMuted">{t('howto_xp_complete_card')}</p>
              </div>
              <div className="p-3 bg-dark-bg rounded-lg text-center">
                <p className="text-lg font-bold text-purple-400">{PONTUACAO_CONFIG.XP_CONQUISTA}</p>
                <p className="text-xs text-dark-textMuted">{t('howto_xp_per_achievement')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secao 4 - Conquistas */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏅</span>
            <h2 className="font-display text-2xl uppercase text-white">
              {t('howto_achievements')}
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-dark-textMuted mb-6">
              {t('howto_achievements_desc')}
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
                {t('howto_more_achievements', { count: CONQUISTAS_DEFINICOES.length - 12 })}
              </p>
            )}
          </div>
        </section>

        {/* Secao 5 - Ligas */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="font-display text-2xl uppercase text-white">
              {t('howto_leagues')}
            </h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-ufc-gold/20 rounded-lg">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('howto_create_league')}</h3>
                  <p className="text-dark-textMuted text-sm">
                    {t('howto_create_league_desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <span className="text-xl">🌍</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('howto_public_leagues')}</h3>
                  <p className="text-dark-textMuted text-sm">
                    {t('howto_public_leagues_desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <span className="text-xl">👑</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('howto_be_champion')}</h3>
                  <p className="text-dark-textMuted text-sm">
                    {t('howto_be_champion_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-ufc-red/20 to-ufc-gold/20 border border-ufc-red/30 rounded-xl p-8 text-center">
          <h2 className="font-display text-2xl uppercase text-white mb-4">
            {t('howto_ready')}
          </h2>
          <p className="text-dark-textMuted mb-6 max-w-lg mx-auto">
            {t('howto_ready_desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/arena/registro"
              className="px-8 py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-bold rounded-lg transition-colors"
            >
              {t('howto_create_account')}
            </Link>
            <Link
              href="/arena"
              className="px-8 py-3 bg-dark-card border border-dark-border hover:border-ufc-gold/50 text-white rounded-lg transition-colors"
            >
              {t('howto_back_to_arena')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
