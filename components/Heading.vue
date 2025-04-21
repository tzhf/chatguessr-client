<template>
  <header class="-ml-0.5 mt-0.5 z-10">
    <NuxtLink to="/">
      <h1 class="heading text-white">
        <div><span class="font-bold text-primary">C</span>hat</div>
        <div><span class="font-bold text-primary">G</span>uessr</div>
      </h1>
    </NuxtLink>
    <p class="text-sm pl-5">
      A Twitch chatbot for
      <a class="text-primary" href="https://www.geoguessr.com" target="_blank">GeoGuessr</a>.
    </p>
  </header>
</template>

<style scoped>
.heading {
  font-weight: 300;
  line-height: 0.7;
  font-size: clamp(3rem, 15vw, 4rem);
  letter-spacing: -9px;
  text-shadow: 0 0 5px rgb(0, 0, 0);
}
</style>
