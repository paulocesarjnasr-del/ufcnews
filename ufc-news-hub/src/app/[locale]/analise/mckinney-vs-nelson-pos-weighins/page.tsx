import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'mckinney-vs-nelson-pos-weighins',
  evento_id: null,
  slug: 'mckinney-vs-nelson-pos-weighins',
  titulo: 'McKinney vs Nelson: Pos Weigh-Ins | Wired vs Calmo',
  subtitulo: 'McKinney wired e explosivo na pesagem. Nelson calmo e tranquilo. Ambos bateram 155. A bomba-relogio esta armada.',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,78m', envergadura: '183cm', idade: 31, academia: 'Xtreme Couture' },
      fighter2: { altura: '1,78m', envergadura: '183cm', idade: 34, academia: 'Canada' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'KO/TKO R1',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [
      { factor: '100% Finish Rate', edge: 'fighter1', impact: 9, description: '25 lutas, 25 finalizacoes. McKinney NUNCA foi a decisao.' },
      { factor: 'Velocidade', edge: 'fighter1', impact: 8, description: 'McKinney wired na pesagem. Explosividade parece intacta.' },
      { factor: 'Compostura de Nelson', edge: 'fighter2', impact: 6, description: 'Nelson calmo e tranquilo. Sabe o que precisa fazer: sobreviver o R1.' },
    ],
    xFactor: {
      title: 'McKinney Wired na Pesagem',
      description: 'McKinney pareceu wired e explosivo como sempre na pesagem. Pulando, mexendo, incapaz de ficar parado. A energia e real. Mas sera que e foco ou ansiedade?',
    },
  },
  fighter1_info: {
    nome: 'Terrance McKinney',
    record: '17-8-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Chris Duncan', method: 'Sub R1 (anaconda choke)', event: 'UFC 323' },
      { result: 'W', opponent: 'Viacheslav Borshchev', method: 'Sub R1 (guilhotina, 0:55)', event: 'UFC 317' },
      { result: 'W', opponent: 'Damir Hadzovic', method: 'TKO R1 (ground and pound)', event: 'UFC Fight Night 250' },
    ],
  },
  fighter2_info: {
    nome: 'Kyle Nelson',
    record: '17-6-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Matt Frevola', method: 'Decisao Unanime', event: 'UFC Vancouver' },
      { result: 'L', opponent: 'Steve Garcia', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Bill Algeo', method: 'TKO R1', event: 'UFC Fight Night' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Leve (155 lbs)',
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
      categoria_peso: 'Peso Leve (155 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Pos Weigh-Ins: Wired vs Calmo',
      tagline_sub: 'McKinney pulando e mexendo. Nelson tranquilo e composto. Ambos em 155. A bomba-relogio continua armada.',
      fighter1: {
        nome_completo: 'Terrance "T.Wrecks" McKinney',
        apelido: 'T.Wrecks',
        sobrenome: 'McKinney',
        record: '17-8-0',
        ranking: 'N/R Peso Leve',
        info_extra: 'Portland, Oregon | 31 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/MCKINNEY_TERRANCE_L_03-28.png?itok=IKsyYwXy',
      },
      fighter2: {
        nome_completo: 'Kyle "The Monster" Nelson',
        apelido: 'The Monster',
        sobrenome: 'Nelson',
        record: '17-6-1',
        ranking: 'N/R Peso Leve',
        info_extra: 'Huntsville, Ontario, Canada | 34 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/NELSON_KYLE_L_10-18.png?itok=K1REGeZG',
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
                Ambos bateram 155 sem problemas. <strong class="text-ufc-red">McKinney</strong> estava WIRED na pesagem: pulando, mexendo, incapaz de ficar parado. A energia explosiva que ja e marca registrada dele estava no maximo. Parecia pronto pra lutar ali mesmo. <strong class="text-blue-400">Nelson</strong> pesou com calma total. Tranquilo, composto, sem show. A expressao de quem sabe exatamente o que precisa fazer: sobreviver os primeiros 2 minutos. O contraste entre os dois na pesagem e a previa perfeita do que vai acontecer no cage.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">McKinney na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">WIRED</p>
                <p class="text-xs text-white/50 leading-relaxed">Pulando, mexendo, energia no maximo. McKinney e assim: explosivo ate na balanca. Bom sinal pra explosividade no R1. Mas pode ser excesso de adrenalina que gasta gas rapido.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-blue-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Nelson na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">CALMO</p>
                <p class="text-xs text-white/50 leading-relaxed">Tranquilo e composto. Sem showmanship, sem bravata. A calma de quem venceu 4 de 5 e sabe que precisa sobreviver o R1 pra vencer. A compostura e o melhor sinal possivel pro plano de jogo de Nelson.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">25 Lutas. 25 Finishes. Zero Scorecards.</span>
          </h3>

          <div class="text-center mb-8">
            <p class="font-display text-6xl md:text-7xl bg-gradient-to-b from-ufc-red/50 to-ufc-red/15 bg-clip-text text-transparent leading-none">100%</p>
            <p class="text-xs text-white/40 mt-2">Taxa de finalizacao na carreira</p>
            <p class="text-sm text-white/50 mt-1">McKinney wired na pesagem confirma: a bomba-relogio esta armada.</p>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Estilo', fighter1: '100% finish rate, explosivo, WIRED', fighter2: 'Consistente, duro, CALMO' },
        { dimensao: 'Sequencia', fighter1: 'Vem de derrota (sub R1 Duncan)', fighter2: '4 de 5 recentes' },
        { dimensao: 'Pesagem', fighter1: 'Pulando e mexendo, energia maxima', fighter2: 'Tranquilo e composto' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'T.WRECKS DESTROE',
          subtitulo: 'McKinney nocauteia ou submete Nelson no R1 com a explosividade que mostrou na pesagem',
          consequencias: [
            { tag: 'DESTAQUE', texto: 'Mais um finish rapido. Potencial bonus POTN.' },
          ],
          proxima_luta: 'McKinney vs oponente ranqueado',
        },
        fighter2_vence: {
          titulo: 'O CANADENSE SOBREVIVE',
          subtitulo: 'Nelson resiste a explosao e capitaliza quando McKinney cansa',
          consequencias: [
            { tag: 'CREDIBILIDADE', texto: 'Nelson prova que calma e dureza vencem explosividade.' },
          ],
          proxima_luta: 'Nelson vs top 20',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Terrance McKinney',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (anaconda choke, 2:30)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submetido no R1.' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (guilhotina, 0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina em 55 segundos.' },
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1 (ground and pound)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Ground and pound no R1.' },
        ],
        full_fight_history: [
          { date: 'Jun 2021', opponent: 'Matt Frevola', result: 'W', method: 'KO R1 (0:07)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC. KO mais rapido da historia do peso-leve.' },
          { date: 'Fev 2022', opponent: 'Fares Ziam', result: 'W', method: 'Sub R1 (RNC, 2:11)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mata-leao' },
          { date: 'Mar 2022', opponent: 'Drew Dober', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Short notice' },
          { date: 'Mai 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1 (head kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado por chute' },
        ],
        momentum_score: 6,
        momentum_label: 'Instavel',
        momentum_trend: 'resilient',
        momentum_note: 'McKinney e a definicao de inconsistencia, mas na pesagem estava WIRED. A energia explosiva esta la. A questao e a mesma de sempre: conecta no R1 ou e finalizado tentando.',
      },
      fighter2: {
        nome: 'Kyle Nelson',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Matt Frevola', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Retorno ao peso-leve. Vitoria solida.' },
          { date: 'Mar 2025', opponent: 'Steve Garcia', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota recente.' },
          { date: 'Set 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finish contra veterano.' },
        ],
        full_fight_history: [
          { date: 'Dez 2018', opponent: 'Carlos Diego Ferreira', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC' },
          { date: 'Set 2019', opponent: 'Marco Polo Reyes', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira vitoria' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UFC 289' },
        ],
        momentum_score: 6,
        momentum_label: 'Estavel',
        momentum_trend: 'stable',
        momentum_note: 'Nelson e consistente. A calma na pesagem e a prova de que sabe exatamente o plano: sobreviver o rush de McKinney e capitalizar quando ele cansa. 4 de 5 recentes.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'McKinney', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '7W-5L (58%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Nelson', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '5W-5L-1D (50%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos enfrentaram Matt Frevola. McKinney nocauteou em 7 SEGUNDOS. Nelson venceu por decisao. McKinney wired na pesagem confirma o estilo.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.80, valueB: 4.10, maxVal: 8, format: 'decimal', note: 'McKinney e uma metralhadora.' },
        { label: 'Precisao de Strikes (%)', valueA: 52, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 5.20, valueB: 3.80, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'McKinney tambem absorve MUITO.' },
        { label: 'Defesa de Strikes (%)', valueA: 42, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 3.50, valueB: 1.20, maxVal: 5, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 65, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '31 anos', fighter2: '34 anos', note: 'McKinney mais jovem' },
        { label: 'Altura', fighter1: '1,78m (5\'10")', fighter2: '1,78m (5\'10")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '183cm (72")', fighter2: '183cm (72")', note: 'Mesmo reach' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Finish Rate', fighter1: '100% (25/25)', fighter2: '52% (8/15)', note: 'McKinney NUNCA foi a decisao' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Explosividade/Velocidade', valueA: 92, valueB: 58, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney wired na pesagem. A explosividade parece intacta. Confirmado visualmente.' },
        { label: 'Durabilidade', valueA: 40, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Nelson e muito mais duro. A calma na pesagem reflete a compostura que precisa no cage.' },
        { label: 'Wrestling', valueA: 72, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney media 3.50 TDs/15min.' },
        { label: 'Striking Tecnico', valueA: 60, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'McKinney cacotico, Nelson tecnico.' },
        { label: 'Jiu-Jitsu', valueA: 65, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: '8 submissoes na carreira de McKinney.' },
        { label: 'Fight IQ', valueA: 40, valueB: 68, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Nelson calmo na pesagem = calmo no cage. McKinney wired = imprudente.' },
      ],
      insight: 'A pesagem confirmou os perfis: McKinney explosivo e imprudente, Nelson calmo e calculado. A dinamica nao muda: ou McKinney finaliza rapido ou Nelson capitaliza.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'McKinney', ko_tko: { count: 9, percent: 53 }, submission: { count: 8, percent: 47 }, decision: { count: 0, percent: 0 }, total_wins: 17 },
      fighter2: { nome: 'Nelson', ko_tko: { count: 8, percent: 47 }, submission: { count: 0, percent: 0 }, decision: { count: 9, percent: 53 }, total_wins: 17 },
      insight: 'Opostos perfeitos. McKinney: 100% finish, 0% decisao. Nelson: 53% decisao. A pesagem nao muda isso.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1 (0-2min)', danger_level: 9, danger_label: 'VANTAGEM MCKINNEY', color: 'red', title: 'A Explosao (Confirmada na Pesagem)', description: 'McKinney estava WIRED na pesagem. A explosividade esta intacta. Os primeiros 2 minutos sao onde ele e LETAL. Se Nelson sobreviver, ja e uma vitoria.' },
        { rounds: 'R1 (2-5min)', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'A Transicao', description: 'Se McKinney nao finalizou, o gas comeca a baixar. Nelson, calmo e composto, pode encontrar o ritmo.' },
        { rounds: 'R2-R3', danger_level: 3, danger_label: 'VANTAGEM NELSON', color: 'green', title: 'O Territorio do Monster', description: 'Se chegar ao R2, Nelson esta no controle. McKinney nao tem plano B.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: '100% Finish Rate + Wired na Pesagem', fighter: 'McKinney', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'McKinney wired na pesagem confirma que a explosividade esta intacta. 25 lutas, 25 finishes.' },
        { icon: 'AlertTriangle', title: '8 Derrotas por Finalizacao', fighter: 'McKinney', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Todas as 8 derrotas por finalizacao. Quando a explosao falha, nao tem plano B.' },
        { icon: 'Shield', title: 'Calma Total na Pesagem', fighter: 'Nelson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Nelson pesou com calma que inspirou confianca. A compostura e o sinal de preparacao mental correta pro gameplan.' },
        { icon: 'Brain', title: 'Oponente Comum: Frevola', fighter: 'Ambos', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'McKinney KO em 7s. Nelson decisao. A diferenca de abordagem define o matchup.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'McKinney',
        total_probability: 55,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 30, method: 'KO/TKO R1', description: 'McKinney wired e explosivo desde os primeiros segundos. Conecta nos primeiros 2 minutos. Confirmado pela energia da pesagem.' },
          { name: 'Submissao Rapida', probability: 15, method: 'Sub R1', description: 'Guilhotina ou kimura nos primeiros minutos.' },
          { name: 'Dominio Fisico', probability: 10, method: 'TKO R1-R2', description: 'Wrestling e ground and pound.' },
        ],
      },
      fighter2: {
        nome: 'Nelson',
        total_probability: 43,
        scenarios: [
          { name: 'Sobrevive e Capitaliza', probability: 22, method: 'Decisao Unanime', description: 'Nelson calmo sobrevive a explosao do R1, McKinney cansa, Nelson domina nos pontos.' },
          { name: 'Nocaute de Contragolpe', probability: 12, method: 'KO/TKO R2', description: 'McKinney imprudente e Nelson encontra o contragolpe.' },
          { name: 'Submissao Tardia', probability: 9, method: 'Sub R2-R3', description: 'McKinney cansa e Nelson encontra abertura no chao.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Terrance McKinney',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'A pesagem confirmou os perfis sem mudar a previsao. McKinney wired e explosivo, Nelson calmo e composto. A dinamica e a mesma: ou McKinney finaliza no R1 ou Nelson capitaliza depois. A confianca se mantem em MEDIA porque McKinney tem 8 derrotas por finalizacao, e a energia wired pode se traduzir em imprudencia. Previsao: McKinney KO R1, mas Nelson sobrevivendo nao seria surpresa.',
      x_factor: {
        title: 'Os Primeiros 120 Segundos',
        description: 'A pesagem confirmou: McKinney vai entrar como um foguete. Se Nelson sobreviver 2 minutos com a compostura que mostrou na pesagem, o momentum muda completamente.',
      },
      upset_alert: {
        title: 'Nelson Calmo = Nelson Preparado',
        description: 'A calma de Nelson na pesagem e o melhor sinal possivel. Ele sabe o gameplan: sobreviver a explosao e capitalizar. Se executar, McKinney nao tem plano B.',
      },
      probabilities: {
        fighter1: { nome: 'McKinney', percent: 55 },
        fighter2: { nome: 'Nelson', percent: 43 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'McKinney (-200)', reasoning: 'Preco justo. Explosividade confirmada na pesagem. Mas -200 nao oferece muito valor dado as 8 derrotas.' },
        method: { pick: 'Under 1.5 Rounds', reasoning: 'A melhor aposta. McKinney wired = explosao no R1. 100% finish rate. Nao vai pros juizes.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: '100% finish rate. A pesagem confirmou que a explosividade esta intacta. Vai acabar rapido.' },
        best_value: 'Under 1.5 Rounds continua sendo a melhor aposta da noite. McKinney wired na pesagem confirma. Se quiser mais valor, Nelson ML a +170 e valido se voce acredita na calma dele contra a imprudencia de McKinney.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A explosao de McKinney nos primeiros 30s', icon: 'Zap', description: 'McKinney wired na pesagem = explosao maxima no cage. Observe se ele conecta algo pesado nos primeiros 30 segundos.' },
        { num: 2, title: 'A compostura de Nelson', icon: 'Shield', description: 'Nelson calmo na pesagem. Observe se mantém a calma quando McKinney avanca como um trem. Se sim, esta no controle.' },
        { num: 3, title: 'O gas de McKinney apos 2 minutos', icon: 'Activity', description: 'Se McKinney estava wired na pesagem, pode ter gasto adrenalina. Observe se desacelera rapido no cage.' },
        { num: 4, title: 'O contragolpe de Nelson', icon: 'Brain', description: 'McKinney imprudente. Nelson calmo e tecnico. O contragolpe quando McKinney avanca pode mudar tudo.' },
        { num: 5, title: 'Vai pros juizes?', icon: 'Activity', description: 'McKinney 0 decisoes em 25 lutas. Se essa luta for pros cartoes, sera a primeira vez na vida dele.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'POS WEIGH-INS', content: 'MCKINNEY vs NELSON\nPOS PESAGEM\n\nMcKinney: WIRED, pulando, explosivo\nNelson: CALMO, composto, tranquilo\n\nAmbos em 155.\n100% finish rate vs dureza pura.', color: 'red' },
        { slide_number: 2, title: 'PREVISAO MANTIDA', content: 'MCKINNEY por KO/TKO R1\n\nConfianca: MEDIA\n55% McKinney / 43% Nelson\n\nA pesagem confirmou tudo.\nMelhor aposta: Under 1.5 Rounds\n\nSe Nelson sobreviver 2 min,\ntudo muda.', color: 'gold' },
      ],
      twitter: [
        { num: '1/3', text: 'POS WEIGH-INS: McKinney vs Nelson. McKinney WIRED e pulando na pesagem. Nelson CALMO e composto. A previa perfeita da luta. Explosao vs compostura.' },
        { num: '2/3', text: 'A pesagem confirmou tudo. McKinney com energia explosiva, Nelson com calma de quem sabe o plano. Under 1.5 rounds continua sendo a melhor aposta da noite.' },
        { num: '3/3', text: 'Pick se mantem: McKinney KO R1. Mas a calma de Nelson na pesagem me deixa mais confiante que ele pode sobreviver. Se isso acontecer, McKinney nao tem plano B.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Na pesagem, McKinney estava PULANDO e Nelson estava ZEN. A previa perfeita de explosao vs compostura.' },
        { time: '10-25s', title: 'Pesagem', text: 'McKinney wired, incapaz de ficar parado. Nelson calmo total. 100% finish rate contra o canadense duro. A luta vai durar menos de 5 minutos.' },
        { time: '25-35s', title: 'Pick', text: 'McKinney KO R1. Under 1.5 rounds. Mas se Nelson sobreviver com aquela calma, nao tem plano B.' },
      ],
      tiktok: [
        { hook: 'Na pesagem ele nao parava de PULAR e o outro tava ZEN.', body: 'McKinney: 25 lutas, 25 finishes, ZERO decisoes. Na pesagem, WIRED. Pulando, mexendo, energia no maximo. Nelson: calmo, composto, tranquilo. A diferenca era GRITANTE. Explosao vs compostura. Se McKinney conectar em 2 minutos, acabou. Se Nelson sobreviver com aquela calma, McKinney nao tem plano B.', cta: 'Explosao ou compostura? Comenta!' },
      ],
      headlines: [
        'Pos Weigh-Ins: McKinney Wired, Nelson Calmo na Pesagem',
        'A Previa Perfeita: Explosao vs Compostura no Peso Leve',
        'Under 1.5 Rounds: A Pesagem Confirmou a Melhor Aposta da Noite',
        'Nelson Calmo na Pesagem: O Sinal de Que o Plano Vai Funcionar?',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-200',
        fighter2_odds: '+170',
        fighter1_name: 'Terrance McKinney',
        fighter2_name: 'Kyle Nelson',
        source: 'Media de casas de apostas pos weigh-ins (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: '100% Finish Rate + Wired na Pesagem', stat_headline: '25 LUTAS, 25 FINISHES + ENERGIA EXPLOSIVA CONFIRMADA', contexto: 'McKinney wired na pesagem confirma que a explosividade esta intacta. Under rounds e a aposta.', implicacao_aposta: 'Under 1.5 rounds. Under 2.5 quase certo. Nao vai pros juizes.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Shield', titulo: 'Nelson Calmo na Pesagem', stat_headline: 'COMPOSTO, TRANQUILO, SEM SHOW', contexto: 'A calma de Nelson e o melhor sinal pro plano: sobreviver e capitalizar. Se executar, ganha.', implicacao_aposta: 'Nelson ML a +170 tem valor se voce acredita na compostura dele contra a imprudencia.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: '8 Derrotas de McKinney por Finish', stat_headline: 'TODAS AS DERROTAS FORAM FINALIZACOES', contexto: 'Quando a explosao falha, McKinney nao tem plano B. A calma de Nelson e ideal pra explorar isso.', implicacao_aposta: 'Nelson por finish no R2+ tem valor se McKinney gastar gas.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '+100', confianca: 'alta', raciocinio: 'McKinney wired. 100% finish rate. A pesagem confirmou. Melhor aposta da noite.' },
        { tipo: 'Metodo', pick: 'McKinney por KO/TKO R1', odds: '+120', confianca: 'media', raciocinio: 'A explosividade da pesagem aponta pra isso. 53% das vitorias por KO.' },
        { tipo: 'Moneyline', pick: 'Nelson (+170)', odds: '+170', confianca: 'baixa', edge_vs_mercado: 'A calma de Nelson na pesagem inspira confianca. Se sobreviver 2 minutos, +170 tem valor enorme.', raciocinio: 'Nelson calmo e duro. Se a compostura da pesagem se mantiver no cage, pode frustrar McKinney.' },
      ],
      armadilha: {
        titulo: 'Armadilha: McKinney por Decisao',
        descricao: 'McKinney tem ZERO decisoes em 25 lutas. Apostar em McKinney por decisao e apostar em algo que NUNCA aconteceu. A pesagem com ele wired confirma: nao vai ser por decisao.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
