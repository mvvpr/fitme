// /api/unsubscribe?u=TOKEN
// GET shows a confirm button (so link scanners can't unsubscribe people); POST deletes the subscriber.
// POST also serves RFC 8058 one-click unsubscribe from mail clients (List-Unsubscribe-Post).
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, unsKey, htmlPage, esc, type Subscriber } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const siteUrl = context.site.url || new URL(req.url).origin;
  const token = new URL(req.url).searchParams.get("u") || "";
  const store = subscribers();
  const hash = /^[a-f0-9]{48}$/.test(token) ? ((await store.get(unsKey(token))) as string | null) : null;

  if (req.method === "GET") {
    if (!hash) return htmlPage(siteUrl, "You're not subscribed", `<p style="line-height:1.55;color:#6b655e;">This address isn't on the FitMe daily email list anymore.</p>`);
    return htmlPage(siteUrl, "Stop the daily meal plan?",
      `<p style="line-height:1.55;color:#6b655e;margin:0 0 18px;">You'll stop getting FitMe emails and we'll delete your email address and settings.</p>
<form method="post" action="/api/unsubscribe?u=${esc(token)}"><button type="submit" style="background:#2e6b4f;color:#fff;border:0;border-radius:8px;padding:11px 20px;font-size:15px;font-weight:600;cursor:pointer;">Unsubscribe</button></form>`);
  }

  if (hash) {
    const sub = (await store.get(subKey(hash), { type: "json" })) as Subscriber | null;
    if (sub?.confirmToken) await store.delete(tokKey(sub.confirmToken));
    await store.delete(subKey(hash));
    await store.delete(unsKey(token));
  }
  // One-click requests from mail clients just need a 200.
  if ((req.headers.get("content-type") || "").includes("application/x-www-form-urlencoded")) {
    const body = await req.text();
    if (body.includes("List-Unsubscribe=One-Click")) return new Response("Unsubscribed", { status: 200 });
  }
  return htmlPage(siteUrl, "You're unsubscribed",
    `<p style="line-height:1.55;color:#6b655e;">Your email and settings have been deleted. You can <a href="${siteUrl}/#meal-plan" style="color:#2e6b4f;">sign up again</a> any time.</p>`);
};

export const config: Config = { path: "/api/unsubscribe", method: ["GET", "POST"] };
