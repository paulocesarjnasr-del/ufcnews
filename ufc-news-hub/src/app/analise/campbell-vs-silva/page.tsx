import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analise: FullSingleAnalise = {
  id: 'campbell-vs-silva',
  evento_id: null,
  slug: 'campbell-vs-silva',
  titulo: 'Campbell vs Silva: A Pantera de Liverpool Faz Sua Estreia',
  subtitulo: 'O prospect invicto de 8-0 do Contender Series enfrenta o americano de Santa Ana em seu debut no UFC',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '1,78m', envergadura: '180cm', idade: 23, academia: 'KC Fight Base, Liverpool' },
      fighter2: { altura: '1,80m', envergadura: '183cm', idade: 27, academia: 'Santa Ana, California' },
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
        info_extra: 'Santa Ana, California, EUA | 27 anos',
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
          <strong class="text-blue-400">Danny Silva</strong> pode nao ter o hype de Campbell, mas nao falta experiencia. O americano de Santa Ana, California, tem 10-2 na carreira e ja tem tres lutas no UFC. A estreia foi uma vitoria por decisao dividida sobre Joshua Culibao, seguida por outra dividida contra Lucas Almeida. A unica derrota no UFC veio contra Kevin Vallejos, um prospect dinamico que esta em ascensao. Com 27 anos, Silva e um boxer nato que troca de stance constantemente e sabe competir em lutas apertadas.
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
          { date: 'Set 2025', opponent: 'Oponente DWCS', result: 'W', method: 'Vitoria no Contender Series', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Conquistou contrato do UFC no Contender Series com performance dominante em setembro de 2025.' },
        ],
        full_fight_history: [
          { date: 'Set 2025', opponent: 'Oponente DWCS', result: 'W', method: 'Vitoria DWCS', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Contrato UFC conquistado' },
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
        { label: 'Idade', fighter1: '23 anos', fighter2: '27 anos', note: 'Campbell 4 anos mais jovem' },
        { label: 'Altura', fighter1: '1,78m (5\'10")', fighter2: '1,80m (5\'11")', note: 'Praticamente iguais' },
        { label: 'Envergadura', fighter1: '~180cm (71")', fighter2: '183cm (72")', note: 'Silva com leve vantagem' },
        { label: 'Stance', fighter1: 'Ortodoxo', fighter2: 'Switch Stance', note: 'Silva troca de stance constantemente' },
        { label: 'Background', fighter1: 'Muay Thai', fighter2: 'Boxe', note: 'Striker vs Striker' },
        { label: 'Dados UFC', fighter1: 'Debut (sem dados)', fighter2: '3 lutas (2-1)', note: 'Silva com mais dados disponiveis' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking/Muay Thai', valueA: 75, valueB: 68, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Campbell tem base forte em Muay Thai com cinco titulos amadores. Arma principal. Porem sem dados UFC para confirmar.' },
        { label: 'Boxe Puro', valueA: 60, valueB: 72, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Silva e descrito como boxer nato que troca de stance. Mais experiencia em trocacoes de boxe no UFC.' },
        { label: 'Poder de Nocaute', valueA: 70, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Campbell finalizou a maioria das lutas. Silva tem apenas 40% de KOs e depende mais de decisoes (50%).' },
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
        ko_tko: { count: 4, percent: 40 },
        submission: { count: 1, percent: 10 },
        decision: { count: 5, percent: 50 },
        total_wins: 10,
      },
      insight: 'Campbell e mais finalizador: 63% KO + 12% sub = 75% de finalizacoes. Silva depende mais de decisoes (50%). Os perfis sao diferentes: Campbell busca encerrar, Silva compete. Isso pode criar uma dinamica onde Campbell pressiona e Silva tenta sobreviver para vencer nos pontos.',
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
          description: 'Se a luta chegar ao R3, Silva esta em territorio familiar. Ele tem 5 decisoes na carreira e sabe como vencer rounds apertados. Campbell nunca foi a distancia de 3 rounds no nivel UFC e a fadiga do debut pode afetar seu desempenho.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'MapPin', title: 'Debut em Casa', fighter: 'Campbell', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Campbell faz o debut no UFC em Londres, com a torcida de Liverpool no O2 Arena. Para um garoto de 23 anos, essa e a plataforma dos sonhos. A energia pode elevar a performance a outro nivel.' },
        { icon: 'AlertTriangle', title: 'Nervosismo de Debut', fighter: 'Campbell', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Debuter no UFC e intenso. A pressao da torcida, as camaras, a expectativa. Campbell nunca experimentou nada parecido. Se o nervosismo atrapalhar, os primeiros minutos podem ser complicados.' },
        { icon: 'Brain', title: 'Experiencia no Octogono', fighter: 'Silva', risk_level: 'POSITIVO', risk_color: 'green', description: 'Silva ja lutou 3 vezes no UFC e sabe como funciona. Sabe lidar com a pressao, com os juizes, com o ritmo do octogono. Essa experiencia e valiosa contra um debutante.' },
        { icon: 'TrendingUp', title: 'Invencibilidade e Confianca', fighter: 'Campbell', risk_level: 'POSITIVO', risk_color: 'green', description: 'Campbell nunca perdeu (8-0). A invencibilidade carrega um peso psicologico positivo. Ele entra acreditando que vai vencer, e essa confianca pode ser o diferencial.' },
        { icon: 'Clock', title: 'Idade: 23 vs 27', fighter: 'Campbell', risk_level: 'POSITIVO', risk_color: 'green', description: 'Campbell e 4 anos mais jovem, no auge atletico com reflexos e explosividade superiores. Aos 23, ele tem tempo e energia de sobra.' },
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
        { slide_number: 3, title: 'SILVA: EL PUMA', content: '10-2 na carreira\n2-1 no UFC\nBoxer com switch stance\n50% das vitorias por decisao\n27 anos, Santa Ana, California', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'CAMPBELL por KO/TKO R1-R2\n\nConfianca: MEDIA\n58% Campbell / 40% Silva\n\nO debut em casa pode ser\nespetacular. Ou imprevisivel.', color: 'gold' },
      ],
      twitter: [
        { num: '1/4', text: 'Campbell vs Silva: a Pantera Rosa de Liverpool faz o debut no UFC em casa! 8-0, invicto, 5 KOs, 23 anos. Contra Silva (10-2, 2-1 UFC), o boxer de switch stance.' },
        { num: '2/4', text: 'Kurtis Campbell e o tipo de prospect que faz eventos de Londres especiais. 5 titulos amadores, contrato do Contender Series, e agora o debut no O2 Arena. A torcida de Liverpool vai estar em peso.' },
        { num: '3/4', text: 'Silva nao e facil. 2-1 no UFC, venceu duas decisoes divididas. Sabe competir em lutas apertadas. Mas nunca enfrentou alguem com o poder e a energia de Campbell em casa.' },
        { num: '4/4', text: 'Previsao: Campbell por nocaute nos dois primeiros rounds. O Muay Thai, o poder e a torcida vao ser demais. Mas debuts sao imprevisiveis.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: 'A Pantera Rosa de Liverpool faz o debut no UFC. 8-0, invicto, 5 KOs, e 20 mil pessoas gritando o nome dele. Kurtis Campbell esta pronto?' },
        { time: '10-25s', title: 'Contexto', text: 'Campbell, 23 anos, Muay Thai, contrato do Contender Series. Enfrenta Danny Silva, 10-2, 2-1 no UFC, boxer com switch stance. Prospect vs experiencia.' },
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
        { icon: 'Zap', titulo: 'Poder de Finalizacao de Campbell', stat_headline: '63% DAS VITORIAS POR KO/TKO, 5 EM 8 LUTAS', contexto: 'Campbell e um finalizador nato com base de Muay Thai. Tende a buscar a finalizacao cedo.', implicacao_aposta: 'Favorece Campbell dentro da distancia. Under pode ter valor se voce acredita no poder.', edge_level: 'moderado', fighter_side: 'fighter1' },
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

export default function Page() {
  return <FullAnalysisView analise={analise} />;
}
