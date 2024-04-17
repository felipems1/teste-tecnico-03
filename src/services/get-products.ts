import { Product } from '@/types/product'

export async function getProducts(category: string): Promise<Product[]> {
  const response = await fetch(`http://localhost:3333/${category}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}
