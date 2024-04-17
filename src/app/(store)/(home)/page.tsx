import { Navigation } from '@/components/navigation'
import { ProductCards } from '@/components/product-cards'

import { getProducts } from '@/services/get-products'

export default async function Home() {
  const toysPromise = getProducts('toy')
  const bedsPromise = getProducts('bed')

  const [toys, beds] = await Promise.all([toysPromise, bedsPromise])

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />

      <div className="p-4">
        <h2 className="font-bold">Camas</h2>
      </div>

      <div className="flex px-4 gap-5 w-full overflow-x-auto">
        <ProductCards products={beds} />
      </div>

      <div className="p-4">
        <h2 className="font-bold">Brinquedos</h2>
      </div>

      <div className="flex px-4 mb-4 gap-5 w-full overflow-x-auto">
        <ProductCards products={toys} />
      </div>
    </div>
  )
}
