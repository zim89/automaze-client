'use client'

import { Suspense } from 'react'
import { TasksTable } from '@/features/task'

const Page = () => {
  return (
    <div className='py-8'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Tasks</h1>
        <p className='text-muted-foreground'>
          Manage your tasks with priority, categories, and due dates
        </p>
      </div>

      <Suspense fallback={null}>
        <TasksTable />
      </Suspense>
    </div>
  )
}
export default Page
