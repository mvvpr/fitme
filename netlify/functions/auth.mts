// /api/auth?t=TOKEN — finish logging in from the emailed link.
// GET shows a button (email link scanners open links and would use the one-time token up); POST uses the token,
// starts a 30-day session cookie and goes to the account page.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, loginKey, sessKey, newToken, TOKEN_RE, SESSION_TTL_MS, sessionHeaders, sessionCookie, htmlPage, esc, asLang, AUTH, loginPath, accountPath, type Subscriber } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const siteUrl = context.site.url || new URL(req.url).origin;
  const url = new URL(req.url);
  const token = url.searchParams.get("t") || "";
  const lang = asLang(url.searchParams.get("l"));
  const a = AUTH[lang];
  const store = subscribers();
  const login = TOKEN_RE.test(token) ? ((await store.get(loginKey(token), { type: "json" })) as { hash: string; exp: number } | null) : null;
  const expired = () => htmlPage(siteUrl, a.expiredTitle, `<p style="line-height:1.55;color:#6b655e;">${a.expiredBody(loginPath(siteUrl, lang))}</p>`, 410, lang);

  if (!login || login.exp < Date.now()) { if (login) await store.delete(loginKey(token)); return expired(); }

  if (req.method === "GET") {
    return htmlPage(siteUrl, a.pageTitle,
      `<p style="line-height:1.55;color:#6b655e;margin:0 0 18px;">${a.pageBody}</p>
<form method="post" action="/api/auth?t=${esc(token)}${lang !== "en" ? "&l=" + lang : ""}"><button type="submit" style="background:#2e6b4f;color:#fff;border:0;border-radius:8px;padding:11px 20px;font-size:15px;font-weight:600;cursor:pointer;">${a.pageBtn}</button></form>`, 200, lang);
  }

  await store.delete(loginKey(token)); // one use only
  const sub = (await store.get(subKey(login.hash), { type: "json" })) as Subscriber | null;
  if (!sub) return expired();
  const sid = newToken();
  await store.setJSON(sessKey(sid), { hash: login.hash, exp: Date.now() + SESSION_TTL_MS });
  const acctLang = asLang(sub.lang || lang);
  return new Response(null, { status: 303, headers: sessionHeaders({ Location: accountPath(siteUrl, acctLang), "cache-control": "no-store" }, sid, acctLang) });
};

export const config: Config = { path: "/api/auth", method: ["GET", "POST"] };
