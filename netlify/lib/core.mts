// Shared backend helpers: subscriber storage (Netlify Blobs, EU region), Mailgun sending, email rendering.
import { getStore } from "@netlify/blobs";
import "../../public/meals.js";
import "../../public/meals.pt.js";

export const M: any = (globalThis as any).FITME_MEALS;

// ---------- Storage ----------
// Site-wide store kept in the EU. The region must be passed on every call or reads silently miss.
export function subscribers() {
  return getStore({ name: "fitme-subscribers", region: "eu-central-1", consistency: "strong" });
}

export type Subscriber = {
  email: string;
  status: "pending" | "active";
  tz: string;
  intake: number;
  prot: number;
  units: "metric" | "imperial";
  lang?: "en" | "pt";
  pending?: { tz: string; intake: number; prot: number; units: "metric" | "imperial"; lang?: "en" | "pt" } | null;
  confirmToken: string | null;
  unsubToken: string;
  createdAt: string;
  consentAt: string;
  consentText: string;
  confirmedAt?: string;
  lastConfirmMailAt?: string;
  lastSentDate?: string;
  lastShopDate?: string;
};

export async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const subKey = (hash: string) => `sub/${hash}`;
export const tokKey = (token: string) => `tok/${token}`;
export const unsKey = (token: string) => `uns/${token}`;

export function newToken() {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

export function validTimeZone(tz: unknown): tz is string {
  if (typeof tz !== "string" || tz.length > 64) return false;
  try { new Intl.DateTimeFormat("en", { timeZone: tz }); return true; } catch { return false; }
}

// ---------- Mailgun ----------
export function mailConfig() {
  const apiKey = Netlify.env.get("MAILGUN_API_KEY");
  const domain = Netlify.env.get("MAILGUN_DOMAIN");
  const region = (Netlify.env.get("MAILGUN_REGION") || "eu").toLowerCase();
  if (!apiKey || !domain) return null;
  return {
    apiKey,
    domain,
    base: region === "us" ? "https://api.mailgun.net" : "https://api.eu.mailgun.net",
    from: Netlify.env.get("MAIL_FROM") || `FitMe <plan@${domain}>`,
  };
}

type Mail = { to: string; subject: string; html: string; text: string; unsubUrl?: string; tag: string };

export async function sendMail(cfg: NonNullable<ReturnType<typeof mailConfig>>, mail: Mail) {
  const body = new URLSearchParams();
  body.set("from", cfg.from);
  body.set("to", mail.to);
  body.set("subject", mail.subject);
  body.set("html", mail.html);
  body.set("text", mail.text);
  body.set("o:tag", mail.tag);
  if (mail.unsubUrl) {
    body.set("h:List-Unsubscribe", `<${mail.unsubUrl}>`);
    body.set("h:List-Unsubscribe-Post", "List-Unsubscribe=One-Click");
  }
  const res = await fetch(`${cfg.base}/v3/${cfg.domain}/messages`, {
    method: "POST",
    headers: { Authorization: "Basic " + btoa(`api:${cfg.apiKey}`) },
    body,
  });
  if (!res.ok) throw new Error(`Mailgun ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

// ---------- Rendering ----------
export type Lang = "en" | "pt";
export const sitePath = (siteUrl: string, lang?: Lang) => (lang === "pt" ? `${siteUrl}/pt/` : `${siteUrl}/`);
export const T = {
  en: {
    htmlLang: "en", locale: "en-GB",
    confirmTitle: "Confirm your daily meal plan", updateTitle: "Confirm your updated meal plan",
    confirmLead: "Tap the button below to start getting your FitMe meal plan every morning at 7:00: four high-protein meals with ingredients and method, sized to your calories. Every Saturday you'll also get your shopping list for the week.",
    updateLead: "You asked to update the calories behind your daily FitMe meal plan. Confirm to apply the new portions.",
    confirmBtn: "Confirm subscription", updateBtn: "Confirm update",
    ignore: "If you didn't sign up, ignore this email and nothing will happen.", confirmFooter: "You're receiving this because this address was entered on FitMe.",
    yourDayPlan: (d: string) => `Your ${d} meal plan`, calories: "Calories", protein: "Protein", carbs: "Carbs", fat: "Fat", macro: ["P", "C", "F"],
    ingredients: "Ingredients", method: "Method", fullWeek: "See the full week and shopping list on FitMe →",
    footer: (k: string, site: string, unsub: string) => `Portions are sized for your daily intake of ${k}. Nutrition is estimated from standard ingredient values, so check labels if you have allergies. This is not medical advice.<br>To change your calories, recalculate on <a href="${site}" style="color:#6b655e;">FitMe</a> and sign up again with the same email. <a href="${unsub}" style="color:#6b655e;">Unsubscribe</a>.`,
    subject: (d: string, lunch: string) => `Your ${d} meal plan: ${lunch} & more`,
    textFull: "Full week", textUnsub: "Unsubscribe", textConfirm: "Confirm",
    expiredTitle: "This link has expired", expiredBody: (u: string) => `It may have been used already or replaced by a newer email. You can <a href="${u}" style="color:#2e6b4f;">sign up again on FitMe</a>.`,
    notSubTitle: "You're not subscribed", notSubBody: "This address isn't on the FitMe daily email list anymore.",
    stopTitle: "Stop the daily meal plan?", stopBody: "You'll stop getting FitMe emails and we'll delete your email address and settings.", stopBtn: "Unsubscribe",
    shopSubject: "Your shopping list for the week", shopTitle: "Your shopping list for the week",
    shopIntro: (k: string) => `Everything for the week's 28 meals, with portions sized to your daily intake of ${k}. Amounts are rounded up so you won't run short.`,
    shopExtras: "Herbs, spices & extras (check your cupboard)", shopCta: "See this week's recipes on FitMe →",
    shopFooter: (site: string, unsub: string) => `You get this list every Saturday as part of your FitMe meal plan. To change your calories, recalculate on <a href="${site}" style="color:#6b655e;">FitMe</a> and sign up again with the same email. <a href="${unsub}" style="color:#6b655e;">Unsubscribe</a>.`,
    doneTitle: "You're unsubscribed", doneBody: (u: string) => `Your email and settings have been deleted. You can <a href="${u}" style="color:#2e6b4f;">sign up again</a> any time.`,
  },
  pt: {
    htmlLang: "pt-PT", locale: "pt-PT",
    confirmTitle: "Confirma o teu plano de refeições diário", updateTitle: "Confirma o teu plano de refeições atualizado",
    confirmLead: "Carrega no botão abaixo para começares a receber o teu plano de refeições FitMe todas as manhãs às 7:00: quatro refeições ricas em proteína, com ingredientes e preparação, ajustadas às tuas calorias. Ao sábado recebes também a lista de compras da semana.",
    updateLead: "Pediste para atualizar as calorias do teu plano de refeições diário FitMe. Confirma para aplicar as novas porções.",
    confirmBtn: "Confirmar subscrição", updateBtn: "Confirmar atualização",
    ignore: "Se não fizeste esta subscrição, ignora este email e nada acontecerá.", confirmFooter: "Recebes este email porque este endereço foi introduzido no FitMe.",
    yourDayPlan: (d: string) => `O teu plano de ${d}`, calories: "Calorias", protein: "Proteína", carbs: "Hidratos", fat: "Gordura", macro: ["P", "H", "G"],
    ingredients: "Ingredientes", method: "Preparação", fullWeek: "Vê a semana completa e a lista de compras no FitMe →",
    footer: (k: string, site: string, unsub: string) => `As porções estão ajustadas à tua ingestão diária de ${k}. Os valores nutricionais são estimados a partir de valores-padrão dos ingredientes, por isso confirma os rótulos se tiveres alergias. Não é aconselhamento médico.<br>Para mudar as tuas calorias, recalcula no <a href="${site}" style="color:#6b655e;">FitMe</a> e volta a subscrever com o mesmo email. <a href="${unsub}" style="color:#6b655e;">Cancelar subscrição</a>.`,
    subject: (d: string, lunch: string) => `O teu plano de ${d}: ${lunch} ao almoço`,
    textFull: "Semana completa", textUnsub: "Cancelar subscrição", textConfirm: "Confirmar",
    expiredTitle: "Este link expirou", expiredBody: (u: string) => `Pode já ter sido usado ou substituído por um email mais recente. Podes <a href="${u}" style="color:#2e6b4f;">voltar a subscrever no FitMe</a>.`,
    notSubTitle: "Não tens subscrição ativa", notSubBody: "Este endereço já não está na lista do email diário do FitMe.",
    stopTitle: "Parar o plano de refeições diário?", stopBody: "Deixas de receber emails do FitMe e apagamos o teu endereço de email e as tuas definições.", stopBtn: "Cancelar subscrição",
    shopSubject: "A tua lista de compras da semana", shopTitle: "A tua lista de compras da semana",
    shopIntro: (k: string) => `Tudo o que precisas para as 28 refeições da semana, com porções ajustadas à tua ingestão diária de ${k}. As quantidades estão arredondadas para cima, para não te faltar nada.`,
    shopExtras: "Ervas, especiarias e extras (confirma na despensa)", shopCta: "Vê as receitas desta semana no FitMe →",
    shopFooter: (site: string, unsub: string) => `Recebes esta lista todos os sábados como parte do teu plano de refeições FitMe. Para mudar as tuas calorias, recalcula no <a href="${site}" style="color:#6b655e;">FitMe</a> e volta a subscrever com o mesmo email. <a href="${unsub}" style="color:#6b655e;">Cancelar subscrição</a>.`,
    doneTitle: "Subscrição cancelada", doneBody: (u: string) => `O teu email e as tuas definições foram apagados. Podes <a href="${u}" style="color:#2e6b4f;">voltar a subscrever</a> quando quiseres.`,
  },
};
export const COLORS = { bg: "#f0eee9", card: "#fbfaf7", ink: "#1e1c1a", muted: "#6b655e", line: "#ddd8cf", accent: "#2e6b4f", matcha: "#8fb339" };

export function esc(t: unknown) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const kcalL = (v: number, loc: string) => (Math.round(v / 10) * 10).toLocaleString(loc) + " kcal";

function shell(siteUrl: string, inner: string, footer: string, lang: Lang = "en") {
  const c = COLORS;
  return `<!doctype html><html lang="${T[lang].htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${c.bg};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:${c.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.bg};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:0 4px 16px;"><a href="${esc(sitePath(siteUrl, lang))}" style="text-decoration:none;color:${c.ink};">
<img src="${esc(siteUrl)}/brand/fitme-icon-512.png" width="36" height="36" alt="" style="vertical-align:middle;border-radius:9px;border:0;">
<span style="font-size:24px;font-weight:700;letter-spacing:-0.5px;vertical-align:middle;margin-left:8px;">Fit<span style="color:${c.accent};">Me</span></span></a></td></tr>
${inner}
<tr><td style="padding:18px 4px 0;font-size:12px;line-height:1.5;color:${c.muted};">${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

export function renderConfirmEmail(siteUrl: string, confirmUrl: string, isUpdate: boolean, lang: Lang = "en") {
  const c = COLORS, t = T[lang];
  const title = isUpdate ? t.updateTitle : t.confirmTitle;
  const lead = isUpdate ? t.updateLead : t.confirmLead;
  const inner = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:28px 24px;">
<h1 style="margin:0 0 10px;font-size:22px;line-height:1.25;">${title}</h1>
<p style="margin:0 0 22px;font-size:15px;line-height:1.55;color:${c.muted};">${lead}</p>
<a href="${esc(confirmUrl)}" style="display:inline-block;background:${c.accent};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:8px;">${isUpdate ? t.updateBtn : t.confirmBtn}</a>
<p style="margin:22px 0 0;font-size:13px;line-height:1.5;color:${c.muted};">${t.ignore}</p>
</td></tr>`;
  const text = `${title}\n\n${lead}\n\n${t.textConfirm}: ${confirmUrl}\n\n${t.ignore}`;
  return { subject: title, html: shell(siteUrl, inner, t.confirmFooter, lang), text };
}

export function renderDailyEmail(opts: { siteUrl: string; unsubUrl: string; dayIndex: number; dateLabel: string; intake: number; prot: number; imperial: boolean; lang?: Lang }) {
  const c = COLORS, lang: Lang = opts.lang === "pt" ? "pt" : "en", t = T[lang];
  const kcal = (v: number) => kcalL(v, t.locale);
  const site = sitePath(opts.siteUrl, lang);
  const meals = M.buildDay(opts.dayIndex, opts.intake, opts.prot, lang);
  const tot = M.dayTotals(meals);
  const dayName = lang === "pt" ? (globalThis as any).FITME_MEALS_PT.days[opts.dayIndex].toLowerCase() : M.DAY_NAMES[opts.dayIndex];
  const summary = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:20px 22px;">
<div style="font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${c.muted};">${esc(opts.dateLabel)}</div>
<h1 style="margin:4px 0 12px;font-size:24px;line-height:1.2;">${t.yourDayPlan(dayName)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:${c.muted};"><tr>
<td style="padding-right:10px;">${t.calories}<br><b style="font-size:16px;color:${c.ink};">${kcal(tot.k)}</b> <span>/ ${kcal(opts.intake)}</span></td>
<td style="padding-right:10px;">${t.protein}<br><b style="font-size:16px;color:${c.ink};">${Math.round(tot.p)} g</b> <span>/ ${opts.prot} g</span></td>
<td style="padding-right:10px;">${t.carbs}<br><b style="font-size:16px;color:${c.ink};">${Math.round(tot.c)} g</b></td>
<td>${t.fat}<br><b style="font-size:16px;color:${c.ink};">${Math.round(tot.f)} g</b></td></tr></table></td></tr>`;
  const cards = meals.map((m: any) => {
    const ing = m.lines.map((l: any) => {
      if (l[0] === "~") return `<tr><td></td><td style="padding:3px 0;color:${c.muted};font-size:13px;">${esc(l[1])}</td></tr>`;
      const a = M.amountText(l, opts.imperial, lang);
      return `<tr><td style="padding:3px 12px 3px 0;white-space:nowrap;font-family:Menlo,Consolas,monospace;font-size:13px;vertical-align:top;">${esc(a.q)}</td><td style="padding:3px 0;font-size:14px;">${esc(a.n)}</td></tr>`;
    }).join("");
    const steps = m.rec.steps.map((st: string) => `<li style="margin:0 0 6px;">${esc(st)}</li>`).join("");
    return `<tr><td style="height:14px;"></td></tr><tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:20px 22px;">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.accent};">${esc(m.slot.label)} · ${esc(m.rec.time)}</div>
<h2 style="margin:4px 0 8px;font-size:19px;line-height:1.25;">${esc(m.rec.name)}</h2>
<div style="font-size:12px;margin:0 0 12px;"><span style="background:${c.matcha};color:${c.ink};border-radius:20px;padding:2px 9px;font-weight:600;">${kcal(m.n.k)}</span>
<span style="color:${c.muted};margin-left:6px;">${t.macro[0]} ${Math.round(m.n.p)} g · ${t.macro[1]} ${Math.round(m.n.c)} g · ${t.macro[2]} ${Math.round(m.n.f)} g</span></div>
<div style="font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${c.muted};margin:0 0 4px;">${t.ingredients}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 12px;">${ing}</table>
<div style="font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${c.muted};margin:0 0 4px;">${t.method}</div>
<ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.5;">${steps}</ol></td></tr>`;
  }).join("");
  const cta = `<tr><td style="padding:18px 4px 0;font-size:14px;"><a href="${esc(site)}#meals" style="color:${c.accent};font-weight:600;">${t.fullWeek}</a></td></tr>`;
  const footer = t.footer(kcal(opts.intake), esc(site), esc(opts.unsubUrl));
  const subject = t.subject(dayName, meals[1].rec.name);
  const text = [`${t.yourDayPlan(dayName)} (${opts.dateLabel})`, `${t.calories} ${kcal(tot.k)} / ${kcal(opts.intake)} · ${t.protein} ${Math.round(tot.p)} g`, ""]
    .concat(meals.map((m: any) => {
      const ing = m.lines.map((l: any) => (l[0] === "~" ? `  - ${l[1]}` : `  - ${M.amountText(l, opts.imperial, lang).q} ${M.amountText(l, opts.imperial, lang).n}`)).join("\n");
      const steps = m.rec.steps.map((s: string, i: number) => `  ${i + 1}. ${s}`).join("\n");
      return `${m.slot.label.toUpperCase()}: ${m.rec.name} (${kcal(m.n.k)}, ${Math.round(m.n.p)} g ${t.protein.toLowerCase()})\n${t.ingredients}:\n${ing}\n${t.method}:\n${steps}\n`;
    }))
    .concat([`${t.textFull}: ${site}#meals`, `${t.textUnsub}: ${opts.unsubUrl}`]).join("\n");
  return { subject, html: shell(opts.siteUrl, summary + cards + cta, footer, lang), text };
}

export function renderShoppingEmail(opts: { siteUrl: string; unsubUrl: string; dateLabel: string; intake: number; prot: number; imperial: boolean; lang?: Lang }) {
  const c = COLORS, lang: Lang = opts.lang === "pt" ? "pt" : "en", t = T[lang];
  const site = sitePath(opts.siteUrl, lang);
  const list = M.shoppingList(opts.intake, opts.prot, lang, opts.imperial);
  const head = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:20px 22px;">
<div style="font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${c.muted};">${esc(opts.dateLabel)}</div>
<h1 style="margin:4px 0 8px;font-size:24px;line-height:1.2;">${t.shopTitle}</h1>
<p style="margin:0;font-size:14px;line-height:1.55;color:${c.muted};">${esc(t.shopIntro(kcalL(opts.intake, t.locale)))}</p></td></tr>`;
  const sections = list.groups.map((g: any) => `<tr><td style="height:14px;"></td></tr><tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:16px 22px;">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.accent};margin:0 0 6px;">${esc(g.aisle)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${g.items.map((it: any) => `<tr><td style="padding:6px 0;border-bottom:1px solid ${c.line};font-size:14px;">&#9744;&nbsp; ${esc(it.n)}</td><td align="right" style="padding:6px 0 6px 12px;border-bottom:1px solid ${c.line};font-family:Menlo,Consolas,monospace;font-size:13px;color:${c.muted};white-space:nowrap;">${esc(it.q)}</td></tr>`).join("")}</table></td></tr>`).join("");
  const extras = `<tr><td style="height:14px;"></td></tr><tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:16px 22px;">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.accent};margin:0 0 6px;">${t.shopExtras}</div>
<p style="margin:0;font-size:13.5px;line-height:1.55;color:${c.muted};">${esc(list.extras)}</p></td></tr>`;
  const cta = `<tr><td style="padding:18px 4px 0;font-size:14px;"><a href="${esc(site)}#meals" style="color:${c.accent};font-weight:600;">${t.shopCta}</a></td></tr>`;
  const text = [t.shopTitle + ` (${opts.dateLabel})`, t.shopIntro(kcalL(opts.intake, t.locale)), ""]
    .concat(list.groups.map((g: any) => g.aisle.toUpperCase() + "\n" + g.items.map((it: any) => `  [ ] ${it.n}: ${it.q}`).join("\n") + "\n"))
    .concat([t.shopExtras + ": " + list.extras, "", `${t.textFull}: ${site}#meals`, `${t.textUnsub}: ${opts.unsubUrl}`]).join("\n");
  return { subject: t.shopSubject, html: shell(opts.siteUrl, head + sections + extras + cta, t.shopFooter(esc(site), esc(opts.unsubUrl)), lang), text };
}

export function htmlPage(siteUrl: string, title: string, body: string, status = 200, lang: Lang = "en") {
  const c = COLORS;
  return new Response(`<!doctype html><html lang="${T[lang].htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · FitMe</title><link rel="icon" href="/favicon.svg"></head>
<body style="margin:0;background:${c.bg};color:${c.ink};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
<main style="max-width:480px;margin:12vh auto;padding:0 18px;"><a href="${esc(sitePath(siteUrl, lang))}" style="text-decoration:none;color:${c.ink};font-size:26px;font-weight:700;">Fit<span style="color:${c.accent};">Me</span></a>
<div style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:24px;margin-top:16px;"><h1 style="margin:0 0 10px;font-size:21px;">${esc(title)}</h1>${body}</div></main></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });
}
