<template>
	<section class="centered">
		<Logo/>
		<Loader v-if="loading" />
		<div v-else class="card m-5 text-center">
			<div v-if="error">
				<h1>Sorry</h1>
				🌵 {{ error }} 🌵
			</div>
			<div v-else>
				<h1>Game summary</h1>
				<h2 class="highlight">{{ game.map }}</h2>
				<a :href="`https://www.twitch.tv/${game.streamer}`" target="_blank">{{ game.streamer }}</a>
				<div class="card mt-3 text-justify">
					<p v-for="(location, index) in game.locations">
						Round {{index + 1 }} : <a :href="`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.lat},${location.lng}&heading=${location.heading}&pitch=${location.pitch}`" target="_blank">{{location.lat}}, {{location.lng}}</a>
					</p>
				</div>
				<code v-highlight="game.resume" class="ruby mt-3" /></code>
			</div>
		</div>
	</section>
</template>

<style scoped>
code {
	padding: 10px;
	font-size: 1.2rem;
	white-space: pre;
}
.logo_wrapper {
	position: absolute;
	top: 10px;
	left: 10px;
	z-index: 99;
}
.logo_wrapper h1 {
	display: inline-block;
	vertical-align: middle;
	font-weight: 300;
	line-height: 0.7;
	margin-left: -0.5rem;
	font-size: 2.5rem;
	letter-spacing: -3px;
	text-shadow: 0 0 3px #000;
	color: #fff;
}
</style>

<script>

export default {
	layout: "centered",
	data() {
		return {
			code: this.$route.params.code,
			game: {},
			error: false,
			loading: false,
		};
	},
	created() {
		this.getGame();
	},

	methods: {
		async getGame() {
			if (!this.code) return (this.error = "Please provide a game code");

			this.loading = true;
			this.$axios
				.get(`${process.env.API_URL}/game/${this.code}`)
				.then((res) => {
					this.game = res.data;
					this.game.locations = JSON.parse(this.game.locations);
					this.loading = false;
				})
				.catch((e) => {
					if (!e.response) {
						this.error = "Server unreachable";
					} else {
						this.error = e.response.data.message;
					}
					this.loading = false;
				});
		},
	},
};
</script>
