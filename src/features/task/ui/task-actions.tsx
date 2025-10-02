'use client'

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { type Task } from '@/entities/task'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useToggleTask } from '../model'
import { TaskDeleteDialog } from './task-delete-dialog'
import { TaskEditForm } from './task-edit-form'

interface TaskActionsProps {
  task: Task
}

export const TaskActions = ({ task }: TaskActionsProps) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const toggleTask = useToggleTask()

  const handleToggle = () => {
    toggleTask.mutate(task.id)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleToggle}>
            {task.isDone ? 'Mark as pending' : 'Mark as done'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive'
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskEditForm task={task} open={editOpen} onOpenChange={setEditOpen} />
      <TaskDeleteDialog
        task={task}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  )
}
