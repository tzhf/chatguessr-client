<template>
    <img :width="`${width}`" src="~/assets/icons/cg-icon.svg" alt="Chatguessr logo" />
</template>

<script setup lang="ts">
defineProps<{ width: string }>()
</script>

<style scoped>
img {
    animation: spin 10s infinite ease-in-out;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(-360deg);
    }
}
</style>
