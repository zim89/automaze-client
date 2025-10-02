import { categoryKeys } from './category-keys'
import { categoryRequests } from './category-requests'

/**
 * API class for categories
 * Contains HTTP methods and query options
 */
class CategoryApi {
  findById = categoryRequests.findById
  findMany = categoryRequests.findMany
  create = categoryRequests.create
  update = categoryRequests.update
  delete = categoryRequests.delete

  /**
   * Query options for finding category by ID
   */
  findByIdOptions(id: string) {
    return {
      queryKey: categoryKeys.detail(id),
      queryFn: () => this.findById(id),
      enabled: !!id,
    }
  }

  /**
   * Query options for finding all categories
   */
  findManyOptions() {
    return {
      queryKey: categoryKeys.list(),
      queryFn: () => this.findMany(),
    }
  }
}

export const categoryApi = new CategoryApi()
