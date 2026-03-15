import type { FullSingleAnalise } from '@/types/analise';

export const filiDelgadoAnalise: FullSingleAnalise = {
  id: 'fili-delgado-ufn-mar-14',
  evento_id: null,
  slug: 'fili-delgado-ufn-mar-14',
  titulo: 'Fili vs Delgado: Veterano Contra a Nova Geracao',
  subtitulo: 'A experiencia de 25 lutas no UFC encontra a fome de um prospecto invicto no octogono',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'TKO', confidence: 'MEDIA-ALTA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Andre Fili', record: '25-12-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Jose Miguel Delgado', record: '10-2-0', ultimasLutas: [] },
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
      tagline: 'A ULTIMA TRINCHEIRA DO VETERANO',
      tagline_sub: 'Um gatekepper de 25 lutas no UFC contra um prospecto que nunca viu o terceiro round.',
      fighter1: {
        nome_completo: 'Andre "Touchy" Fili',
        apelido: 'Touchy',
        sobrenome: 'Fili',
        record: '25-12-0',
        ranking: 'Sem ranking',
        info_extra: 'Sacramento, California | 35 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Jose Miguel Delgado',
        apelido: '',
        sobrenome: 'Delgado',
        record: '10-2-0',
        ranking: 'Sem ranking',
        info_extra: 'Yuma, Arizona | 27 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Veterano Que Se Recusa a Morrer</h3>
        <p><strong class="text-ufc-red">Andre Fili</strong> e um dos nomes mais resilientes da historia do peso pena do UFC. Com 25 lutas na organizacao desde 2013, ele e um verdadeiro sobrevivente. Nao e o mais talentoso, nao e o mais atletico, mas e o cara que aparece, coloca a mao na cara do oponente, e faz lutas divertidas. Cinco vitorias por decisao dividida, empatando o recorde historico do UFC. Esse numero diz tudo: Fili esta sempre no limite, sempre competitivo, sempre perigoso o suficiente para roubar rounds.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Maquina de Finalizar do Arizona</h3>
        <p><strong class="text-blue-400">Jose Miguel Delgado</strong> e tudo que Fili nao e: jovem, explosivo, e com fome. Com 10 vitorias e apenas 2 derrotas, o prospecto do MMA Lab tem uma taxa de finalizacao absurda. Seis vitorias por KO/TKO e quatro por submissao. Zero decisoes. Esse cara simplesmente nao deixa a luta ir para os juizes. No UFC, ja tem tres vitorias, incluindo um nocaute em 26 segundos contra Hyder Amil e uma decisao unanime sobre Nathaniel Wood que mostrou que ele tambem sabe lutar por 15 minutos.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Choque de Geracoes</h3>
        <p>Essa luta e classica: o veterano que conhece todos os truques contra o jovem que tem mais poder, mais velocidade, e mais fome. <strong class="text-ufc-red">Fili</strong> vai tentar transformar isso em uma guerra suja, usar a experiencia para frustrar <strong class="text-blue-400">Delgado</strong> e forcar erros. Delgado vai tentar fazer o que faz de melhor: encontrar a abertura e encerrar a noite cedo. A 8 anos de diferenca de idade pesa, mas a experiencia no octogono pode ser o grande equalizador.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (veterano)', fighter2: 'Sem ranking (em ascensao)' },
        { dimensao: 'Objetivo', fighter1: 'Manter relevancia no UFC', fighter2: 'Subir no ranking e buscar top 15' },
        { dimensao: 'Narrativa', fighter1: '25 lutas no UFC, quer provar que ainda compete', fighter2: '100% finalizacao, quer manter a sequencia' },
        { dimensao: 'Risco', fighter1: 'Corte do UFC se perder', fighter2: 'Oponente mais experiente da carreira' },
        { dimensao: 'Recompensa', fighter1: 'Vitoria de respeito contra jovem prospect', fighter2: 'Statement win contra veterano conhecido' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O VETERANO SOBREVIVE MAIS UMA VEZ',
          subtitulo: 'Fili prova que experiencia no octogono ainda vale ouro.',
          consequencias: [
            { tag: 'CARREIRA', texto: 'Fili garante pelo menos mais 2-3 lutas no UFC e se consolida como gatekeeper definitivo dos penas.' },
            { tag: 'RANKING', texto: 'Pode entrar no radar do top 15 com uma vitoria sobre um prospect tao hypado.' },
            { tag: 'LEGADO', texto: 'Sexta decisao dividida da carreira? Seria recorde historico do UFC.' },
          ],
          proxima_luta: 'Oponente ranqueado entre #12 e #15 do peso pena',
        },
        fighter2_vence: {
          titulo: 'A NOVA GERACAO CHEGA COM TUDO',
          subtitulo: 'Delgado confirma o hype e prova que esta pronto para o proximo nivel.',
          consequencias: [
            { tag: 'RANKING', texto: 'Delgado bate na porta do top 15 com quatro vitorias seguidas no UFC.' },
            { tag: 'HYPE', texto: 'Mais uma finalizacao no curriculo consolida ele como um dos melhores prospectos dos penas.' },
            { tag: 'FUTURO', texto: 'Comeca a ser mencionado em conversas sobre futuros contenders da divisao.' },
          ],
          proxima_luta: 'Oponente ranqueado entre #10 e #15 do peso pena',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Andre Fili',
        color: 'red',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Christian Rodriguez', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Quinta decisao dividida da carreira, empatando recorde do UFC. Luta competitiva ate o fim.' },
          { date: 'Fev 2025', opponent: 'Melquizael Costa', result: 'L', method: 'Sub R1 (4:30)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado por submissao no primeiro round. Exposicao no grappling defensivo.' },
          { date: 'Jun 2024', opponent: 'Cub Swanson', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria apertada contra outro veterano. Fight of the Night.' },
          { date: 'Fev 2024', opponent: 'Dan Ige', result: 'L', method: 'KO R1 (2:43)', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocauteado no primeiro round por Ige. Mostrou vulnerabilidade a strikers com poder.' },
          { date: 'Dez 2023', opponent: 'Lucas Almeida', result: 'W', method: 'TKO R1 (3:32)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao rapida. Performance of the Night.' },
        ],
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Fili alterna vitorias e derrotas constantemente. Nos ultimos 5 combates, sao 3 vitorias e 2 derrotas, mas as duas derrotas foram finalizacoes no primeiro round. Isso mostra um padrao: quando Fili sobrevive o inicio, ele compete. Quando nao sobrevive, e finalizado rapido. Contra Delgado, que e um finalizador nato, esse padrao e preocupante.',
      },
      fighter2: {
        nome: 'Jose Miguel Delgado',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Nathaniel Wood', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Primeira decisao da carreira. Mostrou que sabe lutar 3 rounds e adaptar gameplan.' },
          { date: 'Jun 2025', opponent: 'Hyder Amil', result: 'W', method: 'KO R1 (0:26)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute em 26 segundos. Poder explosivo devastador.' },
          { date: 'Fev 2025', opponent: 'Connor Matthews', result: 'W', method: 'TKO R1 (2:58)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mais uma finalizacao no primeiro round. Debut no UFC com estilo.' },
          { date: 'Set 2024', opponent: 'Jonathan Brookins Jr.', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria no Contender Series que garantiu contrato com o UFC.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Delgado esta em uma trajetoria ascendente impressionante. Quatro vitorias seguidas, tres delas por finalizacao no primeiro round. A vitoria por decisao sobre Nathaniel Wood foi crucial para mostrar que ele nao e apenas um finalizador: ele sabe lutar. Com 8.22 strikes significativos por minuto e 55% de precisao, o volume e a agressividade estao no teto.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Fili',
        media_oponentes: 2.2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Delgado',
        media_oponentes: 1.5,
        media_oponentes_label: 'Ruim',
        aproveitamento: '4W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Fili e Delgado nunca enfrentaram oponentes em comum. Fili tem 25 lutas no UFC contra uma gama variada de adversarios, enquanto Delgado esta apenas no inicio da sua jornada na organizacao. A diferenca de experiencia e enorme, mas o calibre dos oponentes recentes de ambos e relativamente baixo.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.87, valueB: 8.22, maxVal: 10, format: 'decimal', note: 'Delgado com mais que o DOBRO do volume de Fili. Diferenca absurda.' },
        { label: 'Precisao de Strikes (%)', valueA: 38, valueB: 55, maxVal: 100, format: 'percent', note: 'Fili com precisao abaixo da media. Delgado significativamente mais preciso.' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.23, valueB: 5.44, maxVal: 8, format: 'decimal', reverseWinner: true, note: 'Ambos absorvem muito, mas Delgado tem desculpa: ele troca mais.' },
        { label: 'Defesa de Strikes (%)', valueA: 51, valueB: 47, maxVal: 100, format: 'percent', note: 'Ambos com defesa abaixo da media. Luta vai ter fogo cruzado.' },
        { label: 'Takedowns por 15 Min', valueA: 1.20, valueB: 1.80, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 45, valueB: 43, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 60, maxVal: 100, format: 'percent', note: 'Fili com vantagem clara na defesa de takedown.' },
        { label: 'Submissoes por 15 Min', valueA: 0.23, valueB: 0.00, maxVal: 2, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '35 anos', fighter2: '27 anos', note: 'Delgado 8 anos mais jovem' },
        { label: 'Altura', fighter1: '1.80m (5\'11")', fighter2: '1.80m (5\'11")', note: 'Identicos em altura' },
        { label: 'Envergadura', fighter1: '188cm (74")', fighter2: '185cm (73")', note: 'Fili com leve vantagem de 1 polegada' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'Team Alpha Male, Sacramento', fighter2: 'MMA Lab, Phoenix', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Volume de Striking', valueA: 50, valueB: 88, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Delgado com 8.22 strikes por minuto e absurdo. Fili com 3.87 vai ser atropelado em volume.' },
        { label: 'Poder de Nocaute', valueA: 55, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: '6 KOs em 10 vitorias para Delgado. Fili tem poder mas nao e consistente como finalizador.' },
        { label: 'Grappling Ofensivo', valueA: 50, valueB: 60, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Delgado tem 4 submissoes na carreira. Fili tem apenas 3 em 25 vitorias.' },
        { label: 'Defesa / Durabilidade', valueA: 60, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Fili sobreviveu 25 lutas no UFC. Ja levou golpes de todo tipo e continua competindo. Durabilidade testada.' },
        { label: 'Cardio / Ritmo', valueA: 70, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Fili e um lutador de 3 rounds. Ja provou que aguenta 15 minutos repetidamente. Delgado raramente precisa do cardio.' },
        { label: 'QI de Luta / Experiencia', valueA: 75, valueB: 55, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: '25 lutas no UFC dao a Fili um conhecimento profundo do octogono que Delgado simplesmente ainda nao tem.' },
      ],
      insight: 'A dinamica e clara: <strong class="text-blue-400">Delgado</strong> domina nos atributos fisicos e atleticos, enquanto <strong class="text-ufc-red">Fili</strong> tem vantagem na experiencia e durabilidade. A questao central e se a experiencia de Fili pode compensar a diferenca de volume e poder. Historicamente, quando veteranos encontram jovens explosivos no UFC, a juventude tende a prevalecer, mas Fili ja deu upset antes.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Fili',
        ko_tko: { count: 10, percent: 40 },
        submission: { count: 3, percent: 12 },
        decision: { count: 12, percent: 48 },
        total_wins: 25,
      },
      fighter2: {
        nome: 'Delgado',
        ko_tko: { count: 6, percent: 60 },
        submission: { count: 4, percent: 40 },
        decision: { count: 0, percent: 0 },
        total_wins: 10,
      },
      insight: 'O contraste e brutal. Fili vence 48% por decisao, mostrando que ele e um lutador de pontos que sobrevive ate o final. Delgado tem ZERO vitorias por decisao: todas as 10 vitorias sao por finalizacao. 60% por KO e 40% por submissao. Delgado simplesmente nao sabe lutar sem finalizar. Isso pode ser uma forca (ele encontra a abertura) ou uma fraqueza (ele nao sabe acumular pontos). A vitoria sobre Wood por decisao foi a primeira vez.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM DELGADO',
          color: 'red',
          title: 'A Zona de Extincao',
          description: 'O primeiro round e onde Delgado e mais perigoso. Tres das suas quatro vitorias no UFC vieram no primeiro round, incluindo um KO em 26 segundos. Fili foi finalizado no primeiro round nas suas duas ultimas derrotas (Costa e Ige). Se Delgado encontrar a abertura cedo, pode ser uma noite curta.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Pivo',
          description: 'Se Fili sobreviver o primeiro round, a luta muda. Delgado nunca precisou lutar tanto, e a experiencia de Fili comeca a pesar. O segundo round vai mostrar se Delgado sabe manter o ritmo quando nao finaliza cedo.',
        },
        {
          rounds: 'R3',
          danger_level: 4,
          danger_label: 'VANTAGEM FILI',
          color: 'green',
          title: 'O Territorio do Veterano',
          description: 'O terceiro round favorece Fili. Ele tem 12 vitorias por decisao na carreira e sabe competir ate o final. Delgado nunca lutou 15 minutos num ritmo alto contra um veterano do calibre de Fili (a decisao sobre Wood foi a excecao). Se a luta chegar aqui, a experiencia pode fazer a diferenca.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Clock', title: 'Experiencia massiva no octogono', fighter: 'Fili', risk_level: 'POSITIVO', risk_color: 'green', description: '25 lutas no UFC desde 2013. Fili ja viu de tudo: strikers, grapplers, wrestlers. Ele sabe exatamente como o octogono funciona e como frustrar oponentes.' },
        { icon: 'TrendingUp', title: 'Momento ascendente imparavel', fighter: 'Delgado', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Quatro vitorias seguidas com tres finalizacoes no primeiro round. Delgado esta no pico da confianca e da performance. A fome de um jovem prospecto e dificil de parar.' },
        { icon: 'AlertTriangle', title: 'Vulnerabilidade a finalizacoes', fighter: 'Fili', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Fili foi finalizado nas suas duas ultimas derrotas: submissao R1 por Costa e KO R1 por Ige. Esse padrao de ser finalizado cedo contra oponentes agressivos e extremamente preocupante contra Delgado.' },
        { icon: 'Brain', title: 'Primeira luta real de 3 rounds', fighter: 'Delgado', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Delgado so lutou 3 rounds uma vez (contra Wood). Se Fili sobreviver o ataque inicial e levar a luta para aguas profundas, Delgado estara em territorio desconhecido.' },
        { icon: 'Zap', title: 'Volume de strikes absurdo', fighter: 'Delgado', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '8.22 strikes significativos por minuto e um numero absurdo para o peso pena. Contra a defesa de apenas 51% de Fili, o volume vai criar problemas constantes.' },
        { icon: 'Shield', title: 'Queixo testado por 13 anos', fighter: 'Fili', risk_level: 'POSITIVO', risk_color: 'green', description: 'Fili ja absorveu golpes dos melhores penas do mundo por mais de uma decada. Ele sabe como sobreviver trocacoes. Mas sera que o queixo aguenta o poder de Delgado aos 35 anos?' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Fili',
        total_probability: 30,
        scenarios: [
          { name: 'A Resistencia do Veterano', probability: 15, method: 'Decisao Dividida', description: 'Fili absorve o ataque inicial de Delgado, sobrevive o primeiro round, e transforma a luta em uma guerra de atricao. Usa experiencia e cardio para roubar rounds com clinch sujo, pressao na grade e strikes no break.' },
          { name: 'O Counter do Velho Lobo', probability: 8, method: 'TKO R2-R3', description: 'Fili espera Delgado se comprometer demais em combinacoes e encontra o counter perfeito. Com 10 KOs na carreira, ele ainda tem poder. Se Delgado ficar descuidado, Fili pode puni-lo.' },
          { name: 'O Takedown Surpresa', probability: 7, method: 'Decisao Unanime', description: 'Fili muda o gameplan completamente e usa takedowns para controlar Delgado no chao. Com 45% de precisao de takedown e a experiencia em lutas de chao, ele pode neutralizar o striking de Delgado.' },
        ],
      },
      fighter2: {
        nome: 'Delgado',
        total_probability: 67,
        scenarios: [
          { name: 'O Nocaute Explosivo', probability: 30, method: 'KO/TKO R1', description: 'Delgado entra com pressao maxima desde o primeiro segundo, sobrecarrega Fili com volume e encontra o golpe limpo. 55% de precisao contra 51% de defesa e uma receita para finalizacao rapida. Fili ja foi nocauteado no R1 por Ige, o padrao pode se repetir.' },
          { name: 'Dominacao por Volume', probability: 22, method: 'TKO R2', description: 'Delgado nao finaliza no primeiro round mas acumula dano massivo com 8+ strikes por minuto. No segundo round, Fili esta machucado, lento, e Delgado encontra a abertura para o TKO.' },
          { name: 'A Luta de 3 Rounds', probability: 15, method: 'Decisao Unanime', description: 'Fili sobrevive os primeiros rounds mas Delgado domina com volume e agressividade por 15 minutos. Repete o que fez contra Nathaniel Wood, mostrando maturidade e paciencia.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Jose Miguel Delgado',
      winner_side: 'fighter2',
      predicted_method: 'TKO no segundo round',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Delgado e o favorito claro por boas razoes. O volume de striking (8.22 vs 3.87 por minuto), a precisao (55% vs 38%), e a juventude dao a ele vantagens significativas. Fili foi finalizado no primeiro round nas suas duas ultimas derrotas, e Delgado e exatamente o tipo de oponente que explora essa vulnerabilidade: agressivo, explosivo, e com poder para finalizar. A unica chance real de Fili e sobreviver os primeiros 5-7 minutos e transformar a luta em guerra de atricao, mas a diferenca de volume e simplesmente grande demais.',
      x_factor: {
        title: 'O Volume Absurdo de Delgado',
        description: '8.22 strikes significativos por minuto e um dos numeros mais altos do peso pena. Contra a defesa de 51% de Fili, isso significa que Delgado vai acertar mais de 4 golpes significativos por minuto. Em 15 minutos, sao 60+ golpes limpos. Nenhum queixo aguenta isso.',
      },
      upset_alert: {
        title: 'Upset Alert: Fili por Decisao Dividida',
        description: 'Se Fili conseguir sobreviver os primeiros 5 minutos com clinch, pressao na grade, e takedowns oportunisticos, ele pode transformar isso na sua especialidade: uma luta feia, suja, de decisao dividida. Fili ja fez isso 5 vezes na carreira. Delgado nunca lutou contra alguem tao experiente em fazer lutas feias.',
      },
      probabilities: {
        fighter1: { nome: 'Fili', percent: 30 },
        fighter2: { nome: 'Delgado', percent: 67 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Delgado -330', reasoning: 'Favorito justificado. Volume, precisao e poder superiores contra um veterano em declinio.' },
        method: { pick: 'Delgado por KO/TKO', reasoning: 'Fili foi finalizado por strikes nas 2 ultimas derrotas. Delgado tem 60% de vitorias por KO/TKO.' },
        over_under: { pick: 'Under 2.5 rounds', rounds: 2.5, reasoning: 'Delgado finaliza cedo e Fili e vulneravel a finalizacoes no primeiro round. Alta probabilidade de nao chegar ao terceiro.' },
        best_value: 'Delgado por KO/TKO em Round 1 ou 2',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 60 Segundos', icon: 'Clock', description: 'Delgado nocauteou Amil em 26 segundos. Se ele entrar com a mesma intensidade, os primeiros 60 segundos serao cruciais. Se Fili sobreviver o inicio, a luta muda completamente. Observe se Fili busca o clinch imediatamente para desacelerar o ritmo.' },
        { num: 2, title: 'O Volume de Strikes de Delgado', icon: 'Zap', description: 'Com 8.22 strikes por minuto, Delgado vai bombardear Fili. Observe se Fili consegue manter a guarda alta e absorver sem ser machucado. Se comeca a baixar as maos, o TKO esta proximo.' },
        { num: 3, title: 'O Clinch de Fili', icon: 'Shield', description: 'A melhor arma de Fili pode ser o clinch. Se ele conseguir prender Delgado na grade e transformar a luta em uma batalha de corpo a corpo, ele pode neutralizar o volume. Observe quantas vezes Fili busca o clinch vs quantas vezes troca a distancia.' },
        { num: 4, title: 'Defesa de Takedown de Delgado', icon: 'Target', description: 'Delgado tem apenas 60% de defesa de takedown. Se Fili decidir lutar como wrestler, pode encontrar sucesso. Observe se Fili muda o gameplan e comeca a derrubar Delgado no chao.' },
        { num: 5, title: 'Cardio no Terceiro Round', icon: 'Activity', description: 'Se a luta chegar ao terceiro round, observe o ritmo de Delgado. Ele so lutou 3 rounds uma vez (contra Wood). Fili e um veterano de 3 rounds. Se Delgado desacelerar, Fili pode roubar a luta no final.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'FILI VS DELGADO', content: 'UFC Fight Night\n14 de Marco, 2026\nUFC APEX, Las Vegas\n\nPeso Pena | 3 Rounds', color: 'red' },
        { slide_number: 2, title: 'ANDRE FILI', content: '25-12-0 | Veterano\n\n25 lutas no UFC desde 2013\n5 decisoes divididas (recorde!)\n10 KOs | 3 Subs | 12 Decisoes\nO gatekeeper definitivo', color: 'red' },
        { slide_number: 3, title: 'JOSE DELGADO', content: '10-2-0 | Prospecto\n\n8.22 strikes significativos/min\n100% taxa de finalizacao\n6 KOs | 4 Subs | 0 Decisoes\nNunca foi para os juizes', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Delgado por TKO R2\nConfianca: MEDIA-ALTA\n\n30% Fili | 67% Delgado | 3% Empate\n\nVolume e juventude vs experiencia', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Fili vs Delgado no UFC Fight Night sabado. 25 lutas no UFC vs 100% taxa de finalizacao. O veterano contra a nova geracao. Uma das lutas mais interessantes do card.' },
        { num: '2/5', text: 'Delgado: 8.22 strikes significativos por minuto. 55% de precisao. 10 vitorias, ZERO decisoes. Esse cara simplesmente nao deixa a luta ir pros juizes. Nocaute em 26 segundos na ultima.' },
        { num: '3/5', text: 'Red flag pra Fili: finalizado no R1 nas duas ultimas derrotas (Costa por sub, Ige por KO). Contra Delgado, que e um finalizador nato, esse padrao e muito preocupante.' },
        { num: '4/5', text: 'Mas nao subestimem Fili. 5 decisoes divididas na carreira (recorde do UFC). Esse cara sabe fazer lutas feias e sobreviver. Se ele aguentar os primeiros 5 minutos, tudo muda.' },
        { num: '5/5', text: 'Minha pick: Delgado por TKO no segundo round. Volume e juventude vao pesar. Mas se a luta chegar ao terceiro round, nao me surpreenderia Fili roubar por decisao dividida. Classico veterano vs prospect.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O cara com 25 lutas no UFC contra o prospect com 100% de taxa de finalizacao. Zero decisoes em 10 vitorias. Fili vs Delgado, sabado no APEX."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Delgado: 8.22 strikes por minuto, 55% de precisao, 6 KOs e 4 submissoes em 10 lutas. Fili: 25 lutas no UFC, 5 decisoes divididas, mas finalizado no R1 nas duas ultimas derrotas. Os numeros favorecem Delgado pesado."' },
        { time: '25-40s', title: 'A Chave', text: '"Tudo depende dos primeiros 5 minutos. Se Delgado finaliza cedo, acabou. Se Fili sobrevive e leva pro clinch sujo, a experiencia pode pesar. A defesa de takedown de Delgado e so 60%, e Fili sabe usar isso."' },
        { time: '40-50s', title: 'Previsao', text: '"Delgado por TKO no segundo round. Confianca media-alta. O volume e simplesmente grande demais. Mas se chegar ao terceiro, cuidado com o upset."' },
        { time: '50-60s', title: 'CTA', text: '"Quem voce acha? O veterano ou o prospect? Comenta ai embaixo e segue pra mais analises de UFC."' },
      ],
      tiktok: [
        { hook: 'Um lutador com ZERO decisoes em 10 vitorias encontra o veterano com 5 decisoes divididas.', body: 'Delgado: 8.22 strikes por minuto, nocaute em 26 segundos na ultima. Fili: 25 lutas no UFC, 13 anos de octogono. Um finaliza, o outro sobrevive. So um pode ganhar.', cta: 'Quem leva? Comenta FILI ou DELGADO.' },
        { hook: 'A red flag que ninguem esta vendo na luta Fili vs Delgado.', body: 'Fili foi FINALIZADO no primeiro round nas duas ultimas derrotas. Contra um cara com 100% de taxa de finalizacao. A matematica e cruel. Mas ele ja deu upset 5 vezes por decisao dividida.', cta: 'Salva esse video pra assistir antes da luta.' },
        { hook: '25 lutas no UFC. VINTE E CINCO. E ele ainda ta aqui.', body: 'Andre Fili tem mais lutas no UFC que a maioria dos rostos que voce ve no card. Ele empatou o recorde de decisoes divididas do UFC. Esse cara simplesmente NAO desiste. Mas sera que e o suficiente contra Delgado?', cta: 'Segue pra mais conteudo de UFC que voce nao encontra em outro lugar.' },
      ],
      headlines: [
        'Fili vs Delgado: 25 Lutas no UFC Contra Zero Decisoes em 10 Vitorias',
        'O Volume Absurdo de Delgado Sera Demais Para o Veterano Fili?',
        'Andre Fili: O Homem das Decisoes Divididas Encontra Seu Maior Desafio',
        'Delgado: O Prospect de 100% Finalizacao Pronto Para o Proximo Nivel',
        'Veterano vs Nova Geracao: A Analise Completa de Fili vs Delgado',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+260',
        fighter2_odds: '-330',
        fighter1_name: 'Fili',
        fighter2_name: 'Delgado',
        source: 'Media de DraftKings e FanDuel (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Volume de Strikes Absurdo', stat_headline: '8.22 STRIKES SIGNIFICATIVOS POR MINUTO PARA DELGADO', contexto: 'Delgado tem mais que o dobro do volume de Fili (3.87). Esse tipo de diferenca de volume cria uma vantagem estatistica massiva, especialmente contra a defesa de apenas 51% de Fili.', implicacao_aposta: 'Favorece apostas em Delgado por KO/TKO. O volume vai criar oportunidades de finalizacao.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Precisao Superior', stat_headline: '55% DE PRECISAO DE DELGADO CONTRA 38% DE FILI', contexto: 'A diferenca de 17 pontos percentuais na precisao e uma das maiores disparidades do card. Delgado acerta mais da metade dos golpes. Fili acerta menos de 40%.', implicacao_aposta: 'Odds de Delgado por KO/TKO provavelmente estao subvalorizadas pelo mercado.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Padrao de Finalizacao no R1', stat_headline: 'FILI FINALIZADO NO R1 NAS 2 ULTIMAS DERROTAS', contexto: 'Costa por submissao (4:30 do R1) e Ige por KO (2:43 do R1). Quando Fili nao consegue estabelecer seu ritmo, ele e vulneravel a finalizacoes rapidas.', implicacao_aposta: 'Apostas em "luta nao vai para decisao" e "Under 2.5 rounds" tem valor.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Fator Experiencia', stat_headline: '25 LUTAS NO UFC E 5 DECISOES DIVIDIDAS', contexto: 'Fili e um dos lutadores mais experientes do roster. A experiencia no octogono e um fator real, especialmente em lutas apertadas. Cinco decisoes divididas mostram que ele sabe competir ate o ultimo segundo.', implicacao_aposta: 'Se voce acredita que a luta vai para decisao, Fili a +260 tem valor como upset.', edge_level: 'leve', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Takedown Fragil', stat_headline: '60% DE DEFESA DE TAKEDOWN PARA DELGADO', contexto: 'Delgado defende apenas 60% dos takedowns. Fili tem 45% de precisao de takedown. Se Fili decidir lutar como wrestler, pode encontrar sucesso e mudar a dinamica da luta completamente.', implicacao_aposta: 'Reduz a confianca em Delgado por KO/TKO. Se Fili for pro chao, a luta muda.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Delgado -330', odds: '-330', confianca: 'alta', raciocinio: 'Vantagens em volume, precisao e poder sao significativas demais para ignorar. Fili foi finalizado cedo nas ultimas 2 derrotas.' },
        { tipo: 'Metodo', pick: 'Delgado por KO/TKO', odds: '-120', confianca: 'alta', edge_vs_mercado: '60% das vitorias de Delgado por KO/TKO + vulnerabilidade de Fili', raciocinio: 'O metodo mais provavel de vitoria. Delgado e um striker explosivo e Fili e vulneravel a nocautes no primeiro round.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 rounds', odds: '+100', confianca: 'media', raciocinio: 'Delgado finaliza cedo (26 seg, 2:58 min). Fili e vulneravel no R1. A combinacao sugere que a luta provavelmente nao chega ao terceiro round.' },
        { tipo: 'Moneyline', pick: 'Fili +260 (upset pick)', odds: '+260', confianca: 'baixa', edge_vs_mercado: 'Experiencia + decisoes divididas + defesa de TD fragil de Delgado', raciocinio: 'Se voce acredita que Fili pode sobreviver 5 minutos e transformar em luta suja, +260 tem valor como aposta de risco. Fili ja fez isso 5 vezes na carreira.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Apostar em Fili por Decisao',
        descricao: 'E tentador acreditar que Fili pode levar a luta para 3 rounds e vencer por decisao como ele fez tantas vezes. Mas o volume de Delgado (8.22/min) e a vulnerabilidade de Fili a finalizacoes precoces tornam improvavel que ele sobreviva 15 minutos completos contra esse tipo de pressao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};
