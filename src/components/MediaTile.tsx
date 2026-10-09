import { useEffect, useRef, useState } from 'react'
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
  const container = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [near, setNear] = useState(eager)
  const media = 'h-full w-full object-cover'

  useEffect(() => {
    if (item.kind !== 'video' || eager) return
    const element = container.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
        const player = video.current
        if (!player || reducedMotion) return
        if (entry.isIntersecting) {
          void player.play().catch(() => {})
        } else {
          player.pause()
        }
      },
      { rootMargin: '200px', threshold: 0.2 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [item.kind, eager, reducedMotion])

  return (
    <div ref={container} className={`overflow-hidden rounded-2xl bg-sand ${className}`}>
      {item.kind === 'image' ? (
        <img src={item.src} alt={item.label} className={media} loading={eager ? 'eager' : 'lazy'} />
      ) : (
        <video
          ref={video}
          src={near ? item.src : undefined}
          poster={item.poster}
          className={media}
          aria-label={item.label}
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          controls={reducedMotion}
          preload={eager ? 'auto' : 'none'}
        />
      )}
    </div>
  )
}
