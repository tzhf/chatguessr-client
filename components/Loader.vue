<template>
	<div class="notif"><img alt="Chatguessr logo" src="../assets/geoicon.png" /> Loading...</div>
</template>

<style scoped>
.notif {
	font-size: 1rem;
}

.notif img {
	width: 50px;
	animation: spin 3000ms infinite ease-in-out;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
