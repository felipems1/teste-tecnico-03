import { Search, ShoppingCart } from 'lucide-react'

export function Header() {
  return (
    <header className="w-full h-32 bg-purple-600 text-white p-4 flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center">
        <h2>Pet Friends Acessories</h2>{' '}
        <div className="flex p-2 justify-center items-center rounded bg-purple-700 cursor-pointer hover:bg-purple-500">
          <ShoppingCart />
        </div>
      </div>
      <form className="flex w-full items-center gap-3 rounded bg-white px-5 py-3 ring-zinc-700">
        <input
          type="text"
          placeholder="O que você procura?"
          className="flex-1 bg-transparent text-sm outline-none text-black placeholder:text-zinc-500"
        />
        <Search className="h-5 w-5 text-zinc-500" />
      </form>
    </header>
  )
}
