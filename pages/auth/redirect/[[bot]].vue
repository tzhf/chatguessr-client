<template></template>
<script setup>
const client = useSupabase();
definePageMeta({ layout: false });

const bot = useRoute().params.bot;

onMounted(() => {
    client.auth.onAuthStateChange(() => {
        return navigateTo(`/map/${bot}`)
    });
})
</script>
