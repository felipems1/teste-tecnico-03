import { Product } from '@/types/product'

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(`http://localhost:3333/search`)

  const data: Product[] = await response.json()

  const products = data.filter((product) => {
    return product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  return products
}
