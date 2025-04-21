// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  build: {
    transpile: ['vue-toastification'], // vue-toastification - old commonjs module
  },

  tailwindcss: {
    config: {
      content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
      ],
    },
  },

  icon: {
    size: '1.25rem',
    customCollections: [
      {
        prefix: 'my-icons',
        dir: './assets/icons',
      },
    ],
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,

    // Keys within public are also exposed client-side
    public: {
      BASE_URL: process.env.BASE_URL,
      SOCKET_URL: process.env.SOCKET_URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
})
