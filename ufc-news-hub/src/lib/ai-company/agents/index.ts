import { BaseAgent, type AgentModelKey } from './base-agent';
import * as tools from '../tools';

// Mapping: which agent has access to which tools
const AGENT_TOOLS: Record<string, Record<string, unknown>> = {
  ceo: {
    // CEO now has read-only tools for direct verification
    getSystemHealth: tools.getSystemHealth,
    getDataQualityReport: tools.getDataQualityReport,
    getRecentErrors: tools.getRecentErrors,
    queryPredictionAccuracy: tools.queryPredictionAccuracy,
    getArticlePerformance: tools.getArticlePerformance,
    measureEndpointLatency: tools.measureEndpointLatency,
    getAgentProcessingStats: tools.getAgentProcessingStats,
    fullSecurityScan: tools.fullSecurityScan,
    // Advanced security testing tools
    owaspZapStyleScan: tools.owaspZapStyleScan,
  },
  cso: {
    getSystemHealth: tools.getSystemHealth,
    queryArticles: tools.queryArticles,
    npmAuditCheck: tools.npmAuditCheck,
    checkDependencies: tools.checkDependencies,
    getRecentErrors: tools.getRecentErrors,
    runNpmAuditFix: tools.runNpmAuditFix,
    // Deep security audit tools
    securityHeadersAudit: tools.securityHeadersAudit,
    authenticationAudit: tools.authenticationAudit,
    injectionAudit: tools.injectionAudit,
    exposedDataAudit: tools.exposedDataAudit,
    rateLimitAudit: tools.rateLimitAudit,
    fileExposureAudit: tools.fileExposureAudit,
    corsAndCsrfAudit: tools.corsAndCsrfAudit,
    fullSecurityScan: tools.fullSecurityScan,
    // Advanced security testing tools
    owaspZapStyleScan: tools.owaspZapStyleScan,
    bruteForceSimulation: tools.bruteForceSimulation,
    sessionHijackingTest: tools.sessionHijackingTest,
    cookieSecurityAudit: tools.cookieSecurityAudit,
    apiFuzzing: tools.apiFuzzing,
    cspAnalysis: tools.cspAnalysis,
    sslTlsAudit: tools.sslTlsAudit,
  },
  'content-dir': {
    queryArticles: tools.queryArticles,
    queryEvents: tools.queryEvents,
    getArticlePerformance: tools.getArticlePerformance,
    getDataQualityReport: tools.getDataQualityReport,
    searchWeb: tools.searchWeb,
    fetchWebPage: tools.fetchWebPage,
  },
  'analytics-dir': {
    queryFighters: tools.queryFighters,
    queryEvents: tools.queryEvents,
    queryFights: tools.queryFights,
    queryPredictionAccuracy: tools.queryPredictionAccuracy,
    getDataQualityReport: tools.getDataQualityReport,
    searchWeb: tools.searchWeb,
    fetchWebPage: tools.fetchWebPage,
  },
  'ops-dir': {
    getSystemHealth: tools.getSystemHealth,
    queryComments: tools.queryComments,
    querySyncLogs: tools.querySyncLogs,
    measureEndpointLatency: tools.measureEndpointLatency,
    getAgentProcessingStats: tools.getAgentProcessingStats,
    getRecentErrors: tools.getRecentErrors,
    runDatabaseMigration: tools.runDatabaseMigration,
    fixColumnSchema: tools.fixColumnSchema,
    runNpmAuditFix: tools.runNpmAuditFix,
    // Deep security audit tools
    authenticationAudit: tools.authenticationAudit,
    exposedDataAudit: tools.exposedDataAudit,
    corsAndCsrfAudit: tools.corsAndCsrfAudit,
    // Advanced security testing tools
    bruteForceSimulation: tools.bruteForceSimulation,
    sessionHijackingTest: tools.sessionHijackingTest,
    apiFuzzing: tools.apiFuzzing,
  },
  'news-writer': {
    queryArticles: tools.queryArticles,
    queryFighters: tools.queryFighters,
    queryEvents: tools.queryEvents,
    queryFights: tools.queryFights,
    publishArticle: tools.publishArticle,
    searchWeb: tools.searchWeb,
    fetchWebPage: tools.fetchWebPage,
  },
  'social-engager': {
    queryArticles: tools.queryArticles,
    queryEvents: tools.queryEvents,
    queryComments: tools.queryComments,
    createPoll: tools.createPoll,
    searchWeb: tools.searchWeb,
  },
  translator: {
    queryArticles: tools.queryArticles,
    publishArticle: tools.publishArticle,
  },
  'fight-analyst': {
    queryFighters: tools.queryFighters,
    queryEvents: tools.queryEvents,
    queryFights: tools.queryFights,
    queryPredictionAccuracy: tools.queryPredictionAccuracy,
    searchWeb: tools.searchWeb,
    fetchWebPage: tools.fetchWebPage,
  },
  'stats-compiler': {
    queryFighters: tools.queryFighters,
    updateFighterData: tools.updateFighterData,
    getDataQualityReport: tools.getDataQualityReport,
    backfillFighterData: tools.backfillFighterData,
  },
  'trend-detector': {
    queryArticles: tools.queryArticles,
    queryComments: tools.queryComments,
    queryEvents: tools.queryEvents,
    getArticlePerformance: tools.getArticlePerformance,
    searchWeb: tools.searchWeb,
    fetchWebPage: tools.fetchWebPage,
  },
  'scraping-monitor': {
    getSystemHealth: tools.getSystemHealth,
    querySyncLogs: tools.querySyncLogs,
    getScraperStatus: tools.getScraperStatus,
    backfillFighterData: tools.backfillFighterData,
  },
  'content-moderator': {
    queryComments: tools.queryComments,
    moderateComment: tools.moderateComment,
  },
  'system-health': {
    getSystemHealth: tools.getSystemHealth,
    getDbPoolStats: tools.getDbPoolStats,
    measureEndpointLatency: tools.measureEndpointLatency,
    getAgentProcessingStats: tools.getAgentProcessingStats,
    getRecentErrors: tools.getRecentErrors,
    fixColumnSchema: tools.fixColumnSchema,
    runDatabaseMigration: tools.runDatabaseMigration,
    // Deep security audit tools
    securityHeadersAudit: tools.securityHeadersAudit,
    rateLimitAudit: tools.rateLimitAudit,
    fileExposureAudit: tools.fileExposureAudit,
    // Advanced security testing tools
    owaspZapStyleScan: tools.owaspZapStyleScan,
    cspAnalysis: tools.cspAnalysis,
    sslTlsAudit: tools.sslTlsAudit,
  },
  'arena-manager': {
    processEventResults: tools.processEventResults,
    openArenaPredictions: tools.openArenaPredictions,
    queryArenaStats: tools.queryArenaStats,
    queryLeagueStandings: tools.queryLeagueStandings,
    finalizeDuels: tools.finalizeDuels,
    generateArenaReport: tools.generateArenaReport,
  },
  'event-ops': {
    syncEventCards: tools.syncEventCards,
    checkEventResults: tools.checkEventResults,
    updateFightResults: tools.updateFightResults,
    queryUpcomingEvents: tools.queryUpcomingEvents,
  },
  'seo-growth': {
    analyzeArticleSEO: tools.analyzeArticleSEO,
    generateMetaTags: tools.generateMetaTags,
    queryTopKeywords: tools.queryTopKeywords,
    auditSiteSEO: tools.auditSiteSEO,
    searchWeb: tools.searchWeb,
  },
  'ui-auditor': {
    auditPageHealth: tools.auditPageHealth,
    checkComponentRender: tools.checkComponentRender,
    getConsoleLogs: tools.getConsoleLogs,
    compareLayoutSnapshot: tools.compareLayoutSnapshot,
    // Deep security audit tools
    securityHeadersAudit: tools.securityHeadersAudit,
    injectionAudit: tools.injectionAudit,
    corsAndCsrfAudit: tools.corsAndCsrfAudit,
    // Advanced security testing tools
    cookieSecurityAudit: tools.cookieSecurityAudit,
    cspAnalysis: tools.cspAnalysis,
    owaspZapStyleScan: tools.owaspZapStyleScan,
  },
};

// Agent registry
export const agentRegistry = new Map<string, BaseAgent>();

export function getAgentTools(agentId: string): Record<string, unknown> {
  return AGENT_TOOLS[agentId] || {};
}

export function initializeAgent(agentData: {
  id: string;
  humanName: string;
  codename: string;
  model: string;
  systemPrompt: string;
}): BaseAgent {
  const existing = agentRegistry.get(agentData.id);
  if (existing) return existing;

  const agent = new BaseAgent({
    id: agentData.id,
    humanName: agentData.humanName,
    codename: agentData.codename,
    model: agentData.model as AgentModelKey,
    systemPrompt: agentData.systemPrompt,
    tools: AGENT_TOOLS[agentData.id] || {},
  });

  agentRegistry.set(agentData.id, agent);
  return agent;
}
