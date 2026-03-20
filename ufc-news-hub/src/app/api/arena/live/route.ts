import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUsuarioAtual } from '@/lib/arena/auth';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

interface FightResult {
  luta_id: string;
  lutador1_id: string;
  lutador2_id: string;
  lutador1_nome: string;
  lutador2_nome: string;
  vencedor_id: string | null;
  metodo: string | null;
  round_final: number | null;
  tempo_final: string | null;
  tipo: string;
  status: string;
  ordem: number;
  categoria_peso: string;
  is_titulo: boolean;
  lutador1_foto: string | null;
  lutador2_foto: string | null;
}

interface UserPick {
  luta_id: string;
  vencedor_previsto_id: string;
  acertou_vencedor: boolean | null;
  pontos_ganhos: number;
}

interface LeaderboardRow {
  usuario_id: string;
  username: string;
  display_name: string | null;
  pontos_totais: number;
  acertos: number;
  total_lutas: number;
}

interface EventInfo {
  id: string;
  nome: string;
  status: string;
  data_evento: string;
  local_evento: string | null;
}

interface EventoRecente {
  id: string;
  nome: string;
  data_evento: string;
  local_evento: string | null;
  total_lutas: number;
  lutas_finalizadas: number;
}

// ═══════════════════════════════════════════════════════════════
// GET /api/arena/live?evento_id=X
// Without evento_id: returns recent finalized events
// With evento_id: returns full event data (live or finalized)
// ═══════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventoId = searchParams.get('evento_id');

    // No evento_id → return recent finalized events list
    if (!eventoId) {
      const recentes = await query<EventoRecente>(
        `SELECT
           e.id, e.nome, e.data_evento, e.local_evento,
           COUNT(l.id)::int AS total_lutas,
           COUNT(l.id) FILTER (WHERE l.status = 'finalizada')::int AS lutas_finalizadas
         FROM eventos e
         LEFT JOIN lutas l ON l.evento_id = e.id
         WHERE e.status IN ('finalizado', 'ao_vivo')
           AND e.nome NOT ILIKE '%TBD%'
           AND e.data_evento > NOW() - INTERVAL '60 days'
         GROUP BY e.id
         HAVING COUNT(l.id) > 0
         ORDER BY e.data_evento DESC
         LIMIT 5`
      );

      return NextResponse.json(
        { eventos_recentes: recentes },
        { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=30' } }
      );
    }

    // Auth: optional — unauthenticated users see results but no picks
    const usuario = await getUsuarioAtual();

    // Parallel queries for all aggregated data
    const [evento, lutas, leaderboard] = await Promise.all([
      queryOne<EventInfo>(
        `SELECT id, nome, status::text, data_evento, local_evento
         FROM eventos
         WHERE id = $1`,
        [eventoId]
      ),

      query<FightResult>(
        `SELECT
           l.id AS luta_id,
           l.lutador1_id,
           l.lutador2_id,
           lut1.nome AS lutador1_nome,
           lut2.nome AS lutador2_nome,
           l.vencedor_id,
           l.metodo::text AS metodo,
           l.round_final,
           l.tempo_final,
           l.tipo::text AS tipo,
           l.status::text AS status,
           l.ordem,
           l.categoria_peso,
           COALESCE(l.is_titulo, false) AS is_titulo,
           lut1.imagem_url AS lutador1_foto,
           lut2.imagem_url AS lutador2_foto
         FROM lutas l
         JOIN lutadores lut1 ON lut1.id = l.lutador1_id
         JOIN lutadores lut2 ON lut2.id = l.lutador2_id
         WHERE l.evento_id = $1
         ORDER BY l.ordem DESC`,
        [eventoId]
      ),

      query<LeaderboardRow>(
        `SELECT
           ep.usuario_id,
           ua.username,
           ua.display_name,
           COALESCE(ep.pontos_totais, 0) AS pontos_totais,
           COALESCE(ep.acertos, 0) AS acertos,
           COALESCE(ep.total_lutas, 0) AS total_lutas
         FROM evento_pontuacao ep
         JOIN usuarios_arena ua ON ua.id = ep.usuario_id
         WHERE ep.evento_id = $1
         ORDER BY ep.pontos_totais DESC
         LIMIT 20`,
        [eventoId]
      ),
    ]);

    if (!evento) {
      return NextResponse.json(
        { error: 'Evento not found' },
        {
          status: 404,
          headers: { 'Cache-Control': 'no-store' },
        }
      );
    }

    // Fetch user picks only if authenticated
    let userPicks: UserPick[] = [];
    if (usuario) {
      userPicks = await query<UserPick>(
        `SELECT
           p.luta_id,
           p.vencedor_previsto_id,
           p.acertou_vencedor,
           COALESCE(p.pontos_ganhos, 0) AS pontos_ganhos
         FROM previsoes p
         WHERE p.evento_id = $1
           AND p.usuario_id = $2`,
        [eventoId, usuario.id]
      );
    }

    // Build picks map keyed by luta_id for O(1) lookup
    const picksMap = new Map<string, UserPick>(
      userPicks.map((p) => [p.luta_id, p])
    );

    // Count finished fights
    const lutasFinalizadas = lutas.filter((l) => l.status === 'finalizada').length;

    // Attach user pick to each fight
    const lutasComPick = lutas.map((luta) => ({
      ...luta,
      userPick: picksMap.get(luta.luta_id) ?? null,
    }));

    // Finalized events → cache aggressively (data won't change)
    // Live events → no cache (polling)
    const cacheHeader = evento.status === 'finalizado'
      ? 'public, s-maxage=3600, stale-while-revalidate=60'
      : 'no-store';

    return NextResponse.json(
      {
        evento,
        lutas: lutasComPick,
        leaderboard,
        lutas_finalizadas: lutasFinalizadas,
        usuario_id: usuario?.id ?? null,
      },
      {
        headers: { 'Cache-Control': cacheHeader },
      }
    );
  } catch (error) {
    console.error('[API /arena/live] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
}
