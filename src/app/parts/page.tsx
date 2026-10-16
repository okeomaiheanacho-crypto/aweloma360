import type { Metadata } from 'next'
import { PageHero } from '@/components/ui'
import { cdn } from '@/lib/img'
import { PartsFinder } from './PartsFinder'

export const metadata: Metadata = {
  title: 'Car Spare Parts & Accessories',
  description: 'Genuine, OEM and quality aftermarket car parts with a vehicle fit check, Paystack, Flutterwave and bank transfer payments, and nationwide delivery.',
}

export default function PartsPage() {
  return (
    <>
      <PageHero
        eyebrow="Car Spare Parts & Accessories"
        surface="bg-parts"
        title={<>The right part, first time, delivered tomorrow.</>}
        aside={<img src={cdn('/img/parts.png', 900)} alt="Brake discs, spark plugs, an oil filter and a headlamp laid out on a workshop surface" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" fetchPriority="high" />}
      >
        <p>18,000 parts for Toyota, Honda, Lexus, Ford and Hyundai. Every part is checked against your vehicle. Pay by card, transfer or on delivery.</p>
      </PageHero>
      <section aria-label="Parts catalogue" className="container-x pb-8">
        <PartsFinder />
      </section>
    </>
  )
}
