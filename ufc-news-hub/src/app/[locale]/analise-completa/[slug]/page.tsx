import { Header } from '@/components/ui/Header';
import { FullAnalysisView } from '@/components/analise/full/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import { notFound } from 'next/navigation';
import { pereiraGaneAnalise } from './pereira-gane-data';
import { lemosRobertsonAnalise } from './lemos-robertson-data';
import { cutelabaSyAnalise } from './cutelaba-sy-data';
import { emmettVallejosAnalise } from './emmett-vallejos-data';
import { filiDelgadoAnalise } from './fili-delgado-data';
import { rahikiHardwickAnalise } from './rahiki-hardwick-data';
import { petrinoAsplundAnalise } from './petrino-asplund-data';
import { johnsonSilvaAnalise } from './johnson-silva-data';
import { tavaresAndersAnalise } from './tavares-anders-data';
import { curtisOrolbaiAnalise } from './curtis-orolbai-data';
import { lacerdaSosaAnalise } from './lacerda-sosa-data';
import { mesquitaRendonAnalise } from './mesquita-rendon-data';
import { smithYouAnalise } from './smith-you-data';
import { okiSousaAnalise } from './oki-sousa-data';
import { hughesRodriguezAnalise } from './hughes-rodriguez-data';

// ═══════════════════════════════════════════════════════════════
// Demo Analysis Data (will be replaced by fight-analyst agent)
// ═══════════════════════════════════════════════════════════════

const demoAnalise: FullSingleAnalise = {
  id: 'holloway-oliveira-demo',
  evento_id: null,
  slug: 'holloway-oliveira-demo',
  titulo: 'Holloway vs Oliveira: Analise Completa',
  subtitulo: 'A batalha pelo titulo BMF',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'KO', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Max Holloway', record: '27-8-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Charles Oliveira', record: '34-10-0', ultimasLutas: [] },
  evento_nome: 'UFC 326',
  evento_data: '2026-03-28',
  evento_local: 'T-Mobile Arena, Las Vegas',
  categoria_peso: 'Peso Leve',
  num_rounds: 5,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC 326',
      evento_data: '28 de Marco, 2026',
      evento_local: 'T-Mobile Arena, Las Vegas',
      categoria_peso: 'Peso Leve (155 lbs)',
      num_rounds: 5,
      titulo_em_jogo: 'Titulo BMF',
      tagline: 'A REDENCAO DE UM ROUND',
      tagline_sub: 'Dois dos maiores finalizadores da historia do UFC, frente a frente.',
      fighter1: {
        nome_completo: 'Max "Blessed" Holloway',
        apelido: 'Blessed',
        sobrenome: 'Holloway',
        record: '27-8-0',
        ranking: '#4 LW',
        info_extra: 'Waianae, Hawaii | 34 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Charles "Do Bronx" Oliveira',
        apelido: 'Do Bronx',
        sobrenome: 'Oliveira',
        record: '34-10-0',
        ranking: '#2 LW',
        info_extra: 'Guaruja, Brasil | 36 anos',
        imagem_fullbody_url: null,
      },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">A Historia Por Tras da Luta</h3>
        <p>Essa luta e o sonho de qualquer fa de MMA. <strong class="text-ufc-red">Holloway</strong> e <strong class="text-blue-400">Oliveira</strong> representam dois estilos completamente diferentes de dominar oponentes. Enquanto o havaiano destroi com volume absurdo em pe, o brasileiro sufoca no chao como poucos na historia fizeram.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Que Esta Em Jogo</h3>
        <p>Para <strong class="text-ufc-red">Holloway</strong>, e a chance de provar que pode dominar uma segunda divisao de peso. Para <strong class="text-blue-400">Oliveira</strong>, e a oportunidade de voltar ao topo depois de duas derrotas dolorosas.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#4 Peso Leve', fighter2: '#2 Peso Leve' },
        { dimensao: 'Objetivo', fighter1: 'Title shot no peso leve', fighter2: 'Reconquistar cinturao' },
        { dimensao: 'Narrativa', fighter1: 'Lenda em duas divisoes', fighter2: 'Volta por cima' },
        { dimensao: 'Risco', fighter1: 'Exposicao no chao', fighter2: 'Volume de strikes' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A COROACAO DO BLESSED EM DUAS DIVISOES',
          subtitulo: 'Holloway prova que e lenda em qualquer peso.',
          consequencias: [
            { tag: 'LEGADO', texto: 'Consolida status como um dos maiores da historia do UFC.' },
            { tag: 'TITULO', texto: 'Proximo na fila para disputar o cinturao dos leves.' },
            { tag: 'MONEY FIGHT', texto: 'Abre porta para superluta contra Islam Makhachev.' },
          ],
          proxima_luta: 'Islam Makhachev pelo titulo dos leves',
        },
        fighter2_vence: {
          titulo: 'DO BRONX ESTA DE VOLTA',
          subtitulo: 'Oliveira mostra que o chao ainda e dele.',
          consequencias: [
            { tag: 'RANKING', texto: 'Volta ao top 3 com vitoria dominante.' },
            { tag: 'TITULO', texto: 'Garante revanche pelo cinturao.' },
            { tag: 'LEGADO', texto: 'Maior numero de finalizacoes na historia do UFC consolidado.' },
          ],
          proxima_luta: 'Revanche contra Islam Makhachev pelo titulo',
        },
      },
    },
    momento_atual: {
      fighter1: {
        nome: 'Max Holloway',
        color: 'red',
        recent_fights: [
          { date: 'Abr 2024', opponent: 'Justin Gaethje', result: 'W', method: 'KO R5', opponent_rank: '#2 LW', quality_score: 5, quality_label: 'Excelente', note: 'KO historico nos segundos finais do round 5. Momento BMF.' },
          { date: 'Set 2023', opponent: 'Chan Sung Jung', result: 'W', method: 'TKO R3', opponent_rank: '#8 FW', quality_score: 3, quality_label: 'Bom', note: 'Dominio total contra o Korean Zombie em sua despedida.' },
          { date: 'Abr 2023', opponent: 'Arnold Allen', result: 'W', method: 'Decisao Unanime', opponent_rank: '#6 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Masterclass de volume em 5 rounds.' },
          { date: 'Nov 2022', opponent: 'Alexander Volkanovski', result: 'L', method: 'Decisao Unanime', opponent_rank: 'Campeao FW', quality_score: 5, quality_label: 'Excelente', note: 'Terceira luta contra Volk, muito competitiva.' },
        ],
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Holloway vem de uma das sequencias mais impressionantes da sua carreira. O KO sobre Gaethje nos segundos finais e um dos momentos mais memoraveis da historia do UFC, e ele subiu de divisao com confianca maxima.',
      },
      fighter2: {
        nome: 'Charles Oliveira',
        color: 'blue',
        recent_fights: [
          { date: 'Abr 2024', opponent: 'Arman Tsarukyan', result: 'L', method: 'Decisao Unanime', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu para o atual desafiante ao titulo, luta competitiva.' },
          { date: 'Out 2023', opponent: 'Islam Makhachev', result: 'L', method: 'Sub R3', opponent_rank: 'Campeao LW', quality_score: 5, quality_label: 'Excelente', note: 'Finalizado pelo campeao em Abu Dhabi.' },
          { date: 'Jun 2023', opponent: 'Beneil Dariush', result: 'W', method: 'KO R1', opponent_rank: '#5 LW', quality_score: 4, quality_label: 'Muito Bom', note: 'KO devastador no primeiro round.' },
          { date: 'Nov 2022', opponent: 'Islam Makhachev', result: 'L', method: 'Sub R2', opponent_rank: '#1 LW', quality_score: 5, quality_label: 'Excelente', note: 'Perdeu o cinturao interino.' },
        ],
        momentum_score: 5,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Oliveira vem de duas derrotas consecutivas, ambas contra os dois melhores do mundo. Isso nao diminui seu nivel, mas coloca pressao para mostrar que ainda compete com a elite.',
      },
    },
    nivel_competicao: {
      fighter1: {
        nome: 'Holloway',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '3W-1L (75%)',
        contra_top5: '1W-1L',
      },
      fighter2: {
        nome: 'Oliveira',
        media_oponentes: 5,
        media_oponentes_label: 'Excelente',
        aproveitamento: '1W-3L (25%)',
        contra_top5: '1W-2L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos enfrentaram Justin Gaethje. Holloway nocauteou Gaethje de forma espetacular. Oliveira finalizou Gaethje por submissao anteriormente.',
    },
    oponente_comum: {
      oponente_nome: 'Justin Gaethje',
      fighter1_result: {
        resultado: 'Vitoria por KO',
        metodo: 'KO R5 (4:59)',
        duracao: '4 rounds completos + 4:59',
        contexto: 'Holloway construiu vantagem nos cartoes durante 4 rounds e nos ultimos segundos do quinto round, acertou um cruzado de direita devastador que derrubou Gaethje.',
        performance: 'Performance lendaria. Um dos melhores KOs da historia do UFC, selando a vitoria pelo titulo BMF.',
        evento: 'UFC 300',
        data: 'Abr 2024',
      },
      fighter2_result: {
        resultado: 'Vitoria por Submissao',
        metodo: 'Rear Naked Choke R1 (3:22)',
        duracao: '1 round (3:22)',
        contexto: 'Oliveira derrubou Gaethje rapidamente e transicionou para as costas, finalizando com um mata leao apertado.',
        performance: 'Demonstracao de dominio no chao. Gaethje nao teve chance de usar seu striking.',
        evento: 'UFC 274',
        data: 'Mai 2022',
      },
      insight: 'Contra o mesmo oponente, Holloway venceu de pe com volume absurdo, enquanto Oliveira venceu no chao em menos de 4 minutos. Isso resume perfeitamente a dinamica dessa luta: onde ela acontece define quem vence.',
    },
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 6.43, valueB: 3.49, maxVal: 8, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 49, valueB: 54, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.34, valueB: 3.72, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 56, valueB: 58, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.50, valueB: 2.87, maxVal: 5, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 29, valueB: 41, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 72, valueB: 65, maxVal: 100, format: 'percent' },
        { label: 'Submissoes por 15 Min', valueA: 0.10, valueB: 1.42, maxVal: 3, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '34 anos', fighter2: '36 anos', note: null },
        { label: 'Altura', fighter1: '1.80m (5\'11")', fighter2: '1.78m (5\'10")', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '175cm (69")', fighter2: '188cm (74")', note: 'Oliveira com 5 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'Gracie Technics / Hawaii', fighter2: 'Chute Boxe Diego Lima', note: null },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Volume de Strikes', valueA: 95, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Holloway e o maior striker de volume da historia do UFC.' },
        { label: 'Poder de Finalizacao', valueA: 55, valueB: 92, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Oliveira tem o recorde de finalizacoes do UFC.' },
        { label: 'Grappling Ofensivo', valueA: 35, valueB: 85, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2' },
        { label: 'Cardio / Gas', valueA: 92, valueB: 65, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Holloway e uma maquina nos rounds finais.' },
        { label: 'Defesa de Takedown', valueA: 72, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1' },
        { label: 'QI de Luta', valueA: 88, valueB: 82, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Ambos sao brilhantes, mas Holloway adapta melhor dentro da luta.' },
      ],
      insight: 'Esse confronto e classico: o melhor striker de volume contra o melhor finalizador. Holloway domina em pe, Oliveira domina no chao. O cardio e a chave, onde acontece a luta nos rounds finais define tudo.',
    },
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Holloway',
        ko_tko: { count: 12, percent: 44 },
        submission: { count: 1, percent: 4 },
        decision: { count: 14, percent: 52 },
        total_wins: 27,
      },
      fighter2: {
        nome: 'Oliveira',
        ko_tko: { count: 10, percent: 29 },
        submission: { count: 16, percent: 47 },
        decision: { count: 8, percent: 24 },
        total_wins: 34,
      },
      insight: 'Holloway vence majoritariamente por decisao (52%) e KO (44%), refletindo seu estilo de volume que desgasta oponentes. Oliveira, por outro lado, e um predador: 47% das vitorias por finalizacao e 29% por KO. Se a luta vai ao chao, o perigo e real.',
    },
    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM OLIVEIRA',
          color: 'green',
          title: 'A Emboscada do Do Bronx',
          description: 'O primeiro round e historicamente o mais perigoso para quem enfrenta Oliveira. Ele busca o takedown cedo e transiciona para finalizacao rapidamente. Holloway precisa sobreviver esse round em pe.',
        },
        {
          rounds: 'R2-R3',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'A Zona de Transicao',
          description: 'Se Holloway sobrevive o R1 em pe, os rounds do meio ficam equilibrados. Holloway comeca a construir vantagem no volume, mas Oliveira ainda e perigoso no clinch e no chao.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 8,
          danger_label: 'VANTAGEM HOLLOWAY',
          color: 'red',
          title: 'Territorio do Blessed',
          description: 'Os rounds finais sao o territorio natural de Holloway. Seu cardio e lendario e ele frequentemente finaliza oponentes cansados. Se Oliveira nao finalizou ate aqui, esta em perigo serio.',
        },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Momentum pos-BMF', fighter: 'Holloway', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'O KO sobre Gaethje no UFC 300 colocou Holloway em outro patamar de confianca. Ele esta surfando uma onda de hype raramente vista no esporte.' },
        { icon: 'AlertTriangle', title: 'Duas derrotas consecutivas', fighter: 'Oliveira', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Oliveira vem de derrotas para Makhachev e Tsarukyan, ambos top 2 do mundo. Apesar de serem contra os melhores, sequencia pode afetar a confianca.' },
        { icon: 'Activity', title: 'Mudanca de divisao', fighter: 'Holloway', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Holloway sobe do peso pena para o peso leve. O peso extra pode ajudar no poder, mas tambem traz incognitas sobre adaptacao.' },
        { icon: 'Zap', title: 'Poder de finalizacao no chao', fighter: 'Oliveira', risk_level: 'POSITIVO', risk_color: 'green', description: 'Oliveira tem 16 finalizacoes no UFC, recorde absoluto. Se a luta vai ao chao, ele pode encerrar a qualquer momento.' },
        { icon: 'Shield', title: 'Queixo testado', fighter: 'Holloway', risk_level: 'POSITIVO', risk_color: 'green', description: 'Holloway absorve muitos strikes mas raramente e derrubado por eles. Seu queixo e um dos mais testados do esporte.' },
        { icon: 'MapPin', title: 'Las Vegas (territorio neutro)', fighter: 'Holloway', risk_level: 'NEUTRO', risk_color: 'neutral', description: 'Las Vegas e territorio neutro, mas Holloway tem historico forte na cidade, incluindo o KO sobre Gaethje na mesma arena.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Holloway',
        total_probability: 55,
        scenarios: [
          { name: 'Morte por Mil Cortes', probability: 30, method: 'Decisao Unanime', description: 'Holloway se mantem em pe, defende takedowns e descarrega volume absurdo de strikes. Vence nos cartoes com dominancia total em pe.' },
          { name: 'O KO Tardio', probability: 15, method: 'TKO R4-5', description: 'Holloway desgasta Oliveira com volume nos primeiros rounds e encontra a finalizacao quando o cardio do brasileiro cede nos rounds finais.' },
          { name: 'Clinch e Cotovelos', probability: 10, method: 'TKO R3-4', description: 'Holloway usa o clinch para evitar takedowns e machuca Oliveira com cotovelos e joelhadas de perto.' },
        ],
      },
      fighter2: {
        nome: 'Oliveira',
        total_probability: 42,
        scenarios: [
          { name: 'O Mata Leao', probability: 20, method: 'Sub R1-2', description: 'Oliveira consegue o takedown cedo, transiciona para as costas e finaliza com rear naked choke.' },
          { name: 'Submissao no Scramble', probability: 12, method: 'Sub R2-3', description: 'Uma troca de posicoes no chao leva a um guilhotina ou anaconda de Oliveira.' },
          { name: 'KO Surpresa', probability: 10, method: 'KO R1-2', description: 'Oliveira acerta um overhand ou uppercut limpo que derruba Holloway, como fez contra Chandler e Dariush.' },
        ],
      },
    },
    previsao_final: {
      winner_name: 'Max Holloway',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime ou TKO tardio',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Holloway tem as ferramentas para vencer essa luta se conseguir mante-la em pe. Seu volume e cardio sao vantagens enormes contra um Oliveira que historicamente desacelera nos rounds finais. A chave esta na defesa de takedown do havaiano: se ele defender 70%+ dos takedowns, vence por decisao ou TKO tardio. Se Oliveira levar ao chao, tudo muda.',
      x_factor: {
        title: 'O Cardio de 5 Rounds',
        description: 'Holloway fica mais perigoso conforme a luta avanca. Se Oliveira nao finalizar nos dois primeiros rounds, vai enfrentar uma maratona que historicamente nao e seu forte.',
      },
      upset_alert: {
        title: 'Upset Alert: Oliveira por Submissao R1',
        description: 'Se Oliveira conseguir derrubar Holloway nos primeiros 2 minutos e chegar nas costas, pode finalizar antes do havaiano sequer aquecer. Essa e a rota mais perigosa para quem aposta em Holloway.',
      },
      probabilities: {
        fighter1: { nome: 'Holloway', percent: 55 },
        fighter2: { nome: 'Oliveira', percent: 42 },
        draw: 3,
      },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'Defesa de Takedown do Holloway', icon: 'Shield', description: 'O fator numero 1 dessa luta. Se Holloway defender 70%+ dos takedowns, ele vence. Se Oliveira conectar 3+ takedowns, ele vence. Simples assim.' },
        { num: 2, title: 'Volume de Strikes no R1', icon: 'Activity', description: 'Se Holloway acertar 30+ strikes significativos no primeiro round e se manter em pe, e um sinal forte de que ele vai controlar a luta. Abaixo de 15, Oliveira esta ditando o ritmo.' },
        { num: 3, title: 'Transicoes de Oliveira no Chao', icon: 'Target', description: 'Quando Oliveira derruba, observe se ele consegue chegar nas costas. Sem acesso as costas, Holloway pode se levantar. Com acesso, a luta pode acabar.' },
        { num: 4, title: 'Cardio no Round 3', icon: 'Clock', description: 'O round 3 e o termometro. Se Oliveira ainda esta pressionando com takedowns, e bom sinal para ele. Se ele esta recuando e respirando pesado, Holloway vai dominar R4-R5.' },
        { num: 5, title: 'A Mao Direita do Blessed', icon: 'Zap', description: 'A mesma mao que nocauteou Gaethje. Se Holloway encontrar espaco para o cruzado de direita, especialmente em counter, pode acabar a luta de forma dramatica a qualquer momento.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'HOLLOWAY VS OLIVEIRA', content: 'UFC 326\n28 de Marco, 2026\nT-Mobile Arena, Las Vegas\n\nTitulo BMF em jogo\n5 Rounds', color: 'red' },
        { slide_number: 2, title: 'MAX HOLLOWAY', content: '27-8-0\n#4 Peso Leve\n\n6.43 strikes/min (ABSURDO)\n12 KOs na carreira\nVem do KO historico sobre Gaethje', color: 'red' },
        { slide_number: 3, title: 'CHARLES OLIVEIRA', content: '34-10-0\n#2 Peso Leve\n\n16 finalizacoes no UFC (RECORDE)\n34 vitorias na carreira\nEx-campeao peso leve', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Holloway por Decisao ou TKO tardio\nConfianca: MEDIA (6/10)\n\nChave: defesa de takedown\nSe ficar em pe = Holloway\nSe for ao chao = Oliveira', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Holloway vs Oliveira no UFC 326. O melhor striker de volume da historia contra o maior finalizador do UFC. Titulo BMF em jogo. Essa luta e um sonho.' },
        { num: '2/5', text: 'Holloway: 6.43 strikes significativos por minuto. Isso e ABSURDO. 75+ sig strikes em 17 lutas consecutivas desde 2016. Maquina humana de volume.' },
        { num: '3/5', text: 'Oliveira: 16 finalizacoes no UFC. RECORDE ABSOLUTO. Se a luta vai ao chao, pode acabar a qualquer segundo. Rear naked choke, guilhotina, nao importa.' },
        { num: '4/5', text: 'A chave da luta? Defesa de takedown do Holloway. Se ele defender 70%+, vence nos cartoes. Se Oliveira conectar 3+ takedowns, a luta muda completamente.' },
        { num: '5/5', text: 'Minha previsao: Holloway por decisao unanime. O cardio e o volume sao demais para Oliveira nos rounds finais. Mas cuidado com o R1, onde o Do Bronx e mais perigoso.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O maior striker de volume da historia do UFC contra o cara com mais finalizacoes na historia do UFC. Titulo BMF em jogo. Essa e a luta mais emocionante de 2026."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Holloway acerta 6.43 strikes significativos por MINUTO. Oliveira tem 16 finalizacoes no UFC, recorde absoluto. Um destroi em pe, o outro destroi no chao."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Se a luta fica em pe? Holloway domina. Se vai ao chao? Oliveira finaliza. A chave e a defesa de takedown. 70% de defesa e Holloway vence. Abaixo disso, Oliveira tem chance real."' },
        { time: '40-50s', title: 'Red Flags', text: '"Oliveira vem de duas derrotas. Holloway esta mudando de divisao. Os dois tem incognitas. Mas o cardio do Holloway nos rounds finais e uma vantagem que ninguem na divisao tem."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Minha previsao: Holloway por decisao unanime. Mas cuidado com o round 1. Se Oliveira derrubar cedo, tudo pode acontecer. Comenta ai: quem voce acha que vence?"' },
      ],
      tiktok: [
        { hook: 'O striker com mais VOLUME na historia do UFC contra o cara com mais FINALIZACOES. Titulo BMF.', body: 'Holloway acerta 6.43 strikes por minuto. Oliveira tem 16 subs no UFC. Se ficar em pe, Holloway vence. Se for ao chao, Oliveira finaliza. A defesa de takedown decide tudo.', cta: 'Quem vence? Comenta BLESSED ou DO BRONX.' },
        { hook: 'Uma estatistica ABSURDA sobre Holloway que ninguem fala.', body: '75+ strikes significativos em 17 lutas CONSECUTIVAS desde 2016. Nenhum outro lutador chegou perto disso. Contra Oliveira, se ele manter esse volume, nao tem como perder nos cartoes.', cta: 'Segue pra mais stats de UFC que ninguem te conta.' },
        { hook: 'A RED FLAG que ninguem esta vendo na luta Holloway vs Oliveira.', body: 'Oliveira vem de duas derrotas, mas foram contra os DOIS MELHORES do mundo. Makhachev e Tsarukyan. Isso nao diminui ele. Mas Holloway esta na melhor fase da carreira. A confianca faz diferenca.', cta: 'Salva esse video pra ver antes da luta. Vou acertar essa previsao.' },
      ],
      headlines: [
        'Holloway vs Oliveira: Volume vs Finalizacao pelo Titulo BMF',
        '6.43 Strikes Por Minuto: Os Numeros Absurdos de Holloway',
        'Do Bronx Consegue Derrubar o Blessed? A Chave do UFC 326',
        'A Luta dos Sonhos: Analise Completa Holloway vs Oliveira',
        'UFC 326: Porque o Cardio Decide Holloway vs Oliveira',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: {
        fighter1_odds: '-155',
        fighter2_odds: '+130',
        fighter1_name: 'Holloway',
        fighter2_name: 'Oliveira',
        source: 'Media estimada de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Flame', titulo: 'Volume Historico Incomparavel', stat_headline: '6.43 SIG STRIKES POR MINUTO, MELHOR DA HISTORIA DO UFC', contexto: 'Holloway tem o maior volume de strikes significativos por minuto na historia do UFC. Isso significa que em qualquer round que ele esteja em pe, esta acertando e construindo vantagem nos cartoes.', implicacao_aposta: 'Favorece apostas em Holloway por decisao. O volume constante dificulta Oliveira nos cartoes se a luta fica em pe.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Target', titulo: 'Recorde de Finalizacoes', stat_headline: '16 FINALIZACOES NO UFC, RECORDE ABSOLUTO', contexto: 'Oliveira pode finalizar de qualquer posicao no chao. Guilhotina, mata leao, arm bar, triangle. Ele tem a maior variedade de finalizacoes no esporte.', implicacao_aposta: 'Favorece apostas em Oliveira por submissao, especialmente nos primeiros rounds onde ele e mais ativo no grappling.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Cardio nos Rounds Finais', stat_headline: 'HOLLOWAY TEM 8 FINALIZACOES EM R4-R5 NA CARREIRA', contexto: 'Holloway e significativamente mais perigoso nos rounds finais. Seu output de strikes aumenta enquanto oponentes diminuem.', implicacao_aposta: 'Over 3.5 rounds e uma aposta forte. Se a luta nao termina cedo, vai longe com Holloway dominando os rounds finais.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Takedown Testada', stat_headline: '72% DE DEFESA DE TAKEDOWN NA CARREIRA', contexto: 'Holloway defende 72% dos takedowns, numero solido. No peso pena, ele enfrentou poucos grapplers de elite, mas sua base e underhooks sao consistentes.', implicacao_aposta: 'Se Holloway manter essa taxa, Oliveira tera dificuldade em levar a luta ao chao. Favorece over rounds.', edge_level: 'moderado', fighter_side: 'neutral' },
        { icon: 'AlertTriangle', titulo: 'Oliveira Vulneravel em Pe', stat_headline: 'OLIVEIRA FOI DERRUBADO 11 VEZES NA CARREIRA', contexto: 'Apesar de perigoso no striking, Oliveira ja foi derrubado (knockdown) muitas vezes na carreira. Contra um volume tao alto como o de Holloway, o risco aumenta.', implicacao_aposta: 'Cria valor em apostas de Holloway por KO/TKO, especialmente nos rounds finais quando Oliveira pode estar cansado.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Over/Under', pick: 'Over 3.5 Rounds', odds: '-120 (estimado)', confianca: 'alta', raciocinio: 'Holloway raramente finaliza cedo e Oliveira precisa de tempo para implementar o takedown. O volume de Holloway mantendo a luta em pe favorece rounds longos. Historicamente, 70% das lutas de Holloway passam de 3 rounds.' },
        { tipo: 'Moneyline', pick: 'Holloway ML', odds: '-155', confianca: 'media', raciocinio: 'Holloway tem vantagens claras em pe (volume, cardio, striking), mas Oliveira e perigoso demais no chao para dar confianca alta. O preco e justo.' },
        { tipo: 'Metodo', pick: 'Holloway por Decisao', odds: '+160 (estimado)', confianca: 'media', edge_vs_mercado: 'O mercado pode subestimar a chance de decisao dado o historico de finalizacoes de ambos. Mas o volume de Holloway tende a ir pra decisao.', raciocinio: 'O estilo de volume de Holloway e mais propenso a decisoes (52% das vitorias). Contra um Oliveira que vem perdendo por decisao, o cenario mais provavel e 5 rounds.' },
        { tipo: 'Metodo', pick: 'Oliveira por Submissao', odds: '+350 (estimado)', confianca: 'baixa', raciocinio: 'Se voce acredita que Oliveira vai derrubar Holloway, a submissao e o caminho. A +350, e uma aposta de valor se voce acha que o takedown vai acontecer. Alto risco, alta recompensa.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Oliveira por KO',
        descricao: 'Apesar de Oliveira ter poder de KO (10 KOs na carreira), suas melhores armas estao no chao. Apostar em Oliveira por KO contra o striker mais testado do UFC e uma armadilha. Se Oliveira vencer em pe, provavelmente sera por decisao, nao por nocaute.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// Analysis Registry
// ═══════════════════════════════════════════════════════════════

const analyses: Record<string, FullSingleAnalise> = {
  'holloway-oliveira-demo': demoAnalise,
  'pereira-gane-ufc-freedom-250': pereiraGaneAnalise,
  // UFC Fight Night: Emmett vs Vallejos — March 14, 2026
  'emmett-vallejos-ufn-mar-14': emmettVallejosAnalise,
  'lemos-robertson-ufn-mar-14': lemosRobertsonAnalise,
  'cutelaba-sy-ufn-mar-14': cutelabaSyAnalise,
  'fili-delgado-ufn-mar-14': filiDelgadoAnalise,
  'rahiki-hardwick-ufn-mar-14': rahikiHardwickAnalise,
  'petrino-asplund-ufn-mar-14': petrinoAsplundAnalise,
  'johnson-silva-ufn-mar-14': johnsonSilvaAnalise,
  'tavares-anders-ufn-mar-14': tavaresAndersAnalise,
  'curtis-orolbai-ufn-mar-14': curtisOrolbaiAnalise,
  'lacerda-sosa-ufn-mar-14': lacerdaSosaAnalise,
  'mesquita-rendon-ufn-mar-14': mesquitaRendonAnalise,
  'smith-you-ufn-mar-14': smithYouAnalise,
  'oki-sousa-ufn-mar-14': okiSousaAnalise,
  'hughes-rodriguez-ufn-mar-14': hughesRodriguezAnalise,
};

// ═══════════════════════════════════════════════════════════════
// Page Component
// ═══════════════════════════════════════════════════════════════

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AnaliseCompletaPage({ params }: PageProps) {
  const { slug } = await params;
  const analise = analyses[slug];
  if (!analise) notFound();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <FullAnalysisView analise={analise} />
    </div>
  );
}
