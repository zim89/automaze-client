import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  priority: z.number().min(1).max(10),
  categoryId: z.string().trim().optional(),
  dueDate: z.date().optional(),
})

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  priority: z.number().min(1).max(10),
  categoryId: z.string().trim().optional(),
  dueDate: z.date().optional(),
})

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>
export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>
