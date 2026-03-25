'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';


const analisePT: FullSingleAnalise = {
  id: 'riley-vs-aswell-jr',
  evento_id: null,
  slug: 'riley-vs-aswell-jr',
  titulo: 'Riley vs Aswell Jr: Invicto Britanico Recebe o Texano Resiliente',
  subtitulo: 'O prospect mais explosivo do peso-pena britanico busca sua segunda vitoria no UFC contra o jovem americano',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,75m', envergadura: '175cm', idade: 26, academia: 'NEXT Generation MMA' },
      fighter2: { altura: '1,73m', envergadura: '175cm', idade: 25, academia: '4oz Fight Club' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'KO/TKO R1-R2',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Luke Riley',
    record: '12-0-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Bogdan Grad', method: 'KO R2', event: 'UFC Fight Night' },
    ],
  },
  fighter2_info: {
    nome: 'Michael Aswell Jr.',
    record: '11-3-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Lucas Almeida', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Bolaji Oki', method: 'Decisao Unanime', event: 'UFC Fight Night' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Pena (145 lbs)',
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
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Prospect Britanico Contra a Resiliencia Texana',
      tagline_sub: 'Striker invicto com 9 nocautes em 12 lutas recebe americano que vem de finalizacao no R1',
      fighter1: {
        nome_completo: 'Luke Riley',
        apelido: '',
        sobrenome: 'Riley',
        record: '12-0-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Whiston, Inglaterra | 26 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Michael "The Texas Kid" Aswell Jr.',
        apelido: 'The Texas Kid',
        sobrenome: 'Aswell Jr.',
        record: '11-3-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Houston, Texas, EUA | 25 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Futuro do Peso-Pena Britanico</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Luke Riley</strong> e o tipo de prospect que faz os olheiros do UFC salivar. Invicto em 12 lutas, com 9 nocautes na carreira e um debut no UFC que deixou a comunidade de MMA em alerta: nocauteou Bogdan Grad aos 30 segundos do segundo round, mostrando a potencia e o timing que fizeram dele campeao no Cage Warriors.
        </p>
        <p class="mb-4">
          Com apenas 26 anos, Riley e um produto do Muay Thai britanico. Treina na NEXT Generation MMA, com base solida em trocacao e agressividade calculada. Lutando em casa no O2 Arena, ele vai ter o apoio ensurdecedor da torcida britaniica numa noite que pode marca-lo como o proximo grande nome do peso-pena do UFC.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Garoto do Texas Nao Veio Passear</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Michael Aswell Jr.</strong> aprendeu rapido que o UFC nao perdoa. Sua estreia foi uma derrota por decisao para Bolaji Oki, mas a resposta veio em grande estilo: nocauteou Lucas Almeida no primeiro round no Rio de Janeiro. Com 11-3 na carreira, o texano de 25 anos tem poder nas maos (6 KOs) e ja mostrou que sabe se recuperar de adversidades.
        </p>
        <p class="mb-4">
          Essa e uma luta de prospects buscando espaco no peso-pena. Riley tem a vantagem da casa, a invencibilidade e o hype. Aswell tem a experiencia de quem ja superou derrota e a mentalidade de quem sabe que precisa impressionar. Uma luta que promete ser curta, violenta e definidora de trajetorias.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: '12 vitorias consecutivas (invicto)', fighter2: '1 vitoria consecutiva' },
        { dimensao: 'Objetivo', fighter1: 'Confirmar o hype e subir no ranking', fighter2: 'Sequencia de vitorias e construir momentum' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota da carreira', fighter2: 'Segunda derrota no UFC em 3 lutas' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O HYPE E REAL',
          subtitulo: 'Riley nocauteia Aswell em casa e se torna o prospect numero um do peso-pena britanico',
          consequencias: [
            { tag: 'RANKING', texto: 'Riley entra no radar dos ranqueados com 2-0 no UFC e 13-0 na carreira' },
            { tag: 'PROXIMA', texto: 'Luta contra oponente ranqueado no proximo card britanico ou main card nos EUA' },
          ],
          proxima_luta: 'Riley vs oponente ranqueado do top 15',
        },
        fighter2_vence: {
          titulo: 'TEXAS INVADE LONDRES',
          subtitulo: 'Aswell Jr. estraga a festa do publico britanico com uma performance dominante',
          consequencias: [
            { tag: 'CREDIBILIDADE', texto: 'Aswell se estabelece como prospect serio do peso-pena com vitoria sobre invicto' },
            { tag: 'PROXIMA', texto: 'Luta em card americano contra oponente de nivel similar' },
          ],
          proxima_luta: 'Aswell Jr. vs prospect do peso-pena no proximo card',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Luke Riley',
        color: 'red',
        recent_fights: [
          { date: 'Nov 2025', opponent: 'Bogdan Grad', result: 'W', method: 'KO R2 (0:30)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut no UFC com nocaute devastador aos 30 segundos do segundo round. Performance impressionante.' },
        ],
        full_fight_history: [
          { date: 'Nov 2025', opponent: 'Bogdan Grad', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC, nocaute no R2' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Riley entrou no UFC com tudo. O nocaute sobre Bogdan Grad no debut foi o tipo de performance que coloca um prospect no mapa imediatamente. Com 12-0, invicto e lutando em casa em Londres, ele esta no momento perfeito para construir sua historia no UFC.',
      },
      fighter2: {
        nome: 'Michael Aswell Jr.',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Lucas Almeida', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no primeiro round no Rio de Janeiro. Resposta perfeita apos a derrota para Oki.' },
          { date: 'Mai 2025', opponent: 'Bolaji Oki', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Derrota no debut UFC. Perdeu por decisao unanime em luta competitiva.' },
        ],
        full_fight_history: [
          { date: 'Mai 2025', opponent: 'Bolaji Oki', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Derrota no debut UFC' },
          { date: 'Out 2025', opponent: 'Lucas Almeida', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no R1 no Rio' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Aswell Jr. mostrou maturidade ao se recuperar da derrota no debut. O nocaute sobre Lucas Almeida no Rio de Janeiro provou que ele pertence ao UFC. Mas viajar para Londres e enfrentar um britanico invicto diante da torcida hostil e um desafio completamente diferente.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Riley',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Aswell Jr.',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '1W-1L (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Ambos estao no inicio de suas carreiras no UFC com apenas 1-2 lutas na organizacao.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.14, valueB: 4.22, maxVal: 7, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 60, valueB: 47, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.57, valueB: 3.85, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 60, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.00, valueB: 0.00, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 0, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 100, valueB: 50, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '26 anos', fighter2: '25 anos', note: 'Praticamente a mesma geracao' },
        { label: 'Altura', fighter1: '1,75m (5\'9")', fighter2: '1,73m (5\'8")', note: 'Riley levemente mais alto' },
        { label: 'Envergadura', fighter1: '175cm (69")', fighter2: '175cm (69")', note: 'Mesma envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'NEXT Generation MMA, Inglaterra', fighter2: '4oz Fight Club, Houston', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking em Pe', valueA: 82, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Riley tem base forte em Muay Thai com 9 nocautes em 12 lutas. Volume e precisao superiores.' },
        { label: 'Poder de Nocaute', valueA: 85, valueB: 72, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Ambos tem poder, mas Riley nocauteia com mais frequencia e velocidade. 75% de KO rate.' },
        { label: 'Wrestling/Grappling', valueA: 45, valueB: 48, labelA: 'Medio', labelB: 'Medio', advantage: 'even', advantage_note: 'Nenhum dos dois e conhecido pelo wrestling. Luta tende a ficar em pe.' },
        { label: 'Defesa de Strikes', valueA: 70, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Riley absorve menos strikes por minuto e tem defesa superior (60% vs 45%).' },
        { label: 'Experiencia UFC', valueA: 38, valueB: 42, labelA: 'Medio', labelB: 'Medio', advantage: 'even', advantage_note: 'Ambos com pouca experiencia no octogono. Aswell tem 2 lutas contra 1 de Riley.' },
        { label: 'Cardio e Ritmo', valueA: 72, valueB: 65, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Riley mantem ritmo alto com volume superior de strikes por minuto.' },
      ],
      insight: 'Riley leva vantagem em praticamente todas as areas de striking. A questao e se a experiencia adicional de Aswell no UFC (mesmo com uma derrota) pode compensar a diferenca tecnica e atletica.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Riley',
        ko_tko: { count: 9, percent: 75 },
        submission: { count: 0, percent: 0 },
        decision: { count: 3, percent: 25 },
        total_wins: 12,
      },
      fighter2: {
        nome: 'Aswell Jr.',
        ko_tko: { count: 6, percent: 55 },
        submission: { count: 0, percent: 0 },
        decision: { count: 5, percent: 45 },
        total_wins: 11,
      },
      insight: 'Riley e uma maquina de nocautes: 75% das vitorias por KO/TKO. Aswell tambem tem poder (55% por KO), mas depende mais de decisoes. A tendencia e clara: se essa luta ficar em pe, Riley tem vantagem significativa no poder de finalizacao.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM RILEY',
          color: 'red',
          title: 'A Zona de Perigo Maxima',
          description: 'Riley e um finalizador de primeiro round com quatro vitorias no R1. Se ele comecar agressivo como fez contra Grad, Aswell vai precisar sobreviver os primeiros 3 minutos. A energia do O2 Arena vai estar no pico e Riley vai querer dar um show para a torcida.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Ajustes e Adaptacao',
          description: 'Se Aswell sobreviver o primeiro round, o segundo pode ser mais equilibrado. Aswell mostrou contra Oki que consegue se adaptar e lutar rounds completos. Riley tambem nocauteou Grad no R2, entao o perigo nunca desaparece completamente.',
        },
        {
          rounds: 'R3',
          danger_level: 4,
          danger_label: 'VANTAGEM ASWELL',
          color: 'green',
          title: 'Territorio do Sobrevivente',
          description: 'Se a luta chegar ao terceiro round, Aswell tem mais experiencia em lutas que vao a distancia (5 decisoes na carreira). Riley raramente chega ao R3. Se Aswell conseguir transformar isso numa luta de pontos, suas chances melhoram significativamente.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Torcida em Casa', fighter: 'Riley', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Riley luta em casa no O2 Arena em Londres. Para um prospect britanico invicto, essa e a plataforma perfeita. A energia da torcida pode elevar a performance dele a outro nivel.' },
        { icon: 'TrendingUp', title: 'Hype e Expectativa', fighter: 'Riley', risk_level: 'POSITIVO', risk_color: 'green', description: 'Riley e o prospect mais falado do peso-pena britanico. O nocaute no debut criou expectativas enormes. Ele vai entrar com confianca maxima.' },
        { icon: 'Brain', title: 'Experiencia com Derrota', fighter: 'Aswell Jr.', risk_level: 'POSITIVO', risk_color: 'green', description: 'Aswell ja perdeu e se recuperou. Essa experiencia e valiosa. Ele sabe lidar com adversidade, algo que Riley ainda nao precisou enfrentar.' },
        { icon: 'AlertTriangle', title: 'Amostra Pequena no UFC', fighter: 'Ambos', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Riley tem apenas 1 luta no UFC, Aswell tem 2. Com amostras tao pequenas, as estatisticas do UFC sao menos confiaveis. O desconhecido e um fator.' },
        { icon: 'Zap', title: 'Poder de Finalizacao', fighter: 'Riley', risk_level: 'POSITIVO', risk_color: 'green', description: 'Com 9 nocautes em 12 lutas, Riley carrega poder real. E o tipo de lutador que pode encerrar a luta com um unico golpe limpo.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Riley',
        total_probability: 68,
        scenarios: [
          { name: 'Nocaute Devastador', probability: 40, method: 'KO/TKO R1-R2', description: 'Riley entra agressivo, conecta combinacoes pesadas e nocauteia Aswell cedo. O cenario mais provavel dado seu historico de finalizacoes rapidas.' },
          { name: 'Dominio no Striking', probability: 18, method: 'Decisao Unanime', description: 'Riley controla a distancia com jab e chutes, vence claramente nos tres rounds sem conseguir a finalizacao.' },
          { name: 'TKO Tardio', probability: 10, method: 'TKO R3', description: 'Aswell sobrevive os rounds iniciais mas o dano acumula. Riley encerra no terceiro round com volume.' },
        ],
      },
      fighter2: {
        nome: 'Aswell Jr.',
        total_probability: 30,
        scenarios: [
          { name: 'O Contragolpe Perfeito', probability: 12, method: 'KO/TKO R1-R2', description: 'Riley vem agressivo demais e Aswell encontra o timing perfeito para um contragolpe. O texano tem 6 KOs na carreira e poder para causar surpresa.' },
          { name: 'Sobreviver e Vencer nos Pontos', probability: 10, method: 'Decisao Unanime/Dividida', description: 'Aswell defende bem, leva a luta para o clinch quando necessario, e vence nos pontos com estrategia e experiencia.' },
          { name: 'Wrestle e Controla', probability: 8, method: 'Decisao', description: 'Aswell muda o plano de jogo, busca takedowns e controla Riley no chao, neutralizando o striking.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Luke Riley',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Riley e o lutador mais completo e perigoso nessa luta. Com 9 nocautes em 12 lutas, base solida em Muay Thai e a vantagem de lutar em casa, ele tem tudo a seu favor. Aswell tem poder e mostrou resiliencia, mas a defesa de strikes dele (45%) e uma vulnerabilidade seria contra o volume e a precisao de Riley. Prevejo Riley pressionando desde o inicio e encontrando a abertura para um nocaute nos dois primeiros rounds.',
      x_factor: {
        title: 'A Primeira Vez Longe de Casa',
        description: 'Aswell nunca lutou fora do continente americano. Viajar para Londres, enfrentar a torcida hostil e a diferenca de fuso horario pode impactar seu desempenho mais do que ele imagina.',
      },
      upset_alert: {
        title: 'O Excesso de Confianca',
        description: 'Riley pode entrar confiante demais, especialmente com a torcida a favor. Se ele abandonar a disciplina tatica e trocar de forma descuidada, Aswell tem poder para puni-lo com um contragolpe.',
      },
      probabilities: {
        fighter1: { nome: 'Riley', percent: 68 },
        fighter2: { nome: 'Aswell Jr.', percent: 30 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Agressividade Inicial de Riley', icon: 'Zap', description: 'Observe se Riley vem agressivo desde o primeiro segundo como fez contra Grad. Se ele comecar com volume e pressao, Aswell vai ter dificuldade para encontrar espaco.' },
        { num: 2, title: 'A Defesa de Strikes de Aswell', icon: 'Shield', description: 'Com 45% de defesa de strikes no UFC, Aswell precisa melhorar drasticamente. Se ele continuar absorvendo golpes nesse ritmo, Riley vai encontrar a abertura rapidamente.' },
        { num: 3, title: 'Contragolpes do Texano', icon: 'Target', description: 'Aswell tem poder real (6 KOs). Se Riley vier para frente de forma descuidada, o americano pode encontrar o timing para um contragolpe devastador.' },
        { num: 4, title: 'O Fator Torcida', icon: 'MapPin', description: 'Como Riley reage a energia do O2 Arena e fundamental. Se ele canalizar a energia para agressividade calculada, sera letal. Se deixar a emocao tomar conta, pode cometer erros.' },
        { num: 5, title: 'Ajustes no R2 caso nao haja nocaute', icon: 'Brain', description: 'Se a luta chegar ao segundo round, observe os ajustes de ambos. Riley raramente precisa ajustar (nocauteia antes). Aswell mostrou capacidade de adaptacao contra Oki.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'PROSPECTS EM COLISAO', content: 'RILEY vs ASWELL JR.\nUFC Londres | Peso Pena\n\n12-0 vs 11-3\nInvicto britanico em casa\nvs o texano resiliente', color: 'red' },
        { slide_number: 2, title: 'RILEY: MAQUINA DE KO', content: '12-0 na carreira\n9 nocautes (75% KO rate)\nDebut UFC: KO no R2\nLuta em casa em Londres\n26 anos, Muay Thai puro', color: 'red' },
        { slide_number: 3, title: 'ASWELL: O SOBREVIVENTE', content: '11-3 na carreira\n6 nocautes (55%)\nSe recuperou de derrota no debut\nNocauteou Almeida no R1\nO Texas Kid, 25 anos', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'RILEY por KO/TKO R1-R2\n\nConfianca: MEDIA-ALTA\n68% Riley / 30% Aswell\n\nO prospect britanico e real.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Riley vs Aswell Jr. e a luta de prospects que pode revelar o proximo grande nome do peso-pena. Riley: 12-0, 9 KOs, em casa. Aswell: 11-3, resiliente, vem de KO no R1.' },
        { num: '2/4', text: 'Luke Riley e um caso raro: 75% de KO rate e invicto. O debut no UFC foi assustador. Nocauteou Bogdan Grad em 30 segundos do R2. O hype e real?' },
        { num: '3/4', text: 'Aswell Jr. tem uma qualidade que Riley ainda nao precisou mostrar: a capacidade de voltar de uma derrota. Perdeu o debut, nocauteou no R1 na sequencia. Mental forte.' },
        { num: '4/4', text: 'Previsao: Riley por KO nos dois primeiros rounds. Mas nao durmam no Aswell. O cara tem poder e ja mostrou que sabe se adaptar.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Luke Riley tem 12-0 e 75% de KO rate. Ele e o prospect mais perigoso do peso-pena britanico. E no sabado, ele luta em casa.' },
        { time: '10-25s', title: 'Contexto', text: 'Riley enfreta Michael Aswell Jr., o texano que se recuperou da derrota no debut com um nocaute no primeiro round. Dois prospects, um octogono, e a chance de construir uma carreira.' },
        { time: '25-40s', title: 'Analise', text: 'Riley leva vantagem em tudo no striking: volume, precisao, defesa. Aswell precisa encontrar o contragolpe ou mudar o plano de jogo completamente.' },
        { time: '40-55s', title: 'Previsao', text: 'Riley por KO nos dois primeiros rounds. O hype e real e o O2 Arena vai explodir.' },
      ],
      tiktok: [
        { hook: 'Esse cara tem 12 lutas e 9 nocautes. E ele luta EM CASA no sabado.', body: 'Luke Riley e o prospect mais assustador do peso-pena. 75% de KO rate, invicto, e vai ter 20 mil britanicos gritando por ele no O2 Arena. Aswell Jr. e valente, mas vai ser dificil.', cta: 'Voce aposta em KO no R1 ou R2? Comenta!' },
        { hook: 'O cara perdeu o debut no UFC e respondeu com um nocaute no R1.', body: 'Michael Aswell Jr. e o tipo de lutador que nao desiste. Perdeu para Oki, voltou e destruiu Lucas Almeida. Mas agora ele enfrenta um invicto com 9 KOs em 12 lutas. Em Londres. Com a torcida contra.', cta: 'O Texas Kid consegue? Comenta!' },
      ],
      headlines: [
        'Riley vs Aswell: O Prospect Britanico Mais Explosivo Busca 13-0 no O2 Arena',
        'Luke Riley e Real? 75% de KO Rate e o Debut Que Assustou o Peso-Pena',
        'Aswell Jr. Aprendeu Com a Derrota, Mas Riley e Um Problema Diferente',
        'UFC Londres: A Luta de Prospects Que Pode Definir o Futuro do Peso-Pena',
        'O Texas Kid Contra o Muay Thai Britanico: Preview Riley vs Aswell Jr.',
        'Riley -320 e o Favorito Mais Justificado do Card de Londres?',
        '75% de KO Rate em Casa: Por Que Riley e a Aposta Mais Segura do Card',
      ],
      podcast: [
        {
          timestamp: '0:00-2:00',
          title: 'O Prospect Mais Perigoso de Londres',
          talking_points: [
            'Riley e 12-0 com 75% de KO rate. Treina ao lado de Paddy Pimblett no Next Gen MMA Liverpool. Nocauteou Bogdan Grad em 30 segundos do R2 no debut UFC.',
            'Aswell Jr. (2-1 UFC) e o tipo de oponente que nao pode ser subestimado. Perdeu o debut pra Oki, voltou e nocauteou Lucas Almeida no R1.',
            'A dinamica: Riley e o favorito claro (-320) mas este e apenas seu segundo fight no UFC. A pressao de lutar em casa no O2 Arena pode ser positiva ou negativa.',
          ],
          discussion_questions: [
            'Prospect invicto lutando em casa: isso ajuda ou pesa mais na pressao?',
          ],
        },
        {
          timestamp: '2:00-4:00',
          title: 'Analise Tecnica e Apostas',
          talking_points: [
            'Riley tem vantagem em tudo no striking: velocidade, precisao, volume. Aswell absorve 3.85 strikes por minuto com apenas 45% de defesa. A combinacao e perigosa.',
            'Melhor aposta: Riley por KO/TKO a -180. Under 2.5 rounds a -140. O cenario de finalizacao precoce e o mais provavel dado o historico de ambos.',
            'Armadilha: Riley por decisao. Ele quase nunca vai pra decisao (17% das vitorias). Ou ele finaliza ou nao.',
          ],
          discussion_questions: [
            'Aswell Jr. tem poder pra machucar Riley? Ou a diferenca tecnica e grande demais?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-320',
        fighter2_odds: '+260',
        fighter1_name: 'Luke Riley',
        fighter2_name: 'Michael Aswell Jr.',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Taxa de Nocaute de Riley', stat_headline: '75% DAS VITORIAS POR KO/TKO, 9 EM 12 LUTAS', contexto: 'Riley e um finalizador nato. Quase nunca precisa ir para a decisao dos juizes.', implicacao_aposta: 'Forte edge para Riley dentro da distancia. Luta tende a nao ir para os juizes.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Strikes Fraca de Aswell', stat_headline: '45% DE DEFESA DE STRIKES NO UFC, ABSORVE 3.85 POR MINUTO', contexto: 'Aswell absorve golpes demais contra um striker do nivel de Riley. Vulnerabilidade clara.', implicacao_aposta: 'Aumenta probabilidade de finalizacao precoce de Riley.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Fator Casa', stat_headline: 'RILEY LUTA EM CASA COM 20.000 BRITANICOS NO O2 ARENA', contexto: 'Prospect britanico invicto em card de Londres. A energia sera absurda.', implicacao_aposta: 'Favorece Riley emocionalmente. Pode impactar desempenho de Aswell.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Resiliencia de Aswell', stat_headline: 'SE RECUPEROU DA DERROTA NO DEBUT COM KO NO R1', contexto: 'Aswell mostrou maturidade ao voltar forte apos a primeira derrota no UFC.', implicacao_aposta: 'Nao descarte o azarao. Aswell tem mental forte e poder nas maos.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Riley por KO/TKO', odds: '-180', confianca: 'alta', raciocinio: 'Com 75% de KO rate e a defesa fraca de Aswell, a finalizacao por strikes e o cenario mais provavel.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-140', confianca: 'media', raciocinio: 'Riley finaliza cedo. 4 vitorias no R1 na carreira. Aswell tambem tem finalizacoes rapidas. Luta tende a ser curta.' },
        { tipo: 'Moneyline', pick: 'Riley (-320)', odds: '-320', confianca: 'media', edge_vs_mercado: 'O preco e justificado mas nao oferece grande valor.', raciocinio: 'Riley e favorito claro, mas -320 nao oferece muito valor. Melhor apostar no metodo.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Riley por Decisao',
        descricao: 'Riley quase nunca vai para a decisao (apenas 17% das vitorias). Apostar em decisao de Riley e pagar demais por um cenario improvavel. Se a luta for longe, Aswell pode ate surpreender.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Riley vs Aswell Jr: Undefeated Brit Takes on the Resilient Texan',
  subtitulo: 'The most explosive British featherweight prospect seeks his second UFC win against the young American',
  evento_data: 'March 21, 2026',
  evento_local: 'The O2 Arena, London, United Kingdom',
  categoria_peso: 'Featherweight (145 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM-HIGH' },
  fighter1_info: { ...analisePT.fighter1_info, ultimasLutas: [{ result: 'W', opponent: 'Bogdan Grad', method: 'KO R2', event: 'UFC Fight Night' }] },
  fighter2_info: { ...analisePT.fighter2_info, ultimasLutas: [{ result: 'W', opponent: 'Lucas Almeida', method: 'TKO R1', event: 'UFC Fight Night' }, { result: 'L', opponent: 'Bolaji Oki', method: 'Unanimous Decision', event: 'UFC Fight Night' }] },
  full_analysis: {
    hero: {
      ...analisePT.full_analysis.hero,
      evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Featherweight (145 lbs)',
      tagline: 'The British Prospect vs Texan Resilience', tagline_sub: 'Undefeated striker with 9 KOs in 12 fights hosts American coming off a R1 finish',
      fighter1: { ...analisePT.full_analysis.hero.fighter1, ranking: 'N/R Featherweight', info_extra: 'Whiston, England | 26 years old' },
      fighter2: { ...analisePT.full_analysis.hero.fighter2, ranking: 'N/R Featherweight', info_extra: 'Houston, Texas, USA | 25 years old' },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">The Future of British Featherweight</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Luke Riley</strong> is the kind of prospect that makes UFC scouts salivate. Undefeated in 12 fights with 9 knockouts and a UFC debut that put the MMA community on notice: he knocked out Bogdan Grad 30 seconds into the second round, showing the power and timing that made him a Cage Warriors champion.
        </p>
        <p class="mb-4">
          At just 26 years old, Riley is a product of British Muay Thai. He trains at NEXT Generation MMA, with a solid striking base and calculated aggression. Fighting at home in the O2 Arena, he'll have the deafening support of the British crowd on a night that could mark him as the next big name in UFC featherweight.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Texas Kid Didn't Come to Sightsee</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Michael Aswell Jr.</strong> learned fast that the UFC doesn't forgive. His debut was a decision loss to Bolaji Oki, but the response came in style: he knocked out Lucas Almeida in the first round in Rio de Janeiro. With an 11-3 career record, the 25-year-old Texan has power in his hands (6 KOs) and has already shown he knows how to bounce back from adversity.
        </p>
        <p class="mb-4">
          This is a prospect fight with both men looking to carve space in the featherweight division. Riley has the home advantage, the undefeated record, and the hype. Aswell has the experience of someone who has already overcome defeat and the mentality of knowing he needs to impress. A fight that promises to be short, violent, and career-defining.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Unranked', fighter2: 'Unranked' },
        { dimensao: 'Streak', fighter1: '12-fight win streak (undefeated)', fighter2: '1-fight win streak' },
        { dimensao: 'Goal', fighter1: 'Confirm the hype and climb the rankings', fighter2: 'Build a win streak and gain momentum' },
        { dimensao: 'Risk', fighter1: 'First career loss', fighter2: 'Second UFC loss in 3 fights' },
      ],
      prognostico: {
        fighter1_vence: { titulo: 'THE HYPE IS REAL', subtitulo: 'Riley knocks out Aswell at home and becomes the #1 British featherweight prospect', consequencias: [{ tag: 'RANKING', texto: 'Riley enters the ranked fighters\' radar at 2-0 in the UFC and 13-0 overall' }, { tag: 'NEXT', texto: 'Fight against a ranked opponent on the next British card or US main card' }], proxima_luta: 'Riley vs top 15 ranked opponent' },
        fighter2_vence: { titulo: 'TEXAS INVADES LONDON', subtitulo: 'Aswell Jr. crashes the British crowd\'s party with a dominant performance', consequencias: [{ tag: 'CREDIBILITY', texto: 'Aswell establishes himself as a serious featherweight prospect with a win over an undefeated fighter' }, { tag: 'NEXT', texto: 'Fight on an American card against a similar-level opponent' }], proxima_luta: 'Aswell Jr. vs featherweight prospect on the next card' },
      },
    },
    momento_atual: {
      fighter1: { ...analisePT.full_analysis.momento_atual.fighter1, recent_fights: [{ date: 'Nov 2025', opponent: 'Bogdan Grad', result: 'W', method: 'KO R2 (0:30)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut with a devastating knockout 30 seconds into the second round. Impressive performance.' }], full_fight_history: [{ date: 'Nov 2025', opponent: 'Bogdan Grad', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut, R2 knockout' }], momentum_label: 'On Fire', momentum_note: 'Riley entered the UFC with a bang. The knockout over Bogdan Grad on debut was the kind of performance that puts a prospect on the map immediately. At 12-0, undefeated and fighting at home in London, he\'s in the perfect position to build his UFC story.' },
      fighter2: { ...analisePT.full_analysis.momento_atual.fighter2, recent_fights: [{ date: 'Oct 2025', opponent: 'Lucas Almeida', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'First-round knockout in Rio de Janeiro. Perfect response after the loss to Oki.' }, { date: 'May 2025', opponent: 'Bolaji Oki', result: 'L', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut loss. Lost by unanimous decision in a competitive fight.' }], full_fight_history: [{ date: 'May 2025', opponent: 'Bolaji Oki', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut loss' }, { date: 'Oct 2025', opponent: 'Lucas Almeida', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'R1 knockout in Rio' }], momentum_label: 'Bouncing Back', momentum_note: 'Aswell Jr. showed maturity by bouncing back from his debut loss. The knockout over Lucas Almeida in Rio de Janeiro proved he belongs in the UFC. But traveling to London to face an undefeated Brit in front of a hostile crowd is a completely different challenge.' },
    },
    nivel_competicao: {
      fighter1: { nome: 'Riley', media_oponentes: 1, media_oponentes_label: 'Poor', aproveitamento: '1W-0L (100%)', contra_top5: '0W-0L' },
      fighter2: { nome: 'Aswell Jr.', media_oponentes: 1, media_oponentes_label: 'Poor', aproveitamento: '1W-1L (50%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'No common opponents. Both are early in their UFC careers with just 1-2 fights in the organization.',
    },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 5.14, valueB: 4.22, maxVal: 7, format: 'decimal' },
        { label: 'Striking Accuracy (%)', valueA: 60, valueB: 47, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 2.57, valueB: 3.85, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 60, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Takedowns Per 15 Min', valueA: 0.00, valueB: 0.00, maxVal: 4, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 0, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 100, valueB: 50, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '26 years old', fighter2: '25 years old', note: 'Practically the same generation' },
        { label: 'Height', fighter1: '5\'9" (1.75m)', fighter2: '5\'8" (1.73m)', note: 'Riley slightly taller' },
        { label: 'Reach', fighter1: '69" (175cm)', fighter2: '69" (175cm)', note: 'Same reach' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
        { label: 'Gym', fighter1: 'NEXT Generation MMA, England', fighter2: '4oz Fight Club, Houston', note: null },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Stand-up Striking', valueA: 82, valueB: 65, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Riley has a strong Muay Thai base with 9 KOs in 12 fights. Superior volume and accuracy.' },
        { label: 'Knockout Power', valueA: 85, valueB: 72, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Both have power, but Riley knocks people out more frequently and explosively. 75% KO rate.' },
        { label: 'Wrestling/Grappling', valueA: 45, valueB: 48, labelA: 'Average', labelB: 'Average', advantage: 'even', advantage_note: 'Neither is known for wrestling. Fight will likely stay on the feet.' },
        { label: 'Strike Defense', valueA: 70, valueB: 50, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Riley absorbs fewer strikes per minute and has superior defense (60% vs 45%).' },
        { label: 'UFC Experience', valueA: 38, valueB: 42, labelA: 'Average', labelB: 'Average', advantage: 'even', advantage_note: 'Both with limited octagon experience. Aswell has 2 fights vs Riley\'s 1.' },
        { label: 'Cardio & Pace', valueA: 72, valueB: 65, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Riley maintains a high pace with superior strike volume per minute.' },
      ],
      insight: 'Riley holds the advantage in virtually every striking category. The question is whether Aswell\'s additional UFC experience (even with a loss) can compensate for the technical and athletic gap.',
    },
    distribuicao_vitorias: { ...analisePT.full_analysis.distribuicao_vitorias, insight: 'Riley is a knockout machine: 75% of his wins by KO/TKO. Aswell also has power (55% by KO), but relies more on decisions. The trend is clear: if this fight stays standing, Riley has a significant advantage in finishing power.' },
    danger_zones: { zones: [
      { rounds: 'R1', danger_level: 8, danger_label: 'RILEY ADVANTAGE', color: 'red', title: 'Maximum Danger Zone', description: 'Riley is a first-round finisher with four R1 wins. If he starts aggressive like he did against Grad, Aswell will need to survive the first 3 minutes. The O2 Arena energy will be at its peak and Riley will want to put on a show for the crowd.' },
      { rounds: 'R2', danger_level: 5, danger_label: 'EVEN', color: 'gold', title: 'Adjustments & Adaptation', description: 'If Aswell survives the first round, the second could be more balanced. Aswell showed against Oki that he can adapt and fight complete rounds. Riley also knocked out Grad in R2, so the danger never fully disappears.' },
      { rounds: 'R3', danger_level: 4, danger_label: 'ASWELL ADVANTAGE', color: 'green', title: 'The Survivor\'s Territory', description: 'If the fight reaches the third round, Aswell has more experience in fights that go the distance (5 career decisions). Riley rarely gets to R3. If Aswell can turn this into a points fight, his chances improve significantly.' },
    ] },
    intangiveis: { items: [
      { icon: 'MapPin', title: 'Home Crowd', fighter: 'Riley', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Riley fights at home in the O2 Arena in London. For an undefeated British prospect, this is the perfect platform. The crowd energy could elevate his performance to another level.' },
      { icon: 'TrendingUp', title: 'Hype & Expectations', fighter: 'Riley', risk_level: 'POSITIVE', risk_color: 'green', description: 'Riley is the most talked-about British featherweight prospect. The debut knockout created enormous expectations. He\'ll walk in with maximum confidence.' },
      { icon: 'Brain', title: 'Experience with Defeat', fighter: 'Aswell Jr.', risk_level: 'POSITIVE', risk_color: 'green', description: 'Aswell has already lost and bounced back. That experience is valuable. He knows how to handle adversity, something Riley hasn\'t had to face yet.' },
      { icon: 'AlertTriangle', title: 'Small UFC Sample Size', fighter: 'Both', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Riley has just 1 UFC fight, Aswell has 2. With such small samples, UFC stats are less reliable. The unknown is a factor.' },
      { icon: 'Zap', title: 'Finishing Power', fighter: 'Riley', risk_level: 'POSITIVE', risk_color: 'green', description: 'With 9 KOs in 12 fights, Riley carries real power. He\'s the type of fighter who can end it with a single clean shot.' },
    ] },
    caminhos_vitoria: {
      fighter1: { nome: 'Riley', total_probability: 68, scenarios: [
        { name: 'Devastating Knockout', probability: 40, method: 'KO/TKO R1-R2', description: 'Riley comes out aggressive, lands heavy combinations and knocks out Aswell early. The most likely scenario given his history of quick finishes.' },
        { name: 'Striking Dominance', probability: 18, method: 'Unanimous Decision', description: 'Riley controls distance with jab and kicks, wins all three rounds clearly without getting the finish.' },
        { name: 'Late TKO', probability: 10, method: 'TKO R3', description: 'Aswell survives the early rounds but damage accumulates. Riley finishes in the third with volume.' },
      ] },
      fighter2: { nome: 'Aswell Jr.', total_probability: 30, scenarios: [
        { name: 'The Perfect Counter', probability: 12, method: 'KO/TKO R1-R2', description: 'Riley comes forward too aggressively and Aswell finds the perfect timing for a counter. The Texan has 6 career KOs and power to cause an upset.' },
        { name: 'Survive & Win on Points', probability: 10, method: 'Unanimous/Split Decision', description: 'Aswell defends well, clinches when necessary, and wins on points with strategy and experience.' },
        { name: 'Wrestle & Control', probability: 8, method: 'Decision', description: 'Aswell changes the gameplan, goes for takedowns and controls Riley on the ground, neutralizing his striking.' },
      ] },
    },
    previsao_final: {
      ...analisePT.full_analysis.previsao_final,
      confidence_label: 'MEDIUM-HIGH',
      explanation: 'Riley is the more complete and dangerous fighter here. With 9 KOs in 12 fights, a solid Muay Thai base, and the home crowd advantage, everything is in his favor. Aswell has power and showed resilience, but his strike defense (45%) is a serious vulnerability against Riley\'s volume and accuracy. I see Riley pressing from the start and finding the opening for a knockout in the first two rounds.',
      x_factor: { title: 'First Time Away From Home', description: 'Aswell has never fought outside the American continent. Traveling to London, facing a hostile crowd, and dealing with the time zone difference could impact his performance more than he imagines.' },
      upset_alert: { title: 'Overconfidence', description: 'Riley could walk in too confident, especially with the crowd behind him. If he abandons tactical discipline and exchanges recklessly, Aswell has the power to punish him with a counter.' },
    },
    o_que_observar: { points: [
      { num: 1, title: 'Riley\'s Initial Aggression', icon: 'Zap', description: 'Watch if Riley comes out aggressive from the first second like he did against Grad. If he starts with volume and pressure, Aswell will struggle to find space.' },
      { num: 2, title: 'Aswell\'s Strike Defense', icon: 'Shield', description: 'With 45% strike defense in the UFC, Aswell needs a drastic improvement. If he keeps absorbing shots at that rate, Riley will find the opening quickly.' },
      { num: 3, title: 'The Texan\'s Counters', icon: 'Target', description: 'Aswell has real power (6 KOs). If Riley comes forward recklessly, the American could find the timing for a devastating counter.' },
      { num: 4, title: 'The Crowd Factor', icon: 'MapPin', description: 'How Riley channels the O2 Arena energy is crucial. If he turns it into calculated aggression, he\'ll be lethal. If he lets emotions take over, he could make mistakes.' },
      { num: 5, title: 'R2 Adjustments If No KO', icon: 'Brain', description: 'If the fight reaches the second round, watch for adjustments from both. Riley rarely needs to adjust (he knocks them out first). Aswell showed the ability to adapt against Oki.' },
    ] },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'PROSPECTS COLLIDE', content: 'RILEY vs ASWELL JR.\nUFC London | Featherweight\n\n12-0 vs 11-3\nUndefeated Brit at home\nvs the resilient Texan', color: 'red' },
        { slide_number: 2, title: 'RILEY: KO MACHINE', content: '12-0 career record\n9 knockouts (75% KO rate)\nUFC debut: KO in R2\nFighting at home in London\n26 years old, pure Muay Thai', color: 'red' },
        { slide_number: 3, title: 'ASWELL: THE SURVIVOR', content: '11-3 career record\n6 knockouts (55%)\nBounced back from debut loss\nKO\'d Almeida in R1\nThe Texas Kid, 25 years old', color: 'blue' },
        { slide_number: 4, title: 'PREDICTION', content: 'RILEY by KO/TKO R1-R2\n\nConfidence: MEDIUM-HIGH\n68% Riley / 30% Aswell\n\nThe British prospect is legit.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Riley vs Aswell Jr. is the prospect fight that could reveal the next big name at featherweight. Riley: 12-0, 9 KOs, at home. Aswell: 11-3, resilient, coming off a R1 KO.' },
        { num: '2/4', text: 'Luke Riley is a rare case: 75% KO rate and undefeated. The UFC debut was terrifying. Knocked out Bogdan Grad 30 seconds into R2. Is the hype real?' },
        { num: '3/4', text: 'Aswell Jr. has a quality Riley hasn\'t had to show yet: the ability to bounce back from a loss. Lost his debut, knocked out in R1 right after. Strong mentality.' },
        { num: '4/4', text: 'Prediction: Riley by KO in the first two rounds. But don\'t sleep on Aswell. The kid has power and has shown he can adapt.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Luke Riley is 12-0 with a 75% KO rate. He\'s the most dangerous British featherweight prospect. And on Saturday, he fights at home.' },
        { time: '10-25s', title: 'Context', text: 'Riley faces Michael Aswell Jr., the Texan who bounced back from his debut loss with a first-round knockout. Two prospects, one octagon, and the chance to build a career.' },
        { time: '25-40s', title: 'Analysis', text: 'Riley has the advantage in everything striking-related: volume, accuracy, defense. Aswell needs to find the counter or change the gameplan entirely.' },
        { time: '40-55s', title: 'Prediction', text: 'Riley by KO in the first two rounds. The hype is real and the O2 Arena is going to explode.' },
      ],
      tiktok: [
        { hook: 'This guy has 12 fights and 9 knockouts. And he fights AT HOME on Saturday.', body: 'Luke Riley is the scariest featherweight prospect around. 75% KO rate, undefeated, and 20 thousand Brits screaming for him at the O2 Arena. Aswell Jr. is tough, but this is going to be a problem.', cta: 'You betting KO in R1 or R2? Comment!' },
        { hook: 'This guy lost his UFC debut and responded with a R1 knockout.', body: 'Michael Aswell Jr. is the type of fighter who doesn\'t quit. Lost to Oki, came back and destroyed Lucas Almeida. But now he faces an undefeated fighter with 9 KOs in 12 fights. In London. With the crowd against him.', cta: 'Can the Texas Kid pull it off? Comment!' },
      ],
      headlines: [
        'Riley vs Aswell: The Most Explosive British Prospect Seeks 13-0 at the O2 Arena',
        'Is Luke Riley the Real Deal? 75% KO Rate and a Debut That Terrified Featherweight',
        'Aswell Jr. Learned From Defeat, But Riley Is a Different Problem',
        'UFC London: The Prospect Fight That Could Define the Future of Featherweight',
        'The Texas Kid vs British Muay Thai: Riley vs Aswell Jr. Preview',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...analisePT.full_analysis.radar_apostador!.odds, source: 'Average across sportsbooks (March 2026)' },
      edges: [
        { icon: 'Zap', titulo: 'Riley\'s KO Rate', stat_headline: '75% OF WINS BY KO/TKO, 9 IN 12 FIGHTS', contexto: 'Riley is a natural finisher. He almost never needs the judges\' scorecards.', implicacao_aposta: 'Strong edge for Riley inside the distance. Fight is unlikely to go to the judges.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Aswell\'s Weak Strike Defense', stat_headline: '45% STRIKE DEFENSE IN THE UFC, ABSORBS 3.85 PER MINUTE', contexto: 'Aswell absorbs too many shots against a striker of Riley\'s caliber. Clear vulnerability.', implicacao_aposta: 'Increases probability of an early Riley finish.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Home Crowd Factor', stat_headline: 'RILEY FIGHTS AT HOME WITH 20,000 BRITS AT THE O2 ARENA', contexto: 'Undefeated British prospect on a London card. The energy will be insane.', implicacao_aposta: 'Emotionally favors Riley. Could impact Aswell\'s performance.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Aswell\'s Resilience', stat_headline: 'BOUNCED BACK FROM DEBUT LOSS WITH A R1 KO', contexto: 'Aswell showed maturity by coming back strong after his first UFC loss.', implicacao_aposta: 'Don\'t count out the underdog. Aswell has a strong mentality and power in his hands.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Method', pick: 'Riley by KO/TKO', odds: '-180', confianca: 'alta', raciocinio: 'With a 75% KO rate and Aswell\'s weak defense, a stoppage by strikes is the most likely scenario.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-140', confianca: 'media', raciocinio: 'Riley finishes early. 4 career R1 wins. Aswell also has quick finishes. Fight is likely to be short.' },
        { tipo: 'Moneyline', pick: 'Riley (-320)', odds: '-320', confianca: 'media', edge_vs_mercado: 'The price is justified but doesn\'t offer great value.', raciocinio: 'Riley is the clear favorite, but -320 doesn\'t offer much value. Better to bet on the method.' },
      ],
      armadilha: { titulo: 'Trap: Riley by Decision', descricao: 'Riley almost never goes to a decision (just 17% of wins). Betting on a Riley decision is overpaying for an unlikely scenario. If the fight goes long, Aswell could even pull the upset.' },
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
