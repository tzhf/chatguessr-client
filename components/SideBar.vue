<template>
	<aside>
		<div class="sticky">
			<nuxt-link to="/">
				<h1>
					<div><span class="highlight">C</span>hat</div>
					<div><span class="highlight">G</span>uessr</div>
				</h1>
			</nuxt-link>
			<h5 class="heading__text">The original <a href="https://www.geoguessr.com" target="_blank">GeoGuessr</a> Twitch Chatbot</h5>
			<div class="container">
				<p>Play GeoGuessr on Stream with Twitch Chat.</p>
			</div>

			<section class="card m-2 text-center">
				<h2>Download</h2>
				<h5>version 1.1.0.alpha.0</h5>
				<div class="flex mx-2">
					<button @click="winDownload" class="btn btn-sep bordered-success icon-win">Windows</button>
					<button @click="macOSDownload" class="btn btn-sep bordered-success icon-mac">macOS</button>
					<button @click="linuxDownload" class="btn btn-sep bordered-success icon-linux">Linux <small>(.deb)</small></button>
				</div>
				<small>Note: automatic updates only work for Windows</small>
				<h5 class="mt-3">Release notes</h5>
				<div class="card mb-2">
					<ol class="text-left">
						<li>Guess directly on the map</li>
						<li>Satellite mode</li>
						<li>Different map types for the streamer</li>
						<li>Improved reliability and security</li>
						<li>Mac/Linux releases</li>
					</ol>
				</div>
				<hr />
				<h5>version 1.0.9</h5>
				<div class="flex mx-2">
					<button @click="winDownloadOld" class="btn btn-sep bordered-success icon-win">Windows</button>
				</div>
			</section>

			<section class="card m-2 text-center">
				<h2>Follow us on Twitter</h2>

				<a id="twitterIcon" href="https://www.twitter.com/chatguessr" target="_blank">
					<svg data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50px" height="50px">
						<path
							fill="currentColor"
							d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
						/>
					</svg>
				</a>
			</section>

			<section class="card m-2 text-center">
				<h2>Contact</h2>
				<p>
					For any inquiries:<br />
					<a href="mailto:chatguessr@gmail.com">chatguessr@gmail.com</a>
				</p>
			</section>

			<section class="card m-2 text-center">
				<h2>Developer ?</h2>
				<p>ChatGuessr is open-source, feel free to suggest new features or submit your pull requests to our Github repository.</p>
				<a id="githubIcon" href="https://github.com/tzhf/chatguessr" target="_blank">
					<svg data-icon="github" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
						<path
							d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"
						/>
					</svg>
				</a>
			</section>

			<section class="card m-2 text-center">
				<h2>Help us</h2>
				<p>ChatGuessr is free, any help is greatly appreciated and encourages us to maintain and improve the application.</p>
				<form action="https://www.paypal.com/donate" method="post" target="_blank">
					<input type="hidden" name="hosted_button_id" value="HLHT6B9ZF8DXC" />
					<button name="submit" class="btn bordered-success mt-2">Donate</button>
				</form>
			</section>
		</div>
	</aside>
</template>

<script>
export default {
	methods: {
		winDownload() {
			window.open("https://github.com/tzhf/chatguessr/releases/download/v1.1.0-alpha.0/ChatGuessr-1.1.0-alpha.0.Setup.exe", "_blank");
		},
		winDownloadOld() {
			window.open("https://github.com/tzhf/chatguessr/releases/download/v1.0.9/Chatguessr-Setup-1.0.9.exe", "_blank");
		},
		macOSDownload() {
			window.open("https://github.com/tzhf/chatguessr/releases/download/v1.1.0-alpha.0/ChatGuessr-darwin-x64-1.1.0-alpha.0.zip", "_blank");
		},
		linuxDownload() {
			window.open("https://github.com/tzhf/chatguessr/releases/download/v1.1.0-alpha.0/chatguessr_1.1.0.alpha.0_amd64.deb", "_blank");
		},
	},
};
</script>

<style scoped>
aside {
	background-color: #2f2f36;
}
h1 {
	font-weight: 300;
	line-height: 0.7;
	margin-left: -0.8rem;
	font-size: clamp(3.5rem, 15vw, 4rem);
	letter-spacing: -9px;
	text-shadow: 0 0 3px #000;
	color: #fff;
}
h4 {
	font-weight: 300;
}
.badge {
	font-weight: 300;
}
.sticky {
	top: 0;
	position: sticky;
	position: -webkit-sticky;
	padding: 0.2rem 0;
	border-top: 0.3rem solid;
	border-image-source: linear-gradient(to right, #a159ff, #9966ff, #9272fe, #8d7cfb, #8a85f8, #6597ff, #3ea7ff, #18b4ff, #00caff, #00defc, #00f0ec, #59ffd8);
	border-image-slice: 1;
}

.heading__text {
	font-weight: 300;
	line-height: 1.2rem;
}

#twitterIcon,
#githubIcon {
	color: var(--clr-primary);
	outline: none;
	padding: 2px 0;
	opacity: 0.7;
	text-decoration: none;
	background: none;
}
#twitterIcon:hover,
#githubIcon:hover {
	opacity: 0.9;
}

#twitterIcon:focus,
#githubIcon:focus {
	opacity: 1;
}
</style>
