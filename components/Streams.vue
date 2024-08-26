<script setup lang="ts">
const { data: streams, status, error } = await useLazyFetch('/api/streams')
</script>

<template>
  <section>
    <h3 class="text-xl font-bold text-center mb-2">
      Live streams<span v-if="streams?.length"> ({{ streams.length }})</span>
    </h3>
    <UiLoader v-if="status === 'pending'" />
    <UiNotif v-else-if="error">
      <UIcon name="my-icons:cactus" size="20" /> Server unreachable <UIcon name="my-icons:cactus" size="20" />
    </UiNotif>
    <UiNotif v-else-if="!streams?.length">🌵 No stream found 🌵</UiNotif>
    <div
      v-else
      class="grid grid-cols-[repeat(auto-fit,_minmax(100%,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-2"
    >
      <Stream v-for="stream in streams" :stream="stream" />
    </div>
  </section>
</template>
