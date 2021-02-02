<template>
	<div>
		<section class="container cards">
			<div class="card">
				<h3 class="text-center">You are a streamer</h3>
				<ol>
					<li>Download & install ChatGuessr</li>
					<li>
						Press
						<pre>ctrl+p</pre>
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
						Get your oAuth token <a href="https://twitchapps.com/tmi/">here</a><br />
						<small>Make sure you are authenticated with the account you plan to use as the bot when you generate the token.</small>
					</li>
					<li>Click <strong>Save</strong></li>
					<small
						>...The bot should now be talking in your chat. Your chatguessr link will be generated. (e.g.:
						<a href="https://chatguessr.com/map/?bot=&lt;yourBot&gt;">chatguessr.com/map/?bot=&lt;yourBot&gt;</a>)</small
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
				<ol>
					<li>Get the map link from the streamer (usually <span class="badge bg-primary">!cg</span>)</li>
					<li>
						Make your guess on the map<br />
						<small>The command is automatically copied to your clipboard</small>
					</li>
					<li>
						Paste
						<pre>(ctrl+v)</pre>
						the whole command in chat <br />
						<small>e.g. /w streamer !g 3.172037, 113.041666</small>
					</li>
					<small>...Your guess will be displayed on the scoreboard</small>
				</ol>
				<div class="card mt-3">
					<h4>Commands :</h4>
					<p><span class="badge bg-primary">!me</span> : Get your stats</p>
					<p><span class="badge bg-primary">!best</span> : Get the best stats of the channel</p>
					<p>
						<span class="badge bg-primary">!flag &lt;country&gt; | random | none</span> : Set a flag<br />
						<small>(country name in english or country code).</small>
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
pre {
	background: #000;
	display: inline-block;
}

ol {
	padding-left: 2rem;
}
ol li {
	padding: 0.2rem;
}

.badge {
	color: #2a2f30;
	font-weight: 700;
	padding: 0.1rem 0.3rem;
	border-radius: 0.2rem;
}

.flex {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
	grid-gap: 0.5rem;
}

@media only screen and (min-width: 600px) {
	.cards {
		grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
	}
}
</style>
