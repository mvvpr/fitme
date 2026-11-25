// POST /api/subscribe — store a pending subscriber and send a double opt-in email.
import type { Config, Context } from "@netlify/functions";
import "../../public/email-check.js";
import { subscribers, sha256, subKey, tokKey, unsKey, newToken, validTimeZone, mailConfig, sendMail, renderConfirmEmail, sendMetaEvents, requestUser, FBP_RE, FBC_RE, EVENT_ID_RE, asLang, cleanProts, cleanSrc, countryOf, currentUser, renderPlanUpdatedEmail, type Subscriber } from "../lib/core.mts";

const CONSENT_TEXT = "I agree to receive a daily meal-plan email from FitMe. We store your email, time zone and calorie settings to send it, and you can unsubscribe at any time. (privacy policy version 2026-11-13)";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async (req: Request, context: Context) => {
  let input: any;
  try { input = await req.json(); } catch { return Response.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const email = String(input?.email || "").trim().toLowerCase();
  // Probable typo (gmial.com, .comi, mail.com…): send the suggestion back unless the visitor chose to keep what they typed.
  const suggestion = input?.typoOk === true ? null : (globalThis as any).FITME_EMAIL_CHECK?.suggest(email);
  if (suggestion) return Response.json({ ok: false, error: "typo", suggest: suggestion }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 254) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (typeof input?.website === "string" && input.website) return Response.json({ ok: true }); // honeypot

  const intake = Math.round(Number(input?.intake));
  const prot = Math.round(Number(input?.prot));
  if (!(intake >= 1000 && intake <= 6000)) return Response.json({ ok: false, error: "invalid_intake" }, { status: 400 });
  const settings = {
    tz: validTimeZone(input?.tz) ? input.tz : "Europe/Lisbon",
    intake,
    prot: prot >= 40 && prot <= 400 ? prot : Math.round(intake * 0.3 / 4),
    units: input?.units === "imperial" ? "imperial" as const : "metric" as const,
    lang: asLang(input?.lang),
    diet: input?.diet === "veg" ? "veg" as const : "all" as const,
    prots: cleanProts(input?.prots),
  };

  // Meta measurement context: present only if the visitor accepted Meta cookies on the site.
  const m = input?.meta && typeof input.meta === "object" ? input.meta : null;
  const meta = m && EVENT_ID_RE.test(String(m.event_id || ""))
    ? {
        event_id: String(m.event_id),
        fbp: typeof m.fbp === "string" && FBP_RE.test(m.fbp) ? m.fbp : undefined,
        fbc: typeof m.fbc === "string" && FBC_RE.test(m.fbc) ? m.fbc : undefined,
        url: typeof m.url === "string" ? m.url.split("#")[0].slice(0, 500) : undefined,
        placement: ["plan", "meals-top", "meals-bottom"].includes(m.placement) ? m.placement : undefined,
      }
    : null;

  const cfg = mailConfig();
  if (!cfg) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const store = subscribers();
  const hash = await sha256(email);
  const existing = (await store.get(subKey(hash), { type: "json" })) as Subscriber | null;
  const now = new Date().toISOString();

  // Agreeing is needed once: a new address (or one that never confirmed) must tick the box.
  if (input?.consent !== true && existing?.status !== "active") return Response.json({ ok: false, error: "consent_required" }, { status: 400 });

  // Already confirmed once: apply the recalculated plan straight away, no new confirmation or consent needed.
  // If the request isn't from that person's own logged-in session, email them a short notice so a change they
  // didn't make doesn't go unnoticed.
  if (existing?.status === "active") {
    if (existing.confirmToken) await store.delete(tokKey(existing.confirmToken));
    await store.setJSON(subKey(hash), { ...existing, ...settings, pending: null, confirmToken: null, planUpdatedAt: now });
    const me = await currentUser(req);
    if (!(me && me.hash === hash)) {
      const siteUrl = context.site.url || new URL(req.url).origin;
      const notice = sendMail(cfg, { to: existing.email, ...renderPlanUpdatedEmail(siteUrl, settings), tag: "plan-updated", firstName: existing.profile?.firstName, lang: settings.lang }).catch((err) => console.error("plan notice failed", err));
      if (typeof (context as any).waitUntil === "function") (context as any).waitUntil(notice); else await notice;
    }
    return Response.json({ ok: true, applied: true });
  }

  // Throttle repeat confirmation emails to the same address.
  if (existing?.lastConfirmMailAt && Date.now() - Date.parse(existing.lastConfirmMailAt) < 2 * 60 * 1000) {
    return Response.json({ ok: true });
  }

  if (existing?.confirmToken) await store.delete(tokKey(existing.confirmToken));
  const confirmToken = newToken();

  const metaKeep = meta ? { fbp: meta.fbp, fbc: meta.fbc, url: meta.url } : null;
  const record: Subscriber = {
        email,
        status: "pending",
        ...settings,
        pending: null,
        confirmToken,
        unsubToken: existing?.unsubToken || newToken(),
        createdAt: existing?.createdAt || now,
        // A repeat sign-up before confirming doesn't restart the reminders (2 at most per address).
        ...(existing?.reminders ? { reminders: existing.reminders, lastReminderAt: existing.lastReminderAt } : {}),
        consentAt: now,
        consentText: CONSENT_TEXT,
        lastConfirmMailAt: now,
        meta: metaKeep,
        src: existing?.src || cleanSrc(input?.src),
        country: existing?.country || countryOf(context),
      };

  await store.setJSON(subKey(hash), record);
  await store.set(tokKey(confirmToken), hash);
  await store.set(unsKey(record.unsubToken), hash);

  const siteUrl = context.site.url || new URL(req.url).origin;
  const confirmUrl = `${siteUrl}/api/confirm?t=${confirmToken}${settings.lang && settings.lang !== "en" ? "&l=" + settings.lang : ""}`;
  const mail = renderConfirmEmail(siteUrl, confirmUrl, false, settings.lang);
  try {
    await sendMail(cfg, { to: email, ...mail, tag: "confirm", firstName: existing?.profile?.firstName, lang: settings.lang });
  } catch (err) {
    console.error("confirm email failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  // Lead: a brand-new address only (not a settings update or a repeat sign-up before confirming), same event_id as the
  // browser Pixel event. The response says whether it was a lead, so the browser fires its copy only then.
  const isLead = !existing;
  if (meta && isLead) {
    const send = sendMetaEvents([{
      event_name: "Lead",
      event_id: meta.event_id,
      event_source_url: meta.url && meta.url.startsWith(siteUrl) ? meta.url : siteUrl,
      user_data: { em: hash, external_id: hash, fbp: meta.fbp, fbc: meta.fbc, ...requestUser(req, context) },
      custom_data: { content_name: "Daily meal plan email", ...(meta.placement ? { content_category: meta.placement } : {}) },
    }]);
    if (typeof (context as any).waitUntil === "function") (context as any).waitUntil(send); else await send;
  }
  return Response.json({ ok: true, lead: isLead });
};

export const config: Config = {
  path: "/api/subscribe",
  method: "POST",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
