// GET /api/go?c=CLICK_TOKEN&k=KIND&to=/path — first-party click tracking for the daily and Saturday emails.
// Records the click on the subscriber's activity record (act/<hash>) and redirects to a page on this site.
// Always redirects, even with an unknown or missing token, so a link never breaks. Only same-site paths are allowed.
// Clicks from link scanners and crawlers (and non-GET requests) are redirected but not counted.
import type { Config, Context } from "@netlify/functions";
import { subscribers, clkKey, actKey, subKey, safeTarget, isBotClick, addClick, CLICK_KINDS, TOKEN_RE, type ClickKind, type Activity } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const siteUrl = context.site.url || url.origin;
  const to = safeTarget(url.searchParams.get("to"));
  const kind = url.searchParams.get("k") as ClickKind;
  const token = url.searchParams.get("c") || "";
  const res = new Response(null, {
    status: 302,
    headers: { Location: new URL(to, siteUrl).toString(), "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "Referrer-Policy": "no-referrer" },
  });

  if (!TOKEN_RE.test(token) || !CLICK_KINDS.includes(kind) || isBotClick(req)) return res;
  try {
    const store = subscribers();
    const hash = await store.get(clkKey(token), { type: "text" });
    if (!hash || !(await store.get(subKey(hash)))) return res; // unsubscribed since the email went out
    const prev = (await store.get(actKey(hash), { type: "json" })) as Activity | null;
    await store.setJSON(actKey(hash), addClick(prev, kind));
  } catch (err) {
    console.error("click not recorded", err); // measurement must never block the redirect
  }
  return res;
};

export const config: Config = { path: "/api/go", method: "GET" };
