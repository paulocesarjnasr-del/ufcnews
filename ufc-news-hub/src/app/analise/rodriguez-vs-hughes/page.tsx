import { PrelimsAnalysisView } from '@/components/analise/PrelimsAnalysisView';
import type { PrelimsAnalise } from '@/types/analise';

const analise: PrelimsAnalise = {
  // ===========================
  // Base Analise fields
  // ===========================
  id: 'rodriguez-vs-hughes',
  evento_id: null,
  slug: 'rodriguez-vs-hughes',
  titulo: 'Rodriguez vs Hughes',
  subtitulo: null,
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: {
    stats: [],
    radarData: [],
    taleOfTape: {
      fighter1: { altura: '', envergadura: '', idade: 0, academia: '' },
      fighter2: { altura: '', envergadura: '', idade: 0, academia: '' },
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
    nome: 'Piera Rodriguez',
    record: '11-2-0',
    ultimasLutas: [],
  },
  fighter2_info: {
    nome: 'Sam Hughes',
    record: '11-6-0',
    ultimasLutas: [],
  },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '14 de Marco, 2026',
  evento_local: 'Meta APEX, Las Vegas, Nevada, EUA',
  categoria_peso: 'Peso Palha Feminino',
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
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      categoria_peso: 'Peso Palha Feminino',
      num_rounds: 3,
      is_titulo: false,
      fighter1: {
        nome: 'Rodriguez',
        record: '11-2-0',
      },
      fighter2: {
        nome: 'Hughes',
        record: '11-6-0',
      },
    },

    // ── Section 2: Comparacao Estatistica ──
    comparacao_estatistica: {
      stats: [
        {
          label: 'Sig. Strikes por Minuto',
          valueA: 2.81,
          valueB: 4.34,
          maxVal: 7,
          format: 'decimal',
          note: 'Hughes produz volume de strikes muito superior, quase 55% a mais por minuto. Rodriguez prefere ser seletiva e usar o wrestling para controlar, enquanto Hughes aposta na quantidade para acumular dano.',
        },
        {
          label: 'Precisao de Strikes (%)',
          valueA: 46,
          valueB: 46,
          maxVal: 100,
          format: 'percent',
          note: 'Precisao identica. Nenhuma das duas e particularmente eficiente com os golpes significativos, acertando menos da metade das tentativas.',
        },
        {
          label: 'Strikes Absorvidos/Min',
          valueA: 3.46,
          valueB: 4.44,
          maxVal: 7,
          format: 'decimal',
          reverseWinner: true,
          note: 'Hughes absorve significativamente mais dano por minuto. Seu estilo de alto volume a deixa exposta, e Rodriguez pode capitalizar nas aberturas defensivas criadas pela agressividade excessiva.',
        },
        {
          label: 'Defesa de Strikes (%)',
          valueA: 55,
          valueB: 58,
          maxVal: 100,
          format: 'percent',
          note: 'Defesa semelhante, com leve vantagem para Hughes. Ambas absorvem mais golpes do que a media da divisao palha feminina.',
        },
        {
          label: 'Takedowns por 15 Min',
          valueA: 4.53,
          valueB: 1.23,
          maxVal: 6,
          format: 'decimal',
          note: 'Rodriguez busca o takedown com frequencia quase quatro vezes maior. Essa pressao constante de wrestling foi a chave da vitoria no primeiro encontro e continua sendo sua arma principal.',
        },
        {
          label: 'Precisao de Takedown (%)',
          valueA: 54,
          valueB: 35,
          maxVal: 100,
          format: 'percent',
          note: 'Rodriguez conecta mais da metade das tentativas de queda, eficiencia excelente para a divisao. Hughes converte apenas um terco, indicando wrestling ofensivo limitado.',
        },
        {
          label: 'Defesa de Takedown (%)',
          valueA: 73,
          valueB: 60,
          maxVal: 100,
          format: 'percent',
          note: 'Rodriguez defende 73% dos takedowns, muito acima de Hughes (60%). Isso garante que Rodriguez controla onde a luta acontece, podendo derrubar quando quiser e se manter em pe quando preferir.',
        },
      ],
      tale_of_tape: [
        {
          label: 'Idade',
          fighter1: '33 anos',
          fighter2: '33 anos',
          note: 'Mesma idade, ambas no auge da maturidade competitiva',
        },
        {
          label: 'Altura',
          fighter1: '1,60m (5\'3")',
          fighter2: '1,65m (5\'5")',
          note: 'Hughes com 5cm de vantagem em altura, util para manter distancia no striking',
        },
        {
          label: 'Envergadura',
          fighter1: '161cm (63.5")',
          fighter2: '163cm (64")',
          note: 'Envergadura praticamente identica, diferenca negligenciavel',
        },
        {
          label: 'Stance',
          fighter1: 'Ortodoxa',
          fighter2: 'Ortodoxa',
          note: 'Ambas ortodoxas, sem vantagem de angulacao por stance',
        },
        {
          label: 'Academia',
          fighter1: 'Nao especificada',
          fighter2: 'Catalyst Fight House',
          note: null,
        },
      ],
    },

    // ── Section 3: Historico de Lutas ──
    historico_lutas: {
      fighter1: {
        nome: 'Rodriguez',
        recent_fights: [
          {
            date: 'Nov 2025',
            opponent: 'Ariane Souza',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria apertada por decisao dividida. Dominou com takedowns e controle, mas nao convenceu todos os juizes contra oponente nao ranqueada.',
          },
          {
            date: 'Jun 2025',
            opponent: 'Josefine Knutsson',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Vitoria dominante por unanimidade. Usou wrestling eficiente para controlar o ritmo da luta por tres rounds completos.',
          },
          {
            date: 'Jan 2025',
            opponent: 'Giulia Carnelossi',
            result: 'L',
            method: 'DQ (Cabecada Ilegal)',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Desqualificada por cabecada ilegal. Resultado controverso que interrompeu sequencia de vitorias sem realmente testar habilidades.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Gillian Robertson',
            result: 'L',
            method: 'Sub R2 (Armbar)',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Finalizada por armbar no segundo round contra uma especialista em jiu-jitsu. Revelou vulnerabilidade no chao quando o wrestling e neutralizado.',
          },
          {
            date: 'Out 2022',
            opponent: 'Sam Hughes',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Primeiro encontro com Hughes. Controlou com wrestling e pressao por tres rounds para levar a decisao unanime de forma clara.',
          },
        ],
      },
      fighter2: {
        nome: 'Hughes',
        recent_fights: [
          {
            date: 'Set 2025',
            opponent: 'Luana Bannon',
            result: 'W',
            method: 'Sub R2 (RNC)',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Finalizou com mata-leao no segundo round. Mostrou evolucao no jiu-jitsu ofensivo com uma submissao dominante.',
          },
          {
            date: 'Mai 2025',
            opponent: 'Jacqueline Luciano',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria apertada por decisao dividida contra oponente em debut no UFC. Poderia ter ido para qualquer lado.',
          },
          {
            date: 'Nov 2024',
            opponent: 'Viktoriia Dudakova',
            result: 'W',
            method: 'Decisao Dividida',
            opponent_rank: 'N/R',
            quality_score: 2,
            quality_label: 'Medio',
            note: 'Acabou com a invencibilidade de Dudakova por split decision. Tres rounds competitivos que mostraram o coracao de Hughes.',
          },
          {
            date: 'Jun 2024',
            opponent: 'Yazmin Jauregui',
            result: 'L',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 3,
            quality_label: 'Bom',
            note: 'Derrota clara contra jovem promessa mexicana. Jauregui controlou a distancia e superou Hughes em todos os aspectos.',
          },
          {
            date: 'Fev 2024',
            opponent: 'Istela Amorim',
            result: 'W',
            method: 'Decisao Unanime',
            opponent_rank: 'N/R',
            quality_score: 1,
            quality_label: 'Ruim',
            note: 'Vitoria solida por unanimidade contra brasileira. Jogo completo com striking e wrestling para vencer os tres rounds.',
          },
        ],
      },
    },

    // ── Section 4: Perfil de Habilidades ──
    perfil_habilidades: {
      skills: [
        {
          label: 'Wrestling Ofensivo',
          valueA: 82,
          valueB: 45,
          labelA: 'Excelente',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Rodriguez e uma wrestler de elite com 4.53 TD/15min e 54% de precisao, ex-campea do LFA. Hughes busca apenas 1.23 TD/15min com 35% de eficiencia. Essa disparidade e o fator dominante da luta e foi decisiva no primeiro encontro.',
        },
        {
          label: 'Striking em Pe',
          valueA: 48,
          valueB: 65,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Hughes produz 4.34 SLpM contra 2.81 de Rodriguez, com leve vantagem de alcance. Se a luta ficar em pe, Hughes tem ferramentas para superar no volume e na trocacao.',
        },
        {
          label: 'Defesa de Takedown',
          valueA: 75,
          valueB: 55,
          labelA: 'Muito Bom',
          labelB: 'Medio',
          advantage: 'fighter1',
          advantage_note: 'Rodriguez defende 73% dos takedowns, muito superior aos 60% de Hughes. Isso garante que Rodriguez dita onde a luta acontece, podendo tanto defender quanto atacar quedas.',
        },
        {
          label: 'Jiu-Jitsu e Submissao',
          valueA: 38,
          valueB: 58,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Hughes tem 4 submissoes na carreira contra 0 de Rodriguez. A recente finalizacao por mata-leao contra Bannon mostra crescimento nessa area. Rodriguez e vulneravel no chao, como provou a derrota por armbar para Robertson.',
        },
        {
          label: 'Cardio e Ritmo',
          valueA: 68,
          valueB: 62,
          labelA: 'Bom',
          labelB: 'Bom',
          advantage: 'fighter1',
          advantage_note: 'Rodriguez manteve pressao de wrestling por tres rounds inteiros no primeiro encontro. Hughes tende a ter lutas apertadas que vao para decisao dividida, sugerindo dificuldade de manter intensidade consistente.',
        },
        {
          label: 'Controle de Distancia',
          valueA: 50,
          valueB: 58,
          labelA: 'Medio',
          labelB: 'Bom',
          advantage: 'fighter2',
          advantage_note: 'Hughes tem 2 polegadas a mais de altura e meia polegada de envergadura, vantagens modestas mas uteis. Rodriguez prefere entrar no clinch para trabalhar wrestling, entregando a distancia de bom grado.',
        },
      ],
      insight: 'A luta se resume a onde ela acontece. Rodriguez domina completamente no wrestling (4.53 TD vs 1.23), enquanto Hughes e superior no striking em pe (4.34 SLpM vs 2.81). Como o wrestling geralmente prevalece sobre o striking no MMA feminino, e Rodriguez ja provou isso no primeiro encontro, ela parte com vantagem estrutural clara nessa revanche.',
    },

    // ── Section 5: Distribuicao de Vitorias ──
    distribuicao_vitorias: {
      fighter1: {
        nome: 'Rodriguez',
        ko_tko: { count: 5, percent: 45 },
        submission: { count: 0, percent: 0 },
        decision: { count: 6, percent: 55 },
        total_wins: 11,
      },
      fighter2: {
        nome: 'Hughes',
        ko_tko: { count: 2, percent: 18 },
        submission: { count: 4, percent: 36 },
        decision: { count: 5, percent: 46 },
        total_wins: 11,
      },
      insight: 'Perfis de finalizacao bem distintos. Rodriguez impressiona com 45% de vitorias por nocaute, algo raro na divisao palha feminina, e se descreve como "violenta, agressiva, imparavel." Mas zero submissoes confirmam que seu jogo no chao e de controle e ground and pound, nao de finalizacao. Hughes e mais versatil: nocaute, submissao e decisao, com destaque para as 4 finalizacoes que mostram perigo constante quando a luta vai pro chao.',
    },

    // ── Section 6: Previsao Final ──
    previsao_final: {
      winner_name: 'Rodriguez',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Rodriguez ja venceu Hughes por decisao unanime em outubro de 2022, e as razoes daquela vitoria continuam validas. Seu wrestling e o fator dominante desta luta: com 4.53 takedowns por 15 minutos e 54% de precisao, ela deve conseguir derrubar Hughes repetidamente, considerando que Hughes defende apenas 60% das tentativas. No primeiro encontro, Rodriguez controlou com pressao e acumulo de pontos, e nada nos resultados recentes de Hughes sugere que o cenario sera diferente. Hughes esta em sequencia de 3 vitorias, mas duas foram por decisao dividida contra oponentes limitadas. A evolucao no jiu-jitsu de Hughes (submissao contra Bannon) e um ponto de atencao, porem insuficiente para superar a vantagem estrutural de wrestling de Rodriguez. As odds de -200 para Rodriguez refletem essa realidade com precisao.',
      x_factor: {
        title: 'A revanche como motivacao extra para Hughes',
        description: 'Hughes ja perdeu para Rodriguez e sabe exatamente o que esperar. A experiencia do primeiro encontro pode ter motivado ajustes taticos especificos, como melhor defesa de takedown ou uso mais agressivo do jiu-jitsu ofensivo. A sequencia de 3 vitorias traz confianca renovada. O risco para Rodriguez e subestimar uma oponente que agora conhece seu jogo e pode ter preparado respostas especificas para o wrestling.',
      },
      upset_alert: {
        title: 'A submissao surpresa de Hughes',
        description: 'Rodriguez tem zero submissoes na carreira e foi finalizada por armbar contra Robertson, revelando fragilidade no jiu-jitsu defensivo. Se Hughes conseguir inverter posicao no chao, pode transformar o wrestling de Rodriguez contra ela mesma. O cenario mais perigoso para Rodriguez e buscar o takedown e acabar presa no guarda de uma Hughes com jiu-jitsu em evolucao.',
      },
      probabilities: {
        fighter1: { nome: 'Rodriguez', percent: 62 },
        fighter2: { nome: 'Hughes', percent: 35 },
        draw: 3,
      },
      value_picks: undefined,
    },
  },
};

export default function Page() {
  return <PrelimsAnalysisView analise={analise} />;
}
