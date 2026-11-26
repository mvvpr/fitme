// /api/swap?c=CLICK_TOKEN[&l=pt|br] — "swap today's menu", linked from the daily email.
// GET shows today's swapped menu, or the offer to swap (it never changes anything: email link scanners open links).
// POST do=swap picks another day's menu at random from Menu A and Menu B; do=reset goes back to today's original menu.
// The swap is stored in swp/<hash> for the subscriber's local date only, so tomorrow's email is back to the plan.
import type { Config, Context } from "@netlify/functions";
import { subscribers, clkKey, subKey, swpKey, actKey, addClick, TOKEN_RE, M, T, htmlPage, asLang, sitePath, planDiet, localParts, pickSwap, notOnWeekList, swapPage, type Subscriber, type SwapState, type Activity } from "../lib/core.mts";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const siteUrl = context.site.url || url.origin;
  const token = url.searchParams.get("c") || "";
  let lang = asLang(url.searchParams.get("l"));
  const store = subscribers();
  const hash = TOKEN_RE.test(token) ? await store.get(clkKey(token), { type: "text" }) : null;
  const sub = hash ? ((await store.get(subKey(hash), { type: "json" })) as Subscriber | null) : null;
  if (!hash || !sub || sub.status !== "active") {
    const t = T[lang];
    return htmlPage(siteUrl, t.expiredTitle, `<p style="line-height:1.55;color:#6b655e;">${t.expiredBody(sitePath(siteUrl, lang))}</p>`, 410, lang);
  }
  lang = asLang(url.searchParams.get("l") || sub.lang);
  const local = localParts(new Date(), sub.tz, lang);
  const saved = (await store.get(swpKey(hash), { type: "json" })) as SwapState | null;
  let today = saved && saved.date === local.date ? saved : null;

  if (req.method === "POST") {
    const form = await req.formData().catch(() => null);
    if (form?.get("do") === "reset") {
      await store.delete(swpKey(hash));
      today = null;
    } else {
      const next = pickSwap(sub, local.dayIndex, today || { menu: "A", day: local.dayIndex });
      today = { date: local.date, ...next };
      await store.setJSON(swpKey(hash), today);
      try {
        const prev = (await store.get(actKey(hash), { type: "json" })) as Activity | null;
        await store.setJSON(actKey(hash), addClick(prev, "swapped"));
      } catch (err) { console.error("swap not counted", err); }
    }
    // Back to GET, so a refresh doesn't swap again.
    return new Response(null, { status: 303, headers: { Location: `/api/swap?c=${token}${lang !== "en" ? "&l=" + lang : ""}`, "cache-control": "no-store" } });
  }

  if (!today) return swapPage(siteUrl, lang, { token, dateLabel: local.label, sub });
  const meals = M.buildDay(today.day, sub.intake, sub.prot, lang, planDiet(sub), today.menu);
  return swapPage(siteUrl, lang, { token, dateLabel: local.label, sub, meals, missing: notOnWeekList(sub, lang, meals) });
};

export const config: Config = { path: "/api/swap", method: ["GET", "POST"] };
