// GET /api/stats?key=STATS_KEY[&days=30] — counts only, no emails:
// sign-ups by country and ad campaign (pending vs confirmed), and cookie-banner outcomes per country.
import type { Config } from "@netlify/functions";
import { subscribers, type Subscriber } from "../lib/core.mts";

export default async (req: Request) => {
  const want = Netlify.env.get("STATS_KEY");
  const url = new URL(req.url);
  if (!want || url.searchParams.get("key") !== want) return new Response("Not found", { status: 404 });
  const days = Math.min(90, Math.max(1, Number(url.searchParams.get("days")) || 30));
  const since = new Date(Date.now() - days * 864e5).toISOString();
  const store = subscribers();

  type Row = { country: string; source: string; campaign: string; adset: string; ad: string; signups: number; confirmed: number };
  const rows = new Map<string, Row>();
  const { blobs } = await store.list({ prefix: "sub/" });
  for (const b of blobs) {
    const s = (await store.get(b.key, { type: "json" })) as Subscriber | null;
    if (!s || s.createdAt < since) continue;
    const r = {
      country: s.country || "?", source: s.src?.source || "(none)", campaign: s.src?.campaign || "(none)",
      adset: s.src?.term || "", ad: s.src?.content || "",
    };
    const k = [r.country, r.source, r.campaign, r.adset, r.ad].join("|");
    const row = rows.get(k) || { ...r, signups: 0, confirmed: 0 };
    row.signups++;
    if (s.status === "active") row.confirmed++;
    rows.set(k, row);
  }

  const consent: Record<string, Record<string, number>> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    const day = (await store.get(`stats/cc/${d}`, { type: "json" })) as Record<string, Record<string, number>> | null;
    if (!day) continue;
    for (const [c, v] of Object.entries(day)) {
      const t = (consent[c] ||= { shown: 0, granted: 0, denied: 0, form: 0 });
      for (const [k, n] of Object.entries(v)) t[k] = (t[k] || 0) + n;
    }
  }

  const signups = [...rows.values()].sort((a, b) => b.signups - a.signups);
  if (url.searchParams.get("format") === "csv") {
    const csv = ["country,source,campaign,adset,ad,signups,confirmed",
      ...signups.map((r) => [r.country, r.source, r.campaign, r.adset, r.ad, r.signups, r.confirmed].map((x) => `"${String(x).replace(/"/g, '""')}"`).join(","))].join("\n");
    return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "no-store" } });
  }
  return Response.json({ days, since, signups, consent }, { headers: { "Cache-Control": "no-store" } });
};

export const config: Config = { path: "/api/stats", method: "GET" };
