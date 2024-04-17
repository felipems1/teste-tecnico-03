import { ProductCards } from '@/components/product-cards'
import { searchProducts } from '@/services/search-products'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="p-4">
        <p>
          Resultado para: <b>{query}</b>
        </p>
      </div>

      {products.length === 0 && (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <h1>Nenhum produto encontrado.</h1>
        </div>
      )}

      {products.length !== 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-4 gap-5 w-full">
          <ProductCards products={products} />
        </div>
      )}
    </div>
  )
}
