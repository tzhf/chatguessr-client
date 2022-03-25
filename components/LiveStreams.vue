<template>
	<div>
		<h3>
			Live streams<span v-if="streams.length > 0"> ({{ streams.length }})</span>
		</h3>
		<div class="cards">
			<Loader v-if="loading" />
			<div v-else-if="error" class="notif">🌵 {{ error }} 🌵</div>
			<div v-else-if="streams.length == 0" class="notif">🌵 No stream found 🌵</div>
			<LiveStream v-else v-for="stream in streams" :key="stream.id" :stream="stream" />
		</div>
	</div>
</template>

<script>
import axios from "axios";

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
			axios
				.get(`${process.env.API_URL}/streams`)
				.then((res) => {
					this.streams = res.data;
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
