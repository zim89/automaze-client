import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { TasksStats } from '@/features/stat'
import { Button } from '@/shared/components/ui/button'

export default function Home() {
  return (
    <div className='container py-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        {/* Hero Section */}
        <div className='mx-auto max-w-3xl text-center'>
          <div className='bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium'>
            New Release
          </div>

          <h1 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            Organize Your Tasks{' '}
            <span className='text-primary'>Efficiently</span>
          </h1>

          <p className='text-muted-foreground mb-6 text-base sm:text-lg'>
            Manage your tasks with priorities, categories, and due dates. Stay
            organized and productive with our intuitive task management system.
          </p>

          <div className='mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Button size='lg' asChild>
              <Link href='/tasks'>
                Get Started
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/tasks'>View Tasks</Link>
            </Button>
          </div>

          <div className='text-muted-foreground flex flex-col items-center gap-6'>
            <p className='text-sm'>Features</p>
            <div className='grid gap-4 text-left sm:grid-cols-3'>
              <div className='flex items-start gap-2'>
                <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
                <div>
                  <p className='text-foreground font-medium'>Priority Levels</p>
                  <p className='text-sm'>Assign priority from 1-10</p>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
                <div>
                  <p className='text-foreground font-medium'>Categories</p>
                  <p className='text-sm'>Organize with custom categories</p>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <CheckCircle2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
                <div>
                  <p className='text-foreground font-medium'>Due Dates</p>
                  <p className='text-sm'>Track deadlines easily</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <TasksStats />
      </div>
    </div>
  )
}
