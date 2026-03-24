'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: FullSingleAnalise = {
  id: 'evloev-vs-murphy',
  evento_id: null,
  slug: 'evloev-vs-murphy',
  titulo: 'Evloev vs Murphy: Invictos em Rota de Colisao',
  subtitulo: 'O #1 do ranking peso-pena enfrenta o #3 numa eliminatoria pelo titulo em Londres',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,70m', envergadura: '184cm', idade: 32, academia: 'Team Dagestan' },
      fighter2: { altura: '1,75m', envergadura: '187cm', idade: 34, academia: 'Manchester Top Team' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'Decisao Unanime',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Movsar Evloev',
    record: '19-0-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Aljamain Sterling', method: 'Decisao Unanime', event: 'UFC 310' },
      { result: 'W', opponent: 'Arnold Allen', method: 'Decisao Unanime', event: 'UFC 297' },
      { result: 'W', opponent: 'Diego Lopes', method: 'Decisao Unanime', event: 'UFC 288' },
    ],
  },
  fighter2_info: {
    nome: 'Lerone Murphy',
    record: '17-0-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Aaron Pico', method: 'KO R1 (cotovelo giratorio)', event: 'UFC 319' },
      { result: 'W', opponent: 'Josh Emmett', method: 'Decisao Unanime', event: 'UFC on ESPN 65' },
      { result: 'W', opponent: 'Dan Ige', method: 'Decisao Unanime', event: 'UFC 308' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Pena (145 lbs)',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    // ===========================
    // Section 1: HERO
    // ===========================
    hero: {
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: '21 de Marco, 2026',
      evento_local: 'The O2 Arena, Londres, Reino Unido',
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Invictos em Rota de Colisao',
      tagline_sub: 'Eliminatoria pelo titulo peso-pena com 36 vitorias combinadas e zero derrotas',
      fighter1: {
        nome_completo: 'Movsar Evloev',
        apelido: '',
        sobrenome: 'Evloev',
        record: '19-0-0',
        ranking: '#1 Peso-Pena',
        info_extra: 'Ingushetia, Russia | 32 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Lerone "The Miracle" Murphy',
        apelido: 'The Miracle',
        sobrenome: 'Murphy',
        record: '17-0-1',
        ranking: '#3 Peso-Pena',
        info_extra: 'Manchester, Inglaterra | 34 anos',
        imagem_fullbody_url: null,
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Duas Jornadas Perfeitas, Um Unico Destino</h3>
        <p class="mb-4">
          Existem lutas que sao testes de nivel. E existem lutas que definem uma geracao. <strong class="text-ufc-red">Movsar Evloev</strong> contra <strong class="text-blue-400">Lerone Murphy</strong> e a segunda. Dois caras que nunca perderam na carreira profissional, que escalaram o ranking do peso-pena com consistencia brutal, e que agora se encontram no main event de Londres com a promessa do titulo na linha.
        </p>
        <p class="mb-4">
          Evloev e a maquina. O russo de 32 anos construiu seu recorde invicto de 19-0 na base da pressao incansavel, wrestling de elite e uma capacidade unica de transformar rounds inteiros em exercicios de controle. Nao importa se o oponente se chama Aljamain Sterling, Arnold Allen ou Diego Lopes. Evloev encontra um jeito de vencer. Todas as nove lutas dele no UFC terminaram em decisao, e isso nao e coincidencia. Ele nao busca o highlight; ele busca a vitoria.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Milagre de Manchester</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Murphy</strong> e uma historia de superacao que transcende o esporte. Em 2013, ele levou um tiro no rosto e no pescoco do lado de fora de uma barbearia em Manchester. Sobreviveu, se recuperou, e canalizou tudo para o MMA. Hoje, aos 34 anos, ele carrega um recorde de 17-0-1, com o unico empate vindo em sua estreia no UFC contra Zubaira Tukhugov. Desde entao, nove vitorias consecutivas, incluindo a destruicao de Aaron Pico com um cotovelo giratorio no primeiro round que rendeu o nocaute do ano.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta em Jogo</h3>
        <p class="mb-4">
          Essa nao e apenas mais uma luta. O vencedor vai encarar Alexander Volkanovski pelo titulo peso-pena. Para Evloev, que ja dominou todos que colocaram na frente dele, e a validacao final antes do cinturao. Para Murphy, lutando em casa no O2 Arena, e a chance de transformar uma carreira extraordinaria em algo lendario. O publico britanico vai estar ensurdecedor, e Murphy sabe exatamente como usar essa energia.
        </p>
        <p class="mb-4">
          A pergunta que todo mundo quer responder: o wrestling implacavel de Evloev vai sufocar o striking dinamico de Murphy? Ou o britanico vai encontrar espacos para conectar os golpes que tem derrubado todo mundo? Cinco rounds. Sem saida. Alguem vai perder o zero.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#1 Peso-Pena', fighter2: '#3 Peso-Pena' },
        { dimensao: 'Sequencia', fighter1: '19 vitorias consecutivas', fighter2: '9 vitorias consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Titulo peso-pena', fighter2: 'Titulo peso-pena' },
        { dimensao: 'Narrativa', fighter1: 'Provar que e o melhor da divisao', fighter2: 'Conquistar a chance pelo titulo em casa' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota da carreira', fighter2: 'Primeira derrota da carreira' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A MAQUINA CHEGA AO TOPO',
          subtitulo: 'Evloev sufoca Murphy com wrestling e pressao por 5 rounds',
          consequencias: [
            { tag: 'TITULO', texto: 'Luta pelo titulo peso-pena contra Alexander Volkanovski marcada para o segundo semestre de 2026' },
            { tag: 'LEGADO', texto: 'Evloev se consolida como o desafiante mais perigoso do peso-pena, com 20-0 e vitorias sobre Sterling, Allen e Murphy' },
            { tag: 'RANKING', texto: 'Murphy cai para fora do top 3 mas permanece como ameaca seria na divisao' },
          ],
          proxima_luta: 'Evloev vs Alexander Volkanovski pelo titulo peso-pena',
        },
        fighter2_vence: {
          titulo: 'O MILAGRE EM CASA',
          subtitulo: 'Murphy nocauteia Evloev diante de um O2 Arena em erupcao',
          consequencias: [
            { tag: 'TITULO', texto: 'Murphy desafia Volkanovski numa possivel luta na Inglaterra, criando um evento historico' },
            { tag: 'LEGADO', texto: 'A historia do garoto baleado em Manchester que conquistou uma chance pelo titulo do UFC vira lenda' },
            { tag: 'RANKING', texto: 'Evloev sofre sua primeira derrota mas se mantem no top 3 do peso-pena' },
          ],
          proxima_luta: 'Murphy vs Alexander Volkanovski pelo titulo peso-pena',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Movsar Evloev',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'Decisao Unanime', opponent_rank: 'Ex-Campeao BW', quality_score: 5, quality_label: 'Excelente', note: 'Controlou o ex-campeao dos galos com wrestling superior e pressao constante por 3 rounds' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'Decisao Unanime', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Superou Allen em Toronto com takedowns e controle posicional decisivo' },
          { date: 'Mai 2023', opponent: 'Diego Lopes', result: 'W', method: 'Decisao Unanime', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta eletrizante que rendeu bonus de Luta da Noite contra striker perigoso' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'Decisao Unanime', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Bom', note: 'Dominio total por 3 rounds com placares de 30-26, 30-27, 30-27' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'Decisao Unanime', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida contra striker perigoso com pressao e takedowns' },
        ],
        full_fight_history: [
          { date: 'Abr 2019', opponent: 'Seung Woo Choi', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC' },
          { date: 'Out 2019', opponent: 'Enrique Barzola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Segunda vitoria no UFC' },
          { date: 'Jul 2020', opponent: 'Mike Grundy', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria durante a pandemia' },
          { date: 'Jan 2021', opponent: 'Nik Lentz', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Decisao dividida apertada' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Primeiro oponente ranqueado' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Bom', note: 'Dominio total' },
          { date: 'Mai 2023', opponent: 'Diego Lopes', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta da Noite' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Vitoria sobre top 5' },
          { date: 'Dez 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'UD', opponent_rank: 'Ex-Campeao', quality_score: 5, quality_label: 'Excelente', note: 'Vitoria sobre ex-campeao' },
        ],
        layoff_warning: 'Cerca de 15 meses sem lutar desde dezembro de 2024. Periodo mais longo de inatividade na carreira UFC.',
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Evloev esta no pico da carreira. Vem de nove vitorias consecutivas no UFC, com o nivel de oposicao subindo a cada luta. A vitoria sobre Aljamain Sterling em dezembro de 2024 consolidou sua posicao como desafiante numero um. O unico ponto de atencao e o layoff de 15 meses.',
      },
      fighter2: {
        nome: 'Lerone Murphy',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1 (cotovelo giratorio)', opponent_rank: 'N/R (ex-Bellator)', quality_score: 2, quality_label: 'Medio', note: 'Nocaute espetacular com cotovelo giratorio no R1. Rendeu Performance da Noite e Nocaute do Ano' },
          { date: 'Abr 2025', opponent: 'Josh Emmett', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R FW', quality_score: 2, quality_label: 'Medio', note: 'Dominou Emmett por 5 rounds no main event com striking superior' },
          { date: 'Out 2024', opponent: 'Dan Ige', result: 'W', method: 'Decisao Unanime', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta equilibrada mas Murphy venceu o terceiro round para selar a decisao 29-28' },
          { date: 'Mai 2024', opponent: 'Edson Barboza', result: 'W', method: 'Decisao Unanime', opponent_rank: '#11 FW', quality_score: 3, quality_label: 'Bom', note: 'Performance completa contra veterano perigoso. Rendeu Luta da Noite' },
          { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria consistente por decisao unanime' },
        ],
        full_fight_history: [
          { date: 'Set 2019', opponent: 'Zubaira Tukhugov', result: 'D', method: 'SD (empate)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC, empate dividido' },
          { date: 'Jul 2020', opponent: 'Ricardo Ramos', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO no R1, Performance da Noite' },
          { date: 'Jan 2021', opponent: 'Douglas Silva de Andrade', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria por decisao unanime' },
          { date: 'Out 2021', opponent: 'Makwan Amirkhani', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute impressionante' },
          { date: 'Mar 2023', opponent: 'Gabriel Santos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Decisao dividida apertada' },
          { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria solida' },
          { date: 'Mai 2024', opponent: 'Edson Barboza', result: 'W', method: 'UD', opponent_rank: '#11 FW', quality_score: 3, quality_label: 'Bom', note: 'Luta da Noite' },
          { date: 'Out 2024', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria na UFC 308' },
          { date: 'Abr 2025', opponent: 'Josh Emmett', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Main event de 5 rounds' },
          { date: 'Ago 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1', opponent_rank: 'N/R (ex-Bellator)', quality_score: 2, quality_label: 'Medio', note: 'Nocaute do Ano, Performance da Noite' },
        ],
        layoff_warning: null,
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Murphy esta numa sequencia espetacular. Nove vitorias consecutivas no UFC desde o empate com Tukhugov, com a ultima sendo o nocaute do ano sobre Aaron Pico. Diferente de Evloev, Murphy vem ativo: tres lutas em menos de 12 meses. Lutando em casa no O2 Arena, o fator psicologico esta a seu favor.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'Evloev',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '9W-0L (100%)',
        contra_top5: '2W-0L',
      },
      fighter2: {
        nome: 'Murphy',
        media_oponentes: 3,
        media_oponentes_label: 'Bom',
        aproveitamento: '9W-0L-1D (95%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Dan Ige e o unico oponente em comum. Evloev dominou completamente (30-26, 30-27, 30-27) enquanto Murphy venceu numa luta mais equilibrada (29-28 unanime). A diferenca de dominio e reveladora.',
    },

    // ===========================
    // Section 5: OPONENTE COMUM
    // ===========================
    oponente_comum: {
      oponente_nome: 'Dan Ige',
      fighter1_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '30-26, 30-27, 30-27',
        duracao: '3 rounds (15:00)',
        contexto: 'Evloev dominou completamente desde o primeiro segundo. Misturou takedowns com striking na distancia, nunca deixou Ige encontrar ritmo, e controlou a luta inteira sem momento de perigo real.',
        performance: 'Performance exemplar. Superioridade em todas as areas: striking, wrestling e controle. Ige nao teve resposta para a pressao constante.',
        evento: 'UFC Fight Night 207',
        data: 'Jun 2022',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: '29-28, 29-28, 29-28',
        duracao: '3 rounds (15:00)',
        contexto: 'Luta muito mais competitiva. Ige venceu o primeiro round e colocou Murphy em situacoes desconfortaveis. Murphy ajustou nos rounds 2 e 3, encontrando o timing no striking para virar.',
        performance: 'Murphy mostrou resiliencia e capacidade de ajuste, mas tambem expos vulnerabilidades. Ige, que nao ofereceu resistencia para Evloev, conseguiu dar trabalho a Murphy.',
        evento: 'UFC 308',
        data: 'Out 2024',
      },
      insight: 'A comparacao e preocupante para Murphy. Contra o mesmo oponente, Evloev dominou de forma avassaladora (30-26 em um placar) enquanto Murphy precisou de ajustes e lutou duro para vencer por 29-28 unanime. Sugere uma diferenca significativa no nivel de controle.',
    },

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.99, valueB: 4.48, maxVal: 6, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.66, valueB: 2.51, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 60, valueB: 61, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 1.65, valueB: 1.41, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 35, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.3, valueB: 0.5, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '32 anos', fighter2: '34 anos', note: 'Evloev 2 anos mais jovem' },
        { label: 'Altura', fighter1: '1,70m (5\'7")', fighter2: '1,75m (5\'9")', note: 'Murphy 2 polegadas mais alto' },
        { label: 'Envergadura', fighter1: '184cm (72.5")', fighter2: '187cm (73.5")', note: 'Murphy com 1 polegada de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Academia', fighter1: 'Dagestan, Russia', fighter2: 'Manchester Top Team, Manchester', note: null },
        { label: 'Estreia UFC', fighter1: 'Abril 2019', fighter2: 'Setembro 2019', note: 'Quase simultaneas' },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Wrestling Ofensivo', valueA: 92, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Evloev e um dos melhores wrestlers do peso-pena. 40 takedowns na carreira UFC.' },
        { label: 'Striking em Pe', valueA: 65, valueB: 82, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Murphy tem mais volume, precisao e poder no striking. 8 KOs na carreira.' },
        { label: 'Defesa de Takedown', valueA: 55, valueB: 58, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Ambos com defesa de takedown na faixa de 43-51%. Area equilibrada.' },
        { label: 'Cardio e Resistencia', valueA: 90, valueB: 80, labelA: 'Excelente', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Evloev nunca desacelerou em nenhuma luta. Pressao incansavel.' },
        { label: 'Poder de Finalizacao', valueA: 45, valueB: 78, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Murphy tem 8 KOs em 17 vitorias. Evloev tem apenas 3 KOs em 19.' },
        { label: 'QI de Luta e Adaptacao', valueA: 88, valueB: 75, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Evloev ajusta o gameplan durante a luta. Murphy tambem se adapta, como visto contra Ige.' },
      ],
      insight: 'Luta classica: o wrestler completo contra o striker dinamico. Evloev domina no wrestling, cardio e QI de luta, enquanto Murphy leva vantagem no striking puro e poder de finalizacao. A chave sera quem impoe o ritmo.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Evloev',
        ko_tko: { count: 3, percent: 16 },
        submission: { count: 4, percent: 21 },
        decision: { count: 12, percent: 63 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Murphy',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 0, percent: 0 },
        decision: { count: 9, percent: 53 },
        total_wins: 17,
      },
      insight: 'Os numeros contam a historia. Evloev e um lutador de decisao por excelencia, com 63% por pontos e zero finalizacoes no UFC. Murphy traz poder real, com quase metade das vitorias por nocaute. Porem, Murphy nunca finalizou ninguem por submissao, o que sugere que no chao Evloev estara em territorio favoravel.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 7,
          danger_label: 'VANTAGEM MURPHY',
          color: 'green',
          title: 'Janela de Oportunidade do Britanico',
          description: 'Se Murphy vai vencer essa luta, os dois primeiros rounds sao a melhor chance. Evloev precisa de tempo para impor o wrestling. Nos rounds iniciais, Murphy esta mais fresco, mais explosivo e mais perigoso. O nocaute de Pico veio no R1. Se Murphy conectar algo grande cedo, pode mudar toda a dinamica.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'ROUND DECISIVO',
          color: 'gold',
          title: 'O Ponto de Virada',
          description: 'O terceiro round e historicamente onde Evloev comeca a assumir controle total. O wrestling acumula dano e fadiga nesse ponto. Para Murphy, manter a defesa de takedown e o volume nesse round e fundamental. Quem vencer o R3 provavelmente define a luta.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM EVLOEV',
          color: 'red',
          title: 'Territorio do Russo',
          description: 'Os championship rounds sao onde Evloev brilha. O cardio dele e impecavel, a pressao nunca para, e o wrestling fica ainda mais efetivo contra um oponente cansado. Murphy nunca lutou 5 rounds contra alguem do nivel de wrestling de Evloev. Se chegar aqui sem nocaute, o russo sera o grande favorito.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Vantagem de Jogar em Casa', fighter: 'Murphy', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Murphy vai lutar no O2 Arena em Londres, a poucos quilometros de Manchester. O publico britanico sera ensurdecedor e totalmente a favor dele. O fator casa no UFC Londres e real.' },
        { icon: 'Clock', title: 'Layoff de 15 Meses', fighter: 'Evloev', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Evloev nao luta desde dezembro de 2024. Sao 15 meses de inatividade, o periodo mais longo de sua carreira no UFC. A ferrugem de cage pode afetar o timing nos primeiros minutos.' },
        { icon: 'Activity', title: 'Ritmo de Atividade', fighter: 'Murphy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Murphy lutou tres vezes em 2024-2025 e esta ativo e afiado. Enquanto Evloev ficou parado, Murphy acumulou experiencia e confianca.' },
        { icon: 'Brain', title: 'Experiencia em 5 Rounds', fighter: 'Evloev', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Evloev nunca lutou 5 rounds no UFC. Todas as 9 lutas foram de 3 rounds. Murphy ja teve experiencia de main event contra Emmett. Essa diferenca pode ser relevante.' },
        { icon: 'Zap', title: 'Poder de Nocaute', fighter: 'Murphy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Murphy tem poder real para encerrar a luta a qualquer momento. O cotovelo giratorio que nocauteou Pico mostrou arsenal diversificado. Evloev nunca enfrentou alguem com o poder de Murphy.' },
        { icon: 'Shield', title: 'Queixo e Durabilidade', fighter: 'Evloev', risk_level: 'POSITIVO', risk_color: 'green', description: 'Evloev nunca foi abalado de forma significativa em 19 lutas. O queixo dele foi testado contra Diego Lopes, um striker perigoso, e ele absorveu tudo sem problemas.' },
        { icon: 'TrendingUp', title: 'Confianca no Pico', fighter: 'Murphy', risk_level: 'POSITIVO', risk_color: 'green', description: 'Murphy vem do nocaute mais espetacular de 2025. A confianca dele esta no teto. Combinado com o apoio da torcida, a performance pode atingir outro nivel.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'Evloev',
        total_probability: 58,
        scenarios: [
          { name: 'Asfixia por Controle', probability: 35, method: 'Decisao Unanime', description: 'Evloev implementa seu gameplan padrao: pressao constante, takedowns nos momentos certos, controle no clinch e contra a grade. Acumula rounds e vence uma decisao unanime clara.' },
          { name: 'Dominio nos Championship Rounds', probability: 15, method: 'Decisao Unanime/Dividida', description: 'Murphy compete bem nos primeiros rounds, mas Evloev assume controle nos R3-R5 quando o cardio e o wrestling pesam. Vence uma decisao mais apertada.' },
          { name: 'Finalizacao Tardia', probability: 8, method: 'Submissao R4-R5', description: 'Cenario mais raro mas possivel. Com Murphy cansado nos rounds finais, Evloev encontra uma submissao durante uma sequencia de grappling.' },
        ],
      },
      fighter2: {
        nome: 'Murphy',
        total_probability: 39,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 15, method: 'KO/TKO R1-R2', description: 'Murphy conecta algo devastador nos primeiros rounds, antes de Evloev impor o wrestling. Um contragolpe preciso, cotovelo giratorio ou joelhada podem encerrar a luta.' },
          { name: 'Volume e Defesa de Takedown', probability: 14, method: 'Decisao Unanime/Dividida', description: 'Murphy consegue manter a luta em pe, defendendo takedowns suficientes e vencendo as trocas. O apoio da torcida ajuda nos momentos de decisao dos juizes.' },
          { name: 'TKO por Acumulo', probability: 10, method: 'TKO R3-R4', description: 'Murphy machuca Evloev no striking e acumula dano. Cortes, inchaco ou dano cumulativo levam a uma interrupcao do arbitro.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Movsar Evloev',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Evloev tem as ferramentas para controlar essa luta. O wrestling dele e de nivel olimpico, o cardio e inesgotavel, e ele transforma rounds inteiros em exercicios de controle. Murphy e perigoso, especialmente nos primeiros rounds e com o apoio da torcida, mas o nivel de oposicao que Evloev ja enfrentou (Sterling, Allen, Lopes) e superior. A defesa de takedown de Murphy fica na faixa dos 51%, e contra o wrestling de Evloev, isso pode nao ser suficiente. Prevejo Evloev controlando os rounds do meio e finais, mas Murphy tem poder real para virar a qualquer momento.',
      x_factor: {
        title: 'O Fator O2 Arena',
        description: 'O publico britanico pode ser o 11o homem de Murphy. O barulho, a energia e a pressao de lutar em casa podem dar ao britanico aquele boost extra que transforma rounds apertados em rounds ganhos.',
      },
      upset_alert: {
        title: 'O Cotovelo que Muda Tudo',
        description: 'Murphy mostrou contra Pico que pode encerrar lutas de forma espetacular com tecnicas nao-convencionais. Se Evloev entrar confiante demais no clinch, um cotovelo ou contragolpe pode acabar com tudo.',
      },
      probabilities: {
        fighter1: { nome: 'Evloev', percent: 58 },
        fighter2: { nome: 'Murphy', percent: 39 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Murphy (+210)', reasoning: 'Com odds de +210, Murphy oferece valor. Invicto, em casa, com poder de nocaute. A linha deveria estar mais perto de +170.' },
        method: { pick: 'Luta vai para decisao', reasoning: 'Com 63% das vitorias de Evloev por decisao e 53% das de Murphy, a probabilidade de ir aos juizes e alta.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Evloev nunca finalizou ninguem no UFC. Murphy tem queixo e experiencia de 5 rounds.' },
        best_value: 'Over 3.5 rounds e a melhor aposta. Evloev favorece lutas longas, e Murphy tem experiencia e queixo para aguentar.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'A Defesa de Takedown de Murphy nos 5 Primeiros Minutos', icon: 'Shield', description: 'Se Murphy defender os takedowns iniciais e manter a luta em pe no R1, a confianca dele vai subir e a dinamica muda. Fique de olho nos sprawls e na capacidade de se levantar.' },
        { num: 2, title: 'O Timing do Wrestling de Evloev', icon: 'Target', description: 'Evloev escolhe os momentos certos para mudar o nivel, geralmente depois de trocas. Se o timing estiver afiado apesar do layoff de 15 meses, Murphy tera problemas.' },
        { num: 3, title: 'O Barulho do O2 Arena', icon: 'MapPin', description: 'Preste atencao em como Murphy reage a energia da torcida. Em momentos de dificuldade, o publico pode reergue-lo. Evloev precisa mostrar frieza num ambiente completamente hostil.' },
        { num: 4, title: 'O Cardio de Murphy nos Championship Rounds', icon: 'Activity', description: 'Murphy ja lutou 5 rounds, mas nunca contra a pressao fisica que Evloev traz. Se o volume de takedowns acumular, o gas nos R4-R5 sera decisivo.' },
        { num: 5, title: 'Tecnicas Nao-Convencionais de Murphy', icon: 'Zap', description: 'O cotovelo giratorio contra Pico nao foi acidente. Fique atento a cotovelos no clinch, joelhadas na entrada de takedown e contragolpes criativos. Uma unica tecnica pode encerrar a luta.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'ELIMINATORIA PELO TITULO', content: 'EVLOEV vs MURPHY\nUFC Londres | 21 de Marco\nO2 Arena\n\n19-0 vs 17-0-1\nAlguem vai perder o zero.\nO vencedor enfrenta Volkanovski.', color: 'red' },
        { slide_number: 2, title: 'EVLOEV: A MAQUINA', content: '#1 do ranking peso-pena\n19-0 na carreira\n9-0 no UFC (todas por decisao)\n40 takedowns no UFC\n6.24 tentativas de TD por 15 min\n81% de controle no clinch/chao\nNunca foi finalizado', color: 'red' },
        { slide_number: 3, title: 'MURPHY: O MILAGRE', content: '#3 do ranking peso-pena\n17-0-1 na carreira\nSobreviveu a um tiro no rosto em 2013\nNocaute do Ano 2025 (cotovelo giratorio)\n47% das vitorias por KO/TKO\n9 vitorias seguidas no UFC\nLuta em casa em Londres', color: 'blue' },
        { slide_number: 4, title: 'O OPONENTE COMUM', content: 'Dan Ige\n\nEvloev: 30-26, 30-27, 30-27\nDominio absoluto em 3 rounds\n\nMurphy: 29-28, 29-28, 29-28\nVitoria apertada por decisao\n\nMesmo oponente. Niveis diferentes.', color: 'gold' },
        { slide_number: 5, title: 'CHAVE DA LUTA', content: 'WRESTLING vs STRIKING\n\nEvloev: 40 TDs no UFC\nMurphy: 51% defesa de TD\n\nSe vai ao chao = Evloev domina\nSe fica em pe = Murphy e letal\n\nR1-R2: territorio Murphy\nR3-R5: territorio Evloev', color: 'gold' },
        { slide_number: 6, title: 'APOSTAS DE VALOR', content: 'MELHOR APOSTA:\nOver 3.5 Rounds (-165)\nEvloev nunca finalizou no UFC\nMurphy nunca foi finalizado\n\nVALOR:\nMurphy ML (+210)\nInvicto, em casa, com poder\n\nARMADILHA:\nEvloev por finalizacao\nNunca aconteceu em 9 lutas UFC', color: 'gold' },
        { slide_number: 7, title: 'PREVISAO', content: 'EVLOEV por Decisao Unanime\n\nConfianca: MEDIA\n58% Evloev / 39% Murphy\n\nO wrestling vai decidir.\nMas o poder de Murphy\npode mudar tudo a qualquer segundo.', color: 'gold' },
      ],
      twitter: [
        { num: '1/8', text: 'Evloev vs Murphy e a luta mais importante do peso-pena em 2026. Dois invictos, eliminatoria pelo titulo, e alguem vai perder o zero no O2 Arena. Thread completa:' },
        { num: '2/8', text: 'Evloev (19-0): 9 vitorias no UFC, TODAS por decisao. 40 takedowns. 6.24 tentativas de TD por 15 min. 81% de controle no clinch. Uma maquina de moer rounds. Mas nunca lutou 5 rounds no UFC.' },
        { num: '3/8', text: 'Murphy (17-0-1): Levou um tiro no rosto em 2013 e hoje e #3 do peso-pena. Nocaute do Ano contra Pico com cotovelo giratorio. 47% das vitorias por KO. 9 vitorias seguidas. Luta EM CASA.' },
        { num: '4/8', text: 'O detalhe que ninguem fala: contra Dan Ige, Evloev dominou 30-26. Murphy venceu 29-28. Mesmo oponente, niveis de dominio completamente diferentes. Essa comparacao diz mais que qualquer estatistica.' },
        { num: '5/8', text: 'A grande incognita: Evloev NUNCA lutou 5 rounds no UFC. Zero main events. Murphy ja fez 5 rounds contra Emmett. Se chegar ao R4-R5 apertado, quem tem mais experiencia nesse territorio?' },
        { num: '6/8', text: 'Apostas de valor: Over 3.5 rounds (-165) e a aposta mais segura. Evloev nunca finalizou no UFC, Murphy nunca foi finalizado. Murphy ML (+210) tem valor se voce acredita no fator casa e no poder.' },
        { num: '7/8', text: 'ARMADILHA: Evloev por finalizacao. Nunca aconteceu em 9 lutas UFC. Todas por decisao. Se voce esta apostando em Evloev por sub ou TKO, esta apostando em algo que nunca aconteceu.' },
        { num: '8/8', text: 'Minha pick: Evloev por decisao unanime, 48-47 ou 49-46. O wrestling controla. Mas Murphy tem o fator X pra virar a qualquer momento. RT se Evloev, Like se Murphy, Comenta se acaba por KO.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Dois invictos. Zero derrotas combinadas. Recorde historico do UFC. E alguem vai perder no sabado. Evloev vs Murphy e a luta mais importante do peso-pena desde Volkanovski vs Topuria.' },
        { time: '10-25s', title: 'Contexto', text: 'Evloev e o #1, maquina de wrestling com 40 takedowns no UFC, 19-0. Murphy e o #3, nocaute do ano com cotovelo giratorio, 17-0-1, luta em casa em Londres. O vencedor enfrenta Volkanovski pelo titulo.' },
        { time: '25-40s', title: 'Analise Tecnica', text: 'A pergunta central: Murphy consegue manter em pe? A defesa de takedown dele e 51%, e contra Evloev que tenta 6 takedowns por 15 minutos, vai ser testada de forma brutal. Contra Dan Ige, Evloev ganhou 30-26. Murphy ganhou 29-28. Mesmo oponente, dominio completamente diferente.' },
        { time: '40-55s', title: 'Championship Rounds', text: 'A grande incognita. Evloev nunca lutou 5 rounds no UFC. Murphy ja fez contra Emmett. Se a luta estiver equilibrada no R3, os championship rounds favorecem quem ja esteve la. Mas o cardio de Evloev e inesgotavel.' },
        { time: '55-70s', title: 'Previsao e Valor', text: 'Minha call: Evloev por decisao unanime. Mas Murphy a +210 tem valor real, invicto, em casa, com poder. Over 3.5 rounds e a aposta mais segura do card. Evloev nunca finalizou, Murphy nunca foi finalizado.' },
        { time: '70-80s', title: 'CTA', text: 'Quem voces acham que vence? Comenta embaixo. Se gostou da analise, segue pra receber a cobertura completa do UFC Londres com todas as 13 lutas do card.' },
      ],
      tiktok: [
        { hook: 'O cara levou um TIRO NO ROSTO e agora e #3 do peso-pena do UFC.', body: 'Lerone Murphy sobreviveu a um tiroteio em Manchester em 2013. Hoje, enfrenta o invicto Movsar Evloev numa eliminatoria pelo titulo em Londres. 17-0-1. Nocaute do Ano 2025. Mas Evloev e uma MAQUINA. 19-0, zero finalizacoes sofridas, 40 takedowns no UFC.', cta: 'Comenta EVLOEV ou MURPHY!' },
        { hook: 'Essa estatistica ASSUSTA sobre o main event de Londres.', body: 'Evloev e Murphy enfrentaram Dan Ige. Evloev ganhou 30-26. TRINTA A VINTE E SEIS. Murphy? 29-28. Luta apertada. Mesmo oponente, dominio completamente diferente. Essa comparacao diz TUDO sobre o que vai acontecer sabado.', cta: 'Segue pra ver minha previsao completa!' },
        { hook: 'O peso-pena do UFC vai ter um novo desafiante no sabado.', body: 'Evloev vs Murphy. Dois invictos. O vencedor enfrenta Volkanovski. Evloev traz 40 takedowns no UFC. Murphy traz o nocaute mais bonito de 2025. E Murphy luta EM CASA no O2 Arena com 20 mil britanicos.', cta: 'Qual e a sua pick? Comenta!' },
        { hook: 'Murphy a +210 e a melhor aposta do card? Eu acho que sim.', body: 'Olha os fatos: Murphy e INVICTO. Luta em CASA em Londres. Tem o Nocaute do Ano 2025. 47% das vitorias por KO. E Evloev esta voltando de 15 MESES sem lutar. Nunca fez 5 rounds. A unica luta de 5 rounds de Murphy foi contra Emmett. Experiencia em championship rounds? Murphy tem. Evloev nao.', cta: 'Concorda ou discorda? Comenta!' },
      ],
      headlines: [
        'Evloev vs Murphy: A Eliminatoria Mais Importante do Peso-Pena em 2026',
        'Invicto vs Invicto: Por Que Londres Pode Produzir o Upset do Ano',
        'O Milagre de Manchester Tenta Destronar a Maquina Russa no O2 Arena',
        'Dan Ige Revela Tudo: A Estatistica Que Separa Evloev e Murphy',
        'UFC Londres: O Fator Casa Pode Decidir a Eliminatoria pelo Titulo?',
        '15 Meses Sem Lutar: A Ferrugem de Evloev Pode Custar o Titulo?',
        'Murphy a +210: Por Que o Azarao Invicto Oferece o Melhor Valor do Card',
      ],
      podcast: [
        {
          timestamp: '0:00-2:00',
          title: 'Abertura: O Contexto Historico',
          talking_points: [
            'Recorde historico do UFC: 36 vitorias combinadas sem derrota (19-0 + 17-0-1). Nunca dois lutadores com esse record se enfrentaram.',
            'A historia de Murphy: sobreviveu a um tiroteio em Manchester em 2013, bala no rosto. Hoje e #3 do mundo. A resiliencia como narrativa central.',
            'Evloev como a maquina silenciosa: nenhum highlight reel, nenhuma finalizacao no UFC, mas 9-0 com dominio absoluto. O lutador mais chato e mais eficiente do peso-pena.',
            'O premio: o vencedor enfrenta Volkanovski pelo titulo. A pressao e real para ambos.',
          ],
          discussion_questions: [
            'Voces acham que a historia de vida de Murphy (o tiroteio) afeta como ele lida com pressao dentro do octogono?',
            'Evloev ser "chato de assistir" e uma vantagem ou desvantagem competitiva?',
          ],
        },
        {
          timestamp: '2:00-5:00',
          title: 'Analise Tecnica: Wrestling vs Striking',
          talking_points: [
            'Os numeros de Evloev no chao: 40 takedowns no UFC, 6.24 tentativas por 15 minutos, 81% de controle no clinch e chao. E top 5 historico do peso-pena em volume de wrestling.',
            'O poder de Murphy: 47% das vitorias por KO/TKO, incluindo o Nocaute do Ano 2025 contra Pico com cotovelo giratorio. Arsenal diversificado e timing elite.',
            'A comparacao Dan Ige: Evloev dominou 30-26, Murphy venceu 29-28. Mesmo oponente, niveis de dominio completamente diferentes. Isso diz mais sobre o matchup do que qualquer outra estatistica.',
            'Defesa de takedown de Murphy: 51%. Contra um wrestler que tenta 6 por luta, esse numero vai ser testado como nunca antes.',
          ],
          discussion_questions: [
            'Se Murphy defender 60% dos takedowns no R1, isso muda a dinamica da luta inteira?',
            'O cotovelo giratorio que nocauteou Pico funciona contra um wrestler que fecha distancia de forma diferente?',
          ],
        },
        {
          timestamp: '5:00-8:00',
          title: 'Fatores Invisiveis e Red Flags',
          talking_points: [
            'O layoff de Evloev: 15 meses sem lutar. O periodo mais longo da carreira dele. Ferrugem e real, especialmente no timing do wrestling.',
            'Atividade de Murphy: 3 lutas em 12 meses, incluindo o nocaute de Pico. Afiado, confiante, no ritmo. A diferenca de atividade e significativa.',
            'O fator 5 rounds: Evloev NUNCA lutou um main event. Todas as 9 lutas UFC foram de 3 rounds. Murphy ja fez 5 rounds contra Emmett. Em caso de luta equilibrada, quem tem experiencia nesse territorio?',
            'O O2 Arena: 20 mil britanicos. O barulho, a energia, a parcialidade. Nos cards de Londres, lutadores britanicos tem historico forte. O fator casa e mensuravel.',
          ],
          discussion_questions: [
            'Voces acham que 15 meses parado afeta mais o striking ou o wrestling de um lutador?',
          ],
        },
        {
          timestamp: '8:00-10:00',
          title: 'Previsao e Apostas de Valor',
          talking_points: [
            'Previsao: Evloev por decisao unanime, 58% de probabilidade. O wrestling vai controlar os rounds do meio e finais. Mas Murphy tem 39% de chance real, especialmente nos primeiros rounds.',
            'Melhor aposta do card: Over 3.5 rounds (-165). Evloev nunca finalizou no UFC (9 decisoes em 9 lutas). Murphy nunca foi finalizado. A convergencia e forte.',
            'Aposta de valor: Murphy ML a +210. Invicto, em casa, com poder genuino, contra um cara voltando de 15 meses parado que nunca fez 5 rounds. A linha deveria estar mais perto de +170.',
            'Armadilha: Evloev por finalizacao. Nunca aconteceu em 9 lutas UFC. Apostar nisso e apostar contra toda a evidencia.',
          ],
          discussion_questions: [
            'Se voces tivessem que apostar UMA coisa nessa luta, qual seria?',
            'Murphy a +210 e valor real ou armadilha emocional por causa do hype?',
          ],
        },
        {
          timestamp: '10:00-12:00',
          title: 'Encerramento e O Que Observar',
          talking_points: [
            'Os 5 momentos decisivos para observar: a primeira tentativa de takedown de Evloev, a defesa de Murphy nos primeiros 2 minutos, o volume de strikes no R2, o cardio de Evloev no R4, e qualquer tecnica nao-convencional de Murphy.',
            'Se Murphy sobreviver o wrestling do R1 e R2 sem perder rounds claros, a dinamica muda completamente pro lado dele nos championship rounds.',
            'Independente do resultado, o vencedor dessa luta vai ser o proximo desafiante ao titulo. Estamos assistindo historia sendo feita no peso-pena.',
          ],
          discussion_questions: [
            'Quem voces querem ver contra Volkanovski: a maquina de wrestling ou o striker com poder de nocaute?',
          ],
        },
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-250',
        fighter2_odds: '+210',
        fighter1_name: 'Movsar Evloev',
        fighter2_name: 'Lerone Murphy',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Dominio no Chao', stat_headline: '40 TAKEDOWNS NO UFC, TOP 5 DA HISTORIA DO PESO-PENA', contexto: 'Evloev e um dos melhores wrestlers ofensivos do peso-pena. Volume de takedowns consistente e implacavel.', implicacao_aposta: 'Favorece Evloev por decisao. Estilo projetado para vencer nos pontos.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Poder de Finalizacao de Murphy', stat_headline: '47% DAS VITORIAS POR KO/TKO, INCLUINDO NOCAUTE DO ANO 2025', contexto: 'Murphy tem poder real e arsenal nao-convencional. O nocaute de Pico prova que ele pode encerrar de qualquer posicao.', implicacao_aposta: 'Mesmo como azarao, Murphy dentro da distancia oferece valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Layoff vs Atividade', stat_headline: 'EVLOEV: 15 MESES SEM LUTAR. MURPHY: 3 LUTAS EM 12 MESES', contexto: 'Diferenca significativa. Murphy ativo e afiado, Evloev voltando de longo periodo parado.', implicacao_aposta: 'Inatividade pode afetar timing nos primeiros rounds.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'BarChart3', titulo: 'Zero Main Events para Evloev', stat_headline: '9 LUTAS NO UFC, TODAS DE 3 ROUNDS', contexto: 'Nunca foi escalado para main event antes. Murphy ja lutou 5 rounds contra Emmett.', implicacao_aposta: 'Area de incerteza sobre o cardio em 5 rounds.', edge_level: 'leve', fighter_side: 'neutral' },
        { icon: 'MapPin', titulo: 'Fator Casa em Londres', stat_headline: 'MURPHY NO O2 ARENA COM 20.000 BRITANICOS', contexto: 'Publico britanico notoriamente barulhento e parcial no UFC Londres.', implicacao_aposta: 'Pode influenciar rounds apertados. Juizes sentem a energia.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-165', confianca: 'alta', edge_vs_mercado: 'Evloev nunca finalizou no UFC. Murphy nunca foi finalizado.', raciocinio: 'Com 63% das vitorias de Evloev por decisao e Murphy nunca tendo sido finalizado, tendencia forte para luta longa.' },
        { tipo: 'Metodo', pick: 'Vai para Decisao', odds: '+110', confianca: 'media', raciocinio: 'Historicamente, lutas de Evloev terminam em decisao. Murphy tambem tem 53% por pontos. Combinacao favorece os juizes.' },
        { tipo: 'Moneyline', pick: 'Murphy (+210)', odds: '+210', confianca: 'baixa', edge_vs_mercado: 'Invicto, em casa, com poder. Linha generosa.', raciocinio: 'Como azarao a +210, Murphy oferece valor. Invicto, em casa, com poder de nocaute. O layoff de Evloev adiciona incerteza.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Evloev por Finalizacao',
        descricao: 'Evloev nunca finalizou ninguem no UFC. Zero KOs, zero submissoes em 9 lutas. Apostar em finalizacao dele e jogar contra toda a evidencia historica.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// ENGLISH VERSION
// ═══════════════════════════════════════════════════════════════
const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Evloev vs Murphy: Undefeated on a Collision Course',
  subtitulo: 'The #1 ranked featherweight faces #3 in a title eliminator in London',
  evento_data: 'March 21, 2026',
  evento_local: 'The O2 Arena, London, United Kingdom',
  categoria_peso: 'Featherweight (145 lbs)',
  fight_prediction: {
    ...analisePT.fight_prediction,
    predictedMethod: 'Unanimous Decision',
    confidence: 'MEDIUM',
  },
  fighter1_info: {
    ...analisePT.fighter1_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Aljamain Sterling', method: 'Unanimous Decision', event: 'UFC 310' },
      { result: 'W', opponent: 'Arnold Allen', method: 'Unanimous Decision', event: 'UFC 297' },
      { result: 'W', opponent: 'Diego Lopes', method: 'Unanimous Decision', event: 'UFC 288' },
    ],
  },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'W', opponent: 'Aaron Pico', method: 'KO R1 (spinning elbow)', event: 'UFC 319' },
      { result: 'W', opponent: 'Josh Emmett', method: 'Unanimous Decision', event: 'UFC on ESPN 65' },
      { result: 'W', opponent: 'Dan Ige', method: 'Unanimous Decision', event: 'UFC 308' },
    ],
  },
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Evloev vs Murphy',
      evento_data: 'March 21, 2026',
      evento_local: 'The O2 Arena, London, United Kingdom',
      categoria_peso: 'Featherweight (145 lbs)',
      num_rounds: 5,
      titulo_em_jogo: null,
      tagline: 'Undefeated on a Collision Course',
      tagline_sub: 'A title eliminator at featherweight with 36 combined wins and zero losses',
      fighter1: {
        nome_completo: 'Movsar Evloev',
        apelido: '',
        sobrenome: 'Evloev',
        record: '19-0-0',
        ranking: '#1 Featherweight',
        info_extra: 'Ingushetia, Russia | 32 years old',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Lerone "The Miracle" Murphy',
        apelido: 'The Miracle',
        sobrenome: 'Murphy',
        record: '17-0-1',
        ranking: '#3 Featherweight',
        info_extra: 'Manchester, England | 34 years old',
        imagem_fullbody_url: null,
      },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Two Perfect Records, One Inevitable Collision</h3>
        <p class="mb-4">
          There are fights that test your level. And then there are fights that define a generation. <strong class="text-ufc-red">Movsar Evloev</strong> versus <strong class="text-blue-400">Lerone Murphy</strong> is the latter. Two men who have never lost as professionals, who climbed the featherweight rankings with brutal consistency, and who now meet in the London main event with the promise of a title shot on the line.
        </p>
        <p class="mb-4">
          Evloev is the machine. The 32-year-old Russian built his undefeated 19-0 record on relentless pressure, elite wrestling, and a unique ability to turn entire rounds into control exercises. It doesn't matter if his opponent is Aljamain Sterling, Arnold Allen, or Diego Lopes. Evloev finds a way to win. All nine of his UFC fights ended in decisions, and that's no coincidence. He doesn't chase highlights; he chases victories.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Manchester Miracle</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Murphy</strong> is a story of resilience that transcends the sport. In 2013, he took a bullet to the face and neck outside a barbershop in Manchester. He survived, recovered, and channeled everything into MMA. Now, at 34 years old, he carries a 17-0-1 record, with his only draw coming in his UFC debut against Zubaira Tukhugov. Since then, nine consecutive wins, including the devastating destruction of Aaron Pico with a spinning elbow in the first round that earned Knockout of the Year.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">What's at Stake</h3>
        <p class="mb-4">
          This isn't just another fight. The winner faces Alexander Volkanovski for the featherweight title. For Evloev, who has already dominated everyone put in front of him, it's the final validation before the belt. For Murphy, fighting at home in the O2 Arena, it's the chance to turn an extraordinary career into something legendary. The British crowd will be deafening, and Murphy knows exactly how to harness that energy.
        </p>
        <p class="mb-4">
          The question everyone wants answered: will Evloev's relentless wrestling smother Murphy's dynamic striking? Or will the Brit find openings to land the shots that have been dropping everyone? Five rounds. No escape. Someone's zero has to go.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#1 Featherweight', fighter2: '#3 Featherweight' },
        { dimensao: 'Streak', fighter1: '19-fight win streak', fighter2: '9-fight win streak' },
        { dimensao: 'Goal', fighter1: 'Featherweight title', fighter2: 'Featherweight title' },
        { dimensao: 'Narrative', fighter1: 'Prove he is the best in the division', fighter2: 'Earn the title shot at home' },
        { dimensao: 'Risk', fighter1: 'First career loss', fighter2: 'First career loss' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'THE MACHINE REACHES THE TOP',
          subtitulo: 'Evloev smothers Murphy with wrestling and pressure for 5 rounds',
          consequencias: [
            { tag: 'TITLE', texto: 'Featherweight title fight against Alexander Volkanovski booked for the second half of 2026' },
            { tag: 'LEGACY', texto: 'Evloev cements himself as the most dangerous featherweight contender at 20-0 with wins over Sterling, Allen, and Murphy' },
            { tag: 'RANKING', texto: 'Murphy drops out of the top 3 but remains a serious threat in the division' },
          ],
          proxima_luta: 'Evloev vs Alexander Volkanovski for the featherweight title',
        },
        fighter2_vence: {
          titulo: 'THE MIRACLE AT HOME',
          subtitulo: 'Murphy knocks out Evloev in front of an erupting O2 Arena',
          consequencias: [
            { tag: 'TITLE', texto: 'Murphy challenges Volkanovski in a potential fight in England, creating a historic event' },
            { tag: 'LEGACY', texto: 'The story of the kid who got shot in Manchester and earned a UFC title shot becomes legend' },
            { tag: 'RANKING', texto: 'Evloev suffers his first loss but stays in the featherweight top 3' },
          ],
          proxima_luta: 'Murphy vs Alexander Volkanovski for the featherweight title',
        },
      },
    },
    momento_atual: {
      fighter1: {
        nome: 'Movsar Evloev',
        color: 'red',
        recent_fights: [
          { date: 'Dec 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'Unanimous Decision', opponent_rank: 'Ex-BW Champion', quality_score: 5, quality_label: 'Excellent', note: 'Controlled the former bantamweight champion with superior wrestling and constant pressure for 3 rounds' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'Unanimous Decision', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Very Good', note: 'Outworked Allen in Toronto with decisive takedowns and positional control' },
          { date: 'May 2023', opponent: 'Diego Lopes', result: 'W', method: 'Unanimous Decision', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Good', note: 'Thrilling fight that earned Fight of the Night bonus against a dangerous striker' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'Unanimous Decision', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Good', note: 'Total domination for 3 rounds with scorecards of 30-26, 30-27, 30-27' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'Unanimous Decision', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Good', note: 'Solid win over a dangerous striker with pressure and takedowns' },
        ],
        full_fight_history: [
          { date: 'Apr 2019', opponent: 'Seung Woo Choi', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut' },
          { date: 'Oct 2019', opponent: 'Enrique Barzola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Second UFC win' },
          { date: 'Jul 2020', opponent: 'Mike Grundy', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Pandemic era win' },
          { date: 'Jan 2021', opponent: 'Nik Lentz', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Close split decision' },
          { date: 'Jun 2021', opponent: 'Hakeem Dawodu', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Good', note: 'First ranked opponent' },
          { date: 'Jun 2022', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Good', note: 'Total domination' },
          { date: 'May 2023', opponent: 'Diego Lopes', result: 'W', method: 'UD', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Good', note: 'Fight of the Night' },
          { date: 'Jan 2024', opponent: 'Arnold Allen', result: 'W', method: 'UD', opponent_rank: '#5 FW', quality_score: 4, quality_label: 'Very Good', note: 'Win over top 5' },
          { date: 'Dec 2024', opponent: 'Aljamain Sterling', result: 'W', method: 'UD', opponent_rank: 'Ex-Champion', quality_score: 5, quality_label: 'Excellent', note: 'Win over former champion' },
        ],
        layoff_warning: 'Approximately 15 months without fighting since December 2024. Longest period of inactivity in his UFC career.',
        momentum_score: 9,
        momentum_label: 'On Fire',
        momentum_trend: 'ascending',
        momentum_note: 'Evloev is at the peak of his career. Coming off nine consecutive UFC wins with the level of opposition rising with each fight. The win over Aljamain Sterling in December 2024 cemented his position as the #1 contender. The only concern is the 15-month layoff.',
      },
      fighter2: {
        nome: 'Lerone Murphy',
        color: 'blue',
        recent_fights: [
          { date: 'Aug 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1 (spinning elbow)', opponent_rank: 'N/R (ex-Bellator)', quality_score: 2, quality_label: 'Average', note: 'Spectacular knockout with a spinning elbow in R1. Earned Performance of the Night and Knockout of the Year' },
          { date: 'Apr 2025', opponent: 'Josh Emmett', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R FW', quality_score: 2, quality_label: 'Average', note: 'Dominated Emmett for 5 rounds in the main event with superior striking' },
          { date: 'Oct 2024', opponent: 'Dan Ige', result: 'W', method: 'Unanimous Decision', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Good', note: 'Competitive fight but Murphy won the third round to seal a 29-28 decision' },
          { date: 'May 2024', opponent: 'Edson Barboza', result: 'W', method: 'Unanimous Decision', opponent_rank: '#11 FW', quality_score: 3, quality_label: 'Good', note: 'Complete performance against a dangerous veteran. Earned Fight of the Night' },
          { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Consistent unanimous decision victory' },
        ],
        full_fight_history: [
          { date: 'Sep 2019', opponent: 'Zubaira Tukhugov', result: 'D', method: 'SD (draw)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut, split draw' },
          { date: 'Jul 2020', opponent: 'Ricardo Ramos', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'R1 TKO, Performance of the Night' },
          { date: 'Jan 2021', opponent: 'Douglas Silva de Andrade', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Unanimous decision win' },
          { date: 'Oct 2021', opponent: 'Makwan Amirkhani', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Impressive knockout' },
          { date: 'Mar 2023', opponent: 'Gabriel Santos', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Close split decision' },
          { date: 'Jul 2023', opponent: 'Joshua Culibao', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Solid win' },
          { date: 'May 2024', opponent: 'Edson Barboza', result: 'W', method: 'UD', opponent_rank: '#11 FW', quality_score: 3, quality_label: 'Good', note: 'Fight of the Night' },
          { date: 'Oct 2024', opponent: 'Dan Ige', result: 'W', method: 'UD', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Good', note: 'UFC 308 win' },
          { date: 'Apr 2025', opponent: 'Josh Emmett', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: '5-round main event' },
          { date: 'Aug 2025', opponent: 'Aaron Pico', result: 'W', method: 'KO R1', opponent_rank: 'N/R (ex-Bellator)', quality_score: 2, quality_label: 'Average', note: 'Knockout of the Year, Performance of the Night' },
        ],
        layoff_warning: null,
        momentum_score: 9,
        momentum_label: 'On Fire',
        momentum_trend: 'ascending',
        momentum_note: 'Murphy is on an incredible streak. Nine consecutive UFC wins since the draw with Tukhugov, with the latest being Knockout of the Year over Aaron Pico. Unlike Evloev, Murphy has been active: three fights in less than 12 months. Fighting at home in the O2 Arena, the psychological edge is in his favor.',
      },
    },
    nivel_competicao: {
      fighter1: {
        nome: 'Evloev',
        media_oponentes: 4,
        media_oponentes_label: 'Very Good',
        aproveitamento: '9W-0L (100%)',
        contra_top5: '2W-0L',
      },
      fighter2: {
        nome: 'Murphy',
        media_oponentes: 3,
        media_oponentes_label: 'Good',
        aproveitamento: '9W-0L-1D (95%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Dan Ige is the only common opponent. Evloev dominated completely (30-26, 30-27, 30-27) while Murphy won in a much closer fight (29-28 unanimous). The gap in dominance is telling.',
    },
    oponente_comum: {
      oponente_nome: 'Dan Ige',
      fighter1_result: {
        resultado: 'Win by Unanimous Decision',
        metodo: '30-26, 30-27, 30-27',
        duracao: '3 rounds (15:00)',
        contexto: 'Evloev dominated from the opening bell. Mixed takedowns with distance striking, never let Ige find his rhythm, and controlled the entire fight without a single moment of real danger.',
        performance: 'Textbook performance. Superiority in every area: striking, wrestling, and control. Ige had no answer for the constant pressure.',
        evento: 'UFC Fight Night 207',
        data: 'Jun 2022',
      },
      fighter2_result: {
        resultado: 'Win by Unanimous Decision',
        metodo: '29-28, 29-28, 29-28',
        duracao: '3 rounds (15:00)',
        contexto: 'A much more competitive fight. Ige won the first round and put Murphy in uncomfortable positions. Murphy adjusted in rounds 2 and 3, finding the timing in his striking to pull ahead.',
        performance: 'Murphy showed resilience and the ability to adjust, but also exposed vulnerabilities. Ige, who offered zero resistance against Evloev, managed to give Murphy real problems.',
        evento: 'UFC 308',
        data: 'Oct 2024',
      },
      insight: 'The comparison is concerning for Murphy. Against the same opponent, Evloev dominated overwhelmingly (30-26 on one scorecard) while Murphy needed adjustments and fought hard to win a 29-28 unanimous decision. It suggests a significant gap in control level.',
    },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 3.99, valueB: 4.48, maxVal: 6, format: 'decimal' },
        { label: 'Striking Accuracy (%)', valueA: 48, valueB: 53, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 2.66, valueB: 2.51, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 60, valueB: 61, maxVal: 100, format: 'percent' },
        { label: 'Takedowns Per 15 Min', valueA: 1.65, valueB: 1.41, maxVal: 4, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 35, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Submissions Per 15 Min', valueA: 0.3, valueB: 0.5, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '32 years old', fighter2: '34 years old', note: 'Evloev 2 years younger' },
        { label: 'Height', fighter1: '5\'7" (1.70m)', fighter2: '5\'9" (1.75m)', note: 'Murphy 2 inches taller' },
        { label: 'Reach', fighter1: '72.5" (184cm)', fighter2: '73.5" (187cm)', note: 'Murphy with 1-inch reach advantage' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
        { label: 'Gym', fighter1: 'Dagestan, Russia', fighter2: 'Manchester Top Team, Manchester', note: null },
        { label: 'UFC Debut', fighter1: 'April 2019', fighter2: 'September 2019', note: 'Nearly simultaneous' },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Offensive Wrestling', valueA: 92, valueB: 60, labelA: 'Excellent', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Evloev is one of the best wrestlers at featherweight. 40 career UFC takedowns.' },
        { label: 'Stand-up Striking', valueA: 65, valueB: 82, labelA: 'Good', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Murphy has more volume, accuracy, and power on the feet. 8 career KOs.' },
        { label: 'Takedown Defense', valueA: 55, valueB: 58, labelA: 'Good', labelB: 'Good', advantage: 'even', advantage_note: 'Both with takedown defense in the 43-51% range. Even playing field.' },
        { label: 'Cardio & Endurance', valueA: 90, valueB: 80, labelA: 'Excellent', labelB: 'Very Good', advantage: 'fighter1', advantage_note: 'Evloev has never slowed down in any fight. Relentless pressure.' },
        { label: 'Finishing Power', valueA: 45, valueB: 78, labelA: 'Average', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Murphy has 8 KOs in 17 wins. Evloev has just 3 KOs in 19.' },
        { label: 'Fight IQ & Adaptation', valueA: 88, valueB: 75, labelA: 'Very Good', labelB: 'Very Good', advantage: 'fighter1', advantage_note: 'Evloev adjusts his gameplan mid-fight. Murphy also adapts, as seen against Ige.' },
      ],
      insight: 'A classic matchup: the complete wrestler vs the dynamic striker. Evloev dominates in wrestling, cardio, and fight IQ, while Murphy holds the advantage in pure striking and finishing power. The key will be who dictates the pace.',
    },
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Evloev',
        ko_tko: { count: 3, percent: 16 },
        submission: { count: 4, percent: 21 },
        decision: { count: 12, percent: 63 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Murphy',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 0, percent: 0 },
        decision: { count: 9, percent: 53 },
        total_wins: 17,
      },
      insight: 'The numbers tell the story. Evloev is the quintessential decision fighter at 63% by points and zero finishes in the UFC. Murphy brings real power, with nearly half his wins by knockout. However, Murphy has never submitted anyone, which suggests that on the ground, Evloev will be in favorable territory.',
    },
    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 7,
          danger_label: 'MURPHY ADVANTAGE',
          color: 'green',
          title: 'The Brit\'s Window of Opportunity',
          description: 'If Murphy is going to win this fight, the first two rounds are his best chance. Evloev needs time to impose his wrestling. In the early rounds, Murphy is fresher, more explosive, and more dangerous. The Pico knockout came in R1. If Murphy lands something big early, it could shift the entire dynamic.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'PIVOTAL ROUND',
          color: 'gold',
          title: 'The Turning Point',
          description: 'Round three is historically where Evloev begins to take full control. The wrestling accumulates damage and fatigue at this point. For Murphy, maintaining his takedown defense and volume in this round is critical. Whoever wins R3 likely defines the fight.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'EVLOEV ADVANTAGE',
          color: 'red',
          title: 'The Russian\'s Territory',
          description: 'The championship rounds are where Evloev shines. His cardio is impeccable, the pressure never stops, and his wrestling becomes even more effective against a tired opponent. Murphy has never fought 5 rounds against someone with Evloev\'s level of wrestling. If it gets here without a knockout, the Russian is the heavy favorite.',
        },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Home Crowd Advantage', fighter: 'Murphy', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Murphy will fight at the O2 Arena in London, just miles from Manchester. The British crowd will be deafening and fully behind him. The home-field factor at UFC London is real.' },
        { icon: 'Clock', title: '15-Month Layoff', fighter: 'Evloev', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Evloev hasn\'t fought since December 2024. That\'s 15 months of inactivity, the longest stretch of his UFC career. Cage rust could affect his timing in the opening minutes.' },
        { icon: 'Activity', title: 'Activity Level', fighter: 'Murphy', risk_level: 'POSITIVE', risk_color: 'green', description: 'Murphy fought three times in 2024-2025 and is active and sharp. While Evloev was on the shelf, Murphy was accumulating experience and confidence.' },
        { icon: 'Brain', title: '5-Round Experience', fighter: 'Evloev', risk_level: 'LOW RISK', risk_color: 'yellow', description: 'Evloev has never fought 5 rounds in the UFC. All 9 fights were 3-rounders. Murphy already has main event experience against Emmett. This difference could matter.' },
        { icon: 'Zap', title: 'Knockout Power', fighter: 'Murphy', risk_level: 'POSITIVE', risk_color: 'green', description: 'Murphy has real power to end the fight at any moment. The spinning elbow that knocked out Pico showed a diverse arsenal. Evloev has never faced anyone with Murphy\'s power.' },
        { icon: 'Shield', title: 'Chin & Durability', fighter: 'Evloev', risk_level: 'POSITIVE', risk_color: 'green', description: 'Evloev has never been significantly hurt in 19 fights. His chin was tested against Diego Lopes, a dangerous striker, and he absorbed everything without issue.' },
        { icon: 'TrendingUp', title: 'Peak Confidence', fighter: 'Murphy', risk_level: 'POSITIVE', risk_color: 'green', description: 'Murphy is coming off the most spectacular knockout of 2025. His confidence is through the roof. Combined with the home crowd support, his performance could reach another level.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Evloev',
        total_probability: 58,
        scenarios: [
          { name: 'Smothered by Control', probability: 35, method: 'Unanimous Decision', description: 'Evloev implements his standard gameplan: constant pressure, well-timed takedowns, clinch control against the cage. He accumulates rounds and wins a clear unanimous decision.' },
          { name: 'Championship Round Takeover', probability: 15, method: 'Unanimous/Split Decision', description: 'Murphy competes well in the early rounds, but Evloev takes over in R3-R5 when his cardio and wrestling take their toll. Wins a tighter decision.' },
          { name: 'Late Submission', probability: 8, method: 'Submission R4-R5', description: 'Rarer scenario but possible. With a tired Murphy in the later rounds, Evloev finds a submission during a grappling sequence.' },
        ],
      },
      fighter2: {
        nome: 'Murphy',
        total_probability: 39,
        scenarios: [
          { name: 'Lightning Strike Knockout', probability: 15, method: 'KO/TKO R1-R2', description: 'Murphy lands something devastating in the early rounds before Evloev can impose his wrestling. A precise counter, spinning elbow, or knee could end it.' },
          { name: 'Volume & Takedown Defense', probability: 14, method: 'Unanimous/Split Decision', description: 'Murphy keeps the fight standing, defending enough takedowns and winning the exchanges. The crowd support helps in close rounds with the judges.' },
          { name: 'TKO by Accumulation', probability: 10, method: 'TKO R3-R4', description: 'Murphy hurts Evloev on the feet and accumulates damage. Cuts, swelling, or cumulative damage leads to a referee stoppage.' },
        ],
      },
    },
    previsao_final: {
      winner_name: 'Movsar Evloev',
      winner_side: 'fighter1',
      predicted_method: 'Unanimous Decision',
      confidence_score: 6,
      confidence_label: 'MEDIUM',
      explanation: 'Evloev has the tools to control this fight. His wrestling is Olympic-level, his cardio is endless, and he turns entire rounds into control exercises. Murphy is dangerous, especially in the early rounds and with the crowd behind him, but the level of opposition Evloev has already faced (Sterling, Allen, Lopes) is superior. Murphy\'s takedown defense sits around 51%, and against Evloev\'s wrestling, that might not be enough. I see Evloev controlling the middle and late rounds, but Murphy has real power to flip the script at any moment.',
      x_factor: {
        title: 'The O2 Arena Factor',
        description: 'The British crowd could be Murphy\'s 11th man. The noise, the energy, and the pressure of fighting at home could give the Brit that extra boost that turns close rounds into winning rounds.',
      },
      upset_alert: {
        title: 'The Elbow That Changes Everything',
        description: 'Murphy showed against Pico that he can end fights spectacularly with unconventional techniques. If Evloev gets too comfortable in the clinch, an elbow or counter could end everything.',
      },
      probabilities: {
        fighter1: { nome: 'Evloev', percent: 58 },
        fighter2: { nome: 'Murphy', percent: 39 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Murphy (+210)', reasoning: 'At +210 odds, Murphy offers value. Undefeated, at home, with knockout power. The line should be closer to +170.' },
        method: { pick: 'Fight goes to decision', reasoning: 'With 63% of Evloev\'s wins by decision and 53% of Murphy\'s, the probability of going to the judges is high.' },
        over_under: { pick: 'Over 3.5 rounds', rounds: 3.5, reasoning: 'Evloev has never finished anyone in the UFC. Murphy has the chin and 5-round experience to go the distance.' },
        best_value: 'Over 3.5 rounds is the best bet. Evloev favors long fights, and Murphy has the experience and chin to survive.',
      },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'Murphy\'s Takedown Defense in the First 5 Minutes', icon: 'Shield', description: 'If Murphy stuffs the early takedowns and keeps the fight standing in R1, his confidence will soar and the dynamic shifts. Watch for his sprawls and ability to get back to his feet.' },
        { num: 2, title: 'Evloev\'s Wrestling Timing', icon: 'Target', description: 'Evloev picks the right moments to shoot, usually after exchanges. If his timing is sharp despite the 15-month layoff, Murphy will have problems.' },
        { num: 3, title: 'The O2 Arena Noise', icon: 'MapPin', description: 'Pay attention to how Murphy feeds off the crowd energy. In tough moments, the fans could lift him back up. Evloev needs to show composure in a completely hostile environment.' },
        { num: 4, title: 'Murphy\'s Cardio in the Championship Rounds', icon: 'Activity', description: 'Murphy has fought 5 rounds before, but never against the physical pressure Evloev brings. If the takedown volume accumulates, his gas tank in R4-R5 will be decisive.' },
        { num: 5, title: 'Murphy\'s Unconventional Techniques', icon: 'Zap', description: 'The spinning elbow against Pico was no accident. Watch for elbows in the clinch, knees on takedown entries, and creative counters. A single technique could end the fight.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'TITLE ELIMINATOR', content: 'EVLOEV vs MURPHY\nUFC London | March 21\nO2 Arena\n\n19-0 vs 17-0-1\nSomeone\'s zero has to go.', color: 'red' },
        { slide_number: 2, title: 'EVLOEV: THE MACHINE', content: '#1 ranked featherweight\n19-0 career record\n9-0 in UFC (all by decision)\n40 UFC takedowns\nNever been finished', color: 'red' },
        { slide_number: 3, title: 'MURPHY: THE MIRACLE', content: '#3 ranked featherweight\n17-0-1 career record\nSurvived getting shot in the face in 2013\n2025 Knockout of the Year\nFighting at home in London', color: 'blue' },
        { slide_number: 4, title: 'THE COMMON OPPONENT', content: 'Dan Ige\n\nEvloev: 30-26, 30-27, 30-27\nAbsolute domination\n\nMurphy: 29-28, 29-28, 29-28\nTight win\n\nThe difference says it all.', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'EVLOEV by Unanimous Decision\n\nConfidence: MEDIUM\n58% Evloev / 39% Murphy\n\nBut watch out for the home crowd\nand Murphy\'s power.', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Evloev vs Murphy is the most important featherweight fight of 2026. Two undefeated killers, a title eliminator, and someone\'s losing their zero at the O2 Arena. Thread:' },
        { num: '2/5', text: 'Evloev (19-0): 9 UFC wins, ALL by decision. 40 takedowns. Never been finished. A round-grinding machine. But he\'s never fought 5 rounds in the UFC.' },
        { num: '3/5', text: 'Murphy (17-0-1): Got SHOT IN THE FACE in 2013 and now he\'s #3 at featherweight. KO of the Year against Pico with a spinning elbow. Fighting at home. The crowd will be INSANE.' },
        { num: '4/5', text: 'The detail nobody talks about: Against Dan Ige, Evloev dominated 30-26. Murphy won 29-28. Same opponent, completely different levels of dominance.' },
        { num: '5/5', text: 'My pick: Evloev by decision, but with caveats. Murphy has the power to end it at any moment. Over 3.5 rounds is the best bet.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Two undefeated fighters. Zero combined losses. And someone\'s getting their first L on Saturday. Evloev vs Murphy is the biggest featherweight fight since Volkanovski vs Topuria.' },
        { time: '10-25s', title: 'Context', text: 'Evloev is #1, a wrestling machine, 19-0. Murphy is #3, Knockout of the Year, fighting at home in London. The winner faces Volkanovski for the title.' },
        { time: '25-40s', title: 'Analysis', text: 'Can Murphy keep it standing? If yes, he has the power to finish it. If not, Evloev will grind him out. Against Dan Ige, Evloev won 30-26. Murphy won 29-28.' },
        { time: '40-55s', title: 'Prediction', text: 'My call: Evloev by unanimous decision, but Murphy has every tool for the upset. The home crowd, the power, the confidence. Don\'t sleep on this.' },
        { time: '55-65s', title: 'CTA', text: 'Who do you think wins? Drop a comment and follow for more UFC London breakdowns.' },
      ],
      tiktok: [
        { hook: 'This guy took a BULLET TO THE FACE and now he\'s the #3 featherweight in the UFC.', body: 'Lerone Murphy survived a shooting in Manchester in 2013. Now he faces undefeated Movsar Evloev in a title eliminator in London. 17-0-1. Knockout of the Year 2025. But Evloev is a MACHINE. 19-0, zero finishes against him.', cta: 'Comment EVLOEV or MURPHY!' },
        { hook: 'This stat is TERRIFYING about the UFC London main event.', body: 'Evloev and Murphy both fought Dan Ige. Evloev won 30-26. THIRTY TO TWENTY-SIX. Murphy? 29-28. Close fight. Same opponent, completely different levels of dominance.', cta: 'Follow for the full breakdown!' },
        { hook: 'The featherweight division gets a new #1 contender on Saturday.', body: 'Evloev vs Murphy. Two undefeated warriors. The winner faces Volkanovski. Evloev brings 40 UFC takedowns. Murphy brings the most beautiful knockout of 2025. And Murphy fights AT HOME in the O2 Arena.', cta: 'What\'s your pick? Drop it in the comments!' },
      ],
      headlines: [
        'Evloev vs Murphy: The Most Important Featherweight Eliminator of 2026',
        'Undefeated vs Undefeated: Why London Could Produce the Upset of the Year',
        'The Manchester Miracle Tries to Dethrone the Russian Machine at the O2 Arena',
        'Dan Ige Reveals Everything: The Stat That Separates Evloev and Murphy',
        'UFC London: Can the Home Crowd Factor Decide the Title Eliminator?',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: {
        fighter1_odds: '-250',
        fighter2_odds: '+210',
        fighter1_name: 'Movsar Evloev',
        fighter2_name: 'Lerone Murphy',
        source: 'Average across sportsbooks (March 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Ground Dominance', stat_headline: '40 UFC TAKEDOWNS, TOP 5 IN FEATHERWEIGHT HISTORY', contexto: 'Evloev is one of the best offensive wrestlers at featherweight. Consistent, relentless takedown volume.', implicacao_aposta: 'Favors Evloev by decision. His style is built to win on the scorecards.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Murphy\'s Finishing Power', stat_headline: '47% OF WINS BY KO/TKO, INCLUDING 2025 KNOCKOUT OF THE YEAR', contexto: 'Murphy has real power and an unconventional arsenal. The Pico knockout proves he can finish from any position.', implicacao_aposta: 'Even as the underdog, Murphy inside the distance offers value.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Layoff vs Activity', stat_headline: 'EVLOEV: 15 MONTHS WITHOUT FIGHTING. MURPHY: 3 FIGHTS IN 12 MONTHS', contexto: 'Significant difference. Murphy is active and sharp, Evloev returning from a long layoff.', implicacao_aposta: 'Inactivity could affect timing in the early rounds.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'BarChart3', titulo: 'Zero Main Events for Evloev', stat_headline: '9 UFC FIGHTS, ALL 3-ROUNDERS', contexto: 'Never been scheduled for a main event before. Murphy already fought 5 rounds against Emmett.', implicacao_aposta: 'Unknown territory regarding 5-round cardio.', edge_level: 'leve', fighter_side: 'neutral' },
        { icon: 'MapPin', titulo: 'Home Crowd Factor in London', stat_headline: 'MURPHY AT THE O2 ARENA WITH 20,000 BRITS', contexto: 'British crowds are notoriously loud and partial at UFC London events.', implicacao_aposta: 'Could influence close rounds. Judges feel the energy.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-165', confianca: 'alta', edge_vs_mercado: 'Evloev has never finished anyone in the UFC. Murphy has never been finished.', raciocinio: 'With 63% of Evloev\'s wins by decision and Murphy never having been finished, there\'s a strong trend toward a long fight.' },
        { tipo: 'Method', pick: 'Goes to Decision', odds: '+110', confianca: 'media', raciocinio: 'Historically, Evloev\'s fights end in decisions. Murphy also has 53% by points. The combination favors the judges.' },
        { tipo: 'Moneyline', pick: 'Murphy (+210)', odds: '+210', confianca: 'baixa', edge_vs_mercado: 'Undefeated, at home, with power. Generous line.', raciocinio: 'As an underdog at +210, Murphy offers value. Undefeated, at home, with knockout power. Evloev\'s layoff adds uncertainty.' },
      ],
      armadilha: {
        titulo: 'Trap: Evloev by Finish',
        descricao: 'Evloev has never finished anyone in the UFC. Zero KOs, zero submissions in 9 fights. Betting on him to finish is going against all historical evidence.',
      },
      disclaimer: 'Statistical analysis for informational purposes. Gamble responsibly.',
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'pt') as Lang;
  const analise = lang === 'en' ? analiseEN : analisePT;
  return <FullAnalysisView analise={analise} lang={lang} />;
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
