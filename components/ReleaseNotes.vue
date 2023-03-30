<template>
    <div>
        <h3 class="text-2xl font-bold text-center mb-3">Latest releases</h3>
        <UiLoader v-if="pending" />
        <UiNotif v-else-if="error">🌵 Server unreachable 🌵</UiNotif>
        <div v-else class="flex flex-col gap-2">
            <div v-for="release in releases" class="card sm:flex gap-3">
                <div class="text-xl font-bold text-center mb-3">
                    <a :href="release.html_url" target="_blank">{{ release.tag_name }}</a>
                </div>
                <div v-html="parseMarkdown(release.body)"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { parseMarkdown } from '@/utils/parseMarkdown';

const { data: releases, pending, error } = await useFetch('https://api.github.com/repos/tzhf/chatguessr/releases?per_page=3', { lazy: true });
</script>

<style scoped>
.link-truncated {
    display: inline-block;
    max-width: 11ch;
    overflow: hidden;
    vertical-align: middle;
    text-overflow: ellipsis;
}
</style>