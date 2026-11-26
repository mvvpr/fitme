/* FitMe meal plan: European Portuguese (pt-PT) translations.
   Recipes are matched by meal slot and position, so their order must follow RECIPES in meals.js.
   x = the recipe's herbs/spices/seasoning lines ('~' lines), in order. */
globalThis.FITME_MEALS_PT = {
  locale: 'pt-PT',
  db: {
    oats: ['Flocos de aveia'], milk: ['Leite meio-gordo'], yog: ['Iogurte grego magro (0%)'],
    egg: ['Ovos', 'ovo|ovos'], eggw: ['Claras de ovo'], cottage: ['Queijo cottage'], feta: ['Queijo feta'],
    parm: ['Queijo parmesão'], vparm: ['Queijo curado vegetariano (tipo parmesão)'], tofu: ['Tofu firme'], hummus: ['Húmus'],
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
  extraNames: { 'Spring onion': 'Cebolinho', 'Fresh basil': 'Manjericão fresco', 'Lemon wedge': 'Gomo de limão', 'Baking powder': 'Fermento em pó', 'Black pepper': 'Pimenta preta', 'Chilli flakes': 'Flocos de malagueta', 'Chilli powder': 'Malagueta em pó', 'Curry powder': 'Caril em pó', 'Dried oregano': 'Orégãos secos', 'Fresh coriander or parsley': 'Coentros ou salsa frescos', 'Fresh dill or parsley': 'Endro ou salsa frescos', 'Ground cinnamon': 'Canela em pó', 'Ground cumin': 'Cominhos em pó', 'Salt': 'Sal', 'Smoked paprika': 'Pimentão-doce fumado' },
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
  },
  // Fish versions of the main templates, same order as POOL_FISH in meals.js.
  // Menu B (rotation week 2), same order and shape as MENU_B in meals.js.
  menuB: {
    breakfast: [
      { name: 'Taça de iogurte grego com banana, aveia e manteiga de amendoim', time: '5 min', x: ['Uma pitada de canela em pó'],
        steps: ['Deita o iogurte numa taça e corta a banana às rodelas.', 'Aquece a manteiga de amendoim 10 segundos no micro-ondas (ou junta-lhe uma colher de chá de água quente) para ficar mais líquida.', 'Cobre o iogurte com a aveia e a banana, regas com a manteiga de amendoim e terminas com a canela.', 'Queres uma taça maior? Troca a manteiga de amendoim por uma boa mão-cheia de frutos vermelhos (cerca de 150 g): menos calorias e muito mais comida.'] },
      { name: 'Wrap de ovos mexidos com espinafres', time: '10 min', x: ['Sal, pimenta preta, flocos de malagueta (opcional)'],
        steps: ['Bate os ovos com o queijo cottage, uma pitada de sal e pimenta.', 'Aquece o azeite numa frigideira antiaderente em lume médio, junta os espinafres e mexe 1 minuto até murcharem.', 'Deita os ovos e mexe devagar durante cerca de 2 minutos. Tira a frigideira do lume enquanto ainda estão cremosos.', 'Aquece a tortilha numa frigideira sem gordura, 20 segundos de cada lado. Recheia com os ovos e os tomates cortados ao meio, junta os flocos de malagueta, enrola bem e corta ao meio.'] },
      { name: 'Papas de aveia proteicas com maçã e canela', time: '8 min', x: ['Uma pitada de canela em pó'],
        steps: ['Põe a aveia, o leite e a canela num tacho pequeno e deixa cozinhar em lume brando 4–5 minutos, sempre a mexer, até ficar cremoso. No micro-ondas: 2½–3 minutos, mexendo a meio.', 'Rala metade da maçã e corta a outra metade aos cubos.', 'Tira as papas do lume e junta metade do iogurte e a maçã ralada. Cobre com o resto do iogurte e a maçã aos cubos.'] }
    ],
    main: [
      { name: 'Arroz frito com frango e ovo', time: '25 min', x: ['Cebolinho (opcional), gengibre em pó ou fresco'],
        steps: ['Coze o arroz segundo as instruções da embalagem e espalha-o num prato para arrefecer. Arroz do dia anterior ainda é melhor: frita em vez de ficar empapado.', 'Corta o frango e a cenoura em cubos pequenos. Aquece 1 c. chá do azeite numa frigideira grande ou wok em lume forte e cozinha o frango 5–6 minutos, até estar bem cozinhado. Reserva num prato.', 'Junta o resto do azeite, a cenoura e as ervilhas e salteia 3 minutos. Junta o alho esmagado e uma pitada de gengibre durante 30 segundos.', 'Afasta tudo para um lado, parte o ovo para a frigideira e mexe-o 1 minuto. Junta o arroz, o frango e o molho de soja e salteia 2–3 minutos até estar bem quente. Termina com cebolinho picado.'] },
      { name: 'Frango com pesto no forno, legumes assados e cuscuz', time: '35 min', x: ['Sal e pimenta preta, manjericão fresco (opcional)'],
        steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta a curgete, o pimento e a cebola-roxa em pedaços, envolve-os no azeite, sal e pimenta num tabuleiro e assa 10 minutos.', 'Corta o frango em tiras grossas e envolve-o em metade do pesto. Junta-o ao tabuleiro com os tomates cherry e assa 18–20 minutos, até o frango estar bem cozinhado.', 'Entretanto, põe o cuscuz numa taça, junta cerca de 75 ml de água a ferver, tapa e deixa 5 minutos. Solta-o com um garfo.', 'Dilui o resto do pesto com 1 c. sopa de água e envolve-o nos legumes. Serve o frango e os legumes sobre o cuscuz, com manjericão se tiveres.'] },
      { name: 'Wraps de carne picada e milho com salsa de tomate', time: '20 min', x: ['1 c. chá de cominhos em pó, 1 c. chá de pimentão-doce fumado, malagueta em pó a gosto, sal'],
        steps: ['Aquece o azeite numa frigideira e cozinha a cebola e o pimento às tiras durante 4 minutos.', 'Junta a carne picada e deixa alourar 5 minutos, desfazendo-a. Junta as especiarias durante 1 minuto e depois o milho e 2 c. sopa de água. Cozinha mais 2 minutos.', 'Corta o tomate em cubos pequenos e tempera com uma pitada de sal: está feita a salsa. Aquece a tortilha numa frigideira sem gordura, 20 segundos de cada lado.', 'Barra a tortilha com o iogurte, junta a alface, a carne e a salsa e enrola. Para o almoço de amanhã, guarda o recheio numa caixa à parte e enrola o wrap na hora.'] },
      { name: 'Massa cremosa com frango, ervilhas e espinafres', time: '20 min', x: ['Sal, pimenta preta, uma pitada de flocos de malagueta'],
        steps: ['Coze a massa segundo as instruções da embalagem e junta as ervilhas nos últimos 3 minutos. Guarda uma caneca da água da cozedura.', 'Entretanto, corta o frango em tiras e cozinha-o no azeite 6–7 minutos, até estar bem cozinhado. Junta o alho esmagado no último minuto.', 'Tritura o queijo cottage até ficar liso, ou esmaga-o bem com um garfo.', 'Escorre a massa e as ervilhas e volta a pô-las no tacho, fora do lume. Junta o frango, o cottage, os espinafres e um pouco da água da cozedura e mexe até os espinafres murcharem e o molho envolver a massa. Não deixes ferver depois de juntar o queijo. Termina com o parmesão, pimenta e malagueta.'] }
    ],
    snack: [
      { name: 'Maçã às fatias com dip de iogurte e manteiga de amendoim', time: '3 min', x: ['Uma pitada de canela em pó'],
        steps: ['Mistura a manteiga de amendoim e a canela no iogurte até ficar liso.', 'Corta a maçã às fatias e molha no dip. Umas gotas de limão evitam que as fatias escureçam, se o levares para mais tarde.', 'Queres um lanche maior? Deixa de fora a manteiga de amendoim e come uma segunda maçã: mais ou menos as mesmas calorias e o dobro da comida.'] },
      { name: 'Bolachas de arroz com queijo cottage, húmus e pepino', time: '3 min', x: ['Pimenta preta, flocos de malagueta'],
        steps: ['Barra as bolachas de arroz com uma camada fina de húmus e põe o queijo cottage por cima.', 'Junta o pepino às rodelas, pimenta e flocos de malagueta. Come logo, para as bolachas ficarem estaladiças.'] }
    ],
    veg: [
      { name: 'Arroz frito com tofu e ovo', time: '25 min', x: ['Cebolinho (opcional), gengibre em pó ou fresco'],
        steps: ['Coze o arroz segundo as instruções da embalagem e espalha-o num prato para arrefecer. Arroz do dia anterior ainda é melhor: frita em vez de ficar empapado.', 'Seca o tofu com papel de cozinha e corta-o em cubos pequenos. Aquece 1 c. chá do azeite numa frigideira grande ou wok em lume forte e frita o tofu 5–6 minutos, virando, até ficar dourado. Reserva num prato.', 'Junta o resto do azeite, a cenoura em cubos e as ervilhas e salteia 3 minutos. Junta o alho esmagado e uma pitada de gengibre durante 30 segundos.', 'Afasta tudo para um lado, parte o ovo para a frigideira e mexe-o 1 minuto. Junta o arroz, o tofu e o molho de soja e salteia 2–3 minutos até estar bem quente. Termina com cebolinho picado.'] },
      { name: 'Cuscuz com legumes assados, grão e iogurte de limão', time: '35 min', x: ['1 c. chá de orégãos secos, 1 c. chá de pimentão-doce fumado, sal e pimenta preta'],
        steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta a curgete, o pimento e a cebola-roxa em pedaços e envolve-os num tabuleiro com 1 c. chá do azeite, sal e pimenta. Assa 10 minutos.', 'Seca o grão e envolve-o no resto do azeite, no pimentão-doce e nos orégãos. Junta-o ao tabuleiro com os tomates cherry e assa 18–20 minutos, até o grão ficar estaladiço nas pontas.', 'Entretanto, põe o cuscuz numa taça, junta cerca de 75 ml de água a ferver, tapa e deixa 5 minutos. Solta-o com um garfo. Mistura o iogurte com o sumo de limão e uma pitada de sal.', 'Serve os legumes e o grão sobre o cuscuz, com o iogurte de limão por cima.'] },
      { name: 'Wraps de feijão preto e milho com salsa de tomate', time: '15 min', x: ['1 c. chá de cominhos em pó, 1 c. chá de pimentão-doce fumado, malagueta em pó a gosto, sal'],
        steps: ['Aquece o azeite numa frigideira e cozinha a cebola e o pimento às tiras durante 4 minutos.', 'Junta o feijão preto e as especiarias com 3 c. sopa de água. Cozinha 3 minutos e esmaga cerca de metade do feijão com um garfo, para o recheio ganhar consistência. Junta o milho no último minuto.', 'Corta o tomate em cubos pequenos e tempera com uma pitada de sal: está feita a salsa. Aquece a tortilha numa frigideira sem gordura, 20 segundos de cada lado.', 'Barra a tortilha com o iogurte, junta a alface, o feijão e a salsa e enrola. Para o almoço de amanhã, guarda o recheio numa caixa à parte e enrola o wrap na hora.'] },
      { name: 'Massa cremosa com ervilhas, espinafres e ovo cozido', time: '20 min', x: ['Sal, pimenta preta, uma pitada de flocos de malagueta'],
        steps: ['Coze os ovos 7 minutos, arrefece-os em água fria e descasca-os. Coze a massa segundo as instruções da embalagem e junta as ervilhas nos últimos 3 minutos. Guarda uma caneca da água da cozedura.', 'Aquece o azeite num tacho pequeno e cozinha o alho esmagado 1 minuto, sem deixar alourar.', 'Tritura o queijo cottage com o azeite de alho até ficar liso, ou esmaga-o bem com um garfo.', 'Escorre a massa e as ervilhas e volta a pô-las no tacho, fora do lume. Junta o cottage, os espinafres e um pouco da água da cozedura e mexe até os espinafres murcharem. Não deixes ferver depois de juntar o queijo. Termina com os ovos cortados ao meio, o queijo ralado, pimenta e malagueta.'] }
    ],
    fish: [
      { name: 'Arroz frito com camarão e ovo', time: '20 min', x: ['Cebolinho (opcional), gengibre em pó ou fresco'],
        steps: ['Coze o arroz segundo as instruções da embalagem e espalha-o num prato para arrefecer. Arroz do dia anterior ainda é melhor: frita em vez de ficar empapado.', 'Aquece o azeite numa frigideira grande ou wok em lume forte. Junta a cenoura em cubos e as ervilhas e salteia 3 minutos; depois o alho esmagado e uma pitada de gengibre durante 30 segundos.', 'Junta o camarão e cozinha 2–3 minutos, até ficar rosado por completo.', 'Afasta tudo para um lado, parte o ovo para a frigideira e mexe-o 1 minuto. Junta o arroz e o molho de soja e salteia 2–3 minutos até estar bem quente. Termina com cebolinho picado.'] },
      { name: 'Bacalhau com pesto no forno, legumes assados e cuscuz', time: '35 min', x: ['Sal e pimenta preta, gomo de limão (opcional)'],
        steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta a curgete, o pimento e a cebola-roxa em pedaços, envolve-os no azeite, sal e pimenta num tabuleiro e assa 15 minutos.', 'Junta os tomates cherry ao tabuleiro, põe o bacalhau por cima e barra-o com metade do pesto. Assa 12–15 minutos, até o peixe lascar com facilidade.', 'Entretanto, põe o cuscuz numa taça, junta cerca de 75 ml de água a ferver, tapa e deixa 5 minutos. Solta-o com um garfo.', 'Dilui o resto do pesto com 1 c. sopa de água e envolve-o nos legumes. Serve o bacalhau e os legumes sobre o cuscuz.'] },
      null,
      { name: 'Massa cremosa com atum, ervilhas e espinafres', time: '15 min', x: ['Sal, pimenta preta, uma pitada de flocos de malagueta'],
        steps: ['Coze a massa segundo as instruções da embalagem e junta as ervilhas nos últimos 3 minutos. Guarda uma caneca da água da cozedura.', 'Aquece o azeite num tacho pequeno e cozinha o alho esmagado 1 minuto, sem deixar alourar.', 'Tritura o queijo cottage com o azeite de alho e o sumo de limão até ficar liso, ou esmaga-o bem com um garfo.', 'Escorre a massa e as ervilhas e volta a pô-las no tacho, fora do lume. Junta o cottage, os espinafres e um pouco da água da cozedura e mexe até os espinafres murcharem. Envolve o atum escorrido em lascas grandes e tempera com pimenta e malagueta.'] }
    ],
    pork: [
      null,
      { name: 'Lombinho de porco com pesto no forno, legumes assados e cuscuz', time: '35 min', x: ['Sal e pimenta preta, manjericão fresco (opcional)'],
        steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta a curgete, o pimento e a cebola-roxa em pedaços, envolve-os no azeite, sal e pimenta num tabuleiro e assa 10 minutos.', 'Corta o lombinho em medalhões de 2 cm e envolve-os em metade do pesto. Junta-os ao tabuleiro com os tomates cherry e assa 15–18 minutos, até a carne estar bem cozinhada e os sucos saírem claros.', 'Entretanto, põe o cuscuz numa taça, junta cerca de 75 ml de água a ferver, tapa e deixa 5 minutos. Solta-o com um garfo.', 'Dilui o resto do pesto com 1 c. sopa de água e envolve-o nos legumes. Serve o porco e os legumes sobre o cuscuz.'] },
      null, null
    ]
  },
  recipesFish: [
    { name: 'Caril de camarão, grão e espinafres', time: '25 min', x: ['2 c. chá de caril em pó, coentros ou salsa frescos'],
      steps: ['Coze o arroz segundo as instruções da embalagem.', 'Aquece o azeite num tacho e cozinha a cebola picada durante 5 minutos; junta o alho e o caril em pó durante 1 minuto.', 'Junta o tomate e o grão e deixa cozinhar em lume brando 10 minutos. Junta o camarão e cozinha 3–4 minutos, até ficar rosado por completo.', 'Junta os espinafres até murcharem, retira do lume e envolve o iogurte para ficar cremoso. Serve sobre o arroz com as ervas.'] },
    { name: 'Salmão com limão e alho, batatas e brócolos', time: '35 min', x: ['Orégãos secos, sal e pimenta preta'],
      steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta as batatas ao meio, envolve-as em 1 c. chá do azeite, sal e pimenta e assa 15 minutos.', 'Mistura o resto do azeite com o sumo de limão, o alho esmagado, os orégãos, o sal e a pimenta.', 'Junta os brócolos ao tabuleiro e coloca o salmão por cima. Rega o salmão com a mistura de limão e alho e assa 12–15 minutos, até se desfazer facilmente.', 'Serve com as batatas e os brócolos. Frio, também fica ótimo para o almoço do dia seguinte.'] },
    null, null
  ],
  // Pork versions of the main templates, same order as POOL_PORK in meals.js.
  recipesPork: [
    { name: 'Salteado de porco com soja e mel, com arroz', time: '25 min', x: ['Gengibre em pó ou fresco, flocos de malagueta (opcional)'],
      steps: ['Coze o arroz segundo as instruções da embalagem. Corta o porco em tiras finas, o pimento em tiras e os brócolos em floretes pequenos.', 'Mistura o molho de soja, o mel, o alho esmagado e uma pitada de gengibre com 2 c. sopa de água.', 'Aquece o azeite numa frigideira grande ou wok em lume forte e salteia o porco durante 3–4 minutos, até alourar e ficar bem cozinhado. Retira para um prato.', 'Salteia o pimento e os brócolos durante 3–4 minutos com um pouco de água. Volta a juntar o porco, deita o molho e envolve durante 1 minuto, até ficar brilhante. Serve com o arroz.'] },
    { name: 'Lombinho de porco com pimentão-doce, batatas assadas e feijão-verde', time: '40 min', x: ['1 c. chá de pimentão-doce fumado, orégãos secos, sal e pimenta preta'],
      steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta as batatas ao meio, envolve-as em 1 c. chá do azeite, sal e pimenta e assa 15 minutos.', 'Mistura o resto do azeite com o pimentão-doce, o alho esmagado, os orégãos, o sal e a pimenta e esfrega bem o lombinho.', 'Junta o porco e o feijão-verde ao tabuleiro e assa 20 minutos, até o porco estar bem cozinhado e os sucos saírem claros.', 'Deixa o porco repousar 5 minutos, corta-o às fatias e serve com as batatas e o feijão-verde. O que sobrar fica bem frio no almoço do dia seguinte.'] },
    null,
    { name: 'Porco à grega com cuscuz e molho de iogurte', time: '20 min', x: ['Orégãos secos, sal e pimenta preta, salsa ou hortelã frescas (opcional)'],
      steps: ['Põe o cuscuz numa taça, junta cerca de 80 ml de água a ferver, tapa e deixa repousar 5 minutos. Solta-o com um garfo.', 'Corta o porco em medalhões de 1 cm e envolve-os em metade do sumo de limão, metade do alho esmagado, os orégãos, sal e pimenta.', 'Aquece o azeite numa frigideira em lume médio-forte e cozinha o porco cerca de 3 minutos de cada lado, até estar bem cozinhado.', 'Mistura o iogurte com o resto do alho e uma pitada de sal. Pica o tomate e o pepino e junta-os ao cuscuz com o resto do sumo de limão. Serve o porco sobre o cuscuz, com o molho de iogurte.'] }
  ],
  // Vegetarian pool, same order as POOL_VEG in meals.js.
  recipesVeg: {
    breakfast: [
      null,
      { name: 'Omelete de espinafres e queijo com torrada', time: '12 min', x: ['Sal e pimenta preta'],
        steps: ['Bate os ovos com uma pitada de sal e pimenta.', 'Aquece o azeite numa frigideira antiaderente em lume médio, junta os espinafres e mexe até murcharem, cerca de 1 minuto.', 'Deita os ovos, inclina a frigideira para espalhar e cozinha 2–3 minutos até estarem quase firmes. Rala o queijo sobre metade, dobra e cozinha mais 1 minuto.', 'Serve com o pão torrado.'] },
      null
    ],
    main: [
      { name: 'Caril de tofu, grão e espinafres', time: '30 min', x: ['2 c. chá de caril em pó, coentros ou salsa frescos'],
        steps: ['Coze o arroz segundo as instruções da embalagem. Seca o tofu com papel de cozinha e corta-o em cubos.', 'Aquece o azeite numa frigideira antiaderente e frita o tofu durante 5–6 minutos, virando, até ficar dourado. Retira-o para um prato.', 'Na mesma frigideira, cozinha a cebola picada durante 5 minutos e junta o alho e o caril em pó durante 1 minuto. Junta o tomate e o grão, deixa cozinhar em lume brando 10 minutos e volta a juntar o tofu.', 'Junta os espinafres até murcharem, retira do lume e envolve o iogurte para ficar cremoso. Serve sobre o arroz com as ervas.'] },
      { name: 'Tofu com limão e alho, batatas e brócolos', time: '40 min', x: ['Orégãos secos, sal e pimenta preta'],
        steps: ['Aquece o forno a 200 °C (180 °C com ventilação). Corta as batatas ao meio, envolve-as em 1 c. chá do azeite, sal e pimenta e assa 15 minutos.', 'Seca o tofu com papel de cozinha e corta-o em cubos grandes. Mistura o resto do azeite com o sumo de limão, o alho esmagado, os orégãos, o sal e a pimenta e envolve o tofu nesta mistura.', 'Junta o tofu e os floretes de brócolos ao tabuleiro e assa mais 20–25 minutos, virando o tofu a meio, até ficar dourado nas pontas.', 'Serve com as batatas e os brócolos. Frio, também fica ótimo para o almoço do dia seguinte.'] },
      { name: 'Chili de feijão preto e lentilhas', time: '35 min', x: ['1 c. chá de cominhos em pó, 1 c. chá de pimentão-doce fumado, malagueta em pó q.b.'],
        steps: ['Passa o arroz por água e coze-o em 1,5 vezes o seu volume de água, tapado, durante 12 minutos. Deixa repousar fora do lume.', 'Entretanto, aquece o azeite e cozinha a cebola e o pimento em cubos durante 5 minutos. Junta o alho e as especiarias e cozinha 1 minuto.', 'Junta as lentilhas passadas por água, o tomate e 150 ml de água e deixa cozinhar em lume brando 15 minutos, até as lentilhas estarem macias. Junta o feijão preto e cozinha mais 5 minutos até engrossar, com um pouco de água se for preciso.', 'Serve sobre o arroz com uma colherada de iogurte. Dá bem para cozinhar a dobrar e congelar.'] },
      { name: 'Esparguete cremoso de tomate e espinafres', time: '20 min', x: ['1 c. chá de orégãos secos, sal e pimenta preta'],
        steps: ['Coze o esparguete segundo as instruções da embalagem e guarda uma chávena da água da cozedura.', 'Entretanto, aquece o azeite num tacho, cozinha o alho esmagado durante 1 minuto, junta o tomate e os orégãos e deixa cozinhar em lume brando 8 minutos.', 'Tritura o queijo cottage até ficar liso (ou esmaga-o bem com um garfo). Retira o molho do lume e envolve o queijo cottage e os espinafres até murcharem. Não deixes ferver depois de juntar o queijo.', 'Envolve o esparguete no molho, soltando com um pouco da água da cozedura, e serve com o queijo ralado por cima.'] }
    ],
    snack: null
  }

};
(function (p) { var v = p.recipesVeg; v.breakfast[0] = p.recipes.breakfast[0]; v.breakfast[2] = p.recipes.breakfast[2]; v.snack = p.recipes.snack; })(globalThis.FITME_MEALS_PT);
