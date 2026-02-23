'use client';

import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import type { Agent } from '@/lib/admin/types';
import { CONNECTIONS, DATABASES, CONNECTION_STYLES } from '@/lib/admin/connections';
import { StatusBadge } from './StatusBadge';
import { ModelBadge } from './ModelBadge';
import { AgentIcon } from './AgentIcon';
import { formatLastRun } from '@/lib/admin/utils';
import { ArrowDown, ArrowUp, Database, AlertTriangle } from 'lucide-react';

// ============================
// TYPES
// ============================
interface UnifiedOrgViewProps {
  agents: Record<string, Agent>;
  selectedAgent: string | null;
  onSelect: (id: string) => void;
  activeAgentIds?: string[];
  processing?: boolean;
}

interface CardPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HierarchyLine {
  fromId: string;
  toId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: string;
}

// ============================
// HELPER: compute connection summary for an agent
// ============================
function getConnectionSummary(agentId: string) {
  const outgoing = CONNECTIONS.filter((c) => c.from === agentId);
  const incoming = CONNECTIONS.filter((c) => c.to === agentId);
  return { outgoing: outgoing.length, incoming: incoming.length };
}

// ============================
// HELPER: compute DB access summary for an agent
// ============================
function getDbSummary(agentId: string) {
  let reads = 0;
  let writes = 0;
  for (const db of DATABASES) {
    if (db.readers.includes(agentId)) reads++;
    if (db.writers.includes(agentId)) writes++;
  }
  return { reads, writes };
}

// ============================
// UNIFIED AGENT CARD — Ferrero-inspired
// ============================
function UnifiedCard({
  agent,
  isExecutive,
  onClick,
  isSelected,
  isActive,
  isMissionMode,
}: {
  agent: Agent;
  isExecutive?: boolean;
  onClick: (id: string) => void;
  isSelected: boolean;
  isActive?: boolean;
  isMissionMode?: boolean;
}) {
  const conns = useMemo(() => getConnectionSummary(agent.id), [agent.id]);
  const dbAccess = useMemo(() => getDbSummary(agent.id), [agent.id]);

  const levelStyles = {
    executive: 'border-2 border-ufc-red/40 bg-gradient-to-br from-dark-card via-dark-card to-red-950/30',
    director: 'border border-ufc-red/20 bg-gradient-to-br from-dark-card to-dark-cardHover',
    agent: 'border border-dark-border/50 bg-dark-card',
  };

  const missionStyles = isMissionMode
    ? isActive
      ? 'mission-active-agent scale-[1.02] ring-2 ring-ufc-red/60 opacity-100 z-10 relative'
      : 'opacity-40 grayscale-[30%] hover:opacity-60'
    : 'hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20';

  const sizeStyles = isExecutive
    ? 'w-[280px]'
    : agent.level === 'director'
    ? 'w-[240px]'
    : 'w-[210px]';

  return (
    <div
      data-agent-id={agent.id}
      onClick={() => onClick(agent.id)}
      className={`unified-card ${sizeStyles} rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 ${levelStyles[agent.level]} ${
        isSelected ? 'ring-2 ring-ufc-red shadow-lg shadow-ufc-red/20' : ''
      } ${missionStyles}`}
    >
      {/* Top section: Avatar + Identity */}
      <div className="p-4 pb-2 text-center">
        {/* Avatar */}
        <div className="mx-auto mb-3">
          {agent.avatarUrl ? (
            <div className={`${isExecutive ? 'w-20 h-20' : agent.level === 'director' ? 'w-16 h-16' : 'w-14 h-14'} mx-auto rounded-2xl overflow-hidden ring-2 bg-white ${isActive && isMissionMode ? 'ring-green-500/60' : 'ring-dark-border/30'}`}>
              <Image
                src={agent.avatarUrl}
                alt={agent.humanName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`${isExecutive ? 'w-20 h-20' : agent.level === 'director' ? 'w-16 h-16' : 'w-14 h-14'} mx-auto flex items-center justify-center rounded-2xl neu-inset ring-2 ${isActive && isMissionMode ? 'ring-green-500/60' : 'ring-dark-border/30'}`}
              style={{ color: agent.color }}
            >
              <AgentIcon name={agent.icon} className={isExecutive ? 'w-8 h-8' : agent.level === 'director' ? 'w-7 h-7' : 'w-6 h-6'} />
            </div>
          )}
        </div>

        {/* Name + Role */}
        <h3 className={`text-dark-text font-bold leading-tight ${isExecutive ? 'text-base' : 'text-sm'}`}>
          {agent.humanName}
        </h3>
        <p className="text-dark-textMuted text-[11px] mt-0.5 leading-snug">
          {agent.codename}
        </p>
        <p className="text-dark-textMuted text-[10px] mt-0.5 leading-snug opacity-70">
          {agent.role}
        </p>

        {/* Mission active badge */}
        {isMissionMode && isActive && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-ufc-red/15 text-ufc-red">
            <span className="w-1.5 h-1.5 rounded-full bg-ufc-red animate-pulse shadow-[0_0_6px_rgba(210,10,10,0.6)]" />
            ⚡ Executando...
          </div>
        )}
      </div>

      {/* Badges row */}
      <div className="px-3 pb-2 flex items-center justify-center gap-2 flex-wrap">
        {!isMissionMode && <StatusBadge status={agent.status} />}
        <ModelBadge modelId={agent.model} />
      </div>

      {/* Consolidated data strip */}
      <div className="px-3 pb-2">
        <div className="flex items-center justify-center gap-3 text-[10px] text-dark-textMuted">
          {/* Connections */}
          <span className="inline-flex items-center gap-0.5" title={`${conns.outgoing} saida, ${conns.incoming} entrada`}>
            <ArrowUp className="w-3 h-3 text-blue-400" />
            {conns.outgoing}
            <ArrowDown className="w-3 h-3 text-green-400 ml-0.5" />
            {conns.incoming}
          </span>

          <span className="text-dark-border">|</span>

          {/* DB access */}
          <span className="inline-flex items-center gap-0.5" title={`${dbAccess.reads} leitura, ${dbAccess.writes} escrita`}>
            <Database className="w-3 h-3 text-cyan-400" />
            <span className="text-blue-300">{dbAccess.reads}R</span>
            <span className="text-green-300">{dbAccess.writes}W</span>
          </span>

          <span className="text-dark-border">|</span>

          {/* Tasks */}
          <span title={`${agent._count?.tasks ?? agent.tasksCompleted} tarefas`}>
            {(agent._count?.tasks ?? agent.tasksCompleted) > 0 ? (agent._count?.tasks ?? agent.tasksCompleted).toLocaleString() : '0'} tasks
          </span>
        </div>
      </div>

      {/* Footer: last run + XP */}
      <div className="px-3 pb-3 space-y-1.5">
        {/* XP Bar */}
        <div>
          <div className="flex items-center justify-between text-[9px] mb-0.5">
            <span className="text-dark-textMuted">
              L{agent.agentLevel} {agent.levelTitle}
            </span>
            <span className="text-dark-textMuted/60">
              {agent.agentLevel >= 4 ? 'MAX' : `${agent.xp}/${agent.xpToNextLevel}`}
            </span>
          </div>
          <div className="h-1 bg-dark-bg rounded-full overflow-hidden neu-inset">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(() => {
                const lvl = agent.agentLevel;
                if (lvl >= 4) return 100;
                const thresholds: Record<number, [number, number]> = { 1: [0, 100], 2: [100, 500], 3: [500, 2000] };
                const [start, end] = thresholds[lvl] || [0, 100];
                const range = end - start;
                return Math.min(100, Math.max(0, ((agent.xp - start) / (range || 1)) * 100));
              })()}%` }}
            />
          </div>
        </div>

        {/* Last run */}
        {agent.lastRunAt && (
          <p className="text-center text-[9px] text-dark-textMuted/60">
            {formatLastRun(agent.lastRunAt)}
          </p>
        )}
      </div>

      {/* Warnings / Approvals */}
      {(agent.warnings > 0 || (agent._count && agent._count.approvals > 0)) && (
        <div className="px-3 pb-3 space-y-1">
          {agent._count && agent._count.approvals > 0 && (
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-orange-400 bg-orange-500/10 rounded-lg px-2.5 py-1">
              <AlertTriangle className="w-3 h-3" />
              {agent._count.approvals} pendente{agent._count.approvals > 1 ? 's' : ''}
            </div>
          )}
          {agent.warnings > 0 && (
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 rounded-lg px-2.5 py-1">
              <AlertTriangle className="w-3 h-3" />
              {agent.warnings} warning{agent.warnings > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================
// SVG HIERARCHY LINES
// ============================
function HierarchyLines({ lines, isMissionMode, activeSet }: { lines: HierarchyLine[]; isMissionMode: boolean; activeSet: Set<string> }) {
  if (lines.length === 0) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <marker id="arrow-red" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="rgba(239,68,68,0.4)" />
        </marker>
        <marker id="arrow-glow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="rgba(239,68,68,0.8)" />
        </marker>
      </defs>
      {lines.map((line, i) => {
        const isLineActive = isMissionMode && activeSet.has(line.fromId) && activeSet.has(line.toId);
        const isDimmed = isMissionMode && !isLineActive;

        // Draw a smooth path: go down from source, then across, then down to target
        const midY = (line.y1 + line.y2) / 2;
        const path = `M ${line.x1} ${line.y1} C ${line.x1} ${midY}, ${line.x2} ${midY}, ${line.x2} ${line.y2}`;

        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={isLineActive ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={isLineActive ? 2.5 : 1.5}
            strokeDasharray={isDimmed ? '4 4' : 'none'}
            className={`transition-all duration-500 ${isLineActive ? 'animate-pulse' : ''}`}
            opacity={isDimmed ? 0.3 : 1}
            markerEnd={isLineActive ? 'url(#arrow-glow)' : 'url(#arrow-red)'}
          />
        );
      })}
    </svg>
  );
}

// ============================
// MAIN UNIFIED VIEW
// ============================
export function UnifiedOrgView({
  agents,
  selectedAgent,
  onSelect,
  activeAgentIds = [],
  processing = false,
}: UnifiedOrgViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<HierarchyLine[]>([]);
  const isMissionMode = processing || activeAgentIds.length > 0;
  const activeSet = new Set(activeAgentIds);

  // Build hierarchy rows
  const executives = useMemo(() => {
    const ceo = agents.ceo;
    const cso = agents.cso;
    return [ceo, cso].filter(Boolean);
  }, [agents]);

  const directors = useMemo(() => {
    return [agents['content-dir'], agents['analytics-dir'], agents['ops-dir']].filter(Boolean);
  }, [agents]);

  const agentRows = useMemo(() => {
    // Group agents by their director
    const groups: Record<string, Agent[]> = {
      'content-dir': [],
      'analytics-dir': [],
      'ops-dir': [],
    };
    for (const dir of directors) {
      if (dir && dir.reports) {
        for (const agentId of dir.reports) {
          if (agents[agentId]) {
            groups[dir.id].push(agents[agentId]);
          }
        }
      }
    }
    return groups;
  }, [agents, directors]);

  // Calculate SVG lines connecting hierarchy
  const calculateLines = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newLines: HierarchyLine[] = [];

    // Helper to get center-bottom and center-top of a card
    const getCardRect = (agentId: string) => {
      const el = container.querySelector(`[data-agent-id="${agentId}"]`);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        centerX: rect.left + rect.width / 2 - containerRect.left,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        width: rect.width,
        height: rect.height,
      };
    };

    // CEO → Directors
    const ceoRect = getCardRect('ceo');
    if (ceoRect) {
      for (const dir of directors) {
        const dirRect = getCardRect(dir.id);
        if (dirRect) {
          newLines.push({
            fromId: 'ceo',
            toId: dir.id,
            x1: ceoRect.centerX,
            y1: ceoRect.bottom,
            x2: dirRect.centerX,
            y2: dirRect.top,
            type: 'delega',
          });
        }
      }
    }

    // CEO → CSO
    const csoRect = getCardRect('cso');
    if (ceoRect && csoRect) {
      newLines.push({
        fromId: 'ceo',
        toId: 'cso',
        x1: ceoRect.centerX,
        y1: ceoRect.bottom,
        x2: csoRect.centerX,
        y2: csoRect.top,
        type: 'consulta',
      });
    }

    // CSO → ops-dir (security block line)
    const opsDirRect = getCardRect('ops-dir');
    if (csoRect && opsDirRect) {
      newLines.push({
        fromId: 'cso',
        toId: 'ops-dir',
        x1: csoRect.centerX,
        y1: csoRect.bottom,
        x2: opsDirRect.centerX,
        y2: opsDirRect.top,
        type: 'bloqueia',
      });
    }

    // Directors → their agents
    for (const dir of directors) {
      const dirRect = getCardRect(dir.id);
      if (!dirRect) continue;
      for (const agentId of dir.reports) {
        const agentRect = getCardRect(agentId);
        if (agentRect) {
          newLines.push({
            fromId: dir.id,
            toId: agentId,
            x1: dirRect.centerX,
            y1: dirRect.bottom,
            x2: agentRect.centerX,
            y2: agentRect.top,
            type: 'delega',
          });
        }
      }
    }

    setLines(newLines);
  }, [directors]);

  // Recalculate lines on mount, resize, and agent changes
  useEffect(() => {
    const timer = setTimeout(calculateLines, 100);
    window.addEventListener('resize', calculateLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateLines);
    };
  }, [calculateLines, agents, selectedAgent]);

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-dark-text text-lg font-bold">UFC News Hub — Organização</h2>
          <p className="text-dark-textMuted text-sm">
            {Object.keys(agents).length} agentes · {CONNECTIONS.length} conexões · {DATABASES.length} bancos
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] text-dark-textMuted">
          <span className="inline-flex items-center gap-1">
            <ArrowUp className="w-3 h-3 text-blue-400" /> Saída
          </span>
          <span className="inline-flex items-center gap-1">
            <ArrowDown className="w-3 h-3 text-green-400" /> Entrada
          </span>
          <span className="inline-flex items-center gap-1">
            <Database className="w-3 h-3 text-cyan-400" /> DB
          </span>
        </div>
      </div>

      {/* Hierarchy Container */}
      <div ref={containerRef} className="relative">
        <HierarchyLines lines={lines} isMissionMode={isMissionMode} activeSet={activeSet} />

        {/* TIER 1: Executives (CEO + CSO) */}
        <div className="flex justify-center gap-8 mb-12 relative z-[1]">
          {executives.map((exec) => (
            <UnifiedCard
              key={exec.id}
              agent={exec}
              isExecutive
              onClick={onSelect}
              isSelected={selectedAgent === exec.id}
              isActive={activeSet.has(exec.id)}
              isMissionMode={isMissionMode}
            />
          ))}
        </div>

        {/* TIER 2: Directors */}
        <div className="flex justify-center gap-6 mb-12 relative z-[1]">
          {directors.map((dir) => (
            <UnifiedCard
              key={dir.id}
              agent={dir}
              onClick={onSelect}
              isSelected={selectedAgent === dir.id}
              isActive={activeSet.has(dir.id)}
              isMissionMode={isMissionMode}
            />
          ))}
        </div>

        {/* TIER 3: Agents — grouped under their directors */}
        <div className="grid grid-cols-3 gap-6 relative z-[1]">
          {directors.map((dir) => (
            <div key={dir.id} className="flex flex-col items-center gap-3">
              {/* Director label */}
              <div className="text-[10px] text-dark-textMuted/50 uppercase tracking-widest font-semibold mb-1">
                Equipe {dir.humanName.split(' ')[0]}
              </div>
              {agentRows[dir.id]?.map((agent) => (
                <UnifiedCard
                  key={agent.id}
                  agent={agent}
                  onClick={onSelect}
                  isSelected={selectedAgent === agent.id}
                  isActive={activeSet.has(agent.id)}
                  isMissionMode={isMissionMode}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
