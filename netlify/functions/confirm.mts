// GET /api/confirm?t=TOKEN — activate a subscription (or apply an update) from the opt-in email.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, htmlPage, sitePath, T, type Subscriber } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const siteUrl = context.site.url || new URL(req.url).origin;
  const token = new URL(req.url).searchParams.get("t") || "";
  const store = subscribers();
  const hash = /^[a-f0-9]{48}$/.test(token) ? ((await store.get(tokKey(token))) as string | null) : null;
  const sub = hash ? ((await store.get(subKey(hash), { type: "json" })) as Subscriber | null) : null;

  if (!sub || sub.confirmToken !== token) {
    const lang = new URL(req.url).searchParams.get("l") === "pt" ? "pt" : "en";
    return htmlPage(siteUrl, T[lang].expiredTitle, `<p style="line-height:1.55;color:#6b655e;">${T[lang].expiredBody(sitePath(siteUrl, lang) + "#meals")}</p>`, 410, lang);
  }

  const updated: Subscriber = {
    ...sub,
    ...(sub.pending || {}),
    status: "active",
    pending: null,
    confirmToken: null,
    confirmedAt: sub.confirmedAt || new Date().toISOString(),
  };
  await store.setJSON(subKey(hash!), updated);
  await store.delete(tokKey(token));

  return new Response(null, { status: 303, headers: { Location: `${sitePath(siteUrl, updated.lang)}#subscribed`, "cache-control": "no-store" } });
};

export const config: Config = { path: "/api/confirm", method: "GET" };
