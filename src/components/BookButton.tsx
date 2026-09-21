import type { ReactNode } from 'react'
import type { Service } from '../data/services'
import { bookingTarget } from '../services/booking'

const STYLES = {
  solid: 'bg-clay text-linen hover:bg-clay-hover',
  outline: 'border border-clay text-clay hover:bg-clay hover:text-linen',
} as const

interface Props {
  service?: Service
  variant?: keyof typeof STYLES
  className?: string
  children?: ReactNode
}

/**
 * The one way to start a booking. Resolves the destination through
 * services/booking.ts so no component hardcodes a Square URL.
 */
export default function BookButton({ service, variant = 'solid', className = '', children }: Props) {
  const target = bookingTarget(service)
  const base = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${STYLES[variant]} ${className}`

  if (target.kind === 'none') {
    return (
      <span className={`${base} cursor-not-allowed opacity-60`} aria-disabled="true">
        Online booking opens soon
      </span>
    )
  }

  const label = children ?? (target.kind === 'square' ? 'Book now' : 'Message to book')

  return (
    <a href={target.href} className={base} rel="noopener">
      {label}
    </a>
  )
}
