import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'cutelaba-vs-sy',
  evento_id: null,
  slug: 'cutelaba-vs-sy',
  titulo: 'Cutelaba vs Sy: O Hulk Contra a Nova Onda Francesa',
  subtitulo: 'Veterano moldavo enfrenta prospect frances no Meta APEX',
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
    nome: 'Ion Cutelaba',
    record: '19-11-1',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Oumar Sy',
    record: '12-1-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Meio-Pesado (205 lbs)',
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
    // ===========================
    // Section 1: HERO
    // ===========================
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
      categoria_peso: 'Peso Meio-Pesado (205 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Hulk Contra a Nova Geracao',
      tagline_sub: 'Explosao moldava encontra a precisao francesa em Las Vegas',
      fighter1: {
        nome_completo: 'Ion "The Hulk" Cutelaba',
        apelido: 'The Hulk',
        sobrenome: 'Cutelaba',
        record: '19-11-1',
        ranking: 'N/R Meio-Pesado',
        info_extra: 'Chisinau, Moldova | 32 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Oumar Sy',
        apelido: '',
        sobrenome: 'Sy',
        record: '12-1-0',
        ranking: 'N/R Meio-Pesado',
        info_extra: 'Paris, Franca | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Veterano vs Prospect: A Dinamica que Define Divisoes</h3>
        <p class="mb-4">
          Essa luta e o tipo de confronto que o UFC monta com frequencia no peso meio-pesado: um veterano com quase 20 lutas na organizacao contra um prospect em ascensao que precisa provar que pertence ao nivel mais alto. <strong class="text-ufc-red">Cutelaba</strong> ja viu de tudo no octogono. Ja enfrentou nomes como Magomed Ankalaev, Glover Teixeira e Jared Cannonier. Ja nocauteou gente no primeiro minuto e ja foi finalizado no segundo round. Ele e o tipo de lutador que nunca te entrega uma luta chata, mas que tambem nunca te da certeza do resultado.
        </p>
        <p class="mb-4">
          Do outro lado, <strong class="text-blue-400">Sy</strong> e o novo sangue da divisao. O frances de 30 anos chegou ao UFC com um cartel de 9-0, construido principalmente no cenario europeu, incluindo passagens pelo KSW e Eagles FC. No UFC, ja sao 3 vitorias e 1 derrota, com finalizacoes impressionantes e uma unica mancha: a derrota por decisao unanime para Alonzo Menifield em junho de 2025.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p class="mb-4">
          Para <strong class="text-ufc-red">Cutelaba</strong>, essa luta e sobre relevancia. Com um cartel de 8-10-1 no UFC, ele esta numa posicao delicada. Mais uma derrota e o corte fica muito proximo. A vitoria controversa por decisao dividida contra Bukauskas no UFC 315, onde muitos analistas acreditam que Cutelaba venceu (ele acertou 94 golpes a mais), mostra que ele ainda pode competir, mas os juizes nem sempre concordam.
        </p>
        <p class="mb-4">
          Para <strong class="text-blue-400">Sy</strong>, e a chance de mostrar que a derrota para Menifield foi um acidente de percurso. Vencendo Cutelaba de forma convincente, Sy se posiciona para lutar contra oponentes ranqueados e comecar a escalar a divisao de verdade. Uma finalizacao colocaria seu nome em outra orbita.
        </p>
      `,
      stakes: [
        {
          dimensao: 'Objetivo',
          fighter1: 'Evitar o corte, provar relevancia',
          fighter2: 'Subir na divisao, buscar ranking',
        },
        {
          dimensao: 'Risco',
          fighter1: 'Terceira derrota em 4 lutas = corte provavel',
          fighter2: 'Perder para veterano em declinio freia o hype',
        },
        {
          dimensao: 'Narrativa',
          fighter1: 'Veterano moldavo sobrevivendo na elite',
          fighter2: 'Prospect frances buscando o proximo nivel',
        },
        {
          dimensao: 'Recompensa',
          fighter1: 'Sequencia de vitorias, mais tempo no UFC',
          fighter2: 'Oponente ranqueado na proxima luta',
        },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O HULK SOBREVIVE MAIS UMA VEZ',
          subtitulo: 'Cutelaba prova que experiencia e agressividade ainda vencem juventude',
          consequencias: [
            { tag: 'CARREIRA', texto: 'Cutelaba garante pelo menos mais 2-3 lutas no UFC com uma vitoria convincente' },
            { tag: 'NARRATIVA', texto: 'A historia do veterano que nao desiste ganha mais um capitulo' },
            { tag: 'DIVISAO', texto: 'Mostra que prospects europeus ainda precisam de mais tempo para amadurecer' },
          ],
          proxima_luta: 'Possivel luta contra outro veterano como Dustin Jacoby ou um prospect em teste',
        },
        fighter2_vence: {
          titulo: 'A FRANCA INVADE O MEIO-PESADO',
          subtitulo: 'Sy elimina o gatekeeper e avanca na divisao',
          consequencias: [
            { tag: 'RANKING', texto: 'Sy se posiciona para enfrentar um top 15 na proxima luta' },
            { tag: 'HYPE', texto: 'Prospect frances ganha credibilidade ao vencer veterano experiente' },
            { tag: 'FUTURO', texto: 'Abre portas para lutar no card principal de um evento europeu' },
          ],
          proxima_luta: 'Luta contra um top 15 como Philipe Lins, Modestas Bukauskas ou outro gatekeeper estabelecido',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Ion Cutelaba',
        color: 'red',
        recent_fights: [
          {
            date: 'Mai 2025',
            opponent: 'Modestas Bukauskas',
            result: 'L',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota controversa. Cutelaba acertou 94 golpes a mais que o oponente, mas perdeu nos cartoes por decisao dividida. Muitos analistas consideraram roubo.',
          },
          {
            date: 'Fev 2025',
            opponent: 'Ibo Aslan',
            result: 'W',
            method: 'Sub R1 (triangulo de braco)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria impressionante por finalizacao apos troca intensa. Primeira submissao de Cutelaba no UFC. Surpreendeu Aslan, que vinha de 6 vitorias seguidas.',
          },
          {
            date: 'Set 2024',
            opponent: 'Ivan Erslan',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria apertada contra estreante do UFC. Cutelaba dominou com maos pesadas e derrubou Erslan no segundo round.',
          },
          {
            date: 'Mar 2024',
            opponent: 'Philipe Lins',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Lins destruiu a perna dianteira de Cutelaba com chutes baixos. No terceiro round, Cutelaba mal conseguia se mover.',
          },
          {
            date: 'Abr 2023',
            opponent: 'Tanner Boser',
            result: 'W',
            method: 'TKO R1 (socos)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute devastador em pouco mais de 2 minutos. Cutelaba balancou Boser com a direita e finalizou no ground and pound.',
          },
        ],
        full_fight_history: [
          { date: 'Jun 2016', opponent: 'Misha Cirkunov', result: 'L', method: 'Sub R3', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Finalizado por triangulo de braco na estreia do UFC' },
          { date: 'Out 2016', opponent: 'Jonathan Wilson', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira vitoria no UFC por decisao unanime' },
          { date: 'Dez 2016', opponent: 'Jared Cannonier', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Derrota para futuro top ranqueado no TUF 24 Finale' },
          { date: 'Jun 2017', opponent: 'Henrique da Silva', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute relampago em 22 segundos' },
          { date: 'Jul 2018', opponent: 'Gadzhimurad Antigulov', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao por strikes no primeiro round' },
          { date: 'Abr 2019', opponent: 'Glover Teixeira', result: 'L', method: 'Sub R2', opponent_rank: '#5 LHW', quality_score: 5, quality_label: 'Excelente', note: 'Finalizado pelo futuro campeao por mata-leao' },
          { date: 'Set 2019', opponent: 'Khalil Rountree Jr.', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute rapido com strikes no primeiro round' },
          { date: 'Fev 2020', opponent: 'Magomed Ankalaev', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 4, quality_label: 'Muito Bom', note: 'Parado em 38 segundos pelo futuro desafiante ao titulo' },
          { date: 'Out 2020', opponent: 'Magomed Ankalaev', result: 'L', method: 'KO R1', opponent_rank: '#7 LHW', quality_score: 5, quality_label: 'Excelente', note: 'Segundo nocaute por Ankalaev no UFC 254' },
          { date: 'Mai 2021', opponent: 'Dustin Jacoby', result: 'D', method: 'SD (Empate)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate por decisao dividida em luta competitiva' },
          { date: 'Set 2021', opponent: 'Devin Clark', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida por decisao unanime' },
          { date: 'Nov 2022', opponent: 'Kennedy Nzechukwu', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou o primeiro round mas tomou joelhada devastadora no segundo' },
          { date: 'Abr 2023', opponent: 'Tanner Boser', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute em 2:05 apos direita no queixo' },
          { date: 'Mar 2024', opponent: 'Philipe Lins', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrotado por chutes baixos que destruiram sua perna' },
          { date: 'Set 2024', opponent: 'Ivan Erslan', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada contra estreante' },
          { date: 'Fev 2025', opponent: 'Ibo Aslan', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Submissao surpresa por triangulo de braco' },
          { date: 'Mai 2025', opponent: 'Modestas Bukauskas', result: 'L', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota controversa apesar de ampla vantagem nos golpes' },
        ],
        layoff_warning: 'Aproximadamente 10 meses de inatividade desde a ultima luta (maio 2025). Dentro do padrao normal.',
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Cutelaba vive uma montanha-russa. Venceu 3 das ultimas 5 lutas, mas uma dessas vitorias foi por decisao dividida apertada e a derrota mais recente para Bukauskas foi considerada controversa. A finalizacao de Aslan mostrou evolucao no jogo de chao, mas o padrao geral da carreira se mantem: explosivo nos primeiros minutos, vulneravel quando a luta se alonga ou quando enfrenta adversarios tecnicos.',
      },
      fighter2: {
        nome: 'Oumar Sy',
        color: 'blue',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Brendson Ribeiro',
            result: 'W',
            method: 'TKO R1 (cotoveladas e socos)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Dominou completamente com chutes, direita precisa e derrubou Ribeiro antes de finalizar com cotoveladas no chao. Publico de Paris em delirio.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Alonzo Menifield',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Primeira derrota profissional. Menifield neutralizou o alcance de Sy e venceu nos clinches e no wrestling. Sy nao conseguiu impor sua distancia.',
          },
          {
            date: 'Set 2024',
            opponent: 'Da Woon Jung',
            result: 'W',
            method: 'Decisao Unanime (30-27 x3)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Dominio total em 3 rounds. Sy controlou a distancia, usou chutes e derrubadas para vencer todos os rounds nos cartoes.',
          },
          {
            date: 'Mai 2024',
            opponent: 'Tuco Tokkos',
            result: 'W',
            method: 'Sub R1 (mata-leao, 3:43)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Estreia dominante no UFC. Sy derrubou Tokkos, tomou as costas e finalizou com mata-leao no primeiro round. Oponente aceitou a luta com 4 dias de aviso.',
          },
        ],
        full_fight_history: [
          { date: 'Mai 2024', opponent: 'Tuco Tokkos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia UFC com mata-leao no R1' },
          { date: 'Set 2024', opponent: 'Da Woon Jung', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Dominio total por 3 rounds em Paris' },
          { date: 'Jun 2025', opponent: 'Alonzo Menifield', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira derrota profissional' },
          { date: 'Set 2025', opponent: 'Brendson Ribeiro', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO dominante com cotoveladas em Paris' },
        ],
        layoff_warning: 'Aproximadamente 6 meses de inatividade desde setembro de 2025. Dentro do padrao normal.',
        momentum_score: 7,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'resilient',
        momentum_note: 'Sy mostrou maturidade ao se recuperar da primeira derrota profissional. A finalizacao dominante de Ribeiro provou que o revez contra Menifield nao abalou sua confianca. Com 3-1 no UFC e todas as vitorias sendo finalizacoes ou dominio completo, o frances esta construindo um perfil consistente. A unica duvida e sobre como ele reage quando enfrenta pressao real de um adversario agressivo.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Cutelaba',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '0W-2L',
      },
      fighter2: {
        nome: 'Sy',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '3W-1L (75%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Cutelaba e Sy nao compartilham oponentes em comum diretos no UFC. Porem, ambos operam no mesmo ecossistema do peso meio-pesado: lutadores sem ranking que servem como gatekeepers e testes para prospects. Cutelaba tem muito mais experiencia nesse nivel, com quase 20 lutas no UFC contra uma variedade de estilos. Sy ainda esta construindo seu curriculo, com apenas 4 lutas na organizacao. A diferenca fundamental e que Cutelaba ja foi testado contra a elite (Ankalaev, Teixeira, Cannonier), enquanto Sy ainda nao enfrentou ninguem desse calibre.',
    },

    // ===========================
    // Section 5: OPONENTE COMUM (null - no meaningful common opponent)
    // ===========================
    oponente_comum: null,

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.44,
          valueB: 3.67,
          maxVal: 7,
          format: 'decimal',
          note: 'Cutelaba e uma maquina de volume. Dispara golpes com intensidade rara na divisao.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 43,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
          note: 'Sy e mais seletivo e preciso. Cutelaba compensa a baixa precisao com volume bruto.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.39,
          valueB: 1.81,
          maxVal: 6,
          format: 'decimal',
          reverseWinner: true,
          note: 'Diferenca absurda. Sy absorve quase metade dos golpes que Cutelaba recebe por minuto.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 48,
          valueB: 70,
          maxVal: 100,
          format: 'percent',
          note: 'Sy defende 70% dos golpes recebidos. Cutelaba deixa passar mais da metade.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 4.17,
          valueB: 2.22,
          maxVal: 6,
          format: 'decimal',
          note: 'Cutelaba e muito mais ativo nas derrubadas, fruto de sua base no sambo e judo.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 57,
          valueB: 33,
          maxVal: 100,
          format: 'percent',
          note: 'Cutelaba conecta mais da metade das tentativas. Sy ainda precisa melhorar nesse aspecto.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 76,
          valueB: 100,
          maxVal: 100,
          format: 'percent',
          note: 'Sy nunca foi derrubado no UFC. Numero impressionante, mas amostragem ainda e pequena (4 lutas).',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '32 anos',
          fighter2: '30 anos',
          note: null,
        },
        {
          label: 'Altura',
          fighter1: '1.85m (6\'1")',
          fighter2: '1.93m (6\'4")',
          note: 'Sy tem 8 cm de vantagem na altura',
        },
        {
          label: 'Envergadura',
          fighter1: '191cm (75")',
          fighter2: '211cm (83")',
          note: 'Sy tem 20cm (8 polegadas) de vantagem no alcance. Diferenca enorme.',
        },
        {
          label: 'Stance',
          fighter1: 'Canhoto (Southpaw)',
          fighter2: 'Ortodoxa',
          note: 'Cutelaba luta com a esquerda. Cria angulos diferentes para ambos.',
        },
        {
          label: 'Academia',
          fighter1: 'Xtreme Couture, Las Vegas',
          fighter2: 'Bulgarian Top Team',
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
          valueA: 60,
          valueB: 72,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Sy e mais tecnico e preciso no striking, com melhor gestao de distancia. Cutelaba tem mais poder bruto, mas e desorganizado.',
        },
        {
          label: 'Wrestling / Derrubadas',
          valueA: 78,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Cutelaba tem background em sambo e judo com 4.17 derrubadas por 15 min. E seu caminho mais claro para a vitoria.',
        },
        {
          label: 'Controle no Chao',
          valueA: 65,
          valueB: 68,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'even',
          advantage_note: 'Ambos sao eficientes no chao. Cutelaba usa ground and pound pesado. Sy busca posicoes dominantes e mata-leao com body triangle.',
        },
        {
          label: 'Cardio / Gas',
          valueA: 40,
          valueB: 68,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Cutelaba historicamente perde gas apos o primeiro round. Sy mostrou boa resistencia em lutas de 3 rounds.',
        },
        {
          label: 'Defesa',
          valueA: 42,
          valueB: 75,
          labelA: 'Medio',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Sy defende 70% dos strikes e 100% dos takedowns no UFC. Cutelaba absorve demais (3.39 SApM) e defende apenas 48%.',
        },
        {
          label: 'Poder de Finalizacao',
          valueA: 80,
          valueB: 70,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Cutelaba tem 13 nocautes e 3 submissoes em 19 vitorias (84% de finalizacao). Sua capacidade de encerrar lutas cedo e superior.',
        },
      ],
      insight: 'Esse confronto apresenta um contraste classico: a explosividade e agressividade de Cutelaba contra a tecnica e o controle de Sy. Cutelaba vence em wrestling ofensivo e poder de finalizacao, mas perde significativamente em defesa, cardio e gestao de distancia. Se Sy conseguir manter a luta na sua distancia e sobreviver a tempestade inicial, as vantagens tecnicas e fisicas dele tendem a aparecer conforme a luta avanca.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
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
      insight: 'Cutelaba e um finalizador nato: 84% das suas vitorias terminam antes da decisao dos juizes, com destaque para os 13 nocautes que representam quase 70% do seu total. Sy tem um perfil mais equilibrado, com capacidade de finalizar tanto em pe (5 KO/TKO) quanto no chao (4 submissoes). A diferenca crucial e que Cutelaba depende muito mais da finalizacao precoce, ja que seu cartel de 3 decisoes em 19 vitorias mostra que ele nao e um lutador de decisao. Sy, por outro lado, ja provou que pode vencer 3 rounds com autoridade quando necessario.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM CUTELABA',
          color: 'red',
          title: 'O Assalto do Hulk',
          description: 'O primeiro round e o territorio de Cutelaba. Ele investe com tudo nos primeiros minutos, disparando socos pesados e buscando derrubadas com a urgencia de quem sabe que seu gas tem prazo de validade. Historicamente, a maioria dos seus nocautes acontecem no R1. Sy precisa sobreviver essa tempestade sem se deixar prender contra a grade ou ser derrubado. Se Cutelaba conseguir uma derrubada cedo, pode ser perigoso com ground and pound.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Decisivo',
          description: 'Se a luta chega ao segundo round sem finalizacao, a dinamica muda. Cutelaba ja demonstrou vulnerabilidade nesse momento, como na derrota para Nzechukwu, quando dominou o R1 mas foi nocauteado no R2 por uma joelhada. Sy pode comecar a impor seu jogo de distancia e usar seu alcance de 211cm com mais eficiencia. Este e o round onde a luta pode virar completamente.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM SY',
          color: 'green',
          title: 'O Desgaste Cobra Seu Preco',
          description: 'Se a luta vai para o terceiro round, Sy e o grande favorito. O cardio de Cutelaba historicamente decai de forma significativa a partir do segundo round. Sy, com melhor condicionamento e mais jovem, pode usar o alcance e a movimentacao para acumular pontos ou buscar uma finalizacao tardia contra um Cutelaba exausto. A derrota para Lins no UFC 299, onde Cutelaba mal se movia no R3, e o exemplo perfeito.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        {
          icon: 'Activity',
          title: 'Cardio Limitado de Cutelaba',
          fighter: 'Cutelaba',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'O maior calcanhar de Aquiles de Cutelaba e o gas. Em lutas que vao alem do primeiro round, seu rendimento cai drasticamente. Contra Lins, mal conseguia andar no terceiro round por causa dos chutes baixos acumulados. Contra Nzechukwu, dominou o R1 mas foi finalizado no R2. Se Sy sobreviver a explosao inicial, o condicionamento se torna um fator critico.',
        },
        {
          icon: 'Zap',
          title: 'Poder de Finalizacao Precoce',
          fighter: 'Cutelaba',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Cutelaba tem 13 nocautes na carreira e uma capacidade real de encerrar lutas nos primeiros minutos. Contra Boser, bastaram 2:05. Contra Henrique da Silva, 22 segundos. Contra Aslan, finalizou por submissao em 2:51. Qualquer descuido de Sy no primeiro round pode custar a luta.',
        },
        {
          icon: 'Shield',
          title: 'Defesa de Takedown Perfeita',
          fighter: 'Sy',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Sy tem 100% de defesa de takedown no UFC, um numero impressionante considerando que Cutelaba media 4.17 derrubadas por 15 minutos. Se Sy conseguir manter essa defesa, ele neutraliza o caminho principal de Cutelaba para a vitoria. Porem, a amostra e pequena (4 lutas) e ele ainda nao enfrentou um wrestler tao insistente quanto Cutelaba.',
        },
        {
          icon: 'Target',
          title: 'Vulnerabilidade a Chutes Baixos',
          fighter: 'Cutelaba',
          risk_level: 'RISCO MEDIO',
          risk_color: 'yellow',
          description: 'A derrota para Philipe Lins no UFC 299 expoe uma fraqueza clara: Cutelaba luta com stance canhota e sua perna dianteira (direita) e um alvo facil para chutes baixos. Lins destruiu essa perna em 3 rounds. Se Sy adotar essa estrategia com seus chutes longos, pode limitar drasticamente a mobilidade e o poder de explosao de Cutelaba.',
        },
        {
          icon: 'Brain',
          title: 'Experiencia no Meta APEX',
          fighter: 'Cutelaba',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Cutelaba ja lutou multiplas vezes no Meta APEX e conhece bem o ambiente. Para Sy, que construiu grande parte da sua carreira no UFC em Paris com o publico a seu favor, lutar sem a energia da torcida francesa pode ser um fator psicologico. No entanto, Sy ja lutou fora da Franca antes do UFC.',
        },
        {
          icon: 'TrendingUp',
          title: 'Alcance Fisico Dominante',
          fighter: 'Sy',
          risk_level: 'ENORME POSITIVO',
          risk_color: 'green',
          description: 'Sy tem 8 cm de altura e 20 cm de envergadura a mais que Cutelaba. Essa diferenca e monumental no MMA. Sy pode manter Cutelaba na ponta dos seus golpes, usar jabs e chutes de longa distancia sem correr risco. Para Cutelaba entrar na distancia de nocaute, ele vai precisar absorver golpes no caminho.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Primeira Derrota e Fator Mental',
          fighter: 'Sy',
          risk_level: 'RISCO BAIXO',
          risk_color: 'yellow',
          description: 'Sy sofreu sua primeira derrota profissional em junho de 2025 contra Menifield. A maneira como ele reagiu, com uma finalizacao dominante de Ribeiro 3 meses depois, sugere maturidade. Mas a derrota revelou que quando Sy nao consegue impor sua distancia e e pressionado no clinch, ele pode ser neutralizado.',
        },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Cutelaba',
        total_probability: 35,
        scenarios: [
          {
            name: 'Blitz do Hulk',
            probability: 18,
            method: 'KO/TKO R1',
            description: 'Cutelaba avanca com tudo no primeiro round, fecha a distancia rapidamente e conecta uma mao pesada que machuca Sy. Derruba e finaliza com ground and pound contra a grade. E o cenario onde a experiencia e a agressividade superam o tamanho e a tecnica. Historicamente, Cutelaba e mais perigoso quando consegue transformar a luta numa briga de rua.',
          },
          {
            name: 'Sambo Control',
            probability: 10,
            method: 'Decisao ou Sub',
            description: 'Cutelaba usa seu background em sambo para grudar em Sy, pressionar contra a grade e acumular derrubadas ao longo de 3 rounds. Similar ao que fez contra Erslan e Clark, usando a pressao constante para vencer nos pontos. Cenario improvavel dado o tamanho de Sy e sua defesa de takedown, mas possivel se Cutelaba encontrar o timing certo.',
          },
          {
            name: 'O Efeito Menifield',
            probability: 7,
            method: 'Decisao Dividida',
            description: 'Cutelaba replica o plano de Menifield: pressiona Sy no clinch, usa a grade para neutralizar o alcance e vence rounds apertados onde os juizes valorizam a agressividade e o controle. E o caminho mais dificil, pois exige que Cutelaba mantenha o ritmo por 3 rounds, algo que historicamente ele nao faz bem.',
          },
        ],
      },
      fighter2: {
        nome: 'Sy',
        total_probability: 62,
        scenarios: [
          {
            name: 'Desmonte Tecnico',
            probability: 28,
            method: 'TKO R2-R3',
            description: 'Sy sobrevive a tempestade do primeiro round usando movimentacao lateral e jabs longos. No segundo round, comeca a acertar combinacoes mais pesadas contra um Cutelaba que ja perdeu parte do gas. No R2 ou R3, uma sequencia de golpes contra a grade ou apos uma queda forca o arbitro a parar. E o cenario mais provavel: o atletismo e a paciencia de Sy superam a explosividade temporaria de Cutelaba.',
          },
          {
            name: 'Chutes Baixos e Dominio',
            probability: 18,
            method: 'Decisao Unanime',
            description: 'Sy adota a mesma estrategia de Lins: ataca a perna dianteira de Cutelaba com chutes longos e pesados, limitando sua mobilidade. Sy controla a distancia por 3 rounds, acumula pontos com jabs e chutes, e vence por decisao unanime sem nunca deixar Cutelaba entrar na distancia de nocaute.',
          },
          {
            name: 'Takedown e Finalizacao',
            probability: 10,
            method: 'Sub R1-R2',
            description: 'Sy encontra uma abertura para derrubar Cutelaba (ou aproveita uma troca no chao), toma as costas e aplica o mata-leao com body triangle, como fez contra Tokkos. Os longos bracos e pernas de Sy sao ferramentas perigosas no grappling, e Cutelaba ja foi finalizado por triangulo de braco e mata-leao na carreira.',
          },
          {
            name: 'Counter Punch Devastador',
            probability: 6,
            method: 'KO R1',
            description: 'Cutelaba avanca descontrolado e Sy o recebe com um golpe certeiro no contra-ataque. Sy tem 5 nocautes na carreira e poder real. Com a diferenca de envergadura, Sy pode conectar uma direita ou um chute alto no momento em que Cutelaba entra de cabeca baixa.',
          },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Oumar Sy',
      winner_side: 'fighter2',
      predicted_method: 'TKO R2 ou Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Sy e favorito por boas razoes. A combinacao de alcance superior (20cm de vantagem na envergadura), melhor defesa (70% de strikes, 100% de takedowns), melhor condicionamento e juventude cria um perfil estatistico forte contra um lutador como Cutelaba, que depende de finalizacoes precoces e perde eficiencia rapidamente. O blueprint para vencer Cutelaba ja existe: chutes baixos na perna dianteira (Lins), paciencia e clinch (Menifield), ou simplesmente sobreviver o R1 e capitalizar no desgaste (Nzechukwu). Sy tem as ferramentas para executar qualquer um desses planos. A confianca e media porque Cutelaba sempre carrega perigo de nocaute no primeiro round e, numa luta de 3 rounds, esse risco nunca desaparece completamente.',
      x_factor: {
        title: 'A Defesa de Takedown de Sy Contra o Wrestling de Cutelaba',
        description: 'O numero mais importante dessa luta e o 100% de defesa de takedown de Sy contra as 4.17 tentativas por 15 minutos de Cutelaba. Se esse numero se manter, Cutelaba perde seu melhor caminho para a vitoria. Se Cutelaba conseguir quebrar essa defesa e levar a luta para o chao, tudo muda. E o dado que pode definir o resultado.',
      },
      upset_alert: {
        title: 'Upset Alert: Cutelaba por KO no R1',
        description: 'Nunca subestime o poder de Cutelaba nos primeiros minutos. Ele ja nocauteou gente em 22 segundos. Se Sy entrar desrespeitando o poder de fogo do moldavo, ou se ficar preso contra a grade cedo, uma explosao de ground and pound pode encerrar a luta antes que as vantagens tecnicas e fisicas de Sy entrem em jogo. O preco de +170 em Cutelaba reflete esse perigo real.',
      },
      probabilities: {
        fighter1: { nome: 'Cutelaba', percent: 35 },
        fighter2: { nome: 'Sy', percent: 62 },
        draw: 3,
      },
      value_picks: {
        moneyline: {
          pick: 'Sy por -200',
          reasoning: 'O preco e justo considerando as vantagens fisicas e estatisticas de Sy. Nao ha grande valor na moneyline, mas Sy e a escolha correta.',
        },
        method: {
          pick: 'Sy por TKO/KO',
          reasoning: 'Sy tem poder de finalizacao e Cutelaba absorve muitos golpes (3.39 SApM com apenas 48% de defesa). A combinacao de desgaste e golpes limpos tende a gerar uma parada no R2 ou R3.',
        },
        over_under: {
          pick: 'Over 1.5 Rounds',
          rounds: 1.5,
          reasoning: 'Apesar de ambos terem poder de finalizacao, Sy e disciplinado o suficiente para nao se arriscar cedo. A probabilidade de a luta sobreviver o primeiro round e alta.',
        },
        best_value: 'Melhor aposta de valor: Sy vencer dentro da distancia (TKO/KO ou Sub) paga melhor que moneyline pura e tem probabilidade similar.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Os Primeiros 2 Minutos',
          icon: 'Clock',
          description: 'Cutelaba e mais perigoso no inicio da luta. Observe se ele consegue fechar a distancia rapidamente e pressionar Sy contra a grade. Se Sy sobreviver os 2 primeiros minutos mantendo a distancia, a tendencia e que a luta comece a pender para o frances. E o momento mais critico do confronto.',
        },
        {
          num: 2,
          title: 'Defesa de Takedown de Sy',
          icon: 'Shield',
          description: 'Sy nunca foi derrubado no UFC, mas Cutelaba e o wrestler mais insistente que ele ja enfrentou (4.17 TD/15min). Se Cutelaba conseguir plantar Sy no chao, a luta muda completamente. Se Sy mantiver a defesa perfeita, Cutelaba vai ficando sem opcoes conforme o gas acaba.',
        },
        {
          num: 3,
          title: 'Chutes Baixos na Perna Dianteira',
          icon: 'Target',
          description: 'Cutelaba luta como canhoto e sua perna dianteira direita e vulneravel. Lins explorou isso no UFC 299 e praticamente tirou a mobilidade de Cutelaba. Observe se Sy usa seus chutes longos para atacar essa perna. Se sim, a capacidade de explosao e derrubada de Cutelaba diminui drasticamente.',
        },
        {
          num: 4,
          title: 'O Gas de Cutelaba no R2',
          icon: 'Activity',
          description: 'A queda de rendimento de Cutelaba no segundo round e historica. Contra Nzechukwu, foi nocauteado no R2 depois de dominar o R1. Observe o ritmo da respiracao e a velocidade dos golpes no comeco do segundo round. Se Cutelaba ja estiver visivelmente cansado, Sy pode acelerar para buscar a finalizacao.',
        },
        {
          num: 5,
          title: 'Sy no Contra-ataque',
          icon: 'Zap',
          description: 'Sy e descrito como um striker controlado que gerencia distancia. Quando Cutelaba avanca de cabeca baixa, observe os contra-ataques de Sy: direitas, uppercuts e chutes altos podem pegar Cutelaba entrando. Com 8 polegadas de vantagem no alcance, Sy pode conectar antes de Cutelaba chegar perto.',
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
          title: 'CUTELABA vs SY',
          content: 'UFC Fight Night: Emmett vs Vallejos\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Meio-Pesado\n3 Rounds',
          color: 'red',
        },
        {
          slide_number: 2,
          title: 'ION CUTELABA',
          content: '19-11-1 (1 NC)\n"The Hulk"\n\n13 nocautes na carreira (68%)\n4.44 golpes significativos/min\n4.17 derrubadas por 15 min\n\nBase: Sambo, Judo\nAcademia: Xtreme Couture',
          color: 'red',
        },
        {
          slide_number: 3,
          title: 'OUMAR SY',
          content: '12-1-0\nParis, Franca\n\n100% defesa de takedown no UFC\n70% defesa de strikes\n1.81 golpes absorvidos/min\n\n8cm mais alto\n20cm mais alcance\nAcademia: Bulgarian Top Team',
          color: 'blue',
        },
        {
          slide_number: 4,
          title: 'CHAVE DA LUTA',
          content: 'Cutelaba precisa finalizar cedo.\nSy precisa sobreviver o R1.\n\nCutelaba absorve 3.39 golpes/min\nSy absorve apenas 1.81/min\n\nSe chegar ao R3, vantagem ENORME\npara Sy pelo cardio e alcance.',
          color: 'gold',
        },
        {
          slide_number: 5,
          title: 'PREVISAO',
          content: 'Sy por TKO R2 ou Decisao\nConfianca: MEDIA\n\nSy: 62% | Cutelaba: 35%\n\nMas NUNCA subestime o Hulk\nnos primeiros minutos!',
          color: 'gold',
        },
      ],
      twitter: [
        {
          num: '1/5',
          text: 'Ion Cutelaba vs Oumar Sy no UFC Fight Night sabado. A luta que resume o peso meio-pesado: veterano explosivo vs prospect tecnico. Vamos destrinchar.',
        },
        {
          num: '2/5',
          text: 'Cutelaba tem 4.44 sig. strikes/min e 4.17 derrubadas/15min. E uma tempestade ambulante. MAS absorve 3.39 golpes/min com apenas 48% de defesa. E o classico "vive pela espada, morre pela espada."',
        },
        {
          num: '3/5',
          text: 'Sy tem 100% de defesa de takedown no UFC. ZERO derrubadas sofridas. 70% de defesa de strikes. 1.81 absorvidos/min. E o oposto total de Cutelaba: calculado, paciente, letal quando encontra abertura.',
        },
        {
          num: '4/5',
          text: 'A vantagem fisica de Sy e absurda: 8cm mais alto, 20cm (8 pol) mais alcance. Para Cutelaba entrar na distancia, vai precisar absorver golpes. E com 48% de defesa, cada golpe conta.',
        },
        {
          num: '5/5',
          text: 'Previsao: Sy por TKO tardio ou decisao. MAS os primeiros 2 minutos sao territorio do Hulk. Se Sy sobreviver a tempestade, as ferramentas tecnicas e fisicas fazem o trabalho. Sy -200 e preco justo.',
        },
      ],
      video: [
        {
          time: '0-10s',
          title: 'Hook',
          text: '"Cutelaba tem 13 nocautes e nunca deu uma luta chata. Sy nunca foi derrubado no UFC. Algo vai ter que ceder no sabado."',
        },
        {
          time: '10-25s',
          title: 'O Confronto',
          text: '"Cutelaba dispara 4.44 golpes por minuto, o cara e uma metralhadora. Mas absorve 3.39 e defende so 48%. Sy e o oposto: preciso, com 70% de defesa e 20cm a mais de alcance. O moldavo precisa fechar essa distancia ou vai virar saco de pancada."',
        },
        {
          time: '25-40s',
          title: 'A Dinamica',
          text: '"O jogo e simples: se Cutelaba nao resolver no R1, ele esta em apuros. O gas dele acaba, Sy comeca a conectar de longe, e a gente ja viu esse filme antes. Lins fez isso. Nzechukwu fez isso. O blueprint existe."',
        },
        {
          time: '40-50s',
          title: 'Red Flags',
          text: '"Porem: Sy perdeu para Menifield quando foi pressionado no clinch. E Cutelaba e muito mais perigoso que Menifield no primeiro round. Se Sy entrar relaxado demais, pode acordar no chao olhando pro teto."',
        },
        {
          time: '50-60s',
          title: 'Previsao + CTA',
          text: '"Minha previsao: Sy por TKO no segundo ou terceiro round. Mas se voce curte upset, Cutelaba por KO no R1 a +170 nao e loucura. Comenta ai quem voce acha que leva. Se inscreve pro card completo."',
        },
      ],
      tiktok: [
        {
          hook: 'O cara que NUNCA foi derrubado no UFC vai enfrentar o wrestler mais insistente da divisao.',
          body: 'Sy tem 100% de defesa de takedown. Cutelaba tenta 4 derrubadas por luta. Se Sy mantiver esse numero, Cutelaba fica sem opcoes. Se quebrar, a luta vira uma guerra no chao. Esse e o X-factor.',
          cta: 'Quem cede primeiro? Comenta: defesa perfeita ou Hulk smash?',
        },
        {
          hook: 'Cutelaba absorve QUASE O DOBRO de golpes que Sy por minuto. 3.39 contra 1.81.',
          body: 'E Sy ainda tem 20cm a mais de alcance. Imagina ser um cara que leva muita pancada tentando chegar perto de alguem que bate de longe. Essa e a vida de Cutelaba sabado.',
          cta: 'Alcance importa ou poder nocauteia? Diz ai nos comentarios.',
        },
        {
          hook: 'A derrota mais controversa de 2025 foi Cutelaba vs Bukauskas. Ele acertou 94 golpes A MAIS e perdeu.',
          body: 'Cutelaba vive nessa montanha-russa. Finaliza Aslan por submissao, perde decisao roubada, agora enfrenta um prospect de 12-1. O cara nunca entrega luta chata, mas tambem nunca te da certeza.',
          cta: 'Voce apostaria no Hulk? Responde sim ou nao.',
        },
      ],
      headlines: [
        'Cutelaba vs Sy: O Hulk Moldavo Consegue Sobreviver ao Alcance Frances?',
        '100% de Defesa de Takedown vs 4.17 Derrubadas por Luta: Algo Vai Ceder',
        'Cutelaba Busca Relevancia Contra o Prospect que Nunca Foi Derrubado',
        'Explosao vs Precisao: O Confronto que Define o Meio-Pesado em 2026',
        'Sy Favorito a -200, Mas o Hulk Sempre Carrega Perigo de KO',
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
        fighter1_odds: '+170',
        fighter2_odds: '-200',
        fighter1_name: 'Cutelaba',
        fighter2_name: 'Sy',
        source: 'Odds de abertura via OddsShark e MMAOddsBreaker (marco 2026)',
      },
      edges: [
        {
          icon: 'Activity',
          titulo: 'Desgaste Fisico Previsivel',
          stat_headline: 'CUTELABA ABSORVE 3.39 SIG. STRIKES/MIN COM APENAS 48% DE DEFESA',
          contexto: 'Cutelaba e um dos lutadores que mais absorve golpes na divisao dos meio-pesados. Com 48% de defesa de strikes, mais da metade dos golpes direcionados a ele conectam. Contra um striker preciso como Sy (50% de precisao), isso significa dano acumulado significativo, especialmente se a luta se alongar.',
          implicacao_aposta: 'A probabilidade de finalizacao por strikes (TKO) para Sy aumenta significativamente se a luta sobreviver o primeiro round. Apostas em "Sy por TKO/KO" e "Over 1.5 rounds" combinam bem.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Shield',
          titulo: 'Defesa de Takedown Historica',
          stat_headline: 'SY TEM 100% DE DEFESA DE TAKEDOWN NO UFC (4 LUTAS)',
          contexto: 'Apesar da amostra pequena (4 lutas), Sy nunca foi derrubado no UFC. Cutelaba tenta 4.17 derrubadas por 15 minutos com 57% de sucesso. Se a defesa de Sy se mantiver, o melhor caminho de Cutelaba para a vitoria fica bloqueado.',
          implicacao_aposta: 'Se Sy manter o 100% de defesa, a luta fica predominantemente em pe, onde o alcance de Sy domina. Isso favorece apostas em Sy por decisao ou TKO tardio.',
          edge_level: 'moderado',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Zap',
          titulo: 'Poder de Nocaute no R1',
          stat_headline: '13 DOS 19 VITORIAS DE CUTELABA SAO POR KO/TKO (68%)',
          contexto: 'Cutelaba e um finalizador genuino com 68% de taxa de nocaute. A maioria dos seus nocautes acontecem no primeiro round. Contra Boser, 2:05. Contra Henrique da Silva, 22 segundos. Mesmo aos 32 anos, o poder de fogo esta intacto.',
          implicacao_aposta: 'O valor de Cutelaba esta concentrado no primeiro round. "Cutelaba por KO/TKO R1" pode oferecer odds atrativas para quem busca risco/retorno.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'TrendingUp',
          titulo: 'Vantagem Fisica Desproporcional',
          stat_headline: 'SY TEM 8CM DE ALTURA E 20CM DE ENVERGADURA A MAIS QUE CUTELABA',
          contexto: 'A diferenca de alcance de 20cm (8 polegadas) e uma das maiores em lutas recentes do peso meio-pesado. Sy pode bater de uma distancia onde Cutelaba nao alcanca. Essa vantagem se amplifica conforme a luta avanca e Cutelaba perde gas.',
          implicacao_aposta: 'Em lutas com grande disparidade de alcance, o lutador mais longo tende a dominar os rounds tardios. Isso reforca apostas em "Over 1.5" e "Sy por decisao ou TKO tardio".',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Clock',
          titulo: 'Padrao de Colapso no R2',
          stat_headline: 'CUTELABA FOI FINALIZADO NO R2 POR NZECHUKWU APOS DOMINAR O R1',
          contexto: 'O padrao de Cutelaba e claro: dominante no R1, vulneravel a partir do R2. Contra Nzechukwu, controlou completamente o primeiro round, mas uma joelhada no segundo o nocauteou. Contra Lins, mal se movia no terceiro round. Esse padrao e consistente em toda a carreira.',
          implicacao_aposta: 'Apostas em "Sy vencer no R2 ou R3" ou "luta nao terminar no R1" capturam esse padrao historico de desgaste.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
      ],
      value_picks: [
        {
          tipo: 'Over/Under',
          pick: 'Over 1.5 Rounds',
          odds: '-160 (estimado)',
          confianca: 'alta',
          edge_vs_mercado: 'Sy e disciplinado o suficiente para nao se arriscar no R1. A probabilidade de sobreviver a tempestade inicial e alta.',
          raciocinio: 'Apesar do poder de Cutelaba, Sy tem 70% de defesa de strikes, 100% de defesa de takedown e um estilo cauteloso baseado em distancia. A tendencia e que Sy gerencie o primeiro round sem se envolver em trocas selvagens. Das 4 lutas de Sy no UFC, apenas 2 terminaram no primeiro round, e ambas foram por iniciativa dele, nao do oponente.',
        },
        {
          tipo: 'Metodo',
          pick: 'Sy por TKO/KO',
          odds: '+120 (estimado)',
          confianca: 'media',
          edge_vs_mercado: 'Cutelaba absorve demais e perde gas. A probabilidade de parada por strikes e maior que o mercado sugere.',
          raciocinio: 'Com 3.39 golpes absorvidos por minuto e defesa de 48%, Cutelaba e um alvo progressivamente mais facil conforme a luta avanca. Sy tem 5 KO/TKO na carreira e poder para machucar. O cenario mais provavel e uma parada por strikes no R2 ou R3 quando Cutelaba ja estiver desgastado.',
        },
        {
          tipo: 'Moneyline',
          pick: 'Sy Moneyline (-200)',
          odds: '-200',
          confianca: 'media',
          edge_vs_mercado: 'Preco justo, mas sem grande valor. Sy e favorito correto.',
          raciocinio: 'As vantagens de Sy (alcance, defesa, cardio, juventude) sao reais e significativas. A -200, voce precisa de 67% de probabilidade para breakeven, e a probabilidade estimada de Sy e de aproximadamente 62%, o que torna a aposta marginalmente cara. Mais valor nos metodos especificos.',
        },
        {
          tipo: 'Prop',
          pick: 'Cutelaba por KO/TKO R1',
          odds: '+450 (estimado)',
          confianca: 'baixa',
          edge_vs_mercado: 'O perigo de Cutelaba no R1 e real. A +450, uma pequena aposta cobre o cenario de upset.',
          raciocinio: 'Se voce acredita que Cutelaba pode surpreender, o valor esta concentrado no primeiro round. Ele tem 13 nocautes na carreira e uma capacidade real de encerrar lutas nos primeiros minutos. A +450, voce so precisa de 18% de probabilidade para ter valor, e estimamos essa probabilidade em torno de 18%. E uma aposta de alto risco, mas matematicamente justa.',
        },
      ],
      armadilha: {
        titulo: 'Armadilha: Sy por Decisao a Preco Baixo',
        descricao: 'A tentacao e apostar que Sy vence por decisao, ja que ele tem 3 vitorias por pontos. Mas Cutelaba quase nunca vai a decisao em lutas que perde: das suas 11 derrotas, 7 foram por finalizacao (KO, TKO ou sub). Se Sy estiver dominando, e mais provavel que consiga uma parada tardia do que uma decisao limpa. Cutelaba tambem absorve muitos golpes, o que aumenta a chance de parada medica ou do arbitro intervir. O melhor valor esta em "Sy por finalizacao (KO/TKO)" ao inves de "Sy por decisao".',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
