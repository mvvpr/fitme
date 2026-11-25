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
- `netlify/functions/`: `subscribe`, `confirm`, `unsubscribe`, `track`, `stats` and the hourly scheduled `send-daily` and `send-reminders`. Emails use the subscriber's protein picks (`prots`), falling back to `diet` for older sign-ups.
- Recipe pages (`/recipes/`, `/pt/receitas/`, `/br/receitas/`) are static HTML built by `node scripts/build-recipes.mjs` from `public/meals*.js` (numbers) and `scripts/recipes-content.mjs` (words per language, tips). Rebuild and commit after changing either. Slugs are permanent once live. The homepage links to them quietly from the start screen (`.site-links`).
- `netlify/edge-functions/meta-locale.ts`: swaps the title, description and share (Open Graph) tags for `/pt/` and `/br/`, since crawlers don't run the page script. Share images: `public/img/og/fitme-{en,pt,br}.jpg` (1200×630).
- Accounts: log in by email link, no passwords. `/login/` (and `/pt/login/`, `/br/login/`) posts to `/api/login`, which emails a one-time link (15 min) to addresses already on FitMe only, and always answers ok so it never reveals who has an account. The link opens `/api/auth`, which shows a button (so email link scanners can't use the token up); its POST starts a 30-day session in the HttpOnly cookie `fm_s` (`sess/<sid>` in Blobs) and goes to `/account/`. `/api/me` returns the logged-in user's details; POST `{action:"logout"}` ends the session. Unsubscribing deletes the record, which also ends any session.
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
