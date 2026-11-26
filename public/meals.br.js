/* FitMe meal plan: Brazilian Portuguese (pt-BR) translations, used on /br/.
   Same shape as meals.pt.js: recipes are matched by meal slot and position, so their order must follow POOL / POOL_VEG in meals.js.
   x = the recipe's herbs/spices/seasoning lines ('~' lines), in order. */
globalThis.FITME_MEALS_BR = {
  locale: 'pt-BR',
  db: {
    oats: ['Aveia em flocos'], milk: ['Leite semidesnatado'], yog: ['Iogurte grego natural desnatado (0%)'],
    egg: ['Ovos', 'ovo|ovos'], eggw: ['Claras de ovo'], cottage: ['Queijo cottage'], feta: ['Queijo feta'],
    parm: ['Queijo parmesão'], vparm: ['Queijo duro vegetariano (tipo parmesão)'], tofu: ['Tofu firme'], hummus: ['Homus'],
    bread: ['Pão integral', 'fatia de pão integral|fatias de pão integral'],
    wrap: ['Pão folha integral (wrap)', 'pão folha integral|pães folha integrais'],
    ricecake: ['Biscoitos de arroz', 'biscoito de arroz|biscoitos de arroz'],
    brice: ['Arroz integral (cru)'], basmati: ['Arroz basmati ou agulhinha (cru)'], pasta: ['Macarrão integral (cru)'],
    couscous: ['Cuscuz marroquino integral (cru)'],
    chicken: ['Peito de frango'], turkey: ['Carne moída de peru (5% de gordura)'],
    beef: ['Carne moída magra (patinho, 5% de gordura)'], pork: ['Lombo de porco'],
    salmon: ['Lombo de salmão'], smsalmon: ['Salmão defumado'], prawns: ['Camarão cru descascado'],
    cod: ['Bacalhau fresco, lombo (fresco ou congelado)'], tuna: ['Atum em água (escorrido)'],
    chickpeas: ['Grão-de-bico cozido (escorrido)'], blackbeans: ['Feijão preto cozido (escorrido)'],
    lentils: ['Lentilha vermelha (seca)'], sweetcorn: ['Milho verde (escorrido)'],
    tins: ['Tomate pelado picado (lata)'], passata: ['Passata de tomate'], pesto: ['Pesto de manjericão'],
    soy: ['Shoyu light'], oil: ['Azeite'], honey: ['Mel'], pb: ['Pasta de amendoim'],
    almonds: ['Amêndoas'], walnuts: ['Nozes'], whey: ['Whey protein em pó'], cocoa: ['Cacau em pó'],
    choc: ['Chocolate amargo (70%+)'],
    banana: ['Bananas', 'banana|bananas'], apple: ['Maçãs', 'maçã|maçãs'], kiwi: ['Kiwis', 'kiwi|kiwis'],
    berries: ['Frutas vermelhas (frescas ou congeladas)'], avocado: ['Abacate'], lemon: ['Suco de limão'],
    spinach: ['Espinafre baby'], leaves: ['Mix de folhas'], rocket: ['Rúcula'], broccoli: ['Brócolis'],
    greenbeans: ['Vagem'], peas: ['Ervilhas congeladas'], cherry: ['Tomate-cereja'],
    tomato: ['Tomates', 'tomate|tomates'], cucumber: ['Pepino'], pepper: ['Pimentões', 'pimentão|pimentões'],
    courgette: ['Abobrinhas', 'abobrinha|abobrinhas'], carrot: ['Cenouras', 'cenoura|cenouras'],
    onion: ['Cebolas', 'cebola|cebolas'], redonion: ['Cebolas roxas', 'cebola roxa|cebolas roxas'],
    garlic: ['Alho', 'dente de alho|dentes de alho'], potato: ['Batatas bolinha'], sweetpot: ['Batata-doce']
  },
  aisles: { 'Fruit & veg': 'Hortifrúti', 'Meat & fish': 'Carnes e peixes', 'Dairy & eggs': 'Laticínios e ovos', 'Grains & bread': 'Grãos e pães', 'Pantry': 'Mercearia' },
  slots: { breakfast: 'Café da manhã', lunch: 'Almoço', snack: 'Lanche · no meio da tarde ou depois do jantar', dinner: 'Jantar' },
  days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
  units: { tsp: 'c. chá', tbsp: 'c. sopa' },
  words: { slice: ['fatia', 'fatias'], clove: ['dente', 'dentes'], tsp: 'c. chá', tbsp: 'c. sopa' },
  // English names of herbs, spices and extras (from the recipes' "~" lines) → Brazilian Portuguese, for the shopping list.
  extraNames: { 'Spring onion': 'Cebolinha', 'Fresh basil': 'Manjericão fresco', 'Lemon wedge': 'Gomo de limão', 'Baking powder': 'Fermento em pó', 'Black pepper': 'Pimenta-do-reino', 'Chilli flakes': 'Pimenta calabresa em flocos', 'Chilli powder': 'Pimenta em pó', 'Curry powder': 'Curry em pó', 'Dried oregano': 'Orégano seco', 'Fresh coriander or parsley': 'Coentro ou salsinha frescos', 'Fresh dill or parsley': 'Endro ou salsinha frescos', 'Ground cinnamon': 'Canela em pó', 'Ground cumin': 'Cominho em pó', 'Salt': 'Sal', 'Smoked paprika': 'Páprica defumada' },
  recipes: {
    breakfast: [
      { name: 'Overnight oats com frutas vermelhas', time: '5 min + uma noite', x: ['Uma pitada de canela em pó'],
        steps: ['Em um pote ou tigela, misture a aveia, o leite, o iogurte e a canela.', 'Tampe e deixe na geladeira durante a noite (pelo menos 4 horas) para a aveia amolecer.', 'De manhã, mexa, acrescente um pouco de leite se estiver muito grosso e cubra com as frutas vermelhas e o mel.'] },
      { name: 'Omelete de espinafre e parmesão com torrada', time: '12 min', x: ['Sal e pimenta-do-reino'],
        steps: ['Bata os ovos com uma pitada de sal e pimenta.', 'Aqueça o azeite em uma frigideira antiaderente em fogo médio, junte o espinafre e mexa até murchar, cerca de 1 minuto.', 'Despeje os ovos, incline a frigideira para espalhar e cozinhe por 2–3 minutos, até ficarem quase firmes. Rale o parmesão sobre uma metade, dobre e cozinhe por mais 1 minuto.', 'Sirva com o pão torrado.'] },
      { name: 'Panquecas proteicas de banana', time: '15 min', x: ['½ c. chá de fermento em pó, uma pitada de canela em pó'],
        steps: ['Bata a aveia no liquidificador até virar uma farinha grossa, junte a banana, os ovos, o fermento e a canela e bata até ficar homogêneo. Sem liquidificador? Amasse bem a banana e misture tudo à mão.', 'Aqueça uma frigideira antiaderente em fogo médio e pincele com um pouco do azeite.', 'Despeje pequenas porções de massa (cerca de 3 colheres de sopa cada). Cozinhe por 2 minutos, até aparecerem bolhas, vire e cozinhe por mais 1 minuto. Repita com o restante.', 'Empilhe as panquecas e cubra com o iogurte e as frutas vermelhas.'] }
    ],
    main: [
      { name: 'Curry de frango, grão-de-bico e espinafre', time: '30 min', x: ['2 c. chá de curry em pó, coentro ou salsinha frescos'],
        steps: ['Cozinhe o arroz conforme as instruções da embalagem. Corte o frango em pedaços pequenos.', 'Aqueça o azeite em uma panela, refogue a cebola picada por 5 minutos e junte o alho e o curry por 1 minuto.', 'Junte o frango e cozinhe por 3 minutos, depois acrescente o tomate e o grão-de-bico e cozinhe em fogo baixo por 12 minutos, até o frango estar bem cozido.', 'Junte o espinafre até murchar, tire do fogo e misture o iogurte para ficar cremoso. Sirva sobre o arroz com as ervas.'] },
      { name: 'Frango com limão e alho, batatas e brócolis', time: '40 min', x: ['Orégano seco, sal e pimenta-do-reino'],
        steps: ['Preaqueça o forno a 200 °C. Corte as batatas ao meio, misture com 1 c. chá do azeite, sal e pimenta e asse por 15 minutos.', 'Misture o restante do azeite com o suco de limão, o alho amassado, o orégano, o sal e a pimenta e envolva o frango nessa mistura.', 'Coloque o frango e os buquês de brócolis na assadeira e asse por mais 20–25 minutos, até o frango estar bem cozido, sem partes rosadas no centro.', 'Deixe o frango descansar por 3 minutos, corte em fatias e sirva com as batatas e o brócolis. Frio, também fica ótimo para o almoço do dia seguinte.'] },
      { name: 'Chili de carne magra com feijão preto', time: '35 min', x: ['1 c. chá de cominho em pó, 1 c. chá de páprica defumada, pimenta em pó a gosto'],
        steps: ['Lave o arroz e cozinhe em 1,5 vez o seu volume de água, tampado, por 12 minutos. Deixe descansar fora do fogo.', 'Enquanto isso, aqueça o azeite e refogue a cebola e o pimentão em cubos por 5 minutos. Junte o alho e os temperos e cozinhe por 1 minuto.', 'Junte a carne e doure por 5 minutos, soltando com a colher. Acrescente o tomate e o feijão preto e deixe apurar por 15 minutos, até engrossar.', 'Sirva sobre o arroz com uma colherada de iogurte. Rende bem para fazer em dobro e congelar.'] },
      { name: 'Almôndegas de peru com espaguete integral', time: '35 min', x: ['1 c. chá de orégano seco, sal e pimenta-do-reino'],
        steps: ['Misture a carne moída com metade do alho ralado, o orégano, o sal e a pimenta e faça pequenas almôndegas.', 'Aqueça o azeite em uma panela e doure as almôndegas de todos os lados por 5 minutos. Junte a cebola picada e o restante do alho e cozinhe por 2 minutos.', 'Junte o tomate picado, tampe e cozinhe em fogo baixo por 12 minutos, até as almôndegas estarem cozidas. Junte o espinafre até murchar.', 'Enquanto isso, cozinhe o espaguete conforme a embalagem. Sirva com as almôndegas e o molho, com parmesão por cima.'] }
    ],
    snack: [
      { name: 'Iogurte proteico de chocolate', time: '3 min', x: [],
        steps: ['Misture o cacau e o mel no iogurte até ficar liso, tipo mousse.', 'Cubra com as frutas vermelhas. Fica ótimo como sobremesa depois do jantar.'] },
      { name: 'Ovos cozidos com pepino', time: '10 min', x: ['Sal, pimenta-do-reino, pimenta calabresa em flocos'],
        steps: ['Cozinhe os ovos por 8–9 minutos, esfrie em água fria e descasque. Dá para cozinhar vários de uma vez para a semana.', 'Corte os ovos ao meio, tempere com sal, pimenta e pimenta calabresa e sirva com o pepino em rodelas.'] }
    ]
  },
  // Fish versions of the main templates, same order as POOL_FISH in meals.js.
  // Menu B (rotation week 2), same order and shape as MENU_B in meals.js.
  menuB: {
    breakfast: [
      { name: 'Bowl de iogurte grego com banana, aveia e pasta de amendoim', time: '5 min', x: ['Uma pitada de canela em pó'],
        steps: ['Coloque o iogurte em uma tigela e corte a banana em rodelas.', 'Aqueça a pasta de amendoim por 10 segundos no micro-ondas (ou misture uma colher de chá de água quente) para ela ficar mais líquida.', 'Cubra o iogurte com a aveia e a banana, regue com a pasta de amendoim e finalize com a canela.', 'Quer um bowl maior? Troque a pasta de amendoim por um bom punhado de frutas vermelhas (cerca de 150 g): menos calorias e muito mais comida.'] },
      { name: 'Wrap de ovos mexidos com espinafre', time: '10 min', x: ['Sal, pimenta-do-reino, pimenta calabresa (opcional)'],
        steps: ['Bata os ovos com o queijo cottage, uma pitada de sal e pimenta.', 'Aqueça o azeite em uma frigideira antiaderente em fogo médio, junte o espinafre e mexa por 1 minuto até murchar.', 'Despeje os ovos e mexa devagar por cerca de 2 minutos. Tire do fogo enquanto ainda estiverem cremosos.', 'Aqueça a tortilha em uma frigideira seca, 20 segundos de cada lado. Recheie com os ovos e os tomates cortados ao meio, junte a pimenta calabresa, enrole bem e corte ao meio.'] },
      { name: 'Mingau de aveia proteico com maçã e canela', time: '8 min', x: ['Uma pitada de canela em pó'],
        steps: ['Coloque a aveia, o leite e a canela em uma panela pequena e cozinhe em fogo baixo por 4–5 minutos, mexendo sempre, até ficar cremoso. No micro-ondas: 2½–3 minutos, mexendo na metade do tempo.', 'Rale metade da maçã e corte a outra metade em cubos.', 'Tire o mingau do fogo e misture metade do iogurte e a maçã ralada. Cubra com o restante do iogurte e a maçã em cubos.'] }
    ],
    main: [
      { name: 'Arroz frito com frango e ovo', time: '25 min', x: ['Cebolinha (opcional), gengibre em pó ou fresco'],
        steps: ['Cozinhe o arroz conforme a embalagem e espalhe em um prato para esfriar. Arroz do dia anterior é ainda melhor: ele frita em vez de virar papa.', 'Corte o frango e a cenoura em cubinhos. Aqueça 1 c. chá do azeite em uma frigideira grande ou wok em fogo alto e doure o frango por 5–6 minutos, até ficar bem cozido. Reserve em um prato.', 'Junte o restante do azeite, a cenoura e a ervilha e refogue por 3 minutos. Acrescente o alho amassado e uma pitada de gengibre por 30 segundos.', 'Afaste tudo para um lado, quebre o ovo na frigideira e mexa por 1 minuto. Junte o arroz, o frango e o shoyu e misture por 2–3 minutos até ficar bem quente. Finalize com cebolinha picada.'] },
      { name: 'Frango ao pesto com legumes assados e cuscuz marroquino', time: '35 min', x: ['Sal e pimenta-do-reino, manjericão fresco (opcional)'],
        steps: ['Preaqueça o forno a 200 °C. Corte a abobrinha, o pimentão e a cebola roxa em pedaços, misture com o azeite, sal e pimenta em uma assadeira e asse por 10 minutos.', 'Corte o frango em tiras grossas e envolva em metade do pesto. Coloque na assadeira com os tomates-cereja e asse por 18–20 minutos, até o frango ficar bem cozido.', 'Enquanto isso, coloque o cuscuz em uma tigela, junte cerca de 75 ml de água fervente, tampe e deixe descansar por 5 minutos. Solte com um garfo.', 'Dilua o restante do pesto com 1 c. sopa de água e misture aos legumes. Sirva o frango e os legumes sobre o cuscuz, com manjericão se tiver.'] },
      { name: 'Wrap de carne moída com milho e vinagrete de tomate', time: '20 min', x: ['1 c. chá de cominho em pó, 1 c. chá de páprica defumada, pimenta em pó a gosto, sal'],
        steps: ['Aqueça o azeite em uma frigideira e refogue a cebola e o pimentão em tiras por 4 minutos.', 'Junte a carne moída e doure por 5 minutos, soltando bem. Acrescente os temperos por 1 minuto, depois o milho e 2 c. sopa de água, e cozinhe por mais 2 minutos.', 'Corte o tomate em cubinhos e tempere com uma pitada de sal para um vinagrete rápido. Aqueça a tortilha em uma frigideira seca, 20 segundos de cada lado.', 'Espalhe o iogurte na tortilha, coloque as folhas, a carne e o vinagrete e enrole. Para a marmita de amanhã, guarde o recheio em um pote separado e monte o wrap na hora.'] },
      { name: 'Macarrão cremoso com frango, ervilha e espinafre', time: '20 min', x: ['Sal, pimenta-do-reino, uma pitada de pimenta calabresa'],
        steps: ['Cozinhe o macarrão conforme a embalagem, juntando a ervilha nos últimos 3 minutos. Reserve uma caneca da água do cozimento.', 'Enquanto isso, corte o frango em tiras e doure no azeite por 6–7 minutos, até ficar bem cozido. Junte o alho amassado no último minuto.', 'Bata o queijo cottage até ficar liso, ou amasse bem com um garfo.', 'Escorra o macarrão e a ervilha e volte para a panela, fora do fogo. Junte o frango, o cottage, o espinafre e um pouco da água do cozimento e mexa até o espinafre murchar e o molho envolver o macarrão. Não deixe ferver depois de colocar o queijo. Finalize com o parmesão, pimenta-do-reino e pimenta calabresa.'] }
    ],
    snack: [
      { name: 'Maçã fatiada com pastinha de iogurte e amendoim', time: '3 min', x: ['Uma pitada de canela em pó'],
        steps: ['Misture a pasta de amendoim e a canela no iogurte até ficar liso.', 'Corte a maçã em fatias e mergulhe na pastinha. Umas gotas de limão evitam que as fatias escureçam, se for levar para mais tarde.', 'Quer um lanche maior? Deixe a pasta de amendoim de fora e coma uma segunda maçã: mais ou menos as mesmas calorias e o dobro de comida.'] },
      { name: 'Biscoito de arroz com cottage, homus e pepino', time: '3 min', x: ['Pimenta-do-reino, pimenta calabresa'],
        steps: ['Passe uma camada fina de homus nos biscoitos de arroz e cubra com o queijo cottage.', 'Junte o pepino em rodelas, pimenta-do-reino e pimenta calabresa. Coma na hora, para o biscoito continuar crocante.'] }
    ],
    veg: [
      { name: 'Arroz frito com tofu e ovo', time: '25 min', x: ['Cebolinha (opcional), gengibre em pó ou fresco'],
        steps: ['Cozinhe o arroz conforme a embalagem e espalhe em um prato para esfriar. Arroz do dia anterior é ainda melhor: ele frita em vez de virar papa.', 'Seque o tofu com papel-toalha e corte em cubinhos. Aqueça 1 c. chá do azeite em uma frigideira grande ou wok em fogo alto e doure o tofu por 5–6 minutos, virando, até ficar dourado. Reserve em um prato.', 'Junte o restante do azeite, a cenoura em cubinhos e a ervilha e refogue por 3 minutos. Acrescente o alho amassado e uma pitada de gengibre por 30 segundos.', 'Afaste tudo para um lado, quebre o ovo na frigideira e mexa por 1 minuto. Junte o arroz, o tofu e o shoyu e misture por 2–3 minutos até ficar bem quente. Finalize com cebolinha picada.'] },
      { name: 'Cuscuz marroquino com legumes assados, grão-de-bico e iogurte de limão', time: '35 min', x: ['1 c. chá de orégano seco, 1 c. chá de páprica defumada, sal e pimenta-do-reino'],
        steps: ['Preaqueça o forno a 200 °C. Corte a abobrinha, o pimentão e a cebola roxa em pedaços e misture em uma assadeira com 1 c. chá do azeite, sal e pimenta. Asse por 10 minutos.', 'Seque o grão-de-bico e misture com o restante do azeite, a páprica e o orégano. Coloque na assadeira com os tomates-cereja e asse por 18–20 minutos, até o grão-de-bico ficar crocante nas bordas.', 'Enquanto isso, coloque o cuscuz em uma tigela, junte cerca de 75 ml de água fervente, tampe e deixe descansar por 5 minutos. Solte com um garfo. Misture o iogurte com o suco de limão e uma pitada de sal.', 'Sirva os legumes e o grão-de-bico sobre o cuscuz, com o iogurte de limão por cima.'] },
      { name: 'Wrap de feijão preto com milho e vinagrete de tomate', time: '15 min', x: ['1 c. chá de cominho em pó, 1 c. chá de páprica defumada, pimenta em pó a gosto, sal'],
        steps: ['Aqueça o azeite em uma frigideira e refogue a cebola e o pimentão em tiras por 4 minutos.', 'Junte o feijão preto e os temperos com 3 c. sopa de água. Cozinhe por 3 minutos, amassando mais ou menos metade do feijão com um garfo para o recheio dar liga. Junte o milho no último minuto.', 'Corte o tomate em cubinhos e tempere com uma pitada de sal para um vinagrete rápido. Aqueça a tortilha em uma frigideira seca, 20 segundos de cada lado.', 'Espalhe o iogurte na tortilha, coloque as folhas, o feijão e o vinagrete e enrole. Para a marmita de amanhã, guarde o recheio em um pote separado e monte o wrap na hora.'] },
      { name: 'Macarrão cremoso com ervilha, espinafre e ovo cozido', time: '20 min', x: ['Sal, pimenta-do-reino, uma pitada de pimenta calabresa'],
        steps: ['Cozinhe os ovos por 7 minutos, esfrie em água fria e descasque. Cozinhe o macarrão conforme a embalagem, juntando a ervilha nos últimos 3 minutos. Reserve uma caneca da água do cozimento.', 'Aqueça o azeite em uma panela pequena e refogue o alho amassado por 1 minuto, sem deixar dourar.', 'Bata o queijo cottage com o azeite de alho até ficar liso, ou amasse bem com um garfo.', 'Escorra o macarrão e a ervilha e volte para a panela, fora do fogo. Junte o cottage, o espinafre e um pouco da água do cozimento e mexa até o espinafre murchar. Não deixe ferver depois de colocar o queijo. Finalize com os ovos cortados ao meio, o queijo ralado e as pimentas.'] }
    ],
    fish: [
      { name: 'Arroz frito com camarão e ovo', time: '20 min', x: ['Cebolinha (opcional), gengibre em pó ou fresco'],
        steps: ['Cozinhe o arroz conforme a embalagem e espalhe em um prato para esfriar. Arroz do dia anterior é ainda melhor: ele frita em vez de virar papa.', 'Aqueça o azeite em uma frigideira grande ou wok em fogo alto. Junte a cenoura em cubinhos e a ervilha e refogue por 3 minutos, depois o alho amassado e uma pitada de gengibre por 30 segundos.', 'Junte o camarão e cozinhe por 2–3 minutos, até ficar rosado por inteiro.', 'Afaste tudo para um lado, quebre o ovo na frigideira e mexa por 1 minuto. Junte o arroz e o shoyu e misture por 2–3 minutos até ficar bem quente. Finalize com cebolinha picada.'] },
      { name: 'Peixe ao pesto com legumes assados e cuscuz marroquino', time: '35 min', x: ['Sal e pimenta-do-reino, gomo de limão (opcional)'],
        steps: ['Preaqueça o forno a 200 °C. Corte a abobrinha, o pimentão e a cebola roxa em pedaços, misture com o azeite, sal e pimenta em uma assadeira e asse por 15 minutos.', 'Junte os tomates-cereja à assadeira, coloque o peixe por cima e espalhe metade do pesto sobre ele. Asse por 12–15 minutos, até o peixe se desfazer em lascas com facilidade.', 'Enquanto isso, coloque o cuscuz em uma tigela, junte cerca de 75 ml de água fervente, tampe e deixe descansar por 5 minutos. Solte com um garfo.', 'Dilua o restante do pesto com 1 c. sopa de água e misture aos legumes. Sirva o peixe e os legumes sobre o cuscuz.'] },
      null,
      { name: 'Macarrão cremoso com atum, ervilha e espinafre', time: '15 min', x: ['Sal, pimenta-do-reino, uma pitada de pimenta calabresa'],
        steps: ['Cozinhe o macarrão conforme a embalagem, juntando a ervilha nos últimos 3 minutos. Reserve uma caneca da água do cozimento.', 'Aqueça o azeite em uma panela pequena e refogue o alho amassado por 1 minuto, sem deixar dourar.', 'Bata o queijo cottage com o azeite de alho e o suco de limão até ficar liso, ou amasse bem com um garfo.', 'Escorra o macarrão e a ervilha e volte para a panela, fora do fogo. Junte o cottage, o espinafre e um pouco da água do cozimento e mexa até o espinafre murchar. Misture o atum escorrido em lascas grandes e tempere com as pimentas.'] }
    ],
    pork: [
      null,
      { name: 'Lombo de porco ao pesto com legumes assados e cuscuz marroquino', time: '35 min', x: ['Sal e pimenta-do-reino, manjericão fresco (opcional)'],
        steps: ['Preaqueça o forno a 200 °C. Corte a abobrinha, o pimentão e a cebola roxa em pedaços, misture com o azeite, sal e pimenta em uma assadeira e asse por 10 minutos.', 'Corte o lombo em medalhões de 2 cm e envolva em metade do pesto. Coloque na assadeira com os tomates-cereja e asse por 15–18 minutos, até a carne ficar bem cozida e o caldo sair claro.', 'Enquanto isso, coloque o cuscuz em uma tigela, junte cerca de 75 ml de água fervente, tampe e deixe descansar por 5 minutos. Solte com um garfo.', 'Dilua o restante do pesto com 1 c. sopa de água e misture aos legumes. Sirva o porco e os legumes sobre o cuscuz.'] },
      null, null
    ]
  },
  recipesFish: [
    { name: 'Curry de camarão, grão-de-bico e espinafre', time: '25 min', x: ['2 c. chá de curry em pó, coentro ou salsinha frescos'],
      steps: ['Cozinhe o arroz conforme as instruções da embalagem.', 'Aqueça o azeite em uma panela e refogue a cebola picada por 5 minutos; junte o alho e o curry por 1 minuto.', 'Acrescente o tomate e o grão-de-bico e cozinhe em fogo baixo por 10 minutos. Junte o camarão e cozinhe por 3–4 minutos, até ficar rosado por inteiro.', 'Junte o espinafre até murchar, tire do fogo e misture o iogurte para ficar cremoso. Sirva sobre o arroz com as ervas.'] },
    { name: 'Salmão com limão e alho, batatas e brócolis', time: '35 min', x: ['Orégano seco, sal e pimenta-do-reino'],
      steps: ['Preaqueça o forno a 200 °C. Corte as batatas ao meio, misture com 1 c. chá do azeite, sal e pimenta e asse por 15 minutos.', 'Misture o restante do azeite com o suco de limão, o alho amassado, o orégano, o sal e a pimenta.', 'Coloque o brócolis na assadeira e o salmão por cima. Regue o salmão com a mistura de limão e alho e asse por 12–15 minutos, até desfiar com facilidade.', 'Sirva com as batatas e o brócolis. Frio, também fica ótimo para o almoço do dia seguinte.'] },
    null, null
  ],
  // Pork versions of the main templates, same order as POOL_PORK in meals.js.
  recipesPork: [
    { name: 'Tiras de lombo de porco no shoyu e mel com arroz', time: '25 min', x: ['Gengibre em pó ou fresco, pimenta calabresa (opcional)'],
      steps: ['Cozinhe o arroz conforme a embalagem. Corte o porco em tiras finas, o pimentão em tiras e o brócolis em buquês pequenos.', 'Misture o shoyu, o mel, o alho amassado e uma pitada de gengibre com 2 c. sopa de água.', 'Aqueça o azeite em uma frigideira grande ou wok em fogo alto e refogue o porco por 3–4 minutos, até dourar e ficar bem cozido. Reserve em um prato.', 'Refogue o pimentão e o brócolis por 3–4 minutos com um pouco de água. Volte o porco para a frigideira, junte o molho e misture por 1 minuto, até ficar brilhante. Sirva com o arroz.'] },
    { name: 'Lombo de porco com páprica, batata assada e vagem', time: '40 min', x: ['1 c. chá de páprica defumada, orégano seco, sal e pimenta-do-reino'],
      steps: ['Preaqueça o forno a 200 °C. Corte as batatas ao meio, misture com 1 c. chá do azeite, sal e pimenta e asse por 15 minutos.', 'Misture o restante do azeite com a páprica, o alho amassado, o orégano, o sal e a pimenta e esfregue bem no lombo.', 'Coloque o porco e a vagem na assadeira e asse por 20 minutos, até o porco estar bem cozido e o caldo sair claro.', 'Deixe o porco descansar por 5 minutos, corte em fatias e sirva com as batatas e a vagem. Frio, fica ótimo na marmita do dia seguinte.'] },
    null,
    { name: 'Porco à grega com cuscuz marroquino e molho de iogurte', time: '20 min', x: ['Orégano seco, sal e pimenta-do-reino, salsinha ou hortelã frescas (opcional)'],
      steps: ['Coloque o cuscuz em uma tigela, junte cerca de 80 ml de água fervente, tampe e deixe descansar por 5 minutos. Solte com um garfo.', 'Corte o porco em medalhões de 1 cm e tempere com metade do suco de limão, metade do alho amassado, o orégano, sal e pimenta.', 'Aqueça o azeite em uma frigideira em fogo médio-alto e doure o porco por cerca de 3 minutos de cada lado, até estar bem cozido.', 'Misture o iogurte com o restante do alho e uma pitada de sal. Pique o tomate e o pepino e misture ao cuscuz com o restante do suco de limão. Sirva o porco sobre o cuscuz, com o molho de iogurte.'] }
  ],
  // Vegetarian pool, same order as POOL_VEG in meals.js.
  recipesVeg: {
    breakfast: [
      null,
      { name: 'Omelete de espinafre e queijo com torrada', time: '12 min', x: ['Sal e pimenta-do-reino'],
        steps: ['Bata os ovos com uma pitada de sal e pimenta.', 'Aqueça o azeite em uma frigideira antiaderente em fogo médio, junte o espinafre e mexa até murchar, cerca de 1 minuto.', 'Despeje os ovos, incline a frigideira para espalhar e cozinhe por 2–3 minutos, até ficarem quase firmes. Rale o queijo sobre uma metade, dobre e cozinhe por mais 1 minuto.', 'Sirva com o pão torrado.'] },
      null
    ],
    main: [
      { name: 'Curry de tofu, grão-de-bico e espinafre', time: '30 min', x: ['2 c. chá de curry em pó, coentro ou salsinha frescos'],
        steps: ['Cozinhe o arroz conforme as instruções da embalagem. Seque o tofu com papel-toalha e corte em cubos.', 'Aqueça o azeite em uma frigideira antiaderente e frite o tofu por 5–6 minutos, virando, até dourar. Reserve em um prato.', 'Na mesma frigideira, refogue a cebola picada por 5 minutos e junte o alho e o curry por 1 minuto. Acrescente o tomate e o grão-de-bico, cozinhe em fogo baixo por 10 minutos e volte com o tofu.', 'Junte o espinafre até murchar, tire do fogo e misture o iogurte para ficar cremoso. Sirva sobre o arroz com as ervas.'] },
      { name: 'Tofu com limão e alho, batatas e brócolis', time: '40 min', x: ['Orégano seco, sal e pimenta-do-reino'],
        steps: ['Preaqueça o forno a 200 °C. Corte as batatas ao meio, misture com 1 c. chá do azeite, sal e pimenta e asse por 15 minutos.', 'Seque o tofu com papel-toalha e corte em cubos grandes. Misture o restante do azeite com o suco de limão, o alho amassado, o orégano, o sal e a pimenta e envolva o tofu nessa mistura.', 'Coloque o tofu e os buquês de brócolis na assadeira e asse por mais 20–25 minutos, virando o tofu na metade do tempo, até dourar nas bordas.', 'Sirva com as batatas e o brócolis. Frio, também fica ótimo para o almoço do dia seguinte.'] },
      { name: 'Chili de feijão preto e lentilha', time: '35 min', x: ['1 c. chá de cominho em pó, 1 c. chá de páprica defumada, pimenta em pó a gosto'],
        steps: ['Lave o arroz e cozinhe em 1,5 vez o seu volume de água, tampado, por 12 minutos. Deixe descansar fora do fogo.', 'Enquanto isso, aqueça o azeite e refogue a cebola e o pimentão em cubos por 5 minutos. Junte o alho e os temperos e cozinhe por 1 minuto.', 'Junte a lentilha lavada, o tomate e 150 ml de água e cozinhe em fogo baixo por 15 minutos, até a lentilha ficar macia. Acrescente o feijão preto e cozinhe por mais 5 minutos, até engrossar, com um pouco de água se precisar.', 'Sirva sobre o arroz com uma colherada de iogurte. Rende bem para fazer em dobro e congelar.'] },
      { name: 'Espaguete cremoso de tomate e espinafre', time: '20 min', x: ['1 c. chá de orégano seco, sal e pimenta-do-reino'],
        steps: ['Cozinhe o espaguete conforme a embalagem e reserve uma xícara da água do cozimento.', 'Enquanto isso, aqueça o azeite em uma panela, refogue o alho amassado por 1 minuto, junte o tomate e o orégano e cozinhe em fogo baixo por 8 minutos.', 'Bata o queijo cottage até ficar liso (ou amasse bem com um garfo). Tire o molho do fogo e misture o queijo cottage e o espinafre até murchar. Não deixe ferver depois de colocar o queijo.', 'Misture o espaguete ao molho, soltando com um pouco da água do cozimento, e sirva com o queijo ralado por cima.'] }
    ],
    snack: null
  }
};
(function (p) { var v = p.recipesVeg; v.breakfast[0] = p.recipes.breakfast[0]; v.breakfast[2] = p.recipes.breakfast[2]; v.snack = p.recipes.snack; })(globalThis.FITME_MEALS_BR);
