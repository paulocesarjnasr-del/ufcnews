import type { NarrativaSectionData, FuturoCenario } from '@/types/analise';
import { useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';

function FuturoCard({ cenario, side, nextFightLabel }: { cenario: FuturoCenario; side: 'fighter1' | 'fighter2'; nextFightLabel: string }) {
  const isRed = side === 'fighter1';
  const borderGlow = isRed
    ? 'border-ufc-red/40 hover:border-ufc-red/70 hover:shadow-[0_0_30px_rgba(210,10,10,0.15)]'
    : 'border-blue-400/40 hover:border-blue-400/70 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]';
  const accentText = isRed ? 'text-ufc-red' : 'text-blue-400';
  const accentBg = isRed ? 'bg-ufc-red/10' : 'bg-blue-400/10';
  const tagBg = isRed ? 'bg-ufc-red/20 text-ufc-red border-ufc-red/30' : 'bg-blue-400/20 text-blue-400 border-blue-400/30';
  const lineBg = isRed ? 'bg-ufc-red' : 'bg-blue-400';
  const gradientBg = isRed
    ? 'bg-gradient-to-br from-ufc-red/5 via-dark-card to-dark-card'
    : 'bg-gradient-to-br from-blue-400/5 via-dark-card to-dark-card';

  return (
    <div className={`group relative rounded-xl border ${borderGlow} ${gradientBg} p-6 transition-all duration-500`}>
      {/* Glowing top line */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] ${lineBg} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />

      {/* Header */}
      <div className="mb-5">
        <p className={`font-display text-2xl uppercase tracking-tight ${accentText}`}>{cenario.titulo}</p>
        <p className="mt-1 text-sm text-dark-textMuted">{cenario.subtitulo}</p>
      </div>

      {/* Consequences cascade */}
      <div className="relative space-y-4 pl-4">
        {/* Vertical timeline line */}
        <div className={`absolute left-0 top-1 bottom-1 w-[2px] ${lineBg} opacity-20 rounded-full`} />

        {cenario.consequencias.map((c, i) => (
          <div key={i} className="relative">
            {/* Timeline dot */}
            <div className={`absolute -left-4 top-1 h-2.5 w-2.5 rounded-full ${lineBg} opacity-70 ring-2 ring-dark-card`} />
            <div className="ml-2">
              <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${tagBg}`}>
                {c.tag}
              </span>
              <p className="mt-1.5 text-sm text-gray-200 leading-relaxed">{c.texto}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next fight card */}
      <div className={`mt-6 rounded-lg ${accentBg} border border-dashed ${isRed ? 'border-ufc-red/20' : 'border-blue-400/20'} p-4`}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-dark-textMuted mb-1">{nextFightLabel}</p>
        <p className={`text-sm font-bold ${accentText}`}>{cenario.proxima_luta}</p>
      </div>
    </div>
  );
}

export function NarrativaSection({ data, fighter1Name, fighter2Name}: { data: NarrativaSectionData; fighter1Name?: string; fighter2Name?: string }) {
  const t = useTranslations('analise');
  return (
    <section>
      <SectionHeader number="01" title={t('narrativa_title')} accent={t('narrativa_accent')} />

      <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
        <div
          className="prose prose-invert max-w-none text-gray-200 prose-headings:text-dark-text prose-strong:text-dark-text prose-p:leading-relaxed prose-p:text-gray-200 prose-em:text-gray-300"
          dangerouslySetInnerHTML={{ __html: data.html_content }}
        />

        {data.stakes.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="py-3 px-4 text-left font-display uppercase tracking-wider text-dark-textMuted">{t('dimensao')}</th>
                  <th className="py-3 px-4 text-left font-display uppercase tracking-wider text-ufc-red">{fighter1Name || t('lutador_fallback_1')}</th>
                  <th className="py-3 px-4 text-left font-display uppercase tracking-wider text-blue-400">{fighter2Name || t('lutador_fallback_2')}</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {data.stakes.map((row, i) => (
                  <tr key={i} className={i < data.stakes.length - 1 ? 'border-b border-dark-border/50' : ''}>
                    <td className="py-3 px-4 font-semibold text-dark-text">{row.dimensao}</td>
                    <td className="py-3 px-4">{row.fighter1}</td>
                    <td className="py-3 px-4">{row.fighter2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prognostico: Dois Destinos */}
      {data.prognostico && (
        <div className="mt-8">
          <div className="mb-6 text-center">
            <p className="font-display text-2xl uppercase tracking-wider text-dark-text">
              {t('dois_destinos')}<span className="text-ufc-gold">,</span> {t('uma_luta')}
            </p>
            <p className="mt-1 text-sm text-dark-textMuted">O que muda no universo do MMA dependendo de quem vence</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <FuturoCard cenario={data.prognostico.fighter1_vence} side="fighter1" nextFightLabel={t('proxima_luta')} />
            <FuturoCard cenario={data.prognostico.fighter2_vence} side="fighter2" nextFightLabel={t('proxima_luta')} />
          </div>
        </div>
      )}
    </section>
  );
}
