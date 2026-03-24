import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'lemos-vs-robertson',
  evento_id: null,
  slug: 'lemos-vs-robertson',
  titulo: 'Lemos vs Robertson: Poder Brutal vs Controle Implacavel',
  subtitulo: 'A nocauteadora mais temida do peso-palha enfrenta a maior finalizadora da historia do UFC feminino',
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
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Amanda Lemos',
    record: '15-5-1',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Gillian Robertson',
    record: '16-8-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Palha Feminino (115 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // Full Analysis (15 sections)
  // ===========================
  full_analysis: {
    // -------------------------------------------------
    // 1. HERO SECTION
    // -------------------------------------------------
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
      categoria_peso: 'Peso Palha Feminino (115 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Poder Brutal vs Controle Implacavel',
      tagline_sub: 'A nocauteadora brasileira com recorde de knockdowns enfrenta a rainha das finalizacoes do UFC feminino',
      fighter1: {
        nome_completo: 'Amanda "Amandinha" Lemos',
        apelido: 'Amandinha',
        sobrenome: 'Lemos',
        record: '15-5-1',
        ranking: '#5 Peso Palha',
        info_extra: 'Belem, Para, Brasil | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Gillian "The Savage" Robertson',
        apelido: 'The Savage',
        sobrenome: 'Robertson',
        record: '16-8-0',
        ranking: '#8 Peso Palha',
        info_extra: 'Niagara Falls, Canada | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    // -------------------------------------------------
    // 2. NARRATIVA
    // -------------------------------------------------
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">A Equacao Que Decide Tudo: Onde Essa Luta Acontece?</h3>
        <p>Essa e uma daquelas lutas onde o resultado depende quase inteiramente de uma pergunta simples: <strong class="text-blue-400">Gillian Robertson</strong> consegue levar a luta para o chao? Se sim, ela tem todas as ferramentas para dominar. Se nao, <strong class="text-ufc-red">Amanda Lemos</strong> tem o tipo de poder que encerra noites em um piscar de olhos.</p>
        <p><strong class="text-ufc-red">Lemos</strong> detem o recorde de mais knockdowns na historia do peso-palha do UFC: 6 knockdowns ao longo da carreira. Nenhuma mulher nessa divisao bate tao forte. Sao 8 nocautes em 15 vitorias, um numero absurdo para uma divisao onde finalizacoes e decisoes dominam. Sua base southpaw gera angulos incomuns, e a mao esquerda pesada e um perigo constante para qualquer oponente que aceite trocar em pe.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Rainha das Finalizacoes</h3>
        <p><strong class="text-blue-400">Robertson</strong> nao e apenas boa no chao. Ela e historica. Com 7 finalizacoes no UFC, detem o recorde absoluto de submissions no UFC feminino. Seis guilhotinas traseiras e tres armbars compoe seu arsenal, e ela continua evoluindo. Nas ultimas lutas, Robertson adicionou ground-and-pound a partir do controle de costas, tornando-se ainda mais perigosa quando consegue a queda.</p>
        <p>Com media de 2.74 quedas por 15 minutos, Robertson impoe uma pressao de wrestling que pouquissimas mulheres do peso-palha conseguem sustentar. E o que torna essa luta tao intrigante e que Lemos tem apenas 55% de defesa de takedown, um numero que sugere vulnerabilidade real contra o estilo de Robertson.</p>

        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p>Para <strong class="text-ufc-red">Lemos</strong>, aos 38 anos e vindo de duas derrotas nas ultimas tres lutas, essa e uma luta crucial para se manter na conversa do top 5. Uma vitoria sobre a #8 do mundo mantem seu status de elite e abre portas para lutas contra nomes no topo da divisao.</p>
        <p>Para <strong class="text-blue-400">Robertson</strong>, embalada por 4 vitorias consecutivas, essa e a maior oportunidade da carreira. Derrotar a #5 do mundo a colocaria firmemente no top 5 e provaria que sua evolucao no The Goat Shed com Din Thomas a transformou em uma ameaca real ao cinturao.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#5, precisa vencer para se manter na elite', fighter2: '#8, vitoria a coloca no top 5' },
        { dimensao: 'Sequencia', fighter1: '3-3 nas ultimas 6, fase instavel', fighter2: '4 vitorias seguidas, melhor fase da carreira' },
        { dimensao: 'Narrativa', fighter1: 'A brasileira que bate mais forte na divisao', fighter2: 'A recordista de finalizacoes que nao para de evoluir' },
        { dimensao: 'Risco', fighter1: 'Terceira derrota nas ultimas 4 lutas', fighter2: 'Exposicao contra striker de elite' },
        { dimensao: 'Recompensa', fighter1: 'Volta a onda positiva e se mantem como ameaca', fighter2: 'Maior vitoria da carreira e entrada definitiva na elite' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A BRASILEIRA LEMBRA QUEM MANDA',
          subtitulo: 'Lemos prova que seu poder e demais para Robertson e que ninguem troca em pe com ela no peso-palha.',
          consequencias: [
            {
              tag: 'RANKING',
              texto: 'Mantem-se firme no top 5 da divisao e reafirma seu status de elite, com uma vitoria convincente sobre uma oponente ranqueada em grande fase.',
            },
            {
              tag: 'LEGADO',
              texto: 'Mais um nocaute para a colecao. Lemos consolida ainda mais seu recorde de knockdowns no peso-palha e mostra que, aos 38 anos, ainda e a striker mais perigosa da divisao.',
            },
            {
              tag: 'PROXIMA LUTA',
              texto: 'Uma vitoria abre caminho para lutas contra nomes como Tatiana Suarez (revanche), Virna Jandiroba ou uma disputa contra outra top 5 em card grande.',
            },
          ],
          proxima_luta: 'Luta contra oponente do top 5, possivelmente revanche com Suarez ou luta contra outra ranqueada',
        },
        fighter2_vence: {
          titulo: 'A EVOLUCAO COMPLETA DE THE SAVAGE',
          subtitulo: '5 vitorias seguidas e a maior vitoria da carreira. Robertson prova que e ameaca real ao cinturao.',
          consequencias: [
            {
              tag: 'RANKING',
              texto: 'Salta da #8 para o top 5, marcando a maior escalada da sua carreira. Com 30 anos, chega ao auge no momento perfeito.',
            },
            {
              tag: 'HYPE',
              texto: 'Derrotar a striker mais perigosa da divisao com seu jogo de chao seria uma demonstracao de dominancia. O mundo do MMA comecaria a falar de Robertson como candidata ao cinturao.',
            },
            {
              tag: 'PROXIMA LUTA',
              texto: 'O UFC provavelmente a coloca contra uma top 3: Yan Xiaonan, Tatiana Suarez ou ate uma luta eliminatoria pelo cinturao. A escalada continua.',
            },
          ],
          proxima_luta: 'Luta contra top 3 da divisao, possivelmente Yan Xiaonan ou Tatiana Suarez em luta eliminatoria',
        },
      },
    },

    // -------------------------------------------------
    // 3. MOMENTO ATUAL
    // -------------------------------------------------
    momento_atual: {
      fighter1: {
        nome: 'Amanda Lemos',
        color: 'red',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Tatiana Suarez',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: '#3 WSW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Luta competitiva contra ex-campea interina. Perdeu por controle de wrestling.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Denise Lucindo',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'Sem ranking',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria solida mas sem brilho contra oponente sem ranking.',
          },
          {
            date: 'Jul 2024',
            opponent: 'Virna Jandiroba',
            result: 'L',
            method: 'Finalizacao R2 (armbar)',
            opponent_rank: '#4 WSW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Submetida no segundo round. Jandiroba explorou o chao apos takedown.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Mackenzie Dern',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: '#8 WSW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Performance excelente contra especialista de chao. Fight of the Night.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Zhang Weili',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'Campea WSW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Disputa de cinturao. Competitiva mas superada pela campea ao longo de 5 rounds.',
          },
        ],
        layoff_warning: null,
        momentum_score: 4,
        momentum_label: 'INSTAVEL',
        momentum_trend: 'descending',
        momentum_note: 'Fase oscilante com 3 derrotas nas ultimas 5 lutas, todas contra oponentes de alto nivel. Vence quando mantem a luta em pe, perde quando levada ao chao.',
      },
      fighter2: {
        nome: 'Gillian Robertson',
        color: 'blue',
        recent_fights: [
          {
            date: 'Mai 2025',
            opponent: 'Marina Rodriguez',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: '#11 WSW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Evolucao no ground-and-pound. Parou Rodriguez com golpes do controle de costas.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Lupita Pinheiro',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'Sem ranking',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Dominio total por wrestling. Vitoria confortavel.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Michelle Waterson-Gomez',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'Sem ranking',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Controle posicional e takedowns consistentes ao longo de 3 rounds.',
          },
          {
            date: 'Jan 2024',
            opponent: 'Polyana Viana',
            result: 'W',
            method: 'TKO R2',
            opponent_rank: 'Sem ranking',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Mais uma finalizacao por golpes no chao. Mostrando evolucao no GnP.',
          },
          {
            date: 'Jun 2023',
            opponent: 'Tabatha Ricci',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: '#14 WSW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Nao conseguiu impor o wrestling. Ricci controlou a distancia em pe.',
          },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'EM ALTA',
        momentum_trend: 'ascending',
        momentum_note: '4 vitorias consecutivas e na melhor fase da carreira. Evolucao visivel no ground-and-pound e na confianca geral. A mudanca para o The Goat Shed com Din Thomas esta dando resultados claros.',
      },
    },

    // -------------------------------------------------
    // 4. NIVEL DE COMPETICAO
    // -------------------------------------------------
    nivel_competicao: {
      fighter1: {
        nome: 'Amanda Lemos',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '2W-3L (40%)',
        contra_top5: '0W-2L',
      },
      fighter2: {
        nome: 'Gillian Robertson',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum recentes no peso-palha. Lemos enfrentou a elite da divisao (Zhang, Suarez, Jandiroba) enquanto Robertson venceu principalmente oponentes fora do ranking. Essa luta e o primeiro grande teste de Robertson contra o top 5.',
    },

    // -------------------------------------------------
    // 5. OPONENTE COMUM
    // -------------------------------------------------
    oponente_comum: null,

    // -------------------------------------------------
    // 6. COMPARACAO ESTATISTICA
    // -------------------------------------------------
    comparacao_estatistica: {
      stats: [
        { label: 'Strikes Significativos/min', valueA: 3.54, valueB: 2.86, maxVal: 6, format: 'decimal', note: 'Lemos conecta 24% mais strikes por minuto' },
        { label: 'Precisao de Strikes', valueA: 55, valueB: 48, maxVal: 100, format: 'percent', note: 'Lemos e mais precisa com 55% vs 48%' },
        { label: 'Strikes Absorvidos/min', valueA: 4.66, valueB: 2.86, maxVal: 7, format: 'decimal', note: 'Lemos absorve muito mais golpes', reverseWinner: true },
        { label: 'Defesa de Strikes', valueA: 42, valueB: 56, maxVal: 100, format: 'percent', note: 'Defesa de Lemos e preocupantemente baixa' },
        { label: 'Quedas/15min', valueA: 0.82, valueB: 2.74, maxVal: 5, format: 'decimal', note: 'Robertson tenta 3x mais takedowns' },
        { label: 'Precisao de Quedas', valueA: 55, valueB: 40, maxVal: 100, format: 'percent', note: 'Lemos mais precisa, mas tenta muito menos' },
        { label: 'Defesa de Quedas', valueA: 55, valueB: 41, maxVal: 100, format: 'percent', note: 'Ambas vulneraveis a takedowns' },
        { label: 'Submissoes/15min', valueA: 0, valueB: 0.9, maxVal: 3, format: 'decimal', note: 'Robertson e ameaca constante de finalizacao' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '30 anos', note: '8 anos de diferenca' },
        { label: 'Altura', fighter1: '1.63m (5\'4")', fighter2: '1.65m (5\'5")', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '165cm (65")', fighter2: '160cm (63")', note: 'Lemos tem 5cm de vantagem' },
        { label: 'Postura', fighter1: 'Southpaw', fighter2: 'Ortodoxa', note: 'Confronto southpaw vs ortodoxa' },
        { label: 'Ranking', fighter1: '#5 WSW', fighter2: '#8 WSW', note: null },
        { label: 'Academia', fighter1: 'Marajo Brothers Team', fighter2: 'The Goat Shed', note: null },
        { label: 'Record', fighter1: '15-5-1', fighter2: '16-8-0', note: null },
      ],
    },

    // -------------------------------------------------
    // 7. PERFIL DE HABILIDADES
    // -------------------------------------------------
    perfil_habilidades: {
      skills: [
        { label: 'Trocacao', valueA: 85, valueB: 45, labelA: 'Excelente', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Lemos e a melhor striker do peso-palha. Poder de nocaute real e base southpaw.' },
        { label: 'Wrestling Ofensivo', valueA: 35, valueB: 80, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Robertson vive de takedowns com 2.74/15min. Pressao constante.' },
        { label: 'Wrestling Defensivo', valueA: 50, valueB: 40, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: '55% vs 41% de defesa. Ambas vulneraveis mas Lemos e um pouco melhor.' },
        { label: 'Jiu-Jitsu', valueA: 45, valueB: 90, labelA: 'Medio', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Robertson e faixa preta de BJJ com 7 finalizacoes no UFC. Nivel historico.' },
        { label: 'Cardio/Ritmo', valueA: 55, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Robertson mantem pressao de wrestling por 3 rounds. Lemos diminui ritmo se a luta se estende.' },
        { label: 'Poder de Finalizacao', valueA: 90, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Recorde de knockdowns na divisao (6). 8 nocautes em 15 vitorias.' },
        { label: 'Controle Posicional', valueA: 35, valueB: 85, labelA: 'Medio', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Robertson domina no chao com controle de costas e transicoes fluidas.' },
        { label: 'Versatilidade', valueA: 50, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Lemos depende da trocacao, Robertson depende do grappling. Ambas limitadas fora da zona de conforto.' },
      ],
      insight: 'Esse e um classico confronto de especialistas. Lemos domina em pe com poder raro na divisao, enquanto Robertson domina no chao com habilidade historica de finalizacao. A luta sera decidida por quem impoe seu jogo.',
      fighter1_total: 445,
      fighter2_total: 530,
    },

    // -------------------------------------------------
    // 8. DISTRIBUICAO DE VITORIAS
    // -------------------------------------------------
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Amanda Lemos',
        ko_tko: { count: 8, percent: 53 },
        submission: { count: 3, percent: 20 },
        decision: { count: 4, percent: 27 },
        total_wins: 15,
      },
      fighter2: {
        nome: 'Gillian Robertson',
        ko_tko: { count: 2, percent: 13 },
        submission: { count: 9, percent: 56 },
        decision: { count: 5, percent: 31 },
        total_wins: 16,
      },
      insight: 'Os perfis de vitoria sao diametralmente opostos. Lemos finaliza 53% das vitorias por nocaute, um numero absurdo para o peso-palha feminino. Robertson, por outro lado, finaliza 56% por submissao, com 9 finalizacoes na carreira (7 no UFC, recorde historico). Lemos quer encerrar em pe, Robertson quer encerrar no chao.',
    },

    // -------------------------------------------------
    // 9. DANGER ZONES
    // -------------------------------------------------
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM LEMOS',
          color: 'red',
          title: 'A Zona de Perigo da Brasileira',
          description: 'O primeiro round e onde Lemos e mais perigosa. Fresca e com poder total, sua mao esquerda southpaw e um perigo constante. Se Robertson nao conseguir a queda cedo, pode ser surpreendida por um golpe que muda tudo. Lemos tem 8 nocautes na carreira e a maioria acontece nos primeiros minutos.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Batalha Pelo Controle',
          description: 'No segundo round, a luta se define. Se Robertson conseguiu takedowns no R1, ela ganha confianca e aumenta a pressao. Se Lemos defendeu as quedas, Robertson pode estar mais cautelosa, abrindo espaco para a trocacao. A defesa de takedown de Lemos (55%) sera testada apos o desgaste do primeiro round.',
        },
        {
          rounds: 'R3',
          danger_level: 8,
          danger_label: 'VANTAGEM ROBERTSON',
          color: 'green',
          title: 'O Cardio e o Controle Decidem',
          description: 'Se a luta chega ao terceiro round, Robertson tem vantagem clara. Seu cardio e superior e ela mantem pressao de wrestling mesmo nos minutos finais. Lemos, que absorve 4.66 golpes por minuto e tende a diminuir o ritmo, pode ficar vulneravel a takedowns tardios. E aqui que Robertson busca a finalizacao ou garante rounds no cartao.',
        },
      ],
    },

    // -------------------------------------------------
    // 10. INTANGIVEIS (RED FLAGS E FATORES INVISIVEIS)
    // -------------------------------------------------
    intangiveis: {
      items: [
        {
          icon: 'TrendingUp',
          title: 'Momentum de Robertson',
          fighter: 'Gillian Robertson',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: '4 vitorias consecutivas, incluindo um TKO sobre Marina Rodriguez. A mudanca para o The Goat Shed com Din Thomas transformou seu jogo. Robertson nunca esteve tao confiante e completa.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Historico Contra Grapplers',
          fighter: 'Amanda Lemos',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Lemos tem um padrao preocupante: foi submetida por Jandiroba (armbar R2) e perdeu para Suarez por wrestling. Quando oponentes de grappling conseguem levar ao chao, Lemos nao consegue se levantar de forma consistente.',
        },
        {
          icon: 'Brain',
          title: 'Vantagem de Experiencia no Topo',
          fighter: 'Amanda Lemos',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Lemos lutou contra Zhang Weili pelo cinturao, enfrentou Jandiroba e Suarez. Esse nivel de experiencia contra a elite pode fazer diferenca em momentos de pressao. Robertson nunca enfrentou uma top 5.',
        },
        {
          icon: 'Zap',
          title: 'Poder de Nocaute no Peso Palha',
          fighter: 'Amanda Lemos',
          risk_level: 'POSITIVO',
          risk_color: 'green',
          description: 'Com 6 knockdowns, Lemos detem o recorde da divisao. Esse tipo de poder e um equalizador. Mesmo que Robertson domine a maior parte da luta, um unico momento de descuido pode resultar em nocaute.',
        },
        {
          icon: 'Clock',
          title: 'Fator Idade',
          fighter: 'Amanda Lemos',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Aos 38 anos, Lemos e 8 anos mais velha que Robertson. A diferenca de idade pode impactar o cardio e a capacidade de recuperacao, especialmente se a luta se estender ate o terceiro round.',
        },
        {
          icon: 'Shield',
          title: 'Defesa de Strikes de Lemos (42%)',
          fighter: 'Amanda Lemos',
          risk_level: 'RISCO ALTO',
          risk_color: 'red',
          description: 'Absorver 4.66 golpes por minuto com apenas 42% de defesa e um numero alarmante. Mesmo contra Robertson, que nao e conhecida pela trocacao, essa vulnerabilidade pode gerar momentos de perigo inesperados.',
        },
      ],
    },

    // -------------------------------------------------
    // 11. CAMINHOS PARA VITORIA
    // -------------------------------------------------
    caminhos_vitoria: {
      fighter1: {
        nome: 'Amanda Lemos',
        total_probability: 38,
        scenarios: [
          {
            name: 'Nocaute Devastador',
            probability: 20,
            method: 'KO/TKO R1-R2',
            description: 'Lemos mantem Robertson a distancia com jabs e cruzados southpaw, punindo cada tentativa de entrada para takedown. Uma mao esquerda pesada no meio de uma troca ou um contra-ataque durante uma entrada de Robertson encerra a noite. Cenario mais provavel: overhand left no R1.',
          },
          {
            name: 'Sprawl e Brawl',
            probability: 10,
            method: 'Decisao Dividida',
            description: 'Lemos defende os takedowns de Robertson consistentemente (55% TDD) e acumula dano em pe. Vence rounds com golpes significativos e impede que Robertson controle a luta no chao. Uma decisao apertada, provavelmente 29-28.',
          },
          {
            name: 'TKO no Clinch',
            probability: 8,
            method: 'TKO R2-R3',
            description: 'Quando Robertson tenta encurtar distancia para o takedown, Lemos usa joelhadas, cotoveladas e uppercuts no clinch para causar dano cumulativo. Robertson, que nao e conhecida pelo queixo forte, pode ser parada por golpes no clinch.',
          },
        ],
      },
      fighter2: {
        nome: 'Gillian Robertson',
        total_probability: 62,
        scenarios: [
          {
            name: 'Controle Total no Chao',
            probability: 28,
            method: 'Decisao Unanime',
            description: 'Robertson impoe takedowns repetidos, controla Lemos no chao por longos periodos e acumula tempo de controle. Lemos nao consegue se levantar e perde 2 ou 3 rounds claramente. Padrao similar ao que Suarez e Jandiroba fizeram contra Lemos.',
          },
          {
            name: 'Finalizacao por Submissao',
            probability: 22,
            method: 'Submissao R2-R3',
            description: 'Robertson consegue as costas de Lemos apos takedown e aplica rear-naked choke, seu golpe favorito (6 RNCs na carreira). O desgaste do wrestling e do controle posicional abre a oportunidade para a finalizacao, especialmente no R2-R3 quando Lemos esta mais cansada.',
          },
          {
            name: 'TKO por Ground and Pound',
            probability: 12,
            method: 'TKO R2-R3',
            description: 'A evolucao mais recente de Robertson entra em acao. Apos conseguir controle de costas ou mount, Robertson aplica ground-and-pound ate a paralisacao do arbitro. Fez isso contra Rodriguez e Viana nas ultimas lutas.',
          },
        ],
      },
    },

    // -------------------------------------------------
    // 12. PREVISAO FINAL
    // -------------------------------------------------
    previsao_final: {
      winner_name: 'Gillian Robertson',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Robertson deve vencer por decisao unanime com base em wrestling dominante. A pressao de takedowns (2.74/15min) contra a defesa inconsistente de Lemos (55% TDD) favorece Robertson, especialmente considerando que Lemos ja demonstrou vulnerabilidade contra grapplers de elite (Jandiroba, Suarez). Com 4 vitorias seguidas e evolucao clara no jogo, Robertson tem momentum, cardio e gameplan para controlar essa luta por 3 rounds. O perigo constante de nocaute de Lemos, porem, impede que a confianca seja alta.',
      x_factor: {
        title: 'Poder de Nocaute de Lemos',
        description: 'Robertson nunca enfrentou uma striker tao perigosa. Um unico momento de descuido na entrada para takedown pode resultar em nocaute. Lemos detem o recorde de knockdowns na divisao (6) e 53% das suas vitorias sao por KO/TKO.',
      },
      upset_alert: {
        title: 'O Momento da Entrada',
        description: 'A janela de perigo para Robertson e clara: os segundos entre a distancia e o clinch, quando ela fecha distancia para o takedown. E nesse momento que Lemos e mais perigosa com uppercuts e joelhadas. Se Robertson comer um golpe limpo nessa transicao, tudo muda.',
      },
      probabilities: {
        fighter1: { nome: 'Amanda Lemos', percent: 38 },
        fighter2: { nome: 'Gillian Robertson', percent: 60 },
        draw: 2,
      },
      value_picks: {
        moneyline: { pick: 'Robertson', reasoning: 'Favorita com vantagem estilistica clara. Wrestling contra striker com TDD mediano e uma formula que funciona.' },
        method: { pick: 'Robertson por Decisao', reasoning: 'O cenario mais provavel e dominio por wrestling sem finalizacao. Lemos e dura e dificil de finalizar quando esta alerta.' },
        over_under: { pick: 'Over 1.5 rounds', rounds: 1.5, reasoning: 'Robertson precisa de tempo para impor o wrestling. E improvavel que a luta acabe no R1, a menos que Lemos conecte um nocaute cedo.' },
        best_value: 'Robertson por decisao oferece o melhor valor considerando o estilo da luta.',
      },
    },

    // -------------------------------------------------
    // 13. O QUE OBSERVAR
    // -------------------------------------------------
    o_que_observar: {
      points: [
        {
          num: 1,
          title: 'Primeiro Takedown: O Momento Decisivo',
          icon: 'Target',
          description: 'A luta inteira pode ser definida pelo primeiro takedown. Se Robertson consegue levar Lemos ao chao nos primeiros 2 minutos, o gameplan esta funcionando e ela ganha confianca para repetir. Se Lemos defende e pune a tentativa, Robertson pode hesitar nas proximas entradas.',
        },
        {
          num: 2,
          title: 'A Mao Esquerda de Lemos na Entrada',
          icon: 'Zap',
          description: 'Observe como Lemos reage as tentativas de takedown. Sua melhor arma e o uppercut ou overhand left no momento em que Robertson baixa o nivel. Se ela acertar uma dessas limpa no R1, pode ser noite curta.',
        },
        {
          num: 3,
          title: 'Robertson no Clinch vs na Distancia',
          icon: 'Repeat',
          description: 'Preste atencao em como Robertson fecha distancia. Se ela usa o clinch na grade para os takedowns (como fez contra Rodriguez), tem mais chance de sucesso. Se tenta penetration steps na distancia, fica mais exposta aos golpes de Lemos.',
        },
        {
          num: 4,
          title: 'Cardio de Lemos no R2 e R3',
          icon: 'Activity',
          description: 'Lemos absorve 4.66 golpes/min e tem 38 anos. Se ela gastar muita energia defendendo takedowns no R1, pode estar significativamente mais lenta nos rounds seguintes. Observe se o volume de strikes dela diminui.',
        },
        {
          num: 5,
          title: 'Evolucao do GnP de Robertson',
          icon: 'ArrowUp',
          description: 'Nas ultimas lutas, Robertson mostrou um ground-and-pound muito mais efetivo. Se ela conseguir as costas de Lemos, observe se busca a finalizacao ou prefere o GnP. Essa escolha pode definir se a luta termina antes do tempo.',
        },
      ],
    },

    // -------------------------------------------------
    // 14. CREATOR KIT
    // -------------------------------------------------
    creator_kit: {
      headlines: [
        'Poder vs Controle: a nocauteadora brasileira contra a rainha das finalizacoes',
        'Lemos tem 6 knockdowns. Robertson tem 7 finalizacoes. Algo vai ceder.',
        'A luta que define quem entra no top 5: Lemos vs Robertson no Fight Night',
        'Forca bruta vs tecnica implacavel: o classico confronto de estilos no peso-palha',
      ],
      instagram: [
        { slide_number: 1, title: 'LEMOS VS ROBERTSON', content: 'Poder Brutal vs Controle Implacavel\n\nUFC Fight Night: Emmett vs Vallejos\n14 de Marco, 2026 | Meta APEX', color: 'red' },
        { slide_number: 2, title: 'AMANDA LEMOS', content: '15-5-1 | #5 Peso Palha\n8 KOs | 6 knockdowns (recorde da divisao)\n55% precisao | Southpaw\nA striker mais perigosa do peso-palha', color: 'red' },
        { slide_number: 3, title: 'GILLIAN ROBERTSON', content: '16-8-0 | #8 Peso Palha\n9 submissoes (7 no UFC, recorde historico)\n2.74 quedas/15min | Faixa preta BJJ\n4 vitorias seguidas', color: 'blue' },
        { slide_number: 4, title: 'CONFRONTO DE ESTILOS', content: 'Em pe: VANTAGEM LEMOS\n3.54 strikes/min vs 2.86\n55% precisao vs 48%\n\nNo chao: VANTAGEM ROBERTSON\n2.74 TD/15min vs 0.82\n0.9 sub/15min vs 0.0', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'Robertson por Decisao Unanime\n\n62% Robertson | 38% Lemos\n\nO wrestling e o grappling de Robertson devem controlar a luta por 3 rounds, mas o poder de Lemos nunca pode ser descartado.', color: 'blue' },
      ],
      twitter: [
        { num: '1/5', text: 'Lemos vs Robertson e o confronto de estilos PERFEITO no peso-palha\n\nLemos: 8 KOs, 6 knockdowns (RECORDE da divisao)\nRobertson: 9 subs, 7 no UFC (RECORDE do UFC feminino)\n\nDuas recordistas. Uma jaula. Algo vai ceder.' },
        { num: '2/5', text: 'O problema de Lemos: toda vez que enfrenta uma grappler de elite, perde.\n\nJandiroba: submetida R2\nSuarez: dominada por wrestling\n\nRobertson tem 2.74 takedowns/15min e Lemos defende apenas 55%. Os numeros contam uma historia clara.' },
        { num: '3/5', text: 'Mas NUNCA descarte Lemos.\n\n53% das vitorias por KO/TKO\n6 knockdowns no peso-palha (ninguem tem mais)\nBase southpaw que gera angulos perigosos\n\nUm golpe. E tudo que ela precisa.' },
        { num: '4/5', text: 'Robertson esta na melhor fase da carreira:\n\n4 vitorias seguidas\nEvoluiu o ground-and-pound (TKO sobre Rodriguez)\nMudou para o The Goat Shed com Din Thomas\n\nAos 30 anos, esse e o momento dela.' },
        { num: '5/5', text: 'PREVISAO: Robertson por Decisao Unanime\n\nO wrestling deve controlar a luta, mas com 38% de chance de upset por nocaute. Se voce gosta de emocao, essa luta vai entregar.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Ela tem o recorde de knockdowns da divisao. A outra tem o recorde de finalizacoes do UFC feminino inteiro. Lemos vs Robertson e o confronto que voce NAO pode perder.' },
        { time: '10-30s', title: 'Contexto', text: 'Amanda Lemos, #5 do mundo, e a mulher mais perigosa do peso-palha. 8 nocautes, poder absurdo, base southpaw. Mas tem uma fraqueza: quando levam ela pro chao, sofre. Perdeu pra Jandiroba por finalizacao e pra Suarez por wrestling.' },
        { time: '30-50s', title: 'A Outra Lado', text: 'E Gillian Robertson? 7 finalizacoes no UFC. RECORDE HISTORICO. Faixa preta de BJJ, 2.74 takedowns por 15 minutos, 4 vitorias seguidas. Ela evoluiu o ground-and-pound e esta na melhor fase da vida. Esse e o maior teste da carreira dela.' },
        { time: '50-70s', title: 'A Chave', text: 'A luta se resume a uma pergunta: Robertson consegue o takedown? Se sim, ela domina no chao. Se nao, Lemos pode nocautear qualquer uma. Os 55% de defesa de takedown de Lemos sao o numero mais importante dessa luta.' },
        { time: '70-90s', title: 'Previsao e CTA', text: 'Minha previsao: Robertson por decisao unanime. O wrestling deve controlar, mas com risco real de nocaute no R1. Me segue pra mais analises e me conta: quem voce acha que vence?' },
      ],
      tiktok: [
        {
          hook: 'Ela tem MAIS KNOCKDOWNS que qualquer mulher na historia do peso-palha. E vai lutar contra a mulher com MAIS FINALIZACOES da historia do UFC feminino.',
          body: 'Amanda Lemos, 8 nocautes, poder absurdo, base southpaw. Contra Gillian Robertson, 7 subs no UFC, faixa preta que domina no chao. O confronto perfeito de estilos: se fica em pe, Lemos nocauteia. Se vai pro chao, Robertson finaliza. A defesa de takedown de Lemos (55%) vai decidir tudo.',
          cta: 'Robertson por decisao, mas com perigo REAL de nocaute. Quem voce aposta? Comenta ai.',
        },
      ],
    },

    // -------------------------------------------------
    // 15. RADAR DO APOSTADOR
    // -------------------------------------------------
    radar_apostador: {
      odds: {
        fighter1_odds: '+150 a +210',
        fighter2_odds: '-250 a -180',
        fighter1_name: 'Amanda Lemos',
        fighter2_name: 'Gillian Robertson',
        source: 'Linhas de abertura consolidadas (Marco 2026)',
      },
      edges: [
        {
          icon: 'TrendingDown',
          titulo: 'Vulnerabilidade ao Wrestling',
          stat_headline: 'Lemos: 55% TDD vs Robertson: 2.74 TD/15min',
          contexto: 'Lemos ja perdeu para duas grapplers recentemente (Jandiroba por sub, Suarez por decisao). Robertson tenta quase 3 takedowns por round.',
          implicacao_aposta: 'Favorece Robertson por decisao ou finalizacao. A tendencia de Lemos de perder contra grapplers e consistente.',
          edge_level: 'forte',
          fighter_side: 'fighter2',
        },
        {
          icon: 'Zap',
          titulo: 'Poder de Nocaute Equalizador',
          stat_headline: 'Lemos: 53% de vitorias por KO/TKO (8 de 15)',
          contexto: 'Mesmo como underdog, Lemos tem o tipo de poder que pode encerrar qualquer luta a qualquer momento. 6 knockdowns no peso-palha e recorde.',
          implicacao_aposta: 'Valor em Lemos por KO/TKO, especialmente no R1. As odds de underdog podem subestimar o poder de finalizacao.',
          edge_level: 'moderado',
          fighter_side: 'fighter1',
        },
        {
          icon: 'Clock',
          titulo: 'Tendencia de Duracao',
          stat_headline: 'Robertson vence 5 de 16 por decisao (31%)',
          contexto: 'Quando Robertson controla a luta, frequentemente vai para decisao. Mas nas ultimas 2 lutas, mostrou finalizacoes mais cedo (TKO R2 contra Rodriguez e Viana).',
          implicacao_aposta: 'Over 1.5 rounds parece solido. A luta provavelmente vai alem do primeiro round, mas a evolucao de Robertson no GnP pode encurtar.',
          edge_level: 'moderado',
          fighter_side: 'neutral',
        },
        {
          icon: 'BarChart',
          titulo: 'Confronto Southpaw vs Ortodoxa',
          stat_headline: 'Lemos: Southpaw com 65" de envergadura vs Robertson: Ortodoxa com 63"',
          contexto: 'A base southpaw de Lemos gera angulos incomuns que podem dificultar a entrada de Robertson. A vantagem de 5cm de envergadura tambem ajuda Lemos a manter distancia.',
          implicacao_aposta: 'Se Lemos mantiver a distancia com o jab da base southpaw, pode frustrar o gameplan de Robertson. Favorece o over e possivelmente Lemos por decisao como cenario alternativo.',
          edge_level: 'leve',
          fighter_side: 'fighter1',
        },
      ],
      value_picks: [
        {
          tipo: 'Moneyline',
          pick: 'Robertson',
          odds: '-180 a -250',
          confianca: 'media',
          edge_vs_mercado: 'Em linha com o mercado. Sem grande valor na favorita.',
          raciocinio: 'Robertson e favorita justificada pelo matchup estilistico. Wrestling contra striker com TDD mediano. Porem, o preco esta correto e nao oferece grande valor.',
        },
        {
          tipo: 'Metodo de Vitoria',
          pick: 'Robertson por Decisao',
          odds: '+130 a +150',
          confianca: 'media',
          raciocinio: 'Cenario mais provavel. Robertson controla via wrestling por 3 rounds. Lemos e dura e dificil de finalizar quando alerta, mas perde rounds por controle.',
        },
        {
          tipo: 'Prop',
          pick: 'Lemos por KO/TKO',
          odds: '+350 a +450',
          confianca: 'baixa',
          edge_vs_mercado: 'Valor potencial como long shot. As odds podem subestimar o poder de Lemos.',
          raciocinio: 'Se voce acredita que Lemos defende os takedowns iniciais, ela tem o poder para encerrar a noite. Aposta de valor com risco elevado, mas odds atrativas.',
        },
      ],
      armadilha: {
        titulo: 'Cuidado com "Robertson por Finalizacao"',
        descricao: 'Apesar de Robertson ter 7 finalizacoes no UFC, Lemos nao e facil de submeter. Sua unica derrota por finalizacao recente foi contra Jandiroba, uma das melhores grapplers da divisao. Robertson tende a vencer por controle e decisao contra oponentes de nivel mais alto. Apostar em finalizacao especifica pode nao compensar.',
      },
      disclaimer: 'Analise estatistica e tatica para fins informativos. O UFC News Hub nao incentiva apostas e nao se responsabiliza por decisoes financeiras baseadas neste conteudo.',
    },

    // betting_value set to null as instructed
    betting_value: null,
  },
};

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
