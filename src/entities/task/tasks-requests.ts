import { apiRoutes, axiosClient } from '@/shared/api'
import type {
  CreateTaskDto,
  Task,
  TasksPaginatedResponse,
  TasksParams,
  UpdateTaskDto,
} from './tasks-types'

/**
 * Tasks requests class
 * Contains all HTTP methods for tasks operations
 */
class TasksRequests {
  /**
   * Find task by ID
   */
  async findById(id: string): Promise<Task> {
    const response = await axiosClient.get<Task>(apiRoutes.tasks.findById(id))
    return response.data
  }

  /**
   * Find many tasks with pagination and filtering
   */
  async findMany(params?: TasksParams): Promise<TasksPaginatedResponse> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<TasksPaginatedResponse>(
      `${apiRoutes.tasks.findMany}?${searchParams.toString()}`,
    )

    return response.data
  }

  /**
   * Create new task
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await axiosClient.post<Task>(apiRoutes.tasks.create, data)
    return response.data
  }

  /**
   * Update task
   */
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await axiosClient.patch<Task>(
      apiRoutes.tasks.update(id),
      data,
    )
    return response.data
  }

  /**
   * Toggle task done status
   */
  async toggleDone(id: string): Promise<Task> {
    const response = await axiosClient.patch<Task>(apiRoutes.tasks.toggle(id))
    return response.data
  }

  /**
   * Delete task
   */
  async delete(id: string): Promise<void> {
    await axiosClient.delete(apiRoutes.tasks.delete(id))
  }
}

export const tasksRequests = new TasksRequests()
