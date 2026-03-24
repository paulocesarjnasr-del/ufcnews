import type { FullSingleAnalise } from '@/types/analise';

export const hughesRodriguezAnalise: FullSingleAnalise = {
  id: 'hughes-rodriguez-ufn-mar-14',
  evento_id: null,
  slug: 'hughes-rodriguez-ufn-mar-14',
  titulo: 'Hughes vs Rodriguez: A Revanche Que Ninguem Esperava',
  subtitulo: 'Sampage em sequencia de 3 vitorias reencontra La Fiera no APEX',
  lutador1_id: null,
  lutador2_id: null,
  artigo_conteudo: '',
  tactical_breakdown: { stats: [], radarData: [], taleOfTape: { fighter1: { altura: '', envergadura: '', idade: 0, academia: '' }, fighter2: { altura: '', envergadura: '', idade: 0, academia: '' } }, pathsToVictory: { fighter1: [], fighter2: [] }, dangerZones: [] },
  fight_prediction: { predictedWinner: 'fighter1', predictedMethod: 'Decision', confidence: 'MEDIA', fighter1Scenarios: [], fighter2Scenarios: [], keyFactors: [], xFactor: { title: '', description: '' } },
  fighter1_info: { nome: 'Sam Hughes', record: '11-6-0', ultimasLutas: [] },
  fighter2_info: { nome: 'Piera Rodriguez', record: '11-2-0', ultimasLutas: [] },
  evento_nome: 'UFC Fight Night: Emmett vs Vallejos',
  evento_data: '2026-03-14',
  evento_local: 'Meta APEX, Las Vegas',
  categoria_peso: 'Peso Palha Feminino',
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
      categoria_peso: 'Peso Palha Feminino (115 lbs)',
      num_rounds: 3,
      titulo_em_jogo: null,
      tagline: 'A REVANCHE: SAMPAGE CONTRA LA FIERA',
      tagline_sub: 'Quatro anos depois, as palhas se reencontram com narrativas completamente diferentes.',
      fighter1: {
        nome_completo: 'Sam "Sampage" Hughes',
        apelido: 'Sampage',
        sobrenome: 'Hughes',
        record: '11-6-0',
        ranking: 'Sem ranking WSW',
        info_extra: 'Davenport, EUA | 33 anos',
        imagem_fullbody_url: null,
      },
      fighter2: {
        nome_completo: 'Piera "La Fiera" Rodriguez',
        apelido: 'La Fiera',
        sobrenome: 'Rodriguez',
        record: '11-2-0',
        ranking: 'Sem ranking WSW',
        info_extra: 'Maracaibo, Venezuela | 33 anos',
        imagem_fullbody_url: null,
      },
    },

    narrativa: {
      html_content: `
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4">A Sobrevivente</h3>
        <p><strong class="text-ufc-red">Sam Hughes</strong> e a definicao de persistencia no UFC. Com um recorde geral de 11-6 e 6-5 no octogono, ela nunca foi a favorita, nunca foi a prospect hypeada, nunca foi o investimento de marketing. Mas aqui esta ela, em 2026, vindo de 3 vitorias consecutivas — a melhor sequencia da sua carreira no UFC. A vitoria por finalizacao sobre Shauna Bannon em setembro de 2025 mostrou uma lutadora reinventada, mais confiante e com um arsenal mais diverso. Treinando na Fortis MMA, Hughes encontrou consistencia pela primeira vez.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Fera Venezuelana</h3>
        <p><strong class="text-blue-400">Piera Rodriguez</strong> chegou ao UFC com tudo: invicta, contrato do Contender Series, e um estilo agressivo que a alcunha "La Fiera" resumia perfeitamente. Aos 11-2, a venezuelana tem um dos melhores recortes da divisao no papel. Mas a historia recente e mais complicada: uma desclassificacao por cabecada ilegal contra Ariane Carnelossi em maio de 2024 manchou sua reputacao, e embora tenha se recuperado com vitorias sobre Knutsson e Ketlen Souza, a consistencia de mentalidade ainda e uma questao.</p>
        <h3 class="font-display text-xl uppercase text-ufc-red mb-4 mt-8">A Revanche de Outubro 2022</h3>
        <p>Essas duas ja se enfrentaram. Em outubro de 2022, <strong class="text-blue-400">Rodriguez</strong> venceu <strong class="text-ufc-red">Hughes</strong> por decisao unanime numa luta onde o striking superior da venezuelana dominou por 3 rounds. Mas muito mudou desde entao. Hughes estava 3-4 no UFC naquela epoca, sem direcao clara. Agora vem de 3 vitorias consecutivas, incluindo uma finalizacao. Rodriguez vem de uma DQ controversa e duas decisoes apertadas. A dinamica inverteu — e essa revanche pode contar uma historia completamente diferente.</p>
      `,
      stakes: [
        { dimensao: 'Ranking', fighter1: 'Sem ranking (6-5 no UFC)', fighter2: 'Sem ranking (3-2 no UFC)' },
        { dimensao: 'Objetivo', fighter1: '4 vitorias seguidas, melhor fase da carreira UFC', fighter2: 'Vencer revanche, apagar DQ da memoria' },
        { dimensao: 'Narrativa', fighter1: 'Veterana persistente finalmente deslancha', fighter2: 'Prospect com recorde brilhante mas trajetoria instavel' },
        { dimensao: 'Risco', fighter1: 'Derrota na revanche confirma que Rodriguez e superior', fighter2: 'Derrota para alguem com .500 no UFC questiona o potencial' },
        { dimensao: 'Recompensa', fighter1: 'Vingar a derrota e ter melhor sequencia da carreira', fighter2: 'Vitoria dominante coloca de volta na rota de oponentes ranqueadas' },
      ],
      prognostico: {
        fighter1_vence: {
          titulo: 'SAMPAGE VINGA A DERROTA',
          subtitulo: 'Hughes mostra que a evolucao e real e vence a revanche.',
          consequencias: [
            { tag: 'SEQUENCIA', texto: '4 vitorias consecutivas pela primeira vez no UFC. A melhor fase da carreira, aos 33 anos, mostra que a mudanca para Fortis MMA funcionou.' },
            { tag: 'VINGANCA', texto: 'Vencer a lutadora que a derrotou em 2022 e uma validacao poderosa. Mostra crescimento real e adaptacao.' },
            { tag: 'FUTURO', texto: 'Com 4 seguidas, pode pedir oponente ranqueada pela primeira vez. A carreira ganha novo capitulo.' },
          ],
          proxima_luta: 'Oponente ranqueada #12-15 do peso palha',
        },
        fighter2_vence: {
          titulo: 'LA FIERA CONFIRMA A SUPERIORIDADE',
          subtitulo: 'Rodriguez prova que a primeira vitoria nao foi acaso.',
          consequencias: [
            { tag: 'DOMINANCIA', texto: '2-0 contra Hughes confirma que e a lutadora superior. Recorde vai para 4-2 no UFC.' },
            { tag: 'REABILITACAO', texto: 'Depois da DQ controversa, uma vitoria convincente na revanche limpa a imagem.' },
            { tag: 'POTENCIAL', texto: 'Com 11-2 e 33 anos, ainda tem janela para alcancar o top 15 das palhas.' },
          ],
          proxima_luta: 'Oponente ranqueada #10-15 do peso palha',
        },
      },
    },

    momento_atual: {
      fighter1: {
        nome: 'Sam Hughes',
        color: 'red',
        recent_fights: [
          { date: 'Set 2025', opponent: 'Shauna Bannon', result: 'W', method: 'Sub R2 (mata-leao)', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Primeira finalizacao no UFC. Mata-leao no segundo round mostrou evolucao no grappling. Confianca em alta.' },
          { date: 'Mar 2025', opponent: 'Stephanie Luciano', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada por decisao dividida. Lutou com garra mas nao dominou. Persistencia fez a diferenca.' },
          { date: 'Ago 2024', opponent: 'Viktoriia Dudakova', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Vitoria competitiva por decisao dividida. Iniciou a sequencia de vitorias que redefiniu sua carreira no UFC.' },
          { date: 'Out 2022', opponent: 'Piera Rodriguez', result: 'L', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Perdeu a primeira luta contra Rodriguez por decisao unanime. Striking da venezuelana dominou por 3 rounds.' },
        ],
        momentum_score: 7,
        momentum_label: 'Em Alta',
        momentum_trend: 'ascending',
        momentum_note: 'Hughes vive a melhor fase da carreira. 3 vitorias consecutivas pela primeira vez no UFC, incluindo sua primeira finalizacao na organizacao. A mudanca para Fortis MMA trouxe consistencia e evolucao tecnica. Porem, duas das tres vitorias foram por decisao dividida, o que sugere lutas apertadas que poderiam ter ido para o outro lado. A evolucao e real, mas o nivel de dominio ainda nao e absoluto.',
      },
      fighter2: {
        nome: 'Piera Rodriguez',
        color: 'blue',
        recent_fights: [
          { date: 'Ago 2025', opponent: 'Ketlen Souza', result: 'W', method: 'Decisao Dividida', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria apertada por decisao dividida. Recuperou-se da DQ mas nao dominou completamente.' },
          { date: 'Dez 2024', opponent: 'Josefine Knutsson', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 1, quality_label: 'Ruim', note: 'Vitoria convincente por decisao unanime (30-27 unanime). Melhor performance recente, mostrando striking limpo e controle.' },
          { date: 'Mai 2024', opponent: 'Ariane Carnelossi', result: 'L', method: 'DQ (cabecada ilegal)', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Desclassificacao por cabecada ilegal no segundo round. Controversa e danosa para reputacao. Estava competitiva antes da DQ.' },
          { date: 'Out 2022', opponent: 'Sam Hughes', result: 'W', method: 'Decisao Unanime', opponent_rank: 'N/R', quality_score: 2, quality_label: 'Medio', note: 'Dominou Hughes por 3 rounds com striking superior. Victoria clara nos cartoes.' },
        ],
        momentum_score: 5,
        momentum_label: 'Em Recuperacao',
        momentum_trend: 'stable',
        momentum_note: 'Rodriguez esta em modo de recuperacao apos a DQ controversa contra Carnelossi. As duas vitorias subsequentes (Knutsson por unanime, Souza por dividida) mostram que ela esta competitiva, mas nao dominante. A DQ manchou a narrativa e a confianca pode estar abalada. O recorde de 11-2 parece melhor do que a trajetoria recente sugere.',
      },
    },

    nivel_competicao: {
      fighter1: {
        nome: 'Hughes',
        media_oponentes: 1.5,
        media_oponentes_label: 'Ruim',
        aproveitamento: '3W-0L ultimas 3',
        contra_top5: '0W-0L',
      },
      fighter2: {
        nome: 'Rodriguez',
        media_oponentes: 1.5,
        media_oponentes_label: 'Ruim',
        aproveitamento: '2W-1L ultimas 3',
        contra_top5: '0W-0L',
      },
      oponentes_em_comum_count: { fighter1: 1, fighter2: 1 },
      oponentes_em_comum_note: 'Hughes e Rodriguez ja se enfrentaram em outubro de 2022, com Rodriguez vencendo por decisao unanime. Essa revanche e o oponente em comum mais direto possivel. Ambas estao na faixa inferior da divisao em termos de competicao, sem vitoria contra oponentes ranqueadas.',
    },

    oponente_comum: {
      oponente_nome: 'A Primeira Luta (Out 2022)',
      fighter1_result: {
        resultado: 'Derrota por Decisao Unanime',
        metodo: 'Decisao Unanime (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Rodriguez dominou com striking mais limpo e controle de distancia. Hughes tentou levar a luta pro chao mas nao conseguiu implementar o grappling efetivamente. A diferenca de striking foi clara por 3 rounds.',
        performance: 'Hughes foi competitiva mas nunca realmente ameacou. O striking de Rodriguez era mais preciso e o footwork manteve Hughes a distancia. A derrota foi clara nos cartoes.',
        evento: 'UFC Fight Night',
        data: 'Out 2022',
      },
      fighter2_result: {
        resultado: 'Vitoria por Decisao Unanime',
        metodo: 'Decisao Unanime (29-28, 29-28, 30-27)',
        duracao: '3 rounds (15:00)',
        contexto: 'Rodriguez usou o striking agressivo e a distancia para controlar toda a luta. Manteve Hughes longe com jabs e combinacoes, pontuando consistentemente em todos os rounds.',
        performance: 'Rodriguez lutou sua melhor luta, usando o striking para dominar. Nao precisou de grappling ou finalizacao — o striking foi suficiente para uma decisao unanime convincente.',
        evento: 'UFC Fight Night',
        data: 'Out 2022',
      },
      insight: 'Na primeira luta, Rodriguez dominou com striking. Mas MUITO mudou desde entao. Hughes agora treina na Fortis MMA, tem 3 vitorias seguidas incluindo uma finalizacao, e mostra confianca que nao existia em 2022. Rodriguez, por outro lado, passou por uma DQ controversa e vitorias apertadas. A dinamica da revanche e completamente diferente da primeira luta.',
    },

    comparacao_estatistica: {
      stats: [
        { label: 'Sig. Strikes por Minuto', valueA: 3.50, valueB: 4.80, maxVal: 7, format: 'decimal', note: 'Rodriguez e significativamente mais ativa no striking. Volume alto e agressividade sao sua marca.' },
        { label: 'Precisao de Strikes (%)', valueA: 42, valueB: 47, maxVal: 100, format: 'percent', note: 'Rodriguez ligeiramente mais precisa. Seu striking e a arma principal.' },
        { label: 'Strikes Absorvidos/Min', valueA: 3.80, valueB: 4.20, maxVal: 6, format: 'decimal', reverseWinner: true, note: 'Ambas absorvem muito dano. Lutas de Hughes tendem a ser guerras de atrito.' },
        { label: 'Defesa de Strikes (%)', valueA: 50, valueB: 45, maxVal: 100, format: 'percent', note: 'Hughes com leve vantagem defensiva. Rodriguez e mais agressiva mas se expoe mais.' },
        { label: 'Takedowns por 15 Min', valueA: 2.50, valueB: 1.00, maxVal: 5, format: 'decimal', note: 'Hughes busca o chao mais frequentemente. O grappling evoluiu com a Fortis MMA.' },
        { label: 'Precisao de Takedown (%)', valueA: 40, valueB: 25, maxVal: 100, format: 'percent', note: 'Hughes converte mais takedowns, reflexo do foco em grappling.' },
        { label: 'Defesa de Takedown (%)', valueA: 60, valueB: 58, maxVal: 100, format: 'percent', note: 'Ambas com defesa mediana. Nenhuma e excepcional no takedown defense.' },
        { label: 'Submissoes por 15 Min', valueA: 0.50, valueB: 0.00, maxVal: 2, format: 'decimal', note: 'Hughes agora tem ameaca de submissao apos a finalizacao de Bannon. Rodriguez nunca buscou subs.' },
      ],
      tale_of_tape: [
        { label: 'Idade', fighter1: '33 anos', fighter2: '33 anos', note: 'Mesma idade' },
        { label: 'Altura', fighter1: '1.65m (5\'5")', fighter2: '1.60m (5\'3")', note: 'Hughes 5cm mais alta' },
        { label: 'Envergadura', fighter1: '163cm (64")', fighter2: '161cm (63.5")', note: 'Praticamente igual' },
        { label: 'Stance', fighter1: 'Ortodoxa', fighter2: 'Ortodoxa', note: 'Mesma base' },
        { label: 'Academia', fighter1: 'Fortis MMA, Dallas', fighter2: 'Xtreme Couture, Las Vegas', note: 'Ambas em academias de elite' },
      ],
    },

    perfil_habilidades: {
      skills: [
        { label: 'Striking / Trocacao', valueA: 50, valueB: 65, labelA: 'Medio', labelB: 'Bom', advantage: 'fighter2', advantage_note: 'Rodriguez e a melhor striker das duas. 45% de KOs (5 TKOs) mostra poder real. Dominou na primeira luta com striking. Hughes e mais limitada em pe.' },
        { label: 'Grappling / Submissoes', valueA: 58, valueB: 35, labelA: 'Bom', labelB: 'Ruim', advantage: 'fighter1', advantage_note: 'Hughes evoluiu significativamente — finalizou Bannon por mata-leao. 4 submissoes na carreira. Rodriguez nao tem jogo de chao ofensivo e nunca submeteu ninguem.' },
        { label: 'Wrestling / Takedowns', valueA: 55, valueB: 40, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Hughes busca takedowns mais frequentemente (2.50/15min vs 1.00). O treinamento na Fortis MMA melhorou o wrestling significativamente desde a primeira luta.' },
        { label: 'Cardio / Resistencia', valueA: 65, valueB: 62, labelA: 'Bom', labelB: 'Bom', advantage: 'even', advantage_note: 'Ambas vao a decisao regularmente. Hughes com 3 decisoes nas ultimas 3. Rodriguez com lutas de 3 rounds consistentes. Cardio similar.' },
        { label: 'Durabilidade / Queixo', valueA: 62, valueB: 55, labelA: 'Bom', labelB: 'Bom', advantage: 'fighter1', advantage_note: 'Hughes nunca foi nocauteada no UFC apesar de absorver muito dano. Rodriguez sofreu DQ e TKO, mostrando vulnerabilidades em momentos de pressao.' },
        { label: 'Mentalidade / Compostura', valueA: 60, valueB: 48, labelA: 'Bom', labelB: 'Medio', advantage: 'fighter1', advantage_note: 'Hughes vem com confianca de 3 vitorias seguidas. Rodriguez vem da DQ por cabecada ilegal — um erro de compostura grave que ainda pode pesar psicologicamente.' },
      ],
      insight: 'O perfil mostra uma luta de contrastes claros. <strong class="text-blue-400">Rodriguez</strong> e superior no striking e na trocacao pura. <strong class="text-ufc-red">Hughes</strong> evoluiu em grappling, wrestling e mentalidade desde a primeira luta. A questao central e: a evolucao de Hughes no chao e suficiente para anular o striking de Rodriguez? E Rodriguez consegue manter a compostura apos a controversia da DQ?',
    },

    distribuicao_vitorias: {
      fighter1: {
        nome: 'Hughes',
        ko_tko: { count: 2, percent: 18 },
        submission: { count: 4, percent: 36 },
        decision: { count: 5, percent: 45 },
        total_wins: 11,
      },
      fighter2: {
        nome: 'Rodriguez',
        ko_tko: { count: 5, percent: 45 },
        submission: { count: 0, percent: 0 },
        decision: { count: 6, percent: 55 },
        total_wins: 11,
      },
      insight: 'O mesmo numero de vitorias (11), mas distribuicoes muito diferentes. Hughes e mais equilibrada com 36% de submissoes e 45% de decisoes — mostra versatilidade crescente. Rodriguez tem 45% de KOs e 55% de decisoes mas ZERO submissoes — unidimensional no chao. Se a luta for pro chao, Hughes tem armas e Rodriguez nao.',
    },

    danger_zones: {
      zones: [
        {
          rounds: 'R1',
          danger_level: 6,
          danger_label: 'VANTAGEM RODRIGUEZ',
          color: 'green',
          title: 'O Striking Agressivo',
          description: 'Rodriguez e mais perigosa no striking e provavelmente vai comecar forte, como fez na primeira luta. Com 4.80 strikes por minuto e 47% de precisao, a pressao de trocacao vai ser intensa. Hughes precisa sobreviver os primeiros minutos sem se envolver em guerras de striking e buscar o clinch ou takedown rapidamente.',
        },
        {
          rounds: 'R2',
          danger_level: 5,
          danger_label: 'EQUILIBRADO',
          color: 'gold',
          title: 'O Round Pivotal',
          description: 'O segundo round e onde a evolucao de Hughes pode aparecer. Se ela comecou a implementar takedowns e grappling no R1, o segundo round e para consolidar. Se Rodriguez dominou o R1 com striking, Hughes precisa de urgencia. A compostura de Rodriguez (pos-DQ) tambem sera testada se a luta nao estiver indo no seu plano.',
        },
        {
          rounds: 'R3',
          danger_level: 6,
          danger_label: 'VANTAGEM HUGHES',
          color: 'red',
          title: 'A Resiliencia da Veterana',
          description: 'Hughes e a melhor no terceiro round. Sua resiliencia e vontade de vencer crescem quando as lutas ficam duras. A vitoria por dividida contra Dudakova e Luciano mostraram que ela vence rounds finais. Se o grappling e os takedowns estiverem funcionando, o terceiro round e onde Hughes consolida a revanche.',
        },
      ],
    },

    intangiveis: {
      items: [
        { icon: 'TrendingUp', title: '3 vitorias consecutivas (melhor fase da carreira)', fighter: 'Hughes', risk_level: 'POSITIVO', risk_color: 'green', description: 'Hughes nunca teve uma sequencia assim no UFC. A confianca esta no pico, o treinamento na Fortis MMA trouxe resultados concretos e ela sabe que esta melhor do que em outubro de 2022. O momentum psicologico e real.' },
        { icon: 'AlertTriangle', title: 'DQ por cabecada ilegal (erro de compostura)', fighter: 'Rodriguez', risk_level: 'RISCO MEDIO', risk_color: 'yellow', description: 'A desclassificacao contra Carnelossi em maio de 2024 por cabecada ilegal foi um erro grave de compostura. Em momentos de pressao, Rodriguez perdeu o controle. Essa sombra pode pesar psicologicamente, especialmente em uma revanche.' },
        { icon: 'Zap', title: '45% de KOs (poder de nocaute real)', fighter: 'Rodriguez', risk_level: 'POSITIVO', risk_color: 'green', description: 'Rodriguez tem poder genuino para o peso palha. 5 KOs/TKOs em 11 vitorias e impressionante. Se ela encontrar o timing no striking, pode terminar a luta a qualquer momento.' },
        { icon: 'Brain', title: 'Evolucao na Fortis MMA', fighter: 'Hughes', risk_level: 'POSITIVO', risk_color: 'green', description: 'A mudanca para Fortis MMA foi transformadora. Hughes finalizou pela primeira vez no UFC (Bannon por mata-leao), mostrando que o grappling evoluiu significativamente. A preparacao tatica tambem melhorou visivelmente.' },
        { icon: 'Shield', title: 'Revanche — conhecimento mutuo', fighter: 'Hughes', risk_level: 'POSITIVO', risk_color: 'green', description: 'Hughes perdeu a primeira luta. Isso significa que ela sabe exatamente o que deu errado e teve 4 anos para corrigir. Rodriguez, por outro lado, pode entrar confiante demais pensando que vai repetir o resultado — e isso pode ser uma armadilha.' },
        { icon: 'MapPin', title: 'Rodriguez treina em Vegas (casa)', fighter: 'Rodriguez', risk_level: 'POSITIVO', risk_color: 'green', description: 'Rodriguez treina na Xtreme Couture em Las Vegas. Lutar no APEX e praticamente em casa: sem jet lag, sem corte de peso em ambiente estranho, com equipe completa. Vantagem logistica pequena mas real.' },
      ],
    },

    caminhos_vitoria: {
      fighter1: {
        nome: 'Hughes',
        total_probability: 52,
        scenarios: [
          { name: 'A Vinganca pelo Grappling', probability: 22, method: 'Decisao Unanime', description: 'Hughes muda completamente a estrategia em relacao a primeira luta. Em vez de trocar em pe, busca takedowns e clinch desde o primeiro minuto. O grappling evoluido da Fortis MMA permite controlar Rodriguez no chao, acumular tempo de controle e pontuar nos cartoes round a round.' },
          { name: 'A Finalizacao da Revanche', probability: 15, method: 'Sub R2-R3', description: 'Hughes consegue o takedown e encontra as costas de Rodriguez. Usando o mata-leao que funcionou contra Bannon, finaliza a revanche da forma mais dramatica possivel. Rodriguez, sem jogo defensivo no chao, nao consegue escapar.' },
          { name: 'A Guerra de Vontade', probability: 15, method: 'Decisao Dividida', description: 'Hughes absorve o striking de Rodriguez mas compensa com takedowns, clinch e resiliencia no terceiro round. Uma luta apertada que poderia ir para qualquer lado, mas a energia e vontade de Hughes no R3 convencem os juizes por margem minima.' },
        ],
      },
      fighter2: {
        nome: 'Rodriguez',
        total_probability: 45,
        scenarios: [
          { name: 'La Fiera Domina de Novo', probability: 20, method: 'Decisao Unanime', description: 'Rodriguez repete a formula da primeira luta: striking superior, footwork limpo e controle de distancia. Defende os takedowns de Hughes e pontua com combinacoes e poder. Dominacao clara por 3 rounds como em outubro de 2022.' },
          { name: 'O Nocaute da Fera', probability: 15, method: 'TKO R1-R2', description: 'Rodriguez encontra o timing cedo com um counter ou combinacao pesada. O poder de 45% de KOs aparece e Hughes, que absorve muitos strikes (3.80/min), sucumbe ao volume e poder superior. O striking decide a luta.' },
          { name: 'A Decisao Apertada', probability: 10, method: 'Decisao Dividida', description: 'Rodriguez vence os dois primeiros rounds com striking mas Hughes comeca a ameacar no terceiro. Uma luta competitiva onde Rodriguez faz o suficiente nos primeiros rounds para sobreviver a pressao final de Hughes.' },
        ],
      },
    },

    previsao_final: {
      winner_name: 'Sam Hughes',
      winner_side: 'fighter1',
      predicted_method: 'Decisao ou Submissao tardia',
      confidence_score: 5,
      confidence_label: 'MEDIA',
      explanation: 'A primeira luta favoreceu Rodriguez porque Hughes tentou competir no striking. Agora, com a evolucao na Fortis MMA, Hughes tem armas no grappling que nao existiam em 2022. O gameplan vai ser diferente: takedowns, clinch e grappling em vez de trocacao. Rodriguez ainda e melhor em pe, mas se Hughes conseguir levar a luta pro chao, tem vantagem significativa — Rodriguez nunca finalizou ninguem (0 submissoes) e nao tem jogo de chao ofensivo. A confianca e MEDIA porque Rodriguez e genuinamente perigosa no striking e ja venceu essa luta uma vez.',
      x_factor: {
        title: 'A Evolucao na Fortis MMA',
        description: 'A mudanca para Fortis MMA transformou Hughes. A primeira finalizacao no UFC (mata-leao sobre Bannon) nao foi acidente — foi resultado de treinamento focado. Se Hughes implementar o novo grappling contra Rodriguez, que tem ZERO finalizacoes e nenhum jogo de chao, a dinamica da revanche muda completamente. Rodriguez pode vencer a versao 2022 de Hughes, mas essa e a versao 2026.',
      },
      upset_alert: {
        title: 'Upset Alert: Rodriguez por TKO',
        description: 'Rodriguez tem poder real (45% de KOs) e ja dominou Hughes no striking. Se Hughes nao conseguir implementar o grappling e ficar trocando, pode ser nocauteada. Hughes absorve 3.80 strikes por minuto com 50% de defesa — contra uma striker agressiva como Rodriguez, isso e perigoso.',
      },
      probabilities: {
        fighter1: { nome: 'Hughes', percent: 52 },
        fighter2: { nome: 'Rodriguez', percent: 45 },
        draw: 3,
      },
    },

    o_que_observar: {
      points: [
        { num: 1, title: 'O Gameplan de Hughes: Chao ou Pe?', icon: 'Target', description: 'A decisao mais importante da luta e de Hughes. Se ela tentar trocar em pe como em 2022, provavelmente perde de novo. Se buscar takedowns e grappling desde o primeiro segundo, a revanche pode ter resultado diferente. Observe os primeiros 60 segundos para entender o gameplan.' },
        { num: 2, title: 'A Compostura de Rodriguez', icon: 'Brain', description: 'A DQ por cabecada contra Carnelossi levantou questoes sobre a compostura de Rodriguez em momentos de pressao. Observe se ela mantem a calma nos momentos dificeis da luta ou se perde o controle quando as coisas nao vao como planejado.' },
        { num: 3, title: 'Defesa de Takedown de Rodriguez', icon: 'Shield', description: 'Rodriguez defendeu 58% dos takedowns, o que e mediano. Se Hughes buscar o chao agressivamente, observe quantos takedowns Rodriguez consegue defender. Se cair mais de uma vez por round, e sinal de que Hughes esta implementando o plano.' },
        { num: 4, title: 'O Terceiro Round', icon: 'Clock', description: 'Hughes e a melhor no terceiro round. Venceu rounds finais contra Dudakova e Luciano em decisoes divididas. Se a luta chegar equilibrada ao R3, observe se Hughes acelera e mostra a resiliencia que a define.' },
        { num: 5, title: 'O Clinch e a Grade', icon: 'Zap', description: 'O APEX e pequeno, o que aumenta o tempo na grade. Hughes vai querer clinch e controle contra a grade. Rodriguez vai querer se separar e trocar a distancia. Quem controla o clinch provavelmente controla a luta.' },
      ],
    },

    creator_kit: {
      instagram: [
        { slide_number: 1, title: 'HUGHES VS RODRIGUEZ 2', content: 'UFC Fight Night\n14 de Marco, 2026\nMeta APEX, Las Vegas\n\nPeso Palha Feminino\n3 Rounds\n\nREVANCHE', color: 'red' },
        { slide_number: 2, title: 'SAM HUGHES', content: '11-6-0 | Sampage\n\n3 vitorias consecutivas\nPrimeira finalizacao no UFC (2025)\nEvoluiu na Fortis MMA\nPerdeu a primeira luta em 2022', color: 'red' },
        { slide_number: 3, title: 'PIERA RODRIGUEZ', content: '11-2-0 | La Fiera\n\n45% de vitorias por KO\nVenceu a primeira luta em 2022\nDQ controversa em 2024\n3-2 no UFC', color: 'blue' },
        { slide_number: 4, title: 'PREVISAO', content: 'Hughes por Decisao ou Sub\nConfianca: MEDIA\n\n52% Hughes | 45% Rodriguez | 3% Empate\n\nA Fortis MMA mudou tudo', color: 'gold' },
      ],
      twitter: [
        { num: '1/5', text: 'Hughes vs Rodriguez 2 sabado no APEX. A REVANCHE. Rodriguez venceu em 2022 por decisao unanime com striking. Mas MUITO mudou. Hughes: 3 vitorias seguidas, primeira finalizacao no UFC, Fortis MMA. Rodriguez: DQ controversa, vitorias apertadas.' },
        { num: '2/5', text: 'Sam Hughes: 11-6, 6-5 no UFC. Parece mediano no papel. Mas 3 vitorias seguidas, finalizacao por mata-leao, treinamento na Fortis MMA. A melhor versao de Hughes que ja existiu. Aos 33, finalmente encontrou consistencia.' },
        { num: '3/5', text: 'Piera Rodriguez: 11-2, 3-2 no UFC. Recorde bonito mas trajetoria complicada. DQ por cabecada ilegal. Duas decisoes divididas. 45% de KOs mostra poder, mas a compostura e questionavel. La Fiera precisa da melhor versao.' },
        { num: '4/5', text: 'A chave da revanche: Hughes vai buscar o CHAO dessa vez? Em 2022 ela tentou trocar e perdeu. Agora tem grappling da Fortis MMA e uma finalizacao no UFC. Rodriguez tem ZERO submissoes. Se for pro chao, Hughes domina.' },
        { num: '5/5', text: 'Previsao: Hughes por decisao ou sub tardia. 52-45. A evolucao e real e o grappling muda a dinamica. Mas Rodriguez tem poder (45% KOs) e ja venceu. Qualquer resultado e possivel. REVANCHE pura.' },
      ],
      video: [
        { time: '0-10s', title: 'Hook', text: '"Em 2022, Rodriguez DOMINOU Hughes por 3 rounds. Decisao unanime. Agora, 4 anos depois, Hughes vem de 3 vitorias seguidas e uma FINALIZACAO. A revanche que ninguem esperava. Tudo mudou."' },
        { time: '10-25s', title: 'O Que Mudou', text: '"Hughes mudou para a Fortis MMA. Primeira finalizacao no UFC — mata-leao sobre Bannon. 3 vitorias seguidas pela primeira vez. Rodriguez? DQ por cabecada ilegal. Vitorias apertadas. A dinamica INVERTEU completamente."' },
        { time: '25-40s', title: 'A Chave', text: '"A primeira luta foi no striking — e Rodriguez e melhor em pe. Mas se Hughes buscar o CHAO? Rodriguez tem ZERO submissoes na carreira. ZERO. Nao tem jogo de chao ofensivo. Hughes agora tem grappling. A estrategia vai ser completamente diferente."' },
        { time: '40-50s', title: 'O X-Factor', text: '"A compostura de Rodriguez. A DQ por cabecada contra Carnelossi mostrou que em momentos de pressao, ela perde o controle. Hughes vai pressionar no grappling, na grade, no clinch. Como Rodriguez reage pode decidir tudo."' },
        { time: '50-60s', title: 'Previsao + CTA', text: '"Hughes por decisao. A evolucao e real. 52-45. Mas cuidado: Rodriguez tem 45% de KOs. Se Hughes ficar trocando, pode perder de novo. Comenta: evolucao ou repeticao?"' },
      ],
      tiktok: [
        { hook: 'Ela PERDEU em 2022. Agora volta com 3 vitorias seguidas e uma FINALIZACAO.', body: 'Sam Hughes perdeu pra Rodriguez por decisao unanime. Mudou pra Fortis MMA. 3 vitorias seguidas. Primeira finalizacao no UFC. Agora a revanche. Rodriguez? DQ por cabecada, vitorias apertadas. A dinamica inverteu COMPLETAMENTE.', cta: 'Quem vence a revanche? Comenta SAMPAGE ou LA FIERA.' },
        { hook: 'ZERO submissoes em 11 vitorias. ZERO.', body: 'Piera Rodriguez nunca submeteu NINGUEM. 11 vitorias: 5 KOs, 6 decisoes, ZERO subs. Contra Hughes, que agora tem grappling da Fortis MMA e finalizou no UFC pela primeira vez, isso e um PROBLEMA. Se a luta for pro chao, Rodriguez nao tem nada.', cta: 'Segue pra mais analises do card de sabado.' },
        { hook: 'A REVANCHE que pode mudar TUDO no peso palha.', body: 'Rodriguez ganhou em 2022 com striking. Hughes mudou de academia. 3 vitorias seguidas. Primeira finalizacao. Nova estrategia. Rodriguez passa por DQ controversa e vitorias apertadas. Quem REALMENTE evoluiu? A resposta vem sabado.', cta: 'Salva e assiste. Vai ser especial.' },
      ],
      headlines: [
        'Hughes vs Rodriguez 2: A Revanche Que Redefine Carreiras',
        'De 0-2 a 3 Vitorias Seguidas: A Reinvencao de Sam Hughes',
        'Rodriguez: O Recorde de 11-2 Esconde Problemas Reais?',
        'Fortis MMA Mudou Tudo: O Grappling Que Nao Existia em 2022',
        'A Revanche do Peso Palha: Quem Evoluiu Mais em 4 Anos?',
      ],
    },

    betting_value: null,

    radar_apostador: {
      odds: {
        fighter1_odds: '+110',
        fighter2_odds: '-130',
        fighter1_name: 'Hughes',
        fighter2_name: 'Rodriguez',
        source: 'Estimativa baseada em perfil de odds (marco 2026)',
      },
      edges: [
        { icon: 'TrendingUp', titulo: 'Sequencia de 3 Vitorias de Hughes', stat_headline: 'MELHOR FASE DA CARREIRA COM 3 VITORIAS CONSECUTIVAS + 1a FINALIZACAO UFC', contexto: 'Hughes nunca esteve tao bem. 3 vitorias seguidas, primeira finalizacao no UFC, treinamento na Fortis MMA. A evolucao e mensuravel e real. A confianca psicologica de quem vem vencendo e poderosa em revanche.', implicacao_aposta: 'Como underdog leve a +110, Hughes oferece valor considerando a evolucao desde a primeira luta. O mercado pode estar sobrevalorizando o resultado de 2022.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'AlertTriangle', titulo: 'A DQ de Rodriguez', stat_headline: 'DESCLASSIFICACAO POR CABECADA ILEGAL CONTRA CARNELOSSI (MAI 2024)', contexto: 'A DQ mostrou um problema de compostura em momentos de pressao. Em uma revanche onde Hughes vai pressionar com grappling e clinch, a mentalidade de Rodriguez sera testada. Erros de compostura podem reaparecer.', implicacao_aposta: 'Cria incerteza sobre a confiabilidade de Rodriguez em lutas dificeis. Reduz o valor de apostar nela como favorita.', edge_level: 'moderado', fighter_side: 'fighter1' },
        { icon: 'Zap', titulo: 'Poder de Striking de Rodriguez', stat_headline: '45% DE VITORIAS POR KO/TKO (5 DE 11)', contexto: 'Rodriguez tem poder real. Dominou Hughes na primeira luta com striking. 4.80 strikes por minuto e volume alto. Se Hughes ficar em pe, o cenario da primeira luta pode se repetir.', implicacao_aposta: 'Se voce acredita que Hughes vai trocar em pe novamente, Rodriguez e a aposta. Mas se Hughes mudar a estrategia para grappling, esse edge perde relevancia.', edge_level: 'moderado', fighter_side: 'fighter2' },
        { icon: 'Shield', titulo: 'Zero Submissoes de Rodriguez', stat_headline: '0 FINALIZACOES POR SUBMISSAO EM 11 VITORIAS', contexto: 'Rodriguez nao tem NENHUMA ameaca no chao. Se a luta for para o grappling, ela nao pode finalizar e precisa se defender constantemente. Contra uma Hughes com nova ameaca de submissao, isso e uma vulnerabilidade critica.', implicacao_aposta: 'Favorece Hughes se a luta for pro chao. Cria valor em apostas de submissao como metodo e em Hughes por decisao com controle.', edge_level: 'forte', fighter_side: 'fighter1' },
        { icon: 'Brain', titulo: 'Conhecimento da Revanche', stat_headline: 'HUGHES SABE EXATAMENTE O QUE DEU ERRADO EM 2022', contexto: 'Em revanche, quem perdeu tem vantagem informacional. Hughes sabe que trocar em pe nao funciona e tem 4 anos de evolucao para corrigir. Rodriguez pode entrar confiante demais tentando repetir o script.', implicacao_aposta: 'Reforça Hughes como valor na revanche. Lutadoras que perderam e evoluiram frequentemente vencem a segunda luta.', edge_level: 'leve', fighter_side: 'fighter1' },
      ],
      value_picks: [
        { tipo: 'Moneyline', pick: 'Hughes ML', odds: '+110 (estimado)', confianca: 'media', edge_vs_mercado: 'Hughes como underdog na revanche oferece valor. A evolucao desde 2022, a sequencia de vitorias e o novo grappling mudam a dinamica da luta.', raciocinio: 'O mercado pode estar usando o resultado de 2022 como referencia excessiva. Hughes em 2026 e uma lutadora diferente. Como underdog, o valor e atrativo.' },
        { tipo: 'Metodo', pick: 'Hughes por Decisao', odds: '+200 (estimado)', confianca: 'media', raciocinio: 'Se Hughes implementar o grappling e controlar a luta sem finalizar, a decisao e o cenario mais provavel. Suas ultimas 2 vitorias antes de Bannon foram por decisao dividida.' },
        { tipo: 'Over/Under', pick: 'Over 2.5 Rounds', odds: '-160 (estimado)', confianca: 'media', raciocinio: 'A primeira luta foi decisao. Hughes tende a ir a decisao. Rodriguez tambem tem decisoes recentes. A probabilidade de ir a distancia e alta.' },
        { tipo: 'Metodo', pick: 'Hughes por Submissao', odds: '+500 (estimado)', confianca: 'baixa', edge_vs_mercado: 'Valor como aposta de risco. Hughes finalizou pela primeira vez no UFC recentemente e Rodriguez tem zero defesa de submissao comprovada.', raciocinio: 'Alto risco, alta recompensa. Se Hughes conseguir takedown e posicao, a finalizacao e possivel contra alguem sem experiencia defensiva no chao.' },
      ],
      armadilha: {
        titulo: 'Armadilha: Rodriguez por KO no Primeiro Round',
        descricao: 'Apostar em Rodriguez por KO R1 e assumir que Hughes vai trocar em pe como em 2022. Se Hughes mudou a estrategia para grappling (o que e provavel dado o treinamento na Fortis MMA), Rodriguez nao vai ter a oportunidade de usar o striking com a mesma facilidade. O cenario de KO cedo requer que Hughes cometa o mesmo erro da primeira luta.',
      },
      disclaimer: 'Analise estatistica para fins informativos e educacionais. Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.',
    },
  },
};
