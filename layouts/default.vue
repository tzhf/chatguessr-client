<template>
	<div class="wrapper">
		<SideBar />
		<main>
			<Nuxt />
		</main>
	</div>
</template>

<style scoped>
.wrapper {
	max-width: 1400px;
	margin: 0 auto;
	padding: 0.5rem;
}

main {
	background: #333333;
}

@media only screen and (min-width: 600px) {
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 4fr;
	}
}
</style>
