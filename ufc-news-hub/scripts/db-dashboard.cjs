const http = require('http');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

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

// ── Agent Tools Parsing ──────────────────────────────────────────────
const AGENTS_INDEX_PATH = path.join(__dirname, '..', 'src', 'lib', 'ai-company', 'agents', 'index.ts');
const TOOLS_INDEX_PATH = path.join(__dirname, '..', 'src', 'lib', 'ai-company', 'tools', 'index.ts');

function parseAgentToolsFromFile() {
  try {
    var content = fs.readFileSync(AGENTS_INDEX_PATH, 'utf-8');
    var blockMatch = content.match(/const AGENT_TOOLS[^=]*=\s*\{([\s\S]*?)\n\};/);
    if (!blockMatch) return {};
    var block = blockMatch[1];
    var result = {};
    var agentRe = /['"]?([\w-]+)['"]?\s*:\s*\{([^}]*)\}/g;
    var m;
    while ((m = agentRe.exec(block)) !== null) {
      var agentId = m[1];
      var toolsBlock = m[2];
      var toolNames = [];
      var toolRe = /(\w+)\s*:\s*tools\.\w+/g;
      var tm;
      while ((tm = toolRe.exec(toolsBlock)) !== null) {
        toolNames.push(tm[1]);
      }
      if (toolNames.length > 0) {
        result[agentId] = toolNames;
      }
    }
    return result;
  } catch (e) {
    console.error('parseAgentToolsFromFile error:', e.message);
    return {};
  }
}

function parseToolSources() {
  try {
    var content = fs.readFileSync(TOOLS_INDEX_PATH, 'utf-8');
    var result = {};
    var toolRe = /export const (\w+)\s*=\s*tool\(\{/g;
    var m;
    while ((m = toolRe.exec(content)) !== null) {
      var name = m[1];
      var startIdx = m.index;
      var depth = 0;
      var endIdx = content.indexOf('{', startIdx + m[0].length - 1);
      for (var i = endIdx; i < content.length; i++) {
        if (content[i] === '{') depth++;
        else if (content[i] === '}') {
          depth--;
          if (depth === 0) {
            endIdx = i;
            break;
          }
        }
      }
      var closeIdx = content.indexOf(');', endIdx);
      if (closeIdx === -1) closeIdx = endIdx + 1;
      else closeIdx += 2;
      var source = content.substring(startIdx, closeIdx);
      var descMatch = source.match(/description:\s*['"`]([^'"`]+)['"`]/);
      var description = descMatch ? descMatch[1] : '';
      var lineCount = source.split('\n').length;
      result[name] = { name: name, description: description, source: source, lineCount: lineCount };
    }
    return result;
  } catch (e) {
    console.error('parseToolSources error:', e.message);
    return {};
  }
}

async function getAgentToolsData() {
  var agentToolsMap = parseAgentToolsFromFile();
  var toolSources = parseToolSources();
  var dbAgents = [];
  try {
    var qr = await pool.query('SELECT id, "humanName", codename, icon, model, status FROM agents ORDER BY id');
    dbAgents = qr.rows;
  } catch (e) {
    console.error('getAgentToolsData DB error:', e.message);
  }
  var allToolNames = new Set();
  var agents = [];
  var allAgentIds = new Set([...Object.keys(agentToolsMap), ...dbAgents.map(function(a) { return a.id; })]);
  for (var agentId of allAgentIds) {
    var dbAgent = dbAgents.find(function(a) { return a.id === agentId; });
    var fileTools = agentToolsMap[agentId] || [];
    fileTools.forEach(function(t) { allToolNames.add(t); });
    agents.push({
      id: agentId,
      humanName: dbAgent ? dbAgent.humanName : agentId,
      codename: dbAgent ? dbAgent.codename : agentId,
      icon: dbAgent ? dbAgent.icon : '🤖',
      model: dbAgent ? dbAgent.model : 'unknown',
      status: dbAgent ? dbAgent.status : 'unknown',
      tools: fileTools,
      inDatabase: !!dbAgent,
    });
  }
  var allTools = {};
  for (var tName of allToolNames) {
    allTools[tName] = toolSources[tName] || { name: tName, description: '', source: '', lineCount: 0 };
  }
  return {
    agents: agents,
    totalAgents: agents.length,
    totalUniqueTools: allToolNames.size,
    allTools: allTools,
    toolsInDatabase: false,
  };
}

async function getAgentDetailData(agentId) {
  var agentToolsMap = parseAgentToolsFromFile();
  var toolSources = parseToolSources();
  var dbAgent = null;
  try {
    var qr = await pool.query('SELECT * FROM agents WHERE id = $1', [agentId]);
    if (qr.rows.length > 0) dbAgent = qr.rows[0];
  } catch (e) {
    console.error('getAgentDetailData DB error:', e.message);
  }
  var fileTools = agentToolsMap[agentId] || [];
  var toolDetails = fileTools.map(function(tName) {
    return toolSources[tName] || { name: tName, description: '', source: '', lineCount: 0 };
  });
  return {
    id: agentId,
    humanName: dbAgent ? dbAgent.humanName : agentId,
    codename: dbAgent ? dbAgent.codename : agentId,
    icon: dbAgent ? dbAgent.icon : '🤖',
    model: dbAgent ? dbAgent.model : 'unknown',
    systemPrompt: dbAgent ? dbAgent.systemPrompt : '',
    status: dbAgent ? dbAgent.status : 'unknown',
    tools: toolDetails,
    toolNames: fileTools,
    inDatabase: !!dbAgent,
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

  /* ── Tab Navigation ── */
  .tab-bar {
    display: flex; gap: 0; margin-bottom: 20px; border-bottom: 2px solid #1e1e2e;
    overflow-x: auto; -webkit-overflow-scrolling: touch;
  }
  .tab {
    padding: 10px 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; color: #555; cursor: pointer; border-bottom: 2px solid transparent;
    margin-bottom: -2px; transition: all 0.2s; white-space: nowrap; background: none; border-top: none; border-left: none; border-right: none;
  }
  .tab:hover { color: #999; }
  .tab.active { color: #d20a0a; border-bottom-color: #d20a0a; }
  .view-panel { display: none; }
  .view-panel.active { display: block; }

  /* ── Tools View ── */
  .tools-header { margin-bottom: 16px; }
  .tools-header h2 { font-size: 18px; color: #fff; }
  .db-warning {
    background: rgba(250,204,21,0.08); border: 1px solid rgba(250,204,21,0.25);
    color: #facc15; font-size: 11px; padding: 8px 14px; border-radius: 8px; margin-bottom: 14px;
  }
  .tools-summary {
    display: flex; gap: 16px; margin-bottom: 16px; font-size: 12px; color: #888;
  }
  .tools-summary .ts-val { font-size: 22px; font-weight: 700; color: #fff; }
  .view-toggle { display: flex; gap: 8px; margin-bottom: 16px; }
  .vbtn {
    padding: 6px 16px; border-radius: 6px; border: 1px solid #333; background: #12121a;
    color: #888; font-size: 11px; cursor: pointer; transition: all 0.2s;
  }
  .vbtn:hover { border-color: #555; color: #ccc; }
  .vbtn.active { background: #d20a0a; border-color: #d20a0a; color: #fff; }

  /* Tool Cards */
  .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
  .tools-agent-card {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px; padding: 14px;
  }
  .tac-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
  }
  .tac-icon { font-size: 20px; }
  .tac-name { font-size: 13px; font-weight: 700; color: #fff; }
  .tac-id { font-size: 10px; color: #555; }
  .tac-count { font-size: 11px; color: #d4af37; margin-top: 8px; }
  .tac-tools { display: flex; flex-wrap: wrap; gap: 4px; }
  .ttag {
    font-size: 9px; padding: 2px 8px; border-radius: 4px;
    transition: all 0.15s; border: 1px solid transparent; display: inline-block;
  }
  .ttag.clickable { cursor: pointer; }
  .ttag.clickable:hover { transform: scale(1.05); filter: brightness(1.3); }
  .ttag.sec { background: rgba(239,68,68,0.15); color: #f87171; }
  .ttag.qry { background: rgba(59,130,246,0.15); color: #60a5fa; }
  .ttag.wrt { background: rgba(250,204,21,0.15); color: #facc15; }
  .ttag.web { background: rgba(74,222,128,0.15); color: #4ade80; }
  .ttag.other { background: rgba(148,163,184,0.15); color: #94a3b8; }
  .summary-card {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px; padding: 12px 16px; text-align: center;
  }
  .summary-card .sv { font-size: 22px; font-weight: 700; color: #fff; }
  .summary-card .sl { font-size: 10px; color: #666; text-transform: uppercase; }
  .summary-card.sc-red .sv { color: #f87171; }
  .summary-card.sc-blue .sv { color: #60a5fa; }
  .summary-card.sc-yellow .sv { color: #facc15; }
  .summary-card.sc-green .sv { color: #4ade80; }

  /* Matrix */
  .matrix-wrap { overflow-x: auto; max-height: 70vh; overflow-y: auto; }
  .matrix-table { border-collapse: collapse; font-size: 10px; }
  .matrix-table th { position: sticky; top: 0; background: #0e0e16; padding: 4px 6px; color: #888; z-index: 2; }
  .matrix-table td { padding: 4px 6px; border: 1px solid #1a1a2a; text-align: center; }
  .matrix-table .agent-col { position: sticky; left: 0; background: #12121a; color: #ccc; font-weight: 600; text-align: left; z-index: 1; white-space: nowrap; }
  .matrix-table .has-tool { background: rgba(74,222,128,0.12); color: #4ade80; cursor: pointer; }
  .matrix-table .has-tool:hover { background: rgba(74,222,128,0.25); }
  .matrix-table .no-tool { color: #222; }

  /* Code Modal */
  .code-modal-overlay {
    display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.7); z-index: 100; justify-content: center; align-items: center;
  }
  .code-modal-overlay.show, .code-modal-overlay.open { display: flex; }
  .code-modal {
    background: #12121a; border: 1px solid #333; border-radius: 12px;
    width: 90%; max-width: 800px; max-height: 80vh; display: flex; flex-direction: column;
  }
  .code-modal-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 18px; border-bottom: 1px solid #1e1e2e;
  }
  .code-modal-header h3 { font-size: 14px; color: #fff; }
  .close-btn {
    background: none; border: none; color: #888; font-size: 22px; cursor: pointer;
    padding: 0 6px; line-height: 1;
  }
  .close-btn:hover { color: #fff; }
  .code-modal-desc { padding: 8px 18px; font-size: 11px; color: #888; }
  .code-modal-body {
    padding: 14px 18px; overflow: auto; flex: 1;
    font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px; line-height: 1.5;
    color: #ccc; white-space: pre-wrap; background: #0a0a0f; margin: 0 12px 12px; border-radius: 8px;
  }

  /* Lab */
  .lab-split { display: grid; grid-template-columns: 260px 1fr; gap: 16px; min-height: 500px; }
  .lab-agents {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px; padding: 14px;
    max-height: 70vh; overflow-y: auto;
  }
  .lab-agents h3 { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .lab-pill {
    display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px;
    cursor: pointer; transition: all 0.15s; font-size: 11px; color: #888;
    background: transparent; border: 1px solid transparent;
  }
  .lab-pill:hover { background: rgba(255,255,255,0.03); color: #ccc; }
  .lab-pill.active { background: rgba(210,10,10,0.1); border-color: rgba(210,10,10,0.3); color: #ff4444; }
  .lab-panel {
    background: #12121a; border: 1px solid #1e1e2e; border-radius: 10px; padding: 18px;
    overflow-y: auto; max-height: 70vh;
  }
  .lab-prompt {
    background: #0a0a0f; border: 1px solid #1a1a2a; border-radius: 8px; padding: 12px;
    font-size: 11px; color: #aaa; max-height: 200px; overflow-y: auto; white-space: pre-wrap; line-height: 1.5;
  }
  .lab-tools-list { display: flex; flex-wrap: wrap; gap: 4px; margin: 8px 0; }
  .lab-tool-btn {
    font-size: 10px; padding: 4px 10px; border-radius: 4px; border: 1px solid #333;
    background: #1a1a2a; color: #888; cursor: pointer; transition: all 0.15s;
  }
  .lab-tool-btn:hover { border-color: #555; color: #ccc; }
  .lab-tool-btn.active { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.4); color: #60a5fa; }
  .lab-scenarios { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .lab-scenario-btn {
    font-size: 10px; padding: 6px 12px; border-radius: 6px; border: 1px solid #333;
    background: #12121a; color: #ccc; cursor: pointer; transition: all 0.15s;
  }
  .lab-scenario-btn:hover { border-color: #d20a0a; color: #ff4444; }
  .lab-steps {
    background: #0a0a0f; border: 1px solid #1a1a2a; border-radius: 8px; padding: 12px;
    font-size: 11px; min-height: 120px; max-height: 300px; overflow-y: auto;
  }
  .sim-step {
    padding: 6px 0; border-bottom: 1px solid #111; animation: slideIn 0.3s ease;
  }
  .sim-step:last-child { border-bottom: none; }

  /* ── Data Browsing Tables ── */
  .table-controls { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 14px; }
  .search-input { background: #12121a; border: 1px solid #333; border-radius: 6px; padding: 8px 12px; color: #ccc; font-size: 12px; width: 250px; }
  .search-input:focus { border-color: #d20a0a; outline: none; }
  .filter-pills { display: flex; gap: 4px; }
  .fpill { padding: 4px 10px; border-radius: 12px; border: 1px solid #333; background: #12121a; color: #888; font-size: 10px; cursor: pointer; }
  .fpill:hover, .fpill.active { border-color: #d20a0a; color: #d20a0a; }
  .table-wrap { overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; font-size: 11px; }
  .data-table th { position: sticky; top: 0; background: #0e0e16; padding: 8px 10px; color: #888; text-align: left; cursor: pointer; border-bottom: 2px solid #1e1e2e; white-space: nowrap; font-size: 10px; text-transform: uppercase; }
  .data-table th:hover { color: #ccc; }
  .data-table td { padding: 6px 10px; border-bottom: 1px solid #1a1a2a; color: #ccc; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .data-table tr:hover { background: rgba(255,255,255,0.02); }
  .data-table tr { cursor: pointer; }
  .pagination { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 14px; font-size: 12px; color: #888; }
  .page-btn { padding: 4px 12px; border-radius: 4px; border: 1px solid #333; background: #12121a; color: #888; cursor: pointer; font-size: 11px; }
  .page-btn:hover { border-color: #d20a0a; color: #ccc; }
  .page-btn.active { background: #d20a0a; border-color: #d20a0a; color: #fff; }
  .detail-sidebar { position: fixed; right: 0; top: 0; width: 420px; height: 100vh; background: #12121a; border-left: 2px solid #d20a0a; z-index: 50; transform: translateX(100%); transition: transform 0.25s ease; overflow-y: auto; padding: 20px; }
  .detail-sidebar.open { transform: translateX(0); }
  .detail-sidebar .ds-close { position: absolute; top: 10px; right: 14px; background: none; border: none; color: #888; font-size: 20px; cursor: pointer; }
  .detail-sidebar .ds-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 16px; padding-right: 30px; }
  .detail-sidebar .ds-field { margin-bottom: 10px; }
  .detail-sidebar .ds-label { font-size: 10px; color: #666; text-transform: uppercase; }
  .detail-sidebar .ds-value { font-size: 12px; color: #ccc; margin-top: 2px; word-break: break-all; }
  .detail-sidebar .ds-value.empty { color: #f87171; font-style: italic; }
  .detail-sidebar .ds-value img { max-width: 200px; border-radius: 8px; margin-top: 4px; }
  .ds-edit-btn { font-size: 9px; color: #60a5fa; cursor: pointer; margin-left: 8px; }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <h1>🗄️ UFC News Hub <span class="red">CRM</span></h1>
  <div class="sub">31 tabelas · 60 tools · 18 agentes · 122 índices</div>
  <div class="live"><span class="dot"></span> LIVE — atualiza a cada 3s · <span id="clock">—</span></div>
</div>

<!-- Tab Navigation -->
<div class="tab-bar">
  <button class="tab active" data-view="overview" onclick="switchTab(this)">📊 Overview</button>
  <button class="tab" data-view="tools" onclick="switchTab(this)">🛠️ Tools</button>
  <button class="tab" data-view="lutadores" onclick="switchTab(this)">🥊 Lutadores</button>
  <button class="tab" data-view="noticias" onclick="switchTab(this)">📰 Notícias</button>
  <button class="tab" data-view="eventos" onclick="switchTab(this)">📅 Eventos</button>
  <button class="tab" data-view="agentes" onclick="switchTab(this)">🤖 Agentes</button>
  <button class="tab" data-view="tasks" onclick="switchTab(this)">📋 Tasks</button>
</div>

<!-- Overview Panel -->
<div class="view-panel active" id="view-overview">

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

</div><!-- /view-overview -->

<!-- Tools View -->
<div class="view-panel" id="view-tools">
  <div class="tools-header">
    <h2>🛠️ Agent Tools Explorer</h2>
  </div>
  <div class="db-warning" id="toolsDbWarning">⚠️ Mapeamento lido do código-fonte (agents/index.ts). As tools não estão no CRM/DB — apenas no código.</div>
  <div class="tools-summary" id="toolsSummary"></div>
  <div class="view-toggle" id="toolsViewToggle">
    <button class="vbtn active" onclick="setToolView('cards')">📇 Cards</button>
    <button class="vbtn" onclick="setToolView('matrix')">📊 Matrix</button>
    <button class="vbtn" onclick="setToolView('lab')">🧪 Lab</button>
  </div>
  <div id="toolsCards"></div>
  <div id="toolsMatrix" style="display:none"></div>
  <div id="toolsLab" style="display:none"></div>
</div>

<!-- Lutadores View -->
<div class="view-panel" id="view-lutadores">
  <div class="table-controls">
    <input type="text" class="search-input" id="search-lutadores" placeholder="Buscar lutador..." onkeyup="debounceSearch('lutadores')">
    <div class="filter-pills">
      <button class="fpill" onclick="filterTable('lutadores','')">Todos</button>
      <button class="fpill" onclick="filterTable('lutadores','sem_foto')">📷 Sem foto</button>
      <button class="fpill" onclick="filterTable('lutadores','sem_stats')">📊 Sem stats</button>
    </div>
    <div class="sort-info" id="sort-lutadores"></div>
  </div>
  <div class="table-wrap" id="table-lutadores"></div>
  <div class="pagination" id="page-lutadores"></div>
</div>

<!-- Noticias View -->
<div class="view-panel" id="view-noticias">
  <div class="table-controls">
    <input type="text" class="search-input" id="search-noticias" placeholder="Buscar noticia..." onkeyup="debounceSearch('noticias')">
    <div class="filter-pills">
      <button class="fpill" onclick="filterTable('noticias','')">Todos</button>
    </div>
    <div class="sort-info" id="sort-noticias"></div>
  </div>
  <div class="table-wrap" id="table-noticias"></div>
  <div class="pagination" id="page-noticias"></div>
</div>

<!-- Eventos View -->
<div class="view-panel" id="view-eventos">
  <div class="table-controls">
    <input type="text" class="search-input" id="search-eventos" placeholder="Buscar evento..." onkeyup="debounceSearch('eventos')">
    <div class="filter-pills">
      <button class="fpill" onclick="filterTable('eventos','')">Todos</button>
    </div>
    <div class="sort-info" id="sort-eventos"></div>
  </div>
  <div class="table-wrap" id="table-eventos"></div>
  <div class="pagination" id="page-eventos"></div>
</div>

<!-- Agentes View -->
<div class="view-panel" id="view-agentes">
  <div class="table-controls">
    <input type="text" class="search-input" id="search-agents" placeholder="Buscar agente..." onkeyup="debounceSearch('agents')">
    <div class="filter-pills">
      <button class="fpill" onclick="filterTable('agents','')">Todos</button>
    </div>
    <div class="sort-info" id="sort-agents"></div>
  </div>
  <div class="table-wrap" id="table-agents"></div>
  <div class="pagination" id="page-agents"></div>
</div>

<!-- Tasks View -->
<div class="view-panel" id="view-tasks">
  <div class="table-controls">
    <input type="text" class="search-input" id="search-agent_tasks" placeholder="Buscar task..." onkeyup="debounceSearch('agent_tasks')">
    <div class="filter-pills">
      <button class="fpill" onclick="filterTable('agent_tasks','')">Todos</button>
      <button class="fpill" onclick="filterTable('agent_tasks','failed')">❌ Failed</button>
      <button class="fpill" onclick="filterTable('agent_tasks','pending')">⏳ Pending</button>
    </div>
    <div class="sort-info" id="sort-agent_tasks"></div>
  </div>
  <div class="table-wrap" id="table-agent_tasks"></div>
  <div class="pagination" id="page-agent_tasks"></div>
</div>

<!-- Code Modal -->
<div class="code-modal-overlay" id="codeModalOverlay" onclick="if(event.target===this)closeCodeModal()">
  <div class="code-modal">
    <div class="code-modal-header">
      <h3 id="codeModalTitle">Tool Source</h3>
      <button class="close-btn" onclick="closeCodeModal()">&times;</button>
    </div>
    <div class="code-modal-desc" id="codeModalDesc"></div>
    <div class="code-modal-body" id="codeModalBody"></div>
  </div>
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

// ── Tool Classification ──
var SECURITY_TOOLS = new Set(['fullSecurityScan','owaspZapStyleScan','bruteForceSimulation','sessionHijackingTest','cookieSecurityAudit','apiFuzzing','cspAnalysis','sslTlsAudit','securityHeadersAudit','authenticationAudit','injectionAudit','exposedDataAudit','rateLimitAudit','fileExposureAudit','corsAndCsrfAudit','npmAuditCheck','checkDependencies','runNpmAuditFix']);
var WEB_TOOLS = new Set(['searchWeb','fetchWebPage']);
var WRITE_TOOLS = new Set(['publishArticle','updateFighterData','backfillFighterData','runDatabaseMigration','fixColumnSchema','runNpmAuditFix','moderateComment','createPoll','processEventResults','openArenaPredictions','finalizeDuels','syncEventCards','updateFightResults','checkEventResults']);
var QUERY_TOOLS = new Set(['queryArticles','queryFighters','queryEvents','queryFights','queryComments','querySyncLogs','queryPredictionAccuracy','queryArenaStats','queryLeagueStandings','queryTopKeywords','queryUpcomingEvents']);

function toolClass(name) {
  if (SECURITY_TOOLS.has(name)) return 'sec';
  if (WEB_TOOLS.has(name)) return 'web';
  if (WRITE_TOOLS.has(name)) return 'wrt';
  if (QUERY_TOOLS.has(name)) return 'qry';
  return '';
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { renderStatic(); refresh(); setInterval(refresh, 3000); });
} else {
  renderStatic(); refresh(); setInterval(refresh, 3000);
}

// ── Tab Switching ──
function switchTab(el) {
  var view = el.getAttribute('data-view');
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  el.classList.add('active');
  var panels = document.querySelectorAll('.view-panel');
  for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
  var target = document.getElementById('view-' + view);
  if (target) target.classList.add('active');
  if (view === 'tools' && !toolsDataCache) loadToolsView();
  var dataTabMap = { lutadores: 'lutadores', noticias: 'noticias', eventos: 'eventos', agentes: 'agents', tasks: 'agent_tasks' };
  if (dataTabMap[view]) loadTable(dataTabMap[view]);
}

// ── Tools View ──
var toolsDataCache = null;
var currentToolView = 'cards';
var labAgentCache = {};
var labCurrentAgent = null;

function loadToolsView() {
  fetch('/api/agent-tools')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      toolsDataCache = data;
      renderToolsView();
    })
    .catch(function(e) { console.error('loadToolsView error:', e); });
}

function renderToolsView() {
  var d = toolsDataCache;
  if (!d) return;
  // Summary
  var secCount = 0, qryCount = 0, wrtCount = 0, webCount = 0;
  var allKeys = Object.keys(d.allTools || {});
  for (var i = 0; i < allKeys.length; i++) {
    var tc = toolClass(allKeys[i]);
    if (tc === 'sec') secCount++;
    else if (tc === 'qry') qryCount++;
    else if (tc === 'wrt') wrtCount++;
    else if (tc === 'web') webCount++;
  }
  document.getElementById('toolsSummary').innerHTML =
    '<div class="summary-card"><div class="sv">' + d.totalAgents + '</div><div class="sl">Agentes</div></div>' +
    '<div class="summary-card"><div class="sv">' + d.totalUniqueTools + '</div><div class="sl">Tools Únicas</div></div>' +
    '<div class="summary-card sc-red"><div class="sv">' + secCount + '</div><div class="sl">Security</div></div>' +
    '<div class="summary-card sc-blue"><div class="sv">' + qryCount + '</div><div class="sl">Query</div></div>' +
    '<div class="summary-card sc-yellow"><div class="sv">' + wrtCount + '</div><div class="sl">Write</div></div>' +
    '<div class="summary-card sc-green"><div class="sv">' + webCount + '</div><div class="sl">Web</div></div>';
  renderToolCards();
}

function renderToolCards() {
  var d = toolsDataCache;
  if (!d) return;
  var html = '<div class="tools-grid">';
  for (var i = 0; i < d.agents.length; i++) {
    var a = d.agents[i];
    html += '<div class="tools-agent-card">';
    html += '<div class="tac-header"><span class="tac-icon">' + esc(a.icon || '🤖') + '</span>';
    html += '<div><div class="tac-name">' + esc(a.humanName) + '</div>';
    html += '<div class="tac-id">' + esc(a.id) + (a.inDatabase ? '' : ' · ⚠️ not in DB') + '</div></div></div>';
    html += '<div class="tac-tools">';
    for (var j = 0; j < a.tools.length; j++) {
      var t = a.tools[j];
      var tc = toolClass(t);
      html += '<span class="ttag ' + tc + ' clickable" onclick="openToolCode(\\'' + esc(t) + '\\')">' + esc(t) + '</span>';
    }
    html += '</div>';
    html += '<div class="tac-count">' + a.tools.length + ' tools</div>';
    html += '</div>';
  }
  html += '</div>';
  document.getElementById('toolsCards').innerHTML = html;
}

function renderToolMatrix() {
  var d = toolsDataCache;
  if (!d) return;
  // Collect all unique tools across agents
  var allToolSet = {};
  for (var i = 0; i < d.agents.length; i++) {
    for (var j = 0; j < d.agents[i].tools.length; j++) {
      allToolSet[d.agents[i].tools[j]] = true;
    }
  }
  var toolNames = Object.keys(allToolSet).sort();
  var html = '<div class="matrix-wrap"><table class="matrix-table"><thead><tr><th>Agent</th>';
  for (var i = 0; i < toolNames.length; i++) {
    var tc = toolClass(toolNames[i]);
    html += '<th class="rotate"><span class="ttag ' + tc + '" style="font-size:8px">' + esc(toolNames[i]) + '</span></th>';
  }
  html += '</tr></thead><tbody>';
  for (var i = 0; i < d.agents.length; i++) {
    var a = d.agents[i];
    var toolSet = {};
    for (var j = 0; j < a.tools.length; j++) toolSet[a.tools[j]] = true;
    html += '<tr><td class="agent-name">' + esc(a.icon || '🤖') + ' ' + esc(a.humanName) + '</td>';
    for (var j = 0; j < toolNames.length; j++) {
      if (toolSet[toolNames[j]]) {
        html += '<td class="has-tool" onclick="openToolCode(\\'' + esc(toolNames[j]) + '\\')">✓</td>';
      } else {
        html += '<td class="no-tool">·</td>';
      }
    }
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  document.getElementById('toolsMatrix').innerHTML = html;
}

function setToolView(v) {
  currentToolView = v;
  var btns = document.querySelectorAll('#toolsViewToggle .vbtn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  if (v === 'cards') { btns[0].classList.add('active'); }
  else if (v === 'matrix') { btns[1].classList.add('active'); }
  else if (v === 'lab') { btns[2].classList.add('active'); }
  document.getElementById('toolsCards').style.display = v === 'cards' ? '' : 'none';
  document.getElementById('toolsMatrix').style.display = v === 'matrix' ? '' : 'none';
  document.getElementById('toolsLab').style.display = v === 'lab' ? '' : 'none';
  if (v === 'matrix' && !document.getElementById('toolsMatrix').innerHTML) renderToolMatrix();
  if (v === 'lab' && !document.getElementById('toolsLab').innerHTML) renderLabShell();
}

// ── Code Modal ──
function openToolCode(name) {
  fetch('/api/tool-source/' + encodeURIComponent(name))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || data.error) {
        document.getElementById('codeModalTitle').textContent = name;
        document.getElementById('codeModalDesc').textContent = 'Tool source not found';
        document.getElementById('codeModalBody').textContent = 'Source code not available.';
      } else {
        document.getElementById('codeModalTitle').textContent = data.name + ' (' + data.lineCount + ' lines)';
        document.getElementById('codeModalDesc').textContent = data.description || 'No description';
        document.getElementById('codeModalBody').textContent = data.source;
      }
      document.getElementById('codeModalOverlay').classList.add('open');
    })
    .catch(function(e) { console.error('openToolCode error:', e); });
}

function closeCodeModal() {
  document.getElementById('codeModalOverlay').classList.remove('open');
}

// ── Lab View ──
var LAB_SCENARIOS = {
  'ceo': ['Relatório diário', 'Verificar saúde', 'Auditar segurança'],
  'cso': ['Scan completo', 'Testar autenticação', 'Verificar vulnerabilidades npm'],
  'content-dir': ['Revisar conteúdo', 'Planejar pauta'],
  'analytics-dir': ['Análise de dados', 'Previsões'],
  'ops-dir': ['Status operacional', 'Corrigir erros'],
  'news-writer': ['Escrever sobre UFC 326', 'Notícia de última hora'],
  'social-engager': ['Criar enquete', 'Engajar fãs'],
  'fight-analyst': ['Analisar matchup', 'Prever resultado'],
  'stats-compiler': ['Atualizar stats', 'Relatório de dados'],
  'system-health': ['Health check', 'Verificar DB', 'Analisar latência'],
  'arena-manager': ['Abrir previsões', 'Processar resultados'],
  'seo-growth': ['Auditoria SEO', 'Gerar meta tags'],
  'ui-auditor': ['Auditar interface', 'Verificar console']
};

function renderLabShell() {
  var d = toolsDataCache;
  if (!d) return;
  var html = '<div class="lab-agents" id="labAgentPills">';
  for (var i = 0; i < d.agents.length; i++) {
    var a = d.agents[i];
    html += '<div class="lab-pill" onclick="loadLabView(\\'' + esc(a.id) + '\\')">' + esc(a.icon || '🤖') + ' ' + esc(a.humanName) + '</div>';
  }
  html += '</div>';
  html += '<div class="lab-split">';
  html += '<div class="lab-panel" id="labLeftPanel"><h4>📋 Prompt do Agente</h4><div class="lab-prompt" id="labPrompt" style="color:#555;">Selecione um agente acima</div></div>';
  html += '<div class="lab-panel" id="labRightPanel"><h4>🛠️ Tools & Simulador</h4><div id="labToolsList"></div><div class="lab-scenarios" id="labScenarios"></div><div class="lab-steps" id="labSteps"></div></div>';
  html += '</div>';
  document.getElementById('toolsLab').innerHTML = html;
}

function loadLabView(agentId) {
  labCurrentAgent = agentId;
  // Highlight pill
  var pills = document.querySelectorAll('#labAgentPills .lab-pill');
  for (var i = 0; i < pills.length; i++) pills[i].classList.remove('active');
  for (var i = 0; i < pills.length; i++) {
    if (pills[i].textContent.indexOf(agentId) !== -1 || pills[i].getAttribute('onclick').indexOf(agentId) !== -1) {
      pills[i].classList.add('active');
    }
  }
  document.getElementById('labSteps').innerHTML = '';
  if (labAgentCache[agentId]) {
    renderLabContent(labAgentCache[agentId]);
    return;
  }
  fetch('/api/agent-detail/' + encodeURIComponent(agentId))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      labAgentCache[agentId] = data;
      renderLabContent(data);
    })
    .catch(function(e) { console.error('loadLabView error:', e); });
}

function renderLabContent(data) {
  // Left panel: prompt
  var prompt = data.systemPrompt || 'Sem prompt disponível (agente não está no DB)';
  if (prompt.length > 2000) prompt = prompt.substring(0, 2000) + '\\n\\n... (truncated)';
  document.getElementById('labPrompt').textContent = prompt;

  // Right panel: tools
  var html = '<div class="lab-tools-list">';
  for (var i = 0; i < data.toolNames.length; i++) {
    var t = data.toolNames[i];
    var tc = toolClass(t);
    html += '<span class="lab-tool-btn" id="lab-tool-' + t + '" data-tool="' + esc(t) + '">' + esc(t) + '</span>';
  }
  html += '</div>';
  document.getElementById('labToolsList').innerHTML = html;

  // Scenarios
  var scenarios = LAB_SCENARIOS[data.id] || ['Executar tarefa genérica'];
  var shtml = '<h4 style="margin-top:12px">🎯 Cenários</h4>';
  for (var i = 0; i < scenarios.length; i++) {
    shtml += '<button class="lab-scenario-btn" onclick="simulateTask(\\'' + esc(data.id) + '\\', \\'' + esc(scenarios[i]) + '\\')">' + esc(scenarios[i]) + '</button>';
  }
  document.getElementById('labScenarios').innerHTML = shtml;
}

function simulateTask(agentId, taskName) {
  var data = labAgentCache[agentId];
  if (!data) return;
  var stepsEl = document.getElementById('labSteps');
  stepsEl.innerHTML = '';

  // Reset tool highlights
  var toolBtns = document.querySelectorAll('.lab-tool-btn');
  for (var i = 0; i < toolBtns.length; i++) toolBtns[i].classList.remove('highlight');

  // Pick 2-4 tools based on task keywords
  var toolsToUse = [];
  var lower = taskName.toLowerCase();
  for (var i = 0; i < data.toolNames.length; i++) {
    var t = data.toolNames[i].toLowerCase();
    // Match heuristic: task keywords overlap with tool name
    if (lower.indexOf('saúde') !== -1 && t.indexOf('health') !== -1) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('health') !== -1 && t.indexOf('health') !== -1) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('segurança') !== -1 && (t.indexOf('security') !== -1 || t.indexOf('audit') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('scan') !== -1 && (t.indexOf('scan') !== -1 || t.indexOf('audit') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('autenticação') !== -1 && t.indexOf('auth') !== -1) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('vulnerabilidades') !== -1 && (t.indexOf('npm') !== -1 || t.indexOf('audit') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('conteúdo') !== -1 && (t.indexOf('article') !== -1 || t.indexOf('query') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('pauta') !== -1 && (t.indexOf('web') !== -1 || t.indexOf('article') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('dados') !== -1 && (t.indexOf('data') !== -1 || t.indexOf('query') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('previsões') !== -1 && (t.indexOf('prediction') !== -1 || t.indexOf('query') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('operacional') !== -1 && (t.indexOf('health') !== -1 || t.indexOf('latency') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('erros') !== -1 && (t.indexOf('error') !== -1 || t.indexOf('fix') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('escrever') !== -1 && (t.indexOf('article') !== -1 || t.indexOf('publish') !== -1 || t.indexOf('web') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('notícia') !== -1 && (t.indexOf('article') !== -1 || t.indexOf('publish') !== -1 || t.indexOf('web') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('enquete') !== -1 && (t.indexOf('poll') !== -1 || t.indexOf('comment') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('engajar') !== -1 && (t.indexOf('comment') !== -1 || t.indexOf('article') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('matchup') !== -1 && (t.indexOf('fighter') !== -1 || t.indexOf('fight') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('resultado') !== -1 && (t.indexOf('prediction') !== -1 || t.indexOf('fight') !== -1 || t.indexOf('result') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('stats') !== -1 && (t.indexOf('fighter') !== -1 || t.indexOf('data') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('relatório') !== -1 && (t.indexOf('report') !== -1 || t.indexOf('stats') !== -1 || t.indexOf('health') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('db') !== -1 && (t.indexOf('db') !== -1 || t.indexOf('health') !== -1 || t.indexOf('pool') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('latência') !== -1 && (t.indexOf('latency') !== -1 || t.indexOf('endpoint') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('previsões') !== -1 && (t.indexOf('prediction') !== -1 || t.indexOf('arena') !== -1 || t.indexOf('open') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('processar') !== -1 && (t.indexOf('process') !== -1 || t.indexOf('result') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('seo') !== -1 && (t.indexOf('seo') !== -1 || t.indexOf('meta') !== -1 || t.indexOf('keyword') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('meta') !== -1 && (t.indexOf('meta') !== -1 || t.indexOf('seo') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('interface') !== -1 && (t.indexOf('page') !== -1 || t.indexOf('component') !== -1 || t.indexOf('console') !== -1)) toolsToUse.push(data.toolNames[i]);
    else if (lower.indexOf('console') !== -1 && (t.indexOf('console') !== -1 || t.indexOf('error') !== -1)) toolsToUse.push(data.toolNames[i]);
  }
  // Deduplicate and limit
  var seen = {};
  var unique = [];
  for (var i = 0; i < toolsToUse.length; i++) {
    if (!seen[toolsToUse[i]]) { seen[toolsToUse[i]] = true; unique.push(toolsToUse[i]); }
  }
  toolsToUse = unique.slice(0, 4);
  if (toolsToUse.length === 0) {
    toolsToUse = data.toolNames.slice(0, 2);
  }

  animateSteps(stepsEl, taskName, toolsToUse);
}

function animateSteps(container, taskName, tools) {
  var steps = [];
  steps.push({ cls: 'think', text: '🤔 Agent recebeu a tarefa: "' + taskName + '"...' });
  for (var i = 0; i < tools.length; i++) {
    steps.push({ cls: 'tool-call', text: '🔧 Chamando ' + tools[i] + '...', tool: tools[i] });
    steps.push({ cls: 'result', text: '✓ ' + tools[i] + ' retornou dados' });
  }
  steps.push({ cls: 'done', text: '✅ Tarefa concluída com sucesso!' });

  var delay = 0;
  for (var i = 0; i < steps.length; i++) {
    (function(step, idx) {
      setTimeout(function() {
        var div = document.createElement('div');
        div.className = 'lab-step ' + step.cls;
        div.textContent = step.text;
        container.appendChild(div);
        if (step.tool) {
          var btn = document.getElementById('lab-tool-' + step.tool);
          if (btn) btn.classList.add('highlight');
        }
        container.scrollTop = container.scrollHeight;
      }, delay);
    })(steps[i], i);
    delay += 800 + Math.floor(Math.random() * 400);
  }
}

// ── Keyboard shortcut for modal ──
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeCodeModal(); closeSidebar(); }
});

// ── Data Browsing ──
var tableState = {};
var TABLE_DISPLAY = {
  lutadores: { defaultSort: 'nome', columns: ['nome','categoria_peso','pais','vitorias','derrotas','imagem_url'] },
  noticias: { defaultSort: 'publicado_em', columns: ['titulo','fonte_nome','categoria','publicado_em'] },
  eventos: { defaultSort: 'data_evento', columns: ['nome','data_evento','local_evento','status'] },
  agents: { defaultSort: 'humanName', order: 'asc', columns: ['icon','humanName','role','status','level','xp'] },
  agent_tasks: { defaultSort: 'createdAt', columns: ['type','status','createdAt','agentId'] },
};

function getTableState(table) {
  if (!tableState[table]) {
    var cfg = TABLE_DISPLAY[table] || {};
    tableState[table] = { page: 1, search: '', sort: cfg.defaultSort || 'id', order: cfg.order || 'desc', filter: '' };
  }
  return tableState[table];
}

var searchTimers = {};
function debounceSearch(table) {
  if (searchTimers[table]) clearTimeout(searchTimers[table]);
  searchTimers[table] = setTimeout(function() { searchTable(table); }, 300);
}

function searchTable(table) {
  var st = getTableState(table);
  var el = document.getElementById('search-' + table);
  if (el) st.search = el.value;
  st.page = 1;
  loadTable(table);
}

function filterTable(table, filter) {
  var st = getTableState(table);
  st.filter = filter;
  st.page = 1;
  loadTable(table);
}

function sortTable(table, col) {
  var st = getTableState(table);
  if (st.sort === col) { st.order = st.order === 'asc' ? 'desc' : 'asc'; }
  else { st.sort = col; st.order = 'desc'; }
  loadTable(table);
}

function goPage(table, page) {
  var st = getTableState(table);
  st.page = page;
  loadTable(table);
}

async function loadTable(table) {
  var st = getTableState(table);
  var url = '/api/table/' + encodeURIComponent(table) + '?page=' + st.page + '&sort=' + st.sort + '&order=' + st.order;
  if (st.search) url += '&search=' + encodeURIComponent(st.search);
  if (st.filter) url += '&filter=' + encodeURIComponent(st.filter);
  try {
    var resp = await fetch(url);
    var data = await resp.json();
    var config = TABLE_DISPLAY[table] || {};
    var displayCols = config.columns || Object.keys(data.rows[0] || {}).slice(0, 8);
    var html = '<table class="data-table"><thead><tr>';
    displayCols.forEach(function(col) {
      var arrow = st.sort === col ? (st.order === 'asc' ? ' ↑' : ' ↓') : '';
      html += '<th onclick="sortTable(\\x27' + table + '\\x27,\\x27' + col + '\\x27)">' + col + arrow + '</th>';
    });
    html += '</tr></thead><tbody>';
    data.rows.forEach(function(row) {
      html += '<tr onclick="openSidebar(\\x27' + table + '\\x27,\\x27' + row.id + '\\x27)">';
      displayCols.forEach(function(col) {
        var val = row[col];
        if (col === 'imagem_url' && val) {
          html += '<td><img src="' + esc(val) + '" style="height:30px;border-radius:4px;" onerror="this.style.display=\\x27none\\x27"></td>';
        } else if (val === null || val === undefined) {
          html += '<td style="color:#333;">—</td>';
        } else if (typeof val === 'string' && val.length > 50) {
          html += '<td title="' + esc(val) + '">' + esc(val.substring(0, 50)) + '...</td>';
        } else {
          html += '<td>' + esc(String(val)) + '</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById('table-' + table).innerHTML = html;
    var pageHtml = '';
    if (data.pages > 1) {
      if (data.page > 1) pageHtml += '<button class="page-btn" onclick="goPage(\\x27' + table + '\\x27,' + (data.page - 1) + ')">←</button>';
      pageHtml += '<span>' + data.page + ' / ' + data.pages + ' (' + data.total + ' registros)</span>';
      if (data.page < data.pages) pageHtml += '<button class="page-btn" onclick="goPage(\\x27' + table + '\\x27,' + (data.page + 1) + ')">→</button>';
    } else {
      pageHtml = '<span>' + data.total + ' registros</span>';
    }
    document.getElementById('page-' + table).innerHTML = pageHtml;
  } catch(e) {
    console.error('loadTable error:', e);
    document.getElementById('table-' + table).innerHTML = '<div style="color:#f87171;padding:20px;">Erro ao carregar: ' + e.message + '</div>';
  }
}

async function openSidebar(table, id) {
  try {
    var resp = await fetch('/api/record/' + encodeURIComponent(table) + '/' + encodeURIComponent(id));
    var record = await resp.json();
    var sidebar = document.getElementById('detailSidebar');
    var html = '<button class="ds-close" onclick="closeSidebar()">&times;</button>';
    html += '<div class="ds-title">' + (record.nome || record.humanName || record.titulo || record.type || 'Record') + '</div>';
    Object.keys(record).forEach(function(key) {
      var val = record[key];
      var isEmpty = val === null || val === undefined || val === '';
      html += '<div class="ds-field">';
      html += '<div class="ds-label">' + esc(key) + ' <span class="ds-edit-btn" onclick="editField(\\x27' + table + '\\x27,\\x27' + id + '\\x27,\\x27' + key + '\\x27)">✏️</span></div>';
      if (key === 'imagem_url' && val) {
        html += '<div class="ds-value"><img src="' + esc(val) + '" onerror="this.style.display=\\x27none\\x27"></div>';
      } else if (isEmpty) {
        html += '<div class="ds-value empty">— vazio —</div>';
      } else if (typeof val === 'string' && val.length > 200) {
        html += '<div class="ds-value" style="white-space:pre-wrap;max-height:150px;overflow-y:auto;">' + esc(val) + '</div>';
      } else {
        html += '<div class="ds-value">' + esc(String(val)) + '</div>';
      }
      html += '</div>';
    });
    sidebar.innerHTML = html;
    sidebar.classList.add('open');
  } catch(e) {
    console.error('openSidebar error:', e);
  }
}

function closeSidebar() {
  document.getElementById('detailSidebar').classList.remove('open');
}

function editField(table, id, field) {
  var newVal = prompt('Novo valor para ' + field + ':');
  if (newVal === null) return;
  fetch('/api/record/' + encodeURIComponent(table) + '/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ column: field, value: newVal || null })
  }).then(function(r) { return r.json(); }).then(function() {
    openSidebar(table, id);
    loadTable(table);
  });
}
</script>

<div class="detail-sidebar" id="detailSidebar"></div>
</body>
</html>`;

// ── Security & Data Browsing ─────────────────────────────────────────
const ALLOWED_TABLES = new Set([
  'noticias','noticia_entidades','comentarios','comentarios_rate_limit','sync_logs',
  'lutadores','eventos','lutas','analises',
  'usuarios_arena','previsoes','evento_pontuacao','conquistas',
  'ligas','liga_membros','liga_temporadas','liga_chat','previsoes_liga',
  'duelos','amizades','atividades','notificacoes',
  'agents','agent_tasks','agent_logs','agent_cost_logs','agent_events',
  'approvals','company_prompts','performance_reviews','remediation_plans',
]);

const PK_MAP = {};
for (const t of ALLOWED_TABLES) PK_MAP[t] = 'id';

const schemaCache = {};
async function getTableColumns(tableName) {
  if (schemaCache[tableName]) return schemaCache[tableName];
  const { rows } = await pool.query(
    "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position",
    [tableName]
  );
  schemaCache[tableName] = rows;
  return rows;
}

async function getTableData(tableName, query) {
  var page = parseInt(query.page) || 1;
  var limit = Math.min(parseInt(query.limit) || 50, 200);
  var offset = (page - 1) * limit;
  var search = query.search || '';
  var sort = query.sort || 'id';
  var order = query.order === 'asc' ? 'ASC' : 'DESC';
  var filter = query.filter || '';
  var cols = await getTableColumns(tableName);
  var colNames = cols.map(function(c) { return c.column_name; });
  if (colNames.indexOf(sort) === -1) sort = 'id';
  var conditions = [];
  var params = [];
  var paramIdx = 1;
  if (search) {
    var textCols = cols.filter(function(c) { return c.data_type === 'text' || c.data_type === 'character varying'; });
    if (textCols.length > 0) {
      var searchConds = textCols.map(function(c) { return '"' + c.column_name + '"::text ILIKE $' + paramIdx; });
      conditions.push('(' + searchConds.join(' OR ') + ')');
      params.push('%' + search + '%');
      paramIdx++;
    }
  }
  if (filter === 'sem_foto' && tableName === 'lutadores') {
    conditions.push("(imagem_url IS NULL OR imagem_url = '')");
  } else if (filter === 'sem_stats' && tableName === 'lutadores') {
    conditions.push("(slpm IS NULL OR slpm = 0)");
  } else if (filter === 'failed' && tableName === 'agent_tasks') {
    conditions.push("status = 'failed'");
  } else if (filter === 'pending' && tableName === 'agent_tasks') {
    conditions.push("status = 'pending'");
  }
  var where = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';
  var countResult = await pool.query('SELECT COUNT(*)::int as total FROM "' + tableName + '"' + where, params);
  var total = countResult.rows[0].total;
  var dataResult = await pool.query(
    'SELECT * FROM "' + tableName + '"' + where + ' ORDER BY "' + sort + '" ' + order + ' LIMIT $' + paramIdx + ' OFFSET $' + (paramIdx + 1),
    params.concat([limit, offset])
  );
  return { rows: dataResult.rows, total: total, page: page, limit: limit, pages: Math.ceil(total / limit) };
}

async function getRecord(tableName, id) {
  var result = await pool.query('SELECT * FROM "' + tableName + '" WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function updateRecord(tableName, id, column, value) {
  var cols = await getTableColumns(tableName);
  if (!cols.some(function(c) { return c.column_name === column; })) throw new Error('Invalid column');
  var result = await pool.query('UPDATE "' + tableName + '" SET "' + column + '" = $1 WHERE id = $2 RETURNING *', [value, id]);
  return result.rows[0] || null;
}

function parseBody(req) {
  return new Promise(function(resolve, reject) {
    var body = '';
    req.on('data', function(chunk) { body += chunk; if (body.length > 1e6) reject(new Error('Too large')); });
    req.on('end', function() { try { resolve(JSON.parse(body)); } catch(e) { reject(e); } });
  });
}

// ── Server ───────────────────────────────────────────────────────────
const jsonHeaders = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
const server = http.createServer(async (req, res) => {
  var parsedUrl = new URL(req.url, 'http://localhost');
  var pathname = parsedUrl.pathname;
  var query = Object.fromEntries(parsedUrl.searchParams);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end(); return;
  }

  // GET /api/table/:name
  var tableMatch = pathname.match(/^\/api\/table\/([^/]+)$/);
  if (tableMatch && req.method === 'GET') {
    var tbl = decodeURIComponent(tableMatch[1]);
    if (!ALLOWED_TABLES.has(tbl)) { res.writeHead(403, jsonHeaders); res.end(JSON.stringify({error:'forbidden'})); return; }
    try {
      var data = await getTableData(tbl, query);
      res.writeHead(200, jsonHeaders); res.end(JSON.stringify(data));
    } catch(e) { res.writeHead(500, jsonHeaders); res.end(JSON.stringify({error:e.message})); }
    return;
  }

  // GET /api/table/:name/columns
  var colMatch = pathname.match(/^\/api\/table\/([^/]+)\/columns$/);
  if (colMatch && req.method === 'GET') {
    var tbl = decodeURIComponent(colMatch[1]);
    if (!ALLOWED_TABLES.has(tbl)) { res.writeHead(403, jsonHeaders); res.end(JSON.stringify({error:'forbidden'})); return; }
    try {
      var cols = await getTableColumns(tbl);
      res.writeHead(200, jsonHeaders); res.end(JSON.stringify(cols));
    } catch(e) { res.writeHead(500, jsonHeaders); res.end(JSON.stringify({error:e.message})); }
    return;
  }

  // GET /api/record/:table/:id
  var recMatch = pathname.match(/^\/api\/record\/([^/]+)\/([^/]+)$/);
  if (recMatch && req.method === 'GET') {
    var tbl = decodeURIComponent(recMatch[1]);
    var rid = decodeURIComponent(recMatch[2]);
    if (!ALLOWED_TABLES.has(tbl)) { res.writeHead(403, jsonHeaders); res.end(JSON.stringify({error:'forbidden'})); return; }
    try {
      var rec = await getRecord(tbl, rid);
      if (!rec) { res.writeHead(404, jsonHeaders); res.end(JSON.stringify({error:'not found'})); return; }
      res.writeHead(200, jsonHeaders); res.end(JSON.stringify(rec));
    } catch(e) { res.writeHead(500, jsonHeaders); res.end(JSON.stringify({error:e.message})); }
    return;
  }

  // PATCH /api/record/:table/:id
  if (recMatch && req.method === 'PATCH') {
    var tbl = decodeURIComponent(recMatch[1]);
    var rid = decodeURIComponent(recMatch[2]);
    if (!ALLOWED_TABLES.has(tbl)) { res.writeHead(403, jsonHeaders); res.end(JSON.stringify({error:'forbidden'})); return; }
    try {
      var body = await parseBody(req);
      var updated = await updateRecord(tbl, rid, body.column, body.value);
      res.writeHead(200, jsonHeaders); res.end(JSON.stringify(updated));
    } catch(e) { res.writeHead(500, jsonHeaders); res.end(JSON.stringify({error:e.message})); }
    return;
  }

  if (pathname === '/api/db-stats') {
    res.writeHead(200, jsonHeaders);
    try {
      const stats = await getDbStats();
      res.end(JSON.stringify(stats));
    } catch (e) {
      console.error('DB error:', e.message);
      res.writeHead(500, jsonHeaders);
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
  } else if (pathname === '/api/agent-tools') {
    try {
      const data = await getAgentToolsData();
      res.writeHead(200, jsonHeaders);
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, jsonHeaders);
      res.end(JSON.stringify({ error: e.message }));
    }
  } else if (pathname.startsWith('/api/tool-source/')) {
    try {
      const toolName = decodeURIComponent(pathname.replace('/api/tool-source/', ''));
      const sources = parseToolSources();
      const toolData = sources[toolName] || null;
      res.writeHead(200, jsonHeaders);
      res.end(JSON.stringify(toolData ? toolData : { error: 'Tool not found' }));
    } catch (e) {
      res.writeHead(500, jsonHeaders);
      res.end(JSON.stringify({ error: e.message }));
    }
  } else if (pathname === '/api/tool-sources') {
    try {
      const sources = parseToolSources();
      res.writeHead(200, jsonHeaders);
      res.end(JSON.stringify(sources));
    } catch (e) {
      res.writeHead(500, jsonHeaders);
      res.end(JSON.stringify({ error: e.message }));
    }
  } else if (pathname.startsWith('/api/agent-detail/')) {
    try {
      const agentId = decodeURIComponent(pathname.replace('/api/agent-detail/', ''));
      const data = await getAgentDetailData(agentId);
      res.writeHead(200, jsonHeaders);
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, jsonHeaders);
      res.end(JSON.stringify({ error: e.message }));
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
