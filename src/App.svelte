<script>
	import Router from "./Router.svelte";
</script>

<div id="main">
	<Router />
</div>

<style>
	#main {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		max-width: min(1400px, 96vw);
		margin: 0 auto;
		padding-top: 0.25rem;
	}
</style>
