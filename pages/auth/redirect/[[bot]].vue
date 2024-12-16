<template></template>
<script setup>
// seems like we don't need this redirect route anymore
const client = useSupabase()
definePageMeta({ layout: false })

const bot = useRoute().params.bot

onMounted(() => {
  client.auth.onAuthStateChange(() => {
    return navigateTo(`/map/${bot}`)
  })
})
</script>
