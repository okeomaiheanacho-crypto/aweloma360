/**
 * Stubbed product data for every vertical.
 * Milestone 1 renders entirely from this module. Later milestones replace these
 * exports with database queries — keep the shapes stable when swapping.
 */

export type VerticalId = 'linen' | 'fleetguard' | 'energy' | 'media' | 'academy' | 'parts'

export type Vertical = {
  id: VerticalId
  name: string
  short: string
  href: string
  blurb: string
  surface: string // tailwind bg class from the token set
  image: string
  cta: string
  stat: { value: string; label: string }
}

export const verticals: Vertical[] = [
  {
    id: 'linen',
    name: 'Hotel Linen Supplies',
    short: 'Linen',
    href: '/linen',
    blurb: 'Hotel-grade towels, bedding and F&B textiles, shipped in bulk with tiered contract pricing.',
    surface: 'bg-linen',
    image: '/img/linen.png',
    cta: 'Get a bulk quote',
    stat: { value: '140+', label: 'hotels supplied' },
  },
  {
    id: 'fleetguard',
    name: 'FleetGuard',
    short: 'FleetGuard',
    href: '/fleetguard',
    blurb: 'Fleet safety audits, tracking and maintenance dashboards for corporate and industrial fleets.',
    surface: 'bg-fleet',
    image: '/img/fleet.png',
    cta: 'Book an audit',
    stat: { value: '3,200', label: 'vehicles monitored' },
  },
  {
    id: 'energy',
    name: 'Green Energy',
    short: 'Energy',
    href: '/fleetguard#energy',
    blurb: 'Solar and hybrid power systems sized for offices, warehouses and depots.',
    surface: 'bg-energy',
    image: '/img/fleet.png',
    cta: 'Size a system',
    stat: { value: '1.8 MW', label: 'installed capacity' },
  },
  {
    id: 'media',
    name: 'Creative Media & Tech',
    short: 'Media',
    href: '/media',
    blurb: 'Brand films, product photography, websites and software built by one studio team.',
    surface: 'bg-media',
    image: '/img/media.png',
    cta: 'Start a project',
    stat: { value: '260', label: 'projects shipped' },
  },
  {
    id: 'academy',
    name: 'Academy & Consulting',
    short: 'Academy',
    href: '/academy',
    blurb: 'Certified courses and advisory engagements in tech, operations and hospitality.',
    surface: 'bg-academy',
    image: '/img/academy.png',
    cta: 'Browse courses',
    stat: { value: '4,900', label: 'learners trained' },
  },
  {
    id: 'parts',
    name: 'Car Spare Parts',
    short: 'Parts',
    href: '/parts',
    blurb: 'Genuine and OEM-grade parts with a vehicle fit check, local payments and nationwide delivery.',
    surface: 'bg-parts',
    image: '/img/parts.png',
    cta: 'Find parts for my car',
    stat: { value: '18k', label: 'SKUs in stock' },
  },
]

export const ngn = (n: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n)

/* ------------------------------------------------------------------ Linen */

export type LinenProduct = {
  id: string
  name: string
  category: 'Bedding' | 'Bath' | 'F&B' | 'Spa'
  spec: string
  unitPrice: number
  moq: number
}

export const linenProducts: LinenProduct[] = [
  { id: 'ln-sheet-king', name: 'Percale flat sheet — King', category: 'Bedding', spec: '300 TC · 100% cotton', unitPrice: 9800, moq: 50 },
  { id: 'ln-duvet-q', name: 'Duvet cover — Queen', category: 'Bedding', spec: '250 TC sateen stripe', unitPrice: 14500, moq: 30 },
  { id: 'ln-pillow', name: 'Pillowcase (pair)', category: 'Bedding', spec: '300 TC · envelope closure', unitPrice: 3900, moq: 100 },
  { id: 'ln-bath-towel', name: 'Bath towel', category: 'Bath', spec: '600 GSM · ring-spun', unitPrice: 6200, moq: 100 },
  { id: 'ln-hand-towel', name: 'Hand towel', category: 'Bath', spec: '550 GSM · dobby border', unitPrice: 2400, moq: 150 },
  { id: 'ln-bathrobe', name: 'Waffle bathrobe', category: 'Spa', spec: 'Shawl collar · one size', unitPrice: 18900, moq: 20 },
  { id: 'ln-napkin', name: 'Dinner napkin', category: 'F&B', spec: 'Poly-cotton · 50×50 cm', unitPrice: 950, moq: 300 },
  { id: 'ln-tablecloth', name: 'Banquet tablecloth', category: 'F&B', spec: 'Round 120" · stain-resist', unitPrice: 12800, moq: 25 },
]

/** Volume discount tiers applied to the order subtotal. */
export const linenTiers = [
  { min: 0, discount: 0, label: 'Standard' },
  { min: 1_000_000, discount: 0.06, label: 'Volume' },
  { min: 3_000_000, discount: 0.11, label: 'Contract' },
  { min: 7_500_000, discount: 0.16, label: 'Group' },
]

export const embroideryPerUnit = 650
export const deliveryZones = [
  { id: 'lagos', label: 'Lagos', fee: 0 },
  { id: 'abuja', label: 'Abuja', fee: 85_000 },
  { id: 'ph', label: 'Port Harcourt', fee: 95_000 },
  { id: 'other', label: 'Other states', fee: 140_000 },
]

/* ------------------------------------------------------------- FleetGuard */

export const auditPackages = [
  { id: 'essential', name: 'Essential', vehicles: 'Up to 15 vehicles', price: 250_000, duration: '1 day on-site', includes: ['Roadworthiness inspection', 'Driver document check', 'Risk summary report'] },
  { id: 'pro', name: 'Professional', vehicles: '16 – 60 vehicles', price: 680_000, duration: '2 days on-site', includes: ['Everything in Essential', 'Telematics install review', 'Fuel-use benchmarking', '30-day dashboard access'], featured: true },
  { id: 'enterprise', name: 'Enterprise', vehicles: '60+ vehicles', price: 0, duration: 'Scoped engagement', includes: ['Multi-depot audit', 'Driver safety training', 'Quarterly re-audits', 'Dedicated fleet analyst'] },
]

export const auditSlots = ['08:30', '10:00', '11:30', '13:30', '15:00']

export const fleetKpis = [
  { label: 'Fleet safety score', value: '86', unit: '/100', delta: '+4 vs last month', good: true },
  { label: 'Vehicles due service', value: '7', unit: '', delta: '3 overdue', good: false },
  { label: 'Fuel per 100 km', value: '13.2', unit: 'L', delta: '−0.8 L', good: true },
  { label: 'Harsh-braking events', value: '41', unit: '', delta: '−18%', good: true },
]

/** Weekly safety score, last 12 weeks. */
export const fleetTrend = [74, 75, 73, 77, 78, 80, 79, 81, 83, 82, 85, 86]

export const fleetVehicles = [
  { plate: 'LND-482-KJ', model: 'Toyota Hiace', driver: 'B. Adeyemi', score: 92, status: 'Active' },
  { plate: 'KJA-119-AB', model: 'Ford Transit', driver: 'C. Okafor', score: 78, status: 'Service due' },
  { plate: 'ABJ-304-XY', model: 'Toyota Hilux', driver: 'F. Musa', score: 88, status: 'Active' },
  { plate: 'EPE-771-LS', model: 'Isuzu NPR', driver: 'T. Bello', score: 64, status: 'Flagged' },
  { plate: 'IKJ-058-QP', model: 'Toyota Corolla', driver: 'N. Eze', score: 95, status: 'Active' },
] as const

export const energyPackages = [
  { id: 'e5', name: 'Office 5 kVA', load: 'Small office · 8–12 workstations', price: 4_200_000, backup: '6 hrs backup' },
  { id: 'e15', name: 'Depot 15 kVA', load: 'Warehouse lighting + cold room', price: 11_800_000, backup: '8 hrs backup' },
  { id: 'e40', name: 'Campus 40 kVA', load: 'Multi-floor HQ or hotel wing', price: 29_500_000, backup: '10 hrs backup' },
]

/* ---------------------------------------------------------------- Academy */

export type Course = {
  id: string
  title: string
  track: 'Technology' | 'Hospitality' | 'Fleet & Safety' | 'Business'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  format: 'Online' | 'In-person' | 'Hybrid'
  weeks: number
  price: number
  startDate: string
  seatsLeft: number
  rating: number
  summary: string
}

export const courses: Course[] = [
  { id: 'c-fullstack', title: 'Full-Stack Web Development', track: 'Technology', level: 'Intermediate', format: 'Hybrid', weeks: 12, price: 450_000, startDate: '2026-11-09', seatsLeft: 6, rating: 4.8, summary: 'Ship production web apps with React, Next.js and Postgres.' },
  { id: 'c-data', title: 'Data Analysis with Python', track: 'Technology', level: 'Beginner', format: 'Online', weeks: 8, price: 280_000, startDate: '2026-11-02', seatsLeft: 14, rating: 4.7, summary: 'From spreadsheets to pandas dashboards, using real business datasets.' },
  { id: 'c-cyber', title: 'Cybersecurity Essentials', track: 'Technology', level: 'Beginner', format: 'Online', weeks: 6, price: 220_000, startDate: '2026-11-16', seatsLeft: 20, rating: 4.6, summary: 'Protect small businesses: phishing, access control, backups and incident response.' },
  { id: 'c-housekeep', title: 'Hotel Housekeeping Management', track: 'Hospitality', level: 'Intermediate', format: 'In-person', weeks: 4, price: 190_000, startDate: '2026-11-23', seatsLeft: 9, rating: 4.9, summary: 'Linen par levels, room inspection standards and team scheduling.' },
  { id: 'c-guest', title: 'Guest Experience Excellence', track: 'Hospitality', level: 'Beginner', format: 'Hybrid', weeks: 3, price: 120_000, startDate: '2026-12-01', seatsLeft: 3, rating: 4.7, summary: 'Service recovery, front-desk scripts and review management.' },
  { id: 'c-defensive', title: 'Defensive Driving Certification', track: 'Fleet & Safety', level: 'Beginner', format: 'In-person', weeks: 1, price: 85_000, startDate: '2026-10-28', seatsLeft: 11, rating: 4.8, summary: 'FRSC-aligned practical training for commercial drivers.' },
  { id: 'c-fleetmgr', title: 'Fleet Manager Professional', track: 'Fleet & Safety', level: 'Advanced', format: 'Hybrid', weeks: 6, price: 350_000, startDate: '2026-11-30', seatsLeft: 8, rating: 4.6, summary: 'Telematics, maintenance planning, TCO and driver risk programmes.' },
  { id: 'c-pm', title: 'Project Management (PMP Prep)', track: 'Business', level: 'Advanced', format: 'Online', weeks: 10, price: 390_000, startDate: '2026-11-04', seatsLeft: 17, rating: 4.7, summary: '35 contact hours with mock exams and a certified instructor.' },
  { id: 'c-digital', title: 'Digital Marketing for SMEs', track: 'Business', level: 'Beginner', format: 'Online', weeks: 5, price: 160_000, startDate: '2026-11-11', seatsLeft: 25, rating: 4.5, summary: 'Paid social, SEO and WhatsApp commerce that actually convert.' },
]

/* ------------------------------------------------------------------ Parts */

export const vehicleMakes: Record<string, Record<string, number[]>> = {
  Toyota: { Corolla: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022], Camry: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], Hilux: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], Hiace: [2015, 2016, 2017, 2018, 2019, 2020] },
  Honda: { Accord: [2013, 2014, 2015, 2016, 2017, 2018, 2019], Civic: [2016, 2017, 2018, 2019, 2020, 2021], 'CR-V': [2015, 2016, 2017, 2018, 2019, 2020] },
  Lexus: { RX350: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], ES350: [2013, 2014, 2015, 2016, 2017, 2018] },
  Ford: { Ranger: [2016, 2017, 2018, 2019, 2020, 2021], Transit: [2015, 2016, 2017, 2018, 2019, 2020] },
  Hyundai: { Elantra: [2016, 2017, 2018, 2019, 2020], Tucson: [2016, 2017, 2018, 2019, 2020, 2021] },
}

export type Fitment = { make: string; model: string; from: number; to: number }

export type Part = {
  id: string
  name: string
  brand: string
  category: 'Brakes' | 'Filters' | 'Engine' | 'Lighting' | 'Suspension' | 'Electrical' | 'Accessories'
  price: number
  oldPrice?: number
  grade: 'Genuine' | 'OEM' | 'Aftermarket'
  stock: number
  sku: string
  fits: Fitment[] | 'universal'
}

export const parts: Part[] = [
  { id: 'p1', name: 'Front brake pad set', brand: 'Toyota Genuine', category: 'Brakes', price: 38_500, grade: 'Genuine', stock: 24, sku: '04465-02220', fits: [{ make: 'Toyota', model: 'Corolla', from: 2014, to: 2019 }] },
  { id: 'p2', name: 'Ventilated brake disc (pair)', brand: 'Brembo', category: 'Brakes', price: 92_000, oldPrice: 104_000, grade: 'OEM', stock: 8, sku: '09.A417.11', fits: [{ make: 'Toyota', model: 'Camry', from: 2012, to: 2017 }, { make: 'Lexus', model: 'ES350', from: 2013, to: 2018 }] },
  { id: 'p3', name: 'Oil filter', brand: 'Denso', category: 'Filters', price: 6_800, grade: 'OEM', stock: 140, sku: '150-1013', fits: [{ make: 'Toyota', model: 'Corolla', from: 2014, to: 2022 }, { make: 'Toyota', model: 'Camry', from: 2012, to: 2020 }, { make: 'Lexus', model: 'RX350', from: 2010, to: 2017 }] },
  { id: 'p4', name: 'Engine air filter', brand: 'Mann-Filter', category: 'Filters', price: 12_400, grade: 'OEM', stock: 62, sku: 'C 26 003', fits: [{ make: 'Honda', model: 'Accord', from: 2013, to: 2017 }, { make: 'Honda', model: 'CR-V', from: 2015, to: 2016 }] },
  { id: 'p5', name: 'Iridium spark plug (set of 4)', brand: 'NGK', category: 'Engine', price: 34_000, grade: 'OEM', stock: 45, sku: 'ILKAR7B11', fits: [{ make: 'Honda', model: 'Civic', from: 2016, to: 2021 }, { make: 'Honda', model: 'Accord', from: 2013, to: 2019 }, { make: 'Toyota', model: 'Corolla', from: 2014, to: 2019 }] },
  { id: 'p6', name: 'Timing belt kit', brand: 'Gates', category: 'Engine', price: 118_000, grade: 'Aftermarket', stock: 5, sku: 'TCKWP257', fits: [{ make: 'Hyundai', model: 'Elantra', from: 2016, to: 2020 }] },
  { id: 'p7', name: 'LED headlamp assembly (LH)', brand: 'Depo', category: 'Lighting', price: 165_000, oldPrice: 189_000, grade: 'Aftermarket', stock: 3, sku: '312-11A5L', fits: [{ make: 'Toyota', model: 'Camry', from: 2018, to: 2020 }] },
  { id: 'p8', name: 'Front shock absorber', brand: 'KYB', category: 'Suspension', price: 74_000, grade: 'OEM', stock: 12, sku: '339364', fits: [{ make: 'Toyota', model: 'Hilux', from: 2016, to: 2023 }, { make: 'Ford', model: 'Ranger', from: 2016, to: 2021 }] },
  { id: 'p9', name: 'Lower control arm', brand: 'Moog', category: 'Suspension', price: 58_500, grade: 'Aftermarket', stock: 9, sku: 'RK622031', fits: [{ make: 'Lexus', model: 'RX350', from: 2010, to: 2015 }, { make: 'Hyundai', model: 'Tucson', from: 2016, to: 2021 }] },
  { id: 'p10', name: 'Alternator 100A', brand: 'Bosch', category: 'Electrical', price: 210_000, grade: 'OEM', stock: 4, sku: '0 986 049 191', fits: [{ make: 'Toyota', model: 'Hiace', from: 2015, to: 2020 }, { make: 'Ford', model: 'Transit', from: 2015, to: 2020 }] },
  { id: 'p11', name: 'AGM battery 70Ah', brand: 'Varta', category: 'Electrical', price: 145_000, grade: 'OEM', stock: 18, sku: 'E39', fits: 'universal' },
  { id: 'p12', name: 'All-weather floor mats', brand: 'WeatherTech', category: 'Accessories', price: 48_000, grade: 'Aftermarket', stock: 30, sku: 'WT-UNI-4', fits: 'universal' },
]

export const partCategories = ['Brakes', 'Filters', 'Engine', 'Lighting', 'Suspension', 'Electrical', 'Accessories'] as const

export function partFits(part: Part, make?: string, model?: string, year?: number) {
  if (part.fits === 'universal') return true
  if (!make) return true
  return part.fits.some(
    (f) => f.make === make && (!model || f.model === model) && (!year || (year >= f.from && year <= f.to)),
  )
}

export const paymentMethods = [
  { id: 'paystack', label: 'Card (Paystack)', hint: 'Visa, Mastercard, Verve' },
  { id: 'flutterwave', label: 'Flutterwave', hint: 'Card, USSD, mobile money' },
  { id: 'transfer', label: 'Bank transfer', hint: 'Pay into a dedicated account number' },
  { id: 'pod', label: 'Pay on delivery', hint: 'Lagos & Abuja only, up to ₦250,000' },
]

/* ------------------------------------------------------------------ Media */

export const mediaServices = [
  { title: 'Brand films & commercials', body: 'Concept, scripting, shoot and edit for TV, YouTube and social cut-downs.', from: 850_000 },
  { title: 'Product & hospitality photography', body: 'Room, menu and catalogue shoots retouched for web and print.', from: 320_000 },
  { title: 'Websites & e-commerce', body: 'Fast, accessible Next.js sites with CMS, payments and analytics.', from: 1_200_000 },
  { title: 'Custom software & integrations', body: 'Internal tools, booking systems and ERP/POS integrations.', from: 2_500_000 },
]

export const testimonials = [
  { quote: 'Linen quotes used to take a week of calls. Now our procurement team prices a full refurbishment in ten minutes.', name: 'Ifeoma A.', role: 'Head of Procurement, 4-star Lagos hotel' },
  { quote: 'The FleetGuard audit found ₦6.4m a year in fuel leakage across two depots. The dashboard keeps everyone honest.', name: 'Kunle O.', role: 'Logistics Director, FMCG distributor' },
  { quote: 'The fit check meant I ordered the right brake discs the first time, and they were delivered to Abuja in two days.', name: 'Halima S.', role: 'Workshop owner, Abuja' },
]
