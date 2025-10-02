'use client'

import { Checkbox } from '@/shared/components/ui/checkbox'
import { useToggleTask } from '../model'

interface TaskStatusCheckboxProps {
  taskId: string
  isDone: boolean
}

export const TaskStatusCheckbox = ({
  taskId,
  isDone,
}: TaskStatusCheckboxProps) => {
  const toggleTask = useToggleTask()

  const handleToggle = () => {
    toggleTask.mutate(taskId)
  }

  return (
    <Checkbox
      checked={isDone}
      onCheckedChange={handleToggle}
      aria-label='Toggle task status'
      className='cursor-pointer'
    />
  )
}
