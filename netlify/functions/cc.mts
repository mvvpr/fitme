// POST /api/cc — anonymous daily count of cookie-banner outcomes per country, so we know the consent rate.
// No id, no cookie, no IP stored: just counters like stats/cc/2026-11-22 → { PT: { shown: 40, granted: 22, denied: 9, form: 3 } }.
import type { Config, Context } from "@netlify/functions";
import { subscribers, countryOf } from "../lib/core.mts";

const KINDS = new Set(["shown", "granted", "denied"]);

export default async (req: Request, context: Context) => {
  let input: any;
  try { input = await req.json(); } catch { return new Response(null, { status: 204 }); }
  const c = String(input?.c || "");
  if (!KINDS.has(c)) return new Response(null, { status: 204 });
  const country = countryOf(context) || "XX";
  const key = `stats/cc/${new Date().toISOString().slice(0, 10)}`;
  const store = subscribers();
  const day = ((await store.get(key, { type: "json" })) as Record<string, Record<string, number>> | null) || {};
  const row = (day[country] ||= {});
  row[c] = (row[c] || 0) + 1;
  if (c === "granted" && input?.via === "form") row.form = (row.form || 0) + 1;
  await store.setJSON(key, day);
  return new Response(null, { status: 204 });
};

export const config: Config = {
  path: "/api/cc",
  method: "POST",
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
