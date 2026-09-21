import { Link } from 'react-router-dom'
import BookButton from '../components/BookButton.tsx'
import MediaTile from '../components/MediaTile.tsx'
import ServiceCard from '../components/ServiceCard.tsx'
import { PORTFOLIO } from '../data/portfolio'
import { SERVICES, findService } from '../data/services'

const STEPS = [
  { title: 'Pick your style', body: 'Choose a service, or start with a free consultation if you’re not sure.' },
  { title: 'Choose a time', body: 'See live availability and grab the slot that works for you.' },
  { title: 'Get reminders', body: 'You’ll get a confirmation and a reminder before your appointment.' },
]

export default function Home() {
  const featured = SERVICES.filter((s) => s.featured && s.category !== 'Consultation')
  const consultation = findService('consultation')
  const retwist = findService('loc-retwist')

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Locs · Braids · Natural hair</p>
          <h1 className="mt-4 text-5xl sm:text-6xl">
            Healthy hair,
            <br />
            <em className="text-clay">beautifully kept.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mocha">
            Starter locs, retwists, braids, and natural styles, done with care for your scalp and your
            hair’s long-term health.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookButton>See availability</BookButton>
            <Link
              to="/services"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-espresso hover:text-clay"
            >
              View services →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MediaTile item={PORTFOLIO.twoStrand} className="aspect-[3/4]" eager />
          <MediaTile item={PORTFOLIO.softLocs} className="mt-10 aspect-[3/4]" eager />
        </div>
      </section>

      {/* Two paths: new clients vs. returning clients */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        <div className="rounded-3xl bg-espresso p-8 text-cream">
          <p className="eyebrow text-gold">New here?</p>
          <h2 className="mt-3 text-3xl">Start with a free consultation</h2>
          <p className="mt-3 text-cream/80">
            Not sure which starter method suits your hair? Let’s talk through your goals first.
          </p>
          <BookButton service={consultation} className="mt-6">
            Book a consultation
          </BookButton>
        </div>
        <div className="rounded-3xl bg-sand p-8">
          <p className="eyebrow">Welcome back</p>
          <h2 className="mt-3 text-3xl">Time for your retwist?</h2>
          <p className="mt-3 text-mocha">Most clients rebook every 4–6 weeks to keep new growth neat.</p>
          <BookButton service={retwist} className="mt-6">
            Book a retwist
          </BookButton>
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Popular</p>
            <h2 className="mt-2 text-4xl">Client favorites</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-clay hover:text-clay-hover">
            Full service menu →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* How booking works */}
      <section className="bg-linen py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 text-4xl">Booking takes a minute</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="font-display text-4xl text-gold">0{i + 1}</span>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mocha">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-4xl">Ready when you are.</h2>
        <p className="mx-auto mt-3 max-w-md text-mocha">Pick a time that works for you. Openings go fast.</p>
        <BookButton className="mt-8">See availability</BookButton>
      </section>
    </>
  )
}
