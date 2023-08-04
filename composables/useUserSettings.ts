import { useWindowSize } from '@vueuse/core'
import { useDark, useToggle } from '@vueuse/core'


export const useUserSettings = () => {
  // настройка цветовой схемы
  const isDark = useDark()
  const setColorMode = useToggle(isDark)

  // Размеры окна
  const { width: userWidth, height: userHeight } = useWindowSize()

  const sizeDrawer = computed(() => {
    const width = userWidth.value
    if(width <= 400) return '100%'
    if(width <= 550) return '80%'
    if(width <= 630) return '70%'
    return '55%'
  })

  return {
    isDark,
    setColorMode,
    userWidth,
    userHeight,

    sizeDrawer,
  }
}
