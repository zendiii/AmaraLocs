import { useEffect, useState } from 'react'
import type { PortfolioItem } from '../data/portfolio'

interface Props {
  item: PortfolioItem
  className?: string
  /** Above-the-fold media loads eagerly; everything else waits until scrolled near. */
  eager?: boolean
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      setReduced(query.matches)
    }
    query.addEventListener('change', onChange)
    return () => {
      query.removeEventListener('change', onChange)
    }
  }, [])
  return reduced
}

/**
 * A photo or short looping video of Amara's work. Videos autoplay muted and
 * inline (the only way mobile browsers allow autoplay, and it keeps iOS from
 * going fullscreen) — unless the visitor asked for reduced motion, in which
 * case they get the poster and play controls instead.
 */
export default function MediaTile({ item, className = '', eager = false }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const media = 'h-full w-full object-cover'

  return (
    <div className={`overflow-hidden rounded-2xl bg-sand ${className}`}>
      {item.kind === 'image' ? (
        <img src={item.src} alt={item.label} className={media} loading={eager ? 'eager' : 'lazy'} />
      ) : (
        <video
          src={item.src}
          poster={item.poster}
          className={media}
          aria-label={item.label}
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          controls={reducedMotion}
          preload={eager ? 'auto' : 'metadata'}
        />
      )}
    </div>
  )
}
