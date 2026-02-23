# UFC AI Company — Guia de Implementação Completo

## Para Claude Code: Leia este arquivo INTEIRO antes de começar a codar.

---

## STACK RECOMENDADA

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| **Frontend** | Next.js 15 App Router + React 19 + Tailwind | Já existe no projeto |
| **Agent Orchestration** | **Vercel AI SDK 5.0** + `@ai-sdk/anthropic` | Nativo Next.js, streaming, tool calling, UI hooks |
| **Human-in-the-Loop** | **LangGraph.js** via `@ai-sdk/langchain` adapter | Melhor para workflows com aprovação humana, state machines |
| **LLM Provider** | Claude API (Opus 4.6, Sonnet 4.5, Haiku 4.5) | Já configurado no .env |
| **Database** | PostgreSQL + Prisma | Já existe no projeto |
| **Real-time** | Server-Sent Events (SSE) via Vercel AI SDK | Streaming nativo |
| **Queue** | PostgreSQL-based (tabela `task_queue`) | Simples, sem infra extra |

### Instalar dependências:
```bash
npm install ai @ai-sdk/anthropic @langchain/langgraph @ai-sdk/langchain
```

---

## ARQUITETURA DO SISTEMA

```
┌─────────────────────────────────────────────────────┐
│                    /admin (Frontend)                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Prompt   │  │ Task Feed    │  │ Approval      │  │
│  │ Input    │  │ (real-time)  │  │ Queue         │  │
│  └────┬─────┘  └──────▲───────┘  └───────▲───────┘  │
│       │               │                  │           │
├───────┼───────────────┼──────────────────┼───────────┤
│       ▼               │                  │           │
│  POST /api/company/prompt                │           │
│       │                                  │           │
│       ▼                                  │           │
│  ┌─────────────────────┐                 │           │
│  │ Ricardo Miura (CEO) │ ← Opus 4.6     │           │
│  │ Analisa + Distribui │                 │           │
│  └────┬────┬────┬──────┘                 │           │
│       │    │    │                        │           │
│       ▼    ▼    ▼                        │           │
│  ┌────────────────────┐                  │           │
│  │ Agente(s) executam  │                 │           │
│  │ tool calls          │                 │           │
│  └────────┬────────────┘                 │           │
│           │                              │           │
│           ▼                              │           │
│  ┌────────────────────┐                  │           │
│  │ Ação requer         │── SIM ─────────►│           │
│  │ aprovação?          │                 │           │
│  └────────┬────────────┘                 │           │
│           │ NÃO                          │           │
│           ▼                              │           │
│  ┌────────────────────┐                  │           │
│  │ Executa + salva     │                 │           │
│  │ resultado no DB     │                 │           │
│  └─────────────────────┘                 │           │
└──────────────────────────────────────────────────────┘
```

---

## DATABASE SCHEMA (Prisma)

Adicionar ao `schema.prisma` existente:

```prisma
// ═══════════════════════════════════════
// AI COMPANY MODELS
// ═══════════════════════════════════════

model Agent {
  id            String   @id // "ceo", "cso", "news-writer", etc.
  humanName     String
  codename      String
  role          String
  title         String
  model         String   // "opus-4.6", "sonnet-4.5", "haiku-4.5"
  systemPrompt  String   @db.Text
  status        String   @default("active") // active, idle, warning, error, offline
  level         String   // executive, director, agent
  avatar        String
  color         String

  // Stats (calculados de verdade)
  tasksCompleted Int      @default(0)
  lastRunAt     DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  tasks         AgentTask[]
  logs          AgentLog[]
  approvals     Approval[]  @relation("agent_approvals")
}

model AgentTask {
  id            String   @id @default(cuid())
  agentId       String
  agent         Agent    @relation(fields: [agentId], references: [id])

  // Task info
  type          String   // "prompt_response", "scheduled", "delegated", "tool_call"
  input         String   @db.Text
  output        String?  @db.Text
  status        String   @default("pending") // pending, running, completed, failed, awaiting_approval

  // CEO delegation tracking
  parentTaskId  String?  // Se foi delegado por outro agente
  parentTask    AgentTask? @relation("subtasks", fields: [parentTaskId], references: [id])
  subtasks      AgentTask[] @relation("subtasks")

  // Metadata
  modelUsed     String?
  tokensInput   Int?
  tokensOutput  Int?
  durationMs    Int?
  error         String?  @db.Text

  createdAt     DateTime @default(now())
  completedAt   DateTime?

  // Approval
  approval      Approval?
}

model Approval {
  id            String   @id @default(cuid())
  taskId        String   @unique
  task          AgentTask @relation(fields: [taskId], references: [id])
  agentId       String
  agent         Agent    @relation("agent_approvals", fields: [agentId], references: [id])

  // What needs approval
  actionType    String   // "publish_article", "moderate_comment", "run_scraper", "send_notification"
  description   String   @db.Text
  payload       String   @db.Text // JSON with the actual data to execute

  // Approval state
  status        String   @default("pending") // pending, approved, rejected
  reviewedBy    String?  // "gabriel" or "socio"
  reviewedAt    DateTime?
  reviewNote    String?

  createdAt     DateTime @default(now())
}

model AgentLog {
  id            String   @id @default(cuid())
  agentId       String
  agent         Agent    @relation(fields: [agentId], references: [id])

  level         String   // "info", "warn", "error", "security"
  message       String   @db.Text
  metadata      String?  @db.Text // JSON extra data

  createdAt     DateTime @default(now())
}

model CompanyPrompt {
  id            String   @id @default(cuid())
  userId        String   // quem mandou o prompt (gabriel, socio)
  prompt        String   @db.Text

  // CEO response
  ceoAnalysis   String?  @db.Text // JSON com a análise do CEO
  status        String   @default("processing") // processing, delegated, completed, failed

  // Results
  tasks         String[] // IDs das tasks criadas
  summary       String?  @db.Text // Resumo final do CEO

  createdAt     DateTime @default(now())
  completedAt   DateTime?
}
```

---

## FOLDER STRUCTURE

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              ← Dashboard principal (adaptar o JSX mockup)
│   │   ├── layout.tsx            ← Layout do admin com auth
│   │   └── components/
│   │       ├── PromptInput.tsx   ← Campo de texto para mandar prompt pro CEO
│   │       ├── TaskFeed.tsx      ← Feed em tempo real de tasks
│   │       ├── ApprovalQueue.tsx ← Fila de aprovações pendentes
│   │       ├── AgentCard.tsx     ← Card de cada agente (do mockup)
│   │       ├── OrgChart.tsx      ← Organograma (do mockup)
│   │       ├── SpiderWeb.tsx     ← Teia de conexões (do mockup)
│   │       ├── MemoryMap.tsx     ← Mapa de memória (do mockup)
│   │       ├── DetailPanel.tsx   ← Painel de detalhe (do mockup)
│   │       └── AgentChat.tsx     ← Chat streaming com agente
│   │
│   └── api/
│       └── company/
│           ├── prompt/
│           │   └── route.ts      ← POST: Recebe prompt → CEO analisa → delega
│           ├── agents/
│           │   ├── route.ts      ← GET: Lista agents com stats reais
│           │   └── [id]/
│           │       ├── route.ts  ← GET/PATCH: Agent details
│           │       ├── run/
│           │       │   └── route.ts ← POST: Rodar agente manualmente
│           │       └── tasks/
│           │           └── route.ts ← GET: Tasks do agente
│           ├── approvals/
│           │   ├── route.ts      ← GET: Lista aprovações pendentes
│           │   └── [id]/
│           │       └── route.ts  ← PATCH: Aprovar/Rejeitar
│           ├── tasks/
│           │   └── route.ts      ← GET: Feed de tasks (SSE streaming)
│           └── logs/
│               └── route.ts      ← GET: Logs do sistema
│
├── lib/
│   └── ai-company/
│       ├── agents/
│       │   ├── index.ts          ← Registry de todos os agentes
│       │   ├── base-agent.ts     ← Classe base com Vercel AI SDK
│       │   ├── ceo.ts            ← Ricardo Miura — CEO orchestrator
│       │   ├── cso.ts            ← Helena Bastos — Security
│       │   ├── content-dir.ts    ← Marco Ventura — Content Director
│       │   ├── analytics-dir.ts  ← Sofia Nakamura — Analytics Director
│       │   ├── ops-dir.ts        ← Diego Ferreira — Ops Director
│       │   ├── news-writer.ts    ← Lucas Braga — Writer
│       │   ├── social-engager.ts ← Thiago Rocha — Social
│       │   ├── translator.ts     ← Camila Lopes — Translator
│       │   ├── fight-analyst.ts  ← Rafael Souza — Analyst
│       │   ├── stats-compiler.ts ← Beatriz Ramos — Stats
│       │   ├── trend-detector.ts ← Igor Tavares — Trends
│       │   ├── scraping-monitor.ts ← André Monteiro — Scraping
│       │   ├── content-moderator.ts ← Juliana Pires — Moderator
│       │   └── system-health.ts  ← Pedro Almeida — Health
│       │
│       ├── tools/
│       │   ├── index.ts          ← Registry de todas as tools
│       │   ├── publish-article.ts ← Tool: publicar notícia (requer aprovação)
│       │   ├── moderate-comment.ts ← Tool: moderar comentário (requer aprovação)
│       │   ├── run-scraper.ts    ← Tool: executar scraping
│       │   ├── query-database.ts ← Tool: consultar Fighters/Events/Articles DB
│       │   ├── analyze-stats.ts  ← Tool: analisar stats de lutadores
│       │   ├── create-prediction.ts ← Tool: gerar previsão de luta
│       │   ├── detect-trends.ts  ← Tool: buscar tendências
│       │   ├── security-scan.ts  ← Tool: scan de segurança
│       │   ├── health-check.ts   ← Tool: health check do sistema
│       │   └── delegate-task.ts  ← Tool: delegar tarefa pra outro agente
│       │
│       ├── orchestrator.ts       ← CEO logic: prompt → análise → delegação
│       ├── approval-engine.ts    ← Workflow de aprovação
│       ├── config.ts             ← Agents config, models, connections (do JSX mockup)
│       └── types.ts              ← TypeScript types
```

---

## IMPLEMENTAÇÃO CORE: CEO ORCHESTRATOR

```typescript
// src/lib/ai-company/orchestrator.ts
import { generateText, streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { prisma } from '@/lib/prisma';
import { agentRegistry } from './agents';
import { AGENTS_CONFIG } from './config';

const CEO_MODEL = anthropic('claude-opus-4-6-20251101');

export async function processCompanyPrompt(userId: string, prompt: string) {
  // 1. Salvar o prompt no DB
  const companyPrompt = await prisma.companyPrompt.create({
    data: { userId, prompt, status: 'processing' }
  });

  // 2. CEO analisa o prompt e decide quem trabalha
  const ceoAnalysis = await generateText({
    model: CEO_MODEL,
    system: AGENTS_CONFIG.ceo.systemPrompt,
    prompt: `
PROMPT DO ADMIN: "${prompt}"

EQUIPE DISPONÍVEL:
${Object.values(AGENTS_CONFIG).map(a =>
  `- ${a.humanName} (${a.codename}): ${a.desc} [STATUS: ${a.status}]`
).join('\n')}

Analise o prompt e decida:
1. Quais agentes devem trabalhar nesta tarefa?
2. Em que ordem? (sequencial ou paralelo)
3. Que instruções específicas cada um recebe?
4. Quais ações vão precisar de aprovação humana?

RESPONDA EM JSON:
{
  "analysis": "sua análise do prompt em 1-2 frases",
  "delegations": [
    {
      "agentId": "id-do-agente",
      "instruction": "instrução específica para o agente",
      "priority": "high" | "medium" | "low",
      "requiresApproval": boolean,
      "approvalReason": "por que precisa aprovação (se aplicável)",
      "dependsOn": [] // IDs de outros agentes que precisam rodar antes
    }
  ],
  "estimatedTime": "tempo estimado em minutos",
  "risks": ["riscos identificados"]
}`,
    temperature: 0.3, // CEO precisa ser consistente
  });

  // 3. Parse da análise do CEO
  const analysis = JSON.parse(ceoAnalysis.text);

  // 4. Criar tasks para cada delegação
  const tasks = [];
  for (const delegation of analysis.delegations) {
    const task = await prisma.agentTask.create({
      data: {
        agentId: delegation.agentId,
        type: 'delegated',
        input: delegation.instruction,
        status: 'pending',
        parentTaskId: null, // top-level, delegado pelo CEO
      }
    });
    tasks.push({ task, delegation });
  }

  // 5. Atualizar o prompt com a análise
  await prisma.companyPrompt.update({
    where: { id: companyPrompt.id },
    data: {
      ceoAnalysis: JSON.stringify(analysis),
      tasks: tasks.map(t => t.task.id),
      status: 'delegated'
    }
  });

  // 6. Executar tasks (respeitando dependências)
  await executeTaskPipeline(tasks);

  return { companyPrompt, analysis, tasks };
}

async function executeTaskPipeline(tasks: any[]) {
  // Separar em waves baseado em dependências
  const noDeps = tasks.filter(t => !t.delegation.dependsOn?.length);
  const withDeps = tasks.filter(t => t.delegation.dependsOn?.length);

  // Wave 1: Tasks sem dependências (paralelo)
  await Promise.all(noDeps.map(t => executeAgentTask(t.task, t.delegation)));

  // Wave 2+: Tasks com dependências (após completar dependências)
  for (const t of withDeps) {
    await executeAgentTask(t.task, t.delegation);
  }
}

async function executeAgentTask(task: any, delegation: any) {
  const agent = agentRegistry.get(delegation.agentId);
  if (!agent) throw new Error(`Agent ${delegation.agentId} not found`);

  // Marcar como running
  await prisma.agentTask.update({
    where: { id: task.id },
    data: { status: 'running' }
  });

  // Atualizar lastRunAt do agente
  await prisma.agent.update({
    where: { id: delegation.agentId },
    data: { lastRunAt: new Date() }
  });

  try {
    const startTime = Date.now();

    // Executar o agente com Vercel AI SDK
    const result = await agent.execute(delegation.instruction);

    const durationMs = Date.now() - startTime;

    // Se precisa aprovação, criar approval entry
    if (delegation.requiresApproval && result.pendingAction) {
      await prisma.approval.create({
        data: {
          taskId: task.id,
          agentId: delegation.agentId,
          actionType: result.pendingAction.type,
          description: result.pendingAction.description,
          payload: JSON.stringify(result.pendingAction.payload),
          status: 'pending'
        }
      });

      await prisma.agentTask.update({
        where: { id: task.id },
        data: {
          status: 'awaiting_approval',
          output: JSON.stringify(result),
          durationMs,
          tokensInput: result.usage?.promptTokens,
          tokensOutput: result.usage?.completionTokens,
        }
      });
    } else {
      // Task completa sem aprovação
      await prisma.agentTask.update({
        where: { id: task.id },
        data: {
          status: 'completed',
          output: JSON.stringify(result),
          completedAt: new Date(),
          durationMs,
          tokensInput: result.usage?.promptTokens,
          tokensOutput: result.usage?.completionTokens,
        }
      });

      // Incrementar tasks completed
      await prisma.agent.update({
        where: { id: delegation.agentId },
        data: { tasksCompleted: { increment: 1 } }
      });
    }
  } catch (error: any) {
    await prisma.agentTask.update({
      where: { id: task.id },
      data: {
        status: 'failed',
        error: error.message,
        completedAt: new Date(),
      }
    });

    // Log do erro
    await prisma.agentLog.create({
      data: {
        agentId: delegation.agentId,
        level: 'error',
        message: `Task failed: ${error.message}`,
        metadata: JSON.stringify({ taskId: task.id, stack: error.stack }),
      }
    });
  }
}
```

---

## IMPLEMENTAÇÃO: BASE AGENT

```typescript
// src/lib/ai-company/agents/base-agent.ts
import { generateText, tool } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const MODEL_MAP = {
  'opus-4.6': 'claude-opus-4-6-20251101',
  'sonnet-4.5': 'claude-sonnet-4-5-20250929',
  'haiku-4.5': 'claude-haiku-4-5-20251001',
} as const;

export interface AgentConfig {
  id: string;
  humanName: string;
  codename: string;
  model: keyof typeof MODEL_MAP;
  systemPrompt: string;
  tools?: Record<string, any>;
}

export class BaseAgent {
  config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  get model() {
    return anthropic(MODEL_MAP[this.config.model]);
  }

  async execute(instruction: string) {
    const result = await generateText({
      model: this.model,
      system: this.config.systemPrompt,
      prompt: instruction,
      tools: this.config.tools || {},
      maxSteps: 5, // Máximo de tool calls encadeados
      temperature: this.config.model === 'opus-4.6' ? 0.3 : 0.5,
    });

    return {
      text: result.text,
      toolResults: result.steps?.flatMap(s => s.toolResults) || [],
      usage: result.usage,
      pendingAction: this.extractPendingAction(result),
    };
  }

  // Streaming version para UI
  async *stream(instruction: string) {
    const result = streamText({
      model: this.model,
      system: this.config.systemPrompt,
      prompt: instruction,
      tools: this.config.tools || {},
      maxSteps: 5,
    });

    for await (const chunk of result.textStream) {
      yield chunk;
    }
  }

  // Extrair ações que precisam aprovação
  protected extractPendingAction(result: any) {
    const toolCalls = result.steps?.flatMap(s => s.toolCalls) || [];
    const approvalRequired = toolCalls.find(tc =>
      ['publish_article', 'moderate_comment', 'send_notification'].includes(tc.toolName)
    );

    if (approvalRequired) {
      return {
        type: approvalRequired.toolName,
        description: `${this.config.humanName} quer executar: ${approvalRequired.toolName}`,
        payload: approvalRequired.args,
      };
    }
    return null;
  }
}
```

---

## IMPLEMENTAÇÃO: EXEMPLO DE AGENTE (News Writer)

```typescript
// src/lib/ai-company/agents/news-writer.ts
import { tool } from 'ai';
import { z } from 'zod';
import { BaseAgent } from './base-agent';
import { prisma } from '@/lib/prisma';

export const newsWriter = new BaseAgent({
  id: 'news-writer',
  humanName: 'Lucas Braga',
  codename: 'Roundup',
  model: 'sonnet-4.5',
  systemPrompt: `Você é Lucas Braga, redator esportivo UFC/MMA do UFC News Hub.
    // ... (system prompt completo do mockup JSX) ...
  `,
  tools: {
    query_articles: tool({
      description: 'Buscar artigos existentes no banco de dados',
      parameters: z.object({
        query: z.string().describe('Termo de busca'),
        limit: z.number().default(10),
      }),
      execute: async ({ query, limit }) => {
        const articles = await prisma.article.findMany({
          where: { title: { contains: query, mode: 'insensitive' } },
          take: limit,
          orderBy: { createdAt: 'desc' },
        });
        return articles;
      },
    }),

    query_fighters: tool({
      description: 'Buscar dados de lutadores',
      parameters: z.object({
        name: z.string().describe('Nome do lutador'),
      }),
      execute: async ({ name }) => {
        const fighters = await prisma.fighter.findMany({
          where: { name: { contains: name, mode: 'insensitive' } },
          take: 5,
        });
        return fighters;
      },
    }),

    publish_article: tool({
      description: 'Publicar uma notícia no UFC News Hub. REQUER APROVAÇÃO HUMANA.',
      parameters: z.object({
        title: z.string().describe('Título da notícia'),
        subtitle: z.string().describe('Subtítulo'),
        body: z.string().describe('Corpo da notícia em markdown'),
        tags: z.array(z.string()).describe('Tags da notícia'),
        fighters_mentioned: z.array(z.string()).describe('Lutadores mencionados'),
      }),
      // NÃO executa de verdade — retorna o payload pra aprovação
      execute: async (args) => {
        return {
          status: 'awaiting_approval',
          message: `Artigo "${args.title}" pronto para publicação. Aguardando aprovação.`,
          payload: args,
        };
      },
    }),
  },
});
```

---

## API ROUTE: PROMPT ENDPOINT

```typescript
// src/app/api/company/prompt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processCompanyPrompt } from '@/lib/ai-company/orchestrator';

export async function POST(req: NextRequest) {
  const { prompt, userId = 'gabriel' } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const result = await processCompanyPrompt(userId, prompt);
    return NextResponse.json({
      id: result.companyPrompt.id,
      analysis: result.analysis,
      tasks: result.tasks.map(t => ({
        id: t.task.id,
        agentId: t.delegation.agentId,
        agentName: t.delegation.agentId, // TODO: resolve name
        status: t.task.status,
        requiresApproval: t.delegation.requiresApproval,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## API ROUTE: APPROVALS

```typescript
// src/app/api/company/approvals/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { action, reviewedBy, reviewNote } = await req.json();
  // action: "approve" | "reject"

  const approval = await prisma.approval.update({
    where: { id: params.id },
    data: {
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewedBy,
      reviewedAt: new Date(),
      reviewNote,
    },
    include: { task: true },
  });

  if (action === 'approve') {
    // Executar a ação aprovada
    await executeApprovedAction(approval);

    // Marcar task como completed
    await prisma.agentTask.update({
      where: { id: approval.taskId },
      data: { status: 'completed', completedAt: new Date() },
    });
  } else {
    // Marcar task como rejected
    await prisma.agentTask.update({
      where: { id: approval.taskId },
      data: { status: 'failed', error: `Rejected by ${reviewedBy}: ${reviewNote}` },
    });
  }

  return NextResponse.json({ success: true, approval });
}

async function executeApprovedAction(approval: any) {
  const payload = JSON.parse(approval.payload);

  switch (approval.actionType) {
    case 'publish_article':
      await prisma.article.create({
        data: {
          title: payload.title,
          subtitle: payload.subtitle,
          body: payload.body,
          tags: payload.tags,
          status: 'published',
          publishedAt: new Date(),
        }
      });
      break;

    case 'moderate_comment':
      await prisma.comment.update({
        where: { id: payload.commentId },
        data: { status: payload.action }, // "approve" | "flag" | "block"
      });
      break;

    // ... outros tipos de ação
  }
}
```

---

## FRONTEND: PROMPT INPUT (Componente chave)

```tsx
// src/app/admin/components/PromptInput.tsx
'use client';
import { useState } from 'react';

export function PromptInput({ onSubmit }: { onSubmit: (result: any) => void }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [ceoAnalysis, setCeoAnalysis] = useState(null);

  async function handleSubmit() {
    if (!prompt.trim()) return;
    setLoading(true);

    const res = await fetch('/api/company/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, userId: 'gabriel' }),
    });

    const result = await res.json();
    setCeoAnalysis(result.analysis);
    onSubmit(result);
    setLoading(false);
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">👔</span>
        <div>
          <h3 className="text-white text-sm font-bold">Fale com o CEO</h3>
          <p className="text-gray-500 text-xs">Ricardo Miura analisa e distribui para a equipe</p>
        </div>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ex: Escreva uma notícia sobre o UFC 315 e publique no site..."
        className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white text-sm resize-none h-24 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
      />

      <div className="flex items-center justify-between mt-3">
        <p className="text-gray-600 text-xs">
          Ações que modificam o site precisam da sua aprovação
        </p>
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              CEO analisando...
            </>
          ) : (
            <>Enviar para o CEO</>
          )}
        </button>
      </div>

      {/* CEO Analysis Display */}
      {ceoAnalysis && (
        <div className="mt-4 bg-red-950/20 border border-red-500/20 rounded-lg p-3">
          <h4 className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
            Análise do CEO
          </h4>
          <p className="text-gray-300 text-sm">{ceoAnalysis.analysis}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {ceoAnalysis.delegations?.map((d: any, i: number) => (
              <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                {d.agentId} → {d.priority}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## FRONTEND: APPROVAL QUEUE

```tsx
// src/app/admin/components/ApprovalQueue.tsx
'use client';
import { useState, useEffect } from 'react';

export function ApprovalQueue() {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // Poll a cada 5 segundos
    const interval = setInterval(fetchApprovals, 5000);
    fetchApprovals();
    return () => clearInterval(interval);
  }, []);

  async function fetchApprovals() {
    const res = await fetch('/api/company/approvals');
    const data = await res.json();
    setApprovals(data.filter((a: any) => a.status === 'pending'));
  }

  async function handleAction(id: string, action: 'approve' | 'reject') {
    await fetch(`/api/company/approvals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reviewedBy: 'gabriel' }),
    });
    fetchApprovals();
  }

  if (!approvals.length) return null;

  return (
    <div className="bg-orange-950/20 border border-orange-500/30 rounded-xl p-4">
      <h3 className="text-orange-400 text-sm font-bold mb-3 flex items-center gap-2">
        <span className="animate-pulse">⚠</span>
        {approvals.length} aprovação(ões) pendente(s)
      </h3>
      <div className="space-y-2">
        {approvals.map((a: any) => (
          <div key={a.id} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">{a.description}</p>
              <p className="text-gray-500 text-xs mt-1">
                {a.agent?.humanName} → {a.actionType}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(a.id, 'approve')}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-medium rounded-lg"
              >
                Aprovar
              </button>
              <button
                onClick={() => handleAction(a.id, 'reject')}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg"
              >
                Rejeitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## ORDEM DE IMPLEMENTAÇÃO

### Fase 1: Foundation (Primeiro)
1. `npx prisma migrate dev` — criar tabelas
2. Seed dos 14 agentes no DB (dados do mockup JSX)
3. API GET /api/company/agents — retornar agents reais do DB
4. Dashboard lê do DB em vez de constantes hardcoded

### Fase 2: CEO Prompt (Core)
1. POST /api/company/prompt — CEO recebe e analisa
2. PromptInput.tsx no /admin
3. TaskFeed.tsx mostrando tasks em tempo real
4. Testar: "Me diga quem são os lutadores do UFC 315" → CEO → delega → resultado

### Fase 3: Approval Workflow
1. CRUD de Approvals
2. ApprovalQueue.tsx no /admin
3. Testar: "Escreva e publique uma notícia" → CEO → Writer → Approval → Publish

### Fase 4: Agentes Reais (um por um)
1. Scraping Monitor (conecta com RSS existente)
2. News Writer (reescrita PT-BR)
3. Content Moderator (classificar comentários)
4. System Health (check endpoints)
5. Security (Helena Bastos scans)
6. ... demais agentes

### Fase 5: Polish UX
1. Streaming responses
2. Notificações real-time
3. Dashboard stats ao vivo
4. Activity timeline

---

## REFERÊNCIAS DE ARQUIVOS

- **Dashboard Mockup (todos os dados dos agentes)**: `docs/ai-company-reference.jsx`
- **Este guia de implementação**: `docs/UFC-AI-COMPANY-IMPLEMENTATION.md`
- **MeusApps.md**: Contexto sobre o estado atual do projeto UFC News Hub
