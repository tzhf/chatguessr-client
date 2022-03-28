<script>
	import Sidebar from "../components/Sidebar.svelte";
</script>

<div id="home">
	<Sidebar />
</div>

<style>
	#home {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(280px, 1fr) 4fr;
		background-color: #101020;
	}
</style>
