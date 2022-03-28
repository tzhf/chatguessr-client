<script>
	import DownloadButton from "./DownloadButton.svelte";
	import ReleaseNotes from "./ReleaseNotes.svelte";
	import Legacy from "./Legacy.svelte";
</script>

<div id="download">
	<div>Download</div>
	<div id="version">version 1.1.0.alpha.0</div>

	<div id="download-links">
		<DownloadButton icon="uil-windows" os="Windows" link="" />
		<DownloadButton icon="uil-apple" os="macOS" link="" />
		<DownloadButton icon="uil-linux" os="Linux" link="" />
	</div>
	<div id="note">Automatic updates only works on Windows</div>
	<ReleaseNotes />
	<Legacy />
</div>

<style>
	#download {
		margin-top: 0.5rem;
		background-color: #000010;
		padding: 0.5rem;
		border-radius: 0.5rem;
		text-align: center;
		font-size: 1.2rem;
	}
	#version {
		font-size: 0.75rem;
	}
	#download-links {
		padding-top: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	#note {
		margin-top: 0.5rem;
		font-size: 0.75rem;
	}
</style>
