import type { Metadata } from 'next'
import { Leaf, Sun, Zap } from 'lucide-react'
import { ButtonLink, Card, PageHero, SectionHeading } from '@/components/ui'
import { energyPackages, ngn } from '@/data/fixtures'
import { cdn } from '@/lib/img'
import { AuditBooking, DashboardPreview } from './FleetFlows'

export const metadata: Metadata = {
  title: 'FleetGuard & Green Energy',
  description: 'Book a FleetGuard fleet safety audit, monitor vehicles in a live dashboard, and size solar power for depots and offices.',
}

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate & Industrial Solutions"
        surface="bg-fleet"
        title={<>Safer fleets. Cheaper power. One audit away.</>}
        aside={
          <img src={cdn('/img/fleet.png', 900)} alt="Commercial vans in a depot with a technician holding a tablet and solar panels on the warehouse roof" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" fetchPriority="high" />
        }
      >
        <p>FleetGuard audits your vehicles, drivers and fuel use on site. You then track every fix in a live dashboard. Pair it with a solar system sized to cut generator spend at your depot.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#book" size="lg">Book a FleetGuard audit</ButtonLink>
          <ButtonLink href="#energy" size="lg" variant="secondary">Explore green energy</ButtonLink>
        </div>
      </PageHero>

      <section id="dashboard" aria-labelledby="dash-title" className="container-x scroll-mt-20 py-16">
        <SectionHeading id="dash-title" eyebrow="FleetGuard dashboard" title="See every vehicle's risk at a glance">
          After your audit, findings flow into a dashboard your operations team can act on. Here is a preview with sample data.
        </SectionHeading>
        <div className="mt-10"><DashboardPreview /></div>
      </section>

      <section id="book" aria-labelledby="book-title" className="scroll-mt-20 bg-mist py-16">
        <div className="container-x">
          <SectionHeading id="book-title" eyebrow="Audit booking" title="Book an on-site audit in three steps" />
          <div className="mt-10"><AuditBooking /></div>
        </div>
      </section>

      <section id="energy" aria-labelledby="energy-title" className="container-x scroll-mt-20 py-16">
        <SectionHeading id="energy-title" eyebrow="Green Energy" title="Solar & hybrid systems that pay back in under 3 years">
          Prices include panels, lithium storage, inverter, installation and 24 months of remote monitoring.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {energyPackages.map((e, i) => {
            const Icon = [Leaf, Sun, Zap][i]
            return (
              <li key={e.id}>
                <Card className="flex h-full flex-col bg-energy ring-0">
                  <Icon className="size-7 text-teal-deep" aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-semibold">{e.name}</h3>
                  <p className="mt-1 text-ink-soft">{e.load}</p>
                  <p className="mt-6 font-display text-3xl font-bold">{ngn(e.price)}</p>
                  <p className="text-sm text-ink-soft">{e.backup} · financing from 12 months</p>
                  <ButtonLink href="#book" variant="dark" className="mt-6 self-start">Request site survey</ButtonLink>
                </Card>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
