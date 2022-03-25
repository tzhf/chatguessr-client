<template></template>
<script>
import { supabase } from "~/supabase";

export default {
	created() {
		supabase.auth.onAuthStateChange((event, session) => {
			const cookie = sessionStorage.getItem("currentBot") || "";
			window.location.href = `/map/${cookie}`;
		});
	},
};
</script>
