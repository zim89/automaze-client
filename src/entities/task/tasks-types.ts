import { SortOrder, TaskStatus } from '@/shared/constants'

/** Parameters for tasks requests */
export interface TasksParams {
  search?: string
  status?: TaskStatus
  category?: string
  sortField?: string
  sortBy?: SortOrder
  page?: number
  limit?: number
}

// ==============================
// MAIN TYPES
// ==============================

/** Category in task response */
export interface TaskCategory {
  id: string
  name: string
  color: string | null
}

/** Main task entity */
export interface Task {
  id: string
  title: string
  description: string | null
  priority: number
  isDone: boolean
  dueDate: string | null
  categoryId: string | null
  category: TaskCategory | null
  createdAt: string
  updatedAt: string
}

/** Paginated tasks response */
export interface TasksPaginatedResponse {
  tasks: Task[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// ==============================
// ADDITIONAL TYPES
// ==============================

/** Create task */
export interface CreateTaskDto {
  title: string
  description?: string
  priority?: number
  isDone?: boolean
  dueDate?: string
  categoryId?: string
}

/** Update task */
export interface UpdateTaskDto {
  title?: string
  description?: string
  priority?: number
  isDone?: boolean
  dueDate?: string
  categoryId?: string
}
