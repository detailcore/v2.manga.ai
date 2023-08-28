import { acceptHMRUpdate, defineStore } from "pinia"
import { CreateData } from '@/services/interfaces'
import { useUtils } from '@/composables/useUtils'

interface LastChapter {
  volume: number
  chapter: string
}
interface MangaInfo {
  id: number
  alias: string
  title_rus: string
  title_eng: string
}

export const useCreateStore = defineStore("create", () => {
  const { resApi } = useUtils()
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State
  const lastChapter = ref({} as LastChapter)
  const mangaInfo = ref({} as MangaInfo)

  // Getters

  // Setters

  // Actions
  const fetchCreateInfoChapter = async (alias: string) => {
    const res = await useApiFetch(apiDomain + apiPrefix + `/create/${alias}/chapter`)
    return resApi(res)
  }
  const fetchCreateNewChapter = async (data: any) => {
    const res = await useApiFetch(apiDomain + apiPrefix + `/post`, {
      method: 'POST',
      body: data,
    })
    return resApi(res)
  }
  const fetchCreateNewTitle = async (data: any) => {
    const res = await useApiFetch(apiDomain + apiPrefix + `/post`, {
      method: 'POST',
      body: data,
    })
    return resApi(res)
  }
  const fetchCreatePeople = async (data: CreateData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + '/people', {
      method: 'POST',
      body: data
    })
    return resApi(res)
  }
  const fetchCreateTeams = async (payload: CreateData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + '/team', {
      method: 'POST',
      body: payload
    })
    return resApi(res)
  }
  const fetchCreatePublishers = async (data: CreateData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + '/publisher', {
      method: 'POST',
      body: data
    })
    return resApi(res)
  }

  return {
    fetchCreateInfoChapter,
    fetchCreateNewTitle,
    fetchCreatePeople,
    fetchCreateTeams,
    fetchCreatePublishers,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCreateStore, import.meta.hot));
