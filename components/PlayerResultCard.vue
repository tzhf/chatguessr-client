<template>
    <li class="m-d relative card bordered hover:scale-[0.99] active:scale-[0.98] cursor-pointer list-none">
        <div class="flex items-center justify-between font-bold">
            <span class="w-8">{{ index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : index + 1 + "." }}</span>
            <span
                class="w-7 h-7 bg-contain rounded-full border border-primary mr-2"
                :style="{
                    backgroundImage: `url(${player.player.avatar ?? '/avatar-default.jpg'})`,
                }"
            ></span>
            <span v-if="player.player.flag" :class="'mr-2 flag-icon flag-icon-' + player.player.flag"></span>
            <span
                class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis mr-2"
                :style="`color:${player.player.color}`"
                >{{ player.player.username }}</span
            >
            <span>{{ player.totalScore }} [{{ player.guesses.filter(Boolean).length }}]</span>
        </div>
        <input type="checkbox" class="appearance-none w-full h-full absolute left-0 top-0 cursor-pointer" />
        <div class="content text-sm h-auto max-h-0 overflow-hidden">
            <ul class="py-2 pl-2">
                <li v-for="(score, index) in player.scores" class="flex gap-3">
                    <span class="w-2">{{ index + 1 }}.</span>
                    <span v-if="score != null" class="flex w-full">
                        <span>{{ formatDistance(player.distances[index]) }}</span>
                        <span class="ml-auto font-bold">{{ score }}</span>
                    </span>
                </li>
            </ul>
        </div>
    </li>
</template>
<script setup lang="ts">
defineProps<{ player: PlayerResult; index: number }>();

const formatDistance = (distance: number) =>
    distance >= 1 ? distance.toFixed(1) + "km" : Math.floor(distance * 1000) + "m";
</script>
<style scoped>
.m-d input:checked ~ .content {
    max-height: 200px;
}

.content {
    transition: all 300ms ease-in-out 0ms;
}
</style>
