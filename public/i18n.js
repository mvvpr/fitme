/* FitMe interface text. English is the page's own markup; Portuguese (pt-PT) is applied on /pt/.
   STATIC_PT maps the page's fixed English text (and placeholder/aria-label values) to Portuguese.
   STR holds text the script builds at run time, for both languages. */
(function () {
  var LANG = /^\/pt(\/|$)/.test(location.pathname) ? 'pt' : 'en';

  var STATIC_PT = {
    'About you': 'Sobre ti', 'Your goal': 'O teu objetivo', 'Your plan': 'O teu plano', 'Your meals': 'As tuas refeições',
    "Find out when you'll reach your goal, and what to eat to get there.": 'Descobre quando vais atingir o teu objetivo e o que comer para lá chegar.',
    "Answer a few questions about you and your goal. FitMe works out your daily calories and protein, shows when you'll get there, and builds a weekly meal plan with a shopping list.": 'Responde a algumas perguntas sobre ti e o teu objetivo. O FitMe calcula as tuas calorias e proteína diárias, mostra quando lá vais chegar e cria um plano semanal de refeições com lista de compras.',
    'Your goal date': 'A data do teu objetivo', 'with a realistic range': 'com uma margem realista',
    'Daily calories and protein': 'Calorias e proteína diárias', 'sized to your body': 'ajustadas ao teu corpo',
    'A 7-day meal plan': 'Um plano de refeições para 7 dias', 'with recipes and a shopping list': 'com receitas e lista de compras',
    'Start': 'Começar', '3 quick steps · about 1 minute · free, no sign-up': '3 passos rápidos · cerca de 1 minuto · grátis, sem registo',
    'Metric': 'Métrico', 'Imperial': 'Imperial',
    'We use these to estimate how many calories your body burns.': 'Usamos estes dados para estimar quantas calorias o teu corpo gasta.',
    'Sex': 'Sexo', 'Female': 'Feminino', 'Male': 'Masculino', 'Age': 'Idade', 'yrs': 'anos', 'Height': 'Altura',
    'Current weight': 'Peso atual', 'Activity level': 'Nível de atividade',
    'Choosing your activity level': 'Como escolher o teu nível de atividade',
    'Sedentary:': 'Sedentário:', 'desk job, mostly driving, little or no exercise. Under ~5,000 steps a day.': 'trabalho de secretária, deslocações quase sempre de carro, pouco ou nenhum exercício. Menos de ~5000 passos por dia.',
    'Light:': 'Ligeiro:', '1–3 sessions a week, e.g. gym twice and a weekend walk. ~5,000–7,500 steps.': '1–3 sessões por semana, p. ex. ginásio duas vezes e uma caminhada ao fim de semana. ~5000–7500 passos.',
    'Moderate:': 'Moderado:', '3–5 sessions a week, e.g. gym 3× plus a run or class. ~7,500–10,000 steps.': '3–5 sessões por semana, p. ex. ginásio 3× mais uma corrida ou aula. ~7500–10 000 passos.',
    'Very active:': 'Muito ativo:', '6–7 hard sessions a week, or daily training plus an on-your-feet job.': '6–7 treinos intensos por semana, ou treino diário e um trabalho sempre de pé.',
    'Athlete:': 'Atleta:', 'physical job plus training, or training twice a day.': 'trabalho físico mais treino, ou treino duas vezes por dia.',
    'A': 'Uma', 'session': 'sessão',
    "is 30–60 min that gets your heart rate up (you can talk, but not sing): gym, running, cycling, swimming, sports, classes or a brisk 45–60 min walk. A stroll or a 15-minute workout doesn't count.": 'são 30–60 min que te põem o coração a bater mais depressa (consegues falar, mas não cantar): ginásio, corrida, bicicleta, natação, desporto, aulas ou uma caminhada rápida de 45–60 min. Um passeio ou um treino de 15 minutos não conta.',
    'Unsure? Pick the lower level.': 'Na dúvida? Escolhe o nível mais baixo.',
    'If you sit most of the day, go one step lower, and move up if you lose weight faster than predicted.': 'Se passas a maior parte do dia sentado, desce um nível, e sobe se perderes peso mais depressa do que o previsto.',
    'Sedentary (desk job)': 'Sedentário (trabalho de secretária)', 'Light (1–3 workouts/wk)': 'Ligeiro (1–3 treinos/semana)',
    'Moderate (3–5 workouts/wk)': 'Moderado (3–5 treinos/semana)', 'Very active (6–7 workouts/wk)': 'Muito ativo (6–7 treinos/semana)',
    'Athlete (physical job + training)': 'Atleta (trabalho físico + treino)',
    'Back': 'Voltar', 'Next': 'Seguinte', 'Goal weight': 'Peso objetivo',
    'Your goal weight needs to be below your current weight.': 'O teu peso objetivo tem de ser inferior ao peso atual.',
    'Choose your pace': 'Escolhe o teu ritmo', 'Advanced settings': 'Definições avançadas',
    'Daily deficit': 'Défice diário',
    'Start date': 'Data de início',
    'Get these meals in your inbox at 7:00': 'Recebe estas refeições no email às 7:00',
    'Free. Sized to your calories, with your shopping list every Saturday.': 'Grátis. À medida das tuas calorias, com a lista de compras todos os sábados.',
    'The pace sets your daily calorie deficit: how far below maintenance you eat. Paces ease with age to protect muscle, and never go above 30% of maintenance or below the minimum intake. The plan assumes you stick to it every day.': 'O ritmo define o teu défice calórico diário: quanto comes abaixo da manutenção. Os ritmos ficam mais suaves com a idade, para proteger a massa muscular, e nunca passam de 30% da manutenção nem descem abaixo da ingestão mínima. O plano assume que o segues todos os dias.',
    'See my plan': 'Ver o meu plano', 'Goal reached': 'Objetivo atingido', 'Eat about': 'Come cerca de', 'Protein': 'Proteína',
    'To lose': 'A perder', 'Average per week': 'Média por semana', 'BMI now → goal': 'IMC agora → objetivo', 'Basal kcal → at goal': 'kcal basais → no objetivo',
    'Weight over time': 'Evolução do peso', 'Body weight': 'Peso corporal', 'Lost': 'Perdido', 'Goal': 'Objetivo', 'Range': 'Margem',
    'How we calculated this': 'Como calculámos isto', 'Basal (BMR)': 'Basal (TMB)', 'Just staying alive': 'Só para te manteres vivo',
    'Activity & digestion': 'Atividade e digestão', 'Maintenance': 'Manutenção', 'Weight stays the same': 'O peso mantém-se',
    'Your deficit': 'O teu défice', 'Planned shortfall': 'Défice planeado', 'You eat': 'Comes', 'Daily intake': 'Ingestão diária',
    'Basal calories (BMR) are what your body burns at complete rest, estimated from your sex, age, height and weight with the Mifflin-St Jeor equation. Maintenance is BMR times your activity level. You eat the same calories every day, so weight loss slows gently as your body gets lighter and burns less.': 'As calorias basais (TMB) são o que o teu corpo gasta em repouso total, estimadas a partir do sexo, idade, altura e peso com a equação de Mifflin-St Jeor. A manutenção é a TMB multiplicada pelo teu nível de atividade. Comes as mesmas calorias todos os dias, por isso a perda de peso abranda ligeiramente à medida que o corpo fica mais leve e gasta menos.',
    'Week by week': 'Semana a semana', 'Week': 'Semana', 'Date': 'Data', 'Weight': 'Peso', 'Intake': 'Ingestão', 'Basal': 'Basal', 'BMI': 'IMC',
    "Get each day's meals by email": 'Recebe as refeições de cada dia por email',
    'Every morning at 7:00 your time: four meals with ingredients and method, sized to': 'Todas as manhãs às 7:00 (hora local): quatro refeições com ingredientes e preparação, ajustadas a',
    'your calories': 'as tuas calorias', 'Subscribe': 'Subscrever',
    '. Plus your shopping list for the week every Saturday.': '. E, ao sábado, a lista de compras da semana.',
    'I agree to receive a daily meal-plan email from FitMe. We store your email, time zone and calorie settings to send it, and you can unsubscribe at any time.': 'Aceito receber um email diário com o plano de refeições do FitMe. Guardamos o teu email, fuso horário e definições de calorias para o enviar, e podes cancelar a subscrição a qualquer momento.',
    'Privacy policy': 'Política de privacidade',
    'See my meal plan': 'Ver o meu plano de refeições',
    'This is an estimate built from the figures you entered, not medical advice. It assumes about 7,700 kcal per kg of body weight (3,500 per lb) and recalculates maintenance every day as your weight falls. Real loss is rarely a straight line: water, glycogen and metabolic adaptation make weekly numbers bounce around, and long-term loss is usually a little slower than this model shows. Once the goal is reached the projection switches to maintenance. For very low intakes or medical conditions, plan with a doctor or registered dietitian.': 'Isto é uma estimativa baseada nos dados que introduziste, não um conselho médico. Assume cerca de 7700 kcal por kg de peso corporal e recalcula a manutenção todos os dias à medida que o peso desce. A perda real raramente é linear: a água, o glicogénio e a adaptação metabólica fazem os valores semanais oscilar, e a perda a longo prazo costuma ser um pouco mais lenta do que este modelo mostra. Quando o objetivo é atingido, a projeção passa para manutenção. Para ingestões muito baixas ou problemas de saúde, planeia com um médico ou nutricionista.',
    'Your weekly meal plan': 'O teu plano semanal de refeições', 'Shopping list for the week': 'Lista de compras da semana',
    'Back to my plan': 'Voltar ao meu plano',
    'Meal plan nutrition is estimated from standard ingredient values; portions are rounded for real kitchens, so daily totals land near, not exactly on, your target. Check labels if you have allergies. Not medical advice.': 'Os valores nutricionais do plano são estimados a partir de valores-padrão dos ingredientes; as porções são arredondadas para a cozinha real, por isso os totais diários ficam perto do teu objetivo, mas não exatamente nele. Confirma os rótulos se tiveres alergias. Não é aconselhamento médico.',
    // attributes
    'FitMe home': 'Página inicial do FitMe', 'Steps': 'Passos', 'Units': 'Unidades', 'Height, feet': 'Altura, pés', 'Height, inches': 'Altura, polegadas',
    'What do the activity levels mean?': 'O que significam os níveis de atividade?', 'Activity levels explained': 'Níveis de atividade explicados',
    'Close': 'Fechar', 'Pace': 'Ritmo', 'Suggested deficit range': 'Margem de défice sugerida',
    'Area chart of projected weight by week': 'Gráfico da evolução prevista do peso por semana',
    'Daily energy breakdown at your current weight': 'Repartição da energia diária com o teu peso atual',
    'you@example.com': 'o-teu@email.com', 'Email address': 'Endereço de email', 'Day of the week': 'Dia da semana'
  };

  var STR = {
    en: {
      locale: undefined, htmlLang: 'en',
      title: 'FitMe: when you’ll reach your goal, and what to eat to get there',
      weeks: function (n) { return n + (n === 1 ? ' week' : ' weeks'); },
      notWithin: 'not within 2 years',
      tipWeek: function (i, d) { return 'Week ' + i + ' · ' + d; }, tipWeight: 'Weight', tipLost: 'Lost', tipIntake: 'Intake', tipBasal: 'Basal', tipRange: 'Range',
      actNames: { '1.2': 'Sedentary', '1.375': 'Light', '1.55': 'Moderate', '1.725': 'Very active', '1.9': 'Athlete' },
      actShort: { '1.2': 'Sedentary', '1.375': 'Light activity', '1.55': 'Moderate activity', '1.725': 'Very active', '1.9': 'Athlete' },
      checkGoal: 'Check your goal',
      setGoalBelow: function (m) { return 'Set a goal weight below your current weight. Your maintenance is about <strong>' + m + '</strong> a day.'; },
      reachIn: function (w, wk) { return 'Reach ' + w + ' in ' + wk; },
      notReached: 'Goal not reached within 2 years',
      maintMinus: function (m, d) { return 'That’s your maintenance of ' + m + ' minus a ' + d + ' kcal daily deficit. '; },
      levelsOff: 'At this intake your weight levels off before the goal, so choose a faster pace in <a href="#goal">Your goal</a>. ',
      aDay: ' a day',
      warnFloor: function (i, f) { return 'Intake drops to about ' + i + ', below the ' + f + ' kcal a day often given as a minimum without medical supervision.'; },
      warnBmr: function (i, b) { return 'Intake dips to about ' + i + ', under your basal rate of ' + b + '. That is common in a deficit, but staying above your BMR is easier to sustain.'; },
      warnFast: function (p) { return 'Your fastest week loses ' + p + '% of body weight. Around 0.5–1% a week is usually easier to sustain and protects muscle.'; },
      warnBmi: function (b) { return 'A goal BMI of ' + b + ' is below the healthy range (18.5–24.9).'; },
      chartAria: function (h, from, to) { return 'Projected weight over ' + h + ' weeks, from ' + from + ' to ' + to + '.'; },
      paceNames: ['Slow pace', 'Recommended pace', 'Faster pace'],
      customDeficit: function (d) { return d + ' kcal deficit'; },
      editDetails: 'Edit details',
      chipNames: ['Slow', 'Recommended ★', 'Faster'], perWk: '/wk', kcalADay: ' kcal a day', balancedNote: 'Recommended for most people',
      daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      mealsSub: function (t) { return 'Four high-protein meals a day, with portions scaled to your daily intake of <strong>' + t + '</strong>. '; },
      protGoal: function (p, k) { return 'Protein goal: about ' + p + ' g a day (' + k + ' g per kg of goal weight).'; },
      dayTotal: function (d) { return d + ' total'; }, carbs: 'Carbs', fat: 'Fat', protein: 'Protein', macro: ['P', 'C', 'F'],
      ingredients: 'Ingredients · 1 serving', method: 'Method',
      slice: ['slice', 'slices'], clove: ['clove', 'cloves'], tsp: 'tsp', tbsp: 'tbsp',
      extrasHead: 'Herbs, spices & extras', shopNote: '· 1 person, 7 days',
      msg: {
        invalid_email: 'Please enter a valid email address.', consent_required: 'Please tick the box to agree to the daily email.',
        invalid_intake: 'Your daily intake looks off. Check your details above.', not_configured: 'Email sign-up opens soon. Please check back in a few days.',
        send_failed: 'We couldn’t send the confirmation email. Please try again in a moment.',
        sending: 'Sending…', ok: 'Almost done: check your inbox and tap the link to confirm.', rate: 'Too many tries. Please wait a minute and try again.',
        error: 'Something went wrong. Please try again.', preview: 'Sign-up works on the live FitMe site (fitmeplan.com). It isn’t available in this preview.'
      },
      subscribed: 'You’re subscribed. Your first meal plan arrives tomorrow at 7:00.',
      unsubscribed: 'You’ve been unsubscribed and your details deleted.'
    },
    pt: {
      locale: 'pt-PT', htmlLang: 'pt-PT',
      title: 'FitMe: quando vais atingir o teu objetivo e o que comer para lá chegar',
      weeks: function (n) { return n + (n === 1 ? ' semana' : ' semanas'); },
      notWithin: 'não em 2 anos',
      tipWeek: function (i, d) { return 'Semana ' + i + ' · ' + d; }, tipWeight: 'Peso', tipLost: 'Perdido', tipIntake: 'Ingestão', tipBasal: 'Basal', tipRange: 'Margem',
      actNames: { '1.2': 'Sedentário', '1.375': 'Ligeiro', '1.55': 'Moderado', '1.725': 'Muito ativo', '1.9': 'Atleta' },
      actShort: { '1.2': 'Sedentário', '1.375': 'Atividade ligeira', '1.55': 'Atividade moderada', '1.725': 'Muito ativo', '1.9': 'Atleta' },
      checkGoal: 'Verifica o teu objetivo',
      setGoalBelow: function (m) { return 'Define um peso objetivo inferior ao teu peso atual. A tua manutenção é de cerca de <strong>' + m + '</strong> por dia.'; },
      reachIn: function (w, wk) { return 'Atinges ' + w + ' em ' + wk; },
      notReached: 'Objetivo não atingido em 2 anos',
      maintMinus: function (m, d) { return 'É a tua manutenção de ' + m + ' menos um défice diário de ' + d + ' kcal. '; },
      levelsOff: 'Com esta ingestão, o teu peso estabiliza antes do objetivo. Escolhe um ritmo mais rápido em <a href="#goal">O teu objetivo</a>. ',
      aDay: ' por dia',
      warnFloor: function (i, f) { return 'A ingestão desce para cerca de ' + i + ', abaixo das ' + f + ' kcal por dia normalmente indicadas como mínimo sem acompanhamento médico.'; },
      warnBmr: function (i, b) { return 'A ingestão desce para cerca de ' + i + ', abaixo da tua taxa basal de ' + b + '. É comum num défice, mas ficar acima da TMB é mais fácil de manter.'; },
      warnFast: function (p) { return 'Na semana mais rápida perdes ' + p + '% do peso corporal. Cerca de 0,5–1% por semana costuma ser mais fácil de manter e protege a massa muscular.'; },
      warnBmi: function (b) { return 'Um IMC objetivo de ' + b + ' está abaixo do intervalo saudável (18,5–24,9).'; },
      chartAria: function (h, from, to) { return 'Peso previsto ao longo de ' + h + ' semanas, de ' + from + ' até ' + to + '.'; },
      paceNames: ['Ritmo lento', 'Ritmo recomendado', 'Ritmo rápido'],
      customDeficit: function (d) { return 'Défice de ' + d + ' kcal'; },
      editDetails: 'Editar dados',
      chipNames: ['Lento', 'Recomendado ★', 'Rápido'], perWk: '/semana', kcalADay: ' kcal por dia', balancedNote: 'Recomendado para a maioria',
      daysShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      mealsSub: function (t) { return 'Quatro refeições ricas em proteína por dia, com porções ajustadas à tua ingestão diária de <strong>' + t + '</strong>. '; },
      protGoal: function (p, k) { return 'Objetivo de proteína: cerca de ' + p + ' g por dia (' + k + ' g por kg de peso objetivo).'; },
      dayTotal: function (d) { return 'Total de ' + d.toLowerCase(); }, carbs: 'Hidratos', fat: 'Gordura', protein: 'Proteína', macro: ['P', 'H', 'G'],
      ingredients: 'Ingredientes · 1 dose', method: 'Preparação',
      slice: ['fatia', 'fatias'], clove: ['dente', 'dentes'], tsp: 'c. chá', tbsp: 'c. sopa',
      extrasHead: 'Ervas, especiarias e extras', shopNote: '· 1 pessoa, 7 dias',
      msg: {
        invalid_email: 'Introduz um endereço de email válido.', consent_required: 'Marca a caixa para aceitar o email diário.',
        invalid_intake: 'A tua ingestão diária parece estranha. Confirma os teus dados.', not_configured: 'A subscrição por email abre em breve. Volta dentro de alguns dias.',
        send_failed: 'Não conseguimos enviar o email de confirmação. Tenta novamente daqui a pouco.',
        sending: 'A enviar…', ok: 'Quase pronto: abre o teu email e carrega no link para confirmar.', rate: 'Demasiadas tentativas. Espera um minuto e tenta outra vez.',
        error: 'Algo correu mal. Tenta novamente.', preview: 'A subscrição funciona no site do FitMe (fitmeplan.com). Não está disponível nesta pré-visualização.'
      },
      subscribed: 'Subscrição confirmada. O teu primeiro plano de refeições chega amanhã às 7:00.',
      unsubscribed: 'Subscrição cancelada e os teus dados foram apagados.'
    }
  };

  var origText = new WeakMap();
  function applyStatic(root, lang) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (node.parentElement && node.parentElement.closest('script,style')) return;
      var en = origText.get(node);
      if (en === undefined) {
        var key = node.nodeValue.replace(/\s+/g, ' ').trim();
        if (!key || !Object.prototype.hasOwnProperty.call(STATIC_PT, key)) return;
        en = node.nodeValue; origText.set(node, en);
      }
      var k = en.replace(/\s+/g, ' ').trim(), lead = en.match(/^\s*/)[0], trail = en.match(/\s*$/)[0];
      var next = lang === 'pt' ? lead + STATIC_PT[k] + trail : en;
      if (node.nodeValue !== next) node.nodeValue = next;
    });
    root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function (el) {
      ['placeholder', 'aria-label', 'title'].forEach(function (a) {
        var store = 'i18nEn' + a.replace(/-./g, function (m) { return m[1].toUpperCase(); }).replace(/^./, function (c) { return c.toUpperCase(); });
        var en = el.dataset[store];
        if (en === undefined) { var v = el.getAttribute(a); if (!v || !Object.prototype.hasOwnProperty.call(STATIC_PT, v)) return; en = v; el.dataset[store] = en; }
        el.setAttribute(a, lang === 'pt' ? STATIC_PT[en] : en);
      });
    });
  }
  function translateStatic(root) { if (LANG === 'pt') applyStatic(root, 'pt'); }

  var api = {
    lang: LANG, L: STR[LANG], STR: STR, translateStatic: translateStatic,
    // Switch language in place (no page reload).
    setLang: function (lang) { api.lang = lang; api.L = STR[lang]; applyStatic(document.body, lang); return api.L; }
  };
  globalThis.FITME_I18N = api;
})();
