<script>
	export let params = {};

	let displayMessage = false;

	let streamer = params.streamer || "";
	let bot = "";

	function doRedirect() {
		if (streamer == "" || bot == "") {
			displayMessage = true;
			setTimeout(() => {
				displayMessage = false;
			}, 10000);
		} else {
			if (window.location.toString().includes("localhost")) {
				window.location = `${window.location.origin}/${streamer}/${bot}`;
			} else {
				window.location = `${window.location.origin}/mobile/${streamer}/${bot}`;
			}
		}
	}
</script>

<h2>You need to specify both in the URL Streamer and Bot name</h2>
<h3>Example: /mobile/streamer/botname</h3>

<div id="inputs">
	<div>
		<label for="streamer">Enter streamer name</label>
		<input bind:value={streamer} id="streamer" />
	</div>
	<div>
		<label for="bot">Enter bot name</label>
		<input bind:value={bot} id="bot" />
	</div>
	<button on:click={doRedirect}>GO</button>
	{#if displayMessage}
		<div>
			<p>Please enter both fields. Streamer and Bot.</p>
			<p>If streamer's bot is his own account just repeats his name.</p>
		</div>
	{/if}
</div>

<style>
	h2 {
		color: royalblue;
		font-size: 1.25em;
	}
	h3 {
		margin-top: 12px;
	}
	#inputs {
		margin-top: 20px;
	}
	label {
		display: block;
		margin-top: 8px;
	}
	input {
		margin: 4px auto;
		font-size: 1.5rem;
	}
	button {
		margin: 24px auto;
		padding: 8px;
		font-size: 2rem;
	}
</style>
