/* FitMe meal plan: European Portuguese (pt-PT) translations.
   Recipes are matched by meal slot and position, so their order must follow RECIPES in meals.js.
   x = the recipe's herbs/spices/seasoning lines ('~' lines), in order. */
globalThis.FITME_MEALS_PT = {
  db: {
    oats: ['Flocos de aveia'], milk: ['Leite meio-gordo'], yog: ['Iogurte grego magro (0%)'],
    egg: ['Ovos', 'ovo|ovos'], eggw: ['Claras de ovo'], cottage: ['Queijo cottage'], feta: ['Queijo feta'],
    parm: ['Queijo parmesão'], hummus: ['Húmus'],
    bread: ['Pão integral', 'fatia de pão integral|fatias de pão integral'],
    wrap: ['Tortilhas integrais', 'tortilha integral|tortilhas integrais'],
    ricecake: ['Bolachas de arroz', 'bolacha de arroz|bolachas de arroz'],
    brice: ['Arroz integral (cru)'], basmati: ['Arroz basmati (cru)'], pasta: ['Massa integral (crua)'],
    couscous: ['Cuscuz integral (cru)'],
    chicken: ['Peito de frango'], turkey: ['Carne picada de peru (5% gordura)'],
    beef: ['Carne picada de vaca magra (5% gordura)'], pork: ['Lombinho de porco'],
    salmon: ['Lombo de salmão'], smsalmon: ['Salmão fumado'], prawns: ['Camarão cru descascado'],
    cod: ['Bacalhau fresco, lombo (fresco ou congelado)'], tuna: ['Atum ao natural (escorrido)'],
    chickpeas: ['Grão-de-bico cozido (escorrido)'], blackbeans: ['Feijão preto cozido (escorrido)'],
    lentils: ['Lentilhas vermelhas (secas)'], sweetcorn: ['Milho doce (escorrido)'],
    tins: ['Tomate pelado picado (lata)'], passata: ['Polpa de tomate'], pesto: ['Pesto de manjericão'],
    soy: ['Molho de soja com pouco sal'], oil: ['Azeite'], honey: ['Mel'], pb: ['Manteiga de amendoim'],
    almonds: ['Amêndoas'], walnuts: ['Nozes'], whey: ['Proteína whey em pó'], cocoa: ['Cacau em pó'],
    choc: ['Chocolate preto (70%+)'],
    banana: ['Bananas', 'banana|bananas'], apple: ['Maçãs', 'maçã|maçãs'], kiwi: ['Kiwis', 'kiwi|kiwis'],
    berries: ['Frutos vermelhos (frescos ou congelados)'], avocado: ['Abacate'], lemon: ['Sumo de limão'],
    spinach: ['Espinafres baby'], leaves: ['Mistura de alfaces'], rocket: ['Rúcula'], broccoli: ['Brócolos'],
    greenbeans: ['Feijão-verde'], peas: ['Ervilhas congeladas'], cherry: ['Tomate cherry'],
    tomato: ['Tomates', 'tomate|tomates'], cucumber: ['Pepino'], pepper: ['Pimentos', 'pimento|pimentos'],
    courgette: ['Curgetes', 'curgete|curgetes'], carrot: ['Cenouras', 'cenoura|cenouras'],
    onion: ['Cebolas', 'cebola|cebolas'], redonion: ['Cebolas roxas', 'cebola roxa|cebolas roxas'],
    garlic: ['Alho', 'dente de alho|dentes de alho'], potato: ['Batatas pequenas (baby)'], sweetpot: ['Batata-doce']
  },
  aisles: { 'Fruit & veg': 'Frutas e legumes', 'Meat & fish': 'Carne e peixe', 'Dairy & eggs': 'Laticínios e ovos', 'Grains & bread': 'Cereais e pão', 'Pantry': 'Mercearia' },
  slots: { breakfast: 'Pequeno-almoço', lunch: 'Almoço', snack: 'Lanche · a meio da tarde ou depois do jantar', dinner: 'Jantar' },
  days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
  units: { tsp: 'c. chá', tbsp: 'c. sopa' },
  // English names of herbs, spices and extras (from the recipes' "~" lines) → Portuguese, for the shopping list.
  extraNames: { 'Baking powder': 'Fermento em pó', 'Black pepper': 'Pimenta preta', 'Chilli flakes': 'Flocos de malagueta', 'Chilli powder': 'Malagueta em pó', 'Curry powder': 'Caril em pó', 'Dried oregano': 'Orégãos secos', 'Fresh coriander or parsley': 'Coentros ou salsa frescos', 'Fresh dill or parsley': 'Endro ou salsa frescos', 'Ground cinnamon': 'Canela em pó', 'Ground cumin': 'Cominhos em pó', 'Salt': 'Sal', 'Smoked paprika': 'Pimentão-doce fumado' },
  recipes: {
    breakfast: [
      { name: 'Aveia de véspera com frutos vermelhos', time: '5 min + uma noite', x: ['Uma pitada de canela em pó'],
        steps: ['Num frasco ou taça, mistura a aveia, o leite, o iogurte e a canela.', 'Tapa e deixa no frigorífico durante a noite (pelo menos 4 horas) para a aveia amolecer.', 'De manhã, mexe, junta um pouco de leite se estiver muito espesso e cobre com os frutos vermelhos e o mel.'] },
      { name: 'Omelete de espinafres e parmesão com torrada', time: '12 min', x: ['Sal e pimenta preta'],
        steps: ['Bate os ovos com uma pitada de sal e pimenta.', 'Aquece o azeite numa frigideira antiaderente em lume médio, junta os espinafres e mexe até murcharem, cerca de 1 minuto.', 'Deita os ovos, inclina a frigideira para espalhar e cozinha 2–3 minutos até estarem quase firmes. Rala o parmesão sobre metade, dobra e cozinha mais 1 minuto.', 'Serve com o pão torrado.'] },
      { name: 'Panquecas proteicas de banana', time: '15 min', x: ['½ c. chá de fermento em pó, uma pitada de canela em pó'],
        steps: ['Tritura a aveia até obteres uma farinha grossa, junta a banana, os ovos, o fermento e a canela e tritura até ficar homogéneo. Sem liquidificadora? Esmaga bem a banana e bate tudo à mão.', 'Aquece uma frigideira antiaderente em lume médio e pincela-a com um pouco do azeite.', 'Deita pequenas porções de massa (cerca de 3 colheres de sopa cada). Cozinha 2 minutos até aparecerem bolhas, vira e cozinha mais 1 minuto. Repete com o resto.', 'Empilha as panquecas e cobre com o iogurte e os frutos vermelhos.'] }
    ],
    main: [
      { name: 'Caril de frango, grão e espinafres', time: '30 min', x: ['2 c. chá de caril em pó, coentros ou salsa frescos'],
        steps: ['Coze o arroz segundo as instruções da embalagem. Corta o frango em pedaços pequenos.', 'Aquece o azeite num tacho, cozinha a cebola picada durante 5 minutos e junta o alho e o caril em pó durante 1 minuto.', 'Junta o frango e cozinha 3 minutos, depois junta o tomate e o grão e deixa cozinhar em lume brando 12 minutos, até o frango estar bem cozinhado.', 'Junta os espinafres até murcharem, retira do lume e envolve o iogurte para ficar cremoso. Serve sobre o arroz com as ervas.'] },
      { name: 'Frango com limão e alho, batatas e brócolos', time: '40 min', x: ['Orégãos secos, sal e pimenta preta'],
        steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta as batatas ao meio, envolve-as em 1 c. chá do azeite, sal e pimenta e assa 15 minutos.', 'Mistura o resto do azeite com o sumo de limão, o alho esmagado, os orégãos, o sal e a pimenta e envolve o frango nesta mistura.', 'Junta o frango e os floretes de brócolos ao tabuleiro e assa mais 20–25 minutos, até o frango estar bem cozinhado, sem partes rosadas no centro.', 'Deixa o frango repousar 3 minutos, corta-o às fatias e serve com as batatas e os brócolos. Frio, também fica ótimo para o almoço do dia seguinte.'] },
      { name: 'Chili de vaca magra com feijão preto', time: '35 min', x: ['1 c. chá de cominhos em pó, 1 c. chá de pimentão-doce fumado, malagueta em pó q.b.'],
        steps: ['Passa o arroz por água e coze-o em 1,5 vezes o seu volume de água, tapado, durante 12 minutos. Deixa repousar fora do lume.', 'Entretanto, aquece o azeite e cozinha a cebola e o pimento em cubos durante 5 minutos. Junta o alho e as especiarias e cozinha 1 minuto.', 'Junta a carne e aloura durante 5 minutos, desfazendo-a. Junta o tomate e o feijão preto e deixa apurar 15 minutos até engrossar.', 'Serve sobre o arroz com uma colherada de iogurte. Dá bem para cozinhar a dobrar e congelar.'] },
      { name: 'Almôndegas de peru com esparguete integral', time: '35 min', x: ['1 c. chá de orégãos secos, sal e pimenta preta'],
        steps: ['Mistura a carne picada com metade do alho ralado, os orégãos, o sal e a pimenta e faz pequenas almôndegas.', 'Aquece o azeite num tacho e aloura as almôndegas de todos os lados durante 5 minutos. Junta a cebola picada e o resto do alho e cozinha 2 minutos.', 'Junta o tomate picado, tapa e deixa cozinhar em lume brando 12 minutos, até as almôndegas estarem cozinhadas. Junta os espinafres até murcharem.', 'Entretanto, coze o esparguete segundo as instruções da embalagem. Serve com as almôndegas e o molho, com parmesão por cima.'] }
    ],
    snack: [
      { name: 'Iogurte proteico de chocolate', time: '3 min', x: [],
        steps: ['Mistura o cacau e o mel no iogurte até ficar liso, tipo mousse.', 'Cobre com os frutos vermelhos. Fica bem como sobremesa depois do jantar.'] },
      { name: 'Ovos cozidos com pepino', time: '10 min', x: ['Sal, pimenta preta, flocos de malagueta'],
        steps: ['Coze os ovos durante 8–9 minutos, arrefece-os em água fria e descasca-os. Podes cozer um lote para a semana.', 'Corta os ovos ao meio, tempera com sal, pimenta e flocos de malagueta e serve com o pepino às rodelas.'] }
    ]
  }

};
