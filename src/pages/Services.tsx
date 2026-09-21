import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard.tsx'
import { CATEGORIES, SERVICES } from '../data/services'

export default function Services() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Service menu</p>
      <h1 className="mt-2 text-5xl">Services</h1>
      <p className="mt-4 max-w-xl text-mocha">
        Prices are starting points. Length, density, and add-ons can change the final price, and we’ll
        confirm yours before we begin.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Service categories">
        {CATEGORIES.map((category) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="rounded-full border border-edge bg-linen px-4 py-1.5 text-sm hover:border-clay hover:text-clay"
          >
            {category}
          </a>
        ))}
      </nav>

      {CATEGORIES.map((category) => (
        <section key={category} id={slugify(category)} className="mt-14 scroll-mt-24">
          <h2 className="text-3xl">{category}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.category === category).map((service) => (
              <ServiceCard key={service.slug} service={service} highlighted={hash === `#${service.slug}`} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}
