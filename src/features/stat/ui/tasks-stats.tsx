'use client'

import { AlertCircle, CheckSquare, Clock, ListTodo } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Progress } from '@/shared/components/ui/progress'
import { useStatsData } from '../model'
import { StatsCard } from './stats-card'
import { TasksStatsSkeleton } from './tasks-stats-skeleton'

export const TasksStats = () => {
  const { data, isLoading } = useStatsData()

  if (isLoading) {
    return <TasksStatsSkeleton />
  }

  const {
    totalTasks = 0,
    doneTasks = 0,
    pendingTasks = 0,
    completionRate = 0,
    overdueTasks = 0,
    topCategories = [],
  } = data || {}

  return (
    <div className='space-y-4'>
      <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Tasks'
          value={totalTasks}
          description='All tasks in system'
          icon={ListTodo}
        />
        <StatsCard
          title='Completed'
          value={doneTasks}
          description={`${completionRate}% completion rate`}
          icon={CheckSquare}
        />
        <StatsCard
          title='Pending'
          value={pendingTasks}
          description='Tasks to complete'
          icon={Clock}
        />
        <StatsCard
          title='Overdue'
          value={overdueTasks}
          description='Past due date'
          icon={AlertCircle}
        />
      </div>

      {/* Progress Bar and Top Categories */}
      {totalTasks > 0 && (
        <div className='grid gap-3 md:grid-cols-2'>
          <div className='bg-card rounded-lg border p-4 shadow-sm'>
            <div className='mb-2 flex items-center justify-between'>
              <h3 className='text-sm font-medium'>Overall Progress</h3>
              <span className='text-sm font-bold'>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className='h-2' />
            <p className='text-muted-foreground mt-2 text-xs'>
              {doneTasks} of {totalTasks} tasks completed
            </p>
          </div>

          {topCategories.length > 0 && (
            <div className='bg-card rounded-lg border p-4 shadow-sm'>
              <h3 className='mb-3 text-sm font-medium'>Top Categories</h3>
              <div className='space-y-2'>
                {topCategories.map(({ name, count, color }) => (
                  <div key={name} className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        style={{
                          borderColor: color || undefined,
                          color: color || undefined,
                        }}
                      >
                        {name}
                      </Badge>
                    </div>
                    <span className='text-muted-foreground text-sm'>
                      {count} {count === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
