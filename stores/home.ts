import { acceptHMRUpdate, defineStore } from "pinia";


export const useHomeStore = defineStore("home", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State
  const allData = ref<any>([])

  // Getters
  const getAllTop = computed(() => {
    return allData.value.alltop
  })
  const getLatest = computed(() => {
    return allData.value.latest
  })
  const getNewPosts = computed(() => {
    return allData.value.newposts
  })
  const getTodayTop = computed(() => {
    return allData.value.todaytop
  })
  const getWeekTop = computed(() => {
    return allData.value.weektop
  })

  // Setters

  // Actions
  const fetchAllData = async () => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/home/all`)
    allData.value = value
  }

  return {
    allData,

    getAllTop,
    getLatest,
    getNewPosts,
    getTodayTop,
    getWeekTop,

    fetchAllData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot));
