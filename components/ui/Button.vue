<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
  to?: string
  target?: string
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :title
    :to
    :target
    class="flex items-center justify-center gap-2 p-2 text-sm font-bold text-white hover:text-white bg-neutral-900 hover:brightness-110 active:brightness-125 border border-neutral-600 transition-all rounded-md shadow-md"
  >
    <Icon v-if="icon" :name="icon" />
    <slot />
  </NuxtLink>

  <button
    v-else
    :title
    class="flex items-center justify-center gap-2 p-2 text-sm font-bold bg-neutral-900 hover:brightness-110 active:brightness-125 border border-neutral-600 transition-all rounded-md shadow-md"
  >
    <Icon v-if="icon" :name="icon" />
    <slot />
  </button>
</template>
