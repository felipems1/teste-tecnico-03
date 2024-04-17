'use client'

import { useCart } from '@/contexts/cart-context'
import { ShoppingCart } from 'lucide-react'

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex relative p-2 justify-center items-center rounded bg-purple-700 cursor-pointer">
      <ShoppingCart />
      {items.length !== 0 && (
        <div className="flex w-5 h-5 text-center text-sm justify-center items-center absolute -right-2 -top-2 rounded-full bg-purple-500">
          {items.length}
        </div>
      )}
    </div>
  )
}
