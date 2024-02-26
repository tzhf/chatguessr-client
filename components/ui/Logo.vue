<template>
    <div>
        <nuxt-link to="/">
            <h1 class="flex items-center text-white font-light text-4xl text-shadow heading tracking-[-3px]">
                <UiSpinner width="35" class="mr-1" />
                <span class="font-bold color text-primary">C</span>hat
                <span class="font-bold color text-primary">G</span>uessr
            </h1>
        </nuxt-link>
        <p v-if="subtitle" class="ml-14 -mt-3 text-lg text-shadow">{{ subtitle }}</p>
    </div>
</template>
<script setup lang="ts">
defineProps<{ subtitle?: string | string[] }>();
</script>
