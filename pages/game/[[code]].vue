<template>
  <main class="absolute top-0 bottom-0 w-full border-top mt-2">
    <div v-if="pending" class="flex flex-col h-full">
      <Heading />
      <div class="flex-auto flex items-center">
        <UiLoader v-if="pending" />
      </div>
      <Footer />
    </div>

    <div v-else-if="game" class="h-full flex flex-col md:flex-row">
      <div class="md:min-w-[26rem] flex flex-col bg-neutral-950 border-r border-neutral-500/50">
        <Heading class="mb-6" />
        <div class="text-center my-3 px-2 whitespace-nowrap">
          <h2 class="text-xl font-bold">GAME SUMMARY ({{ game.players.length }})</h2>
          <h3 class="text-xl overflow-hidden text-ellipsis">{{ game.map }}</h3>
          <a :href="`https://www.twitch.tv/${game.streamer}`" target="_blank">{{ game.streamer }}</a>
          <div class="flex justify-center gap-1 mt-1 text-sm">
            <UBadge v-if="game.mode.noMove" variant="solid" class="font-bold">No Move</UBadge>
            <UBadge v-if="game.mode.noPan" variant="solid" class="font-bold">No Pan</UBadge>
            <UBadge v-if="game.mode.noZoom" variant="solid" class="font-bold">No Zoom</UBadge>
          </div>
        </div>

        <div class="md:overflow-x-hidden moz-scroller px-2 msb-2">
          <ul class="flex flex-col gap-1">
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
const client = useSupabase()
const code = useRoute().params.code

definePageMeta({ layout: false })

const map = ref()
const game: Ref<Game | null> = ref(null)
const pending = ref(true)

const { data, error } = await client
  .from('game')
  .select('code, streamer, map, mode, locations, players')
  .eq('code', code)
  .single()

if (error || !data) {
  throw createError({
    statusCode: 404,
    message: 'Game not found',
  })
}

const formattedPlayers = data.players.map((result: PlayerResult | OldPlayerResult): PlayerResult => {
  if ('player' in result) {
    return result as PlayerResult
    // For old games format
  } else {
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
    }
  }
})

game.value = {
  code: data.code,
  streamer: data.streamer,
  map: data.map,
  mode: data.mode,
  locations: data.locations,
  players: formattedPlayers,
}

pending.value = false

const drawPlayerGuesses = (player: PlayerResult) => {
  map.value.drawPlayerGuesses(player)
}

useHead({
  title: `Game Summary${game.value ? ' - ' + game.value.streamer : ' - No game found'}`,
})
</script>
<style>
@import '@/assets/css/flag-icon.min.css';
</style>
