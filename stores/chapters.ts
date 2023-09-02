import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia"
import { ChaptersInPost, ChapterInPost, TeamManga } from "services/interfaces"
import { useUtils } from '~/composables/useUtils'
import { useMangaStore } from '~/stores/manga'

interface Branches {
  id: number
  id_chapters: number[]
}

export const useChaptersStore = defineStore("chapters", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()
  const { mergeDuplicates } = useUtils()
  const { manga } = storeToRefs(useMangaStore())

  // State
  const chapters = ref<ChapterInPost[]>({} as ChapterInPost[])
  // const branches = ref<Branches[]>()

  // Getters
  // const getChapters = computed<ChapterInPost[][]>(() => mergeDuplicates(chapters.value))
  // const getBranches = computed(() => {
  //   return manga.value.teams?.length ? manga.value.teams.filter(item => branches.value?.some(v => v.id == item.id)) : []
  // })

  // Setters

  // Actions
  const fetchChapters = async (alias: string, sort: string = 'desc') => {
    interface Value {
      list: ChapterInPost[],
      branches: Branches[],
    }
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/chapters/${alias}?order=${sort}`)
    // chapters.value = value as ChapterInPost[]
    const response = value as Value
    chapters.value = mergeDuplicates(response.list)
    // branches.value = response.branches
  }

  return {
    chapters,
    // branches,

    // getChapters,
    // getBranches,

    fetchChapters,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChaptersStore, import.meta.hot));
