<template>
    <section>
        <h3 class="text-2xl font-bold text-center mb-3">
            LIVE STREAMS<span v-if="streams?.length"> ({{ streams.length }})</span>
        </h3>
        <UiLoader v-if="pending" />
        <UiNotif v-else-if="error">🌵 Server unreachable 🌵</UiNotif>
        <UiNotif v-else-if="!streams?.length">🌵 No stream found 🌵</UiNotif>
        <div v-else
            class="grid grid-cols-[repeat(auto-fit,_minmax(100%,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-2">
            <Stream v-for="stream in streams" :stream=stream />
        </div>
    </section>
</template>
<script setup lang="ts">
const { data: streams, pending, error } = await useFetch<Streams>('/api/streams', { lazy: true });
</script>