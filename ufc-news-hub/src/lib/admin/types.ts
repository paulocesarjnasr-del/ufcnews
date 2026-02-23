export type AgentModel = 'opus-4.6' | 'sonnet-4.5' | 'haiku-4.5';
export type AgentStatus = 'active' | 'idle' | 'warning' | 'error' | 'offline';
export type AgentLevel = 'executive' | 'director' | 'agent';
export type ConnectionType = 'delega' | 'reporta' | 'alimenta' | 'alerta' | 'bloqueia' | 'feedback' | 'consulta';

export interface ModelConfig {
  name: string;
  tag: string;
  textColor: string;
  bg: string;
  border: string;
  desc: string;
}

export interface Agent {
  id: string;
  humanName: string;
  codename: string;  // DB field name (was "name" in original)
  role: string;
  title: string;
  model: AgentModel;
  modelReason: string;
  systemPrompt: string;
  desc: string;
  status: AgentStatus;
  level: AgentLevel;
  icon: string;
  color: string;
  avatarUrl?: string | null;

  // Hierarchy
  reportsTo?: string | null;
  reports: string[];

  // Stats (from DB)
  tasksCompleted: number;
  lastRunAt?: string | null; // ISO date string from DB

  // Computed on frontend
  lastRun?: string; // Human-readable "2 min atras"

  // XP & Leveling
  agentLevel: number;
  levelTitle: string;
  xp: number;
  xpToNextLevel: number;

  // Performance
  weeklyScore: number;
  weeklyTaskCount: number;
  weeklySuccessRate: number;
  avgResponseTime: number;
  consecutiveWeeksAboveTarget: number;
  consecutiveWeeksBelowTarget: number;
  warnings: number;

  // History
  promotedAt?: string | null;
  demotedAt?: string | null;
  hiredAt?: string | null;
  firedAt?: string | null;

  // Counts from DB relations
  _count?: {
    tasks: number;
    logs: number;
    approvals: number;
  };
}

export interface Connection {
  from: string;
  to: string;
  type: ConnectionType;
  label: string;
}

export interface SharedDatabase {
  id: string;
  name: string;
  desc: string;
  icon: string;
  readers: string[];
  writers: string[];
}

export interface StatusConfig {
  label: string;
  dot: string;
  bg: string;
  text: string;
  pulse: boolean;
}

export interface ConnectionStyle {
  color: string;
  bg: string;
  icon: string;
  label: string;
}
