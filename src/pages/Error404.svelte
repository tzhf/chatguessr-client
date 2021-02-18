<script>
	export let params;
	let world = "Error 404";
</script>

<h1>¡Hola {world}!</h1>
<h2>{params[0]} not found</h2>

<style>
	h1 {
		color: royalblue;
		text-transform: uppercase;
		font-size: 4em;
	}
	h2 {
		color: royalblue;
		font-size: 2.5em;
	}
</style>
