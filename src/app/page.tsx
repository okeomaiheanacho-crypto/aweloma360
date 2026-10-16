import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, CreditCard, Truck } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { testimonials, verticals } from '@/data/fixtures'
import { cdn, cdnSet } from '@/lib/img'

const journeys = [
  { step: '01', title: 'Price a hotel refurbishment', body: 'Build a linen order line by line and see volume discounts apply as you type.', href: '/linen#quote', cta: 'Open quote calculator' },
  { step: '02', title: 'Book a fleet safety audit', body: 'Pick a package, date and depot. Results land in your FleetGuard dashboard.', href: '/fleetguard#book', cta: 'Choose an audit slot' },
  { step: '03', title: 'Enrol your team', body: 'Filter courses by track, format and level, then register one person or a whole cohort.', href: '/academy', cta: 'Browse the catalogue' },
  { step: '04', title: 'Order the right part first time', body: 'Enter make, model and year. Only parts that fit your car are shown.', href: '/parts', cta: 'Start a fit check' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-x grid gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:pb-20">
          <div className="animate-rise">
            <p className="eyebrow mb-5">Aweleoma Tech &amp; More Solutions</p>
            <h1 className="text-[2.75rem] font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              Supplies, fleets, skills and spares, <span className="relative whitespace-nowrap">
                <span className="relative z-10">from one partner.</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-amber/70 sm:h-4" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
              Hotels, logistics operators, growing businesses and drivers across Nigeria use Aweleoma to procure, protect and
              power their operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/linen#quote" size="lg">
                Get a bulk linen quote <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/parts" size="lg" variant="secondary">
                Find parts for my car
              </ButtonLink>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-3 text-sm text-ink-soft sm:grid-cols-3">
              <li className="flex items-center gap-2"><Truck className="size-4 text-teal" aria-hidden="true" /> Nationwide delivery</li>
              <li className="flex items-center gap-2"><CreditCard className="size-4 text-teal" aria-hidden="true" /> Paystack, Flutterwave &amp; transfer</li>
              <li className="flex items-center gap-2"><BadgeCheck className="size-4 text-teal" aria-hidden="true" /> Invoiced B2B accounts</li>
            </ul>
          </div>

          <div className="relative animate-rise [animation-delay:120ms]">
            <img
              src={cdn('/img/hero.png', 1200)}
              srcSet={cdnSet('/img/hero.png')}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Lagos business district at golden hour with a delivery van and solar-panelled rooftops"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
              fetchPriority="high"
            />
            <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 gap-2 rounded-2xl bg-card p-3 shadow-lift ring-1 ring-line sm:left-auto sm:right-6 sm:w-[26rem]">
              {verticals.filter((v) => ['linen', 'fleetguard', 'parts'].includes(v.id)).map((v) => (
                <div key={v.id} className={`rounded-xl ${v.surface} p-3`}>
                  <p className="font-display text-xl font-bold leading-none">{v.stat.value}</p>
                  <p className="mt-1 text-xs text-ink-soft">{v.stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section aria-labelledby="divisions" className="container-x pt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">Six divisions, one account</p>
            <h2 id="divisions" className="text-3xl font-semibold sm:text-4xl">What we do</h2>
          </div>
          <p className="max-w-md text-ink-soft">One login, one invoice and one account manager, whichever division you work with.</p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <li key={v.id}>
              <Link
                href={v.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-card ${v.surface} p-6 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-lift`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm font-semibold text-ink-soft">0{i + 1}</span>
                  <span className="grid size-10 place-items-center rounded-pill bg-card/80 transition group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{v.name}</h3>
                <p className="mt-2 flex-1 text-ink-soft">{v.blurb}</p>
                <p className="mt-6 text-sm font-semibold text-teal-deep">{v.cta} →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Journeys */}
      <section aria-labelledby="journeys" className="mt-24 bg-ink py-20 text-paper">
        <div className="container-x">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber">Built for buyers</p>
          <h2 id="journeys" className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Quotes, bookings and orders that don't need a phone call.
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-card bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {journeys.map((j) => (
              <li key={j.step} className="flex flex-col bg-ink p-6">
                <span className="font-display text-4xl font-bold text-amber">{j.step}</span>
                <h3 className="mt-6 text-xl font-semibold">{j.title}</h3>
                <p className="mt-2 flex-1 text-paper/75">{j.body}</p>
                <Link href={j.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-amber hover:underline">
                  {j.cta} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Feature split */}
      <section className="container-x mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <img
          src={cdn('/img/linen.png', 900)}
          srcSet={cdnSet('/img/linen.png', [480, 900, 1300])}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt="Stacks of folded white hotel towels and bed linen on oak shelving"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-[2rem] object-cover"
        />
        <div>
          <p className="eyebrow mb-3">Hotel Linen Supplies</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Your whole par stock, priced in minutes.</h2>
          <p className="mt-4 text-lg text-ink-soft">
            Add sheets, towels and F&amp;B linen, choose embroidery and delivery, and watch contract pricing unlock as volume grows.
            Not ready to commit? Order a free sample box first.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div><dt className="text-sm text-ink-soft">Up to</dt><dd className="font-display text-3xl font-bold">16%</dd><dd className="text-sm text-ink-soft">volume discount</dd></div>
            <div><dt className="text-sm text-ink-soft">Samples in</dt><dd className="font-display text-3xl font-bold">72h</dd><dd className="text-sm text-ink-soft">within Lagos</dd></div>
            <div><dt className="text-sm text-ink-soft">Lead time</dt><dd className="font-display text-3xl font-bold">10d</dd><dd className="text-sm text-ink-soft">on stock lines</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/linen#quote">Price my order</ButtonLink>
            <ButtonLink href="/linen#samples" variant="secondary">Request samples</ButtonLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="proof" className="container-x mt-24">
        <h2 id="proof" className="sr-only">What clients say</h2>
        <ul className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="flex flex-col rounded-card bg-card p-6 shadow-soft ring-1 ring-line/70">
              <blockquote className="flex-1 font-display text-xl leading-snug">“{t.quote}”</blockquote>
              <p className="mt-6 font-semibold">{t.name}</p>
              <p className="text-sm text-ink-soft">{t.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-amber p-8 sm:p-12">
          <div className="grain absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Open a business account</h2>
              <p className="mt-2 max-w-xl text-ink/80">Credit terms, consolidated invoicing and a named account manager across all six divisions.</p>
            </div>
            <ButtonLink href="/linen#quote" size="lg" variant="dark">
              Talk to sales <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
