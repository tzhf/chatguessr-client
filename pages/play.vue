<script setup lang="ts">
useSeoMeta({
  title: 'Play',
  ogTitle: 'Play | ChatGuessr',
  description: 'How to play ChatGuessr',
  ogDescription: 'How to play ChatGuessr',
  twitterTitle: 'Play | ChatGuessr',
})
</script>

<template>
  <section>
    <h2 class="text-xl font-bold mb-2">How to play</h2>
    <UiCard class="mb-12">
      <p class="mb-3">All you need is a Twitch account, no GeoGuessr account required.</p>
      <ol class="list-decimal ml-4 mb-5">
        <li>Type <UiBadge>!cg</UiBadge> to get the map link from the streamer</li>
        <li>Login with your Twitch account</li>
        <li>Make your guess on the map<br /></li>
        <li>Press guess or plonk the space bar</li>
        <span class="text-sm text-gray-400"
          >That's it ! Your guess will be displayed on the scoreboard.</span
        >
      </ol>

      <h3 class="font-bold">Alternatively, if you can't or don't want to login :</h3>
      <UiCard>
        <ol>
          <li>Paste <UiBadge>ctrl+v</UiBadge> the whole command in chat without editing</li>
          <span class="text-sm text-gray-400">e.g. /w streamer !g 3.172037, 113.041666</span>
        </ol>
      </UiCard>
    </UiCard>

    <h3 class="text-xl font-bold mb-2">Chat commands</h3>
    <UiCard class="flex flex-col gap-0.5">
      <p><UiBadge>!cg</UiBadge> : Get the map link</p>
      <p>
        <UiBadge>!best &lt;day | week | month | year&gt;</UiBadge> : Get the best stats of the channel
      </p>
      <p><UiBadge>!me &lt;day | week | month | year&gt;</UiBadge> : Get your stats</p>
      <p><UiBadge class="text-orange-400 !border-orange-400">!clear</UiBadge> : Clear your stats</p>
      <p>
        <UiBadge>!flags</UiBadge> : Get the link of available
        <nuxt-link to="/flags">flags</nuxt-link>
      </p>
      <p><UiBadge>!flag &lt;country&gt; | random | none</UiBadge> : Set a flag</p>
      <p><UiBadge>!randomplonk</UiBadge> : Guess random coordinates</p>
      <p><UiBadge>!map</UiBadge> : Get current map description</p>
      <p>
        <UiBadge>!lastloc &lt;1-5&gt;</UiBadge> : Get last round location (up to 5 from current round)
      </p>
    </UiCard>
  </section>
</template>
