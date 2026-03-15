import type { FullSingleAnalise } from '@/types/analise';

export const johnsonSilvaAnalise: FullSingleAnalise = {
  id: 'johnson-silva-ufn-mar-14',
  evento_id: null,
  slug: 'johnson-silva-ufn-mar-14',
  titulo: 'Johnson vs Silva: Ranking em Jogo nos Moscas',
  subtitulo: 'Dois top 15 dos moscas se enfrentam num duelo crucial no APEX',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decision', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Charles Johnson', record: '18-8-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Bruno Silva', record: '15-7-2', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Mosca',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
      evento_data: '14 de Marco, 2026',
      evento_local: 'Meta APEX, Las Vegas',
      categoria_peso: 'Peso Mosca (125 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'DUELO DE RANQUEADOS NOS MOSCAS',
      tagline_sub: '#13 contra #15 — quem afunda e quem sobe na divisao mais apertada do UFC.',
      fighter1: {
        nome_completo: 'Charles "InnerG" Johnson',
        apelido: 'InnerG',
        sobrenome: 'Johnson',
        record: '18-8-0',
        ranking: '#13 Peso Mosca',
        info_extra: 'Houston, Texas | 35 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Bruno "Bulldog" Silva',
        apelido: 'Bulldog',
        sobrenome: 'Silva',
        record: '15-7-2',
        ranking: '#15 Peso Mosca',
        info_extra: 'Sao Paulo, Brasil | 35 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">Turnaround Relampago</h3>
        <p><strong class="text-ufc-red">Charles Johnson</strong> esta fazendo algo incomum: voltando a lutar menos de dois meses apos ser nocauteado por Alex Perez no UFC 324. Esse tipo de turnaround rapido levanta questoes serias sobre sua condicao fisica e mental. Mas Johnson nao e estranho a adversidade — o ex-campeao do LFA construiu 2024 como o melhor ano da sua carreira, com 4 vitorias incluindo bonus de Performance da Noite contra Joshua Van. A questao e se aquele KO no primeiro round deixou marcas invisiveis.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Bulldog de Sao Paulo</h3>
        <p><strong class="text-blue-400">Bruno Silva</strong> e o tipo de lutador que voce nunca sabe o que esperar. Faixa preta de jiu-jitsu que tambem nocauteia, o brasileiro vem de uma vitoria por finalizacao sobre HyunSung Park que mostrou seu jogo de chao afiado. Mas antes disso, perdeu para Joshua Van e Manel Kape — dois lutadores de elite. Aos 35 anos, Silva esta numa posicao delicada: precisa de vitorias para se manter relevante na divisao mais competitiva do UFC.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Encruzilhada</h3>
        <p>Para ambos, essa luta e sobre sobrevivencia no ranking. <strong class="text-ufc-red">Johnson</strong> precisa provar que o KO de Perez foi um acidente, nao uma tendencia. <strong class="text-blue-400">Silva</strong> precisa mostrar que pertence ao top 15 e nao e apenas um gatekeeper. No octogono menor do APEX, com 5 polegadas de vantagem na altura para Johnson, a dinamica fisica favorece o americano — mas o jiu-jitsu de Silva pode mudar tudo se a luta for para o chao.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#13 Peso Mosca', fighter2: '#15 Peso Mosca' },
        { dimensao: 'Objetivo', fighter1: 'Recuperar momentum apos KO loss', fighter2: 'Sequencia de 2 vitorias, subir no ranking' },
        { dimensao: 'Narrativa', fighter1: 'Turnaround rapido apos nocaute brutal', fighter2: 'Faixa preta de BJJ lutando pela relevancia' },
        { dimensao: 'Risco', fighter1: 'Dois KOs seguidos seria devastador', fighter2: 'Derrota afunda no ranking e ameaca posicao' },
        { dimensao: 'Recompensa', fighter1: 'Volta ao top 10 dos moscas', fighter2: 'Melhor posicao no ranking da carreira' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O INNERG RECUPERA O MOMENTO',
          subtitulo: 'Johnson prova que o KO de Perez foi um acidente e volta ao caminho do top 10.',
          consequencias: [
            { tag: 'RANKING', texto: 'Sobe para #11-12 dos moscas, se aproximando de lutas contra top 10.' },
            { tag: 'MENTAL', texto: 'Demonstra resiliencia mental ao vencer rapidamente apos um KO devastador.' },
            { tag: 'MOMENTUM', texto: 'Retoma a trajetoria de 2024 que incluiu 4 vitorias e 2 bonus.' },
          ],
          proxima_luta: 'Oponente top 10 dos moscas como Matheus Nicolau ou Tim Elliott',
        },
        fighter2_vence: {
          titulo: 'O BULLDOG MORDE DE VOLTA',
          subtitulo: 'Silva capitaliza no turnaround rapido de Johnson e sobe no ranking.',
          consequencias: [
            { tag: 'RANKING', texto: 'Sobe para #12-13 dos moscas, melhor posicao da carreira no UFC.' },
            { tag: 'SEQUENCIA', texto: 'Duas vitorias consecutivas pela primeira vez desde 2024.' },
            { tag: 'VERSATILIDADE', texto: 'Prova que pode vencer por striking e grappling contra ranqueados.' },
          ],
          proxima_luta: 'Oponente na faixa #10-12 do ranking dos moscas',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Charles Johnson',
        color: 'red',
        recent_fights: [
          { date: 'Jan 2026', opponent: 'Alex Perez', result: 'L', method: 'TKO R1', opponent_rank: '#9 FLW', quality_score: 4, quality_label: 'Muito Bom', note: 'Nocauteado no primeiro round. Perez e top 10 e mostrou poder superior.' },
          { date: 'Ago 2025', opponent: "Lone'er Kavanagh", result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Performance da Noite. Parou Kavanagh no segundo round em Shanghai.' },
          { date: 'Out 2024', opponent: 'Su Mudaerji', result: 'W', method: 'Decisao Unanime', opponent_rank: '#15 FLW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida contra ranqueado. Dominou a distancia por 3 rounds.' },
          { date: 'Jul 2024', opponent: 'Joshua Van', result: 'W', method: 'KO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Performance da Noite. Nocaute espetacular no terceiro round.' },
          { date: 'Mar 2024', opponent: 'Azat Maksum', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Luta da Noite. Combate eletrizante que rendeu bonus.' },
        ],
        momentum_score: 5,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Johnson vinha de um 2024 espetacular com 4 vitorias e 2 bonus, mas o KO brutal de Perez no UFC 324 interrompeu tudo. Voltar a lutar em menos de 2 meses e arriscado — a pergunta e se ele esta 100% fisicamente e se o fantasma do nocaute nao afeta sua agressividade natural. O historico mostra um lutador resiliente que ja superou fases ruins antes.',
      },
      fighter2: {
        nome: 'Bruno Silva',
        color: 'blue',
        recent_fights: [
          { date: 'Out 2025', opponent: 'HyunSung Park', result: 'W', method: 'Sub R3 (RNC)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao por mata-leao no terceiro round. Mostrou paciencia e jiu-jitsu afiado.' },
          { date: 'Jun 2025', opponent: 'Joshua Van', result: 'L', method: 'TKO R3', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parado no terceiro round. Van mostrou cardio superior nas fases finais.' },
          { date: 'Dez 2024', opponent: 'Manel Kape', result: 'L', method: 'TKO R3 (body kick)', opponent_rank: '#7 FLW', quality_score: 4, quality_label: 'Muito Bom', note: 'Perdeu para ex-campeao RIZIN. Tomou chute no corpo devastador no R3.' },
          { date: 'Jul 2024', opponent: 'Cody Durden', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parou Durden no segundo round. Mostrou poder de finalizacao.' },
        ],
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Silva vem alternando entre vitorias e derrotas, mas a qualidade dos oponentes varia muito. Perdeu para Kape e Van (lutadores de qualidade), mas venceu Park e Durden com finalizacoes impressionantes. O padrao sugere que Silva e competitivo contra a maioria do roster mas tem um teto contra a elite. A vitoria por finalizacao sobre Park mostrou que seu jiu-jitsu continua afiado.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Johnson',
        media_oponentes: 2.6,
        media_oponentes_label: 'Bom',
        aproveitamento: '4W-1L (80%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Silva',
        media_oponentes: 2.5,
        media_oponentes_label: 'Medio',
        aproveitamento: '2W-2L (50%)',
        contra_top5: '0W-1L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Ambos enfrentaram Joshua Van recentemente. Johnson nocauteou Van no terceiro round (Jul 2024), enquanto Silva foi parado por Van no terceiro round (Jun 2025). Essa comparacao direta favorece Johnson claramente — ele conseguiu fazer com Van o que Silva nao conseguiu: sobreviver o desgaste e finalizar.',
    },

    oponente_comum: {
      oponente_nome: 'Joshua Van',
      fighter1_result: {
        resultado: 'Vitoria por KO R3',
        metodo: 'KO R3 (socos)',
        duracao: '3 rounds',
        contexto: 'Johnson dominou o ritmo da luta com seu volume de strikes e encontrou a abertura para um nocaute espetacular no terceiro round, rendendo bonus de Performance da Noite.',
        performance: 'Desempenho dominante que mostrou a capacidade de Johnson de manter pressao por 3 rounds e finalizar quando a oportunidade aparece. Striking tecnico e paciente.',
        evento: 'UFC Fight Night',
        data: 'Jul 2024',
      },
      fighter2_result: {
        resultado: 'Derrota por TKO R3',
        metodo: 'TKO R3 (strikes)',
        duracao: '3 rounds',
        contexto: 'Silva comecou bem mas Van tomou o controle no segundo round e finalizou no terceiro com uma combinacao de strikes quando o cardio de Silva comecou a falhar.',
        performance: 'Silva mostrou boas trocas nos rounds iniciais mas nao conseguiu manter o ritmo. A falta de resistencia nos rounds finais foi o fator decisivo na derrota.',
        evento: 'UFC 316',
        data: 'Jun 2025',
      },
      insight: 'A comparacao via Joshua Van e reveladora: Johnson nocauteou Van no R3 ganhando bonus, enquanto Silva FOI nocauteado por Van no R3. Isso sugere que Johnson tem o cardio e a capacidade de finalizacao que Silva nao demonstrou contra o mesmo oponente. Se essa luta for para o terceiro round, a vantagem de Johnson e significativa.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.77, valueB: 3.82, maxVal: 7, format: 'decimal', note: 'Johnson com volume significativamente maior. Pressiona e lanca mais golpes por minuto.' },
        { label: 'Precisao de Strikes (%)', valueA: 50, valueB: 50, maxVal: 100, format: 'percent', note: 'Identicos em precisao. Ambos acertam metade dos golpes significativos.' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.62, valueB: 4.55, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Silva absorve quase 1 strike a mais por minuto. Johnson e mais eficiente defensivamente.' },
        { label: 'Defesa de Strikes (%)', valueA: 57, valueB: 52, maxVal: 100, format: 'percent', note: 'Johnson com leve vantagem defensiva. Ambos na faixa media.' },
        { label: 'Takedowns por 15 Min', valueA: 0.56, valueB: 2.30, maxVal: 4, format: 'decimal', note: 'Silva tenta muito mais takedowns. Seu jiu-jitsu influencia o gameplan.' },
        { label: 'Precisao de Takedown (%)', valueA: 23, valueB: 29, maxVal: 100, format: 'percent', note: 'Ambos com precisao baixa em takedowns. A conversao e dificil para os dois.' },
        { label: 'Defesa de Takedown (%)', valueA: 67, valueB: 63, maxVal: 100, format: 'percent', note: 'Valores similares. Nenhum dos dois e excepcional em defesa de takedown.' },
        { label: 'Submissoes por 15 Min', valueA: 0.10, valueB: 0.80, maxVal: 2, format: 'decimal', note: 'Silva com muito mais tentativas de finalizacao. Faixa preta de BJJ ativo no chao.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '35 anos', fighter2: '35 anos', note: 'Mesma idade, ambos veteranos da divisao' },
        { label: 'Altura', fighter1: '1.75m (5\'9")', fighter2: '1.63m (5\'4")', note: 'Johnson 12cm mais alto — vantagem significativa nos moscas' },
        { label: 'Envergadura', fighter1: '178cm (70")', fighter2: '165cm (65")', note: 'Johnson com 5 polegadas a mais de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Ambos ortodoxos' },
        { label: 'Academia', fighter1: 'Fortis MMA, Houston', fighter2: 'Team Felipe Vida, Sao Paulo', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Volume de Striking', valueA: 78, valueB: 62, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Johnson lanca quase 5 strikes significativos por minuto, ritmo alto que pressiona oponentes. Silva e mais seletivo com 3.82 SLpM.' },
        { label: 'Poder de Nocaute', valueA: 65, valueB: 70, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Silva tem 6 KOs em 15 vitorias (40%) e poder desproporcional para 5\'4". Johnson tambem tem poder mas depende mais de volume.' },
        { label: 'Jiu-Jitsu / Grappling', valueA: 40, valueB: 82, labelA: 'Medio', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Silva e faixa preta de BJJ com 5 finalizacoes na carreira. Tenta 0.80 submissoes por 15 min. Johnson quase nao busca finalizacoes (0.10/15min).' },
        { label: 'Defesa em Pe', valueA: 62, valueB: 52, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Johnson absorve menos strikes (3.62 vs 4.55 SApM) com melhor defesa percentual (57% vs 52%). A altura e envergadura ajudam.' },
        { label: 'Cardio / Resistencia', valueA: 68, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Johnson mostrou cardio solido em lutas de 3 rounds ao longo de 2024. Silva tem historico de perder rendimento nos rounds finais (perdeu para Van e Kape no R3).' },
        { label: 'QI de Luta / Adaptacao', valueA: 65, valueB: 60, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Johnson mostra boa adaptacao tatica, variando entre volume e paciencia conforme necessario. Silva as vezes insiste em gameplans que nao funcionam.' },
      ],
      insight: 'O perfil revela uma luta classica de striker vs grappler. <strong class="text-ufc-red">Johnson</strong> domina em pe com volume, alcance e defesa superiores. <strong class="text-blue-400">Silva</strong> tem vantagem clara no chao com seu jiu-jitsu faixa preta. A luta provavelmente sera decidida por onde acontece: se Johnson mantiver em pe, vence por pontos. Se Silva levar para o chao, pode finalizar.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Johnson',
        ko_tko: { count: 8, percent: 44 },
        submission: { count: 1, percent: 6 },
        decision: { count: 9, percent: 50 },
        total_wins: 18,
      },
      fighter2: {
        nome: 'Silva',
        ko_tko: { count: 6, percent: 40 },
        submission: { count: 5, percent: 33 },
        decision: { count: 4, percent: 27 },
        total_wins: 15,
      },
      insight: 'Johnson e mais dependente de decisoes (50%) e nocautes (44%), enquanto Silva tem uma distribuicao mais equilibrada entre KO (40%), finalizacao (33%) e decisao (27%). O fato de Silva ter 5 finalizacoes mostra que levar a luta para o chao e um caminho de vitoria muito real. Johnson raramente finaliza (apenas 1 submissao na carreira).',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Primeiras Trocas e Medidas',
          description: 'O primeiro round sera de estudo. Johnson vai tentar estabelecer o jab e manter distancia com sua vantagem de 5 polegadas de envergadura. Silva vai buscar encurtar distancia e testar as defesas de takedown de Johnson (67%). Se Silva conseguir um takedown cedo, pode mudar a dinamica da luta inteira. Se Johnson mantiver a distancia, acumula pontos.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'VANTAGEM JOHNSON',
          color: 'red',
          title: 'Volume e Alcance Dominam',
          description: 'No segundo round, o volume de Johnson (4.77 SLpM) comeca a acumular dano. Silva historicamente perde rendimento conforme a luta se estende, como visto nas derrotas para Van e Kape no R3. A altura e envergadura de Johnson se tornam mais efetivas contra um Silva que comeca a cair de ritmo.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM JOHNSON',
          color: 'red',
          title: 'Resistencia vs Desespero',
          description: 'Se a luta chegar ao terceiro round sem finalizacao, Johnson esta na frente. Porem, e exatamente aqui que Silva pode ser mais perigoso: cansado e perdendo nos cartoes, pode buscar takedowns desesperados e finalizacoes de alto risco. O jiu-jitsu de Silva e uma ameaca constante, mesmo quando esta perdendo. Johnson precisa manter a compostura.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'AlertTriangle', title: 'Turnaround de menos de 2 meses apos KO', fighter: 'Johnson', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Johnson foi nocauteado por Alex Perez em janeiro e esta voltando em marco. Turnarounds rapidos apos nocautes levantam preocupacoes medicas e psicologicas. O queixo pode estar mais vulneravel e o medo do KO pode afetar a agressividade.' },
        { icon: 'Brain', title: 'Impacto psicologico do KO recente', fighter: 'Johnson', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Apos ser nocauteado brutalmente, lutadores frequentemente mudam seu estilo — ficam mais cautelosos, hesitam em trocar. Se Johnson perder a agressividade que o tornou bem-sucedido em 2024, Silva pode capitalizar.' },
        { icon: 'TrendingUp', title: 'Vantagem massiva de tamanho', fighter: 'Johnson', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Johnson tem 12cm de altura e 5 polegadas de envergadura a mais que Silva. Na divisao dos moscas, onde as diferencas fisicas sao minimas, isso e uma vantagem absurda. Johnson pode literalmente golpear por cima da guarda de Silva.' },
        { icon: 'Shield', title: 'Jiu-jitsu faixa preta', fighter: 'Silva', risk_level: 'POSITIVO', risk_color: 'green', description: 'Silva e faixa preta de BJJ e sua finalizacao mais recente (RNC sobre Park) mostra que o jogo de chao continua afiado. Com 0.80 tentativas de submissao por 15 min, ele e uma ameaca constante se a luta for para o chao.' },
        { icon: 'Activity', title: 'Historico de queda de rendimento no R3', fighter: 'Silva', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Silva perdeu para Van e Kape no terceiro round. O padrao sugere problemas de cardio quando a luta se estende e o ritmo e alto. Contra o volume de Johnson, isso pode ser fatal.' },
        { icon: 'MapPin', title: 'Octogono menor do APEX', fighter: 'Silva', risk_level: 'POSITIVO', risk_color: 'green', description: 'O octogono menor do Meta APEX favorece Silva, que precisa encurtar distancia para aplicar takedowns e clinch. Menos espaco para Johnson usar a envergadura significa mais oportunidades para Silva entrar no range do grappling.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Johnson',
        total_probability: 55,
        scenarios: [
          { name: 'Volume e Distancia', probability: 28, method: 'Decisao Unanime', description: 'Johnson usa a vantagem de altura e envergadura para manter Silva longe com jabs e diretos. O volume de 4.77 SLpM acumula pontos consistentemente. Defende os takedowns de Silva (67% TD def) e vence nos cartoes com atividade superior.' },
          { name: 'O Nocaute do Mais Alto', probability: 15, method: 'TKO R2-R3', description: 'Conforme Silva comeca a cair de ritmo, Johnson encontra aberturas para golpes limpos por cima da guarda. O dano acumulado dos rounds anteriores torna Silva vulneravel a uma combinacao que forca a parada.' },
          { name: 'Dominio Completo', probability: 12, method: 'Decisao Unanime (30-27)', description: 'Johnson impoe seu jogo fisico desde o inicio, controlando distancia, defendendo todos os takedowns e dominando cada round. Silva nao encontra respostas para a diferenca de tamanho.' },
        ],
      },
      fighter2: {
        nome: 'Silva',
        total_probability: 42,
        scenarios: [
          { name: 'Bulldog no Chao', probability: 18, method: 'Sub R2-R3', description: 'Silva consegue takedowns no APEX menor, avanca posicao e busca finalizacao com seu jiu-jitsu faixa preta. O mata-leao ou um arm-bar aparece quando Johnson tenta se levantar. O mesmo roteiro da vitoria sobre Park.' },
          { name: 'Poder Desproporcional', probability: 12, method: 'KO/TKO R1-R2', description: 'Silva encurta a distancia rapidamente e conecta um golpe de poder que surpreende Johnson — especialmente perigoso se o queixo de Johnson esta comprometido apos o KO recente. O poder de Silva e subestimado para o tamanho.' },
          { name: 'Grind Brasileiro', probability: 12, method: 'Decisao Unanime', description: 'Silva mistura takedowns com clinch e controle contra a grade, acumulando tempo de controle e pontos. A luta se torna suja e travada, favorecendo o grappling de Silva sobre o striking de Johnson.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Charles Johnson',
      winner_side: 'fighter1',
      predicted_method: 'Decisao Unanime',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Johnson tem vantagens fisicas significativas (12cm de altura, 5 polegadas de envergadura) e volume de striking superior (4.77 vs 3.82 SLpM). A comparacao via Joshua Van e favoravel a Johnson. Porem, o turnaround rapido apos o KO de Perez e uma preocupacao real que pode mudar tudo. Se Johnson esta 100%, deve vencer por pontos. Se o KO deixou sequelas, Silva pode capitalizar com grappling. A confianca e MEDIA justamente por essa incerteza.',
      x_factor: {
        title: 'O Queixo de Johnson Pos-KO',
        description: 'Johnson foi nocauteado por Perez ha menos de 2 meses. A grande questao e se seu queixo esta comprometido. Se estiver, Silva tem poder suficiente para explorar isso. Se nao estiver, Johnson tem as ferramentas para dominar por 3 rounds. Esse e o fator que pode virar toda a analise de cabeca pra baixo.',
      },
      upset_alert: {
        title: 'Upset Alert: Silva por Finalizacao',
        description: 'Se Silva conseguir levar a luta para o chao, o jiu-jitsu faixa preta e uma ameaca real. Johnson tem apenas 67% de defesa de takedown e nenhuma habilidade demonstrada no chao. Uma finalizacao de Silva no segundo ou terceiro round nao seria uma surpresa — seria o resultado do gameplan perfeito.',
      },
      probabilities: {
        fighter1: { nome: 'Johnson', percent: 55 },
        fighter2: { nome: 'Silva', percent: 42 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Johnson ML', reasoning: 'Vantagem fisica clara, volume de striking superior e comparacao favoravel via Joshua Van. O preco como favorito moderado e justo.' },
        method: { pick: 'Johnson por Decisao', reasoning: 'Metade das vitorias de Johnson sao por decisao. Em uma luta de 3 rounds com vantagem de tamanho, pontuar e o caminho mais provavel.' },
        over_under: { pick: 'Over 1.5 Rounds', rounds: 1.5, reasoning: 'Ambos tem defesas razoaveis e a luta provavelmente vai para a distancia. Silva tem resistencia para sobreviver ate o R3.' },
        best_value: 'Over 1.5 rounds — a luta tem alta probabilidade de ir para decisao.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'A Linguagem Corporal de Johnson', icon: 'Brain', description: 'Preste atencao em como Johnson se comporta nas primeiras trocas. Se ele hesitar ou recuar quando Silva conectar algo, pode ser sinal de que o KO de Perez deixou marcas psicologicas. Se ele trocar como o Johnson de 2024, sem medo, e bom sinal.' },
        { num: 2, title: 'Tentativas de Takedown de Silva', icon: 'Shield', description: 'Silva tenta 2.30 takedowns por 15 min. Se ele conseguir derrubar Johnson nos primeiros minutos, a dinamica muda completamente. Se Johnson defender os 2-3 primeiros takedowns, Silva pode ficar desesperado e abrir espaco para contra-ataques.' },
        { num: 3, title: 'O Jab de Johnson a Distancia', icon: 'Target', description: 'Com 5 polegadas de vantagem na envergadura, o jab de Johnson e a arma mais importante da luta. Se ele estabelecer o jab cedo e manter Silva longe, vai acumular pontos sem risco. Observe a frequencia e precisao nos primeiros 2 minutos.' },
        { num: 4, title: 'Cardio de Silva no R3', icon: 'Activity', description: 'Silva tem historico de perder rendimento no terceiro round. Se ele estiver respirando pesado no final do R2, e sinal de que a luta esta indo para o caminho de Johnson. Se ainda estiver fresco, cuidado com takedowns tardios.' },
        { num: 5, title: 'Clinch na Grade do APEX', icon: 'MapPin', description: 'O octogono menor aumenta as chances de clinch. Silva vai tentar pressionar Johnson contra a grade para buscar takedowns. Se Johnson conseguir se manter no centro, controla a distancia. Se for empurrado para a grade, Silva tem oportunidades.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'JOHNSON VS SILVA', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Mosca (125 lbs)\n3 Rounds\n#13 vs #15', color: 'red' },
        { slide_number: 2, title: 'CHARLES JOHNSON', content: '18-8-0 | InnerG\n\n5\'9" com 70" de envergadura\n4.77 strikes por minuto\n#13 Peso Mosca\nVoltando de KO loss para Perez', color: 'red' },
        { slide_number: 3, title: 'BRUNO SILVA', content: '15-7-2 | Bulldog\n\nFaixa preta de BJJ\n5 finalizacoes na carreira\n#15 Peso Mosca\nVem de Sub sobre Park', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Johnson por Decisao Unanime\nConfianca: MEDIA\n\n55% Johnson | 42% Silva | 3% Empate\n\nX-Factor: queixo de Johnson pos-KO', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Johnson vs Silva no APEX sabado. #13 vs #15 dos moscas. O detalhe: Johnson foi nocauteado por Perez ha MENOS DE 2 MESES e ja esta voltando. Coragem ou imprudencia?' },
        { num: '2/5', text: 'Charles Johnson: 4 vitorias em 2024, 2 bonus de Performance da Noite, volume absurdo de 4.77 strikes/min. Mas o KO de Perez em janeiro muda tudo. O queixo esta la?' },
        { num: '3/5', text: 'Bruno Silva: 5\'4" com faixa preta de BJJ. NAO subestime o Bulldog. 5 finalizacoes na carreira e a mais recente foi um mata-leao sobre Park em outubro. Se a luta for pro chao, e territorio dele.' },
        { num: '4/5', text: 'Dado importante: ambos enfrentaram Joshua Van. Johnson NOCAUTEOU Van no R3. Silva FOI NOCAUTEADO por Van no R3. Diferenca clara em cardio e poder de finalizacao.' },
        { num: '5/5', text: 'Previsao: Johnson por decisao. 55-42. MAS cuidado com o turnaround rapido. Se Johnson nao esta 100%, Silva tem jiu-jitsu pra capitalizar. Over 1.5 rounds parece seguro.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"Voce voltaria a lutar 7 SEMANAS depois de ser nocauteado? Charles Johnson esta fazendo exatamente isso contra o faixa preta Bruno Silva sabado no APEX."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Johnson: 5\'9", quase 5 strikes por minuto, 4 vitorias em 2024 com 2 bonus. Mas foi APAGADO por Perez em janeiro. Silva: 5\'4", faixa preta de BJJ, 5 finalizacoes na carreira, vem de mata-leao sobre Park."' },
        { time: '25-40s', title: 'A Chave', text: '"O oponente em comum conta a historia: ambos enfrentaram Joshua Van. Johnson nocauteou Van no R3. Silva FOI nocauteado por Van no R3. Mas o X-factor e o queixo de Johnson pos-KO. Se esta comprometido, Silva pode explorar no chao."' },
        { time: '40-50s', title: 'Previsao', text: '"Johnson por decisao, confianca media. Tem vantagem de tamanho, volume e cardio. Mas o turnaround rapido apos KO e preocupante. Se Johnson hesitar nas trocas, Silva leva pro chao e busca a finalizacao."' },
        { time: '50-60s', title: 'CTA', text: '"Comenta: Johnson supera o fantasma do KO ou Silva capitaliza? Me segue pra mais analises detalhadas antes do card de sabado."' },
      ],
      tiktok: [
        { hook: '7 SEMANAS apos ser nocauteado e ja esta voltando a lutar. Coragem ou loucura?', body: 'Charles Johnson foi apagado por Perez em janeiro e ja enfrenta Bruno Silva sabado. Johnson tem 12cm de vantagem na altura, quase 5 strikes por minuto. Mas o queixo pode estar comprometido. Silva e faixa preta de BJJ com 5 finalizacoes. Se levar pro chao, e perigoso.', cta: 'Quem vence? Comenta JOHNSON ou BULLDOG.' },
        { hook: 'Ambos enfrentaram o MESMO cara. Os resultados foram OPOSTOS.', body: 'Johnson NOCAUTEOU Joshua Van no R3. Silva FOI NOCAUTEADO por Van no R3. Mesmo oponente, resultados opostos. Johnson tem cardio e poder de finalizacao. Silva cansa e perde nos rounds finais. Mas o KO recente muda tudo.', cta: 'Salva e assiste depois da luta sabado.' },
        { hook: 'O lutador de 1.63m que FINALIZA todo mundo no chao.', body: 'Bruno Silva tem 5\'4" mas e faixa preta de BJJ com 5 finalizacoes. Parou Park com mata-leao em outubro. Contra Johnson de 5\'9", precisa encurtar distancia e levar pro chao. No APEX menor, as chances aumentam.', cta: 'Segue pra analise completa de cada luta do card.' },
      ],
      headlines: [
        'Johnson vs Silva: O Turnaround de 7 Semanas que Pode Custar Caro',
        'Faixa Preta Contra Volume: O Duelo #13 vs #15 nos Moscas',
        'Johnson Supera o Fantasma do KO ou Silva Capitaliza?',
        'O Oponente em Comum Que Revela a Diferenca Entre Johnson e Silva',
        'APEX Menor, Perigo Maior: Silva Busca Levar Johnson ao Chao',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-180',
        fighter2_odds: '+150',
        fighter1_name: 'Johnson',
        fighter2_name: 'Silva',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Volume de Strikes Superior', stat_headline: '4.77 SLPM CONTRA 3.82 — JOHNSON LANCA 25% MAIS GOLPES POR MINUTO', contexto: 'Johnson tem um dos volumes mais altos da divisao dos moscas. Contra Silva, que absorve 4.55 strikes por minuto, a matematica favorece acumular dano consistente ao longo de 3 rounds.', implicacao_aposta: 'Favorece Johnson em mercados de decisao e total de strikes. O volume cria uma vantagem cumulativa que se reflete nos cartoes.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Jiu-Jitsu Faixa Preta de Silva', stat_headline: '5 FINALIZACOES NA CARREIRA E 0.80 SUBMISSOES POR 15 MIN', contexto: 'Silva e um dos grapplers mais ativos da divisao. A finalizacao sobre Park mostrou que o jogo de chao continua afiado. Contra Johnson, que tem apenas 67% de defesa de takedown, ha caminhos claros para finalizacao.', implicacao_aposta: 'Cria valor em Silva por finalizacao como aposta de risco. Se as odds estiverem acima de +500, pode ter valor.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Turnaround Rapido Pos-KO', stat_headline: 'JOHNSON VOLTANDO EM MENOS DE 2 MESES APOS SER NOCAUTEADO', contexto: 'Turnarounds rapidos apos nocautes sao historicamente arriscados. O queixo pode estar comprometido e o impacto psicologico pode mudar o estilo de luta de Johnson. Porem, ele ja passou por fases ruins antes.', implicacao_aposta: 'Pode criar valor em Silva como underdog. Se Johnson nao esta 100%, as odds de -180 para Johnson podem estar infladas.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'TrendingUp', titulo: 'Comparacao Via Oponente Comum', stat_headline: 'JOHNSON KO VAN NO R3 | SILVA FOI KO POR VAN NO R3', contexto: 'A comparacao via Joshua Van e uma das mais claras possiveis. Resultados opostos contra o mesmo oponente sugerem que Johnson tem vantagem em cardio e capacidade de finalizacao no terceiro round.', implicacao_aposta: 'Reforça a narrativa de que Johnson e o lutador superior. Favorece Over 2.5 rounds ja que Johnson tende a dominar nos rounds finais.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Vantagem Fisica nos Moscas', stat_headline: '12CM DE ALTURA E 5 POLEGADAS DE ENVERGADURA DE DIFERENCA', contexto: 'Na divisao mais leve do UFC, onde as diferencas fisicas sao normalmente minimas, Johnson tem uma vantagem de tamanho incomum sobre Silva. Isso afeta alcance, pressao e capacidade de manter distancia.', implicacao_aposta: 'Favorece Johnson em pe e aumenta dificuldade de Silva encurtar distancia. Pode diminuir a efetividade dos takedowns de Silva.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Johnson ML', odds: '-180 (estimado)', confianca: 'media', edge_vs_mercado: 'O preco e justo dadas as vantagens fisicas e de volume, mas o turnaround rapido adiciona risco.', raciocinio: 'Johnson tem vantagens claras em tamanho, volume e cardio. A comparacao via Van favorece. Porem o turnaround pos-KO e uma variavel que pode invalidar tudo.' },
        { tipo: 'Over/Under', pick: 'Over 1.5 Rounds', odds: '-200 (estimado)', confianca: 'alta', edge_vs_mercado: 'Ambos tem defesas razoaveis e a luta tende a ir para decisao. Alta probabilidade de ver 3 rounds completos.', raciocinio: 'Johnson venceu 50% das lutas por decisao. Silva sobreviveu ate o R3 contra Kape e Van. A luta provavelmente vai para a distancia.' },
        { tipo: 'Metodo', pick: 'Johnson por Decisao', odds: '+110 (estimado)', confianca: 'media', raciocinio: 'Metade das vitorias de Johnson sao por decisao. Com vantagem de tamanho e volume, pontuar por 3 rounds e o caminho mais natural. Valor a +110.' },
        { tipo: 'Metodo', pick: 'Silva por Finalizacao', odds: '+600 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Aposta de alto risco. Se Silva conseguir takedowns, o BJJ faixa preta e letal. Valor como aposta pequena.', raciocinio: 'Silva finalizou Park por RNC recentemente. Johnson tem 67% de TD def e zero habilidade demonstrada no chao. Se a luta for pro chao, Silva tem as ferramentas.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Johnson por KO/TKO',
        descricao: 'Apostar em Johnson por KO/TKO pode parecer logico dado o poder demonstrado contra Van, mas metade das vitorias de Johnson sao por decisao. Ele e mais um lutador de volume que de poder puro. Contra Silva, que e duro de nocautear (nunca foi parado no R1), a finalizacao por strikes e menos provavel que a decisao.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
