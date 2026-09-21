/*
 * Site-wide configuration: business details, booking, and social links.
 *
 * This is the file to edit when the business changes — no component should
 * hardcode a URL, handle, or business detail.
 */

/**
 * Square Appointments.
 *
 * HOW TO FILL THIS IN:
 *   Square Dashboard → Appointments → Online booking → Channels → copy the
 *   "Square Online Booking site" link and paste it as `siteUrl`.
 *
 * Per-service links (so an ad for starter locs opens straight to starter
 * locs) live on each service in src/data/services.ts as `squareUrl`. Copy
 * them from the same Channels page → share a specific service.
 *
 * Leave `siteUrl` empty and every Book button falls back to an Instagram DM
 * instead of a dead link.
 */
export const BOOKING: { siteUrl: string } = {
  siteUrl: '',
}

export const BOOKING_CONFIGURED: boolean = BOOKING.siteUrl !== ''

/** Public business details. Leave a field empty to hide it from the UI. */
export const SITE: {
  name: string
  tagline: string
  domain: string
  /** City/area shown in the hero and footer — no street address until she wants one public. */
  area: string
  instagramHandle: string
  email: string
  /** Build credit shown in the footer. */
  builderName: string
  builderUrl: string
} = {
  name: 'Amara',
  tagline: 'Locs, braids & natural hair',
  domain: 'amaralocs.com',
  area: '',
  instagramHandle: '',
  email: '',
  builderName: 'SYVN',
  builderUrl: 'https://syvn.me',
}

export const INSTAGRAM_URL: string = SITE.instagramHandle
  ? `https://www.instagram.com/${SITE.instagramHandle}/`
  : ''
