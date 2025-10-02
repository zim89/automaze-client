'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { categoryApi, categoryKeys } from '@/entities/category'
import { logError } from '@/shared/utils'

interface UseDeleteCategoryOptions {
  onSuccess?: () => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for deleting category
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useDeleteCategory = (options: UseDeleteCategoryOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryApi.delete,

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (_data, _variables, _context) => {
      // Toast success notification
      toast.success('Category deleted successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.root })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useDeleteCategory] Deletion error:', error)

      // Toast error notification
      toast.error('Failed to delete category. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
