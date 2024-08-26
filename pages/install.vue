<script setup>
const isModalOpen = ref(false)

useSeoMeta({
  title: 'Install',
  ogTitle: 'Install | ChatGuessr',
  description: 'How to set up ChatGuessr',
  ogDescription: 'How to set up ChatGuessr',
  twitterTitle: 'Install | ChatGuessr',
})
</script>

<template>
  <section>
    <h2 class="text-xl font-bold mb-2">How to set up ChatGuessr</h2>
    <UiCard class="mb-5">
      <ol class="list-decimal ml-4">
        <li>Download &amp; install ChatGuessr</li>
        <li>
          Log in using with your Twitch channel or a <strong>bot account</strong>.<br />
          <span class="text-sm text-gray-400"
            >You can log in with your main account, however a bot account is recommended for security and to prevent your main
            account's whispers from filling up.</span
          >
        </li>
        <li>
          <span class="flex items-center gap-1">
            Open the settings <UIcon name="i-heroicons:cog-6-tooth" class="w-5 h-5" /> on the top right menu
          </span>
        </li>
        <li>Go to <strong>Twitch connect</strong></li>
        <li>Fill in your streaming Twitch channel</li>
        <li>
          Press <strong>Save</strong><br />
          <span class="text-sm text-gray-400">
            The bot should now be talking in your chat. Your chatguessr link will be generated.
          </span>
        </li>
      </ol>
    </UiCard>

    <h3 class="font-bold mb-1">Issues with Windows Defender</h3>
    <UiCard class="text-sm text-gray-400">
      <p>
        On install you may get a message stating: "Windows Defender SmartScreen prevented an unrecognizable app from starting.
        Running this app might put your PC at risk."
      </p>
      <p>
        You can safely ignore this message and continue with your installation
        <span class="cursor-help" @click="isModalOpen = true">💡</span>
      </p>
    </UiCard>
    <UiModal v-show="isModalOpen" @close="isModalOpen = false">
      <img src="~/assets/windefender.png" alt="Windows Defender" />
    </UiModal>
  </section>
</template>
