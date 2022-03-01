<template>
	<section class="centered">
		<div class="logo_wrapper">
			<Logo />
		</div>
		<Loader v-if="loading" />
		<div v-else class="card m-5 text-center">
			<div v-if="error">
				<h1>Sorry</h1>
				🌵 {{ error }} 🌵
			</div>
			<div v-else>
				<h1>Game summary</h1>
				<p>
					<a :href="`https://www.twitch.tv/${game.streamer}`" target="_blank">{{ game.streamer }}</a>
				</p>

				<div class="card mt-3">
					<h2 class="highlight">{{ game.map }}</h2>
					<p>
						<small>{{ gameMode }}</small>
					</p>
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
				</div>

				<h4 class="mt-3">Export as :</h4>
				<div class="flex">
					<download-excel
						class="btn bordered-success"
						:header="`Game Summary - ${game.streamer} - ${game.map} - ${gameMode}`"
						:data="game.players"
						:name="`Game Summary - ${game.streamer} - ${game.map} - ${gameMode}.xls`"
					>
						XLS
					</download-excel>
					<download-excel
						class="btn bordered-success"
						:data="game.players"
						:name="`Game Summary - ${game.streamer} - ${game.map} - ${gameMode}.csv`"
						type="csv"
						:escapeCsv="false"
					>
						CSV
					</download-excel>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
@import "@/assets/flags/flag-icon.min.css";

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
const axios = require("axios");

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
			gameMode: "",
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
			axios
				.get(`${process.env.API_URL}/game/${this.code}`)
				.then((res) => {
					this.game = res.data;

					if (this.game.mode) {
						const arr = [];
						if (this.game.mode.noMove) arr.push("No move");
						if (this.game.mode.noPan) arr.push("No pan");
						if (this.game.mode.noZoom) arr.push("No zoom");
						this.gameMode = arr.join(", ");
					}

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
