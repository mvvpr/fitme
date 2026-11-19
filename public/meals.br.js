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
  extraNames: { 'Baking powder': 'Fermento em pó', 'Black pepper': 'Pimenta-do-reino', 'Chilli flakes': 'Pimenta calabresa em flocos', 'Chilli powder': 'Pimenta em pó', 'Curry powder': 'Curry em pó', 'Dried oregano': 'Orégano seco', 'Fresh coriander or parsley': 'Coentro ou salsinha frescos', 'Fresh dill or parsley': 'Endro ou salsinha frescos', 'Ground cinnamon': 'Canela em pó', 'Ground cumin': 'Cominho em pó', 'Salt': 'Sal', 'Smoked paprika': 'Páprica defumada' },
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
  recipesFish: [
    { name: 'Curry de camarão, grão-de-bico e espinafre', time: '25 min', x: ['2 c. chá de curry em pó, coentro ou salsinha frescos'],
      steps: ['Cozinhe o arroz conforme as instruções da embalagem.', 'Aqueça o azeite em uma panela e refogue a cebola picada por 5 minutos; junte o alho e o curry por 1 minuto.', 'Acrescente o tomate e o grão-de-bico e cozinhe em fogo baixo por 10 minutos. Junte o camarão e cozinhe por 3–4 minutos, até ficar rosado por inteiro.', 'Junte o espinafre até murchar, tire do fogo e misture o iogurte para ficar cremoso. Sirva sobre o arroz com as ervas.'] },
    { name: 'Salmão com limão e alho, batatas e brócolis', time: '35 min', x: ['Orégano seco, sal e pimenta-do-reino'],
      steps: ['Preaqueça o forno a 200 °C. Corte as batatas ao meio, misture com 1 c. chá do azeite, sal e pimenta e asse por 15 minutos.', 'Misture o restante do azeite com o suco de limão, o alho amassado, o orégano, o sal e a pimenta.', 'Coloque o brócolis na assadeira e o salmão por cima. Regue o salmão com a mistura de limão e alho e asse por 12–15 minutos, até desfiar com facilidade.', 'Sirva com as batatas e o brócolis. Frio, também fica ótimo para o almoço do dia seguinte.'] },
    null, null
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
