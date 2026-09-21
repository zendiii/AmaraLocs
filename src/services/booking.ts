import { BOOKING, BOOKING_CONFIGURED, INSTAGRAM_URL, SITE } from '../config/site'
import type { Service } from '../data/services'

export type BookingTarget =
  | { kind: 'square'; href: string }
  | { kind: 'fallback'; href: string }
  | { kind: 'none' }

export function bookingTarget(service?: Service): BookingTarget {
  if (service?.squareUrl) return { kind: 'square', href: service.squareUrl }
  if (BOOKING_CONFIGURED) return { kind: 'square', href: BOOKING.siteUrl }

  if (INSTAGRAM_URL) return { kind: 'fallback', href: INSTAGRAM_URL }
  if (SITE.email) {
    const subject = service ? `Booking: ${service.name}` : 'Booking request'
    return { kind: 'fallback', href: `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` }
  }
  return { kind: 'none' }
}
