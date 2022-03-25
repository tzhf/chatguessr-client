<template>
	<div class="card">
		<div class="m-2">
			<h4>{{ stream.title }}</h4>
			<a :href="`https://www.twitch.tv/${stream.display_name}`" target="_blank">{{ stream.display_name }}</a>
		</div>
		<div class="aspect-ratio" v-aspect-ratio="'16:9'">
			<iframe
				:src="`https://player.twitch.tv/?channel=${stream.display_name}&parent=${clientUrl}&muted=true&autoplay=false`"
				width="100%"
				height="100%"
				allowfullscreen="true"
			></iframe>
		</div>
	</div>
</template>

<style scoped>
h4 {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

iframe {
	border: 0;
	position: absolute;
	top: 0;
	left: 0;
}

.aspect-ratio {
	position: relative;
}
</style>

<script>
import { directive } from "v-aspect-ratio";

export default {
	props: ["stream"],
	data() {
		return {
			clientUrl: "chatguessr.com",
		};
	},
	directives: {
		"aspect-ratio": directive,
	},
};
</script>
