const { directive } = require("v-aspect-ratio/dist/v-aspect-ratio.ssr.common.js");

export default {
	// ssr: true,
	loading: false,

	/*
	 ** Headers of the page
	 */
	head: {
		title: "ChatGuessr",
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: "A Twitch chatbot for Geoguessr",
			},

			// Facebook Meta Tags
			{ hid: "og:type", property: "og:type", content: "website" },
			{
				hid: "og:url",
				property: "og:url",
				content: "https://chatguessr.com",
			},
			{
				hid: "og:title",
				property: "og:title",
				content: "ChatGuessr",
			},
			{
				hid: "og:description",
				property: "og:description",
				content: "A Twitch chatbot for Geoguessr",
			},
			{
				hid: "og:image",
				property: "og:image",
				content: "https://chatguessr.com/cg-media.png",
			},
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "627" },

			// Twitter Meta Tags
			{
				hid: "twitter:card",
				property: "twitter:card",
				content: "summary_large_image",
			},
			{
				hid: "twitter:domain",
				property: "twitter:domain",
				content: "chatguessr.com",
			},
			{
				hid: "twitter:url",
				property: "twitter:url",
				content: "https://chatguessr.com",
			},
			{
				hid: "twitter:title",
				property: "twitter:title",
				content: "ChatGuessr",
			},
			{
				hid: "twitter:description",
				property: "twitter:description",
				content: "A Twitch chatbot for Geoguessr",
			},
			{
				hid: "twitter:image",
				property: "twitter:image",
				content: "https://chatguessr.com/cg-media.png",
			},
		],
	},

	/*
	 ** Global CSS
	 */
	css: ["./assets/css/main.css"],

	/*
	 ** Autoload components
	 */
	components: true,

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: ["~/plugins/downloadExcel.js"],

	/*
	 ** Nuxt.js modules
	 */
	modules: ["@nuxtjs/axios"],

	env: {
		BASE_URL: process.env.BASE_URL,
		API_URL: process.env.API_URL,
		TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
		TWITCH_OAUTH: process.env.TWITCH_OAUTH,
	},

	render: {
		bundleRenderer: {
			directives: {
				"aspect-ratio": directive,
			},
		},
	},

	/*
	 ** Build configuration
	 */
	build: {
		splitChunks: {
			layouts: true,
		},
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {},
	},
};
