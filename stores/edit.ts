import { acceptHMRUpdate, defineStore } from "pinia"
import { FindKeys } from "services/types"
import { useUtils } from '@/composables/useUtils'
import { EditMangaCreateData, typeName, ResponseApi } from "services/interfaces"

export const useEditStore = defineStore("edit", () => {
  const { resApi } = useUtils()
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State
  const editMangaCreateData = ref<EditMangaCreateData>({} as EditMangaCreateData)
  const findData = ref({
    teams: [] as typeName[] | undefined,
    authors: [] as typeName[] | undefined,
    artists: [] as typeName[] | undefined,
    publishers: [] as typeName[] | undefined,
  })

  // Getters

  // Setters
  const setInitData = (key: FindKeys, payload: typeName[] | undefined) => {
    findData.value[key] = payload
  }

  // Actions
  const fetchSendData = async (id: number, data: any) => {
    const res = await useApiFetch(apiDomain + apiPrefix + `/post/${id}`, {
      method: 'POST',
      body: data,
    })
    return resApi(res)
  }

  const fetchCreateDate = async () => {
    const { data } = await useApiFetch(apiDomain + apiPrefix + '/create/post')
    editMangaCreateData.value = data.value as EditMangaCreateData
  }

  const fetchFindData = async (url: string, key: FindKeys, name: string = '') => {
    if(!name) return
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/search/${url}/${name}`)
    findData.value[key] = value as typeName[]
  }

  return {
    editMangaCreateData,
    findData,

    setInitData,

    fetchSendData,
    fetchCreateDate,
    fetchFindData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useEditStore, import.meta.hot));
