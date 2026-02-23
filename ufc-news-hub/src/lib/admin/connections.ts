import type { Connection, SharedDatabase, ConnectionStyle } from './types';

export const CONNECTIONS: Connection[] = [
  { from: 'ceo', to: 'content-dir', type: 'delega', label: 'Delega pautas e prioridades de conteudo' },
  { from: 'ceo', to: 'analytics-dir', type: 'delega', label: 'Solicita analises e previsoes' },
  { from: 'ceo', to: 'ops-dir', type: 'delega', label: 'Define metas de operacao e SLAs' },
  { from: 'ceo', to: 'cso', type: 'consulta', label: 'Consulta status de seguranca' },
  { from: 'content-dir', to: 'news-writer', type: 'delega', label: 'Assign noticias pra reescrita' },
  { from: 'content-dir', to: 'social-engager', type: 'delega', label: 'Pede posts e discussoes' },
  { from: 'content-dir', to: 'translator', type: 'delega', label: 'Solicita traducoes' },
  { from: 'analytics-dir', to: 'fight-analyst', type: 'delega', label: 'Pede previsoes de lutas' },
  { from: 'analytics-dir', to: 'stats-compiler', type: 'delega', label: 'Solicita atualizacao de stats' },
  { from: 'analytics-dir', to: 'trend-detector', type: 'delega', label: 'Pede analise de tendencias' },
  { from: 'ops-dir', to: 'scraping-monitor', type: 'delega', label: 'Define targets de scraping' },
  { from: 'ops-dir', to: 'content-moderator', type: 'delega', label: 'Define regras de moderacao' },
  { from: 'ops-dir', to: 'system-health', type: 'delega', label: 'Define thresholds de alerta' },
  { from: 'content-dir', to: 'ceo', type: 'reporta', label: 'Relatorio de conteudo publicado' },
  { from: 'analytics-dir', to: 'ceo', type: 'reporta', label: 'Relatorio de previsoes e acertos' },
  { from: 'ops-dir', to: 'ceo', type: 'reporta', label: 'Relatorio de saude do sistema' },
  { from: 'cso', to: 'ceo', type: 'alerta', label: 'Alertas de seguranca criticos' },
  { from: 'fight-analyst', to: 'news-writer', type: 'alimenta', label: 'Previsoes viram conteudo editorial' },
  { from: 'stats-compiler', to: 'fight-analyst', type: 'alimenta', label: 'Stats atualizadas alimentam previsoes' },
  { from: 'trend-detector', to: 'social-engager', type: 'alimenta', label: 'Tendencias viram posts e polls' },
  { from: 'trend-detector', to: 'news-writer', type: 'alimenta', label: 'Hypes sugerem pautas' },
  { from: 'scraping-monitor', to: 'stats-compiler', type: 'alimenta', label: 'Dados novos de scraping → stats' },
  { from: 'scraping-monitor', to: 'news-writer', type: 'alimenta', label: 'Novas noticias RSS → reescrita' },
  { from: 'content-moderator', to: 'social-engager', type: 'feedback', label: 'Feedback sobre tom de discussoes' },
  { from: 'system-health', to: 'cso', type: 'alerta', label: 'Anomalias → investigacao de seguranca' },
  { from: 'cso', to: 'ops-dir', type: 'bloqueia', label: 'Bloqueia operacoes se detectar ameaca' },
  { from: 'cso', to: 'scraping-monitor', type: 'bloqueia', label: 'Pausa scrapers se rate limited' },
];

export const DATABASES: SharedDatabase[] = [
  { id: 'articles', name: 'Articles DB', desc: 'Noticias publicadas, drafts, performance', icon: 'FileText', readers: ['ceo', 'content-dir', 'news-writer', 'social-engager', 'translator', 'trend-detector'], writers: ['news-writer', 'translator'] },
  { id: 'fighters', name: 'Fighters DB', desc: 'Stats, records, rankings, historico de lutas', icon: 'Swords', readers: ['ceo', 'analytics-dir', 'fight-analyst', 'stats-compiler', 'trend-detector', 'news-writer'], writers: ['stats-compiler', 'scraping-monitor'] },
  { id: 'events', name: 'Events DB', desc: 'Calendario UFC, fight cards, countdown', icon: 'CalendarDays', readers: ['ceo', 'analytics-dir', 'fight-analyst', 'news-writer', 'social-engager', 'trend-detector'], writers: ['scraping-monitor'] },
  { id: 'predictions', name: 'Predictions DB', desc: 'Previsoes, odds, historico de acertos', icon: 'Target', readers: ['ceo', 'analytics-dir', 'fight-analyst', 'social-engager', 'trend-detector'], writers: ['fight-analyst'] },
  { id: 'comments', name: 'Comments DB', desc: 'Comentarios, flags, scores de toxicidade', icon: 'MessageSquare', readers: ['ceo', 'ops-dir', 'content-moderator', 'social-engager', 'trend-detector'], writers: ['content-moderator'] },
  { id: 'system-logs', name: 'System Logs', desc: 'Health checks, latencias, erros, uptime', icon: 'Monitor', readers: ['ceo', 'cso', 'ops-dir', 'system-health', 'scraping-monitor'], writers: ['system-health', 'scraping-monitor', 'cso'] },
  { id: 'task-queue', name: 'Task Queue', desc: 'Fila de tarefas entre agentes', icon: 'ListTodo', readers: ['ceo', 'content-dir', 'analytics-dir', 'ops-dir', 'cso'], writers: ['ceo', 'content-dir', 'analytics-dir', 'ops-dir'] },
];

export const CONNECTION_STYLES: Record<string, ConnectionStyle> = {
  delega: { color: 'text-red-400', bg: 'bg-red-500/10', icon: 'ArrowDown', label: 'Delega' },
  reporta: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: 'ArrowUp', label: 'Reporta' },
  alimenta: { color: 'text-green-400', bg: 'bg-green-500/10', icon: 'ArrowRight', label: 'Alimenta' },
  alerta: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: 'AlertTriangle', label: 'Alerta' },
  bloqueia: { color: 'text-red-500', bg: 'bg-red-600/10', icon: 'Hand', label: 'Bloqueia' },
  feedback: { color: 'text-purple-400', bg: 'bg-purple-500/10', icon: 'CornerDownLeft', label: 'Feedback' },
  consulta: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: 'HelpCircle', label: 'Consulta' },
};
