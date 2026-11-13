// POST /api/track — server copy of browser Pixel events (Conversions API), deduplicated by event_id.
// The browser only calls this after the visitor accepted Meta cookies.
import type { Config, Context } from "@netlify/functions";
import { sendMetaEvents, requestUser, FBP_RE, FBC_RE, EVENT_ID_RE } from "../lib/core.mts";

const ALLOWED = new Set(["PageView", "ViewContent"]);

export default async (req: Request, context: Context) => {
  let input: any;
  try { input = await req.json(); } catch { return new Response(null, { status: 204 }); }

  const name = String(input?.event_name || "");
  const id = String(input?.event_id || "");
  if (!ALLOWED.has(name) || !EVENT_ID_RE.test(id)) return new Response(null, { status: 204 });

  // Only accept pages from this site.
  const siteUrl = context.site.url || new URL(req.url).origin;
  let url = String(input?.event_source_url || "");
  try {
    const u = new URL(url);
    const ok = u.origin === new URL(siteUrl).origin || u.origin === new URL(req.url).origin;
    if (!ok) url = siteUrl;
    else url = u.origin + u.pathname + u.search; // drop the hash
  } catch { url = siteUrl; }

  const fbp = typeof input?.fbp === "string" && FBP_RE.test(input.fbp) ? input.fbp : undefined;
  const fbc = typeof input?.fbc === "string" && FBC_RE.test(input.fbc) ? input.fbc : undefined;

  const custom: Record<string, string> = {};
  if (name === "ViewContent") {
    const c = input?.custom_data || {};
    if (typeof c.content_name === "string") custom.content_name = c.content_name.slice(0, 80);
    if (typeof c.content_category === "string") custom.content_category = c.content_category.slice(0, 40);
  }

  const send = sendMetaEvents([{
    event_name: name,
    event_id: id,
    event_source_url: url,
    user_data: { fbp, fbc, ...requestUser(req, context) },
    custom_data: custom,
  }]);
  if (typeof (context as any).waitUntil === "function") (context as any).waitUntil(send); else await send;
  return new Response(null, { status: 204 });
};

export const config: Config = {
  path: "/api/track",
  method: "POST",
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
