<template>
	<div class="wrapper">
		<client-only>
			<Nuxt />
		</client-only>
	</div>
</template>

<style scoped>
.wrapper {
	display: grid;
	place-items: center;
	min-height: 100vh;
}
</style>
