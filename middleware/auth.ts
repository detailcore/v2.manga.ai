import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useUserStore()

  if (!auth.loggedIn) { // Если пользователь Гость
    if(to.params.alias) { // то редирект на Alias
      return navigateTo('/manga/'+ to.params.alias, { replace: true})
    }
    
    // то редирект на Главную страницу
    return navigateTo('/', { replace: true})
  }
})