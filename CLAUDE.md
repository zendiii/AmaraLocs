# Amara Locs (amaralocs.com)

Product vision lives in goal.md (gitignored) — read it before feature work. Goal: more bookings from new clients AND recurring ones.

## Key Decisions

- Stack: Vite + React + TypeScript + Tailwind v4; hosted on Vercel (GitHub repo auto-deploys). Tokens live in `@theme` in src/index.css; no tailwind.config.js
- Booking is Square Appointments (free plan). Amara manages availability in Square — no admin page, auth, or database here. Chosen over a custom backend on 2026-09-20 for zero maintenance plus Square's built-in reminders/rebooking
- Book buttons link out to Square's hosted page rather than embedding their widget script (fragile in an SPA, and ads land in Instagram's in-app browser). All destinations resolve through src/services/booking.ts — never hardcode a Square URL in a component
- Ads link to `/book?service=<slug>`. Service slugs in src/data/services.ts are public URLs — renaming one breaks live ads
- `rebook` on a service is the recurring-client lever; keep it on anything clients repeat
- Business details, handles, and the Square URL belong in src/config/site.ts only
- Palette is a placeholder salon look (cream/clay/espresso) until Amara has a logo; resample from the logo then. Clay is darkened on purpose to keep AA contrast
- Fonts self-hosted via @fontsource (Fraunces display, DM Sans body) — no font CDN
- Never use stock photos as "her work", and no fabricated reviews. Real media: raw originals (gitignored) → `bash scripts/optimize-media.sh` → src/assets/media/ → src/data/portfolio.ts. Browsers need H.264 + JPEG, not HEVC/HEIC
- Always give `useEffect` a block body (a concise arrow's return value becomes the cleanup function)

## Conventions

- SemVer starting at 0.1.0; update CHANGELOG.md ([Unreleased] section) with each significant change
- Conventional commits (feat:/fix:/docs:/refactor:/test:)
- The user is learning — briefly explain non-obvious technical decisions when making them
