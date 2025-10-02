'use client'

import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/entities/category'

/**
 * Hook for fetching category data by ID
 *
 * @param id - Category ID
 * @returns Query result with data, loading and error states
 */
export const useCategoryData = (id: string) => {
  return useQuery({
    ...categoryApi.findByIdOptions(id),
  })
}
