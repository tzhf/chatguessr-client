<script setup lang="ts">
defineProps<{ subtitle?: string | string[] }>()
</script>

<template>
  <header>
    <NuxtLink to="/">
      <h1 class="flex items-center text-white text-4xl font-light text-shadow tracking-[-3px]">
        <UiSpinner size="30" class="mr-1" />
        <span class="font-bold text-primary">C</span>hat
        <span class="font-bold text-primary">G</span>uessr
      </h1>
    </NuxtLink>
    <p v-if="subtitle" class="ml-14 -mt-2.5 text-shadow">{{ subtitle }}</p>
  </header>
</template>
