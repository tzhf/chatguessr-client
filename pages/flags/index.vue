<template>
	<section class="container">
		<h2 class="text-center">Available flags</h2>
		<p class="mb-3 text-center"><span class="badge bg-primary">!flag &lt;country code or country name&gt; | random | none</span></p>
		<div class="grid">
			<div class="card m-1" v-for="country in countries">
				<span :class="'flag-icon flag-icon-' + country.code"></span>
				<pre>{{ country.code }}</pre>
				{{ country.names }}
			</div>
		</div>
		<h3 class="mt-5 text-center">US States</h3>
		<div class="grid">
			<div class="card m-1" v-for="state in states">
				<span :class="'flag-icon flag-icon-' + state.code"></span>
				<pre>{{ state.code }}</pre>
				{{ state.names }}
			</div>
		</div>
	</section>
</template>

<script>
import { countryCodes, USStatesCodes } from "./flags-icons.js";

export default {
	layout: "main",
	data() {
		return {
			countries: countryCodes,
			states: USStatesCodes,
		};
	},
};
</script>

<style scoped>
@import "./flag-icon.min.css";

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
