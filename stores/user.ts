import type { CookieOptions } from "nuxt/app"
import { acceptHMRUpdate, defineStore } from "pinia"

interface Auth {
  email?: string
  password?: string
  remember?: boolean
}

interface User {
  id: number
  id_role: number
  name: string
  email: string
  cover?: string
}

export const useUserStore = defineStore("user", () => {
  const { public: { apiDomain, apiPrefix, urlCoverUser } } = useRuntimeConfig()

  /**
   * State
   */
  const user = ref<User | null>(null)
  const auth = ref<Auth>({} as Auth)
  const isOpenLogin = ref<boolean>(false) // Состояние окна регистрации


  /**
   * Getters
   */
  const loggedIn = computed<boolean>(() => !!user.value)
  const isAdmin = computed<boolean>(() => user.value?.id_role === 1)


  /**
   * Setters
   */
  const setCookie = (name: string, payload: string, options: CookieOptions<any> = {}) => { // присвоить реферера
    const isCookie = useCookie(name, options)
    isCookie.value = payload
  }
  const toggleLogin = (payload: boolean) => { // Переключатель окна регистрации
    isOpenLogin.value = payload
  }


  /**
  ? FIXME: http://v2.manga.ai:3000/auth/callback?email=yuki.animefull@gmail.com&password=4_;MhIyr[xnPFs;m
   */
  const fetchAuth = async (auth: Auth) => { // Авторизация пользователя
    if(loggedIn.value) return

    await useApiFetch(apiDomain + '/sanctum/csrf-cookie')
    await useApiFetch(apiDomain + apiPrefix + '/login', {
      method: 'POST',
      body: auth
    })
    await fetchUser()

    setCookie('auth', '1', {
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  const fetchUser = async () => { // Получить информацию о пользователе
    if(loggedIn.value) return

    const { data: { value }, error: { value: error } } = await useApiFetch(apiDomain + apiPrefix + '/user')

    if(!!error) return error
    user.value = value as User

    if(user.value?.cover) {
      user.value.cover = urlCoverUser + user.value.id +'/'+ user.value.cover
    }
  }

  const fetchLogout = async () => { 
    await useApiFetch(apiDomain + apiPrefix + '/logout', {
      method: 'POST',
    })

    user.value = null
    setCookie('auth', '0', {
      maxAge: -1,
    })
    navigateTo('/')
  }


  return {
    user,
    auth,
    isOpenLogin,

    loggedIn,
    isAdmin,

    setCookie,
    toggleLogin,

    fetchAuth,
    fetchUser,
    fetchLogout,
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
