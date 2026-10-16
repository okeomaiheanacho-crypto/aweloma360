'use client'

import { useMemo, useState } from 'react'
import { Check, Download, Minus, Plus } from 'lucide-react'
import clsx from 'clsx'
import { deliveryZones, embroideryPerUnit, linenProducts, linenTiers, ngn, type LinenProduct } from '@/data/fixtures'
import { Badge, Button, Card, Field, Segmented, inputClass } from '@/components/ui'

const categories = ['All', 'Bedding', 'Bath', 'Spa', 'F&B'] as const
type Cat = (typeof categories)[number]

export function QuoteCalculator() {
  const [cat, setCat] = useState<Cat>('All')
  const [qty, setQty] = useState<Record<string, number>>({ 'ln-sheet-king': 120, 'ln-bath-towel': 240, 'ln-hand-towel': 240 })
  const [embroidery, setEmbroidery] = useState(true)
  const [zone, setZone] = useState('lagos')
  const [submitted, setSubmitted] = useState(false)

  const lines = linenProducts.filter((p) => (qty[p.id] ?? 0) > 0)
  const units = lines.reduce((n, p) => n + qty[p.id], 0)
  const subtotal = lines.reduce((n, p) => n + qty[p.id] * p.unitPrice, 0)
  const tierIdx = linenTiers.findLastIndex((t) => subtotal >= t.min)
  const tier = linenTiers[tierIdx]
  const next = linenTiers[tierIdx + 1]
  const discount = subtotal * tier.discount
  const embroideryCost = embroidery ? units * embroideryPerUnit : 0
  const delivery = deliveryZones.find((z) => z.id === zone)!.fee
  const vat = (subtotal - discount + embroideryCost + delivery) * 0.075
  const total = subtotal - discount + embroideryCost + delivery + vat
  const belowMoq = lines.filter((p) => qty[p.id] < p.moq)

  const visible = useMemo(() => linenProducts.filter((p) => cat === 'All' || p.category === cat), [cat])

  const set = (p: LinenProduct, n: number) => setQty((q) => ({ ...q, [p.id]: Math.max(0, Math.min(99_999, n)) }))

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-xl font-semibold">1. Build your order</h3>
            <p className="text-sm text-ink-soft">Enter quantities in units. Minimum order quantities are shown per line.</p>
          </div>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={clsx('min-h-11 rounded-pill px-3.5 text-sm font-medium transition', cat === c ? 'bg-ink text-white' : 'bg-paper hover:bg-ink/5')}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <ul className="divide-y divide-line">
          {visible.map((p) => {
            const q = qty[p.id] ?? 0
            const low = q > 0 && q < p.moq
            return (
              <li key={p.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 p-5 sm:grid-cols-[1fr_auto_auto] sm:px-6">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-ink-soft">
                    {p.spec} · {ngn(p.unitPrice)}/unit · MOQ {p.moq}
                  </p>
                  {low && <p className="mt-1 text-sm font-medium text-amber-ink">Below minimum of {p.moq} units</p>}
                </div>
                <div className="col-span-2 flex items-center gap-1 sm:col-span-1">
                  <button type="button" onClick={() => set(p, q - 10)} className="grid size-11 place-items-center rounded-pill ring-1 ring-line hover:bg-ink/5" aria-label={`Remove 10 ${p.name}`}>
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <label className="sr-only" htmlFor={`q-${p.id}`}>Quantity of {p.name}</label>
                  <input
                    id={`q-${p.id}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={q}
                    onChange={(e) => set(p, Number(e.target.value))}
                    className={clsx(inputClass, 'w-24 text-center tabular-nums')}
                    aria-invalid={low}
                  />
                  <button type="button" onClick={() => set(p, q + 10)} className="grid size-11 place-items-center rounded-pill ring-1 ring-line hover:bg-ink/5" aria-label={`Add 10 ${p.name}`}>
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="row-start-1 col-start-2 text-right font-semibold tabular-nums sm:col-start-3">{ngn(q * p.unitPrice)}</p>
              </li>
            )
          })}
        </ul>
        <div className="grid gap-5 border-t border-line p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <h3 className="mb-3 text-xl font-semibold">2. Finishing</h3>
            <label className="flex min-h-11 cursor-pointer items-start gap-3">
              <input type="checkbox" checked={embroidery} onChange={(e) => setEmbroidery(e.target.checked)} className="mt-1 size-5 accent-teal" />
              <span>
                <span className="font-medium">Logo embroidery</span>
                <span className="block text-sm text-ink-soft">{ngn(embroideryPerUnit)} per unit, one-colour</span>
              </span>
            </label>
          </div>
          <Field label="3. Delivery zone" htmlFor="zone">
            <select id="zone" value={zone} onChange={(e) => setZone(e.target.value)} className={inputClass}>
              {deliveryZones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.label} — {z.fee ? ngn(z.fee) : 'Free'}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      {/* Summary */}
      <aside aria-labelledby="summary-title" className="lg:sticky lg:top-24">
        <Card className="bg-ink text-paper ring-0">
          <div className="flex items-center justify-between">
            <h3 id="summary-title" className="text-xl font-semibold">Quote summary</h3>
            <Badge className="bg-amber text-ink">{tier.label} tier</Badge>
          </div>
          <dl className="mt-5 space-y-2.5 text-sm" aria-live="polite">
            <Row k={`Linen (${units.toLocaleString()} units)`} v={ngn(subtotal)} />
            {discount > 0 && <Row k={`Volume discount (${tier.discount * 100}%)`} v={`−${ngn(discount)}`} accent />}
            {embroidery && <Row k="Embroidery" v={ngn(embroideryCost)} />}
            <Row k="Delivery" v={delivery ? ngn(delivery) : 'Free'} />
            <Row k="VAT (7.5%)" v={ngn(vat)} />
            <div className="flex justify-between border-t border-paper/20 pt-3 text-lg font-semibold">
              <dt>Estimated total</dt>
              <dd className="tabular-nums">{ngn(total)}</dd>
            </div>
          </dl>
          {next && (
            <div className="mt-5 rounded-xl bg-paper/10 p-3 text-sm">
              <p>
                Add <strong className="text-amber">{ngn(next.min - subtotal)}</strong> to unlock {next.label} pricing ({next.discount * 100}% off).
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-pill bg-paper/15" role="progressbar" aria-label="Progress to next pricing tier" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((subtotal / next.min) * 100)}>
                <div className="h-full rounded-pill bg-amber transition-all" style={{ width: `${Math.min(100, (subtotal / next.min) * 100)}%` }} />
              </div>
            </div>
          )}
          {belowMoq.length > 0 && (
            <p className="mt-4 text-sm text-amber">{belowMoq.length} line{belowMoq.length > 1 ? 's are' : ' is'} below the minimum order quantity.</p>
          )}
          {submitted ? (
            <p role="status" className="mt-6 flex items-center gap-2 rounded-xl bg-success/20 p-3 text-sm font-medium">
              <Check className="size-4" aria-hidden="true" /> Quote AWL-Q-{String(Math.round(total)).slice(-5)} saved. An account manager will confirm it within 4 working hours.
            </p>
          ) : (
            <div className="mt-6 grid gap-2">
              <Button variant="amber" size="lg" disabled={units === 0 || belowMoq.length > 0} onClick={() => setSubmitted(true)}>
                Submit for formal quote
              </Button>
              <Button variant="ghost" className="text-paper hover:bg-paper/10" onClick={() => window.print()}>
                <Download className="size-4" aria-hidden="true" /> Save as PDF
              </Button>
            </div>
          )}
        </Card>
      </aside>
    </div>
  )
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-paper/75">{k}</dt>
      <dd className={clsx('tabular-nums', accent && 'font-semibold text-amber')}>{v}</dd>
    </div>
  )
}

export function SampleRequest() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)
  const [rooms, setRooms] = useState<'1-50' | '51-150' | '150+'>('51-150')

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    if (!String(f.get('hotel')).trim()) errs.hotel = 'Enter your property name.'
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email')))) errs.email = 'Enter a valid work email, like name@hotel.com.'
    if (f.getAll('items').length === 0) errs.items = 'Choose at least one sample.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setDone(true)
  }

  if (done)
    return (
      <Card className="text-center" role="status">
        <div className="mx-auto grid size-14 place-items-center rounded-pill bg-success/10 text-success">
          <Check className="size-7" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold">Sample box on its way</h3>
        <p className="mt-2 text-ink-soft">We&apos;ll email tracking details within one working day. Lagos deliveries usually arrive within 72 hours.</p>
      </Card>
    )

  return (
    <Card>
      <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <Field label="Property name" htmlFor="hotel" required error={errors.hotel}>
          <input id="hotel" name="hotel" className={inputClass} autoComplete="organization" aria-invalid={!!errors.hotel} aria-describedby={errors.hotel ? 'hotel-error' : undefined} />
        </Field>
        <Field label="Work email" htmlFor="email" required error={errors.email}>
          <input id="email" name="email" type="email" className={inputClass} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
        </Field>
        <div className="sm:col-span-2">
          <Segmented name="rooms" legend="Number of rooms" value={rooms} onChange={setRooms} options={[{ value: '1-50', label: '1 – 50' }, { value: '51-150', label: '51 – 150' }, { value: '150+', label: '150+' }]} />
        </div>
        <fieldset className="sm:col-span-2" aria-describedby={errors.items ? 'items-error' : undefined}>
          <legend className="mb-2 text-sm font-semibold">Samples to include</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {linenProducts.slice(0, 6).map((p) => (
              <label key={p.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 ring-1 ring-line has-checked:bg-mist has-checked:ring-teal">
                <input type="checkbox" name="items" value={p.id} className="size-5 accent-teal" />
                <span className="text-sm font-medium">{p.name}</span>
              </label>
            ))}
          </div>
          {errors.items && <p id="items-error" role="alert" className="mt-1.5 text-sm font-medium text-danger">{errors.items}</p>}
        </fieldset>
        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full sm:w-auto">Send my free sample box</Button>
        </div>
      </form>
    </Card>
  )
}
