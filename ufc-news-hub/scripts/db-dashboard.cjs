const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const PORT = 3020;

// ── API: All database stats ──────────────────────────────────────────
async function getDbStats() {
  // Query 1: Row counts for all 31 tables
  const { rows: tableCounts } = await pool.query(`
    SELECT 'noticias' as t, COUNT(*)::int as c FROM noticias
    UNION ALL SELECT 'noticia_entidades', COUNT(*)::int FROM noticia_entidades
    UNION ALL SELECT 'comentarios', COUNT(*)::int FROM comentarios
    UNION ALL SELECT 'comentarios_rate_limit', COUNT(*)::int FROM comentarios_rate_limit
    UNION ALL SELECT 'sync_logs', COUNT(*)::int FROM sync_logs
    UNION ALL SELECT 'lutadores', COUNT(*)::int FROM lutadores
    UNION ALL SELECT 'eventos', COUNT(*)::int FROM eventos
    UNION ALL SELECT 'lutas', COUNT(*)::int FROM lutas
    UNION ALL SELECT 'analises', COUNT(*)::int FROM analises
    UNION ALL SELECT 'usuarios_arena', COUNT(*)::int FROM usuarios_arena
    UNION ALL SELECT 'previsoes', COUNT(*)::int FROM previsoes
    UNION ALL SELECT 'evento_pontuacao', COUNT(*)::int FROM evento_pontuacao
    UNION ALL SELECT 'conquistas', COUNT(*)::int FROM conquistas
    UNION ALL SELECT 'ligas', COUNT(*)::int FROM ligas
    UNION ALL SELECT 'liga_membros', COUNT(*)::int FROM liga_membros
    UNION ALL SELECT 'liga_temporadas', COUNT(*)::int FROM liga_temporadas
    UNION ALL SELECT 'liga_chat', COUNT(*)::int FROM liga_chat
    UNION ALL SELECT 'previsoes_liga', COUNT(*)::int FROM previsoes_liga
    UNION ALL SELECT 'duelos', COUNT(*)::int FROM duelos
    UNION ALL SELECT 'amizades', COUNT(*)::int FROM amizades
    UNION ALL SELECT 'atividades', COUNT(*)::int FROM atividades
    UNION ALL SELECT 'notificacoes', COUNT(*)::int FROM notificacoes
    UNION ALL SELECT 'agents', COUNT(*)::int FROM agents
    UNION ALL SELECT 'agent_tasks', COUNT(*)::int FROM agent_tasks
    UNION ALL SELECT 'agent_logs', COUNT(*)::int FROM agent_logs
    UNION ALL SELECT 'agent_cost_logs', COUNT(*)::int FROM agent_cost_logs
    UNION ALL SELECT 'agent_events', COUNT(*)::int FROM agent_events
    UNION ALL SELECT 'approvals', COUNT(*)::int FROM approvals
    UNION ALL SELECT 'company_prompts', COUNT(*)::int FROM company_prompts
    UNION ALL SELECT 'performance_reviews', COUNT(*)::int FROM performance_reviews
    UNION ALL SELECT 'remediation_plans', COUNT(*)::int FROM remediation_plans
  `);

  // Query 2: Fighter completeness (15 metrics)
  const { rows: [fighters] } = await pool.query(`
    SELECT
      COUNT(*)::int as total,
      COUNT(imagem_url) FILTER (WHERE imagem_url IS NOT NULL AND imagem_url != '')::int as fotos,
      COUNT(pais) FILTER (WHERE pais IS NOT NULL AND pais != '')::int as pais,
      COUNT(cidade_natal) FILTER (WHERE cidade_natal IS NOT NULL AND cidade_natal != '')::int as cidade,
      COUNT(academia) FILTER (WHERE academia IS NOT NULL AND academia != '')::int as academia,
      COUNT(estilo_luta) FILTER (WHERE estilo_luta IS NOT NULL AND estilo_luta != '')::int as estilo,
      COUNT(categoria_peso) FILTER (WHERE categoria_peso IS NOT NULL AND categoria_peso != '')::int as categoria,
      COUNT(stance) FILTER (WHERE stance IS NOT NULL AND stance != '')::int as stance,
      COUNT(slpm) FILTER (WHERE slpm IS NOT NULL AND slpm > 0)::int as stats,
      COUNT(vitorias) FILTER (WHERE vitorias IS NOT NULL AND (vitorias > 0 OR derrotas > 0))::int as record,
      COUNT(nocautes) FILTER (WHERE nocautes IS NOT NULL AND (nocautes > 0 OR finalizacoes > 0))::int as ko_data,
      COUNT(altura) FILTER (WHERE altura IS NOT NULL AND altura != '')::int as altura,
      COUNT(envergadura) FILTER (WHERE envergadura IS NOT NULL AND envergadura != '')::int as envergadura,
      COUNT(ranking_divisao) FILTER (WHERE ranking_divisao IS NOT NULL)::int as ranking,
      COUNT(apelido) FILTER (WHERE apelido IS NOT NULL AND apelido != '')::int as apelido,
      COUNT(data_nascimento) FILTER (WHERE data_nascimento IS NOT NULL)::int as nascimento
    FROM lutadores
  `);

  // Query 3: Latest 10 news articles
  const { rows: recentNews } = await pool.query(`
    SELECT id, titulo, fonte_nome, categoria::text, publicado_em
    FROM noticias ORDER BY publicado_em DESC LIMIT 10
  `);

  // Query 4: Latest 10 agent tasks
  const { rows: recentTasks } = await pool.query(`
    SELECT at.type, at.status, at."createdAt", a."humanName", a.icon
    FROM agent_tasks at JOIN agents a ON at."agentId" = a.id
    ORDER BY at."createdAt" DESC LIMIT 10
  `);

  // Query 5: AI Company cost totals
  const { rows: [costs] } = await pool.query(`
    SELECT
      COALESCE(SUM("costUsd"), 0)::float as total_cost,
      COALESCE(SUM("tokensInput" + "tokensOutput"), 0)::bigint as total_tokens
    FROM agent_cost_logs
  `);

  // Query 6: Next event
  const { rows: nextEvent } = await pool.query(`
    SELECT nome, data_evento, local_evento, cidade,
      (SELECT COUNT(*)::int FROM lutas WHERE evento_id = e.id) as total_lutas
    FROM eventos e
    WHERE status = 'agendado' AND data_evento > NOW()
    ORDER BY data_evento LIMIT 1
  `);

  const tables = {};
  let totalRows = 0;
  for (const row of tableCounts) {
    tables[row.t] = row.c;
    totalRows += row.c;
  }

  return {
    tables,
    totalRows,
    fighters,
    recentNews,
    recentTasks,
    costs,
    nextEvent: nextEvent[0] || null,
  };
}

// ── HTML ─────────────────────────────────────────────────────────────
const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗄️</text></svg>">
<title>UFC News Hub — Database Live</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0f; color: #e0e0e0;
    font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
    padding: 20px; min-height: 100vh;
  }

  /* ── Header ── */
  .header { text-align: center; margin-bottom: 24px; }
  .header h1 { font-size: 26px; color: #fff; }
  .header h1 .red { color: #d20a0a; }
  .header .sub { color: #555; font-size: 12px; margin-top: 4px; }
  .header .live {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(210,10,10,0.12); border: 1px solid rgba(210,10,10,0.25);
    padding: 4px 14px; border-radius: 20px; font-size: 12px; color: #ff4444; margin-top: 10px;
  }
  .dot { width: 8px; height: 8px; background: #ff4444; border-radius: 50%; animation: pulse 1.5s infinite; }

  /* ── Animations ── */
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.8); } }
  @keyframes glow { 0% { box-shadow: 0 0 12px var(--glow); border-color: var(--glow); } 100% { box-shadow: none; border-color: #1e1e2e; } }
  @keyframes countUp { from { transform: scale(1.2); } to { transform: scale(1); } }
  @keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }

  /* ── Top Stats Banner ── */
  .top-stats {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;
  }
  .top-stat {
    background: linear-gradient(135deg, #12121a, #1a1a28); border: 1px solid #1e1e2e;
    border-radius: 12px; padding: 16px; text-align: center;
  }
  .top-stat .val { font-size: 36px; font-weight: 800; color: #fff; line-height: 1; }
  .top-stat .lbl { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
  .top-stat.accent .val { color: #d4af37; }

  /* ── Section Headers ── */
  .section {
    margin-bottom: 24px;
  }
  .section-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px; padding-bottom: 8px;
    border-bottom: 1px solid #1e1e2e;
  }
  .section-header h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 1.5px; }
  .section-header .count { font-size: 12px; color: #555; margin-left: auto; }

  /* ── Table Cards Grid ── */
  .tgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 10px; }

  .tcard {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px;
    padding: 14px; text-align: center; position: relative; overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .tcard:hover { border-color: #333; }
  .tcard.glow { animation: glow 1s ease-out; }
  .tcard .tname { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; word-break: break-all; }
  .tcard .tval { font-size: 26px; font-weight: 700; color: #fff; line-height: 1; }
  .tcard .tval.bumped { animation: countUp 0.4s ease-out; }
  .tcard .tval.zero { color: #333; }
  .tcard .bar-bg { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #1a1a2a; }
  .tcard .bar { height: 3px; transition: width 1s ease; border-radius: 0 2px 0 0; }
  .tcard .delta {
    position: absolute; top: 6px; right: 8px; font-size: 10px; font-weight: 600;
    color: #4ade80; opacity: 0; transition: opacity 0.3s;
  }
  .tcard .delta.show { opacity: 1; }

  /* Domain colors */
  .sec-noticias .section-header h2 { color: #d20a0a; }
  .sec-noticias .tcard .bar, .sec-noticias .section-header { border-bottom-color: rgba(210,10,10,0.2); }
  .sec-noticias .tcard .bar { background: linear-gradient(90deg, #d20a0a, #ff4444); }
  .sec-noticias .tcard { --glow: rgba(210,10,10,0.4); }

  .sec-lutadores .section-header h2 { color: #d4af37; }
  .sec-lutadores .section-header { border-bottom-color: rgba(212,175,55,0.2); }
  .sec-lutadores .tcard .bar { background: linear-gradient(90deg, #d4af37, #f0d060); }
  .sec-lutadores .tcard { --glow: rgba(212,175,55,0.4); }

  .sec-arena .section-header h2 { color: #4ade80; }
  .sec-arena .section-header { border-bottom-color: rgba(74,222,128,0.2); }
  .sec-arena .tcard .bar { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .sec-arena .tcard { --glow: rgba(74,222,128,0.4); }

  .sec-ai .section-header h2 { color: #3b82f6; }
  .sec-ai .section-header { border-bottom-color: rgba(59,130,246,0.2); }
  .sec-ai .tcard .bar { background: linear-gradient(90deg, #2563eb, #60a5fa); }
  .sec-ai .tcard { --glow: rgba(59,130,246,0.4); }

  /* ── Fighter Completeness Panel ── */
  .fighter-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
  .fcard {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px;
    padding: 12px 8px; text-align: center; position: relative; overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .fcard.glow { animation: glow 1s ease-out; --glow: rgba(212,175,55,0.4); }
  .fcard .flabel { font-size: 10px; color: #888; margin-bottom: 4px; }
  .fcard .fval { font-size: 22px; font-weight: 700; color: #fff; line-height: 1; }
  .fcard .fpct { font-size: 11px; margin-top: 4px; font-weight: 500; }
  .fcard .fbar { height: 3px; background: #1a1a2a; border-radius: 2px; margin-top: 8px; overflow: hidden; }
  .fcard .fbar-fill { height: 100%; border-radius: 2px; transition: width 1s ease; }
  .pct-high { color: #4ade80; } .bar-high { background: #4ade80; }
  .pct-mid { color: #facc15; } .bar-mid { background: #facc15; }
  .pct-low { color: #f87171; } .bar-low { background: #f87171; }
  .fcard .delta { position: absolute; top: 4px; right: 6px; font-size: 9px; font-weight: 600; color: #4ade80; opacity: 0; }
  .fcard .delta.show { opacity: 1; }

  /* ── Feeds ── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  @media (max-width: 800px) { .two-col { grid-template-columns: 1fr; } .top-stats { grid-template-columns: repeat(2, 1fr); } }
  .panel {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 12px;
    max-height: 380px; overflow-y: auto;
  }
  .panel::-webkit-scrollbar { width: 5px; }
  .panel::-webkit-scrollbar-track { background: transparent; }
  .panel::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
  .panel-header {
    position: sticky; top: 0; z-index: 1; background: #0e0e16;
    padding: 12px 16px; font-size: 13px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; border-bottom: 1px solid #1e1e2e;
  }
  .feed-row {
    display: flex; align-items: center; gap: 10px; padding: 8px 16px;
    border-bottom: 1px solid #1a1a2a; font-size: 12px; animation: slideIn 0.3s ease;
  }
  .feed-row:last-child { border-bottom: none; }
  .feed-row:hover { background: rgba(255,255,255,0.02); }
  .feed-icon { font-size: 14px; flex-shrink: 0; }
  .feed-text { flex: 1; min-width: 0; }
  .feed-title { color: #ccc; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .feed-sub { color: #555; font-size: 10px; margin-top: 2px; }
  .feed-time { color: #444; font-size: 10px; flex-shrink: 0; }
  .feed-badge {
    font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 600; flex-shrink: 0;
  }
  .badge-red { background: rgba(210,10,10,0.15); color: #ff4444; }
  .badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
  .badge-green { background: rgba(74,222,128,0.15); color: #4ade80; }
  .badge-gold { background: rgba(212,175,55,0.15); color: #d4af37; }

  /* ── Relations Map ── */
  .rel-section { margin-bottom: 24px; }
  .rel-section .section-header h2 { color: #888; }
  .rel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px; }
  .rel-item {
    display: flex; align-items: center; gap: 8px; padding: 6px 12px;
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 8px; font-size: 11px;
  }
  .rel-from { color: #60a5fa; font-weight: 600; min-width: 120px; }
  .rel-arrow { color: #333; }
  .rel-to { color: #d4af37; font-weight: 600; }
  .rel-col { color: #555; font-size: 10px; }
  .rel-self { color: #facc15; font-size: 9px; padding: 1px 5px; background: rgba(250,204,21,0.1); border-radius: 3px; }

  /* ── Enums & Views ── */
  .ref-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; }
  .ref-card {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px; padding: 14px;
  }
  .ref-card h4 { font-size: 12px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .ref-card .vals { font-size: 11px; color: #888; line-height: 1.6; }
  .ref-card .vals span { display: inline-block; background: #1a1a2a; padding: 2px 8px; border-radius: 4px; margin: 2px; font-size: 10px; }

  .cost-banner {
    display: flex; align-items: center; gap: 20px; padding: 10px 16px; margin-top: 8px;
    background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); border-radius: 10px;
    font-size: 12px;
  }
  .cost-banner .cost-val { font-size: 20px; font-weight: 700; color: #60a5fa; }
  .cost-banner .cost-lbl { font-size: 10px; color: #555; text-transform: uppercase; }

  .next-event {
    background: linear-gradient(135deg, rgba(210,10,10,0.08), rgba(212,175,55,0.08));
    border: 1px solid rgba(210,10,10,0.2); border-radius: 10px;
    padding: 12px 16px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
  }
  .next-event .ne-name { font-size: 14px; font-weight: 700; color: #fff; }
  .next-event .ne-info { font-size: 11px; color: #888; margin-top: 2px; }
  .next-event .ne-badge { font-size: 11px; color: #d20a0a; font-weight: 600; }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <h1>🗄️ UFC News Hub <span class="red">Database</span></h1>
  <div class="sub">31 tabelas · 3 views · 11 enums · 43 FKs · 122 índices</div>
  <div class="live"><span class="dot"></span> LIVE — atualiza a cada 3s · <span id="clock">—</span></div>
</div>

<!-- Next Event -->
<div class="next-event" id="nextEvent" style="display:none"></div>

<!-- Top Stats Banner -->
<div class="top-stats" id="topStats"></div>

<!-- Notícias -->
<div class="section sec-noticias">
  <div class="section-header">
    <h2>📰 Notícias</h2>
    <span class="count" id="secNews">—</span>
  </div>
  <div class="tgrid" id="gridNews"></div>
</div>

<!-- Lutadores & Eventos -->
<div class="section sec-lutadores">
  <div class="section-header">
    <h2>🥊 Lutadores & Eventos</h2>
    <span class="count" id="secFighters">—</span>
  </div>
  <div class="tgrid" id="gridFighters"></div>
</div>

<!-- Fighter Completeness -->
<div class="section sec-lutadores">
  <div class="section-header">
    <h2>📊 Completude dos Lutadores</h2>
    <span class="count" id="fighterTotal">—</span>
  </div>
  <div class="fighter-grid" id="fighterGrid"></div>
</div>

<!-- Arena -->
<div class="section sec-arena">
  <div class="section-header">
    <h2>🏟️ Arena</h2>
    <span class="count" id="secArena">—</span>
  </div>
  <div class="tgrid" id="gridArena"></div>
</div>

<!-- AI Company -->
<div class="section sec-ai">
  <div class="section-header">
    <h2>🤖 AI Company</h2>
    <span class="count" id="secAI">—</span>
  </div>
  <div class="tgrid" id="gridAI"></div>
  <div class="cost-banner" id="costBanner"></div>
</div>

<!-- Feeds -->
<div class="two-col">
  <div class="panel">
    <div class="panel-header" style="color:#d20a0a;">📰 Últimas Notícias</div>
    <div id="feedNews"></div>
  </div>
  <div class="panel">
    <div class="panel-header" style="color:#3b82f6;">🤖 Atividade dos Agentes</div>
    <div id="feedAgents"></div>
  </div>
</div>

<!-- Relations Map -->
<div class="section rel-section">
  <div class="section-header">
    <h2>🔗 Mapa de Relações (43 FKs)</h2>
  </div>
  <div class="rel-grid" id="relGrid"></div>
</div>

<!-- Enums & Views -->
<div class="section">
  <div class="section-header">
    <h2>🏷️ Enums, Views & Checks</h2>
  </div>
  <div class="ref-grid" id="refGrid"></div>
</div>

<div style="text-align:center;color:#333;font-size:10px;margin-top:30px;padding-bottom:20px;">
  UFC News Hub Database Dashboard · Porta ${PORT} · PostgreSQL
</div>

<script>
// ── Config ──
const SECTIONS = {
  noticias: [
    { key: 'noticias', label: 'Notícias', desc: '13 cols · 8 idx' },
    { key: 'noticia_entidades', label: 'Menções', desc: '5 cols · 4 idx · 2 FKs' },
    { key: 'comentarios', label: 'Comentários', desc: '11 cols · 6 idx · 2 FKs' },
    { key: 'comentarios_rate_limit', label: 'Rate Limit', desc: '3 cols · 2 idx' },
    { key: 'sync_logs', label: 'Sync Logs', desc: '9 cols · 1 idx' },
  ],
  fighters: [
    { key: 'lutadores', label: 'Lutadores', desc: '34 cols · 6 idx · GIN' },
    { key: 'eventos', label: 'Eventos', desc: '21 cols · 8 idx' },
    { key: 'lutas', label: 'Lutas', desc: '20 cols · 7 idx · 4 FKs' },
    { key: 'analises', label: 'Análises', desc: '22 cols · 6 idx · 3 FKs' },
  ],
  arena: [
    { key: 'usuarios_arena', label: 'Usuários', desc: '29 cols · 6 idx' },
    { key: 'previsoes', label: 'Previsões', desc: '22 cols · 6 idx · 4 FKs' },
    { key: 'evento_pontuacao', label: 'Pontuação', desc: '9 cols · 4 idx' },
    { key: 'conquistas', label: 'Conquistas', desc: '5 cols · 4 idx' },
    { key: 'ligas', label: 'Ligas', desc: '19 cols · 5 idx' },
    { key: 'liga_membros', label: 'Membros', desc: '10 cols · 5 idx' },
    { key: 'liga_temporadas', label: 'Temporadas', desc: '10 cols · 2 idx' },
    { key: 'liga_chat', label: 'Chat', desc: '5 cols · 2 idx' },
    { key: 'previsoes_liga', label: 'Prev. Liga', desc: '4 cols · 2 idx' },
    { key: 'duelos', label: 'Duelos', desc: '14 cols · 5 idx · 4 FKs' },
    { key: 'amizades', label: 'Amizades', desc: '6 cols · 4 idx · CASCADE' },
    { key: 'atividades', label: 'Atividades', desc: '8 cols · 3 idx' },
    { key: 'notificacoes', label: 'Notificações', desc: '8 cols · 2 idx' },
  ],
  ai: [
    { key: 'agents', label: 'Agentes', desc: '35 cols · 1 idx' },
    { key: 'agent_tasks', label: 'Tarefas', desc: '14 cols · 3 idx · self-ref' },
    { key: 'agent_logs', label: 'Logs', desc: '6 cols · 3 idx' },
    { key: 'agent_cost_logs', label: 'Custos', desc: '8 cols · 3 idx' },
    { key: 'agent_events', label: 'Eventos', desc: '7 cols · 4 idx' },
    { key: 'approvals', label: 'Aprovações', desc: '11 cols · 3 idx · 2 FKs' },
    { key: 'company_prompts', label: 'Prompts', desc: '9 cols · 1 idx' },
    { key: 'performance_reviews', label: 'Reviews', desc: '16 cols · 2 idx' },
    { key: 'remediation_plans', label: 'Remediações', desc: '10 cols · 2 idx' },
  ],
};

const FIGHTER_FIELDS = [
  { key: 'fotos', label: '📸 Fotos' },
  { key: 'pais', label: '🌍 País' },
  { key: 'cidade', label: '🏙️ Cidade' },
  { key: 'academia', label: '🥋 Academia' },
  { key: 'estilo', label: '🥊 Estilo' },
  { key: 'categoria', label: '⚖️ Categoria' },
  { key: 'stance', label: '🧍 Stance' },
  { key: 'stats', label: '📊 Stats' },
  { key: 'record', label: '🏆 Record' },
  { key: 'ko_data', label: '💥 KO/Sub' },
  { key: 'altura', label: '📏 Altura' },
  { key: 'envergadura', label: '🦾 Envergad.' },
  { key: 'ranking', label: '🏅 Ranking' },
  { key: 'apelido', label: '🏷️ Apelido' },
  { key: 'nascimento', label: '🎂 Nasc.' },
];

const RELATIONS = [
  ['agent_cost_logs', 'agentId', 'agents', 'id'],
  ['agent_logs', 'agentId', 'agents', 'id'],
  ['agent_tasks', 'agentId', 'agents', 'id'],
  ['agent_tasks', 'parentTaskId', 'agent_tasks', 'id', 'self'],
  ['amizades', 'usuario_id', 'usuarios_arena', 'id'],
  ['amizades', 'amigo_id', 'usuarios_arena', 'id'],
  ['analises', 'evento_id', 'eventos', 'id'],
  ['analises', 'lutador1_id', 'lutadores', 'id'],
  ['analises', 'lutador2_id', 'lutadores', 'id'],
  ['approvals', 'taskId', 'agent_tasks', 'id'],
  ['approvals', 'agentId', 'agents', 'id'],
  ['atividades', 'usuario_id', 'usuarios_arena', 'id'],
  ['comentarios', 'noticia_id', 'noticias', 'id'],
  ['comentarios', 'parent_id', 'comentarios', 'id', 'self'],
  ['conquistas', 'usuario_id', 'usuarios_arena', 'id'],
  ['duelos', 'desafiante_id', 'usuarios_arena', 'id'],
  ['duelos', 'desafiado_id', 'usuarios_arena', 'id'],
  ['duelos', 'evento_id', 'eventos', 'id'],
  ['duelos', 'vencedor_id', 'usuarios_arena', 'id'],
  ['evento_pontuacao', 'evento_id', 'eventos', 'id'],
  ['evento_pontuacao', 'usuario_id', 'usuarios_arena', 'id'],
  ['liga_chat', 'liga_id', 'ligas', 'id'],
  ['liga_chat', 'usuario_id', 'usuarios_arena', 'id'],
  ['liga_membros', 'liga_id', 'ligas', 'id'],
  ['liga_membros', 'usuario_id', 'usuarios_arena', 'id'],
  ['liga_temporadas', 'liga_id', 'ligas', 'id'],
  ['liga_temporadas', 'campeao_id', 'usuarios_arena', 'id'],
  ['ligas', 'criador_id', 'usuarios_arena', 'id'],
  ['ligas', 'campeao_id', 'usuarios_arena', 'id'],
  ['lutas', 'evento_id', 'eventos', 'id'],
  ['lutas', 'lutador1_id', 'lutadores', 'id'],
  ['lutas', 'lutador2_id', 'lutadores', 'id'],
  ['lutas', 'vencedor_id', 'lutadores', 'id'],
  ['noticia_entidades', 'noticia_id', 'noticias', 'id'],
  ['noticia_entidades', 'lutador_id', 'lutadores', 'id'],
  ['notificacoes', 'usuario_id', 'usuarios_arena', 'id'],
  ['performance_reviews', 'agentId', 'agents', 'id'],
  ['previsoes', 'usuario_id', 'usuarios_arena', 'id'],
  ['previsoes', 'luta_id', 'lutas', 'id'],
  ['previsoes', 'evento_id', 'eventos', 'id'],
  ['previsoes', 'vencedor_previsto_id', 'lutadores', 'id'],
  ['previsoes_liga', 'previsao_id', 'previsoes', 'id'],
  ['previsoes_liga', 'liga_id', 'ligas', 'id'],
];

const ENUMS = [
  { name: 'categoria_noticia', vals: ['lutadores','lutas','backstage'] },
  { name: 'metodo_vitoria', vals: ['KO/TKO','Submission','Decision - Unanimous','Decision - Split','Decision - Majority','DQ','No Contest','Draw'] },
  { name: 'nivel_usuario', vals: ['iniciante','amateur','contender','challenger','elite','champion','legend'] },
  { name: 'status_amizade', vals: ['pendente','aceita','bloqueada'] },
  { name: 'status_duelo', vals: ['pendente','aceito','recusado','finalizado','cancelado'] },
  { name: 'status_evento', vals: ['agendado','ao_vivo','finalizado','cancelado'] },
  { name: 'status_liga', vals: ['ativa','pausada','encerrada'] },
  { name: 'status_luta', vals: ['agendada','ao_vivo','finalizada','cancelada'] },
  { name: 'tipo_conquista', vals: ['sniper','on_fire','dog_whisperer','giant_slayer','champion','knockout_artist','submission_specialist','analyst','globetrotter','first_blood','social_butterfly','league_founder','perfect_card','underdog_hunter','main_event_master','streak_5','streak_10','streak_20'] },
  { name: 'tipo_liga', vals: ['publica','privada'] },
  { name: 'tipo_luta', vals: ['main_event','co_main','card_principal','preliminar','early_prelim'] },
];

const VIEWS = [
  { name: 'v_proximo_evento', desc: 'Próximo evento agendado + total de lutas' },
  { name: 'v_proximo_evento_detalhado', desc: 'Próximo evento + JSON dos lutadores do main event' },
  { name: 'v_eventos_por_mes', desc: 'Eventos agrupados por mês (últimos 12 meses)' },
];

const CHECKS = [
  { table: 'amizades', rule: 'usuario ≠ amigo' },
  { table: 'duelos', rule: 'desafiante ≠ desafiado' },
  { table: 'liga_chat', rule: 'mensagem ≤ 500 chars' },
  { table: 'ligas', rule: 'nome ≥ 3 chars' },
  { table: 'lutas', rule: 'lutador1 ≠ lutador2' },
  { table: 'previsoes', rule: 'confiança 10-500' },
  { table: 'previsoes', rule: 'round 1-5' },
  { table: 'usuarios_arena', rule: 'username: a-z0-9_ (3-30)' },
];

// ── Helpers ──
function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── State ──
let prevTables = {};
let prevFighters = {};

function pctClass(pct) { return pct >= 80 ? 'high' : pct >= 50 ? 'mid' : 'low'; }

function timeAgo(dateStr) {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 60) return s + 's';
  if (s < 3600) return Math.floor(s/60) + 'min';
  if (s < 86400) return Math.floor(s/3600) + 'h';
  return Math.floor(s/86400) + 'd';
}

function renderTableCards(gridId, items, tables) {
  const el = document.getElementById(gridId);
  const maxVal = Math.max(1, ...items.map(i => tables[i.key] || 0));
  el.innerHTML = items.map(item => {
    const val = tables[item.key] || 0;
    const prev = prevTables[item.key] || val;
    const delta = val - prev;
    const isZero = val === 0;
    const barPct = (val / maxVal * 100).toFixed(1);
    return '<div class="tcard' + (delta > 0 ? ' glow' : '') + '">' +
      '<div class="tname">' + esc(item.label) + '</div>' +
      '<div class="tval' + (delta > 0 ? ' bumped' : '') + (isZero ? ' zero' : '') + '">' + val.toLocaleString() + '</div>' +
      '<div style="font-size:9px;color:#444;margin-top:4px;">' + esc(item.desc) + '</div>' +
      '<div class="bar-bg"><div class="bar" style="width:' + barPct + '%"></div></div>' +
      '<div class="delta' + (delta > 0 ? ' show' : '') + '">+' + delta + '</div>' +
    '</div>';
  }).join('');
}

function sectionTotal(items, tables) {
  return items.reduce((sum, item) => sum + (tables[item.key] || 0), 0);
}

async function refresh() {
  try {
    const res = await fetch('/api/db-stats');
    if (!res.ok) throw new Error('API error ' + res.status);
    const data = await res.json();
    const { tables, totalRows, fighters, recentNews, recentTasks, costs, nextEvent } = data;

    // Clock
    document.getElementById('clock').textContent = new Date().toLocaleTimeString('pt-BR');

    // Next event
    if (nextEvent) {
      const ne = document.getElementById('nextEvent');
      ne.style.display = 'flex';
      const d = new Date(nextEvent.data_evento);
      const diffMs = d.getTime() - Date.now();
      let countdown = '';
      if (diffMs > 0) {
        const days = Math.floor(diffMs / 86400000);
        const hrs = Math.floor((diffMs % 86400000) / 3600000);
        countdown = ' · ' + days + 'd ' + hrs + 'h';
      }
      ne.innerHTML =
        '<div class="ne-badge">PRÓXIMO' + countdown + '</div>' +
        '<div><div class="ne-name">' + esc(nextEvent.nome) + '</div>' +
        '<div class="ne-info">' + d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}) +
        ' · ' + esc(nextEvent.local_evento||'') + ' · ' + nextEvent.total_lutas + ' lutas</div></div>';
    }

    // Top stats
    document.getElementById('topStats').innerHTML = [
      { val: totalRows.toLocaleString(), lbl: 'Total Registros', accent: true },
      { val: '31', lbl: 'Tabelas' },
      { val: '43', lbl: 'Relações (FKs)' },
      { val: '122', lbl: 'Índices' },
    ].map(s =>
      '<div class="top-stat' + (s.accent ? ' accent' : '') + '">' +
        '<div class="val">' + s.val + '</div>' +
        '<div class="lbl">' + s.lbl + '</div>' +
      '</div>'
    ).join('');

    // Section cards
    const newsTotal = sectionTotal(SECTIONS.noticias, tables);
    const fightTotal = sectionTotal(SECTIONS.fighters, tables);
    const arenaTotal = sectionTotal(SECTIONS.arena, tables);
    const aiTotal = sectionTotal(SECTIONS.ai, tables);

    document.getElementById('secNews').textContent = newsTotal.toLocaleString() + ' registros';
    document.getElementById('secFighters').textContent = fightTotal.toLocaleString() + ' registros';
    document.getElementById('secArena').textContent = arenaTotal.toLocaleString() + ' registros';
    document.getElementById('secAI').textContent = aiTotal.toLocaleString() + ' registros';

    renderTableCards('gridNews', SECTIONS.noticias, tables);
    renderTableCards('gridFighters', SECTIONS.fighters, tables);
    renderTableCards('gridArena', SECTIONS.arena, tables);
    renderTableCards('gridAI', SECTIONS.ai, tables);

    // AI Cost banner
    document.getElementById('costBanner').innerHTML =
      '<div><div class="cost-val">$' + (costs.total_cost || 0).toFixed(4) + '</div><div class="cost-lbl">Custo Total</div></div>' +
      '<div style="color:#333;">|</div>' +
      '<div><div class="cost-val">' + Number(costs.total_tokens || 0).toLocaleString() + '</div><div class="cost-lbl">Tokens Usados</div></div>';

    // Fighter completeness
    document.getElementById('fighterTotal').textContent = (fighters.total || 0).toLocaleString() + ' lutadores';
    const total = fighters.total || 1;
    const fg = document.getElementById('fighterGrid');
    fg.innerHTML = FIGHTER_FIELDS.map(f => {
      const val = fighters[f.key] || 0;
      const pct = (val / total * 100).toFixed(1);
      const cls = pctClass(parseFloat(pct));
      const prev = prevFighters[f.key] || val;
      const delta = val - prev;
      return '<div class="fcard' + (delta > 0 ? ' glow' : '') + '">' +
        '<div class="flabel">' + f.label + '</div>' +
        '<div class="fval">' + val.toLocaleString() + '</div>' +
        '<div class="fpct pct-' + cls + '">' + pct + '%</div>' +
        '<div class="fbar"><div class="fbar-fill bar-' + cls + '" style="width:' + pct + '%"></div></div>' +
        '<div class="delta' + (delta > 0 ? ' show' : '') + '">+' + delta + '</div>' +
      '</div>';
    }).join('');

    // Feed: News
    const fn = document.getElementById('feedNews');
    if (!recentNews || !recentNews.length) {
      fn.innerHTML = '<div style="color:#333;text-align:center;padding:30px;">Sem notícias</div>';
    } else {
      fn.innerHTML = recentNews.map(n => {
        const catColors = { lutadores: 'badge-red', lutas: 'badge-gold', backstage: 'badge-green' };
        return '<div class="feed-row">' +
          '<span class="feed-icon">📰</span>' +
          '<div class="feed-text">' +
            '<div class="feed-title">' + esc(n.titulo) + '</div>' +
            '<div class="feed-sub">' + esc(n.fonte_nome||'') + '</div>' +
          '</div>' +
          '<span class="feed-badge ' + (catColors[n.categoria]||'badge-red') + '">' + esc(n.categoria||'') + '</span>' +
          '<span class="feed-time">' + timeAgo(n.publicado_em) + '</span>' +
        '</div>';
      }).join('');
    }

    // Feed: Agents
    const fa = document.getElementById('feedAgents');
    if (!recentTasks || !recentTasks.length) {
      fa.innerHTML = '<div style="color:#333;text-align:center;padding:30px;">Sem atividade</div>';
    } else {
      fa.innerHTML = recentTasks.map(t => {
        const statusColors = { completed: 'badge-green', running: 'badge-gold', pending: 'badge-blue', failed: 'badge-red' };
        return '<div class="feed-row">' +
          '<span class="feed-icon">' + esc(t.icon||'🤖') + '</span>' +
          '<div class="feed-text">' +
            '<div class="feed-title">' + esc(t.humanName||'Agent') + '</div>' +
            '<div class="feed-sub">' + esc(t.type||'') + '</div>' +
          '</div>' +
          '<span class="feed-badge ' + (statusColors[t.status]||'badge-blue') + '">' + esc(t.status||'') + '</span>' +
          '<span class="feed-time">' + timeAgo(t.createdAt) + '</span>' +
        '</div>';
      }).join('');
    }

    // Save previous values
    prevTables = { ...tables };
    prevFighters = { ...fighters };
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

// ── Static sections (rendered once) ──
function renderStatic() {
  // Relations
  const rg = document.getElementById('relGrid');
  rg.innerHTML = RELATIONS.map(r => {
    const isSelf = r[4] === 'self';
    return '<div class="rel-item">' +
      '<span class="rel-from">' + r[0] + '</span>' +
      '<span class="rel-col">.' + r[1] + '</span>' +
      '<span class="rel-arrow"> → </span>' +
      '<span class="rel-to">' + r[2] + '</span>' +
      '<span class="rel-col">.' + r[3] + '</span>' +
      (isSelf ? ' <span class="rel-self">self-ref</span>' : '') +
    '</div>';
  }).join('');

  // Enums, Views, Checks
  const ref = document.getElementById('refGrid');
  let html = '';

  // Enums
  html += ENUMS.map(e =>
    '<div class="ref-card">' +
      '<h4>🏷️ ' + e.name + '</h4>' +
      '<div class="vals">' + e.vals.map(v => '<span>' + v + '</span>').join(' ') + '</div>' +
    '</div>'
  ).join('');

  // Views
  html += '<div class="ref-card">' +
    '<h4>👁️ Views (3)</h4>' +
    '<div class="vals">' + VIEWS.map(v => '<div style="margin-bottom:6px;"><strong style="color:#d4af37;">' + v.name + '</strong><br><span style="color:#666;">' + v.desc + '</span></div>').join('') + '</div>' +
  '</div>';

  // Checks
  html += '<div class="ref-card">' +
    '<h4>🔒 Check Constraints (8)</h4>' +
    '<div class="vals">' + CHECKS.map(c => '<div style="margin-bottom:4px;"><span style="color:#60a5fa;">' + c.table + '</span> <span style="color:#555;">→</span> ' + c.rule + '</div>').join('') + '</div>' +
  '</div>';

  // Special indexes
  html += '<div class="ref-card">' +
    '<h4>⚡ Índices Especiais</h4>' +
    '<div class="vals">' +
      '<div style="margin-bottom:4px;"><span style="color:#d4af37;">GIN full-text</span> lutadores.nome (busca português)</div>' +
      '<div style="margin-bottom:4px;"><span style="color:#d4af37;">Parcial</span> lutas WHERE records_atualizados = false</div>' +
      '<div style="margin-bottom:4px;"><span style="color:#d4af37;">Parcial</span> previsoes WHERE processada = false</div>' +
      '<div style="margin-bottom:4px;"><span style="color:#d4af37;">Composto DESC</span> evento_pontuacao (evento, pontos)</div>' +
      '<div><span style="color:#d4af37;">Composto DESC</span> liga_membros (liga, pontos)</div>' +
    '</div>' +
  '</div>';

  ref.innerHTML = html;
}

renderStatic();
refresh();
setInterval(refresh, 3000);
</script>
</body>
</html>`;

// ── Server ───────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  if (req.url === '/api/db-stats') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    try {
      const stats = await getDbStats();
      res.end(JSON.stringify(stats));
    } catch (e) {
      console.error('DB error:', e.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\\n🗄️  UFC News Hub — Database Dashboard');
  console.log('   http://localhost:' + PORT + '\\n');
});

// Graceful shutdown
function shutdown() {
  console.log('\\nShutting down...');
  server.close(() => {
    pool.end().then(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 3000);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
