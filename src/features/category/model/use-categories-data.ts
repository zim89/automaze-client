'use client'

import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/entities/category'

/**
 * Hook for fetching all categories
 *
 * @returns Query result with categories data, loading and error states
 */
export const useCategoriesData = () => {
  return useQuery({
    ...categoryApi.findManyOptions(),
  })
}
