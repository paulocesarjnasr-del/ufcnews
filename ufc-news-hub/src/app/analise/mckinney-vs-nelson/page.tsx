import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'mckinney-vs-nelson',
  evento_id: null,
  slug: 'mckinney-vs-nelson',
  titulo: 'McKinney vs Nelson: O Homem Que Nao Sabe o Que E Scorecard',
  subtitulo: '25 lutas profissionais, 25 finalizacoes. Terrance McKinney nunca foi a decisao. Contra Kyle Nelson que venceu 4 de 5.',
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
      { factor: '100% Finish Rate', edge: 'fighter1', impact: 9, description: '25 lutas, 25 finalizacoes. McKinney NUNCA foi a decisao em vitoria ou derrota.' },
      { factor: 'Velocidade', edge: 'fighter1', impact: 8, description: 'McKinney e um dos lutadores mais rapidos do peso-leve. O debut no UFC foi KO em 7 segundos.' },
      { factor: 'Experiencia UFC', edge: 'fighter2', impact: 6, description: 'Nelson tem mais lutas no UFC (11 vs 12) e venceu 4 de 5 recentemente.' },
    ],
    xFactor: {
      title: 'A Luta Nunca Vai Longe',
      description: 'McKinney tem 0 decisoes em 25 lutas. Ou ele nocauteia/submete, ou e nocauteado/submetido. Nao tem meio-termo.',
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
      tagline: 'O Homem dos 25 Finishes',
      tagline_sub: '25 lutas. 25 finalizacoes. Zero decisoes. McKinney nao sabe o que e scorecard.',
      fighter1: {
        nome_completo: 'Terrance "T.Wrecks" McKinney',
        apelido: 'T.Wrecks',
        sobrenome: 'McKinney',
        record: '17-8-0',
        ranking: 'N/R Peso Leve',
        info_extra: 'Portland, Oregon | 31 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Kyle "The Monster" Nelson',
        apelido: 'The Monster',
        sobrenome: 'Nelson',
        record: '17-6-1',
        ranking: 'N/R Peso Leve',
        info_extra: 'Huntsville, Ontario, Canada | 34 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">25 Lutas. 25 Finishes. Zero Scorecards.</span>
          </h3>

          <div class="text-center mb-8">
            <p class="font-display text-6xl md:text-7xl bg-gradient-to-b from-ufc-red/50 to-ufc-red/15 bg-clip-text text-transparent leading-none">100%</p>
            <p class="text-xs text-white/40 mt-2">Taxa de finalizacao na carreira</p>
            <p class="text-sm text-white/50 mt-1">Nenhum outro lutador ativo no UFC tem esse numero.</p>
          </div>

          <div class="relative rounded-xl overflow-hidden mb-8">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ufc-red to-ufc-red/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-ufc-red">Terrance McKinney</strong> e um fenomeno estatistico. Em 25 lutas profissionais, TODAS terminaram antes dos juizes. 9 KO/TKOs, 8 submissoes nas vitorias. 8 finalizacoes nas derrotas. O debut no UFC foi um nocaute em 7 SEGUNDOS contra Matt Frevola, o finish mais rapido da historia da categoria. Borshchev submetido em 55 segundos. Hadzovic finalizado por ground and pound no R1. Mas a outra face da moeda: Chris Duncan submeteu McKinney com anaconda choke no R1 no UFC 323. McKinney e uma espada de dois gumes: letal e vulneravel.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="font-display text-3xl text-white">7s</p>
                <p class="text-xs text-white/40 mt-1">KO mais rapido da historia do peso-leve (vs Frevola)</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="font-display text-3xl text-white">55s</p>
                <p class="text-xs text-white/40 mt-1">Submissao de Borshchev por guilhotina (UFC 317)</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="font-display text-3xl text-white">0</p>
                <p class="text-xs text-white/40 mt-1">Decisoes na carreira (vitorias ou derrotas)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">O Canadense Consistente</span>
          </h3>

          <div class="relative rounded-xl overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-blue-400/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-blue-400">Kyle Nelson</strong> e o oposto de McKinney. Consistente, duravel, e inteligente. O canadense de 34 anos venceu 4 de 5 no UFC recentemente: decisao sobre Blake Bilder, decisao sobre Fernando Padilla, TKO sobre Bill Algeo, e decisao sobre Matt Frevola. Voltou ao peso-leve e parece mais confortavel. Nelson nao e explosivo, mas e duro e sabe competir em lutas apertadas. A pergunta: a dureza de Nelson sobrevive a explosividade de McKinney?
              </p>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Estilo', fighter1: '100% finish rate, explosivo', fighter2: 'Consistente, duro, inteligente' },
        { dimensao: 'Sequencia', fighter1: 'Vem de derrota (sub R1 Duncan)', fighter2: '4 de 5 recentes' },
        { dimensao: 'Risco', fighter1: 'Pode ser finalizado rapido (ja aconteceu 8x)', fighter2: 'Pode ser nocauteado pela explosividade' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'T.WRECKS DESTROE',
          subtitulo: 'McKinney nocauteia ou submete Nelson no R1 com explosividade impossivel de acompanhar',
          consequencias: [
            { tag: 'DESTAQUE', texto: 'Mais um finish rapido no curriculo. Potencial bonus POTN.' },
          ],
          proxima_luta: 'McKinney vs oponente ranqueado no proximo card',
        },
        fighter2_vence: {
          titulo: 'O CANADENSE SOBREVIVE',
          subtitulo: 'Nelson resiste a explosao inicial e finaliza McKinney quando ele cansa',
          consequencias: [
            { tag: 'CREDIBILIDADE', texto: 'Nelson mostra que dureza e inteligencia vencem explosividade.' },
          ],
          proxima_luta: 'Nelson vs top 20 no proximo card',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Terrance McKinney',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (anaconda choke, 2:30)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submetido no R1 por anaconda choke. A vulnerabilidade no grappling continua.' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (guilhotina, 0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina em 55 segundos. Explosividade maxima.' },
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1 (ground and pound)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Ground and pound no R1. Dominio total.' },
        ],
        full_fight_history: [
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'GnP' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (0:55)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina' },
          { date: 'Dez 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (2:30)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Anaconda choke' },
        ],
        momentum_score: 6,
        momentum_label: 'Instavel',
        momentum_trend: 'resilient',
        momentum_note: 'McKinney e a definicao de inconsistencia. Ganha 2, perde 1, ganha 2, perde 1. A explosividade e real mas a vulnerabilidade tambem. Todas as 8 derrotas foram por finalizacao, mostrando que quando o plano A falha, nao tem plano B.',
      },
      fighter2: {
        nome: 'Kyle Nelson',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Matt Frevola', result: 'W', method: 'Decisao Unanime (30-27, 29-28, 29-28)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Retorno ao peso-leve com vitoria solida em Vancouver.' },
          { date: 'Mar 2025', opponent: 'Steve Garcia', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota recente. Luta competitiva.' },
          { date: 'Set 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao rapida contra veterano.' },
        ],
        full_fight_history: [
          { date: 'Set 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO' },
          { date: 'Mar 2025', opponent: 'Steve Garcia', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota' },
          { date: 'Out 2025', opponent: 'Matt Frevola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Retorno a LW' },
        ],
        momentum_score: 6,
        momentum_label: 'Estavel',
        momentum_trend: 'stable',
        momentum_note: 'Nelson e consistente: 4 de 5 no UFC recentemente. Nao e explosivo mas e inteligente e duro. O retorno ao peso-leve parece ter sido a decisao certa. Mas nunca enfrentou alguem tao explosivo quanto McKinney.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'McKinney', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '7W-5L (58%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Nelson', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '5W-5L-1D (50%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos enfrentaram Matt Frevola. McKinney nocauteou Frevola em 7 SEGUNDOS no debut UFC (o KO mais rapido da historia do peso-leve). Nelson venceu Frevola por decisao unanime em outubro de 2025. A diferenca de abordagem e a narrativa dessa luta.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.80, valueB: 4.10, maxVal: 8, format: 'decimal', note: 'McKinney e uma metralhadora. Volume altissimo nos poucos minutos que luta.' },
        { label: 'Precisao de Strikes (%)', valueA: 52, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 5.20, valueB: 3.80, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'McKinney tambem ABSORVE muito. Trocacao aberta e caos.' },
        { label: 'Defesa de Strikes (%)', valueA: 42, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 3.50, valueB: 1.20, maxVal: 5, format: 'decimal', note: 'McKinney mistura wrestling com striking de forma explosiva.' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 65, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '31 anos', fighter2: '34 anos', note: 'McKinney mais jovem' },
        { label: 'Altura', fighter1: '1,78m (5\'10")', fighter2: '1,78m (5\'10")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '183cm (72")', fighter2: '183cm (72")', note: 'Mesmo reach' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Finish Rate', fighter1: '100% (25/25)', fighter2: '52% (8/15)', note: 'McKinney NUNCA foi a decisao em vitoria ou derrota' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Explosividade/Velocidade', valueA: 92, valueB: 58, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney e um dos lutadores mais explosivos do UFC. 7 segundos pra nocautear Frevola. 55 segundos pra submeter Borshchev.' },
        { label: 'Durabilidade', valueA: 40, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'McKinney tem 8 derrotas por finalizacao. Nelson e muito mais duro e sobrevive em lutas longas.' },
        { label: 'Wrestling', valueA: 72, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney media 3.50 TDs/15min. Mistura wrestling com striking de forma cacotica.' },
        { label: 'Striking Tecnico', valueA: 60, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'McKinney e cacotico. Nelson e mais tecnico. Niveis similares mas estilos opostos.' },
        { label: 'Jiu-Jitsu', valueA: 65, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney tem 8 submissoes na carreira. Guilhotina, kimura, mata-leao. Perigoso no chao.' },
        { label: 'Fight IQ', valueA: 40, valueB: 68, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'McKinney e imprudente. Nelson e calculado. Se Nelson sobreviver a explosao inicial, a inteligencia pode prevalecer.' },
      ],
      insight: 'McKinney e mais explosivo, mais rapido, e mais perigoso nos primeiros minutos. Nelson e mais duro, mais inteligente, e mais consistente. A luta se resume a: McKinney finaliza rapido ou Nelson sobrevive e capitaliza?',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'McKinney', ko_tko: { count: 9, percent: 53 }, submission: { count: 8, percent: 47 }, decision: { count: 0, percent: 0 }, total_wins: 17 },
      fighter2: { nome: 'Nelson', ko_tko: { count: 8, percent: 47 }, submission: { count: 0, percent: 0 }, decision: { count: 9, percent: 53 }, total_wins: 17 },
      insight: 'Opostos perfeitos. McKinney: 53% KO + 47% sub + 0% decisao. Nelson: 47% KO + 0% sub + 53% decisao. McKinney PRECISA finalizar. Nelson pode ganhar de qualquer forma. Se a luta for longa, Nelson domina.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1 (0-2min)', danger_level: 9, danger_label: 'VANTAGEM MCKINNEY', color: 'red', title: 'A Explosao', description: 'Os primeiros 2 minutos sao onde McKinney e LETAL. KO de 7 segundos, sub de 55 segundos. Se Nelson sobreviver os primeiros 120 segundos, ja e uma vitoria.' },
        { rounds: 'R1 (2-5min)', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'A Transicao', description: 'Se McKinney nao finalizou nos primeiros 2 minutos, o gas comeca a baixar. Nelson e mais duro e pode comecar a encontrar o ritmo.' },
        { rounds: 'R2-R3', danger_level: 3, danger_label: 'VANTAGEM NELSON', color: 'green', title: 'O Territorio do Monster', description: 'Se chegar ao R2, Nelson esta no controle. McKinney tem 8 derrotas por finalizacao quando a explosao nao funciona. Nelson e calculado e duro nos rounds finais.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: '100% Finish Rate', fighter: 'McKinney', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '25 lutas, 25 finishes. O dado mais impressionante do card inteiro. Nenhum outro lutador ativo tem isso.' },
        { icon: 'AlertTriangle', title: '8 Derrotas por Finalizacao', fighter: 'McKinney', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'A outra face: todas as 8 derrotas foram por finalizacao. Quando o plano A falha, McKinney nao tem plano B.' },
        { icon: 'Shield', title: 'Dureza e Consistencia', fighter: 'Nelson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Nelson e duro. 4 de 5 recentes. Sabe competir em lutas apertadas e quase nunca e finalizado.' },
        { icon: 'Brain', title: 'Oponente Comum: Frevola', fighter: 'Ambos', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'McKinney nocauteou Frevola em 7s. Nelson venceu por decisao. A diferenca de abordagem define o matchup.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'McKinney',
        total_probability: 55,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 30, method: 'KO/TKO R1', description: 'McKinney entra explosivo, conecta nos primeiros 2 minutos, e encerra. O cenario mais provavel e mais dramatico.' },
          { name: 'Submissao Rapida', probability: 15, method: 'Sub R1', description: 'McKinney mistura wrestling com entrada de guilhotina ou kimura. Sub em menos de 2 minutos.' },
          { name: 'Dominio Fisico', probability: 10, method: 'TKO R1-R2', description: 'McKinney domina com wrestling e ground and pound. Nelson nao consegue se levantar.' },
        ],
      },
      fighter2: {
        nome: 'Nelson',
        total_probability: 43,
        scenarios: [
          { name: 'Sobrevive e Capitaliza', probability: 22, method: 'Decisao Unanime', description: 'Nelson sobrevive a explosao do R1, McKinney cansa, e Nelson domina nos pontos no R2-R3.' },
          { name: 'Nocaute de Contragolpe', probability: 12, method: 'KO/TKO R2', description: 'McKinney entra imprudente e Nelson encontra o contragolpe perfeito. Nelson tem 8 KOs na carreira.' },
          { name: 'Submissao Tardia', probability: 9, method: 'Sub R2-R3', description: 'McKinney cansa e Nelson encontra uma abertura no chao. McKinney e vulneravel quando fadiga.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Terrance McKinney',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'McKinney e mais explosivo, mais rapido, e tem o dado mais impressionante do card: 100% finish rate em 25 lutas. Nelson e duro mas nunca enfrentou alguem com essa velocidade. A previsao e que McKinney finaliza no R1. Mas a confianca e MEDIA porque McKinney tem 8 derrotas por finalizacao. E uma espada de dois gumes. Se Nelson sobreviver os primeiros 2 minutos, tudo muda.',
      x_factor: {
        title: 'Os Primeiros 120 Segundos',
        description: 'Essa luta provavelmente vai ser decidida nos primeiros 2 minutos. Se McKinney nao finalizou, o momentum muda pro Nelson. Se finalizou, e mais um highlight reel.',
      },
      upset_alert: {
        title: 'McKinney Tem 8 Derrotas por Finish',
        description: 'Todas as 8 derrotas de McKinney foram por finalizacao. Ele e vulneravel quando a explosao nao funciona. Nelson e duro e inteligente o suficiente pra capitalizar.',
      },
      probabilities: {
        fighter1: { nome: 'McKinney', percent: 55 },
        fighter2: { nome: 'Nelson', percent: 43 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'McKinney (-200)', reasoning: 'Favorito justo pela explosividade. Mas -200 nao oferece muito valor dado as 8 derrotas.' },
        method: { pick: 'Under 1.5 Rounds', reasoning: 'McKinney tem 0 decisoes em 25 lutas. A luta VAI acabar cedo. Under 1.5 e a aposta mais logica do card.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: '100% finish rate. Essa luta nao vai pros juizes. A pergunta e QUEM finaliza, nao SE alguem finaliza.' },
        best_value: 'Under 1.5 Rounds e a melhor aposta dessa luta. McKinney tem 0 decisoes em 25 lutas. Nao existe cenario onde isso vai a distancia.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os primeiros 120 segundos', icon: 'Zap', description: 'Se McKinney nao finalizou em 2 minutos, a dinamica muda completamente. Observe o gas e a postura dele apos o rush inicial.' },
        { num: 2, title: 'Nelson no R1', icon: 'Shield', description: 'Se Nelson sobreviver o R1 sem ser abalado, esta em vantagem. Observe se ele mantem compostura ou entra em panico.' },
        { num: 3, title: 'Takedowns de McKinney', icon: 'Target', description: 'McKinney mistura wrestling com striking. Se levar ao chao cedo, pode buscar submissao. Se Nelson defender, McKinney gasta energia.' },
        { num: 4, title: 'O contragolpe de Nelson', icon: 'Brain', description: 'McKinney entra imprudente. Nelson e mais tecnico. Um contragolpe limpo quando McKinney avanca pode mudar tudo.' },
        { num: 5, title: 'Algum dos dois vai pros juizes?', icon: 'Activity', description: 'A pergunta mais interessante: McKinney tem 0 decisoes em 25 lutas. Se essa luta for pros cartoes, sera a primeira vez na carreira. Historicamente impossivel.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: '100% FINISH RATE', content: 'MCKINNEY vs NELSON\nUFC Seattle | Peso Leve\n\n25 lutas. 25 finishes.\nZERO decisoes.\n\nContra Nelson: 4 de 5 no UFC.\nDuro, consistente, inteligente.\n\nExplosao vs Dureza.', color: 'red' },
        { slide_number: 2, title: 'OS NUMEROS LOUCOS', content: '7 SEGUNDOS: KO no debut (vs Frevola)\n55 SEGUNDOS: Sub de Borshchev\n0 DECISOES: em 25 lutas\n100%: finish rate\n\nMas tambem:\n8 DERROTAS por finalizacao.\nEspada de dois gumes.', color: 'red' },
        { slide_number: 3, title: 'OPONENTE COMUM', content: 'MATT FREVOLA\n\nMcKinney: KO em 7 SEGUNDOS\nNelson: Decisao Unanime\n\nMesmo adversario.\nAbordagens completamente opostas.\nIsso resume o matchup.', color: 'gold' },
        { slide_number: 4, title: 'PREVISAO', content: 'MCKINNEY por KO/TKO R1\n\nConfianca: MEDIA\n55% McKinney / 43% Nelson\n\nMas se Nelson sobreviver 2 minutos,\ntudo muda.\n\nMelhor aposta: Under 1.5 Rounds', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'McKinney vs Nelson e a luta mais previsivel E imprevisivel do card. McKinney tem 100% finish rate em 25 lutas. ZERO decisoes. Mas tambem 8 derrotas por finalizacao. Vai acabar rapido. A questao e: quem finaliza?' },
        { num: '2/4', text: 'Oponente comum: Matt Frevola. McKinney nocauteou em 7 SEGUNDOS. Nelson venceu por decisao. A diferenca de abordagem e a narrativa completa desse matchup.' },
        { num: '3/4', text: 'Se Nelson sobreviver os primeiros 2 minutos, ganha. Se McKinney conectar algo nos primeiros 2 minutos, acaba. Simples assim.' },
        { num: '4/4', text: 'Pick: McKinney KO R1. Melhor aposta: Under 1.5 rounds. Essa luta NAO vai pros juizes. 100% finish rate nao mente.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '25 lutas. 25 finishes. Zero scorecards. Terrance McKinney nunca na vida dele ouviu "vamos aos juizes." E no sabado enfrenta o Monster.' },
        { time: '10-25s', title: 'Os Dados', text: '7 segundos pra nocautear Frevola. 55 segundos pra submeter Borshchev. Mas tambem 8 derrotas por finalizacao. McKinney e uma espada de dois gumes.' },
        { time: '25-40s', title: 'Nelson', text: 'Nelson e o oposto: consistente, duro, 4 de 5 no UFC. Nao e explosivo mas sabe sobreviver. Se aguentar 2 minutos, vira o jogo.' },
        { time: '40-50s', title: 'Previsao', text: 'McKinney KO no R1. Mas Under 1.5 rounds e a aposta real. Nao vai pros juizes.' },
      ],
      tiktok: [
        { hook: 'Esse cara NUNCA ouviu "vamos aos juizes" em 25 lutas.', body: 'Terrance McKinney. 25 lutas profissionais. 25 finalizacoes. ZERO decisoes. Nocauteou Frevola em 7 SEGUNDOS. Submeteu Borshchev em 55 segundos. Mas tambem perdeu 8 vezes por finalizacao. Espada de dois gumes. No sabado enfrenta Nelson que venceu 4 de 5 e e DURO. Se sobreviver 2 minutos, vira o jogo.', cta: 'Quem finaliza quem? Comenta!' },
      ],
      headlines: [
        'McKinney vs Nelson: 100% Finish Rate Encontra o Monster Canadense',
        '25 Lutas, 25 Finishes, 0 Scorecards: A Estatistica Mais Louca do UFC',
        'Oponente Comum: McKinney KO em 7s vs Nelson por Decisao sobre Frevola',
        'O Homem que Nao Sabe o Que E Scorecard Enfrenta Seu Maior Teste',
        'UFC Seattle: A Luta que NAO Vai Pros Juizes',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-200',
        fighter2_odds: '+170',
        fighter1_name: 'Terrance McKinney',
        fighter2_name: 'Kyle Nelson',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: '100% Finish Rate', stat_headline: '25 LUTAS, 25 FINALIZACOES, 0 DECISOES', contexto: 'Nenhum outro lutador ativo no UFC tem esse numero. A luta VAI acabar antes dos juizes.', implicacao_aposta: 'Under 1.5 rounds e a aposta mais logica. Under 2.5 e quase certo.', edge_level: 'forte', fighter_side: 'neutral' },
        { icon: 'Target', titulo: 'Explosividade de McKinney', stat_headline: '5.80 SLPM, 3.50 TDS/15MIN, 52% PRECISAO', contexto: 'McKinney e uma metralhadora nos primeiros minutos. Volume e velocidade absurdos.', implicacao_aposta: 'Favorece McKinney por finish rapido. R1 e o alvo.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Dureza de Nelson', stat_headline: '4 DE 5 NO UFC, RARAMENTE FINALIZADO', contexto: 'Nelson e duro e consistente. Se sobreviver a explosao, McKinney nao tem plano B.', implicacao_aposta: 'Nelson ML a +170 tem valor se voce acredita que ele sobrevive o R1.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: '8 Derrotas de McKinney por Finish', stat_headline: 'TODAS AS 8 DERROTAS FORAM POR FINALIZACAO (KO OU SUB)', contexto: 'McKinney e vulneravel quando a explosao falha. Se Nelson sobreviver e pressionar, pode finalizar.', implicacao_aposta: 'Nelson por finish no R2+ tem valor como longshot.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '+100', confianca: 'alta', raciocinio: 'McKinney tem 0 decisoes em 25 lutas. A probabilidade de ir alem do R1 e baixa. Essa e a aposta mais logica da noite.' },
        { tipo: 'Metodo', pick: 'McKinney por KO/TKO R1', odds: '+120', confianca: 'media', raciocinio: '53% das vitorias de McKinney por KO. A explosividade no R1 e a arma principal.' },
        { tipo: 'Moneyline', pick: 'Nelson (+170)', odds: '+170', confianca: 'baixa', edge_vs_mercado: 'Se voce acredita que Nelson sobrevive 2 minutos, +170 e excelente valor. McKinney tem 8 derrotas quando o finish nao vem.', raciocinio: 'Nelson e duro e inteligente. Se sobreviver a explosao, o momentum muda.' },
      ],
      armadilha: {
        titulo: 'Armadilha: McKinney por Decisao',
        descricao: 'McKinney tem ZERO decisoes em 25 lutas profissionais. Apostar em McKinney por decisao e apostar em algo que literalmente nunca aconteceu na carreira dele.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
