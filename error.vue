<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

useHead({
  title: `${props.error?.message || 'Error'} - ChatGuessr`,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="absolute top-0 bottom-0 left-0 right-0 bg-neutral-950">
    <main class="h-full flex flex-col items-center justify-center gap-4">
      <h1 class="text-6xl font-bold">
        <UIcon name="my-icons:cactus" />
        {{ error && error.statusCode }}
        <UIcon name="my-icons:cactus" />
      </h1>
      <span v-if="error && error.message" class="font-bold mb-6">
        {{ error.message }}
      </span>
      <UButton size="lg" @click="handleError">Go back Home</UButton>
    </main>
  </div>
</template>
