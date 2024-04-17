'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCart } from '@/contexts/cart-context'
import { Product } from '@/types/product'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductModalProps {
  product: Product
}

export function ProductModal({ product }: ProductModalProps) {
  const [productQuantity, setProductQuantity] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const { addToCart } = useCart()

  const handlePlusQuantityProduct = () => {
    setProductQuantity((item) => item + 1)
  }

  const handleMinusQuantityProduct = () => {
    if (productQuantity > 0) {
      setProductQuantity((item) => item - 1)
    }
  }

  const handleAddProductToCart = () => {
    if (productQuantity !== 0) {
      addToCart(product.id)

      setProductQuantity(0)

      setShowModal(false)
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger>
        <ShoppingCart className="text-purple-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-[80vw] sm:max-w-[25vw]">
        <DialogHeader>
          <DialogTitle className="text-center">Detalhes do produto</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={product.imageURL}
            alt=""
            width={200}
            height={200}
            quality={100}
            className="max-w-[95%] border border-solid border-zinc-300 rounded-lg"
          />
          <h1 className="text-purple-600">{product.name}</h1>
          <p className="text-center">{product.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex h-10 py-4 w-24 justify-around items-center gap-1 rounded-lg bg-transparent border border-solid border-purple-600">
            <Minus
              className="w-4 h-4 text-purple-600 cursor-pointer"
              onClick={handleMinusQuantityProduct}
            />
            <span className="text-sm">{productQuantity}</span>
            <Plus
              className="w-4 h-4 text-purple-600 cursor-pointer"
              onClick={handlePlusQuantityProduct}
            />
          </div>

          <button
            onClick={handleAddProductToCart}
            className="flex justify-between items-center h-10 px-4 cursor-pointer gap-4 bg-purple-600 text-white rounded-lg"
          >
            <span className="text-xs">Adicionar</span>
            <span className="text-xs">
              R${' '}
              {((product.price - 50) * productQuantity)
                .toFixed(2)
                .replace('.', ',')}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
