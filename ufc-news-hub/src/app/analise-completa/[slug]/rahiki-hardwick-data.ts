import type { FullSingleAnalise } from '@/types/analise';

export const rahikiHardwickAnalise: FullSingleAnalise = {
  id: 'rahiki-hardwick-ufn-mar-14',
  evento_id: null,
  slug: 'rahiki-hardwick-ufn-mar-14',
  titulo: 'Rahiki vs Hardwick: Debutantes em Colisao',
  subtitulo: 'O invicto fenomeno australiano faz sua estreia no UFC contra o ex-campeao do Cage Warriors',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'KO/TKO', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Marwan Rahiki', record: '7-0-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Harry Hardwick', record: '13-4-1', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night',
  evento_data: '2026-03-14',
  evento_local: 'UFC APEX, Las Vegas',
  categoria_peso: 'Peso Pena',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night',
      evento_data: '14 de Marco, 2026',
      evento_local: 'UFC APEX, Las Vegas',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O FENOMENO INVICTO VS O MAGO BRITANICO',
      tagline_sub: 'Duas estreias. Dois caminhos completamente diferentes ate o UFC. Um octogono.',
      fighter1: {
        nome_completo: 'Marwan "Freaky" Rahiki',
        apelido: 'Freaky',
        sobrenome: 'Rahiki',
        record: '7-0-0',
        ranking: 'Sem ranking',
        info_extra: 'Sydney, Australia | 23 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Harry "Houdini" Hardwick',
        apelido: 'Houdini',
        sobrenome: 'Hardwick',
        record: '13-4-1',
        ranking: 'Sem ranking',
        info_extra: 'Middlesbrough, Inglaterra | 31 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">De Rabat a Sydney: A Jornada de Rahiki</h3>
        <p><strong class="text-ufc-red">Marwan Rahiki</strong> e uma das historias mais fascinantes do MMA atual. Nascido em Rabat, Marrocos, ele deixou a familia aos 19 anos e foi para a Australia perseguir o sonho do MMA. Chegou em Sydney em outubro de 2022, comecou a treinar MMA pela primeira vez, e em menos de tres anos construiu um recorde perfeito de 7-0 com seis nocautes. Ganhou o titulo de kickboxing K1 da Oceania semanas depois de chegar a Australia. Agora, aos 23 anos, faz sua estreia no UFC como um dos prospectos mais explosivos do mundo.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Houdini: O Mago do Cage Warriors</h3>
        <p><strong class="text-blue-400">Harry Hardwick</strong> e o oposto em termos de trajetoria. O britanico de 31 anos ja tem 18 lutas profissionais, foi campeao do Cage Warriors no peso pena, e defendeu o titulo duas vezes. Seu apelido "Houdini" veio de uma luta onde escapou de uma submissao profunda que parecia impossivel de sobreviver. Ele tem experiencia, versatilidade (3 KOs, 4 subs, 6 decisoes), e sabe lutar de todas as formas. Sua estreia no UFC foi em Paris contra Kaue Fernandes, onde perdeu por TKO via leg kicks, mas recuperou-se com uma vitoria devastadora.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Dois Mundos Diferentes</h3>
        <p>Essa e uma luta entre dois mundos. <strong class="text-ufc-red">Rahiki</strong> e pura explosao e instinto, o tipo de lutador que aparece uma vez a cada decada: poder natural, agressividade implacavel, e uma confianca que beira a arrogancia saudavel. <strong class="text-blue-400">Hardwick</strong> e o artesao: tecnica apurada, versatilidade, e a inteligencia de quem ja lutou em palcos grandes. A questao e se a explosao de Rahiki pode ser contida pela inteligencia de Hardwick.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Estreia no UFC (invicto)', fighter2: 'Busca primeira vitoria no UFC' },
        { dimensao: 'Objetivo', fighter1: 'Impressionar na estreia e justificar o hype', fighter2: 'Se estabelecer no UFC apos debut dificil' },
        { dimensao: 'Narrativa', fighter1: 'Fenomeno invicto do Contender Series', fighter2: 'Ex-campeao do Cage Warriors provando valor' },
        { dimensao: 'Risco', fighter1: 'Teste de fogo contra veterano europeu', fighter2: 'Segundo teste no UFC contra prospect explosivo' },
        { dimensao: 'Recompensa', fighter1: 'Vitoria impressionante abre portas imensas', fighter2: 'Primeira vitoria no UFC muda tudo' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O FENOMENO AUSTRALIANO CHEGA COM TUDO',
          subtitulo: 'Rahiki confirma o hype e se apresenta ao mundo do UFC com estilo.',
          consequencias: [
            { tag: 'HYPE', texto: 'Rahiki se torna um dos prospectos mais comentados do peso pena. 8-0 invicto com 7 finalizacoes.' },
            { tag: 'RANKING', texto: 'Comeca a aparecer nas conversas sobre futuros top 15 dos penas.' },
            { tag: 'BONUS', texto: 'Se finalizar cedo, forte candidato a Performance of the Night.' },
          ],
          proxima_luta: 'Oponente de nivel medio no peso pena para testar a evolucao',
        },
        fighter2_vence: {
          titulo: 'HOUDINI ESCAPA DE NOVO',
          subtitulo: 'Hardwick prova que experiencia e versatilidade superam explosao pura.',
          consequencias: [
            { tag: 'CARREIRA', texto: 'Hardwick se estabelece no UFC e ganha traction na divisao dos penas.' },
            { tag: 'CREDIBILIDADE', texto: 'Derrotar um prospect invicto e hypado e o tipo de vitoria que chama atencao dos matchmakers.' },
            { tag: 'CONFIANCA', texto: 'Apos a derrota dificil na estreia em Paris, voltar com uma vitoria solida muda a narrativa completamente.' },
          ],
          proxima_luta: 'Veterano estabelecido nos penas para continuar a escalada',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Marwan Rahiki',
        color: 'red',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Ananias Mulumba', result: 'W', method: 'TKO R2 (2:13)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria no Contender Series que garantiu contrato com o UFC. Pressao implacavel e finalizacao por strikes.' },
          { date: 'Jul 2025', opponent: 'Gabriel Schlupp', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute rapido no circuito australiano. Poder natural evidente.' },
          { date: 'Mai 2025', opponent: 'Semakadde Kakembo', result: 'W', method: 'Sub R1 (Guilhotina)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Unica vitoria por submissao. Mostrou versatilidade alem do striking.' },
          { date: 'Fev 2025', opponent: 'Oponente Regional', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Dominacao no circuito regional australiano.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Rahiki esta em uma trajetoria vertical. Sete vitorias, zero derrotas, seis nocautes. A velocidade com que ele progrediu de iniciante em MMA (outubro 2022) para contrato no UFC (outubro 2025) e historicamente rapida. O hype e real, mas os oponentes ate agora foram de nivel regional. O UFC e outro mundo.',
      },
      fighter2: {
        nome: 'Harry Hardwick',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Kaue Fernandes', result: 'L', method: 'TKO R1 (3:21)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut no UFC em Paris com derrota por leg kicks. Estreia em short notice no peso leve.' },
          { date: 'Jun 2025', opponent: 'Oponente Cage Warriors', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Defesa de titulo no Cage Warriors antes de assinar com o UFC.' },
          { date: 'Mar 2025', opponent: 'Oponente Cage Warriors', result: 'W', method: 'Sub R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao no segundo round. Mostrou habilidade de grappling.' },
          { date: 'Nov 2024', opponent: 'Oponente Cage Warriors', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Defesa de titulo do Cage Warriors. Lutou 5 rounds por decisao.' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Hardwick teve uma estreia dificil no UFC, perdendo por TKO via leg kicks em Paris. Mas ele voltou com uma vitoria solida e agora luta no peso pena, sua divisao natural. A experiencia no Cage Warriors como campeao e real, mas o nivel do UFC e outro patamar. Ele precisa provar que pertence aqui.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Rahiki',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '7W-0L (100%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Hardwick',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '0W-1L (0%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Rahiki e Hardwick nunca enfrentaram oponentes em comum. Rahiki lutou exclusivamente no circuito australiano e no Contender Series, enquanto Hardwick construiu sua carreira no Cage Warriors europeu. O UFC e o primeiro ponto de intersecao das suas carreiras, tornando essa uma luta genuinamente dificil de prever.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.96, valueB: 2.39, maxVal: 8, format: 'decimal', note: 'Rahiki com quase 2.5x o volume de Hardwick. Diferenca massiva.' },
        { label: 'Precisao de Strikes (%)', valueA: 47, valueB: 35, maxVal: 100, format: 'percent', note: 'Rahiki mais preciso. Hardwick com precisao abaixo da media.' },
        { label: 'Strikes Absorvidos/Min', valueA: 6.10, valueB: 7.16, maxVal: 10, format: 'decimal', reverseWinner: true, note: 'Ambos absorvem muito. Hardwick especialmente vulneravel.' },
        { label: 'Defesa de Strikes (%)', valueA: 56, valueB: 40, maxVal: 100, format: 'percent', note: 'Hardwick defende apenas 40% dos strikes. Muito preocupante.' },
        { label: 'Takedowns por 15 Min', valueA: 0.00, valueB: 0.00, maxVal: 3, format: 'decimal', note: 'Nenhum dos dois tenta takedowns com frequencia.' },
        { label: 'Precisao de Takedown (%)', valueA: 0, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 100, valueB: 0, maxVal: 100, format: 'percent', note: 'Amostragem pequena para ambos. Dados insuficientes.' },
        { label: 'Submissoes por 15 Min', valueA: 2.08, valueB: 0.00, maxVal: 3, format: 'decimal', note: 'Rahiki surpreendentemente ativo em submissoes.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '23 anos', fighter2: '31 anos', note: 'Rahiki 8 anos mais jovem' },
        { label: 'Altura', fighter1: '1.73m (5\'8")', fighter2: '1.73m (5\'8")', note: 'Identicos em altura' },
        { label: 'Envergadura', fighter1: '183cm (72")', fighter2: '180cm (71")', note: 'Rahiki com leve vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Switch', note: 'Hardwick alterna stances' },
        { label: 'Academia', fighter1: "Lion's Den Academy, Sydney", fighter2: 'Middlesbrough Fight Academy', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 85, valueB: 50, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: '6 KOs em 7 vitorias para Rahiki. 86% de taxa de nocaute. Hardwick tem apenas 3 KOs em 13 vitorias. Poder bruto favorece Rahiki massivamente.' },
        { label: 'Striking Tecnico', valueA: 68, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Rahiki tem background de kickboxing K1 e 5.96 strikes/min com 47% de precisao. Hardwick luta de switch mas acerta apenas 35%.' },
        { label: 'Grappling / Submissoes', valueA: 55, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Hardwick tem 4 submissoes em 13 vitorias e e o "Houdini" das submissoes. Rahiki mostrou guilhotina mas o grappling e menos testado.' },
        { label: 'Versatilidade', valueA: 50, valueB: 75, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Hardwick vence por KO, sub e decisao. Luta de switch. Rahiki e primariamente striker com algum chao. Hardwick tem mais armas.' },
        { label: 'Cardio / Ritmo', valueA: 60, valueB: 70, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Hardwick lutou 5 rounds como campeao no Cage Warriors. Rahiki nunca precisou do cardio: 6 de 7 vitorias no R1-R2.' },
        { label: 'Atleticismo / Explosao', valueA: 90, valueB: 55, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Rahiki e um atleta de nivel elite. Velocidade, potencia e reflexos de um kickboxer campeao. Hardwick e funcional mas nao no mesmo nivel atletico.' },
      ],
      insight: 'Essa luta apresenta um dilema classico: <strong class="text-ufc-red">Rahiki</strong> domina nos atributos atleticos puros, poder e explosao, enquanto <strong class="text-blue-400">Hardwick</strong> tem vantagem na versatilidade, experiencia de rounds longos, e habilidade no grappling. Se a luta ficar em pe, Rahiki e favorito. Se Hardwick levar pro chao ou para um ritmo lento, as coisas ficam mais equilibradas.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Rahiki',
        ko_tko: { count: 6, percent: 86 },
        submission: { count: 1, percent: 14 },
        decision: { count: 0, percent: 0 },
        total_wins: 7,
      },
      fighter2: {
        nome: 'Hardwick',
        ko_tko: { count: 3, percent: 23 },
        submission: { count: 4, percent: 31 },
        decision: { count: 6, percent: 46 },
        total_wins: 13,
      },
      insight: '86% de vitorias por nocaute para Rahiki contra 23% para Hardwick. Mas Hardwick tem algo que Rahiki nao tem: versatilidade. 46% por decisao mostra que ele sabe acumular pontos. 31% por submissao mostra que ele pode finalizar no chao. Rahiki e uma maquina de nocaute; Hardwick e um canivete suico. A questao e se o canivete suico pode evitar ser atropelado pelo trem de carga.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VANTAGEM RAHIKI',
          color: 'red',
          title: 'A Tempestade Inicial',
          description: 'O primeiro round e o territorio de Rahiki. Seis dos seus sete combates terminaram nos dois primeiros rounds, com a maioria no primeiro. O poder, a velocidade e a agressividade de Rahiki serao maximos aqui. Hardwick precisa sobreviver a tempestade sem ser atingido limpo. Se Rahiki conectar, pode acabar rapido.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round da Verdade',
          description: 'Se Hardwick sobreviver o primeiro round, a dinamica muda. Rahiki comeca a gastar energia, e a inteligencia de Hardwick pode aparecer. E nesse round que Hardwick pode comecar a usar a stance switch para confundir Rahiki e buscar takedowns ou submissoes oportunisticas.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM HARDWICK',
          color: 'green',
          title: 'O Territorio do Houdini',
          description: 'O terceiro round favorece Hardwick. Ele tem experiencia de lutas de 5 rounds no Cage Warriors e sabe competir cansado. Rahiki nunca precisou do terceiro round na carreira. Se a luta chegar aqui, a falta de experiencia em lutas longas pode pesar para o australiano.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: 'Poder natural devastador', fighter: 'Rahiki', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '86% de taxa de nocaute com 23 anos. Rahiki tem poder natural que nao se ensina. O background de kickboxing K1 da a ele tecnica por tras do poder. Um unico golpe limpo pode acabar tudo.' },
        { icon: 'Brain', title: 'Primeira luta no UFC', fighter: 'Rahiki', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Rahiki nunca lutou no octogono do UFC. A pressao da estreia, o ambiente, e o nivel dos oponentes sao todos desconhecidos. Muitos prospectos hypados estreiam com performance abaixo do esperado.' },
        { icon: 'TrendingUp', title: 'Progressao meterica', fighter: 'Rahiki', risk_level: 'POSITIVO', risk_color: 'green', description: 'De iniciante em MMA em outubro 2022 para contrato no UFC em outubro 2025. Tres anos. Essa velocidade de progressao indica talento natural excepcional e capacidade de aprendizado rapido.' },
        { icon: 'Shield', title: 'Experiencia em palcos grandes', fighter: 'Hardwick', risk_level: 'POSITIVO', risk_color: 'green', description: 'Hardwick foi campeao do Cage Warriors e defendeu o titulo duas vezes. Ele ja lutou em arenas grandes na Europa, incluindo o UFC Paris. A pressao nao e novidade para ele.' },
        { icon: 'AlertTriangle', title: 'Vulnerabilidade a leg kicks', fighter: 'Hardwick', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Hardwick perdeu sua estreia no UFC por TKO via leg kicks contra Fernandes. Se Rahiki, que e kickboxer, atacar as pernas, Hardwick pode ter o mesmo problema.' },
        { icon: 'Activity', title: 'Defesa de strikes problematica', fighter: 'Hardwick', risk_level: 'RISCO ALTO', risk_color: 'red', description: '40% de defesa de strikes e 7.16 strikes absorvidos por minuto. Contra Rahiki, que acerta 5.96 strikes por minuto com 47% de precisao, Hardwick vai receber muito dano.' },
        { icon: 'MapPin', title: 'UFC APEX neutro', fighter: 'Rahiki', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'O APEX nao favorece nenhum dos dois. Sem torcida massiva, sem fuso horario complicado. Condicoes neutras para ambos os estreantes.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Rahiki',
        total_probability: 60,
        scenarios: [
          { name: 'A Estreia Perfeita', probability: 30, method: 'KO R1', description: 'Rahiki entra com pressao maxima, usa a velocidade e o poder do kickboxing para sobrecarregar Hardwick nos primeiros minutos. Com 40% de defesa de strikes, Hardwick vai receber golpes limpos. Um unico golpe pode acabar tudo.' },
          { name: 'Dominacao por Volume', probability: 18, method: 'TKO R2', description: 'Rahiki nao finaliza no primeiro round mas acumula dano significativo. No segundo round, Hardwick esta machucado e lento. Rahiki encontra a abertura para o TKO com uma sequencia de golpes contra a grade.' },
          { name: 'O Octogono Inteiro', probability: 12, method: 'Decisao Unanime', description: 'Rahiki domina em pe por 15 minutos com volume e precisao superior. Mesmo sem a finalizacao, ele vence nos cartoes com 5.96 strikes por minuto contra a defesa fragil de Hardwick.' },
        ],
      },
      fighter2: {
        nome: 'Hardwick',
        total_probability: 37,
        scenarios: [
          { name: 'A Arte do Houdini', probability: 15, method: 'Sub R2-R3', description: 'Hardwick sobrevive o ataque inicial de Rahiki, usa a versatilidade para levar a luta pro chao, e encontra uma submissao. Com 4 subs na carreira e a habilidade de escapar posicoes perigosas, ele pode transformar a luta no chao.' },
          { name: 'A Guerra de Atricao', probability: 12, method: 'Decisao Dividida', description: 'Hardwick usa a stance switch para confundir Rahiki, acumula pontos com takedowns e controle, e vence uma decisao apertada. A experiencia de 18 lutas e a inteligencia tatica fazem a diferenca nos detalhes.' },
          { name: 'O Counter Perfeito', probability: 10, method: 'KO R1-R2', description: 'Hardwick encontra o counter perfeito quando Rahiki entra agressivo demais. Com 3 KOs na carreira, ele tem algum poder. Se Rahiki se comprometer demais, pode pagar o preco.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Marwan Rahiki',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO nos primeiros 2 rounds',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Rahiki e favorito pelas razoes certas: poder devastador, volume superior (5.96 vs 2.39 strikes/min), e precisao melhor (47% vs 35%). Contra a defesa de 40% de Hardwick, o volume de Rahiki vai criar oportunidades de finalizacao. No entanto, a confianca e apenas MEDIA porque Rahiki nunca lutou no UFC, nunca enfrentou alguem com a versatilidade de Hardwick, e pode ter surpresas na estreia. Hardwick e um lutador inteligente que pode adaptar o gameplan e levar a luta para onde Rahiki e menos confortavel.',
      x_factor: {
        title: 'A Velocidade de Aprendizado de Rahiki',
        description: 'De zero experiencia em MMA para contrato no UFC em 3 anos. Essa capacidade de absorver e evoluir rapidamente sugere que Rahiki pode se adaptar durante a luta de formas que surprendam. Se Hardwick mudar o gameplan, Rahiki pode ter a inteligencia para se ajustar em tempo real.',
      },
      upset_alert: {
        title: 'Upset Alert: Hardwick por Submissao no R3',
        description: 'Se Hardwick sobreviver os 2 primeiros rounds e levar a luta pro chao no terceiro, o grappling inexperiente de Rahiki pode ser exposto. Hardwick tem 4 submissoes na carreira e a inteligencia no chao para encontrar aberturas. Um Rahiki cansado no terceiro round e o melhor cenario para o Houdini.',
      },
      probabilities: {
        fighter1: { nome: 'Rahiki', percent: 60 },
        fighter2: { nome: 'Hardwick', percent: 37 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Rahiki -275', reasoning: 'Volume, poder e precisao superiores contra defesa fragil de Hardwick.' },
        method: { pick: 'Rahiki por KO/TKO', reasoning: '86% de taxa de nocaute e 40% de defesa de strikes de Hardwick. A matematica favorece o KO.' },
        over_under: { pick: 'Under 2.5 rounds', rounds: 2.5, reasoning: 'Rahiki finaliza 6 de 7 lutas nos 2 primeiros rounds. Hardwick absorve muito dano. Alta chance de nao chegar ao terceiro.' },
        best_value: 'Rahiki por KO/TKO Round 1',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 2 Minutos de Rahiki', icon: 'Zap', description: 'Rahiki costuma comecar explosivo. Observe a agressividade e o volume nos primeiros 2 minutos. Se ele encontrar o ritmo cedo e comecar a acertar Hardwick com frequencia, a finalizacao pode vir rapido. Se Hardwick sobreviver esse ataque, a luta muda.' },
        { num: 2, title: 'Leg Kicks de Rahiki', icon: 'Target', description: 'Rahiki e kickboxer e Hardwick perdeu no UFC por leg kicks. Se Rahiki atacar as pernas de Hardwick cedo e com frequencia, pode destruir a mobilidade do britanico e abrir caminho para o nocaute. Observe o volume de chutes baixos.' },
        { num: 3, title: 'A Stance Switch de Hardwick', icon: 'Brain', description: 'Hardwick luta de switch, alternando entre ortodoxa e southpaw. Isso pode confundir Rahiki, que provavelmente nunca enfrentou alguem assim. Observe se Rahiki se adapta rapido ou se fica confuso com as mudancas de angulo.' },
        { num: 4, title: 'Tentativas de Takedown', icon: 'Shield', description: 'Hardwick precisa levar a luta pro chao para ter chance. Observe quantas vezes ele tenta o takedown e se Rahiki consegue defender. Se Hardwick conseguir derruba-lo, a dinamica muda completamente.' },
        { num: 5, title: 'Nervosismo de Estreia', icon: 'Activity', description: 'Ambos sao relativamente novos no UFC. Observe sinais de nervosismo: movimentos rigidos, reacoes lentas, ou decisoes de gameplan erradas. A pressao do octogono e diferente de qualquer outro lugar, e pode afetar qualquer um dos dois.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'RAHIKI VS HARDWICK', content: 'UFC Fight Night\n14 de Marco, 2026\nUFC APEX, Las Vegas\n\nPeso Pena | 3 Rounds', color: 'red' },
        { slide_number: 2, title: 'MARWAN RAHIKI', content: '7-0-0 | Invicto\n\n86% de nocaute (6 de 7)\nDe Marrocos para Australia\nContender Series -> UFC\n23 anos | MMA desde 2022', color: 'red' },
        { slide_number: 3, title: 'HARRY HARDWICK', content: '13-4-1 | Ex-campeao CW\n\n3 KOs | 4 Subs | 6 Decisoes\nCage Warriors FW Champion\nHoudini das submissoes\n31 anos | Switch stance', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Rahiki por KO/TKO R1-R2\nConfianca: MEDIA\n\n60% Rahiki | 37% Hardwick | 3% Empate\n\nExplosao vs Versatilidade', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Rahiki vs Hardwick sabado no APEX. Um cara invicto com 86% de taxa de nocaute contra o ex-campeao do Cage Warriors que se chama HOUDINI. Essa luta e pura entretenimento.' },
        { num: '2/5', text: 'Rahiki: saiu do Marrocos com 19 anos, comecou MMA em outubro 2022, e agora estreia no UFC 3 anos depois. 7-0 com 6 nocautes. Esse cara e um fenomeno. A progressao e absurda.' },
        { num: '3/5', text: 'Hardwick perdeu a estreia no UFC por leg kicks. Rahiki e KICKBOXER. Se ele atacar as pernas de Hardwick, pode ser o mesmo filme. Red flag enorme pro britanico.' },
        { num: '4/5', text: 'Mas nao subestimem Hardwick. Ex-campeao do Cage Warriors, luta de switch, 4 submissoes na carreira. Se ele levar pro chao, Rahiki nunca foi testado la. Versatilidade > explosao?' },
        { num: '5/5', text: 'Pick: Rahiki por KO/TKO nos primeiros 2 rounds. 5.96 strikes/min com poder de nocaute contra 40% de defesa. A matematica e cruel. Mas se chegar ao R3, cuidado com o Houdini.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"Um marroquino invicto com 86% de taxa de nocaute contra o Houdini do MMA britanico. Dois debutantes, estilos completamente opostos, no UFC APEX neste sabado."' },
        { time: '10-25s', title: 'O Fenomeno', text: '"Rahiki chegou na Australia com 19 anos sem saber nada de MMA. Tres anos depois, 7-0 com 6 nocautes e contrato no UFC. O background de kickboxing K1 da a ele poder e tecnica. Ele e uma maquina de nocaute."' },
        { time: '25-40s', title: 'O Houdini', text: '"Hardwick e o oposto: 13 lutas de experiencia, ex-campeao do Cage Warriors, luta de switch stance, e tem 4 submissoes. Ele e o tipo de oponente que pode surpreender se a luta for pro chao. Mas perdeu no UFC por leg kicks, e Rahiki e kickboxer."' },
        { time: '40-50s', title: 'Previsao', text: '"Rahiki por KO/TKO nos primeiros 2 rounds. 5.96 strikes por minuto contra 40% de defesa. A matematica e clara. Mas a confianca e media porque Rahiki nunca lutou no UFC."' },
        { time: '50-60s', title: 'CTA', text: '"O fenomeno invicto ou o mago veterano? Comenta quem leva e segue pro conteudo mais completo de UFC em portugues."' },
      ],
      tiktok: [
        { hook: '3 ANOS de MMA e ja ta no UFC com 7-0 e 86% de nocaute.', body: 'Marwan Rahiki saiu do Marrocos com 19 anos, foi pra Australia, nunca tinha feito MMA, e agora esta estreiando no UFC contra o ex-campeao do Cage Warriors. Sete vitorias, seis nocautes. Esse cara e DIFERENTE.', cta: 'Vai estrear com nocaute? Comenta SIM ou NAO.' },
        { hook: 'A RED FLAG que pode acabar com Hardwick de novo.', body: 'Hardwick perdeu a estreia no UFC por LEG KICKS. Rahiki e KICKBOXER PROFISSIONAL. Se ele mirar nas pernas de Hardwick, vai ser o mesmo filme. 40% de defesa de strikes nao segura contra 5.96 golpes por minuto.', cta: 'Salva esse video e volta sabado depois da luta.' },
        { hook: 'Por que esse lutador de 23 anos ASSUSTA o peso pena do UFC.', body: 'Rahiki: campeao de K1 da Oceania, 7-0, 86% de nocaute, 5.96 strikes por minuto. Comecou MMA em 2022. Ta no UFC em 2026. Essa curva de aprendizado nao e normal. E ele so tem 23 anos.', cta: 'Segue pra acompanhar a estreia desse fenomeno sabado.' },
      ],
      headlines: [
        'Rahiki vs Hardwick: O Fenomeno Invicto Encontra o Houdini do MMA',
        'De Marrocos ao UFC em 3 Anos: A Historia Insana de Marwan Rahiki',
        '86% de Nocaute vs Ex-Campeao Cage Warriors: O Duelo de Estreantes',
        'Hardwick Pode Sobreviver ao Poder de Rahiki? A Analise Completa',
        'Duas Estreias, Dois Mundos: Rahiki vs Hardwick no UFC APEX',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-275',
        fighter2_odds: '+210',
        fighter1_name: 'Rahiki',
        fighter2_name: 'Hardwick',
        source: 'Media de DraftKings e FanDuel (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Poder de Nocaute Excepcional', stat_headline: '86% DE VITORIAS POR NOCAUTE (6 DE 7 LUTAS)', contexto: 'Rahiki tem uma das maiores taxas de KO entre estreantes do UFC. Com background de kickboxing K1 e poder natural devastador, ele e o tipo de striker que encerra lutas com um unico golpe.', implicacao_aposta: 'Apostas em Rahiki por KO/TKO devem ter valor, especialmente no R1.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Strikes Fragil de Hardwick', stat_headline: '40% DE DEFESA DE STRIKES E 7.16 ABSORVIDOS/MIN', contexto: 'Hardwick defende apenas 40% dos strikes e absorve 7.16 por minuto. Contra Rahiki, que acerta 5.96 por minuto com 47% de precisao, ele vai receber muito dano. Em sua estreia, foi parado por leg kicks.', implicacao_aposta: 'Reforco enorme para apostas em "luta nao vai para decisao". A defesa de Hardwick e insuficiente.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Volume de Strikes Massivo', stat_headline: '5.96 STRIKES SIGNIFICATIVOS POR MINUTO PARA RAHIKI', contexto: 'O volume de Rahiki e quase 2.5x maior que o de Hardwick (2.39). Mesmo que Rahiki nao nocauteie cedo, o volume cumulativo vai causar dano significativo ao longo de 15 minutos.', implicacao_aposta: 'Favorece apostas em Rahiki independente do metodo. O volume cria oportunidades constantes.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Experiencia de Hardwick', stat_headline: '13 LUTAS PRO + EX-CAMPEAO CAGE WARRIORS', contexto: 'Hardwick tem quase o dobro de lutas profissionais e experiencia em palcos grandes como campeao do Cage Warriors. Ele sabe se adaptar e tem versatilidade (KO, sub, decisao).', implicacao_aposta: 'Se voce acredita que experiencia supera atleticismo, Hardwick a +210 pode ser value.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Estreia no UFC para Rahiki', stat_headline: 'PRIMEIRA LUTA NO OCTOGONO DO UFC', contexto: 'Rahiki nunca lutou no UFC. A pressao da estreia, o ambiente, e o nivel de competicao sao todos desconhecidos. Historicamente, prospectos hypados nem sempre correspondem na estreia.', implicacao_aposta: 'Reduz a confianca em Rahiki. Considere proteger aposta com "vai para decisao" como hedge.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Rahiki -275', odds: '-275', confianca: 'media', raciocinio: 'Favorito por razoes solidas: volume, poder e precisao superiores. Mas a estreia no UFC adiciona incerteza.' },
        { tipo: 'Metodo', pick: 'Rahiki por KO/TKO', odds: '-130', confianca: 'alta', edge_vs_mercado: '86% taxa de nocaute + 40% defesa de Hardwick', raciocinio: 'A combinacao do poder de Rahiki com a defesa fragil de Hardwick torna o KO/TKO o resultado mais provavel.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 rounds', odds: '-110', confianca: 'media', raciocinio: 'Rahiki finaliza cedo (6 de 7 no R1-R2) e Hardwick foi parado no R1 na estreia. Boa chance de nao chegar ao terceiro round.' },
        { tipo: 'Moneyline', pick: 'Hardwick +210 (upset)', odds: '+210', confianca: 'baixa', edge_vs_mercado: 'Experiencia + versatilidade + estreia de Rahiki', raciocinio: 'Se voce acha que Hardwick pode levar pro chao e usar submissoes, +210 e um preco justo para o risco. A experiencia de Cage Warriors e real.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Subestimar Rahiki por Falta de Experiencia',
        descricao: 'E tentador olhar para o recorde de 7-0 contra oponentes regionais e descartar Rahiki. Mas o Contender Series nao e regional, e a velocidade de progressao dele e historicamente rara. Lutadores com esse perfil atletico e essa velocidade de aprendizado geralmente correspondem no UFC. Apostar contra Rahiki puramente por "falta de experiencia" pode ser uma armadilha.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};
