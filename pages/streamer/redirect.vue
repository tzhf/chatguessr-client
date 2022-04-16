<template>
	<section class="container cards">
		<div v-if="!isChatGuessr" class="card">
			<p>This page can only be used from the ChatGuessr application.</p>
			<button @click="logOut">Log out</button>
		</div>
		<div v-if="isChatGuessr" class="card">
			<p>Waiting for response from Twitch...</p>
		</div>
	</section>
</template>
<script>
import axios from "axios";
import { supabase } from "~/supabase";

export default {
	data() {
		return {
			isChatGuessr: !!globalThis.chatguessrApi,
		};
	},

	created() {
		if (!this.isChatGuessr) {
			return;
		}

		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event !== "SIGNED_IN") return;

			globalThis.chatguessrApi.setSession(session);
		});
	},
};
</script>
