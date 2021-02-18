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
				<code v-highlight="this.resume" class="ruby mt-3" /></code>
				<h4 class="mt-3">Export as :</h4>
				<div class="flex">
					<download-excel class="btn bg-primary" :data="game.players" name="Game summary.xls">
						XLS
					</download-excel>
					<download-excel class="btn bg-primary" :data="game.players" type="csv" :escapeCsv="false" name="Game summary.csv">
						CSV
					</download-excel>
				</div>
			</div>
			
		</div>
	</section>
</template>

<style scoped>
@media only screen and (max-width: 1024px) {
	.centered {
		margin-top: 2.5rem;
	}
}

code {
	padding: 10px;
	font-size: 1.2rem;
	white-space: pre;
}
.flex {
	display: flex;
	justify-content: center;
	flex-direction: row;
}

</style>

<script>
export default {
	layout: "centered",
	head() {
		return {
			title: this.game.code ? `Game summary - ${this.game.streamer} - ${this.game.map}` : 'ChatGuessr'
		}
	},
	data() {
		return {
			code: this.$route.params.code,
			game: {},
			resume: String,
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
					let str = "";
					this.game.players.forEach((player, index) => {
						str += `${(index + 1 + ".").padEnd(5, " ")}${player.username.padEnd(40, " ")}${player.score.toString().padStart(5, " ")} [${player.guessedRounds}]\n`;
					});
					this.resume = str;
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
