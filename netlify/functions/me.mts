// GET /api/me — the logged-in user's account details (401 if not logged in). POST /api/me { action: "logout" } ends the session.
import type { Config } from "@netlify/functions";
import { subscribers, sessKey, currentUser, sessionCookie, readSid } from "../lib/core.mts";

export default async (req: Request) => {
  const headers = { "cache-control": "no-store" };
  if (req.method === "POST") {
    let input: any = null;
    try { input = await req.json(); } catch {}
    if (input?.action !== "logout") return Response.json({ ok: false, error: "bad_request" }, { status: 400, headers });
    const sid = readSid(req);
    if (sid) await subscribers().delete(sessKey(sid));
    return Response.json({ ok: true }, { headers: { ...headers, "Set-Cookie": sessionCookie(null) } });
  }
  const me = await currentUser(req);
  if (!me) return Response.json({ ok: false, error: "not_logged_in" }, { status: 401, headers });
  const s = me.sub;
  return Response.json({
    ok: true,
    email: s.email,
    status: s.status,
    since: s.createdAt,
    confirmedAt: s.confirmedAt || null,
    plan: { intake: s.intake, prot: s.prot, prots: s.prots || null, diet: s.diet || "all", units: s.units, lang: s.lang || "en", tz: s.tz },
  }, { headers });
};

export const config: Config = { path: "/api/me", method: ["GET", "POST"] };
