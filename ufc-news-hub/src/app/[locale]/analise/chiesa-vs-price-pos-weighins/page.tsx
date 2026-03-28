import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'chiesa-vs-price-pos-weighins',
  evento_id: null,
  slug: 'chiesa-vs-price-pos-weighins',
  titulo: 'Chiesa vs Price: Pos Weigh-Ins | A Emocao e o Desgaste',
  subtitulo: 'Chiesa emocionado mas focado na pesagem. Price pareceu depletado apos 3a luta em periodo curto. Tudo favorece o Maverick.',
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
    confidence: 'ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: 'Motivacao', edge: 'fighter1', impact: 9, description: 'Ultima luta da carreira. Em casa. No aniversario dos pais. Motivacao maxima.' },
      { factor: 'Momento', edge: 'fighter1', impact: 8, description: 'Chiesa vem de 3 vitorias seguidas. Price vem de 3 derrotas seguidas.' },
      { factor: 'Wrestling', edge: 'fighter1', impact: 8, description: 'Chiesa e grappler de elite. Price e vulneravel no chao.' },
      { factor: 'Depletacao de Price', edge: 'fighter1', impact: 7, description: 'Price pareceu depletado na pesagem. 3a luta em periodo curto. O corpo pode nao responder.' },
    ],
    xFactor: {
      title: 'A Emocao da Aposentadoria',
      description: 'Chiesa pareceu emocionado mas focado na pesagem. A emocao pode potencializar a performance nessa ultima luta em casa.',
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
      tagline: 'Pos Weigh-Ins: Emocao e Desgaste',
      tagline_sub: 'Chiesa emocionado e focado. Price depletado pela 3a luta em curto periodo. O adeus do Maverick esta cada vez mais certo.',
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
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Atualizacao Pos Weigh-Ins</span>
          </h3>

          <div class="relative rounded-2xl overflow-hidden mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-emerald-400/10"></div>
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <div class="relative p-6">
              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">PESAGEM CONFIRMADA</p>
              <p class="text-sm text-white/60 leading-relaxed">
                <strong class="text-ufc-red">Chiesa</strong> bateu o peso e pareceu emocionado mas absolutamente focado. A linguagem corporal era de quem sabe que essa e a ultima vez subindo na balanca. Olhos vermelhos, mas maxilar firme. A torcida presente na pesagem ja comecou a gritou o nome dele. <strong class="text-blue-400">Price</strong> tambem bateu o peso, mas pareceu visivelmente depletado. Essa e a 3a luta dele em um periodo relativamente curto, e o corpo esta mostrando os sinais. Rosto afinado, energia baixa. Price aceitou em short notice e o acumulo de lutas sem descanso adequado e evidente.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Chiesa na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">EMOCIONADO MAS FOCADO</p>
                <p class="text-xs text-white/50 leading-relaxed">Olhos vermelhos de emocao. Maxilar firme de determinacao. A 4 horas de casa, no aniversario dos pais, na ultima luta da carreira. A torcida ja grita o nome dele. A motivacao e MAXIMA.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-amber-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-amber-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Price na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">DEPLETADO</p>
                <p class="text-xs text-white/50 leading-relaxed">3a luta em periodo curto. Short notice. Rosto afinado, energia baixa. O acumulo de lutas sem descanso adequado esta cobrando o preco. O queixo (ja comprometido) pode estar ainda mais vulneravel.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">O Ultimo Round</span>
          </h3>
          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ufc-red to-ufc-red/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/60 leading-[1.8]">
                <strong class="text-ufc-red">Michael Chiesa</strong> anunciou: essa e a ultima luta. Numero 22 no UFC. No dia do aniversario dos pais. Em Seattle, a 4 horas de Spokane. Apos a pesagem, fica ainda mais claro: Chiesa esta lutando por algo maior que uma vitoria. E o encerramento de 14 anos de carreira. <strong class="text-blue-400">Price</strong> aceitou em short notice e esta claramente desgastado. Tudo favorece o Maverick.
              </p>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Contexto', fighter1: 'Ultima luta da carreira, emocionado', fighter2: 'Short notice, 3 derrotas, depletado' },
        { dimensao: 'Sequencia', fighter1: '3 vitorias seguidas', fighter2: '3 derrotas seguidas' },
        { dimensao: 'Pesagem', fighter1: 'Emocionado mas focado', fighter2: 'Visivelmente depletado' },
        { dimensao: 'Risco', fighter1: 'Perder na propria aposentadoria', fighter2: 'Pode ser cortado do UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O FINAL FELIZ',
          subtitulo: 'Chiesa se aposenta com vitoria em casa. Seattle em pe.',
          consequencias: [
            { tag: 'LEGADO', texto: 'Chiesa encerra com 20 vitorias e sai do octogono com a torcida gritando seu nome' },
            { tag: 'PROXIMO', texto: 'Aposentadoria. Transicao pra comentarista ou treinador.' },
          ],
          proxima_luta: 'Aposentadoria',
        },
        fighter2_vence: {
          titulo: 'O ESTRAGA-PRAZERES',
          subtitulo: 'Price arruina a aposentadoria com um nocaute inesperado',
          consequencias: [
            { tag: 'CHOQUE', texto: 'A torcida em silencio. Chiesa sai com uma derrota na ultima luta.' },
            { tag: 'PRICE', texto: 'Price ganha sobrevida no UFC.' },
          ],
          proxima_luta: 'Price vs oponente sem ranking',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Chiesa',
        color: 'red',
        recent_fights: [
          { date: 'Jun 2025', opponent: 'Court McGee', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria solida sobre veterano.' },
          { date: 'Jan 2025', opponent: 'Max Griffin', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou Griffin com grappling.' },
          { date: 'Jul 2024', opponent: 'Tony Ferguson', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Venceu Ferguson com wrestling dominante.' },
          { date: 'Nov 2023', opponent: 'Kevin Holland', result: 'L', method: 'Sub R1 (guilhotina)', opponent_rank: '#12 WW', quality_score: 3, quality_label: 'Bom', note: 'Surpreendido por guilhotina rapida.' },
        ],
        full_fight_history: [
          { date: 'Jun 2012', opponent: 'Al Iaquinta', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TUF Finale' },
          { date: 'Jan 2020', opponent: 'Rafael dos Anjos', result: 'W', method: 'UD', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Melhor vitoria da carreira' },
          { date: 'Jan 2021', opponent: 'Neil Magny', result: 'W', method: 'UD', opponent_rank: '#9 WW', quality_score: 3, quality_label: 'Bom', note: 'Controle' },
          { date: 'Ago 2021', opponent: 'Vicente Luque', result: 'L', method: 'Sub (D\'Arce)', opponent_rank: '#5 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Finalizado pelo top 5' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Chiesa vem de 3 vitorias consecutivas com controle total. Na pesagem, pareceu emocionado mas focado. A motivacao da aposentadoria em casa e evidente na linguagem corporal.',
      },
      fighter2: {
        nome: 'Niko Price',
        color: 'blue',
        recent_fights: [
          { date: 'Fev 2026', opponent: 'Nikolay Veretennikov', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no primeiro round. Terceira derrota consecutiva.' },
          { date: 'Jun 2025', opponent: 'Jacobe Smith', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado no segundo round.' },
          { date: 'Out 2024', opponent: 'Themba Gorimbo', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominado por 3 rounds.' },
          { date: 'Jun 2024', opponent: 'Alex Morono', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Ultima vitoria.' },
        ],
        full_fight_history: [
          { date: 'Dez 2016', opponent: 'Brandon Thatch', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC' },
          { date: 'Out 2019', opponent: 'James Vick', result: 'W', method: 'KO R1 (upkick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Upkick iconico' },
        ],
        momentum_score: 1,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Price esta em queda livre. 3 derrotas seguidas, 2-7 nos ultimos 6 anos. Na pesagem, pareceu depletado pela 3a luta em curto periodo. Short notice. O corpo esta mostrando sinais de desgaste acumulado.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Chiesa', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '14W-7L (67%)', contra_top5: '0W-2L' },
      fighter2: { nome: 'Price', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '8W-10L (44%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum significativos recentes.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 2.82, valueB: 3.47, maxVal: 5, format: 'decimal', note: 'Price tem mais volume mas esta depletado.' },
        { label: 'Precisao de Strikes (%)', valueA: 46, valueB: 43, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.10, valueB: 4.85, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Price absorve MUITO mais dano.' },
        { label: 'Defesa de Strikes (%)', valueA: 51, valueB: 38, maxVal: 100, format: 'percent', note: 'Price tem 38% de defesa. Pessimo.' },
        { label: 'Takedowns por 15 Min', valueA: 2.50, valueB: 0.60, maxVal: 4, format: 'decimal', note: 'Chiesa e wrestler.' },
        { label: 'Defesa de Takedown (%)', valueA: 70, valueB: 55, maxVal: 100, format: 'percent', note: 'Price vulneravel a TDs.' },
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
        { label: 'Wrestling Ofensivo', valueA: 78, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Chiesa media 2.50 TDs/15min. Price tem 55% TDD e esta depletado.' },
        { label: 'Striking', valueA: 55, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Price tem mais volume mas a depletacao pode afetar a velocidade.' },
        { label: 'Jiu-Jitsu', valueA: 72, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Chiesa tem background forte. Price foi finalizado 3 vezes no UFC.' },
        { label: 'Defesa', valueA: 55, valueB: 35, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Price com 38% defesa de strikes. Depletacao piora isso.' },
        { label: 'Cardio', valueA: 68, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Price depletado pela 3a luta. Cardio ja era fraqueza.' },
        { label: 'Imprevisibilidade', valueA: 35, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Price e imprevisivel por natureza. Mesmo depletado, pode surpreender.' },
      ],
      insight: 'A depletacao de Price na pesagem torna essa luta ainda mais favoravel pro Chiesa. O wrestling vai dominar contra um Price sem gas.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Chiesa', ko_tko: { count: 2, percent: 11 }, submission: { count: 8, percent: 42 }, decision: { count: 9, percent: 47 }, total_wins: 19 },
      fighter2: { nome: 'Price', ko_tko: { count: 10, percent: 63 }, submission: { count: 2, percent: 12 }, decision: { count: 4, percent: 25 }, total_wins: 16 },
      insight: 'Perfis opostos. Chiesa vence por controle. Price vence por explosao. Com Price depletado, a explosao pode estar comprometida.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 4, danger_label: 'VANTAGEM CHIESA', color: 'red', title: 'O Takedown', description: 'Chiesa vai buscar o takedown cedo. Price depletado vai ter ainda mais dificuldade pra defender. O R1 deve ser de Chiesa.' },
        { rounds: 'R2', danger_level: 3, danger_label: 'VANTAGEM CHIESA', color: 'red', title: 'O Controle', description: 'Se Chiesa levar ao chao no R1, o R2 segue o padrao. Price depletado perde gas rapido.' },
        { rounds: 'R3', danger_level: 2, danger_label: 'VANTAGEM CHIESA', color: 'red', title: 'O Adeus', description: 'Se chegar ao R3, Chiesa domina. A torcida empurra. A emocao potencializa. Price provavelmente ja esgotou.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Aposentadoria em casa', fighter: 'Chiesa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'A 4 horas de Spokane. No aniversario dos pais. Luta 22. Motivacao maxima. Na pesagem, emocionado.' },
        { icon: 'TrendingUp', title: '3 vitorias seguidas', fighter: 'Chiesa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Chiesa vem de 3 decisoes consecutivas com controle. Consistencia alta.' },
        { icon: 'Activity', title: 'Price depletado', fighter: 'Price', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Price pareceu depletado na pesagem. 3a luta em periodo curto. Short notice. O corpo esta mostrando sinais.' },
        { icon: 'AlertTriangle', title: '3 derrotas seguidas', fighter: 'Price', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Price vem de 3 derrotas incluindo KO R1. Momento pessimo.' },
        { icon: 'Zap', title: 'Imprevisibilidade residual', fighter: 'Price', risk_level: 'POSITIVO', risk_color: 'green', description: 'Price e imprevisivel por natureza. Mesmo depletado, tem 10 KOs no UFC. Nunca descarte.' },
        { icon: 'Brain', title: 'Emocao pode pesar (menos provavel)', fighter: 'Chiesa', risk_level: 'RISCO BAIXO', risk_color: 'green', description: 'Na pesagem, Chiesa pareceu emocionado MAS focado. O risco de paralisia emocional diminuiu.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Chiesa',
        total_probability: 78,
        scenarios: [
          { name: 'Wrestling e Controle', probability: 42, method: 'Decisao Unanime', description: 'Chiesa leva ao chao, controla com top pressure por 3 rounds. Price depletado nao aguenta.' },
          { name: 'Submissao', probability: 22, method: 'Submissao R2-R3', description: 'Chiesa encontra abertura no chao e finaliza. Price depletado e mais vulneravel a sub.' },
          { name: 'TKO por Ground and Pound', probability: 14, method: 'TKO R2-R3', description: 'Chiesa domina no chao e acumula dano ate o arbitro parar.' },
        ],
      },
      fighter2: {
        nome: 'Price',
        total_probability: 20,
        scenarios: [
          { name: 'Nocaute Inesperado', probability: 10, method: 'KO/TKO R1', description: 'Price conecta algo inesperado antes do takedown. Improvavel dado o desgaste mas nunca descarte.' },
          { name: 'Defesa de Takedown + Volume', probability: 6, method: 'Decisao', description: 'Price defende e vence na trocacao. Muito improvavel dado o estado fisico.' },
          { name: 'Guilhotina no Takedown', probability: 4, method: 'Sub R1', description: 'Price encontra guilhotina quando Chiesa entra no takedown.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Michael Chiesa',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 8,
      confidence_label: 'ALTA',
      explanation: 'A pesagem solidificou o que ja era evidente: Chiesa motivado ao maximo, Price desgastado ao maximo. A confianca subiu de MEDIA-ALTA pra ALTA. Chiesa emocionado mas focado, com a torcida de Seattle, contra um Price depletado pela 3a luta em periodo curto. O wrestling vai dominar. A probabilidade de Chiesa subiu de 72% pra 78%. O unico cenario de Price e o flash KO imprevisivel, mas com o corpo depletado, ate a velocidade das maos pode estar comprometida.',
      x_factor: {
        title: 'O Momento Pos-Luta',
        description: 'Independente do resultado, o momento pos-luta vai ser historico. Chiesa se aposentando na frente da torcida de Seattle, no aniversario dos pais. O octogono vai ser um palco de emocao.',
      },
      upset_alert: {
        title: 'Price Mesmo Depletado e Imprevisivel',
        description: 'Price tem 10 KOs no UFC. Varios vieram quando ninguem esperava. Mesmo depletado, um soco conectado pode mudar tudo. Mas a probabilidade diminuiu significativamente.',
      },
      probabilities: {
        fighter1: { nome: 'Chiesa', percent: 78 },
        fighter2: { nome: 'Price', percent: 20 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Chiesa (-600)', reasoning: 'A -600, zero valor. So em parlay. Tudo favorece Chiesa demais pra justificar o investimento.' },
        method: { pick: 'Chiesa por Decisao (-130)', reasoning: 'As ultimas 3 de Chiesa foram todas decisao unanime. Ele controla sem forcar o finish. Padrao clarissimo.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Chiesa nao nocauteia e Price e duro. Mas com Price depletado, existe chance de finish mais cedo. Over 2.5 ainda e provavel.' },
        best_value: 'Chiesa por Decisao e a aposta mais solida. Se quiser algo com odds melhores, Chiesa por Submissao a +200 tem valor dado Price depletado e vulneravel no chao.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O fisico de Price no cage', icon: 'Activity', description: 'Price pareceu depletado na pesagem. Observe se reidratou bem. Se ainda parecer magro no cage, o cardio vai ser um problema serio.' },
        { num: 2, title: 'O primeiro takedown de Chiesa', icon: 'Target', description: 'Se Chiesa completar o primeiro takedown nos primeiros 2 minutos, a luta esta decidida. Contra um Price depletado, o takedown deve ser mais facil.' },
        { num: 3, title: 'A emocao de Chiesa no walkout', icon: 'Brain', description: 'Observe como Chiesa reage ao entrar na arena de Seattle. Na pesagem pareceu emocionado mas focado. Se mantiver isso, vai dominar.' },
        { num: 4, title: 'Price nos primeiros 30 segundos', icon: 'Zap', description: 'A unica janela de Price e antes do takedown. Se tentar algo louco nos primeiros segundos, esse e o momento mais perigoso pra Chiesa.' },
        { num: 5, title: 'O momento pos-luta', icon: 'MapPin', description: 'Independente do resultado, o momento pos-luta vai ser emotivo e historico. Prepare-se.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'POS WEIGH-INS', content: 'CHIESA vs PRICE\nPOS PESAGEM\n\nChiesa: emocionado, focado\nPrice: depletado, 3a luta\n\nOdds: Chiesa -600 / Price +420\nTudo favorece o Maverick.', color: 'red' },
        { slide_number: 2, title: 'PREVISAO ATUALIZADA', content: 'CHIESA por Decisao Unanime\n\nConfianca: ALTA (subiu)\n78% Chiesa / 20% Price\n\nPrice depletado nao aguenta\no wrestling de Chiesa.\nO adeus perfeito esta proximo.', color: 'gold' },
      ],
      twitter: [
        { num: '1/3', text: 'POS WEIGH-INS: Chiesa vs Price. Chiesa emocionado, focado, pronto. Price depletado pela 3a luta em periodo curto. A confianca subiu pra ALTA. 78% Chiesa.' },
        { num: '2/3', text: 'Price pareceu desgastado na pesagem. Rosto afinado, energia baixa. Short notice + 3 derrotas + depletacao = cenario perfeito pra Chiesa dominar com wrestling.' },
        { num: '3/3', text: 'Pick pos weigh-ins: Chiesa por decisao. Confianca ALTA. O Maverick merece o final feliz e tudo indica que vai conseguir.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Chiesa emocionado na pesagem. Price depletado. A ultima luta do Maverick esta cada vez mais previsivel.' },
        { time: '10-25s', title: 'Pesagem', text: 'Chiesa com olhos vermelhos mas focado. A torcida ja gritando o nome dele. Price com rosto afinado, 3a luta em periodo curto. O contraste era gritante.' },
        { time: '25-35s', title: 'Previsao', text: 'Chiesa por decisao. Confianca ALTA. O wrestling resolve contra um Price depletado. O final feliz esta proximo.' },
      ],
      tiktok: [
        { hook: 'Ele CHOROU na pesagem. E vai se aposentar amanha em casa.', body: 'Michael Chiesa. Ultima luta. Em Seattle. No aniversario dos pais. Pesou e ficou emocionado. Do outro lado, Price. 3a luta em curto periodo. Depletado. Rosto afinado. 3 derrotas seguidas. Tudo favorece o adeus perfeito. Chiesa por decisao. O Maverick merece.', cta: 'O Maverick merece o final feliz? Comenta!' },
      ],
      headlines: [
        'Pos Weigh-Ins: Chiesa Emocionado, Price Depletado na Pesagem',
        'Confianca Sobe Pra ALTA: Price Desgastado Favorece Ainda Mais Chiesa',
        'O Adeus do Maverick Esta Cada Vez Mais Proximo do Final Feliz',
        'Price Depletado Pela 3a Luta: O Corpo Esta Cobrando o Preco',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-600',
        fighter2_odds: '+420',
        fighter1_name: 'Michael Chiesa',
        fighter2_name: 'Niko Price',
        source: 'Media de casas de apostas pos weigh-ins (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Wrestling vs Defesa Fraca + Depletacao', stat_headline: 'CHIESA 2.50 TDS/15MIN VS PRICE 55% TDD (DEPLETADO)', contexto: 'A combinacao ideal: wrestler ativo contra defensor fraco que esta depletado pela 3a luta.', implicacao_aposta: 'Favorece Chiesa por decisao ou submissao. A luta vai pro chao e Price nao vai ter gas pra sair.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Price Depletado na Pesagem', stat_headline: 'ROSTO AFINADO, ENERGIA BAIXA, 3A LUTA EM PERIODO CURTO', contexto: 'Price aceitou short notice e esta visivelmente desgastado. O acumulo de lutas sem descanso e evidente.', implicacao_aposta: 'Diminui a probabilidade de flash KO de Price. Explosividade comprometida.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Imprevisibilidade Residual de Price', stat_headline: '10 KOS NO UFC, VARIOS INESPERADOS', contexto: 'Price ainda e perigoso por natureza. Mas a depletacao reduz a ameaca significativamente.', implicacao_aposta: 'Price ML a +420 so pra apostadores de risco extremo.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Chiesa por Decisao', odds: '-130', confianca: 'alta', raciocinio: '3 decisoes unanimes consecutivas. Padrao claro. Agora contra um Price depletado. Ainda mais provavel.' },
        { tipo: 'Metodo', pick: 'Chiesa por Submissao', odds: '+200', confianca: 'media', edge_vs_mercado: 'Com Price depletado, a vulnerabilidade no chao aumenta. RNC ou guilhotina tem valor a +200.', raciocinio: 'Price foi submetido 3 vezes no UFC. Depletado e sem gas, pode se entregar no chao.' },
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-160', confianca: 'media', raciocinio: 'Chiesa controla sem forcar finish. Mas com Price tao depletado, existe chance de finish mais cedo que o normal.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Chiesa ML a -600',
        descricao: 'A -600, ZERO valor. A vitoria de Chiesa e provavel mas o retorno nao justifica o investimento. So em parlay com outros favoritos.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
