import axios, { type CreateAxiosDefaults } from 'axios'
import { logError } from '../utils'

const getContentType = () => ({
  'Content-Type': 'application/json',
})

const baseOptions: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    ...getContentType(),
  },
}

export const axiosClient = axios.create(baseOptions)

// FormData processing - remove Content-Type for multipart/form-data
axiosClient.interceptors.request.use(config => {
  if (config.data instanceof FormData && config.headers) {
    delete config.headers['Content-Type']
  }
  return config
})

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Handle common errors
    logError('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)
