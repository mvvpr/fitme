// Scheduled every hour on the hour (UTC). Sends each active subscriber their meal plan
// when it is 07:xx in their own time zone (once per local day), and on Saturdays at 08:xx
// their shopping list for the week (once per Saturday).
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, unsKey, mailConfig, sendMail, renderDailyEmail, renderShoppingEmail, type Subscriber } from "../lib/core.mts";

const SEND_HOUR = 7;
const SHOP_HOUR = 8;
const SHOP_DAY = 5; // Saturday (Mon = 0)
const CONCURRENCY = 8;
const PENDING_TTL_MS = 30 * 864e5; // unconfirmed sign-ups are deleted after 30 days (privacy policy)
const TIME_BUDGET_MS = 24_000; // scheduled functions stop at 30s

const WEEKDAY: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

export function localParts(now: Date, tz: string, lang: "en" | "pt" = "en") {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23", weekday: "short" })
      .formatToParts(now).map((p) => [p.type, p.value]),
  );
  const label = new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(now);
  return { date: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour), dayIndex: WEEKDAY[parts.weekday] ?? 0, label };
}

export default async (req: Request, context: Context) => {
  const started = Date.now();
  const cfg = mailConfig();
  if (!cfg) { console.log("Mailgun not configured; skipping run"); return; }

  const siteUrl = Netlify.env.get("URL") || context.site.url;
  const store = subscribers();
  const { blobs } = await store.list({ prefix: "sub/" });
  const now = new Date();
  let sent = 0, shops = 0, skipped = 0, failed = 0, expired = 0;

  const queue = [...blobs];
  async function worker() {
    while (queue.length && Date.now() - started < TIME_BUDGET_MS) {
      const { key } = queue.shift()!;
      const sub = (await store.get(key, { type: "json" })) as Subscriber | null;
      if (sub && sub.status === "pending" && Date.now() - Date.parse(sub.lastConfirmMailAt || sub.createdAt) > PENDING_TTL_MS) {
        await store.delete(key);
        if (sub.confirmToken) await store.delete(tokKey(sub.confirmToken));
        if (sub.unsubToken) await store.delete(unsKey(sub.unsubToken));
        expired++; continue;
      }
      if (!sub || sub.status !== "active") { skipped++; continue; }
      const lang = sub.lang === "pt" ? "pt" : "en";
      const local = localParts(now, sub.tz, lang);
      const unsubUrl = `${siteUrl}/api/unsubscribe?u=${sub.unsubToken}${lang === "pt" ? "&l=pt" : ""}`;
      const base = { siteUrl, unsubUrl, dateLabel: local.label, intake: sub.intake, prot: sub.prot, imperial: sub.units === "imperial", lang } as const;
      try {
        if (local.hour === SEND_HOUR && sub.lastSentDate !== local.date) {
          await sendMail(cfg!, { to: sub.email, ...renderDailyEmail({ ...base, dayIndex: local.dayIndex }), unsubUrl, tag: "daily-plan" });
          await store.setJSON(key, { ...sub, lastSentDate: local.date });
          sent++;
        } else if (local.hour === SHOP_HOUR && local.dayIndex === SHOP_DAY && sub.lastShopDate !== local.date) {
          await sendMail(cfg!, { to: sub.email, ...renderShoppingEmail(base), unsubUrl, tag: "weekly-shopping" });
          await store.setJSON(key, { ...sub, lastShopDate: local.date });
          shops++;
        } else skipped++;
      } catch (err) {
        failed++;
        console.error("send failed", key, err);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`send-daily: ${sent} plans, ${shops} shopping lists, ${skipped} skipped, ${failed} failed, ${expired} expired, ${queue.length} left (of ${blobs.length})`);
};

export const config: Config = { schedule: "0 * * * *" }; // hourly at :00 UTC; plans at 07:00 local, shopping lists Saturdays 08:00 local
