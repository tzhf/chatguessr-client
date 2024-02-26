<template>
    <li class="m-d relative card bordered hover:scale-[0.99] active:scale-[0.98] cursor-pointer list-none">
        <div class="flex items-center font-bold">
            <span class="w-8">{{ index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : index + 1 + "." }}</span>
            <span class="flex content-center items-center gap-2">
                <span
                    class="w-8 h-8 bg-contain rounded-full border border-primary"
                    :style="{
                        backgroundImage: `url(${player.player.avatar ?? '/avatar-default.jpg'})`,
                    }"
                ></span>
                <span v-if="player.player.flag" :class="'flag-icon flag-icon-' + player.player.flag"></span>
                <span :style="`color:${player.player.color}`" class="max-w-[22ch] overflow-hidden text-ellipsis">{{
                    player.player.username
                }}</span>
            </span>
            <span class="ml-auto">{{ player.totalScore }} [{{ player.guesses.filter(Boolean).length }}]</span>
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
.avatar {
    background-size: contain;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    outline: 1px solid var(--primary);
}
</style>
