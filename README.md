# Amara Locs

Booking site for Amara, loc and natural hair stylist, at [amaralocs.com](https://amaralocs.com).

Clients browse services and the gallery, then book through Square Appointments.
Amara manages her availability in the Square app.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint
```

## Going live checklist

1. **Square:** set up Square Appointments (free plan), add the services, and
   paste the booking site URL into `BOOKING.siteUrl` in `src/config/site.ts`.
   Optionally paste each service's direct link into `squareUrl` in
   `src/data/services.ts`.
2. **Details:** fill in `instagramHandle`, `email`, and `area` in `src/config/site.ts`.
3. **Menu:** replace the placeholder prices and durations in `src/data/services.ts`.
4. **Copy and photos:** rewrite the bio and policies in `src/pages/About.tsx`,
   and replace the `PhotoPlaceholder` labels with real photos.
5. **Deploy:** import the GitHub repo in Vercel, then add `amaralocs.com` under
   Project → Domains.

## Ad links

Point an ad at one service with `https://amaralocs.com/book?service=<slug>`,
for example `?service=starter-locs-comb-coils` or `?service=knotless-braids`.
The slugs are listed in `src/data/services.ts`.
