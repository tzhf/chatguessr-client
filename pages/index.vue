<template>
	<div>
		<section class="container cards">
			<div class="card streamer__card">
				<div>
					<h3 class="text-center">You are a streamer</h3>
					<div class="card">
						<ol>
							<li>Download &amp; install ChatGuessr</li>
							<li>
								Log in using your Twitch <strong>bot account</strong>.<br>
								<small>Using a bot account is recommended for security and to prevent your main account's
									whispers from filling up</small>
							</li>
							<li>Open the settings by clicking ⚙️</li>
							<li>Go to <strong>Twitch connect</strong></li>
							<li>Fill in your Twitch channel name</li>
							<li>
								Click <strong>Save</strong><br>
								<small>
									...The bot should now be talking in your chat. Your chatguessr link will be generated.
									(e.g.: <a href="https://chatguessr.com/map/yourBot"
										target="_blank">chatguessr.com/map/&lt;yourBot&gt;</a>)
								</small>
							</li>
						</ol>
					</div>
				</div>
				<div class="card mt-5">
					<h4 class="mb-2">Can't login via Facebook or Google ?</h4>
					<small class="text-justify">
						<p>
							ChatGuessr doesn't handle social logins for now, you have to use the native Geoguessr login
							page. If you're used to login via Facebook or
							Google, you probably don't have any password yet.
						</p>
						<p>
							To fix that, click <span class="highlight">"Forgot my password"</span>, then fill in the email
							address linked to your Facebook/Google account.
						</p>
						<p>You will receive a mail to set a proper Geoguessr password.</p>
						<p>Then, you will be able to connect via the native Geoguessr page with your email and your new
							password.</p>
					</small>
				</div>
			</div>

			<div class="card">
				<h3 class="text-center">You are a viewer</h3>
				<p>All you need is a Twitch account, no GeoGuessr account required.</p>

				<div class="card mb-2">
					<div class="card mb-2">
						<ol>
							<li>Get the map link from the streamer (usually <span class="badge bg-primary">!cg</span>)</li>
							<li>Login with your Twitch account</li>
							<li>Make your guess on the map<br /></li>
							<li>Press guess or plonk the space bar</li>
							<p><small>That's it ! Your guess will be displayed on the scoreboard</small></p>
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
								<small>(e.g. /w streamer !g 3.172037, 113.041666)</small>
							</li>
							<small>...Your guess will be displayed on the scoreboard</small>
						</ol>
					</div>
				</div>

				<div class="card">
					<h4>Commands :</h4>
					<p><span class="badge bg-primary">!cg</span> : Get the map link</p>
					<p><span class="badge bg-primary">!me</span> : Get your stats</p>
					<p><span class="badge bg-primary">!best</span> : Get the best stats of the channel</p>
					<p><span class="badge bg-primary">!flags</span> : Get the link of available <nuxt-link
							to="/flags">flags</nuxt-link></p>
					<p><span class="badge bg-primary">!flag &lt;country&gt; | random | none</span> : Set a flag</p>
					<p><span class="badge bg-primary">!randomplonk</span> : Guess random coordinates</p>
					<p><span class="badge bg-danger">!clear</span> : Clear your stats</p>
				</div>
			</div>
		</section>

		<section class="container text-center">
			<LiveStreams />
		</section>
	</div>
</template>

<style>
.streamer__card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>

<script>
export default {
	layout: "main",
	head: {
		title: "ChatGuessr",
		meta: [
			{
				hid: "description",
				name: "description",
				content: "A Twitch Chatbot for GeoGuessr.",
			},
		],
	},
	created() {
		const params = Object.keys(this.$route.query);
		if (params.includes("bot")) {
			this.$router.push(`map/${this.$route.query.bot}`);
		}
	},
};
</script>
