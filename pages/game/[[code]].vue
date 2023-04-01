<template>
    <main class="absolute top-0 bottom-0 w-full border-top mt-2">
        <div v-if="pending || error" class="flex flex-col h-full">
            <Header />
            <div class="flex-auto flex items-center">
                <UiLoader v-if="pending" />
                <UiNotif v-else-if="error">🌵 No game found 🌵</UiNotif>
            </div>
            <Footer />
        </div>

        <!-- Temporary handle old game summary format -->
        <div v-else-if="game && code.length == 10" class="flex flex-col h-full">
            <Header class="mb-10" />
            <div class="flex-auto flex items-center justify-center">
                <div class="rounded-lg bordered px-5">
                    <div class="flex-1 text-center">
                        <h2 class="py-3 text-bold text-3xl">Game Summary</h2>
                        <h2 class="text-bold text-2xl">{{ game.map }} ({{ game.players.length }})</h2>
                        <a :href="`https://www.twitch.tv/${game.streamer}`" target="_blank">{{ game.streamer }}</a>
                        <div class="flex gap-1 justify-center mt-2">
                            <span v-if="game.mode.noMove" class="badge bg-primary">No Move</span>
                            <span v-if="game.mode.noPan" class="badge bg-primary">No Pan</span>
                            <span v-if="game.mode.noZoom" class="badge bg-primary">No Zoom</span>
                        </div>
                    </div>
                    <div class="rounded-lg bordered p-5 m-5">
                        <div v-for="(location, index) in game.locations">
                            Round {{ index + 1 }} :
                            <a :href="`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.lat},${location.lng}&heading=${location.heading}&pitch=${location.pitch}`"
                                target="_blank">{{ location.lat }}, {{ location.lng }}</a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-[3px]">
                        <div v-for="player, index in game.players" :key="index"
                            class="card flex gap-2 whitespace-nowrap hover:scale-[0.99]">
                            <span class="font-bold mr-4">{{ index + 1 }}.</span>
                            <span class="inline-flex ">
                                <span v-if="player.flag" :class="'flag-icon flag-icon-' + player.flag"></span>
                                <span class="max-w-[17ch] overflow-hidden text-ellipsis">{{ player.username }}</span>
                            </span>
                            <span class="font-bold ml-auto">{{ player.score }} [{{ player.rounds }}]</span>
                        </div>
                    </div>
                    <ExportAsXLS :game="game" />
                </div>
            </div>
            <Footer />
        </div>

        <div v-else-if="game" class="h-full flex flex-col md:flex-row">
            <div class="md:min-w-[350px] flex flex-col px-1">
                <Header class="mb-5" />
                <div class="text-center my-3 px-2 whitespace-nowrap">
                    <h2 class="text-xl font-bold">GAME SUMMARY ({{ game.players.length }})</h2>
                    <h3 class="text-xl overflow-hidden text-ellipsis">{{ game.map }}</h3>
                    <a :href="`https://www.twitch.tv/${game.streamer}`" target="_blank">{{ game.streamer }}</a>
                    <div class="flex justify-center gap-1 mt-1 text-sm">
                        <span v-if="game.mode.noMove" class="badge bg-primary">No Move</span>
                        <span v-if="game.mode.noPan" class="badge bg-primary">No Pan</span>
                        <span v-if="game.mode.noZoom" class="badge bg-primary">No Zoom</span>
                    </div>
                </div>

                <div class="md:overflow-x-hidden moz-scroller px-2">
                    <ul class="flex flex-col gap-[3px]">
                        <PlayerResultCard v-for="player, index in game.players" :player="player" :index="index"
                            @click="drawPlayerGuesses(player)" />
                    </ul>
                </div>
                <ExportAsXLS :game="game" />
            </div>
            <Map :locations="game.locations" @vue:updated="drawPlayerGuesses(game?.players[0])" ref="map" />
        </div>
    </main>
</template>

<script setup lang="ts">
const client = useSupabase();
const code = useRoute().params.code;

definePageMeta({ layout: false });

const map = ref();
const game: Ref<Game | null> = ref(null);
const pending = ref(true);
const error = ref();

// Fetch old api if code has 10 chars
if (code.length == 10) {
    const { data, error: _error } = await useFetch(`https://chatguessr-api.vercel.app/game/${code}`, { lazy: true });
    game.value = data.value;
    error.value = _error.value;
    pending.value = false;
} else {
    const { data, error: _error } = await client.from("game").select("code, streamer, map, mode, locations, players").eq("code", code).single();
    game.value = data;
    error.value = _error;
    pending.value = false;
}

const drawPlayerGuesses = (player: PlayerResult) => {
    map.value.drawPlayerGuesses(player);
}

useHead({
    title: `Game Summary${game.value ? " - " + game.value.streamer : " - No game found"}`,
    meta: [
        { hid: "og-title", property: "og:title", content: "ChatGuessr - Game summary" },
        { hid: "og-desc", property: "og:description", content: "Chatguessr - Game summary" },
    ]
});
</script>
<style>
@import "@/assets/css/flag-icon.min.css";
</style>