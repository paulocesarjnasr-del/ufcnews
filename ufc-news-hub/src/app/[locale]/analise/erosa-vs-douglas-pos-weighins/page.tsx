import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'erosa-vs-douglas-pos-weighins',
  evento_id: null,
  slug: 'erosa-vs-douglas-pos-weighins',
  titulo: 'Erosa vs Douglas: Pos Weigh-Ins | O Veterano da Casa e o Debutante Confiante',
  subtitulo: 'Erosa com a torcida de Seattle na pesagem. Douglas confiante alem do esperado pra um debutante. Ambos em 145.',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,80m', envergadura: '190cm', idade: 34, academia: 'Xtreme Couture, Yakima' },
      fighter2: { altura: '1,78m', envergadura: '183cm', idade: 30, academia: 'Bloodline Combat Sports, Huntington Beach' },
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
      { factor: 'Experiencia UFC', edge: 'fighter1', impact: 8, description: 'Erosa tem 17 lutas UFC. Douglas faz o debut.' },
      { factor: 'Luta em casa', edge: 'fighter1', impact: 7, description: 'Erosa de Seattle. Na pesagem, a torcida ja estava empurrando.' },
      { factor: 'Confianca de Douglas', edge: 'fighter2', impact: 6, description: 'Douglas pareceu surpreendentemente confiante pra um debutante. Isso pode ser positivo ou hubris.' },
    ],
    xFactor: {
      title: 'Douglas Mais Confiante Que o Esperado',
      description: 'Pra um debutante, Douglas pareceu excessivamente confiante na pesagem. Isso pode ser a preparacao de Cub Swanson ou pode ser ingenuidade. A resposta vem no R1.',
    },
  },
  fighter1_info: {
    nome: 'Julian Erosa',
    record: '31-13-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Melquizael Costa', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Darren Elkins', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Christian Rodriguez', method: 'Sub R1', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Lerryan Douglas',
    record: '13-5-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Cam Teague', method: 'KO R1 (0:36)', event: 'DWCS' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Pena (145 lbs)',
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
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Pos Weigh-Ins: Veterano da Casa vs Debutante Confiante',
      tagline_sub: 'Erosa com a torcida de Seattle. Douglas surpreendentemente confiante pra um debutante. Ambos em 145. FOTN potential.',
      fighter1: {
        nome_completo: 'Julian "Juicy J" Erosa',
        apelido: 'Juicy J',
        sobrenome: 'Erosa',
        record: '31-13-0',
        ranking: 'N/R Peso Pena',
        info_extra: 'Seattle/Yakima, Washington | 34 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2026-03/EROSA_JULIAN_L_03-28.png?itok=mSlDuCCd',
      },
      fighter2: {
        nome_completo: 'Lerryan "Gunslinger" Douglas',
        apelido: 'Gunslinger',
        sobrenome: 'Douglas',
        record: '13-5-0',
        ranking: 'N/R Peso Pena',
        info_extra: 'Huntington Beach, CA | Bloodline Combat Sports (Cub Swanson) | 30 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-09/DOUGLAS_LERRYAN_R_09-09.png?itok=oQ15ZOce',
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
                Ambos bateram 145 sem problemas. <strong class="text-ufc-red">Erosa</strong> pesou com a torcida de Seattle ja comecando a gritando o nome dele. O fator casa e REAL. A energia do publico na pesagem era de evento principal, nao de main card. Seattle ama Julian Erosa. <strong class="text-blue-400">Douglas</strong> surpreendeu: parecia confiante DEMAIS pra um debutante. Sorrindo, relaxado, nenhum sinal de nervosismo. Pode ser a preparacao mental de Cub Swanson (que ja fez isso centenas de vezes) ou pode ser inexperiencia disfarçada de confianca. No face off, Douglas manteve contato visual firme. Erosa sorriu de volta. O tom e de respeito mas tambem de "eu sei algo que voce nao sabe."
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-ufc-red/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-ufc-red"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ufc-red mb-2">Erosa na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">EM CASA</p>
                <p class="text-xs text-white/50 leading-relaxed">A torcida de Seattle gritando o nome. Erosa nasceu aqui. 17 lutas UFC. Sabe exatamente o que vai enfrentar. O sorriso e o de quem esta confortavel. O fator casa e concreto.</p>
              </div>
            </div>
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/15 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 h-1 bg-blue-400"></div>
              <div class="relative p-5">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">Douglas na Pesagem</p>
                <p class="font-display text-lg text-white mb-2">SURPREENDENTEMENTE CONFIANTE</p>
                <p class="text-xs text-white/50 leading-relaxed">Pra um debutante, a confianca era inesperada. Sorrindo, relaxado, contato visual firme. Cub Swanson no corner pode ser o fator. Ou pode ser ingenuidade de quem nao sabe o que o octogono realmente e.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <h3 class="font-display text-2xl md:text-3xl uppercase mb-8">
            <span class="bg-gradient-to-r from-ufc-red to-red-400 bg-clip-text text-transparent">Juicy J em Casa</span>
          </h3>
          <div class="relative rounded-xl overflow-hidden mb-6">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ufc-red to-ufc-red/20 rounded-full"></div>
            <div class="relative p-6 pl-8">
              <p class="text-sm text-white/55 leading-[1.8]">
                <strong class="text-ufc-red">Julian Erosa</strong> nasceu em Seattle e cresceu em Yakima. O Climate Pledge Arena e o quintal dele. Com 31-13 e 8-4 no seu terceiro stint no UFC, Erosa e um veterano que sabe exatamente como funciona o octogono. Na pesagem, com a torcida empurrando, Erosa parecia no melhor momento possivel pra essa luta. <strong class="text-blue-400">Douglas</strong> traz 5 KOs consecutivos e a confianca de quem treina com Cub Swanson. Mas o debut UFC e contra um veterano em casa. A confianca da pesagem vai ser testada pela realidade do octogono.
              </p>
            </div>
          </div>
        </div>
      `,
      stakes: [
        { dimensao: 'Contexto', fighter1: 'Veterano em casa com torcida', fighter2: 'Debutante confiante com Cub Swanson' },
        { dimensao: 'Experiencia', fighter1: '17 lutas UFC, 8-4 no stint', fighter2: 'Debut UFC, 5 KOs seguidos' },
        { dimensao: 'Pesagem', fighter1: 'Confortavel, torcida empurrando', fighter2: 'Surpreendentemente confiante' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'JUICY J DOMINA EM CASA',
          subtitulo: 'Erosa usa a experiencia, a torcida e o grappling pra controlar o debutante',
          consequencias: [
            { tag: 'SEQUENCIA', texto: 'Erosa volta a vencer em casa e se consolida como gatekeeper premium.' },
          ],
          proxima_luta: 'Erosa vs oponente ranqueado',
        },
        fighter2_vence: {
          titulo: 'O GUNSLINGER SILENCIA SEATTLE',
          subtitulo: 'Douglas prova que a confianca da pesagem era real e nocauteia Erosa no debut',
          consequencias: [
            { tag: 'IMPACTO', texto: 'Debut com KO sobre veterano em casa. Douglas entra no radar da divisao.' },
          ],
          proxima_luta: 'Douglas vs prospect do peso-pena',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Julian Erosa',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu por decisao mas rendeu FOTN.' },
          { date: 'Abr 2025', opponent: 'Darren Elkins', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Terceiro finish no R1 seguido.' },
          { date: 'Dez 2024', opponent: 'Christian Rodriguez', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Submissao rapida.' },
          { date: 'Out 2024', opponent: 'Ricardo Ramos', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Comeco da sequencia.' },
        ],
        full_fight_history: [
          { date: 'Jun 2020', opponent: 'Sean Woodson', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Retorno ao UFC' },
          { date: 'Fev 2021', opponent: 'Nate Landwehr', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finish rapido' },
          { date: 'Set 2021', opponent: 'Charles Jourdain', result: 'W', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sub tardia' },
          { date: 'Dez 2022', opponent: 'Alex Caceres', result: 'L', method: 'TKO R1', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocauteado' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Erosa em casa em Seattle com a torcida empurrando. 3 finishes no R1 seguidos antes da derrota FOTN contra Costa. A energia na pesagem era de quem esta em casa e confortavel.',
      },
      fighter2: {
        nome: 'Lerryan Douglas',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Ruim', note: 'KO de 36 segundos no DWCS. Ganhou contrato UFC.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Cam Teague', result: 'W', method: 'KO R1 (0:36)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Douglas surpreendentemente confiante na pesagem pra um debutante. 5 KOs seguidos. Treina com Cub Swanson. A confianca pode ser real ou pode ser inexperiencia. O debut dira.',
      },
    },

    nivel_competicao: {
      fighter1: { nome: 'Erosa', media_oponentes: 2, media_oponentes_label: 'Medio', aproveitamento: '8W-4L (67%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Douglas', media_oponentes: 1, media_oponentes_label: 'Ruim', aproveitamento: 'Debut UFC', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. A diferenca de experiencia e massiva: 17 lutas UFC vs debut.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.80, valueB: 0, maxVal: 6, format: 'decimal', note: 'Douglas sem dados UFC.' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.20, valueB: 0, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 1.50, valueB: 0, maxVal: 3, format: 'decimal' },
        { label: 'Defesa de Takedown (%)', valueA: 65, valueB: 0, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '34 anos', fighter2: '30 anos', note: 'Douglas 4 anos mais novo' },
        { label: 'Altura', fighter1: '1,80m (5\'11")', fighter2: '1,78m (5\'10")', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '190cm (75")', fighter2: '183cm (72")', note: 'Erosa com 3 polegadas a mais' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Treinador', fighter1: 'Xtreme Couture / Yakima', fighter2: 'Cub Swanson / Bloodline', note: 'Douglas treina com Hall of Famer' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking', valueA: 70, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Erosa volume, Douglas poder. Ambos pareceram bem na pesagem.' },
        { label: 'Poder de KO', valueA: 62, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Douglas com 5 KOs consecutivos e confianca da pesagem. O poder e real.' },
        { label: 'Grappling', valueA: 68, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Erosa tem 13 subs. Douglas e striker puro.' },
        { label: 'Experiencia UFC', valueA: 85, valueB: 20, labelA: 'Excelente', labelB: 'Ruim', advantage: 'fighter1', advantage_note: '17 lutas vs debut. A confianca de Douglas e boa mas experiencia e experiencia.' },
        { label: 'Cardio', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Erosa lutou 3 rounds varias vezes. Douglas tende a acabar rapido.' },
        { label: 'Fator Casa + Confianca', valueA: 82, valueB: 72, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Erosa com torcida de Seattle. Douglas confiante mas longe de casa.' },
      ],
      insight: 'A pesagem confirmou: Erosa confortavel em casa, Douglas mais confiante que o esperado. A dinamica nao muda: experiencia vs poder. Mas a confianca de Douglas pode significar que ele nao vai ter o nervosismo tipico de debut.',
    },

    distribuicao_vitorias: {
      fighter1: { nome: 'Erosa', ko_tko: { count: 12, percent: 39 }, submission: { count: 13, percent: 42 }, decision: { count: 6, percent: 19 }, total_wins: 31 },
      fighter2: { nome: 'Douglas', ko_tko: { count: 10, percent: 77 }, submission: { count: 1, percent: 8 }, decision: { count: 2, percent: 15 }, total_wins: 13 },
      insight: 'Erosa versatil (39% KO + 42% sub). Douglas nocauteador puro (77% KO). A pesagem nao muda os perfis.',
    },

    danger_zones: {
      zones: [
        { rounds: 'R1 (0-2min)', danger_level: 7, danger_label: 'VANTAGEM DOUGLAS', color: 'green', title: 'O Flash KO', description: 'Douglas confiante na pesagem pode significar que vai entrar agressivo. Os primeiros 2 minutos sao a janela dele. Poder real + confianca = perigo.' },
        { rounds: 'R1 (2min+)', danger_level: 5, danger_label: 'EQUILIBRADO', color: 'gold', title: 'A Adaptacao', description: 'Se Erosa sobreviver, a experiencia comeca a pesar. Se a confianca de Douglas era real, ele continua perigoso. Se era hubris, comeca a cair.' },
        { rounds: 'R2-R3', danger_level: 4, danger_label: 'VANTAGEM EROSA', color: 'red', title: 'O Veterano', description: 'Se chegar ao R2, Erosa esta no controle. 17 lutas UFC. Torcida de Seattle. A confianca de Douglas pode virar frustacao.' },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Torcida de Seattle na Pesagem', fighter: 'Erosa', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'A torcida ja estava gritando o nome de Erosa na pesagem. O fator casa e concreto e visivel.' },
        { icon: 'Zap', title: '5 KOs + Confianca de Douglas', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Douglas surpreendentemente confiante na pesagem. Se isso for a preparacao de Cub Swanson, e um bom sinal. Se for ingenuidade, pode ser perigoso.' },
        { icon: 'Brain', title: 'Cub Swanson no Corner', fighter: 'Douglas', risk_level: 'POSITIVO', risk_color: 'green', description: 'Hall of Famer como treinador. A confianca de Douglas pode vir da preparacao de elite.' },
        { icon: 'AlertTriangle', title: 'Debut no UFC com Torcida Contra', fighter: 'Douglas', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Douglas debutando contra um veterano COM a torcida. A confianca da pesagem vai ser testada quando Seattle inteira estiver gritando contra ele.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Erosa',
        total_probability: 58,
        scenarios: [
          { name: 'Experiencia e Versatilidade', probability: 25, method: 'Decisao Unanime', description: 'Erosa usa a experiencia pra neutralizar Douglas e vencer nos pontos com a torcida empurrando.' },
          { name: 'Submissao', probability: 18, method: 'Sub R1-R2', description: 'Douglas entra confiante, Erosa encontra uma abertura no chao. 13 subs na carreira.' },
          { name: 'TKO de Volume', probability: 15, method: 'TKO R2-R3', description: 'Erosa acumula dano com volume e finaliza quando Douglas cansa.' },
        ],
      },
      fighter2: {
        nome: 'Douglas',
        total_probability: 40,
        scenarios: [
          { name: 'Nocaute Confiante', probability: 24, method: 'KO/TKO R1', description: 'Douglas com a confianca da pesagem entra agressivo e conecta. A confianca se traduz em certeza nos golpes.' },
          { name: 'Volume e Pressao', probability: 9, method: 'Decisao', description: 'Douglas usa a confianca pra manter pressao por 3 rounds.' },
          { name: 'TKO por Acumulo', probability: 7, method: 'TKO R2', description: 'Douglas machuca no R1 e finaliza no R2.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Julian Erosa',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'A pesagem trouxe um detalhe interessante: Douglas pareceu surpreendentemente confiante pra um debutante. Isso pode ser a preparacao de Cub Swanson ou pode ser ingenuidade. A previsao se mantem: Erosa por decisao usando experiencia e fator casa. Mas a confianca de Douglas me deixa levemente mais atento ao risco de KO cedo. A probabilidade de Douglas subiu levemente (de 40% pra 42%) por causa da postura na pesagem, mas a experiencia de 17 lutas UFC contra um debutante em casa continua sendo o fator dominante.',
      x_factor: {
        title: 'A Confianca de Douglas e Real?',
        description: 'A questao central pos pesagem: a confianca de Douglas era preparacao mental de Cub Swanson ou ingenuidade de quem nao sabe o que o octogono realmente e? O R1 vai responder.',
      },
      upset_alert: {
        title: 'Douglas Confiante = Douglas Perigoso',
        description: 'Um debutante confiante com 5 KOs seguidos e Cub Swanson no corner nao e facil. Se a confianca da pesagem for real e se traduzir em certeza nos golpes, pode calar Seattle.',
      },
      probabilities: {
        fighter1: { nome: 'Erosa', percent: 56 },
        fighter2: { nome: 'Douglas', percent: 42 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Erosa (-170)', reasoning: 'Favorito justo pela experiencia e fator casa. Na pesagem, Erosa parecia confortavel. Preco justo.' },
        method: { pick: 'Luta nao vai a Decisao (+110)', reasoning: 'Erosa tem 81% finish rate. Douglas tem 77% KO. A confianca de Douglas pode acelerar o confronto.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Ambos finalizadores. Douglas confiante pode entrar agressivo. Erosa vinha de 3 finishes R1. Vai acabar cedo.' },
        best_value: 'Under 2.5 Rounds continua sendo a melhor aposta. A confianca de Douglas na pesagem pode significar que ele vai entrar agressivo, o que favorece um finish rapido de qualquer lado.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A confianca de Douglas no R1', icon: 'Brain', description: 'Douglas pareceu muito confiante na pesagem. Observe se isso se traduz em agressividade calculada ou imprudencia. A diferenca decide a luta.' },
        { num: 2, title: 'O grappling de Erosa', icon: 'Target', description: 'Erosa tem 13 subs. Se levar ao chao contra um Douglas confiante em pe, o jogo muda completamente.' },
        { num: 3, title: 'A torcida de Seattle', icon: 'MapPin', description: 'A torcida ja gritava na pesagem. No cage, vai ser ensurdecedor. Observe como Douglas reage a torcida hostil.' },
        { num: 4, title: 'Cub Swanson no corner', icon: 'Shield', description: 'Hall of Famer com experiencia invaluavel. Os ajustes de Swanson podem ser a diferenca se a confianca de Douglas for real.' },
        { num: 5, title: 'FOTN?', icon: 'Activity', description: 'Erosa faz FOTN em qualquer card. Douglas confiante + Erosa em casa = potencial FOTN altissimo.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'POS WEIGH-INS', content: 'EROSA vs DOUGLAS\nPOS PESAGEM\n\nErosa: confortavel em casa\nTorcida de Seattle empurrando\n\nDouglas: surpreendentemente\nconfiante pra um debutante\n\nFOTN potential.', color: 'red' },
        { slide_number: 2, title: 'PREVISAO MANTIDA', content: 'EROSA por Decisao\n\nConfianca: MEDIA\n56% Erosa / 42% Douglas\n\nA confianca de Douglas\ne intrigante mas experiencia\ne fator casa dominam.\n\nMelhor aposta: Under 2.5 Rounds', color: 'gold' },
      ],
      twitter: [
        { num: '1/3', text: 'POS WEIGH-INS: Erosa vs Douglas. Erosa com a torcida de Seattle ja gritando na pesagem. Douglas SURPREENDENTEMENTE confiante pra um debutante. A confianca e real ou ingenuidade?' },
        { num: '2/3', text: 'A confianca de Douglas me deixou atento. 5 KOs seguidos + Cub Swanson no corner + postura de veterano na pesagem. Se for real, pode ser perigoso. Se for hubris, Erosa capitaliza rapido.' },
        { num: '3/3', text: 'Pick se mantem: Erosa por decisao. Under 2.5 rounds. Ambos buscam o finish. A confianca de Douglas pode acelerar o confronto. FOTN potential altissimo.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'O debutante pesou e parecia um VETERANO. Sorrindo, confiante, sem nervosismo. Contra o cara que nasceu em Seattle e tem a torcida inteira.' },
        { time: '10-25s', title: 'Pesagem', text: 'Erosa com a torcida gritando. Douglas com confianca de quem treina com Cub Swanson. A questao: a confianca e real ou ingenuidade?' },
        { time: '25-35s', title: 'Pick', text: 'Erosa por decisao. Under 2.5. FOTN potential. Mas se Douglas for tao confiante quanto pareceu, pode calar Seattle.' },
      ],
      tiktok: [
        { hook: 'Esse DEBUTANTE pesou como se tivesse 50 lutas no UFC.', body: 'Lerryan Douglas. Debut no UFC. Contra Julian Erosa que NASCEU em Seattle com a torcida INTEIRA gritando. E Douglas na pesagem? Sorrindo. Confiante. Relaxado. Zero nervosismo. Treina com Cub Swanson, Hall of Famer. 5 KOs seguidos. A confianca e real ou ingenuidade? O R1 vai responder.', cta: 'Voce confia num debutante CONFIANTE? Comenta!' },
      ],
      headlines: [
        'Pos Weigh-Ins: Douglas Surpreendentemente Confiante Pro Debut',
        'Erosa em Casa Com Seattle Empurrando: O Veterano vs O Debutante',
        'A Confianca de Douglas e Preparacao de Cub Swanson ou Ingenuidade?',
        'FOTN Potential: Ambos Prontos Pro Finish no Peso-Pena',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-170',
        fighter2_odds: '+145',
        fighter1_name: 'Julian Erosa',
        fighter2_name: 'Lerryan Douglas',
        source: 'Media de casas de apostas pos weigh-ins (marco 2026)',
      },
      edges: [
        { icon: 'Brain', titulo: 'Experiencia UFC + Fator Casa', stat_headline: 'EROSA 17 LUTAS UFC + TORCIDA DE SEATTLE NA PESAGEM', contexto: 'A torcida ja gritava na pesagem. O fator casa e concreto. 17 lutas vs debut.', implicacao_aposta: 'Favorece Erosa em lutas longas. Se passar do R1, a experiencia domina.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Douglas Confiante + 5 KOs', stat_headline: 'SURPREENDENTEMENTE CONFIANTE NA PESAGEM. 5 KOS SEGUIDOS.', contexto: 'A postura de Douglas na pesagem surpreendeu. Se for real, o poder combinado com confianca e perigoso.', implicacao_aposta: 'Douglas por KO R1 tem mais valor pos pesagem. A confianca pode significar agressividade calculada.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Cub Swanson no Corner', stat_headline: 'HALL OF FAMER PREPAROU DOUGLAS', contexto: 'A confianca de Douglas pode vir da preparacao de Swanson. Se for o caso, e um sinal muito positivo.', implicacao_aposta: 'Aumenta levemente o valor de Douglas ML.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '+100', confianca: 'media', raciocinio: 'Erosa vinha de 3 finishes R1. Douglas 77% KO. A confianca de Douglas pode acelerar o confronto. Vai acabar cedo.' },
        { tipo: 'Moneyline', pick: 'Douglas (+145)', odds: '+145', confianca: 'baixa', edge_vs_mercado: 'A confianca na pesagem sobe levemente o valor de Douglas. Se for real + 5 KOs + Cub Swanson, +145 tem valor.', raciocinio: 'Debutante confiante com poder e coach de elite. Risco alto mas o retorno justifica.' },
        { tipo: 'Prop', pick: 'FOTN Bonus', odds: '+300', confianca: 'media', raciocinio: 'Erosa faz FOTN em qualquer card. Douglas confiante e agressivo. A combinacao e perfeita pra FOTN.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Douglas por Decisao',
        descricao: 'Douglas tem apenas 15% das vitorias por decisao (2 em 13). Ou nocauteia ou nao. A confianca da pesagem aponta pra KO, nao decisao.',
      },
      disclaimer: 'Analise pos weigh-ins para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
