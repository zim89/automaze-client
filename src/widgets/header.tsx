'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckSquare } from 'lucide-react'
import { appRoutes } from '@/shared/constants'
import { cn } from '@/shared/utils'
import { ThemeSwitcher } from './theme-switcher'

const links = [
  {
    label: 'Home',
    href: appRoutes.home,
  },
  {
    label: 'Tasks',
    href: appRoutes.tasks,
  },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className='border-b'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          <CheckSquare className='h-6 w-6' />
          <span className='text-xl'>AutoMaze</span>
        </Link>

        <div className='flex items-center gap-4'>
          <nav className='flex items-center gap-6'>
            {links.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:text-primary text-base font-bold transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
