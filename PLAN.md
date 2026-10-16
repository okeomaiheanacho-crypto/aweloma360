# Aweleoma platform roadmap

Each milestone is a self-contained piece of work that ships on its own. Tick boxes as they land.

## ✅ Milestone 1 — Product surface & design system
- Next.js (App Router) + Tailwind CSS v4 project, deployed on Netlify.
- Design tokens (`src/app/globals.css`), component library (`src/components/ui.tsx`) and a living reference at `/design-system`.
- Landing page plus all five division screens with interactive flows on stubbed data (`src/data/fixtures.ts`):
  - Hotel Linen: bulk quote calculator with tiered pricing, sample-box request.
  - FleetGuard & Green Energy: 3-step audit booking, dashboard preview, solar packages.
  - Creative Media & Tech: services and project brief form.
  - Academy: filterable course catalogue, registration dialog with group pricing.
  - Spare Parts: make/model/year fit check, filters, cart drawer, checkout with local payment options.

## Milestone 2 — Lead capture goes live
- Persist linen quotes, sample requests, audit bookings and media briefs in Netlify Database (Drizzle schema).
- Email notifications to the sales inbox and confirmation emails to customers.
- Simple internal list view of incoming leads.

## Milestone 3 — Catalogue data & real cart
- Move linen products, courses, parts, fitment and vehicle tables from fixtures into the database.
- Server-side search and fitment filtering for parts, with pagination for large catalogues.
- Server-backed cart and order records; stock decrement on order.

## Milestone 4 — Payments
- Paystack and Flutterwave checkout via Netlify Functions with webhook verification.
- Bank-transfer virtual accounts and pay-on-delivery rules.
- Order/receipt emails and SMS; course registration payments reuse the same pipeline.

## Milestone 5 — Accounts & B2B features
- Customer sign-in (Netlify Identity) with business accounts, saved vehicles ("My garage") and order history.
- Saved and re-orderable linen quotes, credit-term invoicing, role-based staff access.

## Milestone 6 — FleetGuard dashboard (real data)
- Per-company dashboard behind auth, fed by audit results and telematics imports.
- Vehicle detail pages, service reminders, exportable reports.

## Milestone 7 — Academy operations
- Cohort/seat management, automated joining instructions, attendance and certificate generation.

## Milestone 8 — Content, SEO & performance hardening
- CMS for division copy, case studies and blog.
- Automated accessibility tests (axe) and Lighthouse budgets in CI.
- Analytics and conversion tracking on each funnel.
- Connect the `Aweleomahub` GitHub repository for CI/CD if the team moves hosting of the source to GitHub.
