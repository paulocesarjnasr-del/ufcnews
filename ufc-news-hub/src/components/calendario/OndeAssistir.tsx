'use client';

interface OndeAssistirProps {
  ondeAssistir?: string | null;
  tipo?: string;
}

const PLATAFORMAS: Record<string, { nome: string; cor: string; icon: string }> = {
  'UFC Fight Pass': {
    nome: 'UFC Fight Pass',
    cor: 'bg-red-600',
    icon: '📺',
  },
  'Combate': {
    nome: 'Combate',
    cor: 'bg-blue-600',
    icon: '📡',
  },
  'ESPN': {
    nome: 'ESPN',
    cor: 'bg-red-500',
    icon: '📺',
  },
  'ESPN+': {
    nome: 'ESPN+',
    cor: 'bg-red-500',
    icon: '📱',
  },
  'PPV': {
    nome: 'Pay-Per-View',
    cor: 'bg-ufc-red',
    icon: '💰',
  },
};

export function OndeAssistir({ ondeAssistir, tipo }: OndeAssistirProps) {
  const plataformas = ondeAssistir?.split(',').map((p) => p.trim()) || [];

  // Se nao tiver info, mostrar padrao baseado no tipo
  if (plataformas.length === 0) {
    if (tipo === 'PPV') {
      plataformas.push('PPV', 'Combate');
    } else {
      plataformas.push('UFC Fight Pass', 'Combate');
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-dark-textMuted">Onde assistir:</p>
      <div className="flex flex-wrap gap-2">
        {plataformas.map((plataforma) => {
          const info = PLATAFORMAS[plataforma] || {
            nome: plataforma,
            cor: 'bg-dark-border',
            icon: '📺',
          };
          return (
            <span
              key={plataforma}
              className={`inline-flex items-center gap-1 rounded-full ${info.cor} px-3 py-1 text-sm font-medium text-white`}
            >
              <span>{info.icon}</span>
              {info.nome}
            </span>
          );
        })}
      </div>
    </div>
  );
}
