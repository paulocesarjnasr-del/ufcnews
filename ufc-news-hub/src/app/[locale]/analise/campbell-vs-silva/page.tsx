'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import type { Lang } from '@/lib/i18n-labels';

const analisePT: FullSingleAnalise = {
  id: 'campbell-vs-silva',
  evento_id: null,
  slug: 'campbell-vs-silva',
  titulo: 'Campbell vs Silva: A Pantera de Liverpool Faz Sua Estreia',
  subtitulo: 'O prospect invicto de 8-0 do Contender Series enfrenta o veterano americano de 10-2 em seu debut no UFC',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,75m', envergadura: '183cm', idade: 23, academia: 'The MMA Academy, Liverpool' },
      fighter2: { altura: '1,80m', envergadura: '178cm', idade: 29, academia: 'Bloodline Combat Sports, Costa Mesa' },
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
    nome: 'Kurtis Campbell',
    record: '8-0-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Danny Silva',
    record: '10-2-0',
    ultimasLutas: [
      { result: 'L', opponent: 'Kevin Vallejos', method: 'Decisao Unanime', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Lucas Almeida', method: 'Decisao Dividida', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Joshua Culibao', method: 'Decisao Dividida', event: 'UFC Fight Night' },
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
      tagline: 'A Pantera de Liverpool Invade o O2 Arena',
      tagline_sub: 'Prospect invicto de 8-0 faz seu debut no UFC contra veterano americano de 10-2 em Londres',
      fighter1: {
        nome_completo: 'Kurtis "The Pink Panther" Campbell',
        apelido: 'The Pink Panther',
        sobrenome: 'Campbell',
        record: '8-0-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Liverpool, Inglaterra | 23 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Danny "El Puma" Silva',
        apelido: 'El Puma',
        sobrenome: 'Silva',
        record: '10-2-0',
        ranking: 'N/R Peso-Pena',
        info_extra: 'Santa Ana, California, EUA | 29 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Liverpool Envia Sua Pantera</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Kurtis Campbell</strong> e a definicao de prospect empolgante. Com apenas 23 anos, o garoto de Liverpool ja acumula um recorde invicto de 8-0, cinco titulos amadores, e um contrato do UFC conquistado no Contender Series em setembro de 2025 com uma performance que chamou a atencao de todo o mundo. Apelidado de "The Pink Panther" por causa de um episodio de podcast que virou marca registrada, Campbell trouxe sua identidade visual, estilo agressivo de Muay Thai e uma confianca que so os jovens de Liverpool carregam.
        </p>
        <p class="mb-4">
          Fazer o debut no UFC em casa, no O2 Arena em Londres, e o cenario dos sonhos para qualquer prospect britanico. A torcida vai estar ensurdecedora, e Campbell sabe exatamente como canalizar essa energia. Mas ele precisa tomar cuidado para nao deixar a emocao atrapalhar.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">El Puma Nao Veio Passear</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Danny Silva</strong> pode nao ter o hype de Campbell, mas nao falta experiencia. O americano de Santa Ana, California, tem 10-2 na carreira e ja tem tres lutas no UFC. A estreia foi uma vitoria por decisao dividida sobre Joshua Culibao, seguida por outra dividida contra Lucas Almeida. A unica derrota no UFC veio contra Kevin Vallejos, um prospect dinamico que esta em ascensao. Com 29 anos, Silva e um boxer nato que troca de stance constantemente e sabe competir em lutas apertadas.
        </p>
        <p class="mb-4">
          Essa e uma luta classica de debut: o prospect empolgante contra o veterano que ja sabe como funciona o UFC. Campbell tem poder, agressividade e torcida. Silva tem experiencia, compostura e a capacidade de vencer rounds apertados. Quem impoe o estilo, vence.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (debut UFC)', fighter2: 'Sem ranking' },
        { dimensao: 'Sequencia', fighter1: '8 vitorias consecutivas (invicto)', fighter2: 'Vem de derrota' },
        { dimensao: 'Objetivo', fighter1: 'Debut perfeito em casa no UFC', fighter2: 'Voltar ao caminho das vitorias e estragar a festa' },
        { dimensao: 'Risco', fighter1: 'Primeira derrota no debut mais importante da carreira', fighter2: 'Segunda derrota consecutiva pode complicar posicao no UFC' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A PANTERA ROSA ATACA',
          subtitulo: 'Campbell faz um debut espetacular em casa com a torcida de Liverpool em erupcao',
          consequencias: [
            { tag: 'HYPE', texto: 'Campbell se estabelece como o prospect mais empolgante do peso-pena britanico com debut dominante' },
            { tag: 'PROXIMA', texto: 'Luta contra oponente de nivel similar ou prospect estabelecido no proximo card' },
          ],
          proxima_luta: 'Campbell vs prospect do peso-pena no proximo card',
        },
        fighter2_vence: {
          titulo: 'EL PUMA SILENCIA LONDRES',
          subtitulo: 'Silva usa experiencia para frustrar o debut de Campbell diante da torcida hostil',
          consequencias: [
            { tag: 'CREDIBILIDADE', texto: 'Silva prova que experiencia no UFC importa mais que hype do Contender Series' },
            { tag: 'PROXIMA', texto: 'Silva ganha confianca e busca sequencia de vitorias no peso-pena' },
          ],
          proxima_luta: 'Silva vs oponente do peso-pena no proximo card americano',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Kurtis Campbell',
        color: 'red',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Demba Seck', result: 'W', method: 'TKO R1 (1:20, joelho e socos)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Ruim', note: 'Nocauteou Demba Seck no primeiro round com joelho e socos no Contender Series. Ganhou contrato do UFC.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Demba Seck', result: 'W', method: 'TKO R1 (1:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'DWCS, contrato UFC conquistado' },
        ],
        layoff_warning: null,
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Campbell esta no pico de empolgacao. Invicto em 8 lutas, contrato do UFC conquistado de forma impressionante, e agora o debut em casa em Londres. Tudo esta alinhado para o melhor cenario possivel. A unica incognita e como ele vai reagir ao nivel do UFC.',
      },
      fighter2: {
        nome: 'Danny Silva',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Kevin Vallejos', result: 'L', method: 'Decisao Unanime', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Derrota por decisao unanime para o prospect argentino em ascensao. Luta competitiva mas Vallejos foi superior.' },
          { date: 'Mar 2025', opponent: 'Lucas Almeida', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada por decisao dividida. Silva mostrou compostura em luta equilibrada.' },
          { date: 'Mar 2024', opponent: 'Joshua Culibao', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut no UFC com vitoria apertada por decisao dividida.' },
        ],
        full_fight_history: [
          { date: 'Mar 2024', opponent: 'Joshua Culibao', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Debut UFC, decisao dividida' },
          { date: 'Mar 2025', opponent: 'Lucas Almeida', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Segunda vitoria, decisao dividida' },
          { date: 'Ago 2025', opponent: 'Kevin Vallejos', result: 'L', method: 'UD', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Bom', note: 'Primeira derrota UFC' },
        ],
        layoff_warning: null,
        momentum_score: 4,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Silva vem de derrota para Vallejos, mas as duas vitorias anteriores (mesmo que por decisao dividida) mostram que ele sabe competir em lutas apertadas. O problema e que ele nunca domina: todas as decisoes foram divididas ou apertadas. Contra um prospect empolgante em casa, ele precisa fazer mais.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Campbell',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: 'Debut UFC',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Silva',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '2W-1L (67%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Sem oponentes em comum. Campbell ainda nao lutou no UFC. Silva tem tres lutas na organizacao com resultados mistos (2-1).',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 0, valueB: 3.88, maxVal: 6, format: 'decimal', note: 'Campbell sem dados UFC' },
        { label: 'Precisao de Strikes (%)', valueA: 0, valueB: 47, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorvidos/Min', valueA: 0, valueB: 4.22, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Defesa de Strikes (%)', valueA: 0, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Takedowns por 15 Min', valueA: 0, valueB: 0.64, maxVal: 4, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 0, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 0, valueB: 75, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '23 anos', fighter2: '29 anos', note: 'Campbell 6 anos mais jovem' },
        { label: 'Altura', fighter1: '1,75m (5\'9")', fighter2: '1,80m (5\'11")', note: 'Silva 5cm mais alto' },
        { label: 'Envergadura', fighter1: '183cm (72")', fighter2: '178cm (70")', note: 'Campbell com leve vantagem de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Switch Stance', note: 'Silva troca de stance constantemente' },
        { label: 'Background', fighter1: 'Muay Thai', fighter2: 'Boxe', note: 'Striker vs Striker' },
        { label: 'Dados UFC', fighter1: 'Debut (sem dados)', fighter2: '3 lutas (2-1)', note: 'Silva com mais dados disponiveis' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking/Muay Thai', valueA: 75, valueB: 68, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Campbell tem base forte em Muay Thai com cinco titulos amadores. Arma principal. Porem sem dados UFC para confirmar.' },
        { label: 'Boxe Puro', valueA: 60, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Silva e descrito como boxer nato que troca de stance. Mais experiencia em trocacoes de boxe no UFC.' },
        { label: 'Poder de Nocaute', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Campbell finalizou a maioria das lutas (63% KO). Silva tem 50% de KOs e 50% decisoes, sem submissoes na carreira.' },
        { label: 'Experiencia UFC', valueA: 20, valueB: 62, labelA: 'Ruim', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Silva tem 3 lutas no UFC e sabe como funciona o octogono. Campbell faz o debut.' },
        { label: 'Compostura em Lutas Apertadas', valueA: 50, valueB: 70, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Silva venceu duas decisoes divididas. Sabe competir quando a luta e apertada.' },
        { label: 'Atletismo e Juventude', valueA: 82, valueB: 68, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Campbell tem 23 anos e esta no pico atletico. A juventude e explosividade sao vantagens reais.' },
      ],
      insight: 'Luta interessante entre o hype do prospect e a realidade do UFC. Campbell traz poder, juventude e torcida. Silva traz experiencia, compostura e adaptabilidade. A grande incognita e como Campbell vai reagir ao nivel do UFC em seu debut.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Campbell',
        ko_tko: { count: 5, percent: 63 },
        submission: { count: 1, percent: 12 },
        decision: { count: 2, percent: 25 },
        total_wins: 8,
      },
      fighter2: {
        nome: 'Silva',
        ko_tko: { count: 5, percent: 50 },
        submission: { count: 0, percent: 0 },
        decision: { count: 5, percent: 50 },
        total_wins: 10,
      },
      insight: 'Campbell e mais finalizador: 63% KO + 12% sub = 75% de finalizacoes. Silva tem divisao igual entre KOs e decisoes (50/50), sem submissoes. Os perfis sao diferentes: Campbell busca encerrar, Silva compete. Isso pode criar uma dinamica onde Campbell pressiona e Silva tenta sobreviver para vencer nos pontos.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 7,
          danger_label: 'VANTAGEM CAMPBELL',
          color: 'red',
          title: 'A Energia do Debut em Casa',
          description: 'Campbell vai entrar com toda a energia do O2 Arena. A torcida de Liverpool vai estar ensurdecedora. O primeiro round e quando o prospect esta mais explosivo, mais rapido e mais perigoso. Se Campbell conectar algo limpo com o poder do Muay Thai, pode encerrar cedo.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round de Adaptacao',
          description: 'Se Campbell nao conseguir a finalizacao no R1, o segundo round pode nivelar. Silva ja mostrou que sabe se adaptar e competir em rounds individuais. A experiencia do americano pode comecar a pesar se Campbell gastar muita energia no primeiro round.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VANTAGEM SILVA',
          color: 'green',
          title: 'A Experiencia Fala Mais Alto',
          description: 'Se a luta chegar ao R3, Silva esta em territorio familiar. Ele tem 5 decisoes em 10 vitorias na carreira e sabe como vencer rounds apertados. Campbell nunca foi a distancia de 3 rounds no nivel UFC e a fadiga do debut pode afetar seu desempenho.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Debut em Casa', fighter: 'Campbell', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Campbell faz o debut no UFC em Londres, com a torcida de Liverpool no O2 Arena. Para um garoto de 23 anos, essa e a plataforma dos sonhos. A energia pode elevar a performance a outro nivel.' },
        { icon: 'AlertTriangle', title: 'Nervosismo de Debut', fighter: 'Campbell', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Debuter no UFC e intenso. A pressao da torcida, as camaras, a expectativa. Campbell nunca experimentou nada parecido. Se o nervosismo atrapalhar, os primeiros minutos podem ser complicados.' },
        { icon: 'Brain', title: 'Experiencia no Octogono', fighter: 'Silva', risk_level: 'POSITIVO', risk_color: 'green', description: 'Silva ja lutou 3 vezes no UFC e sabe como funciona. Sabe lidar com a pressao, com os juizes, com o ritmo do octogono. Essa experiencia e valiosa contra um debutante.' },
        { icon: 'TrendingUp', title: 'Invencibilidade e Confianca', fighter: 'Campbell', risk_level: 'POSITIVO', risk_color: 'green', description: 'Campbell nunca perdeu (8-0). A invencibilidade carrega um peso psicologico positivo. Ele entra acreditando que vai vencer, e essa confianca pode ser o diferencial.' },
        { icon: 'Clock', title: 'Idade: 23 vs 29', fighter: 'Campbell', risk_level: 'POSITIVO', risk_color: 'green', description: 'Campbell e 6 anos mais jovem, no auge atletico com reflexos e explosividade superiores. Aos 23, ele tem tempo e energia de sobra.' },
        { icon: 'Eye', title: 'Switch Stance de Silva', fighter: 'Silva', risk_level: 'POSITIVO', risk_color: 'green', description: 'Silva troca de stance constantemente, o que pode confundir Campbell no debut. Enfrentar um switch-stance pela primeira vez no UFC adiciona uma camada de complexidade.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Campbell',
        total_probability: 58,
        scenarios: [
          { name: 'Nocaute do Debut', probability: 28, method: 'KO/TKO R1-R2', description: 'Campbell entra agressivo com o apoio da torcida, conecta combinacoes de Muay Thai e nocauteia Silva nos dois primeiros rounds. A energia do debut e o poder fazem a diferenca.' },
          { name: 'Dominio Atletico', probability: 18, method: 'Decisao Unanime', description: 'Campbell usa juventude e atletismo para dominar o ritmo da luta. Vence todos os rounds com volume, velocidade e pressao, sem conseguir a finalizacao.' },
          { name: 'TKO por Acumulo', probability: 12, method: 'TKO R2-R3', description: 'Campbell machuca Silva cedo mas nao consegue encerrar. O dano acumula e o arbitro para a luta nos rounds seguintes.' },
        ],
      },
      fighter2: {
        nome: 'Silva',
        total_probability: 40,
        scenarios: [
          { name: 'A Decisao do Veterano', probability: 20, method: 'Decisao Unanime/Dividida', description: 'Silva usa experiencia e compostura para sobreviver o primeiro round, adaptar-se ao estilo de Campbell e vencer nos pontos com ajustes taticos. A troca de stance confunde o debutante.' },
          { name: 'Contragolpe Preciso', probability: 12, method: 'KO/TKO R2-R3', description: 'Campbell vem para frente com muita emocao e Silva encontra o contragolpe perfeito. O americano tem nocautes na carreira e sabe punir agressividade excessiva.' },
          { name: 'Wrestle e Neutraliza', probability: 8, method: 'Decisao', description: 'Silva muda o plano de jogo e busca takedowns para neutralizar o striking de Campbell e acumular pontos no chao.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Kurtis Campbell',
      winner_side: 'fighter1',
      predicted_method: 'KO/TKO R1-R2',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Campbell tem o poder, a juventude, a invencibilidade e a torcida a seu favor. O Muay Thai dele e sua arma principal e Silva, apesar da experiencia no UFC, nunca demonstrou ser um finalizador perigoso. As duas vitorias de Silva foram por decisao dividida, o que sugere que ele nao domina adversarios. Contra um prospect explosivo em casa, as chances de Silva vencer nos pontos diminuem. No entanto, a incognita do debut e real: Campbell nunca lutou nesse nivel, e a experiencia de Silva pode ser decisiva se a luta for apertada.',
      x_factor: {
        title: 'O Debut e Imprevisivel',
        description: 'Debuts no UFC sao sempre imprevisiveis. Prospects do Contender Series podem brilhar ou congelar. A pressao do O2 Arena, as camaras e a magnitude do momento podem afetar Campbell de formas que ninguem consegue prever.',
      },
      upset_alert: {
        title: 'Silva Ja Sabe Como Funciona',
        description: 'Silva tem 3 lutas no UFC e sabe competir em rounds apertados. Se Campbell gastar energia demais no primeiro round sem conseguir a finalizacao, Silva pode tomar conta da luta nos R2 e R3 com experiencia e compostura.',
      },
      probabilities: {
        fighter1: { nome: 'Campbell', percent: 58 },
        fighter2: { nome: 'Silva', percent: 40 },
        draw: 2,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'Os Primeiros 2 Minutos de Campbell', icon: 'Zap', description: 'Observe como Campbell lida com a emocao do debut. Se ele entrar focado e agressivo de forma calculada, como fez no Contender Series, sera perigoso. Se deixar a emocao tomar conta, pode cometer erros.' },
        { num: 2, title: 'A Troca de Stance de Silva', icon: 'Eye', description: 'Silva troca de stance constantemente (ortodoxo para southpaw e vice-versa). Observe como Campbell reage a isso. Se ele se confundir, Silva pode encontrar angulos inesperados.' },
        { num: 3, title: 'O Volume de Campbell', icon: 'Activity', description: 'Campbell tem base de Muay Thai e tende a ser agressivo. Se ele mantiver volume alto de strikes, chutes e joelhadas, Silva vai ter dificuldade para competir. Se o volume cair, e sinal de fadiga ou nervosismo.' },
        { num: 4, title: 'A Reacao de Silva ao Poder', icon: 'Shield', description: 'Silva nunca foi finalizado por nocaute no UFC (a unica derrota foi por decisao). Se Campbell conectar algo pesado, a reacao de Silva vai revelar se ele aguenta o poder ou se esta em perigo.' },
        { num: 5, title: 'A Torcida de Liverpool', icon: 'MapPin', description: 'Campbell e de Liverpool e a torcida Scouse vai estar em peso no O2 Arena. Observe como essa energia afeta ambos os lutadores. Para Campbell, pode ser combustivel. Para Silva, pode ser intimidador.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'DEBUT DA PANTERA', content: 'CAMPBELL vs SILVA\nUFC Londres | Peso Pena\n\n8-0 vs 10-2\nA Pantera Rosa de Liverpool\nfaz seu debut no UFC', color: 'red' },
        { slide_number: 2, title: 'CAMPBELL: A PANTERA ROSA', content: '8-0 na carreira (invicto)\n5 nocautes (63%)\n5 titulos amadores\nContender Series: contrato UFC\n23 anos, Liverpool, Muay Thai', color: 'red' },
        { slide_number: 3, title: 'SILVA: EL PUMA', content: '10-2 na carreira\n2-1 no UFC\nBoxer com switch stance\n50% das vitorias por decisao\n29 anos, Santa Ana, California', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'CAMPBELL por KO/TKO R1-R2\n\nConfianca: MEDIA\n58% Campbell / 40% Silva\n\nO debut em casa pode ser\nespetacular. Ou imprevisivel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Campbell vs Silva: a Pantera Rosa de Liverpool faz o debut no UFC em casa! 8-0, invicto, 5 KOs, 23 anos. Contra Silva (10-2, 2-1 UFC, 29 anos), o boxer de switch stance.' },
        { num: '2/4', text: 'Kurtis Campbell e o tipo de prospect que faz eventos de Londres especiais. 5 titulos amadores, contrato do Contender Series, e agora o debut no O2 Arena. A torcida de Liverpool vai estar em peso.' },
        { num: '3/4', text: 'Silva nao e facil. 2-1 no UFC, venceu duas decisoes divididas. Sabe competir em lutas apertadas. Mas nunca enfrentou alguem com o poder e a energia de Campbell em casa.' },
        { num: '4/4', text: 'Previsao: Campbell por nocaute nos dois primeiros rounds. O Muay Thai, o poder e a torcida vao ser demais. Mas debuts sao imprevisiveis.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'A Pantera Rosa de Liverpool faz o debut no UFC. 8-0, invicto, 5 KOs, e 20 mil pessoas gritando o nome dele. Kurtis Campbell esta pronto?' },
        { time: '10-25s', title: 'Contexto', text: 'Campbell, 23 anos, Muay Thai, contrato do Contender Series. Enfrenta Danny Silva, 10-2, 29 anos, 2-1 no UFC, boxer com switch stance. Prospect vs experiencia.' },
        { time: '25-40s', title: 'Analise', text: 'Campbell tem poder e torcida. Silva tem experiencia e compostura. Se Campbell conectar cedo, acabou. Se a luta for apertada, Silva sabe vencer nos pontos.' },
        { time: '40-55s', title: 'Previsao', text: 'Campbell por nocaute no R1 ou R2. Mas cuidado: debuts sao imprevisiveis e Silva ja sobreviveu a 3 lutas no UFC.' },
      ],
      tiktok: [
        { hook: 'A PANTERA ROSA de Liverpool faz o debut no UFC em CASA.', body: 'Kurtis Campbell. 23 anos. 8-0. Invicto. 5 nocautes. Contrato do Contender Series. E agora o debut no O2 Arena com 20 mil britanicos gritando. O cara e de Liverpool e a torcida Scouse nao brinca. Danny Silva tem experiencia, mas sera que aguenta?', cta: 'O debut vai ser KO ou vai ser luta? Comenta!' },
        { hook: 'Esse garoto tem 23 anos e NUNCA perdeu. E agora enfrenta um veterano do UFC em casa.', body: 'Kurtis Campbell vs Danny Silva. A Pantera Rosa contra El Puma. Campbell com Muay Thai e 5 KOs. Silva com boxe e switch stance. Quem leva o duelo de felinos?', cta: 'Pantera ou Puma? Comenta!' },
      ],
      headlines: [
        'Campbell vs Silva: A Pantera Rosa de Liverpool Faz o Debut Dos Sonhos',
        'Kurtis Campbell Pode Ser o Proximo Grande Nome do Peso-Pena Britanico?',
        'O Debut em Casa: 8-0 e Torcida de Liverpool no O2 Arena',
        'Danny Silva Quer Estragar a Festa da Pantera Rosa em Londres',
        'UFC Londres: O Prospect do Contender Series Contra o Veterano do Octogono',
        '8-0 Com 63% de KO Rate: A Pantera Rosa e Real ou Hype?',
        'Campbell -220: O Debut Mais Esperado do Card de Londres',
      ],
      podcast: [
        {
          timestamp: '0:00-2:00',
          title: 'A Pantera Rosa de Liverpool',
          talking_points: [
            'Campbell e 8-0 com 63% de KO rate e 5 titulos amadores. Ganhou o contrato no Contender Series com TKO no R1 contra Demba Seck. Treina no Next Gen MMA Liverpool.',
            'Silva (10-2, 2-1 UFC) nao e qualquer oponente. Venceu duas decisoes divididas no UFC. Sabe competir. Mas vem de derrota pra Vallejos.',
            'O cenario do debut em casa: 20 mil britanicos no O2 Arena, torcida de Liverpool em peso. A energia pode ser positiva ou negativa pra um debutante de 23 anos.',
          ],
          discussion_questions: [
            'Debuts no UFC com torcida em casa: historicamente, funciona ou pesa mais?',
          ],
        },
        {
          timestamp: '2:00-4:00',
          title: 'Apostas e Previsao',
          talking_points: [
            'Campbell -220 e favorito justificado pelo poder e juventude. Mas debuts sao imprevisiveis e Silva tem experiencia no octogono.',
            'Melhor aposta: Campbell KO/TKO a -110. Under 2.5 rounds se voce acredita no poder. Silva ML a +170 tem valor como azarao se voce desconfia de debutantes.',
            'Armadilha: apostar pesado em qualquer debutante do DWCS. O historico de debutantes e misto demais pra ter confianca alta.',
          ],
          discussion_questions: [
            'Silva ja sobreviveu 3 lutas no UFC. A compostura dele pode frustrar o debutante?',
          ],
        },
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-200',
        fighter2_odds: '+170',
        fighter1_name: 'Kurtis Campbell',
        fighter2_name: 'Danny Silva',
        source: 'Media de casas de apostas (marco 2026)',
      },
      edges: [
        { icon: 'Zap', titulo: 'Poder de Finalizacao de Campbell', stat_headline: '63% DAS VITORIAS POR KO/TKO, 5 EM 8 LUTAS (+ TKO NO DWCS CONTRA DEMBA SECK)', contexto: 'Campbell e um finalizador nato com base de Muay Thai. Tende a buscar a finalizacao cedo.', implicacao_aposta: 'Favorece Campbell dentro da distancia. Under pode ter valor se voce acredita no poder.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Debut em Casa em Londres', stat_headline: 'CAMPBELL DE LIVERPOOL LUTA NO O2 ARENA COM 20.000 BRITANICOS', contexto: 'Cenario dos sonhos para um debut. A energia da torcida pode ser o diferencial.', implicacao_aposta: 'Favorece Campbell emocionalmente. Mas tambem pode gerar pressao excessiva.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Experiencia UFC de Silva', stat_headline: '3 LUTAS NO UFC, 2 VITORIAS POR DECISAO DIVIDIDA', contexto: 'Silva sabe como funciona o octogono. Sabe competir em lutas apertadas e vencer nos pontos.', implicacao_aposta: 'Nao descarte Silva por decisao. Ele sabe como ganhar rounds.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Incognita do Debut', stat_headline: 'CAMPBELL NUNCA LUTOU NO UFC, ZERO DADOS NO OCTOGONO', contexto: 'Prospects do Contender Series podem brilhar ou congelar no debut. E impossivel prever com certeza.', implicacao_aposta: 'Aumenta a incerteza geral. Nao aposte pesado em Campbell sem considerar o risco do debut.', edge_level: 'leve', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Campbell (-200)', odds: '-200', confianca: 'media', raciocinio: 'Campbell e favorito por boas razoes: invicto, poder, juventude, torcida. Mas -200 nao oferece muito valor dado a incognita do debut.' },
        { tipo: 'Metodo', pick: 'Campbell por KO/TKO', odds: '-110', confianca: 'media', raciocinio: 'Com 63% de KO rate e Silva absorvendo 4.22 strikes por minuto, a finalizacao por strikes e o cenario mais provavel se Campbell vencer.' },
        { tipo: 'Moneyline', pick: 'Silva (+170)', odds: '+170', confianca: 'baixa', edge_vs_mercado: 'Silva como azarao a +170 tem algum valor dado sua experiencia no UFC.', raciocinio: 'Se voce acredita que a experiencia supera o hype, Silva a +170 e uma aposta de valor razoavel. Ele sabe competir em lutas apertadas.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Apostar Pesado em Debutantes',
        descricao: 'Prospects do Contender Series tem um historico misto em debuts. A empolgacao pode enganar. Campbell e talentoso, mas sem dados UFC, apostar pesado e assumir risco desnecessario. Considere apostas menores ou por metodo em vez de moneyline alto.',
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
  titulo: 'Campbell vs Silva: The Pink Panther Makes His Debut',
  subtitulo: 'The undefeated 8-0 Contender Series prospect faces a 10-2 American veteran in his UFC debut',
  evento_data: 'March 21, 2026',
  evento_local: 'The O2 Arena, London, United Kingdom',
  categoria_peso: 'Featherweight (145 lbs)',
  fight_prediction: { ...analisePT.fight_prediction, confidence: 'MEDIUM' },
  fighter1_info: { ...analisePT.fighter1_info },
  fighter2_info: {
    ...analisePT.fighter2_info,
    ultimasLutas: [
      { result: 'L', opponent: 'Kevin Vallejos', method: 'Unanimous Decision', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Lucas Almeida', method: 'Split Decision', event: 'UFC Fight Night' },
      { result: 'W', opponent: 'Joshua Culibao', method: 'Split Decision', event: 'UFC Fight Night' },
    ],
  },
  full_analysis: {
    hero: {
      ...analisePT.full_analysis.hero,
      evento_data: 'March 21, 2026',
      evento_local: 'The O2 Arena, London, United Kingdom',
      categoria_peso: 'Featherweight (145 lbs)',
      tagline: 'The Pink Panther Invades the O2 Arena',
      tagline_sub: 'Undefeated 8-0 prospect makes his UFC debut against a 10-2 American veteran in London',
      fighter1: { ...analisePT.full_analysis.hero.fighter1, ranking: 'N/R Featherweight', info_extra: 'Liverpool, England | 23 years old' },
      fighter2: { ...analisePT.full_analysis.hero.fighter2, ranking: 'N/R Featherweight', info_extra: 'Santa Ana, California, USA | 29 years old' },
    },
    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Liverpool Unleashes Its Panther</h3>
        <p class="mb-4">
          <strong class="text-ufc-red">Kurtis Campbell</strong> is the definition of an exciting prospect. At just 23 years old, the Liverpool native already boasts an undefeated 8-0 record, five amateur titles, and a UFC contract earned on the Contender Series in September 2025 with a performance that caught the attention of the entire MMA world. Nicknamed "The Pink Panther" after a podcast episode that became his trademark, Campbell brings his signature visual identity, aggressive Muay Thai style, and the kind of confidence that only Liverpool kids carry.
        </p>
        <p class="mb-4">
          Making his UFC debut at home, in the O2 Arena in London, is the dream scenario for any British prospect. The crowd will be deafening, and Campbell knows exactly how to channel that energy. But he needs to be careful not to let the emotions get in the way.
        </p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">El Puma Didn't Come to Sightsee</h3>
        <p class="mb-4">
          <strong class="text-blue-400">Danny Silva</strong> may not have Campbell's hype, but he doesn't lack experience. The American from Santa Ana, California has a 10-2 career record and already has three UFC fights under his belt. His debut was a split decision win over Joshua Culibao, followed by another split decision against Lucas Almeida. His only UFC loss came against Kevin Vallejos, a dynamic prospect on the rise. At 29, Silva is a natural boxer who constantly switches stances and knows how to compete in close fights.
        </p>
        <p class="mb-4">
          This is a classic debut matchup: the exciting prospect versus the veteran who already knows how the UFC works. Campbell has power, aggression, and the crowd. Silva has experience, composure, and the ability to win tight rounds. Whoever imposes their style wins.
        </p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Unranked (UFC debut)', fighter2: 'Unranked' },
        { dimensao: 'Streak', fighter1: '8-fight win streak (undefeated)', fighter2: 'Coming off a loss' },
        { dimensao: 'Goal', fighter1: 'Perfect home debut in the UFC', fighter2: 'Get back to winning and spoil the party' },
        { dimensao: 'Risk', fighter1: 'First career loss in the biggest fight of his life', fighter2: 'Second straight loss could jeopardize UFC roster spot' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'THE PINK PANTHER STRIKES',
          subtitulo: 'Campbell delivers a spectacular home debut with the Liverpool crowd erupting',
          consequencias: [
            { tag: 'HYPE', texto: 'Campbell establishes himself as the most exciting British featherweight prospect with a dominant debut' },
            { tag: 'NEXT', texto: 'Fight against a similar-level opponent or established prospect on the next card' },
          ],
          proxima_luta: 'Campbell vs featherweight prospect on the next card',
        },
        fighter2_vence: {
          titulo: 'EL PUMA SILENCES LONDON',
          subtitulo: 'Silva uses experience to derail Campbell\'s debut in front of a hostile crowd',
          consequencias: [
            { tag: 'CREDIBILITY', texto: 'Silva proves that UFC experience matters more than Contender Series hype' },
            { tag: 'NEXT', texto: 'Silva gains confidence and chases a winning streak at featherweight' },
          ],
          proxima_luta: 'Silva vs featherweight opponent on the next American card',
        },
      },
    },
    momento_atual: {
      fighter1: {
        ...analisePT.full_analysis.momento_atual.fighter1,
        recent_fights: [
          { date: 'Sep 2025', opponent: 'Demba Seck', result: 'W', method: 'TKO R1 (1:20, knee and punches)', opponent_rank: 'N/R (DWCS)', quality_score: 1, quality_label: 'Poor', note: 'Knocked out Demba Seck in the first round with a knee and punches on the Contender Series. Earned UFC contract.' },
        ],
        full_fight_history: [
          { date: 'Sep 2025', opponent: 'Demba Seck', result: 'W', method: 'TKO R1 (1:20)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'DWCS, earned UFC contract' },
        ],
        momentum_label: 'On Fire',
        momentum_note: 'Campbell is riding the hype wave. Undefeated in 8 fights, UFC contract earned impressively, and now his debut at home in London. Everything is aligned for the best possible scenario. The only unknown is how he\'ll react to UFC-level competition.',
      },
      fighter2: {
        ...analisePT.full_analysis.momento_atual.fighter2,
        recent_fights: [
          { date: 'Aug 2025', opponent: 'Kevin Vallejos', result: 'L', method: 'Unanimous Decision', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Good', note: 'Lost by unanimous decision to the rising Argentine prospect. Competitive fight but Vallejos was superior.' },
          { date: 'Mar 2025', opponent: 'Lucas Almeida', result: 'W', method: 'Split Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Close split decision win. Silva showed composure in a tight fight.' },
          { date: 'Mar 2024', opponent: 'Joshua Culibao', result: 'W', method: 'Split Decision', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut with a close split decision win.' },
        ],
        full_fight_history: [
          { date: 'Mar 2024', opponent: 'Joshua Culibao', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'UFC debut, split decision' },
          { date: 'Mar 2025', opponent: 'Lucas Almeida', result: 'W', method: 'SD', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Poor', note: 'Second win, split decision' },
          { date: 'Aug 2025', opponent: 'Kevin Vallejos', result: 'L', method: 'UD', opponent_rank: '#14 FW', quality_score: 3, quality_label: 'Good', note: 'First UFC loss' },
        ],
        momentum_label: 'Steady (with caveats)',
        momentum_note: 'Silva is coming off a loss to Vallejos, but his two previous wins (even by split decision) show he knows how to compete in close fights. The problem is he never dominates: all decisions were split or tight. Against an explosive prospect at home, he needs to do more.',
      },
    },
    nivel_competicao: {
      fighter1: { nome: 'Campbell', media_oponentes: 1, media_oponentes_label: 'Poor', aproveitamento: 'UFC Debut', contra_top5: '0W-0L' },
      fighter2: { nome: 'Silva', media_oponentes: 2, media_oponentes_label: 'Average', aproveitamento: '2W-1L (67%)', contra_top5: '0W-0L' },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'No common opponents. Campbell hasn\'t fought in the UFC yet. Silva has three octagon fights with mixed results (2-1).',
    },
    oponente_comum: null,
    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes Per Minute', valueA: 0, valueB: 3.88, maxVal: 6, format: 'decimal', note: 'Campbell has no UFC data' },
        { label: 'Striking Accuracy (%)', valueA: 0, valueB: 47, maxVal: 100, format: 'percent' },
        { label: 'Strikes Absorbed/Min', valueA: 0, valueB: 4.22, maxVal: 6, format: 'decimal', reverseWinner: true },
        { label: 'Strike Defense (%)', valueA: 0, valueB: 51, maxVal: 100, format: 'percent' },
        { label: 'Takedowns Per 15 Min', valueA: 0, valueB: 0.64, maxVal: 4, format: 'decimal' },
        { label: 'Takedown Accuracy (%)', valueA: 0, valueB: 50, maxVal: 100, format: 'percent' },
        { label: 'Takedown Defense (%)', valueA: 0, valueB: 75, maxVal: 100, format: 'percent' },
      ],
      tale_of_tape: [
        { label: 'Age', fighter1: '23 years old', fighter2: '29 years old', note: 'Campbell 6 years younger' },
        { label: 'Height', fighter1: '5\'9" (1.75m)', fighter2: '5\'11" (1.80m)', note: 'Silva 5cm taller' },
        { label: 'Reach', fighter1: '72" (183cm)', fighter2: '70" (178cm)', note: 'Campbell with slight reach advantage' },
        { label: 'Stance', fighter1: 'Orthodox', fighter2: 'Switch Stance', note: 'Silva constantly switches stances' },
        { label: 'Background', fighter1: 'Muay Thai', fighter2: 'Boxing', note: 'Striker vs Striker' },
        { label: 'UFC Data', fighter1: 'Debut (no data)', fighter2: '3 fights (2-1)', note: 'Silva has more data available' },
      ],
    },
    perfil_habilidades: {
      skills: [
        { label: 'Striking/Muay Thai', valueA: 75, valueB: 68, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Campbell has a strong Muay Thai base with five amateur titles. Primary weapon. But no UFC data to confirm.' },
        { label: 'Pure Boxing', valueA: 60, valueB: 72, labelA: 'Good', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Silva is described as a natural boxer who switches stances. More experience in UFC boxing exchanges.' },
        { label: 'Knockout Power', valueA: 70, valueB: 55, labelA: 'Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Campbell finished most of his fights (63% KO). Silva has 50% KOs and 50% decisions, with zero submissions.' },
        { label: 'UFC Experience', valueA: 20, valueB: 62, labelA: 'Poor', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Silva has 3 UFC fights and knows how the octagon works. Campbell is making his debut.' },
        { label: 'Composure in Close Fights', valueA: 50, valueB: 70, labelA: 'Average', labelB: 'Good', advantage: 'fighter2', advantage_note: 'Silva won two split decisions. He knows how to compete when fights are tight.' },
        { label: 'Athleticism & Youth', valueA: 82, valueB: 68, labelA: 'Very Good', labelB: 'Good', advantage: 'fighter1', advantage_note: 'Campbell is 23 and in his athletic prime. Youth and explosiveness are real advantages.' },
      ],
      insight: 'An interesting fight between prospect hype and UFC reality. Campbell brings power, youth, and the crowd. Silva brings experience, composure, and adaptability. The big unknown is how Campbell will react to UFC-level competition in his debut.',
    },
    distribuicao_vitorias: { ...analisePT.full_analysis.distribuicao_vitorias, insight: 'Campbell is more of a finisher: 63% KO + 12% sub = 75% finish rate. Silva is evenly split between KOs and decisions (50/50), with zero submissions. Their profiles are different: Campbell pushes for the finish, Silva competes. This could create a dynamic where Campbell pressures and Silva tries to survive and win on the scorecards.' },
    danger_zones: {
      zones: [
        { rounds: 'R1', danger_level: 7, danger_label: 'CAMPBELL ADVANTAGE', color: 'red', title: 'The Home Debut Energy', description: 'Campbell will walk in with all the energy of the O2 Arena. The Liverpool crowd will be deafening. Round one is when the prospect is most explosive, fastest, and most dangerous. If Campbell lands something clean with his Muay Thai power, it could end early.' },
        { rounds: 'R2', danger_level: 5, danger_label: 'EVEN', color: 'gold', title: 'The Adjustment Round', description: 'If Campbell doesn\'t get the finish in R1, the second round could level the playing field. Silva has shown he can adapt and compete in individual rounds. The American\'s experience could start to matter if Campbell burned too much energy in the first.' },
        { rounds: 'R3', danger_level: 5, danger_label: 'SILVA ADVANTAGE', color: 'green', title: 'Experience Speaks Loudest', description: 'If the fight reaches R3, Silva is in familiar territory. He has 5 decisions in 10 career wins and knows how to win close rounds. Campbell has never gone 3 rounds at UFC level and debut fatigue could affect his performance.' },
      ],
    },
    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Home Debut', fighter: 'Campbell', risk_level: 'HUGE POSITIVE', risk_color: 'green', description: 'Campbell is making his UFC debut in London, with the Liverpool crowd packing the O2 Arena. For a 23-year-old, this is the dream platform. The energy could elevate his performance to another level.' },
        { icon: 'AlertTriangle', title: 'Debut Nerves', fighter: 'Campbell', risk_level: 'MEDIUM RISK', risk_color: 'yellow', description: 'Debuting in the UFC is intense. The pressure from the crowd, the cameras, the expectations. Campbell has never experienced anything like this. If the nerves get to him, the opening minutes could be rough.' },
        { icon: 'Brain', title: 'Octagon Experience', fighter: 'Silva', risk_level: 'POSITIVE', risk_color: 'green', description: 'Silva has already fought 3 times in the UFC and knows how it works. He can handle the pressure, the judges, the pace of the octagon. That experience is valuable against a debutant.' },
        { icon: 'TrendingUp', title: 'Undefeated Confidence', fighter: 'Campbell', risk_level: 'POSITIVE', risk_color: 'green', description: 'Campbell has never lost (8-0). Being undefeated carries positive psychological weight. He walks in believing he\'s going to win, and that confidence can be the difference-maker.' },
        { icon: 'Clock', title: 'Age: 23 vs 29', fighter: 'Campbell', risk_level: 'POSITIVE', risk_color: 'green', description: 'Campbell is 6 years younger, in his athletic prime with superior reflexes and explosiveness. At 23, he has time and energy to spare.' },
        { icon: 'Eye', title: 'Silva\'s Switch Stance', fighter: 'Silva', risk_level: 'POSITIVE', risk_color: 'green', description: 'Silva constantly switches stances, which could confuse Campbell on debut. Facing a switch-stance fighter for the first time in the UFC adds a layer of complexity.' },
      ],
    },
    caminhos_vitoria: {
      fighter1: {
        nome: 'Campbell', total_probability: 58,
        scenarios: [
          { name: 'Debut Knockout', probability: 28, method: 'KO/TKO R1-R2', description: 'Campbell comes out aggressive with crowd support, lands Muay Thai combinations and knocks out Silva in the first two rounds. Debut energy and power make the difference.' },
          { name: 'Athletic Dominance', probability: 18, method: 'Unanimous Decision', description: 'Campbell uses youth and athleticism to dominate the pace. Wins every round with volume, speed, and pressure without getting the finish.' },
          { name: 'TKO by Accumulation', probability: 12, method: 'TKO R2-R3', description: 'Campbell hurts Silva early but can\'t finish. The damage accumulates and the referee stops the fight in later rounds.' },
        ],
      },
      fighter2: {
        nome: 'Silva', total_probability: 40,
        scenarios: [
          { name: 'The Veteran\'s Decision', probability: 20, method: 'Unanimous/Split Decision', description: 'Silva uses experience and composure to survive the first round, adapts to Campbell\'s style, and wins on the scorecards with tactical adjustments. The stance switching confuses the debutant.' },
          { name: 'Precise Counter', probability: 12, method: 'KO/TKO R2-R3', description: 'Campbell comes forward with too much emotion and Silva finds the perfect counter. The American has knockouts and knows how to punish excessive aggression.' },
          { name: 'Wrestle & Neutralize', probability: 8, method: 'Decision', description: 'Silva switches the gameplan and looks for takedowns to neutralize Campbell\'s striking and accumulate points on the ground.' },
        ],
      },
    },
    previsao_final: {
      ...analisePT.full_analysis.previsao_final,
      predicted_method: 'KO/TKO R1-R2',
      confidence_label: 'MEDIUM',
      explanation: 'Campbell has the power, youth, undefeated record, and home crowd in his favor. His Muay Thai is his primary weapon and Silva, despite his UFC experience, has never shown he\'s a dangerous finisher. Both of Silva\'s wins were by split decision, suggesting he doesn\'t dominate opponents. Against an explosive prospect at home, Silva\'s chances of winning on points shrink. However, the debut unknown is real: Campbell has never fought at this level, and Silva\'s experience could be decisive if the fight gets tight.',
      x_factor: { title: 'The Debut is Unpredictable', description: 'UFC debuts are always unpredictable. Contender Series prospects can shine or freeze. The pressure of the O2 Arena, the cameras, and the magnitude of the moment could affect Campbell in ways no one can predict.' },
      upset_alert: { title: 'Silva Already Knows How It Works', description: 'Silva has 3 UFC fights and knows how to compete in close rounds. If Campbell burns too much energy in the first round without getting the finish, Silva could take over in R2 and R3 with experience and composure.' },
    },
    o_que_observar: {
      points: [
        { num: 1, title: 'Campbell\'s First 2 Minutes', icon: 'Zap', description: 'Watch how Campbell handles the debut emotions. If he comes out focused and calculated aggression like he did on the Contender Series, he\'ll be dangerous. If emotions take over, he could make mistakes.' },
        { num: 2, title: 'Silva\'s Stance Switching', icon: 'Eye', description: 'Silva constantly switches stances (orthodox to southpaw and back). Watch how Campbell reacts. If he gets confused, Silva could find unexpected angles.' },
        { num: 3, title: 'Campbell\'s Volume', icon: 'Activity', description: 'Campbell has a Muay Thai base and tends to be aggressive. If he maintains high strike, kick, and knee volume, Silva will struggle to compete. If volume drops, it\'s a sign of fatigue or nerves.' },
        { num: 4, title: 'Silva\'s Reaction to Power', icon: 'Shield', description: 'Silva has never been KO\'d in the UFC (his only loss was by decision). If Campbell lands something heavy, Silva\'s reaction will reveal whether he can handle the power or is in trouble.' },
        { num: 5, title: 'The Liverpool Crowd', icon: 'MapPin', description: 'Campbell is from Liverpool and the Scouse crowd will be out in force at the O2 Arena. Watch how that energy affects both fighters. For Campbell, it could be fuel. For Silva, it could be intimidating.' },
      ],
    },
    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'PANTHER DEBUT', content: 'CAMPBELL vs SILVA\nUFC London | Featherweight\n\n8-0 vs 10-2\nThe Pink Panther from Liverpool\nmakes his UFC debut', color: 'red' },
        { slide_number: 2, title: 'CAMPBELL: THE PINK PANTHER', content: '8-0 career record (undefeated)\n5 knockouts (63%)\n5 amateur titles\nContender Series: UFC contract\n23 years old, Liverpool, Muay Thai', color: 'red' },
        { slide_number: 3, title: 'SILVA: EL PUMA', content: '10-2 career record\n2-1 in the UFC\nBoxer with switch stance\n50% of wins by decision\n29 years old, Santa Ana, California', color: 'blue' },
        { slide_number: 4, title: 'PREDICTION', content: 'CAMPBELL by KO/TKO R1-R2\n\nConfidence: MEDIUM\n58% Campbell / 40% Silva\n\nThe home debut could be\nspectacular. Or unpredictable.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Campbell vs Silva: The Pink Panther from Liverpool makes his UFC debut at home! 8-0, undefeated, 5 KOs, 23 years old. Against Silva (10-2, 2-1 UFC, 29 years old), the switch-stance boxer.' },
        { num: '2/4', text: 'Kurtis Campbell is the kind of prospect that makes London events special. 5 amateur titles, Contender Series contract, and now his debut at the O2 Arena. The Liverpool crowd will be LOUD.' },
        { num: '3/4', text: 'Silva isn\'t easy. 2-1 in the UFC, won two split decisions. He knows how to compete in tight fights. But he\'s never faced someone with Campbell\'s power and energy at home.' },
        { num: '4/4', text: 'Prediction: Campbell by knockout in the first two rounds. The Muay Thai, the power, and the crowd will be too much. But debuts are unpredictable.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'The Pink Panther from Liverpool makes his UFC debut. 8-0, undefeated, 5 KOs, and 20 thousand people screaming his name. Is Kurtis Campbell ready?' },
        { time: '10-25s', title: 'Context', text: 'Campbell, 23, Muay Thai specialist, Contender Series contract. Faces Danny Silva, 10-2, 29, 2-1 in the UFC, boxer with switch stance. Prospect vs experience.' },
        { time: '25-40s', title: 'Analysis', text: 'Campbell has power and the crowd. Silva has experience and composure. If Campbell connects early, it\'s over. If the fight gets tight, Silva knows how to win rounds.' },
        { time: '40-55s', title: 'Prediction', text: 'Campbell by knockout in R1 or R2. But be careful: debuts are unpredictable and Silva has survived 3 UFC fights.' },
      ],
      tiktok: [
        { hook: 'The PINK PANTHER from Liverpool makes his UFC debut AT HOME.', body: 'Kurtis Campbell. 23 years old. 8-0. Undefeated. 5 knockouts. Contender Series contract. And now his debut at the O2 Arena with 20 thousand Brits screaming. The kid is from Liverpool and the Scouse crowd doesn\'t play. Danny Silva has experience, but can he handle this?', cta: 'Is the debut gonna be a KO or a war? Comment!' },
        { hook: 'This kid is 23 and has NEVER lost. And now he faces a UFC veteran at home.', body: 'Kurtis Campbell vs Danny Silva. The Pink Panther vs El Puma. Campbell with Muay Thai and 5 KOs. Silva with boxing and switch stance. Who wins the battle of the cats?', cta: 'Panther or Puma? Comment!' },
      ],
      headlines: [
        'Campbell vs Silva: The Pink Panther from Liverpool Makes the Dream Debut',
        'Can Kurtis Campbell Be the Next Big Name in British Featherweight?',
        'The Home Debut: 8-0 and Liverpool Crowd at the O2 Arena',
        'Danny Silva Wants to Crash the Pink Panther\'s Party in London',
        'UFC London: The Contender Series Prospect vs the Octagon Veteran',
      ],
    },
    betting_value: null,
    radar_apostador: {
      odds: { ...analisePT.full_analysis.radar_apostador!.odds, source: 'Average across sportsbooks (March 2026)' },
      edges: [
        { icon: 'Zap', titulo: 'Campbell\'s Finishing Power', stat_headline: '63% OF WINS BY KO/TKO, 5 IN 8 FIGHTS (+ TKO ON DWCS AGAINST DEMBA SECK)', contexto: 'Campbell is a natural finisher with a Muay Thai base. He tends to look for the finish early.', implicacao_aposta: 'Favors Campbell inside the distance. Under could have value if you believe in the power.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'MapPin', titulo: 'Home Debut in London', stat_headline: 'CAMPBELL FROM LIVERPOOL FIGHTS AT THE O2 ARENA WITH 20,000 BRITS', contexto: 'Dream scenario for a debut. The crowd energy could be the difference-maker.', implicacao_aposta: 'Emotionally favors Campbell. But could also generate excessive pressure.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Silva\'s UFC Experience', stat_headline: '3 UFC FIGHTS, 2 WINS BY SPLIT DECISION', contexto: 'Silva knows how the octagon works. He knows how to compete in tight fights and win on the scorecards.', implicacao_aposta: 'Don\'t rule out Silva by decision. He knows how to win rounds.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Debut Unknown', stat_headline: 'CAMPBELL HAS NEVER FOUGHT IN THE UFC, ZERO OCTAGON DATA', contexto: 'Contender Series prospects can shine or freeze on debut. Impossible to predict with certainty.', implicacao_aposta: 'Increases overall uncertainty. Don\'t bet heavy on Campbell without considering debut risk.', edge_level: 'leve', fighter_side: 'neutral' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Campbell (-200)', odds: '-200', confianca: 'media', raciocinio: 'Campbell is favored for good reasons: undefeated, power, youth, crowd. But -200 doesn\'t offer much value given the debut unknown.' },
        { tipo: 'Method', pick: 'Campbell by KO/TKO', odds: '-110', confianca: 'media', raciocinio: 'With a 63% KO rate and Silva absorbing 4.22 strikes per minute, a stoppage by strikes is the most likely scenario if Campbell wins.' },
        { tipo: 'Moneyline', pick: 'Silva (+170)', odds: '+170', confianca: 'baixa', edge_vs_mercado: 'Silva as an underdog at +170 has some value given his UFC experience.', raciocinio: 'If you believe experience trumps hype, Silva at +170 is a reasonable value bet. He knows how to compete in tight fights.' },
      ],
      armadilha: { titulo: 'Trap: Betting Heavy on Debutants', descricao: 'Contender Series prospects have a mixed track record on debut. The excitement can be deceiving. Campbell is talented, but without UFC data, betting heavy means taking unnecessary risk. Consider smaller bets or method bets instead of a big moneyline play.' },
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
