// Scheduled every hour on the hour (UTC). Sends each active subscriber their meal plan
// when it is 07:xx in their own time zone (once per local day), and on Saturdays at 08:xx
// their shopping list for the week (once per Saturday).
import type { Config, Context } from "@netlify/functions";
import { subscribers, subKey, tokKey, unsKey, actKey, ensureClickToken, ensureListToken, pruneActivity, type Activity, mailConfig, sendMail, renderDailyEmail, renderShoppingEmail, asLang, planDiet, localParts, type Subscriber } from "../lib/core.mts";
export { localParts }; // moved to core (the swap page needs it too); kept exported here for anything importing it from this file

const SEND_HOUR = 7;
const SHOP_HOUR = 8;
const SHOP_DAY = 5; // Saturday (Mon = 0)
// The Saturday email also prints the list under the "Open my list" button until this date (first two Saturdays after the switch).
const LIST_FALLBACK_UNTIL = "2026-12-06";
const CONCURRENCY = 8;
const PENDING_TTL_MS = 30 * 864e5; // unconfirmed sign-ups are deleted after 30 days (privacy policy)
const TIME_BUDGET_MS = 24_000; // scheduled functions stop at 30s

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
      let sub = (await store.get(key, { type: "json" })) as Subscriber | null;
      if (sub && sub.status === "pending" && Date.now() - Date.parse(sub.lastConfirmMailAt || sub.createdAt) > PENDING_TTL_MS) {
        await store.delete(key);
        if (sub.confirmToken) await store.delete(tokKey(sub.confirmToken));
        if (sub.unsubToken) await store.delete(unsKey(sub.unsubToken));
        expired++; continue;
      }
      if (!sub || sub.status !== "active") { skipped++; continue; }
      const lang = asLang(sub.lang);
      const local = localParts(now, sub.tz, lang);
      const unsubUrl = `${siteUrl}/api/unsubscribe?u=${sub.unsubToken}${lang !== "en" ? "&l=" + lang : ""}`;
      const base = { siteUrl, unsubUrl, dateLabel: local.label, intake: sub.intake, prot: sub.prot, imperial: sub.units === "imperial", lang, diet: planDiet(sub) };
      const due = (local.hour === SEND_HOUR && sub.lastSentDate !== local.date) || (local.hour === SHOP_HOUR && local.dayIndex === SHOP_DAY && sub.lastShopDate !== local.date);
      if (!due) { skipped++; continue; }
      try {
        sub = await ensureClickToken(store, key, sub); // tracked links (/api/go) need the subscriber's click code
        const tracked = { ...base, clickToken: sub.clickToken };
        if (local.hour === SEND_HOUR && sub.lastSentDate !== local.date) {
          await sendMail(cfg!, { to: sub.email, ...renderDailyEmail({ ...tracked, dayIndex: local.dayIndex }), unsubUrl, tag: "daily-plan", firstName: sub.profile?.firstName, lang: base.lang });
          await store.setJSON(key, { ...sub, lastSentDate: local.date });
          sent++;
          await pruneClicks(store, key);
        } else if (local.hour === SHOP_HOUR && local.dayIndex === SHOP_DAY && sub.lastShopDate !== local.date) {
          sub = await ensureListToken(store, key, sub); // the "Open my list" link opens their list without logging in
          await sendMail(cfg!, { to: sub.email, ...renderShoppingEmail({ ...tracked, listToken: sub.listToken, fallback: local.date < LIST_FALLBACK_UNTIL }), unsubUrl, tag: "weekly-shopping", firstName: sub.profile?.firstName, lang: base.lang });
          await store.setJSON(key, { ...sub, lastShopDate: local.date });
          shops++;
        }
      } catch (err) {
        failed++;
        console.error("send failed", key, err);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`send-daily: ${sent} plans, ${shops} shopping lists, ${skipped} skipped, ${failed} failed, ${expired} expired, ${queue.length} left (of ${blobs.length})`);
};

// Keeps email click history to the last 120 days (privacy policy): drops older days, deletes the record when none are left.
async function pruneClicks(store: ReturnType<typeof subscribers>, key: string) {
  try {
    const k = actKey(key.slice(4));
    const a = (await store.get(k, { type: "json" })) as Activity | null;
    if (!a) return;
    const kept = pruneActivity(a);
    if (!kept) await store.delete(k);
    else if (Object.keys(kept.days).length !== Object.keys(a.days).length) await store.setJSON(k, kept);
  } catch (err) { console.error("click prune failed", key, err); }
}

export const config: Config = { schedule: "0 * * * *" }; // hourly at :00 UTC; plans at 07:00 local, shopping lists Saturdays 08:00 local
