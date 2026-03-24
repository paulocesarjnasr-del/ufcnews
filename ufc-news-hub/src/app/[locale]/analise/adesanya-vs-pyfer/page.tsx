'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: FullSingleAnalise = {
  id: 'adesanya-vs-pyfer',
  evento_id: null,
  slug: 'adesanya-vs-pyfer',
  titulo: 'Adesanya vs Pyfer: O Ultimo Teste do Stylebender',
  subtitulo: 'O ex-campeao busca encerrar sequencia de 3 derrotas contra o jovem nocauteador #14 do ranking',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,93m', envergadura: '203cm', idade: 36, academia: 'City Kickboxing' },
      fighter2: { altura: '1,88m', envergadura: '190cm', idade: 29, academia: 'Team Balance' },
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
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Israel Adesanya',
    record: '24-5-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Nassourdine Imavov', method: 'TKO R2', event: 'UFC Fight Night 250' },
      { result: 'L', opponent: 'Dricus Du Plessis', method: 'Sub R4', event: 'UFC 305' },
      { result: 'L', opponent: 'Sean Strickland', method: 'Decisao Unanime', event: 'UFC 293' },
    ],
  },
  fighter2_info: {
    nome: 'Joe Pyfer',
    record: '15-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Abusupiyan Magomedov', method: 'Sub R2', event: 'UFC 320' },
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
    // ===========================
    // Section 1: HERO
    // ===========================
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Renascimento ou Aposentadoria?',
      tagline_sub: 'Tres derrotas seguidas. Um jovem faminto. A carreira de Izzy em jogo em Seattle.',
      fighter1: {
        nome_completo: 'Israel "The Last Stylebender" Adesanya',
        apelido: 'The Last Stylebender',
        sobrenome: 'Adesanya',
        record: '24-5-0',
        ranking: '#4 Peso Medio',
        info_extra: 'Auckland, Nova Zelandia | 36 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=YGc30Vwe',
      },
      fighter2: {
        nome_completo: 'Joe "Bodybagz" Pyfer',
        apelido: 'Bodybagz',
        sobrenome: 'Pyfer',
        record: '15-3-0',
        ranking: '#14 Peso Medio',
        info_extra: 'Allentown, Pennsylvania | 29 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=prLW4_bl',
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Crepusculo de um Rei</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Israel Adesanya</strong> ja foi o lutador mais dominante do peso medio do UFC. Duas vezes campeao, dono de um reinado que incluiu cinco defesas de titulo e performances que redefiniam o que era possivel no striking de MMA. Hoje, aos 36 anos, ele chega a Seattle com tres derrotas consecutivas e uma pergunta que ninguem quer fazer em voz alta: acabou?
        </p>
        <p class="mb-4">
          A queda comecou em setembro de 2023, quando Sean Strickland, um azarao massivo a +450, desmontou o reinado de Adesanya com um gameplan simples: pressao constante, jab na cara, e recusa total de dar espaco. Depois veio Dricus Du Plessis, que submeteu Izzy no quarto round no UFC 305 em Perth. E a mais recente, talvez a mais dolorosa: Nassourdine Imavov nocauteou Adesanya no segundo round na Arabia Saudita, em fevereiro de 2025. Um overhand right na mandibula, seguido de um uppercut esquerdo enquanto Izzy caia. Brutal. Rapido. Definitivo.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Bodybagz: A Nova Onda do Peso Medio</h3>
        <p class="mb-4">
          Do outro lado esta <strong class="text-blue-400">Joe Pyfer</strong>, 29 anos, apelido "Bodybagz", e com uma historia de vida que rivaliza com qualquer roteiro de filme. Cresceu numa situacao de rua em Allentown, Pennsylvania, superou uma infancia extremamente dificil, e canalizou tudo para o MMA. Hoje, com 15 vitorias (9 por nocaute, 4 por submissao), Pyfer e um dos prospectos mais perigosos do peso medio. Desde a derrota para Jack Hermansson em fevereiro de 2024, sao tres vitorias seguidas, incluindo um nocaute devastador sobre Barriault no primeiro round e uma submissao impressionante sobre Magomedov.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p class="mb-4">
          Para Adesanya, essa nao e apenas mais uma luta. E possivelmente a ultima chance de provar que ainda pertence a elite. Quatro derrotas nas ultimas cinco lutas significariam, para muitos, o sinal definitivo de que o tempo passou. Para Pyfer, a oportunidade e enorme. Vencer um ex-campeao com o nome de Adesanya, num main event de 5 rounds, e o tipo de vitoria que catapulta um lutador do #14 para o top 10. A diferenca de experiencia e absurda: Adesanya tem 13 lutas no UFC contra os melhores do mundo. Pyfer tem 7 lutas no UFC e nunca fez 5 rounds. Mas no MMA, juventude e poder bruto as vezes valem mais que curriculo.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#4 Peso Medio', fighter2: '#14 Peso Medio' },
        { dimensao: 'Sequencia', fighter1: '3 derrotas consecutivas', fighter2: '3 vitorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Encerrar sequencia negativa, provar relevancia', fighter2: 'Entrar no top 10, construir nome' },
        { dimensao: 'Narrativa', fighter1: 'Ultimo capitulo ou renascimento?', fighter2: 'O jovem que derruba a lenda' },
        { dimensao: 'Risco', fighter1: 'Quarta derrota seguida, pressao por aposentadoria', fighter2: 'Derrota em main event de 5 rounds expoe inexperiencia' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O STYLEBENDER RENASCE',
          subtitulo: 'Adesanya usa distancia, experiencia e QI de luta para dominar o jovem Pyfer',
          consequencias: [
            { tag: 'RANKING', texto: 'Adesanya se mantem no top 5 e respira na divisao. Volta a ser opcao para lutas grandes.' },
            { tag: 'LEGADO', texto: 'Narrativa de superacao: o ex-campeao que recusou desistir e voltou a vencer contra um jovem perigoso.' },
            { tag: 'DIVISAO', texto: 'Pyfer volta a ser projeto de longo prazo. Derrota nao e desastrosa pela diferenca de experiencia.' },
          ],
          proxima_luta: 'Adesanya vs um top 10 como Brendan Allen ou Caio Borralho',
        },
        fighter2_vence: {
          titulo: 'A NOVA ERA DO PESO MEDIO',
          subtitulo: 'Pyfer nocauteia o ex-campeao e entra no radar dos top 10',
          consequencias: [
            { tag: 'RANKING', texto: 'Pyfer salta para o top 8 com vitoria sobre ex-campeao em main event.' },
            { tag: 'LEGADO', texto: 'Adesanya acumula quarta derrota seguida. Pressao por aposentadoria se torna enorme.' },
            { tag: 'DIVISAO', texto: 'Pyfer se estabelece como o proximo nome a observar no peso medio, aos 29 anos.' },
          ],
          proxima_luta: 'Pyfer vs um top 5 como Nassourdine Imavov ou Robert Whittaker',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Israel Adesanya',
        color: 'red',
        recent_fights: [
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2 (socos)', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocauteado no segundo round por um overhand right seguido de uppercut. Adesanya vinha bem no primeiro round mas foi pego de forma limpa.' },
          { date: 'Ago 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Sub R4 (mata-leao)', opponent_rank: 'Campeao MW', quality_score: 5, quality_label: 'Excelente', note: 'Luta competitiva por tres rounds, Adesanya chegou a dominar com body shots no R3, mas Du Plessis conectou no R4, pegou as costas e finalizou.' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'Decisao Unanime (49-46)', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Upset historico. Strickland usou jab e pressao constante. Adesanya nao conseguiu encontrar ritmo em nenhum momento. Placares unanimes 49-46.' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Adesanya vencia nos placares quando Pereira conectou um left hook devastador no R5. Terceira derrota para Pereira contando kickboxing.' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'Decisao Unanime', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo controlada. Adesanya usou distancia e contragolpes precisos por 5 rounds sem ser ameacado.' },
        ],
        full_fight_history: [
          { date: 'Fev 2018', opponent: 'Rob Wilkinson', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC' },
          { date: 'Jun 2018', opponent: 'Marvin Vettori', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida apertada' },
          { date: 'Nov 2018', opponent: 'Derek Brunson', result: 'W', method: 'TKO R1', opponent_rank: '#9 MW', quality_score: 3, quality_label: 'Bom', note: 'TKO rapido contra veterano ranqueado' },
          { date: 'Fev 2019', opponent: 'Anderson Silva', result: 'W', method: 'UD', opponent_rank: '#15 MW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria sobre a lenda, passagem de tocha' },
          { date: 'Abr 2019', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: '#5 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Titulo interino, Luta do Ano 2019' },
          { date: 'Out 2019', opponent: 'Robert Whittaker', result: 'W', method: 'KO R2', opponent_rank: 'Campeao MW', quality_score: 5, quality_label: 'Excelente', note: 'Unificacao do titulo, KO espetacular' },
          { date: 'Mar 2020', opponent: 'Yoel Romero', result: 'W', method: 'UD', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo polemica, pouca acao' },
          { date: 'Set 2020', opponent: 'Paulo Costa', result: 'W', method: 'TKO R2', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Dominio total, Performance da Noite' },
          { date: 'Mar 2021', opponent: 'Jan Blachowicz', result: 'L', method: 'UD', opponent_rank: 'Campeao LHW', quality_score: 5, quality_label: 'Excelente', note: 'Tentativa de titulo duplo, perdeu por controle' },
          { date: 'Jun 2021', opponent: 'Marvin Vettori', result: 'W', method: 'UD', opponent_rank: '#3 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Revanche dominante' },
          { date: 'Fev 2022', opponent: 'Robert Whittaker', result: 'W', method: 'UD', opponent_rank: '#1 MW', quality_score: 5, quality_label: 'Excelente', note: 'Revanche controlada por 5 rounds' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: '#2 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Defesa de titulo solida' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Perda do titulo por TKO tardio' },
          { date: 'Abr 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao MW', quality_score: 5, quality_label: 'Excelente', note: 'Reconquista do titulo com KO no R2' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'UD', opponent_rank: '#4 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Upset historico, perda do titulo' },
          { date: 'Ago 2024', opponent: 'Dricus Du Plessis', result: 'L', method: 'Sub R4', opponent_rank: 'Campeao MW', quality_score: 5, quality_label: 'Excelente', note: 'Submetido pelo campeao' },
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2', opponent_rank: '#7 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocauteado no R2' },
        ],
        layoff_warning: 'Cerca de 13 meses desde a ultima luta (fevereiro 2025). Layoff moderado, mas vem de tres derrotas e dois nocautes recentes.',
        momentum_score: 2,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Adesanya esta no pior momento da carreira. Tres derrotas consecutivas, sendo duas por nocaute/TKO e uma por submissao. A derrota para Imavov foi particularmente preocupante porque aconteceu rapido, no segundo round, contra um oponente que nao era campeao. O chin de Adesanya, antes considerado elite, parece comprometido aos 36 anos. A unica vitoria nas ultimas cinco lutas foi o KO sobre Pereira na revanche, em abril de 2023, ha quase tres anos.',
      },
      fighter2: {
        nome: 'Joe Pyfer',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Sub R2 (face crank)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria impressionante por submissao no segundo round contra striker perigoso. Mostrou evolucao no grappling.' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou Gastelum com dois knockdowns ao longo de tres rounds. Primeira vitoria por decisao no UFC.' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1 (1:25)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute relampago no primeiro round. Poder bruto impressionante.' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'Decisao Unanime', opponent_rank: '#12 MW', quality_score: 3, quality_label: 'Bom', note: 'Primeira luta de 5 rounds, perdeu por decisao. Hermansson controlou com wrestling e experiencia. Pyfer visivelmente cansado nos rounds finais.' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2 (arm-triangle)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao tecnica no segundo round. Mostrou versatilidade alem do striking.' },
        ],
        full_fight_history: [
          { date: 'Ago 2022', opponent: 'Alen Amedovski', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC via DWCS, TKO no R1' },
          { date: 'Mar 2023', opponent: 'Gerald Meerschaert', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO rapido contra veterano do UFC' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Submissao no R2' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'UD', opponent_rank: '#12 MW', quality_score: 3, quality_label: 'Bom', note: 'Primeira derrota no UFC, 5 rounds' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO rapido' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao com 2 knockdowns' },
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submissao impressionante' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Pyfer vem de tres vitorias consecutivas desde a derrota para Hermansson, mostrando evolucao clara a cada luta. Passou de um nocauteador puro para alguem que consegue vencer por decisao (Gastelum) e submissao (Magomedov). A sequencia e contra oponentes de nivel medio, o que limita o entusiasmo, mas a evolucao tecnica e real. Aos 29 anos, esta no momento ideal de desenvolvimento.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Adesanya',
        media_oponentes: 5,
        media_oponentes_label: 'Excelente',
        aproveitamento: '13W-5L (72%)',
        contra_top5: '8W-4L',
      },
      fighter2: {
        nome: 'Pyfer',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '6W-1L (86%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Kelvin Gastelum e o unico oponente em comum relevante. Adesanya venceu Gastelum em 2019 por decisao unanime numa luta epica de 5 rounds (Luta do Ano). Pyfer venceu Gastelum em 2025 por decisao unanime com dois knockdowns. Gastelum de 2019 era um lutador completamente diferente (top 5, vindo de nocautear Bisping) comparado ao Gastelum de 2025 (sem ranking, em declinio). A comparacao direta e limitada.',
    },

    // ===========================
    // Section 5: OPONENTE COMUM
    // ===========================
    oponente_comum: {
      oponente_nome: 'Kelvin Gastelum',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '48-46, 48-46, 48-46',
        duracao: '5 rounds (25:00)',
        contexto: 'Considerada uma das melhores lutas da historia do UFC. Gastelum derrubou Adesanya no quarto round e quase finalizou. Adesanya se recuperou e dominou o quinto round para selar a vitoria pelo titulo interino. Uma guerra de 25 minutos com trocas pesadas e momentos dramaticos em cada round.',
        performance: 'Adesanya mostrou coracao enorme, capacidade de recuperacao e QI de luta elite. Venceu uma guerra real contra um Gastelum que estava no auge.',
        evento: 'UFC 236',
        data: 'Abr 2019',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: 'Placares nao disponíveis',
        duracao: '3 rounds (15:00)',
        contexto: 'Pyfer controlou a luta com pressao, derrubou Gastelum duas vezes com power shots, e venceu com clareza por tres rounds. Gastelum nao ofereceu resistencia significativa e ja estava claramente em fase descendente da carreira.',
        performance: 'Pyfer mostrou maturidade ao nao buscar o nocaute desesperadamente depois dos knockdowns, controlando o ritmo e vencendo nos pontos. Mas o nivel de Gastelum nessa fase era muito inferior ao de 2019.',
        evento: 'UFC 316',
        data: 'Jun 2025',
      },
      insight: 'A comparacao e injusta mas existe. Adesanya enfrentou um Gastelum elite em 2019, que o derrubou e quase finalizou, e venceu uma luta epica de 5 rounds. Pyfer enfrentou um Gastelum em declinio em 2025 e venceu com dois knockdowns. O contexto e completamente diferente, mas Pyfer mostrou algo que Adesanya tambem mostrou: poder para machucar Gastelum e inteligencia para nao se empolgar.',
    },

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.93, valueB: 3.72, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 41, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.11, valueB: 3.48, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 56, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.05, valueB: 1.45, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 14, valueB: 83, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 77, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.1, valueB: 0.87, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '36 anos', fighter2: '29 anos', note: 'Pyfer 7 anos mais jovem' },
        { label: 'Altura', fighter1: '1,93m (6\'4")', fighter2: '1,88m (6\'2")', note: 'Adesanya 2 polegadas mais alto' },
        { label: 'Envergadura', fighter1: '203cm (80")', fighter2: '190cm (75")', note: 'Adesanya com 5 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'City Kickboxing, Auckland', fighter2: 'Team Balance, Philadelphia', note: null },
        { label: 'Estreia UFC', fighter1: 'Fevereiro 2018', fighter2: 'Agosto 2022', note: 'Adesanya com 4+ anos a mais de experiencia UFC' },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 88, valueB: 62, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya e um dos strikers mais tecnicos da historia do UFC. Footwork, timing e variacao de angulos de nivel mundial. Pyfer e mais limitado tecnicamente, dependendo mais de poder bruto.' },
        { label: 'Poder de Nocaute', valueA: 72, valueB: 85, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Pyfer tem 9 KOs em 15 vitorias (60%). Poder one-punch real. Adesanya tem 16 KOs na carreira mas nos ultimos anos tem menos finalizacoes por nocaute.' },
        { label: 'Grappling Ofensivo', valueA: 25, valueB: 55, labelA: 'Ruim', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Adesanya quase nunca busca takedowns (0.05 por 15 min). Pyfer tem 4 submissoes na carreira e media de 1.45 TDs por 15 min. Vantagem clara no grappling ofensivo.' },
        { label: 'Defesa de Takedown', valueA: 80, valueB: 50, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Adesanya com 77% de defesa de TD na carreira. Pyfer foi dominado por Hermansson no chao, com apenas 50% de defesa.' },
        { label: 'Cardio e Resistencia', valueA: 78, valueB: 58, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Adesanya lutou 5 rounds diversas vezes e sempre manteve ritmo. Pyfer cansou visivelmente nos rounds finais contra Hermansson, sua unica luta de 5 rounds.' },
        { label: 'QI de Luta e Experiencia', valueA: 92, valueB: 48, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Adesanya tem 18 lutas no UFC contra os melhores do mundo, cinco defesas de titulo e adaptacoes mid-fight comprovadas. Pyfer tem 7 lutas no UFC contra oponentes de nivel medio.' },
      ],
      insight: 'O matchup revela uma dinamica interessante: Adesanya e superior em quase todas as areas tecnicas, especialmente striking, experiencia e cardio. Mas Pyfer leva vantagem no poder bruto e no grappling ofensivo. A grande questao nao e tecnica, e fisica: o chin de Adesanya ainda aguenta o poder de Pyfer? Tecnicamente, Adesanya deveria dominar. Fisicamente, Pyfer pode encerrar a qualquer momento.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
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
      insight: 'Dois finalizadores por natureza, mas com estilos diferentes. Adesanya construiu 67% das vitorias por nocaute ao longo da carreira, porem nao finaliza ninguem por KO no UFC desde a revanche contra Pereira em abril de 2023. Zero submissoes na carreira inteira. Pyfer e mais diversificado: 60% por KO, 27% por submissao, mostrando que pode encerrar a luta de multiplas formas. A diferenca crucial: Pyfer encerra lutas cedo (media de 7 minutos por luta), Adesanya historicamente precisa de tempo para encontrar o timing.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 8,
          danger_label: 'VANTAGEM PYFER',
          color: 'green',
          title: 'Territorio Perigoso para Adesanya',
          description: 'Os dois primeiros rounds sao onde Pyfer e mais letal. Das 9 vitorias por KO, a maioria veio nos dois primeiros rounds. Barriault caiu em 1:25 do R1. Adesanya, por outro lado, foi nocauteado por Imavov no R2 e sofreu TKO de Pereira no R5 quando foi pego. O chin de Adesanya esta sob questao, e Pyfer traz o tipo de poder que pode explorar essa fraqueza cedo. Se Adesanya sobreviver os primeiros 10 minutos sem ser abalado, a dinamica muda completamente.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Transicao',
          description: 'O terceiro round e onde a experiencia comeca a pesar. Pyfer nunca venceu uma luta que chegou ao R3, exceto por decisao contra Gastelum. Adesanya, apesar da fase ruim, tem centenas de minutos de experiencia em championship distance. Se ambos chegarem ao R3 sem danos significativos, o round funciona como ponto de transicao, com Adesanya comecando a encontrar o timing e Pyfer comecando a gastar energia.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM ADESANYA',
          color: 'red',
          title: 'Championship Rounds: Territorio do Veterano',
          description: 'Os rounds finais sao onde a experiencia de Adesanya se torna arma. Pyfer perdeu sua unica luta de 5 rounds (Hermansson) e visivelmente cansou nos rounds finais. Adesanya lutou 5 rounds sete vezes no UFC e sempre manteve ritmo. Se a luta chegar aqui sem nocaute, Adesanya sera o grande favorito, com mais gas, mais experiencia e capacidade de encontrar aberturas contra um oponente cansado.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'AlertTriangle', title: 'Chin Comprometido', fighter: 'Adesanya', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Adesanya foi nocauteado/TKO em duas das ultimas tres lutas (Pereira R5, Imavov R2). Aos 36 anos, a capacidade de absorver impacto diminui naturalmente. Contra o poder de Pyfer, isso e a maior preocupacao da luta.' },
        { icon: 'Clock', title: 'Layoff de 13 Meses', fighter: 'Adesanya', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Adesanya nao luta desde fevereiro de 2025. Para um lutador de 36 anos vindo de nocaute, o layoff pode afetar timing e reflexos. Porem, tambem deu tempo de recuperacao fisica e mental.' },
        { icon: 'TrendingUp', title: 'Tres Vitorias Seguidas com Evolucao', fighter: 'Pyfer', risk_level: 'POSITIVO', risk_color: 'green', description: 'Pyfer vem em sequencia ascendente: KO, decisao e submissao nas ultimas tres. A diversificacao de metodos mostra maturidade e evolucao real do game.' },
        { icon: 'Brain', title: 'Experiencia em Main Events', fighter: 'Adesanya', risk_level: 'POSITIVO', risk_color: 'green', description: 'Adesanya ja fez 12 main events no UFC, incluindo lutas de titulo contra os melhores do mundo. Pyfer nunca lutou um main event no UFC. A pressao de ser a luta principal de 5 rounds contra um nome como Adesanya e completamente nova para ele.' },
        { icon: 'Zap', title: 'Poder de Nocaute de Pyfer', fighter: 'Pyfer', risk_level: 'POSITIVO', risk_color: 'green', description: 'Pyfer quebrou o recorde de Francis Ngannou na maquina de soco, segundo relatos. Com 60% das vitorias por KO, ele traz poder de one-punch knockout que pode encerrar a luta a qualquer momento, especialmente contra um chin questionado.' },
        { icon: 'Activity', title: 'Cardio em 5 Rounds', fighter: 'Pyfer', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'A unica vez que Pyfer lutou 5 rounds (Hermansson), ele perdeu e visivelmente cansou. Contra o ritmo de Adesanya em championship rounds, a fadiga pode ser fator decisivo.' },
        { icon: 'Shield', title: 'Vantagem de Envergadura', fighter: 'Adesanya', risk_level: 'POSITIVO', risk_color: 'green', description: 'Adesanya tem 5 polegadas de vantagem na envergadura (80" vs 75"). Em luta de striking puro, isso permite controlar a distancia e conectar jabs e front kicks sem entrar no raio de perigo de Pyfer.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Adesanya',
        total_probability: 52,
        scenarios: [
          { name: 'Aula de Distancia', probability: 28, method: 'Decisao Unanime', description: 'Adesanya usa a envergadura de 80 polegadas para manter Pyfer na ponta, conecta jabs, front kicks e contragolpes. Frustra o jovem com movimento e leva uma decisao clara, especialmente nos rounds finais quando o cardio de Pyfer cai.' },
          { name: 'Counter Strike Mortal', probability: 14, method: 'KO/TKO R3-R5', description: 'Pyfer avanca agressivamente, Adesanya encontra o timing no contragolpe (left hook ou check hook) e encerra quando o jovem estiver cansado e menos defensivo nos rounds intermediarios ou finais.' },
          { name: 'Dominio nos Championship Rounds', probability: 10, method: 'Decisao Dividida', description: 'Luta equilibrada nos primeiros rounds, com Pyfer vencendo alguns momentos. Mas Adesanya assume controle no R4-R5 quando a experiencia e o cardio fazem diferenca, vencendo uma decisao apertada.' },
        ],
      },
      fighter2: {
        nome: 'Pyfer',
        total_probability: 45,
        scenarios: [
          { name: 'Bomba nos Rounds Iniciais', probability: 22, method: 'KO/TKO R1-R2', description: 'Pyfer fecha a distancia cedo, absorve alguns jabs, e conecta um power shot na mandibula de Adesanya. Com o chin questionado do veterano, um unico golpe limpo pode acabar com tudo nos primeiros 10 minutos.' },
          { name: 'Pressao e Acumulo', probability: 13, method: 'TKO R2-R3', description: 'Pyfer mantem pressao constante, similar ao que Strickland fez. Empurra Adesanya para a grade, mistura socos e clinch, e acumula dano ate o arbitro intervir.' },
          { name: 'Versatilidade no Chao', probability: 10, method: 'Submissao R2-R3', description: 'Pyfer surpreende com um takedown, usa o grappling que mostrou contra Magomedov e Alhassan, e encontra uma submissao. Adesanya tem zero experiencia em lutas no chao ofensivamente e pode ser vulneravel se posto de costas.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Israel Adesanya',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Essa e uma luta dificil de prever com confianca alta. Adesanya, mesmo aos 36 anos e vindo de tres derrotas, possui vantagens tecnicas claras sobre Pyfer: melhor striking, mais experiencia, melhor cardio, e 5 polegadas de vantagem na envergadura. O salto de qualidade dos oponentes que Pyfer enfrentou (Gastelum em declinio, Barriault, Magomedov) para Adesanya e enorme. Porem, o chin de Adesanya e a maior incognita. Se estivesse intacto, essa seria uma previsao de alta confianca. Como nao esta, Pyfer tem um caminho real para a vitoria com seu poder de nocaute. Prevejo Adesanya usando distancia e experiencia para controlar a luta, especialmente nos rounds finais, mas com risco real de ser nocauteado nos primeiros dois rounds.',
      x_factor: {
        title: 'A Envergadura de 5 Polegadas',
        description: 'Adesanya tem 80 polegadas de envergadura contra 75 de Pyfer. Em numeros de UFC, essa e uma vantagem massiva. Se Adesanya usar jabs, front kicks e side kicks para manter distancia, Pyfer vai ter dificuldade enorme para entrar no raio de alcance. Toda a luta pode ser decidida por essa diferenca fisica.',
      },
      upset_alert: {
        title: 'O Chin de Vidro?',
        description: 'Se Pyfer conectar um power shot limpo nos primeiros dois rounds, especialmente um overhand ou left hook, Adesanya pode ir ao chao. Dois TKOs nas ultimas tres lutas nao mentem. Pyfer nao precisa de muitas chances, precisa de uma.',
      },
      probabilities: {
        fighter1: { nome: 'Adesanya', percent: 52 },
        fighter2: { nome: 'Pyfer', percent: 45 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Pyfer (+110)', reasoning: 'Se as odds se mantiverem nessa faixa, Pyfer como azarao leve oferece valor real dado o poder de nocaute e o chin questionado de Adesanya.' },
        method: { pick: 'Luta vai para decisao', reasoning: 'Apesar de ambos terem poder de nocaute, Adesanya historicamente favorece lutas longas (8 decisoes em 24 vitorias) e a envergadura pode manter distancia.' },
        over_under: { pick: 'Under 4.5 rounds', rounds: 4.5, reasoning: 'Adesanya foi finalizado em duas das ultimas tres lutas. Pyfer finaliza a maioria das lutas cedo. A probabilidade de finalizacao e maior que o normal.' },
        best_value: 'Pyfer dentro da distancia (+250 estimado) oferece o melhor valor. Se Pyfer vencer, provavelmente sera por nocaute nos primeiros rounds.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'O Jab e o Front Kick de Adesanya nos Primeiros 2 Minutos', icon: 'Target', description: 'Se Adesanya comecar a luta usando jab e front kick para manter distancia, e sinal de que o gameplan esta funcionando. Se Pyfer conseguir fechar distancia facilmente nesses primeiros minutos, a luta esta no territorio dele. Preste atencao na envergadura: Adesanya precisa usa-la ou vai desperdicar sua maior arma.' },
        { num: 2, title: 'A Reacao de Adesanya ao Primeiro Golpe Duro', icon: 'Shield', description: 'O momento mais revelador da luta sera quando Pyfer conectar o primeiro power shot limpo. A reacao do chin de Adesanya vai ditar tudo. Se ele absorver bem, a confianca sobe e ele pode dominar. Se balancear, Pyfer vai sentir o sangue e vir com tudo.' },
        { num: 3, title: 'O Gas de Pyfer no R3', icon: 'Activity', description: 'Pyfer cansou contra Hermansson nos rounds finais. Se a luta chegar ao terceiro round, observe o volume de strikes e a postura de Pyfer. Se as maos comecarem a baixar e o footwork ficar pesado, Adesanya vai capitalizar.' },
        { num: 4, title: 'Pyfer Tentando Takedowns', icon: 'Crosshair', description: 'Pyfer tem 83% de precisao de takedown e 1.45 por 15 minutos. Se ele misturar takedowns com striking, pode quebrar o ritmo de Adesanya de uma forma que strikers puros como Cannonier nao conseguiram. Fique atento a quando e como Pyfer muda de nivel.' },
        { num: 5, title: 'A Linguagem Corporal de Adesanya Entre Rounds', icon: 'Brain', description: 'Um Adesanya que esta se divertindo, dancando e provocando e um Adesanya perigoso. Um Adesanya quieto, sentando no banco e respirando pesado e sinal de que a idade esta pesando. A linguagem corporal entre rounds vai contar a historia real.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'MAIN EVENT SEATTLE', content: 'ADESANYA vs PYFER\nUFC Fight Night | 28 de Marco\nClimate Pledge Arena, Seattle\n\n3 derrotas seguidas vs 3 vitorias seguidas\nO ex-campeao luta pela sobrevivencia.', color: 'red' },
        { slide_number: 2, title: 'ADESANYA: OS NUMEROS', content: '#4 do ranking peso medio\n24-5 na carreira (16 KOs)\n2x campeao do UFC\n5 defesas de titulo\n3.93 sig. strikes por minuto\n80" de envergadura\nMAS: 3 derrotas seguidas\n2 nocautes sofridos nas ultimas 3', color: 'red' },
        { slide_number: 3, title: 'PYFER: BODYBAGZ', content: '#14 do ranking peso medio\n15-3 na carreira (9 KOs, 4 subs)\n3 vitorias seguidas\n60% de finalizacao por nocaute\n83% de precisao de takedown\n29 anos, em plena ascensao\nQuerou o recorde de Ngannou na maquina de soco', color: 'blue' },
        { slide_number: 4, title: 'A GRANDE QUESTAO', content: 'O CHIN DE ADESANYA\n\nImavov: TKO R2 (Fev 2025)\nDu Plessis: Sub R4 (Ago 2024)\nStrickland: UD (Set 2023)\nPereira: TKO R5 (Nov 2022)\n\n1 vitoria nas ultimas 5 lutas\nO tempo passou?\nOu o Stylebender ainda vive?', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'ADESANYA por Decisao Unanime\n\nConfianca: MEDIA\n52% Adesanya / 45% Pyfer\n\nA envergadura e a experiencia\ndevem controlar a distancia.\nMas um unico soco de Pyfer\npode mudar tudo.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Adesanya vs Pyfer sabado em Seattle. O ex-campeao mais dominante do peso medio na ultima decada, com 3 derrotas seguidas, contra o jovem nocauteador de 29 anos. A analise completa:' },
        { num: '2/6', text: 'O numero que define essa luta: 5 POLEGADAS. Adesanya tem 80" de envergadura. Pyfer tem 75". Se Izzy usar essa vantagem com jab e front kick, Pyfer vai passar a noite tentando entrar no raio de alcance. A distancia e tudo.' },
        { num: '3/6', text: 'A outra face da moeda: Adesanya foi nocauteado/TKO em 2 das ultimas 3 lutas. Aos 36 anos, o chin nao e o mesmo. Pyfer tem 9 KOs em 15 vitorias e poder de one-punch. Basta UMA entrada limpa.' },
        { num: '4/6', text: 'Detalhe que ninguem fala: Pyfer tem 83% de precisao de takedown e 4 submissoes na carreira. Ele nao e apenas um nocauteador. Se misturar takedowns com striking, pode quebrar o ritmo de Adesanya de um jeito novo.' },
        { num: '5/6', text: 'O problema de Pyfer: nunca venceu uma luta que passou do R2 por finalizacao. Contra Hermansson (5 rounds), cansou e perdeu. Adesanya ja fez 7 lutas de 5 rounds no UFC. Championship rounds = territorio do veterano.' },
        { num: '6/6', text: 'Minha pick: Adesanya por decisao, mas com confianca MEDIA. A envergadura, a experiencia e os championship rounds favorecem Izzy. Mas Pyfer dentro da distancia nos R1-R2 e a aposta de valor do card. Uma luta que pode acabar a qualquer segundo.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Israel Adesanya era o cara mais dominante do peso medio. Cinco defesas de titulo. Striking de outro planeta. Hoje, tres derrotas seguidas e uma pergunta: acabou? Sabado em Seattle, ele precisa responder contra Joe Pyfer.' },
        { time: '10-25s', title: 'Contexto', text: 'Adesanya tem 36 anos, 24-5, e foi nocauteado duas vezes nas ultimas tres lutas. O chin nao e o mesmo. Pyfer tem 29 anos, 15-3, nove KOs e esta em ascensao com tres vitorias seguidas. A diferenca de envergadura e de 5 polegadas a favor de Izzy. Mas Pyfer traz poder para compensar.' },
        { time: '25-40s', title: 'Analise Tecnica', text: 'A chave da luta: distancia. Se Adesanya manter Pyfer na ponta com jab e front kick, ele domina. Tem mais tecnica, mais experiencia, melhor cardio. Mas se Pyfer fechar a distancia e conectar, o chin de Adesanya esta vulneravel. Imavov provou isso em fevereiro. Dois cenarios completamente diferentes dependendo de quem controla o espaco.' },
        { time: '40-55s', title: 'Championship Rounds', text: 'Aqui esta o fator decisivo: Pyfer nunca venceu uma luta que passou do R2 por finalizacao. Contra Hermansson em 5 rounds, ele cansou e perdeu. Adesanya ja fez sete lutas de 5 rounds no UFC. Se chegar ao R4 sem nocaute, Izzy e o grande favorito.' },
        { time: '55-70s', title: 'Previsao e Valor', text: 'Minha call: Adesanya por decisao, confianca media. Mas Pyfer dentro da distancia nos rounds iniciais e a aposta de valor. Se voce acredita que o chin de Izzy esta feito, Pyfer por KO R1-R2 paga bem. A luta mais imprevisivel do card.' },
      ],
      tiktok: [
        { hook: 'Adesanya com TRES derrotas seguidas. O cara que era INTOCAVEL no peso medio.', body: 'Strickland por decisao. Du Plessis por submissao. Imavov por nocaute no R2. Tres formas diferentes de perder. Agora enfrenta Joe Pyfer, 29 anos, 9 KOs em 15 lutas, que quebrou o recorde de Ngannou na maquina de soco. O chin de Adesanya aguenta?', cta: 'Comenta IZZY ou PYFER!' },
        { hook: 'CINCO polegadas. Essa e a diferenca que pode salvar Adesanya.', body: 'Adesanya tem 80 polegadas de envergadura. Pyfer tem 75. Sao 5 polegadas. Se Izzy usar jab e front kick pra manter distancia, Pyfer NUNCA entra. Mas se Pyfer fechar, basta UM soco na mandibula. Duas realidades completamente diferentes.', cta: 'Quem controla a distancia? Comenta!' },
        { hook: 'Pyfer NUNCA venceu uma luta que passou do R2 por finalizacao.', body: 'Contra Hermansson em 5 rounds, Pyfer CANSOU e perdeu. Adesanya ja fez SETE lutas de 5 rounds no UFC. Se chegar ao quarto round sem nocaute, Izzy domina. Mas Pyfer so precisa de um momento. UM soco. E com o chin de Adesanya questionado, esse momento pode vir a qualquer segundo.', cta: 'Vai pro nocaute ou pra decisao? Comenta!' },
      ],
      headlines: [
        'Adesanya vs Pyfer: Renascimento ou Aposentadoria do Stylebender em Seattle?',
        'O Chin de Adesanya Contra o Poder de Pyfer: A Luta Que Define uma Carreira',
        '5 Polegadas de Vantagem: Por Que a Envergadura Pode Salvar Adesanya',
        'De 3 Derrotas Seguidas a Main Event: O Dilema de Israel Adesanya',
        'Pyfer Bodybagz: O Nocauteador que Pode Aposentar Adesanya',
        'UFC Seattle: Por Que Pyfer por KO e a Aposta de Valor do Card',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-130',
        fighter2_odds: '+110',
        fighter1_name: 'Israel Adesanya',
        fighter2_name: 'Joe Pyfer',
        source: 'Media de DraftKings e casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Shield', titulo: 'Vantagem de Envergadura Massiva', stat_headline: '80" VS 75": 5 POLEGADAS DE DIFERENCA', contexto: 'Adesanya tem uma das maiores envergaduras do peso medio. Contra um oponente com bracos curtos como Pyfer, essa vantagem permite controlar distancia com jab e front kick de forma eficiente.', implicacao_aposta: 'Favorece Adesanya por decisao e Over em rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Chin Comprometido de Adesanya', stat_headline: '2 TKO/KOS SOFRIDOS NAS ULTIMAS 3 LUTAS', contexto: 'Adesanya foi finalizado por Pereira (TKO R5) e Imavov (TKO R2). Aos 36 anos, a absorcao de impacto diminui. Contra o poder de one-punch de Pyfer, e o maior fator de risco.', implicacao_aposta: 'Favorece Pyfer dentro da distancia. Props de KO/TKO Pyfer R1-R2 tem valor.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Cardio em 5 Rounds', stat_headline: 'PYFER PERDEU SUA UNICA LUTA DE 5 ROUNDS (HERMANSSON)', contexto: 'Pyfer visivelmente cansou nos rounds finais contra Hermansson. Adesanya ja fez 7 lutas de 5 rounds no UFC. Se a luta passar do R3, a vantagem de cardio e experiencia de Adesanya cresce exponencialmente.', implicacao_aposta: 'Over 2.5 rounds favorece Adesanya significativamente.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Grappling Ofensivo de Pyfer', stat_headline: '83% DE PRECISAO DE TAKEDOWN, 4 SUBMISSOES NA CARREIRA', contexto: 'Pyfer nao e apenas um nocauteador. Tem 4 submissoes e alta precisao de takedowns. Pode misturar niveis e quebrar o ritmo de striking de Adesanya de um jeito que strikers puros nao conseguiram.', implicacao_aposta: 'Pyfer por submissao e uma aposta de valor oculto.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Layoff e Idade de Adesanya', stat_headline: '13 MESES SEM LUTAR, 36 ANOS, VINDO DE KO', contexto: 'Combinacao preocupante. Lutadores que voltam de nocaute apos layoff longo aos 36 anos historicamente tem performance reduzida. O timing e os reflexos podem nao ser os mesmos.', implicacao_aposta: 'Adiciona risco a Adesanya como favorito. Linha de -130 pode nao refletir o risco real.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Pyfer por KO/TKO', odds: '+250 (estimado)', confianca: 'media', edge_vs_mercado: 'Chin de Adesanya comprometido + poder de Pyfer = probabilidade real maior que as odds sugerem.', raciocinio: 'Se Pyfer vencer, a probabilidade de ser por nocaute nos primeiros rounds e altissima. O chin de Adesanya foi testado e falhou duas vezes recentemente. A +250, o retorno compensa o risco.' },
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-140 (estimado)', confianca: 'media', edge_vs_mercado: 'Apesar dos KOs recentes de Adesanya, ele tende a comecar lutas devagar.', raciocinio: 'Adesanya e um counter-striker que precisa de tempo para encontrar o timing. Pyfer, apesar do poder, pode demorar para fechar a distancia contra a envergadura. Provavel que os primeiros rounds sejam de estudo.' },
        { tipo: 'Duracao', pick: 'Nao vai para decisao', odds: '+120 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Adesanya foi finalizado em 2 das ultimas 3 lutas. Pyfer finaliza 87% das vitorias.', raciocinio: 'Historicamente, lutas de Adesanya iam para decisao. Mas a fase atual sugere que ele esta mais vulneravel a finalizacoes. Com Pyfer trazendo poder e grappling, a chance de finalizacao e maior que o historico sugere.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Adesanya por KO',
        descricao: 'O ultimo nocaute de Adesanya no UFC foi contra Alex Pereira em abril de 2023, ha quase tres anos. Nas ultimas lutas, o poder ofensivo de finalizacao diminuiu visivelmente. Apostar em Adesanya por KO e jogar contra a tendencia recente. Se Adesanya vencer, provavelmente sera por decisao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  const analise = analisePT;
  return <FullAnalysisView analise={analise} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
