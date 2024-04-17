'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center gap-3 rounded bg-white px-5 py-3 ring-zinc-700"
    >
      <input
        name="q"
        defaultValue={query ?? ''}
        type="text"
        placeholder="O que você procura?"
        className="flex-1 bg-transparent text-sm outline-none text-black placeholder:text-zinc-500"
      />
      <Search className="h-5 w-5 text-zinc-500" />
    </form>
  )
}
