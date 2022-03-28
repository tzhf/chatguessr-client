<script>
	import DownloadButton from "./DownloadButton.svelte";
</script>

<div id="legacy">
	<div>version 1.0.9</div>
	<DownloadButton icon="uil-windows" os="Windows" link="" />
</div>

<style>
	#legacy {
		border-top: 1px solid #59ffd8;
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		font-size: 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
</style>
