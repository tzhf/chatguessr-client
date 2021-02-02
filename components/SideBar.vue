<template>
	<aside>
		<div class="sticky">
			<h1 class="heading__logo">
				<div><span class="highlight">C</span>hat</div>
				<div><span class="highlight">G</span>uessr</div>
			</h1>
			<h5 class="heading__text">Twitch chatbot for <a href="https://www.geoguessr.com">GeoGuessr</a></h5>
			<div class="container">
				<p>Involve your chat to guess along where you are.</p>
			</div>

			<section class="card m-2 text-center">
				<h2 class="download__title">Download</h2>
				<small>version 1.0.6</small>
				<div class="flex mt-2">
					<button class="btn btn-sep bg-primary icon-win">Windows</button>
					<button class="btn btn-sep disabled icon-mac">Mac</button>
					<button class="btn btn-sep disabled icon-linux">Linux</button>
				</div>
			</section>

			<section class="card m-2 text-center">
				<h2>Help us</h2>
				<p>
					ChatGuessr is free, however API and hosting costs are increasing each month.<br />
					Your help is greatly appreciated and encourages us to maintain and improve the application.
				</p>
				<form action="https://www.paypal.com/donate" method="post" target="_top">
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

<style>
aside {
	background-color: #2f2f36;
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
.heading__logo {
	font-weight: 300;
	line-height: 0.7;
	margin-left: -0.8rem;
	font-size: clamp(3.5rem, 15vw, 4.5rem);
	letter-spacing: -9px;
	text-shadow: 0 0 3px #000;
}
.heading__text {
	font-weight: 300;
	line-height: 1.2rem;
}
.download__title {
	margin-bottom: -0.1rem;
}
</style>
