// Scheduled every hour on the hour (UTC). Sends each active subscriber their meal plan
// when it is 07:xx in their own time zone, at most once per local day.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, mailConfig, sendMail, renderDailyEmail, type Subscriber } from "../lib/core.mts";

const SEND_HOUR = 7;
const CONCURRENCY = 8;
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
  let sent = 0, skipped = 0, failed = 0;

  const queue = [...blobs];
  async function worker() {
    while (queue.length && Date.now() - started < TIME_BUDGET_MS) {
      const { key } = queue.shift()!;
      const sub = (await store.get(key, { type: "json" })) as Subscriber | null;
      if (!sub || sub.status !== "active") { skipped++; continue; }
      const lang = sub.lang === "pt" ? "pt" : "en";
      const local = localParts(now, sub.tz, lang);
      if (local.hour !== SEND_HOUR || sub.lastSentDate === local.date) { skipped++; continue; }
      const unsubUrl = `${siteUrl}/api/unsubscribe?u=${sub.unsubToken}${lang === "pt" ? "&l=pt" : ""}`;
      const mail = renderDailyEmail({ siteUrl, unsubUrl, dayIndex: local.dayIndex, dateLabel: local.label, intake: sub.intake, prot: sub.prot, imperial: sub.units === "imperial", lang });
      try {
        await sendMail(cfg!, { to: sub.email, ...mail, unsubUrl, tag: "daily-plan" });
        await store.setJSON(key, { ...sub, lastSentDate: local.date });
        sent++;
      } catch (err) {
        failed++;
        console.error("daily send failed", key, err);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`send-daily: ${sent} sent, ${skipped} skipped, ${failed} failed, ${queue.length} left (of ${blobs.length})`);
};

export const config: Config = { schedule: "0 * * * *" }; // hourly at :00 UTC; each user gets theirs at 07:00 local
