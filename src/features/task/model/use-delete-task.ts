'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { statKeys } from '@/entities/stat'
import { tasksApi, tasksKeys } from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseDeleteTaskOptions {
  onSuccess?: () => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for deleting task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useDeleteTask = (options: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.delete,

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (_data, _variables, _context) => {
      // Toast success notification
      toast.success('Task deleted successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tasksKeys.root })
      queryClient.invalidateQueries({ queryKey: statKeys.root })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useDeleteTask] Deletion error:', error)

      // Toast error notification
      toast.error('Failed to delete task. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
