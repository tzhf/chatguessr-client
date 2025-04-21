<script setup lang="ts">
defineProps<{
  flag: {
    code: string
    names: string
  }
}>()
</script>

<template>
  <div class="flag" :title="flag.names">
    <span :class="'flag-icon flag-icon-' + flag.code"></span>
    <UiBadge>{{ flag.code }}</UiBadge>
    <span class="truncate flex-1">{{ flag.names }}</span>
  </div>
</template>

<style scoped>
.flag {
  @apply min-w-0 bg-neutral-900 rounded-md border border-neutral-700 flex items-center gap-1 px-1.5 py-1 hover:scale-[0.99] active:scale-[0.98] cursor-pointer;
}
</style>
