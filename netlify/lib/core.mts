// Shared backend helpers: subscriber storage (Netlify Blobs, EU region), Mailgun sending, email rendering.
import { getStore } from "@netlify/blobs";
import "../../public/meals.js";
import "../../public/meals.pt.js";
import "../../public/meals.br.js";

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
  lang?: "en" | "pt" | "br";
  diet?: "all" | "veg";
  // Protein picks from the site (2 or more of M.PROTEINS); shape the lunches and dinners. Older records only have diet.
  prots?: string[];
  pending?: { tz: string; intake: number; prot: number; units: "metric" | "imperial"; lang?: "en" | "pt" | "br"; diet?: "all" | "veg"; prots?: string[] } | null;
  confirmToken: string | null;
  unsubToken: string;
  createdAt: string;
  consentAt: string;
  consentText: string;
  confirmedAt?: string;
  lastConfirmMailAt?: string;
  // Confirmation reminders to sign-ups that haven't confirmed (send-reminders): how many went out and when the last one did.
  reminders?: number;
  lastReminderAt?: string;
  // Which email the confirm click came from: "email" (the first one), "r1" or "r2" (reminders).
  confirmedVia?: "email" | "r1" | "r2";
  lastSentDate?: string;
  lastShopDate?: string;
  // Random code in the tracked links of the daily and Saturday emails (/api/go?c=…); maps back via clk/<token>.
  clickToken?: string;
  // Random code in the Saturday email's "Open my list" link: opens only this person's shopping list (lst/<token>), no log-in.
  listToken?: string;
  // Set only when the visitor accepted Meta cookies at sign-up; removed once CompleteRegistration is sent.
  meta?: { fbp?: string; fbc?: string; url?: string } | null;
  // Which ad link brought them (utm_* labels from the URL at first sign-up) and their country then. First-party only.
  src?: { source?: string; medium?: string; campaign?: string; content?: string; term?: string } | null;
  country?: string;
  // When a logged-in user last changed their plan without a confirmation email (account page or recalculating).
  planUpdatedAt?: string;
  // Optional account profile, filled in by the user on /account/.
  profile?: Profile | null;
};

export type Profile = {
  firstName?: string;
  lastName?: string;
  phone?: string;   // mobile, international format (+ and digits)
  social?: string;  // link to a social profile (http/https)
  coach?: boolean;  // interested in guidance from a Fitness Coach
  plan?: boolean;   // interested in a personalised plan
  interestText?: string; // wording shown when an interest was ticked
  interestAt?: string;
  updatedAt?: string;
};

// Proteins edited on the account page (calories and protein come from the calculator). Returns { plan } or { error }.
export function cleanPlan(v: any): { plan?: Pick<Subscriber, "prots" | "diet">; error?: string } {
  if (!v || typeof v !== "object") return { error: "bad_request" };
  const prots = cleanProts(v.prots);
  if (!prots) return { error: "prots" };
  return { plan: { prots, diet: prots.some((x) => ["chicken", "beef", "pork", "fish"].includes(x)) ? "all" : "veg" } };
}

const PLAN_NOTICE = {
  en: { subject: "Your FitMe plan was updated", title: "Your meal plan was updated",
    lead: (k: string, p: string) => `Your FitMe plan was just recalculated with this email: ${k} and ${p} protein a day. Your next email uses the new portions.`,
    notYou: (u: string) => `Wasn't you? <a href="${u}" style="color:#2e6b4f;">Log in</a> to check your plan, or recalculate on FitMe to change it back.`, notYouText: "Wasn't you? Log in to check your plan" },
  pt: { subject: "O teu plano FitMe foi atualizado", title: "O teu plano de refeições foi atualizado",
    lead: (k: string, p: string) => `O teu plano FitMe acabou de ser recalculado com este email: ${k} e ${p} de proteína por dia. O próximo email já usa as novas porções.`,
    notYou: (u: string) => `Não foste tu? <a href="${u}" style="color:#2e6b4f;">Entra na tua conta</a> para veres o teu plano, ou recalcula no FitMe para o voltares a mudar.`, notYouText: "Não foste tu? Entra na tua conta para veres o teu plano" },
  br: { subject: "Seu plano FitMe foi atualizado", title: "Seu plano de refeições foi atualizado",
    lead: (k: string, p: string) => `Seu plano FitMe acabou de ser recalculado com este e-mail: ${k} e ${p} de proteína por dia. O próximo e-mail já usa as novas porções.`,
    notYou: (u: string) => `Não foi você? <a href="${u}" style="color:#2e6b4f;">Entre na sua conta</a> para ver seu plano, ou recalcule no FitMe para mudar de volta.`, notYouText: "Não foi você? Entre na sua conta para ver seu plano" },
};

export function renderPlanUpdatedEmail(siteUrl: string, st: { intake: number; prot: number; lang?: Lang }) {
  const c = COLORS, lang = asLang(st.lang), t = PLAN_NOTICE[lang], loc = T[lang].locale;
  const k = kcalL(st.intake, loc), p = `${st.prot.toLocaleString(loc)} g`;
  const login = `${siteUrl}${lang === "en" ? "" : "/" + lang}/login/`;
  const inner = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:28px 24px;">
<h1 style="margin:0 0 10px;font-size:22px;line-height:1.25;">${t.title}</h1>
<p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${c.muted};">${t.lead(k, p)}</p>
<p style="margin:0;font-size:14px;line-height:1.55;color:${c.muted};">${t.notYou(esc(login))}</p>
</td></tr>`;
  return { subject: t.subject, html: shell(siteUrl, inner, T[lang].confirmFooter, lang), text: `${t.title}\n\n${t.lead(k, p)}\n\n${t.notYouText}: ${login}` };
}

export const INTEREST_TEXT = "Tick if you're interested and FitMe may email you about it. You can untick at any time.";

// Clean the profile sent from the account page. Returns { profile } or { error } naming the bad field.
export function cleanProfile(v: any, prev: Profile | null | undefined): { profile?: Profile; error?: string } {
  if (!v || typeof v !== "object") return { error: "bad_request" };
  const str = (x: unknown, max: number) => (typeof x === "string" ? x.trim().replace(/\s+/g, " ").slice(0, max) : "");
  const firstName = str(v.firstName, 60), lastName = str(v.lastName, 60);
  if (/[<>]/.test(firstName + lastName)) return { error: "name" };
  let phone = str(v.phone, 30).replace(/[\s().-]/g, "");
  if (phone.startsWith("00")) phone = "+" + phone.slice(2);
  if (phone && !/^\+[1-9]\d{7,14}$/.test(phone)) return { error: "phone" };
  let social = str(v.social, 200);
  if (social && !/^https?:\/\//i.test(social)) social = "https://" + social;
  if (social) { try { const u = new URL(social); if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) throw 0; social = u.toString(); } catch { return { error: "social" }; } }
  const coach = v.coach === true, plan = v.plan === true;
  const now = new Date().toISOString();
  const interestChanged = coach !== !!prev?.coach || plan !== !!prev?.plan;
  const p: Profile = { updatedAt: now };
  if (firstName) p.firstName = firstName;
  if (lastName) p.lastName = lastName;
  if (phone) p.phone = phone;
  if (social) p.social = social;
  if (coach) p.coach = true;
  if (plan) p.plan = true;
  if (coach || plan) { p.interestText = interestChanged ? INTEREST_TEXT : prev?.interestText || INTEREST_TEXT; p.interestAt = interestChanged ? now : prev?.interestAt || now; }
  return { profile: p };
}

// utm_* labels from the sign-up form: short plain strings only.
export function cleanSrc(v: unknown): Subscriber["src"] {
  if (!v || typeof v !== "object") return null;
  const out: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "content", "term"]) {
    const x = (v as any)[k];
    if (typeof x === "string" && x.trim()) out[k] = x.trim().slice(0, 100);
  }
  return Object.keys(out).length ? out : null;
}
export const countryOf = (context: any): string | undefined => {
  const c = context?.geo?.country?.code;
  return typeof c === "string" && /^[A-Z]{2}$/.test(c) ? c : undefined;
};

// Protein picks sent by the site: known proteins only, no duplicates, at least 2 (as the picker requires); otherwise undefined.
export function cleanProts(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = [...new Set(v.filter((x) => typeof x === "string" && M.PROTEINS.includes(x)))] as string[];
  return out.length >= 2 ? out : undefined;
}
// What the meal-plan logic takes as "diet": the protein picks when we have them, else the older all/veg choice.
export const planDiet = (s: { prots?: string[]; diet?: "all" | "veg" }) => (s.prots && s.prots.length ? s.prots : s.diet === "veg" ? "veg" : "all");

export async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const subKey = (hash: string) => `sub/${hash}`;
export const tokKey = (token: string) => `tok/${token}`;
export const unsKey = (token: string) => `uns/${token}`;
export const clkKey = (token: string) => `clk/${token}`;
export const actKey = (hash: string) => `act/${hash}`;

// ---------- Email click tracking (first-party) ----------
// Links in the daily and Saturday emails go through /api/go on our own domain (HTTPS), which records the click on the
// subscriber's activity record (act/<hash>) and redirects to the page. Mailgun's own click tracking stays off.
// Never wrap one-time links (confirm, log in) or the unsubscribe link.
export const CLICK_KINDS = ["week", "shop", "account", "recalc", "list"] as const;
export type ClickKind = (typeof CLICK_KINDS)[number];
export const ACT_KEEP_DAYS = 120;
// Kept apart from the subscriber record so a click never races with send-daily writing that record.
// Only clicks per day and link kind, for the last ACT_KEEP_DAYS days (privacy policy); older days are dropped.
export type Activity = { last: string; days: Record<string, Partial<Record<ClickKind, number>>> };

// Where /api/go may send people: a path on this site only (no other hosts, no protocol-relative "//", no backslashes).
export function safeTarget(to: string | null): string {
  if (!to || to.length > 300 || !/^\/(?![\/\\])[^\s\\]*$/.test(to)) return "/";
  return to;
}

// Link checkers in mail systems (Outlook Safe Links, Proofpoint, Mimecast…) and crawlers open links nobody clicked.
const BOT_UA = /bot|crawl|spider|slurp|preview|scanner|safelinks|proofpoint|mimecast|barracuda|forcepoint|symantec|trendmicro|headless|python|curl|wget|go-http|java\/|okhttp|axios|node-fetch|httpclient|facebookexternalhit|whatsapp|telegram|skype/i;
export function isBotClick(req: Request): boolean {
  if (req.method !== "GET") return true;
  const ua = req.headers.get("user-agent") || "";
  return !ua || BOT_UA.test(ua);
}

// Turns a link to this site into its tracked /api/go form. Without a click token (or for another site) the link is left as is.
export function trackedLink(siteUrl: string, clickToken: string | undefined, kind: ClickKind, url: string): string {
  if (!clickToken) return url;
  let u: URL, base: URL;
  try { u = new URL(url); base = new URL(siteUrl); } catch { return url; }
  if (u.origin !== base.origin) return url;
  const to = u.pathname + u.search + u.hash;
  return `${base.origin}/api/go?c=${clickToken}&k=${kind}&to=${encodeURIComponent(to)}`;
}

// ---------- Shopping list (/account/list/) ----------
// The week's list is built from the plan (M.shoppingList). Ticks are kept per shopping week (Saturday to Friday, in the
// subscriber's time zone) in ltk/<hash>/<saturday>, for LIST_KEEP_DAYS; items the user adds themselves in lown/<hash>.
// Opening the list works with the log-in session, or with the list token from the Saturday email (list only: ticking,
// not adding or removing items, which need a log-in).
export const lstKey = (token: string) => `lst/${token}`;
export const ownKey = (hash: string) => `lown/${hash}`;
export const tickPrefix = (hash: string) => `ltk/${hash}/`;
export const tickKey = (hash: string, week: string) => `ltk/${hash}/${week}`;
export const LIST_KEEP_DAYS = 14;
export const OWN_MAX = 40, TICK_MAX = 300;
export type OwnItem = { id: string; n: string };
export const OWN_ID_RE = /^o:[a-z0-9]{6,16}$/;

// The Saturday that starts this shopping week, in the given time zone (YYYY-MM-DD).
export function listWeek(tz: string, now = new Date()): string {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" })
    .formatToParts(now).map((x) => [x.type, x.value]));
  const back = ({ Sat: 0, Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6 } as Record<string, number>)[p.weekday] ?? 0;
  return new Date(Date.UTC(+p.year, +p.month - 1, +p.day - back)).toISOString().slice(0, 10);
}

export const listPagePath = (lang: Lang) => `${lang === "en" ? "" : "/" + lang}/account/list/`;

// Everything the list page shows, in the page's language.
export function listContent(sub: Subscriber, lang: Lang) {
  const list = M.shoppingList(sub.intake, sub.prot, lang, sub.units === "imperial", planDiet(sub));
  return {
    groups: list.groups.map((g: any) => ({ aisle: g.aisle, items: g.items.map((it: any) => ({ id: String(it.id), n: it.n, q: it.q })) })),
    extras: (list.extrasList as string[]).map((n) => ({ id: "x:" + n.toLowerCase().replace(/[^\p{L}\p{N} '-]+/gu, "-").slice(0, 60), n })),
  };
}

export async function ensureListToken(store: ReturnType<typeof subscribers>, key: string, sub: Subscriber): Promise<Subscriber> {
  if (sub.listToken) return sub;
  const token = newToken();
  await store.set(lstKey(token), key.replace(/^sub\//, ""));
  const updated = { ...sub, listToken: token };
  await store.setJSON(key, updated);
  return updated;
}

// Deletes all shopping-list data for a subscriber (on unsubscribe).
export async function deleteListData(store: ReturnType<typeof subscribers>, hash: string, sub: Subscriber | null) {
  if (sub?.listToken) await store.delete(lstKey(sub.listToken));
  await store.delete(ownKey(hash));
  const { blobs } = await store.list({ prefix: tickPrefix(hash) });
  for (const b of blobs) await store.delete(b.key);
}

// Gives a subscriber a click token (and its clk/ lookup) the first time they're sent a tracked email.
export async function ensureClickToken(store: ReturnType<typeof subscribers>, key: string, sub: Subscriber): Promise<Subscriber> {
  if (sub.clickToken) return sub;
  const token = newToken();
  await store.set(clkKey(token), key.replace(/^sub\//, ""));
  const updated = { ...sub, clickToken: token };
  await store.setJSON(key, updated);
  return updated;
}

// Drops days older than ACT_KEEP_DAYS. Returns null when nothing is left (the record should then be deleted).
export function pruneActivity(a: Activity | null, now = new Date()): Activity | null {
  if (!a || !a.days) return null;
  const cutoff = new Date(now.getTime() - ACT_KEEP_DAYS * 864e5).toISOString().slice(0, 10);
  const days = Object.fromEntries(Object.entries(a.days).filter(([d]) => d >= cutoff));
  return Object.keys(days).length ? { last: a.last, days } : null;
}

// Adds one click (on the given link kind) to the subscriber's activity.
export function addClick(prev: Activity | null, kind: ClickKind, now = new Date()): Activity {
  const iso = now.toISOString(), day = iso.slice(0, 10);
  const a = pruneActivity(prev, now) || { last: iso, days: {} };
  const d = { ...(a.days[day] || {}) };
  d[kind] = (d[kind] || 0) + 1;
  return { last: iso, days: { ...a.days, [day]: d } };
}

// Totals over the days kept, optionally only from a given day (YYYY-MM-DD) on.
export function clickTotals(a: Activity | null, fromDay = "") {
  const out = { clicks: 0, activeDays: 0, byKind: {} as Record<string, number> };
  for (const [d, kinds] of Object.entries(a?.days || {})) {
    if (d < fromDay) continue;
    let n = 0;
    for (const [k, v] of Object.entries(kinds)) { n += v || 0; out.byKind[k] = (out.byKind[k] || 0) + (v || 0); }
    if (n) { out.clicks += n; out.activeDays++; }
  }
  return out;
}

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

// firstName: from the account profile; when set, the email opens with "Hi <name>," in the subscriber's language.
type Mail = { to: string; subject: string; html: string; text: string; unsubUrl?: string; tag: string; trackClicks?: boolean; firstName?: string; lang?: Lang };

const GREET = { en: "Hi", pt: "Olá", br: "Oi" };
function addGreeting(mail: Mail) {
  const name = (mail.firstName || "").trim();
  if (!name) return { html: mail.html.replace("<!--greet-->", ""), text: mail.text };
  const hi = `${GREET[asLang(mail.lang)]} ${name},`;
  const row = `<tr><td style="padding:0 4px 12px;font-size:17px;font-weight:600;color:${COLORS.ink};">${esc(hi)}</td></tr>`;
  return { html: mail.html.replace("<!--greet-->", row), text: `${hi}\n\n${mail.text}` };
}

export async function sendMail(cfg: NonNullable<ReturnType<typeof mailConfig>>, mail: Mail) {
  const body = new URLSearchParams();
  body.set("from", cfg.from);
  body.set("to", mail.to);
  body.set("subject", mail.subject);
  const g = addGreeting(mail);
  body.set("html", g.html);
  body.set("text", g.text);
  body.set("o:tag", mail.tag);
  // Open tracking stays on. Click tracking is OFF: Mailgun rewrites links through email.mg.fitmeplan.com, which serves
  // plain http, so Chrome warns "This site doesn't support a secure connection" before confirm/log-in links open.
  // Links with one-time tokens (confirm, log in) should never go through a tracker anyway. Once HTTPS tracking is on
  // in Mailgun (Domain settings → Tracking), a mail can opt back in with trackClicks: true (meant for the daily emails).
  body.set("o:tracking", "yes");
  body.set("o:tracking-opens", "yes");
  body.set("o:tracking-clicks", mail.trackClicks ? "htmlonly" : "no");
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

// ---------- Meta Conversions API ----------
// Pixel id is public; the access token is a Netlify secret. Missing token = CAPI is skipped silently.
export function metaConfig() {
  const token = Netlify.env.get("META_CAPI_TOKEN");
  if (!token) return null;
  return {
    pixel: Netlify.env.get("META_PIXEL_ID") || "1320302420180623",
    token,
    version: Netlify.env.get("META_GRAPH_VERSION") || "v24.0",
    testCode: Netlify.env.get("META_TEST_EVENT_CODE") || "",
  };
}

export const FBP_RE = /^fb\.[0-2]\.\d{10,14}\.\d{1,24}$/;
export const FBC_RE = /^fb\.[0-2]\.\d{10,14}\.[A-Za-z0-9_\-]{10,500}$/;
export const EVENT_ID_RE = /^[A-Za-z0-9_\-]{8,64}$/;

export type MetaUser = { em?: string; external_id?: string; fbp?: string; fbc?: string; client_ip_address?: string; client_user_agent?: string };
export type MetaEvent = { event_name: string; event_id: string; event_time?: number; event_source_url?: string; user_data: MetaUser; custom_data?: Record<string, unknown> };

// Sends events to Meta. Never throws: measurement must not break the product.
export async function sendMetaEvents(events: MetaEvent[]) {
  const cfg = metaConfig();
  if (!cfg || !events.length) return;
  const data = events.map((e) => {
    const user: Record<string, unknown> = {};
    if (e.user_data.em) user.em = [e.user_data.em];
    if (e.user_data.external_id) user.external_id = [e.user_data.external_id];
    for (const k of ["fbp", "fbc", "client_ip_address", "client_user_agent"] as const) if (e.user_data[k]) user[k] = e.user_data[k];
    return {
      event_name: e.event_name,
      event_id: e.event_id,
      event_time: e.event_time || Math.floor(Date.now() / 1000),
      action_source: "website",
      ...(e.event_source_url ? { event_source_url: e.event_source_url } : {}),
      user_data: user,
      ...(e.custom_data && Object.keys(e.custom_data).length ? { custom_data: e.custom_data } : {}),
    };
  });
  try {
    const res = await fetch(`https://graph.facebook.com/${cfg.version}/${cfg.pixel}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, access_token: cfg.token, ...(cfg.testCode ? { test_event_code: cfg.testCode } : {}) }),
    });
    if (!res.ok) console.error("Meta CAPI", res.status, (await res.text()).slice(0, 300));
  } catch (err) {
    console.error("Meta CAPI failed", err);
  }
}

// Client IP and user agent, as Meta wants them for matching.
export function requestUser(req: Request, context: { ip?: string }) {
  return {
    client_ip_address: context.ip || req.headers.get("x-nf-client-connection-ip") || undefined,
    client_user_agent: (req.headers.get("user-agent") || "").slice(0, 400) || undefined,
  };
}

// ---------- Rendering ----------
export type Lang = "en" | "pt" | "br";
export const asLang = (v: unknown): Lang => (v === "pt" || v === "br" ? v : "en");
export const sitePath = (siteUrl: string, lang?: Lang) => (lang === "pt" || lang === "br" ? `${siteUrl}/${lang}/` : `${siteUrl}/`);
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
    footer: (k: string, home: string, account: string, unsub: string) => `Portions are sized for your daily intake of ${k}. Nutrition is estimated from standard ingredient values, so check labels if you have allergies. This is not medical advice.<br>Change your proteins or details in <a href="${account}" style="color:#6b655e;">your account</a>. To change your calories, recalculate on <a href="${home}" style="color:#6b655e;">FitMe</a> with the same email. <a href="${unsub}" style="color:#6b655e;">Unsubscribe</a>.`,
    subject: (d: string, lunch: string) => `Your ${d} meal plan: ${lunch} & more`,
    textFull: "Full week", textAccount: "Your account", textUnsub: "Unsubscribe", textConfirm: "Confirm",
    expiredTitle: "This link has expired", expiredBody: (u: string) => `It may have been used already or replaced by a newer email. You can <a href="${u}" style="color:#2e6b4f;">sign up again on FitMe</a>.`,
    notSubTitle: "You're not subscribed", notSubBody: "This address isn't on the FitMe daily email list anymore.",
    stopTitle: "Stop the daily meal plan?", stopBody: "You'll stop getting FitMe emails and we'll delete your email address and settings.", stopBtn: "Unsubscribe",
    shopSubject: "Your shopping list for the week is ready", shopTitle: "Your shopping list for the week is ready",
    shopIntro: (n: number, k: string) => `${n} items for the week's 28 meals, sized to your daily intake of ${k}.`,
    shopTip: "Open it in the supermarket and tap items off as you go. Your ticks save as you shop, on any device.", shopBtn: "Open my list",
    shopFallback: "Can't open it? Here's this week's list", shopFallbackText: "This week's list",
    shopExtras: "Herbs, spices & extras (check your cupboard)", shopCta: "See this week's recipes on FitMe →",
    shopFooter: (home: string, account: string, unsub: string) => `You get this list every Saturday as part of your FitMe meal plan. Change your proteins or details in <a href="${account}" style="color:#6b655e;">your account</a>. To change your calories, recalculate on <a href="${home}" style="color:#6b655e;">FitMe</a> with the same email. <a href="${unsub}" style="color:#6b655e;">Unsubscribe</a>.`,
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
    footer: (k: string, home: string, account: string, unsub: string) => `As porções estão ajustadas à tua ingestão diária de ${k}. Os valores nutricionais são estimados a partir de valores-padrão dos ingredientes, por isso confirma os rótulos se tiveres alergias. Não é aconselhamento médico.<br>Muda as proteínas ou os teus dados na <a href="${account}" style="color:#6b655e;">tua conta</a>. Para mudar as calorias, recalcula no <a href="${home}" style="color:#6b655e;">FitMe</a> com o mesmo email. <a href="${unsub}" style="color:#6b655e;">Cancelar subscrição</a>.`,
    subject: (d: string, lunch: string) => `O teu plano de ${d}: ${lunch} ao almoço`,
    textFull: "Semana completa", textAccount: "A tua conta", textUnsub: "Cancelar subscrição", textConfirm: "Confirmar",
    expiredTitle: "Este link expirou", expiredBody: (u: string) => `Pode já ter sido usado ou substituído por um email mais recente. Podes <a href="${u}" style="color:#2e6b4f;">voltar a subscrever no FitMe</a>.`,
    notSubTitle: "Não tens subscrição ativa", notSubBody: "Este endereço já não está na lista do email diário do FitMe.",
    stopTitle: "Parar o plano de refeições diário?", stopBody: "Deixas de receber emails do FitMe e apagamos o teu endereço de email e as tuas definições.", stopBtn: "Cancelar subscrição",
    shopSubject: "A tua lista de compras da semana está pronta", shopTitle: "A tua lista de compras da semana está pronta",
    shopIntro: (n: number, k: string) => `${n} produtos para as 28 refeições da semana, ajustados à tua ingestão diária de ${k}.`,
    shopTip: "Abre-a no supermercado e vai riscando os produtos. O que riscas fica guardado, em qualquer dispositivo.", shopBtn: "Abrir a minha lista",
    shopFallback: "Não consegues abrir? Aqui está a lista desta semana", shopFallbackText: "A lista desta semana",
    shopExtras: "Ervas, especiarias e extras (confirma na despensa)", shopCta: "Vê as receitas desta semana no FitMe →",
    shopFooter: (home: string, account: string, unsub: string) => `Recebes esta lista todos os sábados como parte do teu plano de refeições FitMe. Muda as proteínas ou os teus dados na <a href="${account}" style="color:#6b655e;">tua conta</a>. Para mudar as calorias, recalcula no <a href="${home}" style="color:#6b655e;">FitMe</a> com o mesmo email. <a href="${unsub}" style="color:#6b655e;">Cancelar subscrição</a>.`,
    doneTitle: "Subscrição cancelada", doneBody: (u: string) => `O teu email e as tuas definições foram apagados. Podes <a href="${u}" style="color:#2e6b4f;">voltar a subscrever</a> quando quiseres.`,
  },
  br: {
    htmlLang: "pt-BR", locale: "pt-BR",
    confirmTitle: "Confirme seu plano de refeições diário", updateTitle: "Confirme seu plano de refeições atualizado",
    confirmLead: "Toque no botão abaixo para começar a receber seu plano de refeições FitMe toda manhã às 7h: quatro refeições ricas em proteína, com ingredientes e modo de preparo, na medida das suas calorias. Aos sábados você também recebe a lista de compras da semana.",
    updateLead: "Você pediu para atualizar as calorias do seu plano de refeições diário FitMe. Confirme para aplicar as novas porções.",
    confirmBtn: "Confirmar inscrição", updateBtn: "Confirmar atualização",
    ignore: "Se você não fez essa inscrição, ignore este e-mail e nada vai acontecer.", confirmFooter: "Você está recebendo este e-mail porque este endereço foi informado no FitMe.",
    yourDayPlan: (d: string) => `Seu plano de ${d}`, calories: "Calorias", protein: "Proteína", carbs: "Carboidratos", fat: "Gordura", macro: ["P", "C", "G"],
    ingredients: "Ingredientes", method: "Modo de preparo", fullWeek: "Veja a semana completa e a lista de compras no FitMe →",
    footer: (k: string, home: string, account: string, unsub: string) => `As porções estão na medida da sua ingestão diária de ${k}. Os valores nutricionais são estimados a partir de valores-padrão dos ingredientes, então confira os rótulos se tiver alergias. Não é orientação médica.<br>Mude as proteínas ou seus dados na <a href="${account}" style="color:#6b655e;">sua conta</a>. Para mudar as calorias, recalcule no <a href="${home}" style="color:#6b655e;">FitMe</a> com o mesmo e-mail. <a href="${unsub}" style="color:#6b655e;">Cancelar inscrição</a>.`,
    subject: (d: string, lunch: string) => `Seu plano de ${d}: ${lunch} no almoço`,
    textFull: "Semana completa", textAccount: "Sua conta", textUnsub: "Cancelar inscrição", textConfirm: "Confirmar",
    expiredTitle: "Este link expirou", expiredBody: (u: string) => `Ele pode já ter sido usado ou substituído por um e-mail mais recente. Você pode <a href="${u}" style="color:#2e6b4f;">se inscrever de novo no FitMe</a>.`,
    notSubTitle: "Você não está inscrito", notSubBody: "Este endereço não está mais na lista do e-mail diário do FitMe.",
    stopTitle: "Parar o plano de refeições diário?", stopBody: "Você deixa de receber os e-mails do FitMe e apagamos seu endereço de e-mail e suas configurações.", stopBtn: "Cancelar inscrição",
    shopSubject: "Sua lista de compras da semana está pronta", shopTitle: "Sua lista de compras da semana está pronta",
    shopIntro: (n: number, k: string) => `${n} itens para as 28 refeições da semana, na medida da sua ingestão diária de ${k}.`,
    shopTip: "Abra no mercado e vá marcando os itens. O que você marca fica salvo, em qualquer aparelho.", shopBtn: "Abrir minha lista",
    shopFallback: "Não consegue abrir? Aqui está a lista desta semana", shopFallbackText: "A lista desta semana",
    shopExtras: "Ervas, temperos e extras (confira na despensa)", shopCta: "Veja as receitas desta semana no FitMe →",
    shopFooter: (home: string, account: string, unsub: string) => `Você recebe esta lista todo sábado como parte do seu plano de refeições FitMe. Mude as proteínas ou seus dados na <a href="${account}" style="color:#6b655e;">sua conta</a>. Para mudar as calorias, recalcule no <a href="${home}" style="color:#6b655e;">FitMe</a> com o mesmo e-mail. <a href="${unsub}" style="color:#6b655e;">Cancelar inscrição</a>.`,
    doneTitle: "Inscrição cancelada", doneBody: (u: string) => `Seu e-mail e suas configurações foram apagados. Você pode <a href="${u}" style="color:#2e6b4f;">se inscrever de novo</a> quando quiser.`,
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
<!--greet-->${inner}
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

// ---------- Confirmation reminders ----------
// Sent only to sign-ups that never confirmed: 1 at 24h, 2 (the last) at 72h. They only ask to confirm, with no recipes or promotion.
export const REMINDER = {
  en: {
    1: { subject: "Your meal plan is one click away", title: "Your meal plan is one click away",
      lead: "You signed up for FitMe but haven't confirmed your email yet. Tap below and your first high-protein meal plan arrives tomorrow morning at 7:00." },
    2: { subject: "Last reminder: confirm to get your meal plan", title: "Last reminder",
      lead: "This is the last reminder we'll send. Confirm your email to start getting your FitMe meal plan every morning at 7:00. If you've changed your mind, just ignore this email." },
    btn: "Confirm my email",
    footer: (unsub: string) => `You're receiving this because this address was entered on FitMe and hasn't been confirmed. <a href="${unsub}" style="color:#6b655e;">Don't send me reminders</a>.`,
    textStop: "Don't send me reminders",
  },
  pt: {
    1: { subject: "O teu plano de refeições está a um clique", title: "O teu plano de refeições está a um clique",
      lead: "Inscreveste-te no FitMe mas ainda não confirmaste o teu email. Carrega abaixo e o teu primeiro plano de refeições rico em proteína chega amanhã de manhã, às 7:00." },
    2: { subject: "Último lembrete: confirma para receberes o teu plano", title: "Último lembrete",
      lead: "Este é o último lembrete que te enviamos. Confirma o teu email para começares a receber o teu plano de refeições FitMe todas as manhãs às 7:00. Se mudaste de ideias, basta ignorares este email." },
    btn: "Confirmar o meu email",
    footer: (unsub: string) => `Recebes este email porque este endereço foi introduzido no FitMe e ainda não foi confirmado. <a href="${unsub}" style="color:#6b655e;">Não quero receber lembretes</a>.`,
    textStop: "Não quero receber lembretes",
  },
  br: {
    1: { subject: "Falta só 1 clique pro seu plano de refeições", title: "Falta só 1 clique pro seu plano de refeições",
      lead: "Você se inscreveu no FitMe, mas ainda não confirmou seu e-mail. Toque abaixo e seu primeiro plano de refeições rico em proteína chega amanhã cedo, às 7h." },
    2: { subject: "Último lembrete: confirme pra receber seu plano", title: "Último lembrete",
      lead: "Esse é o último lembrete que vamos te mandar. Confirme seu e-mail para começar a receber seu plano de refeições FitMe toda manhã às 7h. Se mudou de ideia, é só ignorar este e-mail." },
    btn: "Confirmar meu e-mail",
    footer: (unsub: string) => `Você está recebendo este e-mail porque este endereço foi informado no FitMe e ainda não foi confirmado. <a href="${unsub}" style="color:#6b655e;">Não quero receber lembretes</a>.`,
    textStop: "Não quero receber lembretes",
  },
};

export function renderReminderEmail(siteUrl: string, confirmUrl: string, unsubUrl: string, n: 1 | 2, lang: Lang = "en") {
  const c = COLORS, r = REMINDER[lang], m = r[n];
  const inner = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:28px 24px;">
<h1 style="margin:0 0 10px;font-size:22px;line-height:1.25;">${m.title}</h1>
<p style="margin:0 0 22px;font-size:15px;line-height:1.55;color:${c.muted};">${m.lead}</p>
<a href="${esc(confirmUrl)}" style="display:inline-block;background:${c.accent};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:8px;">${r.btn}</a>
</td></tr>`;
  const text = `${m.title}\n\n${m.lead}\n\n${r.btn}: ${confirmUrl}\n\n${r.textStop}: ${unsubUrl}`;
  return { subject: m.subject, html: shell(siteUrl, inner, r.footer(esc(unsubUrl)), lang), text };
}

export function renderDailyEmail(opts: { siteUrl: string; unsubUrl: string; clickToken?: string; dayIndex: number; dateLabel: string; intake: number; prot: number; imperial: boolean; lang?: Lang; diet?: "all" | "veg" | string[] }) {
  const c = COLORS, lang: Lang = asLang(opts.lang), t = T[lang];
  const kcal = (v: number) => kcalL(v, t.locale);
  const site = sitePath(opts.siteUrl, lang);
  const weekUrl = trackedLink(opts.siteUrl, opts.clickToken, "week", `${site}#meals`);
  const accountUrl = trackedLink(opts.siteUrl, opts.clickToken, "account", `${site}account/`);
  const homeUrl = trackedLink(opts.siteUrl, opts.clickToken, "recalc", site);
  const meals = M.buildDay(opts.dayIndex, opts.intake, opts.prot, lang, opts.diet);
  const tot = M.dayTotals(meals);
  const dayName = lang === "en" ? M.DAY_NAMES[opts.dayIndex] : (globalThis as any)[lang === "br" ? "FITME_MEALS_BR" : "FITME_MEALS_PT"].days[opts.dayIndex].toLowerCase();
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
    // Dish photo (JPEG, not WebP, so it shows in every mail app). Served from the site: public/img/email/<slug>.jpg.
    const photo = m.rec.img && !m.rec.noPhoto ? `<img src="${esc(opts.siteUrl)}/img/email/${esc(m.rec.img)}.jpg" width="556" alt="${esc(m.rec.name)}" style="display:block;width:100%;max-width:100%;height:auto;border:0;border-radius:12px 12px 0 0;background:#e8e5df;">` : "";
    return `<tr><td style="height:14px;"></td></tr><tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:0;overflow:hidden;">${photo}<div style="padding:18px 22px 20px;">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.accent};">${esc(m.slot.label)} · ${esc(m.rec.time)}</div>
<h2 style="margin:4px 0 8px;font-size:19px;line-height:1.25;">${esc(m.rec.name)}</h2>
<div style="font-size:12px;margin:0 0 12px;"><span style="background:${c.matcha};color:${c.ink};border-radius:20px;padding:2px 9px;font-weight:600;">${kcal(m.n.k)}</span>
<span style="color:${c.muted};margin-left:6px;">${t.macro[0]} ${Math.round(m.n.p)} g · ${t.macro[1]} ${Math.round(m.n.c)} g · ${t.macro[2]} ${Math.round(m.n.f)} g</span></div>
<div style="font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${c.muted};margin:0 0 4px;">${t.ingredients}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 12px;">${ing}</table>
<div style="font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${c.muted};margin:0 0 4px;">${t.method}</div>
<ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.5;">${steps}</ol></div></td></tr>`;
  }).join("");
  const cta = `<tr><td style="padding:18px 4px 0;font-size:14px;"><a href="${esc(weekUrl)}" style="color:${c.accent};font-weight:600;">${t.fullWeek}</a></td></tr>`;
  const footer = t.footer(kcal(opts.intake), esc(homeUrl), esc(accountUrl), esc(opts.unsubUrl));
  const subject = t.subject(dayName, meals[1].rec.name);
  const text = [`${t.yourDayPlan(dayName)} (${opts.dateLabel})`, `${t.calories} ${kcal(tot.k)} / ${kcal(opts.intake)} · ${t.protein} ${Math.round(tot.p)} g`, ""]
    .concat(meals.map((m: any) => {
      const ing = m.lines.map((l: any) => (l[0] === "~" ? `  - ${l[1]}` : `  - ${M.amountText(l, opts.imperial, lang).q} ${M.amountText(l, opts.imperial, lang).n}`)).join("\n");
      const steps = m.rec.steps.map((s: string, i: number) => `  ${i + 1}. ${s}`).join("\n");
      return `${m.slot.label.toUpperCase()}: ${m.rec.name} (${kcal(m.n.k)}, ${Math.round(m.n.p)} g ${t.protein.toLowerCase()})\n${t.ingredients}:\n${ing}\n${t.method}:\n${steps}\n`;
    }))
    .concat([`${t.textFull}: ${weekUrl}`, `${t.textAccount}: ${accountUrl}`, `${t.textUnsub}: ${opts.unsubUrl}`]).join("\n");
  return { subject, html: shell(opts.siteUrl, summary + cards + cta, footer, lang), text };
}

// Saturday email: a reminder that the week's list is ready, with a button to the list page (/account/list/).
// fallback: also print the list itself under the button (meant for the first weeks after the switch).
export function renderShoppingEmail(opts: { siteUrl: string; unsubUrl: string; clickToken?: string; listToken?: string; fallback?: boolean; dateLabel: string; intake: number; prot: number; imperial: boolean; lang?: Lang; diet?: "all" | "veg" | string[] }) {
  const c = COLORS, lang: Lang = asLang(opts.lang), t = T[lang];
  const site = sitePath(opts.siteUrl, lang);
  const listPage = `${opts.siteUrl}${listPagePath(lang)}${opts.listToken ? "?k=" + opts.listToken : ""}`;
  const listUrl = trackedLink(opts.siteUrl, opts.clickToken, "list", listPage);
  const weekUrl = trackedLink(opts.siteUrl, opts.clickToken, "shop", `${site}#meals`);
  const accountUrl = trackedLink(opts.siteUrl, opts.clickToken, "account", `${site}account/`);
  const homeUrl = trackedLink(opts.siteUrl, opts.clickToken, "recalc", site);
  const list = M.shoppingList(opts.intake, opts.prot, lang, opts.imperial, opts.diet);
  const count = list.groups.reduce((n: number, g: any) => n + g.items.length, 0);
  const intro = t.shopIntro(count, kcalL(opts.intake, t.locale));
  const head = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:22px 22px 24px;">
<div style="font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${c.muted};">${esc(opts.dateLabel)}</div>
<h1 style="margin:4px 0 8px;font-size:24px;line-height:1.2;">${t.shopTitle}</h1>
<p style="margin:0 0 6px;font-size:15px;line-height:1.55;">${esc(intro)}</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.55;color:${c.muted};">${esc(t.shopTip)}</p>
<a href="${esc(listUrl)}" style="display:inline-block;background:${c.accent};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:13px 26px;border-radius:8px;">${t.shopBtn}</a></td></tr>`;
  const fallback = !opts.fallback ? "" : `<tr><td style="padding:22px 4px 2px;font-size:13px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${c.muted};">${t.shopFallback}</td></tr>` +
    list.groups.map((g: any) => `<tr><td style="height:10px;"></td></tr><tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:14px 20px;">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.accent};margin:0 0 4px;">${esc(g.aisle)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${g.items.map((it: any) => `<tr><td style="padding:5px 0;border-bottom:1px solid ${c.line};font-size:14px;">&#9744;&nbsp; ${esc(it.n)}</td><td align="right" style="padding:5px 0 5px 12px;border-bottom:1px solid ${c.line};font-family:Menlo,Consolas,monospace;font-size:13px;color:${c.muted};white-space:nowrap;">${esc(it.q)}</td></tr>`).join("")}</table></td></tr>`).join("") +
    `<tr><td style="height:10px;"></td></tr><tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:14px 20px;">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.accent};margin:0 0 4px;">${t.shopExtras}</div>
<p style="margin:0;font-size:13.5px;line-height:1.55;color:${c.muted};">${esc(list.extras)}</p></td></tr>`;
  const cta = `<tr><td style="padding:18px 4px 0;font-size:14px;"><a href="${esc(weekUrl)}" style="color:${c.accent};font-weight:600;">${t.shopCta}</a></td></tr>`;
  const text = [t.shopTitle + ` (${opts.dateLabel})`, intro, t.shopTip, "", `${t.shopBtn}: ${listUrl}`, ""]
    .concat(opts.fallback ? [t.shopFallbackText.toUpperCase(), ""].concat(list.groups.map((g: any) => g.aisle.toUpperCase() + "\n" + g.items.map((it: any) => `  [ ] ${it.n}: ${it.q}`).join("\n") + "\n"), [t.shopExtras + ": " + list.extras, ""]) : [])
    .concat([`${t.textFull}: ${weekUrl}`, `${t.textAccount}: ${accountUrl}`, `${t.textUnsub}: ${opts.unsubUrl}`]).join("\n");
  return { subject: t.shopSubject, html: shell(opts.siteUrl, head + fallback + cta, t.shopFooter(esc(homeUrl), esc(accountUrl), esc(opts.unsubUrl)), lang), text };
}

export function htmlPage(siteUrl: string, title: string, body: string, status = 200, lang: Lang = "en") {
  const c = COLORS;
  return new Response(`<!doctype html><html lang="${T[lang].htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · FitMe</title><link rel="icon" href="/favicon.svg"></head>
<body style="margin:0;background:${c.bg};color:${c.ink};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
<main style="max-width:480px;margin:12vh auto;padding:0 18px;"><a href="${esc(sitePath(siteUrl, lang))}" style="text-decoration:none;color:${c.ink};font-size:26px;font-weight:700;">Fit<span style="color:${c.accent};">Me</span></a>
<div style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:24px;margin-top:16px;"><h1 style="margin:0 0 10px;font-size:21px;">${esc(title)}</h1>${body}</div></main></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });
}

// ---------- Accounts: log in by email link ----------
// No passwords. POST /api/login emails a one-time link (15 min); opening it shows a button that POSTs to /api/auth
// (so email link scanners can't use it up), which starts a 30-day session kept in an HttpOnly cookie.
// Blobs: login/<token> = { hash, exp }, sess/<sid> = { hash, exp }. Only addresses already on FitMe can log in.
export const LOGIN_TTL_MS = 15 * 60 * 1000;
export const SESSION_TTL_MS = 30 * 864e5;
export const SESSION_COOKIE = "fm_s";
export const loginKey = (token: string) => `login/${token}`;
export const sessKey = (sid: string) => `sess/${sid}`;
export const TOKEN_RE = /^[a-f0-9]{48}$/;

export function sessionCookie(sid: string | null) {
  const v = sid ? `${sid}; Max-Age=${SESSION_TTL_MS / 1000}` : `; Max-Age=0`;
  return `${SESSION_COOKIE}=${v}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

export function readSid(req: Request): string | null {
  const m = (req.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([a-f0-9]{48})`));
  return m ? m[1] : null;
}

// The logged-in subscriber, or null (no cookie, expired session, or the address was unsubscribed/deleted).
export async function currentUser(req: Request) {
  const sid = readSid(req);
  if (!sid) return null;
  const store = subscribers();
  const sess = (await store.get(sessKey(sid), { type: "json" })) as { hash: string; exp: number } | null;
  if (!sess || sess.exp < Date.now()) { if (sess) await store.delete(sessKey(sid)); return null; }
  const sub = (await store.get(subKey(sess.hash), { type: "json" })) as Subscriber | null;
  if (!sub) { await store.delete(sessKey(sid)); return null; }
  return { sid, hash: sess.hash, sub };
}

export const AUTH = {
  en: {
    mailSubject: "Your FitMe log-in link", mailTitle: "Log in to FitMe",
    mailLead: "Tap the button below to log in to your FitMe account. The link works once and expires in 15 minutes.",
    mailBtn: "Log in", mailIgnore: "If you didn't ask to log in, ignore this email. Nobody can log in without this link.",
    mailFooter: "You're receiving this because someone asked to log in to FitMe with this address.",
    pageTitle: "Log in to FitMe", pageBody: "Tap the button to finish logging in on this device.", pageBtn: "Log in",
    expiredTitle: "This log-in link has expired", expiredBody: (u: string) => `Links work once and for 15 minutes. <a href="${u}" style="color:#2e6b4f;">Get a new link</a>.`,
  },
  pt: {
    mailSubject: "O teu link de acesso ao FitMe", mailTitle: "Entrar no FitMe",
    mailLead: "Carrega no botão abaixo para entrares na tua conta FitMe. O link só funciona uma vez e expira em 15 minutos.",
    mailBtn: "Entrar", mailIgnore: "Se não pediste para entrar, ignora este email. Ninguém consegue entrar sem este link.",
    mailFooter: "Recebes este email porque alguém pediu para entrar no FitMe com este endereço.",
    pageTitle: "Entrar no FitMe", pageBody: "Carrega no botão para terminares a entrada neste dispositivo.", pageBtn: "Entrar",
    expiredTitle: "Este link de acesso expirou", expiredBody: (u: string) => `Os links funcionam uma vez e durante 15 minutos. <a href="${u}" style="color:#2e6b4f;">Pede um novo link</a>.`,
  },
  br: {
    mailSubject: "Seu link de acesso ao FitMe", mailTitle: "Entrar no FitMe",
    mailLead: "Toque no botão abaixo para entrar na sua conta FitMe. O link funciona uma vez só e expira em 15 minutos.",
    mailBtn: "Entrar", mailIgnore: "Se você não pediu para entrar, ignore este e-mail. Ninguém consegue entrar sem este link.",
    mailFooter: "Você está recebendo este e-mail porque alguém pediu para entrar no FitMe com este endereço.",
    pageTitle: "Entrar no FitMe", pageBody: "Toque no botão para terminar de entrar neste dispositivo.", pageBtn: "Entrar",
    expiredTitle: "Este link de acesso expirou", expiredBody: (u: string) => `Os links funcionam uma vez só e por 15 minutos. <a href="${u}" style="color:#2e6b4f;">Peça um novo link</a>.`,
  },
};

export const loginPath = (siteUrl: string, lang: Lang) => `${siteUrl}${lang === "en" ? "" : "/" + lang}/login/`;
export const accountPath = (siteUrl: string, lang: Lang) => `${siteUrl}${lang === "en" ? "" : "/" + lang}/account/`;

export function renderLoginEmail(siteUrl: string, url: string, lang: Lang = "en") {
  const c = COLORS, a = AUTH[lang];
  const inner = `<tr><td style="background:${c.card};border:1px solid ${c.line};border-radius:12px;padding:28px 24px;">
<h1 style="margin:0 0 10px;font-size:22px;line-height:1.25;">${a.mailTitle}</h1>
<p style="margin:0 0 22px;font-size:15px;line-height:1.55;color:${c.muted};">${a.mailLead}</p>
<a href="${esc(url)}" style="display:inline-block;background:${c.accent};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:8px;">${a.mailBtn}</a>
<p style="margin:22px 0 0;font-size:13px;line-height:1.5;color:${c.muted};">${a.mailIgnore}</p>
</td></tr>`;
  const text = `${a.mailTitle}\n\n${a.mailLead}\n\n${a.mailBtn}: ${url}\n\n${a.mailIgnore}`;
  return { subject: a.mailSubject, html: shell(siteUrl, inner, a.mailFooter, lang), text };
}
