/**
 * Утилиты для преобразования отображаеммых данных
 */
export function useDisplayUtils() {

  const number2Human = (num: number) => {
    if (num < 1000) {
      return num
    }
  
    if (num < 1000000) {
      num = num / 1000
      return num.toFixed(1) + 'k'
    }
  
    if (num >= 1000000 && num < 1000000000) {
      num = num / 1000000
      return num.toFixed(1) + 'M'
    }
  
    if (num >= 1000000000 && num < 1000000000000) {
      num = num / 1000000000
      return num.toFixed(1) + 'B'
    }
  }

/**
 * Получить среднее арифметическое значение массива чисел
 * @param nums Массив чисел
 * @returns Float
 */
  const avgValue = (nums: number[]) => {
    let avg = 0, cnt = 0
    for (let idx = 0; idx < nums.length; idx++) {
      const item = nums[idx]

      cnt += item
      avg += (idx + 1) * item
    }

    return (avg / cnt).toFixed(4)
  }

  return {
    number2Human,
    avgValue,
  }
}
