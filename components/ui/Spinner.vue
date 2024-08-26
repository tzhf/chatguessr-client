<script setup lang="ts">
defineProps<{ width: string }>()
</script>

<template>
  <UIcon name="my-icons:chatguessr" class="spinner" :size="width" />
</template>
