// /pt/ and /br/ serve the same index.html as /. Crawlers (Facebook, WhatsApp, Google) don't run the page script that
// translates it, so this swaps the <head> tags between <!--meta:start--> and <!--meta:end--> for the visitor's language.
import type { Config, Context } from "@netlify/edge-functions";
import "../../public/i18n.js";

const SITE = "https://fitmeplan.com";
const META = {
  pt: {
    path: "/pt/", locale: "pt_PT",
    title: "FitMe: descobre exatamente o que comer para perder peso",
    description: "Plano grátis para perder peso: vê quando chegas ao teu peso objetivo, as tuas calorias e proteína diárias e 7 dias de refeições fáceis e ricas em proteína, com lista de compras.",
    share: "A data do teu objetivo, calorias diárias e 7 dias de refeições fáceis e ricas em proteína. Grátis, em cerca de 1 minuto.",
  },
  br: {
    path: "/br/", locale: "pt_BR",
    title: "FitMe: saiba exatamente o que comer para emagrecer",
    description: "Plano grátis para emagrecer: veja quando você chega ao seu peso ideal, suas calorias e proteína diárias e 7 dias de refeições fáceis e ricas em proteína, com lista de compras.",
    share: "A data do seu objetivo, calorias diárias e 7 dias de refeições fáceis e ricas em proteína. Grátis, em cerca de 1 minuto.",
  },
} as const;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const decode = (s: string) => s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const has = (m: Record<string, string>, k: string) => Object.prototype.hasOwnProperty.call(m, k);

// Translate the page's fixed text (the same table the page script uses) so search engines get Portuguese text without
// running JavaScript. Only <body>; script, style and comments are left alone. Text the table doesn't know stays as is.
export function translateBody(html: string, map: Record<string, string>): string {
  const i = html.search(/<body[\s>]/);
  if (i < 0 || !map) return html;
  const body = html.slice(i).replace(
    /(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->)|(\s(?:placeholder|aria-label|title)=")([^"]*)(")|>([^<]+)(?=<)/g,
    (m, keep, attrA, attrV, attrB, text) => {
      if (keep) return m;
      if (attrA) { const k = decode(attrV); return has(map, k) ? attrA + esc(map[k]) + attrB : m; }
      const k = decode(text).replace(/\s+/g, " ").trim();
      if (!k || !has(map, k)) return m;
      return ">" + text.match(/^\s*/)![0] + esc(map[k]) + text.match(/\s*$/)![0];
    },
  );
  return html.slice(0, i) + body;
}

export default async (req: Request, context: Context) => {
  const res = await context.next();
  if (!(res.headers.get("content-type") || "").includes("text/html")) return res;
  const lang = new URL(req.url).pathname.startsWith("/br") ? "br" : "pt";
  const m = META[lang];
  const block = `<!--meta:start-->
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<link rel="canonical" href="${SITE}${m.path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="FitMe">
<meta property="og:locale" content="${m.locale}">
<meta property="og:url" content="${SITE}${m.path}">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.share)}">
<meta property="og:image" content="${SITE}/img/og/fitme-${lang}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(m.title)}">
<meta name="twitter:card" content="summary_large_image">
<!--meta:end-->`;
  const STATIC = (globalThis as any).FITME_I18N?.STATIC;
  const html = translateBody((await res.text()), STATIC?.[lang]).replace(/<!--meta:start[\s\S]*?<!--meta:end-->/, block)
    // Quiet homepage links: point them at this language's pages for crawlers that don't run the page script
    // (the words stay English here; the page script translates them, and keeps them right when the visitor switches language).
    .replace('href="/recipes/" data-href-en', `href="/${lang}/receitas/" data-href-en`)
    .replace('href="/guides/calorie-deficit/" data-href-en', `href="/${lang}/guias/${lang === "br" ? "deficit-calorico" : "defice-calorico"}/" data-href-en`)
    .replace('href="/privacy.html" data-href-en', `href="/${lang}/privacy.html" data-href-en`)
    .replace('href="/login/" data-href-en', `href="/${lang}/login/" data-href-en`)
    .replace(/<html lang="en">/, `<html lang="${lang === "br" ? "pt-BR" : "pt-PT"}">`);
  const headers = new Headers(res.headers);
  headers.delete("content-length");
  return new Response(html, { status: res.status, headers });
};

export const config: Config = { path: ["/pt", "/pt/", "/br", "/br/"] };
