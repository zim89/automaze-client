import { statKeys } from './stat-keys'
import { statRequests } from './stat-requests'

/**
 * API class for statistics
 * Contains HTTP methods and query options
 */
class StatApi {
  getTasksStats = statRequests.getTasksStats

  /**
   * Query options for getting tasks statistics
   */
  tasksStatsOptions() {
    return {
      queryKey: statKeys.tasks(),
      queryFn: () => this.getTasksStats(),
    }
  }
}

export const statApi = new StatApi()
