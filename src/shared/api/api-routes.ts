const API_BASE = ''

export const apiRoutes = {
  tasks: {
    create: `${API_BASE}/tasks`,
    findMany: `${API_BASE}/tasks`,
    findById: (id: string) => `${API_BASE}/tasks/${id}`,
    update: (id: string) => `${API_BASE}/tasks/${id}`,
    delete: (id: string) => `${API_BASE}/tasks/${id}`,
    toggle: (id: string) => `${API_BASE}/tasks/${id}/toggle`,
  },
  categories: {
    create: `${API_BASE}/categories`,
    findMany: `${API_BASE}/categories`,
    findById: (id: string) => `${API_BASE}/categories/${id}`,
    update: (id: string) => `${API_BASE}/categories/${id}`,
    delete: (id: string) => `${API_BASE}/categories/${id}`,
  },
  stats: {
    get: `${API_BASE}/stats`,
  },
} as const
