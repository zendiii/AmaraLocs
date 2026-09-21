import { Link, useSearchParams } from 'react-router-dom'
import BookButton from '../components/BookButton.tsx'
import ServiceCard from '../components/ServiceCard.tsx'
import { CATEGORIES, SERVICES, findService } from '../data/services'

/*
 * Landing page for ads. An ad links to /book?service=<slug> and the client
 * lands on that service with one button to its Square booking page. Without
 * a slug it becomes a quick picker.
 */
export default function Book() {
  const [params] = useSearchParams()
  const selected = findService(params.get('service'))

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Book an appointment</p>
      <h1 className="mt-2 text-5xl">{selected ? 'Great choice.' : 'What are we doing?'}</h1>
      <p className="mt-4 max-w-xl text-mocha">
        You’ll pick a time from live availability and get a confirmation and reminder by text or email.
      </p>

      {selected ? (
        <div className="mt-10">
          <ServiceCard service={selected} highlighted />
          <p className="mt-6 text-sm text-mocha">
            Looking for something else?{' '}
            <Link to="/book" className="font-semibold text-clay hover:text-clay-hover">
              See all services
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <BookButton>See all availability</BookButton>
          </div>
          {CATEGORIES.map((category) => (
            <section key={category} className="mt-12">
              <h2 className="text-2xl">{category}</h2>
              <ul className="mt-4 divide-y divide-edge rounded-2xl border border-edge bg-linen">
                {SERVICES.filter((s) => s.category === category).map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/book?service=${service.slug}`}
                      className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-sand/50"
                    >
                      <span>
                        <span className="font-medium">{service.name}</span>
                        <span className="block text-xs text-mocha">{service.duration}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-clay">{service.price} →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  )
}
