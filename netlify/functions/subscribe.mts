// POST /api/subscribe — store a pending subscriber and send a double opt-in email.
import type { Config, Context } from "@netlify/functions";
import { subscribers, sha256, subKey, tokKey, unsKey, newToken, validTimeZone, mailConfig, sendMail, renderConfirmEmail, sendMetaEvents, requestUser, FBP_RE, FBC_RE, EVENT_ID_RE, type Subscriber } from "../lib/core.mts";

const CONSENT_TEXT = "I agree to receive a daily meal-plan email from FitMe. We store your email, time zone and calorie settings to send it, and you can unsubscribe at any time. (privacy policy version 2026-11-13)";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async (req: Request, context: Context) => {
  let input: any;
  try { input = await req.json(); } catch { return Response.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const email = String(input?.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (input?.consent !== true) return Response.json({ ok: false, error: "consent_required" }, { status: 400 });
  if (typeof input?.website === "string" && input.website) return Response.json({ ok: true }); // honeypot

  const intake = Math.round(Number(input?.intake));
  const prot = Math.round(Number(input?.prot));
  if (!(intake >= 1000 && intake <= 6000)) return Response.json({ ok: false, error: "invalid_intake" }, { status: 400 });
  const settings = {
    tz: validTimeZone(input?.tz) ? input.tz : "Europe/Lisbon",
    intake,
    prot: prot >= 40 && prot <= 400 ? prot : Math.round(intake * 0.3 / 4),
    units: input?.units === "imperial" ? "imperial" as const : "metric" as const,
    lang: input?.lang === "pt" ? "pt" as const : "en" as const,
  };

  // Meta measurement context: present only if the visitor accepted Meta cookies on the site.
  const m = input?.meta && typeof input.meta === "object" ? input.meta : null;
  const meta = m && EVENT_ID_RE.test(String(m.event_id || ""))
    ? {
        event_id: String(m.event_id),
        fbp: typeof m.fbp === "string" && FBP_RE.test(m.fbp) ? m.fbp : undefined,
        fbc: typeof m.fbc === "string" && FBC_RE.test(m.fbc) ? m.fbc : undefined,
        url: typeof m.url === "string" ? m.url.split("#")[0].slice(0, 500) : undefined,
      }
    : null;

  const cfg = mailConfig();
  if (!cfg) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const store = subscribers();
  const hash = await sha256(email);
  const existing = (await store.get(subKey(hash), { type: "json" })) as Subscriber | null;
  const now = new Date().toISOString();

  // Throttle repeat confirmation emails to the same address.
  if (existing?.lastConfirmMailAt && Date.now() - Date.parse(existing.lastConfirmMailAt) < 2 * 60 * 1000) {
    return Response.json({ ok: true });
  }

  if (existing?.confirmToken) await store.delete(tokKey(existing.confirmToken));
  const confirmToken = newToken();
  const isUpdate = existing?.status === "active";

  const metaKeep = meta ? { fbp: meta.fbp, fbc: meta.fbc, url: meta.url } : null;
  const record: Subscriber = existing && isUpdate
    ? { ...existing, pending: settings, confirmToken, lastConfirmMailAt: now }
    : {
        email,
        status: "pending",
        ...settings,
        pending: null,
        confirmToken,
        unsubToken: existing?.unsubToken || newToken(),
        createdAt: existing?.createdAt || now,
        consentAt: now,
        consentText: CONSENT_TEXT,
        lastConfirmMailAt: now,
        meta: metaKeep,
      };

  await store.setJSON(subKey(hash), record);
  await store.set(tokKey(confirmToken), hash);
  await store.set(unsKey(record.unsubToken), hash);

  const siteUrl = context.site.url || new URL(req.url).origin;
  const confirmUrl = `${siteUrl}/api/confirm?t=${confirmToken}${settings.lang === "pt" ? "&l=pt" : ""}`;
  const mail = renderConfirmEmail(siteUrl, confirmUrl, isUpdate, settings.lang);
  try {
    await sendMail(cfg, { to: email, ...mail, tag: "confirm" });
  } catch (err) {
    console.error("confirm email failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  // Lead: a new sign-up (not a settings update), same event_id as the browser Pixel event.
  if (meta && !isUpdate) {
    const send = sendMetaEvents([{
      event_name: "Lead",
      event_id: meta.event_id,
      event_source_url: meta.url && meta.url.startsWith(siteUrl) ? meta.url : siteUrl,
      user_data: { em: hash, external_id: hash, fbp: meta.fbp, fbc: meta.fbc, ...requestUser(req, context) },
      custom_data: { content_name: "Daily meal plan email" },
    }]);
    if (typeof (context as any).waitUntil === "function") (context as any).waitUntil(send); else await send;
  }
  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/subscribe",
  method: "POST",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
