import { Skeleton } from '@/shared/components/ui/skeleton'

export const StatsCardSkeleton = () => {
  return (
    <div className='bg-card rounded-lg border p-4 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-3 w-20' />
          <Skeleton className='h-8 w-16' />
          <Skeleton className='h-3 w-32' />
        </div>
        <Skeleton className='h-9 w-9 rounded-full' />
      </div>
    </div>
  )
}

export const TasksStatsSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      <div className='grid gap-3 md:grid-cols-2'>
        <div className='bg-card rounded-lg border p-4 shadow-sm'>
          <div className='mb-2 flex items-center justify-between'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-12' />
          </div>
          <Skeleton className='h-2 w-full' />
          <Skeleton className='mt-2 h-3 w-40' />
        </div>

        <div className='bg-card rounded-lg border p-4 shadow-sm'>
          <Skeleton className='mb-3 h-4 w-28' />
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-20 rounded-full' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-24 rounded-full' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-20 rounded-full' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
