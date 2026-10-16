import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { CartProvider } from '@/components/cart'
import { CartDrawer } from '@/components/CartDrawer'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Aweleoma Tech & More Solutions — Supplies, Fleet, Media, Academy & Parts',
    template: '%s · Aweleoma Tech & More',
  },
  description:
    'Hotel linen procurement, FleetGuard audits and green energy, creative media and tech, professional courses, and car spare parts with local payments — one partner.',
}

export const viewport: Viewport = {
  themeColor: '#0c2f30',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-amber focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
