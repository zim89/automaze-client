// ==============================
// MAIN TYPES
// ==============================

/** Main category entity */
export interface Category {
  id: string
  name: string
  color: string | null
  createdAt: string
  updatedAt: string
  _count?: {
    tasks: number
  }
}

// ==============================
// ADDITIONAL TYPES
// ==============================

/** Create category */
export interface CreateCategoryDto {
  name: string
  color?: string
}

/** Update category */
export interface UpdateCategoryDto {
  name?: string
  color?: string
}
