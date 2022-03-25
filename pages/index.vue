<template>
	<div>
		<section class="container cards">
			<div class="card streamer__card">
				<div>
					<h3 class="text-center">You are a streamer</h3>
					<div class="card">
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
									If you don't plan to use a bot account, just fill in your channel name again. However, this is recommended to avoid your main account
									being spammed of whispers.
								</small>
							</li>
							<li>
								Get your oAuth token <a href="https://twitchapps.com/tmi" target="_blank">here</a><br />
								<small>If you're using a bot account, make sure to use this account when you generate the token.</small>
							</li>
							<li>Click <strong>Save</strong></li>
							<small
								>...The bot should now be talking in your chat. Your chatguessr link will be generated. (e.g.:
								<a href="https://chatguessr.com/map/yourBot" target="_blank">chatguessr.com/map/&lt;yourBot&gt;</a>)</small
							>
						</ol>
					</div>
				</div>
				<div class="card mt-5">
					<h4 class="mb-2">Can't login via Facebook or Google ?</h4>
					<small class="text-justify">
						<p>
							ChatGuessr doesn't handle social logins for now, you have to use the native Geoguessr login page. If you're used to login via Facebook or
							Google, you probably don't have any password yet.
						</p>
						<p>
							To fix that, click <span class="highlight">"Forgot my password"</span>, then fill in the email address linked to your Facebook/Google account.
						</p>
						<p>You will receive a mail to set a proper Geoguessr password.</p>
						<p>Then, you will be able to connect via the native Geoguessr page with your email and your new password.</p>
					</small>
				</div>
			</div>

			<div class="card">
				<h3 class="text-center">You are a viewer</h3>
				<p>All you need is a verified Twitch account, no geoguessr account required.</p>

				<div class="card mb-2">
					<div class="card mb-2">
						<p class="text-center"><span class="badge bg-notice">NEW !</span></p>
						<div class="badge bg-primary mb-2">
							<small
								>Once you're logged in we are no longer using Twitch whispers to handle the guesses. This feature should now be working for
								everyone.</small
							>
						</div>
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
