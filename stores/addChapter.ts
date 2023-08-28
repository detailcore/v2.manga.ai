import { acceptHMRUpdate, defineStore } from "pinia"
import { typeName, NewChapter } from '@/services/interfaces'
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
interface InfoChapter {
  chapter: LastChapter
  post: MangaInfo
  teams: typeName[]
}

export const useAddChapterStore = defineStore("addChapter", () => {
  const { resApi } = useUtils()
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  // State
  const chapters = ref<NewChapter[]>([] as NewChapter[]) // новые главы
  const mangaInfo = ref<MangaInfo>()
  const lastChapter = ref({} as LastChapter)
  const lastTeams = ref([] as typeName[])

  // Getters

  // Setters
  const setNewChapter = ({ volume, chapter, teams }: NewChapter) => {
    let lastPlusOne: string = '',
        plusOne: string = (+chapter + 1).toString()

    if(Number.isInteger(+chapter)) { 
      lastPlusOne = plusOne // Обычное увеличение
    } else {
      const arr = chapter.split('.')
      lastPlusOne = (arr.length > 0) ? (
        arr.shift() +'.'+ (Number(arr.pop()) + 1) // Увеличение для float чисел
      ) : plusOne
    }

    chapters.value.push({
      volume: volume,
      chapter: lastPlusOne,
      name: '',
      teams: teams,
      isLoaded: false,
      filename: '*выберите файл'
    })
  }

  // Actions
  const fetchUploadNewChapter = async (data: FormData) => {
    const res = await useApiFetch(apiDomain + apiPrefix + `/create/chapter`, {
      method: 'POST',
      body: data
    })
    return resApi(res)
  }

  const fetchCreateInfoChapter = async (alias: string) => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/create/${alias}/chapter`)
    const { post, teams, chapter } = value as InfoChapter
    if(post) mangaInfo.value = post
    if(teams) lastTeams.value = teams
    if(chapter) {
      lastChapter.value = chapter
      chapters.value.push({
        volume: chapter.volume,
        chapter: (+chapter.chapter + 1).toString(),
        name: '',
        isLoaded: false,
        filename: '*выберите файл'
      })
    }
  }

  return {
    chapters,
    mangaInfo,
    lastChapter,
    lastTeams,

    setNewChapter,

    fetchUploadNewChapter,
    fetchCreateInfoChapter,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAddChapterStore, import.meta.hot));
