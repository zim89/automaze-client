'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { type Task } from '@/entities/task'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { TaskActions } from './task-actions'
import { TaskStatusCheckbox } from './task-status-checkbox'

export const tasksTableColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      return <div className='font-medium'>{title}</div>
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string | null
      if (!description) return <span className='text-muted-foreground'>—</span>
      return <div className='max-w-xs truncate text-sm'>{description}</div>
    },
  },
  {
    id: 'category',
    accessorFn: row => row.category?.name || '',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const category = row.original.category
      if (!category) return <span className='text-muted-foreground'>—</span>
      return (
        <Badge
          variant='outline'
          style={{
            borderColor: category.color || undefined,
            color: category.color || undefined,
          }}
        >
          {category.name}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const priority = row.getValue('priority') as number

      const variant =
        priority <= 3 ? 'destructive' : priority <= 6 ? 'default' : 'secondary'

      return (
        <Badge variant={variant} className='px-2'>
          {priority}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dueDate = row.getValue('dueDate') as string | null
      if (!dueDate) return <span className='text-muted-foreground'>—</span>

      const date = new Date(dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const isOverdue = date < today && !row.original.isDone

      return (
        <div className='flex items-center gap-2'>
          <div className='text-sm'>{date.toLocaleDateString()}</div>
          {isOverdue && (
            <Badge variant='destructive' className='text-xs'>
              Overdue
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string
      return (
        <div className='text-sm'>{new Date(date).toLocaleDateString()}</div>
      )
    },
  },
  {
    accessorKey: 'isDone',
    header: 'Status',
    cell: ({ row }) => {
      const task = row.original
      return <TaskStatusCheckbox taskId={task.id} isDone={task.isDone} />
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <TaskActions task={row.original} />
    },
  },
]
