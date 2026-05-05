import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: '数論の未解決問題集',
  description: '数論の未解決・状況不明な問題を集めたサイト',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-gray-200 py-4 px-6">
          <nav className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              数論の未解決問題集
            </Link>
            <Link
              href="/submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              問題を投稿
            </Link>
          </nav>
        </header>
        <main className="max-w-3xl mx-auto w-full px-6 py-8 flex-1">{children}</main>
      </body>
    </html>
  )
}
