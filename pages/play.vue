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
        <li>Type <UBadge>!cg</UBadge> to get the map link from the streamer</li>
        <li>Login with your Twitch account</li>
        <li>Make your guess on the map<br /></li>
        <li>Press guess or plonk the space bar</li>
        <span class="text-sm text-gray-400">That's it ! Your guess will be displayed on the scoreboard.</span>
      </ol>

      <h3 class="font-bold">Alternatively, if you can't or don't want to login :</h3>
      <UiCard>
        <ol>
          <li>Paste <UBadge>ctrl+v</UBadge> the whole command in chat without editing</li>
          <span class="text-sm text-gray-400">e.g. /w streamer !g 3.172037, 113.041666</span>
        </ol>
      </UiCard>
    </UiCard>

    <h3 class="text-xl font-bold mb-2">Chat commands</h3>
    <UiCard class="flex flex-col gap-0.5">
      <p><UBadge>!cg</UBadge> : Get the map link</p>
      <p><UBadge>!best &lt;day | week | month | year&gt;</UBadge> : Get the best stats of the channel</p>
      <p><UBadge>!me &lt;day | week | month | year&gt;</UBadge> : Get your stats</p>
      <p><UBadge color="orange">!clear</UBadge> : Clear your stats</p>
      <p>
        <UBadge>!flags</UBadge> : Get the link of available
        <nuxt-link to="/flags">flags</nuxt-link>
      </p>
      <p><UBadge>!flag &lt;country&gt; | random | none</UBadge> : Set a flag</p>
      <p><UBadge>!randomplonk</UBadge> : Guess random coordinates</p>
      <p><UBadge>!map</UBadge> : Get current map description</p>
      <p><UBadge>!lastloc &lt;1-5&gt;</UBadge> : Get last round location (up to 5 from current round)</p>
    </UiCard>
  </section>
</template>
