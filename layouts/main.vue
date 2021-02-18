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

@media only screen and (min-width: 700px) {
	.wrapper {
		display: grid;
		grid-template-columns: minmax(240px, 1fr) 4fr;
	}
}

main {
	background: #333333;
}
</style>
