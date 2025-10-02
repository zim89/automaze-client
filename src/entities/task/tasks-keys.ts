import type { TasksParams } from './tasks-types'

export const tasksKeys = {
  root: ['tasks'] as const,

  all: () => [...tasksKeys.root, 'list'] as const,
  lists: () => [...tasksKeys.all()] as const,
  list: (params: TasksParams) => [...tasksKeys.lists(), params] as const,

  details: () => [...tasksKeys.root, 'detail'] as const,
  detail: (id: string) => [...tasksKeys.details(), id] as const,
} as const
