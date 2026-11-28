// GET /api/confirm?t=TOKEN — activate a subscription (or apply an update) from the opt-in email.
// Clicking the link proves the address, so it also logs the person in and opens their account page with a welcome.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, htmlPage, sitePath, T, asLang, sendMetaEvents, sendPinterestEvents, requestUser, newToken, sessKey, sessionHeaders, sessionCookie, SESSION_TTL_MS, accountPath, type Subscriber } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const siteUrl = context.site.url || new URL(req.url).origin;
  const token = new URL(req.url).searchParams.get("t") || "";
  const v = new URL(req.url).searchParams.get("v");
  const via = v === "r1" || v === "r2" ? v : "email";
  const store = subscribers();
  const hash = /^[a-f0-9]{48}$/.test(token) ? ((await store.get(tokKey(token))) as string | null) : null;
  const sub = hash ? ((await store.get(subKey(hash), { type: "json" })) as Subscriber | null) : null;

  if (!sub || sub.confirmToken !== token) {
    const lang = asLang(new URL(req.url).searchParams.get("l"));
    return htmlPage(siteUrl, T[lang].expiredTitle, `<p style="line-height:1.55;color:#6b655e;">${T[lang].expiredBody(sitePath(siteUrl, lang) + "#meals")}</p>`, 410, lang);
  }

  const updated: Subscriber = {
    ...sub,
    ...(sub.pending || {}),
    status: "active",
    pending: null,
    confirmToken: null,
    confirmedAt: sub.confirmedAt || new Date().toISOString(),
    ...(sub.confirmedAt ? {} : { confirmedVia: via as Subscriber["confirmedVia"] }),
    meta: null, // measurement ids are only kept until the confirmation is reported
  };
  await store.setJSON(subKey(hash!), updated);
  await store.delete(tokKey(token));

  // CompleteRegistration: first confirmation only, and only if the visitor accepted Meta cookies at sign-up.
  if (sub.meta && !sub.confirmedAt) {
    const crId = `cr_${hash!.slice(0, 32)}`, crUrl = sitePath(siteUrl, updated.lang), who = requestUser(req, context);
    const crData = { content_name: "Daily meal plan email", status: "confirmed" };
    const send = Promise.all([
      sendMetaEvents([{ event_name: "CompleteRegistration", event_id: crId, event_source_url: crUrl, user_data: { em: hash!, external_id: hash!, fbp: sub.meta.fbp, fbc: sub.meta.fbc, ...who }, custom_data: crData }]),
      // Pinterest "signup" (server only, like Meta's CompleteRegistration).
      sendPinterestEvents([{ event_name: "CompleteRegistration", event_id: crId, event_source_url: crUrl, user_data: { em: hash!, external_id: hash!, click_id: sub.meta.epik, ...who }, custom_data: crData }]),
    ]);
    if (typeof (context as any).waitUntil === "function") (context as any).waitUntil(send); else await send;
  }

  const sid = newToken();
  await store.setJSON(sessKey(sid), { hash: hash!, exp: Date.now() + SESSION_TTL_MS });
  return new Response(null, { status: 303, headers: sessionHeaders({ Location: `${accountPath(siteUrl, asLang(updated.lang))}?welcome=1`, "cache-control": "no-store" }, sid, asLang(updated.lang)) });
};

export const config: Config = { path: "/api/confirm", method: "GET" };
