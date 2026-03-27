import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'chiesa-vs-price',
  evento_id: null,
  slug: 'chiesa-vs-price',
  titulo: 'Chiesa vs Price: O Adeus do Maverick',
  subtitulo: 'Michael Chiesa se aposenta em casa em Seattle contra Niko Price em sua 22a luta no UFC',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,88m', envergadura: '196cm', idade: 38, academia: 'SikJitsu, Spokane' },
      fighter2: { altura: '1,80m', envergadura: '183cm', idade: 34, academia: 'MMA Masters, Florida' },
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
      { factor: 'Motivacao', edge: 'fighter1', impact: 9, description: 'Ultima luta da carreira. Em casa. No aniversario dos pais. Motivacao maxima.' },
      { factor: 'Momento', edge: 'fighter1', impact: 8, description: 'Chiesa vem de 3 vitorias seguidas. Price vem de 3 derrotas seguidas.' },
      { factor: 'Wrestling', edge: 'fighter1', impact: 8, description: 'Chiesa e grappler de elite. Price e vulneravel no chao.' },
    ],
    xFactor: {
      title: 'A Emocao da Aposentadoria',
      description: 'Lutas de aposentadoria em casa sao imprevisiveis. A emocao pode potencializar ou paralisar.',
    },
  },
  fighter1_info: {
    nome: 'Michael Chiesa',
    record: '19-7-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Court McGee', method: 'Decisao Unanime', event: 'UFC Atlanta' },
      { result: 'W', opponent: 'Max Griffin', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Tony Ferguson', method: 'Decisao Unanime', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Niko Price',
    record: '16-10-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Nikolay Veretennikov', method: 'KO R1', event: 'UFC Fight Night 266' },
      { result: 'L', opponent: 'Jacobe Smith', method: 'Sub R2 (RNC)', event: 'UFC 317' },
      { result: 'L', opponent: 'Themba Gorimbo', method: 'Decisao Unanime', event: 'UFC Fight Night 244' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Meio-Medio (170 lbs)',
  num_rounds: 3,
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
      categoria_peso: 'Peso Meio-Medio (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Adeus do Maverick',
      tagline_sub: 'Luta numero 22 no UFC. No aniversario dos pais. Em casa, em Seattle. O ultimo round de Michael Chiesa.',
      fighter1: {
        nome_completo: 'Michael "Maverick" Chiesa',
        apelido: 'Maverick',
        sobrenome: 'Chiesa',
        record: '19-7-0',
        ranking: 'N/R Peso Meio-Medio',
        info_extra: 'Spokane, Washington | 38 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/CHIESA_MICHAEL_L_03-28.png?itok=fLyN1B6g',
      },
      fighter2: {
        nome_completo: 'Niko "The Hybrid" Price',
        apelido: 'The Hybrid',
        sobrenome: 'Price',
        record: '16-10-0',
        ranking: 'N/R Peso Meio-Medio',
        info_extra: 'Fort Lauderdale, Florida | 34 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-06/PRICE_NIKO_L_06-28.png?itok=JkEzq9xL',
      },
    },

    narrativa: {
      html_content: `
        <!-- CHIESA: O ADEUS -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">O Ultimo Round</span>
          </h3>

          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-0 bg-gradient-to-r from-ufc-red/5 via-transparent to-ufc-red/5"></div>
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ufc-red to-ufc-red/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/60 leading-[1.8]">
                <strong class="text-ufc-red">Michael Chiesa</strong> anunciou: essa e a ultima luta. Numero 22 no UFC. No dia do aniversario dos pais. Em Seattle, a 4 horas de Spokane, onde cresceu. O cara que ganhou o TUF Live em 2012, que lutou contra Masvidal, Pettis, dos Anjos, Dariush, Ferguson. Nunca foi campeao. Nunca teve title shot. Mas sempre foi guerreiro.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-emerald-400/10 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-emerald-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">3 Vitorias Seguidas</p>
                <p class="font-display text-lg text-white mb-1">Ferguson, Griffin, McGee</p>
                <p class="text-xs text-white/40">Todas por decisao unanime. Maturidade e controle.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/10 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">22a Luta no UFC</p>
                <p class="font-display text-lg text-white mb-1">O Numero Dele</p>
                <p class="text-xs text-white/40">"22 e meu numero. E o aniversario dos meus pais. Tudo se encaixa."</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-amber-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">TUF Live Winner 2012</p>
                <p class="font-display text-lg text-white mb-1">14 Anos de Carreira</p>
                <p class="text-xs text-white/40">De reality show a veterano respeitado. A jornada completa.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- PRICE: O ADVERSARIO -->
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">O Adversario de Short Notice</span>
          </h3>

          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-blue-400/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/60 leading-[1.8]">
                <strong class="text-blue-400">Niko Price</strong> aceitou em short notice depois que Carlston Harris desistiu por problemas de visto. Price esta 2-7 nos ultimos 6 anos e vem de 3 derrotas seguidas (KO R1 por Veretennikov, sub R2 por Smith, decisao por Gorimbo). Aos 34, a carreira esta em queda livre. Mas Price sempre foi imprevisivel: 7 dos 16 nocautes da carreira vieram quando ninguem esperava.
              </p>
            </div>
          </div>

          <div class="rounded-xl bg-amber-500/[0.03] border border-amber-500/10 p-5 text-center">
            <p class="text-sm text-white/50">Price e 8-10 no UFC. 3 derrotas seguidas. Short notice. Tudo favorece Chiesa.</p>
            <p class="text-sm text-white/50 mt-1">Mas Price nocauteou gente melhor quando ninguem acreditava.</p>
          </div>
        </div>

        <!-- BASTIDORES -->
        <div>
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-6">
            <span class="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Bastidores</span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative rounded-xl overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-1 bg-ufc-red/40 rounded-full"></div>
              <div class="pl-5 py-3">
                <p class="text-xs font-bold text-white/70 mb-1">Oponente original desistiu</p>
                <p class="text-[11px] text-white/35">Carlston Harris tinha a luta mas desistiu por problemas de visto. Price aceitou em short notice.</p>
              </div>
            </div>
            <div class="relative rounded-xl overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-1 bg-ufc-red/40 rounded-full"></div>
              <div class="pl-5 py-3">
                <p class="text-xs font-bold text-white/70 mb-1">28 de marco: aniversario dos pais</p>
                <p class="text-[11px] text-white/35">Chiesa escolheu essa data. "22 e meu numero e e o aniversario dos meus pais. Tudo se encaixa perfeitamente."</p>
              </div>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Contexto', fighter1: 'Ultima luta da carreira', fighter2: 'Short notice, 3 derrotas seguidas' },
        { dimensao: 'Sequencia', fighter1: '3 vitorias seguidas', fighter2: '3 derrotas seguidas' },
        { dimensao: 'Objetivo', fighter1: 'Sair por cima, em casa', fighter2: 'Evitar 4a derrota consecutiva' },
        { dimensao: 'Risco', fighter1: 'Perder na propria aposentadoria', fighter2: 'Pode ser cortado do UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O FINAL FELIZ',
          subtitulo: 'Chiesa se aposenta com vitoria em casa. O O2 Arena em pe.',
          consequencias: [
            { tag: 'LEGADO', texto: 'Chiesa encerra com 20 vitorias e sai do octogono com a torcida de Seattle gritando seu nome' },
            { tag: 'PROXIMO', texto: 'Aposentadoria. Transicao pra comentarista ou treinador.' },
          ],
          proxima_luta: 'Aposentadoria',
        },
        fighter2_vence: {
          titulo: 'O ESTRAGA-PRAZERES',
          subtitulo: 'Price arruina a aposentadoria de Chiesa com um nocaute inesperado',
          consequencias: [
            { tag: 'CHOQUE', texto: 'A torcida em silencio. Chiesa sai do octogono com uma derrota na ultima luta.' },
            { tag: 'PRICE', texto: 'Price ganha sobrevida no UFC e para a queda livre.' },
          ],
          proxima_luta: 'Price vs oponente sem ranking no proximo card',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Chiesa',
        color: 'red',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria solida sobre veterano em Atlanta. Controlou com wrestling por 3 rounds.' },
          { date: 'Jan 2025', opponent: 'Max Griffin', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou Griffin com grappling. Terceira vitoria consecutiva.' },
          { date: 'Jul 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Venceu Ferguson com wrestling dominante. Ferguson ja estava em declinio.' },
          { date: 'Nov 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (guilhotina)', opponent_rank: '#12 WW', quality_score: 3, quality_label: 'Bom', note: 'Surpreendido por guilhotina rapida de Holland. Unica derrota recente.' },
        ],
        full_fight_history: [
          { date: 'Jun 2012', opponent: 'Al Iaquinta', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TUF Finale, ganhou o contrato' },
          { date: 'Fev 2013', opponent: 'Anton Kuivanen', result: 'W', method: 'Sub (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Segunda vitoria' },
          { date: 'Jul 2013', opponent: 'Jorge Masvidal', result: 'L', method: 'Sub (D\'Arce)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Masvidal antes da fama' },
          { date: 'Nov 2013', opponent: 'Colton Smith', result: 'W', method: 'Sub (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'RNC' },
          { date: 'Mai 2014', opponent: 'Francisco Trinaldo', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao' },
          { date: 'Set 2014', opponent: 'Joe Lauzon', result: 'L', method: 'TKO (corte)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parado por corte' },
          { date: 'Abr 2015', opponent: 'Mitch Clarke', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Decisao' },
          { date: 'Dez 2015', opponent: 'Jim Miller', result: 'W', method: 'Sub (RNC)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Veterano respeitado' },
          { date: 'Abr 2016', opponent: 'Beneil Dariush', result: 'W', method: 'Sub (RNC)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Antes de Dariush virar top 5' },
          { date: 'Jun 2017', opponent: 'Kevin Lee', result: 'L', method: 'Sub (RNC)', opponent_rank: '#7 LW', quality_score: 3, quality_label: 'Bom', note: 'Parada controversa' },
          { date: 'Jul 2018', opponent: 'Anthony Pettis', result: 'L', method: 'Sub (triangulo)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Ex-campeao' },
          { date: 'Dez 2018', opponent: 'Carlos Condit', result: 'W', method: 'Sub (kimura)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Mudou pra welterweight' },
          { date: 'Jul 2019', opponent: 'Diego Sanchez', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominio total' },
          { date: 'Jan 2020', opponent: 'Rafael dos Anjos', result: 'W', method: 'UD', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Melhor vitoria da carreira' },
          { date: 'Jan 2021', opponent: 'Neil Magny', result: 'W', method: 'UD', opponent_rank: '#9 WW', quality_score: 3, quality_label: 'Bom', note: 'Controle por 3 rounds' },
          { date: 'Ago 2021', opponent: 'Vicente Luque', result: 'L', method: 'Sub (D\'Arce)', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Finalizado pelo top 5' },
          { date: 'Nov 2021', opponent: 'Sean Brady', result: 'L', method: 'UD', opponent_rank: '#8 WW', quality_score: 3, quality_label: 'Bom', note: 'Perdeu por wrestling' },
          { date: 'Jul 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (D\'Arce)', opponent_rank: '#12 WW', quality_score: 3, quality_label: 'Bom', note: 'Guilhotina rapida' },
          { date: 'Ago 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Sub (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Ferguson em declinio' },
          { date: 'Dez 2024', opponent: 'Max Griffin', result: 'W', method: 'Sub (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'RNC' },
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Ultima vitoria antes da aposentadoria' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Chiesa vem de 3 vitorias consecutivas com controle total. O nivel de oposicao nao e elite (Ferguson em declinio, Griffin, McGee) mas a consistencia e real. Aos 38, esta lutando de forma inteligente e eficiente.',
      },
      fighter2: {
        nome: 'Niko Price',
        color: 'blue',
        recent_fights: [
          { date: 'Fev 2026', opponent: 'Nikolay Veretennikov', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no primeiro round. Terceira derrota consecutiva.' },
          { date: 'Jun 2025', opponent: 'Jacobe Smith', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado no segundo round. Vulnerabilidade no grappling exposta.' },
          { date: 'Out 2024', opponent: 'Themba Gorimbo', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominado por 3 rounds. Terceira derrota seguida que comecou a queda.' },
          { date: 'Jun 2024', opponent: 'Alex Morono', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Ultima vitoria. Decisao sobre veterano Morono.' },
        ],
        full_fight_history: [
          { date: 'Dez 2016', opponent: 'Brandon Thatch', result: 'W', method: 'Sub R1 (arm-triangle, 4:30)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. UFC 207.' },
          { date: 'Fev 2017', opponent: 'Alex Morono', result: 'NC', method: 'NC (originalmente KO R2)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Overturned: teste positivo maconha' },
          { date: 'Ago 2017', opponent: 'Alan Jouban', result: 'W', method: 'TKO R1 (socos, 1:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finish rapido' },
          { date: 'Out 2017', opponent: 'Vicente Luque', result: 'L', method: 'Sub R2 (D\'Arce choke)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Luque antes de virar top 5' },
          { date: 'Jan 2018', opponent: 'George Sullivan', result: 'W', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mata-leao' },
          { date: 'Jul 2018', opponent: 'Randy Brown', result: 'W', method: 'KO R2 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO no R2' },
          { date: 'Set 2018', opponent: 'Abdul Razak Alhassan', result: 'L', method: 'KO R1 (soco, 0:43)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado em 43 segundos' },
          { date: 'Mar 2019', opponent: 'Tim Means', result: 'W', method: 'TKO R1 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'POTN. Primeiro a nocautear Means.' },
          { date: 'Jul 2019', opponent: 'Geoff Neal', result: 'L', method: 'TKO R2 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Neal antes do hype' },
          { date: 'Out 2019', opponent: 'James Vick', result: 'W', method: 'KO R1 (upkick, 1:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Upkick iconico. POTN.' },
          { date: 'Mai 2020', opponent: 'Vicente Luque', result: 'L', method: 'TKO R3 (doctor stoppage)', opponent_rank: '#11 WW', quality_score: 3, quality_label: 'Bom', note: 'UFC 249. Revanche competitiva.' },
          { date: 'Set 2020', opponent: 'Donald Cerrone', result: 'NC', method: 'NC (originalmente empate majoritario)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Overturned: teste positivo maconha' },
          { date: 'Jul 2021', opponent: 'Michel Pereira', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominado por Pereira' },
          { date: 'Out 2021', opponent: 'Alex Oliveira', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida' },
          { date: 'Dez 2022', opponent: 'Philip Rowe', result: 'L', method: 'TKO R3 (socos)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO tardio' },
          { date: 'Jul 2023', opponent: 'Robbie Lawler', result: 'L', method: 'KO R1 (socos, 0:38)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Lawler aposentadoria. Ex-campeao.' },
          { date: 'Jun 2024', opponent: 'Alex Morono', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'UFC 302. Revanche.' },
          { date: 'Out 2024', opponent: 'Themba Gorimbo', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominado por 3 rounds' },
          { date: 'Jun 2025', opponent: 'Jacobe Smith', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado no R2' },
          { date: 'Fev 2026', opponent: 'Nikolay Veretennikov', result: 'L', method: 'TKO R1 (cotovelada + socos, 1:42)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no R1' },
        ],
        momentum_score: 2,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Price esta em queda livre. 3 derrotas seguidas, 2-7 nos ultimos 6 anos. Aceitou essa luta em short notice como sobrevivencia no UFC. Aos 34, o corpo nao responde igual e o queixo parece comprometido (KO por Veretennikov no R1).',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Chiesa', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '14W-7L (67%)', contra_top5: '0W-2L' },
      fighter2: { nome: 'Price', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '8W-10L (44%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum significativos recentes. Chiesa enfrentou nomes maiores na carreira (dos Anjos, Masvidal, Condit, Dariush) mas os oponentes recentes de ambos sao de nivel medio-baixo.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 2.82, valueB: 3.47, maxVal: 5, format: 'decimal', note: 'Price tem mais volume no striking. Chiesa e mais conservador.' },
        { label: 'Precisao de Strikes (%)', valueA: 46, valueB: 43, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.10, valueB: 4.85, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Price absorve MUITO mais dano. Queixo comprometido recentemente.' },
        { label: 'Defesa de Strikes (%)', valueA: 51, valueB: 38, maxVal: 100, format: 'percent', note: 'Price tem uma das piores defesas da divisao (38%).' },
        { label: 'Takedowns por 15 Min', valueA: 2.50, valueB: 0.60, maxVal: 4, format: 'decimal', note: 'Chiesa e wrestler. Price quase nao tenta takedowns.' },
        { label: 'Defesa de Takedown (%)', valueA: 70, valueB: 55, maxVal: 100, format: 'percent', note: 'Price e vulneravel a takedowns. Ideal pra Chiesa.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '34 anos', note: 'Chiesa mais velho mas mais experiente' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,80m (5\'11")', note: 'Chiesa 8cm mais alto' },
        { label: 'Envergadura', fighter1: '196cm (77")', fighter2: '183cm (72")', note: 'Chiesa com 5 polegadas a mais' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'SikJitsu, Spokane, WA', fighter2: 'MMA Masters, Florida', note: 'Chiesa luta perto de casa' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 78, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Chiesa media 2.50 TDs/15min. Wrestling e a arma principal da carreira inteira. Price tem 55% TDD, vulneravel.' },
        { label: 'Striking', valueA: 55, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Price tem mais volume e poder nas maos (7 KOs no UFC). Chiesa prefere levar ao chao.' },
        { label: 'Jiu-Jitsu', valueA: 72, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Chiesa tem background de jiu-jitsu forte. Price foi finalizado 3 vezes no UFC.' },
        { label: 'Defesa', valueA: 55, valueB: 38, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Price tem 38% de defesa de strikes, uma das piores. Chiesa nao e elite defensivamente mas e muito superior.' },
        { label: 'Cardio', valueA: 68, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Chiesa luta 3 rounds completos consistentemente. Price tende a desacelerar.' },
        { label: 'Imprevisibilidade', valueA: 35, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Price e imprevisivel por natureza. Nocautes vindos do nada, upkicks, socos giratorios. E o fator X.' },
      ],
      insight: 'Chiesa e mais completo e consistente. Price e mais perigoso e imprevisivel. A luta se decide se Chiesa consegue levar ao chao (provavel) ou se Price conecta algo inesperado em pe.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Chiesa', ko_tko: { count: 2, percent: 11 }, submission: { count: 8, percent: 42 }, decision: { count: 9, percent: 47 }, total_wins: 19 },
      fighter2: { nome: 'Price', ko_tko: { count: 10, percent: 63 }, submission: { count: 2, percent: 12 }, decision: { count: 4, percent: 25 }, total_wins: 16 },
      insight: 'Perfis opostos. Chiesa vence por controle: 42% submissao + 47% decisao. Price vence por explosao: 63% KO. Se a luta for ao chao, Chiesa domina. Se ficar em pe e Price conectar, pode acabar rapido.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'O Round Perigoso', description: 'Price e mais perigoso no R1. Se conectar algo pesado contra Chiesa, pode acabar. Mas Chiesa vai buscar o takedown cedo pra neutralizar.' },
        { rounds: 'R2', danger_level: 4, danger_label: 'VANTAGEM CHIESA', color: 'red', title: 'O Controle', description: 'Se Chiesa levar ao chao no R1, o R2 vai seguir o padrao: wrestling, controle, ground and pound. Price perde gas rapido.' },
        { rounds: 'R3', danger_level: 3, danger_label: 'VANTAGEM CHIESA', color: 'red', title: 'O Adeus', description: 'Se chegar ao R3, Chiesa esta no controle. A torcida empurra. A emocao da aposentadoria. Price provavelmente ja esta cansado.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Aposentadoria em casa', fighter: 'Chiesa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'A 4 horas de Spokane. No aniversario dos pais. Luta 22 no UFC. A motivacao e maxima.' },
        { icon: 'TrendingUp', title: '3 vitorias seguidas', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Chiesa vem de 3 decisoes consecutivas com controle. Consistencia alta.' },
        { icon: 'AlertTriangle', title: '3 derrotas seguidas', fighter: 'Price', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Price vem de 3 derrotas incluindo KO no R1. Momento pessimo.' },
        { icon: 'Zap', title: 'Imprevisibilidade', fighter: 'Price', risk_level: 'POSITIVO', risk_color: 'green', description: 'Price e imprevisivel. Upkicks, socos giratorios, nocautes inesperados. Nunca e facil.' },
        { icon: 'Clock', title: 'Short notice', fighter: 'Price', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Price aceitou em short notice substituindo Carlston Harris. Menos tempo de preparacao.' },
        { icon: 'Brain', title: 'Emocao pode pesar', fighter: 'Chiesa', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Lutas de aposentadoria em casa carregam pressao emocional. Pode potencializar ou paralisar.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Chiesa',
        total_probability: 72,
        scenarios: [
          { name: 'Wrestling e Controle', probability: 40, method: 'Decisao Unanime', description: 'Chiesa leva ao chao no R1, controla com top pressure, e vence 3 rounds nos pontos. O padrao das ultimas 3 lutas.' },
          { name: 'Submissao', probability: 20, method: 'Submissao R2-R3', description: 'Chiesa encontra uma abertura no chao e finaliza. Price foi submetido 3 vezes no UFC. RNC ou guilhotina.' },
          { name: 'TKO por Ground and Pound', probability: 12, method: 'TKO R2-R3', description: 'Chiesa domina no chao e acumula dano ate o arbitro parar.' },
        ],
      },
      fighter2: {
        nome: 'Price',
        total_probability: 26,
        scenarios: [
          { name: 'Nocaute Inesperado', probability: 14, method: 'KO/TKO R1-R2', description: 'Price conecta algo inesperado em pe antes do takedown. Upkick, overhand, soco giratorio. E imprevisivel.' },
          { name: 'Defesa de Takedown + Volume', probability: 8, method: 'Decisao', description: 'Price defende takedowns suficientes e vence na trocacao com volume. Improvavel dado o historico.' },
          { name: 'Finalizacao', probability: 4, method: 'Sub R1', description: 'Price encontra uma guilhotina quando Chiesa entra no takedown. Ja aconteceu contra Holland.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Michael Chiesa',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Tudo favorece Chiesa: motivacao, momento, matchup, torcida. Price esta 2-7 nos ultimos 6 anos, vem de 3 derrotas, e aceitou em short notice. Chiesa vai usar o wrestling pra controlar e vencer nos pontos como fez nas ultimas 3 lutas. O unico risco e a imprevisibilidade de Price: ele ja surpreendeu gente melhor. Mas contra um wrestler motivado e maior fisicamente, as chances sao baixas.',
      x_factor: {
        title: 'A Emocao da Aposentadoria',
        description: 'Chiesa nunca lutou com tanta motivacao. Ultima luta, em casa, aniversario dos pais. Isso pode ser o boost final que garante uma performance impecavel.',
      },
      upset_alert: {
        title: 'Price e Imprevisivel',
        description: 'Price tem 10 KOs no UFC e varios vieram quando ninguem esperava. Se Chiesa entrar emocionado demais e descuidar na trocacao, Price pode conectar algo devastador.',
      },
      probabilities: {
        fighter1: { nome: 'Chiesa', percent: 72 },
        fighter2: { nome: 'Price', percent: 26 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Chiesa (-500)', reasoning: 'Favorito massivo e justificado. Mas -500 nao oferece valor. So aposte se for parlay.' },
        method: { pick: 'Chiesa por Decisao (-150)', reasoning: 'As ultimas 3 de Chiesa foram todas decisao unanime. Ele controla sem forcar o finish. Padrao claro.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Chiesa leva a distancia. Price e duro. Finalizacao cedo e improvavel a nao ser que Chiesa encontre submissao.' },
        best_value: 'Chiesa por Decisao e a aposta mais solida. Ele nao nocauteia e Price e duro demais pra ser finalizado rapido.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O primeiro takedown de Chiesa', icon: 'Target', description: 'Se Chiesa completar o primeiro takedown nos primeiros 2 minutos, a luta esta decidida. Se Price defender, fica perigoso.' },
        { num: 2, title: 'A emocao de Chiesa no walkout', icon: 'Brain', description: 'Observe como Chiesa reage ao entrar na arena de Seattle. Se estiver focado, vai dominar. Se estiver emocionado demais, pode cometer erros.' },
        { num: 3, title: 'Price no R1 antes do takedown', icon: 'Zap', description: 'Os primeiros 30 segundos antes de Chiesa buscar o takedown sao a janela de Price. Observe se Price tenta algo inesperado cedo.' },
        { num: 4, title: 'O gas de Price no R2', icon: 'Activity', description: 'Se Price sobreviver o R1, observe o cardio dele no R2. Historicamente desacelera. Se cansou, Chiesa domina.' },
        { num: 5, title: 'O momento pos-luta', icon: 'MapPin', description: 'Independente do resultado, o momento pos-luta vai ser emotivo. Chiesa vai se aposentar na frente da torcida de Seattle.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'O ADEUS DO MAVERICK', content: 'CHIESA vs PRICE\nUFC Seattle | Meio-Medio\n\n19-7 vs 16-10\nA ultima luta de Michael Chiesa.\nEm casa. Em Seattle.\nNo aniversario dos pais.', color: 'red' },
        { slide_number: 2, title: 'CHIESA: O VETERANO', content: 'TUF Live Winner (2012)\n22a luta no UFC\n3 vitorias seguidas\n38 anos, Spokane, WA\nLutou contra Masvidal, Ferguson,\ndos Anjos, Pettis, Condit\nNunca foi campeao.\nMas sempre foi guerreiro.', color: 'red' },
        { slide_number: 3, title: 'PRICE: O IMPREVISIVEL', content: '16-10 na carreira\n10 KOs no UFC\nMas 2-7 nos ultimos 6 anos\n3 derrotas seguidas\nShort notice\nO cara e imprevisivel.\nMas o momento e pessimo.', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'CHIESA por Decisao Unanime\n\nConfianca: MEDIA-ALTA\n72% Chiesa / 26% Price\n\nO wrestling decide.\nA emocao empurra.\nO Maverick merece o final feliz.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Chiesa vs Price no sabado em Seattle. A ultima luta de Michael Chiesa. 22a no UFC. No aniversario dos pais. Em casa. Contra Price que aceitou em short notice com 3 derrotas seguidas.' },
        { num: '2/4', text: 'Chiesa: TUF Live winner em 2012. Lutou contra Masvidal, Ferguson, dos Anjos, Pettis. Nunca foi campeao mas sempre foi guerreiro. 3 vitorias seguidas pra encerrar. O adeus perfeito.' },
        { num: '3/4', text: 'Price e 2-7 nos ultimos 6 anos. Mas tem 10 KOs no UFC e varios foram quando ninguem esperava. Imprevisivel. Se conectar algo antes do takedown, pode arruinar a aposentadoria.' },
        { num: '4/4', text: 'Pick: Chiesa por decisao. O wrestling resolve. Mas o momento pos-luta vai ser o real highlight. Independente do resultado, Seattle vai aplaudir de pe.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Michael Chiesa se aposenta no sabado. Em casa. Em Seattle. Na 22a luta do UFC. No aniversario dos pais. Tudo se encaixa.' },
        { time: '10-25s', title: 'A Jornada', text: 'TUF Live winner em 2012. 14 anos de carreira. Lutou contra Masvidal, Ferguson, dos Anjos. Nunca foi campeao. Mas vem de 3 vitorias seguidas e quer sair por cima.' },
        { time: '25-40s', title: 'O Adversario', text: 'Price aceitou em short notice. 2-7 nos ultimos 6 anos. 3 derrotas seguidas. Mas tem 10 KOs no UFC. E imprevisivel.' },
        { time: '40-55s', title: 'Previsao', text: 'Chiesa por decisao. O wrestling resolve. A torcida empurra. O Maverick merece o final feliz.' },
      ],
      tiktok: [
        { hook: 'Esse cara se aposenta NO ANIVERSARIO DOS PAIS em casa.', body: 'Michael Chiesa. 22a luta no UFC. Em Seattle, a 4 horas de casa. No dia do aniversario dos pais. Contra um cara com 3 derrotas seguidas. Tudo se encaixa pra o adeus perfeito. Mas Price tem 10 KOs no UFC e e imprevisivel.', cta: 'O Maverick merece o final feliz? Comenta!' },
      ],
      headlines: [
        'Chiesa vs Price: O Adeus do Maverick em Casa',
        'A Ultima Luta: Chiesa se Aposenta em Seattle no Aniversario dos Pais',
        'Price Tem 10 KOs Mas 3 Derrotas Seguidas: Pode Arruinar a Aposentadoria?',
        'De TUF Live Winner a Aposentadoria: A Jornada Completa de Michael Chiesa',
        'UFC Seattle: A Luta Mais Emotiva do Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-500',
        fighter2_odds: '+380',
        fighter1_name: 'Michael Chiesa',
        fighter2_name: 'Niko Price',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Wrestling vs Defesa Fraca', stat_headline: 'CHIESA 2.50 TDS/15MIN VS PRICE 55% TDD', contexto: 'A combinacao ideal pra Chiesa: wrestler ativo contra defensor fraco de takedown.', implicacao_aposta: 'Favorece Chiesa por decisao ou submissao. A luta vai pro chao.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Strikes de Price', stat_headline: 'PRICE TEM 38% DE DEFESA DE STRIKES, UMA DAS PIORES DA DIVISAO', contexto: 'Price absorve 4.85 strikes/min e defende apenas 38%. Em pe, leva muito dano.', implicacao_aposta: 'Mesmo se ficar em pe, Price absorve dano demais.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Imprevisibilidade de Price', stat_headline: '10 KOS NO UFC, VARIOS INESPERADOS', contexto: 'Price conecta de angulos imprevisiveis. Upkicks, socos giratorios, overhands.', implicacao_aposta: 'Price ML a +380 so tem valor se voce acredita no flash KO. Risco alto.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Short Notice pra Price', stat_headline: 'PRICE SUBSTITUIU CARLSTON HARRIS EM SHORT NOTICE', contexto: 'Menos tempo de preparacao especifica. Mas Price ja esta acostumado a aceitar lutas em cima da hora.', implicacao_aposta: 'Desfavorece Price minimamente. Ele ja fez isso antes.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-160', confianca: 'alta', raciocinio: 'Chiesa controla sem forcar o finish. As ultimas 3 foram todas decisao. Price e duro. Vai a distancia.' },
        { tipo: 'Metodo', pick: 'Chiesa por Decisao', odds: '-150', confianca: 'alta', raciocinio: 'Padrao claro: 3 decisoes unanimes consecutivas. Chiesa nao nocauteia e Price sobrevive no chao.' },
        { tipo: 'Moneyline', pick: 'Price (+380)', odds: '+380', confianca: 'baixa', edge_vs_mercado: 'So se voce acredita no flash KO imprevisivel. Price a +380 e um longshot com historico de surpresas.', raciocinio: 'Price tem 10 KOs no UFC. Varios inesperados. Se Chiesa descuidar emocionalmente, pode acontecer.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Chiesa por KO/TKO',
        descricao: 'Chiesa tem apenas 2 KOs em 19 vitorias (11%). Ele quase nunca finaliza por strikes. Apostar em Chiesa por KO e ir contra toda a carreira dele.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
