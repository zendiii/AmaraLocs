export const BOOKING: { siteUrl: string } = {
  siteUrl: 'https://book.squareup.com/appointments/eqbaqfxdzb1q2s/location/L48SPRGGYPKCG',
}

export const BOOKING_CONFIGURED: boolean = BOOKING.siteUrl !== ''

export const SITE: {
  businessName: string
  stylistName: string
  tagline: string
  domain: string
  area: string
  instagramHandle: string
  email: string
  builderName: string
  builderUrl: string
} = {
  businessName: 'Amara Locs & Co.',
  stylistName: 'Amara',
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
