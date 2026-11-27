// Brazilian recipe pages only: words written for Brazil (not adapted from the European Portuguese text), so /br/ pages
// stand on their own for Google instead of reading as near-copies of /pt/. Keyed by recipe img.
// intro replaces the page intro, tips replaces the tips list, store = [heading, text], faq = [[question, answer], ...]
// (rendered as a section and as FAQPage structured data). Numbers must match public/meals.br.js (kcal and protein per portion).
// Food safety wording: cooked meals up to 3 days in the fridge, fish and shrimp up to 2, freezer up to 3 months.

const M = 'Para a marmita', L = 'Para levar';

export const BR_EXTRA = {
  'chicken-chickpea-curry': {
    intro: [
      'Curry de frango é um jeito fácil de sair do frango grelhado de sempre sem sair da dieta. Aqui o molho cremoso vem do iogurte grego, não do leite de coco nem do creme de leite, e cada porção tem 51 g de proteína e cerca de 605 calorias, já com o arroz.',
      'O grão-de-bico e o espinafre deixam o prato completo numa panela só, em 30 minutos. É uma das receitas que mais rendem para marmita: o sabor fica ainda melhor no dia seguinte.',
    ],
    tips: [
      'Curry em pó de mercado já funciona. Se quiser mais cor, junte uma pitada de cúrcuma (açafrão-da-terra).',
      'Grão-de-bico cozido na pressão e congelado em porções sai bem mais barato que o de lata.',
      'Misture o iogurte só com o fogo desligado. Fervendo, ele talha e o molho perde a cremosidade.',
      'Peito de frango em cubos ou sobrecoxa sem pele: as duas funcionam. A sobrecoxa deixa o prato mais suculento, com um pouco mais de gordura.',
    ],
    store: [M, 'Deixe esfriar e divida o curry e o arroz em potes. Dura até 3 dias na geladeira e até 3 meses no freezer. Esquente no micro-ondas por 2 a 3 minutos, mexendo na metade, com um fio de água se o molho tiver engrossado.'],
    faq: [
      ['Curry de frango engorda?', 'Não por si só. Esta versão tem cerca de 605 kcal com arroz e 51 g de proteína, e cabe num dia em déficit calórico. O que mais pesa nos curries de restaurante é o creme de leite e o óleo, que aqui ficam de fora.'],
      ['Posso usar leite de coco?', 'Pode, mas as calorias sobem bastante: 100 ml de leite de coco somam cerca de 170 kcal. Se quiser o sabor, use leite de coco light e só 50 ml.'],
      ['Qual a diferença entre curry e cúrcuma?', 'Cúrcuma (açafrão-da-terra) é uma raiz só. Curry em pó é uma mistura de temperos, que costuma incluir cúrcuma, cominho, coentro e gengibre.'],
    ],
  },
  'lemon-garlic-chicken': {
    intro: [
      'Frango com batata e brócolis no forno é o prato mais clássico de quem quer emagrecer, e por um bom motivo: vai tudo na mesma assadeira, quase sem louça. Esta versão leva limão, alho e orégano e tem 42 g de proteína por cerca de 465 calorias.',
      'São 40 minutos de forno, mas só 10 de trabalho. Enquanto assa, dá para separar as marmitas da semana.',
    ],
    tips: [
      'Batata bolinha não precisa descascar e assa por igual. Se usar batata comum, corte em cubos de uns 3 cm.',
      'Limão-taiti funciona perfeitamente. Raspe um pouco da casca antes de espremer para um sabor mais forte.',
      'Na airfryer: batatas por 15 minutos a 200 °C, depois o frango e o brócolis por mais 12 a 15 minutos, chacoalhando o cesto na metade.',
      'Para o frango não ressecar, use filés de espessura parecida ou abra os mais grossos ao meio.',
    ],
    store: [M, 'Guarde frango, batata e brócolis no mesmo pote. Dura até 3 dias na geladeira. Esquenta bem no micro-ondas por 2 minutos, e frio também fica bom numa salada.'],
    faq: [
      ['Quantas calorias tem frango com batata?', 'Esta porção tem cerca de 465 kcal, com 150 g de peito de frango, 200 g de batata bolinha e 120 g de brócolis. A maior parte das calorias extras de outras versões vem do óleo.'],
      ['Batata engorda?', 'Não. Batata assada com pouco azeite tem poucas calorias para o volume e sacia bem. O que engorda é a batata frita ou com muito óleo.'],
      ['Dá para fazer na airfryer?', 'Dá. Asse as batatas por 15 minutos a 200 °C e depois o frango e o brócolis por mais 12 a 15 minutos, chacoalhando o cesto na metade.'],
    ],
  },
  'beef-black-bean-chilli': {
    intro: [
      'Chili é aquele prato de panela que todo mundo gosta, mas a versão de restaurante costuma vir com carne gorda, queijo e creme azedo. Aqui a base é patinho moído e feijão preto, o mesmo da feijoada, e o resultado são 44 g de proteína por porção, com arroz, por cerca de 595 calorias.',
      'A páprica defumada e o cominho dão gosto de cozimento longo em 35 minutos. E rende muito bem para marmita: faça em dobro no domingo e o almoço de terça já está resolvido.',
    ],
    tips: [
      'No açougue, peça patinho moído na hora. Costuma sair mais magro que a carne moída de bandeja.',
      'Feijão preto cozido na pressão serve perfeitamente. Se usar o de lata, escorra e lave para tirar o excesso de sal.',
      'No lugar do iogurte grego, uma colher de requeijão light também combina, com poucas calorias a mais.',
      'Gosta de picante? Uma pimenta dedo-de-moça picada no refogado substitui a pimenta em pó.',
    ],
    store: [M, 'Deixe esfriar e divida o chili e o arroz em potes. Na geladeira, dura até 3 dias; no freezer, até 3 meses. Esquente no micro-ondas por 2 a 3 minutos, mexendo na metade, e coloque o iogurte só na hora de comer.'],
    faq: [
      ['Chili de carne engorda?', 'Não por si só. Esta versão tem cerca de 595 kcal com arroz e 44 g de proteína, e cabe bem num dia em déficit calórico. O que conta é a porção e o total do dia.'],
      ['Posso trocar o patinho por frango?', 'Pode. Use peito de frango moído na mesma quantidade: a proteína fica parecida e as calorias caem um pouco.'],
      ['Dá para congelar chili?', 'Dá, e fica ótimo. Congele em porções, sem o iogurte, por até 3 meses.'],
    ],
  },
  'turkey-meatballs-spaghetti': {
    intro: [
      'Almôndega ao sugo com macarrão é comida de domingo na casa de muita gente. Esta versão troca a carne bovina por peru moído e o macarrão comum pelo integral, e chega a 45 g de proteína por cerca de 545 calorias.',
      'O espinafre entra no molho no final e quase ninguém percebe. Em 35 minutos está pronto, e as almôndegas congelam bem para outras semanas.',
    ],
    tips: [
      'Não achou peru moído? Peça ao açougue para moer peito de peru ou use patinho moído, com um pouco mais de gordura.',
      'Molhe as mãos antes de enrolar: as almôndegas não grudam e ficam lisinhas.',
      'Passata ou molho de tomate pronto sem açúcar também servem no lugar do tomate pelado.',
    ],
    store: [M, 'Guarde as almôndegas com o molho num pote e o macarrão em outro, para ele não amolecer. Dura até 3 dias na geladeira. As almôndegas com molho congelam por até 3 meses.'],
    faq: [
      ['Carne de peru é mais saudável que a de boi?', 'O peru moído costuma ser mais magro que a carne bovina moída comum. Comparado ao patinho, a diferença é pequena: os dois são boas opções.'],
      ['Macarrão integral emagrece?', 'Nenhum alimento emagrece sozinho. O integral tem mais fibra que o comum, então sacia um pouco mais com a mesma porção.'],
      ['Posso congelar as almôndegas cruas?', 'Pode. Congele separadas numa assadeira e depois passe para um saco. Cozinhe direto do congelador, com uns minutos a mais no molho.'],
    ],
  },
  'honey-soy-pork-stir-fry': {
    intro: [
      'Sabe aquele yakisoba de delivery? Este refogado tem o mesmo molho agridoce de shoyu e mel, mas com lombo de porco magro e bastante legume, e fica pronto em 25 minutos. São 39 g de proteína por cerca de 480 calorias, com o arroz.',
      'O segredo é a frigideira bem quente: o porco doura em vez de cozinhar no próprio caldo.',
    ],
    tips: [
      'Use shoyu light ou com menos sódio. O comum também serve, só fica mais salgado.',
      'Leve o lombo ao freezer por 20 minutos antes de cortar: fica firme e sai em tiras bem finas.',
      'Troque o arroz por macarrão de arroz ou bifum e a receita vira um yakisoba caseiro.',
    ],
    store: [M, 'Guarde o porco com os legumes e o arroz no mesmo pote ou separados. Dura até 3 dias na geladeira. Esquente no micro-ondas com uma colher de água para o molho voltar a brilhar.'],
    faq: [
      ['Carne de porco é saudável?', 'O lombo é um dos cortes mais magros do porco, parecido com o peito de frango em gordura. Evite os cortes mais gordos, como a barriga e a costela.'],
      ['Shoyu engorda?', 'Shoyu tem poucas calorias. O ponto de atenção é o sódio: por isso a receita usa a versão light e só uma colher de sopa por porção.'],
      ['Posso fazer com frango?', 'Pode. Use a mesma quantidade de peito de frango em tiras e cozinhe por 5 a 6 minutos, até ficar bem cozido.'],
    ],
  },
  'paprika-pork-potatoes': {
    intro: [
      'Lombo assado lembra almoço de família, mas não precisa ser só em ocasião especial. Esta versão em porção individual vai ao forno com páprica defumada, batata e vagem, e entrega 38 g de proteína por cerca de 460 calorias.',
      'É uma receita de uma assadeira só, com 40 minutos de forno. Frio, o lombo fatiado também vai bem na marmita do dia seguinte.',
    ],
    tips: [
      'Compre o lombo inteiro e corte em bifes de 150 g em casa: sai mais barato que o lombo já fatiado.',
      'Vagem congelada funciona tão bem quanto a fresca e não precisa limpar.',
      'Para checar se está pronto, fure a parte mais grossa: o caldo deve sair claro, sem rosado.',
    ],
    store: [M, 'Deixe esfriar e guarde tudo no mesmo pote. Dura até 3 dias na geladeira. Esquente no micro-ondas por 2 minutos ou coma frio, fatiado, com salada.'],
    faq: [
      ['Lombo de porco é bom para emagrecer?', 'É um dos cortes de porco mais magros, com bastante proteína. Assado com pouco azeite, como aqui, cabe bem num déficit calórico.'],
      ['Páprica defumada é a mesma coisa que páprica doce?', 'Não. A defumada tem gosto de churrasco e é a que dá o sabor desta receita. A doce é mais suave e serve se for a que você tem.'],
      ['Dá para fazer na airfryer?', 'Dá. Batatas por 15 minutos a 200 °C, depois o lombo e a vagem por mais 15 minutos, virando o lombo na metade.'],
    ],
  },
  'greek-pork-couscous': {
    intro: [
      'Uma refeição com cara de restaurante mediterrâneo em 20 minutos: lombo de porco temperado com limão e orégano, cuscuz marroquino com tomate e pepino e um molho de iogurte com alho. São 44 g de proteína por cerca de 480 calorias.',
      'O cuscuz marroquino é diferente do cuscuz nordestino de flocão de milho: é de trigo e fica pronto só com água fervente, sem panela.',
    ],
    tips: [
      'Cuscuz marroquino integral está na seção de grãos de quase todo supermercado grande. O comum também serve.',
      'Hortelã fresca no molho de iogurte deixa tudo com cara de comida árabe, como uma coalhada temperada.',
      'Medalhões de 1 cm de espessura cozinham por igual em 3 minutos de cada lado.',
    ],
    store: [M, 'Guarde o porco e o cuscuz num pote e o molho de iogurte num potinho separado. Dura até 3 dias na geladeira. O cuscuz pode ser comido frio, como uma salada.'],
    faq: [
      ['Cuscuz marroquino engorda?', 'Não por si só. Esta receita usa 55 g de cuscuz cru por porção, e o prato inteiro fica em cerca de 480 kcal.'],
      ['Posso usar cuscuz nordestino?', 'Pode, mas o preparo muda: o de milho vai à cuscuzeira no vapor. As calorias por porção ficam parecidas.'],
      ['Posso trocar o porco por frango?', 'Pode. Use peito de frango em bifes finos e cozinhe por 4 minutos de cada lado, até ficar bem cozido.'],
    ],
  },
  'berry-overnight-oats': {
    intro: [
      'Se a manhã é corrida, este café da manhã resolve: cinco minutos na noite anterior e ele espera pronto na geladeira. O iogurte grego leva a proteína a 27 g por porção sem precisar de whey, e a aveia segura a fome até o almoço.',
      'Frutas vermelhas congeladas saem mais em conta que as frescas e funcionam igual. Mas não são obrigatórias: banana, mamão ou morango da estação também ficam ótimos.',
    ],
    tips: [
      'Use potes de vidro com tampa: dá para preparar três dias de uma vez e levar direto para o trabalho.',
      'Prefere sem lactose? Troque o leite e o iogurte pelas versões zero lactose. Os macros quase não mudam.',
      'Para adoçar sem mel, amasse meia banana madura junto com a aveia.',
      'Esqueceu de deixar pronto na noite anterior? Misture tudo, leve ao micro-ondas por 1 minuto e deixe na geladeira por 30 minutos.',
    ],
    store: [L, 'O overnight oats aguenta até 3 dias na geladeira, então dá para montar os potes de segunda a quarta no domingo à noite. Coloque as frutas só de manhã, para não soltarem água. Se for passar mais de duas horas fora da geladeira, leve com gelo reutilizável.'],
    faq: [
      ['Overnight oats emagrece?', 'Nenhum alimento emagrece sozinho. Com cerca de 410 kcal e 27 g de proteína, é um café da manhã que sustenta e cabe num déficit calórico.'],
      ['Posso comer overnight oats quente?', 'Pode. Leve ao micro-ondas por 1 minuto e meio, mexendo na metade. Fica com textura de mingau.'],
      ['Qual aveia usar?', 'Aveia em flocos, finos ou grossos. Farelo e farinha de aveia deixam a mistura pastosa.'],
    ],
  },
  'spinach-parmesan-omelette': {
    intro: [
      'Omelete é o café da manhã proteico mais rápido que existe, e este fica pronto em 12 minutos: três ovos, espinafre e um pouco de parmesão, com uma torrada integral. São 30 g de proteína por cerca de 410 calorias.',
      'Também funciona como jantar leve nos dias em que não dá vontade de cozinhar.',
    ],
    tips: [
      'Uma boa frigideira antiaderente faz toda a diferença: a omelete solta inteira e você usa pouco azeite.',
      'Espinafre baby não precisa picar. Se usar espinafre comum, tire os talos mais grossos.',
      'No lugar do parmesão, queijo minas padrão ralado também fica bom.',
    ],
    store: [L, 'Omelete é melhor feita na hora. Para adiantar, lave e seque o espinafre e deixe num pote com papel-toalha na geladeira: dura até 4 dias e o preparo cai para 5 minutos.'],
    faq: [
      ['Comer 3 ovos por dia faz mal?', 'Para a maioria das pessoas saudáveis, não. Os estudos mais recentes não ligam o consumo moderado de ovos a problemas de colesterol. Quem tem alguma condição de saúde deve conversar com o médico.'],
      ['Omelete engorda?', 'Depende do recheio e do óleo. Esta, com espinafre e uma colher de chá de azeite, tem cerca de 410 kcal já com a torrada.'],
      ['Posso fazer só com claras?', 'Pode. Use 5 claras no lugar de 3 ovos: a proteína fica parecida e as calorias caem cerca de 120 kcal.'],
    ],
  },
  'chicken-egg-fried-rice': {
    intro: [
      'Arroz frito de delivery costuma vir encharcado de óleo. Este, feito em casa, usa duas colheres de chá de azeite e leva frango, ovo, ervilha e cenoura: 46 g de proteína por cerca de 595 calorias, em 25 minutos.',
      'É também o melhor destino para o arroz que sobrou de ontem, que frita soltinho em vez de virar papa.',
    ],
    tips: [
      'Arroz agulhinha do dia anterior é o ideal. Se for cozinhar na hora, espalhe num prato para esfriar e secar.',
      'Seleta de legumes congelada (ervilha, cenoura e milho) substitui a ervilha e a cenoura e economiza tempo.',
      'Use fogo alto e não mexa demais: o arroz precisa de contato com a frigideira para dourar.',
    ],
    store: [M, 'Esfrie o arroz rápido, espalhado num prato, e guarde em até 1 hora. Dura até 3 dias na geladeira. Esquente bem no micro-ondas, até soltar vapor, mexendo na metade.'],
    faq: [
      ['Arroz frito engorda?', 'O de delivery costuma ter muito óleo. Esta versão usa só duas colheres de chá de azeite e fica em cerca de 595 kcal com 46 g de proteína.'],
      ['Posso usar arroz integral?', 'Pode. Ele fica um pouco mais firme, o que até ajuda a fritar soltinho.'],
      ['Por que o arroz do dia anterior é melhor?', 'Ele perde umidade na geladeira, então frita em vez de grudar. Arroz recém-cozido fica empapado.'],
    ],
  },
  'pesto-chicken-traybake': {
    intro: [
      'Frango ao pesto com legumes assados é daquelas receitas que parecem trabalhosas e não são: vai tudo numa assadeira enquanto o cuscuz fica pronto com água fervente. São 42 g de proteína por cerca de 535 calorias.',
      'Uma colher de pesto rende sabor para o prato inteiro, sem precisar de molho branco.',
    ],
    tips: [
      'Pesto pronto de mercado serve. Confira o rótulo e prefira os com azeite em vez de óleo de girassol.',
      'Abobrinha italiana e pimentão de qualquer cor funcionam. Berinjela também fica ótima assada.',
      'Corte o frango em tiras grossas, de uns 3 cm: assa por igual e não resseca.',
    ],
    store: [M, 'Guarde frango, legumes e cuscuz no mesmo pote. Dura até 3 dias na geladeira. Esquenta bem no micro-ondas por 2 minutos, e frio vira uma boa salada morna.'],
    faq: [
      ['Pesto engorda?', 'Pesto tem bastante calorias por causa do azeite e do queijo: cerca de 75 kcal em 15 g, a porção usada aqui. Em quantidade controlada, cabe tranquilamente na dieta.'],
      ['Posso fazer pesto em casa?', 'Pode. Bata manjericão, alho, azeite, parmesão e castanha-de-caju no lugar do pinoli, que é caro no Brasil.'],
      ['Dá para fazer na airfryer?', 'Dá. Legumes por 8 minutos a 200 °C, depois junte o frango e os tomates por mais 12 a 15 minutos.'],
    ],
  },
  'beef-sweetcorn-wraps': {
    intro: [
      'Este wrap tem o espírito do taco mexicano com cara de Brasil: carne moída temperada, milho verde e um vinagrete rápido de tomate. São 39 g de proteína por cerca de 510 calorias, em 20 minutos.',
      'O iogurte grego faz o papel do creme azedo, e ninguém sente falta.',
    ],
    tips: [
      'Pão folha integral (rap10 ou similar) é fácil de achar e aguenta bem o recheio.',
      'Milho em lata escorrido ou congelado: os dois funcionam.',
      'Capriche no vinagrete com cebola roxa e coentro picados, se você gosta.',
    ],
    store: [M, 'Guarde o recheio de carne num pote e o vinagrete em outro. Dura até 3 dias na geladeira. Monte o wrap na hora de comer, para o pão não amolecer.'],
    faq: [
      ['Wrap é mais saudável que pão francês?', 'Depende do wrap. O integral costuma ter mais fibra, e um pão folha tem calorias parecidas com um pão francês. O que faz diferença é o recheio.'],
      ['Posso trocar a carne por frango desfiado?', 'Pode. Use 120 g de peito de frango cozido e desfiado, aquecido com os temperos e o milho.'],
      ['Wrap de carne moída engorda?', 'Esta versão, com patinho 5% de gordura e iogurte no lugar do creme azedo, tem cerca de 510 kcal e cabe num dia em déficit.'],
    ],
  },
  'creamy-chicken-pea-pasta': {
    intro: [
      'Macarrão cremoso sem creme de leite e sem requeijão: o molho aqui vem do queijo cottage batido, que derrete no macarrão quente e deixa tudo liso. Com frango, ervilha e espinafre, são 55 g de proteína por cerca de 600 calorias.',
      'É uma das receitas com mais proteína do plano FitMe, e fica pronta em 20 minutos.',
    ],
    tips: [
      'Bata o cottage no liquidificador ou mixer para o molho ficar bem liso. Amassado no garfo fica mais rústico, mas funciona.',
      'Reserve sempre um pouco da água do cozimento: ela solta o molho e deixa o macarrão brilhante.',
      'Frango desfiado que sobrou de outra refeição serve. Junte só no final, para aquecer.',
    ],
    store: [M, 'Guarde num pote só. Dura até 3 dias na geladeira. Esquente no micro-ondas com uma colher de água ou leite, mexendo na metade, para o molho voltar a ficar cremoso.'],
    faq: [
      ['Queijo cottage é bom para emagrecer?', 'É um queijo com bastante proteína e pouca gordura. Por isso funciona bem no lugar do creme de leite em molhos.'],
      ['Posso usar requeijão light no lugar do cottage?', 'Pode, mas a proteína cai e as calorias sobem um pouco. O cottage é o que deixa esta receita tão proteica.'],
      ['Posso congelar?', 'Não é o ideal: molhos de queijo cottage podem talhar ao descongelar. Prefira guardar na geladeira por até 3 dias.'],
    ],
  },
  'apple-cinnamon-protein-porridge': {
    intro: [
      'Mingau de aveia é o café da manhã quentinho que lembra infância, e esta versão tem proteína de verdade: leite e iogurte grego levam a 24 g por porção, com cerca de 435 calorias. Maçã ralada e canela adoçam sem açúcar.',
      'Fica pronto em 8 minutos na panela ou em 3 no micro-ondas.',
    ],
    tips: [
      'Maçã gala ou fuji ralada adoça bem. Banana amassada também funciona.',
      'Junte o iogurte com o fogo desligado, para ele não talhar.',
      'Gosta mais grosso? Use 30 ml a menos de leite. Mais ralo, junte um pouco de água no final.',
    ],
    store: [L, 'Dá para deixar a aveia, o leite e a canela pré-misturados num pote na geladeira por até 3 dias. De manhã, é só esquentar e juntar o iogurte e a maçã.'],
    faq: [
      ['Mingau de aveia emagrece?', 'Nenhum alimento emagrece sozinho, mas a aveia sacia bem. Esta porção tem cerca de 435 kcal e 24 g de proteína.'],
      ['Posso fazer com leite vegetal?', 'Pode. Use bebida de soja sem açúcar, que tem proteína parecida com a do leite. As de amêndoa e aveia têm bem menos.'],
      ['Posso adoçar com mel?', 'Pode, uma colher de chá soma cerca de 20 kcal. A maçã ralada já costuma adoçar o suficiente.'],
    ],
  },
  'scrambled-egg-breakfast-wrap': {
    intro: [
      'Para quem sai de casa correndo, este wrap de ovos mexidos é um café da manhã para comer com a mão: ovos cremosos com queijo cottage, espinafre e tomate-cereja num pão folha integral. São 26 g de proteína por cerca de 440 calorias, em 10 minutos.',
      'O cottage misturado aos ovos deixa o mexido macio e soma proteína sem pesar.',
    ],
    tips: [
      'Tire os ovos do fogo ainda um pouco molhados: eles terminam de cozinhar no calor do próprio wrap.',
      'Enrole bem apertado e embrulhe em papel-alumínio para comer no caminho.',
      'Sem tomate-cereja? Um tomate comum em cubos, sem sementes, serve.',
    ],
    store: [L, 'Melhor comido na hora. Para levar, embrulhe em papel-alumínio e coma em até 2 horas. Os ovos mexidos não ficam bons requentados no dia seguinte.'],
    faq: [
      ['Wrap de ovo é um bom café da manhã para emagrecer?', 'É uma boa opção: tem 26 g de proteína, o que ajuda a segurar a fome até o almoço, e cerca de 440 kcal.'],
      ['Posso usar tapioca no lugar do pão folha?', 'Pode. Uma tapioca de cerca de 60 g de goma tem um pouco mais de calorias e menos fibra que o pão folha integral.'],
      ['Posso fazer só com claras?', 'Pode. Use 4 claras no lugar de 2 ovos: as calorias caem e a proteína fica parecida.'],
    ],
  },
  'banana-protein-pancakes': {
    intro: [
      'Panqueca de banana com aveia e ovo é um clássico das receitas fit, e esta versão rende uma pilha bonita: 31 g de proteína por cerca de 570 calorias, com iogurte grego e frutas por cima.',
      'Sem farinha de trigo e sem açúcar, porque a banana madura já adoça a massa. Fica pronta em 15 minutos.',
    ],
    tips: [
      'Quanto mais madura a banana, mais doce a panqueca. Aquelas com a casca pintadinha são as melhores.',
      'Bata a aveia antes até virar farinha: a massa fica lisa e as panquecas, mais macias.',
      'Faça panquecas pequenas, de três colheres de sopa. As grandes quebram na hora de virar.',
    ],
    store: [L, 'As panquecas prontas duram até 3 dias na geladeira e até 2 meses no freezer, separadas por papel-manteiga. Esquente na torradeira ou no micro-ondas por 30 segundos.'],
    faq: [
      ['Panqueca de banana emagrece?', 'Nenhuma receita emagrece sozinha. Esta tem cerca de 570 kcal e 31 g de proteína por porção, um café da manhã que sustenta bem.'],
      ['Posso fazer sem ovo?', 'Fica difícil, porque o ovo dá liga. Para uma versão sem ovo, use 2 colheres de sopa de linhaça moída com 6 colheres de água, e a proteína cai.'],
      ['Posso usar farinha de aveia pronta?', 'Pode, na mesma quantidade (50 g). É só pular a etapa de bater a aveia.'],
    ],
  },
  'yogurt-banana-oat-bowl': {
    intro: [
      'Iogurte com banana e aveia é o café da manhã que dá para montar em 5 minutos com o que já tem em casa. Com iogurte grego e um fio de pasta de amendoim, chega a 29 g de proteína por cerca de 425 calorias.',
      'Funciona também como lanche da tarde antes do treino.',
    ],
    tips: [
      'Prefira pasta de amendoim integral, só de amendoim, sem açúcar nem óleo adicionado.',
      'Aqueça a pasta de amendoim por 10 segundos no micro-ondas: ela vira calda e espalha melhor.',
      'Quer mais volume com menos calorias? Troque a pasta de amendoim por 150 g de morango ou mamão.',
    ],
    store: [L, 'Para levar, coloque o iogurte num pote e a aveia, a banana e a pasta de amendoim num potinho separado, para a aveia não amolecer. Banana cortada escurece: corte na hora ou pingue umas gotas de limão.'],
    faq: [
      ['Iogurte com aveia emagrece?', 'Nenhuma combinação emagrece sozinha. Este bowl tem cerca de 425 kcal e 29 g de proteína, o que sacia bem no café da manhã.'],
      ['Pasta de amendoim engorda?', 'Ela tem bastante calorias: 15 g, a porção usada aqui, somam cerca de 90 kcal. Em quantidade medida, cabe tranquilamente.'],
      ['Posso usar granola no lugar da aveia?', 'Pode, mas confira o rótulo: muitas granolas têm açúcar e óleo e quase o dobro das calorias da aveia.'],
    ],
  },
  'chocolate-protein-yogurt': {
    intro: [
      'Para quem sente vontade de doce à noite, este iogurte faz papel de mousse de chocolate: 16 g de proteína por cerca de 140 calorias. São três ingredientes de mercado e três minutos.',
      'O segredo é misturar bem: o cacau demora a dissolver, e grumos de pó são o único jeito de errar esta receita. Use cacau em pó 100%, sem açúcar. Achocolatado em pó não serve, porque é feito principalmente de açúcar.',
    ],
    tips: [
      'Troque as frutas vermelhas por morango picado ou banana em rodelas, o que estiver mais barato na feira.',
      'Quer crocância? Uma colher de sopa de granola sem açúcar por cima soma cerca de 50 kcal.',
      'Com uma colher de whey de chocolate no lugar do mel, a proteína sobe e ele fica ainda mais firme.',
    ],
    store: [L, 'Monte em potinhos com tampa e deixe na geladeira por até 2 dias. De um dia para o outro ele fica ainda mais firme. Coloque as frutas só na hora.'],
    faq: [
      ['Iogurte grego é bom para emagrecer?', 'Ajuda, porque tem bastante proteína e sacia. Escolha a versão natural desnatada (0%) e confira o rótulo: alguns iogurtes "tipo grego" vêm com açúcar e espessantes.'],
      ['Posso usar achocolatado no lugar do cacau?', 'Não é uma boa troca. O achocolatado é feito principalmente de açúcar, e a receita perde a proposta de doce leve.'],
      ['Quantas calorias tem?', 'Cerca de 140 kcal por porção, com 16 g de proteína, 18 g de carboidratos e 2 g de gordura.'],
    ],
  },
  'boiled-eggs-cucumber': {
    intro: [
      'Ovo cozido é o lanche fit mais prático e barato que existe. Dois ovos com pepino temperado somam 13 g de proteína por cerca de 160 calorias, e cabem em qualquer bolsa.',
      'Cozinhe uma dúzia no domingo e os lanches da semana estão resolvidos.',
    ],
    tips: [
      'Para a gema ficar firme mas sem aro verde, cozinhe por 8 a 9 minutos a partir da fervura e passe direto para água gelada.',
      'Ovos com alguns dias de geladeira descascam mais fácil que os bem fresquinhos.',
      'Sal de ervas, gergelim ou zaatar por cima variam o sabor sem somar calorias.',
    ],
    store: [L, 'Ovos cozidos com casca duram até 7 dias na geladeira. Descascados, até 2 dias num pote fechado. Leve o pepino num potinho separado para não amolecer.'],
    faq: [
      ['Quantas calorias tem um ovo cozido?', 'Cerca de 70 a 80 kcal por ovo grande, com 6 a 7 g de proteína. Esta porção, com dois ovos e pepino, tem cerca de 160 kcal.'],
      ['Ovo cozido emagrece?', 'Nenhum alimento emagrece sozinho, mas o ovo sacia bem para as poucas calorias que tem, o que ajuda a manter o déficit.'],
      ['Quanto tempo cozinhar o ovo?', '6 a 7 minutos para a gema mole, 8 a 9 minutos para a gema firme, sempre contando a partir da fervura.'],
    ],
  },
  'apple-peanut-butter-dip': {
    intro: [
      'Maçã com pasta de amendoim é o lanche doce que não pesa. Aqui a pasta vira um creme com iogurte grego, que rende mais e soma proteína: 14 g por cerca de 240 calorias.',
      'Bom para a tarde ou para antes do treino, e fica pronto em 3 minutos.',
    ],
    tips: [
      'Maçã gala, fuji ou verde: qualquer uma combina. Pera também fica ótima.',
      'Pasta de amendoim integral, sem açúcar, deixa o creme menos doce e mais saboroso.',
      'Para levar, pingue limão nas fatias: elas não escurecem por algumas horas.',
    ],
    store: [L, 'Leve o creme num potinho e a maçã inteira para cortar na hora, ou fatiada com umas gotas de limão. O creme dura até 3 dias na geladeira.'],
    faq: [
      ['Maçã com pasta de amendoim emagrece?', 'Nenhum lanche emagrece sozinho. Esta porção tem cerca de 240 kcal e 14 g de proteína, e substitui bem um doce no meio da tarde.'],
      ['Qual a melhor pasta de amendoim?', 'A integral, feita só de amendoim, sem açúcar, óleo ou sal adicionados. Confira a lista de ingredientes no rótulo.'],
      ['Posso trocar o iogurte por whey?', 'Pode misturar meio scoop de whey ao iogurte para mais proteína, ou usar só whey com um pouco de água, mas o creme fica menos espesso.'],
    ],
  },
  'rice-cakes-cottage-cucumber': {
    intro: [
      'Biscoito de arroz com queijo cottage é o lanche salgado e crocante para quem cansou de doce. Com homus e pepino, são 14 g de proteína por cerca de 210 calorias, montados em 3 minutos.',
      'O biscoito de arroz é leve e combina com qualquer recheio: este é só um ponto de partida.',
    ],
    tips: [
      'Biscoito de arroz integral tem mais sabor que o tradicional e o mesmo preço na maioria dos mercados.',
      'Sem homus? Uma colher de requeijão light ou de ricota temperada funciona como base.',
      'Tomate-cereja, cenoura ralada ou rabanete também ficam bons por cima.',
    ],
    store: [L, 'Monte na hora, para o biscoito continuar crocante. Para levar, coloque o cottage, o homus e o pepino num pote e os biscoitos num saquinho separado.'],
    faq: [
      ['Biscoito de arroz engorda?', 'Cada biscoito tem cerca de 30 a 35 kcal. O que pesa é o recheio: aqui, cottage e homus deixam a porção em cerca de 210 kcal.'],
      ['Queijo cottage tem muita proteína?', 'Tem. São cerca de 11 a 12 g de proteína a cada 100 g, com pouca gordura.'],
      ['Posso fazer homus em casa?', 'Pode. Bata grão-de-bico cozido com tahine, limão, alho e um pouco de água. Rende para a semana toda.'],
    ],
  },
  'lemon-garlic-salmon': {
    intro: [
      'Salmão no forno com limão e alho é um dos jantares mais simples que existem: 12 a 15 minutos de forno e pronto. Com batata e brócolis, são 36 g de proteína por cerca de 575 calorias.',
      'O salmão tem mais gordura que o frango, mas é a gordura boa do peixe, rica em ômega-3.',
    ],
    tips: [
      'Salmão congelado em postas costuma sair mais barato que o fresco. Descongele na geladeira de um dia para o outro.',
      'Tire o salmão do forno quando ele começar a se desfazer em lascas: passou do ponto, ele resseca.',
      'Na airfryer, o salmão fica pronto em 8 a 10 minutos a 200 °C.',
    ],
    store: [M, 'Guarde num pote só. Peixe dura até 2 dias na geladeira. Esquente no micro-ondas em potência média por 1 a 2 minutos ou coma frio, em lascas, sobre uma salada.'],
    faq: [
      ['Salmão é bom para emagrecer?', 'É uma ótima proteína e tem ômega-3. Tem mais calorias que peixes brancos, então a porção conta: aqui são 140 g.'],
      ['Posso trocar o salmão por tilápia?', 'Pode. A tilápia é mais magra e mais barata: as calorias do prato caem e o tempo de forno fica parecido.'],
      ['Dá para fazer na airfryer?', 'Dá. Batatas por 15 minutos a 200 °C, depois o brócolis e o salmão por mais 8 a 10 minutos.'],
    ],
  },
  'prawn-chickpea-curry': {
    intro: [
      'Curry de camarão é um prato de cara especial que fica pronto em 25 minutos. O molho cremoso vem do iogurte grego, e o grão-de-bico deixa a porção completa: 51 g de proteína por cerca de 575 calorias, com o arroz.',
      'O camarão cozinha em 3 a 4 minutos, então entra só no final.',
    ],
    tips: [
      'Camarão cinza congelado e descascado é o mais em conta e funciona perfeitamente. Descongele na geladeira ou em água fria.',
      'Não cozinhe o camarão demais: quando ficar rosado e curvado em C, está pronto.',
      'Coentro fresco por cima combina muito. Se não gosta, use salsinha.',
    ],
    store: [M, 'Frutos do mar duram até 2 dias na geladeira. Esquente no micro-ondas em potência média, para o camarão não endurecer.'],
    faq: [
      ['Camarão engorda?', 'Não. Camarão tem muita proteína e pouquíssima gordura. O que pesa nas receitas com camarão é o óleo e o creme de leite, que aqui ficam de fora.'],
      ['Camarão tem muito colesterol?', 'Tem, mas tem pouca gordura saturada, que pesa mais no colesterol do sangue. Para a maioria das pessoas, cabe numa alimentação equilibrada.'],
      ['Posso usar leite de coco?', 'Pode, no estilo moqueca, mas as calorias sobem. Use leite de coco light e só 50 ml.'],
    ],
  },
  'prawn-egg-fried-rice': {
    intro: [
      'Arroz frito com camarão em 20 minutos, sem o óleo do delivery: camarão, ovo, ervilha e cenoura com shoyu light. São 46 g de proteína por cerca de 570 calorias.',
      'Use o arroz que sobrou de ontem: ele frita soltinho e a receita fica ainda mais rápida.',
    ],
    tips: [
      'Camarão congelado e descascado é o mais prático. Seque bem antes de ir à frigideira, para ele dourar.',
      'Arroz agulhinha do dia anterior é o ideal: o recém-cozido gruda.',
      'Seleta de legumes congelada substitui a ervilha e a cenoura.',
    ],
    store: [M, 'Esfrie rápido e guarde em até 1 hora. Com camarão, dura até 2 dias na geladeira. Esquente bem no micro-ondas, até soltar vapor.'],
    faq: [
      ['Arroz frito com camarão é saudável?', 'Esta versão é: usa pouco azeite, bastante legume e camarão, que é muito magro. São cerca de 570 kcal com 46 g de proteína.'],
      ['Posso usar arroz integral?', 'Pode. Ele fica um pouco mais firme e frita bem.'],
      ['Posso misturar camarão e frango?', 'Pode. Use 75 g de cada no lugar dos 150 g de camarão e cozinhe o frango primeiro.'],
    ],
  },
  'pesto-cod-traybake': {
    intro: [
      'Peixe branco ao pesto com legumes assados e cuscuz: uma assadeira, 35 minutos e um jantar leve com 41 g de proteína por cerca de 505 calorias.',
      'O pesto por cima protege o peixe e deixa a carne úmida, sem precisar de molho.',
    ],
    tips: [
      'Bacalhau fresco é caro no Brasil: tilápia, merluza ou pescada funcionam igual e saem bem mais em conta.',
      'Filé congelado serve. Descongele na geladeira e seque bem com papel-toalha antes de assar.',
      'O peixe está pronto quando se desfaz em lascas com o garfo.',
    ],
    store: [M, 'Peixe dura até 2 dias na geladeira. Esquente no micro-ondas em potência média por 1 a 2 minutos, para não ressecar.'],
    faq: [
      ['Qual peixe usar no lugar do bacalhau?', 'Tilápia, merluza, pescada ou saint-peter. São peixes brancos, magros e com tempo de forno parecido.'],
      ['Peixe branco é bom para emagrecer?', 'É uma das proteínas com menos calorias: muita proteína e pouquíssima gordura.'],
      ['Posso usar bacalhau salgado?', 'Não nesta receita. O bacalhau salgado precisa dessalgar por 24 a 48 horas e tem textura e sal bem diferentes.'],
    ],
  },
  'creamy-tuna-pea-pasta': {
    intro: [
      'Macarrão com atum é o salva-jantar de quem chega tarde em casa, e esta versão cremosa fica pronta em 15 minutos com o que tem na despensa. O queijo cottage batido faz o molho, e a porção chega a 52 g de proteína por cerca de 540 calorias.',
      'Sem creme de leite e sem maionese, mas cremoso de verdade.',
    ],
    tips: [
      'Use atum em água, não em óleo: são muitas calorias a menos na mesma lata.',
      'Atum em pedaços dá lascas maiores e mais bonitas que o ralado.',
      'Raspas de limão no final deixam o prato mais leve e fresco.',
    ],
    store: [M, 'Guarde num pote só. Dura até 2 dias na geladeira. Coma frio, como salada de macarrão, ou esquente com uma colher de água.'],
    faq: [
      ['Macarrão com atum engorda?', 'Esta versão tem cerca de 540 kcal com 52 g de proteína, e cabe num dia em déficit. O que costuma pesar nas receitas com atum é a maionese e o creme de leite.'],
      ['Atum em lata é saudável?', 'É uma proteína prática e magra. Prefira a versão em água e varie com outras proteínas ao longo da semana.'],
      ['Posso usar sardinha?', 'Pode. A sardinha tem mais gordura e ômega-3: as calorias sobem um pouco e o sabor fica mais forte.'],
    ],
  },
  'pesto-pork-traybake': {
    intro: [
      'Lombo de porco ao pesto com legumes assados é uma refeição completa numa assadeira só: medalhões de lombo, abobrinha, pimentão e tomate-cereja, com cuscuz marroquino. São 39 g de proteína por cerca de 535 calorias.',
      'Ótimo para fazer em quantidade e separar as marmitas da semana.',
    ],
    tips: [
      'Medalhões de 2 cm cozinham por igual em 15 a 18 minutos.',
      'Pesto pronto de mercado serve. Prefira os feitos com azeite.',
      'Berinjela ou cenoura em rodelas também ficam ótimas assadas junto.',
    ],
    store: [M, 'Guarde tudo no mesmo pote. Dura até 3 dias na geladeira. Esquente no micro-ondas por 2 minutos.'],
    faq: [
      ['Lombo de porco tem muita gordura?', 'Não. O lombo é um dos cortes mais magros do porco, com gordura parecida com a do peito de frango.'],
      ['Como saber se o porco está cozido?', 'Fure a parte mais grossa: o caldo deve sair claro, sem rosado.'],
      ['Posso usar arroz no lugar do cuscuz?', 'Pode. Use 50 g de arroz cru por porção: as calorias ficam parecidas.'],
    ],
  },
  'tofu-chickpea-curry': {
    intro: [
      'Um curry vegetariano que sustenta de verdade: tofu dourado, grão-de-bico e espinafre num molho cremoso de iogurte. São 44 g de proteína por cerca de 665 calorias, com o arroz, em 30 minutos.',
      'Dourar o tofu antes é o que faz a diferença: ele fica com casquinha e absorve o molho.',
    ],
    tips: [
      'Tofu firme é o certo para esta receita. O macio (tipo silken) desmancha.',
      'Seque bem o tofu com papel-toalha antes de fritar, para ele dourar em vez de soltar água.',
      'Tofu é fácil de achar na seção refrigerada, perto dos queijos ou das verduras.',
    ],
    store: [M, 'Dura até 3 dias na geladeira e até 3 meses no freezer. Esquente no micro-ondas com um fio de água, mexendo na metade.'],
    faq: [
      ['Tofu tem bastante proteína?', 'Tem. O tofu firme tem cerca de 12 a 15 g de proteína a cada 100 g, e é uma das melhores fontes para quem não come carne.'],
      ['Tofu emagrece?', 'Nenhum alimento emagrece sozinho, mas o tofu tem bastante proteína para as calorias, o que ajuda a manter o déficit.'],
      ['Esta receita é vegana?', 'Não, por causa do iogurte. Para uma versão vegana, use iogurte de soja natural sem açúcar.'],
    ],
  },
  'tofu-egg-fried-rice': {
    intro: [
      'Arroz frito vegetariano com tofu e ovo, pronto em 25 minutos: 40 g de proteína por cerca de 655 calorias. O tofu dourado faz o papel da carne e deixa o prato completo.',
      'Arroz do dia anterior é o segredo para ele ficar soltinho.',
    ],
    tips: [
      'Use tofu firme e seque bem antes de cortar em cubinhos.',
      'Doure o tofu primeiro e reserve: assim ele fica crocante e não desmancha na mistura.',
      'Gergelim tostado por cima dá um toque de restaurante.',
    ],
    store: [M, 'Esfrie rápido e guarde em até 1 hora. Dura até 3 dias na geladeira. Esquente bem no micro-ondas, até soltar vapor.'],
    faq: [
      ['Arroz frito com tofu é saudável?', 'Esta versão usa pouco azeite, bastante legume e tofu, e tem 40 g de proteína por porção.'],
      ['Onde encontro tofu?', 'Na seção refrigerada da maioria dos supermercados grandes, e em lojas de produtos naturais ou orientais.'],
      ['Posso fazer sem ovo?', 'Pode. Aumente o tofu para 200 g para manter a proteína.'],
    ],
  },
  'lemon-garlic-tofu': {
    intro: [
      'A versão vegetariana do clássico frango com batata e brócolis: tofu assado com limão, alho e orégano, numa assadeira só. São 36 g de proteína por cerca de 545 calorias.',
      'No forno, o tofu fica dourado nas bordas e macio por dentro.',
    ],
    tips: [
      'Prense o tofu entre papel-toalha com um peso por 10 minutos: ele perde água e doura melhor.',
      'Corte em cubos grandes, de uns 3 cm, para não ressecar.',
      'Na airfryer, o tofu fica ainda mais crocante: 15 minutos a 200 °C, chacoalhando na metade.',
    ],
    store: [M, 'Dura até 3 dias na geladeira. Frio, o tofu fica ótimo numa salada. Para esquentar, use a airfryer ou o forno, que deixam mais crocante que o micro-ondas.'],
    faq: [
      ['Como deixar o tofu crocante?', 'Seque e prense bem, corte em cubos grandes e asse em forno bem quente (200 °C), virando na metade.'],
      ['Tofu substitui o frango?', 'Em proteína, chega perto: 180 g de tofu firme somam cerca de 25 g de proteína. Tem um pouco mais de gordura que o peito de frango.'],
      ['Dá para fazer na airfryer?', 'Dá. Batatas por 15 minutos a 200 °C, depois o tofu e o brócolis por mais 15 minutos, chacoalhando na metade.'],
    ],
  },
  'black-bean-lentil-chilli': {
    intro: [
      'Chili vegetariano com feijão preto e lentilha, temperado com cominho e páprica defumada. Sem carne, mas com 31 g de proteína por cerca de 595 calorias, com o arroz.',
      'A lentilha vermelha cozinha em 15 minutos e engrossa o molho. Rende muito bem para congelar.',
    ],
    tips: [
      'Lentilha vermelha (ou laranja) cozinha rápido e desmancha. A marrom comum também serve, com uns 10 minutos a mais.',
      'Feijão preto feito na pressão e congelado sai bem mais barato que o de lata.',
      'Uma pimenta dedo-de-moça no refogado dá o picante sem precisar de pimenta em pó.',
    ],
    store: [M, 'Dura até 3 dias na geladeira e até 3 meses no freezer, em porções. Esquente com um fio de água, porque a lentilha continua engrossando o molho.'],
    faq: [
      ['Lentilha tem muita proteína?', 'Tem: cerca de 24 g de proteína a cada 100 g de lentilha seca, além de bastante fibra.'],
      ['Chili vegetariano sacia?', 'Sacia bem. A combinação de feijão, lentilha e arroz tem bastante fibra e proteína.'],
      ['Esta receita é vegana?', 'Quase: tire o iogurte ou troque por iogurte de soja natural.'],
    ],
  },
  'black-bean-sweetcorn-wraps': {
    intro: [
      'Wrap vegetariano de feijão preto amassado, milho e vinagrete de tomate, pronto em 15 minutos. São 26 g de proteína por cerca de 520 calorias, com bastante fibra.',
      'Amassar metade do feijão é o truque para o recheio dar liga e não cair do wrap.',
    ],
    tips: [
      'O feijão preto que sobrou do almoço serve: só escorra bem o caldo.',
      'Pão folha integral aguenta melhor o recheio que o branco.',
      'Abacate em fatias combina muito, mas soma cerca de 50 kcal a cada 30 g.',
    ],
    store: [M, 'Guarde o recheio de feijão num pote e o vinagrete em outro. Dura até 3 dias na geladeira. Monte na hora de comer.'],
    faq: [
      ['Feijão preto tem proteína?', 'Tem: cerca de 7 a 9 g de proteína a cada 100 g de feijão cozido, além de muita fibra.'],
      ['Wrap de feijão engorda?', 'Esta versão tem cerca de 520 kcal, com bastante fibra e 26 g de proteína, e cabe num dia em déficit.'],
      ['Posso servir com arroz em vez do wrap?', 'Pode. Troque o pão folha por 50 g de arroz cru por porção e sirva tudo num prato.'],
    ],
  },
  'roasted-veg-chickpea-couscous': {
    intro: [
      'Cuscuz marroquino com legumes assados e grão-de-bico crocante, com um iogurte de limão por cima. É uma refeição vegetariana com 29 g de proteína por cerca de 595 calorias.',
      'O grão-de-bico assado fica crocante nas bordas, como um petisco, e vai bem até frio.',
    ],
    tips: [
      'Seque bem o grão-de-bico antes de assar: é isso que deixa ele crocante.',
      'Abobrinha, pimentão e cebola roxa são a base, mas berinjela e abóbora cabotiá também funcionam.',
      'Cuscuz marroquino fica pronto só com água fervente, sem panela.',
    ],
    store: [M, 'Guarde os legumes e o cuscuz num pote e o iogurte de limão num potinho. Dura até 3 dias na geladeira e pode ser comido frio, como salada.'],
    faq: [
      ['Grão-de-bico tem muita proteína?', 'Tem: cerca de 8 a 9 g de proteína a cada 100 g de grão-de-bico cozido, além de fibra.'],
      ['Cuscuz marroquino é integral?', 'Existe a versão integral, que é a usada aqui. O comum também serve, com um pouco menos de fibra.'],
      ['Dá para fazer na airfryer?', 'Dá. Legumes e grão-de-bico por 15 a 18 minutos a 200 °C, chacoalhando o cesto na metade.'],
    ],
  },
  'creamy-tomato-spaghetti': {
    intro: [
      'Espaguete ao molho rosé sem creme de leite: o queijo cottage batido no molho de tomate deixa tudo cremoso e soma proteína. São 33 g de proteína por cerca de 530 calorias, em 20 minutos.',
      'Uma opção vegetariana rápida para os dias sem tempo.',
    ],
    tips: [
      'Bata o cottage até ficar liso, ou o molho fica com pedacinhos.',
      'Não deixe ferver depois de colocar o queijo: o molho talha.',
      'Manjericão fresco por cima deixa o prato com cara de cantina.',
    ],
    store: [M, 'Guarde num pote só. Dura até 3 dias na geladeira. Esquente com uma colher de água, mexendo na metade, para o molho voltar a ficar cremoso.'],
    faq: [
      ['Molho rosé engorda?', 'O tradicional, com creme de leite, tem bastante gordura. Esta versão com cottage deixa o prato em cerca de 530 kcal com 33 g de proteína.'],
      ['Posso usar ricota no lugar do cottage?', 'Pode. A ricota tem um pouco menos de proteína, mas deixa o molho igualmente cremoso.'],
      ['Macarrão integral é obrigatório?', 'Não. O comum também serve, com um pouco menos de fibra e calorias parecidas.'],
    ],
  },
  'creamy-pea-pasta-eggs': {
    intro: [
      'Macarrão cremoso vegetariano com ervilha, espinafre e ovo cozido: o molho é de queijo cottage batido com alho, e a porção chega a 45 g de proteína por cerca de 645 calorias.',
      'Os ovos com a gema no ponto deixam o prato com cara de restaurante, em 20 minutos.',
    ],
    tips: [
      'Para a gema ficar cremosa, cozinhe os ovos por 7 minutos e passe direto para água gelada.',
      'Ervilha congelada é mais doce e mais verde que a de lata.',
      'Queijo duro vegetariano (sem coalho animal) ou parmesão comum: os dois funcionam.',
    ],
    store: [M, 'Guarde o macarrão num pote e os ovos com casca à parte. Dura até 3 dias na geladeira. Descasque e corte os ovos na hora de comer.'],
    faq: [
      ['Quantos ovos posso comer por dia?', 'Para a maioria das pessoas saudáveis, dois ou três ovos por dia cabem numa alimentação equilibrada. Quem tem alguma condição de saúde deve conversar com o médico.'],
      ['Ervilha tem proteína?', 'Tem: cerca de 5 g a cada 100 g. Somada ao cottage e aos ovos, ajuda a chegar nos 45 g desta receita.'],
      ['Posso trocar os ovos por frango?', 'Pode. Use 120 g de peito de frango em tiras e veja a receita de macarrão cremoso com frango.'],
    ],
  },
};
