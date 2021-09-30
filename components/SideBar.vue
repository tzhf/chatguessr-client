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
				<small>version 1.0.7b</small>
				<div class="flex mx-2">
					<button @click="winDownload" class="btn btn-sep bg-primary icon-win">Windows</button>
				</div>
				<h5>1.0.7b Release notes</h5>
				<div class="badge bg-danger mb-2 text-center">
					<h4>Quick Chatguessr fix</h4>
					<p>Chatguessr broke down due to the recent geoguessr update, this new version should fix this.</p>
				</div>
				<p>Uninstalling chatguessr will clear all your stats. To update just install the last version above the old one.</p>
			</section>
			<section class="card m-2 text-center">
				<h2>Help us</h2>
				<p>
					ChatGuessr is free, however API and hosting costs are increasing each month.<br />
					Your help is greatly appreciated and encourages us to maintain and improve the application.
				</p>
				<form action="https://www.paypal.com/donate" method="post" target="_blank">
					<input type="hidden" name="hosted_button_id" value="HLHT6B9ZF8DXC" />
					<button name="submit" class="btn bg-primary mt-2">Donate</button>
				</form>
			</section>

			<section class="card m-2 text-center">
				<h2>Contact</h2>
				<p>
					For any inquiries:<br />
					<a href="mailto:chatguessr@gmail.com">chatguessr@gmail.com</a>
				</p>
			</section>
		</div>
	</aside>
</template>

<script>
export default {
	methods: {
		winDownload() {
			window.open("https://drive.google.com/file/d/1OU3snloPrZv4IfiMs6a4BCsStax4Lw7v/view?usp=sharing", "_blank");
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
</style>
