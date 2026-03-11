import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'emmett-vs-vallejos',
  evento_id: null,
  slug: 'emmett-vs-vallejos',
  titulo: 'Emmett vs Vallejos: Poder Veterano Contra a Furia Argentina',
  subtitulo: 'O recordista de knockdowns do peso-pena enfrenta o prospect mais explosivo da America do Sul no main event de Las Vegas',
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
    predictedMethod: 'TKO R2-R3',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Josh Emmett',
    record: '19-6-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Kevin Vallejos',
    record: '17-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Pena (145 lbs)',
  num_rounds: 5,
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
    // ===========================
    // Section 1: HERO
    // ===========================
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Poder Veterano Contra a Furia Argentina',
      tagline_sub: 'O recordista de knockdowns do UFC encontra o fenomeno sul-americano em 5 rounds',
      fighter1: {
        nome_completo: 'Josh "CC0" Emmett',
        apelido: 'CC0',
        sobrenome: 'Emmett',
        record: '19-6-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Phoenix, Arizona, EUA | 41 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Kevin "El Chino" Vallejos',
        apelido: 'El Chino',
        sobrenome: 'Vallejos',
        record: '17-1-0',
        ranking: '#14 Peso-Pena',
        info_extra: 'Mar del Plata, Argentina | 24 anos',
        imagem_fullbody_url: null,
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Crepusculo do Guerreiro Contra o Amanhecer do Fenomeno</h3>
        <p class="mb-4">
          Essa e uma daquelas lutas que o UFC monta com intencao cirurgica: o veterano testado pela elite contra o jovem que ninguem quer enfrentar. <strong class="text-ufc-red">Josh Emmett</strong> tem 41 anos, mais de uma decada no UFC, e carrega consigo o recorde de knockdowns na historia do peso-pena. Ja disputou titulo interino, ja nocauteou Ricardo Lamas, Bryce Mitchell e Michael Johnson, e ja enfrentou nomes como Ilia Topuria e Yair Rodriguez. O curriculo dele e impecavel.
        </p>
        <p class="mb-4">
          Mas o tempo cobra seu preco. Nas ultimas 5 lutas, Emmett venceu apenas uma: o nocaute espetacular de Mitchell no UFC 296. De resto, foram derrotas para Lerone Murphy por decisao, Youssef Zalal por finalizacao no primeiro round, Yair Rodriguez por triangulo e Topuria por decisao dominante. Aos 41 anos, cada derrota pesa mais, cada camp fica mais dificil, e cada adversario jovem e um risco diferente.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Ascensao de El Chino</h3>
        <p class="mb-4">
          Do outro lado, <strong class="text-blue-400">Kevin Vallejos</strong> e a definicao de prospect assustador. O argentino de 24 anos chegou ao UFC com um cartel de 14-1, construido na cena sul-americana e consolidado no Dana White's Contender Series. Desde a estreia, foram 3 vitorias seguidas, incluindo o nocaute de Giga Chikadze com um backfist giratatorio que concorre a KO do ano. Vallejos tem 12 nocautes em 17 vitorias. Ele nao vem para pontuar.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p class="mb-4">
          Para <strong class="text-ufc-red">Emmett</strong>, essa luta pode definir o final da sua carreira. Com 4 derrotas nas ultimas 5, uma derrota aqui, especialmente contra um prospect, acelera muito a conversa sobre aposentadoria. Uma vitoria, por outro lado, prova que o poder dele ainda e relevante e que a experiencia em 5 rounds contra um jovem pode fazer a diferenca.
        </p>
        <p class="mb-4">
          Para <strong class="text-blue-400">Vallejos</strong>, e a oportunidade de ouro: vencer um nome historico do peso-pena em main event de 5 rounds e se lancar diretamente para o top 10. A vitoria sobre Chikadze ja foi enorme, mas Emmett e um nome que a comunidade respeita. Uma finalizacao convincente aqui coloca Vallejos em orbita.
        </p>
      `,
      stakes: [
        {
          dimensao: 'Objetivo',
          fighter1: 'Provar que ainda pode competir no alto nivel aos 41 anos',
          fighter2: 'Eliminar veterano e se projetar no top 10',
        },
        {
          dimensao: 'Risco',
          fighter1: 'Quinta derrota em 6 lutas = aposentadoria provavel',
          fighter2: 'Perder para veterano em declinio freia o hype totalmente',
        },
        {
          dimensao: 'Narrativa',
          fighter1: 'Ultimo suspiro de um guerreiro historico',
          fighter2: 'Argentina produzindo o proximo astro do peso-pena',
        },
        {
          dimensao: 'Recompensa',
          fighter1: 'Sobrevivencia no UFC, possivel luta de despedida contra nome grande',
          fighter2: 'Top 10 e possivel co-main em PPV',
        },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O PODER NAO ENVELHECE',
          subtitulo: 'Emmett prova que uma direita pode mudar tudo, independente da idade',
          consequencias: [
            { tag: 'LEGADO', texto: 'Emmett consolida seu legado como um dos maiores nocauteadores da historia do peso-pena' },
            { tag: 'NARRATIVA', texto: 'A historia do veterano que se recusa a morrer ganha seu melhor capitulo recente' },
            { tag: 'DIVISAO', texto: 'Mostra que os prospects sul-americanos ainda precisam amadurecer contra veteranos de elite' },
          ],
          proxima_luta: 'Possivel luta de despedida contra outro veterano ou nome ranqueado no top 15',
        },
        fighter2_vence: {
          titulo: 'A ARGENTINA DOMINA O PESO-PENA',
          subtitulo: 'Vallejos elimina o gatekeeper definitivo e entra no seleto grupo dos melhores da divisao',
          consequencias: [
            { tag: 'RANKING', texto: 'Vallejos entra no top 10 e se posiciona para enfrentar um top 5 na proxima luta' },
            { tag: 'HYPE', texto: 'Quarta vitoria consecutiva no UFC consolida o argentino como fenomeno global' },
            { tag: 'FUTURO', texto: 'Abre portas para co-main de PPV ou main event contra oponente ranqueado' },
          ],
          proxima_luta: 'Luta contra um top 10 como Movsar Evloev, Diego Lopes ou Arnold Allen',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Josh Emmett',
        color: 'red',
        recent_fights: [
          {
            date: 'Out 2025',
            opponent: 'Youssef Zalal',
            result: 'L',
            method: 'Sub R1 (armbar, 1:38)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Finalizado rapidamente por armbar no primeiro round. Emmett foi surpreendido no chao por Zalal, que e especialista em jiu-jitsu. Primeira finalizacao por submissao sofrida desde Yair Rodriguez.',
          },
          {
            date: 'Abr 2025',
            opponent: 'Lerone Murphy',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: '#12 FW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Murphy usou alcance e movimentacao para neutralizar o poder de Emmett. Luta competitiva mas Emmett nunca conseguiu encurtar a distancia de forma consistente.',
          },
          {
            date: 'Dez 2023',
            opponent: 'Bryce Mitchell',
            result: 'W',
            method: 'KO R1 (soco, 1:01)',
            opponent_rank: '#8 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Nocaute devastador com uma unica direita no queixo. Mitchell caiu duro e a luta foi parada em pouco mais de um minuto. KO do ano de 2023.',
          },
          {
            date: 'Fev 2023',
            opponent: 'Yair Rodriguez',
            result: 'L',
            method: 'Sub R2 (triangulo, 4:19)',
            opponent_rank: '#3 FW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Luta pelo titulo interino. Rodriguez controlou e finalizou com triangulo no segundo round. Emmett mostrou coracao, mas a diferenca tecnica foi clara.',
          },
          {
            date: 'Jun 2022',
            opponent: 'Calvin Kattar',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: '#4 FW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Guerra de 5 rounds contra Kattar. Emmett venceu por split decision numa luta que ganhou Fight of the Night. Mostrou coracao e poder ao longo de 25 minutos.',
          },
        ],
        full_fight_history: [
          { date: 'Jun 2023', opponent: 'Ilia Topuria', result: 'L', method: 'UD', opponent_rank: '#7 FW', quality_score: 5, quality_label: 'Excelente', note: 'Dominado por 5 rounds pelo futuro campeao. Topuria venceu 50-44 num dos cartoes.' },
          { date: 'Fev 2023', opponent: 'Yair Rodriguez', result: 'L', method: 'Sub R2', opponent_rank: '#3 FW', quality_score: 5, quality_label: 'Excelente', note: 'Finalizado pelo triangulo no titulo interino' },
          { date: 'Jun 2022', opponent: 'Calvin Kattar', result: 'W', method: 'SD', opponent_rank: '#4 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Vitoria por split decision em guerra de 5 rounds' },
          { date: 'Dez 2021', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#8 FW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida por unanime no UFC 269' },
          { date: 'Jun 2020', opponent: 'Shane Burgos', result: 'W', method: 'UD', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Bom', note: 'FOTN. Dominou Burgos por 3 rounds' },
          { date: 'Jul 2019', opponent: 'Mirsad Bektic', result: 'W', method: 'TKO R1', opponent_rank: '#8 FW', quality_score: 3, quality_label: 'Bom', note: 'Strikes no primeiro round pararam a luta' },
          { date: 'Mar 2019', opponent: 'Michael Johnson', result: 'W', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute no terceiro round' },
          { date: 'Dez 2017', opponent: 'Ricardo Lamas', result: 'W', method: 'KO R1', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocaute brutal no primeiro round contra top 5' },
          { date: 'Jul 2017', opponent: 'Desmond Green', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao unanime' },
          { date: 'Jan 2017', opponent: 'Jon Tuck', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada por split decision na estreia UFC' },
        ],
        layoff_warning: 'Aproximadamente 5 meses de inatividade desde outubro de 2025. Dentro do padrao normal, porem o desgaste acumulado na carreira aos 41 anos e um fator.',
        momentum_score: 3,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Emmett vive o pior momento da carreira. Apenas 1 vitoria nas ultimas 5 lutas, com derrotas para Murphy, Zalal, Rodriguez e Topuria. A unica vitoria (KO de Mitchell) mostra que o poder ainda existe, mas o padrao geral e de declinio. Aos 41 anos, a velocidade e a recuperacao ja nao sao as mesmas. A finalizacao rapida por Zalal expoe uma vulnerabilidade crescente no chao. A questao nao e se Emmett ainda tem poder, e se ele consegue chegar perto o suficiente para usar.',
      },
      fighter2: {
        nome: 'Kevin Vallejos',
        color: 'blue',
        recent_fights: [
          {
            date: 'Dez 2025',
            opponent: 'Giga Chikadze',
            result: 'W',
            method: 'KO R2 (backfist giratatorio + cotoveladas, 1:29)',
            opponent_rank: '#15 FW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Nocaute espetacular com backfist giratatorio seguido de cotoveladas no chao. Chikadze nunca tinha sido nocauteado antes. Concorrente a KO do ano. Performance que colocou Vallejos no mapa mundial.',
          },
          {
            date: 'Ago 2025',
            opponent: 'Danny Silva',
            result: 'W',
            method: 'Decisao Unanime (30-27, 29-28, 30-27)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria dominante por 3 rounds. Vallejos controlou a distancia e mostrou que pode vencer por pontos quando necessario. Luta menos espetacular mas eficiente.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Seung Woo Choi',
            result: 'W',
            method: 'TKO R1 (socos, 3:09)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Estreia no UFC com nocaute dominante no primeiro round. Vallejos machucou Choi cedo e terminou com socos pesados. Impressionou na primeira aparicao.',
          },
        ],
        full_fight_history: [
          { date: 'Mar 2025', opponent: 'Seung Woo Choi', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia UFC com nocaute no R1' },
          { date: 'Ago 2025', opponent: 'Danny Silva', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Dominio por decisao unanime' },
          { date: 'Dez 2025', opponent: 'Giga Chikadze', result: 'W', method: 'KO R2', opponent_rank: '#15 FW', quality_score: 3, quality_label: 'Bom', note: 'KO historico com backfist giratatorio' },
        ],
        layoff_warning: 'Aproximadamente 3 meses desde dezembro de 2025. Turnaround rapido para um main event. Fisicamente jovem e deve estar 100%.',
        momentum_score: 9,
        momentum_label: 'Em Ascensao Total',
        momentum_trend: 'ascending',
        momentum_note: 'Vallejos esta no melhor momento possivel. Invicto no UFC (3-0), com sequencia de 6 vitorias consecutivas na carreira, incluindo o nocaute historico de Chikadze. Cada luta mostra evolucao: nocaute na estreia, vitoria por pontos mostrando paciencia, e depois o KO espetacular contra um veterano ranqueado. Aos 24 anos, tem tempo, poder e confianca. O unico ponto de interrogacao e a experiencia limitada em lutas de 5 rounds e contra oponentes com o tipo de poder que Emmett carrega.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Emmett',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '1W-4L (20%)',
        contra_top5: '0W-3L',
      },
      fighter2: {
        nome: 'Vallejos',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Emmett e Vallejos nao compartilham oponentes em comum no UFC. Isso reflete a enorme diferenca de experiencia entre os dois: Emmett lutou 16 vezes na organizacao contra nomes como Topuria, Rodriguez, Kattar e Lamas, enquanto Vallejos tem apenas 3 lutas no octogono. A comparacao indireta mais relevante e que ambos enfrentaram lutadores de striking com alcance (Murphy para Emmett, Chikadze para Vallejos), mas os resultados foram opostos: Emmett perdeu para Murphy, enquanto Vallejos nocauteou Chikadze. Isso sugere que Vallejos lida melhor com trocadores altos e tecnicos.',
    },

    // ===========================
    // Section 5: OPONENTE COMUM
    // ===========================
    oponente_comum: null,

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 3.72,
          valueB: 5.78,
          maxVal: 8,
          format: 'decimal',
          note: 'Vallejos dispara quase 2 golpes significativos a mais por minuto. Volume impressionante para alguem com tanta precisao.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 35,
          valueB: 46,
          maxVal: 100,
          format: 'percent',
          note: 'Emmett tem uma das menores precisoes da divisao (35%). Vallejos e significativamente mais preciso, acertando quase metade do que dispara.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 4.43,
          valueB: 4.71,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Surpreendentemente proximo. Ambos absorvem muitos golpes, o que aumenta a chance de nocaute para qualquer lado.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 61,
          valueB: 56,
          maxVal: 100,
          format: 'percent',
          note: 'Emmett tem leve vantagem na defesa de strikes. Porem, a amostra de Vallejos e muito menor (3 lutas UFC).',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 1.08,
          valueB: 0.71,
          maxVal: 4,
          format: 'decimal',
          note: 'Emmett e mais ativo nas derrubadas, fruto de sua base em wrestling colegial. Nenhum dos dois e um wrestler puro.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 37,
          valueB: 28,
          maxVal: 100,
          format: 'percent',
          note: 'Ambos tem precisao de takedown abaixo da media. A luta tende a se resolver em pe.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 46,
          valueB: 83,
          maxVal: 100,
          format: 'percent',
          note: 'Vallejos defende 83% das derrubadas, quase o dobro de Emmett. Se Emmett tentar levar ao chao, a probabilidade de sucesso e baixa.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '41 anos',
          fighter2: '24 anos',
          note: '17 anos de diferenca. Uma das maiores disparidades de idade em main events recentes do UFC.',
        },
        {
          label: 'Altura',
          fighter1: '1.68m (5\'6")',
          fighter2: '1.70m (5\'7")',
          note: 'Vallejos tem leve vantagem na altura.',
        },
        {
          label: 'Envergadura',
          fighter1: '178cm (70")',
          fighter2: '173cm (68")',
          note: 'Emmett tem 5cm (2 pol) de vantagem na envergadura. Incomum para o lutador mais baixo.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Switch (troca de base)',
          note: 'Vallejos muda de base com frequencia, dificultando leitura e timing do oponente.',
        },
        {
          label: 'Academia',
          fighter1: 'Team Alpha Male, Sacramento',
          fighter2: 'Brothers of Life MMA, Argentina',
          note: null,
        },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 62,
          valueB: 80,
          labelA: 'Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Vallejos e superior no striking em volume, precisao e variedade. Troca de base, usa chutes giratarios, cotoveladas e combinacoes criativas. Emmett tem poder concentrado na direita, mas e mais previsivel.',
        },
        {
          label: 'Wrestling / Derrubadas',
          valueA: 55,
          valueB: 50,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'even',
          advantage_note: 'Emmett tem background em wrestling colegial e tenta mais derrubadas (1.08/15min), mas a precisao e baixa (37%). Vallejos defende 83% das tentativas. Nenhum dos dois prioriza o wrestling.',
        },
        {
          label: 'Controle no Chao',
          valueA: 45,
          valueB: 40,
          labelA: 'Medio',
          labelB: 'Medio',
          advantage: 'even',
          advantage_note: 'Nenhum dos dois e especialista de chao. Emmett foi finalizado por Zalal e Rodriguez, mostrando vulnerabilidade. Vallejos nao tem historico relevante de grappling no UFC.',
        },
        {
          label: 'Cardio / Gas',
          valueA: 60,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Emmett ja lutou 5 rounds contra Kattar e Topuria, mas tem 41 anos. Vallejos e 17 anos mais jovem, mas nunca lutou alem de 3 rounds. Em 5 rounds, a juventude tende a ser decisiva.',
        },
        {
          label: 'Defesa',
          valueA: 52,
          valueB: 58,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Vallejos defende 83% dos takedowns e tem movimentacao mais dinamica. Emmett tem boa defesa de strikes (61%) mas defende apenas 46% dos takedowns e absorve 4.43 golpes/min.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 75,
          valueB: 82,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Ambos tem poder real de nocaute. Emmett tem 7 KOs na carreira e ja derrubou gente com uma mao. Vallejos tem 12 KOs em 17 vitorias (71%) e despachou Chikadze de forma espetacular. Vallejos leva vantagem pelo volume combinado com poder.',
        },
      ],
      insight: 'Vallejos leva vantagem em quase todas as categorias. A juventude, o volume de strikes, a precisao e a variedade ofensiva criam um perfil superior. A unica area onde Emmett compete de forma equilibrada e no wrestling, mas nenhum dos dois prioriza esse aspecto. O trunfo real de Emmett e o poder concentrado na mao direita e a experiencia em lutas de alto nivel. Se ele conectar a bomba certa, nada mais importa. Mas as estatisticas dizem que isso esta cada vez mais dificil de acontecer.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Emmett',
        ko_tko: { count: 7, percent: 37 },
        submission: { count: 2, percent: 10 },
        decision: { count: 10, percent: 53 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Vallejos',
        ko_tko: { count: 12, percent: 71 },
        submission: { count: 2, percent: 12 },
        decision: { count: 3, percent: 17 },
        total_wins: 17,
      },
      insight: 'O contraste e revelador. Emmett, apesar da fama de nocauteador, na verdade vence a maioria das lutas por decisao (53%). Os 7 nocautes sao memoraveis, mas representam menos da metade das suas vitorias. Vallejos, por outro lado, e um finalizador nato: 71% das suas vitorias sao por KO/TKO e 83% terminam antes dos juizes. Vallejos busca o nocaute de forma sistematica. Emmett tem o poder de encerrar a luta, mas frequentemente precisa dos cartoes. Em 5 rounds, isso significa que Emmett pode perder rounds enquanto procura a bomba, e Vallejos pode acumular dano consistente.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 7,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Zona de Perigo para Ambos',
          description: 'Os dois primeiros rounds sao onde essa luta pode terminar para qualquer lado. Emmett carrega poder de nocaute que pode desligar qualquer um com uma mao. Vallejos tem volume, precisao e criatividade para machucar Emmett cedo. A diferenca e que Emmett precisa desses rounds para vencer, enquanto Vallejos pode se dar ao luxo de ser paciente. Se Emmett conectar a direita nos primeiros 10 minutos, a luta pode acabar. Se Vallejos impor seu ritmo e acumular dano, o nocaute tecnico pode vir no final do segundo round.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM VALLEJOS',
          color: 'green',
          title: 'O Round Intermediario',
          description: 'Se a luta chega ao terceiro round sem finalizacao, Vallejos comeca a abrir vantagem. A juventude e o volume superior significam que ele pode manter o ritmo enquanto Emmett precisa administrar a energia. Historicamente, Emmett ainda compete bem no terceiro round, mas aos 41 anos, cada round acumula mais fadiga. Vallejos pode comecar a conectar combinacoes mais longas e forcar erros.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM VALLEJOS',
          color: 'green',
          title: 'O Championship Territory',
          description: 'Os rounds de campeonato sao o maior fator desconhecido dessa luta. Emmett ja mostrou que pode lutar 5 rounds (Kattar, Topuria), mas perdeu ambas as vezes e tem 41 anos agora. Vallejos nunca foi alem de 3 rounds na carreira. Em teoria, a juventude e o condicionamento de Vallejos prevalecem, mas essa e uma experiencia inedita para ele. Se Emmett ainda estiver competitivo no quarto round, pode surpreender com uma bomba contra um Vallejos que nunca esteve em aguas tao profundas.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        {
          icon: 'Clock',
          title: 'A Diferenca de Idade: 17 Anos',
          fighter: 'Emmett / Vallejos',
          risk_level: 'FATOR CRITICO',
          risk_color: 'red',
          description: 'Emmett tem 41 anos e Vallejos tem 24. Essa e uma das maiores diferencas de idade em main events recentes do UFC. No MMA, a idade impacta velocidade de reacao, recuperacao entre rounds e capacidade de absorver dano. Para Emmett, cada round que passa e mais um round contra o relogio biologico. Para Vallejos, os 5 rounds sao territorios inexplorados, mas a juventude compensa.',
        },
        {
          icon: 'Zap',
          title: 'Poder de Uma Mao de Emmett',
          fighter: 'Emmett',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Emmett detem o recorde de knockdowns na historia do peso-pena do UFC. A direita dele nocauteou Bryce Mitchell em 1:01, Ricardo Lamas no primeiro round e Michael Johnson no terceiro. Mesmo aos 41 anos, o poder permanece. Uma unica mao pode mudar tudo. Vallejos precisa respeitar esse poder em cada segundo dos 25 minutos.',
        },
        {
          icon: 'TrendingUp',
          title: 'Trajetoria Ascendente de Vallejos',
          fighter: 'Vallejos',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Vallejos esta numa trajetoria impressionante: KO na estreia, decisao dominante na segunda, e nocaute historico de Chikadze na terceira. Cada luta mostra evolucao. O KO de Chikadze com backfist giratatorio foi o tipo de golpe que coloca fighters no mapa mundial. A confianca dele esta no maximo.',
        },
        {
          icon: 'Brain',
          title: 'Experiencia em 5 Rounds',
          fighter: 'Emmett',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Emmett ja lutou main events de 5 rounds contra Kattar, Topuria e Rodriguez. Ele sabe administrar energia e estrategia ao longo de 25 minutos. Vallejos nunca lutou mais do que 3 rounds na carreira. Esse e o primeiro teste de 5 rounds do argentino, e ninguem sabe como ele vai reagir nos campeonato rounds.',
        },
        {
          icon: 'Target',
          title: 'Switch Stance de Vallejos',
          fighter: 'Vallejos',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Vallejos luta trocando de base com frequencia, criando angulos diferentes e dificultando a leitura do oponente. Contra Emmett, que depende de timing para conectar a direita, essa mudanca constante de angulo pode ser devastadora. Emmett teve dificuldade contra Murphy, que tambem usava movimentacao lateral.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Declinio Recente de Emmett',
          fighter: 'Emmett',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Uma vitoria nas ultimas 5 lutas e um numero preocupante. A finalizacao por Zalal no primeiro round e a dominacao de Topuria por 5 rounds mostram que os reflexos e a defesa de Emmett ja nao sao os mesmos. A pergunta nao e se Emmett tem poder, e se ele vai ter a oportunidade de usar.',
        },
        {
          icon: 'Shield',
          title: 'Defesa de Takedown Superior de Vallejos',
          fighter: 'Vallejos',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Vallejos defende 83% das derrubadas no UFC. Emmett defende apenas 46%. Se a luta eventualmente for para o chao, e mais provavel que Vallejos controle a situacao. A vulnerabilidade de Emmett no grappling foi exposta por Zalal e Rodriguez recentemente.',
        },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Emmett',
        total_probability: 28,
        scenarios: [
          {
            name: 'A Bomba Certeira',
            probability: 14,
            method: 'KO/TKO R1-R2',
            description: 'Emmett encontra o timing para a direita enquanto Vallejos troca de base. O argentino entra confiante demais e come uma mao pesada que o sacode. Emmett segue com ground and pound ou outra sequencia para finalizar. E o cenario mais perigoso para Vallejos: o poder de Emmett e real e pode desligar qualquer um. O nocaute de Mitchell provou que basta uma mao. Mas com 35% de precisao, encontrar essa mao esta cada vez mais dificil.',
          },
          {
            name: 'Experiencia em 5 Rounds',
            probability: 8,
            method: 'Decisao Dividida ou Unanime',
            description: 'Emmett usa a experiencia em lutas longas para administrar os rounds. Rouba rounds com explosoes estrategicas, mistura takedowns e strikes, e capitaliza quando Vallejos entra em territorio desconhecido nos rounds 4 e 5. Similar ao que fez contra Kattar, onde venceu por split decision em 5 rounds. Cenario que depende de Vallejos sentir o ritmo novo e Emmett manter gas suficiente.',
          },
          {
            name: 'Pressao de Wrestling',
            probability: 6,
            method: 'Decisao ou Sub Tardia',
            description: 'Emmett muda o plano de jogo e prioriza derrubadas. Pressiona Vallejos contra a grade, busca derrubadas repetidas e controla o tempo no chao. A precisao de takedown de 37% e baixa, mas contra a grade as chances aumentam. Se Emmett conseguir controlar Vallejos no chao, pode acumular pontos ou encontrar uma finalizacao. Cenario improvavel dada a defesa de 83% de Vallejos.',
          },
        ],
      },
      fighter2: {
        nome: 'Vallejos',
        total_probability: 70,
        scenarios: [
          {
            name: 'Volume e Desgaste',
            probability: 28,
            method: 'TKO R2-R3',
            description: 'Vallejos mantem distancia no primeiro round, acumula jabs e chutes, e evita a direita de Emmett. A partir do segundo round, comeca a pressionar com combinacoes mais longas. O volume de 5.78 golpes por minuto contra a defesa de 61% de Emmett gera dano acumulado. No segundo ou terceiro round, uma sequencia de golpes limpos forca o arbitro a parar. E o cenario mais provavel: a juventude e o volume superam gradualmente o veterano.',
          },
          {
            name: 'Nocaute Espetacular',
            probability: 18,
            method: 'KO R1-R2',
            description: 'Vallejos conecta um golpe criativo, como o backfist giratatorio que usou contra Chikadze, ou um chute alto quando Emmett avanca. Com 12 nocautes em 17 vitorias, o argentino tem poder real e variedade. Emmett absorve 4.43 golpes por minuto, oferecendo oportunidades. Uma explosao precoce de Vallejos pode surpreender antes de Emmett se ajustar.',
          },
          {
            name: 'Dominio Tecnico em 5 Rounds',
            probability: 16,
            method: 'Decisao Unanime',
            description: 'Vallejos controla a distancia por 5 rounds, usando movimentacao lateral e troca de base para confundir Emmett. Acumula pontos com jabs, chutes e combinacoes sem nunca se arriscar desnecessariamente. Emmett nao consegue encurtar a distancia de forma consistente e perde nos cartoes. Similar ao que Murphy fez contra Emmett em abril de 2025.',
          },
          {
            name: 'Contra-ataque Fatal',
            probability: 8,
            method: 'KO R3-R5',
            description: 'Nos rounds tardios, Emmett tenta uma investida desesperada e Vallejos o recebe com um contra-ataque preciso. Com a fadiga acumulada, os reflexos de Emmett ficam mais lentos e ele se torna um alvo mais facil. Vallejos pode encerrar a luta num momento onde Emmett normalmente e mais vulneravel.',
          },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Kevin Vallejos',
      winner_side: 'fighter2',
      predicted_method: 'TKO R2-R3 ou Decisao Unanime',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Vallejos e favorito por razoes solidas. O argentino tem vantagem em volume (5.78 vs 3.72 golpes/min), precisao (46% vs 35%), taxa de finalizacao (83% de vitorias antes da decisao), juventude (17 anos mais jovem) e momento (3-0 no UFC vs 1-4 nas ultimas 5 de Emmett). O declinio de Emmett e real: a finalizacao por Zalal e a dominacao de Topuria mostram que o nivel caiu. A unica ameaca concreta e o poder de nocaute de Emmett, que permanece intacto independente da idade. Mas com 35% de precisao de strikes, encontrar a bomba contra um lutador que troca de base e se movimenta como Vallejos e extremamente dificil. A confianca e media-alta porque, apesar do favoritismo claro de Vallejos, Emmett sempre carrega perigo de nocaute e uma unica mao pode mudar tudo em 5 rounds.',
      x_factor: {
        title: 'Os 5 Rounds: Bendicao ou Maldicao para Vallejos?',
        description: 'Vallejos nunca lutou mais de 3 rounds profissionalmente. Esse e o primeiro teste de 5 rounds da carreira dele. Emmett ja esteve la 3 vezes. Em teoria, a juventude de Vallejos compensa, mas rounds de campeonato sao uma experiencia diferente. Se Vallejos entrar nos R4-R5 com o mesmo ritmo, Emmett esta perdido. Se o argentino sentir a fadiga nova e desacelerar, Emmett pode encontrar a abertura para a bomba. E o fator que pode virar a luta.',
      },
      upset_alert: {
        title: 'Upset Alert: Emmett por KO no R1-R2',
        description: 'Nunca subestime o poder de Emmett. O homem nocauteou Bryce Mitchell em 1:01, Ricardo Lamas em menos de um round e Michael Johnson no terceiro. O recorde de knockdowns do peso-pena nao e acidente. Se Vallejos entrar desrespeitando o poder do veterano, ou se ficar estatico por um segundo na frente da direita de Emmett, pode acordar olhando pro teto. As odds de +410 refletem que isso e improvavel, mas no MMA uma unica mao muda tudo.',
      },
      probabilities: {
        fighter1: { nome: 'Emmett', percent: 28 },
        fighter2: { nome: 'Vallejos', percent: 70 },
        draw: 2,
      },
      value_picks: {
        moneyline: {
          pick: 'Vallejos por -550',
          reasoning: 'O preco e caro, mas justificado pelas vantagens acumuladas. Nao ha grande valor na moneyline pura por causa do spread, mas Vallejos e a escolha correta.',
        },
        method: {
          pick: 'Vallejos por TKO/KO',
          reasoning: 'Vallejos tem 12 KOs em 17 vitorias e Emmett absorve 4.43 golpes/min. A combinacao de volume alto e defesa porosa de Emmett cria oportunidades reais de parada por strikes no R2 ou R3.',
        },
        over_under: {
          pick: 'Over 1.5 Rounds',
          rounds: 1.5,
          reasoning: 'Apesar de ambos terem poder de finalizacao, Vallejos e inteligente o suficiente para nao se arriscar desnecessariamente no primeiro round contra o poder de Emmett. A tendencia e que a luta sobreviva o primeiro round.',
        },
        best_value: 'Melhor aposta de valor: Vallejos vencer dentro da distancia (TKO/KO) paga melhor que moneyline pura e tem alta probabilidade dado o estilo destrutivo do argentino.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'A Direita de Emmett nos Primeiros 5 Minutos',
          icon: 'Zap',
          description: 'Emmett e mais perigoso no inicio da luta, quando ainda esta fresco e rapido. Observe se ele consegue encontrar o timing para a direita enquanto Vallejos troca de base. Se Emmett conectar limpo nos primeiros 5 minutos, qualquer coisa pode acontecer. Se nao encontrar, a tendencia e que Vallejos tome controle.',
        },
        {
          num: 2,
          title: 'A Troca de Base de Vallejos',
          icon: 'Target',
          description: 'Vallejos alterna entre ortodoxa e southpaw constantemente. Isso dificulta a leitura do timing de Emmett e cria angulos diferentes para ataques. Observe com que frequencia Vallejos muda de base e se Emmett consegue se ajustar. Lutadores que trocam de base frequentemente tendem a pegar oponentes previsíveis de surpresa.',
        },
        {
          num: 3,
          title: 'O Volume de Golpes no R2',
          icon: 'Activity',
          description: 'Vallejos media 5.78 golpes significativos por minuto. Observe se esse volume se mantem ou aumenta no segundo round. Se Vallejos acelerar e Emmett nao conseguir acompanhar, a diferenca de ritmo pode gerar uma parada tecnica. O segundo round e historicamente onde Emmett comeca a desacelerar.',
        },
        {
          num: 4,
          title: 'Emmett nos Rounds 4 e 5',
          icon: 'Clock',
          description: 'Emmett ja lutou 5 rounds 3 vezes (Kattar, Topuria, Rodriguez). Observe o gas dele nos rounds de campeonato e se ele ainda carrega poder. Aos 41 anos, 5 rounds sao muito mais desgastantes. Se Emmett ainda estiver competitivo no quarto round, e sinal de que preparou o cardio para essa luta.',
        },
        {
          num: 5,
          title: 'Vallejos em Territorio Desconhecido',
          icon: 'Shield',
          description: 'Vallejos nunca lutou 5 rounds profissionalmente. Observe a linguagem corporal dele entre o terceiro e quarto rounds. Ele esta relaxado? Mostra sinais de fadiga? Sua taxa de golpes cai? Esse e o maior X-factor da luta. Se Vallejos mantiver o ritmo, Emmett nao tem chance. Se desacelerar, a porta se abre.',
        },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        {
          slide_number: 1,
          title: 'EMMETT vs VALLEJOS',
          content: 'UFC Fight Night: Emmett vs Vallejos\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso-Pena (145 lbs)\n5 Rounds - Main Event',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'JOSH EMMETT',
          content: '19-6-0\n"CC0" | 41 anos\n\n7 nocautes (37% por KO)\nRecorde de knockdowns no peso-pena\n3.72 golpes significativos/min\n\n1-4 nas ultimas 5 lutas\nBase: Team Alpha Male',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'KEVIN VALLEJOS',
          content: '17-1-0\n"El Chino" | 24 anos\n\n12 nocautes (71% por KO)\n5.78 golpes significativos/min\n46% de precisao\n83% defesa de takedown\n\n3-0 no UFC | 6 vitorias seguidas\nKO historico de Giga Chikadze',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'CHAVE DA LUTA',
          content: 'Emmett TEM o poder de nocautear\nqualquer um com UMA mao.\n\nMas acerta apenas 35% dos golpes.\n\nVallejos dispara 5.78 golpes/min\ne acerta 46%. O volume vence\no poder na maioria dos cenarios.\n\n17 ANOS de diferenca de idade.',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'Vallejos por TKO R2-R3\nou Decisao Unanime\nConfianca: MEDIA-ALTA\n\nVallejos: 70% | Emmett: 28%\n\nMas o poder de Emmett NUNCA\npode ser descartado!',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/5',
          text: 'Emmett vs Vallejos no main event de sabado. 41 anos vs 24 anos. O recordista de knockdowns do peso-pena contra o fenomeno argentino que nocauteou Chikadze. Vamos analisar.',
        },
        {
          num: '2/5',
          text: 'Emmett: 3.72 golpes/min, 35% de precisao, 4.43 absorvidos/min. 1-4 nas ultimas 5. MAS o poder de uma mao e historico. Nocauteou Mitchell em 1:01. Lamas no R1. O recorde de knockdowns no FW nao e por acaso.',
        },
        {
          num: '3/5',
          text: 'Vallejos: 5.78 golpes/min, 46% de precisao, 12 KOs em 17 vitorias. 3-0 no UFC com KO de Chikadze por backfist giratatorio. 83% de defesa de takedown. 24 anos e fome de subir no ranking.',
        },
        {
          num: '4/5',
          text: 'O dado mais importante: 17 ANOS de diferenca de idade. Em 5 rounds, isso pesa demais. Emmett ja lutou 5 rounds 3x, mas perdeu todas. Vallejos nunca foi alem de 3 rounds. Alguem vai descobrir algo novo sobre si mesmo.',
        },
        {
          num: '5/5',
          text: 'Previsao: Vallejos por TKO no R2-R3. O volume e a juventude vencem o poder. MAS se Emmett conectar a direita cedo, pode ser a maior surpresa do ano. Vallejos favorito a -550 e justo, mas nao aposte a casa. Uma mao muda tudo.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"O cara com o recorde de knockdowns do peso-pena tem 41 anos e perdeu 4 das ultimas 5. O prospect argentino nocauteou Chikadze com um backfist giratatorio e tem 24 anos. E isso e o main event de sabado."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Emmett acerta 35% dos golpes. Vallejos acerta 46% disparando quase 6 por minuto. A matematica e cruel: Emmett precisa de UM golpe perfeito, Vallejos so precisa fazer o que sempre faz. O problema pra Emmett e que com 35% de precisao, encontrar esse golpe contra um cara que troca de base o tempo todo e quase impossivel."',
        },
        {
          time: '25-40s',
          title: 'Os 5 Rounds',
          text: '"O grande X-factor: Vallejos nunca lutou 5 rounds. Emmett ja lutou 3 vezes, mas perdeu todas. Nos rounds 4 e 5, alguem vai descobrir seus limites. Se Vallejos manter o ritmo, acabou. Se sentir a fadiga nova, a porta se abre pro poder de Emmett."',
        },
        {
          time: '40-50s',
          title: 'O Perigo Real',
          text: '"Mas presta atencao: Emmett nocauteou Bryce Mitchell em 1:01. Ricardo Lamas no primeiro round. O poder PERMANECE mesmo aos 41. Vallejos tem que respeitar essa direita em cada segundo de cada round. Um descuido e noite acabada."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Previsao: Vallejos por TKO no segundo ou terceiro round. O volume vence o poder. Mas se voce gosta de upset, Emmett por KO nos 2 primeiros rounds a +410 nao e aposta maluca. Diz ai quem leva e se inscreve pro card completo."',
        },
      ],
      tiktok: [
        {
          hook: '41 contra 24 anos. O recorde de knockdowns do peso-pena contra o cara que NOCAUTEOU Chikadze com backfist giratatorio.',
          body: 'Emmett acerta 35% dos golpes. Vallejos acerta 46% e dispara quase 6 por minuto. A matematica e brutal pro veterano. Mas o poder de UMA mao de Emmett nocauteou Mitchell em 61 segundos. Vai apostar contra isso?',
          cta: 'Poder veterano ou furia argentina? Comenta quem leva.',
        },
        {
          hook: 'Vallejos tem 12 nocautes em 17 lutas. SETENTA E UM PORCENTO de finalizacao por KO.',
          body: 'E ele tem so 24 anos. O UFC deu pra ele o main event contra Emmett, o recordista de knockdowns. Dois nocauteadores, 5 rounds. Alguem vai dormir. A questao e quem.',
          cta: 'Vai acabar antes do R3? Responde sim ou nao.',
        },
        {
          hook: 'Emmett tem UMA vitoria nas ultimas CINCO lutas. E mesmo assim, essa vitoria foi o KO do ano.',
          body: 'E a historia da carreira dele. Pode perder 4 seguidas, mas quando conecta, APAGA qualquer um. Aos 41 anos, contra um prospect de 24, ele so precisa de uma mao. Mas precisa encontrar essa mao primeiro.',
          cta: 'O poder envelhece? Diz ai nos comentarios.',
        },
      ],
      headlines: [
        'Emmett vs Vallejos: O Poder de Uma Mao Contra a Furia de 12 Nocautes',
        '41 vs 24: A Maior Disparidade de Idade Define o Main Event de Las Vegas',
        'Vallejos Favorito a -550, Mas o Recorde de Knockdowns de Emmett Nao Pode Ser Ignorado',
        'De Mar del Plata ao Main Event: Vallejos Busca Consagracao Contra Lenda do Peso-Pena',
        'Crepusculo vs Amanhecer: Emmett Enfrenta Seu Maior Desafio Geracional',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE (always null)
    // ===========================
    betting_value: null,

    // ===========================
    // Section 15: RADAR DO APOSTADOR
    // ===========================
    radar_apostador: {
      odds: {
        fighter1_odds: '+410',
        fighter2_odds: '-550',
        fighter1_name: 'Emmett',
        fighter2_name: 'Vallejos',
        source: 'Odds de abertura via OddsShark e MMAOddsBreaker (marco 2026)',
      },
      edges: [
        {
          icon: 'Activity',
          titulo: 'Volume de Strikes Desproporcional',
          stat_headline: 'VALLEJOS DISPARA 5.78 SIG. STRIKES/MIN VS 3.72 DE EMMETT',
          contexto: 'Vallejos dispara quase 2 golpes significativos a mais por minuto que Emmett, com precisao superior (46% vs 35%). Em 5 rounds (25 minutos), essa diferenca se acumula drasticamente. Projetando: Vallejos pode conectar cerca de 67 golpes significativos contra aproximadamente 33 de Emmett. O dano acumulado e exponencial.',
          implicacao_aposta: 'A probabilidade de finalizacao por strikes (TKO) para Vallejos e alta, especialmente a partir do segundo round. Apostas em "Vallejos por TKO/KO" combinam com "Over 1.5 rounds".',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'TrendingUp',
          titulo: 'Momento e Trajetoria Opostos',
          stat_headline: 'VALLEJOS 3-0 NO UFC (6 SEGUIDAS) VS EMMETT 1-4 NAS ULTIMAS 5',
          contexto: 'A trajetoria recente e dramaticamente oposta. Vallejos vem de 3 vitorias consecutivas no UFC, incluindo KO de Chikadze. Emmett venceu apenas Mitchell nas ultimas 5, sendo finalizado por Zalal e dominado por Topuria e Murphy. O momentum psicologico e fisico favorece claramente o argentino.',
          implicacao_aposta: 'Lutadores em sequencias de derrotas tendem a performar abaixo da expectativa em lutas seguintes. O estado mental de Emmett e uma variavel que as odds ja precificam, mas talvez nao o suficiente.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Clock',
          titulo: 'Fator Idade em Main Event de 5 Rounds',
          stat_headline: '41 ANOS EM 5 ROUNDS: EMMETT PERDEU TODAS AS 3 LUTAS DE 5 ROUNDS',
          contexto: 'Emmett perdeu para Kattar (split decision, mas venceu), Rodriguez (sub R2) e Topuria (UD dominante) nas suas 3 lutas de 5 rounds. Nenhuma dessas foi apos os 40 anos. Aos 41, em 5 rounds contra um jovem de 24 com ritmo alto, a probabilidade de fadiga critica nos rounds tardios e altissima.',
          implicacao_aposta: 'Apostas em "Vallejos vencer nos rounds tardios (R3-R5)" capturam o efeito cumulativo da idade e do volume alto.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Zap',
          titulo: 'Poder de Nocaute Historico',
          stat_headline: 'EMMETT TEM O RECORDE DE KNOCKDOWNS NA HISTORIA DO PESO-PENA DO UFC',
          contexto: 'O poder de Emmett e lendario. Nocauteou Lamas, Mitchell e Johnson com golpes unicos. Aos 41, o poder permanece intacto, e a diferenca e o timing e a velocidade para chegar na distancia. Contra Vallejos, que absorve 4.71 golpes/min, existe risco real de nocaute.',
          implicacao_aposta: 'O valor de Emmett esta concentrado no nocaute precoce. "Emmett por KO/TKO R1-R2" a +410 ou mais oferece risco/retorno interessante para apostadores dispostos ao risco.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Shield',
          titulo: 'Defesa de Takedown Como Seguro',
          stat_headline: 'VALLEJOS DEFENDE 83% DAS DERRUBADAS VS 46% DE EMMETT',
          contexto: 'Se Emmett tentar mudar a estrategia para wrestling, a defesa de 83% de Vallejos praticamente elimina esse caminho. Por outro lado, a defesa de 46% de Emmett significa que qualquer tentativa de derrubada de Vallejos tem alta chance de sucesso. O chao, paradoxalmente, pode ser mais perigoso para o veterano.',
          implicacao_aposta: 'A luta muito provavelmente se resolve em pe, onde Vallejos tem vantagens claras em volume e precisao. Isso reforca apostas na vitoria de Vallejos por strikes.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
      ],
      value_picks: [
        {
          tipo: 'Metodo',
          pick: 'Vallejos por TKO/KO',
          odds: '+110 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'Vallejos tem 71% de taxa de nocaute e Emmett absorve 4.43 golpes/min. A probabilidade de parada por strikes e maior que o mercado sugere.',
          raciocinio: 'Com 5.78 golpes por minuto, 46% de precisao e 12 nocautes em 17 vitorias, Vallejos e um finalizador sistematico. Emmett absorve demais (4.43/min) e, aos 41 anos, a capacidade de absorver dano diminui. A combinacao de volume, precisao e poder do argentino contra a defesa porosa do veterano cria cenario ideal para parada por strikes no R2 ou R3.',
        },
        {
          tipo: 'Over/Under',
          pick: 'Over 1.5 Rounds',
          odds: '-170 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Vallejos e inteligente demais para se arriscar no R1 contra o poder de Emmett. A tendencia e que ele gerencie o primeiro round.',
          raciocinio: 'Apesar de ambos terem poder de finalizacao, Vallejos ja mostrou que pode ser paciente (vitoria por decisao contra Danny Silva). Contra um veterano com poder de nocaute historico, a estrategia logica e respeitar o primeiro round e acelerar depois. Das ultimas 5 lutas de Emmett, apenas 2 terminaram no primeiro round (o KO de Mitchell e a sub de Zalal).',
        },
        {
          tipo: 'Prop',
          pick: 'Vallejos vencer dentro da distancia',
          odds: '-130 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'Emmett raramente vai a decisao quando perde (a maioria das derrotas recentes foram por finalizacao). Se Vallejos dominar, e mais provavel parada do que decisao.',
          raciocinio: 'Vallejos finaliza 83% das suas vitorias. Emmett absorve volume alto e, aos 41 anos, a acumulacao de dano ao longo dos rounds aumenta a probabilidade de parada medica ou intervencao do arbitro. O cenario "Vallejos vence + nao vai a decisao" e o mais provavel.',
        },
        {
          tipo: 'Prop',
          pick: 'Emmett por KO/TKO R1',
          odds: '+800 (estimado)',
          confianca: 'baixa',
          edge_vs_mercado: 'O perigo de Emmett no primeiro round e real. A +800, basta uma pequena probabilidade para ter valor.',
          raciocinio: 'Emmett tem nocautes historicos no primeiro round: Mitchell (1:01), Lamas, Bektic. O poder nao envelhece da mesma forma que o cardio. Se Vallejos cometer um erro precoce, uma direita pode encerrar tudo. E uma aposta de alto risco, mas se voce acredita no poder residual do veterano, o preco esta atrativo.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Apostar Pesado em Vallejos Moneyline a -550',
        descricao: 'A -550, voce precisa apostar 550 para ganhar 100. Isso exige que Vallejos venca em pelo menos 85% dos cenarios para ser lucrativo a longo prazo. A estimativa real e de 70%, o que significa que a moneyline pura esta cara. O risco de upset por nocaute de Emmett, embora baixo (estimado em 14%), existe e pode destruir uma banca. O melhor valor nao esta na moneyline, mas nos metodos especificos: "Vallejos por TKO/KO" ou "Vallejos vencer dentro da distancia" pagam melhor e tem probabilidade similar. Nao pague caro pela moneyline quando o metodo oferece retorno superior.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
