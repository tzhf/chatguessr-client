<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ChatGuessr` : 'ChatGuessr'
  },
})

useSeoMeta({
  ogTitle: 'ChatGuessr',
  description: 'A Twitch chatbot for GeoGuessr.',
  ogDescription: 'A Twitch chatbot for GeoGuessr.',
  ogImage: 'https://chatguessr.com/cg-media.png',
  twitterTitle: 'ChatGuessr',
  twitterCard: 'summary_large_image',
})
</script>
