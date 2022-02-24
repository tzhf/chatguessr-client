<script>
	import { createEventDispatcher } from "svelte";
	let dispatcher = new createEventDispatcher();

	export let color = "dodgerblue";
	function toggle() {
		dispatcher("toggle");
	}
</script>

<div on:click={toggle} style="background-color: {color};"><slot /></div>

<style>
	div {
		width: 36px;
		height: 36px;
		position: fixed;
		bottom: 6px;
		left: 6px;
		border-radius: 8px;
		cursor: pointer;
		padding-top: 4px;
	}
</style>
