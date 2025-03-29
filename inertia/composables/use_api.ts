import { ref } from 'vue'

export type ApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export type RequestOptions = {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeout?: number
}

export function useApi() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const createState = <T>() => ({
    data: ref<T | null>(null),
    error: ref<string | null>(null),
    loading: ref(false),
  })

  const addParams = (url: string, params?: Record<string, string | number | boolean>) => {
    if (!params) return url

    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value))
    })

    return `${url}${url.includes('?') ? '&' : '?'}${queryParams.toString()}`
  }

  const fetchWithTimeout = async (url: string, options: RequestInit & { timeout?: number }) => {
    const { timeout = 10000, ...fetchOptions } = options
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })
      clearTimeout(id)
      return response
    } catch (error) {
      clearTimeout(id)
      throw error
    }
  }

  const processResponse = async (response: Response) => {
    if (!response.ok) {
      try {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error ${response.status}`)
      } catch {
        throw new Error(`HTTP error ${response.status}`)
      }
    }

    const contentType = response.headers.get('content-type')
    return contentType?.includes('application/json') ? await response.json() : await response.text()
  }

  const request = async <T>(
    method: string,
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    const state = createState<T>()
    const { headers = {}, params, timeout } = options

    state.loading.value = true
    state.error.value = null

    try {
      const url = addParams(`${baseUrl}${endpoint}`, params)
      const fetchOptions: RequestInit & { timeout?: number } = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        timeout,
      }

      if (body && method !== 'GET' && method !== 'HEAD') {
        fetchOptions.body = JSON.stringify(body)
      }

      const response = await fetchWithTimeout(url, fetchOptions)
      state.data.value = (await processResponse(response)) as T
    } catch (error) {
      state.error.value = error instanceof Error ? error.message : 'Unknown error'
      console.error(`API ${method} request failed:`, error)
    } finally {
      state.loading.value = false
    }

    return {
      data: state.data.value,
      error: state.error.value,
      loading: state.loading.value,
    }
  }

  return {
    get: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>('GET', endpoint, undefined, options),
    post: <T>(endpoint: string, data: any, options?: RequestOptions) =>
      request<T>('POST', endpoint, data, options),
    put: <T>(endpoint: string, data: any, options?: RequestOptions) =>
      request<T>('PUT', endpoint, data, options),
    patch: <T>(endpoint: string, data: any, options?: RequestOptions) =>
      request<T>('PATCH', endpoint, data, options),
    delete: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>('DELETE', endpoint, undefined, options),
  }
}
