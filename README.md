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

## Stack

A single static `index.html` (HTML, CSS and vanilla JS) with no build step. Deployed on Netlify; `netlify.toml` publishes the repo root.

## Brand

Logo files live in `brand/`: full logo in light and dark versions (SVG and PNG) and the app icon.

> FitMe gives estimates, not medical advice.
