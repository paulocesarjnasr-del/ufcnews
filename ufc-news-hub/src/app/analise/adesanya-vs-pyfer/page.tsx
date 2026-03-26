import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'adesanya-vs-pyfer',
  evento_id: null,
  slug: 'adesanya-vs-pyfer',
  titulo: 'Adesanya vs Pyfer: A Redencao ou o Fim de Uma Era',
  subtitulo: 'O ex-bicampeao com 3 derrotas seguidas busca provar que ainda pertence a elite contra o power puncher em ascensao',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,93m', envergadura: '203cm', idade: 36, academia: 'City Kickboxing' },
      fighter2: { altura: '1,88m', envergadura: '188cm', idade: 29, academia: 'Marquez MMA, Philadelphia' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: 'Vantagem de Reach', edge: 'fighter1', impact: 9, description: '6 polegadas de reach a mais. O jab de Adesanya e a arma mais poderosa dessa luta.' },
      { factor: 'Poder de Nocaute', edge: 'fighter2', impact: 8, description: '1.2 knockdowns/15min de Pyfer contra o queixo comprometido de Izzy.' },
      { factor: 'Experiencia de Elite', edge: 'fighter1', impact: 9, description: 'Adesanya enfrentou os 5 melhores MWs. Pyfer nunca enfrentou um top 10.' },
    ],
    xFactor: {
      title: 'O Queixo de Izzy aos 36 Anos',
      description: 'A durabilidade de Adesanya e a maior incognita. Se aguentar os primeiros 2 rounds, a tecnica domina. Se nao, e o fim.',
    },
  },
  fighter1_info: {
    nome: 'Israel Adesanya',
    apelido: 'The Last Stylebender',
    record: '24-5-0',
    ranking: '#4 Peso Medio',
    ultimasLutas: [
      { result: 'L', opponent: 'Nassourdine Imavov', method: 'TKO R2', event: 'UFC Fight Night 250' },
      { result: 'L', opponent: 'Dricus Du Plessis', method: 'Sub R4 (RNC)', event: 'UFC 305' },
      { result: 'L', opponent: 'Sean Strickland', method: 'Decisao Unanime', event: 'UFC 293' },
    ],
  },
  fighter2_info: {
    nome: 'Joe Pyfer',
    apelido: 'Bodybagz',
    record: '15-3-0',
    ranking: '#14 Peso Medio',
    ultimasLutas: [
      { result: 'W', opponent: 'Abusupiyan Magomedov', method: 'Sub R2 (face crank)', event: 'UFC 320' },
      { result: 'W', opponent: 'Kelvin Gastelum', method: 'Decisao Unanime', event: 'UFC 316' },
      { result: 'W', opponent: 'Marc-Andre Barriault', method: 'KO R1', event: 'UFC 303' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'A Redencao ou o Fim de Uma Era',
      tagline_sub: 'O bicampeao com 3 derrotas seguidas contra o power puncher em ascensao. 36 anos vs 29. Legado vs Juventude.',
      fighter1: {
        nome_completo: 'Israel "The Last Stylebender" Adesanya',
        apelido: 'The Last Stylebender',
        sobrenome: 'Adesanya',
        record: '24-5-0',
        ranking: '#4 Peso Medio',
        info_extra: 'Lagos, Nigeria / Auckland, Nova Zelandia | 36 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=YGc30Vwe',
      },
      fighter2: {
        nome_completo: 'Joe "Bodybagz" Pyfer',
        apelido: 'Bodybagz',
        sobrenome: 'Pyfer',
        record: '15-3-0',
        ranking: '#14 Peso Medio',
        info_extra: 'Allentown, PA | Marquez MMA, Philadelphia | 29 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=prLW4_bl',
      },
    },

    narrativa: {
      html_content: `
        <!-- ADESANYA: A QUEDA -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">A Queda do Rei</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/20 to-ufc-red/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Set 2023</p>
                <p class="font-display text-2xl text-white mb-2">STRICKLAND</p>
                <p class="text-xs text-white/50 leading-relaxed">Decisao Unanime. Izzy pareceu desconectado.</p>
                <div class="mt-3 inline-block rounded-full bg-ufc-red/20 px-3 py-1 text-[9px] font-bold uppercase text-ufc-red">Perdeu Titulo</div>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/20 to-ufc-red/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Ago 2024</p>
                <p class="font-display text-2xl text-white mb-2">DU PLESSIS</p>
                <p class="text-xs text-white/50 leading-relaxed">Submissao R4. A primeira sub da carreira inteira.</p>
                <div class="mt-3 inline-block rounded-full bg-ufc-red/20 px-3 py-1 text-[9px] font-bold uppercase text-ufc-red">Titulo em Jogo</div>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/20 to-ufc-red/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ufc-red to-red-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Fev 2025</p>
                <p class="font-display text-2xl text-white mb-2">IMAVOV</p>
                <p class="text-xs text-white/50 leading-relaxed">TKO R2. Overhand right. 30 segundos.</p>
                <div class="mt-3 inline-block rounded-full bg-ufc-red/20 px-3 py-1 text-[9px] font-bold uppercase text-ufc-red">Queixo Exposto</div>
              </div>
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="font-display text-5xl md:text-6xl bg-gradient-to-b from-ufc-red/40 to-ufc-red/10 bg-clip-text text-transparent leading-none">3 derrotas</p>
            <div class="flex items-center justify-center gap-4 mt-3">
              <div class="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-white/10"></div>
              <p class="text-xs text-white/40">13 meses parado &middot; 36 anos</p>
              <div class="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-white/10"></div>
            </div>
            <p class="font-display text-lg text-white/70 mt-2 italic">"Ele ainda pertence?"</p>
          </div>
        </div>

        <!-- PYFER: A ASCENSAO -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Do Banco de Praca ao Main Event</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-400/5"></div>
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-blue-400/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/70 leading-relaxed">
                Aos 16, <strong class="text-blue-400">Pyfer</strong> fugiu de um pai abusivo e dormiu em um banco de praca em Media, PA. O treinador de wrestling Will Harmon salvou sua vida, acolhendo ele em casa. Dana White pagou um ano de aluguel quando soube da situacao.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-blue-400/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Jun 2024</p>
                <p class="font-display text-2xl text-white mb-2">BARRIAULT</p>
                <p class="text-xs text-white/50 leading-relaxed">KO em 85 segundos.</p>
                <div class="mt-3 inline-block rounded-full bg-blue-400/20 px-3 py-1 text-[9px] font-bold uppercase text-blue-400">POTN Bonus</div>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-blue-400/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Jun 2025</p>
                <p class="font-display text-2xl text-white mb-2">GASTELUM</p>
                <p class="text-xs text-white/50 leading-relaxed">Decisao com 2 knockdowns.</p>
                <div class="mt-3 inline-block rounded-full bg-blue-400/20 px-3 py-1 text-[9px] font-bold uppercase text-blue-400">Dominio</div>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-blue-400/5"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Out 2025</p>
                <p class="font-display text-2xl text-white mb-2">MAGOMEDOV</p>
                <p class="text-xs text-white/50 leading-relaxed">Submissao por face crank R2.</p>
                <div class="mt-3 inline-block rounded-full bg-blue-400/20 px-3 py-1 text-[9px] font-bold uppercase text-blue-400">POTN Bonus</div>
              </div>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/8 via-amber-500/4 to-amber-500/8"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <div class="relative p-5 text-center">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Fraqueza Exposta</p>
              <p class="text-sm text-white/60">Hermansson venceu por decisao (48-47) porque Pyfer <strong class="text-amber-400">cansou nos rounds finais</strong></p>
            </div>
          </div>
        </div>

        <!-- BASTIDORES -->
        <div>
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Bastidores</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-ufc-red/10 to-transparent"></div>
              <div class="absolute inset-y-0 left-0 w-1 bg-ufc-red rounded-full"></div>
              <div class="relative p-5 pl-6">
                <p class="text-xs font-bold uppercase tracking-wider text-ufc-red mb-2">Whittaker no camp</p>
                <p class="text-sm text-white/60 leading-relaxed">O rival que Izzy venceu 2x agora e sparring partner em Auckland. A rivalidade virou vantagem competitiva.</p>
              </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-ufc-red/10 to-transparent"></div>
              <div class="absolute inset-y-0 left-0 w-1 bg-ufc-red rounded-full"></div>
              <div class="relative p-5 pl-6">
                <p class="text-xs font-bold uppercase tracking-wider text-ufc-red mb-2">Preparador fisico ha 1 ano</p>
                <p class="text-sm text-white/60 leading-relaxed">Bill Smart focando em sono, estresse, detalhes. Recalibracao silenciosa de um atleta de 36 anos.</p>
              </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-ufc-red/10 to-transparent"></div>
              <div class="absolute inset-y-0 left-0 w-1 bg-ufc-red rounded-full"></div>
              <div class="relative p-5 pl-6">
                <p class="text-xs font-bold uppercase tracking-wider text-ufc-red mb-2">Pereira mandou apoio</p>
                <p class="text-sm text-white/60 leading-relaxed">Postou o video do proprio KO que sofreu de Izzy: <em class="text-white/80">"Te vejo no topo, CHAMA."</em></p>
              </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent"></div>
              <div class="absolute inset-y-0 left-0 w-1 bg-blue-400 rounded-full"></div>
              <div class="relative p-5 pl-6">
                <p class="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Game plan revelado</p>
                <p class="text-sm text-white/60 leading-relaxed"><em class="text-white/80">"Pressao inteligente. Causar dano."</em> Equipe recrutou sparrings pra imitar Izzy.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#4 Peso Medio', fighter2: '#14 Peso Medio' },
        { dimensao: 'Sequencia', fighter1: '3 derrotas seguidas', fighter2: '3 vitorias seguidas' },
        { dimensao: 'Narrativa', fighter1: 'Provar que ainda pertence a elite', fighter2: 'Vencer um ex-campeao e entrar no top 10' },
        { dimensao: 'Risco', fighter1: '4a derrota seguida pode forcar aposentadoria', fighter2: 'Perder o momento contra um veterano em declinio' },
        { dimensao: 'Legado', fighter1: 'Redencao ou capitulo final', fighter2: 'De prospect a contender' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O STYLEBENDER VOLTOU',
          subtitulo: 'Adesanya mostra que a tecnica supera a juventude e encerra a narrativa de declinio',
          consequencias: [
            { tag: 'RANKING', texto: 'Adesanya se mantem no top 5 e volta a ser relevante na conversa do titulo' },
            { tag: 'LEGADO', texto: 'Prova que as 3 derrotas foram contra elite (top 5) e que Izzy contra o resto da divisao ainda e dominante' },
            { tag: 'PROXIMA', texto: 'Luta contra um top 5-10 como Robert Whittaker rematch ou Nassourdine Imavov rematch' },
          ],
          proxima_luta: 'Adesanya vs top 5 MW (Brendan Allen, perdedor de Chimaev/Strickland no UFC 328, ou Imavov rematch)',
        },
        fighter2_vence: {
          titulo: 'BODYBAGZ DERRUBA A LENDA',
          subtitulo: 'Pyfer confirma que Adesanya esta acabado e se lanca ao top 10',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Pyfer entra no top 10 com a maior vitoria da carreira' },
            { tag: 'CONVERSA', texto: 'A comunidade MMA passa a debater seriamente a aposentadoria de Adesanya' },
            { tag: 'PROXIMA', texto: 'Pyfer enfrenta um top 5 no proximo card' },
          ],
          proxima_luta: 'Pyfer vs top 5-7 MW',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Israel Adesanya',
        color: 'red',
        recent_fights: [
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2 (0:30)', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocauteado por overhand right apos eye poke restart. O queixo de Izzy nao aguentou.' },
          { date: 'Ago 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Submissao R4 (RNC, 3:38)', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Estava vencendo nos strikes mas foi derrubado e submetido no R4. Primeira sub da carreira.' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'Decisao Unanime', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Upset do ano. Strickland superou Izzy no volume e na pressao. Adesanya pareceu hesitante.' },
          { date: 'Fev 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'O nocaute de vinganca. Izzy acertou um gancho devastador no R2 e recuperou o titulo.' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'Decisao Unanime', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo controlada. Dominou nos pontos sem forcar muito.' },
        ],
        full_fight_history: [
          { date: 'Fev 2018', opponent: 'Rob Wilkinson', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC na Australia' },
          { date: 'Jun 2018', opponent: 'Marvin Vettori', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao apertada' },
          { date: 'Nov 2018', opponent: 'Derek Brunson', result: 'W', method: 'TKO R1', opponent_rank: '#9 MW', quality_score: 3, quality_label: 'Bom', note: 'KO de contragolpe' },
          { date: 'Fev 2019', opponent: 'Anderson Silva', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Passagem de tocha' },
          { date: 'Abr 2019', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD (5 rounds)', opponent_rank: '#4 MW', quality_score: 5, quality_label: 'Excelente', note: 'Titulo interino. Hall da Fama UFC. FOTN' },
          { date: 'Out 2019', opponent: 'Robert Whittaker', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Unificou titulo' },
          { date: 'Mar 2020', opponent: 'Yoel Romero', result: 'W', method: 'UD', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa controversa' },
          { date: 'Set 2020', opponent: 'Paulo Costa', result: 'W', method: 'TKO R2', opponent_rank: '#1 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Dominio total' },
          { date: 'Mar 2021', opponent: 'Jan Blachowicz', result: 'L', method: 'UD', opponent_rank: 'Campeao LHW', quality_score: 5, quality_label: 'Excelente', note: 'Tentou titulo LHW, perdeu' },
          { date: 'Jun 2021', opponent: 'Marvin Vettori', result: 'W', method: 'UD (5 rounds)', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo, dominio' },
          { date: 'Fev 2022', opponent: 'Robert Whittaker', result: 'W', method: 'UD (5 rounds)', opponent_rank: '#1 MW', quality_score: 5, quality_label: 'Excelente', note: 'Defesa de titulo, masterclass' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu titulo' },
          { date: 'Fev 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Nocaute de vinganca, recuperou titulo' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'UD', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Upset, perdeu titulo' },
          { date: 'Ago 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Sub R4', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Primeira submissao da carreira' },
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocauteado por overhand' },
        ],
        momentum_score: 3,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'descending',
        momentum_note: 'Adesanya esta no pior momento da carreira. Tres derrotas consecutivas contra opponents de qualidade (Strickland, Du Plessis, Imavov), com 13 meses de inatividade. Aos 36 anos, a recuperacao e incerta. No entanto, Izzy disse que esta lutando "com liberdade", sem a pressao do titulo. Se isso e verdade, pode ser a versao mais perigosa do Stylebender: sem nada a perder.',
      },
      fighter2: {
        nome: 'Joe Pyfer',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Submissao R2 (face crank)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sub por face crank. Mostrou versatilidade alem do striking. POTN bonus.' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou com pressao e 2 knockdowns. Primeira decisao da carreira no UFC.' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1 (1:25)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute brutal com uppercut. POTN bonus.' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao rapida contra poder puro.' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'Decisao Unanime (48-47 x3)', opponent_rank: '#8 MW', quality_score: 3, quality_label: 'Bom', note: 'Pyfer dominou os primeiros rounds mas CANSOU. Hermansson voltou nos rounds finais e venceu por decisao. Expoe o cardio de Pyfer em lutas longas.' },
        ],
        full_fight_history: [
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'UD (48-47 x3)', opponent_rank: '#8 MW', quality_score: 3, quality_label: 'Bom', note: 'Perdeu por cardio nos rounds finais' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO rapido' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'POTN' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '2 knockdowns' },
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'POTN' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Pyfer esta no melhor momento da carreira. Tres vitorias seguidas com dois bonus de Performance, mostrando evolucao real (nocaute, decisao com knockdowns, submissao). Mas o nivel de oposicao ainda e questionavel: Barriault, Gastelum e Magomedov nao sao elite. Adesanya e um salto ENORME de qualidade.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Adesanya',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '13W-5L (72%)',
        contra_top5: '7W-4L',
      },
      fighter2: {
        nome: 'Pyfer',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '6W-1L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos enfrentaram Kelvin Gastelum. Adesanya venceu por decisao unanime em 5 rounds no UFC 236 (abril de 2019), numa luta epica pelo titulo interino que entrou pro Hall da Fama do UFC. Pyfer venceu por decisao unanime com 2 knockdowns em junho de 2025. Adesanya enfrentou a elite do peso-medio por 7 anos. Pyfer nunca enfrentou um top 5.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.94, valueB: 3.63, maxVal: 6, format: 'decimal', note: 'Volume similar, Adesanya com leve vantagem' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 46, maxVal: 100, format: 'percent', note: 'Precisao quase identica' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.00, valueB: 2.80, maxVal: 5, format: 'decimal', reverseWinner: true, note: 'Adesanya absorve MUITO menos, refletindo a defesa e o footwork superior' },
        { label: 'Defesa de Strikes (%)', valueA: 56, valueB: 50, maxVal: 100, format: 'percent', note: 'Adesanya defende melhor' },
        { label: 'Takedowns por 15 Min', valueA: 0.05, valueB: 1.23, maxVal: 3, format: 'decimal', note: 'Pyfer tenta mais takedowns, Adesanya quase nunca' },
        { label: 'Defesa de Takedown (%)', valueA: 77, valueB: 60, maxVal: 100, format: 'percent', note: 'Adesanya tem TDD forte' },
        { label: 'Knockdowns por 15 Min', valueA: 0.80, valueB: 1.20, maxVal: 2, format: 'decimal', note: 'Pyfer derruba mais: top 4 do peso-medio' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '36 anos', fighter2: '29 anos', note: 'Adesanya 7 anos mais velho' },
        { label: 'Altura', fighter1: '1,93m (6\'4")', fighter2: '1,88m (6\'2")', note: 'Adesanya 5cm mais alto' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '188cm (74")', note: 'Adesanya com 6 POLEGADAS a mais de reach' },
        { label: 'Stance', fighter1: 'Switch', fighter2: 'Ortodoxo', note: 'Adesanya muda de base constantemente' },
        { label: 'Academia', fighter1: 'City Kickboxing, Auckland', fighter2: 'Marquez MMA, Philadelphia', note: 'Adesanya treina com Volkanovski, Hooker e Whittaker (convidado). Pyfer treina com Sean Brady e Andre Petroski.' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 90, valueB: 72, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya e um dos melhores strikers da historia do UFC. Jab, timing, angulos, switch stance. Mesmo em declinio, a tecnica e elite.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 85, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Pyfer tem 1.2 knockdowns/15min (top 4 MW). O uppercut que nocauteou Barriault e assustador. Adesanya nao e nocauteador nato, mas os 13 knockdowns no UFC mostram precisao letal.' },
        { label: 'Defesa e Footwork', valueA: 85, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya absorve apenas 2.00 strikes/min, um dos menores do peso-medio. O footwork e a distancia sao armas defensivas de elite.' },
        { label: 'Wrestling/Grappling', valueA: 55, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Pyfer treina com Sean Brady e Andre Petroski no Marquez MMA (Philadelphia), um gym forte em grappling. Adesanya tem 77% TDD mas foi submetido por Du Plessis. Pyfer submeteu Magomedov com face crank.' },
        { label: 'Cardio e Gas', valueA: 75, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya tem experiencia em 5 rounds (7 main events). Pyfer PERDEU a unica luta longa da carreira UFC (Hermansson UD) porque cansou nos rounds finais. Fraqueza exposta.' },
        { label: 'Experiencia de Elite', valueA: 95, valueB: 40, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Adesanya enfrentou Pereira (2x), Whittaker (2x), Du Plessis, Strickland, Imavov, Gastelum, Cannonier. Pyfer enfrentou Barriault, Gastelum, Magomedov. A diferenca de experiencia e um abismo.' },
      ],
      insight: 'Adesanya tem vantagens claras em tecnica, defesa, experiencia e cardio. Pyfer tem vantagem em poder de nocaute e juventude. A luta se resume a: Adesanya consegue manter distancia com o reach de 5 polegadas e usar a tecnica, ou Pyfer consegue fechar e conectar algo pesado contra um queixo que pode estar comprometido?',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Adesanya',
        ko_tko: { count: 16, percent: 67 },
        submission: { count: 0, percent: 0 },
        decision: { count: 8, percent: 33 },
        total_wins: 24,
      },
      fighter2: {
        nome: 'Pyfer',
        ko_tko: { count: 9, percent: 60 },
        submission: { count: 4, percent: 27 },
        decision: { count: 2, percent: 13 },
        total_wins: 15,
      },
      insight: 'Ambos sao finalizadores: Adesanya com 67% KO e Pyfer com 60% KO + 27% sub. A diferenca e que Adesanya no nivel UFC tende a ir pra decisao (8 de 13 vitorias UFC) enquanto Pyfer busca o finish cedo. Pyfer raramente vai pros juizes (apenas 2 decisoes em 15 vitorias). Se a luta for longa, favorece Adesanya. Se for curta, favorece Pyfer.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 7,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Janela de Pyfer',
          description: 'Pyfer e mais perigoso aqui: 1.2 knockdowns/15min contra um queixo comprometido por Imavov. Mas Adesanya comeca devagar, estudando com o jab. Quem ditar a distancia nos primeiros 5 minutos controla a luta inteira.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'O Round da Transicao',
          description: 'Pyfer nunca venceu uma luta que passou do R2. Hermansson expoe isso: Pyfer cansou e perdeu por decisao. Se Adesanya sobreviver os primeiros 10 minutos, o R3 e onde a tecnica supera o poder.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 4,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'Championship Rounds',
          description: 'Territorio desconhecido pra Pyfer. Adesanya esteve em 7 main events de 5 rounds. Se chegar aqui, experiencia e fight IQ dominam. Pyfer provavelmente ja esta esgotado.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'AlertTriangle', title: 'Queixo Comprometido', fighter: 'Adesanya', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Adesanya foi nocauteado por Imavov no R2 com um overhand right. Antes disso, Pereira o abalou varias vezes. Aos 36 anos, a durabilidade do queixo e a maior preocupacao. Um poder shot de Pyfer pode ser fatal.' },
        { icon: 'Brain', title: 'Experiencia de Elite', fighter: 'Adesanya', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Adesanya lutou contra os 5 melhores peso-medios da era moderna. Pyfer nunca enfrentou alguem desse calibre. O fight IQ, o timing e a capacidade de adaptacao de Izzy sao incomparaveis.' },
        { icon: 'Clock', title: '13 Meses de Inatividade', fighter: 'Adesanya', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Adesanya nao luta desde fevereiro de 2025. A ferrugem de cage pode afetar o timing nos primeiros minutos, especialmente contra um adversario explosivo.' },
        { icon: 'TrendingUp', title: 'Momentum de 3 Vitorias', fighter: 'Pyfer', risk_level: 'POSITIVO', risk_color: 'green', description: 'Pyfer vem de 3 vitorias com 2 bonus de Performance. A confianca esta no pico e ele esta melhorando a cada luta (KO, decisao com knockdowns, submissao).' },
        { icon: 'Zap', title: 'Poder de Nocaute Elite', fighter: 'Pyfer', risk_level: 'POSITIVO', risk_color: 'green', description: '1.2 knockdowns por 15 minutos, top 4 do peso-medio. Pyfer tem o poder pra acabar a luta a qualquer momento. Combinado com o queixo comprometido de Izzy, e um risco constante.' },
        { icon: 'Target', title: 'Vantagem de Reach: 5 Polegadas', fighter: 'Adesanya', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Adesanya tem 80" de reach contra 75" de Pyfer. Cinco polegadas de diferenca e ENORME. Se Izzy usar o jab e manter distancia, Pyfer vai ter dificuldade pra entrar.' },
        { icon: 'Activity', title: 'Mindset "Sem Pressao"', fighter: 'Adesanya', risk_level: 'POSITIVO', risk_color: 'green', description: 'Adesanya disse que nao esta perseguindo o titulo e que "MMA ficou lento e preso" na ausencia dele. Lutando com liberdade, sem pressao de titulo, pode ser a versao mais criativa do Stylebender.' },
        { icon: 'Shield', title: 'Whittaker Como Sparring Partner', fighter: 'Adesanya', risk_level: 'POSITIVO', risk_color: 'green', description: 'Adesanya trouxe Robert Whittaker (quem ele venceu 2x) como sparring partner pro camp. Whittaker e um dos melhores middleweights da historia. Treinar com ele e uma vantagem enorme pra preparacao.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Adesanya',
        total_probability: 55,
        scenarios: [
          { name: 'Masterclass de Distancia', probability: 30, method: 'Decisao Unanime', description: 'Adesanya usa os 6 polegadas de reach pra manter Pyfer na ponta do jab. Contragolpes precisos, footwork lateral, e dominio nos pontos por 5 rounds. O Pyfer nao consegue fechar a distancia e e frustrado.' },
          { name: 'Nocaute Tardio', probability: 15, method: 'KO/TKO R3-R5', description: 'Adesanya machuca Pyfer nos rounds intermediarios quando o cardio comeca a pesar. Um contragolpe preciso quando Pyfer entra com tudo conecta limpo e encerra.' },
          { name: 'TKO por Acumulo', probability: 10, method: 'TKO R4-R5', description: 'Adesanya acumula dano com jabs e body shots. Nos championship rounds, Pyfer nao aguenta mais e o arbitro para.' },
        ],
      },
      fighter2: {
        nome: 'Pyfer',
        total_probability: 43,
        scenarios: [
          { name: 'Power Shot Devastador', probability: 22, method: 'KO/TKO R1-R2', description: 'Pyfer fecha distancia e conecta um power shot limpo contra o queixo comprometido de Adesanya. Pode ser uppercut, overhand ou combinacao. O queixo de Izzy nao aguenta e a luta acaba cedo.' },
          { name: 'Pressao e Volume', probability: 12, method: 'Decisao Unanime', description: 'Pyfer mantem pressao constante, nao deixa Adesanya encontrar ritmo, e vence nos pontos com volume e agressividade. Similar ao que Strickland fez.' },
          { name: 'Ground and Pound', probability: 9, method: 'TKO R2-R3', description: 'Pyfer muda o plano e busca takedowns. Com 100% de TD accuracy e Adesanya mostrando vulnerabilidade no chao (Du Plessis), Pyfer pode dominar com ground and pound.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Israel Adesanya',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'A narrativa de "Izzy esta acabado" e tentadora, mas os numeros contam outra historia. As 3 derrotas de Adesanya foram contra o #1 (Strickland), o campeao (Du Plessis) e o #7 que virou #1 (Imavov). Pyfer e #14 e NUNCA enfrentou alguem perto desse nivel. A vantagem de reach de 5 polegadas e a arma mais poderosa dessa luta: Adesanya pode tocar Pyfer com o jab sem ser tocado. O fight IQ, a experiencia em 5 rounds, e a capacidade de adaptacao de um ex-bicampeao nao desaparecem com 3 derrotas contra a elite. Pyfer e perigoso, mas e o tipo de oponente que Adesanya dominou a carreira inteira: striker agressivo que vem pra frente. A preocupacao real e o queixo. Se Pyfer conectar limpo nos primeiros 2 rounds, pode ser o fim. Mas prevejo Izzy mantendo distancia e vencendo nos pontos.',
      x_factor: {
        title: 'O Mindset de "Nada a Perder"',
        description: 'Adesanya disse que esta lutando com liberdade. Sem titulo pra defender, sem ranking pra proteger. Um Izzy solto, sem pressao, pode ser a versao mais criativa e perigosa do Stylebender. Ou pode ser alguem que nao tem mais fome. A resposta vem no R1.',
      },
      upset_alert: {
        title: 'O Queixo de Izzy vs O Poder de Pyfer',
        description: 'Pyfer tem 1.2 knockdowns por 15 minutos. Adesanya foi nocauteado por Imavov com um unico overhand right. Se Pyfer fechar distancia e conectar algo pesado nos primeiros 2 rounds, o queixo comprometido de Izzy pode nao aguentar. E o cenario mais provavel de upset.',
      },
      probabilities: {
        fighter1: { nome: 'Adesanya', percent: 55 },
        fighter2: { nome: 'Pyfer', percent: 43 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Adesanya (-140)', reasoning: 'Favorito justo. A tecnica, o reach de 6 polegadas, e a experiencia de elite sao reais. Mas -140 nao oferece muito valor dado as 3 derrotas consecutivas e o queixo comprometido.' },
        method: { pick: 'Vai para Decisao (-110)', reasoning: 'Adesanya foi a decisao em 8 de 13 vitorias UFC. Pyfer perdeu sua unica luta longa (Hermansson UD 48-47). Se o cardio de Pyfer falhar apos R2, e territorio de Adesanya.' },
        over_under: { pick: 'Over 3.5 Rounds', rounds: 3.5, reasoning: 'A unica derrota de Pyfer no UFC foi por DECISAO (Hermansson). Adesanya leva lutas longe. O cenario de luta rapida so acontece se Pyfer conectar limpo nos primeiros 2 rounds contra o queixo comprometido de Izzy.' },
        best_value: 'Pyfer ML (+120) e a aposta de valor. A narrativa de 3 derrotas de Izzy pesou nas odds, mas Pyfer perdeu pra Hermansson quando a luta foi longa. Se Pyfer conectar cedo contra o queixo comprometido, +120 paga bem. O risco e que Izzy controle a distancia com o reach.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Jab de Adesanya nos Primeiros 2 Minutos', icon: 'Target', description: 'Se Adesanya comecar usando o jab e mantendo distancia cedo, e sinal de que esta focado e o plano de jogo esta funcionando. Se hesitar ou deixar Pyfer fechar, e sinal de problemas.' },
        { num: 2, title: 'O Primeiro Power Shot de Pyfer', icon: 'Zap', description: 'Observe a reacao de Adesanya quando Pyfer conectar algo pesado pela primeira vez. O queixo vai aguentar? Se Izzy absorver e continuar em pe, Pyfer pode ficar sem plano B. Se vacilar, Pyfer vai sentir sangue.' },
        { num: 3, title: 'O Cardio de Pyfer no R3', icon: 'Activity', description: 'Pyfer nunca lutou alem do R2. Se a luta chegar ao R3, observe se ele comeca a desacelerar. Se o ritmo cair, Adesanya vai dominar os championship rounds.' },
        { num: 4, title: 'Switch Stance de Adesanya', icon: 'Brain', description: 'Quando Izzy esta confiante, ele muda de base constantemente (ortodoxo/southpaw). Se ele estiver trocando de stance, esta se sentindo confortavel. Se ficar preso numa base so, pode estar hesitante.' },
        { num: 5, title: 'A Distancia da Luta', icon: 'Eye', description: 'Essa luta vai ser decidida pela distancia. Se Adesanya manter na ponta do jab (distancia longa), ele domina. Se Pyfer conseguir fechar (distancia curta/media), ele e perigoso. Quem ditar a distancia ganha.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'A REDENCAO DE IZZY', content: 'ADESANYA vs PYFER\nUFC Seattle | Peso Medio\n5 Rounds\n\n24-5 vs 15-3\nEx-bicampeao com 3 derrotas seguidas\nvs Power puncher em ascensao\n\nIsso e redencao ou fim de era?', color: 'red' },
        { slide_number: 2, title: 'ADESANYA: A QUEDA', content: '13 knockdowns no UFC\n(recorde empatado com Anderson Silva)\nBicampeao. 5 defesas.\n\nMas:\nStrickland: Decisao (L)\nDu Plessis: Submissao R4 (L)\nImavov: TKO R2 (L)\n\n3 derrotas seguidas.\n36 anos. 13 meses parado.', color: 'red' },
        { slide_number: 3, title: 'PYFER: A ASCENSAO', content: '15-3 | 29 anos\n3 vitorias seguidas:\nKO Barriault R1 (POTN)\nUD Gastelum (2 knockdowns)\nSub Magomedov R2 (POTN)\n\n1.2 knockdowns por 15 min\nTop 4 do peso-medio.\nO poder e REAL.', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE: REACH', content: 'Adesanya: 203cm de envergadura\nPyfer: 190cm\n\n5 POLEGADAS de diferenca.\n\nSe Izzy manter na ponta do jab,\nPyfer nao chega.\n\nSe Pyfer fechar e conectar,\no queixo de Izzy pode nao aguentar.\n\nDistancia decide tudo.', color: 'gold' },
        { slide_number: 5, title: 'O QUEIXO DE IZZY', content: 'A maior preocupacao:\n\nImavov: TKO R2 (overhand)\nPereira: abalou multiplas vezes\nDu Plessis: derrubou no R4\n\nAos 36 anos, a durabilidade\nnao e a mesma.\n\nPyfer tem 1.2 knockdowns/15min.\nUm power shot pode ser fatal.', color: 'gold' },
        { slide_number: 6, title: 'PREVISAO', content: 'ADESANYA por Decisao Unanime\n\nConfianca: MEDIA\n55% Adesanya / 43% Pyfer\n\nA tecnica e o reach vao decidir.\nMas o queixo e uma incognita.\nSe Pyfer conectar cedo,\ntudo muda.', color: 'red' },
        { slide_number: 7, title: 'APOSTAS DE VALOR', content: 'MELHOR APOSTA:\nAdesanya ML (+105)\nEx-bicampeao como azarao\ncontra o #14 e valor puro.\n\nOVER 3.5 ROUNDS:\nIzzy leva lutas longe.\nPyfer nunca passou do R2.\n\nARMADILHA:\nPyfer por decisao.\nEle quase nunca vai pros juizes.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Adesanya vs Pyfer no sabado em Seattle. O ex-bicampeao com 3 derrotas seguidas contra o power puncher com 3 vitorias. Redencao ou fim de era? Thread:' },
        { num: '2/6', text: 'A estatistica que importa: Adesanya tem 80" de reach. Pyfer tem 75". Sao 5 POLEGADAS de diferenca. Se Izzy usar o jab, Pyfer nao chega. Mas se Pyfer fechar e conectar algo pesado, o queixo de Izzy pode nao aguentar.' },
        { num: '3/6', text: 'Hot take: As 3 derrotas de Izzy foram contra o #1 (Strickland), o campeao (Du Plessis) e o #7 (Imavov). Pyfer e #14 e NUNCA enfrentou alguem perto desse nivel. Adesanya como azarao e ridículo.' },
        { num: '4/6', text: 'O dado que ninguem fala: Pyfer nunca lutou alem do R2. NUNCA. Todas as vitorias por finish ou decisao de 3 rounds. Se a luta chegar ao R3, Pyfer esta em territorio COMPLETAMENTE desconhecido.' },
        { num: '5/6', text: 'Pick: Adesanya por decisao. A tecnica, o reach e a experiencia em 5 rounds vao ser demais pro Pyfer. Mas o queixo de Izzy e uma bomba-relogio. Se Pyfer conectar nos primeiros 2 rounds, tudo muda.' },
        { num: '6/6', text: 'Adesanya ML a +105 e a melhor aposta do card inteiro. Um ex-bicampeao com 6 polegadas de reach a mais como AZARAO contra o #14? O mercado esta errado.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Treze knockdowns. Empatado com Anderson Silva. Bicampeao. Cinco defesas. E nos ultimos dois anos, tres derrotas seguidas. A pergunta sobre Israel Adesanya: ele ainda e o Stylebender?' },
        { time: '10-30s', title: 'A Queda', text: 'Strickland tirou o titulo na maior surpresa da historia. Du Plessis submeteu pela primeira vez. Imavov nocauteou em 30 segundos do R2. 13 meses sem lutar. 36 anos. E agora enfrenta Joe Pyfer, 29 anos, 3 vitorias seguidas, poder real nas maos.' },
        { time: '30-50s', title: 'A Tese', text: 'Mas olha os numeros: as 3 derrotas foram contra top 5. Pyfer e #14 e nunca enfrentou elite. Adesanya tem 5 POLEGADAS de reach a mais. O jab e a arma mais poderosa dessa luta. Se Izzy manter distancia, Pyfer nao tem resposta.' },
        { time: '50-65s', title: 'O Risco', text: 'O problema e o queixo. Imavov nocauteou com um overhand. Pyfer tem 1.2 knockdowns por 15 minutos. Se fechar e conectar, pode ser o fim. O queixo de Izzy aos 36 anos e uma bomba-relogio.' },
        { time: '65-75s', title: 'Previsao', text: 'Minha pick: Adesanya por decisao. A tecnica e o reach vao decidir. Izzy como azarao a +105 e a melhor aposta do card. Mas se Pyfer conectar cedo, preparem-se pra chorar.' },
        { time: '75-85s', title: 'CTA', text: 'Izzy volta ou e o fim? Comenta e segue pra analise completa do UFC Seattle.' },
      ],
      tiktok: [
        { hook: 'O cara com 13 knockdowns no UFC perdeu 3 SEGUIDAS. Agora luta contra um power puncher.', body: 'Adesanya. Bicampeao. Empatado com Anderson Silva em knockdowns. Mas Strickland tirou o titulo. Du Plessis submeteu. Imavov nocauteou. 3 derrotas seguidas. 36 anos. E agora enfrenta Pyfer, 29 anos, 3 vitorias, 1.2 knockdowns por 15 minutos. MAS Izzy tem 5 POLEGADAS de reach a mais. Se usar o jab, Pyfer nao chega. Se Pyfer fechar e conectar, o queixo pode nao aguentar.', cta: 'Redencao ou fim de era? Comenta!' },
        { hook: '5 POLEGADAS. Essa e a diferenca entre Adesanya e Pyfer.', body: 'Adesanya: 203cm de envergadura. Pyfer: 190cm. 5 polegadas. Isso e ENORME em MMA. Izzy pode tocar Pyfer sem ser tocado. O jab decide. Mas o queixo de Adesanya foi comprometido por Imavov. E Pyfer tem 1.2 knockdowns por 15 min. Se fechar, pode ser brutal.', cta: 'O reach decide ou o poder vence? Comenta!' },
        { hook: 'Adesanya como AZARAO? O mercado esta LOUCO.', body: 'Um ex-bicampeao com 13 knockdowns no UFC, 6 polegadas de reach a mais, e experiencia contra os 5 melhores do mundo. Contra o #14 que nunca enfrentou elite. E o mercado coloca Izzy como AZARAO a +105? As 3 derrotas foram contra Strickland (#1), Du Plessis (campeao) e Imavov (#7). Pyfer e #14. A diferenca de nivel e ENORME.', cta: 'Voce apostaria no Izzy? Comenta!' },
      ],
      headlines: [
        'Adesanya vs Pyfer: Redencao ou Fim de Uma Era no Peso-Medio',
        'O Stylebender Ainda Existe? 3 Derrotas, 36 Anos, e Um Ultimo Teste',
        '5 Polegadas de Reach: A Arma Secreta de Adesanya Contra Pyfer',
        'Pyfer Tem o Poder, Mas Nunca Enfrentou Alguem Como Adesanya',
        'UFC Seattle: O Main Event Que Vai Definir o Futuro do Peso-Medio',
        'Adesanya Como Azarao: Por Que o Mercado Esta Errado',
        '13 Knockdowns e 3 Derrotas: A Dualidade de Israel Adesanya',
      ],
      podcast: [
        {
          timestamp: '0:00-5:00',
          title: 'A Queda do Rei',
          talking_points: [
            'De 2018 a 2023, Adesanya era invencivel. Titulo interino, unificacao, 5 defesas, nocaute de vinganca contra Pereira. 13 knockdowns empatado com Anderson Silva.',
            'Ai veio a queda: Strickland (UD), Du Plessis (sub R4), Imavov (TKO R2). Tres tipos diferentes de derrota mostrando tres vulnerabilidades diferentes.',
            'O mindset novo: "lutando com liberdade". Isso e bom (menos pressao) ou e o codigo pra "nao me importo mais"?',
          ],
          discussion_questions: [
            'Se Adesanya perder, deveria se aposentar?',
            'As 3 derrotas sao declinio real ou so resultado de enfrentar a elite?',
          ],
        },
        {
          timestamp: '5:00-10:00',
          title: 'O Teste: Pyfer',
          talking_points: [
            'Pyfer como oponente: 3 vitorias seguidas, 2 bonus POTN. Poder real. Mas NUNCA enfrentou alguem do nivel de Adesanya.',
            'A vantagem de reach: 5 polegadas e MASSIVO. Se Izzy usar o jab, Pyfer vai ter dificuldade pra entrar.',
            'O risco do queixo: Adesanya foi nocauteado por Imavov com UM soco. Pyfer tem 1.2 knockdowns/15min. A matematica e perigosa.',
            'Previsao: Adesanya por decisao. A tecnica e demais pro #14.',
          ],
          discussion_questions: [
            'Adesanya ML a +105 e valor real ou armadilha emocional?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-140',
        fighter2_odds: '+120',
        fighter1_name: 'Israel Adesanya',
        fighter2_name: 'Joe Pyfer',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Vantagem de Reach Massiva', stat_headline: 'ADESANYA TEM 203CM DE ENVERGADURA VS 190CM DE PYFER (5 POLEGADAS A MAIS)', contexto: 'A maior diferenca de reach em qualquer main event recente do peso-medio. Adesanya pode tocar Pyfer sem ser tocado se usar o jab.', implicacao_aposta: 'Favorece Adesanya por decisao e Over rounds. A distancia deve neutralizar o poder de Pyfer.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Poder de Nocaute de Pyfer', stat_headline: '1.2 KNOCKDOWNS POR 15 MINUTOS (TOP 4 MW)', contexto: 'Pyfer derruba adversarios com frequencia altissima. Combinado com o queixo comprometido de Adesanya, e um risco constante.', implicacao_aposta: 'Favorece Pyfer por KO/TKO nos primeiros 2 rounds. Under pode ter valor se voce acredita no poder.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Gap de Experiencia Absurdo', stat_headline: 'ADESANYA ENFRENTOU 5 DOS 10 MELHORES MWs DA ERA. PYFER NUNCA ENFRENTOU UM TOP 10.', contexto: 'A diferenca de experiencia contra elite e um abismo. Adesanya sabe como se comportar em main events de 5 rounds. Pyfer nao.', implicacao_aposta: 'Favorece Adesanya em lutas longas e nos championship rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Queixo Comprometido de Adesanya', stat_headline: 'NOCAUTEADO POR IMAVOV NO R2, ABALADO POR PEREIRA MULTIPLAS VEZES', contexto: 'Adesanya aos 36 anos nao tem a mesma durabilidade. O TKO por Imavov foi com um unico overhand. Preocupacao real.', implicacao_aposta: 'Aumenta o risco de finalizacao precoce. Pyfer por KO R1-R2 tem valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Pyfer Nunca Passou do R2', stat_headline: 'TODAS AS VITORIAS E DERROTAS DE PYFER TERMINARAM NOS 2 PRIMEIROS ROUNDS OU POR DECISAO DE 3', contexto: 'Pyfer nao tem experiencia em lutas longas. Se a luta chegar ao R3+, esta em territorio desconhecido contra um especialista de 5 rounds.', implicacao_aposta: 'Over 3.5 rounds favorece Adesanya. Se chegar ao R4, Pyfer pode desmoronar.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-115', confianca: 'media', raciocinio: 'A melhor aposta do main event. Adesanya foi a decisao em 8 de 13 vitorias UFC. A unica derrota de Pyfer no UFC (Hermansson) foi decisao de 5 rounds. Ambos tendem a lutas longas quando nao tem nocaute.' },
        { tipo: 'Metodo', pick: 'Pyfer por KO/TKO R1-R2', odds: '+250', confianca: 'baixa', edge_vs_mercado: 'Se o queixo de Izzy nao aguenta, +250 paga MUITO. Imavov nocauteou Adesanya com UM overhand. Pyfer tem 1.2 knockdowns/15min.', raciocinio: 'Aposta de risco/recompensa. O cenario e real dado o queixo comprometido. Mas Pyfer precisa fechar 6 polegadas de reach pra conectar.' },
        { tipo: 'Prop', pick: 'Total Sig. Strikes Over 120.5', odds: '-110', confianca: 'media', raciocinio: 'Adesanya media 3.94 SLpM e Pyfer 3.63. Em 5 rounds (25 min), a soma esperada e ~190 strikes significativos. Over 120.5 e conservador e deve bater facilmente se a luta for longe.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Pyfer por Decisao',
        descricao: 'Pyfer tem apenas 2 decisoes em 15 vitorias (13%). Ele quase nunca vai pros juizes. Apostar em Pyfer por decisao e ir contra todo o historico. Ou ele nocauteia cedo ou e frustrado pela tecnica de Adesanya.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
