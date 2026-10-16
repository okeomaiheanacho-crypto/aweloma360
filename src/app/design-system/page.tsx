import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Badge, Button, Card, Field, SectionHeading, inputClass } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Design system',
  description: 'Aweleoma design tokens, typography, components and interaction rules for developer handoff.',
}

const colors = [
  { token: 'ink', hex: '#0c2f30', use: 'Primary text, dark surfaces', on: 'paper 12.9:1' },
  { token: 'ink-soft', hex: '#3d5a5b', use: 'Secondary text', on: 'paper 6.7:1' },
  { token: 'paper', hex: '#f6f3ec', use: 'Page background', on: '—' },
  { token: 'teal', hex: '#0f6b66', use: 'Primary actions, links', on: 'white 6.3:1' },
  { token: 'teal-deep', hex: '#0a4f4b', use: 'Hover / pressed', on: 'white 9.4:1' },
  { token: 'amber', hex: '#f0a832', use: 'Highlights, focus ring', on: 'ink 7.1:1' },
  { token: 'amber-ink', hex: '#8a5300', use: 'Amber as text', on: 'white 6.3:1' },
  { token: 'line', hex: '#ddd6c8', use: 'Borders, dividers', on: '—' },
  { token: 'success', hex: '#1f7a3f', use: 'Positive status', on: 'white 5.4:1' },
  { token: 'danger', hex: '#b42318', use: 'Errors, critical', on: 'white 6.6:1' },
]

const verticalSurfaces = [
  ['linen', 'bg-linen'],
  ['fleet', 'bg-fleet'],
  ['energy', 'bg-energy'],
  ['media', 'bg-media'],
  ['academy', 'bg-academy'],
  ['parts', 'bg-parts'],
]

const interactions = [
  ['Focus', '3px amber outline, 2px offset, on every interactive element (:focus-visible).'],
  ['Touch targets', 'Minimum 44×44px for buttons, inputs, radios and icon buttons.'],
  ['Motion', '200ms ease transitions; entry animation 600ms rise. All disabled under prefers-reduced-motion.'],
  ['Forms', 'Validate on submit; inline error below the field, linked by aria-describedby, announced via role="alert".'],
  ['Live totals', 'Quote, cart and registration totals sit in aria-live="polite" regions.'],
  ['Dialogs', 'Native <dialog> with showModal(): focus trap, Esc to close and backdrop click to dismiss.'],
  ['Status', 'Status is never shown by colour alone. Every badge pairs an icon with a text label.'],
  ['Charts', 'Single-series lines get a direct label on the latest value, a hover tooltip and a table toggle.'],
]

export default function DesignSystemPage() {
  return (
    <div className="container-x py-14">
      <p className="eyebrow">Handoff · v1.0</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Aweleoma design system</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Tokens live in <code className="rounded bg-ink/5 px-1.5 py-0.5 text-base">src/app/globals.css</code> as Tailwind v4 <code className="rounded bg-ink/5 px-1.5 py-0.5 text-base">@theme</code> variables. Components live in <code className="rounded bg-ink/5 px-1.5 py-0.5 text-base">src/components/ui.tsx</code>. Everything here targets WCAG 2.1 AA.
      </p>

      <section aria-labelledby="ds-color" className="mt-14">
        <SectionHeading id="ds-color" title="Colour" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {colors.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-2xl bg-card ring-1 ring-line">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3 text-sm">
                <p className="font-semibold">{c.token}</p>
                <p className="font-mono text-xs text-ink-soft">{c.hex}</p>
                <p className="mt-1 text-ink-soft">{c.use}</p>
                <p className="mt-1 text-xs font-medium">Contrast: {c.on}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-lg font-semibold">Division surfaces</h3>
        <p className="text-sm text-ink-soft">Light tints that identify each division. Always paired with ink text (≥ 10:1).</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {verticalSurfaces.map(([name, cls]) => (
            <li key={name} className={`${cls} rounded-pill px-4 py-2 text-sm font-semibold`}>{name}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ds-type" className="mt-14">
        <SectionHeading id="ds-type" title="Typography" />
        <Card className="mt-6 space-y-5">
          <div><p className="text-xs text-ink-soft">Display · Bricolage Grotesque 600 · 48–72px · leading 0.95</p><p className="font-display text-5xl font-semibold leading-[0.95]">Supplies, fleets, skills</p></div>
          <div><p className="text-xs text-ink-soft">H2 · Bricolage Grotesque 600 · 30–36px</p><p className="font-display text-3xl font-semibold">Price your order in real time</p></div>
          <div><p className="text-xs text-ink-soft">Body · Instrument Sans 400 · 16–18px · leading 1.5</p><p className="text-lg">Hotels, logistics operators and drivers across Nigeria use Aweleoma to procure, protect and power their operations.</p></div>
          <div><p className="text-xs text-ink-soft">Eyebrow · Instrument Sans 600 · 12px · tracking 0.18em</p><p className="eyebrow">Hotel Linen Supplies</p></div>
        </Card>
      </section>

      <section aria-labelledby="ds-comp" className="mt-14">
        <SectionHeading id="ds-comp" title="Components" />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="font-semibold">Buttons</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button>Primary <ArrowRight className="size-4" aria-hidden="true" /></Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="amber">Amber</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold">Badges</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Neutral</Badge><Badge tone="teal">Genuine</Badge><Badge tone="amber">Most booked</Badge><Badge tone="success">Fits your car</Badge><Badge tone="danger">Only 3 left</Badge>
            </div>
          </Card>
          <Card className="lg:col-span-2">
            <h3 className="font-semibold">Form fields</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Default" htmlFor="ds-a" hint="Helper text sits below the input."><input id="ds-a" className={inputClass} placeholder="Placeholder" aria-describedby="ds-a-hint" /></Field>
              <Field label="With error" htmlFor="ds-b" required error="Enter a valid work email, like name@hotel.com."><input id="ds-b" className={inputClass} defaultValue="not-an-email" aria-invalid aria-describedby="ds-b-error" /></Field>
            </div>
          </Card>
        </div>
      </section>

      <section aria-labelledby="ds-int" className="mt-14">
        <SectionHeading id="ds-int" title="Interaction & accessibility rules" />
        <dl className="mt-6 divide-y divide-line rounded-card bg-card ring-1 ring-line">
          {interactions.map(([k, v]) => (
            <div key={k} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-6">
              <dt className="font-semibold">{k}</dt>
              <dd className="text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
