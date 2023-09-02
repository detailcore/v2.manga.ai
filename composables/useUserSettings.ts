import { useDark, useToggle, useWindowSize, useElementSize, useVirtualList } from '@vueuse/core'


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

  const sizeDialog = computed(() => {
    const width = userWidth.value
    if(width <= 400) return '100%'
    if(width <= 550) return '80%'
    if(width <= 630) return '70%'
    if(width <= 768) return '60%'
    if(width <= 992) return '50%'
    if(width <= 1200) return '40%'
    if(width <= 1920) return '30%'
    return '25%'
  })

  return {
    isDark,
    setColorMode,
    userWidth,
    userHeight,

    useElementSize,
    useVirtualList,

    sizeDrawer,
    sizeDialog,
  }
}
