// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  telemetry: false,
  app: {
    // head
    head: {
      // title: '',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
      // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  // css
  css: [
    '~/assets/scss/index.scss', // переопределение и подключение тёмной темы
  ],

  typescript: {
    strict: true,
    shim: false,
  },

  // build modules
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@element-plus/nuxt',
  ],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  unocss: {
    uno: true,
    attributify: true,
    icons: {
      scale: 1.2,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  pwa: {
    /* your pwa options */
  },

  // .env config
  runtimeConfig: {
    sercet: 'Эта переменная доступна только на стороне сервера',
    public: {
      urlManga: '/manga/',
      urlCoverUser: process.env.FILES_DOMAIN + 'users/',
      urlCoverTeam: process.env.FILES_DOMAIN + 'teams/',
      urlCoverTitle: process.env.FILES_DOMAIN + 'titles/',
      urlMangaReader: process.env.IMG_DOMAIN + '/',
      jsDomain: process.env.JS_DOMAIN,
      apiDomain: process.env.API_DOMAIN,
      apiPrefix: process.env.API_PREFIX,
      noImage: process.env.FILES_DOMAIN + 'no-image.png.webp',
    }
  },
})
