import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'evloev-vs-murphy',
  evento_id: null,
  slug: 'evloev-vs-murphy',
  titulo: 'Evloev vs Murphy: Invictos em Rota de Colisao',
  subtitulo: 'O #1 do ranking peso-pena enfrenta o #3 numa eliminatoria pelo titulo em Londres',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,73m', envergadura: '184cm', idade: 32, academia: 'Team Dagestan' },
      fighter2: { altura: '1,75m', envergadura: '187cm', idade: 34, academia: 'All Powers Gym' },
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
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Movsar Evloev',
    record: '19-0-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Aljamain Sterling', method: 'Decisao Unanime', event: 'UFC 310' },
      { result: 'W', opponent: 'Arnold Allen', method: 'Decisao Unanime', event: 'UFC 297' },
      { result: 'W', opponent: 'Diego Lopes', method: 'Decisao Unanime', event: 'UFC 288' },
    ],
  },
  fighter2_info: {
    nome: 'Lerone Murphy',
    record: '17-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Aaron Pico', method: 'KO R1', event: 'UFC 319' },
      { result: 'W', opponent: 'Josh Emmett', method: 'Decisao Unanime', event: 'UFC on ESPN 65' },
      { result: 'W', opponent: 'Dan Ige', method: 'Decisao Unanime', event: 'UFC 308' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Pena (145 lbs)',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    // ===========================
    // Section 1: HERO
    // ===========================
    hero: {
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: '21 de Marco, 2026',
      evento_local: 'The O2 Arena, Londres, Reino Unido',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Invictos em Rota de Colisao',
      tagline_sub: 'Eliminatoria pelo titulo peso-pena com 36 vitorias combinadas e zero derrotas',
      fighter1: {
        nome_completo: 'Movsar Evloev',
        apelido: '',
        sobrenome: 'Evloev',
        record: '19-0-0',
        ranking: '#1 Peso-Pena',
        info_extra: 'Ingushetia, Russia | 32 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Lerone "The Miracle" Murphy',
        apelido: 'The Miracle',
        sobrenome: 'Murphy',
        record: '17-0-1',
        ranking: '#3 Peso-Pena',
        info_extra: 'Manchester, Inglaterra | 34 anos',
        imagem_fullbody_url: null,
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Duas Jornadas Perfeitas, Um Unico Destino</h3>
        <p class="mb-4">
          Existem lutas que sao testes de nivel. E existem lutas que definem uma geracao. <strong class="text-ufc-red">Movsar Evloev</strong> contra <strong class="text-blue-400">Lerone Murphy</strong> e a segunda. Dois caras que nunca perderam na carreira profissional, que escalaram o ranking do peso-pena com consistencia brutal, e que agora se encontram no main event de Londres com a promessa do titulo na linha.
        </p>
        <p class="mb-4">
          Evloev e a maquina. O russo de 32 anos construiu seu recorde invicto de 19-0 na base da pressao incansavel, wrestling de elite e uma capacidade unica de transformar rounds inteiros em exercicios de controle. Nao importa se o oponente se chama Aljamain Sterling, Arnold Allen ou Diego Lopes. Evloev encontra um jeito de vencer. Todas as nove lutas dele no UFC terminaram em decisao, e isso nao e coincidencia. Ele nao busca o highlight; ele busca a vitoria.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Milagre de Manchester</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Murphy</strong> e uma historia de superacao que transcende o esporte. Em 2013, ele levou um tiro no rosto e no pescoco do lado de fora de uma barbearia em Manchester. Sobreviveu, se recuperou, e canalizou tudo para o MMA. Hoje, aos 34 anos, ele carrega um recorde de 17-0-1, com o unico empate vindo em sua estreia no UFC contra Zubaira Tukhugov. Desde entao, nove vitorias consecutivas, incluindo a destruicao de Aaron Pico com um cotovelo giratorio no primeiro round que rendeu o nocaute do ano.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p class="mb-4">
          Essa nao e apenas mais uma luta. O vencedor vai encarar Alexander Volkanovski pelo titulo peso-pena. Para Evloev, que ja dominou todos que colocaram na frente dele, e a validacao final antes do cinturao. Para Murphy, lutando em casa no O2 Arena, e a chance de transformar uma carreira extraordinaria em algo lendario. O publico britanico vai estar ensurdecedor, e Murphy sabe exatamente como usar essa energia.
        </p>
        <p class="mb-4">
          A pergunta que todo mundo quer responder: o wrestling implacavel de Evloev vai sufocar o striking dinamico de Murphy? Ou o britanico vai encontrar espacos para conectar os golpes que tem derrubado todo mundo? Cinco rounds. Sem saida. Alguem vai perder o zero.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#1 Peso-Pena', fighter2: '#3 Peso-Pena' },
        { dimensao: 'Sequencia', fighter1: '19 vitorias consecutivas', fighter2: '10 vitorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Titulo peso-pena', fighter2: 'Titulo peso-pena' },
        { dimensao: 'Narrativa', fighter1: 'Provar que e o melhor da divisao', fighter2: 'Conquistar a chance pelo titulo em casa' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota da carreira', fighter2: 'Primeira derrota da carreira' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A MAQUINA CHEGA AO TOPO',
          subtitulo: 'Evloev sufoca Murphy com wrestling e pressao por 5 rounds',
          consequencias: [
            { tag: 'TITULO', texto: 'Luta pelo titulo peso-pena contra Alexander Volkanovski marcada para o segundo semestre de 2026' },
            { tag: 'LEGADO', texto: 'Evloev se consolida como o desafiante mais perigoso do peso-pena, com 20-0 e vitorias sobre Sterling, Allen e Murphy' },
            { tag: 'RANKING', texto: 'Murphy cai para fora do top 3 mas permanece como ameaca seria na divisao' },
          ],
          proxima_luta: 'Evloev vs Alexander Volkanovski pelo titulo peso-pena',
        },
        fighter2_vence: {
          titulo: 'O MILAGRE EM CASA',
          subtitulo: 'Murphy nocauteia Evloev diante de um O2 Arena em erupcao',
          consequencias: [
            { tag: 'TITULO', texto: 'Murphy desafia Volkanovski numa possivel luta na Inglaterra, criando um evento historico' },
            { tag: 'LEGADO', texto: 'A historia do garoto baleado em Manchester que conquistou uma chance pelo titulo do UFC vira lenda' },
            { tag: 'RANKING', texto: 'Evloev sofre sua primeira derrota mas se mantem no top 3 do peso-pena' },
          ],
          proxima_luta: 'Murphy vs Alexander Volkanovski pelo titulo peso-pena',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Movsar Evloev',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'Decisao Unanime', opponent_rank: 'Ex-Campeao BW', quality_score: 5, quality_label: 'Excelente', note: 'Controlou o ex-campeao dos galos com wrestling superior e pressao constante por 3 rounds' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'Decisao Unanime', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Superou Allen em Toronto com takedowns e controle posicional decisivo' },
          { date: 'Mai 2023', opponent: 'Diego Lopes', result: 'W', method: 'Decisao Unanime', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta eletrizante que rendeu bonus de Luta da Noite contra striker perigoso' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'Decisao Unanime', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Bom', note: 'Dominio total por 3 rounds com placares de 30-26, 30-27, 30-27' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'Decisao Unanime', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida contra striker perigoso com pressao e takedowns' },
        ],
        full_fight_history: [
          { date: 'Abr 2019', opponent: 'Seung Woo Choi', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC' },
          { date: 'Out 2019', opponent: 'Enrique Barzola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda vitoria no UFC' },
          { date: 'Jul 2020', opponent: 'Mike Grundy', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria durante a pandemia' },
          { date: 'Jan 2021', opponent: 'Nik Lentz', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida apertada' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Primeiro oponente ranqueado' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Bom', note: 'Dominio total' },
          { date: 'Mai 2023', opponent: 'Diego Lopes', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta da Noite' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Vitoria sobre top 5' },
          { date: 'Dez 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'UD', opponent_rank: 'Ex-Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Vitoria sobre ex-campeao' },
        ],
        layoff_warning: 'Cerca de 15 meses sem lutar desde dezembro de 2024. Periodo mais longo de inatividade na carreira UFC.',
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Evloev esta no pico da carreira. Vem de nove vitorias consecutivas no UFC, com o nivel de oposicao subindo a cada luta. A vitoria sobre Aljamain Sterling em dezembro de 2024 consolidou sua posicao como desafiante numero um. O unico ponto de atencao e o layoff de 15 meses.',
      },
      fighter2: {
        nome: 'Lerone Murphy',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1 (cotovelo giratorio)', opponent_rank: '#13 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocaute espetacular com cotovelo giratorio no R1. Rendeu Performance da Noite e Nocaute do Ano' },
          { date: 'Abr 2025', opponent: 'Josh Emmett', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R FW', quality_score: 2, quality_label: 'Medio', note: 'Dominou Emmett por 5 rounds no main event com striking superior' },
          { date: 'Out 2024', opponent: 'Dan Ige', result: 'W', method: 'Decisao Unanime', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta equilibrada mas Murphy venceu o terceiro round para selar a decisao 29-28' },
          { date: 'Mai 2024', opponent: 'Edson Barboza', result: 'W', method: 'Decisao Unanime', opponent_rank: '#11 FW', quality_score: 3, quality_label: 'Bom', note: 'Performance completa contra veterano perigoso. Rendeu Luta da Noite' },
          { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria consistente por decisao unanime' },
        ],
        full_fight_history: [
          { date: 'Set 2019', opponent: 'Zubaira Tukhugov', result: 'D', method: 'SD (empate)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC, empate dividido' },
          { date: 'Jan 2021', opponent: 'Douglas Silva de Andrade', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira vitoria no UFC' },
          { date: 'Out 2021', opponent: 'Makwan Amirkhani', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute impressionante' },
          { date: 'Mar 2023', opponent: 'Gabriel Santos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Decisao dividida apertada' },
          { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida' },
          { date: 'Mai 2024', opponent: 'Edson Barboza', result: 'W', method: 'UD', opponent_rank: '#11 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta da Noite' },
          { date: 'Out 2024', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria na UFC 308' },
          { date: 'Abr 2025', opponent: 'Josh Emmett', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Main event de 5 rounds' },
          { date: 'Ago 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1', opponent_rank: '#13 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocaute do Ano' },
        ],
        layoff_warning: null,
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Murphy esta numa sequencia espetacular. Dez vitorias consecutivas no UFC, com a ultima sendo o nocaute do ano sobre Aaron Pico. Diferente de Evloev, Murphy vem ativo: tres lutas em menos de 12 meses. Lutando em casa no O2 Arena, o fator psicologico esta a seu favor.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Evloev',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '9W-0L (100%)',
        contra_top5: '2W-0L',
      },
      fighter2: {
        nome: 'Murphy',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '9W-0L-1D (95%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Dan Ige e o unico oponente em comum. Evloev dominou completamente (30-26, 30-27, 30-27) enquanto Murphy venceu numa luta mais equilibrada (29-28 unanime). A diferenca de dominio e reveladora.',
    },

    // ===========================
    // Section 5: OPONENTE COMUM
    // ===========================
    oponente_comum: {
      oponente_nome: 'Dan Ige',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '30-26, 30-27, 30-27',
        duracao: '3 rounds (15:00)',
        contexto: 'Evloev dominou completamente desde o primeiro segundo. Misturou takedowns com striking na distancia, nunca deixou Ige encontrar ritmo, e controlou a luta inteira sem momento de perigo real.',
        performance: 'Performance exemplar. Superioridade em todas as areas: striking, wrestling e controle. Ige nao teve resposta para a pressao constante.',
        evento: 'UFC Fight Night 207',
        data: 'Jun 2022',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '29-28, 29-28, 29-28',
        duracao: '3 rounds (15:00)',
        contexto: 'Luta muito mais competitiva. Ige venceu o primeiro round e colocou Murphy em situacoes desconfortaveis. Murphy ajustou nos rounds 2 e 3, encontrando o timing no striking para virar.',
        performance: 'Murphy mostrou resiliencia e capacidade de ajuste, mas tambem expos vulnerabilidades. Ige, que nao ofereceu resistencia para Evloev, conseguiu dar trabalho a Murphy.',
        evento: 'UFC 308',
        data: 'Out 2024',
      },
      insight: 'A comparacao e preocupante para Murphy. Contra o mesmo oponente, Evloev dominou de forma avassaladora (30-26 em um placar) enquanto Murphy precisou de ajustes e lutou duro para vencer por 29-28 unanime. Sugere uma diferenca significativa no nivel de controle.',
    },

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.99, valueB: 4.48, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.66, valueB: 2.51, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 60, valueB: 61, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 1.65, valueB: 1.41, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 35, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.3, valueB: 0.5, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '34 anos', note: 'Evloev 2 anos mais jovem' },
        { label: 'Altura', fighter1: '1,73m (5\'8")', fighter2: '1,75m (5\'9")', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '184cm (72.5")', fighter2: '187cm (73.5")', note: 'Murphy com 1 polegada de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Dagestan, Russia', fighter2: 'All Powers Gym, Manchester', note: null },
        { label: 'Estreia UFC', fighter1: 'Abril 2019', fighter2: 'Setembro 2019', note: 'Quase simultaneas' },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 92, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Evloev e um dos melhores wrestlers do peso-pena. 40 takedowns na carreira UFC.' },
        { label: 'Striking em Pe', valueA: 65, valueB: 82, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Murphy tem mais volume, precisao e poder no striking. 8 KOs na carreira.' },
        { label: 'Defesa de Takedown', valueA: 55, valueB: 58, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Ambos com defesa de takedown na faixa de 43-51%. Area equilibrada.' },
        { label: 'Cardio e Resistencia', valueA: 90, valueB: 80, labelA: 'Excelente', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Evloev nunca desacelerou em nenhuma luta. Pressao incansavel.' },
        { label: 'Poder de Finalizacao', valueA: 45, valueB: 78, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Murphy tem 8 KOs em 17 vitorias. Evloev tem apenas 3 KOs em 19.' },
        { label: 'QI de Luta e Adaptacao', valueA: 88, valueB: 75, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Evloev ajusta o gameplan durante a luta. Murphy tambem se adapta, como visto contra Ige.' },
      ],
      insight: 'Luta classica: o wrestler completo contra o striker dinamico. Evloev domina no wrestling, cardio e QI de luta, enquanto Murphy leva vantagem no striking puro e poder de finalizacao. A chave sera quem impoe o ritmo.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Evloev',
        ko_tko: { count: 3, percent: 16 },
        submission: { count: 4, percent: 21 },
        decision: { count: 12, percent: 63 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Murphy',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 0, percent: 0 },
        decision: { count: 9, percent: 53 },
        total_wins: 17,
      },
      insight: 'Os numeros contam a historia. Evloev e um lutador de decisao por excelencia, com 63% por pontos e zero finalizacoes no UFC. Murphy traz poder real, com quase metade das vitorias por nocaute. Porem, Murphy nunca finalizou ninguem por submissao, o que sugere que no chao Evloev estara em territorio favoravel.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 7,
          danger_label: 'VANTAGEM MURPHY',
          color: 'green',
          title: 'Janela de Oportunidade do Britanico',
          description: 'Se Murphy vai vencer essa luta, os dois primeiros rounds sao a melhor chance. Evloev precisa de tempo para impor o wrestling. Nos rounds iniciais, Murphy esta mais fresco, mais explosivo e mais perigoso. O nocaute de Pico veio no R1. Se Murphy conectar algo grande cedo, pode mudar toda a dinamica.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'ROUND DECISIVO',
          color: 'gold',
          title: 'O Ponto de Virada',
          description: 'O terceiro round e historicamente onde Evloev comeca a assumir controle total. O wrestling acumula dano e fadiga nesse ponto. Para Murphy, manter a defesa de takedown e o volume nesse round e fundamental. Quem vencer o R3 provavelmente define a luta.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM EVLOEV',
          color: 'red',
          title: 'Territorio do Russo',
          description: 'Os championship rounds sao onde Evloev brilha. O cardio dele e impecavel, a pressao nunca para, e o wrestling fica ainda mais efetivo contra um oponente cansado. Murphy nunca lutou 5 rounds contra alguem do nivel de wrestling de Evloev. Se chegar aqui sem nocaute, o russo sera o grande favorito.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Vantagem de Jogar em Casa', fighter: 'Murphy', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Murphy vai lutar no O2 Arena em Londres, a poucos quilometros de Manchester. O publico britanico sera ensurdecedor e totalmente a favor dele. O fator casa no UFC Londres e real.' },
        { icon: 'Clock', title: 'Layoff de 15 Meses', fighter: 'Evloev', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Evloev nao luta desde dezembro de 2024. Sao 15 meses de inatividade, o periodo mais longo de sua carreira no UFC. A ferrugem de cage pode afetar o timing nos primeiros minutos.' },
        { icon: 'Activity', title: 'Ritmo de Atividade', fighter: 'Murphy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Murphy lutou tres vezes em 2024-2025 e esta ativo e afiado. Enquanto Evloev ficou parado, Murphy acumulou experiencia e confianca.' },
        { icon: 'Brain', title: 'Experiencia em 5 Rounds', fighter: 'Evloev', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Evloev nunca lutou 5 rounds no UFC. Todas as 9 lutas foram de 3 rounds. Murphy ja teve experiencia de main event contra Emmett. Essa diferenca pode ser relevante.' },
        { icon: 'Zap', title: 'Poder de Nocaute', fighter: 'Murphy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Murphy tem poder real para encerrar a luta a qualquer momento. O cotovelo giratorio que nocauteou Pico mostrou arsenal diversificado. Evloev nunca enfrentou alguem com o poder de Murphy.' },
        { icon: 'Shield', title: 'Queixo e Durabilidade', fighter: 'Evloev', risk_level: 'POSITIVO', risk_color: 'green', description: 'Evloev nunca foi abalado de forma significativa em 19 lutas. O queixo dele foi testado contra Diego Lopes, um striker perigoso, e ele absorveu tudo sem problemas.' },
        { icon: 'TrendingUp', title: 'Confianca no Pico', fighter: 'Murphy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Murphy vem do nocaute mais espetacular de 2025. A confianca dele esta no teto. Combinado com o apoio da torcida, a performance pode atingir outro nivel.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Evloev',
        total_probability: 58,
        scenarios: [
          { name: 'Asfixia por Controle', probability: 35, method: 'Decisao Unanime', description: 'Evloev implementa seu gameplan padrao: pressao constante, takedowns nos momentos certos, controle no clinch e contra a grade. Acumula rounds e vence uma decisao unanime clara.' },
          { name: 'Dominio nos Championship Rounds', probability: 15, method: 'Decisao Unanime/Dividida', description: 'Murphy compete bem nos primeiros rounds, mas Evloev assume controle nos R3-R5 quando o cardio e o wrestling pesam. Vence uma decisao mais apertada.' },
          { name: 'Finalizacao Tardia', probability: 8, method: 'Submissao R4-R5', description: 'Cenario mais raro mas possivel. Com Murphy cansado nos rounds finais, Evloev encontra uma submissao durante uma sequencia de grappling.' },
        ],
      },
      fighter2: {
        nome: 'Murphy',
        total_probability: 39,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 15, method: 'KO/TKO R1-R2', description: 'Murphy conecta algo devastador nos primeiros rounds, antes de Evloev impor o wrestling. Um contragolpe preciso, cotovelo giratorio ou joelhada podem encerrar a luta.' },
          { name: 'Volume e Defesa de Takedown', probability: 14, method: 'Decisao Unanime/Dividida', description: 'Murphy consegue manter a luta em pe, defendendo takedowns suficientes e vencendo as trocas. O apoio da torcida ajuda nos momentos de decisao dos juizes.' },
          { name: 'TKO por Acumulo', probability: 10, method: 'TKO R3-R4', description: 'Murphy machuca Evloev no striking e acumula dano. Cortes, inchaco ou dano cumulativo levam a uma interrupcao do arbitro.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Movsar Evloev',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Evloev tem as ferramentas para controlar essa luta. O wrestling dele e de nivel olimpico, o cardio e inesgotavel, e ele transforma rounds inteiros em exercicios de controle. Murphy e perigoso, especialmente nos primeiros rounds e com o apoio da torcida, mas o nivel de oposicao que Evloev ja enfrentou (Sterling, Allen, Lopes) e superior. A defesa de takedown de Murphy fica na faixa dos 51%, e contra o wrestling de Evloev, isso pode nao ser suficiente. Prevejo Evloev controlando os rounds do meio e finais, mas Murphy tem poder real para virar a qualquer momento.',
      x_factor: {
        title: 'O Fator O2 Arena',
        description: 'O publico britanico pode ser o 11o homem de Murphy. O barulho, a energia e a pressao de lutar em casa podem dar ao britanico aquele boost extra que transforma rounds apertados em rounds ganhos.',
      },
      upset_alert: {
        title: 'O Cotovelo que Muda Tudo',
        description: 'Murphy mostrou contra Pico que pode encerrar lutas de forma espetacular com tecnicas nao-convencionais. Se Evloev entrar confiante demais no clinch, um cotovelo ou contragolpe pode acabar com tudo.',
      },
      probabilities: {
        fighter1: { nome: 'Evloev', percent: 58 },
        fighter2: { nome: 'Murphy', percent: 39 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Murphy (+210)', reasoning: 'Com odds de +210, Murphy oferece valor. Invicto, em casa, com poder de nocaute. A linha deveria estar mais perto de +170.' },
        method: { pick: 'Luta vai para decisao', reasoning: 'Com 63% das vitorias de Evloev por decisao e 53% das de Murphy, a probabilidade de ir aos juizes e alta.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Evloev nunca finalizou ninguem no UFC. Murphy tem queixo e experiencia de 5 rounds.' },
        best_value: 'Over 3.5 rounds e a melhor aposta. Evloev favorece lutas longas, e Murphy tem experiencia e queixo para aguentar.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'A Defesa de Takedown de Murphy nos 5 Primeiros Minutos', icon: 'Shield', description: 'Se Murphy defender os takedowns iniciais e manter a luta em pe no R1, a confianca dele vai subir e a dinamica muda. Fique de olho nos sprawls e na capacidade de se levantar.' },
        { num: 2, title: 'O Timing do Wrestling de Evloev', icon: 'Target', description: 'Evloev escolhe os momentos certos para mudar o nivel, geralmente depois de trocas. Se o timing estiver afiado apesar do layoff de 15 meses, Murphy tera problemas.' },
        { num: 3, title: 'O Barulho do O2 Arena', icon: 'MapPin', description: 'Preste atencao em como Murphy reage a energia da torcida. Em momentos de dificuldade, o publico pode reergue-lo. Evloev precisa mostrar frieza num ambiente completamente hostil.' },
        { num: 4, title: 'O Cardio de Murphy nos Championship Rounds', icon: 'Activity', description: 'Murphy ja lutou 5 rounds, mas nunca contra a pressao fisica que Evloev traz. Se o volume de takedowns acumular, o gas nos R4-R5 sera decisivo.' },
        { num: 5, title: 'Tecnicas Nao-Convencionais de Murphy', icon: 'Zap', description: 'O cotovelo giratorio contra Pico nao foi acidente. Fique atento a cotovelos no clinch, joelhadas na entrada de takedown e contragolpes criativos. Uma unica tecnica pode encerrar a luta.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'ELIMINATORIA PELO TITULO', content: 'EVLOEV vs MURPHY\nUFC Londres | 21 de Marco\nO2 Arena\n\n19-0 vs 17-0-1\nAlguem vai perder o zero.', color: 'red' },
        { slide_number: 2, title: 'EVLOEV: A MAQUINA', content: '#1 do ranking peso-pena\n19-0 na carreira\n9-0 no UFC (todas por decisao)\n40 takedowns no UFC\nNunca foi finalizado', color: 'red' },
        { slide_number: 3, title: 'MURPHY: O MILAGRE', content: '#3 do ranking peso-pena\n17-0-1 na carreira\nSobreviveu a um tiro no rosto em 2013\nNocaute do Ano 2025\nLuta em casa em Londres', color: 'blue' },
        { slide_number: 4, title: 'O OPONENTE COMUM', content: 'Dan Ige\n\nEvloev: 30-26, 30-27, 30-27\nDominio absoluto\n\nMurphy: 29-28, 29-28, 29-28\nVitoria apertada\n\nA diferenca diz muito.', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'EVLOEV por Decisao Unanime\n\nConfianca: MEDIA\n58% Evloev / 39% Murphy\n\nMas cuidado com o fator casa\ne o poder de Murphy.', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Evloev vs Murphy e a luta mais importante do peso-pena em 2026. Dois invictos, eliminatoria pelo titulo, e alguem vai perder o zero no O2 Arena. Thread:' },
        { num: '2/5', text: 'Evloev (19-0): 9 vitorias no UFC, TODAS por decisao. 40 takedowns. Nunca finalizado. Uma maquina de moer rounds. Mas nunca lutou 5 rounds no UFC.' },
        { num: '3/5', text: 'Murphy (17-0-1): Levou um tiro no rosto em 2013 e hoje e #3 do peso-pena. Nocaute do Ano contra Pico com cotovelo giratorio. Luta em casa. A torcida vai ser insana.' },
        { num: '4/5', text: 'O detalhe que ninguem fala: contra Dan Ige, Evloev dominou 30-26. Murphy venceu 29-28. Mesmo oponente, niveis de dominio completamente diferentes.' },
        { num: '5/5', text: 'Minha previsao: Evloev por decisao, mas com ressalvas. Murphy tem poder pra acabar a luta a qualquer momento. Over 3.5 rounds e a melhor aposta.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Dois invictos. Zero derrotas combinadas. E alguem vai perder no sabado. Evloev vs Murphy e a luta mais importante do peso-pena desde Volkanovski vs Topuria.' },
        { time: '10-25s', title: 'Contexto', text: 'Evloev e o #1, maquina de wrestling, 19-0. Murphy e o #3, nocaute do ano, luta em casa em Londres. O vencedor enfrenta Volkanovski pelo titulo.' },
        { time: '25-40s', title: 'Analise', text: 'Murphy consegue manter em pe? Se sim, tem poder pra finalizar. Se nao, Evloev vai controlar. Contra Dan Ige, Evloev ganhou 30-26. Murphy ganhou 29-28.' },
        { time: '40-55s', title: 'Previsao', text: 'Minha call: Evloev por decisao unanime, mas Murphy tem todas as ferramentas pro upset. O fator casa, o poder, a confianca. Nao durmam nessa.' },
        { time: '55-65s', title: 'CTA', text: 'Quem voces acham que vence? Comenta e segue pra mais analises do UFC Londres.' },
      ],
      tiktok: [
        { hook: 'O cara levou um TIRO NO ROSTO e agora e #3 do peso-pena do UFC.', body: 'Lerone Murphy sobreviveu a um tiroteio em Manchester em 2013. Hoje, enfrenta o invicto Movsar Evloev numa eliminatoria pelo titulo em Londres. 17-0-1. Nocaute do Ano 2025. Mas Evloev e uma MAQUINA. 19-0, zero finalizacoes sofridas.', cta: 'Comenta EVLOEV ou MURPHY!' },
        { hook: 'Essa estatistica ASSUSTA sobre o main event de Londres.', body: 'Evloev e Murphy enfrentaram Dan Ige. Evloev ganhou 30-26. TRINTA A VINTE E SEIS. Murphy? 29-28. Luta apertada. Mesmo oponente, dominio completamente diferente.', cta: 'Segue pra ver minha previsao completa!' },
        { hook: 'O peso-pena do UFC vai ter um novo desafiante no sabado.', body: 'Evloev vs Murphy. Dois invictos. O vencedor enfrenta Volkanovski. Evloev traz 40 takedowns no UFC. Murphy traz o nocaute mais bonito de 2025. E Murphy luta EM CASA no O2 Arena.', cta: 'Qual e a sua pick? Comenta!' },
      ],
      headlines: [
        'Evloev vs Murphy: A Eliminatoria Mais Importante do Peso-Pena em 2026',
        'Invicto vs Invicto: Por Que Londres Pode Produzir o Upset do Ano',
        'O Milagre de Manchester Tenta Destronar a Maquina Russa no O2 Arena',
        'Dan Ige Revela Tudo: A Estatistica Que Separa Evloev e Murphy',
        'UFC Londres: O Fator Casa Pode Decidir a Eliminatoria pelo Titulo?',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-250',
        fighter2_odds: '+210',
        fighter1_name: 'Movsar Evloev',
        fighter2_name: 'Lerone Murphy',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Dominio no Chao', stat_headline: '40 TAKEDOWNS NO UFC, TOP 5 DA HISTORIA DO PESO-PENA', contexto: 'Evloev e um dos melhores wrestlers ofensivos do peso-pena. Volume de takedowns consistente e implacavel.', implicacao_aposta: 'Favorece Evloev por decisao. Estilo projetado para vencer nos pontos.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Poder de Finalizacao de Murphy', stat_headline: '47% DAS VITORIAS POR KO/TKO, INCLUINDO NOCAUTE DO ANO 2025', contexto: 'Murphy tem poder real e arsenal nao-convencional. O nocaute de Pico prova que ele pode encerrar de qualquer posicao.', implicacao_aposta: 'Mesmo como azarao, Murphy dentro da distancia oferece valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Layoff vs Atividade', stat_headline: 'EVLOEV: 15 MESES SEM LUTAR. MURPHY: 3 LUTAS EM 12 MESES', contexto: 'Diferenca significativa. Murphy ativo e afiado, Evloev voltando de longo periodo parado.', implicacao_aposta: 'Inatividade pode afetar timing nos primeiros rounds.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'BarChart3', titulo: 'Zero Main Events para Evloev', stat_headline: '9 LUTAS NO UFC, TODAS DE 3 ROUNDS', contexto: 'Nunca foi escalado para main event antes. Murphy ja lutou 5 rounds contra Emmett.', implicacao_aposta: 'Area de incerteza sobre o cardio em 5 rounds.', edge_level: 'leve', fighter_side: 'neutral' },
        { icon: 'MapPin', titulo: 'Fator Casa em Londres', stat_headline: 'MURPHY NO O2 ARENA COM 20.000 BRITANICOS', contexto: 'Publico britanico notoriamente barulhento e parcial no UFC Londres.', implicacao_aposta: 'Pode influenciar rounds apertados. Juizes sentem a energia.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-165', confianca: 'alta', edge_vs_mercado: 'Evloev nunca finalizou no UFC. Murphy nunca foi finalizado.', raciocinio: 'Com 63% das vitorias de Evloev por decisao e Murphy nunca tendo sido finalizado, tendencia forte para luta longa.' },
        { tipo: 'Metodo', pick: 'Vai para Decisao', odds: '+110', confianca: 'media', raciocinio: 'Historicamente, lutas de Evloev terminam em decisao. Murphy tambem tem 53% por pontos. Combinacao favorece os juizes.' },
        { tipo: 'Moneyline', pick: 'Murphy (+210)', odds: '+210', confianca: 'baixa', edge_vs_mercado: 'Invicto, em casa, com poder. Linha generosa.', raciocinio: 'Como azarao a +210, Murphy oferece valor. Invicto, em casa, com poder de nocaute. O layoff de Evloev adiciona incerteza.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Evloev por Finalizacao',
        descricao: 'Evloev nunca finalizou ninguem no UFC. Zero KOs, zero submissoes em 9 lutas. Apostar em finalizacao dele e jogar contra toda a evidencia historica.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
