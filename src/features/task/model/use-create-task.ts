'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  type CreateTaskDto,
  type Task,
  tasksApi,
  tasksKeys,
} from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseCreateTaskOptions {
  onSuccess?: (data: Task) => void
  onError?: (error: Error, variables: CreateTaskDto) => void
  onSettled?: () => void
}

/**
 * Hook for creating new task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useCreateTask = (options: UseCreateTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.create,

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (data, _variables, _context) => {
      // Toast success notification
      toast.success('Task created successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tasksKeys.root })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useCreateTask] Creation error:', error)

      // Toast error notification
      toast.error('Failed to create task. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
