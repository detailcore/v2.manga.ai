import { acceptHMRUpdate, defineStore } from "pinia"
import { ResponseApi, CreateData } from "services/interfaces"


export const useCreateStore = defineStore("create", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State

  // Getters

  // Setters

  // Actions
  const fetchCreateNewTitle = async (data: any) => {
    const res = await useApiFetch(apiDomain + apiPrefix + `/post`, {
      method: 'POST',
      body: data,
    })
    return res.data.value ? res.data.value as ResponseApi : { status: res.status.value, msg: res.error.value?.data.message }
  }
  const fetchCreatePeople = async (data: CreateData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + '/people', {
      method: 'POST',
      body: data
    })
    return res.data.value ? res.data.value as ResponseApi : { status: res.status.value, msg: res.error.value?.data.message }
  }
  const fetchCreateTeams = async (payload: CreateData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + '/team', {
      method: 'POST',
      body: payload
    })
    return res.data.value ? res.data.value as ResponseApi : { status: res.status.value, msg: res.error.value?.data.message }
  }
  const fetchCreatePublishers = async (data: CreateData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + '/publisher', {
      method: 'POST',
      body: data
    })
    return res.data.value ? res.data.value as ResponseApi : { status: res.status.value, msg: res.error.value?.data.message }
  }

  return {
    fetchCreateNewTitle,
    fetchCreatePeople,
    fetchCreateTeams,
    fetchCreatePublishers,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCreateStore, import.meta.hot));
