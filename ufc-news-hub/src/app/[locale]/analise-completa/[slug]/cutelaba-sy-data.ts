import type { FullSingleAnalise } from '@/types/analise';

export const cutelabaSyAnalise: FullSingleAnalise = {
  id: 'cutelaba-sy-ufn-mar-14',
  evento_id: null,
  slug: 'cutelaba-sy-ufn-mar-14',
  titulo: 'Cutelaba vs Sy: Explosao Contra Envergadura',
  subtitulo: 'Meio-pesados em rota de colisao no APEX',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'Decision', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Ion Cutelaba', record: '19-11-1', ultimasLutas: [] },
  fighter2_info: { nome: 'Oumar Sy', record: '12-1-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Meio-Pesado',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas',
      categoria_peso: 'Meio-Pesado (205 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'EXPLOSAO CONTRA ENVERGADURA',
      tagline_sub: 'O Hulk moldavo encara o gigante frances numa guerra de estilos opostos.',
      fighter1: {
        nome_completo: 'Ion "The Hulk" Cutelaba',
        apelido: 'The Hulk',
        sobrenome: 'Cutelaba',
        record: '19-11-1',
        ranking: 'Sem ranking LHW',
        info_extra: 'Chisinau, Moldova | 32 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Oumar Sy',
        apelido: '',
        sobrenome: 'Sy',
        record: '12-1-0',
        ranking: 'Sem ranking LHW',
        info_extra: 'Paris, Franca | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Veterano Contra o Prospecto</h3>
        <p><strong class="text-ufc-red">Ion Cutelaba</strong> e um dos lutadores mais imprevisíveis da divisao dos meio-pesados. Com 21 lutas no UFC, ele ja mostrou tudo: nocautes brutais no primeiro round, finalizacoes surpreendentes, mas tambem derrotas por decisao quando o cardio acaba. Seu recorde de 8-10-1 no UFC conta uma historia de um lutador com poder de elite mas consistencia questionavel. Aos 32 anos, cada luta e uma batalha pela sobrevivencia no roster.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Gigante de Paris</h3>
        <p><strong class="text-blue-400">Oumar Sy</strong> e o tipo de prospecto que faz treinadores perderem o sono. Com apenas 4 lutas no UFC e um recorde de 3-1, o frances de 1.93m e 211cm de envergadura esta construindo algo especial. Sua unica derrota, uma decisao unanime contra Alonzo Menifield, mostrou que ele ainda precisa crescer, mas suas vitorias por TKO sobre Ribeiro e finalizacao relampago de Tokkos mostraram um arsenal perigoso. Com 100% de defesa de takedown no UFC, ele e praticamente impossivel de derrubar.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Equacao do APEX</h3>
        <p>O octogono menor do Meta APEX favorece <strong class="text-ufc-red">Cutelaba</strong>, que precisa encurtar distancia para usar seu poder e takedowns. Mas <strong class="text-blue-400">Sy</strong> tem 8 polegadas de vantagem na envergadura, o que significa que mesmo no APEX ele consegue manter distancia com o jab. Essa luta se resume a uma pergunta simples: Cutelaba consegue chegar perto antes do gas acabar?</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (abaixo de .500 no UFC)', fighter2: 'Sem ranking (3-1 no UFC)' },
        { dimensao: 'Objetivo', fighter1: 'Sequencia de 2 vitorias, se manter no UFC', fighter2: 'Construir recorde, subir no ranking' },
        { dimensao: 'Narrativa', fighter1: 'Veterano lutando pela relevancia', fighter2: 'Prospecto em ascensao provando valor' },
        { dimensao: 'Risco', fighter1: 'Derrota pode significar corte do UFC', fighter2: 'Derrota em sequencia freia o hype' },
        { dimensao: 'Recompensa', fighter1: '3 vitorias seguidas pela primeira vez no UFC', fighter2: 'Vitoria sobre veterano consolida posicao' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O HULK SOBREVIVE MAIS UMA VEZ',
          subtitulo: 'Cutelaba prova que ainda tem poder para competir nos meio-pesados.',
          consequencias: [
            { tag: 'SEQUENCIA', texto: '3 vitorias consecutivas pela primeira vez na carreira no UFC. Momento historico pessoal.' },
            { tag: 'ROSTER', texto: 'Garante permanencia confortavel no UFC e possivelmente um oponente ranqueado.' },
            { tag: 'CONFIANCA', texto: 'Vitoria sobre prospecto de 12-1 mostra que o veterano ainda e relevante na divisao.' },
          ],
          proxima_luta: 'Oponente na faixa #12-15 do ranking dos meio-pesados',
        },
        fighter2_vence: {
          titulo: 'SY DERRUBA O VETERANO',
          subtitulo: 'O gigante frances continua sua ascensao nos meio-pesados.',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Recorde vai para 4-1 no UFC, se aproximando do top 15 da divisao.' },
            { tag: 'CREDIBILIDADE', texto: 'Derrotar um veterano de 21 lutas no UFC prova que pertence ao alto nivel.' },
            { tag: 'HYPE', texto: 'Com 6\'4" e 83" de envergadura, passa a ser visto como ameaca real na divisao.' },
          ],
          proxima_luta: 'Oponente ranqueado #12-15 ou veterano estabelecido',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Ion Cutelaba',
        color: 'red',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Modestas Bukauskas', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu decisao apertada. Comecou forte mas desacelerou nos rounds finais.' },
          { date: 'Fev 2025', opponent: 'Aslan', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao rapida no primeiro round. Mostrou habilidade no chao surpreendente.' },
          { date: 'Set 2024', opponent: 'Erslan', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada por decisao dividida contra oponente sem ranking.' },
          { date: 'Mar 2024', opponent: 'Philipe Lins', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu por decisao unanime. Cardio falhou novamente nos rounds finais.' },
          { date: 'Abr 2023', opponent: 'Tim Boser', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute explosivo no primeiro round. O Cutelaba classico quando encontra o timing cedo.' },
        ],
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Cutelaba vem alternando vitorias e derrotas, o padrao da sua carreira inteira no UFC. A derrota por decisao dividida contra Bukauskas mostra o problema de sempre: poder explosivo que se dissipa apos o primeiro round. Quando finaliza cedo, e devastador. Quando a luta se estende, tende a perder. O recorde de 8-10-1 no UFC fala por si.',
      },
      fighter2: {
        nome: 'Oumar Sy',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Carlos Ribeiro', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizou com strikes no segundo round. Mostrou paciencia e timing superior.' },
          { date: 'Jun 2025', opponent: 'Alonzo Menifield', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota da carreira. Menifield controlou o ritmo com wrestling e pressao constante.' },
          { date: 'Set 2024', opponent: 'Da Woon Jung', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida por decisao unanime. Usou a envergadura para controlar a distancia por 3 rounds.' },
          { date: 'Mai 2024', opponent: 'Tuco Tokkos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao rapida no primeiro round. Mostrou habilidade no chao alem do striking.' },
        ],
        momentum_score: 6,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Sy vem de uma vitoria por TKO sobre Ribeiro e esta construindo confianca. A derrota para Menifield foi um momento de aprendizado, nao uma exposicao. Com 12-1 no geral e apenas 4 lutas no UFC, ele ainda esta em fase de crescimento. A combinacao de tamanho, versatilidade e juventude sugere que o melhor esta por vir.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Cutelaba',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Sy',
        media_oponentes: 1.5,
        media_oponentes_label: 'Ruim',
        aproveitamento: '3W-1L (75%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Cutelaba e Sy nunca enfrentaram oponentes em comum no UFC. Cutelaba tem uma carreira longa com 21 lutas na organizacao, enquanto Sy tem apenas 4. A comparacao direta e limitada, mas os estilos contrastantes tornam essa luta fascinante do ponto de vista tecnico.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.28, valueB: 3.68, maxVal: 6, format: 'decimal', note: 'Cutelaba com volume significativamente maior. Pressiona e lanca mais golpes.' },
        { label: 'Precisao de Strikes (%)', valueA: 43, valueB: 50, maxVal: 100, format: 'percent', note: 'Sy e mais preciso, aproveitando a envergadura para golpes limpos.' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.36, valueB: 1.81, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Sy absorve quase metade dos strikes que Cutelaba. Defesa e distancia superiores.' },
        { label: 'Defesa de Strikes (%)', valueA: 48, valueB: 70, maxVal: 100, format: 'percent', note: 'Vantagem massiva de Sy. 70% contra 48% e uma diferenca enorme.' },
        { label: 'Takedowns por 15 Min', valueA: 3.77, valueB: 2.22, maxVal: 5, format: 'decimal', note: 'Cutelaba tenta significativamente mais takedowns. Arma importante no gameplan.' },
        { label: 'Precisao de Takedown (%)', valueA: 52, valueB: 33, maxVal: 100, format: 'percent', note: 'Cutelaba converte metade das tentativas. Sy ainda precisa melhorar nesse aspecto.' },
        { label: 'Defesa de Takedown (%)', valueA: 75, valueB: 100, maxVal: 100, format: 'percent', note: 'Sy com 100% de defesa de takedown no UFC. Nunca foi derrubado. Estatistica impressionante.' },
        { label: 'Submissoes por 15 Min', valueA: 0.50, valueB: 0.40, maxVal: 2, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '30 anos', note: 'Sy 2 anos mais jovem' },
        { label: 'Altura', fighter1: '1.85m (6\'1")', fighter2: '1.93m (6\'4")', note: 'Sy 8cm mais alto' },
        { label: 'Envergadura', fighter1: '190cm (75")', fighter2: '211cm (83")', note: 'Sy com 8 polegadas de vantagem, diferenca massiva' },
        { label: 'Stance', fighter1: 'Canhoto (Southpaw)', fighter2: 'Ortodoxa', note: 'Dinamica southpaw vs ortodoxo' },
        { label: 'Academia', fighter1: 'WWFC Promotion, Moldova', fighter2: 'Bulgarian Top Team, Paris', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 82, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Cutelaba tem 68% de vitorias por KO/TKO. Poder explosivo, especialmente no primeiro round. Sy tem nocautes mas nao no mesmo nivel de brutalidade.' },
        { label: 'Striking Tecnico', valueA: 50, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Sy usa a envergadura com inteligencia, mantendo distancia e acertando golpes limpos. Cutelaba e mais selvagem e menos preciso (43% vs 50%).' },
        { label: 'Grappling / Takedowns', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Cutelaba com 3.77 TD/15min e 52% de precisao. Porem, Sy tem 100% de defesa de takedown no UFC, o que pode anular essa vantagem.' },
        { label: 'Defesa / Durabilidade', valueA: 45, valueB: 75, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Sy absorve apenas 1.81 SApM com 70% de defesa de strikes. Cutelaba absorve 3.36 SApM com apenas 48% de defesa.' },
        { label: 'Cardio / Resistencia', valueA: 35, valueB: 70, labelA: 'Ruim', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'O calcanhar de Aquiles de Cutelaba. Explode no R1 mas desacelera drasticamente. Suas derrotas por decisao contam a historia. Sy mantem ritmo constante.' },
        { label: 'QI de Luta / Adaptacao', valueA: 45, valueB: 60, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Sy mostra maturidade para alguem com pouca experiencia no UFC. Cutelaba e previsivel: vai pra frente com tudo e torce pro poder resolver.' },
      ],
      insight: 'O perfil de habilidades revela uma luta de contrastes extremos. <strong class="text-ufc-red">Cutelaba</strong> tem vantagem clara em poder e grappling ofensivo, mas <strong class="text-blue-400">Sy</strong> domina em praticamente todas as outras categorias. A chave esta no cardio: se Cutelaba nao resolver cedo, as deficiencias de resistencia e defesa vao se tornando fatais round a round.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Cutelaba',
        ko_tko: { count: 13, percent: 68 },
        submission: { count: 3, percent: 16 },
        decision: { count: 3, percent: 16 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Sy',
        ko_tko: { count: 5, percent: 42 },
        submission: { count: 4, percent: 33 },
        decision: { count: 3, percent: 25 },
        total_wins: 12,
      },
      insight: 'Cutelaba e um finalizador nato: 68% das vitorias por KO/TKO, com a maioria vindo no primeiro round. Sy e mais equilibrado com 42% KO, 33% finalizacao e 25% decisao, mostrando versatilidade. A diferenca e que Cutelaba depende do poder para vencer, enquanto Sy tem multiplos caminhos para a vitoria.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM CUTELABA',
          color: 'red',
          title: 'A Tempestade Moldava',
          description: 'O primeiro round e onde Cutelaba e mais perigoso. A maioria dos seus KOs vem nos primeiros minutos, quando a explosividade esta no pico. O southpaw stance combinado com entradas de takedown agressivas e golpes de poder criam um ambiente caotico. Sy precisa sobreviver essa tempestade inicial sem se deixar encurralar contra a grade.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Transicao',
          description: 'O segundo round e o ponto de virada. Se Cutelaba ainda tem gas e nao finalizou, ele comeca a desacelerar visivelmente. Se Sy manteve distancia e acumulou dano com golpes longos, a vantagem comeca a mudar. Esse e o round onde o controle de distancia de Sy pode comecar a dominar.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM SY',
          color: 'green',
          title: 'Territorio do Gigante',
          description: 'O terceiro round favorece Sy fortemente. O cardio de Cutelaba historicamente nao aguenta 3 rounds completos em ritmo alto. Com 8 polegadas de vantagem na envergadura e defesa de strikes de 70%, Sy pode dominar um Cutelaba cansado com jabs e golpes a distancia. Se a luta chega aqui equilibrada, Sy leva nos cartoes.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: 'Explosividade sobrenatural no R1', fighter: 'Cutelaba', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Cutelaba e um dos lutadores mais explosivos da divisao nos primeiros minutos. Seus 13 KOs falam por si. Quando ele encontra o timing cedo, a luta acaba antes de comecar de verdade.' },
        { icon: 'Activity', title: 'Cardio historicamente ruim', fighter: 'Cutelaba', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'O padrao e claro: Cutelaba comeca forte e desacelera. Suas derrotas por decisao contra Bukauskas e Lins seguem o mesmo roteiro. Se Sy aguentar o primeiro round, o gas de Cutelaba se torna o fator decisivo.' },
        { icon: 'Shield', title: '100% de defesa de takedown no UFC', fighter: 'Sy', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Em 4 lutas no UFC, Sy nunca foi derrubado. Contra Cutelaba, que depende fortemente de takedowns (3.77/15min), essa estatistica e crucial. Se Cutelaba nao conseguir derrubar Sy, perde uma arma importante.' },
        { icon: 'TrendingUp', title: 'Vantagem massiva de envergadura (8 polegadas)', fighter: 'Sy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Com 83 polegadas contra 75, Sy tem uma vantagem de envergadura enorme. Isso permite controlar distancia com jabs e golpes retos que Cutelaba simplesmente nao consegue alcancar sem entrar na zona de perigo.' },
        { icon: 'AlertTriangle', title: 'Recorde abaixo de .500 no UFC (8-10-1)', fighter: 'Cutelaba', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Cutelaba esta 8-10-1 no UFC. Embora venha de 2 vitorias nas ultimas 3, o recorde geral sugere inconsistencia cronica. A pressao de precisar vencer para se manter no roster pode ser positiva ou negativa.' },
        { icon: 'Clock', title: 'Apenas 4 lutas no UFC', fighter: 'Sy', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Sy ainda e relativamente inexperiente no UFC. Contra um veterano de 21 lutas como Cutelaba, a experiencia pode fazer diferenca em momentos de pressao e adversidade.' },
        { icon: 'Brain', title: 'Dinamica southpaw vs ortodoxo', fighter: 'Cutelaba', risk_level: 'POSITIVO', risk_color: 'green', description: 'Cutelaba e canhoto, o que cria angulos diferentes e pode confundir Sy. A mao esquerda de poder vem de um angulo que muitos ortodoxos nao estao acostumados a defender.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Cutelaba',
        total_probability: 40,
        scenarios: [
          { name: 'A Blitzkrieg Moldava', probability: 20, method: 'KO/TKO R1', description: 'Cutelaba avanca como um touro desde o primeiro segundo, encurta a distancia com entradas explosivas e conecta a mao esquerda de poder. A pressao caotica nao da tempo para Sy usar a envergadura. O mesmo script que funcionou contra Boser.' },
          { name: 'Takedown e Destruicao', probability: 12, method: 'TKO R1-R2', description: 'Cutelaba mistura takedowns com strikes de poder. Mesmo com a defesa de takedown perfeita de Sy, a agressividade constante pode eventualmente furar. No chao, Cutelaba tem submissoes perigosas e ground and pound pesado.' },
          { name: 'Sobrevivencia Tatica', probability: 8, method: 'Decisao Dividida', description: 'Cutelaba vence o primeiro round de forma dominante e consegue fazer o suficiente nos rounds seguintes para convencer os juizes. Cenario menos provavel dado o historico de queda de rendimento.' },
        ],
      },
      fighter2: {
        nome: 'Sy',
        total_probability: 57,
        scenarios: [
          { name: 'Morte por Distancia', probability: 25, method: 'Decisao Unanime', description: 'Sy usa os 211cm de envergadura para manter Cutelaba longe com jabs, diretos e front kicks. Defende os takedowns com facilidade (100% TD def) e acumula pontos consistentemente. Nos rounds finais, Cutelaba esta cansado e Sy domina.' },
          { name: 'O Nocaute do Gigante', probability: 18, method: 'TKO R2-R3', description: 'Sy usa o primeiro round para estudar o timing de Cutelaba. No segundo ou terceiro round, com Cutelaba ja desacelerando, Sy encontra o timing para um nocaute com golpes longos. O mesmo padrao da vitoria sobre Ribeiro.' },
          { name: 'Finalizacao Surpresa', probability: 8, method: 'Sub R2-R3', description: 'Se a luta for para o chao com Cutelaba cansado, Sy pode inverter posicao e buscar uma finalizacao. Suas 4 submissoes na carreira mostram que ele tem habilidade no chao.' },
          { name: 'Defesa e Contra-Ataque', probability: 6, method: 'Decisao Unanime', description: 'Sy absorve a pressao inicial de Cutelaba com defesa de 70% e contra-ataca com precisao. Uma abordagem mais conservadora que acumula pontos sem tomar riscos desnecessarios.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Oumar Sy',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Sy tem vantagens em quase todas as categorias que importam em uma luta de 3 rounds: envergadura (8 polegadas a mais), defesa de strikes (70% vs 48%), strikes absorvidos (1.81 vs 3.36), defesa de takedown (100% vs 75%), e cardio. O unico cenario onde Cutelaba vence e se finalizar no primeiro round, e embora esse cenario seja real (68% de vitorias por KO), as ferramentas defensivas de Sy sugerem que ele pode sobreviver a tempestade inicial. A partir do segundo round, as vantagens fisicas e de resistencia de Sy devem dominar.',
      x_factor: {
        title: 'A Defesa de Takedown Perfeita de Sy',
        description: '100% de defesa de takedown em 4 lutas no UFC e uma estatistica extraordinaria. Cutelaba depende fortemente de takedowns (3.77/15min) para complementar o striking. Se Sy mantiver essa marca, remove uma arma crucial do arsenal de Cutelaba e forca o moldavo a vencer exclusivamente no striking, onde absorve muito dano.',
      },
      upset_alert: {
        title: 'Upset Alert: Cutelaba por KO no Primeiro Round',
        description: 'Cutelaba e perigoso demais no primeiro round para ser descartado. Seu poder como canhoto cria angulos imprevisíveis, e a mao esquerda pode desligar qualquer um. Se ele entrar como um touro e conectar algo limpo nos primeiros 2 minutos, toda a analise estatistica se torna irrelevante. Um soco e tudo que ele precisa.',
      },
      probabilities: {
        fighter1: { nome: 'Cutelaba', percent: 40 },
        fighter2: { nome: 'Sy', percent: 57 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 2 Minutos', icon: 'Clock', description: 'Cutelaba vai partir pra cima com tudo desde o primeiro segundo. Se ele conectar algo pesado nesses primeiros 2 minutos, a luta pode acabar ali. Se Sy sobreviver e manter a compostura, a vantagem comeca a mudar rapidamente.' },
        { num: 2, title: 'O Jab de Sy', icon: 'Target', description: 'Com 83 polegadas de envergadura, o jab de Sy pode ser a arma mais importante da luta. Se ele conseguir estabelecer o jab nos primeiros trocas e manter Cutelaba a distancia, e sinal de que vai controlar o ritmo. Observe a frequencia e precisao desse golpe.' },
        { num: 3, title: 'Tentativas de Takedown', icon: 'Shield', description: 'Cutelaba tenta 3.77 takedowns por 15 minutos. Sy defende 100%. Algo tem que ceder. Se Cutelaba conseguir o primeiro takedown da carreira UFC de Sy, muda tudo. Se Sy continuar defendendo, Cutelaba vai gastar energia preciosa sem retorno.' },
        { num: 4, title: 'Respiracao de Cutelaba no R2', icon: 'Activity', description: 'Preste atencao na respiracao de Cutelaba no inicio do segundo round. Se ele estiver de boca aberta e com as maos mais baixas, e o sinal classico de que o gas acabou. A partir desse ponto, Sy pode comecar a pressionar sem medo.' },
        { num: 5, title: 'A Mao Esquerda de Poder', icon: 'Zap', description: 'Cutelaba e canhoto e sua mao esquerda e uma arma letal. Observe se Sy esta se movendo para a direita (para longe do poder) ou para a esquerda (entrando na linha de fogo). A direcao do footwork de Sy pode decidir a luta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'CUTELABA VS SY', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nMeio-Pesado\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'ION CUTELABA', content: '19-11-1 | The Hulk\n\n68% de vitorias por KO/TKO\n3.77 takedowns por 15 min\nCanhoto com poder brutal\n8-10-1 no UFC', color: 'red' },
        { slide_number: 3, title: 'OUMAR SY', content: '12-1-0 | O Gigante Frances\n\n6\'4" com 83" de envergadura\n100% defesa de takedown no UFC\n70% defesa de strikes\nAbsorve apenas 1.81 strikes/min', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE DA LUTA', content: 'TEMPO.\n\nCutelaba precisa resolver no R1\nSy precisa sobreviver a tempestade\n\n8 polegadas de envergadura\nExplosao vs Resistencia', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'Sy por Decisao ou TKO tardio\nConfianca: MEDIA\n\n57% Sy | 40% Cutelaba | 3% Empate\n\nSe passar do R1, Sy domina', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Cutelaba vs Sy no APEX sabado. O Hulk moldavo com 68% de KOs contra o gigante frances com 100% de defesa de takedown. Estilos opostos, resultado imprevisivel.' },
        { num: '2/5', text: 'Ion Cutelaba: 19-11-1 (8-10-1 no UFC). Parece ruim no papel, mas 13 dos 19 nocautes por KO/TKO. Quando conecta, apaga. O problema? O cardio que acaba depois de 5 minutos.' },
        { num: '3/5', text: 'Oumar Sy: 12-1-0, 6\'4" com 83 POLEGADAS de envergadura. 100% de defesa de takedown no UFC. Absorve apenas 1.81 strikes por minuto. E impossivel derrubar e dificil de acertar.' },
        { num: '4/5', text: 'A chave: se Cutelaba nao resolver no primeiro round, Sy domina. O cardio de Cutelaba e o calcanhar de Aquiles. Sy so precisa sobreviver a tempestade e usar a envergadura no R2-R3.' },
        { num: '5/5', text: 'Minha previsao: Sy por decisao unanime ou TKO tardio. 57% Sy, 40% Cutelaba. Mas CUIDADO: Cutelaba e perigoso demais no R1 pra ser ignorado. Mao esquerda de canhoto desliga qualquer um.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O lutador com o pior cardio do UFC contra o cara que e IMPOSSIVEL de derrubar. 68% de nocautes contra 100% de defesa de takedown. Cutelaba vs Sy, sabado no APEX."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Cutelaba: 19-11-1, canhoto, 13 KOs, explode no primeiro round e depois apaga. Sy: 12-1, 6\'4 com 83 polegadas de envergadura, absorve menos de 2 strikes por minuto, nunca foi derrubado no UFC."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Essa luta se resume a TEMPO. Os primeiros 5 minutos sao de Cutelaba. Se ele conectar a mao esquerda, acabou. Mas se Sy aguentar a tempestade, a envergadura de 8 polegadas e o cardio superior vao dominar do segundo round em diante."' },
        { time: '40-50s', title: 'A Chave', text: '"A defesa de takedown de Sy e PERFEITA no UFC. 100%. Cutelaba tenta quase 4 takedowns por luta. Se nao conseguir derrubar Sy, gasta energia sem retorno e o gas acaba mais rapido. Essa estatistica pode decidir tudo."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Minha previsao: Sy por decisao ou TKO tardio. Mas o primeiro round vai ser CAOS. Cutelaba e perigoso demais pra ser ignorado. Comenta: explosao de Cutelaba ou envergadura de Sy?"' },
      ],
      tiktok: [
        { hook: 'O cara com 100% de defesa de takedown no UFC contra o Hulk que nocauteia TUDO no primeiro round.', body: 'Cutelaba: 13 KOs, canhoto, explode no R1. Sy: 6\'4", 83" de envergadura, nunca derrubado. Se Cutelaba nao resolver em 5 minutos, Sy domina com distancia e cardio.', cta: 'Quem vence? Comenta HULK ou GIGANTE.' },
        { hook: '8 POLEGADAS de vantagem na envergadura. OITO.', body: 'Oumar Sy tem 83 polegadas de envergadura contra 75 de Cutelaba. Absorve menos de 2 strikes por minuto com 70% de defesa. E impossivel de derrubar. 100% de TD defense no UFC. Contra um cara que tenta 4 takedowns por luta.', cta: 'Segue pra mais analises que voce nao encontra em nenhum outro lugar.' },
        { hook: 'O MAIOR problema de Ion Cutelaba em UMA estatistica.', body: 'Cutelaba tem 68% de KOs. Parece otimo, ne? Mas olha o recorde no UFC: 8-10-1. ABAIXO de .500. O problema? O cardio ACABA depois do primeiro round. Todas as derrotas por decisao seguem o mesmo padrao: domina R1, morre R2-R3.', cta: 'Salva esse video e assiste sabado depois da luta. Vai fazer sentido.' },
      ],
      headlines: [
        'Cutelaba vs Sy: Explosao Moldava Contra a Muralha Francesa',
        '100% de Defesa de Takedown: O Numero Que Define Oumar Sy',
        'O Hulk Contra o Gigante: 8 Polegadas de Envergadura em Jogo',
        'Cutelaba Pode Resolver Antes do Gas Acabar?',
        'UFC Fight Night: O Duelo de Extremos nos Meio-Pesados',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+130',
        fighter2_odds: '-155',
        fighter1_name: 'Cutelaba',
        fighter2_name: 'Sy',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Shield', titulo: 'Defesa de Takedown Perfeita', stat_headline: '100% DE DEFESA DE TAKEDOWN EM 4 LUTAS NO UFC', contexto: 'Sy nunca foi derrubado no UFC. Cutelaba tenta 3.77 takedowns por 15 minutos e converte 52%. Algo precisa ceder, mas historicamente Sy tem defendido tudo. Essa estatistica neutraliza uma das principais armas de Cutelaba.', implicacao_aposta: 'Favorece Sy em qualquer mercado de decisao. Se Cutelaba nao conseguir derrubar, perde uma arma crucial e gasta energia inutilmente. Aumenta a probabilidade de a luta ir para a distancia.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Taxa de Nocaute de Cutelaba', stat_headline: '68% DE VITORIAS POR KO/TKO (13 DE 19)', contexto: 'Cutelaba e um finalizador nato, com a maioria dos seus KOs vindo no primeiro round. O stance de canhoto cria angulos perigosos. Contra um oponente com 48% de defesa de strikes seria dominante, mas Sy tem 70%.', implicacao_aposta: 'Apostas em Cutelaba por KO/TKO R1 podem ter valor se as odds forem atrativas. O risco e que Sy tem defesa muito superior aos oponentes que Cutelaba normalmente finaliza.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Problema Cronico de Cardio', stat_headline: 'CUTELABA 8-10-1 NO UFC COM MAIORIA DAS DERROTAS POR DECISAO', contexto: 'O padrao e repetitivo: Cutelaba domina o primeiro round e desacelera drasticamente. Em uma luta de 3 rounds, ele precisa resolver cedo. Se nao resolver, as pernas ficam pesadas e a defesa cai.', implicacao_aposta: 'Cria valor em Over 1.5 rounds e em Sy por decisao. Se a luta passar do primeiro round, a probabilidade de vitoria de Sy aumenta significativamente.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Vantagem de Envergadura Massiva', stat_headline: '83" VS 75" DE ENVERGADURA (8 POLEGADAS DE DIFERENCA)', contexto: 'A diferenca de envergadura e uma das maiores em uma luta de meio-pesados no UFC recente. Sy pode acertar Cutelaba sem ser alcancado. Combinado com 50% de precisao contra 43% de Cutelaba, a matematica favorece o frances.', implicacao_aposta: 'Favorece Sy em mercados de total de strikes e decisao. A distancia que Sy pode manter torna mais dificil para Cutelaba conectar golpes significativos.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Experiencia no UFC', stat_headline: 'CUTELABA 21 LUTAS NO UFC VS SY COM APENAS 4', contexto: 'A diferenca de experiencia e enorme. Cutelaba ja viu tudo no octogono: vitorias brutais, derrotas dolorosas, decisoes divididas. Sy ainda esta aprendendo. Em momentos de pressao, a experiencia pode contar.', implicacao_aposta: 'Pode criar valor em Cutelaba como underdog se as odds forem boas. Veteranos com experiencia em momentos de pressao as vezes surpreendem prospectos em ascensao.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Sy ML', odds: '-155 (estimado)', confianca: 'media', edge_vs_mercado: 'Sy tem vantagens em tamanho, defesa, cardio e defesa de takedown. A -155 o preco e justo, mas as vantagens estatisticas sao claras.', raciocinio: 'Sy e superior em quase todas as metricas defensivas. 100% de defesa de takedown neutraliza a principal arma complementar de Cutelaba. O cardio superior torna o R2-R3 territorio de Sy.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-140 (estimado)', confianca: 'media', edge_vs_mercado: 'Cutelaba tem poder para resolver no R1, mas Sy absorve apenas 1.81 SApM com 70% de defesa. A combinacao sugere que Sy sobrevive o primeiro round.', raciocinio: 'Sy tem a defesa e o tamanho para sobreviver a explosao inicial de Cutelaba. Seus 70% de defesa de strikes e envergadura de 83" criam uma barreira dificil de quebrar mesmo no round mais perigoso.' },
        { tipo: 'Metodo', pick: 'Sy por Decisao', odds: '+160 (estimado)', confianca: 'media', raciocinio: 'Se a luta passa do primeiro round, Sy domina com distancia e cardio. 3 das 12 vitorias de Sy foram por decisao, mostrando que ele sabe pontuar. Contra um Cutelaba cansado no R2-R3, acumular pontos e o caminho mais provavel.' },
        { tipo: 'Metodo', pick: 'Cutelaba por KO/TKO R1', odds: '+350 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Valor como aposta de risco. Cutelaba e extremamente perigoso no R1 e a mao esquerda de canhoto cria angulos dificeis.', raciocinio: 'Aposta de alto risco, alta recompensa. Cutelaba tem o poder para finalizar qualquer um no primeiro round. Se as odds estiverem acima de +300, pode ter valor como aposta pequena.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Cutelaba por Decisao',
        descricao: 'Apostar em Cutelaba por decisao e jogar dinheiro fora. Cutelaba tem apenas 3 vitorias por decisao na carreira inteira (16% das vitorias), e seu cardio nao sustenta um ritmo competitivo por 3 rounds. Se a luta for para a decisao, Sy vai estar na frente nos cartoes. Cutelaba ou resolve cedo ou perde.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
