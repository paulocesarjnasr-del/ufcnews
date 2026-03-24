import type { FullSingleAnalise } from '@/types/analise';

export const smithYouAnalise: FullSingleAnalise = {
  id: 'smith-you-ufn-mar-14',
  evento_id: null,
  slug: 'smith-you-ufn-mar-14',
  titulo: 'Smith vs You: O Slam King Contra o Mestre do Controle',
  subtitulo: 'Jovem explosivo americano enfrenta veterano coreano tecnico nos galos',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decision or TKO', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Elijah Smith', record: '9-1-0', ultimasLutas: [] },
  fighter2_info: { nome: 'SuYoung You', record: '16-3-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Galo',
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
      categoria_peso: 'Peso Galo (135 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'EXPLOSAO ATLETICA CONTRA CONTROLE ORIENTAL',
      tagline_sub: 'O homem do slam mais brutal do UFC contra o campeao de quatro organizacoes.',
      fighter1: {
        nome_completo: 'Elijah "Swift" Smith',
        apelido: 'Swift',
        sobrenome: 'Smith',
        record: '9-1-0',
        ranking: 'Sem ranking BW',
        info_extra: 'Colorado Springs, EUA | 23 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'SuYoung "Yoo-Jitsu" You',
        apelido: 'Yoo-Jitsu',
        sobrenome: 'You',
        record: '16-3-0',
        ranking: 'Sem ranking BW',
        info_extra: 'Seoul, Coreia do Sul | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Fenomeno de Colorado Springs</h3>
        <p><strong class="text-ufc-red">Elijah Smith</strong> e o tipo de prospect que faz scouts perderem o sono. Com apenas 23 anos e um recorde de 9-1, o filho do ex-lutador do UFC Gilbert Smith ja fez coisas no octogono que entram para a historia. Seu slam KO sobre Toshiomi Kazama em agosto de 2025 — o 15o da historia do UFC — rendeu $50.000 de Performance da Noite e um lugar permanente nos highlights da organizacao. Com background de wrestling desde os 5 anos e dois titulos estaduais, Smith combina atletismo elite com instinto assassino. Em 2 lutas no UFC, esta 2-0 com uma decisao e um KO viral.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Mestre Silencioso da Coreia</h3>
        <p><strong class="text-blue-400">SuYoung You</strong> e o oposto de flashy, mas nao menos perigoso. O coreano de 30 anos construiu um imperio no MMA asiatico: campeao em QUATRO organizacoes diferentes (Naiza, Deep, Zeus, Black Combat), vencedor do Road to UFC 2024 e 3-0 no UFC sem nunca ter sido realmente ameacado. Sua alcunha "Yoo-Jitsu" nao e brincadeira — comecou no sambo aos 14, migrou para o jiu-jitsu e construiu um jogo de controle que sufoca oponentes por 3 rounds. Com 16-3 no geral e 5 submissoes, You e uma maquina de pressao constante.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Juventude vs Experiencia</h3>
        <p>Essa luta e um confronto geracional. <strong class="text-ufc-red">Smith</strong> tem a explosividade, o atletismo e o teto mais alto — mas apenas 10 lutas profissionais. <strong class="text-blue-400">You</strong> tem quase o dobro de experiencia (19 lutas sem NCs), titulos em 4 organizacoes e um jogo de controle refinado por anos de competicao. A questao e se a juventude explosiva de Smith pode superar a maturidade tatica de You, ou se o controle sistematico do coreano vai neutralizar o atletismo americano.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (2-0 no UFC)', fighter2: 'Sem ranking (3-0 no UFC)' },
        { dimensao: 'Objetivo', fighter1: '3-0 no UFC, continuar ascensao como prospect', fighter2: '4-0 no UFC, alcancar oponente ranqueado' },
        { dimensao: 'Narrativa', fighter1: 'Jovem fenomeno provando que o hype e real', fighter2: 'Veterano coreano validando titulos asiaticos no UFC' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota no UFC contra veterano tecnico', fighter2: 'Derrota para prospect de 23 anos questiona teto' },
        { dimensao: 'Recompensa', fighter1: 'Maior vitoria da carreira abre porta para top 15', fighter2: 'Vitoria sobre prospect hypeado consolida como contender' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'SWIFT CONTINUA A ASCENSAO METEORITICA',
          subtitulo: 'Elijah Smith prova que o hype e real com a maior vitoria da carreira.',
          consequencias: [
            { tag: 'PROSPECT', texto: '3-0 no UFC aos 23 anos. O futuro do peso galo tem nome. UFC vai investir pesado na sua imagem.' },
            { tag: 'RANKING', texto: 'Vitoria sobre You (3-0 no UFC, 16-3 geral) e suficiente para pedido de oponente ranqueado.' },
            { tag: 'LEGADO', texto: 'Filho de ex-lutador do UFC construindo legado proprio. A narrativa vende-se sozinha.' },
          ],
          proxima_luta: 'Oponente ranqueado #12-15 dos galos',
        },
        fighter2_vence: {
          titulo: 'YOO-JITSU SILENCIA O HYPE',
          subtitulo: 'You prova que experiencia e controle vencem atletismo puro.',
          consequencias: [
            { tag: 'VALIDACAO', texto: '4-0 no UFC contra competicao cada vez melhor. Os titulos asiaticos se traduzem para o UFC.' },
            { tag: 'RANKING', texto: 'Se aproxima do top 15 com recorde perfeito no UFC e vitoria sobre prospect hypeado.' },
            { tag: 'ESTILO', texto: 'Prova que controle e grappling tecnico vencem atletismo puro. Mensagem poderosa para a divisao.' },
          ],
          proxima_luta: 'Oponente ranqueado #10-15 dos galos',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Elijah Smith',
        color: 'red',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Toshiomi Kazama', result: 'W', method: 'KO R1 (slam)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'O 15o slam KO da historia do UFC. $50.000 de Performance da Noite. Kazama foi hospitalizado. Momento viral que colocou Smith no mapa.' },
          { date: 'Fev 2025', opponent: 'Vince Morales', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC com vitoria solida por decisao. Mostrou wrestling dominante e controle de ritmo por 3 rounds.' },
          { date: 'Out 2024', opponent: 'Oponente regional', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria rapida no circuito regional antes de assinar com o UFC.' },
          { date: 'Jun 2024', opponent: 'Oponente regional', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no segundo round. Continuou a construir recorde antes do UFC.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Smith esta no melhor momento possivel. 2-0 no UFC, incluindo um dos KOs mais virais do ano com o slam sobre Kazama. Com apenas 23 anos, seu teto e altissimo e o UFC claramente ve nele um investimento a longo prazo. O unico ponto de interrogacao e que ambos os oponentes no UFC foram de nivel baixo a medio. You sera o primeiro teste real.',
      },
      fighter2: {
        nome: 'SuYoung You',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Xiao Long', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria tecnica em Shanghai. Dominou os dois primeiros rounds com striking preciso e controle. Performance madura em territorio hostil.' },
          { date: 'Mar 2025', opponent: 'AJ Cunningham', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia oficial no UFC com vitoria solida. Mostrou controle de ritmo e grappling superior por 3 rounds.' },
          { date: 'Nov 2024', opponent: 'Jieleyisi Baergeng', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Venceu a final do Road to UFC com decisao dominante. Conquistou contrato UFC com performance completa.' },
          { date: 'Jul 2024', opponent: 'Oponente Road to UFC', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Semifinal do Road to UFC. Controle total por 3 rounds sem ser ameacado.' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'You esta em sequencia de 5 vitorias e 3-0 no UFC — todas por decisao unanime. Mostra consistencia e controle impressionantes. O coreano nunca foi realmente ameacado nas lutas recentes, dominando com grappling e pressao constante. Porem, como Smith, o nivel de oposicao foi baixo. Esta luta e o primeiro teste real para ambos.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Smith',
        media_oponentes: 1.3,
        media_oponentes_label: 'Ruim',
        aproveitamento: '2W-0L (100%) no UFC',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'You',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '3W-0L (100%) no UFC',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nenhum oponente em comum. Ambos estao no inicio da trajetoria UFC com oponentes de nivel baixo. Smith tem 2 lutas no UFC, You tem 3. Esta e a primeira vez que ambos enfrentam alguem com recorde perfeito no UFC. O resultado vai separar o verdadeiro contender do prospect.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.10, valueB: 3.00, maxVal: 6, format: 'decimal', note: 'Smith e significativamente mais ativo no striking. Volume alto com intencao de causar dano.' },
        { label: 'Precisao de Strikes (%)', valueA: 45, valueB: 48, maxVal: 100, format: 'percent', note: 'You ligeiramente mais preciso. Escolhe melhor os momentos para atacar.' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.80, valueB: 2.50, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'You absorve menos strikes, reflexo do estilo mais cauteloso e controlado.' },
        { label: 'Defesa de Strikes (%)', valueA: 55, valueB: 58, maxVal: 100, format: 'percent', note: 'Ambos com defesa similar. Nenhum e excepcional defensivamente.' },
        { label: 'Takedowns por 15 Min', valueA: 3.80, valueB: 3.20, maxVal: 5, format: 'decimal', note: 'Smith com leve vantagem em volume de takedowns. Wrestling e sua arma primaria.' },
        { label: 'Precisao de Takedown (%)', valueA: 55, valueB: 48, maxVal: 100, format: 'percent', note: 'Smith converte mais da metade. Background de wrestling desde os 5 anos faz diferenca.' },
        { label: 'Defesa de Takedown (%)', valueA: 65, valueB: 60, maxVal: 100, format: 'percent', note: 'Ambos com defesa razoavel. Nenhum e impossivel de derrubar.' },
        { label: 'Submissoes por 15 Min', valueA: 0.30, valueB: 0.80, maxVal: 2, format: 'decimal', note: 'You com mais ameaca de submissao. Base de sambo e jiu-jitsu aparece aqui.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '23 anos', fighter2: '30 anos', note: 'Smith 7 anos mais jovem — diferenca geracional' },
        { label: 'Altura', fighter1: '1.75m (5\'9")', fighter2: '1.73m (5\'8")', note: 'Praticamente a mesma altura' },
        { label: 'Envergadura', fighter1: '180cm (71")', fighter2: '165cm (65")', note: 'Smith com 6 polegadas de vantagem — significativo' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Mesma base' },
        { label: 'Academia', fighter1: 'Team Victory, Colorado Springs', fighter2: 'Seoul, Coreia do Sul', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Wrestling / Takedowns', valueA: 78, valueB: 70, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Smith e wrestler desde os 5 anos com dois titulos estaduais. 3.80 TD/15min com 55% de precisao. You tambem tem bom wrestling mas o background de Smith e mais profundo.' },
        { label: 'Poder de Finalizacao / Striking', valueA: 75, valueB: 50, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Smith tem poder real com 5 KOs por TKO/KO, incluindo o slam viral. You tem apenas 3 finalizacoes por strikes em 16 vitorias. A diferenca de poder e clara.' },
        { label: 'Grappling / Jiu-Jitsu', valueA: 55, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'You tem base de sambo, jiu-jitsu e 5 submissoes na carreira. Seu "Yoo-Jitsu" e real — controle de posicao e transicoes sao superiores. Smith e mais wrestler que grappler.' },
        { label: 'Controle de Ritmo / QI de Luta', valueA: 55, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'You e mestre em controlar o ritmo da luta. 3-0 no UFC por decisao unanime sem ser ameacado. Smith e mais explosivo mas menos calculado. Experiencia de 19 lutas conta.' },
        { label: 'Atletismo / Explosividade', valueA: 88, valueB: 60, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Smith e um atleta de elite. O slam KO sobre Kazama mostrou forca e explosividade fora do comum. Aos 23 anos, o pico atletico esta chegando. You e bom atleta mas nao nesse nivel.' },
        { label: 'Cardio / Resistencia', valueA: 65, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'You vai a decisao rotineiramente e mantem ritmo consistente por 3 rounds. Smith ainda nao provou cardio completo — o KO no R1 e a decisao contra Morales nao testaram completamente.' },
      ],
      insight: 'O perfil revela um confronto classico: atletismo e poder (<strong class="text-ufc-red">Smith</strong>) contra tecnica e controle (<strong class="text-blue-400">You</strong>). Smith tem vantagens claras em wrestling ofensivo, poder de finalizacao e atletismo puro. You contra-ataca com grappling superior, controle de ritmo e experiencia. A luta se decide por quem consegue impor seu estilo: se Smith dita o ritmo com explosividade, favorece ele. Se You controla e desacelera, favorece o coreano.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Smith',
        ko_tko: { count: 5, percent: 56 },
        submission: { count: 1, percent: 11 },
        decision: { count: 3, percent: 33 },
        total_wins: 9,
      },
      fighter2: {
        nome: 'You',
        ko_tko: { count: 3, percent: 19 },
        submission: { count: 5, percent: 31 },
        decision: { count: 8, percent: 50 },
        total_wins: 16,
      },
      insight: 'Smith e mais explosivo: 56% de KOs mostra poder de finalizacao genuino, incluindo o slam historico. You e mais equilibrado com 50% de decisoes, 31% de submissoes e 19% de KOs — mostra versatilidade mas preferencia por controle e decisao. A diferenca e que Smith pode ACABAR com a luta a qualquer momento, enquanto You prefere dominar por 15 minutos.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM SMITH',
          color: 'red',
          title: 'O Round da Explosao',
          description: 'Smith e mais perigoso no primeiro round quando a explosividade esta no pico. O slam KO sobre Kazama veio no R1. Com wrestling agressivo desde o primeiro segundo, Smith pode estabelecer dominancia cedo com takedowns e ground-and-pound. You precisa sobreviver a tempestade inicial sem ser controlado no chao.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Transicao',
          description: 'O segundo round e o campo de batalha real. Se Smith dominou o R1 com takedowns, pode continuar pressionando. Se You sobreviveu e comecou a encontrar o timing, o ritmo muda. A experiencia de You em lutas de 3 rounds e vantagem aqui — ele sabe como ajustar entre rounds e impor controle gradual.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM YOU',
          color: 'green',
          title: 'O Territorio do Controle',
          description: 'Se a luta chega equilibrada ao terceiro round, You tem vantagem. Seu cardio e experiencia em lutas longas jogam a favor. Smith nunca foi realmente testado no cardio de 3 rounds no UFC — o KO no R1 nao provou nada e a decisao contra Morales nao foi de ritmo intenso. You pode acelerar quando Smith desacelera.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: 'O Slam KO Historico', fighter: 'Smith', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'O 15o slam KO da historia do UFC. Smith mostrou forca explosiva absurda ao levantar Kazama e projetar no chao. Esse tipo de atletismo e raro e intimidante. You vai pensar duas vezes antes de se prender no clinch.' },
        { icon: 'Brain', title: 'Campeao em 4 organizacoes', fighter: 'You', risk_level: 'POSITIVO', risk_color: 'green', description: 'You foi campeao no Naiza, Deep, Zeus e Black Combat. Venceu o Road to UFC. A versatilidade e adaptabilidade para dominar em diferentes organizacoes mostra QI de luta e capacidade de se adaptar a qualquer estilo.' },
        { icon: 'TrendingUp', title: 'Vantagem de envergadura (6 polegadas)', fighter: 'Smith', risk_level: 'POSITIVO', risk_color: 'green', description: 'Com 71 polegadas contra 65, Smith tem vantagem significativa de envergadura. No striking, pode manter distancia. No wrestling, os bracos mais longos ajudam nos takedowns. Vantagem fisica real.' },
        { icon: 'Clock', title: '23 anos vs 30 anos — janela atletica', fighter: 'Smith', risk_level: 'POSITIVO', risk_color: 'green', description: 'Smith esta no auge atletico da juventude com 23 anos. You, aos 30, esta maduro mas comecando a passar do pico fisico. A diferenca de velocidade e tempo de reacao pode ser real.' },
        { icon: 'Shield', title: 'Apenas 10 lutas profissionais', fighter: 'Smith', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Smith tem apenas 10 lutas pro e 2 no UFC. You tem 19 lutas e anos de experiencia internacional. Em momentos de adversidade, a inexperiencia de Smith pode ser explorada.' },
        { icon: 'Activity', title: 'Todas as vitorias UFC por decisao (You)', fighter: 'You', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'You venceu todas as 3 lutas no UFC por decisao unanime. Mostra consistencia mas pode indicar falta de poder de finalizacao no nivel UFC. Contra um lutador explosivo como Smith, pode precisar de mais urgencia.' },
        { icon: 'MapPin', title: 'Pai ex-lutador UFC (Gilbert Smith)', fighter: 'Smith', risk_level: 'POSITIVO', risk_color: 'green', description: 'Smith cresceu no MMA. Pai lutou no UFC, fundou a Team Victory e e seu treinador principal. O conhecimento intimo do octogono e a preparacao mental desde crianca sao vantagens invisiveis enormes.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Smith',
        total_probability: 52,
        scenarios: [
          { name: 'O Slam Sequel', probability: 15, method: 'KO/TKO R1-R2', description: 'Smith repete a formula: wrestling agressivo, takedowns explosivos e ground-and-pound devastador. Pode vir via slam, via socos no chao ou via combinacao de wrestling com strikes. O atletismo superior cria momentos que You nao consegue reagir.' },
          { name: 'Dominacao Atletica', probability: 22, method: 'Decisao Unanime', description: 'Smith usa o wrestling superior e a vantagem de envergadura para controlar o ritmo por 3 rounds. Takedowns consistentes, controle no topo e striking mais longo manteem You na defensiva. Os cartoes refletem a dominancia atletica round a round.' },
          { name: 'A Blitz do Jovem', probability: 15, method: 'TKO R2-R3', description: 'Smith acumula dano com wrestling e strikes nos primeiros rounds. No segundo ou terceiro round, com You acumulando dano, uma sequencia explosiva de ground-and-pound ou strikes em pe finaliza a luta. O poder e diferencial.' },
        ],
      },
      fighter2: {
        nome: 'You',
        total_probability: 45,
        scenarios: [
          { name: 'O Controle Silencioso', probability: 22, method: 'Decisao Unanime', description: 'You neutraliza o wrestling de Smith com defesa de takedown e scrambles inteligentes. Quando a luta vai pro chao, You inverte posicao com o "Yoo-Jitsu" e controla por cima. Acumula pontos com controle, strikes no chao e transicoes. A experiencia vence a explosividade.' },
          { name: 'A Armadilha do Grappling', probability: 12, method: 'Sub R2-R3', description: 'Smith consegue o takedown mas cai na armadilha. You e MELHOR no chao e usa o jiu-jitsu para inverter posicao e buscar uma finalizacao. Smith, mais wrestler que grappler, nao sabe lidar com as transicoes e sucumbe a uma guilhotina ou estrangulamento.' },
          { name: 'Desgaste Tatico', probability: 11, method: 'Decisao Dividida', description: 'You usa clinch, controle contra a grade e pace lento para neutralizar o atletismo de Smith. Em uma luta feia e tatica, a experiencia do coreano faz diferenca nos momentos chave. Uma decisao apertada que poderia ir para qualquer lado.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Elijah Smith',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Esta e uma luta genuinamente equilibrada entre dois prospectos invictos no UFC. Smith tem vantagens em atletismo, poder, wrestling ofensivo e envergadura. You tem vantagens em grappling tecnico, experiencia, controle de ritmo e cardio. A diferenca esta no octogono menor do APEX, que favorece o wrestling agressivo de Smith, e na vantagem fisica (6 polegadas de envergadura, 7 anos mais jovem). Porem, You e perigoso e adaptavel. A confianca e MEDIA porque qualquer resultado e possivel.',
      x_factor: {
        title: 'O Atletismo Sobrenatural de Smith',
        description: 'O slam KO sobre Kazama nao foi apenas poder — foi atletismo de outro nivel. Smith conseguiu levantar um lutador de 135 lbs em plena defesa de takedown e projetar com forca suficiente para nocautear. Esse tipo de atletismo cria momentos imprevisiveis que quebram gameplans. You pode estar preparado para wrestling normal, mas nao para ESSE nivel de explosividade.',
      },
      upset_alert: {
        title: 'Upset Alert: You por Submissao',
        description: 'Se Smith levar a luta pro chao achando que vai controlar, pode cair na armadilha. You e MELHOR no grappling puro com base de sambo, jiu-jitsu e 5 submissoes na carreira. Smith e wrestler, nao grappler — a diferenca e sutil mas real. Uma guilhotina no meio de um takedown ou um estrangulamento pelas costas pode surpreender.',
      },
      probabilities: {
        fighter1: { nome: 'Smith', percent: 52 },
        fighter2: { nome: 'You', percent: 45 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Primeiro Takedown e a Reacao', icon: 'Target', description: 'Ambos vao buscar o takedown. Observe QUEM consegue primeiro e COMO o outro reage. Se Smith derruba e controla, e sinal de dominancia. Se You inverte a posicao no chao, mostra que o grappling tecnico supera o wrestling atletico.' },
        { num: 2, title: 'Tentativa de Slam', icon: 'Zap', description: 'Smith vai tentar slams — e a marca registrada dele. Observe se You se protege no clinch, mantendo base baixa e evitando ser levantado. Se Smith conseguir levantar You, o perigo e real e imediato. Se You neutralizar, tira a arma mais psicologica de Smith.' },
        { num: 3, title: 'Scrambles no Chao', icon: 'Activity', description: 'Os scrambles (transicoes rapidas no chao) vao definir a luta. Smith e mais explosivo nos scrambles, You e mais tecnico. Observe quem acaba por cima depois das transicoes — isso revela quem esta realmente dominando o grappling.' },
        { num: 4, title: 'O Ritmo no Segundo Round', icon: 'Clock', description: 'Preste atencao no ritmo do segundo round. Se Smith continua explosivo, pode dominar 3 rounds. Se comeca a desacelerar, You vai capitalizar com controle e pressao constante. O cardio de Smith e a maior incognita.' },
        { num: 5, title: 'Controle Contra a Grade', icon: 'Shield', description: 'O APEX e um octogono menor, o que aumenta o tempo contra a grade. Observe quem controla quem nessa posicao. Smith vai tentar usar a grade para takedowns. You vai tentar usar para controle e ground game. Quem domina contra a grade provavelmente domina a luta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'SMITH VS YOU', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Galo (135 lbs)\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'ELIJAH SMITH', content: '9-1-0 | Swift\n\n23 anos | 2-0 no UFC\n56% de KOs (incluindo slam historico)\nPerformance da Noite vs Kazama\nWrestler desde os 5 anos', color: 'red' },
        { slide_number: 3, title: 'SUYOUNG YOU', content: '16-3-0 | Yoo-Jitsu\n\n30 anos | 3-0 no UFC\nCampeao em 4 organizacoes\nVencedor do Road to UFC\nBase de sambo e jiu-jitsu', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Smith por Decisao ou TKO tardio\nConfianca: MEDIA\n\n52% Smith | 45% You | 3% Empate\n\nExplosao vs Controle', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Smith vs You sabado no APEX. O cara do SLAM KO viral contra o campeao de 4 organizacoes asiaticas. 23 anos com 9-1 contra 30 anos com 16-3. Os dois invictos no UFC. Uma luta vai acabar.' },
        { num: '2/5', text: 'Elijah Smith: 9-1, 2-0 no UFC, 56% de KOs, slam KO historico, wrestler desde os 5 anos, pai lutou no UFC. Aos 23, pode ser o futuro da divisao dos galos.' },
        { num: '3/5', text: 'SuYoung You: 16-3, 3-0 no UFC, campeao no Naiza/Deep/Zeus/Black Combat, vencedor do Road to UFC. "Yoo-Jitsu" nao e brincadeira — 5 subs e controle sufocante. 7 anos mais velho mas muito mais experiente.' },
        { num: '4/5', text: 'A chave: atletismo vs experiencia. Smith tem 6 polegadas de envergadura a mais e poder explosivo. You tem quase o dobro de lutas e grappling mais tecnico. Quem impoe o estilo vence.' },
        { num: '5/5', text: 'Previsao: Smith por decisao. 52% Smith, 45% You. A luta mais equilibrada do prelim. Qualquer resultado e possivel. Mas CUIDADO: se Smith levar pro chao achando que controla, You pode inverter e finalizar.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O cara do SLAM KO mais brutal do UFC contra um campeao de QUATRO organizacoes. Smith vs You, sabado. Dois invictos no UFC. Um vai cair."' },
        { time: '10-25s', title: 'Os Perfis', text: '"Smith: 23 anos, 9-1, filho de ex-lutador UFC, wrestler desde os 5 anos. O slam sobre Kazama? O 15o da historia do UFC. Performance da Noite. You: 30 anos, 16-3, campeao no Naiza, Deep, Zeus e Black Combat. Venceu o Road to UFC. O apelido Yoo-Jitsu? Sambo + jiu-jitsu = controle total."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Explosao contra controle. Smith com 6 polegadas de envergadura a mais, 56% de KOs, wrestling agressivo. You com 5 submissoes, experiencia de 19 lutas e ritmo sufocante. O APEX pequeno favorece Smith. Mas You sabe se adaptar a qualquer ambiente."' },
        { time: '40-50s', title: 'O Perigo', text: '"Se Smith levar pro chao achando que vai dominar, CUIDADO. You e MELHOR no grappling puro. 5 subs, base de sambo. Smith e wrestler, nao grappler. A diferenca e sutil mas PERIGOSA. Um takedown pode virar uma finalizacao invertida."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Smith por decisao, mas com margem minima. 52-45. A luta mais 50/50 do card. Comenta: explosao ou controle? Segue pra mais analises."' },
      ],
      tiktok: [
        { hook: 'O SLAM KO mais brutal do UFC contra um campeao de QUATRO organizacoes.', body: 'Smith: 23 anos, wrestler desde os 5, pai lutou no UFC, slam que hospitalizou o oponente. You: 30 anos, 16-3, Yoo-Jitsu de verdade, 5 subs, controle absoluto. Dois invictos no UFC. Alguem vai perder pela primeira vez.', cta: 'Quem perde primeiro? Comenta SMITH ou YOU.' },
        { hook: 'SEIS POLEGADAS de vantagem na envergadura num peso galo.', body: 'Smith tem 71 polegadas de envergadura. You tem 65. SEIS de diferenca. Em 135 lbs isso e ENORME. Combinado com 56% de KOs e wrestling desde os 5 anos, Smith e um pesadelo atletico. Mas You tem quase o DOBRO de lutas e grappling de elite.', cta: 'Atletismo ou experiencia? Segue pra mais.' },
        { hook: 'O PERIGO de levar a luta pro chao contra SuYoung You.', body: 'Todo mundo acha que Smith vai dominar no wrestling. Mas You tem base de SAMBO, 5 submissoes e controle de posicao elite. Smith e WRESTLER, nao grappler. A diferenca? You pode inverter qualquer posicao e transformar takedown em finalizacao.', cta: 'Salva esse video. Sabado voce vai lembrar.' },
      ],
      headlines: [
        'Smith vs You: O Slam King Contra o Mestre do Controle Coreano',
        'Elijah Smith: O Fenomeno de 23 Anos dos Galos',
        'SuYoung You: De Campeao em 4 Organizacoes a Invicto no UFC',
        '6 Polegadas de Envergadura: A Vantagem Invisivel de Smith',
        'A Luta 50/50 Mais Intrigante do Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-130',
        fighter2_odds: '+110',
        fighter1_name: 'Smith',
        fighter2_name: 'You',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Poder de Finalizacao de Smith', stat_headline: '56% DE VITORIAS POR KO/TKO (5 DE 9)', contexto: 'Smith tem poder real com mais da metade das vitorias por KO. O slam sobre Kazama e o exemplo maximo de atletismo gerando poder. You tem apenas 19% de KOs — a diferenca de poder e significativa e cria ameaca constante.', implicacao_aposta: 'Cria valor em Smith por KO/TKO se as odds forem boas. A capacidade de acabar com a luta a qualquer momento e a maior vantagem de Smith.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Vantagem de Envergadura Significativa', stat_headline: '71" VS 65" DE ENVERGADURA (6 POLEGADAS)', contexto: 'No peso galo, 6 polegadas de diferenca e enorme. Smith pode manter distancia com jabs, usar os bracos longos para takedowns e controlar o clinch. You vai ter dificuldade para entrar na distancia de striking e grappling.', implicacao_aposta: 'Favorece Smith em mercados de striking total e decisao. A distancia que Smith pode manter torna mais dificil para You implementar o controle.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Experiencia Massiva de You', stat_headline: '19 LUTAS PRO (SEM NCs) VS APENAS 10 DE SMITH', contexto: 'You tem quase o dobro de experiencia profissional e anos de competicao internacional. Campeao em 4 organizacoes diferentes mostra capacidade de adaptacao. Em momentos de adversidade, a experiencia frequentemente decide.', implicacao_aposta: 'Cria valor em You como underdog. Se as odds chegarem a +120 ou mais, a experiencia e o grappling tecnico podem justificar a aposta.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Grappling Tecnico Superior de You', stat_headline: '5 SUBMISSOES NA CARREIRA COM BASE DE SAMBO E JIU-JITSU', contexto: 'You e tecnicamente superior no chao. Smith e wrestler, You e grappler — a distincao e importante. Se a luta for pro chao, You pode inverter posicoes e buscar finalizacoes que Smith nao espera.', implicacao_aposta: 'Cria valor em You por submissao. Se Smith levar a luta pro chao confiante demais, pode ser surpreendido. Odds para You por Sub podem ter valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Cardio Nao Testado de Smith', stat_headline: 'SMITH GANHOU POR KO R1 E DECISAO — CARDIO REAL DESCONHECIDO', contexto: 'Smith nunca foi realmente testado no cardio de 3 rounds em ritmo alto. A decisao contra Morales nao foi de ritmo intenso. Se You arrastar a luta para rounds longos e cansativos, a incognita do cardio pode aparecer.', implicacao_aposta: 'Favorece Over em rounds e decisao. Se a luta for para 3 rounds completos, You provavelmente esta na frente no cardio.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'You ML', odds: '+110 (estimado)', confianca: 'media', edge_vs_mercado: 'Como underdog leve, You oferece valor considerando a experiencia de 19 lutas, grappling tecnico superior e 3-0 no UFC. A luta e genuinamente 50/50.', raciocinio: 'You e mais experiente, tem grappling tecnico superior e nunca foi dominado no UFC. Como underdog, o valor e atrativo para uma luta tao equilibrada.' },
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-130 (estimado)', confianca: 'media', raciocinio: 'Ambos sao grapplers que tendem a controlar em vez de finalizar rapidamente no UFC. 3 de 3 vitorias de You por decisao. Smith tem poder mas You tem defesa e durabilidade. A luta provavelmente vai a decisao.' },
        { tipo: 'Metodo', pick: 'Smith por Decisao', odds: '+150 (estimado)', confianca: 'media', raciocinio: 'Se Smith vencer, provavelmente sera por decisao usando wrestling e controle. You e duro demais para ser finalizado facilmente. O cenario mais provavel de vitoria de Smith.' },
        { tipo: 'Metodo', pick: 'You por Submissao', odds: '+400 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Valor como aposta de risco. Se Smith levar pro chao confiante e You inverter, a finalizacao e possivel.', raciocinio: 'Aposta de alto risco mas com valor se as odds forem boas. You tem grappling tecnico para surpreender um wrestler que se sente seguro no chao.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Smith por KO no Primeiro Round',
        descricao: 'O slam viral contra Kazama cria a ilusao de que Smith vai nocautear todos. Mas Kazama era um oponente de nivel muito inferior. You e MUITO mais experiente, com defesa de takedown decente e inteligencia para evitar posicoes perigosas. Apostar em KO R1 e pagar pelo highlight reel, nao pela analise.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
