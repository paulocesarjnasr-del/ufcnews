'use client';

import { Server, Clock, ExternalLink, Monitor } from 'lucide-react';

interface CronJob {
  path: string;
  schedule: string;
  descricao: string;
}

const CRON_JOBS: CronJob[] = [
  {
    path: '/api/cron',
    schedule: '0 13,18,23 * * *',
    descricao: 'RSS sync + news aggregation (3x/dia)',
  },
  {
    path: '/api/arena/cron/scoring',
    schedule: '*/5 * * * 5,6,0',
    descricao: 'Calcular pontuacao Arena (a cada 5min, Sex-Dom)',
  },
  {
    path: '/api/cron/card-monitor',
    schedule: '0 22 * * 1-5',
    descricao: 'Verificar mudancas no card (22h UTC, Seg-Sex)',
  },
  {
    path: '/api/arena/cron/pre-evento',
    schedule: '0 */1 * * 5,6',
    descricao: 'Setup pre-evento (a cada 1h, Sex-Sab)',
  },
  {
    path: '/api/arena/cron/pos-evento',
    schedule: '0 10 * * 0',
    descricao: 'Processamento pos-evento (Dom 10h UTC)',
  },
  {
    path: '/api/arena/cron/lembrete-picks',
    schedule: '0 18 * * 3',
    descricao: 'Lembrete de picks (Qua 18h UTC)',
  },
  {
    path: '/api/arena/cron/limpeza',
    schedule: '0 3 * * 1',
    descricao: 'Limpeza de dados (Seg 3h UTC)',
  },
];

export function SiteVercelSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-white tracking-wide">Site / Vercel</h2>
        <p className="text-sm text-gray-500 mt-1">Deploy, cron jobs e infraestrutura</p>
      </div>

      {/* Live Site */}
      <div className="neu-card p-6 border border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-ufc-red/10 rounded-lg flex items-center justify-center">
            <Monitor className="w-5 h-5 text-ufc-red" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Site em Producao</h3>
            <p className="text-xs text-gray-500">ufc-news.vercel.app</p>
          </div>
        </div>

        <div className="space-y-2">
          <a
            href="https://ufc-news.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-button px-4 py-3 flex items-center justify-between text-gray-300 hover:text-white transition-colors text-sm"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Abrir Site
            </span>
            <code className="text-[10px] text-gray-500 font-mono">ufc-news.vercel.app</code>
          </a>
          <a
            href="https://ufc-news.vercel.app/enterprise"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-button px-4 py-3 flex items-center justify-between text-gray-300 hover:text-white transition-colors text-sm"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Landing Page Enterprise
            </span>
            <code className="text-[10px] text-gray-500 font-mono">/enterprise</code>
          </a>
          <a
            href="https://ufc-news.vercel.app/arena"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-button px-4 py-3 flex items-center justify-between text-gray-300 hover:text-white transition-colors text-sm"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Arena
            </span>
            <code className="text-[10px] text-gray-500 font-mono">/arena</code>
          </a>
        </div>
      </div>

      {/* Vercel Dashboard */}
      <div className="neu-card p-6 border border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Server className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Vercel Dashboard</h3>
            <p className="text-xs text-gray-500">Next.js 15 App Router</p>
          </div>
        </div>

        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="neu-button px-4 py-3 flex items-center justify-between text-gray-300 hover:text-white transition-colors text-sm"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Abrir Vercel Dashboard
          </span>
        </a>
      </div>

      {/* Cron Jobs */}
      <div className="neu-card p-6 border border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Cron Jobs</h3>
            <p className="text-xs text-gray-500">{CRON_JOBS.length} jobs configurados</p>
          </div>
        </div>

        <div className="space-y-2">
          {CRON_JOBS.map((job) => (
            <div
              key={job.path}
              className="neu-inset p-3 flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <code className="text-xs text-ufc-red font-mono block truncate">
                  {job.path}
                </code>
                <p className="text-xs text-gray-400 mt-1">{job.descricao}</p>
              </div>
              <code className="text-[10px] text-gray-500 font-mono shrink-0 bg-[#0a0a0f] px-2 py-1 rounded">
                {job.schedule}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
