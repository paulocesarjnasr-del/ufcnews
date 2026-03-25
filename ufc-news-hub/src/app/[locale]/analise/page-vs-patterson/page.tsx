'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';


const analisePT: FullSingleAnalise = {
  id: 'page-vs-patterson',
  evento_id: null,
  slug: 'page-vs-patterson',
  titulo: 'Page vs Patterson: O Showman Contra o Finalizador',
  subtitulo: 'O veterano do karate ponto contra o jovem britanico que finaliza todo mundo',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,91m', envergadura: '196cm', idade: 38, academia: 'London Shootfighters' },
      fighter2: { altura: '1,91m', envergadura: '198cm', idade: 29, academia: 'Team Crossface' },
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
    nome: 'Michael Page',
    record: '24-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Jared Cannonier', method: 'Decisao Unanime', event: 'UFC 319' },
      { result: 'W', opponent: 'Sharabutdin Magomedov', method: 'Decisao Unanime', event: 'UFC Fight Night 250' },
      { result: 'L', opponent: 'Ian Garry', method: 'Decisao Unanime', event: 'UFC 303' },
    ],
  },
  fighter2_info: {
    nome: 'Sam Patterson',
    record: '14-2-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Trey Waters', method: 'TKO R1', event: 'UFC Paris' },
      { result: 'W', opponent: 'Danny Barlow', method: 'KO R1', event: 'UFC Vegas 103' },
      { result: 'W', opponent: 'Kiefer Crosbie', method: 'Sub R1', event: 'UFC 304' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Meio-Medio (170 lbs)',
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
      categoria_peso: 'Peso Meio-Medio (170 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Showman Contra o Finalizador',
      tagline_sub: 'Duelo britanico entre o veterano do karate ponto e o jovem que finaliza todos que cruzam seu caminho',
      fighter1: {
        nome_completo: 'Michael "Venom" Page',
        apelido: 'Venom',
        sobrenome: 'Page',
        record: '24-3-0',
        ranking: '#13 Meio-Medio',
        info_extra: 'Londres, Inglaterra | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Sam "The Future" Patterson',
        apelido: 'The Future',
        sobrenome: 'Patterson',
        record: '14-2-1',
        ranking: 'N/R Meio-Medio',
        info_extra: 'Watford, Inglaterra | 29 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Duelo Britanico Que Londres Merece</h3>
        <p class="mb-4">
          Esse e o tipo de luta que a torcida de Londres ama: dois britanicos, estilos completamente opostos, e a promessa de fogo cruzado. <strong class="text-ufc-red">Michael "Venom" Page</strong> e uma lenda viva do MMA britanico. Dez vezes campeao mundial de kickboxing, estrela do Bellator por quase uma decada, e dono do estilo mais polarizante do esporte: maos baixas, movimentacao imprevisivel, golpes vindos de angulos impossíveis.
        </p>
        <p class="mb-4">
          Aos 38 anos, MVP esta no crepusculo da carreira mas ainda relevante. Tres vitorias em quatro lutas no UFC, incluindo triunfos sobre Kevin Holland no debut, Sharabutdin Magomedov e Jared Cannonier, mostram que ele ainda consegue competir com nomes de alto nivel quando implementa seu gameplan. Mas a derrota para Ian Garry expoe a vulnerabilidade que sempre esteve ali: quando o oponente fecha a distancia e neutraliza a movimentacao, Page sofre.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Futuro Chegou</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Sam Patterson</strong> nao ganhou o apelido "The Future" a toa. Com 29 anos, 1,91m de altura e uma envergadura de quase 2 metros, ele e um pesadelo para qualquer adversario no meio-medio. Quatro vitorias consecutivas no primeiro round, misturando submissoes e nocautes, provam que Patterson nao esta ali para fazer amigos. Sete submissoes na carreira (incluindo arm-triangle choke e mata-leoes) fazem dele um dos finalizadores mais perigosos da divisao.
        </p>
        <p class="mb-4">
          A dinamica e fascinante: Page quer manter distancia e usar seu striking unortodoxo. Patterson quer fechar a distancia, levar ao chao e submeter. Se Patterson conseguir o takedown, Page esta em serio perigo. Se Page manter em pe, a experiencia e as tecnicas nao-convencionais podem frustrar o jovem. O O2 Arena vai estar dividido, e essa e a beleza de um duelo britanico.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#13 Meio-Medio', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: '2 vitorias consecutivas', fighter2: '4 vitorias consecutivas' },
        { dimensao: 'Narrativa', fighter1: 'Manter relevancia aos 38 anos', fighter2: 'Nocautear a lenda e entrar no ranking' },
        { dimensao: 'Risco', fighter1: 'Segunda derrota no UFC em 5 lutas', fighter2: 'Perder a chance de subir de nivel' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O VENOM AINDA PICA',
          subtitulo: 'Page frustra Patterson com movimentacao e timing em pe',
          consequencias: [
            { tag: 'RANKING', texto: 'Page se mantem no top 15 e ganha mais uma luta no O2 Arena contra nome relevante' },
            { tag: 'LEGADO', texto: 'Aos 38 anos, MVP prova que ainda pode competir com os jovens da divisao' },
          ],
          proxima_luta: 'Page vs oponente ranqueado do top 10 em card europeu',
        },
        fighter2_vence: {
          titulo: 'O FUTURO E AGORA',
          subtitulo: 'Patterson submete a lenda e anuncia sua chegada no ranking',
          consequencias: [
            { tag: 'RANKING', texto: 'Patterson entra no top 15 do meio-medio com vitoria sobre lutador ranqueado' },
            { tag: 'PROXIMA', texto: 'Luta contra nome estabelecido do top 10-15 na proxima oportunidade' },
          ],
          proxima_luta: 'Patterson vs oponente ranqueado do top 10-15',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Michael Page',
        color: 'red',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Jared Cannonier', result: 'W', method: 'Decisao Unanime', opponent_rank: 'Ex-desafiante MW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida por decisao contra veterano perigoso. MVP usou movimentacao e contragolpes.' },
          { date: 'Fev 2025', opponent: 'Sharabutdin Magomedov', result: 'W', method: 'Decisao Unanime', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Bom', note: 'Upset impressionante. Page dominou o invicto Magomedov por decisao unanime em Riad.' },
          { date: 'Jun 2024', opponent: 'Ian Garry', result: 'L', method: 'Decisao Unanime', opponent_rank: '#10 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota competitiva para prospect top. Garry controlou a distancia e neutralizou o estilo de Page.' },
          { date: 'Mar 2024', opponent: 'Kevin Holland', result: 'W', method: 'Decisao Unanime', opponent_rank: '#14 WW', quality_score: 3, quality_label: 'Bom', note: 'Debut impressionante no UFC. Page frustrou Holland com movimentacao e contragolpes por 3 rounds.' },
        ],
        full_fight_history: [
          { date: 'Mar 2024', opponent: 'Kevin Holland', result: 'W', method: 'UD', opponent_rank: '#14 WW', quality_score: 3, quality_label: 'Bom', note: 'Debut UFC, vitoria por decisao unanime' },
          { date: 'Jun 2024', opponent: 'Ian Garry', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 4, quality_label: 'Muito Bom', note: 'Derrota por decisao' },
          { date: 'Fev 2025', opponent: 'Sharabutdin Magomedov', result: 'W', method: 'UD', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Bom', note: 'Upset sobre invicto Magomedov em Riad' },
          { date: 'Ago 2025', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: 'Ex-desafiante MW', quality_score: 3, quality_label: 'Bom', note: 'Terceira vitoria no UFC' },
        ],
        layoff_warning: null,
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Page esta em boa fase no UFC. Venceu seu debut contra Holland, perdeu para Garry, e depois emplacou duas vitorias seguidas sobre Magomedov e Cannonier. Tres vitorias em quatro lutas no UFC mostram que MVP e competitivo no mais alto nivel. Aos 38 anos, a janela esta fechando, mas o momento e positivo.',
      },
      fighter2: {
        nome: 'Sam Patterson',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Trey Waters', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO no primeiro round com direitas precisas. Quarta finalizacao consecutiva no R1.' },
          { date: 'Mar 2025', opponent: 'Danny Barlow', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no primeiro round. Tirou o invicto de Barlow com poder brutal.' },
          { date: 'Jul 2024', opponent: 'Kiefer Crosbie', result: 'W', method: 'Submissao R1 (arm-triangle)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao por arm-triangle choke no primeiro round no UFC 304 em Manchester.' },
          { date: 'Jan 2024', opponent: 'Yohan Lainesse', result: 'W', method: 'Submissao R1 (mata-leao)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao por rear-naked choke no primeiro round no UFC 297.' },
        ],
        full_fight_history: [
          { date: 'Mar 2023', opponent: 'Yanal Ashmouz', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Derrota no debut UFC no peso-leve' },
          { date: 'Jan 2024', opponent: 'Yohan Lainesse', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mata-leao no R1, primeira vitoria UFC' },
          { date: 'Jul 2024', opponent: 'Kiefer Crosbie', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Arm-triangle choke no R1' },
          { date: 'Mar 2025', opponent: 'Danny Barlow', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO no R1' },
          { date: 'Set 2025', opponent: 'Trey Waters', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO no R1, quarta vitoria seguida' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Patterson esta numa sequencia impressionante: quatro vitorias consecutivas, todas no primeiro round (duas submissoes e dois nocautes). A transicao do peso-leve para o meio-medio foi perfeita. Com 1,91m e envergadura de quase 2 metros, ele finalmente encontrou seu peso ideal. Esta luta contra Page e o salto de qualidade que ele precisa.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Page',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '3W-1L (75%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Patterson',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Page enfrentou nomes de nivel superior (Holland, Garry, Magomedov, Cannonier) enquanto Patterson vem de vitorias sobre oponentes sem ranking. Essa e a luta que vai mostrar se Patterson esta pronto para o proximo nivel.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.15, valueB: 5.80, maxVal: 7, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 44, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.28, valueB: 3.10, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 55, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.41, valueB: 3.23, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 33, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 42, valueB: 75, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.0, valueB: 2.5, maxVal: 4, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '29 anos', note: 'Page 9 anos mais velho' },
        { label: 'Altura', fighter1: '1,91m (6\'3")', fighter2: '1,91m (6\'3")', note: 'Mesma altura' },
        { label: 'Envergadura', fighter1: '196cm (77")', fighter2: '198cm (78")', note: 'Patterson com leve vantagem' },
        { label: 'Stance', fighter1: 'Southpaw/Switch', fighter2: 'Ortodoxo', note: 'Page troca de stance constantemente' },
        { label: 'Academia', fighter1: 'London Shootfighters', fighter2: 'Team Crossface, Watford', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking em Pe', valueA: 78, valueB: 60, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Page e 10x campeao mundial de kickboxing. Movimentacao e timing unicos, mesmo aos 38 anos.' },
        { label: 'Wrestling/Takedowns', valueA: 30, valueB: 82, labelA: 'Ruim', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Patterson media 3.23 takedowns por 15 min. Page tem apenas 42% de defesa de takedown.' },
        { label: 'Jiu-Jitsu/Submissoes', valueA: 30, valueB: 88, labelA: 'Ruim', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Patterson tem 7 submissoes na carreira. Page tem apenas 3 submissoes em 24 vitorias.' },
        { label: 'Movimentacao e Footwork', valueA: 90, valueB: 55, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'O footwork de Page e unico no MMA. Base de karate ponto com entradas e saidas rapidas.' },
        { label: 'Defesa de Takedown', valueA: 42, valueB: 75, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Page tem apenas 42% de TDD. Contra um wrestler ativo como Patterson, isso e preocupante.' },
        { label: 'Experiencia em Alto Nivel', valueA: 78, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Page ja enfrentou Holland, Garry, Magomedov e Cannonier no UFC. Patterson so enfrentou oponentes sem ranking.' },
      ],
      insight: 'Os estilos sao diametralmente opostos. Page domina em pe com movimentacao e striking criativo, mas Patterson domina no chao com wrestling e submissoes. A luta sera definida por onde acontece: em pe ou no chao.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Page',
        ko_tko: { count: 13, percent: 54 },
        submission: { count: 3, percent: 13 },
        decision: { count: 8, percent: 33 },
        total_wins: 24,
      },
      fighter2: {
        nome: 'Patterson',
        ko_tko: { count: 6, percent: 43 },
        submission: { count: 7, percent: 50 },
        decision: { count: 1, percent: 7 },
        total_wins: 14,
      },
      insight: 'Contraste total. Page e primariamente um striker: 54% KO, 13% submissao, 33% decisao. Patterson e um finalizador no chao: 50% submissao, 43% KO. Patterson quase nunca vai para decisao (apenas 7%). Se a luta for ao chao, e territorio do jovem. Se ficar em pe, e territorio de Page.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM PATTERSON',
          color: 'green',
          title: 'A Guilhotina Espreita',
          description: 'Patterson venceu as quatro ultimas lutas no primeiro round, seja por submissao ou nocaute. Ele entra agressivo buscando o takedown ou a finalizacao desde os primeiros segundos. Se Page nao defender o primeiro takedown, pode ser submetido rapidamente. Patterson tem submissoes diversificadas (arm-triangle, mata-leao) e a envergadura para aplica-las.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Ajustes',
          description: 'Se Page sobreviver o R1, o segundo round pode ser mais equilibrado. Page tem mais experiencia em lutas longas e pode encontrar o timing para seus contragolpes. Patterson raramente chega ao R2 e pode estar em territorio desconhecido.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM PAGE',
          color: 'red',
          title: 'Experiencia Conta',
          description: 'Se a luta chegar ao terceiro round, a experiencia de Page em lutas de 3 rounds (11 decisoes na carreira) pode ser decisiva. Patterson tem apenas 1 vitoria por decisao em 14 lutas. Ir a distancia favorece o veterano.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Clock', title: 'Idade e Quilometragem', fighter: 'Page', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Page tem 38 anos e mais de 20 anos de competicao entre kickboxing e MMA. A quilometragem acumulada pode afetar recuperacao e reflexos, especialmente contra um jovem de 29 anos.' },
        { icon: 'Target', title: 'Vulnerabilidade Conhecida', fighter: 'Page', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'A defesa de takedown de Page (42%) e a maior vulnerabilidade dele. Garry explorou isso na unica derrota de Page no UFC. Patterson, que vive de takedowns e submissoes, vai atacar exatamente esse ponto.' },
        { icon: 'MapPin', title: 'Ambos Britanicos em Casa', fighter: 'Ambos', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'Os dois sao britanicos lutando em Londres. Page de Londres, Patterson de Watford. A torcida pode se dividir, embora Page provavelmente tenha mais fas pelo nome.' },
        { icon: 'Zap', title: 'Vitorias no R1', fighter: 'Patterson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Quatro vitorias consecutivas no primeiro round (duas submissoes e dois KOs). Patterson e um predador de primeiro round que nao desperdica energia. Se conseguir o takedown, fecha o negocio rapido.' },
        { icon: 'Brain', title: 'QI de Luta Veterano', fighter: 'Page', risk_level: 'POSITIVO', risk_color: 'green', description: 'Page ja viu de tudo em quase 30 lutas. Ele sabe como frustrar oponentes, manter distancia e usar o timing a seu favor. A experiencia pode ser o diferencial se a luta ficar em pe.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Page',
        total_probability: 38,
        scenarios: [
          { name: 'Striking de Longa Distancia', probability: 18, method: 'Decisao Unanime', description: 'Page mantem a distancia com footwork e jab, frustra as tentativas de takedown de Patterson, e vence nos pontos com contragolpes e tecnicas nao-convencionais.' },
          { name: 'Nocaute do Showman', probability: 12, method: 'KO/TKO R1-R2', description: 'Page encontra o timing perfeito para uma joelhada voadora, spinning back kick ou contragolpe limpo que encerra a luta de forma espetacular.' },
          { name: 'TDD e Volume', probability: 8, method: 'Decisao Unanime', description: 'Page surpreende com defesa de takedown melhorada e vence com volume de strikes superior e pontos de distancia.' },
        ],
      },
      fighter2: {
        nome: 'Patterson',
        total_probability: 60,
        scenarios: [
          { name: 'Dominio por Controle', probability: 28, method: 'Decisao Unanime', description: 'Patterson usa a familiaridade dos treinos com Page para fechar distancia, completar takedowns e acumular tempo de controle. Page nunca foi submetido, mas tambem nunca conseguiu evitar o grappling de oponentes desse calibre (Garry, Storley). Patterson controla os rounds e vence nos cartoes.' },
          { name: 'Ground and Pound', probability: 18, method: 'TKO R2-R3', description: 'Patterson leva ao chao e acumula dano com ground and pound. Page nao tem ferramentas ofensivas do chao e o volume de Patterson eventualmente forca a interrupcao.' },
          { name: 'Submissao Oportunista', probability: 14, method: 'Submissao R2-R3', description: 'Apos rounds de controle, Patterson encontra uma abertura para guilhotina ou mata-leao quando Page tenta se levantar. Improvavel como cenario principal dado que Page nunca foi submetido, mas possivel se a fadiga acumular.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Sam Patterson',
      winner_side: 'fighter2',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Patterson tem tudo para fazer com Page o que Garry e Storley fizeram: usar o grappling para neutralizar o striking unortodoxo e acumular tempo de controle nos scorecards. A diferenca e que Patterson CONHECE o jogo de Page por dentro, tendo sido sparring partner dele em tres camps consecutivos (Holland, Garry, Magomedov). Patterson sabe como Page reage ao clinch, quais angulos ele usa pra escapar, e onde ficam as aberturas. Com 1.93m e BJJ black belt, Patterson tem as ferramentas fisicas e tecnicas pra implementar esse plano. Page nunca foi submetido na carreira, entao a finalizacao e improvavel, mas o controle de Patterson nos rounds vai ser suficiente pra dominar os cartoes. O padrao e claro: toda vez que Page enfrenta um grappler de elite (Storley, Garry), ele perde por decisao.',
      x_factor: {
        title: 'O Fator Sparring',
        description: 'Patterson treinou diretamente com Page em tres camps do UFC. Essa informacao privilegiada sobre habitos, reacoes e tendencias nao aparece em nenhuma estatistica. E uma vantagem rara em MMA que pode ser decisiva na hora de fechar a distancia e completar takedowns.',
      },
      upset_alert: {
        title: 'O Timing de Page',
        description: 'Page e imprevisivel por natureza. Uma joelhada voadora na entrada de takedown, um contragolpe no momento exato, ou um upkick do chao podem mudar tudo. Nao subestime o QI de luta de um veterano com 27 lutas profissionais e 3-1 no UFC contra oponentes de alto nivel.',
      },
      probabilities: {
        fighter1: { nome: 'Page', percent: 38 },
        fighter2: { nome: 'Patterson', percent: 60 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Primeira Tentativa de Takedown', icon: 'Target', description: 'Tudo comeca aqui. Se Patterson completar o primeiro takedown, a confianca dele dispara e Page vai passar a luta inteira preocupado com o chao. Se Page defender, a dinamica muda completamente.' },
        { num: 2, title: 'O Footwork de Page', icon: 'Activity', description: 'O footwork de karate ponto e a principal arma de Page para evitar takedowns. Se ele mantiver movimentacao lateral e entradas e saidas rapidas, pode frustrar Patterson. Se ficar parado, e presa facil.' },
        { num: 3, title: 'Submissoes nas Trocas de Nivel', icon: 'Zap', description: 'Patterson tem 7 submissoes na carreira com variedade tecnica. Quando Page abaixar a cabeca para defender um takedown, qualquer tipo de choke e um perigo real. Observe as maos de Patterson sempre que houver troca de nivel.' },
        { num: 4, title: 'O Nervosismo do Salto de Qualidade', icon: 'Brain', description: 'Patterson nunca enfrentou um nome como Page. O nervosismo do salto de qualidade pode afetar sua agressividade e timing. Observe se ele hesita nas entradas de takedown.' },
        { num: 5, title: 'Tecnicas Nao-Convencionais de MVP', icon: 'Eye', description: 'Page e famoso por golpes vindos de angulos imprevisíveis. Joelhadas voadoras, spinning back kicks e contragolpes do nada. Uma tecnica pode encerrar a luta a qualquer momento.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'DUELO BRITANICO', content: 'PAGE vs PATTERSON\nUFC Londres | Meio-Medio\n\nO Showman vs O Finalizador\n24-3 vs 14-2-1\nEstilos opostos, mesma arena.\nEx-parceiros de treino.', color: 'red' },
        { slide_number: 2, title: 'MVP: O SHOWMAN', content: '24-3 na carreira\n13 KOs | 10x campeao kickboxing\n#13 meio-medio do UFC\n3-1 no UFC (venceu Magomedov, Cannonier)\n38 anos, karate ponto\n5.20 strikes por minuto\nNunca foi submetido', color: 'red' },
        { slide_number: 3, title: 'PATTERSON: O FUTURO', content: '14-2-1 na carreira\n7 submissoes + 6 KOs\nBJJ Black Belt\n4 vitorias consecutivas no R1\n1,93m de altura | 29 anos\nFoi sparring do Page em 3 camps\nConhece o jogo do MVP por dentro', color: 'blue' },
        { slide_number: 4, title: 'O FATOR SPARRING', content: 'Patterson treinou COM Page\npara 3 lutas do UFC:\n\nvs Kevin Holland\nvs Ian Garry\nvs Shara Magomedov\n\nEle sabe como MVP reage\nao clinch, aos takedowns,\ne onde estao as aberturas.', color: 'gold' },
        { slide_number: 5, title: 'O PADRAO DE PAGE', content: 'Toda vez que MVP enfrenta\num grappler de elite:\n\nvs Storley: PERDEU decisao\nvs Garry: PERDEU decisao\nvs Patterson: ???\n\n42% de defesa de takedown\nO padrao e claro.', color: 'gold' },
        { slide_number: 6, title: 'APOSTAS DE VALOR', content: 'MELHOR APOSTA:\nPatterson por Decisao (+130)\nO padrao Garry/Storley se repete\n\nVALOR:\nPage ML (+140)\nNunca subestime MVP\n\nARMADILHA:\nPatterson por Submissao\nPage NUNCA foi submetido em 27 lutas', color: 'gold' },
        { slide_number: 7, title: 'PREVISAO', content: 'PATTERSON por Decisao Unanime\n\nConfianca: MEDIA\n60% Patterson / 38% Page\n\nO grappling decide.\nA familiaridade dos treinos\ne a vantagem invisivel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/8', text: 'Page vs Patterson e o duelo britanico mais intrigante do card. O showman do karate ponto contra o finalizador que JA TREINOU COM ELE. Thread completa:' },
        { num: '2/8', text: 'MVP (24-3): 13 KOs, 3-1 no UFC, venceu Magomedov e Cannonier. 5.20 strikes por minuto, angulos impossiveis. Mas 42% de defesa de takedown. E NUNCA venceu um grappler de elite no UFC.' },
        { num: '3/8', text: 'Patterson (14-2-1): BJJ black belt, 7 subs, 4 vitorias consecutivas no R1. 1,93m. Mas o detalhe que muda TUDO: ele foi sparring do Page em 3 camps (Holland, Garry, Magomedov). Sabe como MVP reage.' },
        { num: '4/8', text: 'O padrao de Page contra grapplers: vs Storley = PERDEU decisao. vs Garry = PERDEU decisao. O blueprint existe. Patterson tem as ferramentas e a informacao privilegiada pra replicar.' },
        { num: '5/8', text: 'Mas atencao: Page NUNCA foi submetido em 27 lutas profissionais. Nenhum grappler conseguiu finaliza-lo. O mais provavel e controle de chao levando a decisao, nao submissao.' },
        { num: '6/8', text: 'Apostas: Patterson por Decisao (+130) e a melhor aposta. Page ML (+140) tem valor se voce acredita no striking. ARMADILHA: Patterson por sub. Page nunca foi submetido.' },
        { num: '7/8', text: 'Fato curioso: Page disse que nao queria essa luta por causa da amizade com Patterson. Patterson disse "com amor e respeito, melhor homem vence". E agora um deles vai perder.' },
        { num: '8/8', text: 'Minha pick: Patterson por decisao unanime. O padrao Garry/Storley se repete. Mas MVP por nocaute espetacular NUNCA e impossivel. RT Page, Like Patterson!' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Michael Page tem 42% de defesa de takedown. Sam Patterson foi sparring dele em 3 camps e sabe EXATAMENTE como ele reage. Essa luta tem tudo pra ser especial.' },
        { time: '10-25s', title: 'Contexto', text: 'Duelo britanico no O2 Arena. MVP, 38 anos, lenda do kickboxing, 3-1 no UFC. Patterson, 29 anos, BJJ black belt, 4 finalizacoes seguidas no R1. Ex-parceiros de treino. A amizade acaba no octogono.' },
        { time: '25-40s', title: 'O Padrao', text: 'Toda vez que Page enfrenta um grappler de elite, ele perde por decisao. Storley no Bellator, Garry no UFC. Patterson tem o mesmo perfil e a vantagem extra de ter treinado com Page. Ele sabe onde ficam as aberturas.' },
        { time: '40-55s', title: 'Previsao', text: 'Patterson por decisao unanime. Mas Page nunca foi submetido em 27 lutas. A finalizacao e improvavel, mas o controle de chao vai ser suficiente. Patterson 29-28 em todos os cartoes.' },
        { time: '55-65s', title: 'B-Roll', text: 'Sugestoes visuais: split-screen dos treinos juntos (se disponivel), graficos de TDD vs TD average, timeline das derrotas de Page vs grapplers, replay do nocaute de Ashmouz em Patterson no UFC 286, highlights de Patterson submetendo Crosbie e Lainesse.' },
        { time: '65-75s', title: 'CTA', text: 'Quem leva o duelo britanico? O showman veterano ou o prospect que conhece todos os segredos dele? Comenta e segue pra analise completa do UFC Londres.' },
      ],
      tiktok: [
        { hook: 'Esse cara tem 42% de defesa de takedown e vai enfrentar um PREDADOR de chao.', body: 'Michael Page, MVP, lenda do kickboxing. Mas 42% de TDD. Sam Patterson venceu as ultimas QUATRO lutas no primeiro round. BJJ black belt. 7 submissoes na carreira. E o pior de tudo: Patterson foi SPARRING do Page em 3 camps. Ele sabe todos os segredos.', cta: 'Patterson por decisao ou MVP por KO espetacular? Comenta!' },
        { hook: 'Duelo britanico no O2 Arena e ninguem ta falando disso.', body: 'Page vs Patterson. O veterano showman de 38 anos contra o jovem finalizador de 29. Se vai ao chao, Patterson domina. Se fica em pe, Page frustra. Mas aqui vai o detalhe: Patterson TREINOU com Page. Conhece cada habito, cada reacao, cada abertura.', cta: 'Quem voce escolhe? Comenta!' },
        { hook: 'O padrao que NINGUEM ta falando sobre Michael Page.', body: 'Toda vez que MVP enfrenta um grappler de elite, ele PERDE. Storley no Bellator, decisao. Garry no UFC, decisao. Agora vem Patterson, BJJ black belt, que foi sparring dele em 3 camps. E Page tem 42% de defesa de takedown. O padrao se repete?', cta: 'O padrao se repete ou MVP quebra? Comenta!' },
      ],
      headlines: [
        'Page vs Patterson: O Sparring Partner Que Virou Rival',
        'O Showman Contra o Futuro: O Duelo Britanico Que Londres Merece',
        'Sam Patterson Conhece Todos os Segredos de MVP. Isso Basta?',
        'Michael Page aos 38: A Experiencia Pode Vencer a Juventude?',
        'UFC Londres: O Contraste de Estilos Que Promete Fogo no Meio-Medio',
        'O Padrao de Page Contra Grapplers: Storley, Garry, e Agora Patterson',
        '42% de TDD vs BJJ Black Belt: A Matematica Nao Favorece MVP',
      ],
      podcast: [
        {
          timestamp: '0:00-2:00',
          title: 'Abertura: A Luta Que Ninguem Queria',
          talking_points: [
            'Page disse publicamente que nao queria essa luta por causa da relacao pessoal com Patterson. Patterson aceitou e disse "com amor e respeito, melhor homem vence".',
            'A narrativa unica: Patterson foi sparring partner de Page para 3 camps no UFC (Holland, Garry, Magomedov). Ele conhece o jogo do MVP por dentro.',
            'O contraste de estilos: karate ponto unortodoxo vs BJJ black belt com 7 submissoes. E o contraste de eras: veterano de 38 anos vs prospect de 29 em ascensao.',
          ],
          discussion_questions: [
            'Ter sido sparring partner e uma vantagem real ou os dois se conhecem igualmente?',
            'Page disse que nao queria a luta. Isso afeta a mentalidade dele no octogono?',
          ],
        },
        {
          timestamp: '2:00-4:00',
          title: 'O Padrao de Page Contra Grapplers',
          talking_points: [
            'O blueprint existe: Storley (Bellator, decisao), Garry (UFC 303, decisao). Ambos usaram wrestling/grappling pra neutralizar o striking de Page e vencer nos cartoes.',
            'Page nunca foi submetido em 27 lutas. Mas tambem nunca VENCEU um grappler de elite. A defesa de sub funciona, mas nao impede a derrota por decisao.',
            'Patterson tem o perfil perfeito pra replicar: 1,93m, BJJ black belt, 3.23 TDs por 15 min contra os 42% de TDD de Page.',
          ],
          discussion_questions: [
            'Se o padrao e tao claro, por que Page nao investiu em wrestling nos ultimos anos?',
          ],
        },
        {
          timestamp: '4:00-6:00',
          title: 'O Caso Contra Patterson',
          talking_points: [
            'Patterson nunca enfrentou ninguem do calibre de Page. Todos os oponentes UFC eram sem ranking. Esse e o primeiro teste real.',
            'A derrota por KO R1 contra Ashmouz no UFC 286 (quando cortava pra 155lbs) mostra que Patterson pode ser nocauteado. Page tem poder nao-convencional.',
            'Page e imprevisivel por natureza. Joelhadas voadoras, spinning attacks, contragolpes do nada. O QI de luta de 27 lutas e um fator que nao aparece em nenhuma estatistica.',
          ],
          discussion_questions: [
            'O salto de qualidade de oponentes pode fazer Patterson hesitar ou respeitar demais o striking de Page?',
          ],
        },
        {
          timestamp: '6:00-8:00',
          title: 'Previsao e Apostas',
          talking_points: [
            'Previsao: Patterson por decisao unanime (60/38/2). O padrao Garry/Storley se repete. Patterson controla com grappling e acumula tempo nos cartoes.',
            'Melhor aposta: Patterson por decisao a +130. Page nunca foi submetido, entao o controle de chao leva a decisao, nao finalizacao.',
            'Armadilha: Patterson por sub. Page NUNCA foi submetido em 27 lutas. Apostar em sub especificamente e ir contra toda a evidencia.',
          ],
          discussion_questions: [
            'Se voces tivessem que apostar: Page por KO espetacular ou Patterson por decisao de controle?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+140',
        fighter2_odds: '-160',
        fighter1_name: 'Michael Page',
        fighter2_name: 'Sam Patterson',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Defesa de Takedown Fragil', stat_headline: 'PAGE TEM APENAS 42% DE DEFESA DE TAKEDOWN NO UFC', contexto: 'A vulnerabilidade mais explorada de Page. Garry neutralizou seu estilo explorando isso. Patterson vive de takedowns.', implicacao_aposta: 'Edge fortissimo para Patterson. A matematica e clara: 42% TDD vs 3.23 TDs por 15 min.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Streak de Vitorias no R1', stat_headline: '4 VITORIAS CONSECUTIVAS NO PRIMEIRO ROUND (2 SUBS + 2 KOs)', contexto: 'Patterson nao perde tempo. Fecha, leva ao chao ou conecta strikes pesados. Resolve rapido.', implicacao_aposta: 'Forte edge para Under e para Patterson por finalizacao.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Experiencia e Imprevisibilidade de Page', stat_headline: '27 LUTAS PROFISSIONAIS, 3-1 NO UFC, 10 TITULOS MUNDIAIS DE KICKBOXING', contexto: 'Page ja viu de tudo. Tres vitorias em quatro lutas no UFC. Tecnicas nao-convencionais podem surpreender ate os mais preparados.', implicacao_aposta: 'Nao descarte Page por KO. O preco como azarao pode ter valor.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Clock', titulo: 'Idade: 38 vs 29', stat_headline: 'PAGE E 9 ANOS MAIS VELHO QUE PATTERSON', contexto: 'A diferenca de idade e significativa. Page esta no crepusculo, Patterson no prime atletico.', implicacao_aposta: 'Favorece Patterson em lutas de alta intensidade e scrambles.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Patterson por Decisao', odds: '+130', confianca: 'media', raciocinio: 'Page nunca foi submetido em 27 lutas. O padrao contra grapplers (Garry, Storley) e perder por decisao com controle de chao. Patterson tem as ferramentas e a familiaridade dos treinos.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-130', confianca: 'media', raciocinio: 'Patterson finaliza no R1 consistentemente. Se conseguir o takedown, a luta pode acabar rapido.' },
        { tipo: 'Moneyline', pick: 'Page (+140)', odds: '+140', confianca: 'baixa', edge_vs_mercado: 'Page como azarao a +140 tem valor se voce acredita que ele pode manter em pe.', raciocinio: 'Page e imprevisivel e tem QI de luta alto. Se manter distancia, pode frustrar Patterson.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Patterson por Submissao',
        descricao: 'Page nunca foi submetido em 27 lutas profissionais. Mesmo com 50% das vitorias de Patterson por sub, apostar especificamente em finalizacao contra alguem que nunca foi finalizado e arriscado. O mais provavel e controle de chao levando a decisao, como aconteceu com Garry e Storley.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Page vs Patterson: The Showman vs The Finisher',
  subtitulo: 'The point karate veteran takes on the young Brit who finishes everyone',
  evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Welterweight (170 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, predictedMethod: 'Submission R1-R2', confidence: 'MEDIUM' },
  fighter1_info: { ...analisePT.fighter1_info, ultimasLutas: [{ result: 'W', opponent: 'Jared Cannonier', method: 'Unanimous Decision', event: 'UFC 319' }, { result: 'W', opponent: 'Sharabutdin Magomedov', method: 'Unanimous Decision', event: 'UFC Fight Night 250' }, { result: 'L', opponent: 'Ian Garry', method: 'Unanimous Decision', event: 'UFC 303' }] },
  fighter2_info: { ...analisePT.fighter2_info, ultimasLutas: [{ result: 'W', opponent: 'Trey Waters', method: 'TKO R1', event: 'UFC Paris' }, { result: 'W', opponent: 'Danny Barlow', method: 'KO R1', event: 'UFC Vegas 103' }, { result: 'W', opponent: 'Kiefer Crosbie', method: 'Sub R1', event: 'UFC 304' }] },
  full_analysis: {
    hero: { ...analisePT.full_analysis.hero, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Welterweight (170 lbs)', tagline: 'The Showman vs The Finisher', tagline_sub: 'An all-British clash between the point karate veteran and the young man who finishes everyone in his path', fighter1: { ...analisePT.full_analysis.hero.fighter1, ranking: '#13 Welterweight', info_extra: 'London, England | 38 years old' }, fighter2: { ...analisePT.full_analysis.hero.fighter2, ranking: 'N/R Welterweight', info_extra: 'Watford, England | 29 years old' } },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">The All-British Clash London Deserves</h3>
        <p class="mb-4">This is the kind of fight London crowds love: two Brits, completely opposite styles, and the promise of fireworks. <strong class="text-ufc-red">Michael "Venom" Page</strong> is a living legend of British MMA. Ten-time world kickboxing champion, Bellator star for nearly a decade, and owner of the most polarizing style in the sport: hands down, unpredictable movement, strikes from impossible angles.</p>
        <p class="mb-4">At 38 years old, MVP is in the twilight of his career but still relevant. Three wins in four UFC fights, including victories over Kevin Holland on debut, Sharabutdin Magomedov, and Jared Cannonier, show he can still compete with high-level names when he implements his gameplan. But the loss to Ian Garry exposed the vulnerability that was always there: when opponents close the distance and neutralize his movement, Page suffers.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Future Has Arrived</h3>
        <p class="mb-4"><strong class="text-blue-400">Sam Patterson</strong> didn't earn the nickname "The Future" for nothing. At 29 years old, 6'3" tall with nearly 78 inches of reach, he's a nightmare for any welterweight opponent. Four consecutive first-round finishes, mixing submissions and knockouts, prove Patterson isn't there to make friends. Seven career submissions (including arm-triangle chokes and rear-naked chokes) make him one of the most dangerous finishers in the division.</p>
        <p class="mb-4">The dynamic is fascinating: Page wants to keep distance and use his unorthodox striking. Patterson wants to close the gap, take it to the ground, and submit. If Patterson gets the takedown, Page is in serious danger. If Page keeps it standing, experience and unconventional techniques could frustrate the youngster. The O2 Arena will be split, and that's the beauty of an all-British showdown.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#13 Welterweight', fighter2: 'Unranked' },
        { dimensao: 'Streak', fighter1: '2-fight win streak', fighter2: '4-fight win streak' },
        { dimensao: 'Narrative', fighter1: 'Stay relevant at 38', fighter2: 'Beat the legend and enter the rankings' },
        { dimensao: 'Risk', fighter1: 'Second UFC loss in 5 fights', fighter2: 'Lose the chance to level up' },
      ],
      prognostico: {
        fighter1_vence: { titulo: 'VENOM STILL STRIKES', subtitulo: 'Page frustrates Patterson with movement and timing on the feet', consequencias: [{ tag: 'RANKING', texto: 'Page stays in the top 15 and adds another home win against a relevant name' }, { tag: 'LEGACY', texto: 'At 38, MVP proves he can still compete with the division\'s young guns' }], proxima_luta: 'Page vs ranked top 10 opponent on a European card' },
        fighter2_vence: { titulo: 'THE FUTURE IS NOW', subtitulo: 'Patterson submits the legend and announces his arrival in the rankings', consequencias: [{ tag: 'RANKING', texto: 'Patterson enters the welterweight top 15 with a win over a ranked fighter' }, { tag: 'NEXT', texto: 'Fight against an established top 10-15 name at the next opportunity' }], proxima_luta: 'Patterson vs ranked top 10-15 opponent' },
      },
    },
    momento_atual: {
      fighter1: { ...analisePT.full_analysis.momento_atual.fighter1, recent_fights: [{ date: 'Aug 2025', opponent: 'Jared Cannonier', result: 'W', method: 'Unanimous Decision', opponent_rank: 'Ex-MW title challenger', quality_score: 3, quality_label: 'Good', note: 'Solid decision win over a dangerous veteran. MVP used movement and counters.' }, { date: 'Feb 2025', opponent: 'Sharabutdin Magomedov', result: 'W', method: 'Unanimous Decision', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Good', note: 'Impressive upset. Page dominated the undefeated Magomedov by unanimous decision in Riyadh.' }, { date: 'Jun 2024', opponent: 'Ian Garry', result: 'L', method: 'Unanimous Decision', opponent_rank: '#10 WW', quality_score: 4, quality_label: 'Very Good', note: 'Competitive loss to a top prospect. Garry controlled distance and neutralized Page\'s style.' }, { date: 'Mar 2024', opponent: 'Kevin Holland', result: 'W', method: 'Unanimous Decision', opponent_rank: '#14 WW', quality_score: 3, quality_label: 'Good', note: 'Impressive UFC debut. Page frustrated Holland with movement and counters for 3 rounds.' }], full_fight_history: [{ date: 'Mar 2024', opponent: 'Kevin Holland', result: 'W', method: 'UD', opponent_rank: '#14 WW', quality_score: 3, quality_label: 'Good', note: 'UFC debut, unanimous decision' }, { date: 'Jun 2024', opponent: 'Ian Garry', result: 'L', method: 'UD', opponent_rank: '#10 WW', quality_score: 4, quality_label: 'Very Good', note: 'Decision loss' }, { date: 'Feb 2025', opponent: 'Sharabutdin Magomedov', result: 'W', method: 'UD', opponent_rank: '#14 MW', quality_score: 3, quality_label: 'Good', note: 'Upset over undefeated Magomedov in Riyadh' }, { date: 'Aug 2025', opponent: 'Jared Cannonier', result: 'W', method: 'UD', opponent_rank: 'Ex-MW title challenger', quality_score: 3, quality_label: 'Good', note: 'Third UFC win' }], momentum_label: 'On Fire', momentum_note: 'Page is in good form in the UFC. Won his debut against Holland, lost to Garry, then strung together two straight wins over Magomedov and Cannonier. Three wins in four UFC fights show MVP is competitive at the highest level. At 38, the window is closing, but the momentum is positive.' },
      fighter2: { ...analisePT.full_analysis.momento_atual.fighter2, recent_fights: [{ date: 'Sep 2025', opponent: 'Trey Waters', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round TKO with precise rights. Fourth consecutive R1 finish.' }, { date: 'Mar 2025', opponent: 'Danny Barlow', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round knockout. Took Barlow\'s undefeated record with brutal power.' }, { date: 'Jul 2024', opponent: 'Kiefer Crosbie', result: 'W', method: 'Submission R1 (arm-triangle)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Arm-triangle choke submission in the first round at UFC 304 in Manchester.' }, { date: 'Jan 2024', opponent: 'Yohan Lainesse', result: 'W', method: 'Submission R1 (RNC)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Rear-naked choke submission in the first round at UFC 297.' }], full_fight_history: [{ date: 'Mar 2023', opponent: 'Yanal Ashmouz', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut loss at lightweight' }, { date: 'Jan 2024', opponent: 'Yohan Lainesse', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'RNC in R1, first UFC win' }, { date: 'Jul 2024', opponent: 'Kiefer Crosbie', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Arm-triangle in R1' }, { date: 'Mar 2025', opponent: 'Danny Barlow', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'KO in R1' }, { date: 'Sep 2025', opponent: 'Trey Waters', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'TKO in R1, fourth straight win' }], momentum_label: 'On Fire', momentum_note: 'Patterson is on an incredible streak: four consecutive wins, all in the first round (two submissions and two knockouts). The move from lightweight to welterweight was perfect. At 6\'3" with nearly 78 inches of reach, he finally found his ideal weight class. This fight against Page is the step up in competition he needs.' },
    },
    nivel_competicao: { fighter1: { nome: 'Page', media_oponentes: 3, media_oponentes_label: 'Good', aproveitamento: '3W-1L (75%)', contra_top5: '0W-0L' }, fighter2: { nome: 'Patterson', media_oponentes: 1, media_oponentes_label: 'Poor', aproveitamento: '4W-1L (80%)', contra_top5: '0W-0L' }, oponentes_em_comum_count: { fighter1: 0, fighter2: 0 }, oponentes_em_comum_note: 'No common opponents. Page has faced far superior competition (Holland, Garry, Magomedov, Cannonier) while Patterson has won against unranked opponents. This fight will show if Patterson is ready for the next level.' },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 3.15, valueB: 5.80, maxVal: 7, format: 'decimal' },
        { label: 'Striking Accuracy (%)', valueA: 44, valueB: 52, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 3.28, valueB: 3.10, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 55, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedowns Per 15 Min', valueA: 0.41, valueB: 3.23, maxVal: 5, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 33, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 42, valueB: 75, maxVal: 100, format: 'percent' },
        { label: 'Submissions Per 15 Min', valueA: 0.0, valueB: 2.5, maxVal: 4, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '38 years old', fighter2: '29 years old', note: 'Page 9 years older' },
        { label: 'Height', fighter1: '6\'3" (1.91m)', fighter2: '6\'3" (1.91m)', note: 'Same height' },
        { label: 'Reach', fighter1: '77" (196cm)', fighter2: '78" (198cm)', note: 'Patterson with slight advantage' },
        { label: 'Stance', fighter1: 'Southpaw/Switch', fighter2: 'Orthodox', note: 'Page constantly switches stances' },
        { label: 'Gym', fighter1: 'London Shootfighters', fighter2: 'Team Crossface, Watford', note: null },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Stand-up Striking', valueA: 78, valueB: 60, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Page is a 10x world kickboxing champion. Unique movement and timing, even at 38.' },
        { label: 'Wrestling/Takedowns', valueA: 30, valueB: 82, labelA: 'Poor', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Patterson averages 3.23 takedowns per 15 min. Page has just 42% takedown defense.' },
        { label: 'Jiu-Jitsu/Submissions', valueA: 30, valueB: 88, labelA: 'Poor', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Patterson has 7 career submissions. Page has just 3 submissions in 24 wins.' },
        { label: 'Movement & Footwork', valueA: 90, valueB: 55, labelA: 'Excellent', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Page\'s footwork is unique in MMA. Point karate base with quick entries and exits.' },
        { label: 'Takedown Defense', valueA: 42, valueB: 75, labelA: 'Average', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Page has just 42% TDD. Against an active wrestler like Patterson, that\'s concerning.' },
        { label: 'High-Level Experience', valueA: 78, valueB: 40, labelA: 'Very Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Page has faced Holland, Garry, Magomedov, and Cannonier in the UFC. Patterson has only fought unranked opponents.' },
      ],
      insight: 'The styles are diametrically opposed. Page dominates on the feet with movement and creative striking, but Patterson dominates on the ground with wrestling and submissions. The fight will be defined by where it takes place: standing or on the mat.',
    },
    distribuicao_vitorias: { ...analisePT.full_analysis.distribuicao_vitorias, insight: 'Total contrast. Page is primarily a striker: 54% KO, 13% submission, 33% decision. Patterson is a ground finisher: 50% submission, 43% KO. Patterson almost never goes to decision (just 7%). If the fight goes to the ground, it\'s the young man\'s territory. If it stays standing, it\'s Page\'s territory.' },
    danger_zones: { zones: [
      { rounds: 'R1', danger_level: 7, danger_label: 'PATTERSON ADVANTAGE', color: 'green', title: 'The Guillotine Lurks', description: 'Patterson won his last four fights in the first round, by submission or knockout. He comes in aggressive looking for the takedown or finish from the opening seconds. If Page doesn\'t defend the first takedown, he could be submitted quickly. Patterson has diverse submissions (arm-triangle, RNC) and the reach to apply them.' },
      { rounds: 'R2', danger_level: 5, danger_label: 'EVEN', color: 'gold', title: 'The Adjustment Round', description: 'If Page survives R1, the second round could be more balanced. Page has more experience in longer fights and could find the timing for his counters. Patterson rarely reaches R2 and could be in unfamiliar territory.' },
      { rounds: 'R3', danger_level: 6, danger_label: 'PAGE ADVANTAGE', color: 'red', title: 'Experience Counts', description: 'If the fight reaches the third round, Page\'s experience in 3-round fights (11 career decisions) could be decisive. Patterson has just 1 decision win in 14 fights. Going the distance favors the veteran.' },
    ] },
    intangiveis: { items: [
      { icon: 'Clock', title: 'Age & Mileage', fighter: 'Page', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Page is 38 with over 20 years of competition between kickboxing and MMA. The accumulated mileage could affect recovery and reflexes, especially against a 29-year-old.' },
      { icon: 'Target', title: 'Known Vulnerability', fighter: 'Page', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Page\'s takedown defense (42%) is his biggest vulnerability. Garry exploited this in Page\'s only UFC loss. Patterson, who lives off takedowns and submissions, will attack exactly this weakness.' },
      { icon: 'MapPin', title: 'Both Brits at Home', fighter: 'Both', risk_level: 'NEUTRAL', risk_color: 'neutral', description: 'Both are British fighting in London. Page from London, Patterson from Watford. The crowd could split, though Page likely has more fans by name recognition.' },
      { icon: 'Zap', title: 'R1 Finishes', fighter: 'Patterson', risk_level: 'POSITIVE', risk_color: 'green', description: 'Four consecutive first-round wins (two submissions and two KOs). Patterson is a first-round predator who doesn\'t waste energy. If he gets the takedown, he closes the deal fast.' },
      { icon: 'Brain', title: 'Veteran Fight IQ', fighter: 'Page', risk_level: 'POSITIVE', risk_color: 'green', description: 'Page has seen it all in nearly 30 fights. He knows how to frustrate opponents, maintain distance, and use timing to his advantage. Experience could be the difference if the fight stays standing.' },
    ] },
    caminhos_vitoria: {
      fighter1: { nome: 'Page', total_probability: 38, scenarios: [
        { name: 'Long-Range Striking', probability: 18, method: 'Unanimous Decision', description: 'Page maintains distance with footwork and jab, frustrates Patterson\'s takedown attempts, and wins on points with counters and unconventional techniques.' },
        { name: 'Showman Knockout', probability: 12, method: 'KO/TKO R1-R2', description: 'Page finds the perfect timing for a flying knee, spinning back kick, or clean counter that ends the fight spectacularly.' },
        { name: 'TDD & Volume', probability: 8, method: 'Unanimous Decision', description: 'Page surprises with improved takedown defense and wins with superior strike volume and distance scoring.' },
      ] },
      fighter2: { nome: 'Patterson', total_probability: 60, scenarios: [
        { name: 'Lightning Submission', probability: 28, method: 'Submission R1', description: 'Patterson closes the distance, completes the takedown, and finds the submission quickly. Guillotine on the level change or RNC after taking the back.' },
        { name: 'Ground and Pound', probability: 18, method: 'TKO R1-R2', description: 'Patterson takes it down and dominates with ground and pound. Page has no tools to get up or defend from the bottom, and the referee stops the fight.' },
        { name: 'Control Dominance', probability: 14, method: 'Unanimous Decision', description: 'Patterson can\'t get the finish but controls Page on the ground long enough to win every round on the scorecards.' },
      ] },
    },
    previsao_final: {
      ...analisePT.full_analysis.previsao_final, predicted_method: 'Submission R1-R2', confidence_label: 'MEDIUM',
      explanation: 'This fight comes down to one question: can Page keep it standing? With just 42% takedown defense and Patterson completing 3.23 takedowns per 15 minutes, the math doesn\'t favor MVP. Patterson has the tools to close the distance (similar reach), take it down, and submit. Page\'s takedown defense was exploited by Garry in his UFC 303 loss, and Patterson is a more dangerous ground grappler. However, Page\'s experience (3-1 in the UFC) and his creative striking are factors that can\'t be ignored. If Page maintains distance for 15 minutes, he could frustrate Patterson.',
      x_factor: { title: 'Patterson\'s Step Up in Competition', description: 'Patterson has never faced anyone of Page\'s caliber. All his UFC opponents were unranked with limited experience. Page is the first real test. If Patterson gets nervous or shows too much respect for Page\'s striking, he might not be able to close the distance.' },
      upset_alert: { title: 'Page\'s Timing', description: 'Page is unpredictable by nature. A flying knee on a takedown entry, a counter at the exact right moment, or an upkick from the bottom could change everything. Don\'t underestimate the fight IQ of a 38-year-old veteran.' },
    },
    o_que_observar: { points: [
      { num: 1, title: 'The First Takedown Attempt', icon: 'Target', description: 'Everything starts here. If Patterson completes the first takedown, his confidence skyrockets and Page will spend the entire fight worried about the ground. If Page defends, the dynamic shifts completely.' },
      { num: 2, title: 'Page\'s Footwork', icon: 'Activity', description: 'Point karate footwork is Page\'s primary weapon for avoiding takedowns. If he maintains lateral movement with quick entries and exits, he can frustrate Patterson. If he stands still, he\'s easy prey.' },
      { num: 3, title: 'Submissions on Level Changes', icon: 'Zap', description: 'Patterson has 7 career submissions with technical variety. When Page ducks his head to defend a takedown, any type of choke is a real danger. Watch Patterson\'s hands whenever there\'s a level change.' },
      { num: 4, title: 'Step-Up Nerves', icon: 'Brain', description: 'Patterson has never faced a name like Page. The nerves of stepping up in competition could affect his aggression and timing. Watch if he hesitates on takedown entries.' },
      { num: 5, title: 'MVP\'s Unconventional Techniques', icon: 'Eye', description: 'Page is famous for strikes from unpredictable angles. Flying knees, spinning back kicks, and counters out of nowhere. One technique could end the fight at any moment.' },
    ] },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'ALL-BRITISH CLASH', content: 'PAGE vs PATTERSON\nUFC London | Welterweight\n\nThe Showman vs The Finisher\n24-3 vs 14-2-1\nOpposite styles, same arena.', color: 'red' },
        { slide_number: 2, title: 'MVP: THE SHOWMAN', content: '24-3 career record\n13 KOs | 10x kickboxing world champ\n#13 UFC welterweight\n38 years old, point karate\nHands down, impossible angles', color: 'red' },
        { slide_number: 3, title: 'PATTERSON: THE FUTURE', content: '14-2-1 career record\n7 career submissions\n4 straight R1 finishes\n29 years old, 6\'3", Watford\nThe prospect who finishes everyone', color: 'blue' },
        { slide_number: 4, title: 'THE KEY', content: 'Page: 42% takedown defense\nPatterson: 3.23 TDs per 15 min\n\nIf it goes to the ground = Patterson\nIf it stays standing = Page\n\nWhere will it happen?', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'PATTERSON by Submission R1-R2\n\nConfidence: MEDIUM\n60% Patterson / 38% Page\n\nBut MVP is unpredictable.\nAlways.', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Page vs Patterson is the perfect all-British clash. The point karate showman against the Watford finisher. Completely opposite styles. Thread:' },
        { num: '2/5', text: 'MVP (24-3): 13 KOs, 3-1 in the UFC, 10 world kickboxing titles, hands down, impossible angles. But 42% takedown defense. FORTY-TWO.' },
        { num: '3/5', text: 'Patterson (14-2-1): 7 career submissions, FOUR consecutive R1 finishes. The guy closes and finishes. And now he faces someone with 42% TDD.' },
        { num: '4/5', text: 'If Patterson closes the distance, it\'s game over for Page. If Page keeps it standing, experience and creative striking could frustrate the youngster. A fight of contrasts.' },
        { num: '5/5', text: 'Prediction: Patterson by submission in the first two rounds. The math doesn\'t lie: 42% TDD vs 3.23 TDs per 15 min. But MVP is MVP. 3-1 in the UFC. Always unpredictable.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Michael Page has 42% takedown defense. Sam Patterson has 4 consecutive first-round finishes. Do the math.' },
        { time: '10-25s', title: 'Context', text: 'All-British clash at the O2 Arena. MVP, 38, kickboxing legend, #13 in the rankings. Patterson, 29, 7 submissions, the most dangerous prospect from Watford.' },
        { time: '25-40s', title: 'Analysis', text: 'Simple gameplan fight: if it goes to the ground, Patterson dominates. If it stays standing, Page frustrates. Page\'s takedown defense is the critical point.' },
        { time: '40-55s', title: 'Prediction', text: 'Patterson by submission in the first two rounds. But if you like risky bets, MVP by spectacular knockout pays well and isn\'t impossible.' },
      ],
      tiktok: [
        { hook: 'This guy has 42% takedown defense and is about to face a GROUND PREDATOR.', body: 'Michael Page, MVP, kickboxing legend. But 42% TDD. Sam Patterson won his last FOUR fights in the first round. Seven career submissions. And now he faces a guy who can\'t defend takedowns. Do the math.', cta: 'Patterson by sub or MVP by spectacular KO? Comment!' },
        { hook: 'All-British clash at the O2 Arena and nobody is talking about it.', body: 'Page vs Patterson. The 38-year-old veteran showman against the 29-year-old finisher. If it goes to the ground, Patterson dominates. If it stays standing, Page frustrates. Completely opposite styles. Same arena. It\'s going to be epic.', cta: 'Who are you picking? Comment!' },
      ],
      headlines: ['Page vs Patterson: 42% TDD Meets the First-Round Predator', 'The Showman vs The Future: The All-British Clash London Deserves', 'Can Sam Patterson Be MVP\'s Worst Nightmare on the Ground?', 'Michael Page at 38: Can Experience Overcome Youth?', 'UFC London: The Style Clash That Promises Fireworks at Welterweight'],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...analisePT.full_analysis.radar_apostador!.odds, source: 'Average across sportsbooks (March 2026)' },
      edges: [
        { icon: 'Target', titulo: 'Fragile Takedown Defense', stat_headline: 'PAGE HAS JUST 42% TAKEDOWN DEFENSE IN THE UFC', contexto: 'Page\'s most exploited vulnerability. Garry neutralized his style by exploiting this. Patterson lives off takedowns.', implicacao_aposta: 'Very strong edge for Patterson. The math is clear: 42% TDD vs 3.23 TDs per 15 min.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'R1 Win Streak', stat_headline: '4 CONSECUTIVE FIRST-ROUND WINS (2 SUBS + 2 KOs)', contexto: 'Patterson doesn\'t waste time. Closes, takes down or lands heavy strikes. Finishes fast.', implicacao_aposta: 'Strong edge for Under and Patterson by finish.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'Page\'s Experience & Unpredictability', stat_headline: '27 PRO FIGHTS, 3-1 IN THE UFC, 10 WORLD KICKBOXING TITLES', contexto: 'Page has seen everything. Three wins in four UFC fights. Unconventional techniques can surprise even the most prepared.', implicacao_aposta: 'Don\'t rule out Page by KO. The price as underdog could have value.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Clock', titulo: 'Age: 38 vs 29', stat_headline: 'PAGE IS 9 YEARS OLDER THAN PATTERSON', contexto: 'The age gap is significant. Page is in the twilight, Patterson in his athletic prime.', implicacao_aposta: 'Favors Patterson in high-intensity fights and scrambles.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Method', pick: 'Patterson by Submission', odds: '+110', confianca: 'alta', raciocinio: '50% of Patterson\'s wins are by submission. Page has 42% TDD and 0 submissions defensively. Most likely scenario if the fight goes to the ground.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-130', confianca: 'media', raciocinio: 'Patterson consistently finishes in R1. If he gets the takedown, the fight could end quickly.' },
        { tipo: 'Moneyline', pick: 'Page (+140)', odds: '+140', confianca: 'baixa', edge_vs_mercado: 'Page as underdog at +140 has value if you believe he can keep it standing.', raciocinio: 'Page is unpredictable and has high fight IQ. If he maintains distance, he could frustrate Patterson.' },
      ],
      armadilha: { titulo: 'Trap: Patterson by Decision', descricao: 'Patterson has just 1 decision win in 14 fights (7%). Betting on his decision is going against his entire track record. Either he finishes or he doesn\'t. There\'s no middle ground with Patterson.' },
      disclaimer: 'Statistical analysis for informational purposes. Gamble responsibly.',
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt');
  const analise = lang === 'en' ? analiseEN : analisePT;
  return <FullAnalysisView analise={analise} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
