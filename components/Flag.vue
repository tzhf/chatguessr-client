<template>
	<div role="button" @click="copy" class="card m-1" v-tippy="{ trigger: 'click' }" content="Copied!">
		<span :class="'flag-icon flag-icon-' + flag.code"></span>
		<pre>{{ flag.code }}</pre> {{ flag.names }}
	</div>
</template>
<style scoped>
@import "@/assets/flags/flag-icon.min.css";

div {
	cursor: pointer;
}
</style>
<script>
import copyToClipboard from "copy-to-clipboard";
export default {
	props: ["flag"],
	methods: {
		copy() {
			copyToClipboard(`!flag ${this.flag.code}`);
		}
	},
}
</script>
