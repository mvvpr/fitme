// GET /api/me — the logged-in user's account details (401 if not logged in).
// POST /api/me { action: "logout" } ends the session; { action: "profile", profile } saves the optional profile;
// { action: "plan", plan: { prots } } changes the protein picks right away (calories and protein come from the calculator).
// { action: "lang", lang } sets the account language: emails, account pages and every page the user opens follow it
// (the fm_lang cookie is refreshed on every GET so sessions from before this existed pick it up too).
import type { Config } from "@netlify/functions";
import { subscribers, subKey, sessKey, currentUser, sessionCookie, readSid, cleanProfile, cleanPlan, asLang, langCookies, LANG_COOKIE } from "../lib/core.mts";

export default async (req: Request) => {
  const headers = { "cache-control": "no-store" };
  if (req.method === "POST") {
    let input: any = null;
    try { input = await req.json(); } catch {}
    if (input?.action === "profile") {
      const me = await currentUser(req);
      if (!me) return Response.json({ ok: false, error: "not_logged_in" }, { status: 401, headers });
      const r = cleanProfile(input.profile, me.sub.profile);
      if (r.error) return Response.json({ ok: false, error: r.error }, { status: 400, headers });
      await subscribers().setJSON(subKey(me.hash), { ...me.sub, profile: r.profile });
      return Response.json({ ok: true, profile: publicProfile(r.profile) }, { headers });
    }
    if (input?.action === "plan") {
      const me = await currentUser(req);
      if (!me) return Response.json({ ok: false, error: "not_logged_in" }, { status: 401, headers });
      const r = cleanPlan(input.plan);
      if (r.error) return Response.json({ ok: false, error: r.error }, { status: 400, headers });
      const updated = { ...me.sub, ...r.plan, pending: null, planUpdatedAt: new Date().toISOString() };
      await subscribers().setJSON(subKey(me.hash), updated);
      return Response.json({ ok: true, plan: planOut(updated) }, { headers });
    }
    if (input?.action === "lang") {
      const me = await currentUser(req);
      if (!me) return Response.json({ ok: false, error: "not_logged_in" }, { status: 401, headers });
      if (!["en", "pt", "br"].includes(input?.lang)) return Response.json({ ok: false, error: "bad_lang" }, { status: 400, headers });
      const lang = asLang(input.lang);
      const updated = { ...me.sub, lang };
      await subscribers().setJSON(subKey(me.hash), updated);
      const h = new Headers(headers);
      for (const c of langCookies(lang)) h.append("Set-Cookie", c);
      return Response.json({ ok: true, plan: planOut(updated) }, { headers: h });
    }
    if (input?.action !== "logout") return Response.json({ ok: false, error: "bad_request" }, { status: 400, headers });
    const sid = readSid(req);
    if (sid) await subscribers().delete(sessKey(sid));
    const out = new Headers(headers);
    out.append("Set-Cookie", sessionCookie(null));
    for (const c of langCookies(null)) out.append("Set-Cookie", c);
    return Response.json({ ok: true }, { headers: out });
  }
  const me = await currentUser(req);
  if (!me) return Response.json({ ok: false, error: "not_logged_in" }, { status: 401, headers });
  const s = me.sub;
  const g = new Headers(headers);
  const lang = asLang(s.lang);
  const has = (req.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=(en|pt|br)`));
  if (!has || has[1] !== lang) for (const c of langCookies(lang)) g.append("Set-Cookie", c);
  return Response.json({
    ok: true,
    email: s.email,
    status: s.status,
    since: s.createdAt,
    confirmedAt: s.confirmedAt || null,
    profile: publicProfile(s.profile),
    plan: planOut(s),
  }, { headers: g });
};

function planOut(s: any) {
  return { intake: s.intake, prot: s.prot, prots: s.prots || null, diet: s.diet || "all", units: s.units, lang: s.lang || "en", tz: s.tz };
}

function publicProfile(p: any) {
  return { firstName: p?.firstName || "", lastName: p?.lastName || "", phone: p?.phone || "", social: p?.social || "", coach: !!p?.coach, plan: !!p?.plan };
}

export const config: Config = { path: "/api/me", method: ["GET", "POST"] };
