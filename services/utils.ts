import { ChapterInPost } from "@/services/interfaces"

// interface ChapterInPost {
//   id: number
//   id_branch?: number | null
//   id_user?: number
//   name: string
//   volume: number
//   chapter: string
//   updated_at: string
//   teams?: TeamInChapter[] | []
// }

// interface TeamInChapter {
//   checked_at: string
//   deleted_at: null | string
//   id: number
//   id_status: number
//   id_tmp?: number
//   name: string
// }

/**
 * Объединить одинаковые тома и главы в массив
 * @param [Array] []
 * @return [Array] []
 */
export function mergeDuplicates(arr: ChapterInPost[]) {
  let sortVol: ChapterInPost[][] = [], sortCh: ChapterInPost[] = [], result: any = []

  if(arr.length > 0) {
    // Сортировка по томам
    sortVol = Object.values(
      arr.reduce((prev: any, cur: ChapterInPost) => {
        const vol: string = 'h' + cur['volume']; // символ "h" добавлен, чтобы автоматически не сортировало по цифровым ключам
        (prev[vol] = prev[vol] || []).push(cur)
        return prev
      }, {})
    )

    // Сортировка по главам
    for (const chapters of sortVol) {
      sortCh = Object.values(
        chapters.reduce((prev: any, cur) => {
          const ch = 'k' + cur['chapter']; // символ "k" добавлен, чтобы автоматически не сортировало по цифровым ключам
          (prev[ch] = prev[ch] || []).push(cur)
          return prev
        }, {})
      )

      result.push(sortCh)
    }
  }

  return result.flat()
}