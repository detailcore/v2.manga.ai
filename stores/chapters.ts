import { acceptHMRUpdate, defineStore } from "pinia"
import { ChaptersInPost, ChapterInPost, Paginate } from "services/interfaces"
import { useUtils } from '~/composables/useUtils'


export const useChaptersStore = defineStore("chapters", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()
  const { mergeDuplicates } = useUtils()

  // State
  const loaded = ref<boolean>(false)
  const paginate = ref<Paginate>({} as Paginate)
  const chapters = ref<ChapterInPost[]>({} as ChapterInPost[])

  // Getters
  const getChapters = computed<ChapterInPost[][]>(() => mergeDuplicates(chapters.value))

  // Setters

  // Actions
  const fetchChapters = async (id: number, num: number = 1, sort: string = 'desc') => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/post/chapters/${id}?order=${sort}&page=${num}`)
    const {
      data,
      current_page,
      first_page_url,
      from,
      last_page,
      last_page_url,
      links,
      next_page_url,
      path,
      per_page,
      prev_page_url,
      to,
      total,
    } = value as ChaptersInPost

    paginate.value = { 
      current_page,
      first_page_url,
      from,
      last_page,
      last_page_url,
      links,
      next_page_url,
      path,
      per_page,
      prev_page_url,
      to,
      total,
    } as Paginate

    chapters.value = data
  }

  return {
    paginate,

    getChapters,

    fetchChapters,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChaptersStore, import.meta.hot));
