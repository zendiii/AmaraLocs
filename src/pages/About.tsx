import BookButton from '../components/BookButton.tsx'
import { SITE } from '../config/site'
import { casualPhoto, headshot } from '../data/portfolio'

const POLICIES = [
  { title: 'Arrive ready', body: 'Please come with hair washed, dried, and detangled unless your service includes a wash.' },
  { title: 'Running late', body: 'There’s a 15-minute grace period. After that, your appointment may need to be shortened or rescheduled.' },
  { title: 'Cancellations', body: 'Please cancel or reschedule at least 24 hours ahead.' },
  { title: 'Guests', body: 'To keep the space calm, please don’t bring extra guests unless we’ve arranged it ahead of time.' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative mb-12 mr-8 md:max-w-md">
          <div className="overflow-hidden rounded-2xl bg-sand">
            <img src={headshot} alt={`${SITE.stylistName}, loc stylist`} className="aspect-[4/5] w-full object-cover object-top" />
          </div>
          <div className="absolute -right-8 -bottom-12 w-2/5 overflow-hidden rounded-2xl border-4 border-cream bg-sand shadow-lg">
            <img src={casualPhoto} alt={`${SITE.stylistName} smiling`} className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div>
          <p className="eyebrow">About</p>
          <h1 className="mt-2 text-5xl">Hi, I’m {SITE.stylistName}.</h1>
          <div className="mt-6 space-y-4 leading-relaxed text-mocha">
            <p>
              I am a Loctician and natural hair stylist who believes great hair starts with a healthy scalp! From
              your very first starter locs to your hundredth retwist, I’m here for the whole journey.
            </p>
          </div>
          <BookButton className="mt-8" />
        </div>
      </section>

      <section id="policies" className="mt-24 scroll-mt-24">
        <p className="eyebrow">Good to know</p>
        <h2 className="mt-2 text-4xl">Policies</h2>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {POLICIES.map((policy) => (
            <div key={policy.title} className="rounded-2xl border border-edge bg-linen p-6">
              <dt className="font-display text-xl">{policy.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-mocha">{policy.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
