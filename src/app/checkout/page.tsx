'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Lock } from 'lucide-react'
import { deliveryZones, ngn, paymentMethods } from '@/data/fixtures'
import { useCart } from '@/components/cart'
import { Button, ButtonLink, Card, Field, inputClass } from '@/components/ui'

const partsDelivery: Record<string, number> = { lagos: 3_500, abuja: 6_500, ph: 7_000, other: 9_500 }

export default function CheckoutPage() {
  const cart = useCart()
  const [zone, setZone] = useState('lagos')
  const [pay, setPay] = useState('paystack')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderRef, setOrderRef] = useState<string | null>(null)

  const delivery = cart.subtotal >= 250_000 ? 0 : partsDelivery[zone]
  const vat = (cart.subtotal + delivery) * 0.075
  const total = cart.subtotal + delivery + vat
  const podAllowed = (zone === 'lagos' || zone === 'abuja') && total <= 250_000

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    if (!String(f.get('name')).trim()) errs.name = 'Enter the recipient’s name.'
    if (!/^[+0-9\s]{10,15}$/.test(String(f.get('phone')))) errs.phone = 'Enter a phone number, like 0803 123 4567.'
    if (!String(f.get('address')).trim()) errs.address = 'Enter a delivery address.'
    if (pay === 'pod' && !podAllowed) errs.pay = 'Pay on delivery is not available for this order.'
    setErrors(errs)
    if (!Object.keys(errs).length) {
      setOrderRef(`AWL-${Date.now().toString().slice(-6)}`)
      cart.clear()
    }
  }

  if (orderRef)
    return (
      <div className="container-x py-20">
        <Card className="mx-auto max-w-lg text-center" role="status">
          <div className="mx-auto grid size-14 place-items-center rounded-pill bg-success/10 text-success"><Check className="size-7" aria-hidden="true" /></div>
          <h1 className="mt-4 text-3xl font-semibold">Order {orderRef} confirmed</h1>
          <p className="mt-2 text-ink-soft">We&apos;ve sent your receipt by SMS and email. Track delivery from the link in your SMS.</p>
          <ButtonLink href="/parts" className="mt-6">Continue shopping</ButtonLink>
        </Card>
      </div>
    )

  if (cart.lines.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-ink-soft">Add parts using the vehicle fit check, then come back to pay.</p>
        <ButtonLink href="/parts" className="mt-6">Shop spare parts</ButtonLink>
      </div>
    )

  return (
    <div className="container-x py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft"><Link href="/parts" className="underline-offset-4 hover:underline">Spare parts</Link> / Checkout</nav>
      <h1 className="mt-2 text-4xl font-semibold">Checkout</h1>
      <form noValidate onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="grid gap-6">
          <Card>
            <h2 className="text-xl font-semibold">Delivery details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" htmlFor="c-name" required error={errors.name}>
                <input id="c-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-error' : undefined} />
              </Field>
              <Field label="Phone" htmlFor="c-phone" required error={errors.phone}>
                <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'c-phone-error' : undefined} />
              </Field>
              <Field label="Delivery address" htmlFor="c-address" required error={errors.address} className="sm:col-span-2">
                <input id="c-address" name="address" autoComplete="street-address" className={inputClass} aria-invalid={!!errors.address} aria-describedby={errors.address ? 'c-address-error' : undefined} />
              </Field>
              <Field label="State / city" htmlFor="c-zone">
                <select id="c-zone" value={zone} onChange={(e) => setZone(e.target.value)} className={inputClass}>
                  {deliveryZones.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
                </select>
              </Field>
            </div>
          </Card>
          <Card>
            <fieldset aria-describedby={errors.pay ? 'pay-error' : undefined}>
              <legend className="text-xl font-semibold">Payment</legend>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {paymentMethods.map((m) => {
                  const disabled = m.id === 'pod' && !podAllowed
                  return (
                    <label key={m.id} className="flex min-h-16 cursor-pointer items-center gap-3 rounded-xl px-4 ring-1 ring-line has-checked:bg-mist has-checked:ring-2 has-checked:ring-teal has-disabled:cursor-not-allowed has-disabled:opacity-50">
                      <input type="radio" name="pay" value={m.id} checked={pay === m.id} disabled={disabled} onChange={() => setPay(m.id)} className="size-5 accent-teal" />
                      <span><span className="block font-semibold">{m.label}</span><span className="text-sm text-ink-soft">{m.hint}</span></span>
                    </label>
                  )
                })}
              </div>
              {errors.pay && <p id="pay-error" role="alert" className="mt-2 text-sm font-medium text-danger">{errors.pay}</p>}
            </fieldset>
          </Card>
        </div>

        <aside aria-labelledby="sum-title" className="lg:sticky lg:top-24">
          <Card>
            <h2 id="sum-title" className="text-xl font-semibold">Order summary</h2>
            <ul className="mt-4 divide-y divide-line text-sm">
              {cart.lines.map((l) => (
                <li key={l.id} className="flex justify-between gap-3 py-2.5"><span>{l.qty} × {l.part.name}</span><span className="tabular-nums">{ngn(l.qty * l.part.price)}</span></li>
              ))}
            </ul>
            <dl className="mt-3 space-y-2 border-t border-line pt-3 text-sm" aria-live="polite">
              <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd className="tabular-nums">{ngn(cart.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Delivery</dt><dd className="tabular-nums">{delivery ? ngn(delivery) : 'Free'}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">VAT (7.5%)</dt><dd className="tabular-nums">{ngn(vat)}</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-lg font-semibold"><dt>Total</dt><dd className="tabular-nums">{ngn(total)}</dd></div>
            </dl>
            <Button type="submit" size="lg" className="mt-5 w-full"><Lock className="size-4" aria-hidden="true" /> Place order</Button>
            <p className="mt-3 text-center text-xs text-ink-soft">Demo checkout. No payment is taken. Free delivery over ₦250,000.</p>
          </Card>
        </aside>
      </form>
    </div>
  )
}
