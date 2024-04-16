import { links } from '@/utils/links'
import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="flex gap-5 py-4 px-4 md:px-0 border-b border-solid border-zinc-300 w-full overflow-x-auto">
      {links.map((item) => (
        <div
          className="flex flex-col justify-center items-center w-28"
          key={item.id}
        >
          <Link
            href={item.path}
            className="w-16 h-16 flex justify-center items-center rounded-full border border-purple-600 border-solid p-1"
          >
            <div className="w-full h-full rounded-full p-3 flex justify-center items-center bg-purple-600 text-white">
              {item.icon}
            </div>
          </Link>
          <h3 className="text-purple-600 font-bold">{item.name}</h3>
        </div>
      ))}
    </nav>
  )
}
