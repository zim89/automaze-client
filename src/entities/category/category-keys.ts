export const categoryKeys = {
  root: ['categories'] as const,

  all: () => [...categoryKeys.root, 'list'] as const,
  lists: () => [...categoryKeys.all()] as const,
  list: () => [...categoryKeys.lists()] as const,

  details: () => [...categoryKeys.root, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
} as const
