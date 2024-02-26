<template>
    <div class="py-3 flex gap-1 justify-center">
        Export as
        <download-excel
            :data="players"
            :name="`Game Summary - ${game.streamer} - ${game.map}.xls`"
            :header="`Game Summary - ${game.streamer} - ${game.map}`"
            ><a href="#" title="Export as XLS">XLS</a> </download-excel
        >|
        <download-excel
            :data="players"
            :name="`Game Summary - ${game.streamer} - ${game.map}.csv`"
            type="csv"
            :escapeCsv="false"
            ><a href="#" title="Export as CSV">CSV</a>
        </download-excel>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{ game: Game }>();
const players = props.game.players.map((player) => {
    return {
        username: player.player.username,
        flag: player.player.flag,
        streak: player.player.streak,
        totalScore: player.totalScore,
        totalDistance: player.totalDistance,
        rounds: player.guesses.filter(Boolean).length,
    };
});
</script>
