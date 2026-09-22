# File Guide

What every file in this project does, when you'd touch it, and why it's built the way it is.

**The short version:**

- Business details go in `src/config/site.ts`.
- The service menu goes in `src/data/services.ts`.
- New photos and videos go through `scripts/optimize-media.sh`, then `src/data/portfolio.ts`.
- You shouldn't need to edit anything else for day-to-day updates.

---

## How the site fits together

```
Client (often from an Instagram/TikTok ad)
   │
   ▼
/book?service=soft-locs  ──►  Book page shows that one service
   │
   ▼
BookButton ──► services/booking.ts decides where "Book" goes
   │
   ├─ Square link for that service     (best: opens straight to it)
   ├─ Square booking site              (general availability)
   ├─ Instagram DM / email             (Square not set up yet)
   └─ "Online booking opens soon"      (nothing configured)
```

Square Appointments owns availability, confirmations, and reminders. Amara updates her hours in the Square app. This site never stores appointments, so it has no database, login, or server code.

---

## Root

| File | Purpose | When you'd touch it |
|---|---|---|
| `index.html` | The single HTML page the app mounts into. Holds the page title, description, and the tags that control link previews (`og:*`). | Changing how the site appears in Google results or in iMessage/Instagram link previews. |
| `package.json` | Dependencies, npm scripts (`dev`, `build`, `lint`, `preview`), and the **version number**. | Releasing a version: bump `version` here, and the footer updates automatically. |
| `package-lock.json` | Exact dependency versions, so every install matches. | Never by hand. npm manages it. |
| `vite.config.ts` | Build setup: React, Tailwind, and injecting the package.json version as `__APP_VERSION__`. | Rarely. Only when adding a build plugin. |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | TypeScript settings. `app` covers the site code in `src/`, and `node` covers `vite.config.ts`. | Rarely. |
| `vercel.json` | Sends every URL to `index.html`, so direct links like `/gallery` work instead of 404ing. React Router then shows the right page. | Only if adding server routes (`/api/*`) later. |
| `.gitignore` | Keeps out of git: `node_modules`, build output, secrets, `goal.md`, and the **raw phone originals** (`src/data/photos/`, `src/data/gallery/`). | Adding another folder that shouldn't be committed. |
| `README.md` | Short public description of the project. | Project overview changes. |
| `CHANGELOG.md` | Every notable change, in [Keep a Changelog](https://keepachangelog.com) format, versioned with [SemVer](https://semver.org). | Every significant change: add it under `[Unreleased]`. |
| `CLAUDE.md` | Key decisions and conventions for AI coding sessions. | When a decision is made that future work must respect. |
| `FILES.md` | This guide. | When a file is added, removed, or changes role. |
| `goal.md` | Private product vision. Gitignored. | When the business goals change. |

---

## `public/`

| File | Purpose |
|---|---|
| `favicon.svg` | Browser tab icon: an "A" on the clay brand color. Placeholder until Amara has a logo. |

Files in `public/` are served as-is at the site root, for example `/favicon.svg`.

---

## `scripts/`

### `optimize-media.sh`

**Purpose:** turns raw phone photos and videos into web-ready files in `src/assets/media/`.

**Run it:** `bash scripts/optimize-media.sh` (macOS, needs `brew install ffmpeg`).

**Why each step exists:**

| Step | Reason |
|---|---|
| HEIC → JPEG (via `sips`) | Only Safari can display HEIC. ffmpeg's HEIC support is unreliable, so macOS's `sips` does it. |
| HEVC `.mov` → H.264 `.mp4` | Chrome and Firefox on many devices can't play HEVC. H.264 plays everywhere. |
| HDR → SDR color | iPhone HDR video looks washed out on the web if left as-is. |
| Audio stripped | Videos autoplay, and browsers only autoplay **muted** video. |
| Resized (1200px photos, 720px videos) | Took the media from about 15 MB to about 3 MB. |
| Poster image per video | Shows instantly while the video loads. |
| Crops | `headshot.png` loses the phone's status-bar pill. `soft-locs` is cropped to remove bystanders. `amara 2` becomes a 4:5 portrait. |

**Adding new work:**

1. Drop the original in `src/data/gallery/`.
2. Add an `image` or `video` line to the script.
3. Run the script.
4. Add an entry in `src/data/portfolio.ts`.

⚠️ The originals are gitignored, so keep your own backup.

---

## `src/` — entry points

| File | Purpose |
|---|---|
| `main.tsx` | Starts the app: loads the CSS, wraps everything in the router, and mounts into `index.html`. |
| `App.tsx` | The route table, mapping URLs to pages: `/`, `/services`, `/gallery`, `/about`, `/book`, plus a 404 catch-all. **Add a new page here.** |
| `index.css` | The design system. Tailwind v4 tokens in `@theme` generate classes like `bg-clay`, `text-mocha` and `font-display` (there is no `tailwind.config.js`). Also sets the base fonts and colors, and the `eyebrow` label style. |
| `vite-env.d.ts` | Tells TypeScript about Vite features and the `__APP_VERSION__` constant. |

**About the palette:** cream, sand, clay, gold, espresso and mocha are a placeholder salon look. `clay` is deliberately darker than a typical terracotta, so every text pairing passes WCAG AA contrast (4.5:1 or higher). When Amara gets a logo, take the colors from it rather than adding new ones on top.

**Fonts:** Fraunces for headings and DM Sans for body text. Both are self-hosted through `@fontsource`, with no Google Fonts request.

---

## `src/config/`

### `site.ts` — **the file to edit when the business changes**

| Export | What it holds |
|---|---|
| `BOOKING.siteUrl` | Square booking site link (Amara Locs & Co.). Stored as the final `book.squareup.com` address, so ad visitors skip the redirect from the short `squareup.com/appointments/book/…` link. |
| `BOOKING_CONFIGURED` | `true` once `siteUrl` is filled in. |
| `SITE` | Business name ("Amara Locs & Co.", matching Square, shown in the header, footer and title), stylist name ("Amara", used where she speaks as a person, like "Hi, I'm Amara"), tagline, domain, service area, Instagram handle, email, and the "Site by" footer credit. Leave a field empty to hide it. |
| `INSTAGRAM_URL` | Built from the Instagram handle. |

**Getting the Square link:** Square Dashboard → Appointments → Online booking → Channels → copy the "Square Online Booking site" link into `siteUrl`.

No component should hardcode a URL, handle or business detail. They all read from here.

---

## `src/data/`

### `services.ts` — the service menu

Holds every service: name, category, description, price, duration, and optionally:

- **`rebook`**: how often clients come back, for example "Every 4–6 weeks". It shows on the service card as a nudge to rebook, which is the main way the site turns one-time clients into regulars.
- **`squareUrl`**: Square's direct link to this one service (Square → Channels → share a service). An ad for soft locs then opens straight to soft locs.
- **`featured`**: shows the service in "Client favorites" on the home page.

⚠️ **Slugs are public URLs.** Ads link to `/book?service=<slug>`, so renaming a slug breaks any ad already running with the old link.

Prices and durations are **placeholders**. Replace them, and keep them in sync with the services set up in Square.

### `portfolio.ts` — real photos and videos

Imports the optimized media and exports:

- `headshot` and `casualPhoto`, used on the About page;
- `PORTFOLIO`, the named pieces (the home-page hero uses `twoStrand` and `softLocs`);
- `GALLERY`, the order the Gallery page shows them in.

Each piece's `service` field links it to a menu item, so the gallery can show "Book this style →".

### `photos/` and `gallery/` (gitignored)

Raw originals from her phone. They're only read by `optimize-media.sh` and never shipped to the site.

---

## `src/services/`

### `booking.ts`

**Purpose:** the one place that decides where a "Book" button goes. It checks, in order, the service's Square link, the general Square site, Instagram, then email, and otherwise returns "not configured".

**Why it links out instead of embedding Square's widget:** Square's embed script is designed to be pasted into static HTML and renders wherever its `<script>` tag sits. That's fragile when React adds it after the page loads. A plain link to Square's hosted page works in every browser, including Instagram's in-app browser, which is where ad traffic lands.

**Why it's a separate module:** every component asks this file where "Book" goes. Switching from Square to another provider later means changing only this file.

---

## `src/components/`

| File | Purpose | Used on |
|---|---|---|
| `Layout.tsx` | Page frame: a sticky header with nav and a mobile menu, and a footer with the Book button, social links, and the version number. It also scrolls to the top on page change, unless the link targets an anchor like `/services#loc-retwist`. | Every page |
| `BookButton.tsx` | The **only** way to start a booking. Gets its destination from `services/booking.ts`, and shows "Online booking opens soon" instead of a dead link when nothing is configured. Styles: `solid` or `outline`. | Everywhere |
| `ServiceCard.tsx` | One service: name, price, duration, description, the ↻ rebook cue, and "Book this". Highlighted when the service is the one someone linked to. | Home, Services, Book |
| `MediaTile.tsx` | One photo or video of her work. Videos autoplay muted, looping and inline, the only way mobile browsers allow autoplay, and inline stops iOS going fullscreen. Visitors who've turned on **reduced motion** get the still image with play controls instead. | Home hero, Gallery |
| `PhotoPlaceholder.tsx` | Labelled gradient block for missing photos. **Currently unused** now that real media exists. Kept for future sections. | — |

---

## `src/pages/`

| File | URL | Purpose |
|---|---|---|
| `Home.tsx` | `/` | Hero with her work, then **two paths**: a free consultation for new clients and "Time for your retwist?" for returning ones. Then client favorites, how booking works, and a closing call to action. |
| `Services.tsx` | `/services` | Full menu grouped by category, with jump links. Supports `#slug` links that scroll to and highlight one service. |
| `Gallery.tsx` | `/gallery` | Her work, each piece with a "Book this style →" link to its service. |
| `About.tsx` | `/about` | Headshot with the casual photo overlapping it, her bio, and policies (arrival, lateness, cancellations, guests). **Bio and policies are placeholders**, and she should confirm them, since clients will hold her to what's published. |
| `Book.tsx` | `/book` | **The ad landing page.** `/book?service=knotless-braids` shows just that service with one Book button. Without a service in the link, it shows a quick list of every service to pick from. |
| `NotFound.tsx` | anything else | Friendly 404 page with a link home. |

---

## `src/assets/media/` (generated, committed)

Output of `optimize-media.sh`. Don't edit these by hand. Regenerate them with the script.

| File | Shown |
|---|---|
| `about-headshot.jpg` | About page, main photo |
| `about-casual.jpg` | About page, overlapping photo |
| `amara-locs.jpg` | Gallery ("Amara's own locs") |
| `soft-locs.jpg` | Home hero and Gallery |
| `two-strand-retwist.mp4` + `-poster.jpg` | Home hero and Gallery |
| `short-locs-retwist.mp4` + `-poster.jpg` | Gallery |
