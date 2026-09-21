export type Category = 'Consultation' | 'Locs' | 'Braids' | 'Natural Hair'

export const CATEGORIES: Category[] = ['Consultation', 'Locs', 'Braids', 'Natural Hair']

export interface Service {
  slug: string
  name: string
  category: Category
  description: string
  price: string
  duration: string
  rebook?: string
  squareUrl?: string
  featured?: boolean
}

export const SERVICES: Service[] = [
  {
    slug: 'consultation',
    name: 'Consultation',
    category: 'Consultation',
    description:
      'New here or starting your loc journey? We talk through your hair, goals, and the right starting method before any commitment.',
    price: 'Free',
    duration: '15 min',
    featured: true,
  },

  {
    slug: 'starter-locs-comb-coils',
    name: 'Starter Locs — Comb Coils',
    category: 'Locs',
    description: 'Neat, uniform coils that lock over time. Best for shorter hair.',
    price: 'from $150',
    duration: '3 hr',
    rebook: 'First retwist in 3–4 weeks',
    featured: true,
  },
  {
    slug: 'starter-locs-two-strand',
    name: 'Starter Locs — Two-Strand Twists',
    category: 'Locs',
    description: 'Fuller starter locs with more hold for medium to long hair.',
    price: 'from $175',
    duration: '3–4 hr',
    rebook: 'First retwist in 4 weeks',
  },
  {
    slug: 'starter-locs-interlock',
    name: 'Starter Locs — Interlocks',
    category: 'Locs',
    description: 'Tight, low-maintenance start that holds up to washing and an active life.',
    price: 'from $200',
    duration: '4 hr',
    rebook: 'Maintenance every 6–8 weeks',
  },
  {
    slug: 'loc-retwist',
    name: 'Loc Retwist',
    category: 'Locs',
    description: 'Wash, palm-roll retwist, and a simple finish to keep your locs fresh.',
    price: 'from $85',
    duration: '2 hr',
    rebook: 'Every 4–6 weeks',
    featured: true,
  },
  {
    slug: 'loc-retwist-style',
    name: 'Retwist + Style',
    category: 'Locs',
    description: 'Retwist finished with barrels, petals, an updo, or a style of your choice.',
    price: 'from $110',
    duration: '2.5 hr',
    rebook: 'Every 4–6 weeks',
  },
  {
    slug: 'loc-repair',
    name: 'Loc Repair',
    category: 'Locs',
    description: 'Reattach, reinforce, or combine thinning and broken locs.',
    price: 'from $25 per loc',
    duration: 'Varies',
  },

  {
    slug: 'knotless-braids',
    name: 'Knotless Braids',
    category: 'Braids',
    description: 'Lightweight, tension-free braids. Medium size, mid-back length.',
    price: 'from $200',
    duration: '5–6 hr',
    rebook: 'Refresh in 6–8 weeks',
    featured: true,
  },
  {
    slug: 'box-braids',
    name: 'Box Braids',
    category: 'Braids',
    description: 'Classic box braids. Medium size, mid-back length.',
    price: 'from $180',
    duration: '5 hr',
    rebook: 'Refresh in 6–8 weeks',
  },
  {
    slug: 'soft-locs',
    name: 'Soft Locs',
    category: 'Braids',
    description: 'Lightweight faux locs with a soft, natural texture. Mid-back length.',
    price: 'from $220',
    duration: '5–6 hr',
    rebook: 'Refresh in 6–8 weeks',
  },
  {
    slug: 'feed-in-cornrows',
    name: 'Feed-In Cornrows',
    category: 'Braids',
    description: 'Straight-back or simple-design feed-ins.',
    price: 'from $80',
    duration: '2 hr',
    rebook: 'Refresh in 2–3 weeks',
  },

  {
    slug: 'two-strand-twists',
    name: 'Two-Strand Twists',
    category: 'Natural Hair',
    description: 'Twists on your natural hair — wear them as-is or as a twist-out later.',
    price: 'from $90',
    duration: '2.5 hr',
  },
  {
    slug: 'wash-and-go',
    name: 'Wash & Go',
    category: 'Natural Hair',
    description: 'Cleanse, deep condition, and define your natural curl pattern.',
    price: 'from $65',
    duration: '1.5 hr',
  },
  {
    slug: 'silk-press',
    name: 'Silk Press',
    category: 'Natural Hair',
    description: 'Sleek, bouncy straight style with heat protection throughout.',
    price: 'from $95',
    duration: '2 hr',
  },
]

export function findService(slug: string | null | undefined): Service | undefined {
  if (!slug) return undefined
  return SERVICES.find((s) => s.slug === slug)
}
