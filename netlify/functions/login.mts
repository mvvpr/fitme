// POST /api/login { email, lang } — email a one-time log-in link to an address that's already on FitMe.
// Always answers { ok: true } for a valid email, so the form never reveals who has an account.
import type { Config, Context } from "@netlify/functions";
import { subscribers, sha256, subKey, loginKey, newToken, LOGIN_TTL_MS, mailConfig, sendMail, renderLoginEmail, asLang, type Subscriber } from "../lib/core.mts";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async (req: Request, context: Context) => {
  let input: any;
  try { input = await req.json(); } catch { return Response.json({ ok: false, error: "bad_request" }, { status: 400 }); }
  const email = String(input?.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (typeof input?.website === "string" && input.website) return Response.json({ ok: true }); // honeypot

  const cfg = mailConfig();
  if (!cfg) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const store = subscribers();
  const hash = await sha256(email);
  const sub = (await store.get(subKey(hash), { type: "json" })) as Subscriber | null;
  if (!sub) return Response.json({ ok: true });

  const lang = asLang(sub.lang || input?.lang);
  const token = newToken();
  await store.setJSON(loginKey(token), { hash, exp: Date.now() + LOGIN_TTL_MS });
  const siteUrl = context.site.url || new URL(req.url).origin;
  const url = `${siteUrl}/api/auth?t=${token}${lang !== "en" ? "&l=" + lang : ""}`;
  try {
    await sendMail(cfg, { to: sub.email, ...renderLoginEmail(siteUrl, url, lang), tag: "login", firstName: sub.profile?.firstName, lang });
  } catch (err) {
    console.error("login email failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/login",
  method: "POST",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
