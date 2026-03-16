import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'dolidze-vs-duncan',
  evento_id: null,
  slug: 'dolidze-vs-duncan',
  titulo: 'Dolidze vs Duncan: O Georgiano Veterano Contra o Britanico em Ascensao',
  subtitulo: 'O ex-top 10 do peso-medio busca voltar ao topo enquanto CLD quer confirmar sua sequencia de nocautes',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,88m', envergadura: '193cm', idade: 37, academia: 'Georgia' },
      fighter2: { altura: '1,88m', envergadura: '201cm', idade: 30, academia: 'Team KF, Inglaterra' },
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
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Roman Dolidze',
    record: '15-4-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Anthony Hernandez', method: 'Submissao R4', event: 'UFC on ESPN 72' },
      { result: 'W', opponent: 'Marvin Vettori', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Kevin Holland', method: 'KO R1', event: 'UFC 307' },
    ],
  },
  fighter2_info: {
    nome: 'Christian Leroy Duncan',
    record: '13-2-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Marco Tulio Silva', method: 'KO R2', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Eryk Anders', method: 'KO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Andrey Pulyaev', method: 'Decisao Unanime', event: 'UFC London' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
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
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: '21 de Marco, 2026',
      evento_local: 'The O2 Arena, Londres, Reino Unido',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Caucasiano Contra o Britanico em Ascensao',
      tagline_sub: 'Teste de fogo no peso-medio com dois finalizadores perigosos buscando resultados opostos',
      fighter1: {
        nome_completo: 'Roman "The Caucasian" Dolidze',
        apelido: 'The Caucasian',
        sobrenome: 'Dolidze',
        record: '15-4-0',
        ranking: 'N/R Peso-Medio',
        info_extra: 'Tbilisi, Georgia | 37 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Christian Leroy Duncan',
        apelido: 'CLD',
        sobrenome: 'Duncan',
        record: '13-2-0',
        ranking: 'N/R Peso-Medio',
        info_extra: 'Cheltenham, Inglaterra | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Veterano Buscando Redencao</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Roman Dolidze</strong> e um caso interessante no peso-medio. O georgiano de 37 anos ja provou que pode competir com a elite: nocauteou Kevin Holland, venceu Marvin Vettori por decisao, e bateu Anthony Smith. Mas a inconsistencia e sua marca: entre essas vitorias, perdeu para Nassourdine Imavov e foi finalizado por Anthony Hernandez no quarto round. Com 15-4, Dolidze e perigoso mas irregular.
        </p>
        <p class="mb-4">
          A derrota para Hernandez em agosto de 2025 foi particularmente dolorosa: Dolidze estava na luta principal e foi submetido no quarto round, mostrando que quando a luta vai para o cardio tardio, ele pode ter problemas. Agora, aos 37 anos, a pressao para voltar aos trilhos e imensa.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">CLD: O Britanico Que Ninguem Quer Enfrentar</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Christian Leroy Duncan</strong> esta vivendo o melhor momento da carreira. Tres vitorias consecutivas, duas por nocaute no primeiro e segundo round, provam que CLD encontrou seu ritmo no UFC. Com 30 anos, 1,88m e envergadura de 2,01m, ele tem as ferramentas fisicas para dominar no peso-medio. A unica derrota no UFC foi para Gregory Rodrigues em julho de 2024, e desde entao ele nao parou de evoluir.
        </p>
        <p class="mb-4">
          Lutando em casa em Londres, Duncan quer usar essa plataforma para se lancar ao ranking do peso-medio. Vencer Dolidze, um veterano que ja derrotou nomes como Vettori e Holland, seria a declaracao perfeita. E a torcida britanica vai estar totalmente do lado dele.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (ex-top 10)', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: 'Vem de derrota', fighter2: '3 vitorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Voltar ao ranking do peso-medio', fighter2: 'Entrar no ranking pela primeira vez' },
        { dimensao: 'Risco', fighter1: '2 derrotas nas ultimas 3 lutas', fighter2: 'Perder momentum contra veterano' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O CAUCASIANO RESISTE',
          subtitulo: 'Dolidze usa a experiencia e o wrestling para neutralizar Duncan',
          consequencias: [
            { tag: 'RANKING', texto: 'Dolidze volta ao radar do ranking com vitoria sobre prospect em ascensao' },
            { tag: 'PROXIMA', texto: 'Luta contra oponente ranqueado do top 10-15 do peso-medio' },
          ],
          proxima_luta: 'Dolidze vs oponente ranqueado do peso-medio',
        },
        fighter2_vence: {
          titulo: 'CLD CONQUISTA LONDRES',
          subtitulo: 'Duncan nocauteia Dolidze em casa e se lanca ao ranking',
          consequencias: [
            { tag: 'RANKING', texto: 'Duncan entra no top 15 do peso-medio com quatro vitorias consecutivas' },
            { tag: 'PROXIMA', texto: 'Luta contra nome estabelecido do top 10 no proximo card britanico' },
          ],
          proxima_luta: 'Duncan vs oponente ranqueado do top 10',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Roman Dolidze',
        color: 'red',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Anthony Hernandez', result: 'L', method: 'Submissao R4 (RNC)', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado no quarto round por rear-naked choke. Perdeu na luta principal apos estar competitivo.' },
          { date: 'Mar 2025', opponent: 'Marvin Vettori', result: 'W', method: 'Decisao Unanime', opponent_rank: '#10 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Vitoria por decisao unanime sobre Vettori em 5 rounds na luta principal. Performance de maturidade.' },
          { date: 'Out 2024', opponent: 'Kevin Holland', result: 'W', method: 'KO R1', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Bom', note: 'Nocaute no primeiro round sobre Holland. Performance explosiva e eficiente.' },
          { date: 'Jun 2024', opponent: 'Anthony Smith', result: 'W', method: 'Decisao Unanime', opponent_rank: '#12 MW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria por decisao sobre o veterano Smith em luta de 3 rounds.' },
          { date: 'Fev 2024', opponent: 'Nassourdine Imavov', result: 'L', method: 'Decisao Majoritaria', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota apertada para Imavov na luta principal. Luta competitiva ate o final.' },
        ],
        full_fight_history: [
          { date: 'Fev 2024', opponent: 'Nassourdine Imavov', result: 'L', method: 'MD', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota apertada' },
          { date: 'Jun 2024', opponent: 'Anthony Smith', result: 'W', method: 'UD', opponent_rank: '#12 MW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria por decisao' },
          { date: 'Out 2024', opponent: 'Kevin Holland', result: 'W', method: 'KO R1', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Bom', note: 'KO no R1' },
          { date: 'Mar 2025', opponent: 'Marvin Vettori', result: 'W', method: 'UD', opponent_rank: '#10 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Decisao em 5 rounds' },
          { date: 'Ago 2025', opponent: 'Anthony Hernandez', result: 'L', method: 'Sub R4', opponent_rank: '#10 MW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado no R4' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'resilient',
        momentum_note: 'Dolidze e irregular por natureza. Vem de derrota para Hernandez, mas antes disso teve tres vitorias impressionantes (Smith, Holland, Vettori). Ele e o tipo de lutador que pode nocautear qualquer um no primeiro round ou ser finalizado no quarto. A inconsistencia e sua marca.',
      },
      fighter2: {
        nome: 'Christian Leroy Duncan',
        color: 'blue',
        recent_fights: [
          { date: 'Nov 2025', opponent: 'Marco Tulio Silva', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no segundo round. Terceira vitoria consecutiva e segundo KO seguido.' },
          { date: 'Ago 2025', opponent: 'Eryk Anders', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute no primeiro round sobre o veterano Anders. Performance explosiva.' },
          { date: 'Mar 2025', opponent: 'Andrey Pulyaev', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao no UFC Londres. Solida mas sem highlight.' },
          { date: 'Jul 2024', opponent: 'Gregory Rodrigues', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota no UFC. Perdeu por decisao no UFC 304 em Manchester.' },
        ],
        full_fight_history: [
          { date: 'Jul 2024', opponent: 'Gregory Rodrigues', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota UFC' },
          { date: 'Mar 2025', opponent: 'Andrey Pulyaev', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'UFC Londres, decisao' },
          { date: 'Ago 2025', opponent: 'Eryk Anders', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO R1' },
          { date: 'Nov 2025', opponent: 'Marco Tulio Silva', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO R2' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Duncan esta no melhor momento. Tres vitorias consecutivas, duas por nocaute, e evolucao visivel a cada luta. A sequencia de nocautes sobre Anders e Marco Tulio mostrou que CLD encontrou seu poder. Lutando em casa em Londres, a confianca esta no maximo.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Dolidze',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '6W-4L (60%)',
        contra_top5: '0W-1L',
      },
      fighter2: {
        nome: 'Duncan',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '4W-2L (67%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Dolidze enfrentou nivel muito superior (Vettori, Holland, Imavov, Hernandez) enquanto Duncan so enfrentou oponentes sem ranking. Essa luta e o grande teste de nivel para Duncan.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.45, valueB: 4.12, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 47, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.12, valueB: 3.55, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 54, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 2.10, valueB: 0.50, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 42, valueB: 33, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 58, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.4, valueB: 0.3, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '37 anos', fighter2: '30 anos', note: 'Dolidze 7 anos mais velho' },
        { label: 'Altura', fighter1: '1,88m (6\'2")', fighter2: '1,88m (6\'2")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '193cm (76")', fighter2: '201cm (79")', note: 'Duncan com 3 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Background', fighter1: 'Sambo/Wrestling', fighter2: 'Kickboxing/MMA', note: 'Grappler vs Striker' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 75, valueB: 45, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Dolidze media 2.10 takedowns por 15 min. Background de sambo e wrestling e significativo.' },
        { label: 'Striking em Pe', valueA: 62, valueB: 76, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Duncan tem mais volume (4.12 vs 3.45 por minuto) e 3 polegadas de envergadura a mais.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'even', advantage_note: 'Ambos nocautearam oponentes no R1 recentemente. Dolidze: Holland. Duncan: Anders. Poder equilibrado.' },
        { label: 'Defesa de Takedown', valueA: 72, valueB: 58, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Dolidze tem 72% de TDD, Duncan apenas 58%. Se Dolidze buscar o wrestling, Duncan pode ter dificuldade.' },
        { label: 'Cardio e Resistencia', valueA: 55, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Dolidze foi finalizado no R4 por Hernandez. Duncan e 7 anos mais jovem e mais fresco.' },
        { label: 'Experiencia em Alto Nivel', valueA: 82, valueB: 42, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Dolidze ja enfrentou Vettori, Holland, Imavov, Hernandez. Duncan so enfrentou oponentes sem ranking.' },
      ],
      insight: 'Dolidze traz experiencia e wrestling que Duncan ainda nao enfrentou. Duncan traz juventude, envergadura e momentum. A chave sera se Duncan consegue manter em pe e usar a envergadura, ou se Dolidze leva ao chao e controla.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Dolidze',
        ko_tko: { count: 7, percent: 47 },
        submission: { count: 4, percent: 27 },
        decision: { count: 4, percent: 26 },
        total_wins: 15,
      },
      fighter2: {
        nome: 'Duncan',
        ko_tko: { count: 8, percent: 62 },
        submission: { count: 2, percent: 15 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      insight: 'Ambos sao finalizadores, mas com perfis diferentes. Dolidze e mais diversificado: 47% KO, 27% submissao. Duncan e mais striker: 62% KO. A versatilidade de Dolidze (pode nocautear ou submeter) e uma vantagem, mas o volume de nocautes recentes de Duncan e mais impressionante.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM DUNCAN',
          color: 'green',
          title: 'A Explosao Inicial',
          description: 'Duncan vem de dois nocautes nos primeiros rounds (Anders no R1, Marco Tulio no R2). A explosividade e confianca dele estao no pico. Se ele conectar cedo com a vantagem de envergadura, pode encerrar a luta. Dolidze tambem nocauteou Holland no R1, entao ambos sao perigosos aqui.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Wrestling Entra em Jogo',
          description: 'Se a luta chegar ao R2, Dolidze provavelmente vai intensificar o wrestling. O R2 sera o teste de defesa de takedown de Duncan (58%). Se Dolidze conseguir controlar no chao, pode virar a dinamica. Se Duncan defender, continua em vantagem no striking.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VANTAGEM DUNCAN',
          color: 'green',
          title: 'Juventude e Gas',
          description: 'Dolidze mostrou problemas de cardio contra Hernandez no R4. Mesmo em 3 rounds, a fadiga do wrestling pode pesar no terceiro round. Duncan, 7 anos mais jovem, tende a ter mais gas para pressionar e buscar a finalizacao tardia.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Torcida em Casa', fighter: 'Duncan', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Duncan luta em casa no O2 Arena. O publico britanico vai apoiar intensamente. Para um lutador em ascensao, essa energia pode ser o combustivel para a melhor performance da carreira.' },
        { icon: 'TrendingUp', title: 'Momentum de Nocautes', fighter: 'Duncan', risk_level: 'POSITIVO', risk_color: 'green', description: 'Duncan vem de dois nocautes consecutivos. A confianca no poder esta no teto. Quando um lutador esta nesse estado, os golpes sao mais comprometidos e perigosos.' },
        { icon: 'Brain', title: 'Experiencia em Alto Nivel', fighter: 'Dolidze', risk_level: 'POSITIVO', risk_color: 'green', description: 'Dolidze ja enfrentou Vettori, Holland, Imavov, Hernandez. A experiencia contra elite e um ativo valioso. Duncan nunca enfrentou ninguem desse calibre.' },
        { icon: 'Clock', title: 'Idade: 37 vs 30', fighter: 'Duncan', risk_level: 'POSITIVO', risk_color: 'green', description: 'A diferenca de 7 anos e significativa. Dolidze esta no final da carreira enquanto Duncan esta no prime atletico. Reflexos, recuperacao e explosividade favorecem o mais jovem.' },
        { icon: 'AlertTriangle', title: 'Cardio de Dolidze', fighter: 'Dolidze', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Dolidze foi finalizado no R4 por Hernandez, mostrando problemas de resistencia em lutas longas. Se nao conseguir o takedown cedo, o gas pode faltar no R3.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Dolidze',
        total_probability: 40,
        scenarios: [
          { name: 'Wrestling e Controle', probability: 18, method: 'Decisao Unanime', description: 'Dolidze usa o wrestling para controlar Duncan no chao, acumula tempo de controle e vence nos pontos. A defesa de takedown de Duncan (58%) pode nao ser suficiente.' },
          { name: 'Nocaute de Poder', probability: 12, method: 'KO/TKO R1-R2', description: 'Dolidze encontra uma abertura no striking de Duncan e conecta algo pesado. Ele nocauteou Holland no R1 e tem poder real.' },
          { name: 'Submissao do Grappler', probability: 10, method: 'Submissao R2-R3', description: 'Dolidze leva ao chao e encontra uma submissao. Com 4 submissoes na carreira e background de sambo, o chao e territorio favoravel.' },
        ],
      },
      fighter2: {
        nome: 'Duncan',
        total_probability: 58,
        scenarios: [
          { name: 'Nocaute Explosivo', probability: 25, method: 'KO/TKO R1-R2', description: 'Duncan usa a envergadura de 201cm para conectar de longa distancia. Com dois nocautes consecutivos e confianca no pico, pode encerrar a luta cedo.' },
          { name: 'Volume e Distancia', probability: 20, method: 'Decisao Unanime', description: 'Duncan usa a envergadura para manter distancia, defende takedowns suficientes e vence nos pontos com volume de strikes e movimentacao.' },
          { name: 'TKO por Acumulo', probability: 13, method: 'TKO R2-R3', description: 'Duncan machuca Dolidze no striking e acumula dano ao longo dos rounds. O cardio de Dolidze falha e o arbitro para a luta.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Christian Leroy Duncan',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Essa e uma luta equilibrada com estilos contrastantes. Duncan tem a vantagem de juventude (7 anos mais novo), envergadura (3 polegadas a mais), momentum (3 vitorias seguidas) e torcida em casa. Dolidze traz experiencia contra elite e wrestling superior. A chave sera a defesa de takedown de Duncan: se ele mantiver em pe, a envergadura e o volume vao dominar. Se Dolidze levar ao chao, pode controlar. Prevejo Duncan mantendo distancia suficiente para vencer nos pontos, mas e uma luta que pode ir para qualquer lado.',
      x_factor: {
        title: 'O Primeiro Teste Real de Duncan',
        description: 'Duncan nunca enfrentou ninguem do nivel de Dolidze. O georgiano ja derrotou Vettori e Holland. Se Duncan sentir a pressao do salto de qualidade, pode hesitar nas trocas e abrir espaco para o wrestling de Dolidze.',
      },
      upset_alert: {
        title: 'O Wrestling do Georgiano',
        description: 'Dolidze media 2.10 takedowns por 15 min e Duncan tem apenas 58% de defesa. Se o georgiano implementar o plano de wrestling desde o inicio, pode controlar a luta inteira no chao.',
      },
      probabilities: {
        fighter1: { nome: 'Dolidze', percent: 40 },
        fighter2: { nome: 'Duncan', percent: 58 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Envergadura de Duncan', icon: 'Target', description: 'Duncan tem 201cm de envergadura contra 193cm de Dolidze. Essa diferenca de 3 polegadas pode ser decisiva se Duncan usar jab e diretos de longa distancia para manter Dolidze longe do clinch e do takedown.' },
        { num: 2, title: 'Os Takedowns de Dolidze', icon: 'Shield', description: 'Dolidze media 2.10 takedowns por 15 min e vai buscar levar a luta ao chao. A defesa de takedown de Duncan (58%) sera testada de forma seria pela primeira vez. Observe as primeiras tentativas.' },
        { num: 3, title: 'O Poder de Duncan nos Primeiros Minutos', icon: 'Zap', description: 'Duncan vem de dois nocautes consecutivos. Se ele conectar cedo, a confianca e o momentum podem tornar a luta unilateral. Observe se ele entra agressivo ou cauteloso.' },
        { num: 4, title: 'O Cardio de Dolidze no R3', icon: 'Activity', description: 'Dolidze foi finalizado no R4 contra Hernandez. Se a luta chegar ao terceiro round, observe se Dolidze comeca a desacelerar. A fadiga pode transformar o R3 em territorio de Duncan.' },
        { num: 5, title: 'Reacao de Duncan ao Salto de Qualidade', icon: 'Brain', description: 'Esse e o maior teste da carreira UFC de Duncan. Observe como ele reage nos primeiros minutos contra um oponente de nivel muito superior aos anteriores. Nervosismo ou respeito excessivo podem abrir portas para Dolidze.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'TESTE DE FOGO NO PESO-MEDIO', content: 'DOLIDZE vs DUNCAN\nUFC Londres | Peso Medio\n\n15-4 vs 13-2\nO veterano georgiano\nvs o britanico em ascensao', color: 'red' },
        { slide_number: 2, title: 'DOLIDZE: O IRREGULADOR', content: '15-4 na carreira\nNocauteou Kevin Holland (R1)\nVenceu Marvin Vettori (UD)\n37 anos, Sambo/Wrestling\nExperiencia contra elite', color: 'red' },
        { slide_number: 3, title: 'DUNCAN: CLD EM ASCENSAO', content: '13-2 na carreira\n3 vitorias consecutivas\n2 nocautes seguidos (Anders, Silva)\n201cm de envergadura\n30 anos, luta em casa', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'DUNCAN por Decisao Unanime\n\nConfianca: MEDIA\n58% Duncan / 40% Dolidze\n\nA envergadura e o momentum\nfavorecem CLD.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Dolidze vs Duncan e o teste que CLD precisa. Dolidze nocauteou Holland e venceu Vettori. Duncan vem de 2 nocautes seguidos e luta em casa. Quem leva?' },
        { num: '2/4', text: 'A chave: Duncan tem 201cm de envergadura e 58% de defesa de takedown. Dolidze media 2.10 TDs por 15 min. Se Duncan manter em pe, domina. Se Dolidze levar ao chao, controla.' },
        { num: '3/4', text: 'O fator que ninguem fala: Duncan NUNCA enfrentou alguem do nivel de Dolidze. Todos os oponentes dele no UFC eram sem ranking. Esse e o primeiro teste real.' },
        { num: '4/4', text: 'Previsao: Duncan por decisao. A envergadura, juventude e momentum favorecem CLD. Mas Dolidze e perigoso demais pra ignorar.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Christian Leroy Duncan nunca enfrentou ninguem que nocauteou Kevin Holland e venceu Marvin Vettori. Esse teste e diferente.' },
        { time: '10-25s', title: 'Contexto', text: 'Dolidze, 37 anos, ex-top 10, sambo e wrestling. Duncan, 30 anos, 3 vitorias seguidas, 2 nocautes, 201cm de envergadura. Veterano vs juventude em Londres.' },
        { time: '25-40s', title: 'Analise', text: 'Se ficar em pe, Duncan domina com envergadura. Se Dolidze levar ao chao, controla. A defesa de takedown de Duncan (58%) e a variavel chave.' },
        { time: '40-55s', title: 'Previsao', text: 'Duncan por decisao. O momentum, a torcida e a envergadura favorecem CLD. Mas Dolidze pode surpreender com o wrestling.' },
      ],
      tiktok: [
        { hook: 'Esse cara NUNCA enfrentou ninguem do nivel do oponente de sabado.', body: 'CLD tem 3 vitorias seguidas, 2 nocautes, e luta em casa em Londres. Mas Roman Dolidze nocauteou Kevin Holland e venceu Marvin Vettori. O primeiro teste real de Duncan. Sera que ele aguenta?', cta: 'Duncan ou Dolidze? Comenta!' },
        { hook: '201cm de envergadura contra o melhor wrestling que CLD ja enfrentou.', body: 'Duncan tem 3 polegadas a mais de envergadura que Dolidze. Mas Dolidze media 2.10 takedowns por 15 min. Se levar ao chao, Duncan esta em perigo. Se manter em pe, Duncan domina. Simples assim.', cta: 'Em pe ou no chao? Onde vai ser decidido? Comenta!' },
      ],
      headlines: [
        'Dolidze vs Duncan: O Primeiro Teste Real Para CLD no UFC',
        'Christian Leroy Duncan Pode Vencer Quem Nocauteou Holland?',
        'O Wrestler Georgiano Contra o Striker Britanico: Preview do Peso-Medio',
        'Duncan em Casa, Dolidze com Experiencia: Quem Leva o Duelo de Estilos?',
        'UFC Londres: A Envergadura de Duncan e Suficiente Para Neutralizar Dolidze?',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+120',
        fighter2_odds: '-140',
        fighter1_name: 'Roman Dolidze',
        fighter2_name: 'Christian Leroy Duncan',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Envergadura Superior de Duncan', stat_headline: '201CM DE ENVERGADURA VS 193CM DE DOLIDZE', contexto: 'Duncan tem 3 polegadas a mais de alcance. Pode usar jab e diretos de distancia para manter Dolidze longe.', implicacao_aposta: 'Favorece Duncan em pe. Se a luta ficar no striking, Duncan tem vantagem estrutural.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Wrestling de Dolidze vs TDD de Duncan', stat_headline: 'DOLIDZE: 2.10 TDS/15MIN. DUNCAN: 58% TDD', contexto: 'Dolidze e wrestler ativo e Duncan nunca enfrentou esse nivel de pressao no chao.', implicacao_aposta: 'Se voce acha que Dolidze vai levar ao chao, ele pode controlar e vencer.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'TrendingUp', titulo: 'Momentum de Duncan', stat_headline: '3 VITORIAS CONSECUTIVAS, 2 NOCAUTES SEGUIDOS', contexto: 'Duncan esta em ascensao com nocautes sobre Anders e Marco Tulio. Confianca e ritmo no pico.', implicacao_aposta: 'Favorece Duncan por finalizacao. O momentum recente e real.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Experiencia de Dolidze', stat_headline: 'JA DERROTOU VETTORI, HOLLAND E SMITH', contexto: 'Dolidze tem experiencia contra elite que Duncan nao tem. Sabe lutar sob pressao.', implicacao_aposta: 'Nao descarte Dolidze. Ele ja venceu nomes melhores que Duncan.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Fator Casa de Duncan', stat_headline: 'CLD LUTA EM LONDRES COM TORCIDA BRITANICA', contexto: 'Duncan lutando em casa com apoio total da torcida. Energia extra em momentos decisivos.', implicacao_aposta: 'Pode influenciar rounds apertados. Juizes sentem a pressao da arena.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Dolidze (+120)', odds: '+120', confianca: 'baixa', edge_vs_mercado: 'Dolidze como azarao leve tem valor. Ja derrotou nomes superiores a Duncan.', raciocinio: 'O wrestling e experiencia de Dolidze podem ser demais para Duncan. Como azarao a +120, o valor e razoavel.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-180', confianca: 'media', raciocinio: 'Dolidze tem tendencia a lutas mais longas quando usa wrestling. Duncan tem nocautes rapidos mas contra oponentes inferiores.' },
        { tipo: 'Metodo', pick: 'Duncan por KO/TKO', odds: '+150', confianca: 'baixa', raciocinio: 'Se Duncan manter em pe e usar a envergadura, o nocaute e possivel. Mas e o cenario mais arriscado dado o wrestling de Dolidze.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Superestimar o Momentum de Duncan',
        descricao: 'Duncan vem de nocautes impressionantes, mas contra oponentes sem ranking. Dolidze e um salto de qualidade enorme. Nao aposte pesado em Duncan baseado apenas no momentum recente sem considerar o nivel de oposicao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
