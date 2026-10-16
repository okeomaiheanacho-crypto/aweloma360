'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { parts, type Part } from '@/data/fixtures'

type Line = { id: string; qty: number }
type CartCtx = {
  lines: (Line & { part: Part })[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (o: boolean) => void
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'aweleoma-cart'

/** Client-side cart persisted to localStorage. Milestone 3 moves this to a server-backed cart. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setRaw(JSON.parse(saved))
    } catch {}
  }, [])
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(raw))
  }, [raw])

  const value = useMemo<CartCtx>(() => {
    const lines = raw
      .map((l) => ({ ...l, part: parts.find((p) => p.id === l.id)! }))
      .filter((l) => l.part)
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.part.price, 0),
      open,
      setOpen,
      add: (id, qty = 1) =>
        setRaw((r) => {
          const hit = r.find((l) => l.id === id)
          return hit ? r.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...r, { id, qty }]
        }),
      setQty: (id, qty) => setRaw((r) => (qty <= 0 ? r.filter((l) => l.id !== id) : r.map((l) => (l.id === id ? { ...l, qty } : l)))),
      remove: (id) => setRaw((r) => r.filter((l) => l.id !== id)),
      clear: () => setRaw([]),
    }
  }, [raw, open])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside CartProvider')
  return c
}
