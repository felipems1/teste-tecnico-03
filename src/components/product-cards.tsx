import Image from 'next/image'
import { ProductModal } from './product-modal'
import { Product } from '@/types/product'

interface ProductCardsProps {
  products: Product[]
}

export function ProductCards({ products }: ProductCardsProps) {
  return (
    <>
      {products.map((product) => (
        <div
          className="border border-solid border-zinc-300 w-48 flex flex-col gap-2 p-4 rounded-lg min-w-max"
          key={product.id}
        >
          <Image
            src={product.imageURL}
            className="rounded-lg h-full object-fill border border-solid border-zinc-300"
            alt=""
            width={200}
            height={400}
            quality={100}
          />

          <h3 className="font-semibold text-sm">{product.name}</h3>

          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-center text-xs gap-2 mt-2">
              <p>
                De:{' '}
                <s className="text-red-500">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </s>
              </p>
              <p>
                Por:{' '}
                <b>R$ {(product.price - 50).toFixed(2).replace('.', ',')}</b>
              </p>
            </div>

            <ProductModal product={product} />
          </div>
        </div>
      ))}
    </>
  )
}
