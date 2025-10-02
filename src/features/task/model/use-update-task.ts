'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { statKeys } from '@/entities/stat'
import {
  type Task,
  type UpdateTaskDto,
  tasksApi,
  tasksKeys,
} from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseUpdateTaskOptions {
  onSuccess?: (data: Task) => void
  onError?: (
    error: Error,
    variables: { id: string; data: UpdateTaskDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateTask = (options: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      tasksApi.update(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (data, variables, _context) => {
      // Toast success notification
      toast.success('Task updated successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: tasksKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: tasksKeys.root })
      queryClient.invalidateQueries({ queryKey: statKeys.root })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useUpdateTask] Update error:', error)

      // Toast error notification
      toast.error('Failed to update task. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
