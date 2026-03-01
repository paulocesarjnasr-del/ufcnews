---
paths:
  - "src/lib/ai-company/**"
  - "src/app/api/company/**"
---

# AI Company System Rules

## Architecture Overview

14 AI agents organized in a corporate hierarchy:
- **Executive** → CEO (orchestrator.ts)
- **Director** → Department heads
- **Agent** → Specialized workers

Key files:
- `orchestrator.ts` — CEO decision engine, SSE streaming
- `agents/base-agent.ts` — Agent execution framework
- `agents/index.ts` — Agent registry
- `tools/index.ts` — 30+ tools with `zodSchema()` wrapper
- `event-bus.ts` — Event-driven triggers
- `xp-engine.ts` — XP calculation and leveling
- `cost-guard.ts` — Token cost tracking
- `pipelines.ts` — Multi-agent workflows
- `remediation.ts` — Performance remediation plans
- `daily-brief.ts` — Daily briefing generation

## CRITICAL: Field Name Confusion

| Field | Type | Meaning |
|-------|------|---------|
| `level` | String | Hierarchy position: `"executive"`, `"director"`, `"agent"` |
| `agentLevel` | Int (1-4) | XP progression: 1=Trainee, 2=Specialist, 3=Senior, 4=Lead |

**NEVER confuse these two.** `level` is organizational role. `agentLevel` is earned rank.

## Tool Definition Pattern

**MUST use `zodSchema()` wrapper — this is Vercel AI SDK v6 requirement:**
```typescript
import { tool, zodSchema } from 'ai';
import { z } from 'zod';

export const myTool = tool({
  description: 'Descrição em português ou inglês',
  inputSchema: zodSchema(
    z.object({
      param1: z.string().describe('Descrição do parâmetro'),
      param2: z.number().optional(),
    })
  ),
  execute: async ({ param1, param2 }) => {
    // Implementation
  },
});
```

**NEVER do this:**
```typescript
// ❌ WRONG — will break at runtime
parameters: z.object({ ... })
```

## SSE Event Types
```typescript
type SSEEvent =
  | 'ceo_thinking'      // CEO is analyzing the prompt
  | 'task_created'       // Task assigned to an agent
  | 'agent_start'        // Agent began working
  | 'agent_tool_call'    // Agent invoked a tool
  | 'agent_done'         // Agent completed task
  | 'approval_needed'    // Waiting for admin approval
  | 'done';              // All work complete
```

## Approval Workflow
- Certain actions require admin approval before execution
- Polling interval: 3 seconds
- Timeout: 30 minutes
- Approvals stored in `approvals` table (Prisma model: `Approval`)

## Agent Task Statuses
`pending` → `running` → `completed` | `failed` | `awaiting_approval`

## Cost Tracking
- All token usage logged to `agent_cost_logs` table
- `cost-guard.ts` tracks per-agent and total costs
- Model used is recorded with each task

## Database Access
AI Company system uses **Prisma** (not raw SQL):
```typescript
import { prisma } from '@/lib/prisma';
const agent = await prisma.agent.findUnique({ where: { id: agentId } });
const tasks = await prisma.agentTask.findMany({ where: { agentId, status: 'pending' } });
```

## Event Bus
```typescript
import { eventBus } from '@/lib/ai-company/event-bus';
// Events: event.finalized, event.new_card, news.synced, cron.daily, cron.weekly
```
