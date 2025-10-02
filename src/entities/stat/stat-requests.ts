import { apiRoutes, axiosClient } from '@/shared/api'
import type { TasksStats } from './stat-types'

/**
 * Statistics requests class
 * Contains all HTTP methods for statistics operations
 */
class StatRequests {
  async getTasksStats(): Promise<TasksStats> {
    const response = await axiosClient.get<TasksStats>(apiRoutes.stats.get)
    return response.data
  }
}

export const statRequests = new StatRequests()
