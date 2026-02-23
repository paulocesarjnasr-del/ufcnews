'use client';

import { useState } from 'react';
import type { Agent } from '@/lib/admin/types';
import { CONNECTIONS, CONNECTION_STYLES } from '@/lib/admin/connections';
import { ModelBadge } from './ModelBadge';
import { AgentIcon } from './AgentIcon';

interface SpiderWebViewProps {
  onSelect: (id: string) => void;
  selectedAgent: string | null;
  agents: Record<string, Agent>;
}

export function SpiderWebView({ onSelect, selectedAgent, agents }: SpiderWebViewProps) {
  const [filterType, setFilterType] = useState('all');

  const conns =
    filterType === 'all'
      ? CONNECTIONS
      : CONNECTIONS.filter((c) => c.type === filterType);

  const grouped: Record<string, typeof CONNECTIONS> = {};
  conns.forEach((c) => {
    if (!grouped[c.from]) grouped[c.from] = [];
    grouped[c.from].push(c);
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-dark-text text-lg font-bold">Teia de Conexoes</h3>
        <p className="text-dark-textMuted text-sm">
          {CONNECTIONS.length} conexoes entre {Object.keys(agents).length} agentes
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setFilterType('all')}
          className={`neu-button px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-dark-text text-dark-bg'
              : 'text-dark-textMuted hover:text-dark-text'
          }`}
        >
          Todas ({CONNECTIONS.length})
        </button>
        {Object.entries(CONNECTION_STYLES).map(([type, style]) => {
          const count = CONNECTIONS.filter((c) => c.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`neu-button px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterType === type
                  ? `${style.bg} ${style.color} ring-1 ring-current`
                  : 'text-dark-textMuted hover:text-dark-text'
              }`}
            >
              <AgentIcon name={style.icon} className="w-3 h-3 inline mr-1" />
              {style.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {Object.entries(grouped).map(([fromId, connections]) => {
          const from = agents[fromId];
          if (!from) return null;
          return (
            <div key={fromId} className="neu-card overflow-hidden">
              <div
                className={`flex items-center gap-3 px-4 py-3 bg-dark-cardHover/50 cursor-pointer hover:bg-dark-cardHover transition-colors ${
                  selectedAgent === fromId ? 'ring-1 ring-ufc-red/30' : ''
                }`}
                onClick={() => onSelect(fromId)}
              >
                <span style={{ color: from.color }}>
                  <AgentIcon name={from.icon} className="w-5 h-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-dark-text text-sm font-bold">{from.humanName}</span>
                    <span className="text-dark-textMuted text-xs">{from.role}</span>
                    <ModelBadge modelId={from.model} />
                  </div>
                </div>
                <span className="text-dark-textMuted text-xs">{connections.length} conexoes</span>
              </div>

              <div className="divide-y divide-dark-border/30">
                {connections.map((conn, i) => {
                  const to = agents[conn.to];
                  const style = CONNECTION_STYLES[conn.type];
                  if (!to) return null;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-dark-cardHover/30 cursor-pointer transition-colors"
                      onClick={() => onSelect(conn.to)}
                    >
                      <span className={`w-6 text-center ${style.color}`}>
                        <AgentIcon name={style.icon} className="w-4 h-4 inline" />
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${style.bg} ${style.color} w-20 text-center`}
                      >
                        {style.label}
                      </span>
                      <span style={{ color: to.color }}>
                        <AgentIcon name={to.icon} className="w-4 h-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-dark-text text-xs font-medium">{to.humanName}</span>
                          <span className="text-dark-textMuted text-[10px]">{to.role}</span>
                        </div>
                        <p className="text-dark-textMuted text-[11px] truncate">{conn.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
