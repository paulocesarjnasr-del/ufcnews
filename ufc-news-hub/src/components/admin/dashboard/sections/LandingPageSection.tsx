'use client';

import { ExternalLink, Earth, FileText } from 'lucide-react';

export function LandingPageSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-white tracking-wide">Landing Page</h2>
        <p className="text-sm text-gray-500 mt-1">Pagina enterprise para clientes B2B</p>
      </div>

      <div className="neu-card p-6 border border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Earth className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Pagina Enterprise</h3>
            <p className="text-xs text-gray-500">/enterprise</p>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="/enterprise"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-button px-4 py-3 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2 text-sm">
              <ExternalLink className="w-4 h-4" />
              Abrir Landing Page
            </span>
          </a>

          <div className="neu-inset p-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Secoes da Pagina
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Hero + Value Proposition
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Revenue Math + Cost Comparison
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Pipeline Visual (8 etapas)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Weekly Deliverables
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Live Demo + FAQ
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                CTA Final
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
