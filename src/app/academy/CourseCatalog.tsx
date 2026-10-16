'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDays, Check, Clock, Search, Star, Users, X } from 'lucide-react'
import clsx from 'clsx'
import { courses, ngn, paymentMethods, type Course } from '@/data/fixtures'
import { Badge, Button, Field, inputClass } from '@/components/ui'

const tracks = ['All tracks', 'Technology', 'Hospitality', 'Fleet & Safety', 'Business'] as const
const formats = ['Any format', 'Online', 'In-person', 'Hybrid'] as const
const levels = ['Any level', 'Beginner', 'Intermediate', 'Advanced'] as const

const trackSurface: Record<Course['track'], string> = {
  Technology: 'bg-academy',
  Hospitality: 'bg-linen',
  'Fleet & Safety': 'bg-fleet',
  Business: 'bg-energy',
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })

export function CourseCatalog() {
  const [q, setQ] = useState('')
  const [track, setTrack] = useState<(typeof tracks)[number]>('All tracks')
  const [format, setFormat] = useState<(typeof formats)[number]>('Any format')
  const [level, setLevel] = useState<(typeof levels)[number]>('Any level')
  const [sort, setSort] = useState<'soonest' | 'price' | 'rating'>('soonest')
  const [selected, setSelected] = useState<Course | null>(null)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return courses
      .filter((c) => (track === 'All tracks' || c.track === track) && (format === 'Any format' || c.format === format) && (level === 'Any level' || c.level === level))
      .filter((c) => !needle || `${c.title} ${c.summary}`.toLowerCase().includes(needle))
      .sort((a, b) => (sort === 'price' ? a.price - b.price : sort === 'rating' ? b.rating - a.rating : a.startDate.localeCompare(b.startDate)))
  }, [q, track, format, level, sort])

  const reset = () => { setQ(''); setTrack('All tracks'); setFormat('Any format'); setLevel('Any level') }

  return (
    <>
      <div className="rounded-card bg-card p-4 shadow-soft ring-1 ring-line/70 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="relative">
            <label htmlFor="course-q" className="sr-only">Search courses</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
            <input id="course-q" type="search" placeholder="Search courses" value={q} onChange={(e) => setQ(e.target.value)} className={clsx(inputClass, 'pl-10')} />
          </div>
          <Select label="Track" value={track} options={tracks} onChange={setTrack} />
          <Select label="Format" value={format} options={formats} onChange={setFormat} />
          <Select label="Level" value={level} options={levels} onChange={setLevel} />
          <Select label="Sort by" value={sort} options={['soonest', 'price', 'rating'] as const} labels={{ soonest: 'Starting soonest', price: 'Lowest price', rating: 'Top rated' }} onChange={setSort} />
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        Showing {results.length} of {courses.length} courses
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-card border-2 border-dashed border-line p-12 text-center">
          <p className="font-display text-xl font-semibold">No courses match those filters</p>
          <Button variant="secondary" className="mt-4" onClick={reset}>Clear filters</Button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <li key={c.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-card bg-card shadow-soft ring-1 ring-line/70 transition hover:shadow-lift">
                <div className={clsx('p-5', trackSurface[c.track])}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-card/80">{c.track}</Badge>
                    <Badge className="bg-card/80">{c.level}</Badge>
                    {c.seatsLeft <= 6 && <Badge tone="danger" className="bg-card">Only {c.seatsLeft} seats left</Badge>}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-tight">{c.title}</h3>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-ink-soft">{c.summary}</p>
                  <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-1.5"><CalendarDays className="size-4 text-teal" aria-hidden="true" />{fmtDate(c.startDate)}</li>
                    <li className="flex items-center gap-1.5"><Clock className="size-4 text-teal" aria-hidden="true" />{c.weeks} week{c.weeks > 1 ? 's' : ''}</li>
                    <li className="flex items-center gap-1.5"><Users className="size-4 text-teal" aria-hidden="true" />{c.format}</li>
                    <li className="flex items-center gap-1.5"><Star className="size-4 fill-amber text-amber-ink" aria-hidden="true" />{c.rating} rating</li>
                  </ul>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <p className="font-display text-2xl font-bold">{ngn(c.price)}</p>
                    <Button onClick={() => setSelected(c)} aria-label={`Register for ${c.title}`}>Register</Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <RegistrationDialog course={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function Select<T extends string>({ label, value, options, labels, onChange }: { label: string; value: T; options: readonly T[]; labels?: Record<string, string>; onChange: (v: T) => void }) {
  const id = `f-${label.toLowerCase().replace(/\s/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={inputClass}>
        {options.map((o) => <option key={o} value={o}>{labels?.[o] ?? o}</option>)}
      </select>
    </div>
  )
}

function RegistrationDialog({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [step, setStep] = useState<'details' | 'pay' | 'done'>('details')
  const [seats, setSeats] = useState(1)
  const [pay, setPay] = useState('paystack')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [name, setName] = useState('')

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (course) { setStep('details'); setSeats(1); setErrors({}); d.showModal() }
    else if (d.open) d.close()
  }, [course])

  if (!course) return <dialog ref={ref} />

  const groupDiscount = seats >= 5 ? 0.15 : seats >= 3 ? 0.1 : 0
  const total = course.price * seats * (1 - groupDiscount)

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    if (!String(f.get('name')).trim()) errs.name = 'Enter the lead attendee’s full name.'
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email')))) errs.email = 'Enter a valid email address.'
    if (!/^[+0-9\s]{10,15}$/.test(String(f.get('phone')))) errs.phone = 'Enter a phone number, like 0803 123 4567.'
    setErrors(errs)
    if (!Object.keys(errs).length) { setName(String(f.get('name'))); setStep('pay') }
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="reg-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-card bg-paper p-0 text-ink shadow-lift backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line p-5">
        <div>
          <p className="eyebrow">Course registration</p>
          <h2 id="reg-title" className="mt-1 text-xl font-semibold">{course.title}</h2>
          <p className="text-sm text-ink-soft">Starts {fmtDate(course.startDate)} · {course.format}</p>
        </div>
        <button type="button" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-pill hover:bg-ink/5">
          <X className="size-5" aria-hidden="true" /><span className="sr-only">Close</span>
        </button>
      </div>

      {step === 'details' && (
        <form noValidate onSubmit={next} className="grid gap-4 p-5">
          <Field label="Lead attendee full name" htmlFor="r-name" required error={errors.name}>
            <input id="r-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'r-name-error' : undefined} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" htmlFor="r-email" required error={errors.email}>
              <input id="r-email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'r-email-error' : undefined} />
            </Field>
            <Field label="Phone" htmlFor="r-phone" required error={errors.phone}>
              <input id="r-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'r-phone-error' : undefined} />
            </Field>
          </div>
          <Field label="Number of seats" htmlFor="r-seats" hint="3+ seats save 10%, 5+ seats save 15%.">
            <input id="r-seats" type="number" min={1} max={course.seatsLeft} value={seats} onChange={(e) => setSeats(Math.max(1, Math.min(course.seatsLeft, Number(e.target.value) || 1)))} className={clsx(inputClass, 'w-28')} aria-describedby="r-seats-hint" />
          </Field>
          <div className="flex items-center justify-between rounded-xl bg-card p-4 ring-1 ring-line" aria-live="polite">
            <span className="text-sm text-ink-soft">{seats} × {ngn(course.price)}{groupDiscount ? ` − ${groupDiscount * 100}%` : ''}</span>
            <span className="font-display text-xl font-bold">{ngn(total)}</span>
          </div>
          <Button type="submit" size="lg">Continue to payment</Button>
        </form>
      )}

      {step === 'pay' && (
        <div className="grid gap-4 p-5">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Payment method</legend>
            <div className="grid gap-2">
              {paymentMethods.filter((m) => m.id !== 'pod').map((m) => (
                <label key={m.id} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl bg-card px-4 ring-1 ring-line has-checked:ring-2 has-checked:ring-teal">
                  <input type="radio" name="pay" value={m.id} checked={pay === m.id} onChange={() => setPay(m.id)} className="size-5 accent-teal" />
                  <span><span className="block font-semibold">{m.label}</span><span className="text-sm text-ink-soft">{m.hint}</span></span>
                </label>
              ))}
              <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl bg-card px-4 ring-1 ring-line has-checked:ring-2 has-checked:ring-teal">
                <input type="radio" name="pay" value="invoice" checked={pay === 'invoice'} onChange={() => setPay('invoice')} className="size-5 accent-teal" />
                <span><span className="block font-semibold">Company invoice</span><span className="text-sm text-ink-soft">30-day terms for approved business accounts</span></span>
              </label>
            </div>
          </fieldset>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <Button variant="ghost" onClick={() => setStep('details')}>Back</Button>
            <Button size="lg" onClick={() => setStep('done')}>Pay {ngn(total)}</Button>
          </div>
          <p className="text-center text-xs text-ink-soft">Demo checkout. No payment is taken.</p>
        </div>
      )}

      {step === 'done' && (
        <div className="p-8 text-center" role="status">
          <div className="mx-auto grid size-14 place-items-center rounded-pill bg-success/10 text-success"><Check className="size-7" aria-hidden="true" /></div>
          <h3 className="mt-4 text-2xl font-semibold">You&apos;re enrolled, {name.split(' ')[0]}!</h3>
          <p className="mt-2 text-ink-soft">
            {seats} seat{seats > 1 ? 's' : ''} reserved. Your joining instructions, timetable and receipt are on their way by email and WhatsApp.
          </p>
          <Button className="mt-6" onClick={onClose}>Back to catalogue</Button>
        </div>
      )}
    </dialog>
  )
}
