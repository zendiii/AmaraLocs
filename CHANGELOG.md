# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Real portfolio media: Amara's headshot on About (with a second, casual
  photo overlapping it), two looping work videos and
  two photos in the Gallery, and the hero now shows her work instead of
  placeholders. Each gallery piece links to its service ("Book this style")
- `MediaTile` component: videos autoplay muted/inline, and fall back to a
  poster with controls when the visitor prefers reduced motion
- `scripts/optimize-media.sh`: converts phone originals to web formats
  (HEIC → JPEG, HEVC → H.264 MP4, iPhone HDR → SDR, audio stripped, posters),
  cutting ~15 MB of originals to ~3 MB
- Soft Locs service (Braids)
- `FILES.md`: a guide to every file's purpose, when to edit it, and the
  reasoning behind how it's built

### Changed

- Removed all code comments; their explanations now live in `FILES.md`
- Raw originals in `src/data/photos/` and `src/data/gallery/` are gitignored;
  only the optimized files in `src/assets/media/` are committed
- Soft-locs photo cropped to remove bystanders in the background

## [0.1.0] - 2026-09-21

### Added

- Vite + React + TypeScript + Tailwind v4 scaffold, deployable to Vercel
  (`vercel.json` rewrites all routes to the SPA)
- Pages: Home, Services, Gallery, About (with policies), Book, 404
- Home splits into two paths — free consultation for new clients, retwist
  rebooking for returning clients
- `/book?service=<slug>` ad landing page: opens on one service with a single
  Book button, or shows a quick service picker
- Service menu (`src/data/services.ts`) for locs, braids, and natural hair,
  with a `rebook` interval shown on each card to encourage repeat visits
- Square Appointments booking via `src/services/booking.ts`: per-service
  Square link → general booking site → Instagram DM / email fallback, so a Book
  button is never a dead end
- Warm salon design system (cream, clay, espresso; Fraunces + DM Sans
  self-hosted); all text colors pass WCAG AA
- Version shown in the footer, injected from package.json at build time

### Notes

- Prices, durations, bio, policies, and gallery images are placeholders
- Square booking URL, Instagram handle, email, and service area are still empty
  in `src/config/site.ts`
