'use client'

import { type Task } from '@/entities/task'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { useDeleteTask } from '../model'

interface TaskDeleteDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const TaskDeleteDialog = ({
  task,
  open,
  onOpenChange,
}: TaskDeleteDialogProps) => {
  const deleteTask = useDeleteTask({
    onSuccess: () => {
      onOpenChange(false)
    },
  })

  const handleDelete = () => {
    deleteTask.mutate(task.id)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='bg-muted rounded-md border p-3 text-sm'>
          <div className='mb-1 font-medium'>{task.title}</div>
          <div className='text-muted-foreground text-xs'>ID: {task.id}</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            disabled={deleteTask.isPending}
          >
            {deleteTask.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
