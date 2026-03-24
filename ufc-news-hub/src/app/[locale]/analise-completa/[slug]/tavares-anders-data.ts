import type { FullSingleAnalise } from '@/types/analise';

export const tavaresAndersAnalise: FullSingleAnalise = {
  id: 'tavares-anders-ufn-mar-14',
  evento_id: null,
  slug: 'tavares-anders-ufn-mar-14',
  titulo: 'Tavares vs Anders: Veteranos em Rota de Colisao',
  subtitulo: 'Dois amigos e veteranos dos meio-medios se enfrentam em luta agridoce no APEX',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decision', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Brad Tavares', record: '21-12-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Eryk Anders', record: '17-9-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Medio',
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
      categoria_peso: 'Peso Medio (185 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O RECORDE HISTORICO EM JOGO',
      tagline_sub: 'Tavares busca quebrar o recorde de Bisping em vitorias no peso medio. Anders quer estragar a festa.',
      fighter1: {
        nome_completo: 'Brad Tavares',
        apelido: '',
        sobrenome: 'Tavares',
        record: '21-12-0',
        ranking: 'Sem ranking MW',
        info_extra: 'Kailua, Hawaii | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Eryk "Ya Boi" Anders',
        apelido: 'Ya Boi',
        sobrenome: 'Anders',
        record: '17-9-0',
        ranking: 'Sem ranking MW',
        info_extra: 'Birmingham, Alabama | 38 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Recorde Que Bisping Nunca Imaginou Perder</h3>
        <p><strong class="text-ufc-red">Brad Tavares</strong> esta a uma vitoria de fazer historia. Com 16 vitorias no peso medio do UFC, ele igualou Michael Bisping no recorde de todos os tempos da divisao. Uma vitoria sobre Anders o coloca sozinho no topo — um feito que parecia impossivel quando ele comecou sua jornada no The Ultimate Fighter 11, em 2010. Sao 16 anos de carreira no UFC, 28 lutas na organizacao, e agora a chance de ser o maior vencedor da historia dos meio-medios.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Despedida Agridoce</h3>
        <p><strong class="text-blue-400">Eryk Anders</strong> esta numa posicao unica. Aos 38 anos, com recorde de 9-9-1 no UFC, essa pode ser sua ultima luta na organizacao. O ex-linebacker da Universidade do Alabama quer sair com recorde positivo — mas para isso, precisa estragar a festa historica de Tavares. Anders descreveu a luta como "agridoce" ja que ele e Tavares sao amigos de longa data. Mas dentro do octogono, amizade nao conta.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Narrativa Perfeita</h3>
        <p>Essa e uma luta com camadas de significado. Para <strong class="text-ufc-red">Tavares</strong>, e a imortalidade estatistica. Para <strong class="text-blue-400">Anders</strong>, e a dignidade de sair pela porta da frente. Ambos vem de derrotas por TKO — Tavares para Duncan, Anders para Duncan tambem (curiosamente, o mesmo oponente em sequencia). A questao e quem se recupera melhor da adversidade em seus ultimos capitulos.</p>
      `,
      stakes: [
        { dimensao: 'Recorde', fighter1: 'Pode se tornar o maior vencedor da historia do MW no UFC', fighter2: 'Quer sair do UFC com recorde positivo (10-9-1)' },
        { dimensao: 'Legado', fighter1: '16 anos de carreira no UFC, 28 lutas', fighter2: 'Ex-atleta da NFL, transicao para MMA' },
        { dimensao: 'Objetivo', fighter1: 'Quebrar recorde de Bisping', fighter2: 'Encerrar carreira no UFC com vitoria' },
        { dimensao: 'Risco', fighter1: 'Perder para amigo em luta historica', fighter2: 'Sair do UFC com recorde negativo' },
        { dimensao: 'Emocao', fighter1: 'Amigos de longa data se enfrentando', fighter2: 'Descreveu a luta como "agridoce"' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'TAVARES FAZ HISTORIA',
          subtitulo: '17 vitorias no peso medio do UFC. Sozinho no topo, acima de Bisping.',
          consequencias: [
            { tag: 'RECORDE', texto: 'Se torna o maior vencedor da historia do peso medio no UFC, superando Michael Bisping.' },
            { tag: 'LEGADO', texto: 'Cimenta 16 anos de carreira no UFC com um feito historico que dificilmente sera igualado.' },
            { tag: 'NARRATIVA', texto: 'A historia do garoto do Hawaii que veio do TUF 11 e se tornou o rei estatistico dos meio-medios.' },
          ],
          proxima_luta: 'Possivel luta de aposentadoria ou oponente para continuar expandindo o recorde',
        },
        fighter2_vence: {
          titulo: 'ANDERS ESTRAGA A FESTA',
          subtitulo: 'Ya Boi sai do UFC com recorde positivo as custas do amigo.',
          consequencias: [
            { tag: 'RECORDE', texto: 'Recorde vai para 10-9-1 no UFC. Positivo. A missao esta cumprida.' },
            { tag: 'DIGNIDADE', texto: 'Sai pela porta da frente com uma vitoria sobre um veterano respeitado de 28 lutas no UFC.' },
            { tag: 'AMIZADE', texto: 'Nega o momento historico de Tavares, adicionando uma camada emocional complicada.' },
          ],
          proxima_luta: 'Possivel aposentadoria ou ultima luta no UFC',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Brad Tavares',
        color: 'red',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Robert Bryczek', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parado no terceiro round por prospecto. Mostra vulnerabilidade contra lutadores mais jovens e explosivos.' },
          { date: 'Abr 2025', opponent: 'Gerald Meerschaert', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Igualou recorde de Bisping com 16a vitoria no MW. Vitoria solida por decisao contra veterano.' },
          { date: 'Out 2024', opponent: 'Jun Yong Park', result: 'L', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Perdeu decisao apertada. Luta competitiva que poderia ter ido para qualquer lado.' },
          { date: 'Ago 2023', opponent: 'Chris Weidman', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Derrotou ex-campeao em seu retorno. Vitoria significativa para o legado.' },
          { date: 'Abr 2023', opponent: 'Bruno Silva', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no primeiro round por Bruno Silva (MW). Derrota surpreendente e rapida.' },
        ],
        momentum_score: 4,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'descending',
        momentum_note: 'Tavares esta numa fase inconsistente. A vitoria historica sobre Meerschaert foi seguida por um TKO loss para Bryczek, mostrando que o veterano de 38 anos esta vulneravel contra lutadores mais jovens e explosivos. O recorde recente de 2-3 nas ultimas 5 sugere que o declinio natural da idade esta se manifestando, mas a experiencia e sabedoria tatica ainda sao enormes.',
      },
      fighter2: {
        nome: 'Eryk Anders',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Christian Leroy Duncan', result: 'L', method: 'TKO R1 (spinning back elbow)', opponent_rank: '#12 MW', quality_score: 4, quality_label: 'Muito Bom', note: 'Parado por golpe giratório no primeiro round. Duncan e prospecto de elite.' },
          { date: 'Dez 2024', opponent: 'Chris Weidman', result: 'W', method: 'TKO R2 (GnP)', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Parou ex-campeao no segundo round com ground and pound. Aposentou Weidman.' },
          { date: 'Mar 2024', opponent: 'Jamie Pickett', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida por decisao. Mostrou melhoria no cardio e no gameplan.' },
          { date: 'Jun 2023', opponent: 'Marc-Andre Barriault', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu por decisao em Luta da Noite. Luta competitiva mas nao fez o suficiente.' },
        ],
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Anders esta numa fase similar a Tavares: alternando vitorias e derrotas. A vitoria por TKO sobre Weidman mostrou que ainda tem poder e habilidade no chao, mas a derrota rapida para Duncan revelou vulnerabilidade contra strikers explosivos. Com recorde de 9-9-1 no UFC, precisa desta vitoria para terminar com saldo positivo.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Tavares',
        media_oponentes: 2.4,
        media_oponentes_label: 'Medio',
        aproveitamento: '2W-3L (40%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Anders',
        media_oponentes: 2.8,
        media_oponentes_label: 'Bom',
        aproveitamento: '2W-2L (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 2, fighter2: 2 },
      oponentes_em_comum_note: 'Tavares e Anders enfrentaram Chris Weidman e Christian Leroy Duncan. Ambos derrotaram Weidman: Tavares por decisao, Anders por TKO. Ambos perderam para Duncan: Tavares por TKO, Anders por TKO. A comparacao mostra perfis muito similares nesta fase das carreiras — veteranos que vencem gatekeepers mas perdem para a nova geracao.',
    },

    oponente_comum: {
      oponente_nome: 'Chris Weidman',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: 'Decisao Unanime (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Tavares controlou o ritmo contra um Weidman que estava tentando retornar apos lesoes. Usou jab e movimentacao para acumular pontos sem tomar riscos desnecessarios.',
        performance: 'Vitoria inteligente e segura. Tavares mostrou sabedoria tatica ao nao se envolver em trocas pesadas com Weidman e venceu no volume e controle de distancia.',
        evento: 'UFC 292',
        data: 'Ago 2023',
      },
      fighter2_result: {
        resultado: 'Vitoria por TKO R2',
        metodo: 'TKO R2 (ground and pound)',
        duracao: '2 rounds (4:51 no R2)',
        contexto: 'Anders usou seu background de wrestling para derrubar Weidman e dominar no chao. Terminou com ground and pound pesado no segundo round.',
        performance: 'Vitoria impressionante e dominante. Anders mostrou poder no chao e wrestling superior contra o ex-campeao. O TKO foi enfatico e encerrou a carreira de Weidman no UFC.',
        evento: 'UFC 310',
        data: 'Dez 2024',
      },
      insight: 'Ambos derrotaram Weidman, mas de maneiras diferentes que revelam seus estilos. Tavares venceu por decisao usando distancia e tecnica — o caminho seguro. Anders venceu por TKO no chao usando wrestling e poder — o caminho agressivo. Contra Tavares, Anders provavelmente vai tentar reproduzir o gameplan que funcionou contra Weidman: takedowns e ground and pound.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.42, valueB: 3.54, maxVal: 6, format: 'decimal', note: 'Valores muito proximos. Ambos tem volume moderado de strikes.' },
        { label: 'Precisao de Strikes (%)', valueA: 43, valueB: 48, maxVal: 100, format: 'percent', note: 'Anders levemente mais preciso. Ambos na faixa media.' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.36, valueB: 4.05, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Tavares absorve menos dano. Anders e mais poroso defensivamente.' },
        { label: 'Defesa de Strikes (%)', valueA: 54, valueB: 50, maxVal: 100, format: 'percent', note: 'Vantagem leve de Tavares. Ambos na faixa media-baixa.' },
        { label: 'Takedowns por 15 Min', valueA: 0.88, valueB: 1.71, maxVal: 4, format: 'decimal', note: 'Anders tenta quase o dobro de takedowns. Background de wrestling da Alabama.' },
        { label: 'Precisao de Takedown (%)', valueA: 37, valueB: 36, maxVal: 100, format: 'percent', note: 'Precisao identica e baixa para ambos. Menos de 40% de conversao.' },
        { label: 'Defesa de Takedown (%)', valueA: 81, valueB: 80, maxVal: 100, format: 'percent', note: 'Valores praticamente identicos. Ambos com boa defesa de takedown.' },
        { label: 'Submissoes por 15 Min', valueA: 0.10, valueB: 0.20, maxVal: 2, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '38 anos', note: 'Mesma idade — ambos na reta final das carreiras' },
        { label: 'Altura', fighter1: '1.85m (6\'1")', fighter2: '1.85m (6\'1")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '188cm (74")', fighter2: '191cm (75")', note: 'Anders com 1 polegada a mais — diferenca minima' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Canhoto (Southpaw)', note: 'Dinamica ortodoxo vs canhoto' },
        { label: 'Academia', fighter1: 'Xtreme Couture, Las Vegas', fighter2: 'Fight Ready MMA, Arizona', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking Tecnico', valueA: 65, valueB: 58, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Tavares tem 16 anos de experiencia no UFC e um jab mais refinado. Anders e mais explosivo mas menos tecnico. A diferenca e marginal.' },
        { label: 'Poder de Nocaute', valueA: 50, valueB: 72, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Anders tem 10 KOs em 17 vitorias (59%). Tavares tem apenas 5 KOs em 21 vitorias (24%). Anders e significativamente mais perigoso com as maos.' },
        { label: 'Wrestling / Takedowns', valueA: 48, valueB: 62, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Anders tem background de linebacker da Alabama e tenta 1.71 TD/15min. Tavares e mais um striker que um wrestler, com apenas 0.88 TD/15min.' },
        { label: 'Defesa / Durabilidade', valueA: 62, valueB: 52, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Tavares absorve menos strikes (3.36 vs 4.05 SApM) com melhor defesa percentual (54% vs 50%). Experiencia de 28 lutas no UFC contribui.' },
        { label: 'Cardio / Resistencia', valueA: 68, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Tavares construiu carreira vencendo por decisao (14 de 21 vitorias). Anders historicamente desacelera nos rounds finais. 16 das vitorias de Tavares foram por decisao.' },
        { label: 'Experiencia no UFC', valueA: 85, valueB: 65, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Tavares tem 28 lutas no UFC desde 2010. Anders tem 20 desde 2017. A diferenca de experiencia e significativa em momentos de pressao e adversidade.' },
      ],
      insight: 'Os perfis revelam uma luta equilibrada com vantagens em areas diferentes. <strong class="text-ufc-red">Tavares</strong> e superior em tecnica de striking, defesa, cardio e experiencia. <strong class="text-blue-400">Anders</strong> tem vantagem em poder de nocaute e wrestling. A luta sera decidida pelo ritmo: se Tavares controlar a distancia, vence nos pontos. Se Anders encurtar e usar o wrestling, pode surpreender.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Tavares',
        ko_tko: { count: 5, percent: 24 },
        submission: { count: 2, percent: 10 },
        decision: { count: 14, percent: 66 },
        total_wins: 21,
      },
      fighter2: {
        nome: 'Anders',
        ko_tko: { count: 10, percent: 59 },
        submission: { count: 1, percent: 6 },
        decision: { count: 6, percent: 35 },
        total_wins: 17,
      },
      insight: 'A diferenca e gritante. Tavares e um lutador de decisao: 66% das vitorias nos cartoes, o perfil classico de um veterano que sabe pontuar. Anders e um finalizador: 59% de KOs, com poder real nas maos. Tavares quer uma luta longa e tecnica. Anders quer resolver com um golpe. Estilos diametralmente opostos.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM ANDERS',
          color: 'green',
          title: 'O Poder do Canhoto',
          description: 'O primeiro round e o mais perigoso para Tavares. Anders como canhoto cria angulos diferentes e a mao esquerda de poder pode surpreender. O ex-linebacker tem explosividade atletica e suas melhores performances vem nos minutos iniciais. Tavares precisa ser cauteloso e nao se envolver em trocas pesadas cedo.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Transicao',
          description: 'No segundo round, o ritmo comeca a mudar. Se Tavares sobreviveu o primeiro round intacto, sua experiencia e cardio comecam a aparecer. Anders pode tentar takedowns para manter o controle, mas a defesa de Tavares (81%) e boa. Esse e o round onde a luta se define.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM TAVARES',
          color: 'red',
          title: 'Territorio do Veterano',
          description: 'O terceiro round e onde Tavares brilha. Com 14 vitorias por decisao, ele sabe como fechar lutas nos cartoes. Anders historicamente desacelera, e o cardio do hawaiano e superior. Se a luta esta equilibrada chegando ao R3, Tavares tem a experiencia e a resistencia para levar.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Recorde historico em jogo', fighter: 'Tavares', risk_level: 'POSITIVO', risk_color: 'green', description: 'A motivacao de quebrar o recorde de Bisping em vitorias no peso medio e enorme. Tavares sabe que essa e provavelmente sua melhor chance de fazer historia. Motivacao extra pode ser o diferencial em uma luta apertada.' },
        { icon: 'Brain', title: 'Amigos se enfrentando no octogono', fighter: 'Tavares', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'Tavares e Anders sao amigos de longa data. Anders descreveu a luta como "agridoce". Em teoria, ambos podem hesitar em momentos cruciais, mas profissionais geralmente separam amizade de competicao dentro do octogono.' },
        { icon: 'Zap', title: 'Poder de nocaute como canhoto', fighter: 'Anders', risk_level: 'POSITIVO', risk_color: 'green', description: 'Anders e canhoto com 10 KOs (59% das vitorias). A mao esquerda de poder vem de angulos que ortodoxos nao estao acostumados. O TKO sobre Weidman mostrou que o poder esta intacto aos 38 anos.' },
        { icon: 'Activity', title: 'Cardio questionavel em lutas longas', fighter: 'Anders', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Anders tem 6 vitorias por decisao em 17, sugerindo que pode ir a distancia, mas historicamente desacelera. Contra Tavares, que vive de ir a distancia (66% decisoes), o cardio pode ser o fator decisivo.' },
        { icon: 'Clock', title: 'Declinio natural da idade (ambos 38)', fighter: 'Tavares', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Ambos tem 38 anos e estao claramente na fase final das carreiras. Tavares perdeu por TKO para Bryczek e Anders para Duncan. A durabilidade e reflexos naturalmente diminuem. Quem sera pego primeiro?' },
        { icon: 'Shield', title: '28 lutas no UFC — experiencia inigualavel', fighter: 'Tavares', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Tavares tem 28 lutas no UFC desde 2010. Esse nivel de experiencia e quase impossivel de replicar. Em momentos de pressao, de adversidade, de decisoes taticas, Tavares ja viu e viveu absolutamente tudo.' },
        { icon: 'AlertTriangle', title: 'Ambos vem de derrotas por TKO', fighter: 'Anders', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Tanto Tavares quanto Anders vem de derrotas por TKO para oponentes mais jovens (Bryczek e Duncan). Ambos podem estar com o queixo mais vulneravel, adicionando uma camada de imprevisibilidade.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Tavares',
        total_probability: 53,
        scenarios: [
          { name: 'O Piloto Automatico do Veterano', probability: 28, method: 'Decisao Unanime', description: 'Tavares usa o jab, mantem distancia, acumula volume ao longo de 3 rounds. A experiencia de 28 lutas no UFC e o cardio superior permitem que ele controle o ritmo sem tomar riscos desnecessarios. Mais um capitulo do livro de decisoes de Tavares.' },
          { name: 'Desgaste e TKO Tardio', probability: 12, method: 'TKO R3', description: 'Tavares acumula dano ao longo dos dois primeiros rounds e encontra Anders cansado no terceiro. Com a defesa de Anders comprometida pelo cansaco, Tavares conecta uma combinacao que forca a parada. Improvavel dado o baixo poder de KO de Tavares (24%).' },
          { name: 'Decisao Apertada', probability: 13, method: 'Decisao Dividida', description: 'Luta equilibrada que poderia ir para qualquer lado, mas Tavares faz o suficiente para convencer dois dos tres juizes. A experiencia e o controle de distancia fazem a diferenca nos momentos decisivos.' },
        ],
      },
      fighter2: {
        nome: 'Anders',
        total_probability: 44,
        scenarios: [
          { name: 'A Mao Esquerda do Canhoto', probability: 18, method: 'KO/TKO R1-R2', description: 'Anders conecta a mao esquerda de poder nos momentos iniciais, quando a explosividade esta no pico. O angulo do canhoto pode surpreender Tavares, que vem de um KO loss recente. O mesmo tipo de poder que parou Weidman.' },
          { name: 'Wrestling de Alabama', probability: 14, method: 'Decisao Unanime', description: 'Anders usa o background de linebacker para controlar Tavares com takedowns e clinch. Acumula tempo de controle e ground and pound para vencer nos cartoes. Gameplan similar ao que funcionou contra Weidman.' },
          { name: 'Ground and Pound Brutal', probability: 12, method: 'TKO R2 (GnP)', description: 'Anders derruba Tavares e descarrega ground and pound pesado, reproduzindo exatamente o que fez com Weidman. Se conseguir posicao dominante no chao, o poder de Anders e devastador.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Brad Tavares',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Em uma luta de dois veteranos de 38 anos ambos vindo de derrotas, Tavares tem a vantagem em experiencia (28 vs 20 lutas no UFC), cardio (66% das vitorias por decisao vs 35%) e defesa (absorve menos strikes). A motivacao do recorde historico adiciona um fator emocional. Porem, Anders tem poder real (59% KOs) e o wrestling de Alabama pode complicar. A confianca e MEDIA porque ambos estao em declinio e qualquer golpe pode terminar a luta.',
      x_factor: {
        title: 'O Recorde de Bisping Como Motivacao',
        description: 'Tavares sabe que esta a uma vitoria de ser o maior vencedor da historia do peso medio no UFC. Esse tipo de motivacao historica pode elevar o nivel de um lutador em momentos decisivos. Em uma luta apertada, a vontade de fazer historia pode ser o diferencial entre vencer e perder.',
      },
      upset_alert: {
        title: 'Upset Alert: Anders por KO no Primeiro Round',
        description: 'Anders e canhoto com 10 KOs na carreira. A mao esquerda de poder cria angulos perigosos contra ortodoxos. Tavares vem de um TKO loss para Bryczek e pode estar com o queixo mais vulneravel. Se Anders conectar algo limpo nos primeiros 5 minutos, o recorde de Bisping continua intacto.',
      },
      probabilities: {
        fighter1: { nome: 'Tavares', percent: 53 },
        fighter2: { nome: 'Anders', percent: 44 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Tavares ML', reasoning: 'Vantagem em experiencia, cardio e defesa. A motivacao do recorde historico e um bonus. Favorito moderado e justo.' },
        method: { pick: 'Tavares por Decisao', reasoning: '66% das vitorias por decisao. E o caminho mais provavel contra um oponente de nivel similar.' },
        over_under: { pick: 'Over 2.5 Rounds', rounds: 2.5, reasoning: 'Ambos tem defesa de takedown de 80%+ e sao veteranos que sabem sobreviver. Alta probabilidade de ir a distancia.' },
        best_value: 'Over 2.5 rounds — dois veteranos que conhecem a arte de sobreviver.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Dinamica Ortodoxo vs Canhoto', icon: 'Zap', description: 'Tavares e ortodoxo, Anders e canhoto. Essa dinamica cria oportunidades para ambos: o direto de Tavares alinha com a mao esquerda de Anders. Observe quem encontra o timing primeiro — pode decidir a luta. A mao de tras do canhoto e sempre perigosa.' },
        { num: 2, title: 'Tentativas de Takedown de Anders', icon: 'Shield', description: 'Anders tenta 1.71 takedowns por 15 min. Tavares defende 81%. Se Anders mudar para wrestling cedo, e sinal de que nao quer trocar em pe por 3 rounds. Se ficar em pe, esta confiante no poder das maos. A escolha tatica de Anders no R1 revela o gameplan.' },
        { num: 3, title: 'O Cardio no Terceiro Round', icon: 'Activity', description: 'Se a luta chegar ao terceiro round, observe quem esta mais fresco. Tavares construiu carreira vencendo rounds finais. Anders tende a desacelerar. Se ambos estao cansados, a experiencia de Tavares em lutas longas deve prevalecer.' },
        { num: 4, title: 'O Momento Emocional', icon: 'Brain', description: 'Tavares esta a uma vitoria do recorde historico. Anders quer sair do UFC com recorde positivo. Ambos tem motivacoes enormes. Observe se a emocao do momento atrapalha ou ajuda — lutadores motivados as vezes lutam melhor, as vezes ficam ansiosos.' },
        { num: 5, title: 'Clinch na Grade', icon: 'MapPin', description: 'No octogono menor do APEX, o clinch contra a grade pode ser frequente. Anders tem vantagem no clinch com o background de wrestling. Tavares precisa se manter no centro para usar o jab e a distancia. Quem controla a posicao na grade controla a luta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'TAVARES VS ANDERS', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Medio\n3 Rounds\nAmigos. Rivais. Historia.', color: 'red' },
        { slide_number: 2, title: 'BRAD TAVARES', content: '21-12-0 | O Veterano do Hawaii\n\n28 lutas no UFC desde 2010\n16 vitorias no MW = recorde de Bisping\n66% das vitorias por decisao\nXtreme Couture, Las Vegas', color: 'red' },
        { slide_number: 3, title: 'ERYK ANDERS', content: '17-9-0 | Ya Boi\n\nEx-linebacker da Universidade do Alabama\n10 KOs (59% das vitorias)\nCanhoto com poder real\n9-9-1 no UFC — quer sair positivo', color: 'blue' },
        { slide_number: 4, title: 'A HISTORIA', content: 'RECORDE HISTORICO EM JOGO\n\nTavares: 1 vitoria = maior vencedor\nda historia do MW no UFC\n\nAnders: 1 vitoria = sai do UFC\ncom recorde positivo\n\nAmigos se enfrentando.', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Tavares vs Anders sabado. A luta mais AGRIDOCE do card. Amigos de longa data. Mas Tavares esta a UMA vitoria de quebrar o recorde de Bisping em vitorias no peso medio do UFC. 17a vitoria seria historica.' },
        { num: '2/5', text: 'Brad Tavares: 28 lutas no UFC desde 2010. DEZESSEIS ANOS na organizacao. 16 vitorias no MW, empatado com Bisping. 66% das vitorias por decisao. O veterano mais resiliente da divisao.' },
        { num: '3/5', text: 'Eryk Anders: ex-linebacker da Alabama com 10 KOs. Canhoto. 9-9-1 no UFC — quer sair com recorde positivo. A mao esquerda de poder pode estragar o momento historico de Tavares. O TKO sobre Weidman mostra que o poder esta la.' },
        { num: '4/5', text: 'Ambos derrotaram Weidman. Ambos perderam para Duncan. Perfis quase identicos nesta fase. A diferenca: Tavares vive de decisao (66%), Anders vive de KO (59%). Quem impoe o ritmo vence.' },
        { num: '5/5', text: 'Previsao: Tavares por decisao. 53-44. A experiencia e o cardio devem prevalecer. Mas Anders como canhoto e PERIGOSO. Se conectar a mao esquerda no R1, o recorde de Bisping continua intacto.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O maior vencedor da HISTORIA do peso medio no UFC. Ou nao. Tavares precisa de UMA vitoria pra superar Bisping — e o obstaculo e seu AMIGO Eryk Anders."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Tavares: 28 lutas no UFC, 16 anos na organizacao, 16 vitorias no MW empatado com Bisping. 66% por decisao. Anders: ex-linebacker, canhoto, 10 KOs, 9-9-1 no UFC querendo sair positivo."' },
        { time: '25-40s', title: 'A Historia', text: '"Eles sao amigos. Anders descreveu a luta como agridoce. Mas dentro do octogono, amizade nao conta. Tavares quer historia, Anders quer dignidade. Ambos tem 38 anos. Ambos vem de derrotas por TKO. Quem se recupera melhor?"' },
        { time: '40-50s', title: 'Analise', text: '"Tavares vence por distancia e cardio. Anders vence por poder e wrestling. Se a luta for longa, Tavares. Se Anders conectar cedo, surpresa. O terceiro round e onde 16 anos de experiencia fazem diferenca."' },
        { time: '50-60s', title: 'CTA', text: '"Tavares faz historia ou Anders estraga a festa? Comenta RECORDE ou YA BOI. Me segue pra analise completa de cada luta do card."' },
      ],
      tiktok: [
        { hook: '16 ANOS no UFC. UMA vitoria pra fazer HISTORIA.', body: 'Brad Tavares esta a uma vitoria de ser o MAIOR VENCEDOR da historia do peso medio no UFC. Mais que Bisping. Mais que Anderson Silva em numero de vitorias na divisao. O obstaculo? Seu amigo Eryk Anders, canhoto com 10 KOs.', cta: 'Ele quebra o recorde? Comenta SIM ou NAO.' },
        { hook: 'Eles sao AMIGOS. Mas um precisa destruir o sonho do outro.', body: 'Tavares e Anders se conhecem ha anos. Anders chamou a luta de AGRIDOCE. Mas Tavares quer o recorde historico e Anders quer sair do UFC com recorde positivo. Alguem vai ficar decepcionado sabado.', cta: 'Segue pra mais historias como essa do UFC.' },
        { hook: 'O lutador com MAIS lutas no peso medio da HISTORIA do UFC.', body: 'Brad Tavares: 28 lutas como peso medio no UFC desde 2010. Nenhum outro lutador chegou perto. 16 vitorias, empatado com Bisping. Uma vitoria sabado e ele e o NUMERO 1. Pra sempre.', cta: 'Salva esse video e me conta sabado se ele conseguiu.' },
      ],
      headlines: [
        'Tavares vs Anders: O Recorde de Bisping Esta em Jogo',
        'Amigos no Octogono: A Luta Mais Agridoce do Card',
        '17a Vitoria Faria de Tavares o Maior Vencedor do MW na Historia',
        'Anders Quer Estragar a Festa Historica de Tavares',
        'Dois Veteranos de 38 Anos, Uma Historia Para Contar',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-145',
        fighter2_odds: '+120',
        fighter1_name: 'Tavares',
        fighter2_name: 'Anders',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Experiencia Inigualavel', stat_headline: '28 LUTAS NO UFC DESDE 2010 — MAIS DO QUE QUALQUER PESO MEDIO NA HISTORIA', contexto: 'Tavares tem a maior experiencia no octogono da divisao. Em lutas apertadas entre veteranos, a experiencia em momentos de pressao e adversidade e o fator que nao aparece nas estatisticas.', implicacao_aposta: 'Favorece Tavares em lutas que vao para decisao. Se a luta for longa e tatica, a experiencia de Tavares e praticamente impossivel de igualar.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Poder de KO de Anders', stat_headline: '10 KOS EM 17 VITORIAS (59%) — CANHOTO COM MAO ESQUERDA DE PODER', contexto: 'Anders e um dos lutadores mais perigosos do roster em termos de poder puro. O stance de canhoto cria angulos que muitos ortodoxos nao estao acostumados. O TKO sobre Weidman no UFC 310 mostrou que o poder esta intacto.', implicacao_aposta: 'Cria valor em Anders por KO/TKO, especialmente no primeiro round. Se as odds estiverem acima de +200, pode ter valor como aposta de risco.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Diferenca de Cardio', stat_headline: 'TAVARES COM 66% DAS VITORIAS POR DECISAO VS 35% DE ANDERS', contexto: 'A diferenca de resistencia e clara: Tavares foi construido para ir a distancia. Anders prefere resolver cedo. Em uma luta de 3 rounds, Tavares deve estar mais fresco no round final.', implicacao_aposta: 'Favorece Tavares em Over 2.5 rounds e em mercados de decisao. Se a luta passar do segundo round, a probabilidade de Tavares vencer aumenta significativamente.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Takedown Solida de Ambos', stat_headline: '81% TAVARES VS 80% ANDERS — VALORES PRATICAMENTE IDENTICOS', contexto: 'Ambos defendem takedowns a taxas muito similares. Isso sugere que a luta provavelmente sera decidida em pe, onde Tavares tem vantagem em tecnica e cardio mas Anders tem vantagem em poder.', implicacao_aposta: 'Diminui o impacto do wrestling como fator. A luta provavelmente sera decidida em pe, o que favorece analise baseada em striking e cardio.', edge_level: 'leve', fighter_side: 'neutral' },
        { icon: 'Brain', titulo: 'Motivacao do Recorde Historico', stat_headline: 'TAVARES A 1 VITORIA DE SUPERAR BISPING COMO MAIOR VENCEDOR DO MW', contexto: 'A motivacao de fazer historia pode ser um fator intangivel significativo. Tavares sabe que esta perto de um feito que ninguem mais conseguiu em 30+ anos de UFC.', implicacao_aposta: 'Favorece Tavares marginalmente. Motivacao extra pode ser o diferencial em rounds apertados.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '+110 (estimado)', confianca: 'alta', edge_vs_mercado: 'Dois veteranos de 38 anos com boa defesa de takedown (80%+) e experiencia para sobreviver. Alta probabilidade de ir a distancia.', raciocinio: 'Tavares venceu 66% das lutas por decisao. Anders tem boa defesa. Ambos sao profissionais experientes que sabem se proteger. A probabilidade de 3 rounds completos e alta.' },
        { tipo: 'Moneyline', pick: 'Tavares ML', odds: '-145 (estimado)', confianca: 'media', edge_vs_mercado: 'Preco justo para o favorito. Vantagem em cardio e experiencia contra um Anders que historicamente desacelera.', raciocinio: 'Tavares tem as ferramentas para controlar 3 rounds. O preco nao e absurdo e reflete uma vantagem real em cardio e experiencia.' },
        { tipo: 'Metodo', pick: 'Tavares por Decisao', odds: '+120 (estimado)', confianca: 'media', raciocinio: 'O caminho mais provavel dado o historico de ambos. Tavares vence por decisao na maioria dos cenarios favoraveis. Bom valor a odds positivas.' },
        { tipo: 'Metodo', pick: 'Anders por KO/TKO R1', odds: '+400 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Aposta de risco com valor potencial. Anders tem poder real e o stance de canhoto pode surpreender Tavares.', raciocinio: 'Se Anders vai vencer, provavelmente e por KO cedo. O poder de 59% de KOs e o stance de canhoto criam uma janela de oportunidade no R1.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Anders por Decisao',
        descricao: 'Apostar em Anders por decisao e arriscado. Anders tem apenas 35% de vitorias por decisao e historicamente desacelera em lutas longas. Se a luta for para os cartoes, Tavares — com 66% de vitorias por decisao e 28 lutas de experiencia — provavelmente esta na frente. Anders ou resolve cedo ou perde.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
