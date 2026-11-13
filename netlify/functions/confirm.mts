// GET /api/confirm?t=TOKEN — activate a subscription (or apply an update) from the opt-in email.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, htmlPage, sitePath, T, sendMetaEvents, requestUser, type Subscriber } from "../lib/core.mts";

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
    meta: null, // measurement ids are only kept until the confirmation is reported
  };
  await store.setJSON(subKey(hash!), updated);
  await store.delete(tokKey(token));

  // CompleteRegistration: first confirmation only, and only if the visitor accepted Meta cookies at sign-up.
  if (sub.meta && !sub.confirmedAt) {
    const send = sendMetaEvents([{
      event_name: "CompleteRegistration",
      event_id: `cr_${hash!.slice(0, 32)}`,
      event_source_url: sitePath(siteUrl, updated.lang),
      user_data: { em: hash!, external_id: hash!, fbp: sub.meta.fbp, fbc: sub.meta.fbc, ...requestUser(req, context) },
      custom_data: { content_name: "Daily meal plan email", status: "confirmed" },
    }]);
    if (typeof (context as any).waitUntil === "function") (context as any).waitUntil(send); else await send;
  }

  return new Response(null, { status: 303, headers: { Location: `${sitePath(siteUrl, updated.lang)}#subscribed`, "cache-control": "no-store" } });
};

export const config: Config = { path: "/api/confirm", method: "GET" };
