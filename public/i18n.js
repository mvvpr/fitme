/* FitMe interface text. English is the page's own markup; European Portuguese (pt-PT) is applied on /pt/ and Brazilian Portuguese (pt-BR) on /br/.
   STATIC_PT maps the page's fixed English text (and placeholder/aria-label values) to Portuguese.
   STR holds text the script builds at run time, for both languages. */
(function () {
  // Also loaded by the /pt/ and /br/ edge function (no location there), which uses STATIC to send the page already translated.
  var PATH = typeof location !== 'undefined' ? location.pathname : '/';
  var LANG = /^\/br(\/|$)/.test(PATH) ? 'br' : /^\/pt(\/|$)/.test(PATH) ? 'pt' : 'en';

  var STATIC_PT = {
    'About you': 'Sobre ti', 'Your goal': 'O teu objetivo', 'Your plan': 'O teu plano', 'Your meals': 'As tuas refeições',
    'Know exactly what to eat to lose weight.': 'Descobre exatamente o que comer para perder peso.',
    'Tell us your weight and your goal. We do the maths and plan your meals.': 'Diz-nos o teu peso e o teu objetivo. Nós fazemos as contas e planeamos as tuas refeições.',
    'Your goal date:': 'A data do teu objetivo:', "see when you'll get there": 'vê quando lá vais chegar',
    'Your daily calories and protein,': 'As tuas calorias e proteína diárias,', 'worked out for your body': 'calculadas para o teu corpo',
    '7 days of easy meals': '7 dias de refeições fáceis', 'with recipes and a shopping list': 'com receitas e lista de compras',
    'Start': 'Começar', 'Get my free plan': 'Quero o meu plano grátis', 'High protein recipes': 'Receitas saudáveis', 'Privacy': 'Privacidade', 'Log in': 'Entrar', 'About 1 minute · Free · No sign-up needed': 'Cerca de 1 minuto · Grátis · Sem registo',
    'Metric': 'Métrico', 'Imperial': 'Imperial', 'Diet': 'Alimentação', 'Everything': 'Tudo', 'Vegetarian': 'Vegetariana',
    'Which proteins do you like?': 'Que proteínas gostas de comer?', 'Every lunch and dinner is built around the proteins you pick.': 'Cada almoço e jantar é feito com as proteínas que escolheres.', 'Pick 2 or more.': 'Escolhe 2 ou mais.', 'Choose my proteins': 'Escolher proteínas', 'Proteins': 'Proteínas',
    'Your proteins': 'As tuas proteínas', 'Pick 2 or more': 'Escolhe 2 ou mais', 'Chicken': 'Frango', 'Beef': 'Vaca', 'Pork': 'Porco', 'Fish': 'Peixe', 'Soon': 'Em breve', 'Eggs': 'Ovos', 'Tofu': 'Tofu', 'Beans': 'Leguminosas',
    'We use this to work out how many calories your body burns. It stays on your device.': 'Usamos estes dados para calcular quantas calorias o teu corpo gasta. Ficam só no teu dispositivo.', 'Pick your goal weight and how fast you want to get there.': 'Escolhe o teu peso objetivo e a que ritmo queres lá chegar.',
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
    'Optional: allow Meta and Google cookies so FitMe can see which ad brought you here. This is the same as accepting the cookie banner, and you can change it anytime in Cookie settings.': 'Opcional: permitir os cookies da Meta e da Google para o FitMe saber que anúncio te trouxe até aqui. É o mesmo que aceitar o aviso de cookies, e podes mudar isto a qualquer momento nas Definições de cookies.',
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

  // Brazilian Portuguese (pt-BR), used on /br/. Same keys as STATIC_PT.
  var STATIC_BR = {
    'About you': 'Sobre você', 'Your goal': 'Seu objetivo', 'Your plan': 'Seu plano', 'Your meals': 'Suas refeições',
    'Know exactly what to eat to lose weight.': 'Saiba exatamente o que comer para emagrecer.',
    'Tell us your weight and your goal. We do the maths and plan your meals.': 'Conte seu peso e seu objetivo. A gente faz as contas e monta suas refeições.',
    'Your goal date:': 'A data do seu objetivo:', "see when you'll get there": 'veja quando você vai chegar lá',
    'Your daily calories and protein,': 'Suas calorias e proteína diárias,', 'worked out for your body': 'calculadas para o seu corpo',
    '7 days of easy meals': '7 dias de refeições fáceis', 'with recipes and a shopping list': 'com receitas e lista de compras',
    'Start': 'Começar', 'Get my free plan': 'Quero meu plano grátis', 'High protein recipes': 'Receitas fit', 'Privacy': 'Privacidade', 'Log in': 'Entrar', 'About 1 minute · Free · No sign-up needed': 'Cerca de 1 minuto · Grátis · Sem cadastro',
    'Metric': 'Métrico', 'Imperial': 'Imperial', 'Diet': 'Alimentação', 'Everything': 'Tudo', 'Vegetarian': 'Vegetariana',
    'Which proteins do you like?': 'Quais proteínas você gosta de comer?', 'Every lunch and dinner is built around the proteins you pick.': 'Cada almoço e jantar é montado com as proteínas que você escolher.', 'Pick 2 or more.': 'Escolha 2 ou mais.', 'Choose my proteins': 'Escolher proteínas', 'Proteins': 'Proteínas',
    'Your proteins': 'Suas proteínas', 'Pick 2 or more': 'Escolha 2 ou mais', 'Chicken': 'Frango', 'Beef': 'Carne', 'Pork': 'Porco', 'Fish': 'Peixe', 'Soon': 'Em breve', 'Eggs': 'Ovos', 'Tofu': 'Tofu', 'Beans': 'Feijão',
    'We use this to work out how many calories your body burns. It stays on your device.': 'Usamos esses dados para calcular quantas calorias seu corpo gasta. Eles ficam só no seu aparelho.', 'Pick your goal weight and how fast you want to get there.': 'Escolha seu peso ideal e em que ritmo você quer chegar lá.',
    'Sex': 'Sexo', 'Female': 'Feminino', 'Male': 'Masculino', 'Age': 'Idade', 'yrs': 'anos', 'Height': 'Altura',
    'Current weight': 'Peso atual', 'Activity level': 'Nível de atividade',
    'Choosing your activity level': 'Como escolher seu nível de atividade',
    'Sedentary:': 'Sedentário:', 'desk job, mostly driving, little or no exercise. Under ~5,000 steps a day.': 'trabalho de escritório, anda quase sempre de carro, pouco ou nenhum exercício. Menos de ~5.000 passos por dia.',
    'Light:': 'Leve:', '1–3 sessions a week, e.g. gym twice and a weekend walk. ~5,000–7,500 steps.': '1–3 treinos por semana, por ex. academia duas vezes e uma caminhada no fim de semana. ~5.000–7.500 passos.',
    'Moderate:': 'Moderado:', '3–5 sessions a week, e.g. gym 3× plus a run or class. ~7,500–10,000 steps.': '3–5 treinos por semana, por ex. academia 3× mais uma corrida ou aula. ~7.500–10.000 passos.',
    'Very active:': 'Muito ativo:', '6–7 hard sessions a week, or daily training plus an on-your-feet job.': '6–7 treinos intensos por semana, ou treino diário e um trabalho em que você passa o dia em pé.',
    'Athlete:': 'Atleta:', 'physical job plus training, or training twice a day.': 'trabalho braçal mais treino, ou treino duas vezes por dia.',
    'A': 'Um', 'session': 'treino',
    "is 30–60 min that gets your heart rate up (you can talk, but not sing): gym, running, cycling, swimming, sports, classes or a brisk 45–60 min walk. A stroll or a 15-minute workout doesn't count.": 'são 30–60 min que aceleram o coração (dá para falar, mas não para cantar): academia, corrida, bicicleta, natação, esportes, aulas ou uma caminhada rápida de 45–60 min. Um passeio ou um treino de 15 minutos não conta.',
    'Unsure? Pick the lower level.': 'Na dúvida? Escolha o nível mais baixo.',
    'If you sit most of the day, go one step lower, and move up if you lose weight faster than predicted.': 'Se você passa a maior parte do dia sentado, desça um nível, e suba se emagrecer mais rápido do que o previsto.',
    'Sedentary (desk job)': 'Sedentário (trabalho de escritório)', 'Light (1–3 workouts/wk)': 'Leve (1–3 treinos/semana)',
    'Moderate (3–5 workouts/wk)': 'Moderado (3–5 treinos/semana)', 'Very active (6–7 workouts/wk)': 'Muito ativo (6–7 treinos/semana)',
    'Athlete (physical job + training)': 'Atleta (trabalho braçal + treino)',
    'Back': 'Voltar', 'Next': 'Próximo', 'Goal weight': 'Peso ideal',
    'Your goal weight needs to be below your current weight.': 'Seu peso ideal precisa ser menor que o peso atual.',
    'Choose your pace': 'Escolha seu ritmo', 'Advanced settings': 'Configurações avançadas',
    'Daily deficit': 'Déficit diário',
    'Start date': 'Data de início',
    'Get these meals in your inbox at 7:00': 'Receba essas refeições no seu e-mail às 7h',
    'Free. Sized to your calories, with your shopping list every Saturday.': 'Grátis. Na medida das suas calorias, com a lista de compras todo sábado.',
    'The pace sets your daily calorie deficit: how far below maintenance you eat. Paces ease with age to protect muscle, and never go above 30% of maintenance or below the minimum intake. The plan assumes you stick to it every day.': 'O ritmo define seu déficit calórico diário: quanto você come abaixo da manutenção. Os ritmos ficam mais suaves com a idade, para proteger a massa muscular, e nunca passam de 30% da manutenção nem ficam abaixo da ingestão mínima. O plano considera que você segue tudo todos os dias.',
    'See my plan': 'Ver meu plano', 'Goal reached': 'Objetivo alcançado', 'Eat about': 'Coma cerca de', 'Protein': 'Proteína',
    'To lose': 'A perder', 'Average per week': 'Média por semana', 'BMI now → goal': 'IMC agora → objetivo', 'Basal kcal → at goal': 'kcal basais → no objetivo',
    'Weight over time': 'Evolução do peso', 'Body weight': 'Peso corporal', 'Lost': 'Perdido', 'Goal': 'Objetivo', 'Range': 'Faixa',
    'How we calculated this': 'Como calculamos isso', 'Basal (BMR)': 'Basal (TMB)', 'Just staying alive': 'Só para você se manter vivo',
    'Activity & digestion': 'Atividade e digestão', 'Maintenance': 'Manutenção', 'Weight stays the same': 'O peso se mantém',
    'Your deficit': 'Seu déficit', 'Planned shortfall': 'Déficit planejado', 'You eat': 'Você come', 'Daily intake': 'Ingestão diária',
    'Basal calories (BMR) are what your body burns at complete rest, estimated from your sex, age, height and weight with the Mifflin-St Jeor equation. Maintenance is BMR times your activity level. You eat the same calories every day, so weight loss slows gently as your body gets lighter and burns less.': 'As calorias basais (TMB) são o que seu corpo gasta em repouso total, estimadas a partir do sexo, idade, altura e peso com a equação de Mifflin-St Jeor. A manutenção é a TMB multiplicada pelo seu nível de atividade. Você come as mesmas calorias todos os dias, então o emagrecimento desacelera um pouco à medida que o corpo fica mais leve e gasta menos.',
    'Week by week': 'Semana a semana', 'Week': 'Semana', 'Date': 'Data', 'Weight': 'Peso', 'Intake': 'Ingestão', 'Basal': 'Basal', 'BMI': 'IMC',
    "Get each day's meals by email": 'Receba as refeições de cada dia por e-mail',
    'Every morning at 7:00 your time: four meals with ingredients and method, sized to': 'Toda manhã às 7h (no seu horário): quatro refeições com ingredientes e modo de preparo, na medida de',
    'your calories': 'suas calorias', 'Subscribe': 'Inscrever-se',
    '. Plus your shopping list for the week every Saturday.': '. E, aos sábados, a lista de compras da semana.',
    'I agree to receive a daily meal-plan email from FitMe. We store your email, time zone and calorie settings to send it, and you can unsubscribe at any time.': 'Aceito receber um e-mail diário com o plano de refeições do FitMe. Guardamos seu e-mail, fuso horário e configurações de calorias para enviá-lo, e você pode cancelar a inscrição a qualquer momento.',
    'Optional: allow Meta and Google cookies so FitMe can see which ad brought you here. This is the same as accepting the cookie banner, and you can change it anytime in Cookie settings.': 'Opcional: permitir os cookies da Meta e do Google para o FitMe saber qual anúncio trouxe você até aqui. É o mesmo que aceitar o aviso de cookies, e você pode mudar isso quando quiser nas Configurações de cookies.',
    'Privacy policy': 'Política de privacidade',
    'See my meal plan': 'Ver meu plano de refeições',
    'This is an estimate built from the figures you entered, not medical advice. It assumes about 7,700 kcal per kg of body weight (3,500 per lb) and recalculates maintenance every day as your weight falls. Real loss is rarely a straight line: water, glycogen and metabolic adaptation make weekly numbers bounce around, and long-term loss is usually a little slower than this model shows. Once the goal is reached the projection switches to maintenance. For very low intakes or medical conditions, plan with a doctor or registered dietitian.': 'Esta é uma estimativa baseada nos dados que você informou, não uma orientação médica. Considera cerca de 7.700 kcal por kg de peso corporal e recalcula a manutenção todos os dias conforme o peso cai. O emagrecimento real raramente é uma linha reta: água, glicogênio e adaptação metabólica fazem os números semanais oscilarem, e a perda a longo prazo costuma ser um pouco mais lenta do que este modelo mostra. Quando o objetivo é alcançado, a projeção passa para manutenção. Para ingestões muito baixas ou problemas de saúde, planeje com um médico ou nutricionista.',
    'Your weekly meal plan': 'Seu cardápio da semana', 'Shopping list for the week': 'Lista de compras da semana',
    'Back to my plan': 'Voltar ao meu plano',
    'Meal plan nutrition is estimated from standard ingredient values; portions are rounded for real kitchens, so daily totals land near, not exactly on, your target. Check labels if you have allergies. Not medical advice.': 'Os valores nutricionais do cardápio são estimados a partir de valores-padrão dos ingredientes; as porções são arredondadas para a cozinha do dia a dia, então os totais diários ficam perto da sua meta, mas não exatamente nela. Confira os rótulos se tiver alergias. Não é orientação médica.',
    // attributes
    'FitMe home': 'Página inicial do FitMe', 'Steps': 'Etapas', 'Units': 'Unidades', 'Height, feet': 'Altura, pés', 'Height, inches': 'Altura, polegadas',
    'What do the activity levels mean?': 'O que significam os níveis de atividade?', 'Activity levels explained': 'Níveis de atividade explicados',
    'Close': 'Fechar', 'Pace': 'Ritmo', 'Suggested deficit range': 'Faixa de déficit sugerida',
    'Area chart of projected weight by week': 'Gráfico da evolução prevista do peso por semana',
    'Daily energy breakdown at your current weight': 'Divisão da energia diária com seu peso atual',
    'you@example.com': 'voce@email.com', 'Email address': 'Endereço de e-mail', 'Day of the week': 'Dia da semana'
  };

  var STATIC = { pt: STATIC_PT, br: STATIC_BR };
  // Portuguese text -> English key, for text the edge function already translated on /pt/ and /br/ (so switching to English still works).
  var REVERSE = {};
  [STATIC_BR, STATIC_PT].forEach(function (m) { for (var k in m) if (Object.prototype.hasOwnProperty.call(m, k)) REVERSE[m[k].replace(/\s+/g, ' ').trim()] = k; });
  function enKey(v) {
    if (Object.prototype.hasOwnProperty.call(STATIC_PT, v)) return v;
    return Object.prototype.hasOwnProperty.call(REVERSE, v) ? REVERSE[v] : undefined;
  }

  var STR = {
    en: {
      locale: undefined, htmlLang: 'en',
      title: 'FitMe: when you’ll reach your goal, and what to eat to get there',
      weeks: function (n) { return n + (n === 1 ? ' week' : ' weeks'); },
      notWithin: 'not within 2 years',
      tipWeek: function (i, d) { return 'Week ' + i + ' · ' + d; }, tipWeight: 'Weight', tipLost: 'Lost', tipIntake: 'Intake', tipBasal: 'Basal', tipRange: 'Range',
      actNames: { '1.2': 'Sedentary', '1.375': 'Light', '1.55': 'Moderate', '1.725': 'Very active', '1.9': 'Athlete' },
      actShort: { '1.2': 'Sedentary', '1.375': 'Light activity', '1.55': 'Moderate activity', '1.725': 'Very active', '1.9': 'Athlete' },
      finishEyebrow: 'Your finish line', finishLine: function (w, wk) { return 'The day you reach <b>' + w + '</b>. ' + wk.charAt(0).toUpperCase() + wk.slice(1) + ', one meal at a time.'; }, today: 'Today', halfway: 'Halfway', trackAria: function (a, b, d) { return 'Your route from ' + a + ' today to ' + b + ' on ' + d; },
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
      editDetails: 'Edit details', changeProteins: 'Change proteins',
      chipNames: ['Slow', 'Recommended ★', 'Faster'], perWk: '/wk', kcalADay: ' kcal a day', balancedNote: 'Recommended for most people',
      daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      mealsSub: function (t) { return 'Four high-protein meals a day, with portions scaled to your daily intake of <strong>' + t + '</strong>. '; },
      protGoal: function (p, k) { return 'Protein goal: about ' + p + ' g a day (' + k + ' g per kg of goal weight).'; },
      dayTotal: function (d) { return d + ' total'; }, carbs: 'Carbs', fat: 'Fat', protein: 'Protein', macro: ['P', 'C', 'F'],
      ingredients: 'Ingredients · 1 serving', method: 'Method',
      nextDay: function (d) { return 'Next: ' + d + ' →'; },
      building: { title: 'Building your plan…', steps: ['Working out your maintenance calories', 'Setting your daily deficit', 'Plotting your timeline', 'Sizing your meals'] },
      ingMethod: 'Ingredients & method', weekStrip: 'This week’s meals, sized to your calories',
      slice: ['slice', 'slices'], clove: ['clove', 'cloves'], tsp: 'tsp', tbsp: 'tbsp',
      extrasHead: 'Herbs, spices & extras', shopNote: '· 1 person, 7 days',
      msg: {
        didYouMean: 'Did you mean {email}?', fixYes: 'Yes, fix it', fixNo: 'No, keep it',
        invalid_email: 'Please enter a valid email address.', consent_required: 'Please tick the box to agree to the daily email.',
        invalid_intake: 'Your daily intake looks off. Check your details above.', not_configured: 'Email sign-up opens soon. Please check back in a few days.',
        send_failed: 'We couldn’t send the confirmation email. Please try again in a moment.',
        sending: 'Sending…', ok: 'Almost done: check your inbox and tap the link to confirm.', applied: "Done: you're logged in, so your plan is updated straight away. Your next email uses the new portions.", rate: 'Too many tries. Please wait a minute and try again.',
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
      finishEyebrow: 'A tua linha de meta', finishLine: function (w, wk) { return 'O dia em que chegas aos <b>' + w + '</b>. ' + wk.charAt(0).toUpperCase() + wk.slice(1) + ', uma refeição de cada vez.'; }, today: 'Hoje', halfway: 'A meio', trackAria: function (a, b, d) { return 'O teu caminho de ' + a + ' hoje até ' + b + ' a ' + d; },
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
      editDetails: 'Editar dados', changeProteins: 'Mudar proteínas',
      chipNames: ['Lento', 'Recomendado ★', 'Rápido'], perWk: '/semana', kcalADay: ' kcal por dia', balancedNote: 'Recomendado para a maioria',
      daysShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      mealsSub: function (t) { return 'Quatro refeições ricas em proteína por dia, com porções ajustadas à tua ingestão diária de <strong>' + t + '</strong>. '; },
      protGoal: function (p, k) { return 'Objetivo de proteína: cerca de ' + p + ' g por dia (' + k + ' g por kg de peso objetivo).'; },
      dayTotal: function (d) { return 'Total de ' + d.toLowerCase(); }, carbs: 'Hidratos', fat: 'Gordura', protein: 'Proteína', macro: ['P', 'H', 'G'],
      ingredients: 'Ingredientes · 1 dose', method: 'Preparação',
      nextDay: function (d) { return 'Seguinte: ' + d + ' →'; },
      building: { title: 'A preparar o teu plano…', steps: ['A calcular as tuas calorias de manutenção', 'A definir o teu défice diário', 'A traçar o teu percurso', 'A ajustar as tuas refeições'] },
      ingMethod: 'Ingredientes e preparação', weekStrip: 'As refeições desta semana, à medida das tuas calorias',
      slice: ['fatia', 'fatias'], clove: ['dente', 'dentes'], tsp: 'c. chá', tbsp: 'c. sopa',
      extrasHead: 'Ervas, especiarias e extras', shopNote: '· 1 pessoa, 7 dias',
      msg: {
        didYouMean: 'Querias dizer {email}?', fixYes: 'Sim, corrigir', fixNo: 'Não, manter',
        invalid_email: 'Introduz um endereço de email válido.', consent_required: 'Marca a caixa para aceitar o email diário.',
        invalid_intake: 'A tua ingestão diária parece estranha. Confirma os teus dados.', not_configured: 'A subscrição por email abre em breve. Volta dentro de alguns dias.',
        send_failed: 'Não conseguimos enviar o email de confirmação. Tenta novamente daqui a pouco.',
        sending: 'A enviar…', ok: 'Quase pronto: abre o teu email e carrega no link para confirmar.', applied: 'Feito: como tens sessão iniciada, o teu plano foi atualizado logo. O próximo email já usa as novas porções.', rate: 'Demasiadas tentativas. Espera um minuto e tenta outra vez.',
        error: 'Algo correu mal. Tenta novamente.', preview: 'A subscrição funciona no site do FitMe (fitmeplan.com). Não está disponível nesta pré-visualização.'
      },
      subscribed: 'Subscrição confirmada. O teu primeiro plano de refeições chega amanhã às 7:00.',
      unsubscribed: 'Subscrição cancelada e os teus dados foram apagados.'
    },
    br: {
      locale: 'pt-BR', htmlLang: 'pt-BR',
      title: 'FitMe: saiba exatamente o que comer para emagrecer',
      weeks: function (n) { return n + (n === 1 ? ' semana' : ' semanas'); },
      notWithin: 'não em 2 anos',
      tipWeek: function (i, d) { return 'Semana ' + i + ' · ' + d; }, tipWeight: 'Peso', tipLost: 'Perdido', tipIntake: 'Ingestão', tipBasal: 'Basal', tipRange: 'Faixa',
      actNames: { '1.2': 'Sedentário', '1.375': 'Leve', '1.55': 'Moderado', '1.725': 'Muito ativo', '1.9': 'Atleta' },
      actShort: { '1.2': 'Sedentário', '1.375': 'Atividade leve', '1.55': 'Atividade moderada', '1.725': 'Muito ativo', '1.9': 'Atleta' },
      finishEyebrow: 'Sua linha de chegada', finishLine: function (w, wk) { return 'O dia em que você chega a <b>' + w + '</b>. ' + wk.charAt(0).toUpperCase() + wk.slice(1) + ', uma refeição de cada vez.'; }, today: 'Hoje', halfway: 'Metade', trackAria: function (a, b, d) { return 'Seu caminho de ' + a + ' hoje até ' + b + ' em ' + d; },
      checkGoal: 'Confira seu objetivo',
      setGoalBelow: function (m) { return 'Defina um peso ideal menor que seu peso atual. Sua manutenção é de cerca de <strong>' + m + '</strong> por dia.'; },
      reachIn: function (w, wk) { return 'Você chega a ' + w + ' em ' + wk; },
      notReached: 'Objetivo não alcançado em 2 anos',
      maintMinus: function (m, d) { return 'É a sua manutenção de ' + m + ' menos um déficit diário de ' + d + ' kcal. '; },
      levelsOff: 'Com essa ingestão, seu peso estabiliza antes do objetivo. Escolha um ritmo mais rápido em <a href="#goal">Seu objetivo</a>. ',
      aDay: ' por dia',
      warnFloor: function (i, f) { return 'A ingestão cai para cerca de ' + i + ', abaixo das ' + f + ' kcal por dia normalmente indicadas como mínimo sem acompanhamento médico.'; },
      warnBmr: function (i, b) { return 'A ingestão cai para cerca de ' + i + ', abaixo da sua taxa basal de ' + b + '. Isso é comum em déficit, mas ficar acima da TMB é mais fácil de manter.'; },
      warnFast: function (p) { return 'Na semana mais rápida você perde ' + p + '% do peso corporal. Cerca de 0,5–1% por semana costuma ser mais fácil de manter e protege a massa muscular.'; },
      warnBmi: function (b) { return 'Um IMC de ' + b + ' no objetivo está abaixo da faixa saudável (18,5–24,9).'; },
      chartAria: function (h, from, to) { return 'Peso previsto ao longo de ' + h + ' semanas, de ' + from + ' até ' + to + '.'; },
      paceNames: ['Ritmo lento', 'Ritmo recomendado', 'Ritmo rápido'],
      customDeficit: function (d) { return 'Déficit de ' + d + ' kcal'; },
      editDetails: 'Editar dados', changeProteins: 'Mudar proteínas',
      chipNames: ['Lento', 'Recomendado ★', 'Rápido'], perWk: '/semana', kcalADay: ' kcal por dia', balancedNote: 'Recomendado para a maioria',
      daysShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      mealsSub: function (t) { return 'Quatro refeições ricas em proteína por dia, com porções na medida da sua ingestão diária de <strong>' + t + '</strong>. '; },
      protGoal: function (p, k) { return 'Meta de proteína: cerca de ' + p + ' g por dia (' + k + ' g por kg do peso ideal).'; },
      dayTotal: function (d) { return 'Total de ' + d.toLowerCase(); }, carbs: 'Carboidratos', fat: 'Gordura', protein: 'Proteína', macro: ['P', 'C', 'G'],
      ingredients: 'Ingredientes · 1 porção', method: 'Modo de preparo',
      nextDay: function (d) { return 'Próximo: ' + d + ' →'; },
      building: { title: 'Montando seu plano…', steps: ['Calculando suas calorias de manutenção', 'Definindo seu déficit diário', 'Traçando seu caminho', 'Ajustando suas refeições'] },
      ingMethod: 'Ingredientes e modo de preparo', weekStrip: 'As refeições desta semana, na medida das suas calorias',
      slice: ['fatia', 'fatias'], clove: ['dente', 'dentes'], tsp: 'c. chá', tbsp: 'c. sopa',
      extrasHead: 'Ervas, temperos e extras', shopNote: '· 1 pessoa, 7 dias',
      msg: {
        didYouMean: 'Você quis dizer {email}?', fixYes: 'Sim, corrigir', fixNo: 'Não, manter',
        invalid_email: 'Digite um endereço de e-mail válido.', consent_required: 'Marque a caixa para aceitar o e-mail diário.',
        invalid_intake: 'Sua ingestão diária parece estranha. Confira seus dados.', not_configured: 'A inscrição por e-mail abre em breve. Volte daqui a alguns dias.',
        send_failed: 'Não conseguimos enviar o e-mail de confirmação. Tente de novo daqui a pouco.',
        sending: 'Enviando…', ok: 'Quase lá: abra seu e-mail e toque no link para confirmar.', applied: 'Pronto: como você está logado, seu plano foi atualizado na hora. O próximo e-mail já usa as novas porções.', rate: 'Muitas tentativas. Espere um minuto e tente de novo.',
        error: 'Algo deu errado. Tente de novo.', preview: 'A inscrição funciona no site do FitMe (fitmeplan.com). Não está disponível nesta prévia.'
      },
      subscribed: 'Inscrição confirmada. Seu primeiro plano de refeições chega amanhã às 7h.',
      unsubscribed: 'Inscrição cancelada e seus dados foram apagados.'
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
        var raw = node.nodeValue, key = raw.replace(/\s+/g, ' ').trim();
        var k0 = key && enKey(key); // STATIC_PT and STATIC_BR share the same keys
        if (k0 === undefined) return;
        en = raw.match(/^\s*/)[0] + k0 + raw.match(/\s*$/)[0]; origText.set(node, en);
      }
      var k = en.replace(/\s+/g, ' ').trim(), lead = en.match(/^\s*/)[0], trail = en.match(/\s*$/)[0];
      var map = STATIC[lang], next = map && map[k] != null ? lead + map[k] + trail : en;
      if (node.nodeValue !== next) node.nodeValue = next;
    });
    root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function (el) {
      ['placeholder', 'aria-label', 'title'].forEach(function (a) {
        var store = 'i18nEn' + a.replace(/-./g, function (m) { return m[1].toUpperCase(); }).replace(/^./, function (c) { return c.toUpperCase(); });
        var en = el.dataset[store];
        if (en === undefined) { var v = el.getAttribute(a), kv = v && enKey(v); if (kv === undefined) return; en = kv; el.dataset[store] = en; }
        el.setAttribute(a, STATIC[lang] && STATIC[lang][en] != null ? STATIC[lang][en] : en);
      });
    });
  }
  function translateStatic(root) { if (LANG !== 'en') applyStatic(root, LANG); }

  var api = {
    lang: LANG, L: STR[LANG], STR: STR, STATIC: STATIC, translateStatic: translateStatic,
    // Switch language in place (no page reload).
    setLang: function (lang) { api.lang = lang; api.L = STR[lang]; applyStatic(document.body, lang); return api.L; }
  };
  globalThis.FITME_I18N = api;
})();
