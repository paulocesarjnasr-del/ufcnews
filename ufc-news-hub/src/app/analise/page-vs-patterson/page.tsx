import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'page-vs-patterson',
  evento_id: null,
  slug: 'page-vs-patterson',
  titulo: 'Page vs Patterson: O Showman Contra o Finalizador',
  subtitulo: 'O veterano do karate ponto contra o jovem britanico que finaliza todo mundo',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,91m', envergadura: '196cm', idade: 38, academia: 'London Shootfighters' },
      fighter2: { altura: '1,91m', envergadura: '198cm', idade: 29, academia: 'Team Crossface' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter2',
    predictedMethod: 'Submissao R1-R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Michael Page',
    record: '24-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Jared Cannonier', method: 'Decisao Unanime', event: 'UFC 319' },
      { result: 'L', opponent: 'Ian Garry', method: 'Decisao Unanime', event: 'UFC 303' },
      { result: 'L', opponent: 'Kevin Holland', method: 'TKO R2', event: 'UFC 299' },
    ],
  },
  fighter2_info: {
    nome: 'Sam Patterson',
    record: '14-2-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Trey Waters', method: 'Sub R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Danny Barlow', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Kiefer Crosbie', method: 'Sub R1', event: 'UFC 304' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Meio-Medio (170 lbs)',
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
      categoria_peso: 'Peso Meio-Medio (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Showman Contra o Finalizador',
      tagline_sub: 'Duelo britanico entre o veterano do karate ponto e o jovem que finaliza todos que cruzam seu caminho',
      fighter1: {
        nome_completo: 'Michael "Venom" Page',
        apelido: 'Venom',
        sobrenome: 'Page',
        record: '24-3-0',
        ranking: '#13 Meio-Medio',
        info_extra: 'Londres, Inglaterra | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Sam "The Future" Patterson',
        apelido: 'The Future',
        sobrenome: 'Patterson',
        record: '14-2-1',
        ranking: 'N/R Meio-Medio',
        info_extra: 'Watford, Inglaterra | 29 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Duelo Britanico Que Londres Merece</h3>
        <p class="mb-4">
          Esse e o tipo de luta que a torcida de Londres ama: dois britanicos, estilos completamente opostos, e a promessa de fogo cruzado. <strong class="text-ufc-red">Michael "Venom" Page</strong> e uma lenda viva do MMA britanico. Dez vezes campeao mundial de kickboxing, estrela do Bellator por quase uma decada, e dono do estilo mais polarizante do esporte: maos baixas, movimentacao imprevisivel, golpes vindos de angulos impossíveis.
        </p>
        <p class="mb-4">
          Aos 38 anos, MVP esta no crepusculo da carreira mas ainda relevante. A vitoria sobre Jared Cannonier na UFC 319 mostrou que ele ainda consegue competir com nomes de alto nivel quando implementa seu gameplan. Mas as derrotas para Kevin Holland e Ian Garry exporam as vulnerabilidades que sempre estiveram ali: quando o oponente fecha a distancia e leva a luta para o chao, Page sofre.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Futuro Chegou</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Sam Patterson</strong> nao ganhou o apelido "The Future" a toa. Com 29 anos, 1,91m de altura e uma envergadura de quase 2 metros, ele e um pesadelo para qualquer adversario no meio-medio. Quatro vitorias consecutivas, incluindo tres finalizacoes no primeiro round, provam que Patterson nao esta ali para fazer amigos. Sete submissoes na carreira (incluindo 4 guilhotinas e 2 mata-leoes) fazem dele um dos finalizadores mais perigosos da divisao.
        </p>
        <p class="mb-4">
          A dinamica e fascinante: Page quer manter distancia e usar seu striking unortodoxo. Patterson quer fechar a distancia, levar ao chao e submeter. Se Patterson conseguir o takedown, Page esta em serio perigo. Se Page manter em pe, a experiencia e as tecnicas nao-convencionais podem frustrar o jovem. O O2 Arena vai estar dividido, e essa e a beleza de um duelo britanico.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#13 Meio-Medio', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: '1 vitoria consecutiva', fighter2: '4 vitorias consecutivas' },
        { dimensao: 'Narrativa', fighter1: 'Manter relevancia aos 38 anos', fighter2: 'Nocautear a lenda e entrar no ranking' },
        { dimensao: 'Risco', fighter1: 'Terceira derrota no UFC em 4 lutas', fighter2: 'Perder a chance de subir de nivel' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O VENOM AINDA PICA',
          subtitulo: 'Page frustra Patterson com movimentacao e timing em pe',
          consequencias: [
            { tag: 'RANKING', texto: 'Page se mantem no top 15 e ganha mais uma luta no O2 Arena contra nome relevante' },
            { tag: 'LEGADO', texto: 'Aos 38 anos, MVP prova que ainda pode competir com os jovens da divisao' },
          ],
          proxima_luta: 'Page vs oponente ranqueado do top 10 em card europeu',
        },
        fighter2_vence: {
          titulo: 'O FUTURO E AGORA',
          subtitulo: 'Patterson submete a lenda e anuncia sua chegada no ranking',
          consequencias: [
            { tag: 'RANKING', texto: 'Patterson entra no top 15 do meio-medio com vitoria sobre lutador ranqueado' },
            { tag: 'PROXIMA', texto: 'Luta contra nome estabelecido do top 10-15 na proxima oportunidade' },
          ],
          proxima_luta: 'Patterson vs oponente ranqueado do top 10-15',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Page',
        color: 'red',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Jared Cannonier', result: 'W', method: 'Decisao Unanime', opponent_rank: '#11 MW (subiu)', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida por decisao contra veterano perigoso. MVP usou movimentacao e contragolpes.' },
          { date: 'Jun 2024', opponent: 'Ian Garry', result: 'L', method: 'Decisao Unanime', opponent_rank: '#10 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota competitiva para prospect top. Garry controlou a distancia e neutralizou o estilo de Page.' },
          { date: 'Mar 2024', opponent: 'Kevin Holland', result: 'L', method: 'TKO R2', opponent_rank: '#14 WW', quality_score: 3, quality_label: 'Bom', note: 'Derrota por nocaute no segundo round. Holland encontrou o timing e finalizou Page em pe.' },
        ],
        full_fight_history: [
          { date: 'Mar 2024', opponent: 'Kevin Holland', result: 'L', method: 'TKO R2', opponent_rank: '#14 WW', quality_score: 3, quality_label: 'Bom', note: 'Debut UFC, derrota por TKO' },
          { date: 'Jun 2024', opponent: 'Ian Garry', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota por decisao' },
          { date: 'Ago 2025', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: '#11 MW', quality_score: 3, quality_label: 'Bom', note: 'Primeira vitoria no UFC' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel',
        momentum_trend: 'stable',
        momentum_note: 'Page esta numa fase de altos e baixos no UFC. Comecou com duas derrotas (Holland e Garry) mas se recuperou com uma vitoria solida sobre Cannonier. Aos 38 anos, a janela esta fechando e cada luta pode ser a ultima. A vitoria sobre Cannonier deu novo folego, mas as vulnerabilidades sao conhecidas.',
      },
      fighter2: {
        nome: 'Sam Patterson',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Trey Waters', result: 'W', method: 'Submissao R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao no primeiro round. Patterson continua finalizando todo mundo que colocam na frente.' },
          { date: 'Mar 2025', opponent: 'Danny Barlow', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute tecnico no primeiro round. Terceira vitoria consecutiva.' },
          { date: 'Jul 2024', opponent: 'Kiefer Crosbie', result: 'W', method: 'Submissao R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao por guilhotina no primeiro round no UFC 304 em Manchester.' },
          { date: 'Jan 2024', opponent: 'Yohan Lainesse', result: 'W', method: 'Submissao R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao no primeiro round na UFC 297.' },
        ],
        full_fight_history: [
          { date: 'Mar 2023', opponent: 'Yanal Ashmouz', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Derrota no debut UFC no peso-leve' },
          { date: 'Jan 2024', opponent: 'Yohan Lainesse', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira vitoria UFC, no meio-medio' },
          { date: 'Jul 2024', opponent: 'Kiefer Crosbie', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina no R1' },
          { date: 'Mar 2025', opponent: 'Danny Barlow', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO no R1' },
          { date: 'Set 2025', opponent: 'Trey Waters', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Sub no R1, quarta vitoria seguida' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Patterson esta numa sequencia impressionante: quatro vitorias consecutivas, todas por finalizacao no primeiro round. A transicao do peso-leve para o meio-medio foi perfeita. Com 1,91m e envergadura de quase 2 metros, ele finalmente encontrou seu peso ideal. Esta luta contra Page e o salto de qualidade que ele precisa.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Page',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '1W-2L (33%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Patterson',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Page enfrentou nomes de nivel superior (Garry, Holland, Cannonier) enquanto Patterson vem de vitorias sobre oponentes sem ranking. Essa e a luta que vai mostrar se Patterson esta pronto para o proximo nivel.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.15, valueB: 5.80, maxVal: 7, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 44, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.28, valueB: 3.10, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 55, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.41, valueB: 3.23, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 33, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 42, valueB: 75, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.0, valueB: 2.5, maxVal: 4, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '29 anos', note: 'Page 9 anos mais velho' },
        { label: 'Altura', fighter1: '1,91m (6\'3")', fighter2: '1,91m (6\'3")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '196cm (77")', fighter2: '198cm (78")', note: 'Patterson com leve vantagem' },
        { label: 'Stance', fighter1: 'Southpaw/Switch', fighter2: 'Ortodoxo', note: 'Page troca de stance constantemente' },
        { label: 'Academia', fighter1: 'London Shootfighters', fighter2: 'Team Crossface, Watford', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking em Pe', valueA: 78, valueB: 60, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Page e 10x campeao mundial de kickboxing. Movimentacao e timing unicos, mesmo aos 38 anos.' },
        { label: 'Wrestling/Takedowns', valueA: 30, valueB: 82, labelA: 'Ruim', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Patterson media 3.23 takedowns por 15 min. Page tem apenas 42% de defesa de takedown.' },
        { label: 'Jiu-Jitsu/Submissoes', valueA: 25, valueB: 88, labelA: 'Ruim', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Patterson tem 7 submissoes na carreira. Page nunca finalizou por submissao no MMA.' },
        { label: 'Movimentacao e Footwork', valueA: 90, valueB: 55, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'O footwork de Page e unico no MMA. Base de karate ponto com entradas e saidas rapidas.' },
        { label: 'Defesa de Takedown', valueA: 42, valueB: 75, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Page tem apenas 42% de TDD. Contra um wrestler ativo como Patterson, isso e preocupante.' },
        { label: 'Experiencia em Alto Nivel', valueA: 78, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Page ja enfrentou Garry, Holland e Cannonier. Patterson so enfrentou oponentes sem ranking.' },
      ],
      insight: 'Os estilos sao diametralmente opostos. Page domina em pe com movimentacao e striking criativo, mas Patterson domina no chao com wrestling e submissoes. A luta sera definida por onde acontece: em pe ou no chao.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Page',
        ko_tko: { count: 13, percent: 54 },
        submission: { count: 0, percent: 0 },
        decision: { count: 11, percent: 46 },
        total_wins: 24,
      },
      fighter2: {
        nome: 'Patterson',
        ko_tko: { count: 6, percent: 43 },
        submission: { count: 7, percent: 50 },
        decision: { count: 1, percent: 7 },
        total_wins: 14,
      },
      insight: 'Contraste total. Page e um striker puro: 54% KO, 0% submissao. Patterson e um finalizador no chao: 50% submissao, 43% KO. Patterson quase nunca vai para decisao (apenas 7%). Se a luta for ao chao, e territorio do jovem. Se ficar em pe, e territorio de Page.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM PATTERSON',
          color: 'green',
          title: 'A Guilhotina Espreita',
          description: 'Patterson finalizou todas as quatro ultimas lutas no primeiro round. Ele entra agressivo buscando o takedown ou a submissao desde os primeiros segundos. Se Page nao defender o primeiro takedown, pode ser finalizado rapidamente. Patterson tem 4 guilhotinas na carreira e a envergadura para aplica-las.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Ajustes',
          description: 'Se Page sobreviver o R1, o segundo round pode ser mais equilibrado. Page tem mais experiencia em lutas longas e pode encontrar o timing para seus contragolpes. Patterson raramente chega ao R2 e pode estar em territorio desconhecido.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM PAGE',
          color: 'red',
          title: 'Experiencia Conta',
          description: 'Se a luta chegar ao terceiro round, a experiencia de Page em lutas de 3 rounds (11 decisoes na carreira) pode ser decisiva. Patterson tem apenas 1 vitoria por decisao em 14 lutas. Ir a distancia favorece o veterano.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Clock', title: 'Idade e Quilometragem', fighter: 'Page', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Page tem 38 anos e mais de 20 anos de competicao entre kickboxing e MMA. A quilometragem acumulada pode afetar recuperacao e reflexos, especialmente contra um jovem de 29 anos.' },
        { icon: 'Target', title: 'Vulnerabilidade Conhecida', fighter: 'Page', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'A defesa de takedown de Page (42%) e a maior vulnerabilidade dele. Holland e Garry exploraram isso. Patterson, que vive de takedowns e submissoes, vai atacar exatamente esse ponto.' },
        { icon: 'MapPin', title: 'Ambos Britanicos em Casa', fighter: 'Ambos', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'Os dois sao britanicos lutando em Londres. Page de Londres, Patterson de Watford. A torcida pode se dividir, embora Page provavelmente tenha mais fas pelo nome.' },
        { icon: 'Zap', title: 'Finalizacoes no R1', fighter: 'Patterson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Quatro finalizacoes consecutivas no primeiro round. Patterson e um predador de primeiro round que nao desperica energia. Se conseguir o takedown, fecha o negocio rapido.' },
        { icon: 'Brain', title: 'QI de Luta Veterano', fighter: 'Page', risk_level: 'POSITIVO', risk_color: 'green', description: 'Page ja viu de tudo em quase 30 lutas. Ele sabe como frustrar oponentes, manter distancia e usar o timing a seu favor. A experiencia pode ser o diferencial se a luta ficar em pe.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Page',
        total_probability: 38,
        scenarios: [
          { name: 'Striking de Longa Distancia', probability: 18, method: 'Decisao Unanime', description: 'Page mantem a distancia com footwork e jab, frustra as tentativas de takedown de Patterson, e vence nos pontos com contragolpes e tecnicas nao-convencionais.' },
          { name: 'Nocaute do Showman', probability: 12, method: 'KO/TKO R1-R2', description: 'Page encontra o timing perfeito para uma joelhada voadora, spinning back kick ou contragolpe limpo que encerra a luta de forma espetacular.' },
          { name: 'TDD e Volume', probability: 8, method: 'Decisao Unanime', description: 'Page surpreende com defesa de takedown melhorada e vence com volume de strikes superior e pontos de distancia.' },
        ],
      },
      fighter2: {
        nome: 'Patterson',
        total_probability: 60,
        scenarios: [
          { name: 'Submissao Relampago', probability: 28, method: 'Submissao R1', description: 'Patterson fecha a distancia, completa o takedown e encontra a submissao rapidamente. Guilhotina na troca de nivel ou mata-leao apos controlar as costas.' },
          { name: 'Ground and Pound', probability: 18, method: 'TKO R1-R2', description: 'Patterson leva ao chao e domina com ground and pound. Page nao tem ferramentas para se levantar ou defender do chao e o arbitro para a luta.' },
          { name: 'Dominio por Controle', probability: 14, method: 'Decisao Unanime', description: 'Patterson nao consegue a finalizacao mas controla Page no chao por tempo suficiente para vencer todos os rounds nos cartoes.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Sam Patterson',
      winner_side: 'fighter2',
      predicted_method: 'Submissao R1-R2',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Essa luta se resume a uma pergunta: Page consegue manter em pe? Com apenas 42% de defesa de takedown e Patterson completando 3.23 takedowns por 15 minutos, a matematica nao favorece MVP. Patterson tem as ferramentas para fechar a distancia (envergadura similar), levar ao chao e submeter. A defesa de takedown de Page foi explorada por Holland e Garry, e Patterson e um grappler mais perigoso que ambos no chao. No entanto, a experiencia de Page e seu striking criativo sao fatores que nao podem ser ignorados. Se Page manter distancia por 15 minutos, pode frustrar Patterson.',
      x_factor: {
        title: 'O Salto de Qualidade de Patterson',
        description: 'Patterson nunca enfrentou ninguem do calibre de Page. Todos os oponentes dele no UFC eram sem ranking e sem grande experiencia. Page e o primeiro teste real. Se Patterson tiver nervosismo ou respeitar demais o striking de Page, pode nao conseguir fechar a distancia.',
      },
      upset_alert: {
        title: 'O Timing de Page',
        description: 'Page e imprevisivel por natureza. Uma joelhada voadora na entrada de takedown, um contragolpe no momento exato, ou um upkick do chao podem mudar tudo. Nao subestime o QI de luta de um veterano de 38 anos.',
      },
      probabilities: {
        fighter1: { nome: 'Page', percent: 38 },
        fighter2: { nome: 'Patterson', percent: 60 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Primeira Tentativa de Takedown', icon: 'Target', description: 'Tudo comeca aqui. Se Patterson completar o primeiro takedown, a confianca dele dispara e Page vai passar a luta inteira preocupado com o chao. Se Page defender, a dinamica muda completamente.' },
        { num: 2, title: 'O Footwork de Page', icon: 'Activity', description: 'O footwork de karate ponto e a principal arma de Page para evitar takedowns. Se ele mantiver movimentacao lateral e entradas e saidas rapidas, pode frustrar Patterson. Se ficar parado, e presa facil.' },
        { num: 3, title: 'Guilhotina nas Trocas de Nivel', icon: 'Zap', description: 'Patterson tem 4 guilhotinas na carreira. Quando Page abaixar a cabeca para defender um takedown, a guilhotina e um perigo real. Observe as maos de Patterson sempre que houver troca de nivel.' },
        { num: 4, title: 'O Nervosismo do Salto de Qualidade', icon: 'Brain', description: 'Patterson nunca enfrentou um nome como Page. O nervosismo do salto de qualidade pode afetar sua agressividade e timing. Observe se ele hesita nas entradas de takedown.' },
        { num: 5, title: 'Tecnicas Nao-Convencionais de MVP', icon: 'Eye', description: 'Page e famoso por golpes vindos de angulos imprevisíveis. Joelhadas voadoras, spinning back kicks e contragolpes do nada. Uma tecnica pode encerrar a luta a qualquer momento.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'DUELO BRITANICO', content: 'PAGE vs PATTERSON\nUFC Londres | Meio-Medio\n\nO Showman vs O Finalizador\n24-3 vs 14-2-1\nEstilos opostos, mesma arena.', color: 'red' },
        { slide_number: 2, title: 'MVP: O SHOWMAN', content: '24-3 na carreira\n13 KOs | 10x campeao kickboxing\n#13 meio-medio do UFC\n38 anos, karate ponto\nMaos baixas, angulos impossiveis', color: 'red' },
        { slide_number: 3, title: 'PATTERSON: O FUTURO', content: '14-2-1 na carreira\n7 submissoes (4 guilhotinas)\n4 finalizacoes consecutivas no R1\n29 anos, 1,91m, Watford\nO prospect que finaliza todos', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE', content: 'Page: 42% defesa de takedown\nPatterson: 3.23 TDs por 15 min\n\nSe for ao chao = Patterson\nSe ficar em pe = Page\n\nOnde vai acontecer?', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'PATTERSON por Submissao R1-R2\n\nConfianca: MEDIA\n60% Patterson / 38% Page\n\nMas MVP e imprevisivel.\nSempre.', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Page vs Patterson e o duelo britanico perfeito. O showman do karate ponto contra o finalizador de Watford. Estilos completamente opostos. Thread:' },
        { num: '2/5', text: 'MVP (24-3): 13 KOs, 10 titulos mundiais de kickboxing, maos baixas, angulos impossíveis. Mas 42% de defesa de takedown. QUARENTA E DOIS.' },
        { num: '3/5', text: 'Patterson (14-2-1): 7 submissoes, 4 guilhotinas, QUATRO finalizacoes consecutivas no R1. O cara fecha e submete. E agora vai enfrentar alguem com 42% de TDD.' },
        { num: '4/5', text: 'Se Patterson fechar a distancia, e game over pra Page. Se Page manter em pe, a experiencia e o striking criativo podem frustrar o jovem. Luta de contrastes.' },
        { num: '5/5', text: 'Previsao: Patterson por submissao nos dois primeiros rounds. A matematica nao mente: 42% TDD vs 3.23 TDs por 15 min. Mas MVP e MVP. Sempre imprevisivel.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Michael Page tem 42% de defesa de takedown. Sam Patterson tem 4 finalizacoes consecutivas no primeiro round. Faca as contas.' },
        { time: '10-25s', title: 'Contexto', text: 'Duelo britanico no O2 Arena. MVP, 38 anos, lenda do kickboxing, #13 do ranking. Patterson, 29 anos, 7 submissoes, prospect mais perigoso de Watford.' },
        { time: '25-40s', title: 'Analise', text: 'Luta de um plano so: se vai ao chao, Patterson domina. Se fica em pe, Page frustra. A defesa de takedown de Page e o ponto critico.' },
        { time: '40-55s', title: 'Previsao', text: 'Patterson por submissao nos dois primeiros rounds. Mas se voce gosta de apostas arriscadas, MVP por nocaute espetacular paga bem e nao e impossivel.' },
      ],
      tiktok: [
        { hook: 'Esse cara tem 42% de defesa de takedown e vai enfrentar um PREDADOR de chao.', body: 'Michael Page, MVP, lenda do kickboxing. Mas 42% de TDD. Sam Patterson finalizou as ultimas QUATRO lutas no primeiro round. Quatro guilhotinas na carreira. E agora enfreta um cara que nao sabe defender takedown. Faca as contas.', cta: 'Patterson por sub ou MVP por KO espetacular? Comenta!' },
        { hook: 'Duelo britanico no O2 Arena e ninguem ta falando disso.', body: 'Page vs Patterson. O veterano showman de 38 anos contra o jovem finalizador de 29. Se vai ao chao, Patterson domina. Se fica em pe, Page frustra. Estilos completamente opostos. Mesma arena. Vai ser epico.', cta: 'Quem voce escolhe? Comenta!' },
      ],
      headlines: [
        'Page vs Patterson: 42% de TDD Encontra o Finalizador de Primeiro Round',
        'O Showman Contra o Futuro: O Duelo Britanico Que Londres Merece',
        'Sam Patterson Pode Ser o Pesadelo de MVP no Chao?',
        'Michael Page aos 38: A Experiencia Pode Vencer a Juventude?',
        'UFC Londres: O Contraste de Estilos Que Promete Fogo no Meio-Medio',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+140',
        fighter2_odds: '-160',
        fighter1_name: 'Michael Page',
        fighter2_name: 'Sam Patterson',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Defesa de Takedown Fragil', stat_headline: 'PAGE TEM APENAS 42% DE DEFESA DE TAKEDOWN NO UFC', contexto: 'A vulnerabilidade mais explorada de Page. Holland e Garry usaram isso. Patterson vive de takedowns.', implicacao_aposta: 'Edge fortissimo para Patterson. A matematica e clara: 42% TDD vs 3.23 TDs por 15 min.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Streak de Finalizacoes de Patterson', stat_headline: '4 FINALIZACOES CONSECUTIVAS NO PRIMEIRO ROUND', contexto: 'Patterson nao perde tempo. Fecha, leva ao chao, submete. A velocidade das finalizacoes e impressionante.', implicacao_aposta: 'Forte edge para Under e para Patterson por submissao.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Experiencia e Imprevisibilidade de Page', stat_headline: '27 LUTAS PROFISSIONAIS, 10 TITULOS MUNDIAIS DE KICKBOXING', contexto: 'Page ja viu de tudo. Tecnicas nao-convencionais podem surpreender ate os mais preparados.', implicacao_aposta: 'Nao descarte Page por KO. O preco como azarao pode ter valor.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Clock', titulo: 'Idade: 38 vs 29', stat_headline: 'PAGE E 9 ANOS MAIS VELHO QUE PATTERSON', contexto: 'A diferenca de idade e significativa. Page esta no crepusculo, Patterson no prime atletico.', implicacao_aposta: 'Favorece Patterson em lutas de alta intensidade e scrambles.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Patterson por Submissao', odds: '+110', confianca: 'alta', raciocinio: '50% das vitorias de Patterson por sub. Page com 42% TDD e 0 submissoes. O cenario mais provavel se a luta for ao chao.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-130', confianca: 'media', raciocinio: 'Patterson finaliza no R1 consistentemente. Se conseguir o takedown, a luta pode acabar rapido.' },
        { tipo: 'Moneyline', pick: 'Page (+140)', odds: '+140', confianca: 'baixa', edge_vs_mercado: 'Page como azarao a +140 tem valor se voce acredita que ele pode manter em pe.', raciocinio: 'Page e imprevisivel e tem QI de luta alto. Se manter distancia, pode frustrar Patterson.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Patterson por Decisao',
        descricao: 'Patterson tem apenas 1 vitoria por decisao em 14 lutas (7%). Apostar em decisao dele e ir contra todo o historico. Ou ele finaliza ou nao. Nao ha meio-termo com Patterson.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
