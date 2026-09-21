import { useEffect, useState } from 'react'
import type { PortfolioItem } from '../data/portfolio'

interface Props {
  item: PortfolioItem
  className?: string
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
