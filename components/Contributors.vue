<template>
    <div>
        <h3 class="text-2xl font-bold text-center mb-3">Contributors</h3>
        <UiLoader v-if="pending" />
        <UiNotif v-else-if="error">🌵 Server unreachable 🌵</UiNotif>
        <div v-else class="flex justify-center flex-wrap gap-[5px]">
            <div v-for="contributor in contributors" class="hover:scale-[0.98] active:scale-[0.96]">
                <a :href="contributor.html_url" target="_blank" class="flex flex-col items-center">
                    <img :src="contributor.avatar_url" :alt="contributor.login" class="rounded-full w-12 mb-2" />
                    <!-- <span>{{ contributor.login }}</span> -->
                </a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const {
    data: contributors,
    pending,
    error,
} = await useFetch<Contributors>("https://api.github.com/repos/tzhf/chatguessr/contributors", { lazy: true });
</script>
