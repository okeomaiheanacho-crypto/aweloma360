import type { Metadata } from 'next'
import { Camera, Code2, Film, Globe } from 'lucide-react'
import { ButtonLink, Card, PageHero, SectionHeading } from '@/components/ui'
import { mediaServices, ngn } from '@/data/fixtures'
import { cdn } from '@/lib/img'
import { ProjectBrief } from './ProjectBrief'

export const metadata: Metadata = {
  title: 'Creative Media & Tech Solutions',
  description: 'Brand films, photography, websites and custom software from one studio team.',
}

const icons = [Film, Camera, Globe, Code2]

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Creative Media & Tech Solutions"
        surface="bg-media"
        title={<>Stories, sites and software, made under one roof.</>}
        aside={<img src={cdn('/img/media.png', 900)} alt="Creative studio with a camera on a tripod and a designer editing video" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" fetchPriority="high" />}
      >
        <p>Our studio produces content and builds the digital tools behind it, from a hotel launch film to the booking engine it links to.</p>
        <div className="mt-8"><ButtonLink href="#brief" size="lg">Start a project</ButtonLink></div>
      </PageHero>

      <section aria-labelledby="svc-title" className="container-x py-16">
        <SectionHeading id="svc-title" eyebrow="Services" title="What the studio delivers" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mediaServices.map((s, i) => {
            const Icon = icons[i]
            return (
              <li key={s.title}>
                <Card className="flex h-full flex-col">
                  <span className="grid size-12 place-items-center rounded-2xl bg-media"><Icon className="size-6" aria-hidden="true" /></span>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-ink-soft">{s.body}</p>
                  <p className="mt-5 text-sm text-ink-soft">From <strong className="font-display text-lg text-ink">{ngn(s.from)}</strong></p>
                </Card>
              </li>
            )
          })}
        </ul>
      </section>

      <section id="brief" aria-labelledby="brief-title" className="scroll-mt-20 bg-mist py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="brief-title" eyebrow="Project brief" title="Tell us what you're making">
            Share a few details and we&apos;ll come back with a proposal, timeline and fixed quote.
          </SectionHeading>
          <ProjectBrief />
        </div>
      </section>
    </>
  )
}
