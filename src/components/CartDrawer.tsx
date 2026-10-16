'use client'

import { useEffect, useRef } from 'react'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { ngn } from '@/data/fixtures'
import { useCart } from './cart'
import { ButtonLink } from './ui'

/** Slide-over cart built on the native <dialog> element for free focus-trapping and Esc handling. */
export function CartDrawer() {
  const cart = useCart()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (cart.open && !d.open) d.showModal()
    if (!cart.open && d.open) d.close()
  }, [cart.open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      onClose={() => cart.setOpen(false)}
      onClick={(e) => e.target === ref.current && cart.setOpen(false)}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-paper p-0 text-ink shadow-lift backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="text-xl font-semibold">
            Your cart <span className="text-ink-soft">({cart.count})</span>
          </h2>
          <button type="button" onClick={() => cart.setOpen(false)} className="grid size-11 place-items-center rounded-pill hover:bg-ink/5">
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close cart</span>
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <p className="font-display text-2xl font-semibold">Nothing here yet</p>
              <p className="mt-2 text-ink-soft">Use the vehicle fit check to find parts for your car.</p>
              <ButtonLink href="/parts" className="mt-6" onClick={() => cart.setOpen(false)}>
                Shop spare parts
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5" aria-label="Cart items">
              {cart.lines.map(({ id, qty, part }) => (
                <li key={id} className="flex gap-4 py-4">
                  <div className="flex-1">
                    <p className="font-semibold">{part.name}</p>
                    <p className="text-sm text-ink-soft">
                      {part.brand} · SKU {part.sku}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="inline-flex items-center rounded-pill ring-1 ring-line">
                        <button type="button" className="grid size-11 place-items-center" onClick={() => cart.setQty(id, qty - 1)} aria-label={`Decrease quantity of ${part.name}`}>
                          <Minus className="size-4" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="grid size-11 place-items-center disabled:opacity-40"
                          onClick={() => cart.setQty(id, qty + 1)}
                          disabled={qty >= part.stock}
                          aria-label={`Increase quantity of ${part.name}`}
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button type="button" onClick={() => cart.remove(id)} className="grid size-11 place-items-center rounded-pill text-ink-soft hover:bg-danger/10 hover:text-danger" aria-label={`Remove ${part.name}`}>
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold tabular-nums">{ngn(part.price * qty)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-line bg-card px-5 py-5">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span className="tabular-nums">{ngn(cart.subtotal)}</span>
              </div>
              <p className="mt-1 text-sm text-ink-soft">Delivery and VAT calculated at checkout.</p>
              <ButtonLink href="/checkout" size="lg" className="mt-4 w-full" onClick={() => cart.setOpen(false)}>
                Checkout
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
