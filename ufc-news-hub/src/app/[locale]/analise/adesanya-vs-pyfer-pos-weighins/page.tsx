import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'adesanya-vs-pyfer-pos-weighins',
  evento_id: null,
  slug: 'adesanya-vs-pyfer-pos-weighins',
  titulo: 'Adesanya vs Pyfer: Pos Weigh-Ins | A Linha Mudou TUDO',
  subtitulo: 'Adesanya saiu de +105 (azarao) pra -300 (grande favorito). A maior movimentacao de linha do card. O que aconteceu na pesagem?',
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
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: 'Vantagem de Reach', edge: 'fighter1', impact: 9, description: '6 polegadas de reach a mais. O jab de Adesanya e a arma mais poderosa dessa luta.' },
      { factor: 'Poder de Nocaute', edge: 'fighter2', impact: 8, description: '1.2 knockdowns/15min de Pyfer contra o queixo comprometido de Izzy.' },
      { factor: 'Experiencia de Elite', edge: 'fighter1', impact: 9, description: 'Adesanya enfrentou os 5 melhores MWs. Pyfer nunca enfrentou um top 10.' },
      { factor: 'Weigh-In Momentum', edge: 'fighter1', impact: 8, description: 'Adesanya pareceu fenomenal na pesagem. Pyfer pareceu tenso e possivelmente depletado. Linha explodiu.' },
    ],
    xFactor: {
      title: 'A Movimentacao de Linha Historica',
      description: 'De +105 pra -300 e uma das maiores movimentacoes de linha da historia recente do UFC. Algo mudou drasticamente na percepcao do mercado apos as pesagens.',
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
      tagline: 'Pos Weigh-Ins: A Linha Mudou TUDO',
      tagline_sub: 'De +105 pra -300. Adesanya pareceu fenomenal na pesagem. Pyfer pareceu depletado. A maior movimentacao de linha do card.',
      fighter1: {
        nome_completo: 'Israel "The Last Stylebender" Adesanya',
        apelido: 'The Last Stylebender',
        sobrenome: 'Adesanya',
        record: '24-5-0',
        ranking: '#4 Peso Medio',
        info_extra: 'Lagos, Nigeria / Auckland, Nova Zelandia | 36 anos | 185.5 lbs na pesagem',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/ADESANYA_ISRAEL_L_03-28.png?itok=krImOvG1',
      },
      fighter2: {
        nome_completo: 'Joe "Bodybagz" Pyfer',
        apelido: 'Bodybagz',
        sobrenome: 'Pyfer',
        record: '15-3-0',
        ranking: '#14 Peso Medio',
        info_extra: 'Allentown, PA | Marquez MMA, Philadelphia | 29 anos | 185 lbs na pesagem',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=prLW4_bl',
      },
    },

    narrativa: {
      html_content: `
        <!-- WEIGH-IN UPDATE -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Atualizacao Pos Weigh-Ins</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-emerald-400/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">MOVIMENTACAO DE LINHA HISTORICA</p>
              <div class="grid grid-cols-2 gap-6 mb-4">
                <div class="text-center">
                  <p class="text-xs text-white/40 mb-1">Linha de Abertura</p>
                  <p class="font-display text-3xl text-white/60">+105</p>
                  <p class="text-[10px] text-white/30 mt-1">Adesanya AZARAO</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-white/40 mb-1">Linha Atual (Pos Pesagem)</p>
                  <p class="font-display text-3xl text-emerald-400">-300</p>
                  <p class="text-[10px] text-emerald-400/70 mt-1">Adesanya GRANDE FAVORITO</p>
                </div>
              </div>
              <p class="text-sm text-white/60 leading-relaxed">
                A maior movimentacao de linha do card inteiro. <strong class="text-emerald-400">Adesanya</strong> saiu de azarao (+105) pra grande favorito (-300). Algo aconteceu na pesagem que mudou TUDO: Izzy pesou 185.5 lbs e pareceu fisicamente impecavel. Corpo definido, olhar focado, energia controlada. Pyfer pesou 185 lbs e pareceu visivelmente nervoso e possivelmente depletado pelo corte de peso. No face off, Adesanya manteve compostura total enquanto Pyfer parecia tenso.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Adesanya na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">FENOMENAL</p>
                <p class="text-xs text-white/50 leading-relaxed">185.5 lbs. Corpo definido, sem sinais de corte de peso difícil. Olhar focado. Energia controlada no face off. Pareceu o Izzy de 2019-2022, fisicamente no melhor shape em anos. O trabalho com Bill Smart (preparador fisico) esta evidente.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-amber-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-amber-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Pyfer na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">PREOCUPANTE</p>
                <p class="text-xs text-white/50 leading-relaxed">185 lbs. Rosto mais magro que o normal. Pareceu nervoso e possivelmente depletado pelo corte. No face off, a linguagem corporal era tensa. Pode ser apenas nervosismo do main event, ou pode indicar um corte de peso mais dificil que o esperado.</p>
              </div>
            </div>
          </div>
        </div>

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
            <p class="font-display text-lg text-white/70 mt-2 italic">"Mas na pesagem, Izzy pareceu RENASCIDO."</p>
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
                <p class="text-sm text-white/60 leading-relaxed">Bill Smart focando em sono, estresse, detalhes. Recalibracao silenciosa de um atleta de 36 anos. O resultado apareceu na pesagem.</p>
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
                <p class="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Pyfer "renascido" e prometendo destruicao</p>
                <p class="text-sm text-white/60 leading-relaxed">Disse a Helwani: <em class="text-white/80">"Vou machucar Adesanya de um jeito muito feio. Ele nao vai se mover."</em> Encontrou a fe e teve "um 180 total" na vida. Adesanya respondeu: espera Pyfer virar wrestler e esta preparado. Prometeu trazer "tecnicas esquecidas".</p>
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
        { dimensao: 'Weigh-In', fighter1: 'Pareceu fenomenal, corpo impecavel', fighter2: 'Pareceu tenso e possivelmente depletado' },
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
        momentum_score: 4,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'descending',
        momentum_note: 'Adesanya esta no pior momento da carreira. Tres derrotas consecutivas contra opponents de qualidade (Strickland, Du Plessis, Imavov), com 13 meses de inatividade. Aos 36 anos, a recuperacao e incerta. Porem, a pesagem mudou a narrativa: Izzy pareceu fisicamente impecavel e focado. O trabalho com o preparador fisico Bill Smart esta visivel. A movimentacao de linha massiva (de +105 pra -300) reflete essa mudanca de percepcao.',
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
          { date: 'Set 2022', opponent: 'Alen Amedovski', result: 'W', method: 'TKO R1 (3:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC' },
          { date: 'Abr 2023', opponent: 'Gerald Meerschaert', result: 'W', method: 'TKO R1 (3:15)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segundo KO R1' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2 (arm triangle, 2:05)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Grappling' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'UD (48-47 x3)', opponent_rank: '#8 MW', quality_score: 3, quality_label: 'Bom', note: 'Cansou nos rounds finais' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1 (1:25)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Uppercut devastador, POTN' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: '2 knockdowns, primeira decisao' },
          { date: 'Out 2025', opponent: 'Abus Magomedov', result: 'W', method: 'Sub R2 (RNC, 1:46)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'RNC, POTN' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Pyfer esta no melhor momento da carreira. Tres vitorias seguidas com dois bonus de Performance. Mas o nivel de oposicao ainda e questionavel. A pesagem trouxe preocupacoes: Pyfer pareceu tenso e possivelmente depletado pelo corte de peso. Em uma luta de 5 rounds contra um especialista de championship rounds, qualquer sinal de depletacao e preocupante.',
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
        { label: 'Peso na Pesagem', fighter1: '185.5 lbs', fighter2: '185 lbs', note: 'Ambos bateram o peso. Adesanya pesou um pouco mais, mostrando que nao teve corte difícil.' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 90, valueB: 72, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya e um dos melhores strikers da historia do UFC. Jab, timing, angulos, switch stance. Mesmo em declinio, a tecnica e elite.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 85, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Pyfer tem 1.2 knockdowns/15min (top 4 MW). O uppercut que nocauteou Barriault e assustador. Adesanya nao e nocauteador nato, mas os 13 knockdowns no UFC mostram precisao letal.' },
        { label: 'Defesa e Footwork', valueA: 85, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya absorve apenas 2.00 strikes/min, um dos menores do peso-medio. O footwork e a distancia sao armas defensivas de elite.' },
        { label: 'Wrestling/Grappling', valueA: 55, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Pyfer treina com Sean Brady e Andre Petroski no Marquez MMA (Philadelphia), um gym forte em grappling. Adesanya tem 77% TDD mas foi submetido por Du Plessis. Pyfer submeteu Magomedov com face crank.' },
        { label: 'Cardio e Gas', valueA: 75, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya tem experiencia em 5 rounds (7 main events). Pyfer PERDEU a unica luta longa da carreira UFC (Hermansson UD) porque cansou nos rounds finais. Fraqueza exposta. Depletacao na pesagem pode piorar isso.' },
        { label: 'Experiencia de Elite', valueA: 95, valueB: 40, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Adesanya enfrentou Pereira (2x), Whittaker (2x), Du Plessis, Strickland, Imavov, Gastelum, Cannonier. Pyfer enfrentou Barriault, Gastelum, Magomedov. A diferenca de experiencia e um abismo.' },
      ],
      insight: 'Adesanya tem vantagens claras em tecnica, defesa, experiencia e cardio. Pyfer tem vantagem em poder de nocaute e juventude. Pos pesagem, a vantagem de Adesanya parece ainda maior: fisicamente impecavel contra um Pyfer que pode ter tido um corte difícil.',
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
          danger_level: 6,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'A Janela de Pyfer (Menor Pos Pesagem)',
          description: 'Pyfer e mais perigoso aqui: 1.2 knockdowns/15min. Mas apos a pesagem, a janela parece menor. Se Pyfer cortou peso de forma difícil, a explosividade nos primeiros rounds pode estar comprometida. Adesanya, que pareceu fisicamente impecavel, pode impor o jab desde o R1.',
        },
        {
          rounds: 'R3',
          danger_level: 4,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'O Round da Transicao',
          description: 'Pyfer nunca venceu uma luta que passou do R2. Se a pesagem indicou depletacao, o R3 e onde Pyfer pode desmoronar. A tecnica de Adesanya deve dominar completamente.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 3,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'Championship Rounds',
          description: 'Territorio desconhecido pra Pyfer. Adesanya esteve em 7 main events de 5 rounds. Se chegar aqui, experiencia e fight IQ dominam. Pyfer provavelmente ja esta esgotado, especialmente com possivel depletacao da pesagem.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'AlertTriangle', title: 'Queixo Comprometido', fighter: 'Adesanya', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Adesanya foi nocauteado por Imavov no R2 com um overhand right. Antes disso, Pereira o abalou varias vezes. Aos 36 anos, a durabilidade do queixo e a maior preocupacao. Um poder shot de Pyfer pode ser fatal.' },
        { icon: 'Brain', title: 'Experiencia de Elite', fighter: 'Adesanya', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Adesanya lutou contra os 5 melhores peso-medios da era moderna. Pyfer nunca enfrentou alguem desse calibre. O fight IQ, o timing e a capacidade de adaptacao de Izzy sao incomparaveis.' },
        { icon: 'TrendingUp', title: 'Pesagem Impecavel', fighter: 'Adesanya', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Adesanya pareceu fenomenal na pesagem: corpo definido, focado, energia controlada. 185.5 lbs sem sinais de corte difícil. O trabalho com Bill Smart (preparador fisico) esta visivel. A linha explodiu de +105 pra -300 por causa disso.' },
        { icon: 'Activity', title: 'Possivel Depletacao na Pesagem', fighter: 'Pyfer', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Pyfer pareceu tenso e possivelmente depletado na pesagem. Rosto mais magro que o normal. Se o corte de peso foi difícil, o cardio (ja problemático) pode ser ainda pior. Em 5 rounds, isso e fatal.' },
        { icon: 'Clock', title: '13 Meses de Inatividade', fighter: 'Adesanya', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Adesanya nao luta desde fevereiro de 2025. A ferrugem de cage pode afetar o timing nos primeiros minutos, especialmente contra um adversario explosivo.' },
        { icon: 'TrendingUp', title: 'Momentum de 3 Vitorias', fighter: 'Pyfer', risk_level: 'POSITIVO', risk_color: 'green', description: 'Pyfer vem de 3 vitorias com 2 bonus de Performance. A confianca esta no pico e ele esta melhorando a cada luta (KO, decisao com knockdowns, submissao).' },
        { icon: 'Target', title: 'Vantagem de Reach: 5 Polegadas', fighter: 'Adesanya', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Adesanya tem 80" de reach contra 75" de Pyfer. Cinco polegadas de diferenca e ENORME. Se Izzy usar o jab e manter distancia, Pyfer vai ter dificuldade pra entrar.' },
        { icon: 'Shield', title: 'Whittaker Como Sparring Partner', fighter: 'Adesanya', risk_level: 'POSITIVO', risk_color: 'green', description: 'Adesanya trouxe Robert Whittaker (quem ele venceu 2x) como sparring partner pro camp. Whittaker e um dos melhores middleweights da historia. Treinar com ele e uma vantagem enorme pra preparacao.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Adesanya',
        total_probability: 65,
        scenarios: [
          { name: 'Masterclass de Distancia', probability: 35, method: 'Decisao Unanime', description: 'Adesanya usa os 6 polegadas de reach pra manter Pyfer na ponta do jab. Contragolpes precisos, footwork lateral, e dominio nos pontos por 5 rounds. Pyfer, possivelmente depletado, nao consegue fechar a distancia.' },
          { name: 'Nocaute Tardio', probability: 18, method: 'KO/TKO R3-R5', description: 'Adesanya machuca Pyfer nos rounds intermediarios quando o cardio comeca a pesar. Um contragolpe preciso quando Pyfer entra com tudo conecta limpo e encerra.' },
          { name: 'TKO por Acumulo', probability: 12, method: 'TKO R4-R5', description: 'Adesanya acumula dano com jabs e body shots. Nos championship rounds, Pyfer nao aguenta mais e o arbitro para.' },
        ],
      },
      fighter2: {
        nome: 'Pyfer',
        total_probability: 33,
        scenarios: [
          { name: 'Power Shot Devastador', probability: 18, method: 'KO/TKO R1-R2', description: 'Pyfer fecha distancia e conecta um power shot limpo contra o queixo comprometido de Adesanya. Pode ser uppercut, overhand ou combinacao. O queixo de Izzy nao aguenta e a luta acaba cedo.' },
          { name: 'Pressao e Volume', probability: 9, method: 'Decisao Unanime', description: 'Pyfer mantem pressao constante, nao deixa Adesanya encontrar ritmo, e vence nos pontos com volume e agressividade. Similar ao que Strickland fez.' },
          { name: 'Ground and Pound', probability: 6, method: 'TKO R2-R3', description: 'Pyfer muda o plano e busca takedowns. Com Adesanya mostrando vulnerabilidade no chao (Du Plessis), Pyfer pode dominar com ground and pound.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Israel Adesanya',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'A pesagem mudou tudo. Adesanya abriu como azarao a +105 e agora e grande favorito a -300. Izzy pareceu fisicamente impecavel na pesagem: corpo definido, focado, energia controlada. Pyfer pareceu tenso e possivelmente depletado. Combinando isso com os fundamentos que ja favoreciam Adesanya (6 polegadas de reach, experiencia em 5 rounds, fight IQ de elite contra oposicao de nivel medio de Pyfer), a confianca subiu de MEDIA pra MEDIA-ALTA. O unico risco permanece o mesmo: o queixo comprometido de Izzy. Se Pyfer conectar limpo nos primeiros 2 rounds, pode acabar. Mas a probabilidade caiu apos a pesagem. Prevejo Adesanya controlando a distancia com o jab e vencendo nos pontos de forma confortavel.',
      x_factor: {
        title: 'A Movimentacao de Linha Historica',
        description: 'De +105 pra -300 e uma mudanca que quase nunca acontece em main events do UFC. O mercado viu algo na pesagem que confirmou: Adesanya esta pronto e Pyfer pode nao estar no melhor shape. Se o mercado estiver certo, essa luta pode ser mais facil pro Izzy do que qualquer um esperava.',
      },
      upset_alert: {
        title: 'O Queixo de Izzy Continua La',
        description: 'Mesmo com a pesagem favoravel, o queixo de Adesanya nao mudou. Pyfer tem 1.2 knockdowns por 15 minutos. Se conectar algo pesado nos primeiros 2 rounds, a pesagem nao importa. Poder de nocaute e atemporal.',
      },
      probabilities: {
        fighter1: { nome: 'Adesanya', percent: 65 },
        fighter2: { nome: 'Pyfer', percent: 33 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Adesanya (-300)', reasoning: 'A -300 NAO tem valor. A linha abriu a +105 e explodiu. Se voce apostou cedo no Izzy, parabens. A -300 agora, o preco ja reflete tudo que a pesagem mostrou. So aposte se for parlay.' },
        method: { pick: 'Vai para Decisao (-110)', reasoning: 'Adesanya foi a decisao em 8 de 13 vitorias UFC. Pyfer perdeu sua unica luta longa (Hermansson UD). Se o cardio de Pyfer falhar apos R2 (provavel com possivel depletacao), Izzy controla ate o final.' },
        over_under: { pick: 'Over 3.5 Rounds', rounds: 3.5, reasoning: 'Com Adesanya muito mais favorito, a tendencia e uma luta controlada. Izzy deve usar o jab e o footwork pra neutralizar Pyfer sem se arriscar. Luta longa e provavel.' },
        best_value: 'Over 3.5 Rounds e a melhor aposta pos weigh-ins. Com Adesanya a -300 e Pyfer possivelmente depletado, a tendencia e uma masterclass tecnica que vai a distancia. Se voce apostou no Izzy ML quando era +105, segure e aproveite. Se nao apostou, a janela de valor fechou.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Reidratacao de Pyfer', icon: 'Activity', description: 'Pyfer pareceu depletado na pesagem. Observe o fisico dele no cage: se pareceu recuperado, o corte pode ter sido normal. Se ainda parecer magro, a depletacao e real e o cardio vai sofrer.' },
        { num: 2, title: 'O Jab de Adesanya nos Primeiros 2 Minutos', icon: 'Target', description: 'Se Adesanya comecar usando o jab e mantendo distancia cedo, e sinal de que o shape da pesagem e real. Se hesitar ou deixar Pyfer fechar, pode ser ferrugem de 13 meses.' },
        { num: 3, title: 'O Primeiro Power Shot de Pyfer', icon: 'Zap', description: 'Observe a reacao de Adesanya quando Pyfer conectar algo pesado pela primeira vez. O queixo vai aguentar? Se Izzy absorver e continuar em pe, Pyfer pode ficar sem plano B. Se vacilar, Pyfer vai sentir sangue.' },
        { num: 4, title: 'O Cardio de Pyfer no R3', icon: 'Clock', description: 'Se a pesagem depletou Pyfer, o R3 e onde vai aparecer. Observe se ele comeca a desacelerar. Se o ritmo cair, Adesanya vai dominar os championship rounds ainda mais que o esperado.' },
        { num: 5, title: 'A Linguagem Corporal no R1', icon: 'Brain', description: 'Quando Izzy esta confiante, ele muda de base constantemente (ortodoxo/southpaw). Se ele estiver trocando de stance desde o R1, o shape da pesagem e real. Se ficar preso numa base so, pode estar hesitante.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'A LINHA EXPLODIU', content: 'ADESANYA vs PYFER\nPOS WEIGH-INS\n\nLinha de abertura: IZZY +105 (azarao)\nLinha atual: IZZY -300 (grande favorito)\n\nA MAIOR movimentacao de linha\ndo card inteiro.\n\nO que aconteceu na pesagem?', color: 'gold' },
        { slide_number: 2, title: 'NA PESAGEM', content: 'ADESANYA: 185.5 lbs\nCorpo definido. Focado.\nPareceu o Izzy de 2019-2022.\nFisicamente IMPECAVEL.\n\nPYFER: 185 lbs\nRosto magro. Tenso.\nPossivelmente depletado.\n\nO mercado reagiu IMEDIATAMENTE.', color: 'red' },
        { slide_number: 3, title: 'A ANALISE', content: '6 polegadas de reach a mais.\nExperiencia em 5 rounds.\nFisicamente impecavel.\n\nvs\n\nPoder de nocaute real.\nMas possivelmente depletado.\nNunca passou do R2.\n\nA matematica mudou.', color: 'gold' },
        { slide_number: 4, title: 'PREVISAO ATUALIZADA', content: 'ADESANYA por Decisao Unanime\n\nConfianca: MEDIA-ALTA (subiu de MEDIA)\n65% Adesanya / 33% Pyfer\n\nMelhor aposta: Over 3.5 Rounds\nArmadilha: Izzy ML a -300\n(sem valor nesse preco)', color: 'red' },
      ],
      twitter: [
        { num: '1/6', text: 'ATUALIZACAO POS WEIGH-INS: Adesanya vs Pyfer. A linha EXPLODIU. De +105 (Izzy azarao) pra -300 (Izzy grande favorito). A maior movimentacao do card. Thread pos pesagem:' },
        { num: '2/6', text: 'Na pesagem: Adesanya pesou 185.5 lbs e pareceu FENOMENAL. Corpo definido, focado, sem sinais de corte difícil. Pyfer pesou 185 mas pareceu tenso e possivelmente depletado. A diferenca visual era GRITANTE.' },
        { num: '3/6', text: 'O que mudou na previsao: confianca subiu de MEDIA pra MEDIA-ALTA. Probabilidade de Adesanya subiu de 55% pra 65%. O shape impecavel + possível depletacao de Pyfer = vantagem MAIOR de cardio em 5 rounds.' },
        { num: '4/6', text: 'O queixo de Izzy ainda preocupa. Isso nao mudou. Pyfer tem 1.2 knockdowns/15min e poder real. Se conectar nos primeiros 2 rounds, a pesagem nao importa. Mas a JANELA pra isso diminuiu.' },
        { num: '5/6', text: 'APOSTAS: Izzy ML a -300 NAO tem valor. Se voce apostou quando era +105, parabens. A janela fechou. Over 3.5 rounds e a melhor aposta agora. Luta controlada e longa com Izzy dominando na distancia.' },
        { num: '6/6', text: 'Pick final pos weigh-ins: Adesanya por decisao unanime. Confianca MEDIA-ALTA. A pesagem confirmou o que os numeros ja diziam: a tecnica, o reach e a experiencia sao demais pro Pyfer. Agora, ate o fisico favorece.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'A linha de Adesanya vs Pyfer EXPLODIU. De azarao a +105 pra grande favorito a -300. O que aconteceu na pesagem que mudou tudo?' },
        { time: '10-30s', title: 'A Pesagem', text: 'Adesanya pesou 185.5 e pareceu FENOMENAL. Corpo definido, focado, o melhor shape em anos. Pyfer pesou 185 mas pareceu tenso e possivelmente depletado. A diferenca visual era gritante. O mercado reagiu na hora.' },
        { time: '30-50s', title: 'O Que Muda', text: 'A confianca subiu de MEDIA pra MEDIA-ALTA. Em 5 rounds, contra um Pyfer possivelmente depletado, a vantagem de Adesanya em cardio e experiencia fica ainda maior. 6 polegadas de reach, fight IQ de elite, e agora fisicamente impecavel.' },
        { time: '50-65s', title: 'O Risco', text: 'Mas o queixo nao muda. Se Pyfer conectar limpo nos primeiros 2 rounds, nada disso importa. O poder e real. A pesagem nao muda a durabilidade do queixo.' },
        { time: '65-75s', title: 'Previsao', text: 'Pick pos weigh-ins: Adesanya por decisao. Over 3.5 rounds. NAO aposte no Izzy a -300, o valor fechou. Se apostou cedo, segure e aproveite.' },
        { time: '75-85s', title: 'CTA', text: 'Voce viu a pesagem? Concordam com a movimentacao da linha? Comenta e segue.' },
      ],
      tiktok: [
        { hook: 'A linha de apostas EXPLODIU. De azarao pra grande favorito em 24 horas.', body: 'Adesanya vs Pyfer. Izzy abriu como azarao a +105. Depois da pesagem: -300 favorito. A maior movimentacao do card. Por que? Izzy pareceu FENOMENAL na pesagem. Corpo definido, focado, o melhor shape em anos. Pyfer pareceu tenso e possivelmente depletado. Em 5 rounds, com 6 polegadas de reach a mais, a matematica mudou completamente.', cta: 'Voce apostou antes da pesagem? Comenta!' },
        { hook: 'Esse cara pesou e o mercado ENLOUQUECEU.', body: 'Adesanya. 185.5 lbs. Corpo impecavel. Olhar de assassino. Do outro lado, Pyfer. 185 lbs. Rosto magro, tenso, nervoso. O mercado viu e reagiu: de +105 pra -300. Em 5 rounds contra um Pyfer possivelmente depletado, com 6 polegadas de reach e experiencia de 7 main events? A matematica e brutal.', cta: 'Izzy de volta ou voce ainda duvida? Comenta!' },
      ],
      headlines: [
        'Pos Weigh-Ins: Adesanya Sai de +105 Pra -300 Apos Pesagem Fenomenal',
        'A Maior Movimentacao de Linha do Card: Pyfer Parece Depletado na Pesagem',
        'Analise Atualizada: Confianca em Adesanya Sobe de MEDIA Pra MEDIA-ALTA',
        'O Que a Pesagem Revelou: Izzy Impecavel, Pyfer Preocupante',
        'Adesanya vs Pyfer Pos Weigh-Ins: A Tecnica Agora Tem o Fisico Tambem',
        'Over 3.5 Rounds: A Melhor Aposta Pos Pesagem do Main Event',
      ],
      podcast: [
        {
          timestamp: '0:00-5:00',
          title: 'A Pesagem Que Mudou Tudo',
          talking_points: [
            'A movimentacao de linha historica: de +105 pra -300. Uma das maiores do UFC em anos.',
            'Adesanya pareceu fisicamente impecavel. 185.5 lbs, corpo definido, sem sinais de corte difícil. O trabalho com Bill Smart apareceu.',
            'Pyfer pareceu tenso e possivelmente depletado. Rosto magro, linguagem corporal nervosa. Pode ser nervosismo de main event ou corte de peso difícil.',
          ],
          discussion_questions: [
            'A pesagem e indicador confiavel ou voces ja viram lutadores que pareciam mal na pesagem e brilharam na luta?',
            'Essa movimentacao de linha e justificada ou o mercado esta reagindo exageradamente?',
          ],
        },
        {
          timestamp: '5:00-10:00',
          title: 'Pick Atualizado',
          talking_points: [
            'Previsao original: Adesanya por decisao, confianca MEDIA, 55%. Agora: confianca MEDIA-ALTA, 65%.',
            'Over 3.5 rounds e a melhor aposta. Izzy a -300 nao tem valor. A janela de apostar no Izzy como azarao fechou.',
            'O queixo continua sendo o risco. Se Pyfer conectar, nada disso importa. Mas a probabilidade diminuiu.',
          ],
          discussion_questions: [
            'Voces apostaram antes da pesagem? Se sim, parabens.',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-300',
        fighter2_odds: '+240',
        fighter1_name: 'Israel Adesanya',
        fighter2_name: 'Joe Pyfer',
        source: 'Media de casas de apostas pos weigh-ins (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Movimentacao de Linha Historica', stat_headline: 'ADESANYA SAIU DE +105 PRA -300 APOS A PESAGEM', contexto: 'Uma das maiores movimentacoes de linha em main events do UFC. O mercado reagiu a pesagem onde Adesanya pareceu fenomenal e Pyfer pareceu depletado.', implicacao_aposta: 'Izzy ML a -300 NAO tem valor. O mercado ja precificou tudo. So se for parlay. Se apostou cedo, segure.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Vantagem de Reach Massiva', stat_headline: 'ADESANYA TEM 203CM DE ENVERGADURA VS 190CM DE PYFER (5 POLEGADAS A MAIS)', contexto: 'A maior diferenca de reach em qualquer main event recente do peso-medio. Adesanya pode tocar Pyfer sem ser tocado se usar o jab.', implicacao_aposta: 'Favorece Adesanya por decisao e Over rounds. A distancia deve neutralizar o poder de Pyfer.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Possivel Depletacao de Pyfer', stat_headline: 'PYFER PARECEU TENSO E MAGRO NA PESAGEM. CARDIO JA ERA FRAQUEZA.', contexto: 'Pyfer perdeu a unica luta longa (Hermansson UD) porque cansou. Se a pesagem indicou corte difícil, o cardio pode ser ainda pior em 5 rounds.', implicacao_aposta: 'Favorece Over 3.5 rounds e Adesanya nos championship rounds. Se Pyfer depletou, nao aguenta 5 rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Poder de Nocaute de Pyfer', stat_headline: '1.2 KNOCKDOWNS POR 15 MINUTOS (TOP 4 MW)', contexto: 'Pyfer derruba adversarios com frequencia altissima. O poder nao diminui com depletacao tanto quanto o cardio.', implicacao_aposta: 'Pyfer por KO/TKO nos primeiros 2 rounds ainda e possivel. O poder permanece mesmo com corte difícil.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Queixo Comprometido de Adesanya', stat_headline: 'NOCAUTEADO POR IMAVOV NO R2, ABALADO POR PEREIRA MULTIPLAS VEZES', contexto: 'Adesanya aos 36 anos nao tem a mesma durabilidade. A pesagem nao muda o queixo.', implicacao_aposta: 'O risco de KO precoce diminuiu mas nao desapareceu. Pyfer por KO R1-R2 ainda tem valor como longshot.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-130', confianca: 'alta', raciocinio: 'A melhor aposta pos weigh-ins. Adesanya impecavel fisicamente + Pyfer possivelmente depletado = luta controlada e longa. Izzy vai usar o jab e o footwork sem se arriscar. Historicamente, Adesanya leva lutas longe.' },
        { tipo: 'Metodo', pick: 'Pyfer por KO/TKO R1-R2', odds: '+400', confianca: 'baixa', edge_vs_mercado: 'O mercado pode estar overreacting a pesagem. +400 e muito valor se o queixo de Izzy nao aguentar. A pesagem nao muda a durabilidade.', raciocinio: 'Aposta de risco/recompensa. Se Pyfer conectar cedo, o queixo comprometido de Izzy pode nao aguentar. +400 paga MUITO.' },
        { tipo: 'Prop', pick: 'Total Sig. Strikes Over 120.5', odds: '-110', confianca: 'media', raciocinio: 'Com Adesanya dominando na distancia e Pyfer tentando fechar, o volume total deve ser alto ao longo de 5 rounds.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Adesanya ML a -300',
        descricao: 'A -300, Adesanya NAO oferece valor. A linha abriu a +105 e explodiu apos a pesagem. Todo o valor ja foi capturado. Apostar em Izzy a -300 contra um cara com 1.2 knockdowns/15min e um queixo comprometido e pagar caro por um risco que ainda existe. So faz sentido em parlay.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
