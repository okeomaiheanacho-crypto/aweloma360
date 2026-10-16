'use client'

import { useState } from 'react'
import { AlertTriangle, CalendarCheck, Check, CheckCircle2, Wrench } from 'lucide-react'
import clsx from 'clsx'
import { auditPackages, auditSlots, fleetKpis, fleetTrend, fleetVehicles, ngn } from '@/data/fixtures'
import { Badge, Button, Card, Field, inputClass } from '@/components/ui'

/** Next 10 weekdays from today, for the booking date strip. */
function nextWeekdays(n = 10) {
  const out: Date[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d))
  }
  return out
}

export function AuditBooking() {
  const days = nextWeekdays()
  const [pkg, setPkg] = useState('pro')
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [error, setError] = useState('')
  const chosen = auditPackages.find((p) => p.id === pkg)!

  function confirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (!String(f.get('company')).trim() || !/^\S+@\S+\.\S+$/.test(String(f.get('email')))) {
      setError('Enter your company name and a valid work email.')
      return
    }
    setError('')
    setStep(3)
  }

  return (
    <Card className="p-0 sm:p-0">
      <ol className="flex border-b border-line text-sm" aria-label="Booking progress">
        {['Package', 'Date & time', 'Confirmed'].map((label, i) => (
          <li key={label} aria-current={step === i + 1 ? 'step' : undefined} className={clsx('flex flex-1 items-center gap-2 px-4 py-3 font-medium sm:px-6', step >= i + 1 ? 'text-ink' : 'text-ink-soft')}>
            <span className={clsx('grid size-6 shrink-0 place-items-center rounded-pill text-xs font-bold', step > i + 1 ? 'bg-teal text-white' : step === i + 1 ? 'bg-ink text-white' : 'bg-ink/10')}>
              {step > i + 1 ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="p-5 sm:p-6">
          <fieldset>
            <legend className="text-xl font-semibold">Choose an audit package</legend>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {auditPackages.map((p) => (
                <label key={p.id} className={clsx('relative flex cursor-pointer flex-col rounded-2xl p-5 ring-1 transition has-focus-visible:outline-3 has-focus-visible:outline-amber', pkg === p.id ? 'bg-fleet ring-2 ring-teal' : 'ring-line hover:ring-ink/30')}>
                  <input type="radio" name="pkg" value={p.id} checked={pkg === p.id} onChange={() => setPkg(p.id)} className="sr-only" />
                  {p.featured && <Badge tone="amber" className="absolute right-4 top-4">Most booked</Badge>}
                  <span className="font-display text-xl font-semibold">{p.name}</span>
                  <span className="text-sm text-ink-soft">{p.vehicles} · {p.duration}</span>
                  <span className="mt-3 font-display text-2xl font-bold">{p.price ? ngn(p.price) : 'Custom quote'}</span>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.includes.map((x) => (
                      <li key={x} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />{x}</li>
                    ))}
                  </ul>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 flex justify-end">
            <Button size="lg" onClick={() => setStep(2)}>Continue to scheduling</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form noValidate onSubmit={confirm} className="grid gap-6 p-5 sm:p-6">
          <fieldset>
            <legend className="text-xl font-semibold">Pick a date</legend>
            <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2">
              {days.map((d) => {
                const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                return (
                  <label key={iso} className={clsx('flex min-w-[4.5rem] cursor-pointer flex-col items-center rounded-2xl px-3 py-3 ring-1 transition has-focus-visible:outline-3 has-focus-visible:outline-amber', day === iso ? 'bg-ink text-white ring-ink' : 'ring-line hover:ring-ink/30')}>
                    <input type="radio" name="day" value={iso} checked={day === iso} onChange={() => { setDay(iso); setSlot(null) }} className="sr-only" />
                    <span className="text-xs uppercase">{d.toLocaleDateString('en-NG', { weekday: 'short' })}</span>
                    <span className="font-display text-2xl font-bold">{d.getDate()}</span>
                    <span className="text-xs">{d.toLocaleDateString('en-NG', { month: 'short' })}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          {day && (
            <fieldset>
              <legend className="text-xl font-semibold">Arrival window</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {auditSlots.map((s, i) => {
                  const taken = (Number(day.slice(-2)) + i) % 4 === 0 // stub availability
                  return (
                    <label key={s} className={clsx('inline-flex min-h-11 items-center rounded-pill px-4 text-sm font-medium ring-1 transition has-focus-visible:outline-3 has-focus-visible:outline-amber', taken ? 'cursor-not-allowed text-ink-soft line-through ring-line' : slot === s ? 'cursor-pointer bg-teal text-white ring-teal' : 'cursor-pointer ring-line hover:ring-ink/30')}>
                      <input type="radio" name="slot" value={s} disabled={taken} checked={slot === s} onChange={() => setSlot(s)} className="sr-only" />
                      {s}
                      {taken && <span className="sr-only"> (unavailable)</span>}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company" htmlFor="company" required>
              <input id="company" name="company" className={inputClass} autoComplete="organization" />
            </Field>
            <Field label="Work email" htmlFor="b-email" required>
              <input id="b-email" name="email" type="email" className={inputClass} autoComplete="email" />
            </Field>
            <Field label="Depot address" htmlFor="depot" className="sm:col-span-2" hint="Where the auditors should report on the day.">
              <input id="depot" name="depot" className={inputClass} autoComplete="street-address" aria-describedby="depot-hint" />
            </Field>
          </div>
          {error && <p role="alert" className="text-sm font-medium text-danger">{error}</p>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button type="submit" size="lg" disabled={!day || !slot}>
              Confirm {chosen.name} audit{chosen.price ? ` · ${ngn(chosen.price)}` : ''}
            </Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="p-8 text-center" role="status">
          <div className="mx-auto grid size-14 place-items-center rounded-pill bg-success/10 text-success">
            <CalendarCheck className="size-7" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">Audit booked</h3>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            {chosen.name} audit on {day && new Date(`${day}T12:00:00`).toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long' })} at {slot}. A calendar invite and pre-audit checklist are on their way.
          </p>
          <Button variant="secondary" className="mt-6" onClick={() => { setStep(1); setDay(null); setSlot(null) }}>Book another depot</Button>
        </div>
      )}
    </Card>
  )
}

/* Dashboard preview ---------------------------------------------------------- */

const statusMeta = {
  Active: { tone: 'success' as const, Icon: CheckCircle2 },
  'Service due': { tone: 'amber' as const, Icon: Wrench },
  Flagged: { tone: 'danger' as const, Icon: AlertTriangle },
}

function TrendChart() {
  const [hover, setHover] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)
  const W = 560, H = 200, P = { l: 32, r: 12, t: 12, b: 26 }
  const min = 70, max = 90
  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / (fleetTrend.length - 1)
  const y = (v: number) => P.t + ((max - v) * (H - P.t - P.b)) / (max - min)
  const path = fleetTrend.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  const last = fleetTrend.length - 1

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-display text-lg font-semibold">Safety score, last 12 weeks</h4>
        <button type="button" onClick={() => setShowTable((s) => !s)} className="min-h-11 rounded-pill px-3 text-sm font-medium text-teal-deep hover:bg-ink/5" aria-pressed={showTable}>
          {showTable ? 'Show chart' : 'Show table'}
        </button>
      </div>
      {showTable ? (
        <table className="mt-3 w-full text-sm">
          <caption className="sr-only">Weekly fleet safety score</caption>
          <thead><tr className="text-left text-ink-soft"><th className="py-1 font-medium">Week</th><th className="py-1 text-right font-medium">Score</th></tr></thead>
          <tbody>
            {fleetTrend.map((v, i) => (
              <tr key={i} className="border-t border-line"><td className="py-1.5">W{i + 1}</td><td className="py-1.5 text-right tabular-nums">{v}</td></tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative mt-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Line chart. Safety score rose from ${fleetTrend[0]} to ${fleetTrend[last]} over 12 weeks.`} onMouseLeave={() => setHover(null)}>
            {[70, 80, 90].map((g) => (
              <g key={g}>
                <line x1={P.l} x2={W - P.r} y1={y(g)} y2={y(g)} stroke="var(--color-line)" strokeWidth="1" />
                <text x={P.l - 8} y={y(g) + 4} textAnchor="end" fontSize="11" fill="var(--color-ink-soft)">{g}</text>
              </g>
            ))}
            {[0, 3, 6, 9, last].map((i) => (
              <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--color-ink-soft)">W{i + 1}</text>
            ))}
            <path d={`${path} L${x(last)},${y(min)} L${x(0)},${y(min)} Z`} fill="var(--color-teal)" opacity="0.08" />
            <path d={path} fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="var(--color-ink-soft)" strokeWidth="1" strokeDasharray="3 3" />}
            <circle cx={x(hover ?? last)} cy={y(fleetTrend[hover ?? last])} r="5" fill="var(--color-teal)" stroke="white" strokeWidth="2" />
            {hover === null && (
              <text x={x(last) - 8} y={y(fleetTrend[last]) - 10} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--color-ink)">{fleetTrend[last]}</text>
            )}
            {fleetTrend.map((_, i) => (
              <rect key={i} x={x(i) - (W - P.l - P.r) / (2 * last)} y={0} width={(W - P.l - P.r) / last} height={H} fill="transparent" onMouseEnter={() => setHover(i)} />
            ))}
          </svg>
          {hover !== null && (
            <div className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1.5 text-xs text-white shadow-lift" style={{ left: `${(x(hover) / W) * 100}%` }}>
              <span className="text-paper/70">Week {hover + 1}</span> <strong className="tabular-nums">{fleetTrend[hover]}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-card shadow-lift ring-1 ring-line">
      <div className="flex items-center justify-between border-b border-line bg-ink px-5 py-3 text-paper">
        <p className="text-sm font-semibold">FleetGuard · Apex Distribution Ltd</p>
        <Badge className="bg-amber text-ink">Sample data</Badge>
      </div>
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {fleetKpis.map((k) => (
          <div key={k.label} className="bg-card p-5">
            <p className="text-sm text-ink-soft">{k.label}</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums">
              {k.value}<span className="text-lg font-semibold text-ink-soft">{k.unit}</span>
            </p>
            <p className={clsx('mt-1 flex items-center gap-1 text-sm font-medium', k.good ? 'text-success' : 'text-danger')}>
              {k.good ? <CheckCircle2 className="size-4" aria-hidden="true" /> : <AlertTriangle className="size-4" aria-hidden="true" />}
              {k.delta}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_1fr]">
        <TrendChart />
        <div>
          <h4 className="font-display text-lg font-semibold">Vehicles needing attention</h4>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <caption className="sr-only">Vehicle status overview</caption>
              <thead>
                <tr className="text-left text-ink-soft">
                  <th scope="col" className="py-2 font-medium">Plate</th>
                  <th scope="col" className="py-2 font-medium">Driver</th>
                  <th scope="col" className="py-2 text-right font-medium">Score</th>
                  <th scope="col" className="py-2 pl-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {fleetVehicles.map((v) => {
                  const m = statusMeta[v.status]
                  return (
                    <tr key={v.plate} className="border-t border-line">
                      <td className="py-2.5"><span className="font-semibold">{v.plate}</span><span className="block text-xs text-ink-soft">{v.model}</span></td>
                      <td className="py-2.5">{v.driver}</td>
                      <td className="py-2.5 text-right font-semibold tabular-nums">{v.score}</td>
                      <td className="py-2.5 pl-3"><Badge tone={m.tone}><m.Icon className="size-3.5" aria-hidden="true" />{v.status}</Badge></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
