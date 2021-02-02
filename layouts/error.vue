<template>
	<div class="card text-center">
		<div v-if="error.statusCode === 404">
			<h1>404</h1>
			<p>🌵 Page not found 🌵</p>
		</div>
		<div v-else>
			<h1>{{ error.statusCode }}</h1>
			<p>An error occurred</p>
		</div>
		<NuxtLink to="/">Home page</NuxtLink>
	</div>
</template>

<script>
export default {
	props: ["error"],
	layout: "centered",
};
</script>
