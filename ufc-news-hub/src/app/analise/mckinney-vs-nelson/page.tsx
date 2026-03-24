'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

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
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

function AnaliseContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') as Lang) || 'pt';

  const analise = lang === 'pt' ? analisePT : analisePT;

  return <FullAnalysisView analise={analise} />;
}

export default function McKinneyVsNelsonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg" />}>
      <AnaliseContent />
    </Suspense>
  );
}
