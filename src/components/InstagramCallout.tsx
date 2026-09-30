import { INSTAGRAM_URL, SITE } from '../config/site'

export default function InstagramCallout() {
  if (!INSTAGRAM_URL) return null

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener"
      className="group flex flex-col gap-4 rounded-3xl bg-espresso p-6 text-cream transition-colors hover:bg-espresso/90 sm:flex-row sm:items-center sm:justify-between sm:p-8"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <div>
          <p className="eyebrow text-gold">Latest work</p>
          <p className="mt-1 font-display text-2xl">@{SITE.instagramHandle}</p>
        </div>
      </div>
      <p className="text-sm text-cream/80 sm:max-w-xs sm:text-right">
        New styles land on Instagram first.
        <span className="ml-1 font-semibold text-gold group-hover:underline">Follow along →</span>
      </p>
    </a>
  )
}
