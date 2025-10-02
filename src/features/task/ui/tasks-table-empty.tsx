import { FileQuestion } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface TasksTableEmptyProps {
  onAddTask: () => void
}

export const TasksTableEmpty = ({ onAddTask }: TasksTableEmptyProps) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg border border-dashed py-16'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <FileQuestion className='text-muted-foreground h-12 w-12' />
        <h3 className='text-xl font-semibold'>No tasks found</h3>
        <p className='text-muted-foreground mb-4 text-sm'>
          Get started by creating your first task
        </p>
        <Button onClick={onAddTask}>Create Task</Button>
      </div>
    </div>
  )
}
