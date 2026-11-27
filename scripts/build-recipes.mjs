// Builds the static recipe pages and hubs into public/: /recipes/, /pt/receitas/, /br/receitas/ and one page per recipe.
// Run after changing a recipe or scripts/recipes-content.mjs:  node scripts/build-recipes.mjs
// The output is committed (Netlify has no build step). Numbers come from public/meals*.js via FITME_MEALS.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { HUB, RECIPES as ALL_RECIPES, SCHEMA } from './recipes-content.mjs';
import { GUIDES, GUIDE_HUB, ABOUT } from './guides-content.mjs';
import { BR_EXTRA } from './recipes-br-extra.mjs';

// Draft pages (draft: true) are left out of the live build. DRAFTS=1 node scripts/build-recipes.mjs --out=<dir>
// builds everything, drafts included, into another folder for review; never commit that output.
const DRAFTS = process.env.DRAFTS === '1';
const OUT_ARG = process.argv.find((a) => a.startsWith('--out='));
const RECIPES = ALL_RECIPES.filter((r) => DRAFTS || !r.draft);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public');
const PUB = OUT_ARG ? path.resolve(OUT_ARG.slice(6)) : SRC;
const SITE = 'https://fitmeplan.com';
const LANGS = ['en', 'pt', 'br'];
const HTML_LANG = { en: 'en', pt: 'pt-PT', br: 'pt-BR' };
const HREFLANG = { en: 'en', pt: 'pt-PT', br: 'pt-BR' };
const OG_LOCALE = { en: 'en_GB', pt: 'pt_PT', br: 'pt_BR' };

// Load the meal data exactly as the browser does.
const ctx = { console };
ctx.globalThis = ctx; ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['meals.js', 'meals.pt.js', 'meals.br.js']) vm.runInContext(fs.readFileSync(path.join(SRC, f), 'utf8'), ctx, { filename: f });
const M = ctx.FITME_MEALS;

const L = {
  en: {
    share: 'Share this recipe', shareNative: 'Share…', copy: 'Copy link', copied: 'Link copied', igCopied: 'Link copied. Paste it in an Instagram story or message.', igOpen: 'Open Instagram', manual: 'Copy this link:', email: 'Email', shareText: (n, k, p) => `${n}: ${k} kcal, ${p} g protein. Free recipe on FitMe`,
    home: 'Home', recipes: 'Recipes', perPortion: 'per portion', kcal: 'kcal', protein: 'protein', carbs: 'carbs', fat: 'fat', time: 'Time',
    ingredients: 'Ingredients (1 portion)', method: 'Method', tips: 'Tips', fits: 'Where it fits in your day', scale: 'Cooking for more people? Multiply everything. In your FitMe plan, the amounts are scaled to your own calories.',
    cta: 'Get my free plan', ctaLead: 'Want a full week of meals like this, sized to your goal? Get your free FitMe plan and see when you\'ll reach your goal weight.',
    more: 'More recipes', privacy: 'Privacy policy', g: 'g', serving: '1 portion', category: { breakfast: 'Breakfast', main: 'Main course', snack: 'Snack' }, imgAlt: (n) => n },
  pt: {
    share: 'Partilha esta receita', shareNative: 'Partilhar…', copy: 'Copiar link', copied: 'Link copiado', igCopied: 'Link copiado. Cola-o numa story ou mensagem do Instagram.', igOpen: 'Abrir o Instagram', manual: 'Copia este link:', email: 'Email', shareText: (n, k, p) => `${n}: ${k} kcal, ${p} g de proteína. Receita grátis no FitMe`,
    home: 'Início', recipes: 'Receitas', perPortion: 'por dose', kcal: 'kcal', protein: 'proteína', carbs: 'hidratos', fat: 'gordura', time: 'Tempo',
    ingredients: 'Ingredientes (1 dose)', method: 'Preparação', tips: 'Dicas', fits: 'Como encaixa no teu dia', scale: 'Vais cozinhar para mais pessoas? Multiplica tudo. No teu plano FitMe, as quantidades são ajustadas às tuas calorias.',
    cta: 'Quero o meu plano grátis', ctaLead: 'Queres uma semana inteira de refeições assim, ajustada ao teu objetivo? Faz o teu plano grátis no FitMe e vê quando chegas ao teu peso.',
    more: 'Mais receitas', privacy: 'Política de privacidade', g: 'g', serving: '1 dose', category: { breakfast: 'Pequeno-almoço', main: 'Prato principal', snack: 'Lanche' }, imgAlt: (n) => n },
  br: {
    share: 'Compartilhe esta receita', shareNative: 'Compartilhar…', copy: 'Copiar link', copied: 'Link copiado', igCopied: 'Link copiado. Cole num story ou mensagem do Instagram.', igOpen: 'Abrir o Instagram', manual: 'Copie este link:', email: 'E-mail', shareText: (n, k, p) => `${n}: ${k} kcal, ${p} g de proteína. Receita grátis no FitMe`,
    home: 'Início', recipes: 'Receitas', perPortion: 'por porção', kcal: 'kcal', protein: 'proteína', carbs: 'carboidratos', fat: 'gordura', time: 'Tempo',
    ingredients: 'Ingredientes (1 porção)', method: 'Modo de preparo', tips: 'Dicas', fits: 'Como encaixa no seu dia', scale: 'Vai fazer para mais pessoas ou para a semana? É só multiplicar. No seu plano FitMe, as quantidades já vêm ajustadas às suas calorias.',
    cta: 'Quero meu plano grátis', ctaLead: 'Quer uma semana inteira de refeições assim, ajustada ao seu objetivo? Monte seu plano grátis no FitMe e veja quando você chega ao seu peso.',
    more: 'Mais receitas', privacy: 'Política de privacidade', g: 'g', serving: '1 porção', category: { breakfast: 'Café da manhã', main: 'Prato principal', snack: 'Lanche' }, imgAlt: (n) => n },
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
    const v = M.RECIPES_VEG[k].findIndex((r) => r.img === img);
    if (v >= 0) return { k, i: v, veg: true, rec: M.RECIPES_VEG[k][v] };
  }
  for (const [pool, trKey] of VARIANTS) {
    const t = (ctx[pool] || []).findIndex((r) => r && r.img === img);
    if (t >= 0) return { trKey, t, rec: ctx[pool][t] };
  }
  const B = M.MENU_B;
  for (const k of ['breakfast', 'main', 'snack', 'veg', 'fish', 'pork']) {
    const t = B[k].findIndex((r) => r && r.img === img);
    if (t >= 0) return { menuB: k, t, rec: B[k][t] };
  }
  throw new Error('No recipe with img ' + img);
}
function data(img, lang) {
  const { k, i, veg, trKey, menuB, t, rec } = source(img);
  const nu = M.nutrition(rec.ing);
  const tr = lang === 'en' ? null : menuB ? M.ptData(lang).menuB[menuB][t] : trKey ? M.ptData(lang)[trKey][t] : M.ptData(lang)[veg ? 'recipesVeg' : 'recipes'][k][i];
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
// A step's short name for HowToStep: its first sentence, without the full stop.
const stepName = (s) => s.split(/(?<=[.!?])\s/)[0].replace(/[.!?:]$/, '');
const iso = (t) => 'PT' + parseInt(t, 10) + 'M';

const url = (lang, slug) => (lang === 'en' ? '/recipes/' : HUB[lang].path) + slug + '/';

function page({ lang, title, description, canonical, alternates, ogImage, body, jsonld, ogType = 'website' }) {
  const alt = alternates.map(([l, h]) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${h}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE}${alternates.find((a) => a[0] === 'en')[1]}">`;
  // No language switch in the header: the language is an account setting (see track.js); hreflang links stay in <head>.
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
</header>
${body}
<footer><a href="${HUB[lang].path}">${L[lang].recipes}</a> · <a href="${GUIDE_HUB[lang].path}">${GUIDE_HUB[lang].label}</a> · <a href="${ABOUT[lang].path}">${ABOUT[lang].label}</a> · <a href="${PRIVACY[lang]}">${L[lang].privacy}</a></footer>
</div>
<script src="/track.js"></script>
<script src="/share.js" defer></script>
<script>if (window.FITME_TRACK) FITME_TRACK.init({});</script>
</body>
</html>
`;
}

// A recipe has a photo once public/img/meals/<img>-1200.webp exists. Until then the page shows no hero, the cards a plain
// tile, and the Recipe schema has no image (Google then shows the page as a normal result, without the recipe card).
const hasPhoto = (img) => fs.existsSync(path.join(SRC, 'img', 'meals', img + '-1200.webp'));
function picture(img, alt, eager) {
  if (!hasPhoto(img)) return '';
  return `<img class="hero" src="/img/meals/${img}-720.webp" srcset="/img/meals/${img}-720.webp 720w, /img/meals/${img}-1200.webp 1200w" sizes="(max-width: 760px) 100vw, 720px" width="1200" height="750" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>`;
}

function card(r, lang) {
  const d = data(r.img, lang);
  const thumb = hasPhoto(r.img) ? `<img src="/img/meals/${r.img}-720.webp" width="1200" height="750" loading="lazy" alt="">` : '<span class="card-ph" aria-hidden="true"></span>';
  return `<li><a href="${url(lang, r[lang].slug)}">${thumb}<span class="card-name">${esc(d.name)}</span><span class="card-meta">${d.kcal} ${L[lang].kcal} · ${d.p} ${L[lang].g} ${L[lang].protein} · ${esc(d.time)}</span></a></li>`;
}

// Share bar at the end of each recipe. Links carry utm_source=<channel>&utm_medium=share&utm_campaign=recipe.
// Instagram has no web share link: on phones it uses the share sheet, elsewhere it copies the link. Wired up by /share.js.
function shareBlock(r, lang, d) {
  const t = L[lang], link = SITE + url(lang, r[lang].slug);
  const btn = (ch, label, extra = '') => `<button type="button" class="sh sh-${ch}" data-ch="${ch}"${extra}>${label}</button>`;
  return `<section class="share" aria-label="${esc(t.share)}" data-url="${esc(link)}" data-text="${esc(t.shareText(d.name, d.kcal, d.p))}" data-img="${SITE}${hasPhoto(r.img) ? `/img/meals/${r.img}-1200.webp` : `/img/og/fitme-${lang}.jpg`}" data-copied="${esc(t.copied)}" data-ig="${esc(t.igCopied)}" data-ig-open="${esc(t.igOpen)}" data-manual="${esc(t.manual)}" data-recipe="${esc(r[lang].slug)}">
<h2>${t.share}</h2>
<div class="sh-row">${btn('native', t.shareNative, ' hidden')}${btn('whatsapp', 'WhatsApp')}${btn('instagram', 'Instagram')}${btn('facebook', 'Facebook')}${btn('pinterest', 'Pinterest')}${btn('x', 'X')}${btn('telegram', 'Telegram')}${btn('email', t.email)}${btn('copy', t.copy)}</div>
<p class="sh-toast" role="status" aria-live="polite" hidden></p>
</section>`;
}

function recipePage(r, lang) {
  const c = r[lang]; const d = data(r.img, lang); const t = L[lang];
  const alternates = LANGS.map((l) => [l, url(l, r[l].slug)]);
  const crumbs = `<nav class="crumbs" aria-label="breadcrumb"><a href="${HOME[lang]}">${t.home}</a> › <a href="${HUB[lang].path}">${t.recipes}</a></nav>`;
  // Brazilian pages carry their own intro, tips, storage note and FAQ (recipes-br-extra.mjs), so they don't read as copies of /pt/.
  const x = lang === 'br' ? BR_EXTRA[r.img] : null;
  if (lang === 'br' && !x) throw new Error('Missing BR_EXTRA for ' + r.img);
  const intro = x ? x.intro : c.intro, tipList = x ? x.tips : c.tips;
  const tips = tipList.length ? `<h2>${t.tips}</h2>\n<ul>${tipList.map((y) => `<li>${x ? esc(y) : y}</li>`).join('')}</ul>` : '';
  const store = x ? `<h2>${esc(x.store[0])}</h2>\n<p>${esc(x.store[1])}</p>` : '';
  const faqHtml = x ? `<section class="faq"><h2>Perguntas frequentes</h2>\n${x.faq.map(([q, a]) => `<h3>${esc(q)}</h3>\n<p>${esc(a)}</p>`).join('\n')}</section>` : '';
  // Related recipes: same course first (in content order, starting after this one), then the rest; 8 cards.
  const others = RECIPES.filter((o) => o !== r), at = RECIPES.indexOf(r);
  const rot = (a) => { const j = a.findIndex((o) => RECIPES.indexOf(o) > at); return j < 0 ? a : [...a.slice(j), ...a.slice(0, j)]; };
  const more = [...rot(others.filter((o) => o.course === r.course)), ...rot(others.filter((o) => o.course !== r.course))].slice(0, 8).map((o) => card(o, lang)).join('');
  const body = `<main>
${crumbs}
<article>
<h1>${esc(c.h1)}</h1>
${intro.map((p) => `<p class="lead">${esc(p)}</p>`).join('\n')}
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
<ol class="steps">${d.steps.map((x, i) => `<li id="step-${i + 1}">${esc(x)}</li>`).join('')}</ol>
${tips}${store ? '\n' + store : ''}
<h2>${t.fits}</h2>
<p>${esc(c.fits)}</p>${faqHtml ? '\n' + faqHtml : ''}
${shareBlock(r, lang, d)}
<div class="cta"><p>${esc(t.ctaLead)}</p><a class="btn" href="${HOME[lang]}">${t.cta}</a></div>
</article>
<section class="more"><h2>${t.more}</h2><ul class="cards">${more}</ul></section>
</main>`;
  const sx = SCHEMA[r.img];
  if (!sx || !sx.cuisine || !sx.cuisine[lang] || !sx[lang]) throw new Error('Missing SCHEMA (cuisine/keywords) for ' + r.img + ' ' + lang);
  const jsonld = [{
    '@context': 'https://schema.org', '@type': 'Recipe', name: d.name, description: c.description,
    ...(hasPhoto(r.img) ? { image: [`${SITE}/img/meals/${r.img}-1200.webp`] } : {}), author: { '@type': 'Organization', name: 'FitMe', url: SITE },
    inLanguage: HTML_LANG[lang], recipeCategory: t.category[r.course], recipeCuisine: sx.cuisine[lang], keywords: sx[lang], recipeYield: t.serving,
    ...(/[+]/.test(source(r.img).rec.time) ? { prepTime: iso(d.time), cookTime: 'PT0M', totalTime: 'PT4H' + parseInt(d.time, 10) + 'M' } : { totalTime: iso(d.time) }),
    recipeIngredient: d.ing, recipeInstructions: d.steps.map((s, i) => ({ '@type': 'HowToStep', name: stepName(s), text: s, url: `${SITE}${url(lang, c.slug)}#step-${i + 1}` })),
    nutrition: { '@type': 'NutritionInformation', servingSize: t.serving, calories: d.kcal + ' kcal', proteinContent: d.p + ' g', carbohydrateContent: d.c + ' g', fatContent: d.f + ' g' },
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: SITE + HOME[lang] },
      { '@type': 'ListItem', position: 2, name: t.recipes, item: SITE + HUB[lang].path },
      { '@type': 'ListItem', position: 3, name: d.name, item: SITE + url(lang, c.slug) },
    ],
  }];
  if (x) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: x.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  return page({ lang, title: c.title, description: c.description, canonical: url(lang, c.slug), alternates, ogImage: hasPhoto(r.img) ? `/img/meals/${r.img}-1200.webp` : `/img/og/fitme-${lang}.jpg`, body, jsonld, ogType: 'article' });
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
${group('snack')}
<div class="cta"><p>${esc(h.cta)}</p><a class="btn" href="${h.ctaHref}">${L[lang].cta}</a></div>
</main>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'ItemList', name: h.h1,
    itemListElement: RECIPES.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + url(lang, r[lang].slug) })) };
  return page({ lang, title: h.title, description: h.description, canonical: h.path, alternates, ogImage: `/img/og/fitme-${lang}.jpg`, body, jsonld });
}

// ---------- Guides (pillar articles) and About ----------
const GUIDE_TXT = {
  en: { home: 'Home', hubH1: 'Weight loss guides', hubTitle: 'Weight loss guides: calorie deficit, protein and meal plans | FitMe', hubDesc: 'Plain guides to losing weight with a calorie deficit: how it works, how fast to go and what to eat. Written from experience, with sources.', hubIntro: 'Guides to losing weight without guessing, written from experience and backed by public health guidance.', updated: 'Updated', read: 'Read the guide' },
  pt: { home: 'Início', hubH1: 'Guias para emagrecer', hubTitle: 'Guias para emagrecer: défice calórico, proteína e planos | FitMe', hubDesc: 'Guias simples para emagrecer com um défice calórico: como funciona, a que ritmo ir e o que comer. Escritos a partir da experiência, com fontes.', hubIntro: 'Guias para emagrecer sem adivinhar, escritos a partir da experiência e apoiados nas recomendações de saúde pública.', updated: 'Atualizado a', read: 'Ler o guia' },
  br: { home: 'Início', hubH1: 'Guias para emagrecer', hubTitle: 'Guias para emagrecer: déficit calórico, proteína e cardápios | FitMe', hubDesc: 'Guias simples para emagrecer com déficit calórico: como funciona, em que ritmo ir e o que comer. Escritos a partir da experiência, com fontes.', hubIntro: 'Guias para emagrecer sem chutar, escritos a partir da experiência e apoiados nas recomendações de saúde pública.', updated: 'Atualizado em', read: 'Ler o guia' },
};
const DATE_FMT = { en: 'en-GB', pt: 'pt-PT', br: 'pt-BR' };
const fmtDate = (d, lang) => new Date(d + 'T12:00:00Z').toLocaleDateString(DATE_FMT[lang], { day: 'numeric', month: 'long', year: 'numeric' });
const guideUrl = (lang, slug) => GUIDE_HUB[lang].path + slug + '/';

// Small Markdown subset -> HTML (see guides-content.mjs). Returns { html, faq: [[q, a], ...] }.
function inlineMd(t) {
  return esc(t)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, a, h) => `<a href="${h}">${a}</a>`);
}
const plain = (t) => t.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const slugify = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function renderMd(md, lang, faqHeading) {
  const blocks = md.trim().split(/\n\s*\n/);
  const out = [], faq = []; let inFaq = false;
  for (const b of blocks) {
    const lines = b.split('\n');
    if (b.startsWith('### ')) { const h = b.slice(4).trim(); inFaq = h === faqHeading; out.push(`<h2 id="${slugify(h)}">${inlineMd(h)}</h2>`); continue; }
    const cta = b.match(/^\[\[cta:(.+)\]\]$/);
    if (cta) { out.push(`<p class="guide-cta"><a class="btn" href="${HOME[lang]}">${esc(cta[1])}</a></p>`); continue; }
    if (lines.every((l) => l.startsWith('- '))) { out.push('<ul>' + lines.map((l) => `<li>${inlineMd(l.slice(2))}</li>`).join('') + '</ul>'); continue; }
    if (lines.every((l) => l.startsWith('|'))) {
      const cells = (l) => l.slice(1, -1).split('|').map((c) => c.trim());
      const [head, , ...rows] = lines;
      out.push(`<div class="table-wrap"><table><thead><tr>${cells(head).map((c) => `<th scope="col">${inlineMd(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${cells(r).map((c) => `<td>${inlineMd(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    const text = lines.join(' ');
    const q = inFaq && text.match(/^\*\*(.+?\?)\*\*\s+(.+)$/);
    if (q) faq.push([q[1], plain(q[2])]);
    out.push(`<p>${inlineMd(text)}</p>`);
  }
  return { html: out.join('\n'), faq };
}

function guidePage(g, lang) {
  const c = g[lang], t = GUIDE_TXT[lang];
  const alternates = LANGS.map((l) => [l, guideUrl(l, g[l].slug)]);
  const { html, faq } = renderMd(c.body, lang, c.faqHeading);
  const crumbs = `<nav class="crumbs" aria-label="breadcrumb"><a href="${HOME[lang]}">${t.home}</a> › <a href="${GUIDE_HUB[lang].path}">${GUIDE_HUB[lang].label}</a></nav>`;
  const sources = g.sources.length ? `<h2>${esc(c.sourcesLabel)}</h2>\n<ul class="sources">${g.sources.map(([n, u]) => `<li><a href="${u}" rel="noopener">${esc(n)}</a></li>`).join('')}</ul>` : '';
  const body = `<main>
${crumbs}
<article class="guide">
<h1>${esc(c.h1)}</h1>
<p class="note">${t.updated} <time datetime="${g.updated}">${fmtDate(g.updated, lang)}</time> · <a href="${ABOUT[lang].path}">FitMe</a></p>
${html}
${sources}
</article>
</main>`;
  const link = SITE + guideUrl(lang, c.slug);
  const jsonld = [{
    '@context': 'https://schema.org', '@type': 'Article', headline: c.h1, description: c.description, inLanguage: HTML_LANG[lang],
    datePublished: g.published, dateModified: g.updated, mainEntityOfPage: link, image: [`${SITE}/img/og/fitme-${lang}.jpg`],
    author: { '@type': 'Organization', name: 'FitMe', url: SITE + ABOUT[lang].path }, publisher: { '@type': 'Organization', name: 'FitMe', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/brand/fitme-icon-512.png` } },
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: SITE + HOME[lang] },
      { '@type': 'ListItem', position: 2, name: GUIDE_HUB[lang].label, item: SITE + GUIDE_HUB[lang].path },
      { '@type': 'ListItem', position: 3, name: c.h1, item: link },
    ],
  }];
  if (faq.length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  return page({ lang, title: c.title, description: c.description, canonical: guideUrl(lang, c.slug), alternates, ogImage: `/img/og/fitme-${lang}.jpg`, body, jsonld, ogType: 'article' });
}

function guideHubPage(lang) {
  const t = GUIDE_TXT[lang];
  const alternates = LANGS.map((l) => [l, GUIDE_HUB[l].path]);
  const items = GUIDES.map((g) => `<li><a href="${guideUrl(lang, g[lang].slug)}"><span class="card-name">${esc(g[lang].h1)}</span><span class="card-meta">${esc(g[lang].description)}</span></a></li>`).join('');
  const body = `<main>
<h1>${esc(t.hubH1)}</h1>
<p class="lead">${esc(t.hubIntro)}</p>
<ul class="guide-list">${items}</ul>
<div class="cta"><p>${esc(HUB[lang].cta)}</p><a class="btn" href="${HUB[lang].ctaHref}">${L[lang].cta}</a></div>
</main>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'ItemList', name: t.hubH1, itemListElement: GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + guideUrl(lang, g[lang].slug) })) };
  return page({ lang, title: t.hubTitle, description: t.hubDesc, canonical: GUIDE_HUB[lang].path, alternates, ogImage: `/img/og/fitme-${lang}.jpg`, body, jsonld });
}

function aboutPage(lang) {
  const a = ABOUT[lang];
  const alternates = LANGS.map((l) => [l, ABOUT[l].path]);
  const { html } = renderMd(a.body, lang, null);
  const body = `<main>
<article class="guide">
<h1>${esc(a.h1)}</h1>
${html}
</article>
</main>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'AboutPage', name: a.h1, inLanguage: HTML_LANG[lang], url: SITE + a.path,
    about: { '@type': 'Organization', name: 'FitMe', url: SITE, logo: `${SITE}/brand/fitme-icon-512.png` } };
  return page({ lang, title: a.title, description: a.description, canonical: a.path, alternates, ogImage: `/img/og/fitme-${lang}.jpg`, body, jsonld });
}

function write(rel, html) {
  const file = path.join(PUB, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  HTML_OUT.set(rel, html);
  return rel;
}

// Sitemap lastmod: a page keeps its previous date unless its HTML changed (dates read from the old sitemap).
const TODAY = new Date().toISOString().slice(0, 10);
const prevHtml = new Map(), prevMod = new Map();
const oldMap = path.join(PUB, 'sitemap.xml');
if (fs.existsSync(oldMap)) for (const m of fs.readFileSync(oldMap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>(?:.*?<lastmod>([^<]+)<\/lastmod>)?/g)) prevMod.set(m[1], m[2]);
for (const dir of ['recipes', 'pt/receitas', 'br/receitas', 'guides', 'pt/guias', 'br/guias', 'about', 'pt/sobre', 'br/sobre']) {
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name === 'index.html') prevHtml.set('/' + path.relative(PUB, path.dirname(f)).split(path.sep).join('/') + '/', fs.readFileSync(f, 'utf8')); } };
  walk(path.join(PUB, dir));
}
const HTML_OUT = new Map();

// Clean previous output so a removed recipe doesn't linger.
for (const dir of ['recipes', 'pt/receitas', 'br/receitas', 'guides', 'pt/guias', 'br/guias', 'about', 'pt/sobre', 'br/sobre']) fs.rmSync(path.join(PUB, dir), { recursive: true, force: true });

const written = [];
for (const lang of LANGS) {
  written.push(write(HUB[lang].path, hubPage(lang)));
  for (const r of RECIPES) written.push(write(url(lang, r[lang].slug), recipePage(r, lang)));
  written.push(write(GUIDE_HUB[lang].path, guideHubPage(lang)));
  for (const g of GUIDES) written.push(write(guideUrl(lang, g[lang].slug), guidePage(g, lang)));
  written.push(write(ABOUT[lang].path, aboutPage(lang)));
}

// Sitemap: home pages + hubs + recipes, each with its language alternates.
const groups = [LANGS.map((l) => HOME[l]), LANGS.map((l) => HUB[l].path), ...RECIPES.map((r) => LANGS.map((l) => url(l, r[l].slug))),
  LANGS.map((l) => GUIDE_HUB[l].path), ...GUIDES.map((g) => LANGS.map((l) => guideUrl(l, g[l].slug))), LANGS.map((l) => ABOUT[l].path)];
// Built pages: today if new or changed, else the old date. Home pages (not built here) keep any old date.
const lastmod = (h) => { const out = HTML_OUT.get(h); if (!out) return prevMod.get(SITE + h); const was = prevHtml.get(h); return was === out && prevMod.get(SITE + h) ? prevMod.get(SITE + h) : TODAY; };
const alts = (g) => g.map((h, i) => `<xhtml:link rel="alternate" hreflang="${HREFLANG[LANGS[i]]}" href="${SITE}${h}"/>`).join('');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups.flatMap((g) => g.map((h) => `  <url><loc>${SITE}${h}</loc>${lastmod(h) ? `<lastmod>${lastmod(h)}</lastmod>` : ''}${alts(g)}</url>`)).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(PUB, 'sitemap.xml'), sitemap);
console.log('Wrote', written.length, 'pages and sitemap.xml');
