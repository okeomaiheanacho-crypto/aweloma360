import type { Metadata } from 'next'
import { ButtonLink, PageHero, SectionHeading } from '@/components/ui'
import { linenTiers, ngn } from '@/data/fixtures'
import { cdn } from '@/lib/img'
import { QuoteCalculator, SampleRequest } from './LinenFlows'

export const metadata: Metadata = {
  title: 'Hotel Linen Supplies',
  description: 'Bulk hotel bedding, towels and F&B linen with an instant quote calculator, volume pricing and free sample boxes.',
}

export default function LinenPage() {
  return (
    <>
      <PageHero
        eyebrow="Hotel Linen Supplies"
        surface="bg-linen"
        title={<>Linen that lasts 300 washes, priced at contract rates.</>}
        aside={
          <img
            src={cdn('/img/linen.png', 900)}
            alt="Folded hotel towels and bedding on a housekeeping shelf"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
            fetchPriority="high"
          />
        }
      >
        <p>Supplying hotels, serviced apartments and resorts across Nigeria. Get an instant estimate or test the quality with a free sample box.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#quote" size="lg">Build a quote</ButtonLink>
          <ButtonLink href="#samples" size="lg" variant="secondary">Request samples</ButtonLink>
        </div>
      </PageHero>

      <section aria-label="Pricing tiers" className="border-b border-line bg-card">
        <ul className="container-x grid grid-cols-2 divide-line py-6 sm:grid-cols-4 sm:divide-x">
          {linenTiers.map((t) => (
            <li key={t.label} className="px-2 py-2 sm:px-6">
              <p className="text-sm font-semibold">{t.label}</p>
              <p className="font-display text-2xl font-bold">{t.discount ? `${t.discount * 100}% off` : 'List price'}</p>
              <p className="text-sm text-ink-soft">{t.min ? `Orders from ${ngn(t.min)}` : 'Any order size'}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="container-x scroll-mt-20 py-16">
        <SectionHeading id="quote-title" eyebrow="Bulk quote calculator" title="Price your order in real time">
          Estimates include volume discounts, embroidery, delivery and VAT. Submit it and we&apos;ll lock the price for 14 days.
        </SectionHeading>
        <div className="mt-10">
          <QuoteCalculator />
        </div>
      </section>

      <section id="samples" aria-labelledby="samples-title" className="scroll-mt-20 bg-mist py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="samples-title" eyebrow="Free sample box" title="Feel the GSM before you buy">
            Choose the lines you&apos;re considering and we&apos;ll courier swatches and full-size pieces to your property. There&apos;s no charge for verified hotels.
          </SectionHeading>
          <SampleRequest />
        </div>
      </section>
    </>
  )
}
