import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useUserStore();

  if (auth.loggedIn) {
    return navigateTo("/", { replace: true })
  }
})