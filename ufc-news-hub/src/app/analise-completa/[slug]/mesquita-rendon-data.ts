import type { FullSingleAnalise } from '@/types/analise';

export const mesquitaRendonAnalise: FullSingleAnalise = {
  id: 'mesquita-rendon-ufn-mar-14',
  evento_id: null,
  slug: 'mesquita-rendon-ufn-mar-14',
  titulo: 'Mesquita vs Rendon: A Lenda do Jiu-Jitsu Contra a Monster Mexicana',
  subtitulo: 'Maior campeao de jiu-jitsu da historia testa o chao do UFC contra veterana de decisoes',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Submission', confidence: 'MEDIA-ALTA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Bia Mesquita', record: '6-0-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Montserrat Rendon', record: '7-1-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Galo Feminino',
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
      categoria_peso: 'Peso Galo Feminino (135 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'A MAIOR CAMPEAO DO JIU-JITSU CONTRA A MONSTER',
      tagline_sub: '10 ouros mundiais no tatame. Agora Bia Mesquita quer dominar o octogono.',
      fighter1: {
        nome_completo: 'Beatriz "Bia" Mesquita',
        apelido: 'The Lady GOAT',
        sobrenome: 'Mesquita',
        record: '6-0-0',
        ranking: 'Sem ranking WBW',
        info_extra: 'Rio de Janeiro, Brasil | 34 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Montserrat "Monster" Rendon',
        apelido: 'Monster',
        sobrenome: 'Rendon',
        record: '7-1-0',
        ranking: 'Sem ranking WBW',
        info_extra: 'Mexico | 35 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">A Lenda Viva do Tatame</h3>
        <p><strong class="text-ufc-red">Bia Mesquita</strong> nao e uma lutadora comum fazendo a transicao do jiu-jitsu para o MMA. Ela e, possivelmente, a maior competidora da historia do jiu-jitsu feminino. Com 10 ouros mundiais no IBJJF, membro do Hall da Fama, e campeao ADCC, Mesquita dominou o grappling mundial por mais de uma decada. Sua transicao para o MMA foi tardia — estreou profissionalmente em 2024 aos 33 anos — mas fulminante: 6-0 com 4 finalizacoes, culminando numa estreia no UFC com Performance da Noite contra Irina Alekseeva via mata-leao no segundo round.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Guerreira Silenciosa do Mexico</h3>
        <p><strong class="text-blue-400">Montserrat Rendon</strong> e o oposto de flashy. A mexicana de 35 anos construiu sua carreira na consistencia: 7-1 com TODAS as 7 vitorias por decisao. Invicta como amadora, 12 vezes campea nacional de jiu-jitsu no Mexico, Rendon sabe competir e sabe pontuar. No UFC, tem um recorde de 2-1, com vitorias sobre Tamires Vidal e Alice Pereira — ambas por decisao. Sua unica derrota foi uma decisao unanime para Daria Zhelezniakova. Rendon nunca finalizou ninguem, mas tambem quase nunca foi finalizada.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Grappling de Elite vs Durabilidade</h3>
        <p>O confronto e fascinante do ponto de vista tecnico. <strong class="text-ufc-red">Mesquita</strong> e a melhor grappler que <strong class="text-blue-400">Rendon</strong> jamais vai enfrentar — e provavelmente a melhor que qualquer mulher no peso galo vai enfrentar. A questao nao e SE Mesquita e melhor no chao, mas sim se Rendon consegue evitar o chao por 15 minutos. E se a luta for pro chao, quanto tempo Rendon consegue sobreviver contra mao que ja finalizou as melhores do mundo?</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (1-0 no UFC)', fighter2: 'Sem ranking (2-1 no UFC)' },
        { dimensao: 'Objetivo', fighter1: '2-0 no UFC, construir momentum para ranking', fighter2: 'Derrotar nome famoso, se estabelecer na divisao' },
        { dimensao: 'Narrativa', fighter1: 'Lenda do jiu-jitsu provando que MMA e diferente', fighter2: 'Veterana consistente derrubando o hype' },
        { dimensao: 'Risco', fighter1: 'Derrota questiona a transicao BJJ-MMA', fighter2: 'Derrota para alguem com 1 luta no UFC mostra teto' },
        { dimensao: 'Recompensa', fighter1: '2 vitorias no UFC consolida como prospect seria', fighter2: 'Vitoria sobre lenda do BJJ e o maior feito da carreira' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'A LADY GOAT DOMINA O OCTOGONO',
          subtitulo: 'Mesquita prova que o melhor jiu-jitsu do mundo funciona no MMA.',
          consequencias: [
            { tag: 'HYPE', texto: '2-0 no UFC com 2 finalizacoes. O hype de maior grappler do MMA feminino ganha forca real.' },
            { tag: 'RANKING', texto: 'Comeca a bater na porta do top 15 dos galos femininos. Oponentes ranqueadas entram no radar.' },
            { tag: 'LEGADO', texto: 'Cada vitoria adiciona ao legado ja historico. De GOAT do tatame a contender no UFC.' },
          ],
          proxima_luta: 'Oponente ranqueada #12-15 do peso galo feminino',
        },
        fighter2_vence: {
          titulo: 'A MONSTER DERRUBA A LENDA',
          subtitulo: 'Rendon mostra que jiu-jitsu de tatame nao e tudo no MMA.',
          consequencias: [
            { tag: 'VALIDACAO', texto: 'Maior vitoria da carreira de Rendon. Derrotar uma 10x campea mundial e um feito historico.' },
            { tag: 'POSICAO', texto: '3-1 no UFC consolida como lutadora confiavel da divisao. Consistencia e seu traco definidor.' },
            { tag: 'NARRATIVA', texto: 'Prova que experiencia no MMA importa mais que credenciais de grappling. A Monster silencia o hype.' },
          ],
          proxima_luta: 'Oponente ranqueada #10-15 ou outra prospect em ascensao',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Bia Mesquita',
        color: 'red',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Irina Alekseeva', result: 'W', method: 'Sub R2 (mata-leao)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC com Performance da Noite. Finalizou com mata-leao no segundo round. Dominio total no chao desde o primeiro minuto.' },
          { date: 'Jun 2025', opponent: 'Oponente LFA', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Venceu o cinturao peso galo do LFA com finalizacao rapida no primeiro round.' },
          { date: 'Out 2024', opponent: 'Shannel Butler', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Finalizacao dominante no LFA 194. Continuou a trajetoria de finalizacoes rapidas.' },
          { date: 'Jun 2024', opponent: 'Jorgina Ramos', result: 'W', method: 'Sub R1', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia profissional no MMA com finalizacao no primeiro round. Transicao do BJJ imediata.' },
        ],
        momentum_score: 8,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Mesquita esta em trajetoria ascendente total. 6-0 com 4 finalizacoes, Performance da Noite na estreia do UFC, e o hype de ser a maior campea de jiu-jitsu da historia. O unico asterisco e o nivel de competicao: todos os oponentes ate agora foram de nivel baixo. Rendon, com 2-1 no UFC, sera o teste mais significativo ate o momento.',
      },
      fighter2: {
        nome: 'Montserrat Rendon',
        color: 'blue',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Alice Pereira', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada por decisao dividida no UFC Noche. Mostrou resiliencia mas nao dominou.' },
          { date: 'Mar 2024', opponent: 'Daria Zhelezniakova', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Unica derrota profissional. Zhelezniakova controlou o ritmo por 3 rounds com striking superior.' },
          { date: 'Set 2023', opponent: 'Tamires Vidal', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Estreia no UFC com vitoria apertada por decisao dividida. Mostrou coração mas luta foi competitiva.' },
        ],
        momentum_score: 5,
        momentum_label: 'Estavel (com ressalvas)',
        momentum_trend: 'stable',
        momentum_note: 'Rendon e a definicao de consistente mas nao espetacular. 7-1 com todas as vitorias por decisao mostra uma lutadora que sabe competir mas nao finalizar. Suas duas vitorias no UFC foram por decisao dividida, o que sugere lutas apertadas onde poderia ter perdido. A derrota para Zhelezniakova mostrou que quando enfrenta striking superior, tem dificuldades.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Mesquita',
        media_oponentes: 1,
        media_oponentes_label: 'Ruim',
        aproveitamento: '6W-0L (100%)',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Rendon',
        media_oponentes: 1.3,
        media_oponentes_label: 'Ruim',
        aproveitamento: '2W-1L (67%) no UFC',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Mesquita e Rendon nunca enfrentaram oponentes em comum. Ambas estao no inicio da trajetoria UFC com oponentes de nivel baixo a medio. Rendon tem mais experiencia no octogono (3 lutas vs 1), mas Mesquita tem credenciais de grappling incomparavelmente superiores. A comparacao direta e limitada pelo pouco historico compartilhado.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 2.50, valueB: 3.20, maxVal: 6, format: 'decimal', note: 'Rendon e mais ativa no striking, reflexo de suas vitorias por decisao. Mesquita prefere buscar o chao.' },
        { label: 'Precisao de Strikes (%)', valueA: 40, valueB: 45, maxVal: 100, format: 'percent', note: 'Ambas com precisao mediana. Nenhuma e strikers de elite.' },
        { label: 'Strikes Absorvidos/Min', valueA: 2.80, valueB: 3.50, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Rendon absorve mais dano, consequencia de lutas mais longas e competitivas.' },
        { label: 'Defesa de Strikes (%)', valueA: 55, valueB: 48, maxVal: 100, format: 'percent', note: 'Mesquita com leve vantagem defensiva, parcialmente porque passa menos tempo trocando em pe.' },
        { label: 'Takedowns por 15 Min', valueA: 4.00, valueB: 1.20, maxVal: 5, format: 'decimal', note: 'Mesquita busca o chao agressivamente. Rendon raramente tenta derrubar.' },
        { label: 'Precisao de Takedown (%)', valueA: 55, valueB: 33, maxVal: 100, format: 'percent', note: 'Mesquita converte mais da metade das tentativas. Takedown e o caminho para o grappling.' },
        { label: 'Defesa de Takedown (%)', valueA: 70, valueB: 55, maxVal: 100, format: 'percent', note: 'Mesquita com boa defesa tambem. Rendon pode ter dificuldades para defender os takedowns.' },
        { label: 'Submissoes por 15 Min', valueA: 2.50, valueB: 0.00, maxVal: 3, format: 'decimal', note: 'A diferenca mais gritante. Mesquita busca finalizacoes constantemente. Rendon NUNCA finalizou ninguem.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '34 anos', fighter2: '35 anos', note: 'Praticamente a mesma idade' },
        { label: 'Altura', fighter1: '1.63m (5\'4")', fighter2: '1.73m (5\'8")', note: 'Rendon 10cm mais alta' },
        { label: 'Envergadura', fighter1: '171cm (67.5")', fighter2: '173cm (68")', note: 'Praticamente igual' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Mesma base' },
        { label: 'Academia', fighter1: 'American Top Team, Florida', fighter2: 'Mexico', note: 'ATT e uma das melhores academias do mundo' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Jiu-Jitsu / Grappling', valueA: 98, valueB: 60, labelA: 'Excelente', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Mesquita e a GOAT do jiu-jitsu feminino. 10 ouros mundiais, Hall da Fama IBJJF, campeao ADCC. Rendon tem 12 titulos nacionais de BJJ no Mexico, mas o nivel e incomparavel. A diferenca aqui e a maior de qualquer luta no card.' },
        { label: 'Striking em Pe', valueA: 38, valueB: 50, labelA: 'Ruim', labelB: 'Medio', advantage: 'fighter2', advantage_note: 'Rendon e ligeiramente melhor em pe por experiencia. Mesquita ainda esta desenvolvendo o striking no MMA. Nenhuma e striker de elite, mas Rendon tem mais conforto na trocacao.' },
        { label: 'Wrestling / Takedowns', valueA: 68, valueB: 42, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Mesquita busca takedowns ativamente (4.00/15min) e converte bem. Rendon raramente derruba e pode ter dificuldades para se manter em pe.' },
        { label: 'Defesa / Durabilidade', valueA: 55, valueB: 60, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Rendon nunca foi finalizada no profissional. Mesquita nunca perdeu. Ambas mostram durabilidade, mas de formas diferentes.' },
        { label: 'Cardio / Resistencia', valueA: 65, valueB: 68, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Rendon vai a decisao constantemente (7 de 7 vitorias), mostrando cardio para 3 rounds. Mesquita costuma finalizar rapido, entao cardio ainda e uma incognita em lutas longas.' },
        { label: 'Experiencia MMA / QI de Luta', valueA: 40, valueB: 60, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Rendon tem 8 lutas profissionais e 3 no UFC. Mesquita tem 6 lutas e apenas 1 no UFC. Em termos de experiencia no octogono, Rendon leva vantagem significativa.' },
      ],
      insight: 'O radar de habilidades mostra claramente por que essa luta e intrigante. <strong class="text-ufc-red">Mesquita</strong> tem a maior vantagem individual possivel no grappling — e literalmente a melhor do mundo. Mas <strong class="text-blue-400">Rendon</strong> compensa com experiencia MMA, durabilidade e conforto no octogono. A luta se resume a uma pergunta: o grappling de elite pode superar a experiencia e resiliencia?',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Mesquita',
        ko_tko: { count: 1, percent: 17 },
        submission: { count: 4, percent: 67 },
        decision: { count: 1, percent: 17 },
        total_wins: 6,
      },
      fighter2: {
        nome: 'Rendon',
        ko_tko: { count: 0, percent: 0 },
        submission: { count: 0, percent: 0 },
        decision: { count: 7, percent: 100 },
        total_wins: 7,
      },
      insight: 'O contraste nao poderia ser mais extremo. Mesquita finaliza 67% das lutas por submissao — uma maquina de finalizacoes. Rendon tem 100% das vitorias por decisao — NUNCA finalizou ninguem em 7 vitorias. Isso significa que Rendon precisa sobreviver o grappling por 15 minutos, enquanto Mesquita precisa de apenas um momento no chao para acabar com tudo. O tempo joga contra Mesquita: cada minuto que passa sem finalizacao favorece o estilo de Rendon.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'VANTAGEM MESQUITA',
          color: 'red',
          title: 'A Caca ao Takedown',
          description: 'Mesquita vai buscar o takedown desde o primeiro segundo. Com 4.00 TD/15min, a pressao sera constante. Se conseguir levar Rendon ao chao nos primeiros minutos, o jiu-jitsu de nivel mundial entra em acao. Rendon precisa manter distancia, usar o jab e evitar o clinch a todo custo. Os primeiros 2 minutos podem definir a luta inteira.',
        },
        {
          rounds: 'R2',
          danger_level: 6,
          danger_label: 'VANTAGEM MESQUITA',
          color: 'red',
          title: 'Ajustes e Persistencia',
          description: 'Se Mesquita nao finalizou no primeiro round, ela vai ajustar a abordagem de takedown. A brasileira tem paciencia de campea mundial — nao desiste. Se Rendon sobreviveu o R1, pode comecar a ganhar confianca, mas cada momento de descuido no chao e potencialmente fatal contra a melhor grappler da divisao.',
        },
        {
          rounds: 'R3',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'Territorio de Rendon?',
          description: 'Se a luta chega ao terceiro round sem finalizacao, o cenario favorece Rendon pela primeira vez. A mexicana vive em lutas de 3 rounds e sabe pontuar. Se Mesquita nao conseguiu finalizar em 10 minutos, a durabilidade e experiencia de Rendon podem fazer diferenca nos cartoes. Porem, o perigo de submissao permanece ate o ultimo segundo.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Target', title: '10 ouros mundiais de jiu-jitsu (IBJJF)', fighter: 'Mesquita', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Mesquita e a mulher com mais titulos mundiais de jiu-jitsu da historia. Hall da Fama IBJJF, campeao ADCC. Seu grappling esta em um nivel que transcende o MMA — ela literalmente INVENTOU posicoes que outros tentam copiar. No chao, ninguem no peso galo feminino pode competir.' },
        { icon: 'Clock', title: 'Apenas 1 luta no UFC (transicao tardia)', fighter: 'Mesquita', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Mesquita comecou no MMA profissional apenas em 2024 aos 33 anos. Tem apenas 6 lutas e 1 no UFC. Oponentes ate agora foram de nivel baixo. A transicao BJJ-MMA nem sempre funciona (vide Mackenzie Dern nos primeiros anos). O striking ainda e um trabalho em progresso.' },
        { icon: 'Shield', title: 'Nunca foi finalizada (7-1)', fighter: 'Rendon', risk_level: 'POSITIVO', risk_color: 'green', description: 'Rendon nunca foi finalizada em 8 lutas profissionais. Mesmo na derrota para Zhelezniakova, sobreviveu 3 rounds. Se ela tem a durabilidade para sobreviver o grappling de Mesquita, pode levar a decisao.' },
        { icon: 'Brain', title: 'American Top Team (Mesquita)', fighter: 'Mesquita', risk_level: 'POSITIVO', risk_color: 'green', description: 'Treinar no ATT significa sparring com as melhores lutadoras do mundo. Amanda Nunes, Kayla Harrison e outras passaram pelo ATT. O nível de preparacao e incomparavel com qualquer academia regional.' },
        { icon: 'Activity', title: '100% das vitorias por decisao', fighter: 'Rendon', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Rendon NUNCA finalizou ninguem. 7 vitorias, 7 decisoes. Isso significa que ela nao pode finalizar a luta por conta propria — depende dos juizes. Contra Mesquita, se a luta for pro chao, Rendon nao tem armas para ameacar.' },
        { icon: 'TrendingUp', title: 'Performance da Noite na estreia UFC', fighter: 'Mesquita', risk_level: 'POSITIVO', risk_color: 'green', description: 'Mesquita nao apenas venceu na estreia — ganhou bonus de Performance da Noite. Isso mostra que o UFC ve valor nela e que sua performance foi impressionante ate para padroes do UFC. Confianca psicologica em alta.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Mesquita',
        total_probability: 62,
        scenarios: [
          { name: 'O Mata-Leao Inevitavel', probability: 30, method: 'Sub R1-R2', description: 'Mesquita consegue o takedown, pega as costas de Rendon e aplica o mata-leao — o mesmo golpe que usou contra Alekseeva na estreia. Com nivel de grappling absolutamente superior, cada segundo nas costas de Rendon e uma sentenca de morte. O finalizacao pode vir de qualquer posicao.' },
          { name: 'Dominacao no Chao', probability: 20, method: 'Decisao Unanime', description: 'Mesquita consegue takedowns em todos os rounds e domina no chao, mas Rendon mostra a durabilidade que a manteve invicta por tantas lutas. Mesquita acumula controle, ground and pound e tentativas de finalizacao, mas nao consegue o finish. Vence por dominacao total nos cartoes.' },
          { name: 'Finalizacao Surpresa', probability: 12, method: 'Sub R1 (guilhotina ou chave de braco)', description: 'Em uma troca no clinch ou durante uma defesa de takedown, Mesquita encontra uma abertura para guilhotina ou chave de braco. A habilidade de transicao da brasileira permite explorar erros minusculos que outras lutadoras nao conseguiriam ver.' },
        ],
      },
      fighter2: {
        nome: 'Rendon',
        total_probability: 35,
        scenarios: [
          { name: 'A Muralha Mexicana', probability: 18, method: 'Decisao Dividida', description: 'Rendon defende os takedowns de Mesquita com determinacao e mantem a luta em pe. Usa o jab, a movimentacao lateral e a vantagem de altura (10cm) para pontuar. Nos rounds finais, a experiencia em lutas de 3 rounds e a resiliencia fazem a diferenca nos cartoes.' },
          { name: 'A Decisao por Resiliencia', probability: 12, method: 'Decisao Unanime', description: 'Rendon sobrevive o grappling nos dois primeiros rounds e domina o terceiro round em pe. A fadiga de tentar finalizar pode afetar Mesquita, e Rendon capitaliza com volume de strikes e controle do octogono.' },
          { name: 'O Upset Defensivo', probability: 5, method: 'Decisao Dividida', description: 'Rendon surpreende com defesa de takedown excepcional e striking mais agressivo. Mesquita nao consegue implementar o jogo de chao e se frustra. Os juizes premiam a atividade e agressividade de Rendon.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Bia Mesquita',
      winner_side: 'fighter1',
      predicted_method: 'Submissao no R1-R2 ou Decisao dominante',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'A vantagem de grappling de Mesquita e possivelmente a maior disparidade individual em qualquer luta do card. 10 ouros mundiais de jiu-jitsu contra uma lutadora que nunca finalizou ninguem. Com 4.00 takedowns por 15 minutos e 2.50 submissoes por 15 minutos, Mesquita vai buscar o chao incessantemente. Rendon tem durabilidade e experiencia para resistir, mas o nivel de jiu-jitsu e tao absurdamente superior que bastam alguns segundos no chao para que o perigo se torne real. A confianca nao e mais alta porque Mesquita ainda tem pouca experiencia no MMA e Rendon nunca foi finalizada.',
      x_factor: {
        title: 'O Grappling de Nivel Olimpico',
        description: 'Mesquita nao e apenas boa no chao — ela e a MELHOR que ja existiu no jiu-jitsu feminino. 10 ouros mundiais significam que ela dominou as melhores grapplers do planeta por mais de uma decada. No UFC, onde o grappling feminino tende a ser de nivel medio, sua habilidade e uma arma nuclear. Basta um momento no chao.',
      },
      upset_alert: {
        title: 'Upset Alert: Rendon por Decisao',
        description: 'Rendon sobreviveu 3 rounds contra todas as suas oponentes e nunca foi finalizada. Se ela tiver um plano de defesa de takedown solido e conseguir manter distancia com o jab e a vantagem de altura, pode frustrar Mesquita. A transicao BJJ-MMA nem sempre funciona contra lutadoras que conhecem o chao o suficiente para sobreviver sem serem finalizadas.',
      },
      probabilities: {
        fighter1: { nome: 'Mesquita', percent: 62 },
        fighter2: { nome: 'Rendon', percent: 35 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Primeiro Takedown', icon: 'Target', description: 'Mesquita vai tentar derrubar desde o primeiro momento. Observe a reacao de Rendon: se ela defender o primeiro takedown com autoridade, pode ser uma luta longa. Se Mesquita conseguir, observe o nivel de controle no chao — vai ser uma masterclass de jiu-jitsu.' },
        { num: 2, title: 'A Defesa de Takedown de Rendon', icon: 'Shield', description: 'Rendon precisa de 100% de sucesso na defesa de takedown para vencer. Cada queda e perigosa contra a maior grappler do mundo. Observe se ela usa underhooks, wall-walking e scrambles para se manter em pe. Se ela tiver um plano, pode surpreender.' },
        { num: 3, title: 'O Striking de Mesquita', icon: 'Zap', description: 'Mesquita ainda e novata no striking. Observe se ela melhorou desde a estreia no UFC. Se o striking estiver mais afiado, fica ainda mais dificil para Rendon manter distancia porque precisa se preocupar com golpes ALEM do takedown.' },
        { num: 4, title: 'Tempo de Chao vs Tempo em Pe', icon: 'Clock', description: 'Preste atencao no tempo total no chao vs em pe. Se mais de 50% da luta for no chao, Mesquita provavelmente esta dominando. Se a maior parte for em pe, Rendon esta executando o gameplan perfeitamente.' },
        { num: 5, title: 'A Paciencia de Mesquita', icon: 'Brain', description: 'Campeas mundiais de jiu-jitsu sao pacientes. Observe se Mesquita se frustra quando nao consegue o takedown ou se mantem a calma e continua buscando. A paciencia e a marca de uma campea — e pode ser a diferenca entre finalizacao e decisao.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'MESQUITA VS RENDON', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Galo Feminino\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'BIA MESQUITA', content: '6-0-0 | The Lady GOAT\n\n10x Campea Mundial de Jiu-Jitsu\nHall da Fama IBJJF\n67% de vitorias por submissao\nPerformance da Noite na estreia UFC', color: 'red' },
        { slide_number: 3, title: 'MONTSERRAT RENDON', content: '7-1-0 | Monster\n\n100% das vitorias por decisao\nNunca foi finalizada\n2-1 no UFC\n12x campea nacional de BJJ (Mexico)', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Mesquita por Submissao ou Decisao\nConfianca: MEDIA-ALTA\n\n62% Mesquita | 35% Rendon | 3% Empate\n\nA GOAT do tatame no octogono', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Mesquita vs Rendon sabado no APEX. A mulher com MAIS TITULOS MUNDIAIS de jiu-jitsu da historia contra a mexicana que nunca foi finalizada. 10 ouros mundiais vs 7 decisoes em 7 vitorias.' },
        { num: '2/5', text: 'Bia Mesquita: 6-0, 4 finalizacoes, Performance da Noite na estreia UFC. GOAT do jiu-jitsu feminino com 10 ouros mundiais IBJJF e ADCC. Treina no ATT. Seu grappling e de outro planeta.' },
        { num: '3/5', text: 'Montserrat Rendon: 7-1, TODAS as 7 vitorias por decisao. NUNCA finalizou. NUNCA foi finalizada. 2-1 no UFC com vitorias apertadas por dividida. Consistente mas sem finish.' },
        { num: '4/5', text: 'A dinamica: Mesquita precisa do chao e provavelmente consegue. A questao e se Rendon sobrevive 15 min contra o melhor jiu-jitsu do mundo. Historicamente, ela sobrevive — mas nunca enfrentou ESSE nivel.' },
        { num: '5/5', text: 'Previsao: Mesquita por submissao no R2. 62% Mesquita, 35% Rendon. A vantagem no grappling e a maior disparidade do card. Mas Rendon NUNCA foi finalizada. Algo precisa ceder.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"A mulher com MAIS TITULOS MUNDIAIS de jiu-jitsu da HISTORIA contra alguem que NUNCA foi finalizada. Mesquita vs Rendon, sabado no APEX. O que acontece quando forca imparavel encontra objeto imovel?"' },
        { time: '10-25s', title: 'Os Perfis', text: '"Bia Mesquita: 6-0, 10 ouros mundiais, Hall da Fama. No tatame, e a GOAT. No UFC, estreiou com Performance da Noite finalizando por mata-leao. Rendon: 7-1, 7 vitorias por DECISAO. NUNCA finalizou, NUNCA foi finalizada. A definicao de sobrevivente."' },
        { time: '25-40s', title: 'O Confronto', text: '"A dinamica e simples: Mesquita quer o chao. Se conseguir, tem as melhores maos do mundo pra finalizar. Rendon quer ficar em pe e levar a decisao. Ela NUNCA foi finalizada em 8 lutas. Mas tambem nunca enfrentou ninguem com 10 titulos mundiais."' },
        { time: '40-55s', title: 'A Analise', text: '"Mesquita com 4 takedowns por 15 minutos e 2.50 submissoes. Rendon com 55% de defesa de takedown e zero finalizacoes. Os numeros dizem: se for pro chao, acabou. Mas Rendon e DURA. A questao e QUANTO TEMPO ela aguenta."' },
        { time: '55-60s', title: 'Previsao + CTA', text: '"Mesquita por submissao no segundo round. A GOAT do tatame vai impor o jogo. Comenta: grappling ou resiliencia?"' },
      ],
      tiktok: [
        { hook: 'DEZ ouros mundiais de jiu-jitsu. E agora ela ta no UFC.', body: 'Bia Mesquita: a maior campea do jiu-jitsu feminino da historia. 10 ouros, Hall da Fama, ADCC. Comecou no MMA em 2024. 6-0. Performance da Noite na estreia. Agora enfrenta Rendon, que NUNCA foi finalizada em 8 lutas. Choque de estilos absurdo.', cta: 'Quem vence? A GOAT ou a Monster?' },
        { hook: 'SETE vitorias. SETE decisoes. ZERO finalizacoes.', body: 'Montserrat Rendon nunca finalizou NINGUEM. Mas tambem nunca FOI finalizada. Contra Bia Mesquita, a maior grappler da historia, isso significa uma coisa: pode ela sobreviver 15 minutos contra as melhores maos do mundo?', cta: 'Segue pra mais analises do UFC desse sabado.' },
        { hook: 'O que acontece quando a MELHOR grappler do MUNDO entra no octogono?', body: 'Bia Mesquita: 10 ouros mundiais, 67% de finalizacoes, Performance da Noite na estreia. Treina no ATT com as melhores do mundo. No chao, NINGUEM no peso galo feminino pode competir. A pergunta nao e SE ela e melhor — e se consegue levar a luta pro chao.', cta: 'Salva e assiste sabado.' },
      ],
      headlines: [
        'Mesquita vs Rendon: A GOAT do Tatame Contra a Monster Indestrutivel',
        '10 Ouros Mundiais: O Numero Que Define Bia Mesquita',
        '7 Vitorias, 7 Decisoes: O Paradoxo de Montserrat Rendon',
        'Jiu-Jitsu de Classe Mundial vs Durabilidade: O Duelo dos Extremos',
        'Bia Mesquita Pode Dominar o UFC Como Dominou o Tatame?',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '-250',
        fighter2_odds: '+200',
        fighter1_name: 'Mesquita',
        fighter2_name: 'Rendon',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'Target', titulo: 'Grappling de Nivel Historico', stat_headline: '10 OUROS MUNDIAIS IBJJF + ADCC + HALL DA FAMA', contexto: 'Mesquita e literalmente a melhor grappler da historia do MMA feminino. Com 2.50 submissoes por 15 minutos e 67% de finalizacoes, cada momento no chao e perigoso. Rendon nunca enfrentou esse nivel de jiu-jitsu.', implicacao_aposta: 'Favorece fortemente Mesquita por submissao. Se as odds para "Mesquita por Sub" forem razoaveis, e provavelmente o melhor valor do card.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Rendon Nunca Foi Finalizada', stat_headline: '0 FINALIZACOES SOFRIDAS EM 8 LUTAS PROFISSIONAIS', contexto: 'Rendon nunca foi submetida ou nocauteada. Mesmo na derrota para Zhelezniakova, sobreviveu 3 rounds. A durabilidade e real, mas nunca foi testada contra grappling de elite mundial.', implicacao_aposta: 'Cria algum valor em Over 1.5 rounds. Rendon pode sobreviver o primeiro round e levar a luta mais longe do que os odds sugerem.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Activity', titulo: 'Zero Finalizacoes de Rendon', stat_headline: '7 VITORIAS, 7 DECISOES, 0 FINALIZACOES NA CARREIRA', contexto: 'Rendon nao tem poder de finalizacao. Todas as vitorias por decisao significam que ela nao pode terminar a luta. Contra Mesquita, isso e um problema enorme porque nao pode ameacar no chao.', implicacao_aposta: 'Elimina completamente apostas em Rendon por finalizacao. Se Rendon vencer, sera por decisao — e so por decisao.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Clock', titulo: 'Experiencia Limitada de Mesquita no MMA', stat_headline: 'APENAS 6 LUTAS PROFISSIONAIS, 1 NO UFC', contexto: 'Mesquita comecou no MMA tarde e tem pouca experiencia competitiva. Oponentes ate agora foram de nivel baixo. A transicao BJJ-MMA pode ter limitacoes que ainda nao apareceram.', implicacao_aposta: 'Ameniza parcialmente o favoritismo de Mesquita. Rendon como underdog a +200 pode ter valor se voce acredita que experiencia MMA supera grappling puro.', edge_level: 'leve', fighter_side: 'fighter2' },
        { icon: 'Brain', titulo: 'ATT vs Preparacao Regional', stat_headline: 'MESQUITA TREINA NO AMERICAN TOP TEAM', contexto: 'ATT e uma das melhores academias do mundo. Mesquita tem acesso a sparring com lutadoras de elite, preparacao tatica de primeiro nivel e coaching experiente. A preparacao de Rendon no Mexico e boa, mas o nivel do ATT e outro patamar.', implicacao_aposta: 'Reforça Mesquita como favorita. A qualidade da preparacao pode ser a diferenca em ajustar o gameplan round a round se necessario.', edge_level: 'moderado', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Mesquita por Submissao', odds: '-110 (estimado)', confianca: 'alta', edge_vs_mercado: 'Com 67% de finalizacoes e grappling de nivel historico contra oponente sem armas no chao, submissao e o cenario mais provavel.', raciocinio: 'Mesquita finaliza. Rendon nao ameaca no chao. A combinacao de takedowns agressivos com o melhor jiu-jitsu do mundo feminino torna a submissao o resultado mais provavel.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '+100 (estimado)', confianca: 'media', raciocinio: 'Mesquita tende a finalizar rapido — 4 de 6 vitorias por submissao, maioria no R1. Se conseguir o takedown cedo, o R2 pode ser suficiente. Mas Rendon nunca foi finalizada, entao existe risco.' },
        { tipo: 'Moneyline', pick: 'Mesquita ML', odds: '-250 (estimado)', confianca: 'alta', edge_vs_mercado: 'O preco e alto mas a disparidade de grappling justifica. Mesquita e favorita pesada por razoes legitimas.', raciocinio: 'A vantagem de grappling e tao grande que mesmo com pouca experiencia MMA, Mesquita deve dominar. 10 ouros mundiais nao mentem.' },
        { tipo: 'Duracao', pick: 'Luta nao vai a decisao', odds: '+110 (estimado)', confianca: 'media', raciocinio: 'Mesquita finalizou em 4 de 6 lutas. Contra uma oponente sem ameaca no chao, a finalizacao e provavel. Mas o fato de Rendon nunca ter sido finalizada cria duvida suficiente para valor moderado.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Rendon por Nocaute',
        descricao: 'Rendon tem ZERO finalizacoes na carreira. Apostar em Rendon por KO/TKO e jogar dinheiro fora. Ela nunca demonstrou poder de nocaute e nao vai descobrir agora. Se Rendon vencer, sera exclusivamente por decisao.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
