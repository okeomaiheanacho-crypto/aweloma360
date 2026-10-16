import type { Metadata } from 'next'
import { Award, Briefcase, GraduationCap } from 'lucide-react'
import { ButtonLink, PageHero } from '@/components/ui'
import { cdn } from '@/lib/img'
import { CourseCatalog } from './CourseCatalog'

export const metadata: Metadata = {
  title: 'Academy & Consulting',
  description: 'Certified courses in technology, hospitality, fleet safety and business, with instant online registration and group discounts.',
}

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="Academy & Consulting"
        surface="bg-academy"
        title={<>Skills your team can use on Monday morning.</>}
        aside={<img src={cdn('/img/academy.png', 900)} alt="Young professionals in a bright training room watching a presentation" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" fetchPriority="high" />}
      >
        <p>Instructor-led courses from practitioners in our own divisions. Register online in under two minutes and save up to 15% on group bookings.</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base text-ink">
          <li className="flex items-center gap-2"><Award className="size-5 text-teal" aria-hidden="true" /> Certificates on completion</li>
          <li className="flex items-center gap-2"><GraduationCap className="size-5 text-teal" aria-hidden="true" /> ITF-eligible programmes</li>
        </ul>
      </PageHero>

      <section aria-labelledby="catalog-title" className="container-x py-16">
        <h2 id="catalog-title" className="mb-6 text-3xl font-semibold sm:text-4xl">Course catalogue</h2>
        <CourseCatalog />
      </section>

      <section aria-labelledby="consult-title" className="container-x">
        <div className="grid gap-6 rounded-[2rem] bg-ink p-8 text-paper sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Briefcase className="size-8 text-amber" aria-hidden="true" />
            <h2 id="consult-title" className="mt-4 text-3xl font-semibold">Need advice rather than a course?</h2>
            <p className="mt-2 max-w-xl text-paper/75">Our consultants run operational diagnostics, digital transformation roadmaps and hotel pre-opening programmes.</p>
          </div>
          <ButtonLink href="/media#brief" size="lg" variant="amber">Book a consultation</ButtonLink>
        </div>
      </section>
    </>
  )
}
