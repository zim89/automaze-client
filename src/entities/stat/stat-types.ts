export interface CategoryStat {
  name: string
  count: number
  color: string | null
}

export interface TasksStats {
  totalTasks: number
  doneTasks: number
  pendingTasks: number
  completionRate: number
  overdueTasks: number
  topCategories: CategoryStat[]
}
