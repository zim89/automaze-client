import { tasksKeys } from './tasks-keys'
import { tasksRequests } from './tasks-requests'
import type { TasksParams } from './tasks-types'

/**
 * API class for tasks
 * Contains HTTP methods and query options
 */
class TasksApi {
  findById = tasksRequests.findById
  findMany = tasksRequests.findMany
  create = tasksRequests.create
  update = tasksRequests.update
  toggleDone = tasksRequests.toggleDone
  delete = tasksRequests.delete

  /**
   * Query options for finding task by ID
   */
  findByIdOptions(id: string) {
    return {
      queryKey: tasksKeys.detail(id),
      queryFn: () => this.findById(id),
      enabled: !!id,
    }
  }

  /**
   * Query options for finding many tasks
   */
  findManyOptions(params?: TasksParams) {
    return {
      queryKey: tasksKeys.list(params || {}),
      queryFn: () => this.findMany(params),
    }
  }
}

export const tasksApi = new TasksApi()
