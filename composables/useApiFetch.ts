import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const { fullPath } = useRoute()
  const { public: { jsDomain } } = useRuntimeConfig()


  let headers: any = {
    'Accept': 'application/json',
    'referer': jsDomain + fullPath,
  }
  const token = useCookie('XSRF-TOKEN')

  if(token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string
  }

  if(process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie'])
    }
  }

  return useFetch(url, {
    credentials: 'include',
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  })
}
