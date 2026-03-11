import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'font-vs-rosas-jr',
  evento_id: null,
  slug: 'font-vs-rosas-jr',
  titulo: 'Font vs Rosas Jr: Experiencia Contra a Juventude',
  subtitulo: 'O veterano mais tecnico da divisao enfrenta o prodigo mais jovem da historia do UFC',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '', envergadura: '', idade: 0, academia: '' },
      fighter2: { altura: '', envergadura: '', idade: 0, academia: '' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Decisao ou Submission',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Rob Font',
    record: '22-9-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Raul Rosas Jr.',
    record: '11-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC 326',
  evento_data: '7 de Marco, 2026',
  evento_local: 'T-Mobile Arena, Las Vegas, Nevada',
  categoria_peso: 'Peso Galo (135 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 Sections)
  // ===========================
  full_analysis: {
    // ============================
    // Section 1: HERO
    // ============================
    hero: {
      evento_nome: 'UFC 326',
      evento_data: '7 de Marco, 2026',
      evento_local: 'T-Mobile Arena, Las Vegas, Nevada',
      categoria_peso: 'Peso Galo (135 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Ultimo Guardiao Contra o Futuro',
      tagline_sub: '17 anos de diferenca. 20 lutas de experiencia. Um confronto inevitavel.',
      fighter1: {
        nome_completo: 'Rob Font',
        apelido: '',
        sobrenome: 'Font',
        record: '22-9-0',
        ranking: '#13 Peso Galo',
        info_extra: 'Leominster, Massachusetts | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Raul "El Nino Problema" Rosas Jr.',
        apelido: 'El Nino Problema',
        sobrenome: 'Rosas Jr.',
        record: '11-1-0',
        ranking: 'N/R Peso Galo',
        info_extra: 'Woodland, California | 21 anos',
        imagem_fullbody_url: null,
      },
    },

    // ============================
    // Section 2: NARRATIVA
    // ============================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Teste Que Rosas Jr. Precisava</h3>
        <p class="mb-4">Essa luta ja deveria ter acontecido em setembro de 2025, no Noche UFC. <strong class="text-blue-400">Rosas Jr.</strong> se machucou e a luta caiu. Quatro meses depois, o UFC remarcou o confronto para o card mais importante do primeiro trimestre de 2026. A mensagem e clara: o UFC acredita que <strong class="text-blue-400">Rosas Jr.</strong> esta pronto para dar o salto.</p>

        <p class="mb-4">Mas pronto para que, exatamente? <strong class="text-blue-400">Rosas Jr.</strong> tem 21 anos, 11 vitorias e o recorde de mais jovem a vencer cinco lutas no UFC. Suas duas ultimas vitorias, porem, vieram por decisao unanime contra Aoriqileng e Vince Morales, adversarios que nao estao nem perto do top 15. O hype existe, mas as provas concretas contra competicao de elite ainda nao.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Font: O Gatekeeper Que Ninguem Quer Enfrentar</h3>
        <p class="mb-4"><strong class="text-ufc-red">Font</strong> e exatamente o tipo de veterano que faz prospects voltarem ao final da fila. Aos 38 anos, ele nao vai disputar titulo. Mas ele acabou de vencer Kyler Phillips, um favorito de 6 para 1, por decisao unanime, e depois quebrou a invencibilidade de Jean Matsumoto (16-0) por split decision. Antes disso, suas derrotas foram para Sandhagen, Figueiredo e Aldo: calibre de campeonato. <strong class="text-ufc-red">Font</strong> perde para a elite, mas destroi o restante.</p>

        <p class="mb-4">O boxe tecnico de <strong class="text-ufc-red">Font</strong> e dos melhores da divisao. Ele tem o terceiro maior numero de golpes significativos da historia do peso galo do UFC. Mas sua defesa de takedown sempre foi vulneravel, e e exatamente ai que <strong class="text-blue-400">Rosas Jr.</strong> vive.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Colisao de Estilos</h3>
        <p class="mb-4">Essa luta se resume a uma pergunta simples: <strong class="text-blue-400">Rosas Jr.</strong> consegue levar <strong class="text-ufc-red">Font</strong> ao chao e mante-lo la? Se sim, a juventude, a energia e o jiu-jitsu de <strong class="text-blue-400">Rosas Jr.</strong> devem ser decisivos. Se <strong class="text-ufc-red">Font</strong> conseguir manter a luta em pe, seus jabs, diretos e combinacoes vao acumular dano em um <strong class="text-blue-400">Rosas Jr.</strong> que acerta apenas 1.51 golpes significativos por minuto.</p>

        <p class="mb-4">O que torna essa luta fascinante e que ambos os cenarios sao reais. <strong class="text-ufc-red">Font</strong> tem defesa de takedown de cerca de 48%. <strong class="text-blue-400">Rosas Jr.</strong> tenta 4 takedowns a cada 15 minutos. Os numeros sugerem que o chao vai aparecer, mas talvez nao tanto quanto <strong class="text-blue-400">Rosas Jr.</strong> precisa.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Manter posicao no top 15', fighter2: 'Entrar no ranking pela primeira vez' },
        { dimensao: 'Objetivo', fighter1: 'Provar que ainda e relevante aos 38', fighter2: 'Validar o hype contra competicao real' },
        { dimensao: 'Narrativa', fighter1: 'Guardiao da divisao, matador de prospects', fighter2: 'Prodigo tentando dar o salto para a elite' },
        { dimensao: 'Risco', fighter1: 'Perder para um sem ranking seria devastador', fighter2: 'Perder para um veterano em declinio destruiria o hype' },
        { dimensao: 'Recompensa', fighter1: 'Provar valor e buscar top 10', fighter2: 'Entrar no top 15 e ganhar lutas maiores' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'FONT SILENCIA O HYPE',
          subtitulo: 'O veterano prova que boxe tecnico ainda vence juventude e wrestling',
          consequencias: [
            { tag: 'RANKING', texto: 'Font sobe para o top 10-12 e se posiciona como o gatekeeper definitivo do peso galo' },
            { tag: 'LEGADO', texto: 'Aos 38 anos, Font consolida sua reputacao como o pesadelo de todo prospect' },
            { tag: 'PROXIMA LUTA', texto: 'Font poderia enfrentar um top 10 como Umar Nurmagomedov ou Deiveson Figueiredo novamente' },
          ],
          proxima_luta: 'Font vs. um top 10 do peso galo',
        },
        fighter2_vence: {
          titulo: 'O FUTURO E AGORA',
          subtitulo: 'Rosas Jr. prova que esta pronto para a elite do peso galo',
          consequencias: [
            { tag: 'RANKING', texto: 'Rosas Jr. entra direto no top 15, possivelmente top 12, com apenas 21 anos' },
            { tag: 'HYPE', texto: 'A narrativa do prodigo se fortalece. O UFC provavelmente o coloca em cards maiores' },
            { tag: 'TITULO', texto: 'Com mais duas ou tres vitorias contra ranqueados, Rosas Jr. entra na conversa de title shot antes dos 25' },
          ],
          proxima_luta: 'Rosas Jr. vs. um top 10 como Kyler Phillips ou Song Yadong',
        },
      },
    },

    // ============================
    // Section 3: MOMENTO ATUAL
    // ============================
    momento_atual: {
      fighter1: {
        nome: 'Rob Font',
        color: 'red',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'David Martinez',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Martinez venceu por unanimidade (29-28 x3). Font recebeu golpes apos o gongo e quase foi nocauteado no final.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Jean Matsumoto',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Quebrou a invencibilidade de Matsumoto (16-0) em luta pegada no catchweight 140lbs. Vitoria por split decision.',
          },
          {
            date: 'Out 2024',
            opponent: 'Kyler Phillips',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#14 BW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Surpreendeu como azarao de 6-1. Dominou os rounds 2 e 3 com boxe tecnico apos sobreviver ao wrestling no R1.',
          },
          {
            date: 'Dez 2023',
            opponent: 'Deiveson Figueiredo',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'Ex-Campeao FLW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Perdeu para o ex-campeao peso mosca em sua estreia no peso galo. Figueiredo quase finalizou Font no R3.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Cory Sandhagen',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: '#3 BW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Dominado por 5 rounds com wrestling. Sandhagen controlou 50-45 em todos os cartoes. Font aceitou com 3 semanas de aviso.',
          },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'David Martinez', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, note: 'Derrota por decisao no Noche UFC.' },
          { date: 'Fev 2025', opponent: 'Jean Matsumoto', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, note: 'Vitoria apertada por split decision.' },
          { date: 'Out 2024', opponent: 'Kyler Phillips', result: 'W', method: 'UD', opponent_rank: '#14 BW', quality_score: 3, note: 'Grande upset como azarao.' },
          { date: 'Dez 2023', opponent: 'Deiveson Figueiredo', result: 'L', method: 'UD', opponent_rank: 'Ex-Campeao', quality_score: 5, note: 'Quase finalizado no R3.' },
          { date: 'Ago 2023', opponent: 'Cory Sandhagen', result: 'L', method: 'UD', opponent_rank: '#3 BW', quality_score: 5, note: 'Dominado 50-45 em todos os cartoes.' },
          { date: 'Abr 2023', opponent: 'Adrian Yanez', result: 'W', method: 'TKO R1', opponent_rank: '#15 BW', quality_score: 3, note: 'Nocaute brutal com direita.' },
          { date: 'Dez 2021', opponent: 'Jose Aldo', result: 'L', method: 'UD', opponent_rank: '#3 BW', quality_score: 5, note: 'Derrota para lenda da divisao.' },
          { date: 'Jun 2021', opponent: 'Cody Garbrandt', result: 'W', method: 'UD', opponent_rank: '#9 BW', quality_score: 4, note: 'Dominou o ex-campeao por 5 rounds.' },
          { date: 'Fev 2021', opponent: 'Marlon Moraes', result: 'W', method: 'TKO R1', opponent_rank: '#5 BW', quality_score: 4, note: 'Nocaute no primeiro round.' },
          { date: 'Dez 2020', opponent: 'Marlon Vera', result: 'L', method: 'UD', opponent_rank: '#15 BW', quality_score: 3, note: 'Derrota competitiva.' },
          { date: 'Jun 2020', opponent: 'Ricky Simon', result: 'W', method: 'UD', opponent_rank: '#13 BW', quality_score: 3, note: 'Vitoria consistente por decisao.' },
          { date: 'Nov 2019', opponent: 'Sergio Pettis', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, note: 'Derrota por decisao.' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Font vive um momento instavel, alternando vitorias e derrotas. Suas duas ultimas vitorias antes da derrota para Martinez foram impressionantes (Phillips como azarao de 6-1 e quebrar a invencibilidade de Matsumoto), mas a derrota para Martinez no Noche UFC levantou duvidas. Font ainda e perigoso, mas nao e mais o lutador que venceu Garbrandt e Moraes com facilidade.',
      },
      fighter2: {
        nome: 'Raul Rosas Jr.',
        color: 'blue',
        recent_fights: [
          {
            date: 'Mar 2025',
            opponent: 'Vince Morales',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Controle total no chao com 3:30 de tempo de controle no R1. Zerou Morales em strikes significativos no primeiro round.',
          },
          {
            date: 'Set 2024',
            opponent: 'Aoriqileng',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria no Sphere no UFC 306, mas performance pouco impressionante. Venceu por takedowns e controle, sem dominio claro.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Ricky Turcios',
            result: 'W',
            method: 'Sub R2 (RNC)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizacao com mata-leao no segundo round. Performance of the Night. Turcios recusou cumprimentar antes da luta.',
          },
          {
            date: 'Set 2023',
            opponent: 'Terrence Mitchell',
            result: 'W',
            method: 'TKO R1 (0:54)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute devastador em 54 segundos com contra-ataque de esquerda. Voltou forte apos a derrota para Rodriguez.',
          },
          {
            date: 'Abr 2023',
            opponent: 'Christian Rodriguez',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Primeira e unica derrota. Dominou o R1, mas desapareceu nos R2 e R3. Rodriguez controlou do chao e venceu 29-28.',
          },
        ],
        full_fight_history: [
          { date: 'Mar 2025', opponent: 'Vince Morales', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, note: 'Controle total.' },
          { date: 'Set 2024', opponent: 'Aoriqileng', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, note: 'Vitoria no Sphere.' },
          { date: 'Jun 2024', opponent: 'Ricky Turcios', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, note: 'Mata-leao no R2. POTN.' },
          { date: 'Set 2023', opponent: 'Terrence Mitchell', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, note: 'KO em 54 segundos.' },
          { date: 'Abr 2023', opponent: 'Christian Rodriguez', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, note: 'Unica derrota. Gaseou apos R1.' },
          { date: 'Dez 2022', opponent: 'Jay Perrin', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, note: 'Estreia historica. Mais jovem a vencer no UFC.' },
        ],
        layoff_warning: 'Rosas Jr. nao luta ha quase 12 meses. Sua ultima luta foi em marco de 2025, e ele teve que cancelar a luta contra Font no Noche UFC por lesao.',
        momentum_score: 7,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Rosas Jr. vem de quatro vitorias consecutivas desde sua unica derrota para Christian Rodriguez em 2023, mas a qualidade dos adversarios e questionavel. Nenhum dos oponentes recentes estava ranqueado. Suas duas ultimas vitorias por decisao contra Aoriqileng e Morales foram competentes, mas nao empolgaram. O KO de Mitchell e a finalizacao de Turcios mostraram potencial de finalizacao, mas Font e um salto enorme de nivel.',
      },
    },

    // ============================
    // Section 4: NIVEL DE COMPETICAO
    // ============================
    nivel_competicao: {
      fighter1: {
        nome: 'Rob Font',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '3W-3L (50%)',
        contra_top5: '1W-3L',
      },
      fighter2: {
        nome: 'Raul Rosas Jr.',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Font e Rosas Jr. nao compartilham adversarios em comum. Isso torna a comparacao direta mais dificil, mas o contraste no nivel de competicao e gritante. Font enfrentou ex-campeoes como Figueiredo e Aldo, alem de desafiantes ao titulo como Sandhagen. Rosas Jr. ainda nao enfrentou ninguem dentro do top 15. Essa luta e, literalmente, o primeiro teste real de Rosas Jr. no UFC.',
    },

    // ============================
    // Section 5: OPONENTE COMUM
    // ============================
    oponente_comum: null,

    // ============================
    // Section 6: COMPARACAO ESTATISTICA
    // ============================
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 5.36,
          valueB: 1.51,
          maxVal: 7,
          format: 'decimal',
          note: 'Font tem o terceiro maior volume de strikes da historia do peso galo do UFC. A diferenca e enorme.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 44,
          valueB: 44,
          maxVal: 100,
          format: 'percent',
          note: 'Mesma precisao percentual, mas Font lanca 3.5x mais golpes por minuto.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.70,
          valueB: 3.00,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Rosas Jr. absorve menos, mas passa menos tempo em pe onde os golpes acontecem.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 57,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.20,
          valueB: 4.01,
          maxVal: 5,
          format: 'decimal',
          note: 'Rosas Jr. tenta quase 4 takedowns a cada 15 minutos. Esse e o motor da sua luta.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 36,
          valueB: 39,
          maxVal: 100,
          format: 'percent',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 48,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Font tem defesa de TD abaixo da media. Rosas Jr. tem 0% registrado, mas raramente e derrubado.',
        },
        {
          label: 'Submissoes por 15 Min',
          valueA: 0.0,
          valueB: 1.1,
          maxVal: 3,
          format: 'decimal',
          note: 'Rosas Jr. e uma ameaca constante de finalizacao. Font nao busca submissoes.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '38 anos',
          fighter2: '21 anos',
          note: '17 anos de diferenca. Um dos maiores gaps de idade da historia do peso galo do UFC.',
        },
        {
          label: 'Altura',
          fighter1: '1.73m (5\'8")',
          fighter2: '1.75m (5\'9")',
          note: null,
        },
        {
          label: 'Envergadura',
          fighter1: '71"',
          fighter2: '67"',
          note: 'Font tem 4 polegadas de vantagem na envergadura, o que alimenta seu jab.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Switch (Southpaw)',
          note: null,
        },
        {
          label: 'Academia',
          fighter1: 'New England Cartel',
          fighter2: 'Treino Familiar + Team O\'Malley',
          note: null,
        },
      ],
    },

    // ============================
    // Section 7: PERFIL DE HABILIDADES
    // ============================
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 88,
          valueB: 35,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Font tem boxe tecnico de elite com volume historico. Rosas Jr. acerta apenas 1.51 golpes por minuto e usa strikes mais como setup para takedowns.',
        },
        {
          label: 'Wrestling / Takedowns',
          valueA: 38,
          valueB: 85,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Rosas Jr. media 4 takedowns por 15 minutos com instinto natural de trocas de nivel. Font tem defesa de takedown vulneravel (48%).',
        },
        {
          label: 'Jiu-Jitsu / Finalizacao',
          valueA: 30,
          valueB: 87,
          labelA: 'Ruim',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Rosas Jr. tem 6 vitorias por finalizacao e um jiu-jitsu agressivo com transicoes rapidas. Font nao tem historico de finalizacao no UFC.',
        },
        {
          label: 'Cardio / Gas',
          valueA: 72,
          valueB: 60,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Font ja foi a decisao em lutas de 5 rounds sem desacelerar. Rosas Jr. gaseou contra Rodriguez apos um primeiro round intenso. Luta de 3 rounds minimiza essa questao.',
        },
        {
          label: 'Defesa Geral',
          valueA: 60,
          valueB: 45,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Font tem defesa de strikes superior (57% vs 50%). Rosas Jr. tem defesa de takedown inexistente nos dados, mas raramente e o que precisa defender.',
        },
        {
          label: 'QI de Luta / Experiencia',
          valueA: 82,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Font tem 31 lutas profissionais e 20 no UFC. Sabe gerenciar rounds, ajustar estrategia e sobreviver momentos ruins. Rosas Jr. tem 12 lutas e apenas 6 no UFC.',
        },
      ],
      insight: 'Esse confronto e um classico teste de habilidade primaria. Font domina em pe com margem enorme, enquanto Rosas Jr. domina no chao com margem equivalente. A luta sera decidida por quem consegue impor seu jogo. Se ficar em pe por mais de 60% do tempo, Font vence. Se Rosas Jr. conseguir derrubar e manter Font no chao consistentemente, o jovem tem caminho claro para a vitoria.',
    },

    // ============================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ============================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Rob Font',
        ko_tko: { count: 9, percent: 41 },
        submission: { count: 4, percent: 18 },
        decision: { count: 9, percent: 41 },
        total_wins: 22,
      },
      fighter2: {
        nome: 'Raul Rosas Jr.',
        ko_tko: { count: 2, percent: 18 },
        submission: { count: 6, percent: 55 },
        decision: { count: 3, percent: 27 },
        total_wins: 11,
      },
      insight: 'A distribuicao de vitorias revela perfis completamente diferentes. Font e um striker equilibrado, capaz de nocautear (9 KO/TKOs) ou vencer por pontos com a mesma frequencia. Rosas Jr. e um finalizador nato: 55% das suas vitorias vem por submissao, com o mata-leao como sua arma favorita. Quando Rosas Jr. leva ao chao, ele nao busca apenas controlar, ele busca finalizar. Font precisa estar ciente de que cada takedown de Rosas Jr. pode terminar a luta.',
    },

    // ============================
    // Section 9: DANGER ZONES
    // ============================
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM: ROSAS JR.',
          color: 'green',
          title: 'A Explosao Inicial',
          description: 'Rosas Jr. tende a comecar lutas com explosao, buscando takedowns nos primeiros 30 segundos. Contra Morales, ele zerou o adversario em strikes no primeiro round e acumulou 3:30 de controle. Font historicamente tem dificuldade em defender o primeiro takedown de um wrestler agressivo, como ficou evidente contra Sandhagen. Se Rosas Jr. conseguir um takedown cedo, ele pode controlar a maior parte do round e construir confianca para o resto da luta.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Decisivo',
          description: 'O segundo round sera o ponto de inflexao dessa luta. Se Font sobreviveu ao wrestling do R1 e conseguiu acertar combinacoes significativas, Rosas Jr. pode comecar a desacelerar. Foi exatamente isso que aconteceu contra Rodriguez em 2023: apos um primeiro round dominante, Rosas Jr. desapareceu. Mas se Rosas Jr. dominou o R1, ele pode buscar a finalizacao aqui com mais urgencia. Font, por outro lado, costuma melhorar no segundo round, como fez contra Phillips.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM: FONT',
          color: 'red',
          title: 'O Cardio Decide',
          description: 'Se a luta chegar ao terceiro round sem finalizacao, a vantagem se inclina para Font. Aos 38 anos, Font ainda tem cardio para manter volume alto em rounds tardios. Contra Phillips, ele dominou completamente o R3 de um adversario mais jovem. Rosas Jr. nunca foi alem de 3 rounds, e sua unica derrota veio quando gaseou apos um R1 intenso. Se Font estiver vivo e competitivo no R3, sua experiencia e volume de strikes devem prevalecer.',
        },
      ],
    },

    // ============================
    // Section 10: INTANGIVEIS
    // ============================
    intangiveis: {
      items: [
        {
          icon: 'Clock',
          title: 'Quase 12 meses sem lutar',
          fighter: 'Rosas Jr.',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Rosas Jr. nao luta desde marco de 2025 e teve que cancelar a luta contra Font no Noche UFC em setembro por lesao. Inatividade de quase um ano pode afetar timing, especialmente contra um veterano que conhece o ritmo do octogono.',
        },
        {
          icon: 'TrendingUp',
          title: 'Matador de prospects comprovado',
          fighter: 'Font',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Font acabou de provar contra Phillips (azarao de 6-1) e Matsumoto (invicto com 16-0) que sabe como neutralizar fighters mais jovens e confiantes. Ele tem o template para frustrar Rosas Jr.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Idade e desgaste',
          fighter: 'Font',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Aos 38 anos com 31 lutas profissionais, Font ja passou do seu prime. A derrota para Martinez, um oponente sem ranking, sugere que o declinio e real. Sua capacidade de absorver dano nao e a mesma de antes.',
        },
        {
          icon: 'Brain',
          title: 'Primeiro teste real no UFC',
          fighter: 'Rosas Jr.',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'Rosas Jr. nunca enfrentou um oponente ranqueado. Essa e a maior questao sobre ele. A pressao de enfrentar um veterano ranqueado no card principal do UFC 326 em Las Vegas pode revelar se o prodigo esta realmente pronto ou se o hype superou a realidade.',
        },
        {
          icon: 'Target',
          title: 'Defesa de takedown vulneravel',
          fighter: 'Font',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'A defesa de takedown de Font esta por volta de 48%, e Sandhagen ja provou que um wrestler determinado pode controla-lo por 5 rounds inteiros. Se Rosas Jr. conseguir impor seu wrestling da mesma forma, Font pode ser neutralizado completamente.',
        },
        {
          icon: 'Zap',
          title: 'Poder de nocaute de Font',
          fighter: 'Font',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Font tem 9 nocautes na carreira e nocauteou Adrian Yanez de forma devastadora em 2023. Se Rosas Jr. for descuidado nas entradas de takedown, Font tem poder suficiente para castigar com uppercuts e diretos.',
        },
        {
          icon: 'Shield',
          title: 'Rosas Jr. nunca foi finalizado',
          fighter: 'Rosas Jr.',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Apesar da unica derrota por decisao, Rosas Jr. nunca foi nocauteado ou finalizado em 12 lutas profissionais. Sua durabilidade no chao e excelente, e ele raramente fica em posicoes perigosas de submissions.',
        },
      ],
    },

    // ============================
    // Section 11: CAMINHOS PARA VITORIA
    // ============================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Rob Font',
        total_probability: 38,
        scenarios: [
          {
            name: 'A Clinica de Boxe',
            probability: 20,
            method: 'Decisao Unanime',
            description: 'Font mantem a luta em pe usando o jab longo, combinacoes rapidas e footwork para evitar as entradas de Rosas Jr. Acumula dano ao longo de 3 rounds com volume alto e precisao, vencendo rounds por golpes significativos. Rosas Jr. completa alguns takedowns, mas Font se levanta rapidamente e volta a acertar em pe.',
          },
          {
            name: 'O Uppercut no Momento Certo',
            probability: 12,
            method: 'TKO R2-R3',
            description: 'Rosas Jr. abaixa o nivel para um takedown e Font encaixa um uppercut limpo que machuca o jovem. Font segue com ground and pound ou combinacoes em pe para forcar o stoppage. E o mesmo cenario que fez Font nocautear Yanez.',
          },
          {
            name: 'Desgaste e Experiencia',
            probability: 6,
            method: 'Decisao Dividida',
            description: 'Luta apertada onde Font perde o R1 para o wrestling, mas recupera nos R2 e R3 com experiencia e ajustes taticos. Vence uma decisao dividida controversa baseada em controle em pe nos rounds finais.',
          },
        ],
      },
      fighter2: {
        nome: 'Raul Rosas Jr.',
        total_probability: 59,
        scenarios: [
          {
            name: 'Dominio Total no Chao',
            probability: 30,
            method: 'Decisao Unanime',
            description: 'Rosas Jr. derruba Font cedo em cada round, acumula tempo de controle massivo e damage no ground and pound. Font nao consegue se levantar consistentemente e Rosas Jr. vence todos os rounds com wrestling e controle posicional, como Sandhagen fez em 2023.',
          },
          {
            name: 'A Finalizacao Inevitavel',
            probability: 18,
            method: 'Sub R1-R2 (mata-leao)',
            description: 'Rosas Jr. derruba Font, toma as costas durante uma tentativa de levantamento e encaixa o mata-leao. E a mesma sequencia que usou contra Turcios e Perrin. A unica questao e se Font tem base suficiente para evitar a tomada de costas.',
          },
          {
            name: 'Pressao Sufocante',
            probability: 11,
            method: 'Decisao Dividida ou TKO tardio',
            description: 'Rosas Jr. mistura takedowns com pressao na jaula, mantendo Font desconfortavel e incapaz de usar seu boxe. Font resiste, mas acumula dano e perde rounds apertados. Se Font desacelerar no R3, Rosas Jr. pode conseguir um TKO tardio com ground and pound.',
          },
        ],
      },
    },

    // ============================
    // Section 12: PREVISAO FINAL
    // ============================
    previsao_final: {
      winner_name: 'Raul Rosas Jr.',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime ou Submissao',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Rosas Jr. tem a vantagem estilistica nessa luta. A defesa de takedown vulneravel de Font e o ponto de entrada que Rosas Jr. precisa, e os dados historicos mostram que wrestlers determinados (Sandhagen, Figueiredo) conseguem controlar Font por rounds inteiros. Rosas Jr. tem media de 4 takedowns por 15 minutos e busca 1.1 submissao por 15 minutos, o que significa que Font estara sob pressao constante no chao. Porem, a confianca e apenas media porque Rosas Jr. nunca enfrentou um oponente desse calibre, teve quase 12 meses de inatividade, e Font ja provou que sabe derrubar hype trains. Se Font conseguir manter a luta em pe por mais de 50% do tempo, os calculos mudam completamente.',
      x_factor: {
        title: 'A Inatividade de Rosas Jr.',
        description: 'Rosas Jr. nao luta ha quase 12 meses e teve que cancelar por lesao. Contra um veterano experiente como Font que luta regularmente, o ring rust pode ser o fator que equilibra a balanca. O timing de Rosas Jr. nas entradas de takedown sera crucial, e qualquer hesitacao pode resultar em uppercuts limpos de Font.',
      },
      upset_alert: {
        title: 'Upset Alert: Font por Decisao ou TKO',
        description: 'Font acabou de provar que sabe desmontar fighters mais jovens e confiantes. Ele e um azarao com historico recente de upsets (venceu Phillips como azarao de 6-1). Se Font conseguir defender pelo menos 60% dos takedowns e manter a luta em pe, seu volume de striking e experiencia podem surpreender novamente. Nao descarte o veterano.',
      },
      probabilities: {
        fighter1: { nome: 'Rob Font', percent: 38 },
        fighter2: { nome: 'Raul Rosas Jr.', percent: 59 },
        draw: 3,
      },
      value_picks: {
        moneyline: {
          pick: 'Rosas Jr. (favorito)',
          reasoning: 'Rosas Jr. e favorito por boas razoes: vantagem estilistica contra a defesa de takedown de Font. Mas o preco de -218 a -280 nao oferece grande valor. A melhor abordagem e combinar com metodo.',
        },
        method: {
          pick: 'Rosas Jr. por Decisao',
          reasoning: 'Rosas Jr. venceu suas duas ultimas por decisao e Font e duro demais para ser finalizado com facilidade. Rosas Jr. deve controlar com wrestling, mas Font vai sobreviver, resultando em decisao.',
        },
        over_under: {
          pick: 'Over 2.5 Rounds',
          reasoning: 'Font ja foi a decisao em 6 de suas ultimas 7 lutas. Rosas Jr. foi a decisao em 3 de suas ultimas 4. A tendencia clara e que essa luta vai a distancia.',
          rounds: 2.5,
        },
        best_value: 'Melhor aposta de valor: Over 2.5 Rounds. Ambos os lutadores tendem a ir a distancia recentemente, e Font e duro demais para ser finalizado com facilidade.',
      },
    },

    // ============================
    // Section 13: O QUE OBSERVAR
    // ============================
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Os Primeiros 30 Segundos',
          icon: 'Clock',
          description: 'Rosas Jr. quase sempre busca um takedown nos primeiros 30 segundos da luta. Contra Morales, ele dominou completamente o primeiro round a partir de um takedown inicial. Se Font defender esse primeiro ataque, muda toda a dinamica. Se Rosas Jr. completar, ele vai construir confianca e possivelmente controlar todo o R1.',
        },
        {
          num: 2,
          title: 'O Jab de Font Como Arma de Distancia',
          icon: 'Target',
          description: 'Font tem a envergadura (71" vs 67") e o jab tecnico para manter Rosas Jr. a distancia. Observe se Font esta usando o jab agressivamente para impedir as entradas de takedown ou se esta sendo passivo demais. Quando Font esta ativo com o jab, ele e quase impossivel de pressionar.',
        },
        {
          num: 3,
          title: 'O Cardio de Rosas Jr. no R3',
          icon: 'Activity',
          description: 'A unica derrota de Rosas Jr. veio quando ele gaseou apos um R1 intenso contra Rodriguez. Se essa luta chegar ao R3 competitiva, observe se Rosas Jr. mantem a mesma intensidade de takedowns ou se comeca a ficar apenas em pe, onde Font domina completamente.',
        },
        {
          num: 4,
          title: 'Uppercuts de Font nas Entradas',
          icon: 'Zap',
          description: 'Font nocauteou Yanez com um uppercut devastador durante uma troca. Rosas Jr. precisa abaixar o nivel para takedowns, o que o expoe a uppercuts. Se Font cronometrar uma entrada de Rosas Jr. com um uppercut limpo, pode ser o momento mais perigoso da luta para o jovem.',
        },
        {
          num: 5,
          title: 'A Capacidade de Font de Se Levantar',
          icon: 'Shield',
          description: 'Mesmo quando derrubado, Font ja mostrou capacidade de se levantar e voltar a lutar em pe. Contra Phillips, ele sobreviveu ao wrestling do R1 e dominou os R2 e R3. Se Font conseguir se levantar rapidamente apos os takedowns de Rosas Jr., ele pode frustrar o jogo do jovem e virar a luta no striking.',
        },
      ],
    },

    // ============================
    // Section 14: CREATOR KIT
    // ============================
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'FONT vs ROSAS JR.',
          content: 'UFC 326 | 7 de Marco\nT-Mobile Arena, Las Vegas\n\nPeso Galo (135 lbs)\n3 Rounds\n\n17 ANOS DE DIFERENCA\n38 anos vs 21 anos',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'ROB FONT',
          content: 'Record: 22-9-0\nRanking: #13 Peso Galo\n\nSig. Strikes/Min: 5.36 (top 3 historico BW)\nKO/TKOs: 9 na carreira\n\nUltimas 2: W Phillips (upset 6-1), W Matsumoto (quebrou invencibilidade)\nMatador de prospects comprovado',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'RAUL ROSAS JR.',
          content: 'Record: 11-1-0\nRanking: Nao ranqueado\n\nTakedowns/15min: 4.01\nSubmissoes/15min: 1.1\nVitorias por Sub: 6 (55%)\n\nMais jovem a vencer 5 lutas no UFC (21 anos)\n4 vitorias consecutivas',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'A CHAVE DA LUTA',
          content: 'FONT em pe = PERIGO\n5.36 strikes/min vs 1.51\n71" envergadura vs 67"\n\nROSAS JR. no chao = PERIGO\n4.01 TD/15min vs defesa de 48%\n6 vitorias por finalizacao\n\nQuem impoe seu jogo, vence.',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'ROSAS JR. por Decisao ou Sub\nConfianca: MEDIA (6/10)\n\nO wrestling deve prevalecer sobre o boxe de Font.\nMas cuidado: Font ja derrubou 2 hype trains seguidos.\n\nOver 2.5 Rounds = Melhor valor',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/6',
          text: 'Font vs Rosas Jr. no UFC 326 e exatamente o tipo de luta que define carreiras. Font, 38 anos, matador de prospects. Rosas Jr., 21 anos, prodigo tentando provar que esta pronto. 17 anos de diferenca no octogono.',
        },
        {
          num: '2/6',
          text: 'Os numeros de Font sao brutais: 5.36 sig. strikes por minuto, terceiro maior volume da HISTORIA do peso galo do UFC. Mas os numeros de Rosas Jr. no chao tambem: 4 takedowns por 15 minutos, 6 vitorias por finalizacao em 11.',
        },
        {
          num: '3/6',
          text: 'O problema de Font: defesa de takedown de ~48%. Sandhagen ja provou que um wrestler determinado controla Font por 5 rounds inteiros (50-45 x3). Rosas Jr. e exatamente esse tipo de wrestler, so que com finalizacao.',
        },
        {
          num: '4/6',
          text: 'O problema de Rosas Jr.: NUNCA enfrentou um ranqueado. Seus ultimos oponentes (Morales, Aoriqileng, Turcios) nao estavam nem perto do top 15. Font e o primeiro teste real. E Font acabou de derrubar Phillips (azarao 6-1) e Matsumoto (16-0).',
        },
        {
          num: '5/6',
          text: 'Red flag para Rosas Jr.: quase 12 meses sem lutar + lesao que cancelou a luta no Noche UFC. Ring rust contra um veterano que luta regularmente pode ser o fator que ninguem esta considerando.',
        },
        {
          num: '6/6',
          text: 'Minha previsao: Rosas Jr. por decisao, mas com confianca MEDIA. O wrestling deve prevalecer, mas Font sabe frustrar jovens confiantes. Melhor aposta de valor: Over 2.5 rounds. Font e duro demais para ser finalizado facilmente.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Font tem 38 anos, 22 vitorias e o terceiro maior volume de strikes da historia do peso galo do UFC. Rosas Jr. tem 21 anos, nunca enfrentou um ranqueado e nao luta ha quase um ano. E mesmo assim, Rosas Jr. e o favorito. Deixa eu te explicar por que."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Em pe, Font e muito superior. 5.36 golpes por minuto contra 1.51 do Rosas Jr., com 4 polegadas a mais de envergadura. Mas no chao, Rosas Jr. domina: 4 takedowns por 15 minutos, 6 finalizacoes em 11 vitorias. E a defesa de takedown de Font? 48%. Sandhagen ja controlou Font por 5 rounds inteiros. E exatamente isso que Rosas Jr. vai tentar fazer."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"Mas tem um detalhe que ninguem esta falando. Font acabou de vencer Kyler Phillips como azarao de 6 pra 1 e quebrou a invencibilidade de Matsumoto. Ele SABE como matar hype trains. E Rosas Jr. vem de quase um ano sem lutar, apos cancelar por lesao. Ring rust contra um veterano experiente e um risco real."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"O red flag de Font: 38 anos, derrota recente para David Martinez. O red flag de Rosas Jr.: nunca enfrentou um ranqueado e gaseou contra Rodriguez na sua unica derrota. Se essa luta chegar ao terceiro round competitiva, aposto no veterano."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Rosas Jr. por decisao, mas com confianca media. O wrestling deve prevalecer, mas Font e durissimo e pode surpreender. Melhor aposta: over 2.5 rounds. Comenta ai quem voce acha que vence. Se curtiu, se inscreve!"',
        },
      ],
      tiktok: [
        {
          hook: 'Um cara de 38 anos que nocauteou Yanez em 3 minutos contra o prodigo de 21 que nunca enfrentou um ranqueado.',
          body: 'Font tem o terceiro maior volume de strikes da historia do peso galo do UFC. 5.36 golpes por minuto. Rosas Jr. acerta 1.51. Mas Rosas Jr. derruba 4 vezes por 15 minutos, e Font defende menos da metade dos takedowns. Se ficar em pe, Font vence facil. Se for pro chao, Rosas Jr. pode finalizar.',
          cta: 'Comenta "FONT" ou "ROSAS" com sua previsao. A diferenca de idade e de 17 anos. Quem leva essa?',
        },
        {
          hook: 'O UFC colocou um matador de prospects contra o maior prospect da divisao. Alguem vai sair destruido.',
          body: 'Font derrubou Phillips como azarao de 6-1 e quebrou a invencibilidade de Matsumoto (16-0). Rosas Jr. tem 4 vitorias seguidas, mas contra ninguem no top 15. E ele nao luta ha quase um ano. Esse e o teste real. Se Rosas Jr. passar, ele entra no ranking. Se perder, volta pro final da fila.',
          cta: 'Salva esse video e volta depois da luta pra ver se eu acertei. Minha previsao ta no final do carrossel!',
        },
        {
          hook: 'A defesa de takedown de Font e de 48%. Rosas Jr. tenta 4 takedowns por 15 minutos. Faz a conta.',
          body: 'Sandhagen usou wrestling e controlou Font por 5 rounds inteiros, vencendo 50-45 nos tres cartoes. Rosas Jr. tem o mesmo perfil de wrestling, mas adiciona finalizacao: 6 vitorias por submissao em 11. O mata-leao do Rosas Jr. e a arma mais perigosa dessa luta.',
          cta: 'Segue pra mais analises do UFC 326. Tem Holloway vs Oliveira 2 no main event!',
        },
      ],
      headlines: [
        'Font vs Rosas Jr.: 17 Anos de Diferenca, Uma Carreira em Jogo',
        'O Matador de Prospects Contra o Maior Prospect do Peso Galo',
        'Rosas Jr. Nunca Enfrentou Um Ranqueado. Font Vai Cobrar o Preco.',
        'Font, 38 Anos, Pode Destruir Mais Um Hype Train no UFC 326?',
        'A Defesa de Takedown de Font Vai Sobreviver ao Wrestling de Rosas Jr.?',
        'UFC 326: Experiencia vs Juventude no Confronto Que Define o Peso Galo',
      ],
    },

    // ============================
    // Section 15: BETTING VALUE (null)
    // ============================
    betting_value: null,

    // ============================
    // Section 15: RADAR DO APOSTADOR
    // ============================
    radar_apostador: {
      odds: {
        fighter1_odds: '+180',
        fighter2_odds: '-218',
        fighter1_name: 'Rob Font',
        fighter2_name: 'Raul Rosas Jr.',
        source: 'Media de DraftKings, FanDuel e BetMGM (marco 2026)',
      },
      edges: [
        {
          icon: 'Target',
          titulo: 'Volume de Strikes Historico de Font',
          stat_headline: '5.36 SIG. STRIKES POR MINUTO, TOP 3 NA HISTORIA DO PESO GALO',
          contexto: 'Font tem o terceiro maior numero de golpes significativos da historia do peso galo do UFC (1.307 sig. strikes). Quando a luta fica em pe, ele domina qualquer oponente com volume. Contra Phillips, ele acumulou dano suficiente nos R2 e R3 para virar uma luta que estava perdendo.',
          implicacao_aposta: 'Se voce acredita que Font consegue manter a luta em pe por mais de 50% do tempo, o preco de azarao (+180) oferece valor significativo. Historicamente, Font em pe e quase impossivel de ser superado em pontos.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Shield',
          titulo: 'Defesa de TD Vulneravel de Font',
          stat_headline: '~48% DE DEFESA DE TAKEDOWN NA CARREIRA',
          contexto: 'Sandhagen controlou Font por 5 rounds inteiros usando wrestling, vencendo 50-45 em todos os cartoes. Figueiredo tambem usou takedowns efetivos. A defesa de takedown de Font esta abaixo da media da divisao e e o ponto de entrada principal para Rosas Jr.',
          implicacao_aposta: 'Esse dado favorece apostas em Rosas Jr. por decisao ou submissao. Se Rosas Jr. conectar takedowns no mesmo ritmo que Sandhagen, Font sera controlado.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'TrendingUp',
          titulo: 'Font Matador de Hype Trains',
          stat_headline: 'VENCEU PHILLIPS (AZARAO 6-1) E MATSUMOTO (16-0) NAS ULTIMAS LUTAS',
          contexto: 'Nas suas duas vitorias mais recentes antes da derrota para Martinez, Font derrubou dois fighters mais jovens e favorecidos. Phillips era favorito de 6 para 1 e Matsumoto era invicto com 16-0. Font tem um historico comprovado de frustrar fighters confiantes e com hype.',
          implicacao_aposta: 'Apostadores que ignoram Font pelo preco de azarao estao cometendo o mesmo erro que fizeram com Phillips e Matsumoto. Font como azarao tem valor historico.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Clock',
          titulo: 'Tendencia a Decisao de Ambos',
          stat_headline: 'FONT: 6 DE 7 ULTIMAS POR DECISAO. ROSAS JR.: 3 DE 4 ULTIMAS POR DECISAO.',
          contexto: 'Ambos os lutadores estao em uma tendencia clara de ir a distancia. Font nao finaliza desde o KO de Yanez em abril de 2023. Rosas Jr. nao finaliza desde a submissao de Turcios em junho de 2024. As ultimas performances de ambos foram lutas de controle e pontos.',
          implicacao_aposta: 'Over 2.5 rounds e a aposta mais segura dessa luta. A combinacao da durabilidade de Font e o estilo de controle recente de Rosas Jr. aponta fortemente para decisao.',
          edge_level: 'forte',
          fighter_side: 'neutral',
        },
        {
          icon: 'Activity',
          titulo: 'Ring Rust de Rosas Jr.',
          stat_headline: 'QUASE 12 MESES SEM LUTAR + CANCELAMENTO POR LESAO',
          contexto: 'Rosas Jr. nao luta desde marco de 2025. Teve que cancelar a luta contra Font no Noche UFC em setembro 2025 por lesao. Contra um veterano que lutou 3 vezes em 2025, a inatividade e um fator real. Historicamente, fighters jovens que ficam inativos tendem a mostrar ring rust nas entradas e no timing.',
          implicacao_aposta: 'Esse fator pode nao estar totalmente precificado nas odds. A combinacao de inatividade + primeiro teste real pode resultar em uma performance abaixo do esperado de Rosas Jr.',
          edge_level: 'leve',
          fighter_side: 'fighter1',
        },
      ],
      value_picks: [
        {
          tipo: 'Over/Under',
          pick: 'Over 2.5 Rounds',
          odds: '-160 (estimado)',
          confianca: 'alta',
          raciocinio: 'Font foi a decisao em 6 de suas ultimas 7 lutas. Rosas Jr. venceu por decisao em 3 de suas ultimas 4. Font e extremamente duro de finalizar, e Rosas Jr. nao finaliza desde junho de 2024. A tendencia de ambos e ir a distancia, e luta de 3 rounds facilita ainda mais o over.',
        },
        {
          tipo: 'Metodo',
          pick: 'Rosas Jr. por Decisao',
          odds: '+130 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'O mercado pode estar precificando uma finalizacao de Rosas Jr. que nao e tao provavel quanto parece. Suas 3 ultimas vitorias incluem 2 decisoes unanimes.',
          raciocinio: 'Rosas Jr. deve controlar com wrestling e acumular tempo de controle, mas Font e duro demais para ser finalizado. A tendencia recente de Rosas Jr. (2 de 3 ultimas por decisao) e a durabilidade de Font apontam para decisao.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Rob Font (+180)',
          odds: '+180',
          confianca: 'baixa',
          edge_vs_mercado: 'Font como azarao tem historico de upsets: venceu Phillips como azarao de 6-1 recentemente.',
          raciocinio: 'Aposta especulativa, mas com valor. Font e um veterano que sabe frustrar prospects. Se a inatividade de Rosas Jr. for um fator e Font conseguir manter a luta em pe, a surpresa e possivel. Valor para quem quer arriscar.',
        },
        {
          tipo: 'Duracao',
          pick: 'Vai a Decisao',
          odds: '-120 (estimado)',
          confianca: 'media',
          raciocinio: 'Baseado na tendencia recente de ambos de ir a distancia e na durabilidade de Font. Rosas Jr. nao finalizou nas suas duas ultimas lutas, e Font nao foi finalizado desde 2017 (submissao de Pedro Munhoz). Alta probabilidade de decisao.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Rosas Jr. por Submissao no R1',
        descricao: 'Apesar de Rosas Jr. ter 6 finalizacoes na carreira, suas duas ultimas lutas terminaram em decisao. Apostar em finalizacao rapida contra Font, que nao e finalizado desde 2017, e uma armadilha. Font tem experiencia suficiente para sobreviver no chao e Rosas Jr. tende a controlar por pontos contra adversarios que nao desistem facil. Nao pague preco alto por uma finalizacao que provavelmente nao vai acontecer.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade e dentro dos seus limites financeiros.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
