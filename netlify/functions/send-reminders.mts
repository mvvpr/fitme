// Scheduled every hour at :30 UTC (send-daily runs at :00). Reminds sign-ups that never confirmed:
// reminder 1 once 24h have passed since sign-up, reminder 2 (the last) once 72h have passed and at least 48h after reminder 1.
// Subscribers who are already active (including ones confirming a settings update) never get these.
// Reuses the subscriber's current confirm token, so the link in the first email keeps working too.
// Nothing is deleted here.
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, newToken, mailConfig, sendMail, renderReminderEmail, asLang, type Subscriber } from "../lib/core.mts";

const H = 36e5;
const R1_AFTER = 24 * H;   // since sign-up
const R2_AFTER = 72 * H;   // since sign-up
const R2_GAP = 48 * H;     // since reminder 1 (spaces them out for older sign-ups reminded for the first time)
const CONCURRENCY = 6;
const TIME_BUDGET_MS = 24_000; // scheduled functions stop at 30s; whatever is left goes out next hour

export function dueReminder(sub: Subscriber, now: number): 1 | 2 | null {
  if (sub.status !== "pending" || sub.confirmedAt) return null;
  const age = now - Date.parse(sub.createdAt);
  const n = sub.reminders || 0;
  if (n === 0 && age >= R1_AFTER) return 1;
  if (n === 1 && age >= R2_AFTER && now - Date.parse(sub.lastReminderAt || sub.createdAt) >= R2_GAP) return 2;
  return null;
}

export default async (req: Request, context: Context) => {
  const started = Date.now();
  const cfg = mailConfig();
  if (!cfg) { console.log("Mailgun not configured; skipping run"); return; }
  if (Netlify.env.get("REMINDERS_OFF") === "1") { console.log("Reminders switched off (REMINDERS_OFF=1)"); return; }

  const siteUrl = Netlify.env.get("URL") || context.site.url;
  const store = subscribers();
  const { blobs } = await store.list({ prefix: "sub/" });
  let r1 = 0, r2 = 0, failed = 0;

  const queue = [...blobs];
  async function worker() {
    while (queue.length && Date.now() - started < TIME_BUDGET_MS) {
      const { key } = queue.shift()!;
      const sub = (await store.get(key, { type: "json" })) as Subscriber | null;
      if (!sub) continue;
      const n = dueReminder(sub, Date.now());
      if (!n) continue;

      const hash = key.slice("sub/".length);
      const lang = asLang(sub.lang);
      let token = sub.confirmToken;
      if (!token) { token = newToken(); await store.set(tokKey(token), hash); }
      const l = lang !== "en" ? "&l=" + lang : "";
      const confirmUrl = `${siteUrl}/api/confirm?t=${token}${l}&v=r${n}`;
      const unsubUrl = `${siteUrl}/api/unsubscribe?u=${sub.unsubToken}${l}`;

      // Mark first, then send: a failed send is retried next hour, but a crash after sending can never double-send.
      const at = new Date().toISOString();
      await store.setJSON(key, { ...sub, confirmToken: token, reminders: n, lastReminderAt: at });
      try {
        await sendMail(cfg!, { to: sub.email, ...renderReminderEmail(siteUrl, confirmUrl, unsubUrl, n, lang), unsubUrl, tag: `reminder-${n}`, firstName: sub.profile?.firstName, lang });
        if (n === 1) r1++; else r2++;
      } catch (err) {
        failed++;
        console.error("reminder failed", key, err);
        await store.setJSON(key, { ...sub, confirmToken: token }); // undo the mark so it's tried again
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`send-reminders: ${r1} first reminders, ${r2} last reminders, ${failed} failed, ${queue.length} left (of ${blobs.length})`);
};

export const config: Config = { schedule: "30 * * * *" };
