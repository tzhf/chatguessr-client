<script setup lang="ts">
defineProps<{ content: string; icon?: string; iconClass?: string }>()
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <Icon v-if="icon" :name="icon" size="2rem" :class="iconClass" />
    <span v-html="content" class="flex items-center gap-1"></span>
  </div>
</template>
