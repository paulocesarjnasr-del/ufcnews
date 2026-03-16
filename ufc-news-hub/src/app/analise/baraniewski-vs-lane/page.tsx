import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'baraniewski-vs-lane',
  evento_id: null,
  slug: 'baraniewski-vs-lane',
  titulo: 'Baraniewski vs Lane: O Judoca Invicto Contra o Atleta da NFL',
  subtitulo: 'O polones de 7-0 com dois nocautes em 20 segundos enfrenta o ex-jogador de futebol americano que muda de divisao',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,83m', envergadura: '187cm', idade: 27, academia: 'Polonia' },
      fighter2: { altura: '1,98m', envergadura: '203cm', idade: 38, academia: 'EUA' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'KO/TKO R1',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Iwo Baraniewski',
    record: '7-0-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Ibo Aslan', method: 'KO R1', event: 'UFC 323' },
    ],
  },
  fighter2_info: {
    nome: 'Austen Lane',
    record: '13-7-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Vitor Petrino', method: 'Submissao R1', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Mario Pinto', method: 'KO R1', event: 'UFC Fight Night' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Meio-Pesado (205 lbs)',
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
      categoria_peso: 'Peso Meio-Pesado (205 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Judoca Invicto Contra o Gigante da NFL',
      tagline_sub: 'Prospect polones com nocautes relampago enfrenta o ex-jogador de futebol americano em sua estreia no meio-pesado',
      fighter1: {
        nome_completo: 'Iwo "Rudy" Baraniewski',
        apelido: 'Rudy',
        sobrenome: 'Baraniewski',
        record: '7-0-0',
        ranking: 'N/R Meio-Pesado',
        info_extra: 'Polonia | 27 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Austen Lane',
        apelido: '',
        sobrenome: 'Lane',
        record: '13-7-0',
        ranking: 'N/R Meio-Pesado',
        info_extra: 'EUA | 38 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Poder Explosivo Contra Tamanho Bruto</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Iwo Baraniewski</strong> e o tipo de prospect que assusta. O polones de 27 anos nao apenas e invicto com 7-0; ele finaliza lutas em velocidade absurda. No Contender Series, nocauteou Mahamed Aly em 20 segundos. No debut no UFC contra Ibo Aslan, nocauteou no primeiro round e ganhou o bonus de Performance da Noite. Com background em judo e poder explosivo nas maos, Baraniewski e uma bola de demolicao que o UFC esta construindo com cuidado.
        </p>
        <p class="mb-4">
          Do outro lado esta <strong class="text-blue-400">Austen Lane</strong>, uma historia completamente diferente. Ex-defensive end da NFL (jogou por Jacksonville Jaguars, Detroit Lions e outras equipes), Lane trouxe seu atletismo absurdo para o MMA depois de se aposentar do futebol americano. Com 1,98m e envergadura de 203cm, ele e fisicamente impressionante. Mas os resultados recentes nao foram bons: duas derrotas consecutivas, nocauteado por Mario Pinto e finalizado por Vitor Petrino. Agora, aos 38 anos, ele desce de peso do peso-pesado para o meio-pesado buscando um novo comeco.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Missao do Polones</h3>
        <p class="mb-4">
          Para Baraniewski, essa e a oportunidade de confirmar que o debut nao foi fluke. Lane, apesar dos resultados recentes, e um teste fisico real: mais alto, mais pesado, com envergadura massiva e poder atletico da NFL. Se o polones conseguir passar por Lane de forma dominante, ele se posiciona como um dos prospects mais perigosos do meio-pesado. Se Lane surpreender na descida de peso, pode ser a reviravolta que sua carreira precisa.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: '7 vitorias consecutivas (invicto)', fighter2: '2 derrotas consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Confirmar o hype com 2-0 no UFC', fighter2: 'Interromper sequencia negativa na nova divisao' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota contra veterano experiente', fighter2: 'Terceira derrota consecutiva' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A BOLA DE DEMOLICAO CONTINUA',
          subtitulo: 'Baraniewski nocauteia Lane e se firma como prospect top do meio-pesado',
          consequencias: [
            { tag: 'RANKING', texto: 'Baraniewski com 8-0 comeca a aparecer no radar do ranking do meio-pesado' },
            { tag: 'PROXIMA', texto: 'Luta contra veterano estabelecido ou outro prospect no proximo card europeu' },
          ],
          proxima_luta: 'Baraniewski vs oponente ranqueado do top 15',
        },
        fighter2_vence: {
          titulo: 'A NFL NUNCA MORRE',
          subtitulo: 'Lane usa o tamanho e atletismo para surpreender na nova divisao',
          consequencias: [
            { tag: 'RESGATE', texto: 'Lane interrompe a sequencia de derrotas e prova que a descida de peso foi a decisao certa' },
            { tag: 'PROXIMA', texto: 'Mais lutas no meio-pesado contra oponentes de nivel similar' },
          ],
          proxima_luta: 'Lane vs oponente do meio-pesado no proximo card',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Iwo Baraniewski',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Ibo Aslan', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute no primeiro round no debut UFC. Ganhou Performance da Noite. Impressionante.' },
          { date: 'Set 2025', opponent: 'Mahamed Aly', result: 'W', method: 'KO R1 (0:20)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute em 20 segundos no Contender Series. Ganhou contrato do UFC na hora.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Mahamed Aly', result: 'W', method: 'KO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS, contrato UFC' },
          { date: 'Dez 2025', opponent: 'Ibo Aslan', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC, Performance da Noite' },
        ],
        layoff_warning: null,
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Baraniewski esta no melhor momento possivel. Invicto, dois nocautes relampago consecutivos, contrato do UFC conquistado de forma dramatica e debut com bonus. O hype e justificado e o ritmo de atividade esta perfeito.',
      },
      fighter2: {
        nome: 'Austen Lane',
        color: 'blue',
        recent_fights: [
          { date: 'Jul 2025', opponent: 'Vitor Petrino', result: 'L', method: 'Submissao R1', opponent_rank: '#12 LHW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado por rear-naked choke no primeiro round pelo prospect brasileiro.' },
          { date: 'Mar 2025', opponent: 'Mario Pinto', result: 'L', method: 'KO R1', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteado no primeiro round. Segunda derrota consecutiva.' },
        ],
        full_fight_history: [
          { date: 'Mar 2025', opponent: 'Mario Pinto', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO no R1' },
          { date: 'Jul 2025', opponent: 'Vitor Petrino', result: 'L', method: 'Sub R1', opponent_rank: '#12 LHW', quality_score: 3, quality_label: 'Bom', note: 'Submissao no R1' },
        ],
        layoff_warning: null,
        momentum_score: 3,
        momentum_label: 'Em Baixa',
        momentum_trend: 'descending',
        momentum_note: 'Lane esta numa espiral negativa. Duas derrotas consecutivas no primeiro round, por nocaute e submissao. A decisao de descer para o meio-pesado aos 38 anos e uma jogada arriscada, mas necessaria. Se perder mais uma, a situacao no UFC fica insustentavel.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Baraniewski',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Lane',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-3L (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Baraniewski e novo no UFC (apenas 1 luta). Lane tem mais experiencia na organizacao mas vem de resultados ruins.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 7.50, valueB: 3.82, maxVal: 10, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 75, valueB: 42, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.75, valueB: 5.31, maxVal: 8, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.00, valueB: 0.68, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 0, valueB: 36, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 100, valueB: 50, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '27 anos', fighter2: '38 anos', note: 'Baraniewski 11 anos mais jovem' },
        { label: 'Altura', fighter1: '1,83m (6\'0")', fighter2: '1,98m (6\'6")', note: 'Lane 15cm mais alto' },
        { label: 'Envergadura', fighter1: '187cm (74")', fighter2: '203cm (80")', note: 'Lane com 6 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Background', fighter1: 'Judo', fighter2: 'Ex-NFL (Defensive End)', note: 'Atletismos completamente diferentes' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 88, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: '5 KOs em 7 lutas para Baraniewski. Nocauteou Aslan e Aly em segundos. Poder explosivo real.' },
        { label: 'Striking Tecnico', valueA: 72, valueB: 48, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Baraniewski tem 75% de precisao no UFC vs 42% de Lane. Diferenca tecnica clara.' },
        { label: 'Wrestling/Grappling', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Baraniewski tem base de judo com 2 submissoes na carreira. Lane tem atletismo mas tecnica limitada.' },
        { label: 'Atletismo e Explosao', valueA: 85, valueB: 72, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Baraniewski e explosivo e jovem. Lane tem atletismo da NFL mas aos 38 anos, a explosao diminuiu.' },
        { label: 'Queixo e Durabilidade', valueA: 65, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Baraniewski nunca foi derrubado. Lane foi nocauteado e finalizado nas ultimas 2 lutas.' },
        { label: 'Vantagem Fisica', valueA: 40, valueB: 80, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Lane e 15cm mais alto com 6 polegadas de envergadura a mais. Vantagem fisica significativa.' },
      ],
      insight: 'Baraniewski leva vantagem em quase tudo exceto tamanho fisico. O polones e mais tecnico, mais explosivo, mais jovem e mais confiante. Lane tem tamanho, mas os resultados recentes sugerem que ele nao esta conseguindo usar essa vantagem de forma efetiva.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Baraniewski',
        ko_tko: { count: 5, percent: 71 },
        submission: { count: 2, percent: 29 },
        decision: { count: 0, percent: 0 },
        total_wins: 7,
      },
      fighter2: {
        nome: 'Lane',
        ko_tko: { count: 8, percent: 62 },
        submission: { count: 2, percent: 15 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      insight: 'Baraniewski nunca foi para a decisao: 100% das vitorias por finalizacao (71% KO, 29% submissao). Lane tambem tem poder (62% KO), mas tem sido finalizado com frequencia recentemente. A tendencia aponta para uma luta curta com finalizacao.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VANTAGEM BARANIEWSKI',
          color: 'red',
          title: 'A Zona de Demolicao',
          description: 'Baraniewski finalizou as duas ultimas lutas no primeiro round, uma em 20 segundos. Lane foi finalizado nas duas ultimas lutas no primeiro round. A convergencia e clara: se alguem vai ser nocauteado no R1, e provavel que seja Lane. O polones entra com intencao de encerrar cedo.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Territorio Desconhecido',
          description: 'Se a luta chegar ao R2, entramos em territorio desconhecido para ambos. Baraniewski nunca precisou de um segundo round no UFC. Lane pode encontrar ritmo se sobreviver ao primeiro assalto. A vantagem de tamanho de Lane pode comecar a pesar aqui.',
        },
        {
          rounds: 'R3',
          danger_level: 4,
          danger_label: 'VANTAGEM LANE',
          color: 'green',
          title: 'A Experiencia do Veterano',
          description: 'Se a luta se arrastar ate o R3, Lane tem experiencia em lutas longas (3 decisoes na carreira). Baraniewski nunca foi a decisao. O tamanho de Lane e o cardio natural de quem jogou na NFL podem ser fatores nesse cenario.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Momentum vs Espiral', fighter: 'Baraniewski', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Baraniewski esta no pico: invicto, dois nocautes devastadores, bonus de Performance da Noite. Lane esta numa espiral: duas derrotas consecutivas no R1. O contraste de momentum e enorme.' },
        { icon: 'AlertTriangle', title: 'Queixo Comprometido', fighter: 'Lane', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Lane foi nocauteado por Mario Pinto e finalizado por Petrino nas ultimas duas lutas, ambas no R1. A durabilidade dele esta em questao seria. Contra o poder de Baraniewski, isso e preocupante.' },
        { icon: 'Activity', title: 'Descida de Peso', fighter: 'Lane', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Lane esta fazendo sua estreia no meio-pesado (205 lbs) vindo do peso-pesado (265 lbs). Perder quase 60 lbs pode afetar poder, resistencia e recuperacao. E uma incognita total.' },
        { icon: 'Shield', title: 'Vantagem de Tamanho Absurda', fighter: 'Lane', risk_level: 'POSITIVO', risk_color: 'green', description: 'Lane e 15cm mais alto e tem 6 polegadas de envergadura a mais. Mesmo no meio-pesado, ele sera significativamente maior. Se usar o jab e manter distancia, pode frustrar Baraniewski.' },
        { icon: 'Zap', title: 'Explosividade do Judoca', fighter: 'Baraniewski', risk_level: 'POSITIVO', risk_color: 'green', description: 'A base de judo da a Baraniewski explosividade unica para fechar distancia rapidamente. Mesmo com a envergadura de Lane, se Baraniewski fechar, o judo pode ser decisivo.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Baraniewski',
        total_probability: 72,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 40, method: 'KO/TKO R1', description: 'Baraniewski fecha a distancia com explosividade de judoca, conecta combinacoes pesadas e nocauteia Lane no primeiro round. Cenario mais provavel dado o historico de ambos.' },
          { name: 'Takedown e Finalizacao', probability: 18, method: 'Submissao R1-R2', description: 'Baraniewski usa seu judo para derrubar Lane e encontra uma submissao. Tem 2 submissoes na carreira e o background tecnico para isso.' },
          { name: 'Dominio Tecnico', probability: 14, method: 'TKO R2-R3', description: 'Baraniewski machuca Lane cedo mas nao consegue a finalizacao imediata. Acumula dano e o arbitro para no segundo ou terceiro round.' },
        ],
      },
      fighter2: {
        nome: 'Lane',
        total_probability: 26,
        scenarios: [
          { name: 'O Jab do Gigante', probability: 10, method: 'Decisao Unanime', description: 'Lane usa a vantagem de 15cm de altura e 6 polegadas de envergadura para manter Baraniewski a distancia com jab. Vence nos pontos sem nunca deixar o polones fechar.' },
          { name: 'Contragolpe Poderoso', probability: 9, method: 'KO/TKO R1-R2', description: 'Baraniewski vem para frente de forma agressiva e Lane encontra um contragolpe ou uppercut com seu poder natural de 120kg. O tamanho pode ser equalizer.' },
          { name: 'Efeito do Novo Peso', probability: 7, method: 'Decisao/TKO', description: 'A descida para o meio-pesado rejuvenesce Lane. Mais rapido, mais leve, com energia renovada, ele surpreende com cardio e volume superiores.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Iwo Baraniewski',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Baraniewski e mais tecnico, mais explosivo, mais jovem e esta em momentum muito superior. Lane vem de duas derrotas no R1, com o queixo comprometido, e esta fazendo sua estreia numa nova divisao aos 38 anos. O poder de Baraniewski combinado com a fragilidade recente de Lane aponta fortemente para um nocaute precoce do polones. A unica variavel e o tamanho de Lane, que pode complicar se ele conseguir manter distancia. Mas historicamente, Lane nao tem mostrado capacidade de fazer isso.',
      x_factor: {
        title: 'A Descida de Peso',
        description: 'Ninguem sabe como Lane vai reagir no meio-pesado. Se ele chegar leve, rapido e com energia, pode ser uma versao melhor de si mesmo. Se a perda de peso afetar seu poder e resistencia, pode ser ainda mais vulneravel.',
      },
      upset_alert: {
        title: 'O Tamanho Importa',
        description: 'Lane e MUITO maior que Baraniewski. 15cm de altura, 6 polegadas de envergadura. Se ele usar o jab e manter distancia, Baraniewski pode ter dificuldade para entrar. O polones nunca enfrentou alguem tao grande.',
      },
      probabilities: {
        fighter1: { nome: 'Baraniewski', percent: 72 },
        fighter2: { nome: 'Lane', percent: 26 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 60 Segundos', icon: 'Zap', description: 'Baraniewski e perigoso desde o primeiro segundo (nocauteou Aly em 20 segundos). Se ele fechar a distancia rapidamente, a luta pode acabar antes de Lane ter chance de usar o tamanho.' },
        { num: 2, title: 'O Jab de Lane', icon: 'Target', description: 'Se Lane usar o jab de forma inteligente para manter distancia, pode frustrar as entradas de Baraniewski. Com 6 polegadas a mais de envergadura, o jab e sua melhor arma.' },
        { num: 3, title: 'O Fisico de Lane no Novo Peso', icon: 'Activity', description: 'Observe como Lane se move no meio-pesado. Se parecer lento ou pesado apesar da descida de peso, e sinal ruim. Se parecer mais leve e agil, pode ser uma versao melhorada.' },
        { num: 4, title: 'As Entradas de Judo de Baraniewski', icon: 'Shield', description: 'Baraniewski tem background em judo. Se Lane o empurrar para o clinch, o polones pode usar arremessos e viagens para levar ao chao. Observe as tentativas de clinch.' },
        { num: 5, title: 'O Queixo de Lane', icon: 'AlertTriangle', description: 'Lane foi nocauteado e finalizado nas ultimas 2 lutas, ambas no R1. Se Baraniewski conectar algo limpo nos primeiros minutos, a reacao de Lane vai revelar se o queixo aguenta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'JUVENTUDE vs EXPERIENCIA', content: 'BARANIEWSKI vs LANE\nUFC Londres | Meio-Pesado\n\n7-0 vs 13-7\nJudoca invicto de 27 anos\nvs ex-NFL de 38 anos', color: 'red' },
        { slide_number: 2, title: 'BARANIEWSKI: BOLA DE DEMOLICAO', content: '7-0 na carreira\n5 KOs (71%)\nContender Series: KO em 20 SEGUNDOS\nDebut UFC: KO R1 + Performance da Noite\n27 anos, base judo', color: 'red' },
        { slide_number: 3, title: 'LANE: O GIGANTE DA NFL', content: '13-7 na carreira\n1,98m de altura\n203cm de envergadura\nEx-defensive end da NFL\nEstreia no meio-pesado aos 38 anos', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'BARANIEWSKI por KO/TKO R1\n\nConfianca: MEDIA-ALTA\n72% Baraniewski / 26% Lane\n\nO polones e demais pra esse\nmomento de Lane.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Baraniewski vs Lane: judoca invicto de 27 anos contra ex-jogador da NFL de 38. Baraniewski nocauteou em 20 segundos no DWCS e no R1 no debut. Lane perdeu as ultimas 2 no R1.' },
        { num: '2/4', text: 'A estatistica mais assustadora: Baraniewski tem 75% de precisao de strikes no UFC. SETENTA E CINCO. Contra um cara com 48% de defesa. Faca as contas.' },
        { num: '3/4', text: 'Lane e 15cm mais alto com 6 polegadas a mais de envergadura. Mas ta descendo do peso-pesado pro meio-pesado aos 38 anos depois de 2 derrotas no R1. A variavel e o tamanho.' },
        { num: '4/4', text: 'Previsao: Baraniewski por KO no primeiro round. O polones e explosivo demais e Lane esta vulneravel demais.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Esse cara nocauteou em 20 SEGUNDOS no Contender Series. E agora enfrenta um ex-jogador da NFL que mede 1,98m. Quem leva?' },
        { time: '10-25s', title: 'Contexto', text: 'Iwo Baraniewski, 7-0, polones, base judo, dois nocautes relampago. Austen Lane, 13-7, ex-NFL, 1,98m, descendo do peso-pesado. O tamanho contra a tecnica.' },
        { time: '25-40s', title: 'Analise', text: 'Baraniewski e melhor em tudo exceto tamanho. Lane foi nocauteado e finalizado nas ultimas 2. A matematica favorece o polones, mas a diferenca de tamanho e real.' },
        { time: '40-55s', title: 'Previsao', text: 'Baraniewski por KO no R1. O polones e explosivo demais, e Lane esta em momento muito ruim. Pode ser outra noite rapida.' },
      ],
      tiktok: [
        { hook: 'Nocaute em 20 SEGUNDOS. Esse cara e REAL.', body: 'Iwo Baraniewski nocauteou Mahamed Aly em 20 segundos no Contender Series. Depois nocauteou Ibo Aslan no R1 do debut. Agora enfrenta Austen Lane, um ex-jogador da NFL de 1,98m. Mas Lane perdeu as ultimas 2 no R1.', cta: 'O polones nocauteia de novo? Comenta!' },
        { hook: 'Ex-jogador da NFL de 1,98m contra judoca de 1,83m. Quem vence?', body: 'Austen Lane jogou na NFL como defensive end. 1,98m, 203cm de envergadura. Mas ele perdeu as ultimas 2 lutas no R1 e esta descendo de peso. Baraniewski e invicto com 5 KOs em 7 lutas. Tamanho vs tecnica.', cta: 'Tamanho ou tecnica? Comenta!' },
      ],
      headlines: [
        'Baraniewski vs Lane: O Judoca de 20 Segundos Contra o Gigante da NFL',
        'Iwo Baraniewski Pode Confirmar o Hype Com Mais um Nocaute Relampago?',
        'Austen Lane Desce de Peso e Busca Renascimento no Meio-Pesado',
        'UFC Londres: A Diferenca de 15cm de Altura Vai Importar?',
        'O Prospect Polones Mais Explosivo do UFC Enfrenta Seu Maior Teste Fisico',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-450',
        fighter2_odds: '+350',
        fighter1_name: 'Iwo Baraniewski',
        fighter2_name: 'Austen Lane',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Poder Explosivo de Baraniewski', stat_headline: '2 NOCAUTES CONSECUTIVOS NO R1, UM EM APENAS 20 SEGUNDOS', contexto: 'Baraniewski finaliza com velocidade absurda. O poder e genuino e o timing e preciso.', implicacao_aposta: 'Forte edge para Baraniewski dentro da distancia e Under 1.5 rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Durabilidade em Questao de Lane', stat_headline: 'LANE FOI FINALIZADO NAS ULTIMAS 2 LUTAS, AMBAS NO R1', contexto: 'O queixo e a capacidade de sobreviver de Lane estao em serio declinio. Nocauteado e finalizado consecutivamente.', implicacao_aposta: 'Aumenta drasticamente a probabilidade de finalizacao precoce de Baraniewski.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'BarChart3', titulo: 'Diferenca de Tamanho: 15cm de Altura', stat_headline: 'LANE E 1,98M COM 203CM DE ENVERGADURA VS 1,83M DE BARANIEWSKI', contexto: 'A diferenca fisica e massiva. Se Lane usar o tamanho de forma inteligente, pode manter Baraniewski longe.', implicacao_aposta: 'Unico argumento para Lane. Se voce acredita que tamanho importa mais que tudo.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Estreia no Meio-Pesado para Lane', stat_headline: 'LANE DESCE DO PESO-PESADO (265 LBS) PARA O MEIO-PESADO (205 LBS)', contexto: 'Primeira vez na carreira que Lane faz 205 lbs. A descida de 60 lbs pode afetar desempenho positiva ou negativamente.', implicacao_aposta: 'Incognita total. Nao aposte pesado em Lane baseado na descida de peso.', edge_level: 'leve', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Baraniewski por KO/TKO R1', odds: '-200', confianca: 'alta', raciocinio: 'O cenario mais provavel dado o historico de ambos. Baraniewski finaliza no R1, Lane e finalizado no R1. Convergencia total.' },
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-180', confianca: 'alta', raciocinio: 'As ultimas 4 lutas combinadas (2 de cada) terminaram no R1. A probabilidade de ir alem disso e baixa.' },
        { tipo: 'Moneyline', pick: 'Baraniewski (-450)', odds: '-450', confianca: 'media', edge_vs_mercado: 'O preco e alto mas justificado. Nao oferece grande valor.', raciocinio: 'Baraniewski e favorito claro, mas -450 nao da muito retorno. Melhor apostar no metodo e round.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Lane por Decisao',
        descricao: 'As ultimas 4 lutas combinadas de ambos terminaram no R1. Apostar em decisao nessa luta e ir contra toda a evidencia recente. Se vai ter vencedor, vai ser por finalizacao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
