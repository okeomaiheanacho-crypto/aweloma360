# AGENTS.md

## Start here
Read **PLAN.md** first. Milestone 1 (product surface + design system) is done. Continue with the next unchecked milestone.

## Architecture
- Next.js 15 App Router in `src/app`, one folder per division route: `linen`, `fleetguard`, `media`, `academy`, `parts`, `checkout`, `design-system`.
- Route `page.tsx` files are server components (metadata, static layout). Interactive flows live in a sibling client component (`LinenFlows.tsx`, `FleetFlows.tsx`, `CourseCatalog.tsx`, `PartsFinder.tsx`, `ProjectBrief.tsx`).
- `src/data/fixtures.ts` is the **only** data source today. Swap its exports for DB queries in later milestones, and keep the exported shapes stable so the UI doesn't change.
- `src/components/cart.tsx` is a client cart context persisted to localStorage. Milestone 3 replaces it with a server cart.
- No backend yet: every form validates client-side and shows a success state, but nothing is submitted.

## Design system conventions
- Tokens are Tailwind v4 `@theme` variables in `src/app/globals.css`. Use token utilities (`bg-ink`, `text-ink-soft`, `bg-teal`, `rounded-card`, `shadow-soft`) and never raw hex values in components.
- Each division has a surface tint (`bg-linen`, `bg-fleet`, `bg-energy`, `bg-media`, `bg-academy`, `bg-parts`), always used with ink text.
- `amber` is a surface/highlight colour only. For amber text use `amber-ink`.
- Primitives live in `src/components/ui.tsx` (Button, ButtonLink, Card, Badge, Field, Segmented, PageHero, SectionHeading, inputClass). Classes are merged with `tailwind-merge`, so a `className` override wins.
- Never build Tailwind class names dynamically (`bg-${x}`). Map to full class strings.

## Accessibility rules (WCAG 2.1 AA)
- Touch targets ≥ 44px. Amber `:focus-visible` outline is global.
- Form errors: `aria-invalid` + `aria-describedby="<id>-error"`, with the error rendered by `Field` using `role="alert"`.
- Totals and result counts sit in `aria-live="polite"` regions.
- Dialogs use native `<dialog>` + `showModal()`.
- Status badges always pair an icon with text. Charts include a table toggle.

## Images
Generated images live in `public/img/*.png`. Always reference them through `cdn()` / `cdnSet()` from `src/lib/img.ts` (Netlify Image CDN, webp).

## Prices
All prices are in NGN via `ngn()` in fixtures. VAT is 7.5%.
