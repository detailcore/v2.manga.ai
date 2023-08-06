import { acceptHMRUpdate, defineStore } from "pinia"
import { Manga } from "services/interfaces"


export const useMangaStore = defineStore("manga", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State
  const manga = ref<Manga>({} as Manga)
  // const manga = ref<any>({})
  // const manga = ref<any>({} as Manga)
  // const manga: Manga = ref<any>({})
  // type selectedKeyType = 'adult_ranks' | 'formats' | 'genres' | 'status_of_releases' | 'status_of_translations' | 'tags' | 'types' //  "adult_ranks" | "formats" ...

  // Getters
  const inputDataLoaded = computed(() => {
    return 0
  })

  // Setters
  const setSelectedArray = () => {
  }

  // Actions
  const fetchManga = async (alias: string | string[]) => {
    const { data: { value } } = await useFetch(apiDomain + apiPrefix + `/post/${alias}`)
    manga.value = value as Manga
  }

  return {
    manga,

    fetchManga,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMangaStore, import.meta.hot));
