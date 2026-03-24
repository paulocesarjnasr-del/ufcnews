import type { FullSingleAnalise } from '@/types/analise';

export const petrinoAsplundAnalise: FullSingleAnalise = {
  id: 'petrino-asplund-ufn-mar-14',
  evento_id: null,
  slug: 'petrino-asplund-ufn-mar-14',
  titulo: 'Petrino vs Asplund: Bombardeiros dos Pesados',
  subtitulo: 'O brasileiro que subiu de divisao contra o fenomeno americano que perdeu 120 quilos',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'KO/TKO', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Vitor Petrino', record: '13-2-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Steven Asplund', record: '7-1-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night',
  evento_data: '2026-03-14',
  evento_local: 'UFC APEX, Las Vegas',
  categoria_peso: 'Peso Pesado',
  num_rounds: 3,
  is_titulo: false,
  broadcast: null,
  status: 'published',
  analysis_type: 'full_single',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  full_analysis: {
    hero: {
      evento_nome: 'UFC Fight Night',
      evento_data: '14 de Marco, 2026',
      evento_local: 'UFC APEX, Las Vegas',
      categoria_peso: 'Peso Pesado (265 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'DOIS NOCAUTEADORES, UM OCTOGONO',
      tagline_sub: 'O brasileiro ranqueado contra o prospect que quebrou recordes na estreia.',
      fighter1: {
        nome_completo: 'Vitor Petrino',
        apelido: '',
        sobrenome: 'Petrino',
        record: '13-2-0',
        ranking: '#15 HW',
        info_extra: 'Santa Luzia, Brasil | 28 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Steven "Concrete" Asplund',
        apelido: 'Concrete',
        sobrenome: 'Asplund',
        record: '7-1-0',
        ranking: 'Sem ranking',
        info_extra: 'Minneapolis, Minnesota | 27 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Brasileiro Que Reinventou a Carreira</h3>
        <p><strong class="text-ufc-red">Vitor Petrino</strong> e a prova de que adaptacao e tudo no MMA. Depois de comecar no UFC com quatro vitorias consecutivas nos meio-pesados, ele caiu de forma brutal: derrota por submissao para Anthony Smith e nocaute para Dustin Jacoby. O que muitos fariam? Tentariam se recuperar na mesma divisao. Petrino fez diferente: subiu para o peso pesado. E a mudanca foi transformadora. Duas vitorias, incluindo uma submissao no R1 e um nocaute no R3, e agora esta no #15 do ranking dos pesados. Com apenas 28 anos, ele tem tempo de sobra para crescer na divisao.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Transformacao Mais Insana do MMA</h3>
        <p><strong class="text-blue-400">Steven Asplund</strong> tem a historia mais improvavel do UFC. Ele pesava mais de 227 quilos (500 lbs). Quinhentas libras. Ele perdeu 120 quilos e se transformou em um lutador profissional de MMA. Na sua estreia no UFC, ele quebrou o recorde de strikes significativos numa luta de pesados, acertando 170 golpes significativos em menos de 9 minutos. Nocauteou Sean Sharaf no segundo round com uma exibicao de volume absurdo. O apelido "Concrete" faz sentido: os punhos dele sao de concreto.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">O Teste Real</h3>
        <p>Essa e uma luta que vai definir trajetorias. <strong class="text-ufc-red">Petrino</strong> precisa de uma vitoria para continuar subindo no ranking e se aproximar do top 10. <strong class="text-blue-400">Asplund</strong> precisa provar que a estreia historica nao foi fluke e que ele pode competir contra lutadores do nivel do UFC. Ambos sao finalizadores. Ambos gostam de trocar. Alguem vai dormir.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#15 Peso Pesado', fighter2: 'Sem ranking (em ascensao)' },
        { dimensao: 'Objetivo', fighter1: 'Manter ranking e subir pro top 10', fighter2: 'Entrar no ranking com vitoria sobre ranqueado' },
        { dimensao: 'Narrativa', fighter1: 'Reinvencao nos pesados funcionando', fighter2: 'A historia de transformacao mais insana do UFC' },
        { dimensao: 'Risco', fighter1: 'Perder ranking contra oponente de reposicao', fighter2: 'Ser exposto como one-hit wonder' },
        { dimensao: 'Recompensa', fighter1: 'Consolida posicao no top 15 e abre portas', fighter2: 'Entrada meterica no ranking dos pesados' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'PETRINO CONTINUA A ASCENSAO NOS PESADOS',
          subtitulo: 'O brasileiro prova que a mudanca de divisao foi a melhor decisao da carreira.',
          consequencias: [
            { tag: 'RANKING', texto: 'Petrino sobe para o top 12 dos pesados, consolidando-se como contender legitimo.' },
            { tag: 'FUTURO', texto: 'Abre portas para lutas contra top 10 como Curtis Blaydes ou Sergei Pavlovich.' },
            { tag: 'LEGADO', texto: 'Tres vitorias seguidas nos pesados confirma que a mudanca de divisao foi permanente e bem-sucedida.' },
          ],
          proxima_luta: 'Oponente do top 10 dos pesados',
        },
        fighter2_vence: {
          titulo: 'CONCRETE DERRUBA O RANQUEADO',
          subtitulo: 'Asplund prova que a estreia historica foi so o comeco.',
          consequencias: [
            { tag: 'RANKING', texto: 'Asplund entra diretamente no top 15 dos pesados com apenas 2 lutas no UFC.' },
            { tag: 'HYPE', texto: 'A historia de perda de peso + nocaute contra ranqueado se torna uma das maiores narrativas do ano.' },
            { tag: 'FUTURO', texto: 'Matchmakers comecam a testa-lo contra nomes maiores rapidamente.' },
          ],
          proxima_luta: 'Oponente do top 12 dos pesados para confirmar o nivel',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Vitor Petrino',
        color: 'red',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Thomas Petersen', result: 'W', method: 'KO R3 (0:26)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocaute devastador no terceiro round. Performance of the Night. Mostrou paciencia e poder tardio.' },
          { date: 'Jul 2025', opponent: 'Austen Lane', result: 'W', method: 'Sub R1 (4:16)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia nos pesados com submissao por mata-leao no primeiro round. Transicao suave de divisao.' },
          { date: 'Dez 2024', opponent: 'Dustin Jacoby', result: 'L', method: 'KO R3 (3:44)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Nocauteado no terceiro round. Exposicao de queixo questionavel nos meio-pesados.' },
          { date: 'Mai 2024', opponent: 'Anthony Smith', result: 'L', method: 'Sub R1', opponent_rank: '#8 LHW', quality_score: 4, quality_label: 'Muito Bom', note: 'Finalizado rapidamente por guilhotina. Smith explorou o grappling defensivo fraco.' },
          { date: 'Mar 2024', opponent: 'Tyson Pedro', result: 'W', method: 'Decisao Unanime', opponent_rank: '#10 LHW', quality_score: 3, quality_label: 'Bom', note: 'Vitoria solida por decisao contra lutador ranqueado. Mostrou habilidade por 3 rounds.' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Petrino esta em alta desde que subiu para o peso pesado. Duas vitorias consecutivas com finalizacoes impressionantes mostram que o corpo maior funciona a seu favor. A submissao no R1 contra Lane e o KO no R3 contra Petersen demonstram versatilidade. As duas derrotas nos meio-pesados parecem distantes agora, mas o fantasma do queixo questionavel persiste.',
      },
      fighter2: {
        nome: 'Steven Asplund',
        color: 'blue',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Sean Sharaf', result: 'W', method: 'TKO R2 (3:49)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia historica no UFC. Recorde de 170 strikes significativos em luta de pesados. Volume absurdo.' },
          { date: 'Set 2025', opponent: 'Oponente DWCS', result: 'W', method: 'KO R1 (0:16)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute em 16 segundos no Contender Series. Poder devastador.' },
          { date: 'Jun 2025', opponent: 'Oponente LFA', result: 'W', method: 'KO R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Nocaute no primeiro round no circuito regional.' },
          { date: 'Mar 2025', opponent: 'Oponente LFA', result: 'W', method: 'KO R2', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Mais uma vitoria por nocaute no LFA. Sequencia de finalizacoes.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Asplund esta em uma trajetoria vertical. Quatro vitorias consecutivas por finalizacao em 2025, culminando com uma estreia historica no UFC. O volume de 170 strikes significativos em uma luta de pesados e um recorde. Mas o calibre dos oponentes ate agora foi baixo: ninguem que ele enfrentou estava nem perto do top 15. Petrino e o primeiro teste real.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Petrino',
        media_oponentes: 2.4,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-2L (60%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Asplund',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '1W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Petrino e Asplund nunca enfrentaram oponentes em comum. Petrino tem 8 lutas no UFC incluindo combates contra Anthony Smith (#8 LHW) e Tyson Pedro (#10 LHW), enquanto Asplund fez apenas 1 luta no UFC contra oponente sem ranking. A diferenca de nivel de competicao enfrentada e significativa.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 2.75, valueB: 19.93, maxVal: 22, format: 'decimal', note: 'Numero de Asplund e inflado por amostragem pequena (1 luta UFC). Nao confie cegamente.' },
        { label: 'Precisao de Strikes (%)', valueA: 46, valueB: 59, maxVal: 100, format: 'percent', note: 'Asplund com precisao alta, mas amostragem minima.' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.48, valueB: 7.49, maxVal: 10, format: 'decimal', reverseWinner: true, note: 'Petrino absorve muito menos. Asplund troca mais mas tambem recebe mais.' },
        { label: 'Defesa de Strikes (%)', valueA: 48, valueB: 58, maxVal: 100, format: 'percent', note: 'Ambos com defesa mediocre para pesados. Vai ter fogo cruzado.' },
        { label: 'Takedowns por 15 Min', valueA: 1.70, valueB: 0.00, maxVal: 4, format: 'decimal', note: 'Petrino usa takedowns. Asplund nunca tentou no UFC.' },
        { label: 'Precisao de Takedown (%)', valueA: 51, valueB: 0, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 79, valueB: 100, maxVal: 100, format: 'percent', note: 'Amostragem minima para Asplund. Petrino com boa defesa confirmada.' },
        { label: 'Submissoes por 15 Min', valueA: 0.84, valueB: 0.00, maxVal: 2, format: 'decimal', note: 'Petrino tem submissoes no arsenal. Asplund e puro striker.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '28 anos', fighter2: '27 anos', note: 'Idades similares, ambos no prime' },
        { label: 'Altura', fighter1: '1.88m (6\'2")', fighter2: '1.96m (6\'5")', note: 'Asplund com 3 polegadas de vantagem' },
        { label: 'Envergadura', fighter1: '197cm (77.5")', fighter2: '198cm (78")', note: 'Praticamente identicas' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: null },
        { label: 'Academia', fighter1: 'CM System, Brasil', fighter2: 'Minnesota Top Team', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 82, valueB: 85, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'even', advantage_note: 'Ambos tem poder de nocaute elite para pesados. Petrino com 8 KOs em 13 vitorias, Asplund com 6 KOs em 7 vitorias. Qualquer um pode encerrar a luta com um golpe.' },
        { label: 'Striking Tecnico', valueA: 65, valueB: 70, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Asplund tem background de kickboxing e mostrou volume tecnico impressionante. Petrino e mais instintivo, menos tecnico.' },
        { label: 'Grappling / Submissoes', valueA: 72, valueB: 35, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Petrino tem 2 submissoes e usa takedowns (51% precisao). Asplund nunca tentou takedown e nao tem submissoes. Vantagem clara no chao.' },
        { label: 'Versatilidade', valueA: 75, valueB: 50, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Petrino vence por KO, sub e decisao. Asplund so vence por nocaute (e 1 decisao). Petrino tem mais armas e mais formas de vencer.' },
        { label: 'Cardio / Ritmo', valueA: 60, valueB: 60, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Petrino nocauteou Petersen no R3, mostrando poder tardio. Asplund nunca foi alem do R2 no UFC. Cardio desconhecido para ambos em lutas longas.' },
        { label: 'Experiencia UFC', valueA: 80, valueB: 40, labelA: 'Muito Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: '8 lutas no UFC incluindo oponentes ranqueados (Smith, Pedro). Asplund tem apenas 1 luta no UFC contra oponente sem ranking. A diferenca de experiencia e enorme.' },
      ],
      insight: 'Essa luta e sobre <strong class="text-ufc-red">Petrino</strong> usar sua versatilidade e experiencia contra o <strong class="text-blue-400">Asplund</strong> mais atletico e com mais volume. Se ficar em pe, Asplund tem o volume para sobrecarregar. Se Petrino levar pro chao, Asplund esta em territorio completamente desconhecido. A chave e se Petrino vai ser inteligente o suficiente para explorar a fraqueza de grappling de Asplund.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Petrino',
        ko_tko: { count: 8, percent: 62 },
        submission: { count: 2, percent: 15 },
        decision: { count: 3, percent: 23 },
        total_wins: 13,
      },
      fighter2: {
        nome: 'Asplund',
        ko_tko: { count: 6, percent: 86 },
        submission: { count: 0, percent: 0 },
        decision: { count: 1, percent: 14 },
        total_wins: 7,
      },
      insight: 'Dois nocauteadores, mas com perfis diferentes. Petrino e mais diversificado: 62% KO, 15% submissao, 23% decisao. Asplund e unidimensional no sentido positivo: 86% de nocaute. A diferenca e que Petrino tem o plano B (takedown e submissao) se o striking nao funcionar. Asplund nao tem. Se o nocaute nao vem, o que Asplund faz?',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM ASPLUND',
          color: 'red',
          title: 'A Zona de Bombardeio',
          description: 'O primeiro round e onde Asplund e mais perigoso. Ele tem 6 nocautes, a maioria nos primeiros minutos. O volume absurdo (19.93 strikes/min na estreia) vai sobrecarregar Petrino se ele nao for cuidadoso. Petrino precisa sobreviver a tempestade inicial e nao se envolver em trocacao pura.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Decisivo',
          description: 'O segundo round e o termometro. Se Petrino sobreviveu o R1 e comecou a usar takedowns, ele esta no caminho certo. Se Asplund manteve o volume e Petrino esta machucado, a finalizacao pode vir aqui. Esse round define quem controla a dinamica da luta.',
        },
        {
          rounds: 'R3',
          danger_level: 7,
          danger_label: 'VANTAGEM PETRINO',
          color: 'green',
          title: 'O Territorio Brasileiro',
          description: 'Petrino nocauteou Petersen com 26 segundos do terceiro round, mostrando poder tardio. Asplund nunca foi alem do R2 no UFC. Se a luta chegar ao R3, Petrino tem experiencia e Asplund esta em territorio completamente desconhecido. A versatilidade do brasileiro deve brilhar aqui.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: 'Mudanca de divisao bem-sucedida', fighter: 'Petrino', risk_level: 'POSITIVO', risk_color: 'green', description: 'Petrino esta 2-0 desde que subiu para os pesados. A mudanca revitalizou sua carreira: ele nao precisa mais cortar peso drasticamente e pode lutar mais naturalmente. Lutadores que sobem de divisao com sucesso frequentemente florescem.' },
        { icon: 'Zap', title: 'Volume de strikes recorde', fighter: 'Asplund', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: '170 strikes significativos em uma luta de pesados e RECORDE do UFC. Mais que o recorde anterior de Arlovski (152). Asplund traz um nivel de output que e quase inedito para a divisao dos pesados.' },
        { icon: 'AlertTriangle', title: 'Queixo questionavel', fighter: 'Petrino', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Petrino foi nocauteado por Dustin Jacoby no R3 dos meio-pesados. Isso levanta questoes sobre sua durabilidade. Nos pesados, os golpes sao mais fortes. Se Asplund acertar limpo, o queixo pode falhar.' },
        { icon: 'Brain', title: 'Oponente de reposicao', fighter: 'Asplund', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Asplund entrou como oponente de reposicao apos Kennedy Nzechukwu desistir. Lutadores de reposicao as vezes nao tem a preparacao ideal, mas tambem podem entrar sem pressao.' },
        { icon: 'Shield', title: 'Grappling como arma secreta', fighter: 'Petrino', risk_level: 'POSITIVO', risk_color: 'green', description: 'Petrino tem 51% de precisao de takedown e 2 submissoes. Asplund tem ZERO takedowns e ZERO submissoes. Se Petrino levar pro chao, Asplund nao tem ferramentas para se defender ou escapar.' },
        { icon: 'Activity', title: 'Absorve muitos golpes', fighter: 'Asplund', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: '7.49 strikes absorvidos por minuto e muito, mesmo para pesados. Asplund troca golpes sem se preocupar com defesa. Contra Petrino, que tem poder (8 KOs), essa abordagem pode ser fatal.' },
        { icon: 'Target', title: 'Vantagem de altura e alcance', fighter: 'Asplund', risk_level: 'POSITIVO', risk_color: 'green', description: 'Asplund e 3 polegadas mais alto que Petrino (6\'5" vs 6\'2"). No peso pesado, a diferenca de tamanho pode ser significativa para manter distancia e usar o jab.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Petrino',
        total_probability: 55,
        scenarios: [
          { name: 'O Takedown Estrategico', probability: 22, method: 'Sub R2-R3 ou Decisao', description: 'Petrino sobrevive o volume inicial de Asplund e usa takedowns para levar a luta pro chao. Asplund nao tem defesa de takedown testada e zero submissoes defensivas. Petrino pode dominar no chao e buscar submissao ou acumular dano suficiente para o TKO.' },
          { name: 'O Counter Power Shot', probability: 18, method: 'KO R1-R2', description: 'Asplund vem com volume agressivo e Petrino encontra o counter perfeito. Com 8 KOs na carreira e poder nos pesados, um unico golpe limpo pode acabar a luta. Asplund absorve 7.49 strikes/min e nao e defensivamente cuidadoso.' },
          { name: 'A Guerra de Atricao', probability: 15, method: 'TKO R3', description: 'Petrino sobrevive dois rounds de trocacao intensa, acumula dano em Asplund com golpes de poder e no terceiro round, com Asplund mais lento, finaliza com uma sequencia de golpes contra a grade. Exatamente o que fez contra Petersen.' },
        ],
      },
      fighter2: {
        nome: 'Asplund',
        total_probability: 42,
        scenarios: [
          { name: 'O Tsunami de Volume', probability: 20, method: 'TKO R1-R2', description: 'Asplund faz o que fez contra Sharaf: bombardeia Petrino com volume absurdo de strikes. 19.93 golpes por minuto nao deixam espaco para pensar. Petrino, que foi nocauteado por Jacoby, pode nao aguentar a pressao.' },
          { name: 'O Nocaute Explosivo', probability: 14, method: 'KO R1', description: 'Asplund encontra o golpe perfeito no primeiro round. Com 6 KOs em 7 vitorias e poder natural de peso pesado, um unico soco limpo pode encerrar tudo. Petrino tem queixo questionavel e Asplund tem poder de concreto.' },
          { name: 'Dominacao por Output', probability: 8, method: 'Decisao Unanime', description: 'Asplund mantem o volume alto por 3 rounds, outstriking Petrino significativamente em todos os rounds. A quantidade de golpes acertados e suficiente para dominar nos cartoes mesmo sem a finalizacao.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Vitor Petrino',
      winner_side: 'fighter1',
      predicted_method: 'TKO ou Submissao no R2-R3',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'Essa e uma luta muito equilibrada entre dois nocauteadores com estilos contrastantes. Petrino e o favorito por causa da experiencia no UFC (8 lutas vs 1), versatilidade (KO + sub + decisao vs apenas KO), e a arma do grappling que Asplund simplesmente nao tem resposta. No entanto, a confianca e MEDIA porque o queixo de Petrino e questionavel e Asplund tem um volume de strikes que pode sobrecarregar qualquer um. Se Petrino for inteligente e usar takedowns, ele vence. Se entrar em guerra de trocacao pura, Asplund pode surpreender.',
      x_factor: {
        title: 'O Grappling de Petrino vs A Falta de Chao de Asplund',
        description: 'Petrino tem 51% de precisao de takedown e 2 submissoes na carreira. Asplund tem ZERO takedowns e ZERO submissoes. Se Petrino decidir levar a luta pro chao, Asplund esta completamente desarmado. Essa e a maior assimetria da luta e pode ser o fator decisivo.',
      },
      upset_alert: {
        title: 'Upset Alert: Asplund por TKO no R1',
        description: 'Se Asplund repetir o que fez na estreia, bombardeando com volume absurdo desde o primeiro segundo, o queixo questionavel de Petrino pode falhar. Petrino foi nocauteado por Jacoby nos meio-pesados, e nos pesados os golpes sao mais fortes. Se Asplund acertar limpo nos primeiros 2 minutos, pode ser uma noite curta.',
      },
      probabilities: {
        fighter1: { nome: 'Petrino', percent: 55 },
        fighter2: { nome: 'Asplund', percent: 42 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Petrino -225', reasoning: 'Experiencia, versatilidade e grappling fazem dele o favorito logico. Mas nao e um lock.' },
        method: { pick: 'Petrino por KO/TKO ou Sub', reasoning: 'Com 8 KOs e 2 subs, Petrino tem multiplas vias de finalizacao. Asplund nao tem resposta para o chao.' },
        over_under: { pick: 'Under 2.5 rounds', rounds: 2.5, reasoning: 'Dois nocauteadores no peso pesado. 86% das vitorias de Asplund e 62% das de Petrino por KO. Alta chance de finalizacao.' },
        best_value: 'Petrino por Finalizacao (KO/TKO ou Sub) em qualquer round',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Volume Inicial de Asplund', icon: 'Zap', description: 'Asplund acertou 170 strikes significativos na estreia. Observe se ele entra com a mesma intensidade. Se Petrino nao conseguir diminuir o ritmo nos primeiros 2 minutos, pode ser engolido pelo volume. A chave e se Petrino busca o clinch ou takedown para quebrar o ritmo.' },
        { num: 2, title: 'Takedowns de Petrino', icon: 'Target', description: 'Petrino tem 51% de precisao de takedown. Asplund nunca foi testado no chao no UFC. Se Petrino usar takedowns desde o primeiro round, a dinamica muda completamente. Observe quantas vezes Petrino tenta derrubar e se Asplund consegue se manter em pe.' },
        { num: 3, title: 'O Queixo de Petrino', icon: 'AlertTriangle', description: 'Petrino foi nocauteado por Jacoby nos meio-pesados. Nos pesados, os golpes sao mais fortes. Observe se Petrino absorve golpes limpos de Asplund sem ser abalado. Se ele comeca a balançar, a luta pode acabar rapido.' },
        { num: 4, title: 'Defesa de Asplund', icon: 'Shield', description: 'Asplund absorve 7.49 strikes por minuto e tem abordagem de "trocar na cara dura". Contra Petrino, que tem poder (8 KOs), essa falta de defesa pode ser fatal. Observe se Asplund muda a abordagem ou continua trocando sem cuidado.' },
        { num: 5, title: 'Cardio no Terceiro Round', icon: 'Activity', description: 'Asplund nunca lutou 3 rounds completos no UFC. Petrino nocauteou no R3 na ultima luta. Se a luta chegar ao terceiro round, observe quem tem mais gas. O cardio pode ser o fator decisivo nessa luta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'PETRINO VS ASPLUND', content: 'UFC Fight Night\n14 de Marco, 2026\nUFC APEX, Las Vegas\n\nPeso Pesado | 3 Rounds', color: 'red' },
        { slide_number: 2, title: 'VITOR PETRINO', content: '13-2-0 | #15 HW\n\n8 KOs | 2 Subs | 3 Decisoes\n2-0 nos pesados\n51% precisao de takedown\n28 anos | CM System', color: 'red' },
        { slide_number: 3, title: 'STEVEN ASPLUND', content: '7-1-0 | Prospect\n\n86% taxa de nocaute\n170 sig strikes na estreia (recorde!)\nPerdeu 120kg antes do MMA\n27 anos | Minnesota Top Team', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Petrino por TKO/Sub R2-R3\nConfianca: MEDIA\n\n55% Petrino | 42% Asplund | 3% Empate\n\nVersatilidade vs Volume Bruto', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Petrino vs Asplund sabado. O #15 dos pesados contra o cara que QUEBROU O RECORDE de strikes na estreia. 170 golpes significativos em uma luta de pesados. Esse cara e de outro planeta em termos de output.' },
        { num: '2/5', text: 'A historia de Asplund e INSANA: ele pesava 227 QUILOS. Perdeu 120kg e se tornou lutador profissional do UFC. Na estreia, quebrou recorde de strikes nos pesados. Essa trajetoria nao e normal.' },
        { num: '3/5', text: 'Mas Petrino tem algo que Asplund nao tem: GRAPPLING. 51% de takedown, 2 submissoes. Asplund: ZERO takedowns, ZERO subs. Se Petrino levar pro chao, Asplund ta completamente perdido.' },
        { num: '4/5', text: 'Red flag pra Petrino: nocauteado por Jacoby nos meio-pesados. Nos pesados os golpes sao MAIS fortes. Contra o volume de Asplund, o queixo questionavel pode ser um problema serio.' },
        { num: '5/5', text: 'Pick: Petrino por TKO ou sub no R2-R3. Experiencia e versatilidade devem pesar, mas confianca e MEDIA. Asplund pode surpreender se entrar com volume maximo. Luta 55-42. Quem leva?' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"Um cara que pesava 227 quilos perdeu 120 kilos, virou lutador do UFC, e na estreia QUEBROU O RECORDE de strikes significativos nos pesados. Agora enfrenta o #15 do ranking. Petrino vs Asplund, sabado."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Asplund: 170 strikes significativos na estreia, mais que ARLOVSKI em toda a carreira. 86% de nocaute. Petrino: 8 KOs, 2 submissoes, 51% de takedown, 8 lutas no UFC. Versatilidade contra volume bruto."' },
        { time: '25-40s', title: 'A Chave', text: '"A chave e simples: se fica em pe, Asplund tem o volume pra sobrecarregar. Se vai pro chao, Asplund ta completamente perdido. Petrino tem grappling, Asplund tem ZERO takedowns e ZERO submissoes. A luta se decide pela tatica."' },
        { time: '40-50s', title: 'Red Flags', text: '"Petrino foi nocauteado nos meio-pesados. Asplund absorve 7.49 strikes por minuto sem se preocupar com defesa. Os dois tem fraquezas claras. E no peso pesado, um soco muda tudo."' },
        { time: '50-60s', title: 'CTA', text: '"Pick: Petrino por TKO ou sub no R2-R3. Experiencia pesa. Mas se Asplund entrar com volume maximo, cuidado. Comenta quem voce acha que leva."' },
      ],
      tiktok: [
        { hook: 'Ele pesava 227 QUILOS e agora QUEBRA RECORDES no UFC.', body: 'Steven Asplund perdeu 120kg, virou lutador do UFC, e na estreia acertou 170 golpes significativos. Recorde historico nos pesados. Agora enfrenta o #15 do ranking Vitor Petrino. Dois nocauteadores. Um octogono.', cta: 'Quem dorme? Comenta PETRINO ou ASPLUND.' },
        { hook: 'A arma SECRETA que pode decidir essa luta de pesados.', body: 'Petrino tem 51% de takedown e 2 submissoes. Asplund tem ZERO takedowns e ZERO submissoes. Se Petrino levar pro chao, acabou. Asplund simplesmente nao tem ferramentas. Mas se ficar em pe, 170 strikes significativos discordam.', cta: 'Salva e volta sabado pra ver se acertei.' },
        { hook: 'A RED FLAG que NINGUEM ta falando sobre Petrino.', body: 'Petrino foi NOCAUTEADO por Dustin Jacoby nos meio-pesados. Agora luta nos PESADOS onde os golpes sao MAIS fortes. Contra Asplund, que troca sem parar, o queixo questionavel e uma bomba-relogio. Um golpe limpo e acabou.', cta: 'Segue pra mais analises que voce so encontra aqui.' },
      ],
      headlines: [
        'Petrino vs Asplund: Dois Nocauteadores, Um Resultado Explosivo',
        'De 227kg ao UFC: Asplund Pode Derrubar o #15 dos Pesados?',
        'O Grappling de Petrino Sera a Kryptonita de Asplund?',
        'Recorde de Strikes vs Experiencia no UFC: A Analise Completa',
        'Peso Pesado Sem Filtro: Petrino vs Asplund Promete Nocaute',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-225',
        fighter2_odds: '+185',
        fighter1_name: 'Petrino',
        fighter2_name: 'Asplund',
        source: 'Media de DraftKings, FanDuel e BetMGM (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Grappling Unilateral', stat_headline: '51% TAKEDOWN ACCURACY PARA PETRINO VS 0% PARA ASPLUND', contexto: 'A assimetria mais gritante dessa luta. Petrino tem takedowns e submissoes no arsenal. Asplund nao tem nenhum dos dois. Se a luta for pro chao, Petrino domina completamente.', implicacao_aposta: 'Apostas em Petrino por submissao podem ter valor excelente. O mercado pode subestimar a via de finalizacao no chao.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Volume Historico de Asplund', stat_headline: '170 STRIKES SIGNIFICATIVOS NA ESTREIA (RECORDE HW)', contexto: 'Asplund quebrou o recorde de Arlovski na estreia. Esse nivel de output e quase inedito nos pesados. Se ele mantiver esse volume, pode sobrecarregar qualquer oponente.', implicacao_aposta: 'Favorece "luta nao vai para decisao". O volume de Asplund cria oportunidades de finalizacao mas tambem abre espaco para ser acertado.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'AlertTriangle', titulo: 'Queixo Questionavel de Petrino', stat_headline: 'NOCAUTEADO POR JACOBY NOS MEIO-PESADOS (DEZ 2024)', contexto: 'Petrino foi parado por strikes por Jacoby, que nao e conhecido como power puncher. Nos pesados, os golpes sao significativamente mais fortes. Contra o volume de Asplund, a durabilidade e uma preocupacao real.', implicacao_aposta: 'Reduz confianca em Petrino por decisao. Se apostar em Petrino, prefira finalizacao rapida a decisao.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Absorve Demais', stat_headline: '7.49 STRIKES ABSORVIDOS POR MINUTO PARA ASPLUND', contexto: 'Asplund troca golpes sem se preocupar com defesa. Contra um nocauteador como Petrino (8 KOs), absorver 7+ golpes por minuto e jogar roleta russa.', implicacao_aposta: 'Favorece finalizacao rapida. Ambos sao vulneraveis. "Under 1.5 rounds" pode ter value.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Experiencia no UFC', stat_headline: '8 LUTAS NO UFC PARA PETRINO VS 1 PARA ASPLUND', contexto: 'Petrino lutou contra Anthony Smith (#8 LHW) e Tyson Pedro (#10 LHW). Asplund enfrentou apenas Sean Sharaf (sem ranking). A diferenca de calibre de oponentes enfrentados e significativa.', implicacao_aposta: 'Petrino como favorito moderado faz sentido. Mas -225 pode nao ter valor suficiente dado o risco de KO.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Petrino por Submissao', odds: '+350', confianca: 'media', edge_vs_mercado: 'Asplund tem 0 defesa de chao + Petrino com 2 subs na carreira', raciocinio: 'O mercado pode subestimar a via de submissao. Se Petrino decidir levar pro chao, Asplund nao tem ferramentas para se defender. A +350, o risco/recompensa e atraente.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 rounds', odds: '-140', confianca: 'alta', raciocinio: 'Dois nocauteadores no peso pesado com defesas mediocres. A probabilidade de finalizacao antes do R3 e muito alta. Ambos tem taxas de KO acima de 60%.' },
        { tipo: 'Moneyline', pick: 'Petrino -225', odds: '-225', confianca: 'media', raciocinio: 'Experiencia e versatilidade justificam o favoritismo. Mas o queixo questionavel contra o volume de Asplund adiciona risco significativo.' },
        { tipo: 'Moneyline', pick: 'Asplund +185 (upset)', odds: '+185', confianca: 'baixa', edge_vs_mercado: 'Volume historico + queixo questionavel de Petrino', raciocinio: 'Se voce acredita que o volume de Asplund pode sobrecarregar o queixo de Petrino, +185 e um preco justo. A estreia historica mostrou que o volume e real.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Apostar em Asplund Baseado na Estreia',
        descricao: 'A estreia de Asplund foi historica, mas contra Sean Sharaf, um oponente sem ranking e sem nivel UFC. Os numeros inflados (19.93 strikes/min) refletem 1 luta contra um oponente fraco. Petrino e um salto monumental de nivel. Nao use as stats de 1 luta como base para apostar.',
      },
      disclaimer: 'Analise estatistica para fins informativos. Aposte com responsabilidade.',
    },
  },
};
