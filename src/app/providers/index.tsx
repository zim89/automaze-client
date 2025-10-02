'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/shared/components/ui/sonner'
import { QueryProvider } from './query-provider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryProvider>
        {children}
        <Toaster position='top-right' richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  )
}
