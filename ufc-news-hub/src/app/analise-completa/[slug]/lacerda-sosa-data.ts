import type { FullSingleAnalise } from '@/types/analise';

export const lacerdaSosaAnalise: FullSingleAnalise = {
  id: 'lacerda-sosa-ufn-mar-14',
  evento_id: null,
  slug: 'lacerda-sosa-ufn-mar-14',
  titulo: 'Lacerda vs Sosa: O Estrangulador Contra o Guerreiro Guanche',
  subtitulo: 'Faixa-preta veterano recebe debutante espanhol invicto nos galos',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Submission', confidence: 'MEDIA-ALTA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Luan Lacerda', record: '13-3-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Hecher Sosa', record: '14-1-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Galo',
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
      categoria_peso: 'Peso Galo (135 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'O CACADOR DE BRACOS CONTRA O DEBUTANTE INVICTO',
      tagline_sub: 'Faixa-preta brasileiro com 10 finalizacoes recebe o guerreiro das Ilhas Canarias no APEX.',
      fighter1: {
        nome_completo: 'Luan Lacerda',
        apelido: '',
        sobrenome: 'Lacerda',
        record: '13-3-0',
        ranking: 'Sem ranking BW',
        info_extra: 'Macapa, Brasil | 33 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Hecher "Guanche Warrior" Sosa',
        apelido: 'Guanche Warrior',
        sobrenome: 'Sosa',
        record: '14-1-0',
        ranking: 'Sem ranking BW (estreia no UFC)',
        info_extra: 'Lanzarote, Espanha | 30 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">A Ressurreicao do Faixa-Preta</h3>
        <p><strong class="text-ufc-red">Luan Lacerda</strong> e o tipo de lutador que o UFC quase deixou escapar. Depois de comecar 0-2 na organizacao, com derrotas para Cody Stamann e Da'Mon Blackshear, muitos o davam como descartavel. Mas o faixa-preta de jiu-jitsu de Macapa tinha outros planos. Em outubro de 2025, finalizou Saimon Oliveira com uma chave de braco cirurgica no segundo round, provando que ainda pertence ao mais alto nivel. Com 10 finalizacoes em 13 vitorias, Lacerda nao precisa de decisoes dos juizes — ele termina as lutas por conta propria.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Guerreiro das Ilhas Canarias</h3>
        <p><strong class="text-blue-400">Hecher Sosa</strong> chega ao UFC como uma das maiores promessas europeias no peso galo. O espanhol de Lanzarote construiu um recorde impressionante de 14-1 no circuito regional, dominando organizacoes como WOW e conquistando cinturao apos cinturao. Seu passaporte para o UFC veio no Contender Series em setembro de 2025, quando derrotou Mackson Lee por decisao unanime numa performance madura e controlada. Medalhista de bronze no IMMAF, Sosa tem base solida em todas as areas — mas nunca enfrentou ninguem no nivel de um faixa-preta veterano do UFC.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Teste do Octogono</h3>
        <p>Essa luta e um classico teste de novato. <strong class="text-blue-400">Sosa</strong> tem juventude, momentum e um recorde quase perfeito, mas seu nivel de competicao ate agora foi drasticamente inferior ao que vai encontrar. <strong class="text-ufc-red">Lacerda</strong>, por outro lado, sabe o que e perder no UFC, sabe o que e a pressao, e vem de uma vitoria revitalizante. No chao, a vantagem do brasileiro e enorme. A pergunta e: Sosa consegue manter a luta em pe?</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (1-2 no UFC)', fighter2: 'Sem ranking (estreia no UFC)' },
        { dimensao: 'Objetivo', fighter1: 'Sequencia de 2 vitorias, se estabelecer no UFC', fighter2: 'Vencer na estreia, provar que pertence' },
        { dimensao: 'Narrativa', fighter1: 'Veterano ressurgindo apos inicio ruim', fighter2: 'Debutante invicto testando o mais alto nivel' },
        { dimensao: 'Risco', fighter1: 'Derrota apaga o momentum da vitoria sobre Oliveira', fighter2: 'Derrota na estreia freia completamente o hype' },
        { dimensao: 'Recompensa', fighter1: '2 vitorias seguidas consolida posicao no roster', fighter2: 'Vitoria sobre veterano do UFC e declaracao de intencoes' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O FAIXA-PRETA PROVA SEU VALOR',
          subtitulo: 'Lacerda confirma a ressurreicao com mais uma finalizacao devastadora.',
          consequencias: [
            { tag: 'MOMENTUM', texto: '2 vitorias consecutivas pela primeira vez no UFC. A narrativa muda de "sobrevivente" para "contender em ascensao".' },
            { tag: 'ROSTER', texto: 'Se estabelece firmemente no roster dos galos. Pode receber oponente ranqueado na proxima.' },
            { tag: 'FINALIZACAO', texto: 'Se vencer por submissao, consolida reputacao como um dos grapplers mais perigosos da divisao.' },
          ],
          proxima_luta: 'Oponente ranqueado #12-15 dos galos',
        },
        fighter2_vence: {
          titulo: 'O GUERREIRO GUANCHE CONQUISTA O UFC',
          subtitulo: 'Sosa prova que o hype europeu e real com vitoria na estreia.',
          consequencias: [
            { tag: 'IMPACTO', texto: 'Vitoria sobre veterano do UFC na estreia e a melhor forma de comecar. Coloca Sosa no radar imediatamente.' },
            { tag: 'CONFIANCA', texto: 'Confirma que o nivel de competicao do Contender Series se traduz para o UFC. Momento psicologico enorme.' },
            { tag: 'FUTURO', texto: 'Com 14-1 aos 30 anos, ainda tem janela para crescer rapidamente na divisao.' },
          ],
          proxima_luta: 'Outro oponente sem ranking para construir recorde no UFC',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Luan Lacerda',
        color: 'red',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Saimon Oliveira', result: 'W', method: 'Sub R2 (chave de braco)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Finalizacao tecnica no segundo round. Oliveira perdeu peso por 8 libras. Lacerda dominou no chao com 3 takedowns e 6:06 de controle.' },
          { date: 'Jun 2023', opponent: "Da'Mon Blackshear", result: 'L', method: 'TKO R2 (socos)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Parou no segundo round por strikes. Blackshear encontrou o timing e conectou sequencia devastadora.' },
          { date: 'Jan 2023', opponent: 'Cody Stamann', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 3, quality_label: 'Bom', note: 'Perdeu a estreia no UFC por decisao. Stamann usou wrestling para neutralizar o jiu-jitsu de Lacerda.' },
          { date: 'Ago 2022', opponent: 'Renzo Lins', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao rapida no primeiro round antes de chegar ao UFC. Dominio total no chao.' },
        ],
        momentum_score: 6,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'resilient',
        momentum_note: 'Lacerda viveu o pior cenario possivel: duas derrotas consecutivas na estreia do UFC. Mas a vitoria sobre Saimon Oliveira em outubro de 2025 mostrou um lutador renovado, confiante e letal no chao. Com 10 finalizacoes em 13 vitorias e uma sequencia de 10 vitorias fora do UFC antes das duas derrotas iniciais, o brasileiro tem talento de sobra. A questao e se o nivel do UFC em pe e demais para ele.',
      },
      fighter2: {
        nome: 'Hecher Sosa',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Mackson Lee', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Venceu no Contender Series por decisao unanime. Performance controlada e madura que garantiu contrato com o UFC.' },
          { date: 'Jun 2025', opponent: 'Yaman Mjahed', result: 'W', method: 'TKO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Venceu pelo cinturao peso galo do WOW. Finalizou com strikes no segundo round mostrando poder crescente.' },
          { date: 'Set 2024', opponent: 'Douglas Felipe', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria solida por decisao no WOW. Controlou o ritmo por 3 rounds sem grandes problemas.' },
          { date: 'Mai 2024', opponent: 'Dayvison Silva', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao rapida no primeiro round. Mostrou versatilidade alem do striking.' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Sosa chega ao UFC com todo o momentum possivel: invicto em 14 lutas, cinturao regional, contrato do Contender Series e uma unica derrota na carreira amadora. O problema e o salto de qualidade. Todos os seus oponentes ate agora foram de nivel regional europeu (quality_score 1). O UFC e um mundo completamente diferente, e Lacerda, mesmo com suas derrotas, e o oponente mais perigoso que Sosa ja enfrentou.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Lacerda',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '1W-2L (33%) no UFC',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Sosa',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '14W-1L (93%) geral',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Lacerda e Sosa nunca enfrentaram oponentes em comum. O brasileiro tem experiencia no UFC contra oponentes de nivel medio (Stamann, Blackshear, Oliveira), enquanto Sosa lutou exclusivamente no circuito regional europeu. O salto de qualidade para Sosa e enorme e sera o verdadeiro teste desta luta.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 2.85, valueB: 3.50, maxVal: 6, format: 'decimal', note: 'Sosa tende a ser mais ativo no striking. Lacerda prefere buscar o clinch e o chao.' },
        { label: 'Precisao de Strikes (%)', valueA: 42, valueB: 48, maxVal: 100, format: 'percent', note: 'Sosa ligeiramente mais preciso, reflexo do background de IMMAF.' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.50, valueB: 2.80, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Lacerda absorve mais strikes, consequencia de buscar o clinch constantemente.' },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 55, maxVal: 100, format: 'percent', note: 'Ambos com defesa de strikes mediana. Nenhum e especialista defensivo em pe.' },
        { label: 'Takedowns por 15 Min', valueA: 3.20, valueB: 1.50, maxVal: 5, format: 'decimal', note: 'Lacerda com mais que o dobro de tentativas. O chao e sua zona de conforto.' },
        { label: 'Precisao de Takedown (%)', valueA: 50, valueB: 40, maxVal: 100, format: 'percent', note: 'Lacerda converte metade das tentativas. Fundamental para o gameplan.' },
        { label: 'Defesa de Takedown (%)', valueA: 55, valueB: 65, maxVal: 100, format: 'percent', note: 'Sosa com defesa de takedown razoavel, mas nunca testada no nivel UFC.' },
        { label: 'Submissoes por 15 Min', valueA: 1.80, valueB: 0.30, maxVal: 3, format: 'decimal', note: 'Lacerda e um cacador de finalizacoes. 10 submissoes em 13 vitorias. Diferenca absurda.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '33 anos', fighter2: '30 anos', note: 'Sosa 3 anos mais jovem' },
        { label: 'Altura', fighter1: '1.70m (5\'7")', fighter2: '1.72m (5\'8")', note: 'Praticamente a mesma altura' },
        { label: 'Envergadura', fighter1: '182cm (71.5")', fighter2: '178cm (70")', note: 'Lacerda com leve vantagem de envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Mesma base' },
        { label: 'Academia', fighter1: 'Rio de Janeiro, Brasil', fighter2: 'Lanzarote, Espanha', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Jiu-Jitsu / Grappling', valueA: 92, valueB: 55, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Lacerda e faixa-preta com 10 finalizacoes em 13 vitorias. Seu jiu-jitsu e de elite mundial. Sosa tem base no chao mas jamais enfrentou esse nivel de grappling.' },
        { label: 'Striking em Pe', valueA: 45, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Sosa e mais confortavel em pe, com base solida de IMMAF e striking limpo. Lacerda prefere nao trocar e buscar o clinch rapidamente.' },
        { label: 'Wrestling / Takedowns', valueA: 70, valueB: 50, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Lacerda precisa do takedown e trabalha ativamente para consegui-lo. 3.20 TD/15min. Sosa nunca foi testado defensivamente neste nivel.' },
        { label: 'Defesa / Durabilidade', valueA: 50, valueB: 55, labelA: 'Medio', labelB: 'Bom', advantage: 'even', advantage_note: 'Lacerda mostrou queixo questionavel na derrota para Blackshear. Sosa nunca foi realmente testado em durabilidade no nivel profissional alto.' },
        { label: 'Cardio / Resistencia', valueA: 65, valueB: 70, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Ambos parecem ter cardio razoavel para 3 rounds. Lacerda mostrou boa resistencia contra Oliveira. Sosa e jovem e ativo.' },
        { label: 'Experiencia / QI de Luta', valueA: 65, valueB: 40, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Lacerda tem 3 lutas no UFC e 16 profissionais. Sosa estreia no UFC e nunca enfrentou oponentes de alto nivel. A experiencia pode ser decisiva em momentos de adversidade.' },
      ],
      insight: 'O perfil de habilidades revela uma luta de contrastes claros. <strong class="text-ufc-red">Lacerda</strong> e vastamente superior no chao e tem experiencia no octogono. <strong class="text-blue-400">Sosa</strong> e melhor em pe e traz energia de debutante invicto. A luta se decide em ONDE acontece: se vai pro chao, Lacerda domina; se fica em pe, Sosa tem vantagem.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Lacerda',
        ko_tko: { count: 1, percent: 8 },
        submission: { count: 10, percent: 77 },
        decision: { count: 2, percent: 15 },
        total_wins: 13,
      },
      fighter2: {
        nome: 'Sosa',
        ko_tko: { count: 5, percent: 36 },
        submission: { count: 4, percent: 29 },
        decision: { count: 5, percent: 36 },
        total_wins: 14,
      },
      insight: 'O contraste e gritante. Lacerda e um finalizador puro: 77% das vitorias por submissao, o que o coloca entre os grapplers mais perigosos do peso galo. Sosa e equilibrado com distribuicao quase igual entre KO (36%), submissao (29%) e decisao (36%), mostrando versatilidade mas nenhuma arma dominante. Quando a luta vai pro chao, Lacerda e incomparavelmente mais perigoso.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round da Definicao',
          description: 'O primeiro round define a luta inteira. Se Lacerda conseguir o takedown cedo e estabelecer controle no chao, o grappling de elite entra em acao e Sosa pode nao saber como reagir. Se Sosa defender o takedown e manter distancia, pode acumular dano com striking mais limpo. Os primeiros 2 minutos sao cruciais para estabelecer onde a luta acontece.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'VANTAGEM LACERDA',
          color: 'red',
          title: 'A Armadilha do Chao',
          description: 'Se a luta chegou ao segundo round sem finalizacao, Lacerda provavelmente esta ajustando a estrategia de takedown. Com 1.80 submissoes por 15 minutos, cada segundo no chao e perigoso para Sosa. O debutante pode comecar a sentir a pressao psicologica de estar no UFC pela primeira vez, e erros de novato frequentemente aparecem nesse momento.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'VANTAGEM SOSA SE EM PE',
          color: 'green',
          title: 'Territorio de Decisao',
          description: 'Se a luta chega ao terceiro round em pe, Sosa tem vantagem. Seu cardio e juventude podem ser fatores, e acumular pontos com striking e mais natural para ele. Porem, se Lacerda conseguiu takedowns nos rounds anteriores, o brasileiro pode estar na frente nos cartoes e Sosa precisaria de algo especial.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Target', title: '10 finalizacoes em 13 vitorias (77%)', fighter: 'Lacerda', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Lacerda e um dos grapplers mais letais do peso galo. Sua taxa de finalizacao e extraordinaria e cada momento no chao e perigoso para o oponente. Bracos, costas, pescocos — tudo e alvo.' },
        { icon: 'AlertTriangle', title: 'Estreia no UFC contra veterano', fighter: 'Sosa', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Sosa nunca lutou no UFC. O salto de qualidade do circuito regional europeu (WOW) para o UFC e enorme. A pressao, o nivel dos oponentes e o ritmo sao completamente diferentes. Muitos prospectos invictos perdem na estreia.' },
        { icon: 'TrendingUp', title: 'Momentum de 14-1 e Contender Series', fighter: 'Sosa', risk_level: 'POSITIVO', risk_color: 'green', description: 'Sosa chega com confianca maxima: invicto no profissional, cinturao regional, contrato do Contender Series. A energia de um debutante invicto pode ser poderosa — ou pode virar pressao se as coisas nao comecarem bem.' },
        { icon: 'Brain', title: 'Experiencia em adversidade no UFC', fighter: 'Lacerda', risk_level: 'POSITIVO', risk_color: 'green', description: 'Lacerda ja perdeu duas vezes no UFC e voltou. Sabe o que e a pressao do octogono, sabe ajustar e sabe lidar com adversidade. Contra um estreante, essa experiencia psicologica pode ser decisiva.' },
        { icon: 'Shield', title: 'Queixo questionavel (derrota por TKO)', fighter: 'Lacerda', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'A derrota para Blackshear por TKO no segundo round mostrou vulnerabilidade no striking. Se Sosa conseguir manter a luta em pe e encontrar o timing, pode explorar essa fraqueza.' },
        { icon: 'Clock', title: 'Nivel de competicao drasticamente inferior', fighter: 'Sosa', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Todos os oponentes de Sosa foram de nivel regional (quality_score 1). Lacerda, mesmo com derrotas, enfrentou competidores muito superiores. O choque de realidade pode ser brutal.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Lacerda',
        total_probability: 58,
        scenarios: [
          { name: 'O Estrangulamento Inevitavel', probability: 28, method: 'Sub R1-R2', description: 'Lacerda consegue o takedown, estabelece controle com guarda ou montada, e busca a finalizacao. Com 10 submissoes na carreira, ele encontra a abertura — chave de braco, mata-leao, guilhotina. Sosa, inexperiente no chao contra esse nivel, nao consegue escapar.' },
          { name: 'Dominacao no Chao', probability: 18, method: 'Decisao Unanime', description: 'Lacerda consegue takedowns em todos os rounds e acumula tempo de controle e ground and pound. Sem finalizar, mas dominando completamente no chao e vencendo nos cartoes com pressao constante.' },
          { name: 'O Takedown Tardio', probability: 12, method: 'Sub R3', description: 'Lacerda perde os dois primeiros rounds em pe mas consegue um takedown no terceiro round contra um Sosa cansado e finaliza. Cenario menos provavel mas possivel dado o perigo constante no chao.' },
        ],
      },
      fighter2: {
        nome: 'Sosa',
        total_probability: 39,
        scenarios: [
          { name: 'O Striking do Guerreiro', probability: 18, method: 'Decisao Unanime', description: 'Sosa defende os takedowns e mantem a luta em pe. Usa o striking mais limpo e a energia de debutante para acumular pontos round a round. O cardio e a juventude fazem diferenca no terceiro round.' },
          { name: 'O Nocaute do Debutante', probability: 12, method: 'TKO R1-R2', description: 'Sosa encontra o timing contra um Lacerda previsivel na entrada de takedown e conecta um counter limpo. O queixo questionavel de Lacerda (derrota por TKO para Blackshear) cede e o arbitro para a luta.' },
          { name: 'Versatilidade Total', probability: 9, method: 'Decisao Dividida', description: 'Sosa mistura striking com defesa de takedown e mostra a versatilidade que o levou a 14-1. Uma luta apertada onde a energia e a agressividade do debutante convencem os juizes por margem minima.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Luan Lacerda',
      winner_side: 'fighter1',
      predicted_method: 'Submissao no R2 ou Decisao por controle',
      confidence_score: 6,
      confidence_label: 'MEDIA',
      explanation: 'A vantagem de grappling de Lacerda e a diferenca mais significativa desta luta. Com 10 finalizacoes em 13 vitorias e 1.80 submissoes por 15 minutos, cada segundo no chao e um pesadelo para Sosa. O espanhol nunca enfrentou ninguem perto desse nivel de jiu-jitsu. A defesa de takedown de Sosa nunca foi testada no UFC, e o salto de qualidade do circuito regional europeu e enorme. Porem, Sosa e invicto, jovem e com bom striking — se mantiver a luta em pe, pode surpreender.',
      x_factor: {
        title: 'A Taxa de Finalizacao de Lacerda',
        description: '77% das vitorias por submissao e uma taxa absurda. Lacerda nao apenas derruba — ele finaliza. Contra um oponente que nunca enfrentou esse nivel de grappling, cada momento no chao e potencialmente o fim da luta. Se Lacerda conseguir um unico takedown limpo, as chances de finalizacao sao altissimas.',
      },
      upset_alert: {
        title: 'Upset Alert: Sosa por TKO',
        description: 'Sosa tem striking mais limpo e Lacerda mostrou vulnerabilidade no striking (derrota por TKO para Blackshear). Se o espanhol defender os takedowns e encontrar o timing para counters, pode expor a fraqueza defensiva de Lacerda. Debutantes invictos frequentemente trazem uma energia imprevisivel.',
      },
      probabilities: {
        fighter1: { nome: 'Lacerda', percent: 58 },
        fighter2: { nome: 'Sosa', percent: 39 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Primeiro Takedown', icon: 'Target', description: 'Lacerda precisa do takedown para implementar seu jogo. Observe se ele consegue a queda nos primeiros 2 minutos. Se sim, a luta pode acabar ali. Se Sosa defender, o brasileiro vai precisar de um plano B que historicamente nao tem.' },
        { num: 2, title: 'A Reacao de Sosa ao Chao', icon: 'Shield', description: 'Se a luta for pro chao, observe como Sosa reage. Um novato no UFC contra um faixa-preta pode congelar ou entrar em panico. Se Sosa mostrar compostura e conseguir se levantar, e sinal de que a luta vai ser competitiva.' },
        { num: 3, title: 'O Clinch Contra a Grade', icon: 'Zap', description: 'Lacerda vai buscar o clinch contra a grade para facilitar o takedown. Observe se Sosa consegue criar espaco e se separar. A habilidade de wall-walking (se levantar contra a grade) sera crucial para o espanhol.' },
        { num: 4, title: 'A Confianca do Debutante', icon: 'Brain', description: 'Preste atencao na linguagem corporal de Sosa nos primeiros trocas. Se ele parecer confortavel e confiante, pode controlar o ritmo em pe. Se parecer hesitante ou com olhar assustado, Lacerda vai capitalizar imediatamente.' },
        { num: 5, title: 'Transicoes no Chao', icon: 'Activity', description: 'Se a luta for pro chao, observe as transicoes de Lacerda. Ele nao fica parado — busca posicoes melhores constantemente. De meia-guarda para montada, de montada para as costas. Cada transicao aumenta o perigo de finalizacao exponencialmente.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'LACERDA VS SOSA', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Galo (135 lbs)\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'LUAN LACERDA', content: '13-3-0 | Faixa-Preta BJJ\n\n77% das vitorias por submissao\n10 finalizacoes em 13 vitorias\n1.80 subs por 15 min\nRessurgindo apos inicio dificil no UFC', color: 'red' },
        { slide_number: 3, title: 'HECHER SOSA', content: '14-1-0 | Guanche Warrior\n\nEstreia no UFC via Contender Series\nCampeao do WOW\nMedalhista IMMAF\nInvicto no profissional', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Lacerda por Submissao ou Decisao\nConfianca: MEDIA\n\n58% Lacerda | 39% Sosa | 3% Empate\n\nSe for pro chao, acabou pra Sosa', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Lacerda vs Sosa no prelim do APEX sabado. O faixa-preta brasileiro com 77% de finalizacoes contra o debutante invicto das Ilhas Canarias. Chao vs striking, experiencia vs momentum.' },
        { num: '2/5', text: 'Luan Lacerda: 13-3, 10 finalizacoes. Comecou 0-2 no UFC mas finalizou Saimon Oliveira em outubro. 1.80 subs por 15 min. No chao, e um dos mais perigosos do peso galo.' },
        { num: '3/5', text: 'Hecher Sosa: 14-1-0, estreia no UFC. Veio do Contender Series em setembro. Campeao do WOW, medalhista IMMAF. Impressionante no papel, mas nunca enfrentou ninguem perto do nivel UFC.' },
        { num: '4/5', text: 'A chave: se Lacerda conseguir o takedown, provavelmente finaliza. 77% por sub nao e brincadeira. Se Sosa defender e manter em pe, o striking mais limpo pode dominar.' },
        { num: '5/5', text: 'Previsao: Lacerda por submissao no R2. 58% Lacerda, 39% Sosa. Mas CUIDADO: Sosa tem striking e Lacerda mostrou queixo questionavel contra Blackshear. Debutantes invictos sao perigosos.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O cara com 77% de vitorias por FINALIZACAO contra um debutante INVICTO. Lacerda vs Sosa, sabado no APEX. Um faixa-preta cacador de bracos contra um guerreiro que nunca perdeu."' },
        { time: '10-25s', title: 'Os Perfis', text: '"Lacerda: 13-3, 10 finalizacoes. Comecou 0-2 no UFC mas voltou finalizando Saimon Oliveira. 1.80 subs por 15 min. Sosa: 14-1, Contender Series, campeao regional. Impressionante, mas todo mundo que ele enfrentou era nivel regional."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Essa luta e simples: se vai pro CHAO, Lacerda domina. Se fica em PE, Sosa tem vantagem. O primeiro takedown pode decidir tudo. Sosa nunca defendeu takedown de um grappler desse nivel."' },
        { time: '40-55s', title: 'O X-Factor', text: '"10 finalizacoes em 13 vitorias. 77%. Isso nao e normal. Lacerda nao derruba pra controlar — ele derruba pra FINALIZAR. Cada segundo no chao contra ele e como nadar com um tubarao. Sosa vai descobrir isso da pior forma."' },
        { time: '55-60s', title: 'Previsao + CTA', text: '"Lacerda por submissao no segundo round. Comenta: jiu-jitsu ou striking? Segue pra mais analises antes do evento."' },
      ],
      tiktok: [
        { hook: 'O cara com 77% de FINALIZACOES contra um debutante que nunca perdeu.', body: 'Lacerda: 10 submissoes em 13 vitorias. Faixa-preta assassino. Sosa: 14-1, invicto, mas todos os oponentes de nivel regional. O salto de qualidade e ENORME. Se for pro chao, Sosa vai descobrir o que e jiu-jitsu de verdade.', cta: 'Quem vence? Comenta CHAO ou PE.' },
        { hook: 'NUNCA aposte contra um faixa-preta no chao. NUNCA.', body: 'Lacerda tem 1.80 submissoes por 15 minutos. Isso e ABSURDO. Cada takedown e uma armadilha mortal. Sosa nunca enfrentou esse nivel de grappling. A diferenca entre circuito regional e UFC e como comparar futebol amador com Champions League.', cta: 'Salva e assiste sabado. Vai fazer sentido.' },
        { hook: 'Debutante INVICTO no UFC. Parece otimo, ne? Mas olha os numeros.', body: 'Sosa 14-1 com oponentes de quality score 1 de 5. TODOS regionais. Lacerda, mesmo com derrotas no UFC, ja enfrentou competidores MUITO superiores. O choque de realidade vai ser brutal. 77% de finalizacoes contra alguem que nunca sentiu pressao de verdade.', cta: 'Segue pra nao perder mais analises assim.' },
      ],
      headlines: [
        'Lacerda vs Sosa: O Faixa-Preta Cacador Contra o Debutante Invicto',
        '77% de Finalizacoes: O Numero Que Define Luan Lacerda',
        'Hecher Sosa no UFC: O Maior Salto de Qualidade da Carreira',
        'Jiu-Jitsu vs Striking: O Duelo Classico nos Galos',
        'De 0-2 a Ressurreicao: A Historia de Lacerda no UFC',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-180',
        fighter2_odds: '+150',
        fighter1_name: 'Lacerda',
        fighter2_name: 'Sosa',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Taxa de Finalizacao Absurda', stat_headline: '77% DAS VITORIAS POR SUBMISSAO (10 DE 13)', contexto: 'Lacerda e um dos grapplers mais letais do peso galo. 1.80 submissoes por 15 minutos e uma taxa elite. Contra um oponente que nunca enfrentou esse nivel de jiu-jitsu, a vantagem no chao e esmagadora.', implicacao_aposta: 'Favorece apostas em Lacerda por submissao. Se as odds para "Lacerda por Sub" forem atrativas, pode ter valor significativo dado o historico e o nivel do oponente.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'Estreia no UFC', stat_headline: 'SOSA NUNCA LUTOU NO UFC — TODOS OS OPONENTES DE NIVEL REGIONAL', contexto: 'O salto de qualidade do circuito WOW (Espanha) para o UFC e enorme. Muitos lutadores invictos perdem na estreia quando enfrentam competicao real pela primeira vez. Sosa nunca foi testado neste nivel.', implicacao_aposta: 'Reduz o valor de apostar em Sosa como underdog. Invicto no papel pode ser enganoso quando o nivel de competicao e drasticamente inferior.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Vulnerabilidade no Striking de Lacerda', stat_headline: 'LACERDA PERDEU POR TKO PARA BLACKSHEAR NO R2', contexto: 'Lacerda mostrou queixo questionavel na derrota por TKO. Absorve 3.50 strikes por minuto com apenas 50% de defesa. Se Sosa manter a luta em pe, pode explorar essa fraqueza.', implicacao_aposta: 'Cria algum valor em Sosa por KO/TKO se as odds forem altas. O risco e que Lacerda dificilmente vai querer trocar — vai buscar o chao imediatamente.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Background IMMAF de Sosa', stat_headline: 'MEDALHISTA DE BRONZE NO MUNDIAL IMMAF 2018', contexto: 'Sosa tem base atletica solida com experiencia em competicoes internacionais de MMA amador. Medalhista no IMMAF e campeao africano mostram versatilidade e capacidade competitiva em ambientes de pressao.', implicacao_aposta: 'Ameniza parcialmente o risco da estreia. Sosa nao e um novato completo — tem experiencia em competicoes internacionais, o que pode ajudar com a pressao do UFC.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Lacerda Vem de Vitoria Dominante', stat_headline: '3 TAKEDOWNS, 6:06 DE CONTROLE, FINALIZACAO NO R2 VS OLIVEIRA', contexto: 'A vitoria sobre Saimon Oliveira em outubro foi dominante. Lacerda mostrou que quando implementa o jogo de chao, e devastador. O timing e a confianca estao em alta.', implicacao_aposta: 'Reforça Lacerda como favorito. A performance contra Oliveira mostrou o melhor do brasileiro e confirma que o estilo funciona no UFC quando executado corretamente.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Lacerda por Submissao', odds: '+120 (estimado)', confianca: 'media', edge_vs_mercado: 'Com 77% de finalizacoes e 1.80 subs/15min contra debutante sem experiencia no chao nesse nivel, a finalizacao e o cenario mais provavel.', raciocinio: 'Lacerda finaliza. E o que ele faz. 10 submissoes em 13 vitorias nao mentem. Contra um estreante que nunca enfrentou grappling de elite, a probabilidade de finalizacao e muito alta.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-110 (estimado)', confianca: 'media', raciocinio: 'Lacerda nao costuma deixar lutas irem a decisao quando consegue o chao. Se o takedown acontece, a finalizacao vem rapido. Apenas 15% das vitorias de Lacerda foram por decisao.' },
        { tipo: 'Moneyline', pick: 'Lacerda ML', odds: '-180 (estimado)', confianca: 'media', edge_vs_mercado: 'O preco e justo mas as vantagens no chao sao claras. O salto de qualidade de Sosa e o fator mais relevante.', raciocinio: 'Lacerda tem vantagem significativa no aspecto mais importante da luta (grappling) contra um oponente que nunca foi testado nesse nivel. A experiencia no UFC completa o pacote.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Sosa por Decisao',
        descricao: 'Apostar em Sosa ganhando por decisao requer que ele defenda TODOS os takedowns por 3 rounds contra um faixa-preta que vive de derrubar e finalizar. E possivel? Sim. Provavel? Nao. Lacerda vai buscar o chao incessantemente e a defesa de takedown de Sosa nunca foi testada contra alguem desse calibre.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
