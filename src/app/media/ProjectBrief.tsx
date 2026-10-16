'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button, Card, Field, Segmented, inputClass } from '@/components/ui'

export function ProjectBrief() {
  const [budget, setBudget] = useState<'lt1' | '1to5' | 'gt5'>('1to5')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    if (!String(f.get('name')).trim()) errs.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email')))) errs.email = 'Enter a valid email address.'
    if (String(f.get('details')).trim().length < 20) errs.details = 'Tell us a little more (at least 20 characters).'
    setErrors(errs)
    if (!Object.keys(errs).length) setDone(true)
  }

  if (done)
    return (
      <Card className="text-center" role="status">
        <div className="mx-auto grid size-14 place-items-center rounded-pill bg-success/10 text-success"><Check className="size-7" aria-hidden="true" /></div>
        <h3 className="mt-4 text-2xl font-semibold">Brief received</h3>
        <p className="mt-2 text-ink-soft">A producer will reply within one working day with next steps and a discovery-call link.</p>
      </Card>
    )

  return (
    <Card>
      <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="m-name" required error={errors.name}>
          <input id="m-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'm-name-error' : undefined} />
        </Field>
        <Field label="Email" htmlFor="m-email" required error={errors.email}>
          <input id="m-email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'm-email-error' : undefined} />
        </Field>
        <Field label="What do you need?" htmlFor="m-type" className="sm:col-span-2">
          <select id="m-type" name="type" className={inputClass}>
            <option>Brand film or commercial</option>
            <option>Photography</option>
            <option>Website or e-commerce</option>
            <option>Custom software</option>
            <option>Consulting engagement</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Segmented name="budget" legend="Budget" value={budget} onChange={setBudget} options={[{ value: 'lt1', label: 'Under ₦1m' }, { value: '1to5', label: '₦1m – ₦5m' }, { value: 'gt5', label: '₦5m+' }]} />
        </div>
        <Field label="Project details" htmlFor="m-details" required error={errors.details} className="sm:col-span-2">
          <textarea id="m-details" name="details" rows={4} className={inputClass} aria-invalid={!!errors.details} aria-describedby={errors.details ? 'm-details-error' : undefined} />
        </Field>
        <div className="sm:col-span-2"><Button type="submit" size="lg">Send brief</Button></div>
      </form>
    </Card>
  )
}
