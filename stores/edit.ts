import { acceptHMRUpdate, defineStore } from "pinia"
import { EditMangaCreateData, typeName } from "services/interfaces"

export const useEditStore = defineStore("edit", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()
  type FindKeys = 'authors' | 'artists' | 'publishers' | 'teams'

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
    interface Response {
      msg: string
      status: string
    }
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/post/${id}`, {
      method: 'POST',
      body: data,
    })
    const res = value as Response

    if(res?.status == 'ok') return true
    return false
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
