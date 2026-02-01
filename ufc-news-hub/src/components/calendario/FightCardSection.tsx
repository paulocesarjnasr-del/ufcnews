'use client';

import FighterFaceOff from './FighterFaceOff';
import FightRowCompact from './FightRowCompact';

interface Fighter {
  id: string;
  nome: string;
  apelido?: string | null;
  imagem_url?: string | null;
  pais?: string | null;
  vitorias?: number;
  derrotas?: number;
  empates?: number;
  ranking_divisao?: number | null;
}

interface Luta {
  id: string;
  ordem: number;
  tipo: string;
  categoria_peso: string;
  rounds: number;
  is_titulo: boolean;
  status: string;
  lutador1: Fighter;
  lutador2: Fighter;
  vencedor_id?: string | null;
  metodo?: string | null;
  round_final?: number | null;
  tempo_final?: string | null;
  consenso?: Array<{
    lutador_id: string;
    lutador_nome: string;
    total_votos: number;
    percentual: number;
  }>;
  total_previsoes?: number;
}

interface FightCardSectionProps {
  title: string;
  icon: 'trophy' | 'fire' | 'bolt';
  horario?: string | null;
  broadcast?: string;
  lutas: Luta[];
  highlightMainEvent?: boolean;
  evento_id?: string;
}

const icons = {
  trophy: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v2a2 2 0 01-2 2h-.069a8 8 0 01-3.931 4.998V20H8v-3.002A8 8 0 014.069 12H4a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5z" clipRule="evenodd" />
    </svg>
  ),
  fire: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  ),
  bolt: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
};

export default function FightCardSection({
  title,
  icon,
  horario,
  broadcast,
  lutas,
  highlightMainEvent = false,
  evento_id,
}: FightCardSectionProps) {
  if (lutas.length === 0) {
    return null;
  }

  // Separar main event se necessário
  const mainEvent = highlightMainEvent ? lutas.find((l) => l.tipo === 'main_event') : null;
  const otherFights = highlightMainEvent
    ? lutas.filter((l) => l.tipo !== 'main_event')
    : lutas;

  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <span className="text-ufc-red">{icons[icon]}</span>
          <h2 className="text-lg font-display font-bold text-white uppercase tracking-wider">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {horario && (
            <span className="text-white font-medium">
              {horario}
            </span>
          )}
          {broadcast && (
            <span className="text-dark-textMuted">
              {broadcast}
            </span>
          )}
        </div>
      </div>

      {/* Main Event highlight */}
      {mainEvent && (
        <div className="mb-6 p-6 bg-gradient-to-br from-dark-card to-dark-bg rounded-xl border border-dark-border">
          {/* Main Event badge */}
          <div className="flex items-center justify-center mb-4">
            <span className="px-4 py-1 bg-ufc-red/20 border border-ufc-red/40 rounded-full text-sm font-bold text-ufc-red uppercase tracking-wider">
              Main Event
            </span>
          </div>

          {/* Face-off */}
          <FighterFaceOff
            lutador1={mainEvent.lutador1}
            lutador2={mainEvent.lutador2}
            categoria_peso={mainEvent.categoria_peso}
            is_titulo={mainEvent.is_titulo}
            vencedor_id={mainEvent.vencedor_id}
          />

          {/* Prediction consensus */}
          {mainEvent.consenso && mainEvent.consenso.length > 0 && mainEvent.total_previsoes && mainEvent.total_previsoes > 0 && (
            <div className="mt-6 pt-4 border-t border-dark-border">
              <p className="text-center text-sm text-dark-textMuted mb-3">
                Consenso da comunidade ({mainEvent.total_previsoes} previsoes)
              </p>
              <div className="flex items-center gap-2">
                {mainEvent.consenso.map((c, idx) => (
                  <div
                    key={c.lutador_id}
                    className="flex-1 h-3 rounded-full overflow-hidden bg-dark-bg"
                    style={{ flex: c.percentual / 100 }}
                  >
                    <div
                      className={`h-full ${idx === 0 ? 'bg-ufc-red' : 'bg-blue-500'}`}
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {mainEvent.consenso.map((c) => (
                  <span key={c.lutador_id} className="text-xs text-dark-textMuted">
                    {c.lutador_nome.split(' ').pop()} {Number(c.percentual ?? 0).toFixed(0)}%
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Result if finished */}
          {mainEvent.vencedor_id && mainEvent.metodo && (
            <div className="mt-4 text-center">
              <span className="px-3 py-1 bg-ufc-gold/20 border border-ufc-gold/40 rounded text-sm text-ufc-gold font-medium">
                {mainEvent.metodo}
                {mainEvent.round_final && ` - R${mainEvent.round_final}`}
                {mainEvent.tempo_final && ` (${mainEvent.tempo_final})`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Other fights list */}
      <div className="space-y-2">
        {otherFights.map((luta) => (
          <FightRowCompact
            key={luta.id}
            luta={luta}
            evento_id={evento_id}
          />
        ))}
      </div>
    </section>
  );
}
