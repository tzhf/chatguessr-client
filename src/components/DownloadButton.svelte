<script>
	export let icon = "";
	export let os = "";
	export let link = "";
	function download() {
		window.open(link, "_blank");
	}
</script>

<button on:click={download}><i class="uil {icon}" /><span>{os}</span></button>

<style>
	button {
		border: 1px solid #59ffd8;
		font-family: inherit;
		border-radius: 5px;
		position: relative;
		color: aliceblue;
		padding: 10px;
		font-weight: 700;
		cursor: pointer;
		background-color: #000010;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}
	button:hover {
		background-color: #202030;
	}
	button i {
		font-size: 1.5rem;
		background-color: #59ffd8;
		color: #000010;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button span {
		flex: 1;
		padding-left: 30px;
	}
</style>
