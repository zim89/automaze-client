'use client'

import { useQuery } from '@tanstack/react-query'
import { type TasksParams, tasksApi } from '@/entities/task'

/**
 * Hook for fetching tasks with optional filtering
 *
 * @param params - Request parameters for filtering and pagination
 * @returns Query result with tasks data, loading and error states
 */
export const useTasksData = (params?: TasksParams) => {
  return useQuery({
    ...tasksApi.findManyOptions(params),
  })
}
