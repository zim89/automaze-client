'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { statKeys } from '@/entities/stat'
import { type Task, tasksApi, tasksKeys } from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseToggleTaskOptions {
  onSuccess?: (data: Task) => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for toggling task done status
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useToggleTask = (options: UseToggleTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.toggleDone,

    // Optimistic update
    onMutate: async (taskId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: tasksKeys.root })

      // Snapshot previous value
      const previousData = queryClient.getQueryData(
        tasksKeys.list({ limit: 1000 }),
      )

      // Optimistically update the task
      queryClient.setQueryData(
        tasksKeys.list({ limit: 1000 }),
        (old: unknown) => {
          if (!old || typeof old !== 'object' || !('tasks' in old)) return old

          return {
            ...old,
            tasks: (old as { tasks: Task[] }).tasks.map((task: Task) =>
              task.id === taskId ? { ...task, isDone: !task.isDone } : task,
            ),
          }
        },
      )

      // Return context with snapshot
      return { previousData }
    },

    onSuccess: (data, _variables, _context) => {
      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, context) => {
      // Rollback to previous state
      if (context?.previousData) {
        queryClient.setQueryData(
          tasksKeys.list({ limit: 1000 }),
          context.previousData,
        )
      }

      // Log error
      logError('❌ [useToggleTask] Toggle error:', error)

      // Toast error notification
      toast.error('Failed to toggle task status. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Refetch to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: tasksKeys.root })
      queryClient.invalidateQueries({ queryKey: statKeys.root })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
