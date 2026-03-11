import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'adesanya-vs-pyfer',
  evento_id: null,
  slug: 'adesanya-vs-pyfer',
  titulo: 'Adesanya vs Pyfer: Legado Contra a Nova Geracao',
  subtitulo: 'Pela primeira vez na carreira, o ex-campeao entra como azarao',
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
    predictedMethod: 'TKO ou Decisao',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Israel Adesanya',
    record: '24-5-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Joe Pyfer',
    record: '15-3-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night 271',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle',
  categoria_peso: 'Peso Medio',
  num_rounds: 5,
  is_titulo: false,
  broadcast: 'ESPN+',
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 sections)
  // ===========================
  full_analysis: {
    // ─────────────────────────────────────────────
    // SECTION 1: HERO
    // ─────────────────────────────────────────────
    hero: {
      evento_nome: 'UFC Fight Night 271',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle',
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Legado Contra a Nova Geracao',
      tagline_sub: 'Pela primeira vez na carreira do UFC, o Stylebender entra como azarao',
      fighter1: {
        nome_completo: 'Israel "The Last Stylebender" Adesanya',
        apelido: 'The Last Stylebender',
        sobrenome: 'Adesanya',
        record: '24-5-0',
        ranking: '#5 Peso Medio',
        info_extra: 'Auckland, Nova Zelandia | 36 anos',
        imagem_fullbody_url: 'https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=WnxcXwhi',
      },
      fighter2: {
        nome_completo: 'Joe "Bodybagz" Pyfer',
        apelido: 'Bodybagz',
        sobrenome: 'Pyfer',
        record: '15-3-0',
        ranking: '#14 Peso Medio',
        info_extra: 'Vineland, New Jersey | 29 anos',
        imagem_fullbody_url: 'https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=pKlOTvM6',
      },
    },

    // ─────────────────────────────────────────────
    // SECTION 2: NARRATIVA
    // ─────────────────────────────────────────────
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">A Queda do Rei</h3>
        <p class="mb-4">
          Existe um momento na carreira de todo grande campeao em que a pergunta deixa de ser "quem pode derrota-lo?" e passa a ser "ele ainda consegue competir no mais alto nivel?". Para <strong class="text-ufc-red">Adesanya</strong>, esse momento chegou. O homem que dominou a divisao dos peso medio por quase quatro anos, acumulando cinco defesas de titulo consecutivas, agora entra no octogono com tres derrotas nas ultimas quatro lutas, todas por finalizacao ou nocaute.
        </p>
        <p class="mb-4">
          A derrota para Strickland em setembro de 2023 foi um choque. A finalizacao por Du Plessis em agosto de 2024 foi um alerta. Mas o nocaute rapido por Imavov em fevereiro de 2025, em apenas 30 segundos do segundo round, foi o momento que fez o mundo do MMA questionar abertamente se o Stylebender ainda tem o que e preciso.
        </p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Ascensao do Bodybagz</h3>
        <p class="mb-4">
          Do outro lado esta <strong class="text-blue-400">Pyfer</strong>, o tipo de lutador que o UFC adora promover: jovem, violento e com um apelido que combina com seu estilo. Aos 29 anos, o cara de New Jersey vem de tres vitorias consecutivas, incluindo duas finalizacoes que renderam bonus de Performance da Noite. Sua vitoria sobre Magomedov no UFC 320, finalizando com um face crank no segundo round, mostrou uma evolucao no jogo de chao que poucos esperavam.
        </p>
        <p class="mb-4">
          A decisao de colocar <strong class="text-blue-400">Pyfer</strong> contra <strong class="text-ufc-red">Adesanya</strong> no main event e uma aposta calculada do UFC. Se Pyfer vence, voce tem um novo nome na elite dos medios. Se Adesanya vence, o ex-campeao prova que ainda tem combustivel no tanque. De qualquer forma, e uma grande historia.
        </p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Elefante na Sala</h3>
        <p class="mb-4">
          O fato mais impressionante dessa luta: em 18 aparicoes no UFC, <strong class="text-ufc-red">Adesanya</strong> nunca foi azarao. Ate agora. As casas de apostas abriram com pick'em e rapidamente moveram as linhas para <strong class="text-blue-400">Pyfer</strong> como favorito. Isso nao e apenas um numero: e o mercado dizendo que a era Adesanya pode ter acabado.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#5, precisa de vitoria para manter relevancia', fighter2: '#14, busca salto gigante no ranking' },
        { dimensao: 'Objetivo', fighter1: 'Provar que ainda compete no topo', fighter2: 'Entrar no top 10 e se estabelecer como ameaca real' },
        { dimensao: 'Narrativa', fighter1: 'Ultima chance? Ou a volta por cima?', fighter2: 'O jovem que derrubou a lenda' },
        { dimensao: 'Risco', fighter1: 'Quarta derrota em cinco lutas pode significar aposentadoria', fighter2: 'Derrota nao e catastrofica mas atrasa muito a evolucao' },
        { dimensao: 'Legado', fighter1: 'Hall of Famer protegendo sua historia', fighter2: 'Construindo a base da sua carreira' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A RESSURREICAO DO STYLEBENDER',
          subtitulo: 'Adesanya silencia os criticos com uma atuacao vintage',
          consequencias: [
            { tag: 'RANKING', texto: 'Adesanya permanece no top 5 e volta a ser mencionado em conversas de titulo' },
            { tag: 'LEGADO', texto: 'A narrativa muda completamente: o ex-campeao provou que ainda tem gasolina no tanque' },
            { tag: 'MONEY FIGHT', texto: 'Possibilidade de luta contra outro nome grande como Strickland ou Whittaker em evento numerado' },
          ],
          proxima_luta: 'Revanche contra Strickland ou luta contra outro top 5 no segundo semestre de 2026',
        },
        fighter2_vence: {
          titulo: 'A COROACAO DO BODYBAGZ',
          subtitulo: 'Pyfer confirma que e a nova geracao dos peso medio',
          consequencias: [
            { tag: 'RANKING', texto: 'Pyfer salta para o top 8, possivelmente top 5 com uma vitoria sobre ex-campeao' },
            { tag: 'TITULO', texto: 'Com quatro vitorias consecutivas e um scalp de lenda, Pyfer entra na conversa de eliminatoria' },
            { tag: 'LEGADO', texto: 'A carreira de Adesanya entra em territorio critico, aposentadoria pode ser a proxima conversa' },
          ],
          proxima_luta: 'Luta contra um top 5 como Whittaker, Strickland ou o vencedor de Du Plessis vs proximo desafiante',
        },
      },
    },

    // ─────────────────────────────────────────────
    // SECTION 3: MOMENTO ATUAL
    // ─────────────────────────────────────────────
    momento_atual: {
      fighter1: {
        nome: 'Israel Adesanya',
        color: 'red',
        recent_fights: [
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2', opponent_rank: '#5 MW', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteado em apenas 30 segundos do segundo round. Performance alarmante.' },
          { date: 'Ago 2024', opponent: 'Dricus du Plessis', result: 'L', method: 'Sub R4', opponent_rank: 'Campeao', quality_score: 2, quality_label: 'Medio', note: 'Disputou o titulo mas foi finalizado com face crank no quarto round.' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'Decisao Unanime', opponent_rank: '#4 MW', quality_score: 2, quality_label: 'Medio', note: 'Perdeu o titulo de forma convincente, sem conseguir impor seu jogo.' },
          { date: 'Abr 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Nocaute espetacular na revanche, recuperou o cinturao com um KO memoravel.' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 2, quality_label: 'Medio', note: 'Estava vencendo a luta ate ser parado no quinto round.' },
        ],
        full_fight_history: [
          { date: 'Mar 2012', opponent: 'James Griffiths', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Estreia profissional' },
          { date: 'Jun 2013', opponent: 'John Vake', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Nocaute rapido' },
          { date: 'Ago 2015', opponent: 'Song Kenan', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Head kick finish' },
          { date: 'Set 2015', opponent: 'Maui Tuigamala', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 3, note: 'Nocaute limpo' },
          { date: 'Set 2015', opponent: 'Gele Qing', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, note: 'Nocaute no segundo round' },
          { date: 'Jan 2016', opponent: 'Vladimir Katykhin', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, note: 'Parada medica' },
          { date: 'Mar 2016', opponent: 'Dibir Zagirov', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, note: 'Finalizacao por socos' },
          { date: 'Mai 2016', opponent: 'Andrew Flores Smith', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Corner stoppage' },
          { date: 'Mai 2016', opponent: 'Murad Kuramagomedov', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, note: 'Finalizacao por socos' },
          { date: 'Jul 2017', opponent: 'Melvin Guillard', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Vitoria sobre veterano' },
          { date: 'Nov 2017', opponent: 'Stuart Dare', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Head kick nocaute' },
          { date: 'Fev 2018', opponent: 'Rob Wilkinson', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 4, note: 'Estreia dominante no UFC' },
          { date: 'Abr 2018', opponent: 'Marvin Vettori', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 3, note: 'Decisao dividida apertada' },
          { date: 'Jul 2018', opponent: 'Brad Tavares', result: 'W', method: 'UD', opponent_rank: '#9 MW', quality_score: 4, note: 'Dominio total em 5 rounds' },
          { date: 'Nov 2018', opponent: 'Derek Brunson', result: 'W', method: 'TKO R1', opponent_rank: '#5 MW', quality_score: 5, note: 'Nocaute rapido contra top 5' },
          { date: 'Fev 2019', opponent: 'Anderson Silva', result: 'W', method: 'UD', opponent_rank: '#15 MW', quality_score: 4, note: 'Vitoria sobre a lenda' },
          { date: 'Abr 2019', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: '#5 MW', quality_score: 5, note: 'FOTY, guerra epica de 5 rounds, titulo interino' },
          { date: 'Out 2019', opponent: 'Robert Whittaker', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, note: 'Unificou os cinturoes com nocaute devastador' },
          { date: 'Mar 2020', opponent: 'Yoel Romero', result: 'W', method: 'UD', opponent_rank: '#1 MW', quality_score: 2, note: 'Vitoria controversa e pouco movimentada' },
          { date: 'Set 2020', opponent: 'Paulo Costa', result: 'W', method: 'TKO R2', opponent_rank: '#1 MW', quality_score: 5, note: 'Dominio absoluto e finalizacao' },
          { date: 'Mar 2021', opponent: 'Jan Blachowicz', result: 'L', method: 'UD', opponent_rank: 'Campeao LHW', quality_score: 2, note: 'Tentativa de titulo no meio-pesado falhou' },
          { date: 'Jun 2021', opponent: 'Marvin Vettori', result: 'W', method: 'UD', opponent_rank: '#3 MW', quality_score: 4, note: 'Dominou a revanche por 5 rounds' },
          { date: 'Fev 2022', opponent: 'Robert Whittaker', result: 'W', method: 'UD', opponent_rank: '#1 MW', quality_score: 4, note: 'Vitoria convincente na revanche' },
          { date: 'Jul 2022', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: '#2 MW', quality_score: 3, note: 'Defesa de titulo segura mas sem brilho' },
          { date: 'Nov 2022', opponent: 'Alex Pereira', result: 'L', method: 'TKO R5', opponent_rank: '#4 MW', quality_score: 2, note: 'Perdeu o titulo quando estava vencendo' },
          { date: 'Abr 2023', opponent: 'Alex Pereira', result: 'W', method: 'KO R2', opponent_rank: 'Campeao', quality_score: 5, note: 'Nocaute espetacular na revanche' },
          { date: 'Set 2023', opponent: 'Sean Strickland', result: 'L', method: 'UD', opponent_rank: '#4 MW', quality_score: 2, note: 'Derrotado de forma clara em 5 rounds' },
          { date: 'Ago 2024', opponent: 'Dricus du Plessis', result: 'L', method: 'Sub R4', opponent_rank: 'Campeao', quality_score: 2, note: 'Finalizado no quarto round' },
          { date: 'Fev 2025', opponent: 'Nassourdine Imavov', result: 'L', method: 'TKO R2', opponent_rank: '#5 MW', quality_score: 1, note: 'Nocauteado rapidamente' },
        ],
        layoff_warning: 'Mais de 13 meses entre a luta com Imavov (fev 2025) e esta luta (mar 2026). Layoff significativo para um lutador de 36 anos.',
        momentum_score: 3,
        momentum_label: 'Em Declinio',
        momentum_trend: 'descending',
        momentum_note: 'Adesanya vive o pior momento da sua carreira. Tres derrotas nas ultimas quatro lutas, todas por finalizacao ou nocaute, indicam um declinio real nas capacidades fisicas e competitivas. A unica vitoria nesse periodo foi o icônico KO sobre Pereira em abril de 2023, mas desde entao sao tres derrotas consecutivas. O layoff de 13 meses pode ser positivo para recuperacao fisica, mas a inatividade traz riscos proprios para um lutador que completa 37 anos em julho.',
      },
      fighter2: {
        nome: 'Joe Pyfer',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 5, quality_label: 'Excelente', note: 'Finalizou com face crank no segundo round. Performance of the Night.' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'Decisao Unanime', opponent_rank: '#15 MW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida com dois knockdowns, mostrou evolucao na luta em pe.' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocaute devastador no primeiro round. Performance of the Night.' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'Decisao Unanime', opponent_rank: '#8 MW', quality_score: 2, quality_label: 'Medio', note: 'Superado no grappling por um lutador mais experiente no chao.' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Muito Bom', note: 'Finalizou com arm-triangle choke, deixando o oponente inconsciente.' },
        ],
        full_fight_history: [
          { date: 'Set 2022', opponent: 'Alen Amedovski', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Estreia dominante no UFC' },
          { date: 'Abr 2023', opponent: 'Gerald Meerschaert', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 3, note: 'Nocaute no primeiro round' },
          { date: 'Out 2023', opponent: 'Abdul Razak Alhassan', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 4, note: 'Arm-triangle choke dominante' },
          { date: 'Fev 2024', opponent: 'Jack Hermansson', result: 'L', method: 'UD', opponent_rank: '#8 MW', quality_score: 2, note: 'Superado no grappling' },
          { date: 'Jun 2024', opponent: 'Marc-Andre Barriault', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 4, note: 'Nocaute devastador, POTN' },
          { date: 'Jun 2025', opponent: 'Kelvin Gastelum', result: 'W', method: 'UD', opponent_rank: '#15 MW', quality_score: 3, note: 'Decisao com 2 knockdowns' },
          { date: 'Out 2025', opponent: 'Abusupiyan Magomedov', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 5, note: 'Face crank, Performance of the Night' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Pyfer esta no melhor momento da sua carreira. Tres vitorias consecutivas com duas finalizacoes e uma decisao dominante mostram um lutador em plena evolucao. A diversidade nos metodos de vitoria (KO, decisao, finalizacao) indica maturidade tatica. Apenas 5 meses de inatividade desde a ultima luta, tempo ideal para preparacao. A unica preocupacao e que nunca enfrentou um oponente do calibre de Adesanya.',
      },
    },

    // ─────────────────────────────────────────────
    // SECTION 4: NIVEL DE COMPETICAO
    // ─────────────────────────────────────────────
    nivel_competicao: {
      fighter1: {
        nome: 'Adesanya',
        media_oponentes: 5,
        media_oponentes_label: 'Excelente',
        aproveitamento: '1W-4L (20%)',
        contra_top5: '7W-4L',
      },
      fighter2: {
        nome: 'Pyfer',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos derrotaram Kelvin Gastelum por decisao unanime, mas em contextos completamente diferentes. Adesanya enfrentou um Gastelum no auge, em uma luta que ganhou o premio de Luta do Ano em 2019. Pyfer venceu um Gastelum em declinio em 2025. A comparacao direta e limitada, mas mostra que ambos tem capacidade de vencer por decisao quando necessario.',
    },

    // ─────────────────────────────────────────────
    // SECTION 5: OPONENTE COMUM (Kelvin Gastelum)
    // ─────────────────────────────────────────────
    oponente_comum: {
      oponente_nome: 'Kelvin Gastelum',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '48-46, 48-46, 48-46',
        duracao: '5 rounds (25:00)',
        contexto: 'Uma das maiores lutas da historia do UFC. Adesanya foi derrubado no primeiro round e sofreu pressao intensa durante toda a luta. Gastelum conectou golpes pesados e quase finalizou a luta no final do quinto round. Adesanya mostrou coracão e resiliencia para vencer por unanimidade.',
        performance: 'Performance de nivel elite. Mesmo ferido e em perigo, Adesanya demonstrou QI de luta excepcional, adaptando-se ao longo de 5 rounds e vencendo uma guerra de desgaste. Foi premiada como Luta do Ano.',
        evento: 'UFC 236',
        data: 'Abr 2019',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: 'UD (placar nao confirmado)',
        duracao: '3 rounds (15:00)',
        contexto: 'Pyfer controlou a luta com volume de strikes e conseguiu dois knockdowns ao longo dos tres rounds. Gastelum, aos 33 anos e vindo de uma sequencia negativa, nao conseguiu impor seu jogo de wrestling e pressao.',
        performance: 'Performance solida de Pyfer. Mostrou evolucao no jogo em pe e capacidade de lutar por decisao quando o nocaute nao vem. Os dois knockdowns demonstram poder genuino.',
        evento: 'UFC 316',
        data: 'Jun 2025',
      },
      insight: 'A comparacao com Gastelum revela mais sobre o momento de cada lutador do que sobre a dinamica direta. Adesanya enfrentou o melhor Gastelum possivel e sobreviveu a uma guerra; Pyfer venceu uma versao diminuida do mexicano com relativa facilidade. O que podemos extrair: Adesanya tem resiliencia comprovada em situacoes extremas, enquanto Pyfer demonstra capacidade de nocautear mesmo quando vence por pontos. Mas o nivel de oposicao e incomparavel.',
    },

    // ─────────────────────────────────────────────
    // SECTION 6: COMPARACAO ESTATISTICA
    // ─────────────────────────────────────────────
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.93, valueB: 3.47, maxVal: 6, format: 'decimal', note: 'Adesanya tem volume superior com 3.93 golpes significativos por minuto' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 43, maxVal: 100, format: 'percent', note: 'Adesanya e mais preciso, acertando 48% contra 43% de Pyfer' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.11, valueB: 3.05, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Numeros muito proximos: ambos absorvem em torno de 3 golpes por minuto' },
        { label: 'Defesa de Strikes (%)', valueA: 56, valueB: 54, maxVal: 100, format: 'percent', note: 'Defesas praticamente identicas, nenhum dos dois e excepcional nesse quesito' },
        { label: 'Takedowns por 15 Min', valueA: 0.05, valueB: 1.23, maxVal: 5, format: 'decimal', note: 'Pyfer tem grappling ofensivo muito superior: 1.23 contra virtualmente zero de Adesanya' },
        { label: 'Precisao de Takedown (%)', valueA: 14, valueB: 33, maxVal: 100, format: 'percent', note: 'Adesanya raramente tenta takedowns e acerta muito pouco quando tenta' },
        { label: 'Defesa de Takedown (%)', valueA: 77, valueB: 50, maxVal: 100, format: 'percent', note: 'Adesanya tem defesa de takedown significativamente melhor: 77% contra apenas 50%' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '36 anos', fighter2: '29 anos', note: 'Pyfer tem 7 anos de vantagem na idade' },
        { label: 'Altura', fighter1: '1.93m (6\'4")', fighter2: '1.88m (6\'2")', note: 'Adesanya tem 5cm de vantagem na altura' },
        { label: 'Envergadura', fighter1: '2.03m (80")', fighter2: '1.90m (75")', note: 'Adesanya tem 5 polegadas de vantagem, diferenca significativa' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'City Kickboxing', fighter2: 'Team Balance', note: null },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION 7: PERFIL DE HABILIDADES
    // ─────────────────────────────────────────────
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking Tecnico',
          valueA: 88,
          valueB: 65,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Adesanya e um dos melhores strikers da historia do UFC. Jab longo, timing excepcional, counter-striking de elite. Mesmo em declinio, sua tecnica em pe ainda e superior.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 68,
          valueB: 82,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Pyfer tem 9 nocautes na carreira, incluindo tres no primeiro round no UFC. Seu poder natural nas maos e superior ao de Adesanya, que vence mais por precisao do que por potencia bruta.',
        },
        {
          label: 'Grappling',
          valueA: 38,
          valueB: 68,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Pyfer tem 4 finalizacoes na carreira e media de 1.23 takedowns por 15 minutos. Adesanya tem virtualmente zero jogo ofensivo de grappling com apenas 0.05 takedowns por 15 minutos.',
        },
        {
          label: 'Defesa',
          valueA: 72,
          valueB: 52,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Adesanya tem 77% de defesa de takedown e historicamente e dificil de derrubar. Pyfer tem apenas 50% de defesa de takedown, embora isso seja menos relevante contra um oponente que nao busca takedowns.',
        },
        {
          label: 'Cardio e Resistencia',
          valueA: 76,
          valueB: 60,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Adesanya disputou mais de 10 lutas de 5 rounds na carreira. Pyfer nunca lutou 5 rounds e a maioria das suas lutas termina cedo. O fator cardio pode ser decisivo se a luta passar do terceiro round.',
        },
        {
          label: 'QI de Luta',
          valueA: 85,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Adesanya tem 29 lutas profissionais, experiencia em kickboxing de alto nivel, e ja lutou contra os melhores do mundo. Pyfer esta evoluindo mas nunca enfrentou alguem desse calibre.',
        },
      ],
      insight: 'O perfil de habilidades mostra uma dinamica classica de striker tecnico vs power puncher com grappling. Adesanya leva vantagem em tecnica, cardio e experiencia. Pyfer domina em poder de nocaute e grappling. A questao central: as vantagens tecnicas de Adesanya ainda funcionam aos 36 anos contra a explosividade da juventude?',
    },

    // ─────────────────────────────────────────────
    // SECTION 8: DISTRIBUICAO DE VITORIAS
    // ─────────────────────────────────────────────
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
      insight: 'A distribuicao de vitorias revela estilos distintos. Adesanya e predominantemente um finalizador em pe (67% por KO/TKO) com um terco das vitorias por decisao, refletindo seu estilo de counter-striker paciente que pode nocautear ou vencer por pontos. Notavelmente, ele nunca venceu por finalizacao. Pyfer e mais diversificado: 60% por KO/TKO, 27% por finalizacao e apenas 13% por decisao. Essa versatilidade significa que Adesanya precisa se preocupar com ameacas tanto em pe quanto no chao.',
    },

    // ─────────────────────────────────────────────
    // SECTION 9: DANGER ZONES
    // ─────────────────────────────────────────────
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM: PYFER',
          color: 'red',
          title: 'Territorio do Bodybagz',
          description: 'Pyfer e um finalizador de primeiro round com tres nocautes no R1 no UFC. Sua explosividade inicial, combinada com o poder natural nas maos, faz do primeiro round o periodo mais perigoso para Adesanya. Historicamente, Adesanya comeca devagar, usando os primeiros minutos para estudar o oponente. Contra Imavov, essa abordagem custou caro: foi nocauteado rapidamente no segundo round. Se Pyfer conseguir pressionar e encurralar Adesanya cedo, existe risco real de finalizacao.',
        },
        {
          rounds: 'R2-R3',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Zona de Transicao',
          description: 'Se a luta chegar aqui, a dinamica muda. Adesanya comeca a encontrar seu ritmo e timing, usando o jab longo e a vantagem de envergadura para controlar a distancia. Pyfer mantem o poder mas pode comecar a sentir o volume de Adesanya. O perigo existe para ambos: Adesanya pode conectar um counter devastador (como fez contra Pereira), mas Pyfer ainda tem poder suficiente para nocautear. O round 2 e particularmente volatil.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Territorio Desconhecido para Pyfer',
          description: 'Pyfer nunca lutou 5 rounds na carreira. Essa e uma incognita enorme. Historicamente, esses rounds seriam territorio de Adesanya, que tem vasta experiencia em lutas de campeonato. Porem, as derrotas recentes em rounds tardios (R5 vs Pereira, R4 vs Du Plessis) enfraquecem essa vantagem tradicional. Se Adesanya estiver em boa forma fisica, a experiencia pode ser o fator decisivo. Se Pyfer mantiver a pressao, pode expor a vulnerabilidade recente do ex-campeao.',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION 10: INTANGIVEIS
    // ─────────────────────────────────────────────
    intangiveis: {
      items: [
        {
          icon: 'Clock',
          title: 'Layoff de 13 meses',
          fighter: 'Adesanya',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Adesanya nao luta desde fevereiro de 2025, acumulando mais de 13 meses de inatividade ate esta luta. Para um lutador de 36 anos vindo de tres derrotas, esse tempo pode ser positivo (recuperacao fisica e mental) ou negativo (ring rust, perda de timing). Nos ultimos anos, lutadores veteranos que voltaram apos longos layoffs tiveram resultados mistos.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Declinio fisico evidente',
          fighter: 'Adesanya',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'As tres derrotas consecutivas de Adesanya nao foram apenas resultados. Foram sinais de declinio: nocauteado em 30 segundos por Imavov, finalizado no chao por Du Plessis, dominado por 5 rounds por Strickland. O reflexo, a velocidade e o chin que o tornaram especial parecem ter diminuido. Aos 36 anos, a biologia e implacavel no MMA.',
        },
        {
          icon: 'TrendingUp',
          title: 'Momentum e confianca em alta',
          fighter: 'Pyfer',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Pyfer chega com tres vitorias consecutivas, duas delas com bonus de Performance da Noite. A confianca de um lutador em ascensao, combinada com a oportunidade de main event contra um ex-campeao, pode ser um multiplicador de performance. Pyfer sabe que uma vitoria aqui muda a trajetoria da sua carreira.',
        },
        {
          icon: 'Shield',
          title: 'Experiencia em lutas de 5 rounds',
          fighter: 'Adesanya',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Adesanya tem mais de 10 lutas de 5 rounds na carreira, incluindo multiplas defesas de titulo. Pyfer nunca passou de 3 rounds. Se a luta se estender, a experiencia de Adesanya em gerenciar energia, ritmo e estrategia ao longo de 25 minutos pode ser a diferenca.',
        },
        {
          icon: 'Target',
          title: 'Defesa de takedown vulneravel',
          fighter: 'Pyfer',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'Pyfer tem apenas 50% de defesa de takedown, um numero preocupante. Porem, contra Adesanya, isso e praticamente irrelevante: Adesanya tem 0.05 takedowns por 15 minutos e 14% de precisao. Esta luta sera decidida em pe ou por iniciativa de Pyfer no chao, nao o contrario.',
        },
        {
          icon: 'Zap',
          title: 'Vantagem de envergadura',
          fighter: 'Adesanya',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Adesanya tem 5 polegadas de vantagem na envergadura (80" vs 75"). Essa diferenca e significativa e historicamente foi uma das maiores armas de Adesanya: o jab longo, o front kick e a capacidade de manter distancia. Se ele conseguir usar essa vantagem como nos tempos de campeao, Pyfer tera dificuldade para entrar na distancia ideal.',
        },
        {
          icon: 'Brain',
          title: 'Primeiro main event para Pyfer',
          fighter: 'Pyfer',
          risk_level: 'RISCO BAIXO',
          risk_color: 'yellow',
          description: 'Este sera o primeiro main event de 5 rounds da carreira de Pyfer. A pressao de ser o favorito contra um ex-campeao, em uma luta principal com holofotes globais, e algo que ele nunca experimentou. Alguns lutadores prosperam nesse ambiente; outros congelam. E uma incognita real.',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION 11: CAMINHOS PARA VITORIA
    // ─────────────────────────────────────────────
    caminhos_vitoria: {
      fighter1: {
        nome: 'Adesanya',
        total_probability: 45,
        scenarios: [
          {
            name: 'O Counter-Striker Vintage',
            probability: 20,
            method: 'UD ou SD',
            description: 'Adesanya usa a envergadura para controlar a distancia, frustra Pyfer com jabs e front kicks, e vence por pontos. Esse e o cenario mais provavel caso Adesanya venca: uma luta tatica onde ele usa a experiencia para neutralizar a explosividade de Pyfer. Precisa manter a luta em pe e evitar trocas na curta distancia.',
          },
          {
            name: 'Nocaute com Counter',
            probability: 15,
            method: 'KO R2-R4',
            description: 'Pyfer avanca com agressividade e Adesanya conecta um counter limpo, como fez contra Costa e Pereira na revanche. A vantagem de envergadura permite que Adesanya puna a agressividade excessiva. Se Pyfer entrar descuidado, o Stylebender tem capacidade tecnica para nocautear com um unico golpe bem colocado.',
          },
          {
            name: 'Dominio Tecnico Total',
            probability: 10,
            method: 'TKO R3-R5',
            description: 'Adesanya encontra o timing, acumula dano ao longo dos rounds com combinacoes rapidas e volume de strikes, e eventualmente para a luta com TKO tardio. Esse cenario depende de Adesanya estar fisicamente proximo da sua melhor versao, o que e incerto dadas as performances recentes.',
          },
        ],
      },
      fighter2: {
        nome: 'Pyfer',
        total_probability: 52,
        scenarios: [
          {
            name: 'Pressao e Volume',
            probability: 22,
            method: 'TKO R2-R3 ou UD',
            description: 'Pyfer usa sua juventude e energia para manter pressao constante, encurralando Adesanya contra a grade. Com volume de strikes e agressividade, ele pode vencer por pontos ou acumular dano suficiente para um TKO. Contra Gastelum, Pyfer mostrou que pode lutar tres rounds inteiros mantendo o ritmo. A questao e se consegue fazer isso por cinco.',
          },
          {
            name: 'Nocaute Explosivo',
            probability: 17,
            method: 'KO R1-R2',
            description: 'Pyfer entra agressivo e conecta um golpe pesado nos primeiros rounds, como fez contra Barriault e Meerschaert. Adesanya tem demonstrado vulnerabilidade no chin nas lutas recentes (nocauteado por Pereira, Imavov, finalizado por Du Plessis). Se Pyfer acertar limpo, as chances de nocaute sao reais.',
          },
          {
            name: 'Controle no Chao',
            probability: 13,
            method: 'Sub R2-R3 ou UD por controle',
            description: 'Pyfer leva a luta para o chao usando takedowns e clinch contra a grade. Adesanya tem 77% de defesa de takedown, mas Du Plessis mostrou que e possivel derruba-lo e finaliza-lo. Se Pyfer conseguir o takedown, sua capacidade de finalizacao (4 subs na carreira, incluindo face crank no ultimo combate) se torna uma ameaca real.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────
    // SECTION 12: PREVISAO FINAL
    // ─────────────────────────────────────────────
    previsao_final: {
      winner_name: 'Joe Pyfer',
      winner_side: 'fighter2',
      predicted_method: 'TKO tardio ou Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'A previsao favorece Pyfer com confianca moderada. O declinio recente de Adesanya e inegavel: tres derrotas consecutivas, duas por finalizacao/nocaute, contra oponentes de calibres variados. Pyfer traz juventude, poder e momentum. Porem, a confianca nao e alta porque Adesanya nunca enfrentou alguem do calibre tao baixo no ranking (#14) em um main event, e sua experiencia e vantagem de envergadura nao devem ser subestimadas. Se o Adesanya vintage aparecer, ele pode vencer. Mas as evidencias recentes sugerem que essa versao pode nao existir mais.',
      x_factor: {
        title: 'Os 5 Rounds Como Incognita',
        description: 'Pyfer nunca lutou 5 rounds. Isso pode ser o fator X que decide a luta. Se Adesanya sobreviver aos tres primeiros rounds e a luta entrar no quarto e quinto, Pyfer estara em territorio completamente desconhecido. Historicamente, Adesanya domina nos rounds de campeonato. Mas "historicamente" e uma palavra perigosa para um lutador de 36 anos em declinio.',
      },
      upset_alert: {
        title: 'Upset Alert: Adesanya por Counter KO',
        description: 'Nao seria a primeira vez. Adesanya foi dado como "acabado" antes da revanche contra Pereira e producou o nocaute do ano. Se Pyfer entrar confiante demais e descuidar da distancia, Adesanya tem tecnica para puni-lo com um unico golpe. A envergadura de 80 polegadas contra 75 e uma vantagem real que as odds podem estar subestimando.',
      },
      probabilities: {
        fighter1: { nome: 'Adesanya', percent: 45 },
        fighter2: { nome: 'Pyfer', percent: 52 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Pyfer -130', reasoning: 'Favorito leve com momentum e juventude a seu favor. O preco e justo dado o contexto.' },
        method: { pick: 'Pyfer por KO/TKO', reasoning: 'Adesanya foi finalizado em 3 das ultimas 4 derrotas. O chin parece comprometido.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Adesanya ainda tem capacidade de sobreviver aos rounds iniciais se usar a distancia. A luta provavelmente vai alem do segundo round.' },
        best_value: 'Melhor aposta de valor: Over 2.5 rounds. Adesanya tem experiencia para sobreviver a pressao inicial de Pyfer, e se a luta passar do R2, a questao do cardio de Pyfer entra em jogo.',
      },
    },

    // ─────────────────────────────────────────────
    // SECTION 13: O QUE OBSERVAR
    // ─────────────────────────────────────────────
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'A Envergadura de Adesanya nos Primeiros 2 Minutos',
          icon: 'Target',
          description: 'Observe se Adesanya usa o jab e o front kick para manter distancia desde o inicio. Nas derrotas recentes, ele foi passivo demais nos primeiros minutos. Se ele comecar ativo, usando a vantagem de 5 polegadas na envergadura, e sinal de que esta com um game plan diferente. Se ficar parado esperando, e sinal de que os problemas continuam.',
        },
        {
          num: 2,
          title: 'A Explosividade de Pyfer no R1',
          icon: 'Zap',
          description: 'Pyfer tem tres nocautes no primeiro round no UFC. Observe o nivel de agressividade dele nos primeiros 5 minutos. Se ele entrar pressionando sem medo da envergadura, pode ser um sinal de que vai tentar resolver a luta cedo. Preste atencao especial na mao direita e no overhand.',
        },
        {
          num: 3,
          title: 'A Defesa de Takedown de Adesanya',
          icon: 'Shield',
          description: 'Adesanya tem 77% de defesa de takedown na carreira, mas Du Plessis mostrou que e possivel derruba-lo. Se Pyfer tentar takedowns cedo e conseguir, a luta muda completamente de dinamica. Observe as primeiras tentativas de takedown: se Adesanya defender bem, a luta provavelmente ficara em pe.',
        },
        {
          num: 4,
          title: 'O Cardio de Pyfer apos o R3',
          icon: 'Activity',
          description: 'Pyfer nunca lutou 5 rounds. Se a luta chegar ao quarto round, observe atentamente o ritmo dele. A boca aberta, os golpes perdendo potencia, a guarda caindo. Se o cardio falhar, Adesanya tem experiencia para capitalizar nos rounds finais. Este pode ser o fator decisivo da luta.',
        },
        {
          num: 5,
          title: 'O Fator Mental do Azarao',
          icon: 'AlertTriangle',
          description: 'Pela primeira vez em 18 lutas no UFC, Adesanya e azarao. Isso pode ser libertador (sem pressao de favoritismo) ou devastador (confirmacao do declinio). Observe a linguagem corporal dele na entrada e nos primeiros minutos. Um Adesanya confiante e um Adesanya perigoso. Um Adesanya hesitante e presa facil.',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION 14: CREATOR KIT
    // ─────────────────────────────────────────────
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'ADESANYA vs PYFER',
          content: 'UFC Fight Night 271\n28 de Marco, 2026\nClimate Pledge Arena, Seattle\n\nMain Event | 5 Rounds\nPeso Medio (185 lbs)\n\nO ex-campeao como azarao\npela primeira vez na carreira',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'ADESANYA: OS NUMEROS',
          content: 'Record: 24-5-0\nRanking: #5 MW\n\n3.93 strikes significativos/min\n48% de precisao\n77% defesa de takedown\n\nMAS: 1-3 nas ultimas 4 lutas\n3 derrotas consecutivas\nTodas por finalizacao ou nocaute',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'PYFER: A AMEACA',
          content: 'Record: 15-3-0\nRanking: #14 MW\n\n9 nocautes na carreira\n4 finalizacoes\n3 vitorias consecutivas\n2x Performance da Noite\n\nNunca lutou 5 rounds\nPrimeiro main event da carreira',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'PREVISAO',
          content: 'PYFER vence\nTKO tardio ou Decisao\nConfianca: MEDIA\n\nPyfer: 52%\nAdesanya: 45%\nEmpate: 3%\n\nMelhor aposta de valor:\nOver 2.5 Rounds',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/5',
          text: 'ADESANYA vs PYFER no UFC Seattle. Thread de analise completa. Pela primeira vez em 18 lutas no UFC, o Stylebender e azarao. Isso diz tudo sobre o estado da carreira dele agora.',
        },
        {
          num: '2/5',
          text: 'Os numeros de Adesanya: 1-3 nas ultimas 4 lutas. 3 derrotas consecutivas, todas por finalizacao ou nocaute. 36 anos. 13 meses de inatividade. MAS: ainda tem 77% de defesa de takedown e a melhor envergadura da divisao (80").',
        },
        {
          num: '3/5',
          text: 'Pyfer: 3 vitorias seguidas, 2 bonus de Performance da Noite. 9 KOs e 4 subs na carreira. O problema? Nunca lutou 5 rounds e nunca enfrentou alguem do nivel de Adesanya. Maior teste da carreira dele.',
        },
        {
          num: '4/5',
          text: 'O fator chave: Pyfer tem poder para nocautear qualquer um no R1, mas ninguem sabe o que acontece se a luta chegar ao R4-R5. Adesanya tem experiencia em 10+ lutas de 5 rounds. Se sobreviver a tempestade inicial, pode virar.',
        },
        {
          num: '5/5',
          text: 'Previsao: Pyfer por TKO tardio ou decisao. Confianca media. O declinio de Adesanya e real, mas nunca aposte contra a habilidade do Stylebender sem ressalvas. Over 2.5 rounds parece a melhor aposta de valor.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Adesanya azarao pela primeira vez na carreira. Tres derrotas seguidas. Todo mundo dizendo que acabou. Mas sera que o Stylebender tem mais um nocaute espetacular guardado? Vamos analisar."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"De um lado, um ex-campeao de 36 anos com 24 vitorias, 13 knockdowns na carreira (recorde da divisao junto com Anderson Silva), e 5 polegadas de vantagem na envergadura. Do outro, Joe Pyfer, 29 anos, 9 nocautes, 4 finalizacoes, e o momentum de 3 vitorias seguidas com 2 bonus."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"O problema pra Adesanya e simples: ele foi nocauteado por Imavov em 30 segundos, finalizado por Du Plessis, dominado por Strickland. O chin, a velocidade, tudo parece ter diminuido. Pyfer e explosivo mas nunca lutou 5 rounds. Se a luta passar do terceiro, entramos em territorio desconhecido."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Red flag principal: 13 meses de inatividade pra Adesanya. Segundo: Pyfer tem 50% de defesa de takedown, mas contra Adesanya isso nem importa. Terceiro: ninguem sabe como Pyfer reage quando nao consegue nocautear no primeiro round."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Pyfer por TKO ou decisao, com confianca media. Mas se voce quer uma aposta de valor, Over 2.5 rounds. Adesanya tem experiencia pra sobreviver os primeiros rounds. Comenta ai: voce acha que o Stylebender ainda tem gasolina no tanque?"',
        },
      ],
      tiktok: [
        {
          hook: 'Adesanya e azarao pela PRIMEIRA VEZ na carreira do UFC.',
          body: 'Em 18 lutas no UFC, ele NUNCA foi azarao. Agora contra Joe Pyfer, um cara com 9 nocautes que ele deveria estar dominando. Mas 3 derrotas seguidas, todas por finalizacao, aos 36 anos? As casas de apostas estao dizendo o que todo mundo esta pensando.',
          cta: 'Mas voce aposta contra o Stylebender? Responde nos comentarios.',
        },
        {
          hook: 'Joe Pyfer nunca lutou 5 rounds na vida.',
          body: 'E agora vai fazer o primeiro main event contra um cara que lutou mais de 10 lutas de 5 rounds, incluindo defesas de titulo contra Whittaker, Costa, Romero e Vettori. Se a luta chegar ao quarto round, Pyfer entra em territorio completamente desconhecido.',
          cta: 'Voce acha que o cardio de Pyfer aguenta? Comenta!',
        },
        {
          hook: 'A estatistica mais louca dessa luta: 80 vs 75 polegadas.',
          body: 'Adesanya tem 5 POLEGADAS de vantagem na envergadura. Isso e absurdo no peso medio. O jab dele viaja mais longe, o front kick alcanca mais, e Pyfer precisa cruzar uma terra de ninguem enorme pra chegar na distancia de nocaute. Se o Stylebender usar essa vantagem como nos velhos tempos, Pyfer vai comer jab a noite inteira.',
          cta: 'Envergadura vs Poder. Quem vence? Comenta!',
        },
      ],
      headlines: [
        'Adesanya vs Pyfer: O Stylebender Consegue Evitar a Quarta Derrota Seguida?',
        'Pela Primeira Vez Azarao, Adesanya Enfrenta o Teste Final da Sua Carreira',
        'Pyfer: O Homem Que Pode Aposentar o Maior Striker da Historia dos Medios',
        'UFC Seattle: Quando a Nova Geracao Bate na Porta do Legado',
        'Adesanya vs Pyfer: 5 Polegadas de Envergadura Contra 9 Nocautes na Carreira',
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION 15: BETTING VALUE (always null)
    // ─────────────────────────────────────────────
    betting_value: null,

    // ─────────────────────────────────────────────
    // SECTION 16: RADAR DO APOSTADOR
    // ─────────────────────────────────────────────
    radar_apostador: {
      odds: {
        fighter1_odds: '+110',
        fighter2_odds: '-130',
        fighter1_name: 'Adesanya',
        fighter2_name: 'Pyfer',
        source: 'Media de DraftKings e FanDuel (marco 2026)',
      },
      edges: [
        {
          icon: 'Target',
          titulo: 'Vantagem Massiva de Envergadura',
          stat_headline: '5 POLEGADAS DE VANTAGEM (80" VS 75")',
          contexto: 'Adesanya tem uma das maiores envergaduras da divisao dos peso medio. Essa diferenca de 5 polegadas permite que ele controle a distancia com jabs, front kicks e teeps que Pyfer nao consegue alcançar. Em sua carreira, Adesanya utilizou essa vantagem para frustrar strikers agressivos como Costa e Romero.',
          implicacao_aposta: 'A envergadura favorece cenarios de decisao e luta longa. Se voce acredita que Adesanya vai usar a distancia efetivamente, Over 2.5 rounds ganha valor.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Flame',
          titulo: 'Taxa de Finalizacao no R1 de Pyfer',
          stat_headline: '3 NOCAUTES NO PRIMEIRO ROUND EM 7 LUTAS NO UFC',
          contexto: 'Pyfer finalizou 43% das suas lutas no UFC no primeiro round. Sua explosividade inicial e uma das mais altas da divisao, com 1.2 knockdowns por 15 minutos, o quarto melhor indice entre os peso medio ativos.',
          implicacao_aposta: 'Pyfer no R1 e Pyfer por KO/TKO sao mercados que refletem sua tendencia real. Porem, as odds para KO no R1 podem estar sobrevalorizadas dado que Adesanya, apesar do declinio, ainda tem experiencia para sobreviver os primeiros 5 minutos.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'AlertTriangle',
          titulo: 'Chin Comprometido de Adesanya',
          stat_headline: '3 FINALIZACOES NAS ULTIMAS 4 DERROTAS',
          contexto: 'Desde novembro de 2022, Adesanya foi parado por TKO (Pereira), nocauteado (Imavov), e finalizado (Du Plessis). A capacidade de absorver dano parece ter diminuido significativamente. Antes de 2022, Adesanya nunca havia sido finalizado na carreira.',
          implicacao_aposta: 'Esse padrao favorece apostas em metodo de finalizacao (KO/TKO ou Sub) em detrimento de decisao. Se voce acha que a luta acaba antes do limite, Pyfer Inside Distance pode ter valor.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Clock',
          titulo: 'Pyfer Sem Experiencia em 5 Rounds',
          stat_headline: 'ZERO LUTAS DE 5 ROUNDS NA CARREIRA',
          contexto: 'Pyfer nunca foi testado em uma luta de campeonato de 25 minutos. Suas lutas no UFC duraram em media menos de 2 rounds. Adesanya, por outro lado, completou mais de 10 lutas de 5 rounds. Essa incognita e enorme e pode afetar o resultado se a luta se estender.',
          implicacao_aposta: 'Se voce acredita que a luta vai ate os rounds finais, Adesanya ganha valor como underdog. O mercado pode estar subestimando a experiencia do ex-campeao em rounds tardios.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'BarChart3',
          titulo: 'Adesanya Como Azarao pela Primeira Vez',
          stat_headline: 'PRIMEIRA VEZ COMO UNDERDOG EM 18 LUTAS NO UFC',
          contexto: 'Historicamente, lutadores de elite que sao dados como azarao pela primeira vez na carreira tem resultados mistos. A narrativa de "provar os criticos errados" pode ser motivadora, mas as razoes pelas quais ele e azarao (declinio comprovado) sao fundamentadas em dados reais.',
          implicacao_aposta: 'O valor de Adesanya a +110 nao e absurdo. Se voce acredita no fator experiencia e na vantagem fisica, ha uma margem possivel. Mas as evidencias recentes justificam o status de azarao.',
          edge_level: 'leve',
          fighter_side: 'neutral',
        },
      ],
      value_picks: [
        {
          tipo: 'Over/Under',
          pick: 'Over 2.5 Rounds',
          odds: '-120 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'Adesanya tem experiencia para gerenciar os rounds iniciais e Pyfer, apesar de explosivo, pode ter dificuldade em encurralar um lutador com 5 polegadas de vantagem na envergadura.',
          raciocinio: 'Adesanya pode estar em declinio, mas ainda e um lutador de elite que sabe como sobreviver rounds iniciais. Em 13 lutas no UFC contra oponentes ranqueados, apenas 2 terminaram antes do R3 (ambas recentes: Imavov e Costa). A probabilidade da luta ir alem de 2.5 rounds permanece alta dado o estilo de counter-striking de Adesanya e a necessidade de Pyfer cruzar uma grande distancia.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Pyfer -130',
          odds: '-130',
          confianca: 'media',
          edge_vs_mercado: 'O preco e justo. Pyfer deveria ser favorito leve dado o declinio de Adesanya.',
          raciocinio: 'Pyfer tem juventude, momentum, e versatilidade (nocaute e finalizacao). O declinio de Adesanya e real e documentado. A -130, voce esta pagando um preco razoavel pelo favorito. Nao ha grande valor aqui, mas a aposta e solida.',
        },
        {
          tipo: 'Metodo',
          pick: 'Pyfer por KO/TKO',
          odds: '+180 (estimado)',
          confianca: 'media',
          raciocinio: 'Dado que Adesanya foi finalizado por strikes em 3 das ultimas 5 derrotas e que Pyfer tem poder comprovado (9 KOs na carreira), o cenario de nocaute e plausivel. Porem, Adesanya ainda pode neutralizar com a distancia, entao a confianca nao e alta.',
        },
        {
          tipo: 'Duracao',
          pick: 'Nao vai a Decisao',
          odds: '+110 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'As ultimas lutas de Adesanya sugerem que finalizacoes sao cada vez mais provaveis.',
          raciocinio: 'Das ultimas 5 lutas de Adesanya, apenas uma foi a decisao (Strickland). As outras 4 terminaram antes do limite (2 TKOs, 1 Sub, 1 KO). Pyfer tambem tende a finalizar lutas cedo. A probabilidade de finalizacao (por qualquer lado) e significativa.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Adesanya por KO no R1',
        descricao: 'Pode parecer tentador apostar no nocaute precoce de Adesanya, especialmente com odds altas. Mas Adesanya historicamente comeca devagar, estudando o oponente nos primeiros rounds. Em 29 lutas profissionais, ele tem pouquissimos nocautes no primeiro round contra oposicao de qualidade. Seus melhores nocautes (Costa, Pereira 2, Whittaker 1) vieram no R2. Apostar em Adesanya por KO R1 e jogar dinheiro fora.',
      },
      disclaimer: 'Analise estatistica para fins informativos e entretenimento. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
