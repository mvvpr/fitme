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
- **Better snacks.** Snacks were a problem until I changed what I chose. Greek yogurt and whey protein saved me there. A [chocolate protein yogurt](/recipes/chocolate-protein-yogurt/) is about 140 kcal.

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
- **Melhores lanches.** Os lanches eram um problema até mudar o que escolhia. O iogurte grego e o whey salvaram-me aí. Um [iogurte proteico de chocolate](/pt/receitas/iogurte-proteico-de-chocolate/) tem cerca de 140 kcal.

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
- **Lanches melhores.** Os lanches eram um problema até eu mudar o que escolhia. Iogurte grego e whey me salvaram nessa. Um [iogurte proteico de chocolate](/br/receitas/iogurte-proteico-de-chocolate/) tem cerca de 140 kcal.

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
];
