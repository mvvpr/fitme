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
  sweetpot: ['Sweet potatoes', 86, 1.6, 20, 0.1, 'Fruit & veg'],
  tofu: ['Firm tofu', 144, 15.5, 2.5, 8.5, 'Dairy & eggs'],
  vparm: ['Vegetarian hard cheese (parmesan-style)', 410, 33, 0.5, 30, 'Dairy & eggs']
};

/* Ingredient lines: [key, qty, unit] with unit g | ml | pc | tsp | tbsp, or ['~', 'unscaled extra'] for herbs, spices and seasoning. */
// The recipe pool: 3 breakfasts, 4 mains that work as lunch or dinner, and 2 snacks.
var POOL = {
  breakfast: [
    { name: 'Berry overnight oats', img: 'berry-overnight-oats', time: '5 min + overnight',
      ing: [['oats', 50, 'g'], ['milk', 150, 'ml'], ['yog', 150, 'g'], ['berries', 80, 'g'], ['honey', 1, 'tsp'], ['~', 'Pinch of ground cinnamon']],
      steps: ['In a jar or bowl, stir together the oats, milk, yogurt and cinnamon.', 'Cover and refrigerate overnight (at least 4 hours) so the oats soften.', 'In the morning, stir, loosen with a splash of milk if it is too thick, and top with the berries and honey.'] },
    { name: 'Spinach & parmesan omelette with toast', img: 'spinach-parmesan-omelette', time: '12 min',
      ing: [['egg', 3, 'pc'], ['spinach', 60, 'g'], ['parm', 10, 'g'], ['bread', 1, 'pc'], ['oil', 1, 'tsp'], ['~', 'Salt and black pepper']],
      steps: ['Whisk the eggs with a pinch of salt and pepper.', 'Heat the oil in a non-stick pan over medium heat, add the spinach and stir until wilted, about 1 minute.', 'Pour in the eggs, tilt to spread and cook 2–3 minutes until almost set. Grate the parmesan over one half, fold and cook 1 minute more.', 'Serve with the toasted bread.'] },
    { name: 'Banana protein pancakes', img: 'banana-protein-pancakes', time: '15 min',
      ing: [['oats', 50, 'g'], ['banana', 1, 'pc'], ['egg', 2, 'pc'], ['yog', 100, 'g'], ['berries', 60, 'g'], ['oil', 1, 'tsp'], ['~', '½ tsp baking powder, pinch of ground cinnamon']],
      steps: ['Blend the oats into a coarse flour, then add the banana, eggs, baking powder and cinnamon and blend until smooth. No blender? Mash the banana well and whisk everything together.', 'Heat a non-stick pan over medium heat and brush with a little of the oil.', 'Pour in small rounds of batter (about 3 tbsp each). Cook 2 minutes until bubbles appear, flip and cook 1 minute more. Repeat with the rest.', 'Stack the pancakes and top with the yogurt and berries.'] }
  ],
  main: [
    { name: 'Chicken, chickpea & spinach curry', img: 'chicken-chickpea-curry', time: '30 min',
      ing: [['chicken', 130, 'g'], ['chickpeas', 80, 'g'], ['tins', 200, 'g'], ['spinach', 60, 'g'], ['onion', 0.5, 'pc'], ['garlic', 1, 'pc'], ['yog', 60, 'g'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['~', '2 tsp curry powder, fresh coriander or parsley']],
      steps: ['Cook the rice according to the pack. Cut the chicken into bite-sized pieces.', 'Heat the oil in a pan, cook the chopped onion for 5 minutes, then add the garlic and curry powder for 1 minute.', 'Add the chicken and cook for 3 minutes, then add the tomatoes and chickpeas and simmer for 12 minutes until the chicken is cooked through.', 'Stir in the spinach until wilted, take off the heat and stir in the yogurt for a creamy finish. Serve over the rice with the herbs.'] },
    { name: 'Lemon-garlic chicken with potatoes & broccoli', img: 'lemon-garlic-chicken', time: '40 min',
      ing: [['chicken', 150, 'g'], ['potato', 200, 'g'], ['broccoli', 120, 'g'], ['oil', 2, 'tsp'], ['lemon', 15, 'ml'], ['garlic', 1, 'pc'], ['~', 'Dried oregano, salt and black pepper']],
      steps: ['Heat the oven to 200°C (180°C fan). Halve the potatoes, toss with 1 tsp of the oil, salt and pepper and roast for 15 minutes.', 'Mix the rest of the oil with the lemon juice, crushed garlic, oregano, salt and pepper, and coat the chicken in it.', 'Add the chicken and the broccoli florets to the tray and roast for 20–25 minutes more, until the chicken is cooked through with no pink in the middle.', 'Rest the chicken for 3 minutes, slice it and serve with the potatoes and broccoli. It is just as good cold for tomorrow\'s lunch.'] },
    { name: 'Lean beef & black bean chilli', img: 'beef-black-bean-chilli', time: '35 min',
      ing: [['beef', 130, 'g'], ['blackbeans', 80, 'g'], ['tins', 200, 'g'], ['onion', 0.5, 'pc'], ['pepper', 0.5, 'pc'], ['garlic', 1, 'pc'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['yog', 30, 'g'], ['~', '1 tsp ground cumin, 1 tsp smoked paprika, chilli powder to taste']],
      steps: ['Rinse the rice and cook in 1½ times its volume of water, covered, for 12 minutes. Rest off the heat.', 'Meanwhile, heat the oil and cook the diced onion and pepper for 5 minutes. Add the garlic and spices for 1 minute.', 'Add the beef and brown for 5 minutes, breaking it up. Stir in the tomatoes and black beans and simmer for 15 minutes until thick.', 'Serve over the rice with a spoonful of yogurt. It doubles well for batch cooking.'] },
    { name: 'Turkey meatballs with wholewheat spaghetti', img: 'turkey-meatballs-spaghetti', time: '35 min',
      ing: [['turkey', 140, 'g'], ['tins', 200, 'g'], ['pasta', 60, 'g'], ['onion', 0.25, 'pc'], ['garlic', 1, 'pc'], ['spinach', 50, 'g'], ['parm', 10, 'g'], ['oil', 1, 'tsp'], ['~', '1 tsp dried oregano, salt and black pepper']],
      steps: ['Mix the mince with half the grated garlic, the oregano, salt and pepper, and roll into small meatballs.', 'Heat the oil in a pan and brown the meatballs on all sides for 5 minutes. Add the chopped onion and the rest of the garlic for 2 minutes.', 'Pour in the chopped tomatoes, cover and simmer for 12 minutes until the meatballs are cooked through. Stir in the spinach to wilt.', 'Meanwhile, cook the spaghetti according to the pack. Serve with the meatballs and sauce, topped with parmesan.'] }
  ],
  snack: [
    { name: 'Chocolate protein yogurt', img: 'chocolate-protein-yogurt', time: '3 min',
      ing: [['yog', 150, 'g'], ['cocoa', 6, 'g'], ['honey', 1, 'tsp'], ['berries', 30, 'g']],
      steps: ['Whisk the cocoa and honey into the yogurt until smooth and mousse-like.', 'Top with the berries. Good as an after-dinner dessert.'] },
    { name: 'Boiled eggs & cucumber', img: 'boiled-eggs-cucumber', time: '10 min',
      ing: [['egg', 2, 'pc'], ['cucumber', 100, 'g'], ['~', 'Salt, black pepper, chilli flakes']],
      steps: ['Boil the eggs for 8–9 minutes, then cool them in cold water and peel. You can cook a batch for the week.', 'Halve the eggs, season with salt, pepper and chilli flakes, and serve with the sliced cucumber.'] }
  ]
};
// Vegetarian pool (eggs and dairy, no meat or fish). Same shape as POOL: breakfasts and snacks are shared,
// the omelette swaps parmesan (made with animal rennet) for a vegetarian hard cheese, and the four mains are new.
var POOL_VEG = {
  breakfast: [
    POOL.breakfast[0],
    { name: 'Spinach & cheese omelette with toast', img: 'spinach-parmesan-omelette', time: '12 min',
      ing: [['egg', 3, 'pc'], ['spinach', 60, 'g'], ['vparm', 10, 'g'], ['bread', 1, 'pc'], ['oil', 1, 'tsp'], ['~', 'Salt and black pepper']],
      steps: ['Whisk the eggs with a pinch of salt and pepper.', 'Heat the oil in a non-stick pan over medium heat, add the spinach and stir until wilted, about 1 minute.', 'Pour in the eggs, tilt to spread and cook 2–3 minutes until almost set. Grate the cheese over one half, fold and cook 1 minute more.', 'Serve with the toasted bread.'] },
    POOL.breakfast[2]
  ],
  main: [
    { name: 'Tofu, chickpea & spinach curry', img: 'tofu-chickpea-curry', time: '30 min',
      ing: [['tofu', 150, 'g'], ['chickpeas', 80, 'g'], ['tins', 200, 'g'], ['spinach', 60, 'g'], ['onion', 0.5, 'pc'], ['garlic', 1, 'pc'], ['yog', 60, 'g'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['~', '2 tsp curry powder, fresh coriander or parsley']],
      steps: ['Cook the rice according to the pack. Pat the tofu dry with kitchen paper and cut it into cubes.', 'Heat the oil in a non-stick pan and fry the tofu for 5–6 minutes, turning, until golden. Lift it out onto a plate.', 'In the same pan, cook the chopped onion for 5 minutes, then add the garlic and curry powder for 1 minute. Add the tomatoes and chickpeas and simmer for 10 minutes, then return the tofu.', 'Stir in the spinach until wilted, take off the heat and stir in the yogurt for a creamy finish. Serve over the rice with the herbs.'] },
    { name: 'Lemon-garlic tofu with potatoes & broccoli', img: 'lemon-garlic-tofu', time: '40 min',
      ing: [['tofu', 180, 'g'], ['potato', 200, 'g'], ['broccoli', 120, 'g'], ['oil', 2, 'tsp'], ['lemon', 15, 'ml'], ['garlic', 1, 'pc'], ['~', 'Dried oregano, salt and black pepper']],
      steps: ['Heat the oven to 200°C (180°C fan). Halve the potatoes, toss with 1 tsp of the oil, salt and pepper and roast for 15 minutes.', 'Pat the tofu dry with kitchen paper and cut it into thick cubes. Mix the rest of the oil with the lemon juice, crushed garlic, oregano, salt and pepper, and coat the tofu in it.', 'Add the tofu and the broccoli florets to the tray and roast for 20–25 minutes more, turning the tofu halfway, until golden at the edges.', 'Serve with the potatoes and broccoli. It is just as good cold for tomorrow\'s lunch.'] },
    { name: 'Black bean & lentil chilli', img: 'black-bean-lentil-chilli', time: '35 min',
      ing: [['lentils', 40, 'g'], ['blackbeans', 100, 'g'], ['tins', 200, 'g'], ['onion', 0.5, 'pc'], ['pepper', 0.5, 'pc'], ['garlic', 1, 'pc'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['yog', 60, 'g'], ['~', '1 tsp ground cumin, 1 tsp smoked paprika, chilli powder to taste']],
      steps: ['Rinse the rice and cook in 1½ times its volume of water, covered, for 12 minutes. Rest off the heat.', 'Meanwhile, heat the oil and cook the diced onion and pepper for 5 minutes. Add the garlic and spices for 1 minute.', 'Add the rinsed lentils, the tomatoes and 150 ml of water and simmer for 15 minutes until the lentils are soft. Stir in the black beans and cook 5 minutes more until thick, adding a splash of water if needed.', 'Serve over the rice with a spoonful of yogurt. It doubles well for batch cooking.'] },
    { name: 'Creamy tomato & spinach spaghetti', img: 'creamy-tomato-spaghetti', time: '20 min',
      ing: [['pasta', 70, 'g'], ['cottage', 150, 'g'], ['tins', 200, 'g'], ['spinach', 50, 'g'], ['garlic', 1, 'pc'], ['vparm', 10, 'g'], ['oil', 1, 'tsp'], ['~', '1 tsp dried oregano, salt and black pepper']],
      steps: ['Cook the spaghetti according to the pack and keep a cup of the cooking water.', 'Meanwhile, heat the oil in a pan, cook the crushed garlic for 1 minute, then add the tomatoes and oregano and simmer for 8 minutes.', 'Blend the cottage cheese until smooth (or mash it well with a fork). Take the sauce off the heat and stir in the cottage cheese and the spinach until wilted. Do not let it boil once the cheese is in.', 'Toss the spaghetti in the sauce, loosening with a little cooking water, and top with the grated cheese.'] }
  ],
  snack: POOL.snack
};
// How the pool fills the week. Tonight's dinner is tomorrow's lunch, so a main can be cooked once and eaten twice;
// lunch and dinner are never the same meal on the same day.
var WEEK = {
  breakfast: [0, 1, 2, 0, 1, 2, 0],
  lunch: [0, 2, 1, 3, 0, 2, 1], // the two chicken mains (0 and 1) never share a day
  snack: [1, 0, 0, 1, 0, 0, 1], // boiled eggs only on the overnight-oats days, so no day is egg-heavy
  dinner: [2, 1, 3, 0, 2, 1, 3]
};
function weekPlan(pool) {
  function pick(list) { return function (i) { return list[i]; }; }
  return { breakfast: WEEK.breakfast.map(pick(pool.breakfast)), lunch: WEEK.lunch.map(pick(pool.main)), snack: WEEK.snack.map(pick(pool.snack)), dinner: WEEK.dinner.map(pick(pool.main)) };
}
var RECIPES = weekPlan(POOL), RECIPES_VEG = weekPlan(POOL_VEG);
function recipesFor(diet) { return diet === 'veg' ? RECIPES_VEG : RECIPES; }

// Protein preferences. Each main is a template with a meat and a meat-free version (POOL.main[t] / POOL_VEG.main[t]);
// the person's picked proteins decide which version each day gets.
var PROTEINS = ['chicken', 'beef', 'pork', 'fish', 'eggs', 'tofu', 'beans'];

// Fish variants of the main templates (same order as POOL.main; null = no fish version of that template).
// A recipe with noPhoto: true has no real photo yet (site shows a placeholder, emails skip the photo).
var POOL_FISH = [
  { name: 'Prawn, chickpea & spinach curry', img: 'prawn-chickpea-curry', time: '25 min',
    ing: [['prawns', 150, 'g'], ['chickpeas', 80, 'g'], ['tins', 200, 'g'], ['spinach', 60, 'g'], ['onion', 0.5, 'pc'], ['garlic', 1, 'pc'], ['yog', 60, 'g'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['~', '2 tsp curry powder, fresh coriander or parsley']],
    steps: ['Cook the rice according to the pack.', 'Heat the oil in a pan and cook the chopped onion for 5 minutes, then add the garlic and curry powder for 1 minute.', 'Add the tomatoes and chickpeas and simmer for 10 minutes. Stir in the prawns and cook for 3–4 minutes, until pink all the way through.', 'Stir in the spinach until wilted, take off the heat and stir in the yogurt for a creamy finish. Serve over the rice with the herbs.'] },
  { name: 'Lemon-garlic salmon with potatoes & broccoli', img: 'lemon-garlic-salmon', time: '35 min',
    ing: [['salmon', 140, 'g'], ['potato', 200, 'g'], ['broccoli', 120, 'g'], ['oil', 2, 'tsp'], ['lemon', 15, 'ml'], ['garlic', 1, 'pc'], ['~', 'Dried oregano, salt and black pepper']],
    steps: ['Heat the oven to 200°C (180°C fan). Halve the potatoes, toss with 1 tsp of the oil, salt and pepper and roast for 15 minutes.', 'Mix the rest of the oil with the lemon juice, crushed garlic, oregano, salt and pepper.', 'Add the broccoli to the tray and lay the salmon on top. Spoon the lemon-garlic mix over the salmon and roast for 12–15 minutes, until it flakes easily.', 'Serve with the potatoes and broccoli. It is also good cold for tomorrow\'s lunch.'] },
  null, null
];

// Pork variants of the main templates (same order as POOL.main; null = no pork version of that template).
// One side each: rice (curry slot), potatoes (tray-bake slot), couscous (pasta slot).
var POOL_PORK = [
  { name: 'Honey-soy pork stir-fry with rice', img: 'honey-soy-pork-stir-fry', noPhoto: true, time: '25 min',
    ing: [['pork', 140, 'g'], ['pepper', 0.5, 'pc'], ['broccoli', 100, 'g'], ['garlic', 1, 'pc'], ['soy', 1, 'tbsp'], ['honey', 1, 'tsp'], ['basmati', 50, 'g'], ['oil', 1, 'tsp'], ['~', 'Ground or fresh ginger, chilli flakes (optional)']],
    steps: ['Cook the rice according to the pack. Slice the pork into thin strips, the pepper into strips and the broccoli into small florets.', 'Mix the soy sauce, honey, crushed garlic and a pinch of ginger with 2 tbsp of water.', 'Heat the oil in a large frying pan or wok over a high heat and stir-fry the pork for 3–4 minutes until browned and cooked through. Lift it onto a plate.', 'Stir-fry the pepper and broccoli for 3–4 minutes with a splash of water. Return the pork, pour in the sauce and toss for 1 minute until glossy. Serve over the rice.'] },
  { name: 'Paprika pork with roast potatoes & green beans', img: 'paprika-pork-potatoes', noPhoto: true, time: '40 min',
    ing: [['pork', 150, 'g'], ['potato', 200, 'g'], ['greenbeans', 120, 'g'], ['oil', 2, 'tsp'], ['garlic', 1, 'pc'], ['~', '1 tsp smoked paprika, dried oregano, salt and black pepper']],
    steps: ['Heat the oven to 200°C (180°C fan). Halve the potatoes, toss with 1 tsp of the oil, salt and pepper and roast for 15 minutes.', 'Mix the rest of the oil with the paprika, crushed garlic, oregano, salt and pepper and rub it all over the pork.', 'Add the pork and the green beans to the tray and roast for 20 minutes, until the pork is cooked through and the juices run clear.', 'Rest the pork for 5 minutes, slice it and serve with the potatoes and beans. Leftovers make a good cold lunch.'] },
  null,
  { name: 'Greek-style pork with couscous & yogurt sauce', img: 'greek-pork-couscous', noPhoto: true, time: '20 min',
    ing: [['pork', 140, 'g'], ['couscous', 55, 'g'], ['cherry', 80, 'g'], ['cucumber', 80, 'g'], ['yog', 60, 'g'], ['lemon', 10, 'ml'], ['oil', 1, 'tsp'], ['garlic', 1, 'pc'], ['~', 'Dried oregano, salt and black pepper, fresh parsley or mint (optional)']],
    steps: ['Put the couscous in a bowl, pour over about 80 ml of boiling water, cover and leave for 5 minutes. Fluff it up with a fork.', 'Slice the pork into 1 cm medallions and toss with half the lemon juice, half the crushed garlic, the oregano, salt and pepper.', 'Heat the oil in a frying pan over a medium-high heat and cook the pork for about 3 minutes on each side, until cooked through.', 'Mix the yogurt with the rest of the garlic and a pinch of salt. Chop the tomatoes and cucumber and stir them into the couscous with the rest of the lemon juice. Serve the pork on the couscous with the yogurt sauce.'] }
];

// Each main template and the protein each version serves: 'meat' = POOL, 'veg' = POOL_VEG, 'fish' = POOL_FISH, 'pork' = POOL_PORK.
var TEMPLATE_VARIANTS = [
  [['chicken', 'meat'], ['tofu', 'veg'], ['fish', 'fish'], ['pork', 'pork']],   // curry (pork: honey-soy stir-fry with rice)
  [['chicken', 'meat'], ['tofu', 'veg'], ['fish', 'fish'], ['pork', 'pork']],   // lemon-garlic tray bake (pork: paprika pork with potatoes)
  [['beef', 'meat'], ['beans', 'veg']],                                         // chilli
  [['chicken', 'meat'], ['eggs', 'veg'], ['pork', 'pork']]                      // pasta (turkey meatballs / creamy cottage cheese; pork: couscous)
];
function prefsOf(diet) {
  if (Array.isArray(diet)) return diet;
  return diet === 'veg' ? ['eggs', 'tofu', 'beans'] : ['chicken', 'beef', 'eggs'];
}
// For a set of picked proteins, choose one version per template for the whole week (lunch and dinner share
// templates, so a batch-cooked dinner stays the same dish for tomorrow's lunch). Spread the picks: each template
// takes the picked protein used least so far. No picked protein fits a template: its meat-free version.
var _choiceCache = {};
function templateChoice(diet) {
  var p = prefsOf(diet), key = p.slice().sort().join(',');
  if (_choiceCache[key]) return _choiceCache[key];
  var used = {}, out = TEMPLATE_VARIANTS.map(function (vars) {
    var ok = vars.filter(function (v) { return p.indexOf(v[0]) >= 0; });
    if (!ok.length) return 'veg';
    ok.sort(function (a, b) { return (used[a[0]] || 0) - (used[b[0]] || 0); });
    used[ok[0][0]] = (used[ok[0][0]] || 0) + 1;
    return ok[0][1];
  });
  return (_choiceCache[key] = out);
}
function sourceFor(slotKey, i, diet) {
  var p = prefsOf(diet);
  if (slotKey === 'lunch' || slotKey === 'dinner') {
    var t = POOL.main.indexOf(RECIPES[slotKey][i]);
    return { src: templateChoice(diet)[t], t: t };
  }
  var anyMeat = p.indexOf('chicken') >= 0 || p.indexOf('beef') >= 0 || p.indexOf('pork') >= 0 || p.indexOf('fish') >= 0;
  return { src: slotKey === 'breakfast' && !anyMeat ? 'veg' : 'meat', t: -1 }; // vegetarian cheese in the omelette
}
function useVeg(slotKey, i, diet) { return sourceFor(slotKey, i, diet).src === 'veg'; }
function recipeFor(slotKey, i, diet) {
  var s = sourceFor(slotKey, i, diet);
  if (s.src === 'fish') return POOL_FISH[s.t];
  if (s.src === 'pork') return POOL_PORK[s.t];
  return (s.src === 'veg' ? RECIPES_VEG : RECIPES)[slotKey][i];
}

/* Shared meal-plan logic: used by the FitMe page (classic script) and the Netlify Functions (side-effect import). */
var SLOTS = [
  { key: 'breakfast', label: 'Breakfast', share: 0.25 },
  { key: 'lunch', label: 'Lunch', share: 0.315 },
  { key: 'snack', label: 'Snack · mid-afternoon or after dinner', share: 0.12 },
  { key: 'dinner', label: 'Dinner', share: 0.315 }
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
// Locale data for the meal plan: European Portuguese (FITME_MEALS_PT, /pt/) or Brazilian Portuguese (FITME_MEALS_BR, /br/).
function ptData(lang) {
  var pt = lang === 'pt' ? globalThis.FITME_MEALS_PT || null : lang === 'br' ? globalThis.FITME_MEALS_BR || null : null;
  if (pt && pt.recipes.main) pt.recipes = weekPlan(pt.recipes); // the Portuguese pool follows the same weekly rotation
  if (pt && pt.recipesVeg && pt.recipesVeg.main) pt.recipesVeg = weekPlan(pt.recipesVeg);
  return pt;
}
function ingName(key, lang) { var pt = ptData(lang); return pt && pt.db[key] ? pt.db[key][0] : DB[key][0]; }
function pieceLabels(key, lang) { var pt = ptData(lang); return ((pt && pt.db[key] && pt.db[key][1]) || DB[key][7] || '|').split('|'); }
function amountText(l, imperial, lang) {
  var q = l[1], u = l[2], pt = ptData(lang);
  var loc = pt ? pt.locale || 'pt-PT' : 'en', dec = function (v) { return v.toLocaleString(loc); };
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
function isProteinRich(key) { var d = DB[key]; return d && d[1] > 0 && (d[2] * 4) / d[1] >= 0.4; } // lean protein only: eggs (~35%) scale with the rest of the meal
var PROTEIN_PER_KG = 1.5; // grams per kg of goal weight
function proteinTarget(goalKg) { return Math.round(PROTEIN_PER_KG * goalKg); }
// Build a day's four meals for an intake of T kcal. If P (grams of protein) is given and the
// calorie-scaled day falls short, protein-rich ingredients are scaled up and the rest scaled down
// so the day keeps its calories and reaches P.
function buildDay(i, T, P, lang, diet) {
  var meals = SLOTS.map(function (slot) {
    var rec = recipeFor(slot.key, i, diet);
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
      a = mClamp(a, 1, 2.6);
      b = mClamp((T - a * Kp) / Ko, 0.6, 1);
    }
  }
  var pt = ptData(lang);
  return meals.map(function (m) {
    var lines = m.rec.ing.map(function (l) { return l[0] === '~' ? l : scaleLine(l, m.f * (isProteinRich(l[0]) ? a : b)); });
    var out = { slot: m.slot, rec: m.rec, lines: lines, n: nutrition(lines) };
    if (pt) {
      var srcI = sourceFor(m.slot.key, i, diet), tr = srcI.src === 'fish' ? pt.recipesFish[srcI.t] : srcI.src === 'pork' ? pt.recipesPork[srcI.t] : (srcI.src === 'veg' ? pt.recipesVeg : pt.recipes)[m.slot.key][i], xi = 0;
      out.rec = { name: tr.name, time: tr.time, steps: tr.steps, ing: m.rec.ing, img: m.rec.img, noPhoto: m.rec.noPhoto };
      out.slot = { key: m.slot.key, label: pt.slots[m.slot.key], share: m.slot.share };
      out.lines = lines.map(function (l) { return l[0] === '~' ? ['~', tr.x[xi++] || l[1]] : l; });
    }
    return out;
  });
}
// Weekly shopping list for the 7-day plan at intake T and protein target P.
// Returns { groups: [{ aisle, items: [{ n, q }] }], extras } with names, units and numbers in the given language.
var AISLES = ['Fruit & veg', 'Meat & fish', 'Dairy & eggs', 'Grains & bread', 'Pantry'];
function shoppingList(T, P, lang, imperial, diet) {
  var pt = ptData(lang), loc = pt ? pt.locale || 'pt-PT' : 'en';
  var W = pt ? pt.words || { slice: ['fatia', 'fatias'], clove: ['dente', 'dentes'], tsp: 'c. chá', tbsp: 'c. sopa' } : { slice: ['slice', 'slices'], clove: ['clove', 'cloves'], tsp: 'tsp', tbsp: 'tbsp' };
  var num = function (v) { return v.toLocaleString(loc); };
  var totals = {}, extras = {};
  for (var i = 0; i < 7; i++) buildDay(i, T, P, lang, diet).forEach(function (m) {
    m.rec.ing.forEach(function (l) { if (l[0] === '~') extras[l[1]] = 1; });
    m.lines.forEach(function (l) {
      if (l[0] === '~') return;
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
  var seen = {}, list = [];
  {
    Object.keys(extras).forEach(function (e) {
      e.split(/,| and /).forEach(function (x) {
        x = x.trim().replace(/^(about\s+)?(\d+|½|¼)\s*(tsp|tbsp|ml)?\s*/i, '').replace(/^pinch of\s+/i, '').replace(/\s*\(optional\)/i, '').replace(/\s+to (taste|garnish)$/i, '').trim();
        if (!x) return;
        if (seen[x.toLowerCase()]) return;
        seen[x.toLowerCase()] = 1;
        x = x.charAt(0).toUpperCase() + x.slice(1);
        list.push(pt ? (pt.extraNames[x] || x) : x);
      });
    });
  }
  var ex = list.sort(function (a, b) { return a.localeCompare(b, loc); }).join(', ');
  return { groups: groups, extras: ex };
}
function dayTotals(meals) {
  return meals.reduce(function (a, m) { a.k += m.n.k; a.p += m.n.p; a.c += m.n.c; a.f += m.n.f; return a; }, { k: 0, p: 0, c: 0, f: 0 });
}
globalThis.FITME_MEALS = { DB: DB, RECIPES: RECIPES, RECIPES_VEG: RECIPES_VEG, recipesFor: recipesFor, PROTEINS: PROTEINS, recipeFor: recipeFor, SLOTS: SLOTS, DAY_NAMES: DAY_NAMES, lineGrams: lineGrams, frac: frac, scaleLine: scaleLine, amountText: amountText, nutrition: nutrition, buildDay: buildDay, dayTotals: dayTotals, ingName: ingName, pieceLabels: pieceLabels, ptData: ptData, proteinTarget: proteinTarget, PROTEIN_PER_KG: PROTEIN_PER_KG, shoppingList: shoppingList };
