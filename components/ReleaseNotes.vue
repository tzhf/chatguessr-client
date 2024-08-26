<script setup>
import { parseMarkdown } from '@/utils/parseMarkdown'
const { data: releases, status, error } = await useLazyFetch('https://api.github.com/repos/tzhf/chatguessr/releases?per_page=3')
</script>

<template>
  <section>
    <h2 class="text-xl font-bold text-center mb-2">Latest releases</h2>
    <UiLoader v-if="status === 'pending'" />
    <UiNotif v-else-if="error">
      <UIcon name="my-icons:cactus" size="20" /> Server unreachable <UIcon name="my-icons:cactus" size="20" />
    </UiNotif>
    <div v-else class="flex flex-col gap-5 text-sm">
      <div v-for="release in releases" class="border-l border-neutral-700 px-2 sm:flex gap-2">
        <a :href="release.html_url" target="_blank">{{ release.tag_name }}</a>
        <div v-html="parseMarkdown(release.body)"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.link-truncated {
  display: inline-block;
  max-width: 11ch;
  overflow: hidden;
  vertical-align: middle;
  text-overflow: ellipsis;
}
</style>
