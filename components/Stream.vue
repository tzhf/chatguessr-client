<template>
    <div class="card w-full">
        <div class="text-center mb-2">
            <p class="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{ stream.title }}</p>
            <a class="underline" :href="`https://www.twitch.tv/${stream.broadcaster_login}`" target="_blank">{{
                stream.display_name }}</a>
        </div>
        <div class="aspect-video">
            <iframe
                :src="`https://player.twitch.tv/?channel=${stream.broadcaster_login}&parent=chatguessr.com&muted=true&autoplay=false`"
                width="100%" height="100%" allowfullscreen="true"></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

defineProps<{ stream: Stream }>()
</script>