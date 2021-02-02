const { directive } = require("v-aspect-ratio/dist/v-aspect-ratio.ssr.common.js");

export default {
	ssr: false,

	/*
	 ** Nuxt Loader
	 */
	loading: false,

	/*
	 ** Headers of the page
	 */
	head: {
		title: "ChatGuessr",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: "Twitch chatbot for GeoGuessr",
			},
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
	plugins: [],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"@nuxtjs/axios",
		[
			"nuxt-highlightjs",
			{
				style: "gruvbox-dark",
			},
		],
	],

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
