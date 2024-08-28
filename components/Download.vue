<script setup>
const currentVersion = '3.0.5'
const windowsLink = `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion}/chatguessr-${currentVersion}.Setup.exe`
const macOSLink = `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion}/chatguessr-darwin-x64-${currentVersion}.zip`
const linuxLink = `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion}/chatguessr_${currentVersion}_amd64.deb`
</script>

<template>
  <section class="flex flex-col gap-1 items-center">
    <h2 class="text-lg font-bold mb-1">Download</h2>
    <UButton block size="md" class="max-w-72" icon="my-icons:windows" :to="windowsLink" target="_blank">Windows</UButton>
    <UButton block size="md" class="max-w-72" icon="my-icons:macos" :to="macOSLink" target="_blank">macOS</UButton>
    <UButton block size="md" class="max-w-72" icon="my-icons:linux" :to="linuxLink" target="_blank"
      >Linux<small>(.deb)</small></UButton
    >
    <span class="text-xs font-bold">version {{ currentVersion }}</span>
    <span class="text-xs text-gray-400">automatic updates only work for Windows*</span>
  </section>
</template>
