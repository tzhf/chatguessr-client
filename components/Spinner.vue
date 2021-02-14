<template>
	<img alt="Chatguessr logo" :style="cssVars" src="../assets/geoicon.png" />
</template>

<script>
export default {
	props: ["width"],
	computed: {
		cssVars() {
			return {
				"--width": this.width + "px",
			};
		},
	},
};
</script>

<style scoped>
img {
	width: var(--width);
	animation: spin 10s infinite ease-in-out;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(360deg);
	}
	100% {
		transform: rotate(-360deg);
	}
}
</style>
