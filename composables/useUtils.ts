import { ChapterInPost } from "@/services/interfaces"

export const useUtils = () => {
/**
 * Объединить одинаковые тома и главы в массив
 * @param [Array] []
 * @return [Array] []
 */
function mergeDuplicates(arr: ChapterInPost[]) {
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


/**
 * Отображение даты "сегодня" || "вчера" || "30.01.2022"
 */
function showDate(time: string) {
  return showMessageDateTime(time)

  function showMessageDateTime(dateTime: string) {
    let today = new Date(), // присвоение и форматирование текущей даты
        yesterday = new Date(), // присвоение и форматирование текущей даты - 1 день
        latestDate = new Date(dateTime); // присвоение и форматирование даты последнего сообщения

    yesterday.setDate(today.getDate() -1)

    dropHMS(today)
    dropHMS(yesterday)
    dropHMS(latestDate)

    if(dateTime) {
      if (today.getTime() === latestDate.getTime()) {
        return 'Сегодня'
      } else if (yesterday.getTime() === latestDate.getTime()) {
        return 'Вчера'
      } else {
        return new Intl.DateTimeFormat('ru').format(latestDate)
      }
    }
  }

  function dropHMS(t: Date){
    t.setHours(0)
    t.setMinutes(0)
    t.setSeconds(0, 0)
  }
}

function updateTime(time: string) {
  if(time != null) {
    return showDate(time)
    // return this.$moment(time).fromNow()
  }
  return 'Еще не загружена...'
}


  return {
    mergeDuplicates,
    showDate,
    updateTime,
  }
}