'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';


const analisePT: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'bahamondes-vs-musayev',
  evento_id: null,
  slug: 'bahamondes-vs-musayev',
  titulo: 'Bahamondes vs Musayev: Nocaute ou Nada',
  subtitulo: 'Dois finalizadores brutais que somam 29 KOs em 39 vitorias se encontram em Seattle',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,91m', envergadura: '192cm', idade: 28, academia: 'Valle Flow Striking, Santiago' },
      fighter2: { altura: '1,78m', envergadura: '183cm', idade: 36, academia: 'Baku, Azerbaijao' },
    },
    pathsToVictory: { fighter1: [], fighter2: [] },
    dangerZones: [],
  },
  fight_prediction: {
    predictedWinner: 'fighter1',
    predictedMethod: 'KO/TKO R1-R2',
    confidence: 'MEDIA',
    fighter1Scenarios: [],
    fighter2Scenarios: [],
    keyFactors: [],
    xFactor: { title: '', description: '' },
  },
  fighter1_info: {
    nome: 'Ignacio Bahamondes',
    record: '17-6-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Rafael Fiziev', method: 'Decisao Unanime', event: 'UFC on ABC 8' },
      { result: 'W', opponent: 'Jalin Turner', method: 'Sub R1 (triangulo)', event: 'UFC 313' },
      { result: 'W', opponent: 'Manuel Torres', method: 'TKO R1', event: 'UFC 306' },
    ],
  },
  fighter2_info: {
    nome: 'Tofiq Musayev',
    record: '22-6-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Myktybek Orolbai', method: 'Sub R1 (kimura)', event: 'UFC on ABC 8' },
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
  analysis_type: 'prelims',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  // ===========================
  // PrelimsAnalysisData (6 Sections)
  // ===========================
  prelims_analysis: {
    // ── Section 1: Hero ──
    hero: {
      evento_nome: 'UFC Fight Night: Adesanya vs Pyfer',
      evento_data: '28 de Marco, 2026',
      categoria_peso: 'Peso-Leve (155 lbs)',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Bahamondes',
        record: '17-6-0',
        ranking: 'N/R Peso-Leve',
      },
      fighter2: {
        nome: 'Musayev',
        record: '22-6-0',
        ranking: 'N/R Peso-Leve',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 4.19,
          valueB: 3.42,
          maxVal: 7,
          format: 'decimal',
          note: 'Bahamondes tem volume superior de strikes significativos por minuto. Ambos sao agressivos em pe, mas Bahamondes mantem ritmo mais constante ao longo dos rounds.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 47,
          valueB: 48,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao praticamente identica. Nenhum dos dois e um sniper, mas ambos conectam golpes pesados quando acertam.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.85,
          valueB: 5.14,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Musayev absorveu um volume enorme de strikes na sua unica luta no UFC contra Orolbai. Bahamondes tambem nao e o mais defensivo, mas absorve menos proporcionalmente.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 52,
          valueB: 40,
          maxVal: 100,
          format: 'percent',
          note: 'Bahamondes tem defesa significativamente superior. Musayev com apenas 40% mostrou vulnerabilidade defensiva preocupante na sua estreia no UFC.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 0.46,
          valueB: 0.00,
          maxVal: 4,
          format: 'decimal',
          note: 'Nenhum dos dois e grappler ofensivo. Bahamondes tenta quedas esporadicamente, mas esta luta sera resolvida primariamente em pe.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 50,
          valueB: 0,
          maxVal: 100,
          format: 'percent',
          note: 'Bahamondes converte metade das suas tentativas quando decide ir ao chao. Musayev nao tentou nenhum takedown na sua luta no UFC.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 73,
          valueB: 50,
          maxVal: 100,
          format: 'percent',
          note: 'Bahamondes tem defesa de queda decente com 73%. Musayev com 50% e mais vulneravel se levado ao chao, como ficou evidente na derrota por kimura contra Orolbai.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '28 anos',
          fighter2: '36 anos',
          note: 'Diferenca de 8 anos. Bahamondes esta no auge fisico enquanto Musayev, aos 36, precisa provar que ainda mantem a explosividade que o tornou campeao do Grand Prix do Rizin.',
        },
        {
          label: 'Altura',
          fighter1: '1,91m (6\'3")',
          fighter2: '1,78m (5\'10")',
          note: 'Vantagem enorme de 13 centimetros para Bahamondes. Para um peso-leve, 1,91m e gigantesco e dificulta muito a entrada de Musayev.',
        },
        {
          label: 'Envergadura',
          fighter1: '192cm (75.5")',
          fighter2: '183cm (72")',
          note: 'Quase 10cm de envergadura a mais para Bahamondes. Ele pode manter Musayev na distancia com jabs e chutes longos, forçando o azerbaijano a cruzar uma zona de perigo para conectar.',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: 'Ambos ortodoxos. Luta espelhada sem vantagem angular.',
        },
        {
          label: 'Academia',
          fighter1: 'Valle Flow Striking, Santiago',
          fighter2: 'Baku, Azerbaijao',
          note: 'Bahamondes treina com base no Chile com foco em striking. Musayev vem do sistema azerbaijano com base em artes marciais tradicionais (karate, pankration, kung-fu).',
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Bahamondes',
        recent_fights: [
          {
            date: 'Jun 2025',
            opponent: 'Rafael Fiziev',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: '#10 LW',
            quality_score: 5,
            quality_label: 'Excelente',
            note: 'Enfrentou um dos melhores strikers da divisao e perdeu por decisao. Mostrou que pertence ao nível, mas nao conseguiu superar a tecnica de Fiziev em tres rounds.',
          },
          {
            date: 'Mar 2025',
            opponent: 'Jalin Turner',
            result: 'W',
            method: 'Sub R1 (triangulo)',
            opponent_rank: '#15 LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Surpreendeu finalizando Turner com triangulo no primeiro round. Terceiro bonus de Performance da Noite consecutivo, mostrando versatilidade alem do striking.',
          },
          {
            date: 'Set 2024',
            opponent: 'Manuel Torres',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R LW',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute devastador no primeiro round contra o mexicano. Segundo bonus de Performance da Noite consecutivo.',
          },
          {
            date: 'Abr 2024',
            opponent: 'Christos Giagos',
            result: 'W',
            method: 'KO R1 (head kick)',
            opponent_rank: 'N/R LW',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Head kick brutal que viralizou. Primeiro dos tres bonus de Performance da Noite consecutivos que construiram seu hype.',
          },
          {
            date: 'Ago 2023',
            opponent: 'Ludovit Klein',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R LW',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Derrota frustrante por decisao. Mostrou que quando nao consegue a finalizacao rapida, pode ter dificuldade em lutas que vao a distancia.',
          },
        ],
      },
      fighter2: {
        nome: 'Musayev',
        recent_fights: [
          {
            date: 'Jun 2025',
            opponent: 'Myktybek Orolbai',
            result: 'L',
            method: 'Sub R1 (kimura)',
            opponent_rank: 'N/R LW',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Estreia no UFC terminou em derrota rapida por kimura no primeiro round. Expôs fragilidade no grappling defensivo que preocupa.',
          },
          {
            date: 'Jul 2022',
            opponent: 'Sidney Outlaw',
            result: 'W',
            method: 'KO R1 (27 segundos)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Nocaute relampago em 27 segundos no Bellator. O tipo de poder explosivo que o tornou famoso nas organizacoes asiaticas.',
          },
          {
            date: 'Dez 2021',
            opponent: 'Roberto de Souza',
            result: 'L',
            method: 'Sub R1 (triangulo)',
            opponent_rank: 'Campeao Rizin LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Derrota por triangulo na luta pelo titulo do Rizin peso-leve. Segundo padrao de vulnerabilidade a submissoes.',
          },
          {
            date: 'Dez 2019',
            opponent: 'Patricky Freire',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'Desafiante Bellator LW',
            quality_score: 4,
            quality_label: 'Muito Bom',
            note: 'Vitoria historica na final do Grand Prix do Rizin contra veterano do Bellator. Lutou com a mao quebrada no segundo round e ainda venceu nos scorecards.',
          },
          {
            date: 'Set 2019',
            opponent: 'Johnny Case',
            result: 'W',
            method: 'TKO R1',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Semifinal do Grand Prix do Rizin. Derrubou Case no inicio do round e finalizou com strikes no chao.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Striking em Pe',
          valueA: 78,
          valueB: 72,
          labelA: 'Muito Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Bahamondes combina alcance enorme com chutes de longa distancia letais, incluindo head kicks que ja viralizaram. Musayev tem poder de nocaute puro nas maos, mas precisa entrar na distancia curta para ser efetivo, o que e dificil contra alguem de 1,91m.',
        },
        {
          label: 'Poder de Nocaute',
          valueA: 82,
          valueB: 88,
          labelA: 'Muito Bom',
          labelB: 'Muito Bom',
          advantage: 'fighter2',
          advantage_note: 'Musayev tem 18 KOs em 22 vitorias, uma taxa absurda de 82% de nocaute. Bahamondes tem 11 KOs em 17 vitorias (65%). Ambos sao perigosos, mas Musayev carrega poder de outra dimensao nas maos.',
        },
        {
          label: 'Grappling Defensivo',
          valueA: 68,
          valueB: 38,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Bahamondes tem 73% de defesa de takedown e ja mostrou capacidade de submeter oponentes (triangulo em Turner). Musayev foi finalizado por kimura (Orolbai) e triangulo (De Souza), revelando fragilidade grave no chao.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 62,
          valueB: 45,
          labelA: 'Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Bahamondes consegue manter ritmo por tres rounds, como mostrou contra Fiziev. Musayev e um lutador de explosao inicial: 18 dos seus 22 nocautes foram no primeiro round. Se a luta se estender, o ritmo cai.',
        },
        {
          label: 'Gestao de Distancia',
          valueA: 75,
          valueB: 50,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Com 13cm de vantagem de altura e quase 10cm de envergadura, Bahamondes pode controlar a distancia com jabs e chutes longos. Musayev precisa fechar essa distancia para ser efetivo, e isso e a chave da luta.',
        },
        {
          label: 'Experiencia em Alto Nivel',
          valueA: 65,
          valueB: 60,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'even',
          advantage_note: 'Bahamondes tem 9 lutas no UFC (6-3) e enfrentou Fiziev e Turner. Musayev foi campeao do Grand Prix do Rizin e lutou no Bellator, mas tem apenas uma luta no UFC (derrota). Experiencias diferentes mas ambos testados em nivel competitivo.',
        },
      ],
      insight: 'A luta se resume a uma questao: Musayev consegue fechar a distancia contra o alcance gigantesco de Bahamondes? Se sim, o poder azerbaijano pode acabar com qualquer um. Se nao, Bahamondes vai desmontá-lo com chutes e golpes longos. O grappling e o coringa: Bahamondes pode surpreender com submissoes, enquanto Musayev foi finalizado duas vezes na carreira e mostrou fragilidade clara no chao.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Bahamondes',
        ko_tko: { count: 11, percent: 65 },
        submission: { count: 2, percent: 12 },
        decision: { count: 4, percent: 23 },
        total_wins: 17,
      },
      fighter2: {
        nome: 'Musayev',
        ko_tko: { count: 18, percent: 82 },
        submission: { count: 2, percent: 9 },
        decision: { count: 2, percent: 9 },
        total_wins: 22,
      },
      insight: 'Dois finalizadores natos que raramente deixam a luta ir para os juizes. Bahamondes tem 65% de vitorias por KO/TKO e recentemente adicionou a submissao ao repertorio (triangulo em Turner). Musayev e ainda mais explosivo: 82% das suas 22 vitorias terminaram em nocaute, com apenas 2 decisoes na carreira inteira. A diferenca e que Bahamondes mostrou capacidade de ir a distancia contra Fiziev, enquanto Musayev e quase exclusivamente um lutador do primeiro round. Se nenhum dos dois nocautear o outro nos primeiros minutos, a luta favorece fortemente o chileno.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Bahamondes',
      winner_side: 'fighter1',
      predicted_method: 'TKO R2 ou Decisao Unanime',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'Bahamondes entra como favorito nas casas de apostas (em torno de -200 a -270) e as razoes sao claras. A vantagem fisica e enorme: 13cm de altura e quase 10cm de envergadura criam um problema estrutural para Musayev, que precisa entrar na distancia curta para usar seu poder de nocaute. Bahamondes tambem esta no auge aos 28 anos, vem de tres finalizacoes no primeiro round antes da derrota para Fiziev, e tem quatro bonus de Performance da Noite nas costas. Musayev, aos 36 anos e vindo de derrota por submissao na estreia no UFC, precisa provar que pertence a este nivel. O cenario mais provavel: Bahamondes controla a distancia no primeiro round com chutes e jabs longos, e no segundo round encontra a abertura para um TKO quando Musayev comeca a forcar a entrada de forma previsivel. Se Musayev sobreviver os dois primeiros rounds, a luta provavelmente vai para decisao com Bahamondes dominando os scorecards pelo volume.',
      x_factor: {
        title: 'O poder de nocaute de Musayev nos primeiros 3 minutos',
        description: 'Musayev tem 18 nocautes na carreira e a maioria aconteceu no primeiro round. Se ele conectar um golpe limpo nos primeiros minutos, nada mais importa. Bahamondes ja foi nocauteado e nao e conhecido pela defesa impenetravel. Uma unica troca na distancia curta pode virar toda a logica da luta.',
      },
      upset_alert: {
        title: 'Musayev em modo Grand Prix',
        description: 'Musayev conquistou o Grand Prix do Rizin vencendo tres lutas em uma noite, incluindo a final com a mao quebrada. Quando esta 100% motivado e com as costas na parede (como agora, precisando de sua primeira vitoria no UFC), ele e capaz de performances extraordinarias. Se ele entrar determinado a trocar desde o primeiro segundo e nao deixar Bahamondes estabelecer a distancia, a surpresa e completamente viavel.',
      },
      probabilities: {
        fighter1: { nome: 'Bahamondes', percent: 62 },
        fighter2: { nome: 'Musayev', percent: 35 },
        draw: 3,
      },
      value_picks: undefined,
    },
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang')) || 'pt';
  const analise = lang === 'pt' ? analisePT : analisePT;
  return <PrelimsAnalysisView analise={analise} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg" />}>
      <PageContent />
    </Suspense>
  );
}
