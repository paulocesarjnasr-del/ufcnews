import type { ModelConfig, StatusConfig } from './types';

export const MODELS: Record<string, ModelConfig> = {
  'opus-4.6': {
    name: 'Claude Opus 4.6',
    tag: 'OPUS',
    textColor: 'text-purple-300',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    desc: 'Maxima inteligencia. Raciocinio estrategico, decisoes complexas.',
  },
  'sonnet-4.5': {
    name: 'Claude Sonnet 4.5',
    tag: 'SONNET',
    textColor: 'text-blue-300',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    desc: 'Melhor custo-beneficio. Escrita, analise, criatividade.',
  },
  'haiku-4.5': {
    name: 'Claude Haiku 4.5',
    tag: 'HAIKU',
    textColor: 'text-green-300',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    desc: 'Ultra-rapido e barato. Classificacao, triagem, monitoramento.',
  },
};

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  active: { label: 'Ativo', dot: 'bg-green-500', bg: 'bg-green-500/10', text: 'text-green-400', pulse: true },
  idle: { label: 'Idle', dot: 'bg-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', pulse: false },
  warning: { label: 'Alerta', dot: 'bg-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400', pulse: true },
  error: { label: 'Erro', dot: 'bg-red-500', bg: 'bg-red-500/10', text: 'text-red-400', pulse: true },
  offline: { label: 'Offline', dot: 'bg-gray-500', bg: 'bg-gray-500/10', text: 'text-gray-400', pulse: false },
};
