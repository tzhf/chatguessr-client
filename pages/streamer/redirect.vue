<template>
  <section class="flex h-screen w-screen items-center justify-center bg-slate-950 p-5 text-center">
    <div v-if="!isChatGuessr" class="flex flex-col items-center gap-4">
      <p>This page can only be used from the ChatGuessr application.</p>
      <UButton block color="red" class="w-28" @click="logOut">Log out</UButton>
    </div>
    <div v-if="isChatGuessr">
      <p>Waiting for response from Twitch...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const client = useSupabase()
definePageMeta({ layout: false })

const isChatGuessr = ref(!!globalThis.chatguessrApi)

onMounted(async () => {
  if (!isChatGuessr.value) {
    return
  }

  client.auth.onAuthStateChange(async (event, session) => {
    if (event !== 'SIGNED_IN') return
    globalThis.chatguessrApi.setSession(session)
  })
})
</script>
