import type { FullSingleAnalise } from '@/types/analise';

export const emmettVallejosAnalise: FullSingleAnalise = {
  id: 'emmett-vallejos-ufn-mar-14',
  evento_id: null,
  slug: 'emmett-vallejos-ufn-mar-14',
  titulo: 'Emmett vs Vallejos: O Veterano Contra a Nova Era',
  subtitulo: 'O poder do veterano contra a explosao do jovem argentino no UFC APEX',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter2', predictedMethod: 'KO', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Josh Emmett', record: '19-6-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Kevin Vallejos', record: '17-1-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night',
  evento_data: '2026-03-14',
  evento_local: 'UFC APEX, Las Vegas',
  categoria_peso: 'Peso Pena',
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
      categoria_peso: 'Peso Pena (145 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'A NOVA ERA CHEGA SEM PEDIR LICENCA',
      tagline_sub: 'O veterano mais perigoso da divisao contra o fenomeno argentino que ninguem consegue parar.',
      fighter1: {
        nome_completo: 'Josh "CC0" Emmett',
        apelido: 'CC0',
        sobrenome: 'Emmett',
        record: '19-6-0',
        ranking: '#11 Peso Pena',
        info_extra: 'Sacramento, California | 41 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Kevin "El Chino" Vallejos',
        apelido: 'El Chino',
        sobrenome: 'Vallejos',
        record: '17-1-0',
        ranking: '#14 Peso Pena',
        info_extra: 'Mar del Plata, Argentina | 24 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">O Guardiao do Ranking</h3>
        <p><strong class="text-ufc-red">Josh Emmett</strong> e o tipo de lutador que todo jovem prospecto teme enfrentar. Aos 41 anos, com 16 lutas no UFC, ele ja viu de tudo. Ja nocauteou Bryce Mitchell com um dos KOs mais brutais de 2023, ja disputou titulo interino contra Yair Rodriguez, ja foi para guerra de cinco rounds contra Ilia Topuria e Calvin Kattar. O problema? As ultimas tres lutas de Emmett foram derrotas. Duas por decisao (Murphy e Topuria) e uma por finalizacao rapida (Zalal). O relogio biologico esta correndo, e mais uma derrota pode significar o fim de uma carreira respeitavel.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Tempestade Argentina</h3>
        <p><strong class="text-blue-400">Kevin Vallejos</strong> tem 24 anos, 17 vitorias com apenas 1 derrota, e esta fazendo o que poucos conseguem: subir os degraus do UFC em velocidade absurda. Tres lutas, tres vitorias, incluindo um KO espetacular por spinning backfist contra Giga Chikadze que viralizou no mundo inteiro. O argentino luta como switch-hitter, troca de base com naturalidade, e tem um poder de nocaute que nao combina com seu tamanho. Ele e o Newcomer of the Year da MMA Junkie em 2025, e agora esta no main event contra um veterano ranqueado. A mensagem e clara: eu vim pra ficar.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">Geracao vs Geracao</h3>
        <p>Essa luta e sobre mais do que ranking. E sobre o que acontece quando a experiencia de <strong class="text-ufc-red">Emmett</strong> — 41 anos de sabedoria, poder de um soco, coracao de guerreiro — encontra a juventude de <strong class="text-blue-400">Vallejos</strong> — velocidade, imprevisibilidade, fome de quem esta construindo um legado. Emmett precisa dessa vitoria para provar que ainda pertence ao top 15. Vallejos precisa dessa vitoria para provar que o hype e real contra oponentes de elite.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: '#11 Peso Pena (caindo)', fighter2: '#14 Peso Pena (subindo)' },
        { dimensao: 'Objetivo', fighter1: 'Parar a sequencia de derrotas', fighter2: 'Entrar no top 10' },
        { dimensao: 'Narrativa', fighter1: 'Ultima chance como veterano relevante', fighter2: 'Consolidar hype como estrela em ascensao' },
        { dimensao: 'Risco', fighter1: 'Aposentadoria forcada com mais uma derrota', fighter2: 'Primeiro teste real contra veterano ranqueado' },
        { dimensao: 'Recompensa', fighter1: 'Permanencia no top 15 e mais uma luta grande', fighter2: 'Top 10 e potencial main event maior' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'O VETERANO SE RECUSA A MORRER',
          subtitulo: 'Emmett prova que experiencia e poder ainda vencem juventude no UFC.',
          consequencias: [
            { tag: 'RANKING', texto: 'Sobe para #8-9 e garante relevancia no top 10 dos penas.' },
            { tag: 'LEGADO', texto: 'Mostra que ainda e perigoso aos 41 anos, silenciando pedidos de aposentadoria.' },
            { tag: 'PROXIMO', texto: 'Pode receber luta contra oponente no top 7 para consolidar posicao.' },
          ],
          proxima_luta: 'Possivel luta contra um top 7 como Bryce Mitchell ou Arnold Allen',
        },
        fighter2_vence: {
          titulo: 'EL CHINO INVADE O TOP 10',
          subtitulo: 'Vallejos confirma que o hype e real e se estabelece como ameaca na divisao.',
          consequencias: [
            { tag: 'RANKING', texto: 'Entra diretamente no top 10 dos penas, possivelmente #9-10.' },
            { tag: 'HYPE', texto: 'Quatro vitorias seguidas no UFC com 24 anos. O nome mais quente da divisao.' },
            { tag: 'FUTURO', texto: 'Abre portas para lutas contra top 5 no segundo semestre de 2026.' },
            { tag: 'ARGENTINA', texto: 'Consolida-se como o maior lutador argentino ativo no UFC.' },
          ],
          proxima_luta: 'Luta contra top 5-7 como Arnold Allen, Youssef Zalal ou Bryce Mitchell',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Josh Emmett',
        color: 'red',
        recent_fights: [
          { date: 'Out 2025', opponent: 'Youssef Zalal', result: 'L', method: 'Sub R1 (1:38)', opponent_rank: '#12 FW', quality_score: 3, quality_label: 'Bom', note: 'Finalizado por armbar em menos de 2 minutos. Derrota rapida e preocupante para um striker.' },
          { date: 'Abr 2025', opponent: 'Lerone Murphy', result: 'L', method: 'Decisao Unanime', opponent_rank: '#9 FW', quality_score: 4, quality_label: 'Muito Bom', note: 'Perdeu por decisao em luta de 5 rounds no main event. Murphy controlou com volume e versatilidade.' },
          { date: 'Jun 2023', opponent: 'Ilia Topuria', result: 'L', method: 'Decisao Unanime', opponent_rank: '#6 FW', quality_score: 5, quality_label: 'Excelente', note: 'Dominado por 5 rounds pelo futuro campeao. Levou um 10-7 no primeiro round mas sobreviveu mostrando coracao.' },
          { date: 'Dez 2023', opponent: 'Bryce Mitchell', result: 'W', method: 'KO R1 (1:57)', opponent_rank: '#10 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocaute brutal com overhand right. Um dos KOs mais devastadores de 2023. Performance of the Night.' },
          { date: 'Fev 2023', opponent: 'Yair Rodriguez', result: 'L', method: 'Sub R2 (4:19)', opponent_rank: '#2 FW', quality_score: 5, quality_label: 'Excelente', note: 'Luta pelo titulo interino. Finalizado por triangle choke no segundo round.' },
        ],
        momentum_score: 3,
        momentum_label: 'Em Queda',
        momentum_trend: 'descending',
        momentum_note: 'Emmett esta em uma fase dificil. Uma vitoria nos ultimos quatro combates, e a unica foi contra Mitchell em dezembro de 2023 — mais de dois anos atras. A derrota rapida para Zalal foi especialmente preocupante, mostrando vulnerabilidade no grappling. Aos 41 anos, o tempo nao esta do lado dele. Mas o poder de nocaute de Emmett nunca diminuiu — um unico overhand right ainda pode mudar tudo.',
      },
      fighter2: {
        nome: 'Kevin Vallejos',
        color: 'blue',
        recent_fights: [
          { date: 'Dez 2025', opponent: 'Giga Chikadze', result: 'W', method: 'KO R2 (1:29)', opponent_rank: '#13 FW', quality_score: 3, quality_label: 'Bom', note: 'Nocaute espetacular por spinning backfist. Performance of the Night. O KO viralizou mundialmente.' },
          { date: 'Ago 2025', opponent: 'Danny Silva', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria por decisao em luta competitiva. Mostrou que sabe lutar 3 rounds e vencer nos pontos.' },
          { date: 'Mar 2025', opponent: 'Seung Woo Choi', result: 'W', method: 'TKO R1 (3:09)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Estreia no UFC com nocaute no primeiro round. Overhand right seguido de ground and pound.' },
          { date: 'Set 2024', opponent: 'Cam Teague', result: 'W', method: 'TKO R1 (2:23)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Contender Series. Nocaute devastador com combinacao de 20 socos. Ganhou o contrato com o UFC.' },
        ],
        momentum_score: 9,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Vallejos esta em uma trajetoria absurda. Seis vitorias consecutivas, tres no UFC, coroadas pelo KO viral contra Giga Chikadze. Aos 24 anos, ele ja e Newcomer of the Year e agora faz seu primeiro main event. A confianca esta no teto, e o momento nao poderia ser melhor. A unica ressalva e que ele ainda nao enfrentou ninguem do calibre de um top 11 — Emmett sera o maior teste da carreira dele.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Emmett',
        media_oponentes: 4,
        media_oponentes_label: 'Muito Bom',
        aproveitamento: '1W-4L (20%)',
        contra_top5: '0W-2L',
      },
      fighter2: {
        nome: 'Vallejos',
        media_oponentes: 2,
        media_oponentes_label: 'Medio',
        aproveitamento: '3W-0L (100%)',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 0, fighter2: 0 },
      oponentes_em_comum_note: 'Emmett e Vallejos nunca enfrentaram oponentes em comum no UFC. Emmett lutou contra a elite da divisao (Topuria, Rodriguez, Kattar, Murphy), enquanto Vallejos ainda esta construindo seu curriculo com vitoria sobre Chikadze como seu melhor resultado. Isso torna a comparacao direta difícil — a experiencia de Emmett e incomparavel, mas Vallejos nunca perdeu no UFC.',
    },

    oponente_comum: null,

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 4.07, valueB: 5.10, maxVal: 7, format: 'decimal', note: 'Vallejos com volume significativamente maior. Emmett e mais seletivo com seus golpes.' },
        { label: 'Precisao de Strikes (%)', valueA: 36, valueB: 55, maxVal: 100, format: 'percent', note: 'Precisao de Emmett e baixa para os padroes do UFC. Vallejos muito mais preciso.' },
        { label: 'Strikes Absorvidos/Min', valueA: 4.66, valueB: 3.80, maxVal: 7, format: 'decimal', reverseWinner: true, note: 'Emmett absorve muito dano. Pode ser explorado pelo volume de Vallejos.' },
        { label: 'Defesa de Strikes (%)', valueA: 61, valueB: 65, maxVal: 100, format: 'percent', note: 'Vallejos com leve vantagem defensiva, reflexo da sua movimentacao switch-stance.' },
        { label: 'Takedowns por 15 Min', valueA: 0.92, valueB: 0.60, maxVal: 3, format: 'decimal' },
        { label: 'Precisao de Takedown (%)', valueA: 37, valueB: 40, maxVal: 100, format: 'percent' },
        { label: 'Defesa de Takedown (%)', valueA: 47, valueB: 89, maxVal: 100, format: 'percent', note: 'Defesa de takedown de Vallejos e excepcional (89%). Emmett com apenas 47%, ponto fraco critico.' },
        { label: 'Submissoes por 15 Min', valueA: 0.00, valueB: 0.30, maxVal: 2, format: 'decimal' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '41 anos', fighter2: '24 anos', note: 'Diferenca de 17 anos. Uma geracao inteira separa os dois.' },
        { label: 'Altura', fighter1: '1.68m (5\'6")', fighter2: '1.70m (5\'7")', note: 'Vallejos com leve vantagem de 2cm' },
        { label: 'Envergadura', fighter1: '178cm (70")', fighter2: '173cm (68")', note: 'Emmett com 5cm de vantagem na envergadura' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Switch', note: 'Vallejos troca de base naturalmente, criando angulos imprevisíveis' },
        { label: 'Academia', fighter1: 'Team Alpha Male, Sacramento', fighter2: 'Brothers of Life, Mar del Plata', note: null },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Poder de Nocaute', valueA: 88, valueB: 85, labelA: 'Muito Bom', labelB: 'Muito Bom', advantage: 'even', advantage_note: 'Emmett e conhecido por nocautear qualquer um com um unico soco. Vallejos tem poder impressionante para a idade, com 12 KOs em 17 vitorias. Equilibrado.' },
        { label: 'Volume de Striking', valueA: 55, valueB: 85, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Vallejos lanca significativamente mais strikes por minuto (5.10 vs 4.07) e com maior precisao. Emmett e mais economico mas menos ativo.' },
        { label: 'Versatilidade de Striking', valueA: 60, valueB: 82, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Vallejos e switch-hitter com arsenal diversificado: spinning backfist, overhand, combinacoes longas. Emmett depende mais do overhand right.' },
        { label: 'Defesa / Durabilidade', valueA: 72, valueB: 75, labelA: 'Bom', labelB: 'Muito Bom', advantage: 'fighter2', advantage_note: 'Emmett tem queixo testado mas absorve muitos golpes. Vallejos nunca foi derrubado no UFC e tem excelente defesa de takedown (89%).' },
        { label: 'Grappling / Anti-Wrestling', valueA: 40, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Emmett tem defesa de takedown de apenas 47% e foi finalizado duas vezes recentemente. Vallejos com 89% de defesa e wrestling solid.' },
        { label: 'QI de Luta / Experiencia', valueA: 80, valueB: 62, labelA: 'Muito Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Emmett tem 25 lutas profissionais e 16 no UFC. Ja enfrentou campeoes e contenders. Vallejos tem 18 lutas e apenas 3 no UFC. A experiencia e incomparavel.' },
      ],
      insight: 'O perfil de habilidades mostra uma dinamica clara: <strong class="text-blue-400">Vallejos</strong> e tecnicamente superior na maioria das metricas — volume, versatilidade, defesa. Mas <strong class="text-ufc-red">Emmett</strong> tem a experiencia de quem ja lutou contra os melhores do mundo. A questao e se a experiencia compensa as deficiencias tecnicas e fisicas de um lutador de 41 anos contra um fenomeno de 24.',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Emmett',
        ko_tko: { count: 7, percent: 37 },
        submission: { count: 2, percent: 10 },
        decision: { count: 10, percent: 53 },
        total_wins: 19,
      },
      fighter2: {
        nome: 'Vallejos',
        ko_tko: { count: 12, percent: 71 },
        submission: { count: 2, percent: 12 },
        decision: { count: 3, percent: 17 },
        total_wins: 17,
      },
      insight: 'O contraste e revelador: apesar da reputacao de nocauteador, 53% das vitorias de Emmett sao por decisao. Ele tem poder letal no overhand right, mas nao e um finalizador consistente. Vallejos, por outro lado, finaliza 71% das lutas por nocaute — e aos 24 anos, esse poder so tende a aumentar. Quando El Chino conecta, a luta geralmente acaba.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 8,
          danger_label: 'EQUILIBRADO COM PERIGO DUPLO',
          color: 'gold',
          title: 'A Zona de Fogo Cruzado',
          description: 'O primeiro round e explosivo para ambos. Vallejos tem 8 finalizacoes no primeiro round na carreira. Emmett tem o overhand right que nocauteou Mitchell. Os dois vao entrar agressivos. Quem conectar primeiro provavelmente vence. Esse round pode definir a luta inteira.',
        },
        {
          rounds: 'R2',
          danger_level: 7,
          danger_label: 'VANTAGEM VALLEJOS',
          color: 'green',
          title: 'O Round da Imposicao',
          description: 'Se o primeiro round nao definiu a luta, o segundo favorece Vallejos. Seu volume de strikes comeca a acumular dano, e a troca de base confunde a leitura de Emmett. O KO sobre Chikadze veio no segundo round. Se Emmett nao encontrou o timing do overhand, a luta comeca a escapar.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM CLARA VALLEJOS',
          color: 'green',
          title: 'Juventude Prevalece',
          description: 'O terceiro round e onde a diferenca de 17 anos pesa. Emmett historicamente desacelera em lutas longas e absorve muito dano (4.66 SApM). Vallejos, com cardio de 24 anos e ritmo alto, pode pressionar um Emmett cansado. Se a luta chegar aqui sem nocaute, Vallejos provavelmente esta na frente.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'Clock', title: 'Diferenca de idade de 17 anos', fighter: 'Emmett', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Emmett tem 41 anos, Vallejos tem 24. No MMA, essa diferenca e brutal. Reflexos, recuperacao entre rounds, capacidade de absorver dano — tudo diminui com a idade. Emmett esta em um ponto da carreira onde cada luta pode ser a ultima.' },
        { icon: 'TrendingUp', title: 'Momentum arrasador de 6 vitorias', fighter: 'Vallejos', risk_level: 'ENORME POSITIVO', risk_color: 'green', description: 'Seis vitorias consecutivas, tres no UFC, Newcomer of the Year 2025, KO viral contra Chikadze. Vallejos esta com confianca maxima e momentum impossivel de ignorar. Lutadores nessa fase tendem a performar acima das expectativas.' },
        { icon: 'AlertTriangle', title: 'Tres derrotas consecutivas', fighter: 'Emmett', risk_level: 'RISCO ALTO', risk_color: 'red', description: 'Emmett perdeu para Murphy (UD), Zalal (Sub R1) e Topuria (UD) antes de vencer Mitchell. Mas desde Mitchell, perdeu mais duas. O padrao de queda e claro. A confianca pode estar abalada apos a finalizacao rapida por Zalal.' },
        { icon: 'Zap', title: 'Poder de um soco (overhand right)', fighter: 'Emmett', risk_level: 'POSITIVO', risk_color: 'green', description: 'O overhand right de Emmett e uma arma de destruicao em massa. O nocaute sobre Mitchell provou que ele ainda tem poder devastador. Mesmo aos 41, esse golpe pode apagar qualquer peso pena do mundo. Vallejos nunca enfrentou esse nivel de poder.' },
        { icon: 'Brain', title: 'Primeiro main event da carreira', fighter: 'Vallejos', risk_level: 'RISCO BAIXO', risk_color: 'yellow', description: 'Vallejos nunca fez um main event no UFC. A pressao de ser cabeca de cartaz pode afetar lutadores jovens. Mas ele ja mostrou maturidade mental ao dominar lutas em todas as situacoes, incluindo uma vitoria por decisao de 3 rounds.' },
        { icon: 'Shield', title: 'Nunca foi derrubado no UFC', fighter: 'Vallejos', risk_level: 'POSITIVO', risk_color: 'green', description: 'Em tres lutas no UFC e no Contender Series, Vallejos nunca foi knockdown. Combinado com 89% de defesa de takedown, ele mostra solidez defensiva impressionante para alguem tao jovem. Se Emmett nao conectar o overhand limpo, vai ser dificil encontrar outra via.' },
        { icon: 'Target', title: 'Vulnerabilidade no grappling', fighter: 'Emmett', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'Emmett foi finalizado duas vezes nas ultimas tres lutas (Rodriguez por triangle, Zalal por armbar). A defesa de takedown de 47% e preocupante. Se Vallejos decidir misturar takedowns, Emmett pode estar em serios problemas no chao.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Emmett',
        total_probability: 22,
        scenarios: [
          { name: 'O Overhand da Sobrevivencia', probability: 12, method: 'KO R1', description: 'Emmett encontra a abertura para o overhand right letal, a mesma arma que apagou Bryce Mitchell. Vallejos entra confiante demais, avanca em linha reta, e Emmett encaixa o soco no momento exato. Um golpe. Uma carreira salva. O mesmo script que funcionou tantas vezes antes.' },
          { name: 'Experiencia no Clinch', probability: 6, method: 'TKO R1-R2', description: 'Emmett usa a experiencia para encurtar distancia, prender Vallejos contra a grade e trabalhar com dirty boxing. Socos curtos e cotoveladas no clinch, explorando a inexperiencia do argentino em lutas sujas contra veteranos.' },
          { name: 'A Decisao do Veterano', probability: 4, method: 'Decisao Unanime', description: 'Emmett usa o wrestling e a experiencia para controlar o ritmo, misturando takedowns e pressao contra a grade. Frustra o jogo de distancia de Vallejos e vence nos pontos com controle. Cenario improvavel dado o ritmo de Vallejos, mas possivel.' },
        ],
      },
      fighter2: {
        nome: 'Vallejos',
        total_probability: 75,
        scenarios: [
          { name: 'Tempestade Argentina', probability: 35, method: 'KO/TKO R1-R2', description: 'Vallejos pressiona desde o primeiro segundo com volume alto, trocando de base para confundir a defesa de Emmett. Combinacoes longas, spinning attacks, e puro volume sobrecarregam o veterano. O nocaute vem quando Emmett tenta responder e deixa uma abertura — exatamente como Chikadze.' },
          { name: 'Desgaste Implacavel', probability: 22, method: 'TKO R2-R3', description: 'Vallejos acumula dano gradual com volume superior (5.10 SApM vs 4.07). Emmett absorve golpes demais (4.66 SApM), e no segundo ou terceiro round, as pernas comecam a falhar. O arbitro para quando Emmett nao consegue mais se defender inteligentemente.' },
          { name: 'Dominancia por Pontos', probability: 18, method: 'Decisao Unanime', description: 'Vallejos usa footwork e troca de base para frustrar Emmett por tres rounds. Vence todos os rounds com volume superior, precisao de strikes, e controle do octogono. Emmett nunca encontra o timing do overhand e vai perdendo rounds progressivamente.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Kevin Vallejos',
      winner_side: 'fighter2',
      predicted_method: 'TKO no segundo round',
      confidence_score: 7,
      confidence_label: 'MEDIA-ALTA',
      explanation: 'Essa luta favorece fortemente Vallejos por multiplas razoes: (1) ele e 17 anos mais jovem com vantagens claras em velocidade, volume e cardio; (2) Emmett esta em declinio visivel com tres derrotas nas ultimas quatro lutas; (3) Vallejos tem volume superior (5.10 vs 4.07 SApM), melhor precisao (55% vs 36%), e melhor defesa. O unico cenario onde Emmett vence e se conectar o overhand right cedo — e esse risco nao pode ser ignorado. Emmett tem poder genuino. Mas estatisticamente e estilisticamente, Vallejos e o lutador superior neste momento.',
      x_factor: {
        title: 'O Switch-Stance de Vallejos',
        description: 'A capacidade de Vallejos de trocar entre ortodoxa e southpaw naturalmente cria problemas unicos para Emmett, que e um striker ortodoxo tradicional. Quando Vallejos muda de base, os angulos de ataque mudam completamente, e Emmett tem que reajustar sua defesa — algo dificil de fazer contra um oponente tao rapido e agressivo.',
      },
      upset_alert: {
        title: 'Upset Alert: Emmett por KO no Primeiro Round',
        description: 'Nunca subestime o overhand right de Josh Emmett. Ele pode nocautear qualquer peso pena do planeta com um unico soco, como fez com Bryce Mitchell. Se Vallejos entrar confiante demais e avancara sem respeitar o poder de Emmett, pode pagar caro. Vallejos nunca enfrentou esse nivel de poder concentrado em um unico golpe. Um momento de descuido pode encerrar a noite.',
      },
      probabilities: {
        fighter1: { nome: 'Emmett', percent: 22 },
        fighter2: { nome: 'Vallejos', percent: 75 },
        draw: 3,
      },
      value_picks: {
        moneyline: { pick: 'Vallejos ML', reasoning: 'Favorito pesado (-500 a -550), mas o preco reflete a realidade. Emmett esta em declinio e Vallejos em ascensao meteorca. O preco e alto demais para apostas de valor puro.' },
        method: { pick: 'Vallejos por KO/TKO', reasoning: '71% das vitorias de Vallejos sao por nocaute. Emmett absorve 4.66 strikes por minuto. A combinacao de volume e poder de Vallejos contra um Emmett que leva muitos golpes sugere finalizacao por strikes.' },
        over_under: { pick: 'Under 2.5 Rounds', rounds: 2.5, reasoning: 'Vallejos tem 8 finalizacoes no primeiro round. Emmett tem 7 KOs na carreira. Ambos sao finalizadores. A probabilidade de essa luta ir para decisao e baixa.' },
        best_value: 'Vallejos por KO/TKO no Round 2 (se disponivel). Combina o volume superior com o desgaste que Emmett acumula ao longo da luta.',
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Switch-Stance de Vallejos', icon: 'Target', description: 'Observe quantas vezes Vallejos troca de base nos primeiros 2 minutos. Se ele estiver alternando livremente entre ortodoxa e southpaw, e sinal de confianca total. Emmett historicamente luta melhor contra ortodoxos puros. O switch-stance e a chave para desmontar a defesa dele.' },
        { num: 2, title: 'O Overhand Right de Emmett', icon: 'Zap', description: 'A arma mais perigosa dessa luta. Emmett carrega o overhand com todo o corpo e gera poder absurdo para um peso pena. Se Vallejos se inclinar para frente ao atacar sem proteger o queixo do lado direito, o overhand pode aparecer. Esse golpe nocauteou Bryce Mitchell e Michael Johnson.' },
        { num: 3, title: 'Volume nos Primeiros 3 Minutos', icon: 'Activity', description: 'Se Vallejos conseguir lancar 30+ strikes significativos nos primeiros 3 minutos, Emmett esta em serios problemas. O volume alto e o que quebra a defesa de veteranos — eles nao conseguem acompanhar o ritmo. Fique de olho no contador de strikes da transmissao.' },
        { num: 4, title: 'Tentativas de Takedown', icon: 'Shield', description: 'Emmett tem apenas 47% de defesa de takedown. Se Vallejos decidir misturar takedowns no segundo round, pode surpreender Emmett e acumular controle. Nao e o estilo natural de Vallejos, mas seria uma opcao inteligente contra um Emmett cansado.' },
        { num: 5, title: 'Linguagem Corporal no Round 2', icon: 'Clock', description: 'Observe a postura de Emmett no segundo round. Se ele estiver com as maos baixas, respirando pela boca e andando para tras, a luta esta decidida. Emmett desacelera visivelmente em lutas longas. Se ainda estiver marchando para frente com poder, Vallejos precisa manter respeito.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'EMMETT VS VALLEJOS', content: 'UFC Fight Night\n14 de Marco, 2026\nUFC APEX, Las Vegas\n\nMain Event - Peso Pena\n3 Rounds', color: 'red' },
        { slide_number: 2, title: 'JOSH EMMETT', content: '19-6-0 | #11 Peso Pena | 41 anos\n\nOverhand right letal\nKO brutal sobre Bryce Mitchell\nEx-desafiante ao titulo interino\n1-4 nas ultimas 5 lutas', color: 'red' },
        { slide_number: 3, title: 'KEVIN VALLEJOS', content: '17-1-0 | #14 Peso Pena | 24 anos\n\n71% de vitorias por KO\nSpinning backfist KO sobre Giga Chikadze\n3-0 no UFC | Newcomer of the Year 2025\nNunca foi derrubado no UFC', color: 'blue' },
        { slide_number: 4, title: 'A CHAVE DA LUTA', content: 'VOLUME vs PODER.\n\nVallejos: 5.10 strikes/min, 55% precisao\nEmmett: 4.07 strikes/min, 36% precisao\n\nEmmett precisa de UM soco\nVallejos precisa de MUITOS\n\n17 anos de diferenca de idade', color: 'gold' },
        { slide_number: 5, title: 'PREVISAO', content: 'Vallejos por TKO no R2\nConfianca: MEDIA-ALTA\n\n75% Vallejos | 22% Emmett | 3% Empate\n\nA nova geracao chega sem pedir licenca', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Emmett vs Vallejos neste sabado no UFC APEX. #11 vs #14 nos penas. O veterano de 41 anos com o overhand mais perigoso da divisao contra o fenomeno argentino de 24 que nocauteou Giga Chikadze com um spinning backfist. Geracao vs geracao.' },
        { num: '2/5', text: 'Kevin Vallejos: 17-1, tres vitorias no UFC, ZERO knockdowns sofridos, 89% de defesa de takedown, Newcomer of the Year 2025. Aos 24 anos. O moleque e assustador. E agora vai enfrentar o maior teste da carreira no main event.' },
        { num: '3/5', text: 'Josh Emmett: 1 vitoria nas ultimas 4 lutas. Finalizado por Zalal em 98 segundos. Perdeu por decisao para Murphy e Topuria. MAS... o overhand right que nocauteou Mitchell em 2023 pode acontecer contra qualquer um. NUNCA subestime esse soco.' },
        { num: '4/5', text: 'O numero que define essa luta: 4.66. Strikes absorvidos por minuto pelo Emmett. Contra um cara que lanca 5.10 por minuto como Vallejos, isso e uma receita pra desastre. Vallejos pode sobrecarregar Emmett com puro volume.' },
        { num: '5/5', text: 'Minha previsao: Vallejos por TKO no R2. O volume, a juventude e o switch-stance de El Chino sao demais para um Emmett em declinio. MAS cuidado: o overhand right de Emmett pode mudar tudo em uma fracao de segundo. 75-22 Vallejos.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"O cara que tem o soco mais perigoso do peso pena contra o argentino de 24 anos que NINGUEM consegue parar. Main event sabado. Bora analisar."' },
        { time: '10-25s', title: 'Os Numeros', text: '"Emmett: 41 anos, 19-6, mas 1-4 nas ultimas cinco. Vallejos: 24 anos, 17-1, 3-0 no UFC, 71% de vitorias por nocaute. Newcomer of the Year. KO viral contra Giga Chikadze. Os numeros falam por si."' },
        { time: '25-40s', title: 'A Dinamica', text: '"Essa luta se resume a uma coisa: Emmett consegue conectar o overhand right antes de Vallejos sobrecarregar ele com volume? Vallejos lanca 5.10 strikes por minuto e Emmett absorve 4.66. Faz a conta. O volume vai ser avassalador."' },
        { time: '40-50s', title: 'Red Flags', text: '"Red flag pro Emmett: 47% de defesa de takedown, finalizado duas vezes nas ultimas tres lutas, 41 anos. Red flag pro Vallejos: nunca enfrentou ninguem tao perigoso quanto Emmett. Um momento de descuido e ele pode acordar no chao."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Minha previsao: Vallejos por TKO no segundo round. Mas o upset potential ta ai — Emmett so precisa de um soco. Comenta: experiencia do veterano ou juventude do El Chino?"' },
      ],
      tiktok: [
        { hook: 'O lutador de 24 anos que NINGUEM consegue parar no UFC vai enfrentar o veterano mais perigoso da divisao.', body: 'Vallejos: 17-1, tres KOs no UFC, spinning backfist viral contra Chikadze. Emmett: 41 anos, mas com o overhand right que pode nocautear qualquer ser humano. Um tem volume, outro tem poder. Geracao contra geracao.', cta: 'Comenta VALLEJOS ou EMMETT. Quem leva essa?' },
        { hook: 'Uma estatistica que ENTREGA o resultado dessa luta antes dela acontecer.', body: 'Emmett absorve 4.66 strikes por minuto. Vallejos lanca 5.10 por minuto com 55% de precisao. Faz a conta: Vallejos vai acertar MAIS do que Emmett consegue absorver. Em tres rounds, e dano demais para um cara de 41 anos aguentar.', cta: 'Segue pra mais analises que os outros canais nao fazem.' },
        { hook: 'A RED FLAG que ninguem esta falando sobre essa luta de sabado.', body: 'Emmett foi FINALIZADO duas vezes nas ultimas tres lutas. Rodriguez por triangle. Zalal por armbar em 98 segundos. A defesa de takedown dele e 47%. Vallejos tem 89%. Quando o striking nao funciona, Emmett nao tem plano B. E contra Vallejos, o striking NAO vai funcionar.', cta: 'Salva esse video e me fala depois da luta se eu acertei.' },
      ],
      headlines: [
        'Emmett vs Vallejos: O Overhand Right Contra a Tempestade Argentina',
        'UFC Fight Night: 41 Anos de Experiencia Contra 24 Anos de Fome',
        'Vallejos Pode Parar o Poder de Emmett? A Analise Completa',
        'O Fenomeno de Mar del Plata: Kevin Vallejos e o Main Event Mais Importante da Sua Vida',
        'Josh Emmett: Ultima Chance ou Ultimo Nocaute?',
        '5.10 vs 4.07: Os Numeros Que Explicam Por Que Vallejos e Favorito',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+400',
        fighter2_odds: '-525',
        fighter1_name: 'Emmett',
        fighter2_name: 'Vallejos',
        source: 'Media de DraftKings, FanDuel e BetMGM (marco 2026)',
      },
      edges: [
        { icon: 'Activity', titulo: 'Volume de Strikes Avassalador', stat_headline: '5.10 SIG STRIKES POR MINUTO VS 4.07 — VALLEJOS LANCA 25% MAIS', contexto: 'Vallejos lanca significativamente mais strikes por minuto do que Emmett, e com precisao muito superior (55% vs 36%). Contra um oponente que absorve 4.66 strikes por minuto, o volume de Vallejos pode ser devastador. A matematica e cruel para Emmett.', implicacao_aposta: 'Favorece apostas em Vallejos por KO/TKO. O volume alto combinado com a absorcao alta de Emmett sugere finalizacao por strikes como resultado mais provavel.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Clock', titulo: 'Diferenca de Idade de 17 Anos', stat_headline: '41 ANOS VS 24 ANOS — UMA GERACAO INTEIRA DE DIFERENCA', contexto: 'No MMA, a diferenca de idade e um fator critico. Reflexos, recuperacao, cardio — tudo diminui com a idade. Emmett esta em declinio visivel: 1-4 nas ultimas 5 lutas. A tendencia e clara e irreversivel.', implicacao_aposta: 'Reduz drasticamente as chances de Emmett em lutas longas. Props de "luta vai para decisao" sao arriscados para Emmett pois ele tende a perder nos pontos contra oponentes mais jovens e ativos.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Zap', titulo: 'Poder de Um Soco de Emmett', stat_headline: 'KO SOBRE BRYCE MITCHELL: OVERHAND RIGHT EM 1:57 DO R1', contexto: 'O overhand right de Emmett e uma arma genuina. O nocaute sobre Mitchell foi um dos mais brutais de 2023. Mesmo aos 41, o poder nao diminuiu. Vallejos nunca enfrentou esse nivel de poder concentrado em um unico golpe.', implicacao_aposta: 'Cria valor em Emmett por KO/TKO como underdog play. A +400, mesmo com probabilidade baixa (~20%), o retorno compensa o risco se voce acredita que ele pode conectar o overhand.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Shield', titulo: 'Defesa de Takedown Contrastante', stat_headline: '89% DE DEFESA DE TD (VALLEJOS) VS 47% (EMMETT)', contexto: 'A disparidade na defesa de takedown e enorme. Vallejos praticamente nao pode ser derrubado. Emmett, por outro lado, e vulneravel tanto no striking quanto no grappling — finalizado por submissao duas vezes nas ultimas tres lutas.', implicacao_aposta: 'Elimina o cenario de Emmett vencendo por controle e wrestling. Sem poder derrubar Vallejos, Emmett fica limitado ao striking — onde e estatisticamente inferior.', edge_level: 'forte', fighter_side: 'fighter2' },
        { icon: 'Target', titulo: 'Precisao de Strikes Extremamente Baixa', stat_headline: 'EMMETT COM APENAS 36% DE PRECISAO — UMA DAS MAIS BAIXAS DO UFC', contexto: 'A precisao de 36% de Emmett e problematica. Para um lutador que depende de conectar um unico golpe devastador, errar 64% das tentativas e um risco enorme. Contra Vallejos, que tem 65% de defesa de strikes, as chances de conectar o overhand limpo diminuem ainda mais.', implicacao_aposta: 'Reduz a probabilidade de KO de Emmett abaixo do que as odds de underdog sugerem. O overhand precisa ser perfeito, e com 36% de precisao, a janela e estreita.', edge_level: 'moderado', fighter_side: 'fighter2' },
      ],
      value_picks: [
        { tipo: 'Metodo', pick: 'Vallejos por KO/TKO', odds: '-200 (estimado)', confianca: 'alta', raciocinio: '71% das vitorias de Vallejos sao por nocaute. Emmett absorve 4.66 strikes por minuto. O volume alto combinado com a capacidade de finalizacao de Vallejos faz dessa a aposta mais logica. O preco e alto mas reflete a realidade.' },
        { tipo: 'Over/Under', pick: 'Under 2.5 Rounds', odds: '-115 (estimado)', confianca: 'media', edge_vs_mercado: 'Ambos sao finalizadores. 8 vitorias de Vallejos no R1. 7 KOs de Emmett na carreira. A probabilidade de decisao em 3 rounds e baixa.', raciocinio: 'Vallejos finaliza cedo, Emmett tem poder para nocautear cedo. A combinacao de dois lutadores agressivos com poder de finalizacao sugere que essa luta nao vai para os cartoes.' },
        { tipo: 'Moneyline', pick: 'Emmett ML (underdog value)', odds: '+400', confianca: 'baixa', edge_vs_mercado: 'A probabilidade real de Emmett (20-25%) pode estar levemente acima do que as odds implicam (~20%). Se voce acredita no poder do overhand, ha valor marginal.', raciocinio: 'Puro upset play. Emmett tem o poder de encerrar qualquer luta com um soco. A +400, se conectar o overhand em 1 de cada 4 lutas hipoteticas, o retorno e positivo. Alto risco, alta recompensa.' },
        { tipo: 'Duracao', pick: 'Vallejos vence no Round 2', odds: '+200 (estimado)', confianca: 'media', raciocinio: 'O Round 1 e imprevisivel pelo poder de Emmett. O Round 2 e onde Vallejos tende a finalizar (Chikadze foi no R2). O acumulo de dano do primeiro round + o volume superior criam a oportunidade perfeita para TKO no segundo.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Emmett por Decisao',
        descricao: 'Apostar em Emmett por decisao e a pior aposta possivel nessa luta. Emmett esta em declinio fisico, absorve muitos golpes, e nao tem o volume necessario para vencer Vallejos nos pontos. As unicas chances reais de Emmett sao por nocaute precoce. Se a luta passar do segundo round sem nocaute de Emmett, Vallejos provavelmente domina o restante. Emmett por decisao combina tudo que ele NAO faz bem.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
