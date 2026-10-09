import softLocs from '../assets/media/soft-locs.jpg'
import amaraLocs from '../assets/media/amara-locs.jpg'
import coiledLocStyle from '../assets/media/coiled-loc-style.mp4'
import coiledLocStylePoster from '../assets/media/coiled-loc-style-poster.jpg'
import colorLocsTwists from '../assets/media/color-locs-twists.jpg'
import retwistSections from '../assets/media/retwist-sections.mp4'
import retwistSectionsPoster from '../assets/media/retwist-sections-poster.jpg'
import grownLocs from '../assets/media/grown-locs.jpg'
import kidsLocsTopKnot from '../assets/media/kids-locs-top-knot.jpg'
import retwistDiamondParts from '../assets/media/retwist-diamond-parts.jpg'
import retwistGridParts from '../assets/media/retwist-grid-parts.jpg'
import retwistPartsDetail from '../assets/media/retwist-parts-detail.jpg'
import retwistShortLocs from '../assets/media/retwist-short-locs.jpg'
import shortLocsRetwist from '../assets/media/short-locs-retwist.mp4'
import shortLocsRetwistPoster from '../assets/media/short-locs-retwist-poster.jpg'
import twoStrand from '../assets/media/two-strand-retwist.mp4'
import twoStrandPoster from '../assets/media/two-strand-retwist-poster.jpg'

export { default as headshot } from '../assets/media/about-headshot.jpg'
export { default as casualPhoto } from '../assets/media/about-casual.jpg'

export type PortfolioItem =
  | { kind: 'image'; src: string; label: string; service?: string }
  | { kind: 'video'; src: string; poster: string; label: string; service?: string }

export const PORTFOLIO = {
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
  coiledLocStyle: {
    kind: 'video',
    src: coiledLocStyle,
    poster: coiledLocStylePoster,
    label: 'Coiled loc style',
    service: 'loc-retwist-style',
  },
  retwistSections: {
    kind: 'video',
    src: retwistSections,
    poster: retwistSectionsPoster,
    label: 'Newly attached locs with sections',
    service: 'loc-retwist',
  },
  diamondParts: {
    kind: 'image',
    src: retwistDiamondParts,
    label: 'Diamond-parted retwist',
    service: 'loc-retwist',
  },
  colorLocs: {
    kind: 'image',
    src: colorLocsTwists,
    label: 'Color & twisted ends',
    service: 'loc-retwist-style',
  },
  shortLocsParts: {
    kind: 'image',
    src: retwistShortLocs,
    label: 'Fresh parts, short locs',
    service: 'loc-retwist',
  },
  grownLocs: { kind: 'image', src: grownLocs, label: 'Grown locs', service: 'loc-retwist' },
  kidsLocs: {
    kind: 'image',
    src: kidsLocsTopKnot,
    label: 'Kids locs & top knot',
    service: 'loc-retwist-style',
  },
  gridParts: {
    kind: 'image',
    src: retwistGridParts,
    label: 'Crisp grid parts',
    service: 'loc-retwist',
  },
  partsDetail: {
    kind: 'image',
    src: retwistPartsDetail,
    label: 'Parts up close',
    service: 'loc-retwist',
  },
  amaraLocs: { kind: 'image', src: amaraLocs, label: 'Amara’s own locs' },
} satisfies Record<string, PortfolioItem>

export const GALLERY: PortfolioItem[] = [
  PORTFOLIO.twoStrand,
  PORTFOLIO.coiledLocStyle,
  PORTFOLIO.diamondParts,
  PORTFOLIO.softLocs,
  PORTFOLIO.colorLocs,
  PORTFOLIO.shortLocsRetwist,
  PORTFOLIO.retwistSections,
  PORTFOLIO.shortLocsParts,
  PORTFOLIO.grownLocs,
  PORTFOLIO.gridParts,
  PORTFOLIO.kidsLocs,
  PORTFOLIO.partsDetail,
  PORTFOLIO.amaraLocs,
]
