'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: FullSingleAnalise = {
  id: 'baraniewski-vs-lane',
  evento_id: null,
  slug: 'baraniewski-vs-lane',
  titulo: 'Baraniewski vs Lane: O Judoca Invicto Contra o Atleta da NFL',
  subtitulo: 'O polones de 7-0 com dois nocautes em 20 segundos enfrenta o ex-jogador de futebol americano que muda de divisao',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,83m', envergadura: '187cm', idade: 27, academia: 'Polonia' },
      fighter2: { altura: '1,98m', envergadura: '203cm', idade: 38, academia: 'EUA' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'KO/TKO R1',
    confidence: 'MEDIA-ALTA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Iwo Baraniewski',
    record: '7-0-0',
    ultimasLutas: [
      { result: 'W', opponent: 'Ibo Aslan', method: 'KO R1', event: 'UFC 323' },
    ],
  },
  fighter2_info: {
    nome: 'Austen Lane',
    record: '13-7-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Vitor Petrino', method: 'Submissao R1', event: 'UFC Fight Night' },
      { result: 'L', opponent: 'Mario Pinto', method: 'KO R2', event: 'UFC Fight Night' },
    ],
  },
  evento_nome: 'UFC Fight Night: Evloev vs Murphy',
  evento_data: '21 de Marco, 2026',
  evento_local: 'The O2 Arena, Londres, Reino Unido',
  categoria_peso: 'Peso Meio-Pesado (205 lbs)',
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
      categoria_peso: 'Peso Meio-Pesado (205 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O Judoca Invicto Contra o Gigante da NFL',
      tagline_sub: 'Prospect polones com nocautes relampago enfrenta o ex-jogador de futebol americano em sua estreia no meio-pesado',
      fighter1: {
        nome_completo: 'Iwo "Rudy" Baraniewski',
        apelido: 'Rudy',
        sobrenome: 'Baraniewski',
        record: '7-0-0',
        ranking: 'N/R Meio-Pesado',
        info_extra: 'Polonia | 27 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Austen Lane',
        apelido: '',
        sobrenome: 'Lane',
        record: '13-7-0',
        ranking: 'N/R Meio-Pesado',
        info_extra: 'EUA | 38 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Poder Explosivo Contra Tamanho Bruto</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Iwo Baraniewski</strong> e o tipo de prospect que assusta. O polones de 27 anos nao apenas e invicto com 7-0; ele finaliza lutas em velocidade absurda. No Contender Series, nocauteou Mahamed Aly em 20 segundos. No debut no UFC contra Ibo Aslan, nocauteou no primeiro round e ganhou o bonus de Performance da Noite. Com background em judo e poder explosivo nas maos, Baraniewski e uma bola de demolicao que o UFC esta construindo com cuidado.
        </p>
        <p class="mb-4">
          Do outro lado esta <strong class="text-blue-400">Austen Lane</strong>, uma historia completamente diferente. Ex-defensive end da NFL (jogou por Jacksonville Jaguars, Detroit Lions e outras equipes), Lane trouxe seu atletismo absurdo para o MMA depois de se aposentar do futebol americano. Com 1,98m e envergadura de 203cm, ele e fisicamente impressionante. Mas os resultados recentes nao foram bons: duas derrotas consecutivas, nocauteado por Mario Pinto no segundo round e finalizado por Vitor Petrino. Agora, aos 38 anos, ele desce de peso do peso-pesado para o meio-pesado buscando um novo comeco.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Missao do Polones</h3>
        <p class="mb-4">
          Para Baraniewski, essa e a oportunidade de confirmar que o debut nao foi fluke. Lane, apesar dos resultados recentes, e um teste fisico real: mais alto, mais pesado, com envergadura massiva e poder atletico da NFL. Se o polones conseguir passar por Lane de forma dominante, ele se posiciona como um dos prospects mais perigosos do meio-pesado. Se Lane surpreender na descida de peso, pode ser a reviravolta que sua carreira precisa.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: '7 vitorias consecutivas (invicto)', fighter2: '2 derrotas consecutivas' },
        { dimensao: 'Objetivo', fighter1: 'Confirmar o hype com 2-0 no UFC', fighter2: 'Interromper sequencia negativa na nova divisao' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota contra veterano experiente', fighter2: 'Terceira derrota consecutiva' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A BOLA DE DEMOLICAO CONTINUA',
          subtitulo: 'Baraniewski nocauteia Lane e se firma como prospect top do meio-pesado',
          consequencias: [
            { tag: 'RANKING', texto: 'Baraniewski com 8-0 comeca a aparecer no radar do ranking do meio-pesado' },
            { tag: 'PROXIMA', texto: 'Luta contra veterano estabelecido ou outro prospect no proximo card europeu' },
          ],
          proxima_luta: 'Baraniewski vs oponente ranqueado do top 15',
        },
        fighter2_vence: {
          titulo: 'A NFL NUNCA MORRE',
          subtitulo: 'Lane usa o tamanho e atletismo para surpreender na nova divisao',
          consequencias: [
            { tag: 'RESGATE', texto: 'Lane interrompe a sequencia de derrotas e prova que a descida de peso foi a decisao certa' },
            { tag: 'PROXIMA', texto: 'Mais lutas no meio-pesado contra oponentes de nivel similar' },
          ],
          proxima_luta: 'Lane vs oponente do meio-pesado no proximo card',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Iwo Baraniewski',
        color: 'red',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Ibo Aslan', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute no primeiro round no debut UFC. Ganhou Performance da Noite. Impressionante.' },
          { date: 'Set 2025', opponent: 'Mahamed Aly', result: 'W', method: 'KO R1 (0:20)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute em 20 segundos no Contender Series. Ganhou contrato do UFC na hora.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Mahamed Aly', result: 'W', method: 'KO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS, contrato UFC' },
          { date: 'Dez 2025', opponent: 'Ibo Aslan', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Debut UFC, Performance da Noite' },
        ],
        layoff_warning: null,
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Baraniewski esta no melhor momento possivel. Invicto, dois nocautes relampago consecutivos, contrato do UFC conquistado de forma dramatica e debut com bonus. O hype e justificado e o ritmo de atividade esta perfeito.',
      },
      fighter2: {
        nome: 'Austen Lane',
        color: 'blue',
        recent_fights: [
          { date: 'Jul 2025', opponent: 'Vitor Petrino', result: 'L', method: 'Submissao R1 (RNC)', opponent_rank: '#12 HW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado por rear-naked choke no primeiro round pelo prospect brasileiro.' },
          { date: 'Mar 2025', opponent: 'Mario Pinto', result: 'L', method: 'KO R2 (0:39)', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteado no segundo round por left-right. Segunda derrota consecutiva.' },
          { date: 'Out 2024', opponent: 'Robelis Despaigne', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Ruim', note: 'Primeira e unica vitoria no UFC por decisao unanime.' },
          { date: 'Abr 2024', opponent: 'Jhonata Diniz', result: 'L', method: 'KO R2', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteado no segundo round pelo ex-lutador de GLORY.' },
        ],
        full_fight_history: [
          { date: 'Jun 2023', opponent: 'Justin Tafa', result: 'NC', method: 'NC R1 (eye poke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'No Contest por eye poke acidental' },
          { date: 'Set 2023', opponent: 'Justin Tafa', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'KO no R1 na revanche' },
          { date: 'Abr 2024', opponent: 'Jhonata Diniz', result: 'L', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO no R2' },
          { date: 'Out 2024', opponent: 'Robelis Despaigne', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Unica vitoria UFC' },
          { date: 'Mar 2025', opponent: 'Mario Pinto', result: 'L', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'KO no R2' },
          { date: 'Jul 2025', opponent: 'Vitor Petrino', result: 'L', method: 'Sub R1', opponent_rank: '#12 HW', quality_score: 3, quality_label: 'Bom', note: 'Submissao no R1' },
        ],
        layoff_warning: null,
        momentum_score: 3,
        momentum_label: 'Em Baixa',
        momentum_trend: 'descending',
        momentum_note: 'Lane esta numa espiral negativa. Duas derrotas consecutivas rapidas, nocauteado por Pinto no R2 e finalizado por Petrino no R1. A decisao de descer para o meio-pesado aos 38 anos e uma jogada arriscada, mas necessaria. Se perder mais uma, a situacao no UFC fica insustentavel.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Baraniewski',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Lane',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '1W-4L (20%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Baraniewski e novo no UFC (apenas 1 luta). Lane tem 6 lutas no UFC (1-4, 1 NC) mas vem de resultados ruins.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 7.50, valueB: 3.82, maxVal: 10, format: 'decimal' },
        { label: 'Precisao de Strikes (%)', valueA: 75, valueB: 42, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.75, valueB: 5.31, maxVal: 8, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 48, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0.00, valueB: 0.68, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 0, valueB: 36, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 100, valueB: 50, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '27 anos', fighter2: '38 anos', note: 'Baraniewski 11 anos mais jovem' },
        { label: 'Altura', fighter1: '1,83m (6\'0")', fighter2: '1,98m (6\'6")', note: 'Lane 15cm mais alto' },
        { label: 'Envergadura', fighter1: '187cm (74")', fighter2: '203cm (80")', note: 'Lane com 6 polegadas de vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Ortodoxo', note: null },
        { label: 'Background', fighter1: 'Judo', fighter2: 'Ex-NFL (Defensive End)', note: 'Atletismos completamente diferentes' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 88, valueB: 65, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: '5 KOs em 7 lutas para Baraniewski. Nocauteou Aslan e Aly em segundos. Poder explosivo real.' },
        { label: 'Striking Tecnico', valueA: 72, valueB: 48, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Baraniewski tem 75% de precisao no UFC vs 42% de Lane. Diferenca tecnica clara.' },
        { label: 'Wrestling/Grappling', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Baraniewski tem base de judo com 2 submissoes na carreira. Lane tem 1 submissao na carreira e atletismo, mas tecnica de grappling limitada.' },
        { label: 'Atletismo e Explosao', valueA: 85, valueB: 72, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Baraniewski e explosivo e jovem. Lane tem atletismo da NFL mas aos 38 anos, a explosao diminuiu.' },
        { label: 'Queixo e Durabilidade', valueA: 65, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Baraniewski nunca foi derrubado. Lane foi nocauteado por Pinto no R2 e finalizado por Petrino no R1 nas ultimas 2 lutas.' },
        { label: 'Vantagem Fisica', valueA: 40, valueB: 80, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Lane e 15cm mais alto com 6 polegadas de envergadura a mais. Vantagem fisica significativa.' },
      ],
      insight: 'Baraniewski leva vantagem em quase tudo exceto tamanho fisico. O polones e mais tecnico, mais explosivo, mais jovem e mais confiante. Lane tem tamanho, mas os resultados recentes sugerem que ele nao esta conseguindo usar essa vantagem de forma efetiva.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Baraniewski',
        ko_tko: { count: 5, percent: 71 },
        submission: { count: 2, percent: 29 },
        decision: { count: 0, percent: 0 },
        total_wins: 7,
      },
      fighter2: {
        nome: 'Lane',
        ko_tko: { count: 11, percent: 85 },
        submission: { count: 1, percent: 8 },
        decision: { count: 1, percent: 7 },
        total_wins: 13,
      },
      insight: 'Baraniewski nunca foi para a decisao: 100% das vitorias por finalizacao (71% KO, 29% submissao). Lane e ainda mais nocauteador (85% KO), mas tem sido finalizado com frequencia recentemente. A tendencia aponta para uma luta curta com finalizacao.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 9,
          danger_label: 'VANTAGEM BARANIEWSKI',
          color: 'red',
          title: 'A Zona de Demolicao',
          description: 'Baraniewski finalizou as duas ultimas lutas no primeiro round, uma em 20 segundos. Lane foi finalizado nas duas ultimas lutas de forma rapida (Petrino no R1, Pinto no R2). A convergencia e clara: se alguem vai ser nocauteado cedo, e provavel que seja Lane. O polones entra com intencao de encerrar rapido.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Territorio Desconhecido',
          description: 'Se a luta chegar ao R2, entramos em territorio desconhecido para ambos. Baraniewski nunca precisou de um segundo round no UFC. Lane pode encontrar ritmo se sobreviver ao primeiro assalto. A vantagem de tamanho de Lane pode comecar a pesar aqui.',
        },
        {
          rounds: 'R3',
          danger_level: 4,
          danger_label: 'VANTAGEM LANE',
          color: 'green',
          title: 'A Experiencia do Veterano',
          description: 'Se a luta se arrastar ate o R3, Lane tem experiencia em lutas longas (1 decisao na carreira, contra Despaigne). Baraniewski nunca foi a decisao. O tamanho de Lane e o cardio natural de quem jogou na NFL podem ser fatores nesse cenario.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Momentum vs Espiral', fighter: 'Baraniewski', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Baraniewski esta no pico: invicto, dois nocautes devastadores, bonus de Performance da Noite. Lane esta numa espiral: duas derrotas consecutivas no R1. O contraste de momentum e enorme.' },
        { icon: 'AlertTriangle', title: 'Queixo Comprometido', fighter: 'Lane', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Lane foi nocauteado por Mario Pinto no R2 e finalizado por Petrino no R1 nas ultimas duas lutas. A durabilidade dele esta em questao seria. Contra o poder de Baraniewski, isso e preocupante.' },
        { icon: 'Activity', title: 'Descida de Peso', fighter: 'Lane', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Lane esta fazendo sua estreia no meio-pesado (205 lbs) vindo do peso-pesado (265 lbs). Perder quase 60 lbs pode afetar poder, resistencia e recuperacao. E uma incognita total.' },
        { icon: 'Shield', title: 'Vantagem de Tamanho Absurda', fighter: 'Lane', risk_level: 'POSITIVO', risk_color: 'green', description: 'Lane e 15cm mais alto e tem 6 polegadas de envergadura a mais. Mesmo no meio-pesado, ele sera significativamente maior. Se usar o jab e manter distancia, pode frustrar Baraniewski.' },
        { icon: 'Zap', title: 'Explosividade do Judoca', fighter: 'Baraniewski', risk_level: 'POSITIVO', risk_color: 'green', description: 'A base de judo da a Baraniewski explosividade unica para fechar distancia rapidamente. Mesmo com a envergadura de Lane, se Baraniewski fechar, o judo pode ser decisivo.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Baraniewski',
        total_probability: 72,
        scenarios: [
          { name: 'Nocaute Relampago', probability: 40, method: 'KO/TKO R1', description: 'Baraniewski fecha a distancia com explosividade de judoca, conecta combinacoes pesadas e nocauteia Lane no primeiro round. Cenario mais provavel dado o historico de ambos.' },
          { name: 'Takedown e Finalizacao', probability: 18, method: 'Submissao R1-R2', description: 'Baraniewski usa seu judo para derrubar Lane e encontra uma submissao. Tem 2 submissoes na carreira e o background tecnico para isso.' },
          { name: 'Dominio Tecnico', probability: 14, method: 'TKO R2-R3', description: 'Baraniewski machuca Lane cedo mas nao consegue a finalizacao imediata. Acumula dano e o arbitro para no segundo ou terceiro round.' },
        ],
      },
      fighter2: {
        nome: 'Lane',
        total_probability: 26,
        scenarios: [
          { name: 'O Jab do Gigante', probability: 10, method: 'Decisao Unanime', description: 'Lane usa a vantagem de 15cm de altura e 6 polegadas de envergadura para manter Baraniewski a distancia com jab. Vence nos pontos sem nunca deixar o polones fechar.' },
          { name: 'Contragolpe Poderoso', probability: 9, method: 'KO/TKO R1-R2', description: 'Baraniewski vem para frente de forma agressiva e Lane encontra um contragolpe ou uppercut com seu poder natural de 120kg. O tamanho pode ser equalizer.' },
          { name: 'Efeito do Novo Peso', probability: 7, method: 'Decisao/TKO', description: 'A descida para o meio-pesado rejuvenesce Lane. Mais rapido, mais leve, com energia renovada, ele surpreende com cardio e volume superiores.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Iwo Baraniewski',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Baraniewski e mais tecnico, mais explosivo, mais jovem e esta em momentum muito superior. Lane vem de duas derrotas no R1, com o queixo comprometido, e esta fazendo sua estreia numa nova divisao aos 38 anos. O poder de Baraniewski combinado com a fragilidade recente de Lane aponta fortemente para um nocaute precoce do polones. A unica variavel e o tamanho de Lane, que pode complicar se ele conseguir manter distancia. Mas historicamente, Lane nao tem mostrado capacidade de fazer isso.',
      x_factor: {
        title: 'A Descida de Peso',
        description: 'Ninguem sabe como Lane vai reagir no meio-pesado. Se ele chegar leve, rapido e com energia, pode ser uma versao melhor de si mesmo. Se a perda de peso afetar seu poder e resistencia, pode ser ainda mais vulneravel.',
      },
      upset_alert: {
        title: 'O Tamanho Importa',
        description: 'Lane e MUITO maior que Baraniewski. 15cm de altura, 6 polegadas de envergadura. Se ele usar o jab e manter distancia, Baraniewski pode ter dificuldade para entrar. O polones nunca enfrentou alguem tao grande.',
      },
      probabilities: {
        fighter1: { nome: 'Baraniewski', percent: 72 },
        fighter2: { nome: 'Lane', percent: 26 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 60 Segundos', icon: 'Zap', description: 'Baraniewski e perigoso desde o primeiro segundo (nocauteou Aly em 20 segundos). Se ele fechar a distancia rapidamente, a luta pode acabar antes de Lane ter chance de usar o tamanho.' },
        { num: 2, title: 'O Jab de Lane', icon: 'Target', description: 'Se Lane usar o jab de forma inteligente para manter distancia, pode frustrar as entradas de Baraniewski. Com 6 polegadas a mais de envergadura, o jab e sua melhor arma.' },
        { num: 3, title: 'O Fisico de Lane no Novo Peso', icon: 'Activity', description: 'Observe como Lane se move no meio-pesado. Se parecer lento ou pesado apesar da descida de peso, e sinal ruim. Se parecer mais leve e agil, pode ser uma versao melhorada.' },
        { num: 4, title: 'As Entradas de Judo de Baraniewski', icon: 'Shield', description: 'Baraniewski tem background em judo. Se Lane o empurrar para o clinch, o polones pode usar arremessos e viagens para levar ao chao. Observe as tentativas de clinch.' },
        { num: 5, title: 'O Queixo de Lane', icon: 'AlertTriangle', description: 'Lane foi nocauteado por Pinto no R2 e finalizado por Petrino no R1 nas ultimas 2 lutas. Se Baraniewski conectar algo limpo nos primeiros minutos, a reacao de Lane vai revelar se o queixo aguenta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'JUVENTUDE vs EXPERIENCIA', content: 'BARANIEWSKI vs LANE\nUFC Londres | Meio-Pesado\n\n7-0 vs 13-7\nJudoca invicto de 27 anos\nvs ex-NFL de 38 anos', color: 'red' },
        { slide_number: 2, title: 'BARANIEWSKI: BOLA DE DEMOLICAO', content: '7-0 na carreira\n5 KOs (71%)\nContender Series: KO em 20 SEGUNDOS\nDebut UFC: KO R1 + Performance da Noite\n27 anos, base judo', color: 'red' },
        { slide_number: 3, title: 'LANE: O GIGANTE DA NFL', content: '13-7 na carreira\n1,98m de altura\n203cm de envergadura\nEx-defensive end da NFL\nEstreia no meio-pesado aos 38 anos', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'BARANIEWSKI por KO/TKO R1\n\nConfianca: MEDIA-ALTA\n72% Baraniewski / 26% Lane\n\nO polones e demais pra esse\nmomento de Lane.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Baraniewski vs Lane: judoca invicto de 27 anos contra ex-jogador da NFL de 38. Baraniewski nocauteou em 20 segundos no DWCS e no R1 no debut. Lane perdeu as ultimas 2 no R1.' },
        { num: '2/4', text: 'A estatistica mais assustadora: Baraniewski tem 75% de precisao de strikes no UFC. SETENTA E CINCO. Contra um cara com 48% de defesa. Faca as contas.' },
        { num: '3/4', text: 'Lane e 15cm mais alto com 6 polegadas a mais de envergadura. Mas ta descendo do peso-pesado pro meio-pesado aos 38 anos depois de 2 derrotas no R1. A variavel e o tamanho.' },
        { num: '4/4', text: 'Previsao: Baraniewski por KO no primeiro round. O polones e explosivo demais e Lane esta vulneravel demais.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'Esse cara nocauteou em 20 SEGUNDOS no Contender Series. E agora enfrenta um ex-jogador da NFL que mede 1,98m. Quem leva?' },
        { time: '10-25s', title: 'Contexto', text: 'Iwo Baraniewski, 7-0, polones, base judo, dois nocautes relampago. Austen Lane, 13-7, ex-NFL, 1,98m, descendo do peso-pesado. O tamanho contra a tecnica.' },
        { time: '25-40s', title: 'Analise', text: 'Baraniewski e melhor em tudo exceto tamanho. Lane foi nocauteado e finalizado nas ultimas 2. A matematica favorece o polones, mas a diferenca de tamanho e real.' },
        { time: '40-55s', title: 'Previsao', text: 'Baraniewski por KO no R1. O polones e explosivo demais, e Lane esta em momento muito ruim. Pode ser outra noite rapida.' },
      ],
      tiktok: [
        { hook: 'Nocaute em 20 SEGUNDOS. Esse cara e REAL.', body: 'Iwo Baraniewski nocauteou Mahamed Aly em 20 segundos no Contender Series. Depois nocauteou Ibo Aslan no R1 do debut. Agora enfrenta Austen Lane, um ex-jogador da NFL de 1,98m. Mas Lane perdeu as ultimas 2 no R1.', cta: 'O polones nocauteia de novo? Comenta!' },
        { hook: 'Ex-jogador da NFL de 1,98m contra judoca de 1,83m. Quem vence?', body: 'Austen Lane jogou na NFL como defensive end. 1,98m, 203cm de envergadura. Mas ele perdeu as ultimas 2 lutas no R1 e esta descendo de peso. Baraniewski e invicto com 5 KOs em 7 lutas. Tamanho vs tecnica.', cta: 'Tamanho ou tecnica? Comenta!' },
      ],
      headlines: [
        'Baraniewski vs Lane: O Judoca de 20 Segundos Contra o Gigante da NFL',
        'Iwo Baraniewski Pode Confirmar o Hype Com Mais um Nocaute Relampago?',
        'Austen Lane Desce de Peso e Busca Renascimento no Meio-Pesado',
        'UFC Londres: A Diferenca de 15cm de Altura Vai Importar?',
        'O Prospect Polones Mais Explosivo do UFC Enfrenta Seu Maior Teste Fisico',
        '7-0 Com Todos os Finishes no R1: Baraniewski e o Prospect Mais Assustador do UFC?',
        'Da NFL ao Octogono: Lane Tem 15cm a Mais Mas 2 Derrotas no R1 Seguidas',
      ],
      podcast: [
        {
          timestamp: '0:00-2:00',
          title: 'O Homem dos 20 Segundos',
          talking_points: [
            'Baraniewski e 7-0 com TODOS os finishes no primeiro round. O nocaute de 20 segundos no DWCS contra Mahamed Aly e um dos mais rapidos da historia do programa.',
            'O debut contra Ibo Aslan terminou em 89 segundos. 75% de precisao de strikes no UFC. O poder e real.',
            'Lane e o teste fisico mais extremo: 1,98m, 203cm de envergadura (6 polegadas a mais), ex-defensive end da NFL. Mas 2 derrotas no R1 seguidas.',
          ],
          discussion_questions: [
            'Baraniewski pode manter esse ritmo de finalizacoes no R1 conforme os oponentes melhoram?',
          ],
        },
        {
          timestamp: '2:00-4:00',
          title: 'Apostas e O Que Observar',
          talking_points: [
            'Melhor aposta: Baraniewski KO/TKO R1 a -200 e Under 1.5 rounds a -180. As ultimas 4 lutas combinadas terminaram no R1 ou R2.',
            'O unico argumento pro Lane e o tamanho. Se voce acredita que 15cm e 6 polegadas de envergadura podem manter Baraniewski longe, Lane a +350 tem valor extremo.',
            'O que observar: a primeira troca de golpes. Se Baraniewski fechar distancia e conectar, acabou. Se Lane usar o jab e manter longe, a luta muda.',
          ],
          discussion_questions: [
            'Lane descendo de peso pela primeira vez: isso melhora a velocidade ou drena a energia?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-450',
        fighter2_odds: '+350',
        fighter1_name: 'Iwo Baraniewski',
        fighter2_name: 'Austen Lane',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Poder Explosivo de Baraniewski', stat_headline: '2 NOCAUTES CONSECUTIVOS NO R1, UM EM APENAS 20 SEGUNDOS', contexto: 'Baraniewski finaliza com velocidade absurda. O poder e genuino e o timing e preciso.', implicacao_aposta: 'Forte edge para Baraniewski dentro da distancia e Under 1.5 rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Durabilidade em Questao de Lane', stat_headline: 'LANE FOI FINALIZADO NAS ULTIMAS 2 LUTAS (PINTO NO R2, PETRINO NO R1)', contexto: 'O queixo e a capacidade de sobreviver de Lane estao em serio declinio. Nocauteado e finalizado consecutivamente.', implicacao_aposta: 'Aumenta drasticamente a probabilidade de finalizacao precoce de Baraniewski.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'BarChart3', titulo: 'Diferenca de Tamanho: 15cm de Altura', stat_headline: 'LANE E 1,98M COM 203CM DE ENVERGADURA VS 1,83M DE BARANIEWSKI', contexto: 'A diferenca fisica e massiva. Se Lane usar o tamanho de forma inteligente, pode manter Baraniewski longe.', implicacao_aposta: 'Unico argumento para Lane. Se voce acredita que tamanho importa mais que tudo.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Estreia no Meio-Pesado para Lane', stat_headline: 'LANE DESCE DO PESO-PESADO (265 LBS) PARA O MEIO-PESADO (205 LBS)', contexto: 'Primeira vez na carreira que Lane faz 205 lbs. A descida de 60 lbs pode afetar desempenho positiva ou negativamente.', implicacao_aposta: 'Incognita total. Nao aposte pesado em Lane baseado na descida de peso.', edge_level: 'leve', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Baraniewski por KO/TKO R1', odds: '-200', confianca: 'alta', raciocinio: 'O cenario mais provavel dado o historico de ambos. Baraniewski finaliza no R1, Lane e finalizado no R1. Convergencia total.' },
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-180', confianca: 'alta', raciocinio: 'As ultimas 4 lutas combinadas (2 de cada) terminaram nos dois primeiros rounds. A probabilidade de ir alem disso e baixa.' },
        { tipo: 'Moneyline', pick: 'Baraniewski (-450)', odds: '-450', confianca: 'media', edge_vs_mercado: 'O preco e alto mas justificado. Nao oferece grande valor.', raciocinio: 'Baraniewski e favorito claro, mas -450 nao da muito retorno. Melhor apostar no metodo e round.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Lane por Decisao',
        descricao: 'As ultimas 4 lutas combinadas de ambos terminaram nos dois primeiros rounds. Apostar em decisao nessa luta e ir contra toda a evidencia recente. Se vai ter vencedor, vai ser por finalizacao.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};

const analiseEN: FullSingleAnalise = {
  ...analisePT,
  titulo: 'Baraniewski vs Lane: The Undefeated Judoka vs the NFL Athlete',
  subtitulo: 'The 7-0 Polish prospect with two 20-second knockouts faces the former NFL player switching weight classes',
  evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Light Heavyweight (205 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM-HIGH' },
  fighter2_info: { ...analisePT.fighter2_info, ultimasLutas: [{ result: 'L', opponent: 'Vitor Petrino', method: 'Submission R1', event: 'UFC Fight Night' }, { result: 'L', opponent: 'Mario Pinto', method: 'KO R2', event: 'UFC Fight Night' }] },
  full_analysis: {
    hero: { ...analisePT.full_analysis.hero, evento_data: 'March 21, 2026', evento_local: 'The O2 Arena, London, United Kingdom', categoria_peso: 'Light Heavyweight (205 lbs)', tagline: 'The Undefeated Judoka vs the NFL Giant', tagline_sub: 'Polish prospect with lightning knockouts faces the former NFL player making his light heavyweight debut', fighter1: { ...analisePT.full_analysis.hero.fighter1, ranking: 'N/R Light Heavyweight', info_extra: 'Poland | 27 years old' }, fighter2: { ...analisePT.full_analysis.hero.fighter2, ranking: 'N/R Light Heavyweight', info_extra: 'USA | 38 years old' } },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Explosive Power vs Raw Size</h3>
        <p class="mb-4"><strong class="text-ufc-red">Iwo Baraniewski</strong> is the kind of prospect that scares people. The 27-year-old Pole isn't just undefeated at 7-0; he finishes fights at absurd speed. On the Contender Series, he knocked out Mahamed Aly in 20 seconds. In his UFC debut against Ibo Aslan, he got a first-round knockout and earned Performance of the Night. With a judo background and explosive power in his hands, Baraniewski is a wrecking ball the UFC is carefully building.</p>
        <p class="mb-4">On the other side is <strong class="text-blue-400">Austen Lane</strong>, a completely different story. A former NFL defensive end (he played for the Jacksonville Jaguars, Detroit Lions, and other teams), Lane brought his absurd athleticism to MMA after retiring from football. At 6'6" with an 80-inch reach, he's physically imposing. But recent results haven't been good: two consecutive losses, knocked out by Mario Pinto in the second round and submitted by Vitor Petrino. Now, at 38, he's dropping from heavyweight to light heavyweight looking for a fresh start.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">The Polish Mission</h3>
        <p class="mb-4">For Baraniewski, this is the chance to confirm his debut wasn't a fluke. Lane, despite recent results, is a real physical test: taller, heavier, with massive reach and NFL-level athleticism. If the Pole can get through Lane dominantly, he positions himself as one of the most dangerous light heavyweight prospects. If Lane surprises at his new weight, it could be the career turnaround he desperately needs.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Unranked', fighter2: 'Unranked' },
        { dimensao: 'Streak', fighter1: '7-fight win streak (undefeated)', fighter2: '2-fight losing streak' },
        { dimensao: 'Goal', fighter1: 'Confirm the hype at 2-0 in the UFC', fighter2: 'Snap the losing streak at new weight class' },
        { dimensao: 'Risk', fighter1: 'First career loss against experienced veteran', fighter2: 'Third consecutive loss' },
      ],
      prognostico: {
        fighter1_vence: { titulo: 'THE WRECKING BALL KEEPS ROLLING', subtitulo: 'Baraniewski knocks out Lane and establishes himself as a top light heavyweight prospect', consequencias: [{ tag: 'RANKING', texto: 'Baraniewski at 8-0 starts appearing on the light heavyweight ranking radar' }, { tag: 'NEXT', texto: 'Fight against an established veteran or fellow prospect on the next European card' }], proxima_luta: 'Baraniewski vs ranked top 15 opponent' },
        fighter2_vence: { titulo: 'THE NFL NEVER DIES', subtitulo: 'Lane uses size and athleticism to surprise at his new weight class', consequencias: [{ tag: 'REDEMPTION', texto: 'Lane snaps the losing streak and proves the weight cut was the right decision' }, { tag: 'NEXT', texto: 'More fights at light heavyweight against similar-level opponents' }], proxima_luta: 'Lane vs light heavyweight opponent on the next card' },
      },
    },
    momento_atual: {
      fighter1: { ...analisePT.full_analysis.momento_atual.fighter1, recent_fights: [{ date: 'Dec 2025', opponent: 'Ibo Aslan', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'First-round knockout on UFC debut. Earned Performance of the Night. Impressive.' }, { date: 'Sep 2025', opponent: 'Mahamed Aly', result: 'W', method: 'KO R1 (0:20)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Poor', note: 'Knockout in 20 seconds on the Contender Series. Earned UFC contract on the spot.' }], full_fight_history: [{ date: 'Sep 2025', opponent: 'Mahamed Aly', result: 'W', method: 'KO R1 (0:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'DWCS, UFC contract' }, { date: 'Dec 2025', opponent: 'Ibo Aslan', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'UFC debut, Performance of the Night' }], momentum_label: 'On Fire', momentum_note: 'Baraniewski is in the best possible moment. Undefeated, two consecutive lightning knockouts, UFC contract earned dramatically and debut with a bonus. The hype is justified and the activity level is perfect.' },
      fighter2: { ...analisePT.full_analysis.momento_atual.fighter2, recent_fights: [{ date: 'Jul 2025', opponent: 'Vitor Petrino', result: 'L', method: 'Submission R1 (RNC)', opponent_rank: '#12 HW', quality_score: 3, quality_label: 'Good', note: 'Submitted by rear-naked choke in the first round by the Brazilian prospect.' }, { date: 'Mar 2025', opponent: 'Mario Pinto', result: 'L', method: 'KO R2 (0:39)', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Poor', note: 'Knocked out in the second round by left-right. Second consecutive loss.' }, { date: 'Oct 2024', opponent: 'Robelis Despaigne', result: 'W', method: 'Unanimous Decision', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Poor', note: 'First and only UFC win by unanimous decision.' }, { date: 'Apr 2024', opponent: 'Jhonata Diniz', result: 'L', method: 'KO R2', opponent_rank: 'N/R HW', quality_score: 1, quality_label: 'Poor', note: 'Knocked out in the second round by the former GLORY fighter.' }], full_fight_history: [{ date: 'Jun 2023', opponent: 'Justin Tafa', result: 'NC', method: 'NC R1 (eye poke)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'No Contest from accidental eye poke' }, { date: 'Sep 2023', opponent: 'Justin Tafa', result: 'L', method: 'KO R1', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Average', note: 'R1 KO in the rematch' }, { date: 'Apr 2024', opponent: 'Jhonata Diniz', result: 'L', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'R2 KO' }, { date: 'Oct 2024', opponent: 'Robelis Despaigne', result: 'W', method: 'UD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Only UFC win' }, { date: 'Mar 2025', opponent: 'Mario Pinto', result: 'L', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'R2 KO' }, { date: 'Jul 2025', opponent: 'Vitor Petrino', result: 'L', method: 'Sub R1', opponent_rank: '#12 HW', quality_score: 3, quality_label: 'Good', note: 'R1 submission' }], momentum_label: 'Declining', momentum_note: 'Lane is in a negative spiral. Two consecutive quick losses, knocked out by Pinto in R2 and submitted by Petrino in R1. The decision to drop to light heavyweight at 38 is a risky but necessary gamble. Another loss and his UFC situation becomes unsustainable.' },
    },
    nivel_competicao: { fighter1: { nome: 'Baraniewski', media_oponentes: 2, media_oponentes_label: 'Average', aproveitamento: '1W-0L (100%)', contra_top5: '0W-0L' }, fighter2: { nome: 'Lane', media_oponentes: 2, media_oponentes_label: 'Average', aproveitamento: '1W-4L (20%)', contra_top5: '0W-0L' }, oponentes_em_comum_count: { fighter1: 0, fighter2: 0 }, oponentes_em_comum_note: 'No common opponents. Baraniewski is new to the UFC (just 1 fight). Lane has 6 UFC bouts (1-4, 1 NC) but with poor recent results.' },
    oponente_comum: null,
    comparacao_estatistica: { stats: [
      { label: 'Sig. Strikes Per Minute', valueA: 7.50, valueB: 3.82, maxVal: 10, format: 'decimal' },
      { label: 'Striking Accuracy (%)', valueA: 75, valueB: 42, maxVal: 100, format: 'percent' },
      { label: 'Strikes Absorbed/Min', valueA: 3.75, valueB: 5.31, maxVal: 8, format: 'decimal', reverseWinner: true },
      { label: 'Strike Defense (%)', valueA: 50, valueB: 48, maxVal: 100, format: 'percent' },
      { label: 'Takedowns Per 15 Min', valueA: 0.00, valueB: 0.68, maxVal: 4, format: 'decimal' },
      { label: 'Takedown Accuracy (%)', valueA: 0, valueB: 36, maxVal: 100, format: 'percent' },
      { label: 'Takedown Defense (%)', valueA: 100, valueB: 50, maxVal: 100, format: 'percent' },
    ], tale_of_tape: [
      { label: 'Age', fighter1: '27 years old', fighter2: '38 years old', note: 'Baraniewski 11 years younger' },
      { label: 'Height', fighter1: '6\'0" (1.83m)', fighter2: '6\'6" (1.98m)', note: 'Lane 6 inches taller' },
      { label: 'Reach', fighter1: '74" (187cm)', fighter2: '80" (203cm)', note: 'Lane with 6-inch reach advantage' },
      { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Orthodox', note: null },
      { label: 'Background', fighter1: 'Judo', fighter2: 'Ex-NFL (Defensive End)', note: 'Completely different athleticism' },
    ] },
    perfil_habilidades: { skills: [
      { label: 'Knockout Power', valueA: 88, valueB: 65, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: '5 KOs in 7 fights for Baraniewski. Knocked out Aslan and Aly in seconds. Real explosive power.' },
      { label: 'Technical Striking', valueA: 72, valueB: 48, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Baraniewski has 75% accuracy in the UFC vs 42% for Lane. Clear technical gap.' },
      { label: 'Wrestling/Grappling', valueA: 70, valueB: 55, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Baraniewski has a judo background with 2 career submissions. Lane has 1 career submission and limited grappling technique.' },
      { label: 'Athleticism & Explosion', valueA: 85, valueB: 72, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Baraniewski is explosive and young. Lane has NFL athleticism but at 38, the explosion has diminished.' },
      { label: 'Chin & Durability', valueA: 65, valueB: 50, labelA: 'Good', labelB: 'Average', advantage: 'fighter1', advantage_note: 'Baraniewski has never been dropped. Lane was KO\'d by Pinto in R2 and submitted by Petrino in R1 in his last 2 fights.' },
      { label: 'Physical Advantage', valueA: 40, valueB: 80, labelA: 'Average', labelB: 'Very Good', advantage: 'fighter2', advantage_note: 'Lane is 6 inches taller with 6 inches more reach. Significant physical advantage.' },
    ], insight: 'Baraniewski holds the advantage in almost everything except physical size. The Pole is more technical, more explosive, younger, and more confident. Lane has size, but recent results suggest he hasn\'t been able to use that advantage effectively.' },
    distribuicao_vitorias: { ...analisePT.full_analysis.distribuicao_vitorias, insight: 'Baraniewski has never gone to a decision: 100% of wins by finish (71% KO, 29% submission). Lane is even more of a knockout artist (85% KO) but has been getting finished frequently recently. The trend points to a short fight with a finish.' },
    danger_zones: { zones: [
      { rounds: 'R1', danger_level: 9, danger_label: 'BARANIEWSKI ADVANTAGE', color: 'red', title: 'The Demolition Zone', description: 'Baraniewski finished his last two fights in the first round, one in 20 seconds. Lane was finished in his last two fights quickly (Petrino in R1, Pinto in R2). The convergence is clear: if someone is getting knocked out early, it\'s likely Lane. The Pole enters with the intention of ending it fast.' },
      { rounds: 'R2', danger_level: 5, danger_label: 'EVEN', color: 'gold', title: 'Unknown Territory', description: 'If the fight reaches R2, we enter unknown territory for both. Baraniewski has never needed a second round in the UFC. Lane could find his rhythm if he survives the first assault. Lane\'s size advantage could start to matter here.' },
      { rounds: 'R3', danger_level: 4, danger_label: 'LANE ADVANTAGE', color: 'green', title: 'The Veteran\'s Experience', description: 'If the fight drags to R3, Lane has experience in longer fights (1 career decision, against Despaigne). Baraniewski has never gone to a decision. Lane\'s size and the natural cardio from his NFL days could be factors in this scenario.' },
    ] },
    intangiveis: { items: [
      { icon: 'TrendingUp', title: 'Momentum vs Spiral', fighter: 'Baraniewski', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Baraniewski is at his peak: undefeated, two devastating knockouts, Performance of the Night bonus. Lane is in a spiral: two consecutive losses in R1. The momentum contrast is enormous.' },
      { icon: 'AlertTriangle', title: 'Compromised Chin', fighter: 'Lane', risk_level: 'HIGH RISK', risk_color: 'red', description: 'Lane was knocked out by Mario Pinto in R2 and submitted by Petrino in R1 in his last two fights. His durability is in serious question. Against Baraniewski\'s power, that\'s concerning.' },
      { icon: 'Activity', title: 'Weight Cut', fighter: 'Lane', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Lane is making his light heavyweight debut (205 lbs) coming from heavyweight (265 lbs). Losing nearly 60 lbs could affect power, endurance, and recovery. Total unknown.' },
      { icon: 'Shield', title: 'Absurd Size Advantage', fighter: 'Lane', risk_level: 'POSITIVE', risk_color: 'green', description: 'Lane is 6 inches taller and has 6 inches more reach. Even at light heavyweight, he\'ll be significantly bigger. If he uses the jab and maintains distance, he could frustrate Baraniewski.' },
      { icon: 'Zap', title: 'Judoka Explosiveness', fighter: 'Baraniewski', risk_level: 'POSITIVE', risk_color: 'green', description: 'The judo background gives Baraniewski unique explosiveness to close distance quickly. Even with Lane\'s reach, if Baraniewski closes, the judo could be decisive.' },
    ] },
    caminhos_vitoria: {
      fighter1: { nome: 'Baraniewski', total_probability: 72, scenarios: [
        { name: 'Lightning Knockout', probability: 40, method: 'KO/TKO R1', description: 'Baraniewski closes the distance with judoka explosiveness, lands heavy combinations and knocks out Lane in the first round. Most likely scenario given both fighters\' histories.' },
        { name: 'Takedown & Submission', probability: 18, method: 'Submission R1-R2', description: 'Baraniewski uses his judo to take Lane down and finds a submission. Has 2 career submissions and the technical background for it.' },
        { name: 'Technical Domination', probability: 14, method: 'TKO R2-R3', description: 'Baraniewski hurts Lane early but doesn\'t get the immediate finish. Accumulates damage and the referee stops it in the second or third round.' },
      ] },
      fighter2: { nome: 'Lane', total_probability: 26, scenarios: [
        { name: 'The Giant\'s Jab', probability: 10, method: 'Unanimous Decision', description: 'Lane uses his 6-inch height and 6-inch reach advantage to keep Baraniewski at distance with the jab. Wins on points without ever letting the Pole close.' },
        { name: 'Power Counter', probability: 9, method: 'KO/TKO R1-R2', description: 'Baraniewski comes forward aggressively and Lane finds a counter or uppercut with his natural 120kg power. Size could be the equalizer.' },
        { name: 'New Weight Effect', probability: 7, method: 'Decision/TKO', description: 'The drop to light heavyweight rejuvenates Lane. Faster, lighter, with renewed energy, he surprises with superior cardio and volume.' },
      ] },
    },
    previsao_final: {
      ...analisePT.full_analysis.previsao_final, confidence_label: 'MEDIUM-HIGH',
      explanation: 'Baraniewski is more technical, more explosive, younger, and has far superior momentum. Lane comes off two losses in R1 with a compromised chin, and is making his debut at a new weight class at 38 years old. Baraniewski\'s power combined with Lane\'s recent fragility points strongly to an early knockout by the Pole. The only variable is Lane\'s size, which could complicate things if he manages to maintain distance. But historically, Lane hasn\'t shown the ability to do that.',
      x_factor: { title: 'The Weight Cut', description: 'Nobody knows how Lane will react at light heavyweight. If he comes in light, fast, and energized, he could be a better version of himself. If the weight loss affects his power and endurance, he could be even more vulnerable.' },
      upset_alert: { title: 'Size Matters', description: 'Lane is MUCH bigger than Baraniewski. 6 inches of height, 6 inches of reach. If he uses the jab and maintains distance, Baraniewski could struggle to get inside. The Pole has never faced someone this large.' },
    },
    o_que_observar: { points: [
      { num: 1, title: 'The First 60 Seconds', icon: 'Zap', description: 'Baraniewski is dangerous from the opening bell (knocked out Aly in 20 seconds). If he closes the distance quickly, the fight could end before Lane has a chance to use his size.' },
      { num: 2, title: 'Lane\'s Jab', icon: 'Target', description: 'If Lane uses the jab intelligently to maintain distance, he could frustrate Baraniewski\'s entries. With 6 extra inches of reach, the jab is his best weapon.' },
      { num: 3, title: 'Lane\'s Physique at New Weight', icon: 'Activity', description: 'Watch how Lane moves at light heavyweight. If he looks slow or heavy despite the weight cut, that\'s a bad sign. If he looks lighter and more agile, it could be an improved version.' },
      { num: 4, title: 'Baraniewski\'s Judo Entries', icon: 'Shield', description: 'Baraniewski has a judo background. If Lane pushes him to the clinch, the Pole could use throws and trips to take it to the ground. Watch the clinch attempts.' },
      { num: 5, title: 'Lane\'s Chin', icon: 'AlertTriangle', description: 'Lane was KO\'d by Pinto in R2 and submitted by Petrino in R1 in his last 2 fights. If Baraniewski lands something clean in the opening minutes, Lane\'s reaction will reveal whether the chin can hold up.' },
    ] },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'YOUTH vs EXPERIENCE', content: 'BARANIEWSKI vs LANE\nUFC London | Light Heavyweight\n\n7-0 vs 13-7\n27-year-old undefeated judoka\nvs 38-year-old ex-NFL athlete', color: 'red' },
        { slide_number: 2, title: 'BARANIEWSKI: WRECKING BALL', content: '7-0 career record\n5 KOs (71%)\nContender Series: KO in 20 SECONDS\nUFC debut: KO R1 + POTN\n27 years old, judo base', color: 'red' },
        { slide_number: 3, title: 'LANE: THE NFL GIANT', content: '13-7 career record\n6\'6" tall\n80" reach\nFormer NFL defensive end\nLight heavyweight debut at 38', color: 'blue' },
        { slide_number: 4, title: 'PREDICTION', content: 'BARANIEWSKI by KO/TKO R1\n\nConfidence: MEDIUM-HIGH\n72% Baraniewski / 26% Lane\n\nThe Pole is too much for Lane\nright now.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Baraniewski vs Lane: 27-year-old undefeated judoka against a 38-year-old former NFL player. Baraniewski knocked out in 20 seconds on DWCS and R1 on debut. Lane lost his last 2 in R1.' },
        { num: '2/4', text: 'The scariest stat: Baraniewski has 75% striking accuracy in the UFC. SEVENTY-FIVE. Against a guy with 48% defense. Do the math.' },
        { num: '3/4', text: 'Lane is 6 inches taller with 6 inches more reach. But he\'s dropping from heavyweight to light heavyweight at 38 after 2 losses in R1. The variable is the size.' },
        { num: '4/4', text: 'Prediction: Baraniewski by KO in the first round. The Pole is too explosive and Lane is too vulnerable right now.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'This guy knocked someone out in 20 SECONDS on the Contender Series. And now he faces a former NFL player who\'s 6\'6". Who takes it?' },
        { time: '10-25s', title: 'Context', text: 'Iwo Baraniewski, 7-0, Polish, judo base, two lightning knockouts. Austen Lane, 13-7, ex-NFL, 6\'6", dropping from heavyweight. Size vs technique.' },
        { time: '25-40s', title: 'Analysis', text: 'Baraniewski is better at everything except size. Lane was knocked out and submitted in his last 2. The math favors the Pole, but the size difference is real.' },
        { time: '40-55s', title: 'Prediction', text: 'Baraniewski by KO in R1. The Pole is too explosive, and Lane is in a really bad stretch. Could be another quick night.' },
      ],
      tiktok: [
        { hook: 'Knockout in 20 SECONDS. This guy is LEGIT.', body: 'Iwo Baraniewski knocked out Mahamed Aly in 20 seconds on the Contender Series. Then knocked out Ibo Aslan in R1 on debut. Now he faces Austen Lane, a former NFL player who\'s 6\'6". But Lane lost his last 2 in R1.', cta: 'Does the Pole knock out again? Comment!' },
        { hook: 'Former NFL player at 6\'6" vs 6\'0" judoka. Who wins?', body: 'Austen Lane played in the NFL as a defensive end. 6\'6", 80-inch reach. But he lost his last 2 fights in R1 and is cutting weight. Baraniewski is undefeated with 5 KOs in 7 fights. Size vs technique.', cta: 'Size or technique? Comment!' },
      ],
      headlines: ['Baraniewski vs Lane: The 20-Second Judoka vs the NFL Giant', 'Can Iwo Baraniewski Confirm the Hype With Another Lightning Knockout?', 'Austen Lane Drops Weight and Seeks Rebirth at Light Heavyweight', 'UFC London: Will the 6-Inch Height Difference Matter?', 'The Most Explosive Polish UFC Prospect Faces His Biggest Physical Test'],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...analisePT.full_analysis.radar_apostador!.odds, source: 'Average across sportsbooks (March 2026)' },
      edges: [
        { icon: 'Zap', titulo: 'Baraniewski\'s Explosive Power', stat_headline: '2 CONSECUTIVE R1 KNOCKOUTS, ONE IN JUST 20 SECONDS', contexto: 'Baraniewski finishes at absurd speed. The power is genuine and the timing is precise.', implicacao_aposta: 'Strong edge for Baraniewski inside the distance and Under 1.5 rounds.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Lane\'s Durability in Question', stat_headline: 'LANE WAS FINISHED IN HIS LAST 2 FIGHTS (PINTO R2 KO, PETRINO R1 SUB)', contexto: 'Lane\'s chin and ability to survive are in serious decline. Knocked out and submitted consecutively.', implicacao_aposta: 'Drastically increases the probability of an early Baraniewski finish.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'BarChart3', titulo: 'Size Difference: 6 Inches of Height', stat_headline: 'LANE IS 6\'6" WITH 80" REACH VS BARANIEWSKI\'S 6\'0"', contexto: 'The physical difference is massive. If Lane uses his size intelligently, he could keep Baraniewski at bay.', implicacao_aposta: 'Only argument for Lane. If you believe size matters more than everything else.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Light Heavyweight Debut for Lane', stat_headline: 'LANE DROPS FROM HEAVYWEIGHT (265 LBS) TO LIGHT HEAVYWEIGHT (205 LBS)', contexto: 'First time in his career Lane makes 205 lbs. The 60-lb drop could affect performance positively or negatively.', implicacao_aposta: 'Total unknown. Don\'t bet heavy on Lane based on the weight cut.', edge_level: 'leve', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Method', pick: 'Baraniewski by KO/TKO R1', odds: '-200', confianca: 'alta', raciocinio: 'The most likely scenario given both fighters\' histories. Baraniewski finishes in R1, Lane gets finished in R1. Total convergence.' },
        { tipo: 'Over/Under', pick: 'Under 1.5 Rounds', odds: '-180', confianca: 'alta', raciocinio: 'The last 4 combined fights (2 each) all ended in the first two rounds. The probability of going further is low.' },
        { tipo: 'Moneyline', pick: 'Baraniewski (-450)', odds: '-450', confianca: 'media', edge_vs_mercado: 'The price is high but justified. Doesn\'t offer great value.', raciocinio: 'Baraniewski is the clear favorite, but -450 doesn\'t give much return. Better to bet on method and round.' },
      ],
      armadilha: { titulo: 'Trap: Lane by Decision', descricao: 'The last 4 combined fights of both fighters ended in the first two rounds. Betting on a decision in this fight goes against all recent evidence. If there\'s a winner, it\'ll be by finish.' },
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
