export const taskStatuses = {
  all: 'all',
  done: 'done',
  undone: 'undone',
} as const

export type TaskStatus = (typeof taskStatuses)[keyof typeof taskStatuses]

export const sortOrders = {
  asc: 'asc',
  desc: 'desc',
} as const

export type SortOrder = (typeof sortOrders)[keyof typeof sortOrders]
