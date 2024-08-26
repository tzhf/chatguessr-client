<script setup lang="ts">
interface Contributor {
  html_url: string
  login: string
  avatar_url: string
}

const {
  data: contributors,
  status,
  error,
} = await useLazyFetch<Contributor[]>('https://api.github.com/repos/tzhf/chatguessr/contributors')
</script>

<template>
  <section>
    <h3 class="text-lg font-bold mb-2">Contributors</h3>
    <UiLoader v-if="status === 'pending'" />
    <UiNotif v-else-if="error">
      <UIcon name="my-icons:cactus" size="20" /> Server unreachable <UIcon name="my-icons:cactus" size="20" />
    </UiNotif>
    <div v-else class="flex justify-center flex-wrap gap-1">
      <div v-for="contributor in contributors" class="hover:scale-[0.98] active:scale-[0.96]">
        <a :href="contributor.html_url" target="_blank" class="flex flex-col items-center">
          <img :src="contributor.avatar_url" :title="contributor.login" class="w-10 h-10 rounded-full" />
        </a>
      </div>
    </div>
  </section>
</template>
