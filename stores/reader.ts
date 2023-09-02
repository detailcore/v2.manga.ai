import { acceptHMRUpdate, defineStore } from "pinia"
import { ChapterInReader, ChapterListInReader, ChapterInPost } from "services/interfaces"


export const useReaderStore = defineStore("reader", () => {
  const { resApi, mergeDuplicates } = useUtils()
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State
  const list = ref()
  const chapter = ref<ChapterInReader>()

  // Getters
  // const getChapters = computed<ChapterInPost[][]>(() => mergeDuplicates(list.value))

  // Setters

  // Actions
  const fetchChapterById = async (id: number) => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/chapter/${id}`)
    chapter.value = value as ChapterInReader
  }
  const fetchChapterListByAlias = async (alias: string) => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/chapters/${alias}`)
    list.value = mergeDuplicates(value as ChapterInPost[])
  }

  return {
    list,
    chapter,

    // getChapters,

    fetchChapterById,
    fetchChapterListByAlias,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useReaderStore, import.meta.hot));
