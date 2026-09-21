import softLocs from '../assets/media/soft-locs.jpg'
import amaraLocs from '../assets/media/amara-locs.jpg'
import shortLocsRetwist from '../assets/media/short-locs-retwist.mp4'
import shortLocsRetwistPoster from '../assets/media/short-locs-retwist-poster.jpg'
import twoStrand from '../assets/media/two-strand-retwist.mp4'
import twoStrandPoster from '../assets/media/two-strand-retwist-poster.jpg'

export { default as headshot } from '../assets/media/about-headshot.jpg'
export { default as casualPhoto } from '../assets/media/about-casual.jpg'

export type PortfolioItem =
  | { kind: 'image'; src: string; label: string; service?: string }
  | { kind: 'video'; src: string; poster: string; label: string; service?: string }

export const PORTFOLIO: Record<'softLocs' | 'twoStrand' | 'shortLocsRetwist' | 'amaraLocs', PortfolioItem> = {
  twoStrand: {
    kind: 'video',
    src: twoStrand,
    poster: twoStrandPoster,
    label: 'Two-strand twist locs',
    service: 'starter-locs-two-strand',
  },
  softLocs: { kind: 'image', src: softLocs, label: 'Soft locs', service: 'soft-locs' },
  shortLocsRetwist: {
    kind: 'video',
    src: shortLocsRetwist,
    poster: shortLocsRetwistPoster,
    label: 'Retwist on short locs',
    service: 'loc-retwist',
  },
  amaraLocs: { kind: 'image', src: amaraLocs, label: 'Amara’s own locs' },
}

export const GALLERY: PortfolioItem[] = [
  PORTFOLIO.twoStrand,
  PORTFOLIO.softLocs,
  PORTFOLIO.shortLocsRetwist,
  PORTFOLIO.amaraLocs,
]
