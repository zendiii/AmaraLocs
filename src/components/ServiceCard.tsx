import type { Service } from '../data/services'
import BookButton from './BookButton.tsx'

interface Props {
  service: Service
  highlighted?: boolean
}

export default function ServiceCard({ service, highlighted = false }: Props) {
  return (
    <article
      id={service.slug}
      className={`flex scroll-mt-24 flex-col rounded-2xl border bg-linen p-6 ${
        highlighted ? 'border-clay ring-2 ring-clay/30' : 'border-edge'
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl">{service.name}</h3>
        <span className="shrink-0 font-semibold text-clay">{service.price}</span>
      </div>
      <p className="mt-1 text-sm text-mocha">{service.duration}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed">{service.description}</p>
      {service.rebook && (
        <p className="mt-3 text-xs font-medium text-mocha">
          <span aria-hidden="true">↻ </span>
          {service.rebook}
        </p>
      )}
      <BookButton service={service} variant="outline" className="mt-5 self-start">
        Book this
      </BookButton>
    </article>
  )
}
