<script setup lang="ts">
defineProps<{ size: string }>()
</script>

<template>
  <Icon name="my-icons:chatguessr" class="spinner_" :size="size" />
</template>
