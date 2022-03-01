<template>
	<div>
		<section class="container cards">
			<div class="card">
				<h3 class="text-center">You are a streamer</h3>
				<ol>
					<li>Download & install ChatGuessr</li>
					<li>
						Open the settings ⚙️ or
						<pre>(ctrl+p)</pre>
					</li>
					<li>Go to <strong>Twitch connect</strong></li>
					<li>Fill in your Twitch channel name</li>
					<li>
						Fill in your bot account <small><strong>(optional)</strong></small
						><br />
						<small>
							Using a secondary bot account to handle the whispers is recommended. However, if you don't have one, just fill in your channel name again.
						</small>
					</li>
					<li>
						Get your oAuth token <a href="https://twitchapps.com/tmi" target="_blank">here</a><br />
						<small>Make sure you are authenticated with the account you plan to use as the bot when you generate the token.</small>
					</li>
					<li>Click <strong>Save</strong></li>
					<small
						>...The bot should now be talking in your chat. Your chatguessr link will be generated. (e.g.:
						<a href="https://chatguessr.com/map/yourBot" target="_blank">chatguessr.com/map/&lt;yourBot&gt;</a>)</small
					>
				</ol>
				<div class="card mt-3">
					<h4>Commands :</h4>
					<p><span class="badge bg-primary">!setstreak &lt;user&gt; &lt;number&gt;</span> : Set player streak</p>
				</div>
			</div>

			<div class="card">
				<h3 class="text-center">You are a viewer</h3>
				<p>All you need is a verified Twitch account, no geoguessr account required.</p>

				<div class="container cards">
					<div class="card">
						<p class="text-center"><span class="badge bg-notice">NEW !</span></p>
						<ol>
							<li>Get the map link from the streamer (usually <span class="badge bg-primary">!cg</span>)</li>
							<li>Login with your Twitch account</li>
							<li>Make your guess on the map<br /></li>
							<li>Press guess... That's it !</li>
							<p><small>...Your guess will be displayed on the scoreboard</small></p>
							<div class="card">
								<small
									>For some reasons some accounts are "restricted" and cannot use whispers outside of Twitch.<br />
									In this case just go back to chat and guess the classic way, the command will still be copied to your clipboard.</small
								>
							</div>
						</ol>
					</div>
					<div class="card">
						<p class="text-center"><span class="badge bg-primary">The classic way</span></p>
						<ol>
							<li>Get the map link from the streamer (usually <span class="badge bg-primary">!cg</span>)</li>
							<li>
								Make your guess on the map<br />
								<small>The command is automatically copied to your clipboard</small>
							</li>
							<li>
								Paste
								<pre>(ctrl+v)</pre>
								the whole command in chat without editing <br />
								<small>e.g. /w streamer !g 3.172037, 113.041666</small>
							</li>
							<small>...Your guess will be displayed on the scoreboard</small>
						</ol>
					</div>
				</div>

				<div class="card mt-3">
					<h4>Commands :</h4>
					<p><span class="badge bg-primary">!cg</span> : Get the map link</p>
					<p><span class="badge bg-primary">!me</span> : Get your stats</p>
					<p><span class="badge bg-primary">!best</span> : Get the best stats of the channel</p>
					<p>
						<span class="badge bg-primary">!flag &lt;country&gt; | random | none</span> : Set a flag<br />
						<small>(country name in english or country code. List of available flags <nuxt-link to="/flags">here</nuxt-link>).</small>
					</p>
					<p><span class="badge bg-danger">!clear</span> : Clear your stats</p>
				</div>
			</div>
		</section>

		<section class="container text-center">
			<LiveStreams />
		</section>
	</div>
</template>

<script>
export default {
	layout: "main",
	created() {
		const params = Object.keys(this.$route.query);
		if (params.includes("bot")) {
			this.$router.push(`map/${this.$route.query.bot}`);
		}
	},
};
</script>
