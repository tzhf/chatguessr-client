<script setup lang="ts">
defineProps<{ subtitle?: string | string[] }>()
</script>

<template>
  <header class="flex items-center mt-2">
    <UiSpinner size="50" class="mr-2" />
    <div>
      <NuxtLink to="/">
        <h1 class="flex items-center text-white text-4xl font-light text-shadow tracking-[-3px]">
          <span class="font-bold text-primary">C</span>hat
          <span class="font-bold text-primary">G</span>uessr
        </h1>
      </NuxtLink>
      <NuxtLink class="block ml-1 -mt-2.5 text-white text-shadow" to="https://shorturl.at/jeT1y">
        Supports Map Blackout</NuxtLink
      >
      <p v-if="subtitle" class="ml-1 -mt-1 text-shadow">{{ subtitle }}</p>
    </div>
  </header>
</template>
