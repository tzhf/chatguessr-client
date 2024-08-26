<script setup lang="ts">
defineProps<{ stream: Stream }>()
</script>

<template>
  <div class="bg-black">
    <div class="aspect-video">
      <iframe
        :src="`https://player.twitch.tv/?channel=${stream.userName}&parent=chatguessr.com&muted=true&autoplay=false`"
        width="100%"
        height="100%"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="flex items-center gap-2 px-2 py-4">
      <img :src="stream.profilePictureUrl" :alt="stream.title" class="rounded-full w-8 h-8" />
      <div class="flex flex-col truncate">
        <span class="text-md font-bold truncate">{{ stream.title }}</span>
        <a :href="`https://www.twitch.tv/${stream.userName}`" target="_blank" class="text-sm/4">{{ stream.userDisplayName }}</a>
      </div>
    </div>
  </div>
</template>
