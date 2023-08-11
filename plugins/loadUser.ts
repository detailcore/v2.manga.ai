import { useUserStore } from '~/stores/user'


export default defineNuxtPlugin(async (nuxtApp) => {

  const auth = useUserStore()
  const isAuth = useCookie('auth')

  if(
    !auth.loggedIn
    && isAuth.value == '1'
  ) {
    const error = await auth.fetchUser()

    if(!!error) { // Если ошибка есть, то удаляем куку
      auth.setCookie('auth', '0', {
        maxAge: -1,
      })
    }
  }
})