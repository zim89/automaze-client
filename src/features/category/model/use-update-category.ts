'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  type Category,
  type UpdateCategoryDto,
  categoryApi,
  categoryKeys,
} from '@/entities/category'
import { logError } from '@/shared/utils'

interface UseUpdateCategoryOptions {
  onSuccess?: (data: Category) => void
  onError?: (
    error: Error,
    variables: { id: string; data: UpdateCategoryDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating category
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateCategory = (options: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoryApi.update(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (data, variables, _context) => {
      // Toast success notification
      toast.success('Category updated successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: categoryKeys.root })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useUpdateCategory] Update error:', error)

      // Toast error notification
      toast.error('Failed to update category. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
