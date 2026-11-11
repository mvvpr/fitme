// POST /api/subscribe — store a pending subscriber and send a double opt-in email.
import type { Config, Context } from "@netlify/functions";
import { subscribers, sha256, subKey, tokKey, unsKey, newToken, validTimeZone, mailConfig, sendMail, renderConfirmEmail, type Subscriber } from "../lib/core.mts";

const CONSENT_TEXT = "I agree to receive a daily meal-plan email from FitMe. I can unsubscribe at any time.";
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
  };

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
      };

  await store.setJSON(subKey(hash), record);
  await store.set(tokKey(confirmToken), hash);
  await store.set(unsKey(record.unsubToken), hash);

  const siteUrl = context.site.url || new URL(req.url).origin;
  const confirmUrl = `${siteUrl}/api/confirm?t=${confirmToken}`;
  const mail = renderConfirmEmail(siteUrl, confirmUrl, isUpdate);
  try {
    await sendMail(cfg, { to: email, ...mail, tag: "confirm" });
  } catch (err) {
    console.error("confirm email failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/subscribe",
  method: "POST",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
