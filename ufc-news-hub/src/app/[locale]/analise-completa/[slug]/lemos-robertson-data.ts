import type { FullSingleAnalise } from '@/types/analise';

export const lemosRobertsonAnalise: FullSingleAnalise = {
  id: 'lemos-robertson-ufn-mar-14',
  evento_id: null,
  slug: 'lemos-robertson-ufn-mar-14',
  titulo: 'Lemos vs Robertson: Poder Contra Persistencia',
  subtitulo: 'A striker brasileira contra a rainha das finalizacoes no palha feminino',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'Decisao Unanime', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Amanda Lemos', record: '15-5-1', ultimasLutas: [] },
  fighter2_info: { nome: 'Gillian Robertson', record: '16-8-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Palha Feminino',
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
      categoria_peso: 'Peso Palha Feminino (115 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'PODER CONTRA PERSISTENCIA',
      tagline_sub: 'A nocauteadora brasileira enfrenta a rainha das finalizacoes em momento critico de ambas as carreiras.',
      fighter1: {
        nome_completo: 'Amanda "Amandinha" Lemos',
        apelido: 'Amandinha',
        sobrenome: 'Lemos',
        record: '15-5-1',
        ranking: '#5 WSW',
        info_extra: 'Belem, Brasil | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Gillian "The Savage" Robertson',
        apelido: 'The Savage',
        sobrenome: 'Robertson',
        record: '16-8-0',
        ranking: '#8 WSW',
        info_extra: 'Canada | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Dois Caminhos Opostos Se Cruzam</h3>
        <p><strong class="text-ufc-red">Amanda Lemos</strong> esta em um momento delicado. Aos 38 anos, a brasileira de Belem perdeu tres das suas ultimas cinco lutas, incluindo uma derrota por decisao unanime para Tatiana Suarez em setembro de 2025 e uma finalizacao dolorosa contra Virna Jandiroba em julho de 2024. Para piorar, sua luta agendada para dezembro de 2025 foi cancelada no dia do evento por causa de uma herpes labial. A inatividade e as derrotas recentes colocam a veterana em posicao de urgencia: perder agora pode significar o inicio do fim do seu tempo no ranking.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Ascensao Silenciosa</h3>
        <p><strong class="text-blue-400">Gillian Robertson</strong> esta vivendo o melhor momento da sua carreira. Cinco vitorias consecutivas, incluindo um TKO sobre Marina Rodriguez que surpreendeu todo mundo. A canadense de 30 anos, conhecida por ser a mulher com mais finalizacoes na historia do UFC (9 submissoes), recentemente adicionou poder de nocaute ao seu arsenal. Aos 30 anos, ela esta na idade perfeita para um pico de carreira, oito anos mais jovem que sua oponente.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Encruzilhada do Meta APEX</h3>
        <p>Essa luta e sobre direcoes opostas. <strong class="text-ufc-red">Lemos</strong> precisa provar que ainda pertence ao topo, que o poder da sua mao esquerda canhota ainda e uma arma letal. <strong class="text-blue-400">Robertson</strong> quer confirmar que a evolucao e real, que nao e mais apenas uma lutadora de chao, e que merece uma luta contra uma oponente top 5. O Meta APEX, com seu octogono menor, favorece o grappling de Robertson, mas tambem pode colocar Lemos na distancia perfeita para o nocaute.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#5 Peso Palha (defendendo posicao)', fighter2: '#8 Peso Palha (subindo)' },
        { dimensao: 'Objetivo', fighter1: 'Interromper sequencia negativa', fighter2: 'Sexta vitoria consecutiva' },
        { dimensao: 'Narrativa', fighter1: 'Veterana tentando se manter relevante', fighter2: 'Evolucao e ascensao ao topo' },
        { dimensao: 'Risco', fighter1: 'Terceira derrota em seis lutas pode tirar do ranking', fighter2: 'Derrota quebra todo o momentum' },
        { dimensao: 'Recompensa', fighter1: 'Vitoria sobre #8 consolida posicao no top 5', fighter2: 'Entrada no top 5 e possivel luta pelo titulo' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A AMANDINHA PROVA QUE AINDA E PERIGOSA',
          subtitulo: 'O poder canhoto de Lemos silencia os criticos e mantem a brasileira no topo.',
          consequencias: [
            { tag: 'RANKING', texto: 'Consolida posicao no top 5 do peso palha e afasta o fantasma da queda.' },
            { tag: 'RELEVANCIA', texto: 'Vitoria contundente sobre uma oponente em ascensao renova o interesse em lutas maiores.' },
            { tag: 'PROXIMA LUTA', texto: 'Possivel luta contra uma oponente top 3 como Yan Xiaonan ou Rose Namajunas.' },
          ],
          proxima_luta: 'Oponente top 3 do peso palha',
        },
        fighter2_vence: {
          titulo: 'ROBERTSON CONFIRMA A EVOLUCAO',
          subtitulo: 'The Savage entra no top 5 e se torna candidata legitima ao titulo.',
          consequencias: [
            { tag: 'RANKING', texto: 'Salta para o top 5 do peso palha com seis vitorias consecutivas.' },
            { tag: 'LEGADO', texto: 'Maior sequencia de vitorias da carreira contra uma oponente top 5.' },
            { tag: 'TITULO', texto: 'Entra na conversa para uma luta de titulo ou eliminatoria direta.' },
            { tag: 'EVOLUCAO', texto: 'Prova que nao e mais apenas uma lutadora de chao, mas uma atleta completa.' },
          ],
          proxima_luta: 'Luta eliminatoria pelo titulo ou oponente top 3',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Amanda Lemos',
        color: 'red',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Tatiana Suarez', result: 'L', method: 'Decisao Unanime', opponent_rank: '#4 WSW', quality_score: 4, quality_label: 'Muito Bom', note: 'Suarez dominou com wrestling e controle. Lemos nao conseguiu manter a luta em pe.' },
          { date: 'Mar 2025', opponent: 'Iasmin Lucindo', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao contra oponente sem ranking. Performance segura mas sem brilho.' },
          { date: 'Jul 2024', opponent: 'Virna Jandiroba', result: 'L', method: 'Sub R2', opponent_rank: '#6 WSW', quality_score: 3, quality_label: 'Bom', note: 'Finalizada por submissao no segundo round. Vulnerabilidade no chao exposta novamente.' },
          { date: 'Fev 2024', opponent: 'Mackenzie Dern', result: 'W', method: 'Decisao Unanime', opponent_rank: '#10 WSW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida mantendo a luta em pe. Mostrou disciplina anti-grappling contra Dern.' },
          { date: 'Ago 2023', opponent: 'Zhang Weili', result: 'L', method: 'Decisao Unanime', opponent_rank: 'Campea WSW', quality_score: 5, quality_label: 'Excelente', note: 'Luta pelo titulo. Zhang dominou mas Lemos foi competitiva nos primeiros rounds.' },
        ],
        layoff_warning: 'Luta de dezembro 2025 cancelada no dia do evento por herpes labial. Seis meses sem competir.',
        momentum_score: 4,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'descending',
        momentum_note: 'Lemos esta em uma trajetoria preocupante. Perdeu tres das ultimas cinco lutas, incluindo derrotas para Suarez (wrestling), Jandiroba (submissao) e Zhang (titulo). Sua unica vitoria significativa recente foi sobre Dern, e a vitoria sobre Lucindo nao impressionou. A luta cancelada em dezembro adiciona mais incerteza. Aos 38 anos, a janela esta se fechando.',
      },
      fighter2: {
        nome: 'Gillian Robertson',
        color: 'blue',
        recent_fights: [
          { date: 'Mai 2025', opponent: 'Marina Rodriguez', result: 'W', method: 'TKO R2', opponent_rank: '#7 WSW', quality_score: 3, quality_label: 'Bom', note: 'TKO surpresa contra Rodriguez. Mostrou poder de finalizacao nos strikes que nao tinha antes.' },
          { date: 'Nov 2024', opponent: 'Bruna Pinheiro', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria dominante por decisao com controle de grappling.' },
          { date: 'Jun 2024', opponent: 'Michelle Waterson', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida sobre a veterana Waterson. Controle no chao e takedowns.' },
          { date: 'Jan 2024', opponent: 'Polyana Viana', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Outro TKO que mostrou a evolucao do striking. Finalizou no segundo round.' },
          { date: 'Jun 2023', opponent: 'Lupita Godinez', result: 'L', method: 'Decisao Unanime', opponent_rank: '#15 WSW', quality_score: 2, quality_label: 'Medio', note: 'Ultima derrota. Perdeu por decisao em luta equilibrada.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Robertson esta no melhor momento da sua carreira. Cinco vitorias consecutivas, com duas por TKO, algo raro na sua carreira anterior. A vitoria sobre Marina Rodriguez, uma top 7 ranqueada, mostrou que ela pode competir contra a elite. A evolucao do striking e visivel, e ela chega com confianca maxima para essa luta.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Lemos',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '2W-3L (40%)',
        contra_top5: '0W-2L',
      },
      fighter2: {
        nome: 'Robertson',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Lemos e Robertson enfrentaram Marina Rodriguez. Lemos nao a enfrentou recentemente, mas Robertson venceu Rodriguez por TKO em maio de 2025. Ambas tambem atuam na mesma divisao e conhecem bem o estilo uma da outra. A diferenca de calibre de oponentes e clara: Lemos enfrentou a campea Zhang e a top 4 Suarez, enquanto Robertson vem de uma sequencia contra oponentes de nivel inferior, com excecao de Rodriguez.',
    },

    oponente_comum: {
      oponente_nome: 'Marina Rodriguez',
      fighter1_result: {
        resultado: 'Referencia indireta',
        metodo: 'N/A',
        duracao: 'N/A',
        contexto: 'Lemos e Rodriguez se enfrentaram em marco de 2022 no UFC Vegas 51. Lemos venceu por nocaute no primeiro round com um chute alto seguido de socos no ground and pound, demonstrando seu poder explosivo no striking.',
        performance: 'Uma das melhores performances de Lemos, mostrando o poder letal do seu chute alto canhoto. Terminou a luta em menos de 3 minutos.',
        evento: 'UFC Vegas 51',
        data: 'Mar 2022',
      },
      fighter2_result: {
        resultado: 'Vitoria por TKO R2',
        metodo: 'TKO R2',
        duracao: '2 rounds',
        contexto: 'Robertson surpreendeu com uma vitoria por TKO no segundo round contra Rodriguez, algo inesperado para uma lutadora conhecida pelo grappling. Mostrou que desenvolveu poder real nos strikes.',
        performance: 'Vitoria que mudou a percepcao sobre Robertson. Provou que nao e mais apenas uma lutadora de chao e pode finalizar de pe.',
        evento: 'UFC Fight Night',
        data: 'Mai 2025',
      },
      insight: 'Ambas venceram Rodriguez, mas de formas diferentes. Lemos usou seu poder explosivo com chute alto, enquanto Robertson surpreendeu com TKO no striking. A diferenca de contexto e importante: Lemos enfrentou Rodriguez em 2022, quando a brasileira estava no auge. Robertson venceu em 2025, quando Rodriguez ja vinha em queda. De qualquer forma, ambas mostraram capacidade de finalizar uma oponente dura.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.54, valueB: 2.28, maxVal: 5, format: 'decimal', note: 'Lemos com volume significativamente superior. Quase 1.3 strikes a mais por minuto.' },
        { label: 'Precisao de Strikes (%)', valueA: 55, valueB: 48, maxVal: 100, format: 'percent', note: 'Lemos mais precisa, conecta mais da metade dos golpes.' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.66, valueB: 5.00, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Ambas absorvem muito. Robertson absorve ainda mais, mas sua defesa percentual e superior.' },
        { label: 'Defesa de Strikes (%)', valueA: 42, valueB: 56, maxVal: 100, format: 'percent', note: 'Robertson defende significativamente mais strikes. Lemos tem defesa preocupantemente baixa.' },
        { label: 'Takedowns por 15 Min', valueA: 0.82, valueB: 2.68, maxVal: 4, format: 'decimal', note: 'Robertson com vantagem massiva em takedowns. Mais de 3x o volume de Lemos.' },
        { label: 'Precisao de Takedown (%)', valueA: 55, valueB: 39, maxVal: 100, format: 'percent', note: 'Lemos converte mais quando tenta, mas tenta muito menos.' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 41, maxVal: 100, format: 'percent', note: 'Lemos defende melhor os takedowns, fator critico nessa luta.' },
        { label: 'Submissoes por 15 Min', valueA: 0.30, valueB: 0.60, maxVal: 2, format: 'decimal', note: 'Robertson com o dobro de tentativas de submissao. Recorde historico de finalizacoes femininas no UFC.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '30 anos', note: 'Robertson 8 anos mais jovem' },
        { label: 'Altura', fighter1: '1.63m (5\'4")', fighter2: '1.65m (5\'5")', note: 'Praticamente identicas' },
        { label: 'Envergadura', fighter1: '166cm (65")', fighter2: '161cm (63")', note: 'Lemos com 2 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Canhota (Southpaw)', fighter2: 'Ortodoxa', note: 'Lemos canhota pode causar problemas de angulo' },
        { label: 'Academia', fighter1: 'Marajo Brothers Team, Belem', fighter2: 'Goat Shed Academy, Canada', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 82, valueB: 55, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Lemos tem 53% de vitorias por KO/TKO. Seu poder canhoto e letal. Robertson recentemente adicionou TKOs ao seu jogo, mas Lemos e naturalmente mais explosiva.' },
        { label: 'Grappling Ofensivo', valueA: 45, valueB: 90, labelA: 'Medio', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Robertson tem 9 finalizacoes no UFC, recorde feminino historico. Seus takedowns (2.68/15min) e submissoes sao a principal arma. Lemos nao e uma ameaca significativa no chao.' },
        { label: 'Striking Tecnico', valueA: 75, valueB: 50, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Lemos e canhota com boa variedade de golpes: chutes altos, cruzados de esquerda, joelhadas. Robertson evoluiu mas ainda e limitada de pe comparada a Lemos.' },
        { label: 'Defesa / Durabilidade', valueA: 45, valueB: 58, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Lemos absorve 4.66 strikes por minuto com apenas 42% de defesa. Robertson absorve mais (5.00) mas defende melhor percentualmente (56%).' },
        { label: 'Defesa de Takedown', valueA: 58, valueB: 42, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Lemos defende 55% dos takedowns, crucial contra o grappling de Robertson. Ambas sao vulneraveis, mas Lemos e melhor nesse aspecto.' },
        { label: 'Cardio / Resistencia', valueA: 55, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Robertson, 8 anos mais jovem, tende a manter ritmo mais consistente. Lemos pode perder gas se a luta for para o chao repetidamente. A diferenca de idade pode pesar em 3 rounds.' },
      ],
      insight: 'Essa luta apresenta um classico confronto de estilos: <strong class="text-ufc-red">Lemos</strong> e claramente superior no striking, com poder real de nocaute e uma base canhota que causa problemas. <strong class="text-blue-400">Robertson</strong> domina no grappling com numeros historicos de finalizacao. A questao central e onde a luta acontece: se fica em pe, Lemos tem vantagem. Se vai para o chao, Robertson e letal. A defesa de takedown de Lemos (55%) e o fator que pode decidir tudo.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Lemos',
        ko_tko: { count: 8, percent: 53 },
        submission: { count: 3, percent: 20 },
        decision: { count: 4, percent: 27 },
        total_wins: 15,
      },
      fighter2: {
        nome: 'Robertson',
        ko_tko: { count: 3, percent: 19 },
        submission: { count: 9, percent: 56 },
        decision: { count: 4, percent: 25 },
        total_wins: 16,
      },
      insight: 'O contraste de estilos e evidente nos numeros. Lemos finaliza 53% das suas lutas por nocaute, enquanto Robertson finaliza 56% por submissao. Lemos prefere acabar a luta em pe com poder. Robertson prefere levar ao chao e estrangular. A curiosidade recente e que Robertson adicionou TKOs ao seu arsenal (2 dos seus ultimos 5), mostrando que esta ficando perigosa em todas as areas.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM LEMOS',
          color: 'red',
          title: 'Territorio da Amandinha',
          description: 'O primeiro round e onde Lemos e mais perigosa. Fresca e explosiva, o poder canhoto pode pegar Robertson antes que ela estabeleca o grappling. Se Lemos conectar o cruzado de esquerda ou o chute alto nos primeiros minutos, pode acabar a luta. Robertson precisa sobreviver essa fase e buscar o clinch e takedowns rapidamente.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Pivotal',
          description: 'No segundo round, o ritmo da luta ja esta definido. Se Robertson conseguiu takedowns no R1, ela vai intensificar a pressao. Se Lemos manteve a luta em pe, Robertson precisa se adaptar. Esse e o round onde as transicoes sao mais perigosas: Robertson buscando derrubar e Lemos contra-atacando na saida dos takedowns.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM ROBERTSON',
          color: 'green',
          title: 'O Territorio da Savage',
          description: 'O round final favorece Robertson. Oito anos mais jovem, com cardio superior, e a acumulacao de trabalho de grappling ao longo da luta pode ter desgastado Lemos. Se Robertson esta por cima nos cartoes ou no controle, Lemos precisara de um nocaute desesperado, o que a deixa vulneravel a takedowns.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Clock', title: 'Idade avancada aos 38 anos', fighter: 'Lemos', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Lemos fara 38 anos e esta no MMA desde 2014. A idade pode afetar recuperacao entre rounds, tempo de reacao e explosividade. No peso palha feminino, onde o cardio e crucial, cada ano conta.' },
        { icon: 'TrendingUp', title: 'Sequencia de 5 vitorias consecutivas', fighter: 'Robertson', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Robertson esta na melhor fase da carreira. Cinco vitorias seguidas, incluindo dois TKOs e uma vitoria sobre uma top 7 ranqueada. O momentum psicologico e enorme. Lutadoras nessa sequencia tendem a lutar com mais confianca e tomar riscos calculados.' },
        { icon: 'AlertTriangle', title: 'Luta cancelada no dia do evento', fighter: 'Lemos', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'A luta de Lemos em dezembro de 2025 foi cancelada no dia por herpes labial. Isso significa que ela fez um camp completo sem competir, o que pode afetar o psicologico. Por outro lado, esta fisicamente descansada.' },
        { icon: 'Zap', title: 'Poder canhoto letal', fighter: 'Lemos', risk_level: 'POSITIVO', risk_color: 'green', description: 'Lemos e canhota com 53% de vitorias por KO. O cruzado de esquerda e o chute alto sao armas que podem encerrar a luta a qualquer momento. Contra uma oponente que avanca para buscar takedowns, o timing de counter pode ser devastador.' },
        { icon: 'Shield', title: 'Recorde historico de finalizacoes', fighter: 'Robertson', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Robertson tem 9 submissoes no UFC, o maior numero entre lutadoras na historia da organizacao. Qualquer momento no chao e perigoso. Lemos foi finalizada por Jandiroba recentemente, provando que e vulneravel a submissoes.' },
        { icon: 'Target', title: 'Defesa de strikes de apenas 42%', fighter: 'Lemos', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Lemos tem a defesa de strikes mais baixa entre as top 10 do peso palha, com apenas 42%. Ela absorve 4.66 golpes significativos por minuto. Embora Robertson nao seja uma striker de elite, qualquer golpe limpo pode acumular dano ao longo de 3 rounds.' },
        { icon: 'Brain', title: 'Evolucao recente do striking', fighter: 'Robertson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Robertson mostrou uma evolucao significativa no striking com dois TKOs nas ultimas cinco lutas. Isso adiciona uma dimensao nova ao seu jogo e torna mais dificil para Lemos antecipar o gameplan. Ela nao e mais previsivel.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Lemos',
        total_probability: 40,
        scenarios: [
          { name: 'O Cruzado Canhoto Fatal', probability: 18, method: 'KO/TKO R1-R2', description: 'Lemos mantem a distancia com jabs e front kicks, esperando Robertson avancar para o clinch. No momento em que Robertson abaixa o nivel para o takedown, Lemos conecta o cruzado de esquerda canhoto ou um uppercut devastador. O poder de Lemos e letal quando ela tem espaco para trabalhar.' },
          { name: 'Chute Alto Relampago', probability: 10, method: 'KO R1', description: 'O chute alto de Lemos ja nocauteou varias oponentes. Se Robertson avanca com a guarda aberta, buscando nivel para o takedown, o chute alto pode pegar a canadense desprotegida. E a mesma arma que usou contra Rodriguez em 2022.' },
          { name: 'Defesa de Takedown e Volume', probability: 12, method: 'Decisao Unanime', description: 'Lemos defende os takedowns de Robertson (55% de defesa), mantem a luta em pe e acumula pontos com seu volume superior de strikes (3.54 SLpM contra 2.28). Se ela conseguir stuffar 60%+ dos takedowns, vence nos cartoes com volume de strikes.' },
        ],
      },
      fighter2: {
        nome: 'Robertson',
        total_probability: 57,
        scenarios: [
          { name: 'A Anaconda do Chao', probability: 22, method: 'Submissao R2-R3', description: 'Robertson fecha a distancia, leva Lemos ao chao e usa seu grappling de elite para buscar a finalizacao. Com 9 submissoes no UFC, qualquer posicao no chao e perigosa. Guilhotinas, armbars, ou rear-naked chokes sao todas opcoes reais. Lemos ja foi finalizada por Jandiroba recentemente.' },
          { name: 'Controle e Decisao', probability: 20, method: 'Decisao Unanime', description: 'Robertson acumula takedowns e controle no chao ao longo dos 3 rounds. Mesmo sem conseguir a finalizacao, o tempo de controle e os takedowns (2.68/15min) acumulam pontos suficientes para vencer nos cartoes. A idade de Lemos e a diferenca de cardio favorecem esse cenario nos rounds finais.' },
          { name: 'TKO Surpresa', probability: 15, method: 'TKO R2-R3', description: 'A nova versao de Robertson usa ground and pound agressivo apos o takedown, ou surpreende Lemos em pe com combinacoes que ela nao esperava. A vitoria por TKO sobre Rodriguez provou que esse cenario e viavel. Se Lemos esta cansada no segundo ou terceiro round, o TKO pode vir.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Gillian Robertson',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime ou Submissao tardia',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Robertson chega com todas as vantagens intangiveis: momentum, idade, evolucao, confianca. Lemos e a striker mais perigosa, mas perdeu para duas lutadoras de grappling recentemente (Suarez e Jandiroba), exatamente o perfil de Robertson. A defesa de takedown de Lemos (55%) e decente mas nao excepcional, e Robertson precisa converter apenas 2-3 takedowns por round para controlar a luta. A confianca e MEDIA porque Lemos tem poder para nocautear qualquer oponente a qualquer momento, e o estilo canhoto causa problemas reais. Essa luta pode acabar a qualquer segundo com um golpe de Lemos.',
      x_factor: {
        title: 'O Octogono Menor do Meta APEX',
        description: 'O Meta APEX tem um octogono menor que as arenas tradicionais do UFC. Isso favorece Robertson, que precisa de menos distancia para fechar e buscar takedowns. Mas tambem coloca Lemos em distancia de striking mais frequentemente. A faca corta dos dois lados, mas historicamente lutadoras de grappling se beneficiam mais de espacos menores.',
      },
      upset_alert: {
        title: 'Upset Alert: Lemos por KO no Primeiro Round',
        description: 'Lemos e canhota, explosiva e tem 53% de finalizacoes por nocaute. Se Robertson entrar confiante demais e tentar trocar antes de buscar o takedown, o cruzado de esquerda pode encerrar a luta. Robertson absorve 5.00 strikes por minuto e tem apenas 41% de defesa de takedown, o que significa que quando ela esta em pe, esta vulneravel. Um unico chute alto canhoto pode mudar tudo.',
      },
      probabilities: {
        fighter1: { nome: 'Lemos', percent: 40 },
        fighter2: { nome: 'Robertson', percent: 57 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros Takedowns de Robertson', icon: 'Target', description: 'Observe os dois primeiros minutos do round 1. Se Robertson conseguir derrubar Lemos rapidamente, e sinal de que vai controlar a luta inteira. Se Lemos stuffar os takedowns iniciais, Robertson tera que se adaptar e potencialmente trocar em pe, onde esta em desvantagem.' },
        { num: 2, title: 'O Cruzado de Esquerda de Lemos', icon: 'Zap', description: 'Lemos e canhota e seu cruzado de esquerda e a arma mais perigosa dessa luta. Observe quando Robertson abaixa o nivel para takedowns: se Lemos cronometrar o uppercut ou cruzado na saida, pode acabar a luta instantaneamente. Um golpe limpo e tudo que Lemos precisa.' },
        { num: 3, title: 'O Cardio no Round 3', icon: 'Activity', description: 'Se a luta chegar ao terceiro round, observe o nivel de energia de Lemos. Aos 38 anos, apos dois rounds de defesa de takedown e grappling, o gas pode acabar. Se Lemos esta respirando pela boca e com os bracos caidos, Robertson vai dominar.' },
        { num: 4, title: 'Tentativas de Submissao de Robertson', icon: 'Shield', description: 'Robertson tem 9 submissoes no UFC. Observe quando ela consegue as costas ou monta. Qualquer transicao de Robertson no chao pode resultar em finalizacao. Lemos foi finalizada por Jandiroba recentemente, entao sabemos que ela e vulneravel nessa posicao.' },
        { num: 5, title: 'A Distancia da Luta', icon: 'MapPin', description: 'Essa luta e definida pela distancia. Se Lemos consegue manter Robertson na ponta do jab e dos chutes, ela esta ganhando. Se Robertson fecha e encosta na grade, ela esta controlando. Quem ditar a distancia, vence a luta. O octogono menor do APEX torna isso ainda mais critico.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LEMOS VS ROBERTSON', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Palha Feminino\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'AMANDA LEMOS', content: '15-5-1 | #5 WSW\n\n53% de vitorias por nocaute\nCanhota com poder letal\nEx-desafiante ao titulo\nPerdeu 3 de 5 recentes', color: 'red' },
        { slide_number: 3, title: 'GILLIAN ROBERTSON', content: '16-8-0 | #8 WSW\n\n9 submissoes no UFC (recorde feminino)\n5 vitorias consecutivas\nEvoluiu o striking com 2 TKOs\n8 anos mais jovem', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE DA LUTA', content: 'ONDE A LUTA ACONTECE.\n\nEm pe = Lemos vence\nNo chao = Robertson finaliza\n\n55% defesa de TD vs 2.68 TD/15min\nPoder vs Grappling', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'Robertson por Decisao ou Submissao\nConfianca: MEDIA\n\n40% Lemos | 57% Robertson | 3% Empate\n\nMomentum, idade e grappling\nfavorecem a canadense', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Lemos vs Robertson sabado no APEX. A #5 contra a #8 do peso palha. Striker canhota com poder vs a mulher com mais finalizacoes na historia do UFC. Essa luta e um confronto de estilos puro.' },
        { num: '2/5', text: 'Amanda Lemos: 53% de vitorias por KO. Canhota. Perigosa. Mas perdeu 3 de 5 lutas recentes, incluindo uma finalizacao por Jandiroba. Aos 38 anos, precisa urgentemente de uma vitoria.' },
        { num: '3/5', text: 'Gillian Robertson: 9 submissoes no UFC (RECORDE feminino). 5 vitorias seguidas. Adicionou TKOs ao jogo. 30 anos. Momentum total. Essa nao e mais a mesma Robertson de dois anos atras.' },
        { num: '4/5', text: 'Dado que assusta: Lemos tem apenas 42% de defesa de strikes e foi finalizada por submissao recentemente. Robertson tenta 2.68 takedowns por 15 min. No octogono menor do APEX, isso pode ser letal.' },
        { num: '5/5', text: 'Minha previsao: Robertson por decisao ou submissao tardia. Momentum, idade, grappling. Tudo favorece a canadense. Mas cuidado: Lemos pode nocautear qualquer uma com um unico golpe canhoto. Confianca: MEDIA.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"A mulher com mais finalizacoes na historia do UFC contra uma das maiores nocauteadoras do peso palha. Lemos vs Robertson. Poder contra persistencia."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Lemos: 53% de KOs, 3.54 strikes por minuto, canhota letal. Robertson: 9 submissoes no UFC, recorde feminino, 5 vitorias seguidas. Lemos perdeu 3 de 5 recentes. Robertson nao perde desde junho de 2023."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Essa luta se resume a uma pergunta: onde acontece? Em pe, Lemos e perigosa demais. No chao, Robertson e historica. A defesa de takedown de Lemos de 55% e a chave. Se Robertson derrubar, pode finalizar. Se Lemos defender, pode nocautear."' },
        { time: '40-50s', title: 'O Fator X', text: '"Octogono menor do APEX. Menos espaco para Lemos manter distancia. Robertson precisa de menos passos para fechar. E Lemos tem 38 anos contra uma Robertson de 30 no melhor momento da carreira."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Robertson por decisao ou submissao tardia. Mas honestamente, o poder de Lemos pode acabar com tudo em um segundo. Comenta ai: striking da Lemos ou grappling da Robertson?"' },
      ],
      tiktok: [
        { hook: 'A mulher com MAIS FINALIZACOES da historia do UFC contra uma nocauteadora canhota LETAL.', body: 'Robertson tem 9 submissoes no UFC, recorde feminino. 5 vitorias seguidas. Adicionou TKOs ao jogo. Lemos tem 53% de KOs mas perdeu 3 de 5 recentes. Tem 38 anos. No APEX, octogono menor favorece grappling.', cta: 'Quem vence? Comenta LEMOS ou ROBERTSON.' },
        { hook: 'Um dado ASSUSTADOR sobre Amanda Lemos que ninguem fala.', body: 'Lemos absorve 4.66 strikes por minuto com apenas 42% de defesa. E a pior defesa entre as top 10 do peso palha. Contra Robertson, que agora tem TKOs no curriculo, isso e um problema. E Lemos foi finalizada por submissao na penultima luta.', cta: 'Segue pra mais analises de UFC que voce nao encontra em nenhum outro lugar.' },
        { hook: 'A sequencia que ninguem esta prestando atencao no peso palha feminino.', body: 'Gillian Robertson. 5 vitorias seguidas. 9 submissoes no UFC, mais que qualquer mulher na historia. TKO sobre Marina Rodriguez. 30 anos. E agora enfrenta a #5 Lemos. Se vencer, entra no top 5 e vira candidata ao titulo.', cta: 'Salva pra assistir antes da luta no sabado.' },
      ],
      headlines: [
        'Lemos vs Robertson: Poder Canhoto Contra a Rainha das Finalizacoes',
        'Robertson Pode Confirmar a Evolucao Contra a Top 5 Lemos?',
        '9 Submissoes e Contando: Robertson Busca Sexta Vitoria Consecutiva',
        'Lemos aos 38 Anos: A Nocauteadora Brasileira Luta Pela Relevancia',
        'Striking vs Grappling: A Analise Completa de Lemos vs Robertson',
        'O APEX Decide: Octogono Menor Favorece o Grappling de Robertson?',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+120',
        fighter2_odds: '-145',
        fighter1_name: 'Lemos',
        fighter2_name: 'Robertson',
        source: 'Estimativa baseada em linhas de mercado (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Volume de Takedowns vs Defesa', stat_headline: 'ROBERTSON TENTA 2.68 TAKEDOWNS/15MIN, LEMOS DEFENDE 55%', contexto: 'Robertson e agressiva nas tentativas de derrubar, mas sua precisao e de apenas 39%. Lemos defende razoavelmente bem com 55%. Isso significa que Robertson precisa de volume para eventualmente conseguir levar ao chao, mas nao e garantido.', implicacao_aposta: 'Cria incerteza no resultado. Nao aposte pesado em "luta vai ao chao" porque Lemos pode stuffar muitos takedowns. Porem, em 3 rounds, Robertson provavelmente consegue pelo menos 3-4 takedowns bem sucedidos.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Poder de Nocaute de Lemos', stat_headline: '8 KO/TKO EM 15 VITORIAS (53%), CANHOTA COM CHUTE ALTO', contexto: 'Lemos e uma das strikers mais perigosas do peso palha. Canhota, com chute alto letal e cruzado de esquerda que pode acabar lutas. Robertson absorve 5.00 strikes por minuto, entre as mais altas da divisao.', implicacao_aposta: 'Lemos como underdog com poder de KO tem valor. Se voce acredita que ela pode manter a luta em pe, o moneyline de Lemos a +120 oferece valor como underdog com poder de finalizacao.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Vulnerabilidade de Lemos no Chao', stat_headline: 'FINALIZADA POR JANDIROBA EM JULHO 2024, CONTROLADA POR SUAREZ', contexto: 'As duas derrotas mais recentes de Lemos foram para lutadoras de grappling: Suarez controlou por decisao e Jandiroba finalizou por submissao. Esse e exatamente o perfil de Robertson, que tem mais finalizacoes que ambas.', implicacao_aposta: 'Favorece Robertson por submissao como aposta de metodo. Se Lemos foi finalizada por Jandiroba, Robertson com 9 submissoes pode fazer o mesmo. Props de "Robertson por finalizacao" podem ter valor.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Fator Idade: 38 vs 30 anos', stat_headline: 'LEMOS 8 ANOS MAIS VELHA, PERDEU 3 DE 5 RECENTES', contexto: 'Aos 38 anos, Lemos esta em declinio recente (3 derrotas em 5 lutas). Robertson aos 30 esta no pico (5 vitorias seguidas). A diferenca de idade tende a se manifestar no cardio e na capacidade de absorver castigo ao longo de 3 rounds.', implicacao_aposta: 'Favorece apostas em Robertson, especialmente por decisao ou finalizacao nos rounds finais. O Over em rounds tambem pode ter valor se voce acredita que Robertson vai dominar por controle em vez de finalizar rapido.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Defesa de Strikes Preocupante', stat_headline: 'LEMOS COM APENAS 42% DE DEFESA DE STRIKES, ABSORVE 4.66 SApM', contexto: 'A defesa de Lemos e a pior entre as top 10 do peso palha. Ela absorve quase 5 golpes significativos por minuto. Embora Robertson nao seja conhecida pelo striking, a nova versao com TKOs pode explorar essa deficiencia.', implicacao_aposta: 'Adiciona risco ao moneyline de Lemos. Mesmo que ela seja a striker mais perigosa, sua defesa permite que Robertson acumule dano. Props de "total de strikes" podem ter valor para Over.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Robertson ML', odds: '-145 (estimado)', confianca: 'media', edge_vs_mercado: 'Robertson como favorita moderada reflete corretamente o momentum e as vantagens intangiveis. O grappling dela contra uma oponente que foi finalizada recentemente justifica o favoritismo.', raciocinio: 'Robertson tem momentum (5 vitorias), idade (8 anos mais jovem), e o matchup estilístico favoravel (grappler vs striker vulneravel no chao). Lemos perdeu para duas grapplers recentemente.' },
        { tipo: 'Metodo', pick: 'Robertson por Submissao', odds: '+200 (estimado)', confianca: 'media', edge_vs_mercado: 'Com 9 finalizacoes no UFC e Lemos vindo de uma derrota por submissao, esse prop pode estar subvalorizado.', raciocinio: '9 submissoes recordes. Lemos finalizada por Jandiroba em 2024. O grappling de Robertson e de nivel historico no feminino. Se a luta vai pro chao, a finalizacao e muito possivel.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-200 (estimado)', confianca: 'alta', raciocinio: 'Robertson tende a construir antes de finalizar. Suas submissoes geralmente vem no segundo ou terceiro round apos acumular controle. Lemos tem poder mas Robertson defende 56% dos strikes. A luta provavelmente passa do primeiro round.' },
        { tipo: 'Moneyline', pick: 'Lemos ML (como underdog value)', odds: '+120 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Lemos como underdog com poder de KO canhoto sempre tem valor. Se voce acredita que ela pode manter a luta em pe por 15 minutos, +120 e atrativo.', raciocinio: 'Lemos e perigosa demais para ser descartada. 53% de KOs, canhota, chute alto letal. Robertson absorve 5.00 strikes por minuto. A qualquer momento Lemos pode conectar e acabar a luta.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Robertson por Finalizacao no Primeiro Round',
        descricao: 'Apostar em Robertson por submissao no R1 e tentador dado o recorde de finalizacoes, mas historicamente Robertson construi sua luta antes de finalizar. Suas submissoes tendem a vir no segundo ou terceiro round, apos acumular controle e desgastar a oponente. No primeiro round, Lemos esta fresca e explosiva, com melhor defesa de takedown. A chance de finalizacao no R1 existe, mas e significativamente menor do que nos rounds posteriores.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
