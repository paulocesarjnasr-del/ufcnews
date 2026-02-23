import { tool, zodSchema } from 'ai';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { query } from '@/lib/db';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import * as path from 'path';
import { processarEventoFinalizado } from '@/lib/arena/pontuacao';

// ═══════════════════════════════════════
// HELPER: Get base URL respecting dev port
// ═══════════════════════════════════════

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  const port = process.env.PORT || '3010';
  return `http://localhost:${port}`;
}

// ═══════════════════════════════════════
// READ-ONLY TOOLS (nao precisam aprovacao)
// ═══════════════════════════════════════

export const queryArticles = tool({
  description: 'Buscar noticias/artigos publicados no UFC News Hub',
  inputSchema: zodSchema(
    z.object({
      query: z.string().describe('Termo de busca no titulo').optional(),
      limit: z.number().describe('Limite de resultados').optional(),
    })
  ),
  execute: async ({ query, limit }) => {
    const where: Record<string, unknown> = {};
    if (query) where.titulo = { contains: query, mode: 'insensitive' };
    const noticias = await prisma.noticias.findMany({
      where,
      take: limit ?? 10,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        titulo: true,
        subtitulo: true,
        categoria: true,
        fonte_nome: true,
        publicado_em: true,
        visualizacoes: true,
      },
    });
    return noticias;
  },
});

export const queryFighters = tool({
  description: 'Buscar dados de lutadores no banco de dados do UFC News Hub',
  inputSchema: zodSchema(
    z.object({
      name: z.string().describe('Nome do lutador').optional(),
      weightClass: z.string().describe('Categoria de peso').optional(),
      limit: z.number().describe('Limite de resultados').optional(),
    })
  ),
  execute: async ({ name, weightClass, limit }) => {
    const where: Record<string, unknown> = {};
    if (name) where.nome = { contains: name, mode: 'insensitive' };
    if (weightClass)
      where.categoria_peso = { contains: weightClass, mode: 'insensitive' };
    const lutadores = await prisma.lutadores.findMany({
      where,
      take: limit ?? 10,
      select: {
        id: true,
        nome: true,
        apelido: true,
        categoria_peso: true,
        pais: true,
        idade: true,
        altura: true,
        envergadura: true,
        vitorias: true,
        derrotas: true,
        empates: true,
        nocautes: true,
        finalizacoes: true,
        ranking_divisao: true,
        academia: true,
        estilo_luta: true,
      },
    });
    return lutadores;
  },
});

export const queryEvents = tool({
  description: 'Buscar eventos do UFC (passados e futuros)',
  inputSchema: zodSchema(
    z.object({
      upcoming: z.boolean().describe('Se true, so eventos futuros').optional(),
      limit: z.number().describe('Limite de resultados').optional(),
      nome: z.string().describe('Filtrar por nome do evento').optional(),
    })
  ),
  execute: async ({ upcoming, limit, nome }) => {
    const where: Record<string, unknown> = {};
    if (upcoming) where.data_evento = { gte: new Date() };
    if (nome) where.nome = { contains: nome, mode: 'insensitive' };
    const eventos = await prisma.eventos.findMany({
      where,
      take: limit ?? 5,
      orderBy: { data_evento: upcoming ? 'asc' : 'desc' },
      select: {
        id: true,
        nome: true,
        slug: true,
        data_evento: true,
        local_evento: true,
        cidade: true,
        pais: true,
        tipo: true,
        status: true,
        onde_assistir: true,
      },
    });
    return eventos;
  },
});

export const queryComments = tool({
  description: 'Buscar comentarios do site para moderacao',
  inputSchema: zodSchema(
    z.object({
      status: z
        .string()
        .describe('Filtrar por status: all, aprovado, pendente, bloqueado')
        .optional(),
      limit: z.number().describe('Limite de resultados').optional(),
    })
  ),
  execute: async ({ status, limit }) => {
    const where: Record<string, unknown> = {};
    if (status && status !== 'all') where.status = status;
    const comentarios = await prisma.comentarios.findMany({
      where,
      take: limit ?? 20,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        autor_nome: true,
        conteudo: true,
        status: true,
        reportado_count: true,
        created_at: true,
        noticia_id: true,
      },
    });
    return comentarios;
  },
});

export const queryFights = tool({
  description: 'Buscar lutas de um evento especifico',
  inputSchema: zodSchema(
    z.object({
      eventoId: z.string().describe('ID do evento').optional(),
      limit: z.number().describe('Limite de resultados').optional(),
    })
  ),
  execute: async ({ eventoId, limit }) => {
    const where: Record<string, unknown> = {};
    if (eventoId) where.evento_id = eventoId;
    const lutas = await prisma.lutas.findMany({
      where,
      take: limit ?? 20,
      orderBy: { ordem: 'desc' },
      include: {
        lutadores_lutas_lutador1_idTolutadores: {
          select: { nome: true, apelido: true, categoria_peso: true },
        },
        lutadores_lutas_lutador2_idTolutadores: {
          select: { nome: true, apelido: true, categoria_peso: true },
        },
        eventos: { select: { nome: true, data_evento: true } },
      },
    });
    return lutas;
  },
});

export const getSystemHealth = tool({
  description: 'Verificar saude do sistema (DB, contagens, erros recentes)',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const start = Date.now();
    const [agentCount, articleCount, fighterCount, eventCount, recentErrors] =
      await Promise.all([
        prisma.agent.count(),
        prisma.noticias.count(),
        prisma.lutadores.count(),
        prisma.eventos.count(),
        prisma.agentLog.count({
          where: {
            level: 'error',
            createdAt: { gte: new Date(Date.now() - 3600000) },
          },
        }),
      ]);
    const dbLatency = Date.now() - start;
    return {
      database: {
        connected: true,
        latency_ms: dbLatency,
        agents: agentCount,
        noticias: articleCount,
        lutadores: fighterCount,
        eventos: eventCount,
      },
      errors_last_hour: recentErrors,
      timestamp: new Date().toISOString(),
    };
  },
});

// ═══════════════════════════════════════
// ACTION TOOLS (requerem aprovacao humana)
// Estas tools NAO executam a acao real.
// Elas retornam um payload que vai pra fila de aprovacao.
// So quando o admin aprova, a acao e executada.
// ═══════════════════════════════════════

export const publishArticle = tool({
  description:
    'Publicar uma noticia no UFC News Hub. REQUER APROVACAO DO ADMIN. Nao executa diretamente.',
  inputSchema: zodSchema(
    z.object({
      title: z.string().describe('Titulo da noticia (max 80 chars)'),
      subtitle: z.string().describe('Subtitulo'),
      body: z.string().describe('Corpo da noticia em markdown'),
      tags: z.array(z.string()).describe('Tags/categorias'),
      category: z
        .string()
        .describe('Categoria: breaking, preview, recap, profile')
        .optional(),
    })
  ),
  execute: async (args) => ({
    _requiresApproval: true as const,
    actionType: 'publish_article' as const,
    description: `Publicar noticia: "${args.title}"`,
    payload: args,
    preview: `Titulo: ${args.title}\nTamanho: ${args.body.length} chars`,
  }),
});

export const moderateComment = tool({
  description:
    'Moderar um comentario (aprovar ou bloquear). REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      commentId: z.string().describe('ID do comentario'),
      action: z.string().describe('Acao de moderacao: aprovado ou bloqueado'),
      reason: z.string().describe('Motivo da moderacao'),
      toxicityScore: z.number().describe('Score de toxicidade 0-10'),
    })
  ),
  execute: async (args) => ({
    _requiresApproval: true as const,
    actionType: 'moderate_comment' as const,
    description: `${args.action.toUpperCase()} comentario (toxicidade: ${args.toxicityScore}/10): ${args.reason}`,
    payload: args,
  }),
});

export const createPoll = tool({
  description: 'Criar uma poll/enquete no site. REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      question: z.string().describe('Pergunta da poll'),
      options: z.array(z.string()).describe('Opcoes da poll (2-4)'),
      relatedEvent: z.string().describe('Evento relacionado').optional(),
    })
  ),
  execute: async (args) => ({
    _requiresApproval: true as const,
    actionType: 'create_poll' as const,
    description: `Criar poll: "${args.question}" (${args.options.length} opcoes)`,
    payload: args,
  }),
});

export const updateFighterData = tool({
  description: 'Atualizar dados de um lutador. REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      fighterId: z.string().describe('ID do lutador'),
      updates: z.record(z.string(), z.unknown()).describe('Campos a atualizar'),
      source: z.string().describe('Fonte dos dados'),
      reason: z.string().describe('Motivo da atualizacao'),
    })
  ),
  execute: async (args) => ({
    _requiresApproval: true as const,
    actionType: 'update_fighter' as const,
    description: `Atualizar campos de lutador (fonte: ${args.source})`,
    payload: args,
  }),
});

// ═══════════════════════════════════════
// ACTION TOOLS (new - requerem aprovacao humana)
// ═══════════════════════════════════════

export const runDatabaseMigration = tool({
  description:
    'Executar alteração no schema do banco de dados (criar/alterar colunas). REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      tableName: z.string().describe('Nome da tabela'),
      operation: z
        .enum(['add_column', 'alter_column', 'create_index'])
        .describe('Tipo de operacao'),
      columnName: z.string().describe('Nome da coluna'),
      columnType: z.string().describe('Tipo da coluna (ex: TEXT, INTEGER, BOOLEAN)'),
      description: z.string().describe('Descricao da alteracao'),
    })
  ),
  execute: async (args) => {
    try {
      let sql = '';
      switch (args.operation) {
        case 'add_column':
          sql = `ALTER TABLE "${args.tableName}" ADD COLUMN "${args.columnName}" ${args.columnType};`;
          break;
        case 'alter_column':
          sql = `ALTER TABLE "${args.tableName}" ALTER COLUMN "${args.columnName}" TYPE ${args.columnType};`;
          break;
        case 'create_index':
          sql = `CREATE INDEX "idx_${args.tableName}_${args.columnName}" ON "${args.tableName}" ("${args.columnName}");`;
          break;
      }

      return {
        _requiresApproval: true as const,
        actionType: 'run_database_migration' as const,
        description: `Migration: ${args.operation} em ${args.tableName}.${args.columnName} (${args.columnType}) — ${args.description}`,
        payload: {
          ...args,
          sql,
          warning: 'Esta operacao altera o schema do banco de dados. Revise o SQL antes de aprovar.',
        },
        preview: `SQL: ${sql}`,
      };
    } catch (error) {
      return {
        error: `Falha ao preparar migration: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const backfillFighterData = tool({
  description:
    'Fazer backfill de dados dos lutadores via scraping do UFC.com. REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      fighterIds: z
        .array(z.string())
        .describe('IDs dos lutadores (opcional, se vazio pega todos incompletos)')
        .optional(),
      fields: z
        .array(z.string())
        .describe('Campos a preencher: categoria_peso, pais, idade, altura, etc.'),
      limit: z
        .number()
        .describe('Limite de lutadores a processar (default 50)')
        .optional(),
    })
  ),
  execute: async (args) => {
    try {
      const effectiveLimit = args.limit ?? 50;

      // Build where clause to find fighters needing backfill
      const orConditions = args.fields.map((field) => ({ [field]: null }));

      let fighters;
      if (args.fighterIds && args.fighterIds.length > 0) {
        fighters = await prisma.lutadores.findMany({
          where: { id: { in: args.fighterIds } },
          take: effectiveLimit,
          select: {
            id: true,
            nome: true,
            categoria_peso: true,
            pais: true,
            idade: true,
            altura: true,
          },
        });
      } else {
        fighters = await prisma.lutadores.findMany({
          where: { OR: orConditions },
          take: effectiveLimit,
          select: {
            id: true,
            nome: true,
            categoria_peso: true,
            pais: true,
            idade: true,
            altura: true,
          },
        });
      }

      const fighterSummary = fighters.map((f) => ({
        id: f.id,
        nome: f.nome,
        missingFields: args.fields.filter(
          (field) => f[field as keyof typeof f] === null || f[field as keyof typeof f] === undefined
        ),
      }));

      return {
        _requiresApproval: true as const,
        actionType: 'backfill_fighter_data' as const,
        description: `Backfill de ${fighterSummary.length} lutadores — campos: ${args.fields.join(', ')}`,
        payload: {
          fighters: fighterSummary,
          fields: args.fields,
          totalFighters: fighterSummary.length,
          limit: effectiveLimit,
          source: 'UFC.com scraping',
        },
        preview: `${fighterSummary.length} lutadores para atualizar, campos: ${args.fields.join(', ')}`,
      };
    } catch (error) {
      return {
        error: `Falha ao preparar backfill: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const runNpmAuditFix = tool({
  description:
    'Executar npm audit fix para corrigir vulnerabilidades de segurança. REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      force: z
        .boolean()
        .describe('Usar --force (pode causar breaking changes)')
        .optional(),
    })
  ),
  execute: async (args) => {
    try {
      const projectDir = path.resolve(process.cwd());
      let auditOutput: string;
      try {
        auditOutput = execSync('npm audit --json 2>/dev/null', {
          cwd: projectDir,
          encoding: 'utf-8',
          timeout: 30000,
        });
      } catch (err: unknown) {
        const execErr = err as { stdout?: string };
        auditOutput = execErr.stdout || '{}';
      }
      const audit = JSON.parse(auditOutput || '{}');
      const vulnerabilities = audit.metadata?.vulnerabilities || {};
      const totalVulnerabilities = vulnerabilities.total || 0;

      const useForce = args.force ?? false;
      const command = useForce ? 'npm audit fix --force' : 'npm audit fix';

      return {
        _requiresApproval: true as const,
        actionType: 'run_npm_audit_fix' as const,
        description: `Executar ${command} — ${totalVulnerabilities} vulnerabilidades encontradas`,
        payload: {
          command,
          force: useForce,
          vulnerabilities: {
            total: totalVulnerabilities,
            critical: vulnerabilities.critical || 0,
            high: vulnerabilities.high || 0,
            moderate: vulnerabilities.moderate || 0,
            low: vulnerabilities.low || 0,
          },
          warning: useForce
            ? 'ATENCAO: --force pode instalar versoes com breaking changes. Teste o build apos aprovacao!'
            : 'Somente fixes semver-compativeis serao aplicados.',
        },
        preview: `${totalVulnerabilities} vulns (${vulnerabilities.critical || 0} critical, ${vulnerabilities.high || 0} high). Comando: ${command}`,
      };
    } catch (error) {
      return {
        error: `Falha ao preparar npm audit fix: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const fixColumnSchema = tool({
  description:
    'Corrigir schema de colunas específicas no banco de dados. REQUER APROVACAO DO ADMIN.',
  inputSchema: zodSchema(
    z.object({
      issue: z.string().describe('Descricao do problema a corrigir'),
    })
  ),
  execute: async (args) => {
    try {
      // Analyze the issue and propose a fix
      let proposedFix = '';
      let sql = '';
      let affectedTable = '';
      let details = '';

      // Check for common schema issues
      if (args.issue.toLowerCase().includes('duration_ms') || args.issue.toLowerCase().includes('durationms')) {
        affectedTable = 'agent_tasks';
        // Check actual column name
        const columns = await query<{ column_name: string }>(
          `SELECT column_name FROM information_schema.columns
           WHERE table_name = 'agent_tasks' AND column_name ILIKE '%duration%'`
        );
        const actualColumn = columns[0]?.column_name || 'unknown';
        proposedFix = `Coluna encontrada: "${actualColumn}". Corrigir queries que usam nome errado.`;
        sql = `-- Coluna atual: "${actualColumn}"
-- Opcao 1: Criar alias via VIEW
CREATE OR REPLACE VIEW agent_tasks_compat AS
  SELECT *, "${actualColumn}" as duration_ms FROM agent_tasks;

-- Opcao 2: Renomear coluna (CUIDADO: quebra Prisma se nao atualizar schema)
-- ALTER TABLE agent_tasks RENAME COLUMN "${actualColumn}" TO duration_ms;`;
        details = `A coluna de duracao no agent_tasks se chama "${actualColumn}" no DB. Queries com duration_ms falham.`;
      } else {
        // Generic schema issue analysis
        const tables = await query<{ table_name: string }>(
          `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
        );
        proposedFix = `Issue reportado: ${args.issue}. Tabelas disponiveis: ${tables.map((t) => t.table_name).join(', ')}`;
        sql = `-- Analise manual necessaria para: ${args.issue}`;
        details = `Issue generico. Admin deve revisar e fornecer SQL especifico.`;
      }

      return {
        _requiresApproval: true as const,
        actionType: 'fix_column_schema' as const,
        description: `Fix schema: ${args.issue.substring(0, 100)}`,
        payload: {
          issue: args.issue,
          affectedTable,
          proposedFix,
          sql,
          details,
          warning: 'Alteracoes de schema podem impactar a aplicacao. Revise cuidadosamente.',
        },
        preview: proposedFix,
      };
    } catch (error) {
      return {
        error: `Falha ao analisar issue de schema: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

// ═══════════════════════════════════════
// NEW READ-ONLY TOOLS (Security, Ops, Analytics)
// ═══════════════════════════════════════

export const npmAuditCheck = tool({
  description: 'Executar npm audit para verificar vulnerabilidades de seguranca nas dependencias',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const projectDir = path.resolve(process.cwd());
      let auditOutput: string;
      try {
        auditOutput = execSync('npm audit --json 2>/dev/null', {
          cwd: projectDir,
          encoding: 'utf-8',
          timeout: 30000,
        });
      } catch (err: unknown) {
        // npm audit exits with non-zero when vulnerabilities found — that's normal
        const execErr = err as { stdout?: string; stderr?: string };
        auditOutput = execErr.stdout || '{}';
      }
      const audit = JSON.parse(auditOutput || '{}');
      const vulnerabilities = audit.metadata?.vulnerabilities || {};
      const advisories = audit.advisories || audit.vulnerabilities || {};
      const topPackages: { name: string; severity: string; title: string }[] = [];
      const entries = Object.entries(advisories);
      for (let i = 0; i < Math.min(5, entries.length); i++) {
        const [name, data] = entries[i] as [string, Record<string, unknown>];
        topPackages.push({
          name,
          severity: (data.severity as string) || 'unknown',
          title: (data.title as string) || (data.via as string) || name,
        });
      }
      return {
        total: vulnerabilities.total || 0,
        bySeverity: {
          critical: vulnerabilities.critical || 0,
          high: vulnerabilities.high || 0,
          moderate: vulnerabilities.moderate || 0,
          low: vulnerabilities.low || 0,
          info: vulnerabilities.info || 0,
        },
        topVulnerablePackages: topPackages,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao executar npm audit: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const checkDependencies = tool({
  description: 'Verificar dependencias do projeto e postura basica de seguranca (com allowlist para evitar falsos positivos)',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const projectDir = path.resolve(process.cwd());
      const pkgPath = path.join(projectDir, 'package.json');
      const pkgContent = readFileSync(pkgPath, 'utf-8');
      const pkg = JSON.parse(pkgContent);
      const deps = Object.keys(pkg.dependencies || {});
      const devDeps = Object.keys(pkg.devDependencies || {});

      // Allowlist: NEXT_PUBLIC_ vars that are safe by design
      const SAFE_PUBLIC_VARS = new Set([
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_BASE_URL',
        'NEXT_PUBLIC_SITE_URL',
        'NEXT_PUBLIC_APP_URL',
        'NEXT_PUBLIC_GA_ID',
        'NEXT_PUBLIC_POSTHOG_KEY',
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      ]);

      const securityIssues: string[] = [];

      // Only flag NEXT_PUBLIC_ vars containing genuinely dangerous patterns
      // Uses grep -rE (Extended regex, works on both macOS BSD grep and GNU grep)
      try {
        const envCheck = execSync(
          'grep -rlE "NEXT_PUBLIC_.*(SECRET|PASSWORD|PRIVATE_KEY)" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
          { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
        ).trim();
        if (envCheck) {
          const files = envCheck.split('\n').filter(Boolean);
          const realIssues: string[] = [];
          for (const file of files.slice(0, 5)) {
            try {
              // Use grep -oE (Extended regex) instead of -oP (Perl) for macOS compat
              const matches = execSync(
                `grep -oE 'NEXT_PUBLIC_[A-Za-z_]*(SECRET|PASSWORD|PRIVATE_KEY)[A-Za-z_]*' "${file}" 2>/dev/null || true`,
                { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
              ).trim();
              const vars = matches.split('\n').filter(Boolean);
              const dangerousVars = vars.filter(v => !SAFE_PUBLIC_VARS.has(v));
              if (dangerousVars.length > 0) {
                realIssues.push(`${file}: ${dangerousVars.join(', ')}`);
              }
            } catch {
              // skip file
            }
          }
          if (realIssues.length > 0) {
            securityIssues.push(`Possible secrets in public env vars: ${realIssues.join('; ')}`);
          }
        }
      } catch {
        // grep found nothing, that's good
      }

      // Check for hardcoded API keys (exclude node_modules, .next, example files)
      try {
        const hardcodedKeys = execSync(
          'grep -rl "sk-[a-zA-Z0-9]\\{20,\\}\\|ghp_[a-zA-Z0-9]\\{20,\\}\\|AKIA[a-zA-Z0-9]\\{16\\}" src/ --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next 2>/dev/null || true',
          { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
        ).trim();
        if (hardcodedKeys) {
          // Filter example/test files
          const files = hardcodedKeys.split('\n').filter(f => f && !f.includes('.example') && !f.includes('.test.') && !f.includes('__tests__'));
          if (files.length > 0) {
            securityIssues.push(`Possible hardcoded API keys found in: ${files.slice(0, 3).join(', ')}`);
          }
        }
      } catch {
        // grep found nothing
      }

      return {
        dependencies: {
          production: deps.length,
          dev: devDeps.length,
          total: deps.length + devDeps.length,
        },
        securityPosture: {
          issues: securityIssues,
          issueCount: securityIssues.length,
          status: securityIssues.length === 0 ? 'clean' : 'attention_needed',
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao verificar dependencias: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const getRecentErrors = tool({
  description: 'Buscar erros recentes dos agentes nas ultimas 24 horas, agrupados por agente',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const errors = await prisma.agentLog.findMany({
        where: {
          level: 'error',
          createdAt: { gte: twentyFourHoursAgo },
        },
        orderBy: { createdAt: 'desc' },
        select: {
          agentId: true,
          message: true,
          createdAt: true,
        },
      });

      // Group by agentId
      const grouped: Record<string, { count: number; recentMessages: { message: string; timestamp: string }[] }> = {};
      for (const err of errors) {
        if (!grouped[err.agentId]) {
          grouped[err.agentId] = { count: 0, recentMessages: [] };
        }
        grouped[err.agentId].count++;
        if (grouped[err.agentId].recentMessages.length < 3) {
          grouped[err.agentId].recentMessages.push({
            message: err.message.substring(0, 200),
            timestamp: err.createdAt.toISOString(),
          });
        }
      }

      return {
        totalErrors: errors.length,
        errorsByAgent: grouped,
        period: '24h',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao buscar erros recentes: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const getDbPoolStats = tool({
  description: 'Verificar estatisticas do pool de conexoes do banco de dados PostgreSQL',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const [poolStats] = await query<{
        total: string;
        active: string;
        idle: string;
      }>(
        `SELECT count(*) as total,
                count(*) FILTER (WHERE state = 'active') as active,
                count(*) FILTER (WHERE state = 'idle') as idle
         FROM pg_stat_activity
         WHERE datname = current_database()`
      );

      const [longestQuery] = await query<{ longest_query: string | null }>(
        `SELECT max(now() - query_start) as longest_query
         FROM pg_stat_activity
         WHERE state = 'active' AND datname = current_database()`
      );

      return {
        connections: {
          total: parseInt(poolStats?.total || '0'),
          active: parseInt(poolStats?.active || '0'),
          idle: parseInt(poolStats?.idle || '0'),
        },
        longestActiveQuery: longestQuery?.longest_query || null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao buscar stats do pool: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

// RENAMED: was getApiLatencyStats — this measures AI PROCESSING time, NOT HTTP API latency
export const getAgentProcessingStats = tool({
  description: 'Estatisticas de tempo de PROCESSAMENTO dos agentes AI (inclui tempo de reasoning do LLM). NAO e latencia de API HTTP.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const [stats] = await query<{
        avg_ms: string | null;
        p95_ms: string | null;
        task_count: string;
      }>(
        `SELECT avg("durationMs") as avg_ms,
                percentile_cont(0.95) WITHIN GROUP (ORDER BY "durationMs") as p95_ms,
                count(*) as task_count
         FROM agent_tasks
         WHERE "completedAt" > NOW() - INTERVAL '1 hour'
           AND "durationMs" IS NOT NULL`
      );

      return {
        note: 'Estes tempos incluem reasoning do LLM (3-30s e normal). Para latencia HTTP real, use measureEndpointLatency.',
        lastHour: {
          avgProcessingMs: stats?.avg_ms ? Math.round(parseFloat(stats.avg_ms)) : null,
          p95ProcessingMs: stats?.p95_ms ? Math.round(parseFloat(stats.p95_ms)) : null,
          taskCount: parseInt(stats?.task_count || '0'),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao calcular stats de processamento: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

// BACKWARD COMPAT: keep old name pointing to renamed tool
export const getApiLatencyStats = getAgentProcessingStats;

// NEW: Measures real HTTP endpoint latency via actual fetch requests (parallel with timeout)
export const measureEndpointLatency = tool({
  description: 'Medir latencia REAL dos endpoints HTTP da aplicacao via fetch. Retorna tempo de resposta por rota.',
  inputSchema: zodSchema(
    z.object({
      endpoints: z.array(z.string()).describe('Lista de endpoints para testar (ex: /api/sync-eventos). Se vazio, testa os principais.').optional(),
    })
  ),
  execute: async ({ endpoints }) => {
    const baseUrl = getBaseUrl();
    const defaultEndpoints = [
      '/api/company/agents',
      '/api/company/costs',
      '/',
    ];
    const toTest = endpoints && endpoints.length > 0 ? endpoints : defaultEndpoints;

    // Fetch all endpoints in parallel with 5s timeout each
    const promises = toTest.map(async (endpoint) => {
      const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
      const start = Date.now();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeout);
        const latencyMs = Date.now() - start;
        return { endpoint, statusCode: res.status, latencyMs, ok: res.ok };
      } catch (error) {
        const latencyMs = Date.now() - start;
        return {
          endpoint,
          statusCode: 0,
          latencyMs,
          ok: false,
          error: error instanceof Error ? error.message : 'Connection failed',
        };
      }
    });

    const results = await Promise.all(promises);

    // Calculate P95 from successful requests
    const successLatencies = results.filter(r => r.ok).map(r => r.latencyMs).sort((a, b) => a - b);
    const p95Index = Math.ceil(successLatencies.length * 0.95) - 1;
    const p95Ms = successLatencies.length > 0 ? successLatencies[Math.max(0, p95Index)] : null;
    const avgMs = successLatencies.length > 0 ? Math.round(successLatencies.reduce((a, b) => a + b, 0) / successLatencies.length) : null;

    return {
      note: 'Latencia HTTP real medida via fetch paralelo. Valores tipicos: <500ms para APIs, <2000ms para pages SSR.',
      endpoints: results,
      summary: {
        totalTested: results.length,
        successful: results.filter(r => r.ok).length,
        failed: results.filter(r => !r.ok).length,
        avgLatencyMs: avgMs,
        p95LatencyMs: p95Ms,
      },
      timestamp: new Date().toISOString(),
    };
  },
});

export const querySyncLogs = tool({
  description: 'Buscar logs de sincronizacao/scraping do UFC News Hub',
  inputSchema: zodSchema(
    z.object({
      limit: z.number().describe('Numero maximo de registros (default 10)').optional(),
    })
  ),
  execute: async ({ limit }) => {
    try {
      const logs = await prisma.sync_logs.findMany({
        take: limit ?? 10,
        orderBy: { started_at: 'desc' },
        select: {
          id: true,
          started_at: true,
          finished_at: true,
          noticias_processadas: true,
          noticias_adicionadas: true,
          noticias_duplicadas: true,
          noticias_rejeitadas: true,
          erro: true,
          status: true,
        },
      });
      return logs;
    } catch (error) {
      return {
        error: `Falha ao buscar sync logs: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const getScraperStatus = tool({
  description: 'Verificar status geral do scraper: taxa de sucesso, duracao media, ultimo sync bem-sucedido',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const [recentLogs, currentlyRunning, lastSuccess] = await Promise.all([
        prisma.sync_logs.findMany({
          where: { started_at: { gte: twentyFourHoursAgo } },
          select: {
            status: true,
            started_at: true,
            finished_at: true,
            noticias_adicionadas: true,
          },
        }),
        prisma.sync_logs.findFirst({
          where: { status: 'running' },
          select: { id: true, started_at: true },
        }),
        prisma.sync_logs.findFirst({
          where: { status: 'completed' },
          orderBy: { finished_at: 'desc' },
          select: { finished_at: true, noticias_adicionadas: true },
        }),
      ]);

      const totalRuns = recentLogs.length;
      const successfulRuns = recentLogs.filter((l) => l.status === 'completed').length;
      const successRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;

      // Calculate average duration for completed syncs
      const durations = recentLogs
        .filter((l) => l.started_at && l.finished_at)
        .map((l) => l.finished_at!.getTime() - l.started_at!.getTime());
      const avgDurationMs = durations.length > 0
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 0;

      const totalItemsSyncedToday = recentLogs.reduce(
        (sum, l) => sum + (l.noticias_adicionadas || 0),
        0
      );

      return {
        last24h: {
          totalRuns,
          successfulRuns,
          successRate: Math.round(successRate * 100) / 100,
          avgDurationMs: Math.round(avgDurationMs),
          totalItemsSynced: totalItemsSyncedToday,
        },
        currentlyRunning: currentlyRunning
          ? { id: currentlyRunning.id, startedAt: currentlyRunning.started_at }
          : null,
        lastSuccessfulSync: lastSuccess
          ? {
              finishedAt: lastSuccess.finished_at,
              itemsAdded: lastSuccess.noticias_adicionadas,
            }
          : null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao verificar status do scraper: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const queryPredictionAccuracy = tool({
  description: 'Calcular precisao das previsoes processadas (acertos de vencedor e metodo)',
  inputSchema: zodSchema(
    z.object({
      eventoId: z.string().describe('Filtrar por ID do evento (opcional)').optional(),
    })
  ),
  execute: async ({ eventoId }) => {
    try {
      const where: Record<string, unknown> = { processada: true };
      if (eventoId) where.evento_id = eventoId;

      const predictions = await prisma.previsoes.findMany({
        where,
        select: {
          acertou_vencedor: true,
          acertou_metodo: true,
          pontos_ganhos: true,
        },
      });

      const total = predictions.length;
      if (total === 0) {
        return {
          total: 0,
          message: 'Nenhuma previsao processada encontrada',
          timestamp: new Date().toISOString(),
        };
      }

      const correctWinner = predictions.filter((p) => p.acertou_vencedor === true).length;
      const correctMethod = predictions.filter((p) => p.acertou_metodo === true).length;
      const totalPoints = predictions.reduce((sum, p) => sum + (p.pontos_ganhos || 0), 0);

      return {
        total,
        correctWinner: {
          count: correctWinner,
          percentage: Math.round((correctWinner / total) * 10000) / 100,
        },
        correctMethod: {
          count: correctMethod,
          percentage: Math.round((correctMethod / total) * 10000) / 100,
        },
        totalPointsAwarded: totalPoints,
        avgPointsPerPrediction: Math.round((totalPoints / total) * 100) / 100,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao calcular precisao: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const getDataQualityReport = tool({
  description: 'Relatorio de qualidade dos dados de lutadores: completude dos campos e lutadores incompletos',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const [totalCount, missingVitorias, missingCategoria, missingPais, missingIdade, missingAltura] =
        await Promise.all([
          prisma.lutadores.count(),
          prisma.lutadores.count({ where: { vitorias: null } }),
          prisma.lutadores.count({ where: { categoria_peso: null } }),
          prisma.lutadores.count({ where: { pais: null } }),
          prisma.lutadores.count({ where: { idade: null } }),
          prisma.lutadores.count({ where: { altura: null } }),
        ]);

      // Get sample of incomplete fighters (missing key fields)
      const incompleteFighters = await prisma.lutadores.findMany({
        where: {
          OR: [
            { vitorias: null },
            { categoria_peso: null },
            { pais: null },
          ],
        },
        take: 15,
        select: {
          id: true,
          nome: true,
          categoria_peso: true,
          pais: true,
          vitorias: true,
        },
        orderBy: { updated_at: 'desc' },
      });

      const totalFields = totalCount * 5; // 5 key fields checked
      const totalMissing = missingVitorias + missingCategoria + missingPais + missingIdade + missingAltura;
      const completeness = totalFields > 0
        ? Math.round(((totalFields - totalMissing) / totalFields) * 10000) / 100
        : 0;

      return {
        totalFighters: totalCount,
        completenessPercentage: completeness,
        missingFields: {
          vitorias: missingVitorias,
          categoria_peso: missingCategoria,
          pais: missingPais,
          idade: missingIdade,
          altura: missingAltura,
        },
        incompleteFighters: incompleteFighters.map((f) => ({
          id: f.id,
          nome: f.nome,
          missingFields: [
            ...(f.categoria_peso === null ? ['categoria_peso'] : []),
            ...(f.pais === null ? ['pais'] : []),
            ...(f.vitorias === null ? ['vitorias'] : []),
          ],
        })),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao gerar relatorio de qualidade: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

export const getArticlePerformance = tool({
  description: 'Analisar performance dos artigos: mais visualizados, media de views, artigos recentes',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const [topArticles, allArticles, last24h, last7d] = await Promise.all([
        prisma.noticias.findMany({
          take: 10,
          orderBy: { visualizacoes: 'desc' },
          select: {
            id: true,
            titulo: true,
            categoria: true,
            visualizacoes: true,
            publicado_em: true,
            fonte_nome: true,
          },
        }),
        prisma.noticias.aggregate({
          _avg: { visualizacoes: true },
          _count: true,
        }),
        prisma.noticias.count({
          where: { publicado_em: { gte: twentyFourHoursAgo } },
        }),
        prisma.noticias.count({
          where: { publicado_em: { gte: sevenDaysAgo } },
        }),
      ]);

      return {
        top10MostViewed: topArticles,
        averageViews: Math.round(allArticles._avg.visualizacoes || 0),
        totalArticles: allArticles._count,
        publishedLast24h: last24h,
        publishedLast7d: last7d,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: `Falha ao analisar performance: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  },
});

// ═══════════════════════════════════════
// ARENA MANAGER TOOLS (Felipe Santos)
// ═══════════════════════════════════════

export const processEventResults = tool({
  description: 'Processar resultados de um evento finalizado — calcula pontos da arena. AUTO-APPROVE.',
  inputSchema: zodSchema(
    z.object({
      eventoId: z.string().describe('ID do evento finalizado'),
    })
  ),
  execute: async ({ eventoId }) => {
    try {
      const resultado = await processarEventoFinalizado(eventoId);
      return {
        _requiresApproval: true as const,
        actionType: 'process_event_results' as const,
        description: `Processou evento: ${resultado.previsoesProcessadas} previsoes, ${resultado.pontosDistribuidos} pontos`,
        payload: resultado,
      };
    } catch (error) {
      return { error: `Falha ao processar evento: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const openArenaPredictions = tool({
  description: 'Abrir previsoes da arena para um evento. AUTO-APPROVE.',
  inputSchema: zodSchema(
    z.object({
      eventoId: z.string().describe('ID do evento'),
    })
  ),
  execute: async ({ eventoId }) => {
    try {
      const evento = await prisma.eventos.findUnique({
        where: { id: eventoId },
        select: { nome: true, status: true, data_evento: true, lutas: { select: { id: true, status: true } } },
      });
      if (!evento) return { error: 'Evento nao encontrado' };
      const lutasAgendadas = evento.lutas.filter(l => l.status === 'agendada').length;
      return {
        _requiresApproval: true as const,
        actionType: 'open_arena_predictions' as const,
        description: `Arena aberta para ${evento.nome}: ${lutasAgendadas} lutas disponiveis para previsao`,
        payload: { eventoId, eventoNome: evento.nome, lutasDisponiveis: lutasAgendadas, dataEvento: evento.data_evento },
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const queryArenaStats = tool({
  description: 'Consultar estatisticas da arena: top users, acuracia, ligas ativas',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const [topUsers, totalPrevisoes, totalLigas, totalDuelos] = await Promise.all([
        prisma.usuarios_arena.findMany({
          take: 10,
          orderBy: { pontos_totais: 'desc' },
          select: { username: true, display_name: true, pontos_totais: true, total_previsoes: true, previsoes_corretas: true },
        }),
        prisma.previsoes.count(),
        prisma.ligas.count({ where: { status: 'ativa' } }),
        prisma.duelos.count({ where: { status: 'pendente' } }),
      ]);
      return { topUsers, totalPrevisoes, ligasAtivas: totalLigas, duelosPendentes: totalDuelos, timestamp: new Date().toISOString() };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const queryLeagueStandings = tool({
  description: 'Consultar rankings de ligas ativas',
  inputSchema: zodSchema(
    z.object({
      ligaId: z.string().describe('ID da liga (opcional, se vazio retorna todas)').optional(),
    })
  ),
  execute: async ({ ligaId }) => {
    try {
      const where: Record<string, unknown> = { status: 'ativa' };
      if (ligaId) where.id = ligaId;
      const ligas = await prisma.ligas.findMany({
        where,
        take: 5,
        include: {
          liga_membros: {
            orderBy: { pontos_temporada: 'desc' },
            take: 10,
            include: { usuarios_arena: { select: { username: true, display_name: true } } },
          },
        },
      });
      return ligas.map(l => ({
        id: l.id, nome: l.nome, membros: l.total_membros, temporada: l.temporada_atual,
        ranking: l.liga_membros.map((m, i) => ({
          posicao: i + 1, username: m.usuarios_arena.username, pontos: m.pontos_temporada,
        })),
      }));
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const finalizeDuels = tool({
  description: 'Finalizar duelos pendentes cujo evento ja foi finalizado. AUTO-APPROVE.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const pendingDuels = await prisma.duelos.findMany({
        where: { status: 'aceito', eventos: { status: 'finalizado' } },
        include: { eventos: { select: { nome: true } } },
      });
      let finalizados = 0;
      for (const duel of pendingDuels) {
        const winnerId = (duel.pontos_desafiante ?? 0) >= (duel.pontos_desafiado ?? 0)
          ? duel.desafiante_id : duel.desafiado_id;
        await prisma.duelos.update({
          where: { id: duel.id },
          data: { status: 'finalizado', vencedor_id: winnerId, finalizado_em: new Date() },
        });
        finalizados++;
      }
      return {
        _requiresApproval: true as const,
        actionType: 'finalize_duels' as const,
        description: `Finalizou ${finalizados} duelos pendentes`,
        payload: { finalizados, total: pendingDuels.length },
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const generateArenaReport = tool({
  description: 'Gerar relatorio pos-evento da arena com stats e destaques',
  inputSchema: zodSchema(
    z.object({ eventoId: z.string().describe('ID do evento') })
  ),
  execute: async ({ eventoId }) => {
    try {
      const [evento, pontuacoes, previsoes] = await Promise.all([
        prisma.eventos.findUnique({ where: { id: eventoId }, select: { nome: true, data_evento: true } }),
        prisma.evento_pontuacao.findMany({
          where: { evento_id: eventoId },
          orderBy: { pontos_totais: 'desc' },
          take: 10,
          include: { usuarios_arena: { select: { username: true, display_name: true } } },
        }),
        prisma.previsoes.findMany({
          where: { evento_id: eventoId, processada: true },
          select: { acertou_vencedor: true, acertou_metodo: true, pontos_ganhos: true },
        }),
      ]);
      const totalPrevisoes = previsoes.length;
      const acertosVencedor = previsoes.filter(p => p.acertou_vencedor).length;
      const acertosMetodo = previsoes.filter(p => p.acertou_metodo).length;
      return {
        evento: evento?.nome,
        dataEvento: evento?.data_evento,
        totalPrevisoes,
        taxaAcertoVencedor: totalPrevisoes > 0 ? Math.round((acertosVencedor / totalPrevisoes) * 100) : 0,
        taxaAcertoMetodo: totalPrevisoes > 0 ? Math.round((acertosMetodo / totalPrevisoes) * 100) : 0,
        top10: pontuacoes.map((p, i) => ({
          posicao: i + 1, username: p.usuarios_arena.username, pontos: p.pontos_totais, acertos: p.acertos,
        })),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

// ═══════════════════════════════════════
// EVENT OPS TOOLS (Marcos Lima)
// ═══════════════════════════════════════

export const syncEventCards = tool({
  description: 'Sincronizar cards de eventos do UFC.com. AUTO-APPROVE.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/api/sync-eventos`, { method: 'POST' });
      const result = await res.json();
      return {
        _requiresApproval: true as const,
        actionType: 'sync_event_cards' as const,
        description: `Sync de eventos: ${JSON.stringify(result).slice(0, 200)}`,
        payload: result,
      };
    } catch (error) {
      return { error: `Falha no sync: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const checkEventResults = tool({
  description: 'Verificar quais eventos recentes tem resultados novos',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const recentEvents = await prisma.eventos.findMany({
        where: { data_evento: { lte: new Date() } },
        orderBy: { data_evento: 'desc' },
        take: 5,
        select: {
          id: true, nome: true, status: true, data_evento: true,
          lutas: { select: { id: true, status: true, vencedor_id: true } },
        },
      });
      return recentEvents.map(e => ({
        id: e.id, nome: e.nome, status: e.status, data: e.data_evento,
        totalLutas: e.lutas.length,
        lutasFinalizadas: e.lutas.filter(l => l.status === 'finalizada').length,
        lutasSemResultado: e.lutas.filter(l => l.status !== 'finalizada' && l.status !== 'cancelada').length,
      }));
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const updateFightResults = tool({
  description: 'Atualizar resultados de lutas e records de lutadores. AUTO-APPROVE.',
  inputSchema: zodSchema(
    z.object({
      lutaId: z.string().describe('ID da luta'),
      vencedorId: z.string().describe('ID do lutador vencedor'),
      metodo: z.string().describe('Metodo de vitoria'),
      round: z.number().describe('Round final'),
      tempo: z.string().describe('Tempo final (ex: 4:32)'),
    })
  ),
  execute: async (args) => {
    try {
      await prisma.lutas.update({
        where: { id: args.lutaId },
        data: {
          vencedor_id: args.vencedorId,
          metodo: args.metodo as never,
          round_final: args.round,
          tempo_final: args.tempo,
          status: 'finalizada',
        },
      });
      return {
        _requiresApproval: true as const,
        actionType: 'update_fight_results' as const,
        description: `Atualizou luta ${args.lutaId}: vencedor=${args.vencedorId}, ${args.metodo} R${args.round}`,
        payload: args,
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const queryUpcomingEvents = tool({
  description: 'Listar proximos eventos com contagem de lutas',
  inputSchema: zodSchema(
    z.object({ limit: z.number().optional() })
  ),
  execute: async ({ limit }) => {
    try {
      const eventos = await prisma.eventos.findMany({
        where: { data_evento: { gte: new Date() } },
        orderBy: { data_evento: 'asc' },
        take: limit ?? 5,
        select: {
          id: true, nome: true, data_evento: true, local_evento: true, cidade: true, tipo: true, status: true,
          lutas: { select: { id: true, tipo: true, is_titulo: true } },
        },
      });
      return eventos.map(e => ({
        ...e,
        totalLutas: e.lutas.length,
        lutasDeTitulo: e.lutas.filter(l => l.is_titulo).length,
        lutas: undefined,
      }));
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

// ═══════════════════════════════════════
// SEO GROWTH TOOLS (Marina Costa)
// ═══════════════════════════════════════

export const analyzeArticleSEO = tool({
  description: 'Analisar SEO de um artigo especifico',
  inputSchema: zodSchema(
    z.object({ articleId: z.string().describe('ID do artigo') })
  ),
  execute: async ({ articleId }) => {
    try {
      const article = await prisma.noticias.findUnique({
        where: { id: articleId },
        select: { titulo: true, subtitulo: true, conteudo_completo: true, categoria: true, imagem_url: true },
      });
      if (!article) return { error: 'Artigo nao encontrado' };
      const issues: string[] = [];
      if (!article.titulo || article.titulo.length > 70) issues.push('Titulo muito longo (ideal: 50-70 chars)');
      if (!article.subtitulo) issues.push('Subtitulo (meta description) ausente');
      if (article.subtitulo && article.subtitulo.length > 160) issues.push('Subtitulo muito longo (ideal: 120-160 chars)');
      if (!article.imagem_url) issues.push('Imagem ausente (prejudica compartilhamento social)');
      if (!article.conteudo_completo || article.conteudo_completo.length < 300) issues.push('Conteudo muito curto (ideal: >800 chars)');
      return {
        articleId, titulo: article.titulo, tituloLength: article.titulo?.length,
        subtituloLength: article.subtitulo?.length,
        conteudoLength: article.conteudo_completo?.length,
        hasImage: !!article.imagem_url,
        seoScore: Math.max(0, 100 - issues.length * 20),
        issues,
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const generateMetaTags = tool({
  description: 'Gerar sugestoes de meta tags para um artigo',
  inputSchema: zodSchema(
    z.object({
      titulo: z.string().describe('Titulo do artigo'),
      conteudo: z.string().describe('Resumo do conteudo'),
    })
  ),
  execute: async ({ titulo, conteudo }) => {
    return {
      title: titulo.length > 60 ? titulo.slice(0, 57) + '...' : titulo,
      description: conteudo.length > 155 ? conteudo.slice(0, 152) + '...' : conteudo,
      ogTitle: titulo,
      ogDescription: conteudo.slice(0, 200),
      keywords: titulo.toLowerCase().split(/\s+/).filter(w => w.length > 3).join(', '),
      timestamp: new Date().toISOString(),
    };
  },
});

export const queryTopKeywords = tool({
  description: 'Buscar keywords mais frequentes nos artigos recentes',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const articles = await prisma.noticias.findMany({
        take: 50,
        orderBy: { publicado_em: 'desc' },
        select: { titulo: true },
      });
      const wordCount: Record<string, number> = {};
      const stopWords = new Set(['que', 'com', 'para', 'por', 'uma', 'dos', 'das', 'nos', 'ufc', 'mma', 'the', 'and', 'for']);
      for (const a of articles) {
        const words = a.titulo.toLowerCase().replace(/[^a-zà-ú\s]/g, '').split(/\s+/);
        for (const w of words) {
          if (w.length > 3 && !stopWords.has(w)) wordCount[w] = (wordCount[w] || 0) + 1;
        }
      }
      const sorted = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 20);
      return { topKeywords: sorted.map(([word, count]) => ({ word, count })), totalArticlesAnalyzed: articles.length };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const auditSiteSEO = tool({
  description: 'Auditoria geral de SEO do site: artigos sem meta, imagens sem alt, etc.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const [total, semSubtitulo, semImagem, curtosCount] = await Promise.all([
        prisma.noticias.count(),
        prisma.noticias.count({ where: { subtitulo: null } }),
        prisma.noticias.count({ where: { imagem_url: null } }),
        query<{ count: string }>(`SELECT count(*) FROM noticias WHERE length(COALESCE(conteudo_completo, '')) < 300`),
      ]);
      const curtos = parseInt(curtosCount[0]?.count || '0');
      const seoHealthScore = total > 0 ? Math.round(((total - semSubtitulo - semImagem - curtos) / (total * 3)) * 100) : 0;
      return {
        totalArticles: total,
        issues: { semSubtitulo, semImagem, conteudoCurto: curtos },
        seoHealthScore,
        recommendations: [
          ...(semSubtitulo > 0 ? [`${semSubtitulo} artigos sem subtitulo/meta description`] : []),
          ...(semImagem > 0 ? [`${semImagem} artigos sem imagem`] : []),
          ...(curtos > 0 ? [`${curtos} artigos com conteudo muito curto (<300 chars)`] : []),
        ],
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

// ═══════════════════════════════════════
// UI AUDITOR TOOLS (Fernanda Reis)
// ═══════════════════════════════════════

export const auditPageHealth = tool({
  description: 'Verificar saude das paginas principais: status codes e erros',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const routes = ['/', '/arena', '/calendario', '/lutadores', '/admin'];
    const results: Array<{ route: string; status: number; ok: boolean; error?: string }> = [];
    for (const route of routes) {
      try {
        const res = await fetch(`${baseUrl}${route}`, { method: 'GET', redirect: 'follow' });
        results.push({ route, status: res.status, ok: res.ok });
      } catch (error) {
        results.push({ route, status: 0, ok: false, error: error instanceof Error ? error.message : 'Connection failed' });
      }
    }
    const healthy = results.filter(r => r.ok).length;
    return {
      totalRoutes: routes.length,
      healthy,
      unhealthy: routes.length - healthy,
      routes: results,
      healthScore: Math.round((healthy / routes.length) * 100),
      timestamp: new Date().toISOString(),
    };
  },
});

export const checkComponentRender = tool({
  description: 'Verificar se componentes criticos estao presentes no HTML renderizado',
  inputSchema: zodSchema(
    z.object({
      route: z.string().describe('Rota para verificar (ex: /admin)'),
      components: z.array(z.string()).describe('Lista de strings/IDs a buscar no HTML'),
    })
  ),
  execute: async ({ route, components }) => {
    const baseUrl = getBaseUrl();
    try {
      const res = await fetch(`${baseUrl}${route}`);
      if (!res.ok) return { error: `Route ${route} returned ${res.status}` };
      const html = await res.text();
      const checks = components.map(comp => ({
        component: comp,
        found: html.includes(comp),
      }));
      const allFound = checks.every(c => c.found);
      return { route, allComponentsFound: allFound, checks, htmlLength: html.length };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const getConsoleLogs = tool({
  description: 'Buscar erros recentes do build/compilacao do Next.js',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    try {
      const projectDir = path.resolve(process.cwd());
      const logPath = path.join(projectDir, 'logs', 'dev-server-error.log');
      let errorLog = '';
      try {
        const content = readFileSync(logPath, 'utf-8');
        // Get last 50 lines
        const lines = content.split('\n');
        errorLog = lines.slice(-50).join('\n');
      } catch {
        errorLog = 'Log file not found or empty';
      }
      // Also check TypeScript compilation
      let tsErrors = '';
      try {
        tsErrors = execSync('npx tsc --noEmit --pretty 2>&1 | tail -30', {
          cwd: projectDir, encoding: 'utf-8', timeout: 60000,
        });
      } catch (err: unknown) {
        const execErr = err as { stdout?: string };
        tsErrors = execErr.stdout || 'TS check failed';
      }
      return {
        recentErrors: errorLog.slice(-2000),
        tsCompilation: tsErrors.slice(-2000),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

export const compareLayoutSnapshot = tool({
  description: 'Comparar tamanho e estrutura do HTML de uma rota (baseline vs atual)',
  inputSchema: zodSchema(
    z.object({
      route: z.string().describe('Rota para verificar'),
      baselineSize: z.number().describe('Tamanho esperado do HTML em bytes (baseline)').optional(),
    })
  ),
  execute: async ({ route, baselineSize }) => {
    const baseUrl = getBaseUrl();
    try {
      const res = await fetch(`${baseUrl}${route}`);
      if (!res.ok) return { error: `Route ${route} returned ${res.status}` };
      const html = await res.text();
      const currentSize = html.length;
      const hasMainContent = html.includes('<main') || html.includes('id="__next"');
      const scriptCount = (html.match(/<script/g) || []).length;
      const result: Record<string, unknown> = {
        route, currentSize, hasMainContent, scriptCount,
        timestamp: new Date().toISOString(),
      };
      if (baselineSize) {
        const diff = currentSize - baselineSize;
        const diffPercent = Math.round((diff / baselineSize) * 100);
        result.baseline = baselineSize;
        result.sizeDiff = diff;
        result.sizeDiffPercent = diffPercent;
        result.significantChange = Math.abs(diffPercent) > 20;
      }
      return result;
    } catch (error) {
      return { error: `Falha: ${error instanceof Error ? error.message : String(error)}` };
    }
  },
});

// ═══════════════════════════════════════
// DEEP SECURITY AUDIT TOOLS (Pentesting)
// ═══════════════════════════════════════

const SECURITY_HEADERS = [
  'x-frame-options',
  'x-content-type-options',
  'x-xss-protection',
  'strict-transport-security',
  'content-security-policy',
  'referrer-policy',
  'permissions-policy',
] as const;

function gradeHeaders(presentCount: number, total: number): string {
  const ratio = presentCount / total;
  if (ratio >= 0.9) return 'A';
  if (ratio >= 0.75) return 'B';
  if (ratio >= 0.55) return 'C';
  if (ratio >= 0.35) return 'D';
  return 'F';
}

export const securityHeadersAudit = tool({
  description: 'Auditoria profunda de headers de seguranca HTTP em todas as rotas principais. Verifica X-Frame-Options, CSP, HSTS, Referrer-Policy, etc.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const routes = ['/', '/admin', '/arena', '/api/company/agents'];
    type HeaderStatus = 'present' | 'missing' | 'misconfigured';
    type RouteResult = {
      route: string;
      statusCode: number;
      headers: Record<string, { status: HeaderStatus; value: string | null; recommendation?: string }>;
      presentCount: number;
      missingCount: number;
      grade: string;
    };

    const results: RouteResult[] = [];

    for (const route of routes) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${route}`, {
          method: 'GET',
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeout);

        const headerResults: RouteResult['headers'] = {};
        let presentCount = 0;
        let missingCount = 0;

        for (const header of SECURITY_HEADERS) {
          const value = res.headers.get(header);
          if (!value) {
            missingCount++;
            const recommendations: Record<string, string> = {
              'x-frame-options': 'Adicionar: X-Frame-Options: DENY ou SAMEORIGIN',
              'x-content-type-options': 'Adicionar: X-Content-Type-Options: nosniff',
              'x-xss-protection': 'Adicionar: X-XSS-Protection: 1; mode=block',
              'strict-transport-security': 'Adicionar: Strict-Transport-Security: max-age=31536000; includeSubDomains',
              'content-security-policy': 'Adicionar CSP header com default-src restritivo',
              'referrer-policy': 'Adicionar: Referrer-Policy: strict-origin-when-cross-origin',
              'permissions-policy': 'Adicionar: Permissions-Policy: camera=(), microphone=(), geolocation=()',
            };
            headerResults[header] = {
              status: 'missing',
              value: null,
              recommendation: recommendations[header],
            };
          } else {
            // Check for misconfigurations
            let status: HeaderStatus = 'present';
            let recommendation: string | undefined;

            if (header === 'x-frame-options' && !['DENY', 'SAMEORIGIN'].includes(value.toUpperCase())) {
              status = 'misconfigured';
              recommendation = `Valor "${value}" nao e seguro. Usar DENY ou SAMEORIGIN.`;
            }
            if (header === 'strict-transport-security') {
              const maxAgeMatch = value.match(/max-age=(\d+)/);
              if (maxAgeMatch && parseInt(maxAgeMatch[1]) < 31536000) {
                status = 'misconfigured';
                recommendation = `max-age=${maxAgeMatch[1]} e muito baixo. Usar min 31536000 (1 ano).`;
              }
            }
            if (header === 'content-security-policy' && value.includes("'unsafe-inline'") && value.includes("'unsafe-eval'")) {
              status = 'misconfigured';
              recommendation = 'CSP permite unsafe-inline E unsafe-eval. Muito permissivo.';
            }

            if (status === 'present') presentCount++;
            else missingCount++;

            headerResults[header] = { status, value: value.substring(0, 200), recommendation };
          }
        }

        results.push({
          route,
          statusCode: res.status,
          headers: headerResults,
          presentCount,
          missingCount,
          grade: gradeHeaders(presentCount, SECURITY_HEADERS.length),
        });
      } catch (error) {
        results.push({
          route,
          statusCode: 0,
          headers: {},
          presentCount: 0,
          missingCount: SECURITY_HEADERS.length,
          grade: 'F',
        });
      }
    }

    // Overall grade: worst grade across routes
    const grades = results.map(r => r.grade);
    const gradeOrder = ['A', 'B', 'C', 'D', 'F'];
    const worstGrade = grades.reduce((worst, g) =>
      gradeOrder.indexOf(g) > gradeOrder.indexOf(worst) ? g : worst, 'A');

    const totalPresent = results.reduce((s, r) => s + r.presentCount, 0);
    const totalChecked = results.length * SECURITY_HEADERS.length;

    return {
      overallGrade: worstGrade,
      headerCoverage: `${totalPresent}/${totalChecked}`,
      coveragePercent: Math.round((totalPresent / totalChecked) * 100),
      routes: results,
      criticalMissing: results.flatMap(r =>
        Object.entries(r.headers)
          .filter(([, v]) => v.status === 'missing' && ['content-security-policy', 'strict-transport-security'].includes(v.value ?? ''))
          .map(([header]) => ({ route: r.route, header }))
      ),
      owaspCategory: 'A05:2021 — Security Misconfiguration',
      timestamp: new Date().toISOString(),
    };
  },
});

export const authenticationAudit = tool({
  description: 'Auditoria profunda de autenticacao: testa rotas sem auth, verifica middleware, hashing de senhas, JWT, rate limiting no login, expiracao de sessao.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());

    // 1. Test admin page without auth
    let adminNoAuth: { status: number; hasAuthRedirect: boolean; bodySnippet: string } | null = null;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${baseUrl}/admin`, {
        signal: controller.signal,
        redirect: 'manual',
      });
      clearTimeout(timeout);
      const body = await res.text();
      adminNoAuth = {
        status: res.status,
        hasAuthRedirect: res.status === 301 || res.status === 302 || res.status === 307 || body.includes('sign-in') || body.includes('login'),
        bodySnippet: body.substring(0, 500),
      };
    } catch (error) {
      adminNoAuth = { status: 0, hasAuthRedirect: false, bodySnippet: `Error: ${error instanceof Error ? error.message : String(error)}` };
    }

    // 2. Test all /api/company/* routes without auth
    const apiRoutes = [
      '/api/company/agents',
      '/api/company/costs',
      '/api/company/tasks',
      '/api/company/logs',
    ];
    const apiResults: Array<{
      route: string;
      status: number;
      returnsData: boolean;
      dataPreview: string;
      severity: string;
    }> = [];

    for (const route of apiRoutes) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${route}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        clearTimeout(timeout);
        const text = await res.text();
        let returnsData = false;
        try {
          const json = JSON.parse(text);
          returnsData = Array.isArray(json) ? json.length > 0 : Object.keys(json).length > 0;
        } catch {
          returnsData = text.length > 100;
        }
        apiResults.push({
          route,
          status: res.status,
          returnsData,
          dataPreview: text.substring(0, 300),
          severity: res.status === 200 && returnsData ? 'CRITICAL' : 'INFO',
        });
      } catch (error) {
        apiResults.push({
          route,
          status: 0,
          returnsData: false,
          dataPreview: `Error: ${error instanceof Error ? error.message : String(error)}`,
          severity: 'INFO',
        });
      }
    }

    // 3. Check for auth middleware
    let middlewareAnalysis: { exists: boolean; path: string | null; content: string | null } = {
      exists: false,
      path: null,
      content: null,
    };
    const middlewarePaths = ['middleware.ts', 'middleware.js', 'src/middleware.ts', 'src/middleware.js'];
    for (const mp of middlewarePaths) {
      try {
        const fullPath = path.join(projectDir, mp);
        const content = readFileSync(fullPath, 'utf-8');
        middlewareAnalysis = {
          exists: true,
          path: mp,
          content: content.substring(0, 2000),
        };
        break;
      } catch {
        // file not found, continue
      }
    }

    // 4. Check password hashing (look for bcrypt, argon2, SHA in source)
    let hashingMethod = 'UNKNOWN';
    let hashingDetails = '';
    try {
      const bcryptCheck = execSync(
        'grep -rl "bcrypt\\|argon2\\|scrypt" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      const shaCheck = execSync(
        'grep -rl "createHash.*sha\\|SHA-256\\|SHA256" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();

      if (bcryptCheck) {
        hashingMethod = 'bcrypt/argon2 (SEGURO)';
        hashingDetails = `Encontrado em: ${bcryptCheck.split('\n').slice(0, 3).join(', ')}`;
      } else if (shaCheck) {
        hashingMethod = 'SHA (FRACO — sem salt/iterations adequados)';
        hashingDetails = `Encontrado em: ${shaCheck.split('\n').slice(0, 3).join(', ')}`;
      } else {
        hashingMethod = 'NAO ENCONTRADO — verificar se auth e delegada (ex: NextAuth, Clerk, Supabase)';
      }
    } catch {
      hashingMethod = 'Erro ao verificar';
    }

    // 5. Check for session/auth config
    let authConfigFindings: string[] = [];
    try {
      const authFiles = execSync(
        'grep -rl "NextAuth\\|getServerSession\\|createClient\\|clerk\\|supabase.*auth\\|jwt.*secret\\|SESSION" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (authFiles) {
        authConfigFindings = authFiles.split('\n').filter(Boolean).slice(0, 10);
      }
    } catch {
      // no results
    }

    // 6. Check for JWT usage
    let jwtAnalysis = 'Nenhum uso de JWT encontrado no codebase';
    try {
      const jwtCheck = execSync(
        'grep -rn "jsonwebtoken\\|jose\\|jwt\\.sign\\|jwt\\.verify\\|JWT_SECRET" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (jwtCheck) {
        jwtAnalysis = jwtCheck.split('\n').slice(0, 5).join('\n');
      }
    } catch {
      // no results
    }

    const unprotectedRoutes = apiResults.filter(r => r.status === 200 && r.returnsData);
    const criticalCount = unprotectedRoutes.length;

    return {
      overallRisk: criticalCount > 2 ? 'CRITICAL' : criticalCount > 0 ? 'HIGH' : 'LOW',
      adminPageWithoutAuth: adminNoAuth,
      apiRoutesWithoutAuth: apiResults,
      unprotectedApiCount: unprotectedRoutes.length,
      middleware: middlewareAnalysis,
      passwordHashing: { method: hashingMethod, details: hashingDetails },
      jwtUsage: jwtAnalysis,
      authConfigFiles: authConfigFindings,
      findings: [
        ...(adminNoAuth && !adminNoAuth.hasAuthRedirect
          ? ['CRITICAL: /admin acessivel sem autenticacao (status ' + adminNoAuth.status + ')']
          : []),
        ...unprotectedRoutes.map(r => `CRITICAL: ${r.route} retorna dados sem autenticacao (${r.status})`),
        ...(!middlewareAnalysis.exists ? ['HIGH: Nenhum middleware.ts encontrado — sem protecao de rotas global'] : []),
        ...(hashingMethod.includes('SHA') ? ['HIGH: Hashing de senhas usa SHA (fraco). Migrar para bcrypt/argon2.'] : []),
      ],
      owaspCategory: 'A01:2021 — Broken Access Control / A07:2021 — Identification and Authentication Failures',
      timestamp: new Date().toISOString(),
    };
  },
});

export const injectionAudit = tool({
  description: 'Testes de SQL injection e XSS em endpoints. Usa payloads SEGUROS (nao destrutivos). Verifica uso de raw SQL no codebase.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());

    // 1. SQL Injection tests with SAFE payloads (read-only, non-destructive)
    const sqliPayloads = [
      "' OR '1'='1",
      "1; SELECT 1--",
      "' UNION SELECT NULL--",
      "1' AND '1'='1",
      "admin'--",
    ];

    const sqliEndpoints = [
      { route: '/api/fighters', param: 'name' },
      { route: '/api/company/agents', param: 'id' },
    ];

    type InjectionResult = {
      endpoint: string;
      payload: string;
      status: number;
      suspicious: boolean;
      reason: string;
    };

    const sqliResults: InjectionResult[] = [];

    for (const ep of sqliEndpoints) {
      for (const payload of sqliPayloads) {
        try {
          const url = `${baseUrl}${ep.route}?${ep.param}=${encodeURIComponent(payload)}`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          const text = await res.text();

          // Check for SQL error messages in response (sign of vulnerability)
          const sqlErrorPatterns = [
            'syntax error', 'sql', 'postgresql', 'pg_', 'unterminated',
            'column', 'relation', 'ERROR:', 'DETAIL:', 'HINT:',
          ];
          const hasSqlError = sqlErrorPatterns.some(p => text.toLowerCase().includes(p));

          sqliResults.push({
            endpoint: `${ep.route}?${ep.param}=${payload}`,
            payload,
            status: res.status,
            suspicious: hasSqlError,
            reason: hasSqlError
              ? 'RESPOSTA CONTEM ERRO SQL — possivel vazamento de info'
              : res.status === 500
                ? 'Server error (500) — possivel SQL nao tratado'
                : 'Resposta normal — provavelmente seguro',
          });
        } catch (error) {
          sqliResults.push({
            endpoint: `${ep.route}?${ep.param}=${payload}`,
            payload,
            status: 0,
            suspicious: false,
            reason: `Timeout/erro: ${error instanceof Error ? error.message : String(error)}`,
          });
        }
      }
    }

    // 2. XSS tests
    const xssPayloads = [
      '<script>alert(1)</script>',
      '"><img src=x onerror=alert(1)>',
      "javascript:alert('XSS')",
      '<svg/onload=alert(1)>',
    ];

    const xssResults: InjectionResult[] = [];

    for (const payload of xssPayloads) {
      try {
        const url = `${baseUrl}/api/fighters?name=${encodeURIComponent(payload)}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        const text = await res.text();

        // Check if XSS payload is reflected without encoding
        const reflected = text.includes(payload) || text.includes(payload.replace(/"/g, '&quot;'));

        xssResults.push({
          endpoint: `/api/fighters?name=XSS_PAYLOAD`,
          payload: payload.substring(0, 50),
          status: res.status,
          suspicious: reflected,
          reason: reflected
            ? 'CRITICO: Payload XSS refletido na resposta sem sanitizacao'
            : 'Payload nao refletido — provavelmente seguro',
        });
      } catch (error) {
        xssResults.push({
          endpoint: '/api/fighters?name=XSS_PAYLOAD',
          payload: payload.substring(0, 50),
          status: 0,
          suspicious: false,
          reason: `Timeout/erro: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
    }

    // 3. Check for raw SQL in codebase
    let rawSqlLocations: string[] = [];
    try {
      const rawSqlCheck = execSync(
        'grep -rn "\\$queryRaw\\|\\$executeRaw\\|query(\\`\\|query(\"\\|query(\'\\|.query(" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (rawSqlCheck) {
        rawSqlLocations = rawSqlCheck.split('\n').filter(Boolean).slice(0, 20);
      }
    } catch {
      // no results
    }

    // 4. Check if Prisma is used consistently
    let prismaUsage = 'Nao detectado';
    try {
      const prismaCheck = execSync(
        'grep -rl "prisma\\." src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      prismaUsage = `${prismaCheck} arquivos usam Prisma Client`;
    } catch {
      // error
    }

    const suspiciousSqli = sqliResults.filter(r => r.suspicious);
    const suspiciousXss = xssResults.filter(r => r.suspicious);

    return {
      overallRisk: suspiciousSqli.length > 0 || suspiciousXss.length > 0 ? 'CRITICAL' : rawSqlLocations.length > 0 ? 'MEDIUM' : 'LOW',
      sqlInjection: {
        testCount: sqliResults.length,
        suspiciousResponses: suspiciousSqli.length,
        results: sqliResults,
      },
      xss: {
        testCount: xssResults.length,
        reflectedPayloads: suspiciousXss.length,
        results: xssResults,
      },
      rawSqlInCodebase: {
        count: rawSqlLocations.length,
        locations: rawSqlLocations,
        risk: rawSqlLocations.length > 0 ? 'MEDIUM — raw SQL deve usar parametrizacao' : 'LOW — nenhum raw SQL encontrado',
      },
      prismaUsage,
      findings: [
        ...suspiciousSqli.map(r => `CRITICAL: Possivel SQLi em ${r.endpoint}`),
        ...suspiciousXss.map(r => `CRITICAL: XSS refletido em ${r.endpoint}`),
        ...(rawSqlLocations.length > 0 ? [`MEDIUM: ${rawSqlLocations.length} usos de raw SQL encontrados — verificar parametrizacao`] : []),
      ],
      owaspCategory: 'A03:2021 — Injection',
      timestamp: new Date().toISOString(),
    };
  },
});

export const exposedDataAudit = tool({
  description: 'Verificar vazamento de dados sensiveis: APIs sem auth, .env acessivel, stack traces expostos, source maps disponiveis.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();

    // 1. Test API endpoints without auth for data leaks
    const sensitiveRoutes = [
      { route: '/api/company/agents', dataType: 'dados de agentes e system prompts' },
      { route: '/api/company/costs', dataType: 'dados financeiros/custos' },
      { route: '/api/company/tasks', dataType: 'historico de tarefas' },
      { route: '/api/company/logs', dataType: 'logs internos do sistema' },
    ];

    type DataLeakResult = {
      route: string;
      dataType: string;
      status: number;
      leaksData: boolean;
      dataSize: number;
      exposedFields: string[];
      severity: string;
    };

    const dataLeaks: DataLeakResult[] = [];

    for (const sr of sensitiveRoutes) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${sr.route}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        clearTimeout(timeout);
        const text = await res.text();
        let exposedFields: string[] = [];
        let leaksData = false;

        try {
          const json = JSON.parse(text);
          const data = Array.isArray(json) ? json[0] : json;
          if (data && typeof data === 'object') {
            exposedFields = Object.keys(data).slice(0, 20);
            leaksData = exposedFields.length > 0 && res.status === 200;
          }
        } catch {
          leaksData = text.length > 200 && res.status === 200;
        }

        // Check for sensitive fields
        const sensitiveFieldPatterns = ['systemPrompt', 'password', 'secret', 'apiKey', 'token', 'hash', 'cost', 'price', 'amount'];
        const hasSensitiveFields = exposedFields.some(f =>
          sensitiveFieldPatterns.some(p => f.toLowerCase().includes(p.toLowerCase()))
        );

        dataLeaks.push({
          route: sr.route,
          dataType: sr.dataType,
          status: res.status,
          leaksData,
          dataSize: text.length,
          exposedFields,
          severity: hasSensitiveFields ? 'CRITICAL' : leaksData ? 'HIGH' : 'INFO',
        });
      } catch (error) {
        dataLeaks.push({
          route: sr.route,
          dataType: sr.dataType,
          status: 0,
          leaksData: false,
          dataSize: 0,
          exposedFields: [],
          severity: 'INFO',
        });
      }
    }

    // 2. Check if .env files accessible via HTTP
    const envFiles = ['/.env', '/.env.local', '/.env.production'];
    const envResults: Array<{ file: string; accessible: boolean; status: number }> = [];

    for (const envFile of envFiles) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`${baseUrl}${envFile}`, {
          signal: controller.signal,
          redirect: 'manual',
        });
        clearTimeout(timeout);
        const text = await res.text();
        const accessible = res.status === 200 && (text.includes('=') || text.includes('API') || text.includes('SECRET'));
        envResults.push({ file: envFile, accessible, status: res.status });
      } catch {
        envResults.push({ file: envFile, accessible: false, status: 0 });
      }
    }

    // 3. Check for stack traces on error
    let stackTraceExposed = false;
    let stackTraceDetails = '';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${baseUrl}/api/company/nonexistent-endpoint-test-12345`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const text = await res.text();
      stackTraceExposed = text.includes('at ') && (text.includes('.ts:') || text.includes('.js:') || text.includes('node_modules'));
      stackTraceDetails = stackTraceExposed ? text.substring(0, 500) : 'Nenhum stack trace exposto';
    } catch {
      stackTraceDetails = 'Endpoint nao acessivel';
    }

    // 4. Check for source maps
    let sourceMapsExposed = false;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const mainPage = await fetch(`${baseUrl}/`, { signal: controller.signal });
      clearTimeout(timeout);
      const html = await mainPage.text();
      const jsFiles = html.match(/\/_next\/static\/[^"']+\.js/g) || [];
      if (jsFiles.length > 0) {
        const mapUrl = `${baseUrl}${jsFiles[0]}.map`;
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 3000);
        const mapRes = await fetch(mapUrl, { signal: controller2.signal });
        clearTimeout(timeout2);
        sourceMapsExposed = mapRes.status === 200;
      }
    } catch {
      // source map check failed
    }

    const criticalLeaks = dataLeaks.filter(r => r.severity === 'CRITICAL');
    const highLeaks = dataLeaks.filter(r => r.severity === 'HIGH');
    const envExposed = envResults.filter(r => r.accessible);

    return {
      overallRisk: criticalLeaks.length > 0 || envExposed.length > 0 ? 'CRITICAL'
        : highLeaks.length > 0 || stackTraceExposed ? 'HIGH'
        : sourceMapsExposed ? 'MEDIUM' : 'LOW',
      apiDataLeaks: dataLeaks,
      envFileExposure: envResults,
      stackTraceExposure: { exposed: stackTraceExposed, details: stackTraceDetails },
      sourceMaps: { exposed: sourceMapsExposed, risk: sourceMapsExposed ? 'MEDIUM — atacante pode ler codigo fonte' : 'Nao exposto' },
      findings: [
        ...criticalLeaks.map(r => `CRITICAL: ${r.route} expoe ${r.dataType} com campos sensiveis (${r.exposedFields.slice(0, 5).join(', ')})`),
        ...highLeaks.map(r => `HIGH: ${r.route} retorna dados sem autenticacao (${r.dataSize} bytes)`),
        ...envExposed.map(r => `CRITICAL: ${r.file} acessivel via HTTP!`),
        ...(stackTraceExposed ? ['HIGH: Stack traces expostos em respostas de erro'] : []),
        ...(sourceMapsExposed ? ['MEDIUM: Source maps disponiveis — codigo fonte acessivel'] : []),
      ],
      owaspCategory: 'A01:2021 — Broken Access Control / A04:2021 — Insecure Design',
      timestamp: new Date().toISOString(),
    };
  },
});

export const rateLimitAudit = tool({
  description: 'Teste de rate limiting: envia multiplas requisicoes rapidas para verificar se ha protecao contra abuso. Usa AbortController com timeouts.',
  inputSchema: zodSchema(
    z.object({
      targetEndpoint: z.string().describe('Endpoint para testar (default: /api/company/agents)').optional(),
      requestCount: z.number().describe('Numero de requisicoes (default: 50, max: 100)').optional(),
    })
  ),
  execute: async ({ targetEndpoint, requestCount }) => {
    const baseUrl = getBaseUrl();
    const endpoint = targetEndpoint || '/api/company/agents';
    const count = Math.min(requestCount || 50, 100);
    const projectDir = path.resolve(process.cwd());

    // 1. Rapid-fire requests
    const url = `${baseUrl}${endpoint}`;
    const startTime = Date.now();
    const results: Array<{ index: number; status: number; latencyMs: number; rateLimited: boolean }> = [];

    const promises = Array.from({ length: count }, (_, i) => {
      return (async () => {
        const reqStart = Date.now();
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          const latencyMs = Date.now() - reqStart;
          const rateLimited = res.status === 429 || res.status === 503;
          results.push({ index: i, status: res.status, latencyMs, rateLimited });
        } catch (error) {
          const latencyMs = Date.now() - reqStart;
          results.push({ index: i, status: 0, latencyMs, rateLimited: false });
        }
      })();
    });

    await Promise.all(promises);
    const totalTime = Date.now() - startTime;

    // Sort by index for proper ordering
    results.sort((a, b) => a.index - b.index);

    const rateLimitedCount = results.filter(r => r.rateLimited).length;
    const errorCount = results.filter(r => r.status === 0 || r.status >= 500).length;
    const successCount = results.filter(r => r.status === 200).length;
    const avgLatency = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.latencyMs, 0) / results.length) : 0;

    // 2. Check for rate-limiting middleware in codebase
    let rateLimitMiddleware: string[] = [];
    try {
      const rlCheck = execSync(
        'grep -rn "rateLimit\\|rate-limit\\|rateLimiter\\|throttle\\|too many requests\\|429" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (rlCheck) {
        rateLimitMiddleware = rlCheck.split('\n').filter(Boolean).slice(0, 10);
      }
    } catch {
      // no results
    }

    // 3. Check package.json for rate-limit deps
    let rateLimitDeps: string[] = [];
    try {
      const pkgContent = readFileSync(path.join(projectDir, 'package.json'), 'utf-8');
      const pkg = JSON.parse(pkgContent);
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      rateLimitDeps = Object.keys(allDeps).filter(d =>
        d.includes('rate') || d.includes('throttle') || d.includes('limiter')
      );
    } catch {
      // error reading package.json
    }

    // 4. Test login/auth endpoint specifically
    let loginRateLimitTest: { tested: boolean; endpoint: string; rateLimited: boolean; details: string } = {
      tested: false,
      endpoint: '',
      rateLimited: false,
      details: 'Nenhum endpoint de login encontrado para testar',
    };

    const loginEndpoints = ['/api/auth/signin', '/api/auth/callback/credentials', '/api/login'];
    for (const loginEp of loginEndpoints) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`${baseUrl}${loginEp}`, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@test.com', password: 'wrong' }),
        });
        clearTimeout(timeout);
        if (res.status !== 404) {
          // Endpoint exists, now rapid test it
          let loginRateLimited = false;
          for (let i = 0; i < 10; i++) {
            try {
              const ctrl = new AbortController();
              const to = setTimeout(() => ctrl.abort(), 3000);
              const r = await fetch(`${baseUrl}${loginEp}`, {
                method: 'POST',
                signal: ctrl.signal,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@test.com', password: 'wrong' }),
              });
              clearTimeout(to);
              if (r.status === 429) { loginRateLimited = true; break; }
            } catch { break; }
          }
          loginRateLimitTest = {
            tested: true,
            endpoint: loginEp,
            rateLimited: loginRateLimited,
            details: loginRateLimited
              ? 'Rate limiting DETECTADO no login'
              : 'NENHUM rate limiting no login — risco de brute force',
          };
          break;
        }
      } catch {
        // continue to next endpoint
      }
    }

    const hasRateLimit = rateLimitedCount > 0 || rateLimitMiddleware.length > 0 || rateLimitDeps.length > 0;

    return {
      overallRisk: !hasRateLimit ? 'HIGH' : 'LOW',
      rapidFireTest: {
        endpoint,
        totalRequests: count,
        totalTimeMs: totalTime,
        requestsPerSecond: Math.round((count / totalTime) * 1000),
        successCount,
        rateLimitedCount,
        errorCount,
        avgLatencyMs: avgLatency,
        wasRateLimited: rateLimitedCount > 0,
        statusDistribution: results.reduce((acc, r) => {
          const key = String(r.status);
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      },
      loginEndpointTest: loginRateLimitTest,
      codebaseAnalysis: {
        rateLimitMiddleware,
        rateLimitDependencies: rateLimitDeps,
        hasRateLimitCode: rateLimitMiddleware.length > 0,
        hasRateLimitDeps: rateLimitDeps.length > 0,
      },
      findings: [
        ...(rateLimitedCount === 0 ? [`HIGH: ${count} requisicoes rapidas aceitas sem rate limiting em ${endpoint}`] : []),
        ...(rateLimitMiddleware.length === 0 ? ['HIGH: Nenhum middleware de rate limiting encontrado no codebase'] : []),
        ...(rateLimitDeps.length === 0 ? ['MEDIUM: Nenhuma dependencia de rate limiting no package.json'] : []),
        ...(loginRateLimitTest.tested && !loginRateLimitTest.rateLimited
          ? ['CRITICAL: Login endpoint sem rate limiting — vulneravel a brute force']
          : []),
      ],
      owaspCategory: 'A04:2021 — Insecure Design',
      timestamp: new Date().toISOString(),
    };
  },
});

export const fileExposureAudit = tool({
  description: 'Verificar exposicao de arquivos sensiveis via HTTP: .env, .git, package.json, prisma schema, configs.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();

    const sensitiveFiles = [
      { path: '/.env', severity: 'CRITICAL', description: 'Variaveis de ambiente com secrets' },
      { path: '/.env.local', severity: 'CRITICAL', description: 'Variaveis locais com secrets' },
      { path: '/.env.production', severity: 'CRITICAL', description: 'Variaveis de producao' },
      { path: '/package.json', severity: 'MEDIUM', description: 'Dependencias e versoes do projeto' },
      { path: '/package-lock.json', severity: 'LOW', description: 'Lock file com versoes exatas' },
      { path: '/prisma/schema.prisma', severity: 'HIGH', description: 'Schema do banco de dados' },
      { path: '/.git/config', severity: 'CRITICAL', description: 'Config do Git com possiveis tokens' },
      { path: '/.git/HEAD', severity: 'HIGH', description: 'Referencia do Git — confirma .git exposto' },
      { path: '/tsconfig.json', severity: 'LOW', description: 'Config TypeScript' },
      { path: '/next.config.js', severity: 'MEDIUM', description: 'Config Next.js com possiveis secrets' },
      { path: '/next.config.mjs', severity: 'MEDIUM', description: 'Config Next.js (ESM)' },
      { path: '/next.config.ts', severity: 'MEDIUM', description: 'Config Next.js (TS)' },
      { path: '/.npmrc', severity: 'HIGH', description: 'Config npm com possiveis tokens de registry' },
      { path: '/docker-compose.yml', severity: 'MEDIUM', description: 'Config Docker com possiveis secrets' },
      { path: '/.dockerenv', severity: 'LOW', description: 'Indica ambiente Docker' },
    ];

    type FileResult = {
      path: string;
      severity: string;
      description: string;
      accessible: boolean;
      status: number;
      contentPreview: string;
      contentLength: number;
    };

    const results: FileResult[] = [];

    for (const sf of sensitiveFiles) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`${baseUrl}${sf.path}`, {
          signal: controller.signal,
          redirect: 'manual',
        });
        clearTimeout(timeout);
        const text = await res.text();

        // A file is considered "accessible" if it returns 200 and has meaningful content
        // Next.js might return 200 with HTML for any route (SPA fallback), so check content type
        const contentType = res.headers.get('content-type') || '';
        const isHtmlFallback = contentType.includes('text/html') && text.includes('<!DOCTYPE') && !sf.path.endsWith('.html');
        const accessible = res.status === 200 && !isHtmlFallback && text.length > 0;

        results.push({
          path: sf.path,
          severity: sf.severity,
          description: sf.description,
          accessible,
          status: res.status,
          contentPreview: accessible ? text.substring(0, 200).replace(/[\n\r]/g, ' ') : '',
          contentLength: accessible ? text.length : 0,
        });
      } catch {
        results.push({
          path: sf.path,
          severity: sf.severity,
          description: sf.description,
          accessible: false,
          status: 0,
          contentPreview: '',
          contentLength: 0,
        });
      }
    }

    const exposed = results.filter(r => r.accessible);
    const blocked = results.filter(r => !r.accessible);
    const criticalExposed = exposed.filter(r => r.severity === 'CRITICAL');

    return {
      overallRisk: criticalExposed.length > 0 ? 'CRITICAL' : exposed.length > 0 ? 'HIGH' : 'LOW',
      totalChecked: results.length,
      exposedFiles: exposed,
      blockedFiles: blocked.map(r => ({ path: r.path, status: r.status })),
      summary: {
        exposed: exposed.length,
        blocked: blocked.length,
        criticalExposed: criticalExposed.length,
      },
      findings: [
        ...criticalExposed.map(r => `CRITICAL: ${r.path} acessivel via HTTP — ${r.description}`),
        ...exposed.filter(r => r.severity !== 'CRITICAL').map(r => `${r.severity}: ${r.path} acessivel — ${r.description}`),
        ...(exposed.length === 0 ? ['INFO: Nenhum arquivo sensivel exposto via HTTP'] : []),
      ],
      owaspCategory: 'A05:2021 — Security Misconfiguration',
      timestamp: new Date().toISOString(),
    };
  },
});

export const corsAndCsrfAudit = tool({
  description: 'Auditoria de CORS e CSRF: testa requisicoes cross-origin, verifica headers Access-Control, valida protecao CSRF em operacoes de escrita.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();

    // 1. CORS tests — send requests with evil Origin
    const testOrigins = [
      'https://evil-site.com',
      'https://attacker.example.com',
      'null',
    ];

    const corsEndpoints = [
      '/api/company/agents',
      '/api/company/tasks',
    ];

    type CorsResult = {
      endpoint: string;
      origin: string;
      allowOrigin: string | null;
      allowCredentials: string | null;
      allowMethods: string | null;
      vulnerable: boolean;
      reason: string;
    };

    const corsResults: CorsResult[] = [];

    for (const endpoint of corsEndpoints) {
      for (const origin of testOrigins) {
        try {
          // Preflight OPTIONS request
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000);
          const optionsRes = await fetch(`${baseUrl}${endpoint}`, {
            method: 'OPTIONS',
            signal: controller.signal,
            headers: {
              Origin: origin,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'Content-Type',
            },
          });
          clearTimeout(timeout);

          const acao = optionsRes.headers.get('access-control-allow-origin');
          const acac = optionsRes.headers.get('access-control-allow-credentials');
          const acam = optionsRes.headers.get('access-control-allow-methods');

          // Also test with GET
          const controller2 = new AbortController();
          const timeout2 = setTimeout(() => controller2.abort(), 5000);
          const getRes = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            signal: controller2.signal,
            headers: { Origin: origin },
          });
          clearTimeout(timeout2);

          const getAcao = getRes.headers.get('access-control-allow-origin');
          const effectiveAcao = acao || getAcao;

          const vulnerable = effectiveAcao === '*' || effectiveAcao === origin ||
            (effectiveAcao === 'null' && origin === 'null');

          corsResults.push({
            endpoint,
            origin,
            allowOrigin: effectiveAcao,
            allowCredentials: acac,
            allowMethods: acam,
            vulnerable,
            reason: vulnerable
              ? effectiveAcao === '*'
                ? 'CORS permite qualquer origem (*)'
                : `CORS reflete origem maliciosa: ${origin}`
              : 'CORS configurado corretamente ou sem header',
          });
        } catch (error) {
          corsResults.push({
            endpoint,
            origin,
            allowOrigin: null,
            allowCredentials: null,
            allowMethods: null,
            vulnerable: false,
            reason: `Erro: ${error instanceof Error ? error.message : String(error)}`,
          });
        }
      }
    }

    // 2. CSRF tests — check if state-changing operations require CSRF tokens
    const csrfEndpoints = [
      { method: 'POST', route: '/api/company/agents' },
      { method: 'PATCH', route: '/api/company/agents' },
      { method: 'DELETE', route: '/api/company/agents' },
      { method: 'POST', route: '/api/company/tasks' },
    ];

    type CsrfResult = {
      method: string;
      route: string;
      status: number;
      acceptsWithoutCsrf: boolean;
      hasCsrfHeader: boolean;
      severity: string;
    };

    const csrfResults: CsrfResult[] = [];

    for (const ep of csrfEndpoints) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${ep.route}`, {
          method: ep.method,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://evil-site.com',
          },
          body: JSON.stringify({ test: true }),
        });
        clearTimeout(timeout);

        // Check if there's any CSRF protection
        const csrfHeaderRequired = res.status === 403 && (
          (await res.text()).toLowerCase().includes('csrf') ||
          (await res.clone().text()).toLowerCase().includes('forbidden')
        );

        csrfResults.push({
          method: ep.method,
          route: ep.route,
          status: res.status,
          acceptsWithoutCsrf: res.status !== 403 && res.status !== 401,
          hasCsrfHeader: csrfHeaderRequired,
          severity: res.status !== 403 && res.status !== 401 ? 'HIGH' : 'INFO',
        });
      } catch (error) {
        csrfResults.push({
          method: ep.method,
          route: ep.route,
          status: 0,
          acceptsWithoutCsrf: false,
          hasCsrfHeader: false,
          severity: 'INFO',
        });
      }
    }

    // 3. Check for CSRF middleware in codebase
    const projectDir = path.resolve(process.cwd());
    let csrfCodeFindings: string[] = [];
    try {
      const csrfCheck = execSync(
        'grep -rn "csrf\\|CSRF\\|xsrf\\|XSRF\\|csrfToken\\|_csrf" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (csrfCheck) {
        csrfCodeFindings = csrfCheck.split('\n').filter(Boolean).slice(0, 10);
      }
    } catch {
      // no results
    }

    const corsVulnerable = corsResults.filter(r => r.vulnerable);
    const csrfVulnerable = csrfResults.filter(r => r.acceptsWithoutCsrf);

    return {
      overallRisk: corsVulnerable.length > 0 && csrfVulnerable.length > 0 ? 'CRITICAL'
        : corsVulnerable.length > 0 || csrfVulnerable.length > 0 ? 'HIGH' : 'LOW',
      cors: {
        testCount: corsResults.length,
        vulnerableCount: corsVulnerable.length,
        results: corsResults,
      },
      csrf: {
        testCount: csrfResults.length,
        vulnerableCount: csrfVulnerable.length,
        results: csrfResults,
        codebaseFindings: csrfCodeFindings,
        hasCsrfProtection: csrfCodeFindings.length > 0,
      },
      findings: [
        ...corsVulnerable.map(r => `HIGH: CORS vulneravel em ${r.endpoint} — ${r.reason}`),
        ...csrfVulnerable.map(r => `HIGH: ${r.method} ${r.route} aceita requisicao sem CSRF token (status ${r.status})`),
        ...(csrfCodeFindings.length === 0 ? ['MEDIUM: Nenhuma protecao CSRF encontrada no codebase'] : []),
      ],
      owaspCategory: 'A01:2021 — Broken Access Control',
      timestamp: new Date().toISOString(),
    };
  },
});

export const fullSecurityScan = tool({
  description: 'Varredura completa de seguranca: executa TODOS os audits (headers, auth, injection, dados, rate limit, arquivos, CORS/CSRF) em paralelo. Retorna relatorio consolidado com score 0-100 e top findings.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const scanStart = Date.now();

    // Run all audits in parallel
    const [
      headersResult,
      authResult,
      injectionResult,
      dataResult,
      rateLimitResult,
      fileResult,
      corsResult,
    ] = await Promise.all([
      securityHeadersAudit.execute!({}, { messages: [], toolCallId: 'scan-headers', abortSignal: undefined as unknown as AbortSignal }),
      authenticationAudit.execute!({}, { messages: [], toolCallId: 'scan-auth', abortSignal: undefined as unknown as AbortSignal }),
      injectionAudit.execute!({}, { messages: [], toolCallId: 'scan-injection', abortSignal: undefined as unknown as AbortSignal }),
      exposedDataAudit.execute!({}, { messages: [], toolCallId: 'scan-data', abortSignal: undefined as unknown as AbortSignal }),
      rateLimitAudit.execute!({}, { messages: [], toolCallId: 'scan-ratelimit', abortSignal: undefined as unknown as AbortSignal }),
      fileExposureAudit.execute!({}, { messages: [], toolCallId: 'scan-files', abortSignal: undefined as unknown as AbortSignal }),
      corsAndCsrfAudit.execute!({}, { messages: [], toolCallId: 'scan-cors', abortSignal: undefined as unknown as AbortSignal }),
    ]);

    const scanDuration = Date.now() - scanStart;

    // Collect all findings with severity
    type Finding = { severity: string; category: string; description: string };
    const allFindings: Finding[] = [];

    const extractFindings = (result: Record<string, unknown>, category: string) => {
      const findings = result.findings as string[] | undefined;
      if (!findings) return;
      for (const f of findings) {
        let severity = 'INFO';
        if (f.startsWith('CRITICAL')) severity = 'CRITICAL';
        else if (f.startsWith('HIGH')) severity = 'HIGH';
        else if (f.startsWith('MEDIUM')) severity = 'MEDIUM';
        else if (f.startsWith('LOW')) severity = 'LOW';
        allFindings.push({ severity, category, description: f });
      }
    };

    extractFindings(headersResult as Record<string, unknown>, 'Security Headers');
    extractFindings(authResult as Record<string, unknown>, 'Authentication');
    extractFindings(injectionResult as Record<string, unknown>, 'Injection');
    extractFindings(dataResult as Record<string, unknown>, 'Data Exposure');
    extractFindings(rateLimitResult as Record<string, unknown>, 'Rate Limiting');
    extractFindings(fileResult as Record<string, unknown>, 'File Exposure');
    extractFindings(corsResult as Record<string, unknown>, 'CORS/CSRF');

    // Calculate security score (0-100)
    const severityWeights: Record<string, number> = {
      CRITICAL: 20,
      HIGH: 10,
      MEDIUM: 5,
      LOW: 2,
      INFO: 0,
    };
    const totalPenalty = allFindings.reduce((sum, f) => sum + (severityWeights[f.severity] || 0), 0);
    const securityScore = Math.max(0, 100 - totalPenalty);

    // Sort findings by severity
    const severityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'];
    allFindings.sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity));

    // Count by severity
    const findingCounts = allFindings.reduce((acc, f) => {
      acc[f.severity] = (acc[f.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Top 5 findings with remediation
    const remediations: Record<string, string> = {
      'CORS': `// next.config.ts — restringir origens
headers: [{ source: '/api/:path*', headers: [
  { key: 'Access-Control-Allow-Origin', value: 'https://seu-dominio.com' },
  { key: 'Access-Control-Allow-Methods', value: 'GET,POST' },
]}]`,
      'rate limit': `// middleware.ts — adicionar rate limiting
import rateLimit from 'express-rate-limit';
// Ou usar Vercel Edge: import { Ratelimit } from '@upstash/ratelimit'`,
      'autenticacao': `// middleware.ts — proteger rotas /api/company/*
export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/api/company'))
    return validateAuth(req) || NextResponse.json({error:'Unauthorized'}, {status:401});
}`,
      'CSRF': `// Usar next-csrf ou verificar Origin header
import { csrf } from 'next-csrf';
const { csrfToken, validate } = csrf();`,
      'headers': `// next.config.ts — adicionar security headers
headers: [{ source: '/:path*', headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]}]`,
      '.env': 'Verificar configuracao do servidor — .env NUNCA deve ser servido via HTTP',
      'stack trace': 'Configurar NODE_ENV=production e error handlers que nao exponham detalhes internos',
      'source map': `// next.config.ts
productionBrowserSourceMaps: false,`,
    };

    const top5 = allFindings.slice(0, 5).map(f => {
      const matchedKey = Object.keys(remediations).find(k => f.description.toLowerCase().includes(k.toLowerCase()));
      return {
        ...f,
        remediation: matchedKey ? remediations[matchedKey] : 'Verificar documentacao OWASP para remediacoes especificas',
      };
    });

    // Risk level per audit
    const getRisk = (r: Record<string, unknown>) => (r.overallRisk as string) || 'UNKNOWN';

    return {
      securityScore,
      scoreLabel: securityScore >= 80 ? 'BOM' : securityScore >= 60 ? 'ADEQUADO' : securityScore >= 40 ? 'PREOCUPANTE' : 'CRITICO',
      scanDurationMs: scanDuration,
      totalFindings: allFindings.length,
      findingCounts,
      riskByCategory: {
        securityHeaders: getRisk(headersResult as Record<string, unknown>),
        authentication: getRisk(authResult as Record<string, unknown>),
        injection: getRisk(injectionResult as Record<string, unknown>),
        dataExposure: getRisk(dataResult as Record<string, unknown>),
        rateLimiting: getRisk(rateLimitResult as Record<string, unknown>),
        fileExposure: getRisk(fileResult as Record<string, unknown>),
        corsCsrf: getRisk(corsResult as Record<string, unknown>),
      },
      top5Findings: top5,
      allFindings,
      detailedResults: {
        securityHeaders: headersResult,
        authentication: authResult,
        injection: injectionResult,
        dataExposure: dataResult,
        rateLimiting: rateLimitResult,
        fileExposure: fileResult,
        corsCsrf: corsResult,
      },
      owaspMapping: {
        'A01:Broken Access Control': ['authentication', 'corsCsrf', 'dataExposure'],
        'A02:Cryptographic Failures': ['authentication'],
        'A03:Injection': ['injection'],
        'A04:Insecure Design': ['rateLimiting'],
        'A05:Security Misconfiguration': ['securityHeaders', 'fileExposure'],
      },
      timestamp: new Date().toISOString(),
    };
  },
});

// ═══════════════════════════════════════
// ADVANCED SECURITY TESTING TOOLS (Pentesting Avancado)
// ═══════════════════════════════════════

export const owaspZapStyleScan = tool({
  description: 'Varredura automatizada estilo OWASP ZAP: testa payloads de ataque em todos os endpoints da API. Categoriza por OWASP Top 10 (A01-A10). Payloads SEGUROS — detecta por resposta, nao explora.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());

    // 1. Discover all API routes from filesystem
    let apiRoutes: string[] = [];
    try {
      const routeFiles = execSync(
        'find src/app/api -name "route.ts" -type f 2>/dev/null',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (routeFiles) {
        apiRoutes = routeFiles.split('\n').filter(Boolean).map(f => {
          // Convert src/app/api/noticias/[id]/route.ts → /api/noticias/test-id
          return f
            .replace('src/app', '')
            .replace('/route.ts', '')
            .replace(/\[([^\]]+)\]/g, 'test-id');
        });
      }
    } catch { /* empty */ }

    // Limit to first 15 routes for performance
    const testRoutes = apiRoutes.slice(0, 15);

    type VulnFinding = {
      endpoint: string;
      attackType: string;
      payload: string;
      status: number;
      vulnerable: boolean;
      evidence: string;
      owaspCategory: string;
    };

    const findings: VulnFinding[] = [];
    const owaspCategories: Record<string, number> = {};

    // Attack payloads by category
    const attacks: Array<{
      name: string;
      owaspId: string;
      payloads: Array<{ method: string; path: string; body?: string }>;
      detect: (status: number, body: string) => { vulnerable: boolean; evidence: string };
    }> = [
      {
        name: 'Path Traversal',
        owaspId: 'A01 — Broken Access Control',
        payloads: [
          { method: 'GET', path: '?file=../../etc/passwd' },
          { method: 'GET', path: '?path=..%2F..%2Fetc%2Fpasswd' },
          { method: 'GET', path: '?id=../../../package.json' },
        ],
        detect: (_status, body) => {
          const vulnerable = body.includes('root:') || body.includes('"dependencies"') || body.includes('/bin/bash');
          return { vulnerable, evidence: vulnerable ? 'Conteudo de arquivo local retornado' : 'Bloqueado ou ignorado' };
        },
      },
      {
        name: 'Command Injection',
        owaspId: 'A03 — Injection',
        payloads: [
          { method: 'GET', path: '?cmd=;ls' },
          { method: 'GET', path: '?name=test|cat /etc/hostname' },
          { method: 'GET', path: '?q=$(whoami)' },
        ],
        detect: (status, body) => {
          const cmdPatterns = ['node_modules', 'src/', 'package.json', 'root', 'admin'];
          const suspicious = status === 200 && cmdPatterns.some(p => body.includes(p)) && body.length < 500;
          return { vulnerable: suspicious, evidence: suspicious ? 'Possivel execucao de comando detectada' : 'Sem evidencia de execucao' };
        },
      },
      {
        name: 'SSRF',
        owaspId: 'A10 — Server-Side Request Forgery',
        payloads: [
          { method: 'GET', path: '?url=http://169.254.169.254/latest/meta-data/' },
          { method: 'GET', path: '?redirect=http://localhost:5432' },
          { method: 'POST', path: '', body: JSON.stringify({ url: 'http://127.0.0.1:22' }) },
        ],
        detect: (_status, body) => {
          const metadataPatterns = ['ami-id', 'instance-id', 'iam', 'security-credentials'];
          const vulnerable = metadataPatterns.some(p => body.toLowerCase().includes(p));
          return { vulnerable, evidence: vulnerable ? 'Resposta contem dados de metadata — SSRF confirmado' : 'Sem evidencia de SSRF' };
        },
      },
      {
        name: 'Open Redirect',
        owaspId: 'A01 — Broken Access Control',
        payloads: [
          { method: 'GET', path: '?redirect=https://evil.com' },
          { method: 'GET', path: '?next=//evil.com' },
          { method: 'GET', path: '?return_url=https://attacker.example.com' },
        ],
        detect: (status, _body) => {
          const vulnerable = status === 301 || status === 302 || status === 307;
          return { vulnerable, evidence: vulnerable ? `Redirect detectado (status ${status})` : 'Sem redirect' };
        },
      },
      {
        name: 'SQL Injection',
        owaspId: 'A03 — Injection',
        payloads: [
          { method: 'GET', path: "?id=1' OR '1'='1" },
          { method: 'GET', path: '?id=1; SELECT 1--' },
          { method: 'POST', path: '', body: JSON.stringify({ name: "' UNION SELECT NULL,NULL--" }) },
        ],
        detect: (_status, body) => {
          const sqlErrorPatterns = ['syntax error', 'postgresql', 'pg_', 'unterminated', 'ERROR:', 'DETAIL:', 'HINT:', 'relation'];
          const hasError = sqlErrorPatterns.some(p => body.toLowerCase().includes(p));
          return { vulnerable: hasError, evidence: hasError ? 'Erro SQL vazado na resposta' : 'Sem erro SQL visivel' };
        },
      },
      {
        name: 'XSS Reflected',
        owaspId: 'A03 — Injection',
        payloads: [
          { method: 'GET', path: '?q=<script>alert(1)</script>' },
          { method: 'GET', path: '?name="><img src=x onerror=alert(1)>' },
        ],
        detect: (_status, body) => {
          const vulnerable = body.includes('<script>alert(1)</script>') || body.includes('onerror=alert(1)');
          return { vulnerable, evidence: vulnerable ? 'XSS payload refletido sem sanitizacao' : 'Payload nao refletido' };
        },
      },
    ];

    // Run tests with rate limiting
    for (const route of testRoutes) {
      for (const attack of attacks) {
        for (const payload of attack.payloads) {
          try {
            const url = `${baseUrl}${route}${payload.path}`;
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const fetchOpts: RequestInit = {
              method: payload.method,
              signal: controller.signal,
              headers: { 'Content-Type': 'application/json' },
            };
            if (payload.body && payload.method === 'POST') {
              fetchOpts.body = payload.body;
            }
            const res = await fetch(url, fetchOpts);
            clearTimeout(timeout);
            const body = await res.text();
            const result = attack.detect(res.status, body);

            if (result.vulnerable || res.status === 500) {
              const category = attack.owaspId;
              owaspCategories[category] = (owaspCategories[category] || 0) + 1;
              findings.push({
                endpoint: route,
                attackType: attack.name,
                payload: (payload.path || payload.body || '').substring(0, 100),
                status: res.status,
                vulnerable: result.vulnerable,
                evidence: res.status === 500 ? 'Server crash (500) — excecao nao tratada' : result.evidence,
                owaspCategory: category,
              });
            }
          } catch {
            // Timeout or connection error — skip
          }
          // Small delay to avoid DDoS
          await new Promise(r => setTimeout(r, 50));
        }
      }
    }

    // Calculate risk score
    const criticalFindings = findings.filter(f => f.vulnerable).length;
    const serverCrashes = findings.filter(f => f.status === 500).length;
    const riskScore = Math.min(100, criticalFindings * 15 + serverCrashes * 5);

    return {
      endpoints_tested: testRoutes.length,
      total_attack_payloads: testRoutes.length * attacks.reduce((s, a) => s + a.payloads.length, 0),
      vulnerabilities_found: findings,
      confirmed_vulnerabilities: criticalFindings,
      server_crashes: serverCrashes,
      owasp_categories: owaspCategories,
      risk_score: riskScore,
      risk_level: riskScore >= 60 ? 'CRITICO' : riskScore >= 30 ? 'ALTO' : riskScore >= 10 ? 'MEDIO' : 'BAIXO',
      all_routes_discovered: apiRoutes.length,
      routes_tested: testRoutes.length,
      timestamp: new Date().toISOString(),
    };
  },
});

export const bruteForceSimulation = tool({
  description: 'Simulacao de brute force no endpoint de login: testa 20 tentativas rapidas, verifica rate limiting, lockout, timing attacks, e vazamento de info em mensagens de erro.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());

    // 1. Find the login endpoint
    let loginEndpoint = '/api/admin/auth';
    const loginBodyField = 'password';
    try {
      const authRoutes = execSync(
        'find src/app/api -path "*auth*" -name "route.ts" -o -path "*login*" -name "route.ts" 2>/dev/null',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();
      if (authRoutes) {
        const firstRoute = authRoutes.split('\n')[0];
        loginEndpoint = firstRoute
          .replace('src/app', '')
          .replace('/route.ts', '')
          .replace(/\[([^\]]+)\]/g, 'test');
      }
    } catch { /* use default endpoint */ }

    // 2. Send 20 rapid login attempts with wrong passwords
    const commonPasswords = [
      'admin', 'password', '123456', 'admin123', 'password123',
      'letmein', 'welcome', 'qwerty', '12345678', 'abc123',
      'admin2024', 'ufc123', 'mma2024', 'fighter', 'admin!',
      'test', 'root', 'master', 'dragon', 'changeme',
    ];

    type AttemptResult = {
      attempt: number;
      password: string;
      status: number;
      latencyMs: number;
      rateLimited: boolean;
      errorMessage: string;
    };

    const attempts: AttemptResult[] = [];
    let rateLimited = false;
    let lockout = false;
    const latencies: number[] = [];

    for (let i = 0; i < 20; i++) {
      const start = Date.now();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${loginEndpoint}`, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [loginBodyField]: commonPasswords[i] }),
        });
        clearTimeout(timeout);
        const latencyMs = Date.now() - start;
        latencies.push(latencyMs);
        const body = await res.text();
        let errorMsg = '';
        try {
          const json = JSON.parse(body);
          errorMsg = json.error || json.message || '';
        } catch {
          errorMsg = body.substring(0, 200);
        }

        if (res.status === 429) rateLimited = true;
        if (res.status === 423 || errorMsg.toLowerCase().includes('locked') || errorMsg.toLowerCase().includes('bloqueado')) lockout = true;

        attempts.push({
          attempt: i + 1,
          password: commonPasswords[i],
          status: res.status,
          latencyMs,
          rateLimited: res.status === 429,
          errorMessage: errorMsg,
        });
      } catch (error) {
        const latencyMs = Date.now() - start;
        attempts.push({
          attempt: i + 1,
          password: commonPasswords[i],
          status: 0,
          latencyMs,
          rateLimited: false,
          errorMessage: error instanceof Error ? error.message : 'Connection failed',
        });
      }
      // Small delay between attempts
      await new Promise(r => setTimeout(r, 100));
    }

    // 3. Analyze timing consistency
    const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
    const maxDeviation = latencies.length > 0 ? Math.max(...latencies.map(l => Math.abs(l - avgLatency))) : 0;
    const timingConsistent = maxDeviation < avgLatency * 0.5;

    // 4. Check error message info leak
    const uniqueErrors = [...new Set(attempts.map(a => a.errorMessage).filter(Boolean))];
    const errorInfoLeak = uniqueErrors.length > 1 && (
      uniqueErrors.some(e => e.toLowerCase().includes('usuario') || e.toLowerCase().includes('user') || e.toLowerCase().includes('not found')) &&
      uniqueErrors.some(e => e.toLowerCase().includes('senha') || e.toLowerCase().includes('password') || e.toLowerCase().includes('incorrect'))
    );

    // 5. Check if any password succeeded
    const successfulLogins = attempts.filter(a => a.status === 200);

    // 6. Read source for rate limiting code
    let hasRateLimitCode = false;
    try {
      const rlCheck = execSync(
        'grep -rn "rateLimit\\|rate.limit\\|attempts.*count\\|login.*count\\|too many\\|429" src/app/api/admin/ --include="*.ts" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();
      hasRateLimitCode = rlCheck.length > 0;
    } catch { /* empty */ }

    const recommendations: string[] = [];
    if (!rateLimited) recommendations.push('CRITICO: Implementar rate limiting no endpoint de login (ex: max 5 tentativas por minuto por IP)');
    if (!lockout) recommendations.push('ALTO: Implementar account lockout apos N tentativas falhadas (ex: lock 15min apos 10 falhas)');
    if (!timingConsistent) recommendations.push('MEDIO: Tempos de resposta variam — possivel timing attack');
    if (errorInfoLeak) recommendations.push('MEDIO: Mensagens de erro diferentes para user/password — atacante pode enumerar usuarios');
    if (successfulLogins.length > 0) recommendations.push('CRITICO: Login bem-sucedido com senha comum! Trocar senha IMEDIATAMENTE');
    if (!hasRateLimitCode) recommendations.push('ALTO: Nenhum codigo de rate limiting encontrado no endpoint de login');

    return {
      loginEndpoint,
      attempts: attempts.length,
      rate_limited: rateLimited,
      lockout,
      timing_consistent: timingConsistent,
      timing_details: {
        avgLatencyMs: Math.round(avgLatency),
        maxDeviationMs: Math.round(maxDeviation),
        latencies: latencies.map(l => Math.round(l)),
      },
      error_info_leak: errorInfoLeak,
      unique_error_messages: uniqueErrors,
      successful_logins: successfulLogins.length,
      has_rate_limit_code: hasRateLimitCode,
      status_distribution: attempts.reduce((acc, a) => {
        const key = String(a.status);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recommendations,
      risk_level: !rateLimited && successfulLogins.length > 0 ? 'CRITICO'
        : !rateLimited ? 'ALTO'
        : errorInfoLeak ? 'MEDIO' : 'BAIXO',
      timestamp: new Date().toISOString(),
    };
  },
});

export const sessionHijackingTest = tool({
  description: 'Analise de seguranca de tokens/sessao: verifica formato, entropia, expiracao, armazenamento, previsibilidade, e possibilidade de replay e session fixation.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());

    // 1. Read auth source files
    let authSourceContent = '';
    let authFilePath = '';
    const authPaths = [
      'src/lib/admin-sessions.ts',
      'src/lib/admin-session.ts',
      'src/lib/auth.ts',
      'src/lib/session.ts',
    ];
    for (const ap of authPaths) {
      try {
        const fullPath = path.join(projectDir, ap);
        authSourceContent = readFileSync(fullPath, 'utf-8');
        authFilePath = ap;
        break;
      } catch { /* continue */ }
    }

    // 2. Determine token format
    let tokenFormat = 'UNKNOWN';
    let tokenAnalysis: Record<string, unknown> = {};

    if (authSourceContent) {
      if (authSourceContent.includes('jsonwebtoken') || authSourceContent.includes('jwt.sign') || authSourceContent.includes('jose')) {
        tokenFormat = 'JWT';
        const usesHS256 = authSourceContent.includes('HS256') || authSourceContent.includes('sha256');
        const usesRS256 = authSourceContent.includes('RS256') || authSourceContent.includes('asymmetric');
        tokenAnalysis = {
          algorithm: usesRS256 ? 'RS256 (seguro)' : usesHS256 ? 'HS256 (aceitavel mas simetrico)' : 'Nao determinado',
          risk: usesHS256 ? 'MEDIO — chave simetrica compartilhada; preferir RS256 para producao' : 'BAIXO',
        };
      } else if (authSourceContent.includes('createHmac') || authSourceContent.includes('hmac')) {
        tokenFormat = 'HMAC-signed timestamp';
        tokenAnalysis = {
          method: 'HMAC-SHA256 com timestamp',
          risk: 'MEDIO — token auto-validante sem server state; revogacao nao e possivel',
        };
      } else if (authSourceContent.includes('randomBytes') || authSourceContent.includes('crypto.random')) {
        tokenFormat = 'Random opaque token';
        tokenAnalysis = {
          method: 'Token aleatorio com server-side lookup',
          risk: 'BAIXO — boa pratica se entropia for suficiente',
        };
      } else if (authSourceContent.includes('btoa') || authSourceContent.includes('Buffer.from')) {
        tokenFormat = 'Base64-encoded';
        tokenAnalysis = {
          method: 'Base64 encoding',
          risk: 'ALTO — base64 NAO e criptografia, dados acessiveis com decode',
        };
      }
    }

    // 3. Check token expiry from source
    let tokenEntropy = 0;
    let tokenExpiry = 'DESCONHECIDO';
    try {
      const ttlMatch = authSourceContent.match(/TTL[_\s]*(?:MS)?\s*=\s*(\d+)/i) || authSourceContent.match(/(\d+)\s*\*\s*60\s*\*\s*60\s*\*\s*1000/);
      if (ttlMatch) {
        const ms = parseInt(ttlMatch[1]);
        if (ms > 1000000) {
          tokenExpiry = `${Math.round(ms / 3600000)}h`;
        } else {
          tokenExpiry = `${ms}ms`;
        }
      }
      if (authSourceContent.includes('TOKEN_TTL')) {
        const ttlLine = authSourceContent.split('\n').find(l => l.includes('TOKEN_TTL'));
        if (ttlLine) tokenExpiry = ttlLine.trim();
      }
    } catch { /* empty */ }

    // 4. Generate a test token to analyze entropy
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${baseUrl}/api/admin/auth`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'wrong-password-for-test' }),
      });
      clearTimeout(timeout);
      const body = await res.text();
      try {
        const json = JSON.parse(body);
        if (json.token) {
          const tokenSample = json.token;
          const uniqueChars = new Set(tokenSample).size;
          tokenEntropy = Math.round(tokenSample.length * Math.log2(Math.max(uniqueChars, 2)));
        }
      } catch { /* empty */ }
    } catch { /* empty */ }

    // 5. Check storage method
    let storageMethod = 'DESCONHECIDO';
    let storageRisk = '';
    try {
      const localStorageCheck = execSync(
        'grep -rn "localStorage\\|sessionStorage" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -i "token\\|auth\\|session" || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();
      const cookieCheck = execSync(
        'grep -rn "document\\.cookie\\|setCookie\\|js-cookie\\|httpOnly\\|Set-Cookie" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();
      const headerCheck = execSync(
        'grep -rn "Authorization.*Bearer\\|headers.*token\\|Authorization" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -5 || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();

      if (localStorageCheck) {
        storageMethod = 'localStorage (Authorization header)';
        storageRisk = 'ALTO — localStorage acessivel por JavaScript; vulneravel a XSS';
      } else if (cookieCheck && cookieCheck.includes('httpOnly')) {
        storageMethod = 'httpOnly Cookie';
        storageRisk = 'BAIXO — cookies httpOnly nao sao acessiveis por JS';
      } else if (headerCheck) {
        storageMethod = 'Authorization header (provavelmente localStorage)';
        storageRisk = 'MEDIO — verificar se token esta em localStorage';
      } else {
        storageMethod = 'Nao determinado';
        storageRisk = 'Verificar implementacao frontend';
      }
    } catch { /* empty */ }

    // 6. Check if tokens can be replayed
    let replayVulnerable = false;
    let replayDetails = '';
    if (authSourceContent.includes('validateToken') && !authSourceContent.includes('Map') && !authSourceContent.includes('Set') && !authSourceContent.includes('redis') && !authSourceContent.includes('database') && !authSourceContent.includes('prisma')) {
      replayVulnerable = true;
      replayDetails = 'Token validacao e stateless (sem server-side store) — tokens nao podem ser revogados individualmente';
    } else {
      replayDetails = 'Token pode ter server-side validation — verificar implementacao';
    }

    // 7. Check for session fixation
    let sessionFixation = false;
    let sessionFixationDetails = '';
    if (authSourceContent && !authSourceContent.includes('regenerate') && !authSourceContent.includes('new session') && !authSourceContent.includes('rotate')) {
      sessionFixation = true;
      sessionFixationDetails = 'Nenhuma rotacao de sessao detectada apos login — possivel session fixation';
    }

    // 8. Check for hardcoded secrets
    let hardcodedSecret = false;
    let secretDetails = '';
    const secretFallbackMatch = authSourceContent.match(/process\.env\.\w+\s*\|\|\s*['"]([^'"]+)['"]/);
    if (secretFallbackMatch) {
      hardcodedSecret = true;
      secretDetails = `Fallback hardcoded para secret: "${secretFallbackMatch[1]}"`;
    }

    const vulnerabilities: string[] = [];
    if (tokenFormat === 'Base64-encoded') vulnerabilities.push('Token em base64 — dados decodificaveis sem chave');
    if (replayVulnerable) vulnerabilities.push('Tokens nao revogaveis — replay possivel ate expiracao');
    if (sessionFixation) vulnerabilities.push('Sem rotacao de sessao — possivel session fixation');
    if (storageRisk.includes('ALTO')) vulnerabilities.push('Token em localStorage — acessivel via XSS');
    if (hardcodedSecret) vulnerabilities.push(`Secret hardcoded: ${secretDetails}`);
    if (tokenEntropy > 0 && tokenEntropy < 128) vulnerabilities.push(`Entropia baixa: ${tokenEntropy} bits (minimo recomendado: 128)`);

    const recommendations: string[] = [];
    if (replayVulnerable) recommendations.push('Implementar blacklist de tokens (Redis/DB) para permitir revogacao');
    if (storageRisk.includes('ALTO')) recommendations.push('Migrar token para httpOnly cookie ao inves de localStorage');
    if (sessionFixation) recommendations.push('Gerar novo token apos cada login bem-sucedido');
    if (hardcodedSecret) recommendations.push('Remover fallback hardcoded — exigir variavel de ambiente');
    if (tokenFormat === 'HMAC-signed timestamp') recommendations.push('Considerar adicionar claims (user_id, role) ao token para melhor auditoria');

    return {
      auth_file: authFilePath || 'Nao encontrado',
      token_format: tokenFormat,
      token_analysis: tokenAnalysis,
      entropy_bits: tokenEntropy || 'Nao calculado (token nao obtido)',
      expiry: tokenExpiry,
      storage_method: storageMethod,
      storage_risk: storageRisk,
      replay_vulnerable: replayVulnerable,
      replay_details: replayDetails,
      session_fixation: sessionFixation,
      session_fixation_details: sessionFixationDetails,
      hardcoded_secret: hardcodedSecret,
      secret_details: secretDetails,
      vulnerabilities,
      recommendations,
      risk_level: vulnerabilities.length >= 4 ? 'CRITICO' : vulnerabilities.length >= 2 ? 'ALTO' : vulnerabilities.length >= 1 ? 'MEDIO' : 'BAIXO',
      timestamp: new Date().toISOString(),
    };
  },
});

export const cookieSecurityAudit = tool({
  description: 'Auditoria completa de seguranca de cookies: analisa flags HttpOnly, Secure, SameSite, Domain, Path e expiracao em todas as rotas principais.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const testRoutes = ['/', '/admin', '/api/company/agents', '/api/admin/auth', '/arena'];

    type CookieInfo = {
      name: string;
      value_preview: string;
      httpOnly: boolean;
      secure: boolean;
      sameSite: string | null;
      domain: string | null;
      path: string | null;
      expires: string | null;
      maxAge: string | null;
      source_route: string;
      issues: string[];
    };

    const allCookies: CookieInfo[] = [];
    const securityIssues: string[] = [];

    for (const route of testRoutes) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${route}`, {
          method: route.includes('/auth') ? 'POST' : 'GET',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: route.includes('/auth') ? JSON.stringify({ password: 'test' }) : undefined,
          redirect: 'manual',
        });
        clearTimeout(timeout);

        // Parse Set-Cookie headers
        const setCookieHeaders = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
        const rawSetCookie = res.headers.get('set-cookie');
        const cookieStrings = setCookieHeaders.length > 0
          ? setCookieHeaders
          : rawSetCookie ? rawSetCookie.split(/,(?=[^\s])/) : [];

        for (const cookieStr of cookieStrings) {
          const parts = cookieStr.split(';').map(p => p.trim());
          const [nameValue] = parts;
          if (!nameValue) continue;
          const eqIdx = nameValue.indexOf('=');
          const name = eqIdx > 0 ? nameValue.substring(0, eqIdx) : nameValue;
          const value = eqIdx > 0 ? nameValue.substring(eqIdx + 1) : '';

          const flags = parts.slice(1).map(p => p.toLowerCase());
          const httpOnly = flags.some(f => f === 'httponly');
          const secure = flags.some(f => f === 'secure');
          const sameSitePart = flags.find(f => f.startsWith('samesite'));
          const sameSite = sameSitePart ? sameSitePart.split('=')[1] || null : null;
          const domainPart = flags.find(f => f.startsWith('domain'));
          const domain = domainPart ? domainPart.split('=')[1] || null : null;
          const pathPart = flags.find(f => f.startsWith('path'));
          const cookiePath = pathPart ? pathPart.split('=')[1] || null : null;
          const expiresPart = flags.find(f => f.startsWith('expires'));
          const expires = expiresPart ? expiresPart.split('=').slice(1).join('=') || null : null;
          const maxAgePart = flags.find(f => f.startsWith('max-age'));
          const maxAge = maxAgePart ? maxAgePart.split('=')[1] || null : null;

          const issues: string[] = [];
          const sensitiveNames = ['token', 'session', 'auth', 'sid', 'jwt', 'csrf', 'admin'];
          const isSensitive = sensitiveNames.some(s => name.toLowerCase().includes(s));

          if (isSensitive && !httpOnly) {
            issues.push('Cookie sensivel sem HttpOnly — acessivel via JavaScript (XSS)');
          }
          if (!secure) {
            issues.push('Sem flag Secure — cookie enviado via HTTP sem criptografia');
          }
          if (!sameSite || sameSite === 'none') {
            issues.push(`SameSite=${sameSite || 'ausente'} — vulneravel a CSRF`);
          }
          if (domain && (domain === '.' || domain.split('.').length <= 2)) {
            issues.push(`Domain muito amplo (${domain}) — cookie compartilhado entre subdominios`);
          }
          if (maxAge && parseInt(maxAge) > 86400 * 30) {
            issues.push(`Cookie de longa duracao (${Math.round(parseInt(maxAge) / 86400)} dias) — risco se comprometido`);
          }

          allCookies.push({
            name,
            value_preview: value.substring(0, 30) + (value.length > 30 ? '...' : ''),
            httpOnly,
            secure,
            sameSite,
            domain,
            path: cookiePath,
            expires,
            maxAge,
            source_route: route,
            issues,
          });

          securityIssues.push(...issues.map(i => `[${name}] ${i}`));
        }
      } catch {
        // Route error — skip
      }
      await new Promise(r => setTimeout(r, 100));
    }

    // Check if app uses cookies vs headers for auth
    const projectDir = path.resolve(process.cwd());
    let authMechanism = 'DESCONHECIDO';
    try {
      const cookieUsage = execSync(
        'grep -rn "Set-Cookie\\|res.cookie\\|setCookie\\|cookies()" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();
      const headerUsage = execSync(
        'grep -rn "Authorization.*Bearer" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l',
        { cwd: projectDir, encoding: 'utf-8', timeout: 5000 }
      ).trim();
      if (parseInt(cookieUsage) > parseInt(headerUsage)) {
        authMechanism = 'Cookies (Set-Cookie headers)';
      } else if (parseInt(headerUsage) > 0) {
        authMechanism = 'Authorization header (Bearer token)';
      } else {
        authMechanism = 'Nenhum mecanismo claro detectado';
      }
    } catch { /* empty */ }

    const totalIssues = securityIssues.length;
    const grade = totalIssues === 0 ? 'A' : totalIssues <= 2 ? 'B' : totalIssues <= 5 ? 'C' : totalIssues <= 8 ? 'D' : 'F';

    return {
      cookies: allCookies,
      total_cookies_found: allCookies.length,
      auth_mechanism: authMechanism,
      security_issues: securityIssues,
      total_issues: totalIssues,
      overall_grade: grade,
      note: allCookies.length === 0
        ? 'Nenhum cookie encontrado — app provavelmente usa Authorization headers (menos risco de CSRF, mas tokens podem estar em localStorage)'
        : `${allCookies.length} cookies analisados`,
      recommendations: [
        ...(allCookies.some(c => !c.httpOnly && c.issues.length > 0) ? ['Adicionar HttpOnly a cookies sensiveis'] : []),
        ...(allCookies.some(c => !c.secure) ? ['Adicionar flag Secure a todos os cookies (requer HTTPS)'] : []),
        ...(allCookies.some(c => !c.sameSite || c.sameSite === 'none') ? ['Definir SameSite=Strict ou Lax em todos os cookies'] : []),
      ],
      timestamp: new Date().toISOString(),
    };
  },
});

export const apiFuzzing = tool({
  description: 'Fuzzing de inputs na API: envia payloads invalidos (corpo vazio, null, strings gigantes, tipos errados, objetos profundos) para detectar crashes (500) e validacao fraca.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());

    // 1. Discover API routes that accept POST/PATCH/DELETE
    let writableRoutes: Array<{ route: string; methods: string[] }> = [];
    try {
      const routeFiles = execSync(
        'find src/app/api -name "route.ts" -type f 2>/dev/null',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (routeFiles) {
        for (const file of routeFiles.split('\n').filter(Boolean)) {
          try {
            const content = readFileSync(path.join(projectDir, file), 'utf-8');
            const methods: string[] = [];
            if (content.includes('export async function POST') || content.includes('export function POST')) methods.push('POST');
            if (content.includes('export async function PATCH') || content.includes('export function PATCH')) methods.push('PATCH');
            if (content.includes('export async function DELETE') || content.includes('export function DELETE')) methods.push('DELETE');
            if (content.includes('export async function PUT') || content.includes('export function PUT')) methods.push('PUT');
            if (methods.length > 0) {
              const route = file
                .replace('src/app', '')
                .replace('/route.ts', '')
                .replace(/\[([^\]]+)\]/g, 'test-id');
              writableRoutes.push({ route, methods });
            }
          } catch { /* skip unreadable files */ }
        }
      }
    } catch { /* empty */ }

    writableRoutes = writableRoutes.slice(0, 10);

    // Fuzz payloads
    const fuzzPayloads: Array<{ name: string; body: unknown; expectedBehavior: string }> = [
      { name: 'empty_body', body: {}, expectedBehavior: '400 Bad Request' },
      { name: 'null_values', body: { name: null, id: null, value: null }, expectedBehavior: '400 Bad Request' },
      { name: 'long_string', body: { name: 'A'.repeat(10000), title: 'B'.repeat(10000) }, expectedBehavior: '400 ou 413' },
      { name: 'wrong_types', body: { id: 'not-a-number', count: 'abc', active: 'maybe' }, expectedBehavior: '400 Bad Request' },
      { name: 'negative_numbers', body: { id: -1, limit: -999, offset: -100 }, expectedBehavior: '400 Bad Request' },
      { name: 'deep_nested', body: (() => {
        let obj: Record<string, unknown> = { value: 'deep' };
        for (let i = 0; i < 10; i++) obj = { nested: obj };
        return obj;
      })(), expectedBehavior: '400 ou processamento normal' },
      { name: 'large_array', body: { items: Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `item_${i}` })) }, expectedBehavior: '400 ou 413' },
      { name: 'special_chars', body: { name: '🔥💀\x00\x01\x02\n\r\t' }, expectedBehavior: 'Processamento seguro' },
      { name: 'prototype_pollution', body: JSON.parse('{"__proto__":{"isAdmin":true},"constructor":{"prototype":{"isAdmin":true}}}'), expectedBehavior: '400 — rejeitar __proto__' },
    ];

    type FuzzResult = {
      endpoint: string;
      method: string;
      fuzz_type: string;
      status: number;
      crashed: boolean;
      proper_error: boolean;
      response_preview: string;
    };

    const results: FuzzResult[] = [];
    const crashes: FuzzResult[] = [];
    const properErrors: FuzzResult[] = [];
    const unhandledExceptions: FuzzResult[] = [];

    for (const routeInfo of writableRoutes) {
      for (const method of routeInfo.methods) {
        for (const payload of fuzzPayloads) {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const res = await fetch(`${baseUrl}${routeInfo.route}`, {
              method,
              signal: controller.signal,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload.body),
            });
            clearTimeout(timeout);
            const text = await res.text();
            const crashed = res.status === 500;
            const properError = res.status >= 400 && res.status < 500;

            const result: FuzzResult = {
              endpoint: routeInfo.route,
              method,
              fuzz_type: payload.name,
              status: res.status,
              crashed,
              proper_error: properError,
              response_preview: text.substring(0, 200),
            };
            results.push(result);

            if (crashed) {
              crashes.push(result);
              unhandledExceptions.push(result);
            } else if (properError) {
              properErrors.push(result);
            }
          } catch {
            results.push({
              endpoint: routeInfo.route,
              method,
              fuzz_type: payload.name,
              status: 0,
              crashed: false,
              proper_error: false,
              response_preview: 'Request timeout',
            });
          }
          await new Promise(r => setTimeout(r, 50));
        }
      }
    }

    const totalTests = results.length;
    const crashCount = crashes.length;
    const robustnessScore = totalTests > 0 ? Math.round(((totalTests - crashCount) / totalTests) * 100) : 100;

    return {
      endpoints_tested: writableRoutes.length,
      total_fuzz_tests: totalTests,
      crashes: crashes.map(c => ({
        endpoint: c.endpoint,
        method: c.method,
        fuzz_type: c.fuzz_type,
        response_preview: c.response_preview,
      })),
      crash_count: crashCount,
      proper_errors: properErrors.length,
      unhandled_exceptions: unhandledExceptions.map(u => ({
        endpoint: u.endpoint,
        method: u.method,
        fuzz_type: u.fuzz_type,
      })),
      robustness_score: robustnessScore,
      status_distribution: results.reduce((acc, r) => {
        const key = String(r.status);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      findings: [
        ...(crashCount > 0 ? [`CRITICO: ${crashCount} crashes (500) encontrados — excecoes nao tratadas`] : []),
        ...(crashCount === 0 ? ['BOM: Nenhum crash detectado — API e robusta contra inputs invalidos'] : []),
        ...(crashes.map(c => `CRASH: ${c.method} ${c.endpoint} com payload "${c.fuzz_type}"`)),
      ],
      routes_tested: writableRoutes,
      risk_level: crashCount >= 5 ? 'CRITICO' : crashCount >= 2 ? 'ALTO' : crashCount >= 1 ? 'MEDIO' : 'BAIXO',
      timestamp: new Date().toISOString(),
    };
  },
});

export const cspAnalysis = tool({
  description: 'Analise profunda de Content Security Policy (CSP): verifica diretivas, detecta configuracoes inseguras (unsafe-inline, unsafe-eval), e audita headers de seguranca complementares.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const testRoutes = ['/', '/admin'];

    type CspDirective = {
      name: string;
      value: string;
      secure: boolean;
      issue: string | null;
    };

    type RouteCSPResult = {
      route: string;
      status: number;
      csp_present: boolean;
      csp_raw: string | null;
      directives: CspDirective[];
      other_security_headers: Record<string, { present: boolean; value: string | null; recommendation: string }>;
      issues: string[];
    };

    const results: RouteCSPResult[] = [];

    for (const route of testRoutes) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${baseUrl}${route}`, {
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeout);

        const cspHeader = res.headers.get('content-security-policy') || res.headers.get('content-security-policy-report-only');
        const issues: string[] = [];
        const directives: CspDirective[] = [];

        if (!cspHeader) {
          issues.push('CRITICO: Nenhum header CSP encontrado — sem protecao contra XSS e injecao de recursos');
        } else {
          const parts = cspHeader.split(';').map(p => p.trim()).filter(Boolean);
          const directiveChecks: Record<string, (value: string) => { secure: boolean; issue: string | null }> = {
            'default-src': (v) => ({
              secure: v.includes("'self'") && !v.includes('*'),
              issue: v.includes('*') ? "default-src permite '*' — muito permissivo" : !v.includes("'self'") ? "default-src nao inclui 'self'" : null,
            }),
            'script-src': (v) => {
              const hasUnsafeInline = v.includes("'unsafe-inline'");
              const hasUnsafeEval = v.includes("'unsafe-eval'");
              return {
                secure: !hasUnsafeInline && !hasUnsafeEval,
                issue: hasUnsafeEval ? "CRITICO: script-src permite 'unsafe-eval' — execucao de codigo arbitrario"
                  : hasUnsafeInline ? "ALTO: script-src permite 'unsafe-inline' — vulneravel a XSS"
                  : null,
              };
            },
            'style-src': (v) => ({
              secure: !v.includes("'unsafe-inline'"),
              issue: v.includes("'unsafe-inline'") ? "MEDIO: style-src permite 'unsafe-inline' — comum mas arriscado" : null,
            }),
            'img-src': (v) => ({
              secure: !v.includes('*'),
              issue: v.includes('*') ? "BAIXO: img-src permite qualquer origem de imagem" : null,
            }),
            'connect-src': (v) => ({
              secure: !v.includes('*'),
              issue: v.includes('*') ? "MEDIO: connect-src permite conexoes a qualquer API" : null,
            }),
            'frame-ancestors': (v) => ({
              secure: v.includes("'none'") || v.includes("'self'"),
              issue: !v.includes("'none'") && !v.includes("'self'") ? "ALTO: frame-ancestors permite embedding por terceiros (clickjacking)" : null,
            }),
            'object-src': (v) => ({
              secure: v.includes("'none'"),
              issue: !v.includes("'none'") ? "MEDIO: object-src deveria ser 'none'" : null,
            }),
            'base-uri': (v) => ({
              secure: v.includes("'self'") || v.includes("'none'"),
              issue: !v.includes("'self'") && !v.includes("'none'") ? "MEDIO: base-uri deveria ser 'self' ou 'none'" : null,
            }),
          };

          for (const part of parts) {
            const spaceIdx = part.indexOf(' ');
            const name = spaceIdx > 0 ? part.substring(0, spaceIdx) : part;
            const value = spaceIdx > 0 ? part.substring(spaceIdx + 1) : '';

            const check = directiveChecks[name];
            if (check) {
              const result = check(value);
              directives.push({ name, value, secure: result.secure, issue: result.issue });
              if (result.issue) issues.push(result.issue);
            } else {
              directives.push({ name, value, secure: true, issue: null });
            }
          }

          const directiveNames = directives.map(d => d.name);
          const requiredDirectives = ['default-src', 'script-src', 'frame-ancestors', 'object-src'];
          for (const req of requiredDirectives) {
            if (!directiveNames.includes(req)) {
              issues.push(`MEDIO: Diretiva "${req}" ausente no CSP`);
            }
          }
        }

        // Check complementary headers
        const otherHeaders: RouteCSPResult['other_security_headers'] = {
          'x-frame-options': {
            present: !!res.headers.get('x-frame-options'),
            value: res.headers.get('x-frame-options'),
            recommendation: 'Adicionar X-Frame-Options: DENY (previne clickjacking)',
          },
          'x-content-type-options': {
            present: !!res.headers.get('x-content-type-options'),
            value: res.headers.get('x-content-type-options'),
            recommendation: 'Adicionar X-Content-Type-Options: nosniff',
          },
          'referrer-policy': {
            present: !!res.headers.get('referrer-policy'),
            value: res.headers.get('referrer-policy'),
            recommendation: 'Adicionar Referrer-Policy: strict-origin-when-cross-origin',
          },
          'permissions-policy': {
            present: !!res.headers.get('permissions-policy'),
            value: res.headers.get('permissions-policy'),
            recommendation: 'Adicionar Permissions-Policy: camera=(), microphone=(), geolocation=()',
          },
          'strict-transport-security': {
            present: !!res.headers.get('strict-transport-security'),
            value: res.headers.get('strict-transport-security'),
            recommendation: 'Adicionar Strict-Transport-Security: max-age=31536000; includeSubDomains',
          },
        };

        const missingHeaders = Object.entries(otherHeaders)
          .filter(([, v]) => !v.present)
          .map(([name]) => name);
        if (missingHeaders.length > 0) {
          issues.push(`Headers de seguranca ausentes: ${missingHeaders.join(', ')}`);
        }

        results.push({
          route,
          status: res.status,
          csp_present: !!cspHeader,
          csp_raw: cspHeader,
          directives,
          other_security_headers: otherHeaders,
          issues,
        });
      } catch (error) {
        results.push({
          route,
          status: 0,
          csp_present: false,
          csp_raw: null,
          directives: [],
          other_security_headers: {},
          issues: [`Erro ao acessar ${route}: ${error instanceof Error ? error.message : String(error)}`],
        });
      }
      await new Promise(r => setTimeout(r, 100));
    }

    const allIssues = results.flatMap(r => r.issues);
    const hasCsp = results.some(r => r.csp_present);
    const criticalIssues = allIssues.filter(i => i.includes('CRITICO')).length;
    const highIssues = allIssues.filter(i => i.includes('ALTO')).length;
    const cspGrade = !hasCsp ? 'F' : criticalIssues > 0 ? 'D' : highIssues > 0 ? 'C' : allIssues.length <= 2 ? 'B' : 'A';

    const missingHeadersGlobal = results.flatMap(r =>
      Object.entries(r.other_security_headers)
        .filter(([, v]) => !v.present)
        .map(([name]) => ({ route: r.route, header: name }))
    );

    return {
      csp_present: hasCsp,
      csp_grade: cspGrade,
      routes_analyzed: results,
      total_issues: allIssues.length,
      missing_headers: missingHeadersGlobal,
      issues_summary: allIssues,
      recommendations: [
        ...(!hasCsp ? ['CRITICO: Adicionar Content-Security-Policy header em next.config.ts'] : []),
        ...(missingHeadersGlobal.length > 0 ? [`Adicionar ${[...new Set(missingHeadersGlobal.map(h => h.header))].join(', ')} em next.config.ts`] : []),
        'Exemplo de CSP robusto: "default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: https:; frame-ancestors \'none\'; object-src \'none\'"',
      ],
      timestamp: new Date().toISOString(),
    };
  },
});

export const sslTlsAudit = tool({
  description: 'Auditoria de TLS/SSL: verifica HSTS, redirect HTTPS, configuracao de headers de seguranca no next.config, e preparacao para producao.',
  inputSchema: zodSchema(z.object({})),
  execute: async () => {
    const baseUrl = getBaseUrl();
    const projectDir = path.resolve(process.cwd());
    const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
    const isHttps = baseUrl.startsWith('https://');

    // 1. Check HSTS header
    let hstsConfigured = false;
    let hstsDetails = '';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${baseUrl}/`, { signal: controller.signal, redirect: 'manual' });
      clearTimeout(timeout);
      const hsts = res.headers.get('strict-transport-security');
      if (hsts) {
        hstsConfigured = true;
        const maxAgeMatch = hsts.match(/max-age=(\d+)/);
        const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : 0;
        const includesSubs = hsts.includes('includeSubDomains');
        const preload = hsts.includes('preload');
        hstsDetails = `max-age=${maxAge} (${Math.round(maxAge / 86400)} dias)${includesSubs ? ', includeSubDomains' : ''}${preload ? ', preload' : ''}`;
        if (maxAge < 31536000) {
          hstsDetails += ' — AVISO: max-age menor que 1 ano';
        }
      } else {
        hstsDetails = 'Header HSTS ausente';
      }
    } catch (error) {
      hstsDetails = `Erro ao verificar: ${error instanceof Error ? error.message : String(error)}`;
    }

    // 2. Check for HTTPS redirect in middleware
    let httpsRedirect = false;
    let middlewareContent = '';
    try {
      const mwPath = path.join(projectDir, 'src/middleware.ts');
      middlewareContent = readFileSync(mwPath, 'utf-8');
      httpsRedirect = middlewareContent.includes('https') && (
        middlewareContent.includes('redirect') || middlewareContent.includes('x-forwarded-proto')
      );
    } catch {
      try {
        const mwPath = path.join(projectDir, 'middleware.ts');
        middlewareContent = readFileSync(mwPath, 'utf-8');
        httpsRedirect = middlewareContent.includes('https') && middlewareContent.includes('redirect');
      } catch { /* no middleware */ }
    }

    // 3. Check next.config for security headers
    const nextConfigHeaders: string[] = [];
    let nextConfigContent = '';
    try {
      for (const configName of ['next.config.ts', 'next.config.mjs', 'next.config.js']) {
        try {
          nextConfigContent = readFileSync(path.join(projectDir, configName), 'utf-8');
          break;
        } catch { continue; }
      }
      if (nextConfigContent) {
        if (nextConfigContent.includes('Strict-Transport-Security')) nextConfigHeaders.push('HSTS');
        if (nextConfigContent.includes('X-Frame-Options')) nextConfigHeaders.push('X-Frame-Options');
        if (nextConfigContent.includes('X-Content-Type-Options')) nextConfigHeaders.push('X-Content-Type-Options');
        if (nextConfigContent.includes('Content-Security-Policy')) nextConfigHeaders.push('CSP');
        if (nextConfigContent.includes('Referrer-Policy')) nextConfigHeaders.push('Referrer-Policy');
        if (nextConfigContent.includes('Permissions-Policy')) nextConfigHeaders.push('Permissions-Policy');
      }
    } catch { /* empty */ }

    // 4. Check for mixed content risk
    let mixedContentRisk = false;
    let mixedContentDetails: string[] = [];
    try {
      const httpRefs = execSync(
        'grep -rn "http://" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "localhost\\|127.0.0.1\\|http://\\$\\|// http\\|http://schemas\\|http://www.w3.org" | head -10 || true',
        { cwd: projectDir, encoding: 'utf-8', timeout: 10000 }
      ).trim();
      if (httpRefs) {
        mixedContentRisk = true;
        mixedContentDetails = httpRefs.split('\n').filter(Boolean).slice(0, 5);
      }
    } catch { /* empty */ }

    // 5. Check env for production URL
    let productionUrl = '';
    try {
      for (const envFile of ['.env', '.env.production', '.env.local']) {
        try {
          const envContent = readFileSync(path.join(projectDir, envFile), 'utf-8');
          const urlMatch = envContent.match(/NEXT_PUBLIC_BASE_URL\s*=\s*(.+)/);
          if (urlMatch) {
            productionUrl = urlMatch[1].trim();
            break;
          }
        } catch { continue; }
      }
    } catch { /* empty */ }

    // 6. If production URL is HTTPS, test TLS
    let tlsTest: Record<string, unknown> | null = null;
    if (productionUrl && productionUrl.startsWith('https://')) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(productionUrl, { signal: controller.signal, redirect: 'manual' });
        clearTimeout(timeout);
        tlsTest = {
          url: productionUrl,
          status: res.status,
          reachable: true,
          hsts: res.headers.get('strict-transport-security') || 'Ausente',
        };
      } catch (error) {
        tlsTest = {
          url: productionUrl,
          reachable: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    // Production readiness checklist
    const readinessChecks = [
      { check: 'HSTS configurado', passed: hstsConfigured || nextConfigHeaders.includes('HSTS'), critical: true },
      { check: 'HTTPS redirect no middleware', passed: httpsRedirect, critical: true },
      { check: 'Security headers no next.config', passed: nextConfigHeaders.length >= 3, critical: false },
      { check: 'Sem mixed content', passed: !mixedContentRisk, critical: false },
      { check: 'CSP configurado', passed: nextConfigHeaders.includes('CSP'), critical: true },
      { check: 'X-Frame-Options configurado', passed: nextConfigHeaders.includes('X-Frame-Options'), critical: false },
    ];
    const passedChecks = readinessChecks.filter(c => c.passed).length;
    const productionReady = readinessChecks.filter(c => c.critical).every(c => c.passed);

    const recommendations: string[] = [];
    if (!hstsConfigured && !nextConfigHeaders.includes('HSTS')) {
      recommendations.push('Adicionar Strict-Transport-Security header: max-age=31536000; includeSubDomains');
    }
    if (!httpsRedirect) {
      recommendations.push('Adicionar redirect HTTP→HTTPS no middleware.ts');
    }
    if (nextConfigHeaders.length < 3) {
      recommendations.push('Adicionar security headers em next.config.ts (X-Frame-Options, CSP, X-Content-Type-Options, etc.)');
    }
    if (mixedContentRisk) {
      recommendations.push('Corrigir referencias HTTP hardcoded — usar HTTPS ou URLs relativas');
    }
    if (isLocalhost) {
      recommendations.push('Para producao: configurar certificado TLS (Let\'s Encrypt ou CDN com HTTPS)');
      recommendations.push('Verificar que provider de deploy (Vercel, etc.) forca HTTPS automaticamente');
    }

    return {
      environment: isLocalhost ? 'localhost (desenvolvimento)' : isHttps ? 'producao (HTTPS)' : 'producao (HTTP — PERIGO)',
      base_url: baseUrl,
      hsts_configured: hstsConfigured,
      hsts_details: hstsDetails,
      https_redirect: httpsRedirect,
      next_config_headers: nextConfigHeaders,
      mixed_content_risk: mixedContentRisk,
      mixed_content_files: mixedContentDetails,
      production_url: productionUrl || 'Nao configurado',
      tls_test: tlsTest,
      production_readiness: {
        ready: productionReady,
        score: `${passedChecks}/${readinessChecks.length}`,
        checks: readinessChecks,
      },
      recommendations,
      risk_level: isLocalhost ? 'INFO (desenvolvimento)'
        : !productionReady ? 'ALTO'
        : recommendations.length > 2 ? 'MEDIO' : 'BAIXO',
      timestamp: new Date().toISOString(),
    };
  },
});

// ═══════════════════════════════════════
// WEB SEARCH & FETCH TOOLS
// ═══════════════════════════════════════

/**
 * searchWeb — DuckDuckGo HTML search (no API key needed)
 * Returns top results with title, URL, and snippet.
 */
export const searchWeb = tool({
  description:
    'Pesquisar na internet via DuckDuckGo. Use para buscar informacoes ATUALIZADAS sobre lutadores, resultados de lutas recentes, rankings, noticias MMA, e qualquer dado que o banco local pode nao ter. SEMPRE use esta tool quando precisar de informacoes recentes ou para validar dados do banco local. IMPORTANTE: Resultados de busca sao SNIPPETS — nao confie cegamente. Use fetchWebPage para ler o artigo completo e confirmar os dados antes de publica-los.',
  inputSchema: zodSchema(
    z.object({
      query: z.string().describe('Termo de busca (ex: "UFC middleweight rankings 2026", "Strickland vs Hernandez result")'),
      maxResults: z.number().optional().describe('Numero maximo de resultados (default 5, max 10)'),
    })
  ),
  execute: async ({ query, maxResults }) => {
    const limit = Math.min(maxResults ?? 5, 10);
    const { execSync } = await import('child_process');
    const encodedQuery = encodeURIComponent(query);
    const url = `https://html.duckduckgo.com/html/?q=${encodedQuery}`;

    try {
      // Use curl with -L to follow redirects (DDG returns 202 redirect)
      const html = execSync(
        `curl -s -L -b "" -c /tmp/ddg-cookies.txt --max-time 12 ` +
        `-A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" ` +
        `"${url}"`,
        { encoding: 'utf-8', timeout: 15000 }
      );

      const results: { title: string; url: string; snippet: string }[] = [];
      const regex =
        /<a rel="nofollow" class="result__a" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(html)) !== null && results.length < limit) {
        // Extract real URL from DDG redirect
        let realUrl = m[1];
        const uddgMatch = realUrl.match(/uddg=([^&]+)/);
        if (uddgMatch) realUrl = decodeURIComponent(uddgMatch[1]);
        // Clean HTML from title and snippet
        const title = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();
        const snippet = m[3].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();
        if (title && realUrl) results.push({ title, url: realUrl, snippet });
      }

      if (results.length === 0) {
        return {
          query,
          resultCount: 0,
          results: [],
          error: 'Nenhum resultado encontrado. Tente reformular a busca com termos mais específicos.',
        };
      }

      return {
        query,
        resultCount: results.length,
        results,
        note: 'ATENCAO: Estes sao SNIPPETS de busca, NAO fatos confirmados. Voce DEVE usar fetchWebPage para ler pelo menos 2-3 fontes diferentes e cruzar as informacoes antes de considerar qualquer dado como verdadeiro. Dados encontrados em apenas 1 fonte tem BAIXA confiabilidade.',
      };
    } catch (e) {
      return { error: `Search failed: ${e instanceof Error ? e.message : 'Unknown error'}`, query, results: [] };
    }
  },
});

/**
 * fetchWebPage — fetch a URL and extract readable text content
 * Use after searchWeb to get full article content.
 */
export const fetchWebPage = tool({
  description:
    'Buscar o conteudo de uma pagina web e extrair o texto legivel. Use apos searchWeb para ler artigos completos e CONFIRMAR dados. OBRIGATORIO: Leia pelo menos 2 fontes diferentes para qualquer informacao que sera publicada. Nunca confie em uma unica fonte. Retorna o texto limpo (sem HTML). Segue redirects automaticamente.',
  inputSchema: zodSchema(
    z.object({
      url: z.string().describe('URL completa da pagina (ex: https://sports.yahoo.com/...)'),
      maxChars: z.number().optional().describe('Maximo de caracteres para retornar (default 8000, max 20000)'),
    })
  ),
  execute: async ({ url: targetUrl, maxChars }) => {
    const charLimit = Math.min(maxChars ?? 8000, 20000);
    const { execSync } = await import('child_process');

    try {
      // Use curl with -L to follow redirects automatically
      const data = execSync(
        `curl -s -L --max-time 15 --max-redirs 5 ` +
        `-A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" ` +
        `-H "Accept: text/html,application/xhtml+xml" ` +
        `-H "Accept-Language: en-US,en;q=0.9,pt-BR;q=0.8" ` +
        `-w "\\n__HTTP_CODE__%{http_code}" ` +
        `"${targetUrl.replace(/"/g, '\\"')}"`,
        { encoding: 'utf-8', timeout: 20000, maxBuffer: 10 * 1024 * 1024 }
      );

      // Extract HTTP code from end
      const codeMatch = data.match(/__HTTP_CODE__(\d+)$/);
      const httpCode = codeMatch ? parseInt(codeMatch[1]) : 0;
      const html = codeMatch ? data.slice(0, codeMatch.index) : data;

      if (httpCode !== 200 && httpCode !== 0) {
        return { error: `HTTP ${httpCode}`, url: targetUrl };
      }

      // Extract title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch
        ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim()
        : '';

      // Extract structured data if available (LD+JSON)
      const ldJsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      let structuredData: string | null = null;
      if (ldJsonMatch) {
        try {
          const ld = JSON.parse(ldJsonMatch[1]);
          if (ld.headline || ld.name || ld.description) {
            structuredData = JSON.stringify({
              headline: ld.headline || ld.name,
              description: ld.description,
              datePublished: ld.datePublished,
              author: ld.author?.name || ld.author,
            });
          }
        } catch { /* ignore bad JSON */ }
      }

      // Strip scripts, styles, nav, header, footer
      let text = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
        .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
        .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
        .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
      // Convert common block elements to newlines
      text = text
        .replace(/<\/?(p|div|br|h[1-6]|li|tr)[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(parseInt(n)))
        .replace(/[ \t]+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim();
      // Truncate
      if (text.length > charLimit) {
        text = text.substring(0, charLimit) + '\n\n[... truncado em ' + charLimit + ' chars]';
      }
      return {
        url: targetUrl,
        title,
        contentLength: text.length,
        content: text,
        ...(structuredData ? { structuredData } : {}),
        note: 'LEMBRETE: Esta eh UMA fonte. Cruze esta informacao com pelo menos 1 outra fonte antes de considerar como fato confirmado.',
      };
    } catch (e) {
      return { error: `Fetch failed: ${e instanceof Error ? e.message : 'Unknown error'}`, url: targetUrl };
    }
  },
});
