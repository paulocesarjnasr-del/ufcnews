/**
 * Sistema de Pontuação da Arena
 * Processa previsões após lutas finalizadas e calcula pontos
 */

import { query, queryOne } from '@/lib/db';
import { PONTUACAO_CONFIG, TipoConquista } from '@/types/arena';

interface ResultadoProcessamento {
  previsoesProcessadas: number;
  pontosDistribuidos: number;
  conquistasDesbloqueadas: number;
  duelosFinalizados: number;
}

/**
 * Processa todas as previsões de uma luta finalizada
 */
export async function processarPrevisoesLuta(lutaId: string): Promise<ResultadoProcessamento> {
  const resultado: ResultadoProcessamento = {
    previsoesProcessadas: 0,
    pontosDistribuidos: 0,
    conquistasDesbloqueadas: 0,
    duelosFinalizados: 0,
  };

  // Buscar dados da luta
  const luta = await queryOne<{
    id: string;
    evento_id: string;
    vencedor_id: string | null;
    metodo: string | null;
    round_final: number | null;
    tipo: string;
  }>(
    `SELECT id, evento_id, vencedor_id, metodo, round_final, tipo FROM lutas WHERE id = $1`,
    [lutaId]
  );

  if (!luta || !luta.vencedor_id) {
    console.log(`Luta ${lutaId} não tem vencedor definido`);
    return resultado;
  }

  // Buscar previsões não processadas desta luta
  const previsoes = await query<{
    id: string;
    usuario_id: string;
    vencedor_previsto_id: string;
    metodo_previsto: string | null;
    round_previsto: number | null;
    pontos_confianca: number;
    odds_vencedor_previsto: number | null;
  }>(
    `SELECT id, usuario_id, vencedor_previsto_id, metodo_previsto, round_previsto,
            pontos_confianca, odds_vencedor_previsto
     FROM previsoes
     WHERE luta_id = $1 AND processada = false`,
    [lutaId]
  );

  for (const previsao of previsoes) {
    try {
      // Calcular acertos
      const acertouVencedor = previsao.vencedor_previsto_id === luta.vencedor_id;
      const acertouMetodo = acertouVencedor && previsao.metodo_previsto === luta.metodo;
      const acertouRound = acertouVencedor && previsao.round_previsto === luta.round_final;

      // Calcular pontuação
      let pontosBase = 0;
      let multiplicadorMetodo = 1.0;
      let multiplicadorRound = 1.0;
      let multiplicadorUnderdog = 1.0;
      let multiplicadorConfianca = previsao.pontos_confianca / 100;

      if (acertouVencedor) {
        pontosBase = PONTUACAO_CONFIG.PONTOS_BASE_VENCEDOR;

        if (acertouMetodo) {
          pontosBase += PONTUACAO_CONFIG.BONUS_METODO;
          multiplicadorMetodo = 1.5;
        }

        if (acertouRound) {
          pontosBase += PONTUACAO_CONFIG.BONUS_ROUND;
          multiplicadorRound = 2.0;
        }

        // Multiplicador de underdog baseado nas odds
        if (previsao.odds_vencedor_previsto) {
          const odds = previsao.odds_vencedor_previsto;
          if (odds >= 500) {
            multiplicadorUnderdog = PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_HIGH;
          } else if (odds >= 300) {
            multiplicadorUnderdog = PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_MID;
          } else if (odds >= PONTUACAO_CONFIG.UNDERDOG_THRESHOLD) {
            multiplicadorUnderdog = PONTUACAO_CONFIG.UNDERDOG_MULTIPLIER_BASE;
          }
        }
      }

      const pontosGanhos = Math.round(
        pontosBase * multiplicadorConfianca * multiplicadorUnderdog
      );
      const xpGanho = acertouVencedor
        ? PONTUACAO_CONFIG.XP_ACERTO + (acertouMetodo ? 10 : 0) + (acertouRound ? 10 : 0)
        : 0;

      // Atualizar previsão
      await query(
        `UPDATE previsoes SET
          processada = true,
          acertou_vencedor = $1,
          acertou_metodo = $2,
          acertou_round = $3,
          pontos_base = $4,
          multiplicador_metodo = $5,
          multiplicador_round = $6,
          multiplicador_underdog = $7,
          multiplicador_confianca = $8,
          pontos_ganhos = $9,
          xp_ganho = $10
        WHERE id = $11`,
        [
          acertouVencedor,
          acertouMetodo,
          acertouRound,
          pontosBase,
          multiplicadorMetodo,
          multiplicadorRound,
          multiplicadorUnderdog,
          multiplicadorConfianca,
          pontosGanhos,
          xpGanho,
          previsao.id,
        ]
      );

      // Atualizar estatísticas do usuário
      await atualizarEstatisticasUsuario(
        previsao.usuario_id,
        acertouVencedor,
        acertouMetodo,
        acertouRound,
        pontosGanhos,
        xpGanho,
        luta.metodo || '',
        multiplicadorUnderdog > 1.0,
        luta.tipo === 'main_event'
      );

      resultado.previsoesProcessadas++;
      resultado.pontosDistribuidos += pontosGanhos;

      // Verificar conquistas
      const conquistasNovas = await verificarConquistas(previsao.usuario_id);
      resultado.conquistasDesbloqueadas += conquistasNovas;

    } catch (error) {
      console.error(`Erro ao processar previsão ${previsao.id}:`, error);
    }
  }

  return resultado;
}

/**
 * Processa todas as lutas de um evento finalizado
 */
export async function processarEventoFinalizado(eventoId: string): Promise<ResultadoProcessamento> {
  const resultadoTotal: ResultadoProcessamento = {
    previsoesProcessadas: 0,
    pontosDistribuidos: 0,
    conquistasDesbloqueadas: 0,
    duelosFinalizados: 0,
  };

  // Buscar lutas finalizadas do evento
  const lutas = await query<{ id: string }>(
    `SELECT id FROM lutas WHERE evento_id = $1 AND status = 'finalizada' AND vencedor_id IS NOT NULL`,
    [eventoId]
  );

  for (const luta of lutas) {
    const resultado = await processarPrevisoesLuta(luta.id);
    resultadoTotal.previsoesProcessadas += resultado.previsoesProcessadas;
    resultadoTotal.pontosDistribuidos += resultado.pontosDistribuidos;
    resultadoTotal.conquistasDesbloqueadas += resultado.conquistasDesbloqueadas;
  }

  // Atualizar pontuação por evento
  await atualizarPontuacaoEvento(eventoId);

  // Verificar cards perfeitos
  await verificarCardPerfeito(eventoId);

  // Finalizar duelos do evento
  resultadoTotal.duelosFinalizados = await finalizarDuelosEvento(eventoId);

  // Atualizar rankings das ligas
  await atualizarRankingsLigas(eventoId);

  return resultadoTotal;
}

/**
 * Atualiza estatísticas do usuário após uma previsão
 */
async function atualizarEstatisticasUsuario(
  usuarioId: string,
  acertouVencedor: boolean,
  acertouMetodo: boolean,
  acertouRound: boolean,
  pontosGanhos: number,
  xpGanho: number,
  metodo: string,
  foiUnderdog: boolean,
  foiMainEvent: boolean
): Promise<void> {
  // Determinar incrementos
  const previsaoPerfeita = acertouVencedor && acertouMetodo && acertouRound;
  const foiKO = metodo === 'KO/TKO';
  const foiSub = metodo === 'Submission';
  const foiDecisao = metodo?.includes('Decision');

  await query(
    `UPDATE usuarios_arena SET
      pontos_totais = pontos_totais + $1,
      xp_total = xp_total + $2,
      previsoes_corretas = previsoes_corretas + $3,
      previsoes_perfeitas = previsoes_perfeitas + $4,
      streak_atual = CASE WHEN $5 THEN streak_atual + 1 ELSE 0 END,
      melhor_streak = GREATEST(melhor_streak, CASE WHEN $5 THEN streak_atual + 1 ELSE 0 END),
      streak_main_event = CASE WHEN $6 AND $5 THEN streak_main_event + 1 ELSE CASE WHEN $6 THEN 0 ELSE streak_main_event END END,
      melhor_streak_main_event = GREATEST(melhor_streak_main_event, CASE WHEN $6 AND $5 THEN streak_main_event + 1 ELSE streak_main_event END),
      underdogs_acertados = underdogs_acertados + $7,
      kos_acertados = kos_acertados + $8,
      subs_acertados = subs_acertados + $9,
      decisoes_acertadas = decisoes_acertadas + $10
    WHERE id = $11`,
    [
      pontosGanhos,
      xpGanho,
      acertouVencedor ? 1 : 0,
      previsaoPerfeita ? 1 : 0,
      acertouVencedor,
      foiMainEvent,
      foiUnderdog && acertouVencedor ? 1 : 0,
      foiKO && acertouVencedor ? 1 : 0,
      foiSub && acertouVencedor ? 1 : 0,
      foiDecisao && acertouVencedor ? 1 : 0,
      usuarioId,
    ]
  );
}

/**
 * Atualiza tabela de pontuação por evento
 */
async function atualizarPontuacaoEvento(eventoId: string): Promise<void> {
  // Calcular e inserir/atualizar pontuação por usuário no evento
  await query(
    `INSERT INTO evento_pontuacao (evento_id, usuario_id, pontos_totais, acertos, total_lutas, previsoes_perfeitas)
     SELECT
       $1,
       p.usuario_id,
       COALESCE(SUM(p.pontos_ganhos), 0),
       COUNT(CASE WHEN p.acertou_vencedor THEN 1 END),
       COUNT(p.id),
       COUNT(CASE WHEN p.acertou_vencedor AND p.acertou_metodo AND p.acertou_round THEN 1 END)
     FROM previsoes p
     WHERE p.evento_id = $1 AND p.processada = true
     GROUP BY p.usuario_id
     ON CONFLICT (evento_id, usuario_id) DO UPDATE SET
       pontos_totais = EXCLUDED.pontos_totais,
       acertos = EXCLUDED.acertos,
       total_lutas = EXCLUDED.total_lutas,
       previsoes_perfeitas = EXCLUDED.previsoes_perfeitas`,
    [eventoId]
  );
}

/**
 * Verifica e marca cards perfeitos
 */
async function verificarCardPerfeito(eventoId: string): Promise<void> {
  // Buscar total de lutas do evento
  const totalLutas = await queryOne<{ count: number }>(
    `SELECT COUNT(*) as count FROM lutas WHERE evento_id = $1 AND status = 'finalizada'`,
    [eventoId]
  );

  if (!totalLutas || totalLutas.count === 0) return;

  // Buscar usuários que acertaram todas
  const cardsPerfeitos = await query<{ usuario_id: string }>(
    `SELECT p.usuario_id
     FROM previsoes p
     WHERE p.evento_id = $1 AND p.processada = true
     GROUP BY p.usuario_id
     HAVING COUNT(CASE WHEN p.acertou_vencedor THEN 1 END) = $2`,
    [eventoId, totalLutas.count]
  );

  for (const { usuario_id } of cardsPerfeitos) {
    // Marcar card perfeito
    await query(
      `UPDATE evento_pontuacao SET card_perfeito = true WHERE evento_id = $1 AND usuario_id = $2`,
      [eventoId, usuario_id]
    );

    // Dar bônus
    await query(
      `UPDATE usuarios_arena SET
        pontos_totais = pontos_totais + $1,
        xp_total = xp_total + 100
      WHERE id = $2`,
      [PONTUACAO_CONFIG.BONUS_CARD_PERFEITO, usuario_id]
    );

    // Conquista perfect_card
    await query(
      `INSERT INTO conquistas (usuario_id, tipo, detalhes)
       VALUES ($1, 'perfect_card', $2)
       ON CONFLICT (usuario_id, tipo) DO NOTHING`,
      [usuario_id, JSON.stringify({ evento_id: eventoId })]
    );

    // Criar atividade
    await query(
      `INSERT INTO atividades (usuario_id, tipo, titulo, descricao, dados)
       VALUES ($1, 'card_perfeito', 'Card Perfeito!', 'Acertou todas as lutas do evento!', $2)`,
      [usuario_id, JSON.stringify({ evento_id: eventoId })]
    );
  }
}

/**
 * Finaliza duelos de um evento
 */
async function finalizarDuelosEvento(eventoId: string): Promise<number> {
  // Buscar duelos aceitos do evento
  const duelos = await query<{
    id: string;
    desafiante_id: string;
    desafiado_id: string;
  }>(
    `SELECT id, desafiante_id, desafiado_id FROM duelos WHERE evento_id = $1 AND status = 'aceito'`,
    [eventoId]
  );

  let finalizados = 0;

  for (const duelo of duelos) {
    // Calcular pontos de cada um
    const pontosDesafiante = await queryOne<{ pontos: number; acertos: number }>(
      `SELECT COALESCE(SUM(pontos_ganhos), 0) as pontos, COUNT(CASE WHEN acertou_vencedor THEN 1 END) as acertos
       FROM previsoes WHERE usuario_id = $1 AND evento_id = $2`,
      [duelo.desafiante_id, eventoId]
    );

    const pontosDesafiado = await queryOne<{ pontos: number; acertos: number }>(
      `SELECT COALESCE(SUM(pontos_ganhos), 0) as pontos, COUNT(CASE WHEN acertou_vencedor THEN 1 END) as acertos
       FROM previsoes WHERE usuario_id = $1 AND evento_id = $2`,
      [duelo.desafiado_id, eventoId]
    );

    // Determinar vencedor
    let vencedorId: string | null = null;
    if ((pontosDesafiante?.pontos || 0) > (pontosDesafiado?.pontos || 0)) {
      vencedorId = duelo.desafiante_id;
    } else if ((pontosDesafiado?.pontos || 0) > (pontosDesafiante?.pontos || 0)) {
      vencedorId = duelo.desafiado_id;
    }
    // Se empate em pontos, quem tem mais acertos
    else if ((pontosDesafiante?.acertos || 0) > (pontosDesafiado?.acertos || 0)) {
      vencedorId = duelo.desafiante_id;
    } else if ((pontosDesafiado?.acertos || 0) > (pontosDesafiante?.acertos || 0)) {
      vencedorId = duelo.desafiado_id;
    }
    // Se ainda empate, deixa null (empate)

    // Atualizar duelo
    await query(
      `UPDATE duelos SET
        status = 'finalizado',
        vencedor_id = $1,
        pontos_desafiante = $2,
        pontos_desafiado = $3,
        acertos_desafiante = $4,
        acertos_desafiado = $5,
        finalizado_em = NOW()
      WHERE id = $6`,
      [
        vencedorId,
        pontosDesafiante?.pontos || 0,
        pontosDesafiado?.pontos || 0,
        pontosDesafiante?.acertos || 0,
        pontosDesafiado?.acertos || 0,
        duelo.id,
      ]
    );

    // Dar XP ao vencedor
    if (vencedorId) {
      await query(
        `UPDATE usuarios_arena SET xp_total = xp_total + $1 WHERE id = $2`,
        [PONTUACAO_CONFIG.XP_DUELO_VENCIDO, vencedorId]
      );

      // Notificar participantes
      const perdedorId = vencedorId === duelo.desafiante_id ? duelo.desafiado_id : duelo.desafiante_id;

      await query(
        `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
         VALUES ($1, 'duelo_vencido', 'Você venceu o duelo!', 'Parabéns pela vitória!', $2)`,
        [vencedorId, JSON.stringify({ duelo_id: duelo.id })]
      );

      await query(
        `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
         VALUES ($1, 'duelo_perdido', 'Duelo finalizado', 'Você perdeu o duelo. Na próxima!', $2)`,
        [perdedorId, JSON.stringify({ duelo_id: duelo.id })]
      );
    }

    finalizados++;
  }

  return finalizados;
}

/**
 * Atualiza rankings das ligas após evento
 */
async function atualizarRankingsLigas(eventoId: string): Promise<void> {
  // Buscar ligas ativas
  const ligas = await query<{ id: string }>(
    `SELECT DISTINCT l.id
     FROM ligas l
     JOIN liga_membros lm ON lm.liga_id = l.id
     JOIN previsoes p ON p.usuario_id = lm.usuario_id AND p.evento_id = $1
     WHERE l.status = 'ativa'`,
    [eventoId]
  );

  for (const liga of ligas) {
    // Atualizar pontos dos membros
    await query(
      `UPDATE liga_membros lm SET
        pontos_temporada = pontos_temporada + COALESCE((
          SELECT SUM(p.pontos_ganhos)
          FROM previsoes p
          WHERE p.usuario_id = lm.usuario_id AND p.evento_id = $1
        ), 0),
        eventos_participados = eventos_participados + 1
      WHERE lm.liga_id = $2
        AND EXISTS (SELECT 1 FROM previsoes p WHERE p.usuario_id = lm.usuario_id AND p.evento_id = $1)`,
      [eventoId, liga.id]
    );

    // Atualizar posições
    await query(
      `WITH ranked AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY pontos_temporada DESC) as nova_posicao
        FROM liga_membros WHERE liga_id = $1
      )
      UPDATE liga_membros lm SET
        posicao_atual = r.nova_posicao,
        melhor_posicao = LEAST(COALESCE(melhor_posicao, r.nova_posicao), r.nova_posicao),
        pior_posicao = GREATEST(COALESCE(pior_posicao, r.nova_posicao), r.nova_posicao)
      FROM ranked r WHERE lm.id = r.id`,
      [liga.id]
    );

    // Verificar troca de campeão
    const novoLider = await queryOne<{ usuario_id: string }>(
      `SELECT usuario_id FROM liga_membros WHERE liga_id = $1 ORDER BY pontos_temporada DESC LIMIT 1`,
      [liga.id]
    );

    const ligaInfo = await queryOne<{ campeao_id: string | null }>(
      `SELECT campeao_id FROM ligas WHERE id = $1`,
      [liga.id]
    );

    if (novoLider && novoLider.usuario_id !== ligaInfo?.campeao_id) {
      // Novo campeão!
      await query(
        `UPDATE ligas SET
          campeao_id = $1,
          campeao_desde = NOW(),
          defesas_titulo = 0
        WHERE id = $2`,
        [novoLider.usuario_id, liga.id]
      );

      // Notificar novo campeão
      await query(
        `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
         VALUES ($1, 'novo_campeao', '👑 Você é o novo campeão!', 'Parabéns! Você assumiu a liderança da liga!', $2)`,
        [novoLider.usuario_id, JSON.stringify({ liga_id: liga.id })]
      );
    } else if (novoLider && novoLider.usuario_id === ligaInfo?.campeao_id) {
      // Campeão defendeu
      await query(
        `UPDATE ligas SET defesas_titulo = defesas_titulo + 1 WHERE id = $1`,
        [liga.id]
      );
    }

    // Incrementar eventos disputados da liga
    await query(
      `UPDATE ligas SET total_eventos_disputados = total_eventos_disputados + 1 WHERE id = $1`,
      [liga.id]
    );
  }
}

/**
 * Verifica e desbloqueia conquistas para um usuário
 */
async function verificarConquistas(usuarioId: string): Promise<number> {
  let conquistasNovas = 0;

  const usuario = await queryOne<{
    previsoes_perfeitas: number;
    streak_atual: number;
    streak_main_event: number;
    underdogs_acertados: number;
    kos_acertados: number;
    subs_acertados: number;
    total_previsoes: number;
    previsoes_corretas: number;
    total_amigos: number;
  }>(
    `SELECT previsoes_perfeitas, streak_atual, streak_main_event, underdogs_acertados,
            kos_acertados, subs_acertados, total_previsoes, previsoes_corretas, total_amigos
     FROM usuarios_arena WHERE id = $1`,
    [usuarioId]
  );

  if (!usuario) return 0;

  const conquistasParaVerificar: { tipo: TipoConquista; condicao: boolean }[] = [
    { tipo: 'sniper', condicao: usuario.previsoes_perfeitas >= 5 },
    { tipo: 'on_fire', condicao: usuario.streak_main_event >= 10 },
    { tipo: 'knockout_artist', condicao: usuario.kos_acertados >= 10 },
    { tipo: 'submission_specialist', condicao: usuario.subs_acertados >= 10 },
    { tipo: 'underdog_hunter', condicao: usuario.underdogs_acertados >= 10 },
    { tipo: 'streak_5', condicao: usuario.streak_atual >= 5 },
    { tipo: 'streak_10', condicao: usuario.streak_atual >= 10 },
    { tipo: 'streak_20', condicao: usuario.streak_atual >= 20 },
    { tipo: 'analyst', condicao: usuario.total_previsoes >= 50 && (usuario.previsoes_corretas / usuario.total_previsoes) >= 0.7 },
    { tipo: 'social_butterfly', condicao: usuario.total_amigos >= 10 },
    { tipo: 'main_event_master', condicao: usuario.streak_main_event >= 20 },
  ];

  for (const { tipo, condicao } of conquistasParaVerificar) {
    if (condicao) {
      const result = await query(
        `INSERT INTO conquistas (usuario_id, tipo)
         VALUES ($1, $2)
         ON CONFLICT (usuario_id, tipo) DO NOTHING
         RETURNING id`,
        [usuarioId, tipo]
      );

      if (result.length > 0) {
        conquistasNovas++;

        // Dar XP pela conquista
        await query(
          `UPDATE usuarios_arena SET xp_total = xp_total + $1 WHERE id = $2`,
          [PONTUACAO_CONFIG.XP_CONQUISTA, usuarioId]
        );

        // Criar notificação
        await query(
          `INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, dados)
           VALUES ($1, 'conquista', 'Nova conquista desbloqueada!', $2, $3)`,
          [usuarioId, `Você desbloqueou a conquista "${tipo}"!`, JSON.stringify({ tipo })]
        );
      }
    }
  }

  return conquistasNovas;
}

export { verificarConquistas, atualizarPontuacaoEvento };
