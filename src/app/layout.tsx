import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loja virtual',
  description: 'Teste tecnico | Softcom',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen max-w-screen overflow-x-hidden">
            <Header />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
