// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    modules: ["@nuxtjs/tailwindcss"],
    tailwindcss: {},
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            meta: [
                { name: "description", content: "The original GeoGuessr Twitch Chatbot." },
                { hid: "og-type", property: "og:type", content: "website" },
                { hid: "og-title", property: "og:title", content: "ChatGuessr" },
                { hid: "og-desc", property: "og:description", content: "The original GeoGuessr Twitch Chatbot." },
                { hid: "og-image", property: "og:image", content: "https://chatguessr.com/cg-media.png" },
                { hid: "og-url", property: "og:url", content: "https://chatguessr.com" },
                { hid: "t-type", name: "twitter:card", content: "summary_large_image" },
            ],
        },
    },
});
