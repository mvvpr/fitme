/* FitMe meal plan data. Nutrition per 100 g: [name, kcal, protein, carbs, fat, shopping aisle, grams per piece, "piece|pieces" label, grams per tsp] */
var DB = {
  oats: ['Rolled oats', 379, 13, 67, 7, 'Grains & bread'],
  milk: ['Semi-skimmed milk', 47, 3.4, 4.8, 1.6, 'Dairy & eggs'],
  yog: ['Greek yogurt 0%', 59, 10, 3.6, 0.4, 'Dairy & eggs'],
  egg: ['Eggs', 143, 12.6, 0.7, 9.5, 'Dairy & eggs', 50, 'egg|eggs'],
  eggw: ['Egg whites', 52, 11, 0.7, 0.2, 'Dairy & eggs'],
  cottage: ['Cottage cheese', 98, 11, 3.4, 4.3, 'Dairy & eggs'],
  feta: ['Feta', 264, 14, 4, 21, 'Dairy & eggs'],
  parm: ['Parmesan', 431, 38, 4, 29, 'Dairy & eggs'],
  hummus: ['Hummus', 166, 8, 14, 10, 'Dairy & eggs'],
  bread: ['Wholegrain bread', 247, 13, 41, 3.4, 'Grains & bread', 40, 'slice wholegrain bread|slices wholegrain bread'],
  wrap: ['Wholemeal tortilla wraps', 300, 9, 48, 7, 'Grains & bread', 60, 'wholemeal tortilla wrap|wholemeal tortilla wraps'],
  ricecake: ['Rice cakes', 387, 8, 82, 3, 'Grains & bread', 9, 'rice cake|rice cakes'],
  brice: ['Brown rice (dry)', 362, 7.5, 76, 2.7, 'Grains & bread'],
  basmati: ['Basmati rice (dry)', 350, 8, 78, 0.6, 'Grains & bread'],
  pasta: ['Wholewheat pasta (dry)', 348, 13, 68, 2.5, 'Grains & bread'],
  chicken: ['Chicken breast', 120, 23, 0, 2.6, 'Meat & fish'],
  turkey: ['Turkey mince (5% fat)', 130, 21, 0, 5, 'Meat & fish'],
  beef: ['Lean beef mince (5% fat)', 137, 21, 0, 5, 'Meat & fish'],
  pork: ['Pork tenderloin', 120, 21, 0, 3.5, 'Meat & fish'],
  salmon: ['Salmon fillet', 208, 20, 0, 13, 'Meat & fish'],
  smsalmon: ['Smoked salmon', 117, 18, 0, 4.3, 'Meat & fish'],
  prawns: ['Raw peeled prawns', 85, 20, 0, 0.5, 'Meat & fish'],
  tuna: ['Tuna in water (drained)', 116, 26, 0, 1, 'Pantry'],
  chickpeas: ['Chickpeas (canned, drained)', 139, 7.2, 22.5, 2.6, 'Pantry'],
  lentils: ['Red lentils (dry)', 352, 25, 60, 1, 'Pantry'],
  sweetcorn: ['Sweetcorn (canned, drained)', 86, 3.3, 19, 1.4, 'Pantry'],
  tins: ['Chopped tomatoes (canned)', 21, 1.2, 3.5, 0.2, 'Pantry'],
  passata: ['Passata', 24, 1.3, 4, 0.2, 'Pantry'],
  pesto: ['Basil pesto', 450, 5, 6, 45, 'Pantry'],
  soy: ['Reduced-salt soy sauce', 53, 8, 5, 0.6, 'Pantry', null, null, 6],
  oil: ['Olive oil', 884, 0, 0, 100, 'Pantry', null, null, 4.5],
  honey: ['Honey', 304, 0.3, 82, 0, 'Pantry', null, null, 7],
  pb: ['Peanut butter', 588, 25, 20, 50, 'Pantry'],
  almonds: ['Almonds', 579, 21, 22, 50, 'Pantry'],
  walnuts: ['Walnuts', 654, 15, 14, 65, 'Pantry'],
  cocoa: ['Cocoa powder', 228, 20, 58, 14, 'Pantry'],
  choc: ['Dark chocolate (70%+)', 600, 8, 36, 43, 'Pantry'],
  banana: ['Bananas', 89, 1.1, 23, 0.3, 'Fruit & veg', 120, 'banana|bananas'],
  apple: ['Apples', 52, 0.3, 14, 0.2, 'Fruit & veg', 180, 'apple|apples'],
  kiwi: ['Kiwis', 61, 1.1, 15, 0.5, 'Fruit & veg', 75, 'kiwi|kiwis'],
  berries: ['Mixed berries (fresh or frozen)', 50, 0.8, 12, 0.3, 'Fruit & veg'],
  avocado: ['Avocado', 160, 2, 9, 15, 'Fruit & veg'],
  lemon: ['Lemon juice', 22, 0.4, 7, 0.2, 'Fruit & veg'],
  spinach: ['Baby spinach', 23, 2.9, 3.6, 0.4, 'Fruit & veg'],
  leaves: ['Mixed salad leaves', 17, 1.5, 3, 0.2, 'Fruit & veg'],
  rocket: ['Rocket', 25, 2.6, 3.7, 0.7, 'Fruit & veg'],
  broccoli: ['Broccoli', 34, 2.8, 7, 0.4, 'Fruit & veg'],
  greenbeans: ['Green beans', 31, 1.8, 7, 0.2, 'Fruit & veg'],
  cherry: ['Cherry tomatoes', 18, 0.9, 3.9, 0.2, 'Fruit & veg'],
  tomato: ['Tomatoes', 18, 0.9, 3.9, 0.2, 'Fruit & veg', 120, 'tomato|tomatoes'],
  cucumber: ['Cucumber', 15, 0.7, 3.6, 0.1, 'Fruit & veg'],
  pepper: ['Bell peppers', 31, 1, 6, 0.3, 'Fruit & veg', 150, 'bell pepper|bell peppers'],
  courgette: ['Courgettes', 17, 1.2, 3.1, 0.3, 'Fruit & veg', 200, 'courgette|courgettes'],
  carrot: ['Carrots', 41, 0.9, 10, 0.2, 'Fruit & veg', 70, 'carrot|carrots'],
  onion: ['Onions', 40, 1.1, 9, 0.1, 'Fruit & veg', 110, 'onion|onions'],
  redonion: ['Red onions', 40, 1.1, 9, 0.1, 'Fruit & veg', 110, 'red onion|red onions'],
  garlic: ['Garlic', 149, 6.4, 33, 0.5, 'Fruit & veg', 5, 'garlic clove|garlic cloves'],
  potato: ['Baby potatoes', 77, 2, 17, 0.1, 'Fruit & veg'],
  couscous: ['Wholewheat couscous (dry)', 362, 12, 72, 1.5, 'Grains & bread'],
  peas: ['Frozen peas', 81, 5.4, 14, 0.4, 'Fruit & veg'],
  whey: ['Whey protein powder', 400, 80, 8, 6, 'Pantry'],
  blackbeans: ['Black beans (canned, drained)', 110, 7, 17, 0.6, 'Pantry'],
  cod: ['Cod fillet (fresh or frozen)', 82, 18, 0, 0.7, 'Meat & fish'],
  sweetpot: ['Sweet potatoes', 86, 1.6, 20, 0.1, 'Fruit & veg']
};

/* Ingredient lines: [key, qty, unit] with unit g | ml | pc | tsp | tbsp, or ['~', 'unscaled extra'] for herbs, spices and seasoning. */
var RECIPES = {
  breakfast: [
    { name: 'Berry overnight oats', time: '5 min + overnight',
      ing: [['oats', 50, 'g'], ['milk', 150, 'ml'], ['yog', 150, 'g'], ['berries', 80, 'g'], ['honey', 1, 'tsp'], ['~', 'Pinch of ground cinnamon']],
      steps: ['In a jar or bowl, stir together the oats, milk, yogurt and cinnamon.', 'Cover and refrigerate overnight (at least 4 hours) so the oats soften.', 'In the morning, stir, loosen with a splash of milk if it is too thick, and top with the berries and honey.'] },
    { name: 'Spinach & feta omelette with toast', time: '12 min',
      ing: [['egg', 2, 'pc'], ['eggw', 100, 'g'], ['spinach', 60, 'g'], ['feta', 30, 'g'], ['cherry', 80, 'g'], ['bread', 1, 'pc'], ['oil', 1, 'tsp'], ['~', 'Salt and black pepper']],
      steps: ['Whisk the eggs and egg whites with a pinch of salt and pepper.', 'Heat the oil in a non-stick pan over medium heat, add the spinach and stir until wilted, about 1 minute.', 'Pour in the eggs, tilt to spread and cook 2–3 minutes until almost set. Crumble the feta over one half, fold and cook 1 minute more.', 'Toast the bread and serve with the omelette and halved cherry tomatoes.'] },
    { name: 'Greek yogurt crunch bowl', time: '5 min',
      ing: [['yog', 200, 'g'], ['berries', 100, 'g'], ['oats', 30, 'g'], ['walnuts', 15, 'g'], ['honey', 1, 'tsp'], ['~', 'Pinch of ground cinnamon']],
      steps: ['Toast the oats in a dry pan over medium heat for 2–3 minutes, stirring, until golden. Let them cool slightly.', 'Spoon the yogurt into a bowl and top with the berries, toasted oats and chopped walnuts.', 'Drizzle with the honey and dust with cinnamon.'] },
    { name: 'Smashed avocado & egg toast', time: '10 min',
      ing: [['bread', 2, 'pc'], ['avocado', 50, 'g'], ['egg', 2, 'pc'], ['cherry', 60, 'g'], ['lemon', 5, 'ml'], ['~', 'Chilli flakes, salt and black pepper']],
      steps: ['Poach the eggs in gently simmering water for 3 minutes, or fry them in a dry non-stick pan.', 'Meanwhile, toast the bread and mash the avocado with the lemon juice, salt and pepper.', 'Spread the avocado over the toast, top with the eggs and sliced cherry tomatoes, and finish with chilli flakes.'] },
    { name: 'Banana protein pancakes', time: '15 min',
      ing: [['oats', 50, 'g'], ['banana', 1, 'pc'], ['egg', 1, 'pc'], ['eggw', 100, 'g'], ['whey', 15, 'g'], ['berries', 60, 'g'], ['oil', 1, 'tsp'], ['~', '½ tsp baking powder, pinch of ground cinnamon']],
      steps: ['Blend the oats into a coarse flour, then add the banana, egg, egg whites, protein powder, baking powder and cinnamon and blend until smooth. No blender? Mash the banana well and whisk everything together.', 'Heat a non-stick pan over medium heat and brush with a little of the oil.', 'Pour in small rounds of batter (about 3 tbsp each). Cook 2 minutes until bubbles appear, flip and cook 1 minute more. Repeat with the rest.', 'Stack the pancakes and top with the berries.'] },
    { name: 'Smoked salmon scrambled eggs on toast', time: '10 min',
      ing: [['egg', 2, 'pc'], ['eggw', 60, 'g'], ['smsalmon', 50, 'g'], ['spinach', 40, 'g'], ['bread', 1, 'pc'], ['oil', 1, 'tsp'], ['~', 'Fresh chives or dill, black pepper']],
      steps: ['Whisk the eggs and egg whites with black pepper.', 'Heat the oil in a non-stick pan over low–medium heat, wilt the spinach, then pour in the eggs.', 'Stir slowly for 2–3 minutes and take the pan off the heat while the eggs are still soft.', 'Serve on the toast, topped with the smoked salmon and herbs.'] },
    { name: 'Peanut butter banana protein porridge', time: '8 min',
      ing: [['oats', 50, 'g'], ['milk', 200, 'ml'], ['whey', 20, 'g'], ['banana', 0.5, 'pc'], ['pb', 10, 'g'], ['~', 'Pinch of ground cinnamon']],
      steps: ['Simmer the oats and milk in a small pan over medium heat for 4–5 minutes, stirring, until thick and creamy.', 'Take off the heat and stir in the protein powder, adding a splash of water or milk if it gets too thick.', 'Top with the sliced banana, peanut butter and cinnamon.'] }
  ],
  lunch: [
    { name: 'Mediterranean chicken couscous bowl', time: '20 min',
      ing: [['chicken', 130, 'g'], ['couscous', 60, 'g'], ['cucumber', 80, 'g'], ['cherry', 80, 'g'], ['redonion', 30, 'g'], ['feta', 25, 'g'], ['oil', 2, 'tsp'], ['lemon', 15, 'ml'], ['~', 'Dried oregano, salt and black pepper']],
      steps: ['Put the couscous in a bowl, pour over the same volume of boiling water, cover and leave for 5 minutes. Fluff with a fork.', 'Season the chicken with oregano, salt and pepper. Cook in a hot pan with 1 tsp of the oil for 5–6 minutes per side until cooked through, then slice.', 'Dice the cucumber, halve the tomatoes and finely slice the red onion.', 'Whisk the rest of the oil with the lemon juice, toss with the couscous and vegetables, and top with the chicken and crumbled feta.'] },
    { name: 'Tuna, chickpea & sweetcorn salad', time: '10 min',
      ing: [['tuna', 110, 'g'], ['chickpeas', 120, 'g'], ['sweetcorn', 40, 'g'], ['leaves', 50, 'g'], ['cucumber', 80, 'g'], ['tomato', 1, 'pc'], ['redonion', 20, 'g'], ['oil', 2, 'tsp'], ['lemon', 15, 'ml'], ['~', 'Fresh parsley, salt and black pepper']],
      steps: ['Rinse and drain the chickpeas and sweetcorn.', 'Chop the cucumber and tomato and finely slice the red onion.', 'Whisk the oil, lemon juice, salt and pepper in a large bowl, then add the vegetables, chickpeas and sweetcorn and toss.', 'Serve over the salad leaves, topped with the flaked tuna and parsley.'] },
    { name: 'Turkey taco wraps', time: '20 min',
      ing: [['turkey', 120, 'g'], ['wrap', 1, 'pc'], ['pepper', 0.5, 'pc'], ['onion', 0.25, 'pc'], ['blackbeans', 50, 'g'], ['yog', 30, 'g'], ['leaves', 30, 'g'], ['oil', 1, 'tsp'], ['~', '1 tsp smoked paprika, ½ tsp ground cumin, salt']],
      steps: ['Heat the oil in a pan over medium-high heat. Add the diced onion and pepper and cook for 4 minutes until softened.', 'Add the mince, paprika, cumin and salt. Cook for 6–8 minutes, breaking it up, until browned and cooked through.', 'Stir in the black beans with a splash of water and warm through for 2 minutes.', 'Warm the wrap, fill with the leaves and mince mixture, add the yogurt and roll up.'] },
    { name: 'Red lentil & spinach soup', time: '30 min',
      ing: [['lentils', 70, 'g'], ['carrot', 1, 'pc'], ['onion', 0.5, 'pc'], ['garlic', 1, 'pc'], ['tins', 200, 'g'], ['spinach', 40, 'g'], ['oil', 1, 'tsp'], ['yog', 50, 'g'], ['bread', 1, 'pc'], ['~', '1 tsp ground cumin, about 350 ml low-salt vegetable stock']],
      steps: ['Heat the oil in a saucepan, add the chopped onion, carrot and garlic and cook gently for 5 minutes.', 'Stir in the cumin, then add the rinsed lentils, tomatoes and stock. Simmer for 18–20 minutes until the lentils break down.', 'Stir in the spinach until wilted. Blend part of the soup for a thicker texture if you like, and season.', 'Serve topped with the yogurt, with the bread on the side.'] },
    { name: 'Prawn, avocado & rice bowl', time: '20 min',
      ing: [['prawns', 150, 'g'], ['basmati', 60, 'g'], ['peas', 60, 'g'], ['sweetcorn', 40, 'g'], ['cucumber', 60, 'g'], ['avocado', 40, 'g'], ['carrot', 0.5, 'pc'], ['soy', 1, 'tbsp'], ['lemon', 10, 'ml'], ['~', 'Spring onion or fresh coriander to garnish']],
      steps: ['Rinse the rice and cook in 1½ times its volume of water, covered, for 12 minutes, adding the frozen peas for the last 3 minutes. Rest for 5 minutes off the heat.', 'Cook the prawns (thawed if frozen) in a hot non-stick pan for 2–3 minutes until pink.', 'Slice the cucumber and avocado and grate the carrot. Mix the soy sauce with the lemon juice.', 'Arrange everything over the rice with the sweetcorn, drizzle with the dressing and garnish.'] },
    { name: 'Chicken pesto pasta salad', time: '20 min',
      ing: [['pasta', 70, 'g'], ['chicken', 120, 'g'], ['pesto', 15, 'g'], ['cherry', 100, 'g'], ['rocket', 30, 'g'], ['parm', 10, 'g'], ['~', 'Salt and black pepper']],
      steps: ['Cook the pasta in salted boiling water according to the pack, then drain and rinse under cold water.', 'Season the chicken and cook in a hot non-stick pan for 5–6 minutes per side until cooked through. Slice.', 'Toss the pasta with the pesto, halved tomatoes and rocket.', 'Top with the chicken and grated parmesan. It keeps well in the fridge as a packed lunch.'] },
    { name: 'Chickpea shakshuka', time: '25 min',
      ing: [['egg', 3, 'pc'], ['tins', 250, 'g'], ['pepper', 1, 'pc'], ['onion', 0.5, 'pc'], ['garlic', 1, 'pc'], ['chickpeas', 80, 'g'], ['feta', 20, 'g'], ['oil', 1, 'tsp'], ['bread', 1, 'pc'], ['~', '1 tsp ground cumin, 1 tsp smoked paprika, fresh parsley']],
      steps: ['Heat the oil in a frying pan, add the sliced onion and pepper and cook for 6 minutes until soft. Add the garlic, cumin and paprika for 1 minute.', 'Pour in the tomatoes and chickpeas and simmer for 8–10 minutes until thickened. Season.', 'Make a hollow in the sauce for each egg, crack them in, cover and cook on low for 5–7 minutes until the whites are set.', 'Scatter with the feta and parsley and serve with the bread.'] }
  ],
  snack: [
    { name: 'Boiled eggs & cherry tomatoes', time: '10 min',
      ing: [['egg', 2, 'pc'], ['cherry', 100, 'g'], ['~', 'Salt, black pepper, pinch of paprika']],
      steps: ['Boil the eggs for 8–9 minutes, then cool them in cold water and peel. You can cook a batch for the week.', 'Halve the eggs, season with salt, pepper and paprika, and serve with the tomatoes.'] },
    { name: 'Berry Greek yogurt', time: '2 min',
      ing: [['yog', 150, 'g'], ['berries', 60, 'g'], ['~', 'Pinch of ground cinnamon']],
      steps: ['Spoon the yogurt into a bowl.', 'Top with the berries and a pinch of cinnamon.'] },
    { name: 'Cottage cheese & cucumber rice cakes', time: '5 min',
      ing: [['ricecake', 2, 'pc'], ['cottage', 100, 'g'], ['cucumber', 40, 'g'], ['~', 'Black pepper, chilli flakes']],
      steps: ['Spread the cottage cheese over the rice cakes.', 'Top with thinly sliced cucumber, black pepper and chilli flakes.'] },
    { name: 'Hummus & veggie sticks', time: '5 min',
      ing: [['hummus', 50, 'g'], ['carrot', 1, 'pc'], ['pepper', 0.5, 'pc'], ['cucumber', 60, 'g']],
      steps: ['Cut the carrot, pepper and cucumber into sticks.', 'Serve with the hummus for dipping.'] },
    { name: 'Chocolate protein yogurt', time: '3 min',
      ing: [['yog', 150, 'g'], ['cocoa', 6, 'g'], ['honey', 1, 'tsp'], ['berries', 30, 'g']],
      steps: ['Whisk the cocoa and honey into the yogurt until smooth and mousse-like.', 'Top with the berries. Good as an after-dinner dessert.'] },
    { name: 'Apple & peanut butter', time: '2 min',
      ing: [['apple', 1, 'pc'], ['pb', 15, 'g']],
      steps: ['Core and slice the apple.', 'Serve with the peanut butter for dipping.'] },
    { name: 'Dark chocolate, almonds & kiwi', time: '2 min',
      ing: [['almonds', 15, 'g'], ['choc', 10, 'g'], ['kiwi', 1, 'pc']],
      steps: ['Peel and slice the kiwi (or eat it halved with a teaspoon).', 'Serve with the almonds and a square of dark chocolate. A light after-dinner treat.'] }
  ],
  dinner: [
    { name: 'Lemon-garlic salmon with potatoes & broccoli', time: '30 min',
      ing: [['salmon', 130, 'g'], ['potato', 200, 'g'], ['broccoli', 120, 'g'], ['oil', 1, 'tsp'], ['lemon', 15, 'ml'], ['garlic', 1, 'pc'], ['~', 'Fresh dill or parsley, salt and black pepper']],
      steps: ['Heat the oven to 200°C (180°C fan). Halve the potatoes, toss with the oil, salt and pepper and roast for 15 minutes.', 'Add the salmon to the tray, skin side down. Mix the lemon juice with the crushed garlic and spoon it over the fish.', 'Add the broccoli florets around the salmon and roast for 12–15 minutes more, until the salmon flakes easily.', 'Finish with fresh herbs.'] },
    { name: 'Chicken & veg stir-fry with rice', time: '20 min',
      ing: [['chicken', 140, 'g'], ['basmati', 60, 'g'], ['pepper', 1, 'pc'], ['broccoli', 80, 'g'], ['carrot', 0.5, 'pc'], ['soy', 1, 'tbsp'], ['garlic', 1, 'pc'], ['oil', 1, 'tsp'], ['~', 'Fresh ginger (optional), spring onion, chilli flakes']],
      steps: ['Rinse the rice and cook in 1½ times its volume of water, covered, for 12 minutes. Rest off the heat.', 'Slice the chicken into strips. Heat the oil in a large pan or wok over high heat and stir-fry the chicken for 5 minutes until cooked.', 'Add the garlic (and ginger, if using) and the sliced vegetables and stir-fry for 3–4 minutes, keeping them crisp.', 'Add the soy sauce with a splash of water and toss for 1 minute. Serve over the rice with spring onion and chilli flakes.'] },
    { name: 'Lean beef & black bean chilli', time: '35 min',
      ing: [['beef', 130, 'g'], ['blackbeans', 80, 'g'], ['tins', 200, 'g'], ['onion', 0.5, 'pc'], ['pepper', 0.5, 'pc'], ['garlic', 1, 'pc'], ['brice', 50, 'g'], ['oil', 1, 'tsp'], ['yog', 30, 'g'], ['~', '1 tsp ground cumin, 1 tsp smoked paprika, chilli powder to taste']],
      steps: ['Cook the rice in plenty of boiling water for 25–30 minutes, then drain.', 'Meanwhile, heat the oil and cook the diced onion and pepper for 5 minutes. Add the garlic and spices for 1 minute.', 'Add the beef and brown for 5 minutes, breaking it up. Stir in the tomatoes and black beans and simmer for 15 minutes until thick.', 'Serve over the rice with a spoonful of yogurt. It doubles well for batch cooking.'] },
    { name: 'Lemon cod with rice & green beans', time: '25 min',
      ing: [['cod', 170, 'g'], ['basmati', 55, 'g'], ['greenbeans', 120, 'g'], ['cherry', 80, 'g'], ['oil', 2, 'tsp'], ['lemon', 15, 'ml'], ['garlic', 1, 'pc'], ['~', 'Fresh parsley, salt and black pepper']],
      steps: ['Rinse the rice and cook in 1½ times its volume of water, covered, for 12 minutes. Rest off the heat.', 'Heat the oven to 200°C (180°C fan). Put the cod (thawed if frozen) and tomatoes on a lined tray, drizzle with half the oil and the lemon juice, add the sliced garlic and season. Bake for 12–15 minutes until the fish flakes.', 'Boil the green beans (fresh or frozen) for 4–5 minutes and toss with the rest of the oil.', 'Serve the cod over the rice with the beans and roasted tomatoes, scattered with parsley.'] },
    { name: 'Turkey meatballs with wholewheat spaghetti', time: '35 min',
      ing: [['turkey', 140, 'g'], ['passata', 200, 'g'], ['pasta', 60, 'g'], ['onion', 0.25, 'pc'], ['garlic', 1, 'pc'], ['spinach', 50, 'g'], ['parm', 10, 'g'], ['oil', 1, 'tsp'], ['~', '1 tsp dried oregano, salt and black pepper']],
      steps: ['Mix the mince with half the grated garlic, the oregano, salt and pepper, and roll into small meatballs.', 'Heat the oil in a pan and brown the meatballs on all sides for 5 minutes. Add the chopped onion and the rest of the garlic for 2 minutes.', 'Pour in the passata, cover and simmer for 12 minutes until the meatballs are cooked through. Stir in the spinach to wilt.', 'Meanwhile, cook the spaghetti according to the pack. Serve with the meatballs and sauce, topped with parmesan.'] },
    { name: 'Pork tenderloin & sweet potato tray bake', time: '35 min',
      ing: [['pork', 140, 'g'], ['sweetpot', 200, 'g'], ['redonion', 0.5, 'pc'], ['pepper', 1, 'pc'], ['courgette', 0.5, 'pc'], ['garlic', 1, 'pc'], ['oil', 2, 'tsp'], ['~', '1 tsp smoked paprika, 1 tsp dried thyme, salt and black pepper']],
      steps: ['Heat the oven to 200°C (180°C fan). Cut the sweet potato into chunks and the onion, pepper and courgette into wedges.', 'Toss the vegetables with most of the oil, the paprika, thyme, crushed garlic and seasoning, and roast for 15 minutes.', 'Rub the pork with the rest of the oil and season. Sear in a hot pan for 1 minute per side, add to the tray and roast for 15–18 minutes until just cooked (63°C inside).', 'Rest the pork for 5 minutes, slice and serve with the vegetables.'] },
    { name: 'Chicken, chickpea & spinach curry', time: '30 min',
      ing: [['chicken', 130, 'g'], ['chickpeas', 80, 'g'], ['tins', 200, 'g'], ['spinach', 60, 'g'], ['onion', 0.5, 'pc'], ['garlic', 1, 'pc'], ['yog', 60, 'g'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['~', '2 tsp curry powder, fresh coriander or parsley']],
      steps: ['Cook the rice according to the pack. Cut the chicken into bite-sized pieces.', 'Heat the oil in a pan, cook the chopped onion for 5 minutes, then add the garlic and curry powder for 1 minute.', 'Add the chicken and cook for 3 minutes, then add the tomatoes and chickpeas and simmer for 12 minutes until the chicken is cooked through.', 'Stir in the spinach until wilted, take off the heat and stir in the yogurt for a creamy finish. Serve over the rice with the herbs.'] }
  ]
};

/* Shared meal-plan logic: used by the FitMe page (classic script) and the Netlify Functions (side-effect import). */
var SLOTS = [
  { key: 'breakfast', label: 'Breakfast', share: 0.25 },
  { key: 'lunch', label: 'Lunch', share: 0.32 },
  { key: 'snack', label: 'Snack · mid-afternoon or after dinner', share: 0.12 },
  { key: 'dinner', label: 'Dinner', share: 0.31 }
];
var DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function mClamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
function lineGrams(l) {
  var d = DB[l[0]], q = l[1], u = l[2];
  return u === 'pc' ? q * d[6] : u === 'tsp' ? q * (d[8] || 5) : u === 'tbsp' ? q * 3 * (d[8] || 5) : q;
}
function frac(q) {
  var w = Math.floor(q + 1e-9), r = Math.round((q - w) * 4) / 4;
  if (r === 1) { w += 1; r = 0; }
  var f = r === 0.25 ? '¼' : r === 0.5 ? '½' : r === 0.75 ? '¾' : '';
  return (w ? String(w) : '') + f || '0';
}
function scaleLine(l, f) {
  var u = l[2], q = l[1] * f;
  if (u === 'pc') {
    if (['egg', 'garlic', 'ricecake', 'wrap', 'bread'].indexOf(l[0]) >= 0) q = Math.max(1, Math.round(q));
    else q = Math.max(0.25, Math.round(q * 4) / 4);
  } else if (u === 'tsp' || u === 'tbsp') q = Math.max(0.5, Math.round(q * 2) / 2);
  else q = q < 20 ? Math.max(1, Math.round(q)) : Math.round(q / 5) * 5;
  return [l[0], q, u];
}
function ptData(lang) { return lang === 'pt' && globalThis.FITME_MEALS_PT ? globalThis.FITME_MEALS_PT : null; }
function ingName(key, lang) { var pt = ptData(lang); return pt && pt.db[key] ? pt.db[key][0] : DB[key][0]; }
function pieceLabels(key, lang) { var pt = ptData(lang); return ((pt && pt.db[key] && pt.db[key][1]) || DB[key][7] || '|').split('|'); }
function amountText(l, imperial, lang) {
  var q = l[1], u = l[2], pt = ptData(lang);
  var loc = pt ? 'pt-PT' : 'en', dec = function (v) { return v.toLocaleString(loc); };
  var name = ingName(l[0], lang).toLowerCase();
  if (u === 'pc') { var lab = pieceLabels(l[0], lang); return { q: frac(q), n: q > 1 ? lab[1] : lab[0] }; }
  if (u === 'tsp' || u === 'tbsp') return { q: frac(q) + ' ' + (pt ? pt.units[u] : u), n: name };
  if (imperial) {
    if (u === 'ml') return { q: dec(Math.round(q / 29.57 * 4) / 4) + ' fl oz', n: name };
    return { q: dec(q < 15 ? Math.round(q / 28.35 * 8) / 8 : Math.round(q / 28.35 * 4) / 4) + ' oz', n: name };
  }
  return { q: dec(Math.round(q)) + ' ' + u, n: name };
}
function nutrition(lines) {
  var t = { k: 0, p: 0, c: 0, f: 0 };
  lines.forEach(function (l) {
    if (l[0] === '~') return;
    var d = DB[l[0]], g = lineGrams(l) / 100;
    t.k += g * d[1]; t.p += g * d[2]; t.c += g * d[3]; t.f += g * d[4];
  });
  return t;
}
// Protein-rich = at least 35% of the ingredient's calories come from protein (meat, fish, eggs, egg whites, Greek yogurt, cottage cheese, whey...).
function isProteinRich(key) { var d = DB[key]; return d && d[1] > 0 && (d[2] * 4) / d[1] >= 0.35; }
var PROTEIN_PER_KG = 1.5; // grams per kg of goal weight
function proteinTarget(goalKg) { return Math.round(PROTEIN_PER_KG * goalKg); }
// Build a day's four meals for an intake of T kcal. If P (grams of protein) is given and the
// calorie-scaled day falls short, protein-rich ingredients are scaled up and the rest scaled down
// so the day keeps its calories and reaches P.
function buildDay(i, T, P, lang) {
  var meals = SLOTS.map(function (slot) {
    var rec = RECIPES[slot.key][i];
    var base = nutrition(rec.ing);
    return { slot: slot, rec: rec, f: mClamp((T * slot.share) / base.k, 0.5, 2.2) };
  });
  var a = 1, b = 1;
  if (P) {
    P = P * 1.04; // headroom for rounding portions to kitchen-friendly amounts
    var Kp = 0, Ko = 0, Pp = 0, Po = 0;
    meals.forEach(function (m) {
      m.rec.ing.forEach(function (l) {
        if (l[0] === '~') return;
        var d = DB[l[0]], g = lineGrams(l) * m.f / 100;
        if (isProteinRich(l[0])) { Kp += g * d[1]; Pp += g * d[2]; } else { Ko += g * d[1]; Po += g * d[2]; }
      });
    });
    if (Pp + Po < P && Kp > 0 && Ko > 0) {
      var det = Kp * Po - Ko * Pp;
      if (det !== 0) { a = (T * Po - Ko * P) / det; b = (Kp * P - Pp * T) / det; }
      a = mClamp(a, 1, 2.2);
      b = mClamp((T - a * Kp) / Ko, 0.6, 1);
    }
  }
  var pt = ptData(lang);
  return meals.map(function (m) {
    var lines = m.rec.ing.map(function (l) { return l[0] === '~' ? l : scaleLine(l, m.f * (isProteinRich(l[0]) ? a : b)); });
    var out = { slot: m.slot, rec: m.rec, lines: lines, n: nutrition(lines) };
    if (pt) {
      var tr = pt.recipes[m.slot.key][i], xi = 0;
      out.rec = { name: tr.name, time: tr.time, steps: tr.steps, ing: m.rec.ing };
      out.slot = { key: m.slot.key, label: pt.slots[m.slot.key], share: m.slot.share };
      out.lines = lines.map(function (l) { return l[0] === '~' ? ['~', tr.x[xi++] || l[1]] : l; });
    }
    return out;
  });
}
// Weekly shopping list for the 7-day plan at intake T and protein target P.
// Returns { groups: [{ aisle, items: [{ n, q }] }], extras } with names, units and numbers in the given language.
var AISLES = ['Fruit & veg', 'Meat & fish', 'Dairy & eggs', 'Grains & bread', 'Pantry'];
function shoppingList(T, P, lang, imperial) {
  var pt = ptData(lang), loc = pt ? 'pt-PT' : 'en';
  var W = pt ? { slice: ['fatia', 'fatias'], clove: ['dente', 'dentes'], tsp: 'c. chá', tbsp: 'c. sopa' } : { slice: ['slice', 'slices'], clove: ['clove', 'cloves'], tsp: 'tsp', tbsp: 'tbsp' };
  var num = function (v) { return v.toLocaleString(loc); };
  var totals = {}, extras = {};
  for (var i = 0; i < 7; i++) buildDay(i, T, P, lang).forEach(function (m) {
    m.lines.forEach(function (l) {
      if (l[0] === '~') { extras[l[1]] = 1; return; }
      var t = totals[l[0]] || (totals[l[0]] = { g: 0, pc: 0, tsp: 0, ml: 0 });
      if (l[2] === 'pc') t.pc += l[1];
      else if (l[2] === 'tsp') t.tsp += l[1];
      else if (l[2] === 'tbsp') t.tsp += l[1] * 3;
      else if (l[2] === 'ml') t.ml += l[1];
      else t.g += l[1];
    });
  });
  function big(v, u, k) { return v >= 1000 ? num(parseFloat((Math.ceil(v / 50) * 50 / 1000).toFixed(2))) + ' ' + k : num(Math.ceil(v / 10) * 10) + ' ' + u; }
  var byAisle = {};
  Object.keys(totals).forEach(function (k) {
    var d = DB[k], t = totals[k], parts = [];
    if (t.pc && t.g) { t.g += t.pc * d[6]; t.pc = 0; }
    if (t.pc) {
      var n = (d[5] === 'Fruit & veg' || k === 'egg') ? Math.ceil(t.pc - 1e-9) : Math.ceil(t.pc * 2) / 2;
      var unit = k === 'bread' ? ' ' + W.slice[n === 1 ? 0 : 1] : k === 'garlic' ? ' ' + W.clove[n === 1 ? 0 : 1] : '';
      parts.push(frac(n) + unit);
    }
    if (t.g) parts.push(imperial ? num(Math.ceil(t.g / 28.35 * 2) / 2) + ' oz' : big(t.g, 'g', 'kg'));
    if (t.ml) parts.push(imperial ? num(Math.ceil(t.ml / 29.57 * 2) / 2) + ' fl oz' : big(t.ml, 'ml', 'l'));
    if (t.tsp) parts.push(t.tsp >= 3 ? frac(Math.ceil(t.tsp / 3 * 2) / 2) + ' ' + W.tbsp : frac(t.tsp) + ' ' + W.tsp);
    (byAisle[d[5]] || (byAisle[d[5]] = [])).push({ n: ingName(k, lang), q: parts.join(' + ') });
  });
  var groups = AISLES.filter(function (a) { return byAisle[a]; }).map(function (a) {
    return { aisle: pt ? pt.aisles[a] : a, items: byAisle[a].sort(function (x, y) { return x.n.localeCompare(y.n, loc); }) };
  });
  var ex;
  if (pt) ex = pt.shopExtras;
  else {
    var seen = {}, list = [];
    Object.keys(extras).forEach(function (e) {
      e.split(/,| and /).forEach(function (x) {
        x = x.trim().replace(/^(about\s+)?(\d+|½|¼)\s*(tsp|tbsp|ml)?\s*/i, '').replace(/^pinch of\s+/i, '').replace(/\s*\(optional\)/i, '').replace(/\s+to (taste|garnish)$/i, '').trim();
        if (!x || seen[x.toLowerCase()]) return;
        seen[x.toLowerCase()] = 1; list.push(x.charAt(0).toUpperCase() + x.slice(1));
      });
    });
    ex = list.sort().join(', ');
  }
  return { groups: groups, extras: ex };
}
function dayTotals(meals) {
  return meals.reduce(function (a, m) { a.k += m.n.k; a.p += m.n.p; a.c += m.n.c; a.f += m.n.f; return a; }, { k: 0, p: 0, c: 0, f: 0 });
}
globalThis.FITME_MEALS = { DB: DB, RECIPES: RECIPES, SLOTS: SLOTS, DAY_NAMES: DAY_NAMES, lineGrams: lineGrams, frac: frac, scaleLine: scaleLine, amountText: amountText, nutrition: nutrition, buildDay: buildDay, dayTotals: dayTotals, ingName: ingName, pieceLabels: pieceLabels, ptData: ptData, proteinTarget: proteinTarget, PROTEIN_PER_KG: PROTEIN_PER_KG, shoppingList: shoppingList };
