export const BOOKING: { siteUrl: string } = {
  siteUrl: '',
}

export const BOOKING_CONFIGURED: boolean = BOOKING.siteUrl !== ''

export const SITE: {
  name: string
  tagline: string
  domain: string
  area: string
  instagramHandle: string
  email: string
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
