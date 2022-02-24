<script>
	import { onMount } from "svelte";

	export let bot = null;

	onMount(() => {
		// DO MAP STUFF HERE
		// Don't forget to include libraries on public/index.html
		// including any neccesary CSS
		if (bot) {
		}
	});
</script>

<div id="map" />

<style>
	#map {
		background-color: dodgerblue;
		width: 100%;
		flex-basis: 100%;
	}
</style>
