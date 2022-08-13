<template>
	<section class="container">
		<h2 class="text-center">Available flags</h2>
		<p class="mb-3 text-center">Click a flag to copy the command.</p>
		<p class="mb-3 text-center"><span class="badge bg-primary">!flag &lt;country code or country name&gt; | random | none</span></p>
		<div class="grid">
			<Flag :key="country.code" :flag="country" v-for="country in countries" />
		</div>
		<h3 class="mt-5 text-center">US States</h3>
		<div class="grid">
			<Flag :key="state.code" :flag="state" v-for="state in states" />
		</div>
		<h3 class="mt-5 text-center">Non Territorial Flags</h3>
		<div class="grid">
			<Flag :key="flag.code" :flag="flag" v-for="flag in nonTerritorialFlags" />
		</div>
	</section>
</template>

<script>
import Flag from "@/components/Flag.vue";
import { countryCodes, USStatesCodes, NonTerritorialFlags } from "@/assets/flags/flags-icons.js";

export default {
	layout: "main",
	head() {
		return {
			title: `ChatGuessr - Flags`,
		};
	},
	data() {
		return {
			countries: countryCodes,
			states: USStatesCodes,
			nonTerritorialFlags: NonTerritorialFlags,
		};
	},
};
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}
@media screen and (max-width: 800px) {
	.grid {
		grid-template-columns: 1fr;
	}
}
</style>
