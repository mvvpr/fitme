// Builds the static recipe pages and hubs into public/: /recipes/, /pt/receitas/, /br/receitas/ and one page per recipe.
// Run after changing a recipe or scripts/recipes-content.mjs:  node scripts/build-recipes.mjs
// The output is committed (Netlify has no build step). Numbers come from public/meals*.js via FITME_MEALS.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { HUB, RECIPES } from './recipes-content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');
const SITE = 'https://fitmeplan.com';
const LANGS = ['en', 'pt', 'br'];
const HTML_LANG = { en: 'en', pt: 'pt-PT', br: 'pt-BR' };
const HREFLANG = { en: 'en', pt: 'pt-PT', br: 'pt-BR' };
const OG_LOCALE = { en: 'en_GB', pt: 'pt_PT', br: 'pt_BR' };

// Load the meal data exactly as the browser does.
const ctx = { console };
ctx.globalThis = ctx; ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['meals.js', 'meals.pt.js', 'meals.br.js']) vm.runInContext(fs.readFileSync(path.join(PUB, f), 'utf8'), ctx, { filename: f });
const M = ctx.FITME_MEALS;

const L = {
  en: {
    share: 'Share this recipe', shareNative: 'Share…', copy: 'Copy link', copied: 'Link copied', igCopied: 'Link copied. Paste it in your Instagram story or message.', email: 'Email', shareText: (n, k, p) => `${n}: ${k} kcal, ${p} g protein. Free recipe on FitMe`,
    home: 'Home', recipes: 'Recipes', perPortion: 'per portion', kcal: 'kcal', protein: 'protein', carbs: 'carbs', fat: 'fat', time: 'Time',
    ingredients: 'Ingredients (1 portion)', method: 'Method', tips: 'Tips', fits: 'Where it fits in your day', scale: 'Cooking for more people? Multiply everything. In your FitMe plan, the amounts are scaled to your own calories.',
    cta: 'Get my free plan', ctaLead: 'Want a full week of meals like this, sized to your goal? Get your free FitMe plan and see when you\'ll reach your goal weight.',
    more: 'More recipes', privacy: 'Privacy policy', g: 'g', serving: '1 portion', category: { breakfast: 'Breakfast', main: 'Main course' }, imgAlt: (n) => n },
  pt: {
    share: 'Partilha esta receita', shareNative: 'Partilhar…', copy: 'Copiar link', copied: 'Link copiado', igCopied: 'Link copiado. Cola-o na tua story ou mensagem do Instagram.', email: 'Email', shareText: (n, k, p) => `${n}: ${k} kcal, ${p} g de proteína. Receita grátis no FitMe`,
    home: 'Início', recipes: 'Receitas', perPortion: 'por dose', kcal: 'kcal', protein: 'proteína', carbs: 'hidratos', fat: 'gordura', time: 'Tempo',
    ingredients: 'Ingredientes (1 dose)', method: 'Preparação', tips: 'Dicas', fits: 'Como encaixa no teu dia', scale: 'Vais cozinhar para mais pessoas? Multiplica tudo. No teu plano FitMe, as quantidades são ajustadas às tuas calorias.',
    cta: 'Quero o meu plano grátis', ctaLead: 'Queres uma semana inteira de refeições assim, ajustada ao teu objetivo? Faz o teu plano grátis no FitMe e vê quando chegas ao teu peso.',
    more: 'Mais receitas', privacy: 'Política de privacidade', g: 'g', serving: '1 dose', category: { breakfast: 'Pequeno-almoço', main: 'Prato principal' }, imgAlt: (n) => n },
  br: {
    share: 'Compartilhe esta receita', shareNative: 'Compartilhar…', copy: 'Copiar link', copied: 'Link copiado', igCopied: 'Link copiado. Cole no seu story ou mensagem do Instagram.', email: 'E-mail', shareText: (n, k, p) => `${n}: ${k} kcal, ${p} g de proteína. Receita grátis no FitMe`,
    home: 'Início', recipes: 'Receitas', perPortion: 'por porção', kcal: 'kcal', protein: 'proteína', carbs: 'carboidratos', fat: 'gordura', time: 'Tempo',
    ingredients: 'Ingredientes (1 porção)', method: 'Modo de preparo', tips: 'Dicas', fits: 'Como encaixa no seu dia', scale: 'Vai fazer para mais pessoas ou para a semana? É só multiplicar. No seu plano FitMe, as quantidades já vêm ajustadas às suas calorias.',
    cta: 'Quero meu plano grátis', ctaLead: 'Quer uma semana inteira de refeições assim, ajustada ao seu objetivo? Monte seu plano grátis no FitMe e veja quando você chega ao seu peso.',
    more: 'Mais receitas', privacy: 'Política de privacidade', g: 'g', serving: '1 porção', category: { breakfast: 'Café da manhã', main: 'Prato principal' }, imgAlt: (n) => n },
};
const HOME = { en: '/', pt: '/pt/', br: '/br/' };
const PRIVACY = { en: '/privacy.html', pt: '/pt/privacy.html', br: '/br/privacy.html' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const r5 = (n) => Math.round(n / 5) * 5;

// Find a recipe's source (pool + index) by its image slug, and its translation.
// Protein variant pools (top-level vars in meals.js) and their translation arrays in meals.pt.js / meals.br.js.
const VARIANTS = [['POOL_PORK', 'recipesPork'], ['POOL_FISH', 'recipesFish']];
function source(img) {
  for (const k of ['breakfast', 'lunch', 'snack', 'dinner']) {
    const i = M.RECIPES[k].findIndex((r) => r.img === img);
    if (i >= 0) return { k, i, rec: M.RECIPES[k][i] };
  }
  for (const [pool, trKey] of VARIANTS) {
    const t = (ctx[pool] || []).findIndex((r) => r && r.img === img);
    if (t >= 0) return { trKey, t, rec: ctx[pool][t] };
  }
  throw new Error('No recipe with img ' + img);
}
function data(img, lang) {
  const { k, i, trKey, t, rec } = source(img);
  const nu = M.nutrition(rec.ing);
  const tr = lang === 'en' ? null : trKey ? M.ptData(lang)[trKey][t] : M.ptData(lang).recipes[k][i];
  let x = 0;
  const ing = rec.ing.map((l) => {
    if (l[0] === '~') { const extra = tr ? tr.x[x] : l[1]; x++; return extra; }
    const a = M.amountText(l, false, lang);
    // Portuguese: "130 g de peito de frango", but "½ cebola" / "3 ovos" (no unit, no "de").
    if (lang !== 'en' && /[a-zà-ú.]$/i.test(a.q)) return a.q + ' de ' + a.n;
    return a.q + ' ' + a.n;
  });
  return { name: tr ? tr.name : rec.name, time: tr ? tr.time : rec.time, steps: tr ? tr.steps : rec.steps, ing,
    kcal: r5(nu.k), p: Math.round(nu.p), c: Math.round(nu.c), f: Math.round(nu.f) };
}
// "30 min" -> PT30M; "5 min + overnight" -> PT5M (prep only).
const iso = (t) => 'PT' + parseInt(t, 10) + 'M';

const url = (lang, slug) => (lang === 'en' ? '/recipes/' : HUB[lang].path) + slug + '/';

function page({ lang, title, description, canonical, alternates, ogImage, body, jsonld, ogType = 'website' }) {
  const alt = alternates.map(([l, h]) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${h}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE}${alternates.find((a) => a[0] === 'en')[1]}">`;
  const switcher = alternates.map(([l, h]) => `<a href="${h}" hreflang="${HREFLANG[l]}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${canonical}">
${alt}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="FitMe">
<meta property="og:locale" content="${OG_LOCALE[lang]}">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:title" content="${esc(title.replace(/ \| FitMe$/, ''))}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#2e6b4f">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/brand/fitme-icon-512.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/recipes.css">
<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>
</head>
<body>
<div class="wrap">
<header>
  <a class="brand" href="${HOME[lang]}"><img src="/brand/fitme-icon-512.png" alt="" width="34" height="34"><b>Fit<span>Me</span></b></a>
  <nav class="lang-switch" aria-label="Language / Idioma">${switcher}</nav>
</header>
${body}
<footer><a href="${HUB[lang].path}">${L[lang].recipes}</a> · <a href="${PRIVACY[lang]}">${L[lang].privacy}</a></footer>
</div>
<script src="/track.js"></script>
<script src="/share.js" defer></script>
<script>if (window.FITME_TRACK) FITME_TRACK.init({});</script>
</body>
</html>
`;
}

function picture(img, alt, eager) {
  return `<img class="hero" src="/img/meals/${img}-720.webp" srcset="/img/meals/${img}-720.webp 720w, /img/meals/${img}-1200.webp 1200w" sizes="(max-width: 760px) 100vw, 720px" width="1200" height="750" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>`;
}

function card(r, lang) {
  const d = data(r.img, lang);
  return `<li><a href="${url(lang, r[lang].slug)}"><img src="/img/meals/${r.img}-720.webp" width="1200" height="750" loading="lazy" alt=""><span class="card-name">${esc(d.name)}</span><span class="card-meta">${d.kcal} ${L[lang].kcal} · ${d.p} ${L[lang].g} ${L[lang].protein} · ${esc(d.time)}</span></a></li>`;
}

// Share bar at the end of each recipe. Links carry utm_source=<channel>&utm_medium=share&utm_campaign=recipe.
// Instagram has no web share link: on phones it uses the share sheet, elsewhere it copies the link. Wired up by /share.js.
function shareBlock(r, lang, d) {
  const t = L[lang], link = SITE + url(lang, r[lang].slug);
  const btn = (ch, label, extra = '') => `<button type="button" class="sh sh-${ch}" data-ch="${ch}"${extra}>${label}</button>`;
  return `<section class="share" aria-label="${esc(t.share)}" data-url="${esc(link)}" data-text="${esc(t.shareText(d.name, d.kcal, d.p))}" data-img="${SITE}/img/meals/${r.img}-1200.webp" data-copied="${esc(t.copied)}" data-ig="${esc(t.igCopied)}" data-recipe="${esc(r[lang].slug)}">
<h2>${t.share}</h2>
<div class="sh-row">${btn('native', t.shareNative, ' hidden')}${btn('whatsapp', 'WhatsApp')}${btn('instagram', 'Instagram')}${btn('facebook', 'Facebook')}${btn('pinterest', 'Pinterest')}${btn('x', 'X')}${btn('telegram', 'Telegram')}${btn('email', t.email)}${btn('copy', t.copy)}</div>
<p class="sh-toast" role="status" aria-live="polite" hidden></p>
</section>`;
}

function recipePage(r, lang) {
  const c = r[lang]; const d = data(r.img, lang); const t = L[lang];
  const alternates = LANGS.map((l) => [l, url(l, r[l].slug)]);
  const crumbs = `<nav class="crumbs" aria-label="breadcrumb"><a href="${HOME[lang]}">${t.home}</a> › <a href="${HUB[lang].path}">${t.recipes}</a></nav>`;
  const tips = c.tips.length ? `<h2>${t.tips}</h2>\n<ul>${c.tips.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
  const more = RECIPES.filter((o) => o !== r).map((o) => card(o, lang)).join('');
  const body = `<main>
${crumbs}
<article>
<h1>${esc(c.h1)}</h1>
${c.intro.map((p) => `<p class="lead">${esc(p)}</p>`).join('\n')}
${picture(r.img, d.name, true)}
<dl class="glance" aria-label="${t.perPortion}">
  <div><dt>${t.time}</dt><dd>${esc(d.time)}</dd></div>
  <div><dt>${t.kcal}</dt><dd>${d.kcal}</dd></div>
  <div><dt>${t.protein}</dt><dd>${d.p} ${t.g}</dd></div>
  <div><dt>${t.carbs}</dt><dd>${d.c} ${t.g}</dd></div>
  <div><dt>${t.fat}</dt><dd>${d.f} ${t.g}</dd></div>
</dl>
<p class="note">${t.perPortion}</p>
<h2>${t.ingredients}</h2>
<ul class="ing">${d.ing.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
<p class="note">${esc(t.scale)}</p>
<h2>${t.method}</h2>
<ol class="steps">${d.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
${tips}
<h2>${t.fits}</h2>
<p>${esc(c.fits)}</p>
${shareBlock(r, lang, d)}
<div class="cta"><p>${esc(t.ctaLead)}</p><a class="btn" href="${HOME[lang]}">${t.cta}</a></div>
</article>
<section class="more"><h2>${t.more}</h2><ul class="cards">${more}</ul></section>
</main>`;
  const jsonld = [{
    '@context': 'https://schema.org', '@type': 'Recipe', name: d.name, description: c.description,
    image: [`${SITE}/img/meals/${r.img}-1200.webp`], author: { '@type': 'Organization', name: 'FitMe', url: SITE },
    inLanguage: HTML_LANG[lang], recipeCategory: t.category[r.course], recipeYield: t.serving,
    ...(/[+]/.test(source(r.img).rec.time) ? { prepTime: iso(d.time) } : { totalTime: iso(d.time) }),
    recipeIngredient: d.ing, recipeInstructions: d.steps.map((s) => ({ '@type': 'HowToStep', text: s })),
    nutrition: { '@type': 'NutritionInformation', servingSize: t.serving, calories: d.kcal + ' kcal', proteinContent: d.p + ' g', carbohydrateContent: d.c + ' g', fatContent: d.f + ' g' },
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: SITE + HOME[lang] },
      { '@type': 'ListItem', position: 2, name: t.recipes, item: SITE + HUB[lang].path },
      { '@type': 'ListItem', position: 3, name: d.name, item: SITE + url(lang, c.slug) },
    ],
  }];
  return page({ lang, title: c.title, description: c.description, canonical: url(lang, c.slug), alternates, ogImage: `/img/meals/${r.img}-1200.webp`, body, jsonld, ogType: 'article' });
}

function hubPage(lang) {
  const h = HUB[lang];
  const alternates = LANGS.map((l) => [l, HUB[l].path]);
  const group = (course) => `<h2>${h[course]}</h2><ul class="cards">${RECIPES.filter((r) => r.course === course).map((r) => card(r, lang)).join('')}</ul>`;
  const body = `<main>
<h1>${esc(h.h1)}</h1>
<p class="lead">${esc(h.intro)}</p>
${group('main')}
${group('breakfast')}
<div class="cta"><p>${esc(h.cta)}</p><a class="btn" href="${h.ctaHref}">${L[lang].cta}</a></div>
</main>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'ItemList', name: h.h1,
    itemListElement: RECIPES.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + url(lang, r[lang].slug) })) };
  return page({ lang, title: h.title, description: h.description, canonical: h.path, alternates, ogImage: `/img/og/fitme-${lang}.jpg`, body, jsonld });
}

function write(rel, html) {
  const file = path.join(PUB, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return rel;
}

// Clean previous output so a removed recipe doesn't linger.
for (const dir of ['recipes', 'pt/receitas', 'br/receitas']) fs.rmSync(path.join(PUB, dir), { recursive: true, force: true });

const written = [];
for (const lang of LANGS) {
  written.push(write(HUB[lang].path, hubPage(lang)));
  for (const r of RECIPES) written.push(write(url(lang, r[lang].slug), recipePage(r, lang)));
}

// Sitemap: home pages + hubs + recipes, each with its language alternates.
const groups = [LANGS.map((l) => HOME[l]), LANGS.map((l) => HUB[l].path), ...RECIPES.map((r) => LANGS.map((l) => url(l, r[l].slug)))];
const alts = (g) => g.map((h, i) => `<xhtml:link rel="alternate" hreflang="${HREFLANG[LANGS[i]]}" href="${SITE}${h}"/>`).join('');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups.flatMap((g) => g.map((h) => `  <url><loc>${SITE}${h}</loc>${alts(g)}</url>`)).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(PUB, 'sitemap.xml'), sitemap);
console.log('Wrote', written.length, 'pages and sitemap.xml');
