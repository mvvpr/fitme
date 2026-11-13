<p align="center"><img src="brand/fitme-logo-light.svg" alt="FitMe" height="64"></p>

# FitMe

A calorie-deficit weight loss calculator. Enter your details and a daily deficit to see when you could reach your goal weight.

## Features

- Basal (BMR) and maintenance calories from the Mifflin-St Jeor equation and your activity level
- Two plan modes: **Same intake** (loss slows as maintenance drops) and **Same deficit** (intake steps down)
- Suggested deficits by age and body weight, and a consistency-based range
- Weekly projection chart with best/worst-case range, plus a week-by-week table
- Safety flags for very low intake, fast loss rates and low goal BMI
- Weekly high-protein meal plan: 4 meals a day (breakfast, lunch, snack, dinner) with ingredients and method, portions scaled to the user's intake, plus a weekly shopping list
- English and European Portuguese (`/pt/`): interface, recipes, shopping list and emails
- Metric and imperial units; light and dark themes

- Daily meal-plan email at 07:00 and a weekly shopping-list email on Saturdays at 08:00, in each subscriber's time zone and language; double opt-in, one-click unsubscribe

## Stack

- `public/`: the static site (`index.html`, shared recipe and portion logic in `meals.js`, Portuguese recipes in `meals.pt.js`, interface text in `i18n.js`, brand assets). No build step. `/pt/` is served by a rewrite in `netlify.toml`.
- `netlify/functions/`: `subscribe`, `confirm`, `unsubscribe` and the hourly scheduled `send-daily`.
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
