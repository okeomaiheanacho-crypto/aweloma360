# Aweleoma Tech & More Solutions

A multi-division B2B and e-commerce platform covering five businesses:

- **Hotel Linen Supplies**: bulk quote calculator and free sample requests
- **FleetGuard & Green Energy**: fleet audit booking, safety dashboard and solar packages
- **Creative Media & Tech**: studio services and project briefs
- **Academy & Consulting**: course catalogue with online registration
- **Car Spare Parts**: vehicle fit check, cart and checkout with Nigerian payment options

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, React 19, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens in `src/app/globals.css`
- `lucide-react` icons, `clsx` + `tailwind-merge` for class composition
- Netlify hosting and the Netlify Image CDN for responsive images

## Run locally

```bash
npm install
netlify dev        # recommended: emulates the Netlify Image CDN
# or
npm run dev        # plain Next.js (CDN image URLs won't resolve)
```

## Project status

The full product surface is live and clickable, using sample data. The design system reference is at `/design-system`.
See [PLAN.md](./PLAN.md) for the roadmap: lead persistence, catalogue database, Paystack/Flutterwave payments,
business accounts, a real FleetGuard dashboard and academy operations.
