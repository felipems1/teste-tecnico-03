import Link from 'next/link'
import { CartWidget } from './cart-widget'
import { SearchForm } from './search-form'

export function Header() {
  return (
    <header className="w-full h-32 bg-purple-600 text-white p-4 flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center">
        <Link href="/">Pet Friends Acessories</Link> <CartWidget />
      </div>
      <SearchForm />
    </header>
  )
}
