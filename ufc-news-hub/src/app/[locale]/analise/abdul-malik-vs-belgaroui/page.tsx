import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'abdul-malik-vs-belgaroui',
  evento_id: null,
  slug: 'abdul-malik-vs-belgaroui',
  titulo: 'Abdul-Malik vs Belgaroui: O Invicto Contra o Homem que Venceu Pereira',
  subtitulo: 'Wrestling D1 contra o kickboxer de 1,96m que derrotou Alex Pereira e agora treina com ele',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,88m', envergadura: '203cm', idade: 28, academia: 'Columbia, Maryland' },
      fighter2: { altura: '1,96m', envergadura: '198cm', idade: 31, academia: 'Glover Teixeira MMA' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: 'Tamanho', edge: 'fighter2', impact: 8, description: 'Belgaroui tem 1,96m no peso-medio. 8cm mais alto. Kickboxing profissional (27-7).' },
      { factor: 'Wrestling', edge: 'fighter1', impact: 8, description: 'Abdul-Malik e wrestler D1 com 100% de TDs completados no UFC. Pode mudar o plano.' },
      { factor: 'Experiencia de Kickboxing', edge: 'fighter2', impact: 7, description: 'Belgaroui VENCEU Alex Pereira em kickboxing. Nivel tecnico de striking altissimo.' },
    ],
    xFactor: {
      title: 'Belgaroui Venceu Pereira',
      description: 'Em 2017, Belgaroui venceu Pereira por decisao unanime no GLORY. O mesmo Pereira que e campeao do UFC. Isso diz tudo sobre o nivel de striking.',
    },
  },
  fighter1_info: {
    nome: 'Mansur Abdul-Malik',
    record: '9-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Antonio Trocoli', method: 'Sub R1 (guilhotina, 1:09)', event: 'UFC 323' },
      { result: 'D', opponent: 'Cody Brundage', method: 'Empate Majoritario', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Nick Klein', method: 'TKO R2', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Yousri Belgaroui',
    record: '11-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Azamat Bekoev', method: 'TKO R3', event: 'UFC Vancouver' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Medio (185 lbs)',
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
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Invicto vs O Homem que Venceu Pereira',
      tagline_sub: 'Wrestling D1 contra kickboxing de nivel mundial. A luta mais equilibrada do card.',
      fighter1: {
        nome_completo: 'Mansur Abdul-Malik',
        apelido: '',
        sobrenome: 'Abdul-Malik',
        record: '9-0-1',
        ranking: 'N/R Peso Medio',
        info_extra: 'Columbia, Maryland | 28 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/ABDUL-MALIK_MANSUR_L_03-28.png?itok=E7MoTnaG',
      },
      fighter2: {
        nome_completo: 'Yousri "Baby Face Assassin" Belgaroui',
        apelido: 'Baby Face Assassin',
        sobrenome: 'Belgaroui',
        record: '11-2-0',
        ranking: 'N/R Peso Medio',
        info_extra: 'Holanda/Tunisia | Glover Teixeira MMA | 31 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/BELGAROUI_YOUSRI_R_10-18.png?itok=g7i7Fdzt',
      },
    },

    narrativa: {
      html_content: `
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">O Invicto Silencioso</span>
          </h3>

          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ufc-red to-ufc-red/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-ufc-red">Mansur Abdul-Malik</strong> e 9-0-1 e ninguem fala dele. O wrestler da Universidade de Maryland tem 4-0 no UFC com 3 finalizacoes, incluindo uma guilhotina de 69 segundos sobre Trocoli no UFC 323. O unico "defeito": um empate majoritario contra Cody Brundage onde foi derrubado por Klein antes de responder com TKO. Abdul-Malik tem poder real, wrestling D1, e 28 anos. E o tipo de prospecto silencioso que aparece no ranking do nada.
              </p>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">O Gigante que Venceu Pereira</span>
          </h3>

          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-blue-400/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-blue-400">Yousri Belgaroui</strong> tem 1,96m no peso-medio e ja VENCEU Alex Pereira em kickboxing. Em 2017, nas finais do torneio do GLORY, Belgaroui derrotou Pereira por decisao unanime. Desafiou o titulo GLORY tres vezes (duas contra Pereira). Carreira de kickboxing: 27-7. Agora treina COM Pereira no Glover Teixeira MMA em Connecticut. No debut UFC, nocauteou Bekoev no R3. Com 6'5" e nivel de striking de classe mundial, Belgaroui e o matchup mais perigoso que Abdul-Malik ja enfrentou.
              </p>
            </div>
          </div>

          <div class="rounded-xl bg-amber-400/[0.04] border border-amber-400/10 p-5">
            <p class="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold mb-2">O Dado que Muda Tudo</p>
            <p class="text-sm text-white/60">Belgaroui venceu Alex Pereira em kickboxing e agora treina com ele. Treina ao lado do campeao do UFC meio-pesado diariamente. O nivel de sparring e incomparavel.</p>
          </div>
        </div>

        <div>
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-6">
            <span class="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Por Que Essa Luta Importa</span>
          </h3>
          <div class="relative rounded-xl overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-1 bg-amber-400 rounded-full"></div>
            <div class="pl-5 py-3">
              <p class="text-sm text-white/50 leading-[1.8]">Essa e a pick em fight do card. Odds basicamente 50/50. Wrestling D1 vs Kickboxing profissional de nivel GLORY. Se Abdul-Malik conseguir o takedown, domina. Se Belgaroui manter distancia com os 8cm de altura e o jab, domina. A pergunta classica do MMA: quem dita onde a luta acontece?</p>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Odds', fighter1: '-118 (basicamente 50/50)', fighter2: '+105' },
        { dimensao: 'Estilo', fighter1: 'Wrestling D1, power puncher', fighter2: 'Kickboxing GLORY, 1,96m' },
        { dimensao: 'Background', fighter1: 'Universidade de Maryland, 28 anos', fighter2: 'GLORY kickboxing 27-7, venceu Pereira' },
        { dimensao: 'UFC Record', fighter1: '4-0 (3 finishes)', fighter2: '1-0 (TKO R3)' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O WRESTLING RESOLVE',
          subtitulo: 'Abdul-Malik leva ao chao e controla. Kickboxing nao funciona de costas.',
          consequencias: [
            { tag: 'INVICTO', texto: 'Abdul-Malik mantem o invicto e prova que wrestling anula kickboxing de elite.' },
          ],
          proxima_luta: 'Abdul-Malik vs oponente ranqueado',
        },
        fighter2_vence: {
          titulo: 'O TAMANHO E O STRIKING VENCEM',
          subtitulo: 'Belgaroui usa a altura, o jab e o kickboxing pra dominar na distancia.',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Belgaroui sobe rapidamente com 2-0 no UFC. O cara que venceu Pereira agora vence um invicto.' },
          ],
          proxima_luta: 'Belgaroui vs oponente ranqueado',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Mansur Abdul-Malik',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1 (guilhotina, 1:09)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina em 69 segundos. Trocoli era 0-3 no UFC. Oponente fraco mas finish impressionante.' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'Empate Majoritario', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate controverso. Luta competitiva que poderia ter ido pra qualquer lado.' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2 (strikes)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Foi derrubado por Klein no R1 mas respondeu com TKO no R2. Mostrou resiliencia e poder.' },
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1 (strikes)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finish rapido no debut.' },
        ],
        full_fight_history: [
          { date: 'Nov 2024', opponent: 'Dusko Todorovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC' },
          { date: 'Fev 2025', opponent: 'Nick Klein', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrubado mas respondeu' },
          { date: 'Jun 2025', opponent: 'Cody Brundage', result: 'D', method: 'MD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate' },
          { date: 'Dez 2025', opponent: 'Antonio Trocoli', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina 69s' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Abdul-Malik e 4-0 (com 1 empate) no UFC. 3 finalizacoes. O nivel de oposicao nao e elite mas a taxa de finalizacao e impressionante. Aos 28, esta no comeco do prime. Belgaroui e o primeiro teste real.',
      },
      fighter2: {
        nome: 'Yousri Belgaroui',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC com nocaute no R3. Bekoev e wrestler forte, e Belgaroui sobreviveu o grappling e nocauteou. Prova que a defesa de takedown esta evoluindo.' },
        ],
        full_fight_history: [
          { date: 'Out 2025', opponent: 'Azamat Bekoev', result: 'W', method: 'TKO R3 (socos, 0:55)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. Venceu wrestler por TKO. Usou kickboxing pra quebrar Bekoev ao longo de 3 rounds.' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Belgaroui fez um debut impressionante vencendo Bekoev (wrestler) por TKO no R3. Provou que consegue lidar com wrestling e ainda nocautear. Treina diariamente com Alex Pereira no Glover Teixeira MMA. O nivel de sparring e altissimo.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Abdul-Malik', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '4W-0L-1D (90%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Belgaroui', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '1W-0L (100%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum no MMA. Mas Belgaroui tem um background de kickboxing de nivel mundial: 27-7 no GLORY, venceu Alex Pereira por decisao unanime nas finais do torneio middleweight em 2017. Abdul-Malik tem background de wrestling D1 pela Universidade de Maryland.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.50, valueB: 3.80, maxVal: 6, format: 'decimal', note: 'Abdul-Malik surpreende com volume alto pra um wrestler. Belgaroui ainda se adaptando ao MMA.' },
        { label: 'Precisao de Strikes (%)', valueA: 55, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.80, valueB: 2.50, maxVal: 5, format: 'decimal', reverseWinner: true, note: 'Belgaroui absorve MUITO menos. O footwork de kickboxer faz diferenca.' },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 62, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 3.20, valueB: 0.50, maxVal: 5, format: 'decimal', note: 'Abdul-Malik e wrestler ativo. Belgaroui quase nao tenta TDs.' },
        { label: 'Defesa de Takedown (%)', valueA: 70, valueB: 65, maxVal: 100, format: 'percent', note: 'Belgaroui defendeu os TDs de Bekoev (wrestler) e nocauteou. Teste passou.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '28 anos', fighter2: '31 anos', note: 'Abdul-Malik mais jovem' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,96m (6\'5")', note: 'Belgaroui 8cm MAIS ALTO no peso-medio' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '198cm (78")', note: 'Abdul-Malik surpreende com reach maior apesar de ser menor' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Background', fighter1: 'Wrestling D1, Maryland', fighter2: 'Kickboxing GLORY (27-7), venceu Pereira', note: 'Grappling vs Striking de nivel mundial' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 62, valueB: 85, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Belgaroui e kickboxer profissional com 27-7 no GLORY. Venceu Alex Pereira. O nivel de striking e incomparavel.' },
        { label: 'Wrestling Ofensivo', valueA: 82, valueB: 45, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Abdul-Malik e wrestler D1. 3.20 TDs/15min. A arma pra anular o kickboxing de Belgaroui.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 75, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Ambos tem poder. Abdul-Malik nocauteou Todorovic e Klein. Belgaroui nocauteou Bekoev. Quem conectar limpo, machuca.' },
        { label: 'Defesa de Takedown', valueA: 70, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Belgaroui provou que pode defender TDs (vs Bekoev) mas Abdul-Malik e mais persistente.' },
        { label: 'Tamanho e Fisico', valueA: 65, valueB: 88, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Belgaroui tem 1,96m no peso-medio. 8cm mais alto. Em pe, o tamanho e uma vantagem ENORME.' },
        { label: 'Experiencia UFC', valueA: 60, valueB: 35, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Abdul-Malik tem 4 lutas no UFC. Belgaroui tem 1. Mais experiencia no octogono.' },
      ],
      insight: 'A luta classica de grappler vs striker. Abdul-Malik precisa levar ao chao. Belgaroui precisa manter distancia com a altura de 1,96m e o jab de kickboxer. Quem ditar onde a luta acontece ganha.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Abdul-Malik', ko_tko: { count: 5, percent: 56 }, submission: { count: 3, percent: 33 }, decision: { count: 1, percent: 11 }, total_wins: 9 },
      fighter2: { nome: 'Belgaroui', ko_tko: { count: 8, percent: 73 }, submission: { count: 1, percent: 9 }, decision: { count: 2, percent: 18 }, total_wins: 11 },
      insight: 'Ambos sao finalizadores. Abdul-Malik com mix de KO (56%) e sub (33%). Belgaroui e primariamente nocauteador (73% KO), reflexo da carreira de kickboxing. Se a luta ficar em pe, Belgaroui finaliza por KO. Se for ao chao, Abdul-Malik finaliza por TKO ou sub.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 6, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Quem Dita o Plano', description: 'O R1 decide tudo. Se Abdul-Malik completar takedowns, controla. Se Belgaroui defender e manter distancia, o kickboxing domina. Os primeiros 2 minutos sao criticos.' },
        { rounds: 'R2', danger_level: 5, danger_label: 'VANTAGEM BELGAROUI', color: 'green', title: 'Cardio e Adaptacao', description: 'Se Belgaroui sobreviver o wrestling do R1, o R2 e dele. Kickboxers tendem a melhorar com o tempo. Abdul-Malik pode estar cansado de tentar takedowns.' },
        { rounds: 'R3', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'Round Decisivo', description: 'Se estiver apertado nos cartoes, o R3 decide. Ambos tem gas pra 3 rounds. O mais determinado ganha.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: 'Belgaroui venceu Pereira', fighter: 'Belgaroui', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Venceu Alex Pereira por decisao unanime no GLORY em 2017. O mesmo Pereira que e campeao do UFC. Nivel de striking de classe mundial.' },
        { icon: 'Shield', title: 'Treina com Pereira diariamente', fighter: 'Belgaroui', risk_level: 'POSITIVO', risk_color: 'green', description: 'Treina no Glover Teixeira MMA com Alex Pereira. Sparring diario com o campeao do UFC meio-pesado.' },
        { icon: 'Target', title: 'Wrestling D1', fighter: 'Abdul-Malik', risk_level: 'POSITIVO', risk_color: 'green', description: 'Abdul-Malik e wrestler pela Universidade de Maryland. O wrestling e a arma pra anular o kickboxing.' },
        { icon: 'Activity', title: 'Belgaroui defendeu wrestler', fighter: 'Belgaroui', risk_level: 'POSITIVO', risk_color: 'green', description: 'No debut UFC, Belgaroui defendeu os takedowns de Bekoev (wrestler) e nocauteou no R3. Prova que a TDD esta evoluindo.' },
        { icon: 'AlertTriangle', title: 'Abdul-Malik foi derrubado por Klein', fighter: 'Abdul-Malik', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'No fight vs Klein, Abdul-Malik foi derrubado no R1 antes de responder com TKO. Mostra que nao e invulneravel em pe.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Abdul-Malik',
        total_probability: 46,
        scenarios: [
          { name: 'Wrestling e Ground Control', probability: 22, method: 'Decisao Unanime', description: 'Abdul-Malik leva ao chao repetidamente e acumula tempo de controle nos cartoes.' },
          { name: 'Ground and Pound', probability: 14, method: 'TKO R1-R2', description: 'Abdul-Malik derruba e finaliza com ground and pound. Como fez com Todorovic e Klein.' },
          { name: 'Guilhotina', probability: 10, method: 'Sub R1-R2', description: 'Abdul-Malik encontra uma guilhotina quando Belgaroui abaixa a cabeca. Como fez com Trocoli.' },
        ],
      },
      fighter2: {
        nome: 'Belgaroui',
        total_probability: 52,
        scenarios: [
          { name: 'Kickboxing de Distancia', probability: 25, method: 'Decisao Unanime', description: 'Belgaroui usa os 8cm de altura e o jab pra manter distancia e vencer nos pontos. O kickboxing profissional faz a diferenca.' },
          { name: 'Nocaute no Striking', probability: 18, method: 'KO/TKO R2-R3', description: 'Belgaroui conecta algo pesado quando Abdul-Malik tenta entrar pra takedown. Contragolpe devastador.' },
          { name: 'TKO Tardio', probability: 9, method: 'TKO R3', description: 'Belgaroui acumula dano com strikes e Abdul-Malik cansa de tentar takedowns. O arbitro para no R3.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Yousri Belgaroui',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Essa e genuinamente a luta mais dificil de prever no card. Odds 50/50 por uma razao. Vou com Belgaroui por tres fatores: (1) ele ja provou que defende takedowns contra wrestlers (venceu Bekoev), (2) o nivel de striking e de classe mundial (GLORY 27-7, venceu Pereira), (3) treina diariamente com Alex Pereira. Os 8cm de altura no peso-medio sao uma vantagem enorme pra manter distancia. Mas a confianca e MEDIA porque Abdul-Malik e um wrestler persistente que pode anular tudo se completar takedowns.',
      x_factor: {
        title: 'O Jab de Belgaroui',
        description: 'Com 1,96m e background de kickboxing profissional, o jab de Belgaroui pode ser a arma mais subestimada da noite. Se manter Abdul-Malik na distancia, controla a luta inteira.',
      },
      upset_alert: {
        title: 'Abdul-Malik e Persistente',
        description: 'Abdul-Malik media 3.20 TDs/15min. Mesmo se Belgaroui defender o primeiro, e o segundo, e o terceiro, Abdul-Malik vai tentar o quarto, o quinto, o sexto. A persistencia do wrestling pode quebrar a defesa.',
      },
      probabilities: {
        fighter1: { nome: 'Abdul-Malik', percent: 46 },
        fighter2: { nome: 'Belgaroui', percent: 52 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Belgaroui (+105)', reasoning: 'Basicamente um coin flip nas odds. Belgaroui com kickboxing GLORY, vitoria sobre Pereira, e treino com Pereira. A +105 tem valor leve.' },
        method: { pick: 'Vai para Decisao (-130)', reasoning: 'Luta apertada entre grappler e striker tende a ir a distancia. Nenhum dos dois vai dominar facilmente.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Luta equilibrada, ambos com gas pra 3 rounds, tende a ir pros juizes.' },
        best_value: 'Over 2.5 rounds e a aposta mais segura. Luta apertada entre estilos opostos nao acaba cedo.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O primeiro takedown tentado', icon: 'Target', description: 'Se Abdul-Malik completar o primeiro TD, Belgaroui precisa se levantar rapido. Se defender, a confianca de Belgaroui dispara.' },
        { num: 2, title: 'O jab de Belgaroui', icon: 'Zap', description: 'Com 1,96m e kickboxing de GLORY, o jab e a arma principal. Se estiver conectando e mantendo distancia, Abdul-Malik esta em problemas.' },
        { num: 3, title: 'A TDD de Belgaroui', icon: 'Shield', description: 'Belgaroui defendeu os TDs de Bekoev (wrestler). Se fizer o mesmo com Abdul-Malik, a luta e dele. Se nao, vai pro chao.' },
        { num: 4, title: 'Abdul-Malik na trocacao', icon: 'Brain', description: 'Abdul-Malik foi derrubado por Klein em pe. Contra um kickboxer de nivel GLORY, a trocacao e territorio perigoso.' },
        { num: 5, title: 'O R3 se estiver apertado', icon: 'Activity', description: 'Nos cartoes, o R3 decide. Quem tiver mais gas e determinacao leva. Ambos precisam dar tudo.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'ELE VENCEU PEREIRA', content: 'ABDUL-MALIK vs BELGAROUI\nUFC Seattle | Peso Medio\n\n9-0-1 vs 11-2\n\nBelgaroui VENCEU Alex Pereira\nem kickboxing (GLORY 2017)\n\nAgora treina COM ele.\nE tem 1,96m no peso-medio.', color: 'blue' },
        { slide_number: 2, title: 'A PICK EM DO CARD', content: 'Odds: basicamente 50/50\n\nAbdul-Malik: Wrestling D1\nBelgaroui: Kickboxing GLORY (27-7)\n\nGrappling vs Striking.\nA pergunta classica do MMA:\nquem dita onde a luta acontece?', color: 'gold' },
        { slide_number: 3, title: 'PREVISAO', content: 'BELGAROUI por Decisao\n\nConfianca: MEDIA\n52% Belgaroui / 46% Abdul-Malik\n\nO kickboxing e o tamanho (1,96m)\ndevem fazer a diferenca na distancia.\nMas Abdul-Malik e PERSISTENTE.', color: 'gold' },
      ],
      twitter: [
        { num: '1/3', text: 'Abdul-Malik vs Belgaroui e a pick em do card. Odds 50/50. Wrestling D1 contra kickboxing GLORY. E Belgaroui VENCEU ALEX PEREIRA em kickboxing em 2017. Agora treina com ele.' },
        { num: '2/3', text: 'O dado que ninguem fala: Belgaroui tem 1,96m no peso-medio. SIM, 1 METRO E 96. Com kickboxing profissional de GLORY (27-7). Isso e um matchup nightmare pra qualquer wrestler.' },
        { num: '3/3', text: 'Pick: Belgaroui por decisao. O kickboxing e o tamanho sao demais na distancia. Mas Abdul-Malik com wrestling D1 pode mudar tudo se levar ao chao. Luta genuinamente 50/50.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Esse cara venceu Alex Pereira em kickboxing. Agora treina com ele. E tem 1,96m no peso-medio. E vai enfrentar um wrestler invicto.' },
        { time: '10-25s', title: 'O Matchup', text: 'Abdul-Malik: wrestling D1, 9-0-1, guilhotina de 69 segundos no ultimo fight. Belgaroui: kickboxing GLORY 27-7, venceu Pereira, 1,96m, nocauteou wrestler no debut UFC.' },
        { time: '25-35s', title: 'Previsao', text: 'A pick em mais pura do card. Belgaroui por decisao se manter distancia. Abdul-Malik se levar ao chao. Over 2.5 rounds.' },
      ],
      tiktok: [
        { hook: 'Esse cara VENCEU Alex Pereira em kickboxing. Agora luta no UFC.', body: 'Yousri Belgaroui. 1,96m no peso-medio. Kickboxing GLORY 27-7. Venceu Pereira por decisao unanime em 2017. Agora TREINA com Pereira. E no sabado enfrenta um wrestler invicto de 9-0-1. Wrestling D1 vs Kickboxing de classe mundial. A luta mais pura do card.', cta: 'Wrestling ou Kickboxing? Comenta!' },
      ],
      headlines: [
        'Abdul-Malik vs Belgaroui: O Invicto Contra o Homem que Venceu Pereira',
        '1,96m no Peso-Medio: Belgaroui e o Gigante do Kickboxing',
        'Wrestling D1 vs GLORY Kickboxing: A Pick Em do UFC Seattle',
        'Belgaroui Treina Com Pereira e Agora Busca Dominar o MMA',
        'A Luta Mais Equilibrada do Card: 50/50 Por Uma Razao',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-118',
        fighter2_odds: '+105',
        fighter1_name: 'Mansur Abdul-Malik',
        fighter2_name: 'Yousri Belgaroui',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Belgaroui Venceu Pereira em Kickboxing', stat_headline: 'GLORY 27-7, DECISAO UNANIME SOBRE PEREIRA NAS FINAIS 2017', contexto: 'O nivel de striking e incomparavel. Vencer Pereira prova classe mundial.', implicacao_aposta: 'Favorece Belgaroui em pe. Se a luta ficar na distancia, o kickboxing domina.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Wrestling D1 de Abdul-Malik', stat_headline: '3.20 TDS/15MIN, 100% TD ACCURACY NO UFC', contexto: 'Abdul-Malik e wrestler persistente. A arma pra anular kickboxing de elite.', implicacao_aposta: 'Favorece Abdul-Malik no chao. Se completar TDs, domina.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Belgaroui Defendeu Wrestler no Debut', stat_headline: 'VENCEU BEKOEV (WRESTLER) POR TKO R3', contexto: 'Provou que a TDD esta evoluindo. Sobreviveu o grappling e nocauteou.', implicacao_aposta: 'Reduz o edge do wrestling de Abdul-Malik. Belgaroui nao e facil de derrubar.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: '1,96m no Peso-Medio', stat_headline: 'BELGAROUI E 8CM MAIS ALTO QUE ABDUL-MALIK', contexto: 'Tamanho massivo pra divisao. O jab e a distancia sao armas naturais.', implicacao_aposta: 'Favorece Belgaroui na distancia. Abdul-Malik precisa fechar o gap.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-140', confianca: 'media', raciocinio: 'Luta equilibrada de estilos opostos. Nenhum dos dois vai dominar facilmente. Tende a ir a distancia.' },
        { tipo: 'Moneyline', pick: 'Belgaroui (+105)', odds: '+105', confianca: 'media', edge_vs_mercado: 'Basicamente 50/50. Belgaroui tem kickboxing GLORY, vitoria sobre Pereira, e treino com Pereira. Leve valor.', raciocinio: 'O kickboxing e o tamanho sao vantagens reais que tendem a controlar a distancia.' },
        { tipo: 'Metodo', pick: 'Abdul-Malik por Decisao', odds: '+200', confianca: 'baixa', raciocinio: 'Se Abdul-Malik controlar com wrestling sem finalizar, pode vencer nos pontos. Cenario possivel mas menos provavel.' },
      ],
      armadilha: {
        titulo: 'Armadilha: KO Rapido de Qualquer Lado',
        descricao: 'Ambos tem poder. Abdul-Malik nocauteia e submete. Belgaroui nocauteia com kickboxing. Mas com estilos tao opostos e luta tao equilibrada, a probabilidade de ir rapido e baixa. Apostas em Under 1.5 sao arriscadas.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
