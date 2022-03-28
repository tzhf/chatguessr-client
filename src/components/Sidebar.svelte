<script>
	import Logo from "./Logo.svelte";
	import Download from "./Download.svelte";
	import Twitter from "./Twitter.svelte";
</script>

<sidebar>
	<Logo />
	<Download />
	<Twitter />
</sidebar>

<style>
	sidebar {
		min-height: 100%;
		border-top: 0.3rem solid;
		border-image-source: linear-gradient(90deg, #a159ff, #96f, #9272fe, #8d7cfb, #8a85f8, #6597ff, #3ea7ff, #18b4ff, #00caff, #00defc, #00f0ec, #59ffd8);
		border-image-slice: 1;
		padding: 0.5rem 0.25rem;
	}
</style>
