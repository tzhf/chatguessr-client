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
  <main class="h-screen flex flex-col items-center justify-center gap-4">
    <h1 class="text-6xl font-bold">
      <Icon name="my-icons:cactus" size="3rem" />
      {{ error && error.statusCode }}
      <Icon name="my-icons:cactus" size="3rem" />
    </h1>
    <span v-if="error && error.message" class="text-sm text-gray-300 italic">
      {{ error.message }}
    </span>
    <UiButton @click="handleError">Go back Home</UiButton>
  </main>
</template>
