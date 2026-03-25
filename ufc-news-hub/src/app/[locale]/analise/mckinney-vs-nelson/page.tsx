'use client';

import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';


const analisePT: FullSingleAnalise = {
  id: 'mckinney-vs-nelson',
  evento_id: null,
  slug: 'mckinney-vs-nelson',
  titulo: 'McKinney vs Nelson: Bomba Relogio no Peso-Leve',
  subtitulo: 'O finalizador mais explosivo do UFC enfrenta o canadense duravel em Seattle',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,78m', envergadura: '187cm', idade: 31, academia: 'Fusion X-Cel' },
      fighter2: { altura: '1,80m', envergadura: '180cm', idade: 34, academia: 'House of Champions' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'TKO R1',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Terrance McKinney',
    record: '17-8-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Chris Duncan', method: 'Sub R1 (anaconda choke)', event: 'UFC 323' },
      { result: 'W', opponent: 'Viacheslav Borshchev', method: 'Sub R1 (guillotine)', event: 'UFC 317' },
      { result: 'W', opponent: 'Damir Hadzovic', method: 'TKO R1', event: 'UFC Fight Night 250' },
    ],
  },
  fighter2_info: {
    nome: 'Kyle Nelson',
    record: '17-6-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Matt Frevola', method: 'Decisao Unanime', event: 'UFC Fight Night 262' },
      { result: 'L', opponent: 'Steve Garcia', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Bill Algeo', method: 'TKO R1', event: 'UFC on ESPN 54' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de Marco, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso-Leve (155 lbs)',
  num_rounds: 3,
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
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso-Leve (155 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Bomba Relogio no Peso-Leve',
      tagline_sub: '25 lutas, 25 finalizacoes. T.Wrecks nunca foi a decisao na vida.',
      fighter1: {
        nome_completo: 'Terrance "T.Wrecks" McKinney',
        apelido: 'T.Wrecks',
        sobrenome: 'McKinney',
        record: '17-8-0',
        ranking: 'N/R Peso-Leve',
        info_extra: 'Spokane, Washington | 31 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/MCKINNEY_TERRANCE_L_12-06.png?itok=JYl1VRcp',
      },
      fighter2: {
        nome_completo: 'Kyle "The Monster" Nelson',
        apelido: 'The Monster',
        sobrenome: 'Nelson',
        record: '17-6-1',
        ranking: 'N/R Peso-Leve',
        info_extra: 'Ontario, Canada | 34 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/NELSON_KYLE_L_10-18.png?itok=K1REGeZG',
      },
    },

    // ===========================
    // Section 2: NARRATIVA
    // ===========================
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Homem que Nunca Ouviu os Juizes</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Terrance McKinney</strong> tem uma das estatisticas mais absurdas do UFC moderno: 25 lutas profissionais, 25 finalizacoes. Ele nunca, em toda a carreira, ouviu um placar de juiz. Nem como vencedor, nem como perdedor. Cada luta dele termina com alguem no chao, e geralmente em menos de um round. O cara tem sete vitorias em menos de 60 segundos. Deteve o recorde de nocaute mais rapido da historia do peso-leve do UFC (7 segundos contra Frevola). Se voce pisca, perdeu.
        </p>
        <p class="mb-4">
          O problema? Essa mesma explosividade que faz dele um highlight ambulante tambem o torna vulneravel. McKinney ja foi finalizado cinco vezes no UFC, sempre quando a agressividade vira descuido. Drew Dober, Ismael Bonfim, Nazim Sadykhov, Esteban Ribovics, Chris Duncan. Todos acharam a brecha na armadura. O record de 7-5 no UFC conta uma historia de volatilidade pura: cada luta e uma moeda jogada pro alto, e o resultado sai rapido.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Canadense Que Se Reinventou</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Kyle Nelson</strong> nao tem o mesmo brilho. Comecou sua jornada no UFC com um TKO contra Carlos Diego Ferreira em 2018 (derrota) e precisou de tempo para se encontrar. Passou por altos e baixos no peso-pena antes de tomar a decisao inteligente de subir para o peso-leve, onde parece mais confortavel. A vitoria por decisao unanime contra Matt Frevola em outubro de 2025 mostrou um Nelson mais maduro, mais paciente e mais perigoso na distancia.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Seattle Vai Ser Palco de Caos</h3>
        <p class="mb-4">
          McKinney volta ao noroeste dos EUA, perto de sua terra natal Spokane. Mas vem de uma derrota por anaconda choke contra Chris Duncan em dezembro. Nelson vem de uma vitoria solida. O canadense sabe que precisa sobreviver os primeiros minutos, porque se McKinney nao te finaliza rapido, a luta comeca a escorregar das maos dele. E exatamente ai que Nelson pode ser perigoso.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking, buscando relevancia', fighter2: 'Sem ranking, buscando sequencia' },
        { dimensao: 'Objetivo', fighter1: 'Sequencia de vitorias e top 15', fighter2: 'Consolidar-se no peso-leve' },
        { dimensao: 'Narrativa', fighter1: 'Provar que consegue ser consistente', fighter2: 'Mostrar que o peso-leve e seu lugar' },
        { dimensao: 'Risco', fighter1: 'Terceira derrota em quatro lutas', fighter2: 'Derrota rapida contra finalizador explosivo' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'T.WRECKS DESTROI EM CASA',
          subtitulo: 'McKinney finaliza Nelson em menos de um round diante do publico de Seattle',
          consequencias: [
            { tag: 'MOMENTUM', texto: 'McKinney recupera confianca e emenda duas vitorias consecutivas, recolocando-se na conversa do peso-leve' },
            { tag: 'RANKING', texto: 'Com tres vitorias nas ultimas quatro, McKinney pode entrar no top 15 com mais uma vitoria significativa' },
            { tag: 'NARRATIVA', texto: 'A historia do lutador mais explosivo do peso-leve ganha mais um capitulo de highlight reel' },
          ],
          proxima_luta: 'McKinney vs oponente ranqueado no top 15 do peso-leve',
        },
        fighter2_vence: {
          titulo: 'O MONSTER SILENCIA SEATTLE',
          subtitulo: 'Nelson sobrevive a tempestade inicial e finaliza McKinney quando a agressividade vira descuido',
          consequencias: [
            { tag: 'ASCENSAO', texto: 'Nelson prova que pertence ao peso-leve com uma vitoria significativa sobre nome conhecido' },
            { tag: 'SEQUENCIA', texto: 'Duas vitorias consecutivas no peso-leve posicionam Nelson para oponentes ranqueados' },
            { tag: 'NARRATIVA', texto: 'A reinvencao do veterano canadense ganha credibilidade real' },
          ],
          proxima_luta: 'Nelson vs gatekeeper ranqueado no peso-leve',
        },
      },
    },

    // ===========================
    // Section 3: MOMENTO ATUAL
    // ===========================
    momento_atual: {
      fighter1: {
        nome: 'Terrance McKinney',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado por anaconda choke aos 2:30 do R1. Duncan capitalizou na agressividade excessiva de McKinney.' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizou com guilhotina montada em apenas 55 segundos. Dominio absoluto desde o primeiro segundo.' },
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1 (socos)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Parou Hadzovic com ground and pound aos 2:01 do R1. Mais uma finalizacao rapida.' },
          { date: 'Mai 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1 (head kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado com chute na cabeca no inicio do R1. Exposicao da vulnerabilidade defensiva.' },
          { date: 'Out 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizou em apenas 20 segundos. Mais um highlight instantaneo.' },
        ],
        full_fight_history: [
          { date: 'Jun 2021', opponent: 'Matt Frevola', result: 'W', method: 'KO R1 (0:07)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC com o KO mais rapido da historia do peso-leve' },
          { date: 'Nov 2021', opponent: 'Fares Ziam', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizou com mata-leao no R1' },
          { date: 'Mar 2022', opponent: 'Drew Dober', result: 'L', method: 'TKO R1', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bom', note: 'Primeiro teste real, primeira derrota no UFC' },
          { date: 'Jan 2023', opponent: 'Ismael Bonfim', result: 'L', method: 'KO R2 (joelhada voadora)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado por joelhada voadora no R2' },
          { date: 'Jul 2023', opponent: 'Nazim Sadykhov', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado no R2 por mata-leao' },
          { date: 'Ago 2023', opponent: 'Mike Breeden', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria rapida por TKO' },
          { date: 'Out 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizou em 20 segundos' },
          { date: 'Mai 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado por head kick' },
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'TKO por ground and pound' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Guilhotina montada em 55 segundos' },
          { date: 'Dez 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizado por anaconda choke' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'resilient',
        momentum_note: 'McKinney e a definicao de montanha-russa. Venceu Hadzovic e Borshchev de forma impressionante, mas perdeu para Duncan logo em seguida. O padrao se repete: vitorias explosivas seguidas de derrotas por descuido. Nao da para confiar na consistencia, mas o potencial explosivo esta sempre presente.',
      },
      fighter2: {
        nome: 'Kyle Nelson',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Matt Frevola', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira luta no peso-leve. Vitoria solida por decisao unanime contra veterano duravel. Mostrou paciencia e adaptacao.' },
          { date: 'Set 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1 (cotoveladas e socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parado no primeiro round por cotoveladas e socos. Substituiu Calvin Kattar em cima da hora.' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute tecnico no primeiro round contra Algeo. Finalizacao rapida e eficiente.' },
          { date: 'Set 2023', opponent: 'Fernando Padilla', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria consistente por decisao unanime. Trabalho completo por 3 rounds.' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao unanime no UFC 289. Performance solida.' },
        ],
        full_fight_history: [
          { date: 'Dez 2018', opponent: 'Carlos Diego Ferreira', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Estreia no UFC, derrota para lutador experiente' },
          { date: 'Set 2019', opponent: 'Marco Polo Reyes', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primeira vitoria no UFC' },
          { date: 'Set 2020', opponent: 'Billy Quarantillo', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no terceiro round' },
          { date: 'Jul 2022', opponent: 'Jai Herbert', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota por decisao unanime' },
          { date: 'Fev 2023', opponent: 'Choi Doo-ho', result: 'D', method: 'Empate Majoritario', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate majoritario em luta equilibrada' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria por decisao' },
          { date: 'Set 2023', opponent: 'Fernando Padilla', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria consistente' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute tecnico rapido' },
          { date: 'Set 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parado no R1 em luta de ultima hora' },
          { date: 'Out 2025', opponent: 'Matt Frevola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no peso-leve, vitoria por decisao' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'Em Ascensao',
        momentum_trend: 'ascending',
        momentum_note: 'Nelson vem de uma vitoria importante na estreia do peso-leve contra Frevola. Depois de anos oscilando no peso-pena, a mudanca de categoria parece ter dado nova vida a sua carreira. A derrota para Garcia foi em luta aceita de ultima hora, entao o contexto ameniza. Duas vitorias nas ultimas tres lutas, com a mais recente sendo a mais madura da carreira.',
      },
    },

    // ===========================
    // Section 4: NIVEL DE COMPETICAO
    // ===========================
    nivel_competicao: {
      fighter1: {
        nome: 'McKinney',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '7W-5L (58%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Nelson',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '5W-5L-1D (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Matt Frevola e o oponente em comum. McKinney o nocauteou em 7 segundos na estreia do UFC (2021). Nelson o derrotou por decisao unanime em outubro de 2025. Abordagens completamente diferentes contra o mesmo oponente revelam os estilos contrastantes dos dois.',
    },

    // ===========================
    // Section 5: OPONENTE COMUM
    // ===========================
    oponente_comum: {
      oponente_nome: 'Matt Frevola',
      fighter1_result: {
        resultado: 'Vitoria por KO',
        metodo: 'KO R1 (0:07)',
        duracao: '7 segundos',
        contexto: 'McKinney entrou como substituto de ultima hora e destruiu Frevola com um blitz imediato. Sete segundos. O KO mais rapido da historia do peso-leve do UFC. Frevola nem teve tempo de reagir.',
        performance: 'Performance iconica. Definiu McKinney como uma forca da natureza no peso-leve. O tipo de finalizacao que vira lenda. Porem, aconteceu em 2021, e McKinney desde entao mostrou que a mesma agressividade pode ser uma faca de dois gumes.',
        evento: 'UFC 263',
        data: 'Jun 2021',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: 'Decisao Unanime (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Nelson fez sua estreia no peso-leve e trabalhou Frevola por tres rounds completos. Usou jab, controle de distancia e inteligencia tatica para vencer de forma clara. Sem pressa, sem risco desnecessario.',
        performance: 'Performance madura que contrastou com o estilo de Nelson no peso-pena. Mostrou que a mudanca de categoria trouxe mais paciencia e controle. Nao foi emocionante, mas foi eficiente.',
        evento: 'UFC Fight Night 262',
        data: 'Out 2025',
      },
      insight: 'Dois estilos completamente opostos contra o mesmo oponente. McKinney destruiu Frevola em 7 segundos com violencia pura. Nelson o derrotou em 15 minutos com paciencia e tecnica. Essa comparacao resume perfeitamente o que esperar dessa luta: explosao contra consistencia, risco contra controle.',
    },

    // ===========================
    // Section 6: COMPARACAO ESTATISTICA
    // ===========================
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 6.96, valueB: 3.51, maxVal: 8, format: 'decimal', note: 'McKinney tem o 4o maior SLpM da historia do peso-leve' },
        { label: 'Precisao de Strikes (%)', valueA: 48, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.46, valueB: 4.20, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Estimativa baseada em dados disponiveis para Nelson' },
        { label: 'Defesa de Strikes (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 2.50, valueB: 1.06, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 50, valueB: 20, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 68, valueB: 73, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '31 anos', fighter2: '34 anos', note: 'McKinney 3 anos mais jovem' },
        { label: 'Altura', fighter1: '1,78m (5\'10")', fighter2: '1,80m (5\'11")', note: 'Nelson 1 polegada mais alto' },
        { label: 'Envergadura', fighter1: '187cm (73.5")', fighter2: '180cm (71")', note: 'McKinney com 2.5 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Switch', fighter2: 'Switch', note: 'Ambos lutam em switch stance' },
        { label: 'Academia', fighter1: 'Fusion X-Cel, Orlando, FL', fighter2: 'House of Champions, Ontario, CA', note: null },
      ],
    },

    // ===========================
    // Section 7: PERFIL DE HABILIDADES
    // ===========================
    perfil_habilidades: {
      skills: [
        { label: 'Explosividade e Velocidade', valueA: 92, valueB: 55, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney e um dos lutadores mais explosivos do UFC. Sete finalizacoes em menos de 60 segundos.' },
        { label: 'Volume de Striking', valueA: 85, valueB: 55, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'McKinney tem 6.96 sig. strikes por minuto, quase o dobro de Nelson (3.51).' },
        { label: 'Defesa e Disciplina', valueA: 35, valueB: 58, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'McKinney tem apenas 43% de defesa de strikes. Nelson e mais disciplinado com 51%.' },
        { label: 'Wrestling Ofensivo', valueA: 70, valueB: 40, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'McKinney com 50% de precisao em takedowns, muito superior aos 20% de Nelson.' },
        { label: 'Resistencia e Cardio', valueA: 40, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'McKinney nunca foi a decisao. Nelson tem 7 vitorias por decisao e experiencia em 3 rounds completos.' },
        { label: 'Jogo de Chao (Grappling)', valueA: 72, valueB: 45, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'McKinney tem 9 submissoes na carreira. Nelson tem 4. Vantagem clara no grappling.' },
      ],
      insight: 'Esse matchup e velocidade contra durabilidade. McKinney domina em explosividade, volume de strikes e grappling ofensivo. Nelson leva vantagem em disciplina defensiva e resistencia. Se a luta for rapida, e de McKinney. Se Nelson sobreviver os primeiros minutos e forcar uma luta longa, o jogo muda completamente.',
    },

    // ===========================
    // Section 8: DISTRIBUICAO DE VITORIAS
    // ===========================
    distribuicao_vitorias: {
      fighter1: {
        nome: 'McKinney',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 9, percent: 53 },
        decision: { count: 0, percent: 0 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'Nelson',
        ko_tko: { count: 6, percent: 35 },
        submission: { count: 4, percent: 24 },
        decision: { count: 7, percent: 41 },
        total_wins: 17,
      },
      insight: 'O contraste nao poderia ser maior. McKinney tem ZERO vitorias por decisao em toda a carreira. Cada uma das 17 vitorias dele veio por finalizacao, divididas quase igualmente entre nocautes (8) e submissoes (9). Nelson e muito mais equilibrado, com 41% por decisao. Isso confirma que McKinney sempre busca o fim rapido, enquanto Nelson pode se adaptar a lutas longas.',
    },

    // ===========================
    // Section 9: DANGER ZONES
    // ===========================
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VANTAGEM McKINNEY',
          color: 'red',
          title: 'Territorio de Destruicao',
          description: 'O primeiro round e onde McKinney vive. Sete finalizacoes em menos de um minuto. O record de 7 segundos contra Frevola. Se Nelson nao estiver 100% ligado desde o primeiro segundo, a luta pode acabar antes dele ter tempo de respirar. McKinney vai entrar como um touro e buscar o KO ou o takedown imediato. Nelson precisa sobreviver essa tempestade a todo custo.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Ponto de Inflexao',
          description: 'Se Nelson sobreviver o primeiro round, a dinamica muda. McKinney comeca a desacelerar quando nao consegue a finalizacao rapida, e historicamente suas derrotas vem quando a luta se estende. Nelson pode comecar a encontrar o timing e usar o jab na distancia. E aqui que a luta se decide: se McKinney ainda tem gas para mais um blitz ou se Nelson assume o controle.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM NELSON',
          color: 'green',
          title: 'Aguas Desconhecidas para McKinney',
          description: 'McKinney nunca chegou ao terceiro round como vencedor. Se a luta chegar aqui, e sinal de que Nelson sobreviveu o pior e agora tem a vantagem de experiencia em lutas longas. O canadense tem 7 vitorias por decisao e sabe trabalhar rounds. McKinney nesse ponto estara em territorio completamente desconhecido.',
        },
      ],
    },

    // ===========================
    // Section 10: INTANGIVEIS
    // ===========================
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Quase em Casa', fighter: 'McKinney', risk_level: 'POSITIVO', risk_color: 'green', description: 'McKinney e de Spokane, Washington, a poucas horas de Seattle. O publico do Climate Pledge Arena tera uma parcela significativa de torcedores locais.' },
        { icon: 'AlertTriangle', title: 'Vulnerabilidade Defensiva', fighter: 'McKinney', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Com apenas 43% de defesa de strikes e 5 finalizacoes sofridas em 12 lutas no UFC, McKinney e extremamente vulneravel quando a agressividade vira exposicao.' },
        { icon: 'Zap', title: 'Poder de Finalizacao Historico', fighter: 'McKinney', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '25 lutas profissionais, 25 finalizacoes. Essa estatistica e quase incompreensivel no MMA moderno. McKinney SEMPRE acha um jeito de acabar a luta, para o bem ou para o mal.' },
        { icon: 'TrendingUp', title: 'Reinvencao no Peso-Leve', fighter: 'Nelson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Nelson parece ter encontrado sua categoria ideal no peso-leve. Mais confortavel fisicamente e mostrando mais paciencia tatica na vitoria contra Frevola.' },
        { icon: 'Clock', title: 'Derrota Recente', fighter: 'McKinney', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'McKinney vem de uma derrota para Chris Duncan em dezembro de 2025. Perdas consecutivas nao sao novas para ele, mas o padrao de altos e baixos levanta questoes sobre a mentalidade.' },
        { icon: 'Shield', title: 'Queixo Questionavel', fighter: 'Nelson', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Nelson foi finalizado no R1 por Steve Garcia e por Billy Quarantillo. Contra a explosividade de McKinney, o queixo sera testado imediatamente.' },
        { icon: 'Brain', title: 'Experiencia em Lutas Longas', fighter: 'Nelson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Com 7 vitorias por decisao, Nelson sabe administrar lutas de 3 rounds. McKinney nunca venceu por pontos. Se a luta se estender, Nelson tem a experiencia que McKinney nao tem.' },
      ],
    },

    // ===========================
    // Section 11: CAMINHOS PARA VITORIA
    // ===========================
    caminhos_vitoria: {
      fighter1: {
        nome: 'McKinney',
        total_probability: 57,
        scenarios: [
          { name: 'Blitz Devastador', probability: 30, method: 'KO/TKO R1', description: 'McKinney entra avancando desde o primeiro segundo. Pressao imediata, combinacoes rapidas, e busca pelo KO antes de Nelson se ambientar. O cenario mais provavel de todos: McKinney destrundo o adversario em menos de um minuto.' },
          { name: 'Submissao Relampago', probability: 17, method: 'Sub R1-R2', description: 'McKinney leva a luta ao chao e encontra uma guilhotina, RNC ou anaconda no grappling selvagem. Com 9 submissoes na carreira, o chao e tao perigoso quanto os pes para McKinney.' },
          { name: 'TKO por Acumulo', probability: 10, method: 'TKO R2', description: 'McKinney machuca Nelson no R1 sem finalizar, e completa o trabalho no R2 com ground and pound quando Nelson ja esta debilitado.' },
        ],
      },
      fighter2: {
        nome: 'Nelson',
        total_probability: 40,
        scenarios: [
          { name: 'Sobreviver e Conquistar', probability: 18, method: 'Decisao Unanime', description: 'Nelson resiste a tempestade inicial, defende takedowns e comeca a trabalhar no jab e no volume no R2 e R3. McKinney desacelera e Nelson vence nos pontos.' },
          { name: 'Contragolpe Fatal', probability: 12, method: 'KO/TKO R1-R2', description: 'McKinney entra avancando de forma descuidada e Nelson conecta um contragolpe limpo na entrada. A agressividade de McKinney vira sua propria armadilha.' },
          { name: 'Finalizacao na Oportunidade', probability: 10, method: 'TKO R2-R3', description: 'Com McKinney cansado depois de um R1 intenso sem finalizacao, Nelson comeca a encontrar aberturas e para a luta com strikes no R2 ou R3.' },
        ],
      },
    },

    // ===========================
    // Section 12: PREVISAO FINAL
    // ===========================
    previsao_final: {
      winner_name: 'Terrance McKinney',
      winner_side: 'fighter1',
      predicted_method: 'TKO/KO R1',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'McKinney e simplesmente explosivo demais nos primeiros minutos para a maioria dos oponentes. Com 6.96 strikes significativos por minuto e sete finalizacoes em menos de 60 segundos, ele traz um nivel de pressao inicial que poucos conseguem suportar. Nelson tem queixo questionavel (parado por Garcia e Quarantillo no R1/R3) e pode nao aguentar o blitz de McKinney. Porem, a confianca e apenas MEDIA porque McKinney e absurdamente imprevisivel. Ele pode destruir Nelson em 10 segundos ou ser nocauteado em um contragolpe na entrada. Cada luta dele e uma aposta.',
      x_factor: {
        title: 'Os 90 Primeiros Segundos',
        description: 'A luta inteira provavelmente sera decidida no primeiro minuto e meio. Se McKinney conectar algo grande nesse periodo, acabou. Se Nelson sobreviver, a dinamica muda drasticamente a favor do canadense.',
      },
      upset_alert: {
        title: 'O Contra-Ataque na Entrada',
        description: 'McKinney avanca com a guarda baixa e historicamente e vulneravel a contragolpes. Ribovics o nocauteou com head kick na entrada. Se Nelson tiver timing para um uppercut ou gancho limpo quando McKinney avanca, a surpresa pode acontecer.',
      },
      probabilities: {
        fighter1: { nome: 'McKinney', percent: 57 },
        fighter2: { nome: 'Nelson', percent: 40 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'McKinney (-142)', reasoning: 'Favorito leve com poder de finalizacao massivo. A linha reflete a imprevisibilidade: McKinney deveria ser mais favoritado pelo potencial ofensivo, mas as derrotas frequentes equilibram.' },
        method: { pick: 'Luta nao vai para decisao', reasoning: 'McKinney NUNCA foi a decisao em 25 lutas. Nelson tem finalizacoes e foi finalizado varias vezes. A probabilidade de ir aos juizes e muito baixa.' },
        over_under: { pick: 'Under 1.5 rounds', rounds: 1.5, reasoning: 'Das 25 lutas de McKinney, a vasta maioria terminou no R1. Nelson tambem tem finalizacoes e foi parado cedo. Tudo aponta para luta curta.' },
        best_value: 'Under 1.5 rounds e a aposta com melhor valor. Ambos os lutadores tem historico de lutas que terminam rapido, e McKinney raramente passa do primeiro round.',
      },
    },

    // ===========================
    // Section 13: O QUE OBSERVAR
    // ===========================
    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 30 Segundos', icon: 'Zap', description: 'McKinney define lutas antes de muita gente terminar de se acomodar no sofa. Preste atencao maxima desde o toque de luvas. Se ele conectar algo limpo nos primeiros 30 segundos, a luta pode terminar ali mesmo. Nelson precisa estar pronto para o caos imediato.' },
        { num: 2, title: 'A Defesa de Takedown de Nelson', icon: 'Shield', description: 'Nelson tem 73% de defesa de takedown, numero solido. Mas nunca enfrentou alguem tao explosivo nas entradas quanto McKinney. Se Nelson defender os primeiros dois ou tres takedowns, a confianca dele sobe e McKinney pode comecar a hesitar.' },
        { num: 3, title: 'O Gas de McKinney Depois do R1', icon: 'Activity', description: 'McKinney nunca venceu por decisao. Se a luta chegar ao R2, observe o ritmo dele. Historicamente, quando McKinney nao consegue a finalizacao rapida, ele desacelera significativamente. Esse e o ponto onde Nelson pode virar a luta.' },
        { num: 4, title: 'Switch Stance de Ambos', icon: 'Eye', description: 'Os dois lutam em switch stance. Quem controlar melhor os angulos na troca de base vai ter vantagem no striking. Preste atencao em quem esta mais confortavel trocando de ortodoxo para southpaw e vice-versa.' },
        { num: 5, title: 'A Envergadura de McKinney', icon: 'Target', description: 'McKinney tem 2.5 polegadas a mais de envergadura que Nelson (73.5" vs 71"). Essa vantagem pode ser decisiva no jab e nos golpes retos. Se McKinney usar a distancia antes de avancara, pode controlar o centro do octogono mais facilmente.' },
      ],
    },

    // ===========================
    // Section 14: CREATOR KIT
    // ===========================
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'BOMBA RELOGIO', content: 'McKINNEY vs NELSON\nUFC Fight Night | 28 de Marco\nSeattle, Washington\n\n25 lutas. 25 finalizacoes.\nMcKinney NUNCA foi a decisao.', color: 'red' },
        { slide_number: 2, title: 'T.WRECKS: A ESTATISTICA ABSURDA', content: '17 vitorias na carreira\n8 por KO/TKO\n9 por submissao\n0 por decisao\n\n7 finalizacoes em menos de 60 seg\nKO mais rapido do peso-leve: 7 seg\n6.96 strikes por minuto\n(Top 4 da HISTORIA do peso-leve)', color: 'red' },
        { slide_number: 3, title: 'THE MONSTER', content: 'Kyle Nelson | 17-6-1\n\nReinvencao no peso-leve\nVitoria por UD vs Frevola\n6 KOs + 4 submissoes + 7 decisoes\nEstilo equilibrado e paciente\n73% defesa de takedown\n\nVeterano canadense busca sequencia', color: 'blue' },
        { slide_number: 4, title: 'O OPONENTE EM COMUM', content: 'Matt Frevola\n\nMcKinney: KO em 7 SEGUNDOS\n(Recorde do peso-leve)\n\nNelson: Decisao Unanime\n(3 rounds completos)\n\nExplosao vs Paciencia.', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'McKINNEY por TKO/KO R1\n\nConfianca: MEDIA\n57% McKinney / 40% Nelson\n\nSe durar mais de 2 min?\nNelson vira favorito.\nSe nao durar? Highlight reel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'McKinney vs Nelson e a luta que voce NAO pode perder desse card. T.Wrecks tem 25 lutas profissionais e ZERO decisoes. Nunca. 17 vitorias, 8 derrotas, todas por finalizacao. Thread:' },
        { num: '2/6', text: 'McKinney (17-8): 6.96 strikes por minuto (top 4 na historia do peso-leve), 7 finalizacoes em menos de 60 segundos, KO mais rapido da historia do peso-leve (7 seg). O problema? 5 finalizacoes sofridas no UFC. E uma moeda jogada pro alto.' },
        { num: '3/6', text: 'Nelson (17-6-1): Canadense reinventado no peso-leve. Venceu Frevola por decisao unanime. Estilo mais paciente e maduro. 73% defesa de takedown. 7 vitorias por decisao. Sabe administrar rounds.' },
        { num: '4/6', text: 'Detalhe interessante: os dois enfrentaram Frevola. McKinney nocauteou em 7 SEGUNDOS. Nelson venceu por decisao em 15 minutos. Dois estilos completamente opostos contra o mesmo cara. Isso resume tudo.' },
        { num: '5/6', text: 'Aposta de valor: Under 1.5 rounds. McKinney nunca foi a decisao em 25 lutas. NUNCA. Nelson tambem tem finalizacoes no R1. Tudo aponta pra luta curta. Se voce quer acao, sintonize desde o primeiro segundo.' },
        { num: '6/6', text: 'Minha pick: McKinney por TKO/KO no R1. Mas olha, a confianca e MEDIA. McKinney pode destruir Nelson em 10 segundos ou ser nocauteado em um contragolpe na entrada. Essa luta e caos puro.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '25 lutas profissionais. Zero decisoes. Terrance McKinney NUNCA ouviu os juizes na vida. E no sabado, ele enfrenta Kyle Nelson em Seattle. Se voce piscar, pode perder a luta inteira.' },
        { time: '10-25s', title: 'Contexto', text: 'McKinney e o cara que nocauteou Frevola em 7 segundos, que tem 6.96 strikes por minuto, que tem 7 finalizacoes em menos de um minuto. Mas tambem e o cara com 5 derrotas por finalizacao no UFC. Nelson e o oposto: paciente, veterano, reinventado no peso-leve depois de anos no peso-pena.' },
        { time: '25-40s', title: 'Analise', text: 'A pergunta e simples: Nelson sobrevive os primeiros 90 segundos? Se sim, a luta muda. McKinney nunca venceu por decisao. Nelson tem 7. Se passa do R1, Nelson e favorito. Se nao passa, McKinney adiciona mais um highlight reel. Detalhe: os dois enfrentaram Frevola. McKinney, KO em 7 segundos. Nelson, decisao em 15 minutos. Isso e tudo que voce precisa saber.' },
        { time: '40-55s', title: 'Previsao', text: 'Minha call: McKinney por TKO no R1, mas com confianca MEDIA. Ele pode destruir qualquer um nos primeiros segundos, mas tambem pode ser nocauteado num contragolpe. Under 1.5 rounds e a melhor aposta do card.' },
        { time: '55-65s', title: 'CTA', text: 'Quem ganha? Comenta McKINNEY ou NELSON. Se gostou, segue pra analise completa do UFC Fight Night Adesanya vs Pyfer.' },
      ],
      tiktok: [
        { hook: '25 lutas. ZERO decisoes. Esse cara NUNCA ouviu os juizes na vida.', body: 'Terrance McKinney tem 17 vitorias e 8 derrotas. Todas por finalizacao. Cada. Uma. Dele. Nocauteou Frevola em 7 SEGUNDOS. Tem 7 vitorias em menos de um minuto. Sabado ele enfrenta Kyle Nelson em Seattle. Se voce piscar, perdeu a luta.', cta: 'McKinney ou Nelson? Comenta!' },
        { hook: 'Mesma vitima. Estilos COMPLETAMENTE opostos.', body: 'McKinney nocauteou Frevola em 7 SEGUNDOS. KO mais rapido do peso-leve do UFC. Nelson? Derrotou o mesmo Frevola por decisao unanime. 15 minutos inteiros. Agora os dois se enfrentam. Explosao contra paciencia. Quem ganha?', cta: 'Segue pra ver a analise completa!' },
        { hook: 'A estatistica mais ABSURDA do UFC.', body: '25 lutas profissionais. 17 vitorias. 8 derrotas. ZERO decisoes. Terrance McKinney nunca, NUNCA ouviu um placar de juiz. Cada luta dele termina com alguem no chao. 6.96 strikes por minuto, top 4 na HISTORIA do peso-leve. Mas tem 43% de defesa de strikes. Vive no fio da navalha.', cta: 'Voce apostaria nele? Comenta!' },
      ],
      headlines: [
        'McKinney vs Nelson: 25 Lutas, Zero Decisoes e o Caos Garantido em Seattle',
        'T.Wrecks Busca Reabilitacao Contra o Canadense Reinventado no Peso-Leve',
        'O Oponente Comum: 7 Segundos vs 15 Minutos Contra o Mesmo Cara',
        'McKinney em Seattle: O Finalizador Mais Explosivo do UFC Volta ao Noroeste',
        'Kyle Nelson Pode Sobreviver a Bomba Relogio do Peso-Leve?',
        'Under 1.5 Rounds: Por Que Essa Luta Pode Ser a Mais Curta do Card',
      ],
    },

    // ===========================
    // Section 15: BETTING VALUE & RADAR
    // ===========================
    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-142',
        fighter2_odds: '+120',
        fighter1_name: 'Terrance McKinney',
        fighter2_name: 'Kyle Nelson',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Taxa de Finalizacao de 100%', stat_headline: '25 LUTAS PROFISSIONAIS, 25 FINALIZACOES. ZERO DECISOES NA CARREIRA.', contexto: 'McKinney nunca foi a decisao em toda a carreira profissional. Cada luta termina cedo, seja vitoria ou derrota.', implicacao_aposta: 'Under 1.5 rounds tem valor forte. A probabilidade de ir a decisao e historicamente zero para McKinney.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Volume de Strikes Absurdo', stat_headline: '6.96 STRIKES SIGNIFICATIVOS POR MINUTO, TOP 4 NA HISTORIA DO PESO-LEVE', contexto: 'McKinney descarrega um volume de golpes que poucos aguentam. A media do UFC e cerca de 4.0 SLpM. McKinney esta quase no dobro.', implicacao_aposta: 'Favorece McKinney no R1, onde o volume e mais devastador.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Defesa de Strikes Preocupante', stat_headline: 'McKINNEY COM APENAS 43% DE DEFESA DE STRIKES, 5 FINALIZACOES SOFRIDAS NO UFC', contexto: 'A mesma agressividade que gera nocautes gera exposicao. McKinney foi finalizado por Dober, Bonfim, Sadykhov, Ribovics e Duncan.', implicacao_aposta: 'Nelson por contragolpe nao e cenario irrealista. Valor em Nelson por KO/TKO.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Nelson com Defesa de TD Superior', stat_headline: 'NELSON COM 73% DE DEFESA DE TAKEDOWN vs 68% DE McKINNEY', contexto: 'Numero solido de Nelson para defender o wrestling de McKinney, embora nunca tenha enfrentado um wrestler tao explosivo.', implicacao_aposta: 'Se Nelson defender os takedowns iniciais, a luta pode se estender alem do R1.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'McKinney Nunca Venceu por Decisao', stat_headline: '0 VITORIAS POR DECISAO EM 17 VITORIAS NA CARREIRA', contexto: 'Se a luta for longa, Nelson tem a experiencia (7 vitorias por decisao). McKinney esta em territorio desconhecido apos o R1.', implicacao_aposta: 'Apostar em McKinney por decisao e jogar contra toda a evidencia historica.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-110', confianca: 'alta', edge_vs_mercado: 'McKinney nunca foi a decisao. 25 lutas, 25 finalizacoes. A maioria termina no R1.', raciocinio: 'A convergencia de dados e esmagadora. McKinney finaliza ou e finalizado cedo. Nelson tambem tem historico de lutas curtas (parado por Garcia no R1). Probabilidade altissima de terminar antes do R2.' },
        { tipo: 'Metodo', pick: 'Nao vai para decisao', odds: '-250', confianca: 'alta', raciocinio: 'McKinney NUNCA foi a decisao em 25 lutas profissionais. A probabilidade de terminar dentro da distancia e esmagadora, independente de quem venca.' },
        { tipo: 'Moneyline', pick: 'McKinney (-142)', odds: '-142', confianca: 'media', edge_vs_mercado: 'Linha justa que reflete a imprevisibilidade de McKinney.', raciocinio: 'McKinney tem vantagem clara em explosividade e poder de finalizacao. A -142, o preco e justo. Nao e uma pechincha, mas reflete o favorito correto.' },
        { tipo: 'Metodo', pick: 'McKinney por KO/TKO R1', odds: '+150', confianca: 'media', raciocinio: 'O cenario mais provavel isolado. McKinney tem historico massivo de finalizacoes no primeiro round. Odds decentes para o cenario com maior probabilidade individual.' },
      ],
      armadilha: {
        titulo: 'Armadilha: McKinney por Decisao',
        descricao: 'McKinney nunca venceu por decisao em toda a carreira. Zero. Nada. Apostar em McKinney por decisao e apostar em algo que literalmente nunca aconteceu em 25 lutas profissionais. Se a luta for a distancia, Nelson e o favorito por pontos.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// ENGLISH TRANSLATION
// ═══════════════════════════════════════════════════════════════
const analiseEN: FullSingleAnalise = {
  id: 'mckinney-vs-nelson',
  evento_id: null,
  slug: 'mckinney-vs-nelson',
  titulo: 'McKinney vs Nelson: Ticking Time Bomb at Lightweight',
  subtitulo: 'The UFC\'s most explosive finisher faces the durable Canadian in Seattle',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '5\'10"', envergadura: '73.5"', idade: 31, academia: 'Fusion X-Cel' },
      fighter2: { altura: '5\'11"', envergadura: '71"', idade: 34, academia: 'House of Champions' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'TKO R1',
    confidence: 'MEDIUM',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Terrance McKinney',
    record: '17-8-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Chris Duncan', method: 'Sub R1 (anaconda choke)', event: 'UFC 323' },
      { result: 'W', opponent: 'Viacheslav Borshchev', method: 'Sub R1 (guillotine)', event: 'UFC 317' },
      { result: 'W', opponent: 'Damir Hadzovic', method: 'TKO R1', event: 'UFC Fight Night 250' },
    ],
  },
  fighter2_info: {
    nome: 'Kyle Nelson',
    record: '17-6-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Matt Frevola', method: 'Unanimous Decision', event: 'UFC Fight Night 262' },
      { result: 'L', opponent: 'Steve Garcia', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Bill Algeo', method: 'TKO R1', event: 'UFC on ESPN 54' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: 'March 28, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Lightweight (155 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: 'March 28, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Lightweight (155 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Ticking Time Bomb at Lightweight',
      tagline_sub: '25 fights, 25 finishes. T.Wrecks has never gone to a decision in his life.',
      fighter1: {
        nome_completo: 'Terrance "T.Wrecks" McKinney',
        apelido: 'T.Wrecks',
        sobrenome: 'McKinney',
        record: '17-8-0',
        ranking: 'N/R Lightweight',
        info_extra: 'Spokane, Washington | 31 years old',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/MCKINNEY_TERRANCE_L_12-06.png?itok=JYl1VRcp',
      },
      fighter2: {
        nome_completo: 'Kyle "The Monster" Nelson',
        apelido: 'The Monster',
        sobrenome: 'Nelson',
        record: '17-6-1',
        ranking: 'N/R Lightweight',
        info_extra: 'Ontario, Canada | 34 years old',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/NELSON_KYLE_L_10-18.png?itok=K1REGeZG',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">The Man Who Never Heard the Judges</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Terrance McKinney</strong> owns one of the most absurd stats in modern UFC: 25 professional fights, 25 finishes. He has never, in his entire career, heard a judge's scorecard. Not as the winner, not as the loser. Every single fight ends with someone on the canvas, usually in less than one round. The man has seven wins in under 60 seconds. He held the record for the fastest knockout in UFC lightweight history (7 seconds against Frevola). If you blink, you missed it.
        </p>
        <p class="mb-4">
          The problem? That same explosiveness that makes him a walking highlight reel also makes him vulnerable. McKinney has been finished five times in the UFC, always when his aggression turns into recklessness. Drew Dober, Ismael Bonfim, Nazim Sadykhov, Esteban Ribovics, Chris Duncan. They all found the crack in the armor. His 7-5 UFC record tells a story of pure volatility: every fight is a coin flip, and the result comes fast.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Canadian Who Reinvented Himself</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Kyle Nelson</strong> doesn't carry the same flash. He started his UFC journey with a TKO loss to Carlos Diego Ferreira in 2018 and needed time to find himself. He went through ups and downs at featherweight before making the smart decision to move up to lightweight, where he seems more comfortable. The unanimous decision win over Matt Frevola in October 2025 showed a more mature, more patient, and more dangerous Nelson at range.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Seattle Is Going to Be the Stage for Chaos</h3>
        <p class="mb-4">
          McKinney returns to the Pacific Northwest, close to his hometown of Spokane. But he's coming off a loss by anaconda choke to Chris Duncan in December. Nelson is riding a solid win. The Canadian knows he needs to survive the opening minutes, because if McKinney doesn't finish you fast, the fight starts slipping through his fingers. That's exactly where Nelson can be dangerous.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Unranked, seeking relevance', fighter2: 'Unranked, seeking a streak' },
        { dimensao: 'Goal', fighter1: 'Win streak and top 15', fighter2: 'Establish himself at lightweight' },
        { dimensao: 'Narrative', fighter1: 'Prove he can be consistent', fighter2: 'Show that lightweight is his home' },
        { dimensao: 'Risk', fighter1: 'Third loss in four fights', fighter2: 'Quick loss to an explosive finisher' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'T.WRECKS DESTROYS AT HOME',
          subtitulo: 'McKinney finishes Nelson in under one round in front of the Seattle crowd',
          consequencias: [
            { tag: 'MOMENTUM', texto: 'McKinney regains confidence and strings together two consecutive wins, reinserting himself in the lightweight conversation' },
            { tag: 'RANKING', texto: 'With three wins in his last four, McKinney could crack the top 15 with one more significant victory' },
            { tag: 'NARRATIVE', texto: 'The story of the most explosive lightweight adds another highlight reel chapter' },
          ],
          proxima_luta: 'McKinney vs a top 15 ranked lightweight opponent',
        },
        fighter2_vence: {
          titulo: 'THE MONSTER SILENCES SEATTLE',
          subtitulo: 'Nelson survives the initial storm and finishes McKinney when aggression turns to recklessness',
          consequencias: [
            { tag: 'RISE', texto: 'Nelson proves he belongs at lightweight with a significant win over a known name' },
            { tag: 'STREAK', texto: 'Two consecutive lightweight wins position Nelson for ranked opponents' },
            { tag: 'NARRATIVE', texto: 'The Canadian veteran\'s reinvention gains real credibility' },
          ],
          proxima_luta: 'Nelson vs a ranked lightweight gatekeeper',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Terrance McKinney',
        color: 'red',
        recent_fights: [
          { date: 'Dec 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted by anaconda choke at 2:30 of R1. Duncan capitalized on McKinney\'s excessive aggression.' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Finished with a mounted guillotine in just 55 seconds. Total domination from the first second.' },
          { date: 'Feb 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1 (punches)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Stopped Hadzovic with ground and pound at 2:01 of R1. Another quick finish.' },
          { date: 'May 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1 (head kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out by a head kick early in R1. Defensive vulnerability exposed.' },
          { date: 'Oct 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Finished in just 20 seconds. Another instant highlight.' },
        ],
        full_fight_history: [
          { date: 'Jun 2021', opponent: 'Matt Frevola', result: 'W', method: 'KO R1 (0:07)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut with the fastest KO in lightweight history' },
          { date: 'Nov 2021', opponent: 'Fares Ziam', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Finished with a rear-naked choke in R1' },
          { date: 'Mar 2022', opponent: 'Drew Dober', result: 'L', method: 'TKO R1', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Good', note: 'First real test, first UFC loss' },
          { date: 'Jan 2023', opponent: 'Ismael Bonfim', result: 'L', method: 'KO R2 (flying knee)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out by a flying knee in R2' },
          { date: 'Jul 2023', opponent: 'Nazim Sadykhov', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted in R2 by rear-naked choke' },
          { date: 'Aug 2023', opponent: 'Mike Breeden', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Quick TKO victory' },
          { date: 'Oct 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Finished in 20 seconds' },
          { date: 'May 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out by head kick' },
          { date: 'Feb 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'TKO by ground and pound' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Mounted guillotine in 55 seconds' },
          { date: 'Dec 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Submitted by anaconda choke' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Stable (with caveats)',
        momentum_trend: 'resilient',
        momentum_note: 'McKinney is the definition of a rollercoaster. He beat Hadzovic and Borshchev impressively, then lost to Duncan right after. The pattern repeats: explosive wins followed by careless losses. You can\'t trust the consistency, but the explosive potential is always there.',
      },
      fighter2: {
        nome: 'Kyle Nelson',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Matt Frevola', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First lightweight fight. Solid unanimous decision win over a durable veteran. Showed patience and adaptability.' },
          { date: 'Sep 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1 (elbows and punches)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Stopped in the first round by elbows and punches. Stepped in as a short-notice replacement for Calvin Kattar.' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First-round TKO against Algeo. Quick and efficient finish.' },
          { date: 'Sep 2023', opponent: 'Fernando Padilla', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Consistent unanimous decision win. Complete work over 3 rounds.' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Unanimous decision win at UFC 289. Solid performance.' },
        ],
        full_fight_history: [
          { date: 'Dec 2018', opponent: 'Carlos Diego Ferreira', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Good', note: 'UFC debut, loss to an experienced fighter' },
          { date: 'Sep 2019', opponent: 'Marco Polo Reyes', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First UFC win' },
          { date: 'Sep 2020', opponent: 'Billy Quarantillo', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Knocked out in the third round' },
          { date: 'Jul 2022', opponent: 'Jai Herbert', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Loss by unanimous decision' },
          { date: 'Feb 2023', opponent: 'Choi Doo-ho', result: 'D', method: 'Majority Draw', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Majority draw in an evenly matched fight' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Decision win' },
          { date: 'Sep 2023', opponent: 'Fernando Padilla', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Low', note: 'Consistent win' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Quick TKO' },
          { date: 'Sep 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Stopped in R1 on short notice' },
          { date: 'Oct 2025', opponent: 'Matt Frevola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'Lightweight debut, decision win' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'On the Rise',
        momentum_trend: 'ascending',
        momentum_note: 'Nelson is coming off an important win in his lightweight debut against Frevola. After years of oscillating at featherweight, the weight class change seems to have given new life to his career. The Garcia loss was a short-notice fight, so the context softens it. Two wins in his last three fights, with the most recent being the most mature of his career.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'McKinney',
        media_oponentes: 2,
        media_oponentes_label: 'Average',
        aproveitamento: '7W-5L (58%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Nelson',
        media_oponentes: 2,
        media_oponentes_label: 'Average',
        aproveitamento: '5W-5L-1D (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Matt Frevola is the common opponent. McKinney knocked him out in 7 seconds on his UFC debut (2021). Nelson beat him by unanimous decision in October 2025. Completely different approaches against the same opponent reveal the contrasting styles of these two fighters.',
    },

    oponente_comum: {
      oponente_nome: 'Matt Frevola',
      fighter1_result: {
        resultado: 'Win by KO',
        metodo: 'KO R1 (0:07)',
        duracao: '7 seconds',
        contexto: 'McKinney came in as a short-notice replacement and destroyed Frevola with an immediate blitz. Seven seconds. The fastest KO in UFC lightweight history. Frevola didn\'t even have time to react.',
        performance: 'Iconic performance. It defined McKinney as a force of nature at lightweight. The kind of finish that becomes legend. However, it happened in 2021, and McKinney has since shown that the same aggression can be a double-edged sword.',
        evento: 'UFC 263',
        data: 'Jun 2021',
      },
      fighter2_result: {
        resultado: 'Win by Unanimous Decision',
        metodo: 'Unanimous Decision (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Nelson made his lightweight debut and outworked Frevola over three full rounds. Used the jab, distance management, and tactical intelligence to win clearly. No rush, no unnecessary risks.',
        performance: 'A mature performance that contrasted with Nelson\'s featherweight style. Showed that the weight class change brought more patience and control. It wasn\'t exciting, but it was efficient.',
        evento: 'UFC Fight Night 262',
        data: 'Oct 2025',
      },
      insight: 'Two completely opposite styles against the same opponent. McKinney destroyed Frevola in 7 seconds with pure violence. Nelson beat him over 15 minutes with patience and technique. This comparison perfectly summarizes what to expect from this fight: explosion versus consistency, risk versus control.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes per Minute', valueA: 6.96, valueB: 3.51, maxVal: 8, format: 'decimal', note: 'McKinney has the 4th highest SLpM in lightweight history' },
        { label: 'Strike Accuracy (%)', valueA: 48, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 3.46, valueB: 4.20, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Estimate based on available data for Nelson' },
        { label: 'Strike Defense (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Takedowns per 15 Min', valueA: 2.50, valueB: 1.06, maxVal: 5, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 50, valueB: 20, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 68, valueB: 73, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '31 years old', fighter2: '34 years old', note: 'McKinney 3 years younger' },
        { label: 'Height', fighter1: '5\'10" (1.78m)', fighter2: '5\'11" (1.80m)', note: 'Nelson 1 inch taller' },
        { label: 'Reach', fighter1: '73.5" (187cm)', fighter2: '71" (180cm)', note: 'McKinney with 2.5 inch advantage' },
        { label: 'Stance', fighter1: 'Switch', fighter2: 'Switch', note: 'Both fight in switch stance' },
        { label: 'Gym', fighter1: 'Fusion X-Cel, Orlando, FL', fighter2: 'House of Champions, Ontario, CA', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Explosiveness & Speed', valueA: 92, valueB: 55, labelA: 'Excellent', labelB: 'Good', advantage: 'fighter1', advantage_note: 'McKinney is one of the most explosive fighters in the UFC. Seven finishes in under 60 seconds.' },
        { label: 'Striking Volume', valueA: 85, valueB: 55, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'McKinney lands 6.96 sig. strikes per minute, nearly double Nelson\'s 3.51.' },
        { label: 'Defense & Discipline', valueA: 35, valueB: 58, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'McKinney has only 43% strike defense. Nelson is more disciplined at 51%.' },
        { label: 'Offensive Wrestling', valueA: 70, valueB: 40, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'McKinney with 50% takedown accuracy, far superior to Nelson\'s 20%.' },
        { label: 'Cardio & Endurance', valueA: 40, valueB: 65, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'McKinney has never gone to a decision. Nelson has 7 decision wins and experience going 3 full rounds.' },
        { label: 'Ground Game (Grappling)', valueA: 72, valueB: 45, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'McKinney has 9 career submissions. Nelson has 4. Clear grappling advantage.' },
      ],
      insight: 'This matchup is speed versus durability. McKinney dominates in explosiveness, striking volume, and offensive grappling. Nelson has the edge in defensive discipline and endurance. If the fight is quick, it\'s McKinney\'s. If Nelson survives the opening minutes and forces a long fight, the game changes completely.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'McKinney',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 9, percent: 53 },
        decision: { count: 0, percent: 0 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'Nelson',
        ko_tko: { count: 6, percent: 35 },
        submission: { count: 4, percent: 24 },
        decision: { count: 7, percent: 41 },
        total_wins: 17,
      },
      insight: 'The contrast couldn\'t be greater. McKinney has ZERO decision wins in his entire career. Each of his 17 victories came by finish, split almost evenly between knockouts (8) and submissions (9). Nelson is far more balanced, with 41% by decision. This confirms that McKinney always seeks the quick ending, while Nelson can adapt to longer fights.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'McKINNEY ADVANTAGE',
          color: 'red',
          title: 'Destruction Zone',
          description: 'The first round is where McKinney lives. Seven finishes in under one minute. The 7-second record against Frevola. If Nelson isn\'t 100% locked in from the first second, the fight could end before he has time to breathe. McKinney will come out like a bull and hunt for the KO or an immediate takedown. Nelson needs to survive this storm at all costs.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EVEN',
          color: 'gold',
          title: 'The Turning Point',
          description: 'If Nelson survives the first round, the dynamics change. McKinney starts to slow down when he can\'t get the quick finish, and historically his losses come when the fight extends. Nelson can start finding his timing and working the jab at range. This is where the fight gets decided: whether McKinney still has gas for another blitz or Nelson takes control.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'NELSON ADVANTAGE',
          color: 'green',
          title: 'Uncharted Waters for McKinney',
          description: 'McKinney has never reached the third round as the winner. If the fight gets here, it means Nelson survived the worst and now has the advantage of long-fight experience. The Canadian has 7 decision wins and knows how to work rounds. McKinney at this point would be in completely uncharted territory.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Nearly Home', fighter: 'McKinney', risk_level: 'POSITIVE', risk_color: 'green', description: 'McKinney is from Spokane, Washington, just a few hours from Seattle. The Climate Pledge Arena crowd will have a significant portion of local fans.' },
        { icon: 'AlertTriangle', title: 'Defensive Vulnerability', fighter: 'McKinney', risk_level: 'HIGH RISK', risk_color: 'red', description: 'With only 43% strike defense and 5 finishes suffered in 12 UFC fights, McKinney is extremely vulnerable when aggression turns into exposure.' },
        { icon: 'Zap', title: 'Historic Finishing Power', fighter: 'McKinney', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: '25 professional fights, 25 finishes. This stat is almost incomprehensible in modern MMA. McKinney ALWAYS finds a way to end the fight, for better or worse.' },
        { icon: 'TrendingUp', title: 'Lightweight Reinvention', fighter: 'Nelson', risk_level: 'POSITIVE', risk_color: 'green', description: 'Nelson seems to have found his ideal weight class at lightweight. More physically comfortable and showing more tactical patience in the Frevola win.' },
        { icon: 'Clock', title: 'Recent Loss', fighter: 'McKinney', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'McKinney is coming off a loss to Chris Duncan in December 2025. Consecutive losses aren\'t new for him, but the pattern of ups and downs raises questions about his mentality.' },
        { icon: 'Shield', title: 'Questionable Chin', fighter: 'Nelson', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Nelson was finished in R1 by Steve Garcia and by Billy Quarantillo. Against McKinney\'s explosiveness, his chin will be tested immediately.' },
        { icon: 'Brain', title: 'Long Fight Experience', fighter: 'Nelson', risk_level: 'POSITIVE', risk_color: 'green', description: 'With 7 decision wins, Nelson knows how to manage 3-round fights. McKinney has never won on points. If the fight goes long, Nelson has the experience McKinney lacks.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'McKinney',
        total_probability: 57,
        scenarios: [
          { name: 'Devastating Blitz', probability: 30, method: 'KO/TKO R1', description: 'McKinney charges forward from the first second. Immediate pressure, rapid combinations, hunting for the KO before Nelson can settle in. The most likely scenario of all: McKinney destroying his opponent in under a minute.' },
          { name: 'Lightning Submission', probability: 17, method: 'Sub R1-R2', description: 'McKinney takes the fight to the ground and finds a guillotine, RNC, or anaconda in the wild grappling exchanges. With 9 career submissions, the ground is just as dangerous as the feet for McKinney.' },
          { name: 'TKO by Accumulation', probability: 10, method: 'TKO R2', description: 'McKinney hurts Nelson in R1 without finishing, then completes the job in R2 with ground and pound when Nelson is already compromised.' },
        ],
      },
      fighter2: {
        nome: 'Nelson',
        total_probability: 40,
        scenarios: [
          { name: 'Survive and Conquer', probability: 18, method: 'Unanimous Decision', description: 'Nelson weathers the initial storm, defends takedowns, and starts working the jab and volume in R2 and R3. McKinney slows down and Nelson wins on points.' },
          { name: 'Fatal Counter', probability: 12, method: 'KO/TKO R1-R2', description: 'McKinney charges forward recklessly and Nelson lands a clean counter on the entry. McKinney\'s aggression becomes his own trap.' },
          { name: 'Finish on Opportunity', probability: 10, method: 'TKO R2-R3', description: 'With McKinney gassed after an intense R1 without a finish, Nelson starts finding openings and stops the fight with strikes in R2 or R3.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Terrance McKinney',
      winner_side: 'fighter1',
      predicted_method: 'TKO/KO R1',
      confidence_score: 5,
      confidence_label: 'MEDIUM',
      explanation: 'McKinney is simply too explosive in the opening minutes for most opponents. With 6.96 significant strikes per minute and seven finishes in under 60 seconds, he brings a level of initial pressure that few can withstand. Nelson has a questionable chin (stopped by Garcia and Quarantillo in R1/R3) and may not survive McKinney\'s blitz. However, confidence is only MEDIUM because McKinney is absurdly unpredictable. He could destroy Nelson in 10 seconds or get knocked out on a counter on the entry. Every fight of his is a gamble.',
      x_factor: {
        title: 'The First 90 Seconds',
        description: 'The entire fight will likely be decided in the first minute and a half. If McKinney lands something big in that window, it\'s over. If Nelson survives, the dynamics shift drastically in the Canadian\'s favor.',
      },
      upset_alert: {
        title: 'The Counter on Entry',
        description: 'McKinney advances with his guard down and is historically vulnerable to counters. Ribovics knocked him out with a head kick on entry. If Nelson has the timing for a clean uppercut or hook when McKinney charges, the upset can happen.',
      },
      probabilities: {
        fighter1: { nome: 'McKinney', percent: 57 },
        fighter2: { nome: 'Nelson', percent: 40 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'McKinney (-142)', reasoning: 'Slight favorite with massive finishing power. The line reflects the unpredictability: McKinney should be a bigger favorite based on offensive potential, but the frequent losses balance it out.' },
        method: { pick: 'Fight doesn\'t go to decision', reasoning: 'McKinney has NEVER gone to a decision in 25 fights. Nelson has finishes and has been finished multiple times. The probability of going to the judges is very low.' },
        over_under: { pick: 'Under 1.5 rounds', rounds: 1.5, reasoning: 'Of McKinney\'s 25 fights, the vast majority ended in R1. Nelson also has finishes and has been stopped early. Everything points to a short fight.' },
        best_value: 'Under 1.5 rounds is the best value bet. Both fighters have a history of fights ending quickly, and McKinney rarely makes it past the first round.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'The First 30 Seconds', icon: 'Zap', description: 'McKinney finishes fights before most people are done settling into the couch. Pay maximum attention from the glove touch. If he lands something clean in the first 30 seconds, the fight could end right there. Nelson needs to be ready for immediate chaos.' },
        { num: 2, title: 'Nelson\'s Takedown Defense', icon: 'Shield', description: 'Nelson has 73% takedown defense, a solid number. But he\'s never faced someone as explosive on entries as McKinney. If Nelson defends the first two or three takedowns, his confidence rises and McKinney may start to hesitate.' },
        { num: 3, title: 'McKinney\'s Gas Tank After R1', icon: 'Activity', description: 'McKinney has never won by decision. If the fight reaches R2, watch his pace. Historically, when McKinney can\'t get the quick finish, he slows down significantly. This is the point where Nelson can turn the fight.' },
        { num: 4, title: 'Switch Stance from Both', icon: 'Eye', description: 'Both fighters use a switch stance. Whoever controls the angles better in the stance switches will have the striking advantage. Watch for who is more comfortable switching between orthodox and southpaw.' },
        { num: 5, title: 'McKinney\'s Reach', icon: 'Target', description: 'McKinney has 2.5 inches more reach than Nelson (73.5" vs 71"). This advantage could be decisive with the jab and straight punches. If McKinney uses the distance before charging, he can control the center of the octagon more easily.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'TICKING TIME BOMB', content: 'McKINNEY vs NELSON\nUFC Fight Night | March 28\nSeattle, Washington\n\n25 fights. 25 finishes.\nMcKinney has NEVER gone to decision.', color: 'red' },
        { slide_number: 2, title: 'T.WRECKS: THE ABSURD STAT', content: '17 career wins\n8 by KO/TKO\n9 by submission\n0 by decision\n\n7 finishes in under 60 sec\nFastest LW KO ever: 7 sec\n6.96 strikes per minute\n(Top 4 in LW HISTORY)', color: 'red' },
        { slide_number: 3, title: 'THE MONSTER', content: 'Kyle Nelson | 17-6-1\n\nLightweight reinvention\nUD win vs Frevola\n6 KOs + 4 submissions + 7 decisions\nBalanced and patient style\n73% takedown defense\n\nCanadian veteran seeking a streak', color: 'blue' },
        { slide_number: 4, title: 'THE COMMON OPPONENT', content: 'Matt Frevola\n\nMcKinney: KO in 7 SECONDS\n(Lightweight record)\n\nNelson: Unanimous Decision\n(3 full rounds)\n\nExplosion vs Patience.', color: 'gold' },
        { slide_number: 5, title: 'PREDICTION', content: 'McKINNEY by TKO/KO R1\n\nConfidence: MEDIUM\n57% McKinney / 40% Nelson\n\nIf it lasts more than 2 min?\nNelson becomes the favorite.\nIf not? Highlight reel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'McKinney vs Nelson is the fight you CANNOT miss on this card. T.Wrecks has 25 pro fights and ZERO decisions. Ever. 17 wins, 8 losses, all by finish. Thread:' },
        { num: '2/6', text: 'McKinney (17-8): 6.96 strikes per minute (top 4 in LW history), 7 finishes in under 60 seconds, fastest KO in LW history (7 sec). The problem? 5 finishes suffered in the UFC. It\'s a coin flip every time.' },
        { num: '3/6', text: 'Nelson (17-6-1): A reinvented Canadian at lightweight. Beat Frevola by unanimous decision. More patient, more mature style. 73% takedown defense. 7 decision wins. Knows how to manage rounds.' },
        { num: '4/6', text: 'Interesting detail: both faced Frevola. McKinney KO\'d him in 7 SECONDS. Nelson won by decision in 15 minutes. Two completely opposite styles against the same guy. That says it all.' },
        { num: '5/6', text: 'Value bet: Under 1.5 rounds. McKinney has never gone to decision in 25 fights. NEVER. Nelson also has R1 finishes. Everything points to a short fight. If you want action, tune in from the first second.' },
        { num: '6/6', text: 'My pick: McKinney by TKO/KO in R1. But look, confidence is MEDIUM. McKinney could destroy Nelson in 10 seconds or get knocked out on a counter on entry. This fight is pure chaos.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '25 professional fights. Zero decisions. Terrance McKinney has NEVER heard the judges in his life. And on Saturday, he faces Kyle Nelson in Seattle. If you blink, you might miss the entire fight.' },
        { time: '10-25s', title: 'Context', text: 'McKinney is the guy who KO\'d Frevola in 7 seconds, who lands 6.96 strikes per minute, who has 7 finishes in under a minute. But he\'s also the guy with 5 losses by finish in the UFC. Nelson is the opposite: patient, veteran, reinvented at lightweight after years at featherweight.' },
        { time: '25-40s', title: 'Analysis', text: 'The question is simple: does Nelson survive the first 90 seconds? If yes, the fight changes. McKinney has never won by decision. Nelson has 7. If it goes past R1, Nelson is the favorite. If it doesn\'t, McKinney adds another highlight reel. Detail: both fought Frevola. McKinney, KO in 7 seconds. Nelson, decision in 15 minutes. That\'s all you need to know.' },
        { time: '40-55s', title: 'Prediction', text: 'My call: McKinney by TKO in R1, but with MEDIUM confidence. He can destroy anyone in the opening seconds, but he can also get knocked out on a counter. Under 1.5 rounds is the best bet on the card.' },
        { time: '55-65s', title: 'CTA', text: 'Who wins? Comment McKINNEY or NELSON. If you liked this, follow for the full analysis of UFC Fight Night Adesanya vs Pyfer.' },
      ],
      tiktok: [
        { hook: '25 fights. ZERO decisions. This guy has NEVER heard the judges in his life.', body: 'Terrance McKinney has 17 wins and 8 losses. All by finish. Every. Single. One. KO\'d Frevola in 7 SECONDS. Has 7 wins in under a minute. Saturday he faces Kyle Nelson in Seattle. If you blink, you missed the fight.', cta: 'McKinney or Nelson? Comment!' },
        { hook: 'Same victim. COMPLETELY opposite styles.', body: 'McKinney KO\'d Frevola in 7 SECONDS. Fastest LW knockout in UFC history. Nelson? Beat the same Frevola by unanimous decision. 15 full minutes. Now they face each other. Explosion versus patience. Who wins?', cta: 'Follow for the full analysis!' },
        { hook: 'The most ABSURD stat in the UFC.', body: '25 professional fights. 17 wins. 8 losses. ZERO decisions. Terrance McKinney has never, NEVER heard a judge\'s scorecard. Every fight of his ends with someone on the canvas. 6.96 strikes per minute, top 4 in LW HISTORY. But 43% strike defense. Lives on the razor\'s edge.', cta: 'Would you bet on him? Comment!' },
      ],
      headlines: [
        'McKinney vs Nelson: 25 Fights, Zero Decisions, and Guaranteed Chaos in Seattle',
        'T.Wrecks Seeks Redemption Against the Reinvented Canadian at Lightweight',
        'The Common Opponent: 7 Seconds vs 15 Minutes Against the Same Guy',
        'McKinney in Seattle: The UFC\'s Most Explosive Finisher Returns to the Pacific Northwest',
        'Can Kyle Nelson Survive the Lightweight Ticking Time Bomb?',
        'Under 1.5 Rounds: Why This Fight Could Be the Shortest on the Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-142',
        fighter2_odds: '+120',
        fighter1_name: 'Terrance McKinney',
        fighter2_name: 'Kyle Nelson',
        source: 'Average from sportsbooks (March 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: '100% Finish Rate', stat_headline: '25 PROFESSIONAL FIGHTS, 25 FINISHES. ZERO DECISIONS IN HIS CAREER.', contexto: 'McKinney has never gone to a decision in his entire professional career. Every fight ends early, win or lose.', implicacao_aposta: 'Under 1.5 rounds has strong value. The probability of going to decision is historically zero for McKinney.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Absurd Strike Volume', stat_headline: '6.96 SIGNIFICANT STRIKES PER MINUTE, TOP 4 IN LIGHTWEIGHT HISTORY', contexto: 'McKinney unloads a volume of strikes that few can handle. The UFC average is about 4.0 SLpM. McKinney is nearly double that.', implicacao_aposta: 'Favors McKinney in R1, where the volume is most devastating.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Concerning Strike Defense', stat_headline: 'McKINNEY WITH ONLY 43% STRIKE DEFENSE, 5 FINISHES SUFFERED IN THE UFC', contexto: 'The same aggression that generates knockouts generates exposure. McKinney was finished by Dober, Bonfim, Sadykhov, Ribovics, and Duncan.', implicacao_aposta: 'Nelson by counter isn\'t an unrealistic scenario. Value in Nelson by KO/TKO.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Nelson with Superior TD Defense', stat_headline: 'NELSON WITH 73% TAKEDOWN DEFENSE vs McKINNEY\'S 68%', contexto: 'Solid number from Nelson to defend McKinney\'s wrestling, though he\'s never faced such an explosive wrestler.', implicacao_aposta: 'If Nelson defends the initial takedowns, the fight could extend beyond R1.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'McKinney Has Never Won by Decision', stat_headline: '0 DECISION WINS IN 17 CAREER VICTORIES', contexto: 'If the fight goes long, Nelson has the experience (7 decision wins). McKinney is in uncharted territory after R1.', implicacao_aposta: 'Betting on McKinney by decision goes against all historical evidence.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-110', confianca: 'alta', edge_vs_mercado: 'McKinney has never gone to decision. 25 fights, 25 finishes. Most end in R1.', raciocinio: 'The data convergence is overwhelming. McKinney finishes or gets finished early. Nelson also has a history of short fights (stopped by Garcia in R1). Extremely high probability of ending before R2.' },
        { tipo: 'Method', pick: 'Won\'t go to decision', odds: '-250', confianca: 'alta', raciocinio: 'McKinney has NEVER gone to a decision in 25 professional fights. The probability of finishing inside the distance is overwhelming, regardless of who wins.' },
        { tipo: 'Moneyline', pick: 'McKinney (-142)', odds: '-142', confianca: 'media', edge_vs_mercado: 'Fair line that reflects McKinney\'s unpredictability.', raciocinio: 'McKinney has a clear advantage in explosiveness and finishing power. At -142, the price is fair. Not a bargain, but reflects the correct favorite.' },
        { tipo: 'Method', pick: 'McKinney by KO/TKO R1', odds: '+150', confianca: 'media', raciocinio: 'The most likely individual scenario. McKinney has a massive history of first-round finishes. Decent odds for the highest individual probability scenario.' },
      ],
      armadilha: {
        titulo: 'Trap: McKinney by Decision',
        descricao: 'McKinney has never won by decision in his entire career. Zero. Nothing. Betting on McKinney by decision is betting on something that has literally never happened in 25 professional fights. If the fight goes the distance, Nelson is the favorite on points.',
      },
      disclaimer: 'Statistical analysis for informational purposes. Bet responsibly.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// FRENCH TRANSLATION
// ═══════════════════════════════════════════════════════════════
const analiseFR: FullSingleAnalise = {
  id: 'mckinney-vs-nelson',
  evento_id: null,
  slug: 'mckinney-vs-nelson',
  titulo: 'McKinney vs Nelson : Bombe a Retardement chez les Legers',
  subtitulo: 'Le finisseur le plus explosif de l\'UFC affronte le Canadien endurant a Seattle',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,78m', envergadura: '187cm', idade: 31, academia: 'Fusion X-Cel' },
      fighter2: { altura: '1,80m', envergadura: '180cm', idade: 34, academia: 'House of Champions' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'TKO R1',
    confidence: 'MOYENNE',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Terrance McKinney',
    record: '17-8-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Chris Duncan', method: 'Sub R1 (anaconda choke)', event: 'UFC 323' },
      { result: 'W', opponent: 'Viacheslav Borshchev', method: 'Sub R1 (guillotine)', event: 'UFC 317' },
      { result: 'W', opponent: 'Damir Hadzovic', method: 'TKO R1', event: 'UFC Fight Night 250' },
    ],
  },
  fighter2_info: {
    nome: 'Kyle Nelson',
    record: '17-6-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Matt Frevola', method: 'Decision Unanime', event: 'UFC Fight Night 262' },
      { result: 'L', opponent: 'Steve Garcia', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Bill Algeo', method: 'TKO R1', event: 'UFC on ESPN 54' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 mars 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Poids Leger (155 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 mars 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Poids Leger (155 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Bombe a Retardement chez les Legers',
      tagline_sub: '25 combats, 25 finitions. T.Wrecks n\'a jamais ete aux points de sa vie.',
      fighter1: {
        nome_completo: 'Terrance "T.Wrecks" McKinney',
        apelido: 'T.Wrecks',
        sobrenome: 'McKinney',
        record: '17-8-0',
        ranking: 'N/R Poids Leger',
        info_extra: 'Spokane, Washington | 31 ans',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/MCKINNEY_TERRANCE_L_12-06.png?itok=JYl1VRcp',
      },
      fighter2: {
        nome_completo: 'Kyle "The Monster" Nelson',
        apelido: 'The Monster',
        sobrenome: 'Nelson',
        record: '17-6-1',
        ranking: 'N/R Poids Leger',
        info_extra: 'Ontario, Canada | 34 ans',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/NELSON_KYLE_L_10-18.png?itok=K1REGeZG',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">L'Homme Qui N'a Jamais Entendu les Juges</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Terrance McKinney</strong> possede l'une des statistiques les plus absurdes de l'UFC moderne : 25 combats professionnels, 25 finitions. Il n'a jamais, de toute sa carriere, entendu un tableau de scores des juges. Ni en tant que vainqueur, ni en tant que perdant. Chacun de ses combats se termine avec quelqu'un au sol, generalement en moins d'un round. Le gars a sept victoires en moins de 60 secondes. Il detenait le record du KO le plus rapide de l'histoire des poids legers de l'UFC (7 secondes contre Frevola). Si vous clignez des yeux, c'est rate.
        </p>
        <p class="mb-4">
          Le probleme ? Cette meme explosivite qui fait de lui un highlight ambulant le rend aussi vulnerable. McKinney a ete fini cinq fois a l'UFC, toujours quand l'agressivite se transforme en imprudence. Drew Dober, Ismael Bonfim, Nazim Sadykhov, Esteban Ribovics, Chris Duncan. Tous ont trouve la faille dans l'armure. Son record de 7-5 a l'UFC raconte une histoire de volatilite pure : chaque combat est un pile ou face, et le resultat arrive vite.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Le Canadien Qui S'est Reinvente</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Kyle Nelson</strong> n'a pas le meme eclat. Il a commence son parcours a l'UFC avec un TKO contre Carlos Diego Ferreira en 2018 (defaite) et a eu besoin de temps pour se trouver. Il est passe par des hauts et des bas chez les poids plumes avant de prendre la decision intelligente de monter chez les poids legers, ou il semble plus a l'aise. La victoire par decision unanime contre Matt Frevola en octobre 2025 a montre un Nelson plus mature, plus patient et plus dangereux a distance.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Seattle Sera le Theatre du Chaos</h3>
        <p class="mb-4">
          McKinney retourne dans le nord-ouest des Etats-Unis, pres de sa ville natale de Spokane. Mais il vient d'une defaite par anaconda choke contre Chris Duncan en decembre. Nelson arrive sur une victoire solide. Le Canadien sait qu'il doit survivre les premieres minutes, parce que si McKinney ne vous finit pas rapidement, le combat commence a lui echapper. C'est exactement la que Nelson peut etre dangereux.
        </p>
      `,
      stakes: [
        { dimensao: 'Classement', fighter1: 'Non classe, en quete de pertinence', fighter2: 'Non classe, en quete d\'une serie' },
        { dimensao: 'Objectif', fighter1: 'Serie de victoires et top 15', fighter2: 'S\'etablir chez les poids legers' },
        { dimensao: 'Recit', fighter1: 'Prouver qu\'il peut etre constant', fighter2: 'Montrer que les poids legers sont sa place' },
        { dimensao: 'Risque', fighter1: 'Troisieme defaite en quatre combats', fighter2: 'Defaite rapide contre un finisseur explosif' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'T.WRECKS DETRUIT A DOMICILE',
          subtitulo: 'McKinney finit Nelson en moins d\'un round devant le public de Seattle',
          consequencias: [
            { tag: 'ELAN', texto: 'McKinney retrouve confiance et enchaine deux victoires consecutives, se reinserant dans la conversation des poids legers' },
            { tag: 'CLASSEMENT', texto: 'Avec trois victoires sur les quatre dernieres, McKinney pourrait entrer dans le top 15 avec une victoire significative de plus' },
            { tag: 'RECIT', texto: 'L\'histoire du poids leger le plus explosif gagne un nouveau chapitre de highlight reel' },
          ],
          proxima_luta: 'McKinney vs un adversaire classe dans le top 15 des poids legers',
        },
        fighter2_vence: {
          titulo: 'LE MONSTER FAIT TAIRE SEATTLE',
          subtitulo: 'Nelson survit a la tempete initiale et finit McKinney quand l\'agressivite se transforme en imprudence',
          consequencias: [
            { tag: 'ASCENSION', texto: 'Nelson prouve qu\'il a sa place chez les poids legers avec une victoire significative sur un nom connu' },
            { tag: 'SERIE', texto: 'Deux victoires consecutives chez les poids legers positionnent Nelson pour des adversaires classes' },
            { tag: 'RECIT', texto: 'La reinvention du veteran canadien gagne en credibilite' },
          ],
          proxima_luta: 'Nelson vs un gardien de porte classe chez les poids legers',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Terrance McKinney',
        color: 'red',
        recent_fights: [
          { date: 'Dec 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Soumis par anaconda choke a 2:30 du R1. Duncan a capitalise sur l\'agressivite excessive de McKinney.' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Fini avec une guillotine montee en seulement 55 secondes. Domination absolue des la premiere seconde.' },
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1 (coups de poing)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'A arrete Hadzovic avec du ground and pound a 2:01 du R1. Encore une finition rapide.' },
          { date: 'Mai 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1 (head kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO par coup de pied a la tete au debut du R1. Vulnerabilite defensive exposee.' },
          { date: 'Oct 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Fini en seulement 20 secondes. Encore un highlight instantane.' },
        ],
        full_fight_history: [
          { date: 'Jun 2021', opponent: 'Matt Frevola', result: 'W', method: 'KO R1 (0:07)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Debut a l\'UFC avec le KO le plus rapide de l\'histoire des poids legers' },
          { date: 'Nov 2021', opponent: 'Fares Ziam', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Fini par etranglement arriere au R1' },
          { date: 'Mar 2022', opponent: 'Drew Dober', result: 'L', method: 'TKO R1', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bon', note: 'Premier vrai test, premiere defaite a l\'UFC' },
          { date: 'Jan 2023', opponent: 'Ismael Bonfim', result: 'L', method: 'KO R2 (genou volant)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO par genou volant au R2' },
          { date: 'Jul 2023', opponent: 'Nazim Sadykhov', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Soumis au R2 par etranglement arriere' },
          { date: 'Aou 2023', opponent: 'Mike Breeden', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire rapide par TKO' },
          { date: 'Oct 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Fini en 20 secondes' },
          { date: 'Mai 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO par head kick' },
          { date: 'Fev 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'TKO par ground and pound' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Guillotine montee en 55 secondes' },
          { date: 'Dec 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Soumis par anaconda choke' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Stable (avec reserves)',
        momentum_trend: 'resilient',
        momentum_note: 'McKinney est la definition des montagnes russes. Il a battu Hadzovic et Borshchev de maniere impressionnante, puis a perdu contre Duncan juste apres. Le schema se repete : victoires explosives suivies de defaites par imprudence. On ne peut pas faire confiance a la regularite, mais le potentiel explosif est toujours la.',
      },
      fighter2: {
        nome: 'Kyle Nelson',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Matt Frevola', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Premier combat chez les poids legers. Victoire solide par decision unanime contre un veteran endurant. A montre patience et adaptation.' },
          { date: 'Sep 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1 (coudes et coups de poing)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Arrete au premier round par coudes et coups de poing. A remplace Calvin Kattar au dernier moment.' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'TKO au premier round contre Algeo. Finition rapide et efficace.' },
          { date: 'Sep 2023', opponent: 'Fernando Padilla', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire constante par decision unanime. Travail complet sur 3 rounds.' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire par decision unanime a l\'UFC 289. Performance solide.' },
        ],
        full_fight_history: [
          { date: 'Dec 2018', opponent: 'Carlos Diego Ferreira', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bon', note: 'Debut a l\'UFC, defaite contre un combattant experimente' },
          { date: 'Sep 2019', opponent: 'Marco Polo Reyes', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Premiere victoire a l\'UFC' },
          { date: 'Sep 2020', opponent: 'Billy Quarantillo', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'KO au troisieme round' },
          { date: 'Jul 2022', opponent: 'Jai Herbert', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Defaite par decision unanime' },
          { date: 'Fev 2023', opponent: 'Choi Doo-ho', result: 'D', method: 'Egalite Majoritaire', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Egalite majoritaire dans un combat equilibre' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire aux points' },
          { date: 'Sep 2023', opponent: 'Fernando Padilla', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Faible', note: 'Victoire constante' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'TKO rapide' },
          { date: 'Sep 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Arrete au R1 en combat de derniere minute' },
          { date: 'Oct 2025', opponent: 'Matt Frevola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Moyen', note: 'Debut chez les poids legers, victoire aux points' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'En Ascension',
        momentum_trend: 'ascending',
        momentum_note: 'Nelson vient d\'une victoire importante lors de ses debuts chez les poids legers contre Frevola. Apres des annees d\'oscillation chez les poids plumes, le changement de categorie semble avoir donne un nouveau souffle a sa carriere. La defaite contre Garcia etait un combat accepte au dernier moment, donc le contexte attenue. Deux victoires sur les trois derniers combats, la plus recente etant la plus mature de sa carriere.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'McKinney',
        media_oponentes: 2,
        media_oponentes_label: 'Moyen',
        aproveitamento: '7W-5L (58%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Nelson',
        media_oponentes: 2,
        media_oponentes_label: 'Moyen',
        aproveitamento: '5W-5L-1D (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Matt Frevola est l\'adversaire commun. McKinney l\'a mis KO en 7 secondes lors de ses debuts a l\'UFC (2021). Nelson l\'a battu par decision unanime en octobre 2025. Des approches completement differentes contre le meme adversaire revelent les styles contrastes des deux combattants.',
    },

    oponente_comum: {
      oponente_nome: 'Matt Frevola',
      fighter1_result: {
        resultado: 'Victoire par KO',
        metodo: 'KO R1 (0:07)',
        duracao: '7 secondes',
        contexto: 'McKinney est entre comme remplacant de derniere minute et a detruit Frevola avec un blitz immediat. Sept secondes. Le KO le plus rapide de l\'histoire des poids legers de l\'UFC. Frevola n\'a meme pas eu le temps de reagir.',
        performance: 'Performance iconique. A defini McKinney comme une force de la nature chez les poids legers. Le genre de finition qui devient legendaire. Cependant, c\'etait en 2021, et McKinney a depuis montre que la meme agressivite peut etre une arme a double tranchant.',
        evento: 'UFC 263',
        data: 'Jun 2021',
      },
      fighter2_result: {
        resultado: 'Victoire par Decision Unanime',
        metodo: 'Decision Unanime (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Nelson a fait ses debuts chez les poids legers et a surpasse Frevola sur trois rounds complets. A utilise le jab, le controle de la distance et l\'intelligence tactique pour gagner clairement. Sans precipitation, sans risque inutile.',
        performance: 'Performance mature qui a contraste avec le style de Nelson chez les poids plumes. A montre que le changement de categorie a apporte plus de patience et de controle. Ce n\'etait pas passionnant, mais c\'etait efficace.',
        evento: 'UFC Fight Night 262',
        data: 'Oct 2025',
      },
      insight: 'Deux styles completement opposes contre le meme adversaire. McKinney a detruit Frevola en 7 secondes avec une violence pure. Nelson l\'a battu en 15 minutes avec patience et technique. Cette comparaison resume parfaitement ce qu\'il faut attendre de ce combat : explosion contre regularite, risque contre controle.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Frappes Sig. par Minute', valueA: 6.96, valueB: 3.51, maxVal: 8, format: 'decimal', note: 'McKinney a le 4e plus haut SLpM de l\'histoire des poids legers' },
        { label: 'Precision des Frappes (%)', valueA: 48, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Frappes Encaissees/Min', valueA: 3.46, valueB: 4.20, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Estimation basee sur les donnees disponibles pour Nelson' },
        { label: 'Defense de Frappes (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Takedowns par 15 Min', valueA: 2.50, valueB: 1.06, maxVal: 5, format: 'decimal' },
        { label: 'Precision de Takedown (%)', valueA: 50, valueB: 20, maxVal: 100, format: 'percent' },
        { label: 'Defense de Takedown (%)', valueA: 68, valueB: 73, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '31 ans', fighter2: '34 ans', note: 'McKinney 3 ans plus jeune' },
        { label: 'Taille', fighter1: '1,78m (5\'10")', fighter2: '1,80m (5\'11")', note: 'Nelson 1 pouce plus grand' },
        { label: 'Allonge', fighter1: '187cm (73.5")', fighter2: '180cm (71")', note: 'McKinney avec 2.5 pouces d\'avantage' },
        { label: 'Stance', fighter1: 'Switch', fighter2: 'Switch', note: 'Les deux combattent en switch stance' },
        { label: 'Salle', fighter1: 'Fusion X-Cel, Orlando, FL', fighter2: 'House of Champions, Ontario, CA', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Explosivite et Vitesse', valueA: 92, valueB: 55, labelA: 'Excellent', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'McKinney est l\'un des combattants les plus explosifs de l\'UFC. Sept finitions en moins de 60 secondes.' },
        { label: 'Volume de Frappe', valueA: 85, valueB: 55, labelA: 'Tres Bon', labelB: 'Bon', advantage: 'fighter1', advantage_note: 'McKinney place 6.96 frappes sig. par minute, presque le double de Nelson (3.51).' },
        { label: 'Defense et Discipline', valueA: 35, valueB: 58, labelA: 'Moyen', labelB: 'Bon', advantage: 'fighter2', advantage_note: 'McKinney n\'a que 43% de defense de frappes. Nelson est plus discipline avec 51%.' },
        { label: 'Lutte Offensive', valueA: 70, valueB: 40, labelA: 'Bon', labelB: 'Moyen', advantage: 'fighter1', advantage_note: 'McKinney avec 50% de precision en takedown, bien superieur aux 20% de Nelson.' },
        { label: 'Endurance et Cardio', valueA: 40, valueB: 65, labelA: 'Moyen', labelB: 'Bon', advantage: 'fighter2', advantage_note: 'McKinney n\'a jamais ete aux points. Nelson a 7 victoires par decision et de l\'experience sur 3 rounds complets.' },
        { label: 'Jeu au Sol (Grappling)', valueA: 72, valueB: 45, labelA: 'Bon', labelB: 'Moyen', advantage: 'fighter1', advantage_note: 'McKinney a 9 soumissions en carriere. Nelson en a 4. Avantage clair au grappling.' },
      ],
      insight: 'Ce matchup c\'est la vitesse contre l\'endurance. McKinney domine en explosivite, volume de frappes et grappling offensif. Nelson a l\'avantage en discipline defensive et endurance. Si le combat est rapide, c\'est celui de McKinney. Si Nelson survit les premieres minutes et impose un combat long, la donne change completement.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'McKinney',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 9, percent: 53 },
        decision: { count: 0, percent: 0 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'Nelson',
        ko_tko: { count: 6, percent: 35 },
        submission: { count: 4, percent: 24 },
        decision: { count: 7, percent: 41 },
        total_wins: 17,
      },
      insight: 'Le contraste ne pourrait pas etre plus grand. McKinney a ZERO victoire par decision dans toute sa carriere. Chacune de ses 17 victoires est venue par finition, reparties presque egalement entre KO (8) et soumissions (9). Nelson est bien plus equilibre, avec 41% par decision. Cela confirme que McKinney cherche toujours la fin rapide, tandis que Nelson peut s\'adapter aux combats longs.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'AVANTAGE McKINNEY',
          color: 'red',
          title: 'Zone de Destruction',
          description: 'Le premier round est la ou McKinney vit. Sept finitions en moins d\'une minute. Le record de 7 secondes contre Frevola. Si Nelson n\'est pas 100% concentre des la premiere seconde, le combat pourrait se terminer avant qu\'il ait le temps de respirer. McKinney va entrer comme un taureau et chercher le KO ou le takedown immediat. Nelson doit survivre cette tempete a tout prix.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRE',
          color: 'gold',
          title: 'Le Point d\'Inflexion',
          description: 'Si Nelson survit au premier round, la dynamique change. McKinney commence a ralentir quand il ne reussit pas la finition rapide, et historiquement ses defaites viennent quand le combat s\'etend. Nelson peut commencer a trouver le timing et utiliser le jab a distance. C\'est ici que le combat se decide : si McKinney a encore du gaz pour un autre blitz ou si Nelson prend le controle.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'AVANTAGE NELSON',
          color: 'green',
          title: 'Eaux Inconnues pour McKinney',
          description: 'McKinney n\'a jamais atteint le troisieme round en tant que vainqueur. Si le combat arrive ici, c\'est signe que Nelson a survecu au pire et a maintenant l\'avantage de l\'experience en combats longs. Le Canadien a 7 victoires par decision et sait travailler les rounds. McKinney a ce stade serait en territoire completement inconnu.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Presque a la Maison', fighter: 'McKinney', risk_level: 'POSITIF', risk_color: 'green', description: 'McKinney est de Spokane, Washington, a quelques heures de Seattle. Le public du Climate Pledge Arena aura une part significative de fans locaux.' },
        { icon: 'AlertTriangle', title: 'Vulnerabilite Defensive', fighter: 'McKinney', risk_level: 'RISQUE ELEVE', risk_color: 'red', description: 'Avec seulement 43% de defense de frappes et 5 finitions subies en 12 combats UFC, McKinney est extremement vulnerable quand l\'agressivite se transforme en exposition.' },
        { icon: 'Zap', title: 'Pouvoir de Finition Historique', fighter: 'McKinney', risk_level: 'ENORME POSITIF', risk_color: 'green', description: '25 combats professionnels, 25 finitions. Cette statistique est presque incomprehensible dans le MMA moderne. McKinney trouve TOUJOURS un moyen de terminer le combat, en bien ou en mal.' },
        { icon: 'TrendingUp', title: 'Reinvention chez les Poids Legers', fighter: 'Nelson', risk_level: 'POSITIF', risk_color: 'green', description: 'Nelson semble avoir trouve sa categorie ideale chez les poids legers. Plus a l\'aise physiquement et montrant plus de patience tactique lors de la victoire contre Frevola.' },
        { icon: 'Clock', title: 'Defaite Recente', fighter: 'McKinney', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'McKinney vient d\'une defaite contre Chris Duncan en decembre 2025. Les defaites consecutives ne sont pas nouvelles pour lui, mais le schema de hauts et bas souleve des questions sur la mentalite.' },
        { icon: 'Shield', title: 'Menton Questionnable', fighter: 'Nelson', risk_level: 'RISQUE MOYEN', risk_color: 'yellow', description: 'Nelson a ete fini au R1 par Steve Garcia et par Billy Quarantillo. Face a l\'explosivite de McKinney, son menton sera teste immediatement.' },
        { icon: 'Brain', title: 'Experience en Combats Longs', fighter: 'Nelson', risk_level: 'POSITIF', risk_color: 'green', description: 'Avec 7 victoires par decision, Nelson sait gerer des combats de 3 rounds. McKinney n\'a jamais gagne aux points. Si le combat s\'etend, Nelson a l\'experience que McKinney n\'a pas.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'McKinney',
        total_probability: 57,
        scenarios: [
          { name: 'Blitz Devastateur', probability: 30, method: 'KO/TKO R1', description: 'McKinney avance des la premiere seconde. Pression immediate, combinaisons rapides, et recherche du KO avant que Nelson ne s\'installe. Le scenario le plus probable de tous : McKinney detruisant son adversaire en moins d\'une minute.' },
          { name: 'Soumission Eclair', probability: 17, method: 'Sub R1-R2', description: 'McKinney emmene le combat au sol et trouve une guillotine, RNC ou anaconda dans les echanges de grappling sauvages. Avec 9 soumissions en carriere, le sol est aussi dangereux que les pieds pour McKinney.' },
          { name: 'TKO par Accumulation', probability: 10, method: 'TKO R2', description: 'McKinney blesse Nelson au R1 sans finir, puis complete le travail au R2 avec du ground and pound quand Nelson est deja affaibli.' },
        ],
      },
      fighter2: {
        nome: 'Nelson',
        total_probability: 40,
        scenarios: [
          { name: 'Survivre et Conquerir', probability: 18, method: 'Decision Unanime', description: 'Nelson resiste a la tempete initiale, defend les takedowns et commence a travailler le jab et le volume aux R2 et R3. McKinney ralentit et Nelson gagne aux points.' },
          { name: 'Contre Fatal', probability: 12, method: 'KO/TKO R1-R2', description: 'McKinney avance de maniere imprudente et Nelson place un contre propre a l\'entree. L\'agressivite de McKinney devient son propre piege.' },
          { name: 'Finition sur Opportunite', probability: 10, method: 'TKO R2-R3', description: 'Avec McKinney epuise apres un R1 intense sans finition, Nelson commence a trouver des ouvertures et arrete le combat avec des frappes au R2 ou R3.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Terrance McKinney',
      winner_side: 'fighter1',
      predicted_method: 'TKO/KO R1',
      confidence_score: 5,
      confidence_label: 'MOYENNE',
      explanation: 'McKinney est tout simplement trop explosif dans les premieres minutes pour la plupart des adversaires. Avec 6.96 frappes significatives par minute et sept finitions en moins de 60 secondes, il apporte un niveau de pression initiale que peu peuvent supporter. Nelson a un menton questionnable (arrete par Garcia et Quarantillo au R1/R3) et pourrait ne pas resister au blitz de McKinney. Cependant, la confiance n\'est que MOYENNE car McKinney est incroyablement imprevisible. Il pourrait detruire Nelson en 10 secondes ou se faire KO sur un contre a l\'entree. Chaque combat est un pari.',
      x_factor: {
        title: 'Les 90 Premieres Secondes',
        description: 'Le combat entier sera probablement decide dans la premiere minute et demie. Si McKinney touche quelque chose de gros dans cette fenetre, c\'est fini. Si Nelson survit, la dynamique change radicalement en faveur du Canadien.',
      },
      upset_alert: {
        title: 'Le Contre a l\'Entree',
        description: 'McKinney avance avec sa garde basse et est historiquement vulnerable aux contres. Ribovics l\'a KO avec un head kick a l\'entree. Si Nelson a le timing pour un uppercut ou crochet propre quand McKinney avance, la surprise peut arriver.',
      },
      probabilities: {
        fighter1: { nome: 'McKinney', percent: 57 },
        fighter2: { nome: 'Nelson', percent: 40 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'McKinney (-142)', reasoning: 'Leger favori avec un pouvoir de finition massif. La ligne reflete l\'imprevisibilite : McKinney devrait etre plus favori vu le potentiel offensif, mais les defaites frequentes equilibrent.' },
        method: { pick: 'Le combat ne va pas aux points', reasoning: 'McKinney n\'est JAMAIS alle aux points en 25 combats. Nelson a des finitions et a ete fini plusieurs fois. La probabilite d\'aller aux juges est tres faible.' },
        over_under: { pick: 'Under 1.5 rounds', rounds: 1.5, reasoning: 'Sur les 25 combats de McKinney, la grande majorite s\'est terminee au R1. Nelson a aussi des finitions et a ete arrete tot. Tout pointe vers un combat court.' },
        best_value: 'Under 1.5 rounds est le pari avec le meilleur rapport. Les deux combattants ont un historique de combats qui se terminent vite, et McKinney passe rarement le premier round.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Les 30 Premieres Secondes', icon: 'Zap', description: 'McKinney termine les combats avant que la plupart des gens ne soient installes dans leur canape. Attention maximale des le toucher de gants. S\'il touche quelque chose de propre dans les 30 premieres secondes, le combat pourrait se terminer la. Nelson doit etre pret pour le chaos immediat.' },
        { num: 2, title: 'La Defense de Takedown de Nelson', icon: 'Shield', description: 'Nelson a 73% de defense de takedown, un chiffre solide. Mais il n\'a jamais affronte quelqu\'un d\'aussi explosif dans les entrees que McKinney. Si Nelson defend les deux ou trois premiers takedowns, sa confiance monte et McKinney pourrait commencer a hesiter.' },
        { num: 3, title: 'Le Cardio de McKinney Apres le R1', icon: 'Activity', description: 'McKinney n\'a jamais gagne par decision. Si le combat atteint le R2, observez son rythme. Historiquement, quand McKinney n\'obtient pas la finition rapide, il ralentit significativement. C\'est le moment ou Nelson peut retourner le combat.' },
        { num: 4, title: 'Le Switch Stance des Deux', icon: 'Eye', description: 'Les deux combattent en switch stance. Celui qui controle mieux les angles dans les changements de garde aura l\'avantage au striking. Observez qui est plus a l\'aise en passant de l\'orthodoxe au southpaw et vice-versa.' },
        { num: 5, title: 'L\'Allonge de McKinney', icon: 'Target', description: 'McKinney a 2.5 pouces d\'allonge de plus que Nelson (73.5" vs 71"). Cet avantage pourrait etre decisif au jab et aux coups droits. Si McKinney utilise la distance avant d\'avancer, il peut controler le centre de l\'octogone plus facilement.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'BOMBE A RETARDEMENT', content: 'McKINNEY vs NELSON\nUFC Fight Night | 28 mars\nSeattle, Washington\n\n25 combats. 25 finitions.\nMcKinney n\'a JAMAIS ete aux points.', color: 'red' },
        { slide_number: 2, title: 'T.WRECKS : LA STAT ABSURDE', content: '17 victoires en carriere\n8 par KO/TKO\n9 par soumission\n0 par decision\n\n7 finitions en moins de 60 sec\nKO le plus rapide des legers : 7 sec\n6.96 frappes par minute\n(Top 4 de l\'HISTOIRE des legers)', color: 'red' },
        { slide_number: 3, title: 'THE MONSTER', content: 'Kyle Nelson | 17-6-1\n\nReinvention chez les legers\nVictoire UD vs Frevola\n6 KOs + 4 soumissions + 7 decisions\nStyle equilibre et patient\n73% defense de takedown\n\nVeteran canadien en quete de serie', color: 'blue' },
        { slide_number: 4, title: 'L\'ADVERSAIRE COMMUN', content: 'Matt Frevola\n\nMcKinney : KO en 7 SECONDES\n(Record des poids legers)\n\nNelson : Decision Unanime\n(3 rounds complets)\n\nExplosion vs Patience.', color: 'gold' },
        { slide_number: 5, title: 'PRONOSTIC', content: 'McKINNEY par TKO/KO R1\n\nConfiance : MOYENNE\n57% McKinney / 40% Nelson\n\nSi ca dure plus de 2 min ?\nNelson devient favori.\nSinon ? Highlight reel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'McKinney vs Nelson est le combat que vous ne POUVEZ PAS manquer sur ce card. T.Wrecks a 25 combats pro et ZERO decisions. Jamais. 17 victoires, 8 defaites, toutes par finition. Thread :' },
        { num: '2/6', text: 'McKinney (17-8) : 6.96 frappes par minute (top 4 dans l\'histoire des legers), 7 finitions en moins de 60 secondes, KO le plus rapide de l\'histoire des legers (7 sec). Le probleme ? 5 finitions subies a l\'UFC. C\'est un pile ou face a chaque fois.' },
        { num: '3/6', text: 'Nelson (17-6-1) : Canadien reinvente chez les legers. A battu Frevola par decision unanime. Style plus patient et mature. 73% defense de takedown. 7 victoires par decision. Sait gerer les rounds.' },
        { num: '4/6', text: 'Detail interessant : les deux ont affronte Frevola. McKinney l\'a KO en 7 SECONDES. Nelson a gagne par decision en 15 minutes. Deux styles completement opposes contre le meme gars. Ca dit tout.' },
        { num: '5/6', text: 'Pari de valeur : Under 1.5 rounds. McKinney n\'est jamais alle aux points en 25 combats. JAMAIS. Nelson a aussi des finitions au R1. Tout pointe vers un combat court. Si vous voulez de l\'action, branchez-vous des la premiere seconde.' },
        { num: '6/6', text: 'Mon pronostic : McKinney par TKO/KO au R1. Mais attention, la confiance est MOYENNE. McKinney pourrait detruire Nelson en 10 secondes ou se faire KO sur un contre a l\'entree. Ce combat c\'est du chaos pur.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '25 combats professionnels. Zero decisions. Terrance McKinney n\'a JAMAIS entendu les juges de sa vie. Et samedi, il affronte Kyle Nelson a Seattle. Si vous clignez des yeux, vous pourriez rater le combat entier.' },
        { time: '10-25s', title: 'Contexte', text: 'McKinney c\'est le gars qui a KO Frevola en 7 secondes, qui a 6.96 frappes par minute, qui a 7 finitions en moins d\'une minute. Mais c\'est aussi le gars avec 5 defaites par finition a l\'UFC. Nelson c\'est l\'oppose : patient, veteran, reinvente chez les legers apres des annees chez les plumes.' },
        { time: '25-40s', title: 'Analyse', text: 'La question est simple : Nelson survit-il aux 90 premieres secondes ? Si oui, le combat change. McKinney n\'a jamais gagne par decision. Nelson en a 7. Si ca passe le R1, Nelson est favori. Sinon, McKinney ajoute un highlight reel. Detail : les deux ont affronte Frevola. McKinney, KO en 7 secondes. Nelson, decision en 15 minutes. C\'est tout ce que vous devez savoir.' },
        { time: '40-55s', title: 'Pronostic', text: 'Mon appel : McKinney par TKO au R1, mais avec une confiance MOYENNE. Il peut detruire n\'importe qui dans les premieres secondes, mais il peut aussi se faire KO sur un contre. Under 1.5 rounds est le meilleur pari du card.' },
        { time: '55-65s', title: 'CTA', text: 'Qui gagne ? Commentez McKINNEY ou NELSON. Si vous avez aime, suivez pour l\'analyse complete de l\'UFC Fight Night Adesanya vs Pyfer.' },
      ],
      tiktok: [
        { hook: '25 combats. ZERO decisions. Ce gars n\'a JAMAIS entendu les juges de sa vie.', body: 'Terrance McKinney a 17 victoires et 8 defaites. Toutes par finition. Chaque. Combat. KO Frevola en 7 SECONDES. 7 victoires en moins d\'une minute. Samedi il affronte Kyle Nelson a Seattle. Si vous clignez des yeux, c\'est rate.', cta: 'McKinney ou Nelson ? Commentez !' },
        { hook: 'Meme victime. Styles COMPLETEMENT opposes.', body: 'McKinney a KO Frevola en 7 SECONDES. KO le plus rapide des legers de l\'UFC. Nelson ? A battu le meme Frevola par decision unanime. 15 minutes entieres. Maintenant ils s\'affrontent. Explosion contre patience. Qui gagne ?', cta: 'Suivez pour l\'analyse complete !' },
        { hook: 'La stat la plus ABSURDE de l\'UFC.', body: '25 combats professionnels. 17 victoires. 8 defaites. ZERO decisions. Terrance McKinney n\'a jamais, JAMAIS entendu un tableau de scores. Chaque combat se termine avec quelqu\'un au sol. 6.96 frappes par minute, top 4 dans l\'HISTOIRE des legers. Mais 43% de defense de frappes. Il vit sur le fil du rasoir.', cta: 'Vous parieriez sur lui ? Commentez !' },
      ],
      headlines: [
        'McKinney vs Nelson : 25 Combats, Zero Decisions et le Chaos Garanti a Seattle',
        'T.Wrecks Cherche la Rehabilitation Contre le Canadien Reinvente chez les Legers',
        'L\'Adversaire Commun : 7 Secondes vs 15 Minutes Contre le Meme Gars',
        'McKinney a Seattle : Le Finisseur le Plus Explosif de l\'UFC Retourne dans le Pacific Northwest',
        'Kyle Nelson Peut-il Survivre a la Bombe a Retardement des Poids Legers ?',
        'Under 1.5 Rounds : Pourquoi ce Combat Pourrait Etre le Plus Court du Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-142',
        fighter2_odds: '+120',
        fighter1_name: 'Terrance McKinney',
        fighter2_name: 'Kyle Nelson',
        source: 'Moyenne des bookmakers (mars 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Taux de Finition de 100%', stat_headline: '25 COMBATS PROFESSIONNELS, 25 FINITIONS. ZERO DECISIONS EN CARRIERE.', contexto: 'McKinney n\'est jamais alle aux points de toute sa carriere professionnelle. Chaque combat finit tot, victoire ou defaite.', implicacao_aposta: 'Under 1.5 rounds a une forte valeur. La probabilite d\'aller aux points est historiquement zero pour McKinney.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Volume de Frappes Absurde', stat_headline: '6.96 FRAPPES SIGNIFICATIVES PAR MINUTE, TOP 4 DANS L\'HISTOIRE DES POIDS LEGERS', contexto: 'McKinney decharge un volume de frappes que peu peuvent supporter. La moyenne UFC est d\'environ 4.0 SLpM. McKinney est presque au double.', implicacao_aposta: 'Favorise McKinney au R1, ou le volume est le plus devastateur.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Defense de Frappes Preoccupante', stat_headline: 'McKINNEY AVEC SEULEMENT 43% DE DEFENSE DE FRAPPES, 5 FINITIONS SUBIES A L\'UFC', contexto: 'La meme agressivite qui genere des KO genere de l\'exposition. McKinney a ete fini par Dober, Bonfim, Sadykhov, Ribovics et Duncan.', implicacao_aposta: 'Nelson par contre n\'est pas un scenario irrealiste. Valeur dans Nelson par KO/TKO.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Nelson avec Defense TD Superieure', stat_headline: 'NELSON AVEC 73% DE DEFENSE DE TAKEDOWN vs 68% POUR McKINNEY', contexto: 'Chiffre solide de Nelson pour defendre la lutte de McKinney, bien qu\'il n\'ait jamais affronte un lutteur aussi explosif.', implicacao_aposta: 'Si Nelson defend les takedowns initiaux, le combat pourrait s\'etendre au-dela du R1.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'McKinney N\'a Jamais Gagne par Decision', stat_headline: '0 VICTOIRES PAR DECISION EN 17 VICTOIRES EN CARRIERE', contexto: 'Si le combat est long, Nelson a l\'experience (7 victoires par decision). McKinney est en territoire inconnu apres le R1.', implicacao_aposta: 'Parier sur McKinney par decision va contre toute l\'evidence historique.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-110', confianca: 'alta', edge_vs_mercado: 'McKinney n\'est jamais alle aux points. 25 combats, 25 finitions. La plupart finissent au R1.', raciocinio: 'La convergence des donnees est ecrasante. McKinney finit ou est fini tot. Nelson a aussi un historique de combats courts (arrete par Garcia au R1). Probabilite tres elevee de finir avant le R2.' },
        { tipo: 'Methode', pick: 'Ne va pas aux points', odds: '-250', confianca: 'alta', raciocinio: 'McKinney n\'est JAMAIS alle aux points en 25 combats professionnels. La probabilite de finir dans la distance est ecrasante, quel que soit le vainqueur.' },
        { tipo: 'Moneyline', pick: 'McKinney (-142)', odds: '-142', confianca: 'media', edge_vs_mercado: 'Ligne juste qui reflete l\'imprevisibilite de McKinney.', raciocinio: 'McKinney a un avantage clair en explosivite et pouvoir de finition. A -142, le prix est juste. Pas une aubaine, mais reflete le favori correct.' },
        { tipo: 'Methode', pick: 'McKinney par KO/TKO R1', odds: '+150', confianca: 'media', raciocinio: 'Le scenario individuel le plus probable. McKinney a un historique massif de finitions au premier round. Cotes decentes pour le scenario avec la plus haute probabilite individuelle.' },
      ],
      armadilha: {
        titulo: 'Piege : McKinney par Decision',
        descricao: 'McKinney n\'a jamais gagne par decision de toute sa carriere. Zero. Rien. Parier sur McKinney par decision c\'est parier sur quelque chose qui n\'est litteralement jamais arrive en 25 combats professionnels. Si le combat va a la distance, Nelson est le favori aux points.',
      },
      disclaimer: 'Analyse statistique a titre informatif. Pariez de maniere responsable.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// SPANISH TRANSLATION
// ═══════════════════════════════════════════════════════════════
const analiseES: FullSingleAnalise = {
  id: 'mckinney-vs-nelson',
  evento_id: null,
  slug: 'mckinney-vs-nelson',
  titulo: 'McKinney vs Nelson: Bomba de Relojeria en el Peso Ligero',
  subtitulo: 'El finalizador mas explosivo del UFC enfrenta al canadiense durable en Seattle',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,78m', envergadura: '187cm', idade: 31, academia: 'Fusion X-Cel' },
      fighter2: { altura: '1,80m', envergadura: '180cm', idade: 34, academia: 'House of Champions' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'TKO R1',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Terrance McKinney',
    record: '17-8-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Chris Duncan', method: 'Sub R1 (anaconda choke)', event: 'UFC 323' },
      { result: 'W', opponent: 'Viacheslav Borshchev', method: 'Sub R1 (guillotine)', event: 'UFC 317' },
      { result: 'W', opponent: 'Damir Hadzovic', method: 'TKO R1', event: 'UFC Fight Night 250' },
    ],
  },
  fighter2_info: {
    nome: 'Kyle Nelson',
    record: '17-6-1',
    ultimasLutas: [
      { result: 'W', opponent: 'Matt Frevola', method: 'Decision Unanime', event: 'UFC Fight Night 262' },
      { result: 'L', opponent: 'Steve Garcia', method: 'TKO R1', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Bill Algeo', method: 'TKO R1', event: 'UFC on ESPN 54' },
    ],
  },
  evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
  evento_data: '28 de marzo, 2026',
  evento_local: 'Climate Pledge Arena, Seattle, Washington',
  categoria_peso: 'Peso Ligero (155 lbs)',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de marzo, 2026',
      evento_local: 'Climate Pledge Arena, Seattle, Washington',
      categoria_peso: 'Peso Ligero (155 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'Bomba de Relojeria en el Peso Ligero',
      tagline_sub: '25 peleas, 25 finalizaciones. T.Wrecks nunca fue a decision en su vida.',
      fighter1: {
        nome_completo: 'Terrance "T.Wrecks" McKinney',
        apelido: 'T.Wrecks',
        sobrenome: 'McKinney',
        record: '17-8-0',
        ranking: 'N/R Peso Ligero',
        info_extra: 'Spokane, Washington | 31 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-12/MCKINNEY_TERRANCE_L_12-06.png?itok=JYl1VRcp',
      },
      fighter2: {
        nome_completo: 'Kyle "The Monster" Nelson',
        apelido: 'The Monster',
        sobrenome: 'Nelson',
        record: '17-6-1',
        ranking: 'N/R Peso Ligero',
        info_extra: 'Ontario, Canada | 34 anos',
        imagem_fullbody_url: 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2025-10/NELSON_KYLE_L_10-18.png?itok=K1REGeZG',
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">El Hombre Que Nunca Escucho a los Jueces</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Terrance McKinney</strong> posee una de las estadisticas mas absurdas del UFC moderno: 25 peleas profesionales, 25 finalizaciones. Nunca, en toda su carrera, escucho una tarjeta de puntuacion de los jueces. Ni como ganador, ni como perdedor. Cada pelea suya termina con alguien en la lona, generalmente en menos de un round. El tipo tiene siete victorias en menos de 60 segundos. Tenia el record del nocaut mas rapido en la historia del peso ligero del UFC (7 segundos contra Frevola). Si parpadeas, te lo perdiste.
        </p>
        <p class="mb-4">
          El problema? Esa misma explosividad que lo convierte en un highlight ambulante tambien lo hace vulnerable. McKinney ha sido finalizado cinco veces en el UFC, siempre cuando la agresividad se convierte en descuido. Drew Dober, Ismael Bonfim, Nazim Sadykhov, Esteban Ribovics, Chris Duncan. Todos encontraron la grieta en la armadura. Su record de 7-5 en el UFC cuenta una historia de volatilidad pura: cada pelea es una moneda al aire, y el resultado sale rapido.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">El Canadiense Que Se Reinvento</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Kyle Nelson</strong> no tiene el mismo brillo. Comenzo su camino en el UFC con un TKO contra Carlos Diego Ferreira en 2018 (derrota) y necesito tiempo para encontrarse. Paso por altibajos en el peso pluma antes de tomar la decision inteligente de subir al peso ligero, donde parece mas comodo. La victoria por decision unanime contra Matt Frevola en octubre de 2025 mostro un Nelson mas maduro, mas paciente y mas peligroso a distancia.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Seattle Sera Escenario del Caos</h3>
        <p class="mb-4">
          McKinney vuelve al noroeste de EE.UU., cerca de su ciudad natal Spokane. Pero viene de una derrota por anaconda choke contra Chris Duncan en diciembre. Nelson viene de una victoria solida. El canadiense sabe que necesita sobrevivir los primeros minutos, porque si McKinney no te finaliza rapido, la pelea comienza a escaparsele de las manos. Exactamente ahi es donde Nelson puede ser peligroso.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sin ranking, buscando relevancia', fighter2: 'Sin ranking, buscando racha' },
        { dimensao: 'Objetivo', fighter1: 'Racha de victorias y top 15', fighter2: 'Consolidarse en el peso ligero' },
        { dimensao: 'Narrativa', fighter1: 'Demostrar que puede ser consistente', fighter2: 'Mostrar que el peso ligero es su lugar' },
        { dimensao: 'Riesgo', fighter1: 'Tercera derrota en cuatro peleas', fighter2: 'Derrota rapida contra finalizador explosivo' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'T.WRECKS DESTRUYE EN CASA',
          subtitulo: 'McKinney finaliza a Nelson en menos de un round frente al publico de Seattle',
          consequencias: [
            { tag: 'IMPULSO', texto: 'McKinney recupera confianza y encadena dos victorias consecutivas, reinsertandose en la conversacion del peso ligero' },
            { tag: 'RANKING', texto: 'Con tres victorias en las ultimas cuatro, McKinney podria entrar en el top 15 con una victoria significativa mas' },
            { tag: 'NARRATIVA', texto: 'La historia del peso ligero mas explosivo gana otro capitulo de highlight reel' },
          ],
          proxima_luta: 'McKinney vs un oponente ranqueado en el top 15 del peso ligero',
        },
        fighter2_vence: {
          titulo: 'THE MONSTER SILENCIA SEATTLE',
          subtitulo: 'Nelson sobrevive la tormenta inicial y finaliza a McKinney cuando la agresividad se convierte en descuido',
          consequencias: [
            { tag: 'ASCENSO', texto: 'Nelson demuestra que pertenece al peso ligero con una victoria significativa sobre un nombre conocido' },
            { tag: 'RACHA', texto: 'Dos victorias consecutivas en peso ligero posicionan a Nelson para oponentes ranqueados' },
            { tag: 'NARRATIVA', texto: 'La reinvencion del veterano canadiense gana credibilidad real' },
          ],
          proxima_luta: 'Nelson vs un guardabarrera ranqueado en peso ligero',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Terrance McKinney',
        color: 'red',
        recent_fights: [
          { date: 'Dic 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1 (anaconda choke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sometido por anaconda choke a los 2:30 del R1. Duncan capitalizo la agresividad excesiva de McKinney.' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1 (guillotine)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Finalizo con guillotina montada en solo 55 segundos. Dominio absoluto desde el primer segundo.' },
          { date: 'Feb 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1 (golpes)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Detuvo a Hadzovic con ground and pound a los 2:01 del R1. Otra finalizacion rapida.' },
          { date: 'May 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1 (head kick)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado con patada a la cabeza al inicio del R1. Vulnerabilidad defensiva expuesta.' },
          { date: 'Oct 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Finalizo en solo 20 segundos. Otro highlight instantaneo.' },
        ],
        full_fight_history: [
          { date: 'Jun 2021', opponent: 'Matt Frevola', result: 'W', method: 'KO R1 (0:07)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut en UFC con el KO mas rapido en la historia del peso ligero' },
          { date: 'Nov 2021', opponent: 'Fares Ziam', result: 'W', method: 'Sub R1 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizo con estrangulamiento trasero en R1' },
          { date: 'Mar 2022', opponent: 'Drew Dober', result: 'L', method: 'TKO R1', opponent_rank: '#15 LW', quality_score: 3, quality_label: 'Bueno', note: 'Primera prueba real, primera derrota en UFC' },
          { date: 'Ene 2023', opponent: 'Ismael Bonfim', result: 'L', method: 'KO R2 (rodillazo volador)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado por rodillazo volador en R2' },
          { date: 'Jul 2023', opponent: 'Nazim Sadykhov', result: 'L', method: 'Sub R2 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sometido en R2 por estrangulamiento trasero' },
          { date: 'Ago 2023', opponent: 'Mike Breeden', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Victoria rapida por TKO' },
          { date: 'Oct 2023', opponent: 'Brendon Marotte', result: 'W', method: 'TKO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Finalizo en 20 segundos' },
          { date: 'May 2024', opponent: 'Esteban Ribovics', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado por head kick' },
          { date: 'Feb 2025', opponent: 'Damir Hadzovic', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'TKO por ground and pound' },
          { date: 'Jun 2025', opponent: 'Viacheslav Borshchev', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Guillotina montada en 55 segundos' },
          { date: 'Dic 2025', opponent: 'Chris Duncan', result: 'L', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Sometido por anaconda choke' },
        ],
        layoff_warning: null,
        momentum_score: 5,
        momentum_label: 'Estable (con reservas)',
        momentum_trend: 'resilient',
        momentum_note: 'McKinney es la definicion de montana rusa. Vencio a Hadzovic y Borshchev de manera impresionante, pero perdio contra Duncan justo despues. El patron se repite: victorias explosivas seguidas de derrotas por descuido. No se puede confiar en la consistencia, pero el potencial explosivo siempre esta presente.',
      },
      fighter2: {
        nome: 'Kyle Nelson',
        color: 'blue',
        recent_fights: [
          { date: 'Oct 2025', opponent: 'Matt Frevola', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primera pelea en peso ligero. Victoria solida por decision unanime contra veterano durable. Mostro paciencia y adaptacion.' },
          { date: 'Sep 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1 (codos y golpes)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Detenido en el primer round por codos y golpes. Reemplazo a Calvin Kattar a ultimo momento.' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO en el primer round contra Algeo. Finalizacion rapida y eficiente.' },
          { date: 'Sep 2023', opponent: 'Fernando Padilla', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Victoria consistente por decision unanime. Trabajo completo por 3 rounds.' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'Decision Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Victoria por decision unanime en UFC 289. Rendimiento solido.' },
        ],
        full_fight_history: [
          { date: 'Dic 2018', opponent: 'Carlos Diego Ferreira', result: 'L', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bueno', note: 'Debut en UFC, derrota contra peleador experimentado' },
          { date: 'Sep 2019', opponent: 'Marco Polo Reyes', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Primera victoria en UFC' },
          { date: 'Sep 2020', opponent: 'Billy Quarantillo', result: 'L', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Noqueado en el tercer round' },
          { date: 'Jul 2022', opponent: 'Jai Herbert', result: 'L', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Derrota por decision unanime' },
          { date: 'Feb 2023', opponent: 'Choi Doo-ho', result: 'D', method: 'Empate Mayoritario', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Empate mayoritario en pelea equilibrada' },
          { date: 'Jun 2023', opponent: 'Blake Bilder', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Victoria por decision' },
          { date: 'Sep 2023', opponent: 'Fernando Padilla', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Bajo', note: 'Victoria consistente' },
          { date: 'Mar 2024', opponent: 'Bill Algeo', result: 'W', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'TKO rapido' },
          { date: 'Sep 2024', opponent: 'Steve Garcia', result: 'L', method: 'TKO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Detenido en R1 en pelea de ultima hora' },
          { date: 'Oct 2025', opponent: 'Matt Frevola', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut en peso ligero, victoria por decision' },
        ],
        layoff_warning: null,
        momentum_score: 6,
        momentum_label: 'En Ascenso',
        momentum_trend: 'ascending',
        momentum_note: 'Nelson viene de una victoria importante en su debut en peso ligero contra Frevola. Despues de anos oscilando en peso pluma, el cambio de categoria parece haberle dado nueva vida a su carrera. La derrota contra Garcia fue en una pelea aceptada a ultimo momento, asi que el contexto lo atenua. Dos victorias en las ultimas tres peleas, con la mas reciente siendo la mas madura de su carrera.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'McKinney',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '7W-5L (58%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Nelson',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '5W-5L-1D (50%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Matt Frevola es el oponente en comun. McKinney lo noqueo en 7 segundos en su debut en UFC (2021). Nelson lo derroto por decision unanime en octubre de 2025. Enfoques completamente diferentes contra el mismo oponente revelan los estilos contrastantes de ambos.',
    },

    oponente_comum: {
      oponente_nome: 'Matt Frevola',
      fighter1_result: {
        resultado: 'Victoria por KO',
        metodo: 'KO R1 (0:07)',
        duracao: '7 segundos',
        contexto: 'McKinney entro como reemplazo de ultima hora y destruyo a Frevola con un blitz inmediato. Siete segundos. El KO mas rapido en la historia del peso ligero del UFC. Frevola ni siquiera tuvo tiempo de reaccionar.',
        performance: 'Actuacion iconica. Definio a McKinney como una fuerza de la naturaleza en el peso ligero. El tipo de finalizacion que se convierte en leyenda. Sin embargo, ocurrio en 2021, y McKinney desde entonces ha demostrado que la misma agresividad puede ser un arma de doble filo.',
        evento: 'UFC 263',
        data: 'Jun 2021',
      },
      fighter2_result: {
        resultado: 'Victoria por Decision Unanime',
        metodo: 'Decision Unanime (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Nelson hizo su debut en peso ligero y supero a Frevola durante tres rounds completos. Uso el jab, control de distancia e inteligencia tactica para ganar de forma clara. Sin prisa, sin riesgo innecesario.',
        performance: 'Actuacion madura que contrasto con el estilo de Nelson en peso pluma. Mostro que el cambio de categoria trajo mas paciencia y control. No fue emocionante, pero fue eficiente.',
        evento: 'UFC Fight Night 262',
        data: 'Oct 2025',
      },
      insight: 'Dos estilos completamente opuestos contra el mismo oponente. McKinney destruyo a Frevola en 7 segundos con violencia pura. Nelson lo derroto en 15 minutos con paciencia y tecnica. Esta comparacion resume perfectamente lo que se puede esperar de esta pelea: explosion contra consistencia, riesgo contra control.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Golpes Sig. por Minuto', valueA: 6.96, valueB: 3.51, maxVal: 8, format: 'decimal', note: 'McKinney tiene el 4o mayor SLpM en la historia del peso ligero' },
        { label: 'Precision de Golpes (%)', valueA: 48, valueB: 45, maxVal: 100, format: 'percent' },
        { label: 'Golpes Absorbidos/Min', valueA: 3.46, valueB: 4.20, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Estimacion basada en datos disponibles para Nelson' },
        { label: 'Defensa de Golpes (%)', valueA: 43, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Derribos por 15 Min', valueA: 2.50, valueB: 1.06, maxVal: 5, format: 'decimal' },
        { label: 'Precision de Derribo (%)', valueA: 50, valueB: 20, maxVal: 100, format: 'percent' },
        { label: 'Defensa de Derribo (%)', valueA: 68, valueB: 73, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Edad', fighter1: '31 anos', fighter2: '34 anos', note: 'McKinney 3 anos mas joven' },
        { label: 'Altura', fighter1: '1,78m (5\'10")', fighter2: '1,80m (5\'11")', note: 'Nelson 1 pulgada mas alto' },
        { label: 'Envergadura', fighter1: '187cm (73.5")', fighter2: '180cm (71")', note: 'McKinney con 2.5 pulgadas de ventaja' },
        { label: 'Stance', fighter1: 'Switch', fighter2: 'Switch', note: 'Ambos pelean en switch stance' },
        { label: 'Gimnasio', fighter1: 'Fusion X-Cel, Orlando, FL', fighter2: 'House of Champions, Ontario, CA', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Explosividad y Velocidad', valueA: 92, valueB: 55, labelA: 'Excelente', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'McKinney es uno de los peleadores mas explosivos del UFC. Siete finalizaciones en menos de 60 segundos.' },
        { label: 'Volumen de Golpeo', valueA: 85, valueB: 55, labelA: 'Muy Bueno', labelB: 'Bueno', advantage: 'fighter1', advantage_note: 'McKinney conecta 6.96 golpes sig. por minuto, casi el doble que Nelson (3.51).' },
        { label: 'Defensa y Disciplina', valueA: 35, valueB: 58, labelA: 'Medio', labelB: 'Bueno', advantage: 'fighter2', advantage_note: 'McKinney tiene solo 43% de defensa de golpes. Nelson es mas disciplinado con 51%.' },
        { label: 'Lucha Ofensiva', valueA: 70, valueB: 40, labelA: 'Bueno', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'McKinney con 50% de precision en derribos, muy superior al 20% de Nelson.' },
        { label: 'Resistencia y Cardio', valueA: 40, valueB: 65, labelA: 'Medio', labelB: 'Bueno', advantage: 'fighter2', advantage_note: 'McKinney nunca fue a decision. Nelson tiene 7 victorias por decision y experiencia en 3 rounds completos.' },
        { label: 'Juego de Suelo (Grappling)', valueA: 72, valueB: 45, labelA: 'Bueno', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'McKinney tiene 9 sumisiones en su carrera. Nelson tiene 4. Ventaja clara en grappling.' },
      ],
      insight: 'Este enfrentamiento es velocidad contra durabilidad. McKinney domina en explosividad, volumen de golpes y grappling ofensivo. Nelson lleva ventaja en disciplina defensiva y resistencia. Si la pelea es rapida, es de McKinney. Si Nelson sobrevive los primeros minutos y fuerza una pelea larga, el juego cambia completamente.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'McKinney',
        ko_tko: { count: 8, percent: 47 },
        submission: { count: 9, percent: 53 },
        decision: { count: 0, percent: 0 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'Nelson',
        ko_tko: { count: 6, percent: 35 },
        submission: { count: 4, percent: 24 },
        decision: { count: 7, percent: 41 },
        total_wins: 17,
      },
      insight: 'El contraste no podria ser mayor. McKinney tiene CERO victorias por decision en toda su carrera. Cada una de sus 17 victorias llego por finalizacion, divididas casi equitativamente entre nocauts (8) y sumisiones (9). Nelson es mucho mas equilibrado, con 41% por decision. Esto confirma que McKinney siempre busca el final rapido, mientras Nelson puede adaptarse a peleas largas.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VENTAJA McKINNEY',
          color: 'red',
          title: 'Territorio de Destruccion',
          description: 'El primer round es donde McKinney vive. Siete finalizaciones en menos de un minuto. El record de 7 segundos contra Frevola. Si Nelson no esta 100% concentrado desde el primer segundo, la pelea podria terminar antes de que tenga tiempo de respirar. McKinney va a entrar como un toro y buscar el KO o el derribo inmediato. Nelson necesita sobrevivir esta tormenta a toda costa.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'El Punto de Inflexion',
          description: 'Si Nelson sobrevive el primer round, la dinamica cambia. McKinney comienza a desacelerar cuando no logra la finalizacion rapida, e historicamente sus derrotas llegan cuando la pelea se extiende. Nelson puede empezar a encontrar el timing y usar el jab a distancia. Aqui es donde la pelea se decide: si McKinney todavia tiene gas para otro blitz o si Nelson toma el control.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VENTAJA NELSON',
          color: 'green',
          title: 'Aguas Desconocidas para McKinney',
          description: 'McKinney nunca llego al tercer round como ganador. Si la pelea llega aqui, es senal de que Nelson sobrevivio lo peor y ahora tiene la ventaja de experiencia en peleas largas. El canadiense tiene 7 victorias por decision y sabe trabajar rounds. McKinney en este punto estaria en territorio completamente desconocido.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Casi en Casa', fighter: 'McKinney', risk_level: 'POSITIVO', risk_color: 'green', description: 'McKinney es de Spokane, Washington, a pocas horas de Seattle. El publico del Climate Pledge Arena tendra una porcion significativa de fans locales.' },
        { icon: 'AlertTriangle', title: 'Vulnerabilidad Defensiva', fighter: 'McKinney', risk_level: 'RIESGO ALTO', risk_color: 'red', description: 'Con solo 43% de defensa de golpes y 5 finalizaciones sufridas en 12 peleas UFC, McKinney es extremadamente vulnerable cuando la agresividad se convierte en exposicion.' },
        { icon: 'Zap', title: 'Poder de Finalizacion Historico', fighter: 'McKinney', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '25 peleas profesionales, 25 finalizaciones. Esta estadistica es casi incomprensible en el MMA moderno. McKinney SIEMPRE encuentra la manera de terminar la pelea, para bien o para mal.' },
        { icon: 'TrendingUp', title: 'Reinvencion en Peso Ligero', fighter: 'Nelson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Nelson parece haber encontrado su categoria ideal en peso ligero. Mas comodo fisicamente y mostrando mas paciencia tactica en la victoria contra Frevola.' },
        { icon: 'Clock', title: 'Derrota Reciente', fighter: 'McKinney', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'McKinney viene de una derrota contra Chris Duncan en diciembre de 2025. Las derrotas consecutivas no son nuevas para el, pero el patron de altibajos plantea preguntas sobre la mentalidad.' },
        { icon: 'Shield', title: 'Menton Cuestionable', fighter: 'Nelson', risk_level: 'RIESGO MEDIO', risk_color: 'yellow', description: 'Nelson fue finalizado en R1 por Steve Garcia y por Billy Quarantillo. Contra la explosividad de McKinney, el menton sera probado inmediatamente.' },
        { icon: 'Brain', title: 'Experiencia en Peleas Largas', fighter: 'Nelson', risk_level: 'POSITIVO', risk_color: 'green', description: 'Con 7 victorias por decision, Nelson sabe administrar peleas de 3 rounds. McKinney nunca gano por puntos. Si la pelea se extiende, Nelson tiene la experiencia que McKinney no tiene.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'McKinney',
        total_probability: 57,
        scenarios: [
          { name: 'Blitz Devastador', probability: 30, method: 'KO/TKO R1', description: 'McKinney avanza desde el primer segundo. Presion inmediata, combinaciones rapidas, y busqueda del KO antes de que Nelson se acomode. El escenario mas probable de todos: McKinney destruyendo al adversario en menos de un minuto.' },
          { name: 'Sumision Relampago', probability: 17, method: 'Sub R1-R2', description: 'McKinney lleva la pelea al suelo y encuentra una guillotina, RNC o anaconda en el grappling salvaje. Con 9 sumisiones en su carrera, el suelo es tan peligroso como los pies para McKinney.' },
          { name: 'TKO por Acumulacion', probability: 10, method: 'TKO R2', description: 'McKinney dania a Nelson en R1 sin finalizar, y completa el trabajo en R2 con ground and pound cuando Nelson ya esta debilitado.' },
        ],
      },
      fighter2: {
        nome: 'Nelson',
        total_probability: 40,
        scenarios: [
          { name: 'Sobrevivir y Conquistar', probability: 18, method: 'Decision Unanime', description: 'Nelson resiste la tormenta inicial, defiende derribos y comienza a trabajar el jab y el volumen en R2 y R3. McKinney desacelera y Nelson gana por puntos.' },
          { name: 'Contragolpe Fatal', probability: 12, method: 'KO/TKO R1-R2', description: 'McKinney avanza de forma descuidada y Nelson conecta un contragolpe limpio en la entrada. La agresividad de McKinney se convierte en su propia trampa.' },
          { name: 'Finalizacion en la Oportunidad', probability: 10, method: 'TKO R2-R3', description: 'Con McKinney agotado despues de un R1 intenso sin finalizacion, Nelson empieza a encontrar aperturas y detiene la pelea con golpes en R2 o R3.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Terrance McKinney',
      winner_side: 'fighter1',
      predicted_method: 'TKO/KO R1',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'McKinney es simplemente demasiado explosivo en los primeros minutos para la mayoria de los oponentes. Con 6.96 golpes significativos por minuto y siete finalizaciones en menos de 60 segundos, trae un nivel de presion inicial que pocos pueden soportar. Nelson tiene un menton cuestionable (detenido por Garcia y Quarantillo en R1/R3) y puede no aguantar el blitz de McKinney. Sin embargo, la confianza es solo MEDIA porque McKinney es absurdamente impredecible. Puede destruir a Nelson en 10 segundos o ser noqueado en un contragolpe en la entrada. Cada pelea suya es una apuesta.',
      x_factor: {
        title: 'Los Primeros 90 Segundos',
        description: 'La pelea entera probablemente se decidira en el primer minuto y medio. Si McKinney conecta algo grande en ese periodo, se acabo. Si Nelson sobrevive, la dinamica cambia drasticamente a favor del canadiense.',
      },
      upset_alert: {
        title: 'El Contragolpe en la Entrada',
        description: 'McKinney avanza con la guardia baja e historicamente es vulnerable a contragolpes. Ribovics lo noqueo con head kick en la entrada. Si Nelson tiene timing para un uppercut o gancho limpio cuando McKinney avanza, la sorpresa puede ocurrir.',
      },
      probabilities: {
        fighter1: { nome: 'McKinney', percent: 57 },
        fighter2: { nome: 'Nelson', percent: 40 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'McKinney (-142)', reasoning: 'Favorito ligero con poder de finalizacion masivo. La linea refleja la impredecibilidad: McKinney deberia ser mas favorito por el potencial ofensivo, pero las derrotas frecuentes equilibran.' },
        method: { pick: 'La pelea no va a decision', reasoning: 'McKinney NUNCA fue a decision en 25 peleas. Nelson tiene finalizaciones y fue finalizado varias veces. La probabilidad de ir a los jueces es muy baja.' },
        over_under: { pick: 'Under 1.5 rounds', rounds: 1.5, reasoning: 'De las 25 peleas de McKinney, la gran mayoria termino en R1. Nelson tambien tiene finalizaciones y fue detenido temprano. Todo apunta a pelea corta.' },
        best_value: 'Under 1.5 rounds es la apuesta con mejor valor. Ambos peleadores tienen historial de peleas que terminan rapido, y McKinney rara vez pasa del primer round.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Los Primeros 30 Segundos', icon: 'Zap', description: 'McKinney define peleas antes de que la mayoria termine de acomodarse en el sofa. Presta atencion maxima desde el toque de guantes. Si conecta algo limpio en los primeros 30 segundos, la pelea puede terminar ahi mismo. Nelson necesita estar listo para el caos inmediato.' },
        { num: 2, title: 'La Defensa de Derribo de Nelson', icon: 'Shield', description: 'Nelson tiene 73% de defensa de derribo, numero solido. Pero nunca enfrento a alguien tan explosivo en las entradas como McKinney. Si Nelson defiende los primeros dos o tres derribos, su confianza sube y McKinney puede empezar a dudar.' },
        { num: 3, title: 'El Cardio de McKinney Despues del R1', icon: 'Activity', description: 'McKinney nunca gano por decision. Si la pelea llega al R2, observa su ritmo. Historicamente, cuando McKinney no logra la finalizacion rapida, desacelera significativamente. Ese es el punto donde Nelson puede dar vuelta la pelea.' },
        { num: 4, title: 'Switch Stance de Ambos', icon: 'Eye', description: 'Los dos pelean en switch stance. Quien controle mejor los angulos en el cambio de guardia tendra ventaja en el golpeo. Presta atencion a quien esta mas comodo cambiando de ortodoxo a zurdo y viceversa.' },
        { num: 5, title: 'La Envergadura de McKinney', icon: 'Target', description: 'McKinney tiene 2.5 pulgadas mas de envergadura que Nelson (73.5" vs 71"). Esta ventaja puede ser decisiva en el jab y los golpes rectos. Si McKinney usa la distancia antes de avanzar, puede controlar el centro del octagono mas facilmente.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'BOMBA DE RELOJERIA', content: 'McKINNEY vs NELSON\nUFC Fight Night | 28 de marzo\nSeattle, Washington\n\n25 peleas. 25 finalizaciones.\nMcKinney NUNCA fue a decision.', color: 'red' },
        { slide_number: 2, title: 'T.WRECKS: LA ESTADISTICA ABSURDA', content: '17 victorias en la carrera\n8 por KO/TKO\n9 por sumision\n0 por decision\n\n7 finalizaciones en menos de 60 seg\nKO mas rapido del peso ligero: 7 seg\n6.96 golpes por minuto\n(Top 4 de la HISTORIA del peso ligero)', color: 'red' },
        { slide_number: 3, title: 'THE MONSTER', content: 'Kyle Nelson | 17-6-1\n\nReinvencion en peso ligero\nVictoria por UD vs Frevola\n6 KOs + 4 sumisiones + 7 decisiones\nEstilo equilibrado y paciente\n73% defensa de derribo\n\nVeterano canadiense busca racha', color: 'blue' },
        { slide_number: 4, title: 'EL OPONENTE EN COMUN', content: 'Matt Frevola\n\nMcKinney: KO en 7 SEGUNDOS\n(Record del peso ligero)\n\nNelson: Decision Unanime\n(3 rounds completos)\n\nExplosion vs Paciencia.', color: 'gold' },
        { slide_number: 5, title: 'PREDICCION', content: 'McKINNEY por TKO/KO R1\n\nConfianza: MEDIA\n57% McKinney / 40% Nelson\n\nSi dura mas de 2 min?\nNelson se vuelve favorito.\nSi no? Highlight reel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'McKinney vs Nelson es la pelea que NO puedes perderte de este card. T.Wrecks tiene 25 peleas profesionales y CERO decisiones. Nunca. 17 victorias, 8 derrotas, todas por finalizacion. Hilo:' },
        { num: '2/6', text: 'McKinney (17-8): 6.96 golpes por minuto (top 4 en la historia del peso ligero), 7 finalizaciones en menos de 60 segundos, KO mas rapido en la historia del peso ligero (7 seg). El problema? 5 finalizaciones sufridas en UFC. Es una moneda al aire cada vez.' },
        { num: '3/6', text: 'Nelson (17-6-1): Canadiense reinventado en peso ligero. Vencio a Frevola por decision unanime. Estilo mas paciente y maduro. 73% defensa de derribo. 7 victorias por decision. Sabe administrar rounds.' },
        { num: '4/6', text: 'Detalle interesante: los dos enfrentaron a Frevola. McKinney lo noqueo en 7 SEGUNDOS. Nelson gano por decision en 15 minutos. Dos estilos completamente opuestos contra el mismo tipo. Eso lo dice todo.' },
        { num: '5/6', text: 'Apuesta de valor: Under 1.5 rounds. McKinney nunca fue a decision en 25 peleas. NUNCA. Nelson tambien tiene finalizaciones en R1. Todo apunta a pelea corta. Si quieres accion, sintoniza desde el primer segundo.' },
        { num: '6/6', text: 'Mi pick: McKinney por TKO/KO en R1. Pero mira, la confianza es MEDIA. McKinney puede destruir a Nelson en 10 segundos o ser noqueado en un contragolpe en la entrada. Esta pelea es caos puro.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '25 peleas profesionales. Cero decisiones. Terrance McKinney NUNCA escucho a los jueces en su vida. Y el sabado, enfrenta a Kyle Nelson en Seattle. Si parpadeas, puedes perderte la pelea entera.' },
        { time: '10-25s', title: 'Contexto', text: 'McKinney es el tipo que noqueo a Frevola en 7 segundos, que tiene 6.96 golpes por minuto, que tiene 7 finalizaciones en menos de un minuto. Pero tambien es el tipo con 5 derrotas por finalizacion en UFC. Nelson es lo opuesto: paciente, veterano, reinventado en peso ligero despues de anos en peso pluma.' },
        { time: '25-40s', title: 'Analisis', text: 'La pregunta es simple: Nelson sobrevive los primeros 90 segundos? Si si, la pelea cambia. McKinney nunca gano por decision. Nelson tiene 7. Si pasa del R1, Nelson es favorito. Si no, McKinney suma otro highlight reel. Detalle: los dos enfrentaron a Frevola. McKinney, KO en 7 segundos. Nelson, decision en 15 minutos. Eso es todo lo que necesitas saber.' },
        { time: '40-55s', title: 'Prediccion', text: 'Mi pick: McKinney por TKO en R1, pero con confianza MEDIA. Puede destruir a cualquiera en los primeros segundos, pero tambien puede ser noqueado en un contragolpe. Under 1.5 rounds es la mejor apuesta del card.' },
        { time: '55-65s', title: 'CTA', text: 'Quien gana? Comenta McKINNEY o NELSON. Si te gusto, sigue para el analisis completo del UFC Fight Night Adesanya vs Pyfer.' },
      ],
      tiktok: [
        { hook: '25 peleas. CERO decisiones. Este tipo NUNCA escucho a los jueces en su vida.', body: 'Terrance McKinney tiene 17 victorias y 8 derrotas. Todas por finalizacion. Cada. Una. De. Ellas. Noqueo a Frevola en 7 SEGUNDOS. Tiene 7 victorias en menos de un minuto. El sabado enfrenta a Kyle Nelson en Seattle. Si parpadeas, te perdiste la pelea.', cta: 'McKinney o Nelson? Comenta!' },
        { hook: 'Misma victima. Estilos COMPLETAMENTE opuestos.', body: 'McKinney noqueo a Frevola en 7 SEGUNDOS. KO mas rapido del peso ligero del UFC. Nelson? Derroto al mismo Frevola por decision unanime. 15 minutos enteros. Ahora se enfrentan. Explosion contra paciencia. Quien gana?', cta: 'Sigue para ver el analisis completo!' },
        { hook: 'La estadistica mas ABSURDA del UFC.', body: '25 peleas profesionales. 17 victorias. 8 derrotas. CERO decisiones. Terrance McKinney nunca, NUNCA escucho una tarjeta de juez. Cada pelea suya termina con alguien en la lona. 6.96 golpes por minuto, top 4 en la HISTORIA del peso ligero. Pero tiene 43% de defensa de golpes. Vive al filo de la navaja.', cta: 'Apostarias por el? Comenta!' },
      ],
      headlines: [
        'McKinney vs Nelson: 25 Peleas, Cero Decisiones y el Caos Garantizado en Seattle',
        'T.Wrecks Busca Rehabilitacion Contra el Canadiense Reinventado en Peso Ligero',
        'El Oponente en Comun: 7 Segundos vs 15 Minutos Contra el Mismo Tipo',
        'McKinney en Seattle: El Finalizador Mas Explosivo del UFC Vuelve al Noroeste',
        'Puede Kyle Nelson Sobrevivir la Bomba de Relojeria del Peso Ligero?',
        'Under 1.5 Rounds: Por Que Esta Pelea Puede Ser la Mas Corta del Card',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-142',
        fighter2_odds: '+120',
        fighter1_name: 'Terrance McKinney',
        fighter2_name: 'Kyle Nelson',
        source: 'Promedio de casas de apuestas (marzo 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Tasa de Finalizacion del 100%', stat_headline: '25 PELEAS PROFESIONALES, 25 FINALIZACIONES. CERO DECISIONES EN LA CARRERA.', contexto: 'McKinney nunca fue a decision en toda su carrera profesional. Cada pelea termina temprano, sea victoria o derrota.', implicacao_aposta: 'Under 1.5 rounds tiene valor fuerte. La probabilidad de ir a decision es historicamente cero para McKinney.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Volumen de Golpes Absurdo', stat_headline: '6.96 GOLPES SIGNIFICATIVOS POR MINUTO, TOP 4 EN LA HISTORIA DEL PESO LIGERO', contexto: 'McKinney descarga un volumen de golpes que pocos aguantan. El promedio del UFC es aproximadamente 4.0 SLpM. McKinney esta casi en el doble.', implicacao_aposta: 'Favorece a McKinney en R1, donde el volumen es mas devastador.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Defensa de Golpes Preocupante', stat_headline: 'McKINNEY CON SOLO 43% DE DEFENSA DE GOLPES, 5 FINALIZACIONES SUFRIDAS EN UFC', contexto: 'La misma agresividad que genera nocauts genera exposicion. McKinney fue finalizado por Dober, Bonfim, Sadykhov, Ribovics y Duncan.', implicacao_aposta: 'Nelson por contragolpe no es un escenario irreal. Valor en Nelson por KO/TKO.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Nelson con Defensa de TD Superior', stat_headline: 'NELSON CON 73% DE DEFENSA DE DERRIBO vs 68% DE McKINNEY', contexto: 'Numero solido de Nelson para defender la lucha de McKinney, aunque nunca enfrento un luchador tan explosivo.', implicacao_aposta: 'Si Nelson defiende los derribos iniciales, la pelea puede extenderse mas alla del R1.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'McKinney Nunca Gano por Decision', stat_headline: '0 VICTORIAS POR DECISION EN 17 VICTORIAS EN LA CARRERA', contexto: 'Si la pelea es larga, Nelson tiene la experiencia (7 victorias por decision). McKinney esta en territorio desconocido despues del R1.', implicacao_aposta: 'Apostar a McKinney por decision es ir contra toda la evidencia historica.', edge_level: 'moderado', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-110', confianca: 'alta', edge_vs_mercado: 'McKinney nunca fue a decision. 25 peleas, 25 finalizaciones. La mayoria termina en R1.', raciocinio: 'La convergencia de datos es abrumadora. McKinney finaliza o es finalizado temprano. Nelson tambien tiene historial de peleas cortas (detenido por Garcia en R1). Probabilidad altisima de terminar antes del R2.' },
        { tipo: 'Metodo', pick: 'No va a decision', odds: '-250', confianca: 'alta', raciocinio: 'McKinney NUNCA fue a decision en 25 peleas profesionales. La probabilidad de terminar dentro de la distancia es abrumadora, independientemente de quien gane.' },
        { tipo: 'Moneyline', pick: 'McKinney (-142)', odds: '-142', confianca: 'media', edge_vs_mercado: 'Linea justa que refleja la impredecibilidad de McKinney.', raciocinio: 'McKinney tiene ventaja clara en explosividad y poder de finalizacion. A -142, el precio es justo. No es una ganga, pero refleja al favorito correcto.' },
        { tipo: 'Metodo', pick: 'McKinney por KO/TKO R1', odds: '+150', confianca: 'media', raciocinio: 'El escenario individual mas probable. McKinney tiene un historial masivo de finalizaciones en primer round. Cuotas decentes para el escenario con mayor probabilidad individual.' },
      ],
      armadilha: {
        titulo: 'Trampa: McKinney por Decision',
        descricao: 'McKinney nunca gano por decision en toda su carrera. Cero. Nada. Apostar a McKinney por decision es apostar a algo que literalmente nunca ocurrio en 25 peleas profesionales. Si la pelea va a la distancia, Nelson es el favorito por puntos.',
      },
      disclaimer: 'Analisis estadistico con fines informativos. Apuesta con responsabilidad.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// LOCALE MAP & PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const analises: Record<string, FullSingleAnalise> = {
  pt: analisePT,
  en: analiseEN,
  fr: analiseFR,
  es: analiseES,
};

function AnaliseContent() {
  const locale = useLocale();
  const analise = analises[locale] || analisePT;

  return <FullAnalysisView analise={analise} />;
}

export default function McKinneyVsNelsonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg" />}>
      <AnaliseContent />
    </Suspense>
  );
}
