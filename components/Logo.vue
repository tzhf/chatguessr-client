<template>
	<div class="logo__wrapper">
		<nuxt-link to="/"
			><Spinner width="35" />
			<h1><span class="highlight">C</span>hat<span class="highlight">G</span>uessr</h1>
		</nuxt-link>
		<p>{{ subtitle }}</p>
	</div>
</template>

<script>
export default {
	props: ["subtitle"],
};
</script>

<style scoped>
a {
	all: unset;
	cursor: pointer;
}

h1 {
	display: inline-block;
	vertical-align: middle;
	font-weight: 300;
	line-height: 0.7;
	margin-left: -0.3rem;
	font-size: 2.2rem;
	letter-spacing: -3px;
	text-shadow: 0 0 3px #000;
	color: #fff;
}
p {
	font-size: 1.1rem;
	margin-top: -13px;
	margin-left: 50px;
	max-width: 230px;
	text-shadow: 0 0 3px #000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.logo__wrapper {
	position: relative;
	top: 0.5rem;
	left: 0.5rem;
	white-space: nowrap;
}
</style>
