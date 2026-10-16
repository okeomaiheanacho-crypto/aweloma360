import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

/* Buttons ------------------------------------------------------------------ */

type Variant = 'primary' | 'secondary' | 'ghost' | 'amber' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-[background,transform,box-shadow] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 select-none'
const variants: Record<Variant, string> = {
  primary: 'bg-teal text-white hover:bg-teal-deep shadow-soft',
  secondary: 'bg-card text-ink ring-1 ring-inset ring-line hover:ring-ink/40',
  ghost: 'text-ink hover:bg-ink/5',
  amber: 'bg-amber text-ink hover:brightness-95 shadow-soft',
  dark: 'bg-ink text-white hover:bg-teal-deep shadow-soft',
}
// Every size keeps a ≥44px touch target (WCAG 2.5.5)
const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-13 px-7 text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return twMerge(clsx(base, variants[variant], sizes[size], className))
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />
}

/* Layout ------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'left',
  id,
}: {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
  id?: string
}) {
  return (
    <div className={clsx('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold leading-[1.05] sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg text-ink-soft">{children}</p>}
    </div>
  )
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div className={twMerge(clsx('rounded-card bg-card p-5 shadow-soft ring-1 ring-line/70 sm:p-6', className))} {...props} />
}

export function Badge({
  tone = 'neutral',
  className,
  ...props
}: ComponentProps<'span'> & { tone?: 'neutral' | 'teal' | 'amber' | 'success' | 'danger' }) {
  const tones = {
    neutral: 'bg-ink/5 text-ink',
    teal: 'bg-mist text-teal-deep',
    amber: 'bg-amber/25 text-amber-ink',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
  }
  return (
    <span
      className={twMerge(clsx('inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold', tones[tone], className))}
      {...props}
    />
  )
}

/* Forms -------------------------------------------------------------------- */

export const inputClass =
  'block w-full min-h-11 rounded-xl border border-line bg-card px-3.5 py-2.5 text-base text-ink placeholder:text-ink-soft/70 transition focus:border-teal focus:outline-none focus:ring-3 focus:ring-teal/20 aria-[invalid=true]:border-danger'

export function Field({
  label,
  hint,
  error,
  htmlFor,
  required,
  children,
  className,
}: {
  label: string
  hint?: string
  error?: string
  htmlFor: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

/** Segmented choice built on native radios: keyboard and screen-reader friendly by default. */
export function Segmented<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string
  legend: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-11 cursor-pointer items-center rounded-pill bg-card px-4 text-sm font-medium ring-1 ring-inset ring-line transition peer-checked:bg-ink peer-checked:text-white peer-checked:ring-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function PageHero({
  eyebrow,
  title,
  children,
  surface,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  surface: string
  aside?: ReactNode
}) {
  return (
    <section className={clsx('relative overflow-hidden border-b border-line', surface)}>
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div className="animate-rise">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-[0.98] sm:text-5xl lg:text-6xl">{title}</h1>
          {children && <div className="mt-5 max-w-xl text-lg text-ink-soft">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  )
}
