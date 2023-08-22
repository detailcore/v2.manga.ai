import { acceptHMRUpdate, defineStore } from "pinia"
import { MangaTabs } from "services/types"
import { Manga } from "services/interfaces"
import { useDisplayUtils } from '~/composables/useDisplayUtils'


export const useMangaStore = defineStore("manga", () => {
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()
  const { avgValue } = useDisplayUtils()

  // State
  const manga = ref<Manga>({} as Manga)
  const mangaTab = ref<string>('' as MangaTabs)

  // Getters
  const inputDataLoaded = computed(() => {
    return 0
  })

  // Setters
  const setRate = (newRate: number) => {
    const curRate = manga.value.rating.your

    if(newRate === 0) { // Удалить оценку
      --manga.value.rating.amount
      --manga.value.rating.stars[curRate-1]
      manga.value.rating.your = newRate
      manga.value.rating.avg = avgValue(manga.value.rating.stars)
      fetchRate(manga.value.id, newRate)
      return
    }

    if(curRate != newRate) {
      // manga.value.rating.stars[newRate] = +1 

      if(curRate > 0 && manga.value.rating.stars[curRate-1] > 0) { // уменьшаем
        --manga.value.rating.stars[curRate-1]
      }

      if(curRate > 0) { // увеличение
        ++manga.value.rating.stars[newRate-1]
      }

      if(curRate == 0) { // создаём
        ++manga.value.rating.amount
        ++manga.value.rating.stars[newRate-1]
      }

      fetchRate(manga.value.id, newRate)
      manga.value.rating.your = newRate
      manga.value.rating.avg = avgValue(manga.value.rating.stars)
    }
  }
  const setTab = (name: MangaTabs) => {
    mangaTab.value = name
  }

  // Actions
  const fetchManga = async (alias: string | string[]) => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/post/${alias}`)
    manga.value = value as Manga
  }

  /**
   * Set rating by post ID
   * @param id Post ID
   * @param num Rating value
   */
  const fetchRate = async (id: number, num: number) => {
    const { data: { value } } = await useApiFetch(apiDomain + apiPrefix + `/post/${id}/rating`, {
      method: 'POST',
      body: { id: id, value: num }
    })

    console.log('value =>', value)
  }

  return {
    manga,
    mangaTab,

    setRate,
    setTab,

    fetchManga,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMangaStore, import.meta.hot));
