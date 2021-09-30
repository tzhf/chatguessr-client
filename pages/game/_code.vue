<template>
	<section class="centered">
		<Logo />
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
				<div class="card mt-3 text-left">
					<p v-for="(location, index) in game.locations">
						Round {{ index + 1 }} :
						<a
							:href="
								`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.lat},${location.lng}&heading=${location.heading}&pitch=${location.pitch}`
							"
							target="_blank"
							>{{ location.lat }}, {{ location.lng }}</a
						>
					</p>
				</div>
				<!-- <code v-highlight="this.resume" class="ruby mt-3" /></code> -->

				<table class="mt-2" width="100%">
					<tr v-for="(player, index) in game.players">
						<td>
							<span>{{ index + 1 }}</span
							>.
						</td>
						<td><span v-if="player.flag" :class="'flag-icon flag-icon-' + player.flag"></span></td>
						<td>{{ player.username }}</td>
						<td>
							<span>{{ player.score }}</span>
						</td>
						<td>
							[<span>{{ player.rounds }}</span
							>]
						</td>
					</tr>
				</table>

				<h4 class="mt-3">Export as :</h4>
				<div class="flex">
					<download-excel
						class="btn bg-primary"
						:header="`Game Summary - ${game.streamer} - ${game.map}`"
						:data="game.players"
						:name="`Game Summary - ${game.streamer} - ${game.map}.xls`"
					>
						XLS
					</download-excel>
					<download-excel class="btn bg-primary" :data="game.players" :name="`Game Summary - ${game.streamer} - ${game.map}.csv`" type="csv" :escapeCsv="false">
						CSV
					</download-excel>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
@import "../flags/flag-icon.min.css";

table {
	text-align: left;
	padding: 10px;
	background: #282828;
	font-family: monospace;
	font-size: 1.2rem;
	color: #ebdbb2;
}
td span {
	color: #d3869b;
}
.flag-icon {
	font-size: inherit;
}

@media only screen and (max-width: 1024px) {
	.centered {
		margin-top: 2.5rem;
	}
}
</style>

<script>
export default {
	layout: "centered",
	head() {
		return {
			title: this.game.code ? `Game summary - ${this.game.streamer} - ${this.game.map}` : "ChatGuessr",
		};
	},
	data() {
		return {
			code: this.$route.params.code,
			game: {},
			error: false,
			loading: false,
		};
	},
	created() {
		if (this.$nuxt.layoutName === "centered") {
			this.getGame();
		}
	},
	methods: {
		async getGame() {
			if (!this.code) return (this.error = "Please provide a game code");

			this.loading = true;
			this.$axios
				.get(`${process.env.API_URL}/game/${this.code}`)
				.then((res) => {
					this.game = res.data;
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
