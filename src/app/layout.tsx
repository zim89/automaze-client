import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Header } from '@/widgets/header'
import './globals.css'
import { AppProviders } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Automaze - Task Management',
  description: 'Task management application with categories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <AppProviders>
            <div className='min-h-screen space-y-4'>
              <Header />
              <main>
                <div className='container'>
                  <div className='mx-auto'>{children}</div>
                </div>
              </main>
            </div>
          </AppProviders>
        </NuqsAdapter>
      </body>
    </html>
  )
}
