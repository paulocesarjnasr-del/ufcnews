import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'fili-vs-delgado',
  evento_id: null,
  slug: 'fili-vs-delgado',
  titulo: 'Fili vs Delgado: Veterano Contra a Nova Geracao',
  subtitulo: 'O gatekeeper mais resistente do peso-pena encontra o finalizador explosivo',
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
    predictedMethod: 'TKO R1-R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Andre Fili',
    record: '25-12-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Jose Delgado',
    record: '10-2-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'UFC APEX, Las Vegas, Nevada',
  categoria_peso: 'Peso Pena (145 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 sections)
  // ===========================
  full_analysis: {
    // -------------------------------------------------
    // 1. HERO SECTION
    // -------------------------------------------------
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'UFC APEX, Las Vegas, Nevada',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Sobrevivencia vs. Explosao',
      tagline_sub: 'O veterano que se recusa a ir embora contra o jovem que so conhece finalizacao',
      fighter1: {
        nome_completo: 'Andre "Touchy" Fili',
        apelido: 'Touchy',
        sobrenome: 'Fili',
        record: '25-12-0',
        ranking: 'N/R FW',
        info_extra: 'Sacramento, California | 35 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Jose Miguel Delgado',
        apelido: '',
        sobrenome: 'Delgado',
        record: '10-2-0',
        ranking: 'N/R FW',
        info_extra: 'Phoenix, Arizona | 27 anos',
        imagem_fullbody_url: null,
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Eterno Gatekeeper Encontra o Prospect Que Nao Sabe Ir Pra Decisao</h3>
        <p>Essa luta conta uma historia que o UFC adora promover: o veterano resistente que ja enfrentou todo mundo na divisao contra o jovem destruidor que ainda nao teve seu teste de fogo completo. <strong class="text-ufc-red">Fili</strong> esta no UFC desde 2013. Sao quase 13 anos dentro do octogono, 25 lutas na organizacao, um curriculo que inclui nomes como Yair Rodriguez, Max Holloway, Sodiq Yusuff e Dan Ige. Ele nunca vai disputar um titulo, mas ninguem passa facil por ele.</p>
        <p><strong class="text-blue-400">Delgado</strong> e o oposto completo. Chegou ao UFC pelo DWCS em agosto de 2024, destruindo Ernie Juarez com um joelhaco no segundo round que fez Dana White assinar o contrato na hora. Na estreia oficial, nocauteou Connor Matthews no primeiro round com cotovelada e ground-and-pound. Depois, levou apenas 26 segundos para acabar com Hyder Amil no UFC 317. O problema? Quando a luta foi pra tres rounds contra Nathaniel Wood, Delgado perdeu por decisao unanime.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Por Que Essa Luta Foi Feita</h3>
        <p>O UFC quer uma resposta clara: <strong class="text-blue-400">Delgado</strong> e um finalizador de verdade ou um cara que so sabe atropelar oponentes inferiores? A derrota para Wood levantou duvidas sobre seu cardio, sua capacidade de lutar rounds completos e seu QI de luta quando as coisas nao vao bem cedo. <strong class="text-ufc-red">Fili</strong> e o teste perfeito: um veterano duravel, experiente, que sabe lutar tres rounds e que adora puxar a luta para aguas profundas.</p>
        <p>Para <strong class="text-ufc-red">Fili</strong>, essa e mais uma oportunidade de provar que ainda tem algo a oferecer aos 35 anos. Ele vem de uma vitoria por decisao dividida sobre Christian Rodriguez e alterna vitorias e derrotas ha anos. Uma vitoria sobre um prospect em ascensao como Delgado seria significativa para manter seu lugar no roster.</p>
      `,
      stakes: [
        { dimensao: 'Objetivo', fighter1: 'Manter relevancia no roster aos 35 anos', fighter2: 'Provar que pode ser mais do que um finalizador precoce' },
        { dimensao: 'Risco', fighter1: 'Ser nocauteado por um cara 8 anos mais novo', fighter2: 'Perder duas seguidas e cair em espiral' },
        { dimensao: 'Narrativa', fighter1: 'O veterano que se recusa a ir embora', fighter2: 'O prospect que precisa de respostas sobre seu cardio' },
        { dimensao: 'Recompensa', fighter1: 'Relevancia renovada no peso-pena', fighter2: 'Construir sequencia de vitoria e subir no ranking' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O VETERANO SOBREVIVE',
          subtitulo: 'Fili prova mais uma vez que experiencia supera juventude quando a luta vai pra distancia.',
          consequencias: [
            { tag: 'ROSTER', texto: 'Garante mais tempo no UFC com uma vitoria convincente sobre um prospect. Pode buscar lutas contra nomes como Nate Landwehr ou Bryce Mitchell na sequencia.' },
            { tag: 'NARRATIVA', texto: 'Aos 35 anos, mostra que ainda sabe competir. O recorde de mais decisoes divididas vencidas na historia do peso-pena ganha ainda mais peso.' },
            { tag: 'LEGADO', texto: 'Soma mais uma vitoria ao curriculo de um dos gatekeepers mais consistentes da historia da divisao.' },
          ],
          proxima_luta: 'Possivel duelo contra outro prospect em ascensao ou veterano no mesmo patamar',
        },
        fighter2_vence: {
          titulo: 'A MAQUINA DE FINALIZAR VOLTA A FUNCIONAR',
          subtitulo: 'Delgado responde as duvidas da derrota para Wood com outra finalizacao devastadora.',
          consequencias: [
            { tag: 'RANKING', texto: 'Uma terceira vitoria no UFC por finalizacao sobre um veterano estabelecido coloca Delgado no radar como um dos prospects mais perigosos da divisao.' },
            { tag: 'CONFIANCA', texto: 'Apaga a duvida que a derrota para Wood criou. Prova que o nocaute de 26 segundos sobre Amil nao foi fluke, e que Delgado e genuinamente explosivo.' },
            { tag: 'PROJECAO', texto: 'Com 27 anos e taxa de finalizacao de 100% nas vitorias, comeca a aparecer como nome a ser observado na proxima onda do peso-pena.' },
          ],
          proxima_luta: 'Pode enfrentar um nome ranqueado entre #12 e #15 ou outro veterano estabelecido na divisao',
        },
      },
    },

    // -------------------------------------------------
    // 3. MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Andre Fili',
        color: 'red',
        recent_fights: [
          {
            date: 'Ago 2025',
            opponent: 'Christian Rodriguez',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria limpa no contragolpe com alguns takedowns misturados, mas juizes divergiram.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Melquizael Costa',
            result: 'L',
            method: 'Sub R1 (guilhotina)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrubou Costa mas foi pego na guilhotina ao ir pro chao. Quebrou sequencia de 10 anos sem ser finalizado.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Cub Swanson',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Luta competitiva contra lenda em fim de carreira. Ganhou bonus de Luta da Noite.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Dan Ige',
            result: 'L',
            method: 'KO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocauteado com overhand direita brutal. Substituiu Lerone Murphy de ultima hora.',
          },
          {
            date: 'Dez 2023',
            opponent: 'Lucas Almeida',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Direita pesada derrubou Almeida, seguida de sequencia de socos ate o referee parar.',
          },
        ],
        full_fight_history: [
          { date: 'Ago 2025', opponent: 'Christian Rodriguez', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Contragolpe e takedowns' },
          { date: 'Fev 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado por guilhotina' },
          { date: 'Jun 2024', opponent: 'Cub Swanson', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Luta da Noite' },
          { date: 'Fev 2024', opponent: 'Dan Ige', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado com overhand' },
          { date: 'Dez 2023', opponent: 'Lucas Almeida', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finish rapido' },
          { date: 'Set 2022', opponent: 'Bill Algeo', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Mais uma SD' },
          { date: 'Abr 2022', opponent: 'Joanderson Brito', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteado em 41 segundos' },
          { date: 'Dez 2021', opponent: 'Daniel Pineda', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida' },
          { date: 'Jul 2021', opponent: 'Daniel Santos', result: 'NC', method: 'NC', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'No Contest' },
          { date: 'Jan 2020', opponent: 'Sodiq Yusuff', result: 'L', method: 'UD', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Derrota para prospect top' },
          { date: 'Set 2019', opponent: 'Sheymon Moraes', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finish rapido' },
          { date: 'Fev 2019', opponent: 'Myles Jury', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida' },
          { date: 'Jul 2019', opponent: 'Charles Jourdain', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finish no segundo round' },
          { date: 'Nov 2018', opponent: 'Michael Johnson', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria sobre veterano' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Fili e a definicao de inconsistencia. Nos ultimos 7 combates, alternou vitorias e derrotas quase perfeitamente: W-L-W-L-W-L-W. Vence lutas competitivas por decisao dividida e perde por nocaute ou finalizacao quando o oponente encontra a abertura. Nao esta em ascensao nem em queda, apenas mantendo o padrao de ser um cara duravel que pode perder pra qualquer um no dia errado.',
      },
      fighter2: {
        nome: 'Jose Delgado',
        color: 'blue',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Nathaniel Wood',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Derrubou Wood no R1 mas perdeu os rounds finais. Levantou debate de roubo entre os fas.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Hyder Amil',
            result: 'W',
            method: 'TKO R1 (0:26)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Nocaute devastador em 26 segundos. Joelhada seguida de socos no chao.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Connor Matthews',
            result: 'W',
            method: 'TKO R1 (2:58)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia no UFC. Spinning back fist seguido de overhand direita e ground-and-pound.',
          },
          {
            date: 'Ago 2024',
            opponent: 'Ernie Juarez',
            result: 'W',
            method: 'KO R2 (joelhada)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'DWCS. Joelhada brutal na cabeca quando Juarez tentou takedown. Ganhou contrato UFC.',
          },
        ],
        full_fight_history: [
          { date: 'Out 2025', opponent: 'Nathaniel Wood', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Perdeu nos rounds finais' },
          { date: 'Jun 2025', opponent: 'Hyder Amil', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: '26 segundos' },
          { date: 'Fev 2025', opponent: 'Connor Matthews', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia UFC' },
          { date: 'Ago 2024', opponent: 'Ernie Juarez', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS, ganhou contrato' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Delgado e um projeto em construcao. Tres finalizacoes consecutivas no primeiro ou segundo round mostraram poder explosivo genuino, mas a derrota para Nathaniel Wood expoe lacunas serias. Quando a luta passa do primeiro round, Delgado ainda nao mostrou que sabe administrar. O volume caiu, a tomada de decisao ficou questionavel, e Wood conseguiu controlar os rounds finais. A pergunta e simples: Delgado consegue ajustar o que deu errado contra Wood ou vai repetir o mesmo padrao?',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Fili',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Delgado',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '3W-1L (75%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nao existem oponentes em comum entre Fili e Delgado. Isso reflete as diferentes fases de carreira dos dois: Fili esta no UFC desde 2013 e ja enfrentou dezenas de oponentes ao longo de 25 lutas na organizacao. Delgado tem apenas 3 lutas oficiais no UFC alem do DWCS. O universo de oponentes simplesmente nao se cruzou ainda.',
    },

    // -------------------------------------------------
    // 5. OPONENTE COMUM (null - nenhum relevante)
    // -------------------------------------------------
    oponente_comum: null,

    // -------------------------------------------------
    // 6. COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.84,
          valueB: 6.50,
          maxVal: 8,
          format: 'decimal',
          note: 'Delgado conecta quase o dobro de golpes significativos por minuto. Volume absurdo.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 37,
          valueB: 46,
          maxVal: 100,
          format: 'percent',
          note: 'Fili tem uma das piores precisoes entre veteranos do peso-pena.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.15,
          valueB: 3.52,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Fili absorve mais strikes do que aplica, um sinal preocupante.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 51,
          valueB: 56,
          maxVal: 100,
          format: 'percent',
          note: 'Ambos abaixo da media, mas Delgado defende ligeiramente melhor.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 2.22,
          valueB: 0.00,
          maxVal: 5,
          format: 'decimal',
          note: 'Fili usa wrestling como recurso tatico. Delgado nao tenta takedowns.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 44,
          valueB: 75,
          maxVal: 100,
          format: 'percent',
          note: 'Delgado tem precisao alta mas amostra muito pequena.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 71,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Delgado sem dados significativos de defesa de takedown registrados.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '35 anos',
          fighter2: '27 anos',
          note: '8 anos de diferenca. Delgado tem juventude, Fili tem milhagem.',
        },
        {
          label: 'Altura',
          fighter1: '1.80m (5\'11")',
          fighter2: '1.80m (5\'11")',
          note: 'Mesma altura. Sem vantagem fisica nesse quesito.',
        },
        {
          label: 'Envergadura',
          fighter1: '188cm (74")',
          fighter2: '188cm (74")',
          note: 'Envergadura identica. Distancia neutra.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Switch',
          note: 'Delgado alterna guardas, o que pode complicar o timing de Fili.',
        },
        {
          label: 'Academia',
          fighter1: 'Team Alpha Male',
          fighter2: 'MMA Lab',
          note: 'Ambos de academias top. Alpha Male produz volume strikers, MMA Lab forma finalizadores.',
        },
      ],
    },

    // -------------------------------------------------
    // 7. PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        {
          label: 'Poder de Finalizacao',
          valueA: 55,
          valueB: 90,
          labelA: 'Bom',
          labelB: 'Excelente',
          advantage: 'fighter2',
          advantage_note: 'Delgado finalizou todas as suas 10 vitorias. 100% de taxa de finalizacao. Fili tem poder nas maos mas nao finaliza desde 2023.',
        },
        {
          label: 'Volume de Strikes',
          valueA: 60,
          valueB: 82,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Delgado conecta 6.50 SLpM contra 3.84 de Fili. A diferenca de volume e significativa.',
        },
        {
          label: 'Wrestling',
          valueA: 65,
          valueB: 35,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Fili tem wrestling funcional com 2.22 TD/15min e pode usar isso para controlar o ritmo. Delgado quase nao usa takedowns.',
        },
        {
          label: 'Cardio e Resistencia',
          valueA: 70,
          valueB: 42,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Fili ja lutou 25 lutas no UFC e venceu multiplas decisoes de 3 rounds. Delgado mostrou sinais de fadiga contra Wood quando a luta passou do R1.',
        },
        {
          label: 'Defesa e QI de Luta',
          valueA: 58,
          valueB: 45,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Fili tem 13 anos de experiencia no UFC e sabe administrar rounds. Delgado ainda e verde na tomada de decisao quando pressionado.',
        },
        {
          label: 'Explosividade',
          valueA: 50,
          valueB: 88,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Delgado tem finalizacoes em 26 segundos e 2:58 no primeiro round. Sua explosividade nos primeiros minutos e de nivel elite.',
        },
      ],
      insight: 'Esse confronto e um choque classico de estilos. Delgado tem vantagens claras em poder de finalizacao, volume e explosividade. Fili compensa com wrestling superior, cardio comprovado e inteligencia de luta. A questao central e simples: a luta vai ser decidida nos primeiros 5 minutos ou nos ultimos 10? Se a resposta for a primeira opcao, Delgado domina. Se for a segunda, Fili tem chance real.',
    },

    // -------------------------------------------------
    // 8. DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Fili',
        ko_tko: { count: 10, percent: 40 },
        submission: { count: 3, percent: 12 },
        decision: { count: 12, percent: 48 },
        total_wins: 25,
      },
      fighter2: {
        nome: 'Delgado',
        ko_tko: { count: 6, percent: 60 },
        submission: { count: 4, percent: 40 },
        decision: { count: 0, percent: 0 },
        total_wins: 10,
      },
      insight: 'A diferenca aqui e gritante. Delgado NUNCA venceu por decisao em 10 vitorias profissionais. Todas as suas vitorias foram por finalizacao: 6 por KO/TKO e 4 por submissao. Isso conta duas historias: primeiro, que ele e genuinamente perigoso e sabe finalizar. Segundo, que quando nao consegue finalizar, ele perde (como aconteceu contra Wood e sua outra derrota na carreira). Fili, por outro lado, tem um perfil equilibrado com quase metade das vitorias por decisao (48%), mostrando que sabe lutar rounds completos e vencer no scoring.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VANTAGEM DELGADO',
          color: 'green',
          title: 'Territorio do Delgado',
          description: 'O primeiro round e onde Delgado e mais perigoso. Nocauteou Amil em 26 segundos, Matthews em 2:58, e Juarez no segundo round do DWCS. Sua explosividade inicial e de nivel elite: golpes pesados, joelhadas, cotoveladas. Fili precisa sobreviver os primeiros 3-4 minutos sem ser pego com algo grande. O problema? Fili absorve 4.15 strikes por minuto e tem apenas 51% de defesa de strikes. Ele PODE ser acertado, e Delgado so precisa acertar uma vez.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Transicao e Adaptacao',
          description: 'Se a luta chegar ao segundo round, o cenario muda. Delgado comecou a desacelerar contra Wood nesse momento, e Fili tende a encontrar seu ritmo apos o primeiro round. O wrestling de Fili pode comecar a aparecer, e o cardio de Delgado sera testado. Quem controlar o ritmo no inicio do R2 provavelmente definira o resto da luta.',
        },
        {
          rounds: 'R3',
          danger_level: 3,
          danger_label: 'VANTAGEM FILI',
          color: 'red',
          title: 'Aguas Profundas',
          description: 'Se chegarmos ao terceiro round, a vantagem e claramente de Fili. Ele ja venceu 12 lutas por decisao na carreira e 5 por decisao dividida, incluindo as duas mais recentes. Contra Wood, Delgado perdeu os rounds finais quando o ritmo desacelerou. Fili sabe cadenciar, misturar takedowns, e ganhar rounds apertados. Nesse territorio, experiencia conta mais que explosividade.',
        },
      ],
    },

    // -------------------------------------------------
    // 10. INTANGIVEIS
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'Clock',
          title: 'Diferenca de experiencia absurda',
          fighter: 'Fili',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Fili tem 25 lutas no UFC desde 2013. Delgado tem 3 (alem do DWCS). Essa diferenca de kilometragem no octogono pode ser decisiva se a luta for competitiva. Fili sabe como administrar rounds, trabalhar contra a grade, e ganhar pontos em momentos apertados. Delgado nunca precisou fazer isso porque sempre finalizou antes.',
        },
        {
          icon: 'Activity',
          title: 'Cardio de Delgado nao foi testado',
          fighter: 'Delgado',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'Delgado nunca lutou mais de 2 rounds antes da luta com Wood, e quando finalmente foi testado em 3 rounds completos, perdeu. Contra Fili, se nao conseguir a finalizacao cedo, o mesmo padrao pode se repetir. A questao do cardio e a maior duvida sobre Delgado nesse momento da carreira.',
        },
        {
          icon: 'Target',
          title: 'Vulnerabilidade de Fili ao KO',
          fighter: 'Fili',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Fili foi nocauteado por Dan Ige em 2024 com uma unica overhand direita, e por Joanderson Brito em 41 segundos em 2022. Ele tem 4 derrotas por KO/TKO na carreira. Contra um cara que finaliza com volume e poder como Delgado, essa vulnerabilidade e preocupante.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Fili foi finalizado recentemente',
          fighter: 'Fili',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'A derrota por guilhotina contra Melquizael Costa em fevereiro de 2025 quebrou uma sequencia de mais de 10 anos sem ser finalizado por submissao. Delgado tem 4 vitorias por submissao na carreira. Se a luta for pro chao, Fili precisa ter cuidado com pescocos e bracos.',
        },
        {
          icon: 'Brain',
          title: 'Pressao psicologica pos-derrota',
          fighter: 'Delgado',
          risk_level: 'RISCO BAIXO',
          risk_color: 'yellow',
          description: 'A derrota para Wood gerou muita conversa sobre "roubo" e Delgado pode sentir pressao extra para finalizar cedo. Isso pode tanto motivar uma performance explosiva quanto levar a decisoes precipitadas se o plano A nao funcionar nos primeiros minutos.',
        },
        {
          icon: 'Zap',
          title: 'Switch stance de Delgado',
          fighter: 'Delgado',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Delgado luta em switch stance, alternando entre ortodoxa e sulista. Isso cria angulos diferentes e pode atrapalhar o timing de Fili no contragolpe. Fili lutou predominantemente contra ortodoxos ao longo da carreira, e a alternancia de guardas pode ser um fator complicador.',
        },
        {
          icon: 'MapPin',
          title: 'UFC APEX: territorio neutro',
          fighter: 'Fili',
          risk_level: 'NEUTRO',
          risk_color: 'neutral',
          description: 'Ambos sao americanos e ja lutaram varias vezes no APEX. Sem vantagem de torcida para nenhum dos dois. A arena menor sem multidao pode favorecer o foco de Fili, que e mais acostumado ao ambiente.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Fili',
        total_probability: 35,
        scenarios: [
          {
            name: 'A Maratona do Veterano',
            probability: 20,
            method: 'Decisao Unanime ou Dividida',
            description: 'Fili sobrevive o primeiro round, usa wrestling pra desacelerar Delgado, e ganha os rounds finais com controle e volume consistente. Mistura jabs, low kicks e takedowns oportunistas para somar pontos. Delgado comeca a desacelerar no R2, Fili assume o controle no R3. Esse e o caminho mais provavel para uma vitoria de Fili.',
          },
          {
            name: 'Contragolpe Perfeito',
            probability: 10,
            method: 'KO ou TKO R2-R3',
            description: 'Fili encontra o timing do contragolpe contra Delgado, que tende a ser agressivo e aberto. Se Delgado fatigar no R2-R3 e continuar avancando sem cobertura, Fili pode pega-lo com uma direita limpa. Fili ja mostrou poder de nocaute contra Almeida (TKO R1) e tem 10 nocautes na carreira.',
          },
          {
            name: 'Grinding na Grade',
            probability: 5,
            method: 'Decisao apertada',
            description: 'Fili usa sua base de wrestling Alpha Male para pressionar Delgado contra a grade, gastar tempo em clinch, e frustrar o game plan agressivo do adversario. Nao e bonito, mas pode ser efetivo contra um cara que nao sabe lidar com controle prolongado.',
          },
        ],
      },
      fighter2: {
        nome: 'Delgado',
        total_probability: 62,
        scenarios: [
          {
            name: 'Tempestade no Primeiro Round',
            probability: 35,
            method: 'KO ou TKO R1',
            description: 'Delgado faz o que fez nas tres vitorias anteriores: pressiona desde o inicio, conecta combinacoes explosivas, e nao deixa Fili respirar. Com 6.50 SLpM e uma defesa de strikes de apenas 51% do lado de Fili, a matematica favorece Delgado fortemente. Uma joelhada, uma cotovelada, ou uma sequencia de socos pode acabar a luta a qualquer momento nos primeiros 5 minutos.',
          },
          {
            name: 'Finalizacao Apos Knockdown',
            probability: 15,
            method: 'TKO ou Sub R1-R2',
            description: 'Delgado balanca Fili com strikes e segue pro chao para finalizar com ground-and-pound ou submissao. Fili foi finalizado recentemente por guilhotina (Costa) e Delgado tem 4 submissoes na carreira. Se Fili cair depois de um golpe pesado, Delgado tem habilidade para finalizar tanto por strikes quanto por submissao.',
          },
          {
            name: 'Dominio Tatico Completo',
            probability: 12,
            method: 'Decisao Unanime',
            description: 'Delgado controla toda a luta com volume superior e poder de strikes sem necessariamente finalizar. Usa sua vantagem de velocidade e switch stance para confundir Fili e ganhar todos os rounds. Esse cenario e menos provavel porque Delgado nunca venceu por decisao, mas se ele resolver o problema de cardio, e possivel.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // 12. PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Jose Delgado',
      winner_side: 'fighter2',
      predicted_method: 'TKO R1 ou R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Delgado e favorito por boas razoes. Seu volume de strikes (6.50 SLpM contra 3.84 de Fili), sua taxa de finalizacao de 100% nas vitorias, e sua explosividade nos primeiros minutos criam uma dinamica muito perigosa para Fili. O veterano absorve muitos golpes (4.15 SApM com apenas 51% de defesa) e ja foi nocauteado por lutadores menos explosivos que Delgado. A confianca e MEDIA, nao alta, porque Fili ja provou dezenas de vezes que e dificil de ser descartado. Ele venceu 5 decisoes divididas na carreira e tem a capacidade de tornar qualquer luta competitiva. Se Delgado nao finalizar nos primeiros dois rounds, a luta fica muito mais equilibrada.',
      x_factor: {
        title: 'O Cardio Desconhecido',
        description: 'Delgado nunca foi testado em 3 rounds completos contra um veterano que sabe controlar o ritmo. A unica vez que foi a distancia (contra Wood), perdeu. Se Fili conseguir sobreviver os primeiros 5 minutos e puxar a luta para aguas profundas, a juventude de Delgado pode nao ser suficiente para compensar a falta de experiencia em rounds finais.',
      },
      upset_alert: {
        title: 'Upset Alert: Fili por Decisao Dividida',
        description: 'Nao seria chocante. Fili ja fez isso contra Rodriguez, Swanson e Algeo recentemente. Se ele sobreviver o primeiro round, usar wrestling para desacelerar Delgado, e ganhar rounds apertados no cardio, temos mais uma decisao dividida historica para a colecao de Fili. As odds de +250 refletem essa possibilidade.',
      },
      probabilities: {
        fighter1: { nome: 'Fili', percent: 35 },
        fighter2: { nome: 'Delgado', percent: 62 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Delgado ML', reasoning: 'Delgado e favorito justo, mas -300 e caro. O valor real esta nos metodos e props.' },
        method: { pick: 'Delgado por KO/TKO', reasoning: 'Com taxa de finalizacao de 100% e 60% das vitorias por KO/TKO, o metodo e mais previsivel do que o resultado.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Delgado finalizou as tres vitorias no UFC no primeiro round. Mesmo que Fili seja mais duro, a tendencia aponta para finalizacao precoce.' },
        best_value: 'Melhor aposta de valor: Delgado por KO/TKO no R1 ou R2. A linha de metodo e mais generosa que o moneyline e reflete a dinamica real dessa luta.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Os Primeiros 3 Minutos',
          icon: 'Clock',
          description: 'Se Delgado nao machucar Fili nos primeiros 3 minutos, a luta muda completamente de cenario. Observe se Delgado sai com a mesma explosividade das lutas contra Amil e Matthews ou se mostra mais paciencia apos a derrota para Wood. A primeira troca significativa vai ditar o tom da noite.',
        },
        {
          num: 2,
          title: 'O Wrestling de Fili',
          icon: 'Shield',
          description: 'Fili tem 2.22 takedowns por 15 minutos e usou wrestling efetivamente contra Rodriguez. Se ele comecar a misturar takedowns no R1, isso pode desacelerar o ritmo de Delgado e levar a luta para um territorio mais favoravel. Preste atencao se Fili usa single legs apos absorver strikes pesados.',
        },
        {
          num: 3,
          title: 'A Switch Stance de Delgado',
          icon: 'Target',
          description: 'Delgado alterna entre ortodoxa e sulista de forma fluida. Fili lutou predominantemente contra ortodoxos. Observe se a troca de guarda cria aberturas que Fili nao esta acostumado a lidar e se Delgado consegue conectar power shots do lado sulista.',
        },
        {
          num: 4,
          title: 'O Cardio no Segundo Round',
          icon: 'Activity',
          description: 'Este e o momento chave. Se Delgado mantiver o mesmo volume do R1, ele provavelmente vence. Se comecar a desacelerar como fez contra Wood, Fili vai perceber e aumentar a pressao. O volume de strikes de Delgado no segundo round e o indicador mais importante da luta.',
        },
        {
          num: 5,
          title: 'A Reacao de Fili Ao Primeiro Golpe Pesado',
          icon: 'Zap',
          description: 'Fili tem queixo questionavel: foi nocauteado por Ige e Brito com golpes unicos. Se Delgado conectar algo pesado nos primeiros minutos, a reacao de Fili vai definir a luta. Se ele absorver e se recuperar, pode puxar Delgado para aguas profundas. Se vacilar, Delgado vai pra cima pra finalizar.',
        },
      ],
    },

    // -------------------------------------------------
    // 14. CREATOR KIT
    // -------------------------------------------------
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'FILI vs DELGADO',
          content: 'UFC Fight Night: Emmett vs Vallejos\n14 de Marco, 2026\nUFC APEX, Las Vegas\n\nPeso Pena | 3 Rounds\n\nO veterano vs. o finalizador',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'ANDRE FILI',
          content: '25-12-0 | 35 anos\nTeam Alpha Male\n\n25 lutas no UFC desde 2013\n10 nocautes, 12 decisoes\n5 decisoes divididas vencidas\n\n3.84 strikes/min | 37% precisao\n2.22 takedowns/15min',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'JOSE DELGADO',
          content: '10-2-0 | 27 anos\nMMA Lab\n\n100% taxa de finalizacao\n6 KOs + 4 submissoes\n0 vitorias por decisao\n\n6.50 strikes/min | 46% precisao\n26 segundos: KO mais rapido',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'O FATOR CHAVE',
          content: 'Delgado NUNCA venceu por decisao\nFili venceu 12x por decisao\n\nSe a luta passa do R1:\nFili 60% de chance\n\nSe a luta termina no R1:\nDelgado 85% de chance\n\nQuem controla o relogio\ncontrola a luta.',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/5',
          text: 'Fili vs Delgado no UFC Fight Night: Emmett vs Vallejos e o confronto classico de experiencia vs explosividade.\n\nFili: 25 lutas no UFC, 12 decisoes vencidas\nDelgado: 100% de finalizacao, 0 vitorias por decisao\n\nAlguem vai ceder. 🔥',
        },
        {
          num: '2/5',
          text: 'Os numeros de Delgado sao absurdos:\n\n• 6.50 strikes significativos por minuto\n• 100% taxa de finalizacao\n• KO em 26 segundos contra Amil\n• TKO em 2:58 contra Matthews\n\nMas contra Wood, quando a luta foi pra 3 rounds? Perdeu.\n\nIsso e TUDO nessa luta.',
        },
        {
          num: '3/5',
          text: 'Fili a -250 e provavelmente o cara mais subestimado do card.\n\n5 decisoes divididas vencidas na carreira (recorde do peso-pena!)\n2.22 TD/15min pra controlar ritmo\nSabe lutar rounds completos\n\nSe sobreviver o R1, vira outra luta.',
        },
        {
          num: '4/5',
          text: 'A vulnerabilidade de Fili e real:\n\n• KO por Ige (1 soco, R1)\n• KO por Brito (41 segundos)\n• Finalizado por Costa (guilhotina R1)\n\n4.15 strikes absorvidos/min com 51% de defesa.\n\nContra um cara que conecta 6.50/min? A matematica e perigosa.',
        },
        {
          num: '5/5',
          text: 'PREVISAO: Delgado por TKO no R1 ou R2.\n\nMas nao descarte Fili por decisao dividida. Ja fez isso contra Rodriguez, Swanson e Algeo.\n\nO relogio e o personagem principal dessa luta.\n\n#UFC #UFCFightNight #FilivDelgado',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Jose Delgado tem 10 vitorias na carreira e NENHUMA foi por decisao. Andre Fili tem 12 vitorias por decisao, incluindo 5 divididas. O que acontece quando um cara que so sabe finalizar encontra um cara que so sabe sobreviver?"',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Delgado conecta 6.50 strikes por minuto, quase o dobro de Fili. Nocauteou Amil em 26 SEGUNDOS. Mas quando foi pra distancia contra Nathaniel Wood, perdeu. E Fili? O cara absorve mais de 4 strikes por minuto, ja foi nocauteado 4 vezes, mas continua ali. 13 anos no UFC e contando."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"Essa luta se resume a uma pergunta: quanto tempo ela dura? Se Delgado finalizar no R1, ninguem vai se surpreender. Mas se Fili usar seu wrestling pra desacelerar e puxar pro R2 e R3, o cardio desconhecido de Delgado pode ser o fator decisivo. 8 anos de diferenca de idade. 22 lutas de diferenca no UFC."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Cuidado com o queixo de Fili. Cuidado com o cardio de Delgado. E cuidado com o favoritismo pesado de Delgado a -300, porque Fili a +250 ja provou que sabe vencer lutas que todo mundo acha que ele vai perder."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Delgado por TKO no primeiro ou segundo round. Mas nao apostaria a casa. Se voce concorda, comenta Delgado. Se acha que Fili sobrevive, comenta Fili. Essa luta pode dar qualquer coisa."',
        },
      ],
      tiktok: [
        {
          hook: 'Um cara que NUNCA venceu por decisao vs um cara que venceu 12 vezes por decisao. Quem ganha?',
          body: 'Jose Delgado tem 10 vitorias e TODAS foram por finalizacao. 6 nocautes, 4 submissoes. Andre Fili tem 25 lutas no UFC desde 2013 e ja venceu por decisao dividida 5 vezes, recorde da divisao. Delgado conecta 6.50 strikes por minuto, mas nunca passou de 3 rounds. Fili absorve 4 strikes por minuto mas se recusa a perder quando a luta e apertada.',
          cta: 'Delgado finaliza cedo ou Fili sobrevive ate o final? Comenta sua previsao!',
        },
        {
          hook: 'Jose Delgado nocauteou um cara em 26 SEGUNDOS. Agora enfrenta o veterano mais resistente do peso-pena.',
          body: 'Delgado destruiu Hyder Amil em 26 segundos no UFC 317. Antes disso, TKO em 2:58 contra Matthews. Mas contra Nathaniel Wood, quando a luta foi pra distancia, perdeu por unanimidade. Agora enfrenta Andre Fili, o cara com 25 lutas no UFC e 12 vitorias por decisao. Fili ja foi nocauteado 4 vezes, mas sempre volta. A questao nao e SE Delgado vai tentar nocautear. E se Fili aguenta.',
          cta: 'Qual round voce acha que decide? Comenta R1, R2 ou R3!',
        },
        {
          hook: 'ODDS: Delgado -300 contra Fili. Aqui esta porque voce NAO deve ignorar o underdog.',
          body: 'Fili a +250 parece facil de descartar, mas esse cara venceu 5 decisoes divididas na carreira. Recorde do peso-pena. Tem wrestling funcional com 2.22 takedowns por 15 minutos. E sabe lutar rounds completos. Delgado nunca venceu por decisao e mostrou problemas de cardio contra Wood. Se Fili sobreviver os primeiros 5 minutos, as odds mudam completamente.',
          cta: 'Delgado vale -300 ou Fili e o upset da noite? Conta pra gente!',
        },
      ],
      headlines: [
        'FILI vs DELGADO: 100% de finalizacao encontra o rei das decisoes divididas',
        'O teste de cardio que pode expor Jose Delgado no UFC Fight Night',
        'Andre Fili, 35 anos e 25 lutas no UFC: o gatekeeper que se recusa a sair',
        'Delgado precisa de menos de 3 minutos. Fili precisa de mais de 5. Quem ganha o relogio?',
        '26 segundos ou 15 minutos: a matematica que define Fili vs Delgado',
      ],
    },

    // -------------------------------------------------
    // 15. BETTING VALUE (null per protocol)
    // -------------------------------------------------
    betting_value: null,

    // -------------------------------------------------
    // 16. RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '+250',
        fighter2_odds: '-300',
        fighter1_name: 'Andre Fili',
        fighter2_name: 'Jose Delgado',
        source: 'Media de sites de apostas (marco 2026)',
      },
      edges: [
        {
          icon: 'Flame',
          titulo: 'Taxa de Finalizacao de 100%',
          stat_headline: 'DELGADO FINALIZOU TODAS AS 10 VITORIAS DA CARREIRA (6 KO/TKO + 4 SUB)',
          contexto: 'Delgado nunca venceu por decisao na carreira profissional. Esse padrao e extremamente raro no UFC moderno. Mesmo lutadores conhecidos como finalizadores como Derrick Lewis ou Jiri Prochazka eventualmente vencem por pontos. Delgado simplesmente nao sabe (ou nao consegue) vencer sem finalizar.',
          implicacao_aposta: 'Linhas de "Inside the Distance" e "KO/TKO" devem oferecer valor melhor que o moneyline puro de -300. Se Delgado vencer, muito provavelmente sera por finalizacao.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Target',
          titulo: 'Vulnerabilidade de Fili ao KO',
          stat_headline: 'FILI FOI NOCAUTEADO 4 VEZES NA CARREIRA COM 4.15 SApM E 51% DEFESA',
          contexto: 'Fili absorve mais golpes significativos por minuto (4.15) do que aplica (3.84). Isso significa que ele esta constantemente em deficit de strikes. Combinado com uma defesa de strikes de apenas 51%, ele e acertado com frequencia. Contra Delgado, que conecta 6.50 SLpM, a exposicao e ainda maior.',
          implicacao_aposta: 'O diferencial de volume (6.50 vs 3.84 SLpM) e defesa (51% para Fili) sugere que Delgado vai acertar muito. A linha de Delgado por KO/TKO merece atencao especial.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Clock',
          titulo: 'Padrao de Finalizacao Precoce',
          stat_headline: 'DELGADO FINALIZOU 3 DAS 3 VITORIAS NO UFC NO R1 (MEDIA: 1:54)',
          contexto: 'Nas tres vitorias no UFC (incluindo DWCS), Delgado finalizou em: 1:25 (R2 DWCS), 2:58 (R1 Matthews), 0:26 (R1 Amil). A media de duracao das lutas que ele vence e inferior a 2 minutos. Se Fili sobreviver 5 minutos, esta em territorio desconhecido para Delgado.',
          implicacao_aposta: 'Apostas em "Under 1.5 rounds" podem oferecer valor interessante dado o historico de Delgado. Porem, Fili e mais duravel que os oponentes anteriores, entao cautela e necessaria.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Shield',
          titulo: 'O Fator Decisao Dividida de Fili',
          stat_headline: 'FILI VENCEU 5 DECISOES DIVIDIDAS NA CARREIRA (RECORDE NO PESO-PENA UFC)',
          contexto: 'Fili detem o recorde de mais decisoes divididas vencidas na historia do peso-pena do UFC, empatado com Gleison Tibau para o recorde geral da organizacao. Nas ultimas 4 lutas que venceu (Rodriguez, Swanson, Algeo, Almeida), 3 foram por decisao dividida. Isso significa que Fili e perigosamente competente em lutas apertadas.',
          implicacao_aposta: 'A +250, Fili tem valor como underdog. Em lutas que vao a distancia, ele historicamente ganha os rounds apertados. Se voce acredita que a luta passa do R1, Fili por decisao pode ser uma aposta inteligente.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Activity',
          titulo: 'Cardio Nao Testado vs Cardio Comprovado',
          stat_headline: 'DELGADO: 0 VITORIAS POR DECISAO EM 10W | FILI: 12 VITORIAS POR DECISAO EM 25W',
          contexto: 'A unica vez que Delgado foi pra 3 rounds completos (contra Wood), perdeu. Fili tem 12 vitorias por decisao e rotineiramente luta 15 minutos completos. A diferenca de condicionamento para lutas longas e abismal. Se a luta nao terminar no R1, o condicionamento de Fili se torna seu maior trunfo.',
          implicacao_aposta: 'Props como "Goes to Decision" combinados com Fili ML podem criar parlays de valor. Se a luta vai pra decisao, Fili e favorito nesse cenario.',
          edge_level: 'moderado',
          fighter_side: 'neutral',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Delgado por KO/TKO',
          odds: '-110 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'O moneyline de -300 e caro, mas a linha de metodo deve ser mais favoravel dado o historico de Delgado.',
          raciocinio: 'Delgado tem 60% das vitorias por KO/TKO e um volume de strikes (6.50 SLpM) que deve sobrecarregar a defesa fraca de Fili (51%). O padrao e consistente: Delgado pressiona, conecta, e finaliza. Contra um cara que absorve 4.15 SLpM, o KO/TKO e o desfecho mais logico.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Under 2.5 Rounds',
          odds: '-140 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'O historico de ambos sugere finalizacao precoce como cenario mais provavel.',
          raciocinio: 'Delgado finalizou 3 das 3 vitorias no UFC no R1. Fili foi nocauteado no R1 por Ige e Brito. Embora Fili seja mais duravel que os oponentes anteriores de Delgado, a tendencia de finalizacao precoce e consistente. O Under 2.5 reflete o cenario mais provavel.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Fili ML (+250)',
          odds: '+250',
          confianca: 'baixa',
          edge_vs_mercado: 'Fili a +250 tem valor se voce acredita que a luta vai pra distancia.',
          raciocinio: 'Fili nao e um underdog qualquer. Tem 25 lutas no UFC, 5 decisoes divididas vencidas, e wrestling funcional. Se sobreviver os primeiros 5 minutos (algo que fez contra Rodriguez e Swanson recentemente), a luta vira para seu territorio. A +250, o retorno justifica o risco para apostas menores.',
        },
        {
          tipo: 'Duracao',
          pick: 'Luta nao vai a distancia',
          odds: '-170 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Delgado nunca venceu por decisao e Fili tem 4 derrotas por KO/TKO. Alguma coisa provavelmente acontece antes do final.',
          raciocinio: 'Combinando a taxa de finalizacao de Delgado (100%) com a vulnerabilidade de Fili ao KO (4 nocautes sofridos), a probabilidade de finalizacao e alta. Mesmo que Fili venca, pode ser por TKO tardio no R2-R3. O cenario de decisao completa e o menos provavel nessa luta.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Delgado ML Isolado a -300',
        descricao: 'Apostar no moneyline puro de Delgado a -300 parece seguro, mas voce precisa arriscar 300 para ganhar 100. Fili ja provou multiplas vezes que pode vencer lutas que todo mundo acha que ele vai perder. 5 decisoes divididas na carreira significam que ele sabe ganhar rounds apertados quando precisa. O valor esta nos props (metodo, round, over/under), nao no moneyline isolado. Se voce gosta de Delgado, especifique o COMO, nao apenas o QUEM.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
