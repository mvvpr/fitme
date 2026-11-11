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
- Metric and imperial units; light and dark themes

- Daily meal-plan email: double opt-in sign-up, sent at 07:00 in each subscriber's time zone, one-click unsubscribe

## Stack

- `public/`: the static site (`index.html`, shared recipe and portion logic in `meals.js`, brand assets). No build step.
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

## Brand

Logo files live in `brand/`: full logo in light and dark versions (SVG and PNG) and the app icon.

> FitMe gives estimates, not medical advice.
