// GET /api/confirm?t=TOKEN — activate a subscription (or apply an update) from the opt-in email.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, htmlPage, type Subscriber } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const siteUrl = context.site.url || new URL(req.url).origin;
  const token = new URL(req.url).searchParams.get("t") || "";
  const store = subscribers();
  const hash = /^[a-f0-9]{48}$/.test(token) ? ((await store.get(tokKey(token))) as string | null) : null;
  const sub = hash ? ((await store.get(subKey(hash), { type: "json" })) as Subscriber | null) : null;

  if (!sub || sub.confirmToken !== token) {
    return htmlPage(siteUrl, "This link has expired",
      `<p style="line-height:1.55;color:#6b655e;">It may have been used already or replaced by a newer email. You can <a href="${siteUrl}/#meal-plan" style="color:#2e6b4f;">sign up again on FitMe</a>.</p>`, 410);
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

  return new Response(null, { status: 303, headers: { Location: `${siteUrl}/#subscribed`, "cache-control": "no-store" } });
};

export const config: Config = { path: "/api/confirm", method: "GET" };
