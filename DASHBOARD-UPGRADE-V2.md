# UFC AI Company — Dashboard Upgrade V2
## BUGS CRÍTICOS + Sistema XP/Levels + Real-Time + Persistência

Para Claude Code: Leia INTEIRO antes de codar. Este doc resolve 3 problemas:
1. BUGS: resultados não persistem, status não muda em real-time, $2 gastos sem ver nada
2. FEATURES: sistema de XP, promoção, rebaixamento, contratação — igual empresa real
3. UX: dashboard profissional com real-time visibility total

---

# PARTE 1: BUGS CRÍTICOS (RESOLVER PRIMEIRO)

## BUG 1: Resultados não persistem entre reloads

**Problema:** O TaskFeed mostra resultados via SSE stream mas não salva no state.
Ao recarregar a página, tudo desaparece. Gabriel gastou $2 e não consegue ver os resultados.

**Fix:** Os resultados JÁ estão sendo salvos no banco (AgentTask.output). O problema é
que o frontend não busca tasks anteriores ao carregar. Precisa de:

```typescript
// src/app/api/company/tasks/route.ts — GET endpoint
// Retorna tasks recentes do banco (não só da stream)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50');
  const status = req.nextUrl.searchParams.get('status'); // optional filter

  const tasks = await prisma.agentTask.findMany({
    where: status ? { status } : undefined,
    include: {
      agent: { select: { humanName: true, codename: true, avatar: true, model: true } },
      approval: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return NextResponse.json(tasks);
}
```

```typescript
// TaskFeed.tsx — ao montar, buscar tasks anteriores do banco
useEffect(() => {
  async function loadPreviousTasks() {
    const res = await fetch('/api/company/tasks?limit=50');
    const tasks = await res.json();
    setPreviousTasks(tasks); // mostrar tasks do banco
  }
  loadPreviousTasks();
}, []);
```

## BUG 2: Status dos agentes não muda em real-time

**Problema:** Quando um agente começa a trabalhar, ele deveria mudar de IDLE → ACTIVE
no dashboard. Quando termina, volta pra IDLE. Isso não está acontecendo.

**Fix:** O orchestrator precisa atualizar o status do agente no banco E o frontend
precisa fazer polling ou receber updates.

```typescript
// No orchestrator.ts — quando agente começa a executar:
await prisma.agent.update({
  where: { id: agentId },
  data: { status: 'active', lastRunAt: new Date() }
});

// Quando agente termina:
await prisma.agent.update({
  where: { id: agentId },
  data: { status: 'idle' } // ou 'active' se tem mais tasks
});

// Quando falha:
await prisma.agent.update({
  where: { id: agentId },
  data: { status: 'error' }
});
```

```typescript
// AdminDashboard.tsx — polling a cada 3 segundos enquanto há tasks ativas
const [agents, setAgents] = useState([]);
const [isProcessing, setIsProcessing] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    fetch('/api/company/agents')
      .then(res => res.json())
      .then(data => setAgents(data));
  }, isProcessing ? 3000 : 15000); // 3s se processando, 15s idle

  return () => clearInterval(interval);
}, [isProcessing]);
```

## BUG 3: Company Prompts não acessíveis depois

**Problema:** Gastou $2 e não sabe o que os agentes fizeram.

**Fix:** Criar endpoint GET /api/company/prompts que retorna histórico completo.

```typescript
// src/app/api/company/prompts/route.ts
export async function GET(req: NextRequest) {
  const prompts = await prisma.companyPrompt.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  return NextResponse.json(prompts);
}
```

E no dashboard, um componente "Histórico" que mostra todos os prompts anteriores com
resultados e tasks associadas.

---

# PARTE 2: REAL-TIME ACTIVITY FEED

O dashboard precisa ser como um **war room** — ver TUDO que está acontecendo.

## Activity Feed Component

Um feed lateral (ou topo) mostrando em tempo real:

```
🟢 09:32:15 — Ricardo Miura (CEO) recebeu prompt: "Escreva notícia sobre UFC 315"
🔵 09:32:18 — CEO analisando... (delegando para 3 agentes)
🟠 09:32:20 — Lucas Braga (Writer) iniciou tarefa: "Reescrever notícia UFC 315"
🟠 09:32:20 — Rafael Souza (Oracle) iniciou tarefa: "Analisar main event"
🟢 09:32:45 — Rafael Souza completou em 25s (1,247 tokens)
🟢 09:33:12 — Lucas Braga completou em 52s (2,891 tokens)
⚠️ 09:33:13 — APROVAÇÃO PENDENTE: Lucas quer publicar "Pereira nocauteia..."
✅ 09:35:00 — Gabriel APROVOU publicação
📊 09:35:01 — Custos: $0.08 (Opus: $0.05, Sonnet: $0.03)
```

### Implementação com SSE (Server-Sent Events)

```typescript
// src/app/api/company/activity/route.ts — SSE endpoint
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Poll DB a cada 2 segundos por novas activities
      const interval = setInterval(async () => {
        const recentLogs = await prisma.agentLog.findMany({
          where: { createdAt: { gt: new Date(Date.now() - 5000) } },
          include: { agent: { select: { humanName: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
        });

        for (const log of recentLogs) {
          controller.enqueue(encoder.encode(
            `data: ${JSON.stringify(log)}\n\n`
          ));
        }
      }, 2000);

      req.signal.addEventListener('abort', () => clearInterval(interval));
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

```tsx
// src/components/admin/ActivityFeed.tsx
'use client';
import { useState, useEffect, useRef } from 'react';

const EVENT_ICONS = {
  info: '🔵',
  task_start: '🟠',
  task_done: '🟢',
  task_fail: '🔴',
  approval: '⚠️',
  approved: '✅',
  rejected: '❌',
  security: '🛡️',
  ceo: '👔',
};

export function ActivityFeed() {
  const [events, setEvents] = useState([]);
  const feedRef = useRef(null);

  // Load history on mount
  useEffect(() => {
    fetch('/api/company/logs?limit=100')
      .then(res => res.json())
      .then(logs => setEvents(logs.reverse()));
  }, []);

  // SSE for real-time
  useEffect(() => {
    const eventSource = new EventSource('/api/company/activity');
    eventSource.onmessage = (e) => {
      const log = JSON.parse(e.data);
      setEvents(prev => [...prev, log].slice(-200)); // keep last 200
      feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-white text-sm font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Activity Feed — Live
        </h3>
        <span className="text-gray-500 text-xs">{events.length} eventos</span>
      </div>
      <div ref={feedRef} className="h-80 overflow-y-auto p-3 space-y-1.5">
        {events.map((evt, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className="text-gray-600 font-mono whitespace-nowrap">
              {new Date(evt.createdAt).toLocaleTimeString('pt-BR')}
            </span>
            <span>{EVENT_ICONS[evt.level] || '⚪'}</span>
            <span className="text-gray-300">
              <span className="text-white font-medium">{evt.agent?.humanName}</span>
              {' '}{evt.message}
            </span>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-500 text-center py-8">Nenhuma atividade ainda...</p>
        )}
      </div>
    </div>
  );
}
```

---

# PARTE 3: SISTEMA XP / LEVELS / PROMOÇÃO / REBAIXAMENTO

Inspirado no dashboard do amigo (@axnexlabs):

## Schema Prisma (adicionar ao Agent model)

```prisma
model Agent {
  // ... campos existentes ...

  // XP & LEVELING SYSTEM
  level         Int      @default(1)  // L1=Trainee, L2=Specialist, L3=Senior, L4=Lead
  levelTitle    String   @default("Trainee")
  xp            Int      @default(0)
  xpToNextLevel Int      @default(100)

  // PERFORMANCE TRACKING
  weeklyScore       Float    @default(0)     // 0-5, calculado semanalmente
  weeklyTaskCount   Int      @default(0)     // tasks completadas essa semana
  weeklySuccessRate Float    @default(0)     // % de tasks sem erro essa semana
  avgResponseTime   Float    @default(0)     // tempo médio de resposta em segundos
  consecutiveWeeksAboveTarget Int @default(0) // semanas seguidas com score > 3.5
  consecutiveWeeksBelowTarget Int @default(0) // semanas seguidas com score < 2.5
  warnings          Int      @default(0)     // warnings ativas

  // HISTORY
  promotedAt    DateTime?
  demotedAt     DateTime?
  hiredAt       DateTime   @default(now())
  firedAt       DateTime?  // null = empregado ativo

  // Relations
  performanceReviews PerformanceReview[]
}

model PerformanceReview {
  id            String   @id @default(cuid())
  agentId       String
  agent         Agent    @relation(fields: [agentId], references: [id])

  weekNumber    Int      // semana do ano
  year          Int

  // Metrics
  tasksCompleted    Int
  tasksFailed       Int
  avgResponseTimeMs Int
  tokensUsed        Int
  costUsd           Float
  successRate       Float
  qualityScore      Float  // 0-5, baseado em aprovações vs rejeições
  efficiencyScore   Float  // 0-5, baseado em tempo e tokens

  // Composite
  weeklyScore   Float    // 0-5, média ponderada
  xpEarned      Int

  // Actions
  action        String?  // "promoted" | "demoted" | "warning" | "employee_of_week" | null

  createdAt     DateTime @default(now())
}
```

## Level System

```
L1 — TRAINEE (0 XP)
  → Agente novo ou rebaixado
  → Limitações: max 10 tasks/dia, output revisado pelo diretor
  → Promoção: score > 3.5 por 2 semanas consecutivas + 100 XP

L2 — SPECIALIST (100 XP)
  → Agente comprovado
  → Pode executar tasks sem review do diretor (mas ações ainda precisam aprovação humana)
  → Promoção: score > 4.0 por 3 semanas consecutivas + 500 XP

L3 — SENIOR (500 XP)
  → Agente de alto desempenho
  → Pode receber delegações diretas do CEO (bypass do diretor em emergências)
  → Promoção: score > 4.5 por 4 semanas consecutivas + 2000 XP

L4 — LEAD (2000 XP)
  → Top performer
  → Pode sugerir contratação de novos agentes ao CEO
  → Pode mentorear L1/L2 da mesma diretoria
  → É candidato a substituir Diretor se necessário
```

## XP Calculation

```typescript
// src/lib/ai-company/xp-engine.ts

function calculateTaskXP(task: AgentTask, agent: Agent): number {
  let xp = 0;

  // Base XP por completar task
  if (task.status === 'completed') {
    xp += 10;

    // Bonus por velocidade (se completou mais rápido que média)
    if (task.durationMs && task.durationMs < agent.avgResponseTime * 0.8) {
      xp += 5; // speed bonus
    }

    // Bonus por eficiência de tokens (menos tokens = melhor)
    const totalTokens = (task.tokensInput || 0) + (task.tokensOutput || 0);
    if (totalTokens < 1000) xp += 3;  // lean response

    // Bonus se task foi aprovada pelo humano (alta qualidade)
    if (task.approval?.status === 'approved') {
      xp += 15; // approval bonus — human liked it
    }
  }

  // Penalidade por falha
  if (task.status === 'failed') {
    xp -= 5;
  }

  // Penalidade se output foi rejeitado pelo humano
  if (task.approval?.status === 'rejected') {
    xp -= 10;
  }

  return xp;
}
```

## Weekly Score Calculation

```typescript
// Roda todo domingo à meia-noite (cron job ou scheduled task)

async function calculateWeeklyScores() {
  const agents = await prisma.agent.findMany();
  const weekStart = getWeekStart(); // início da semana

  for (const agent of agents) {
    const tasks = await prisma.agentTask.findMany({
      where: {
        agentId: agent.id,
        createdAt: { gte: weekStart },
      },
      include: { approval: true },
    });

    const completed = tasks.filter(t => t.status === 'completed');
    const failed = tasks.filter(t => t.status === 'failed');
    const approved = tasks.filter(t => t.approval?.status === 'approved');
    const rejected = tasks.filter(t => t.approval?.status === 'rejected');

    // Success Rate (0-5)
    const successRate = tasks.length > 0
      ? (completed.length / tasks.length) * 5
      : 0;

    // Quality Score (0-5) — baseado em aprovações
    const qualityScore = (approved.length + rejected.length) > 0
      ? (approved.length / (approved.length + rejected.length)) * 5
      : 3; // default se não teve aprovações

    // Efficiency Score (0-5) — baseado em velocidade
    const avgTime = completed.reduce((sum, t) => sum + (t.durationMs || 0), 0)
      / (completed.length || 1);
    const efficiencyScore = Math.min(5, Math.max(0,
      5 - (avgTime / 60000) // penaliza se demora mais de 1 min em média
    ));

    // Weekly Score (média ponderada)
    const weeklyScore = (
      successRate * 0.4 +     // 40% — completou as tasks?
      qualityScore * 0.35 +   // 35% — humano aprovou?
      efficiencyScore * 0.25  // 25% — foi rápido e eficiente?
    );

    // XP earned this week
    const xpEarned = tasks.reduce((sum, t) => sum + calculateTaskXP(t, agent), 0);

    // Check promotion/demotion
    let action = null;

    if (weeklyScore >= 3.5) {
      const newConsecutive = agent.consecutiveWeeksAboveTarget + 1;
      await prisma.agent.update({
        where: { id: agent.id },
        data: {
          consecutiveWeeksAboveTarget: newConsecutive,
          consecutiveWeeksBelowTarget: 0,
          warnings: 0, // reset warnings se está indo bem
        }
      });

      // Check promotion thresholds
      if (agent.level === 1 && newConsecutive >= 2 && agent.xp + xpEarned >= 100) {
        action = 'promoted';
        await promoteAgent(agent.id);
      } else if (agent.level === 2 && weeklyScore >= 4.0 && newConsecutive >= 3 && agent.xp + xpEarned >= 500) {
        action = 'promoted';
        await promoteAgent(agent.id);
      } else if (agent.level === 3 && weeklyScore >= 4.5 && newConsecutive >= 4 && agent.xp + xpEarned >= 2000) {
        action = 'promoted';
        await promoteAgent(agent.id);
      }
    } else if (weeklyScore < 2.5) {
      const newConsecutive = agent.consecutiveWeeksBelowTarget + 1;
      await prisma.agent.update({
        where: { id: agent.id },
        data: {
          consecutiveWeeksBelowTarget: newConsecutive,
          consecutiveWeeksAboveTarget: 0,
        }
      });

      if (newConsecutive === 1) {
        action = 'warning';
        await prisma.agent.update({
          where: { id: agent.id },
          data: { warnings: { increment: 1 } }
        });
      } else if (newConsecutive >= 2 && agent.level > 1) {
        action = 'demoted';
        await demoteAgent(agent.id);
      }
      // NUNCA demissão automática — só manual pelo admin
    }

    // Save weekly XP
    await prisma.agent.update({
      where: { id: agent.id },
      data: {
        xp: { increment: Math.max(0, xpEarned) },
        weeklyScore,
        weeklyTaskCount: tasks.length,
        weeklySuccessRate: tasks.length > 0 ? completed.length / tasks.length : 0,
      }
    });

    // Save performance review
    await prisma.performanceReview.create({
      data: {
        agentId: agent.id,
        weekNumber: getWeekNumber(),
        year: new Date().getFullYear(),
        tasksCompleted: completed.length,
        tasksFailed: failed.length,
        avgResponseTimeMs: avgTime,
        tokensUsed: tasks.reduce((s, t) => s + (t.tokensInput || 0) + (t.tokensOutput || 0), 0),
        costUsd: calculateCost(tasks),
        successRate: successRate / 5,
        qualityScore: qualityScore / 5,
        efficiencyScore: efficiencyScore / 5,
        weeklyScore,
        xpEarned: Math.max(0, xpEarned),
        action,
      }
    });
  }

  // Employee of the Week — highest score
  await electEmployeeOfTheWeek();
}
```

## Promotion / Demotion Functions

```typescript
const LEVELS = {
  1: { title: 'Trainee', xpRequired: 0, maxTasksPerDay: 10 },
  2: { title: 'Specialist', xpRequired: 100, maxTasksPerDay: 25 },
  3: { title: 'Senior', xpRequired: 500, maxTasksPerDay: 50 },
  4: { title: 'Lead', xpRequired: 2000, maxTasksPerDay: 100 },
};

async function promoteAgent(agentId: string) {
  const agent = await prisma.agent.findUnique({ where: { id: agentId } });
  if (!agent || agent.level >= 4) return;

  const newLevel = agent.level + 1;
  await prisma.agent.update({
    where: { id: agentId },
    data: {
      level: newLevel,
      levelTitle: LEVELS[newLevel].title,
      promotedAt: new Date(),
      consecutiveWeeksAboveTarget: 0, // reset
    }
  });

  // Log the promotion
  await prisma.agentLog.create({
    data: {
      agentId,
      level: 'info',
      message: `PROMOVIDO para ${LEVELS[newLevel].title} (L${newLevel})! 🎉`,
      metadata: JSON.stringify({ from: agent.level, to: newLevel }),
    }
  });
}

async function demoteAgent(agentId: string) {
  const agent = await prisma.agent.findUnique({ where: { id: agentId } });
  if (!agent || agent.level <= 1) return;

  const newLevel = agent.level - 1;
  await prisma.agent.update({
    where: { id: agentId },
    data: {
      level: newLevel,
      levelTitle: LEVELS[newLevel].title,
      demotedAt: new Date(),
      consecutiveWeeksBelowTarget: 0, // reset
    }
  });

  await prisma.agentLog.create({
    data: {
      agentId,
      level: 'warn',
      message: `REBAIXADO para ${LEVELS[newLevel].title} (L${newLevel}) por baixa performance.`,
      metadata: JSON.stringify({ from: agent.level, to: newLevel }),
    }
  });
}
```

## Auto-Governance (CEO Daily Brief)

```typescript
// Roda todo dia às 8:00 (cron ou scheduled)

async function ceoDailyBrief() {
  // CEO gera um briefing automático analisando o estado da empresa
  const agents = await prisma.agent.findMany({ include: { _count: { select: { tasks: true } } } });
  const yesterdayTasks = await prisma.agentTask.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 86400000) } },
  });
  const pendingApprovals = await prisma.approval.findMany({
    where: { status: 'pending' },
  });

  // CEO analisa com Opus
  const briefing = await generateText({
    model: anthropic('claude-opus-4-6-20251101'),
    system: CEO_SYSTEM_PROMPT,
    prompt: `
DAILY BRIEFING — ${new Date().toLocaleDateString('pt-BR')}

AGENTS STATUS:
${agents.map(a => `- ${a.humanName} (L${a.level}/${a.levelTitle}): ${a.status}, score: ${a.weeklyScore.toFixed(1)}, XP: ${a.xp}`).join('\n')}

YESTERDAY:
- Tasks completadas: ${yesterdayTasks.filter(t => t.status === 'completed').length}
- Tasks falharam: ${yesterdayTasks.filter(t => t.status === 'failed').length}
- Aprovações pendentes: ${pendingApprovals.length}

Gere um briefing executivo com:
1. Estado geral da empresa (1 frase)
2. Top performers de ontem
3. Problemas detectados
4. Prioridades para hoje
5. Recomendações
`,
    temperature: 0.3,
  });

  // Salvar briefing
  await prisma.agentLog.create({
    data: {
      agentId: 'ceo',
      level: 'info',
      message: `DAILY BRIEF: ${briefing.text}`,
    }
  });
}
```

## Hiring System

```typescript
// API endpoint para contratar novo agente
// POST /api/company/agents/hire

export async function POST(req: NextRequest) {
  const { humanName, codename, role, title, model, systemPrompt, level, reportsTo } = await req.json();

  // Só admin pode contratar
  const newAgent = await prisma.agent.create({
    data: {
      id: codename.toLowerCase().replace(/\s/g, '-'),
      humanName,
      codename,
      role,
      title,
      model,
      systemPrompt,
      level: 'agent',
      status: 'idle',
      avatar: '🆕',
      color: '#6B7280',
      // XP System
      agentLevel: 1,
      levelTitle: 'Trainee',
      xp: 0,
      xpToNextLevel: 100,
      hiredAt: new Date(),
    }
  });

  await prisma.agentLog.create({
    data: {
      agentId: newAgent.id,
      level: 'info',
      message: `CONTRATADO como ${role} (Trainee). Bem-vindo à UFC AI Company! 🎉`,
    }
  });

  return NextResponse.json(newAgent);
}
```

---

# PARTE 4: DASHBOARD UI UPGRADES

## Agent Card com XP Bar

Cada AgentCard agora mostra:

```tsx
// Dentro do AgentCard existente, adicionar:

{/* XP Bar */}
<div className="mt-2">
  <div className="flex items-center justify-between text-[10px] mb-1">
    <span className="text-gray-400">
      L{agent.level} {agent.levelTitle}
    </span>
    <span className="text-gray-500">{agent.xp}/{agent.xpToNextLevel} XP</span>
  </div>
  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
      style={{ width: `${Math.min(100, (agent.xp / agent.xpToNextLevel) * 100)}%` }}
    />
  </div>
</div>

{/* Weekly Score */}
<div className="mt-2 flex items-center gap-2">
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(star => (
      <span key={star} className={`text-xs ${
        star <= Math.round(agent.weeklyScore)
          ? 'text-yellow-400'
          : 'text-gray-700'
      }`}>★</span>
    ))}
  </div>
  <span className="text-gray-500 text-[10px]">{agent.weeklyScore.toFixed(1)}/5.0</span>
</div>
```

## Cost Tracker (quanto está gastando)

```tsx
// src/components/admin/CostTracker.tsx
// Mostra custo por agente e total

export function CostTracker() {
  const [costs, setCosts] = useState(null);

  useEffect(() => {
    fetch('/api/company/costs').then(r => r.json()).then(setCosts);
  }, []);

  // Model pricing (per 1M tokens)
  // Opus 4.6: $15 input, $75 output
  // Sonnet 4.5: $3 input, $15 output
  // Haiku 4.5: $0.80 input, $4 output

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h3 className="text-white text-sm font-bold mb-3">Custos (últimas 24h)</h3>
      {/* ... render costs per agent and total */}
    </div>
  );
}
```

## Nova View: "Performance" (4ª tab)

Adicionar uma 4ª view no dashboard:

```
[Organograma] [Teia de Aranha] [Memória Compartilhada] [Performance]
```

Performance view mostra:
- Ranking dos agentes por weekly score
- Employee of the Week com destaque
- Gráfico de XP ao longo do tempo
- Custo por agente
- Promoções e rebaixamentos recentes

---

# PARTE 5: UPDATED PRISMA MIGRATION

```bash
# Rodar no terminal:
npx prisma migrate dev --name add-xp-leveling-system
```

Campos novos no Agent model:
- level: Int (1-4)
- levelTitle: String
- xp: Int
- xpToNextLevel: Int
- weeklyScore: Float
- weeklyTaskCount: Int
- weeklySuccessRate: Float
- avgResponseTime: Float
- consecutiveWeeksAboveTarget: Int
- consecutiveWeeksBelowTarget: Int
- warnings: Int
- promotedAt: DateTime?
- demotedAt: DateTime?
- hiredAt: DateTime
- firedAt: DateTime?

Nova tabela: PerformanceReview

---

# ORDEM DE IMPLEMENTAÇÃO

## Sprint 1: BUGS (URGENTE — fazer primeiro)
1. GET /api/company/tasks — retornar tasks do banco
2. GET /api/company/prompts — histórico de prompts
3. TaskFeed carrega tasks anteriores ao montar
4. Orchestrator atualiza status dos agentes (IDLE ↔ ACTIVE ↔ ERROR)
5. Dashboard faz polling de agents a cada 3s enquanto processando
6. Testar: mandar prompt, recarregar página, resultados ainda visíveis

## Sprint 2: REAL-TIME ACTIVITY FEED
1. Adicionar logs no orchestrator (cada passo = um log)
2. GET /api/company/logs — histórico
3. SSE /api/company/activity — stream real-time
4. ActivityFeed component com auto-scroll
5. Testar: mandar prompt, ver feed atualizar em tempo real

## Sprint 3: XP / LEVELING SYSTEM
1. Prisma migration (novos campos + PerformanceReview table)
2. Seed dos agents com level=1, xp=0 (todos começam como Trainee)
3. XP engine (calcular XP por task)
4. AgentCard com XP bar e weekly score
5. Level up/down logic
6. Testar: completar tasks, ver XP subir, atingir promoção

## Sprint 4: AUTO-GOVERNANCE
1. CEO Daily Brief (cron)
2. Weekly Performance Review (cron)
3. Employee of the Week
4. Hire endpoint
5. Performance view no dashboard
6. Cost tracker

---

# COMANDO PARA CLAUDE CODE

> "Leia `docs/DASHBOARD-UPGRADE-V2.md`. Implemente Sprint 1 (BUGS) primeiro:
> 1. GET /api/company/tasks retornando tasks do banco
> 2. GET /api/company/prompts retornando histórico
> 3. TaskFeed carregando tasks anteriores ao montar (não só stream)
> 4. Orchestrator atualizando agent.status (idle→active→idle/error) no banco
> 5. Dashboard polling agents a cada 3s enquanto processando
> 6. Testar: mandar prompt, recarregar, resultados persistem"
