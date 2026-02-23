'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface Totals {
  total: string;
  fotos: string;
  pais: string;
  cidade: string;
  academia: string;
  categoria: string;
  estilo: string;
  ranking: string;
  stats: string;
  record: string;
  ko_data: string;
  stance: string;
}

interface RecentFighter {
  nome: string;
  pais: string | null;
  academia: string | null;
  categoria_peso: string | null;
  estilo_luta: string | null;
  cidade_natal: string | null;
  tem_foto: boolean;
  updated_at: string;
}

interface Rate {
  last_min: string;
  last_5min: string;
}

const FIELDS: { key: keyof Totals; label: string }[] = [
  { key: 'fotos', label: '🖼️ Fotos' },
  { key: 'pais', label: '🌍 País' },
  { key: 'cidade', label: '🏙️ Cidade' },
  { key: 'academia', label: '🥋 Academia' },
  { key: 'categoria', label: '⚖️ Categoria' },
  { key: 'estilo', label: '🥊 Estilo' },
  { key: 'stats', label: '📊 Stats' },
  { key: 'record', label: '📋 Record' },
  { key: 'ko_data', label: '💥 KO/Sub' },
  { key: 'stance', label: '🦶 Stance' },
];

export default function ScraperLive() {
  const [totals, setTotals] = useState<Totals | null>(null);
  const [recent, setRecent] = useState<RecentFighter[]>([]);
  const [rate, setRate] = useState<Rate | null>(null);
  const [prevValues, setPrevValues] = useState<Record<string, number>>({});
  const [deltas, setDeltas] = useState<Record<string, number>>({});
  const [isDone, setIsDone] = useState(false);
  const zeroCount = useRef(0);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/scraper-stats');
      const data = await res.json();
      
      if (data.totals) {
        setTotals(prev => {
          if (prev) {
            const newDeltas: Record<string, number> = {};
            for (const f of FIELDS) {
              const oldVal = parseInt(prev[f.key]) || 0;
              const newVal = parseInt(data.totals[f.key]) || 0;
              newDeltas[f.key] = newVal - oldVal;
            }
            setDeltas(newDeltas);
            setPrevValues(
              FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: parseInt(prev[f.key]) || 0 }), {})
            );
          }
          return data.totals;
        });
      }
      if (data.recent) setRecent(data.recent);
      if (data.rate) {
        setRate(data.rate);
        const perMin = parseInt(data.rate.last_min) || 0;
        if (perMin === 0) {
          zeroCount.current++;
          if (zeroCount.current > 5) setIsDone(true);
        } else {
          zeroCount.current = 0;
          setIsDone(false);
        }
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  if (!totals) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">Conectando ao banco...</div>
      </div>
    );
  }

  const total = parseInt(totals.total);
  const perMin = rate ? parseInt(rate.last_min) || 0 : 0;
  const per5 = rate ? parseInt(rate.last_5min) || 0 : 0;
  const paisCount = parseInt(totals.pais) || 0;
  const remaining = total - paisCount;
  const avgPerMin = per5 > 0 ? per5 / 5 : perMin;
  const eta = avgPerMin > 0 ? Math.ceil(remaining / avgPerMin) : Infinity;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 p-5 font-mono">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#d20a0a] drop-shadow-[0_0_20px_rgba(210,10,10,0.3)]">
          🥊 UFC Fighter Scraper
        </h1>
        <p className="text-gray-600 text-xs mt-1">Phase B — UFC.com Bio Scraping</p>
        <div className="inline-flex items-center gap-2 bg-[rgba(210,10,10,0.15)] border border-[rgba(210,10,10,0.3)] px-3 py-1 rounded-full text-xs text-red-400 mt-3">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          LIVE — atualizando a cada 2s
        </div>
      </div>

      {/* Done banner */}
      {isDone && (
        <div className="text-center py-4 bg-green-500/10 border border-green-500/30 rounded-xl mb-5 text-green-400 text-sm">
          ✅ Scraper finalizado! Nenhuma atualização no último minuto.
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {FIELDS.map(f => {
          const val = parseInt(totals[f.key]) || 0;
          const pct = ((val / total) * 100).toFixed(1);
          const delta = deltas[f.key] || 0;
          return (
            <div
              key={f.key}
              className={`bg-[#12121a] border rounded-xl p-4 text-center relative overflow-hidden transition-all duration-300 ${
                delta > 0 ? 'border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'border-[#1e1e2e]'
              }`}
            >
              <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">{f.label}</div>
              <div className={`text-2xl font-bold text-white transition-all ${delta > 0 ? 'scale-110 text-green-400' : ''}`}>
                {val.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">{pct}%</div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a1a2a]">
                <div
                  className="h-full bg-gradient-to-r from-[#d20a0a] to-[#ff4444] transition-all duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {delta > 0 && (
                <div className="absolute top-2 right-2 text-[11px] font-semibold text-green-400">
                  +{delta}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rate Bar */}
      <div className="flex items-center gap-4 flex-wrap bg-[#12121a] border border-[#1e1e2e] rounded-xl px-5 py-3 mb-6 text-sm">
        <span>⚡ Velocidade:</span>
        <span className="text-green-400 font-semibold">{perMin}/min</span>
        <span className="text-gray-700">|</span>
        <span>{per5} nos últimos 5min</span>
        <span className="text-gray-700">|</span>
        <span>
          ETA: <span className="text-green-400 font-semibold">~{eta === Infinity ? '∞' : eta} min</span>
        </span>
        <span className="text-gray-700">|</span>
        <span>
          Total: <strong className="text-white">{total.toLocaleString()}</strong> lutadores
        </span>
      </div>

      {/* Feed */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-base text-gray-300">⚡ Atualizações em tempo real</h2>
        <span className="text-gray-600 text-xs">{recent.length} no último minuto</span>
      </div>
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden max-h-[45vh] overflow-y-auto">
        {/* Header row */}
        <div className="grid grid-cols-[28px_1.2fr_0.8fr_1fr_0.8fr_60px] gap-2 px-4 py-2 text-[10px] text-gray-600 uppercase tracking-wider border-b border-[#1e1e2e] bg-[#0e0e16] sticky top-0 z-10">
          <span />
          <span>Nome</span>
          <span>País</span>
          <span>Academia</span>
          <span>Categoria</span>
          <span className="text-right">Tempo</span>
        </div>

        {recent.length === 0 ? (
          <div className="text-center text-gray-700 py-10 text-sm">
            Nenhuma atualização no último minuto...
          </div>
        ) : (
          recent.map((r, i) => {
            const updDate = r.updated_at ? new Date(r.updated_at) : null;
            const ago = updDate && !isNaN(updDate.getTime()) ? Math.floor((Date.now() - updDate.getTime()) / 1000) : 0;
            const agoStr = ago < 5 ? 'agora' : ago < 60 ? `${ago}s` : `${Math.floor(ago / 60)}m`;
            return (
              <div
                key={`${r.nome}-${i}`}
                className="grid grid-cols-[28px_1.2fr_0.8fr_1fr_0.8fr_60px] gap-2 px-4 py-2 border-b border-[#1a1a2a] text-xs hover:bg-[rgba(210,10,10,0.03)] animate-[slideIn_0.3s_ease]"
              >
                <span className="text-center">{r.tem_foto ? '📸' : '👤'}</span>
                <span className="text-white font-semibold truncate">{r.nome}</span>
                <span className={`truncate ${r.pais ? 'text-green-400' : 'text-gray-700'}`}>
                  {r.pais || '—'}
                </span>
                <span className={`truncate ${r.academia ? 'text-green-400' : 'text-gray-700'}`}>
                  {r.academia ? r.academia.slice(0, 20) : '—'}
                </span>
                <span className={`truncate ${r.categoria_peso ? 'text-green-400' : 'text-gray-700'}`}>
                  {r.categoria_peso || '—'}
                </span>
                <span className="text-gray-600 text-right">{agoStr}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
