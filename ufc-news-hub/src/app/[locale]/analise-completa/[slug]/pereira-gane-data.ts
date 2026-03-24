import type { FullSingleAnalise } from '@/types/analise';

export const pereiraGaneAnalise: FullSingleAnalise = {
  id: 'pereira-gane-ufc-freedom-250',
  evento_id: null,
  slug: 'pereira-gane-ufc-freedom-250',
  titulo: 'Pereira vs Gane: A Caca ao Titulo Historico',
  subtitulo: 'Titulo Interino Peso Pesado no gramado da Casa Branca',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'KO', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Alex Pereira', record: '13-3-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Ciryl Gane', record: '13-2-0', ultimasLutas: [] },
  evento_nome: 'UFC Freedom 250',
  evento_data: '2026-06-14',
  evento_local: 'Casa Branca, Washington D.C.',
  categoria_peso: 'Peso Pesado',
  num_rounds: 5,
  is_titulo: true,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Freedom 250',
      evento_data: '14 de Junho, 2026',
      evento_local: 'Casa Branca, Washington D.C.',
      categoria_peso: 'Peso Pesado (265 lbs)',
      num_rounds: 5,
      titulo_em_jogo: 'Titulo Interino Peso Pesado',
      tagline: 'A CACA AO TITULO HISTORICO',
      tagline_sub: 'Primeiro homem a ser campeao em tres divisoes do UFC. A historia esta em jogo.',
      fighter1: {
        nome_completo: 'Alex "Poatan" Pereira',
        apelido: 'Poatan',
        sobrenome: 'Pereira',
        record: '13-3-0',
        ranking: '#5 P4P',
        info_extra: 'Sao Paulo, Brasil | 38 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Ciryl "Bon Gamin" Gane',
        apelido: 'Bon Gamin',
        sobrenome: 'Gane',
        record: '13-2-0',
        ranking: '#1 HW',
        info_extra: 'Paris, Franca | 35 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Homem Que Desafia a Historia</h3>
        <p><strong class="text-ufc-red">Alex Pereira</strong> nao esta apenas buscando mais um cinturao. Ele esta buscando algo que nenhum ser humano jamais conseguiu no UFC: ser campeao em tres divisoes de peso diferentes. Peso medio, meio-pesado, e agora peso pesado. Para isso, ele abriu mao do titulo dos meio-pesados, o cinturao que reconquistou com um KO brutal sobre Ankalaev em apenas 80 segundos no UFC 320.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Obstaculo Frances</h3>
        <p><strong class="text-blue-400">Ciryl Gane</strong> e, possivelmente, o pior matchup estilístico possivel para Pereira nessa divisao. Enquanto a maioria dos peso pesado sao lentos e previsíveis, Gane se move como um peso medio. Seus pés sao rapidos, seu jab e longo, e ele sabe usar a distancia como poucos na historia dos pesados. Ex-campeao interino, ele ja provou que compete no mais alto nivel. A unica coisa que nunca aconteceu com ele no MMA? Ser nocauteado.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Palco Mais Grandioso</h3>
        <p>E tudo isso vai acontecer no gramado da Casa Branca. UFC Freedom 250. O evento mais inusitado da historia do UFC. Nao existe palco maior para <strong class="text-ufc-red">Pereira</strong> fazer historia, e nao existe lugar pior para <strong class="text-blue-400">Gane</strong> ser o obstaculo no caminho de uma lenda.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#5 P4P (subindo de divisao)', fighter2: '#1 Peso Pesado' },
        { dimensao: 'Objetivo', fighter1: 'Campeao em 3 divisoes (historico)', fighter2: 'Reconquistar titulo interino' },
        { dimensao: 'Narrativa', fighter1: 'Lenda viva reescrevendo a historia', fighter2: 'Negocio inacabado com Aspinall' },
        { dimensao: 'Risco', fighter1: 'Subindo para divisao mais pesada', fighter2: 'Vindo de NC e SD controversa' },
        { dimensao: 'Recompensa', fighter1: 'Feito inedito no UFC', fighter2: 'Revanche contra Aspinall pelo titulo' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A COROACAO DO POATAN EM TRES DIVISOES',
          subtitulo: 'Pereira entra no panteao dos maiores atletas de combate de todos os tempos.',
          consequencias: [
            { tag: 'HISTORIA', texto: 'Primeiro campeao em tres divisoes na historia do UFC. Feito provavelmente inalcancavel.' },
            { tag: 'TITULO', texto: 'Enfrenta Tom Aspinall pelo cinturao indiscutivel dos pesados.' },
            { tag: 'LEGADO', texto: 'Consolida status como o maior striker da historia do MMA.' },
            { tag: 'P4P', texto: 'Sobe para top 3 do ranking pound-for-pound, possivelmente #1.' },
          ],
          proxima_luta: 'Tom Aspinall pelo titulo indiscutivel dos pesados',
        },
        fighter2_vence: {
          titulo: 'BON GAMIN INTERROMPE A LENDA',
          subtitulo: 'Gane prova que tecnica supera poder no peso pesado.',
          consequencias: [
            { tag: 'TITULO', texto: 'Reconquista o titulo interino que perdeu para Ngannou.' },
            { tag: 'REVANCHE', texto: 'Garante a revanche contra Tom Aspinall, negocio inacabado apos o NC.' },
            { tag: 'LEGADO', texto: 'Maior vitoria da carreira, parando o homem mais perigoso do esporte.' },
          ],
          proxima_luta: 'Tom Aspinall pelo titulo indiscutivel dos pesados',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Alex Pereira',
        color: 'red',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Magomed Ankalaev', result: 'W', method: 'KO R1 (1:20)', opponent_rank: '#2 LHW', quality_score: 5, quality_label: 'Excelente', note: 'KO brutal com cotoveladas em 80 segundos. Reconquistou o titulo. Quebrou o pe na luta.' },
          { date: 'Mar 2025', opponent: 'Magomed Ankalaev', result: 'L', method: 'Decisao Unanime', opponent_rank: '#2 LHW', quality_score: 5, quality_label: 'Excelente', note: 'Unica derrota recente, perdeu nos cartoes em luta tatica. Ankalaev controlou com wrestling.' },
          { date: 'Out 2024', opponent: 'Khalil Rountree Jr.', result: 'W', method: 'TKO R4', opponent_rank: '#8 LHW', quality_score: 3, quality_label: 'Bom', note: 'Levou pressao nos primeiros rounds mas finalizou no quarto com poder.' },
          { date: 'Jun 2024', opponent: 'Jiri Prochazka', result: 'W', method: 'TKO R2 (0:13)', opponent_rank: 'Ex-Campeao LHW', quality_score: 5, quality_label: 'Excelente', note: 'Finalizou Prochazka pela segunda vez com um head kick devastador.' },
          { date: 'Abr 2024', opponent: 'Jamahal Hill', result: 'W', method: 'KO R1', opponent_rank: 'Ex-Campeao LHW', quality_score: 5, quality_label: 'Excelente', note: 'Nocauteou o ex-campeao com um gancho de esquerda no primeiro round.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'resilient',
        momentum_note: 'Pereira vem de uma vinganca impressionante contra Ankalaev, nocauteando o homem que lhe deu sua unica derrota recente. O pe quebrado no UFC 320 o tirou de acao por meses, mas ele esta recuperado. Quatro dos seus ultimos cinco resultados sao KOs contra ex-campeoes ou top 3 da divisao. A confianca esta no teto.',
      },
      fighter2: {
        nome: 'Ciryl Gane',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Tom Aspinall', result: 'NC', method: 'No Contest (Eye Poke R1)', opponent_rank: 'Campeao HW', quality_score: 5, quality_label: 'Excelente', note: 'Luta encerrada por eye poke acidental no primeiro round. Aspinall sofreu lesao grave nos olhos.' },
          { date: 'Dez 2024', opponent: 'Alexander Volkov', result: 'W', method: 'Decisao Dividida', opponent_rank: '#6 HW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria controversa. 19 de 20 midia scoraram para Volkov. Desempenho questionavel.' },
          { date: 'Set 2023', opponent: 'Serghei Spivac', result: 'W', method: 'TKO R2', opponent_rank: '#10 HW', quality_score: 3, quality_label: 'Bom', note: 'Dominio total com striking tecnico, finalizou com socos no segundo round.' },
          { date: 'Mar 2023', opponent: 'Jon Jones', result: 'L', method: 'Sub R1 (2:04)', opponent_rank: 'Campeao HW', quality_score: 5, quality_label: 'Excelente', note: 'Finalizado por guilhotina por Jon Jones em luta pelo titulo. Exposicao no grappling.' },
          { date: 'Set 2022', opponent: 'Tai Tuivasa', result: 'W', method: 'TKO R3', opponent_rank: '#3 HW', quality_score: 4, quality_label: 'Muito Bom', note: 'Sobreviveu um susto no primeiro round e dominou com tecnica a partir do segundo.' },
        ],
        layoff_warning: 'Ultimo combate completo foi a controversa decisao dividida contra Volkov em dezembro de 2024 (mais de 17 meses).',
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Gane nao luta de verdade desde dezembro de 2024. O NC contra Aspinall nao conta como atividade real, e a vitoria sobre Volkov foi amplamente contestada pela midia. A derrota para Jones expôs vulnerabilidades no grappling. Ele e tecnicamente brilhante, mas o momentum nao esta do seu lado.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Pereira',
        media_oponentes: 5,
        media_oponentes_label: 'Excelente',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '4W-1L',
      },
      fighter2: {
        nome: 'Gane',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '2W-1L-1NC (50%)',
        contra_top5: '0W-1L-1NC',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Pereira e Gane nunca enfrentaram oponentes em comum no MMA. Pereira lutou toda sua carreira no UFC nos meio-pesados e medios, enquanto Gane sempre esteve nos pesados. Isso torna a comparacao direta mais dificil, mas ambos tem backgrounds extensos no kickboxing que servem como ponto de referencia.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 5.16, valueB: 5.29, maxVal: 7, format: 'decimal', note: 'Ambos com volume altissimo para pesados. Gane com leve vantagem.' },
        { label: 'Precisao de Strikes (%)', valueA: 62, valueB: 61, maxVal: 100, format: 'percent', note: 'Pereira tem a maior precisao da historia do UFC (62.1% em 1000+ tentativas).' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.50, valueB: 2.33, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Gane absorve significativamente menos. Footwork e distancia fazem a diferenca.' },
        { label: 'Defesa de Strikes (%)', valueA: 53, valueB: 60, maxVal: 100, format: 'percent', note: 'Gane com vantagem clara na defesa, reflexo da sua movimentacao superior.' },
        { label: 'Takedowns por 15 Min', valueA: 0.11, valueB: 0.68, maxVal: 3, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 50, valueB: 25, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 79, valueB: 47, maxVal: 100, format: 'percent', note: 'Pereira defende 79% dos takedowns. Gane com apenas 47%, ponto fraco critico.' },
        { label: 'Submissoes por 15 Min', valueA: 0.20, valueB: 0.60, maxVal: 2, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '38 anos', fighter2: '35 anos', note: 'Gane 3 anos mais jovem' },
        { label: 'Altura', fighter1: '1.93m (6\'4")', fighter2: '1.93m (6\'4")', note: 'Identicos em altura' },
        { label: 'Envergadura', fighter1: '201cm (79")', fighter2: '206cm (81")', note: 'Gane com 2 polegadas de vantagem' },
        { label: 'Peso Habitual', fighter1: '~225-235 lbs (subindo)', fighter2: '~247 lbs (natural)', note: 'Gane pesa naturalmente 10-20 lbs a mais' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'Teixeira MMA, Connecticut', fighter2: 'MMA Factory, Paris', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 97, valueB: 68, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Pereira quebrou o recorde de Francis Ngannou no soco mais forte ja registrado no UFC Performance Institute.' },
        { label: 'Striking Tecnico', valueA: 85, valueB: 90, labelA: 'Muito Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Gane tem diversidade superior: jab, teep, low kicks, joelhadas. Pereira e mais preciso mas menos variado.' },
        { label: 'Footwork / Movimento', valueA: 60, valueB: 92, labelA: 'Bom', labelB: 'Excelente', advantage: 'fighter2', advantage_note: 'Gane se move como um peso medio. Pereira e mais plantado, depende mais de timing que de movimento.' },
        { label: 'Defesa / Durabilidade', valueA: 72, valueB: 80, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Gane nunca foi nocauteado no MMA. Pereira ja foi finalizado mas tem queixo testado nos pesados.' },
        { label: 'Cardio / Gas', valueA: 65, valueB: 78, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Gane mantem ritmo alto por 5 rounds. Pereira perdeu a unica vez que foi para decisao recentemente (Ankalaev 1).' },
        { label: 'QI de Luta / Timing', valueA: 92, valueB: 82, labelA: 'Excelente', labelB: 'Muito Bom', advantage: 'fighter1', advantage_note: 'Pereira le oponentes como poucos na historia. Seu timing de counter e letal, especialmente o gancho de esquerda.' },
      ],
      insight: 'Esse confronto expoe uma dinamica fascinante: Gane e tecnicamente superior em quase todas as metricas de striking exceto uma, poder. E essa unica metrica e a que mais importa quando <strong class="text-ufc-red">Pereira</strong> esta no octogono. O QI de luta e timing do Poatan compensam qualquer deficiencia tecnica. A questao e se Gane consegue manter distancia suficiente para neutralizar o poder.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Pereira',
        ko_tko: { count: 11, percent: 85 },
        submission: { count: 0, percent: 0 },
        decision: { count: 2, percent: 15 },
        total_wins: 13,
      },
      fighter2: {
        nome: 'Gane',
        ko_tko: { count: 6, percent: 46 },
        submission: { count: 3, percent: 23 },
        decision: { count: 4, percent: 31 },
        total_wins: 13,
      },
      insight: 'O contraste e gritante: 85% das vitorias de Pereira sao por nocaute. Ele e um predador que busca a finalizacao. Gane e mais diversificado: 46% KO, 23% finalizacao, 31% decisao. Isso significa que Gane tem mais formas de vencer, mas Pereira tem a forma mais definitiva. Quando Poatan acerta, a luta acaba.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1-R2',
          danger_level: 9,
          danger_label: 'VANTAGEM PEREIRA',
          color: 'red',
          title: 'A Zona de Extincao',
          description: 'Os dois primeiros rounds sao onde Pereira e mais perigoso. 11 dos seus 13 KOs vieram nos primeiros dois rounds. Se ele encontrar o timing do counter left hook, pode acabar a luta a qualquer segundo. Gane precisa sobreviver essa fase sem tomar riscos desnecessarios.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Pivo',
          description: 'O terceiro round e o termometro. Se Pereira nao finalizou ate aqui, o cardio comeca a pesar. Se Gane acumulou pontos com jabs e low kicks, ele esta no caminho da vitoria. Mas Pereira ainda e perigoso, como mostrou no TKO R4 sobre Rountree.',
        },
        {
          rounds: 'R4-R5',
          danger_level: 7,
          danger_label: 'VANTAGEM GANE',
          color: 'green',
          title: 'O Territorio do Bon Gamin',
          description: 'Os rounds finais favorecem Gane fortemente. Seu cardio e significativamente superior, e Pereira nunca venceu por decisao no UFC (suas 2 decisoes foram no inicio da carreira). A unica vez que Pereira foi para o quinto round recentemente, ele perdeu para Ankalaev. Se Gane esta na frente nos cartoes e se movendo bem, Pereira precisara de um milagre.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Busca por historia sem precedentes', fighter: 'Pereira', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Pereira esta motivado como nunca. Ele abriu mao do titulo dos meio-pesados voluntariamente para perseguir algo que ninguem nunca fez. Esse tipo de motivacao transforma lutadores.' },
        { icon: 'Activity', title: 'Pe quebrado no UFC 320', fighter: 'Pereira', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Pereira quebrou o pe em outubro de 2025 e ficou fora por meses. Embora esteja recuperado, lesoes no pe podem afetar a mobilidade e o poder de chute. Se ele sentir dor, o footwork ja limitado pode piorar.' },
        { icon: 'Clock', title: 'Inatividade de 18 meses', fighter: 'Gane', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'O ultimo combate real de Gane foi a decisao dividida contra Volkov em dezembro de 2024. Mais de 18 meses sem luta completa e um longo tempo, especialmente para um lutador que depende de timing e ritmo.' },
        { icon: 'Shield', title: 'Nunca foi nocauteado no MMA', fighter: 'Gane', risk_level: 'POSITIVO', risk_color: 'green', description: 'Em 16 lutas de MMA, Gane nunca foi nocauteado. Sua unica finalizacao foi por submissao (Jones). Isso sugere um queixo solido e excelente defesa, mas ele nunca enfrentou poder no nivel de Pereira.' },
        { icon: 'Zap', title: 'Soco mais forte da historia do UFC', fighter: 'Pereira', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Pereira superou o recorde de Francis Ngannou no UFC Performance Institute. Nos pesados, com mais massa corporal, esse poder pode ser ainda mais devastador. Um unico soco limpo pode mudar tudo.' },
        { icon: 'AlertTriangle', title: 'Subindo de divisao de peso', fighter: 'Pereira', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Pereira pesa habitualmente 225-235 lbs como meio-pesado. Gane pesa naturalmente 247 lbs. A diferenca de 10-20 libras pode importar no clinch e na resistencia a golpes. Mas Pereira ja e um dos maiores da divisao em altura e envergadura.' },
        { icon: 'Brain', title: 'Decisao dividida controversa', fighter: 'Gane', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: '19 de 20 membros da midia deram a luta contra Volkov para o adversario. Ganhar uma decisao que poucos concordaram pode gerar duvidas sobre o nivel atual de Gane.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Pereira',
        total_probability: 52,
        scenarios: [
          { name: 'O Gancho Que Muda a Historia', probability: 28, method: 'KO R1-R2', description: 'Pereira encontra o timing do counter left hook, a arma que nocauteou Hill, Prochazka, e Adesanya. Gane entra com sua combinacao, Pereira desvia e solta o gancho. Apaga. O mesmo script que funcionou contra todos os outros campeoes.' },
          { name: 'A Cotovelada Devastadora', probability: 12, method: 'TKO R2-R3', description: 'No clinch ou apos um check hook, Pereira encurta a distancia e usa cotoveladas como fez contra Ankalaev no UFC 320. Gane sangra, o medico para, ou Pereira finaliza no ground and pound.' },
          { name: 'Pressao Calculada', probability: 12, method: 'TKO R3-R4', description: 'Pereira aceita perder os primeiros rounds trocando jabs, mas acumula dano com body shots e low kicks. No terceiro ou quarto round, Gane desacelera e Pereira encontra a abertura para o nocaute tardio, como fez contra Rountree.' },
        ],
      },
      fighter2: {
        nome: 'Gane',
        total_probability: 45,
        scenarios: [
          { name: 'Masterclass de Distancia', probability: 22, method: 'Decisao Unanime', description: 'Gane usa jab, teep kicks e movimentacao lateral para frustrar Pereira. Nunca fica parado na linha de fogo, acumula pontos com strikes a distancia, e leva a luta para a decisao dos juizes. O cardio superior faz a diferenca nos rounds finais.' },
          { name: 'Death by a Thousand Cuts', probability: 13, method: 'TKO R4-R5', description: 'Gane acumula low kicks e body shots que destroem a mobilidade de Pereira ao longo da luta. Nos rounds finais, Pereira nao consegue mais se mover, e Gane finaliza com uma sequencia de socos contra a grade.' },
          { name: 'O Takedown Surpresa', probability: 10, method: 'Decisao Unanime ou TKO', description: 'Gane mistura takedowns no gameplan para quebrar o ritmo de Pereira. Mesmo com 25% de precisao, basta um ou dois takedowns por round para acumular controle e tirar Pereira do conforto.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Alex Pereira',
      winner_side: 'fighter1',
      predicted_method: 'KO nos primeiros 3 rounds',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Essa e uma luta extremamente dificil de prever. Pereira tem o poder para encerrar qualquer luta com um unico golpe, mas Gane tem as ferramentas tecnicas para evitar esse golpe por 25 minutos. A previsao em Pereira se baseia em tres fatores: (1) ele encontra o timing de praticamente todo mundo que enfrenta, (2) Gane tem 18 meses de inatividade real, e (3) nos pesados, basta um soco limpo. Mas a confianca e MEDIA porque Gane pode absolutamente vencer essa luta por decisao se executar o gameplan de distancia. Essa luta e genuinamente 50/50.',
      x_factor: {
        title: 'O Peso Extra do Poatan',
        description: 'Pereira nunca lutou nos pesados no UFC. A massa corporal adicional pode aumentar seu poder (ja recorde mundial) ou pode diminuir sua velocidade e timing. Se o peso extra o deixar mais lento, Gane domina. Se ele mantiver a velocidade com mais massa, e game over para qualquer um.',
      },
      upset_alert: {
        title: 'Upset Alert: Gane por Decisao Unanime Dominante',
        description: 'Se Gane executar o gameplan perfeito, usando jab, teep e footwork para nunca deixar Pereira entrar na distancia de nocaute, ele pode transformar isso em uma aula de boxe a distancia. A chave seria low kicks no pe que Pereira quebrou em 2025, removendo a mobilidade do brasileiro progressivamente.',
      },
      probabilities: {
        fighter1: { nome: 'Pereira', percent: 52 },
        fighter2: { nome: 'Gane', percent: 45 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Jab e o Teep de Gane', icon: 'Target', description: 'Se Gane conseguir estabelecer o jab e o teep kick nos primeiros 2 minutos, e sinal de que ele vai controlar a distancia. Pereira precisa encontrar formas de entrar por dentro desses golpes. Se nao conseguir, vai ser uma noite longa.' },
        { num: 2, title: 'O Counter Left Hook de Pereira', icon: 'Zap', description: 'A arma mais letal do MMA moderno. Observe quando Gane lanca combinacoes: se Pereira esta puxando a cabeca para a direita e carregando a esquerda, o nocaute pode vir a qualquer momento. Um unico acerto limpo pode acabar a luta.' },
        { num: 3, title: 'Low Kicks no Pe Lesionado', icon: 'AlertTriangle', description: 'Gane precisa atacar o pe que Pereira quebrou. Se ele conectar 10+ low kicks no pe direito de Pereira nos primeiros dois rounds, a mobilidade do brasileiro vai deteriorar drasticamente. Esse pode ser o gameplan decisivo.' },
        { num: 4, title: 'Cardio no Round 3', icon: 'Clock', description: 'O round 3 e o divisor de aguas. Se Pereira ainda esta marchando para frente com poder, Gane esta em perigo. Se Pereira esta recuando e respirando pela boca, Gane vai dominar R4-R5. Esse e o round que define a luta.' },
        { num: 5, title: 'Clinch e Trabalho Sujo', icon: 'Shield', description: 'Pereira e devastador no clinch com cotoveladas e joelhadas. Gane quer evitar o clinch a todo custo. Se Pereira conseguir prender Gane contra a grade, as cotoveladas que nocautearam Ankalaev podem aparecer.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'PEREIRA VS GANE', content: 'UFC Freedom 250\n14 de Junho, 2026\nCasa Branca, Washington D.C.\n\nTitulo Interino Peso Pesado\n5 Rounds', color: 'red' },
        { slide_number: 2, title: 'ALEX PEREIRA', content: '13-3-0 | #5 P4P\n\n85% de vitorias por nocaute\nSoco mais forte da historia do UFC\nEx-campeao em 2 divisoes\nBuscando historia em 3 divisoes', color: 'red' },
        { slide_number: 3, title: 'CIRYL GANE', content: '13-2-0 | #1 HW\n\nNunca foi nocauteado no MMA\n5.29 strikes significativos/min\nEx-campeao interino HW\nFootwork de peso medio', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE DA LUTA', content: 'DISTANCIA.\n\nSe Gane mantem distancia = Gane vence\nSe Pereira encurta = Pereira nocauteia\n\n62% precisao vs 60% defesa\nPoder vs Movimento', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'Pereira por KO nos primeiros 3 rounds\nConfianca: MEDIA\n\n52% Pereira | 45% Gane | 3% Empate\n\nLuta genuinamente 50/50\nHistoria vs Tecnica', color: 'gold' },
      ],
      twitter: [
        { num: '1/6', text: 'Pereira vs Gane no gramado da Casa Branca. Titulo interino peso pesado. O homem com o soco mais forte da historia do UFC contra o unico peso pesado que nunca foi nocauteado. Esse evento e surreal.' },
        { num: '2/6', text: 'Alex Pereira: 85% de vitorias por KO. 11 nocautes em 13 lutas. Superou o recorde de Ngannou no soco mais forte. E agora esta subindo para os pesados. Imagina esse poder com mais massa corporal.' },
        { num: '3/6', text: 'Ciryl Gane: NUNCA foi nocauteado em 16 lutas de MMA. Se move como um peso medio com 112kg. Absorve apenas 2.33 strikes por minuto (Pereira absorve 3.50). Esse footwork e de outro planeta.' },
        { num: '4/6', text: 'A chave dessa luta e DISTANCIA. Gane precisa manter Pereira longe com jab e teep. Pereira precisa encurtar e encontrar o counter left hook. Quem controlar a distancia, vence.' },
        { num: '5/6', text: 'Red flag: Gane nao luta de verdade faz 18 meses. A "vitoria" sobre Volkov foi uma decisao dividida que 19 de 20 midia deram pro outro lado. Sera que ele esta enferrujado?' },
        { num: '6/6', text: 'Minha previsao: Pereira por KO nos primeiros 3 rounds. Confianca MEDIA. Gane pode absolutamente vencer por decisao, mas o timing de Pereira contra todo mundo que ele enfrentou e sobrenatural. Um soco. E so precisa de um.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O homem com o soco mais forte da historia do UFC contra o unico peso pesado que nunca foi nocauteado. Titulo interino. No gramado da Casa Branca. Isso e real."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Pereira: 85% de vitorias por KO. 62% de precisao, a melhor da historia do UFC. Gane: nunca nocauteado em 16 lutas, absorve so 2.33 strikes por minuto, se move como um peso medio pesando 112 kilos."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Essa luta se resume a uma palavra: distancia. Se Gane usa o jab e o teep pra manter Pereira longe, ele vence por decisao. Se Pereira encurta e encontra o timing do counter left hook, apaga. E genuinamente 50/50."' },
        { time: '40-50s', title: 'Red Flags', text: '"Duas coisas me preocupam. Gane nao luta de verdade faz 18 meses. E Pereira quebrou o pe em outubro. Se Gane ataca esse pe com low kicks, o brasileiro perde mobilidade. Mas se Pereira entra em distancia de clinch, as cotoveladas sao mortais."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Minha previsao: Pereira por KO nos primeiros 3 rounds. Mas honestamente, se Gane sobreviver ate o terceiro round, ele vence. Comenta ai: poder do Pereira ou footwork do Gane?"' },
      ],
      tiktok: [
        { hook: 'O soco mais forte da HISTORIA do UFC contra o UNICO peso pesado que nunca foi nocauteado.', body: 'Pereira nocauteou 85% dos adversarios. Gane nunca foi apagado em 16 lutas. Titulo interino. Casa Branca. Essa luta se resume a distancia: Gane longe vence, Pereira perto nocauteia.', cta: 'Quem vence? Comenta POATAN ou BON GAMIN.' },
        { hook: 'Uma estatistica ASSUSTADORA sobre Alex Pereira que ninguem fala.', body: 'Pereira superou o recorde de FRANCIS NGANNOU no soco mais forte. E agora esta subindo de divisao, com mais massa corporal. Esse poder nos pesados pode ser historicamente devastador. 11 KOs em 13 lutas.', cta: 'Segue pra mais analises de UFC que voce nao encontra em nenhum outro lugar.' },
        { hook: 'A RED FLAG que pode custar a luta pra Ciryl Gane.', body: 'Gane nao luta DE VERDADE faz 18 meses. O NC com Aspinall nao conta. A "vitoria" sobre Volkov, 19 de 20 midia deram pro outro cara. Contra o nocauteador mais preciso do UFC, ring rust pode ser fatal.', cta: 'Salva pra assistir antes da luta. Vai fazer sentido no dia 14 de junho.' },
      ],
      headlines: [
        'Pereira vs Gane: O Soco Mais Forte Contra o Queixo Mais Testado',
        'UFC Freedom 250: Tres Divisoes Para a Eternidade',
        'Poatan na Casa Branca: A Caca ao Titulo Historico dos Pesados',
        '85% KO Rate vs Nunca Nocauteado: Os Numeros da Luta Impossivel',
        'Gane Pode Parar Pereira? A Analise Completa do UFC Freedom 250',
        'Distancia: A Unica Palavra Que Define Pereira vs Gane',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-135',
        fighter2_odds: '+114',
        fighter1_name: 'Pereira',
        fighter2_name: 'Gane',
        source: 'DraftKings (marco 2026, odds de abertura)',
      },
      edges: [
        { icon: 'Flame', titulo: 'Taxa de Nocaute Historica', stat_headline: '85% DE VITORIAS POR NOCAUTE (11 DE 13 LUTAS)', contexto: 'Pereira tem a maior taxa de KO entre campeoes do UFC na era moderna. Nos pesados, com mais massa corporal, o poder tende a ser amplificado. Apenas 2 das suas 13 vitorias foram por decisao, e ambas no inicio da carreira.', implicacao_aposta: 'Apostas em Pereira por KO/TKO tem valor forte. A probabilidade implicita de KO e maior do que as odds sugerem, dado que 85% das vitorias sao por nocaute.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Gane Nunca Foi Nocauteado', stat_headline: '0 NOCAUTES SOFRIDOS EM 16 LUTAS DE MMA', contexto: 'Gane nunca foi parado por strikes no MMA. Sua unica finalizacao foi por submissao (Jones). Combinado com a absorção de apenas 2.33 SApM, ele e extremamente dificil de acertar limpo.', implicacao_aposta: 'Reduz a confianca em apostas de Pereira por KO. Gane pode ser o oponente mais dificil de nocautear que Pereira ja enfrentou. Considere "vai para decisao" como alternativa.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Inatividade de Gane', stat_headline: '18+ MESES SEM LUTA COMPLETA (DESDE DEZ 2024)', contexto: 'O ultimo combate real de Gane foi uma decisao dividida controversa contra Volkov em dezembro de 2024. O NC contra Aspinall nao conta como atividade real. Contra um oponente do calibre de Pereira, ring rust pode ser fatal.', implicacao_aposta: 'Favorece Pereira nos primeiros rounds. Lutadores que voltam de longos layoffs tendem a apresentar timing mais lento e reacoes mais lentas nos primeiros minutos.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Activity', titulo: 'Vantagem de Cardio nos Championship Rounds', stat_headline: 'PEREIRA PERDEU SUA UNICA LUTA RECENTE QUE FOI A DECISAO', contexto: 'Quando Pereira foi a decisao contra Ankalaev, perdeu. Gane, por outro lado, tem cardio comprovado em lutas de 5 rounds. Se a luta passar do terceiro round, a vantagem de cardio pode ser determinante.', implicacao_aposta: 'Cria valor significativo em Over 2.5 rounds. Se Gane sobreviver os primeiros rounds, o cardio se torna o fator decisivo e ele domina os championship rounds.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Pe Lesionado de Pereira', stat_headline: 'PE QUEBRADO EM OUTUBRO 2025, 8 MESES DE RECUPERACAO', contexto: 'Pereira quebrou o pe no UFC 320 e foi visto com bota ortopedica. Mesmo recuperado, lesoes no pe podem afetar mobilidade, especialmente contra um oponente que depende de movimento lateral para criar angulos.', implicacao_aposta: 'Se houver mercado de props para "metodo", low kicks de Gane no pe lesionado podem ser um fator. Favorece "luta vai para decisao" caso Pereira perca mobilidade.', edge_level: 'leve', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Pereira por KO/TKO', odds: '+100 (estimado)', confianca: 'media', raciocinio: '85% das vitorias de Pereira sao por KO. Nos pesados, o poder e amplificado. O timing do counter left hook funciona contra praticamente todo mundo. Mas Gane nunca foi nocauteado, o que reduz a confianca.' },
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '+105 (estimado)', confianca: 'media', edge_vs_mercado: 'O mercado pode subestimar a capacidade de Gane de evitar o nocaute. Seu footwork e absorção de strikes sugerem que ele pode sobreviver os primeiros rounds.', raciocinio: 'Gane nunca foi nocauteado e absorve poucos strikes. Pereira tem poder, mas Gane sabe se mover. A combinacao sugere que essa luta provavelmente vai alem do segundo round.' },
        { tipo: 'Moneyline', pick: 'Gane ML', odds: '+114', confianca: 'media', edge_vs_mercado: 'Essa luta e genuinamente 50/50 mas as odds dao Pereira como favorito. Gane como underdog a +114 pode ter valor.', raciocinio: 'Gane tem vantagens em footwork, cardio, defesa de strikes, e envergadura. Ele nunca foi nocauteado. A +114, ele e um underdog leve numa luta que pode facilmente ir para decisao onde ele domina.' },
        { tipo: 'Duracao', pick: 'Nao vai a distancia', odds: '-130 (estimado)', confianca: 'media', raciocinio: 'Pereira finaliza 85% das lutas. Nos pesados, o poder e maior. Mesmo que Gane nunca tenha sido nocauteado, o nivel de poder de Pereira e sem precedentes. A probabilidade de finalizacao e alta.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Pereira por KO no Round 1',
        descricao: 'Apostar em Pereira por KO no primeiro round e tentador dado o historico, mas Gane nao e como os outros oponentes. Ele tem o melhor footwork dos pesados, nunca foi nocauteado, e sabe se mover nos primeiros minutos. A chance de KO no R1 existe, mas e significativamente menor do que contra Hill ou Prochazka, que sao lutadores que avancam em linha reta. Gane nao faz isso.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
