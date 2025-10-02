import { apiRoutes, axiosClient } from '@/shared/api'
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './category-types'

/**
 * Categories requests class
 * Contains all HTTP methods for categories operations
 */
class CategoryRequests {
  /**
   * Find category by ID
   */
  async findById(id: string): Promise<Category> {
    const response = await axiosClient.get<Category>(
      apiRoutes.categories.findById(id),
    )
    return response.data
  }

  /**
   * Find all categories
   */
  async findMany(): Promise<Category[]> {
    const response = await axiosClient.get<Category[]>(
      apiRoutes.categories.findMany,
    )
    return response.data
  }

  /**
   * Create new category
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    const response = await axiosClient.post<Category>(
      apiRoutes.categories.create,
      data,
    )
    return response.data
  }

  /**
   * Update category
   */
  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const response = await axiosClient.patch<Category>(
      apiRoutes.categories.update(id),
      data,
    )
    return response.data
  }

  /**
   * Delete category
   */
  async delete(id: string): Promise<void> {
    await axiosClient.delete(apiRoutes.categories.delete(id))
  }
}

export const categoryRequests = new CategoryRequests()
