export const statKeys = {
  root: ['stat'] as const,
  tasks: () => [...statKeys.root, 'tasks'] as const,
} as const
