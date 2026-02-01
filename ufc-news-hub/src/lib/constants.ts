export const RSS_FEED_URL =
  process.env.RSS_FEED_URL || 'https://www.mmamania.com/rss/current.xml';

// Múltiplas fontes RSS para ter mais conteúdo
export const RSS_FEED_URLS: string[] = [
  'https://www.mmamania.com/rss/current.xml',
  'https://www.mmafighting.com/rss/current.xml',
  'https://www.bloodyelbow.com/rss/current.xml',
  'https://www.mmanews.com/feed/',
];

export const SYNC_INTERVAL_MINUTES = parseInt(
  process.env.SYNC_INTERVAL_MINUTES || '15',
  10
);

// Aumentado para 168 horas (7 dias) para permitir mais notícias retroativas
export const NEWS_MAX_AGE_HOURS = parseInt(
  process.env.NEWS_MAX_AGE_HOURS || '168',
  10
);

export const CATEGORIA_LABELS: Record<string, string> = {
  lutadores: 'Lutadores',
  lutas: 'Lutas',
  backstage: 'Backstage',
};

export const CATEGORIA_COLORS: Record<string, string> = {
  lutadores: 'bg-category-lutadores/20 text-category-lutadores',
  lutas: 'bg-category-lutas/20 text-category-lutas',
  backstage: 'bg-category-backstage/20 text-category-backstage',
};

export const UFC_ATHLETES_URL =
  'https://www.ufc.com/athletes/all?filters%5B0%5D=status%3A23';

export const PLACEHOLDER_IMAGE = '/placeholder-ufc.svg';

export const ITEMS_PER_PAGE = 12;

export const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos em ms

// Constantes do Sistema de Comentários
export const COMMENT_MAX_LENGTH = 2000;
export const COMMENT_MIN_LENGTH = 3;
export const AUTHOR_NAME_MAX = 50;
export const AUTHOR_NAME_MIN = 2;
export const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutos em ms
export const RATE_LIMIT_MAX = 3; // máximo de comentários por janela
export const REPORT_THRESHOLD = 3; // número de reports para auto-hide
export const COMMENTS_REFRESH_INTERVAL = 60 * 1000; // 1 minuto em ms
export const MAX_COMMENT_DEPTH = 4; // profundidade máxima de respostas
