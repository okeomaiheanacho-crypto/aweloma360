import Link from 'next/link'
import { verticals } from '@/data/fixtures'
import { Logo } from './SiteHeader'

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-paper/75">
            One partner for hospitality supplies, fleet and energy, creative tech, training and automotive parts.
          </p>
          <address className="mt-6 grid gap-1.5 text-sm not-italic text-paper/75">
            <span>Chijioke Street, Bera Estate, Lekki Phase 2, Lagos</span>
            <span>
              Phone:{' '}
              <a className="underline decoration-amber underline-offset-4 hover:text-amber" href="tel:+2349065764804">
                +234 906 576 4804
              </a>
            </span>
            <span>
              WhatsApp:{' '}
              <a
                className="underline decoration-amber underline-offset-4 hover:text-amber"
                href="https://wa.me/2347120014135"
                target="_blank"
                rel="noopener noreferrer"
              >
                +234 712001614135
              </a>
            </span>
            <span>
              Email:{' '}
              <a className="break-all underline decoration-amber underline-offset-4 hover:text-amber" href="mailto:aweleomainvestmentltd@gmail.com">
                aweleomainvestmentltd@gmail.com
              </a>
            </span>
          </address>
        </div>
        <nav aria-label="Divisions">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber">Divisions</h2>
          <ul className="mt-4 grid gap-2.5">
            {verticals.map((v) => (
              <li key={v.id}>
                <Link className="text-paper/80 hover:text-paper" href={v.href}>
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Quick actions">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber">Get started</h2>
          <ul className="mt-4 grid gap-2.5 text-paper/80">
            <li><Link className="hover:text-paper" href="/linen#quote">Bulk linen quote</Link></li>
            <li><Link className="hover:text-paper" href="/linen#samples">Request samples</Link></li>
            <li><Link className="hover:text-paper" href="/fleetguard#book">Book a fleet audit</Link></li>
            <li><Link className="hover:text-paper" href="/academy">Register for a course</Link></li>
            <li><Link className="hover:text-paper" href="/parts">Vehicle fit check</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber">Company</h2>
          <ul className="mt-4 grid gap-2.5 text-paper/80">
            <li><Link className="hover:text-paper" href="/design-system">Design system</Link></li>
            <li><Link className="hover:text-paper" href="/media#brief">Partner with us</Link></li>
            <li><span>Careers (coming soon)</span></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-paper/15">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-paper/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Aweleoma Tech &amp; More Solutions Ltd. RC 0000000.</p>
          <p>Prices shown in Naira (₦), excluding VAT.</p>
        </div>
      </div>
    </footer>
  )
}
