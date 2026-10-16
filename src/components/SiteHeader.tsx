'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import clsx from 'clsx'
import { useCart } from './cart'
import { buttonClass } from './ui'

const nav = [
  { href: '/linen', label: 'Hotel Linen' },
  { href: '/fleetguard', label: 'FleetGuard & Energy' },
  { href: '/media', label: 'Media & Tech' },
  { href: '/academy', label: 'Academy' },
  { href: '/parts', label: 'Spare Parts' },
]

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Aweleoma Tech & More Solutions — home">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <rect width="34" height="34" rx="10" fill={light ? '#f6f3ec' : '#0c2f30'} />
        <path d="M9 25 L17 8 L25 25" stroke="#f0a832" strokeWidth="3.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M12.5 19 H21.5" stroke={light ? '#0c2f30' : '#f6f3ec'} strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={clsx('block font-display text-lg font-bold tracking-tight', light ? 'text-paper' : 'text-ink')}>Aweleoma</span>
        <span className={clsx('block text-[0.65rem] font-semibold uppercase tracking-[0.2em]', light ? 'text-paper/70' : 'text-ink-soft')}>
          Tech &amp; More
        </span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const cart = useCart()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname.startsWith(n.href)
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={active ? 'page' : undefined}
                    className={clsx(
                      'rounded-pill px-3.5 py-2 text-sm font-medium transition',
                      active ? 'bg-ink text-white' : 'text-ink hover:bg-ink/5',
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => cart.setOpen(true)}
            className="relative grid size-11 place-items-center rounded-pill hover:bg-ink/5"
            aria-label={`Open cart, ${cart.count} item${cart.count === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {cart.count > 0 && (
              <span className="absolute right-1 top-1 grid min-w-5 place-items-center rounded-pill bg-amber px-1 text-[0.7rem] font-bold text-ink">
                {cart.count}
              </span>
            )}
          </button>
          <Link href="/linen#quote" className={buttonClass('primary', 'sm', 'hidden sm:inline-flex')}>
            Request a quote
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-pill hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <ul className="container-x grid gap-1 py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={pathname.startsWith(n.href) ? 'page' : undefined}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium hover:bg-ink/5 aria-[current=page]:bg-ink aria-[current=page]:text-white"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/linen#quote" className={buttonClass('primary', 'md', 'w-full')}>
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
