/*
 * Booking goes through Square Appointments, which owns availability,
 * confirmations, and reminders. Amara updates her hours in the Square app —
 * this site never stores appointments.
 *
 * Why link out instead of embedding Square's widget script: their embed is
 * meant to be pasted into static HTML and renders where the <script> tag
 * sits, which is fragile when React injects it after page load. A link to the hosted
 * booking page is reliable on every browser and in Instagram's in-app browser,
 * which is where most ad traffic lands.
 *
 * Every component asks this module where "Book" goes, so swapping Square for
 * another provider later is a change to this file only.
 */
import { BOOKING, BOOKING_CONFIGURED, INSTAGRAM_URL, SITE } from '../config/site'
import type { Service } from '../data/services'

export type BookingTarget =
  | { kind: 'square'; href: string }
  | { kind: 'fallback'; href: string }
  | { kind: 'none' }

/** Where a Book button should send the client, most specific link first. */
export function bookingTarget(service?: Service): BookingTarget {
  if (service?.squareUrl) return { kind: 'square', href: service.squareUrl }
  if (BOOKING_CONFIGURED) return { kind: 'square', href: BOOKING.siteUrl }

  // Not set up yet — a DM or email beats a dead button.
  if (INSTAGRAM_URL) return { kind: 'fallback', href: INSTAGRAM_URL }
  if (SITE.email) {
    const subject = service ? `Booking: ${service.name}` : 'Booking request'
    return { kind: 'fallback', href: `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` }
  }
  return { kind: 'none' }
}
