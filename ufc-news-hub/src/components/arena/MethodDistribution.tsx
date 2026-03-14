'use client';

import { useEffect, useState } from 'react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface MetodoCount {
  metodo: string;
  count: number;
}

interface MetodosData {
  metodos: MetodoCount[];
  total: number;
}

interface DonutSegment {
  label: string;
  count: number;
  percent: number;
  color: string;
  bgClass: string;
}

function getColorForMetodo(metodo: string): { color: string; bgClass: string } {
  const lower = metodo.toLowerCase();
  if (lower.includes('ko') || lower.includes('tko')) {
    return { color: '#ef4444', bgClass: 'bg-red-500' };
  }
  if (lower.includes('submission')) {
    return { color: '#3b82f6', bgClass: 'bg-blue-500' };
  }
  if (lower.includes('decision')) {
    return { color: '#eab308', bgClass: 'bg-yellow-500' };
  }
  return { color: '#6b7280', bgClass: 'bg-gray-500' };
}

function buildConicGradient(segments: DonutSegment[]): string {
  let current = 0;
  const parts: string[] = [];
  for (const seg of segments) {
    const degrees = (seg.percent / 100) * 360;
    parts.push(`${seg.color} ${current}deg ${current + degrees}deg`);
    current += degrees;
  }
  return `conic-gradient(${parts.join(', ')})`;
}

export function MethodDistribution() {
  const { isAuthenticated } = useArenaAuth();
  const [data, setData] = useState<MetodosData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMetodos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/arena/analytics/metodos');
        if (!res.ok) throw new Error('Erro ao buscar metodos');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetodos();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="neu-card p-4">
        <div className="h-40 animate-pulse bg-dark-border rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="neu-card p-4 text-dark-text text-sm">
        Erro ao carregar distribuicao.
      </div>
    );
  }

  if (!data || data.total === 0 || data.metodos.length === 0) {
    return (
      <div className="neu-card p-6 text-center text-dark-text text-sm">
        Acerte previsoes para ver sua distribuicao de metodos
      </div>
    );
  }

  const segments: DonutSegment[] = data.metodos.map((m) => ({
    label: m.metodo,
    count: m.count,
    percent: (m.count / data.total) * 100,
    ...getColorForMetodo(m.metodo),
  }));

  const gradient = buildConicGradient(segments);

  return (
    <div className="neu-card p-4 flex flex-col sm:flex-row items-center gap-6">
      {/* Donut */}
      <div className="relative flex-shrink-0" style={{ width: 140, height: 140 }}>
        <div
          className="rounded-full"
          style={{
            width: 140,
            height: 140,
            background: gradient,
          }}
        />
        {/* Inner circle (hole) */}
        <div
          className="absolute inset-0 m-auto rounded-full bg-dark-card"
          style={{ width: 70, height: 70, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center text-xs text-dark-text font-mono"
        >
          {data.total}
        </div>
      </div>

      {/* Legend */}
      <ul className="space-y-2 text-sm">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full flex-shrink-0 ${seg.bgClass}`} />
            <span className="text-dark-text">{seg.label}</span>
            <span className="text-white font-mono ml-auto pl-4">
              {seg.count} <span className="text-dark-text">({Math.round(seg.percent)}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
