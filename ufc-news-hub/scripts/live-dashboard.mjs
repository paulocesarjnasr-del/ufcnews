import http from 'http';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://ufcnews:ufcnews123@localhost:5432/ufc_news_hub',
});

const PORT = 3011;

async function getStats() {
  const { rows: [totals] } = await pool.query(`
    SELECT 
      COUNT(*) as total,
      COUNT(imagem_url) FILTER (WHERE imagem_url IS NOT NULL AND imagem_url != '') as fotos,
      COUNT(pais) FILTER (WHERE pais IS NOT NULL AND pais != '') as pais,
      COUNT(cidade_natal) FILTER (WHERE cidade_natal IS NOT NULL AND cidade_natal != '') as cidade,
      COUNT(academia) FILTER (WHERE academia IS NOT NULL AND academia != '') as academia,
      COUNT(categoria_peso) FILTER (WHERE categoria_peso IS NOT NULL AND categoria_peso != '') as categoria,
      COUNT(estilo_luta) FILTER (WHERE estilo_luta IS NOT NULL AND estilo_luta != '') as estilo,
      COUNT(ranking_divisao) FILTER (WHERE ranking_divisao IS NOT NULL) as ranking,
      COUNT(slpm) FILTER (WHERE slpm IS NOT NULL AND slpm > 0) as stats,
      COUNT(vitorias) FILTER (WHERE vitorias IS NOT NULL AND vitorias > 0) as record,
      COUNT(nocautes) FILTER (WHERE nocautes IS NOT NULL AND nocautes > 0) as ko_data,
      COUNT(stance) FILTER (WHERE stance IS NOT NULL AND stance != '') as stance
    FROM lutadores
  `);

  const { rows: recent } = await pool.query(`
    SELECT nome, pais, academia, categoria_peso, estilo_luta, cidade_natal,
      imagem_url IS NOT NULL AND imagem_url != '' as tem_foto,
      updated_at
    FROM lutadores 
    WHERE updated_at > NOW() - INTERVAL '60 seconds'
    ORDER BY updated_at DESC
    LIMIT 20
  `);

  const { rows: [rate] } = await pool.query(`
    SELECT 
      COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '60 seconds') as last_min,
      COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '300 seconds') as last_5min
    FROM lutadores
  `);

  return { totals, recent, rate };
}

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🥊 UFC Scraper Live</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0a0f;
      color: #e0e0e0;
      font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
      padding: 20px;
      min-height: 100vh;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 28px;
      color: #d20a0a;
      text-shadow: 0 0 20px rgba(210,10,10,0.3);
    }
    .header .live {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(210,10,10,0.15);
      border: 1px solid rgba(210,10,10,0.3);
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 12px;
      color: #ff4444;
      margin-top: 8px;
    }
    .header .live .dot {
      width: 8px; height: 8px;
      background: #ff4444;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: #12121a;
      border: 1px solid #1e1e2e;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
    }
    .stat-card.highlight {
      border-color: rgba(210,10,10,0.4);
      animation: glow 0.5s ease-out;
    }
    @keyframes glow {
      0% { box-shadow: 0 0 20px rgba(210,10,10,0.4); }
      100% { box-shadow: none; }
    }
    .stat-card .label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .stat-card .value {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      line-height: 1;
    }
    .stat-card .pct {
      font-size: 14px;
      color: #888;
      margin-top: 4px;
    }
    .stat-card .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #d20a0a, #ff4444);
      transition: width 1s ease;
      border-radius: 0 3px 0 0;
    }
    .stat-card .delta {
      position: absolute;
      top: 8px;
      right: 10px;
      font-size: 11px;
      color: #4ade80;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .stat-card .delta.show {
      opacity: 1;
    }
    .rate-bar {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #12121a;
      border: 1px solid #1e1e2e;
      border-radius: 12px;
      padding: 14px 20px;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .rate-bar .speed {
      color: #4ade80;
      font-weight: 600;
    }
    .feed-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .feed-header h2 {
      font-size: 16px;
      color: #ccc;
    }
    .feed {
      background: #12121a;
      border: 1px solid #1e1e2e;
      border-radius: 12px;
      overflow: hidden;
      max-height: 50vh;
      overflow-y: auto;
    }
    .feed::-webkit-scrollbar { width: 6px; }
    .feed::-webkit-scrollbar-track { background: transparent; }
    .feed::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    .feed-row {
      display: grid;
      grid-template-columns: 30px 1fr 100px 120px 100px 80px;
      gap: 8px;
      padding: 10px 16px;
      border-bottom: 1px solid #1a1a2a;
      font-size: 12px;
      align-items: center;
      animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .feed-row:hover { background: rgba(210,10,10,0.05); }
    .feed-row .photo {
      width: 24px; height: 24px;
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .feed-row .nome { color: #fff; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .feed-row .field { color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .feed-row .field.filled { color: #4ade80; }
    .feed-row .time { color: #555; text-align: right; }
    .empty { color: #333; text-align: center; padding: 40px; font-size: 13px; }
    .feed-row-header {
      display: grid;
      grid-template-columns: 30px 1fr 100px 120px 100px 80px;
      gap: 8px;
      padding: 10px 16px;
      font-size: 10px;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid #1e1e2e;
      background: #0e0e16;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🥊 UFC Fighter Scraper</h1>
    <div class="live"><span class="dot"></span> LIVE — atualizando a cada 2s</div>
  </div>

  <div class="grid" id="stats"></div>
  <div class="rate-bar" id="rate"></div>

  <div class="feed-header">
    <h2>⚡ Últimas atualizações</h2>
    <span id="feed-count" style="color:#555;font-size:12px"></span>
  </div>
  <div class="feed" id="feed"></div>

  <script>
    const FIELDS = [
      { key: 'fotos', label: '🖼️ Fotos', emoji: '📸' },
      { key: 'pais', label: '🌍 País', emoji: '🌍' },
      { key: 'cidade', label: '🏙️ Cidade', emoji: '🏙️' },
      { key: 'academia', label: '🥋 Academia', emoji: '🏫' },
      { key: 'categoria', label: '⚖️ Categoria', emoji: '🏋️' },
      { key: 'estilo', label: '🥊 Estilo', emoji: '🎯' },
      { key: 'stats', label: '📊 Stats', emoji: '📊' },
      { key: 'record', label: '📋 Record', emoji: '📋' },
      { key: 'ko_data', label: '💥 KO/Sub', emoji: '💥' },
      { key: 'stance', label: '🦶 Stance', emoji: '🦶' },
    ];

    let prevValues = {};
    let prevTotal = 0;

    async function update() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        const { totals, recent, rate } = data;
        const total = parseInt(totals.total);

        // Stats grid
        const statsEl = document.getElementById('stats');
        statsEl.innerHTML = FIELDS.map(f => {
          const val = parseInt(totals[f.key]) || 0;
          const pct = ((val / total) * 100).toFixed(1);
          const prev = prevValues[f.key] || val;
          const delta = val - prev;
          const highlight = delta > 0 ? 'highlight' : '';
          prevValues[f.key] = val;
          return \`
            <div class="stat-card \${highlight}">
              <div class="label">\${f.label}</div>
              <div class="value">\${val.toLocaleString()}</div>
              <div class="pct">\${pct}% de \${total.toLocaleString()}</div>
              <div class="bar" style="width: \${pct}%"></div>
              <div class="delta \${delta > 0 ? 'show' : ''}">+\${delta}</div>
            </div>
          \`;
        }).join('');

        // Rate bar
        const rateEl = document.getElementById('rate');
        const perMin = parseInt(rate.last_min) || 0;
        const per5 = parseInt(rate.last_5min) || 0;
        const remaining = total - parseInt(totals.pais || 0);
        const eta = perMin > 0 ? Math.ceil(remaining / perMin) : '∞';
        rateEl.innerHTML = \`
          <span>⚡ Velocidade:</span>
          <span class="speed">\${perMin}/min</span>
          <span style="color:#555">|</span>
          <span>\${per5} nos últimos 5min</span>
          <span style="color:#555">|</span>
          <span>ETA país 100%: <span class="speed">~\${eta} min</span></span>
          <span style="color:#555">|</span>
          <span>Total: <strong style="color:#fff">\${total.toLocaleString()}</strong> lutadores</span>
        \`;

        // Feed
        const feedEl = document.getElementById('feed');
        document.getElementById('feed-count').textContent = \`\${recent.length} no último minuto\`;
        
        if (recent.length === 0) {
          feedEl.innerHTML = '<div class="empty">Nenhuma atualização no último minuto...</div>';
        } else {
          feedEl.innerHTML = \`
            <div class="feed-row-header">
              <span></span>
              <span>Nome</span>
              <span>País</span>
              <span>Academia</span>
              <span>Categoria</span>
              <span>Tempo</span>
            </div>
          \` + recent.map(r => {
            const ago = Math.floor((Date.now() - new Date(r.updated_at).getTime()) / 1000);
            const agoStr = ago < 5 ? 'agora' : ago < 60 ? \`\${ago}s\` : \`\${Math.floor(ago/60)}m\`;
            return \`
              <div class="feed-row">
                <span class="photo">\${r.tem_foto ? '📸' : '👤'}</span>
                <span class="nome">\${r.nome}</span>
                <span class="field \${r.pais ? 'filled' : ''}">\${r.pais || '—'}</span>
                <span class="field \${r.academia ? 'filled' : ''}">\${r.academia ? r.academia.slice(0,18) : '—'}</span>
                <span class="field \${r.categoria_peso ? 'filled' : ''}">\${r.categoria_peso || '—'}</span>
                <span class="time">\${agoStr}</span>
              </div>
            \`;
          }).join('');
        }
      } catch (e) {
        console.error('Fetch error:', e);
      }
    }

    update();
    setInterval(update, 2000);
  </script>
</body>
</html>`;

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    try {
      const stats = await getStats();
      res.end(JSON.stringify(stats));
    } catch (e) {
      res.end(JSON.stringify({ error: e.message }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML);
  }
});

server.listen(PORT, () => {
  console.log(\`\\n🥊 UFC Scraper Live Dashboard\\n   http://localhost:\${PORT}\\n\`);
});
