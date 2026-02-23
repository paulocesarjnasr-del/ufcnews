/**
 * Pipeline definitions for the Event Bus
 *
 * Each pipeline maps an event type to a sequence of agent steps.
 * Steps can have dependencies (dependsOn) to create execution order.
 * autoApprove: true means the step runs without human approval.
 */

export interface PipelineStep {
  stepId?: string; // unique step identifier (defaults to agentId if not set)
  agentId: string;
  instruction: string;
  dependsOn: string[]; // references stepId (or agentId if stepId not set) of dependencies
  autoApprove: boolean;
}

const PIPELINES: Record<string, PipelineStep[]> = {
  // ═══════════════════════════════════════
  // EVENT FINALIZED — Post-fight processing
  // ═══════════════════════════════════════
  'event.finalized': [
    {
      agentId: 'stats-compiler',
      instruction:
        'O evento foi finalizado. Use getDataQualityReport e queryFighters para verificar se os stats dos lutadores estao atualizados. Reporte inconsistencias.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'arena-manager',
      instruction:
        'Evento finalizado. Use processEventResults para calcular pontos da arena. Depois use generateArenaReport para criar relatorio pos-evento.',
      dependsOn: ['stats-compiler'],
      autoApprove: true,
    },
    {
      agentId: 'news-writer',
      instruction:
        'Evento finalizado. Use queryFights e queryEvents para obter resultados. Escreva um recap completo do evento em PT-BR. Use publishArticle para publicar.',
      dependsOn: ['stats-compiler'],
      autoApprove: false, // Article publishing needs admin review
    },
  ],

  // ═══════════════════════════════════════
  // NEW EVENT CARD — New fight card detected
  // ═══════════════════════════════════════
  'event.new_card': [
    {
      agentId: 'stats-compiler',
      instruction:
        'Novo card detectado. Use queryFighters para verificar se todos os lutadores do card tem dados completos. Reporte campos faltantes com getDataQualityReport.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'fight-analyst',
      instruction:
        'Novo card disponivel. Use queryFighters e queryFights para analisar matchups. Produza previsoes para as lutas principais do card.',
      dependsOn: ['stats-compiler'],
      autoApprove: true,
    },
    {
      agentId: 'arena-manager',
      instruction:
        'Novo card detectado. Use openArenaPredictions para abrir previsoes da arena para este evento.',
      dependsOn: [],
      autoApprove: true,
    },
  ],

  // ═══════════════════════════════════════
  // NEWS SYNCED — RSS sync completed
  // ═══════════════════════════════════════
  'news.synced': [
    {
      agentId: 'trend-detector',
      instruction:
        'Sync de noticias completou. Use queryArticles para buscar artigos das ultimas 24h. Use getArticlePerformance para analisar performance. Identifique trends com heat_score > 7.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'news-writer',
      instruction:
        'Novas noticias foram sincronizadas. Use queryArticles para verificar artigos recentes. Se houver breaking news relevante, reescreva em PT-BR usando publishArticle.',
      dependsOn: ['trend-detector'],
      autoApprove: false,
    },
  ],

  // ═══════════════════════════════════════
  // DAILY CRON — Every day at 10h UTC
  // ═══════════════════════════════════════
  'cron.daily': [
    {
      agentId: 'system-health',
      instruction:
        'Check diario. Use getSystemHealth, getDbPoolStats, measureEndpointLatency, getAgentProcessingStats, getRecentErrors para gerar relatorio de saude do sistema.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'scraping-monitor',
      instruction:
        'Check diario. Use getScraperStatus e querySyncLogs para verificar se o scraper esta funcionando. Reporte problemas.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'trend-detector',
      instruction:
        'Analise diaria de trends. Use queryArticles, queryComments, getArticlePerformance para identificar topicos quentes do UFC hoje.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'arena-manager',
      instruction:
        'Check diario da arena. Use queryArenaStats para verificar atividade. Use finalizeDuels para finalizar duelos pendentes.',
      dependsOn: [],
      autoApprove: true,
    },
  ],

  // ═══════════════════════════════════════
  // WEEKLY CRON — Every Monday
  // ═══════════════════════════════════════
  'cron.weekly': [
    {
      agentId: 'analytics-dir',
      instruction:
        'Review semanal. Use queryPredictionAccuracy e getDataQualityReport para compilar metricas da semana. Use queryEvents e queryFighters para contexto.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      agentId: 'ceo',
      instruction:
        'Brief semanal. Consolide os dados da semana e prepare um resumo executivo com recomendacoes.',
      dependsOn: ['analytics-dir'],
      autoApprove: true,
    },
  ],

  // ═══════════════════════════════════════
  // TREND DETECTED — Igor found a hot topic
  // ═══════════════════════════════════════
  'trend.detected': [
    {
      agentId: 'news-writer',
      instruction:
        'Trend detectado pelo Igor. Use queryArticles e queryFighters para contexto. Escreva um artigo sobre o topico quente em PT-BR. Use publishArticle.',
      dependsOn: [],
      autoApprove: false,
    },
    {
      agentId: 'social-engager',
      instruction:
        'Trend detectado. Use queryArticles e queryEvents para contexto. Crie uma poll ou hot take sobre o assunto usando createPoll.',
      dependsOn: [],
      autoApprove: false,
    },
  ],

  // ═══════════════════════════════════════
  // ARTICLE PUBLISHED — New content available
  // ═══════════════════════════════════════
  'article.published': [
    {
      agentId: 'social-engager',
      instruction:
        'Novo artigo publicado. Use queryArticles para obter detalhes. Crie uma poll ou hot take sobre o assunto para engajamento usando createPoll.',
      dependsOn: [],
      autoApprove: false,
    },
  ],

  // ═══════════════════════════════════════
  // REPORT GENERATED — CEO identified problems
  // ═══════════════════════════════════════
  'report.generated': [
    {
      agentId: 'ceo',
      instruction:
        'Um relatorio consolidado identificou problemas. Use getSystemHealth e getDataQualityReport para verificar o estado atual. Um RemediationPlan ja foi criado — notifique o admin para revisao.',
      dependsOn: [],
      autoApprove: true,
    },
  ],

  // ═══════════════════════════════════════
  // REMEDIATION APPROVED — Admin approved fix plan
  // ═══════════════════════════════════════
  'remediation.approved': [
    {
      agentId: 'ceo',
      instruction:
        'Admin aprovou plano de remediacao. O sistema executara as acoes automaticamente. Use getSystemHealth para verificar estado antes da execucao.',
      dependsOn: [],
      autoApprove: true,
    },
  ],

  // ═══════════════════════════════════════
  // DATA QUALITY BELOW THRESHOLD — Auto-fix data issues
  // ═══════════════════════════════════════
  'data_quality.below_threshold': [
    {
      stepId: 'stats-compiler:diagnose',
      agentId: 'stats-compiler',
      instruction:
        'Qualidade dos dados abaixo do limite. Use getDataQualityReport para diagnosticar campos faltantes. Identifique lutadores com mais campos vazios.',
      dependsOn: [],
      autoApprove: true,
    },
    {
      stepId: 'scraping-monitor:backfill',
      agentId: 'scraping-monitor',
      instruction:
        'Dados de lutadores abaixo do threshold. Use getScraperStatus para verificar se o scraper esta funcionando. Se sim, use backfillFighterData para preencher dados faltantes.',
      dependsOn: ['stats-compiler:diagnose'],
      autoApprove: true,
    },
    {
      stepId: 'stats-compiler:verify',
      agentId: 'stats-compiler',
      instruction:
        'Verificacao pos-backfill. Use getDataQualityReport para confirmar que a qualidade dos dados melhorou apos o backfill.',
      dependsOn: ['scraping-monitor:backfill'],
      autoApprove: true,
    },
  ],
};

/**
 * Get pipeline definition for an event type
 */
export function getPipeline(eventType: string): PipelineStep[] | null {
  return PIPELINES[eventType] || null;
}

/**
 * List all registered event types
 */
export function getRegisteredEventTypes(): string[] {
  return Object.keys(PIPELINES);
}
