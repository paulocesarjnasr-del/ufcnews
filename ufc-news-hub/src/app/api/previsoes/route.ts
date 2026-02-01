import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne, transaction } from '@/lib/db';
import { Previsao, NovaPrevisao, Luta } from '@/types';

// Sistema de pontuação
const PONTOS = {
  ACERTO_VENCEDOR: 10,
  ACERTO_METODO: 5,
  ACERTO_ROUND: 10,
};

export async function POST(request: NextRequest) {
  try {
    const body: NovaPrevisao = await request.json();
    const { luta_id, usuario_fingerprint, usuario_nome, lutador_escolhido_id, metodo_previsto, round_previsto } = body;

    // Validações
    if (!luta_id || !usuario_fingerprint || !usuario_nome || !lutador_escolhido_id) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: luta_id, usuario_fingerprint, usuario_nome, lutador_escolhido_id' },
        { status: 400 }
      );
    }

    if (usuario_nome.length < 2 || usuario_nome.length > 50) {
      return NextResponse.json(
        { error: 'Nome deve ter entre 2 e 50 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se a luta existe e está agendada
    const luta = await queryOne<Luta>(
      `SELECT * FROM lutas WHERE id = $1`,
      [luta_id]
    );

    if (!luta) {
      return NextResponse.json(
        { error: 'Luta não encontrada' },
        { status: 404 }
      );
    }

    if (luta.status !== 'agendada') {
      return NextResponse.json(
        { error: 'Previsões só podem ser feitas para lutas agendadas' },
        { status: 400 }
      );
    }

    // Verificar se o lutador escolhido está na luta
    if (lutador_escolhido_id !== luta.lutador1_id && lutador_escolhido_id !== luta.lutador2_id) {
      return NextResponse.json(
        { error: 'Lutador escolhido não está nesta luta' },
        { status: 400 }
      );
    }

    // Verificar se já existe previsão (upsert)
    const existente = await queryOne<Previsao>(
      `SELECT * FROM previsoes WHERE luta_id = $1 AND usuario_fingerprint = $2`,
      [luta_id, usuario_fingerprint]
    );

    let previsao: Previsao;

    if (existente) {
      // Atualizar previsão existente
      const result = await query<Previsao>(
        `UPDATE previsoes SET
          usuario_nome = $1,
          lutador_escolhido_id = $2,
          metodo_previsto = $3,
          round_previsto = $4,
          updated_at = NOW()
        WHERE luta_id = $5 AND usuario_fingerprint = $6
        RETURNING *`,
        [usuario_nome, lutador_escolhido_id, metodo_previsto || null, round_previsto || null, luta_id, usuario_fingerprint]
      );
      previsao = result[0];
    } else {
      // Criar nova previsão
      const result = await query<Previsao>(
        `INSERT INTO previsoes (
          luta_id, usuario_fingerprint, usuario_nome,
          lutador_escolhido_id, metodo_previsto, round_previsto
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [luta_id, usuario_fingerprint, usuario_nome, lutador_escolhido_id, metodo_previsto || null, round_previsto || null]
      );
      previsao = result[0];

      // Atualizar ou criar ranking do previsor
      await query(
        `INSERT INTO ranking_previsores (usuario_fingerprint, usuario_nome, total_previsoes)
        VALUES ($1, $2, 1)
        ON CONFLICT (usuario_fingerprint)
        DO UPDATE SET
          usuario_nome = $2,
          total_previsoes = ranking_previsores.total_previsoes + 1,
          updated_at = NOW()`,
        [usuario_fingerprint, usuario_nome]
      );
    }

    return NextResponse.json({
      success: true,
      previsao,
      message: existente ? 'Previsão atualizada com sucesso' : 'Previsão registrada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao criar previsão:', error);
    return NextResponse.json(
      { error: 'Erro ao criar previsão' },
      { status: 500 }
    );
  }
}

// Endpoint para calcular pontos após resultado da luta
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { luta_id, vencedor_id, metodo, round_final } = body;

    if (!luta_id || !vencedor_id) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: luta_id, vencedor_id' },
        { status: 400 }
      );
    }

    await transaction(async (client) => {
      // Buscar todas as previsões da luta
      const result = await client.query(
        `SELECT * FROM previsoes WHERE luta_id = $1`,
        [luta_id]
      );
      const previsoes = result.rows as Previsao[];

      for (const previsao of previsoes) {
        const acertou_vencedor = previsao.lutador_escolhido_id === vencedor_id;
        const acertou_metodo = metodo && previsao.metodo_previsto === metodo;
        const acertou_round = round_final && previsao.round_previsto === round_final;

        let pontos = 0;
        if (acertou_vencedor) pontos += PONTOS.ACERTO_VENCEDOR;
        if (acertou_metodo) pontos += PONTOS.ACERTO_METODO;
        if (acertou_round) pontos += PONTOS.ACERTO_ROUND;

        // Atualizar previsão
        await client.query(
          `UPDATE previsoes SET
            acertou_vencedor = $1,
            acertou_metodo = $2,
            acertou_round = $3,
            pontos_ganhos = $4
          WHERE id = $5`,
          [acertou_vencedor, acertou_metodo, acertou_round, pontos, previsao.id]
        );

        // Atualizar ranking
        if (acertou_vencedor) {
          await client.query(
            `UPDATE ranking_previsores SET
              acertos_vencedor = acertos_vencedor + 1,
              acertos_metodo = acertos_metodo + $1,
              acertos_round = acertos_round + $2,
              pontos_total = pontos_total + $3,
              sequencia_atual = sequencia_atual + 1,
              melhor_sequencia = GREATEST(melhor_sequencia, sequencia_atual + 1),
              taxa_acerto = ROUND((acertos_vencedor + 1)::numeric / total_previsoes * 100, 2),
              updated_at = NOW()
            WHERE usuario_fingerprint = $4`,
            [acertou_metodo ? 1 : 0, acertou_round ? 1 : 0, pontos, previsao.usuario_fingerprint]
          );
        } else {
          await client.query(
            `UPDATE ranking_previsores SET
              sequencia_atual = 0,
              pontos_total = pontos_total + $1,
              taxa_acerto = ROUND(acertos_vencedor::numeric / total_previsoes * 100, 2),
              updated_at = NOW()
            WHERE usuario_fingerprint = $2`,
            [pontos, previsao.usuario_fingerprint]
          );
        }
      }

      // Atualizar resultado da luta
      await client.query(
        `UPDATE lutas SET
          vencedor_id = $1,
          metodo = $2,
          round_final = $3,
          status = 'finalizada'
        WHERE id = $4`,
        [vencedor_id, metodo, round_final, luta_id]
      );
    });

    return NextResponse.json({
      success: true,
      message: 'Pontos calculados e ranking atualizado',
    });
  } catch (error) {
    console.error('Erro ao calcular pontos:', error);
    return NextResponse.json(
      { error: 'Erro ao calcular pontos' },
      { status: 500 }
    );
  }
}

// Buscar previsão de um usuário para uma luta específica
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const luta_id = searchParams.get('luta_id');
    const fingerprint = searchParams.get('fingerprint');

    if (!luta_id || !fingerprint) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios: luta_id, fingerprint' },
        { status: 400 }
      );
    }

    const previsao = await queryOne<Previsao>(
      `SELECT p.*, lut.nome as lutador_nome
      FROM previsoes p
      JOIN lutadores lut ON lut.id = p.lutador_escolhido_id
      WHERE p.luta_id = $1 AND p.usuario_fingerprint = $2`,
      [luta_id, fingerprint]
    );

    return NextResponse.json({
      previsao,
    });
  } catch (error) {
    console.error('Erro ao buscar previsão:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar previsão' },
      { status: 500 }
    );
  }
}
