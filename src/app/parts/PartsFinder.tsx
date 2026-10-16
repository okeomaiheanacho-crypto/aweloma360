'use client'

import { useMemo, useState } from 'react'
import { CarFront, CheckCircle2, Info, Search, ShoppingCart, X } from 'lucide-react'
import clsx from 'clsx'
import { ngn, partCategories, partFits, parts, vehicleMakes } from '@/data/fixtures'
import { Badge, Button, inputClass } from '@/components/ui'
import { useCart } from '@/components/cart'

export function PartsFinder() {
  const cart = useCart()
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [q, setQ] = useState('')
  const [cats, setCats] = useState<string[]>([])
  const [grade, setGrade] = useState('any')
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const models = make ? Object.keys(vehicleMakes[make]) : []
  const years = make && model ? vehicleMakes[make][model] : []
  const vehicleSet = Boolean(make && model && year)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return parts.filter(
      (p) =>
        partFits(p, make || undefined, model || undefined, year ? Number(year) : undefined) &&
        (cats.length === 0 || cats.includes(p.category)) &&
        (grade === 'any' || p.grade === grade) &&
        (!needle || `${p.name} ${p.brand} ${p.sku}`.toLowerCase().includes(needle)),
    )
  }, [make, model, year, q, cats, grade])

  const toggleCat = (c: string) => setCats((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]))
  const add = (id: string) => { cart.add(id); setJustAdded(id); setTimeout(() => setJustAdded((j) => (j === id ? null : j)), 1800) }

  return (
    <>
      {/* Vehicle selector */}
      <form
        role="search"
        aria-label="Vehicle compatibility"
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 -mt-10 rounded-card bg-ink p-4 text-paper shadow-lift sm:p-6"
      >
        <div className="flex items-center gap-2">
          <CarFront className="size-5 text-amber" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold">Check fit for your vehicle</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <VSelect id="v-make" label="Make" value={make} onChange={(v) => { setMake(v); setModel(''); setYear('') }} options={Object.keys(vehicleMakes)} />
          <VSelect id="v-model" label="Model" value={model} onChange={(v) => { setModel(v); setYear('') }} options={models} disabled={!make} />
          <VSelect id="v-year" label="Year" value={year} onChange={setYear} options={years.map(String)} disabled={!model} />
          {make && (
            <Button type="button" variant="ghost" className="text-paper hover:bg-paper/10 sm:col-span-3 lg:col-span-1 lg:self-end" onClick={() => { setMake(''); setModel(''); setYear('') }}>
              <X className="size-4" aria-hidden="true" /> Clear vehicle
            </Button>
          )}
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-paper/75" aria-live="polite">
          {vehicleSet ? (
            <><CheckCircle2 className="size-4 text-amber" aria-hidden="true" /> Showing parts guaranteed to fit your {year} {make} {model}.</>
          ) : (
            <><Info className="size-4" aria-hidden="true" /> Select make, model and year to see only parts that fit.</>
          )}
        </p>
      </form>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside aria-label="Filters" className="space-y-6">
          <div className="relative">
            <label htmlFor="p-q" className="sr-only">Search by part name, brand or SKU</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
            <input id="p-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Part, brand or SKU" className={clsx(inputClass, 'pl-10')} />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Category</legend>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {partCategories.map((c) => (
                <label key={c} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-pill px-3 ring-1 ring-line has-checked:bg-ink has-checked:text-white has-checked:ring-ink lg:rounded-xl lg:ring-0 lg:hover:bg-ink/5">
                  <input type="checkbox" checked={cats.includes(c)} onChange={() => toggleCat(c)} className="size-4 accent-amber" />
                  <span className="text-sm font-medium">{c}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="p-grade" className="mb-2 block text-sm font-semibold">Part grade</label>
            <select id="p-grade" value={grade} onChange={(e) => setGrade(e.target.value)} className={inputClass}>
              <option value="any">Any grade</option>
              <option value="Genuine">Genuine (manufacturer)</option>
              <option value="OEM">OEM supplier</option>
              <option value="Aftermarket">Quality aftermarket</option>
            </select>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="text-sm text-ink-soft" aria-live="polite">{results.length} part{results.length === 1 ? '' : 's'} found</p>
          {results.length === 0 ? (
            <div className="mt-4 rounded-card border-2 border-dashed border-line p-12 text-center">
              <p className="font-display text-xl font-semibold">No matching parts in stock</p>
              <p className="mt-2 text-ink-soft">Tell us your VIN and our parts desk will source it within 48 hours.</p>
            </div>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <li key={p.id}>
                  <article className="flex h-full flex-col rounded-card bg-card p-5 shadow-soft ring-1 ring-line/70">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={p.grade === 'Genuine' ? 'teal' : 'neutral'}>{p.grade}</Badge>
                      {vehicleSet && p.fits !== 'universal' && <Badge tone="success"><CheckCircle2 className="size-3.5" aria-hidden="true" /> Fits your car</Badge>}
                      {p.fits === 'universal' && <Badge>Universal</Badge>}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-snug">{p.name}</h3>
                    <p className="text-sm text-ink-soft">{p.brand} · SKU {p.sku}</p>
                    {p.fits !== 'universal' && !vehicleSet && (
                      <p className="mt-2 text-sm text-ink-soft">Fits: {p.fits.map((f) => `${f.make} ${f.model} ${f.from}–${String(f.to).slice(-2)}`).join(', ')}</p>
                    )}
                    <div className="mt-auto pt-5">
                      <div className="flex items-baseline gap-2">
                        <p className="font-display text-2xl font-bold">{ngn(p.price)}</p>
                        {p.oldPrice && <p className="text-sm text-ink-soft line-through"><span className="sr-only">Was </span>{ngn(p.oldPrice)}</p>}
                      </div>
                      <p className={clsx('text-sm font-medium', p.stock <= 5 ? 'text-amber-ink' : 'text-success')}>
                        {p.stock <= 5 ? `Only ${p.stock} left` : 'In stock'} · ships in 24h
                      </p>
                      <Button className="mt-4 w-full" variant={justAdded === p.id ? 'dark' : 'primary'} onClick={() => add(p.id)} aria-label={justAdded === p.id ? `Added: ${p.name}` : `Add to cart: ${p.name}`}>
                        {justAdded === p.id ? <><CheckCircle2 className="size-4" aria-hidden="true" /> Added</> : <><ShoppingCart className="size-4" aria-hidden="true" /> Add to cart</>}
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

function VSelect({ id, label, value, onChange, options, disabled }: { id: string; label: string; value: string; onChange: (v: string) => void; options: string[]; disabled?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-paper/85">{label}</label>
      <select id={id} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className={clsx(inputClass, 'disabled:opacity-60')}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
