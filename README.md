<p align="center"><img src="brand/fitme-logo-light.svg" alt="FitMe" height="64"></p>

# FitMe

A calorie-deficit weight loss calculator. Enter your details and a daily deficit to see when you could reach your goal weight.

## Features

- Basal (BMR) and maintenance calories from the Mifflin-St Jeor equation and your activity level
- Two plan modes: **Same intake** (loss slows as maintenance drops) and **Same deficit** (intake steps down)
- Three paces (slow, recommended, faster) with deficits suggested by age and body weight; the plan assumes the user follows it every day
- Week-by-week table under "How we calculated this"
- Safety flags for very low intake, fast loss rates and low goal BMI
- Weekly high-protein meal plan: 4 meals a day (breakfast, lunch, snack, dinner) with ingredients and method, portions scaled to the user's intake, plus a weekly shopping list. The week rotates a small pool (`POOL` in `meals.js`): 3 breakfasts, 4 mains that serve as lunch or dinner (tonight's dinner is tomorrow's lunch) and 2 snacks, sharing ingredients so the shopping list stays at about 27 items
- English and European Portuguese (`/pt/`): interface, recipes, shopping list and emails
- Metric and imperial units; light and dark themes

- Daily meal-plan email at 07:00 and a weekly shopping-list email on Saturdays at 08:00, in each subscriber's time zone and language; double opt-in, one-click unsubscribe
- Confirmation reminders for sign-ups that haven't confirmed: reminder 1 at 24h, reminder 2 (the last) at 72h and at least 48h after the first, in the sign-up's language, by the hourly scheduled `send-reminders` (at :30 UTC). They reuse the current confirm link, add `v=r1`/`v=r2` so `/api/confirm` records which email the click came from (`confirmedVia`), and `/api/stats` reports them under `reminders`. Set `REMINDERS_OFF=1` to pause them

## Stack

- `public/`: the static site (`index.html`, shared recipe and portion logic in `meals.js`, Portuguese recipes in `meals.pt.js`, interface text in `i18n.js`, brand assets). No build step. `/pt/` is served by a rewrite in `netlify.toml`.
- `netlify/functions/`: `subscribe`, `confirm`, `unsubscribe`, `track`, `stats`, `go` (email click redirect), `list` (shopping list) and the hourly scheduled `send-daily` and `send-reminders`. Emails use the subscriber's protein picks (`prots`), falling back to `diet` for older sign-ups.
- Recipe pages (`/recipes/`, `/pt/receitas/`, `/br/receitas/`) are static HTML built by `node scripts/build-recipes.mjs` from `public/meals*.js` (numbers) and `scripts/recipes-content.mjs` + `scripts/recipes-content-2.mjs` (words per language, tips). Every plan recipe has a page (breakfasts, mains, snacks); each page shows 8 related recipes (same course first). The sitemap carries `lastmod`, kept from the previous build unless the page HTML changed. Rebuild and commit after changing either. Slugs are permanent once live. The homepage links to them quietly from the start screen (`.site-links`).
- `netlify/edge-functions/meta-locale.ts`: swaps the title, description and share (Open Graph) tags for `/pt/` and `/br/`, since crawlers don't run the page script. Share images: `public/img/og/fitme-{en,pt,br}.jpg` (1200×630).
- Accounts: log in by email link, no passwords. `/login/` (and `/pt/login/`, `/br/login/`) posts to `/api/login`, which emails a one-time link (15 min) to addresses already on FitMe only, and always answers ok so it never reveals who has an account. The link opens `/api/auth`, which shows a button (so email link scanners can't use the token up); its POST starts a 30-day session in the HttpOnly cookie `fm_s` (`sess/<sid>` in Blobs) and goes to `/account/`. `/api/me` returns the logged-in user's details; POST `{action:"logout"}` ends the session. Unsubscribing deletes the record, which also ends any session. The account page also has an optional profile (first/last name, mobile in international format, a social profile link, and interest in a Fitness Coach / a personalised plan), saved with POST `{action:"profile"}` and counted in `/api/stats` under `profiles`. The mobile number is not used for contact. On `/account/`, users can change only their protein picks (POST `{action:"plan", plan:{prots}}`); calories and protein come from the calculator. Recalculating on the homepage with an address that has already confirmed applies the new plan straight away, logged in or not, with no new confirmation or consent box (`/api/subscribe` answers `applied: true`); when the request isn't from that person's own logged-in session, they get a short "your plan was updated" email. Logged-in confirmed users see their email filled in and no consent box. New or never-confirmed addresses still tick the box and confirm. Clicking the confirmation link also logs the person in (it proves the address) and opens `/account/?welcome=1`, which shows a short welcome; the daily and Saturday emails link to the account page in the footer.
- Email click tracking (first-party): links in the daily and Saturday emails (full week / shopping list, account, recalculate) go through `/api/go?c=<clickToken>&k=<kind>&to=<path>` on fitmeplan.com. It redirects (302) to a path on this site only (anything else goes to `/`) and records the click in `act/<hash>` as clicks per day and link kind (`week`, `shop`, `account`, `recalc`, `list`, `swap`, plus `swapped` counted by `/api/swap`), kept for 120 days (older days are dropped on each click and after each daily send). Link scanners and crawlers (by user agent) are redirected but not counted. Each subscriber gets a `clickToken` (lookup `clk/<token>`) the first time a tracked email is sent; emails without one keep plain links. Confirm, log-in and unsubscribe links are never wrapped. Unsubscribing deletes `clk/` and `act/` with the record. `/api/stats` reports totals under `clicks`. Mailgun's own click tracking stays off; opens are still tracked by Mailgun.
- Shopping list: `/account/list/` (and `/pt/…`, `/br/…`) shows the week's list from `M.shoppingList` (aisles, extras, the user's own items) as a tap-to-tick checklist: ticked items drop to the bottom of their aisle, progress bar, "Hide ticked", "Start over", "Keep screen on" (Screen Wake Lock). Ticks are applied on the phone first and queued in local storage, then synced to `/api/list` (works with bad signal). `/api/list` accepts the log-in session or the list token from the Saturday email (`?k=` on the page, sent as `x-list-key`): the token only opens the list and ticks; adding/removing own items needs a log-in. Storage: `ltk/<hash>/<saturday>` (ticks per shopping week, Saturday to Friday in the user's time zone, kept 14 days), `lown/<hash>` (own items, max 40), `lst/<token>` (list link). Unsubscribing deletes all of it. The account page links to the list.
- Swap today's menu: the daily email links to `/api/swap?c=<clickToken>` (via `/api/go`, kind `swap`). GET shows a page and never changes anything (link scanners); its POST (`do=swap`) picks another day's menu at random from every day of Menu A and Menu B (`M.buildDay(..., menu)` with `'A'` or `'B'`), skipping days with the same dishes as the one showing or today's original, sized to the subscriber's calories and protein and their protein picks. `do=reset` goes back to the original. The swap is kept in `swp/<hash>` for the subscriber's local date only, so tomorrow's email is back to the plan. The page lists anything not on this week's shopping list. Swaps are counted in `act/<hash>` as `swapped`. Unsubscribing deletes `swp/`.
- Menu B (`MENU_B` in `meals.js`, `menuB` in the PT/BR files): the second week of recipes. Used by the swap page now; the weekly rotation will use it too. Recipes listed in `MENU_B_PHOTOS` have real photos; the rest get `noPhoto: true` until theirs exist (add the img to the list once its files are in `public/img/meals/` and `public/img/email/`).
- Saturday email: a reminder ("Your shopping list for the week is ready", item count, "Open my list" button, tracked as `list`), with the full list printed underneath until `LIST_FALLBACK_UNTIL` in `send-daily` (the first two Saturdays). Each subscriber gets a `listToken` at their first Saturday send.
- Subscribers are stored in Netlify Blobs (store `fitme-subscribers`, EU region `eu-central-1`). Emails are sent through the Mailgun API.

## Email setup (Netlify environment variables, scope: Functions)

| Variable | Value |
|---|---|
| `MAILGUN_API_KEY` | Mailgun sending API key |
| `MAILGUN_DOMAIN` | Verified sending domain, e.g. `mg.yourdomain.com` |
| `MAILGUN_REGION` | `eu` (default) or `us` |
| `MAIL_FROM` | Optional, e.g. `FitMe <plan@mg.yourdomain.com>` |

Until `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` are set, sign-up shows "opens soon" and the scheduled send does nothing.

## Meta Pixel + Conversions API

- `public/track.js` shows a consent banner (EN/PT). Nothing from Meta loads and no `_fbp`/`_fbc` cookies are set until the visitor accepts; "Cookie settings" in the footers reopens the choice (declining later clears the cookies).
- Events (each browser event has an `event_id`; the server sends the same id so Meta deduplicates):
  - `PageView`: page load, Pixel + CAPI via `/api/track`
  - `ViewContent`: first time the plan is shown, Pixel + CAPI via `/api/track`
  - `Lead`: new email sign-up, Pixel + CAPI from `/api/subscribe` (hashed email)
  - `CompleteRegistration`: double opt-in confirmed, CAPI only from `/api/confirm`
  - Custom step events, once per browser session, Pixel + CAPI: `Step1_About` (1), `Step2_Goal` (2), `Step3_Plan` (3), `Step4_Proteins` (4), `Step4_Meals` (5; name kept for continuity) (custom_data: step, content_name, lang)
- Google Tag Manager (`GTM-MR4N337L`) loads from `track.js` only after consent, like the Pixel; tracked events are pushed to the dataLayer with the same names (PageView, ViewContent, Step…, Lead) and their custom data as `fitme_*`. The consent key is `fitme-consent-v2` (bumped when Google was added). Don't add a Meta Pixel tag inside GTM. The Google Ads tag (`AW-18588647321`) and its Sign-up conversion are in `track.js` (fired with Lead, `transaction_id` = event id), so don't also add a Sign-up conversion tag in GTM.
- The Pixel's own history-change PageViews are off (`fbq.disablePushState`): the steps change the URL hash, and only the page-load PageView (with its server copy) should count.
- Privacy policy (EN/PT): `public/privacy.html`, served at `/privacy.html` and `/pt/privacy.html`; linked from the banner, the footers and the sign-up consent line. Unconfirmed sign-ups are deleted after 30 days by `send-daily`.
- Server events are sent only for visitors who accepted cookies. `fbp`/`fbc` are kept on the subscriber record until confirmation, then deleted.

| Variable | Value |
|---|---|
| `META_CAPI_TOKEN` | Conversions API access token from Events Manager (mark as secret). Without it, CAPI is skipped and the Pixel still works. |
| `META_PIXEL_ID` | Optional, defaults to `1320302420180623` |
| `META_TEST_EVENT_CODE` | Optional: set to the code from Events Manager → Test events while testing, then remove |
| `META_GRAPH_VERSION` | Optional, defaults to `v24.0` |

## Brand

Logo files live in `brand/`: full logo in light and dark versions (SVG and PNG) and the app icon.

> FitMe gives estimates, not medical advice.
- Recipe pages end with a share bar (built by `scripts/build-recipes.mjs`, wired by `public/share.js`): the phone's share sheet (phones only), WhatsApp, Instagram (on phones the share sheet with the recipe photo as a JPEG, so Instagram offers Stories/Feed/Direct; on computers it copies the link and offers to open Instagram), Facebook, Pinterest, X, Telegram, email and copy link. Shared links carry `utm_source=<channel>&utm_medium=share&utm_campaign=recipe`; clicks are tracked as the `Share` event (with consent).
