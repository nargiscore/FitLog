# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
twelve lifts, open detailed instructions for each, and build out today's
training plan or save lifts for later — all persisted locally in your
browser.

## Technologies used

- Next.js (App Router)
- Tailwind CSS
- lucide-react (icons)
- FitLog API (`https://api.abcz.workers.dev/api/fitlog`)

## Features

1. Responsive workout library with a 3x4 card grid, category tags, and a
   Duration / Calories / Rating sort dropdown.
2. Two-column workout detail pages with key specs and step-by-step
   instructions.
3. "Add to today's plan" and "Save for later" actions with live toast
   notifications and navbar badge counters.
4. My Plan page with a live Exercises / Minutes / Calories summary,
   Today's Plan and Saved tabs, and Mark as Done / Remove actions.
5. Plan and Saved lists persist in `localStorage`, with a five-lift cap on
   today's plan and a custom 404 page for unknown routes.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Deploy on Vercel, Netlify, or Cloudflare Pages — no environment variables
are required.
