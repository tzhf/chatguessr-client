<template>
	<aside>
		<div class="sticky">
			<nuxt-link to="/">
				<h1>
					<div><span class="highlight">C</span>hat</div>
					<div><span class="highlight">G</span>uessr</div>
				</h1>
			</nuxt-link>
			<h5 class="heading__text">Twitch chatbot for <a href="https://www.geoguessr.com" target="_blank">GeoGuessr</a></h5>
			<div class="container">
				<p>Involve your chat to guess along where you are.</p>
			</div>

			<section class="card m-2 text-center">
				<h2 class="download__title">Download</h2>
				<small>version 1.0.9</small>
				<div class="flex mx-2">
					<button @click="winDownload" class="btn btn-sep bordered-success icon-win">Windows</button>
				</div>
				<h5>1.0.9 Release notes</h5>
				<div class="card mb-2 text-left">
					<ol>
						<li>Satellite mode</li>
						<li>Few bugfixes</li>
					</ol>
				</div>
			</section>

			<section class="card m-2 text-center">
				<h2>Follow us on Twitter</h2>

				<a id="twitterIcon" href="https://www.twitter.com/chatguessr" target="_blank"
					><svg
						class="svg-inline--fa fa-twitter fa-w-16"
						aria-hidden="true"
						data-prefix="fab"
						data-icon="twitter"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						data-fa-i2svg=""
					>
						<path
							fill="currentColor"
							d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
						></path>
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
				<p>
					ChatGuessr is open-source, feel free to suggest new features or submit your pull requests to our
					<a target="_blank" href="https://github.com/tzhf/chatguessr">Github repository</a>
				</p>
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
			window.open("https://github.com/tzhf/chatguessr/releases/download/v1.0.9/Chatguessr-Setup-1.0.9.exe", "_blank");
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
.highlight {
	font-weight: 700;
	text-align: center;
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
.download__title {
	margin-bottom: -0.1rem;
}

#twitterIcon svg {
	width: 50px;
}

#twitterIcon {
	outline: none;
	padding: 2px 0;
	color: var(--clr-primary);
	opacity: 0.8;
	text-decoration: none;
	background: none;
}
#twitterIcon:hover {
	opacity: 0.9;
}

#twitterIcon:focus {
	opacity: 1;
}
</style>
