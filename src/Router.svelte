<script>
	import router from "page";

	import Instructions from "./pages/Instructions.svelte";
	import Mobile from "./pages/Mobile.svelte";

	let page;
	let params = {};

	router(
		"/",
		(ctx, next) => {
			params = ctx.params;
			next();
		},
		() => (page = Instructions)
	);

	router(
		"/:streamer",
		(ctx, next) => {
			params = ctx.params;
			next();
		},
		() => (page = Instructions)
	);

	router(
		"/:streamer/:bot",
		(ctx, next) => {
			params = ctx.params;
			next();
		},
		() => (page = Mobile)
	);

	router.start();

	function isObjectEmpty(object) {
		return Object.keys(object).length === 0 && object.constructor === Object;
	}
</script>

{#if isObjectEmpty(params)}
	<svelte:component this={page} />
{:else}
	<svelte:component this={page} {params} />
{/if}
