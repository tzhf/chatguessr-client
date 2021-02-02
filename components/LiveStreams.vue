<template>
	<div>
		<h3>
			Live streams <span v-if="streams.length > 0">({{ streams.length }})</span>
		</h3>
		<div class="cards">
			<Loader v-if="loading" />
			<div v-else-if="error" class="notif">🌵 {{ error }} 🌵</div>
			<div v-else-if="streams.length == 0" class="notif">🌵 No stream found 🌵</div>
			<LiveStream v-else v-for="stream in streams" :key="stream.id" :stream="stream" />
		</div>
		<!-- <div v-if="streams.length > 4" class="m-4">
			<router-link to="/streams" class="btn bg-primary m-5">View More</router-link>
		</div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			streams: [],
			error: false,
			loading: false,
		};
	},
	created() {
		this.getStreams();
	},
	methods: {
		async getStreams() {
			this.loading = true;
			this.$axios
				.get("https://api.twitch.tv/helix/search/channels?query=chatguessr&live_only=true&first=100", {
					headers: { "client-id": process.env.TWITCH_CLIENT_ID, Authorization: "Bearer " + process.env.TWITCH_OAUTH },
				})
				.then((res) => {
					this.streams = res.data.data;
					this.loading = false;
				})
				.catch(() => {
					this.error = "Server unreachable";
					this.loading = false;
				});
		},
	},
};
</script>
