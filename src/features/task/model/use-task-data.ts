'use client'

import { useQuery } from '@tanstack/react-query'
import { tasksApi } from '@/entities/task'

/**
 * Hook for fetching task data by ID
 *
 * @param id - Task ID
 * @returns Query result with data, loading and error states
 */
export const useTaskData = (id: string) => {
  return useQuery({
    ...tasksApi.findByIdOptions(id),
  })
}
