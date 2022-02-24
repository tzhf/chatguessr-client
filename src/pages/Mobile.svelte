<script>
	import Map from "../components/Map.svelte";
	import Button from "../components/Button.svelte";

	export let params = {};
	const { streamer, bot } = params;
</script>

<div id="container">
	<div id="stream">
		<iframe
			title="Twitch"
			src="https://player.twitch.tv/?channel={streamer}&parent=localhost&parent=chatguessrevo.herokuapp.com"
			width="100%"
			height="100%"
			frameborder="0"
			scrolling="false"
			allowfullscreen="true"
		/>
	</div>
	<div id="chat">
		<iframe
			title="Twitch"
			src="https://www.twitch.tv/embed/{streamer}/chat?parent=localhost&parent=chatguessrevo.herokuapp.com&darkpopout"
			width="100%"
			height="100%"
			frameborder="0"
			scrolling="false"
		/>
	</div>
</div>

<div id="mapcontainer">
	<Map {bot} />
</div>

<style>
	#container {
		width: 100%;
		height: 98%;
		display: flex;
		flex-direction: column;
	}
	#mapcontainer {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
	}
	#stream {
		width: 100%;
		flex-basis: 40%;
	}
	#chat {
		width: 100%;
		flex-basis: 60%;
	}
</style>
