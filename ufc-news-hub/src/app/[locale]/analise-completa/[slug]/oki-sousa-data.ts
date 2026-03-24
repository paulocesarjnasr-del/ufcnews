import type { FullSingleAnalise } from '@/types/analise';

export const okiSousaAnalise: FullSingleAnalise = {
  id: 'oki-sousa-ufn-mar-14',
  evento_id: null,
  slug: 'oki-sousa-ufn-mar-14',
  titulo: 'Oki vs Sousa: O Guerreiro Zulu Contra o Estreante Brasileiro',
  subtitulo: 'Dois finalizadores se enfrentam numa guerra de poder nos leves',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'KO/TKO ou Decision', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Bolaji Oki', record: '10-3-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Manoel Sousa', record: '13-1-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Leve',
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
      categoria_peso: 'Peso Leve (155 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O GUERREIRO ZULU CONTRA A FOME BRASILEIRA',
      tagline_sub: 'Oki busca recuperar momentum. Sousa faz sua estreia no UFC com 13-1 e fome de vencer.',
      fighter1: {
        nome_completo: 'Bolaji "The Zulu Warrior" Oki',
        apelido: 'The Zulu Warrior',
        sobrenome: 'Oki',
        record: '10-3-0',
        ranking: 'Sem ranking LW',
        info_extra: 'Bruxelas, Belgica | 30 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Manoel "Manumito" Sousa',
        apelido: 'Manumito',
        sobrenome: 'Sousa',
        record: '13-1-0',
        ranking: 'Sem ranking LW',
        info_extra: 'Sao Paulo, Brasil | 25 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Guerreiro de Bruxelas</h3>
        <p><strong class="text-ufc-red">Bolaji Oki</strong> tem uma historia que vai alem do octogono. Nascido em Bruxelas com raizes na cultura Zulu, o belga construiu sua carreira desde gyms locais na Belgica ate o UFC. Com um estilo marcado por ataques ao corpo devastadores e uma vontade de empurrar o ritmo, Oki chamou atencao com 5 KOs e uma finalizacao por guilhotina em 10 vitorias. Mas a realidade do UFC tem sido um vale de altos e baixos: 2-2 na organizacao, com derrotas dolorosas para Chris Duncan (guilhotina R1) e Mason Jones (TKO R2). Aos 30 anos, Oki precisa de consistencia para se estabelecer na divisao mais lotada do UFC.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Estreante com Fome</h3>
        <p><strong class="text-blue-400">Manoel Sousa</strong> e o tipo de estreante que faz o UFC prestar atencao. Com recorde de 13-1 e 8 KOs, o brasileiro conquistou seu contrato no Contender Series em agosto de 2025 com uma finalizacao no terceiro round sobre Cristian Perez. O paulista que trocou o trabalho bracao pela luta carrega a fome de quem lutou por tudo na vida. Sua unica derrota — uma decisao para Archie Colgan em 2024 — e a unica mancha num curriculo impressionante. Faixa marrom de BJJ e Muay Thai, Sousa e perigoso em qualquer posicao.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Estreia vs Experiencia</h3>
        <p>Essa luta e o teste classico do UFC: o estreante talentoso contra o veterano estabelecido. <strong class="text-ufc-red">Oki</strong> tem 4 lutas de experiencia no octogono e sabe o que e lutar sob as luzes da organizacao. <strong class="text-blue-400">Sousa</strong> tem o talento bruto mas nunca enfrentou a pressao de um evento do UFC. O APEX menor pode ser um equalizador — menos espaco para fugir, mais pressao, mais acao. Exatamente o tipo de ambiente que ambos preferem.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking — 2-2 no UFC', fighter2: 'Sem ranking — estreia no UFC' },
        { dimensao: 'Objetivo', fighter1: 'Recuperar momentum apos TKO loss', fighter2: 'Impressionar na estreia e se estabelecer' },
        { dimensao: 'Narrativa', fighter1: 'Veterano do UFC provando consistencia', fighter2: 'Estreante brasileiro com recorde impressionante' },
        { dimensao: 'Risco', fighter1: 'Terceira derrota em 5 lutas pode significar corte', fighter2: 'Derrota na estreia freia completamente o hype' },
        { dimensao: 'Recompensa', fighter1: 'Retomar sequencia e se posicionar nos leves', fighter2: 'Estreia com vitoria abre todas as portas' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O GUERREIRO ZULU PREVALECE',
          subtitulo: 'Oki usa experiencia do UFC para dominar o estreante.',
          consequencias: [
            { tag: 'MOMENTUM', texto: 'Recupera a confianca apos TKO loss para Jones. Sequencia de 2 em 3 no UFC.' },
            { tag: 'ROSTER', texto: 'Garante permanencia confortavel no UFC e possibilidade de subir no card.' },
            { tag: 'EXPERIENCIA', texto: 'Prova que a experiencia no octogono e fator decisivo contra estreantes talentosos.' },
          ],
          proxima_luta: 'Oponente de nivel similar ou leve upgrade na divisao dos leves',
        },
        fighter2_vence: {
          titulo: 'MANUMITO CHEGA COM TUDO',
          subtitulo: 'Sousa faz estreia arrasadora e mostra que pertence ao UFC.',
          consequencias: [
            { tag: 'IMPRESSAO', texto: 'Estreia com vitoria gera hype imediato. Recorde vai para 14-1 na carreira.' },
            { tag: 'CONFIANCA', texto: 'Prova que pode competir no nivel do UFC e que o Contender Series nao foi acaso.' },
            { tag: 'FUTURO', texto: 'Com 25 anos e 14-1, se posiciona como prospecto serio na divisao mais competitiva.' },
          ],
          proxima_luta: 'Oponente com mais experiencia no UFC para testar o proximo nivel',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Bolaji Oki',
        color: 'red',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Mason Jones', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parado no segundo round por strikes. Defesa em pe comprometida contra pressao de Jones.' },
          { date: 'Mai 2025', opponent: 'Michael Aswell', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria solida por decisao contra oponente de nivel inferior. Controlou toda a luta.' },
          { date: 'Set 2024', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (guilhotina)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado por guilhotina no primeiro round em Paris. Derrota rapida e surpreendente.' },
          { date: 'Fev 2024', opponent: 'Timmy Cuamba', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC com vitoria apertada por SD. Mostrou potencial mas nao dominou.' },
        ],
        momentum_score: 4,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'stable',
        momentum_note: 'Oki esta numa montanha-russa no UFC: 2-2 com alternancia entre vitorias e derrotas. O volume de striking de 7.05 SLpM e impressionante e mostra agressividade, mas as derrotas para Jones (TKO) e Duncan (guilhotina) revelam vulnerabilidades tanto em pe quanto no chao. A defesa de takedown de 85% e um ponto forte. Aos 30 anos, ainda tem tempo para se desenvolver.',
      },
      fighter2: {
        nome: 'Manoel Sousa',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Cristian Perez', result: 'W', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizou Perez no terceiro round no Contender Series. Conquistou contrato do UFC.' },
          { date: 'Jun 2024', opponent: 'Archie Colgan', result: 'L', method: 'Decisao', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Unica derrota da carreira. Perdeu por decisao em luta equilibrada.' },
          { date: 'Fev 2024', opponent: 'Adversario Regional', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute rapido no circuito regional brasileiro. Poder demonstrado.' },
          { date: 'Nov 2023', opponent: 'Adversario Regional', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mais um TKO no circuito regional. Construindo recorde impressionante.' },
        ],
        momentum_score: 6,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Sousa chega ao UFC com o hype do Contender Series. O recorde de 13-1 com 8 KOs e 3 submissoes mostra um finalizador nato. A faixa marrom de BJJ e Muay Thai adicionam versatilidade. Porem, toda a carreira foi em promotoras regionais — o nível do UFC e um salto enorme. A unica derrota (decisao para Colgan) sugere que pode ser vulneravel em lutas longas contra oponentes que seguram o ritmo.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Oki',
        media_oponentes: 1.5,
        media_oponentes_label: 'Ruim',
        aproveitamento: '2W-2L (50%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Sousa',
        media_oponentes: 1.0,
        media_oponentes_label: 'Ruim',
        aproveitamento: '0W-0L (estreante)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Nao ha oponentes em comum. Oki tem 4 lutas de experiencia no UFC contra oponentes de nivel baixo a medio. Sousa vem inteiramente do circuito regional e Contender Series. A comparacao direta e impossivel, mas a diferenca de nivel de competicao favorece Oki — ele ja sabe o que e lutar no UFC.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 7.05, valueB: 4.50, maxVal: 9, format: 'decimal', note: 'Oki com volume MONSTRUOSO. 7+ strikes por minuto e um dos maiores do UFC inteiro. Sousa estimado em 4.5 baseado no circuito regional.' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 50, maxVal: 100, format: 'percent', note: 'Valores estimados similares. Ambos na faixa media de precisao.' },
        { label: 'Strikes Absorvidos/Min', valueA: 5.80, valueB: 3.50, maxVal: 8, format: 'decimal', reverseWinner: true, note: 'Oki absorve muito dano — 5.80 SApM. Sousa estimado em taxa mais baixa baseado no recorde de finalizacoes.' },
        { label: 'Defesa de Strikes (%)', valueA: 45, valueB: 52, maxVal: 100, format: 'percent', note: 'Oki com defesa abaixo da media. Sousa estimado levemente melhor.' },
        { label: 'Takedowns por 15 Min', valueA: 1.50, valueB: 2.00, maxVal: 5, format: 'decimal', note: 'Ambos com atividade moderada em takedowns. Sousa estimado levemente mais ativo.' },
        { label: 'Precisao de Takedown (%)', valueA: 35, valueB: 40, maxVal: 100, format: 'percent', note: 'Valores estimados. Ambos na faixa media-baixa.' },
        { label: 'Defesa de Takedown (%)', valueA: 85, valueB: 70, maxVal: 100, format: 'percent', note: 'Oki com excelente defesa de takedown — 85%. Vantagem significativa nessa area.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '30 anos', fighter2: '25 anos', note: 'Sousa 5 anos mais jovem' },
        { label: 'Altura', fighter1: '1.78m (5\'10")', fighter2: '1.75m (5\'9")', note: 'Oki levemente mais alto' },
        { label: 'Envergadura', fighter1: '185cm (73")', fighter2: '175cm (69")', note: 'Oki com 4 polegadas a mais — vantagem significativa' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Ambos ortodoxos' },
        { label: 'Academia', fighter1: 'Team Belgica, Bruxelas', fighter2: 'Academia Sao Paulo, Brasil', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Volume de Striking', valueA: 82, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Oki tem um dos maiores volumes do UFC com 7.05 SLpM. Sousa e ativo mas nao no mesmo nivel de output. O ritmo de Oki e asfixiante.' },
        { label: 'Poder de Nocaute', valueA: 68, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Sousa tem 8 KOs em 13 vitorias (62%), uma taxa muito alta. Oki tem 5 KOs em 10 vitorias. Sousa e um finalizador mais natural com poder puro.' },
        { label: 'Jiu-Jitsu / Grappling', valueA: 50, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Sousa e faixa marrom de BJJ com 3 submissoes. Oki tem 1 guilhotina na carreira. Sousa e mais perigoso no chao e pode buscar finalizacoes ativas.' },
        { label: 'Defesa em Pe', valueA: 45, valueB: 55, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Oki absorve 5.80 SApM com 45% de defesa — numeros preocupantes. Sousa estimado com defesa melhor baseado no recorde (apenas 1 derrota em 14 lutas).' },
        { label: 'Experiencia UFC', valueA: 65, valueB: 25, labelA: 'Bom', labelB: 'Ruim', advantage: 'fighter1', advantage_note: 'Oki tem 4 lutas no UFC e sabe o que e competir sob as luzes da organizacao. Sousa e estreante e pode sentir a pressao do primeiro UFC.' },
        { label: 'Ataques ao Corpo', valueA: 78, valueB: 55, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Oki e conhecido por body attacks devastadores que drenam a energia dos oponentes. E sua assinatura e uma arma especialmente efetiva no APEX menor.' },
      ],
      insight: 'A luta opoe dois perfis distintos mas ambos perigosos. <strong class="text-ufc-red">Oki</strong> traz volume absurdo, ataques ao corpo e experiencia no UFC. <strong class="text-blue-400">Sousa</strong> traz poder de KO natural, BJJ superior e a fome de um estreante. A chave e se Oki consegue usar o volume e ataques ao corpo para drenar Sousa, ou se Sousa encontra a abertura para um nocaute ou finalizacao antes disso.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Oki',
        ko_tko: { count: 5, percent: 50 },
        submission: { count: 1, percent: 10 },
        decision: { count: 4, percent: 40 },
        total_wins: 10,
      },
      fighter2: {
        nome: 'Sousa',
        ko_tko: { count: 8, percent: 62 },
        submission: { count: 3, percent: 23 },
        decision: { count: 2, percent: 15 },
        total_wins: 13,
      },
      insight: 'Sousa e um finalizador mais contundente: 62% das vitorias por KO/TKO e 23% por submissao, totalizando 85% de finalizacoes. Oki e mais equilibrado entre KOs (50%) e decisoes (40%). Sousa raramente vai a distancia (15%), o que sugere que se ele nao resolver cedo, pode ter dificuldade em rounds tardios. Oki tem mais experiencia em lutas longas.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Explosao Inicial',
          description: 'O primeiro round e o mais imprevisivel. Oki vai comecar com volume alto e ataques ao corpo, buscando drenar Sousa desde cedo. Sousa, com a adrenalina da estreia, pode estar mais explosivo que nunca — 8 dos 13 KOs mostram poder de finalizacao cedo. Ambos sao perigosos nos primeiros 5 minutos. E como dois touros se encontrando.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'VANTAGEM OKI',
          color: 'red',
          title: 'O Corpo Cobra o Preco',
          description: 'Se Oki conectou ataques ao corpo no primeiro round, o segundo e onde eles comecam a fazer efeito. Os body shots drenam energia e diminuem a mobilidade. Sousa, que construiu carreira finalizando cedo, pode comecar a sentir o ritmo do UFC se a luta se estender. A experiencia de Oki em lutas de 3 rounds e uma vantagem aqui.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM OKI',
          color: 'red',
          title: 'Experiencia no Grind',
          description: 'O terceiro round favorece Oki por duas razoes: experiencia em lutas de 3 rounds no UFC e o efeito cumulativo dos ataques ao corpo. Sousa raramente vai a distancia (85% de finalizacoes) e pode nao ter o cardio para manter ritmo alto por 15 minutos. Se a luta chegar aqui, Oki deve estar mais confortavel.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Zap', title: 'Volume de 7.05 SLpM — top do UFC', fighter: 'Oki', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Oki tem um dos maiores volumes de strikes do UFC inteiro. Mais de 7 golpes significativos por minuto cria um ritmo asfixiante que muitos oponentes nao conseguem acompanhar. E especialmente efetivo no APEX menor onde nao ha espaco para fugir.' },
        { icon: 'Target', title: 'Body shots devastadores', fighter: 'Oki', risk_level: 'POSITIVO', risk_color: 'green', description: 'A assinatura de Oki sao os ataques ao corpo. Golpes ao corpo drenam energia, diminuem a mobilidade e se acumulam ao longo dos rounds. Contra um Sousa que pode nao ter cardio para 3 rounds de UFC, body shots podem ser decisivos.' },
        { icon: 'AlertTriangle', title: 'Defesa em pe vulneravel (5.80 SApM)', fighter: 'Oki', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Oki absorve quase 6 strikes por minuto — uma taxa muito alta. Contra Sousa, que tem 8 KOs, essa defesa porosa pode ser explorada. O estilo de pressao de Oki o deixa exposto a contra-ataques.' },
        { icon: 'Brain', title: 'Estreia no UFC — fator desconhecido', fighter: 'Sousa', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Sousa nunca lutou no UFC. O ambiente, a pressao, as luzes, o octogono — tudo e novo. Alguns estreantes brilham, outros congelam. A incerteza e enorme e pode ir para qualquer lado.' },
        { icon: 'TrendingUp', title: 'Recorde de 13-1 com 85% de finalizacoes', fighter: 'Sousa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Sousa finalizou 85% das lutas que venceu (11 de 13). Esse tipo de taxa de finalizacao mostra um lutador que sabe como terminar lutas. Se encontrar a abertura, nao hesita.' },
        { icon: 'Shield', title: 'Defesa de takedown de 85%', fighter: 'Oki', risk_level: 'POSITIVO', risk_color: 'green', description: 'Oki defende 85% dos takedowns no UFC. Contra Sousa, que pode tentar usar o BJJ faixa marrom, essa defesa e crucial para manter a luta em pe onde Oki tem vantagem de volume.' },
        { icon: 'Activity', title: 'Experiencia em rounds tardios', fighter: 'Oki', risk_level: 'POSITIVO', risk_color: 'green', description: 'Sousa finalizou 85% das lutas e raramente vai a distancia. Se Oki conseguir levar a luta para o segundo e terceiro round, esta em territorio desconhecido para Sousa. A experiencia em rounds tardios e exclusiva de Oki nessa luta.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Oki',
        total_probability: 52,
        scenarios: [
          { name: 'O Corpo Cobra a Conta', probability: 22, method: 'Decisao Unanime', description: 'Oki usa volume absurdo e body shots para drenar Sousa ao longo de 3 rounds. O estreante, acostumado a finalizacoes rapidas, nao consegue manter o ritmo no ambiente do UFC. Oki pontua consistentemente e vence nos cartoes.' },
          { name: 'A Pressao Demais', probability: 15, method: 'TKO R2-R3', description: 'O volume de 7+ SLpM de Oki sobrecarrega Sousa. Ataques ao corpo acumulam dano e, nos rounds finais, um golpe de poder encontra Sousa sem condicao de se defender. A parada vem por acumulo, nao por um unico golpe.' },
          { name: 'Welcome to the UFC', probability: 15, method: 'KO/TKO R1-R2', description: 'Oki impoe o ritmo do UFC desde o primeiro segundo e Sousa nao se adapta. A pressao, o volume e a agressividade sao diferentes de tudo que Sousa ja enfrentou. O choque cultural do octogono trabalha a favor de Oki.' },
        ],
      },
      fighter2: {
        nome: 'Sousa',
        total_probability: 45,
        scenarios: [
          { name: 'O Poder Brasileiro', probability: 20, method: 'KO/TKO R1', description: 'Sousa, com a adrenalina da estreia, encontra a abertura nas primeiras trocas e conecta um golpe de poder que explora a defesa vulneravel de Oki (5.80 SApM). O mesmo tipo de poder que rendeu 8 KOs na carreira. Uma entrada triunfal no UFC.' },
          { name: 'BJJ Faixa Marrom', probability: 12, method: 'Sub R1-R2', description: 'Sousa usa a faixa marrom de BJJ para levar a luta para o chao e buscar finalizacao. Oki tem boa defesa de takedown (85%) mas se Sousa conseguir, o jiu-jitsu pode ser decisivo. A guilhotina que Duncan usou contra Oki mostra a vulnerabilidade.' },
          { name: 'Counter-Striker Nato', probability: 13, method: 'TKO R2', description: 'Sousa usa contra-ataques precisos contra o volume alto de Oki. Quanto mais Oki ataca, mais aberturas cria. Sousa e paciente, espera o momento e finaliza com eficiencia. A taxa de 62% de KOs mostra que ele sabe encontrar o timing.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Bolaji Oki',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Oki tem vantagens em volume (7.05 SLpM), experiencia no UFC (4 lutas vs 0), defesa de takedown (85%) e envergadura (4 polegadas a mais). Os ataques ao corpo podem ser devastadores contra um Sousa que raramente vai a distancia. Porem, a defesa porosa de Oki (5.80 SApM) e uma vulnerabilidade real contra um Sousa com 8 KOs. A luta e genuinamente 50/50 com leve vantagem para Oki pela experiencia no UFC. A confianca e MEDIA porque estreantes sao imprevisíveis — podem brilhar ou congelar.',
      x_factor: {
        title: 'O Fator Estreia no UFC',
        description: 'Sousa nunca lutou no UFC. Alguns estreantes entram e arrasam — a adrenalina e a fome criam performances especiais. Outros congelam sob a pressao das luzes e da atmosfera. Nao ha como prever como Sousa vai reagir. Esse e o fator mais imprevisível da luta e pode invalidar toda a analise estatistica.',
      },
      upset_alert: {
        title: 'Upset Alert: Sousa por KO no Primeiro Round',
        description: 'Sousa tem 8 KOs em 13 vitorias e poder de nocaute comprovado. Oki absorve 5.80 strikes por minuto com apenas 45% de defesa. Se Sousa entrar focado e encontrar a abertura na defesa de Oki, o nocaute pode vir rapidamente. Estreantes com fome e poder sao perigosos — pergunte a qualquer veterano.',
      },
      probabilities: {
        fighter1: { nome: 'Oki', percent: 52 },
        fighter2: { nome: 'Sousa', percent: 45 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Oki ML', reasoning: 'Experiencia no UFC, volume superior e defesa de takedown solida. Favorito leve e justo.' },
        method: { pick: 'Oki por Decisao', reasoning: 'Oki tem 4 decisoes em 10 vitorias e sabe ir a distancia. Sousa raramente vai a distancia. Se a luta for longa, Oki leva.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Ambos sao finalizadores (Oki 60%, Sousa 85%). Alta probabilidade de finalizacao antes do terceiro round. O volume e a defesa porosa garantem acao.' },
        best_value: 'Under 2.5 rounds — dois finalizadores no APEX menor. Acao garantida.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Reacao de Sousa nos Primeiros 60 Segundos', icon: 'Brain', description: 'O primeiro minuto vai revelar tudo sobre como Sousa reage ao ambiente do UFC. Se ele estiver solto, agressivo e fluido, cuidado — o poder e real. Se ele parecer tenso, hesitante ou respeitando demais, Oki vai atropelar com volume.' },
        { num: 2, title: 'Os Body Shots de Oki', icon: 'Target', description: 'Oki e famoso pelos ataques ao corpo. Preste atencao se ele esta conectando golpes limpos na regiao abdominal. Se Sousa comecar a abaixar os bracos para proteger o corpo, a cabeca fica exposta. Se os body shots estao fazendo efeito, e questao de tempo.' },
        { num: 3, title: 'O Ritmo do Segundo Round', icon: 'Activity', description: 'Se a luta chegar ao segundo round, observe o ritmo de Sousa. Ele raramente luta mais de 2 rounds. Se estiver cansado ou desacelerando, Oki vai pressionar. Se ainda estiver fresco, a luta continua imprevisivel.' },
        { num: 4, title: 'Tentativas de Takedown', icon: 'Shield', description: 'Se Sousa comecar a tentar takedowns, pode ser sinal de que nao esta confortavel trocando com o volume de Oki. Oki defende 85% — mas se Sousa conseguir derrubar, o BJJ faixa marrom pode ser decisivo. A defesa de takedown de Oki pode decidir a luta.' },
        { num: 5, title: 'A Defesa de Oki Sob Pressao', icon: 'AlertTriangle', description: 'Oki absorve 5.80 SApM. Se Sousa comecar a conectar contra-ataques limpos, preste atencao na reacao de Oki. Se ele continuar pressionando apesar do dano, e o estilo dele. Se ele comecar a hesitar, Sousa pode encontrar o momento para o nocaute.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'OKI VS SOUSA', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Leve (155 lbs)\n3 Rounds\nEstreia de Sousa no UFC', color: 'red' },
        { slide_number: 2, title: 'BOLAJI OKI', content: '10-3-0 | The Zulu Warrior\n\n7.05 strikes por minuto (!)\nBody shots devastadores\n85% defesa de takedown\n2-2 no UFC | 30 anos', color: 'red' },
        { slide_number: 3, title: 'MANOEL SOUSA', content: '13-1-0 | Manumito\n\n8 KOs + 3 submissoes\nFaixa marrom BJJ/Muay Thai\nEstreia no UFC via Contender Series\n25 anos | Sao Paulo', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Oki por Decisao ou TKO\nConfianca: MEDIA\n\n52% Oki | 45% Sousa | 3% Empate\n\nX-Factor: como Sousa reage a estreia?', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Oki vs Sousa sabado. 7 STRIKES POR MINUTO contra um estreante com 13-1 e 8 KOs. O Guerreiro Zulu contra o Manumito brasileiro. Acao GARANTIDA no APEX.' },
        { num: '2/5', text: 'Bolaji Oki: 7.05 SLpM. SETE. Um dos maiores volumes do UFC inteiro. Body shots que drenam energia. 85% de defesa de takedown. Mas absorve 5.80 SApM. Vive no fogo.' },
        { num: '3/5', text: 'Manoel Sousa faz estreia no UFC: 13-1 com 8 KOs e 3 subs (85% finalizacoes). Faixa marrom de BJJ e Muay Thai. Conquistou contrato no Contender Series. Perigo REAL se encontrar abertura.' },
        { num: '4/5', text: 'A grande questao: como Sousa reage ao ambiente do UFC? Estreantes sao imprevisíveis. Podem brilhar com adrenalina ou congelar sob pressao. NINGUEM sabe ate a luta comecar.' },
        { num: '5/5', text: 'Previsao: Oki por decisao. 52-45. Experiencia no UFC e volume devem prevalecer. Mas Sousa com 8 KOs contra a defesa porosa de Oki? Qualquer golpe pode terminar a luta. Under 2.5 rounds tem valor.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"SETE strikes por minuto contra um estreante com OITO nocautes. Oki vs Sousa, sabado no APEX. Essa luta NAO vai pros cartoes."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Oki: 10-3, volume INSANO de 7.05 SLpM, body shots devastadores, 85% de defesa de takedown. Mas absorve quase 6 strikes por minuto. Sousa: 13-1, 8 KOs, faixa marrom de BJJ, fazendo estreia no UFC."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Essa luta se resume a RITMO. Oki quer afogar Sousa com volume e body shots ate o estreante quebrar. Sousa quer encontrar a abertura no meio da tempestade e terminar com um golpe. Dois estilos que se anulam ou se amplificam."' },
        { time: '40-50s', title: 'O X-Factor', text: '"O fator estreia. Sousa nunca lutou no UFC. Pode entrar com a fome do mundo e armar o nocaute. Ou pode congelar sob as luzes. NAO ha como prever. E isso torna essa luta uma das mais interessantes do card."' },
        { time: '50-60s', title: 'CTA', text: '"Previsao: Oki por decisao, mas Under 2.5 rounds parece o melhor valor. Comenta: volume de Oki ou poder de Sousa? Me segue pra mais analises."' },
      ],
      tiktok: [
        { hook: 'SETE strikes por minuto. SETE. No UFC inteiro, quase ninguem lanca tanto.', body: 'Bolaji Oki lanca 7.05 SLpM com body shots que drenam energia. Sabado ele enfrenta Manoel Sousa, estreante com 13-1 e 8 KOs. O problema? Oki absorve quase 6 strikes por minuto. E Sousa tem poder. Qualquer golpe pode terminar.', cta: 'Quem vence? Comenta ZULU ou MANUMITO.' },
        { hook: 'Estreando no UFC com 13-1 e 85% de FINALIZACOES. Quem e esse cara?', body: 'Manoel Sousa, o Manumito. Paulista que trocou trabalho bracao por luta. 8 KOs, 3 subs, faixa marrom de BJJ e Muay Thai. Conquistou contrato no Contender Series. Agora enfrenta o Guerreiro Zulu com 7 strikes por minuto. ACAO garantida.', cta: 'Segue pra analise completa do card de sabado.' },
        { hook: 'A estatistica mais ASSUSTADORA dessa luta em UM numero.', body: '5.80. Isso e quanto Bolaji Oki absorve de strikes significativos por minuto. Contra um estreante com 8 KOs em 13 lutas, absorver quase 6 strikes por minuto e pedir pra ser nocauteado. Mas o volume de 7 SLpM pode afogar qualquer um.', cta: 'Salva e assiste sabado. Vai ser guerra.' },
      ],
      headlines: [
        'Oki vs Sousa: Volume Monstruoso Contra Poder de Estreante',
        'O Guerreiro Zulu Enfrenta o Manumito Brasileiro no APEX',
        '7 Strikes Por Minuto: O Volume de Oki e Demais Para Sousa?',
        'Estreia no UFC: Sousa Traz 13-1 e Fome de Vencer',
        'Body Shots e Nocautes: A Luta Que NAO Vai Para Decisao',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-130',
        fighter2_odds: '+110',
        fighter1_name: 'Oki',
        fighter2_name: 'Sousa',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Volume Absurdo de Oki', stat_headline: '7.05 SLPM — UM DOS MAIORES VOLUMES DO UFC INTEIRO', contexto: 'Oki lanca mais de 7 strikes significativos por minuto. Esse ritmo asfixiante pode sobrecarregar um Sousa que nunca enfrentou esse nivel de pressao. Os body shots adicionam uma camada de desgaste cumulativo.', implicacao_aposta: 'Favorece Oki em lutas longas e mercados de decisao. Se a luta for para o segundo e terceiro round, o volume comeca a pesar.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Defesa Porosa de Oki', stat_headline: 'OKI ABSORVE 5.80 SLPM COM APENAS 45% DE DEFESA DE STRIKES', contexto: 'A outra face do volume: Oki absorve dano demais. Contra um Sousa com 8 KOs, cada troca e arriscada. A defesa de 45% e uma das mais baixas da divisao.', implicacao_aposta: 'Cria valor em Sousa por KO/TKO. Se Sousa encontrar timing contra a defesa porosa, o nocaute pode vir a qualquer momento. Under 2.5 rounds ganha valor.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Fator Estreia no UFC', stat_headline: 'SOUSA COM ZERO LUTAS NO UFC — EXPERIENCIA DE OKI COM 4 LUTAS', contexto: 'Estreias no UFC sao imprevisiveis. Alguns lutadores brilham, outros desaparecem. A pressao do ambiente, do octogono e das cameras e diferente de tudo que Sousa ja experimentou. Oki ja viveu tudo isso 4 vezes.', implicacao_aposta: 'Adiciona risco a apostas em Sousa. O fator desconhecido da estreia pode ser positivo ou negativo. Cria incerteza que pode inflar ou deflacionar odds.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Takedown de 85%', stat_headline: 'OKI DEFENDE 85% DOS TAKEDOWNS NO UFC', contexto: 'Se Sousa tentar levar a luta para o chao para usar o BJJ faixa marrom, vai encontrar resistencia. A defesa de takedown de Oki e uma das melhores entre lutadores sem ranking na divisao.', implicacao_aposta: 'Diminui o valor de apostas em Sousa por finalizacao. Se Sousa nao conseguir derrubar, precisa vencer em pe contra o volume de Oki.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'TrendingUp', titulo: 'Taxa de Finalizacao de Sousa', stat_headline: '85% DE FINALIZACOES (11 DE 13 VITORIAS POR KO/TKO OU SUB)', contexto: 'Sousa termina lutas. 8 KOs e 3 submissoes em 13 vitorias e uma taxa extraordinaria. Se encontrar abertura na defesa de Oki, nao hesita. O poder de finalizacao e genuino.', implicacao_aposta: 'Cria valor em Under 2.5 rounds independente de quem vence. Oki tambem tem 60% de finalizacoes. A probabilidade de a luta terminar cedo e alta.', edge_level: 'forte', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-110 (estimado)', confianca: 'alta', edge_vs_mercado: 'Ambos sao finalizadores (Oki 60%, Sousa 85%). Volume de 7 SLpM + defesa porosa = acao e dano rapido. Alta probabilidade de finalizacao.', raciocinio: 'Quando dois finalizadores se encontram no APEX menor, a probabilidade de 3 rounds completos e baixa. O volume de Oki e o poder de Sousa garantem que a luta sera intensa e provavelmente terminara cedo.' },
        { tipo: 'Moneyline', pick: 'Oki ML', odds: '-130 (estimado)', confianca: 'media', edge_vs_mercado: 'Leve favorito com preco justo. Experiencia no UFC e volume superior sao vantagens reais.', raciocinio: 'Oki tem 4 lutas no UFC, volume absurdo, body shots e defesa de takedown. Contra um estreante, a experiencia pode ser o diferencial.' },
        { tipo: 'Metodo', pick: 'Sousa por KO/TKO R1', odds: '+300 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Aposta de risco com valor potencial. Sousa tem 8 KOs e Oki absorve 5.80 SApM. Se o estreante brilhar, pode ser rapido.', raciocinio: 'Estreantes motivados com poder de KO sao perigosos. Oki absorve dano demais para ser seguro. Se as odds forem atrativas, vale como aposta pequena.' },
        { tipo: 'Metodo', pick: 'Oki por Decisao', odds: '+200 (estimado)', confianca: 'media', raciocinio: 'Se a luta for longa, Oki tem vantagem em experiencia em rounds tardios. 4 das 10 vitorias por decisao mostram que sabe ir a distancia.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Sousa por Decisao',
        descricao: 'Sousa tem apenas 2 vitorias por decisao em 13 (15%). Ele nao e um lutador de decisao — e um finalizador. Se a luta for para os cartoes, Oki com volume de 7 SLpM e experiencia em rounds tardios provavelmente esta na frente. Apostar em Sousa por decisao e ir contra toda a identidade do lutador.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
