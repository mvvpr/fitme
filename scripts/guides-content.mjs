// Guide (pillar) pages and the About page: words per language, written natively (never line-by-line translations).
// Built by scripts/build-recipes.mjs into /guides/<slug>/, /pt/guias/<slug>/, /br/guias/<slug>/ and /about/, /pt/sobre/, /br/sobre/.
// Body = a small Markdown subset: "### " headings, paragraphs, "- " bullets, "| " tables, **bold**, *italic*, [text](url),
// and a line "[[cta:Button text]]" for a button to the calculator. "## Questions" style FAQ: "**Q?** A" paragraphs after
// a "### " heading whose text is in faqHeading are also emitted as FAQPage structured data.
// Approved draft: https://claude.ai/artifact/6TToMuYnbHzMHtSwyR3jMp. Slugs are permanent once live.

export const GUIDE_HUB = {
  en: { path: '/guides/', label: 'Guides' },
  pt: { path: '/pt/guias/', label: 'Guias' },
  br: { path: '/br/guias/', label: 'Guias' },
};

export const ABOUT = {
  en: {
    path: '/about/', label: 'About',
    title: 'About FitMe: why it was built and how we write | FitMe',
    description: 'FitMe helps you make a plan to reach your goal weight, with simple steps you can follow. Why it was built, and where our numbers come from.',
    h1: 'About FitMe',
    body: `FitMe was built to help people make a plan to reach a goal, and to give them simple steps they can actually follow to get there.

It started with a personal journey. I lost 12 kg with a calorie deficit, going from 94 kg to 82 kg in about three months. Along the way I kept looking for recipes and answers in different places. FitMe puts it in one place.

### What FitMe does

- A calculator that works out how many calories you need and when you could reach your goal weight.
- High-protein recipes made with ingredients from any supermarket, with calories and macros per portion.
- A free meal plan sized to your calories, sent by email every morning, with a weekly shopping list.

### How we write

- Calories, protein, carbs and fat come from the recipe data itself, so every page matches the plan and the emails.
- Health figures, such as a safe weekly pace of weight loss, follow public health guidance and are linked to their source.
- We share what worked for us, but never promise results. Every body is different.

*FitMe gives general information, not medical advice. If you have a health condition, are pregnant or are under 18, talk to a doctor before changing how you eat.*

[[cta:Make my free plan]]`,
  },
  pt: {
    path: '/pt/sobre/', label: 'Sobre',
    title: 'Sobre o FitMe: porque existe e como escrevemos | FitMe',
    description: 'O FitMe ajuda-te a fazer um plano para chegares ao teu peso, com passos simples que consegues seguir. Porque foi criado e de onde vêm os nossos números.',
    h1: 'Sobre o FitMe',
    body: `O FitMe foi criado para ajudar as pessoas a fazer um plano para chegar a um objetivo, com passos simples que consigam mesmo seguir.

Começou com uma experiência pessoal. Perdi 12 kg com um défice calórico, passei de 94 kg para 82 kg em cerca de três meses. Pelo caminho andei sempre à procura de receitas e respostas em sítios diferentes. O FitMe junta tudo num só sítio.

### O que o FitMe faz

- Uma calculadora que diz de quantas calorias precisas e quando podes chegar ao teu peso.
- Receitas ricas em proteína, com ingredientes de qualquer supermercado, com calorias e macros por dose.
- Um plano de refeições grátis, ajustado às tuas calorias, enviado por email todas as manhãs, com a lista de compras da semana.

### Como escrevemos

- As calorias, a proteína, os hidratos e a gordura vêm dos próprios dados das receitas, por isso cada página bate certo com o plano e os emails.
- Os números de saúde, como um ritmo seguro de perda de peso por semana, seguem as recomendações de saúde pública e têm a fonte indicada.
- Partilhamos o que resultou connosco, mas nunca prometemos resultados. Cada corpo é diferente.

*O FitMe dá informação geral e não substitui aconselhamento médico. Se tens alguma doença, estás grávida ou tens menos de 18 anos, fala com um médico antes de mudares a alimentação.*

[[cta:Fazer o meu plano grátis]]`,
  },
  br: {
    path: '/br/sobre/', label: 'Sobre',
    title: 'Sobre o FitMe: por que ele existe e como escrevemos | FitMe',
    description: 'O FitMe ajuda você a montar um plano para chegar ao seu peso, com passos simples que dá para seguir. Por que ele foi criado e de onde vêm os nossos números.',
    h1: 'Sobre o FitMe',
    body: `O FitMe foi criado para ajudar as pessoas a montar um plano para chegar a uma meta, com passos simples que elas consigam seguir de verdade.

Tudo começou com uma experiência pessoal. Eu perdi 12 kg com déficit calórico: fui de 94 kg para 82 kg em mais ou menos três meses. No caminho, vivia procurando receitas e respostas em lugares diferentes. O FitMe junta tudo num lugar só.

### O que o FitMe faz

- Uma calculadora que mostra de quantas calorias você precisa e quando pode chegar ao seu peso.
- Receitas ricas em proteína, com ingredientes de qualquer mercado, com calorias e macros por porção.
- Um cardápio grátis, ajustado às suas calorias, enviado por e-mail toda manhã, com a lista de compras da semana.

### Como escrevemos

- Calorias, proteína, carboidratos e gordura vêm dos próprios dados das receitas, então cada página bate com o plano e os e-mails.
- Os números de saúde, como um ritmo seguro de perda de peso por semana, seguem as recomendações de saúde pública e têm a fonte indicada.
- Contamos o que funcionou para nós, mas nunca prometemos resultados. Cada corpo é diferente.

*O FitMe traz informação geral e não substitui orientação médica. Se você tem alguma doença, está grávida ou tem menos de 18 anos, converse com um médico antes de mudar a alimentação.*

[[cta:Montar meu plano grátis]]`,
  },
};

export const GUIDES = [
  {
    key: 'calorie-deficit',
    published: '2026-11-27', updated: '2026-11-27',
    sources: [
      ['British Nutrition Foundation: overweight, obesity and weight loss', 'https://www.nutrition.org.uk/health-conditions/overweight-obesity-and-weight-loss'],
      ['Patient.info: weight reduction', 'https://patient.info/healthy-living/weight-loss-weight-reduction'],
    ],
    en: {
      slug: 'calorie-deficit',
      title: 'Calorie deficit: how to lose weight without guessing | FitMe',
      description: 'How a calorie deficit works, how big it should be and how long 5 or 10 kg takes, from someone who lost 12 kg in 3 months. Free calculator.',
      h1: 'Calorie deficit: how to lose weight without guessing',
      faqHeading: 'Questions people ask', sourcesLabel: 'Sources',
      body: `I lost 12 kg with a calorie deficit, going from 94 kg to 82 kg in about three months. Not with a special diet. I ate a little less than my body used, every day, and kept it simple. This guide explains how that works, how big your deficit should be and how long it really takes.

[[cta:Work out my calorie deficit]]

### What a calorie deficit is

Your body burns a certain number of calories each day just to keep you going, plus whatever you use moving around. That total is your maintenance. Eat less than that, and your body makes up the difference from stored fat. That gap is the calorie deficit.

As a rough guide, a kilogram of body fat holds about 7,700 calories. A deficit of about 500 to 600 calories a day adds up to roughly half a kilo a week.

### How big should your calorie deficit be?

UK health guidance points to a deficit of about 600 calories a day, and a loss of 0.5 to 1 kg a week. Faster than that, and more of what you lose can be muscle rather than fat.

| Pace | Daily deficit | Loss per week | Good for |
| --- | --- | --- | --- |
| Slow | about 300–400 kcal | about 0.25–0.5 kg | Small goals, or if you're close to your target |
| Recommended | about 500–600 kcal | about 0.5–1 kg | Most people |
| Faster | above 750 kcal | about 1 kg or more | Short periods only, and not for everyone |

### Calorie deficit calculator

The FitMe calorie deficit calculator works out your maintenance from your age, height, weight and daily activity, including your job. It then suggests a pace for your age and weight and shows the week you could reach your goal. It flags it if your intake gets too low or the pace too fast.

[[cta:Use the free calorie deficit calculator]]

To see what a week of eating in a deficit looks like, here's a [7-day meal plan for weight loss](/guides/weight-loss-meal-plan/) at 1,600 calories.

### How long it takes to lose 5 or 10 kg

At the recommended pace, 5 kg takes about 5 to 10 weeks and 10 kg about 10 to 20 weeks. My 12 kg took about three months, close to 1 kg a week.

The first four weeks are the hardest, because you don't see much yet. For me, that's when the difference started to show. After that, it was motivating to watch.

### Why being active might not be enough

I used to think calories didn't matter much as long as I was active. Then I realised I spent eight hours a day sitting at a desk. A gym session a few times a week doesn't cancel that out.

This is why the calculator asks about your job and your daily movement, not just your workouts. An office job and an active job can be several hundred calories a day apart.

### The mistake almost everyone makes: portions

Most people eat more than they think. A splash of oil, a bigger handful of pasta, a second spoon of peanut butter. None of it feels like much, and all of it counts.

Weighing my food for the first few weeks was what fixed it. You don't need to do it forever. After a while, you know what 60 g of pasta or 130 g of chicken looks like on the plate.

### What made it work for me: consistency and simplicity

- **The same breakfast every day.** One less decision. Mine always included whey protein. For some people the same breakfast is easier to stick to; others need variety. Pick what you'll actually keep doing.
- **Similar lunches and dinners.** A few meals I liked, repeated, like a [chicken and egg fried rice](/recipes/high-protein-chicken-fried-rice/) or a [pesto chicken traybake](/recipes/pesto-chicken-traybake-couscous/).
- **Cooking ahead.** Mostly at the weekend, with a top-up mid-week.
- **Avoiding eating out at the start.** Once I understood portions, I ate out again with confidence.
- **Better snacks.** Snacks were a problem until I changed what I chose. Greek yogurt and whey protein saved me there. A [chocolate protein yogurt](/recipes/chocolate-protein-yogurt/) is about 140 kcal. More ideas in the [high protein foods list](/guides/high-protein-foods/).

### When the scale stops moving

It's normal for weight loss to slow after the first few weeks, and for the scale to stay still for a few days. Look at the trend over several weeks, not one morning.

The scale also isn't the only measure. Pay attention to how you feel and how you look. Losing fat shows off the muscle underneath, so even when the number doesn't move, the mirror often does.

### How to lose belly fat (and why you can't target it)

You can't lose fat from your belly alone. You can't choose where your body loses fat first, and belly fat is often the slowest to go. What speeds things up is moving more: walking, training, less time sitting.

In the end, what you eat decides whether you lose weight. Your lifestyle is what makes the big changes possible.

### Questions people ask

**How do I lose 2 pounds (about 1 kg) a week?** You'd need a deficit of about 1,000 calories a day. That's at the top of what's considered safe, so for most people 0.5 to 1 kg a week is a better target.

**Can I lose 10 kg in a month?** Not safely. That's far above 0.5 to 1 kg a week, and much of it would be water and muscle.

**Do I have to count calories forever?** No. Use the numbers to learn your portions. Then keep the habits.

[[cta:Find my calories and get a free plan]]

*This guide is general information, not medical advice. If you have a health condition, are pregnant or are under 18, talk to a doctor before changing how you eat.*`,
    },
    pt: {
      slug: 'defice-calorico',
      title: 'Défice calórico: como emagrecer sem adivinhar | FitMe',
      description: 'Como funciona o défice calórico, de quanto deve ser e quanto tempo demoram 5 ou 10 kg, de quem perdeu 12 kg em 3 meses. Calculadora grátis.',
      h1: 'Défice calórico: como emagrecer sem adivinhar',
      faqHeading: 'Perguntas frequentes', sourcesLabel: 'Fontes',
      body: `Perdi 12 kg com um défice calórico: passei de 94 kg para 82 kg em cerca de três meses. Sem nenhuma dieta especial. Comi um pouco menos do que o meu corpo gastava, todos os dias, e mantive tudo simples. Este guia explica como funciona, de quanto deve ser o teu défice e quanto tempo demora a sério.

[[cta:Calcular o meu défice calórico]]

### O que é o défice calórico

O teu corpo gasta um certo número de calorias por dia só para te manter a funcionar, mais o que gastas a mexer-te. Esse total é a tua manutenção. Se comeres menos do que isso, o corpo vai buscar a diferença à gordura que tem guardada. Essa diferença é o défice calórico (também chamado deficit calórico).

Como referência, um quilo de gordura corporal tem cerca de 7700 calorias. Um défice de 500 a 600 calorias por dia dá mais ou menos meio quilo por semana.

### De quanto deve ser o teu défice calórico?

As recomendações de saúde apontam para um défice de cerca de 600 calorias por dia e uma perda de 0,5 a 1 kg por semana. Mais rápido do que isso, uma parte maior do que perdes pode ser músculo e não gordura.

| Ritmo | Défice por dia | Perda por semana | Indicado para |
| --- | --- | --- | --- |
| Lento | cerca de 300–400 kcal | cerca de 0,25–0,5 kg | Objetivos pequenos, ou quando já estás perto do peso que queres |
| Recomendado | cerca de 500–600 kcal | cerca de 0,5–1 kg | A maioria das pessoas |
| Mais rápido | acima de 750 kcal | cerca de 1 kg ou mais | Só por períodos curtos, e não para toda a gente |

### Calculadora de défice calórico

A calculadora de défice calórico do FitMe calcula a tua manutenção a partir da idade, altura, peso e atividade do dia a dia, incluindo o teu trabalho. Depois sugere um ritmo para a tua idade e o teu peso e mostra a semana em que podes chegar ao teu objetivo. Avisa-te se as calorias ficarem demasiado baixas ou o ritmo demasiado rápido.

[[cta:Usar a calculadora de défice calórico grátis]]

Para veres como é uma semana a comer em défice, tens aqui um [plano alimentar semanal para emagrecer](/pt/guias/plano-alimentar-para-emagrecer/) com 1600 calorias.

### Quanto tempo demora a perder 5 ou 10 kg

No ritmo recomendado, 5 kg demoram cerca de 5 a 10 semanas e 10 kg cerca de 10 a 20 semanas. Os meus 12 kg demoraram cerca de três meses, perto de 1 kg por semana.

As primeiras quatro semanas são as mais difíceis, porque ainda se vê pouco. Foi aí que comecei a notar a diferença. A partir daí, foi motivante acompanhar.

### Porque ser ativo pode não chegar

Eu achava que as calorias não importavam muito desde que fosse ativo. Depois percebi que passava oito horas por dia sentado a uma secretária. Ir ao ginásio algumas vezes por semana não compensa isso.

É por isso que a calculadora pergunta pelo teu trabalho e pelo movimento do dia a dia, e não só pelos treinos. Um trabalho de escritório e um trabalho ativo podem estar várias centenas de calorias por dia de distância.

### O erro que quase toda a gente comete: as porções

A maioria das pessoas come mais do que pensa. Um fio de azeite a mais, uma mão-cheia maior de massa, uma segunda colher de manteiga de amendoim. Nada disto parece muito, e tudo conta.

Pesar a comida nas primeiras semanas foi o que resolveu isto para mim. Não precisas de o fazer para sempre. Ao fim de algum tempo, já sabes como são 60 g de massa ou 130 g de frango no prato.

### O que resultou comigo: consistência e simplicidade

- **O mesmo pequeno-almoço todos os dias.** Menos uma decisão. O meu levava sempre whey. Para algumas pessoas, repetir o pequeno-almoço é mais fácil de cumprir; outras precisam de variedade. Escolhe o que vais conseguir manter.
- **Almoços e jantares parecidos.** Algumas refeições de que gostava, repetidas, como um [arroz chau-chau com frango](/pt/receitas/arroz-chau-chau-com-frango/) ou um [frango com pesto no forno](/pt/receitas/frango-com-pesto-no-forno/).
- **Cozinhar com antecedência.** Sobretudo ao fim de semana, com um reforço a meio da semana.
- **Evitar comer fora no início.** Quando percebi as porções, voltei a comer fora com confiança.
- **Melhores lanches.** Os lanches eram um problema até mudar o que escolhia. O iogurte grego e o whey salvaram-me aí. Um [iogurte proteico de chocolate](/pt/receitas/iogurte-proteico-de-chocolate/) tem cerca de 140 kcal. Mais ideias na [lista de alimentos ricos em proteína](/pt/guias/alimentos-ricos-em-proteina/).

### Quando a balança pára

É normal o ritmo abrandar depois das primeiras semanas, e a balança ficar parada alguns dias. Olha para a tendência ao longo de várias semanas, não para uma manhã.

A balança também não é a única medida. Repara em como te sentes e em como te vês. Perder gordura deixa ver o músculo que está por baixo, por isso, mesmo quando o número não mexe, o espelho muitas vezes mexe.

### Como perder barriga (e porque não dá para escolher onde)

Não dá para perder gordura só na barriga. Não escolhes onde o corpo perde gordura primeiro, e a barriga é muitas vezes a última a ir. O que acelera o processo é mexeres-te mais: caminhar, treinar, passar menos tempo sentado.

No fim, é o que comes que decide se emagreces. O teu estilo de vida é o que torna possíveis as grandes mudanças.

### Perguntas frequentes

**Como perder 1 kg por semana?** Precisarias de um défice de cerca de 1000 calorias por dia. Isso está no limite do que é considerado seguro, por isso, para a maioria das pessoas, 0,5 a 1 kg por semana é um objetivo melhor.

**Dá para perder 10 kg num mês?** Não de forma segura. É muito acima de 0,5 a 1 kg por semana, e grande parte seria água e músculo.

**Tenho de contar calorias para sempre?** Não. Usa os números para aprender as porções. Depois mantém os hábitos.

[[cta:Calcular as minhas calorias e receber um plano grátis]]

*Este guia é informação geral e não substitui aconselhamento médico. Se tens alguma doença, estás grávida ou tens menos de 18 anos, fala com um médico antes de mudares a alimentação.*`,
    },
    br: {
      slug: 'deficit-calorico',
      title: 'Déficit calórico: como emagrecer sem chutar | FitMe',
      description: 'Como funciona o déficit calórico, de quanto ele deve ser e quanto tempo levam 5 ou 10 kg, de quem perdeu 12 kg em 3 meses. Calculadora grátis.',
      h1: 'Déficit calórico: como emagrecer sem chutar',
      faqHeading: 'Perguntas frequentes', sourcesLabel: 'Fontes',
      body: `Eu perdi 12 kg com déficit calórico: fui de 94 kg para 82 kg em mais ou menos três meses. Sem dieta milagrosa. Comi um pouco menos do que meu corpo gastava, todo dia, e mantive tudo simples. Este guia explica como funciona, de quanto deve ser o seu déficit e quanto tempo leva de verdade.

[[cta:Calcular meu déficit calórico]]

### O que é déficit calórico

Seu corpo gasta uma certa quantidade de calorias por dia só para funcionar, mais o que você gasta se movimentando. Esse total é a sua manutenção. Se você come menos do que isso, o corpo tira a diferença da gordura que tem guardada. Essa diferença é o déficit calórico.

Como referência, um quilo de gordura corporal tem cerca de 7.700 calorias. Um déficit de 500 a 600 calorias por dia dá mais ou menos meio quilo por semana.

### De quanto deve ser o seu déficit calórico?

As recomendações de saúde apontam para um déficit de cerca de 600 calorias por dia e uma perda de 0,5 a 1 kg por semana. Mais rápido do que isso, uma parte maior do que você perde pode ser músculo, e não gordura.

| Ritmo | Déficit por dia | Perda por semana | Indicado para |
| --- | --- | --- | --- |
| Lento | cerca de 300–400 kcal | cerca de 0,25–0,5 kg | Metas pequenas, ou quando você já está perto do peso que quer |
| Recomendado | cerca de 500–600 kcal | cerca de 0,5–1 kg | A maioria das pessoas |
| Mais rápido | acima de 750 kcal | cerca de 1 kg ou mais | Só por períodos curtos, e não para todo mundo |

### Calculadora de déficit calórico

A calculadora de déficit calórico do FitMe calcula a sua manutenção a partir da idade, altura, peso e atividade do dia a dia, incluindo o seu trabalho. Depois sugere um ritmo para a sua idade e o seu peso e mostra a semana em que você pode chegar à sua meta. Ela avisa se as calorias ficarem baixas demais ou o ritmo rápido demais.

[[cta:Usar a calculadora de déficit calórico grátis]]

Para ver como é uma semana comendo em déficit, aqui está um [cardápio semanal para emagrecer](/br/guias/cardapio-para-emagrecer/) com 1.600 calorias.

### Quanto tempo leva para perder 5 ou 10 kg

No ritmo recomendado, 5 kg levam de 5 a 10 semanas, e 10 kg de 10 a 20 semanas. Os meus 12 kg levaram uns três meses, perto de 1 kg por semana.

As primeiras quatro semanas são as mais difíceis, porque ainda dá para ver pouco. Foi aí que eu comecei a notar a diferença. Dali em diante, foi motivador acompanhar.

### Por que ser ativo pode não bastar

Eu achava que caloria não importava tanto se eu fosse ativo. Aí percebi que passava oito horas por dia sentado na frente do computador. Ir para a academia algumas vezes por semana não compensa isso.

É por isso que a calculadora pergunta sobre o seu trabalho e o seu movimento no dia a dia, e não só sobre os treinos. Um trabalho de escritório e um trabalho ativo podem ter várias centenas de calorias de diferença por dia.

### O erro que quase todo mundo comete: as porções

A maioria das pessoas come mais do que imagina. Um fio de azeite a mais, um punhado maior de macarrão, uma segunda colher de pasta de amendoim. Nada disso parece muito, e tudo conta.

Pesar a comida nas primeiras semanas foi o que resolveu isso para mim. Você não precisa fazer isso para sempre. Depois de um tempo, você já sabe como são 60 g de macarrão ou 130 g de frango no prato.

### O que funcionou para mim: constância e simplicidade

- **O mesmo café da manhã todo dia.** Uma decisão a menos. O meu sempre tinha whey. Para algumas pessoas, repetir o café da manhã é mais fácil de seguir; outras precisam de variedade. Escolha o que você vai conseguir manter.
- **Almoços e jantares parecidos.** Algumas refeições de que eu gostava, repetidas, como um [arroz frito com frango](/br/receitas/arroz-frito-com-frango-fit/) ou um [frango ao pesto com legumes assados](/br/receitas/frango-ao-pesto-com-legumes-assados/).
- **Marmitas prontas.** Principalmente no fim de semana, com uma leva extra no meio da semana.
- **Evitar comer fora no começo.** Quando entendi as porções, voltei a comer fora com confiança.
- **Lanches melhores.** Os lanches eram um problema até eu mudar o que escolhia. Iogurte grego e whey me salvaram nessa. Um [iogurte proteico de chocolate](/br/receitas/iogurte-proteico-de-chocolate/) tem cerca de 140 kcal. Mais ideias na [lista de alimentos ricos em proteína](/br/guias/alimentos-ricos-em-proteina/).

### Quando a balança para

É normal o ritmo diminuir depois das primeiras semanas, e a balança ficar parada por alguns dias. Olhe a tendência ao longo de várias semanas, não uma manhã só.

A balança também não é a única medida. Preste atenção em como você se sente e em como você se vê. Perder gordura deixa aparecer o músculo que está embaixo, então, mesmo quando o número não muda, o espelho muitas vezes muda.

### Como perder barriga (e por que não dá para escolher onde)

Não dá para perder gordura só na barriga. Você não escolhe onde o corpo perde gordura primeiro, e a barriga costuma ser a última a sair. O que acelera o processo é se movimentar mais: caminhar, treinar, passar menos tempo sentado.

No fim das contas, é o que você come que decide se você emagrece. O seu estilo de vida é o que torna possíveis as grandes mudanças.

### Perguntas frequentes

**Como perder 1 kg por semana?** Você precisaria de um déficit de cerca de 1.000 calorias por dia. Isso está no limite do que é considerado seguro, então, para a maioria das pessoas, 0,5 a 1 kg por semana é uma meta melhor.

**Dá para perder 10 kg em 1 mês?** Não com segurança. É muito acima de 0,5 a 1 kg por semana, e boa parte seria água e músculo.

**Vou ter que contar calorias para sempre?** Não. Use os números para aprender as porções. Depois, mantenha os hábitos.

[[cta:Calcular minhas calorias e receber um plano grátis]]

*Este guia é informação geral e não substitui orientação médica. Se você tem alguma doença, está grávida ou tem menos de 18 anos, converse com um médico antes de mudar a alimentação.*`,
    },
  },
  {
    key: 'high-protein-foods',
    published: '2026-11-27', updated: '2026-11-27',
    sources: [
      ['Leidy et al. (2015), The role of protein in weight loss and maintenance, American Journal of Clinical Nutrition', 'https://pubmed.ncbi.nlm.nih.gov/25926512/'],
    ],
    en: {
      slug: 'high-protein-foods',
      title: 'High protein low calorie foods: the list that keeps you full | FitMe',
      description: '28 high protein, low calorie foods ranked by protein per 100 kcal, how much protein you need to lose weight, and a 128 g protein day.',
      h1: 'High protein, low calorie foods: the list that keeps you full',
      faqHeading: 'Questions people ask', sourcesLabel: 'Sources',
      body: `When I was losing weight, the same five high protein foods went into my basket every week: 0% Greek yogurt, whey protein, chicken, tuna and eggs. Protein is what kept me full on fewer calories. This guide ranks 28 high protein, low calorie foods from the supermarket by how much protein you get per calorie, and shows how much you need.

[[cta:Find my daily protein target]]

### Why a high protein diet helps you lose weight

In a [calorie deficit](/guides/calorie-deficit/), you want the weight you lose to be fat, not muscle. Studies comparing diets with the same calories find that people eating more protein keep more muscle and lose more fat. Protein also helps you feel full, which makes eating less easier to stick to.

### How much protein do you need to lose weight?

Research on weight loss points to about 1.2 to 1.6 g of protein per kg of body weight a day, with around 25 to 30 g at each meal. FitMe uses 1.5 g per kg of your goal weight. If your goal is 75 kg, that's about 110 g a day.

The calculator works out your number and builds a meal plan that reaches it.

### High protein, low calorie foods: the full list

The last column is the one that matters when you're cutting calories: grams of protein for every 100 kcal. The higher it is, the more protein you get for your calories.

| Food | Protein per 100 g | kcal per 100 g | Protein per 100 kcal |
| --- | --- | --- | --- |
| Raw peeled prawns | 20 g | 85 | 23.5 g |
| Tuna in water (drained) | 26 g | 116 | 22.4 g |
| Cod fillet | 18 g | 82 | 22.0 g |
| Egg whites | 11 g | 52 | 21.2 g |
| Whey protein powder | 80 g | 400 | 20.0 g |
| Chicken breast | 23 g | 120 | 19.2 g |
| Pork tenderloin | 21 g | 120 | 17.5 g |
| Greek yogurt 0% | 10 g | 59 | 16.9 g |
| Turkey mince (5% fat) | 21 g | 130 | 16.2 g |
| Smoked salmon | 18 g | 117 | 15.4 g |
| Lean beef mince (5% fat) | 21 g | 137 | 15.3 g |
| Baby spinach | 2.9 g | 23 | 12.6 g |
| Cottage cheese | 11 g | 98 | 11.2 g |
| Firm tofu | 15.5 g | 144 | 10.8 g |
| Salmon fillet | 20 g | 208 | 9.6 g |
| Eggs | 12.6 g | 143 | 8.8 g |
| Parmesan | 38 g | 431 | 8.8 g |
| Broccoli | 2.8 g | 34 | 8.2 g |
| Red lentils (dry) | 25 g | 352 | 7.1 g |
| Frozen peas | 5.4 g | 81 | 6.7 g |
| Black beans (canned, drained) | 7 g | 110 | 6.4 g |
| Chickpeas (canned, drained) | 7.2 g | 139 | 5.2 g |
| Hummus | 8 g | 166 | 4.8 g |
| Peanut butter | 25 g | 588 | 4.3 g |
| Wholewheat pasta (dry) | 13 g | 348 | 3.7 g |
| Almonds | 21 g | 579 | 3.6 g |
| Rolled oats | 13 g | 379 | 3.4 g |
| Wholewheat couscous (dry) | 12 g | 362 | 3.3 g |

Spinach and broccoli score well per calorie, but you'd need a lot of them to make a difference. Their job is volume and fibre. Your protein comes from the top of the list.

### My five weekly protein staples

- **Greek yogurt 0%.** 10 g of protein per 100 g for 59 kcal. Breakfast, snacks and creamy sauces, as in the [chocolate protein yogurt](/recipes/chocolate-protein-yogurt/).
- **Whey protein.** The easiest 20 to 25 g of protein in the day. I had it every morning.
- **Chicken breast.** The base of most of my lunches and dinners, like the [chicken and egg fried rice](/recipes/high-protein-chicken-fried-rice/).
- **Tuna in water.** Cheap, keeps for months and needs no cooking. Try the [creamy tuna pasta](/recipes/high-protein-tuna-pasta/).
- **Eggs.** Breakfast in five minutes, like the [spinach and parmesan omelette](/recipes/spinach-parmesan-omelette/).

### My best trick: Greek yogurt, whey and berries

Stir a scoop of whey into a bowl of 0% Greek yogurt and top it with berries. It tastes like dessert, and it's one of the highest-protein snacks you can make for the calories. I had it at breakfast or as an afternoon snack.

### Do you need protein powder?

No. Whey makes it easier, and it worked for me, but it's optional. Every FitMe recipe reaches its protein from normal food. The [protein porridge](/recipes/high-protein-porridge/), for example, gets 24 g from milk and Greek yogurt.

### A high protein day from FitMe recipes

| Meal | Recipe | Protein | kcal |
| --- | --- | --- | --- |
| Breakfast | [Apple and cinnamon protein porridge](/recipes/high-protein-porridge/) | 24 g | 435 |
| Lunch | [Chicken and egg fried rice](/recipes/high-protein-chicken-fried-rice/) | 46 g | 595 |
| Snack | [Chocolate protein yogurt](/recipes/chocolate-protein-yogurt/) | 16 g | 140 |
| Dinner | [Pesto chicken traybake with couscous](/recipes/pesto-chicken-traybake-couscous/) | 42 g | 535 |
| **Total** | | **128 g** | **1,705** |

In your FitMe plan, the portions are scaled to your own calories and protein target. For a full week built the same way, see the [7-day meal plan for weight loss](/guides/weight-loss-meal-plan/).

### Watch the high protein foods that are high in calories

Peanut butter, almonds and parmesan have plenty of protein, but a lot of calories come with it. Use them in small amounts. In the plan, wherever a recipe uses peanut butter, swapping it for fruit gives you a bigger portion for fewer calories.

### Questions people ask

**Which food has the most protein per calorie?** Of everyday supermarket foods, prawns, tuna in water, white fish like cod, and egg whites come out on top, at over 20 g of protein per 100 kcal.

**Is 1.5 g per kg too much protein?** For most healthy adults, no. It sits inside the range studied for weight loss. If you have kidney disease, talk to your doctor first.

**Can I get enough protein as a vegetarian?** Yes. Greek yogurt, cottage cheese, eggs, tofu, lentils and beans cover it. Every FitMe main meal has a vegetarian version, like the [tofu curry](/recipes/high-protein-tofu-curry/).

[[cta:Get my free high protein plan]]

*This guide is general information, not medical advice. If you have a health condition, are pregnant or are under 18, talk to a doctor before changing how you eat.*`,
    },
    pt: {
      slug: 'alimentos-ricos-em-proteina',
      title: 'Alimentos ricos em proteína: a lista para emagrecer saciado | FitMe',
      description: '28 alimentos ricos em proteína ordenados por proteína por 100 kcal, quanta proteína precisas para emagrecer e um dia com 128 g.',
      h1: 'Alimentos ricos em proteína: a lista para emagrecer saciado',
      faqHeading: 'Perguntas frequentes', sourcesLabel: 'Fontes',
      body: `Quando estava a emagrecer, os mesmos cinco alimentos ricos em proteína iam para o cesto todas as semanas: iogurte grego magro, whey, frango, atum e ovos. Foi a proteína que me manteve saciado com menos calorias. Este guia ordena 28 alimentos de supermercado pela proteína que dão por caloria e mostra de quanta precisas.

[[cta:Calcular a minha proteína diária]]

### Porque uma dieta rica em proteína ajuda a emagrecer

Num [défice calórico](/pt/guias/defice-calorico/), queres que o peso que perdes seja gordura e não músculo. Os estudos que comparam dietas com as mesmas calorias mostram que quem come mais proteína mantém mais músculo e perde mais gordura. A proteína também ajuda a ficar saciado, o que torna mais fácil comer menos.

### De quanta proteína precisas para emagrecer?

A investigação sobre perda de peso aponta para cerca de 1,2 a 1,6 g de proteína por kg de peso por dia, com 25 a 30 g em cada refeição. O FitMe usa 1,5 g por kg do teu peso objetivo. Se o teu objetivo são 75 kg, dá cerca de 110 g por dia.

A calculadora faz a conta por ti e monta um plano de refeições que lá chega.

### Alimentos ricos em proteína: a lista completa

A última coluna é a que conta quando estás a cortar calorias: gramas de proteína por cada 100 kcal. Quanto mais alta, mais proteína tens pelas mesmas calorias.

| Alimento | Proteína por 100 g | kcal por 100 g | Proteína por 100 kcal |
| --- | --- | --- | --- |
| Camarão cru descascado | 20 g | 85 | 23,5 g |
| Atum ao natural (escorrido) | 26 g | 116 | 22,4 g |
| Bacalhau fresco, lombo | 18 g | 82 | 22,0 g |
| Claras de ovo | 11 g | 52 | 21,2 g |
| Proteína whey em pó | 80 g | 400 | 20,0 g |
| Peito de frango | 23 g | 120 | 19,2 g |
| Lombinho de porco | 21 g | 120 | 17,5 g |
| Iogurte grego magro (0%) | 10 g | 59 | 16,9 g |
| Carne picada de peru (5% gordura) | 21 g | 130 | 16,2 g |
| Salmão fumado | 18 g | 117 | 15,4 g |
| Carne picada de vaca magra (5% gordura) | 21 g | 137 | 15,3 g |
| Espinafres baby | 2,9 g | 23 | 12,6 g |
| Queijo cottage | 11 g | 98 | 11,2 g |
| Tofu firme | 15,5 g | 144 | 10,8 g |
| Lombo de salmão | 20 g | 208 | 9,6 g |
| Ovos | 12,6 g | 143 | 8,8 g |
| Queijo parmesão | 38 g | 431 | 8,8 g |
| Brócolos | 2,8 g | 34 | 8,2 g |
| Lentilhas vermelhas (secas) | 25 g | 352 | 7,1 g |
| Ervilhas congeladas | 5,4 g | 81 | 6,7 g |
| Feijão preto cozido (escorrido) | 7 g | 110 | 6,4 g |
| Grão-de-bico cozido (escorrido) | 7,2 g | 139 | 5,2 g |
| Húmus | 8 g | 166 | 4,8 g |
| Manteiga de amendoim | 25 g | 588 | 4,3 g |
| Massa integral (crua) | 13 g | 348 | 3,7 g |
| Amêndoas | 21 g | 579 | 3,6 g |
| Flocos de aveia | 13 g | 379 | 3,4 g |
| Cuscuz integral (cru) | 12 g | 362 | 3,3 g |

Os espinafres e os brócolos têm boa nota por caloria, mas era preciso comer muito para fazerem diferença. O papel deles é dar volume e fibra. A proteína vem do topo da lista.

### As minhas cinco fontes de proteína da semana

- **Iogurte grego magro.** 10 g de proteína por 100 g, com 59 kcal. Pequeno-almoço, lanches e molhos cremosos, como no [iogurte proteico de chocolate](/pt/receitas/iogurte-proteico-de-chocolate/).
- **Whey.** Os 20 a 25 g de proteína mais fáceis do dia. Eu tomava todas as manhãs.
- **Peito de frango.** A base da maioria dos meus almoços e jantares, como o [arroz chau-chau com frango](/pt/receitas/arroz-chau-chau-com-frango/).
- **Atum ao natural.** Barato, aguenta meses na despensa e não precisa de cozinhar. Experimenta a [massa cremosa com atum](/pt/receitas/massa-cremosa-com-atum/).
- **Ovos.** Pequeno-almoço em cinco minutos, como a [omelete de espinafres e parmesão](/pt/receitas/omelete-de-espinafres-e-parmesao/).

### O meu melhor truque: iogurte grego, whey e frutos vermelhos

Mistura uma dose de whey numa taça de iogurte grego magro e junta frutos vermelhos por cima. Sabe a sobremesa e é dos lanches com mais proteína que podes fazer pelas calorias. Eu comia ao pequeno-almoço ou a meio da tarde.

### Precisas de proteína em pó?

Não. O whey facilita, e comigo resultou, mas é opcional. Todas as receitas do FitMe chegam à proteína com comida normal. As [papas de aveia proteicas](/pt/receitas/papas-de-aveia-proteicas/), por exemplo, chegam aos 24 g com leite e iogurte grego.

### Um dia rico em proteína com receitas FitMe

| Refeição | Receita | Proteína | kcal |
| --- | --- | --- | --- |
| Pequeno-almoço | [Papas de aveia proteicas com maçã e canela](/pt/receitas/papas-de-aveia-proteicas/) | 24 g | 435 |
| Almoço | [Arroz chau-chau com frango e ovo](/pt/receitas/arroz-chau-chau-com-frango/) | 46 g | 595 |
| Lanche | [Iogurte proteico de chocolate](/pt/receitas/iogurte-proteico-de-chocolate/) | 16 g | 140 |
| Jantar | [Frango com pesto no forno e cuscuz](/pt/receitas/frango-com-pesto-no-forno/) | 42 g | 535 |
| **Total** | | **128 g** | **1705** |

No teu plano FitMe, as doses são ajustadas às tuas calorias e à tua proteína. Para uma semana completa feita da mesma forma, vê o [plano alimentar semanal para emagrecer](/pt/guias/plano-alimentar-para-emagrecer/).

### Cuidado com os alimentos proteicos que têm muitas calorias

A manteiga de amendoim, as amêndoas e o parmesão têm bastante proteína, mas trazem muitas calorias com ela. Usa-os em pouca quantidade. No plano, sempre que uma receita leva manteiga de amendoim, trocá-la por fruta dá uma dose maior com menos calorias.

### Perguntas frequentes

**Qual é o alimento com mais proteína por caloria?** Entre os alimentos de supermercado do dia a dia, o camarão, o atum ao natural, o peixe branco como o bacalhau fresco e as claras de ovo ficam no topo, com mais de 20 g de proteína por 100 kcal.

**1,5 g por kg é proteína a mais?** Para a maioria dos adultos saudáveis, não. Está dentro do intervalo estudado para a perda de peso. Se tens doença renal, fala primeiro com o teu médico.

**Dá para comer proteína suficiente sendo vegetariano?** Sim. Iogurte grego, queijo cottage, ovos, tofu, lentilhas e feijão chegam. Todas as refeições principais do FitMe têm versão vegetariana, como o [caril de tofu](/pt/receitas/caril-de-tofu-com-grao/).

[[cta:Receber o meu plano proteico grátis]]

*Este guia é informação geral e não substitui aconselhamento médico. Se tens alguma doença, estás grávida ou tens menos de 18 anos, fala com um médico antes de mudares a alimentação.*`,
    },
    br: {
      slug: 'alimentos-ricos-em-proteina',
      title: 'Alimentos ricos em proteína: a lista para emagrecer sem passar fome | FitMe',
      description: '28 alimentos ricos em proteína em ordem de proteína por 100 kcal, quanta proteína você precisa para emagrecer e um dia com 128 g.',
      h1: 'Alimentos ricos em proteína: a lista para emagrecer sem passar fome',
      faqHeading: 'Perguntas frequentes', sourcesLabel: 'Fontes',
      body: `Quando eu estava emagrecendo, os mesmos cinco alimentos ricos em proteína iam para o carrinho toda semana: iogurte grego desnatado, whey, frango, atum e ovos. Foi a proteína que me deixou saciado comendo menos calorias. Este guia coloca 28 alimentos de mercado em ordem pela proteína que eles dão por caloria e mostra de quanta você precisa.

[[cta:Calcular minha proteína diária]]

### Por que uma dieta rica em proteína ajuda a emagrecer

No [déficit calórico](/br/guias/deficit-calorico/), você quer que o peso perdido seja gordura, e não músculo. Estudos que comparam dietas com as mesmas calorias mostram que quem come mais proteína mantém mais músculo e perde mais gordura. A proteína também ajuda a dar saciedade, o que deixa mais fácil comer menos.

### De quanta proteína você precisa para emagrecer?

As pesquisas sobre perda de peso apontam para cerca de 1,2 a 1,6 g de proteína por kg de peso por dia, com 25 a 30 g em cada refeição. O FitMe usa 1,5 g por kg do seu peso meta. Se a sua meta é 75 kg, dá uns 110 g por dia.

A calculadora faz essa conta e monta um cardápio que chega lá.

### Alimentos ricos em proteína: a lista completa

A última coluna é a que importa quando você está cortando calorias: gramas de proteína a cada 100 kcal. Quanto maior o número, mais proteína você ganha pelas mesmas calorias.

| Alimento | Proteína por 100 g | kcal por 100 g | Proteína por 100 kcal |
| --- | --- | --- | --- |
| Camarão cru descascado | 20 g | 85 | 23,5 g |
| Atum em água (escorrido) | 26 g | 116 | 22,4 g |
| Bacalhau fresco, lombo | 18 g | 82 | 22,0 g |
| Claras de ovo | 11 g | 52 | 21,2 g |
| Whey protein em pó | 80 g | 400 | 20,0 g |
| Peito de frango | 23 g | 120 | 19,2 g |
| Lombo de porco | 21 g | 120 | 17,5 g |
| Iogurte grego natural desnatado (0%) | 10 g | 59 | 16,9 g |
| Carne moída de peru (5% de gordura) | 21 g | 130 | 16,2 g |
| Salmão defumado | 18 g | 117 | 15,4 g |
| Carne moída magra (patinho, 5% de gordura) | 21 g | 137 | 15,3 g |
| Espinafre baby | 2,9 g | 23 | 12,6 g |
| Queijo cottage | 11 g | 98 | 11,2 g |
| Tofu firme | 15,5 g | 144 | 10,8 g |
| Lombo de salmão | 20 g | 208 | 9,6 g |
| Ovos | 12,6 g | 143 | 8,8 g |
| Queijo parmesão | 38 g | 431 | 8,8 g |
| Brócolis | 2,8 g | 34 | 8,2 g |
| Lentilha vermelha (seca) | 25 g | 352 | 7,1 g |
| Ervilhas congeladas | 5,4 g | 81 | 6,7 g |
| Feijão preto cozido (escorrido) | 7 g | 110 | 6,4 g |
| Grão-de-bico cozido (escorrido) | 7,2 g | 139 | 5,2 g |
| Homus | 8 g | 166 | 4,8 g |
| Pasta de amendoim | 25 g | 588 | 4,3 g |
| Macarrão integral (cru) | 13 g | 348 | 3,7 g |
| Amêndoas | 21 g | 579 | 3,6 g |
| Aveia em flocos | 13 g | 379 | 3,4 g |
| Cuscuz marroquino integral (cru) | 12 g | 362 | 3,3 g |

Espinafre e brócolis vão bem por caloria, mas você teria que comer muito para fazer diferença. O papel deles é dar volume e fibra. A proteína vem do topo da lista.

### Minhas cinco fontes de proteína da semana

- **Iogurte grego desnatado.** 10 g de proteína por 100 g, com 59 kcal. Café da manhã, lanches e molhos cremosos, como no [iogurte proteico de chocolate](/br/receitas/iogurte-proteico-de-chocolate/).
- **Whey.** Os 20 a 25 g de proteína mais fáceis do dia. Eu tomava toda manhã.
- **Peito de frango.** A base da maioria dos meus almoços e jantares, como o [arroz frito com frango](/br/receitas/arroz-frito-com-frango-fit/).
- **Atum em água.** Barato, dura meses no armário e não precisa cozinhar. Experimente o [macarrão cremoso com atum](/br/receitas/macarrao-cremoso-com-atum-fit/).
- **Ovos.** Café da manhã em cinco minutos, como a [omelete de espinafre e parmesão](/br/receitas/omelete-de-espinafre-e-parmesao/).

### Meu melhor truque: iogurte grego, whey e frutas vermelhas

Misture uma dose de whey num pote de iogurte grego desnatado e coloque frutas vermelhas por cima. Tem gosto de sobremesa e é um dos lanches com mais proteína que você pode fazer pelas calorias. Eu comia no café da manhã ou no meio da tarde.

### Você precisa de proteína em pó?

Não. O whey facilita, e funcionou para mim, mas é opcional. Todas as receitas do FitMe chegam à proteína com comida de verdade. O [mingau de aveia proteico](/br/receitas/mingau-de-aveia-proteico/), por exemplo, chega a 24 g com leite e iogurte grego.

### Um dia rico em proteína com receitas do FitMe

| Refeição | Receita | Proteína | kcal |
| --- | --- | --- | --- |
| Café da manhã | [Mingau de aveia proteico com maçã e canela](/br/receitas/mingau-de-aveia-proteico/) | 24 g | 435 |
| Almoço | [Arroz frito com frango e ovo](/br/receitas/arroz-frito-com-frango-fit/) | 46 g | 595 |
| Lanche | [Iogurte proteico de chocolate](/br/receitas/iogurte-proteico-de-chocolate/) | 16 g | 140 |
| Jantar | [Frango ao pesto com legumes assados e cuscuz marroquino](/br/receitas/frango-ao-pesto-com-legumes-assados/) | 42 g | 535 |
| **Total** | | **128 g** | **1.705** |

No seu plano FitMe, as porções são ajustadas às suas calorias e à sua meta de proteína. Para uma semana completa montada do mesmo jeito, veja o [cardápio semanal para emagrecer](/br/guias/cardapio-para-emagrecer/).

### Cuidado com os alimentos proteicos que têm muitas calorias

Pasta de amendoim, amêndoas e parmesão têm bastante proteína, mas trazem muitas calorias junto. Use em pouca quantidade. No cardápio, sempre que uma receita leva pasta de amendoim, trocar por fruta dá uma porção maior com menos calorias.

### Perguntas frequentes

**Qual alimento tem mais proteína por caloria?** Entre os alimentos de mercado do dia a dia, camarão, atum em água, peixe branco como o bacalhau fresco e claras de ovo ficam no topo, com mais de 20 g de proteína a cada 100 kcal.

**1,5 g por kg é proteína demais?** Para a maioria dos adultos saudáveis, não. Está dentro da faixa estudada para perda de peso. Se você tem doença renal, converse antes com o seu médico.

**Dá para comer proteína suficiente sendo vegetariano?** Dá. Iogurte grego, queijo cottage, ovos, tofu, lentilha e feijão resolvem. Todas as refeições principais do FitMe têm versão vegetariana, como o [curry de tofu](/br/receitas/curry-de-tofu-fit/).

[[cta:Receber meu cardápio proteico grátis]]

*Este guia é informação geral e não substitui orientação médica. Se você tem alguma doença, está grávida ou tem menos de 18 anos, converse com um médico antes de mudar a alimentação.*`,
    },
  },
  {
    key: 'weight-loss-meal-plan',
    published: '2026-11-27', updated: '2026-11-27',
    sources: [],
    en: {
      slug: 'weight-loss-meal-plan',
      title: 'A 7-day meal plan for weight loss (free, high protein) | FitMe',
      description: 'A free weekly meal plan for weight loss: 7 days at 1,600 kcal and 110–135 g of protein a day, with the shopping list, snacks and meal prep tips.',
      h1: 'A 7-day meal plan for weight loss (free, high protein)',
      faqHeading: 'Questions people ask', sourcesLabel: 'Sources',
      body: `This is a free 7-day meal plan for weight loss at about 1,600 calories and 110 to 135 g of protein a day. It's the same week a FitMe subscriber gets, with the shopping list and the tips that made it work for me when I lost 12 kg.

[[cta:Get this plan sized to my calories]]

### The 7-day meal plan for weight loss

Every day has four meals: breakfast, lunch, an afternoon snack and dinner. The numbers below are for a 1,600-calorie day.

| Day | Breakfast | Lunch | Snack | Dinner | kcal | Protein |
| --- | --- | --- | --- | --- | --- | --- |
| Monday | Berry overnight oats | Chicken and chickpea curry | Boiled eggs and cucumber | Beef and black bean chilli | 1,585 | 120 g |
| Tuesday | Spinach and parmesan omelette | Beef and black bean chilli | Chocolate protein yogurt | Lemon-garlic chicken traybake | 1,615 | 136 g |
| Wednesday | Banana protein pancakes | Lemon-garlic chicken traybake | Chocolate protein yogurt | Creamy tomato and spinach spaghetti | 1,555 | 119 g |
| Thursday | Berry overnight oats | Creamy tomato and spinach spaghetti | Boiled eggs and cucumber | Chicken and chickpea curry | 1,570 | 113 g |
| Friday | Spinach and parmesan omelette | Chicken and chickpea curry | Chocolate protein yogurt | Beef and black bean chilli | 1,620 | 133 g |
| Saturday | Banana protein pancakes | Beef and black bean chilli | Chocolate protein yogurt | Lemon-garlic chicken traybake | 1,570 | 126 g |
| Sunday | Berry overnight oats | Lemon-garlic chicken traybake | Boiled eggs and cucumber | Creamy tomato and spinach spaghetti | 1,560 | 117 g |

Look at the pattern: tonight's dinner is tomorrow's lunch. You cook once and eat twice, which is what makes this plan easy to keep up.

The nine recipes in the week, each with ingredients and method:

- Breakfasts: [berry overnight oats](/recipes/high-protein-overnight-oats/), [spinach and parmesan omelette](/recipes/spinach-parmesan-omelette/), [banana protein pancakes](/recipes/banana-protein-pancakes/)
- Mains: [chicken and chickpea curry](/recipes/high-protein-chicken-curry/), [beef and black bean chilli](/recipes/high-protein-beef-chilli/), [lemon-garlic chicken traybake](/recipes/lemon-garlic-chicken-traybake/), [creamy tomato and spinach spaghetti](/recipes/creamy-tomato-spinach-spaghetti/)
- Snacks: [boiled eggs and cucumber](/recipes/boiled-eggs-cucumber-snack/), [chocolate protein yogurt](/recipes/chocolate-protein-yogurt/)

The recipe pages show one standard portion. In the plan, each portion is sized so the day adds up to your calories, which is why the numbers in the table can differ a little.

### Weight loss shopping list for the week

The whole week comes to about 28 items, because the recipes share ingredients:

- **Fruit and veg (10):** mixed berries, bananas, baby spinach, broccoli, baby potatoes, onions, garlic, bell peppers, cucumber, lemon juice
- **Meat and fish (2):** chicken breast, lean beef mince (5% fat)
- **Dairy and eggs (6):** 0% Greek yogurt, eggs, semi-skimmed milk, cottage cheese, parmesan, vegetarian hard cheese
- **Grains and bread (4):** rolled oats, wholegrain bread, wholewheat pasta, basmati rice
- **Store cupboard (6):** chickpeas, black beans, chopped tomatoes, cocoa powder, honey, olive oil, plus spices

FitMe subscribers get this list every Saturday as a tick-off checklist on their phone, with the amounts for their own calories.

### Meal prep for weight loss

I cooked mostly at the weekend, with a top-up mid-week. On Sunday, make two mains and boil a batch of eggs. On Wednesday, make the other two. Overnight oats take five minutes the evening before.

With the cook-once, eat-twice pattern, that's about four cooking sessions a week for 28 meals.

### Low calorie snacks that keep you going

Snacks were my weak spot until I changed what I picked. These are the snacks in the FitMe plan, each with protein to hold you until dinner:

| Snack | kcal (1 portion) | Protein |
| --- | --- | --- |
| [Chocolate protein yogurt](/recipes/chocolate-protein-yogurt/) | 140 | 16 g |
| [Boiled eggs and cucumber](/recipes/boiled-eggs-cucumber-snack/) | 160 | 13 g |
| [Rice cakes with cottage cheese](/recipes/rice-cakes-cottage-cheese-hummus/) | 210 | 14 g |
| [Apple slices with peanut butter yogurt dip](/recipes/apple-slices-peanut-butter-yogurt-dip/) | 240 | 14 g |

Greek yogurt and whey were the two things that fixed snacking for me. More ideas are in the [high protein foods list](/guides/high-protein-foods/).

### Same breakfast every day, or variety?

It depends on you. I ate the same breakfast every day, and it made things easier: one less decision every morning. Some people need variety to stay on track. The plan rotates three breakfasts, but if one works for you, repeat it.

### Eating out on a meal plan

At the start, I avoided eating out. Once I'd weighed my food for a few weeks and understood portions, I could eat out with confidence. Pick a protein and vegetables, go easy on sauces and oil, and treat the next meal as normal.

### How to adjust the plan to your calories

1,600 calories is a sample. Your number depends on your age, height, weight, activity and goal. The [calorie deficit guide](/guides/calorie-deficit/) explains how that works. FitMe works it out in about a minute and scales every portion, keeping protein high as calories go down.

### Questions people ask

**Is 1,600 calories a day enough?** For many people it's a reasonable deficit, but not for everyone. Taller, heavier or more active people usually need more. Use your own number rather than a sample.

**Can I swap meals around?** Yes. Swap any lunch for any dinner, or repeat a breakfast. FitMe subscribers can also swap a day's menu straight from the daily email.

**Is there a vegetarian version?** Yes. Every main in the plan has a vegetarian version, and you can pick your protein sources when you sign up.

[[cta:Get my free weekly meal plan]]

*This guide is general information, not medical advice. If you have a health condition, are pregnant or are under 18, talk to a doctor before changing how you eat.*`,
    },
    pt: {
      slug: 'plano-alimentar-para-emagrecer',
      title: 'Plano alimentar semanal para emagrecer (grátis) | FitMe',
      description: 'Um plano alimentar semanal grátis para emagrecer, com 1600 kcal e 110–135 g de proteína por dia, lista de compras, lanches e dicas de preparação.',
      h1: 'Plano alimentar semanal para emagrecer (grátis)',
      faqHeading: 'Perguntas frequentes', sourcesLabel: 'Fontes',
      body: `Este é um plano alimentar semanal grátis para emagrecer, com cerca de 1600 calorias e 110 a 135 g de proteína por dia. É a mesma semana que um subscritor do FitMe recebe, com a lista de compras e as dicas que resultaram comigo quando perdi 12 kg.

[[cta:Receber este plano ajustado às minhas calorias]]

### Plano de dieta para emagrecer: a semana completa

Cada dia tem quatro refeições: pequeno-almoço, almoço, lanche e jantar. Os números são para um dia de 1600 calorias.

| Dia | Pequeno-almoço | Almoço | Lanche | Jantar | kcal | Proteína |
| --- | --- | --- | --- | --- | --- | --- |
| Segunda | Aveia de véspera com frutos vermelhos | Caril de frango com grão | Ovos cozidos com pepino | Chili de vaca com feijão preto | 1585 | 120 g |
| Terça | Omelete de espinafres e parmesão | Chili de vaca com feijão preto | Iogurte proteico de chocolate | Frango com limão e alho no forno | 1615 | 136 g |
| Quarta | Panquecas proteicas de banana | Frango com limão e alho no forno | Iogurte proteico de chocolate | Esparguete cremoso de tomate e espinafres | 1555 | 119 g |
| Quinta | Aveia de véspera com frutos vermelhos | Esparguete cremoso de tomate e espinafres | Ovos cozidos com pepino | Caril de frango com grão | 1570 | 113 g |
| Sexta | Omelete de espinafres e parmesão | Caril de frango com grão | Iogurte proteico de chocolate | Chili de vaca com feijão preto | 1620 | 133 g |
| Sábado | Panquecas proteicas de banana | Chili de vaca com feijão preto | Iogurte proteico de chocolate | Frango com limão e alho no forno | 1570 | 126 g |
| Domingo | Aveia de véspera com frutos vermelhos | Frango com limão e alho no forno | Ovos cozidos com pepino | Esparguete cremoso de tomate e espinafres | 1560 | 117 g |

Repara no padrão: o jantar de hoje é o almoço de amanhã. Cozinhas uma vez e comes duas, e é isso que torna o plano fácil de cumprir.

As nove receitas da semana, com ingredientes e preparação:

- Pequenos-almoços: [aveia de véspera com frutos vermelhos](/pt/receitas/aveia-de-vespera-com-frutos-vermelhos/), [omelete de espinafres e parmesão](/pt/receitas/omelete-de-espinafres-e-parmesao/), [panquecas proteicas de banana](/pt/receitas/panquecas-proteicas-de-banana/)
- Pratos principais: [caril de frango com grão](/pt/receitas/caril-de-frango-proteico/), [chili de vaca com feijão preto](/pt/receitas/chili-de-carne-com-feijao-preto/), [frango com limão e alho no forno](/pt/receitas/frango-com-limao-e-alho-no-forno/), [esparguete cremoso de tomate e espinafres](/pt/receitas/esparguete-cremoso-de-tomate-e-espinafres/)
- Lanches: [ovos cozidos com pepino](/pt/receitas/ovos-cozidos-com-pepino/), [iogurte proteico de chocolate](/pt/receitas/iogurte-proteico-de-chocolate/)

As páginas das receitas mostram uma dose padrão. No plano, cada dose é ajustada para o dia bater certo com as tuas calorias, por isso os números da tabela podem variar um pouco.

### Lista de compras para emagrecer: a semana toda

A semana inteira dá cerca de 28 produtos, porque as receitas partilham ingredientes:

- **Frutas e legumes (10):** frutos vermelhos, bananas, espinafres baby, brócolos, batatas pequenas, cebolas, alho, pimentos, pepino, sumo de limão
- **Carne e peixe (2):** peito de frango, carne picada de vaca magra (5% gordura)
- **Laticínios e ovos (6):** iogurte grego magro (0%), ovos, leite meio-gordo, queijo cottage, parmesão, queijo curado vegetariano
- **Cereais e pão (4):** flocos de aveia, pão integral, massa integral, arroz basmati
- **Mercearia (6):** grão-de-bico, feijão preto, tomate pelado, cacau em pó, mel, azeite, mais especiarias

Os subscritores do FitMe recebem esta lista todos os sábados, como uma checklist no telemóvel, com as quantidades para as suas calorias.

### Preparar as refeições da semana (meal prep)

Eu cozinhava sobretudo ao fim de semana, com um reforço a meio da semana. Ao domingo, faz dois pratos principais e coze uma dose de ovos. À quarta, faz os outros dois. A aveia de véspera leva cinco minutos na noite anterior.

Com o padrão de cozinhar uma vez e comer duas, são cerca de quatro sessões na cozinha por semana para 28 refeições.

### Lanches saudáveis e com poucas calorias

Os lanches eram o meu ponto fraco até mudar o que escolhia. Estes são os lanches do plano FitMe, todos com proteína para aguentares até ao jantar:

| Lanche | kcal (1 dose) | Proteína |
| --- | --- | --- |
| [Iogurte proteico de chocolate](/pt/receitas/iogurte-proteico-de-chocolate/) | 140 | 16 g |
| [Ovos cozidos com pepino](/pt/receitas/ovos-cozidos-com-pepino/) | 160 | 13 g |
| [Bolachas de arroz com queijo cottage](/pt/receitas/bolachas-de-arroz-com-queijo-cottage-e-humus/) | 210 | 14 g |
| [Maçã com dip de iogurte e manteiga de amendoim](/pt/receitas/maca-com-dip-de-iogurte-e-manteiga-de-amendoim/) | 240 | 14 g |

O iogurte grego e o whey foram o que resolveu os lanches para mim. Há mais ideias na [lista de alimentos ricos em proteína](/pt/guias/alimentos-ricos-em-proteina/).

### O mesmo pequeno-almoço todos os dias, ou variar?

Depende de ti. Eu comia o mesmo pequeno-almoço todos os dias, e isso facilitou: menos uma decisão todas as manhãs. Há quem precise de variedade para não desistir. O plano roda três pequenos-almoços, mas se um resultar contigo, repete-o.

### Comer fora com um plano alimentar

No início, evitei comer fora. Depois de pesar a comida durante algumas semanas e perceber as porções, passei a comer fora com confiança. Escolhe uma proteína e legumes, vai com calma nos molhos e no azeite, e faz a refeição seguinte normalmente.

### Como ajustar o plano às tuas calorias

As 1600 calorias são um exemplo. O teu número depende da idade, altura, peso, atividade e objetivo. O [guia do défice calórico](/pt/guias/defice-calorico/) explica como funciona. O FitMe faz a conta em cerca de um minuto e ajusta todas as doses, mantendo a proteína alta quando as calorias descem.

### Perguntas frequentes

**1600 calorias por dia chegam?** Para muitas pessoas é um défice razoável, mas não para toda a gente. Quem é mais alto, mais pesado ou mais ativo costuma precisar de mais. Usa o teu número e não um exemplo.

**Posso trocar as refeições?** Sim. Troca qualquer almoço por qualquer jantar, ou repete um pequeno-almoço. Os subscritores do FitMe também podem trocar o menu do dia diretamente no email.

**Há versão vegetariana?** Há. Todos os pratos principais do plano têm versão vegetariana, e escolhes as tuas fontes de proteína quando te inscreves.

[[cta:Receber o meu plano semanal grátis]]

*Este guia é informação geral e não substitui aconselhamento médico. Se tens alguma doença, estás grávida ou tens menos de 18 anos, fala com um médico antes de mudares a alimentação.*`,
    },
    br: {
      slug: 'cardapio-para-emagrecer',
      title: 'Cardápio semanal para emagrecer (grátis) | FitMe',
      description: 'Cardápio semanal grátis para emagrecer, com 1.600 kcal e 110–135 g de proteína por dia, lista de compras, lanches e dicas de marmita.',
      h1: 'Cardápio semanal para emagrecer (grátis)',
      faqHeading: 'Perguntas frequentes', sourcesLabel: 'Fontes',
      body: `Este é um cardápio semanal grátis para emagrecer, com cerca de 1.600 calorias e 110 a 135 g de proteína por dia. É a mesma semana que um assinante do FitMe recebe, com a lista de compras e as dicas que funcionaram comigo quando perdi 12 kg.

[[cta:Receber este cardápio ajustado às minhas calorias]]

### Cardápio para emagrecer: a semana completa

Cada dia tem quatro refeições: café da manhã, almoço, lanche e jantar. Os números são para um dia de 1.600 calorias.

| Dia | Café da manhã | Almoço | Lanche | Jantar | kcal | Proteína |
| --- | --- | --- | --- | --- | --- | --- |
| Segunda | Overnight oats com frutas vermelhas | Curry de frango com grão-de-bico | Ovos cozidos com pepino | Chili de carne com feijão preto | 1.585 | 120 g |
| Terça | Omelete de espinafre e parmesão | Chili de carne com feijão preto | Iogurte proteico de chocolate | Frango com limão e alho | 1.615 | 136 g |
| Quarta | Panqueca de banana proteica | Frango com limão e alho | Iogurte proteico de chocolate | Espaguete cremoso de tomate com espinafre | 1.555 | 119 g |
| Quinta | Overnight oats com frutas vermelhas | Espaguete cremoso de tomate com espinafre | Ovos cozidos com pepino | Curry de frango com grão-de-bico | 1.570 | 113 g |
| Sexta | Omelete de espinafre e parmesão | Curry de frango com grão-de-bico | Iogurte proteico de chocolate | Chili de carne com feijão preto | 1.620 | 133 g |
| Sábado | Panqueca de banana proteica | Chili de carne com feijão preto | Iogurte proteico de chocolate | Frango com limão e alho | 1.570 | 126 g |
| Domingo | Overnight oats com frutas vermelhas | Frango com limão e alho | Ovos cozidos com pepino | Espaguete cremoso de tomate com espinafre | 1.560 | 117 g |

Repare no padrão: o jantar de hoje vira a marmita de amanhã. Você cozinha uma vez e come duas, e é isso que deixa o cardápio fácil de seguir.

As nove receitas da semana, com ingredientes e modo de preparo:

- Café da manhã: [overnight oats com frutas vermelhas](/br/receitas/overnight-oats-proteico/), [omelete de espinafre e parmesão](/br/receitas/omelete-de-espinafre-e-parmesao/), [panqueca de banana proteica](/br/receitas/panqueca-de-banana-proteica/)
- Pratos principais: [curry de frango com grão-de-bico](/br/receitas/curry-de-frango-fit/), [chili de carne com feijão preto](/br/receitas/chili-de-carne-com-feijao-preto/), [frango com limão e alho](/br/receitas/frango-com-limao-e-alho-fit/), [espaguete cremoso de tomate com espinafre](/br/receitas/espaguete-cremoso-de-tomate-com-espinafre/)
- Lanches: [ovos cozidos com pepino](/br/receitas/ovos-cozidos-com-pepino/), [iogurte proteico de chocolate](/br/receitas/iogurte-proteico-de-chocolate/)

As páginas das receitas mostram uma porção padrão. No cardápio, cada porção é ajustada para o dia bater com as suas calorias, então os números da tabela podem variar um pouco.

### Lista de compras para emagrecer: a semana toda

A semana inteira dá cerca de 28 itens, porque as receitas compartilham ingredientes:

- **Hortifrúti (10):** frutas vermelhas, bananas, espinafre baby, brócolis, batatas bolinha, cebolas, alho, pimentões, pepino, suco de limão
- **Carnes (2):** peito de frango, carne moída magra (patinho, 5% de gordura)
- **Laticínios e ovos (6):** iogurte grego desnatado, ovos, leite semidesnatado, queijo cottage, parmesão, queijo duro vegetariano
- **Grãos e pães (4):** aveia em flocos, pão integral, macarrão integral, arroz
- **Mercearia (6):** grão-de-bico, feijão preto, tomate pelado, cacau em pó, mel, azeite, mais temperos

Os assinantes do FitMe recebem essa lista todo sábado, como checklist no celular, com as quantidades para as suas calorias.

### Marmitas para emagrecer: como preparar a semana

Eu cozinhava principalmente no fim de semana, com um reforço no meio da semana. No domingo, faça dois pratos principais e cozinhe os ovos. Na quarta, faça os outros dois. O overnight oats leva cinco minutos na noite anterior.

Com o padrão de cozinhar uma vez e comer duas, são cerca de quatro idas para a cozinha por semana para 28 refeições.

### Lanches saudáveis e com poucas calorias

Os lanches eram o meu ponto fraco até eu mudar o que escolhia. Estes são os lanches do cardápio FitMe, todos com proteína para você aguentar até o jantar:

| Lanche | kcal (1 porção) | Proteína |
| --- | --- | --- |
| [Iogurte proteico de chocolate](/br/receitas/iogurte-proteico-de-chocolate/) | 140 | 16 g |
| [Ovos cozidos com pepino](/br/receitas/ovos-cozidos-com-pepino/) | 160 | 13 g |
| [Biscoito de arroz com cottage](/br/receitas/biscoito-de-arroz-com-cottage-e-homus/) | 210 | 14 g |
| [Maçã com pastinha de iogurte e amendoim](/br/receitas/maca-com-pastinha-de-iogurte-e-amendoim/) | 240 | 14 g |

O iogurte grego e o whey foram o que resolveu os lanches para mim. Tem mais ideias na [lista de alimentos ricos em proteína](/br/guias/alimentos-ricos-em-proteina/).

### O mesmo café da manhã todo dia, ou variar?

Depende de você. Eu comia o mesmo café da manhã todo dia, e isso ajudou: uma decisão a menos toda manhã. Tem gente que precisa de variedade para não desistir. O cardápio alterna três cafés da manhã, mas se um funcionar para você, repita.

### Comer fora seguindo um cardápio

No começo, evitei comer fora. Depois de pesar a comida por algumas semanas e entender as porções, passei a comer fora com confiança. Escolha uma proteína e legumes, pegue leve nos molhos e no azeite, e faça a próxima refeição normalmente.

### Como ajustar o cardápio às suas calorias

As 1.600 calorias são um exemplo. O seu número depende de idade, altura, peso, atividade e objetivo. O [guia do déficit calórico](/br/guias/deficit-calorico/) explica como funciona. O FitMe faz a conta em cerca de um minuto e ajusta todas as porções, mantendo a proteína alta quando as calorias diminuem.

### Perguntas frequentes

**1.600 calorias por dia é suficiente?** Para muita gente é um déficit razoável, mas não para todo mundo. Quem é mais alto, mais pesado ou mais ativo costuma precisar de mais. Use o seu número, não um exemplo.

**Posso trocar as refeições?** Pode. Troque qualquer almoço por qualquer jantar, ou repita um café da manhã. Os assinantes do FitMe também podem trocar o cardápio do dia direto no e-mail.

**Tem versão vegetariana?** Tem. Todos os pratos principais do cardápio têm versão vegetariana, e você escolhe as suas fontes de proteína ao se cadastrar.

[[cta:Receber o meu cardápio semanal grátis]]

*Este guia é informação geral e não substitui orientação médica. Se você tem alguma doença, está grávida ou tem menos de 18 anos, fale com um médico antes de mudar a alimentação.*`,
    },
  },
];
