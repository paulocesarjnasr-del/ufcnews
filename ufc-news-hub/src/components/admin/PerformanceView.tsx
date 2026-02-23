'use client';

import { useState, useEffect } from 'react';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Award,
  Loader2,
  Star,
  Zap,
} from 'lucide-react';
import { AgentIcon } from './AgentIcon';

import { useAdminAuth } from './AdminAuthContext';
interface AgentRanking {
  id: string;
  humanName: string;
  codename: string;
  icon: string;
  color: string;
  model: string;
  agentLevel: number;
  levelTitle: string;
  xp: number;
  xpToNextLevel: number;
  weeklyScore: number;
  weeklyTaskCount: number;
  weeklySuccessRate: number;
  warnings: number;
  tasksCompleted: number;
  promotedAt: string | null;
  demotedAt: string | null;
}

interface RecentAction {
  id: string;
  action: string;
  weeklyScore: number;
  createdAt: string;
  agent: { humanName: string; codename: string };
}

interface EotwData {
  agent: { humanName: string; codename: string; icon: string; color: string };
  weeklyScore: number;
  createdAt: string;
}

interface PerformanceData {
  rankings: AgentRanking[];
  employeeOfTheWeek: EotwData | null;
  recentActions: RecentAction[];
}

export function PerformanceView() {
  const { authFetch } = useAdminAuth();
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningReview, setRunningReview] = useState(false);

  useEffect(() => {
    authFetch('/api/company/performance')
      .then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authFetch]);

  async function runWeeklyReview() {
    setRunningReview(true);
    try {
      await authFetch('/api/company/weekly-review', { method: 'POST' });
      // Refresh data
      const res = await authFetch('/api/company/performance');
      setData(await res.json());
    } finally {
      setRunningReview(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-ufc-red" />
      </div>
    );
  }

  if (!data) return null;

  const hasRankings = data.rankings && data.rankings.length > 0;

  return (
    <div className="space-y-6">
      {/* Header + Run Review Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-dark-text text-lg font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Performance
        </h2>
        <button
          onClick={runWeeklyReview}
          disabled={runningReview}
          className="neu-button px-4 py-2 text-xs font-semibold text-dark-textMuted hover:text-ufc-red transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {runningReview ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Star className="w-3 h-3" />
          )}
          Rodar Review Semanal
        </button>
      </div>

      {/* Empty state */}
      {!hasRankings && !data.employeeOfTheWeek && data.recentActions.length === 0 && (
        <div className="neu-card p-8 text-center space-y-4">
          <Trophy className="w-12 h-12 text-dark-textMuted/30 mx-auto" />
          <p className="text-dark-text text-sm font-medium">🏆 Sem dados de performance</p>
          <p className="text-dark-textMuted text-xs">
            Execute a revisão semanal para gerar o ranking dos agentes.
          </p>
          <button
            onClick={runWeeklyReview}
            disabled={runningReview}
            className="neu-button px-4 py-2 text-ufc-red text-sm font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            {runningReview ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Star className="w-4 h-4" />
            )}
            Rodar Review Semanal
          </button>
        </div>
      )}

      {/* Employee of the Week */}
      {data.employeeOfTheWeek && (
        <div className="neu-card p-4 border border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl neu-inset flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                Funcionario da Semana
              </p>
              <p className="text-dark-text text-base font-bold flex items-center gap-2">
                <span style={{ color: data.employeeOfTheWeek.agent.color }}>
                  <AgentIcon name={data.employeeOfTheWeek.agent.icon} className="w-4 h-4" />
                </span>
                {data.employeeOfTheWeek.agent.humanName}
              </p>
              <p className="text-dark-textMuted text-xs">
                Score: {data.employeeOfTheWeek.weeklyScore.toFixed(1)}/5.0
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rankings */}
      <div className="neu-card p-4">
        <h3 className="text-dark-text text-sm font-bold mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-400" />
          Ranking Semanal
        </h3>
        <div className="space-y-2">
          {data.rankings.map((agent, i) => (
            <div
              key={agent.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                i === 0
                  ? 'bg-yellow-500/5 border border-yellow-500/20'
                  : i === 1
                    ? 'bg-gray-400/5 border border-gray-400/20'
                    : i === 2
                      ? 'bg-orange-600/5 border border-orange-600/20'
                      : 'hover:bg-dark-cardHover/30'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : i === 1
                      ? 'bg-gray-400/20 text-gray-400'
                      : i === 2
                        ? 'bg-orange-600/20 text-orange-400'
                        : 'bg-dark-bg text-dark-textMuted'
                }`}
              >
                {i + 1}
              </span>

              <span style={{ color: agent.color }} className="shrink-0">
                <AgentIcon name={agent.icon} className="w-4 h-4" />
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-dark-text text-xs font-bold truncate">{agent.humanName}</p>
                <p className="text-dark-textMuted text-[10px]">
                  L{agent.agentLevel} {agent.levelTitle} · {agent.xp} XP
                </p>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 shrink-0">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${
                      s <= Math.round(agent.weeklyScore) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-border'
                    }`}
                  />
                ))}
              </div>

              <span className="text-dark-textMuted text-[10px] shrink-0">
                {agent.weeklyScore.toFixed(1)}
              </span>

              <span className="text-dark-textMuted text-[10px] shrink-0 flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5" />
                {agent.weeklyTaskCount}
              </span>

              {agent.warnings > 0 && (
                <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Actions */}
      {data.recentActions.length > 0 && (
        <div className="neu-card p-4">
          <h3 className="text-dark-text text-sm font-bold mb-3">Acoes Recentes</h3>
          <div className="space-y-1.5">
            {data.recentActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center gap-2 text-xs px-2 py-1.5 rounded-lg hover:bg-dark-cardHover/30"
              >
                {action.action === 'promoted' ? (
                  <TrendingUp className="w-3.5 h-3.5 text-green-400 shrink-0" />
                ) : action.action === 'demoted' ? (
                  <TrendingDown className="w-3.5 h-3.5 text-red-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                )}
                <span className="text-dark-text font-medium">{action.agent.humanName}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    action.action === 'promoted'
                      ? 'bg-green-500/10 text-green-400'
                      : action.action === 'demoted'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                  }`}
                >
                  {action.action}
                </span>
                <span className="text-dark-textMuted text-[10px] ml-auto">
                  Score: {action.weeklyScore.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
