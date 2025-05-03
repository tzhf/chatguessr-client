<script setup lang="ts">
const currentVersion = '3.1.1'
const windowsLink = `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion}/chatguessr-${currentVersion}.Setup.exe`
const macOSLink = `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion}/chatguessr-darwin-x64-${currentVersion}.zip`
const linuxLink = `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion}/chatguessr_${currentVersion}_amd64.deb`
</script>

<template>
  <section class="flex flex-col gap-1.5 items-center">
    <h2 class="text-lg font-bold mb-1">Download</h2>
    <UiButton :to="windowsLink" icon="my-icons:windows" class="w-full max-w-72">Windows</UiButton>
    <UiButton :to="macOSLink" icon="my-icons:macos" class="w-full max-w-72">macOS</UiButton>
    <UiButton :to="linuxLink" icon="my-icons:linux" class="w-full max-w-72"
      >Linux<small>(.deb)</small></UiButton
    >
    <span class="text-xs font-bold">version {{ currentVersion }}</span>
    <span class="text-xs text-gray-400">automatic updates only work for Windows*</span>
  </section>
</template>
