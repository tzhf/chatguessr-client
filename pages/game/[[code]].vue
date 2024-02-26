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
                        <PlayerResultCard
                            v-for="(player, index) in game.players"
                            :player="player"
                            :index="index"
                            @click="drawPlayerGuesses(player)"
                        />
                    </ul>
                </div>
                <ExportAsXLS :game="game" />
            </div>
            <Map
                :locations="game.locations"
                @vue:updated="drawPlayerGuesses(game.players[0])"
                ref="map"
                :style="{ '--border-color': '#FFF' }"
            />
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

const { data, error: _error } = await client
    .from("game")
    .select("code, streamer, map, mode, locations, players")
    .eq("code", code)
    .single();

if (data) {
    const formated = {
        code: data.code,
        streamer: data.streamer,
        map: data.map,
        mode: data.mode,
        locations: data.locations,
        players: data.players.map((result) => {
            if (result.player) return result;
            else {
                return {
                    player: {
                        username: result.username,
                        color: result.color,
                        flag: result.flag,
                        streak: result.streak,
                        avatar: result.avatar,
                    },
                    guesses: result.guesses,
                    scores: result.scores,
                    distances: result.distances,
                    totalScore: result.totalScore,
                    totalDistance: result.totalDistance,
                };
            }
        }),
    };
    game.value = formated;
    console.log("🚀 ~ formated:", formated);
}

error.value = _error;
pending.value = false;

const drawPlayerGuesses = (player: PlayerResult) => {
    map.value.drawPlayerGuesses(player);
};

useHead({
    title: `Game Summary${game.value ? " - " + game.value.streamer : " - No game found"}`,
    meta: [
        { hid: "og-title", property: "og:title", content: "ChatGuessr - Game summary" },
        { hid: "og-desc", property: "og:description", content: "Chatguessr - Game summary" },
    ],
});
</script>
<style>
@import "@/assets/css/flag-icon.min.css";
</style>
