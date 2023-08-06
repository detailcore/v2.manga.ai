import { uniqBy } from 'lodash'
import { acceptHMRUpdate, defineStore } from "pinia";


export const useLibraryStore = defineStore("library", () => {

  // State
  const resetCount = ref<number>(0)
  const postsData = ref<any>([])
  const inputData = ref<any>({})
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()
  const selected = ref({
    adult_ranks: <any>[],
    formats: [],
    genres: [],
    status_of_releases: [],
    status_of_translations: [],
    tags: [],
    types: [],
    // ratings: [1, 10],
    chapter_count: [0, 200],
    years: [2001, new Date().getFullYear()],
    sort: 'views',
    order: 'desc',
  })

  type selectedKeyType = 'adult_ranks' | 'formats' | 'genres' | 'status_of_releases' | 'status_of_translations' | 'tags' | 'types' //  "adult_ranks" | "formats" ...


  // Getters
  const inputDataLoaded = computed(() => {
    return Object.keys(inputData.value).length != 0
  })
  const postsDataLoaded = computed(() => {
    return (postsData.value).length != 0
  })

  // Setters
  const setSelectedArray = (key: string, id: number, value: number) => {
    selected.value[key as selectedKeyType].push({ id, value })

    selected.value[key as selectedKeyType].forEach((item: any) => {
      if(item.id === id) {
        item.value = value
      }
    })
    selected.value[key as selectedKeyType] = uniqBy(selected.value[key as selectedKeyType], 'id')
  }

  const setSelectionOptions = (sort: string, order: string) => {
    selected.value.sort = sort
    selected.value.order = order
  }

  // Actions
  const fetchInputData = async () => {
    if(Object.keys(inputData.value).length == 0) {
      const { data: { value } } = await useFetch(apiDomain + apiPrefix + `/create/post`)
      inputData.value = value
    }
  }

  const fetchInitPosts = async () => {
    const { data: { value } } = await useFetch(apiDomain + apiPrefix + `/library`)
    postsData.value = value
  }

  const fetchPosts = async () => {
    const { data: { value } } = await useFetch(apiDomain + apiPrefix + `/library`, {
      method: 'POST',
      body: { ...selected.value }
    })

    postsData.value = value
  }

  const resetData = () => {
    selected.value = {
      adult_ranks: [],
      formats: [],
      genres: [],
      status_of_releases: [],
      status_of_translations: [],
      tags: [],
      types: [],
      // ratings: [1, 10],
      chapter_count: [0, 200],
      years: [2001, new Date().getFullYear()],
      sort: 'views',
      order: 'desc',
    }
    resetCount.value++
  }

  return {
    resetCount,
    postsData,
    inputData,
    selected,

    inputDataLoaded,
    postsDataLoaded,

    setSelectionOptions,
    setSelectedArray,

    fetchInputData,
    fetchInitPosts,
    fetchPosts,
    resetData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLibraryStore, import.meta.hot));
