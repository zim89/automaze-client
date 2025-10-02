'use client'

import { useQuery } from '@tanstack/react-query'
import { statApi } from '@/entities/stat'

/**
 * Hook for fetching tasks statistics
 *
 * @returns Query result with statistics data, loading and error states
 */
export const useStatsData = () => {
  return useQuery({
    ...statApi.tasksStatsOptions(),
  })
}
