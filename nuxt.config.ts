// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxt/ui', '@vueuse/nuxt'],

  runtimeConfig: {
    // The private keys which are only available server-side
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    TWITCH_OAUTH: process.env.TWITCH_OAUTH,
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

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['@/assets/css/main.css'],

  icon: {
    customCollections: [
      {
        prefix: 'my-icons',
        dir: './assets/icons',
      },
    ],
  },
})
