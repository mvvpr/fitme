// /api/list — the shopping list on /account/list/.
// Who: the logged-in user (session cookie), or whoever has the list link from the Saturday email (?k=LIST_TOKEN or the
// x-list-key header). The list link only opens the list and ticks items; adding or removing your own items needs a log-in.
// GET ?l=en|pt|br            → the week's list, ticks and own items.
// POST { k?, l?, ops: [...] } → applies the ops in order, then answers like GET. Ops (the page queues them while offline):
//   { op: "tick", id, on }   tick or untick one item
//   { op: "reset" }          untick everything for this week
//   { op: "add", id, n }     add your own item (log-in only; id "o:" + random, made by the page so it works offline)
//   { op: "remove", id }     remove one of your own items (log-in only)
import type { Config } from "@netlify/functions";
import {
  subscribers, subKey, currentUser, lstKey, ownKey, tickKey, tickPrefix, listWeek, listContent, asLang, TOKEN_RE,
  OWN_ID_RE, OWN_MAX, TICK_MAX, LIST_KEEP_DAYS, loginPath, accountPath, type Subscriber, type OwnItem, type Lang,
} from "../lib/core.mts";

const ID_RE = /^[\p{L}\p{N}:._\- ']{1,80}$/u;
const headers = { "cache-control": "no-store", "x-robots-tag": "noindex" };

async function who(req: Request, key: string | null) {
  const me = await currentUser(req);
  if (me) return { hash: me.hash, sub: me.sub, full: true };
  if (!key || !TOKEN_RE.test(key)) return null;
  const store = subscribers();
  const hash = await store.get(lstKey(key), { type: "text" });
  if (!hash) return null;
  const sub = (await store.get(subKey(hash), { type: "json" })) as Subscriber | null;
  return sub ? { hash, sub, full: false } : null;
}

export default async (req: Request) => {
  const url = new URL(req.url);
  let body: any = null;
  if (req.method === "POST") { try { body = await req.json(); } catch { return Response.json({ ok: false, error: "bad_request" }, { status: 400, headers }); } }
  const key = url.searchParams.get("k") || req.headers.get("x-list-key") || (typeof body?.k === "string" ? body.k : null);
  const u = await who(req, key);
  if (!u) return Response.json({ ok: false, error: "no_access" }, { status: 401, headers });
  if (u.sub.status !== "active") return Response.json({ ok: false, error: "not_active" }, { status: 403, headers });

  const store = subscribers();
  const lang: Lang = asLang(url.searchParams.get("l") || body?.l || u.sub.lang);
  const week = listWeek(u.sub.tz);
  const tk = tickKey(u.hash, week);
  let ticks = ((await store.get(tk, { type: "json" })) as { ticked: string[] } | null)?.ticked || [];
  let own = ((await store.get(ownKey(u.hash), { type: "json" })) as OwnItem[] | null) || [];
  const ticksBefore = JSON.stringify(ticks), ownBefore = JSON.stringify(own);
  let denied = false;

  if (req.method === "POST") {
    const ops = Array.isArray(body?.ops) ? body.ops.slice(0, 200) : [];
    for (const o of ops) {
      if (!o || typeof o !== "object") continue;
      if (o.op === "tick" && typeof o.id === "string" && ID_RE.test(o.id)) {
        ticks = ticks.filter((x) => x !== o.id);
        if (o.on) ticks.push(o.id);
      } else if (o.op === "reset") {
        ticks = [];
      } else if (o.op === "add" || o.op === "remove") {
        if (!u.full) { denied = true; continue; }
        if (typeof o.id !== "string" || !OWN_ID_RE.test(o.id)) continue;
        if (o.op === "remove") { own = own.filter((x) => x.id !== o.id); ticks = ticks.filter((x) => x !== o.id); continue; }
        const n = typeof o.n === "string" ? o.n.trim().replace(/\s+/g, " ").replace(/[<>]/g, "").slice(0, 60) : "";
        if (!n || own.some((x) => x.id === o.id) || own.length >= OWN_MAX) continue;
        own.push({ id: o.id, n });
      }
    }
    ticks = ticks.slice(-TICK_MAX);
    if (JSON.stringify(ticks) !== ticksBefore) await store.setJSON(tk, { ticked: ticks, at: new Date().toISOString() });
    if (JSON.stringify(own) !== ownBefore) await store.setJSON(ownKey(u.hash), own);
  } else {
    // Ticks from past weeks are kept LIST_KEEP_DAYS, then deleted.
    const cutoff = new Date(Date.parse(week) - LIST_KEEP_DAYS * 864e5).toISOString().slice(0, 10);
    try {
      const { blobs } = await store.list({ prefix: tickPrefix(u.hash) });
      for (const b of blobs) if (b.key.slice(tickPrefix(u.hash).length) < cutoff) await store.delete(b.key);
    } catch (err) { console.error("list prune failed", err); }
  }

  const siteUrl = url.origin;
  return Response.json({
    ok: true, week, lang, units: u.sub.units, intake: u.sub.intake,
    ...listContent(u.sub, lang), own, ticked: ticks, canAdd: u.full, denied,
    loginUrl: loginPath(siteUrl, lang), accountUrl: accountPath(siteUrl, lang),
  }, { headers });
};

export const config: Config = {
  path: "/api/list",
  method: ["GET", "POST"],
  rateLimit: { windowLimit: 120, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
